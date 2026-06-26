import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionSafetyGatePreparationView } from './sku-keyword-final-approval-execution-connection-safety-gate-preparation-view.service';

describe('sku-keyword-final-approval-execution-connection-safety-gate-preparation-view.service', () => {
  it('should build execution connection safety gate preparation view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionSafetyGatePreparationView();

    assert.ok(view.title.includes('Execution Connection Safety Gate Preparation'));
    assert.equal(view.statusLabel, 'READ-ONLY FINAL CLOSURE FINAL STATUS EXECUTION CONNECTION SAFETY GATE PREPARATION');
    assert.equal(view.statusTone, 'blocked');

    // safety gate preparation items
    assert.ok(view.executionSafetyGatePreparationItems);
    assert.ok(view.executionSafetyGatePreparationItems.length > 0);
    assert.equal(view.executionSafetyGatePreparationItems[0].safetyGatePreparationState, 'EXECUTION_SAFETY_GATE_REVIEW_ONLY');

    // feature flag and safety gate relation
    assert.ok(view.preConnectionFeatureFlagAndSafetyGateRelationItems);
    assert.ok(view.preConnectionFeatureFlagAndSafetyGateRelationItems.length > 0);
    assert.equal(view.preConnectionFeatureFlagAndSafetyGateRelationItems[1].safetyGatePreparationState, 'PRE_CONNECTION_FLAG_RELEASE_AND_GATE_PASS_SEPARATED');

    // worker/queue/adapter
    assert.ok(view.workerQueueAdapterSafetyGateReviewItems);
    assert.equal(view.workerQueueAdapterSafetyGateReviewItems.length, 3);

    // blocked condition
    assert.ok(view.safetyGateBlockedConditionItems);
    assert.ok(view.safetyGateBlockedConditionItems.length > 0);
    assert.equal(view.safetyGateBlockedConditionItems[0].safetyGatePreparationState, 'SAFETY_GATE_BLOCKED_UNTIL_APPROVAL');

    // closed permissions
    assert.ok(view.executionPermissionStillClosedItems);
    assert.equal(view.executionPermissionStillClosedItems.length, 5);

    // disconnected system items
    assert.ok(view.disconnectedSystemItems);
    assert.ok(view.disconnectedSystemItems.length > 0);

    assert.ok(view.finalNotice.includes('Task 157 Execution Connection Safety Gate Preparation 패널'));
    assert.ok(view.finalNotice.includes('Task 41~157 흐름 전체에서도 실행 권한과 운영 변경 권한은 계속 닫혀 있습니다'));
  });
});
