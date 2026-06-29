import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductStructureReviewView } from './sku-keyword-final-approval-execution-naver-read-only-product-structure-review-view.service';

const mkApprovalPacket = (readOnlyProductStructureReviewApprovalPacketStatus: string) => ({
  readOnlyProductStructureReviewApprovalPacketStatus,
});

const fullSummary = {
  channelProductNo: 'CH-001',
  productName: '테스트 상품',
  productStatus: 'SALE',
  leafCategoryId: 'CAT-1',
  salePricePresent: true,
  stockQuantityPresent: true,
  representativeImageUrlPresent: true,
};

const partialSummary = {
  channelProductNo: 'CH-001',
  productName: null,
  productStatus: 'SALE',
  leafCategoryId: null,
  salePricePresent: true,
  stockQuantityPresent: false,
  representativeImageUrlPresent: false,
};

const mkSummaryReview = (basicProductDataSummary: any) => ({
  basicProductDataSummary,
});

const mkInput = (packetStatus: string, basicProductDataSummary?: any) => ({
  approvalPacketView: mkApprovalPacket(packetStatus),
  outcomeCertification: {
    basicProductDataSummaryReviewOutcomeCertificationStatus:
      'CERTIFIED_SUMMARY_REVIEW_COMPLETE',
  },
  summaryReview: mkSummaryReview(basicProductDataSummary ?? null),
  captureResult: {
    capturedProductData: basicProductDataSummary ?? null,
  },
});

test('NaverReadOnlyProductStructureReviewView (Task 285)', async (t) => {
  await t.test('핵심 상태 및 준비 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    assert.strictEqual(
      result.status,
      'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_READY'
    );
    assert.strictEqual(result.isNaverReadOnlyProductStructureReviewReady, true);
    assert.strictEqual(
      result.isNaverReadOnlyProductStructureReviewApprovalPacketReady,
      true
    );
    assert.strictEqual(
      result.isNaverBasicProductDataSummaryReviewOutcomeCertificationReady,
      true
    );
    assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
    assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
    assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
  });

  await t.test('READY_FOR_COMPLETE_SUMMARY → COMPLETE', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    assert.strictEqual(
      result.readOnlyProductStructureReviewStatus,
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE'
    );
    assert.strictEqual(result.isReadOnlyProductStructureReviewComplete, true);
    assert.strictEqual(
      result.isReadOnlyProductStructureReviewWithMissingFieldNotice,
      false
    );
    assert.strictEqual(result.isReadOnlyProductStructureReviewExecutedInThisTask, true);
    assert.strictEqual(result.isReadOnlyProductStructureSummaryAvailable, true);
    assert.strictEqual(result.isChannelProductNoPresent, true);
    assert.strictEqual(result.isProductNamePresent, true);
    assert.strictEqual(result.isProductStatusPresent, true);
    assert.strictEqual(result.isLeafCategoryIdPresent, true);
  });

  await t.test('READY_WITH_MISSING_FIELD_NOTICE → WITH_MISSING_FIELD_NOTICE', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE', partialSummary)
    );
    assert.strictEqual(
      result.readOnlyProductStructureReviewStatus,
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE'
    );
    assert.strictEqual(
      result.isReadOnlyProductStructureReviewWithMissingFieldNotice,
      true
    );
    assert.strictEqual(result.isReadOnlyProductStructureReviewComplete, false);
    assert.strictEqual(result.isReadOnlyProductStructureReviewExecutedInThisTask, true);
    assert.strictEqual(result.isProductNamePresent, false);
    assert.strictEqual(result.isLeafCategoryIdPresent, false);
  });

  await t.test('각 BLOCKED 상태 매핑 검증', () => {
    const cases = [
      [
        'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        'isReadOnlyProductStructureReviewBlockedByGwIpNotAllowed',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        'isReadOnlyProductStructureReviewBlockedByTokenRetryFailure',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
        'isReadOnlyProductStructureReviewBlockedByEnvMissing',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        'isReadOnlyProductStructureReviewBlockedByMissingChannelProductNo',
      ],
      [
        'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        'isReadOnlyProductStructureReviewBlockedByProductLookupFailure',
      ],
    ] as const;

    for (const [packetStatus, reviewStatus, flagKey] of cases) {
      const result = buildNaverReadOnlyProductStructureReviewView(
        mkInput(packetStatus, null)
      ) as unknown as Record<string, unknown>;
      assert.strictEqual(result.readOnlyProductStructureReviewStatus, reviewStatus);
      assert.strictEqual(result[flagKey], true);
      assert.strictEqual(result.isReadOnlyProductStructureReviewExecutedInThisTask, false);
      assert.strictEqual(result.isReadOnlyProductStructureSummaryAvailable, false);
    }
  });

  await t.test('presence flag only 및 원본 값 비포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    assert.strictEqual(result.isRepresentativeImagePresenceFlagOnly, true);
    assert.strictEqual(result.isSalePricePresenceFlagOnly, true);
    assert.strictEqual(result.isStockQuantityPresenceFlagOnly, true);
    assert.strictEqual(result.isSalePriceRawValueIncluded, false);
    assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
  });

  await t.test('raw API response 비포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    assert.strictEqual(result.isRawProductApiResponseIncluded, false);
    assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
    assert.strictEqual(result.isRawProductApiResponseStored, false);
  });

  await t.test('기존 캡처/요약 결과만 사용 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    assert.strictEqual(result.isCapturedDataUsedOnly, true);
    assert.strictEqual(result.isSummaryReviewResultUsedOnly, true);
  });

  await t.test('이번 Task 미실행 플래그 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
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
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    assert.strictEqual(result.hasExecutionButton, false);
    assert.strictEqual(result.hasSubmitAction, false);
    assert.strictEqual(result.hasWorkerTrigger, false);
    assert.strictEqual(result.isExecutionAllowed, false);
    assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
    assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
  });

  await t.test('fieldReviewItems 구조 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    const flagOnly = result.fieldReviewItems.filter(
      (item) => item.fieldPresenceStatus === 'PRESENCE_FLAG_ONLY'
    );
    const flagNames = flagOnly.map((item) => item.fieldName);
    assert.ok(flagNames.includes('representativeImageUrlPresent'));
    assert.ok(flagNames.includes('salePricePresent'));
    assert.ok(flagNames.includes('stockQuantityPresent'));
  });

  await t.test('reviewItems 권장 상태값 포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
    );
    const statuses = result.reviewItems.map((item) => item.status);
    assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
    assert.ok(statuses.includes('OUTCOME_CERTIFICATION_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_REVIEW_CONFIRMED'));
    assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
    assert.ok(statuses.includes('STRUCTURE_REVIEW_STATUS_RECORDED'));
    assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
    assert.ok(statuses.includes('SUMMARY_DATA_ONLY_CONFIRMED'));
    assert.ok(statuses.includes('STRUCTURE_FIELD_REVIEWED'));
    assert.ok(statuses.includes('PRESENCE_FLAG_ONLY'));
    assert.ok(statuses.includes('NOT_INCLUDED'));
    assert.ok(statuses.includes('NOT_DISPLAYED'));
    assert.ok(statuses.includes('NOT_EXECUTED'));
    assert.ok(statuses.includes('LOCKED'));
    assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
    assert.ok(statuses.includes('READ_ONLY_INFO'));
  });

  await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
    const result = buildNaverReadOnlyProductStructureReviewView(
      mkInput('APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY', fullSummary)
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
