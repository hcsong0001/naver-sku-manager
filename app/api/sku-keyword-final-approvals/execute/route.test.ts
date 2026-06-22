import assert from 'node:assert/strict';
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { NaverApiBatchJobStatus, NaverApiBatchFinalApprovalStatus, NaverApiBatchItemStatus } from '../../../../app/generated/prisma';
import { prisma } from '../../../../lib/prisma';
import { POST } from './route';

describe('POST /api/sku-keyword-final-approvals/execute', () => {
  let originalEnv: string | undefined;

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
    originalEnv = process.env.ENABLE_FINAL_APPROVAL_EXECUTION;
    await prisma.naverApiBatchJobItem.deleteMany();
    await prisma.naverApiBatchFinalApproval.deleteMany();
    await prisma.naverApiBatchJob.deleteMany();
    await prisma.smartstore.deleteMany();
  });

  afterEach(() => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = originalEnv;
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

  it('1. feature flag off이면 DB Read Guard 호출 없이 403', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'false';
    const req = createMockRequest({});
    
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 403);
    assert.equal(json.success, false);
    assert.equal(json.guardCode, 'FINAL_APPROVAL_NOT_ACTIVE');
  });

  it('2. invalid JSON이면 DB Read Guard 호출 없이 400', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
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

  it('3. invalid command이면 DB Read Guard 호출 없이 400', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
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

  it('4. valid command + FinalApproval 없음이면 404', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
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

  it('5. valid command + inactive/expired/job not approved/no ready item이면 409', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
    const { approval } = await setupFixture('INVALIDATED', 'APPROVED', 'READY');

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

    assert.equal(response.status, 409);
    assert.equal(json.success, false);
    assert.equal(json.guardCode, 'FINAL_APPROVAL_NOT_ACTIVE');
  });

  it('6. valid command + 정상 ACTIVE FinalApproval + APPROVED Job + READY Item이면 202', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
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
    assert.equal(json.finalApprovalId, approval.id);
  });
});
