/**
 * Naver API Auth Config Safe Reader
 *
 * Evaluates whether Naver API credentials appear to be configured in the
 * environment, returning only safe boolean/status values.
 *
 * Safety invariants enforced here:
 * - Credential values (client id, secret, token) are NEVER returned or logged
 * - Masking/partial values are also prohibited — only boolean presence checks
 * - authConfigUsable, accessTokenRequested, credentialsUsed, tokenIssued are
 *   always false — this gate does not enable any live action
 * - No HTTP client, endpoint URL, token, or authorization header reference
 * - maxAllowedState is always NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED
 */

// ── Types ──────────────────────────────────────────────────────────────────────

export type NaverApiAuthConfigStatus =
  | 'CONFIGURED_BUT_BLOCKED'
  | 'MISSING'
  | 'PARTIAL'
  | 'BLOCKED'
  | 'UNKNOWN';

export type NaverApiAuthConfigFieldStatus =
  | 'configured'
  | 'missing'
  | 'blocked'
  | 'unknown';

export type NaverApiAuthConfigCheckItemStatus =
  | 'PASS'
  | 'WARN'
  | 'BLOCKED'
  | 'NEEDS_REVIEW';

export interface NaverApiAuthConfigChecklistItem {
  key: string;
  label: string;
  status: NaverApiAuthConfigCheckItemStatus;
  message: string;
}

export interface NaverApiAuthConfigSafeReaderResult {
  ok: boolean;
  credentialConfigured: boolean;
  /** Always false — credentials cannot be used in the current phase */
  authConfigUsable: false;
  authConfigStatus: NaverApiAuthConfigStatus;
  clientIdStatus: NaverApiAuthConfigFieldStatus;
  clientSecretStatus: NaverApiAuthConfigFieldStatus;
  /** Always "disabled" — token issuance is not implemented in this phase */
  tokenStatus: 'disabled';
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  httpRequestCreated: false;
  endpointCalled: false;
  accessTokenRequested: false;
  credentialsUsed: false;
  tokenIssued: false;
  authorizationHeaderCreated: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  secretVisible: false;
  sanitized: true;
  checklistItems: NaverApiAuthConfigChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  /** Always this value — represents the ceiling of what this reader is allowed to report */
  maxAllowedState: 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED';
}

export interface NaverApiAuthConfigSafeReaderInput {
  /** Env-like map — only key existence is checked; values are never read out */
  envLike: Record<string, string | undefined> | null | undefined;
  /** Keys that must be present for "configured" status */
  requiredConfigKeys: string[];
  optionalConfigKeys?: string[];
  requestedAction?: string;
  /** Ignored — credential use is always blocked in this phase */
  allowCredentialUse?: boolean;
  /** Ignored — token requests are always blocked in this phase */
  allowTokenRequest?: boolean;
  /** Ignored — endpoint calls are always blocked in this phase */
  allowEndpointCall?: boolean;
  environmentSafetyResult?: { ok: boolean } | null;
  liveAdapterSkeletonStatus?: string | null;
}

// ── Internal helpers ───────────────────────────────────────────────────────────

function hasValue(
  envLike: Record<string, string | undefined> | null | undefined,
  key: string
): boolean {
  if (!envLike || typeof envLike !== 'object' || Array.isArray(envLike)) {
    return false;
  }
  const val = envLike[key];
  return typeof val === 'string' && val.length > 0;
}

function classifyField(present: boolean): NaverApiAuthConfigFieldStatus {
  if (present) return 'configured';
  return 'missing';
}

function deriveAuthConfigStatus(
  clientIdPresent: boolean,
  clientSecretPresent: boolean
): NaverApiAuthConfigStatus {
  if (clientIdPresent && clientSecretPresent) return 'CONFIGURED_BUT_BLOCKED';
  if (!clientIdPresent && !clientSecretPresent) return 'MISSING';
  return 'PARTIAL';
}

// ── Public functions ───────────────────────────────────────────────────────────

export function buildNaverApiAuthConfigSafeStatus(
  input: NaverApiAuthConfigSafeReaderInput
): { clientIdPresent: boolean; clientSecretPresent: boolean } {
  const safeEnv =
    input.envLike && typeof input.envLike === 'object' && !Array.isArray(input.envLike)
      ? input.envLike
      : null;

  const requiredKeys = Array.isArray(input.requiredConfigKeys) ? input.requiredConfigKeys : [];

  const clientIdKey = requiredKeys[0] ?? '';
  const clientSecretKey = requiredKeys[1] ?? '';

  const clientIdPresent = clientIdKey ? hasValue(safeEnv, clientIdKey) : false;
  const clientSecretPresent = clientSecretKey ? hasValue(safeEnv, clientSecretKey) : false;

  return { clientIdPresent, clientSecretPresent };
}

