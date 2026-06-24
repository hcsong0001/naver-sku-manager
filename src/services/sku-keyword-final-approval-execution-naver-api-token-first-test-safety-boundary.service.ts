/**
 * Naver API Token First Test Safety Boundary
 *
 * 최초 Naver API token 발급 테스트를 실행하기 전,
 * 모든 Guard/Skeleton/Audit 결과를 취합하여 "발급 테스트 전 조건이 준비되었는지"를
 * 최종 판정하는 read-only / pure Safety Boundary입니다.
 *
 * 이 서비스는 token 발급을 실행하지 않습니다.
 * 이 서비스는 Naver API를 호출하지 않습니다.
 * 이 서비스는 HTTP client를 생성하지 않습니다.
 * 이 서비스는 endpoint URL을 사용하지 않습니다.
 * 이 서비스는 authorization header를 생성하지 않습니다.
 *
 * Safety invariants enforced here (always, never bypassed):
 *   - allowed는 ALWAYS false
 *   - tokenRequestAllowed는 ALWAYS false
 *   - tokenRequestPrepared는 ALWAYS false
 *   - tokenRequestExecuted는 ALWAYS false
 *   - accessTokenRequested는 ALWAYS false
 *   - refreshTokenRequested는 ALWAYS false
 *   - credentialsUsed는 ALWAYS false
 *   - tokenIssued는 ALWAYS false
 *   - tokenStored는 ALWAYS false
 *   - authorizationHeaderCreated는 ALWAYS false
 *   - endpointResolved는 ALWAYS false
 *   - endpointCalled는 ALWAYS false
 *   - httpRequestCreated는 ALWAYS false
 *   - httpClientCreated는 ALWAYS false
 *   - naverApiCallAllowed는 ALWAYS false
 *   - liveExecutionEnabled는 ALWAYS false
 *   - queueAllowed는 ALWAYS false
 *   - workerAllowed는 ALWAYS false
 *   - secretVisible는 ALWAYS false
 *   - tokenVisible는 ALWAYS false
 *   - endpointVisible는 ALWAYS false
 *   - sanitized는 ALWAYS true
 *   - maxAllowedState는 항상 NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE
 */

