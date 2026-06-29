import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverReadOnlyFinalExecutionApprovalPacketView } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-packet-view.service';

const ALL_PACKET_ITEM_STATUSES = [
  'FINAL_EXECUTION_APPROVAL_PACKET_READY',
  'EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_CONFIRMED',
  'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'FINAL_EXECUTION_APPROVAL_PACKET_STATUS_RECORDED',
  'READY_FOR_FINAL_EXECUTION_APPROVAL_REVIEW_IF_COMPLETE',
  'READY_WITH_MISSING_FIELD_NOTICE',
  'BLOCKED_RECHECK_REQUIRED',
  'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'BLOCKED_RECHECK_AUTH_REQUIRED',
  'BLOCKED_RECHECK_ENV_REQUIRED',
  'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
  'PENDING_USER_APPROVAL',
  'NOT_APPROVED',
  'NOT_EXECUTED',
  'NOT_CONNECTED',
  'LOCKED',
  'NOT_APPROVED_FOR_PRODUCT_CHANGE',
  'NOT_STORED',
  'NOT_COPIED_FOR_EXECUTION',
  'CAPTURED_DATA_ONLY_CONFIRMED',
  'SUMMARY_REVIEW_ONLY_CONFIRMED',
  'NOT_INFERRED',
  'NOT_INCLUDED',
  'NOT_DISPLAYED',
  'READ_ONLY_INFO',
];

