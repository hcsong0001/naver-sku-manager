import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceOneTimeTestFinalSafetyGateView } from './sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-final-safety-gate-view.service';

const mockJob = {};

describe('Task 260 Naver Token Issuance One-Time Test Final Safety Gate View', () => {
  const view = buildNaverTokenIssuanceOneTimeTestFinalSafetyGateView(mockJob);

  it('status === TOKEN_ISSUANCE_ONE_TIME_TEST_FINAL_SAFETY_GATE_READY', () => {
    assert.strictEqual(view.status, 'TOKEN_ISSUANCE_ONE_TIME_TEST_FINAL_SAFETY_GATE_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isTokenIssuanceOneTimeTestFinalSafetyGateReady === true', () => {
    assert.strictEqual(view.isTokenIssuanceOneTimeTestFinalSafetyGateReady, true);
  });

  it('isEnvAuthRuntimeScopeRecheckResultReady === true', () => {
    assert.strictEqual(view.isEnvAuthRuntimeScopeRecheckResultReady, true);
  });

  it('presencePresentCount === 3', () => {
    assert.strictEqual(view.presencePresentCount, 3);
  });

  it('presenceMissingCount === 0', () => {
    assert.strictEqual(view.presenceMissingCount, 0);
  });

  it('targetPresentCount === 3', () => {
    assert.strictEqual(view.targetPresentCount, 3);
  });

  it('targetMissingCount === 0', () => {
    assert.strictEqual(view.targetMissingCount, 0);
  });

  it('isTargetPresenceResultMet === true', () => {
    assert.strictEqual(view.isTargetPresenceResultMet, true);
  });

  it('isReadyForTokenIssuanceGate === true', () => {
    assert.strictEqual(view.isReadyForTokenIssuanceGate, true);
  });

  it('isUserFinalApprovalRequiredForTokenIssuance === true', () => {
    assert.strictEqual(view.isUserFinalApprovalRequiredForTokenIssuance, true);
  });

  it('isUserFinalApprovalGrantedForTokenIssuance === false', () => {
    assert.strictEqual(view.isUserFinalApprovalGrantedForTokenIssuance, false);
  });

  it('isTokenIssuanceAllowed === false', () => {
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
  });

  it('isOneTimeTokenIssuanceTestAllowed === false', () => {
    assert.strictEqual(view.isOneTimeTokenIssuanceTestAllowed, false);
  });

  it('isTokenIssued === false', () => {
    assert.strictEqual(view.isTokenIssued, false);
  });

  it('isTokenStored === false', () => {
    assert.strictEqual(view.isTokenStored, false);
  });

  it('isTokenValueDisplayed === false', () => {
    assert.strictEqual(view.isTokenValueDisplayed, false);
  });

  it('isEnvFileDirectlyAccessed === false', () => {
    assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
  });

  it('isEnvFileModified === false', () => {
    assert.strictEqual(view.isEnvFileModified, false);
  });

  it('isEnvValueDisplayed === false', () => {
    assert.strictEqual(view.isEnvValueDisplayed, false);
  });

  it('isAuthKeyValueDisplayed === false', () => {
    assert.strictEqual(view.isAuthKeyValueDisplayed, false);
  });

  it('isSecretLogged === false', () => {
    assert.strictEqual(view.isSecretLogged, false);
  });

  it('hasEnvFileAccess === false', () => {
    assert.strictEqual(view.hasEnvFileAccess, false);
  });

  it('hasAuthKeyAccess === false', () => {
    assert.strictEqual(view.hasAuthKeyAccess, false);
  });

  it('gateItems에 18개 이상 항목이 있음', () => {
    assert.ok(view.gateItems.length >= 18);
  });

  it('gateItems에 RECHECK_RESULT_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.gateItems.some(i => i.status === 'RECHECK_RESULT_CONFIRMED'), 'RECHECK_RESULT_CONFIRMED 없음');
  });

  it('Env/Auth 목표 결과 항목은 TARGET_MET', () => {
    const found = view.gateItems.some(i =>
      (i.gateItem.includes('목표') || i.gateItem.includes('Env/Auth')) && i.status === 'TARGET_MET'
    );
    assert.ok(found, 'Env/Auth 목표 결과 TARGET_MET 항목이 없습니다.');
  });

  it('Token 발급 Gate 항목은 READY_FOR_ONE_TIME_TEST_GATE', () => {
    const found = view.gateItems.some(i =>
      (i.gateItem.includes('Gate') || i.gateItem.includes('발급 Gate')) && i.status === 'READY_FOR_ONE_TIME_TEST_GATE'
    );
    assert.ok(found, 'Token 발급 Gate READY_FOR_ONE_TIME_TEST_GATE 항목이 없습니다.');
  });

  it('사용자 최종 승인 항목은 PENDING_USER_APPROVAL', () => {
    const found = view.gateItems.some(i =>
      (i.gateItem.includes('승인') || i.gateItem.includes('최종')) && i.status === 'PENDING_USER_APPROVAL'
    );
    assert.ok(found, '사용자 최종 승인 PENDING_USER_APPROVAL 항목이 없습니다.');
  });

  it('실제 Token 발급 항목은 LOCKED_UNTIL_USER_APPROVAL', () => {
    const found = view.gateItems.some(i =>
      i.gateItem.includes('Token 발급') && i.status === 'LOCKED_UNTIL_USER_APPROVAL'
    );
    assert.ok(found, '실제 Token 발급 LOCKED_UNTIL_USER_APPROVAL 항목이 없습니다.');
  });

  it('Token 값 표시 항목은 FORBIDDEN', () => {
    const found = view.gateItems.some(i =>
      i.gateItem.includes('Token 값') && i.status === 'FORBIDDEN'
    );
    assert.ok(found, 'Token 값 표시 FORBIDDEN 항목이 없습니다.');
  });

  it('인증키 값 표시 항목은 FORBIDDEN', () => {
    const found = view.gateItems.some(i =>
      i.gateItem.includes('인증키') && i.status === 'FORBIDDEN'
    );
    assert.ok(found, '인증키 값 표시 FORBIDDEN 항목이 없습니다.');
  });

  it('Secret 로그 출력 항목은 FORBIDDEN', () => {
    const found = view.gateItems.some(i =>
      i.gateItem.includes('Secret') && i.status === 'FORBIDDEN'
    );
    assert.ok(found, 'Secret 로그 출력 FORBIDDEN 항목이 없습니다.');
  });

  it('Token 저장 항목은 LOCKED', () => {
    const found = view.gateItems.some(i =>
      i.gateItem === 'Token 저장' && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 저장 LOCKED 항목이 없습니다.');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    assert.ok(view.gateItems.some(i => i.gateItem.includes('Naver API') && i.status === 'LOCKED'), 'Naver API LOCKED 없음');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    assert.ok(view.gateItems.some(i => i.gateItem.includes('상품') && i.status === 'LOCKED'), '상품 API LOCKED 없음');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    assert.ok(view.gateItems.some(i => (i.gateItem.includes('가격') || i.gateItem.includes('재고')) && i.status === 'LOCKED'), '가격·재고 LOCKED 없음');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    assert.ok(view.gateItems.some(i => (i.gateItem.includes('Worker') || i.gateItem.includes('Queue') || i.gateItem.includes('Adapter')) && i.status === 'LOCKED'), 'Worker/Queue/Adapter LOCKED 없음');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    assert.ok(view.gateItems.some(i => i.gateItem.includes('POST') && i.status === 'NOT_CONNECTED'), 'POST NOT_CONNECTED 없음');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    assert.ok(view.gateItems.some(i => i.gateItem.includes('버튼') && i.status === 'NOT_PRESENT'), '버튼 NOT_PRESENT 없음');
  });

  it('현재 Task 상태 항목은 READ_ONLY_INFO', () => {
    assert.ok(view.gateItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('gateItems에 권장 상태값이 모두 포함됨', () => {
    const statuses = view.gateItems.map(i => i.status);
    const requiredStatuses = [
      'RECHECK_RESULT_CONFIRMED',
      'TARGET_MET',
      'READY_FOR_ONE_TIME_TEST_GATE',
      'PENDING_USER_APPROVAL',
      'LOCKED_UNTIL_USER_APPROVAL',
      'LOCKED',
      'FORBIDDEN',
      'NOT_ACCESSED',
      'NOT_MODIFIED',
      'NOT_CONNECTED',
      'NOT_PRESENT',
      'READ_ONLY_INFO',
    ];
    for (const s of requiredStatuses) {
      assert.ok(statuses.includes(s as any), `권장 상태값 "${s}"이 포함되지 않았습니다.`);
    }
  });

  it('모든 실행 관련 플래그가 false', () => {
    assert.strictEqual(view.isActualApprovalGranted, false);
    assert.strictEqual(view.isActualApprovalSubmissionAllowed, false);
    assert.strictEqual(view.isApprovalSubmitted, false);
    assert.strictEqual(view.isExecutionAllowed, false);
    assert.strictEqual(view.isApprovalSubmission, false);
    assert.strictEqual(view.isPostApiConnected, false);
    assert.strictEqual(view.isMutationConnected, false);
    assert.strictEqual(view.isLiveExecutionEnabled, false);
    assert.strictEqual(view.hasApprovalRequestButton, false);
    assert.strictEqual(view.hasExecutionButton, false);
    assert.strictEqual(view.hasSubmitAction, false);
    assert.strictEqual(view.hasWorkerTrigger, false);
    assert.strictEqual(view.hasQueueTrigger, false);
    assert.strictEqual(view.hasAdapterTrigger, false);
    assert.strictEqual(view.isNaverApiCalled, false);
    assert.strictEqual(view.isProductLookupApiCalled, false);
    assert.strictEqual(view.isProductUpdateApiCalled, false);
    assert.strictEqual(view.isPriceOrStockChanged, false);
  });

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const jsonStr = JSON.stringify(view);
    assert.ok(!jsonStr.includes('Bearer '), 'Bearer 토큰이 포함되어 있습니다.');
    assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), '실제 base64 인코딩 값이 포함된 것으로 의심됩니다.');
  });
});
