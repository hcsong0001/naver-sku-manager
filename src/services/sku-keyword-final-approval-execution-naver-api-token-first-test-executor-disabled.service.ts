/**
 * Naver API Token First Test Executor Disabled Skeleton
 *
 * 최초 Naver API token 발급 테스트를 위한 "Executor 구조"만 준비합니다.
 * 실제 네트워크 호출은 절대 하지 않으며, HTTP client, endpoint, authorization header도 만들지 않습니다.
 *
 * Safety Boundary 결과를 받아 실행 가능 여부를 판단하지만,
 * 모든 조건이 통과되어도 실행은 항상 disabled 상태를 유지합니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';

export type NaverApiTokenFirstTestExecutorDisabledStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_APPROVAL_CONFIRMED_BUT_EXECUTION_DISABLED';

export interface NaverApiTokenFirstTestExecutorDisabledResult {
  ok: boolean;
  status: NaverApiTokenFirstTestExecutorDisabledStatus;

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

export interface NaverApiTokenFirstTestExecutorDisabledInput {
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;
  /** Ignored — queue/worker는 항상 차단 */
  queueEnabled?: boolean;
  /** Ignored — queue/worker는 항상 차단 */
  workerEnabled?: boolean;
  /** Ignored — live execution은 항상 차단 */
  liveExecutionEnabled?: boolean;
}

/**
 * Token First Test Executor Disabled 평가 함수
 */
export function evaluateNaverApiTokenFirstTestExecutorDisabled(
  input?: NaverApiTokenFirstTestExecutorDisabledInput | null
): NaverApiTokenFirstTestExecutorDisabledResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];

  let status: NaverApiTokenFirstTestExecutorDisabledStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED';
  let ok = false;

  if (safeInput.queueEnabled) {
    reasons.push('Queue 실행은 차단됩니다.');
  }
  if (safeInput.workerEnabled) {
    reasons.push('Worker 실행은 차단됩니다.');
  }
  if (safeInput.liveExecutionEnabled) {
    reasons.push('Live 실행은 차단됩니다.');
  }

  const boundary = safeInput.safetyBoundaryResult;
  if (!boundary) {
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY';
    reasons.push('Safety Boundary 결과가 제공되지 않았습니다.');
  } else if (boundary.status === 'BLOCKED') {
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY';
    reasons.push('Safety Boundary가 BLOCKED 상태입니다.');
  } else if (boundary.status === 'NEEDS_REVIEW') {
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_APPROVAL_CONFIRMED_BUT_EXECUTION_DISABLED';
    reasons.push('Safety Boundary가 NEEDS_REVIEW 상태입니다.');
  } else if (boundary.status === 'READY_BUT_DISABLED') {
    // Safety boundary 통과 상태
    if (boundary.readyForExplicitTokenTestApproval) {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_READY_BUT_NOT_ARMED';
      ok = true;
      reasons.push('Safety Boundary의 모든 조건을 통과했습니다. 명시적 승인이 완료되었으나 실행은 Disabled 상태입니다.');
    } else {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_APPROVAL_CONFIRMED_BUT_EXECUTION_DISABLED';
      reasons.push('Safety Boundary 조건은 통과했으나 명시적 승인이 확인되지 않았습니다.');
    }
  }

  if (!ok && reasons.length === 0) {
    reasons.push('실행이 비활성화되었습니다.');
  }

  return sanitizeNaverApiTokenFirstTestExecutorDisabledResult({
    ok,
    status,
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
    reasons,
  });
}

/**
 * 모든 금지된 플래그가 false임을 강제하는 방어 함수
 */
function sanitizeNaverApiTokenFirstTestExecutorDisabledResult(
  result: any
): NaverApiTokenFirstTestExecutorDisabledResult {
  const safeReasons = Array.isArray(result?.reasons)
    ? result.reasons.map((r: any) => String(r))
    : [];

  return {
    ok: Boolean(result?.ok),
    status: result?.status || 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED',
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
    reasons: safeReasons,
  };
}
