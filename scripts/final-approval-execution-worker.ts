import { createFinalApprovalExecutionWorkerRuntime } from '../src/services/sku-keyword-final-approval-execution-worker-runtime.service';
import type { FinalApprovalExecutionWorkerStartupEnv } from '../src/types/sku-keyword-final-approval-execution-worker-startup-config.types';

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

  const runtime = await createFinalApprovalExecutionWorkerRuntime({
    env: startupEnv,
    processor: async (job) => {
      // TODO: Inject actual Revalidation Repository, DB write logic, and external API logic here when approved.
      // Currently, it acts as a no-op safety wrapper passing through the job payload.
      logger.info(`Processing job ${job.id}`);
      return { readyForExecution: false, executionPerformed: false, reason: 'Entrypoint processor stub' };
    },
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
