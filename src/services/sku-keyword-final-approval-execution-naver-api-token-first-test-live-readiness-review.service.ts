/**
 * Task 34 - Live Token Test Readiness Review / Manual Go-No-Go Checklist
 *
 * 이 서비스는 실제 최초 Naver API token 발급 테스트 1회를 하기 전에,
 * 사람이 최종적으로 확인할 수 있는 “Manual Go / No-Go Readiness Review” 구조를 제공합니다.
 *
 * 이 코드는 실제 요청을 만들지 않고, 7개의 하위 안전 계층의 결과를 종합하여
 * "실행 전 사람이 검토를 시작할 준비가 되었는지"에 대한 상태(Readiness)만 반환합니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';
import type { NaverApiTokenFirstTestFinalApprovalAuditResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import type { NaverApiTokenFirstTestPreflightNoNetworkHarnessResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-preflight-no-network-harness.service';
import type { NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-network-kill-switch-boundary.service';
import type { NaverApiTokenFirstTestRequestIntentResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-intent-builder.service';
import type { NaverApiTokenFirstTestRequestCoordinatorResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-request-coordinator-sealed.service';

export type NaverApiTokenFirstTestLiveReadinessStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_READY_FOR_MANUAL_REVIEW'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_EXECUTOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_FINAL_APPROVAL'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_PREFLIGHT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_NETWORK_KILL_SWITCH'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_REQUEST_INTENT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_COORDINATOR'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_REVIEW_ONLY_EXECUTION_DISABLED';

export interface NaverApiTokenFirstTestLiveReadinessChecklistItem {
  key: string;
  description: string;
}

export interface NaverApiTokenFirstTestLiveReadinessInput {
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;
  executorResult?: NaverApiTokenFirstTestExecutorDisabledResult | null;
  finalApprovalAuditResult?: NaverApiTokenFirstTestFinalApprovalAuditResult | null;
  preflightResult?: NaverApiTokenFirstTestPreflightNoNetworkHarnessResult | null;
  networkKillSwitchResult?: NaverApiTokenFirstTestNetworkKillSwitchBoundaryResult | null;
  requestIntentResult?: NaverApiTokenFirstTestRequestIntentResult | null;
  coordinatorResult?: NaverApiTokenFirstTestRequestCoordinatorResult | null;

  queueEnabled?: boolean;
  workerEnabled?: boolean;
  liveExecutionEnabled?: boolean;
}

export interface NaverApiTokenFirstTestLiveReadinessResult {
  ok: boolean;
  status: NaverApiTokenFirstTestLiveReadinessStatus;

  reviewEvaluated: boolean;
  manualReviewRequired: boolean;
  readyForManualGoNoGoReview: boolean;
  dryRunOnly: boolean;
  sealedForFutureExplicitApproval: boolean;
  requiresSeparateLiveApproval: boolean;

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

  manualChecklist: NaverApiTokenFirstTestLiveReadinessChecklistItem[];
  reasons: string[];
}

export function evaluateNaverApiTokenFirstTestLiveReadinessReview(
  input?: NaverApiTokenFirstTestLiveReadinessInput | null
): NaverApiTokenFirstTestLiveReadinessResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];
  const manualChecklist: NaverApiTokenFirstTestLiveReadinessChecklistItem[] = [
    { key: 'SEPARATE_TASK', description: '실제 token 발급 테스트는 이 계층이 아닌 별도 Task와 시스템 승인 절차를 통해서만 실행 가능해야 합니다.' },
    { key: 'SINGLE_EXECUTION_ONLY', description: '발급 테스트는 엄격히 1회만 허용해야 하며, 재시도를 자동화해서는 안 됩니다.' },
    { key: 'NO_CATALOG_READ', description: '발급된 권한으로 상품 조회 API를 호출하는 것은 철저히 금지됩니다.' },
    { key: 'NO_CATALOG_WRITE', description: '발급된 권한으로 상품 수정 API를 호출하는 것은 철저히 금지됩니다.' },
    { key: 'NO_QUEUE_WORKER', description: '이 과정은 Queue 또는 Worker에 위임되거나 연결되어서는 안 됩니다.' },
    { key: 'NO_TOKEN_STORAGE', description: '테스트용이든 실제든 token 원문을 영구 저장소에 저장하는 것은 절대 금지됩니다.' },
    { key: 'NO_TOKEN_LOGGING', description: 'token 또는 비밀키의 원문이나 일부분이라도 시스템 로그에 출력되어서는 안 됩니다.' },
    { key: 'NO_TOKEN_UI_DISPLAY', description: '발급받은 token을 UI 상에 그대로 표시하는 것은 금지됩니다.' },
    { key: 'IMMEDIATE_DISPOSAL', description: '테스트가 성공하여 token을 수신하더라도 검증 즉시 메모리에서 폐기해야 합니다.' },
    { key: 'NO_AUTO_RETRY_ON_FAIL', description: '테스트가 실패하더라도 시스템이 자동으로 재시도하도록 허용해서는 안 됩니다.' },
    { key: 'REQUIRE_MANUAL_NEXT_STEP', description: '다음 단계(실제 발급)로 넘어가려면 별도의 수동(Manual) 명시적 승인 절차가 필요합니다.' }
  ];

  let status: NaverApiTokenFirstTestLiveReadinessStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_REVIEW_ONLY_EXECUTION_DISABLED';
  let ok = false;
  let readyForManualGoNoGoReview = false;

  // 기본 차단 검사
  if (safeInput.queueEnabled) reasons.push('Queue 실행 모드는 검토 단계에서도 금지되어 있습니다.');
  if (safeInput.workerEnabled) reasons.push('Worker 실행 모드는 검토 단계에서도 금지되어 있습니다.');
  if (safeInput.liveExecutionEnabled) reasons.push('Live 실행 모드는 검토 단계에서도 금지되어 있습니다.');

  // 1. Safety Boundary
  if (!safeInput.safetyBoundaryResult || !safeInput.safetyBoundaryResult.ok || safeInput.safetyBoundaryResult.status !== 'READY_BUT_DISABLED') {
    reasons.push('Safety Boundary가 통과되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_SAFETY_BOUNDARY';
  }
  // 2. Executor
  else if (!safeInput.executorResult || !safeInput.executorResult.ok || safeInput.executorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED') {
    reasons.push('Executor가 안전한 상태가 아닙니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_EXECUTOR';
  }
  // 3. Final Approval Audit
  else if (!safeInput.finalApprovalAuditResult || !safeInput.finalApprovalAuditResult.ok || safeInput.finalApprovalAuditResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
    reasons.push('Final Approval 기록이 유효하지 않습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_FINAL_APPROVAL';
  }
  // 4. Preflight
  else if (!safeInput.preflightResult || !safeInput.preflightResult.ok || safeInput.preflightResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_PREFLIGHT_READY_BUT_NO_NETWORK') {
    reasons.push('Preflight 하네스를 통과하지 못했습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_PREFLIGHT';
  }
  // 5. Network Kill-Switch
  else if (!safeInput.networkKillSwitchResult || !safeInput.networkKillSwitchResult.ok || safeInput.networkKillSwitchResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_NETWORK_READY_BUT_HARD_DISABLED') {
    reasons.push('Network Kill-Switch가 안전하지 않습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_NETWORK_KILL_SWITCH';
  }
  // 6. Request Intent
  else if (!safeInput.requestIntentResult || !safeInput.requestIntentResult.ok || safeInput.requestIntentResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_REQUEST_INTENT_READY_BUT_SEALED') {
    reasons.push('Request Intent가 올바르게 생성/봉인되지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_REQUEST_INTENT';
  }
  // 7. Coordinator
  else if (!safeInput.coordinatorResult || !safeInput.coordinatorResult.ok || safeInput.coordinatorResult.status !== 'NAVER_AUTH_TOKEN_FIRST_TEST_COORDINATOR_SEALED_READY') {
    reasons.push('Coordinator가 올바르게 작동하지 않았습니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_NO_GO_BY_COORDINATOR';
  }

  // 모든 조건 통과 (단, 실행은 철저히 금지)
  if (reasons.length === 0) {
    ok = true;
    readyForManualGoNoGoReview = true;
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_READY_FOR_MANUAL_REVIEW';
    reasons.push('모든 안전 계층 점검이 완료되었으며 사람이 최종적으로 Go/No-Go를 결정할 준비가 되었습니다. 실제 권한 요청은 발생하지 않습니다.');
  }

  return sanitizeReadinessResult({
    ok,
    status,
    reviewEvaluated: true,
    manualReviewRequired: true,
    readyForManualGoNoGoReview,
    dryRunOnly: true,
    sealedForFutureExplicitApproval: true,
    requiresSeparateLiveApproval: true,
    manualChecklist,
    reasons
  });
}

function sanitizeReadinessResult(
  partial: Partial<NaverApiTokenFirstTestLiveReadinessResult>
): NaverApiTokenFirstTestLiveReadinessResult {
  return {
    ok: Boolean(partial.ok),
    status: partial.status || 'NAVER_AUTH_TOKEN_FIRST_TEST_LIVE_READINESS_REVIEW_ONLY_EXECUTION_DISABLED',
    reviewEvaluated: Boolean(partial.reviewEvaluated),
    manualReviewRequired: Boolean(partial.manualReviewRequired),
    readyForManualGoNoGoReview: Boolean(partial.readyForManualGoNoGoReview),
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

    manualChecklist: Array.isArray(partial.manualChecklist) ? partial.manualChecklist : [],
    reasons: Array.isArray(partial.reasons) ? partial.reasons.map(String) : []
  };
}
