/**
 * Execution Environment Safety Guard
 *
 * Evaluates whether the current execution environment is safe for
 * approval-record-only operations (audit trail). This is a pure function —
 * it receives pre-computed safe hints (NOT raw URLs or secrets).
 *
 * Safety invariants (always enforced, never bypassed by any input):
 *   - naverApiCallAllowed is ALWAYS false
 *   - operatingDbWriteAllowed is ALWAYS false
 *   - queueAllowed is ALWAYS false
 *   - workerAllowed is ALWAYS false
 *   - sanitized is ALWAYS true
 *   - DATABASE_URL / REDIS_URL / secret / token originals are NEVER included in output
 *
 * Maximum allowed state: ENVIRONMENT_SAFETY_CHECK_READY_BUT_LIVE_DISABLED
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type DbEnvironmentClass = 'local' | 'test' | 'unknown' | 'operating_blocked';

export type EnvironmentSafetyChecklistItemStatus = 'PASS' | 'WARN' | 'BLOCKED' | 'NEEDS_REVIEW';

export interface EnvironmentSafetyChecklistItem {
  key: string;
  label: string;
  status: EnvironmentSafetyChecklistItemStatus;
  message: string;
}

export interface EnvironmentSafetyGuardInput {
  nodeEnv?: string | null;
  appEnv?: string | null;
  executionMode?: string | null;
  adapterMode?: string | null;
  databaseUrlPresent?: boolean;
  databaseUrlSafeHint?: string | null;
  redisUrlPresent?: boolean;
  redisUrlSafeHint?: string | null;
  isTestDatabase?: boolean;
  isLocalDatabase?: boolean;
  isOperatingDatabase?: boolean;
  allowOperatingDbWrite?: boolean;
  allowNaverApiCall?: boolean;
  requestedAction?: string | null;
}

export interface EnvironmentSafetyGuardResult {
  allowed: boolean;
  environmentCode: string;
  environmentMessage: string;
  databaseEnvironment: DbEnvironmentClass;
  redisEnvironment: DbEnvironmentClass;
  naverApiCallAllowed: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  checklistItems: EnvironmentSafetyChecklistItem[];
  blockingReasons: string[];
  warnings: string[];
  sanitized: true;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PERMANENTLY_BLOCKED_ADAPTER_MODES = new Set([
  'live', 'prod', 'production', 'operating', 'bulk', 'mass',
]);

// ── Classify helpers ──────────────────────────────────────────────────────────

export function classifyDatabaseEnvironment(
  hint: string | null | undefined,
  isLocal?: boolean,
  isTest?: boolean,
  isOperating?: boolean
): DbEnvironmentClass {
  if (isOperating === true) return 'operating_blocked';
  if (isLocal === true) return 'local';
  if (isTest === true) return 'test';

  switch (hint) {
    case 'local_host': return 'local';
    case 'test_or_dev': return 'test';
    case 'possible_prod': return 'operating_blocked';
    default: return 'unknown';
  }
}

// ── Checklist builder ─────────────────────────────────────────────────────────

export function buildEnvironmentSafetyChecklist(
  input: EnvironmentSafetyGuardInput,
  dbEnv: DbEnvironmentClass,
  redisEnv: DbEnvironmentClass
): EnvironmentSafetyChecklistItem[] {
  const items: EnvironmentSafetyChecklistItem[] = [];

  // 1. DATABASE_URL 원문 노출 없음 (구조적 보장)
  items.push({
    key: 'no_database_url_exposed',
    label: 'DATABASE_URL 원문 비노출',
    status: 'PASS',
    message: 'DATABASE_URL 원문은 응답/UI에 포함되지 않습니다. 안전한 분류값만 사용합니다.',
  });

  // 2. REDIS_URL 원문 노출 없음 (구조적 보장)
  items.push({
    key: 'no_redis_url_exposed',
    label: 'REDIS_URL 원문 비노출',
    status: 'PASS',
    message: 'REDIS_URL 원문은 응답/UI에 포함되지 않습니다. 안전한 분류값만 사용합니다.',
  });

  // 3. secret/token/client secret 노출 없음 (구조적 보장)
  items.push({
    key: 'no_secret_exposed',
    label: 'secret/token/API key 비노출',
    status: 'PASS',
    message: '인증 토큰, 비밀키, API key는 응답/UI에 포함되지 않습니다.',
  });

  // 4. Naver API 호출 불가 (구조적 강제)
  items.push({
    key: 'naver_api_not_allowed',
    label: 'Naver API 호출 비활성화 (구조적)',
    status: 'PASS',
    message: 'naverApiCallAllowed는 이 Guard에서 항상 false로 강제됩니다.',
  });

  // 5. 운영 DB write 차단 (구조적 강제)
  items.push({
    key: 'operating_db_write_blocked',
    label: '운영 DB write 차단 (구조적)',
    status: 'PASS',
    message: 'operatingDbWriteAllowed는 이 Guard에서 항상 false로 강제됩니다. allowOperatingDbWrite 입력값은 무시됩니다.',
  });

  // 6. Queue 비활성화 (구조적 강제)
  items.push({
    key: 'queue_not_allowed',
    label: 'Queue 비활성화 (구조적)',
    status: 'PASS',
    message: 'queueAllowed는 이 Guard에서 항상 false로 강제됩니다.',
  });

  // 7. Worker 비활성화 (구조적 강제)
  items.push({
    key: 'worker_not_allowed',
    label: 'Worker 비활성화 (구조적)',
    status: 'PASS',
    message: 'workerAllowed는 이 Guard에서 항상 false로 강제됩니다.',
  });

  // 8. Adapter Mode 확인
  const rawAdapterMode = (input.adapterMode ?? '').toLowerCase().trim();
  if (rawAdapterMode && PERMANENTLY_BLOCKED_ADAPTER_MODES.has(rawAdapterMode)) {
    items.push({
      key: 'adapter_mode_safe',
      label: 'Adapter Mode 확인',
      status: 'BLOCKED',
      message: `Adapter Mode "${input.adapterMode}"는 영구 차단 모드입니다 (live/prod/production/operating은 이 단계에서 사용 불가).`,
    });
  } else {
    items.push({
      key: 'adapter_mode_safe',
      label: 'Adapter Mode 확인',
      status: 'PASS',
      message: `현재 Adapter Mode "${input.adapterMode ?? 'mock/미설정'}"는 실제 Naver API를 호출하지 않는 안전한 모드입니다.`,
    });
  }

  // 9. DB 환경 분류
  if (dbEnv === 'operating_blocked') {
    items.push({
      key: 'database_environment',
      label: 'DB 환경 분류',
      status: 'BLOCKED',
      message: 'DB URL 힌트가 운영(production) 환경을 나타냅니다. 이 단계에서 운영 DB write는 차단됩니다.',
    });
  } else if (dbEnv === 'unknown') {
    items.push({
      key: 'database_environment',
      label: 'DB 환경 분류',
      status: 'NEEDS_REVIEW',
      message: 'DB 환경을 로컬/테스트/운영으로 분류할 수 없습니다. 환경 설정을 확인하세요.',
    });
  } else {
    items.push({
      key: 'database_environment',
      label: 'DB 환경 분류',
      status: 'PASS',
      message: `DB 환경이 "${dbEnv}"으로 분류되어 있습니다. DATABASE_URL 원문은 표시하지 않습니다.`,
    });
  }

  // 10. Redis 환경 분류
  if (redisEnv === 'operating_blocked') {
    items.push({
      key: 'redis_environment',
      label: 'Redis 환경 분류',
      status: 'WARN',
      message: 'Redis URL 힌트가 운영 환경을 나타냅니다. REDIS_URL 원문은 표시하지 않습니다.',
    });
  } else if (redisEnv === 'unknown') {
    items.push({
      key: 'redis_environment',
      label: 'Redis 환경 분류',
      status: 'WARN',
      message: 'Redis 환경을 분류할 수 없습니다. REDIS_URL 원문은 표시하지 않습니다.',
    });
  } else {
    items.push({
      key: 'redis_environment',
      label: 'Redis 환경 분류',
      status: 'PASS',
      message: `Redis 환경이 "${redisEnv}"으로 분류되어 있습니다. REDIS_URL 원문은 표시하지 않습니다.`,
    });
  }

  // 11. 승인 기록 저장과 실행 흐름 분리 확인
  const action = (input.requestedAction ?? '').toLowerCase();
  const isAuditOnly = action.includes('audit') || action.includes('approval') || action.includes('record');
  if (isAuditOnly || !action) {
    items.push({
      key: 'approval_record_only',
      label: '승인 기록 저장과 실행 흐름 분리',
      status: 'PASS',
      message: '현재 요청 동작은 승인 기록(감사 추적) 저장 전용이며 실행 흐름과 분리되어 있습니다.',
    });
  } else {
    items.push({
      key: 'approval_record_only',
      label: '승인 기록 저장과 실행 흐름 분리',
      status: 'WARN',
      message: `요청 동작 "${input.requestedAction}"이 실행 흐름과의 분리 여부를 명확히 확인하세요.`,
    });
  }

  // 12. Live 실행 비활성화 (구조적 강제)
  items.push({
    key: 'live_execution_disabled',
    label: 'Live 실행 비활성화 (구조적)',
    status: 'PASS',
    message: 'Live 실행은 이 단계에서 구조적으로 비활성화되어 있습니다. 승인 기록이 있어도 liveExecutionEnabled는 false입니다.',
  });

  return items;
}

// ── Main evaluation ───────────────────────────────────────────────────────────

export function evaluateExecutionEnvironmentSafetyGuard(
  input: EnvironmentSafetyGuardInput
): EnvironmentSafetyGuardResult {
  const dbEnv = classifyDatabaseEnvironment(
    input.databaseUrlSafeHint,
    input.isLocalDatabase,
    input.isTestDatabase,
    input.isOperatingDatabase
  );
  const redisEnv = classifyDatabaseEnvironment(
    input.redisUrlSafeHint,
    undefined,
    undefined,
    undefined
  );

  const checklistItems = buildEnvironmentSafetyChecklist(input, dbEnv, redisEnv);

  const blockedItems = checklistItems.filter(i => i.status === 'BLOCKED');
  const warnItems = checklistItems.filter(
    i => i.status === 'WARN' || i.status === 'NEEDS_REVIEW'
  );

  const blockingReasons = blockedItems.map(i => i.message);
  const warnings = warnItems.map(i => i.message);

  const allowed = blockedItems.length === 0;

  let environmentCode: string;
  let environmentMessage: string;

  if (!allowed) {
    environmentCode = 'OPERATING_WRITE_BLOCKED_AND_LIVE_CALL_DISABLED';
    environmentMessage =
      `환경 안전 점검에서 ${blockedItems.length}개 항목이 차단 상태입니다. ` +
      '운영 DB write와 Naver API 호출은 허용되지 않습니다.';
  } else if (warnItems.length > 0) {
    environmentCode = 'ENVIRONMENT_SAFETY_CHECK_READY_BUT_LIVE_DISABLED';
    environmentMessage =
      `환경 안전 조건이 충족되었습니다 (경고 ${warnItems.length}건 있음). ` +
      '운영 DB write, Naver API 호출, Queue, Worker는 모두 비활성화되어 있습니다.';
  } else {
    environmentCode = 'ENVIRONMENT_SAFETY_CHECK_READY_BUT_LIVE_DISABLED';
    environmentMessage =
      '환경 안전 점검이 통과되었습니다. ' +
      '운영 DB write, Naver API 호출, Queue, Worker는 모두 비활성화되어 있습니다.';
  }

  return {
    allowed,
    environmentCode,
    environmentMessage,
    databaseEnvironment: dbEnv,
    redisEnvironment: redisEnv,
    naverApiCallAllowed: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    checklistItems,
    blockingReasons,
    warnings,
    sanitized: true,
  };
}

// ── Sanitize helper ───────────────────────────────────────────────────────────

export function sanitizeEnvironmentSafetySummary(
  result: EnvironmentSafetyGuardResult
): Record<string, unknown> {
  return {
    allowed: result.allowed,
    environmentCode: result.environmentCode,
    environmentMessage: result.environmentMessage,
    databaseEnvironment: result.databaseEnvironment,
    redisEnvironment: result.redisEnvironment,
    naverApiCallAllowed: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    blockingCount: result.checklistItems.filter(i => i.status === 'BLOCKED').length,
    warningCount: result.checklistItems.filter(
      i => i.status === 'WARN' || i.status === 'NEEDS_REVIEW'
    ).length,
    passCount: result.checklistItems.filter(i => i.status === 'PASS').length,
    checklistItems: result.checklistItems,
    blockingReasons: result.blockingReasons,
    warnings: result.warnings,
    sanitized: true,
  };
}
