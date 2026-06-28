import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyCommitHashAuditView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-commit-hash-audit-view.service';

const mockJob = { id: 'test-job-206', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyCommitHashAuditView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyCommitHashAudit, true, 'isDisplayOnlyCommitHashAudit must be true');
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
assert.ok(Array.isArray(result.commitHashItems), 'commitHashItems must be an array');
assert.strictEqual(result.commitHashItems.length, 4, 'commitHashItems must have 4 items (Task 202~205)');
result.commitHashItems.forEach((item, i) => {
  assert.strictEqual(item.isVerified, true, `commitHashItems[${i}].isVerified must be true`);
  assert.strictEqual(item.statusText, 'VERIFIED', `commitHashItems[${i}].statusText must be VERIFIED`);
  assert.ok(typeof item.commitHash === 'string' && item.commitHash.length > 0, `commitHashItems[${i}].commitHash must be non-empty`);
});
assert.strictEqual(result.auditStatus, 'COMMIT_HASH_VERIFIED', 'auditStatus must be COMMIT_HASH_VERIFIED');
assert.ok(typeof result.auditConclusion === 'string' && result.auditConclusion.length > 0, 'auditConclusion must be non-empty');

console.log('[PASS] Task 206 Commit Hash Audit View: 모든 검증 통과');
