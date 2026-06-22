import { parseFinalApprovalExecutionWorkerJobPayload } from './sku-keyword-final-approval-execution-worker-job-payload-validation.service';
import { runFinalApprovalExecutionWorkerJobDbRevalidation } from './sku-keyword-final-approval-execution-worker-job-db-revalidation.service';
import { evaluateFinalApprovalExecutionTransitionGuard } from './sku-keyword-final-approval-execution-transition-guard.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationRepository, FinalApprovalExecutionWorkerJobDbRevalidationSnapshot } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
import type { FinalApprovalExecutionWorkerJobOrchestrationResult } from '../types/sku-keyword-final-approval-execution-worker-job-orchestration.types';

export async function runFinalApprovalExecutionWorkerJobOrchestration(
  jobInput: unknown,
  repository: FinalApprovalExecutionWorkerJobDbRevalidationRepository
): Promise<FinalApprovalExecutionWorkerJobOrchestrationResult> {
  try {
    // 1. Payload Validation
    const validationResult = parseFinalApprovalExecutionWorkerJobPayload(jobInput);
    if (!validationResult.success) {
      return {
        success: false,
        stage: 'PAYLOAD_VALIDATION',
        errorCode: 'PAYLOAD_VALIDATION_FAILED',
        statusCode: 400,
        message: 'Payload validation failed',
        details: validationResult.errors
      };
    }

    const payload = validationResult.payload;

    // 2. LIVE mode check
    if (payload.mode === 'LIVE' as string) {
      return {
        success: false,
        stage: 'PAYLOAD_VALIDATION',
        errorCode: 'PAYLOAD_VALIDATION_FAILED',
        statusCode: 409,
        message: 'LIVE mode is not allowed at this stage.'
      };
    }

    // 3. snapshot을 Orchestration 레벨에서 직접 보존 (Guard 입력 매핑을 위해)
    let snapshot: FinalApprovalExecutionWorkerJobDbRevalidationSnapshot | null = null;
    try {
      snapshot = await repository.findSnapshotForWorkerJobRevalidation(payload.finalApprovalId, payload.idempotencyKey);
    } catch (err) {
      return {
        success: false,
        stage: 'DB_REVALIDATION',
        errorCode: 'DB_REVALIDATION_FAILED',
        statusCode: 500,
        message: err instanceof Error ? err.message : 'Repository error'
      };
    }

    // 4. DB Revalidation (이미 조회한 snapshot을 캐시 주입)
    const revalidationResult = await runFinalApprovalExecutionWorkerJobDbRevalidation(payload, {
      findSnapshotForWorkerJobRevalidation: async () => snapshot
    });
    if (!revalidationResult.success) {
      return {
        success: false,
        stage: 'DB_REVALIDATION',
        errorCode: 'DB_REVALIDATION_FAILED',
        statusCode: revalidationResult.error.statusCode,
        message: revalidationResult.error.message,
        details: { code: revalidationResult.error.code }
      };
    }

    // 5. Transition Guard - snapshot이 null이 아님이 보장된 시점
    const now = new Date();
    const guardResult = evaluateFinalApprovalExecutionTransitionGuard({
      now,
      mode: (payload.mode === 'MOCK' || payload.mode === 'DRY_RUN_READY') ? 'dry-run' : payload.mode as 'live',
      finalApproval: {
        id: snapshot!.finalApprovalId,
        status: snapshot!.finalApprovalStatus,
        validationExpiresAt: snapshot!.finalApprovalExpiresAt ?? new Date(0).toISOString(),
        payloadHash: snapshot!.payloadHash ?? '',
        validationSnapshotHash: snapshot!.validationSnapshotHash ?? ''
      },
      batchJob: {
        id: snapshot!.jobId,
        status: snapshot!.jobStatus
      },
      batchJobItems: Array.from(
        { length: snapshot!.readyItemCount > 0 ? snapshot!.readyItemCount : 0 },
        () => ({ id: 'item', status: 'READY' })
      ),
      request: {
        finalApprovalId: payload.finalApprovalId,
        idempotencyKey: payload.idempotencyKey,
        actorId: payload.actorId,
        payloadHash: snapshot!.expectedPayloadHash,
        validationSnapshotHash: snapshot!.expectedValidationSnapshotHash
      }
    });

    if (!guardResult.allowed) {
      return {
        success: false,
        stage: 'TRANSITION_GUARD',
        errorCode: 'TRANSITION_GUARD_BLOCKED',
        statusCode: 409,
        message: guardResult.summary,
        details: { reasonCodes: guardResult.reasonCodes }
      };
    }

    // 6. Guard passed - No-Op (EXECUTING 전환/DB write/Naver API 호출 없음)
    return {
      success: true,
      finalApprovalId: payload.finalApprovalId,
      actorId: payload.actorId,
      idempotencyKey: payload.idempotencyKey,
      source: payload.source,
      mode: payload.mode,
      requestedAt: payload.requestedAt,
      revalidatedAt: now.toISOString(),
      readyForExecution: true,
      executionPerformed: false
    };
  } catch (error) {
    return {
      success: false,
      stage: 'ORCHESTRATION',
      errorCode: 'UNEXPECTED_ORCHESTRATION_ERROR',
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Unknown orchestration error'
    };
  }
}
