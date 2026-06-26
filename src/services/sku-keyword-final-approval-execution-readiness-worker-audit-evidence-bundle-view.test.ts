import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditEvidenceBundleView } from './sku-keyword-final-approval-execution-readiness-worker-audit-evidence-bundle-view.service';

test('WorkerAuditEvidenceBundleView Service (Task 149)', async (t) => {
  await t.test('should build WorkerAuditEvidenceBundle view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditEvidenceBundleView();

    assert.ok(result.title.includes('Worker Audit Evidence Bundle'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('감사 증빙 묶음'));
    assert.ok(result.taskRangeLabel.includes('Task 41~148 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerAuditLogPreviewLabel.includes('Task 148'));
    assert.strictEqual(result.previousExecutionReadinessWorkerAuditLogPreviewCommit, '4af91df');

    assert.strictEqual(result.workerAuditEvidenceBundleItems.length, 4);
    assert.ok(result.workerAuditEvidenceBundleItems.some((item) => item.evidenceState === 'EVIDENCE_BUNDLE_AUDIT_LOG_PLAN_REQUIRED'));

    assert.strictEqual(result.referenceSourceItems.length, 8);
    assert.ok(result.referenceSourceItems.some((item) => item.evidenceState.startsWith('REFERENCE_DECISION_')));
    assert.ok(result.referenceSourceItems.some((item) => item.evidenceState.startsWith('REFERENCE_RECORDING_')));
    assert.ok(result.referenceSourceItems.some((item) => item.evidenceState.startsWith('REFERENCE_GUARD_')));
    assert.ok(result.referenceSourceItems.some((item) => item.evidenceState.startsWith('REFERENCE_AUDIT_')));

    assert.strictEqual(result.preExecutionDecisionEvidenceItems.length, 3);
    assert.ok(result.preExecutionDecisionEvidenceItems.some((item) => item.evidenceState.startsWith('DECISION_EVIDENCE_')));

    assert.strictEqual(result.resultRecordingEvidenceItems.length, 3);
    assert.ok(result.resultRecordingEvidenceItems.some((item) => item.evidenceState.startsWith('RECORDING_EVIDENCE_')));

    assert.strictEqual(result.dbWriteBlockEvidenceItems.length, 3);
    assert.ok(result.dbWriteBlockEvidenceItems.some((item) => item.evidenceState === 'DB_BLOCK_EVIDENCE_BOUNDARY_LOCK_REQUIRED'));

    assert.strictEqual(result.auditLogPlanEvidenceItems.length, 3);
    assert.ok(result.auditLogPlanEvidenceItems.some((item) => item.evidenceState.startsWith('AUDIT_PLAN_EVIDENCE_')));

    assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    assert.ok(result.misunderstandingPreventionItems.some((item) => item.evidenceState === 'NO_DB_WRITE_OR_EXTERNAL_EVIDENCE_SHIP'));

    assert.strictEqual(result.disconnectedSystemEvidenceItems.length, 6);
    assert.ok(result.disconnectedSystemEvidenceItems.some((item) => item.evidenceState === 'EVIDENCE_GUARD_RECORDING_PREVIEW_BLOCK_WORKER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemEvidenceItems.some((item) => item.evidenceState === 'EVIDENCE_GUARD_RECORDING_PREVIEW_BLOCK_DB_WRITE_NOT_CONNECTED'));

    assert.ok(result.finalNotice.includes('audit evidence bundle View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~149'));
  });
});
