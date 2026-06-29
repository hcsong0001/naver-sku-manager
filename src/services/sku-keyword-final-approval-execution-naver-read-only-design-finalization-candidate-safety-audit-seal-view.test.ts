import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-safety-audit-seal-view.service';

const mkFinalizationCandidate = (
  readOnlyDesignFinalizationCandidateStatus: string,
  isDisplayed: boolean
) => ({
  readOnlyDesignFinalizationCandidateStatus,
  isReadOnlyDesignFinalizationCandidateDisplayed: isDisplayed,
  isReadOnlyDesignFinalizationExecutedInThisTask: isDisplayed,
  isDesignBlueprintFinalizationCandidate: isDisplayed,
  isCapturedDataUsedOnly: true,
  isSummaryReviewResultUsedOnly: true,
});

const mkInput = (
  readOnlyDesignFinalizationCandidateStatus: string,
  isDisplayed: boolean
) => ({
  finalizationCandidate: mkFinalizationCandidate(
    readOnlyDesignFinalizationCandidateStatus,
    isDisplayed
  ),
  approvalPacket: {
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
  },
  blueprintOutcomeCertification: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
      true,
  },
  blueprintSafetyAuditSeal: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
  },
  designBlueprint: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
  },
  captureResult: {
    isNaverReadOnlyProductDataCaptureResultReady: true,
  },
});

