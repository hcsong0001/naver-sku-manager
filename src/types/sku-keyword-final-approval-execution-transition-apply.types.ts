export type FinalApprovalExecutionTransitionApplyMode = 'dry-run' | 'live';

export type FinalApprovalExecutionTransitionApplyOperation = 'UPDATE_STATUS' | 'MAINTAIN_STATUS';

export interface FinalApprovalExecutionTransitionApplyPlanItem {
  targetTable: 'NaverApiBatchJob' | 'NaverApiBatchJobItem' | 'NaverApiBatchFinalApproval';
  targetId: string;
  fromStatus: string;
  toStatus: string;
  operation: FinalApprovalExecutionTransitionApplyOperation;
}

export interface FinalApprovalExecutionTransitionApplyGuardResult {
  allowed: boolean;
  reasonCodes: string[];
  checkedAt: string;
}

export interface FinalApprovalExecutionTransitionApplyInput {
  now: Date | string;
  mode: FinalApprovalExecutionTransitionApplyMode;
  guardResult: FinalApprovalExecutionTransitionApplyGuardResult;
  finalApproval: {
    id: string;
    status: string;
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
  };
}

export interface FinalApprovalExecutionTransitionApplyPlan {
  allowed: boolean;
  executionTransitionAllowed: boolean;
  dbWriteRequired: boolean;
  executionPerformed: false;
  planItems: FinalApprovalExecutionTransitionApplyPlanItem[];
  reasonCodes: string[];
  summary: string;
  plannedAt: string;
}
