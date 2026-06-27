import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAcceptanceFinalEvidenceView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-acceptance-final-evidence-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-acceptance-final-evidence-view.service', async (t) => {
  await t.test('should build batchjob execution result display only acceptance final evidence view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAcceptanceFinalEvidenceView(null);

    assert.equal(view.taskName, 'Task 180 - BatchJob Execution Result Display-Only Acceptance Final Evidence Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Acceptance Final Evidence');
    assert.equal(view.evidenceStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_ACCEPTANCE_FINAL_EVIDENCE_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyAcceptanceFinalEvidence, true);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyAcceptanceSealCommit, 'b90df5e');

    assert.equal(view.acceptanceFinalEvidenceItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('acceptance seal은 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('display-only 상태 표시만 수용합니다'));
  });
});
