import type { 
  FinalApprovalExecutionApiAcceptedResponse,
  FinalApprovalExecutionApiValidationErrorResponse,
  FinalApprovalExecutionApiGuardFailureResponse,
  FinalApprovalExecutionGuardCode
} from '../types/sku-keyword-final-approval-execution-api-response.types';
import type { FinalApprovalExecutionEnqueueCommand } from '../types/sku-keyword-final-approval-execution-enqueue.types';
import type { ExecutionCommandValidationFailure } from '../types/sku-keyword-final-approval-execution-command.types';

export function buildFinalApprovalExecutionApiAcceptedResponse(
  enqueueCommand: FinalApprovalExecutionEnqueueCommand,
  message: string = 'Execution request has been accepted and enqueued.'
): FinalApprovalExecutionApiAcceptedResponse {
  return {
    success: true,
    statusCode: 202,
    message,
    finalApprovalId: enqueueCommand.finalApprovalId,
    actorId: enqueueCommand.actorId,
    idempotencyKey: enqueueCommand.idempotencyKey,
    mode: enqueueCommand.mode
  };
}

export function buildFinalApprovalExecutionApiValidationErrorResponse(
  validationFailure: ExecutionCommandValidationFailure,
  message: string = 'Invalid execution command payload.'
): FinalApprovalExecutionApiValidationErrorResponse {
  return {
    success: false,
    statusCode: 400,
    message,
    errors: validationFailure.errors.map(err => ({ ...err }))
  };
}

export function buildFinalApprovalExecutionApiGuardFailureResponse(
  guardCode: FinalApprovalExecutionGuardCode,
  message: string,
  statusCode: 403 | 409 = 409
): FinalApprovalExecutionApiGuardFailureResponse {
  return {
    success: false,
    statusCode,
    message,
    guardCode
  };
}
