/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { describe, it, before, after } from 'node:test';
import prisma from '@/lib/prisma';
import { runFinalApprovalExecutionDryRun } from './sku-keyword-final-approval-execution-dry-run-orchestration.service';
import type { BuildFinalApprovalExecutionPlanInput } from './sku-keyword-final-approval-execution-plan-transform.service';

if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.includes('localhost:55432')) {
  throw new Error("CRITICAL SAFETY ERROR: Refusing to run integration test outside the local Docker PostgreSQL database (localhost:55432).");
}
if (process.env.NODE_ENV === 'production') {
  throw new Error("CRITICAL SAFETY ERROR: Refusing to run integration test in production environment.");
}
const productionHosts = ['nas', 'rds', 'prod', 'internal-db'];
if (productionHosts.some(host => process.env.DATABASE_URL?.includes(host))) {
  throw new Error("CRITICAL SAFETY ERROR: Detected production database host string in DATABASE_URL. Execution aborted.");
}

describe('runFinalApprovalExecutionDryRun Integration Test', () => {
  before(async () => {
    // Clear all related tables before starting tests
    await prisma.$transaction([
      prisma.naverApiBatchFinalApprovalItem.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.naverApiBatchFinalApproval.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.naverApiBatchJobItem.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.naverApiBatchJob.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.smartstore.deleteMany({ where: { id: { startsWith: 'test-' } } }),
    ]);
  });

  after(async () => {
    // Cleanup after all tests
    await prisma.$transaction([
      prisma.naverApiBatchFinalApprovalItem.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.naverApiBatchFinalApproval.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.naverApiBatchJobItem.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.naverApiBatchJob.deleteMany({ where: { id: { startsWith: 'test-' } } }),
      prisma.smartstore.deleteMany({ where: { id: { startsWith: 'test-' } } }),
    ]);
    await prisma.$disconnect();
  });

  const setupFixture = async (overrides: {
    jobStatus?: string;
    jobItemStatus?: string;
    finalApprovalStatus?: string;
    validationExpiresAt?: Date;
    payloadHash?: string;
    validationSnapshotHash?: string;
  } = {}) => {
    const testId = crypto.randomUUID();
    const storeId = `test-store-${testId}`;
    const jobId = `test-job-${testId}`;
    const jobItemId = `test-job-item-${testId}`;
    const finalApprovalId = `test-fa-${testId}`;
    const finalApprovalItemId = `test-fai-${testId}`;
    const sellerId = `test-seller-${testId}`;

    const store = await prisma.smartstore.create({
      data: {
        id: storeId,
        name: 'Test Store',
        sellerId: sellerId,
      },
    });

    const job = await prisma.naverApiBatchJob.create({
      data: {
        id: jobId,
        jobType: 'PRICE_STOCK_UPDATE',
        module: 'SKU_KEYWORD_MATCHING',
        status: (overrides.jobStatus || 'APPROVED') as any,
        totalItems: 1,
        dryRun: false,
      },
    });

    const jobItem = await prisma.naverApiBatchJobItem.create({
      data: {
        id: jobItemId,
        batchJobId: job.id,
        storeId: store.id,
        channelId: 'channel-123',
        targetType: 'SINGLE',
        targetId: 'cp-12345',
        channelProductNo: 'cp-12345',
        operation: 'UPDATE_PRICE',
        calculationType: 'SINGLE',
        status: (overrides.jobItemStatus || 'READY') as any,
        previewBefore: { price: 1500, stock: 100 },
        previewAfter: { price: 2000, stock: 100 },
        requestPayload: {
          candidate: {
            productId: 'test-product-id',
            itemId: 'test-product-id',
            channelProductNo: 'cp-12345',
            channelId: 'channel-123',
            candidateType: 'PRODUCT',
            storeId: store.id,
          },
          dryRunItem: {
            someData: true,
          }
        },
      },
    });

    const finalApproval = await prisma.naverApiBatchFinalApproval.create({
      data: {
        id: finalApprovalId,
        jobId: job.id,
        version: 1,
        status: (overrides.finalApprovalStatus || 'ACTIVE') as any,
        finalApprovedAt: new Date(),
        finalApprovedBy: 'test-user',
        approvalSource: 'TEST',
        validationSnapshot: { someData: true },
        validationSnapshotHash: overrides.validationSnapshotHash || 'valid-snapshot-hash',
        validationExpiresAt: overrides.validationExpiresAt || new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
        payloadHash: overrides.payloadHash || 'valid-payload-hash',
        executionScope: { type: 'ALL' },
        hashSpec: { version: '1.0' },
      },
    });

    const finalApprovalItem = await prisma.naverApiBatchFinalApprovalItem.create({
      data: {
        id: finalApprovalItemId,
        finalApprovalId: finalApproval.id,
        jobItemId: jobItem.id,
        targetType: 'SINGLE',
        targetId: 'cp-12345',
        storeId: store.id,
        operation: 'UPDATE_PRICE',
        included: true,
        itemPayloadHash: 'valid-item-payload-hash',
        itemValidationHash: 'valid-item-snapshot-hash',
      },
    });

    return { store, job, jobItem, finalApproval, finalApprovalItem };
  };

  const cleanupFixture = async (fixture: { store: { id: string }, job: { id: string }, jobItem: { id: string }, finalApproval: { id: string }, finalApprovalItem: { id: string } }) => {
    await prisma.$transaction([
      prisma.naverApiBatchFinalApprovalItem.delete({ where: { id: fixture.finalApprovalItem.id } }),
      prisma.naverApiBatchFinalApproval.delete({ where: { id: fixture.finalApproval.id } }),
      prisma.naverApiBatchJobItem.delete({ where: { id: fixture.jobItem.id } }),
      prisma.naverApiBatchJob.delete({ where: { id: fixture.job.id } }),
      prisma.smartstore.delete({ where: { id: fixture.store.id } }),
    ]);
  };

  it('1. 정상 실행 시나리오', async () => {
    const fixture = await setupFixture();
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: {
        id: fixture.job.id,
        status: fixture.job.status as string,
      },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status as string,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [
          {
            id: fixture.finalApprovalItem.id,
            jobItemId: fixture.finalApprovalItem.jobItemId,
          },
        ],
      },
      jobItems: [
        {
          id: fixture.jobItem.id,
          jobId: fixture.jobItem.batchJobId,
          status: fixture.jobItem.status as string,
          requestPayload: fixture.jobItem.requestPayload,
        },
      ],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.plan.itemCount, 1);
      assert.equal(result.dryRunResult.itemCount, 1);
      assert.equal(result.dryRunResult.successCount, 1);
      assert.equal(result.dryRunResult.failureCount, 0);
    }

    await cleanupFixture(fixture);
  });

  it('2. FinalApproval 만료 검증', async () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago
    const fixture = await setupFixture({ validationExpiresAt: pastDate });
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload: fixture.jobItem.requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures[0].reasonCode, 'FINAL_APPROVAL_EXPIRED');
    }

    await cleanupFixture(fixture);
  });

  it('3. Job 상태 미승인 검증', async () => {
    const fixture = await setupFixture({ jobStatus: 'DRAFT' });
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload: fixture.jobItem.requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures.some(f => f.reasonCode === 'JOB_STATUS_NOT_APPROVED'), true);
    }

    await cleanupFixture(fixture);
  });

  it('4. Item 상태 준비 안됨 검증', async () => {
    const fixture = await setupFixture({ jobItemStatus: 'DRAFT' });
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload: fixture.jobItem.requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    // According to the logic, this might return plan but item failure, or block at plan level
    // We check if OK is false and error code includes ITEM_STATUS_NOT_READY (or maybe it collects it)
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures.some(f => f.reasonCode === 'ITEM_STATUS_NOT_READY'), true);
    }

    await cleanupFixture(fixture);
  });

  it('5. payloadHash 불일치 검증', async () => {
    const fixture = await setupFixture();
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'wrong-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload: fixture.jobItem.requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures.some(f => f.reasonCode === 'PAYLOAD_HASH_MISMATCH'), true);
    }

    await cleanupFixture(fixture);
  });

  it('6. validationSnapshotHash 불일치 검증', async () => {
    const fixture = await setupFixture();
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'wrong-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload: fixture.jobItem.requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures.some(f => f.reasonCode === 'VALIDATION_SNAPSHOT_HASH_MISMATCH'), true);
    }

    await cleanupFixture(fixture);
  });

  it('7. 식별자 누락 검증', async () => {
    const fixture = await setupFixture();
    
    const now = new Date();
    
    // 순수 함수에 전달하기 직전에 식별자 필드만 제거 (DB FK 유지)
    const requestPayload: any = JSON.parse(JSON.stringify(fixture.jobItem.requestPayload));
    if (requestPayload && requestPayload.candidate) {
      delete requestPayload.candidate.productId;
    }

    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures.some(f => f.reasonCode === 'REQUIRED_IDENTIFIER_MISSING'), true);
    }

    await cleanupFixture(fixture);
  });

  it('8. ACTIVE 최종승인 없음 검증', async () => {
    const fixture = await setupFixture({ finalApprovalStatus: 'SUPERSEDED' });
    
    const now = new Date();
    const input: BuildFinalApprovalExecutionPlanInput = {
      now,
      adapterMode: 'DRY_RUN',
      payloadHashForComparison: 'valid-payload-hash',
      validationSnapshotHashForComparison: 'valid-snapshot-hash',
      job: { id: fixture.job.id, status: fixture.job.status },
      finalApproval: {
        id: fixture.finalApproval.id,
        jobId: fixture.finalApproval.jobId,
        version: fixture.finalApproval.version,
        status: fixture.finalApproval.status,
        payloadHash: fixture.finalApproval.payloadHash,
        validationSnapshotHash: fixture.finalApproval.validationSnapshotHash,
        validationExpiresAt: fixture.finalApproval.validationExpiresAt,
        items: [{ id: fixture.finalApprovalItem.id, jobItemId: fixture.finalApprovalItem.jobItemId }],
      },
      jobItems: [{ id: fixture.jobItem.id, jobId: fixture.jobItem.batchJobId, status: fixture.jobItem.status, requestPayload: fixture.jobItem.requestPayload }],
    };

    const result = runFinalApprovalExecutionDryRun(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.failures.some(f => f.reasonCode === 'FINAL_APPROVAL_NOT_ACTIVE'), true);
    }

    await cleanupFixture(fixture);
  });
});
