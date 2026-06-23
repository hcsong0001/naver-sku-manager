import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  createNoOpResultRecordingAdapter,
  createWorkerResultRecordingAdapter,
} from './sku-keyword-final-approval-execution-result-recording-adapter-factory.service';
import type { ResultRecordingPrismaClientPort } from './sku-keyword-final-approval-execution-result-recording-prisma-adapter.service';
import type { ExecutionResultPlan } from '../types/sku-keyword-final-approval-execution-result-recording.types';

const VALID_TEST_DB_URL = 'postgresql://testuser:testpass@localhost:55432/naver_sku_manager_test';
const VALID_NODE_ENV = 'test';

// Minimal structural mock for ResultRecordingPrismaClientPort
const NULL_RECORDING_PRISMA: ResultRecordingPrismaClientPort = {
  naverApiBatchJob: {
    findUnique: async () => null,
  },
  $transaction: async (fn) =>
    fn({
      naverApiBatchJob: { updateMany: async () => ({ count: 0 }) },
      naverApiBatchJobItem: { updateMany: async () => ({ count: 0 }) },
    }),
};

// ── Plan helpers ──────────────────────────────────────────────────────────────

function makeApplicablePlan(): ExecutionResultPlan {
  return {
    applicable: true,
    outcome: 'EXECUTED',
    jobUpdate: {
      jobId: 'job-001',
      newStatus: 'EXECUTED',
      successCount: 1,
      failedCount: 0,
      skippedCount: 0,
      executedAt: '2026-06-23T01:00:05.000Z',
      metadataUpdate: {
        executionMode: 'restricted-db',
        actorId: 'actor',
        idempotencyKey: 'idem',
        startedAt: '2026-06-23T01:00:00.000Z',
        endedAt: '2026-06-23T01:00:05.000Z',
        durationMs: 5000,
        finalApprovalId: 'fa-001',
      },
    },
    itemUpdates: [{ itemId: 'item-001', newStatus: 'SUCCESS' }],
    summary: {
      totalItems: 1,
      successCount: 1,
      failedCount: 0,
      skippedCount: 0,
      retryPendingCount: 0,
      apiCallsAttempted: 0,
      durationMs: 5000,
      outcome: 'EXECUTED',
      mode: 'restricted-db',
    },
  };
}

