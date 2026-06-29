import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductDataCaptureResultView } from './sku-keyword-final-approval-execution-naver-read-only-product-data-capture-result-view.service';

// Task 271 결과 mock
const liveRetrySuccess = {
  issuanceRetryStatus: 'SUCCESS',
  productLookupStatus: 'SUCCESS',
  isGwIpNotAllowedResolved: true,
  productLookupReadOnlyInfo: {
    channelProductNo: 'CH-001',
    productName: 'Test Product',
    statusType: 'SALE',
    salePrice: 10000,
    stockQuantity: 5,
    leafCategoryId: 'CAT-123',
    hasRepresentativeImage: true,
    isProductValueDisplayedAsReadOnly: true,
    isProductModified: false,
    isPriceChanged: false,
    isStockChanged: false,
    isDbWriteExecuted: false,
  },
};
const liveRetryTokenFail = { issuanceRetryStatus: 'FAILURE', productLookupStatus: 'SKIPPED', isGwIpNotAllowedResolved: false, productLookupReadOnlyInfo: null };
const liveRetryEnvMissing = { issuanceRetryStatus: 'ENV_MISSING', productLookupStatus: 'SKIPPED', isGwIpNotAllowedResolved: false, productLookupReadOnlyInfo: null };
const liveRetryProductFail = { issuanceRetryStatus: 'SUCCESS', productLookupStatus: 'FAILURE', isGwIpNotAllowedResolved: true, productLookupReadOnlyInfo: null };

const mkInput = (approvalPacketStatus: string, liveRetryResult: any) => ({ approvalPacketStatus, liveRetryResult });

