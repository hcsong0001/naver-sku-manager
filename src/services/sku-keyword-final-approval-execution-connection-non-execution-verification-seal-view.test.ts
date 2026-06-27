import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionVerificationSealView } from './sku-keyword-final-approval-execution-connection-non-execution-verification-seal-view.service';

test('sku-keyword-final-approval-execution-connection-non-execution-verification-seal-view.service', async (t) => {
  await t.test('should build execution connection non execution verification seal view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionVerificationSealView(null);

    assert.equal(view.taskName, 'Task 162 - Execution Connection Non-Execution Verification Seal Screen Flow');
    assert.equal(view.panelTitle, 'Execution Connection Non-Execution Verification Seal');
    assert.equal(view.sealStatus, 'NON_EXECUTION_VERIFICATION_SEAL_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isVerificationSealOnly, true);
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

    assert.equal(view.previousExecutionConnectionNonExecutionAuditEvidenceCommit, 'c55c0f5');

    assert.equal(view.verificationSealItems.length, 1);
    assert.equal(view.blockedExecutionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.handoffNoticeToBatchJobExecutionResult.includes('상태 표시 영역일 뿐 실행 허가 영역이 아닙니다'));
    assert.ok(view.finalNotice.includes('실행 허가로 해석되지 않으며'));
  });
});
