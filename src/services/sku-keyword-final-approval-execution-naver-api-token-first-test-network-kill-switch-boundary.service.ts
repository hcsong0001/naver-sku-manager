/**
 * Task 31 - Token First Test Network Kill-Switch Boundary / Disabled Network Adapter Skeleton
 *
 * 이 서비스는 네트워크 실행을 막는 Kill-Switch Boundary와 Disabled Network Adapter Skeleton입니다.
 * 실제 네트워크 요청 함수가 아니라 "네트워크 실행이 현재 명시적으로 차단되어 있다"는 것을
 * 코드 구조와 결과 객체로 보장하는 단계입니다.
 *
 * 절대 규칙:
 * 1. 이 모듈은 순수 함수이며 네트워크 호출, DB 변경 등 부작용이 전혀 없습니다.
 * 2. networkExecutionAllowed, tokenRequestAllowed, endpointResolved 등의 실행 관련 플래그는 모두 false입니다.
 * 3. endpoint URL, authorization header, fetch/axios/http client, token 발급 로직이 일절 포함되지 않습니다.
 */

import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';

export type NaverApiTokenFirstTestNetworkKillSwitchBoundaryStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_EXECUTOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_FINAL_APPROVAL'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_ADAPTER_DISABLED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED';

export interface NaverApiTokenFirstTestNetworkKillSwitchBoundaryInput {
  preflightResult?: NaverApiTokenFirstTestPreflightNoNetworkHarnessResult | null;
  finalApprovalAuditResult?: NaverApiTokenFirstTestFinalApprovalAuditResult | null;
  executorResult?: NaverApiTokenFirstTestExecutorDisabledResult | null;

  networkAdapterEnabledInput?: boolean;
  killSwitchOpenInput?: boolean;

  queueEnabled?: boolean;
  workerEnabled?: boolean;
  liveExecutionEnabled?: boolean;
}

export interface NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult {
  ok: boolean;
  status: NaverApiTokenFirstTestNetworkKillSwitchBoundaryStatus;

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

export function evaluateNaverApiTokenFirstTestNetworkKillSwitchBoundary(
  input?: NaverApiTokenFirstTestNetworkKillSwitchBoundaryInput | null
): NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];

  let status: NaverApiTokenFirstTestNetworkKillSwitchBoundaryStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED';
  let ok = false;

  // 1. Queue, Worker, LiveExecution 원천 차단
  if (safeInput.queueEnabled) {
    reasons.push('Queue 실행 모드는 지원되지 않습니다.');
  }
  if (safeInput.workerEnabled) {
    reasons.push('Worker 실행 모드는 지원되지 않습니다.');
  }
  if (safeInput.liveExecutionEnabled) {
    reasons.push('Live 실행 모드는 지원되지 않습니다.');
  }

  // 2. 외부에서 networkAdapterEnabledInput, killSwitchOpenInput 을 켜서 시도한 경우 차단
  if (safeInput.networkAdapterEnabledInput) {
    reasons.push('외부에서 network adapter를 켜려는 시도가 감지되어 차단합니다.');
  }
  if (safeInput.killSwitchOpenInput) {
    reasons.push('외부에서 kill switch를 열려는 시도가 감지되어 차단합니다.');
  }

  // 3. Preflight 체크
  if (!safeInput.preflightResult) {
    reasons.push('Preflight No-Network Harness 결과가 없습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT';
  } else if (!safeInput.preflightResult.ok || safeInput.preflightResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK') {
    reasons.push('Preflight 하네스를 통과하지 못했습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_PREFLIGHT';
  }

  // 4. Final Approval 체크
  if (!safeInput.finalApprovalAuditResult) {
    reasons.push('Final Approval Audit 결과가 없습니다.');
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_FINAL_APPROVAL';
    }
  } else if (!safeInput.finalApprovalAuditResult.ok || safeInput.finalApprovalAuditResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
    reasons.push('Final Approval 기록이 유효하지 않습니다.');
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_FINAL_APPROVAL';
    }
  }

  // 5. Executor 체크
  if (!safeInput.executorResult) {
    reasons.push('Executor 결과가 없습니다.');
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_EXECUTOR';
    }
  } else if (!safeInput.executorResult.ok || safeInput.executorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED') {
    reasons.push('Executor가 올바른 상태(READY_BUT_NOT_ARMED)가 아닙니다.');
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_BLOCKED_BY_EXECUTOR';
    }
  }

  // 6. 모든 조건이 통과된 경우 (하지만 여전히 강제 차단)
  if (reasons.length === 0) {
    ok = true;
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED';
    reasons.push('모든 선행 조건이 충족되었으나, 현재 단계에서는 네트워크 실행이 명시적으로 차단되어 있습니다.');
  }

  return sanitizeNetworkKillSwitchResult({
    ok,
    status,
    reasons
  });
}

/**
 * 네트워크 어댑터가 호출되더라도 어떠한 실제 네트워크 요청이나 토큰 요청 행위를 하지 않고,
 * disabled 상태를 반환하도록 하는 Skeleton 함수.
 */
export function executeDisabledNetworkAdapterSkeleton(): NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult {
  return sanitizeNetworkKillSwitchResult({
    ok: false,
    status: 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_ADAPTER_DISABLED',
    reasons: ['네트워크 어댑터가 비활성화되어 있습니다. 어떠한 외부 요청도 수행되지 않습니다.']
  });
}

function sanitizeNetworkKillSwitchResult(
  partial: Partial<NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult>
): NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult {
  return {
    ok: Boolean(partial.ok),
    status: partial.status || 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_KILL_SWITCH_DISABLED',
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
