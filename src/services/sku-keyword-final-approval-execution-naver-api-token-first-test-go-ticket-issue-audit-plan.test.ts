import test from 'node:test';
import assert from 'node:assert';

import {
  evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan,
  type NaverApiTokenFirstTestGoTicketIssueAuditInput,
  type NaverApiTokenFirstTestGoTicketIssueAcknowledgements
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-go-ticket-issue-audit-plan.service';

import type { NaverApiTokenFirstTestSandboxInvocationResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-sandbox-adapter-disabled.service';
import type { NaverApiTokenFirstTestGoTicketResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-one-time-go-ticket.service';
import type { NaverApiTokenFirstTestLiveReadinessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-live-readiness-review.service';

function getValidSandboxResult(): NaverApiTokenFirstTestSandboxInvocationResult {
  return {
    ok: true,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_SANDBOX_ADAPTER_DISABLED',
    sandboxContractCreated: true,
    disabledInvocationEvaluated: true,
    contractOnly: true,
    manualReviewRequired: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    sandboxInvocationAllowed: false,
    sandboxInvocationExecuted: false,
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

function getValidAcknowledgements(): NaverApiTokenFirstTestGoTicketIssueAcknowledgements {
  return {
    notRealTokenIssue: true,
    oneTimeUseOnly: true,
    requiresSeparateExecutionTask: true,
    tokenRequestNotApprovedYet: true,
    productReadApiBlocked: true,
    productUpdateApiBlocked: true,
    queueExecutionBlocked: true,
    workerExecutionBlocked: true,
    tokenStorageBlocked: true,
    tokenLogBlocked: true,
    tokenUiDisplayBlocked: true,
    autoRetryBlocked: true,
    immediateTokenDiscard: true,
    requiresSeparateApprovalForNextStep: true
  };
}

function getValidInput(): NaverApiTokenFirstTestGoTicketIssueAuditInput {
  return {
    sandboxResult: getValidSandboxResult(),
    goTicketPlanResult: getValidGoTicketResult(),
    liveReadinessResult: getValidLiveReadinessResult(),
    acknowledgements: getValidAcknowledgements(),
    isDuplicateTicketAttempt: false,
    isReusedTicketAttempt: false,
    isExpiredTicketAttempt: false
  };
}

test('1. Sandbox Adapter가 blocked이면 audit blocked', () => {
  const input = getValidInput();
  input.sandboxResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_BLOCKED_BY_SANDBOX');
});

test('2. Go Ticket Plan이 blocked이면 audit blocked', () => {
  const input = getValidInput();
  input.goTicketPlanResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_BLOCKED_BY_GO_TICKET_PLAN');
});

test('3. Live Readiness Review가 blocked이면 audit blocked', () => {
  const input = getValidInput();
  input.liveReadinessResult!.ok = false;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_BLOCKED_BY_LIVE_READINESS');
});

test('4. acknowledgement 하나라도 없으면 rejected', () => {
  const input = getValidInput();
  input.acknowledgements!.notRealTokenIssue = false;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_REJECTED_MISSING_ACKNOWLEDGEMENT');
});

test('5. duplicate ticket이면 duplicate blocked', () => {
  const input = getValidInput();
  input.isDuplicateTicketAttempt = true;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_DUPLICATE_BLOCKED');
});

test('6. reused ticket이면 reused blocked', () => {
  const input = getValidInput();
  input.isReusedTicketAttempt = true;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_REUSED_BLOCKED');
});

test('7. expired ticket이면 expired blocked', () => {
  const input = getValidInput();
  input.isExpiredTicketAttempt = true;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_EXPIRED_BLOCKED');
});

test('8. 모든 조건이 충족되면 AUDIT_PLAN_READY_BUT_DB_WRITE_DISABLED 반환', () => {
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(getValidInput());
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_PLAN_READY_BUT_DB_WRITE_DISABLED');
});

test('9. 모든 조건이 충족되면 auditEventPlanCreated=true', () => {
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(getValidInput());
  assert.strictEqual(result.auditEventPlanCreated, true);
});

test('10. 모든 조건이 충족되면 dbWriteDisabled=true', () => {
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(getValidInput());
  assert.strictEqual(result.dbWriteDisabled, true);
});

test('11~33. 모든 조건이 충족되어도 항상 false여야 하는 안전 플래그 검증', () => {
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(getValidInput());
  
  assert.strictEqual(result.auditEventPersisted, false);
  assert.strictEqual(result.dbWriteExecuted, false);
  assert.strictEqual(result.goTicketIssued, false);
  assert.strictEqual(result.executionLeaseIssued, false);
  assert.strictEqual(result.sandboxInvocationAllowed, false);
  assert.strictEqual(result.sandboxInvocationExecuted, false);
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

test('34. Queue enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.queueEnabled = true;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Queue')));
});

test('35. Worker enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.workerEnabled = true;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Worker')));
});

test('36. Live execution enabled 입력이면 blocked', () => {
  const input = getValidInput();
  input.liveExecutionEnabled = true;
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(input);
  assert.strictEqual(result.ok, false);
  assert.ok(result.reasons.some(r => r.includes('Live')));
});

test('37. 결과 status는 허용된 status 중 하나만 반환', () => {
  const allowed = [
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_PLAN_READY_BUT_DB_WRITE_DISABLED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_BLOCKED_BY_SANDBOX',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_BLOCKED_BY_GO_TICKET_PLAN',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_BLOCKED_BY_LIVE_READINESS',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_REJECTED_MISSING_ACKNOWLEDGEMENT',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_DUPLICATE_BLOCKED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_REUSED_BLOCKED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_EXPIRED_BLOCKED',
    'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_REVIEW_ONLY'
  ];
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(getValidInput());
  assert.ok(allowed.includes(result.status));
});

test('38~43. 금지된 문자열이 결과에 포함되지 않음', () => {
  const result = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan(getValidInput());
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
