import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAuditClosureReadinessView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-audit-closure-readiness-view.service';

const mockJob = { id: 'test-job-211', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAuditClosureReadinessView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyAuditClosureReadiness, true, 'isDisplayOnlyAuditClosureReadiness must be true');
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

assert.ok(Array.isArray(result.auditClosureReadinessItems), 'auditClosureReadinessItems must be an array');
assert.strictEqual(result.auditClosureReadinessItems.length, 10, 'auditClosureReadinessItems must have 10 items (Task 202~211)');
result.auditClosureReadinessItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isReady, true, `auditClosureReadinessItems[${i}].isReady must be true`);
});

const closedItems = result.auditClosureReadinessItems.filter((item: any) => item.statusText === 'CLOSED');
assert.strictEqual(closedItems.length, 9, 'exactly 9 items must be CLOSED (Task 202~210)');

const currentItems = result.auditClosureReadinessItems.filter((item: any) => item.statusText === 'CURRENT');
assert.strictEqual(currentItems.length, 1, 'exactly 1 item must be CURRENT (Task 211)');
assert.strictEqual(currentItems[0].checkKey, 'auditClosureReadiness', 'current item must be auditClosureReadiness');

assert.ok(Array.isArray(result.completedAuditTasks), 'completedAuditTasks must be an array');
assert.strictEqual(result.completedAuditTasks.length, 10, 'completedAuditTasks must have 10 items');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length > 0, 'misunderstandingPreventionItems must be non-empty');

assert.strictEqual(result.closureStatus, 'AUDIT_CLOSURE_READY', 'closureStatus must be AUDIT_CLOSURE_READY');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 211 Audit Closure Readiness View: 모든 검증 통과');
