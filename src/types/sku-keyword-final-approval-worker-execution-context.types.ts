import type { 
  FinalApprovalExecutionEnqueueMode
} from './sku-keyword-final-approval-execution-enqueue.types';

export type WorkerExecutionPlanSummary = {
  totalItems: number;
  hasBlockingFailure: boolean;
  affectedProductCount: number;
};

export type WorkerExecutionSafetyFlags = {
  isDryRunMode: boolean;
  requiresStrictAck: boolean;
};

export type FinalApprovalWorkerExecutionContext = {
  finalApprovalId: string;
  actorId: string;
  idempotencyKey: string;
  requestedAt: string;
  source: 'EXECUTION_API';
  mode: FinalApprovalExecutionEnqueueMode;
  totalItems: number;
  targetOperations: string[];
  planSummary: WorkerExecutionPlanSummary;
  safetyFlags: WorkerExecutionSafetyFlags;
};
