import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  createResultRecordingPrismaAdapter,
  type ResultRecordingPrismaClientPort,
  type ResultRecordingTxClient,
} from './sku-keyword-final-approval-execution-result-recording-prisma-adapter.service';
import type { ExecutionResultPlan } from '../types/sku-keyword-final-approval-execution-result-recording.types';

// ── Constants ─────────────────────────────────────────────────────────────────

const SAFE_OPTIONS = {
  nodeEnv: 'test',
  databaseUrl: 'postgresql://tms_test:secret@localhost:55432/tms_final_approval_test',
  adapterMode: 'restricted-db',
};

const JOB_ID = 'test-db-revalidation-batch-job-001';
const ITEM_ID = 'test-db-revalidation-batch-job-item-001';
const NOW = '2026-06-23T01:00:00.000Z';
const END = '2026-06-23T01:00:05.000Z';

// ── Mock helpers ──────────────────────────────────────────────────────────────

interface MockCalls {
  findUniqueArgs: unknown[];
  jobUpdateManyArgs: unknown[];
  itemUpdateManyArgs: unknown[];
  txCalled: boolean;
}

function makeCalls(): MockCalls {
  return { findUniqueArgs: [], jobUpdateManyArgs: [], itemUpdateManyArgs: [], txCalled: false };
}

function makeMockPrisma(opts: {
  jobStatus?: string;
  itemCount?: number;
  jobCount?: number;
  findUniqueNull?: boolean;
  calls?: MockCalls;
}): ResultRecordingPrismaClientPort {
  const {
    jobStatus = 'EXECUTING',
    itemCount = 1,
    jobCount = 1,
    findUniqueNull = false,
    calls,
  } = opts;

  return {
    naverApiBatchJob: {
      findUnique: async (args) => {
        if (calls) calls.findUniqueArgs.push(args);
        return findUniqueNull ? null : { status: jobStatus };
      },
    },
    $transaction: async <T>(fn: (tx: ResultRecordingTxClient) => Promise<T>): Promise<T> => {
      if (calls) calls.txCalled = true;
      const tx: ResultRecordingTxClient = {
        naverApiBatchJob: {
          updateMany: async (args) => {
            if (calls) calls.jobUpdateManyArgs.push(args);
            return { count: jobCount };
          },
        },
        naverApiBatchJobItem: {
          updateMany: async (args) => {
            if (calls) calls.itemUpdateManyArgs.push(args);
            return { count: itemCount };
          },
        },
      };
      return fn(tx);
    },
  };
}

// ── Plan helpers ──────────────────────────────────────────────────────────────

