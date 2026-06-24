/**
 * Naver API Token Test Approval Audit
 *
 * Records the user's explicit acknowledgement before the first token issuance test.
 * This service does NOT issue any token. It only validates and records that the
 * user confirmed all required safety acknowledgements.
 *
 * Safety invariants enforced here:
 * - tokenRequestAllowed, accessTokenRequested, tokenIssued are ALWAYS false
 * - endpointResolved, endpointCalled, httpClientCreated are ALWAYS false
 * - No HTTP client, endpoint URL, fetch/axios, or authorization header
 * - No access token, refresh token, client secret, or credential values
 * - No masked credentials — only boolean presence checks
 * - maxAllowedState is always NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE
 */

import type { NaverApiAuthConfigSafeReaderResult } from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import type { NaverApiTokenProviderDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import type { NaverApiTokenDryPermissionGateResult } from './sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';
import type { NaverApiTokenProviderTestOnlySkeletonResult } from './sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service';
import type { EnvironmentSafetyGuardResult } from './sku-keyword-final-approval-execution-environment-safety-guard.service';

// ── Required acknowledgements ─────────────────────────────────────────────────

export const REQUIRED_ACKNOWLEDGEMENTS = [
  'CONFIRM_TOKEN_TEST_ONLY',
  'CONFIRM_NO_PRODUCT_UPDATE',
  'CONFIRM_NO_ENDPOINT_CALL_IN_THIS_STEP',
  'CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP',
  'CONFIRM_TOKEN_WILL_NOT_BE_STORED',
  'CONFIRM_TOKEN_WILL_NOT_BE_DISPLAYED',
  'CONFIRM_NO_AUTHORIZATION_HEADER_CREATED',
  'CONFIRM_NO_QUEUE_OR_WORKER',
  'CONFIRM_NO_AUTOMATIC_RETRY',
  'CONFIRM_SUCCESS_DOES_NOT_ENABLE_LIVE_EXECUTION',
  'CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST',
  'CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_PRODUCT_UPDATE',
] as const;

export type RequiredAcknowledgement = typeof REQUIRED_ACKNOWLEDGEMENTS[number];

export const ACKNOWLEDGEMENT_LABELS: Record<RequiredAcknowledgement, string> = {
  CONFIRM_TOKEN_TEST_ONLY:
    '이 작업은 token 발급 테스트 기록만을 목적으로 합니다. 실제 token 발급은 이 단계에서 실행되지 않습니다.',
  CONFIRM_NO_PRODUCT_UPDATE:
    '이 작업은 상품 수정 API와 연결되지 않습니다. 스마트스토어 상품/가격/키워드는 변경되지 않습니다.',
  CONFIRM_NO_ENDPOINT_CALL_IN_THIS_STEP:
    '이 단계에서 Naver API endpoint 호출이 발생하지 않습니다.',
  CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP:
    '이 단계에서 access token 또는 refresh token이 발급되지 않습니다.',
  CONFIRM_TOKEN_WILL_NOT_BE_STORED:
    '발급된 token은 저장되지 않습니다. (이 단계에서는 token이 발급되지 않으므로 저장도 없습니다.)',
  CONFIRM_TOKEN_WILL_NOT_BE_DISPLAYED:
    'access token, refresh token, client secret은 UI/로그에 표시되지 않습니다.',
  CONFIRM_NO_AUTHORIZATION_HEADER_CREATED:
    'Authorization header가 생성되지 않습니다.',
  CONFIRM_NO_QUEUE_OR_WORKER:
    'Queue enqueue 또는 Worker 호출이 없습니다.',
  CONFIRM_NO_AUTOMATIC_RETRY:
    '실패 시 자동 재시도가 없습니다.',
  CONFIRM_SUCCESS_DOES_NOT_ENABLE_LIVE_EXECUTION:
    '이 승인 기록 저장 성공이 Live 실행을 활성화하지 않습니다.',
  CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST:
    '실제 token 발급 테스트를 실행하려면 별도의 추가 사용자 승인이 필요합니다.',
  CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_PRODUCT_UPDATE:
    '상품 수정 API 호출을 위해서는 별도의 추가 사용자 승인이 필요합니다.',
};

// ── Types ──────────────────────────────────────────────────────────────────────

export type NaverApiTokenTestApprovalAuditCheckItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface NaverApiTokenTestApprovalAuditChecklistItem {
  key: string;
  label: string;
  status: NaverApiTokenTestApprovalAuditCheckItemStatus;
  message: string;
}

export type NaverApiTokenTestApprovalAuditResultCode =
  | 'NAVER_AUTH_TOKEN_TEST_APPROVAL_READY_BUT_TOKEN_REQUEST_DISABLED'
  | 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE'
  | 'NAVER_AUTH_TOKEN_TEST_APPROVAL_BLOCKED';

export interface NaverApiTokenTestApprovalAuditResult {
  ok: boolean;
  readyToRecord: boolean;
  auditCode: string;
  resultCode: NaverApiTokenTestApprovalAuditResultCode;
  resultMessage: string;

  approvalPurpose: 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY';
  requiredAcknowledgements: string[];
  acknowledgedItems: string[];
  missingAcknowledgements: string[];

  tokenRequestAllowed: false;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
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

  secretVisible: false;
  tokenVisible: false;
  endpointVisible: false;
  sanitized: true;

  checklistItems: NaverApiTokenTestApprovalAuditChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  needsReviewReasons: string[];

  maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE';
}

export interface NaverApiTokenTestApprovalAuditRecord {
  auditCode: string;
  recordedAt: string;
  recordedBy: string | null;
  batchJobId: string | null;
  finalApprovalId: string | null;
  acknowledgedItems: string[];
  approvalPurpose: 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY';
  maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE';
  tokenRequestAllowed: false;
  accessTokenRequested: false;
  tokenIssued: false;
  endpointCalled: false;
  httpClientCreated: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  sanitized: true;
}

export interface NaverApiTokenTestApprovalAuditInput {
  batchJobId?: string | null;
  finalApprovalId?: string | null;
  actorId?: string | null;
  acknowledgedItems?: string[];
  /** Must be true — record-only mode is required */
  confirmApprovalRecordOnly?: boolean;
  authConfigSafety?: NaverApiAuthConfigSafeReaderResult | null;
  tokenProviderDisabledStatus?: NaverApiTokenProviderDisabledResult | null;
  tokenDryPermissionGate?: NaverApiTokenDryPermissionGateResult | null;
  tokenTestOnlySkeletonStatus?: NaverApiTokenProviderTestOnlySkeletonResult | null;
  environmentSafetyResult?: EnvironmentSafetyGuardResult | null;
  requestedAction?: string;
  /** Ignored — token requests are always blocked in this phase */
  allowTokenRequest?: boolean;
  /** Ignored — credential use is always blocked in this phase */
  allowCredentialUse?: boolean;
  /** Ignored — endpoint calls are always blocked in this phase */
  allowEndpointCall?: boolean;
}

// ── Public functions ───────────────────────────────────────────────────────────

export function validateNaverApiTokenTestApprovalAcknowledgements(
  acknowledgedItems: string[]
): { valid: boolean; missing: string[] } {
  const missing = REQUIRED_ACKNOWLEDGEMENTS.filter(
    (req) => !acknowledgedItems.includes(req)
  );
  return { valid: missing.length === 0, missing };
}

export function buildNaverApiTokenTestApprovalAuditRecord(
  input: NaverApiTokenTestApprovalAuditInput
): NaverApiTokenTestApprovalAuditRecord {
  return {
    auditCode: generateAuditCode(input.batchJobId, input.finalApprovalId),
    recordedAt: new Date().toISOString(),
    recordedBy: input.actorId ?? null,
    batchJobId: input.batchJobId ?? null,
    finalApprovalId: input.finalApprovalId ?? null,
    acknowledgedItems: Array.isArray(input.acknowledgedItems) ? [...input.acknowledgedItems] : [],
    approvalPurpose: 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY',
    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    tokenRequestAllowed: false,
    accessTokenRequested: false,
    tokenIssued: false,
    endpointCalled: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    sanitized: true,
  };
}

export function evaluateNaverApiTokenTestApprovalReadiness(
  input?: NaverApiTokenTestApprovalAuditInput | null
): NaverApiTokenTestApprovalAuditResult {
  const safeInput = input ?? {};
  const checklist: NaverApiTokenTestApprovalAuditChecklistItem[] = [];
  const blockingReasons: string[] = [];
  const warnings: string[] = [];
  const needsReviewReasons: string[] = [];

  const acknowledgedItems = Array.isArray(safeInput.acknowledgedItems)
    ? safeInput.acknowledgedItems
    : [];

  // ── 섹션 1: confirmApprovalRecordOnly 검증 ───────────────────────────────────

  if (safeInput.confirmApprovalRecordOnly !== true) {
    checklist.push({
      key: 'CONFIRM_APPROVAL_RECORD_ONLY_REQUIRED',
      label: 'confirmApprovalRecordOnly=true 필수',
      status: 'BLOCKED',
      message: 'confirmApprovalRecordOnly가 true가 아닙니다. 승인 기록은 record-only 모드에서만 허용됩니다.',
    });
    blockingReasons.push('confirmApprovalRecordOnly가 true가 아닙니다.');
  } else {
    checklist.push({
      key: 'CONFIRM_APPROVAL_RECORD_ONLY_REQUIRED',
      label: 'confirmApprovalRecordOnly=true 확인',
      status: 'PASS',
      message: 'confirmApprovalRecordOnly=true입니다. 이 요청은 승인 기록만 저장합니다.',
    });
  }

  // ── 섹션 2: 필수 acknowledgement 검증 ────────────────────────────────────────

  const { valid: ackValid, missing } = validateNaverApiTokenTestApprovalAcknowledgements(
    acknowledgedItems
  );

  if (!ackValid) {
    checklist.push({
      key: 'REQUIRED_ACKNOWLEDGEMENTS_COMPLETE',
      label: `필수 acknowledgement 확인 (${missing.length}건 누락)`,
      status: 'BLOCKED',
      message: `누락된 항목: ${missing.join(', ')}`,
    });
    blockingReasons.push(`필수 acknowledgement ${missing.length}건이 누락되었습니다: ${missing.join(', ')}`);
  } else {
    checklist.push({
      key: 'REQUIRED_ACKNOWLEDGEMENTS_COMPLETE',
      label: `필수 acknowledgement 모두 확인됨 (${REQUIRED_ACKNOWLEDGEMENTS.length}/${REQUIRED_ACKNOWLEDGEMENTS.length})`,
      status: 'PASS',
      message: '모든 필수 acknowledgement가 제공되었습니다.',
    });
  }

  // ── 섹션 3: 고정 불변 조건 ────────────────────────────────────────────────────

  checklist.push({
    key: 'TOKEN_REQUEST_ALWAYS_DISABLED',
    label: 'tokenRequestAllowed=false 유지',
    status: 'PASS',
    message: '승인 기록 저장 후에도 tokenRequestAllowed=false입니다. 이 단계에서 token 발급은 비활성화됩니다.',
  });

  checklist.push({
    key: 'TOKEN_NOT_ISSUED',
    label: 'tokenIssued=false 유지',
    status: 'PASS',
    message: '이 단계에서 access token이 발급되지 않습니다.',
  });

  checklist.push({
    key: 'ENDPOINT_NOT_RESOLVED',
    label: 'endpointResolved=false 유지',
    status: 'PASS',
    message: 'Naver API endpoint가 resolve되지 않습니다.',
  });

  checklist.push({
    key: 'HTTP_CLIENT_NOT_CREATED',
    label: 'httpClientCreated=false 유지',
    status: 'PASS',
    message: 'HTTP client가 생성되지 않습니다.',
  });

  checklist.push({
    key: 'NO_SECRET_EXPOSED',
    label: '민감 정보 비노출 (secret, token, endpoint)',
    status: 'PASS',
    message: 'client secret, access token, authorization header, endpoint URL이 결과에 포함되지 않습니다.',
  });

  checklist.push({
    key: 'APPROVAL_PURPOSE_RECORD_ONLY',
    label: 'approvalPurpose=FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY',
    status: 'PASS',
    message: '이 승인 기록의 목적은 record-only입니다. token 발급 허용이 아닙니다.',
  });

  // ── 섹션 4: allowX 입력 무시 확인 ────────────────────────────────────────────

  if (safeInput.allowTokenRequest === true) {
    checklist.push({
      key: 'ALLOW_TOKEN_REQUEST_IGNORED',
      label: 'allowTokenRequest=true 입력 무시',
      status: 'PASS',
      message: 'allowTokenRequest=true 입력이 있어도 accessTokenRequested=false로 강제됩니다.',
    });
    warnings.push('allowTokenRequest=true 입력이 있었지만 무시되었습니다.');
  }
  if (safeInput.allowCredentialUse === true) {
    checklist.push({
      key: 'ALLOW_CREDENTIAL_USE_IGNORED',
      label: 'allowCredentialUse=true 입력 무시',
      status: 'PASS',
      message: 'allowCredentialUse=true 입력이 있어도 credentialsUsed=false로 강제됩니다.',
    });
    warnings.push('allowCredentialUse=true 입력이 있었지만 무시되었습니다.');
  }
  if (safeInput.allowEndpointCall === true) {
    checklist.push({
      key: 'ALLOW_ENDPOINT_CALL_IGNORED',
      label: 'allowEndpointCall=true 입력 무시',
      status: 'PASS',
      message: 'allowEndpointCall=true 입력이 있어도 endpointCalled=false로 강제됩니다.',
    });
    warnings.push('allowEndpointCall=true 입력이 있었지만 무시되었습니다.');
  }

  // ── 섹션 5: Environment Safety Guard 확인 ────────────────────────────────────

  const envSafety = safeInput.environmentSafetyResult ?? null;
  if (envSafety !== null) {
    if (envSafety.naverApiCallAllowed === false) {
      checklist.push({
        key: 'ENV_NAVER_API_CALL_BLOCKED',
        label: 'Environment: naverApiCallAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 naverApiCallAllowed=false를 확인했습니다.',
      });
    } else {
      checklist.push({
        key: 'ENV_NAVER_API_CALL_BLOCKED',
        label: 'Environment: naverApiCallAllowed 확인',
        status: 'BLOCKED',
        message: 'Environment Safety Guard에서 naverApiCallAllowed가 false가 아닙니다.',
      });
      blockingReasons.push('Environment Safety Guard: naverApiCallAllowed가 false가 아닙니다.');
    }
  } else {
    checklist.push({
      key: 'ENV_SAFETY_MISSING',
      label: 'Environment Safety Guard 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Environment Safety Guard 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Environment Safety Guard 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 6: batchJobId / finalApprovalId 존재 확인 ───────────────────────────

  if (safeInput.batchJobId) {
    checklist.push({
      key: 'BATCH_JOB_ID_PROVIDED',
      label: 'batchJobId 제공됨',
      status: 'PASS',
      message: 'batchJobId가 제공되었습니다.',
    });
  } else {
    checklist.push({
      key: 'BATCH_JOB_ID_PROVIDED',
      label: 'batchJobId 미제공',
      status: 'NEEDS_REVIEW',
      message: 'batchJobId가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('batchJobId가 제공되지 않았습니다.');
  }

  if (safeInput.finalApprovalId) {
    checklist.push({
      key: 'FINAL_APPROVAL_ID_PROVIDED',
      label: 'finalApprovalId 제공됨',
      status: 'PASS',
      message: 'finalApprovalId가 제공되었습니다.',
    });
  } else {
    checklist.push({
      key: 'FINAL_APPROVAL_ID_PROVIDED',
      label: 'finalApprovalId 미제공',
      status: 'NEEDS_REVIEW',
      message: 'finalApprovalId가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('finalApprovalId가 제공되지 않았습니다.');
  }

  // ── 섹션 7: Token Provider / Dry Gate / Test-Only Skeleton 참조 ──────────────

  const dryGate = safeInput.tokenDryPermissionGate ?? null;
  if (dryGate !== null) {
    if (dryGate.tokenRequestAllowed === false) {
      checklist.push({
        key: 'DRY_GATE_TOKEN_REQUEST_BLOCKED',
        label: 'Dry Permission Gate: tokenRequestAllowed=false',
        status: 'PASS',
        message: `Dry Permission Gate에서 tokenRequestAllowed=false를 확인했습니다. dryCheckPassed=${String(dryGate.dryCheckPassed)}`,
      });
    }
  }

  const testSkeleton = safeInput.tokenTestOnlySkeletonStatus ?? null;
  if (testSkeleton !== null) {
    if (testSkeleton.tokenIssued === false) {
      checklist.push({
        key: 'TEST_SKELETON_TOKEN_NOT_ISSUED',
        label: 'Test-Only Skeleton: tokenIssued=false',
        status: 'PASS',
        message: 'Test-Only Skeleton에서 tokenIssued=false를 확인했습니다.',
      });
    }
  }

  // ── 섹션 8: maxAllowedState 유지 ─────────────────────────────────────────────

  checklist.push({
    key: 'MAX_ALLOWED_STATE_APPROVAL_RECORDED',
    label: 'maxAllowedState approval-recorded 계열 유지',
    status: 'PASS',
    message: 'maxAllowedState는 항상 NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE입니다.',
  });

  // ── 결과 코드 결정 ─────────────────────────────────────────────────────────────

  const readyToRecord = blockingReasons.length === 0;

  let resultCode: NaverApiTokenTestApprovalAuditResultCode;
  if (blockingReasons.length > 0) {
    resultCode = 'NAVER_AUTH_TOKEN_TEST_APPROVAL_BLOCKED';
  } else if (needsReviewReasons.length > 0) {
    resultCode = 'NAVER_AUTH_TOKEN_TEST_APPROVAL_READY_BUT_TOKEN_REQUEST_DISABLED';
  } else {
    resultCode = 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE';
  }

  const resultMessage =
    resultCode === 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE'
      ? '승인 기록 저장 준비가 완료되었습니다. 승인 기록 저장 후에도 token 발급은 실행되지 않습니다.'
      : resultCode === 'NAVER_AUTH_TOKEN_TEST_APPROVAL_READY_BUT_TOKEN_REQUEST_DISABLED'
        ? '승인 기록 저장 준비 중입니다. 일부 항목이 확인 필요 상태입니다. token 발급은 실행되지 않습니다.'
        : `승인 기록 저장이 차단되었습니다. ${blockingReasons.length}건의 차단 사유가 있습니다.`;

  const auditCode = generateAuditCode(safeInput.batchJobId, safeInput.finalApprovalId);

  const result: NaverApiTokenTestApprovalAuditResult = {
    ok: readyToRecord,
    readyToRecord,
    auditCode,
    resultCode,
    resultMessage,

    approvalPurpose: 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY',
    requiredAcknowledgements: [...REQUIRED_ACKNOWLEDGEMENTS],
    acknowledgedItems,
    missingAcknowledgements: missing,

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

    checklistItems: checklist,
    blockingReasons,
    warnings,
    needsReviewReasons,

    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
  };

  return sanitizeNaverApiTokenTestApprovalAuditRecord(result);
}

export function sanitizeNaverApiTokenTestApprovalAuditRecord(
  result: NaverApiTokenTestApprovalAuditResult
): NaverApiTokenTestApprovalAuditResult {
  return {
    ...result,
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
    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
  };
}

export function summarizeNaverApiTokenTestApprovalAudit(
  result: NaverApiTokenTestApprovalAuditResult
): string {
  if (result.resultCode === 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE') {
    const ackCount = result.acknowledgedItems.length;
    return `승인 기록 저장 준비 완료. ${ackCount}/${result.requiredAcknowledgements.length}건 acknowledgement 확인됨. token 발급은 실행되지 않습니다. (${result.resultCode})`;
  }
  const total = result.blockingReasons.length + result.needsReviewReasons.length;
  return `승인 기록 저장 불가: ${total}건의 미해결 항목이 있습니다. token 발급 요청은 실행되지 않습니다. (${result.resultCode})`;
}

export function sanitizeStoredAuditRecord(
  raw: unknown
): NaverApiTokenTestApprovalAuditRecord | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  return {
    auditCode: typeof r.auditCode === 'string' ? r.auditCode : 'UNKNOWN',
    recordedAt: typeof r.recordedAt === 'string' ? r.recordedAt : new Date(0).toISOString(),
    recordedBy: typeof r.recordedBy === 'string' ? r.recordedBy : null,
    batchJobId: typeof r.batchJobId === 'string' ? r.batchJobId : null,
    finalApprovalId: typeof r.finalApprovalId === 'string' ? r.finalApprovalId : null,
    acknowledgedItems: Array.isArray(r.acknowledgedItems)
      ? r.acknowledgedItems.filter((x): x is string => typeof x === 'string')
      : [],
    approvalPurpose: 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY',
    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    tokenRequestAllowed: false,
    accessTokenRequested: false,
    tokenIssued: false,
    endpointCalled: false,
    httpClientCreated: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    sanitized: true,
  };
}

// ── Internal helpers ───────────────────────────────────────────────────────────

function generateAuditCode(
  batchJobId?: string | null,
  finalApprovalId?: string | null
): string {
  const prefix = 'TOKEN_TEST_APPROVAL';
  const jobPart = batchJobId ? batchJobId.substring(0, 8) : 'NOJOB';
  const faPart = finalApprovalId ? finalApprovalId.substring(0, 8) : 'NOFA';
  const ts = Date.now().toString(36).toUpperCase();
  return `${prefix}_${jobPart}_${faPart}_${ts}`;
}
