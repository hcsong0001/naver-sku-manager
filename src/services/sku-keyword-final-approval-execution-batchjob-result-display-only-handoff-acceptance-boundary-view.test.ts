import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyHandoffAcceptanceBoundaryView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-handoff-acceptance-boundary-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-handoff-acceptance-boundary-view.service', async (t) => {
  await t.test('should build batchjob execution result display only handoff acceptance boundary view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyHandoffAcceptanceBoundaryView(null);

    assert.equal(view.taskName, 'Task 178 - BatchJob Execution Result Display-Only Handoff Acceptance Boundary Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Handoff Acceptance Boundary');
    assert.equal(view.acceptanceBoundaryStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_HANDOFF_ACCEPTANCE_BOUNDARY_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyHandoffAcceptanceBoundary, true);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyClosureFinalHandoffCommit, '3eb63dc');

    assert.equal(view.handoffAcceptanceBoundaryItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('handoff는 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('display-only 상태 표시 handoff만 수용합니다'));
  });
});
