import assert from 'node:assert/strict';
import test from 'node:test';
import type { BuildFinalApprovalExecutionPlanInput } from './sku-keyword-final-approval-execution-plan-transform.service';
import {
  runFinalApprovalExecutionDryRun,
} from './sku-keyword-final-approval-execution-dry-run-orchestration.service';

const createValidOrchestrationInput = (): BuildFinalApprovalExecutionPlanInput => {
  const now = new Date('2026-06-20T23:40:00.000Z');
  const validationExpiresAt = new Date('2026-06-20T23:50:00.000Z');

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

test('1. 정상 입력이면 ok:true, plan, dryRunResult 모두 반환', () => {
  const input = createValidOrchestrationInput();
  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.plan);
    assert.ok(result.dryRunResult);
    assert.equal(result.failures.length, 0);

    assert.equal(result.plan.jobId, 'job-123');
    assert.equal(result.dryRunResult.jobId, 'job-123');
    assert.equal(result.dryRunResult.successCount, 1);
  }
});

test('2. ExecutionPlan 생성 실패 시 ok:false이고 dryRunResult는 null', () => {
  const input = createValidOrchestrationInput();
  input.job.status = 'PENDING';

  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.plan, null);
    assert.equal(result.dryRunResult, null);
    assert.ok(result.failures.length > 0);
    const hasPlanFailure = result.failures.some(f => f.reasonCode === 'JOB_STATUS_NOT_APPROVED');
    assert.ok(hasPlanFailure);
  }
});

test('3. ExecutionPlan 생성 실패 시 DRY_RUN adapter가 실행되지 않았음을 결과 구조로 확인', () => {
  const input = createValidOrchestrationInput();
  input.finalApproval.status = 'EXPIRED';

  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.dryRunResult, null);
  }
});

test('4. DRY_RUN adapter 실패 시 ok:false이고 plan은 유지', () => {
  const input = createValidOrchestrationInput();
  input.jobItems[0].requestPayload = {
    candidate: {
      productId: 'prod-1',
      storeId: 'store-1',
    },
    dryRunItem: null,
  };

  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.plan);
    assert.equal(result.plan.jobId, 'job-123');
    assert.ok(result.dryRunResult);
    assert.equal(result.dryRunResult.failureCount, 1);
  }
});

test('5. DRY_RUN adapter 실패 reasonCode가 failures에 포함됨', () => {
  const input = createValidOrchestrationInput();
  input.jobItems[0].requestPayload = {
    candidate: {
      productId: 'prod-1',
      storeId: 'store-1',
    },
    dryRunItem: null,
  };

  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.failures.length > 0);
    const hasAdapterFailure = result.failures.some(f => f.reasonCode === 'DRY_RUN_SUMMARY_MISSING');
    assert.ok(hasAdapterFailure);
  }
});

test('6. 동일 now가 plan.generatedAt과 dryRunResult.startedAt/finishedAt에 반영됨', () => {
  const input = createValidOrchestrationInput();
  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, true);
  if (result.ok) {
    const expectedTimeStr = input.now.toISOString();
    assert.equal(result.plan.generatedAt, expectedTimeStr);
    assert.equal(result.dryRunResult.startedAt, expectedTimeStr);
    assert.equal(result.dryRunResult.finishedAt, expectedTimeStr);
  }
});

test('7. LIVE adapterMode 입력은 transform 단계 또는 adapter 단계에서 실패', () => {
  const input = createValidOrchestrationInput();
  input.adapterMode = 'LIVE';

  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.dryRunResult, null);
    assert.ok(result.failures.length > 0);
    const hasLiveFailure = result.failures.some(f => f.reasonCode === 'UNSUPPORTED_ACTION');
    assert.ok(hasLiveFailure);
  }
});

test('8. item identifier 누락 시 orchestration 결과 ok:false', () => {
  const input = createValidOrchestrationInput();
  input.jobItems[0].requestPayload = {
    candidate: {
      storeId: 'store-1',
    },
    dryRunItem: {},
  };

  const result = runFinalApprovalExecutionDryRun(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.dryRunResult, null);
    assert.ok(result.failures.length > 0);
    const hasIdentifierFailure = result.failures.some(f => f.reasonCode === 'REQUIRED_IDENTIFIER_MISSING');
    assert.ok(hasIdentifierFailure);
  }
});
