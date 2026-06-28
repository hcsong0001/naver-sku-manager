import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNaverTokenIssuanceEnvAuthPresenceCheckResultView,
  buildNaverTokenIssuanceEnvAuthPresenceResults,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';

const mockJob = {};

describe('Task 247 Naver Token Issuance Env Auth Presence Check Result View', () => {
  const originalConsoleLog = console.log;
  let capturedLogs: string[];

  beforeEach(() => {
    capturedLogs = [];
    console.log = (...args: unknown[]) => {
      capturedLogs.push(args.map((arg) => String(arg)).join(' '));
    };
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it('status === ENV_AUTH_PRESENCE_CHECK_RESULT_READY', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    assert.strictEqual(view.status, 'ENV_AUTH_PRESENCE_CHECK_RESULT_READY');
  });

  it('필수 플래그와 실행 차단 플래그가 명세와 일치함', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});

    assert.strictEqual(view.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(view.isEnvAuthPresenceCheckResultReady, true);
    assert.strictEqual(view.isEnvAuthPresenceCheckExecutionGateReady, true);
    assert.strictEqual(view.isEnvAuthPresenceCheckHarnessReady, true);
    assert.strictEqual(view.isEnvPresenceCheckReady, true);
    assert.strictEqual(view.isAuthKeyPresenceCheckReady, true);
    assert.strictEqual(view.isEnvPresenceCheckExecuted, true);
    assert.strictEqual(view.isAuthKeyPresenceCheckExecuted, true);
    assert.strictEqual(view.isEnvFileDirectlyAccessed, false);
    assert.strictEqual(view.isEnvValueDisplayed, false);
    assert.strictEqual(view.isAuthKeyValueDisplayed, false);
    assert.strictEqual(view.isSecretLogged, false);
    assert.strictEqual(view.hasEnvFileAccess, false);
    assert.strictEqual(view.hasAuthKeyAccess, false);
    assert.strictEqual(view.isTokenIssuanceAllowed, false);
    assert.strictEqual(view.isTokenIssued, false);
    assert.strictEqual(view.isTokenStored, false);
  });

  it('resultItems에 모든 권장 상태값 포함', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const statuses = new Set(view.resultItems.map((item) => item.status));

    assert.ok(statuses.has('EXECUTION_GATE_CONFIRMED'));
    assert.ok(statuses.has('CHECK_EXECUTED_NON_EXPOSURE'));
    assert.ok(statuses.has('NOT_ACCESSED'));
    assert.ok(statuses.has('NOT_DISPLAYED'));
    assert.ok(statuses.has('NOT_LOGGED'));
    assert.ok(statuses.has('PRESENT_OR_MISSING_ONLY'));
    assert.ok(statuses.has('LOCKED'));
    assert.ok(statuses.has('NOT_CONNECTED'));
    assert.ok(statuses.has('NOT_PRESENT'));
    assert.ok(statuses.has('READ_ONLY_INFO'));
  });

  it('".env" 파일 직접 열람 항목은 NOT_ACCESSED', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const item = view.resultItems.find((entry) => entry.resultItem.includes('.env'));
    assert.ok(item);
    assert.strictEqual(item?.status, 'NOT_ACCESSED');
  });

  it('환경변수/인증키 값 표시는 NOT_DISPLAYED', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const envValueItem = view.resultItems.find((entry) => entry.resultItem === '환경변수 값 표시');
    const authValueItem = view.resultItems.find((entry) => entry.resultItem === '인증키 값 표시');
    assert.ok(envValueItem);
    assert.ok(authValueItem);
    assert.strictEqual(envValueItem?.status, 'NOT_DISPLAYED');
    assert.strictEqual(authValueItem?.status, 'NOT_DISPLAYED');
  });

  it('Secret 로그 출력은 NOT_LOGGED', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const item = view.resultItems.find((entry) => entry.resultItem === 'Secret 로그 출력');
    assert.ok(item);
    assert.strictEqual(item?.status, 'NOT_LOGGED');
  });

  it('필수 Env 존재 결과 항목은 PRESENT_OR_MISSING_ONLY', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const item = view.resultItems.find((entry) => entry.resultItem === '필수 Env 존재 결과');
    assert.ok(item);
    assert.strictEqual(item?.status, 'PRESENT_OR_MISSING_ONLY');
  });

  it('Token / Naver API / 상품 API / 가격·재고 / Worker / Queue / Adapter는 LOCKED', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const lockedTargets = [
      'Token 발급',
      'Token 저장',
      'Naver API 호출',
      '상품 조회/수정 API',
      '가격·재고 변경',
      'Worker / Queue / Adapter',
    ];

    for (const target of lockedTargets) {
      const item = view.resultItems.find((entry) => entry.resultItem === target);
      assert.ok(item, `${target} 항목이 없습니다.`);
      assert.strictEqual(item?.status, 'LOCKED');
    }
  });

  it('POST API는 NOT_CONNECTED', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const item = view.resultItems.find((entry) => entry.resultItem === 'POST API 연결');
    assert.ok(item);
    assert.strictEqual(item?.status, 'NOT_CONNECTED');
  });

  it('승인/실행 버튼은 NOT_PRESENT', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});
    const item = view.resultItems.find((entry) => entry.resultItem === '승인/실행 버튼');
    assert.ok(item);
    assert.strictEqual(item?.status, 'NOT_PRESENT');
  });

  it('모든 실행 관련 플래그 false', () => {
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {});

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

  it('mock env에 값이 있으면 PRESENT', () => {
    const results = buildNaverTokenIssuanceEnvAuthPresenceResults({
      NAVER_API_CLIENT_ID: 'client-id-value',
      NAVER_API_CLIENT_SECRET: 'client-secret-value',
      NAVER_COMMERCE_API_BASE_URL: 'https://example.test',
    });

    assert.strictEqual(results.every((item) => item.status === 'PRESENT'), true);
  });

  it('mock env에 빈 문자열이면 MISSING', () => {
    const results = buildNaverTokenIssuanceEnvAuthPresenceResults({
      NAVER_API_CLIENT_ID: '',
      NAVER_API_CLIENT_SECRET: '   ',
      NAVER_COMMERCE_API_BASE_URL: '',
    });

    assert.strictEqual(results.every((item) => item.status === 'MISSING'), true);
  });

  it('mock env에 key가 없으면 MISSING', () => {
    const results = buildNaverTokenIssuanceEnvAuthPresenceResults({});
    assert.strictEqual(results.every((item) => item.status === 'MISSING'), true);
  });

  it('결과 객체에 실제 value가 포함되지 않음', () => {
    const secretValue = 'super-secret-value';
    const clientIdValue = 'super-client-id';
    const baseUrlValue = 'https://sensitive.example.test';
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {
      NAVER_API_CLIENT_ID: clientIdValue,
      NAVER_API_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: baseUrlValue,
    });

    assert.strictEqual(JSON.stringify(view).includes(secretValue), false);
    assert.strictEqual(JSON.stringify(view).includes(clientIdValue), false);
    assert.strictEqual(JSON.stringify(view).includes(baseUrlValue), false);
  });

  it('결과 객체를 JSON.stringify 해도 secret 값이 포함되지 않음', () => {
    const secretValue = 'another-secret-value';
    const view = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {
      NAVER_API_CLIENT_ID: 'id',
      NAVER_API_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: 'https://example.test',
    });

    const serialized = JSON.stringify(view);
    assert.strictEqual(serialized.includes(secretValue), false);
  });

  it('console output에 secret 값이 포함되지 않음', () => {
    const secretValue = 'console-secret-value';
    buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(mockJob, {
      NAVER_API_CLIENT_ID: 'id',
      NAVER_API_CLIENT_SECRET: secretValue,
      NAVER_COMMERCE_API_BASE_URL: 'https://example.test',
    });

    const combinedLogs = capturedLogs.join('\n');
    assert.strictEqual(combinedLogs.includes(secretValue), false);
  });
});
