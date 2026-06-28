import { strict as assert } from 'assert';
import { buildNaverApiConnectionApprovalPreSubmissionReviewView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-pre-submission-review-view.service';

const mockJob = { id: 'test-job-217', status: 'COMPLETED' };

const result = buildNaverApiConnectionApprovalPreSubmissionReviewView(mockJob);

assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isNaverApiConnectionApprovalPreSubmissionReview, true, 'isNaverApiConnectionApprovalPreSubmissionReview must be true');
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

assert.ok(Array.isArray(result.reviewItems), 'reviewItems must be an array');
assert.strictEqual(result.reviewItems.length, 6, 'reviewItems must have 6 items (matching Task 216 packet)');

const needsApprovalItems = result.reviewItems.filter((item: any) => item.reviewStatus === 'NEEDS_APPROVAL');
assert.strictEqual(needsApprovalItems.length, 4, 'exactly 4 items must be NEEDS_APPROVAL');

const forbiddenItems = result.reviewItems.filter((item: any) => item.reviewStatus === 'FORBIDDEN_UNTIL_APPROVAL');
assert.strictEqual(forbiddenItems.length, 2, 'exactly 2 items must be FORBIDDEN_UNTIL_APPROVAL');

const productUpdateItem = result.reviewItems.find((item: any) => item.reviewKey === 'productUpdateApi');
assert.ok(productUpdateItem, 'productUpdateApi review item must exist');
assert.strictEqual(productUpdateItem.reviewStatus, 'FORBIDDEN_UNTIL_APPROVAL', 'productUpdateApi must be FORBIDDEN_UNTIL_APPROVAL');

const priceStockItem = result.reviewItems.find((item: any) => item.reviewKey === 'priceStockChange');
assert.ok(priceStockItem, 'priceStockChange review item must exist');
assert.strictEqual(priceStockItem.reviewStatus, 'FORBIDDEN_UNTIL_APPROVAL', 'priceStockChange must be FORBIDDEN_UNTIL_APPROVAL');

result.reviewItems.forEach((item: any, i: number) => {
  assert.ok(typeof item.sourcePacketKey === 'string' && item.sourcePacketKey.length > 0, `item[${i}].sourcePacketKey must be non-empty`);
});

assert.ok(typeof result.sourcePacketTask === 'string' && result.sourcePacketTask.includes('Task 216'), 'sourcePacketTask must reference Task 216');
assert.strictEqual(result.reviewStatus, 'PRE_SUBMISSION_REVIEW', 'reviewStatus must be PRE_SUBMISSION_REVIEW');
assert.ok(typeof result.preSubmissionNotice === 'string' && result.preSubmissionNotice.length > 0, 'preSubmissionNotice must be non-empty');
assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length >= 6, 'misunderstandingPreventionItems must have at least 6 items');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 217 Naver API Connection Approval Pre-Submission Review View: 모든 검증 통과');
