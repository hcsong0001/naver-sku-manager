import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyDesignFinalizationCandidateView } from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-view.service';

const mkInput = (
  readOnlyDesignFinalizationApprovalPacketStatus: string,
  optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: string,
  optionAdditionalStructureExpansionDesignBlueprintStatus: string
) => ({
  approvalPacket: {
    readOnlyDesignFinalizationApprovalPacketStatus,
  },
  blueprintOutcomeCertification: {
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
  },
  blueprintSafetyAuditSeal: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
  },
  designBlueprint: {
    optionAdditionalStructureExpansionDesignBlueprintStatus,
  },
  captureResult: {
    isNaverReadOnlyProductDataCaptureResultReady: true,
  },
});

const cases = [
  {
    packetStatus: 'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
    candidateStatus: 'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT',
    flag: 'isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint',
  },
  {
    packetStatus: 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
    candidateStatus: 'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
    flag: 'isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice',
  },
  {
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_GW_IP',
    candidateStatus: 'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP',
    flag: 'isReadOnlyDesignFinalizationCandidateBlockedByGwIp',
  },
  {
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_TOKEN',
    candidateStatus: 'FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN',
    flag: 'isReadOnlyDesignFinalizationCandidateBlockedByToken',
  },
  {
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_ENV',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_ENV',
    candidateStatus: 'FINALIZATION_CANDIDATE_BLOCKED_BY_ENV',
    flag: 'isReadOnlyDesignFinalizationCandidateBlockedByEnv',
  },
  {
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_CHANNEL',
    candidateStatus: 'FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL',
    flag: 'isReadOnlyDesignFinalizationCandidateBlockedByChannel',
  },
  {
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
    blueprintStatus:
      'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
    candidateStatus: 'FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP',
    flag: 'isReadOnlyDesignFinalizationCandidateBlockedByProductLookup',
  },
] as const;

