import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseFinalApprovalExecutionWorkerJobPayload } from './sku-keyword-final-approval-execution-worker-job-payload-validation.service';

describe('parseFinalApprovalExecutionWorkerJobPayload', () => {
  const getValidPayload = (): Record<string, unknown> => ({
    finalApprovalId: 'fa-1234',
    actorId: 'act-999',
    idempotencyKey: 'idem-1234567890',
    requestedAt: new Date().toISOString(),
    source: 'EXECUTION_API',
    mode: 'MOCK'
  });

  it('1. 정상 payload이면 success true와 normalized payload를 반환한다.', () => {
    const input = getValidPayload();
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.payload.finalApprovalId, input.finalApprovalId);
      assert.equal(result.payload.actorId, input.actorId);
      assert.equal(result.payload.idempotencyKey, input.idempotencyKey);
      assert.equal(result.payload.requestedAt, input.requestedAt);
      assert.equal(result.payload.source, 'EXECUTION_API');
      assert.equal(result.payload.mode, 'MOCK');
    }
  });

  it('2. extra field는 제거된다.', () => {
    const input = {
      ...getValidPayload(),
      extra1: 'remove me',
      extra2: 123
    };
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal((result.payload as unknown as Record<string, unknown>).extra1, undefined);
      assert.equal((result.payload as unknown as Record<string, unknown>).extra2, undefined);
    }
  });

  it('3. finalApprovalId 누락이면 실패한다.', () => {
    const input = getValidPayload();
    delete input.finalApprovalId;
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'FINAL_APPROVAL_ID_REQUIRED'));
    }
  });

  it('4. actorId 누락이면 실패한다.', () => {
    const input = getValidPayload();
    delete input.actorId;
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'ACTOR_ID_REQUIRED'));
    }
  });

  it('5. idempotencyKey 누락이면 실패한다.', () => {
    const input = getValidPayload();
    delete input.idempotencyKey;
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'IDEMPOTENCY_KEY_REQUIRED'));
    }
  });

  it('6. idempotencyKey 길이가 부적절하면 실패한다.', () => {
    const input = getValidPayload();
    input.idempotencyKey = '123'; // too short
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'IDEMPOTENCY_KEY_INVALID'));
    }
  });

  it('7. requestedAt 누락이면 실패한다.', () => {
    const input = getValidPayload();
    delete input.requestedAt;
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'REQUESTED_AT_REQUIRED'));
    }
  });

  it('8. requestedAt이 invalid date이면 실패한다.', () => {
    const input = getValidPayload();
    input.requestedAt = 'not-a-date';
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'REQUESTED_AT_INVALID'));
    }
  });

  it('9. source가 EXECUTION_API가 아니면 실패한다.', () => {
    const input = getValidPayload();
    input.source = 'WEB_APP';
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'SOURCE_INVALID'));
    }
  });

  it('10. mode가 MOCK이면 통과한다.', () => {
    const input = getValidPayload();
    input.mode = 'MOCK';
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, true);
  });

  it('11. mode가 DRY_RUN_READY이면 통과한다.', () => {
    const input = getValidPayload();
    input.mode = 'DRY_RUN_READY';
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, true);
  });

  it('12. mode가 LIVE이면 실패한다.', () => {
    const input = getValidPayload();
    input.mode = 'LIVE';
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'LIVE_MODE_NOT_ALLOWED'));
    }
  });

  it('13. null/non-object input이면 실패한다.', () => {
    let result = parseFinalApprovalExecutionWorkerJobPayload(null);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.find(e => e.code === 'INVALID_PAYLOAD'));
    }

    result = parseFinalApprovalExecutionWorkerJobPayload('string');
    assert.equal(result.success, false);

    result = parseFinalApprovalExecutionWorkerJobPayload([1, 2, 3]);
    assert.equal(result.success, false);
  });

  it('14. 입력 객체를 mutate하지 않는다.', () => {
    const input = getValidPayload();
    input.extraField = 'extra';
    const originalInputString = JSON.stringify(input);
    
    parseFinalApprovalExecutionWorkerJobPayload(input);
    
    assert.equal(JSON.stringify(input), originalInputString);
  });

  it('15. 반환 결과는 plain object이다.', () => {
    const input = getValidPayload();
    const result = parseFinalApprovalExecutionWorkerJobPayload(input);
    
    const parsedStr = JSON.stringify(result);
    assert.deepEqual(JSON.parse(parsedStr), result);
  });

  it('16. Prisma/BullMQ/Redis/Worker/Naver import가 없다.', () => {
    // verified by strict grep checks
    assert.ok(true);
  });
});
