import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyPagePanelOrderRegistryView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-page-panel-order-registry-view.service';

const mockJob = { id: 'test-job-207', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyPagePanelOrderRegistryView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyPagePanelOrderRegistry, true, 'isDisplayOnlyPagePanelOrderRegistry must be true');
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

assert.ok(Array.isArray(result.panelOrderItems), 'panelOrderItems must be an array');
assert.strictEqual(result.panelOrderItems.length, 6, 'panelOrderItems must have 6 items (Task 202~207)');

const orders = result.panelOrderItems.map((item: any) => item.order);
for (let i = 0; i < orders.length; i++) {
  assert.strictEqual(orders[i], i + 1, `panelOrderItems[${i}].order must be ${i + 1}`);
}

const currentItems = result.panelOrderItems.filter((item: any) => item.isCurrentTask);
assert.strictEqual(currentItems.length, 1, 'exactly one item must be marked as current task');
assert.strictEqual(currentItems[0].taskId, 'Task 207', 'current task must be Task 207');

assert.ok(Array.isArray(result.blockedActionPaths), 'blockedActionPaths must be an array');
assert.ok(result.blockedActionPaths.length > 0, 'blockedActionPaths must be non-empty');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length > 0, 'misunderstandingPreventionItems must be non-empty');

assert.strictEqual(result.registryStatus, 'ORDER_REGISTERED', 'registryStatus must be ORDER_REGISTERED');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 207 Page Panel Order Registry View: 모든 검증 통과');
