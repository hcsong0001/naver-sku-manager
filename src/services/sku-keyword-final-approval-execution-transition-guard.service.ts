import type { 
  FinalApprovalExecutionTransitionGuardInput, 
  FinalApprovalExecutionTransitionGuardResult 
} from '../types/sku-keyword-final-approval-execution-transition-guard.types';

export function evaluateFinalApprovalExecutionTransitionGuard(
  input: FinalApprovalExecutionTransitionGuardInput
): FinalApprovalExecutionTransitionGuardResult {
  const reasonCodes: string[] = [];
  const checkedAt = new Date(input.now).toISOString();
  
  // 1. Mode check
  if (input.mode === 'live' || input.mode === 'LIVE') {
    reasonCodes.push('LIVE_MODE_BLOCKED');
  }

  // 2. FinalApprovalId check
  if (input.request.finalApprovalId !== input.finalApproval.id) {
    reasonCodes.push('FINAL_APPROVAL_ID_MISMATCH');
  }

  // 3. Status checks
  if (input.finalApproval.status !== 'ACTIVE') {
    reasonCodes.push('FINAL_APPROVAL_NOT_ACTIVE');
  }

  if (input.batchJob.status !== 'APPROVED') {
    reasonCodes.push('BATCH_JOB_NOT_APPROVED');
  }

  const notReadyItems = input.batchJobItems.filter(item => item.status !== 'READY');
  if (notReadyItems.length > 0) {
    reasonCodes.push('BATCH_JOB_ITEM_NOT_READY');
  }

  if (
    input.finalApproval.status === 'EXECUTING' || 
    input.batchJob.status === 'EXECUTING' || 
    input.batchJobItems.some(item => item.status === 'EXECUTING')
  ) {
    reasonCodes.push('EXECUTING_STATE_BLOCKED');
  }

  // 4. Expiration check
  const nowMs = new Date(input.now).getTime();
  const expiresAtMs = new Date(input.finalApproval.validationExpiresAt).getTime();
  if (nowMs >= expiresAtMs) {
    reasonCodes.push('VALIDATION_EXPIRED');
  }

  // 5. Missing required fields
  if (!input.request.idempotencyKey || input.request.idempotencyKey.trim() === '') {
    reasonCodes.push('IDEMPOTENCY_KEY_MISSING');
  }

  if (!input.request.actorId || input.request.actorId.trim() === '') {
    reasonCodes.push('ACTOR_ID_MISSING');
  }

  // 6. Hash match checks
  if (input.request.payloadHash !== input.finalApproval.payloadHash) {
    reasonCodes.push('PAYLOAD_HASH_MISMATCH');
  }

  if (input.request.validationSnapshotHash !== input.finalApproval.validationSnapshotHash) {
    reasonCodes.push('VALIDATION_SNAPSHOT_HASH_MISMATCH');
  }

  const allowed = reasonCodes.length === 0;
  const summary = allowed 
    ? 'Transition is allowed' 
    : `Transition blocked due to: ${reasonCodes.join(', ')}`;

  return {
    allowed,
    reasonCodes,
    summary,
    checkedAt
  };
}
