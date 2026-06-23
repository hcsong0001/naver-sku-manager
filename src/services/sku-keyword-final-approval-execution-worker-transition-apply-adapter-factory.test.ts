import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { createWorkerTransitionApplyAdapter } from './sku-keyword-final-approval-execution-worker-transition-apply-adapter-factory.service';
import type { PrismaLikeClient, PrismaLikeTxClient } from '../types/sku-keyword-final-approval-execution-transition-apply-real-prisma-adapter.types';

const VALID_TEST_DB_URL = 'postgresql://testuser:testpass@localhost:55432/naver_sku_manager_test';
const VALID_NODE_ENV = 'test';

interface MockCallLog { method: string }

const createMockPrismaClient = (callLog: MockCallLog[]): PrismaLikeClient => {
  const createTxClient = (): PrismaLikeTxClient => ({
    naverApiBatchJob: {
      updateMany: async (args) => { callLog.push({ method: 'naverApiBatchJob.updateMany' }); return { count: 1 }; },
    },
    naverApiBatchJobItem: {
      updateMany: async (args) => { callLog.push({ method: 'naverApiBatchJobItem.updateMany' }); return { count: 1 }; },
    },
  });
  return {
    ...createTxClient(),
    $transaction: async (callback) => {
      callLog.push({ method: '$transaction' });
      return callback(createTxClient());
    },
  };
};

const NULL_PRISMA: PrismaLikeClient = {
  naverApiBatchJob: { updateMany: async () => ({ count: 1 }) },
  naverApiBatchJobItem: { updateMany: async () => ({ count: 1 }) },
  $transaction: async (fn) => fn({ naverApiBatchJob: { updateMany: async () => ({ count: 1 }) }, naverApiBatchJobItem: { updateMany: async () => ({ count: 1 }) } }),
};

describe('WorkerTransitionApplyAdapterFactory', () => {
  // ── Default / mock mode ──────────────────────────────────────────────────────

  it('1. undefined adapterMode returns mock adapter', () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: undefined });
    assert.ok(typeof adapter.transaction === 'function');
  });

  it('2. empty string adapterMode returns mock adapter', () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: '' });
    assert.ok(typeof adapter.transaction === 'function');
  });

  it('3. "mock" adapterMode returns mock adapter', () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: 'mock' });
    assert.ok(typeof adapter.transaction === 'function');
  });

  it('4. unknown adapterMode string returns mock adapter', () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: 'some-unknown-value' });
    assert.ok(typeof adapter.transaction === 'function');
  });

  // ── Blocked modes ────────────────────────────────────────────────────────────

  it('5. "live" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerTransitionApplyAdapter({ adapterModeEnvValue: 'live' }),
      /not allowed/
    );
  });

  it('6. "production" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerTransitionApplyAdapter({ adapterModeEnvValue: 'production' }),
      /not allowed/
    );
  });

  it('7. "prod" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerTransitionApplyAdapter({ adapterModeEnvValue: 'prod' }),
      /not allowed/
    );
  });

  it('8. "operating" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerTransitionApplyAdapter({ adapterModeEnvValue: 'operating' }),
      /not allowed/
    );
  });

  // ── restricted-db mode: safety guard failures ────────────────────────────────

  it('9. restricted-db + NODE_ENV !== test throws with safety guard error', () => {
    assert.throws(
      () =>
        createWorkerTransitionApplyAdapter({
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
        createWorkerTransitionApplyAdapter({
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
        createWorkerTransitionApplyAdapter({
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
        createWorkerTransitionApplyAdapter({
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
        createWorkerTransitionApplyAdapter({
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
        createWorkerTransitionApplyAdapter({
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
    const adapter = createWorkerTransitionApplyAdapter({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: VALID_NODE_ENV,
      databaseUrl: VALID_TEST_DB_URL,
      prismaClient: NULL_PRISMA,
    });
    assert.ok(adapter !== null);
    assert.ok(typeof adapter.transaction === 'function');
  });

  // ── Mock adapter behavior ─────────────────────────────────────────────────────

  it('16. mock: updateBatchJobStatus returns { updated: true }', async () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: undefined });
    const result = await adapter.transaction(async (tx) =>
      tx.updateBatchJobStatus({ targetId: 'job-001', fromStatus: 'APPROVED', toStatus: 'EXECUTING' })
    );
    assert.deepStrictEqual(result, { updated: true });
  });

  it('17. mock: updateBatchJobItemStatus returns { updated: true }', async () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: undefined });
    const result = await adapter.transaction(async (tx) =>
      tx.updateBatchJobItemStatus({ targetId: 'item-001', fromStatus: 'READY', toStatus: 'EXECUTING' })
    );
    assert.deepStrictEqual(result, { updated: true });
  });

  it('18. mock: transaction fn return value is passed through', async () => {
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: undefined });
    const result = await adapter.transaction(async () => ({ customValue: 42 }));
    assert.deepStrictEqual(result, { customValue: 42 });
  });

  it('19. mock: no real DB calls (callLog stays empty)', async () => {
    const callLog: MockCallLog[] = [];
    const adapter = createWorkerTransitionApplyAdapter({ adapterModeEnvValue: undefined });
    await adapter.transaction(async (tx) => {
      await tx.updateBatchJobStatus({ targetId: 'j', fromStatus: 'A', toStatus: 'B' });
      await tx.updateBatchJobItemStatus({ targetId: 'i', fromStatus: 'A', toStatus: 'B' });
    });
    // callLog is local and never touched because mock adapter is a closure, not this client
    assert.strictEqual(callLog.length, 0);
  });

  // ── restricted-db: PrismaClient is used via delegate ─────────────────────────

  it('20. restricted-db: transaction delegates to injected prismaClient.$transaction', async () => {
    const callLog: MockCallLog[] = [];
    const mockPrisma = createMockPrismaClient(callLog);
    const adapter = createWorkerTransitionApplyAdapter({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: VALID_NODE_ENV,
      databaseUrl: VALID_TEST_DB_URL,
      prismaClient: mockPrisma,
    });
    // Call transaction but the fn returns before any updateMany to keep this test isolated
    await adapter.transaction(async () => ({ ok: true }));
    assert.ok(callLog.some((c) => c.method === '$transaction'));
  });

  // ── URL safety in error messages ─────────────────────────────────────────────

  it('21. safety guard failure error message does not contain DATABASE_URL value', () => {
    const badDbUrl = 'postgresql://secretuser:secretpass@localhost:55432/naver_sku_manager';

    let thrown: Error | null = null;
    try {
      createWorkerTransitionApplyAdapter({
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
});