test(
  'NaverReadOnlyDesignFinalizationCandidateView (Task 293)',
  async (t) => {
    await t.test('핵심 상태 및 승인 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
          'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
        )
      );
      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_READY'
      );
      assert.strictEqual(result.isNaverReadOnlyDesignFinalizationCandidateReady, true);
      assert.strictEqual(result.isNaverReadOnlyDesignFinalizationApprovalPacketReady, true);
      assert.strictEqual(result.isUserApprovalConfirmedForTask293, true);
    });

    await t.test(
      '모든 approval packet 상태에 대해 finalization candidate 상태가 올바르게 계산됨',
      () => {
        for (const item of cases) {
          const result = buildNaverReadOnlyDesignFinalizationCandidateView(
            mkInput(item.packetStatus, item.outcomeStatus, item.blueprintStatus)
          );
          assert.strictEqual(
            result.readOnlyDesignFinalizationCandidateStatus,
            item.candidateStatus
          );
          const enabledFlags = [
            result.isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint,
            result.isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice,
            result.isReadOnlyDesignFinalizationCandidateBlockedByGwIp,
            result.isReadOnlyDesignFinalizationCandidateBlockedByToken,
            result.isReadOnlyDesignFinalizationCandidateBlockedByEnv,
            result.isReadOnlyDesignFinalizationCandidateBlockedByChannel,
            result.isReadOnlyDesignFinalizationCandidateBlockedByProductLookup,
          ].filter(Boolean);
          assert.strictEqual(enabledFlags.length, 1);
          assert.strictEqual((result as any)[item.flag], true);
        }
      }
    );

    await t.test('COMPLETE 상태 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
          'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
        )
      );
      assert.strictEqual(
        result.readOnlyDesignFinalizationCandidateStatus,
        'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT'
      );
      assert.strictEqual(
        result.isReadOnlyDesignFinalizationCandidateReadyForCompleteBlueprint,
        true
      );
      assert.strictEqual(result.isReadOnlyDesignFinalizationCandidateDisplayed, true);
      assert.strictEqual(result.isReadOnlyDesignFinalizationExecutedInThisTask, true);
      assert.notStrictEqual(result.designFinalizationCandidate, null);
    });

    await t.test('PARTIAL 상태 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
          'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE'
        )
      );
      assert.strictEqual(
        result.readOnlyDesignFinalizationCandidateStatus,
        'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.strictEqual(
        result.isReadOnlyDesignFinalizationCandidateReadyWithMissingFieldNotice,
        true
      );
      assert.strictEqual(result.isReadOnlyDesignFinalizationCandidateDisplayed, true);
      assert.strictEqual(result.isReadOnlyDesignFinalizationExecutedInThisTask, true);
      assert.notStrictEqual(result.designFinalizationCandidate, null);
    });

    await t.test('각 BLOCKED 상태는 후보를 표시하지 않음', () => {
      for (const item of cases.slice(2)) {
        const result = buildNaverReadOnlyDesignFinalizationCandidateView(
          mkInput(item.packetStatus, item.outcomeStatus, item.blueprintStatus)
        );
        assert.strictEqual(result.isReadOnlyDesignFinalizationCandidateDisplayed, false);
        assert.strictEqual(result.isReadOnlyDesignFinalizationExecutedInThisTask, false);
        assert.strictEqual(result.designFinalizationCandidate, null);
      }
    });

    await t.test('후보 플래그와 최종화 금지 플래그 검증', () => {
      const ready = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
          'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
        )
      );
      const blocked = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
          'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP'
        )
      );
      assert.strictEqual(ready.isDesignBlueprintFinalizationCandidate, true);
      assert.strictEqual(blocked.isDesignBlueprintFinalizationCandidate, false);
      assert.strictEqual(ready.isDesignBlueprintFinalized, false);
      assert.strictEqual(ready.isDesignBlueprintApprovedForExecution, false);
      assert.strictEqual(ready.isExecutionApprovalGranted, false);
      assert.strictEqual(ready.isProductChangeApprovalGranted, false);
      assert.strictEqual(ready.isDesignBlueprintReferenceOnly, true);
      assert.strictEqual(ready.isDesignBlueprintCopiedForExecution, false);
      assert.strictEqual(ready.isDesignBlueprintPersistedToDb, false);
    });

    await t.test('read-only 및 비실행 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
          'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
        )
      );
      assert.strictEqual(result.isCapturedDataUsedOnly, true);
      assert.strictEqual(result.isSummaryReviewResultUsedOnly, true);
      assert.strictEqual(result.isNewApiCallExecutedInThisTask, false);
      assert.strictEqual(
        result.isOptionAdditionalStructureExpansionDesignReexecutedInThisTask,
        false
      );
      assert.strictEqual(result.isOptionStructureInferred, false);
      assert.strictEqual(result.isAdditionalProductStructureInferred, false);
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

    await t.test('candidateItems에 권장 상태값 포함 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
          'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE'
        )
      );
      const statuses = result.candidateItems.map((item) => item.status);
      assert.ok(statuses.includes('USER_APPROVAL_CONFIRMED_FOR_TASK_293'));
      assert.ok(statuses.includes('APPROVAL_PACKET_CONFIRMED'));
      assert.ok(statuses.includes('BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED'));
      assert.ok(statuses.includes('BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'));
      assert.ok(statuses.includes('DESIGN_BLUEPRINT_CONFIRMED'));
      assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
      assert.ok(statuses.includes('FINALIZATION_CANDIDATE_STATUS_RECORDED'));
      assert.ok(statuses.includes('CANDIDATE_READY_IF_COMPLETE_BLUEPRINT'));
      assert.ok(statuses.includes('CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'));
      assert.ok(statuses.includes('CANDIDATE_BLOCKED'));
      assert.ok(statuses.includes('MISSING_FIELD_NOTICE_PRESERVED'));
      assert.ok(statuses.includes('NOT_FINALIZED'));
      assert.ok(statuses.includes('NOT_APPROVED_FOR_EXECUTION'));
      assert.ok(statuses.includes('NOT_APPROVED_FOR_PRODUCT_CHANGE'));
      assert.ok(statuses.includes('NOT_STORED'));
      assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('NOT_INFERRED'));
      assert.ok(statuses.includes('NOT_INCLUDED'));
      assert.ok(statuses.includes('NOT_DISPLAYED'));
      assert.ok(statuses.includes('NOT_EXECUTED'));
      assert.ok(statuses.includes('LOCKED'));
      assert.ok(statuses.includes('PENDING_SEPARATE_APPROVAL'));
      assert.ok(statuses.includes('READ_ONLY_INFO'));
    });

    await t.test('JSON.stringify 결과에 민감값과 원본값이 포함되지 않음', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateView(
        mkInput(
          'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
          'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
          'OPTION_ADDITIONAL_STRUCTURE_EXPANSION_DESIGN_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY'
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
