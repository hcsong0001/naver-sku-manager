import test from 'node:test';
import assert from 'node:assert';
import {
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalUiPayloadConversionView
} from './sku-keyword-final-approval-execution-batchjob-result-display-only-status-summary-final-ui-payload-conversion-view.service';

test('Task 197: BatchJob Execution Result Display-Only Status Summary Final UI Payload Conversion Screen Flow View', async (t) => {
  await t.test('read-only 속성이 true여야 하며, 실행 관련 필드는 모두 false여야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalUiPayloadConversionView({});

    assert.strictEqual(view.isReadOnly, true);
    assert.strictEqual(view.isDisplayOnlyStatusSummaryFinalUiPayloadConversion, true);
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

  await t.test('job 상태에 따라 아이템 개수가 정확히 계산되어야 함', () => {
    const mockJob = {
      status: 'EXECUTED',
      items: [
        { status: 'SUCCESS' },
        { status: 'FAILED' },
        { status: 'FAILED' },
        { status: 'SKIPPED' },
        { status: 'READY' }
      ]
    };

    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalUiPayloadConversionView(mockJob);

    assert.strictEqual(view.uiPayloadBatchJobStatus, 'EXECUTED');
    assert.strictEqual(view.uiPayloadTotalItemCount, 5);
    assert.strictEqual(view.uiPayloadSuccessItemCount, 1);
    assert.strictEqual(view.uiPayloadFailedItemCount, 2);
    assert.strictEqual(view.uiPayloadSkippedItemCount, 1);
    assert.strictEqual(view.uiPayloadReadyItemCount, 1);
    assert.strictEqual(view.uiPayloadUnknownItemCount, 0);
  });

  await t.test('이전 Task 196 커밋 해시(709e648)와 제목을 포함해야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalUiPayloadConversionView({});

    assert.strictEqual(view.previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPresentationLayerHandoverCommit, '709e648');
    assert.strictEqual(view.previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalPresentationLayerHandoverLabel, 'BatchJob Execution Result Display-Only Status Summary Final Presentation Layer Handover');
  });
});
