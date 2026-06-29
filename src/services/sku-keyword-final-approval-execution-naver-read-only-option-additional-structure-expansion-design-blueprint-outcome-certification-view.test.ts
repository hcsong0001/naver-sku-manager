import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-read-only-option-additional-structure-expansion-design-blueprint-outcome-certification-view.service';

const mkInput = (
  optionAdditionalStructureExpansionDesignBlueprintStatus: string,
  optionAdditionalStructureExpansionPlanningCandidateStatus: string
) => ({
  designBlueprint: {
    optionAdditionalStructureExpansionDesignBlueprintStatus,
    optionAdditionalStructureExpansionPlanningCandidateStatus,
  },
  safetyAuditSeal: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
  },
  planningApprovalPacket: {
    isNaverReadOnlyOptionAdditionalStructureExpansionPlanningApprovalPacketReady:
      true,
  },
  structureOutcomeCertification: {
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
  },
  structureReview: {
    isNaverReadOnlyProductStructureReviewResultReady: true,
  },
  captureResult: {
    isNaverReadOnlyProductDataCaptureResultReady: true,
  },
});

const cases = [
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
    flag: 'isCertifiedBlueprintReadyForCompleteSummary',
  },
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
    flag: 'isCertifiedBlueprintReadyWithMissingFieldNotice',
  },
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_GW_IP',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP',
    flag: 'isCertifiedBlueprintBlockedByGwIp',
  },
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_TOKEN',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN',
    flag: 'isCertifiedBlueprintBlockedByToken',
  },
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_ENV',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV',
    flag: 'isCertifiedBlueprintBlockedByEnv',
  },
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_CHANNEL',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL',
    flag: 'isCertifiedBlueprintBlockedByChannel',
  },
  {
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
    planningStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
    flag: 'isCertifiedBlueprintBlockedByProductLookup',
  },
] as const;

test(
  'NaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView (Task 291)',
  async (t) => {
    await t.test('핵심 상태와 준비 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_OUTCOME_CERTIFICATION_READY'
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady,
        true
      );
      assert.deepStrictEqual(result.referenceTaskNumbers, [
        290, 289, 288, 287, 285, 276,
      ]);
    });

    await t.test(
      '모든 design blueprint 상태에 대해 outcome certification 상태가 올바르게 계산됨',
      () => {
        for (const item of cases) {
          const result =
            buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
              mkInput(item.blueprintStatus, item.planningStatus)
            );

          assert.strictEqual(
            result.optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
            item.outcomeStatus
          );

          const enabledFlags = [
            result.isCertifiedBlueprintReadyForCompleteSummary,
            result.isCertifiedBlueprintReadyWithMissingFieldNotice,
            result.isCertifiedBlueprintBlockedByGwIp,
            result.isCertifiedBlueprintBlockedByToken,
            result.isCertifiedBlueprintBlockedByEnv,
            result.isCertifiedBlueprintBlockedByChannel,
            result.isCertifiedBlueprintBlockedByProductLookup,
          ].filter(Boolean);
          assert.strictEqual(enabledFlags.length, 1);
          assert.strictEqual((result as any)[item.flag], true);
        }
      }
    );

    await t.test('COMPLETE 상태 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(
        result.optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
        'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
      );
      assert.strictEqual(result.isCertifiedBlueprintReadyForCompleteSummary, true);
      assert.strictEqual(
        result.isReadyForNextReadOnlyDesignFinalizationApprovalPacket,
        true
      );
    });

    await t.test('PARTIAL 상태 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
          )
        );

      assert.strictEqual(
        result.optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
        'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.strictEqual(
        result.isCertifiedBlueprintReadyWithMissingFieldNotice,
        true
      );
      assert.strictEqual(
        result.isReadyForNextReadOnlyDesignFinalizationApprovalPacket,
        true
      );
      assert.strictEqual(result.isMissingFieldNoticePreserved, true);
    });

    await t.test('각 BLOCKED 상태는 다음 승인 패킷 차단', () => {
      for (const item of cases.slice(2)) {
        const result =
          buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
            mkInput(item.blueprintStatus, item.planningStatus)
          );

        assert.strictEqual(
          result.isNextReadOnlyDesignFinalizationApprovalPacketBlocked,
          true
        );
      }
    });

    await t.test('설계 확정/실행 승인 방지 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP'
          )
        );

      assert.strictEqual(result.isDesignBlueprintFinalized, false);
      assert.strictEqual(result.isDesignBlueprintApprovedForExecution, false);
      assert.strictEqual(result.isExecutionApprovalGranted, false);
    });

    await t.test('read-only 및 비실행 플래그 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
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

    await t.test('민감값/원본값 비포함 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_FOR_COMPLETE_SUMMARY'
          )
        );

      assert.strictEqual(result.isSalePriceRawValueIncluded, false);
      assert.strictEqual(result.isStockQuantityRawValueIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseIncluded, false);
      assert.strictEqual(result.isRawProductApiResponseDisplayed, false);
      assert.strictEqual(result.isRawProductApiResponseStored, false);
      assert.strictEqual(result.isTokenReissuedInThisTask, false);
      assert.strictEqual(result.isTokenIssuanceExecutedInThisTask, false);
      assert.strictEqual(result.isProductLookupApiCalledInThisTask, false);
      assert.strictEqual(result.isNaverApiCalledInThisTask, false);
      assert.strictEqual(result.isProductUpdateApiCalled, false);
      assert.strictEqual(result.isPriceOrStockChanged, false);
      assert.strictEqual(result.isDbWriteExecuted, false);
      assert.strictEqual(result.isDbUpsertExecuted, false);
      assert.strictEqual(result.isDbUpdateExecuted, false);
      assert.strictEqual(result.hasExecutionButton, false);
      assert.strictEqual(result.hasSubmitAction, false);
    });

    await t.test('certificationItems에 권장 상태값 포함 검증', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
          mkInput(
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
            'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_PLANNING_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
          )
        );
      const statuses = result.certificationItems.map((item) => item.status);

      assert.ok(statuses.includes('BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'));
      assert.ok(statuses.includes('DESIGN_BLUEPRINT_CONFIRMED'));
      assert.ok(statuses.includes('PLANNING_CANDIDATE_CONFIRMED'));
      assert.ok(
        statuses.includes('STRUCTURE_OUTCOME_CERTIFICATION_CONFIRMED')
      );
      assert.ok(statuses.includes('STRUCTURE_REVIEW_CONFIRMED'));
      assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
      assert.ok(statuses.includes('OUTCOME_CERTIFICATION_STATUS_RECORDED'));
      assert.ok(statuses.includes('CERTIFIED_READY_IF_COMPLETE_SUMMARY'));
      assert.ok(
        statuses.includes('CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE')
      );
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
      assert.ok(statuses.includes('MISSING_FIELD_NOTICE_PRESERVED'));
      assert.ok(statuses.includes('NOT_FINALIZED'));
      assert.ok(statuses.includes('NOT_APPROVED_FOR_EXECUTION'));
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

    await t.test('JSON.stringify 결과에 민감값과 원본값이 포함되지 않음', () => {
      const result =
        buildNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationView(
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
  }
);
