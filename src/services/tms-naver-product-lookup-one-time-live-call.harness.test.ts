import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

import {
  runTmsNaverProductLookupOneTimeLiveCall,
  TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_REQUIRED_APPROVAL_PHRASE,
  TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_FIXED_TARGET_PRODUCT_NO,
} from './tms-naver-product-lookup-one-time-live-call.harness';

const VALID_INPUT = {
  targetProductNo: TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_FIXED_TARGET_PRODUCT_NO,
  maxLookupCallCount: 1,
  explicitApprovalPhrase: TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_REQUIRED_APPROVAL_PHRASE,
};

function makeMockDeps(overrides?: {
  tokenOk?: boolean;
  lookupOk?: boolean;
  productNoMatched?: boolean | null;
}) {
  const tokenOk = overrides?.tokenOk ?? true;
  const lookupOk = overrides?.lookupOk ?? true;
  const productNoMatched = overrides?.productNoMatched ?? true;

  let issueTokenCalls = 0;
  let lookupProductCalls = 0;

  return {
    deps: {
      issueToken: async () => {
        issueTokenCalls += 1;
        if (!tokenOk) {
          return { ok: false, httpStatusCode: 401, accessToken: null, errorCategory: 'TOKEN_REQUEST_FAILED' };
        }
        return { ok: true, httpStatusCode: 200, accessToken: 'mock-access-token', errorCategory: null };
      },
      lookupProduct: async () => {
        lookupProductCalls += 1;
        if (!lookupOk) {
          return {
            ok: false,
            httpStatusCode: 404,
            responseShapeKeys: [],
            productNoMatched: null,
            errorCategory: 'PRODUCT_LOOKUP_FAILED',
          };
        }
        return {
          ok: true,
          httpStatusCode: 200,
          responseShapeKeys: ['originProduct', 'smartstoreChannelProduct'],
          productNoMatched,
          errorCategory: null,
        };
      },
      getClientCredentials: () => ({ clientId: 'mock-client-id', clientSecret: 'mock-client-secret' }),
    },
    getCallCounts: () => ({ issueTokenCalls, lookupProductCalls }),
  };
}

describe('Task 409 - Naver Product Lookup One-Time Live Call Harness', () => {
  it('승인 문구가 다르면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(
      { ...VALID_INPUT, explicitApprovalPhrase: '다른 문구입니다.' },
      deps
    );
    assert.equal(summary.liveCallAttempted, false);
    assert.equal(summary.actualLookupCallCount, 0);
    assert.equal(summary.sanitizedErrorMessage, 'APPROVAL_PHRASE_MISMATCH');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('targetProductNo가 6597910207이 아니면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(
      { ...VALID_INPUT, targetProductNo: '9999999999' },
      deps
    );
    assert.equal(summary.liveCallAttempted, false);
    assert.equal(summary.sanitizedErrorMessage, 'TARGET_PRODUCT_NO_MISMATCH');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('maxLookupCallCount가 1 초과이면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(
      { ...VALID_INPUT, maxLookupCallCount: 2 },
      deps
    );
    assert.equal(summary.liveCallAttempted, false);
    assert.equal(summary.sanitizedErrorMessage, 'MAX_LOOKUP_CALL_COUNT_EXCEEDS_LIMIT');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('mock lookup client가 1회만 호출된다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 1, lookupProductCalls: 1 });
  });

  it('raw response를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.rawResponseStored, false);
    assert.equal(summary.rawResponseDisplayed, false);
    assert.deepEqual(summary.responseShapeKeys, ['originProduct', 'smartstoreChannelProduct']);
    const serialized = JSON.stringify(summary);
    assert.equal(serialized.includes('originProduct.name'), false);
  });

  it('secret/token/header/signature를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.secretExposed, false);
    assert.equal(summary.tokenExposed, false);
    assert.equal(summary.authorizationHeaderExposed, false);
    const serialized = JSON.stringify(summary);
    assert.equal(serialized.includes('mock-access-token'), false);
    assert.equal(serialized.includes('mock-client-secret'), false);
  });

  it('성공 결과가 masked summary로만 반환된다', async () => {
    const { deps } = makeMockDeps({ tokenOk: true, lookupOk: true, productNoMatched: true });
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.liveCallAttempted, true);
    assert.equal(summary.actualLookupCallCount, 1);
    assert.equal(summary.success, true);
    assert.equal(summary.httpStatusCode, 200);
    assert.equal(summary.productNoMatched, true);
    assert.equal(summary.sanitizedErrorMessage, null);
  });

  it('실패 결과가 sanitized error summary로만 반환된다', async () => {
    const { deps } = makeMockDeps({ lookupOk: false });
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.success, false);
    assert.equal(summary.httpStatusCode, 404);
    assert.equal(summary.sanitizedErrorMessage, 'PRODUCT_LOOKUP_FAILED');
    assert.deepEqual(summary.responseShapeKeys, []);
  });

  it('토큰 발급 실패 시에도 상품 조회를 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps({ tokenOk: false });
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.liveCallAttempted, true);
    assert.equal(summary.actualLookupCallCount, 0);
    assert.equal(summary.success, false);
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 1, lookupProductCalls: 0 });
  });

  it('product update client가 호출되지 않는다 (결과 플래그로 검증)', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.productUpdateCalled, false);
    assert.equal(summary.priceChanged, false);
    assert.equal(summary.stockChanged, false);
  });

  it('DB write 함수가 존재하지 않거나 호출되지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupOneTimeLiveCall(VALID_INPUT, deps);
    assert.equal(summary.dbWritten, false);

    const harnessSource = readFileSync(
      new URL('./tms-naver-product-lookup-one-time-live-call.harness.ts', import.meta.url),
      'utf-8'
    );
    assert.equal(/prisma/i.test(harnessSource), false, 'harness must not reference prisma');
    assert.equal(/@prisma\/client/.test(harnessSource), false, 'harness must not import @prisma/client');
  });
});
