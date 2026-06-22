import type {
  FinalApprovalExecutionWorkerStartupEnv,
  FinalApprovalExecutionWorkerStartupConfigResult
} from '../types/sku-keyword-final-approval-execution-worker-startup-config.types';

export function validateFinalApprovalExecutionWorkerStartupConfig(
  env: FinalApprovalExecutionWorkerStartupEnv
): FinalApprovalExecutionWorkerStartupConfigResult {
  const result: FinalApprovalExecutionWorkerStartupConfigResult = {
    ok: true,
    enabled: false,
    canStartWorker: false,
    queueName: null,
    adapter: null,
    errors: [],
    warnings: []
  };

  if (env.ENABLE_FINAL_APPROVAL_EXECUTION_WORKER !== 'true') {
    result.ok = true;
    result.enabled = false;
    result.canStartWorker = false;
    // Disabled is not an error
    return result;
  }

  result.enabled = true;
  result.canStartWorker = true; // Assume true until we find errors

  // 1. Adapter check
  if (env.FINAL_APPROVAL_EXECUTION_QUEUE_ADAPTER !== 'bullmq') {
    result.errors.push({
      code: 'WORKER_ADAPTER_NOT_BULLMQ',
      message: 'Worker adapter must be bullmq to start'
    });
    result.canStartWorker = false;
    result.ok = false;
  } else {
    result.adapter = 'bullmq';
  }

  // 2. REDIS_URL check
  if (!env.REDIS_URL || env.REDIS_URL.trim() === '') {
    result.errors.push({
      code: 'WORKER_ENABLED_BUT_REDIS_URL_MISSING',
      message: 'REDIS_URL is missing' // DO NOT output raw URL
    });
    result.canStartWorker = false;
    result.ok = false;
  } else {
    // production local check
    if (env.NODE_ENV === 'production' && (env.REDIS_URL.includes('localhost') || env.REDIS_URL.includes('127.0.0.1'))) {
      result.errors.push({
        code: 'PRODUCTION_LOCAL_REDIS_URL_NOT_ALLOWED',
        message: 'Local REDIS_URL is not allowed in production'
      });
      result.canStartWorker = false;
      result.ok = false;
    }
  }

  // 3. DATABASE_URL check
  if (!env.DATABASE_URL || env.DATABASE_URL.trim() === '') {
    result.errors.push({
      code: 'WORKER_ENABLED_BUT_DATABASE_URL_MISSING',
      message: 'DATABASE_URL is missing' // DO NOT output raw URL
    });
    result.canStartWorker = false;
    result.ok = false;
  } else {
    // production local check
    if (env.NODE_ENV === 'production' && (env.DATABASE_URL.includes('localhost') || env.DATABASE_URL.includes('127.0.0.1'))) {
      result.errors.push({
        code: 'PRODUCTION_LOCAL_DATABASE_URL_NOT_ALLOWED',
        message: 'Local DATABASE_URL is not allowed in production'
      });
      result.canStartWorker = false;
      result.ok = false;
    }
  }

  // 4. Queue name
  if (!env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME || env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME.trim() === '') {
    result.queueName = 'final-approval-execution';
  } else {
    result.queueName = env.FINAL_APPROVAL_EXECUTION_QUEUE_NAME.trim();
    if (result.queueName !== 'final-approval-execution') {
      result.warnings.push({
        code: 'INVALID_QUEUE_NAME',
        message: `Queue name is set to a non-default value: ${result.queueName}`
      });
    }
  }

  return result;
}
