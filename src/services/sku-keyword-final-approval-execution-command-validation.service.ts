import type { 
  ExecutionCommandValidationResult, 
  ExecutionCommandValidationError,
  FinalApprovalExecutionCommand
} from '../types/sku-keyword-final-approval-execution-command.types';

export function parseFinalApprovalExecutionCommand(
  input: unknown
): ExecutionCommandValidationResult {
  const errors: ExecutionCommandValidationError[] = [];

  if (!input || typeof input !== 'object') {
    return {
      success: false,
      errors: [{ code: 'INVALID_INPUT_TYPE', message: 'Input must be a non-null object' }]
    };
  }

  const payload = input as Record<string, unknown>;

  let finalApprovalId = '';
  if (typeof payload.finalApprovalId !== 'string' || payload.finalApprovalId.trim() === '') {
    errors.push({ code: 'MISSING_FINAL_APPROVAL_ID', message: 'finalApprovalId is required and must be a string' });
  } else {
    finalApprovalId = payload.finalApprovalId.trim();
  }

  let actorId = '';
  if (typeof payload.actorId !== 'string' || payload.actorId.trim() === '') {
    errors.push({ code: 'MISSING_ACTOR_ID', message: 'actorId is required and must be a string' });
  } else {
    actorId = payload.actorId.trim();
  }

  let confirmExecutionOnly = false;
  if (payload.confirmExecutionOnly !== true) {
    errors.push({ code: 'MISSING_CONFIRMATION', message: 'confirmExecutionOnly must be strictly true' });
  } else {
    confirmExecutionOnly = true;
  }

  let acknowledgement = false;
  if (payload.acknowledgement !== true) {
    errors.push({ code: 'MISSING_ACKNOWLEDGEMENT', message: 'acknowledgement must be strictly true for live execution' });
  } else {
    acknowledgement = true;
  }

  let idempotencyKey = '';
  if (typeof payload.idempotencyKey !== 'string' || payload.idempotencyKey.trim() === '') {
    errors.push({ code: 'MISSING_IDEMPOTENCY_KEY', message: 'idempotencyKey is required and must be a string' });
  } else {
    const key = payload.idempotencyKey.trim();
    if (key.length < 10 || key.length > 100) {
      errors.push({ code: 'INVALID_IDEMPOTENCY_KEY_LENGTH', message: 'idempotencyKey must be between 10 and 100 characters' });
    } else {
      idempotencyKey = key;
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const command: FinalApprovalExecutionCommand = {
    finalApprovalId,
    actorId,
    confirmExecutionOnly,
    acknowledgement,
    idempotencyKey
  };

  return {
    success: true,
    command
  };
}
