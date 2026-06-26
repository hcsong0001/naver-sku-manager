import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditLogPreviewView } from './sku-keyword-final-approval-execution-readiness-worker-audit-log-preview-view.service';

test('WorkerAuditLogPreviewView Service (Task 148)', async (t) => {
  await t.test('should build WorkerAuditLogPreview view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditLogPreviewView();

    assert.ok(result.title.includes('Worker Audit Log Preview'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('감사 로그 계획'));
    assert.ok(result.taskRangeLabel.includes('Task 41~147 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerResultPersistenceGuardLabel.includes('Task 147'));
    assert.strictEqual(result.previousExecutionReadinessWorkerResultPersistenceGuardCommit, '4fa6c1b');

    assert.strictEqual(result.workerAuditLogPlanItems.length, 4);
    assert.ok(result.workerAuditLogPlanItems.some((item) => item.auditState === 'AUDIT_PLAN_PERSISTENCE_GUARD_REQUIRED'));

    assert.strictEqual(result.resultRecordingSeparationItems.length, 3);
    assert.ok(result.resultRecordingSeparationItems.some((item) => item.auditState === 'AUDIT_SEPARATE_FROM_DB_PERSISTENCE'));

    assert.strictEqual(result.readOnlyAuditPreviewItems.length, 3);
    assert.ok(result.readOnlyAuditPreviewItems.some((item) => item.auditState === 'READ_ONLY_AUDIT_LOG_PREVIEW_ONLY'));

    assert.strictEqual(result.referenceSourceItems.length, 6);
    assert.ok(result.referenceSourceItems.some((item) => item.auditState.startsWith('REFERENCE_DECISION_')));
    assert.ok(result.referenceSourceItems.some((item) => item.auditState.startsWith('REFERENCE_RECORDING_')));
    assert.ok(result.referenceSourceItems.some((item) => item.auditState.startsWith('REFERENCE_GUARD_')));

    assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    assert.ok(result.misunderstandingPreventionItems.some((item) => item.auditState === 'NO_DB_WRITE_OR_EXTERNAL_AUDIT_SHIP'));

    assert.strictEqual(result.disconnectedSystemAuditItems.length, 6);
    assert.ok(result.disconnectedSystemAuditItems.some((item) => item.auditState === 'AUDIT_GUARD_RECORDING_PREVIEW_BLOCK_WORKER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemAuditItems.some((item) => item.auditState === 'AUDIT_GUARD_RECORDING_PREVIEW_BLOCK_DB_WRITE_NOT_CONNECTED'));

    assert.ok(result.finalNotice.includes('audit log preview View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~148'));
  });
});
