import { createFinalApprovalExecutionWorkerRuntime } from '../src/services/sku-keyword-final-approval-execution-worker-runtime.service';
import type { FinalApprovalExecutionWorkerStartupEnv } from '../src/types/sku-keyword-final-approval-execution-worker-startup-config.types';
import { createFinalApprovalExecutionWorkerProcessor } from '../src/services/sku-keyword-final-approval-execution-worker-processor.service';
import { createWorkerRevalidationRepository } from '../src/services/sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service';
import type { RevalidationPrismaClientPort } from '../src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service';
// Imported for restricted-db mode only — does NOT create a PrismaClient on import.
import { createSafePrismaClientForTestDb } from './lib/create-safe-prisma-client-for-test-db';

// Safe Logger: redacts any URL that slips into a log message.
const logger = {
  info: (msg: string) => {
    const safeMsg = msg
      .replace(/redis:\/\/[^@\s]+@[^\s]+/g, 'redis://***')
      .replace(/postgres(ql)?:\/\/[^@\s]+@[^\s]+/g, 'postgres://***');
    console.log(`[INFO] ${safeMsg}`);
  },
  error: (msg: string, err?: unknown) => {
    const safeMsg = msg
      .replace(/redis:\/\/[^@\s]+@[^\s]+/g, 'redis://***')
      .replace(/postgres(ql)?:\/\/[^@\s]+@[^\s]+/g, 'postgres://***');
    const errorMessage = err instanceof Error ? err.message : String(err ?? '');
    const safeError = errorMessage
      .replace(/redis:\/\/[^@\s]+@[^\s]+/g, 'redis://***')
      .replace(/postgres(ql)?:\/\/[^@\s]+@[^\s]+/g, 'postgres://***');
    console.error(`[ERROR] ${safeMsg}`, safeError !== '' ? safeError : '');
  }
};

async function bootstrap() {
  logger.info('Starting FinalApproval Execution Worker Entrypoint...');

  const adapterModeEnv = process.env.FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER;
  logger.info(`Revalidation adapter mode: ${adapterModeEnv ?? '(default/mock)'}`);

  // ── Select revalidation repository ─────────────────────────────────────────
  // PrismaClient is created ONLY when restricted-db mode is requested.
  // Static import of createSafePrismaClientForTestDb has no side effects
  // (no PrismaClient is instantiated until the function is explicitly called).
  let prismaClient: RevalidationPrismaClientPort | undefined;
  if (adapterModeEnv === 'restricted-db') {
    logger.info('Restricted DB mode: creating safe PrismaClient for revalidation adapter');
    try {
      // createSafePrismaClientForTestDb() validates DATABASE_URL host/port/dbname.
      // Type assertion: PrismaClient is structurally compatible at runtime.
      prismaClient = createSafePrismaClientForTestDb() as unknown as RevalidationPrismaClientPort;
    } catch (err) {
      const safeMsg = (err instanceof Error ? err.message : String(err))
        .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]');
      logger.error(`Restricted DB mode: PrismaClient creation failed — ${safeMsg}`);
      process.exit(1);
    }
  }

  let revalidationRepository;
  try {
    revalidationRepository = createWorkerRevalidationRepository({
      adapterModeEnvValue: adapterModeEnv,
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
      prismaClient,
    });
  } catch (err) {
    const safeMsg = (err instanceof Error ? err.message : String(err))
      .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]')
      .replace(/redis:\/\/[^\s]*/gi, '[REDACTED]');
    logger.error(`Failed to initialize revalidation repository: ${safeMsg}`);
    process.exit(1);
  }

  // ── Build processor ─────────────────────────────────────────────────────────
  // Transition Apply Adapter remains as safe mock.
  // Real DB write wiring is deferred to the actual Dry Run execution step.
  const processor = createFinalApprovalExecutionWorkerProcessor({
    revalidationRepository,
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
