import test from 'node:test';
import assert from 'node:assert';

import {
  buildNaverApiTokenFirstTestReadinessScreenView,
  type BuildReadinessScreenViewInput
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-readiness-screen-view.service';

function getValidInput(): BuildReadinessScreenViewInput {
  return {
    safetyBoundaryResult: {
      ok: true,
      readyForExplicitTokenTestApproval: true,
      allowed: false,
      status: 'READY_BUT_DISABLED',
      resultCode: 'NAVER_AUTH_TOKEN_FIRST_TEST_APPROVAL_CONFIRMED_BUT_TOKEN_REQUEST_DISABLED',
      resultMessage: 'Ready',
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
      maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE'
    },
    goTicketPlanResult: {
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
    },
    sandboxResult: {
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
    },
    auditPlanResult: {
      ok: true,
      status: 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_ISSUE_AUDIT_PLAN_READY_BUT_DB_WRITE_DISABLED',
      auditEventPlanCreated: true,
      dbWriteDisabled: true,
      manualReviewRequired: true,
      oneTimeOnly: true,
      sealedForFutureExplicitApproval: true,
      requiresSeparateLiveApproval: true,
      auditEventPersisted: false,
      dbWriteExecuted: false,
      goTicketIssued: false,
      executionLeaseIssued: false,
      sandboxInvocationAllowed: false,
      sandboxInvocationExecuted: false,
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
    },
    persistenceResult: {
      ok: true,
      status: 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_PERSISTENCE_PLAN_READY_BUT_DB_WRITE_DISABLED',
      persistencePlanCreated: true,
      dbWritePlanCreated: true,
      dbWriteDisabled: true,
      metadataWritePlanCreated: true,
      manualReviewRequired: true,
      oneTimeOnly: true,
      sealedForFutureExplicitApproval: true,
      requiresSeparateLiveApproval: true,
      safeMetadataWritePlan: null,
      persistenceExecuted: false,
      metadataPersisted: false,
      auditEventPersisted: false,
      dbWriteExecuted: false,
      prismaMutationExecuted: false,
      goTicketIssued: false,
      executionLeaseIssued: false,
      sandboxInvocationAllowed: false,
      sandboxInvocationExecuted: false,
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
    }
  };
}

test('1. view model 생성 시 screenViewCreated=true', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.screenViewCreated, true);
});

test('2. view model은 readOnly=true', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.readOnly, true);
});

test('3. view model은 12개 안전 단계 목록을 포함', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.safetySteps.length, 12);
});

test('4. 각 단계에는 label/status/reason이 포함', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  for (const step of result.safetySteps) {
    assert.ok(step.label);
    assert.ok(step.status);
    assert.ok(Array.isArray(step.reasons));
  }
});

test('5. 전체 execution allowed는 false', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.screenActionEnabled, false);
});

test('6. DB write allowed는 false', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.dbWriteAllowed, false);
});

test('7. Naver API call allowed는 false', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.naverApiCallAllowed, false);
});

test('8. Token issued는 false', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.tokenIssued, false);
});

test('9~24. 모든 필수 실행 플래그가 false', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
  assert.strictEqual(result.screenActionEnabled, false);
  assert.strictEqual(result.liveTokenTestExecutionAllowed, false);
  assert.strictEqual(result.dbWriteExecuted, false);
  assert.strictEqual(result.prismaMutationExecuted, false);
  assert.strictEqual(result.goTicketIssued, false);
  assert.strictEqual(result.executionLeaseIssued, false);
  assert.strictEqual(result.requestPayloadCreated, false);
  assert.strictEqual(result.requestBodyCreated, false);
  assert.strictEqual(result.requestHeadersCreated, false);
  assert.strictEqual(result.networkExecutionAllowed, false);
  assert.strictEqual(result.tokenRequestAllowed, false);
  assert.strictEqual(result.tokenRequestExecuted, false);
  assert.strictEqual(result.httpClientCreated, false);
  assert.strictEqual(result.authorizationHeaderCreated, false);
  assert.strictEqual(result.clientSecretUsed, false);
  assert.strictEqual(result.clientSecretSignCreated, false);
});

test('29~33. 결과에 금지 문자열 비포함 확인', () => {
  const result = buildNaverApiTokenFirstTestReadinessScreenView(getValidInput());
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
