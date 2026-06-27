import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyFinalConfirmationView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-final-confirmation-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-final-confirmation-view.service', async (t) => {
  await t.test('should build batchjob execution result display only final confirmation view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyFinalConfirmationView(null);

    assert.equal(view.taskName, 'Task 172 - BatchJob Execution Result Display-Only Final Confirmation Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Final Confirmation');
    assert.equal(view.confirmationStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_FINAL_CONFIRMATION_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyFinalConfirmation, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
    assert.equal(view.isBatchJobResultDisplayOnly, true);
    assert.equal(view.isBatchJobResultActionArea, false);
    assert.equal(view.hasExecutionButton, false);
    assert.equal(view.hasSubmitAction, false);
    assert.equal(view.hasWorkerTrigger, false);
    assert.equal(view.hasQueueTrigger, false);
    assert.equal(view.hasAdapterTrigger, false);
    assert.equal(view.hasTokenRequestPath, false);
    assert.equal(view.hasNaverApiCallPath, false);
    assert.equal(view.hasOperatingDbWritePath, false);
    assert.equal(view.hasPriceChangePath, false);
    assert.equal(view.hasStockChangePath, false);

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyHandoffBoundaryCommit, '73e499e');

    assert.equal(view.finalConfirmationItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('handoff boundary는 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('최종적으로 상태 표시 영역일 뿐 action 영역이 아닙니다'));
  });
});
