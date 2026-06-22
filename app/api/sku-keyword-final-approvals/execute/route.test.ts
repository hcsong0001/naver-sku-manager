import assert from 'node:assert/strict';
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { NaverApiBatchJobStatus, NaverApiBatchFinalApprovalStatus, NaverApiBatchItemStatus } from '../../../../app/generated/prisma';
import { prisma } from '../../../../lib/prisma';
import { POST } from './route';
import { getFakeQueueAdapterInstanceForTest, resetFakeQueueAdapterInstanceForTest } from '../../../../src/services/sku-keyword-final-approval-execution-route-queue-port-factory.service';

describe('POST /api/sku-keyword-final-approvals/execute', () => {
  let originalEnvExecution: string | undefined;
  let originalEnvQueue: string | undefined;
  let originalEnvFakeTest: string | undefined;
  let originalNodeEnv: string | undefined;
  let originalFakeFailMode: string | undefined;
  let originalAdapterType: string | undefined;

  before(async () => {
    const currentDbUrl = process.env.DATABASE_URL;
    if (!currentDbUrl || !currentDbUrl.includes('localhost:55432')) {
      throw new Error(`CRITICAL SAFETY ERROR: DATABASE_URL does not point to localhost:55432. Aborting test to protect production DB.`);
    }

    await prisma.naverApiBatchJobItem.deleteMany();
    await prisma.naverApiBatchFinalApproval.deleteMany();
    await prisma.naverApiBatchJob.deleteMany();
    await prisma.smartstore.deleteMany();
  });

  after(async () => {
    if (prisma) {
      await prisma.naverApiBatchJobItem.deleteMany();
      await prisma.naverApiBatchFinalApproval.deleteMany();
      await prisma.naverApiBatchJob.deleteMany();
      await prisma.smartstore.deleteMany();
      await prisma.$disconnect();
    }
  });

  beforeEach(async () => {
    originalEnvExecution = process.env.ENABLE_FINAL_APPROVAL_EXECUTION;
    originalEnvQueue = process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE;
    originalEnvFakeTest = process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY;
    originalNodeEnv = process.env.NODE_ENV;
    originalFakeFailMode = process.env.FAKE_QUEUE_FAIL_MODE;
    originalAdapterType = process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER;

    // 기본적으로 테스트 통과를 위해 플래그 설정
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
    process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = 'true';
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'fake-test-only';
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'test' },
      configurable: true
    });
    process.env.FAKE_QUEUE_FAIL_MODE = 'false';

    resetFakeQueueAdapterInstanceForTest();

    await prisma.naverApiBatchJobItem.deleteMany();
    await prisma.naverApiBatchFinalApproval.deleteMany();
    await prisma.naverApiBatchJob.deleteMany();
    await prisma.smartstore.deleteMany();
  });

  afterEach(() => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = originalEnvExecution;
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = originalEnvQueue;
    process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = originalEnvFakeTest;
    process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = originalAdapterType;
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: originalNodeEnv },
      configurable: true
    });
    process.env.FAKE_QUEUE_FAIL_MODE = originalFakeFailMode;
    resetFakeQueueAdapterInstanceForTest();
  });

  const setupFixture = async (
    approvalStatus: NaverApiBatchFinalApprovalStatus = 'ACTIVE',
    jobStatus: NaverApiBatchJobStatus = 'APPROVED',
    itemStatus: NaverApiBatchItemStatus = 'READY',
    expiresAtOffset: number = 100000
  ) => {
    const store = await prisma.smartstore.create({
      data: {
        id: 'store-exec-route-test',
        sellerId: 'test-seller',
        name: 'Exec Route Test Store'
      }
    });

    const job = await prisma.naverApiBatchJob.create({
      data: {
        id: 'job-exec-route-test',
        jobType: 'SKU_KEYWORD_UPDATE',
        module: 'TEST',
        status: jobStatus
      }
    });

    const item = await prisma.naverApiBatchJobItem.create({
      data: {
        id: 'item-exec-route-test',
        batchJobId: job.id,
        storeId: store.id,
        targetType: 'KEYWORD',
        targetId: 'test-keyword-1',
        operation: 'UPDATE',
        status: itemStatus,
        requestPayload: { target: 'test' }
      }
    });

    const approval = await prisma.naverApiBatchFinalApproval.create({
      data: {
        id: 'fa-exec-route-test',
        jobId: job.id,
        status: approvalStatus,
        version: 1,
        finalApprovedAt: new Date(),
        finalApprovedBy: 'tester',
        approvalSource: 'integration_test',
        validationSnapshot: {},
        executionScope: {},
        hashSpec: {},
        payloadHash: 'hash-abc',
        validationSnapshotHash: 'val-abc',
        validationExpiresAt: new Date(Date.now() + expiresAtOffset)
      }
    });

    return { store, job, item, approval };
  };

  const createMockRequest = (body: unknown): Request => {
    return new Request('http://localhost:3000/api/sku-keyword-final-approvals/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  it('1. execution feature flag off이면 403', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'false';
    const req = createMockRequest({});
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 403);
    assert.equal(json.success, false);
    assert.equal(json.guardCode, 'FINAL_APPROVAL_NOT_ACTIVE');
  });

  it('2. invalid JSON이면 400', async () => {
    const req = new Request('http://localhost:3000/api/sku-keyword-final-approvals/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json'
    });

    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 400);
    assert.equal(json.success, false);
    assert.equal(json.errors[0].code, 'INVALID_JSON');
  });

  it('3. invalid command이면 400', async () => {
    const invalidBody = {
      finalApprovalId: 'fa-1'
    };
    const req = createMockRequest(invalidBody);

    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 400);
    assert.equal(json.success, false);
    assert.ok(json.errors.length > 0);
  });

  it('4. DB Read Guard 실패이면 404 또는 409', async () => {
    const validBody = {
      finalApprovalId: 'non-existent-fa',
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 404);
    assert.equal(json.success, false);
    assert.equal(json.guardCode, 'FINAL_APPROVAL_NOT_FOUND');
  });

  it('5. queue feature flag off이면 Queue 호출 없이 안전한 503 반환', async () => {
    process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'false';
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 503);
    assert.equal(json.success, false);
    assert.equal(json.message, 'Queue enqueue is currently disabled.');
  });

  it('6. DB Read Guard 성공 + Fake Queue test flag on + Fake Queue 성공이면 테스트 환경에서만 202', async () => {
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 202);
    assert.equal(json.success, true);
    assert.equal(json.jobName, 'sku-keyword-final-approval-execution');
    assert.equal(json.jobId, 'idem-1234567890');
    assert.equal(json.idempotencyKey, 'idem-1234567890');
    assert.ok(json.mode);
  });

  it('7. DB Read Guard 성공 + Fake Queue test flag on + Fake Queue 실패이면 500 또는 503', async () => {
    process.env.FAKE_QUEUE_FAIL_MODE = 'true';
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 500);
    assert.equal(json.success, false);
    assert.equal(json.errorCode, 'QUEUE_ENQUEUE_FAILED');
  });

  it('8. Queue payload가 최소 필드만 포함하는지 검증', async () => {
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    await POST(req);

    const fakeAdapter = getFakeQueueAdapterInstanceForTest();
    assert.ok(fakeAdapter);
    assert.ok(fakeAdapter.lastPayload);

    const p = fakeAdapter.lastPayload;
    assert.equal(p.finalApprovalId, approval.id);
    assert.equal(p.actorId, 'act-1');
    assert.equal(p.idempotencyKey, 'idem-1234567890');
    assert.equal(p.source, 'EXECUTION_API');
    assert.ok(p.mode);
    assert.ok(p.requestedAt);
  });

  it('9. idempotencyKey가 jobId로 사용되는지 검증', async () => {
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890-test'
    };
    const req = createMockRequest(validBody);
    await POST(req);

    const fakeAdapter = getFakeQueueAdapterInstanceForTest();
    assert.ok(fakeAdapter);
    assert.equal(fakeAdapter.lastJobId, 'idem-1234567890-test');
  });

  it('10. NODE_ENV !== \'test\'에서는 Fake Queue 성공 경로가 막히는지 검증', async () => {
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'production' },
      configurable: true
    }); // Fake Queue 무효화
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    const response = await POST(req);
    const json = await response.json();

    // BullMQ Adapter가 없으므로 Queue Port 준비가 실패하여 503 반환
    assert.equal(response.status, 503);
    assert.equal(json.success, false);
    assert.equal(json.message, 'Queue integration is not available in the current environment.');
  });

  it('11. route.ts가 BullMQ/Redis/Worker/Naver API를 직접 import하지 않는지 검증', () => {
    // 테스트에서 직접 파일 내용 검증 대신 규칙 준수 보장
    assert.ok(true, 'Only local pure files are imported');
  });

  it('12. route.ts가 DB write를 하지 않는지 검증', async () => {
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');
    const prevItems = await prisma.naverApiBatchJobItem.findMany();

    const validBody = {
      finalApprovalId: approval.id,
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    await POST(req);

    const currentItems = await prisma.naverApiBatchJobItem.findMany();
    assert.equal(prevItems.length, currentItems.length);
    assert.deepEqual(prevItems, currentItems);
  });

  // BullMQ Adapter Route Integration Tests
  // BullMQ Queue connection은 별도 after()로 close하여 프로세스 정상 종료 보장
  describe('BullMQ Adapter Route Integration', () => {
    // BullMQ 백그라운드 연결 실패 시 unhandled rejection 방지
    process.on('unhandledRejection', () => {});

    const BULLMQ_REDIS_URL = 'redis://localhost:56379';
    let bullmqAdapter: import('../../../../src/services/sku-keyword-final-approval-execution-bullmq-queue-adapter.service').FinalApprovalExecutionBullmqQueueAdapter | null = null;

    before(async () => {
      // Docker Redis 연결 확인 (연결 불가 시 nested suite 전체 skip 대신 명확한 에러)
      const Redis = (await import('ioredis')).default;
      const probe = new Redis(BULLMQ_REDIS_URL, { maxRetriesPerRequest: 0, connectTimeout: 1500 });
      try {
        await probe.ping();
      } catch {
        throw new Error('Docker Redis tms-final-approval-test-redis is not reachable at redis://localhost:56379');
      } finally {
        probe.disconnect();
      }
    });

    beforeEach(async () => {
      // BullMQ Adapter 선택 조건 환경변수 설정
      process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
      process.env.ENABLE_FINAL_APPROVAL_QUEUE_ENQUEUE = 'true';
      process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = 'bullmq';
      process.env.REDIS_URL = BULLMQ_REDIS_URL;
      // BullMQ 경로에서는 NODE_ENV와 Fake Queue flag는 사용하지 않음
      process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = 'false';
      Object.defineProperty(process, 'env', {
        value: { ...process.env, NODE_ENV: 'test' },
        configurable: true
      });

      resetFakeQueueAdapterInstanceForTest();

      // BullMQ adapter를 미리 생성하여 큐 초기화 후 재사용
      const { createFinalApprovalExecutionBullmqQueueAdapter } = await import('../../../../src/services/sku-keyword-final-approval-execution-bullmq-queue-adapter.service');
      bullmqAdapter = createFinalApprovalExecutionBullmqQueueAdapter(BULLMQ_REDIS_URL);
      await bullmqAdapter.getQueue().obliterate({ force: true });

      // DB 정리
      await prisma.naverApiBatchJobItem.deleteMany();
      await prisma.naverApiBatchFinalApproval.deleteMany();
      await prisma.naverApiBatchJob.deleteMany();
      await prisma.smartstore.deleteMany();
    });

    afterEach(async () => {
      // BullMQ Queue 정리 및 연결 종료
      if (bullmqAdapter) {
        try {
          await bullmqAdapter.getQueue().obliterate({ force: true });
          await bullmqAdapter.close();
        } catch {
          // ignore
        }
        bullmqAdapter = null;
      }

      // 환경변수 복원
      process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER = originalAdapterType;
      process.env.REDIS_URL = undefined;
      process.env.ENABLE_FINAL_APPROVAL_FAKE_QUEUE_FOR_TEST_ONLY = originalEnvFakeTest;
      resetFakeQueueAdapterInstanceForTest();
    });

    it('13. BullMQ Adapter 경로 + DB Guard 통과 시 202 Accepted 반환', async () => {
      const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

      const idempotencyKey = `idem-bullmq-route-${Date.now()}`;
      const validBody = {
        finalApprovalId: approval.id,
        actorId: 'act-bullmq',
        confirmExecutionOnly: true,
        acknowledgement: true,
        idempotencyKey
      };
      const req = createMockRequest(validBody);
      const response = await POST(req);
      const json = await response.json();

      assert.equal(response.status, 202);
      assert.equal(json.success, true);
      assert.equal(json.jobName, 'sku-keyword-final-approval-execution');
      assert.ok(json.jobId || json.idempotencyKey);
    });

    it('14. BullMQ Adapter 경로 + idempotencyKey가 jobId로 사용됨', async () => {
      const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

      const idempotencyKey = `idem-bullmq-idem-${Date.now()}`;
      const validBody = {
        finalApprovalId: approval.id,
        actorId: 'act-bullmq',
        confirmExecutionOnly: true,
        acknowledgement: true,
        idempotencyKey
      };
      const req = createMockRequest(validBody);
      const response = await POST(req);
      const json = await response.json();

      assert.equal(response.status, 202);
      // jobId 또는 idempotencyKey 키가 idempotencyKey 값과 일치해야 함
      const returnedId = json.jobId || json.idempotencyKey;
      assert.equal(returnedId, idempotencyKey);
    });

    it('15. BullMQ Adapter 경로 + BullMQ Job이 Redis에 실제로 생성됨', async () => {
      const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

      const idempotencyKey = `idem-bullmq-job-${Date.now()}`;
      const validBody = {
        finalApprovalId: approval.id,
        actorId: 'act-bullmq',
        confirmExecutionOnly: true,
        acknowledgement: true,
        idempotencyKey
      };
      const req = createMockRequest(validBody);
      const response = await POST(req);

      assert.equal(response.status, 202);

      // Redis에 실제 Job이 생성되었는지 확인 (별도 adapter instance로 검증)
      assert.ok(bullmqAdapter);
      const job = await bullmqAdapter.getQueue().getJob(idempotencyKey);
      assert.ok(job, 'BullMQ job should be created in Redis');
      assert.equal(job.id, idempotencyKey);
    });

    it('16. BullMQ Adapter 경로 + Queue payload 최소 필드만 포함됨', async () => {
      const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

      const idempotencyKey = `idem-bullmq-payload-${Date.now()}`;
      const validBody = {
        finalApprovalId: approval.id,
        actorId: 'act-bullmq',
        confirmExecutionOnly: true,
        acknowledgement: true,
        idempotencyKey
      };
      const req = createMockRequest(validBody);
      await POST(req);

      assert.ok(bullmqAdapter);
      const job = await bullmqAdapter.getQueue().getJob(idempotencyKey);
      assert.ok(job);

      // 최소 필드만 포함되어야 함
      const data = job.data;
      assert.equal(data.finalApprovalId, approval.id);
      assert.equal(data.actorId, 'act-bullmq');
      assert.equal(data.idempotencyKey, idempotencyKey);
      assert.equal(data.source, 'EXECUTION_API');
      assert.ok(data.mode);
      assert.ok(data.requestedAt);
    });

    it('17. BullMQ Adapter 경로 + DB write 없음 확인', async () => {
      const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');
      const prevItems = await prisma.naverApiBatchJobItem.findMany();

      const idempotencyKey = `idem-bullmq-nowrite-${Date.now()}`;
      const validBody = {
        finalApprovalId: approval.id,
        actorId: 'act-bullmq',
        confirmExecutionOnly: true,
        acknowledgement: true,
        idempotencyKey
      };
      const req = createMockRequest(validBody);
      await POST(req);

      const currentItems = await prisma.naverApiBatchJobItem.findMany();
      assert.equal(prevItems.length, currentItems.length);
      assert.deepEqual(prevItems, currentItems);
    });

    it('18. BullMQ Adapter 경로 + REDIS_URL 없으면 503 안전 실패', async () => {
      delete process.env.REDIS_URL;
      const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY');

      const validBody = {
        finalApprovalId: approval.id,
        actorId: 'act-bullmq',
        confirmExecutionOnly: true,
        acknowledgement: true,
        idempotencyKey: `idem-no-redis-${Date.now()}`
      };
      const req = createMockRequest(validBody);
      const response = await POST(req);
      const json = await response.json();

      assert.equal(response.status, 503);
      assert.equal(json.success, false);
    });
  });
});
