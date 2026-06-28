import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusPayloadConsistencyAuditView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-status-payload-consistency-audit-view.service';

const mockJob = { id: 'test-job-208', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyStatusPayloadConsistencyAuditView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyStatusPayloadConsistencyAudit, true, 'isDisplayOnlyStatusPayloadConsistencyAudit must be true');
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

assert.ok(Array.isArray(result.statusPayloadConsistencyItems), 'statusPayloadConsistencyItems must be an array');
assert.ok(result.statusPayloadConsistencyItems.length > 0, 'statusPayloadConsistencyItems must be non-empty');
result.statusPayloadConsistencyItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.displayOnlyMeaningMaintained, true, `statusPayloadConsistencyItems[${i}].displayOnlyMeaningMaintained must be true`);
  assert.strictEqual(item.statusText, 'CONSISTENT', `statusPayloadConsistencyItems[${i}].statusText must be CONSISTENT`);
});

assert.ok(Array.isArray(result.countMeaningItems), 'countMeaningItems must be an array');
assert.ok(result.countMeaningItems.length > 0, 'countMeaningItems must be non-empty');
result.countMeaningItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isExecutionCondition, false, `countMeaningItems[${i}].isExecutionCondition must be false`);
  assert.strictEqual(item.statusText, 'DISPLAY_ONLY', `countMeaningItems[${i}].statusText must be DISPLAY_ONLY`);
});

assert.ok(Array.isArray(result.blockedActionPaths), 'blockedActionPaths must be an array');
assert.ok(result.blockedActionPaths.length > 0, 'blockedActionPaths must be non-empty');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length > 0, 'misunderstandingPreventionItems must be non-empty');

assert.strictEqual(result.auditStatus, 'CONSISTENCY_VERIFIED', 'auditStatus must be CONSISTENCY_VERIFIED');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 208 Status Payload Consistency Audit View: 모든 검증 통과');
