import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildFinalApprovalExecutionPlan,
  BuildFinalApprovalExecutionPlanInput,
} from './sku-keyword-final-approval-execution-plan-transform.service';

const createValidInput = (): BuildFinalApprovalExecutionPlanInput => {
  const now = new Date('2026-06-20T23:40:00.000Z');
  const validationExpiresAt = new Date('2026-06-20T23:50:00.000Z'); // 10 minutes in the future

  return {
    now,
    adapterMode: 'DRY_RUN',
    payloadHashForComparison: 'valid-payload-hash',
    validationSnapshotHashForComparison: 'valid-snapshot-hash',
    job: {
      id: 'job-123',
      status: 'APPROVED',
    },
    finalApproval: {
      id: 'fa-123',
      jobId: 'job-123',
      version: 1,
      status: 'ACTIVE',
      payloadHash: 'valid-payload-hash',
      validationSnapshotHash: 'valid-snapshot-hash',
      validationExpiresAt,
      items: [
        {
          id: 'fa-item-1',
          jobItemId: 'job-item-1',
        },
      ],
    },
    jobItems: [
      {
        id: 'job-item-1',
        jobId: 'job-123',
        status: 'READY',
        requestPayload: {
          candidate: {
            productId: 'prod-1',
            storeId: 'store-1',
            skuId: 'sku-1',
          },
          dryRunItem: {
            beforeKeywords: ['old'],
            afterKeywords: ['new'],
          },
        },
      },
    ],
  };
};

test('1. 정상 입력이면 ok:true와 ExecutionPlan 생성', () => {
  const input = createValidInput();
  const result = buildFinalApprovalExecutionPlan(input);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.plan);
    assert.equal(result.plan.jobId, 'job-123');
    assert.equal(result.plan.finalApprovalId, 'fa-123');
    assert.equal(result.plan.finalApprovalVersion, 1);
    assert.equal(result.plan.adapterMode, 'DRY_RUN');
    assert.equal(result.plan.payloadHash, 'valid-payload-hash');
    assert.equal(result.plan.validationSnapshotHash, 'valid-snapshot-hash');
    assert.equal(result.plan.validationExpiresAt, '2026-06-20T23:50:00.000Z');
    assert.equal(result.plan.generatedAt, '2026-06-20T23:40:00.000Z');
    assert.equal(result.plan.itemCount, 1);

    const item = result.plan.items[0];
    assert.equal(item.jobItemId, 'job-item-1');
    assert.equal(item.finalApprovalItemId, 'fa-item-1');
    assert.equal(item.productId, 'prod-1');
    assert.equal(item.storeId, 'store-1');
    assert.equal(item.skuId, 'sku-1');
    assert.equal(item.proposedAction, 'UPDATE_KEYWORDS');
    assert.deepEqual(item.candidateSummary, {
      productId: 'prod-1',
      storeId: 'store-1',
      skuId: 'sku-1',
    });
    assert.deepEqual(item.dryRunSummary, {
      beforeKeywords: ['old'],
      afterKeywords: ['new'],
    });
    assert.deepEqual(item.naverApiPayloadCandidate, {
      productId: 'prod-1',
      storeId: 'store-1',
      skuId: 'sku-1',
    });

    // validation flags check
    assert.equal(result.plan.validation.jobStatusValid, true);
    assert.equal(result.plan.validation.itemStatusesValid, true);
    assert.equal(result.plan.validation.activeFinalApprovalValid, true);
    assert.equal(result.plan.validation.validationNotExpired, true);
    assert.equal(result.plan.validation.payloadHashMatched, true);
    assert.equal(result.plan.validation.validationSnapshotHashMatched, true);
    assert.equal(result.plan.validation.itemOwnershipValid, true);
    assert.equal(result.plan.validation.itemCountMatched, true);
  }
});

test('2. job.status가 APPROVED가 아니면 실패', () => {
  const input = createValidInput();
  input.job.status = 'PENDING';

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    assert.ok(result.failures.length > 0);
    const fail = result.failures.find((f) => f.reasonCode === 'JOB_STATUS_NOT_APPROVED');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.jobId, 'job-123');
    assert.equal(fail?.blocking, true);
  }
});

