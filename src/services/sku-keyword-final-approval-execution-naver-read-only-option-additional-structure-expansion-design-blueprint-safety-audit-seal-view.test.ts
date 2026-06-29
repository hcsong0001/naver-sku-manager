import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-safety-audit-seal-view.service';

const mkDesignBlueprint = (
  optionAdditionalStructureExpansionDesignBlueprintStatus: string,
  optionAdditionalStructureExpansionPlanningCandidateStatus: string
) => ({
  optionAdditionalStructureExpansionDesignBlueprintStatus,
  optionAdditionalStructureExpansionPlanningCandidateStatus,
  isCapturedDataUsedOnly: true,
  isSummaryReviewResultUsedOnly: true,
});

const mkPlanningCandidate = (
  optionAdditionalStructureExpansionPlanningCandidateStatus: string
) => ({
  optionAdditionalStructureExpansionPlanningCandidateStatus,
});

const mkInput = (
  optionAdditionalStructureExpansionDesignBlueprintStatus: string,
  optionAdditionalStructureExpansionPlanningCandidateStatus: string
) => ({
  designBlueprint: mkDesignBlueprint(
    optionAdditionalStructureExpansionDesignBlueprintStatus,
    optionAdditionalStructureExpansionPlanningCandidateStatus
  ),
  planningCandidate: mkPlanningCandidate(
    optionAdditionalStructureExpansionPlanningCandidateStatus
  ),
  structureOutcomeCertification: {
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
  },
  structureSafetyAuditSeal: {
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
  },
  structureReview: {
    isNaverReadOnlyProductStructureReviewResultReady: true,
  },
  captureResult: {
    isNaverReadOnlyProductDataCaptureResultReady: true,
  },
});

