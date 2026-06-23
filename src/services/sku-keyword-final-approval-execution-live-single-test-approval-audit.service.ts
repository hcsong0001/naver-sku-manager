/**
 * Live Single Test Approval Audit
 *
 * Builds, validates, and sanitizes the audit record for a Live single-item test approval.
 * This is a pure computation layer — no DB writes, no HTTP calls, no Naver API interactions.
 *
 * Maximum allowed result state: LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE
 *
 * Safety invariants enforced:
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - No HTTP client, endpoint, token, or secret reference
 *   - Sensitive fields are stripped by sanitizeLiveSingleTestApprovalAuditPayload
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type LiveSingleTestApprovalAuditCode =
  | 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE'
  | 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED'
  | 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_MISSING_ACKNOWLEDGEMENTS';

export interface LiveSingleTestApprovalAuditInput {
  finalApprovalId: string;
  batchJobId: string;
  actorId: string;
  acknowledgedItems: string[];
  requiredAcknowledgements: string[];
  targetProductSummary?: unknown;
  payloadSummary?: unknown;
  liveSingleTestApprovalGuardResult?: {
    approvalReady: boolean;
    blockingReasons: string[];
  } | null;
  livePreflightResult?: {
    ready: boolean;
    blockingReasons: string[];
  } | null;
  replayGuardResult?: {
    blocked: boolean;
    reasons: string[];
  } | null;
  liveSafetyGateResult?: {
    blocked: boolean;
    reasons: string[];
  } | null;
  requestedExecutionMode?: string | null;
  adapterMode?: string | null;
  naverApiCalled?: boolean;
  recordedAt?: string;
}

export interface LiveSingleTestApprovalAuditRecord {
  auditCode: LiveSingleTestApprovalAuditCode;
  auditStatus: string;
  auditMessage: string;
  finalApprovalId: string;
  batchJobId: string;
  actorId: string;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  warnings: string[];
  targetProductSummary: Record<string, unknown> | null;
  safePayloadSummary: Record<string, unknown> | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE';
  recordedAt: string;
}

export interface LiveSingleTestApprovalAuditSummary {
  statusLabel: string;
  auditCode: string;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  acknowledgedCount: number;
  totalRequired: number;
  missingCount: number;
  hasBlockers: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PERMANENTLY_BLOCKED_ADAPTER_MODES = new Set([
  'live', 'prod', 'production', 'operating', 'bulk', 'mass',
]);

const SENSITIVE_FIELD_SUBSTRINGS = [
  'secret', 'token', 'password', 'authorization', 'credential',
  'database', 'redis', 'endpoint', 'clientid', 'clientsecret',
  'apikey', 'accesskey', 'privatekey',
];

const SENSITIVE_VALUE_PREFIXES = [
  'postgresql://', 'postgres://', 'redis://', 'mysql://', 'mongodb://',
];

// ── Validate ──────────────────────────────────────────────────────────────────

export function validateLiveSingleTestApprovalAcknowledgements(
  acknowledgedItems: string[],
  requiredAcknowledgements: string[]
): { valid: boolean; missingAcknowledgements: string[] } {
  const missing = requiredAcknowledgements.filter(a => !acknowledgedItems.includes(a));
  return { valid: missing.length === 0, missingAcknowledgements: missing };
}

// ── Sanitize ──────────────────────────────────────────────────────────────────

export function sanitizeLiveSingleTestApprovalAuditPayload(
  payload: unknown
): Record<string, unknown> | null {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const raw = payload as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(raw)) {
    const lowerKey = key.toLowerCase();

    // Strip fields whose name matches any sensitive pattern
    if (SENSITIVE_FIELD_SUBSTRINGS.some(p => lowerKey.includes(p))) continue;

    if (typeof value === 'string') {
      const lowerVal = value.toLowerCase();
      // Strip connection strings and credential-bearing URLs
      if (SENSITIVE_VALUE_PREFIXES.some(p => lowerVal.startsWith(p))) continue;
      if (lowerVal.includes('://') && lowerVal.includes('@')) continue;
      result[key] = value;
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const sanitized = sanitizeLiveSingleTestApprovalAuditPayload(value);
      if (sanitized !== null) result[key] = sanitized;
    } else {
      result[key] = value;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

// ── Build ─────────────────────────────────────────────────────────────────────

export function buildLiveSingleTestApprovalAuditRecord(
  input: LiveSingleTestApprovalAuditInput
): LiveSingleTestApprovalAuditRecord {
  const validation = validateLiveSingleTestApprovalAcknowledgements(
    input.acknowledgedItems,
    input.requiredAcknowledgements
  );

  const safeTargetProductSummary = sanitizeLiveSingleTestApprovalAuditPayload(
    input.targetProductSummary
  );
  const safePayloadSummary = sanitizeLiveSingleTestApprovalAuditPayload(
    input.payloadSummary
  );

  const structuralBlockers: string[] = [];
  const warnings: string[] = [];

  // Adapter mode structural blocker
  const rawAdapterMode = (input.adapterMode ?? '').toLowerCase().trim();
  if (rawAdapterMode && PERMANENTLY_BLOCKED_ADAPTER_MODES.has(rawAdapterMode)) {
    structuralBlockers.push(
      `Adapter Mode "${input.adapterMode}"는 영구 차단 모드입니다 ` +
      '(live/prod/production/operating은 이 단계에서 사용 불가).'
    );
  }

  // naverApiCalled is a warning, not a structural blocker
  if (input.naverApiCalled === true) {
    warnings.push('실행 기록에 Naver API 호출이 감지되었습니다. 감사 로그를 확인하세요.');
  }

  let auditCode: LiveSingleTestApprovalAuditCode;
  let auditStatus: string;
  let auditMessage: string;

  if (structuralBlockers.length > 0) {
    auditCode = 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED';
    auditStatus = 'BLOCKED';
    auditMessage =
      `승인 감사 기록을 생성할 수 없습니다. 차단 사유: ${structuralBlockers.join(' / ')} ` +
      '실제 Naver API 호출은 허용되지 않습니다.';
  } else if (!validation.valid) {
    auditCode = 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_MISSING_ACKNOWLEDGEMENTS';
    auditStatus = 'MISSING_ACKNOWLEDGEMENTS';
    auditMessage =
      `필수 확인 항목 ${validation.missingAcknowledgements.length}개가 누락되었습니다: ` +
      `${validation.missingAcknowledgements.join(', ')}. ` +
      '실제 Naver API 호출은 허용되지 않습니다.';
  } else {
    auditCode = 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE';
    auditStatus = 'RECORDED';
    auditMessage =
      'Live 단일 테스트 승인 기록이 저장되었습니다. ' +
      '실제 Naver API 호출은 아직 비활성화되어 있습니다.';
  }

  const validAcknowledgements = input.acknowledgedItems.filter(a =>
    input.requiredAcknowledgements.includes(a)
  );

  return {
    auditCode,
    auditStatus,
    auditMessage,
    finalApprovalId: input.finalApprovalId,
    batchJobId: input.batchJobId,
    actorId: input.actorId,
    acknowledgedItems: validAcknowledgements,
    missingAcknowledgements: validation.missingAcknowledgements,
    warnings,
    targetProductSummary: safeTargetProductSummary,
    safePayloadSummary,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    recordedAt: input.recordedAt ?? new Date().toISOString(),
  };
}

// ── Summarize ─────────────────────────────────────────────────────────────────

export function summarizeLiveSingleTestApprovalAudit(
  record: LiveSingleTestApprovalAuditRecord,
  totalRequired: number
): LiveSingleTestApprovalAuditSummary {
  const acknowledgedCount = record.acknowledgedItems.length;
  const missingCount = record.missingAcknowledgements.length;
  const hasBlockers = record.auditCode === 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED';

  let statusLabel: string;
  if (record.auditCode === 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE') {
    statusLabel = 'Live 단일 테스트 승인 기록 저장 완료 (Live 실행은 차단됨)';
  } else if (hasBlockers) {
    statusLabel = 'Live 단일 테스트 승인 기록 저장 불가 (구조적 차단)';
  } else {
    statusLabel = `승인 기록 저장 불가 (확인 항목 ${missingCount}개 미확인)`;
  }

  return {
    statusLabel,
    auditCode: record.auditCode,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    acknowledgedCount,
    totalRequired,
    missingCount,
    hasBlockers,
  };
}
