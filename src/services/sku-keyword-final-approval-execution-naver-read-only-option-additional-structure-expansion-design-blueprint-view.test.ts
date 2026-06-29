import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView } from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-view.service';

const mkPlanningCandidate = (
  optionAdditionalStructureExpansionPlanningCandidateStatus: string
) => ({
  optionAdditionalStructureExpansionPlanningCandidateStatus,
  isProductStructureReviewBuiltFromCapturedData: true,
});

const mkInput = (
  optionAdditionalStructureExpansionPlanningCandidateStatus: string
) => ({
  planningCandidate: mkPlanningCandidate(
    optionAdditionalStructureExpansionPlanningCandidateStatus
  ),
  outcomeCertification: {
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
  },
  safetyAuditSeal: {
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
  },
  structureReview: {
    isNaverReadOnlyProductStructureReviewResultReady: true,
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
  'NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView (Task 289)',
  async (t) => {
    await t.test('핵심 상태 및 참조 Task 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY'
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady,
        true
      );
      assert.strictEqual(result.currentTaskNumber, 289);
      assert.deepStrictEqual(result.referenceTaskNumbers, [
        288, 287, 286, 285, 284, 281, 276,
      ]);
    });

    await t.test('COMPLETE 후보 상태 → 설계안 생성 가능 true', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      assert.strictEqual(
        result.optionAdditionalStructureExpansionDesignBlueprintStatus,
        'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
      );
      assert.strictEqual(result.isDesignBlueprintReadyForCompleteSummary, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, true);
    });

    await t.test('PARTIAL 후보 상태 → 설계안 생성 가능 true + missing field notice 유지', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
          )
        );
      assert.strictEqual(
        result.optionAdditionalStructureExpansionDesignBlueprintStatus,
        'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.strictEqual(result.isDesignBlueprintReadyWithMissingFieldNotice, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, true);
      assert.strictEqual(result.isMissingFieldNoticeRequired, true);
    });

    await t.test('GW IP blocked → 설계안 생성 가능 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP'
          )
        );
      assert.strictEqual(result.isDesignBlueprintBlockedByGwIp, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, false);
    });

    await t.test('TOKEN blocked → 설계안 생성 가능 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN'
          )
        );
      assert.strictEqual(result.isDesignBlueprintBlockedByToken, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, false);
    });

    await t.test('ENV blocked → 설계안 생성 가능 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV'
          )
        );
      assert.strictEqual(result.isDesignBlueprintBlockedByEnv, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, false);
    });

    await t.test('CHANNEL blocked → 설계안 생성 가능 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL'
          )
        );
      assert.strictEqual(result.isDesignBlueprintBlockedByChannel, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, false);
    });

    await t.test('PRODUCT_LOOKUP blocked → 설계안 생성 가능 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP'
          )
        );
      assert.strictEqual(result.isDesignBlueprintBlockedByProductLookup, true);
      assert.strictEqual(result.isReadOnlyDesignBlueprintCreatable, false);
    });

    await t.test('모든 케이스에서 실행 관련 플래그 false 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
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
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      assert.strictEqual(result.isSalePriceRawValueIncluded, false);
      assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
      assert.strictEqual(result.isRawProductApiResponseStored, false);
      assert.strictEqual(result.isTokenValueDisplayed, false);
      assert.strictEqual(result.isAuthKeyValueDisplayed, false);
    });

    await t.test('Task 288, 287, 286, 285, 284, 281, 276 참조 유지 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      assert.ok(result.referenceTaskNumbers.includes(288));
      assert.ok(result.referenceTaskNumbers.includes(287));
      assert.ok(result.referenceTaskNumbers.includes(286));
      assert.ok(result.referenceTaskNumbers.includes(285));
      assert.ok(result.referenceTaskNumbers.includes(284));
      assert.ok(result.referenceTaskNumbers.includes(281));
      assert.ok(result.referenceTaskNumbers.includes(276));
    });

    await t.test('기존 데이터에 없는 옵션/추가상품 구조 임의 확정 없음 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      assert.strictEqual(result.isOptionStructureInferred, false);
      assert.strictEqual(result.isAdditionalProductStructureInferred, false);
      assert.ok(
        result.structureAreasToReview.every((area) =>
          ['미확정', '확인 필요', '후속 검토 후보'].includes(area.status)
        )
      );
    });

    await t.test('설계 확정 여부와 실행 승인 여부는 항상 false', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      assert.strictEqual(result.isDesignConfirmed, false);
      assert.strictEqual(result.isExecutionApproved, false);
    });

    await t.test('JSON.stringify — 민감 정보 및 원본 값 미포함 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
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
