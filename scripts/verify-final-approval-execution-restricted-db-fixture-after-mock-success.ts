import {
  validateRestrictedDbDryRunSafety,
  REQUIRED_FIXTURE_ID,
  REQUIRED_QUEUE_NAME,
} from '../src/services/sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import { PrismaClient } from '../app/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

async function run() {
  // ── 1. Safety guard (must pass before any DB access) ──
  const safety = validateRestrictedDbDryRunSafety({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    queueName: process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME ?? REQUIRED_QUEUE_NAME,
    finalApprovalId: REQUIRED_FIXTURE_ID,
  });

  console.log('[Check] NODE_ENV:', process.env.NODE_ENV ?? 'undefined');
  console.log('[Check] DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('[Check] DB host (masked):', safety.dbHostMasked ?? '[unknown]');
  console.log('[Check] DB safety guard:', safety.ok ? 'PASS' : 'FAIL');

  if (!safety.ok) {
    console.error('[Safety FAIL] Guard errors:');
    safety.errors.forEach(e => console.error('  -', e));
    process.exit(1);
  }

  // ── 2. Create PrismaClient AFTER safety guard passes ──
  const dbUrl = process.env.DATABASE_URL!;
  const adapter = new PrismaPg(dbUrl);
  const prisma = new PrismaClient({ adapter, log: ['error'] });

  try {
    // ── 3. Read-only fixture check (post mock-execution state) ──
    console.log('[Fixture After Mock] finalApprovalId:', REQUIRED_FIXTURE_ID);

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
            successItems: true,
            failedItems: true,
            skippedItems: true,
            executedAt: true,
            items: {
              select: { id: true, status: true, errorCode: true },
            },
          },
        },
        items: {
          select: { id: true, included: true },
        },
      },
    });

    if (!finalApproval) {
      console.error('[Fixture After Mock] FinalApproval NOT FOUND — unexpected state');
      console.error('[Result] AFTER_MOCK_FIXTURE_MISSING');
      process.exit(1);
    }

    const job = finalApproval.job;
    const batchJobItems = job?.items ?? [];

    const statusCounts: Record<string, number> = {};
    for (const item of batchJobItems) {
      statusCounts[item.status] = (statusCounts[item.status] ?? 0) + 1;
    }
    const statusSummary =
      Object.entries(statusCounts)
        .map(([s, n]) => `${s}:${n}`)
        .join(', ') || 'none';

    console.log('[Fixture After Mock] FinalApproval status:', finalApproval.status);
    console.log('[Fixture After Mock] BatchJob status:', job?.status ?? 'NOT FOUND');
    console.log('[Fixture After Mock] BatchJob successItems:', job?.successItems ?? 'N/A');
    console.log('[Fixture After Mock] BatchJob failedItems:', job?.failedItems ?? 'N/A');
    console.log('[Fixture After Mock] BatchJob skippedItems:', job?.skippedItems ?? 'N/A');
    console.log('[Fixture After Mock] BatchJob executedAt:', job?.executedAt?.toISOString() ?? 'null');
    console.log('[Fixture After Mock] BatchJobItem status summary:', statusSummary);
    console.log('[Fixture After Mock] FinalApprovalItem count:', finalApproval.items.length);

    const checks: string[] = [];

    // FinalApproval must remain ACTIVE (not written by this step)
    if (finalApproval.status !== 'ACTIVE') {
      checks.push(
        `FinalApproval.status should remain ACTIVE after mock execution, got: ${finalApproval.status}`
      );
    }

    if (!job) {
      checks.push('BatchJob not found via FinalApproval.job relation');
    } else {
      // BatchJob must be EXECUTED after mock Naver API execution + result recording
      if (job.status !== 'EXECUTED') {
        checks.push(`BatchJob.status expected EXECUTED, got: ${job.status}`);
      }
      // All items were SUCCESS → successItems = 1
      if ((job.successItems ?? 0) !== 1) {
        checks.push(`BatchJob.successItems expected 1, got: ${job.successItems}`);
      }
      if ((job.failedItems ?? 0) !== 0) {
        checks.push(`BatchJob.failedItems expected 0, got: ${job.failedItems}`);
      }
      if ((job.skippedItems ?? 0) !== 0) {
        checks.push(`BatchJob.skippedItems expected 0, got: ${job.skippedItems}`);
      }
      if (!job.executedAt) {
        checks.push('BatchJob.executedAt should be set after mock execution');
      }
    }

    // All BatchJobItems must be SUCCESS
    if (batchJobItems.length === 0) {
      checks.push('No BatchJobItems found — unexpected empty state after mock execution');
    } else {
      const nonSuccessItems = batchJobItems.filter(i => i.status !== 'SUCCESS');
      if (nonSuccessItems.length > 0) {
        checks.push(
          `${nonSuccessItems.length} BatchJobItem(s) are not SUCCESS: ` +
            nonSuccessItems.map(i => `${i.id}=${i.status}`).join(', ')
        );
      }
    }

    if (finalApproval.items.length === 0) {
      checks.push('FinalApprovalItems count is 0 — fixture may be incomplete');
    }

    if (checks.length > 0) {
      console.error('[Fixture After Mock] Post-execution state check FAILED:');
      checks.forEach(c => console.error('  -', c));
      console.error('[Result] AFTER_MOCK_FIXTURE_INVALID');
      process.exit(1);
    }

    console.log('[Fixture After Mock] DB write scope: expected fixture only');
    console.log('[Result] AFTER_MOCK_FIXTURE_VALID');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(err => {
  const msg = err instanceof Error ? err.message : String(err);
  const safeMsg = msg
    .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED_DB_URL]')
    .replace(/redis:\/\/[^\s]*/gi, '[REDACTED_REDIS_URL]');
  console.error('[Error] Script failed:', safeMsg);
  process.exit(1);
});
