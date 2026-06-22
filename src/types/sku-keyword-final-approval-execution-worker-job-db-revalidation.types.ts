export type FinalApprovalExecutionWorkerJobDbRevalidationErrorCode =
  | 'FINAL_APPROVAL_NOT_FOUND'
  | 'FINAL_APPROVAL_NOT_ACTIVE'
  | 'FINAL_APPROVAL_EXPIRED'
  | 'JOB_NOT_APPROVED'
  | 'NO_READY_ITEMS'
  | 'PAYLOAD_HASH_MISMATCH'
  | 'VALIDATION_SNAPSHOT_HASH_MISMATCH'
  | 'IDEMPOTENCY_KEY_ALREADY_USED'
  | 'MODE_NOT_ALLOWED'
  | 'LIVE_MODE_NOT_ALLOWED'
  | 'REPOSITORY_ERROR';

export interface FinalApprovalExecutionWorkerJobDbRevalidationError {
  code: FinalApprovalExecutionWorkerJobDbRevalidationErrorCode;
  message: string;
  statusCode: number;
}

export interface FinalApprovalExecutionWorkerJobDbRevalidationSnapshot {
  finalApprovalId: string;
  finalApprovalStatus: string;
  finalApprovalExpiresAt: string | null;
  jobId: string;
  jobStatus: string;
  readyItemCount: number;
  payloadHash: string | null;
  validationSnapshotHash: string | null;
  expectedPayloadHash: string;
  expectedValidationSnapshotHash: string;
  idempotencyKey: string;
  idempotencyKeyAlreadyUsed: boolean;
}

export interface FinalApprovalExecutionWorkerJobDbRevalidationRepository {
  findSnapshotForWorkerJobRevalidation(
    finalApprovalId: string,
    idempotencyKey: string
  ): Promise<FinalApprovalExecutionWorkerJobDbRevalidationSnapshot | null>;
}

export type FinalApprovalExecutionWorkerJobDbRevalidationResult =
  | { success: true; summary: Record<string, unknown> }
  | { success: false; error: FinalApprovalExecutionWorkerJobDbRevalidationError };
