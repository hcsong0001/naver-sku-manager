import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionAuditEvidenceView } from './sku-keyword-final-approval-execution-connection-non-execution-audit-evidence-view.service';

test('sku-keyword-final-approval-execution-connection-non-execution-audit-evidence-view.service', async (t) => {
  await t.test('should build execution connection non execution audit evidence view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionNonExecutionAuditEvidenceView(null);

    assert.equal(view.taskName, 'Task 161 - Execution Connection Non-Execution Audit Evidence Screen Flow');
    assert.equal(view.panelTitle, 'Execution Connection Non-Execution Audit Evidence');
    assert.equal(view.auditStatus, 'AUDIT_VERIFIED_NO_EXECUTION_TRIGGERS');
    
    // Check constraints
    assert.equal(view.isReadOnly, true);
    assert.equal(view.isAuditEvidenceOnly, true);
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

    assert.equal(view.previousExecutionConnectionRiskContainmentCertificationCommit, 'e5b00ae');

    assert.equal(view.auditEvidenceItems.length, 1);
    assert.equal(view.blockedTriggerItems.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.handoffNoticeToBatchJobExecutionResult.includes('실행 허가 영역이 아닙니다'));
    assert.ok(view.finalNotice.includes('Read-only Audit Evidence Chain'));
  });
});
