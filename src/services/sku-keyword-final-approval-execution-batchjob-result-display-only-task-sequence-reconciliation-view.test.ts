import test from 'node:test';
import assert from 'node:assert';
import {
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyTaskSequenceReconciliationView
} from './sku-keyword-final-approval-execution-batchjob-result-display-only-task-sequence-reconciliation-view.service';

test('Task 204: BatchJob Display-Only Task Sequence Reconciliation Screen Flow View', async (t) => {
  await t.test('read-only 속성이 true여야 하며, 실행 관련 필드는 모두 false여야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyTaskSequenceReconciliationView({});

    assert.strictEqual(view.isReadOnly, true);
    assert.strictEqual(view.isDisplayOnlyTaskSequenceReconciliation, true);
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);

    assert.strictEqual(view.isExecutionApproved, false);
    assert.strictEqual(view.isReExecutionApproved, false);
    assert.strictEqual(view.isConnectionApproved, false);
    assert.strictEqual(view.isTokenTestApproved, false);
    assert.strictEqual(view.isLiveReady, false);

    assert.strictEqual(view.hasExecutionButton, false);
    assert.strictEqual(view.hasSubmitAction, false);
    assert.strictEqual(view.hasWorkerTrigger, false);
    assert.strictEqual(view.hasQueueTrigger, false);
    assert.strictEqual(view.hasAdapterTrigger, false);
    assert.strictEqual(view.hasTokenRequestPath, false);
    assert.strictEqual(view.hasNaverApiCallPath, false);
    assert.strictEqual(view.hasOperatingDbWritePath, false);
    assert.strictEqual(view.hasPriceChangePath, false);
    assert.strictEqual(view.hasStockChangePath, false);
  });

  await t.test('reconciliation 항목이 존재하고, 각 항목의 isReconciled가 true여야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyTaskSequenceReconciliationView({});
    
    assert.ok(view.reconciliationItems.length > 0);
    
    view.reconciliationItems.forEach(item => {
      assert.ok(item.taskId.includes('192'));
      assert.strictEqual(item.isReconciled, true);
    });
  });
});
