import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-candidate-outcome-certification-view.service';

const mkInput = (readOnlyDesignFinalizationCandidateStatus: string) => ({
  finalizationCandidate: {
    readOnlyDesignFinalizationCandidateStatus,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
  },
  finalizationCandidateSafetyAuditSeal: {
    isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed: true,
  },
  approvalPacket: {
    isNaverReadOnlyDesignFinalizationApprovalPacketReady: true,
  },
  blueprintOutcomeCertification: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady:
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
  'NaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView (Task 295)',
  async (t) => {
    await t.test('핵심 상태와 인증 플래그 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
        );

      assert.equal(
        result.status,
        'NAVER_READ_ONLY_DESIGN_FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_READY'
      );
      assert.equal(
        result.isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady,
        true
      );
      assert.equal(
        result.isNaverReadOnlyDesignFinalizationCandidateSafetyAuditSealed,
        true
      );
      assert.equal(result.isNaverReadOnlyDesignFinalizationCandidateReady, true);
    });

    await t.test('COMPLETE → CERTIFIED_READY_FOR_COMPLETE_BLUEPRINT', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT'
      );
      assert.equal(
        result.isCertifiedFinalizationCandidateReadyForCompleteBlueprint,
        true
      );
      assert.equal(
        result.isCertifiedFinalizationCandidateReadyWithMissingFieldNotice,
        false
      );
      assert.equal(result.isReadyForNextReadOnlyExecutionApprovalPacket, true);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, false);
      assert.equal(result.isMissingFieldNoticePreserved, false);
      assert.equal(result.isDesignBlueprintFinalizationCandidate, true);
    });

    await t.test('PARTIAL → CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.equal(
        result.isCertifiedFinalizationCandidateReadyWithMissingFieldNotice,
        true
      );
      assert.equal(
        result.isCertifiedFinalizationCandidateReadyForCompleteBlueprint,
        false
      );
      assert.equal(result.isReadyForNextReadOnlyExecutionApprovalPacket, true);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, false);
      assert.equal(result.isMissingFieldNoticePreserved, true);
      assert.equal(result.isDesignBlueprintFinalizationCandidate, true);
    });

    await t.test('BLOCKED_BY_GW_IP → CERTIFIED_BLOCKED_BY_GW_IP', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP'
      );
      assert.equal(result.isCertifiedFinalizationCandidateBlockedByGwIp, true);
      assert.equal(result.isCertifiedFinalizationCandidateBlockedByToken, false);
      assert.equal(result.isReadyForNextReadOnlyExecutionApprovalPacket, false);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, true);
      assert.equal(result.isDesignBlueprintFinalizationCandidate, false);
    });

    await t.test('BLOCKED_BY_TOKEN → CERTIFIED_BLOCKED_BY_TOKEN', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN'
      );
      assert.equal(result.isCertifiedFinalizationCandidateBlockedByToken, true);
      assert.equal(result.isCertifiedFinalizationCandidateBlockedByGwIp, false);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, true);
    });

    await t.test('BLOCKED_BY_ENV → CERTIFIED_BLOCKED_BY_ENV', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_ENV')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV'
      );
      assert.equal(result.isCertifiedFinalizationCandidateBlockedByEnv, true);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, true);
    });

    await t.test('BLOCKED_BY_CHANNEL → CERTIFIED_BLOCKED_BY_CHANNEL', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL'
      );
      assert.equal(result.isCertifiedFinalizationCandidateBlockedByChannel, true);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, true);
    });

    await t.test('BLOCKED_BY_PRODUCT_LOOKUP → CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP'
      );
      assert.equal(
        result.isCertifiedFinalizationCandidateBlockedByProductLookup,
        true
      );
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, true);
    });

    await t.test('설계 확정 및 실행 승인 플래그 false 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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

    await t.test('API 호출/데이터 사용 플래그 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
        );

      assert.equal(result.isSalePriceRawValueIncluded, false);
      assert.equal(result.isStockQuantityRawValueIncluded, false);
      assert.equal(result.isRawProductApiResponseIncluded, false);
      assert.equal(result.isRawProductApiResponseDisplayed, false);
      assert.equal(result.isRawProductApiResponseStored, false);
    });

    await t.test('Token/Auth 플래그 false 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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

    await t.test('certificationItems에 모든 권장 상태값 포함 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
        );

      const statuses = result.certificationItems.map((i) => i.status);
      const requiredStatuses = [
        'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED',
        'FINALIZATION_CANDIDATE_CONFIRMED',
        'APPROVAL_PACKET_CONFIRMED',
        'BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED',
        'BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED',
        'DESIGN_BLUEPRINT_CONFIRMED',
        'CAPTURE_RESULT_CONFIRMED',
        'OUTCOME_CERTIFICATION_STATUS_RECORDED',
        'CERTIFIED_READY_IF_COMPLETE_BLUEPRINT',
        'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
        'CERTIFIED_BLOCKED_RECHECK_REQUIRED',
        'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
        'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
        'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
        'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
        'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
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
          `certificationItems에 ${s} 상태값이 없습니다`
        );
      }
    });

    await t.test('JSON.stringify 결과에 민감값 미포함 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
        );

      assert.equal(result.isNextStepSeparateApprovalRequired, true);
      assert.equal(result.isNextStepSeparateApprovalGranted, false);
    });

    await t.test('Task 번호 및 참조 Task 검증', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
        );

      assert.equal(result.currentTaskNumber, 295);
      assert.deepEqual(result.referenceTaskNumbers, [294, 293, 292, 291, 290, 289, 276]);
    });

    await t.test('알 수 없는 후보 상태는 BLOCKED_BY_GW_IP로 폴백', () => {
      const result =
        buildNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationView(
          mkInput('UNKNOWN_STATUS')
        );

      assert.equal(
        result.readOnlyDesignFinalizationCandidateStatus,
        'FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP'
      );
      assert.equal(
        result.readOnlyDesignFinalizationCandidateOutcomeCertificationStatus,
        'CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP'
      );
      assert.equal(result.isReadyForNextReadOnlyExecutionApprovalPacket, false);
      assert.equal(result.isNextReadOnlyExecutionApprovalPacketBlocked, true);
    });
  }
);
