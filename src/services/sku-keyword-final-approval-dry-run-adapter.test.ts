import assert from 'node:assert/strict';
import test from 'node:test';
import type { FinalApprovalExecutionPlan } from '../types/sku-keyword-final-approval-execution-plan.types';
import {
  runFinalApprovalDryRunAdapter,
  RunFinalApprovalDryRunAdapterInput,
} from './sku-keyword-final-approval-dry-run-adapter.service';

const createValidPlan = (): FinalApprovalExecutionPlan => {
  return {
    jobId: 'job-123',
    finalApprovalId: 'fa-123',
    finalApprovalVersion: 1,
    adapterMode: 'DRY_RUN',
    payloadHash: 'valid-payload-hash',
    validationSnapshotHash: 'valid-snapshot-hash',
    validationExpiresAt: '2026-06-20T23:50:00.000Z',
    generatedAt: '2026-06-20T23:40:00.000Z',
    itemCount: 1,
    items: [
      {
        jobItemId: 'job-item-1',
        finalApprovalItemId: 'fa-item-1',
        productId: 'prod-1',
        storeId: 'store-1',
        skuId: 'sku-1',
        proposedAction: 'UPDATE_KEYWORDS',
        candidateSummary: { candidate: true },
        dryRunSummary: { dryRun: true },
        beforeSummary: { dryRun: true },
        afterSummary: { candidate: true },
        naverApiPayloadCandidate: { candidate: true },
      },
    ],
    summary: {
      totalItems: 1,
      transformableItems: 1,
      blockedItems: 0,
      proposedActionCounts: { UPDATE_KEYWORDS: 1 },
      affectedProductCount: 1,
      hasBlockingFailure: false,
    },
    validation: {
      jobStatusValid: true,
      itemStatusesValid: true,
      activeFinalApprovalValid: true,
      validationNotExpired: true,
      payloadHashMatched: true,
      validationSnapshotHashMatched: true,
      itemOwnershipValid: true,
      itemCountMatched: true,
      generatedFromServerStateAt: '2026-06-20T23:40:00.000Z',
    },
  };
};

test('1. 정상 ExecutionPlan이면 ok:true와 DRY_RUN result 생성', () => {
  const plan = createValidPlan();
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.result);
    assert.equal(result.result.adapterMode, 'DRY_RUN');
    assert.equal(result.result.jobId, 'job-123');
    assert.equal(result.result.finalApprovalId, 'fa-123');
    assert.equal(result.result.finalApprovalVersion, 1);
    assert.equal(result.result.payloadHash, 'valid-payload-hash');
    assert.equal(result.result.validationSnapshotHash, 'valid-snapshot-hash');
    assert.equal(result.result.startedAt, now.toISOString());
    assert.equal(result.result.finishedAt, now.toISOString());
    assert.equal(result.result.itemCount, 1);
    assert.equal(result.result.successCount, 1);
    assert.equal(result.result.failureCount, 0);
    assert.equal(result.result.skippedCount, 0);

    const item = result.result.items[0];
    assert.equal(item.jobItemId, 'job-item-1');
    assert.equal(item.finalApprovalItemId, 'fa-item-1');
    assert.equal(item.productId, 'prod-1');
    assert.equal(item.storeId, 'store-1');
    assert.equal(item.skuId, 'sku-1');
    assert.equal(item.proposedAction, 'UPDATE_KEYWORDS');
    assert.equal(item.result, 'SUCCESS');
    assert.deepEqual(item.beforeSummary, { dryRun: true });
    assert.deepEqual(item.afterSummary, { candidate: true });
    assert.deepEqual(item.payloadCandidateSummary, {
      productId: 'prod-1',
      storeId: 'store-1',
      skuId: 'sku-1',
    });
  }
});