import type { NaverApiAuthConfigSafeReaderResult } from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import type { NaverApiTokenProviderDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import type { NaverApiTokenDryPermissionGateResult } from './sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';
import type { NaverApiTokenProviderTestOnlySkeletonResult } from './sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service';
import type { EnvironmentSafetyGuardResult } from './sku-keyword-final-approval-execution-environment-safety-guard.service';

// ── Types ──────────────────────────────────────────────────────────────────────

export type NaverApiTokenFirstTestSafetyBoundaryStatus =
  | 'BLOCKED'
  | 'READY_BUT_DISABLED'
  | 'NEEDS_REVIEW';

export type NaverApiTokenFirstTestSafetyBoundaryResultCode =
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_BLOCKED_BY_SAFETY_BOUNDARY'
  | 'NAVER_AUTH_TOKEN_FIRST_TEST_APPROVAL_CONFIRMED_BUT_TOKEN_REQUEST_DISABLED';

export type NaverApiTokenFirstTestSafetyBoundaryCheckItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface NaverApiTokenFirstTestSafetyBoundaryChecklistItem {
  key: string;
  label: string;
  status: NaverApiTokenFirstTestSafetyBoundaryCheckItemStatus;
  message: string;
}

export interface NaverApiTokenFirstTestSafetyBoundaryResult {
  ok: boolean;
  /** 다음 Task에서 사용자가 별도 명시 승인하면 token 발급 테스트로 넘어갈 수 있는 상태인지
   *  true여도 tokenRequestAllowed=false, tokenIssued=false여야 합니다. */
  readyForExplicitTokenTestApproval: boolean;
  /** 항상 false — 이 단계에서 token 발급은 절대 허용되지 않습니다. */
  allowed: false;
  status: NaverApiTokenFirstTestSafetyBoundaryStatus;

  resultCode: NaverApiTokenFirstTestSafetyBoundaryResultCode;
  resultMessage: string;

  /** Token Test Approval Audit 기록 존재 여부 */
  tokenTestApprovalPresent: boolean;
  /** Token Test Approval Audit의 required acknowledgement가 모두 완료되었는지 */
  tokenTestApprovalComplete: boolean;
  /** 모든 사전 조건이 통과되었는지 (true여도 token 발급은 비활성화) */
  allPreconditionsPassed: boolean;

  // ── 안전 불변 조건 — 모두 false ──────────────────────────────────────────────
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

  checklistItems: NaverApiTokenFirstTestSafetyBoundaryChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  needsReviewReasons: string[];

  maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE';
}

/** Token Test Approval Audit의 최소 safe 형태 */
export interface TokenTestApprovalAuditRef {
  /** 기록 존재 여부 */
  hasAudit: boolean;
  /** 확인된 항목 개수 */
  acknowledgedCount?: number;
  /** auditCode (선택) */
  auditCode?: string;
  /** 필수 항목 개수 (12개 기준) */
  requiredCount?: number;
  /** 모든 항목 확인 완료 여부 */
  allAcknowledged?: boolean;
}

export interface NaverApiTokenFirstTestSafetyBoundaryInput {
  environmentSafetyResult?: EnvironmentSafetyGuardResult | null;
  authConfigSafety?: NaverApiAuthConfigSafeReaderResult | null;
  tokenProviderDisabledStatus?: NaverApiTokenProviderDisabledResult | null;
  tokenDryPermissionGate?: NaverApiTokenDryPermissionGateResult | null;
  tokenTestOnlySkeletonStatus?: NaverApiTokenProviderTestOnlySkeletonResult | null;
  /** Token Test Approval Audit 기록 참조 */
  tokenTestApprovalAudit?: TokenTestApprovalAuditRef | null;
  /** Live Adapter Skeleton 상태 ('disabled' | 'unknown' 등) */
  liveAdapterSkeletonStatus?: string | null;
  /** FinalApproval 상태 */
  finalApprovalStatus?: string | null;
  /** BatchJob 상태 */
  batchJobStatus?: string | null;
  /** Item 상태 배열 */
  itemStatuses?: string[];
  /** Item 수 */
  itemCount?: number;
  requestedAction?: string;
  /** Ignored — token 발급은 항상 차단 */
  allowTokenRequest?: boolean;
  /** Ignored — 인증정보 사용은 항상 차단 */
  allowCredentialUse?: boolean;
  /** Ignored — endpoint resolve는 항상 차단 */
  allowEndpointResolve?: boolean;
  /** Ignored — endpoint 호출은 항상 차단 */
  allowEndpointCall?: boolean;
  /** Ignored — HTTP client 생성은 항상 차단 */
  allowHttpClient?: boolean;
  actorId?: string | null;
  finalApprovalId?: string | null;
  batchJobId?: string | null;
}

// ── Public functions ───────────────────────────────────────────────────────────

/**
 * Token 최초 발급 테스트 Safety Boundary 평가
 *
 * 기존 Guard/Skeleton/Audit 결과를 취합하여 "발급 테스트 전 조건이 준비되었는지"를
 * 최종 판정합니다. 모든 조건이 통과해도 allowed=false, tokenRequestAllowed=false입니다.
 */
export function evaluateNaverApiTokenFirstTestSafetyBoundary(
  input?: NaverApiTokenFirstTestSafetyBoundaryInput | null
): NaverApiTokenFirstTestSafetyBoundaryResult {
  const safeInput = input ?? {};
  const checklist: NaverApiTokenFirstTestSafetyBoundaryChecklistItem[] = [];
  const blockingReasons: string[] = [];
  const warnings: string[] = [];
  const needsReviewReasons: string[] = [];

  // ── 섹션 1: 고정 불변 조건 (항상 PASS) ──────────────────────────────────────

  checklist.push({
    key: 'TOKEN_REQUEST_ALWAYS_DISABLED',
    label: 'tokenRequestAllowed=false 영구 비활성화',
    status: 'PASS',
    message: '이 Safety Boundary에서 token 발급은 항상 비활성화됩니다. 모든 조건 통과 후에도 tokenRequestAllowed=false입니다.',
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
    key: 'NO_SECRET_OR_TOKEN_EXPOSED',
    label: 'Secret / Token / Endpoint 원문 비노출',
    status: 'PASS',
    message: 'client secret, access token, refresh token, authorization header, endpoint URL 원문이 결과에 포함되지 않습니다.',
  });

  // ── 섹션 2: allowX 입력 무시 확인 ────────────────────────────────────────────

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
  if (safeInput.allowEndpointResolve === true) {
    checklist.push({
      key: 'ALLOW_ENDPOINT_RESOLVE_IGNORED',
      label: 'allowEndpointResolve=true 입력 무시',
      status: 'PASS',
      message: 'allowEndpointResolve=true 입력이 있어도 endpointResolved=false로 강제됩니다.',
    });
    warnings.push('allowEndpointResolve=true 입력이 있었지만 무시되었습니다.');
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
  if (safeInput.allowHttpClient === true) {
    checklist.push({
      key: 'ALLOW_HTTP_CLIENT_IGNORED',
      label: 'allowHttpClient=true 입력 무시',
      status: 'PASS',
      message: 'allowHttpClient=true 입력이 있어도 httpClientCreated=false로 강제됩니다.',
    });
    warnings.push('allowHttpClient=true 입력이 있었지만 무시되었습니다.');
  }

  // ── 섹션 3: Environment Safety Guard ─────────────────────────────────────────

  const envSafety = safeInput.environmentSafetyResult ?? null;
  if (envSafety !== null) {
    if (envSafety.naverApiCallAllowed === false) {
      checklist.push({
        key: 'ENV_NAVER_API_CALL_BLOCKED',
        label: 'Environment Safety Guard: naverApiCallAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 naverApiCallAllowed=false를 확인했습니다.',
      });
    } else {
      checklist.push({
        key: 'ENV_NAVER_API_CALL_BLOCKED',
        label: 'Environment Safety Guard: naverApiCallAllowed 확인 실패',
        status: 'BLOCKED',
        message: 'Environment Safety Guard에서 naverApiCallAllowed가 false가 아닙니다.',
      });
      blockingReasons.push('Environment Safety Guard: naverApiCallAllowed가 false가 아닙니다.');
    }
    if (envSafety.operatingDbWriteAllowed === false) {
      checklist.push({
        key: 'ENV_OPERATING_DB_WRITE_BLOCKED',
        label: 'Environment Safety Guard: operatingDbWriteAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 operatingDbWriteAllowed=false를 확인했습니다.',
      });
    }
    if (envSafety.queueAllowed === false) {
      checklist.push({
        key: 'ENV_QUEUE_BLOCKED',
        label: 'Environment Safety Guard: queueAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 queueAllowed=false를 확인했습니다.',
      });
    }
    if (envSafety.workerAllowed === false) {
      checklist.push({
        key: 'ENV_WORKER_BLOCKED',
        label: 'Environment Safety Guard: workerAllowed=false',
        status: 'PASS',
        message: 'Environment Safety Guard에서 workerAllowed=false를 확인했습니다.',
      });
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

  // ── 섹션 4: Auth Config Safe Reader ──────────────────────────────────────────

  const authConfig = safeInput.authConfigSafety ?? null;
  if (authConfig !== null) {
    checklist.push({
      key: 'AUTH_CONFIG_SAFE_READER_PRESENT',
      label: 'Auth Config Safe Reader: 결과 존재',
      status: 'PASS',
      message: 'Auth Config Safe Reader 결과가 존재합니다.',
    });
    if (authConfig.authConfigUsable === false) {
      checklist.push({
        key: 'AUTH_CONFIG_NOT_USABLE',
        label: 'Auth Config Safe Reader: authConfigUsable=false',
        status: 'PASS',
        message: 'Auth Config Safe Reader에서 authConfigUsable=false를 확인했습니다. 인증정보 사용은 차단됩니다.',
      });
    }
    if (authConfig.credentialConfigured) {
      checklist.push({
        key: 'AUTH_CONFIG_CREDENTIAL_CONFIGURED',
        label: 'Auth Config Safe Reader: 인증정보 설정 확인됨',
        status: 'PASS',
        message: 'Auth Config Safe Reader가 credentialConfigured=true를 반환했습니다. token 발급은 계속 비활성화됩니다.',
      });
      warnings.push('Auth Config Safe Reader: credentialConfigured=true입니다. 이 단계에서 token은 발급되지 않습니다.');
    } else {
      checklist.push({
        key: 'AUTH_CONFIG_CREDENTIAL_MISSING',
        label: 'Auth Config Safe Reader: 인증정보 미설정',
        status: 'NEEDS_REVIEW',
        message: 'Auth Config Safe Reader가 credentialConfigured=false를 반환했습니다. 인증정보 설정이 필요합니다.',
      });
      needsReviewReasons.push('Auth Config Safe Reader: 인증정보가 설정되지 않은 것으로 보입니다.');
    }
  } else {
    checklist.push({
      key: 'AUTH_CONFIG_SAFE_READER_MISSING',
      label: 'Auth Config Safe Reader 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Auth Config Safe Reader 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Auth Config Safe Reader 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 5: Token Provider Disabled ──────────────────────────────────────────

  const tokenProvider = safeInput.tokenProviderDisabledStatus ?? null;
  if (tokenProvider !== null) {
    checklist.push({
      key: 'TOKEN_PROVIDER_DISABLED_PRESENT',
      label: 'Token Provider Disabled: 결과 존재',
      status: 'PASS',
      message: 'Token Provider Disabled 결과가 존재합니다.',
    });
    if (tokenProvider.accessTokenRequested === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_ACCESS_TOKEN_NOT_REQUESTED',
        label: 'Token Provider Disabled: accessTokenRequested=false',
        status: 'PASS',
        message: 'Token Provider에서 accessTokenRequested=false를 확인했습니다.',
      });
    }
    if (tokenProvider.tokenIssued === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_TOKEN_NOT_ISSUED',
        label: 'Token Provider Disabled: tokenIssued=false',
        status: 'PASS',
        message: 'Token Provider에서 tokenIssued=false를 확인했습니다.',
      });
    }
  } else {
    checklist.push({
      key: 'TOKEN_PROVIDER_DISABLED_MISSING',
      label: 'Token Provider Disabled 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Token Provider Disabled 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Token Provider Disabled 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 6: Token Dry Permission Gate ────────────────────────────────────────

  const dryGate = safeInput.tokenDryPermissionGate ?? null;
  if (dryGate !== null) {
    checklist.push({
      key: 'TOKEN_DRY_PERMISSION_GATE_PRESENT',
      label: 'Token Dry Permission Gate: 결과 존재',
      status: 'PASS',
      message: `Token Dry Permission Gate 결과가 존재합니다. dryCheckPassed=${String(dryGate.dryCheckPassed)}`,
    });
    if (dryGate.tokenRequestAllowed === false) {
      checklist.push({
        key: 'DRY_GATE_TOKEN_REQUEST_BLOCKED',
        label: 'Token Dry Permission Gate: tokenRequestAllowed=false',
        status: 'PASS',
        message: 'Token Dry Permission Gate에서 tokenRequestAllowed=false를 확인했습니다.',
      });
    }
  } else {
    checklist.push({
      key: 'TOKEN_DRY_PERMISSION_GATE_MISSING',
      label: 'Token Dry Permission Gate 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Token Dry Permission Gate 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Token Dry Permission Gate 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 7: Token Provider Test-Only Skeleton ─────────────────────────────────

  const testSkeleton = safeInput.tokenTestOnlySkeletonStatus ?? null;
  if (testSkeleton !== null) {
    checklist.push({
      key: 'TOKEN_TEST_SKELETON_PRESENT',
      label: 'Token Provider Test-Only Skeleton: 결과 존재',
      status: 'PASS',
      message: 'Token Provider Test-Only Skeleton 결과가 존재합니다.',
    });
    if (testSkeleton.tokenRequestExecuted === false) {
      checklist.push({
        key: 'TEST_SKELETON_TOKEN_NOT_EXECUTED',
        label: 'Token Provider Test-Only Skeleton: tokenRequestExecuted=false',
        status: 'PASS',
        message: 'Test-Only Skeleton에서 tokenRequestExecuted=false를 확인했습니다.',
      });
    }
    if (testSkeleton.tokenIssued === false) {
      checklist.push({
        key: 'TEST_SKELETON_TOKEN_NOT_ISSUED',
        label: 'Token Provider Test-Only Skeleton: tokenIssued=false',
        status: 'PASS',
        message: 'Test-Only Skeleton에서 tokenIssued=false를 확인했습니다.',
      });
    }
  } else {
    checklist.push({
      key: 'TOKEN_TEST_SKELETON_MISSING',
      label: 'Token Provider Test-Only Skeleton 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Token Provider Test-Only Skeleton 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Token Provider Test-Only Skeleton 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 8: Token Test Approval Audit ────────────────────────────────────────

  const approvalAudit = safeInput.tokenTestApprovalAudit ?? null;
  let tokenTestApprovalPresent = false;
  let tokenTestApprovalComplete = false;

  if (approvalAudit !== null && approvalAudit.hasAudit === true) {
    tokenTestApprovalPresent = true;

    // allAcknowledged 또는 acknowledgedCount/requiredCount 기준으로 완료 여부 판단
    if (approvalAudit.allAcknowledged === true) {
      tokenTestApprovalComplete = true;
    } else if (
      typeof approvalAudit.acknowledgedCount === 'number' &&
      typeof approvalAudit.requiredCount === 'number' &&
      approvalAudit.acknowledgedCount >= approvalAudit.requiredCount &&
      approvalAudit.requiredCount > 0
    ) {
      tokenTestApprovalComplete = true;
    } else if (
      typeof approvalAudit.acknowledgedCount === 'number' &&
      approvalAudit.acknowledgedCount >= 12
    ) {
      // 기본값 12개 기준 (REQUIRED_ACKNOWLEDGEMENTS.length)
      tokenTestApprovalComplete = true;
    }

    if (tokenTestApprovalComplete) {
      checklist.push({
        key: 'TOKEN_TEST_APPROVAL_AUDIT_COMPLETE',
        label: 'Token Test Approval Audit: 모든 acknowledgement 완료',
        status: 'PASS',
        message: 'Token Test Approval Audit 기록이 존재하고 모든 required acknowledgement가 완료되었습니다.',
      });
    } else {
      checklist.push({
        key: 'TOKEN_TEST_APPROVAL_AUDIT_INCOMPLETE',
        label: 'Token Test Approval Audit: acknowledgement 미완료',
        status: 'BLOCKED',
        message: 'Token Test Approval Audit 기록이 존재하지만 required acknowledgement가 완료되지 않았습니다.',
      });
      blockingReasons.push('Token Test Approval Audit: required acknowledgement가 완료되지 않았습니다.');
    }
  } else if (approvalAudit !== null && approvalAudit.hasAudit === false) {
    tokenTestApprovalPresent = false;
    checklist.push({
      key: 'TOKEN_TEST_APPROVAL_AUDIT_NOT_FOUND',
      label: 'Token Test Approval Audit: 기록 없음',
      status: 'BLOCKED',
      message: 'Token Test Approval Audit 기록이 없습니다. 먼저 승인 기록을 저장해야 합니다.',
    });
    blockingReasons.push('Token Test Approval Audit 기록이 없습니다. 먼저 승인 기록을 저장해야 합니다.');
  } else {
    // null — 정보 미제공
    checklist.push({
      key: 'TOKEN_TEST_APPROVAL_AUDIT_MISSING',
      label: 'Token Test Approval Audit 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Token Test Approval Audit 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Token Test Approval Audit 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 9: Live Adapter Skeleton ────────────────────────────────────────────

  const skeletonStatus = safeInput.liveAdapterSkeletonStatus ?? null;
  if (skeletonStatus !== null) {
    if (skeletonStatus === 'disabled' || skeletonStatus === 'DISABLED' || skeletonStatus === 'unknown') {
      checklist.push({
        key: 'LIVE_ADAPTER_SKELETON_DISABLED',
        label: 'Live Adapter Skeleton: disabled 상태',
        status: 'PASS',
        message: `Live Adapter Skeleton이 disabled 상태입니다. (${skeletonStatus})`,
      });
    } else {
      checklist.push({
        key: 'LIVE_ADAPTER_SKELETON_UNEXPECTED',
        label: `Live Adapter Skeleton: 예상치 못한 상태 (${skeletonStatus})`,
        status: 'WARN',
        message: `Live Adapter Skeleton 상태가 "${skeletonStatus}"입니다. Endpoint 차단은 유지됩니다.`,
      });
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

  // ── 섹션 10: FinalApproval 상태 ──────────────────────────────────────────────

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
      key: 'FINAL_APPROVAL_STATUS_MISSING',
      label: 'FinalApproval 상태 미제공',
      status: 'BLOCKED',
      message: 'FinalApproval 상태가 제공되지 않았습니다.',
    });
    blockingReasons.push('FinalApproval 상태가 제공되지 않았습니다.');
  } else {
    checklist.push({
      key: 'FINAL_APPROVAL_NOT_ACTIVE',
      label: `FinalApproval 상태: ${finalApprovalStatus}`,
      status: 'BLOCKED',
      message: `FinalApproval이 ACTIVE 상태가 아닙니다. (현재: ${finalApprovalStatus})`,
    });
    blockingReasons.push(`FinalApproval이 ACTIVE 상태가 아닙니다. (현재: ${finalApprovalStatus})`);
  }

  // ── 섹션 11: BatchJob 상태 ───────────────────────────────────────────────────

  const batchJobStatus = safeInput.batchJobStatus ?? null;
  const terminalStatuses = new Set(['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED']);

  if (batchJobStatus === 'EXECUTING') {
    checklist.push({
      key: 'BATCH_JOB_EXECUTING',
      label: 'BatchJob 상태: EXECUTING (차단)',
      status: 'BLOCKED',
      message: 'BatchJob이 EXECUTING 상태입니다. 동시 실행은 허용되지 않습니다.',
    });
    blockingReasons.push('BatchJob이 EXECUTING 상태입니다. 동시 실행 차단.');
  } else if (batchJobStatus && terminalStatuses.has(batchJobStatus)) {
    checklist.push({
      key: 'BATCH_JOB_ALREADY_TERMINAL',
      label: `BatchJob 이미 실행됨 (${batchJobStatus})`,
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
      key: 'BATCH_JOB_STATUS_MISSING',
      label: 'BatchJob 상태 미제공',
      status: 'BLOCKED',
      message: 'BatchJob 상태가 제공되지 않았습니다.',
    });
    blockingReasons.push('BatchJob 상태가 제공되지 않았습니다.');
  } else {
    checklist.push({
      key: 'BATCH_JOB_NOT_APPROVED',
      label: `BatchJob 상태: ${batchJobStatus} (APPROVED 아님)`,
      status: 'BLOCKED',
      message: `BatchJob이 APPROVED 상태가 아닙니다. (현재: ${batchJobStatus})`,
    });
    blockingReasons.push(`BatchJob이 APPROVED 상태가 아닙니다. (현재: ${batchJobStatus})`);
  }

  // ── 섹션 12: Item 수 ─────────────────────────────────────────────────────────

  const itemCount = typeof safeInput.itemCount === 'number' ? safeInput.itemCount : null;
  if (itemCount === null) {
    checklist.push({
      key: 'ITEM_COUNT_MISSING',
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
      message: 'Item이 없습니다. (itemCount=0)',
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

  // ── 섹션 13: Item 상태 ───────────────────────────────────────────────────────

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

  // ── 섹션 14: 추가 안전 체크 ──────────────────────────────────────────────────

  checklist.push({
    key: 'AUTHORIZATION_HEADER_NOT_CREATED',
    label: 'authorizationHeaderCreated=false 유지',
    status: 'PASS',
    message: 'Authorization header가 생성되지 않습니다.',
  });

  checklist.push({
    key: 'TOKEN_NOT_STORED',
    label: 'tokenStored=false 유지',
    status: 'PASS',
    message: 'Token이 저장되지 않습니다.',
  });

  checklist.push({
    key: 'ENDPOINT_NOT_CALLED',
    label: 'endpointCalled=false 유지',
    status: 'PASS',
    message: 'Naver API endpoint가 호출되지 않습니다.',
  });

  // ── 섹션 15: maxAllowedState 확인 ────────────────────────────────────────────

  checklist.push({
    key: 'MAX_ALLOWED_STATE_BOUNDARY',
    label: 'maxAllowedState Safety Boundary 계열 유지',
    status: 'PASS',
    message: 'maxAllowedState는 항상 NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE입니다.',
  });

  // ── 결과 판정 ─────────────────────────────────────────────────────────────────

  const allPreconditionsPassed = blockingReasons.length === 0 && needsReviewReasons.length === 0;
  // readyForExplicitTokenTestApproval: 차단 사유가 없고, Token Test Approval Audit이 완료된 경우
  const readyForExplicitTokenTestApproval = allPreconditionsPassed && tokenTestApprovalComplete;

  let status: NaverApiTokenFirstTestSafetyBoundaryStatus;
  let resultCode: NaverApiTokenFirstTestSafetyBoundaryResultCode;

  if (blockingReasons.length > 0) {
    status = 'BLOCKED';
    resultCode = 'NAVER_AUTH_TOKEN_FIRST_TEST_BLOCKED_BY_SAFETY_BOUNDARY';
  } else if (needsReviewReasons.length > 0) {
    status = 'NEEDS_REVIEW';
    resultCode = 'NAVER_AUTH_TOKEN_FIRST_TEST_APPROVAL_CONFIRMED_BUT_TOKEN_REQUEST_DISABLED';
  } else {
    // 모든 조건 통과 — 그래도 token 발급은 비활성화
    status = 'READY_BUT_DISABLED';
    resultCode = 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE';
  }

  const resultMessage =
    resultCode === 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE'
      ? '최초 Token 발급 테스트 Safety Boundary의 모든 조건이 통과되었습니다. 그러나 이 단계에서는 token을 발급하지 않으며, 실제 token 발급 테스트는 다음 Task에서 별도 명시 승인 후에만 진행됩니다.'
      : resultCode === 'NAVER_AUTH_TOKEN_FIRST_TEST_BLOCKED_BY_SAFETY_BOUNDARY'
        ? `Safety Boundary에서 ${blockingReasons.length}건의 차단 사유가 발견되었습니다. Token 발급 테스트 진행이 차단됩니다.`
        : '일부 조건이 확인 필요 상태입니다. Token 발급은 비활성화됩니다.';

  const result: NaverApiTokenFirstTestSafetyBoundaryResult = {
    ok: allPreconditionsPassed,
    readyForExplicitTokenTestApproval,
    allowed: false,
    status,
    resultCode,
    resultMessage,

    tokenTestApprovalPresent,
    tokenTestApprovalComplete,
    allPreconditionsPassed,

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

    maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE',
  };

  return sanitizeNaverApiTokenFirstTestSafetyBoundaryResult(result);
}

/**
 * 체크리스트만 빌드 (evaluateNaverApiTokenFirstTestSafetyBoundary의 checklist 필드 반환)
 */
export function buildNaverApiTokenFirstTestSafetyChecklist(
  input?: NaverApiTokenFirstTestSafetyBoundaryInput | null
): NaverApiTokenFirstTestSafetyBoundaryChecklistItem[] {
  return evaluateNaverApiTokenFirstTestSafetyBoundary(input).checklistItems;
}

/**
 * 결과 sanitize — 모든 안전 불변 조건을 강제로 덮어씁니다.
 */
export function sanitizeNaverApiTokenFirstTestSafetyBoundaryResult(
  result: NaverApiTokenFirstTestSafetyBoundaryResult
): NaverApiTokenFirstTestSafetyBoundaryResult {
  return {
    ...result,
    allowed: false,
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
    maxAllowedState: 'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE',
  };
}

/**
 * 결과 요약 문자열 반환
 */
export function summarizeNaverApiTokenFirstTestSafetyReadiness(
  result: NaverApiTokenFirstTestSafetyBoundaryResult
): string {
  if (result.readyForExplicitTokenTestApproval) {
    return `Safety Boundary 통과. 다음 Task에서 별도 명시 승인 시 token 발급 테스트 진행 가능. token 발급은 이 단계에서 실행되지 않습니다. (${result.resultCode})`;
  }
  if (result.allPreconditionsPassed && !result.tokenTestApprovalComplete) {
    return `Safety Boundary 조건 통과. 단, Token Test Approval Audit이 미완료입니다. token 발급은 비활성화됩니다. (${result.resultCode})`;
  }
  const total = result.blockingReasons.length + result.needsReviewReasons.length;
  return `Safety Boundary: ${total}건의 미해결 항목이 있습니다. token 발급 테스트 진행이 차단됩니다. (${result.resultCode})`;
}
