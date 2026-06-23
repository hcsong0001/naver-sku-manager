import { validateRestrictedDbDryRunSafety } from './sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import { createFinalApprovalExecutionTransitionApplyPrismaAdapterPort } from './sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.service';
import type { TransitionApplyPrismaAdapterPort } from '../types/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types';
import type { PrismaLikeClient } from '../types/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.types';

export interface WorkerTransitionApplyAdapterFactoryOptions {
  adapterModeEnvValue: string | undefined;
  nodeEnv?: string | undefined;
  databaseUrl?: string | undefined;
  // Caller provides the Prisma client when restricted-db mode is requested.
  // Required when adapterModeEnvValue === 'restricted-db'.
  prismaClient?: PrismaLikeClient | undefined;
}

// Adapter modes that are explicitly blocked (would hit live/production data).
const BLOCKED_MODES = new Set(['live', 'production', 'prod', 'operating']);

// Safe mock adapter — never touches the DB.
const MOCK_ADAPTER: TransitionApplyPrismaAdapterPort = {
  transaction: async (fn) =>
    fn({
      updateBatchJobStatus: async () => ({ updated: true }),
      updateBatchJobItemStatus: async () => ({ updated: true }),
    }),
};

/**
 * Returns a TransitionApplyPrismaAdapterPort based on the requested adapter mode.
 *
 * - default / 'mock': safe no-op — updateBatchJobStatus/Item always return { updated: true }
 *                     without any DB access.
 * - 'restricted-db':  Prisma adapter backed by the restricted test DB.
 *                     Requires NODE_ENV=test, localhost:55432 DATABASE_URL,
 *                     and a caller-supplied prismaClient.
 * - 'live'/'prod'/*:  throws immediately — never allowed.
 */
export function createWorkerTransitionApplyAdapter(
  options: WorkerTransitionApplyAdapterFactoryOptions
): TransitionApplyPrismaAdapterPort {
  const rawMode = options.adapterModeEnvValue?.trim() ?? '';

  // Block dangerous adapter modes before any env inspection.
  if (BLOCKED_MODES.has(rawMode.toLowerCase())) {
    throw new Error(
      `Worker transition apply adapter mode "${rawMode}" is not allowed — ` +
        'live/production adapters are blocked'
    );
  }

  if (rawMode === 'restricted-db') {
    const safety = validateRestrictedDbDryRunSafety({
      nodeEnv: options.nodeEnv,
      databaseUrl: options.databaseUrl,
    });

    if (!safety.ok) {
      throw new Error(
        `Worker transition apply factory: restricted-db safety guard failed ` +
          `[${safety.errors.join('; ')}]`
      );
    }

    if (!options.prismaClient) {
      throw new Error(
        'Worker transition apply factory: restricted-db mode requires a prismaClient ' +
          'to be provided by the caller'
      );
    }

    return createFinalApprovalExecutionTransitionApplyPrismaAdapterPort(options.prismaClient);
  }

  // Default: safe mock.
  return MOCK_ADAPTER;
}
