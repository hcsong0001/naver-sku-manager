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
    // ── 3. Read-only fixture check (post-run state) ──
    console.log('[Fixture After] finalApprovalId:', REQUIRED_FIXTURE_ID);

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
        items: {
          select: { id: true, included: true },
        },
      },
    });

    if (!finalApproval) {
      console.error('[Fixture After] FinalApproval NOT FOUND — unexpected state');
      console.error('[Result] AFTER_FIXTURE_MISSING');
      process.exit(1);
    }

    const job = finalApproval.job;
    const batchJobItems = job?.items ?? [];

    // Summarize item statuses
    const statusCounts: Record<string, number> = {};
    for (const item of batchJobItems) {
      statusCounts[item.status] = (statusCounts[item.status] ?? 0) + 1;
    }
    const statusSummary = Object.entries(statusCounts)
      .map(([s, n]) => `${s}:${n}`)
      .join(', ') || 'none';

    console.log('[Fixture After] FinalApproval status:', finalApproval.status);
    console.log('[Fixture After] BatchJob status:', job?.status ?? 'NOT FOUND');
    console.log('[Fixture After] BatchJobItem status summary:', statusSummary);
    console.log('[Fixture After] FinalApprovalItem count:', finalApproval.items.length);

    // Validate expected post-run state
    const checks: string[] = [];

    // FinalApproval must remain ACTIVE (TransitionApply adapter blocks this write)
    if (finalApproval.status !== 'ACTIVE') {
      checks.push(
        `FinalApproval.status should remain ACTIVE after dry-run, got: ${finalApproval.status}`
      );
    }

    // BatchJob should have transitioned to EXECUTING
    if (!job) {
      checks.push('BatchJob not found via FinalApproval.job relation');
    } else if (job.status !== 'EXECUTING') {
      checks.push(
        `BatchJob.status expected EXECUTING after dry-run, got: ${job.status}`
      );
    }

    // All BatchJobItems should be EXECUTING (were READY before)
    const nonExecutingItems = batchJobItems.filter(i => i.status !== 'EXECUTING');
    if (batchJobItems.length > 0 && nonExecutingItems.length > 0) {
      checks.push(
        `${nonExecutingItems.length} BatchJobItem(s) are not EXECUTING: ` +
          nonExecutingItems.map(i => `${i.id}=${i.status}`).join(', ')
      );
    }
    if (batchJobItems.length === 0) {
      checks.push('No BatchJobItems found — unexpected empty state after dry-run');
    }

    // FinalApprovalItems must NOT have changed (write is blocked by adapter)
    // We just verify count is positive (fixture has items)
    if (finalApproval.items.length === 0) {
      checks.push('FinalApprovalItems count is 0 — fixture may be incomplete');
    }

    if (checks.length > 0) {
      console.error('[Fixture After] Post-run state check FAILED:');
      checks.forEach(c => console.error('  -', c));
      console.error('[Fixture After] DB write scope: unexpected state detected');
      console.error('[Result] AFTER_FIXTURE_INVALID');
      process.exit(1);
    }

    console.log('[Fixture After] DB write scope: expected fixture only');
    console.log('[Result] AFTER_FIXTURE_VALID');
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
