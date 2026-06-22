import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { evaluateFinalApprovalExecutionTransitionGuard } from './sku-keyword-final-approval-execution-transition-guard.service';
import type { FinalApprovalExecutionTransitionGuardInput } from '../types/sku-keyword-final-approval-execution-transition-guard.types';

describe('FinalApprovalExecutionTransitionGuard Pure Service', () => {
  const futureDate = new Date(Date.now() + 86400000).toISOString();
  const pastDate = new Date(Date.now() - 86400000).toISOString();
  const mockNow = new Date().toISOString();

  const getValidInput = (): FinalApprovalExecutionTransitionGuardInput => ({
    now: mockNow,
    mode: 'dry-run',
    finalApproval: {
      id: 'fa-001',
      status: 'ACTIVE',
      validationExpiresAt: futureDate,
      payloadHash: 'hash1',
      validationSnapshotHash: 'hash2'
    },
    batchJob: {
      id: 'job-001',
      status: 'APPROVED'
    },
    batchJobItems: [
      { id: 'item-001', status: 'READY' }
    ],
    request: {
      finalApprovalId: 'fa-001',
      idempotencyKey: 'idem-001',
      actorId: 'actor-001',
      payloadHash: 'hash1',
      validationSnapshotHash: 'hash2'
    }
  });

  it('1. Returns allowed=true for valid dry-run input', () => {
    const input = getValidInput();
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.reasonCodes.length, 0);
  });

  it('2. Blocks live mode', () => {
    const input = getValidInput();
    input.mode = 'live';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('LIVE_MODE_BLOCKED'));
  });

  it('3. Blocks mismatched finalApprovalId', () => {
    const input = getValidInput();
    input.request.finalApprovalId = 'fa-999';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('FINAL_APPROVAL_ID_MISMATCH'));
  });

  it('4. Blocks non-ACTIVE finalApproval', () => {
    const input = getValidInput();
    input.finalApproval.status = 'PENDING';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('FINAL_APPROVAL_NOT_ACTIVE'));
  });

  it('5. Blocks non-APPROVED batchJob', () => {
    const input = getValidInput();
    input.batchJob.status = 'DRAFT';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('BATCH_JOB_NOT_APPROVED'));
  });

  it('6. Blocks non-READY batchJobItem', () => {
    const input = getValidInput();
    input.batchJobItems[0].status = 'FAILED';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('BATCH_JOB_ITEM_NOT_READY'));
  });

  it('7. Blocks expired validation', () => {
    const input = getValidInput();
    input.finalApproval.validationExpiresAt = pastDate;
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('VALIDATION_EXPIRED'));
  });

  it('8. Blocks missing idempotencyKey', () => {
    const input = getValidInput();
    input.request.idempotencyKey = '';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('IDEMPOTENCY_KEY_MISSING'));
  });

  it('9. Blocks missing actorId', () => {
    const input = getValidInput();
    input.request.actorId = '';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('ACTOR_ID_MISSING'));
  });

  it('10. Blocks mismatched payloadHash', () => {
    const input = getValidInput();
    input.request.payloadHash = 'wrong-hash';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('PAYLOAD_HASH_MISMATCH'));
  });

  it('11. Blocks mismatched validationSnapshotHash', () => {
    const input = getValidInput();
    input.request.validationSnapshotHash = 'wrong-hash2';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('VALIDATION_SNAPSHOT_HASH_MISMATCH'));
  });

  it('12. Blocks if EXECUTING state is included', () => {
    const input = getValidInput();
    input.finalApproval.status = 'EXECUTING';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.reasonCodes.includes('EXECUTING_STATE_BLOCKED'));
  });

  it('13. Returns all failure reasonCodes', () => {
    const input = getValidInput();
    input.mode = 'live';
    input.request.actorId = '';
    input.batchJob.status = 'DRAFT';
    const result = evaluateFinalApprovalExecutionTransitionGuard(input);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.reasonCodes.length, 3);
    assert.ok(result.reasonCodes.includes('LIVE_MODE_BLOCKED'));
    assert.ok(result.reasonCodes.includes('ACTOR_ID_MISSING'));
    assert.ok(result.reasonCodes.includes('BATCH_JOB_NOT_APPROVED'));
  });

  it('14. Does not mutate the input object', () => {
    const input = getValidInput();
    const inputStringified = JSON.stringify(input);
    
    evaluateFinalApprovalExecutionTransitionGuard(input);
    
    assert.strictEqual(JSON.stringify(input), inputStringified);
  });
});
