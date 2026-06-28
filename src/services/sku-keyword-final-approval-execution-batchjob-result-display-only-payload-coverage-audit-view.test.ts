import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyPayloadCoverageAuditView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-payload-coverage-audit-view.service';

const mockJob = { id: 'test-job-213', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyPayloadCoverageAuditView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyPayloadCoverageAudit, true, 'isDisplayOnlyPayloadCoverageAudit must be true');
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

assert.ok(Array.isArray(result.payloadCoverageAuditItems), 'payloadCoverageAuditItems must be an array');
assert.strictEqual(result.payloadCoverageAuditItems.length, 12, 'payloadCoverageAuditItems must have 12 items (Task 202~213)');

result.payloadCoverageAuditItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isConnectedToRoute, true, `item[${i}].isConnectedToRoute must be true`);
  assert.strictEqual(item.isConnectedToPage, true, `item[${i}].isConnectedToPage must be true`);
});

const coveredItems = result.payloadCoverageAuditItems.filter((item: any) => item.coverageStatus === 'COVERED');
assert.strictEqual(coveredItems.length, 11, 'exactly 11 items must be COVERED (Task 202~212)');

const currentItems = result.payloadCoverageAuditItems.filter((item: any) => item.coverageStatus === 'CURRENT');
assert.strictEqual(currentItems.length, 1, 'exactly 1 item must be CURRENT (Task 213)');
assert.strictEqual(currentItems[0].sourceTask, 'Task 213', 'current item must be Task 213');

assert.strictEqual(result.totalPayloadCount, 12, 'totalPayloadCount must be 12');
assert.strictEqual(result.coveredPayloadCount, 12, 'coveredPayloadCount must be 12');
assert.strictEqual(result.missingPayloadCount, 0, 'missingPayloadCount must be 0');
assert.strictEqual(result.auditStatus, 'ALL_PAYLOADS_COVERED', 'auditStatus must be ALL_PAYLOADS_COVERED');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length > 0, 'misunderstandingPreventionItems must be non-empty');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 213 Payload Coverage Audit View: 모든 검증 통과');
