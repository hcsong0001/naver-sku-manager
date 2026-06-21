export type FinalApprovalExecutionCommand = {
  finalApprovalId: string;
  actorId: string;
  confirmExecutionOnly: boolean;
  acknowledgement: boolean;
  idempotencyKey: string;
};

export type ExecutionCommandValidationError = {
  code: string;
  message: string;
};

export type ExecutionCommandValidationSuccess = {
  success: true;
  command: FinalApprovalExecutionCommand;
};

export type ExecutionCommandValidationFailure = {
  success: false;
  errors: ExecutionCommandValidationError[];
};

export type ExecutionCommandValidationResult =
  | ExecutionCommandValidationSuccess
  | ExecutionCommandValidationFailure;
