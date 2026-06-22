import { Worker, type Job } from 'bullmq';
import Redis from 'ioredis';
import { validateFinalApprovalExecutionWorkerStartupConfig } from './sku-keyword-final-approval-execution-worker-startup-config.service';
import type {
  FinalApprovalExecutionWorkerRuntimeDependencies,
  FinalApprovalExecutionWorkerRuntimeResult
} from '../types/sku-keyword-final-approval-execution-worker-runtime.types';

export async function createFinalApprovalExecutionWorkerRuntime(
  deps: FinalApprovalExecutionWorkerRuntimeDependencies
): Promise<FinalApprovalExecutionWorkerRuntimeResult> {
  const config = validateFinalApprovalExecutionWorkerStartupConfig(deps.env);

  const result: FinalApprovalExecutionWorkerRuntimeResult = {
    ok: config.ok,
    started: false,
    queueName: config.queueName,
    close: async () => {}, // no-op
    errors: config.errors,
    warnings: config.warnings
  };

  if (!config.canStartWorker) {
    return result;
  }

  try {
    const redisUrl = deps.env.REDIS_URL as string;
    const connection = new Redis(redisUrl, {
      maxRetriesPerRequest: null
    });

    const queueName = config.queueName || 'final-approval-execution';

    const worker = new Worker(
      queueName,
      async (job: Job) => {
        const plainJob = {
          id: job.id,
          name: job.name,
          data: job.data
        };
        const processorResult = await deps.processor(plainJob);
        return processorResult;
      },
      // @ts-expect-error ioredis version mismatch between bullmq and project
      { connection }
    );

    result.started = true;
    result.close = async () => {
      await worker.close();
      connection.disconnect();
    };

    return result;
  } catch {
    result.ok = false;
    result.errors.push({
      code: 'WORKER_INITIALIZATION_ERROR',
      message: 'Failed to initialize worker'
    });
    return result;
  }
}
