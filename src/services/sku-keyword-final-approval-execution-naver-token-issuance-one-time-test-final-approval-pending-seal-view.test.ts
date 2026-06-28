import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceOneTimeTestFinalApprovalPendingSealView } from './sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-final-approval-pending-seal-view.service';

const mockJob = {};

describe('Task 262 Naver Token Issuance One-Time Test Final Approval Pending Seal View', () => {
  const view = buildNaverTokenIssuanceOneTimeTestFinalApprovalPendingSealView(mockJob);

  it('status === TOKEN_ISSUANCE_ONE_TIME_TEST_FINAL_APPROVAL_PENDING_SEALED', () => {
    assert.strictEqual(view.status, 'TOKEN_ISSUANCE_ONE_TIME_TEST_FINAL_APPROVAL_PENDING_SEALED');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isTokenIssuanceOneTimeTestFinalApprovalPendingSealed === true', () => {
    assert.strictEqual(view.isTokenIssuanceOneTimeTestFinalApprovalPendingSealed, true);
  });

  it('isTokenIssuanceOneTimeTestUserFinalApprovalRequestPacketReady === true', () => {
    assert.strictEqual(view.isTokenIssuanceOneTimeTestUserFinalApprovalRequestPacketReady, true);
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

  it('isUserFinalApprovalRequestPacketReady === true', () => {
    assert.strictEqual(view.isUserFinalApprovalRequestPacketReady, true);
  });

  it('isUserFinalApprovalGrantedForTokenIssuance === false', () => {
    assert.strictEqual(view.isUserFinalApprovalGrantedForTokenIssuance, false);
  });

  it('isUserFinalApprovalPhraseReceived === false', () => {
    assert.strictEqual(view.isUserFinalApprovalPhraseReceived, false);
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

  it('sealItems에 19개 이상 항목이 있음', () => {
    assert.ok(view.sealItems.length >= 19);
  });

  it('승인 요청 패킷 항목은 APPROVAL_REQUEST_PACKET_CONFIRMED', () => {
    const found = view.sealItems.some(i =>
      i.sealItem.includes('Approval Request Packet') && i.status === 'APPROVAL_REQUEST_PACKET_CONFIRMED'
    );
    assert.ok(found, 'APPROVAL_REQUEST_PACKET_CONFIRMED 항목이 없습니다.');
  });

  it('Env/Auth 목표 결과 항목은 TARGET_MET', () => {
    const found = view.sealItems.some(i =>
      (i.sealItem.includes('목표') || i.sealItem.includes('Env/Auth')) && i.status === 'TARGET_MET'
    );
    assert.ok(found, 'Env/Auth 목표 결과 TARGET_MET 항목이 없습니다.');
  });

  it('Final Safety Gate 항목은 FINAL_SAFETY_GATE_CONFIRMED', () => {
    const found = view.sealItems.some(i =>
      i.sealItem.includes('Safety Gate') && i.status === 'FINAL_SAFETY_GATE_CONFIRMED'
    );
    assert.ok(found, 'Final Safety Gate FINAL_SAFETY_GATE_CONFIRMED 항목이 없습니다.');
  });

  it('사용자 최종 승인 상태 항목은 PENDING_USER_APPROVAL', () => {
    const found = view.sealItems.some(i =>
      (i.sealItem.includes('승인 상태') || i.sealItem.includes('최종 승인')) && i.status === 'PENDING_USER_APPROVAL'
    );
    assert.ok(found, '사용자 최종 승인 상태 PENDING_USER_APPROVAL 항목이 없습니다.');
  });

  it('명시 승인 문구 항목은 NOT_RECEIVED', () => {
    const found = view.sealItems.some(i =>
      (i.sealItem.includes('명시') || i.sealItem.includes('승인 문구')) && i.status === 'NOT_RECEIVED'
    );
    assert.ok(found, '명시 승인 문구 NOT_RECEIVED 항목이 없습니다.');
  });

  it('실제 Token 발급 항목은 LOCKED_UNTIL_USER_APPROVAL', () => {
    const found = view.sealItems.some(i =>
      i.sealItem.includes('Token 발급') && i.status === 'LOCKED_UNTIL_USER_APPROVAL'
    );
    assert.ok(found, '실제 Token 발급 LOCKED_UNTIL_USER_APPROVAL 항목이 없습니다.');
  });

  it('Token 값 표시 항목은 FORBIDDEN', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('Token 값') && i.status === 'FORBIDDEN'), 'Token 값 FORBIDDEN 없음');
  });

  it('인증키 값 표시 항목은 FORBIDDEN', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('인증키') && i.status === 'FORBIDDEN'), '인증키 FORBIDDEN 없음');
  });

  it('Secret 로그 출력 항목은 FORBIDDEN', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('Secret') && i.status === 'FORBIDDEN'), 'Secret FORBIDDEN 없음');
  });

  it('Token 저장 항목은 LOCKED', () => {
    assert.ok(view.sealItems.some(i => i.sealItem === 'Token 저장' && i.status === 'LOCKED'), 'Token 저장 LOCKED 없음');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('Naver API') && i.status === 'LOCKED'), 'Naver API LOCKED 없음');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('상품') && i.status === 'LOCKED'), '상품 API LOCKED 없음');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    assert.ok(view.sealItems.some(i => (i.sealItem.includes('가격') || i.sealItem.includes('재고')) && i.status === 'LOCKED'), '가격·재고 LOCKED 없음');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    assert.ok(view.sealItems.some(i => (i.sealItem.includes('Worker') || i.sealItem.includes('Queue') || i.sealItem.includes('Adapter')) && i.status === 'LOCKED'), 'Worker/Queue/Adapter LOCKED 없음');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('POST') && i.status === 'NOT_CONNECTED'), 'POST NOT_CONNECTED 없음');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    assert.ok(view.sealItems.some(i => i.sealItem.includes('버튼') && i.status === 'NOT_PRESENT'), '버튼 NOT_PRESENT 없음');
  });

  it('현재 Task 상태 항목은 READ_ONLY_INFO', () => {
    assert.ok(view.sealItems.some(i => i.status === 'READ_ONLY_INFO'), 'READ_ONLY_INFO 없음');
  });

  it('sealItems에 권장 상태값이 모두 포함됨', () => {
    const statuses = view.sealItems.map(i => i.status);
    const requiredStatuses = [
      'APPROVAL_REQUEST_PACKET_CONFIRMED',
      'TARGET_MET',
      'FINAL_SAFETY_GATE_CONFIRMED',
      'PENDING_USER_APPROVAL',
      'NOT_RECEIVED',
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

  it('사용자 승인 문구는 Task 263 기준으로 안내하되 승인으로 처리하지 않음', () => {
    assert.ok(typeof view.userApprovalScriptForNextTask === 'string' && view.userApprovalScriptForNextTask.includes('Task 263'), 'Task 263 승인 문구가 없습니다.');
    assert.strictEqual(view.isUserFinalApprovalGrantedForTokenIssuance, false, '승인으로 처리되어 있습니다.');
    assert.strictEqual(view.isUserFinalApprovalPhraseReceived, false, '승인 문구 수신으로 처리되어 있습니다.');
    assert.strictEqual(view.isApprovalSubmitted, false, '승인 제출로 처리되어 있습니다.');
  });

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const jsonStr = JSON.stringify(view);
    assert.ok(!jsonStr.includes('Bearer '), 'Bearer 토큰이 포함되어 있습니다.');
    assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), '실제 base64 인코딩 값이 포함된 것으로 의심됩니다.');
  });
});
