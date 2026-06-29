import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-outcome-certification-view.service';

const ALL_CERTIFICATION_ITEM_STATUSES = [
  'EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_READY',
  'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_CONFIRMED',
  'USER_APPROVAL_CONFIRMED_FOR_TASK_301',
  'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'OUTCOME_CERTIFICATION_STATUS_RECORDED',
  'CERTIFIED_READY_IF_COMPLETE',
  'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
  'CERTIFIED_BLOCKED_RECHECK_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
  'NOT_MARKED_READY_FOR_EXECUTION',
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
  'PENDING_SEPARATE_APPROVAL',
];

function makeInput(reviewStatus: string) {
  return {
    executionReadinessReview: {
      readOnlyExecutionReadinessReviewStatus: reviewStatus,
    },
    executionReadinessReviewSafetyAuditSeal: {},
    executionReadinessApprovalPacket: {},
    executionApprovalReviewOutcomeCertification: {},
    executionApprovalReview: {},
    executionApprovalPacket: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

const serviceSource = readFileSync(
  new URL(
    './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-outcome-certification-view.service.ts',
    import.meta.url
  ),
  'utf8'
);

describe('buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_READY', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(
      view.status,
      'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_OUTCOME_CERTIFICATION_READY'
    );
  });

  it('isNaverReadOnlyExecutionReadinessReviewOutcomeCertificationReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessReviewOutcomeCertificationReady, true);
  });

  it('isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed, true);
  });

  it('isNaverReadOnlyExecutionReadinessReviewReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessReviewReady, true);
  });

  it('isUserApprovalConfirmedForTask301 === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isUserApprovalConfirmedForTask301, true);
  });

  it('COMPLETE → certificationStatus CERTIFIED_READY_FOR_COMPLETE', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewOutcomeCertificationStatus,
      'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
    );
    assert.equal(
      view.isCertifiedExecutionReadinessReviewReadyForCompleteExecutionApprovalReview,
      true
    );
    assert.equal(view.isReadyForNextReadOnlyFinalExecutionApprovalPacket, true);
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, false);
  });

  it('PARTIAL → certificationStatus CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewOutcomeCertificationStatus,
      'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(view.isCertifiedExecutionReadinessReviewReadyWithMissingFieldNotice, true);
    assert.equal(view.isReadyForNextReadOnlyFinalExecutionApprovalPacket, true);
    assert.equal(view.isMissingFieldNoticePreserved, true);
  });

  it('BLOCKED_BY_GW_IP → isCertifiedBlockedByGwIp === true, isNextBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewOutcomeCertificationStatus,
      'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByGwIp, true);
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByToken, false);
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByEnv, false);
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByChannel, false);
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByProductLookup, false);
    assert.equal(view.isReadyForNextReadOnlyFinalExecutionApprovalPacket, false);
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, true);
  });

  it('BLOCKED_BY_TOKEN → isCertifiedBlockedByToken === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByToken, true);
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, true);
    assert.equal(view.isReadyForNextReadOnlyFinalExecutionApprovalPacket, false);
  });

  it('BLOCKED_BY_ENV → isCertifiedBlockedByEnv === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV')
    );
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByEnv, true);
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, true);
  });

  it('BLOCKED_BY_CHANNEL → isCertifiedBlockedByChannel === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByChannel, true);
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, true);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → isCertifiedBlockedByProductLookup === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(view.isCertifiedExecutionReadinessReviewBlockedByProductLookup, true);
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, true);
  });

  it('unknown reviewStatus falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('INVALID_STATUS')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isNextReadOnlyFinalExecutionApprovalPacketBlocked, true);
  });

  it('isMarkedReadyForExecutionInThisTask === false, execution flags false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isMarkedReadyForExecutionInThisTask, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewGranted, false);
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('execution button and Worker/Queue/Adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
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

  it('design blueprint flags are correct', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isDesignBlueprintFinalized, false);
    assert.equal(view.isDesignBlueprintApprovedForExecution, false);
    assert.equal(view.isDesignBlueprintCopiedForExecution, false);
    assert.equal(view.isDesignBlueprintPersistedToDb, false);
    assert.equal(view.isDesignFinalizationCandidateStoredInDb, false);
    assert.equal(view.isDesignFinalizationCandidateCopiedForExecution, false);
  });

  it('read-only and no-new-API flags are correct', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock raw value flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token-related flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isTokenReissuedInThisTask, false);
    assert.equal(view.isTokenIssuanceExecutedInThisTask, false);
    assert.equal(view.isProductLookupApiCalledInThisTask, false);
    assert.equal(view.isNaverApiCalledInThisTask, false);
    assert.equal(view.isTokenValueIncludedInView, false);
    assert.equal(view.isTokenValueDisplayed, false);
    assert.equal(view.isTokenReturnedToClient, false);
    assert.equal(view.isTokenLoggedToConsole, false);
    assert.equal(view.isTokenStored, false);
    assert.equal(view.isTokenStoredInDb, false);
    assert.equal(view.isTokenStoredInFile, false);
  });

  it('DB write/upsert/update and product API flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('certificationItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    const statuses = view.certificationItems.map((item) => item.status);
    for (const required of ALL_CERTIFICATION_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    const json = JSON.stringify(view);
    assert.ok(!json.includes('access_token'), 'Should not contain access_token');
    assert.ok(!json.includes('client_secret'), 'Should not contain client_secret');
    assert.ok(!json.includes('Bearer '), 'Should not contain Bearer token');
    assert.ok(!json.includes('"signature"'), 'Should not contain signature value');
    assert.ok(!json.includes('salePrice":'), 'Should not contain raw salePrice');
    assert.ok(!json.includes('stockQuantity":'), 'Should not contain raw stockQuantity');
  });

  it('DB 저장/수정 관련 코드 경로가 없다', () => {
    assert.ok(!serviceSource.includes('prisma'), 'Should not contain prisma');
    assert.ok(!serviceSource.includes('.create('), 'Should not contain create path');
    assert.ok(!serviceSource.includes('.update('), 'Should not contain update path');
    assert.ok(!serviceSource.includes('.upsert('), 'Should not contain upsert path');
  });

  it('Worker/Queue/Adapter 관련 실행 코드 경로가 없다', () => {
    assert.ok(!serviceSource.includes('worker.run'), 'Should not contain worker.run');
    assert.ok(!serviceSource.includes('queue.add'), 'Should not contain queue.add');
    assert.ok(!serviceSource.includes('adapter.execute'), 'Should not contain adapter.execute');
    assert.ok(!serviceSource.includes('fetch('), 'Should not contain fetch');
  });

  it('task numbers are correct', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.currentTaskNumber, 303);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [
      302, 301, 300, 299, 298, 297, 296, 295, 294, 293, 289, 276,
    ]);
  });

  it('isNextStepSeparateApprovalRequired === true, isGranted === false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });

  it('no execution/approval/DB paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });

  it('all 7 readOnlyExecutionReadinessReviewStatus values produce correct certificationStatus', () => {
    const cases: Array<[string, string]> = [
      [
        'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW',
      ],
      [
        'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
      ],
      [
        'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP',
      ],
      [
        'EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN',
      ],
      [
        'EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV',
      ],
      [
        'EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL',
      ],
      [
        'EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
        'CERTIFIED_EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP',
      ],
    ];
    for (const [reviewStatus, expectedCertificationStatus] of cases) {
      const view = buildNaverReadOnlyExecutionReadinessReviewOutcomeCertificationView(
        makeInput(reviewStatus)
      );
      assert.equal(
        view.readOnlyExecutionReadinessReviewOutcomeCertificationStatus,
        expectedCertificationStatus,
        `reviewStatus=${reviewStatus}`
      );
    }
  });
});
