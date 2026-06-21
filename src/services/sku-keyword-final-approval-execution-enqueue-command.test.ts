import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildFinalApprovalExecutionEnqueueCommand } from './sku-keyword-final-approval-execution-enqueue-command.service';
import type { FinalApprovalExecutionCommand } from '../types/sku-keyword-final-approval-execution-command.types';

describe('buildFinalApprovalExecutionEnqueueCommand', () => {
  const baseCommand: FinalApprovalExecutionCommand = {
    finalApprovalId: 'fa-123',
    actorId: 'user-456',
    confirmExecutionOnly: true,
    acknowledgement: true,
    idempotencyKey: 'idem-key-abc'
  };

  it('1. 정상 command로 enqueue command 생성', () => {
    const enqueueCommand = buildFinalApprovalExecutionEnqueueCommand(baseCommand);

    assert.equal(enqueueCommand.finalApprovalId, 'fa-123');
    assert.equal(enqueueCommand.actorId, 'user-456');
    assert.equal(enqueueCommand.idempotencyKey, 'idem-key-abc');
    assert.equal(enqueueCommand.source, 'EXECUTION_API');
    assert.equal(enqueueCommand.mode, 'DRY_RUN_READY');
    assert.ok(enqueueCommand.requestedAt);
  });

  it('2. requestedAt 및 mode 주입 시 동일 값 사용', () => {
    const customTime = '2026-01-01T00:00:00Z';
    const enqueueCommand = buildFinalApprovalExecutionEnqueueCommand(baseCommand, {
      requestedAt: customTime,
      mode: 'MOCK'
    });

    assert.equal(enqueueCommand.requestedAt, customTime);
    assert.equal(enqueueCommand.mode, 'MOCK');
  });

  it('3. idempotencyKey가 없으면 deterministic fallback 검증', () => {
    const commandWithoutKey = { ...baseCommand, idempotencyKey: '' };
    
    const result1 = buildFinalApprovalExecutionEnqueueCommand(commandWithoutKey);
    const result2 = buildFinalApprovalExecutionEnqueueCommand(commandWithoutKey);

    assert.ok(result1.idempotencyKey.startsWith('idem-'));
    assert.equal(result1.idempotencyKey, result2.idempotencyKey);
  });

  it('4. 입력 command를 mutation하지 않음', () => {
    const originalJson = JSON.stringify(baseCommand);
    
    buildFinalApprovalExecutionEnqueueCommand(baseCommand);
    
    assert.equal(JSON.stringify(baseCommand), originalJson);
  });

  it('5. output이 plain object인지 확인', () => {
    const enqueueCommand = buildFinalApprovalExecutionEnqueueCommand(baseCommand);
    
    assert.equal(Object.getPrototypeOf(enqueueCommand), Object.prototype);
    assert.deepEqual(Object.keys(enqueueCommand).sort(), [
      'actorId',
      'finalApprovalId',
      'idempotencyKey',
      'mode',
      'requestedAt',
      'source'
    ]);
  });
});
