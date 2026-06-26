import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView } from './sku-keyword-final-approval-execution-readiness-worker-decision-preview-view.service';

test('WorkerDecisionPreviewView Service (Task 145)', async (t) => {
  await t.test('should build WorkerDecisionPreview view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView();

    assert.ok(result.title.includes('Worker Decision Preview'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('어떤 판정을 내려야 하는지'));
    assert.ok(result.taskRangeLabel.includes('Task 41~144 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerStopConditionsLabel.includes('Task 144'));
    assert.strictEqual(result.previousExecutionReadinessWorkerStopConditionsCommit, 'fa59052');

    assert.strictEqual(result.expectedWorkerDecisionItems.length, 3);
    assert.ok(result.expectedWorkerDecisionItems.some((item) => item.previewDecision === 'PREVIEW_DECISION_BLOCK_EXECUTION'));

    assert.strictEqual(result.stopConditionSatisfactionItems.length, 3);
    assert.ok(result.stopConditionSatisfactionItems.every((item) => item.tone === 'blocked'));

    assert.ok(result.queuePayloadValidationStatusItems.length > 0);
    assert.ok(result.queuePayloadValidationStatusItems.every((item) => item.previewDecision.startsWith('PREVIEW_REJECT_STOP_ON_')));

    assert.ok(result.approvalPendingBlockedDecisionItems.length > 0);
    assert.ok(result.approvalPendingBlockedDecisionItems.some((item) => item.previewDecision.includes('STOP_ON_APPROVAL_PENDING')));

    assert.ok(result.executionImpossibleReasonSummaryItems.length > 0);
    assert.ok(result.executionImpossibleReasonSummaryItems.every((item) => item.previewDecision.startsWith('PREVIEW_BLOCK_REASON_')));

    assert.strictEqual(result.nonExecutionReasonItems.length, 4);
    assert.ok(result.nonExecutionReasonItems.some((item) => item.previewDecision === 'PREVIEW_NON_EXECUTION_VIEW_CONTRACT_ONLY_NO_EXECUTION'));

    assert.strictEqual(result.disconnectedSystemDecisionItems.length, 6);
    assert.ok(result.disconnectedSystemDecisionItems.some((item) => item.previewDecision === 'PREVIEW_BLOCK_WORKER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemDecisionItems.some((item) => item.previewDecision === 'PREVIEW_BLOCK_QUEUE_NOT_ENQUEUED'));
    assert.ok(result.disconnectedSystemDecisionItems.some((item) => item.previewDecision === 'PREVIEW_BLOCK_ADAPTER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemDecisionItems.some((item) => item.previewDecision === 'PREVIEW_BLOCK_TOKEN_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemDecisionItems.some((item) => item.previewDecision === 'PREVIEW_BLOCK_NAVER_API_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemDecisionItems.some((item) => item.previewDecision === 'PREVIEW_BLOCK_DB_WRITE_NOT_CONNECTED'));

    assert.ok(result.finalNotice.includes('판정 미리보기 View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~145'));
  });
});
