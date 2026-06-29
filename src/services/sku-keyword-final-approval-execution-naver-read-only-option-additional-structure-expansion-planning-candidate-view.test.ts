import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView } from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-planning-candidate-view.service';

const mkOutcomeCertification = (
  readOnlyProductStructureReviewOutcomeCertificationStatus: string
) => ({
  readOnlyProductStructureReviewOutcomeCertificationStatus,
  isProductStructureReviewBuiltFromCapturedData: true,
});

const mkInput = (
  readOnlyProductStructureReviewOutcomeCertificationStatus: string
) => ({
  outcomeCertification: mkOutcomeCertification(
    readOnlyProductStructureReviewOutcomeCertificationStatus
  ),
  safetyAuditSeal: {
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
  },
  structureReview: {
    isNaverReadOnlyProductStructureReviewReady: true,
  },
  approvalPacket: {
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
  },
  summaryReview: {
    isNaverBasicProductDataSummaryReviewReady: true,
  },
  captureResult: {
    isNaverReadOnlyProductDataCaptureResultReady: true,
  },
});

test(
  'NaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView (Task 288)',
  async (t) => {
    await t.test('핵심 상태 및 참조 Task 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY'
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateReady,
        true
      );
      assert.strictEqual(result.currentTaskNumber, 288);
      assert.deepStrictEqual(result.referenceTaskNumbers, [
        287, 286, 285, 284, 281, 276,
      ]);
    });

    await t.test('COMPLETE 인증 상태 → 설계 후보 true', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      assert.strictEqual(
        result.optionAdditionalStructureExpansionPlanningCandidateStatus,
        'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
      );
      assert.strictEqual(result.isPlanningCandidateReadyForCompleteSummary, true);
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        true
      );
    });

    await t.test('PARTIAL 인증 상태 → 설계 후보 true + missing field notice 유지', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE')
        );
      assert.strictEqual(
        result.optionAdditionalStructureExpansionPlanningCandidateStatus,
        'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.strictEqual(
        result.isPlanningCandidateReadyWithMissingFieldNotice,
        true
      );
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        true
      );
      assert.strictEqual(result.isMissingFieldNoticeRequired, true);
    });

    await t.test('GW IP blocked → 설계 후보 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED')
        );
      assert.strictEqual(result.isPlanningCandidateBlockedByGwIp, true);
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        false
      );
    });

    await t.test('TOKEN blocked → 설계 후보 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE')
        );
      assert.strictEqual(result.isPlanningCandidateBlockedByToken, true);
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        false
      );
    });

    await t.test('ENV blocked → 설계 후보 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING')
        );
      assert.strictEqual(result.isPlanningCandidateBlockedByEnv, true);
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        false
      );
    });

    await t.test('CHANNEL blocked → 설계 후보 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput(
            'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
          )
        );
      assert.strictEqual(result.isPlanningCandidateBlockedByChannel, true);
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        false
      );
    });

    await t.test('PRODUCT_LOOKUP blocked → 설계 후보 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE')
        );
      assert.strictEqual(result.isPlanningCandidateBlockedByProductLookup, true);
      assert.strictEqual(
        result.isNextReadOnlyOptionAdditionalStructureExpansionPlanningCandidate,
        false
      );
    });

    await t.test('모든 케이스에서 실행 관련 플래그 false 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
      assert.strictEqual(
        result.isReadOnlyProductStructureReviewReexecutedInThisTask,
        false
      );
      assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
      assert.strictEqual(result.isNaverApiCalledInThisTask, false);
      assert.strictEqual(result.isProductUpdateApiCalled, false);
      assert.strictEqual(result.isPriceOrStockChanged, false);
      assert.strictEqual(result.isDbWriteExecuted, false);
      assert.strictEqual(result.isDbUpsertExecuted, false);
      assert.strictEqual(result.isDbUpdateExecuted, false);
      assert.strictEqual(result.hasExecutionButton, false);
      assert.strictEqual(result.hasSubmitAction, false);
      assert.strictEqual(result.isExecutionAllowed, false);
    });

    await t.test('민감값/원본값 비포함 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      assert.strictEqual(result.isSalePriceRawValueIncluded, false);
      assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
      assert.strictEqual(result.isRawProductApiResponseStored, false);
      assert.strictEqual(result.isTokenValueDisplayed, false);
      assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    });

    await t.test('Task 287, 286, 285, 284, 281, 276 참조 유지 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      assert.ok(result.referenceTaskNumbers.includes(287));
      assert.ok(result.referenceTaskNumbers.includes(286));
      assert.ok(result.referenceTaskNumbers.includes(285));
      assert.ok(result.referenceTaskNumbers.includes(284));
      assert.ok(result.referenceTaskNumbers.includes(281));
      assert.ok(result.referenceTaskNumbers.includes(276));
    });

    await t.test('옵션/추가상품 구조 임의 추정 없음 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      assert.strictEqual(result.isOptionStructureInferred, false);
      assert.strictEqual(result.isAdditionalProductStructureInferred, false);
      assert.strictEqual(
        result.isOptionStructureDetailAvailableInCapturedData,
        false
      );
      assert.strictEqual(
        result.isAdditionalProductStructureDetailAvailableInCapturedData,
        false
      );
    });

    await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionPlanningCandidateView(
          mkInput('CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY')
        );
      const json = JSON.stringify(result);
      assert.ok(!json.includes('access_token'), 'access_token 없음');
      assert.ok(!json.includes('client_secret'), 'client_secret 없음');
      assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 없음');
      assert.ok(!json.toLowerCase().includes('signature:'), 'signature 없음');
      assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
      assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
      assert.ok(!json.includes('"rawProductApiResponse"'), 'raw response 없음');
    });
  }
);
