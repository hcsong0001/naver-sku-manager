import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionRiskAssessmentView } from './sku-keyword-final-approval-execution-connection-risk-assessment-view.service';

test('sku-keyword-final-approval-execution-connection-risk-assessment-view.service', async (t) => {
  await t.test('should build execution connection risk assessment view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionRiskAssessmentView(null);

    assert.equal(view.title, 'Execution Connection Risk Assessment');
    assert.equal(view.statusLabel, 'RISK_ASSESSED_AS_BLOCKED');
    assert.equal(view.statusTone, 'blocked');
    assert.equal(view.taskRangeLabel, 'Task 159 - Execution Connection Risk Assessment Screen Flow');
    
    assert.ok(view.summary.includes('차단 수준의 위험을 읽기 전용으로 평가'));
    assert.equal(view.previousExecutionConnectionReadinessAssessmentCommit, '87818f3');

    assert.equal(view.overallRiskAssessmentItems.length, 1);
    assert.equal(view.workerConnectionRiskItems.length, 1);
    assert.equal(view.queueConnectionRiskItems.length, 1);
    assert.equal(view.adapterConnectionRiskItems.length, 1);
    assert.equal(view.runtimeEnvironmentRiskItems.length, 1);
    assert.equal(view.featureFlagSafetyGateRiskItems.length, 1);
    assert.equal(view.highRiskItems.length, 1);
    assert.equal(view.executionNotAllowedReasonItems.length, 1);
    assert.equal(view.disconnectedSystemItems.length, 2);

    assert.ok(view.finalNotice.includes('완전히 차단된 상태입니다. (Read-only Assessment)'));
  });
});
