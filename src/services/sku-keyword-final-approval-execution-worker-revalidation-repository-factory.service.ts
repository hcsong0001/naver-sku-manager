import { validateRestrictedDbDryRunSafety } from './sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import {
  createRestrictedDbRevalidationPrismaAdapter,
  type RevalidationPrismaClientPort,
} from './sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationRepository } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';

// ── Public API ────────────────────────────────────────────────────────────────

export interface WorkerRevalidationRepositoryFactoryOptions {
  adapterModeEnvValue: string | undefined;
  nodeEnv?: string | undefined;
  databaseUrl?: string | undefined;
  // Caller provides the Prisma client when restricted-db mode is requested.
  // Required when adapterModeEnvValue === 'restricted-db'.
  prismaClient?: RevalidationPrismaClientPort | undefined;
}

// Adapter modes that are explicitly blocked (would hit live/production data).
const BLOCKED_MODES = new Set(['live', 'production', 'prod', 'operating']);

/**
 * Returns a FinalApprovalExecutionWorkerJobDbRevalidationRepository based on
 * the requested adapter mode.
 *
 * - default / 'mock': safe no-op — findSnapshot always returns null.
 * - 'restricted-db':  Prisma adapter backed by the restricted test DB.
 *                     Requires NODE_ENV=test, localhost:55432 DATABASE_URL,
 *                     and a caller-supplied prismaClient.
 * - 'live'/'prod'/*:  throws immediately — never allowed.
 */
export function createWorkerRevalidationRepository(
  options: WorkerRevalidationRepositoryFactoryOptions
): FinalApprovalExecutionWorkerJobDbRevalidationRepository {
  const rawMode = options.adapterModeEnvValue?.trim() ?? '';

  // Block dangerous adapter modes before any env inspection
  if (BLOCKED_MODES.has(rawMode.toLowerCase())) {
    throw new Error(
      `Worker revalidation adapter mode "${rawMode}" is not allowed — ` +
        'live/production adapters are blocked'
    );
  }

  if (rawMode === 'restricted-db') {
    // Safety guard must pass before the adapter is created
    const safety = validateRestrictedDbDryRunSafety({
      nodeEnv: options.nodeEnv,
      databaseUrl: options.databaseUrl,
    });

    if (!safety.ok) {
      throw new Error(
        `Worker revalidation factory: restricted-db safety guard failed ` +
          `[${safety.errors.join('; ')}]`
      );
    }

    if (!options.prismaClient) {
      throw new Error(
        'Worker revalidation factory: restricted-db mode requires a prismaClient ' +
          'to be provided by the caller'
      );
    }

    return createRestrictedDbRevalidationPrismaAdapter(options.prismaClient);
  }

  // Default: safe mock — always returns null, triggers DB_REVALIDATION_FAILED
  // in the processor (same behavior as the Worker entrypoint default).
  return {
    findSnapshotForWorkerJobRevalidation: async () => null,
  };
}
