export type FinalApprovalExecutionWorkerJobPayloadValidationErrorCode =
  | 'INVALID_PAYLOAD'
  | 'FINAL_APPROVAL_ID_REQUIRED'
  | 'ACTOR_ID_REQUIRED'
  | 'IDEMPOTENCY_KEY_REQUIRED'
  | 'IDEMPOTENCY_KEY_INVALID'
  | 'REQUESTED_AT_REQUIRED'
  | 'REQUESTED_AT_INVALID'
  | 'SOURCE_INVALID'
  | 'MODE_INVALID'
  | 'LIVE_MODE_NOT_ALLOWED';

export interface FinalApprovalExecutionWorkerJobPayloadValidationError {
  code: FinalApprovalExecutionWorkerJobPayloadValidationErrorCode;
  message: string;
}

export interface FinalApprovalExecutionWorkerJobPayload {
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  requestedAt: string;
  source: 'EXECUTION_API';
  mode: 'MOCK' | 'DRY_RUN_READY';
}

export type FinalApprovalExecutionWorkerJobPayloadValidationResult =
  | { success: true; payload: FinalApprovalExecutionWorkerJobPayload }
  | { success: false; errors: FinalApprovalExecutionWorkerJobPayloadValidationError[] };
