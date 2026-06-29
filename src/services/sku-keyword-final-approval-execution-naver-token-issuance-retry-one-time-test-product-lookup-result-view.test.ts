import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView } from './sku-keyword-final-approval-execution-naver-token-issuance-retry-one-time-test-product-lookup-result-view.service';
import type { NaverTokenResponse, NaverProductApiResponse } from '@/src/types/naver-product.types';

const mockJob = {
  id: 'test-job-id',
  items: [
    {
      id: 'item-1',
      targetType: 'NAVER_PRODUCT',
      targetId: 'target-1',
      channelProductNo: '12345678',
      status: 'PENDING',
      requestPayload: {},
    },
  ],
};

const mockJobNoChannelNo = {
  id: 'test-job-id',
  items: [
    {
      id: 'item-1',
      targetType: 'NAVER_PRODUCT',
      targetId: 'target-1',
      channelProductNo: null,
      status: 'PENDING',
      requestPayload: {},
    },
  ],
};

const successTokenFetcher = async (_id: string, _secret: string): Promise<NaverTokenResponse> => ({
  access_token: 'MOCK_TOKEN_NEVER_DISPLAYED',
  expires_in: 3600,
  token_type: 'Bearer',
});

const failureTokenFetcher = async (_id: string, _secret: string): Promise<NaverTokenResponse> => {
  throw new Error('네이버 토큰 발급 실패 (403): {"error":"GW.IP_NOT_ALLOWED"}');
};

const successProductFetcher = async (_token: string, _cno: string): Promise<NaverProductApiResponse> =>
  ({
    originProduct: {
      name: '테스트 상품',
      statusType: 'SALE',
      salePrice: 10000,
      stockQuantity: 50,
      leafCategoryId: '50000001',
      images: { representativeImage: { url: 'https://example.com/img.jpg' } },
    },
    smartstoreChannelProduct: { channelProductNo: 12345678 },
  } as unknown as NaverProductApiResponse);

const failureProductFetcher = async (_token: string, _cno: string): Promise<NaverProductApiResponse> => {
  throw new Error('네이버 상품 조회 실패 (401): {"error":"UNAUTHORIZED"}');
};

const mockEnv: Record<string, string | undefined> = {
  NAVER_COMMERCE_CLIENT_ID: 'mock_client_id',
  NAVER_COMMERCE_CLIENT_SECRET: 'mock_client_secret',
};

const emptyEnv: Record<string, string | undefined> = {};