test('2. adapterMode가 LIVE면 실패', () => {
  const plan = createValidPlan();
  plan.adapterMode = 'LIVE'; // LIVE is unsupported
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.result, null);
    const fail = result.failures.find(f => f.reasonCode === 'ADAPTER_MODE_NOT_DRY_RUN');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('3. itemCount와 items.length 불일치 시 실패', () => {
  const plan = createValidPlan();
  plan.itemCount = 2; // mismatch
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.result, null);
    const fail = result.failures.find(f => f.reasonCode === 'ITEM_COUNT_MISMATCH');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('4. summary.hasBlockingFailure가 true면 실패', () => {
  const plan = createValidPlan();
  plan.summary.hasBlockingFailure = true;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.result, null);
    const fail = result.failures.find(f => f.reasonCode === 'PLAN_HAS_BLOCKING_FAILURE');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('5. validation 필수값 중 하나가 false면 실패', () => {
  const plan = createValidPlan();
  plan.validation.jobStatusValid = false;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.result, null);
    const fail = result.failures.find(f => f.reasonCode === 'PLAN_VALIDATION_FAILED');
    assert.ok(fail);
    assert.equal(fail?.scope, 'JOB');
    assert.equal(fail?.blocking, true);
  }
});

test('6. proposedAction이 UPDATE_KEYWORDS가 아니면 실패', () => {
  const plan = createValidPlan();
  plan.items[0].proposedAction = 'DELETE_KEYWORDS' as unknown as 'UPDATE_KEYWORDS';
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.successCount, 0);
    assert.equal(result.result?.failureCount, 1);
    const fail = result.failures.find(f => f.reasonCode === 'UNSUPPORTED_ACTION');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
    assert.equal(fail?.jobItemId, 'job-item-1');
  }
});

test('7. naverApiPayloadCandidate 누락 시 실패', () => {
  const plan = createValidPlan();
  delete (plan.items[0] as Partial<typeof plan.items[0]>).naverApiPayloadCandidate;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.failureCount, 1);
    const fail = result.failures.find(f => f.reasonCode === 'PAYLOAD_CANDIDATE_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
  }
});

test('8. candidateSummary 누락 시 실패', () => {
  const plan = createValidPlan();
  delete (plan.items[0] as Partial<typeof plan.items[0]>).candidateSummary;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.failureCount, 1);
    const fail = result.failures.find(f => f.reasonCode === 'CANDIDATE_SUMMARY_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
  }
});

test('9. dryRunSummary 누락 시 실패', () => {
  const plan = createValidPlan();
  delete (plan.items[0] as Partial<typeof plan.items[0]>).dryRunSummary;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.failureCount, 1);
    const fail = result.failures.find(f => f.reasonCode === 'DRY_RUN_SUMMARY_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
  }
});

test('10. productId 누락 시 item 실패', () => {
  const plan = createValidPlan();
  plan.items[0].productId = null;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.items[0].result, 'FAILED');
    assert.equal(result.result?.items[0].reasonCode, 'REQUIRED_IDENTIFIER_MISSING');
    assert.equal(result.result?.successCount, 0);
    assert.equal(result.result?.failureCount, 1);
    const fail = result.failures.find(f => f.reasonCode === 'REQUIRED_IDENTIFIER_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
  }
});

test('11. storeId 누락 시 item 실패', () => {
  const plan = createValidPlan();
  plan.items[0].storeId = null;
  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.items[0].result, 'FAILED');
    assert.equal(result.result?.items[0].reasonCode, 'REQUIRED_IDENTIFIER_MISSING');
    assert.equal(result.result?.successCount, 0);
    assert.equal(result.result?.failureCount, 1);
    const fail = result.failures.find(f => f.reasonCode === 'REQUIRED_IDENTIFIER_MISSING');
    assert.ok(fail);
    assert.equal(fail?.scope, 'ITEM');
  }
});

test('12. item 일부 실패가 있으면 최초 구현 기준 ok:false', () => {
  const plan = createValidPlan();
  // Add a second item that will fail (missing productId)
  plan.items.push({
    jobItemId: 'job-item-2',
    finalApprovalItemId: 'fa-item-2',
    productId: null,
    storeId: 'store-1',
    skuId: 'sku-2',
    proposedAction: 'UPDATE_KEYWORDS',
    candidateSummary: { candidate: true },
    dryRunSummary: { dryRun: true },
    beforeSummary: { dryRun: true },
    afterSummary: { candidate: true },
    naverApiPayloadCandidate: { candidate: true },
  });
  plan.itemCount = 2;
  plan.summary.totalItems = 2;
  plan.summary.transformableItems = 2;

  const now = new Date('2026-06-20T23:45:00.000Z');
  const input: RunFinalApprovalDryRunAdapterInput = { now, plan };

  const result = runFinalApprovalDryRunAdapter(input);

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.result);
    assert.equal(result.result?.itemCount, 2);
    assert.equal(result.result?.successCount, 1);
    assert.equal(result.result?.failureCount, 1);
    assert.equal(result.result?.items[0].result, 'SUCCESS');
    assert.equal(result.result?.items[1].result, 'FAILED');
    assert.equal(result.failures.length, 1);
    assert.equal(result.failures[0].jobItemId, 'job-item-2');
    assert.equal(result.failures[0].reasonCode, 'REQUIRED_IDENTIFIER_MISSING');
  }
});
