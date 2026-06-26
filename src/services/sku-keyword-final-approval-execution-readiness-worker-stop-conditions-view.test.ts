import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView } from './sku-keyword-final-approval-execution-readiness-worker-stop-conditions-view.service';

test('WorkerStopConditionsView Service (Task 144)', async (t) => {
  await t.test('should build WorkerStopConditions view successfully', () => {
    const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView();

    assert.ok(result.title.includes('Worker Stop Conditions'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('향후 Worker가 실제 실행 전에 반드시 중단해야 하는 조건'));
    assert.ok(result.taskRangeLabel.includes('Task 41~143 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerInputValidationLabel.includes('Task 143'));

    assert.ok(result.queuePayloadValidationFailureStopItems.length > 0);
    assert.ok(result.queuePayloadValidationFailureStopItems.every((item) => item.tone === 'blocked'));

    assert.strictEqual(result.approvalPendingStopItems.length, 3);
    assert.ok(result.approvalPendingStopItems[0].stopTrigger.includes('STOP_ON_APPROVAL_PENDING'));

    assert.ok(result.blockedStateStopItems.length > 0);
    assert.ok(result.blockedStateStopItems.every((item) => item.tone === 'blocked'));

    assert.strictEqual(result.disconnectedSystemStopItems.length, 5);
    assert.ok(result.disconnectedSystemStopItems.some((item) => item.stopTrigger === 'STOP_ON_TOKEN_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemStopItems.some((item) => item.stopTrigger === 'STOP_ON_NAVER_API_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemStopItems.some((item) => item.stopTrigger === 'STOP_ON_ADAPTER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemStopItems.some((item) => item.stopTrigger === 'STOP_ON_DB_WRITE_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemStopItems.some((item) => item.stopTrigger === 'STOP_ON_QUEUE_NOT_CONNECTED'));

    assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    assert.ok(result.misunderstandingPreventionItems.some((item) => item.stopTrigger === 'VIEW_CONTRACT_ONLY_NO_EXECUTION'));

    assert.ok(result.finalNotice.includes('Worker 실행, Queue enqueue'));
    assert.ok(result.finalNotice.includes('Task 41~144'));
  });
});
