import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { buildExecutionResultPlan } from './sku-keyword-final-approval-execution-result-recording.service';
import type {
  ItemExecutionResult,
  JobExecutionInput,
} from '../types/sku-keyword-final-approval-execution-result-recording.types';

// ── Helpers ───────────────────────────────────────────────────────────────────

const NOW = '2026-06-23T01:00:00.000Z';
const END = '2026-06-23T01:00:05.000Z';

const baseInput = (): JobExecutionInput => ({
  jobId: 'job-001',
  finalApprovalId: 'fa-001',
  idempotencyKey: 'idem-001',
  actorId: 'actor-001',
  mode: 'restricted-db',
  itemResults: [],
  startedAt: NOW,
  endedAt: END,
});

const successItem = (id: string): ItemExecutionResult => ({
  itemId: id,
  status: 'SUCCESS',
  apiCallAttempted: true,
  apiDurationMs: 120,
});

const failedItem = (id: string, code = 'NAVER_API_FAILED'): ItemExecutionResult => ({
  itemId: id,
  status: 'FAILED',
  errorCode: code,
  errorMessage: 'Naver API returned 500',
  apiCallAttempted: true,
});

const retryItem = (id: string): ItemExecutionResult => ({
  itemId: id,
  status: 'RETRY_PENDING',
  errorCode: 'TRANSIENT_ERROR',
  errorMessage: 'timeout',
  apiCallAttempted: true,
});

