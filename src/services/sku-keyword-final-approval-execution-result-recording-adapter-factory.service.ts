/**
 * Result Recording Adapter Factory
 *
 * Provides adapter instances for the Worker Processor's result recording step.
 *
 * Default: no-op adapter — plan is received and inspected but no DB write occurs.
 * This is the safe default until the Naver API execution phase populates itemResults
 * and the restricted-db Prisma adapter is explicitly configured.
 *
 * Future: createWorkerResultRecordingAdapter(options) will return either the no-op
 * adapter or the Prisma adapter based on FINAL_APPROVAL_EXECUTION_RESULT_RECORDING_ADAPTER.
 * That wiring is deferred to the restricted-db execution phase.
 *
 * NOTE: this file does NOT import Prisma, BullMQ, Redis, or any DB client.
 * Importing this module has zero side effects.
 */

import type { ResultRecordingAdapterPort } from '../types/sku-keyword-final-approval-execution-result-recording.types';

// ── No-op adapter ─────────────────────────────────────────────────────────────

/**
 * Returns an adapter that always reports the plan as received but never writes to DB.
 * Used as the default when no recording adapter is explicitly configured.
 */
export function createNoOpResultRecordingAdapter(): ResultRecordingAdapterPort {
  return {
    applyExecutionResultPlan: async (plan) => ({
      applied: false,
      skippedReason: plan.applicable
        ? 'no-op: mock recording adapter — DB write skipped'
        : `no-op: plan not applicable (${plan.blockedReason ?? 'unknown reason'})`,
    }),
  };
}
