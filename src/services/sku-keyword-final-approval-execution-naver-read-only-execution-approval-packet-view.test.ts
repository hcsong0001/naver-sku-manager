import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionApprovalPacketView } from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-packet-view.service';

const ALL_PACKET_STATUSES = [
  'FINALIZATION_CANDIDATE_OUTCOME_CERTIFICATION_CONFIRMED',
  'FINALIZATION_CANDIDATE_SAFETY_AUDIT_SEAL_CONFIRMED',
  'FINALIZATION_CANDIDATE_CONFIRMED',
  'DESIGN_FINALIZATION_APPROVAL_PACKET_CONFIRMED',
  'DESIGN_BLUEPRINT_CONFIRMED',
  'CAPTURE_RESULT_CONFIRMED',
  'EXECUTION_APPROVAL_PACKET_STATUS_RECORDED',
  'READY_FOR_EXECUTION_REVIEW_IF_COMPLETE_CANDIDATE',
  'READY_WITH_MISSING_FIELD_NOTICE',
  'BLOCKED_RECHECK_REQUIRED',
  'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
  'BLOCKED_RECHECK_AUTH_REQUIRED',
  'BLOCKED_RECHECK_ENV_REQUIRED',
  'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
  'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
  'PENDING_USER_APPROVAL',
  'LOCKED_UNTIL_USER_APPROVAL',
  'NOT_EXECUTED',
  'NOT_CONNECTED',
  'LOCKED',
  'NOT_FINALIZED',
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

function makeInput(outcomeCertificationStatus: string) {
  return {
    finalizationCandidateOutcomeCertification: {
      readOnlyDesignFinalizationCandidateOutcomeCertificationStatus:
        outcomeCertificationStatus,
    },
    finalizationCandidateSafetyAuditSeal: {},
    finalizationCandidate: {},
    designFinalizationApprovalPacket: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionApprovalPacketView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_APPROVAL_PACKET_READY', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_EXECUTION_APPROVAL_PACKET_READY');
  });

  it('isNaverReadOnlyExecutionApprovalPacketReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalPacketReady, true);
  });

  it('isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(view.isNaverReadOnlyDesignFinalizationCandidateOutcomeCertificationReady, true);
  });

  it('COMPLETE → APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE + isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(
      view.readOnlyExecutionApprovalPacketStatus,
      'APPROVAL_PACKET_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE'
    );
    assert.equal(view.isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByProductLookup, false);
  });

  it('PARTIAL → APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE + isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(
      view.readOnlyExecutionApprovalPacketStatus,
      'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
    );
    assert.equal(view.isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, false);
  });

  it('BLOCKED_BY_GW_IP → APPROVAL_PACKET_BLOCKED_BY_GW_IP + isReadOnlyExecutionApprovalPacketBlockedByGwIp only', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_GW_IP')
    );
    assert.equal(view.readOnlyExecutionApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_GW_IP');
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByProductLookup, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketReadyForCompleteFinalizationCandidate, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketReadyWithMissingFieldNotice, false);
  });

  it('BLOCKED_BY_TOKEN → APPROVAL_PACKET_BLOCKED_BY_TOKEN + isReadOnlyExecutionApprovalPacketBlockedByToken only', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.readOnlyExecutionApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_TOKEN');
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByToken, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByProductLookup, false);
  });

  it('BLOCKED_BY_ENV → APPROVAL_PACKET_BLOCKED_BY_ENV + isReadOnlyExecutionApprovalPacketBlockedByEnv only', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_ENV')
    );
    assert.equal(view.readOnlyExecutionApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_ENV');
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByEnv, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByChannel, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByProductLookup, false);
  });

  it('BLOCKED_BY_CHANNEL → APPROVAL_PACKET_BLOCKED_BY_CHANNEL + isReadOnlyExecutionApprovalPacketBlockedByChannel only', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.readOnlyExecutionApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_CHANNEL');
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByChannel, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByProductLookup, false);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP + isReadOnlyExecutionApprovalPacketBlockedByProductLookup only', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(
      view.readOnlyExecutionApprovalPacketStatus,
      'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP'
    );
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByProductLookup, true);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByToken, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByEnv, false);
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByChannel, false);
  });

  it('unknown status falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('TOTALLY_UNKNOWN_STATUS')
    );
    assert.equal(view.readOnlyExecutionApprovalPacketStatus, 'APPROVAL_PACKET_BLOCKED_BY_GW_IP');
    assert.equal(view.isReadOnlyExecutionApprovalPacketBlockedByGwIp, true);
  });

  it('isReadOnlyExecutionApprovalRequired === true, isReadOnlyExecutionApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isReadOnlyExecutionApprovalRequired, true);
    assert.equal(view.isReadOnlyExecutionApprovalGranted, false);
    assert.equal(view.isUserApprovalPhraseReceivedForReadOnlyExecutionApproval, false);
    assert.equal(view.isReadOnlyExecutionApprovalExecutedInThisTask, false);
  });

  it('execution and product change approval flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('design blueprint flags are false/correct', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock/raw response flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isProductLookupApiCalled, false);
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('execution button/worker/queue/adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.hasExecutionButton, false);
    assert.equal(view.hasSubmitAction, false);
    assert.equal(view.hasWorkerTrigger, false);
    assert.equal(view.hasQueueTrigger, false);
    assert.equal(view.hasAdapterTrigger, false);
    assert.equal(view.hasApprovalRequestButton, false);
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });

  it('packetItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    const statuses = view.packetItems.map((item) => item.status);
    for (const required of ALL_PACKET_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('userApprovalPhrase references Task 297 and does not grant approval', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.ok(view.userApprovalPhrase.includes('Task 297'), 'userApprovalPhrase should reference Task 297');
    assert.equal(view.isUserApprovalPhraseReceivedForReadOnlyExecutionApproval, false);
    assert.equal(view.isReadOnlyExecutionApprovalGranted, false);
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
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
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.currentTaskNumber, 296);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [295, 294, 293, 292, 289, 276]);
  });

  it('no misidentified approval flags (isNextStepSeparateApprovalRequired/Granted)', () => {
    const view = buildNaverReadOnlyExecutionApprovalPacketView(
      makeInput('CERTIFIED_FINALIZATION_CANDIDATE_READY_FOR_COMPLETE_BLUEPRINT')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });
});
