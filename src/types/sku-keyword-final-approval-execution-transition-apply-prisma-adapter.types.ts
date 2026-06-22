import type { FinalApprovalExecutionTransitionApplyPlan } from './sku-keyword-final-approval-execution-transition-apply.types';

// ── Adapter Port Interfaces (실제 Prisma Client를 import하지 않음) ──

export interface TransitionApplyPrismaAdapterUpdateArgs {
  targetId: string;
  fromStatus: string;
  toStatus: string;
}

export interface TransitionApplyPrismaAdapterPort {
  transaction: <T>(callback: (tx: TransitionApplyPrismaAdapterTxPort) => Promise<T>) => Promise<T>;
}

export interface TransitionApplyPrismaAdapterTxPort {
  updateBatchJobStatus: (args: TransitionApplyPrismaAdapterUpdateArgs) => Promise<{ updated: boolean }>;
  updateBatchJobItemStatus: (args: TransitionApplyPrismaAdapterUpdateArgs) => Promise<{ updated: boolean }>;
}

// ── Input / Output Types ──

export interface TransitionApplyPrismaAdapterInput {
  plan: FinalApprovalExecutionTransitionApplyPlan;
  adapter: TransitionApplyPrismaAdapterPort;
  options: {
    now: Date | string;
    mode: 'dry-run' | 'live';
    idempotencyKey: string;
    actorId: string;
  };
}

export interface TransitionApplyPrismaAdapterSuccess {
  success: true;
  applied: true;
  executionPerformed: false;
  dbWriteAttempted: true;
  updatedBatchJobIds: string[];
  updatedBatchJobItemIds: string[];
  reasonCodes: string[];
  summary: string;
}

export interface TransitionApplyPrismaAdapterSkipped {
  success: true;
  applied: false;
  executionPerformed: false;
  dbWriteAttempted: false;
  updatedBatchJobIds: string[];
  updatedBatchJobItemIds: string[];
  reasonCodes: string[];
  summary: string;
}

export interface TransitionApplyPrismaAdapterFailure {
  success: false;
  applied: false;
  executionPerformed: false;
  dbWriteAttempted: boolean;
  updatedBatchJobIds: string[];
  updatedBatchJobItemIds: string[];
  reasonCodes: string[];
  summary: string;
}

export type TransitionApplyPrismaAdapterResult =
  | TransitionApplyPrismaAdapterSuccess
  | TransitionApplyPrismaAdapterSkipped
  | TransitionApplyPrismaAdapterFailure;
