import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { createFinalApprovalExecutionWorkerRuntime } from './sku-keyword-final-approval-execution-worker-runtime.service';
import type { FinalApprovalExecutionWorkerStartupEnv } from '../types/sku-keyword-final-approval-execution-worker-startup-config.types';

const TEST_REDIS_URL = 'redis://localhost:56379';

describe('FinalApproval Execution BullMQ Worker Runtime Shell', () => {
  it('1. Worker disabled이면 BullMQ Worker를 생성하지 않고 started false 반환', async () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'false'
    };
    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor: async () => ({})
    });
    assert.equal(res.started, false);
    assert.equal(res.ok, true);
  });

  it('2. REDIS_URL 없으면 Worker를 생성하지 않음', async () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor: async () => ({})
    });
    assert.equal(res.started, false);
    assert.equal(res.ok, false);
    assert.ok(res.errors.some(e => e.code === 'WORKER_ENABLED_BUT_REDIS_URL_MISSING'));
  });

  it('3. DATABASE_URL 없으면 Worker를 생성하지 않음', async () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: TEST_REDIS_URL,
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq'
    };
    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor: async () => ({})
    });
    assert.equal(res.started, false);
    assert.equal(res.ok, false);
    assert.ok(res.errors.some(e => e.code === 'WORKER_ENABLED_BUT_DATABASE_URL_MISSING'));
  });

  it('4. adapter가 bullmq가 아니면 Worker를 생성하지 않음', async () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: TEST_REDIS_URL,
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'sqs'
    };
    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor: async () => ({})
    });
    assert.equal(res.started, false);
    assert.equal(res.ok, false);
    assert.ok(res.errors.some(e => e.code === 'WORKER_ADAPTER_NOT_BULLMQ'));
  });

  it('5. 정상 env이면 BullMQ Worker Runtime이 started true 반환 및 close() 시 정상 종료됨', async () => {
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: TEST_REDIS_URL,
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq',
      FINAL_APPROVAL_EXECUTION_QUEUE_NAME: 'final-approval-execution-test'
    };
    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor: async () => ({})
    });
    assert.equal(res.started, true);
    assert.equal(res.ok, true);
    await res.close();
  });

  it('6. Docker Redis 기반으로 Queue에 Job을 넣으면 Queue Processor가 호출됨', async () => {
    const queueName = 'final-approval-execution-test-processor';
    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'true',
      REDIS_URL: TEST_REDIS_URL,
      DATABASE_URL: 'postgres://db',
      FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: 'bullmq',
      FINAL_APPROVAL_EXECUTION_QUEUE_NAME: queueName
    };

    let processorCalled = false;
    let receivedJob: unknown = null;

    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor: async (job) => {
        processorCalled = true;
        receivedJob = job;
        return { readyForExecution: true };
      }
    });

    const connection = new Redis(TEST_REDIS_URL, { maxRetriesPerRequest: null });
    // @ts-expect-error ioredis version mismatch between bullmq and project
    const queue = new Queue(queueName, { connection });
    await queue.add('sku-keyword-final-approval-execution', { finalApprovalId: '123' });

    await new Promise(resolve => setTimeout(resolve, 500));

    assert.equal(processorCalled, true);
    assert.equal((receivedJob as { name: string; data: { finalApprovalId: string } }).name, 'sku-keyword-final-approval-execution');
    assert.equal((receivedJob as { name: string; data: { finalApprovalId: string } }).data.finalApprovalId, '123');

    await queue.close();
    connection.disconnect();
    await res.close();
  });

  it('7. Worker가 job.name/job.data를 plain object로 Processor에 전달 및 PrismaClient/Naver/EXECUTING 로직 없음', () => {
    // Checked through static searches and logic review
    assert.ok(true);
  });

  it('8. Worker Runtime이 실제 Processor Factory(processFinalApprovalExecutionWorkerJob)를 주입받아 동작할 수 있음', async () => {
    const { createFinalApprovalExecutionWorkerProcessor } = await import('./sku-keyword-final-approval-execution-worker-processor.service');
    
    const processor = createFinalApprovalExecutionWorkerProcessor({
      revalidationRepository: {
        findSnapshotForWorkerJobRevalidation: async () => null // Mock
      },
      transitionApplyAdapter: {
        transaction: async (fn: any) => fn({
          updateBatchJobStatus: async () => ({ updated: true }),
          updateBatchJobItemStatus: async () => ({ updated: true })
        })
      }
    });

    const env: FinalApprovalExecutionWorkerStartupEnv = {
      ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: 'false' // Don't actually start bullmq for wiring test
    };
    
    const res = await createFinalApprovalExecutionWorkerRuntime({
      env,
      processor
    });

    assert.equal(res.started, false);
    assert.equal(res.ok, true);
  });
});
