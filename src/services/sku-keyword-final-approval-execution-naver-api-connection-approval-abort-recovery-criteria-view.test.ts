import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalAbortRecoveryCriteriaView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-abort-recovery-criteria-view.service';

test('Task 224 Naver API Connection Approval Abort Recovery Criteria View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-224', status: 'ABORT_RECOVERY_CRITERIA_READY' };
  const view = buildNaverApiConnectionApprovalAbortRecoveryCriteriaView(mockJob);

  // 1. View Model 생성
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status === "ABORT_RECOVERY_CRITERIA_READY"
  assert.strictEqual(view.status, 'ABORT_RECOVERY_CRITERIA_READY', 'status는 ABORT_RECOVERY_CRITERIA_READY이어야 합니다');

  // 3. isBatchJobResultDisplayOnly === true
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired === true
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isAbortRecoveryCriteriaReady === true
  assert.strictEqual(view.isAbortRecoveryCriteriaReady, true, 'isAbortRecoveryCriteriaReady는 true이어야 합니다');

  // 6. isAbortRecoveryCriteriaAccepted === false
  assert.strictEqual(view.isAbortRecoveryCriteriaAccepted, false, 'isAbortRecoveryCriteriaAccepted는 false이어야 합니다');

  // 7. criteriaItems에 세 가지 상태 모두 포함
  const criteriaRequired = view.criteriaItems.filter((i) => i.status === 'CRITERIA_REQUIRED');
  const locked = view.criteriaItems.filter((i) => i.status === 'LOCKED');
  const readOnly = view.criteriaItems.filter((i) => i.status === 'READ_ONLY_INFO');

  assert.ok(criteriaRequired.length >= 1, `CRITERIA_REQUIRED 항목이 1개 이상 있어야 합니다. 현재: ${criteriaRequired.length}`);
  assert.ok(locked.length >= 1, `LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${locked.length}`);
  assert.ok(readOnly.length >= 1, `READ_ONLY_INFO 항목이 1개 이상 있어야 합니다. 현재: ${readOnly.length}`);

  // 8. Token / 인증 오류 / 상품 조회 실패 / 재승인 기준 존재
  const allCriteria = view.criteriaItems.map((i) => i.criteriaItem);
  assert.ok(allCriteria.some((c) => c.includes('Token')), 'Token 발급 실패 기준이 존재해야 합니다');
  assert.ok(allCriteria.some((c) => c.includes('인증')), '인증 오류 기준이 존재해야 합니다');
  assert.ok(allCriteria.some((c) => c.includes('상품 조회')), '상품 조회 실패 기준이 존재해야 합니다');
  assert.ok(allCriteria.some((c) => c.includes('재승인')), '사용자 재승인 필요 기준이 존재해야 합니다');

  // Worker / Queue / Adapter / Live / DB write 항목은 LOCKED
  const lockedCriteria = locked.map((i) => i.criteriaItem);
  assert.ok(lockedCriteria.some((c) => c.includes('Worker')), 'Worker 실패 처리 항목이 LOCKED이어야 합니다');
  assert.ok(lockedCriteria.some((c) => c.includes('Queue')), 'Queue 실패 처리 항목이 LOCKED이어야 합니다');
  assert.ok(lockedCriteria.some((c) => c.includes('Adapter')), 'Adapter 실패 처리 항목이 LOCKED이어야 합니다');
  assert.ok(lockedCriteria.some((c) => c.includes('Live')), 'Live 실행 중단 기준 항목이 LOCKED이어야 합니다');
  assert.ok(lockedCriteria.some((c) => c.includes('DB')), '운영 DB write 실패 복구 항목이 LOCKED이어야 합니다');

  // 9. 모든 실행 관련 플래그 false
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
  assert.strictEqual(view.isNaverApiCalled, false, 'isNaverApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isTokenIssued, false, 'isTokenIssued는 false이어야 합니다');
  assert.strictEqual(view.isProductLookupApiCalled, false, 'isProductLookupApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isProductUpdateApiCalled, false, 'isProductUpdateApiCalled는 false이어야 합니다');
  assert.strictEqual(view.isPriceOrStockChanged, false, 'isPriceOrStockChanged는 false이어야 합니다');

  // 10. ".env" / 인증키 접근 플래그 false
  assert.strictEqual(view.hasEnvFileAccess, false, 'hasEnvFileAccess는 false이어야 합니다');
  assert.strictEqual(view.hasAuthKeyAccess, false, 'hasAuthKeyAccess는 false이어야 합니다');

  console.log('[PASS] Task 224 Naver API Connection Approval Abort Recovery Criteria View: 모든 검증 통과');
  console.log(`  criteriaItems: ${view.criteriaItems.length}개`);
  console.log(`  CRITERIA_REQUIRED: ${criteriaRequired.length}개`);
  console.log(`  LOCKED: ${locked.length}개`);
  console.log(`  READ_ONLY_INFO: ${readOnly.length}개`);
  console.log(`  status: ${view.status}`);
});
