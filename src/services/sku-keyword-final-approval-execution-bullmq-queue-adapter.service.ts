import { Queue } from 'bullmq';
import type {
  FinalApprovalExecutionQueuePort,
  FinalApprovalExecutionQueueJobName,
  FinalApprovalExecutionQueuePayload,
  FinalApprovalExecutionQueueEnqueueResult
} from '../types/sku-keyword-final-approval-execution-queue.types';

export interface FinalApprovalExecutionBullmqQueueAdapter extends FinalApprovalExecutionQueuePort {
  close: () => Promise<void>;
  getQueue: () => Queue<FinalApprovalExecutionQueuePayload, unknown, FinalApprovalExecutionQueueJobName>;
}

export function createFinalApprovalExecutionBullmqQueueAdapter(
  redisUrl: string
): FinalApprovalExecutionBullmqQueueAdapter {
  const queueName = 'final-approval-execution';

  const parsedUrl = new URL(redisUrl);
  const connectionOptions = {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port || '6379', 10),
    username: parsedUrl.username || undefined,
    password: parsedUrl.password || undefined,
    db: parsedUrl.pathname ? parseInt(parsedUrl.pathname.replace('/', ''), 10) || 0 : 0,
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
    connectTimeout: 5000,
    commandTimeout: 5000,
    retryStrategy: (times: number) => {
      // Don't retry indefinitely to prevent hanging API
      if (times > 3) {
        return null;
      }
      return Math.min(times * 100, 3000);
    }
  };

  const queue = new Queue<FinalApprovalExecutionQueuePayload, unknown, FinalApprovalExecutionQueueJobName>(queueName, {
    connection: connectionOptions,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: false, // Keep failed jobs for inspection or retry
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    }
  });

  queue.on('error', () => {
    // Ignore, handled by enqueue catch block
  });

  return {
    async enqueue(
      jobName: FinalApprovalExecutionQueueJobName,
      payload: FinalApprovalExecutionQueuePayload,
      options?: { jobId?: string }
    ): Promise<FinalApprovalExecutionQueueEnqueueResult> {
      const jobId = options?.jobId || payload.idempotencyKey;

      try {
        // Ensure payload only has minimal fields required to prevent leaking sensitive or excessive data
        const safePayload: FinalApprovalExecutionQueuePayload = {
          finalApprovalId: payload.finalApprovalId,
          actorId: payload.actorId,
          idempotencyKey: payload.idempotencyKey,
          requestedAt: payload.requestedAt,
          source: payload.source,
          mode: payload.mode
        };

        const job = await queue.add(jobName, safePayload, {
          jobId
        });

        // Ensure returned object is plain
        return JSON.parse(JSON.stringify({
          success: true,
          jobName,
          jobId: job.id || jobId,
          status: 'ENQUEUED',
          enqueuedAt: new Date().toISOString(),
          payloadSummary: {
            finalApprovalId: safePayload.finalApprovalId,
            mode: safePayload.mode
          }
        }));
      } catch (error) {
        let msg = error instanceof Error ? error.message : 'Unknown Queue Error';
        
        // Sanitize error message to prevent sensitive info leakage
        msg = msg.replace(/redis:\/\/[^\s]+/gi, '[REDACTED_REDIS_URL]');
        msg = msg.replace(/postgres:\/\/[^\s]+/gi, '[REDACTED_DATABASE_URL]');
        msg = msg.replace(/secret|token|password/gi, '***');

        return JSON.parse(JSON.stringify({
          success: false,
          jobName,
          jobId,
          status: 'FAILED',
          error: msg
        }));
      }
    },

    async close() {
      try {
        await queue.disconnect();
        await queue.close();
      } catch {
        // ignore
      }
    },

    getQueue() {
      return queue;
    }
  };
}
