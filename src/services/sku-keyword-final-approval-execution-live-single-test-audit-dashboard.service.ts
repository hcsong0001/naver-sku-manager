/**
 * Live Single Test Audit Dashboard Service
 *
 * Aggregates and summarizes LiveSingleTestAuditHistoryItem[] for
 * display in the read-only audit dashboard page.
 *
 * Safety invariants (always enforced, never bypassed):
 *   - naverApiCallAllowed is ALWAYS false
 *   - liveExecutionEnabled is ALWAYS false
 *   - operatingDbWriteAllowed is ALWAYS false
 *   - queueAllowed is ALWAYS false
 *   - workerAllowed is ALWAYS false
 *   - sanitized is ALWAYS true
 *   - Maximum state: LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY
 *   - No DB writes, no HTTP calls, no side effects
 */

import type {
  LiveSingleTestAuditHistoryItem,
} from './sku-keyword-final-approval-execution-live-single-test-audit-history.service';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LiveSingleTestAuditDashboardSummary {
  totalCount: number;
  latestRecordedAt: string | null;
  acknowledgedCompleteCount: number;
  missingAcknowledgementCount: number;
  recordedButNotExecutableCount: number;
  unknownStatusCount: number;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
}

export interface LiveSingleTestAuditDashboardInput {
  auditHistoryItems: LiveSingleTestAuditHistoryItem[];
  limit?: number;
  source?: string;
}

export interface LiveSingleTestAuditDashboardResult {
  items: LiveSingleTestAuditHistoryItem[];
  summary: LiveSingleTestAuditDashboardSummary;
  warnings: string[];
  blockingReasons: string[];
  sanitized: true;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  maxAllowedState: 'LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY';
}

// ── Summary builder ───────────────────────────────────────────────────────────

export function buildLiveSingleTestAuditDashboardSummary(
  items: LiveSingleTestAuditHistoryItem[]
): LiveSingleTestAuditDashboardSummary {
  let latestRecordedAt: string | null = null;
  let acknowledgedCompleteCount = 0;
  let missingAcknowledgementCount = 0;
  let recordedButNotExecutableCount = 0;
  let unknownStatusCount = 0;

  for (const item of items) {
    if (item.recordedAt) {
      if (!latestRecordedAt || item.recordedAt > latestRecordedAt) {
        latestRecordedAt = item.recordedAt;
      }
    }

    if ((item.missingAcknowledgements?.length ?? 0) === 0) {
      acknowledgedCompleteCount += 1;
    } else {
      missingAcknowledgementCount += 1;
    }

    if (item.status === 'RECORDED_BUT_NOT_EXECUTABLE') {
      recordedButNotExecutableCount += 1;
    } else {
      unknownStatusCount += 1;
    }
  }

  return {
    totalCount: items.length,
    latestRecordedAt,
    acknowledgedCompleteCount,
    missingAcknowledgementCount,
    recordedButNotExecutableCount,
    unknownStatusCount,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    sanitized: true,
  };
}

// ── Sanitize / limit items ────────────────────────────────────────────────────

export function sanitizeLiveSingleTestAuditDashboardItems(
  items: LiveSingleTestAuditHistoryItem[],
  limit: number
): LiveSingleTestAuditHistoryItem[] {
  const capped = Math.min(Math.max(limit, 1), 100);
  return items.slice(0, capped);
}

// ── Main: evaluate dashboard readiness ───────────────────────────────────────

export function evaluateLiveSingleTestAuditDashboardReadiness(
  input: LiveSingleTestAuditDashboardInput
): LiveSingleTestAuditDashboardResult {
  const warnings: string[] = [];
  const blockingReasons: string[] = [];

  const limit = typeof input.limit === 'number' ? input.limit : 50;
  const rawItems = input.auditHistoryItems ?? [];

  const items = sanitizeLiveSingleTestAuditDashboardItems(rawItems, limit);
  const summary = buildLiveSingleTestAuditDashboardSummary(items);

  if (items.length === 0) {
    warnings.push('표시할 감사 기록이 없습니다. 승인 기록 저장 단계를 먼저 완료하세요.');
  }

  if (summary.missingAcknowledgementCount > 0) {
    warnings.push(
      `${summary.missingAcknowledgementCount}건의 기록에 누락된 acknowledgement가 있습니다.`
    );
  }

  return {
    items,
    summary,
    warnings,
    blockingReasons,
    sanitized: true,
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    operatingDbWriteAllowed: false,
    queueAllowed: false,
    workerAllowed: false,
    maxAllowedState: 'LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY',
  };
}

// ── Build dashboard item (alias for clarity) ──────────────────────────────────

export function buildLiveSingleTestAuditDashboardItem(
  input: LiveSingleTestAuditDashboardInput
): LiveSingleTestAuditDashboardResult {
  return evaluateLiveSingleTestAuditDashboardReadiness(input);
}
