import { strict as assert } from 'assert';
import { buildNaverApiConnectionApprovalRequestPacketView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-request-packet-view.service';

const mockJob = { id: 'test-job-216', status: 'COMPLETED' };

const result = buildNaverApiConnectionApprovalRequestPacketView(mockJob);

assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isNaverApiConnectionApprovalRequestPacket, true, 'isNaverApiConnectionApprovalRequestPacket must be true');
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

assert.ok(Array.isArray(result.approvalRequestItems), 'approvalRequestItems must be an array');
assert.strictEqual(result.approvalRequestItems.length, 6, 'approvalRequestItems must have 6 items');

result.approvalRequestItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.approvalRequired, true, `item[${i}].approvalRequired must be true`);
});

const pendingItems = result.approvalRequestItems.filter((item: any) => item.currentStatus === 'PENDING_APPROVAL');
assert.strictEqual(pendingItems.length, 4, 'exactly 4 items must be PENDING_APPROVAL');

const forbiddenItems = result.approvalRequestItems.filter((item: any) => item.currentStatus === 'FORBIDDEN_UNTIL_APPROVAL');
assert.strictEqual(forbiddenItems.length, 2, 'exactly 2 items must be FORBIDDEN_UNTIL_APPROVAL');

const productUpdateItem = result.approvalRequestItems.find((item: any) => item.requestKey === 'productUpdateApi');
assert.ok(productUpdateItem, 'productUpdateApi item must exist');
assert.strictEqual(productUpdateItem.currentStatus, 'FORBIDDEN_UNTIL_APPROVAL', 'productUpdateApi must be FORBIDDEN_UNTIL_APPROVAL');

const priceStockItem = result.approvalRequestItems.find((item: any) => item.requestKey === 'priceStockChange');
assert.ok(priceStockItem, 'priceStockChange item must exist');
assert.strictEqual(priceStockItem.currentStatus, 'FORBIDDEN_UNTIL_APPROVAL', 'priceStockChange must be FORBIDDEN_UNTIL_APPROVAL');

assert.strictEqual(result.packetStatus, 'APPROVAL_REQUEST_PENDING', 'packetStatus must be APPROVAL_REQUEST_PENDING');
assert.ok(typeof result.packetNotice === 'string' && result.packetNotice.length > 0, 'packetNotice must be non-empty');
assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length >= 5, 'misunderstandingPreventionItems must have at least 5 items');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 216 Naver API Connection Approval Request Packet View: 모든 검증 통과');