const skippedItem = (id: string): ItemExecutionResult => ({
  itemId: id,
  status: 'SKIPPED',
  apiCallAttempted: false,
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('FinalApprovalExecutionResultRecording', () => {
  // ── Safety: live mode blocked ─────────────────────────────────────────────

  it('1. live mode throws immediately (hard block)', () => {
    assert.throws(
      () => buildExecutionResultPlan({ ...baseInput(), mode: 'live' }),
      /not allowed/
    );
  });

  it('2. live mode error message does not reveal internal state', () => {
    let thrown: Error | null = null;
    try {
      buildExecutionResultPlan({ ...baseInput(), mode: 'live' });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }
    assert.ok(thrown !== null);
    assert.ok(!thrown.message.includes('idem-001'), 'must not expose idempotency key');
    assert.ok(!thrown.message.includes('fa-001'), 'must not expose finalApprovalId');
  });

  // ── dry-run: plan computed but not applicable ─────────────────────────────

  it('3. dry-run with success items returns applicable=false', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      mode: 'dry-run',
      itemResults: [successItem('i-1')],
    });
    assert.strictEqual(plan.applicable, false);
    assert.ok(plan.blockedReason?.includes('dry-run'));
  });

  it('4. dry-run still computes outcome and summary', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      mode: 'dry-run',
      itemResults: [successItem('i-1'), successItem('i-2')],
    });
    assert.strictEqual(plan.summary.successCount, 2);
    assert.strictEqual(plan.outcome, 'EXECUTED');
  });

  it('5. dry-run does not produce jobUpdate', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      mode: 'dry-run',
      itemResults: [successItem('i-1')],
    });
    assert.strictEqual(plan.jobUpdate, undefined);
  });

  // ── TRANSITION_ONLY: no items yet ─────────────────────────────────────────

  it('6. empty itemResults returns TRANSITION_ONLY outcome', () => {
    const plan = buildExecutionResultPlan(baseInput());
    assert.strictEqual(plan.outcome, 'TRANSITION_ONLY');
    assert.strictEqual(plan.applicable, false);
    assert.ok(plan.blockedReason?.includes('TRANSITION_ONLY'));
  });

  it('7. TRANSITION_ONLY returns empty itemUpdates', () => {
    const plan = buildExecutionResultPlan(baseInput());
    assert.deepStrictEqual(plan.itemUpdates, []);
  });

  // ── Outcome computation ────────────────────────────────────────────────────

  it('8. all SUCCESS → outcome EXECUTED', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1'), successItem('i-2')],
    });
    assert.strictEqual(plan.outcome, 'EXECUTED');
  });

  it('9. mix of SUCCESS and FAILED → outcome PARTIAL_SUCCESS', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1'), failedItem('i-2')],
    });
    assert.strictEqual(plan.outcome, 'PARTIAL_SUCCESS');
  });

  it('10. mix of SUCCESS and RETRY_PENDING → outcome PARTIAL_SUCCESS', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1'), retryItem('i-2')],
    });
    assert.strictEqual(plan.outcome, 'PARTIAL_SUCCESS');
  });

  it('11. all FAILED → outcome FAILED', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [failedItem('i-1'), failedItem('i-2')],
    });
    assert.strictEqual(plan.outcome, 'FAILED');
  });

  it('12. all RETRY_PENDING → outcome FAILED', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [retryItem('i-1')],
    });
    assert.strictEqual(plan.outcome, 'FAILED');
  });

  it('13. all SKIPPED with no success/fail → outcome FAILED', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [skippedItem('i-1'), skippedItem('i-2')],
    });
    assert.strictEqual(plan.outcome, 'FAILED');
  });

  // ── JobResultUpdate content ───────────────────────────────────────────────

  it('14. EXECUTED → jobUpdate.newStatus = EXECUTED', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1')],
    });
    assert.strictEqual(plan.jobUpdate?.newStatus, 'EXECUTED');
  });

  it('15. PARTIAL_SUCCESS → jobUpdate.newStatus = PARTIAL_SUCCESS', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1'), failedItem('i-2')],
    });
    assert.strictEqual(plan.jobUpdate?.newStatus, 'PARTIAL_SUCCESS');
  });

  it('16. FAILED → jobUpdate.newStatus = FAILED', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [failedItem('i-1')],
    });
    assert.strictEqual(plan.jobUpdate?.newStatus, 'FAILED');
  });

  it('17. jobUpdate.metadataUpdate contains actorId and idempotencyKey', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1')],
    });
    assert.strictEqual(plan.jobUpdate?.metadataUpdate.actorId, 'actor-001');
    assert.strictEqual(plan.jobUpdate?.metadataUpdate.idempotencyKey, 'idem-001');
    assert.strictEqual(plan.jobUpdate?.metadataUpdate.finalApprovalId, 'fa-001');
    assert.strictEqual(plan.jobUpdate?.metadataUpdate.executionMode, 'restricted-db');
  });

  it('18. jobUpdate.metadataUpdate.durationMs is computed correctly', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1')],
      startedAt: '2026-06-23T01:00:00.000Z',
      endedAt: '2026-06-23T01:00:05.000Z',
    });
    assert.strictEqual(plan.jobUpdate?.metadataUpdate.durationMs, 5000);
  });

  it('19. jobUpdate.successCount/failedCount/skippedCount are correct', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [
        successItem('i-1'),
        successItem('i-2'),
        failedItem('i-3'),
        skippedItem('i-4'),
      ],
    });
    assert.strictEqual(plan.jobUpdate?.successCount, 2);
    assert.strictEqual(plan.jobUpdate?.failedCount, 1);
    assert.strictEqual(plan.jobUpdate?.skippedCount, 1);
  });

  // ── ItemResultUpdate content ──────────────────────────────────────────────

  it('20. itemUpdates length matches itemResults length', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1'), failedItem('i-2'), skippedItem('i-3')],
    });
    assert.strictEqual(plan.itemUpdates.length, 3);
  });

  it('21. itemUpdates[failed].errorCode and errorMessage are preserved', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [failedItem('i-1', 'NAVER_API_TIMEOUT')],
    });
    const update = plan.itemUpdates.find((u) => u.itemId === 'i-1');
    assert.strictEqual(update?.newStatus, 'FAILED');
    assert.strictEqual(update?.errorCode, 'NAVER_API_TIMEOUT');
  });

  it('22. itemUpdates[skipped].errorCode is undefined', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [skippedItem('i-1')],
    });
    const update = plan.itemUpdates.find((u) => u.itemId === 'i-1');
    assert.strictEqual(update?.newStatus, 'SKIPPED');
    assert.strictEqual(update?.errorCode, undefined);
  });

  // ── Summary ───────────────────────────────────────────────────────────────

  it('23. summary.apiCallsAttempted counts only items where apiCallAttempted=true', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [
        successItem('i-1'),   // apiCallAttempted: true
        skippedItem('i-2'),   // apiCallAttempted: false
        failedItem('i-3'),    // apiCallAttempted: true
      ],
    });
    assert.strictEqual(plan.summary.apiCallsAttempted, 2);
  });

  it('24. summary.retryPendingCount is counted separately', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      itemResults: [successItem('i-1'), retryItem('i-2'), retryItem('i-3')],
    });
    assert.strictEqual(plan.summary.retryPendingCount, 2);
  });

  it('25. input object is not mutated', () => {
    const input = { ...baseInput(), itemResults: [successItem('i-1')] };
    const snapshot = JSON.stringify(input);
    buildExecutionResultPlan(input);
    assert.strictEqual(JSON.stringify(input), snapshot);
  });

  // ── restricted-db: plan is applicable ────────────────────────────────────

  it('26. restricted-db + success items: applicable=true', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      mode: 'restricted-db',
      itemResults: [successItem('i-1')],
    });
    assert.strictEqual(plan.applicable, true);
    assert.strictEqual(plan.blockedReason, undefined);
  });

  it('27. restricted-db + FAILED items: applicable=true (result still recorded)', () => {
    const plan = buildExecutionResultPlan({
      ...baseInput(),
      mode: 'restricted-db',
      itemResults: [failedItem('i-1')],
    });
    assert.strictEqual(plan.applicable, true);
    assert.strictEqual(plan.jobUpdate?.newStatus, 'FAILED');
  });
});
