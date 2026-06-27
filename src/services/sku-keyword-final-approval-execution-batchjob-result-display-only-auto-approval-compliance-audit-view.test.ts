import test from 'node:test';
import assert from 'node:assert';
import {
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAutoApprovalComplianceAuditView
} from './sku-keyword-final-approval-execution-batchjob-result-display-only-auto-approval-compliance-audit-view.service';

test('Task 203: BatchJob Display-Only Auto-Approval Compliance Audit Screen Flow View', async (t) => {
  await t.test('read-only 속성이 true여야 하며, 실행 관련 필드는 모두 false여야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAutoApprovalComplianceAuditView({});

    assert.strictEqual(view.isReadOnly, true);
    assert.strictEqual(view.isDisplayOnlyAutoApprovalComplianceAudit, true);
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);

    assert.strictEqual(view.isExecutionApproved, false);
    assert.strictEqual(view.isReExecutionApproved, false);
    assert.strictEqual(view.isConnectionApproved, false);
    assert.strictEqual(view.isTokenTestApproved, false);
    assert.strictEqual(view.isLiveReady, false);

    assert.strictEqual(view.hasExecutionButton, false);
    assert.strictEqual(view.hasSubmitAction, false);
    assert.strictEqual(view.hasWorkerTrigger, false);
    assert.strictEqual(view.hasQueueTrigger, false);
    assert.strictEqual(view.hasAdapterTrigger, false);
    assert.strictEqual(view.hasTokenRequestPath, false);
    assert.strictEqual(view.hasNaverApiCallPath, false);
    assert.strictEqual(view.hasOperatingDbWritePath, false);
    assert.strictEqual(view.hasPriceChangePath, false);
    assert.strictEqual(view.hasStockChangePath, false);
  });

  await t.test('자동승인 체크리스트 항목이 정확히 5개 포함되어 있어야 함', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAutoApprovalComplianceAuditView({});
    
    assert.strictEqual(view.complianceItems.length, 5);
    
    const keys = view.complianceItems.map(item => item.key);
    assert.ok(keys.includes('VERIFICATION_PASSED'));
    assert.ok(keys.includes('NO_FORBIDDEN_VIOLATION'));
    assert.ok(keys.includes('SCOPE_MAINTAINED'));
    assert.ok(keys.includes('PUSH_COMPLETED'));
    assert.ok(keys.includes('TREE_CLEAN'));
    
    view.complianceItems.forEach(item => {
      assert.strictEqual(item.isCompliant, true);
      assert.strictEqual(item.statusText, 'PASS');
    });
  });
});
