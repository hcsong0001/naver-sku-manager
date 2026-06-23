import type { ExecutionCommandValidationError } from './sku-keyword-final-approval-execution-command.types';
import type { FinalApprovalExecutionEnqueueMode } from './sku-keyword-final-approval-execution-enqueue.types';

export type FinalApprovalExecutionApiAcceptedResponse = {
  success: true;
  statusCode: 202;
  message: string;
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  mode: FinalApprovalExecutionEnqueueMode;
};

export type FinalApprovalExecutionApiValidationErrorResponse = {
  success: false;
  statusCode: 400;
  message: string;
  errors: ExecutionCommandValidationError[];
};

export type FinalApprovalExecutionGuardCode =
  | 'JOB_NOT_APPROVED'
  | 'FINAL_APPROVAL_NOT_ACTIVE'
  | 'VALIDATION_EXPIRED'
  | 'HASH_MISMATCH'
  | 'NO_READY_ITEMS'
  | 'UNAUTHORIZED_ACTOR'
  | 'BATCH_JOB_ALREADY_EXECUTED'
  | 'BATCH_JOB_ALREADY_EXECUTING';

export type FinalApprovalExecutionApiGuardFailureResponse = {
  success: false;
  statusCode: 403 | 409;
  message: string;
  guardCode: FinalApprovalExecutionGuardCode;
};

export type FinalApprovalExecutionApiResponse =
  | FinalApprovalExecutionApiAcceptedResponse
  | FinalApprovalExecutionApiValidationErrorResponse
  | FinalApprovalExecutionApiGuardFailureResponse;
