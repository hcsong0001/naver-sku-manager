import { createFinalApprovalExecutionBullmqQueueAdapter } from '../src/services/sku-keyword-final-approval-execution-bullmq-queue-adapter.service';

async function run() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.error('[Error] REDIS_URL is not provided.');
    process.exit(1);
  }
  try {
    const parsedUrl = new URL(redisUrl);
    if ((parsedUrl.hostname !== 'localhost' && parsedUrl.hostname !== '127.0.0.1') || parsedUrl.port !== '56379') {
      console.error('[Error] Invalid REDIS_URL for dry run. Must be a localhost/127.0.0.1 URL on port 56379.');
      process.exit(1);
    }
  } catch(e) {
    console.error('[Error] Invalid REDIS_URL format.');
    process.exit(1);
  }

  console.log('[Script] Initializing BullMQ Queue Adapter for dry run...');
  const adapter = createFinalApprovalExecutionBullmqQueueAdapter(redisUrl);
  
  const payload = {
    finalApprovalId: 'test-db-revalidation-final-approval-001',
    actorId: 'test-runner',
    idempotencyKey: 'final-approval-worker-limited-dry-run-evidence-001',
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API' as const,
    mode: 'MOCK' as const
  };

  console.log('[Script] Enqueuing dry run job...');
  const queueName = process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME || 'final-approval-execution';
  // Cast queueName to any to bypass strong literal type if needed, or better, pass the exact literal the adapter expects:
  const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
  
  console.log('[Script] Enqueue Result:', JSON.stringify(result, null, 2));
  
  await adapter.close();
}

run().catch(err => {
  console.error('[Error] Enqueue script failed:', err);
  process.exit(1);
});
