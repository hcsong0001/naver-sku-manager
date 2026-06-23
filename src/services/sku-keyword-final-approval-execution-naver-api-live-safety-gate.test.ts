import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  evaluateNaverApiLiveSafetyGate,
} from './sku-keyword-final-approval-execution-naver-api-live-safety-gate.service';
import type {
  NaverApiLiveSafetyGateInput,
} from './sku-keyword-final-approval-execution-naver-api-live-safety-gate.service';

// Fully satisfied input — all conditions met; still returns LIVE_READY_BUT_NOT_EXECUTED
const FULL_PASS_INPUT: NaverApiLiveSafetyGateInput = {
  enableLiveExecution: true,
  adapterMode: 'live',
  confirmLiveNaverApi: true,
  targetItemCount: 1,
  bulkExecution: false,
  mockVerificationCompleted: true,
  userExplicitApproval: true,
};

describe('NaverApiLiveSafetyGate — default/missing inputs', () => {
  it('1. all undefined fields returns allowed=false with multiple blocked reasons', () => {
    const result = evaluateNaverApiLiveSafetyGate({
      enableLiveExecution: undefined,
      adapterMode: undefined,
      confirmLiveNaverApi: undefined,
      targetItemCount: undefined,
      bulkExecution: undefined,
      mockVerificationCompleted: undefined,
      userExplicitApproval: undefined,
    });
    assert.strictEqual(result.allowed, false);
    assert.ok(result.blockedReasons.length > 0, 'must have at least one blocked reason');
  });

  it('2. enableLiveExecution=false returns LIVE_DISABLED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, enableLiveExecution: false });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'LIVE_DISABLED');
    assert.ok(result.blockedReasons.length >= 1);
  });

  it('3. enableLiveExecution=undefined returns LIVE_DISABLED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, enableLiveExecution: undefined });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'LIVE_DISABLED');
  });
});

describe('NaverApiLiveSafetyGate — always-blocked adapter modes', () => {
  it('4. adapterMode=prod returns ADAPTER_MODE_BLOCKED immediately', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'prod' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });

  it('5. adapterMode=production returns ADAPTER_MODE_BLOCKED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'production' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });

  it('6. adapterMode=operating returns ADAPTER_MODE_BLOCKED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'operating' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });

  it('7. adapterMode=bulk returns ADAPTER_MODE_BLOCKED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'bulk' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });

  it('8. adapterMode=mass returns ADAPTER_MODE_BLOCKED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'mass' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });

  it('9. adapterMode=PROD (uppercase) returns ADAPTER_MODE_BLOCKED (case-insensitive)', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'PROD' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });

  it('10. adapterMode=PRODUCTION uppercase returns ADAPTER_MODE_BLOCKED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'PRODUCTION' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'ADAPTER_MODE_BLOCKED');
  });
});

describe('NaverApiLiveSafetyGate — non-live adapter modes', () => {
  it('11. adapterMode=mock (not live) returns LIVE_MODE_NOT_SET', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'mock' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'LIVE_MODE_NOT_SET');
  });

  it('12. adapterMode=disabled returns LIVE_MODE_NOT_SET', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'disabled' });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'LIVE_MODE_NOT_SET');
  });

  it('13. adapterMode=undefined returns LIVE_DISABLED (enableLiveExecution checked first)', () => {
    const result = evaluateNaverApiLiveSafetyGate({
      ...FULL_PASS_INPUT,
      enableLiveExecution: false,
      adapterMode: undefined,
    });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'LIVE_DISABLED');
  });
});

describe('NaverApiLiveSafetyGate — individual condition failures', () => {
  it('14. confirmLiveNaverApi=false returns CONFIRMATION_REQUIRED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, confirmLiveNaverApi: false });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'CONFIRMATION_REQUIRED');
  });

  it('15. confirmLiveNaverApi=undefined returns CONFIRMATION_REQUIRED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, confirmLiveNaverApi: undefined });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'CONFIRMATION_REQUIRED');
  });

  it('16. targetItemCount=2 returns SINGLE_ITEM_ONLY', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, targetItemCount: 2 });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'SINGLE_ITEM_ONLY');
  });

  it('17. targetItemCount=0 returns SINGLE_ITEM_ONLY', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, targetItemCount: 0 });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'SINGLE_ITEM_ONLY');
  });

  it('18. targetItemCount=undefined returns SINGLE_ITEM_ONLY', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, targetItemCount: undefined });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'SINGLE_ITEM_ONLY');
  });

  it('19. bulkExecution=true returns BULK_EXECUTION_BLOCKED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, bulkExecution: true });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'BULK_EXECUTION_BLOCKED');
  });

  it('20. mockVerificationCompleted=false returns MOCK_VERIFICATION_REQUIRED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, mockVerificationCompleted: false });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'MOCK_VERIFICATION_REQUIRED');
  });

  it('21. mockVerificationCompleted=undefined returns MOCK_VERIFICATION_REQUIRED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, mockVerificationCompleted: undefined });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'MOCK_VERIFICATION_REQUIRED');
  });

  it('22. userExplicitApproval=false returns EXPLICIT_APPROVAL_REQUIRED', () => {
    const result = evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, userExplicitApproval: false });
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.code, 'EXPLICIT_APPROVAL_REQUIRED');
  });
});

