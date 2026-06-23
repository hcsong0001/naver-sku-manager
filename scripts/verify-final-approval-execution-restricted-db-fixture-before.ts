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
    // ── 3. Read-only fixture check ──
    console.log('[Fixture Before] finalApprovalId:', REQUIRED_FIXTURE_ID);

    const finalApproval = await prisma.naverApiBatchFinalApproval.findUnique({
      where: { id: REQUIRED_FIXTURE_ID },
      select: {
        id: true,
        status: true,
        jobId: true,
        validationExpiresAt: true,
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
      console.error('[Fixture Before] FinalApproval NOT FOUND — fixture may not be seeded yet');
      console.error('[Result] BEFORE_FIXTURE_MISSING');
      process.exit(1);
    }

    // Reject if fixture looks like production data (non-test ID pattern)
    if (!REQUIRED_FIXTURE_ID.startsWith('test-')) {
      console.error('[Fixture Before] SAFETY: fixture ID does not start with "test-" — aborting');
      process.exit(1);
    }

    const job = finalApproval.job;
    const batchJobItems = job?.items ?? [];
    const readyItems = batchJobItems.filter(i => i.status === 'READY');
    const finalApprovalItems = finalApproval.items;

    console.log('[Fixture Before] FinalApproval status:', finalApproval.status);
    console.log('[Fixture Before] FinalApproval jobId:', finalApproval.jobId);
    console.log('[Fixture Before] BatchJob status:', job?.status ?? 'NOT FOUND');
    console.log('[Fixture Before] BatchJobItem total count:', batchJobItems.length);
    console.log('[Fixture Before] BatchJobItem READY count:', readyItems.length);
    console.log('[Fixture Before] FinalApprovalItem count:', finalApprovalItems.length);

    // Validate expected pre-run state
    const checks: string[] = [];
    if (finalApproval.status !== 'ACTIVE') {
      checks.push(`FinalApproval.status must be ACTIVE, got: ${finalApproval.status}`);
    }
    if (!job) {
      checks.push('BatchJob not found via FinalApproval.job relation');
    } else if (job.status !== 'APPROVED') {
      checks.push(`BatchJob.status must be APPROVED, got: ${job.status}`);
    }
    if (readyItems.length === 0) {
      checks.push('No READY BatchJobItems found — fixture may not be prepared');
    }

    if (checks.length > 0) {
      console.error('[Fixture Before] Pre-run state check FAILED:');
      checks.forEach(c => console.error('  -', c));
      console.error('[Result] BEFORE_FIXTURE_INVALID');
      process.exit(1);
    }

    console.log('[Result] BEFORE_FIXTURE_VALID');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(err => {
  const msg = err instanceof Error ? err.message : String(err);
  // Sanitize error message to prevent URL leakage
  const safeMsg = msg
    .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED_DB_URL]')
    .replace(/redis:\/\/[^\s]*/gi, '[REDACTED_REDIS_URL]');
  console.error('[Error] Script failed:', safeMsg);
  process.exit(1);
});
