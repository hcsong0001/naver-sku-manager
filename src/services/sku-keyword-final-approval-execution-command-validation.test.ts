import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseFinalApprovalExecutionCommand } from './sku-keyword-final-approval-execution-command-validation.service';

describe('parseFinalApprovalExecutionCommand', () => {
  const validPayload = {
    finalApprovalId: 'fa-12345',
    actorId: 'user-789',
    confirmExecutionOnly: true,
    acknowledgement: true,
    idempotencyKey: 'idem-key-1234567890'
  };

  it('1. 정상 command 통과 및 extra 필드 제거 (mutation 없음)', () => {
    const payload = { ...validPayload, extraField: 'should-be-dropped' };
    const originalJson = JSON.stringify(payload);
    
    const result = parseFinalApprovalExecutionCommand(payload);
    
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.command.finalApprovalId, 'fa-12345');
      assert.equal(result.command.actorId, 'user-789');
      assert.equal(result.command.confirmExecutionOnly, true);
      assert.equal(result.command.acknowledgement, true);
      assert.equal(result.command.idempotencyKey, 'idem-key-1234567890');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.equal((result.command as any).extraField, undefined);
    }
    
    assert.equal(JSON.stringify(payload), originalJson);
  });

  it('2. finalApprovalId 누락 실패', () => {
    const payload = { ...validPayload, finalApprovalId: '' };
    const result = parseFinalApprovalExecutionCommand(payload);
    
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.some(e => e.code === 'MISSING_FINAL_APPROVAL_ID'));
    }
  });

  it('3. actorId 누락 실패', () => {
    const payload = { ...validPayload };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (payload as any).actorId;
    const result = parseFinalApprovalExecutionCommand(payload);
    
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.some(e => e.code === 'MISSING_ACTOR_ID'));
    }
  });

  it('4. confirmExecutionOnly 누락 또는 false 실패', () => {
    const payload = { ...validPayload, confirmExecutionOnly: false };
    const result = parseFinalApprovalExecutionCommand(payload);
    
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.some(e => e.code === 'MISSING_CONFIRMATION'));
    }
  });

  it('5. acknowledgement 누락 실패', () => {
    const payload = { ...validPayload, acknowledgement: false };
    const result = parseFinalApprovalExecutionCommand(payload);
    
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.some(e => e.code === 'MISSING_ACKNOWLEDGEMENT'));
    }
  });

  it('6. idempotencyKey 형식 오류 실패', () => {
    const payload = { ...validPayload, idempotencyKey: 'short' };
    const result = parseFinalApprovalExecutionCommand(payload);
    
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.some(e => e.code === 'INVALID_IDEMPOTENCY_KEY_LENGTH'));
    }
  });

  it('7. null 입력 실패', () => {
    const result = parseFinalApprovalExecutionCommand(null);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.some(e => e.code === 'INVALID_INPUT_TYPE'));
    }
  });
});
