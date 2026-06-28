import { strict as assert } from 'assert';
import { buildNaverApiConnectionApprovalEvidenceCertificationView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-evidence-certification-view.service';

const mockJob = { id: 'test-job-219', status: 'COMPLETED' };

const result = buildNaverApiConnectionApprovalEvidenceCertificationView(mockJob);

// 핵심 플래그 검증
assert.strictEqual(result.isNaverApiConnectionApprovalEvidenceCertification, true, 'isNaverApiConnectionApprovalEvidenceCertification must be true');
assert.strictEqual(result.isReadOnly, true, 'isReadOnly must be true');
assert.strictEqual(result.isEvidenceCertificationOnly, true, 'isEvidenceCertificationOnly must be true');
assert.strictEqual(result.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly must be true');
assert.strictEqual(result.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired must be true');

// 승인 / 제출 플래그 모두 false
assert.strictEqual(result.isApprovalSubmission, false, 'isApprovalSubmission must be false');
assert.strictEqual(result.isApprovalSubmitted, false, 'isApprovalSubmitted must be false');
assert.strictEqual(result.isPostApiConnected, false, 'isPostApiConnected must be false');
assert.strictEqual(result.isMutationConnected, false, 'isMutationConnected must be false');

// Token / API / 가격재고 / Live 플래그 모두 false
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

// flowEvidenceItems 검증 (Task 215~219, 5개)
assert.ok(Array.isArray(result.flowEvidenceItems), 'flowEvidenceItems must be an array');
assert.strictEqual(result.flowEvidenceItems.length, 5, 'flowEvidenceItems must have 5 items (Task 215~219)');

const readOnlyItems = result.flowEvidenceItems.filter((item: any) => item.certificationStatus === 'READ_ONLY_CONFIRMED');
assert.strictEqual(readOnlyItems.length, 4, 'exactly 4 items must be READ_ONLY_CONFIRMED (Task 215~218)');

const currentItems = result.flowEvidenceItems.filter((item: any) => item.certificationStatus === 'CURRENT_CERTIFICATION');
assert.strictEqual(currentItems.length, 1, 'exactly 1 item must be CURRENT_CERTIFICATION (Task 219)');
assert.strictEqual(currentItems[0].sourceTask, 'Task 219', 'CURRENT_CERTIFICATION item must be Task 219');

// evidenceCertificationItems 검증 (10개 증거 상태)
assert.ok(Array.isArray(result.evidenceCertificationItems), 'evidenceCertificationItems must be an array');
assert.strictEqual(result.evidenceCertificationItems.length, 10, 'evidenceCertificationItems must have 10 items');
assert.ok(result.evidenceCertificationItems.includes('READ_ONLY_CONFIRMED'), 'must include READ_ONLY_CONFIRMED');
assert.ok(result.evidenceCertificationItems.includes('NO_POST_API_CONNECTED'), 'must include NO_POST_API_CONNECTED');
assert.ok(result.evidenceCertificationItems.includes('NO_TOKEN_ISSUED'), 'must include NO_TOKEN_ISSUED');
assert.ok(result.evidenceCertificationItems.includes('NO_NAVER_API_CALLED'), 'must include NO_NAVER_API_CALLED');
assert.ok(result.evidenceCertificationItems.includes('USER_APPROVAL_STILL_REQUIRED'), 'must include USER_APPROVAL_STILL_REQUIRED');

// certificationStatus 검증
assert.strictEqual(result.certificationStatus, 'EVIDENCE_CERTIFIED', 'certificationStatus must be EVIDENCE_CERTIFIED');

// 오해 방지 항목 검증
assert.ok(Array.isArray(result.misunderstandingPreventionItems), 'misunderstandingPreventionItems must be an array');
assert.ok(result.misunderstandingPreventionItems.length >= 5, 'misunderstandingPreventionItems must have at least 5 items');
assert.ok(typeof result.finalNotice === 'string' && result.finalNotice.length > 0, 'finalNotice must be non-empty');

console.log('[PASS] Task 219 Naver API Connection Approval Evidence Certification View: 모든 검증 통과');
