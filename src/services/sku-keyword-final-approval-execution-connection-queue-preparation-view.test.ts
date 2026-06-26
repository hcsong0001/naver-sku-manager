import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionQueuePreparationView } from './sku-keyword-final-approval-execution-connection-queue-preparation-view.service';

test('ExecutionConnectionQueuePreparationView Service (Task 153)', async (t) => {
  await t.test('should build ExecutionConnectionQueuePreparation view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionQueuePreparationView();

    assert.ok(result.title.includes('Execution Connection Queue Preparation'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL CLOSURE FINAL STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('Queue 연결 준비'));
    assert.ok(result.taskRangeLabel.includes('Task 41~152 read-only 흐름'));
    assert.ok(result.previousExecutionConnectionWorkerPreparationLabel.includes('Task 152'));
    assert.strictEqual(result.previousExecutionConnectionWorkerPreparationCommit, '03abfd5');

    assert.strictEqual(result.queueConnectionPreparationItems.length, 3);
    assert.ok(result.queueConnectionPreparationItems.some((item) => item.queuePreparationState === 'QUEUE_CONNECTION_ENQUEUE_BLOCKED'));

    assert.strictEqual(result.queuePayloadPreviewReferenceItems.length, 3);
    assert.ok(result.queuePayloadPreviewReferenceItems.every((item) => item.queuePreparationState.startsWith('REFERENCE_QUEUE_PAYLOAD_')));

    assert.strictEqual(result.queueEnqueueEligibilityReferenceItems.length, 3);
    assert.ok(result.queueEnqueueEligibilityReferenceItems.every((item) => item.queuePreparationState.startsWith('REFERENCE_ENQUEUE_ELIGIBILITY_')));

    assert.strictEqual(result.queueContractOverviewReferenceItems.length, 3);
    assert.ok(result.queueContractOverviewReferenceItems.every((item) => item.queuePreparationState.startsWith('REFERENCE_QUEUE_CONTRACT_')));

    assert.strictEqual(result.preConnectionWorkerQueueRelationItems.length, 3);
    assert.ok(result.preConnectionWorkerQueueRelationItems.some((item) => item.queuePreparationState.startsWith('PRE_CONNECTION_WORKER_CONTRACT_')));
    assert.ok(result.preConnectionWorkerQueueRelationItems.some((item) => item.queuePreparationState.startsWith('PRE_CONNECTION_QUEUE_CONTRACT_')));

    assert.strictEqual(result.actualEnqueueBlockedReasonItems.length, 5);
    assert.ok(result.actualEnqueueBlockedReasonItems.some((item) => item.queuePreparationState === 'FORBIDDEN_ENQUEUE_APPROVAL_NOT_GRANTED'));
    assert.ok(result.actualEnqueueBlockedReasonItems.some((item) => item.queuePreparationState === 'FORBIDDEN_ENQUEUE_ENQUEUE_NOT_EXECUTED_IN_TASK_153'));

    assert.strictEqual(result.disconnectedSystemItems.length, 6);
    assert.ok(result.disconnectedSystemItems.every((item) => item.queuePreparationState.startsWith('DISCONNECTED_')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('Queue 연결 경로')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('운영 DB write 경로')));

    assert.ok(result.finalNotice.includes('queue connection preparation View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~153'));
  });
});
