import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultRecordingPreviewView } from './sku-keyword-final-approval-execution-readiness-worker-result-recording-preview-view.service';

test('WorkerResultRecordingPreviewView Service (Task 146)', async (t) => {
  await t.test('should build WorkerResultRecordingPreview view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultRecordingPreviewView();

    assert.ok(result.title.includes('Worker Result Recording Preview'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('어떤 결과 항목이 기록되어야 하는지'));
    assert.ok(result.taskRangeLabel.includes('Task 41~145 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerDecisionPreviewLabel.includes('Task 145'));
    assert.strictEqual(result.previousExecutionReadinessWorkerDecisionPreviewCommit, 'b9ad64a');

    assert.strictEqual(result.expectedRecordedResultItems.length, 4);
    assert.ok(result.expectedRecordedResultItems.some((item) => item.recordState === 'RESULT_CODE_PREVIEW_REQUIRED'));

    assert.strictEqual(result.statusSpecificRecordingPlanItems.length, 4);
    assert.ok(result.statusSpecificRecordingPlanItems.some((item) => item.recordState === 'PLAN_RECORD_BLOCKED_RESULT'));

    assert.strictEqual(result.referenceSourceItems.length, 6);
    assert.ok(result.referenceSourceItems.some((item) => item.recordState.startsWith('REFERENCE_QUEUE_PAYLOAD_')));
    assert.ok(result.referenceSourceItems.some((item) => item.recordState.startsWith('REFERENCE_WORKER_CONTRACT_')));
    assert.ok(result.referenceSourceItems.some((item) => item.recordState.startsWith('REFERENCE_DECISION_PREVIEW_')));

    assert.strictEqual(result.readOnlyRecordingPreviewItems.length, 3);
    assert.ok(result.readOnlyRecordingPreviewItems.some((item) => item.recordState === 'READ_ONLY_RESULT_RECORDING_PREVIEW_ONLY'));

    assert.strictEqual(result.operatingDbWriteForbiddenItems.length, 3);
    assert.ok(result.operatingDbWriteForbiddenItems.some((item) => item.recordState === 'OPERATING_DB_WRITE_STILL_FORBIDDEN'));
    assert.ok(result.operatingDbWriteForbiddenItems.every((item) => item.tone === 'blocked'));

    assert.strictEqual(result.disconnectedSystemRecordingItems.length, 6);
    assert.ok(result.disconnectedSystemRecordingItems.some((item) => item.recordState === 'RECORDING_PREVIEW_BLOCK_WORKER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemRecordingItems.some((item) => item.recordState === 'RECORDING_PREVIEW_BLOCK_DB_WRITE_NOT_CONNECTED'));

    assert.ok(result.finalNotice.includes('결과 기록 계획 View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~146'));
  });
});
