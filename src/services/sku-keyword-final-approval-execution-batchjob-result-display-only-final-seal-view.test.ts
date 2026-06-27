import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyFinalSealView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-final-seal-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-final-seal-view.service', async (t) => {
  await t.test('should build batchjob execution result display only final seal view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyFinalSealView(null);

    assert.equal(view.taskName, 'Task 170 - BatchJob Execution Result Display-Only Final Seal Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Final Seal');
    assert.equal(view.sealStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_FINAL_SEAL_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyFinalSeal, true);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyCertificationCommit, '5b42f5a');

    assert.equal(view.displayOnlyFinalSealItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('display-only certification은 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('상태 표시 영역일 뿐 action 영역이 아닙니다'));
  });
});
