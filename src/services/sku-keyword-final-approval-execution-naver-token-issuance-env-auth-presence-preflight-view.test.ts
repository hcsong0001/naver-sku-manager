import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceEnvAuthPresencePreflightView } from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-preflight-view.service';

const mockJob = {};

describe('Task 244 Naver Token Issuance Env Auth Presence Preflight View', () => {
  const view = buildNaverTokenIssuanceEnvAuthPresencePreflightView(mockJob);

  it('status === ENV_AUTH_PRESENCE_PREFLIGHT_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_PRESENCE_PREFLIGHT_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isEnvAuthPresencePreflightReady === true', () => {
    assert.strictEqual(view.isEnvAuthPresencePreflightReady, true);
  });

  it('isTokenIssuanceEntryApprovalPacketReady === true', () => {
    assert.strictEqual(view.isTokenIssuanceEntryApprovalPacketReady, true);
  });

  it('isUserApprovalStillRequired === true', () => {
    assert.strictEqual(view.isUserApprovalStillRequired, true);
  });

  it('isNextStepRequiresUserApproval === true', () => {
    assert.strictEqual(view.isNextStepRequiresUserApproval, true);
  });

  it('isEnvPresenceCheckPlanned === true', () => {
    assert.strictEqual(view.isEnvPresenceCheckPlanned, true);
  });

  it('isAuthKeyPresenceCheckPlanned === true', () => {
    assert.strictEqual(view.isAuthKeyPresenceCheckPlanned, true);
  });

  it('isEnvPresenceCheckExecuted === false', () => {
    assert.strictEqual(view.isEnvPresenceCheckExecuted, false);
  });

  it('isAuthKeyPresenceCheckExecuted === false', () => {
    assert.strictEqual(view.isAuthKeyPresenceCheckExecuted, false);
  });

  it('isEnvValueDisplayed === false', () => {
    assert.strictEqual(view.isEnvValueDisplayed, false);
  });

  it('isAuthKeyValueDisplayed === false', () => {
    assert.strictEqual(view.isAuthKeyValueDisplayed, false);
  });

  it('isTokenIssuanceAllowed === false', () => {
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
  });

  it('isTokenIssued === false', () => {
    assert.strictEqual(view.isTokenIssued, false);
  });

  it('isTokenStored === false', () => {
    assert.strictEqual(view.isTokenStored, false);
  });

  it('isActualApprovalGranted === false', () => {
    assert.strictEqual(view.isActualApprovalGranted, false);
  });

  it('isApprovalSubmitted === false', () => {
    assert.strictEqual(view.isApprovalSubmitted, false);
  });

  it('isExecutionAllowed === false', () => {
    assert.strictEqual(view.isExecutionAllowed, false);
  });

  it('preflightItems에 13개 이상 항목이 있음', () => {
    assert.ok(view.preflightItems.length >= 13);
  });

  it('preflightItems에 ENTRY_PACKET_CONFIRMED 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'ENTRY_PACKET_CONFIRMED');
    assert.ok(found, 'ENTRY_PACKET_CONFIRMED 상태가 preflightItems에 없습니다.');
  });

  it('preflightItems에 PREFLIGHT_REQUIRED 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'PREFLIGHT_REQUIRED');
    assert.ok(found, 'PREFLIGHT_REQUIRED 상태가 preflightItems에 없습니다.');
  });

  it('preflightItems에 FORBIDDEN 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'FORBIDDEN');
    assert.ok(found, 'FORBIDDEN 상태가 preflightItems에 없습니다.');
  });

  it('preflightItems에 LOCKED 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 preflightItems에 없습니다.');
  });

  it('preflightItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 preflightItems에 없습니다.');
  });

  it('preflightItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 preflightItems에 없습니다.');
  });

  it('preflightItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.preflightItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 preflightItems에 없습니다.');
  });

  it('".env" 존재 여부 확인 항목은 PREFLIGHT_REQUIRED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('.env') || i.preflightItem.includes('env')) && i.status === 'PREFLIGHT_REQUIRED'
    );
    assert.ok(found, '".env" 존재 여부 PREFLIGHT_REQUIRED 항목이 없습니다.');
  });

  it('인증키 존재 여부 확인 항목은 PREFLIGHT_REQUIRED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('인증키') || i.preflightItem.includes('auth')) && i.status === 'PREFLIGHT_REQUIRED'
    );
    assert.ok(found, '인증키 존재 여부 PREFLIGHT_REQUIRED 항목이 없습니다.');
  });

  it('인증키 값 표시 항목은 FORBIDDEN', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('값') || i.preflightItem.includes('표시') || i.preflightItem.includes('Value')) && i.status === 'FORBIDDEN'
    );
    assert.ok(found, '인증키 값 표시 FORBIDDEN 항목이 없습니다.');
  });

  it('Token 발급 항목은 LOCKED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('Token 발급') || i.preflightItem.includes('token')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 발급 LOCKED 항목이 없습니다.');
  });

  it('Token 저장 항목은 LOCKED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('Token 저장') || i.preflightItem.includes('저장')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 저장 LOCKED 항목이 없습니다.');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('Naver API') || i.preflightItem.includes('API 호출')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Naver API 호출 LOCKED 항목이 없습니다.');
  });

  it('상품 조회/수정 API 항목은 LOCKED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('상품') || i.preflightItem.includes('API')) && i.status === 'LOCKED'
    );
    assert.ok(found, '상품 조회/수정 API LOCKED 항목이 없습니다.');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('가격') || i.preflightItem.includes('재고')) && i.status === 'LOCKED'
    );
    assert.ok(found, '가격·재고 변경 LOCKED 항목이 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('Worker') || i.preflightItem.includes('Queue') || i.preflightItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 없습니다.');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('POST') || i.preflightItem.includes('API 연결')) && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 없습니다.');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    const found = view.preflightItems.some(i =>
      (i.preflightItem.includes('버튼') || i.preflightItem.includes('Button')) && i.status === 'NOT_PRESENT'
    );
    assert.ok(found, '승인/실행 버튼 NOT_PRESENT 항목이 없습니다.');
  });

  it('hasEnvFileAccess === false, hasAuthKeyAccess === false', () => {
    assert.strictEqual(view.hasEnvFileAccess, false);
    assert.strictEqual(view.hasAuthKeyAccess, false);
  });

  it('모든 실행 관련 플래그가 false', () => {
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
});
