import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionFinalLockView } from './sku-keyword-final-approval-execution-connection-non-execution-final-lock-view.service';

test('sku-keyword-final-approval-execution-connection-non-execution-final-lock-view.service', async (t) => {
  await t.test('should build execution connection non execution final lock view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionFinalLockView(null);

    assert.equal(view.taskName, 'Task 163 - Execution Connection Non-Execution Final Lock Screen Flow');
    assert.equal(view.panelTitle, 'Execution Connection Non-Execution Final Lock');
    assert.equal(view.lockStatus, 'NON_EXECUTION_FINAL_LOCK_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isFinalLockOnly, true);
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

    assert.equal(view.previousExecutionConnectionNonExecutionVerificationSealCommit, '4b1dee6');

    assert.equal(view.finalLockItems.length, 1);
    assert.equal(view.blockedExecutionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.handoffNoticeToBatchJobExecutionResult.includes('실행 허가 또는 실행 진입점이 아닙니다'));
    assert.ok(view.finalNotice.includes('verification seal은 실행 허가가 아니며'));
  });
});
