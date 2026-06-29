import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverBasicProductDataSummaryReviewView } from './sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-view.service';

const mkPacket = (basicProductDataSummaryReviewApprovalPacketStatus: string) => ({
  basicProductDataSummaryReviewApprovalPacketStatus,
});

const fullCaptureResult = {
  readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
  capturedProductData: {
    channelProductNo: 'CH-001',
    productName: 'Test Product',
    productStatus: 'SALE',
    leafCategoryId: 'CAT-123',
    salePricePresent: true,
    stockQuantityPresent: true,
    representativeImageUrlPresent: true,
  },
};

const mkInput = (packetStatus: string, captureResult = fullCaptureResult) => ({
  approvalPacketView: mkPacket(packetStatus),
  captureResult,
});

test('NaverBasicProductDataSummaryReviewView (Task 281)', async (t) => {
  await t.test('핵심 상태 및 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    assert.strictEqual(result.status, 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_READY');
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewApprovalPacketReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCompletenessCertificationReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
    assert.strictEqual(result.isCapturedDataUsedOnly, true);
    assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
  });

  await t.test('COMPLETE → SUMMARY_REVIEW_COMPLETE, 요약 데이터 포함', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_COMPLETE');
    assert.strictEqual(result.isSummaryReviewComplete, true);
    assert.strictEqual(result.isSummaryReviewWithMissingFieldNotice, false);
    assert.strictEqual(result.isBasicProductDataSummaryAvailable, true);
    assert.ok(result.basicProductDataSummary !== null);
    assert.strictEqual(result.basicProductDataSummary!.channelProductNo, 'CH-001');
    assert.strictEqual(result.basicProductDataSummary!.productName, 'Test Product');
    assert.strictEqual(result.basicProductDataSummary!.productStatus, 'SALE');
    assert.strictEqual(result.basicProductDataSummary!.leafCategoryId, 'CAT-123');
    assert.strictEqual(result.basicProductDataSummary!.salePricePresent, true);
    assert.strictEqual(result.basicProductDataSummary!.stockQuantityPresent, true);
    assert.strictEqual(result.basicProductDataSummary!.representativeImageUrlPresent, true);
  });

  await t.test('PARTIAL → SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE, 요약 데이터 포함', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE');
    assert.strictEqual(result.isSummaryReviewWithMissingFieldNotice, true);
    assert.strictEqual(result.isBasicProductDataSummaryAvailable, true);
    assert.ok(result.basicProductDataSummary !== null);
  });

  await t.test('BLOCKED_BY_GW_IP_NOT_ALLOWED → SUMMARY_REVIEW_BLOCKED, 요약 데이터 없음', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isSummaryReviewBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isBasicProductDataSummaryAvailable, false);
    assert.strictEqual(result.basicProductDataSummary, null);
  });

  await t.test('BLOCKED_BY_TOKEN_RETRY_FAILURE → SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isSummaryReviewBlockedByTokenRetryFailure, true);
    assert.strictEqual(result.isBasicProductDataSummaryAvailable, false);
  });

  await t.test('BLOCKED_BY_ENV_MISSING → SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isSummaryReviewBlockedByEnvMissing, true);
  });

  await t.test('BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO → SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isSummaryReviewBlockedByMissingChannelProductNo, true);
  });

  await t.test('BLOCKED_BY_PRODUCT_LOOKUP_FAILURE → SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isSummaryReviewBlockedByProductLookupFailure, true);
  });

  await t.test('요약 데이터에 가격/재고 원본 값 비포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
    // basicProductDataSummary에 salePrice/stockQuantity 원본 없음
    const summaryKeys = Object.keys(result.basicProductDataSummary!);
    assert.ok(!summaryKeys.includes('salePrice'), 'salePrice 원본 없음');
    assert.ok(!summaryKeys.includes('stockQuantity'), 'stockQuantity 원본 없음');
    assert.ok(summaryKeys.includes('salePricePresent'), 'salePricePresent 존재');
    assert.ok(summaryKeys.includes('stockQuantityPresent'), 'stockQuantityPresent 존재');
  });

  await t.test('raw API response 비포함 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isTokenValueIncludedInView, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
  });

  await t.test('실행 잠금 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('reviewItems 권장 상태값 포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    const statuses = result.reviewItems.map((i) => i.status);
    assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
    assert.ok(statuses.includes('COMPLETENESS_CERTIFICATION_CONFIRMED'));
    assert.ok(statuses.includes('COMPLETENESS_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('SAFETY_AUDIT_SEAL_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_REVIEW_STATUS_RECORDED'));
    assert.ok(statuses.includes('CAPTURED_DATA_ONLY'));
    assert.ok(statuses.includes('SUMMARY_FIELD_REVIEWED'));
    assert.ok(statuses.includes('PRESENCE_FLAG_ONLY'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_DATA')
    );
    const json = JSON.stringify(result);
    assert.ok(!json.includes('access_token:'), 'access_token 없음');
    assert.ok(!json.includes('client_secret:'), 'client_secret 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 없음');
    assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
    assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
    assert.ok(!json.includes('"rawProductApiResponse"'), 'raw API response 없음');
    assert.ok(!json.includes('PATH='), 'process.env 없음');
  });
});
