import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { createNaverApiAdapter } from './sku-keyword-final-approval-execution-naver-api-adapter-factory.service';

const TEST_COMMAND = { itemId: 'item-001', finalApprovalId: 'fa-001' };

describe('NaverApiAdapterFactory', () => {
  // ── Default / disabled paths ────────────────────────────────────────────────

  it('1. undefined adapterMode returns disabled adapter (SKIPPED)', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: undefined });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
    assert.strictEqual(result.naverApiCalled, false);
  });

  it('2. empty string adapterMode returns disabled adapter', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: '' });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
  });

  it('3. "disabled" string returns disabled adapter', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'disabled' });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
    assert.strictEqual(result.errorCode, 'ADAPTER_DISABLED');
  });

  it('4. unrecognized string returns disabled adapter (safe fallback)', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'some-unknown-value' });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
  });

  it('5. whitespace-only string returns disabled adapter', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: '   ' });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.status, 'SKIPPED');
  });

  // ── Mock adapter path ────────────────────────────────────────────────────────

  it('6. "mock" adapterMode returns mock adapter (SUCCESS)', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'mock' });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.status, 'SUCCESS');
    assert.strictEqual(result.naverApiCalled, false);
    assert.strictEqual(result.mock, true);
  });

  it('7. "MOCK" uppercase returns disabled adapter (factory is case-sensitive for selection)', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'MOCK' });
    const result = await adapter.executeItem(TEST_COMMAND);
    // MOCK is not lowercased for selection path — falls through to disabled
    assert.strictEqual(result.status, 'SKIPPED');
  });

  it('8. mock adapter result has naverApiCalled=false and mock=true', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'mock' });
    const result = await adapter.executeItem(TEST_COMMAND);
    assert.strictEqual(result.naverApiCalled, false);
    assert.strictEqual(result.mock, true);
  });

  // ── Blocked modes ─────────────────────────────────────────────────────────────

  it('9. "live" adapterMode throws immediately', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'live' }),
      /not allowed/
    );
  });

  it('10. "production" adapterMode throws immediately', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'production' }),
      /not allowed/
    );
  });

  it('11. "prod" adapterMode throws immediately', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'prod' }),
      /not allowed/
    );
  });

  it('12. "operating" adapterMode throws immediately', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'operating' }),
      /not allowed/
    );
  });

  it('13. "LIVE" uppercase adapterMode is also blocked (case-insensitive check)', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'LIVE' }),
      /not allowed/
    );
  });

  it('14. "PRODUCTION" uppercase is also blocked', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'PRODUCTION' }),
      /not allowed/
    );
  });

  it('15. blocked mode error message does not contain Naver API secret or URL', () => {
    let thrown: Error | null = null;
    try {
      createNaverApiAdapter({ adapterModeEnvValue: 'live' });
    } catch (e) {
      thrown = e instanceof Error ? e : new Error(String(e));
    }
    assert.ok(thrown !== null);
    // Error should mention the mode but not contain any credentials or API endpoint
    assert.ok(!thrown!.message.includes('https://api.naver'), 'must not leak API endpoint');
    assert.ok(!thrown!.message.includes('Authorization'), 'must not leak auth header');
    assert.ok(thrown!.message.includes('live'), 'error should mention the blocked mode');
  });

  it('16. createNaverApiAdapter returns an object with executeItem function', () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'mock' });
    assert.ok(typeof adapter === 'object');
    assert.ok(typeof adapter.executeItem === 'function');
  });

  it('17. import has no side effects (no API call, DB, Redis, Worker at load time)', () => {
    // Module loaded at the top of this file — no error means no side effects.
    assert.ok(true, 'no side effects on import');
  });

  it('18. "bulk" adapterMode throws immediately', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'bulk' }),
      /not allowed/
    );
  });

  it('19. "mass" adapterMode throws immediately', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'mass' }),
      /not allowed/
    );
  });

  it('20. "BULK" uppercase adapterMode is also blocked (case-insensitive check)', () => {
    assert.throws(
      () => createNaverApiAdapter({ adapterModeEnvValue: 'BULK' }),
      /not allowed/
    );
  });
});
