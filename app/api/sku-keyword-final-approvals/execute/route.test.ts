import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';
import { POST } from './route';

describe('POST /api/sku-keyword-final-approvals/execute', () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    originalEnv = process.env.ENABLE_FINAL_APPROVAL_EXECUTION;
  });

  afterEach(() => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = originalEnv;
  });

  const createMockRequest = (body: unknown): Request => {
    return new Request('http://localhost:3000/api/sku-keyword-final-approvals/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  it('1. feature flag off이면 403 guard response 반환', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'false';
    const req = createMockRequest({});
    
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 403);
    assert.equal(json.success, false);
    assert.equal(json.guardCode, 'FINAL_APPROVAL_NOT_ACTIVE');
  });

  it('2. 정상 body + feature flag on이면 202 accepted', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
    const validBody = {
      finalApprovalId: 'fa-1',
      actorId: 'act-1',
      confirmExecutionOnly: true,
      acknowledgement: true,
      idempotencyKey: 'idem-1234567890'
    };
    const req = createMockRequest(validBody);
    
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 202);
    assert.equal(json.success, true);
    assert.equal(json.finalApprovalId, 'fa-1');
  });

  it('3. invalid body + feature flag on이면 400 validation error', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
    const invalidBody = {
      finalApprovalId: 'fa-1'
    };
    const req = createMockRequest(invalidBody);
    
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 400);
    assert.equal(json.success, false);
    assert.ok(json.errors.length > 0);
  });

  it('4. invalid JSON body 입력 시 400 에러 처리', async () => {
    process.env.ENABLE_FINAL_APPROVAL_EXECUTION = 'true';
    const req = new Request('http://localhost:3000/api/sku-keyword-final-approvals/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json'
    });
    
    const response = await POST(req);
    const json = await response.json();

    assert.equal(response.status, 400);
    assert.equal(json.success, false);
    assert.equal(json.errors[0].code, 'INVALID_JSON');
  });
});
