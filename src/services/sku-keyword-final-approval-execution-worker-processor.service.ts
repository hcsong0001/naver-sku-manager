import type { FinalApprovalExecutionQueueProcessorInputJob } from '../types/sku-keyword-final-approval-execution-queue-processor.types';
import { runFinalApprovalExecutionQueueProcessor } from './sku-keyword-final-approval-execution-queue-processor.service';
import { evaluateFinalApprovalExecutionTransitionGuard } from './sku-keyword-final-approval-execution-transition-guard.service';
import { buildFinalApprovalExecutionTransitionApplyPlan } from './sku-keyword-final-approval-execution-transition-apply.service';
import { applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter } from './sku-keyword-final-approval-execution-transition-apply-prisma-adapter.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationRepository } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
import type { TransitionApplyPrismaAdapterPort } from '../types/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types';
import type { ResultRecordingAdapterPort, ItemExecutionResult } from '../types/sku-keyword-final-approval-execution-result-recording.types';
import type { NaverApiAdapterPort } from '../types/sku-keyword-final-approval-execution-naver-api.types';
import { buildExecutionResultPlan } from './sku-keyword-final-approval-execution-result-recording.service';
import { createNoOpResultRecordingAdapter } from './sku-keyword-final-approval-execution-result-recording-adapter-factory.service';

export interface FinalApprovalExecutionWorkerProcessorDependencies {
  revalidationRepository: FinalApprovalExecutionWorkerJobDbRevalidationRepository;
  transitionApplyAdapter: TransitionApplyPrismaAdapterPort;
  /**
   * Result recording adapter.
   * Defaults to no-op when omitted — plan is built and passed to the adapter
   * but no DB write occurs until the Naver API execution phase provides itemResults.
   */
  resultRecordingAdapter?: ResultRecordingAdapterPort;
  /**
   * Naver API adapter.
   * When provided, each READY item is executed through this adapter after
   * the transition apply step. Results feed into the execution result plan.
   * When omitted, no API execution occurs and the plan stays TRANSITION_ONLY.
   */
  naverApiAdapter?: NaverApiAdapterPort;
}

export interface FinalApprovalExecutionWorkerProcessorResult {
  success: boolean;
  message?: string;
  code?: string;
  finalApprovalId?: string;
  executionPerformed?: boolean;
}

