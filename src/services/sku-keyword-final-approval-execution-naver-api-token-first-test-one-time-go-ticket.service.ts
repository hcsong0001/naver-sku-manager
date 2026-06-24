/**
 * Task 35 - One-Time Live Token Test Go Ticket / Execution Lease Skeleton
 *
 * 이 서비스는 실제 최초 Naver API token 발급 테스트 1회를 하기 전에,
 * 나중에 실제 실행을 허용할 때 필요한 "1회성 Go Ticket / Execution Lease 구조"의
 * 순수 함수 뼈대를 제공합니다.
 *
 * 이 코드는 실제 실행 권한을 여는 것이 아니라,
 * 이전 모든 계층의 조건과 1회성/만료 조건 등을 모두 만족해야만
 * 미래의 별도 Task에서 사용할 수 있는 "1회성 티켓 후보(Plan)"를 만들 수 있다는 것을 정의합니다.
 */

import type { NaverApiTokenFirstTestLiveReadinessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-live-readiness-review.service';
import type { NaverApiTokenFirstTestRequestCoordinatorResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-coordinator-sealed.service';
import type { NaverApiTokenFirstTestRequestIntentResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-intent-builder.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';

export type NaverApiTokenFirstTestGoTicketStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_READY_BUT_EXECUTION_DISABLED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_LIVE_READINESS'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_COORDINATOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_REQUEST_INTENT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_NETWORK_KILL_SWITCH'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_PREFLIGHT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_FINAL_APPROVAL'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_EXECUTOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_DUPLICATE_BLOCKED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_REUSED_BLOCKED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_EXPIRED_BLOCKED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_REVIEW_ONLY';

export interface NaverApiTokenFirstTestGoTicketInput {
  liveReadinessResult?: NaverApiTokenFirstTestLiveReadinessResult | null;
  coordinatorResult?: NaverApiTokenFirstTestRequestCoordinatorResult | null;
  requestIntentResult?: NaverApiTokenFirstTestRequestIntentResult | null;
  networkKillSwitchResult?: NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult | null;
  preflightResult?: NaverApiTokenFirstTestPreflightNoNetworkHarnessResult | null;
  finalApprovalAuditResult?: NaverApiTokenFirstTestFinalApprovalAuditResult | null;
  executorResult?: NaverApiTokenFirstTestExecutorDisabledResult | null;
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;

  isDuplicateTicket?: boolean;
  isReusedTicket?: boolean;
  isExpiredTicket?: boolean;

  queueEnabled?: boolean;
  workerEnabled?: boolean;
  liveExecutionEnabled?: boolean;
}

export interface NaverApiTokenFirstTestGoTicketResult {
  ok: boolean;
  status: NaverApiTokenFirstTestGoTicketStatus;

  goTicketPlanCreated: boolean;
  executionLeasePlanCreated: boolean;
  oneTimeOnly: boolean;
  manualReviewRequired: boolean;
  sealedForFutureExplicitApproval: boolean;
  requiresSeparateLiveApproval: boolean;

  goTicketIssued: false;
  executionLeaseIssued: false;
  liveTokenTestApproved: false;
  liveTokenTestExecutionAllowed: false;
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

export function evaluateNaverApiTokenFirstTestOneTimeGoTicket(
  input?: NaverApiTokenFirstTestGoTicketInput | null
): NaverApiTokenFirstTestGoTicketResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];
  let status: NaverApiTokenFirstTestGoTicketStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_REVIEW_ONLY';
  let ok = false;

  // 기본 환경 검사
  if (safeInput.queueEnabled) reasons.push('Queue 실행 모드는 금지되어 있습니다.');
  if (safeInput.workerEnabled) reasons.push('Worker 실행 모드는 금지되어 있습니다.');
  if (safeInput.liveExecutionEnabled) reasons.push('Live 실행 모드는 금지되어 있습니다.');

  // 티켓 상태 검증 (1회성, 만료 등)
  if (safeInput.isDuplicateTicket) {
    reasons.push('중복된 티켓 발급 요청입니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_DUPLICATE_BLOCKED';
  } else if (safeInput.isReusedTicket) {
    reasons.push('이미 사용된(재사용) 티켓입니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_REUSED_BLOCKED';
  } else if (safeInput.isExpiredTicket) {
    reasons.push('만료된 티켓입니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_EXPIRED_BLOCKED';
  }
  // 하위 계층 검증 (역순 8->1)
  else if (!safeInput.safetyBoundaryResult || !safeInput.safetyBoundaryResult.ok || safeInput.safetyBoundaryResult.status !== 'READY_BUT_DISABLED') {
    reasons.push('Safety Boundary가 통과되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_SAFETY_BOUNDARY';
  } else if (!safeInput.executorResult || !safeInput.executorResult.ok || safeInput.executorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED') {
    reasons.push('Executor가 안전한 상태가 아닙니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_EXECUTOR';
  } else if (!safeInput.finalApprovalAuditResult || !safeInput.finalApprovalAuditResult.ok || safeInput.finalApprovalAuditResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
    reasons.push('Final Approval 기록이 유효하지 않습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_FINAL_APPROVAL';
  } else if (!safeInput.preflightResult || !safeInput.preflightResult.ok || safeInput.preflightResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK') {
    reasons.push('Preflight 하네스를 통과하지 못했습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_PREFLIGHT';
  } else if (!safeInput.networkKillSwitchResult || !safeInput.networkKillSwitchResult.ok || safeInput.networkKillSwitchResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED') {
    reasons.push('Network Kill-Switch가 안전하지 않습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_NETWORK_KILL_SWITCH';
  } else if (!safeInput.requestIntentResult || !safeInput.requestIntentResult.ok || safeInput.requestIntentResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED') {
    reasons.push('Request Intent가 올바르게 생성/봉인되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_REQUEST_INTENT';
  } else if (!safeInput.coordinatorResult || !safeInput.coordinatorResult.ok || safeInput.coordinatorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_READY') {
    reasons.push('Coordinator가 올바르게 작동하지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_COORDINATOR';
  } else if (!safeInput.liveReadinessResult || !safeInput.liveReadinessResult.ok || safeInput.liveReadinessResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_READY_FOR_MANUAL_REVIEW') {
    reasons.push('Live Readiness Review가 통과되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_BLOCKED_BY_LIVE_READINESS';
  }

  let goTicketPlanCreated = false;
  let executionLeasePlanCreated = false;

  // 모든 조건 통과 (단, 실제 티켓 발급은 금지, 플랜만 생성됨)
  if (reasons.length === 0) {
    ok = true;
    goTicketPlanCreated = true;
    executionLeasePlanCreated = true;
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_READY_BUT_EXECUTION_DISABLED';
    reasons.push('미래에 별도 승인 후 발급할 수 있는 티켓 후보(Plan)가 안전하게 생성되었습니다. 실제 발급이나 실행 권한은 부여되지 않습니다.');
  }

  return sanitizeTicketResult({
    ok,
    status,
    goTicketPlanCreated,
    executionLeasePlanCreated,
    reasons
  });
}

function sanitizeTicketResult(
  partial: Partial<NaverApiTokenFirstTestGoTicketResult>
): NaverApiTokenFirstTestGoTicketResult {
  return {
    ok: Boolean(partial.ok),
    status: partial.status || 'NAVER_AUTH_TOKEN_FIRST_TEST_GO_TICKET_REVIEW_ONLY',
    goTicketPlanCreated: Boolean(partial.goTicketPlanCreated),
    executionLeasePlanCreated: Boolean(partial.executionLeasePlanCreated),
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

    reasons: Array.isArray(partial.reasons) ? partial.reasons.map(String) : []
  };
}
