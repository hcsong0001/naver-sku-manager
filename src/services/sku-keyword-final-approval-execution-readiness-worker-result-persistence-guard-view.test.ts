import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultPersistenceGuardView } from './sku-keyword-final-approval-execution-readiness-worker-result-persistence-guard-view.service';

test('WorkerResultPersistenceGuardView Service (Task 147)', async (t) => {
  await t.test('should build WorkerResultPersistenceGuard view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultPersistenceGuardView();

    assert.ok(result.title.includes('Worker Result Persistence Guard'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('영속화 보호선'));
    assert.ok(result.taskRangeLabel.includes('Task 41~146 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerResultRecordingPreviewLabel.includes('Task 146'));
    assert.strictEqual(result.previousExecutionReadinessWorkerResultRecordingPreviewCommit, '99689af');

    assert.strictEqual(result.recordingPlanSeparationItems.length, 3);
    assert.ok(result.recordingPlanSeparationItems.some((item) => item.guardState === 'GUARD_SEPARATE_RECORD_PLAN_FROM_DB_WRITE'));

    assert.strictEqual(result.operatingDbWriteGuardItems.length, 3);
    assert.ok(result.operatingDbWriteGuardItems.every((item) => item.tone === 'blocked'));
    assert.ok(result.operatingDbWriteGuardItems.some((item) => item.guardState === 'PERSISTENCE_OPERATING_DB_WRITE_STILL_FORBIDDEN'));

    assert.strictEqual(result.testOperatingDbBoundaryItems.length, 3);
    assert.ok(result.testOperatingDbBoundaryItems.some((item) => item.guardState === 'GUARD_KEEP_OPERATING_DB_BOUNDARY_LOCKED'));

    assert.strictEqual(result.requiredApprovalConditionItems.length, 3);
    assert.ok(result.requiredApprovalConditionItems.some((item) => item.guardState === 'GUARD_REQUIRE_PERSISTENCE_APPROVAL'));

    assert.strictEqual(result.referenceSourceItems.length, 6);
    assert.ok(result.referenceSourceItems.some((item) => item.guardState.startsWith('REFERENCE_DECISION_')));
    assert.ok(result.referenceSourceItems.some((item) => item.guardState.startsWith('REFERENCE_RECORDING_')));
    assert.ok(result.referenceSourceItems.some((item) => item.guardState.startsWith('REFERENCE_METADATA_')));

    assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    assert.ok(result.misunderstandingPreventionItems.some((item) => item.guardState === 'NO_OPERATING_DB_WRITE'));

    assert.strictEqual(result.disconnectedSystemGuardItems.length, 6);
    assert.ok(result.disconnectedSystemGuardItems.some((item) => item.guardState === 'GUARD_RECORDING_PREVIEW_BLOCK_WORKER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemGuardItems.some((item) => item.guardState === 'GUARD_RECORDING_PREVIEW_BLOCK_DB_WRITE_NOT_CONNECTED'));

    assert.ok(result.finalNotice.includes('persistence guard View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~147'));
  });
});
