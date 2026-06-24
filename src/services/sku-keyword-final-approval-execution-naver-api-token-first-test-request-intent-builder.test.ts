import test from 'node:test';
import assert from 'node:assert';

import {
  evaluateNaverApiTokenFirstTestRequestIntentBuilder,
  type NaverApiTokenFirstTestRequestIntentInput,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-intent-builder.service';

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';

function getValidSafetyBoundaryResult(): NaverApiTokenFirstTestSafetyBoundaryResult {
  return {
    ok: true,
    status: 'READY_BUT_DISABLED',
    resultCode: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE',
    resultMessage: '',
    tokenTestApprovalPresent: true,
    tokenTestApprovalComplete: true,
    allPreconditionsPassed: true,
    secretVisible: false,
    tokenVisible: false,
    endpointVisible: false,
    sanitized: true,
    blockingReasons: [],
    warnings: [],
    needsReviewReasons: [],
    allowed: false,
    checklistItems: [],
    maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE',
    readyForExplicitTokenTestApproval: true,
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
    workerAllowed: false
  };
}

function getValidExecutorResult(): NaverApiTokenFirstTestExecutorDisabledResult {
  return {
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
    reasons: []
  };
}

function getValidFinalApprovalResult(): NaverApiTokenFirstTestFinalApprovalAuditResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED',
    recordPlan: {
      approvalRecorded: true,
      approvalRecordedAt: new Date().toISOString(),
      approvalScope: 'FIRST_TOKEN_TEST_ONLY',
      approvedByRole: 'USER',
      acknowledgementVersion: 'v1',
      acknowledgementCount: 14,
      approvedAcknowledgementKeys: [],
      safetyBoundaryStatus: 'READY_BUT_DISABLED',
      executorStatus: 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED',
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
      liveExecutionEnabled: false
    },
    reasons: [],
    missingKeys: []
  };
}

function getValidPreflightResult(): NaverApiTokenFirstTestPreflightNoNetworkHarnessResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK',
    preflightPassedForNoNetworkOnly: true,
    networkExecutionAllowed: false,
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
    reasons: []
  };
}

function getValidNetworkKillSwitchResult(): NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED',
    networkKillSwitchOpen: false,
    networkAdapterEnabled: false,
    networkExecutionAllowed: false,
    tokenNetworkRequestAllowed: false,
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
    reasons: []
  };
}

function getValidInput(): NaverApiTokenFirstTestRequestIntentInput {
  return {
    safetyBoundaryResult: getValidSafetyBoundaryResult(),
    executorResult: getValidExecutorResult(),
    finalApprovalAuditResult: getValidFinalApprovalResult(),
    preflightResult: getValidPreflightResult(),
    networkKillSwitchResult: getValidNetworkKillSwitchResult(),
  };
}

test('1. Safety Boundary가 blocked이면 request intent blocked', () => {
  const input = getValidInput();
  input.safetyBoundaryResult!.status = 'BLOCKED';
  input.safetyBoundaryResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_SAFETY_BOUNDARY');
});

test('2. Executor가 blocked이면 request intent blocked', () => {
  const input = getValidInput();
  input.executorResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY';
  input.executorResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_EXECUTOR');
});

test('3. Final Approval이 missing이면 request intent blocked', () => {
  const input = getValidInput();
  input.finalApprovalAuditResult = null;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_FINAL_APPROVAL');
});

test('4. Preflight가 blocked이면 request intent blocked', () => {
  const input = getValidInput();
  input.preflightResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY';
  input.preflightResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_PREFLIGHT');
});

test('5. Network Kill-Switch가 blocked이면 request intent blocked', () => {
  const input = getValidInput();
  input.networkKillSwitchResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT';
  input.networkKillSwitchResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_NETWORK_KILL_SWITCH');
});

test('6. 모든 조건이 충족되면 REQUEST_INTENT_READY_BUT_SEALED 반환', () => {
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(getValidInput());
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED');
});

test('7. 모든 조건이 충족되면 requestIntentCreated=true', () => {
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(getValidInput());
  assert.strictEqual(result.requestIntentCreated, true);
});

test('8~24. 반드시 false여야 하는 속성 검증', () => {
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(getValidInput());
  
  assert.strictEqual(result.requestPayloadCreated, false);
  assert.strictEqual(result.requestBodyCreated, false);
  assert.strictEqual(result.requestHeadersCreated, false);
  assert.strictEqual(result.networkKillSwitchOpen, false);
  assert.strictEqual(result.networkExecutionAllowed, false);
  assert.strictEqual(result.tokenRequestAllowed, false);
  assert.strictEqual(result.tokenRequestPrepared, false);
  assert.strictEqual(result.tokenRequestExecuted, false);
  assert.strictEqual(result.accessTokenRequested, false);
  assert.strictEqual(result.tokenIssued, false);
  assert.strictEqual(result.endpointResolved, false);
  assert.strictEqual(result.endpointCalled, false);
  assert.strictEqual(result.httpRequestCreated, false);
  assert.strictEqual(result.httpClientCreated, false);
  assert.strictEqual(result.authorizationHeaderCreated, false);
  assert.strictEqual(result.clientSecretUsed, false);
  assert.strictEqual(result.clientSecretSignCreated, false);
});

test('25. Queue enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.queueEnabled = true;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Queue')));
});

test('26. Worker enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.workerEnabled = true;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Worker')));
});

test('27. Live execution enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.liveExecutionEnabled = true;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Live')));
});

test('28. network adapter enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.networkAdapterEnabledInput = true;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('네트워크')));
});

test('29. kill switch open 입력이면 blocked', () => {
  const input = getValidInput();
  input.killSwitchOpenInput = true;
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('킬스위치')));
});

test('30. 결과 status는 허용된 status 중 하나만 반환', () => {
  const allowed = [
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_SAFETY_BOUNDARY',
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_EXECUTOR',
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_FINAL_APPROVAL',
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_PREFLIGHT',
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_NETWORK_KILL_SWITCH',
    'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK'
  ];
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(getValidInput());
  assert.ok(allowed.includes(result.status));
});

test('31~35. 금지된 문자열(token 원문, secret 원문, URL 등)이 결과에 포함되지 않음', () => {
  const result = evaluateNaverApiTokenFirstTestRequestIntentBuilder(getValidInput());
  const jsonStr = JSON.stringify(result);
  
  const forbiddenPatterns = [
    /ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/,
    /access_token/i,
    /refresh_token/i,
    /client_secret(?!Used|SignCreated)/,
    /http:\/\//,
    /https:\/\//,
    /Authorization/,
    /Bearer/
  ];

  for (const pattern of forbiddenPatterns) {
    assert.strictEqual(pattern.test(jsonStr), false, `Should not contain forbidden string matching ${pattern}`);
  }
});
