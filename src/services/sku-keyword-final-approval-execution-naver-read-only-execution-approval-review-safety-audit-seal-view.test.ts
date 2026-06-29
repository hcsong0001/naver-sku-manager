import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-read-only-execution-approval-review-safety-audit-seal-view.service';

const ALL_AUDIT_ITEM_STATUSES = [
  'EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEAL_READY',
  'EXECUTION_APPROVAL_REVIEW_CONFIRMED',
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
  'REVIEW_BLOCKED_CONFIRMED',
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
    executionApprovalPacket: {},
    finalizationCandidateOutcomeCertification: {},
    finalizationCandidateSafetyAuditSeal: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEALED', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(
      view.status,
      'NAVER_READ_ONLY_EXECUTION_APPROVAL_REVIEW_SAFETY_AUDIT_SEALED'
    );
  });

  it('isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewSafetyAuditSealed, true);
  });

  it('isNaverReadOnlyExecutionApprovalReviewReady === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNaverReadOnlyExecutionApprovalReviewReady, true);
  });

  it('isExecutionApprovalReviewConfirmed === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isExecutionApprovalReviewConfirmed, true);
  });

  it('isUserApprovalConfirmedForTask297 === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isUserApprovalConfirmedForTask297, true);
  });

  it('isExecutionApprovalReviewStatusRecorded === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isExecutionApprovalReviewStatusRecorded, true);
  });

  it('COMPLETE → isReadOnlyExecutionApprovalReviewAvailable === true, isBlocked === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, false);
  });

  it('PARTIAL → isReadOnlyExecutionApprovalReviewAvailable === true, isMissingFieldNoticePreserved === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, true);
  });

  it('BLOCKED_BY_GW_IP → isReadOnlyExecutionApprovalReviewAvailable === false, isBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
  });

  it('BLOCKED_BY_TOKEN → isReviewBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
  });

  it('BLOCKED_BY_ENV → isReviewBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_ENV')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
  });

  it('BLOCKED_BY_CHANNEL → isReviewBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → isReviewBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionApprovalReviewAvailable, false);
  });

  it('unknown status falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('INVALID_STATUS')
    );
    assert.equal(
      view.readOnlyExecutionApprovalReviewStatus,
      'EXECUTION_APPROVAL_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionApprovalReviewBlocked, true);
  });

  it('isReadOnlyExecutionApprovalGrantedInThisTask === false, isExecutionApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isReadOnlyExecutionApprovalGrantedInThisTask, false);
    assert.equal(view.isExecutionApprovalGranted, false);
    assert.equal(view.isExecutionExecutedInThisTask, false);
    assert.equal(view.isProductChangeApprovalGranted, false);
  });

  it('execution button/worker/queue/adapter flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock/raw response flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
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

  it('Auth/Env/Secret flags are false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
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
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isProductLookupApiCalled, false);
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('auditItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    const statuses = view.auditItems.map((item) => item.status);
    for (const required of ALL_AUDIT_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
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
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.currentTaskNumber, 298);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [297, 296, 295, 294, 293, 289, 276]);
  });

  it('isNextStepSeparateApprovalRequired === true, isNextStepSeparateApprovalGranted === false', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
      makeInput('EXECUTION_APPROVAL_REVIEW_READY_FOR_COMPLETE_FINALIZATION_CANDIDATE')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });

  it('no execution/DB/Worker/Queue/Adapter code paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionApprovalReviewSafetyAuditSealView(
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
