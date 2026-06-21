import type { FinalApprovalExecutionPlan } from '../types/sku-keyword-final-approval-execution-plan.types';
import type { FinalApprovalExecutionEnqueueCommand } from '../types/sku-keyword-final-approval-execution-enqueue.types';
import type { FinalApprovalWorkerExecutionContext } from '../types/sku-keyword-final-approval-worker-execution-context.types';

export function buildFinalApprovalWorkerExecutionContext(
  enqueueCommand: FinalApprovalExecutionEnqueueCommand,
  plan: FinalApprovalExecutionPlan
): FinalApprovalWorkerExecutionContext {
  
  const targetOperationsSet = new Set<string>();
  
  if (plan.items && Array.isArray(plan.items)) {
    for (const item of plan.items) {
      if (item.proposedAction) {
        targetOperationsSet.add(item.proposedAction);
      }
    }
  }

  const targetOperations = Array.from(targetOperationsSet);
  const totalItems = plan.items ? plan.items.length : 0;
  const isDryRunMode = enqueueCommand.mode === 'MOCK' || enqueueCommand.mode === 'DRY_RUN_READY';
  
  const context: FinalApprovalWorkerExecutionContext = {
    finalApprovalId: enqueueCommand.finalApprovalId,
    actorId: enqueueCommand.actorId,
    idempotencyKey: enqueueCommand.idempotencyKey,
    requestedAt: enqueueCommand.requestedAt,
    source: enqueueCommand.source,
    mode: enqueueCommand.mode,
    totalItems,
    targetOperations,
    planSummary: {
      totalItems: plan.summary?.totalItems ?? totalItems,
      hasBlockingFailure: plan.summary?.hasBlockingFailure ?? false,
      affectedProductCount: plan.summary?.affectedProductCount ?? 0,
    },
    safetyFlags: {
      isDryRunMode,
      requiresStrictAck: true
    }
  };

  return context;
}
