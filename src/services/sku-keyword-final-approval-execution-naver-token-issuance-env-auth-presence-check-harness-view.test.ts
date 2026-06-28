import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceEnvAuthPresenceCheckHarnessView } from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-harness-view.service';

const mockJob = {};

describe('Task 245 Naver Token Issuance Env Auth Presence Check Harness View', () => {
  const view = buildNaverTokenIssuanceEnvAuthPresenceCheckHarnessView(mockJob);

  it('status === ENV_AUTH_PRESENCE_CHECK_HARNESS_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_PRESENCE_CHECK_HARNESS_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isEnvAuthPresenceCheckHarnessReady === true', () => {
    assert.strictEqual(view.isEnvAuthPresenceCheckHarnessReady, true);
  });

  it('isEnvAuthPresencePreflightReady === true', () => {
    assert.strictEqual(view.isEnvAuthPresencePreflightReady, true);
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

  it('isSecretLogged === false', () => {
    assert.strictEqual(view.isSecretLogged, false);
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

  it('harnessItems에 15개 이상 항목이 있음', () => {
    assert.ok(view.harnessItems.length >= 15);
  });

  it('harnessItems에 PREFLIGHT_CONFIRMED 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'PREFLIGHT_CONFIRMED');
    assert.ok(found, 'PREFLIGHT_CONFIRMED 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 HARNESS_READY 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'HARNESS_READY');
    assert.ok(found, 'HARNESS_READY 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 NOT_EXECUTED 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'NOT_EXECUTED');
    assert.ok(found, 'NOT_EXECUTED 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 FORBIDDEN 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'FORBIDDEN');
    assert.ok(found, 'FORBIDDEN 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 LOCKED 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'LOCKED');
    assert.ok(found, 'LOCKED 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 NOT_CONNECTED 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'NOT_CONNECTED');
    assert.ok(found, 'NOT_CONNECTED 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 NOT_PRESENT 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'NOT_PRESENT');
    assert.ok(found, 'NOT_PRESENT 상태가 harnessItems에 없습니다.');
  });

  it('harnessItems에 READ_ONLY_INFO 상태가 포함됨', () => {
    const found = view.harnessItems.some(i => i.status === 'READ_ONLY_INFO');
    assert.ok(found, 'READ_ONLY_INFO 상태가 harnessItems에 없습니다.');
  });

  it('".env" 존재 여부 확인 실행 항목은 NOT_EXECUTED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('.env') || i.harnessItem.includes('env')) && i.status === 'NOT_EXECUTED'
    );
    assert.ok(found, '".env" 존재 여부 NOT_EXECUTED 항목이 없습니다.');
  });

  it('인증정보 존재 여부 확인 실행 항목은 NOT_EXECUTED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('인증') || i.harnessItem.includes('auth')) && i.status === 'NOT_EXECUTED'
    );
    assert.ok(found, '인증정보 존재 여부 NOT_EXECUTED 항목이 없습니다.');
  });

  it('인증키 값 표시 항목은 FORBIDDEN', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('값') || i.harnessItem.includes('표시') || i.harnessItem.includes('Key')) && i.status === 'FORBIDDEN'
    );
    assert.ok(found, '인증키 값 표시 FORBIDDEN 항목이 없습니다.');
  });

  it('Secret 로그 출력 항목은 FORBIDDEN', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('Secret') || i.harnessItem.includes('로그')) && i.status === 'FORBIDDEN'
    );
    assert.ok(found, 'Secret 로그 출력 FORBIDDEN 항목이 없습니다.');
  });

  it('Token 발급 항목은 LOCKED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('Token 발급') || i.harnessItem.includes('Token')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 발급 LOCKED 항목이 없습니다.');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('Naver API') || i.harnessItem.includes('API 호출')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Naver API 호출 LOCKED 항목이 없습니다.');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('가격') || i.harnessItem.includes('재고')) && i.status === 'LOCKED'
    );
    assert.ok(found, '가격·재고 변경 LOCKED 항목이 없습니다.');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('Worker') || i.harnessItem.includes('Queue') || i.harnessItem.includes('Adapter')) && i.status === 'LOCKED'
    );
    assert.ok(found, 'Worker / Queue / Adapter LOCKED 항목이 없습니다.');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('POST') || i.harnessItem.includes('API 연결')) && i.status === 'NOT_CONNECTED'
    );
    assert.ok(found, 'POST API NOT_CONNECTED 항목이 없습니다.');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    const found = view.harnessItems.some(i =>
      (i.harnessItem.includes('버튼') || i.harnessItem.includes('Button')) && i.status === 'NOT_PRESENT'
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
