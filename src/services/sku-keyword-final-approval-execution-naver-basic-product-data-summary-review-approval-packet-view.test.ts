import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverBasicProductDataSummaryReviewApprovalPacketView } from './sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-approval-packet-view.service';

const mkCert = (readOnlyProductDataCompletenessCertificationStatus: string) => ({
  readOnlyProductDataCompletenessCertificationStatus,
});
const mkInput = (certStatus: string) => ({
  completenessCertification: mkCert(certStatus),
  completenessReview: { readOnlyProductDataCompletenessStatus: 'BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW' },
  safetyAuditSeal: { isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true },
  captureResult: { readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT' },
});

test('NaverBasicProductDataSummaryReviewApprovalPacketView (Task 280)', async (t) => {
  await t.test('핵심 상태 및 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.status, 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_APPROVAL_PACKET_READY');
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewApprovalPacketReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCompletenessCertificationReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureCompletenessReviewReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureSafetyAuditSealed, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('COMPLETE → APPROVAL_PACKET_READY_FOR_COMPLETE_DATA', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.readOnlyProductDataCompletenessCertificationStatus, 'CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW');
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_READY_FOR_COMPLETE_DATA');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketReadyForCompleteData, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketReadyWithMissingFieldNotice, false);
  });

  await t.test('PARTIAL → APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketReadyWithMissingFieldNotice, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketReadyForCompleteData, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED → APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketBlockedByGwIpNotAllowed, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketReadyForCompleteData, false);
  });

  await t.test('CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE → APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketBlockedByTokenRetryFailure, true);
  });

  await t.test('CERTIFIED_BLOCKED_BY_ENV_MISSING → APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BLOCKED_BY_ENV_MISSING')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketBlockedByEnvMissing, true);
  });

  await t.test('CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO → APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketBlockedByMissingChannelProductNo, true);
  });

  await t.test('CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE → APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE')
    );
    assert.strictEqual(result.basicProductDataSummaryReviewApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE');
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalPacketBlockedByProductLookupFailure, true);
  });

  await t.test('승인 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalRequired, true);
    assert.strictEqual(result.isBasicProductDataSummaryReviewApprovalGranted, false);
    assert.strictEqual(result.isUserApprovalPhraseReceivedForBasicProductDataSummaryReview, false);
    assert.strictEqual(result.isBasicProductDataSummaryReviewExecutedInThisTask, false);
  });

  await t.test('가격/재고 원본 값 비포함, raw API response 비포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
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
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.hasApprovalRequestButton, false);
  });

  await t.test('packetItems 권장 상태값 포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    const statuses = result.packetItems.map((i) => i.status);
    assert.ok(statuses.includes('COMPLETENESS_CERTIFICATION_CONFIRMED'));
    assert.ok(statuses.includes('COMPLETENESS_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('SAFETY_AUDIT_SEAL_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('APPROVAL_PACKET_STATUS_RECORDED'));
    assert.ok(statuses.includes('READY_FOR_SUMMARY_REVIEW_IF_COMPLETE'));
    assert.ok(statuses.includes('READY_WITH_MISSING_FIELD_NOTICE'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_ENV_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'));
    assert.ok(statuses.includes('BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'));
    assert.ok(statuses.includes('PENDING_USER_APPROVAL'));
    assert.ok(statuses.includes('LOCKED_UNTIL_USER_APPROVAL'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('사용자 승인 문구 안내 Task 281 기준 포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
    );
    assert.ok(result.userApprovalPhraseGuide.includes('Task 281'));
    assert.ok(!result.isBasicProductDataSummaryReviewApprovalGranted, '이번 Task에서 승인 처리 안 함');
    assert.ok(!result.isUserApprovalPhraseReceivedForBasicProductDataSummaryReview);
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewApprovalPacketView(
      mkInput('CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW')
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
