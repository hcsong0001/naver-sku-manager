/**
 * Naver API Token Dry Permission Gate
 *
 * Evaluates all pre-conditions for token issuance in dry-run mode.
 * Even when every condition passes (dryCheckPassed=true), token issuance
 * remains permanently blocked in this phase.
 *
 * Safety invariants enforced here:
 * - allowed, tokenRequestAllowed are ALWAYS false
 * - accessTokenRequested, refreshTokenRequested, tokenIssued, tokenStored are ALWAYS false
 * - credentialsUsed, authorizationHeaderCreated are ALWAYS false
 * - No HTTP client, endpoint URL, fetch/axios, or token/secret values
 * - No masked credentials or partial secret values returned
 * - maxAllowedState is always NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED
 */

import type { NaverApiAuthConfigSafeReaderResult } from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import type { NaverApiTokenProviderDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import type { EnvironmentSafetyGuardResult } from './sku-keyword-final-approval-execution-environment-safety-guard.service';

// ── Types ──────────────────────────────────────────────────────────────────────

export type NaverApiTokenDryPermissionGateStatus = 'BLOCKED' | 'DISABLED' | 'NEEDS_REVIEW';

export type NaverApiTokenDryPermissionGateResultCode =
  | 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED'
  | 'NAVER_AUTH_TOKEN_REQUEST_BLOCKED_BY_DRY_PERMISSION_GATE'
  | 'NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED';

export type NaverApiTokenDryPermissionCheckItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface NaverApiTokenDryPermissionChecklistItem {
  key: string;
  label: string;
  status: NaverApiTokenDryPermissionCheckItemStatus;
  message: string;
}

export interface NaverApiTokenDryPermissionGateResult {
  ok: boolean;
  allowed: false;
  status: NaverApiTokenDryPermissionGateStatus;
  resultCode: NaverApiTokenDryPermissionGateResultCode;
  resultMessage: string;

  dryCheckPassed: boolean;
  tokenRequestAllowed: false;
  tokenStatus: 'disabled';

  authConfigUsable: false;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  httpRequestCreated: false;
  endpointCalled: false;
  accessTokenRequested: false;
  refreshTokenRequested: false;
  credentialsUsed: false;
  tokenIssued: false;
  tokenStored: false;
  authorizationHeaderCreated: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;

  secretVisible: false;
  tokenVisible: false;
  sanitized: true;

  checklistItems: NaverApiTokenDryPermissionChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  needsReviewReasons: string[];

  maxAllowedState: 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED';
}

export interface NaverApiTokenDryPermissionGateInput {
  /** Auth Config Safe Reader 결과 */
  authConfigSafety?: NaverApiAuthConfigSafeReaderResult | null;
  /** Token Provider disabled 결과 */
  tokenProviderStatus?: NaverApiTokenProviderDisabledResult | null;
  /** Environment Safety Guard 결과 */
  environmentSafetyResult?: EnvironmentSafetyGuardResult | null;
  /** Live Adapter Skeleton 상태 */
  liveAdapterSkeletonStatus?: string | null;
  /** Live Safety Gate 결과 (있으면 참조) */
  liveSafetyGateResult?: { allowed: boolean; code?: string } | null;
  /** Live Preflight 결과 */
  livePreflightResult?: { ready: boolean; blockingReasons: string[] } | null;
  /** Live Single Test Approval Guard 결과 */
  liveSingleTestApproval?: { approvalReady: boolean; blockingReasons: string[] } | null;
  /** Live Single Test Approval Audit 기록 */
  liveSingleTestApprovalAudit?: { auditCode?: string } | null;
  /** Audit History read-only 결과 */
  liveSingleTestAuditHistory?: { exists: boolean } | null;
  /** BatchJob 상태 */
  batchJobStatus?: string | null;
  /** FinalApproval 상태 */
  finalApprovalStatus?: string | null;
  /** Item 상태 배열 */
  itemStatuses?: string[];
  /** Item 수 */
  itemCount?: number;
  requestedAction?: string;
  /** Ignored — always blocked in this phase */
  allowTokenRequest?: boolean;
  /** Ignored — always blocked in this phase */
  allowCredentialUse?: boolean;
  /** Ignored — always blocked in this phase */
  allowEndpointCall?: boolean;
  actorId?: string | null;
  finalApprovalId?: string | null;
  batchJobId?: string | null;
}

// ── Public functions ───────────────────────────────────────────────────────────

export function evaluateNaverApiTokenDryPermissionGate(
  input?: NaverApiTokenDryPermissionGateInput | null
): NaverApiTokenDryPermissionGateResult {
  const safeInput = input ?? {};
  const checklist: NaverApiTokenDryPermissionChecklistItem[] = [];
  const blockingReasons: string[] = [];
  const warnings: string[] = [];
  const needsReviewReasons: string[] = [];

  // ── 섹션 1: 고정 불변 조건 확인 ─────────────────────────────────────────────

  // 1. token 발급 비활성화 확인
  checklist.push({
    key: 'TOKEN_REQUEST_ALWAYS_DISABLED',
    label: 'Token 발급 항상 비활성화',
    status: 'PASS',
    message: '이 단계에서 token 발급은 항상 비활성화됩니다. dryCheckPassed=true여도 tokenRequestAllowed=false입니다.',
  });

  // 2. accessTokenRequested=false 확인
  checklist.push({
    key: 'ACCESS_TOKEN_NOT_REQUESTED',
    label: 'accessTokenRequested=false 유지',
    status: 'PASS',
    message: 'allowTokenRequest 입력값은 무시됩니다. access token 발급 요청이 수행되지 않습니다.',
  });

  // 3. 민감정보 비노출 확인
  checklist.push({
    key: 'NO_SECRET_OR_TOKEN_EXPOSED',
    label: 'Secret / Token 원문 비노출',
    status: 'PASS',
    message: 'client secret, access token, refresh token, authorization header 원문이 결과에 포함되지 않습니다.',
  });

  // ── 섹션 2: Environment Safety Guard 확인 ───────────────────────────────────

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
    if (envSafety.operatingDbWriteAllowed === false) {
      checklist.push({
        key: 'ENV_OPERATING_DB_WRITE_BLOCKED',
        label: 'Environment: operatingDbWriteAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 operatingDbWriteAllowed=false를 확인했습니다.',
      });
    }
    if (envSafety.queueAllowed === false) {
      checklist.push({
        key: 'ENV_QUEUE_BLOCKED',
        label: 'Environment: queueAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 queueAllowed=false를 확인했습니다.',
      });
    }
    if (envSafety.workerAllowed === false) {
      checklist.push({
        key: 'ENV_WORKER_BLOCKED',
        label: 'Environment: workerAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 workerAllowed=false를 확인했습니다.',
      });
    }
    if (!envSafety.allowed) {
      warnings.push('Environment Safety Guard가 not-allowed 상태입니다. Token 발급 차단은 유지됩니다.');
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

  // ── 섹션 3: Auth Config Safe Reader 확인 ────────────────────────────────────

  const authConfig = safeInput.authConfigSafety ?? null;
  if (authConfig !== null) {
    if (authConfig.authConfigUsable === false) {
      checklist.push({
        key: 'AUTH_CONFIG_NOT_USABLE',
        label: 'Auth Config: authConfigUsable=false',
        status: 'PASS',
        message: 'Auth Config Safe Reader에서 authConfigUsable=false를 확인했습니다.',
      });
    }
    if (authConfig.credentialConfigured) {
      checklist.push({
        key: 'AUTH_CONFIG_CREDENTIAL_STATUS',
        label: 'Auth Config: 인증정보 설정 여부',
        status: 'PASS',
        message: 'Auth Config Safe Reader가 credentialConfigured=true를 반환했습니다. token 발급은 계속 비활성화됩니다.',
      });
      warnings.push('Auth Config Safe Reader가 credentialConfigured=true 상태입니다. 이 단계에서 token은 발급되지 않습니다.');
    } else {
      checklist.push({
        key: 'AUTH_CONFIG_CREDENTIAL_STATUS',
        label: 'Auth Config: 인증정보 미설정',
        status: 'NEEDS_REVIEW',
        message: 'Auth Config Safe Reader가 credentialConfigured=false를 반환했습니다.',
      });
      needsReviewReasons.push('Auth Config Safe Reader: 인증정보가 설정되지 않은 것으로 보입니다.');
    }
  } else {
    checklist.push({
      key: 'AUTH_CONFIG_MISSING',
      label: 'Auth Config Safe Reader 결과 미제공',
      status: 'BLOCKED',
      message: 'Auth Config Safe Reader 결과가 제공되지 않았습니다.',
    });
    blockingReasons.push('Auth Config Safe Reader 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 4: Token Provider disabled 확인 ────────────────────────────────────

  const tokenProvider = safeInput.tokenProviderStatus ?? null;
  if (tokenProvider !== null) {
    checklist.push({
      key: 'TOKEN_PROVIDER_DISABLED_PRESENT',
      label: 'Token Provider disabled 결과 존재',
      status: 'PASS',
      message: 'Token Provider disabled 결과가 존재합니다.',
    });
    if (tokenProvider.accessTokenRequested === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_ACCESS_TOKEN_NOT_REQUESTED',
        label: 'Token Provider: accessTokenRequested=false',
        status: 'PASS',
        message: 'Token Provider에서 accessTokenRequested=false를 확인했습니다.',
      });
    }
    if (tokenProvider.tokenIssued === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_TOKEN_NOT_ISSUED',
        label: 'Token Provider: tokenIssued=false',
        status: 'PASS',
        message: 'Token Provider에서 tokenIssued=false를 확인했습니다.',
      });
    }
    if (tokenProvider.credentialsUsed === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_CREDENTIALS_NOT_USED',
        label: 'Token Provider: credentialsUsed=false',
        status: 'PASS',
        message: 'Token Provider에서 credentialsUsed=false를 확인했습니다.',
      });
    }
    if (tokenProvider.authorizationHeaderCreated === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_NO_AUTH_HEADER',
        label: 'Token Provider: authorizationHeaderCreated=false',
        status: 'PASS',
        message: 'Token Provider에서 authorizationHeaderCreated=false를 확인했습니다.',
      });
    }
  } else {
    checklist.push({
      key: 'TOKEN_PROVIDER_MISSING',
      label: 'Token Provider disabled 결과 미제공',
      status: 'BLOCKED',
      message: 'Token Provider disabled 결과가 제공되지 않았습니다.',
    });
    blockingReasons.push('Token Provider disabled 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 5: Live Adapter Skeleton 확인 ──────────────────────────────────────

  const skeletonStatus = safeInput.liveAdapterSkeletonStatus ?? null;
  if (skeletonStatus !== null) {
    checklist.push({
      key: 'LIVE_ADAPTER_SKELETON_STATUS',
      label: 'Live Adapter Skeleton 상태 확인',
      status: skeletonStatus === 'disabled' || skeletonStatus === 'unknown' ? 'PASS' : 'WARN',
      message: `Live Adapter Skeleton 상태: "${skeletonStatus}". Endpoint 호출은 비활성화됩니다.`,
    });
    if (skeletonStatus !== 'disabled' && skeletonStatus !== 'unknown') {
      warnings.push(`Live Adapter Skeleton 상태 "${skeletonStatus}"가 예상과 다릅니다. Endpoint 차단은 유지됩니다.`);
    }
  } else {
    checklist.push({
      key: 'LIVE_ADAPTER_SKELETON_MISSING',
      label: 'Live Adapter Skeleton 상태 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Live Adapter Skeleton 상태가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Live Adapter Skeleton 상태가 제공되지 않았습니다.');
  }

  // ── 섹션 6: Live Safety Gate 확인 ───────────────────────────────────────────

  const liveSafetyGate = safeInput.liveSafetyGateResult ?? null;
  if (liveSafetyGate !== null) {
    checklist.push({
      key: 'LIVE_SAFETY_GATE_PRESENT',
      label: 'Live Safety Gate 결과 존재',
      status: 'PASS',
      message: `Live Safety Gate 결과가 존재합니다. allowed=${String(liveSafetyGate.allowed)}`,
    });
  } else {
    checklist.push({
      key: 'LIVE_SAFETY_GATE_MISSING',
      label: 'Live Safety Gate 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Live Safety Gate 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Live Safety Gate 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 7: Live Preflight 결과 확인 ────────────────────────────────────────

  const preflight = safeInput.livePreflightResult ?? null;
  if (preflight !== null) {
    checklist.push({
      key: 'LIVE_PREFLIGHT_PRESENT',
      label: 'Live Preflight 결과 존재',
      status: 'PASS',
      message: `Live Preflight 결과가 존재합니다. ready=${String(preflight.ready)}`,
    });
  } else {
    checklist.push({
      key: 'LIVE_PREFLIGHT_MISSING',
      label: 'Live Preflight 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Live Preflight 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Live Preflight 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 8: Live Single Test Approval Guard 확인 ────────────────────────────

  const approvalGuard = safeInput.liveSingleTestApproval ?? null;
  if (approvalGuard !== null) {
    checklist.push({
      key: 'LIVE_APPROVAL_GUARD_PRESENT',
      label: 'Live Single Test Approval Guard 결과 존재',
      status: 'PASS',
      message: `Approval Guard 결과가 존재합니다. approvalReady=${String(approvalGuard.approvalReady)}`,
    });
  } else {
    checklist.push({
      key: 'LIVE_APPROVAL_GUARD_MISSING',
      label: 'Live Single Test Approval Guard 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Live Single Test Approval Guard 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Live Single Test Approval Guard 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 9: Approval Audit 존재 여부 확인 ───────────────────────────────────

  const approvalAudit = safeInput.liveSingleTestApprovalAudit ?? null;
  if (approvalAudit !== null) {
    checklist.push({
      key: 'APPROVAL_AUDIT_PRESENT',
      label: 'Approval Audit 기록 존재',
      status: 'PASS',
      message: 'Live Single Test Approval Audit 기록이 존재합니다.',
    });
  } else {
    checklist.push({
      key: 'APPROVAL_AUDIT_MISSING',
      label: 'Approval Audit 기록 없음',
      status: 'BLOCKED',
      message: 'Live Single Test Approval Audit 기록이 존재하지 않습니다.',
    });
    blockingReasons.push('Live Single Test Approval Audit 기록이 존재하지 않습니다.');
  }

  // ── 섹션 10: Audit History read-only 확인 ───────────────────────────────────

  const auditHistory = safeInput.liveSingleTestAuditHistory ?? null;
  if (auditHistory !== null) {
    checklist.push({
      key: 'AUDIT_HISTORY_PRESENT',
      label: 'Audit History read-only 결과 존재',
      status: 'PASS',
      message: `Audit History 결과가 존재합니다. exists=${String(auditHistory.exists)}`,
    });
  } else {
    checklist.push({
      key: 'AUDIT_HISTORY_MISSING',
      label: 'Audit History 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Audit History read-only 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Audit History read-only 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 11: FinalApproval 상태 확인 ────────────────────────────────────────

  const finalApprovalStatus = safeInput.finalApprovalStatus ?? null;
  if (finalApprovalStatus === 'ACTIVE') {
    checklist.push({
      key: 'FINAL_APPROVAL_ACTIVE',
      label: 'FinalApproval 상태: ACTIVE',
      status: 'PASS',
      message: 'FinalApproval이 ACTIVE 상태입니다.',
    });
  } else if (finalApprovalStatus === null) {
    checklist.push({
      key: 'FINAL_APPROVAL_STATUS',
      label: 'FinalApproval 상태 미제공',
      status: 'BLOCKED',
      message: 'FinalApproval 상태가 제공되지 않았습니다.',
    });
    blockingReasons.push('FinalApproval 상태가 제공되지 않았습니다.');
  } else {
    checklist.push({
      key: 'FINAL_APPROVAL_STATUS',
      label: `FinalApproval 상태: ${finalApprovalStatus}`,
      status: 'BLOCKED',
      message: `FinalApproval이 ACTIVE 상태가 아닙니다. (현재: ${finalApprovalStatus})`,
    });
    blockingReasons.push(`FinalApproval이 ACTIVE 상태가 아닙니다. (현재: ${finalApprovalStatus})`);
  }

  // ── 섹션 12: BatchJob 상태 확인 ─────────────────────────────────────────────

  const batchJobStatus = safeInput.batchJobStatus ?? null;
  const terminalStatuses = new Set(['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED']);

  if (batchJobStatus === 'EXECUTING') {
    checklist.push({
      key: 'BATCH_JOB_NOT_EXECUTING',
      label: 'BatchJob 상태: EXECUTING 차단',
      status: 'BLOCKED',
      message: 'BatchJob이 EXECUTING 상태입니다. 동시 실행은 허용되지 않습니다.',
    });
    blockingReasons.push('BatchJob이 EXECUTING 상태입니다. 동시 실행 차단.');
  } else if (batchJobStatus && terminalStatuses.has(batchJobStatus)) {
    checklist.push({
      key: 'BATCH_JOB_ALREADY_EXECUTED',
      label: 'BatchJob 이미 실행됨',
      status: 'BLOCKED',
      message: `BatchJob이 이미 실행 기록이 있습니다. (상태: ${batchJobStatus})`,
    });
    blockingReasons.push(`BatchJob이 이미 실행 기록이 있습니다. (상태: ${batchJobStatus})`);
  } else if (batchJobStatus === 'APPROVED') {
    checklist.push({
      key: 'BATCH_JOB_APPROVED',
      label: 'BatchJob 상태: APPROVED',
      status: 'PASS',
      message: 'BatchJob이 APPROVED 상태입니다.',
    });
  } else if (batchJobStatus === null) {
    checklist.push({
      key: 'BATCH_JOB_STATUS',
      label: 'BatchJob 상태 미제공',
      status: 'BLOCKED',
      message: 'BatchJob 상태가 제공되지 않았습니다.',
    });
    blockingReasons.push('BatchJob 상태가 제공되지 않았습니다.');
  } else {
    checklist.push({
      key: 'BATCH_JOB_STATUS',
      label: `BatchJob 상태: ${batchJobStatus}`,
      status: 'BLOCKED',
      message: `BatchJob이 APPROVED 상태가 아닙니다. (현재: ${batchJobStatus})`,
    });
    blockingReasons.push(`BatchJob이 APPROVED 상태가 아닙니다. (현재: ${batchJobStatus})`);
  }

  // ── 섹션 13: Item 수 확인 (정확히 1건) ──────────────────────────────────────

  const itemCount = typeof safeInput.itemCount === 'number' ? safeInput.itemCount : null;
  if (itemCount === null) {
    checklist.push({
      key: 'ITEM_COUNT_UNKNOWN',
      label: 'Item 수 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Item 수가 제공되지 않았습니다. 단일 상품 1건 조건을 확인할 수 없습니다.',
    });
    needsReviewReasons.push('Item 수가 제공되지 않아 단일 상품 조건을 확인할 수 없습니다.');
  } else if (itemCount === 1) {
    checklist.push({
      key: 'ITEM_COUNT_SINGLE',
      label: 'Item 수: 1건 (단일 상품 조건 충족)',
      status: 'PASS',
      message: 'Item 수가 정확히 1건입니다. 단일 상품 조건을 충족합니다.',
    });
  } else if (itemCount === 0) {
    checklist.push({
      key: 'ITEM_COUNT_ZERO',
      label: 'Item 수: 0건',
      status: 'BLOCKED',
      message: 'Item이 없습니다.',
    });
    blockingReasons.push('Item이 없습니다. (itemCount=0)');
  } else {
    checklist.push({
      key: 'ITEM_COUNT_MULTIPLE',
      label: `Item 수: ${itemCount}건 (단일 상품 조건 미충족)`,
      status: 'BLOCKED',
      message: `Item 수가 ${itemCount}건입니다. 단일 상품 1건 조건을 충족하지 않습니다.`,
    });
    blockingReasons.push(`Item 수가 ${itemCount}건입니다. 단일 상품 1건 조건 미충족.`);
  }

  // ── 섹션 14: Item 상태 확인 ─────────────────────────────────────────────────

  const itemStatuses = Array.isArray(safeInput.itemStatuses) ? safeInput.itemStatuses : null;
  if (itemStatuses !== null && itemStatuses.length > 0) {
    const nonReadyItems = itemStatuses.filter(s => s !== 'READY');
    if (nonReadyItems.length === 0) {
      checklist.push({
        key: 'ITEM_STATUSES_ALL_READY',
        label: 'Item 상태: 모두 READY',
        status: 'PASS',
        message: '모든 Item이 READY 상태입니다.',
      });
    } else {
      checklist.push({
        key: 'ITEM_STATUSES_NOT_READY',
        label: 'READY가 아닌 Item 존재',
        status: 'BLOCKED',
        message: `READY가 아닌 Item이 ${nonReadyItems.length}건 있습니다.`,
      });
      blockingReasons.push(`READY가 아닌 Item이 ${nonReadyItems.length}건 있습니다.`);
    }
  } else if (itemStatuses !== null && itemStatuses.length === 0) {
    checklist.push({
      key: 'ITEM_STATUSES_EMPTY',
      label: 'Item 상태 배열이 비어 있음',
      status: 'BLOCKED',
      message: 'Item 상태 배열이 비어 있습니다.',
    });
    blockingReasons.push('Item 상태 배열이 비어 있습니다.');
  }

  // ── 섹션 15: allowX 입력 무시 확인 ─────────────────────────────────────────

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

  // ── 섹션 16: maxAllowedState 항상 disabled 계열 확인 ────────────────────────

  checklist.push({
    key: 'MAX_ALLOWED_STATE_DISABLED',
    label: 'maxAllowedState disabled 계열 유지',
    status: 'PASS',
    message:
      'maxAllowedState는 항상 NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED입니다.',
  });

  // ── 결과 판정 ────────────────────────────────────────────────────────────────

  const dryCheckPassed = blockingReasons.length === 0 && needsReviewReasons.length === 0;

  let status: NaverApiTokenDryPermissionGateStatus;
  let resultCode: NaverApiTokenDryPermissionGateResultCode;

  if (blockingReasons.length > 0) {
    status = 'BLOCKED';
    resultCode = 'NAVER_AUTH_TOKEN_REQUEST_BLOCKED_BY_DRY_PERMISSION_GATE';
  } else if (needsReviewReasons.length > 0) {
    status = 'NEEDS_REVIEW';
    resultCode = 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED';
  } else {
    // 모든 조건 통과여도 token 발급은 disabled
    status = 'DISABLED';
    resultCode = 'NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED';
  }

  const resultMessage =
    resultCode === 'NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED'
      ? 'Token 발급 전 dry-run 점검이 통과되었습니다. 그러나 이 단계에서는 access token을 발급하지 않으며, token 요청은 계속 비활성화되어 있습니다.'
      : resultCode === 'NAVER_AUTH_TOKEN_REQUEST_BLOCKED_BY_DRY_PERMISSION_GATE'
        ? `Token 발급 전 dry-run 점검에서 ${blockingReasons.length}건의 차단 사유가 발견되었습니다. Token 발급은 차단됩니다.`
        : 'Token Dry Permission Gate가 준비되었지만 일부 항목이 확인 필요 상태입니다. Token 발급은 비활성화됩니다.';

  const result: NaverApiTokenDryPermissionGateResult = {
    ok: dryCheckPassed,
    allowed: false,
    status,
    resultCode,
    resultMessage,

    dryCheckPassed,
    tokenRequestAllowed: false,
    tokenStatus: 'disabled',

    authConfigUsable: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    httpRequestCreated: false,
    endpointCalled: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    tokenIssued: false,
    tokenStored: false,
    authorizationHeaderCreated: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,

    secretVisible: false,
    tokenVisible: false,
    sanitized: true,

    checklistItems: checklist,
    blockingReasons,
    warnings,
    needsReviewReasons,

    maxAllowedState: 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED',
  };

  return sanitizeNaverApiTokenDryPermissionGateResult(result);
}

export function buildNaverApiTokenDryPermissionChecklist(
  input?: NaverApiTokenDryPermissionGateInput | null
): NaverApiTokenDryPermissionChecklistItem[] {
  return evaluateNaverApiTokenDryPermissionGate(input).checklistItems;
}

export function sanitizeNaverApiTokenDryPermissionGateResult(
  result: NaverApiTokenDryPermissionGateResult
): NaverApiTokenDryPermissionGateResult {
  return {
    ...result,
    allowed: false,
    tokenRequestAllowed: false,
    tokenStatus: 'disabled',
    authConfigUsable: false,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    httpRequestCreated: false,
    endpointCalled: false,
    accessTokenRequested: false,
    refreshTokenRequested: false,
    credentialsUsed: false,
    tokenIssued: false,
    tokenStored: false,
    authorizationHeaderCreated: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    secretVisible: false,
    tokenVisible: false,
    sanitized: true,
    maxAllowedState: 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED',
  };
}

export function summarizeNaverApiTokenDryPermissionReadiness(
  result: NaverApiTokenDryPermissionGateResult
): string {
  if (result.dryCheckPassed) {
    return `Token Dry Permission Gate dry-run 점검 통과. 그러나 token 발급은 비활성화됩니다. (${result.resultCode})`;
  }
  const total = result.blockingReasons.length + result.needsReviewReasons.length;
  return `Token Dry Permission Gate: ${total}건의 미해결 항목이 있습니다. (${result.resultCode})`;
}
