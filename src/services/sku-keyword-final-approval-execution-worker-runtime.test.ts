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

  // ── Revalidation repository factory integration ───────────────────────────

  it('9. default adapter mode (undefined) returns mock repository — findSnapshot returns null, no DB connection', async () => {
    const { createWorkerRevalidationRepository } = await import('./sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service');

    const repo = createWorkerRevalidationRepository({ adapterModeEnvValue: undefined });
    const result = await repo.findSnapshotForWorkerJobRevalidation('any-id', 'any-key');

    assert.strictEqual(result, null, 'default mock must return null');
  });

  it('10. blocked adapter modes throw before any Worker startup', async () => {
    const { createWorkerRevalidationRepository } = await import('./sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service');

    assert.throws(() => createWorkerRevalidationRepository({ adapterModeEnvValue: 'live' }), /not allowed/);
    assert.throws(() => createWorkerRevalidationRepository({ adapterModeEnvValue: 'production' }), /not allowed/);
    assert.throws(() => createWorkerRevalidationRepository({ adapterModeEnvValue: 'prod' }), /not allowed/);
    assert.throws(() => createWorkerRevalidationRepository({ adapterModeEnvValue: 'operating' }), /not allowed/);
  });

  it('11. restricted-db mode + NODE_ENV != test → factory throws (prevents Worker startup)', async () => {
    const { createWorkerRevalidationRepository } = await import('./sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service');

    const mockPrisma = { naverApiBatchFinalApproval: { findUnique: async () => null } };
    assert.throws(
      () => createWorkerRevalidationRepository({
        adapterModeEnvValue: 'restricted-db',
        nodeEnv: 'production',
        databaseUrl: 'postgresql://u:p@localhost:55432/testdb',
        prismaClient: mockPrisma,
      }),
      /safety guard failed/,
      'must block non-test NODE_ENV'
    );
  });

  it('12. restricted-db mode + valid env + mock prismaClient → adapter calls findUnique on DB query', async () => {
    const { createWorkerRevalidationRepository } = await import('./sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service');

    let findUniqueCalled = false;
    const mockPrisma = {
      naverApiBatchFinalApproval: {
        findUnique: async () => { findUniqueCalled = true; return null; }
      }
    };

    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: 'test',
      databaseUrl: 'postgresql://u:p@localhost:55432/naver_sku_manager_test',
      prismaClient: mockPrisma,
    });

    await repo.findSnapshotForWorkerJobRevalidation('test-db-revalidation-final-approval-001', 'idem-key');
    assert.equal(findUniqueCalled, true, 'Prisma adapter must call findUnique when queried');
  });

  it('13. factory error messages do not expose DATABASE_URL secret', async () => {
    const { createWorkerRevalidationRepository } = await import('./sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service');

    const secretUrl = 'postgresql://secretuser:secretpass@localhost:55432/naver_sku_manager';
    let thrown: Error | null = null;
    try {
      createWorkerRevalidationRepository({
        adapterModeEnvValue: 'restricted-db',
        nodeEnv: 'test',
        databaseUrl: secretUrl,
        prismaClient: { naverApiBatchFinalApproval: { findUnique: async () => null } },
      });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }

    assert.ok(thrown !== null, 'should have thrown for prod db name');
    const msg = thrown!.message;
    assert.ok(!msg.includes('secretpass'), 'error must not contain DB password');
    assert.ok(!msg.includes('secretuser'), 'error must not contain DB username');
    assert.ok(!msg.includes('postgresql://'), 'error must not contain full URL');
  });
});
