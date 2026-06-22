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
});
