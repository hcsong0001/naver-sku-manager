import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditClosureView } from './sku-keyword-final-approval-execution-readiness-worker-audit-closure-view.service';

test('WorkerAuditClosureView Service (Task 150)', async (t) => {
  await t.test('should build WorkerAuditClosure view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditClosureView();

    assert.ok(result.title.includes('Worker Audit Closure'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL REVIEW CLOSURE STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('감사 준비 흐름'));
    assert.ok(result.taskRangeLabel.includes('Task 41~149 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerAuditEvidenceBundleLabel.includes('Task 149'));
    assert.strictEqual(result.previousExecutionReadinessWorkerAuditEvidenceBundleCommit, '579293f');

    assert.strictEqual(result.workerAuditClosureItems.length, 3);
    assert.ok(result.workerAuditClosureItems.some((item) => item.closureState === 'AUDIT_CLOSURE_READ_ONLY_FLOW_SEALED'));

    assert.strictEqual(result.referenceSourceItems.length, 5);
    assert.ok(result.referenceSourceItems.some((item) => item.closureState.startsWith('REFERENCE_DECISION_')));
    assert.ok(result.referenceSourceItems.some((item) => item.closureState.startsWith('REFERENCE_RECORDING_')));
    assert.ok(result.referenceSourceItems.some((item) => item.closureState.startsWith('REFERENCE_GUARD_')));
    assert.ok(result.referenceSourceItems.some((item) => item.closureState.startsWith('REFERENCE_AUDIT_')));
    assert.ok(result.referenceSourceItems.some((item) => item.closureState.startsWith('REFERENCE_EVIDENCE_')));

    assert.strictEqual(result.finalAuditSummaryItems.length, 5);
    assert.ok(result.finalAuditSummaryItems.some((item) => item.closureState.startsWith('FINAL_SUMMARY_DECISION_')));
    assert.ok(result.finalAuditSummaryItems.some((item) => item.closureState.startsWith('FINAL_SUMMARY_RECORDING_')));
    assert.ok(result.finalAuditSummaryItems.some((item) => item.closureState.startsWith('FINAL_SUMMARY_DB_BLOCK_')));
    assert.ok(result.finalAuditSummaryItems.some((item) => item.closureState.startsWith('FINAL_SUMMARY_AUDIT_')));
    assert.ok(result.finalAuditSummaryItems.some((item) => item.closureState.startsWith('FINAL_SUMMARY_EVIDENCE_')));

    assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    assert.ok(result.misunderstandingPreventionItems.some((item) => item.closureState === 'NO_DB_WRITE_OR_EXTERNAL_CLOSURE_SHIP'));

    assert.strictEqual(result.disconnectedSystemClosureItems.length, 6);
    assert.ok(result.disconnectedSystemClosureItems.some((item) => item.closureState === 'CLOSURE_GUARD_RECORDING_PREVIEW_BLOCK_WORKER_NOT_CONNECTED'));
    assert.ok(result.disconnectedSystemClosureItems.some((item) => item.closureState === 'CLOSURE_GUARD_RECORDING_PREVIEW_BLOCK_DB_WRITE_NOT_CONNECTED'));

    assert.ok(result.finalNotice.includes('audit closure View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~150'));
  });
});
