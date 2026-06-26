import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionReadinessAssessmentView } from './sku-keyword-final-approval-execution-connection-readiness-assessment-view.service';

describe('sku-keyword-final-approval-execution-connection-readiness-assessment-view.service', () => {
  it('should build execution connection readiness assessment view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionReadinessAssessmentView();

    assert.ok(view.title.includes('Execution Connection Readiness Assessment'));
    assert.equal(view.statusLabel, 'READ-ONLY FINAL CLOSURE FINAL STATUS EXECUTION CONNECTION READINESS ASSESSMENT');
    assert.equal(view.statusTone, 'blocked');

    // overall readiness
    assert.ok(view.overallReadinessAssessmentItems);
    assert.ok(view.overallReadinessAssessmentItems.length > 0);
    assert.equal(view.overallReadinessAssessmentItems[0].assessmentState, 'OVERALL_EXECUTION_CONNECTION_NOT_READY');

    // summary items
    assert.ok(view.workerReadinessSummaryItems);
    assert.equal(view.workerReadinessSummaryItems[0].assessmentState, 'WORKER_PREPARATION_EVALUATED_AS_BLOCKED');
    
    assert.ok(view.queueReadinessSummaryItems);
    assert.equal(view.queueReadinessSummaryItems[0].assessmentState, 'QUEUE_PREPARATION_EVALUATED_AS_BLOCKED');
    
    assert.ok(view.adapterReadinessSummaryItems);
    assert.equal(view.adapterReadinessSummaryItems[0].assessmentState, 'ADAPTER_PREPARATION_EVALUATED_AS_BLOCKED');

    assert.ok(view.runtimeEnvironmentReadinessSummaryItems);
    assert.equal(view.runtimeEnvironmentReadinessSummaryItems[0].assessmentState, 'RUNTIME_ENVIRONMENT_PREPARATION_EVALUATED_AS_BLOCKED');

    assert.ok(view.featureFlagReadinessSummaryItems);
    assert.equal(view.featureFlagReadinessSummaryItems[0].assessmentState, 'FEATURE_FLAG_PREPARATION_EVALUATED_AS_BLOCKED');

    assert.ok(view.safetyGateReadinessSummaryItems);
    assert.equal(view.safetyGateReadinessSummaryItems[0].assessmentState, 'SAFETY_GATE_PREPARATION_EVALUATED_AS_BLOCKED');

    // core blocking
    assert.ok(view.coreBlockingConditionItems);
    assert.ok(view.coreBlockingConditionItems.length > 0);
    assert.equal(view.coreBlockingConditionItems[0].assessmentState, 'CORE_BLOCKING_NO_SEPARATE_APPROVAL');

    // execution not allowed reason
    assert.ok(view.executionNotAllowedReasonItems);
    assert.equal(view.executionNotAllowedReasonItems.length, 2);

    // disconnected system items
    assert.ok(view.disconnectedSystemItems);
    assert.ok(view.disconnectedSystemItems.length > 0);

    assert.ok(view.finalNotice.includes('Task 158 Execution Connection Readiness Assessment 패널'));
    assert.ok(view.finalNotice.includes('Task 41~158 흐름 전체에서도 실행 권한과 운영 변경 권한은 계속 닫혀 있습니다'));
  });
});
