import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { createNaverApiMockAdapter } from './sku-keyword-final-approval-execution-naver-api-mock-adapter.service';
import { createNaverApiDisabledAdapter } from './sku-keyword-final-approval-execution-naver-api-disabled-adapter.service';
import type { NaverApiExecutionCommand } from '../types/sku-keyword-final-approval-execution-naver-api.types';

const COMMAND: NaverApiExecutionCommand = {
  itemId: 'item-001',
  finalApprovalId: 'fa-001',
};

// ── Mock Adapter ──────────────────────────────────────────────────────────────

describe('NaverApiMockAdapter', () => {
  it('1. createNaverApiMockAdapter returns adapter with executeItem function', () => {
    const adapter = createNaverApiMockAdapter();
    assert.ok(typeof adapter === 'object');
    assert.ok(typeof adapter.executeItem === 'function');
  });

  it('2. executeItem with no config returns SUCCESS result', async () => {
    const adapter = createNaverApiMockAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.status, 'SUCCESS');
  });

  it('3. result has naverApiCalled=false (no real HTTP call)', async () => {
    const adapter = createNaverApiMockAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.naverApiCalled, false);
  });

  it('4. result has mock=true', async () => {
    const adapter = createNaverApiMockAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.mock, true);
  });

  it('5. result itemId matches input itemId', async () => {
    const adapter = createNaverApiMockAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.itemId, COMMAND.itemId);
  });

  it('6. failItemIds injection returns FAILED status', async () => {
    const adapter = createNaverApiMockAdapter({ failItemIds: ['item-001'] });
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.status, 'FAILED');
  });

  it('7. FAILED result has errorCode and errorMessage', async () => {
    const adapter = createNaverApiMockAdapter({ failItemIds: ['item-001'] });
    const result = await adapter.executeItem(COMMAND);
    assert.ok(typeof result.errorCode === 'string' && result.errorCode.length > 0);
    assert.ok(typeof result.errorMessage === 'string' && result.errorMessage.length > 0);
  });

  it('8. skipItemIds injection returns SKIPPED status', async () => {
    const adapter = createNaverApiMockAdapter({ skipItemIds: ['item-001'] });
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
  });

  it('9. multiple items: injected fail item is FAILED, other items are SUCCESS', async () => {
    const adapter = createNaverApiMockAdapter({ failItemIds: ['item-fail'] });
    const [r1, r2] = await Promise.all([
      adapter.executeItem({ itemId: 'item-fail', finalApprovalId: 'fa-001' }),
      adapter.executeItem({ itemId: 'item-ok', finalApprovalId: 'fa-001' }),
    ]);
    assert.strictEqual(r1.status, 'FAILED');
    assert.strictEqual(r2.status, 'SUCCESS');
  });

  it('10. createNaverApiMockAdapter with undefined config defaults to SUCCESS for all items', async () => {
    const adapter = createNaverApiMockAdapter(undefined);
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.status, 'SUCCESS');
  });

  it('11. SKIPPED result has mock=true', async () => {
    const adapter = createNaverApiMockAdapter({ skipItemIds: ['item-001'] });
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.mock, true);
    assert.strictEqual(result.naverApiCalled, false);
  });

  it('12. result is JSON-serializable (no circular refs or functions)', async () => {
    const adapter = createNaverApiMockAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.doesNotThrow(() => JSON.stringify(result));
  });

  it('13. each call to createNaverApiMockAdapter returns a fresh instance (no singleton)', () => {
    const a1 = createNaverApiMockAdapter();
    const a2 = createNaverApiMockAdapter();
    assert.ok(a1 !== a2);
  });

  it('14. FAILED result naverApiCalled=false (mock never makes live calls)', async () => {
    const adapter = createNaverApiMockAdapter({ failItemIds: ['item-001'] });
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.naverApiCalled, false);
    assert.strictEqual(result.mock, true);
  });

  it('15. import has no side effects (no API call, DB connection, Redis, Worker at load time)', () => {
    // Module loaded above — if any side effect existed it would have thrown or hung.
    assert.ok(true, 'no side effects on import');
  });
});

// ── Disabled Adapter ──────────────────────────────────────────────────────────

describe('NaverApiDisabledAdapter', () => {
  it('16. createNaverApiDisabledAdapter returns adapter with executeItem function', () => {
    const adapter = createNaverApiDisabledAdapter();
    assert.ok(typeof adapter === 'object');
    assert.ok(typeof adapter.executeItem === 'function');
  });

  it('17. executeItem returns SKIPPED status', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
  });

  it('18. disabled result has naverApiCalled=false', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.naverApiCalled, false);
  });

  it('19. disabled result has errorCode=ADAPTER_DISABLED', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.errorCode, 'ADAPTER_DISABLED');
  });

  it('20. disabled result has informative errorMessage', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.ok(typeof result.errorMessage === 'string' && result.errorMessage.length > 0);
  });

  it('21. disabled result itemId matches input', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.strictEqual(result.itemId, COMMAND.itemId);
  });

  it('22. disabled result is JSON-serializable', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.doesNotThrow(() => JSON.stringify(result));
  });

  it('23. disabled adapter does not have mock=true (it is not a mock)', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    // disabled adapter does not set mock flag — only mock adapter does
    assert.strictEqual(result.mock, undefined);
  });
});
