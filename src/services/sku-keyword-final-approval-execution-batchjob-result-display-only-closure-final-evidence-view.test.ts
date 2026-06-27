import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyClosureFinalEvidenceView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-closure-final-evidence-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-closure-final-evidence-view.service', async (t) => {
  await t.test('should build batchjob execution result display only closure final evidence view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyClosureFinalEvidenceView(null);

    assert.equal(view.taskName, 'Task 175 - BatchJob Execution Result Display-Only Closure Final Evidence Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Closure Final Evidence');
    assert.equal(view.evidenceStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_CLOSURE_FINAL_EVIDENCE_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyClosureFinalEvidence, true);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyClosureSealCommit, 'cd2d273');

    assert.equal(view.closureFinalEvidenceItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('closure seal은 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('closure final evidence 안의 상태 표시 영역일 뿐 action 영역이 아닙니다'));
  });
});
