import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionFeatureFlagPreparationView } from './sku-keyword-final-approval-execution-connection-feature-flag-preparation-view.service';

test('ExecutionConnectionFeatureFlagPreparationView Service (Task 156)', async (t) => {
  await t.test('should build ExecutionConnectionFeatureFlagPreparation view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionFeatureFlagPreparationView();

    assert.ok(result.title.includes('Execution Connection Feature Flag Preparation'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL CLOSURE FINAL STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('Feature Flag 준비'));
    assert.ok(result.taskRangeLabel.includes('Task 41~155 read-only 흐름'));
    assert.ok(result.previousExecutionConnectionRuntimeEnvironmentPreparationLabel.includes('Task 155'));
    assert.strictEqual(result.previousExecutionConnectionRuntimeEnvironmentPreparationCommit, '2c68c33');

    assert.strictEqual(result.executionFeatureFlagPreparationItems.length, 3);
    assert.ok(result.executionFeatureFlagPreparationItems.some((item) => item.featureFlagPreparationState === 'EXECUTION_FEATURE_FLAG_REVIEW_ONLY'));
    assert.ok(result.executionFeatureFlagPreparationItems.some((item) => item.featureFlagPreparationState === 'EXECUTION_FEATURE_FLAG_DEFAULT_BLOCKED'));

    assert.strictEqual(result.preConnectionRuntimeAndFeatureFlagRelationItems.length, 3);
    assert.ok(result.preConnectionRuntimeAndFeatureFlagRelationItems.some((item) => item.featureFlagPreparationState.startsWith('PRE_CONNECTION_RUNTIME_FEATURE_FLAG_')));
    assert.ok(result.preConnectionRuntimeAndFeatureFlagRelationItems.some((item) => item.featureFlagPreparationState === 'PRE_CONNECTION_RUNTIME_SHELL_AND_FLAG_RELEASE_SEPARATED'));

    assert.strictEqual(result.workerQueueAdapterFeatureFlagReviewItems.length, 3);
    assert.ok(result.workerQueueAdapterFeatureFlagReviewItems.some((item) => item.featureFlagPreparationState === 'WORKER_EXECUTION_FEATURE_FLAG_REVIEW_REQUIRED'));
    assert.ok(result.workerQueueAdapterFeatureFlagReviewItems.some((item) => item.featureFlagPreparationState === 'QUEUE_EXECUTION_FEATURE_FLAG_REVIEW_REQUIRED'));
    assert.ok(result.workerQueueAdapterFeatureFlagReviewItems.some((item) => item.featureFlagPreparationState === 'ADAPTER_EXECUTION_FEATURE_FLAG_REVIEW_REQUIRED'));

    assert.strictEqual(result.featureFlagBlockedConditionItems.length, 4);
    assert.ok(result.featureFlagBlockedConditionItems.every((item) => item.featureFlagPreparationState.startsWith('FEATURE_FLAG_BLOCKED_')));

    assert.strictEqual(result.executionPermissionStillClosedItems.length, 5);
    assert.ok(result.executionPermissionStillClosedItems.some((item) => item.featureFlagPreparationState === 'EXECUTION_PERMISSION_STILL_CLOSED_FOR_WORKER'));
    assert.ok(result.executionPermissionStillClosedItems.some((item) => item.featureFlagPreparationState === 'EXECUTION_PERMISSION_STILL_CLOSED_FOR_OPERATING_CHANGE'));

    assert.strictEqual(result.disconnectedSystemItems.length, 6);
    assert.ok(result.disconnectedSystemItems.every((item) => item.featureFlagPreparationState.startsWith('DISCONNECTED_')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('Live Adapter 경로')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('운영 DB write 경로')));

    assert.ok(result.finalNotice.includes('feature flag preparation View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~156'));
  });
});
