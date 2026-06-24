import test from 'node:test';
import assert from 'node:assert';

import {
  invokeNaverApiTokenFirstTestSandboxDisabled,
  type NaverApiTokenFirstTestSandboxInvocationInput
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-sandbox-adapter-disabled.service';

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';
import type { NaverApiTokenFirstTestRequestIntentResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-intent-builder.service';
import type { NaverApiTokenFirstTestRequestCoordinatorResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-coordinator-sealed.service';
import type { NaverApiTokenFirstTestLiveReadinessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-live-readiness-review.service';
import type { NaverApiTokenFirstTestGoTicketResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-one-time-go-ticket.service';

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

function getValidRequestIntentResult(): NaverApiTokenFirstTestRequestIntentResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED',
    requestIntentCreated: true,
    noNetworkOnly: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    requestPayloadCreated: false,
    requestBodyCreated: false,
    requestHeadersCreated: false,
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

function getValidCoordinatorResult(): NaverApiTokenFirstTestRequestCoordinatorResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_READY',
    coordinatorEvaluated: true,
    dryRunOnly: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    coordinatorExecutionAllowed: false,
    requestPayloadCreated: false,
    requestBodyCreated: false,
    requestHeadersCreated: false,
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

function getValidLiveReadinessResult(): NaverApiTokenFirstTestLiveReadinessResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_READY_FOR_MANUAL_REVIEW',
    reviewEvaluated: true,
    manualReviewRequired: true,
    readyForManualGoNoGoReview: true,
    dryRunOnly: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    liveTokenTestApproved: false,
    liveTokenTestExecutionAllowed: false,
    coordinatorExecutionAllowed: false,
    requestPayloadCreated: false,
    requestBodyCreated: false,
    requestHeadersCreated: false,
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
    manualChecklist: [],
    reasons: []
  };
}

function getValidGoTicketResult(): NaverApiTokenFirstTestGoTicketResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_READY_BUT_EXECUTION_DISABLED',
    goTicketPlanCreated: true,
    executionLeasePlanCreated: true,
    oneTimeOnly: true,
    manualReviewRequired: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    goTicketIssued: false,
    executionLeaseIssued: false,
    liveTokenTestApproved: false,
    liveTokenTestExecutionAllowed: false,
    coordinatorExecutionAllowed: false,
    requestPayloadCreated: false,
    requestBodyCreated: false,
    requestHeadersCreated: false,
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

function getValidInput(): NaverApiTokenFirstTestSandboxInvocationInput {
  return {
    goTicketResult: getValidGoTicketResult(),
    liveReadinessResult: getValidLiveReadinessResult(),
    coordinatorResult: getValidCoordinatorResult(),
    requestIntentResult: getValidRequestIntentResult(),
    networkKillSwitchResult: getValidNetworkKillSwitchResult(),
    preflightResult: getValidPreflightResult(),
    finalApprovalAuditResult: getValidFinalApprovalResult(),
    executorResult: getValidExecutorResult(),
    safetyBoundaryResult: getValidSafetyBoundaryResult()
  };
}

test('1. Go Ticket Plan이 없으면 sandbox blocked', () => {
  const input = getValidInput();
  input.goTicketResult = null;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_GO_TICKET');
});

test('2. Execution Lease Plan이 없으면 sandbox blocked', () => {
  const input = getValidInput();
  input.goTicketResult!.executionLeasePlanCreated = false;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_LEASE');
});

test('3. Live Readiness Review가 blocked이면 sandbox blocked', () => {
  const input = getValidInput();
  input.liveReadinessResult!.ok = false;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_LIVE_READINESS');
});

test('4. Coordinator가 blocked이면 sandbox blocked', () => {
  const input = getValidInput();
  input.coordinatorResult!.ok = false;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_COORDINATOR');
});

test('5. Request Intent가 blocked이면 sandbox blocked', () => {
  const input = getValidInput();
  input.requestIntentResult!.ok = false;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_REQUEST_INTENT');
});

test('6. Network Kill-Switch가 blocked이면 sandbox blocked', () => {
  const input = getValidInput();
  input.networkKillSwitchResult!.ok = false;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_NETWORK_KILL_SWITCH');
});

test('7. Go Ticket Plan이 있어도 goTicketIssued=false 유지', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  assert.strictEqual(result.goTicketIssued, false);
});

test('8. Execution Lease Plan이 있어도 executionLeaseIssued=false 유지', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  assert.strictEqual(result.executionLeaseIssued, false);
});

test('9. 모든 조건이 충족되면 SANDBOX_ADAPTER_DISABLED 반환', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_ADAPTER_DISABLED');
});

test('10. 모든 조건이 충족되면 sandboxContractCreated=true', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  assert.strictEqual(result.sandboxContractCreated, true);
});

test('11. 모든 조건이 충족되면 disabledInvocationEvaluated=true', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  assert.strictEqual(result.disabledInvocationEvaluated, true);
});

test('12~32. 모든 조건이 충족되어도 항상 false여야 하는 안전 플래그 검증', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  
  assert.strictEqual(result.sandboxInvocationAllowed, false);
  assert.strictEqual(result.sandboxInvocationExecuted, false);
  assert.strictEqual(result.goTicketIssued, false);
  assert.strictEqual(result.executionLeaseIssued, false);
  assert.strictEqual(result.liveTokenTestExecutionAllowed, false);
  assert.strictEqual(result.requestPayloadCreated, false);
  assert.strictEqual(result.requestBodyCreated, false);
  assert.strictEqual(result.requestHeadersCreated, false);
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

test('33. Queue enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.queueEnabled = true;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Queue')));
});

test('34. Worker enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.workerEnabled = true;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Worker')));
});

test('35. Live execution enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.liveExecutionEnabled = true;
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Live')));
});

test('36. 결과 status는 허용된 status 중 하나만 반환', () => {
  const allowed = [
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_ADAPTER_DISABLED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_GO_TICKET',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_LEASE',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_LIVE_READINESS',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_COORDINATOR',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_REQUEST_INTENT',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_BLOCKED_BY_NETWORK_KILL_SWITCH',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_INVOCATION_READY_BUT_DISABLED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_CONTRACT_ONLY'
  ];
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
  assert.ok(allowed.includes(result.status));
});

test('37~41. 금지된 문자열이 결과에 포함되지 않음', () => {
  const result = invokeNaverApiTokenFirstTestSandboxDisabled(getValidInput());
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
