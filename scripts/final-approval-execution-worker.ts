import { createFinalApprovalExecutionWorkerRuntime } from '../src/services/sku-keyword-final-approval-execution-worker-runtime.service';
import type { FinalApprovalExecutionWorkerStartupEnv } from '../src/types/sku-keyword-final-approval-execution-worker-startup-config.types';
import { createFinalApprovalExecutionWorkerProcessor } from '../src/services/sku-keyword-final-approval-execution-worker-processor.service';
import { createWorkerRevalidationRepository } from '../src/services/sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service';
import { createWorkerTransitionApplyAdapter } from '../src/services/sku-keyword-final-approval-execution-worker-transition-apply-adapter-factory.service';
import { createWorkerResultRecordingAdapter } from '../src/services/sku-keyword-final-approval-execution-result-recording-adapter-factory.service';
import type { RevalidationPrismaClientPort } from '../src/services/sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service';
import type { ResultRecordingPrismaClientPort } from '../src/services/sku-keyword-final-approval-execution-result-recording-prisma-adapter.service';
import type { PrismaLikeClient } from '../src/types/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.types';
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

  const revalidationAdapterModeEnv = process.env.FINAL_APPROVAL_EXECUTION_REVALIDATION_ADAPTER;
  const transitionApplyAdapterModeEnv = process.env.FINAL_APPROVAL_EXECUTION_TRANSITION_APPLY_ADAPTER;
  const resultRecordingAdapterModeEnv = process.env.FINAL_APPROVAL_EXECUTION_RESULT_RECORDING_ADAPTER;
  logger.info(`Revalidation adapter mode: ${revalidationAdapterModeEnv ?? '(default/mock)'}`);
  logger.info(`Transition apply adapter mode: ${transitionApplyAdapterModeEnv ?? '(default/mock)'}`);
  logger.info(`Result recording adapter mode: ${resultRecordingAdapterModeEnv ?? '(default/no-op)'}`);

  // ── Create shared PrismaClient (test DB only) ───────────────────────────────
  // ONE PrismaClient instance is shared between all three adapters when restricted-db
  // mode is requested by any adapter. Creating separate clients wastes connection
  // pool resources pointing at the same test DB.
  // PrismaClient is created ONLY when at least one restricted-db mode is active.
  const needsRestrictedDb =
    revalidationAdapterModeEnv === 'restricted-db' ||
    transitionApplyAdapterModeEnv === 'restricted-db' ||
    resultRecordingAdapterModeEnv === 'restricted-db';

  let rawPrismaClient: unknown;
  if (needsRestrictedDb) {
    logger.info('Restricted DB mode: creating safe PrismaClient for test DB');
    try {
      // createSafePrismaClientForTestDb() validates DATABASE_URL host/port/dbname.
      rawPrismaClient = createSafePrismaClientForTestDb();
    } catch (err) {
      const safeMsg = (err instanceof Error ? err.message : String(err))
        .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]');
      logger.error(`Restricted DB mode: PrismaClient creation failed — ${safeMsg}`);
      process.exit(1);
    }
  }

  // Cast the shared PrismaClient to each adapter's structural interface.
  // All three interfaces are structurally satisfied by the generated PrismaClient.
  const revalidationPrismaClient = rawPrismaClient as RevalidationPrismaClientPort | undefined;
  const transitionApplyPrismaClient = rawPrismaClient as PrismaLikeClient | undefined;
  const resultRecordingPrismaClient = rawPrismaClient as ResultRecordingPrismaClientPort | undefined;

  // ── Select revalidation repository ─────────────────────────────────────────
  let revalidationRepository;
  try {
    revalidationRepository = createWorkerRevalidationRepository({
      adapterModeEnvValue: revalidationAdapterModeEnv,
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
      prismaClient: revalidationPrismaClient,
    });
  } catch (err) {
    const safeMsg = (err instanceof Error ? err.message : String(err))
      .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]')
      .replace(/redis:\/\/[^\s]*/gi, '[REDACTED]');
    logger.error(`Failed to initialize revalidation repository: ${safeMsg}`);
    process.exit(1);
  }

  // ── Select transition apply adapter ─────────────────────────────────────────
  let transitionApplyAdapter;
  try {
    transitionApplyAdapter = createWorkerTransitionApplyAdapter({
      adapterModeEnvValue: transitionApplyAdapterModeEnv,
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
      prismaClient: transitionApplyPrismaClient,
    });
  } catch (err) {
    const safeMsg = (err instanceof Error ? err.message : String(err))
      .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]')
      .replace(/redis:\/\/[^\s]*/gi, '[REDACTED]');
    logger.error(`Failed to initialize transition apply adapter: ${safeMsg}`);
    process.exit(1);
  }

  // ── Select result recording adapter ────────────────────────────────────────
  let resultRecordingAdapter;
  try {
    resultRecordingAdapter = createWorkerResultRecordingAdapter({
      adapterModeEnvValue: resultRecordingAdapterModeEnv,
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
      prismaClient: resultRecordingPrismaClient,
    });
  } catch (err) {
    const safeMsg = (err instanceof Error ? err.message : String(err))
      .replace(/postgresql?:\/\/[^\s]*/gi, '[REDACTED]')
      .replace(/redis:\/\/[^\s]*/gi, '[REDACTED]');
    logger.error(`Failed to initialize result recording adapter: ${safeMsg}`);
    process.exit(1);
  }

  // ── Build processor ─────────────────────────────────────────────────────────
  const processor = createFinalApprovalExecutionWorkerProcessor({
    revalidationRepository,
    transitionApplyAdapter,
    resultRecordingAdapter,
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
