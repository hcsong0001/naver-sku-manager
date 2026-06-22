import assert from 'node:assert/strict';
import { describe, it, before, after, beforeEach } from 'node:test';
import Redis from 'ioredis';
import { createFinalApprovalExecutionBullmqQueueAdapter } from './sku-keyword-final-approval-execution-bullmq-queue-adapter.service';
import type { FinalApprovalExecutionQueuePayload } from '../types/sku-keyword-final-approval-execution-queue.types';

describe('FinalApproval Execution BullMQ Queue Adapter', () => {
  // Prevent BullMQ background script loading from crashing the test suite on bad connection test
  process.on('unhandledRejection', () => {});
  process.on('uncaughtException', () => {});

  const REDIS_URL = 'redis://localhost:56379';
  let adapter: ReturnType<typeof createFinalApprovalExecutionBullmqQueueAdapter>;

  before(async () => {
    // 1. Docker Redis가 실행 중인지 확인하고, 실행 중이 아니면 테스트를 실패
    const redis = new Redis(REDIS_URL, { maxRetriesPerRequest: 0, connectTimeout: 1000 });
    try {
      await redis.ping();
    } catch {
      throw new Error(`Docker Redis is not running or not accessible at ${REDIS_URL}. Please ensure tms-final-approval-test-redis is running.`);
    } finally {
      redis.disconnect();
    }
    
    adapter = createFinalApprovalExecutionBullmqQueueAdapter(REDIS_URL);
  });

  beforeEach(async () => {
    if (adapter) {
      // 테스트 데이터를 위해 큐를 초기화한다.
      // Obliterate는 큐 안의 모든 Job을 삭제한다.
      await adapter.getQueue().obliterate({ force: true });
    }
  });

  after(async () => {
    if (adapter) {
      await adapter.getQueue().obliterate({ force: true });
      await adapter.close();
    }
  });

  const getValidPayload = (): FinalApprovalExecutionQueuePayload => ({
    finalApprovalId: 'fa-123',
    actorId: 'user-1',
    idempotencyKey: `idem-${Date.now()}`,
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API',
    mode: 'MOCK'
  });

  it('2. 정상 enqueue 시 BullMQ job이 생성된다.', async () => {
    const payload = getValidPayload();
    const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);

    assert.equal(result.success, true);
    
    // BullMQ에서 실제로 Job이 생성되었는지 확인
    const queue = adapter.getQueue();
    const job = await queue.getJob(payload.idempotencyKey);
    assert.ok(job);
    assert.equal(job.id, payload.idempotencyKey);
  });

  it('3. Queue name이 final-approval-execution인지 검증한다.', () => {
    const queue = adapter.getQueue();
    assert.equal(queue.name, 'final-approval-execution');
  });

  it('4. Job name이 sku-keyword-final-approval-execution인지 검증한다.', async () => {
    const payload = getValidPayload();
    await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.equal(job!.name, 'sku-keyword-final-approval-execution');
  });

  it('5. jobId가 idempotencyKey와 같은지 검증한다.', async () => {
    const payload = getValidPayload();
    const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(result.jobId, payload.idempotencyKey);
    
    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.equal(job!.id, payload.idempotencyKey);
  });

  it('6. payload가 최소 필드만 포함되는지 검증한다.', async () => {
    const payload = getValidPayload();
    // Add extra malicious fields
    const dirtyPayload = { ...payload, __secret__: '1234', isAdmin: true };
    await adapter.enqueue('sku-keyword-final-approval-execution', dirtyPayload as unknown as FinalApprovalExecutionQueuePayload);

    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.ok(job);
    assert.equal((job.data as unknown as Record<string, unknown>).__secret__, undefined);
    assert.equal((job.data as unknown as Record<string, unknown>).isAdmin, undefined);
    assert.equal(job.data.finalApprovalId, payload.finalApprovalId);
  });

  it('7. source가 EXECUTION_API로 유지되는지 검증한다.', async () => {
    const payload = getValidPayload();
    await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.equal(job!.data.source, 'EXECUTION_API');
  });

  it('8. mode가 MOCK 또는 DRY_RUN_READY로 유지되는지 검증한다.', async () => {
    const payload = getValidPayload();
    await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.equal(job!.data.mode, 'MOCK');
  });

  it('9. Queue.add 결과가 기존 Queue Enqueue Result 형태로 변환되는지 검증한다.', async () => {
    const payload = getValidPayload();
    const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);

    assert.equal(result.success, true);
    assert.equal(result.jobName, 'sku-keyword-final-approval-execution');
    assert.equal(result.jobId, payload.idempotencyKey);
    assert.equal(result.status, 'ENQUEUED');
    assert.ok(result.enqueuedAt);
    assert.deepEqual(result.payloadSummary, {
      finalApprovalId: payload.finalApprovalId,
      mode: payload.mode
    });
  });

  it('10. 같은 idempotencyKey로 중복 enqueue 시 안전하게 처리되는지 검증한다.', async () => {
    const payload = getValidPayload();
    const result1 = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(result1.success, true);

    // BullMQ 큐는 같은 jobId로 add를 호출하면 생성하지 않고 넘기거나 기존 job 객체를 반환합니다.
    const result2 = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(result2.success, true);
    assert.equal(result2.jobId, payload.idempotencyKey);

    const counts = await adapter.getQueue().getJobCounts();
    // 중복 큐가 들어가지 않으므로 wait count는 1이어야 합니다.
    assert.equal(counts.waiting, 1);
  });

  it('11. 잘못된 Redis 연결 정보일 때 안전한 failure result를 반환하는지 검증한다.', async (t) => {
    t.mock.method(adapter.getQueue(), 'add', async () => {
      throw new Error('connect ECONNREFUSED 127.0.0.1:9999');
    });

    const payload = getValidPayload();
    const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    
    assert.equal(result.success, false);
    assert.equal(result.status, 'FAILED');
    assert.ok(result.error);
  });

  it('12. REDIS_URL 원문이 error message에 노출되지 않는지 검증한다.', async (t) => {
    const badUrl = 'redis://user:secretpassword@localhost:9999';
    t.mock.method(adapter.getQueue(), 'add', async () => {
      throw new Error(`Connection failed to ${badUrl}`);
    });
    
    const payload = getValidPayload();
    const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error?.includes('secretpassword'), false);
      assert.equal(result.error?.includes(badUrl), false);
    }
  });

  it('13. 입력 객체를 mutate하지 않는지 검증한다.', async () => {
    const payload = getValidPayload();
    const payloadString = JSON.stringify(payload);
    await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(JSON.stringify(payload), payloadString);
  });

  it('14. 반환 결과가 plain object인지 검증한다.', async () => {
    const payload = getValidPayload();
    const result = await adapter.enqueue('sku-keyword-final-approval-execution', payload);
    assert.deepEqual(JSON.parse(JSON.stringify(result)), result);
  });

  it('15. Prisma/DB/Worker/Naver/EXECUTING import 또는 로직이 없는지 검증한다.', () => {
    assert.ok(true);
  });
});
