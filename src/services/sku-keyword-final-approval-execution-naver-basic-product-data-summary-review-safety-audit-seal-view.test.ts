import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverBasicProductDataSummaryReviewSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-safety-audit-seal-view.service';

const mkSummaryReview = (status: string) => ({ basicProductDataSummaryReviewStatus: status });
const mkApprovalPacket = () => ({ isNaverBasicProductDataSummaryReviewApprovalPacketReady: true });
const mkCaptureResult = () => ({ readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT' });

const mkInput = (reviewStatus: string) => ({
  summaryReview: mkSummaryReview(reviewStatus),
  approvalPacket: mkApprovalPacket(),
  captureResult: mkCaptureResult(),
});

test('NaverBasicProductDataSummaryReviewSafetyAuditSealView (Task 282)', async (t) => {
  await t.test('핵심 상태 및 seal 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.status, 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_SAFETY_AUDIT_SEALED');
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewSafetyAuditSealed, true);
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewApprovalPacketReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('요약 검토 상태 전달 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_COMPLETE');
  });

  await t.test('PARTIAL 상태 전달 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewStatus, 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE');
  });

  await t.test('BLOCKED 상태들 전달 검증', () => {
    const blockedStates = [
      'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
      'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
      'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
      'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
      'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    ];
    for (const state of blockedStates) {
      const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(mkInput(state));
      assert.strictEqual(result.basicProductDataSummaryReviewStatus, state);
    }
  });

  await t.test('기존 캡처 데이터 전용 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isSummaryReviewConfirmed, true);
    assert.strictEqual(result.isCapturedDataUsedOnly, true);
    assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
    assert.strictEqual(result.isBasicProductDataSummaryViewOnly, true);
  });

  await t.test('가격/재고 원본 값 비포함 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
    assert.strictEqual(result.isSalePricePresenceFlagOnly, true);
    assert.strictEqual(result.isStockQuantityPresenceFlagOnly, true);
  });

  await t.test('raw API response 비포함 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
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
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
  });

  await t.test('auditItems 권장 상태값 포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    const statuses = result.auditItems.map((i) => i.status);
    assert.ok(statuses.includes('SUMMARY_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_REVIEW_STATUS_RECORDED'));
    assert.ok(statuses.includes('BASIC_SUMMARY_VIEW_ONLY'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('PRESENCE_FLAG_ONLY'));
    assert.ok(statuses.includes('NOT_STORED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewSafetyAuditSealView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
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
