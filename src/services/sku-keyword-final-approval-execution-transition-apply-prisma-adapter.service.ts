import type {
  TransitionApplyPrismaAdapterInput,
  TransitionApplyPrismaAdapterResult,
  TransitionApplyPrismaAdapterTxPort,
  TransitionApplyPrismaAdapterUpdateArgs,
} from '../types/sku-keyword-final-approval-execution-transition-apply-prisma-adapter.types';
import type { FinalApprovalExecutionTransitionApplyPlanItem } from '../types/sku-keyword-final-approval-execution-transition-apply.types';

const BLOCKED_WRITE_TABLES = new Set([
  'NaverApiBatchFinalApproval',
  'NaverApiBatchFinalApprovalItem',
]);

const SUPPORTED_WRITE_TABLES = new Set([
  'NaverApiBatchJob',
  'NaverApiBatchJobItem',
]);

export async function applyFinalApprovalExecutionTransitionPlanWithPrismaAdapter(
  input: TransitionApplyPrismaAdapterInput
): Promise<TransitionApplyPrismaAdapterResult> {
  const { plan, adapter, options } = input;
  const reasonCodes: string[] = [];

  // 1. plan.allowed=false → skip
  if (!plan.allowed) {
    return {
      success: true,
      applied: false,
      executionPerformed: false,
      dbWriteAttempted: false,
      updatedBatchJobIds: [],
      updatedBatchJobItemIds: [],
      reasonCodes: ['PLAN_NOT_ALLOWED'],
      summary: 'Skipped: plan not allowed',
    };
  }

  // 2. dbWriteRequired=false → skip
  if (!plan.dbWriteRequired) {
    return {
      success: true,
      applied: false,
      executionPerformed: false,
      dbWriteAttempted: false,
      updatedBatchJobIds: [],
      updatedBatchJobItemIds: [],
      reasonCodes: ['PLAN_DB_WRITE_NOT_REQUIRED'],
      summary: 'Skipped: db write not required',
    };
  }

  // 3. executionPerformed가 이미 true이면 차단
  if (plan.executionPerformed as boolean) {
    return {
      success: false,
      applied: false,
      executionPerformed: false,
      dbWriteAttempted: false,
      updatedBatchJobIds: [],
      updatedBatchJobItemIds: [],
      reasonCodes: ['PLAN_ALREADY_EXECUTED_BLOCKED'],
      summary: 'Blocked: plan already marked as executed',
    };
  }

  // 4. live mode 차단
  if (options.mode === 'live') {
    return {
      success: false,
      applied: false,
      executionPerformed: false,
      dbWriteAttempted: false,
      updatedBatchJobIds: [],
      updatedBatchJobItemIds: [],
      reasonCodes: ['LIVE_ADAPTER_BLOCKED'],
      summary: 'Blocked: live mode is not allowed',
    };
  }

  // 5. planItems 사전 검증 — write 대상 아이템만 필터
  const writeItems: FinalApprovalExecutionTransitionApplyPlanItem[] = [];
  for (const item of plan.planItems) {
    // MAINTAIN_STATUS는 DB write 불필요 → skip
    if (item.operation === 'MAINTAIN_STATUS') {
      continue;
    }

    // 차단 대상 테이블
    if (BLOCKED_WRITE_TABLES.has(item.targetTable)) {
      const code = item.targetTable === 'NaverApiBatchFinalApproval'
        ? 'FINAL_APPROVAL_WRITE_BLOCKED'
        : 'FINAL_APPROVAL_ITEM_WRITE_BLOCKED';
      reasonCodes.push(code);
      continue;
    }

    // 지원 안 하는 테이블
    if (!SUPPORTED_WRITE_TABLES.has(item.targetTable)) {
      reasonCodes.push('UNSUPPORTED_TARGET_TABLE');
      continue;
    }

    writeItems.push(item);
  }

  // 차단 사유가 존재하면 실패
  if (reasonCodes.length > 0) {
    return {
      success: false,
      applied: false,
      executionPerformed: false,
      dbWriteAttempted: false,
      updatedBatchJobIds: [],
      updatedBatchJobItemIds: [],
      reasonCodes,
      summary: `Blocked due to: ${reasonCodes.join(', ')}`,
    };
  }

  // 6. transaction 경계 내부에서 write 실행
  try {
    const result = await adapter.transaction(async (tx: TransitionApplyPrismaAdapterTxPort) => {
      const updatedBatchJobIds: string[] = [];
      const updatedBatchJobItemIds: string[] = [];

      for (const item of writeItems) {
        const args: TransitionApplyPrismaAdapterUpdateArgs = {
          targetId: item.targetId,
          fromStatus: item.fromStatus,
          toStatus: item.toStatus,
        };

        if (item.targetTable === 'NaverApiBatchJob') {
          await tx.updateBatchJobStatus(args);
          updatedBatchJobIds.push(item.targetId);
        } else if (item.targetTable === 'NaverApiBatchJobItem') {
          await tx.updateBatchJobItemStatus(args);
          updatedBatchJobItemIds.push(item.targetId);
        }
      }

      return { updatedBatchJobIds, updatedBatchJobItemIds };
    });

    return {
      success: true,
      applied: true,
      executionPerformed: false,
      dbWriteAttempted: true,
      updatedBatchJobIds: result.updatedBatchJobIds,
      updatedBatchJobItemIds: result.updatedBatchJobItemIds,
      reasonCodes: [],
      summary: `Applied: ${result.updatedBatchJobIds.length} job(s), ${result.updatedBatchJobItemIds.length} item(s) updated`,
    };
  } catch (error) {
    return {
      success: false,
      applied: false,
      executionPerformed: false,
      dbWriteAttempted: true,
      updatedBatchJobIds: [],
      updatedBatchJobItemIds: [],
      reasonCodes: ['TRANSACTION_FAILED'],
      summary: error instanceof Error ? error.message : 'Transaction failed',
    };
  }
}
