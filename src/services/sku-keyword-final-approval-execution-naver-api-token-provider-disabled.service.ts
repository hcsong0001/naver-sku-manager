/**
 * Naver API Token Provider — Disabled Skeleton
 *
 * Registers the token provider type/structure but never issues a token.
 * All token-related actions are permanently blocked in this phase.
 *
 * Safety invariants enforced here:
 * - No HTTP client, endpoint URL, fetch/axios, or authorization header
 * - No access token, refresh token, or client secret usage
 * - accessTokenRequested, tokenIssued, credentialsUsed are always false
 * - No token, secret, or credential values returned — not even masked
 * - maxAllowedState is always NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED
 */

import type { NaverApiAuthConfigSafeReaderResult } from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';

// ── Types ──────────────────────────────────────────────────────────────────────

export type NaverApiTokenProviderCheckItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface NaverApiTokenProviderChecklistItem {
  key: string;
  label: string;
  status: NaverApiTokenProviderCheckItemStatus;
  message: string;
}

export interface NaverApiTokenProviderDisabledResult {
  ok: false;
  success: false;
  status: 'DISABLED';
  resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED';
  resultMessage: string;

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

  checklistItems: NaverApiTokenProviderChecklistItem[];
  blockingReasons: string[];
  warnings: string[];

  maxAllowedState: 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED';
}

export interface NaverApiTokenProviderDisabledInput {
  /** Auth Config Safe Reader 결과 — 인증정보 존재 여부만 참조, 값은 참조하지 않음 */
  authConfigSafety?: NaverApiAuthConfigSafeReaderResult | null;
  requestedAction?: string;
  /** Ignored — token requests are always blocked in this phase */
  allowTokenRequest?: boolean;
  /** Ignored — credential use is always blocked in this phase */
  allowCredentialUse?: boolean;
  /** Ignored — endpoint calls are always blocked in this phase */
  allowEndpointCall?: boolean;
  environmentSafetyResult?: { ok: boolean } | null;
  liveAdapterSkeletonStatus?: string | null;
  actorId?: string | null;
  finalApprovalId?: string | null;
  batchJobId?: string | null;
}

// ── Public functions ───────────────────────────────────────────────────────────

export function createNaverApiTokenProviderDisabled(
  input?: NaverApiTokenProviderDisabledInput | null
): NaverApiTokenProviderDisabledResult {
  return buildNaverApiTokenRequestDisabledResult(input ?? {});
}

export function requestNaverApiAccessTokenDisabled(
  input?: NaverApiTokenProviderDisabledInput | null
): NaverApiTokenProviderDisabledResult {
  return buildNaverApiTokenRequestDisabledResult(input ?? {});
}

