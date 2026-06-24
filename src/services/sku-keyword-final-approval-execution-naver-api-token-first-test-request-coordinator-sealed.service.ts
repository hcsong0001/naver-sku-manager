/**
 * Task 33 - Token First Test Request Coordinator / Sealed Dry-Run Orchestrator Skeleton
 *
 * 이 서비스는 Task 26~32에서 만든 모든 순수 안전 계층을 하나의 Coordinator에서 
 * 순서대로 점검하는 “봉인된 Dry-Run Orchestrator Skeleton”입니다.
 *
 * 실제 요청을 만들거나 실행하지 않고, 아래 계층의 결과를 종합해서 
 * “현재는 실행이 봉인되어 있다”는 최종 상태만 반환합니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';
import type { NaverApiTokenFirstTestRequestIntentResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-intent-builder.service';

export type NaverApiTokenFirstTestRequestCoordinatorStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_READY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_EXECUTOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_FINAL_APPROVAL'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_PREFLIGHT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_NETWORK_KILL_SWITCH'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_REQUEST_INTENT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_NO_NETWORK';

export interface NaverApiTokenFirstTestRequestCoordinatorInput {
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;
  executorResult?: NaverApiTokenFirstTestExecutorDisabledResult | null;
  finalApprovalAuditResult?: NaverApiTokenFirstTestFinalApprovalAuditResult | null;
  preflightResult?: NaverApiTokenFirstTestPreflightNoNetworkHarnessResult | null;
  networkKillSwitchResult?: NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult | null;
  requestIntentResult?: NaverApiTokenFirstTestRequestIntentResult | null;

  queueEnabled?: boolean;
  workerEnabled?: boolean;
  liveExecutionEnabled?: boolean;
  networkAdapterEnabledInput?: boolean;
  killSwitchOpenInput?: boolean;
}

export interface NaverApiTokenFirstTestRequestCoordinatorResult {
  ok: boolean;
  status: NaverApiTokenFirstTestRequestCoordinatorStatus;

  coordinatorEvaluated: boolean;
  dryRunOnly: boolean;
  sealedForFutureExplicitApproval: boolean;
  requiresSeparateLiveApproval: boolean;

  coordinatorExecutionAllowed: false;
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

export function evaluateNaverApiTokenFirstTestRequestCoordinatorSealed(
  input?: NaverApiTokenFirstTestRequestCoordinatorInput | null
): NaverApiTokenFirstTestRequestCoordinatorResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];
  let status: NaverApiTokenFirstTestRequestCoordinatorStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_NO_NETWORK';
  let ok = false;
  let coordinatorEvaluated = false;

  // 기본 차단 검사
  if (safeInput.queueEnabled) reasons.push('Queue 실행 모드는 금지되어 있습니다.');
  if (safeInput.workerEnabled) reasons.push('Worker 실행 모드는 금지되어 있습니다.');
  if (safeInput.liveExecutionEnabled) reasons.push('Live 실행 모드는 금지되어 있습니다.');
  if (safeInput.networkAdapterEnabledInput) reasons.push('네트워크 어댑터 강제 활성화 시도는 차단됩니다.');
  if (safeInput.killSwitchOpenInput) reasons.push('킬스위치 개방 시도는 차단됩니다.');

  // 1. Safety Boundary
  if (!safeInput.safetyBoundaryResult || !safeInput.safetyBoundaryResult.ok || safeInput.safetyBoundaryResult.status !== 'READY_BUT_DISABLED') {
    reasons.push('Safety Boundary가 통과되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_SAFETY_BOUNDARY';
  }

  // 2. Executor
  else if (!safeInput.executorResult || !safeInput.executorResult.ok || safeInput.executorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED') {
    reasons.push('Executor가 안전한 상태가 아닙니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_EXECUTOR';
  }

  // 3. Final Approval Audit
  else if (!safeInput.finalApprovalAuditResult || !safeInput.finalApprovalAuditResult.ok || safeInput.finalApprovalAuditResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
    reasons.push('Final Approval 기록이 유효하지 않습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_FINAL_APPROVAL';
  }

  // 4. Preflight
  else if (!safeInput.preflightResult || !safeInput.preflightResult.ok || safeInput.preflightResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK') {
    reasons.push('Preflight 하네스를 통과하지 못했습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_PREFLIGHT';
  }

  // 5. Network Kill-Switch
  else if (!safeInput.networkKillSwitchResult || !safeInput.networkKillSwitchResult.ok || safeInput.networkKillSwitchResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED') {
    reasons.push('Network Kill-Switch가 안전하지 않습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_NETWORK_KILL_SWITCH';
  }

  // 6. Request Intent
  else if (!safeInput.requestIntentResult || !safeInput.requestIntentResult.ok || safeInput.requestIntentResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED') {
    reasons.push('Request Intent가 올바르게 생성/봉인되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_BLOCKED_BY_REQUEST_INTENT';
  }

  // 모든 조건 통과 (단, 실행은 봉인된 Dry-Run 상태)
  if (reasons.length === 0) {
    ok = true;
    coordinatorEvaluated = true;
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_READY';
    reasons.push('모든 안전 계층 점검이 완료되었습니다. 실제 요청은 발생하지 않으며 Coordinator는 봉인된 상태를 유지합니다.');
  }

  return sanitizeCoordinatorResult({
    ok,
    status,
    coordinatorEvaluated,
    reasons
  });
}

function sanitizeCoordinatorResult(
  partial: Partial<NaverApiTokenFirstTestRequestCoordinatorResult>
): NaverApiTokenFirstTestRequestCoordinatorResult {
  return {
    ok: Boolean(partial.ok),
    status: partial.status || 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_NO_NETWORK',
    coordinatorEvaluated: Boolean(partial.coordinatorEvaluated),
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
    reasons: Array.isArray(partial.reasons) ? partial.reasons.map(String) : []
  };
}
