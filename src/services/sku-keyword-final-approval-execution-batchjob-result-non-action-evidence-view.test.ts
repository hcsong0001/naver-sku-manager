import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultNonActionEvidenceView } from './sku-keyword-final-approval-execution-batchjob-result-non-action-evidence-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-non-action-evidence-view.service', async (t) => {
  await t.test('should build batchjob execution result non action evidence view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultNonActionEvidenceView(null);

    assert.equal(view.taskName, 'Task 166 - BatchJob Execution Result Non-Action Evidence Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Non-Action Evidence');
    assert.equal(view.evidenceStatus, 'BATCHJOB_RESULT_CONFIRMED_NON_ACTION_EVIDENCE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isNonActionEvidenceOnly, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
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

    assert.equal(view.previousExecutionBatchJobResultReadOnlyBoundaryConfirmationCommit, 'e502ca8');

    assert.equal(view.nonActionEvidenceItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('action 영역이 아니며'));
    assert.ok(view.finalNotice.includes('가격/재고 변경을 발생시키지 않습니다'));
  });
});
