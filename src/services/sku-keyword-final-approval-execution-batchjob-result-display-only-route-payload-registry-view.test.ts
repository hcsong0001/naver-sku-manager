import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyRoutePayloadRegistryView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-route-payload-registry-view.service';

const mockJob = { id: 'test-job-212', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyRoutePayloadRegistryView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyRoutePayloadRegistry, true, 'isDisplayOnlyRoutePayloadRegistry must be true');
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

assert.ok(typeof result.task206SupplementNote === 'string' && result.task206SupplementNote.length > 0, 'task206SupplementNote must be non-empty');

assert.ok(Array.isArray(result.routePayloadRegistryItems), 'routePayloadRegistryItems must be an array');
assert.strictEqual(result.routePayloadRegistryItems.length, 11, 'routePayloadRegistryItems must have 11 items (Task 202~212)');
result.routePayloadRegistryItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isRegistered, true, `routePayloadRegistryItems[${i}].isRegistered must be true`);
});

const registeredItems = result.routePayloadRegistryItems.filter((item: any) => item.statusText === 'REGISTERED');
assert.strictEqual(registeredItems.length, 10, 'exactly 10 items must be REGISTERED (Task 202~211)');

const currentItems = result.routePayloadRegistryItems.filter((item: any) => item.statusText === 'CURRENT');
assert.strictEqual(currentItems.length, 1, 'exactly 1 item must be CURRENT (Task 212)');
assert.strictEqual(currentItems[0].sourceTask, 'Task 212', 'current item must be Task 212');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length > 0, 'misunderstandingPreventionItems must be non-empty');

assert.strictEqual(result.registryStatus, 'ROUTE_PAYLOAD_REGISTERED', 'registryStatus must be ROUTE_PAYLOAD_REGISTERED');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 212 Route Payload Registry View: 모든 검증 통과');
