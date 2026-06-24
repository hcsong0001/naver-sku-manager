/**
 * Naver API Token First Test Final Approval Audit
 *
 * 최초 Naver API token 발급 테스트 직전의 "마지막 명시적 사용자 승인"을 처리하는 서비스입니다.
 * 이 서비스는 승인 기록 구조만 생성하며, 실제 토큰 발급, 네트워크 요청, URL 노출 등은 일절 하지 않습니다.
 * 승인 기록이 완료되어도 실행은 항상 disabled (tokenRequestAllowed=false, executorArmed=false) 상태입니다.
 */

import type { NaverApiTokenFirstTestSafetyBoundaryResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import type { NaverApiTokenFirstTestExecutorDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-first-test-executor-disabled.service';

export type NaverApiTokenFirstTestFinalApprovalAuditStatus =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_EXECUTOR_DISABLED'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_REJECTED_MISSING_ACKNOWLEDGEMENT'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_DUPLICATE_BLOCKED';

export const FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS = [
  'CONFIRM_ONLY_ONE_FIRST_TOKEN_TEST',
  'REJECT_PRODUCT_READ_API',
  'REJECT_PRODUCT_UPDATE_API',
  'REJECT_QUEUE_EXECUTION',
  'REJECT_WORKER_EXECUTION',
  'REJECT_LIVE_EXECUTION',
  'FORBID_TOKEN_RAW_STORAGE',
  'FORBID_TOKEN_LOGGING',
  'FORBID_TOKEN_UI_DISPLAY',
  'FORBID_AUTHORIZATION_HEADER_CREATION',
  'CONFIRM_TOKEN_SUCCESS_DOES_NOT_ALLOW_PRODUCT_API',
  'CONFIRM_NO_AUTO_RETRY_ON_FAILURE',
  'CONFIRM_TOKEN_IMMEDIATE_DISPOSAL_ON_SUCCESS',
  'CONFIRM_NEXT_STEP_REQUIRES_SEPARATE_APPROVAL',
] as const;

export type FinalApprovalAcknowledgementKey = typeof FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS[number];

export const FINAL_APPROVAL_STATEMENT =
  '최초 Naver API token 발급 테스트 1회를 승인합니다. 이 테스트는 상품 수정 API 호출, 상품 조회 API 호출, Queue/Worker 실행, Live 실행과 연결하지 않으며, token 원문을 저장·출력·로그·UI 표시하지 않습니다.';

export interface NaverApiTokenFirstTestFinalApprovalAuditRecord {
  approvalRecorded: boolean;
  approvalRecordedAt?: string;
  approvalScope: 'FIRST_TOKEN_TEST_ONLY';
  approvedByRole: 'USER';
  acknowledgementVersion: string;
  acknowledgementCount: number;
  approvedAcknowledgementKeys: string[];
  safetyBoundaryStatus: string;
  executorStatus: string;

  tokenRequestAllowed: false;
  executorArmed: false;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  clientSecretUsed: false;
  clientSecretSignCreated: false;
  naverApiCallAllowed: false;
  endpointResolved: false;
  endpointCalled: false;
  httpRequestCreated: false;
  httpClientCreated: false;
  authorizationHeaderCreated: false;
  tokenIssued: false;
  tokenStored: false;
  queueAllowed: false;
  workerAllowed: false;
  liveExecutionEnabled: false;
}

export interface NaverApiTokenFirstTestFinalApprovalAuditInput {
  safetyBoundaryResult?: NaverApiTokenFirstTestSafetyBoundaryResult | null;
  executorResult?: NaverApiTokenFirstTestExecutorDisabledResult | null;
  /** Task 25에서 저장된 approval audit 결과 확인 (필수) */
  task25ApprovalPresent?: boolean;
  /** 이번 승인에서 사용자가 동의한 acknowledgement 키 목록 */
  acknowledgedKeys?: string[];
  /** 이미 저장된 final approval이 있는지 */
  existingFinalApprovalRecord?: unknown | null;
  /** Ignored — queue/worker는 항상 차단 */
  queueEnabled?: boolean;
  /** Ignored — queue/worker는 항상 차단 */
  workerEnabled?: boolean;
  /** Ignored — live execution은 항상 차단 */
  liveExecutionEnabled?: boolean;
  finalApprovalStatus?: string | null;
  batchJobStatus?: string | null;
  itemStatuses?: string[] | null;
  itemCount?: number | null;
}

export interface NaverApiTokenFirstTestFinalApprovalAuditResult {
  ok: boolean;
  status: NaverApiTokenFirstTestFinalApprovalAuditStatus;
  recordPlan: NaverApiTokenFirstTestFinalApprovalAuditRecord | null;
  reasons: string[];
  missingKeys: string[];
}

export function evaluateNaverApiTokenFirstTestFinalApprovalAudit(
  input?: NaverApiTokenFirstTestFinalApprovalAuditInput | null
): NaverApiTokenFirstTestFinalApprovalAuditResult {
  const safeInput = input ?? {};
  const reasons: string[] = [];
  const missingKeys: string[] = [];
  let status: NaverApiTokenFirstTestFinalApprovalAuditStatus = 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED';
  let ok = false;

  // 1. 기본 조건 확인 (Queue, Live 차단)
  if (safeInput.queueEnabled) reasons.push('Queue 실행은 차단됩니다.');
  if (safeInput.workerEnabled) reasons.push('Worker 실행은 차단됩니다.');
  if (safeInput.liveExecutionEnabled) reasons.push('Live 실행은 차단됩니다.');

  // 2. Task 25 Approval 확인
  if (!safeInput.task25ApprovalPresent) {
    reasons.push('이전 단계의 Task 25 Approval Audit 기록이 존재하지 않습니다.');
  }

  // 3. Duplicate Record
  if (safeInput.existingFinalApprovalRecord) {
    reasons.push('이미 Final Approval Audit 기록이 존재합니다.');
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_DUPLICATE_BLOCKED';
  }

  // 4. BatchJob & FinalApproval & Item 조건
  if (safeInput.finalApprovalStatus !== 'ACTIVE') {
    reasons.push(`FinalApproval이 ACTIVE가 아닙니다. (${safeInput.finalApprovalStatus})`);
  }
  if (safeInput.batchJobStatus !== 'APPROVED') {
    reasons.push(`BatchJob이 APPROVED가 아닙니다. (${safeInput.batchJobStatus})`);
  }
  if (safeInput.itemCount !== 1) {
    reasons.push(`단일 항목 조건 위반. (count=${safeInput.itemCount})`);
  }
  if (safeInput.itemStatuses && safeInput.itemStatuses.some(s => s !== 'READY')) {
    reasons.push('READY 상태가 아닌 BatchJobItem이 포함되어 있습니다.');
  }

  // 5. Safety Boundary
  const boundary = safeInput.safetyBoundaryResult;
  if (!boundary || boundary.status === 'BLOCKED') {
    reasons.push('Safety Boundary가 BLOCKED 상태입니다.');
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_SAFETY_BOUNDARY';
    }
  }

  // 6. Executor Disabled Skeleton
  const executor = safeInput.executorResult;
  if (
    !executor ||
    executor.status === 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_BLOCKED_BY_SAFETY_BOUNDARY' ||
    executor.status === 'NAVER_AUTH_TOKEN_FIRST_TEST_EXECUTOR_DISABLED'
  ) {
    reasons.push('Executor가 올바른 READY_BUT_NOT_ARMED 또는 APPROVAL_CONFIRMED 상태가 아닙니다.');
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_EXECUTOR_DISABLED';
    }
  }

  // 7. Acknowledgement 검증
  const providedKeys = new Set(safeInput.acknowledgedKeys || []);
  for (const requiredKey of FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS) {
    if (!providedKeys.has(requiredKey)) {
      missingKeys.push(requiredKey);
    }
  }

  if (missingKeys.length > 0) {
    reasons.push(`필수 동의 항목이 누락되었습니다. (${missingKeys.length}개)`);
    if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
      status = 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_REJECTED_MISSING_ACKNOWLEDGEMENT';
    }
  }

  if (reasons.length === 0) {
    ok = true;
  } else if (status === 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_RECORDED_BUT_EXECUTION_DISABLED') {
    // 이유가 있는데 상태가 RECORDED로 남은 경우 (예: Task 25 부재 등), BLOCKED_BY_SAFETY_BOUNDARY 로 통일
    status = 'NAVER_AUTH_TOKEN_FIRST_TEST_FINAL_APPROVAL_BLOCKED_BY_SAFETY_BOUNDARY';
  }

  let recordPlan: NaverApiTokenFirstTestFinalApprovalAuditRecord | null = null;

  if (ok) {
    recordPlan = {
      approvalRecorded: true,
      approvalRecordedAt: new Date().toISOString(),
      approvalScope: 'FIRST_TOKEN_TEST_ONLY',
      approvedByRole: 'USER',
      acknowledgementVersion: 'v1',
      acknowledgementCount: FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS.length,
      approvedAcknowledgementKeys: [...FINAL_APPROVAL_ACKNOWLEDGEMENT_KEYS],
      safetyBoundaryStatus: boundary?.status || 'UNKNOWN',
      executorStatus: executor?.status || 'UNKNOWN',
      tokenRequestAllowed: false,
      executorArmed: false,
      tokenRequestPrepared: false,
      tokenRequestExecuted: false,
      accessTokenRequested: false,
      refreshTokenRequested: false,
      credentialsUsed: false,
      clientSecretUsed: false,
      clientSecretSignCreated: false,
      naverApiCallAllowed: false,
      endpointResolved: false,
      endpointCalled: false,
      httpRequestCreated: false,
      httpClientCreated: false,
      authorizationHeaderCreated: false,
      tokenIssued: false,
      tokenStored: false,
      queueAllowed: false,
      workerAllowed: false,
      liveExecutionEnabled: false,
    };
  }

  return {
    ok,
    status,
    recordPlan,
    reasons,
    missingKeys,
  };
}

