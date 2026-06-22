export type FinalApprovalExecutionTransitionGuardMode = 'dry-run' | 'live' | 'MOCK' | 'DRY_RUN_READY' | 'LIVE';

export type FinalApprovalExecutionTransitionGuardInput = {
  now: Date | string;
  mode: FinalApprovalExecutionTransitionGuardMode;
  finalApproval: {
    id: string;
    status: string;
    validationExpiresAt: Date | string;
    payloadHash: string;
    validationSnapshotHash: string;
  };
  batchJob: {
    id: string;
    status: string;
  };
  batchJobItems: Array<{
    id: string;
    status: string;
  }>;
  request: {
    finalApprovalId: string;
    idempotencyKey: string;
    actorId: string;
    payloadHash: string;
    validationSnapshotHash: string;
  };
};

export type FinalApprovalExecutionTransitionGuardResult = {
  allowed: boolean;
  reasonCodes: string[];
  summary: string;
  checkedAt: string;
};
