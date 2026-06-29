import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverReadOnlyDesignFinalizationApprovalPacketView } from './sku-keyword-final-approval-execution-naver-read-only-design-finalization-approval-packet-view.service';

const mkInput = (
  optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus: string
) => ({
  blueprintOutcomeCertification: {
    optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus,
  },
  blueprintSafetyAuditSeal: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintSafetyAuditSealed:
      true,
  },
  designBlueprint: {
    isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintReady: true,
  },
  planningApprovalPacket: null,
  captureResult: {
    isNaverReadOnlyProductDataCaptureResultReady: true,
  },
});

const cases = [
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY',
    packetStatus: 'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint',
  },
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE',
    packetStatus: 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice',
  },
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_GW_IP',
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp',
  },
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_TOKEN',
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketBlockedByToken',
  },
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_ENV',
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_ENV',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv',
  },
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_CHANNEL',
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel',
  },
  {
    outcomeStatus: 'CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP',
    packetStatus: 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
    flag: 'isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup',
  },
] as const;

test(
  'NaverReadOnlyDesignFinalizationApprovalPacketView (Task 292)',
  async (t) => {
    await t.test('핵심 상태 및 준비 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY')
      );
      assert.strictEqual(
        result.status,
        'NAVER_READ_ONLY_DESIGN_FINALIZATION_APPROVAL_PACKET_READY'
      );
      assert.strictEqual(
        result.isNaverReadOnlyDesignFinalizationApprovalPacketReady,
        true
      );
      assert.strictEqual(
        result.isNaverReadOnlyOptionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationReady,
        true
      );
    });

    await t.test(
      '모든 outcome certification 상태에 대해 approval packet 상태가 올바르게 계산됨',
      () => {
        for (const item of cases) {
          const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
            mkInput(item.outcomeStatus)
          );
          assert.strictEqual(
            result.readOnlyDesignFinalizationApprovalPacketStatus,
            item.packetStatus
          );
          const enabledFlags = [
            result
              .isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint,
            result
              .isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice,
            result.isReadOnlyDesignFinalizationApprovalPacketBlockedByGwIp,
            result.isReadOnlyDesignFinalizationApprovalPacketBlockedByToken,
            result.isReadOnlyDesignFinalizationApprovalPacketBlockedByEnv,
            result.isReadOnlyDesignFinalizationApprovalPacketBlockedByChannel,
            result.isReadOnlyDesignFinalizationApprovalPacketBlockedByProductLookup,
          ].filter(Boolean);
          assert.strictEqual(enabledFlags.length, 1);
          assert.strictEqual((result as any)[item.flag], true);
        }
      }
    );

    await t.test('COMPLETE 상태 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY')
      );
      assert.strictEqual(
        result.readOnlyDesignFinalizationApprovalPacketStatus,
        'APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT'
      );
      assert.strictEqual(
        result.isReadOnlyDesignFinalizationApprovalPacketReadyForCompleteBlueprint,
        true
      );
    });

    await t.test('PARTIAL 상태 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE')
      );
      assert.strictEqual(
        result.readOnlyDesignFinalizationApprovalPacketStatus,
        'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
      );
      assert.strictEqual(
        result.isReadOnlyDesignFinalizationApprovalPacketReadyWithMissingFieldNotice,
        true
      );
    });

    await t.test('사용자 승인 관련 플래그는 승인 처리되지 않음', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY')
      );
      assert.strictEqual(result.isReadOnlyDesignFinalizationApprovalRequired, true);
      assert.strictEqual(result.isReadOnlyDesignFinalizationApprovalGranted, false);
      assert.strictEqual(
        result.isUserApprovalPhraseReceivedForReadOnlyDesignFinalization,
        false
      );
      assert.strictEqual(
        result.isReadOnlyDesignFinalizationExecutedInThisTask,
        false
      );
      assert.ok(result.requiredUserApprovalPhrase.includes('Task 293'));
    });

    await t.test('설계 확정/실행 승인 방지 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_BLOCKED_BY_PRODUCT_LOOKUP')
      );
      assert.strictEqual(result.isDesignBlueprintFinalized, false);
      assert.strictEqual(result.isDesignBlueprintApprovedForExecution, false);
      assert.strictEqual(result.isExecutionApprovalGranted, false);
    });

    await t.test('read-only 및 비실행 플래그 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY')
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

    await t.test('packetItems에 권장 상태값 포함 검증', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_WITH_MISSING_FIELD_NOTICE')
      );
      const statuses = result.packetItems.map((item) => item.status);
      assert.ok(statuses.includes('BLUEPRINT_OUTCOME_CERTIFICATION_CONFIRMED'));
      assert.ok(statuses.includes('BLUEPRINT_SAFETY_AUDIT_SEAL_CONFIRMED'));
      assert.ok(statuses.includes('DESIGN_BLUEPRINT_CONFIRMED'));
      assert.ok(statuses.includes('PLANNING_CANDIDATE_CONFIRMED'));
      assert.ok(statuses.includes('CAPTURE_RESULT_CONFIRMED'));
      assert.ok(statuses.includes('APPROVAL_PACKET_STATUS_RECORDED'));
      assert.ok(statuses.includes('READY_FOR_FINALIZATION_IF_COMPLETE_BLUEPRINT'));
      assert.ok(statuses.includes('READY_WITH_MISSING_FIELD_NOTICE'));
      assert.ok(statuses.includes('BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED'));
      assert.ok(statuses.includes('BLOCKED_RECHECK_AUTH_REQUIRED'));
      assert.ok(statuses.includes('BLOCKED_RECHECK_ENV_REQUIRED'));
      assert.ok(
        statuses.includes('BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED')
      );
      assert.ok(statuses.includes('BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED'));
      assert.ok(statuses.includes('PENDING_USER_APPROVAL'));
      assert.ok(statuses.includes('LOCKED_UNTIL_USER_APPROVAL'));
      assert.ok(statuses.includes('NOT_FINALIZED'));
      assert.ok(statuses.includes('NOT_APPROVED_FOR_EXECUTION'));
      assert.ok(statuses.includes('CAPTURED_DATA_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('SUMMARY_REVIEW_ONLY_CONFIRMED'));
      assert.ok(statuses.includes('NOT_INFERRED'));
      assert.ok(statuses.includes('NOT_INCLUDED'));
      assert.ok(statuses.includes('NOT_DISPLAYED'));
      assert.ok(statuses.includes('NOT_EXECUTED'));
      assert.ok(statuses.includes('LOCKED'));
      assert.ok(statuses.includes('READ_ONLY_INFO'));
    });

    await t.test('JSON.stringify 결과에 민감값과 원본값이 포함되지 않음', () => {
      const result = buildNaverReadOnlyDesignFinalizationApprovalPacketView(
        mkInput('CERTIFIED_BLUEPRINT_READY_FOR_COMPLETE_SUMMARY')
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
