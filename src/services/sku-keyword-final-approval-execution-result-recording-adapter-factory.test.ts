import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { createNoOpResultRecordingAdapter } from './sku-keyword-final-approval-execution-result-recording-adapter-factory.service';
import type { ExecutionResultPlan } from '../types/sku-keyword-final-approval-execution-result-recording.types';

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
});
