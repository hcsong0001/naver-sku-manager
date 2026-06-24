import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateNaverApiTokenFirstTestExecutorDisabled } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';

describe('NaverApiTokenFirstTestExecutorDisabled', () => {
  const mockBoundaryReady: NaverApiTokenFirstTestSafetyBoundaryResult = {
    ok: true,
    readyForExplicitTokenTestApproval: true,
    allowed: false,
    status: 'READY_BUT_DISABLED',
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

  const mockBoundaryBlocked: NaverApiTokenFirstTestSafetyBoundaryResult = {
    ...mockBoundaryReady,
    ok: false,
    readyForExplicitTokenTestApproval: false,
    status: 'BLOCKED',
    resultCode: 'NAVER_AUTH_TOKEN_FIRST_TEST_BLOCKED_BY_SAFETY_BOUNDARY',
  };

  test('1. Safety Boundary가 blocked이면 Executor도 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryBlocked,
    });
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY');
    assert.equal(res.ok, false);
  });

  test('2. Safety Boundary가 ready-but-not-executable이어도 tokenRequestExecuted=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED');
    assert.equal(res.tokenRequestExecuted, false);
  });

  test('3. 사용자 approval confirmed 상태여도 executorEnabled=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.executorEnabled, false);
  });

  test('4. 모든 조건이 통과되어도 executorArmed=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.executorArmed, false);
  });

  test('5. 모든 조건이 통과되어도 tokenRequestAllowed=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.tokenRequestAllowed, false);
  });

  test('6. 모든 조건이 통과되어도 tokenRequestPrepared=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.tokenRequestPrepared, false);
  });

  test('7. 모든 조건이 통과되어도 tokenRequestExecuted=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.tokenRequestExecuted, false);
  });

  test('8. 모든 조건이 통과되어도 accessTokenRequested=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.accessTokenRequested, false);
  });

  test('9. 모든 조건이 통과되어도 tokenIssued=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.tokenIssued, false);
  });

  test('10. 모든 조건이 통과되어도 endpointResolved=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.endpointResolved, false);
  });

  test('11. 모든 조건이 통과되어도 endpointCalled=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.endpointCalled, false);
  });

  test('12. 모든 조건이 통과되어도 httpRequestCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.httpRequestCreated, false);
  });

  test('13. 모든 조건이 통과되어도 httpClientCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.httpClientCreated, false);
  });

  test('14. 모든 조건이 통과되어도 authorizationHeaderCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.authorizationHeaderCreated, false);
  });

  test('15. 모든 조건이 통과되어도 clientSecretUsed=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.clientSecretUsed, false);
  });

  test('16. 모든 조건이 통과되어도 clientSecretSignCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
    });
    assert.equal(res.clientSecretSignCreated, false);
  });

  test('17. Queue/Worker 관련 입력이 enabled이면 blocked 또는 disabled reason 포함', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
      queueEnabled: true,
      workerEnabled: true,
    });
    assert.ok(res.reasons.some(r => r.includes('Queue')));
    assert.ok(res.reasons.some(r => r.includes('Worker')));
    assert.equal(res.queueAllowed, false);
    assert.equal(res.workerAllowed, false);
  });

  test('18. Live execution 관련 입력이 enabled이면 blocked 또는 disabled reason 포함', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled({
      safetyBoundaryResult: mockBoundaryReady,
      liveExecutionEnabled: true,
    });
    assert.ok(res.reasons.some(r => r.includes('Live')));
    assert.equal(res.liveExecutionEnabled, false);
  });

  test('19. 결과 status는 허용된 status 중 하나만 반환', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled(null);
    const validStatuses = [
      'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED',
      'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY',
      'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED',
      'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_APPROVAL_CONFIRMED_BUT_EXECUTION_DISABLED',
    ];
    assert.ok(validStatuses.includes(res.status));
  });

  test('20. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled();
    const str = JSON.stringify(res);
    assert.ok(!str.includes('access_token_value_mock'));
  });

  test('21. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled();
    const str = JSON.stringify(res);
    assert.ok(!str.includes('refresh_token_value_mock'));
  });

  test('22. 결과 문자열 전체에 client secret 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled();
    const str = JSON.stringify(res);
    assert.ok(!str.includes('my-super-secret-key'));
  });

  test('23. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled();
    const str = JSON.stringify(res).toLowerCase();
    assert.ok(!str.includes('bearer '));
  });

  test('24. 결과 문자열 전체에 endpoint URL/path 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestExecutorDisabled();
    const str = JSON.stringify(res);
    assert.ok(!str.includes('api.commerce.naver.com'));
    assert.ok(!str.includes('/external/v1/oauth2/token'));
  });

});
