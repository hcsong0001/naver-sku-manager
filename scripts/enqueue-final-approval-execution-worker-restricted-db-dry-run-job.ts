import {
  validateRestrictedDbDryRunSafety,
  REQUIRED_FIXTURE_ID,
  REQUIRED_QUEUE_NAME,
  REQUIRED_JOB_NAME,
} from '../src/services/sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import { createFinalApprovalExecutionBullmqQueueAdapter } from '../src/services/sku-keyword-final-approval-execution-bullmq-queue-adapter.service';

const RESTRICTED_DB_JOB_ID = 'final-approval-worker-restricted-db-dry-run-001';
const RESTRICTED_DB_IDEMPOTENCY_KEY = 'restricted-db-dry-run-idempotency-001';

async function run() {
  // ── 1. Safety guard (must pass before any Redis/Queue access) ──
  const safety = validateRestrictedDbDryRunSafety({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    queueName: process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME ?? REQUIRED_QUEUE_NAME,
    jobName: REQUIRED_JOB_NAME,
    finalApprovalId: REQUIRED_FIXTURE_ID,
  });

  console.log('[Check] NODE_ENV:', process.env.NODE_ENV ?? 'undefined');
  console.log('[Check] DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('[Check] REDIS_URL exists:', !!process.env.REDIS_URL);
  console.log('[Check] Redis port valid:', safety.redisPortValid ?? false);
  console.log('[Check] DB host (masked):', safety.dbHostMasked ?? '[unknown]');
  console.log('[Check] Safety guard:', safety.ok ? 'PASS' : 'FAIL');

  if (!safety.ok) {
    console.error('[Safety FAIL] Guard errors:');
    safety.errors.forEach(e => console.error('  -', e));
    process.exit(1);
  }

  const redisUrl = process.env.REDIS_URL!;
  const queueName = process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME ?? REQUIRED_QUEUE_NAME;

  // ── 2. Verify queue name is the expected test queue ──
  if (queueName !== REQUIRED_QUEUE_NAME) {
    console.error(
      `[Safety FAIL] Queue name mismatch: expected "${REQUIRED_QUEUE_NAME}", got "${queueName}"`
    );
    process.exit(1);
  }

  // ── 3. Build payload with fixed fixture values ──
  const payload = {
    finalApprovalId: REQUIRED_FIXTURE_ID,
    actorId: 'restricted-db-dry-run-actor',
    idempotencyKey: RESTRICTED_DB_IDEMPOTENCY_KEY,
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API' as const,
    mode: 'DRY_RUN_READY' as const,
  };

  console.log('[Enqueue] jobId:', RESTRICTED_DB_JOB_ID);
  console.log('[Enqueue] jobName:', REQUIRED_JOB_NAME);
  console.log('[Enqueue] queueName:', queueName);
  console.log('[Enqueue] finalApprovalId:', payload.finalApprovalId);
  console.log('[Enqueue] mode:', payload.mode);
  console.log('[Enqueue] idempotencyKey:', payload.idempotencyKey);

  // ── 4. Create BullMQ adapter AFTER safety guard passes ──
  const adapter = createFinalApprovalExecutionBullmqQueueAdapter(redisUrl);

  let enqueueSuccess = false;
  try {
    const result = await adapter.enqueue(REQUIRED_JOB_NAME, payload, {
      jobId: RESTRICTED_DB_JOB_ID,
    });

    enqueueSuccess = result.success;

    console.log('[Enqueue] result.success:', result.success);
    console.log('[Enqueue] result.status:', result.status);
    console.log('[Enqueue] result.jobId:', result.jobId);
    if (result.payloadSummary) {
      console.log('[Enqueue] result.payloadSummary.mode:', result.payloadSummary.mode);
    }

    if (!result.success) {
      console.error('[Enqueue] FAILED:', result.error ?? 'unknown error');
    }
  } finally {
    await adapter.close();
  }

  if (!enqueueSuccess) {
    console.error('[Result] ENQUEUE_FAILED');
    process.exit(1);
  }

  console.log('[Result] ENQUEUE_SUCCESS');
}

run().catch(err => {
  const msg = err instanceof Error ? err.message : String(err);
  const safeMsg = msg
    .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED_DB_URL]')
    .replace(/redis:\/\/[^\s]*/gi, '[REDACTED_REDIS_URL]');
  console.error('[Error] Script failed:', safeMsg);
  process.exit(1);
});
