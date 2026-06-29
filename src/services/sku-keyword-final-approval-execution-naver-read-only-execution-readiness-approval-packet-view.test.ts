import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionReadinessApprovalPacketView } from './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-approval-packet-view.service';

const ALL_PACKET_ITEM_STATUSES = [
  'EXECUTION_READINESS_APPROVAL_PACKET_READY',
  'EXECUTION_APPROVAL_REVIEW_OUTCOME_CERTIFICATION_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'EXECUTION_READINESS_APPROVAL_PACKET_STATUS_RECORDED',
  'READY_FOR_EXECUTION_READINESS_REVIEW_IF_COMPLETE',
  'READY_WITH_MISSING_FIELD_NOTICE',
  'BLOCKED_RECHECK_REQUIRED',
  'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'BLOCKED_RECHECK_AUTH_REQUIRED',
  'BLOCKED_RECHECK_ENV_REQUIRED',
  'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
  'PENDING_USER_APPROVAL',
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

function makeInput(certStatus: string) {
  return {
    executionApprovalReviewOutcomeCertification: {
      readOnlyExecutionApprovalReviewOutcomeCertificationStatus: certStatus,
    },
    executionApprovalReviewSafetyAuditSeal: {},
    executionApprovalReview: {},
    executionApprovalPacket: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionReadinessApprovalPacketView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_READINESS_APPROVAL_PACKET_READY', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_EXECUTION_READINESS_APPROVAL_PACKET_READY');
  });

  it('isNaverReadOnlyExecutionReadinessApprovalPacketReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessApprovalPacketReady, true);
  });

  it('isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewOutcomeCertificationReady, true);
  });

  it('COMPLETE → packetStatus APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(
      view.readOnlyExecutionReadinessApprovalPacketStatus,
      'APPROVAL_PACKET_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
    );
    assert.equal(
      view.isReadOnlyExecutionReadinessApprovalPacketReadyForCompleteExecutionApprovalReview,
      true
    );
    assert.equal(
      view.isReadOnlyExecutionReadinessApprovalPacketReadyWithMissingFieldNotice,
      false
    );
    assert.equal(view.isMissingFieldNoticePreserved, false);
  });

  it('PARTIAL → packetStatus APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(
      view.readOnlyExecutionReadinessApprovalPacketStatus,
      'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(
      view.isReadOnlyExecutionReadinessApprovalPacketReadyWithMissingFieldNotice,
      true
    );
    assert.equal(view.isMissingFieldNoticePreserved, true);
  });

  it('BLOCKED_BY_GW_IP → packetStatus APPROVAL_PACKET_BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP')
    );
    assert.equal(
      view.readOnlyExecutionReadinessApprovalPacketStatus,
      'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByGwIp, true);
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByProductLookup, false);
  });

  it('BLOCKED_BY_TOKEN → packetStatus APPROVAL_PACKET_BLOCKED_BY_TOKEN', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByToken, true);
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByGwIp, false);
  });

  it('BLOCKED_BY_ENV → packetStatus APPROVAL_PACKET_BLOCKED_BY_ENV', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV')
    );
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByEnv, true);
  });

  it('BLOCKED_BY_CHANNEL → packetStatus APPROVAL_PACKET_BLOCKED_BY_CHANNEL', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByChannel, true);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → packetStatus APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByProductLookup, true);
  });

  it('unknown certStatus falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('INVALID_STATUS')
    );
    assert.equal(
      view.readOnlyExecutionReadinessApprovalPacketStatus,
      'APPROVAL_PACKET_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionReadinessApprovalPacketBlockedByGwIp, true);
  });

  it('isReadOnlyExecutionReadinessReviewRequired === true, isGranted === false', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewRequired, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewGranted, false);
    assert.equal(view.isUserApprovalPhraseReceivedForReadOnlyExecutionReadinessReview, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewExecutedInThisTask, false);
  });

  it('isMarkedReadyForExecutionInThisTask === false, execution approval flags false', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isMarkedReadyForExecutionInThisTask, false);
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('execution button and Worker/Queue/Adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isDesignBlueprintFinalized, false);
    assert.equal(view.isDesignBlueprintApprovedForExecution, false);
    assert.equal(view.isDesignBlueprintCopiedForExecution, false);
    assert.equal(view.isDesignBlueprintPersistedToDb, false);
    assert.equal(view.isDesignFinalizationCandidateStoredInDb, false);
    assert.equal(view.isDesignFinalizationCandidateCopiedForExecution, false);
  });

  it('read-only and no-new-API flags are correct', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock raw value flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token-related flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('packetItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    const statuses = view.packetItems.map((item) => item.status);
    for (const required of ALL_PACKET_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('userApprovalPhrase contains Task 301 reference', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.ok(
      view.userApprovalPhrase.includes('Task 301'),
      'userApprovalPhrase should reference Task 301'
    );
    assert.ok(
      !view.isUserApprovalPhraseReceivedForReadOnlyExecutionReadinessReview,
      'approval phrase is for display only, not treated as approval'
    );
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.currentTaskNumber, 300);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [
      299, 298, 297, 296, 295, 294, 293, 289, 276,
    ]);
  });

  it('no execution/approval/DB paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionReadinessApprovalPacketView(
      makeInput('CERTIFIED_EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });
});
