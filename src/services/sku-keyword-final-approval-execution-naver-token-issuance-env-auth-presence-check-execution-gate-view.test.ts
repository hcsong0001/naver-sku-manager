import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverTokenIssuanceEnvAuthPresenceCheckExecutionGateView } from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-execution-gate-view.service';

const mockJob = {};

describe('Task 246 Naver Token Issuance Env Auth Presence Check Execution Gate View', () => {
  const view = buildNaverTokenIssuanceEnvAuthPresenceCheckExecutionGateView(mockJob);

  it('status === ENV_AUTH_PRESENCE_CHECK_EXECUTION_GATE_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_PRESENCE_CHECK_EXECUTION_GATE_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isEnvAuthPresenceCheckExecutionGateReady === true', () => {
    assert.strictEqual(view.isEnvAuthPresenceCheckExecutionGateReady, true);
  });

  it('isEnvAuthPresenceCheckHarnessReady === true', () => {
    assert.strictEqual(view.isEnvAuthPresenceCheckHarnessReady, true);
  });

  it('isUserApprovalStillRequired === true', () => {
    assert.strictEqual(view.isUserApprovalStillRequired, true);
  });

  it('isNextStepRequiresUserApproval === true', () => {
    assert.strictEqual(view.isNextStepRequiresUserApproval, true);
  });

  it('isEnvPresenceCheckReady === true', () => {
    assert.strictEqual(view.isEnvPresenceCheckReady, true);
  });

  it('isAuthKeyPresenceCheckReady === true', () => {
    assert.strictEqual(view.isAuthKeyPresenceCheckReady, true);
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

  it('gateItems에 모든 권장 상태값이 포함됨', () => {
    const statuses = new Set(view.gateItems.map(item => item.status));
    assert.ok(statuses.has('HARNESS_CONFIRMED'));
    assert.ok(statuses.has('PENDING_USER_APPROVAL'));
    assert.ok(statuses.has('READY_BUT_NOT_EXECUTED'));
    assert.ok(statuses.has('FORBIDDEN'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('".env"/인증정보 확인 항목은 READY_BUT_NOT_EXECUTED', () => {
    const envItem = view.gateItems.find(item => item.gateItem.includes('.env'));
    const authItem = view.gateItems.find(item => item.gateItem.includes('인증정보'));
    assert.ok(envItem);
    assert.ok(authItem);
    assert.strictEqual(envItem?.status, 'READY_BUT_NOT_EXECUTED');
    assert.strictEqual(authItem?.status, 'READY_BUT_NOT_EXECUTED');
  });

  it('인증키 값 표시 / Secret 로그 출력은 FORBIDDEN', () => {
    const authValueItem = view.gateItems.find(item => item.gateItem.includes('인증키 값 표시'));
    const secretLogItem = view.gateItems.find(item => item.gateItem.includes('Secret 로그 출력'));
    assert.ok(authValueItem);
    assert.ok(secretLogItem);
    assert.strictEqual(authValueItem?.status, 'FORBIDDEN');
    assert.strictEqual(secretLogItem?.status, 'FORBIDDEN');
  });

  it('Token / Naver API / 상품 API / 가격·재고 / Worker / Queue / Adapter는 LOCKED', () => {
    const lockedTargets = [
      'Token 발급',
      'Token 저장',
      'Naver API 호출',
      '상품 조회/수정 API',
      '가격·재고 변경',
      'Worker / Queue / Adapter',
    ];

    for (const target of lockedTargets) {
      const found = view.gateItems.find(item => item.gateItem === target);
      assert.ok(found, `${target} 항목이 없습니다.`);
      assert.strictEqual(found?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED', () => {
    const found = view.gateItems.find(item => item.gateItem === 'POST API 연결');
    assert.ok(found);
    assert.strictEqual(found?.status, 'NOT_CONNECTED');
  });

  it('승인/실행 버튼은 NOT_PRESENT', () => {
    const found = view.gateItems.find(item => item.gateItem === '승인/실행 버튼');
    assert.ok(found);
    assert.strictEqual(found?.status, 'NOT_PRESENT');
  });

  it('".env" / 인증키 접근 플래그 false', () => {
    assert.strictEqual(view.hasEnvFileAccess, false);
    assert.strictEqual(view.hasAuthKeyAccess, false);
  });

  it('모든 실행 관련 플래그 false', () => {
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
});
