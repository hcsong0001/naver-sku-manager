import {
  validateRestrictedDbDryRunSafety,
  REQUIRED_FIXTURE_ID,
  REQUIRED_QUEUE_NAME,
} from '../src/services/sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import { PrismaClient } from '../app/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

// Restore script applies the STRICTEST safety guard of all four scripts.
// It performs DB writes and must never touch production data.

async function run() {
  // ── 1. Safety guard — must pass before ANY DB access ──
  const safety = validateRestrictedDbDryRunSafety({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    queueName: process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME ?? REQUIRED_QUEUE_NAME,
    finalApprovalId: REQUIRED_FIXTURE_ID,
  });

  console.log('[Restore] NODE_ENV:', process.env.NODE_ENV ?? 'undefined');
  console.log('[Restore] DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('[Restore] DB host (masked):', safety.dbHostMasked ?? '[unknown]');
  console.log('[Restore] Safety guard:', safety.ok ? 'PASS' : 'FAIL');

  if (!safety.ok) {
    console.error('[Restore ABORT] Safety guard failed — no DB write will be performed');
    safety.errors.forEach(e => console.error('  -', e));
    console.error('[Result] RESTORE_ABORTED_SAFETY_FAIL');
    process.exit(1);
  }

  // ── 2. Create PrismaClient AFTER safety guard passes ──
  const dbUrl = process.env.DATABASE_URL!;
  const adapter = new PrismaPg(dbUrl);
  const prisma = new PrismaClient({ adapter, log: ['error'] });

  try {
    // ── 3. Read current fixture state (pre-restore snapshot) ──
    console.log('[Restore] Reading current fixture state...');
    console.log('[Restore] Target finalApprovalId:', REQUIRED_FIXTURE_ID);

    const finalApproval = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: REQUIRED_FIXTURE_ID },
      select: {
        id: true,
        status: true,
        jobId: true,
        job: {
          select: {
            id: true,
            status: true,
            items: {
              select: { id: true, status: true },
            },
          },
        },
      },
    });

    if (!finalApproval) {
      console.error('[Restore] FinalApproval NOT FOUND — nothing to restore');
      console.error('[Result] RESTORE_SKIPPED_NOT_FOUND');
      process.exit(0);
    }

    // Guard: fixture ID must start with "test-" (extra identity check)
    if (!REQUIRED_FIXTURE_ID.startsWith('test-')) {
      console.error('[Restore ABORT] fixture ID does not start with "test-" — refusing restore');
      console.error('[Result] RESTORE_ABORTED_ID_CHECK');
      process.exit(1);
    }

    const job = finalApproval.job;
    if (!job) {
      console.error('[Restore] BatchJob not found via FinalApproval.job relation — nothing to restore');
      console.error('[Result] RESTORE_SKIPPED_NO_JOB');
      process.exit(0);
    }

    const batchJobId = job.id;
    const currentJobStatus = job.status;
    const items = job.items;
    // Restoreable items: EXECUTING (from dry-run) or SUCCESS (from mock-execution result recording)
    const restorableItems = items.filter(i => i.status === 'EXECUTING' || i.status === 'SUCCESS');
    const allItems = items;

    console.log('[Restore] FinalApproval status:', finalApproval.status);
    console.log('[Restore] BatchJob id:', batchJobId);
    console.log('[Restore] BatchJob current status:', currentJobStatus);
    console.log('[Restore] BatchJobItem total count:', allItems.length);
    console.log('[Restore] BatchJobItem restorable count:', restorableItems.length);

    // If already in pre-run state, skip restore
    if (currentJobStatus === 'APPROVED' && restorableItems.length === 0) {
      console.log('[Restore] Fixture is already in APPROVED/READY state — restore not needed');
      console.log('[Result] RESTORE_SKIPPED_ALREADY_CLEAN');
      process.exit(0);
    }

    // ── 4. Validate expected restore-eligible state ──
    // Handles both dry-run (EXECUTING) and mock-execution (EXECUTED) post-states
    if (currentJobStatus !== 'EXECUTING' && currentJobStatus !== 'EXECUTED') {
      console.error(
        `[Restore ABORT] BatchJob.status is "${currentJobStatus}" — only EXECUTING/EXECUTED state can be restored`
      );
      console.error('[Result] RESTORE_ABORTED_UNEXPECTED_JOB_STATUS');
      process.exit(1);
    }

    // Confirm expected row counts
    console.log('[Restore] Expected restore: BatchJob EXECUTING/EXECUTED → APPROVED');
    console.log('[Restore] Expected restore: BatchJobItem EXECUTING/SUCCESS × ', restorableItems.length, '→ READY');

    // ── 5. Perform restore in a transaction ──
    // WHERE conditions include fixture ID to prevent accidental wider updates
    await prisma.$transaction(async tx => {
      // Restore BatchJob status (from EXECUTING or EXECUTED → APPROVED)
      const jobRestoreResult = await tx.naverApiBatchJob.updateMany({
        where: {
          id: batchJobId,  // fixture scope: only this specific job
          status: { in: ['EXECUTING', 'EXECUTED'] } as any,
        },
        data: { status: 'APPROVED' as any },
      });

      console.log('[Restore] BatchJob rows restored:', jobRestoreResult.count);
      if (jobRestoreResult.count === 0) {
        throw new Error(
          `BatchJob restore failed: id=${batchJobId} was not in EXECUTING/EXECUTED state — 0 rows affected`
        );
      }
      if (jobRestoreResult.count > 1) {
        throw new Error(
          `BatchJob restore unexpected: id=${batchJobId} matched ${jobRestoreResult.count} rows — expected exactly 1`
        );
      }

      // Restore BatchJobItem statuses (from EXECUTING or SUCCESS → READY)
      const itemRestoreResult = await tx.naverApiBatchJobItem.updateMany({
        where: {
          batchJobId: batchJobId,  // fixture scope: only items belonging to this job
          status: { in: ['EXECUTING', 'SUCCESS'] } as any,
        },
        data: { status: 'READY' as any },
      });

      console.log('[Restore] BatchJobItem rows restored:', itemRestoreResult.count);
      if (itemRestoreResult.count === 0) {
        throw new Error(
          `BatchJobItem restore failed: batchJobId=${batchJobId} had no EXECUTING/SUCCESS items — 0 rows affected`
        );
      }
    });

    // ── 6. Verify restored state ──
    console.log('[Restore] Verifying restored state...');

    const afterRestore = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: REQUIRED_FIXTURE_ID },
      select: {
        status: true,
        job: {
          select: {
            status: true,
            items: { select: { status: true } },
          },
        },
      },
    });

    if (!afterRestore?.job) {
      console.error('[Restore] Post-restore verification: job not found');
      console.error('[Result] RESTORE_VERIFY_FAILED');
      process.exit(1);
    }

    const restoredJobStatus = afterRestore.job.status;
    const restoredItems = afterRestore.job.items;
    const restoredReadyCount = restoredItems.filter(i => i.status === 'READY').length;
    const restoredExecutingCount = restoredItems.filter(i => i.status === 'EXECUTING').length;
    const restoredSuccessCount = restoredItems.filter(i => i.status === 'SUCCESS').length;

    console.log('[Restore Verify] FinalApproval status:', afterRestore.status);
    console.log('[Restore Verify] BatchJob status:', restoredJobStatus);
    console.log('[Restore Verify] BatchJobItem READY count:', restoredReadyCount);
    console.log('[Restore Verify] BatchJobItem EXECUTING remaining:', restoredExecutingCount);
    console.log('[Restore Verify] BatchJobItem SUCCESS remaining:', restoredSuccessCount);

    const verifyErrors: string[] = [];
    if (restoredJobStatus !== 'APPROVED') {
      verifyErrors.push(`BatchJob.status expected APPROVED, got: ${restoredJobStatus}`);
    }
    if (restoredExecutingCount > 0) {
      verifyErrors.push(`${restoredExecutingCount} BatchJobItem(s) still in EXECUTING after restore`);
    }
    if (restoredSuccessCount > 0) {
      verifyErrors.push(`${restoredSuccessCount} BatchJobItem(s) still in SUCCESS after restore`);
    }
    if (restoredReadyCount === 0) {
      verifyErrors.push('No READY BatchJobItems found after restore');
    }

    if (verifyErrors.length > 0) {
      console.error('[Restore] Post-restore verification FAILED:');
      verifyErrors.forEach(e => console.error('  -', e));
      console.error('[Result] RESTORE_VERIFY_FAILED');
      process.exit(1);
    }

    console.log('[Result] RESTORE_SUCCESS');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(err => {
  const msg = err instanceof Error ? err.message : String(err);
  const safeMsg = msg
    .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED_DB_URL]')
    .replace(/redis:\/\/[^\s]*/gi, '[REDACTED_REDIS_URL]');
  console.error('[Error] Restore script failed:', safeMsg);
  console.error('[Result] RESTORE_UNHANDLED_ERROR');
  process.exit(1);
});
