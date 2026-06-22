export type FinalApprovalExecutionWorkerStartupEnv = {
  NODE_ENV?: string;
  ENABLE_FINAL_APPROVAL_EXECUTION_WORKER?: string;
  FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER?: string;
  FINAL_APPROVAL_EXECUTION_QUEUE_NAME?: string;
  REDIS_URL?: string;
  DATABASE_URL?: string;
};

export type FinalApprovalExecutionWorkerStartupMessage = {
  code: string;
  message: string;
};

export type FinalApprovalExecutionWorkerStartupConfigResult = {
  ok: boolean;
  enabled: boolean;
  canStartWorker: boolean;
  queueName: string | null;
  adapter: string | null;
  errors: FinalApprovalExecutionWorkerStartupMessage[];
  warnings: FinalApprovalExecutionWorkerStartupMessage[];
};
