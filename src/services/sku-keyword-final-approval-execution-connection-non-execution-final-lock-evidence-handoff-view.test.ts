import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionFinalLockEvidenceHandoffView } from './sku-keyword-final-approval-execution-connection-non-execution-final-lock-evidence-handoff-view.service';

test('sku-keyword-final-approval-execution-connection-non-execution-final-lock-evidence-handoff-view.service', async (t) => {
  await t.test('should build execution connection non execution final lock evidence handoff view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionFinalLockEvidenceHandoffView(null);

    assert.equal(view.taskName, 'Task 164 - Execution Connection Non-Execution Final Lock Evidence Handoff Screen Flow');
    assert.equal(view.panelTitle, 'Execution Connection Non-Execution Final Lock Evidence Handoff');
    assert.equal(view.handoffStatus, 'FINAL_LOCK_EVIDENCE_HANDOFF_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isEvidenceHandoffOnly, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
    assert.equal(view.hasExecutionButton, false);
    assert.equal(view.hasSubmitAction, false);
    assert.equal(view.hasPostEndpoint, false);
    assert.equal(view.hasWorkerTrigger, false);
    assert.equal(view.hasQueueTrigger, false);
    assert.equal(view.hasAdapterTrigger, false);
    assert.equal(view.hasTokenRequestPath, false);
    assert.equal(view.hasNaverApiCallPath, false);
    assert.equal(view.hasOperatingDbWritePath, false);
    assert.equal(view.hasPriceChangePath, false);
    assert.equal(view.hasStockChangePath, false);

    assert.equal(view.previousExecutionConnectionNonExecutionFinalLockCommit, '38c4e98');

    assert.equal(view.evidenceHandoffItems.length, 1);
    assert.equal(view.blockedExecutionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.batchJobResultBoundaryNotice.includes('실행 시작점이 아닙니다'));
    assert.ok(view.finalNotice.includes('final lock은 실행 허가가 아니며'));
  });
});