export function sanitizeNaverApiAuthConfigStatus(
  result: NaverApiAuthConfigSafeReaderResult
): NaverApiAuthConfigSafeReaderResult {
  // Enforce invariants regardless of what was passed in
  return {
    ...result,
    authConfigUsable: false,
    accessTokenRequested: false,
    credentialsUsed: false,
    tokenIssued: false,
    tokenStatus: 'disabled',
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    httpRequestCreated: false,
    endpointCalled: false,
    authorizationHeaderCreated: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    secretVisible: false,
    sanitized: true,
    maxAllowedState: 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED',
  };
}

export function summarizeNaverApiAuthConfigReadiness(
  result: NaverApiAuthConfigSafeReaderResult
): string {
  if (result.authConfigStatus === 'MISSING') {
    return 'Naver API 인증정보가 설정되지 않았습니다. 인증정보 사용은 차단됩니다.';
  }
  if (result.authConfigStatus === 'PARTIAL') {
    return 'Naver API 인증정보가 일부만 설정되었습니다. 인증정보 사용은 차단됩니다.';
  }
  if (result.authConfigStatus === 'CONFIGURED_BUT_BLOCKED') {
    return 'Naver API 인증정보가 설정된 것으로 보이지만, 이 단계에서는 사용이 차단됩니다.';
  }
  return 'Naver API 인증정보 상태를 확인할 수 없습니다. 인증정보 사용은 차단됩니다.';
}

