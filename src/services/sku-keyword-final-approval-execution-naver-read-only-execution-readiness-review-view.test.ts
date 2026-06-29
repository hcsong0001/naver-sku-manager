import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionReadinessReviewView } from './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-view.service';

const ALL_REVIEW_ITEM_STATUSES = [
  'USER_APPROVAL_CONFIRMED_FOR_TASK_301',
  'EXECUTION_READINESS_APPROVAL_PACKET_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'EXECUTION_READINESS_REVIEW_STATUS_RECORDED',
  'READINESS_REVIEW_READY_IF_COMPLETE',
  'READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  'READINESS_REVIEW_BLOCKED_RECHECK_REQUIRED',
  'READINESS_REVIEW_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'READINESS_REVIEW_BLOCKED_RECHECK_AUTH_REQUIRED',
  'READINESS_REVIEW_BLOCKED_RECHECK_ENV_REQUIRED',
  'READINESS_REVIEW_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'READINESS_REVIEW_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
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
];

function makeInput(packetStatus: string) {
  return {
    executionReadinessApprovalPacket: {
      readOnlyExecutionReadinessApprovalPacketStatus: packetStatus,
    },
    executionApprovalReviewOutcomeCertification: {},
    executionApprovalReviewSafetyAuditSeal: {},
    executionApprovalReview: {},
    executionApprovalPacket: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionReadinessReviewView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_READY', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_READY');
  });

  it('isNaverReadOnlyExecutionReadinessReviewReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessReviewReady, true);
  });

  it('isNaverReadOnlyExecutionReadinessApprovalPacketReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessApprovalPacketReady, true);
  });

  it('isUserApprovalConfirmedForTask301 === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isUserApprovalConfirmedForTask301, true);
  });

  it('isExecutionReadinessReviewStatusRecorded === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isExecutionReadinessReviewStatusRecorded, true);
  });

  it('COMPLETE → reviewStatus EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewReadyForCompleteExecutionApprovalReview, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, false);
  });

  it('PARTIAL → reviewStatus EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewReadyWithMissingFieldNotice, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, true);
    assert.equal(view.isMissingFieldNoticePreserved, true);
  });

  it('BLOCKED_BY_GW_IP → reviewStatus BLOCKED_BY_GW_IP, isBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_GW_IP')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByGwIp, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByProductLookup, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('BLOCKED_BY_TOKEN → isBlockedByToken === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByToken, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, false);
  });

  it('BLOCKED_BY_ENV → isBlockedByEnv === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_ENV')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByEnv, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('BLOCKED_BY_CHANNEL → isBlockedByChannel === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByChannel, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → isBlockedByProductLookup === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlockedByProductLookup, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('unknown packetStatus falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('INVALID_STATUS')
    );
    assert.equal(
      view.readOnlyExecutionReadinessApprovalPacketStatus,
      'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('isMarkedReadyForExecutionInThisTask === false, execution flags false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isMarkedReadyForExecutionInThisTask, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewGranted, false);
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('execution button and Worker/Queue/Adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
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
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isDesignBlueprintFinalized, false);
    assert.equal(view.isDesignBlueprintApprovedForExecution, false);
    assert.equal(view.isDesignBlueprintCopiedForExecution, false);
    assert.equal(view.isDesignBlueprintPersistedToDb, false);
    assert.equal(view.isDesignFinalizationCandidateStoredInDb, false);
    assert.equal(view.isDesignFinalizationCandidateCopiedForExecution, false);
  });

  it('read-only and no-new-API flags are correct', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock raw value flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token-related flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
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
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('reviewItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    const statuses = view.reviewItems.map((item) => item.status);
    for (const required of ALL_REVIEW_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
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
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.currentTaskNumber, 301);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [
      300, 299, 298, 297, 296, 295, 294, 293, 289, 276,
    ]);
  });

  it('isNextStepSeparateApprovalRequired === true, isGranted === false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });

  it('no execution/approval/DB paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });
});
