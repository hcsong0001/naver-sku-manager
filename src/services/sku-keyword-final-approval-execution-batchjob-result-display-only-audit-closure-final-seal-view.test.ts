import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAuditClosureFinalSealView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-audit-closure-final-seal-view.service';

const mockJob = { id: 'test-job-214', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyAuditClosureFinalSealView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyAuditClosureFinalSeal, true, 'isDisplayOnlyAuditClosureFinalSeal must be true');
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

assert.ok(Array.isArray(result.auditClosureFinalSealItems), 'auditClosureFinalSealItems must be an array');
assert.strictEqual(result.auditClosureFinalSealItems.length, 13, 'auditClosureFinalSealItems must have 13 items (Task 202~214)');

result.auditClosureFinalSealItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isSealConfirmed, true, `item[${i}].isSealConfirmed must be true`);
});

const sealedItems = result.auditClosureFinalSealItems.filter((item: any) => item.sealStatus === 'SEALED');
assert.strictEqual(sealedItems.length, 12, 'exactly 12 items must be SEALED (Task 202~213)');

const currentItems = result.auditClosureFinalSealItems.filter((item: any) => item.sealStatus === 'CURRENT');
assert.strictEqual(currentItems.length, 1, 'exactly 1 item must be CURRENT (Task 214)');
assert.strictEqual(currentItems[0].sourceTask, 'Task 214', 'current item must be Task 214');

assert.strictEqual(result.sealedPayloadCount, 13, 'sealedPayloadCount must be 13');
assert.strictEqual(result.missingPayloadCount, 0, 'missingPayloadCount must be 0');
assert.strictEqual(result.finalSealStatus, 'AUDIT_CLOSURE_FINAL_SEALED', 'finalSealStatus must be AUDIT_CLOSURE_FINAL_SEALED');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length >= 5, 'misunderstandingPreventionItems must have at least 5 items');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 214 Audit Closure Final Seal View: 모든 검증 통과');