test('NaverReadOnlyProductDataCaptureResultView (Task 276)', async (t) => {
  await t.test('핵심 상태 및 Capture 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.strictEqual(result.status, 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_RESULT_READY');
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureApprovalPacketReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryOutcomeCertificationReady, true);
    assert.strictEqual(result.isNaverProductLookupLiveRetryResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('APPROVAL_PACKET_READY + SUCCESS → CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.strictEqual(result.readOnlyProductDataCaptureApprovalPacketStatus, 'APPROVAL_PACKET_READY');
    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT');
    assert.strictEqual(result.isReadOnlyProductDataCaptureExecuted, true);
    assert.strictEqual(result.isCapturedFromExistingReadOnlyLookupResult, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByGwIpNotAllowed, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByTokenRetryFailure, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByEnvMissing, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByMissingChannelProductNo, false);
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByProductLookupFailure, false);
  });

  await t.test('성공 케이스 capturedProductData 허용 필드만 포함', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.ok(result.capturedProductData !== null);
    assert.strictEqual(result.capturedProductData!.channelProductNo, 'CH-001');
    assert.strictEqual(result.capturedProductData!.productName, 'Test Product');
    assert.strictEqual(result.capturedProductData!.productStatus, 'SALE');
    assert.strictEqual(result.capturedProductData!.salePricePresent, true);
    assert.strictEqual(result.capturedProductData!.stockQuantityPresent, true);
    assert.strictEqual(result.capturedProductData!.leafCategoryId, 'CAT-123');
    assert.strictEqual(result.capturedProductData!.representativeImageUrlPresent, true);

    // 원본 가격/재고 값 자체는 포함되지 않음 (present 플래그만)
    assert.ok(!('salePrice' in result.capturedProductData!), 'salePrice 원본 값 포함 금지');
    assert.ok(!('stockQuantity' in result.capturedProductData!), 'stockQuantity 원본 값 포함 금지');
  });

  await t.test('APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED → CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED', liveRetryTokenFail)
    );

    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureExecuted, false);
    assert.strictEqual(result.capturedProductData, null);
  });

  await t.test('APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE → CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE', liveRetryTokenFail)
    );

    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByTokenRetryFailure, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureExecuted, false);
  });

  await t.test('APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING → CAPTURE_BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING', liveRetryEnvMissing)
    );

    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByEnvMissing, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureExecuted, false);
  });

  await t.test('APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO → CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', liveRetryEnvMissing)
    );

    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByMissingChannelProductNo, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureExecuted, false);
  });

  await t.test('APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE → CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', liveRetryProductFail)
    );

    assert.strictEqual(result.readOnlyProductDataCaptureStatus, 'CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isReadOnlyProductDataCaptureBlockedByProductLookupFailure, true);
    assert.strictEqual(result.isReadOnlyProductDataCaptureExecuted, false);
  });

  await t.test('raw API response 비표시/비저장 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
  });

  await t.test('비노출/비수정/비실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.strictEqual(result.isTokenValueDisplayed, false);
    assert.strictEqual(result.isTokenReturnedToClient, false);
    assert.strictEqual(result.isTokenLoggedToConsole, false);
    assert.strictEqual(result.isTokenStoredInDb, false);
    assert.strictEqual(result.isTokenStoredInFile, false);
    assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    assert.strictEqual(result.isSecretLogged, false);
    assert.strictEqual(result.isSignatureDisplayed, false);
    assert.strictEqual(result.isAuthorizationHeaderDisplayed, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
    assert.strictEqual(result.isReadOnlyProductLookupOnly, true);
  });

  await t.test('실행 잠금 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );

    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.hasQueueTrigger, false);
    assert.strictEqual(result.hasAdapterTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isActualApprovalSubmissionAllowed, false);
    assert.strictEqual(result.isApprovalSubmitted, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('captureItems 권장 상태값 포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );
    const statuses = result.captureItems.map((i) => i.status);

    assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
    assert.ok(statuses.includes('OUTCOME_CERTIFICATION_CONFIRMED'));
    assert.ok(statuses.includes('LIVE_RETRY_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_STATUS_RECORDED'));
    assert.ok(statuses.includes('CAPTURE_ALLOWED_IF_APPROVAL_PACKET_READY'));
    assert.ok(statuses.includes('CAPTURE_ALLOWED_IF_LOOKUP_SUCCESS'));
    assert.ok(statuses.includes('READ_ONLY_DATA_CAPTURED'));
    assert.ok(statuses.includes('CAPTURE_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'));
    assert.ok(statuses.includes('CAPTURE_BLOCKED_RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('CAPTURE_BLOCKED_RECHECK_ENV_REQUIRED'));
    assert.ok(statuses.includes('CAPTURE_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'));
    assert.ok(statuses.includes('CAPTURE_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_ACCESSED'));
    assert.ok(statuses.includes('NOT_MODIFIED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 미포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );
    const json = JSON.stringify(result);

    assert.ok(!json.includes('access_token:'), 'access_token 값 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 값 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 헤더 없음');
    assert.ok(!json.includes('raw error body'), 'raw error body 없음');
    assert.ok(!json.includes('PATH='), 'process.env 전체 출력 없음');
  });

  await t.test('JSON.stringify — raw API response 전체 포함 여부 검증', () => {
    const result = buildNaverReadOnlyProductDataCaptureResultView(
      mkInput('APPROVAL_PACKET_READY', liveRetrySuccess)
    );
    const json = JSON.stringify(result);

    // 원본 API 응답 내 가격/재고 원본 값이 직접 포함되지 않아야 함
    assert.ok(!json.includes('"salePrice":10000'), 'salePrice 원본 값 미포함');
    assert.ok(!json.includes('"stockQuantity":5'), 'stockQuantity 원본 값 미포함');
    // statusType 원본 필드명도 미포함 (productStatus로 rename됨)
    assert.ok(!json.includes('"statusType"'), 'statusType 원본 필드명 미포함');
    assert.ok(!json.includes('"isProductModified"'), 'isProductModified 미포함');
    assert.ok(!json.includes('"isProductValueDisplayedAsReadOnly"'), 'raw flag 미포함');
  });
});
