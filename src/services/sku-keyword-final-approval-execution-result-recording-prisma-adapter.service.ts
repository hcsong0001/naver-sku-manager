/**
 * FinalApproval Execution Result Recording Prisma Adapter
 *
 * Applies an ExecutionResultPlan (from buildExecutionResultPlan) to the test DB.
 * Only operates under restricted-db mode and test-safe conditions.
 *
 * Write targets:
 *   - NaverApiBatchJob:     status, successItems, failedItems, skippedItems, executedAt, metadata
 *   - NaverApiBatchJobItem: status, errorCode, errorMessage
 *
 * NOT written:
 *   - NaverApiBatchFinalApproval: no change (FinalApproval artifact remains untouched)
 *   - NaverApiCallLog:            deferred to the Naver API execution phase
 *
 * Status transitions recorded:
 *   Job:  EXECUTING → EXECUTED | PARTIAL_SUCCESS | FAILED
 *   Item: EXECUTING → SUCCESS  | FAILED | RETRY_PENDING | SKIPPED
 */

import { validateRestrictedDbDryRunSafety } from './sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';
import type { ExecutionResultPlan } from '../types/sku-keyword-final-approval-execution-result-recording.types';

// ── Safety ────────────────────────────────────────────────────────────────────

const BLOCKED_ADAPTER_MODES = new Set(['live', 'production', 'prod', 'operating']);

// ── Structural interfaces ─────────────────────────────────────────────────────

/** Minimal tx client required inside $transaction callback */
export interface ResultRecordingTxClient {
  naverApiBatchJob: {
    updateMany(args: unknown): Promise<{ count: number }>;
  };
  naverApiBatchJobItem: {
    updateMany(args: unknown): Promise<{ count: number }>;
  };
}

/** Minimal Prisma client interface for result recording (structural, no import side-effects) */
export interface ResultRecordingPrismaClientPort {
  naverApiBatchJob: {
    findUnique(args: unknown): Promise<{ status: string } | null>;
  };
  $transaction<T>(fn: (tx: ResultRecordingTxClient) => Promise<T>): Promise<T>;
}

// ── Options / Results ─────────────────────────────────────────────────────────

export interface ResultRecordingAdapterOptions {
  nodeEnv: string | undefined;
  databaseUrl: string | undefined;
  adapterMode: string | undefined;
}

export interface ResultRecordingResult {
  applied: boolean;
  skippedReason?: string;
  jobUpdated?: boolean;
  itemsUpdated?: number;
}

export interface ResultRecordingPrismaAdapterPort {
  applyExecutionResultPlan(plan: ExecutionResultPlan): Promise<ResultRecordingResult>;
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createResultRecordingPrismaAdapter(
  prisma: ResultRecordingPrismaClientPort,
  options: ResultRecordingAdapterOptions
): ResultRecordingPrismaAdapterPort {
  const rawMode = options.adapterMode?.trim() ?? '';

  // Block live / production / operating adapter modes
  if (BLOCKED_ADAPTER_MODES.has(rawMode.toLowerCase())) {
    throw new Error(
      `Result recording adapter mode "${rawMode}" is not allowed — ` +
        'live and production modes are blocked for result recording'
    );
  }

  // Run safety guard for restricted-db mode
  if (rawMode === 'restricted-db') {
    const safety = validateRestrictedDbDryRunSafety({
      nodeEnv: options.nodeEnv,
      databaseUrl: options.databaseUrl,
    });
    if (!safety.ok) {
      throw new Error(
        `Result recording adapter safety guard failed [${safety.errors.join('; ')}]`
      );
    }
  }

  return {
    async applyExecutionResultPlan(plan: ExecutionResultPlan): Promise<ResultRecordingResult> {
      // 1. Plan applicability check
      if (!plan.applicable) {
        return {
          applied: false,
          skippedReason: plan.blockedReason ?? 'plan marked as not applicable',
        };
      }

      const { jobUpdate, itemUpdates } = plan;
      if (!jobUpdate) {
        return {
          applied: false,
          skippedReason: 'plan has no jobUpdate — cannot record result',
        };
      }

      // 2. Idempotency guard — verify job is still EXECUTING before writing
      const existing = await prisma.naverApiBatchJob.findUnique({
        where: { id: jobUpdate.jobId },
        select: { status: true },
      });

      if (!existing) {
        return {
          applied: false,
          skippedReason: `BatchJob not found: id=${jobUpdate.jobId}`,
        };
      }

      if (existing.status !== 'EXECUTING') {
        return {
          applied: false,
          skippedReason:
            `BatchJob "${jobUpdate.jobId}" is in status "${existing.status}" — ` +
            'result recording skipped (already recorded or not yet executing)',
        };
      }

      // 3. Atomic write — all-or-nothing transaction
      const recordedAt = new Date().toISOString();

      await prisma.$transaction(async (tx) => {
        // 3a. Update each BatchJobItem (EXECUTING → final status)
        for (const itemUpdate of itemUpdates) {
          const result = await tx.naverApiBatchJobItem.updateMany({
            where: { id: itemUpdate.itemId, status: 'EXECUTING' },
            data: {
              status: itemUpdate.newStatus,
              errorCode: itemUpdate.errorCode ?? null,
              errorMessage: itemUpdate.errorMessage ?? null,
            },
          });
          if (result.count === 0) {
            throw new Error(
              `BatchJobItem result recording failed: id=${itemUpdate.itemId} — ` +
                '0 rows affected (item not in EXECUTING status or not found)'
            );
          }
        }

        // 3b. Update BatchJob (EXECUTING → EXECUTED | PARTIAL_SUCCESS | FAILED)
        //     NaverApiBatchFinalApproval is intentionally NOT updated here.
        //     NaverApiCallLog is intentionally NOT created here (deferred to API phase).
        const jobResult = await tx.naverApiBatchJob.updateMany({
          where: { id: jobUpdate.jobId, status: 'EXECUTING' },
          data: {
            status: jobUpdate.newStatus,
            successItems: jobUpdate.successCount,
            failedItems: jobUpdate.failedCount,
            skippedItems: jobUpdate.skippedCount,
            executedAt: new Date(jobUpdate.executedAt),
            metadata: {
              ...jobUpdate.metadataUpdate,
              recordedAt,
              resultSummary: {
                successCount: jobUpdate.successCount,
                failedCount: jobUpdate.failedCount,
                skippedCount: jobUpdate.skippedCount,
              },
            },
          },
        });

        if (jobResult.count === 0) {
          throw new Error(
            `BatchJob result recording failed: id=${jobUpdate.jobId} — ` +
              '0 rows affected (job not in EXECUTING status or not found)'
          );
        }
      });

      return {
        applied: true,
        jobUpdated: true,
        itemsUpdated: itemUpdates.length,
      };
    },
  };
}
