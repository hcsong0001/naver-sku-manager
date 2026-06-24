/**
 * Naver API Token Provider — Test-Only Skeleton
 *
 * Prepares the code path and result structure for the first token issuance test,
 * but NEVER executes a token request in this phase.
 *
 * Safety invariants enforced here:
 * - testOnlyMode is always true
 * - tokenRequestPrepared, tokenRequestExecuted, tokenRequestAllowed are always false
 * - No HTTP client, endpoint URL, fetch/axios, or authorization header
 * - No access token, refresh token, or client secret usage
 * - endpointResolved, httpClientCreated are always false
 * - No token, secret, credential, or endpoint values returned — not even masked
 * - maxAllowedState is always NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED
 */

import type { NaverApiAuthConfigSafeReaderResult } from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import type { NaverApiTokenProviderDisabledResult } from './sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import type { NaverApiTokenDryPermissionGateResult } from './sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';
import type { EnvironmentSafetyGuardResult } from './sku-keyword-final-approval-execution-environment-safety-guard.service';

// ── Types ──────────────────────────────────────────────────────────────────────

export type NaverApiTokenTestOnlyCheckItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface NaverApiTokenTestOnlyChecklistItem {
  key: string;
  label: string;
  status: NaverApiTokenTestOnlyCheckItemStatus;
  message: string;
}

export type NaverApiTokenTestOnlyResultCode =
  | 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED'
  | 'NAVER_AUTH_TOKEN_TEST_ONLY_REQUEST_NOT_EXECUTED'
  | 'NAVER_AUTH_TOKEN_TEST_ONLY_SKELETON_READY_BUT_NO_TOKEN_REQUEST';

export interface NaverApiTokenProviderTestOnlySkeletonResult {
  ok: false;
  success: false;
  status: 'DISABLED' | 'NOT_EXECUTED';
  resultCode: NaverApiTokenTestOnlyResultCode;
  resultMessage: string;

  testOnlyMode: true;
  tokenRequestPrepared: false;
  tokenRequestExecuted: false;
  tokenRequestAllowed: false;
  tokenStatus: 'disabled' | 'not_requested';

  authConfigUsable: false;
  dryPermissionPassed: boolean;

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
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;

  secretVisible: false;
  tokenVisible: false;
  endpointVisible: false;
  sanitized: true;

  checklistItems: NaverApiTokenTestOnlyChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  needsReviewReasons: string[];

  maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED';
}

export interface NaverApiTokenProviderTestOnlySkeletonInput {
  /** Auth Config Safe Reader 결과 — 존재 여부만 참조, 값은 참조하지 않음 */
  authConfigSafety?: NaverApiAuthConfigSafeReaderResult | null;
  /** Token Provider disabled 결과 */
  tokenProviderDisabledStatus?: NaverApiTokenProviderDisabledResult | null;
  /** Token Dry Permission Gate 결과 */
  tokenDryPermissionGate?: NaverApiTokenDryPermissionGateResult | null;
  /** Environment Safety Guard 결과 */
  environmentSafetyResult?: EnvironmentSafetyGuardResult | null;
  requestedAction?: string;
  /** Ignored — token requests are always blocked in this phase */
  allowTokenRequest?: boolean;
  /** Ignored — credential use is always blocked in this phase */
  allowCredentialUse?: boolean;
  /** Ignored — endpoint resolve is always blocked in this phase */
  allowEndpointResolve?: boolean;
  /** Ignored — endpoint calls are always blocked in this phase */
  allowEndpointCall?: boolean;
  actorId?: string | null;
  finalApprovalId?: string | null;
  batchJobId?: string | null;
}

// ── Public functions ───────────────────────────────────────────────────────────

export function createNaverApiTokenProviderTestOnlySkeleton(
  input?: NaverApiTokenProviderTestOnlySkeletonInput | null
): NaverApiTokenProviderTestOnlySkeletonResult {
  return buildNaverApiTokenTestOnlyNotExecutedResult(input ?? {});
}

export function prepareNaverApiTokenTestOnlyRequestSkeleton(
  input?: NaverApiTokenProviderTestOnlySkeletonInput | null
): NaverApiTokenProviderTestOnlySkeletonResult {
  return buildNaverApiTokenTestOnlyNotExecutedResult(input ?? {});
}

