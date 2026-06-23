export interface RestrictedDbDryRunSafetyInput {
  nodeEnv: string | undefined;
  databaseUrl: string | undefined;
  redisUrl?: string | undefined;
  queueName?: string | undefined;
  jobName?: string | undefined;
  finalApprovalId?: string | undefined;
}

export interface RestrictedDbDryRunSafetyResult {
  ok: boolean;
  errors: string[];
  dbHostMasked?: string;
  redisPortValid?: boolean;
}

export const REQUIRED_FIXTURE_ID = 'test-db-revalidation-final-approval-001';
export const REQUIRED_QUEUE_NAME = 'final-approval-execution';
export const REQUIRED_JOB_NAME = 'sku-keyword-final-approval-execution';
export const REQUIRED_REDIS_PORT = '56379';
export const REQUIRED_DB_HOST_PORT = '55432';

const ALLOWED_FIXTURE_IDS = new Set([REQUIRED_FIXTURE_ID]);
const ALLOWED_REDIS_HOSTS = new Set(['localhost', '127.0.0.1']);

const PRODUCTION_DB_NAME_PATTERNS: RegExp[] = [
  /^naver_sku_manager$/i,
  /production/i,
  /\bprod\b/i,
  /operating/i,
];

const PRODUCTION_HOST_PATTERNS: RegExp[] = [
  /\.rds\.amazonaws\.com$/i,
  /\.neon\.tech$/i,
  /supabase/i,
  /\.railway\.app$/i,
  /\.fly\.dev$/i,
  /\.heroku/i,
  /\.planetscale\.com$/i,
];

export function validateRestrictedDbDryRunSafety(
  input: RestrictedDbDryRunSafetyInput
): RestrictedDbDryRunSafetyResult {
  const errors: string[] = [];

  // 1. NODE_ENV must be "test"
  if (input.nodeEnv !== 'test') {
    errors.push(
      `NODE_ENV must be "test", got: "${input.nodeEnv ?? 'undefined'}"`
    );
  }

  // 2. DATABASE_URL must be provided
  if (!input.databaseUrl) {
    errors.push('DATABASE_URL is required');
    return { ok: false, errors };
  }

  // 3. DATABASE_URL must parse as valid URL
  let dbUrl: URL;
  try {
    dbUrl = new URL(input.databaseUrl);
  } catch {
    errors.push('DATABASE_URL is not a valid URL (parse failed)');
    return { ok: false, errors };
  }

  const dbHost = dbUrl.hostname;
  const dbPort = dbUrl.port || '5432';
  const dbPath = dbUrl.pathname.replace(/^\//, '');
  const dbUser = dbUrl.username;

  // 4. DATABASE_URL host must be localhost or 127.0.0.1
  const isLocalHost = dbHost === 'localhost' || dbHost === '127.0.0.1';
  if (!isLocalHost) {
    const isProductionHost = PRODUCTION_HOST_PATTERNS.some(p => p.test(dbHost));
    if (isProductionHost) {
      errors.push('DATABASE_URL points to a suspected production host [masked]');
    } else {
      errors.push('DATABASE_URL host must be localhost or 127.0.0.1 [masked-host]');
    }
  }

  // 5. DATABASE_URL port must be the test DB port
  if (isLocalHost && dbPort !== REQUIRED_DB_HOST_PORT) {
    errors.push(
      `DATABASE_URL port must be ${REQUIRED_DB_HOST_PORT} (test DB port), got: ${dbPort}`
    );
  }

  // 6. DATABASE_URL database name must not match production patterns
  for (const pattern of PRODUCTION_DB_NAME_PATTERNS) {
    if (pattern.test(dbPath) || (dbUser && pattern.test(dbUser))) {
      errors.push(
        'DATABASE_URL contains a suspected production database name or user pattern'
      );
      break;
    }
  }

  const dbHostMasked = isLocalHost
    ? `${dbHost}:${dbPort}`
    : '[non-local-host]';

  // 7. REDIS_URL check (only when provided by caller)
  let redisPortValid: boolean | undefined;
  if (input.redisUrl !== undefined) {
    if (!input.redisUrl) {
      errors.push('REDIS_URL is required for this script');
    } else {
      let redisUrl: URL;
      try {
        redisUrl = new URL(input.redisUrl);
      } catch {
        errors.push('REDIS_URL is not a valid URL (parse failed)');
        return { ok: false, errors, dbHostMasked };
      }

      const redisHost = redisUrl.hostname;
      const redisPort = redisUrl.port;

      if (!ALLOWED_REDIS_HOSTS.has(redisHost)) {
        errors.push('REDIS_URL host must be localhost or 127.0.0.1 [masked]');
      }
      if (redisPort !== REQUIRED_REDIS_PORT) {
        errors.push(
          `REDIS_URL port must be ${REQUIRED_REDIS_PORT} (test Redis port), got: ${redisPort || 'default'}`
        );
      }
      redisPortValid =
        ALLOWED_REDIS_HOSTS.has(redisHost) && redisPort === REQUIRED_REDIS_PORT;
    }
  }

  // 8. Queue name check
  if (input.queueName !== undefined && input.queueName !== REQUIRED_QUEUE_NAME) {
    errors.push(
      `FINAL_APPROVAL_EXECUTION_QUEUE_NAME must be "${REQUIRED_QUEUE_NAME}", got: "${input.queueName}"`
    );
  }

  // 9. Job name check
  if (input.jobName !== undefined && input.jobName !== REQUIRED_JOB_NAME) {
    errors.push(
      `jobName must be "${REQUIRED_JOB_NAME}", got: "${input.jobName}"`
    );
  }

  // 10. Fixture ID check — reject placeholders and unknown IDs
  if (input.finalApprovalId !== undefined) {
    if (
      input.finalApprovalId.includes('TODO') ||
      input.finalApprovalId.includes('PLACEHOLDER') ||
      input.finalApprovalId.trim() === ''
    ) {
      errors.push(
        'finalApprovalId contains a placeholder or empty value — replace before running'
      );
    } else if (!ALLOWED_FIXTURE_IDS.has(input.finalApprovalId)) {
      errors.push(
        `finalApprovalId "${input.finalApprovalId}" is not an allowed fixture ID`
      );
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    dbHostMasked,
    redisPortValid,
  };
}
