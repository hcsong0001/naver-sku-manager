/**
 * Result Recording Adapter Factory
 *
 * Provides adapter instances for the Worker Processor's result recording step.
 *
 * - createNoOpResultRecordingAdapter(): safe default — plan inspected, no DB write.
 * - createWorkerResultRecordingAdapter(options): env-driven selection.
 *     undefined / 'mock'   → no-op adapter (safe default)
 *     'restricted-db'      → Prisma adapter backed by the test DB
 *     'live' / 'prod' / …  → throws immediately (blocked)
 *
 * NOTE: this file does NOT import Prisma, BullMQ, Redis, or any DB client at module
 * load time. The Prisma adapter import is deferred inside createWorkerResultRecordingAdapter
 * and only instantiated when 'restricted-db' is explicitly requested.
 */

import type { ResultRecordingAdapterPort } from '../types/sku-keyword-final-approval-execution-result-recording.types';
import type { ResultRecordingPrismaClientPort } from './sku-keyword-final-approval-execution-result-recording-prisma-adapter.service';
import { createResultRecordingPrismaAdapter } from './sku-keyword-final-approval-execution-result-recording-prisma-adapter.service';

// Adapter modes that would hit live / production data
const BLOCKED_MODES = new Set(['live', 'production', 'prod', 'operating']);

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

// ── Worker-level factory ───────────────────────────────────────────────────────

export interface WorkerResultRecordingAdapterFactoryOptions {
  /** Value of FINAL_APPROVAL_EXECUTION_RESULT_RECORDING_ADAPTER env var */
  adapterModeEnvValue: string | undefined;
  nodeEnv?: string | undefined;
  databaseUrl?: string | undefined;
  /**
   * Prisma client required when adapterModeEnvValue === 'restricted-db'.
   * Caller creates ONE shared client and passes it here.
   */
  prismaClient?: ResultRecordingPrismaClientPort | undefined;
}

/**
 * Returns a ResultRecordingAdapterPort based on the requested adapter mode.
 *
 * - default / 'mock': no-op — plan computed, no DB write.
 * - 'restricted-db':  Prisma adapter — writes Job/Item results to the test DB.
 *                     Safety guard (NODE_ENV=test, localhost:55432) is enforced
 *                     inside createResultRecordingPrismaAdapter.
 * - 'live'/'prod'/*:  throws at construction — never allowed.
 */
export function createWorkerResultRecordingAdapter(
  options: WorkerResultRecordingAdapterFactoryOptions
): ResultRecordingAdapterPort {
  const rawMode = options.adapterModeEnvValue?.trim() ?? '';

  // Block dangerous modes before any further processing
  if (BLOCKED_MODES.has(rawMode.toLowerCase())) {
    throw new Error(
      `Worker result recording adapter mode "${rawMode}" is not allowed — ` +
        'live/production adapters are blocked for result recording'
    );
  }

  if (rawMode === 'restricted-db') {
    if (!options.prismaClient) {
      throw new Error(
        'Worker result recording factory: restricted-db mode requires a prismaClient ' +
          'to be provided by the caller'
      );
    }

    return createResultRecordingPrismaAdapter(options.prismaClient, {
      nodeEnv: options.nodeEnv,
      databaseUrl: options.databaseUrl,
      adapterMode: 'restricted-db',
    });
  }

  // Default: safe no-op
  return createNoOpResultRecordingAdapter();
}
