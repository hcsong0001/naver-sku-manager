export type FinalApprovalExecutionQueueJobName = 'sku-keyword-final-approval-execution';

export type FinalApprovalExecutionQueuePayload = {
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  requestedAt: string;
  source: 'EXECUTION_API';
  mode: 'MOCK' | 'DRY_RUN_READY' | 'LIVE';
};

export type FinalApprovalExecutionQueueEnqueueResult = {
  success: boolean;
  jobName: FinalApprovalExecutionQueueJobName;
  jobId: string;
  status: 'ENQUEUED' | 'FAILED';
  enqueuedAt?: string;
  error?: string;
  payloadSummary?: {
    finalApprovalId: string;
    mode: string;
  };
};

export interface FinalApprovalExecutionQueuePort {
  enqueue(
    jobName: FinalApprovalExecutionQueueJobName,
    payload: FinalApprovalExecutionQueuePayload,
    options?: { jobId?: string }
  ): Promise<FinalApprovalExecutionQueueEnqueueResult>;
}
