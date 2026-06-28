import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalExplicitConsentChecklistView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-explicit-consent-checklist-view.service';

test('Task 221 Naver API Connection Approval Explicit Consent Checklist View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-221', status: 'EXPLICIT_CONSENT_REQUIRED' };
  const view = buildNaverApiConnectionApprovalExplicitConsentChecklistView(mockJob);

  // 1. View Model 생성
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status === "EXPLICIT_CONSENT_REQUIRED"
  assert.strictEqual(view.status, 'EXPLICIT_CONSENT_REQUIRED', 'status는 EXPLICIT_CONSENT_REQUIRED이어야 합니다');

  // 3. isBatchJobResultDisplayOnly === true
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired === true
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isExplicitConsentRequired === true
  assert.strictEqual(view.isExplicitConsentRequired, true, 'isExplicitConsentRequired는 true이어야 합니다');

  // 6. isConsentSubmitted === false
  assert.strictEqual(view.isConsentSubmitted, false, 'isConsentSubmitted는 false이어야 합니다');

  // 7. 승인/POST/Worker/Queue/Adapter/Submit/실행 버튼 관련 플래그 전부 false
  assert.strictEqual(view.isActualApprovalSubmissionAllowed, false, 'isActualApprovalSubmissionAllowed는 false이어야 합니다');
  assert.strictEqual(view.isApprovalSubmission, false, 'isApprovalSubmission은 false이어야 합니다');
  assert.strictEqual(view.isApprovalSubmitted, false, 'isApprovalSubmitted는 false이어야 합니다');
  assert.strictEqual(view.isPostApiConnected, false, 'isPostApiConnected는 false이어야 합니다');
  assert.strictEqual(view.isMutationConnected, false, 'isMutationConnected는 false이어야 합니다');
  assert.strictEqual(view.isLiveExecutionEnabled, false, 'isLiveExecutionEnabled는 false이어야 합니다');
  assert.strictEqual(view.hasExecutionButton, false, 'hasExecutionButton은 false이어야 합니다');
  assert.strictEqual(view.hasSubmitAction, false, 'hasSubmitAction은 false이어야 합니다');
  assert.strictEqual(view.hasWorkerTrigger, false, 'hasWorkerTrigger는 false이어야 합니다');
  assert.strictEqual(view.hasQueueTrigger, false, 'hasQueueTrigger는 false이어야 합니다');
  assert.strictEqual(view.hasAdapterTrigger, false, 'hasAdapterTrigger는 false이어야 합니다');

  // 8. Naver API / Token / 상품 조회·수정 / 가격·재고 변경 플래그 전부 false
  assert.strictEqual(view.isNaverApiCalled, false, 'isNaverApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isTokenIssued, false, 'isTokenIssued는 false이어야 합니다');
  assert.strictEqual(view.isProductLookupApiCalled, false, 'isProductLookupApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isProductUpdateApiCalled, false, 'isProductUpdateApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isPriceOrStockChanged, false, 'isPriceOrStockChanged는 false이어야 합니다');

  // 9. ".env" / 인증키 접근 플래그 false
  assert.strictEqual(view.hasEnvFileAccess, false, 'hasEnvFileAccess는 false이어야 합니다');
  assert.strictEqual(view.hasAuthKeyAccess, false, 'hasAuthKeyAccess는 false이어야 합니다');

  // 10. 체크리스트에 PENDING_EXPLICIT_CONSENT 항목 포함
  const pendingItems = view.checklistItems.filter(
    (item) => item.status === 'PENDING_EXPLICIT_CONSENT'
  );
  assert.ok(
    pendingItems.length >= 1,
    `checklistItems에 PENDING_EXPLICIT_CONSENT 항목이 1개 이상 있어야 합니다. 현재: ${pendingItems.length}`
  );

  // 추가 검증: LOCKED 항목 포함
  const lockedItems = view.checklistItems.filter(
    (item) => item.status === 'LOCKED'
  );
  assert.ok(
    lockedItems.length >= 1,
    `checklistItems에 LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${lockedItems.length}`
  );

  // 추가 검증: READ_ONLY_INFO 항목 포함
  const readOnlyItems = view.checklistItems.filter(
    (item) => item.status === 'READ_ONLY_INFO'
  );
  assert.ok(
    readOnlyItems.length >= 1,
    `checklistItems에 READ_ONLY_INFO 항목이 1개 이상 있어야 합니다. 현재: ${readOnlyItems.length}`
  );

  // 전체 체크리스트 항목 수 (10개)
  assert.strictEqual(
    view.checklistItems.length,
    10,
    `checklistItems는 10개이어야 합니다. 현재: ${view.checklistItems.length}`
  );

  console.log('[PASS] Task 221 Naver API Connection Approval Explicit Consent Checklist View: 모든 검증 통과');
  console.log(`  checklistItems: ${view.checklistItems.length}개`);
  console.log(`  PENDING_EXPLICIT_CONSENT: ${pendingItems.length}개`);
  console.log(`  LOCKED: ${lockedItems.length}개`);
  console.log(`  READ_ONLY_INFO: ${readOnlyItems.length}개`);
  console.log(`  status: ${view.status}`);
});
