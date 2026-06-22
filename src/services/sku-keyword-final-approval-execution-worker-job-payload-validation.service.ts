import type {
  FinalApprovalExecutionWorkerJobPayload,
  FinalApprovalExecutionWorkerJobPayloadValidationResult,
  FinalApprovalExecutionWorkerJobPayloadValidationError,
} from '../types/sku-keyword-final-approval-execution-worker-job-payload-validation.types';

export function parseFinalApprovalExecutionWorkerJobPayload(
  input: unknown
): FinalApprovalExecutionWorkerJobPayloadValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      success: false,
      errors: [{ code: 'INVALID_PAYLOAD', message: 'Payload must be a plain object.' }],
    };
  }

  const errors: FinalApprovalExecutionWorkerJobPayloadValidationError[] = [];
  const rawPayload = input as Record<string, unknown>;

  // 1. finalApprovalId
  let finalApprovalId = '';
  if (typeof rawPayload.finalApprovalId !== 'string' || !rawPayload.finalApprovalId.trim()) {
    errors.push({ code: 'FINAL_APPROVAL_ID_REQUIRED', message: 'finalApprovalId is required and must be a non-empty string.' });
  } else {
    finalApprovalId = rawPayload.finalApprovalId.trim();
  }

  // 2. actorId
  let actorId = '';
  if (typeof rawPayload.actorId !== 'string' || !rawPayload.actorId.trim()) {
    errors.push({ code: 'ACTOR_ID_REQUIRED', message: 'actorId is required and must be a non-empty string.' });
  } else {
    actorId = rawPayload.actorId.trim();
  }

  // 3. idempotencyKey
  let idempotencyKey = '';
  if (typeof rawPayload.idempotencyKey !== 'string' || !rawPayload.idempotencyKey.trim()) {
    errors.push({ code: 'IDEMPOTENCY_KEY_REQUIRED', message: 'idempotencyKey is required and must be a non-empty string.' });
  } else {
    idempotencyKey = rawPayload.idempotencyKey.trim();
    if (idempotencyKey.length < 5 || idempotencyKey.length > 255) {
      errors.push({ code: 'IDEMPOTENCY_KEY_INVALID', message: 'idempotencyKey length is invalid.' });
    }
  }

  // 4. requestedAt
  let requestedAt = '';
  if (typeof rawPayload.requestedAt !== 'string' || !rawPayload.requestedAt.trim()) {
    errors.push({ code: 'REQUESTED_AT_REQUIRED', message: 'requestedAt is required and must be a non-empty string.' });
  } else {
    const timestamp = Date.parse(rawPayload.requestedAt.trim());
    if (Number.isNaN(timestamp)) {
      errors.push({ code: 'REQUESTED_AT_INVALID', message: 'requestedAt must be a valid ISO date string.' });
    } else {
      requestedAt = rawPayload.requestedAt.trim();
    }
  }

  // 5. source
  let source: 'EXECUTION_API' | null = null;
  if (rawPayload.source !== 'EXECUTION_API') {
    errors.push({ code: 'SOURCE_INVALID', message: 'source must be EXECUTION_API.' });
  } else {
    source = rawPayload.source;
  }

  // 6. mode
  let mode: 'MOCK' | 'DRY_RUN_READY' | null = null;
  if (rawPayload.mode === 'LIVE') {
    errors.push({ code: 'LIVE_MODE_NOT_ALLOWED', message: 'LIVE mode is not allowed in this validation service yet.' });
  } else if (rawPayload.mode !== 'MOCK' && rawPayload.mode !== 'DRY_RUN_READY') {
    errors.push({ code: 'MODE_INVALID', message: 'mode must be MOCK or DRY_RUN_READY.' });
  } else {
    mode = rawPayload.mode as 'MOCK' | 'DRY_RUN_READY';
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  // All valid
  const payload: FinalApprovalExecutionWorkerJobPayload = {
    finalApprovalId,
    actorId,
    idempotencyKey,
    requestedAt,
    source: source!,
    mode: mode!,
  };

  return { success: true, payload };
}