export function sanitizeStoredFinalApprovalAuditRecord(
  rawRecord: unknown | null
): NaverApiTokenFirstTestFinalApprovalAuditRecord | null {
  if (!rawRecord || typeof rawRecord !== 'object') return null;

  const r = rawRecord as Partial<NaverApiTokenFirstTestFinalApprovalAuditRecord>;
  if (!r.approvalRecorded) return null;

  return {
    approvalRecorded: true,
    approvalRecordedAt: typeof r.approvalRecordedAt === 'string' ? r.approvalRecordedAt : undefined,
    approvalScope: 'FIRST_TOKEN_TEST_ONLY',
    approvedByRole: 'USER',
    acknowledgementVersion: typeof r.acknowledgementVersion === 'string' ? r.acknowledgementVersion : 'v1',
    acknowledgementCount: typeof r.acknowledgementCount === 'number' ? r.acknowledgementCount : 0,
    approvedAcknowledgementKeys: Array.isArray(r.approvedAcknowledgementKeys)
      ? r.approvedAcknowledgementKeys.filter(k => typeof k === 'string')
      : [],
    safetyBoundaryStatus: typeof r.safetyBoundaryStatus === 'string' ? r.safetyBoundaryStatus : 'UNKNOWN',
    executorStatus: typeof r.executorStatus === 'string' ? r.executorStatus : 'UNKNOWN',
    tokenRequestAllowed: false,
    executorArmed: false,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    clientSecretUsed: false,
    clientSecretSignCreated: false,
    naverApiCallAllowed: false,
    endpointResolved: false,
    endpointCalled: false,
    httpRequestCreated: false,
    httpClientCreated: false,
    authorizationHeaderCreated: false,
    tokenIssued: false,
    tokenStored: false,
    queueAllowed: false,
    workerAllowed: false,
    liveExecutionEnabled: false,
  };
}
