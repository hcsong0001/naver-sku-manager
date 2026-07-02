import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

import {
  runTmsNaverProductLookupMaskedResponseShapeAugmentation,
  TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_CANDIDATE_PATHS,
  TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REQUIRED_APPROVAL_PHRASE,
  TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_PRODUCT_NO,
} from './tms-naver-product-lookup-masked-response-shape-augmentation.harness';

const VALID_INPUT = {
  targetProductNo: TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_PRODUCT_NO,
  maxRecallCount: 1,
  explicitApprovalPhrase:
    TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REQUIRED_APPROVAL_PHRASE,
};

function makeMockDeps(overrides?: {
  tokenOk?: boolean;
  lookupOk?: boolean;
  responseBody?: Record<string, unknown> | null;
}) {
  const tokenOk = overrides?.tokenOk ?? true;
  const lookupOk = overrides?.lookupOk ?? true;
  const responseBody =
    overrides?.responseBody ??
    ({
      originProduct: {
        originProductNo: '1234500207',
        id: 'ORIGIN-0207',
        productNo: null,
        name: '노출되면 안 되는 상품명',
        optionName: '노출되면 안 되는 옵션명',
      },
      smartstoreChannelProduct: {
        channelProductNo: 6597910207,
        id: 'SMART-0207',
        productNo: 6597910207,
        originProductNo: '1234500207',
        sellerManagementCode: 'SELLER-CODE-0207',
      },
    } satisfies Record<string, unknown>);

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
            responseBody: null,
            errorCategory: 'PRODUCT_LOOKUP_FAILED',
          };
        }

        return {
          ok: true,
          httpStatusCode: 200,
          responseBody,
          errorCategory: null,
        };
      },
      getClientCredentials: () => ({ clientId: 'mock-client-id', clientSecret: 'mock-client-secret' }),
    },
    getCallCounts: () => ({ issueTokenCalls, lookupProductCalls }),
  };
}