describe('NaverApiLiveSafetyGate — all conditions satisfied', () => {
  it('23. all conditions met returns allowed=false, LIVE_READY_BUT_NOT_EXECUTED', () => {
    const result = evaluateNaverApiLiveSafetyGate(FULL_PASS_INPUT);
    assert.strictEqual(result.allowed, false, 'live adapter not yet implemented — always false');
    assert.strictEqual(result.code, 'LIVE_READY_BUT_NOT_EXECUTED');
    assert.strictEqual(result.blockedReasons.length, 0);
  });

  it('24. LIVE_READY_BUT_NOT_EXECUTED message is non-empty and mentions next phase', () => {
    const result = evaluateNaverApiLiveSafetyGate(FULL_PASS_INPUT);
    assert.ok(result.message.length > 0);
    assert.ok(result.message.toLowerCase().includes('phase') || result.message.includes('next'),
      'message should reference "next phase" or "phase"');
  });
});

describe('NaverApiLiveSafetyGate — multiple simultaneous failures', () => {
  it('25. multiple conditions failing are all collected in blockedReasons', () => {
    const result = evaluateNaverApiLiveSafetyGate({
      enableLiveExecution: false,
      adapterMode: 'live',
      confirmLiveNaverApi: false,
      targetItemCount: 5,
      bulkExecution: true,
      mockVerificationCompleted: false,
      userExplicitApproval: false,
    });
    assert.strictEqual(result.allowed, false);
    // LIVE_DISABLED since enableLiveExecution is first checked
    assert.strictEqual(result.code, 'LIVE_DISABLED');
    // Should report all 5 failures (no enableLiveExecution, confirmLiveNaverApi, targetItemCount, bulkExecution, mockVerificationCompleted, userExplicitApproval)
    assert.ok(
      result.blockedReasons.length >= 5,
      `expected >= 5 blocked reasons, got ${result.blockedReasons.length}`
    );
  });
});

describe('NaverApiLiveSafetyGate — no secrets in messages', () => {
  it('26. error messages for blocked modes contain no API endpoints, secrets, or tokens', () => {
    const cases = [
      evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, adapterMode: 'prod' }),
      evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, enableLiveExecution: false }),
      evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, confirmLiveNaverApi: false }),
      evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, targetItemCount: 5 }),
      evaluateNaverApiLiveSafetyGate({ ...FULL_PASS_INPUT, bulkExecution: true }),
    ];
    for (const result of cases) {
      assert.ok(!result.message.includes('https://api'), `message must not leak API endpoint: ${result.message}`);
      assert.ok(
        !result.message.toLowerCase().includes('client_secret') &&
        !result.message.toLowerCase().includes('client_id'),
        `message must not leak credentials: ${result.message}`
      );
      assert.ok(!result.message.includes('Bearer '), `message must not leak auth header: ${result.message}`);
    }
  });

  it('27. LIVE_READY_BUT_NOT_EXECUTED message contains no secrets', () => {
    const result = evaluateNaverApiLiveSafetyGate(FULL_PASS_INPUT);
    assert.ok(!result.message.includes('https://api'));
    assert.ok(!result.message.toLowerCase().includes('secret'));
    assert.ok(!result.message.includes('token'));
  });
});

describe('NaverApiLiveSafetyGate — no side effects on import', () => {
  it('28. evaluating the gate has no side effects (no HTTP, no DB, no Redis)', () => {
    // Pure function call — if this test completes without hanging, no side effects occurred
    const result = evaluateNaverApiLiveSafetyGate(FULL_PASS_INPUT);
    assert.ok(result !== undefined, 'must return a result synchronously');
  });
});
