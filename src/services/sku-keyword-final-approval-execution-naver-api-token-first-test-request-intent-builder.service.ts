/**
 * Task 32 - Token First Test Request Intent Builder / Secretless Execution Intent
 *
 * 이 서비스는 실제 요청을 만들기 전 단계의 "안전한 요청 의도(Request Intent)"만 생성하는 순수 함수입니다.
 * 실제 요청 payload, endpoint, 통신 모듈, 서명 등은 생성하지 않습니다.
 * 오직 선행되는 모든 안전 장치(Safety Boundary, Executor, Final Approval, Preflight, Network Kill-Switch)를 
 * 종합적으로 검증하여 의도(Intent) 생성 여부만 판별합니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';

export type NaverApiTokenFirstTestRequestIntentStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_EXECUTOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_FINAL_APPROVAL'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_PREFLIGHT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_NETWORK_KILL_SWITCH'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK';

export interface NaverApiTokenFirstTestRequestIntentInput {
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;
  executorResult?: NaverApiTokenFirstTestExecutorDisabledResult | null;
  finalApprovalAuditResult?: NaverApiTokenFirstTestFinalApprovalAuditResult | null;
  preflightResult?: NaverApiTokenFirstTestPreflightNoNetworkHarnessResult | null;
  networkKillSwitchResult?: NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult | null;

  queueEnabled?: boolean;
  workerEnabled?: boolean;
  liveExecutionEnabled?: boolean;
  networkAdapterEnabledInput?: boolean;
  killSwitchOpenInput?: boolean;
}

export interface NaverApiTokenFirstTestRequestIntentResult {
  ok: boolean;
  status: NaverApiTokenFirstTestRequestIntentStatus;

  // 허용 가능한 true (안전한 의도 생성 관련)
  requestIntentCreated: boolean;
  noNetworkOnly: boolean;
  sealedForFutureExplicitApproval: boolean;
  requiresSeparateLiveApproval: boolean;

  // 반드시 false여야 하는 flag (실제 실행 및 준비 관련)
  requestPayloadCreated: false;
  requestBodyCreated: false;
  requestHeadersCreated: false;
  networkKillSwitchOpen: false;
  networkAdapterEnabled: false;
  networkExecutionAllowed: false;
  tokenNetworkRequestAllowed: false;
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

export function evaluateNaverApiTokenFirstTestRequestIntentBuilder(
  input?: NaverApiTokenFirstTestRequestIntentInput | null
): NaverApiTokenFirstTestRequestIntentResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];

  let status: NaverApiTokenFirstTestRequestIntentStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK';
  let ok = false;
  let requestIntentCreated = false;

  // 위험 모드 차단
  if (safeInput.queueEnabled) {
    reasons.push('Queue 실행 모드는 금지되어 있습니다.');
  }
  if (safeInput.workerEnabled) {
    reasons.push('Worker 실행 모드는 금지되어 있습니다.');
  }
  if (safeInput.liveExecutionEnabled) {
    reasons.push('Live 실행 모드는 금지되어 있습니다.');
  }
  if (safeInput.networkAdapterEnabledInput) {
    reasons.push('네트워크 어댑터 강제 활성화 시도는 금지되어 있습니다.');
  }
  if (safeInput.killSwitchOpenInput) {
    reasons.push('킬스위치 강제 해제 시도는 금지되어 있습니다.');
  }

  // 1. Safety Boundary 체크
  if (!safeInput.safetyBoundaryResult) {
    reasons.push('Safety Boundary 결과가 누락되었습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_SAFETY_BOUNDARY';
  } else if (!safeInput.safetyBoundaryResult.ok || safeInput.safetyBoundaryResult.status !== 'READY_BUT_DISABLED') {
    reasons.push('Safety Boundary가 안전 상태가 아닙니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_SAFETY_BOUNDARY';
  }

  // 2. Executor 체크
  if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK') {
    if (!safeInput.executorResult) {
      reasons.push('Executor 결과가 누락되었습니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_EXECUTOR';
    } else if (!safeInput.executorResult.ok || safeInput.executorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED') {
      reasons.push('Executor가 준비 상태가 아닙니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_EXECUTOR';
    }
  }

  // 3. Final Approval 체크
  if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK') {
    if (!safeInput.finalApprovalAuditResult) {
      reasons.push('Final Approval 기록이 누락되었습니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_FINAL_APPROVAL';
    } else if (!safeInput.finalApprovalAuditResult.ok || safeInput.finalApprovalAuditResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
      reasons.push('Final Approval 기록이 유효하지 않습니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_FINAL_APPROVAL';
    }
  }

  // 4. Preflight 체크
  if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK') {
    if (!safeInput.preflightResult) {
      reasons.push('Preflight 하네스 결과가 누락되었습니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_PREFLIGHT';
    } else if (!safeInput.preflightResult.ok || safeInput.preflightResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK') {
      reasons.push('Preflight를 통과하지 못했습니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_PREFLIGHT';
    }
  }

  // 5. Network Kill-Switch Boundary 체크
  if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK') {
    if (!safeInput.networkKillSwitchResult) {
      reasons.push('Network Kill-Switch 결과가 누락되었습니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_NETWORK_KILL_SWITCH';
    } else if (!safeInput.networkKillSwitchResult.ok || safeInput.networkKillSwitchResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED') {
      reasons.push('Network Kill-Switch가 안전하게 차단된 상태가 아닙니다.');
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_BLOCKED_BY_NETWORK_KILL_SWITCH';
    }
  }

  // 모든 조건 만족 시, 의도(Intent) 생성 허용. 단, 실행은 무조건 봉인됨(Sealed).
  if (reasons.length === 0) {
    ok = true;
    requestIntentCreated = true;
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED';
    reasons.push('모든 안전 장치를 통과하여 요청 의도가 생성되었으나, 실제 네트워크 및 통신 객체 생성은 안전하게 봉인되었습니다.');
  }

  return sanitizeRequestIntentResult({
    ok,
    status,
    requestIntentCreated,
    noNetworkOnly: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    reasons
  });
}

function sanitizeRequestIntentResult(
  partial: Partial<NaverApiTokenFirstTestRequestIntentResult>
): NaverApiTokenFirstTestRequestIntentResult {
  return {
    ok: Boolean(partial.ok),
    status: partial.status || 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_SEALED_NO_NETWORK',
    
    // 허용된 플래그
    requestIntentCreated: Boolean(partial.requestIntentCreated),
    noNetworkOnly: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,

    // 무조건 false 플래그
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
    
    reasons: Array.isArray(partial.reasons) ? partial.reasons.map(String) : [],
  };
}
