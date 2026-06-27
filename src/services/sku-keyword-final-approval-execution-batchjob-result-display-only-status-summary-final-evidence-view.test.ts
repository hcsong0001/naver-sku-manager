import test from 'node:test';
import assert from 'node:assert';
import {
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalEvidenceView
} from './sku-keyword-final-approval-execution-batchjob-result-display-only-status-summary-final-evidence-view.service';

test('Task 190: BatchJob Execution Result Display-Only Status Summary Final Evidence Screen Flow View', async (t) => {
  await t.test('read-only 속성이 true여야 하며, 실행 관련 필드는 모두 false여야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalEvidenceView({});

    assert.strictEqual(view.isReadOnly, true);
    assert.strictEqual(view.isDisplayOnlyStatusSummaryFinalEvidence, true);
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

    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalEvidenceView(mockJob);

    assert.strictEqual(view.evidenceBatchJobStatus, 'EXECUTED');
    assert.strictEqual(view.evidenceTotalItemCount, 5);
    assert.strictEqual(view.evidenceSuccessItemCount, 1);
    assert.strictEqual(view.evidenceFailedItemCount, 2);
    assert.strictEqual(view.evidenceSkippedItemCount, 1);
    assert.strictEqual(view.evidenceReadyItemCount, 1);
    assert.strictEqual(view.evidenceUnknownItemCount, 0);
  });

  await t.test('이전 Task 189 커밋 해시(0236494)와 제목을 포함해야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusSummaryFinalEvidenceView({});

    assert.strictEqual(view.previousExecutionBatchJobResultDisplayOnlyStatusSummarySealCommit, '0236494');
    assert.strictEqual(view.previousExecutionBatchJobResultDisplayOnlyStatusSummarySealLabel, 'BatchJob Execution Result Display-Only Status Summary Seal');
  });
});
