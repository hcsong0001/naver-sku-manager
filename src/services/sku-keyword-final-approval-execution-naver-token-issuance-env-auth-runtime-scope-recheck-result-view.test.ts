import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView,
  checkEnvKeyPresence,
  REQUIRED_NAVER_TOKEN_ENV_KEYS,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-runtime-scope-recheck-result-view.service';

const mockJob = {};
const mockEnvAllPresent: Record<string, string | undefined> = {
  NAVER_COMMERCE_CLIENT_ID: 'mock-client-id-value',
  NAVER_COMMERCE_CLIENT_SECRET: 'mock-client-secret-value',
  NAVER_COMMERCE_API_BASE_URL: 'https://mock.api.example.com/v1',
};

describe('Task 259 Naver Token Issuance Env Auth Runtime Scope Recheck Result View (all present)', () => {
  const view = buildNaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView(mockJob, mockEnvAllPresent);

  it('status === ENV_AUTH_RUNTIME_SCOPE_RECHECK_RESULT_READY', () => {
    assert.strictEqual(view.status, 'ENV_AUTH_RUNTIME_SCOPE_RECHECK_RESULT_READY');
  });

  it('isBatchJobResultDisplayOnly === true', () => {
    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
  });

  it('isEnvAuthRuntimeScopeRecheckResultReady === true', () => {
    assert.strictEqual(view.isEnvAuthRuntimeScopeRecheckResultReady, true);
  });

  it('isRuntimeScopeCorrectionCompletionWaitingReady === true', () => {
    assert.strictEqual(view.isRuntimeScopeCorrectionCompletionWaitingReady, true);
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

  it('isUserRuntimeScopeCorrectionCompletionReported === true', () => {
    assert.strictEqual(view.isUserRuntimeScopeCorrectionCompletionReported, true);
  });

  it('isEnvPresenceRecheckExecuted === true', () => {
    assert.strictEqual(view.isEnvPresenceRecheckExecuted, true);
  });

  it('isAuthKeyPresenceRecheckExecuted === true', () => {
    assert.strictEqual(view.isAuthKeyPresenceRecheckExecuted, true);
  });

  it('isReadyForTokenIssuanceGate === true', () => {
    assert.strictEqual(view.isReadyForTokenIssuanceGate, true);
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

  it('isTokenIssuanceAllowed === false', () => {
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
  });

  it('isTokenIssued === false', () => {
    assert.strictEqual(view.isTokenIssued, false);
  });

  it('isTokenStored === false', () => {
    assert.strictEqual(view.isTokenStored, false);
  });

  it('recheckItems에 19개 이상 항목이 있음', () => {
    assert.ok(view.recheckItems.length >= 19);
  });

  it('recheckItems에 CORRECTION_WAITING_CONFIRMED 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'CORRECTION_WAITING_CONFIRMED'), 'CORRECTION_WAITING_CONFIRMED 없음');
  });

  it('recheckItems에 USER_CORRECTION_REPORTED 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'USER_CORRECTION_REPORTED'), 'USER_CORRECTION_REPORTED 없음');
  });

  it('recheckItems에 RECHECK_EXECUTED_NON_EXPOSURE 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'RECHECK_EXECUTED_NON_EXPOSURE'), 'RECHECK_EXECUTED_NON_EXPOSURE 없음');
  });

  it('현재 재확인 결과 항목은 TARGET_MET', () => {
    const found = view.recheckItems.some(i =>
      (i.recheckItem.includes('재확인 결과') || i.recheckItem.includes('현재')) && i.status === 'TARGET_MET'
    );
    assert.ok(found, '현재 재확인 결과 TARGET_MET 항목이 없습니다.');
  });

  it('recheckItems에 NOT_DISPLAYED 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'NOT_DISPLAYED'), 'NOT_DISPLAYED 없음');
  });

  it('recheckItems에 NOT_LOGGED 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'NOT_LOGGED'), 'NOT_LOGGED 없음');
  });

  it('recheckItems에 NOT_ACCESSED 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'NOT_ACCESSED'), 'NOT_ACCESSED 없음');
  });

  it('recheckItems에 NOT_MODIFIED 상태가 포함됨', () => {
    assert.ok(view.recheckItems.some(i => i.status === 'NOT_MODIFIED'), 'NOT_MODIFIED 없음');
  });

  it('Token 발급 가능성 항목은 READY_FOR_TOKEN_ISSUANCE_GATE', () => {
    const found = view.recheckItems.some(i =>
      (i.recheckItem.includes('Token 발급 가능') || i.recheckItem.includes('발급 가능성')) && i.status === 'READY_FOR_TOKEN_ISSUANCE_GATE'
    );
    assert.ok(found, 'Token 발급 가능성 READY_FOR_TOKEN_ISSUANCE_GATE 항목이 없습니다.');
  });

  it('Token 발급 항목은 LOCKED', () => {
    const found = view.recheckItems.some(i =>
      i.recheckItem === 'Token 발급' && i.status === 'LOCKED'
    );
    assert.ok(found, 'Token 발급 LOCKED 항목이 없습니다.');
  });

  it('Naver API 호출 항목은 LOCKED', () => {
    assert.ok(view.recheckItems.some(i => i.recheckItem.includes('Naver API') && i.status === 'LOCKED'), 'Naver API LOCKED 없음');
  });

  it('가격·재고 변경 항목은 LOCKED', () => {
    assert.ok(view.recheckItems.some(i => (i.recheckItem.includes('가격') || i.recheckItem.includes('재고')) && i.status === 'LOCKED'), '가격·재고 LOCKED 없음');
  });

  it('Worker / Queue / Adapter 항목은 LOCKED', () => {
    assert.ok(view.recheckItems.some(i => (i.recheckItem.includes('Worker') || i.recheckItem.includes('Queue') || i.recheckItem.includes('Adapter')) && i.status === 'LOCKED'), 'Worker/Queue/Adapter LOCKED 없음');
  });

  it('POST API 연결 항목은 NOT_CONNECTED', () => {
    assert.ok(view.recheckItems.some(i => i.recheckItem.includes('POST') && i.status === 'NOT_CONNECTED'), 'POST NOT_CONNECTED 없음');
  });

  it('승인/실행 버튼 항목은 NOT_PRESENT', () => {
    assert.ok(view.recheckItems.some(i => i.recheckItem.includes('버튼') && i.status === 'NOT_PRESENT'), '버튼 NOT_PRESENT 없음');
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

  it('결과 객체에 실제 secret value가 포함되지 않음', () => {
    const jsonStr = JSON.stringify(view);
    assert.ok(!jsonStr.includes('mock-client-id-value'), '실제 CLIENT_ID 값이 결과에 포함되어 있습니다.');
    assert.ok(!jsonStr.includes('mock-client-secret-value'), '실제 CLIENT_SECRET 값이 결과에 포함되어 있습니다.');
    assert.ok(!jsonStr.includes('mock.api.example.com'), '실제 API_BASE_URL 값이 결과에 포함되어 있습니다.');
  });

  it('JSON.stringify 결과에 실제 secret value가 포함되지 않음', () => {
    const jsonStr = JSON.stringify(view);
    assert.ok(!jsonStr.includes('Bearer '), 'Bearer 토큰이 포함되어 있습니다.');
    assert.ok(!jsonStr.match(/:"[A-Za-z0-9+/]{20,}={1,2}"/), '실제 base64 인코딩 값이 포함된 것으로 의심됩니다.');
  });

  it('envKeyPresenceItems에 key와 presence만 포함됨 (value 없음)', () => {
    for (const item of view.envKeyPresenceItems) {
      assert.ok('key' in item, 'key 필드가 없습니다.');
      assert.ok('presence' in item, 'presence 필드가 없습니다.');
      assert.ok(!('value' in item), 'value 필드가 포함되어 있습니다.');
    }
  });

  it('envKeyPresenceItems의 모든 presence는 PRESENT 또는 MISSING만 허용', () => {
    for (const item of view.envKeyPresenceItems) {
      assert.ok(item.presence === 'PRESENT' || item.presence === 'MISSING', `잘못된 presence 값: ${item.presence}`);
    }
  });

  it('envKeyPresenceItems에 3개 키가 모두 PRESENT', () => {
    const presentCount = view.envKeyPresenceItems.filter(i => i.presence === 'PRESENT').length;
    assert.strictEqual(presentCount, 3);
  });
});