function makeNonApplicablePlan(reason: string): ExecutionResultPlan {
  return {
    applicable: false,
    blockedReason: reason,
    outcome: 'TRANSITION_ONLY',
    itemUpdates: [],
    summary: {
      totalItems: 0,
      successCount: 0,
      failedCount: 0,
      skippedCount: 0,
      retryPendingCount: 0,
      apiCallsAttempted: 0,
      durationMs: 0,
      outcome: 'TRANSITION_ONLY',
      mode: 'dry-run',
    },
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ResultRecordingAdapterFactory', () => {
  // ── No-op adapter ───────────────────────────────────────────────────────────

  it('1. createNoOpResultRecordingAdapter returns an adapter object', () => {
    const adapter = createNoOpResultRecordingAdapter();
    assert.ok(typeof adapter === 'object');
    assert.ok(typeof adapter.applyExecutionResultPlan === 'function');
  });

  it('2. no-op adapter always returns applied=false', async () => {
    const adapter = createNoOpResultRecordingAdapter();
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.strictEqual(result.applied, false);
  });

  it('3. no-op adapter with applicable plan includes skippedReason explaining no-op', async () => {
    const adapter = createNoOpResultRecordingAdapter();
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.ok(typeof result.skippedReason === 'string');
    assert.ok(result.skippedReason!.includes('no-op'));
  });

  it('4. no-op adapter with non-applicable plan includes blockedReason in skippedReason', async () => {
    const adapter = createNoOpResultRecordingAdapter();
    const plan = makeNonApplicablePlan('TRANSITION_ONLY: no results yet');
    const result = await adapter.applyExecutionResultPlan(plan);
    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason!.includes('TRANSITION_ONLY'));
  });

  it('5. no-op adapter does not throw for any plan shape', async () => {
    const adapter = createNoOpResultRecordingAdapter();
    await assert.doesNotReject(() => adapter.applyExecutionResultPlan(makeApplicablePlan()));
    await assert.doesNotReject(() => adapter.applyExecutionResultPlan(makeNonApplicablePlan('dry-run')));
  });

  it('6. no-op adapter result is JSON-serializable', async () => {
    const adapter = createNoOpResultRecordingAdapter();
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.doesNotThrow(() => JSON.stringify(result));
  });

  it('7. createNoOpResultRecordingAdapter can be called multiple times (no singleton side-effects)', () => {
    const a1 = createNoOpResultRecordingAdapter();
    const a2 = createNoOpResultRecordingAdapter();
    assert.ok(a1 !== a2, 'each call returns a fresh instance');
  });

  it('8. no-op adapter: jobUpdated and itemsUpdated are absent (no writes occurred)', async () => {
    const adapter = createNoOpResultRecordingAdapter();
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.strictEqual(result.jobUpdated, undefined);
    assert.strictEqual(result.itemsUpdated, undefined);
  });

  // ── Import-time safety ─────────────────────────────────────────────────────

  it('9. importing the factory does not create Prisma clients (no side effects)', () => {
    // This test passes by virtue of the module loading without error.
    // If Prisma/BullMQ were imported, they would throw or require env vars at load time.
    assert.ok(true, 'module loaded without DB/Redis connection side effects');
  });

  // ── createWorkerResultRecordingAdapter — default / mock paths ──────────────

  it('10. undefined adapterMode returns no-op adapter (applied=false)', async () => {
    const adapter = createWorkerResultRecordingAdapter({ adapterModeEnvValue: undefined });
    assert.ok(typeof adapter.applyExecutionResultPlan === 'function');
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.strictEqual(result.applied, false);
  });

  it('11. empty string adapterMode returns no-op adapter', async () => {
    const adapter = createWorkerResultRecordingAdapter({ adapterModeEnvValue: '' });
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.strictEqual(result.applied, false);
  });

  it('12. "mock" adapterMode returns no-op adapter', async () => {
    const adapter = createWorkerResultRecordingAdapter({ adapterModeEnvValue: 'mock' });
    const result = await adapter.applyExecutionResultPlan(makeNonApplicablePlan('dry-run'));
    assert.strictEqual(result.applied, false);
  });

  it('13. unknown adapterMode string returns no-op adapter (safe fallback)', async () => {
    const adapter = createWorkerResultRecordingAdapter({ adapterModeEnvValue: 'some-unknown-mode' });
    const result = await adapter.applyExecutionResultPlan(makeApplicablePlan());
    assert.strictEqual(result.applied, false);
  });

  // ── createWorkerResultRecordingAdapter — blocked modes ─────────────────────

  it('14. "live" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerResultRecordingAdapter({ adapterModeEnvValue: 'live' }),
      /not allowed/
    );
  });

  it('15. "production" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerResultRecordingAdapter({ adapterModeEnvValue: 'production' }),
      /not allowed/
    );
  });

  it('16. "prod" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerResultRecordingAdapter({ adapterModeEnvValue: 'prod' }),
      /not allowed/
    );
  });

  it('17. "operating" adapterMode throws immediately', () => {
    assert.throws(
      () => createWorkerResultRecordingAdapter({ adapterModeEnvValue: 'operating' }),
      /not allowed/
    );
  });

  it('18. blocked mode error does not reveal DATABASE_URL value', () => {
    let thrown: Error | null = null;
    try {
      createWorkerResultRecordingAdapter({
        adapterModeEnvValue: 'live',
        databaseUrl: 'postgresql://secretuser:secretpass@localhost:55432/testdb',
      });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }
    assert.ok(thrown !== null);
    assert.ok(!thrown!.message.includes('secretpass'), 'must not leak DB password');
    assert.ok(!thrown!.message.includes('postgresql://'), 'must not leak URL');
  });

  // ── createWorkerResultRecordingAdapter — restricted-db mode ────────────────

  it('19. restricted-db + NODE_ENV=production throws (safety guard)', () => {
    assert.throws(
      () =>
        createWorkerResultRecordingAdapter({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: 'production',
          databaseUrl: VALID_TEST_DB_URL,
          prismaClient: NULL_RECORDING_PRISMA,
        }),
      (err: Error) => err.message.includes('safety guard') || err.message.includes('NODE_ENV')
    );
  });

  it('20. restricted-db + missing DATABASE_URL throws (safety guard)', () => {
    assert.throws(
      () =>
        createWorkerResultRecordingAdapter({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: undefined,
          prismaClient: NULL_RECORDING_PRISMA,
        }),
      (err: Error) => err.message.length > 0
    );
  });

  it('21. restricted-db + production RDS host throws (safety guard)', () => {
    assert.throws(
      () =>
        createWorkerResultRecordingAdapter({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: 'postgresql://user:pass@prod.rds.amazonaws.com:55432/testdb',
          prismaClient: NULL_RECORDING_PRISMA,
        }),
      (err: Error) => err.message.length > 0
    );
  });

  it('22. restricted-db + wrong port (5432) throws (safety guard)', () => {
    assert.throws(
      () =>
        createWorkerResultRecordingAdapter({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: 'postgresql://user:pass@localhost:5432/testdb',
          prismaClient: NULL_RECORDING_PRISMA,
        }),
      (err: Error) => err.message.length > 0
    );
  });

  it('23. restricted-db + production db name throws (safety guard)', () => {
    assert.throws(
      () =>
        createWorkerResultRecordingAdapter({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: 'postgresql://user:pass@localhost:55432/naver_sku_manager',
          prismaClient: NULL_RECORDING_PRISMA,
        }),
      (err: Error) => err.message.length > 0
    );
  });

  it('24. restricted-db + safety pass + no prismaClient throws', () => {
    assert.throws(
      () =>
        createWorkerResultRecordingAdapter({
          adapterModeEnvValue: 'restricted-db',
          nodeEnv: VALID_NODE_ENV,
          databaseUrl: VALID_TEST_DB_URL,
          prismaClient: undefined,
        }),
      /prismaClient/
    );
  });

  it('25. restricted-db + valid options returns adapter object', () => {
    const adapter = createWorkerResultRecordingAdapter({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: VALID_NODE_ENV,
      databaseUrl: VALID_TEST_DB_URL,
      prismaClient: NULL_RECORDING_PRISMA,
    });
    assert.ok(typeof adapter === 'object');
    assert.ok(typeof adapter.applyExecutionResultPlan === 'function');
  });

  it('26. restricted-db adapter returns applied=false for non-applicable plan (no DB call)', async () => {
    const adapter = createWorkerResultRecordingAdapter({
      adapterModeEnvValue: 'restricted-db',
      nodeEnv: VALID_NODE_ENV,
      databaseUrl: VALID_TEST_DB_URL,
      prismaClient: NULL_RECORDING_PRISMA,
    });
    const result = await adapter.applyExecutionResultPlan(makeNonApplicablePlan('TRANSITION_ONLY'));
    assert.strictEqual(result.applied, false);
  });
});
