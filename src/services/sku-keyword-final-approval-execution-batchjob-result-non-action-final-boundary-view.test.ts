import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultNonActionFinalBoundaryView } from './sku-keyword-final-approval-execution-batchjob-result-non-action-final-boundary-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-non-action-final-boundary-view.service', async (t) => {
  await t.test('should build batchjob execution result non action final boundary view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultNonActionFinalBoundaryView(null);

    assert.equal(view.taskName, 'Task 168 - BatchJob Execution Result Non-Action Final Boundary Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Non-Action Final Boundary');
    assert.equal(view.boundaryStatus, 'BATCHJOB_RESULT_NON_ACTION_FINAL_BOUNDARY_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isFinalBoundaryOnly, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
    assert.equal(view.isBatchJobResultInsideExecutionBoundary, false);
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

    assert.equal(view.previousExecutionBatchJobResultNonActionSealCommit, '926df2b');

    assert.equal(view.finalBoundaryItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('non-action seal은 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('실행 경계 밖의 상태 표시 영역'));
  });
});