test(
  'NaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView (Task 294)',
  async (t) => {
    await t.test('핵심 상태와 봉인 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(
        result.status,
        'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEALED'
      );
      assert.equal(
        result.isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed,
        true
      );
      assert.equal(result.isNaverReadOnlyDesignFinalizationCandidateReady, true);
      assert.equal(result.isFinalizationCandidateConfirmed, true);
      assert.equal(result.isUserApprovalConfirmedForTask293, true);
      assert.equal(result.isFinalizationCandidateStatusRecorded, true);
    });

    await t.test('COMPLETE 후보 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isReadOnlyDesignFinalizationCandidateDisplayed, true);
      assert.equal(result.isReadOnlyDesignFinalizationExecutedInThisTask, true);
      assert.equal(result.isDesignBlueprintFinalizationCandidate, true);
      assert.equal(
        result.readOnlyDesignFinalizationCandidateStatus,
        'FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT'
      );
    });

    await t.test('PARTIAL 후보 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE', true)
      );

      assert.equal(result.isReadOnlyDesignFinalizationCandidateDisplayed, true);
      assert.equal(result.isReadOnlyDesignFinalizationExecutedInThisTask, true);
      assert.equal(result.isDesignBlueprintFinalizationCandidate, true);
      assert.equal(
        result.readOnlyDesignFinalizationCandidateStatus,
        'FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
      );
    });

    await t.test('BLOCKED 후보 플래그 검증', () => {
      const resultGwIp = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP', false)
      );
      assert.equal(resultGwIp.isReadOnlyDesignFinalizationCandidateDisplayed, false);
      assert.equal(resultGwIp.isReadOnlyDesignFinalizationExecutedInThisTask, false);
      assert.equal(resultGwIp.isDesignBlueprintFinalizationCandidate, false);

      const resultToken = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN', false)
      );
      assert.equal(resultToken.isReadOnlyDesignFinalizationCandidateDisplayed, false);
      assert.equal(resultToken.isReadOnlyDesignFinalizationExecutedInThisTask, false);
      assert.equal(resultToken.isDesignBlueprintFinalizationCandidate, false);
    });

    await t.test('설계 확정 및 실행 승인 플래그 false 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isDesignBlueprintFinalized, false);
      assert.equal(result.isDesignBlueprintApprovedForExecution, false);
      assert.equal(result.isExecutionApprovalGranted, false);
      assert.equal(result.isProductChangeApprovalGranted, false);
      assert.equal(result.isDesignBlueprintReferenceOnly, true);
      assert.equal(result.isDesignBlueprintCopiedForExecution, false);
      assert.equal(result.isDesignBlueprintPersistedToDb, false);
      assert.equal(result.isDesignFinalizationCandidateStoredInDb, false);
      assert.equal(result.isDesignFinalizationCandidateCopiedForExecution, false);
    });

    await t.test('API 호출 플래그 false 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isCapturedDataUsedOnly, true);
      assert.equal(result.isSummaryReviewResultUsedOnly, true);
      assert.equal(result.isNewApiCallExecutedInThisTask, false);
      assert.equal(
        result.isOptionAdditionalStructureExpansionDesignReexecutedInThisTask,
        false
      );
      assert.equal(result.isOptionStructureInferred, false);
      assert.equal(result.isAdditionalProductStructureInferred, false);
    });

    await t.test('가격/재고/raw response 플래그 false 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isSalePriceRawValueIncluded, false);
      assert.equal(result.isStockQuantityRawValueIncluded, false);
      assert.equal(result.isRawProductApiResponseIncluded, false);
      assert.equal(result.isRawProductApiResponseDisplayed, false);
      assert.equal(result.isRawProductApiResponseStored, false);
    });

    await t.test('Token/Auth 플래그 false 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isTokenReissuedInThisTask, false);
      assert.equal(result.isTokenIssuanceExecutedInThisTask, false);
      assert.equal(result.isProductLookupApiCalledInThisTask, false);
      assert.equal(result.isNaverApiCalledInThisTask, false);
      assert.equal(result.isTokenValueDisplayed, false);
      assert.equal(result.isAuthorizationHeaderDisplayed, false);
      assert.equal(result.isSignatureDisplayed, false);
    });

    await t.test('DB write/상품 수정/실행 플래그 false 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isProductUpdateApiCalled, false);
      assert.equal(result.isPriceOrStockChanged, false);
      assert.equal(result.isDbWriteExecuted, false);
      assert.equal(result.isDbUpsertExecuted, false);
      assert.equal(result.isDbUpdateExecuted, false);
      assert.equal(result.hasExecutionButton, false);
      assert.equal(result.hasSubmitAction, false);
      assert.equal(result.hasWorkerTrigger, false);
      assert.equal(result.hasQueueTrigger, false);
      assert.equal(result.hasAdapterTrigger, false);
    });

    await t.test('auditItems에 모든 권장 상태값 포함 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      const statuses = result.auditItems.map((i) => i.status);
      const requiredStatuses = [
        'FINALIZATION_CANDIDATE_CONFIRMED',
        'USER_APPROVAL_CONFIRMED_FOR_TASK_293',
        'APPROVAL_PACKET_CONFIRMED',
        'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED',
        'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
        'DESIGN_BLUEPRINT_CONFIRMED',
        'CAPTURE_RESULT_CONFIRMED',
        'FINALIZATION_CANDIDATE_STATUS_RECORDED',
        'CANDIDATE_READY_IF_COMPLETE_BLUEPRINT',
        'CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE',
        'CANDIDATE_BLOCKED_CONFIRMED',
        'NOT_FINALIZED',
        'NOT_APPROVED_FOR_EXECUTION',
        'NOT_APPROVED_FOR_PRODUCT_CHANGE',
        'NOT_STORED',
        'NOT_COPIED_FOR_EXECUTION',
        'CAPTURED_DATA_ONLY_CONFIRMED',
        'SUMMARY_REVIEW_ONLY_CONFIRMED',
        'NOT_INFERRED',
        'NOT_INCLUDED',
        'NOT_DISPLAYED',
        'NOT_EXECUTED',
        'LOCKED',
        'PENDING_SEPARATE_APPROVAL',
        'READ_ONLY_INFO',
      ] as const;

      for (const s of requiredStatuses) {
        assert.ok(
          statuses.includes(s),
          `auditItems에 ${s} 상태값이 없습니다`
        );
      }
    });

    await t.test('JSON.stringify 결과에 민감값 미포함 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );
      const serialized = JSON.stringify(result);

      assert.ok(
        !serialized.includes('access_token'),
        'access_token이 포함되어서는 안 됩니다'
      );
      assert.ok(
        !serialized.includes('client_secret'),
        'client_secret이 포함되어서는 안 됩니다'
      );
      assert.ok(
        !serialized.includes('Authorization: Bearer'),
        'Authorization Bearer가 포함되어서는 안 됩니다'
      );
      assert.ok(
        !serialized.includes('salePrice'),
        'salePrice raw value가 포함되어서는 안 됩니다'
      );
      assert.ok(
        !serialized.includes('stockQuantity'),
        'stockQuantity raw value가 포함되어서는 안 됩니다'
      );
    });

    await t.test('설계 확정 또는 실행 승인 오해 플래그 미포함 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isDesignBlueprintFinalized, false);
      assert.equal(result.isExecutionApprovalGranted, false);
      assert.equal(result.isProductChangeApprovalGranted, false);
      assert.equal(result.isActualApprovalSubmissionAllowed, false);
      assert.equal(result.isApprovalSubmitted, false);
      assert.equal(result.isExecutionAllowed, false);
      assert.equal(result.isLiveExecutionEnabled, false);
    });

    await t.test('다음 단계 별도 승인 필요 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.isNextStepSeparateApprovalRequired, true);
      assert.equal(result.isNextStepSeparateApprovalGranted, false);
    });

    await t.test('Task 번호 및 참조 Task 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT', true)
      );

      assert.equal(result.currentTaskNumber, 294);
      assert.deepEqual(result.referenceTaskNumbers, [293, 292, 291, 290, 289, 276]);
    });

    await t.test('알 수 없는 후보 상태는 BLOCKED로 폴백', () => {
      const result = buildNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealView(
        mkInput('UNKNOWN_STATUS', false)
      );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateStatus,
        'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP'
      );
      assert.equal(result.isReadOnlyDesignFinalizationCandidateDisplayed, false);
      assert.equal(result.isDesignBlueprintFinalizationCandidate, false);
    });
  }
);
