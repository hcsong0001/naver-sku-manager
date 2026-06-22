import type {
  FinalApprovalExecutionTransitionApplyInput,
  FinalApprovalExecutionTransitionApplyPlan,
  FinalApprovalExecutionTransitionApplyPlanItem,
} from '../types/sku-keyword-final-approval-execution-transition-apply.types';

export function buildFinalApprovalExecutionTransitionApplyPlan(
  input: FinalApprovalExecutionTransitionApplyInput
): FinalApprovalExecutionTransitionApplyPlan {
  const plannedAt = new Date(input.now).toISOString();
  const reasonCodes: string[] = [];

  // 1. Guard 차단 체크
  if (!input.guardResult.allowed) {
    reasonCodes.push('GUARD_NOT_ALLOWED');
    return {
      allowed: false,
      executionTransitionAllowed: false,
      dbWriteRequired: false,
      executionPerformed: false,
      planItems: [],
      reasonCodes,
      summary: 'Transition plan blocked: Guard did not allow transition',
      plannedAt,
    };
  }

  // 2. Live mode 차단
  if (input.mode === 'live') {
    reasonCodes.push('LIVE_TRANSITION_APPLY_BLOCKED');
  }

  // 3. finalApprovalId 불일치
  if (input.request.finalApprovalId !== input.finalApproval.id) {
    reasonCodes.push('FINAL_APPROVAL_ID_MISMATCH');
  }

  // 4. finalApproval 상태 체크
  if (input.finalApproval.status !== 'ACTIVE') {
    reasonCodes.push('FINAL_APPROVAL_NOT_ACTIVE');
  }

  // 5. batchJob 상태 체크
  if (input.batchJob.status !== 'APPROVED') {
    reasonCodes.push('BATCH_JOB_NOT_APPROVED');
  }

  // 6. batchJobItem 상태 체크 (READY가 아닌 것)
  const nonReadyItems = input.batchJobItems.filter(item => item.status !== 'READY');
  if (nonReadyItems.length > 0) {
    reasonCodes.push('BATCH_JOB_ITEM_NOT_READY');
  }

  // 7. EXECUTING 상태가 이미 있는지 체크
  if (
    input.finalApproval.status === 'EXECUTING' ||
    input.batchJob.status === 'EXECUTING' ||
    input.batchJobItems.some(item => item.status === 'EXECUTING')
  ) {
    reasonCodes.push('EXECUTING_STATE_ALREADY_PRESENT');
  }

  // 8. idempotencyKey 누락
  if (!input.request.idempotencyKey || input.request.idempotencyKey.trim() === '') {
    reasonCodes.push('IDEMPOTENCY_KEY_MISSING');
  }

  // 9. actorId 누락
  if (!input.request.actorId || input.request.actorId.trim() === '') {
    reasonCodes.push('ACTOR_ID_MISSING');
  }

  // 차단 조건이 있으면 plan 생성 안 함
  if (reasonCodes.length > 0) {
    return {
      allowed: false,
      executionTransitionAllowed: false,
      dbWriteRequired: false,
      executionPerformed: false,
      planItems: [],
      reasonCodes,
      summary: `Transition plan blocked due to: ${reasonCodes.join(', ')}`,
      plannedAt,
    };
  }

  // 10. 전환 계획 생성 (dry-run 모드 - 실제 DB write 없음)
  const planItems: FinalApprovalExecutionTransitionApplyPlanItem[] = [];

  // NaverApiBatchJob: APPROVED -> EXECUTING
  planItems.push({
    targetTable: 'NaverApiBatchJob',
    targetId: input.batchJob.id,
    fromStatus: 'APPROVED',
    toStatus: 'EXECUTING',
    operation: 'UPDATE_STATUS',
  });

  // NaverApiBatchJobItem: READY -> EXECUTING (각 항목)
  for (const item of input.batchJobItems) {
    planItems.push({
      targetTable: 'NaverApiBatchJobItem',
      targetId: item.id,
      fromStatus: 'READY',
      toStatus: 'EXECUTING',
      operation: 'UPDATE_STATUS',
    });
  }

  // NaverApiBatchFinalApproval: ACTIVE 유지
  planItems.push({
    targetTable: 'NaverApiBatchFinalApproval',
    targetId: input.finalApproval.id,
    fromStatus: 'ACTIVE',
    toStatus: 'ACTIVE',
    operation: 'MAINTAIN_STATUS',
  });

  return {
    allowed: true,
    executionTransitionAllowed: true,
    dbWriteRequired: true,
    executionPerformed: false,
    planItems,
    reasonCodes: [],
    summary: `Transition plan ready: 1 job + ${input.batchJobItems.length} items scheduled for EXECUTING`,
    plannedAt,
  };
}
