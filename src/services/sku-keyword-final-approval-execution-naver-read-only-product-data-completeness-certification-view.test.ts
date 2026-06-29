import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductDataCompletenessCertificationView } from './sku-keyword-final-approval-execution-naver-read-only-product-data-completeness-certification-view.service';

const mkReview = (readOnlyProductDataCompletenessStatus: string) => ({
  readOnlyProductDataCompletenessStatus,
});
const auditSeal = { isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true };
const captureResult = { readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT' };

const mkInput = (completenessStatus: string) => ({
  completenessReview: mkReview(completenessStatus),
  safetyAuditSeal: auditSeal,
  captureResult,
});

test('NaverReadOnlyProductDataCompletenessCertificationView (Task 279)', async (t) => {
  await t.test('핵심 상태 및 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.status, 'NAVER_READ_ONLY_PRODUCT_DATA_COMPLETENESS_CERTIFICATION_READY');
    assert.strictEqual(result.isNaverReadOnlyProductDataCompletenessCertificationReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureCompletenessReviewReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureSafetyAuditSealed, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('COMPLETE → CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessStatus, 'BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW');
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW');
    assert.strictEqual(result.isCertifiedBasicProductDataCompleteForReview, true);
    assert.strictEqual(result.isCertifiedBasicProductDataPartialForReview, false);
    assert.strictEqual(result.isReadyForBasicProductDataSummaryReview, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, false);
    assert.strictEqual(result.isMissingFieldNoticeRequired, false);
  });

  await t.test('PARTIAL → CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW');
    assert.strictEqual(result.isCertifiedBasicProductDataPartialForReview, true);
    assert.strictEqual(result.isCertifiedBasicProductDataCompleteForReview, false);
    assert.strictEqual(result.isReadyForBasicProductDataSummaryReview, true);
    assert.strictEqual(result.isMissingFieldNoticeRequired, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, false);
  });

  await t.test('BLOCKED_BY_GW_IP_NOT_ALLOWED → CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isCertifiedBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, true);
    assert.strictEqual(result.isReadyForBasicProductDataSummaryReview, false);
    assert.strictEqual(result.isCertifiedBasicProductDataCompleteForReview, false);
  });

  await t.test('BLOCKED_BY_TOKEN_RETRY_FAILURE → CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_BLOCKED_BY_TOKEN_RETRY_FAILURE')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isCertifiedBlockedByTokenRetryFailure, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, true);
  });

  await t.test('BLOCKED_BY_ENV_MISSING → CERTIFIED_BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_BLOCKED_BY_ENV_MISSING')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isCertifiedBlockedByEnvMissing, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, true);
  });

  await t.test('BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO → CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isCertifiedBlockedByMissingChannelProductNo, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, true);
  });

  await t.test('BLOCKED_BY_PRODUCT_LOOKUP_FAILURE → CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isCertifiedBlockedByProductLookupFailure, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewBlocked, true);
  });

  await t.test('가격/재고 원본 값 비포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
  });

  await t.test('raw API response 비포함 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
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
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('certificationItems 권장 상태값 포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    const statuses = result.certificationItems.map((i) => i.status);
    assert.ok(statuses.includes('COMPLETENESS_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('SAFETY_AUDIT_SEAL_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('CERTIFICATION_STATUS_RECORDED'));
    assert.ok(statuses.includes('READY_IF_COMPLETE'));
    assert.ok(statuses.includes('REVIEW_ALLOWED_WITH_MISSING_FIELD_NOTICE'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_ENV_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverReadOnlyProductDataCompletenessCertificationView(
      mkInput('BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
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
