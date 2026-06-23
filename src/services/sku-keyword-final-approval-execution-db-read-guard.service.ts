import type {
  FinalApprovalExecutionDbReadGuardInput,
  FinalApprovalExecutionDbReadGuardRepository,
  FinalApprovalExecutionDbReadGuardResult
} from '../types/sku-keyword-final-approval-execution-db-read-guard.types';

const TERMINAL_BATCH_JOB_STATUSES = new Set([
  'EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED',
]);

export async function runFinalApprovalExecutionDbReadGuard(
  input: FinalApprovalExecutionDbReadGuardInput,
  repository: FinalApprovalExecutionDbReadGuardRepository
): Promise<FinalApprovalExecutionDbReadGuardResult> {
  try {
    const snapshot = await repository.findSnapshotForExecutionGuard(input.finalApprovalId);

    if (!snapshot.finalApproval) {
      return {
        success: false,
        statusCode: 404,
        guardCode: 'FINAL_APPROVAL_NOT_FOUND',
        message: `FinalApproval record not found for id: ${input.finalApprovalId}`
      };
    }

    if (snapshot.finalApproval.status !== 'ACTIVE') {
      return {
        success: false,
        statusCode: 409,
        guardCode: 'FINAL_APPROVAL_NOT_ACTIVE',
        message: `FinalApproval is not ACTIVE. Current status: ${snapshot.finalApproval.status}`
      };
    }

    if (snapshot.finalApproval.validationExpiresAt) {
      const expiresAt = new Date(snapshot.finalApproval.validationExpiresAt).getTime();
      if (Date.now() > expiresAt) {
        return {
          success: false,
          statusCode: 409,
          guardCode: 'VALIDATION_EXPIRED',
          message: 'The validation snapshot for this FinalApproval has expired.'
        };
      }
    }

    if (snapshot.job && TERMINAL_BATCH_JOB_STATUSES.has(snapshot.job.status)) {
      return {
        success: false,
        statusCode: 409,
        guardCode: 'BATCH_JOB_ALREADY_EXECUTED',
        message: `BatchJob has already been executed and cannot be re-executed. Current status: ${snapshot.job.status}`,
      };
    }

    if (snapshot.job && snapshot.job.status === 'EXECUTING') {
      return {
        success: false,
        statusCode: 409,
        guardCode: 'BATCH_JOB_ALREADY_EXECUTING',
        message: 'BatchJob is currently executing. Concurrent execution is not allowed.',
      };
    }

    if (!snapshot.job || snapshot.job.status !== 'APPROVED') {
      return {
        success: false,
        statusCode: 409,
        guardCode: 'JOB_NOT_APPROVED',
        message: `The connected Job is not APPROVED. Current status: ${snapshot.job?.status}`
      };
    }

    const readyItems = snapshot.items.filter(item => item.status === 'READY');
    if (readyItems.length === 0) {
      return {
        success: false,
        statusCode: 409,
        guardCode: 'NO_READY_ITEMS',
        message: 'There are no READY items available for execution.'
      };
    }

    return {
      success: true,
      snapshot
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      guardCode: 'INTERNAL_ERROR',
      message: error instanceof Error ? error.message : 'Unknown repository error'
    };
  }
}
