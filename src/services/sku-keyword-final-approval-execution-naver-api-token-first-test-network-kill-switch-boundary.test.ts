import test from 'node:test';
import assert from 'node:assert';
import {
  evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary,
  executeDisabledNetworkAdapterSkeleton,
  type NaverApiTokenFirstTestNetworkKillSwitchBoundaryInput
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';

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

function getValidInput(): NaverApiTokenFirstTestNetworkKillSwitchBoundaryInput {
  return {
    preflightResult: getValidPreflightResult(),
    finalApprovalAuditResult: getValidFinalApprovalResult(),
    executorResult: getValidExecutorResult()
  };
}

test('1. Preflight가 blocked이면 network boundary도 blocked', () => {
  const input = getValidInput();
  input.preflightResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY';
  input.preflightResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT');
});

test('2. Final Approval이 missing이면 network boundary blocked', () => {
  const input = getValidInput();
  input.finalApprovalAuditResult = null;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_FINAL_APPROVAL');
});

test('3. Executor가 disabled가 아니거나 이상 상태면 blocked', () => {
  const input = getValidInput();
  input.executorResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY';
  input.executorResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_EXECUTOR');
});

test('4. 모든 조건이 충족되어도 NETWORK_READY_BUT_HARD_DISABLED 반환', () => {
  const input = getValidInput();
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED');
});

test('5~20. 모든 안전 플래그는 충족 여부와 관계없이 무조건 false', () => {
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(getValidInput());
  assert.strictEqual(result.networkKillSwitchOpen, false);
  assert.strictEqual(result.networkAdapterEnabled, false);
  assert.strictEqual(result.networkExecutionAllowed, false);
  assert.strictEqual(result.tokenNetworkRequestAllowed, false);
  assert.strictEqual(result.tokenRequestAllowed, false);
  assert.strictEqual(result.tokenRequestPrepared, false);
  assert.strictEqual(result.tokenRequestExecuted, false);
  assert.strictEqual(result.accessTokenRequested, false);
  assert.strictEqual(result.refreshTokenRequested, false);
  assert.strictEqual(result.credentialsUsed, false);
  assert.strictEqual(result.clientSecretUsed, false);
  assert.strictEqual(result.clientSecretSignCreated, false);
  assert.strictEqual(result.tokenIssued, false);
  assert.strictEqual(result.tokenStored, false);
  assert.strictEqual(result.authorizationHeaderCreated, false);
  assert.strictEqual(result.endpointResolved, false);
  assert.strictEqual(result.endpointCalled, false);
  assert.strictEqual(result.httpRequestCreated, false);
  assert.strictEqual(result.httpClientCreated, false);
  assert.strictEqual(result.naverApiCallAllowed, false);
});

test('21. Queue enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.queueEnabled = true;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Queue')));
});

test('22. Worker enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.workerEnabled = true;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Worker')));
});

test('23. Live execution enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.liveExecutionEnabled = true;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Live')));
});

test('24. network adapter enabled 입력이 들어오면 blocked', () => {
  const input = getValidInput();
  input.networkAdapterEnabledInput = true;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('network adapter')));
});

test('25. kill switch open 입력이 들어오면 blocked', () => {
  const input = getValidInput();
  input.killSwitchOpenInput = true;
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('kill switch')));
});

test('26. disabled adapter를 호출해도 네트워크 요청 결과가 생성되지 않음', () => {
  const result = executeDisabledNetworkAdapterSkeleton();
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_ADAPTER_DISABLED');
  assert.strictEqual(result.networkAdapterEnabled, false);
  assert.strictEqual(result.networkExecutionAllowed, false);
});

test('27. 결과 status는 허용된 status 중 하나만 반환', () => {
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(getValidInput());
  const allowed = [
    'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT',
    'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_EXECUTOR',
    'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_FINAL_APPROVAL',
    'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_ADAPTER_DISABLED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED'
  ];
  assert.ok(allowed.includes(result.status));
});

test('28~32. 금지된 문자열(token 원문, secret 원문, URL 등)이 결과에 포함되지 않음', () => {
  const result = evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(getValidInput());
  const jsonStr = JSON.stringify(result);
  
  const forbiddenPatterns = [
    /ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/, // JWT like
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