test(
  'NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView (Task 290)',
  async (t) => {
    await t.test('핵심 상태와 봉인 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_SAFETY_AUDIT_SEALED'
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady,
        true
      );
      assert.strictEqual(result.isDesignBlueprintConfirmed, true);
      assert.strictEqual(result.isPlanningCandidateConfirmed, true);
      assert.strictEqual(result.isDesignBlueprintStatusRecorded, true);
      assert.deepStrictEqual(result.referenceTaskNumbers, [
        289, 288, 287, 286, 285, 276,
      ]);
    });

    await t.test('COMPLETE 상태 안전 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(
        result.isDesignBlueprintAvailableForCompleteSummary,
        true
      );
      assert.strictEqual(result.isDesignBlueprintBlocked, false);
      assert.strictEqual(result.isDesignBlueprintFinalized, false);
      assert.strictEqual(result.isDesignBlueprintApprovedForExecution, false);
      assert.strictEqual(result.isExecutionApprovalGranted, false);
    });

    await t.test('PARTIAL 상태 missing field notice 유지 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
          )
        );

      assert.strictEqual(
        result.isDesignBlueprintAvailableWithMissingFieldNotice,
        true
      );
      assert.strictEqual(result.isMissingFieldNoticePreserved, true);
      assert.strictEqual(result.isDesignBlueprintBlocked, false);
    });

    await t.test('BLOCKED 상태 차단 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN'
          )
        );

      assert.strictEqual(result.isDesignBlueprintBlocked, true);
      assert.strictEqual(
        result.optionAdditionalStructureExpansionDesignBlueprintStatus,
        'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN'
      );
    });

    await t.test('기존 데이터만 사용하고 새 API 호출이 없음을 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(result.isCapturedDataUsedOnly, true);
      assert.strictEqual(result.isSummaryReviewResultUsedOnly, true);
      assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
      assert.strictEqual(
        result.isOptionAdditionalStructureExpansionDesignReexecutedInThisTask,
        false
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
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(result.isSalePriceRawValueIncluded, false);
      assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
      assert.strictEqual(result.isSalePricePresenceFlagOnly, true);
      assert.strictEqual(result.isStockQuantityPresenceFlagOnly, true);
      assert.strictEqual(result.isRawProductApiResponseIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
      assert.strictEqual(result.isRawProductApiResponseStored, false);
    });

    await t.test('Token/API/DB/실행 경로 차단 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(result.isTokenReissuedInThisTask, false);
      assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
      assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
      assert.strictEqual(result.isNaverApiCalledInThisTask, false);
      assert.strictEqual(result.isProductLookupApiCalled, false);
      assert.strictEqual(result.isProductUpdateApiCalled, false);
      assert.strictEqual(result.isPriceOrStockChanged, false);
      assert.strictEqual(result.isDbWriteExecuted, false);
      assert.strictEqual(result.isDbUpsertExecuted, false);
      assert.strictEqual(result.isDbUpdateExecuted, false);
      assert.strictEqual(result.hasExecutionButton, false);
      assert.strictEqual(result.hasSubmitAction, false);
      assert.strictEqual(result.isActualApprovalSubmissionAllowed, false);
      assert.strictEqual(result.isApprovalSubmitted, false);
      assert.strictEqual(result.isExecutionAllowed, false);
      assert.strictEqual(result.isPostApiConnected, false);
      assert.strictEqual(result.isMutationConnected, false);
      assert.strictEqual(result.isLiveExecutionEnabled, false);
      assert.strictEqual(result.hasWorkerTrigger, false);
      assert.strictEqual(result.hasQueueTrigger, false);
      assert.strictEqual(result.hasAdapterTrigger, false);
    });

    await t.test('auditItems에 권장 상태값 포함 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
          )
        );
      const statuses = result.auditItems.map((item) => item.status);

      assert.ok(statuses.includes('DESIGN_BLUEPRINT_CONFIRMED'));
      assert.ok(statuses.includes('PLANNING_CANDIDATE_CONFIRMED'));
      assert.ok(
        statuses.includes('STRUCTURE_OUTCOME_CERTIFICATION_CONFIRMED')
      );
      assert.ok(statuses.includes('STRUCTURE_SAFETY_AUDIT_SEAL_CONFIRMED'));
      assert.ok(statuses.includes('STRUCTURE_REVIEW_CONFIRMED'));
      assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
      assert.ok(statuses.includes('DESIGN_BLUEPRINT_STATUS_RECORDED'));
      assert.ok(statuses.includes('DESIGN_AVAILABILITY_RECORDED'));
      assert.ok(statuses.includes('MISSING_FIELD_NOTICE_PRESERVED'));
      assert.ok(statuses.includes('NOT_FINALIZED'));
      assert.ok(statuses.includes('NOT_APPROVED_FOR_EXECUTION'));
      assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('NOT_INFERRED'));
      assert.ok(statuses.includes('NOT_AVAILABLE_IN_CAPTURED_DATA'));
      assert.ok(statuses.includes('NOT_INCLUDED'));
      assert.ok(statuses.includes('NOT_STORED'));
      assert.ok(statuses.includes('NOT_DISPLAYED'));
      assert.ok(statuses.includes('NOT_EXECUTED'));
      assert.ok(statuses.includes('LOCKED'));
      assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
      assert.ok(statuses.includes('READ_ONLY_INFO'));
    });

    await t.test('JSON.stringify 결과에 민감값과 원본 값이 포함되지 않음', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );
      const json = JSON.stringify(result);

      assert.ok(!json.includes('access_token'), 'access_token 없음');
      assert.ok(!json.includes('client_secret'), 'client_secret 없음');
      assert.ok(!json.includes('client_id'), 'client_id 없음');
      assert.ok(!json.toLowerCase().includes('signature:'), 'signature 없음');
      assert.ok(!json.toLowerCase().includes('authorization:'), 'Authorization 없음');
      assert.ok(!json.includes('"rawProductApiResponse"'), 'raw response 없음');
      assert.ok(!json.includes('"salePrice":'), 'salePrice 원본 값 없음');
      assert.ok(!json.includes('"stockQuantity":'), 'stockQuantity 원본 값 없음');
    });

    await t.test('설계 확정 또는 실행 승인으로 오해될 수 있는 플래그가 true가 아님', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP'
          )
        );

      assert.strictEqual(result.isDesignBlueprintFinalized, false);
      assert.strictEqual(result.isDesignBlueprintApprovedForExecution, false);
      assert.strictEqual(result.isExecutionApprovalGranted, false);
      assert.strictEqual(result.isNextStepSeparateApprovalRequired, true);
      assert.strictEqual(result.isNextStepSeparateApprovalGranted, false);
    });
  }
);