describe('Task 259 - Presence Check (checkEnvKeyPresence)', () => {
  it('mock env에 값이 있으면 PRESENT', () => {
    const result = checkEnvKeyPresence(['NAVER_COMMERCE_CLIENT_ID'], { NAVER_COMMERCE_CLIENT_ID: 'some-value' });
    assert.strictEqual(result[0].presence, 'PRESENT');
  });

  it('mock env에 빈 문자열이면 MISSING', () => {
    const result = checkEnvKeyPresence(['NAVER_COMMERCE_CLIENT_ID'], { NAVER_COMMERCE_CLIENT_ID: '' });
    assert.strictEqual(result[0].presence, 'MISSING');
  });

  it('mock env에 key가 없으면 MISSING', () => {
    const result = checkEnvKeyPresence(['NAVER_COMMERCE_CLIENT_ID'], {});
    assert.strictEqual(result[0].presence, 'MISSING');
  });

  it('3개 키가 모두 있으면 PRESENT 3 / MISSING 0', () => {
    const mockEnv = {
      NAVER_COMMERCE_CLIENT_ID: 'mock-id',
      NAVER_COMMERCE_CLIENT_SECRET: 'mock-secret',
      NAVER_COMMERCE_API_BASE_URL: 'https://mock.example.com',
    };
    const view = buildNaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView({}, mockEnv);
    assert.strictEqual(view.presencePresentCount, 3);
    assert.strictEqual(view.presenceMissingCount, 0);
    assert.strictEqual(view.isTargetPresenceResultMet, true);
  });

  it('0개 키만 있으면 PRESENT 0 / MISSING 3', () => {
    const view = buildNaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView({}, {});
    assert.strictEqual(view.presencePresentCount, 0);
    assert.strictEqual(view.presenceMissingCount, 3);
    assert.strictEqual(view.isTargetPresenceResultMet, false);
    assert.strictEqual(view.isReadyForTokenIssuanceGate, false);
  });

  it('결과 객체에 실제 value가 포함되지 않음', () => {
    const secretValue = 'super-secret-unique-test-value-xyz-9999';
    const mockEnv = {
      NAVER_COMMERCE_CLIENT_ID: secretValue,
      NAVER_COMMERCE_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: secretValue,
    };
    const view = buildNaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView({}, mockEnv);
    const jsonStr = JSON.stringify(view);
    assert.ok(!jsonStr.includes(secretValue), '실제 secret 값이 결과 객체에 포함되어 있습니다.');
  });

  it('공백만 있는 값은 MISSING', () => {
    const result = checkEnvKeyPresence(['NAVER_COMMERCE_CLIENT_ID'], { NAVER_COMMERCE_CLIENT_ID: '   ' });
    assert.strictEqual(result[0].presence, 'MISSING');
  });

  it('checkEnvKeyPresence 결과에 value 필드가 없음', () => {
    const result = checkEnvKeyPresence(['NAVER_COMMERCE_CLIENT_ID'], { NAVER_COMMERCE_CLIENT_ID: 'test-value' });
    assert.ok(!('value' in result[0]), 'value 필드가 포함되어 있습니다.');
  });

  it('REQUIRED_NAVER_TOKEN_ENV_KEYS는 3개', () => {
    assert.strictEqual(REQUIRED_NAVER_TOKEN_ENV_KEYS.length, 3);
    assert.ok(REQUIRED_NAVER_TOKEN_ENV_KEYS.includes('NAVER_COMMERCE_CLIENT_ID'));
    assert.ok(REQUIRED_NAVER_TOKEN_ENV_KEYS.includes('NAVER_COMMERCE_CLIENT_SECRET'));
    assert.ok(REQUIRED_NAVER_TOKEN_ENV_KEYS.includes('NAVER_COMMERCE_API_BASE_URL'));
  });
});
