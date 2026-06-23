export interface ExecutionReplayGuardInput {
  batchJobStatus: string | undefined;
  batchJobExecutedAt: string | null | undefined;
  finalApprovalStatus: string | undefined;
  itemStatuses: string[];
  executionMetadata?: ExecutionReplayMetadata | null;
}

export interface ExecutionReplayMetadata {
  executionMode?: string;
  actorId?: string;
  finalApprovalId?: string;
  startedAt?: string;
  endedAt?: string;
  recordedAt?: string;
  durationMs?: number;
}

export type ExecutionReplayGuardReasonCode =
  | 'ALLOWED_APPROVED_READY'
  | 'BATCH_JOB_ALREADY_EXECUTED'
  | 'BATCH_JOB_ALREADY_EXECUTING'
  | 'BATCH_JOB_EXECUTION_PARTIAL'
  | 'BATCH_JOB_EXECUTION_FAILED'
  | 'BATCH_JOB_HAS_EXECUTED_ITEMS'
  | 'BATCH_JOB_NOT_APPROVED'
  | 'FINAL_APPROVAL_NOT_ACTIVE';

export interface ExecutionReplayGuardResult {
  allowed: boolean;
  reasonCode: ExecutionReplayGuardReasonCode;
  reasonMessage: string;
  alreadyExecuted: boolean;
  alreadyExecuting: boolean;
  hasSuccessItems: boolean;
  hasFailedItems: boolean;
  executedAt: string | null;
  actorId: string | null;
  executionMode: string | null;
}

const TERMINAL_JOB_STATUSES = new Set(['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED']);

export function evaluateFinalApprovalExecutionReplayGuard(
  input: ExecutionReplayGuardInput
): ExecutionReplayGuardResult {
  const batchJobStatus = input.batchJobStatus ?? '';
  const finalApprovalStatus = input.finalApprovalStatus ?? '';
  const itemStatuses = input.itemStatuses;

  const hasSuccessItems = itemStatuses.some((s) => s === 'SUCCESS');
  const hasFailedItems = itemStatuses.some((s) => s === 'FAILED');
  const executedAt = input.batchJobExecutedAt ?? null;
  const actorId = input.executionMetadata?.actorId ?? null;
  const executionMode = input.executionMetadata?.executionMode ?? null;

  const base = { hasSuccessItems, hasFailedItems, executedAt, actorId, executionMode };

  if (batchJobStatus === 'EXECUTED') {
    return {
      allowed: false,
      reasonCode: 'BATCH_JOB_ALREADY_EXECUTED',
      reasonMessage:
        '이 BatchJob은 이미 실행 완료되었습니다. 안전을 위해 재실행은 별도 승인 흐름에서만 가능합니다.',
      alreadyExecuted: true,
      alreadyExecuting: false,
      ...base,
    };
  }

  if (batchJobStatus === 'EXECUTING') {
    return {
      allowed: false,
      reasonCode: 'BATCH_JOB_ALREADY_EXECUTING',
      reasonMessage: '이 BatchJob은 현재 실행 중입니다. 동시 실행은 허용되지 않습니다.',
      alreadyExecuted: false,
      alreadyExecuting: true,
      ...base,
    };
  }

  if (batchJobStatus === 'PARTIAL_SUCCESS') {
    return {
      allowed: false,
      reasonCode: 'BATCH_JOB_EXECUTION_PARTIAL',
      reasonMessage:
        '이 BatchJob은 일부 성공 상태로 실행이 완료되었습니다. 재실행은 별도 승인 흐름에서만 가능합니다.',
      alreadyExecuted: true,
      alreadyExecuting: false,
      ...base,
    };
  }

  if (batchJobStatus === 'FAILED') {
    return {
      allowed: false,
      reasonCode: 'BATCH_JOB_EXECUTION_FAILED',
      reasonMessage:
        '이 BatchJob 실행이 실패했습니다. 재실행은 별도 승인 흐름에서만 가능합니다.',
      alreadyExecuted: true,
      alreadyExecuting: false,
      ...base,
    };
  }

  if (hasSuccessItems || hasFailedItems) {
    return {
      allowed: false,
      reasonCode: 'BATCH_JOB_HAS_EXECUTED_ITEMS',
      reasonMessage:
        '이미 실행된 항목(SUCCESS/FAILED)이 있습니다. 재실행은 별도 승인 흐름에서만 가능합니다.',
      alreadyExecuted: false,
      alreadyExecuting: false,
      ...base,
    };
  }

  if (finalApprovalStatus !== 'ACTIVE') {
    return {
      allowed: false,
      reasonCode: 'FINAL_APPROVAL_NOT_ACTIVE',
      reasonMessage: 'FinalApproval이 ACTIVE 상태가 아닙니다.',
      alreadyExecuted: false,
      alreadyExecuting: false,
      ...base,
    };
  }

  if (batchJobStatus !== 'APPROVED') {
    return {
      allowed: false,
      reasonCode: 'BATCH_JOB_NOT_APPROVED',
      reasonMessage: `BatchJob이 APPROVED 상태가 아닙니다. 현재 상태: ${batchJobStatus || '(알 수 없음)'}`,
      alreadyExecuted: TERMINAL_JOB_STATUSES.has(batchJobStatus),
      alreadyExecuting: false,
      ...base,
    };
  }

  return {
    allowed: true,
    reasonCode: 'ALLOWED_APPROVED_READY',
    reasonMessage: '실행 가능한 상태입니다.',
    alreadyExecuted: false,
    alreadyExecuting: false,
    hasSuccessItems: false,
    hasFailedItems: false,
    executedAt: null,
    actorId,
    executionMode,
  };
}
