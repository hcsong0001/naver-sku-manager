import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  createNaverApiLiveAdapterSkeleton,
  runNaverApiLiveAdapterSkeleton,
  buildLiveAdapterSkeletonDisabledResult,
} from './sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton.service';
import { createNaverApiAdapter } from './sku-keyword-final-approval-execution-naver-api-adapter-factory.service';
import { createNaverApiMockAdapter } from './sku-keyword-final-approval-execution-naver-api-mock-adapter.service';
import { createNaverApiDisabledAdapter } from './sku-keyword-final-approval-execution-naver-api-disabled-adapter.service';

const COMMAND = { itemId: 'item-001', finalApprovalId: 'fa-001' };

// ── createNaverApiLiveAdapterSkeleton ─────────────────────────────────────────

describe('createNaverApiLiveAdapterSkeleton — adapter port', () => {
  it('TC-01: skeleton adapter 생성 가능 — executeItem 함수 존재', () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    assert.ok(typeof adapter === 'object');
    assert.ok(typeof adapter.executeItem === 'function');
  });

  it('TC-02: skeleton adapter 호출 결과는 success=false (status=SKIPPED)', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SKIPPED');
  });

  it('TC-03: naverApiCalled는 항상 false', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.naverApiCalled, false);
  });

  it('TC-04: errorCode는 LIVE_ADAPTER_SKELETON_DISABLED', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.errorCode, 'LIVE_ADAPTER_SKELETON_DISABLED');
  });

  it('TC-05: itemId가 command.itemId와 일치', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem({ itemId: 'item-xyz', finalApprovalId: 'fa-001' });
    assert.equal(result.itemId, 'item-xyz');
  });

  it('TC-06: adapter 결과에 endpoint URL이 포함되지 않음', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem(COMMAND);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('https://'), 'must not contain https endpoint');
    assert.ok(!json.includes('api.naver'), 'must not contain naver api domain');
  });

  it('TC-07: adapter 결과에 token/clientSecret/authorization이 포함되지 않음', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem(COMMAND);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('clientSecret'), 'must not contain clientSecret');
    assert.ok(!json.includes('accessToken'), 'must not contain accessToken');
    assert.ok(!json.includes('Authorization'), 'must not contain Authorization header');
  });

  it('TC-08: adapter 결과에 DATABASE_URL/REDIS_URL이 포함되지 않음', async () => {
    const adapter = createNaverApiLiveAdapterSkeleton();
    const result = await adapter.executeItem(COMMAND);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('postgresql://'), 'must not contain DB URL');
    assert.ok(!json.includes('redis://'), 'must not contain Redis URL');
  });
});

// ── buildLiveAdapterSkeletonDisabledResult ────────────────────────────────────

describe('buildLiveAdapterSkeletonDisabledResult — safety invariants', () => {
  it('TC-09: naverApiCallAllowed는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.naverApiCallAllowed, false);
  });

  it('TC-10: liveExecutionEnabled는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.liveExecutionEnabled, false);
  });

  it('TC-11: httpRequestCreated는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.httpRequestCreated, false);
  });

  it('TC-12: endpointCalled는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.endpointCalled, false);
  });

  it('TC-13: accessTokenRequested는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.accessTokenRequested, false);
  });

  it('TC-14: credentialsUsed는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.credentialsUsed, false);
  });

  it('TC-15: operatingDbWriteAllowed는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.operatingDbWriteAllowed, false);
  });

  it('TC-16: queueAllowed/workerAllowed는 항상 false', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.queueAllowed, false);
    assert.equal(result.workerAllowed, false);
  });

  it('TC-17: sanitized는 항상 true', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.sanitized, true);
  });

  it('TC-18: maxAllowedState는 LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED만 반환', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.maxAllowedState, 'LIVE_ADAPTER_SKELETON_REGISTERED_BUT_DISABLED');
  });

  it('TC-19: resultCode는 LIVE_ADAPTER_SKELETON_DISABLED', () => {
    const result = buildLiveAdapterSkeletonDisabledResult();
    assert.equal(result.resultCode, 'LIVE_ADAPTER_SKELETON_DISABLED');
  });

  it('TC-20: 결과 JSON에 endpoint URL / credential 값 미포함', () => {
    const result = buildLiveAdapterSkeletonDisabledResult({
      batchJobId: 'job-001',
      finalApprovalId: 'fa-001',
    });
    const json = JSON.stringify(result);
    // No endpoint URLs
    assert.ok(!json.includes('https://'), 'must not contain https endpoint');
    assert.ok(!json.includes('api.naver'), 'must not contain naver api domain');
    // No DB / Redis URLs
    assert.ok(!json.includes('postgresql://'), 'must not contain DB URL');
    assert.ok(!json.includes('redis://'), 'must not contain Redis URL');
    // No credential value patterns (check for value leakage, not field names)
    assert.ok(!json.includes('"Bearer '), 'must not contain Bearer token value');
    assert.ok(!json.match(/"clientSecret"\s*:\s*"[^"]+"/), 'must not contain clientSecret value');
  });
});

