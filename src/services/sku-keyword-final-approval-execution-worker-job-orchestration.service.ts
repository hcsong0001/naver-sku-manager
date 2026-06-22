import { parseFinalApprovalExecutionWorkerJobPayload } from './sku-keyword-final-approval-execution-worker-job-payload-validation.service';
import { runFinalApprovalExecutionWorkerJobDbRevalidation } from './sku-keyword-final-approval-execution-worker-job-db-revalidation.service';
import type { FinalApprovalExecutionWorkerJobDbRevalidationRepository } from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';
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

    // 2. LIVE mode check (should already fail in validation if set up, but double checking based on requirements)
    if (payload.mode === 'LIVE' as string) {
      return {
        success: false,
        stage: 'PAYLOAD_VALIDATION',
        errorCode: 'PAYLOAD_VALIDATION_FAILED',
        statusCode: 409,
        message: 'LIVE mode is not allowed at this stage.'
      };
    }

    // 3. DB Revalidation
    const revalidationResult = await runFinalApprovalExecutionWorkerJobDbRevalidation(payload, repository);
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

    // 4. Success
    return {
      success: true,
      finalApprovalId: payload.finalApprovalId,
      actorId: payload.actorId,
      idempotencyKey: payload.idempotencyKey,
      source: payload.source,
      mode: payload.mode,
      requestedAt: payload.requestedAt,
      revalidatedAt: new Date().toISOString(),
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
