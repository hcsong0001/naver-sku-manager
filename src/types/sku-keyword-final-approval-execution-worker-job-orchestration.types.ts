export type FinalApprovalExecutionWorkerJobOrchestrationFailureStage = 'PAYLOAD_VALIDATION' | 'DB_REVALIDATION' | 'ORCHESTRATION';

export type FinalApprovalExecutionWorkerJobOrchestrationErrorCode = 'PAYLOAD_VALIDATION_FAILED' | 'DB_REVALIDATION_FAILED' | 'UNEXPECTED_ORCHESTRATION_ERROR';

export interface FinalApprovalExecutionWorkerJobOrchestrationSuccess {
  success: true;
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  source: string;
  mode: string;
  requestedAt: string;
  revalidatedAt: string;
  readyForExecution: true;
  executionPerformed: false;
}

export interface FinalApprovalExecutionWorkerJobOrchestrationFailure {
  success: false;
  stage: FinalApprovalExecutionWorkerJobOrchestrationFailureStage;
  errorCode: FinalApprovalExecutionWorkerJobOrchestrationErrorCode;
  statusCode: number;
  message: string;
  details?: unknown;
}

export type FinalApprovalExecutionWorkerJobOrchestrationResult =
  | FinalApprovalExecutionWorkerJobOrchestrationSuccess
  | FinalApprovalExecutionWorkerJobOrchestrationFailure;
