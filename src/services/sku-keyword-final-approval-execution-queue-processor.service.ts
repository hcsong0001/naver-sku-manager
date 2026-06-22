import type {
  FinalApprovalExecutionQueueProcessorInputJob,
  FinalApprovalExecutionQueueProcessorDependencies,
  FinalApprovalExecutionQueueProcessorResult
} from '../types/sku-keyword-final-approval-execution-queue-processor.types';
import { runFinalApprovalExecutionWorkerJobOrchestration } from './sku-keyword-final-approval-execution-worker-job-orchestration.service';

export async function runFinalApprovalExecutionQueueProcessor(
  job: FinalApprovalExecutionQueueProcessorInputJob,
  deps: FinalApprovalExecutionQueueProcessorDependencies
): Promise<FinalApprovalExecutionQueueProcessorResult> {
  if (job.name !== 'sku-keyword-final-approval-execution') {
    return {
      ok: false,
      readyForExecution: false,
      executionPerformed: false,
      reason: `Unknown job name: ${job.name}`,
      code: 'UNKNOWN_JOB_NAME'
    };
  }

  const orchestrationResult = await runFinalApprovalExecutionWorkerJobOrchestration(
    job.data,
    deps.revalidationRepository
  );

  if (!orchestrationResult.success) {
    return {
      ok: false,
      readyForExecution: false,
      executionPerformed: false,
      reason: orchestrationResult.message,
      code: orchestrationResult.errorCode
    };
  }

  return {
    ok: true,
    readyForExecution: true,
    executionPerformed: false,
    finalApprovalId: orchestrationResult.finalApprovalId,
    idempotencyKey: orchestrationResult.idempotencyKey,
    mode: orchestrationResult.mode,
    jobName: 'sku-keyword-final-approval-execution'
  };
}