test('3. finalApproval.status가 ACTIVE가 아니면 실패', () => {
  const input = createValidInput();
  input.finalApproval.status = 'EXECUTED';

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    assert.ok(result.failures.length > 0);
    const fail = result.failures.find((f) => f.reasonCode === 'FINAL_APPROVAL_NOT_ACTIVE');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.finalApprovalId, 'fa-123');
    assert.equal(fail?.blocking, true);
  }
});

test('4. validationExpiresAt 만료 시 실패', () => {
  const input = createValidInput();
  // Expires at validationExpiresAt = now - 1 second
  input.finalApproval.validationExpiresAt = new Date('2026-06-20T23:39:59.000Z');

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'FINAL_APPROVAL_EXPIRED');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('5. payloadHash mismatch 시 실패', () => {
  const input = createValidInput();
  input.payloadHashForComparison = 'mismatched-hash';

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'PAYLOAD_HASH_MISMATCH');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('6. validationSnapshotHash mismatch 시 실패', () => {
  const input = createValidInput();
  input.validationSnapshotHashForComparison = 'mismatched-hash';

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'VALIDATION_SNAPSHOT_HASH_MISMATCH');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('7. item status가 READY가 아니면 실패', () => {
  const input = createValidInput();
  input.jobItems[0].status = 'PROCESSING';

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'ITEM_STATUS_NOT_READY');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
    assert.equal(fail?.jobItemId, 'job-item-1');
    assert.equal(fail?.blocking, true);
  }
});

test('8. requestPayload.candidate 누락 시 실패', () => {
  const input = createValidInput();
  const payload = input.jobItems[0].requestPayload as Record<string, unknown>;
  delete payload.candidate;

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'CANDIDATE_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
    assert.equal(fail?.jobItemId, 'job-item-1');
    assert.equal(fail?.blocking, true);
  }
});

test('9. requestPayload.dryRunItem 누락 시 실패', () => {
  const input = createValidInput();
  const payload = input.jobItems[0].requestPayload as Record<string, unknown>;
  delete payload.dryRunItem;

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'DRY_RUN_ITEM_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
    assert.equal(fail?.jobItemId, 'job-item-1');
    assert.equal(fail?.blocking, true);
  }
});

test('10. item ownership 불일치 시 실패', () => {
  // Case A: jobItem의 jobId가 다름
  {
    const input = createValidInput();
    input.jobItems[0].jobId = 'another-job-id';

    const result = buildFinalApprovalExecutionPlan(input);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.plan, null);
      const fail = result.failures.find((f) => f.reasonCode === 'ITEM_OWNERSHIP_INVALID');
      assert.ok(fail);
      assert.equal(fail?.scope, 'ITEM');
      assert.equal(fail?.jobItemId, 'job-item-1');
    }
  }

  // Case B: finalApproval.items의 jobItemId가 jobItems 목록에 없음
  {
    const input = createValidInput();
    input.finalApproval.items[0].jobItemId = 'mismatched-job-item-id';

    const result = buildFinalApprovalExecutionPlan(input);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.plan, null);
      const fail = result.failures.find((f) => f.reasonCode === 'ITEM_OWNERSHIP_INVALID');
      assert.ok(fail);
    }
  }

  // Case C: finalApproval.jobId와 job.id가 불일치
  {
    const input = createValidInput();
    input.finalApproval.jobId = 'another-job-id';

    const result = buildFinalApprovalExecutionPlan(input);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.plan, null);
      const fail = result.failures.find((f) => f.reasonCode === 'ITEM_OWNERSHIP_INVALID');
      assert.ok(fail);
    }
  }
});

test('11. itemCount 불일치 시 실패', () => {
  const input = createValidInput();
  // Add another job item to mismatch counts
  input.jobItems.push({
    id: 'job-item-2',
    jobId: 'job-123',
    status: 'READY',
    requestPayload: {
      candidate: { productId: 'prod-2', storeId: 'store-1' },
      dryRunItem: {},
    },
  });

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'ITEM_OWNERSHIP_INVALID');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
  }
});

test('12. adapterMode가 LIVE면 실패', () => {
  const input = createValidInput();
  input.adapterMode = 'LIVE';

  const result = buildFinalApprovalExecutionPlan(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    const fail = result.failures.find((f) => f.reasonCode === 'UNSUPPORTED_ACTION');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
  }
});
