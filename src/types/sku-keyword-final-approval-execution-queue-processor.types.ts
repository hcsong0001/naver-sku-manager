import type { FinalApprovalExecutionQueueJobName } from './sku-keyword-final-approval-execution-queue.types';
import type { FinalApprovalExecutionWorkerJobDbRevalidationRepository } from './sku-keyword-final-approval-execution-worker-job-db-revalidation.types';

export type FinalApprovalExecutionQueueProcessorInputJob = {
  id?: string;
  name: string;
  data: unknown;
};

export type FinalApprovalExecutionQueueProcessorDependencies = {
  revalidationRepository: FinalApprovalExecutionWorkerJobDbRevalidationRepository;
};

export type FinalApprovalExecutionQueueProcessorSuccessResult = {
  ok: true;
  readyForExecution: true;
  executionPerformed: false;
  finalApprovalId: string;
  idempotencyKey: string;
  mode: string;
  jobName: FinalApprovalExecutionQueueJobName;
};

export type FinalApprovalExecutionQueueProcessorFailureResult = {
  ok: false;
  readyForExecution: false;
  executionPerformed: false;
  reason: string;
  code: string;
};

export type FinalApprovalExecutionQueueProcessorResult =
  | FinalApprovalExecutionQueueProcessorSuccessResult
  | FinalApprovalExecutionQueueProcessorFailureResult;
