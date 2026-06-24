import test from 'node:test';
import assert from 'node:assert';

import {
  evaluateNaverApiTokenFirstTestLiveReadinessReview,
  type NaverApiTokenFirstTestLiveReadinessInput
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-live-readiness-review.service';

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';
import type { NaverApiTokenFirstTestRequestIntentResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-intent-builder.service';
import type { NaverApiTokenFirstTestRequestCoordinatorResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-coordinator-sealed.service';

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

function getValidInput(): NaverApiTokenFirstTestLiveReadinessInput {
  return {
    safetyBoundaryResult: getValidSafetyBoundaryResult(),
    executorResult: getValidExecutorResult(),
    finalApprovalAuditResult: getValidFinalApprovalResult(),
    preflightResult: getValidPreflightResult(),
    networkKillSwitchResult: getValidNetworkKillSwitchResult(),
    requestIntentResult: getValidRequestIntentResult(),
    coordinatorResult: getValidCoordinatorResult(),
  };
}

test('1. Safety Boundary가 blocked이면 NO_GO_BY_SAFETY_BOUNDARY', () => {
  const input = getValidInput();
  input.safetyBoundaryResult!.status = 'BLOCKED';
  input.safetyBoundaryResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_SAFETY_BOUNDARY');
});

test('2. Executor가 blocked이면 NO_GO_BY_EXECUTOR', () => {
  const input = getValidInput();
  input.executorResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY';
  input.executorResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_EXECUTOR');
});

test('3. Final Approval이 missing이면 NO_GO_BY_FINAL_APPROVAL', () => {
  const input = getValidInput();
  input.finalApprovalAuditResult = null;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_FINAL_APPROVAL');
});

test('4. Preflight가 blocked이면 NO_GO_BY_PREFLIGHT', () => {
  const input = getValidInput();
  input.preflightResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY';
  input.preflightResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_PREFLIGHT');
});

test('5. Network Kill-Switch가 blocked이면 NO_GO_BY_NETWORK_KILL_SWITCH', () => {
  const input = getValidInput();
  input.networkKillSwitchResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT';
  input.networkKillSwitchResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_NETWORK_KILL_SWITCH');
});

test('6. Request Intent가 blocked이면 NO_GO_BY_REQUEST_INTENT', () => {
  const input = getValidInput();
  input.requestIntentResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_PREFLIGHT';
  input.requestIntentResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_REQUEST_INTENT');
});

test('7. Coordinator가 blocked이면 NO_GO_BY_COORDINATOR', () => {
  const input = getValidInput();
  input.coordinatorResult!.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_SAFETY_BOUNDARY';
  input.coordinatorResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_COORDINATOR');
});

test('8. 모든 조건이 충족되면 READY_FOR_MANUAL_REVIEW 반환', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_READY_FOR_MANUAL_REVIEW');
});

test('9. 모든 조건이 충족되면 reviewEvaluated=true', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.strictEqual(result.reviewEvaluated, true);
});

test('10. 모든 조건이 충족되면 manualReviewRequired=true', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.strictEqual(result.manualReviewRequired, true);
});

test('11. 모든 조건이 충족되면 readyForManualGoNoGoReview=true', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.strictEqual(result.readyForManualGoNoGoReview, true);
});

test('12~30. 모든 조건이 충족되어도 항상 false여야 하는 안전 플래그 검증', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  
  assert.strictEqual(result.liveTokenTestApproved, false);
  assert.strictEqual(result.liveTokenTestExecutionAllowed, false);
  assert.strictEqual(result.coordinatorExecutionAllowed, false);
  assert.strictEqual(result.requestPayloadCreated, false);
  assert.strictEqual(result.requestBodyCreated, false);
  assert.strictEqual(result.requestHeadersCreated, false);
  assert.strictEqual(result.networkKillSwitchOpen, false);
  assert.strictEqual(result.networkAdapterEnabled, false);
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

test('31. Queue enabled 입력이면 no-go', () => {
  const input = getValidInput();
  input.queueEnabled = true;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Queue')));
});

test('32. Worker enabled 입력이면 no-go', () => {
  const input = getValidInput();
  input.workerEnabled = true;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Worker')));
});

test('33. Live execution enabled 입력이면 no-go', () => {
  const input = getValidInput();
  input.liveExecutionEnabled = true;
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Live')));
});

test('34. checklist가 10개 이상 포함됨', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.ok(result.manualChecklist.length >= 10);
});

test('35. checklist가 실제 token 발급은 별도 Task라는 내용을 포함함', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.ok(result.manualChecklist.some(c => c.description.includes('별도 Task') && c.description.includes('발급 테스트')));
});

test('36. checklist가 상품 조회/수정 API 금지를 포함함', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.ok(result.manualChecklist.some(c => c.description.includes('상품 조회 API')));
  assert.ok(result.manualChecklist.some(c => c.description.includes('상품 수정 API')));
});

test('37. checklist가 token 저장/로그/UI 표시 금지를 포함함', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.ok(result.manualChecklist.some(c => c.description.includes('저장')));
  assert.ok(result.manualChecklist.some(c => c.description.includes('로그')));
  assert.ok(result.manualChecklist.some(c => c.description.includes('UI')));
});

test('38. 결과 status는 허용된 status 중 하나만 반환', () => {
  const allowed = [
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_READY_FOR_MANUAL_REVIEW',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_SAFETY_BOUNDARY',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_EXECUTOR',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_FINAL_APPROVAL',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_PREFLIGHT',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_NETWORK_KILL_SWITCH',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_REQUEST_INTENT',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_COORDINATOR',
    'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_REVIEW_ONLY_EXECUTION_DISABLED'
  ];
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
  assert.ok(allowed.includes(result.status));
});

test('39~43. 금지된 문자열이 결과에 포함되지 않음', () => {
  const result = evaluateNaverApiTokenFirstTestLiveReadinessReview(getValidInput());
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