export function buildNaverApiTokenTestOnlyNotExecutedResult(
  input: NaverApiTokenProviderTestOnlySkeletonInput
): NaverApiTokenProviderTestOnlySkeletonResult {
  const checklist: NaverApiTokenTestOnlyChecklistItem[] = [];
  const blockingReasons: string[] = [];
  const warnings: string[] = [];
  const needsReviewReasons: string[] = [];

  // ── 섹션 1: 고정 불변 조건 ────────────────────────────────────────────────────

  // 1. testOnlyMode=true
  checklist.push({
    key: 'TEST_ONLY_MODE_ACTIVE',
    label: 'Test-only skeleton 모드 활성화',
    status: 'PASS',
    message: 'testOnlyMode=true입니다. 이 단계에서는 실제 token 발급을 수행하지 않습니다.',
  });

  // 2. tokenRequestPrepared=false
  checklist.push({
    key: 'TOKEN_REQUEST_NOT_PREPARED',
    label: 'tokenRequestPrepared=false 유지',
    status: 'PASS',
    message: 'token 발급 요청이 준비되지 않습니다. 이 단계에서 token 요청 준비는 비활성화됩니다.',
  });

  // 3. tokenRequestExecuted=false
  checklist.push({
    key: 'TOKEN_REQUEST_NOT_EXECUTED',
    label: 'tokenRequestExecuted=false 유지',
    status: 'PASS',
    message: 'token 발급 요청이 실행되지 않습니다. 이 단계에서 token 요청 실행은 비활성화됩니다.',
  });

  // 4. tokenIssued=false
  checklist.push({
    key: 'TOKEN_NOT_ISSUED',
    label: 'tokenIssued=false 유지',
    status: 'PASS',
    message: 'token이 발급되지 않습니다. tokenRequestAllowed=false입니다.',
  });

  // 5. endpointResolved=false
  checklist.push({
    key: 'ENDPOINT_NOT_RESOLVED',
    label: 'endpointResolved=false 유지',
    status: 'PASS',
    message: 'endpoint URL이 resolve되지 않습니다. endpoint URL은 결과에 포함되지 않습니다.',
  });

  // 6. httpClientCreated=false
  checklist.push({
    key: 'HTTP_CLIENT_NOT_CREATED',
    label: 'httpClientCreated=false 유지',
    status: 'PASS',
    message: 'HTTP client가 생성되지 않습니다. fetch/axios 등의 HTTP client 사용이 없습니다.',
  });

  // 7. secret/token/endpoint 비노출
  checklist.push({
    key: 'NO_SECRET_TOKEN_ENDPOINT_EXPOSED',
    label: 'Secret / Token / Endpoint 비노출',
    status: 'PASS',
    message: 'client secret, access token, refresh token, authorization header, endpoint URL이 결과에 포함되지 않습니다.',
  });

  // ── 섹션 2: allowX 입력 무시 확인 ────────────────────────────────────────────

  if (input.allowTokenRequest === true) {
    checklist.push({
      key: 'ALLOW_TOKEN_REQUEST_IGNORED',
      label: 'allowTokenRequest=true 입력 무시',
      status: 'PASS',
      message: 'allowTokenRequest=true 입력이 있어도 tokenRequestExecuted=false로 강제됩니다.',
    });
    warnings.push('allowTokenRequest=true 입력이 있었지만 무시되었습니다.');
  }
  if (input.allowCredentialUse === true) {
    checklist.push({
      key: 'ALLOW_CREDENTIAL_USE_IGNORED',
      label: 'allowCredentialUse=true 입력 무시',
      status: 'PASS',
      message: 'allowCredentialUse=true 입력이 있어도 credentialsUsed=false로 강제됩니다.',
    });
    warnings.push('allowCredentialUse=true 입력이 있었지만 무시되었습니다.');
  }
  if (input.allowEndpointResolve === true) {
    checklist.push({
      key: 'ALLOW_ENDPOINT_RESOLVE_IGNORED',
      label: 'allowEndpointResolve=true 입력 무시',
      status: 'PASS',
      message: 'allowEndpointResolve=true 입력이 있어도 endpointResolved=false로 강제됩니다.',
    });
    warnings.push('allowEndpointResolve=true 입력이 있었지만 무시되었습니다.');
  }
  if (input.allowEndpointCall === true) {
    checklist.push({
      key: 'ALLOW_ENDPOINT_CALL_IGNORED',
      label: 'allowEndpointCall=true 입력 무시',
      status: 'PASS',
      message: 'allowEndpointCall=true 입력이 있어도 endpointCalled=false로 강제됩니다.',
    });
    warnings.push('allowEndpointCall=true 입력이 있었지만 무시되었습니다.');
  }

  // ── 섹션 3: Environment Safety Guard 확인 ────────────────────────────────────

  const envSafety = input.environmentSafetyResult ?? null;
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
  } else {
    checklist.push({
      key: 'ENV_SAFETY_MISSING',
      label: 'Environment Safety Guard 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Environment Safety Guard 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Environment Safety Guard 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 4: Auth Config Safe Reader 확인 ─────────────────────────────────────

  const authConfig = input.authConfigSafety ?? null;
  if (authConfig !== null) {
    if (authConfig.authConfigUsable === false) {
      checklist.push({
        key: 'AUTH_CONFIG_NOT_USABLE',
        label: 'Auth Config: authConfigUsable=false',
        status: 'PASS',
        message: 'Auth Config Safe Reader에서 authConfigUsable=false를 확인했습니다. test-only skeleton에서도 token 발급은 없습니다.',
      });
    }
    if (authConfig.credentialConfigured) {
      checklist.push({
        key: 'AUTH_CONFIG_CREDENTIAL_CONFIGURED',
        label: 'Auth Config: credentialConfigured=true (token 발급은 계속 비활성화)',
        status: 'PASS',
        message: 'Auth Config Safe Reader가 credentialConfigured=true를 반환했습니다. test-only skeleton에서는 token을 발급하지 않습니다.',
      });
      warnings.push('Auth Config Safe Reader가 credentialConfigured=true 상태입니다. 이 단계에서 token은 발급되지 않습니다.');
    } else {
      checklist.push({
        key: 'AUTH_CONFIG_CREDENTIAL_NOT_CONFIGURED',
        label: 'Auth Config: credentialConfigured=false',
        status: 'NEEDS_REVIEW',
        message: 'Auth Config Safe Reader가 credentialConfigured=false를 반환했습니다.',
      });
      needsReviewReasons.push('Auth Config Safe Reader: 인증정보가 설정되지 않은 것으로 보입니다.');
    }
  } else {
    checklist.push({
      key: 'AUTH_CONFIG_MISSING',
      label: 'Auth Config Safe Reader 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Auth Config Safe Reader 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Auth Config Safe Reader 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 5: Token Provider disabled 확인 ─────────────────────────────────────

  const tokenProviderDisabled = input.tokenProviderDisabledStatus ?? null;
  if (tokenProviderDisabled !== null) {
    if (tokenProviderDisabled.accessTokenRequested === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_DISABLED_ACCESS_TOKEN_NOT_REQUESTED',
        label: 'Token Provider disabled: accessTokenRequested=false',
        status: 'PASS',
        message: 'Token Provider disabled에서 accessTokenRequested=false를 확인했습니다.',
      });
    }
    if (tokenProviderDisabled.tokenIssued === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_DISABLED_TOKEN_NOT_ISSUED',
        label: 'Token Provider disabled: tokenIssued=false',
        status: 'PASS',
        message: 'Token Provider disabled에서 tokenIssued=false를 확인했습니다.',
      });
    }
    if (tokenProviderDisabled.credentialsUsed === false) {
      checklist.push({
        key: 'TOKEN_PROVIDER_DISABLED_CREDENTIALS_NOT_USED',
        label: 'Token Provider disabled: credentialsUsed=false',
        status: 'PASS',
        message: 'Token Provider disabled에서 credentialsUsed=false를 확인했습니다.',
      });
    }
  } else {
    checklist.push({
      key: 'TOKEN_PROVIDER_DISABLED_MISSING',
      label: 'Token Provider disabled 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Token Provider disabled 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Token Provider disabled 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 6: Token Dry Permission Gate 확인 ───────────────────────────────────

  const dryGate = input.tokenDryPermissionGate ?? null;
  let dryPermissionPassed = false;

  if (dryGate !== null) {
    dryPermissionPassed = dryGate.dryCheckPassed === true;
    if (dryGate.tokenRequestAllowed === false) {
      checklist.push({
        key: 'DRY_GATE_TOKEN_REQUEST_BLOCKED',
        label: 'Dry Permission Gate: tokenRequestAllowed=false',
        status: 'PASS',
        message: `Dry Permission Gate에서 tokenRequestAllowed=false를 확인했습니다. dryCheckPassed=${String(dryGate.dryCheckPassed)}`,
      });
    }
    if (dryGate.accessTokenRequested === false) {
      checklist.push({
        key: 'DRY_GATE_ACCESS_TOKEN_NOT_REQUESTED',
        label: 'Dry Permission Gate: accessTokenRequested=false',
        status: 'PASS',
        message: 'Dry Permission Gate에서 accessTokenRequested=false를 확인했습니다.',
      });
    }
    if (dryPermissionPassed) {
      checklist.push({
        key: 'DRY_PERMISSION_PASSED_BUT_TOKEN_STILL_DISABLED',
        label: 'Dry Permission Gate 통과 — token 발급은 계속 비활성화',
        status: 'PASS',
        message: 'dryCheckPassed=true이지만 이 test-only skeleton 단계에서는 token 발급을 실행하지 않습니다.',
      });
      warnings.push('dryCheckPassed=true이지만 test-only skeleton에서 token은 발급되지 않습니다.');
    } else {
      checklist.push({
        key: 'DRY_PERMISSION_NOT_PASSED',
        label: `Dry Permission Gate: dryCheckPassed=${String(dryGate.dryCheckPassed)}`,
        status: dryGate.status === 'BLOCKED' ? 'BLOCKED' : 'NEEDS_REVIEW',
        message: `Dry Permission Gate: ${dryGate.resultMessage}`,
      });
      if (dryGate.status === 'BLOCKED') {
        blockingReasons.push(`Token Dry Permission Gate: ${dryGate.resultMessage}`);
      } else {
        needsReviewReasons.push(`Token Dry Permission Gate: ${dryGate.resultMessage}`);
      }
    }
  } else {
    checklist.push({
      key: 'DRY_PERMISSION_GATE_MISSING',
      label: 'Token Dry Permission Gate 결과 미제공',
      status: 'NEEDS_REVIEW',
      message: 'Token Dry Permission Gate 결과가 제공되지 않았습니다.',
    });
    needsReviewReasons.push('Token Dry Permission Gate 결과가 제공되지 않았습니다.');
  }

  // ── 섹션 7: maxAllowedState 유지 ─────────────────────────────────────────────

  checklist.push({
    key: 'MAX_ALLOWED_STATE_TEST_ONLY_DISABLED',
    label: 'maxAllowedState test-only disabled 계열 유지',
    status: 'PASS',
    message: 'maxAllowedState는 항상 NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED입니다.',
  });

  // ── 결과 코드 결정 ─────────────────────────────────────────────────────────────

  let resultCode: NaverApiTokenTestOnlyResultCode;
  let status: 'DISABLED' | 'NOT_EXECUTED';

  if (blockingReasons.length > 0) {
    status = 'DISABLED';
    resultCode = 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED';
  } else if (needsReviewReasons.length > 0) {
    status = 'NOT_EXECUTED';
    resultCode = 'NAVER_AUTH_TOKEN_TEST_ONLY_REQUEST_NOT_EXECUTED';
  } else {
    status = 'NOT_EXECUTED';
    resultCode = 'NAVER_AUTH_TOKEN_TEST_ONLY_SKELETON_READY_BUT_NO_TOKEN_REQUEST';
  }

  const resultMessage =
    resultCode === 'NAVER_AUTH_TOKEN_TEST_ONLY_SKELETON_READY_BUT_NO_TOKEN_REQUEST'
      ? 'Token test-only skeleton이 준비되었습니다. 그러나 이 단계에서는 token 발급 요청을 실행하지 않습니다.'
      : resultCode === 'NAVER_AUTH_TOKEN_TEST_ONLY_REQUEST_NOT_EXECUTED'
        ? 'Token test-only skeleton이 준비 중입니다. 일부 항목이 확인 필요 상태입니다. token 발급 요청은 실행되지 않습니다.'
        : `Token test-only skeleton이 비활성화 상태입니다. ${blockingReasons.length}건의 차단 사유가 있습니다.`;

  const tokenStatus: 'disabled' | 'not_requested' =
    blockingReasons.length > 0 ? 'disabled' : 'not_requested';

  const result: NaverApiTokenProviderTestOnlySkeletonResult = {
    ok: false,
    success: false,
    status,
    resultCode,
    resultMessage,

    testOnlyMode: true,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    tokenRequestAllowed: false,
    tokenStatus,

    authConfigUsable: false,
    dryPermissionPassed,

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
    operatingDbWriteAllowed: false,
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

    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED',
  };

  return sanitizeNaverApiTokenTestOnlySkeletonResult(result);
}

export function sanitizeNaverApiTokenTestOnlySkeletonResult(
  result: NaverApiTokenProviderTestOnlySkeletonResult
): NaverApiTokenProviderTestOnlySkeletonResult {
  return {
    ...result,
    testOnlyMode: true,
    tokenRequestPrepared: false,
    tokenRequestExecuted: false,
    tokenRequestAllowed: false,
    authConfigUsable: false,
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
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    secretVisible: false,
    tokenVisible: false,
    endpointVisible: false,
    sanitized: true,
    maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED',
  };
}

export function summarizeNaverApiTokenTestOnlyReadiness(
  result: NaverApiTokenProviderTestOnlySkeletonResult
): string {
  if (result.resultCode === 'NAVER_AUTH_TOKEN_TEST_ONLY_SKELETON_READY_BUT_NO_TOKEN_REQUEST') {
    return `Token test-only skeleton 준비 완료. token 발급은 실행되지 않습니다. (${result.resultCode})`;
  }
  const total = result.blockingReasons.length + result.needsReviewReasons.length;
  return `Token test-only skeleton: ${total}건의 미해결 항목이 있습니다. token 발급 요청은 실행되지 않습니다. (${result.resultCode})`;
}
