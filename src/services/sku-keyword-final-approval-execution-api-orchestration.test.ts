import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runFinalApprovalExecutionApiOrchestration } from './sku-keyword-final-approval-execution-api-orchestration.service';

describe('runFinalApprovalExecutionApiOrchestration', () => {
  const validRequestBody = {
    finalApprovalId: 'fa-1',
    actorId: 'act-1',
    confirmExecutionOnly: true,
    acknowledgement: true,
    idempotencyKey: 'idem-test-1234567890'
  };

  it('1. 정상 request body -> accepted response 생성', () => {
    const result = runFinalApprovalExecutionApiOrchestration(validRequestBody);

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.statusCode, 202);
      assert.equal(result.finalApprovalId, 'fa-1');
      assert.equal(result.actorId, 'act-1');
      assert.equal(result.idempotencyKey, 'idem-test-1234567890');
      assert.equal(result.mode, 'DRY_RUN_READY');
    }
  });

  it('2. invalid request body -> validation error response 생성', () => {
    const invalidBody = { ...validRequestBody, confirmExecutionOnly: false };
    const result = runFinalApprovalExecutionApiOrchestration(invalidBody);

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.statusCode, 400);
      assert.ok('errors' in result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.ok((result as any).errors.length > 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.ok((result as any).errors.some((e: any) => e.code === 'MISSING_CONFIRMATION'));
    }
  });

  it('3. requestedAt 주입 시 deterministic response 생성', () => {
    const requestedAt = '2026-05-05T00:00:00Z';
    const result = runFinalApprovalExecutionApiOrchestration(validRequestBody, { requestedAt });

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.statusCode, 202);
    }
  });

  it('4. mode 주입 시 response에 반영', () => {
    const result = runFinalApprovalExecutionApiOrchestration(validRequestBody, { mode: 'MOCK' });

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.mode, 'MOCK');
    }
  });

  it('5. 입력 request body mutation 없음', () => {
    const requestBody = { ...validRequestBody, extraField: 'should-not-mutate' };
    const originalJson = JSON.stringify(requestBody);

    runFinalApprovalExecutionApiOrchestration(requestBody);

    assert.equal(JSON.stringify(requestBody), originalJson);
  });

  it('6. output이 plain object인지 확인', () => {
    const result = runFinalApprovalExecutionApiOrchestration(validRequestBody);
    
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
  });
});