export function buildNaverApiTokenRequestDisabledResult(
  input: NaverApiTokenProviderDisabledInput
): NaverApiTokenProviderDisabledResult {
  const checklist: NaverApiTokenProviderChecklistItem[] = [];
  const blockingReasons: string[] = [];
  const warnings: string[] = [];

  // 1. Token Provider skeleton이 disabled 상태인지
  checklist.push({
    key: 'TOKEN_PROVIDER_DISABLED',
    label: 'Token Provider disabled 상태 확인',
    status: 'PASS',
    message: 'Token Provider skeleton은 등록되어 있지만 token 발급은 비활성화되어 있습니다.',
  });

  // 2. accessTokenRequested=false
  checklist.push({
    key: 'ACCESS_TOKEN_NOT_REQUESTED',
    label: 'accessTokenRequested=false 유지',
    status: 'PASS',
    message: 'access token 발급 요청이 수행되지 않았습니다. allowTokenRequest 입력값은 무시됩니다.',
  });

  // 3. refreshTokenRequested=false
  checklist.push({
    key: 'REFRESH_TOKEN_NOT_REQUESTED',
    label: 'refreshTokenRequested=false 유지',
    status: 'PASS',
    message: 'refresh token 요청이 수행되지 않았습니다.',
  });

  // 4. tokenIssued=false
  checklist.push({
    key: 'TOKEN_NOT_ISSUED',
    label: 'tokenIssued=false 유지',
    status: 'PASS',
    message: 'token이 발급되지 않았습니다.',
  });

  // 5. tokenStored=false
  checklist.push({
    key: 'TOKEN_NOT_STORED',
    label: 'tokenStored=false 유지',
    status: 'PASS',
    message: 'token이 저장되지 않았습니다.',
  });

  // 6. credentialsUsed=false
  checklist.push({
    key: 'CREDENTIALS_NOT_USED',
    label: 'credentialsUsed=false 유지',
    status: 'PASS',
    message: '인증정보(client secret 등)가 사용되지 않았습니다. allowCredentialUse 입력값은 무시됩니다.',
  });

  // 7. authorizationHeaderCreated=false
  checklist.push({
    key: 'NO_AUTH_HEADER',
    label: 'authorizationHeaderCreated=false 유지',
    status: 'PASS',
    message: 'Authorization header가 생성되지 않았습니다.',
  });

  // 8. endpointCalled=false
  checklist.push({
    key: 'ENDPOINT_NOT_CALLED',
    label: 'endpointCalled=false 유지',
    status: 'PASS',
    message: 'Naver API endpoint가 호출되지 않았습니다. allowEndpointCall 입력값은 무시됩니다.',
  });

  // 9. httpRequestCreated=false
  checklist.push({
    key: 'NO_HTTP_REQUEST',
    label: 'httpRequestCreated=false 유지',
    status: 'PASS',
    message: 'HTTP 요청이 생성되지 않았습니다. fetch/axios/http client가 사용되지 않았습니다.',
  });

  // 10. naverApiCallAllowed=false
  checklist.push({
    key: 'NAVER_API_CALL_NOT_ALLOWED',
    label: 'naverApiCallAllowed=false 유지',
    status: 'PASS',
    message: 'Naver API 호출이 허용되지 않습니다.',
  });

  // 11. liveExecutionEnabled=false
  checklist.push({
    key: 'LIVE_EXECUTION_NOT_ENABLED',
    label: 'liveExecutionEnabled=false 유지',
    status: 'PASS',
    message: 'Live 실행이 비활성화되어 있습니다.',
  });

  // 12. secretVisible=false / tokenVisible=false
  checklist.push({
    key: 'NO_SECRET_OR_TOKEN_VISIBLE',
    label: 'Secret / Token 원문 비노출',
    status: 'PASS',
    message: 'client secret, access token, refresh token 원문이 결과에 포함되지 않습니다. 마스킹 값도 반환하지 않습니다.',
  });

  // 13. Auth Config Safe Reader 결과와 충돌하지 않는지
  const authConfigSafety = input.authConfigSafety ?? null;
  if (authConfigSafety !== null) {
    const configuredButBlocked =
      authConfigSafety.credentialConfigured === true;

    if (configuredButBlocked) {
      checklist.push({
        key: 'AUTH_CONFIG_CONFIGURED_BUT_TOKEN_STILL_BLOCKED',
        label: 'Auth Config configured여도 token 발급 차단 유지',
        status: 'PASS',
        message:
          'Auth Config Safe Reader가 credentialConfigured=true를 반환해도 Token Provider는 token을 발급하지 않습니다.',
      });
      warnings.push(
        'Auth Config Safe Reader가 credentialConfigured=true 상태입니다. Token Provider는 이 단계에서 token 발급을 수행하지 않습니다.'
      );
    } else {
      checklist.push({
        key: 'AUTH_CONFIG_NOT_CONFIGURED',
        label: 'Auth Config 미설정 상태 확인',
        status: 'NEEDS_REVIEW',
        message:
          'Auth Config Safe Reader가 인증정보 미설정 상태를 반환했습니다. Token 발급은 계속 차단됩니다.',
      });
      blockingReasons.push('Auth Config Safe Reader가 인증정보 미설정 상태를 반환했습니다. Token 발급은 차단됩니다.');
    }

    // Auth Config Safe Reader의 accessTokenRequested와 충돌하지 않는지
    checklist.push({
      key: 'AUTH_CONFIG_ACCESS_TOKEN_COMPATIBLE',
      label: 'Auth Config Safe Reader accessTokenRequested 충돌 없음',
      status: 'PASS',
      message:
        'Auth Config Safe Reader의 accessTokenRequested=false 상태와 충돌하지 않습니다.',
    });

    // Auth Config Safe Reader의 credentialsUsed와 충돌하지 않는지
    checklist.push({
      key: 'AUTH_CONFIG_CREDENTIALS_COMPATIBLE',
      label: 'Auth Config Safe Reader credentialsUsed 충돌 없음',
      status: 'PASS',
      message:
        'Auth Config Safe Reader의 credentialsUsed=false 상태와 충돌하지 않습니다.',
    });
  } else {
    checklist.push({
      key: 'AUTH_CONFIG_SAFETY_NOT_PROVIDED',
      label: 'Auth Config Safe Reader 결과 미제공',
      status: 'WARN',
      message:
        'Auth Config Safe Reader 결과가 제공되지 않았습니다. Token 발급은 계속 차단됩니다.',
    });
    warnings.push('Auth Config Safe Reader 결과가 제공되지 않았습니다. Token 발급 차단은 유지됩니다.');
  }

  // 14. allowTokenRequest=true가 들어와도 차단 유지
  if (input.allowTokenRequest === true) {
    checklist.push({
      key: 'ALLOW_TOKEN_REQUEST_IGNORED',
      label: 'allowTokenRequest=true 입력 무시',
      status: 'PASS',
      message:
        'allowTokenRequest=true 입력이 있어도 이 단계에서는 accessTokenRequested=false로 강제됩니다.',
    });
    warnings.push('allowTokenRequest=true 입력이 있었지만 무시되었습니다. Token 발급은 차단됩니다.');
  }

  // 15. allowCredentialUse=true가 들어와도 차단 유지
  if (input.allowCredentialUse === true) {
    checklist.push({
      key: 'ALLOW_CREDENTIAL_USE_IGNORED',
      label: 'allowCredentialUse=true 입력 무시',
      status: 'PASS',
      message:
        'allowCredentialUse=true 입력이 있어도 credentialsUsed=false로 강제됩니다.',
    });
    warnings.push('allowCredentialUse=true 입력이 있었지만 무시되었습니다. 인증정보는 사용되지 않습니다.');
  }

  // 16. allowEndpointCall=true가 들어와도 차단 유지
  if (input.allowEndpointCall === true) {
    checklist.push({
      key: 'ALLOW_ENDPOINT_CALL_IGNORED',
      label: 'allowEndpointCall=true 입력 무시',
      status: 'PASS',
      message:
        'allowEndpointCall=true 입력이 있어도 endpointCalled=false로 강제됩니다.',
    });
    warnings.push('allowEndpointCall=true 입력이 있었지만 무시되었습니다. Endpoint는 호출되지 않습니다.');
  }

  // 17. Environment Safety 호환성 확인
  if (input.environmentSafetyResult && input.environmentSafetyResult.ok === false) {
    checklist.push({
      key: 'ENV_SAFETY_COMPATIBLE',
      label: 'Environment Safety 호환성',
      status: 'WARN',
      message:
        'Environment Safety Guard가 not-ok 상태입니다. Token Provider disabled 차단과 충돌하지 않습니다.',
    });
    warnings.push(
      'Environment Safety Guard가 not-ok 상태이지만 Token Provider disabled 차단과 충돌하지 않습니다.'
    );
  } else {
    checklist.push({
      key: 'ENV_SAFETY_COMPATIBLE',
      label: 'Environment Safety 호환성',
      status: 'PASS',
      message: 'Environment Safety Guard 상태와 충돌하지 않습니다.',
    });
  }

  // 18. Live Adapter Skeleton disabled 상태 확인
  const skeletonStatus = input.liveAdapterSkeletonStatus ?? 'unknown';
  checklist.push({
    key: 'LIVE_ADAPTER_SKELETON_COMPATIBLE',
    label: 'Live Adapter Skeleton 호환성',
    status: 'PASS',
    message: `Live Adapter Skeleton 상태 "${skeletonStatus}"와 충돌하지 않습니다. Token Provider disabled 차단이 유지됩니다.`,
  });

  // 19. maxAllowedState 확인
  checklist.push({
    key: 'MAX_ALLOWED_STATE_DISABLED',
    label: 'maxAllowedState disabled 계열 확인',
    status: 'PASS',
    message:
      'maxAllowedState는 항상 NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED입니다. 실행 가능 상태로 전환되지 않습니다.',
  });

  const result: NaverApiTokenProviderDisabledResult = {
    ok: false,
    success: false,
    status: 'DISABLED',
    resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED',
    resultMessage:
      'Token Provider skeleton이 등록되어 있지만 이 단계에서는 token 발급이 비활성화되어 있습니다. access token 발급, refresh token 요청, authorization header 생성, Naver API 호출을 수행하지 않습니다.',

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

    maxAllowedState: 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED',
  };

  return sanitizeNaverApiTokenProviderResult(result);
}

export function sanitizeNaverApiTokenProviderResult(
  result: NaverApiTokenProviderDisabledResult
): NaverApiTokenProviderDisabledResult {
  return {
    ...result,
    ok: false,
    success: false,
    status: 'DISABLED',
    resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED',
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
    maxAllowedState: 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED',
  };
}

export function summarizeNaverApiTokenProviderReadiness(
  result: NaverApiTokenProviderDisabledResult
): string {
  return `Token Provider skeleton이 등록되어 있지만 token 발급은 비활성화되어 있습니다. (${result.resultCode})`;
}
