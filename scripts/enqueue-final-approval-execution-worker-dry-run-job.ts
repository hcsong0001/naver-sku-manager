import { createFinalApprovalExecutionBullmqQueueAdapter } from '../src/services/sku-keyword-final-approval-execution-bullmq-queue-adapter.service';

async function run() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl || !redisUrl.includes('localhost')) {
    console.error('[Error] Invalid REDIS_URL for dry run. Must be a localhost URL.');
    process.exit(1);
  }

  console.log('[Script] Initializing BullMQ Queue Adapter for dry run...');
  const adapter = createFinalApprovalExecutionBullmqQueueAdapter(redisUrl);
  
  const payload = {
    finalApprovalId: 'test-db-revalidation-final-approval-001',
    actorId: 'test-runner',
    idempotencyKey: 'dry-run-test-idem-001',
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API' as const,
    mode: 'MOCK' as const
  };

  console.log('[Script] Enqueuing dry run job...');
  const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
  
  console.log('[Script] Enqueue Result:', JSON.stringify(result, null, 2));
  
  await adapter.close();
}

run().catch(err => {
  console.error('[Error] Enqueue script failed:', err);
  process.exit(1);
});
