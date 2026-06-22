import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach, after } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {
  createFinalApprovalExecutionRouteQueuePort,
  resetFakeQueueAdapterInstanceForTest,
  FakeQueueAdapterForRoute
} from './sku-keyword-final-approval-execution-route-queue-port-factory.service';
import type { FinalApprovalExecutionBullmqQueueAdapter } from './sku-keyword-final-approval-execution-bullmq-queue-adapter.service';

describe('FinalApproval Execution Route Queue Port Factory', () => {
  // BullMQ 백그라운드 연결 시도 시 unhandled rejection 방지
  process.on('unhandledRejection', () => {});
  process.on('uncaughtException', () => {});

  const REDIS_URL = 'redis://localhost:56379';

  let originalEnvQueue: string | undefined;
  let originalEnvFakeTest: string | undefined;
  let originalNodeEnv: string | undefined;
  let originalFakeFailMode: string | undefined;
  let originalAdapterType: string | undefined;
  let originalRedisUrl: string | undefined;

  // BullMQ adapter 인스턴스를 추적하여 테스트 후 close
  const bullmqAdaptersToClose: FinalApprovalExecutionBullmqQueueAdapter[] = [];

  beforeEach(() => {
    originalEnvQueue = process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE;
    originalEnvFakeTest = process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY;
    originalNodeEnv = process.env.NODE_ENV;
    originalFakeFailMode = process.env.FAKE_QUEUE_FAIL_MODE;
    originalAdapterType = process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER;
    originalRedisUrl = process.env.REDIS_URL;

    resetFakeQueueAdapterInstanceForTest();
  });

  afterEach(async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = originalEnvQueue;
    process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = originalEnvFakeTest;
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: originalNodeEnv },
      configurable: true
    });
    process.env.FAKE_QUEUE_FAIL_MODE = originalFakeFailMode;
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = originalAdapterType;
    process.env.REDIS_URL = originalRedisUrl;
    resetFakeQueueAdapterInstanceForTest();

    // 테스트에서 생성된 BullMQ adapter를 모두 close
    for (const adapter of bullmqAdaptersToClose) {
      try {
        await adapter.close();
      } catch {
        // ignore
      }
    }
    bullmqAdaptersToClose.length = 0;
  });

  after(async () => {
    // 최종 정리
    for (const adapter of bullmqAdaptersToClose) {
      try {
        await adapter.close();
      } catch {
        // ignore
      }
    }
    bullmqAdaptersToClose.length = 0;
  });

  it('1. adapter 미설정이면 안전 실패(null)가 반환된다.', () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    delete process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER;
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'test' },
      configurable: true
    });

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.equal(port, null);
  });

  it('2. FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=fake-test-only이고 NODE_ENV=test이면 Fake Queue 경로가 유지된다.', () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'fake-test-only';
    process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = 'true';
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'test' },
      configurable: true
    });

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);
    assert.ok(port instanceof FakeQueueAdapterForRoute);
  });

  it('3. FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=fake-test-only이고 NODE_ENV !== test이면 Fake Queue 성공 경로가 차단된다.', () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'fake-test-only';
    process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = 'true';
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'production' },
      configurable: true
    });

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.equal(port, null);
  });

  it('4. FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq이고 REDIS_URL이 없으면 안전 실패(null)가 반환된다.', () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    delete process.env.REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.equal(port, null);
  });

  it('5. FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER=bullmq이고 REDIS_URL이 있으면 BullMQ Adapter가 생성된다.', () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);
    // BullMQ adapter는 FakeQueueAdapterForRoute가 아니어야 함
    assert.equal(port instanceof FakeQueueAdapterForRoute, false);
    // close/getQueue 메서드가 존재해야 함
    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    assert.equal(typeof adapter.close, 'function');
    assert.equal(typeof adapter.getQueue, 'function');
    bullmqAdaptersToClose.push(adapter);
  });

  it('6. Docker Redis 기반 BullMQ enqueue가 성공한다.', async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);

    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    bullmqAdaptersToClose.push(adapter);

    // 큐 초기화
    await adapter.getQueue().obliterate({ force: true });

    const payload = {
      finalApprovalId: 'fa-factory-test',
      actorId: 'user-factory',
      idempotencyKey: `idem-factory-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      source: 'EXECUTION_API' as const,
      mode: 'MOCK' as const
    };

    const result = await port.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(result.success, true);
    assert.equal(result.status, 'ENQUEUED');
    assert.equal(result.jobId, payload.idempotencyKey);

    // 정리
    await adapter.getQueue().obliterate({ force: true });
  });

  it('7. Queue name은 final-approval-execution이다.', () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);

    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    bullmqAdaptersToClose.push(adapter);

    assert.equal(adapter.getQueue().name, 'final-approval-execution');
  });

  it('8. Job name은 sku-keyword-final-approval-execution이다.', async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);

    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    bullmqAdaptersToClose.push(adapter);

    await adapter.getQueue().obliterate({ force: true });

    const payload = {
      finalApprovalId: 'fa-jobname-test',
      actorId: 'user-jobname',
      idempotencyKey: `idem-jobname-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      source: 'EXECUTION_API' as const,
      mode: 'MOCK' as const
    };

    await port.enqueue('sku-keyword-final-approval-execution', payload);
    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.ok(job);
    assert.equal(job.name, 'sku-keyword-final-approval-execution');

    await adapter.getQueue().obliterate({ force: true });
  });

  it('9. jobId는 idempotencyKey와 같다.', async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);

    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    bullmqAdaptersToClose.push(adapter);

    await adapter.getQueue().obliterate({ force: true });

    const payload = {
      finalApprovalId: 'fa-idem-test',
      actorId: 'user-idem',
      idempotencyKey: `idem-key-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      source: 'EXECUTION_API' as const,
      mode: 'MOCK' as const
    };

    const result = await port.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(result.jobId, payload.idempotencyKey);

    await adapter.getQueue().obliterate({ force: true });
  });

  it('10. Queue payload는 최소 필드만 포함한다.', async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);

    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    bullmqAdaptersToClose.push(adapter);

    await adapter.getQueue().obliterate({ force: true });

    const payload = {
      finalApprovalId: 'fa-min-test',
      actorId: 'user-min',
      idempotencyKey: `idem-min-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      source: 'EXECUTION_API' as const,
      mode: 'MOCK' as const
    };

    const dirtyPayload = { ...payload, __secret__: 'leaked', isAdmin: true };
    await port.enqueue(
      'sku-keyword-final-approval-execution',
      dirtyPayload as unknown as typeof payload
    );

    const job = await adapter.getQueue().getJob(payload.idempotencyKey);
    assert.ok(job);
    assert.equal((job.data as unknown as Record<string, unknown>).__secret__, undefined);
    assert.equal((job.data as unknown as Record<string, unknown>).isAdmin, undefined);
    assert.equal(job.data.finalApprovalId, payload.finalApprovalId);

    await adapter.getQueue().obliterate({ force: true });
  });

  it('11. REDIS_URL 원문이 실패 메시지에 노출되지 않는다.', async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
    process.env.REDIS_URL = REDIS_URL;

    const port = createFinalApprovalExecutionRouteQueuePort();
    assert.ok(port);

    const adapter = port as unknown as FinalApprovalExecutionBullmqQueueAdapter;
    bullmqAdaptersToClose.push(adapter);

    // queue.add를 mock하여 REDIS_URL이 포함된 에러를 발생시킴
    const badUrl = 'redis://user:secretpassword@localhost:9999';
    const queue = adapter.getQueue();
    const originalAdd = queue.add.bind(queue);
    queue.add = async () => {
      throw new Error(`Connection failed to ${badUrl}`);
    };

    const payload = {
      finalApprovalId: 'fa-redact-test',
      actorId: 'user-redact',
      idempotencyKey: `idem-redact-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      source: 'EXECUTION_API' as const,
      mode: 'MOCK' as const
    };

    const result = await port.enqueue('sku-keyword-final-approval-execution', payload);
    assert.equal(result.success, false);
    if (!result.success && result.error) {
      assert.equal(result.error.includes('secretpassword'), false);
      assert.equal(result.error.includes(badUrl), false);
    }

    // 원래 함수 복원
    queue.add = originalAdd;
  });

  it('12. route.ts가 BullMQ를 직접 import하지 않는지 검증한다.', () => {
    const routePath = path.resolve(process.cwd(), 'app', 'api', 'sku-keyword-final-approvals', 'execute', 'route.ts');
    const content = fs.readFileSync(routePath, 'utf-8');
    assert.equal(content.includes('from \'bullmq\''), false, 'route.ts must not import bullmq');
    assert.equal(content.includes('from "bullmq"'), false, 'route.ts must not import bullmq');
    assert.equal(content.includes('from \'ioredis\''), false, 'route.ts must not import ioredis');
    assert.equal(content.includes('from "ioredis"'), false, 'route.ts must not import ioredis');
  });

  it('13. Factory 또는 route에서 Prisma/DB write/Naver/EXECUTING 로직이 없는지 검증한다.', () => {
    const factoryPath = path.resolve(process.cwd(), 'src', 'services', 'sku-keyword-final-approval-execution-route-queue-port-factory.service.ts');
    const content = fs.readFileSync(factoryPath, 'utf-8');
    const forbidden = ['PrismaClient', '@prisma', 'DATABASE_URL', '.create(', '.update(', '.delete(', '.upsert(', 'Naver', 'naver', 'LIVE adapter', 'EXECUTING', 'axios', 'FLUSHDB'];
    for (const pattern of forbidden) {
      assert.equal(content.includes(pattern), false, `Factory must not contain "${pattern}"`);
    }
  });
});
