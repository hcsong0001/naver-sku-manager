import test from 'node:test';
import assert from 'node:assert';
import {
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundaryView
} from './sku-keyword-final-approval-execution-batchjob-result-display-only-status-summary-final-handoff-boundary-view.service';

test('Task 193: BatchJob Execution Result Display-Only Status Summary Final Handoff Boundary Screen Flow View', async (t) => {
  await t.test('read-only 속성이 true여야 하며, 실행 관련 필드는 모두 false여야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundaryView({});

    assert.strictEqual(view.isReadOnly, true);
    assert.strictEqual(view.isDisplayOnlyStatusSummaryFinalHandoffBoundary, true);
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

    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundaryView(mockJob);

    assert.strictEqual(view.boundaryBatchJobStatus, 'EXECUTED');
    assert.strictEqual(view.boundaryTotalItemCount, 5);
    assert.strictEqual(view.boundarySuccessItemCount, 1);
    assert.strictEqual(view.boundaryFailedItemCount, 2);
    assert.strictEqual(view.boundarySkippedItemCount, 1);
    assert.strictEqual(view.boundaryReadyItemCount, 1);
    assert.strictEqual(view.boundaryUnknownItemCount, 0);
  });

  await t.test('이전 Task 192 커밋 해시(56917ec)와 제목을 포함해야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffBoundaryView({});

    assert.strictEqual(view.previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffCommit, '56917ec');
    assert.strictEqual(view.previousExecutionBatchJobResultDisplayOnlyStatusSummaryFinalHandoffLabel, 'BatchJob Execution Result Display-Only Status Summary Final Handoff');
  });
});
