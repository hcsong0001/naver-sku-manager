import type { FinalApprovalExecutionWorkerJobPayload } from '../types/sku-keyword-final-approval-execution-worker-job-payload-validation.types';
import type {
  FinalApprovalExecutionWorkerJobDbRevalidationRepository,
  FinalApprovalExecutionWorkerJobDbRevalidationResult,
  FinalApprovalExecutionWorkerJobDbRevalidationSnapshot
} from '../types/sku-keyword-final-approval-execution-worker-job-db-revalidation.types';

export async function runFinalApprovalExecutionWorkerJobDbRevalidation(
  payload: FinalApprovalExecutionWorkerJobPayload,
  repository: FinalApprovalExecutionWorkerJobDbRevalidationRepository
): Promise<FinalApprovalExecutionWorkerJobDbRevalidationResult> {
  // 1. Check mode
  if (payload.mode === 'LIVE' as string) {
    return {
      success: false,
      error: {
        code: 'LIVE_MODE_NOT_ALLOWED',
        message: 'LIVE mode is not allowed at this stage.',
        statusCode: 409
      }
    };
  }

  if (payload.mode !== 'MOCK' && payload.mode !== 'DRY_RUN_READY') {
    return {
      success: false,
      error: {
        code: 'MODE_NOT_ALLOWED',
        message: 'Only MOCK or DRY_RUN_READY modes are allowed.',
        statusCode: 409
      }
    };
  }

  // 2. Fetch snapshot
  let snapshot: FinalApprovalExecutionWorkerJobDbRevalidationSnapshot | null = null;
  try {
    snapshot = await repository.findSnapshotForWorkerJobRevalidation(payload.finalApprovalId, payload.idempotencyKey);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown repository error';
    return {
      success: false,
      error: {
        code: 'REPOSITORY_ERROR',
        message: `Failed to fetch snapshot from repository: ${msg}`,
        statusCode: 500
      }
    };
  }

  // 3. Validations
  if (!snapshot) {
    return {
      success: false,
      error: {
        code: 'FINAL_APPROVAL_NOT_FOUND',
        message: 'FinalApproval not found.',
        statusCode: 404
      }
    };
  }

  if (snapshot.finalApprovalStatus !== 'ACTIVE') {
    return {
      success: false,
      error: {
        code: 'FINAL_APPROVAL_NOT_ACTIVE',
        message: 'FinalApproval is not ACTIVE.',
        statusCode: 409
      }
    };
  }

  if (snapshot.finalApprovalExpiresAt) {
    const expiresAt = new Date(snapshot.finalApprovalExpiresAt).getTime();
    if (Date.now() > expiresAt) {
      return {
        success: false,
        error: {
          code: 'FINAL_APPROVAL_EXPIRED',
          message: 'FinalApproval has expired.',
          statusCode: 409
        }
      };
    }
  }

  if (snapshot.jobStatus !== 'APPROVED') {
    return {
      success: false,
      error: {
        code: 'JOB_NOT_APPROVED',
        message: 'Job is not APPROVED.',
        statusCode: 409
      }
    };
  }

  if (snapshot.readyItemCount <= 0) {
    return {
      success: false,
      error: {
        code: 'NO_READY_ITEMS',
        message: 'There are no READY items.',
        statusCode: 409
      }
    };
  }

  if (snapshot.payloadHash !== snapshot.expectedPayloadHash) {
    return {
      success: false,
      error: {
        code: 'PAYLOAD_HASH_MISMATCH',
        message: 'payloadHash does not match expectedPayloadHash.',
        statusCode: 409
      }
    };
  }

  if (snapshot.validationSnapshotHash !== snapshot.expectedValidationSnapshotHash) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_SNAPSHOT_HASH_MISMATCH',
        message: 'validationSnapshotHash does not match expectedValidationSnapshotHash.',
        statusCode: 409
      }
    };
  }

  if (snapshot.idempotencyKeyAlreadyUsed) {
    return {
      success: false,
      error: {
        code: 'IDEMPOTENCY_KEY_ALREADY_USED',
        message: 'idempotencyKey has already been used.',
        statusCode: 409
      }
    };
  }

  // All checks passed
  return {
    success: true,
    summary: {
      finalApprovalId: snapshot.finalApprovalId,
      jobId: snapshot.jobId,
      readyItemCount: snapshot.readyItemCount,
      revalidationPassed: true,
      mode: payload.mode
    }
  };
}
