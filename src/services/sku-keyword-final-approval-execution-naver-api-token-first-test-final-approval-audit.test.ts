import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateNaverApiTokenFirstTestFinalApprovalAudit,
  FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS,
  sanitizeStoredFinalApprovalAuditRecord,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';

describe('NaverApiTokenFirstTestFinalApprovalAudit', () => {
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

  const mockExecutorArmed: NaverApiTokenFirstTestExecutorDisabledResult = {
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

  const mockExecutorDisabled: NaverApiTokenFirstTestExecutorDisabledResult = {
    ...mockExecutorArmed,
    ok: false,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED',
  };

  const validProps = {
    safetyBoundaryResult: mockBoundaryReady,
    executorResult: mockExecutorArmed,
    task25ApprovalPresent: true,
    acknowledgedKeys: [...FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS],
    existingFinalApprovalRecord: null,
    finalApprovalStatus: 'ACTIVE',
    batchJobStatus: 'APPROVED',
    itemCount: 1,
    itemStatuses: ['READY'],
  };

  test('1. 모든 acknowledgement가 있어야 final approval record plan 생성', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.ok, true);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED');
    assert.ok(res.recordPlan);
    assert.equal(res.recordPlan?.approvalRecorded, true);
    assert.equal(res.recordPlan?.tokenRequestAllowed, false);
  });

  test('2. acknowledgement 하나라도 없으면 rejected', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      acknowledgedKeys: FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS.slice(1),
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_REJECTED_MISSING_ACKNOWLEDGEMENT');
    assert.equal(res.recordPlan, null);
  });

  test('3. Task 25 approval이 없으면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      task25ApprovalPresent: false,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_SAFETY_BOUNDARY');
  });

  test('4. Safety Boundary가 blocked이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      safetyBoundaryResult: mockBoundaryBlocked,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_SAFETY_BOUNDARY');
  });

  test('5. Executor가 disabled가 아니거나 이상 상태면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      executorResult: mockExecutorDisabled,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_EXECUTOR_DISABLED');
  });

  test('6. FinalApproval 상태가 적절하지 않으면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      finalApprovalStatus: 'CLOSED',
    });
    assert.equal(res.ok, false);
  });

  test('7. BatchJob 상태가 APPROVED가 아니면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      batchJobStatus: 'EXECUTING',
    });
    assert.equal(res.ok, false);
  });

  test('8. BatchJobItem 상태가 READY가 아니면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      itemStatuses: ['FAILED'],
    });
    assert.equal(res.ok, false);
  });

  test('9. itemCount가 1이 아니면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      itemCount: 2,
    });
    assert.equal(res.ok, false);
  });

  test('10. duplicate final approval이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      existingFinalApprovalRecord: { approvalRecorded: true },
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_DUPLICATE_BLOCKED');
  });

  test('11. final approval이 기록되어도 tokenRequestAllowed=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.tokenRequestAllowed, false);
  });

  test('12. final approval이 기록되어도 executorArmed=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.executorArmed, false);
  });

  test('13. final approval이 기록되어도 tokenRequestPrepared=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.tokenRequestPrepared, false);
  });

  test('14. final approval이 기록되어도 tokenRequestExecuted=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.tokenRequestExecuted, false);
  });

  test('15. final approval이 기록되어도 accessTokenRequested=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.accessTokenRequested, false);
  });

  test('16. final approval이 기록되어도 tokenIssued=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.tokenIssued, false);
  });

  test('17. final approval이 기록되어도 endpointResolved=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.endpointResolved, false);
  });

  test('18. final approval이 기록되어도 endpointCalled=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.endpointCalled, false);
  });

  test('19. final approval이 기록되어도 httpRequestCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.httpRequestCreated, false);
  });

  test('20. final approval이 기록되어도 httpClientCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.httpClientCreated, false);
  });

  test('21. final approval이 기록되어도 authorizationHeaderCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.authorizationHeaderCreated, false);
  });

  test('22. final approval이 기록되어도 clientSecretUsed=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.clientSecretUsed, false);
  });

  test('23. final approval이 기록되어도 clientSecretSignCreated=false', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    assert.equal(res.recordPlan?.clientSecretSignCreated, false);
  });

  test('24. Queue/Worker enabled 입력이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      queueEnabled: true,
      workerEnabled: true,
    });
    assert.equal(res.ok, false);
  });

  test('25. Live execution enabled 입력이면 blocked', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit({
      ...validProps,
      liveExecutionEnabled: true,
    });
    assert.equal(res.ok, false);
  });

  test('26. 결과 status는 허용된 status 중 하나만 반환', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(null);
    const validStatuses = [
      'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED',
      'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_SAFETY_BOUNDARY',
      'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_EXECUTOR_DISABLED',
      'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_REJECTED_MISSING_ACKNOWLEDGEMENT',
      'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_DUPLICATE_BLOCKED',
    ];
    assert.ok(validStatuses.includes(res.status));
  });

  test('27. 결과 문자열 전체에 access token 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('access_token_value_mock'));
  });

  test('28. 결과 문자열 전체에 refresh token 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('refresh_token_value_mock'));
  });

  test('29. 결과 문자열 전체에 client secret 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('my-super-secret-key'));
  });

  test('30. 결과 문자열 전체에 authorization header 문자열이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    const str = JSON.stringify(res).toLowerCase();
    assert.ok(!str.includes('bearer '));
  });

  test('31. 결과 문자열 전체에 endpoint URL/path 원문이 포함되지 않음', () => {
    const res = evaluateNaverApiTokenFirstTestFinalApprovalAudit(validProps);
    const str = JSON.stringify(res);
    assert.ok(!str.includes('api.commerce.naver.com'));
    assert.ok(!str.includes('/external/v1/oauth2/token'));
  });

  test('32. sanitizeStoredFinalApprovalAuditRecord', () => {
    const raw = {
      approvalRecorded: true,
      approvalScope: 'FIRST_TOKEN_TEST_ONLY',
      invalidField: 'should_be_removed',
    };
    const sanitized = sanitizeStoredFinalApprovalAuditRecord(raw);
    assert.ok(sanitized);
    assert.equal(sanitized?.approvalRecorded, true);
    assert.equal((sanitized as any).invalidField, undefined);
    assert.equal(sanitized?.tokenRequestAllowed, false);
    assert.equal(sanitized?.clientSecretUsed, false);
  });
});
