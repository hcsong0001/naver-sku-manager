import type { FinalApprovalExecutionQueueJobName } from './sku-keyword-final-approval-execution-queue.types';

export type FinalApprovalExecutionApiQueueEnqueueSuccessResponse = {
  success: true;
  statusCode: 202;
  message: string;
  jobName: FinalApprovalExecutionQueueJobName;
  jobId: string;
  idempotencyKey: string;
  mode: string;
  enqueuedAt?: string;
  acceptedAt?: string;
};

export type FinalApprovalExecutionApiQueueEnqueueFailureResponse = {
  success: false;
  statusCode: 500 | 503;
  message: string;
  errorCode: string;
  idempotencyKey?: string;
};

export type FinalApprovalExecutionApiQueueEnqueueValidationErrorResponse = {
  success: false;
  statusCode: 400;
  message: string;
  errors: Array<{ code: string; message: string }>;
};

export type FinalApprovalExecutionApiQueueEnqueueOrchestrationResult = 
  | FinalApprovalExecutionApiQueueEnqueueSuccessResponse
  | FinalApprovalExecutionApiQueueEnqueueFailureResponse
  | FinalApprovalExecutionApiQueueEnqueueValidationErrorResponse;
