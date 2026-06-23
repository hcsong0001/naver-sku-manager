import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { createWorkerRevalidationRepository } from './sku-keyword-final-approval-execution-worker-revalidation-repository-factory.service';
import type { RevalidationPrismaClientPort } from './sku-keyword-final-approval-execution-restricted-db-revalidation-prisma-adapter.service';

const VALID_TEST_DB_URL = 'postgresql://testuser:testpass@localhost:55432/naver_sku_manager_test';
const VALID_NODE_ENV = 'test';

const NULL_PRISMA: RevalidationPrismaClientPort = {
  naverApiBatchFinalApproval: {
    findUnique: async () => null,
  },
};

describe('WorkerRevalidationRepositoryFactory', () => {
  // ── Default / mock mode ──────────────────────────────────────────────────────

  it('1. undefined adapterMode returns mock (returns null)', async () => {
    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: undefined,
    });
    const result = await repo.findSnapshotForWorkerJobRevalidation('any-id', 'any-key');
    assert.strictEqual(result, null);
  });

  it('2. empty string adapterMode returns mock', async () => {
    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: '',
    });
    const result = await repo.findSnapshotForWorkerJobRevalidation('any-id', 'any-key');
    assert.strictEqual(result, null);
  });

  it('3. "mock" adapterMode returns mock', async () => {
    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: 'mock',
    });
    const result = await repo.findSnapshotForWorkerJobRevalidation('any-id', 'any-key');
    assert.strictEqual(result, null);
  });

  it('4. unknown adapterMode string returns mock', async () => {
    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: 'some-unknown-value',
    });
    const result = await repo.findSnapshotForWorkerJobRevalidation('any-id', 'any-key');
    assert.strictEqual(result, null);
  });

  // ── Blocked modes ────────────────────────────────────────────────────────────

  it('5. "live" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerRevalidationRepository({ adapterModeEnvValue: 'live' }),
      /not allowed/
    );
  });

  it('6. "production" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerRevalidationRepository({ adapterModeEnvValue: 'production' }),
      /not allowed/
    );
  });

  it('7. "prod" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerRevalidationRepository({ adapterModeEnvValue: 'prod' }),
      /not allowed/
    );
  });

  it('8. "operating" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerRevalidationRepository({ adapterModeEnvValue: 'operating' }),
      /not allowed/
    );
  });

  // ── restricted-db mode: safety guard failures ────────────────────────────────

  it('9. restricted-db + NODE_ENV !== test throws with safety guard error', () => {
    assert.throws(
      () =>
        createWorkerRevalidationRepository({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: 'production',
          databaseUrl: VALID_TEST_DB_URL,
          prismaClient: NULL_PRISMA,
        }),
      /safety guard failed/
    );
  });

  it('10. restricted-db + missing DATABASE_URL throws with safety guard error', () => {
    assert.throws(
      () =>
        createWorkerRevalidationRepository({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: undefined,
          prismaClient: NULL_PRISMA,
        }),
      /safety guard failed/
    );
  });

  it('11. restricted-db + production RDS host throws with safety guard error', () => {
    assert.throws(
      () =>
        createWorkerRevalidationRepository({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: 'postgresql://user:pass@prod.rds.amazonaws.com:55432/testdb',
          prismaClient: NULL_PRISMA,
        }),
      /safety guard failed/
    );
  });

  it('12. restricted-db + wrong DB port throws with safety guard error', () => {
    assert.throws(
      () =>
        createWorkerRevalidationRepository({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: 'postgresql://testuser:pass@localhost:5432/testdb',
          prismaClient: NULL_PRISMA,
        }),
      /safety guard failed/
    );
  });

  it('13. restricted-db + production db name pattern throws with safety guard error', () => {
    assert.throws(
      () =>
        createWorkerRevalidationRepository({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: 'postgresql://testuser:pass@localhost:55432/naver_sku_manager',
          prismaClient: NULL_PRISMA,
        }),
      /safety guard failed/
    );
  });

  // ── restricted-db mode: missing prismaClient ─────────────────────────────────

  it('14. restricted-db + safety pass + no prismaClient throws', () => {
    assert.throws(
      () =>
        createWorkerRevalidationRepository({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: VALID_TEST_DB_URL,
          prismaClient: undefined,
        }),
      /prismaClient/
    );
  });

  // ── restricted-db mode: success ──────────────────────────────────────────────

  it('15. restricted-db + safety pass + prismaClient returns adapter', () => {
    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: VALID_NODE_ENV,
      databaseUrl: VALID_TEST_DB_URL,
      prismaClient: NULL_PRISMA,
    });

    assert.ok(repo !== null);
    assert.ok(typeof repo.findSnapshotForWorkerJobRevalidation === 'function');
  });

  it('16. restricted-db adapter returns null when prisma returns null', async () => {
    const repo = createWorkerRevalidationRepository({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: VALID_NODE_ENV,
      databaseUrl: VALID_TEST_DB_URL,
      prismaClient: NULL_PRISMA,
    });

    const result = await repo.findSnapshotForWorkerJobRevalidation(
      'test-db-revalidation-final-approval-001',
      'idem-key'
    );
    assert.strictEqual(result, null);
  });

  // ── URL safety in error messages ─────────────────────────────────────────────

  it('17. safety guard failure error message does not contain DATABASE_URL value', () => {
    const badDbUrl = 'postgresql://secretuser:secretpass@localhost:55432/naver_sku_manager';

    let thrown: Error | null = null;
    try {
      createWorkerRevalidationRepository({
        adapterModeEnvValue: 'restricted-db',
        nodeEnv: VALID_NODE_ENV,
        databaseUrl: badDbUrl,
        prismaClient: NULL_PRISMA,
      });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }

    assert.ok(thrown !== null, 'should have thrown');
    const msg = thrown!.message;
    assert.ok(!msg.includes('secretpass'), 'error must not contain DB password');
    assert.ok(!msg.includes('secretuser'), 'error must not contain DB user');
    assert.ok(!msg.includes('postgresql://'), 'error must not contain full URL');
  });

  it('18. blocked mode error message does not contain sensitive details', () => {
    let thrown: Error | null = null;
    try {
      createWorkerRevalidationRepository({
        adapterModeEnvValue: 'live',
        databaseUrl: 'postgresql://user:pass@localhost:55432/testdb',
      });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }

    assert.ok(thrown !== null);
    const msg = thrown!.message;
    assert.ok(!msg.includes('pass@'), 'error must not contain DB URL');
    assert.ok(msg.includes('live') || msg.includes('not allowed'), 'error mentions mode');
  });
});
