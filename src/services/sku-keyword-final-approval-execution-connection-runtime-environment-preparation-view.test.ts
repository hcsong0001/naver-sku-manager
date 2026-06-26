import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionRuntimeEnvironmentPreparationView } from './sku-keyword-final-approval-execution-connection-runtime-environment-preparation-view.service';

test('ExecutionConnectionRuntimeEnvironmentPreparationView Service (Task 155)', async (t) => {
  await t.test('should build ExecutionConnectionRuntimeEnvironmentPreparation view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionRuntimeEnvironmentPreparationView();

    assert.ok(result.title.includes('Execution Connection Runtime Environment Preparation'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL CLOSURE FINAL STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('Runtime Environment 준비'));
    assert.ok(result.taskRangeLabel.includes('Task 41~154 read-only 흐름'));
    assert.ok(result.previousExecutionConnectionAdapterPreparationLabel.includes('Task 154'));
    assert.strictEqual(result.previousExecutionConnectionAdapterPreparationCommit, '5f390ed');

    assert.strictEqual(result.runtimeEnvironmentPreparationItems.length, 3);
    assert.ok(result.runtimeEnvironmentPreparationItems.some((item) => item.runtimePreparationState === 'RUNTIME_ENVIRONMENT_DB_CHANGE_BLOCKED'));

    assert.strictEqual(result.dockerRedisWorkerQueueRuntimeItems.length, 4);
    assert.ok(result.dockerRedisWorkerQueueRuntimeItems.some((item) => item.runtimePreparationState === 'DOCKER_RUNTIME_READINESS_REVIEW_ONLY'));
    assert.ok(result.dockerRedisWorkerQueueRuntimeItems.some((item) => item.runtimePreparationState === 'REDIS_QUEUE_RUNTIME_BLOCKED_BEFORE_ACTIVATION'));
    assert.ok(result.dockerRedisWorkerQueueRuntimeItems.some((item) => item.runtimePreparationState === 'WORKER_RUNTIME_START_BLOCKED'));

    assert.strictEqual(result.testAndOperatingEnvironmentSeparationItems.length, 3);
    assert.ok(result.testAndOperatingEnvironmentSeparationItems.some((item) => item.runtimePreparationState === 'TEST_AND_OPERATING_ENVIRONMENTS_SEPARATED'));
    assert.ok(result.testAndOperatingEnvironmentSeparationItems.some((item) => item.runtimePreparationState === 'OPERATING_DB_AND_REDIS_NOT_RELEASED'));

    assert.strictEqual(result.environmentVariableAndFeatureFlagItems.length, 3);
    assert.ok(result.environmentVariableAndFeatureFlagItems.some((item) => item.runtimePreparationState === 'ENVIRONMENT_VARIABLE_REVIEW_REQUIRED'));
    assert.ok(result.environmentVariableAndFeatureFlagItems.some((item) => item.runtimePreparationState === 'FEATURE_FLAG_REVIEW_REQUIRED_AND_BLOCKED'));
    assert.ok(result.environmentVariableAndFeatureFlagItems.some((item) => item.runtimePreparationState === 'ENVIRONMENT_MUTATION_FORBIDDEN_IN_TASK_155'));

    assert.strictEqual(result.runtimeExecutionBlockedItems.length, 4);
    assert.ok(result.runtimeExecutionBlockedItems.every((item) => item.runtimePreparationState.startsWith('RUNTIME_BLOCKED_')));

    assert.strictEqual(result.actualRuntimeNotRunningReasonItems.length, 5);
    assert.ok(result.actualRuntimeNotRunningReasonItems.some((item) => item.runtimePreparationState === 'RUNTIME_NOT_RUNNING_WORKER_START_BLOCKED'));
    assert.ok(result.actualRuntimeNotRunningReasonItems.some((item) => item.runtimePreparationState === 'RUNTIME_NOT_RUNNING_ENV_AND_FLAG_NOT_CONFIRMED'));

    assert.strictEqual(result.disconnectedSystemItems.length, 6);
    assert.ok(result.disconnectedSystemItems.every((item) => item.runtimePreparationState.startsWith('DISCONNECTED_')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('Token 발급 경로')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('운영 DB write 경로')));

    assert.ok(result.finalNotice.includes('runtime environment preparation View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~155'));
  });
});
