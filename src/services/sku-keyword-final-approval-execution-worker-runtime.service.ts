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
        const dataKeys = job.data ? Object.keys(job.data).join(', ') : 'none';
        deps.logger?.info(`[Worker] Received Job - id: ${job.id}, name: ${job.name}, queue: ${queueName}`);
        deps.logger?.info(`[Worker] Payload Fields: ${dataKeys}`);
        deps.logger?.info(`[Worker] mode: ${job.data?.mode}, source: ${job.data?.source}, finalApprovalId: ${job.data?.finalApprovalId}`);

        const plainJob = {
          id: job.id,
          name: job.name,
          data: job.data
        };
        try {
          const processorResult: any = await deps.processor(plainJob);
          deps.logger?.info(`[Worker] Processor Finished - id: ${job.id}, success: ${processorResult.success}, code: ${processorResult.code || 'N/A'}`);
          if (!processorResult.success) {
            // Throw error to trigger failed event in BullMQ
            throw new Error(`Processor rejected: ${processorResult.code} - ${processorResult.message}`);
          }
          return processorResult;
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          deps.logger?.error(`[Worker] Processor Error - id: ${job.id}, err: ${errMsg}`);
          throw error;
        }
      },
      // @ts-expect-error ioredis version mismatch between bullmq and project
      { connection }
    );

    worker.on('completed', (job) => {
      deps.logger?.info(`[Worker Event] Job completed - id: ${job?.id}, name: ${job?.name}`);
    });
    worker.on('failed', (job, err) => {
      deps.logger?.error(`[Worker Event] Job failed - id: ${job?.id}, name: ${job?.name}, err: ${err.message}`);
    });
    worker.on('error', (err) => {
      deps.logger?.error(`[Worker Event] Queue Error - err: ${err.message}`);
    });
    worker.on('stalled', (jobId) => {
      deps.logger?.error(`[Worker Event] Job stalled - id: ${jobId}`);
    });

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