function makeInput(certificationStatus: string) {
  return {
    executionReadinessReviewOutcomeCertification: {
      readOnlyExecutionReadinessReviewOutcomeCertificationStatus:
        certificationStatus,
    },
    executionReadinessReviewSafetyAuditSeal: {},
    executionReadinessReview: {},
    executionReadinessApprovalPacket: {},
    executionApprovalReviewOutcomeCertification: {},
    executionApprovalReview: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

const serviceSource = readFileSync(
  new URL(
    './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-packet-view.service.ts',
    import.meta.url
  ),
  'utf8'
);

describe('buildNaverReadOnlyFinalExecutionApprovalPacketView', () => {
  it('status === NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_PACKET_READY', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_PACKET_READY');
  });

  it('isNaverReadOnlyFinalExecutionApprovalPacketReady === true', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isNaverReadOnlyFinalExecutionApprovalPacketReady, true);
    assert.equal(
      view.isNaverReadOnlyExecutionReadinessReviewOutcomeCertificationReady,
      true
    );
  });

  it('모든 certification 상태에 대해 packet status가 올바르게 계산된다', () => {
    const cases: Array<[string, string]> = [
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
        'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW',
      ],
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
        'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
      ],
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP',
        'APPROVAL_PACKET_BLOCKED_BY_GW_IP',
      ],
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN',
        'APPROVAL_PACKET_BLOCKED_BY_TOKEN',
      ],
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV',
        'APPROVAL_PACKET_BLOCKED_BY_ENV',
      ],
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL',
        'APPROVAL_PACKET_BLOCKED_BY_CHANNEL',
      ],
      [
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
        'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP',
      ],
    ];

    for (const [certificationStatus, expectedPacketStatus] of cases) {
      const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
        makeInput(certificationStatus)
      );
      assert.equal(
        view.readOnlyFinalExecutionApprovalPacketStatus,
        expectedPacketStatus,
        `certificationStatus=${certificationStatus}`
      );
    }
  });

  it('COMPLETE 상태 플래그가 올바르다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(
      view.readOnlyFinalExecutionApprovalPacketStatus,
      'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_READINESS_REVIEW'
    );
    assert.equal(
      view.isReadOnlyFinalExecutionApprovalPacketReadyForCompleteExecutionReadinessReview,
      true
    );
  });

  it('PARTIAL 상태 플래그가 올바르다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
      )
    );
    assert.equal(
      view.readOnlyFinalExecutionApprovalPacketStatus,
      'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(
      view.isReadOnlyFinalExecutionApprovalPacketReadyWithMissingFieldNotice,
      true
    );
  });

  it('각 BLOCKED 상태는 해당 blocked 플래그만 true다', () => {
    const gw = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP')
    );
    assert.equal(gw.isReadOnlyFinalExecutionApprovalPacketBlockedByGwIp, true);
    assert.equal(gw.isReadOnlyFinalExecutionApprovalPacketBlockedByToken, false);

    const token = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN')
    );
    assert.equal(token.isReadOnlyFinalExecutionApprovalPacketBlockedByToken, true);
    assert.equal(token.isReadOnlyFinalExecutionApprovalPacketBlockedByEnv, false);

    const env = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV')
    );
    assert.equal(env.isReadOnlyFinalExecutionApprovalPacketBlockedByEnv, true);

    const channel = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL')
    );
    assert.equal(channel.isReadOnlyFinalExecutionApprovalPacketBlockedByChannel, true);

    const lookup = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(
      lookup.isReadOnlyFinalExecutionApprovalPacketBlockedByProductLookup,
      true
    );
  });

  it('승인 관련 플래그는 모두 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isReadOnlyFinalExecutionApprovalReviewRequired, true);
    assert.equal(view.isReadOnlyFinalExecutionApprovalReviewGranted, false);
    assert.equal(
      view.isUserApprovalPhraseReceivedForReadOnlyFinalExecutionApprovalReview,
      false
    );
    assert.equal(view.isReadOnlyFinalExecutionApprovalReviewExecutedInThisTask, false);
    assert.equal(view.isFinalExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('실행 버튼/Worker/Queue/Adapter 관련 플래그는 모두 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isMarkedReadyForExecutionInThisTask, false);
    assert.equal(view.isExecutionButtonAddedInThisTask, false);
    assert.equal(view.hasExecutionButton, false);
    assert.equal(view.hasSubmitAction, false);
    assert.equal(view.hasWorkerTrigger, false);
    assert.equal(view.hasQueueTrigger, false);
    assert.equal(view.hasAdapterTrigger, false);
    assert.equal(view.isWorkerExecutedInThisTask, false);
    assert.equal(view.isQueueEnqueuedInThisTask, false);
    assert.equal(view.isAdapterConnectedInThisTask, false);
  });

  it('설계안/후보 저장 및 복사 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isDesignBlueprintFinalized, false);
    assert.equal(view.isDesignBlueprintApprovedForExecution, false);
    assert.equal(view.isDesignBlueprintCopiedForExecution, false);
    assert.equal(view.isDesignBlueprintPersistedToDb, false);
    assert.equal(view.isDesignFinalizationCandidateStoredInDb, false);
    assert.equal(view.isDesignFinalizationCandidateCopiedForExecution, false);
  });

  it('read-only / no-new-API 플래그가 올바르다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('민감 원본값 포함 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token / API / DB 관련 플래그는 false다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isTokenReissuedInThisTask, false);
    assert.equal(view.isTokenIssuanceExecutedInThisTask, false);
    assert.equal(view.isProductLookupApiCalledInThisTask, false);
    assert.equal(view.isNaverApiCalledInThisTask, false);
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('packetItems에 모든 권장 상태값이 포함된다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    const statuses = view.packetItems.map(item => item.status);
    for (const required of ALL_PACKET_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('사용자 승인 문구는 Task 305 기준으로 안내만 하고 승인 처리하지 않는다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(
      view.requiredUserApprovalPhrase,
      'Task 305에서 Naver read-only 최종 실행 승인 검토를 승인합니다. 이 단계는 실제 실행 승인이나 실제 실행이 아니라 최종 실행 승인 가능 여부를 read-only로 검토하는 단계입니다. Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.'
    );
    assert.equal(
      view.isUserApprovalPhraseReceivedForReadOnlyFinalExecutionApprovalReview,
      false
    );
  });

  it('JSON.stringify 결과에 민감정보와 원본값이 포함되지 않는다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    const json = JSON.stringify(view);
    assert.ok(!json.includes('access_token'));
    assert.ok(!json.includes('client_secret'));
    assert.ok(!json.includes('Bearer '));
    assert.ok(!json.includes('"signature"'));
    assert.ok(!json.includes('salePrice":'));
    assert.ok(!json.includes('stockQuantity":'));
  });

  it('실제 승인/실행/상품변경 오해 플래그가 true가 되지 않는다', () => {
    const view = buildNaverReadOnlyFinalExecutionApprovalPacketView(
      makeInput(
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
      )
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });

  it('DB 저장/수정 관련 코드 경로가 없다', () => {
    assert.ok(!serviceSource.includes('prisma'));
    assert.ok(!serviceSource.includes('.create('));
    assert.ok(!serviceSource.includes('.update('));
    assert.ok(!serviceSource.includes('.upsert('));
  });

  it('Worker/Queue/Adapter 관련 실행 코드 경로가 없다', () => {
    assert.ok(!serviceSource.includes('worker.run'));
    assert.ok(!serviceSource.includes('queue.add'));
    assert.ok(!serviceSource.includes('adapter.execute'));
    assert.ok(!serviceSource.includes('fetch('));
  });
});
