import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyProductStructureReviewOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-read-only-product-structure-review-outcome-certification-view.service';

const mkStructureReview = (readOnlyProductStructureReviewStatus: string) => ({
  readOnlyProductStructureReviewStatus,
  isCapturedDataUsedOnly: true,
  isSummaryReviewResultUsedOnly: true,
});

const mkSafetyAuditSeal = () => ({
  isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
});

const mkApprovalPacket = () => ({
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
});

const mkSummaryReview = () => ({
  basicProductDataSummaryReviewStatus: 'SUMMARY_REVIEW_COMPLETE',
});

const mkCaptureResult = () => ({
  readOnlyProductDataCaptureStatus: 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
});

const mkInput = (readOnlyProductStructureReviewStatus: string) => ({
  structureReview: mkStructureReview(readOnlyProductStructureReviewStatus),
  safetyAuditSeal: mkSafetyAuditSeal(),
  approvalPacket: mkApprovalPacket(),
  summaryReview: mkSummaryReview(),
  captureResult: mkCaptureResult(),
});

test(
  'NaverReadOnlyProductStructureReviewOutcomeCertificationView (Task 287)',
  async (t) => {
    await t.test('핵심 상태 및 준비 플래그 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
        );
      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_OUTCOME_CERTIFICATION_READY'
      );
      assert.strictEqual(
        result.isNaverReadOnlyProductStructureReviewOutcomeCertificationReady,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyProductStructureReviewSafetyAuditSealed,
        true
      );
      assert.strictEqual(result.isNaverReadOnlyProductStructureReviewResultReady, true);
      assert.strictEqual(
        result.isNaverReadOnlyProductStructureReviewApprovalPacketReady,
        true
      );
      assert.strictEqual(result.isNaverBasicProductDataSummaryReviewReady, true);
      assert.strictEqual(result.isNaverReadOnlyProductDataCaptureResultReady, true);
      assert.strictEqual(result.isBatchJobResultDisplayOnly, true);
    });

    await t.test('모든 structure review 상태 → outcome certification 상태 매핑 검증', () => {
      const cases = [
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE',
          'CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY',
        ],
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE',
          'CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
        ],
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
          'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
        ],
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
          'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
        ],
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
          'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
        ],
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
          'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
        ],
        [
          'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
          'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
        ],
      ] as const;

      for (const [reviewStatus, outcomeStatus] of cases) {
        const result =
          buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
            mkInput(reviewStatus)
          );
        assert.strictEqual(result.readOnlyProductStructureReviewStatus, reviewStatus);
        assert.strictEqual(
          result.readOnlyProductStructureReviewOutcomeCertificationStatus,
          outcomeStatus
        );
      }
    });

    await t.test('COMPLETE 상태 플래그 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
        );
      assert.strictEqual(
        result.readOnlyProductStructureReviewOutcomeCertificationStatus,
        'CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY'
      );
      assert.strictEqual(result.isCertifiedStructureReviewReadyForCompleteSummary, true);
      assert.strictEqual(
        result.isReadyForNextReadOnlyOptionAdditionalStructureExpansionPlanning,
        true
      );
      assert.strictEqual(result.isMissingFieldNoticeRequired, false);
    });

    await t.test('PARTIAL 상태 플래그 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE')
        );
      assert.strictEqual(
        result.readOnlyProductStructureReviewOutcomeCertificationStatus,
        'CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.strictEqual(
        result.isCertifiedStructureReviewReadyWithMissingFieldNotice,
        true
      );
      assert.strictEqual(
        result.isReadyForNextReadOnlyOptionAdditionalStructureExpansionPlanning,
        true
      );
      assert.strictEqual(result.isMissingFieldNoticeRequired, true);
    });

    await t.test('각 BLOCKED 상태는 해당 플래그만 true', () => {
      const blockedCases = [
        {
          status: 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
          key: 'isCertifiedStructureReviewBlockedByGwIpNotAllowed',
        },
        {
          status: 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
          key: 'isCertifiedStructureReviewBlockedByTokenRetryFailure',
        },
        {
          status: 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
          key: 'isCertifiedStructureReviewBlockedByEnvMissing',
        },
        {
          status: 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
          key: 'isCertifiedStructureReviewBlockedByMissingChannelProductNo',
        },
        {
          status: 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
          key: 'isCertifiedStructureReviewBlockedByProductLookupFailure',
        },
      ] as const;

      for (const blockedCase of blockedCases) {
        const result =
          buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
            mkInput(blockedCase.status)
          ) as unknown as Record<string, unknown>;
        assert.strictEqual(result[blockedCase.key], true);
        assert.strictEqual(
          result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked,
          true
        );
      }
    });

    await t.test('캡처/요약 전용 및 구조 재수행 없음 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
        );
      assert.strictEqual(result.isCapturedDataUsedOnly, true);
      assert.strictEqual(result.isSummaryReviewResultUsedOnly, true);
      assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
      assert.strictEqual(
        result.isReadOnlyProductStructureReviewReexecutedInThisTask,
        false
      );
      assert.strictEqual(result.isProductStructureReviewBuiltFromCapturedData, true);
    });

    await t.test('옵션/추가상품 구조 비추정 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
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

    await t.test('가격/재고 원본 값 및 raw response 비포함 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
        );
      assert.strictEqual(result.isSalePriceRawValueIncluded, false);
      assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
      assert.strictEqual(result.isRawProductApiResponseStored, false);
    });

    await t.test('이번 Task 미실행 플래그 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
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
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
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
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
        );
      const statuses = result.certificationItems.map((item) => item.status);
      assert.ok(statuses.includes('STRUCTURE_SAFETY_AUDIT_SEAL_CONFIRMED'));
      assert.ok(statuses.includes('STRUCTURE_REVIEW_CONFIRMED'));
      assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_CONFIRMED'));
      assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
      assert.ok(statuses.includes('OUTCOME_CERTIFICATION_STATUS_RECORDED'));
      assert.ok(statuses.includes('CERTIFIED_READY_IF_COMPLETE_SUMMARY'));
      assert.ok(
        statuses.includes('CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE')
      );
      assert.ok(
        statuses.includes(
          'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'
        )
      );
      assert.ok(statuses.includes('CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED'));
      assert.ok(statuses.includes('CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED'));
      assert.ok(
        statuses.includes(
          'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
        )
      );
      assert.ok(
        statuses.includes(
          'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'
        )
      );
      assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('NOT_INFERRED'));
      assert.ok(statuses.includes('NOT_AVAILABLE_IN_CAPTURED_DATA'));
      assert.ok(statuses.includes('NOT_INCLUDED'));
      assert.ok(statuses.includes('NOT_DISPLAYED'));
      assert.ok(statuses.includes('NOT_EXECUTED'));
      assert.ok(statuses.includes('LOCKED'));
      assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
      assert.ok(statuses.includes('READ_ONLY_INFO'));
    });

    await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
      const result =
        buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
          mkInput('READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE')
        );
      const json = JSON.stringify(result);
      assert.ok(!json.includes('access_token'), 'access_token 없음');
      assert.ok(!json.includes('client_secret'), 'client_secret 없음');
      assert.ok(!json.includes('client_id'), 'client_id 없음');
      assert.ok(!json.toLowerCase().includes('signature:'), 'signature 없음');
      assert.ok(
        !json.toLowerCase().includes('authorization:'),
        'Authorization 없음'
      );
      assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
      assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
      assert.ok(!json.includes('"rawProductApiResponse"'), 'raw API response 없음');
    });
  }
);
