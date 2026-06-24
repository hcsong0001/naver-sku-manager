/**
 * Task 30: Token First Test Preflight No-Network Harness
 *
 * 이 서비스는 실제 네트워크 요청이나 Token 발급을 수행하기 직전에 호출되는 "최종 사전 점검(Preflight)"입니다.
 * 이 모듈은 네트워크를 전혀 호출하지 않으며, 단지 하위 모듈들의 결과(Safety Boundary, Executor 상태, Final Approval)를
 * 취합하여 실행해도 안전한지(Preflight Passed)만 평가합니다.
 *
 * 절대 불변 규칙:
 * 1. 이 함수는 순수 함수이며, 부작용(네트워크, DB 등)이 전혀 없습니다.
 * 2. 모든 결과 flag(networkExecutionAllowed, tokenRequestAllowed 등)는 항상 false입니다.
 * 3. preflightPassedForNoNetworkOnly=true이더라도, 실제 실행을 허용하는 플래그는 모두 false입니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';

export type NaverApiTokenFirstTestPreflightNoNetworkHarnessStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_EXECUTOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED';

export interface NaverApiTokenFirstTestPreflightNoNetworkHarnessProps {
  safetyBoundaryResult: NaverApiTokenFirstTestSafetyBoundaryResult | null | undefined;
  executorResult: NaverApiTokenFirstTestExecutorDisabledResult | null | undefined;
  finalApprovalAuditResult: NaverApiTokenFirstTestFinalApprovalAuditResult | null | undefined;
  queueEnabled: boolean;
  workerEnabled: boolean;
  liveExecutionEnabled: boolean;
}

export interface NaverApiTokenFirstTestPreflightNoNetworkHarnessResult {
  ok: boolean;
  status: NaverApiTokenFirstTestPreflightNoNetworkHarnessStatus;
  preflightPassedForNoNetworkOnly: boolean;
  networkExecutionAllowed: false;
  executorArmed: false;
  executorEnabled: false;
  tokenRequestAllowed: false;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  clientSecretUsed: false;
  clientSecretSignCreated: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  endpointResolved: false;
  endpointCalled: false;
  httpRequestCreated: false;
  httpClientCreated: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
  reasons: string[];
}

export function evaluateNaverApiTokenFirstTestPreflightNoNetworkHarness(
  props: NaverApiTokenFirstTestPreflightNoNetworkHarnessProps | null | undefined
): NaverApiTokenFirstTestPreflightNoNetworkHarnessResult {
  const baseResult: NaverApiTokenFirstTestPreflightNoNetworkHarnessResult = {
    ok: false,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED',
    preflightPassedForNoNetworkOnly: false,
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
    reasons: [],
  };

  if (!props) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED';
    baseResult.reasons.push('Harness properties missing');
    return baseResult;
  }

  // 1. Safety Boundary 체크
  if (!props.safetyBoundaryResult) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY';
    baseResult.reasons.push('Safety boundary result is missing');
    return baseResult;
  }
  if (!props.safetyBoundaryResult.ok || props.safetyBoundaryResult.status !== 'READY_BUT_DISABLED') {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_SAFETY_BOUNDARY';
    baseResult.reasons.push('Safety boundary check failed or is not in READY_BUT_DISABLED state');
    return baseResult;
  }

  // 2. Executor Disabled 상태 체크
  if (!props.executorResult) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_EXECUTOR';
    baseResult.reasons.push('Executor result is missing');
    return baseResult;
  }
  if (!props.executorResult.ok || props.executorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED') {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_EXECUTOR';
    baseResult.reasons.push('Executor is not in READY_BUT_NOT_ARMED state');
    return baseResult;
  }

  // 3. Final Approval Audit 결과 체크
  if (!props.finalApprovalAuditResult) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL';
    baseResult.reasons.push('Final approval audit result is missing');
    return baseResult;
  }
  if (!props.finalApprovalAuditResult.ok || props.finalApprovalAuditResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL';
    baseResult.reasons.push('Final approval audit check failed or is not complete');
    return baseResult;
  }
  if (!props.finalApprovalAuditResult.recordPlan || !props.finalApprovalAuditResult.recordPlan.approvalRecorded) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_BLOCKED_BY_FINAL_APPROVAL';
    baseResult.reasons.push('Final approval record plan indicates approval is NOT recorded');
    return baseResult;
  }

  // 4. 추가적 위험성 검증 (Queue, Worker, LiveExecution)
  if (props.queueEnabled || props.workerEnabled) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED';
    baseResult.reasons.push('Queue or worker execution is strongly forbidden at this stage');
    return baseResult;
  }
  if (props.liveExecutionEnabled) {
    baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_NETWORK_EXECUTION_DISABLED';
    baseResult.reasons.push('Live execution mode is forbidden for first token test');
    return baseResult;
  }

  // 5. 성공 케이스 - 모든 점검을 통과했으나, 오직 네트워크가 없는 시뮬레이션 하네스(Preflight)로만 통과됨
  baseResult.ok = true;
  baseResult.status = 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK';
  baseResult.preflightPassedForNoNetworkOnly = true;
  baseResult.reasons.push('All preflight checks passed. Network execution remains strongly disabled.');

  return baseResult;
}
