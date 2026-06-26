import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView } from './sku-keyword-final-approval-execution-readiness-worker-input-validation-view.service';

test('WorkerInputValidationView Service (Task 143)', async (t) => {
  await t.test('should build WorkerInputValidation view successfully', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView();

    assert.ok(result.title.includes('Worker Input Validation'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('향후 Worker가 실행 전 입력값을 어떻게 검증해야 하는지 정리'));
    assert.ok(result.taskRangeLabel.includes('Task 41~142 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerPayloadInterpretationLabel.includes('Task 142'));

    assert.ok(result.workerInputValidationCriteriaItems.length > 0);
    assert.ok(result.workerInputValidationCriteriaItems[0].label !== undefined);
    assert.ok(result.workerInputValidationCriteriaItems[0].validationTarget !== undefined);

    assert.strictEqual(result.queuePayloadMandatoryCheckCriteriaItems.length, 3);
    assert.ok(result.executionReadinessPrerequisiteItems.length > 0);
    assert.ok(result.approvalPendingBlockedValidationCriteriaItems.length > 0);
    assert.ok(result.executionImpossibleReasonValidationCriteriaItems.length > 0);
    assert.ok(result.stopConditionBeforeExecutionItems.length > 0);
    assert.ok(result.disconnectedStatusItems.length > 0);

    assert.ok(result.finalNotice.includes('Worker 검증 실행, Queue enqueue'));
  });
});
