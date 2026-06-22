import type { FinalApprovalExecutionEnqueueCommand } from '../types/sku-keyword-final-approval-execution-enqueue.types';
import type { 
  FinalApprovalExecutionQueuePort, 
  FinalApprovalExecutionQueuePayload,
  FinalApprovalExecutionQueueEnqueueResult
} from '../types/sku-keyword-final-approval-execution-queue.types';

export async function enqueueFinalApprovalExecutionJob(
  command: FinalApprovalExecutionEnqueueCommand,
  queuePort: FinalApprovalExecutionQueuePort
): Promise<FinalApprovalExecutionQueueEnqueueResult> {
  // 입력 객체를 mutate하지 않도록 새 객체로 조립
  const payload: FinalApprovalExecutionQueuePayload = {
    finalApprovalId: command.finalApprovalId,
    actorId: command.actorId,
    idempotencyKey: command.idempotencyKey,
    requestedAt: command.requestedAt,
    source: command.source,
    mode: command.mode,
  };

  try {
    const result = await queuePort.enqueue(
      'sku-keyword-final-approval-execution',
      payload,
      { jobId: payload.idempotencyKey } // idempotencyKey가 jobId로 사용됨
    );

    const response: FinalApprovalExecutionQueueEnqueueResult = {
      success: result.success,
      jobName: result.jobName,
      jobId: result.jobId,
      status: result.status,
    };

    if (result.enqueuedAt) response.enqueuedAt = result.enqueuedAt;
    if (result.error) response.error = result.error;
    if (result.payloadSummary) response.payloadSummary = result.payloadSummary;

    return response;
  } catch (error) {
    return {
      success: false,
      jobName: 'sku-keyword-final-approval-execution',
      jobId: payload.idempotencyKey,
      status: 'FAILED',
      error: error instanceof Error ? error.message : 'Unknown queue enqueue error',
    };
  }
}