function makePlan(opts: {
  applicable?: boolean;
  blockedReason?: string;
  newJobStatus?: 'EXECUTED' | 'PARTIAL_SUCCESS' | 'FAILED';
  itemUpdates?: ExecutionResultPlan['itemUpdates'];
}): ExecutionResultPlan {
  const {
    applicable = true,
    blockedReason,
    newJobStatus = 'EXECUTED',
    itemUpdates = [{ itemId: ITEM_ID, newStatus: 'SUCCESS' }],
  } = opts;

  return {
    applicable,
    blockedReason,
    outcome: newJobStatus === 'EXECUTED' ? 'EXECUTED' : newJobStatus === 'PARTIAL_SUCCESS' ? 'PARTIAL_SUCCESS' : 'FAILED',
    jobUpdate: applicable
      ? {
          jobId: JOB_ID,
          newStatus: newJobStatus,
          successCount: itemUpdates.filter(i => i.newStatus === 'SUCCESS').length,
          failedCount: itemUpdates.filter(i => i.newStatus === 'FAILED').length,
          skippedCount: itemUpdates.filter(i => i.newStatus === 'SKIPPED').length,
          executedAt: END,
          metadataUpdate: {
            executionMode: 'restricted-db',
            actorId: 'test-actor',
            idempotencyKey: 'test-idem',
            startedAt: NOW,
            endedAt: END,
            durationMs: 5000,
            finalApprovalId: 'test-db-revalidation-final-approval-001',
          },
        }
      : undefined,
    itemUpdates,
    summary: {
      totalItems: itemUpdates.length,
      successCount: itemUpdates.filter(i => i.newStatus === 'SUCCESS').length,
      failedCount: itemUpdates.filter(i => i.newStatus === 'FAILED').length,
      skippedCount: itemUpdates.filter(i => i.newStatus === 'SKIPPED').length,
      retryPendingCount: itemUpdates.filter(i => i.newStatus === 'RETRY_PENDING').length,
      apiCallsAttempted: 0,
      durationMs: 5000,
      outcome: newJobStatus === 'EXECUTED' ? 'EXECUTED' : newJobStatus === 'PARTIAL_SUCCESS' ? 'PARTIAL_SUCCESS' : 'FAILED',
      mode: 'restricted-db',
    },
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ResultRecordingPrismaAdapter', () => {
  // ── 1. live mode → throw ─────────────────────────────────────────────────

  it('1. live adapterMode throws at creation time', () => {
    assert.throws(
      () =>
        createResultRecordingPrismaAdapter(makeMockPrisma({}), {
          ...SAFE_OPTIONS,
          adapterMode: 'live',
        }),
      /not allowed/
    );
  });

  // ── 2. production/prod/operating → throw ─────────────────────────────────

  it('2a. adapterMode=production throws at creation', () => {
    assert.throws(
      () =>
        createResultRecordingPrismaAdapter(makeMockPrisma({}), {
          ...SAFE_OPTIONS,
          adapterMode: 'production',
        }),
      /not allowed/
    );
  });

  it('2b. adapterMode=prod throws at creation', () => {
    assert.throws(
      () =>
        createResultRecordingPrismaAdapter(makeMockPrisma({}), {
          ...SAFE_OPTIONS,
          adapterMode: 'prod',
        }),
      /not allowed/
    );
  });

  it('2c. adapterMode=operating throws at creation', () => {
    assert.throws(
      () =>
        createResultRecordingPrismaAdapter(makeMockPrisma({}), {
          ...SAFE_OPTIONS,
          adapterMode: 'operating',
        }),
      /not allowed/
    );
  });

  it('2d. restricted-db + NODE_ENV=production throws safety guard error', () => {
    assert.throws(
      () =>
        createResultRecordingPrismaAdapter(makeMockPrisma({}), {
          nodeEnv: 'production',
          databaseUrl: SAFE_OPTIONS.databaseUrl,
          adapterMode: 'restricted-db',
        }),
      /safety guard failed/
    );
  });

  it('2e. restricted-db + RDS host in DATABASE_URL throws safety guard error', () => {
    assert.throws(
      () =>
        createResultRecordingPrismaAdapter(makeMockPrisma({}), {
          nodeEnv: 'test',
          databaseUrl: 'postgresql://user:pass@prod.rds.amazonaws.com:5432/db',
          adapterMode: 'restricted-db',
        }),
      /safety guard failed/
    );
  });

  // ── 3. DATABASE_URL not exposed in error message ──────────────────────────

  it('3. safety guard error does not reveal DATABASE_URL value', () => {
    let thrown: Error | null = null;
    try {
      createResultRecordingPrismaAdapter(makeMockPrisma({}), {
        nodeEnv: 'test',
        databaseUrl: 'postgresql://secretuser:secretpass@prod.rds.amazonaws.com:5432/db',
        adapterMode: 'restricted-db',
      });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }
    assert.ok(thrown !== null);
    assert.ok(!thrown.message.includes('secretuser'), 'username must not appear in error');
    assert.ok(!thrown.message.includes('secretpass'), 'password must not appear in error');
    assert.ok(!thrown.message.includes('prod.rds.amazonaws.com'), 'host must not appear in error');
  });

  it('3b. blocked adapterMode error does not reveal DATABASE_URL', () => {
    let thrown: Error | null = null;
    try {
      createResultRecordingPrismaAdapter(makeMockPrisma({}), {
        nodeEnv: 'test',
        databaseUrl: 'postgresql://secretuser:secretpass@localhost:55432/db',
        adapterMode: 'live',
      });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }
    assert.ok(thrown !== null);
    assert.ok(!thrown.message.includes('secretpass'));
    assert.ok(!thrown.message.includes('secretuser'));
  });

  // ── 4. applicable=false → no-op ───────────────────────────────────────────

  it('4a. applicable=false plan returns applied=false without touching DB', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({ applicable: false, blockedReason: 'dry-run mode: plan computed but not applied to DB' });

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason?.includes('dry-run'));
    assert.strictEqual(calls.findUniqueArgs.length, 0, 'findUnique must not be called');
    assert.strictEqual(calls.txCalled, false, 'transaction must not start');
  });

  it('4b. applicable=false plan with TRANSITION_ONLY reason propagates skippedReason', async () => {
    const adapter = createResultRecordingPrismaAdapter(makeMockPrisma({}), SAFE_OPTIONS);
    const plan = makePlan({ applicable: false, blockedReason: 'TRANSITION_ONLY: no item results' });

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason?.includes('TRANSITION_ONLY'));
  });

  // ── 5. Job → EXECUTED ─────────────────────────────────────────────────────

  it('5. all-success plan writes Job EXECUTED and returns applied=true', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({ newJobStatus: 'EXECUTED', itemUpdates: [{ itemId: ITEM_ID, newStatus: 'SUCCESS' }] });

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.applied, true);
    assert.strictEqual(result.jobUpdated, true);
    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    assert.strictEqual(jobArgs.data.status, 'EXECUTED');
  });

  // ── 6. Job → PARTIAL_SUCCESS ──────────────────────────────────────────────

  it('6. partial success plan writes Job PARTIAL_SUCCESS', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'PARTIAL_SUCCESS',
      itemUpdates: [
        { itemId: 'i-1', newStatus: 'SUCCESS' },
        { itemId: 'i-2', newStatus: 'FAILED', errorCode: 'ERR', errorMessage: 'failed' },
      ],
    });

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.applied, true);
    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    assert.strictEqual(jobArgs.data.status, 'PARTIAL_SUCCESS');
  });

  // ── 7. Job → FAILED ───────────────────────────────────────────────────────

  it('7. all-failed plan writes Job FAILED', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'FAILED',
      itemUpdates: [{ itemId: ITEM_ID, newStatus: 'FAILED', errorCode: 'ERR', errorMessage: 'x' }],
    });

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.applied, true);
    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    assert.strictEqual(jobArgs.data.status, 'FAILED');
  });

  // ── 8. Item → SUCCESS ─────────────────────────────────────────────────────

  it('8. success item updateMany uses status=SUCCESS and clears errorCode', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({ itemUpdates: [{ itemId: ITEM_ID, newStatus: 'SUCCESS' }] });

    await adapter.applyExecutionResultPlan(plan);

    const itemArgs = calls.itemUpdateManyArgs[0] as any;
    assert.strictEqual(itemArgs.data.status, 'SUCCESS');
    assert.strictEqual(itemArgs.data.errorCode, null);
    assert.strictEqual(itemArgs.data.errorMessage, null);
  });

  // ── 9. Item → FAILED + errorCode/errorMessage ────────────────────────────

  it('9. failed item updateMany records errorCode and errorMessage', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'FAILED',
      itemUpdates: [
        {
          itemId: ITEM_ID,
          newStatus: 'FAILED',
          errorCode: 'NAVER_API_TIMEOUT',
          errorMessage: 'API timed out after 30s',
        },
      ],
    });

    await adapter.applyExecutionResultPlan(plan);

    const itemArgs = calls.itemUpdateManyArgs[0] as any;
    assert.strictEqual(itemArgs.data.status, 'FAILED');
    assert.strictEqual(itemArgs.data.errorCode, 'NAVER_API_TIMEOUT');
    assert.strictEqual(itemArgs.data.errorMessage, 'API timed out after 30s');
  });

  // ── 10. Item → RETRY_PENDING ──────────────────────────────────────────────

  it('10. retry item updateMany uses status=RETRY_PENDING', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'FAILED',
      itemUpdates: [
        {
          itemId: ITEM_ID,
          newStatus: 'RETRY_PENDING',
          errorCode: 'TRANSIENT_ERROR',
          errorMessage: 'timeout',
        },
      ],
    });

    await adapter.applyExecutionResultPlan(plan);

    const itemArgs = calls.itemUpdateManyArgs[0] as any;
    assert.strictEqual(itemArgs.data.status, 'RETRY_PENDING');
  });

  // ── 11. Item → SKIPPED ────────────────────────────────────────────────────

  it('11. skipped item updateMany uses status=SKIPPED and clears error fields', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'FAILED',
      itemUpdates: [{ itemId: ITEM_ID, newStatus: 'SKIPPED' }],
    });

    await adapter.applyExecutionResultPlan(plan);

    const itemArgs = calls.itemUpdateManyArgs[0] as any;
    assert.strictEqual(itemArgs.data.status, 'SKIPPED');
    assert.strictEqual(itemArgs.data.errorCode, null);
    assert.strictEqual(itemArgs.data.errorMessage, null);
  });

  // ── 12. NaverApiBatchFinalApproval not touched ────────────────────────────

  it('12. adapter port has no naverApiBatchFinalApproval operations', () => {
    const prisma = makeMockPrisma({}) as any;
    assert.strictEqual(
      prisma.naverApiBatchFinalApproval,
      undefined,
      'naverApiBatchFinalApproval must not appear on the mock (schema safety)'
    );
  });

  it('12b. ResultRecordingPrismaClientPort does not expose naverApiBatchFinalApproval', () => {
    // Compile-time guard: the interface only has naverApiBatchJob and $transaction.
    // This test asserts that the adapter's applyExecutionResultPlan does not
    // pass naverApiBatchFinalApproval calls to the prisma port.
    const calls = makeCalls();
    const extendedPrisma = {
      ...makeMockPrisma({ calls }),
      naverApiBatchFinalApproval: {
        update: async () => { throw new Error('FinalApproval must not be touched'); },
      },
    } as unknown as ResultRecordingPrismaClientPort;

    const adapter = createResultRecordingPrismaAdapter(extendedPrisma, SAFE_OPTIONS);
    const plan = makePlan({});

    // Should not throw even though naverApiBatchFinalApproval.update throws
    return adapter.applyExecutionResultPlan(plan).then((result) => {
      assert.strictEqual(result.applied, true);
    });
  });

  // ── 13. NaverApiCallLog not created ───────────────────────────────────────

  it('13. adapter does not call naverApiCallLog during recording', async () => {
    let callLogTouched = false;
    const prismaWithCallLog = {
      ...makeMockPrisma({}),
      naverApiCallLog: {
        create: async () => { callLogTouched = true; throw new Error('callLog must not be created'); },
      },
    } as unknown as ResultRecordingPrismaClientPort;

    const adapter = createResultRecordingPrismaAdapter(prismaWithCallLog, SAFE_OPTIONS);
    await adapter.applyExecutionResultPlan(makePlan({}));

    assert.strictEqual(callLogTouched, false);
  });

  // ── 14. Transaction is used ───────────────────────────────────────────────

  it('14. $transaction is called for applicable plans', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );

    await adapter.applyExecutionResultPlan(makePlan({}));

    assert.strictEqual(calls.txCalled, true);
  });

  it('14b. $transaction is NOT called for non-applicable plans', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );

    await adapter.applyExecutionResultPlan(
      makePlan({ applicable: false, blockedReason: 'dry-run' })
    );

    assert.strictEqual(calls.txCalled, false);
  });

  // ── 15. Item update failure → transaction rollback ────────────────────────

  it('15. item updateMany count=0 throws (transaction fails)', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ itemCount: 0 }),
      SAFE_OPTIONS
    );

    await assert.rejects(
      () => adapter.applyExecutionResultPlan(makePlan({})),
      /BatchJobItem result recording failed/
    );
  });

  it('15b. job updateMany count=0 throws (transaction fails)', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ itemCount: 1, jobCount: 0 }),
      SAFE_OPTIONS
    );

    await assert.rejects(
      () => adapter.applyExecutionResultPlan(makePlan({})),
      /BatchJob result recording failed/
    );
  });

  // ── 16. Metadata includes execution info and recordedAt ──────────────────

  it('16a. metadata in job update includes executionMode', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );

    await adapter.applyExecutionResultPlan(makePlan({}));

    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    const meta = jobArgs.data.metadata;
    assert.strictEqual(meta.executionMode, 'restricted-db');
  });

  it('16b. metadata includes recordedAt (set by adapter at write time)', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );

    await adapter.applyExecutionResultPlan(makePlan({}));

    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    const meta = jobArgs.data.metadata;
    assert.ok(typeof meta.recordedAt === 'string', 'recordedAt must be a string');
    assert.ok(meta.recordedAt.includes('T'), 'recordedAt must be ISO string');
  });

  it('16c. metadata includes resultSummary with counts', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'PARTIAL_SUCCESS',
      itemUpdates: [
        { itemId: 'i-1', newStatus: 'SUCCESS' },
        { itemId: 'i-2', newStatus: 'FAILED', errorCode: 'E', errorMessage: 'x' },
      ],
    });

    await adapter.applyExecutionResultPlan(plan);

    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    const summary = jobArgs.data.metadata.resultSummary;
    assert.ok(typeof summary.successCount === 'number');
    assert.ok(typeof summary.failedCount === 'number');
    assert.ok(typeof summary.skippedCount === 'number');
  });

  it('16d. job update sets successItems, failedItems, skippedItems, executedAt', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      newJobStatus: 'EXECUTED',
      itemUpdates: [{ itemId: ITEM_ID, newStatus: 'SUCCESS' }],
    });

    await adapter.applyExecutionResultPlan(plan);

    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    assert.ok('successItems' in jobArgs.data);
    assert.ok('failedItems' in jobArgs.data);
    assert.ok('skippedItems' in jobArgs.data);
    assert.ok(jobArgs.data.executedAt instanceof Date);
  });

  // ── 17. Unknown item ID handling ──────────────────────────────────────────

  it('17. unknown item ID causes count=0 → error thrown (policy: fail-safe)', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ itemCount: 0 }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      itemUpdates: [{ itemId: 'non-existent-item-id', newStatus: 'SUCCESS' }],
    });

    await assert.rejects(
      () => adapter.applyExecutionResultPlan(plan),
      /BatchJobItem result recording failed/
    );
  });

  // ── 18. Duplicate recording prevention ───────────────────────────────────

  it('18. job not in EXECUTING status → applied=false (duplicate guard)', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ jobStatus: 'APPROVED' }),
      SAFE_OPTIONS
    );

    const result = await adapter.applyExecutionResultPlan(makePlan({}));

    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason?.includes('APPROVED'));
  });

  // ── 19. Already EXECUTED → blocked ───────────────────────────────────────

  it('19. job already EXECUTED → applied=false (idempotency guard)', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ jobStatus: 'EXECUTED' }),
      SAFE_OPTIONS
    );

    const result = await adapter.applyExecutionResultPlan(makePlan({}));

    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason?.includes('EXECUTED'));
    assert.ok(result.skippedReason?.includes('already recorded'));
  });

  it('19b. job FAILED → applied=false (idempotency guard)', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ jobStatus: 'FAILED' }),
      SAFE_OPTIONS
    );

    const result = await adapter.applyExecutionResultPlan(makePlan({}));

    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason?.includes('FAILED'));
  });

  it('19c. job not found → applied=false', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ findUniqueNull: true }),
      SAFE_OPTIONS
    );

    const result = await adapter.applyExecutionResultPlan(makePlan({}));

    assert.strictEqual(result.applied, false);
    assert.ok(result.skippedReason?.includes('not found'));
  });

  // ── Item update WHERE clause includes status=EXECUTING ───────────────────

  it('20. item updateMany WHERE clause includes status=EXECUTING', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );

    await adapter.applyExecutionResultPlan(makePlan({}));

    const itemArgs = calls.itemUpdateManyArgs[0] as any;
    assert.strictEqual(itemArgs.where.status, 'EXECUTING');
    assert.strictEqual(itemArgs.where.id, ITEM_ID);
  });

  it('21. job updateMany WHERE clause includes status=EXECUTING', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );

    await adapter.applyExecutionResultPlan(makePlan({}));

    const jobArgs = calls.jobUpdateManyArgs[0] as any;
    assert.strictEqual(jobArgs.where.status, 'EXECUTING');
    assert.strictEqual(jobArgs.where.id, JOB_ID);
  });

  // ── itemsUpdated count in result ──────────────────────────────────────────

  it('22. result.itemsUpdated matches number of itemUpdates in plan', async () => {
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ itemCount: 1 }),
      SAFE_OPTIONS
    );
    const plan = makePlan({
      itemUpdates: [
        { itemId: 'i-1', newStatus: 'SUCCESS' },
        { itemId: 'i-2', newStatus: 'SUCCESS' },
        { itemId: 'i-3', newStatus: 'FAILED', errorCode: 'E', errorMessage: 'e' },
      ],
    });

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.itemsUpdated, 3);
  });

  // ── Empty itemUpdates (all items already non-EXECUTING) ───────────────────

  it('23. applicable plan with empty itemUpdates still applies job update', async () => {
    const calls = makeCalls();
    const adapter = createResultRecordingPrismaAdapter(
      makeMockPrisma({ calls }),
      SAFE_OPTIONS
    );
    // Plan with no item updates but applicable (e.g., items were already final)
    const plan: ExecutionResultPlan = {
      ...makePlan({ itemUpdates: [] }),
      jobUpdate: {
        jobId: JOB_ID,
        newStatus: 'EXECUTED',
        successCount: 0,
        failedCount: 0,
        skippedCount: 0,
        executedAt: END,
        metadataUpdate: {
          executionMode: 'restricted-db',
          actorId: 'actor',
          idempotencyKey: 'idem',
          startedAt: NOW,
          endedAt: END,
          durationMs: 5000,
          finalApprovalId: 'test-db-revalidation-final-approval-001',
        },
      },
    };

    const result = await adapter.applyExecutionResultPlan(plan);

    assert.strictEqual(result.applied, true);
    assert.strictEqual(result.itemsUpdated, 0);
    assert.strictEqual(calls.itemUpdateManyArgs.length, 0);
    assert.strictEqual(calls.jobUpdateManyArgs.length, 1);
  });

  // ── Safe options without adapterMode (mock path, no safety guard) ─────────

  it('24. undefined adapterMode does not trigger safety guard (mock mode path)', () => {
    // Should not throw — undefined/empty adapterMode skips both blocked-mode check
    // and safety guard, acting as a no-op "mock" adapter.
    assert.doesNotThrow(() =>
      createResultRecordingPrismaAdapter(makeMockPrisma({}), {
        ...SAFE_OPTIONS,
        adapterMode: undefined,
      })
    );
  });

  it('25. result object is plain JSON-serializable', async () => {
    const adapter = createResultRecordingPrismaAdapter(makeMockPrisma({}), SAFE_OPTIONS);
    const result = await adapter.applyExecutionResultPlan(makePlan({}));

    assert.doesNotThrow(() => JSON.stringify(result));
  });
});
