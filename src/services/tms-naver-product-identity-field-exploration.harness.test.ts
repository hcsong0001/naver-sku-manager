import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

import {
  runTmsNaverProductIdentityFieldExploration,
  TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_REQUIRED_APPROVAL_PHRASE,
  TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_PRODUCT_NO,
} from './tms-naver-product-identity-field-exploration.harness';

const VALID_INPUT = {
  targetProductNo: TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_PRODUCT_NO,
  maxRecallCount: 1,
  explicitApprovalPhrase: TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_REQUIRED_APPROVAL_PHRASE,
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
        originProductNo: 'ORIGIN-0207',
        detail: {
          id: 'DETAIL-0207',
        },
        name: '노출되면 안 되는 상품명',
      },
      smartstoreChannelProduct: {
        channelProductNo: 6597910207,
        product: {
          id: 'PRODUCT-0207',
          sellerManagementCode: 'SELLER-CODE-0207',
        },
        channelProductDisplayNo: 6597910207,
        optionName: '노출되면 안 되는 옵션명',
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

describe('Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집 Harness', () => {
  it('lookupRecallCount가 1을 초과하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);

    assert.equal(summary.lookupRecallCount <= 1, true);
    assert.equal(summary.lookupRecallCount, 1);
  });

  it('targetProductNo는 6597910207로 고정된다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);

    assert.equal(summary.targetProductNo, '6597910207');
  });

  it('승인 문구가 다르면 API 호출하지 않는다', async () => {
    const { deps, getCallCounts } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(
      { ...VALID_INPUT, explicitApprovalPhrase: '다른 승인 문구' },
      deps
    );

    assert.equal(summary.executed, false);
    assert.equal(summary.sanitizedErrorMessage, 'APPROVAL_PHRASE_MISMATCH');
    assert.deepEqual(getCallCounts(), { issueTokenCalls: 0, lookupProductCalls: 0 });
  });

  it('raw response 전체를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);
    const serialized = JSON.stringify(summary);

    assert.equal(summary.rawResponseDisplayed, false);
    assert.equal(summary.rawResponseStored, false);
    assert.equal(serialized.includes('노출되면 안 되는 상품명'), false);
    assert.equal(serialized.includes('노출되면 안 되는 옵션명'), false);
  });

  it('secret/token/header/signature를 반환하지 않는다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);
    const serialized = JSON.stringify(summary);

    assert.equal(summary.secretExposed, false);
    assert.equal(summary.tokenExposed, false);
    assert.equal(summary.authorizationHeaderExposed, false);
    assert.equal(summary.signatureExposed, false);
    assert.equal(serialized.includes('mock-access-token'), false);
    assert.equal(serialized.includes('mock-client-secret'), false);
  });

  it('candidate 값은 maskedPreviewLast4와 equalsTargetProductNo 중심의 마스킹 결과만 포함한다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);
    const firstCandidate = summary.candidateFieldResults[0];

    assert.ok(firstCandidate);
    assert.deepEqual(Object.keys(firstCandidate).sort(), [
      'equalsTargetProductNo',
      'exists',
      'maskedPreviewLast4',
      'path',
      'rawResponseAccessedForDisplay',
      'rawValueDisplayed',
      'rawValueStored',
      'valueType',
    ]);
  });

  it('equalsTargetProductNo true + confidence 100이면 match confirmed다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);

    assert.equal(summary.productIdentityConfidenceScore, 100);
    assert.equal(summary.productIdentityMatchConfirmed, true);
  });

  it('식별 실패 상황이면 product identity match는 false다', async () => {
    const { deps } = makeMockDeps({
      responseBody: {
        originProduct: { nested: { opaqueId: { value: 1 } } },
        smartstoreChannelProduct: { anotherProductNo: { nested: true } },
      },
    });
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);

    assert.equal(summary.productIdentityMatchConfirmed, false);
    assert.equal(summary.productIdentityConfidenceScore, 70);
  });

  it('상품 수정 API/가격/재고/DB write 관련 동작이 없다', async () => {
    const { deps } = makeMockDeps();
    const summary = await runTmsNaverProductIdentityFieldExploration(VALID_INPUT, deps);
    const harnessSource = readFileSync(
      new URL('./tms-naver-product-identity-field-exploration.harness.ts', import.meta.url),
      'utf-8'
    );

    assert.equal(summary.productUpdateCalled, false);
    assert.equal(summary.priceChanged, false);
    assert.equal(summary.stockChanged, false);
    assert.equal(summary.dbWritten, false);
    assert.equal(/prisma/i.test(harnessSource), false, 'harness must not reference prisma');
    assert.equal(/@prisma\/client/.test(harnessSource), false, 'harness must not import @prisma/client');
  });
});
