import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverBasicProductDataSummaryReviewOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-outcome-certification-view.service';

const mkSummaryReview = (basicProductDataSummaryReviewStatus: string) => ({
  basicProductDataSummaryReviewStatus,
});
const mkSafetyAuditSeal = () => ({
  isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true,
});
const mkApprovalPacket = () => ({
  isNaverBasicProductDataSummaryReviewApprovalPacketReady: true,
});
const mkCaptureResult = () => ({
  readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
});

const mkInput = (basicProductDataSummaryReviewStatus: string) => ({
  summaryReview: mkSummaryReview(basicProductDataSummaryReviewStatus),
  safetyAuditSeal: mkSafetyAuditSeal(),
  approvalPacket: mkApprovalPacket(),
  captureResult: mkCaptureResult(),
});

test('NaverBasicProductDataSummaryReviewOutcomeCertificationView (Task 283)', async (t) => {
  await t.test('핵심 상태 및 준비 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(
      result.status,
      'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_OUTCOME_CERTIFICATION_READY'
    );
    assert.strictEqual(
      result.isNaverBasicProductDataSummaryReviewOutcomeCertificationReady,
      true
    );
    assert.strictEqual(
      result.isNaverBasicProductDataSummaryReviewSafetyAuditSealed,
      true
    );
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
    assert.strictEqual(
      result.isNaverBasicProductDataSummaryReviewApprovalPacketReady,
      true
    );
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('모든 summary review 상태 → outcome certification 상태 매핑 검증', () => {
    const cases = [
      ['SUMMARY_REVIEW_COMPLETE', 'CERTIFIED_SUMMARY_REVIEW_COMPLETE'],
      [
        'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE',
        'CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE',
      ],
      [
        'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
      ],
      [
        'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
      ],
      [
        'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
      ],
      [
        'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
      ],
      [
        'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
      ],
    ] as const;

    for (const [summaryStatus, outcomeStatus] of cases) {
      const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
        mkInput(summaryStatus)
      );
      assert.strictEqual(result.basicProductDataSummaryReviewStatus, summaryStatus);
      assert.strictEqual(
        result.basicProductDataSummaryReviewOutcomeCertificationStatus,
        outcomeStatus
      );
    }
  });

  await t.test('COMPLETE 상태 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(
      result.basicProductDataSummaryReviewOutcomeCertificationStatus,
      'CERTIFIED_SUMMARY_REVIEW_COMPLETE'
    );
    assert.strictEqual(result.isCertifiedSummaryReadyForCompleteData, true);
    assert.strictEqual(result.isCertifiedSummaryReadyWithMissingFieldNotice, false);
    assert.strictEqual(result.isReadyForNextReadOnlyProductStructureReview, true);
    assert.strictEqual(result.isNextReadOnlyProductStructureReviewBlocked, false);
    assert.strictEqual(result.isMissingFieldNoticeRequired, false);
  });

  await t.test('PARTIAL 상태 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE')
    );
    assert.strictEqual(
      result.basicProductDataSummaryReviewOutcomeCertificationStatus,
      'CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE'
    );
    assert.strictEqual(result.isCertifiedSummaryReadyForCompleteData, false);
    assert.strictEqual(result.isCertifiedSummaryReadyWithMissingFieldNotice, true);
    assert.strictEqual(result.isReadyForNextReadOnlyProductStructureReview, true);
    assert.strictEqual(result.isNextReadOnlyProductStructureReviewBlocked, false);
    assert.strictEqual(result.isMissingFieldNoticeRequired, true);
  });

  await t.test('각 BLOCKED 상태는 해당 플래그만 true', () => {
    const blockedCases = [
      {
        status: 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        key: 'isCertifiedSummaryBlockedByGwIpNotAllowed',
      },
      {
        status: 'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        key: 'isCertifiedSummaryBlockedByTokenRetryFailure',
      },
      {
        status: 'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
        key: 'isCertifiedSummaryBlockedByEnvMissing',
      },
      {
        status: 'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        key: 'isCertifiedSummaryBlockedByMissingChannelProductNo',
      },
      {
        status: 'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        key: 'isCertifiedSummaryBlockedByProductLookupFailure',
      },
    ] as const;

    for (const blockedCase of blockedCases) {
      const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
        mkInput(blockedCase.status)
      ) as unknown as Record<string, unknown>;
      assert.strictEqual(result[blockedCase.key], true);
      assert.strictEqual(result.isReadyForNextReadOnlyProductStructureReview, false);
      assert.strictEqual(result.isNextReadOnlyProductStructureReviewBlocked, true);
      assert.strictEqual(result.isCertifiedSummaryReadyForCompleteData, false);
      assert.strictEqual(result.isCertifiedSummaryReadyWithMissingFieldNotice, false);
    }
  });

  await t.test('기존 캡처 데이터 및 view-only 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isCapturedDataUsedOnly, true);
    assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
    assert.strictEqual(result.isBasicProductDataSummaryViewOnly, true);
    assert.strictEqual(result.isSalePricePresenceFlagOnly, true);
    assert.strictEqual(result.isStockQuantityPresenceFlagOnly, true);
  });

  await t.test('가격/재고 원본 값 및 raw response 비포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.isTokenReissuedInThisTask, false);
    assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
    assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
    assert.strictEqual(result.isNaverApiCalledInThisTask, false);
    assert.strictEqual(result.isProductUpdateApiCalled, false);
    assert.strictEqual(result.isPriceOrStockChanged, false);
    assert.strictEqual(result.isDbWriteExecuted, false);
    assert.strictEqual(result.isDbUpsertExecuted, false);
    assert.strictEqual(result.isDbUpdateExecuted, false);
  });

  await t.test('실행 잠금 플래그 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isActualApprovalSubmissionAllowed, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('certificationItems 권장 상태값 포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    const statuses = result.certificationItems.map((item) => item.status);
    assert.ok(statuses.includes('SAFETY_AUDIT_SEAL_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('OUTCOME_CERTIFICATION_STATUS_RECORDED'));
    assert.ok(statuses.includes('CERTIFIED_READY_IF_COMPLETE'));
    assert.ok(statuses.includes('CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE'));
    assert.ok(
      statuses.includes('CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED')
    );
    assert.ok(statuses.includes('CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED'));
    assert.ok(statuses.includes('CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED'));
    assert.ok(
      statuses.includes(
        'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
      )
    );
    assert.ok(
      statuses.includes('CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED')
    );
    assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(
      mkInput('SUMMARY_REVIEW_COMPLETE')
    );
    const json = JSON.stringify(result);
    assert.ok(!json.includes('access_token'), 'access_token 없음');
    assert.ok(!json.includes('client_secret'), 'client_secret 없음');
    assert.ok(!json.includes('client_id'), 'client_id 없음');
    assert.ok(!json.toLowerCase().includes('bearer '), 'Bearer 토큰 없음');
    assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 없음');
    assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
    assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
    assert.ok(!json.includes('"rawProductApiResponse"'), 'raw API response 없음');
  });
});
