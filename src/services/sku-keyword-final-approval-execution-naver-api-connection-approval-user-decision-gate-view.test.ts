import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalUserDecisionGateView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-user-decision-gate-view.service';

test('Task 220 Naver API Connection Approval User Decision Gate View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-220', status: 'WAITING_USER_DECISION' };
  const view = buildNaverApiConnectionApprovalUserDecisionGateView(mockJob);

  // 1. View Model이 생성된다.
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status가 WAITING_USER_DECISION이다.
  assert.strictEqual(view.status, 'WAITING_USER_DECISION', 'status는 WAITING_USER_DECISION이어야 합니다');

  // 3. isBatchJobResultDisplayOnly가 true다.
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired가 true다.
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isUserDecisionPending이 true다.
  assert.strictEqual(view.isUserDecisionPending, true, 'isUserDecisionPending은 true이어야 합니다');

  // 6. 실제 승인 제출 관련 플래그가 모두 false다.
  const flags = view.executionLockFlags;
  assert.strictEqual(flags.isActualApprovalSubmissionAllowed, false, 'isActualApprovalSubmissionAllowed는 false이어야 합니다');
  assert.strictEqual(flags.isApprovalSubmission, false, 'isApprovalSubmission은 false이어야 합니다');
  assert.strictEqual(flags.isApprovalSubmitted, false, 'isApprovalSubmitted는 false이어야 합니다');
  assert.strictEqual(flags.isPostApiConnected, false, 'isPostApiConnected는 false이어야 합니다');
  assert.strictEqual(flags.isMutationConnected, false, 'isMutationConnected는 false이어야 합니다');
  assert.strictEqual(flags.isLiveExecutionEnabled, false, 'isLiveExecutionEnabled는 false이어야 합니다');

  // 7. Naver API / Token / 상품 조회 / 상품 수정 / 가격·재고 변경 플래그가 모두 false다.
  assert.strictEqual(flags.isNaverApiCalled, false, 'isNaverApiCalled는 false이어야 합니다');
  assert.strictEqual(flags.isTokenIssued, false, 'isTokenIssued는 false이어야 합니다');
  assert.strictEqual(flags.isProductLookupApiCalled, false, 'isProductLookupApiCalled는 false이어야 합니다');
  assert.strictEqual(flags.isProductUpdateApiCalled, false, 'isProductUpdateApiCalled는 false이어야 합니다');
  assert.strictEqual(flags.isPriceOrStockChanged, false, 'isPriceOrStockChanged는 false이어야 합니다');

  // 8. Worker / Queue / Adapter / 실행 버튼 / Submit Action 플래그가 모두 false다.
  assert.strictEqual(flags.hasExecutionButton, false, 'hasExecutionButton은 false이어야 합니다');
  assert.strictEqual(flags.hasSubmitAction, false, 'hasSubmitAction은 false이어야 합니다');
  assert.strictEqual(flags.hasWorkerTrigger, false, 'hasWorkerTrigger는 false이어야 합니다');
  assert.strictEqual(flags.hasQueueTrigger, false, 'hasQueueTrigger는 false이어야 합니다');
  assert.strictEqual(flags.hasAdapterTrigger, false, 'hasAdapterTrigger는 false이어야 합니다');

  // 9. .env / 인증키 접근 플래그가 false다.
  assert.strictEqual(flags.hasEnvFileAccess, false, 'hasEnvFileAccess는 false이어야 합니다');
  assert.strictEqual(flags.hasAuthKeyAccess, false, 'hasAuthKeyAccess는 false이어야 합니다');

  // 10. decisionItems에 PENDING_USER_DECISION 항목이 포함된다.
  const pendingItems = view.decisionItems.filter(
    (item) => item.status === 'PENDING_USER_DECISION'
  );
  assert.ok(
    pendingItems.length >= 1,
    `decisionItems에 PENDING_USER_DECISION 항목이 1개 이상 있어야 합니다. 현재: ${pendingItems.length}`
  );

  // 추가: LOCKED 항목 포함 여부
  const lockedItems = view.decisionItems.filter(
    (item) => item.status === 'LOCKED'
  );
  assert.ok(
    lockedItems.length >= 1,
    `decisionItems에 LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${lockedItems.length}`
  );

  console.log('[PASS] Task 220 Naver API Connection Approval User Decision Gate View: 모든 검증 통과');
  console.log(`  decisionItems: ${view.decisionItems.length}개`);
  console.log(`  PENDING_USER_DECISION: ${pendingItems.length}개`);
  console.log(`  LOCKED: ${lockedItems.length}개`);
  console.log(`  status: ${view.status}`);
});