test('NaverTokenIssuanceRetryOneTimeTestProductLookupResultView (Task 271)', async (t) => {
  await t.test('ENV_MISSING — env 없을 때 Token 발급 미실행', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, emptyEnv
    );
    assert.strictEqual(result.issuanceRetryStatus, 'ENV_MISSING');
    assert.strictEqual(result.isTokenIssuanceRetryExecuted, false);
    assert.strictEqual(result.isTokenIssued, false);
    assert.strictEqual(result.productLookupStatus, 'SKIPPED');
    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
  });

  await t.test('Token 발급 실패 (403 GW.IP_NOT_ALLOWED) — 상품 조회 건너뜀', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, failureTokenFetcher, successProductFetcher, mockEnv
    );
    assert.strictEqual(result.issuanceRetryStatus, 'FAILURE');
    assert.strictEqual(result.isTokenIssuanceRetryExecuted, true);
    assert.strictEqual(result.isTokenIssued, false);
    assert.strictEqual(result.isGwIpNotAllowedResolved, false);
    assert.ok(result.sanitizedErrorCode?.includes('GW.IP_NOT_ALLOWED'));
    assert.strictEqual(result.tokenIssuanceHttpStatus, 403);
    assert.strictEqual(result.productLookupStatus, 'SKIPPED');
    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.productLookupReadOnlyInfo, null);
  });

  await t.test('Token 발급 성공 + 상품 조회 성공 — 핵심 플래그', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, mockEnv
    );
    assert.strictEqual(result.issuanceRetryStatus, 'SUCCESS');
    assert.strictEqual(result.isTokenIssued, true);
    assert.strictEqual(result.isGwIpNotAllowedResolved, true);
    assert.strictEqual(result.tokenIssuanceHttpStatus, 200);
    assert.strictEqual(result.tokenTypePresent, true);
    assert.strictEqual(result.expiresInPresent, true);
    assert.strictEqual(result.productLookupStatus, 'SUCCESS');
    assert.strictEqual(result.isProductLookupApiCalled, true);
    assert.strictEqual(result.productLookupHttpStatus, 200);
  });

  await t.test('Token 발급 성공 + 상품 조회 성공 — read-only 상품 정보', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, mockEnv
    );
    const info = result.productLookupReadOnlyInfo;
    assert.ok(info !== null);
    assert.strictEqual(info?.channelProductNo, '12345678');
    assert.strictEqual(info?.productName, '테스트 상품');
    assert.strictEqual(info?.statusType, 'SALE');
    assert.strictEqual(info?.salePrice, 10000);
    assert.strictEqual(info?.stockQuantity, 50);
    assert.strictEqual(info?.hasRepresentativeImage, true);
    assert.strictEqual(info?.isProductValueDisplayedAsReadOnly, true);
    assert.strictEqual(info?.isProductModified, false);
    assert.strictEqual(info?.isPriceChanged, false);
    assert.strictEqual(info?.isStockChanged, false);
    assert.strictEqual(info?.isDbWriteExecuted, false);
  });

  await t.test('Token 발급 성공 + 상품 조회 실패', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, failureProductFetcher, mockEnv
    );
    assert.strictEqual(result.issuanceRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupStatus, 'FAILURE');
    assert.strictEqual(result.productLookupHttpStatus, 401);
    assert.ok(result.productLookupSanitizedErrorCode !== null);
    assert.strictEqual(result.productLookupReadOnlyInfo, null);
  });

  await t.test('Token 발급 성공 + channelProductNo 없음 — 상품 조회 건너뜀', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJobNoChannelNo, successTokenFetcher, successProductFetcher, mockEnv
    );
    assert.strictEqual(result.issuanceRetryStatus, 'SUCCESS');
    assert.strictEqual(result.productLookupStatus, 'NO_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isProductLookupApiCalled, false);
    assert.strictEqual(result.productLookupReadOnlyInfo, null);
  });

  await t.test('안전 플래그 검증 — Token/Secret 비노출', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, mockEnv
    );
    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
    assert.strictEqual(result.isTokenReturnedToClient, false);
    assert.strictEqual(result.isTokenLoggedToConsole, false);
    assert.strictEqual(result.isTokenStored, false);
    assert.strictEqual(result.isEnvValueDisplayed, false);
    assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    assert.strictEqual(result.isSecretLogged, false);
  });

  await t.test('안전 플래그 검증 — DB/수정 미실행', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, mockEnv
    );
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
  });

  await t.test('JSON.stringify — access_token 값 미포함', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, mockEnv
    );
    const json = JSON.stringify(result);
    assert.ok(!json.includes('MOCK_TOKEN_NEVER_DISPLAYED'), 'access_token 실제 값 미포함');
    assert.ok(!json.toLowerCase().includes('bearer mock'), 'Bearer 토큰 값 미포함');
    assert.ok(!json.includes('mock_client_id'), 'client_id 값 미포함');
    assert.ok(!json.includes('mock_client_secret'), 'client_secret 값 미포함');
  });

  await t.test('testResultItems — GW.IP_NOT_ALLOWED 해소 여부 항목 포함 (성공 케이스)', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, successTokenFetcher, successProductFetcher, mockEnv
    );
    const statuses = result.testResultItems.map((i) => i.status);
    assert.ok(statuses.includes('GW_IP_NOT_ALLOWED_RESOLVED'), 'GW_IP_NOT_ALLOWED_RESOLVED 포함');
    assert.ok(statuses.includes('FORBIDDEN'), 'FORBIDDEN 포함 (Token 값 비표시)');
    assert.ok(statuses.includes('NOT_STORED'), 'NOT_STORED 포함 (Token 미저장)');
    assert.ok(statuses.includes('NOT_EXECUTED'), 'NOT_EXECUTED 포함 (상품 수정/DB write 없음)');
    assert.ok(statuses.includes('READ_ONLY_INFO'), 'READ_ONLY_INFO 포함');
  });

  await t.test('testResultItems — GW.IP_NOT_ALLOWED 여전히 차단 (실패 케이스)', async () => {
    const result = await buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
      mockJob, failureTokenFetcher, successProductFetcher, mockEnv
    );
    const statuses = result.testResultItems.map((i) => i.status);
    assert.ok(statuses.includes('GW_IP_NOT_ALLOWED_STILL_BLOCKED'), 'GW_IP_NOT_ALLOWED_STILL_BLOCKED 포함');
  });
});
