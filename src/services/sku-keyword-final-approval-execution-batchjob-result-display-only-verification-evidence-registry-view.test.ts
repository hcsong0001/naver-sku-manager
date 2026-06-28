import { strict as assert } from 'assert';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyVerificationEvidenceRegistryView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-verification-evidence-registry-view.service';

const mockJob = { id: 'test-job-210', status: 'COMPLETED' };

const result = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyVerificationEvidenceRegistryView(mockJob);

assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isDisplayOnlyVerificationEvidenceRegistry, true, 'isDisplayOnlyVerificationEvidenceRegistry must be true');
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

assert.ok(Array.isArray(result.verificationEvidenceItems), 'verificationEvidenceItems must be an array');
assert.ok(result.verificationEvidenceItems.length > 0, 'verificationEvidenceItems must be non-empty');
result.verificationEvidenceItems.forEach((item: any, i: number) => {
  assert.strictEqual(item.isPass, true, `verificationEvidenceItems[${i}].isPass must be true`);
  assert.strictEqual(item.statusText, 'PASS', `verificationEvidenceItems[${i}].statusText must be PASS`);
});

assert.ok(Array.isArray(result.verificationSteps), 'verificationSteps must be an array');
assert.strictEqual(result.verificationSteps.length, 7, 'verificationSteps must have 7 items');

assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length > 0, 'misunderstandingPreventionItems must be non-empty');

assert.strictEqual(result.registryStatus, 'EVIDENCE_REGISTERED', 'registryStatus must be EVIDENCE_REGISTERED');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 210 Verification Evidence Registry View: 모든 검증 통과');
