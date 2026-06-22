import { createFinalApprovalExecutionWorkerRuntime } from '../src/services/sku-keyword-final-approval-execution-worker-runtime.service';
import type { FinalApprovalExecutionWorkerStartupEnv } from '../src/types/sku-keyword-final-approval-execution-worker-startup-config.types';

import { createFinalApprovalExecutionWorkerProcessor } from '../src/services/sku-keyword-final-approval-execution-worker-processor.service';

// Safe Logger implementation
const logger = {
  info: (msg: string) => {
    // Redact sensitive URLs
    const safeMsg = msg
      .replace(/redis:\/\/[^@\s]+@[^\s]+/g, 'redis://***')
      .replace(/postgres(ql)?:\/\/[^@\s]+@[^\s]+/g, 'postgres://***');
    console.log(`[INFO] ${safeMsg}`);
  },
  error: (msg: string, err?: unknown) => {
    const safeMsg = msg
      .replace(/redis:\/\/[^@\s]+@[^\s]+/g, 'redis://***')
      .replace(/postgres(ql)?:\/\/[^@\s]+@[^\s]+/g, 'postgres://***');
    
    // Do not dump full error stack
    const errorMessage = err instanceof Error ? err.message : String(err);
    const safeError = errorMessage
      .replace(/redis:\/\/[^@\s]+@[^\s]+/g, 'redis://***')
      .replace(/postgres(ql)?:\/\/[^@\s]+@[^\s]+/g, 'postgres://***');
      
    console.error(`[ERROR] ${safeMsg}`, safeError !== 'undefined' ? safeError : '');
  }
};

async function bootstrap() {
  logger.info('Starting FinalApproval Execution Worker Entrypoint...');

  const startupEnv: FinalApprovalExecutionWorkerStartupEnv = {
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_FINAL_APPROVAL_EXECUTION_WORKER: process.env.ENABLE_FINAL_APPROVAL_EXECUTION_WORKER,
    FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER: process.env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER,
    FINAL_APPROVAL_EXECUTION_QUEUE_NAME: process.env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME,
    REDIS_URL: process.env.REDIS_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  const processor = createFinalApprovalExecutionWorkerProcessor({
    revalidationRepository: {
      findSnapshotForWorkerJobRevalidation: async () => {
        logger.info('Mock Revalidation Repository called in entrypoint');
        return null; 
      }
    },
    transitionApplyAdapter: {
      transaction: async (fn: any) => {
        logger.info('Mock Transition Apply Transaction called in entrypoint');
        return fn({
          updateBatchJobStatus: async () => ({ updated: true }),
          updateBatchJobItemStatus: async () => ({ updated: true })
        });
      }
    }
  });

  const runtime = await createFinalApprovalExecutionWorkerRuntime({
    env: startupEnv,
    processor,
    logger
  });

  if (!runtime.started) {
    logger.info('Worker did not start. See configuration or errors.');
    if (runtime.errors && runtime.errors.length > 0) {
      runtime.errors.forEach(err => logger.error(`Init Error: ${err.code} - ${err.message}`));
    }
    process.exit(0);
  }

  logger.info(`Worker started successfully. Listening on queue: ${runtime.queueName || 'default'}`);

  let isShuttingDown = false;

  const shutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    logger.info(`Received ${signal}. Shutting down worker gracefully...`);
    
    try {
      await runtime.close();
      logger.info('Worker closed successfully.');
      process.exit(0);
    } catch (err) {
      logger.error('Error during worker shutdown', err);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch(err => {
  logger.error('Fatal error in worker bootstrap', err);
  process.exit(1);
});
