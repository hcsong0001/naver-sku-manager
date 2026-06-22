import { parseFinalApprovalExecutionCommand } from './sku-keyword-final-approval-execution-command-validation.service';
import { buildFinalApprovalExecutionEnqueueCommand } from './sku-keyword-final-approval-execution-enqueue-command.service';
import { enqueueFinalApprovalExecutionJob } from './sku-keyword-final-approval-execution-queue-enqueue.service';
import type { FinalApprovalExecutionQueuePort } from '../types/sku-keyword-final-approval-execution-queue.types';
import type { 
  FinalApprovalExecutionApiQueueEnqueueOrchestrationResult,
  FinalApprovalExecutionApiQueueEnqueueSuccessResponse
} from '../types/sku-keyword-final-approval-execution-api-queue-enqueue-orchestration.types';

export async function runFinalApprovalExecutionApiQueueEnqueueOrchestration(
  requestBody: unknown,
  queuePort: FinalApprovalExecutionQueuePort
): Promise<FinalApprovalExecutionApiQueueEnqueueOrchestrationResult> {
  // 1. Command Validation
  const validationResult = parseFinalApprovalExecutionCommand(requestBody);
  if (!validationResult.success) {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid execution command payload.',
      errors: validationResult.errors.map(err => ({ ...err }))
    };
  }

  const { command } = validationResult;

  // (DB Read Guard는 API Route 최상위에서 선행 처리되므로 여기서는 호출하지 않음)
  
  // 2. Enqueue Command 생성
  const enqueueCommand = buildFinalApprovalExecutionEnqueueCommand(command);

  // 3. Queue Enqueue Port 호출
  const enqueueResult = await enqueueFinalApprovalExecutionJob(enqueueCommand, queuePort);

  // 4. 응답 조립 및 반환 (plain object 구조 유지)
  if (enqueueResult.success) {
    const successResponse: FinalApprovalExecutionApiQueueEnqueueSuccessResponse = {
      success: true,
      statusCode: 202,
      message: 'Execution request has been accepted and enqueued.',
      jobName: enqueueResult.jobName,
      jobId: enqueueResult.jobId,
      idempotencyKey: enqueueCommand.idempotencyKey,
      mode: enqueueCommand.mode,
    };

    if (enqueueResult.enqueuedAt) {
      successResponse.enqueuedAt = enqueueResult.enqueuedAt;
    } else {
      successResponse.acceptedAt = new Date().toISOString();
    }
    
    return successResponse;
  } else {
    // 큐 적재 실패 시의 에러 응답
    // DB 변경, Naver API 호출, 상태 변화 등은 이 계층에서 절대 일어나지 않음
    return {
      success: false,
      statusCode: 500,
      message: 'Failed to enqueue execution job. Please try again later.',
      errorCode: 'QUEUE_ENQUEUE_FAILED',
      idempotencyKey: enqueueCommand.idempotencyKey
    };
  }
}
