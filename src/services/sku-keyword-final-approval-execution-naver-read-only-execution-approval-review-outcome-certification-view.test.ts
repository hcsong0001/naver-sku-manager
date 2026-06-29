import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView } from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-outcome-certification-view.service';

const ALL_CERTIFICATION_ITEM_STATUSES = [
  'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY',
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'USER_APPROVAL_CONFIRMED_FOR_TASK_297',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'OUTCOME_CERTIFICATION_STATUS_RECORDED',
  'CERTIFIED_READY_IF_COMPLETE_CANDIDATE',
  'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
  'CERTIFIED_BLOCKED_RECHECK_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
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
    executionApprovalReview: {
      readOnlyExecutionApprovalReviewStatus: reviewStatus,
    },
    executionApprovalReviewSafetyAuditSeal: {},
    executionApprovalPacket: {},
    finalizationCandidateOutcomeCertification: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(
      view.status,
      'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_READY'
    );
  });

  it('isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady, true);
  });

  it('isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed, true);
  });

  it('isNaverReadOnlyExecutionApprovalReviewReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewReady, true);
  });

  it('isUserApprovalConfirmedForTask297 === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isUserApprovalConfirmedForTask297, true);
  });

  it('isExecutionApprovalReviewOutcomeCertificationReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isExecutionApprovalReviewOutcomeCertificationReady, true);
  });

  it('isExecutionApprovalReviewSafetyAuditSealed === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isExecutionApprovalReviewSafetyAuditSealed, true);
  });

  it('isExecutionApprovalReviewConfirmed === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isExecutionApprovalReviewConfirmed, true);
  });

  it('isOutcomeCertificationStatusRecorded === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isOutcomeCertificationStatusRecorded, true);
  });

  it('COMPLETE → certStatus CERTIFIED_READY_FOR_COMPLETE', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
      'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE'
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewReadyForCompleteFinalizationCandidate, true);
    assert.equal(view.isReadyForNextReadOnlyExecutionReadinessApprovalPacket, true);
    assert.equal(view.isMissingFieldNoticePreserved, false);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, false);
  });

  it('PARTIAL → certStatus CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
      'CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewReadyWithMissingFieldNotice, true);
    assert.equal(view.isReadyForNextReadOnlyExecutionReadinessApprovalPacket, true);
    assert.equal(view.isMissingFieldNoticePreserved, true);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, false);
  });

  it('BLOCKED_BY_GW_IP → isCertifiedBlockedByGwIp === true, isNextBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewOutcomeCertificationStatus,
      'CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByGwIp, true);
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByToken, false);
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByEnv, false);
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByChannel, false);
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByProductLookup, false);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, true);
    assert.equal(view.isReadyForNextReadOnlyExecutionReadinessApprovalPacket, false);
  });

  it('BLOCKED_BY_TOKEN → isCertifiedBlockedByToken === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByToken, true);
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByGwIp, false);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, true);
  });

  it('BLOCKED_BY_ENV → isCertifiedBlockedByEnv === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV')
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByEnv, true);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, true);
  });

  it('BLOCKED_BY_CHANNEL → isCertifiedBlockedByChannel === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByChannel, true);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, true);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → isCertifiedBlockedByProductLookup === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByProductLookup, true);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, true);
  });

  it('unknown status falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('INVALID_STATUS')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isCertifiedExecutionApprovalReviewBlockedByGwIp, true);
    assert.equal(view.isNextReadOnlyExecutionReadinessApprovalPacketBlocked, true);
  });

  it('isReadOnlyExecutionApprovalGrantedInThisTask === false, isExecutionApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('isExecutionButtonAddedInThisTask and related flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isExecutionButtonAddedInThisTask, false);
    assert.equal(view.hasExecutionButton, false);
    assert.equal(view.hasSubmitAction, false);
    assert.equal(view.hasWorkerTrigger, false);
    assert.equal(view.hasQueueTrigger, false);
    assert.equal(view.hasAdapterTrigger, false);
  });

  it('Worker/Queue/Adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isWorkerExecutedInThisTask, false);
    assert.equal(view.isQueueEnqueuedInThisTask, false);
    assert.equal(view.isAdapterConnectedInThisTask, false);
  });

  it('design blueprint flags are correct', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isDesignBlueprintFinalized, false);
    assert.equal(view.isDesignBlueprintApprovedForExecution, false);
    assert.equal(view.isDesignBlueprintCopiedForExecution, false);
    assert.equal(view.isDesignBlueprintPersistedToDb, false);
    assert.equal(view.isDesignFinalizationCandidateStoredInDb, false);
    assert.equal(view.isDesignFinalizationCandidateCopiedForExecution, false);
  });

  it('read-only and no-new-API flags are correct', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock raw value flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token-related flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('certificationItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    const statuses = view.certificationItems.map((item) => item.status);
    for (const required of ALL_CERTIFICATION_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    const json = JSON.stringify(view);
    assert.ok(!json.includes('access_token'), 'Should not contain access_token');
    assert.ok(!json.includes('client_secret'), 'Should not contain client_secret');
    assert.ok(!json.includes('Bearer '), 'Should not contain Bearer token');
    assert.ok(!json.includes('"signature"'), 'Should not contain signature value');
    assert.ok(!json.includes('salePrice":'), 'Should not contain raw salePrice');
    assert.ok(!json.includes('stockQuantity":'), 'Should not contain raw stockQuantity');
  });

  it('task numbers are correct', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.currentTaskNumber, 299);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [298, 297, 296, 295, 294, 293, 289, 276]);
  });

  it('isNextStepSeparateApprovalRequired === true, isNextStepSeparateApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });

  it('no execution/approval/DB paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewOutcomeCertificationView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });
});