export async function processFinalApprovalExecutionWorkerJob(
  job: FinalApprovalExecutionQueueProcessorInputJob,
  deps: FinalApprovalExecutionWorkerProcessorDependencies
): Promise<FinalApprovalExecutionWorkerProcessorResult> {
  // 1. Queue Processor (Orchestration - Payload validation & DB Revalidation & Guard check)
  const queueResult = await runFinalApprovalExecutionQueueProcessor(job, {
    revalidationRepository: deps.revalidationRepository
  });

  if (!queueResult.ok || !queueResult.readyForExecution) {
    return {
      success: false,
      message: queueResult.reason,
      code: queueResult.code,
      executionPerformed: false
    };
  }

  // 2. Fetch snapshot to rebuild Guard Result for Transition Apply
  const finalApprovalId = queueResult.finalApprovalId!;
  const idempotencyKey = queueResult.idempotencyKey!;
  const mode = queueResult.mode!;
  
  const snapshot = await deps.revalidationRepository.findSnapshotForWorkerJobRevalidation(
    finalApprovalId,
    idempotencyKey
  );

  if (!snapshot) {
    return {
      success: false,
      message: 'Snapshot not found after successful orchestration',
      code: 'SNAPSHOT_NOT_FOUND',
      executionPerformed: false
    };
  }

  const now = new Date();
  const actorId = (job.data as any)?.actorId || 'worker-processor';
  const dryRun = mode === 'MOCK' || mode === 'DRY_RUN_READY';

  // Use actual item IDs from snapshot when available (populated by DB-backed adapters).
  // Fall back to stable mock IDs only when the snapshot has no real IDs (mock mode).
  const batchJobItems =
    snapshot.readyItemIds && snapshot.readyItemIds.length > 0
      ? snapshot.readyItemIds.map(id => ({ id, status: 'READY' as const }))
      : Array.from({ length: snapshot.readyItemCount }, (_, i) => ({
          id: `mock-item-${i}`,
          status: 'READY' as const,
        }));

  // 3. Re-evaluate Transition Guard
  const guardResult = evaluateFinalApprovalExecutionTransitionGuard({
    now,
    mode: dryRun ? 'dry-run' : 'live',
    finalApproval: {
      id: snapshot.finalApprovalId,
      status: snapshot.finalApprovalStatus,
      validationExpiresAt: snapshot.finalApprovalExpiresAt ?? new Date(0).toISOString(),
      payloadHash: snapshot.payloadHash ?? '',
      validationSnapshotHash: snapshot.validationSnapshotHash ?? ''
    },
    batchJob: {
      id: snapshot.jobId,
      status: snapshot.jobStatus
    },
    batchJobItems,
    request: {
      finalApprovalId,
      idempotencyKey,
      actorId,
      payloadHash: snapshot.expectedPayloadHash,
      validationSnapshotHash: snapshot.expectedValidationSnapshotHash
    }
  });

  if (!guardResult.allowed) {
    return {
      success: false,
      message: guardResult.summary,
      code: 'TRANSITION_GUARD_BLOCKED',
      executionPerformed: false
    };
  }

  // 4. Build Transition Apply Plan
  const plan = buildFinalApprovalExecutionTransitionApplyPlan({
    now: now.toISOString(),
    mode: dryRun ? 'dry-run' : 'live',
    request: {
      finalApprovalId,
      idempotencyKey,
      actorId
    },
    finalApproval: { id: snapshot.finalApprovalId, status: snapshot.finalApprovalStatus },
    batchJob: { id: snapshot.jobId, status: snapshot.jobStatus },
    batchJobItems,
    guardResult
  });

  // 5. Apply Transition Plan
  const applyResult = await applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter({
    plan,
    adapter: deps.transitionApplyAdapter,
    options: {
      now,
      mode: dryRun ? 'dry-run' : 'live',
      idempotencyKey,
      actorId
    }
  });

  if (!applyResult.applied) {
    return {
      success: false,
      message: 'Failed to apply transition plan',
      code: 'TRANSITION_APPLY_FAILED',
      executionPerformed: false
    };
  }

  // 5.5. Execute Naver API items (if adapter is provided)
  //   - SKIPPED results (disabled adapter) are treated as "no execution" → mode stays dry-run
  //   - SUCCESS / FAILED results (mock or future live adapter) → mode = 'restricted-db'
  let naverItemResults: ItemExecutionResult[] = [];
  if (deps.naverApiAdapter) {
    naverItemResults = await executeNaverApiItems(
      batchJobItems,
      deps.naverApiAdapter,
      finalApprovalId
    );
  }

  // 6. Build execution result plan
  //    mode is 'restricted-db' when non-skipped item results exist (applicable=true),
  //    or 'dry-run' when all items were skipped or no adapter was provided (applicable=false).
  const executionEndedAt = new Date().toISOString();
  const hasNonSkippedResults = naverItemResults.some((r) => r.status !== 'SKIPPED');
  const recordingPlan = buildExecutionResultPlan({
    jobId: snapshot.jobId,
    finalApprovalId,
    idempotencyKey,
    actorId,
    mode: hasNonSkippedResults ? 'restricted-db' : 'dry-run',
    itemResults: naverItemResults,
    startedAt: now.toISOString(),
    endedAt: executionEndedAt,
  });

  // 7. Apply result recording
  //    Default adapter is no-op; explicit adapter wired via deps.resultRecordingAdapter.
  //    Execution order:
  //      1→2→3→4→5  (payload → revalidation → guard → transition apply → recording)
  const recordingAdapter = deps.resultRecordingAdapter ?? createNoOpResultRecordingAdapter();
  try {
    await recordingAdapter.applyExecutionResultPlan(recordingPlan);
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Result recording failed',
      code: 'RESULT_RECORDING_FAILED',
      finalApprovalId,
      executionPerformed: true,
    };
  }

  // 8. Success
  return {
    success: true,
    message: 'Job processed successfully',
    finalApprovalId,
    executionPerformed: true
  };
}

export function createFinalApprovalExecutionWorkerProcessor(
  deps: FinalApprovalExecutionWorkerProcessorDependencies
) {
  return async (job: FinalApprovalExecutionQueueProcessorInputJob) => {
    return processFinalApprovalExecutionWorkerJob(job, deps);
  };
}

// ── Internal helpers ──────────────────────────────────────────────────────────

async function executeNaverApiItems(
  items: Array<{ id: string; status: string }>,
  adapter: NaverApiAdapterPort,
  finalApprovalId: string
): Promise<ItemExecutionResult[]> {
  return Promise.all(
    items.map(async (item) => {
      const result = await adapter.executeItem({ itemId: item.id, finalApprovalId });
      return {
        itemId: result.itemId,
        status: result.status,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
        apiCallAttempted: result.naverApiCalled,
      };
    })
  );
}
