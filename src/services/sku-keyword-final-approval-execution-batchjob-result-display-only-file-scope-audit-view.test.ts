import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyFileScopeAuditView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-file-scope-audit-view.service';

const mockJob = { id: 'test-job-205', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyFileScopeAuditView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyFileScopeAudit, true, 'isDisplayOnlyFileScopeAudit must be true');
assert.strictEqual(result.hasExecutionButton, false, 'hasExecutionButton must be false');
assert.strictEqual(result.hasSubmitAction, false, 'hasSubmitAction must be false');
assert.strictEqual(result.hasWorkerTrigger, false, 'hasWorkerTrigger must be false');
assert.strictEqual(result.hasQueueTrigger, false, 'hasQueueTrigger must be false');
assert.strictEqual(result.hasAdapterTrigger, false, 'hasAdapterTrigger must be false');
assert.strictEqual(result.hasTokenRequestPath, false, 'hasTokenRequestPath must be false');
assert.strictEqual(result.hasNaverApiCallPath, false, 'hasNaverApiCallPath must be false');
assert.strictEqual(result.hasOperatingDbWritePath, false, 'hasOperatingDbWritePath must be false');
assert.strictEqual(result.hasPriceChangePath, false, 'hasPriceChangePath must be false');
assert.strictEqual(result.hasStockChangePath, false, 'hasStockChangePath must be false');
assert.strictEqual(result.isExecutionApproved, false, 'isExecutionApproved must be false');
assert.strictEqual(result.isReExecutionApproved, false, 'isReExecutionApproved must be false');
assert.strictEqual(result.isConnectionApproved, false, 'isConnectionApproved must be false');
assert.strictEqual(result.isTokenTestApproved, false, 'isTokenTestApproved must be false');
assert.strictEqual(result.isLiveReady, false, 'isLiveReady must be false');
assert.ok(Array.isArray(result.fileScopeItems), 'fileScopeItems must be an array');
assert.strictEqual(result.fileScopeItems.length, 5, 'fileScopeItems must have 5 items');
result.fileScopeItems.forEach((item, i) => {
  assert.strictEqual(item.expectedPatternMaintained, true, `fileScopeItems[${i}].expectedPatternMaintained must be true`);
  assert.strictEqual(item.statusText, 'PASS', `fileScopeItems[${i}].statusText must be PASS`);
});
assert.strictEqual(result.auditStatus, 'SCOPE_VERIFIED', 'auditStatus must be SCOPE_VERIFIED');
assert.ok(typeof result.fileScopeConclusion === 'string' && result.fileScopeConclusion.length > 0, 'fileScopeConclusion must be non-empty');

console.log('[PASS] Task 205 File Scope Audit View: 모든 검증 통과');