export function evaluateNaverApiAuthConfigSafeReader(
  input: NaverApiAuthConfigSafeReaderInput
): NaverApiAuthConfigSafeReaderResult {
  const checklist: NaverApiAuthConfigChecklistItem[] = [];
  const blockingReasons: string[] = [];
  const warnings: string[] = [];

  // Safely determine field presence without reading or returning values
  let clientIdPresent = false;
  let clientSecretPresent = false;

  try {
    const status = buildNaverApiAuthConfigSafeStatus(input);
    clientIdPresent = status.clientIdPresent;
    clientSecretPresent = status.clientSecretPresent;
  } catch {
    // malformed input — treat as UNKNOWN/MISSING, never throw
    blockingReasons.push('인증정보 확인 중 예기치 않은 오류가 발생했습니다.');
    warnings.push('envLike 파싱 실패 — UNKNOWN 상태로 처리합니다.');
  }

  const authConfigStatus = deriveAuthConfigStatus(clientIdPresent, clientSecretPresent);
  const clientIdStatus = classifyField(clientIdPresent);
  const clientSecretStatus = classifyField(clientSecretPresent);
  const credentialConfigured = clientIdPresent && clientSecretPresent;

  // ── 체크리스트 ──────────────────────────────────────────────────────────────

  // 1. 인증정보 원문 비포함 확인
  checklist.push({
    key: 'NO_RAW_CREDENTIALS',
    label: '인증정보 원문 비포함',
    status: 'PASS',
    message: '결과에 client id / client secret / token 원문이 포함되지 않습니다.',
  });

  // 2. 마스킹 값 비포함 확인
  checklist.push({
    key: 'NO_MASKED_CREDENTIALS',
    label: '마스킹 값 비포함',
    status: 'PASS',
    message: '부분 마스킹 문자열도 반환하지 않습니다. 오직 configured/missing/blocked/unknown 상태만 반환합니다.',
  });

  // 3. Authorization header 미생성 확인
  checklist.push({
    key: 'NO_AUTH_HEADER',
    label: 'Authorization header 미생성',
    status: 'PASS',
    message: 'authorization header가 생성되지 않았습니다.',
  });

  // 4. Endpoint URL 미사용 확인
  checklist.push({
    key: 'NO_ENDPOINT_URL',
    label: 'Endpoint URL 미사용',
    status: 'PASS',
    message: 'endpoint URL이 사용되지 않았습니다.',
  });

  // 5. clientId 설정 여부
  if (clientIdStatus === 'configured') {
    checklist.push({
      key: 'CLIENT_ID_STATUS',
      label: 'Client ID 설정 여부',
      status: 'PASS',
      message: 'Client ID가 설정된 것으로 보입니다. 원문은 확인하지 않습니다.',
    });
  } else {
    checklist.push({
      key: 'CLIENT_ID_STATUS',
      label: 'Client ID 설정 여부',
      status: 'NEEDS_REVIEW',
      message: 'Client ID가 설정되지 않았습니다.',
    });
    blockingReasons.push('Client ID가 설정되지 않았습니다.');
  }

  // 6. clientSecret 설정 여부
  if (clientSecretStatus === 'configured') {
    checklist.push({
      key: 'CLIENT_SECRET_STATUS',
      label: 'Client Secret 설정 여부',
      status: 'BLOCKED',
      message: 'Client Secret이 설정된 것으로 보이지만, 이 단계에서는 접근이 차단됩니다.',
    });
    // configured라도 blocked 메시지 추가
    warnings.push('Client Secret이 설정되어 있으나 이 단계에서는 사용할 수 없습니다.');
  } else {
    checklist.push({
      key: 'CLIENT_SECRET_STATUS',
      label: 'Client Secret 설정 여부',
      status: 'NEEDS_REVIEW',
      message: 'Client Secret이 설정되지 않았습니다.',
    });
    blockingReasons.push('Client Secret이 설정되지 않았습니다.');
  }

  // 7. authConfigUsable=false 확인
  checklist.push({
    key: 'AUTH_CONFIG_NOT_USABLE',
    label: 'authConfigUsable=false 유지',
    status: 'PASS',
    message: '인증정보가 configured 상태여도 authConfigUsable은 false입니다.',
  });

  // 8. accessTokenRequested=false 확인
  checklist.push({
    key: 'ACCESS_TOKEN_NOT_REQUESTED',
    label: 'accessTokenRequested=false 유지',
    status: 'PASS',
    message: 'access token 발급 요청이 수행되지 않았습니다.',
  });

  // 9. credentialsUsed=false 확인
  checklist.push({
    key: 'CREDENTIALS_NOT_USED',
    label: 'credentialsUsed=false 유지',
    status: 'PASS',
    message: '인증정보가 사용되지 않았습니다.',
  });

  // 10. tokenIssued=false 확인
  checklist.push({
    key: 'TOKEN_NOT_ISSUED',
    label: 'tokenIssued=false 유지',
    status: 'PASS',
    message: 'token이 발급되지 않았습니다.',
  });

  // 11. naverApiCallAllowed=false 확인
  checklist.push({
    key: 'NAVER_API_CALL_NOT_ALLOWED',
    label: 'naverApiCallAllowed=false 유지',
    status: 'PASS',
    message: 'Naver API 호출이 허용되지 않습니다.',
  });

  // 12. liveExecutionEnabled=false 확인
  checklist.push({
    key: 'LIVE_EXECUTION_NOT_ENABLED',
    label: 'liveExecutionEnabled=false 유지',
    status: 'PASS',
    message: 'Live 실행이 비활성화되어 있습니다.',
  });

  // 13. Environment Safety 충돌 여부
  if (input.environmentSafetyResult && input.environmentSafetyResult.ok === false) {
    checklist.push({
      key: 'ENV_SAFETY_COMPATIBLE',
      label: 'Environment Safety 호환성',
      status: 'WARN',
      message: 'Environment Safety Guard가 not-ok 상태입니다. Auth Config Safe Reader와 충돌 없이 차단을 유지합니다.',
    });
    warnings.push('Environment Safety Guard가 not-ok 상태이지만 Auth Config Safe Reader 차단과 충돌하지 않습니다.');
  } else {
    checklist.push({
      key: 'ENV_SAFETY_COMPATIBLE',
      label: 'Environment Safety 호환성',
      status: 'PASS',
      message: 'Environment Safety Guard 상태와 충돌하지 않습니다.',
    });
  }

  // 14. Live Adapter Skeleton disabled 상태 확인
  const skeletonStatus = input.liveAdapterSkeletonStatus ?? 'unknown';
  if (skeletonStatus === 'disabled' || skeletonStatus === 'unknown') {
    checklist.push({
      key: 'LIVE_ADAPTER_SKELETON_DISABLED',
      label: 'Live Adapter Skeleton disabled 확인',
      status: 'PASS',
      message: `Live Adapter Skeleton이 "${skeletonStatus}" 상태입니다. auth safe reader configured 상태여도 충돌하지 않습니다.`,
    });
  } else {
    checklist.push({
      key: 'LIVE_ADAPTER_SKELETON_DISABLED',
      label: 'Live Adapter Skeleton disabled 확인',
      status: 'WARN',
      message: `Live Adapter Skeleton 상태 "${skeletonStatus}"가 예상과 다릅니다. Auth Config Safe Reader는 차단을 유지합니다.`,
    });
    warnings.push(`Live Adapter Skeleton 상태가 "${skeletonStatus}"입니다. Auth Config 차단은 유지됩니다.`);
  }

  // 15. configured 상태여도 blocked 유지 여부
  if (credentialConfigured) {
    checklist.push({
      key: 'CONFIGURED_BUT_STILL_BLOCKED',
      label: 'configured 상태여도 blocked 유지',
      status: 'PASS',
      message: '인증정보가 configured 상태여도 이 단계에서는 모든 action이 차단됩니다.',
    });
  }

  const ok = blockingReasons.length === 0;

  const result: NaverApiAuthConfigSafeReaderResult = {
    ok,
    credentialConfigured,
    authConfigUsable: false,
    authConfigStatus,
    clientIdStatus,
    clientSecretStatus,
    tokenStatus: 'disabled',
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    httpRequestCreated: false,
    endpointCalled: false,
    accessTokenRequested: false,
    credentialsUsed: false,
    tokenIssued: false,
    authorizationHeaderCreated: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    secretVisible: false,
    sanitized: true,
    checklistItems: checklist,
    blockingReasons,
    warnings,
    maxAllowedState: 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED',
  };

  // Final sanitization pass — enforces invariants unconditionally
  return sanitizeNaverApiAuthConfigStatus(result);
}
