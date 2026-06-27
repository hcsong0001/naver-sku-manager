import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAcceptanceFinalHandoffView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-acceptance-final-handoff-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-acceptance-final-handoff-view.service', async (t) => {
  await t.test('should build batchjob execution result display only acceptance final handoff view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAcceptanceFinalHandoffView(null);

    assert.equal(view.taskName, 'Task 182 - BatchJob Execution Result Display-Only Acceptance Final Handoff Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Acceptance Final Handoff');
    assert.equal(view.handoffStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_ACCEPTANCE_FINAL_HANDOFF_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyAcceptanceFinalHandoff, true);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyAcceptanceFinalSealCommit, '52ecdc8');

    assert.equal(view.acceptanceFinalHandoffItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('acceptance final seal은 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('display-only 상태 표시 handoff입니다'));
  });
});
