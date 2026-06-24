import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';

describe('NaverApiTokenFirstTestPreflightNoNetworkHarness', () => {
  const validSafetyBoundary: NaverApiTokenFirstTestSafetyBoundaryResult = {
    ok: true,
    status: 'READY_BUT_DISABLED',
    readyForExplicitTokenTestApproval: true,
    allowed: false,
    resultCode: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE',
    resultMessage: 'ready',
    tokenTestApprovalPresent: true,
    tokenTestApprovalComplete: true,
    allPreconditionsPassed: true,
    tokenRequestAllowed: false,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    tokenIssued: false,
    tokenStored: false,
    authorizationHeaderCreated: false,
    endpointResolved: false,
    endpointCalled: false,
    httpRequestCreated: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false,
    secretVisible: false,
    tokenVisible: false,
    endpointVisible: false,
    sanitized: true,
    checklistItems: [],
    blockingReasons: [],
    warnings: [],
    needsReviewReasons: [],
    maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE',
  };

  const validExecutor: NaverApiTokenFirstTestExecutorDisabledResult = {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED',
    executorArmed: false,
    executorEnabled: false,
    tokenRequestAllowed: false,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    clientSecretUsed: false,
    clientSecretSignCreated: false,
    tokenIssued: false,
    tokenStored: false,
    authorizationHeaderCreated: false,
    endpointResolved: false,
    endpointCalled: false,
    httpRequestCreated: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false,
    reasons: [],
  };

  const validFinalApproval: NaverApiTokenFirstTestFinalApprovalAuditResult = {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED',
    recordPlan: {
      approvalRecorded: true,
      approvalScope: 'FIRST_TOKEN_TEST_ONLY',
      approvedByRole: 'USER',
      acknowledgementVersion: '1',
      acknowledgementCount: 14,
      approvedAcknowledgementKeys: [],
      safetyBoundaryStatus: 'READY_BUT_DISABLED',
      executorStatus: 'READY_BUT_NOT_ARMED',
      tokenRequestAllowed: false,
      executorArmed: false,
      tokenRequestPrepared: false,
      tokenRequestExecuted: false,
      accessTokenRequested: false,
      refreshTokenRequested: false,
      credentialsUsed: false,
      clientSecretUsed: false,
      clientSecretSignCreated: false,
      naverApiCallAllowed: false,
      endpointResolved: false,
      endpointCalled: false,
      httpRequestCreated: false,
      httpClientCreated: false,
      authorizationHeaderCreated: false,
      tokenIssued: false,
      tokenStored: false,
      queueAllowed: false,
      workerAllowed: false,
      liveExecutionEnabled: false,
    },
    missingKeys: [],
    reasons: [],
  };

  const validProps = {
    safetyBoundaryResult: validSafetyBoundary,
    executorResult: validExecutor,
    finalApprovalAuditResult: validFinalApproval,
    queueEnabled: false,
    workerEnabled: false,
    liveExecutionEnabled: false,
  };

  test('1. Safety Boundary가 blocked이면 preflight blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      safetyBoundaryResult: { ...validSafetyBoundary, ok: false, status: 'BLOCKED' },
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY');
  });

  test('2. Executor가 blocked이면 preflight blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      executorResult: { ...validExecutor, ok: false, status: 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED' },
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_EXECUTOR');
  });

  test('3. Final Approval이 missing이면 preflight blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      finalApprovalAuditResult: null,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL');
  });

  test('4. Final Approval acknowledgement가 부족하면 preflight blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      finalApprovalAuditResult: { ...validFinalApproval, ok: false, status: 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_REJECTED_MISSING_ACKNOWLEDGEMENT' as any },
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL');
  });

  test('5. 모든 조건이 충족되면 PREFLIGHT_READY_BUT_NO_NETWORK', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.ok, true);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK');
    assert.equal(res.preflightPassedForNoNetworkOnly, true);
  });

  test('6. 모든 조건이 충족되어도 networkExecutionAllowed=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.networkExecutionAllowed, false);
  });

  test('7. 모든 조건이 충족되어도 tokenRequestAllowed=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.tokenRequestAllowed, false);
  });

  test('8. 모든 조건이 충족되어도 tokenRequestPrepared=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.tokenRequestPrepared, false);
  });

  test('9. 모든 조건이 충족되어도 tokenRequestExecuted=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.tokenRequestExecuted, false);
  });

  test('10. 모든 조건이 충족되어도 accessTokenRequested=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.accessTokenRequested, false);
  });

  test('11. 모든 조건이 충족되어도 tokenIssued=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.tokenIssued, false);
  });

  test('12. 모든 조건이 충족되어도 endpointResolved=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.endpointResolved, false);
  });

  test('13. 모든 조건이 충족되어도 endpointCalled=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.endpointCalled, false);
  });

  test('14. 모든 조건이 충족되어도 httpRequestCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.httpRequestCreated, false);
  });

  test('15. 모든 조건이 충족되어도 httpClientCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.httpClientCreated, false);
  });

  test('16. 모든 조건이 충족되어도 authorizationHeaderCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.authorizationHeaderCreated, false);
  });

  test('17. 모든 조건이 충족되어도 clientSecretUsed=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.clientSecretUsed, false);
  });

  test('18. 모든 조건이 충족되어도 clientSecretSignCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.clientSecretSignCreated, false);
  });

  test('19. Queue enabled 입력이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      queueEnabled: true,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED');
  });

  test('20. Worker enabled 입력이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      workerEnabled: true,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED');
  });

  test('21. Live execution enabled 입력이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness({
      ...validProps,
      liveExecutionEnabled: true,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED');
  });

  test('22. 결과 status는 허용된 status 중 하나만 반환', () => {
    const validStatuses = [
      'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK',
      'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY',
      'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_EXECUTOR',
      'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL',
      'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED',
    ];
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.ok(validStatuses.includes(res.status));

    const res2 = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(null);
    assert.ok(validStatuses.includes(res2.status));
  });

  test('23. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('access_token_value_mock'));
  });

  test('24. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('refresh_token_value_mock'));
  });

  test('25. 결과 문자열 전체에 client secret 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('my-super-secret-key'));
  });

  test('26. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    const str = JSON.stringify(res).toLowerCase();
    assert.ok(!str.includes('bearer '));
  });

  test('27. 결과 문자열 전체에 endpoint URL/path 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('api.commerce.naver.com'));
    assert.ok(!str.includes('/external/v1/oauth2/token'));
  });

  test('28. service 코드에 fetch/axios/http client 구현이 없음 (코드 레벨 검증 생략 - 런타임 결과만)', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.httpClientCreated, false);
    assert.equal(res.httpRequestCreated, false);
  });

  test('29. service 코드에 endpoint URL/path 구현이 없음 (코드 레벨 검증 생략 - 런타임 결과만)', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.endpointResolved, false);
  });

  test('30. service 코드에 client_secret_sign 생성 로직이 없음 (코드 레벨 검증 생략 - 런타임 결과만)', () => {
    const res = evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(validProps);
    assert.equal(res.clientSecretSignCreated, false);
  });
});
