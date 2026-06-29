import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductStructureReviewSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-read-only-product-structure-review-safety-audit-seal-view.service';

const fullStructureReview = {
  readOnlyProductStructureReviewStatus:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE',
  isCapturedDataUsedOnly: true,
  isSummaryReviewResultUsedOnly: true,
  isReadOnlyProductStructureReviewExecutedInThisTask: true,
  fieldReviewItems: [
    { fieldName: 'channelProductNo', fieldPresenceStatus: 'PRESENT' },
    { fieldName: 'productName', fieldPresenceStatus: 'PRESENT' },
    { fieldName: 'leafCategoryId', fieldPresenceStatus: 'PRESENT' },
    {
      fieldName: 'representativeImageUrlPresent',
      fieldPresenceStatus: 'PRESENCE_FLAG_ONLY',
    },
  ],
};

const blockedStructureReview = {
  readOnlyProductStructureReviewStatus:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
  isCapturedDataUsedOnly: true,
  isSummaryReviewResultUsedOnly: true,
  isReadOnlyProductStructureReviewExecutedInThisTask: false,
  fieldReviewItems: [],
};

const mkInput = (structureReview: any) => ({
  structureReview,
  approvalPacket: {
    readOnlyProductStructureReviewApprovalPacketStatus:
      'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY',
  },
  summaryReview: {
    basicProductDataSummaryReviewStatus: 'SUMMARY_REVIEW_COMPLETE',
  },
  captureResult: {
    readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
  },
});

test(
  'NaverReadOnlyProductStructureReviewSafetyAuditSealView (Task 286)',
  async (t) => {
    await t.test('핵심 상태 및 seal 플래그 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_SAFETY_AUDIT_SEALED'
      );
      assert.strictEqual(
        result.isNaverReadOnlyProductStructureReviewSafetyAuditSealed,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyProductStructureReviewResultReady,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyProductStructureReviewApprovalPacketReady,
        true
      );
      assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
      assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
      assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
    });

    await t.test('구조 검토 상태 전달 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(
        result.readOnlyProductStructureReviewStatus,
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE'
      );
    });

    await t.test('차단 상태 전달 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(blockedStructureReview)
      );
      assert.strictEqual(
        result.readOnlyProductStructureReviewStatus,
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'
      );
    });

    await t.test('핵심 감사 플래그 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(result.isStructureReviewConfirmed, true);
      assert.strictEqual(result.isUserApprovalConfirmedForTask285, true);
      assert.strictEqual(result.isCapturedDataUsedOnly, true);
      assert.strictEqual(result.isSummaryReviewResultUsedOnly, true);
      assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
      assert.strictEqual(
        result.isReadOnlyProductStructureReviewReexecutedInThisTask,
        false
      );
      assert.strictEqual(
        result.isProductStructureReviewBuiltFromCapturedData,
        true
      );
    });

    await t.test('옵션/추가상품 구조 비추정 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(
        result.isOptionStructureDetailAvailableInCapturedData,
        false
      );
      assert.strictEqual(
        result.isAdditionalProductStructureDetailAvailableInCapturedData,
        false
      );
      assert.strictEqual(result.isOptionStructureInferred, false);
      assert.strictEqual(result.isAdditionalProductStructureInferred, false);
    });

    await t.test('식별/카테고리 read-only 검토 플래그 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(result.isIdentityStructureReadOnlyReviewed, true);
      assert.strictEqual(result.isCategoryStructureReadOnlyReviewed, true);
      assert.strictEqual(result.isMediaStructurePresenceFlagOnly, true);
      assert.strictEqual(result.isCommercialPresenceFlagOnly, true);
    });

    await t.test('가격/재고 원본 값 제외 및 presence flag only 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(result.isSalePriceRawValueIncluded, false);
      assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
      assert.strictEqual(result.isSalePricePresenceFlagOnly, true);
      assert.strictEqual(result.isStockQuantityPresenceFlagOnly, true);
    });

    await t.test('raw API response 비포함/비저장 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(result.isRawProductApiResponseIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
      assert.strictEqual(result.isRawProductApiResponseStored, false);
    });

    await t.test('이번 Task 미실행 플래그 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
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

    await t.test('실행 잠금 및 DB 저장/수정 경로 부재 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      assert.strictEqual(result.hasExecutionButton, false);
      assert.strictEqual(result.hasSubmitAction, false);
      assert.strictEqual(result.hasWorkerTrigger, false);
      assert.strictEqual(result.hasQueueTrigger, false);
      assert.strictEqual(result.hasAdapterTrigger, false);
      assert.strictEqual(result.isExecutionAllowed, false);
      assert.strictEqual(result.isPostApiConnected, false);
      assert.strictEqual(result.isMutationConnected, false);
    });

    await t.test('auditItems에 권장 상태값 포함 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      const statuses = result.auditItems.map((item) => item.status);
      assert.ok(statuses.includes('STRUCTURE_REVIEW_CONFIRMED'));
      assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_CONFIRMED'));
      assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
      assert.ok(statuses.includes('USER_APPROVAL_CONFIRMED_FOR_TASK_285'));
      assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('NOT_EXECUTED'));
      assert.ok(statuses.includes('NOT_INFERRED'));
      assert.ok(statuses.includes('NOT_AVAILABLE_IN_CAPTURED_DATA'));
      assert.ok(statuses.includes('READ_ONLY_REVIEWED'));
      assert.ok(statuses.includes('PRESENCE_FLAG_ONLY'));
      assert.ok(statuses.includes('NOT_INCLUDED'));
      assert.ok(statuses.includes('NOT_STORED'));
      assert.ok(statuses.includes('NOT_DISPLAYED'));
      assert.ok(statuses.includes('LOCKED'));
      assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
      assert.ok(statuses.includes('READ_ONLY_INFO'));
    });

    await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(fullStructureReview)
      );
      const json = JSON.stringify(result);
      assert.ok(!json.includes('access_token:'), 'access_token 없음');
      assert.ok(!json.includes('client_secret:'), 'client_secret 없음');
      assert.ok(!json.includes('client_id:'), 'client_id 없음');
      assert.ok(!json.toLowerCase().includes('signature:'), 'signature 없음');
      assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 없음');
      assert.ok(!json.includes('"rawProductApiResponse"'), 'raw response 없음');
      assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
      assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
    });

    await t.test('차단 상태에서도 구조 재수행 없이 봉인 검증', () => {
      const result = buildNaverReadOnlyProductStructureReviewSafetyAuditSealView(
        mkInput(blockedStructureReview)
      );
      assert.strictEqual(
        result.isReadOnlyProductStructureReviewReexecutedInThisTask,
        false
      );
      assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
      assert.strictEqual(result.isOptionStructureInferred, false);
      assert.strictEqual(result.isAdditionalProductStructureInferred, false);
      assert.strictEqual(result.isIdentityStructureReadOnlyReviewed, false);
      assert.strictEqual(result.isCategoryStructureReadOnlyReviewed, false);
    });
  }
);
