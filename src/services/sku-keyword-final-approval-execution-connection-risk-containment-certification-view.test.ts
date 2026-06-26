import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionRiskContainmentCertificationView } from './sku-keyword-final-approval-execution-connection-risk-containment-certification-view.service';

test('sku-keyword-final-approval-execution-connection-risk-containment-certification-view.service', async (t) => {
  await t.test('should build execution connection risk containment certification view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionRiskContainmentCertificationView(null);

    assert.equal(view.taskName, 'Task 160 - Execution Connection Risk Containment Certification Screen Flow');
    assert.equal(view.panelTitle, 'Execution Connection Risk Containment Certification');
    assert.equal(view.certificationStatus, 'CONTAINMENT_CERTIFIED_ALL_CONNECTIONS_BLOCKED');
    
    // Check constraints
    assert.equal(view.isReadOnly, true);
    assert.equal(view.isContainmentOnly, true);
    assert.equal(view.isExecutionConnectionApproved, false);
    assert.equal(view.isWorkerConnectionEnabled, false);
    assert.equal(view.isQueueEnqueueEnabled, false);
    assert.equal(view.isAdapterConnectionEnabled, false);
    assert.equal(view.isTokenRequestEnabled, false);
    assert.equal(view.isNaverApiCallEnabled, false);
    assert.equal(view.isOperatingDbWriteEnabled, false);
    assert.equal(view.isPriceChangeEnabled, false);
    assert.equal(view.isStockChangeEnabled, false);

    assert.equal(view.previousExecutionConnectionRiskAssessmentCommit, '56c1661');

    assert.equal(view.containmentItems.length, 1);
    assert.equal(view.blockedConnectionItems.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.handoffNoticeToBatchJobExecutionResult.includes('모의 환경(Dry Run/Mock) 또는 차단된 상태에서의 로깅 결과'));
    assert.ok(view.finalNotice.includes('(Read-only Containment Certification)'));
  });
});
