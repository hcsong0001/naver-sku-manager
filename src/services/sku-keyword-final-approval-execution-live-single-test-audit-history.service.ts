/**
 * Live Single Test Audit History Service
 *
 * Read-only service for retrieving and summarizing live single test approval audit records.
 * All functions are pure — no DB writes, no HTTP calls, no side effects.
 *
 * Safety invariants (always enforced, never bypassed):
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - operatingDbWriteAllowed is ALWAYS false
 *   - queueAllowed is ALWAYS false
 *   - workerAllowed is ALWAYS false
 *   - sanitized is ALWAYS true
 *   - DATABASE_URL / REDIS_URL / secret / token / API key originals are NEVER included in output
 *   - Maximum allowed state: LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type AuditHistoryItemStatus =
  | 'RECORDED_BUT_NOT_EXECUTABLE'
  | 'UNKNOWN';

export interface LiveSingleTestAuditHistoryItem {
  id: string;
  batchJobId: string;
  finalApprovalId: string | null;
  auditCode: string;
  status: AuditHistoryItemStatus;
  recordedAt: string | null;
  actorId: string | null;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  targetProductSummary: Record<string, unknown> | null;
  safePayloadSummary: Record<string, unknown> | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
}

export interface LiveSingleTestAuditHistoryResult {
  exists: boolean;
  latestAudit: LiveSingleTestAuditHistoryItem | null;
  items: LiveSingleTestAuditHistoryItem[];
  summary: LiveSingleTestAuditHistorySummary;
  blockingReasons: string[];
  warnings: string[];
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
  maxAllowedState: 'LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY';
}

export interface LiveSingleTestAuditHistorySummary {
  totalRecords: number;
  hasAuditRecord: boolean;
  latestAuditCode: string | null;
  latestRecordedAt: string | null;
  latestActorId: string | null;
  latestStatus: AuditHistoryItemStatus | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
}

export interface AuditHistoryInput {
  batchJobId: string;
  finalApprovalId?: string | null;
  jobStatus?: string | null;
  metadata?: unknown;
  liveSingleTestApprovalAudit?: unknown;
}

// ── Sensitive field detection ─────────────────────────────────────────────────

const SENSITIVE_FIELD_SUBSTRINGS = [
  'secret', 'token', 'password', 'authorization', 'credential',
  'database', 'redis', 'endpoint', 'clientid', 'clientsecret',
  'apikey', 'accesskey', 'privatekey',
];

const SENSITIVE_VALUE_PREFIXES = [
  'postgresql://', 'postgres://', 'redis://', 'mysql://', 'mongodb://',
];

function isSensitiveFieldName(name: string): boolean {
  const lower = name.toLowerCase().replace(/[-_\s]/g, '');
  return SENSITIVE_FIELD_SUBSTRINGS.some(s => lower.includes(s));
}

function isSensitiveValue(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const lower = value.toLowerCase();
  if (SENSITIVE_VALUE_PREFIXES.some(p => lower.startsWith(p))) return true;
  if (lower.includes('://') && lower.includes('@')) return true;
  return false;
}

// ── Sanitize target product summary ──────────────────────────────────────────

function sanitizeTargetProductSummary(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  const safeStringFields = [
    'itemId', 'targetType', 'targetId', 'channelProductNo',
    'productName', 'skuCode', 'changeType',
  ];
  for (const field of safeStringFields) {
    if (typeof m[field] === 'string' && !isSensitiveValue(m[field])) {
      out[field] = m[field];
    } else if (m[field] === null || m[field] === undefined) {
      out[field] = null;
    }
  }
  return out;
}

// ── Sanitize payload summary ──────────────────────────────────────────────────

function sanitizeSafePayloadSummary(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  if (typeof m.changeType === 'string') out.changeType = m.changeType;
  if (typeof m.riskLevel === 'string') out.riskLevel = m.riskLevel;
  return Object.keys(out).length > 0 ? out : null;
}

// ── Sanitize a raw audit record from metadata ─────────────────────────────────

export function sanitizeLiveSingleTestAuditHistoryRecord(
  raw: unknown,
  batchJobId: string,
  index: number
): LiveSingleTestAuditHistoryItem | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;

  // Check for any remaining sensitive fields in the raw record
  const warnings: string[] = [];
  for (const key of Object.keys(m)) {
    if (isSensitiveFieldName(key)) {
      warnings.push(`Sensitive field "${key}" detected and excluded from audit history output.`);
    }
    if (isSensitiveValue(m[key])) {
      warnings.push(`Sensitive value in field "${key}" detected and excluded.`);
    }
  }

  const auditCode =
    typeof m.auditCode === 'string'
      ? m.auditCode
      : 'UNKNOWN';

  const status: AuditHistoryItemStatus =
    auditCode === 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE' ||
    auditCode === 'RECORDED_BUT_NOT_EXECUTABLE'
      ? 'RECORDED_BUT_NOT_EXECUTABLE'
      : 'UNKNOWN';

  const acknowledgedItems: string[] = Array.isArray(m.acknowledgedItems)
    ? m.acknowledgedItems.filter((x): x is string => typeof x === 'string')
    : [];

  const missingAcknowledgements: string[] = Array.isArray(m.missingAcknowledgements)
    ? m.missingAcknowledgements.filter((x): x is string => typeof x === 'string')
    : [];

  const item: LiveSingleTestAuditHistoryItem = {
    id: `audit-${batchJobId}-${index}`,
    batchJobId,
    finalApprovalId: typeof m.finalApprovalId === 'string' ? m.finalApprovalId : null,
    auditCode,
    status,
    recordedAt: typeof m.recordedAt === 'string' ? m.recordedAt : null,
    actorId: typeof m.actorId === 'string' ? m.actorId : null,
    acknowledgedItems,
    missingAcknowledgements,
    targetProductSummary: sanitizeTargetProductSummary(m.targetProductSummary),
    safePayloadSummary: sanitizeSafePayloadSummary(m.safePayloadSummary),
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false,
    sanitized: true,
  };

  return item;
}

// ── Extract safe audit history from raw metadata ──────────────────────────────

export function extractSafeLiveSingleTestAuditHistory(
  rawMetadata: unknown,
  batchJobId: string
): LiveSingleTestAuditHistoryItem[] {
  const items: LiveSingleTestAuditHistoryItem[] = [];

  if (!rawMetadata || typeof rawMetadata !== 'object' || Array.isArray(rawMetadata)) {
    return items;
  }

  const m = rawMetadata as Record<string, unknown>;

  // Current audit record (single entry from Task 14)
  if (m.liveSingleTestApprovalAudit) {
    const item = sanitizeLiveSingleTestAuditHistoryRecord(
      m.liveSingleTestApprovalAudit,
      batchJobId,
      0
    );
    if (item) items.push(item);
  }

  return items;
}

// ── Build summary ─────────────────────────────────────────────────────────────

export function summarizeLiveSingleTestAuditHistory(
  items: LiveSingleTestAuditHistoryItem[]
): LiveSingleTestAuditHistorySummary {
  const latest = items.length > 0 ? items[items.length - 1] : null;

  return {
    totalRecords: items.length,
    hasAuditRecord: items.length > 0,
    latestAuditCode: latest?.auditCode ?? null,
    latestRecordedAt: latest?.recordedAt ?? null,
    latestActorId: latest?.actorId ?? null,
    latestStatus: latest?.status ?? null,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
  };
}

// ── Main: build audit history result ─────────────────────────────────────────

export function buildLiveSingleTestAuditHistoryItem(
  input: AuditHistoryInput
): LiveSingleTestAuditHistoryResult {
  const blockingReasons: string[] = [];
  const warnings: string[] = [];

  let items: LiveSingleTestAuditHistoryItem[] = [];

  try {
    // Accept pre-extracted audit or raw metadata
    if (input.liveSingleTestApprovalAudit !== undefined) {
      const item = sanitizeLiveSingleTestAuditHistoryRecord(
        input.liveSingleTestApprovalAudit,
        input.batchJobId,
        0
      );
      if (item) items.push(item);
    } else if (input.metadata !== undefined) {
      items = extractSafeLiveSingleTestAuditHistory(input.metadata, input.batchJobId);
    }
  } catch {
    // Malformed metadata should not throw — treat as empty and warn
    warnings.push('Audit metadata was malformed and could not be parsed. Treating as empty.');
    items = [];
  }

  const summary = summarizeLiveSingleTestAuditHistory(items);
  const latestAudit = items.length > 0 ? items[items.length - 1] : null;

  if (!latestAudit) {
    warnings.push('승인 감사 기록이 없습니다. 기록 저장 단계를 먼저 완료하세요.');
  }

  return {
    exists: items.length > 0,
    latestAudit,
    items,
    summary,
    blockingReasons,
    warnings,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    sanitized: true,
    maxAllowedState: 'LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY',
  };
}
