import type { FinalApprovalExecutionWorkerStartupEnv, FinalApprovalExecutionWorkerStartupMessage } from './sku-keyword-final-approval-execution-worker-startup-config.types';

export interface FinalApprovalExecutionWorkerRuntimeDependencies {
  env: FinalApprovalExecutionWorkerStartupEnv;
  processor: (job: { name: string; data: unknown; id?: string }) => Promise<unknown>;
  logger?: {
    info: (msg: string) => void;
    error: (msg: string, err?: unknown) => void;
  };
}

export interface FinalApprovalExecutionWorkerRuntimeResult {
  ok: boolean;
  started: boolean;
  queueName: string | null;
  close: () => Promise<void>;
  errors: FinalApprovalExecutionWorkerStartupMessage[];
  warnings: FinalApprovalExecutionWorkerStartupMessage[];
}
