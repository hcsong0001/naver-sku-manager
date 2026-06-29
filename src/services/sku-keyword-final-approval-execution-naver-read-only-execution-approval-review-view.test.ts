import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionApprovalReviewView } from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-view.service';

const ALL_REVIEW_ITEM_STATUSES = [
  'USER_APPROVAL_CONFIRMED_FOR_TASK_297',
  'EXECUTION_APPROVAL_PACKET_CONFIRMED',
  'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED',
  'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'EXECUTION_APPROVAL_REVIEW_STATUS_RECORDED',
  'REVIEW_READY_IF_COMPLETE_CANDIDATE',
  'REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  'REVIEW_BLOCKED_RECHECK_REQUIRED',
  'REVIEW_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'REVIEW_BLOCKED_RECHECK_AUTH_REQUIRED',
  'REVIEW_BLOCKED_RECHECK_ENV_REQUIRED',
  'REVIEW_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'REVIEW_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
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
    executionApprovalPacket: {
      readOnlyExecutionApprovalPacketStatus: packetStatus,
    },
    finalizationCandidateOutcomeCertification: {},
    finalizationCandidateSafetyAuditSeal: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionApprovalReviewView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_READY', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_READY');
  });

  it('isNaverReadOnlyExecutionApprovalReviewReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewReady, true);
  });

  it('isNaverReadOnlyExecutionApprovalPacketReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalPacketReady, true);
  });

  it('isUserApprovalConfirmedForTask297 === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isUserApprovalConfirmedForTask297, true);
  });

  it('COMPLETE → EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE + isReviewReadyForComplete + isReviewAvailable', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewReadyForCompleteFinalizationCandidate, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewReadyWithMissingFieldNotice, false);
    assert.equal(view.isMissingFieldNoticePreserved, false);
  });

  it('PARTIAL → EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE + isReviewReadyWithMissingFieldNotice + isReviewAvailable + isMissingFieldNoticePreserved', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewReadyWithMissingFieldNotice, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewReadyForCompleteFinalizationCandidate, false);
  });

  it('BLOCKED_BY_GW_IP → EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP + BlockedByGwIp only + isReviewBlocked', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_GW_IP')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByGwIp, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByProductLookup, false);
  });

  it('BLOCKED_BY_TOKEN → EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN + BlockedByToken only', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_TOKEN')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByToken, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByEnv, false);
  });

  it('BLOCKED_BY_ENV → EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV + BlockedByEnv only', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_ENV')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByEnv, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByChannel, false);
  });

  it('BLOCKED_BY_CHANNEL → EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL + BlockedByChannel only', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_CHANNEL')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByChannel, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByProductLookup, false);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP + BlockedByProductLookup only', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByProductLookup, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlockedByChannel, false);
  });

  it('unknown status falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('TOTALLY_UNKNOWN')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
  });

  it('isReadOnlyExecutionApprovalGrantedInThisTask === false, isExecutionApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('execution button/worker/queue/adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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

  it('design blueprint flags are false/correct', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isDesignBlueprintFinalized, false);
    assert.equal(view.isDesignBlueprintApprovedForExecution, false);
    assert.equal(view.isDesignBlueprintReferenceOnly, true);
    assert.equal(view.isDesignBlueprintCopiedForExecution, false);
    assert.equal(view.isDesignBlueprintPersistedToDb, false);
    assert.equal(view.isDesignFinalizationCandidateStoredInDb, false);
    assert.equal(view.isDesignFinalizationCandidateCopiedForExecution, false);
  });

  it('read-only and no-new-API flags are correct', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock/raw response flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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

  it('Auth/Env/Secret flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isEnvFileDirectlyAccessed, false);
    assert.equal(view.isEnvFileModified, false);
    assert.equal(view.isEnvValueDisplayed, false);
    assert.equal(view.isAuthKeyValueDisplayed, false);
    assert.equal(view.isSecretLogged, false);
    assert.equal(view.isSignatureDisplayed, false);
    assert.equal(view.isAuthorizationHeaderDisplayed, false);
  });

  it('API/DB write flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isProductLookupApiCalled, false);
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('reviewItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    const statuses = view.reviewItems.map((item) => item.status);
    for (const required of ALL_REVIEW_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.currentTaskNumber, 297);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [296, 295, 294, 293, 289, 276]);
  });

  it('isNextStepSeparateApprovalRequired === true, isNextStepSeparateApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });

  it('no execution/DB/Worker/Queue/Adapter code paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewView(
      makeInput('APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
    assert.equal(view.hasApprovalRequestButton, false);
  });
});