describe('Task 416 - Naver Product Lookup Masked Response Shape Augmentation Harness', () => {
  it('승인 문구가 다르면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(
      { ...VALID_INPUT, explicitApprovalPhrase: '다른 승인 문구' },
      deps
    );

    assert.equal(summary.augmentationAttempted, false);
    assert.equal(summary.actualRecallCount, 0);
    assert.equal(summary.sanitizedErrorMessage, 'APPROVAL_PHRASE_MISMATCH');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('targetProductNo가 6597910207이 아니면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(
      { ...VALID_INPUT, targetProductNo: '9999999999' },
      deps
    );

    assert.equal(summary.augmentationAttempted, false);
    assert.equal(summary.sanitizedErrorMessage, 'TARGET_PRODUCT_NO_MISMATCH');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('maxRecallCount가 1 초과이면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(
      { ...VALID_INPUT, maxRecallCount: 2 },
      deps
    );

    assert.equal(summary.augmentationAttempted, false);
    assert.equal(summary.sanitizedErrorMessage, 'MAX_RECALL_COUNT_EXCEEDS_LIMIT');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('mock lookup client가 1회만 호출된다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 1, lookupProductCalls: 1 });
  });

  it('raw response를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.rawResponseDisplayed, false);
    assert.equal(summary.rawResponseStored, false);
    const serialized = JSON.stringify(summary);
    assert.equal(serialized.includes('노출되면 안 되는 상품명'), false);
    assert.equal(serialized.includes('smartstoreChannelProduct.channelProductNo'), true);
  });

  it('secret/token/header/signature를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.secretExposed, false);
    assert.equal(summary.tokenExposed, false);
    assert.equal(summary.authorizationHeaderExposed, false);
    assert.equal(summary.signatureExposed, false);
    const serialized = JSON.stringify(summary);
    assert.equal(serialized.includes('mock-access-token'), false);
    assert.equal(serialized.includes('mock-client-secret'), false);
  });

  it('full product name/full option name/full seller management code를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);
    const serialized = JSON.stringify(summary);

    assert.equal(serialized.includes('노출되면 안 되는 상품명'), false);
    assert.equal(serialized.includes('노출되면 안 되는 옵션명'), false);
    assert.equal(serialized.includes('SELLER-CODE-0207'), false);
  });

  it('candidate path 결과가 masked summary로만 반환된다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.success, true);
    assert.equal(summary.candidatePathResults.length, 7);
    assert.deepEqual(
      summary.candidatePathResults.map((result) => result.candidatePath),
      [...TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_CANDIDATE_PATHS]
    );
  });

  it('maskedPreviewLast4가 마지막 4자리만 표시한다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);
    const matched = summary.candidatePathResults.find(
      (result) => result.candidatePath === 'smartstoreChannelProduct.channelProductNo'
    );

    assert.equal(matched?.maskedPreviewLast4, '****0207');
  });

  it('equalsTargetProductNo가 boolean으로 계산된다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);
    const matched = summary.candidatePathResults.find(
      (result) => result.candidatePath === 'smartstoreChannelProduct.channelProductNo'
    );
    const mismatched = summary.candidatePathResults.find(
      (result) => result.candidatePath === 'originProduct.originProductNo'
    );

    assert.equal(matched?.equalsTargetProductNo, true);
    assert.equal(mismatched?.equalsTargetProductNo, false);
  });

  it('productIdentityConfidenceScore가 산정된다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.productIdentityConfidenceScore, 100);
    assert.equal(summary.productIdentityMatchConfirmed, true);
  });

  it('candidate path exists는 있으나 판정 불가면 confidence 70을 준다', async () => {
    const { deps } = makeMockDeps({
      responseBody: {
        originProduct: {},
        smartstoreChannelProduct: {
          channelProductNo: { opaque: true },
          id: null,
        },
      },
    });
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.productIdentityConfidenceScore, 70);
    assert.equal(summary.productIdentityMatchConfirmed, false);
  });

  it('candidate path가 모두 없고 top-level keys만 있으면 confidence 30을 준다', async () => {
    const { deps } = makeMockDeps({
      responseBody: {
        originProduct: {},
        smartstoreChannelProduct: {},
      },
    });
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.productIdentityConfidenceScore, 30);
    assert.equal(summary.productIdentityMatchConfirmed, false);
  });

  it('성공 결과가 masked augmentation summary로만 반환된다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.augmentationAttempted, true);
    assert.equal(summary.actualRecallCount, 1);
    assert.equal(summary.httpStatusCode, 200);
    assert.deepEqual(summary.responseShapeKeys, ['originProduct', 'smartstoreChannelProduct']);
    assert.equal(summary.sanitizedErrorMessage, null);
  });

  it('실패 결과가 sanitized error summary로만 반환된다', async () => {
    const { deps } = makeMockDeps({ lookupOk: false });
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.augmentationAttempted, true);
    assert.equal(summary.success, false);
    assert.equal(summary.httpStatusCode, 404);
    assert.equal(summary.sanitizedErrorMessage, 'PRODUCT_LOOKUP_FAILED');
    assert.deepEqual(summary.candidatePathResults, []);
  });

  it('product update client가 호출되지 않는다 (결과 플래그로 검증)', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);

    assert.equal(summary.productUpdateCalled, false);
    assert.equal(summary.priceChanged, false);
    assert.equal(summary.stockChanged, false);
  });

  it('DB write 함수가 존재하지 않거나 호출되지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation(VALID_INPUT, deps);
    const harnessSource = readFileSync(
      new URL('./tms-naver-product-lookup-masked-response-shape-augmentation.harness.ts', import.meta.url),
      'utf-8'
    );

    assert.equal(summary.dbWritten, false);
    assert.equal(/prisma/i.test(harnessSource), false, 'harness must not reference prisma');
    assert.equal(/@prisma\/client/.test(harnessSource), false, 'harness must not import @prisma/client');
  });
});
