import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { 
  buildFinalApprovalExecutionApiAcceptedResponse,
  buildFinalApprovalExecutionApiValidationErrorResponse,
  buildFinalApprovalExecutionApiGuardFailureResponse
} from './sku-keyword-final-approval-execution-api-response.service';
import type { FinalApprovalExecutionEnqueueCommand } from '../types/sku-keyword-final-approval-execution-enqueue.types';
import type { ExecutionCommandValidationFailure } from '../types/sku-keyword-final-approval-execution-command.types';

describe('FinalApproval Execution API Response Envelope Builders', () => {
  it('1. accepted response 생성 및 plain object 확인', () => {
    const enqueueCommand: FinalApprovalExecutionEnqueueCommand = {
      finalApprovalId: 'fa-1',
      actorId: 'act-1',
      idempotencyKey: 'idem-1',
      requestedAt: '2026-01-01T00:00:00Z',
      source: 'EXECUTION_API',
      mode: 'DRY_RUN_READY'
    };

    const originalJson = JSON.stringify(enqueueCommand);
    const result = buildFinalApprovalExecutionApiAcceptedResponse(enqueueCommand, 'OK');

    assert.equal(result.success, true);
    assert.equal(result.statusCode, 202);
    assert.equal(result.finalApprovalId, 'fa-1');
    assert.equal(result.actorId, 'act-1');
    assert.equal(result.idempotencyKey, 'idem-1');
    assert.equal(result.mode, 'DRY_RUN_READY');
    assert.equal(result.message, 'OK');

    assert.equal(JSON.stringify(enqueueCommand), originalJson);
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
  });

  it('2. validation error response 생성 및 mutation 방지 확인', () => {
    const failurePayload: ExecutionCommandValidationFailure = {
      success: false,
      errors: [
        { code: 'ERR_1', message: 'MSG_1' }
      ]
    };

    const result = buildFinalApprovalExecutionApiValidationErrorResponse(failurePayload);

    assert.equal(result.success, false);
    assert.equal(result.statusCode, 400);
    assert.equal(result.errors.length, 1);
    assert.equal(result.errors[0].code, 'ERR_1');
    
    failurePayload.errors[0].code = 'MUTATED';
    assert.equal(result.errors[0].code, 'ERR_1');
  });

  it('3. guard failure response 생성 및 plain object 확인', () => {
    const result = buildFinalApprovalExecutionApiGuardFailureResponse(
      'HASH_MISMATCH', 
      'Hash does not match.',
      409
    );

    assert.equal(result.success, false);
    assert.equal(result.statusCode, 409);
    assert.equal(result.guardCode, 'HASH_MISMATCH');
    assert.equal(result.message, 'Hash does not match.');
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
  });
});
