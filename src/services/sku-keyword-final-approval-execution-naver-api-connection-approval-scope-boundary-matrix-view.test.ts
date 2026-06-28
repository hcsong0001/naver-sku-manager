import { strict as assert } from 'assert';
import { test } from 'node:test';
import { buildNaverApiConnectionApprovalScopeBoundaryMatrixView } from './sku-keyword-final-approval-execution-naver-api-connection-approval-scope-boundary-matrix-view.service';

test('Task 222 Naver API Connection Approval Scope Boundary Matrix View: 모든 검증 통과', () => {
  const mockJob = { id: 'test-job-222', status: 'SCOPE_BOUNDARY_MATRIX_READY' };
  const view = buildNaverApiConnectionApprovalScopeBoundaryMatrixView(mockJob);

  // 1. View Model 생성
  assert.ok(view, 'View Model이 생성되어야 합니다');

  // 2. status === "SCOPE_BOUNDARY_MATRIX_READY"
  assert.strictEqual(view.status, 'SCOPE_BOUNDARY_MATRIX_READY', 'status는 SCOPE_BOUNDARY_MATRIX_READY이어야 합니다');

  // 3. isBatchJobResultDisplayOnly === true
  assert.strictEqual(view.isBatchJobResultDisplayOnly, true, 'isBatchJobResultDisplayOnly는 true이어야 합니다');

  // 4. isUserApprovalStillRequired === true
  assert.strictEqual(view.isUserApprovalStillRequired, true, 'isUserApprovalStillRequired는 true이어야 합니다');

  // 5. isScopeBoundaryMatrixReady === true
  assert.strictEqual(view.isScopeBoundaryMatrixReady, true, 'isScopeBoundaryMatrixReady는 true이어야 합니다');

  // 6. isActualApprovalGranted === false
  assert.strictEqual(view.isActualApprovalGranted, false, 'isActualApprovalGranted는 false이어야 합니다');

  // 7. Matrix 항목에 세 가지 상태 모두 포함
  const readOnlyItems = view.matrixItems.filter((i) => i.status === 'READ_ONLY_CONFIRMED');
  const pendingItems = view.matrixItems.filter((i) => i.status === 'PENDING_USER_CONSENT');
  const lockedItems = view.matrixItems.filter((i) => i.status === 'LOCKED');

  assert.ok(readOnlyItems.length >= 1, `READ_ONLY_CONFIRMED 항목이 1개 이상 있어야 합니다. 현재: ${readOnlyItems.length}`);
  assert.ok(pendingItems.length >= 1, `PENDING_USER_CONSENT 항목이 1개 이상 있어야 합니다. 현재: ${pendingItems.length}`);
  assert.ok(lockedItems.length >= 1, `LOCKED 항목이 1개 이상 있어야 합니다. 현재: ${lockedItems.length}`);

  // 8. Token / API / Worker / Queue / Adapter / Live 실행 / DB write 항목이 LOCKED
  const lockedScopes = lockedItems.map((i) => i.scope);
  assert.ok(lockedScopes.some((s) => s.includes('Token')), 'Token 발급 항목이 LOCKED이어야 합니다');
  assert.ok(lockedScopes.some((s) => s.includes('Worker')), 'Worker 실행 항목이 LOCKED이어야 합니다');
  assert.ok(lockedScopes.some((s) => s.includes('Queue')), 'Queue enqueue 항목이 LOCKED이어야 합니다');
  assert.ok(lockedScopes.some((s) => s.includes('Adapter')), 'Adapter 연결 항목이 LOCKED이어야 합니다');
  assert.ok(lockedScopes.some((s) => s.includes('Live')), '실제 Live 실행 항목이 LOCKED이어야 합니다');
  assert.ok(lockedScopes.some((s) => s.includes('DB')), '운영 DB write 항목이 LOCKED이어야 합니다');

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

  console.log('[PASS] Task 222 Naver API Connection Approval Scope Boundary Matrix View: 모든 검증 통과');
  console.log(`  matrixItems: ${view.matrixItems.length}개`);
  console.log(`  READ_ONLY_CONFIRMED: ${readOnlyItems.length}개`);
  console.log(`  PENDING_USER_CONSENT: ${pendingItems.length}개`);
  console.log(`  LOCKED: ${lockedItems.length}개`);
  console.log(`  status: ${view.status}`);
});
