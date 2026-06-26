import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionWorkerPreparationView } from './sku-keyword-final-approval-execution-connection-worker-preparation-view.service';

test('ExecutionConnectionWorkerPreparationView Service (Task 152)', async (t) => {
  await t.test('should build ExecutionConnectionWorkerPreparation view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionWorkerPreparationView();

    assert.ok(result.title.includes('Execution Connection Worker Preparation'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL CLOSURE FINAL STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('Worker 연결 준비'));
    assert.ok(result.taskRangeLabel.includes('Task 41~151 read-only 흐름'));
    assert.ok(result.previousExecutionConnectionPreparationOverviewLabel.includes('Task 151'));
    assert.strictEqual(result.previousExecutionConnectionPreparationOverviewCommit, '5a67f4b');

    assert.strictEqual(result.workerConnectionPreparationItems.length, 3);
    assert.ok(result.workerConnectionPreparationItems.some((item) => item.workerPreparationState === 'WORKER_CONNECTION_EXECUTION_BLOCKED'));

    assert.strictEqual(result.workerContractReferenceItems.length, 3);
    assert.ok(result.workerContractReferenceItems.some((item) => item.workerPreparationState.startsWith('REFERENCE_CONTRACT_')));

    assert.strictEqual(result.workerInputValidationReferenceItems.length, 3);
    assert.ok(result.workerInputValidationReferenceItems.some((item) => item.workerPreparationState.startsWith('REFERENCE_INPUT_VALIDATION_')));
    assert.ok(result.workerInputValidationReferenceItems.some((item) => item.workerPreparationState.startsWith('REFERENCE_INPUT_PREREQUISITE_')));

    assert.strictEqual(result.workerStopConditionReferenceItems.length, 3);
    assert.ok(result.workerStopConditionReferenceItems.every((item) => item.workerPreparationState.startsWith('REFERENCE_STOP_')));

    assert.strictEqual(result.workerDecisionPreviewReferenceItems.length, 3);
    assert.ok(result.workerDecisionPreviewReferenceItems.some((item) => item.workerPreparationState.startsWith('REFERENCE_DECISION_')));

    assert.strictEqual(result.actualExecutionBlockedReasonItems.length, 5);
    assert.ok(result.actualExecutionBlockedReasonItems.some((item) => item.workerPreparationState === 'BLOCKED_UNTIL_APPROVAL_WORKER_EXECUTION'));

    assert.strictEqual(result.disconnectedSystemItems.length, 6);
    assert.ok(result.disconnectedSystemItems.every((item) => item.workerPreparationState.startsWith('DISCONNECTED_')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('Worker 실행 경로')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('운영 DB write 경로')));

    assert.ok(result.finalNotice.includes('worker connection preparation View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~152'));
  });
});
