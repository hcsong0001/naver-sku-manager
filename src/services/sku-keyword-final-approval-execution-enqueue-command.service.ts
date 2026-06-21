import type { FinalApprovalExecutionCommand } from '../types/sku-keyword-final-approval-execution-command.types';
import type { 
  FinalApprovalExecutionEnqueueCommand,
  FinalApprovalExecutionEnqueueMode
} from '../types/sku-keyword-final-approval-execution-enqueue.types';
import * as crypto from 'node:crypto';

export type BuildEnqueueCommandOptions = {
  requestedAt?: string;
  mode?: FinalApprovalExecutionEnqueueMode;
};

export function buildFinalApprovalExecutionEnqueueCommand(
  command: FinalApprovalExecutionCommand,
  options: BuildEnqueueCommandOptions = {}
): FinalApprovalExecutionEnqueueCommand {
  const { requestedAt = new Date().toISOString(), mode = 'DRY_RUN_READY' } = options;

  let idempotencyKey = command.idempotencyKey;
  if (!idempotencyKey || typeof idempotencyKey !== 'string' || idempotencyKey.trim() === '') {
    // Deterministic fallback based on finalApprovalId and actorId if missing
    idempotencyKey = `idem-${crypto.createHash('sha256').update(`${command.finalApprovalId}-${command.actorId}`).digest('hex').substring(0, 16)}`;
  }

  const enqueueCommand: FinalApprovalExecutionEnqueueCommand = {
    finalApprovalId: command.finalApprovalId,
    actorId: command.actorId,
    idempotencyKey,
    requestedAt,
    source: 'EXECUTION_API',
    mode
  };

  return enqueueCommand;
}
