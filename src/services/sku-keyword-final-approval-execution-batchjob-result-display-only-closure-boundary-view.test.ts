import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyClosureBoundaryView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-closure-boundary-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-closure-boundary-view.service', async (t) => {
  await t.test('should build batchjob execution result display only closure boundary view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyClosureBoundaryView(null);

    assert.equal(view.taskName, 'Task 173 - BatchJob Execution Result Display-Only Closure Boundary Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Closure Boundary');
    assert.equal(view.closureBoundaryStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_CLOSURE_BOUNDARY_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyClosureBoundary, true);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyFinalConfirmationCommit, 'dcb6af9');

    assert.equal(view.closureBoundaryItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('final confirmation은 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('closure boundary 안의 상태 표시 영역일 뿐 action 영역이 아닙니다'));
  });
});
