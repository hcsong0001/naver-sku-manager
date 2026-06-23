import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  validateRestrictedDbDryRunSafety,
  REQUIRED_FIXTURE_ID,
  REQUIRED_QUEUE_NAME,
  REQUIRED_JOB_NAME,
  REQUIRED_REDIS_PORT,
  REQUIRED_DB_HOST_PORT,
} from './sku-keyword-final-approval-execution-restricted-db-dry-run-safety.service';

describe('RestrictedDbDryRunSafety', () => {
  const VALID_DB_URL = `postgresql://testuser:testpass@localhost:${REQUIRED_DB_HOST_PORT}/naver_sku_manager_test`;
  const VALID_REDIS_URL = `redis://localhost:${REQUIRED_REDIS_PORT}`;

  const BASE_VALID = {
    nodeEnv: 'test',
    databaseUrl: VALID_DB_URL,
    redisUrl: VALID_REDIS_URL,
    queueName: REQUIRED_QUEUE_NAME,
    jobName: REQUIRED_JOB_NAME,
    finalApprovalId: REQUIRED_FIXTURE_ID,
  };

  it('1. valid test environment passes', () => {
    const result = validateRestrictedDbDryRunSafety(BASE_VALID);
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.errors.length, 0);
  });

  it('2. NODE_ENV !== "test" fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, nodeEnv: 'production' });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('NODE_ENV')));
  });

  it('3. NODE_ENV undefined fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, nodeEnv: undefined });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('NODE_ENV')));
  });

  it('4. NODE_ENV "development" fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, nodeEnv: 'development' });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('NODE_ENV')));
  });

  it('5. DATABASE_URL missing fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, databaseUrl: undefined });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('DATABASE_URL is required')));
  });

  it('6. DATABASE_URL with production RDS host fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      databaseUrl: 'postgresql://user:pass@prod.rds.amazonaws.com:5432/mydb',
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('production host')));
  });

  it('7. DATABASE_URL with production db name "naver_sku_manager" fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      databaseUrl: `postgresql://user:pass@localhost:${REQUIRED_DB_HOST_PORT}/naver_sku_manager`,
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('production database name')));
  });

  it('8. DATABASE_URL with "production" in db name fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      databaseUrl: `postgresql://user:pass@localhost:${REQUIRED_DB_HOST_PORT}/production_db`,
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('production database name')));
  });

  it('9. DATABASE_URL with wrong port fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      databaseUrl: 'postgresql://user:pass@localhost:5432/naver_sku_manager_test',
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('port') && e.includes(REQUIRED_DB_HOST_PORT)));
  });

  it('10. REDIS_URL with wrong port fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, redisUrl: 'redis://localhost:6379' });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes(REQUIRED_REDIS_PORT)));
  });

  it('11. REDIS_URL with non-localhost host fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      redisUrl: `redis://redis.example.com:${REQUIRED_REDIS_PORT}`,
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('localhost')));
  });

  it('12. queue name mismatch fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, queueName: 'wrong-queue' });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('FINAL_APPROVAL_EXECUTION_QUEUE_NAME')));
  });

  it('13. job name mismatch fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, jobName: 'wrong-job' });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('jobName')));
  });

  it('14. fixture ID with TODO placeholder fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      finalApprovalId: 'TODO_RESTRICTED_FIXTURE_ID',
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('placeholder')));
  });

  it('15. unknown fixture ID fails', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      finalApprovalId: 'unknown-approval-id-xyz',
    });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('not an allowed fixture ID')));
  });

  it('16. empty fixture ID fails', () => {
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, finalApprovalId: '' });
    assert.strictEqual(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('placeholder or empty value')));
  });

  it('17. 127.0.0.1 DATABASE_URL passes', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      databaseUrl: `postgresql://user:pass@127.0.0.1:${REQUIRED_DB_HOST_PORT}/naver_sku_manager_test`,
    });
    assert.strictEqual(result.ok, true);
  });

  it('18. 127.0.0.1 REDIS_URL passes', () => {
    const result = validateRestrictedDbDryRunSafety({
      ...BASE_VALID,
      redisUrl: `redis://127.0.0.1:${REQUIRED_REDIS_PORT}`,
    });
    assert.strictEqual(result.ok, true);
  });

  it('19. redisUrl undefined skips Redis check', () => {
    const { redisUrl: _r, ...withoutRedis } = BASE_VALID;
    const result = validateRestrictedDbDryRunSafety(withoutRedis);
    assert.strictEqual(result.ok, true);
  });

  it('20. DATABASE_URL secret values are not returned in result', () => {
    const secretUrl = `postgresql://secret-user:secret-pass@localhost:${REQUIRED_DB_HOST_PORT}/naver_sku_manager_test`;
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, databaseUrl: secretUrl });
    const jsonStr = JSON.stringify(result);
    assert.ok(!jsonStr.includes('secret-user'));
    assert.ok(!jsonStr.includes('secret-pass'));
  });

  it('21. REDIS_URL secret values are not returned in result', () => {
    const secretUrl = `redis://:secret-redis-pass@localhost:6379`;
    const result = validateRestrictedDbDryRunSafety({ ...BASE_VALID, redisUrl: secretUrl });
    const jsonStr = JSON.stringify(result);
    assert.ok(!jsonStr.includes('secret-redis-pass'));
  });

  it('22. result is a plain object (JSON-serializable)', () => {
    const result = validateRestrictedDbDryRunSafety(BASE_VALID);
    assert.doesNotThrow(() => JSON.stringify(result));
    assert.strictEqual(Object.getPrototypeOf(result), Object.prototype);
  });

  it('23. input object is not mutated', () => {
    const input = { ...BASE_VALID };
    const snapshot = JSON.parse(JSON.stringify(input));
    validateRestrictedDbDryRunSafety(input);
    assert.deepStrictEqual(input, snapshot);
  });

  it('24. dbHostMasked present in result when DB URL is valid', () => {
    const result = validateRestrictedDbDryRunSafety(BASE_VALID);
    assert.ok(result.dbHostMasked);
    assert.ok(!result.dbHostMasked.includes('secret'));
    assert.ok(!result.dbHostMasked.includes('pass'));
  });
});
