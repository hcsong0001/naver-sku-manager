

export type FinalApprovalExecutionEnqueueMode = 'MOCK' | 'DRY_RUN_READY';

export type FinalApprovalExecutionEnqueueCommand = {
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  requestedAt: string;
  source: 'EXECUTION_API';
  mode: FinalApprovalExecutionEnqueueMode;
};
