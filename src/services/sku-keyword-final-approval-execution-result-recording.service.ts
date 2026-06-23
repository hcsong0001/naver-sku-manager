/**
 * FinalApproval Execution Result Recording Service (Pure Function)
 *
 * Computes the DB write plan after a Worker execution attempt completes.
 * This is a pure function — no DB access, no side effects.
 *
 * Safety invariants:
 * - 'live' mode is blocked (throws): no production execution result writes
 *   until the live-execution path is fully audited and authorized.
 * - 'dry-run' mode always returns applicable=false (plan is computed but
 *   flagged as non-applicable so callers do not persist it).
 * - 'restricted-db' mode is allowed for test fixture validation.
 */

import type {
  ExecutionMode,
  ExecutionResultPlan,
  ExecutionResultSummary,
  ItemExecutionResult,
  ItemResultUpdate,
  JobExecutionInput,
  JobExecutionOutcome,
  JobResultUpdate,
} from '../types/sku-keyword-final-approval-execution-result-recording.types';

const BLOCKED_MODES: ExecutionMode[] = ['live'];

export function buildExecutionResultPlan(
  input: JobExecutionInput
): ExecutionResultPlan {
  // ── 1. Hard block on live mode ─────────────────────────────────────────────
  if ((BLOCKED_MODES as string[]).includes(input.mode)) {
    throw new Error(
      `buildExecutionResultPlan: execution mode "${input.mode}" is not allowed — ` +
        'live mode is blocked until the live-execution path is fully authorized'
    );
  }

  const startMs = new Date(input.startedAt).getTime();
  const endMs = new Date(input.endedAt).getTime();
  const durationMs = Number.isFinite(endMs - startMs) ? endMs - startMs : 0;

  // ── 2. Compute per-item update plans ───────────────────────────────────────
  const itemUpdates: ItemResultUpdate[] = input.itemResults.map(
    (r): ItemResultUpdate => ({
      itemId: r.itemId,
      newStatus: r.status,
      errorCode: r.errorCode,
      errorMessage: r.errorMessage,
    })
  );

  // ── 3. Aggregate counts ────────────────────────────────────────────────────
  const successCount = input.itemResults.filter((r) => r.status === 'SUCCESS').length;
  const failedCount = input.itemResults.filter((r) => r.status === 'FAILED').length;
  const skippedCount = input.itemResults.filter((r) => r.status === 'SKIPPED').length;
  const retryPendingCount = input.itemResults.filter((r) => r.status === 'RETRY_PENDING').length;
  const apiCallsAttempted = input.itemResults.filter((r) => r.apiCallAttempted).length;

  // ── 4. Determine job outcome ───────────────────────────────────────────────
  const outcome = computeJobOutcome(input.itemResults);

  // ── 5. Build summary (always computed, regardless of mode) ─────────────────
  const summary: ExecutionResultSummary = {
    totalItems: input.itemResults.length,
    successCount,
    failedCount,
    skippedCount,
    retryPendingCount,
    apiCallsAttempted,
    durationMs,
    outcome,
    mode: input.mode,
  };

  // ── 6. dry-run: compute plan but mark as non-applicable ───────────────────
  if (input.mode === 'dry-run') {
    return {
      applicable: false,
      blockedReason: 'dry-run mode: plan computed but not applied to DB',
      outcome,
      itemUpdates,
      summary,
    };
  }

  // ── 7. TRANSITION_ONLY: no API calls were made yet ────────────────────────
  //    (This is the current state after restricted-db E2E: Job is EXECUTING
  //     but no Naver API calls have been dispatched.)
  if (outcome === 'TRANSITION_ONLY') {
    return {
      applicable: false,
      blockedReason:
        'TRANSITION_ONLY: no item results to record — Naver API execution has not started',
      outcome,
      itemUpdates: [],
      summary,
    };
  }

  // ── 8. restricted-db: plan is applicable for test fixture writes ───────────
  const newJobStatus =
    outcome === 'EXECUTED'
      ? 'EXECUTED'
      : outcome === 'PARTIAL_SUCCESS'
        ? 'PARTIAL_SUCCESS'
        : 'FAILED';

  const jobUpdate: JobResultUpdate = {
    jobId: input.jobId,
    newStatus: newJobStatus,
    successCount,
    failedCount,
    skippedCount,
    executedAt: input.endedAt,
    metadataUpdate: {
      executionMode: input.mode,
      actorId: input.actorId,
      idempotencyKey: input.idempotencyKey,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
      durationMs,
      finalApprovalId: input.finalApprovalId,
    },
  };

  return {
    applicable: true,
    outcome,
    jobUpdate,
    itemUpdates,
    summary,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function computeJobOutcome(items: ItemExecutionResult[]): JobExecutionOutcome {
  if (items.length === 0) {
    return 'TRANSITION_ONLY';
  }

  const hasSuccess = items.some((r) => r.status === 'SUCCESS');
  const hasFailed = items.some(
    (r) => r.status === 'FAILED' || r.status === 'RETRY_PENDING'
  );

  if (hasSuccess && !hasFailed) return 'EXECUTED';
  if (hasSuccess && hasFailed) return 'PARTIAL_SUCCESS';
  return 'FAILED';
}
