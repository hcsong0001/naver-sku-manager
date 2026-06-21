import assert from 'node:assert/strict';
import { describe, it, before, after, beforeEach } from 'node:test';
import { NaverApiBatchJobStatus, NaverApiBatchFinalApprovalStatus, NaverApiBatchItemStatus } from '../../app/generated/prisma';
import prisma from '../../lib/prisma';
import { createFinalApprovalExecutionDbReadGuardPrismaAdapter } from './sku-keyword-final-approval-execution-db-read-guard-prisma-adapter.service';
import { runFinalApprovalExecutionDbReadGuard } from './sku-keyword-final-approval-execution-db-read-guard.service';

describe('FinalApprovalExecutionDbReadGuard Prisma Adapter Integration Test', () => {
  let adapter: ReturnType<typeof createFinalApprovalExecutionDbReadGuardPrismaAdapter>;

  before(async () => {
    const currentDbUrl = process.env.DATABASE_URL;
    if (!currentDbUrl || !currentDbUrl.includes('localhost:55432')) {
      throw new Error(`CRITICAL SAFETY ERROR: DATABASE_URL does not point to localhost:55432. Aborting test to protect production DB.`);
    }

    adapter = createFinalApprovalExecutionDbReadGuardPrismaAdapter(prisma);

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
    await prisma.naverApiBatchJobItem.deleteMany();
    await prisma.naverApiBatchFinalApproval.deleteMany();
    await prisma.naverApiBatchJob.deleteMany();
    await prisma.smartstore.deleteMany();
  });

  const setupFixture = async (
    approvalStatus: NaverApiBatchFinalApprovalStatus = 'ACTIVE', 
    jobStatus: NaverApiBatchJobStatus = 'APPROVED', 
    itemStatus: NaverApiBatchItemStatus = 'READY',
    expiresAtOffset: number = 100000
  ) => {
    const store = await prisma.smartstore.create({
      data: {
        id: 'store-exec-test',
        sellerId: 'test-seller',
        name: 'Exec Test Store'
      }
    });

    const job = await prisma.naverApiBatchJob.create({
      data: {
        id: 'job-exec-test',
        jobType: 'SKU_KEYWORD_UPDATE',
        module: 'TEST',
        status: jobStatus
      }
    });

    const item = await prisma.naverApiBatchJobItem.create({
      data: {
        id: 'item-exec-test',
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
        id: 'fa-exec-test',
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

  it('1. 정상 FinalApproval/Job/READY Item snapshot 조회 성공', async () => {
    const { approval } = await setupFixture();

    const snapshot = await adapter.findSnapshotForExecutionGuard(approval.id);

    assert.ok(snapshot.finalApproval);
    assert.equal(snapshot.finalApproval.id, approval.id);
    assert.equal(snapshot.finalApproval.status, 'ACTIVE');
    assert.equal(snapshot.finalApproval.payloadHash, 'hash-abc');

    assert.ok(snapshot.job);
    assert.equal(snapshot.job.status, 'APPROVED');

    assert.equal(snapshot.items.length, 1);
    assert.equal(snapshot.items[0].status, 'READY');

    const result = await runFinalApprovalExecutionDbReadGuard({
      finalApprovalId: approval.id,
      actorId: 'test-actor',
      idempotencyKey: 'test-idem'
    }, adapter);

    assert.equal(result.success, true);
  });

  it('2. FinalApproval이 없으면 null 반환', async () => {
    const snapshot = await adapter.findSnapshotForExecutionGuard('non-existent-id');

    assert.equal(snapshot.finalApproval, null);
    assert.equal(snapshot.job, null);
    assert.equal(snapshot.items.length, 0);

    const result = await runFinalApprovalExecutionDbReadGuard({
      finalApprovalId: 'non-existent-id',
      actorId: 'test-actor',
      idempotencyKey: 'test-idem'
    }, adapter);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.guardCode, 'FINAL_APPROVAL_NOT_FOUND');
    }
  });

  it('3. expired fixture에서 guard 실패 확인', async () => {
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'READY', -100000);

    const result = await runFinalApprovalExecutionDbReadGuard({
      finalApprovalId: approval.id,
      actorId: 'test-actor',
      idempotencyKey: 'test-idem'
    }, adapter);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.guardCode, 'VALIDATION_EXPIRED');
    }
  });

  it('4. inactive fixture에서 guard 실패 확인', async () => {
    const { approval } = await setupFixture('INVALIDATED', 'APPROVED', 'READY');

    const result = await runFinalApprovalExecutionDbReadGuard({
      finalApprovalId: approval.id,
      actorId: 'test-actor',
      idempotencyKey: 'test-idem'
    }, adapter);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.guardCode, 'FINAL_APPROVAL_NOT_ACTIVE');
    }
  });

  it('5. job not approved fixture에서 guard 실패 확인', async () => {
    const { approval } = await setupFixture('ACTIVE', 'EXECUTING', 'READY');

    const result = await runFinalApprovalExecutionDbReadGuard({
      finalApprovalId: approval.id,
      actorId: 'test-actor',
      idempotencyKey: 'test-idem'
    }, adapter);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.guardCode, 'JOB_NOT_APPROVED');
    }
  });

  it('6. no ready item fixture에서 guard 실패 확인', async () => {
    const { approval } = await setupFixture('ACTIVE', 'APPROVED', 'SUCCESS');

    const result = await runFinalApprovalExecutionDbReadGuard({
      finalApprovalId: approval.id,
      actorId: 'test-actor',
      idempotencyKey: 'test-idem'
    }, adapter);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.guardCode, 'NO_READY_ITEMS');
    }
  });
});
