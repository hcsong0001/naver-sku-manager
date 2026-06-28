import { strict as assert } from 'assert';
import { buildNaverApiConnectionReadinessBoundaryView } from './sku-keyword-final-approval-execution-naver-api-connection-readiness-boundary-view.service';

const mockJob = { id: 'test-job-215', status: 'COMPLETED' };

const result = buildNaverApiConnectionReadinessBoundaryView(mockJob);

assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isNaverApiConnectionReadyOnlyBoundary, true, 'isNaverApiConnectionReadyOnlyBoundary must be true');
assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');

assert.strictEqual(result.isExecutionApproved, false, 'isExecutionApproved must be false');
assert.strictEqual(result.isReExecutionApproved, false, 'isReExecutionApproved must be false');
assert.strictEqual(result.isConnectionApproved, false, 'isConnectionApproved must be false');
assert.strictEqual(result.isTokenTestApproved, false, 'isTokenTestApproved must be false');
assert.strictEqual(result.isLiveReady, false, 'isLiveReady must be false');
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
assert.strictEqual(result.hasEnvFileAccess, false, 'hasEnvFileAccess must be false');
assert.strictEqual(result.hasAuthKeyAccess, false, 'hasAuthKeyAccess must be false');
assert.strictEqual(result.hasProductLookupApiPath, false, 'hasProductLookupApiPath must be false');
assert.strictEqual(result.hasProductUpdateApiPath, false, 'hasProductUpdateApiPath must be false');

assert.ok(Array.isArray(result.boundaryItems), 'boundaryItems must be an array');
assert.ok(result.boundaryItems.length >= 8, 'boundaryItems must have at least 8 items');

const allowedItems = result.boundaryItems.filter((item: any) => item.boundaryStatus === 'ALLOWED');
assert.strictEqual(allowedItems.length, 1, 'exactly 1 item must be ALLOWED (readiness confirmation only)');
assert.strictEqual(allowedItems[0].checkKey, 'readinessConfirmation', 'ALLOWED item must be readinessConfirmation');

const forbiddenOrApprovalItems = result.boundaryItems.filter((item: any) => item.boundaryStatus === 'REQUIRES_APPROVAL');
assert.ok(forbiddenOrApprovalItems.length >= 7, 'at least 7 items must require approval');

forbiddenOrApprovalItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isAllowed, false, `REQUIRES_APPROVAL item[${i}].isAllowed must be false`);
  assert.strictEqual(item.requiresUserApproval, true, `REQUIRES_APPROVAL item[${i}].requiresUserApproval must be true`);
});

assert.strictEqual(result.boundaryStatus, 'BOUNDARY_CONFIRMED', 'boundaryStatus must be BOUNDARY_CONFIRMED');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length >= 5, 'misunderstandingPreventionItems must have at least 5 items');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 215 Naver API Connection Readiness Boundary View: 모든 검증 통과');