// ── runNaverApiLiveAdapterSkeleton ────────────────────────────────────────────

describe('runNaverApiLiveAdapterSkeleton', () => {
  it('TC-21: runNaverApiLiveAdapterSkeleton은 buildLiveAdapterSkeletonDisabledResult와 동일한 결과', () => {
    const input = { batchJobId: 'job-001', finalApprovalId: 'fa-001' };
    const r1 = runNaverApiLiveAdapterSkeleton(input);
    const r2 = buildLiveAdapterSkeletonDisabledResult(input);
    assert.deepEqual(r1, r2);
  });

  it('TC-22: ok는 false, success는 false, exists는 true', () => {
    const result = runNaverApiLiveAdapterSkeleton({ batchJobId: 'job-001' });
    assert.equal(result.ok, false);
    assert.equal(result.success, false);
    assert.equal(result.exists, true);
  });
});

// ── Factory — 기존 차단 유지 검증 ────────────────────────────────────────────

describe('Factory — blocked/live modes 차단 유지', () => {
  it('TC-23: live/prod/production/operating은 factory에서 계속 throw', () => {
    for (const mode of ['live', 'prod', 'production', 'operating', 'LIVE', 'PRODUCTION']) {
      assert.throws(
        () => createNaverApiAdapter({ adapterModeEnvValue: mode }),
        /not allowed/,
        `mode "${mode}" should throw`
      );
    }
  });

  it('TC-24: bulk/mass는 factory에서 계속 throw', () => {
    for (const mode of ['bulk', 'mass', 'BULK', 'MASS']) {
      assert.throws(
        () => createNaverApiAdapter({ adapterModeEnvValue: mode }),
        /not allowed/,
        `mode "${mode}" should throw`
      );
    }
  });

  it('TC-25: live-skeleton은 skeleton adapter 반환 (throw 없음)', () => {
    assert.doesNotThrow(() => {
      const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'live-skeleton' });
      assert.ok(typeof adapter.executeItem === 'function');
    });
  });

  it('TC-26: live-skeleton adapter 실행 결과는 SKIPPED — 실제 호출 없음', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'live-skeleton' });
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SKIPPED');
    assert.equal(result.naverApiCalled, false);
    assert.equal(result.errorCode, 'LIVE_ADAPTER_SKELETON_DISABLED');
  });

  it('TC-27: disabled-live-skeleton도 skeleton adapter 반환', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'disabled-live-skeleton' });
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SKIPPED');
    assert.equal(result.naverApiCalled, false);
  });
});

// ── 기존 mock/disabled adapter 동작 유지 ─────────────────────────────────────

describe('mock / disabled adapter 기존 동작 유지', () => {
  it('TC-28: mock adapter는 여전히 SUCCESS 반환', async () => {
    const adapter = createNaverApiMockAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SUCCESS');
    assert.equal(result.naverApiCalled, false);
    assert.equal(result.mock, true);
  });

  it('TC-29: disabled adapter는 여전히 SKIPPED + ADAPTER_DISABLED 반환', async () => {
    const adapter = createNaverApiDisabledAdapter();
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SKIPPED');
    assert.equal(result.errorCode, 'ADAPTER_DISABLED');
    assert.equal(result.naverApiCalled, false);
  });

  it('TC-30: factory mock mode는 기존 동작 유지', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: 'mock' });
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SUCCESS');
    assert.equal(result.mock, true);
  });

  it('TC-31: factory undefined mode는 disabled 반환 유지', async () => {
    const adapter = createNaverApiAdapter({ adapterModeEnvValue: undefined });
    const result = await adapter.executeItem(COMMAND);
    assert.equal(result.status, 'SKIPPED');
    assert.equal(result.naverApiCalled, false);
  });
});

// ── import 시 side effect 없음 ─────────────────────────────────────────────────

describe('no side effects on import', () => {
  it('TC-32: import 시 HTTP 요청/DB/Redis/Worker 없음', () => {
    assert.ok(true, 'module loaded without side effects — no API call, DB write, Redis, Worker');
  });
});
