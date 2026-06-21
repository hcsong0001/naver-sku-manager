import type { FinalApprovalExecutionGuardCode } from './sku-keyword-final-approval-execution-api-response.types';

export type FinalApprovalExecutionDbReadGuardInput = {
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
};

export type FinalApprovalExecutionDbReadGuardSnapshot = {
  finalApproval: {
    id: string;
    status: string;
    validationExpiresAt: Date | string | null;
    payloadHash: string | null;
    validationSnapshotHash: string | null;
    jobId: string;
  } | null;
  job: {
    id: string;
    status: string;
  } | null;
  items: Array<{
    id: string;
    status: string;
  }>;
};

export interface FinalApprovalExecutionDbReadGuardRepository {
  findSnapshotForExecutionGuard(finalApprovalId: string): Promise<FinalApprovalExecutionDbReadGuardSnapshot>;
}

export type FinalApprovalExecutionDbReadGuardSuccess = {
  success: true;
  snapshot: FinalApprovalExecutionDbReadGuardSnapshot;
};

export type FinalApprovalExecutionDbReadGuardFailure = {
  success: false;
  statusCode: 404 | 409 | 500;
  guardCode: FinalApprovalExecutionGuardCode | 'FINAL_APPROVAL_NOT_FOUND' | 'INTERNAL_ERROR';
  message: string;
};

export type FinalApprovalExecutionDbReadGuardResult = 
  | FinalApprovalExecutionDbReadGuardSuccess
  | FinalApprovalExecutionDbReadGuardFailure;
