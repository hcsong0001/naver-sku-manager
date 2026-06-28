import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalRiskAcceptanceLedgerView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-risk-acceptance-ledger-view.service';

test('Task 223 Naver API Connection Approval Risk Acceptance Ledger View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-223', status: 'RISK_ACCEPTANCE_LEDGER_READY' };
  const view = buildNaverApiConnectionApprovalRiskAcceptanceLedgerView(mockJob);

  // 1. View Model 생성
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status === "RISK_ACCEPTANCE_LEDGER_READY"
  assert.strictEqual(view.status, 'RISK_ACCEPTANCE_LEDGER_READY', 'status는 RISK_ACCEPTANCE_LEDGER_READY이어야 합니다');

  // 3. isBatchJobResultDisplayOnly === true
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired === true
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isRiskAcceptanceLedgerReady === true
  assert.strictEqual(view.isRiskAcceptanceLedgerReady, true, 'isRiskAcceptanceLedgerReady는 true이어야 합니다');

  // 6. isRiskAcceptedByUser === false
  assert.strictEqual(view.isRiskAcceptedByUser, false, 'isRiskAcceptedByUser는 false이어야 합니다');

  // 7. Ledger 항목에 세 가지 상태 모두 포함
  const pendingItems = view.ledgerItems.filter((i) => i.status === 'PENDING_USER_ACCEPTANCE');
  const lockedItems = view.ledgerItems.filter((i) => i.status === 'LOCKED');
  const readOnlyItems = view.ledgerItems.filter((i) => i.status === 'READ_ONLY_INFO');

  assert.ok(pendingItems.length >= 1, `PENDING_USER_ACCEPTANCE 항목이 1개 이상 있어야 합니다. 현재: ${pendingItems.length}`);
  assert.ok(lockedItems.length >= 1, `LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${lockedItems.length}`);
  assert.ok(readOnlyItems.length >= 1, `READ_ONLY_INFO 항목이 1개 이상 있어야 합니다. 현재: ${readOnlyItems.length}`);

  // 8. Token / API / Worker / Queue / Adapter / Live / DB write 위험 항목이 존재함
  const allRiskItems = view.ledgerItems.map((i) => i.riskItem);
  assert.ok(allRiskItems.some((r) => r.includes('Token')), 'Token 발급 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('Worker')), 'Worker 실행 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('Queue')), 'Queue enqueue 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('Adapter')), 'Adapter 연결 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('Live')), 'Live 실행 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('DB')), '운영 DB write 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('상품 조회')), '상품 조회 API 위험 항목이 존재해야 합니다');
  assert.ok(allRiskItems.some((r) => r.includes('상품 수정')), '상품 수정 API 위험 항목이 존재해야 합니다');

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

  console.log('[PASS] Task 223 Naver API Connection Approval Risk Acceptance Ledger View: 모든 검증 통과');
  console.log(`  ledgerItems: ${view.ledgerItems.length}개`);
  console.log(`  PENDING_USER_ACCEPTANCE: ${pendingItems.length}개`);
  console.log(`  LOCKED: ${lockedItems.length}개`);
  console.log(`  READ_ONLY_INFO: ${readOnlyItems.length}개`);
  console.log(`  status: ${view.status}`);
});
