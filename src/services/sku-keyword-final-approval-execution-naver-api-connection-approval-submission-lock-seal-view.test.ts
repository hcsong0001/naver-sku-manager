import { strict as assert } from 'assert';
import { buildNaverApiConnectionApprovalSubmissionLockSealView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-submission-lock-seal-view.service';

const mockJob = { id: 'test-job-218', status: 'COMPLETED' };

const result = buildNaverApiConnectionApprovalSubmissionLockSealView(mockJob);

// isNaverApiConnectionApprovalSubmissionLockSeal 필드 검증
assert.strictEqual(result.isNaverApiConnectionApprovalSubmissionLockSeal, true, 'isNaverApiConnectionApprovalSubmissionLockSeal must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');

// 승인 제출 관련 플래그 모두 false
assert.strictEqual(result.isApprovalSubmission, false, 'isApprovalSubmission must be false');
assert.strictEqual(result.isApprovalSubmitted, false, 'isApprovalSubmitted must be false');
assert.strictEqual(result.isPostApiConnected, false, 'isPostApiConnected must be false');

// Token / API / 가격재고 플래그 모두 false
assert.strictEqual(result.isTokenIssued, false, 'isTokenIssued must be false');
assert.strictEqual(result.isNaverApiCalled, false, 'isNaverApiCalled must be false');
assert.strictEqual(result.isProductLookupApiCalled, false, 'isProductLookupApiCalled must be false');
assert.strictEqual(result.isProductUpdateApiCalled, false, 'isProductUpdateApiCalled must be false');
assert.strictEqual(result.isPriceOrStockChanged, false, 'isPriceOrStockChanged must be false');
assert.strictEqual(result.isLiveExecutionEnabled, false, 'isLiveExecutionEnabled must be false');

// 실행 경로 플래그 모두 false
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

// lockSealItems 검증
assert.ok(Array.isArray(result.lockSealItems), 'lockSealItems must be an array');
assert.ok(result.lockSealItems.length >= 7, 'lockSealItems must have at least 7 items');

const lockedItems = result.lockSealItems.filter((item: any) => item.lockStatus === 'LOCKED');
assert.ok(lockedItems.length >= 6, 'at least 6 items must be LOCKED');

const pendingApprovalItems = result.lockSealItems.filter((item: any) => item.lockStatus === 'PENDING_USER_APPROVAL');
assert.strictEqual(pendingApprovalItems.length, 1, 'exactly 1 item must be PENDING_USER_APPROVAL (approvalSubmission)');
assert.strictEqual(pendingApprovalItems[0].lockKey, 'approvalSubmission', 'PENDING_USER_APPROVAL item must be approvalSubmission');

// Task 216/217 상태 참조 검증
assert.ok(typeof result.task216PacketStatus === 'string' && result.task216PacketStatus.includes('PENDING_APPROVAL'), 'task216PacketStatus must reference PENDING_APPROVAL');
assert.ok(typeof result.task217ReviewStatus === 'string' && result.task217ReviewStatus.includes('PRE_SUBMISSION_REVIEW'), 'task217ReviewStatus must reference PRE_SUBMISSION_REVIEW');

// sealStatus 검증
assert.strictEqual(result.sealStatus, 'SUBMISSION_LOCKED', 'sealStatus must be SUBMISSION_LOCKED');

// 오해 방지 항목 검증
assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length >= 6, 'misunderstandingPreventionItems must have at least 6 items');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 218 Naver API Connection Approval Submission Lock Seal View: 모든 검증 통과');
