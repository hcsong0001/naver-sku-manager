import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView } from './sku-keyword-final-approval-execution-naver-read-only-execution-readiness-review-safety-audit-seal-view.service';

const ALL_AUDIT_ITEM_STATUSES = [
  'EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEAL_READY',
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
  'EXECUTION_READINESS_REVIEW_STATUS_RECORDED',
  'READINESS_REVIEW_READY_IF_COMPLETE',
  'READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  'READINESS_REVIEW_BLOCKED_CONFIRMED',
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
    executionReadinessApprovalPacket: {},
    executionApprovalReviewOutcomeCertification: {},
    executionApprovalReviewSafetyAuditSeal: {},
    executionApprovalReview: {},
    executionApprovalPacket: {},
    finalizationCandidate: {},
    designBlueprint: {},
    captureResult: {},
  };
}

describe('buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView', () => {
  it('status === NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEALED', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.status, 'NAVER_READ_ONLY_EXECUTION_READINESS_REVIEW_SAFETY_AUDIT_SEALED');
  });

  it('isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessReviewSafetyAuditSealed, true);
  });

  it('isNaverReadOnlyExecutionReadinessReviewReady === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNaverReadOnlyExecutionReadinessReviewReady, true);
  });

  it('isExecutionReadinessReviewConfirmed === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isExecutionReadinessReviewConfirmed, true);
  });

  it('isUserApprovalConfirmedForTask301 === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isUserApprovalConfirmedForTask301, true);
  });

  it('isExecutionReadinessReviewStatusRecorded === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isExecutionReadinessReviewStatusRecorded, true);
  });

  it('COMPLETE → isAvailable === true, isBlocked === false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, false);
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW'
    );
  });

  it('PARTIAL → isAvailable === true, isMissingFieldNoticePreserved === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_WITH_MISSING_FIELD_NOTICE')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, false);
    assert.equal(view.isMissingFieldNoticePreserved, true);
  });

  it('BLOCKED_BY_GW_IP → isBlocked === true, isAvailable === false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, false);
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
    );
  });

  it('BLOCKED_BY_TOKEN → isBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_TOKEN')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
    assert.equal(view.isReadOnlyExecutionReadinessReviewAvailable, false);
  });

  it('BLOCKED_BY_ENV → isBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_ENV')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('BLOCKED_BY_CHANNEL → isBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_CHANNEL')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('BLOCKED_BY_PRODUCT_LOOKUP → isBlocked === true', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP')
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('unknown reviewStatus falls back to BLOCKED_BY_GW_IP', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('INVALID_STATUS')
    );
    assert.equal(
      view.readOnlyExecutionReadinessReviewStatus,
      'EXECUTION_READINESS_REVIEW_BLOCKED_BY_GW_IP'
    );
    assert.equal(view.isReadOnlyExecutionReadinessReviewBlocked, true);
  });

  it('isMarkedReadyForExecutionInThisTask === false, execution flags false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
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
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
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
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
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
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isCapturedDataUsedOnly, true);
    assert.equal(view.isSummaryReviewResultUsedOnly, true);
    assert.equal(view.isNewApiCallExecutedInThisTask, false);
    assert.equal(view.isOptionStructureInferred, false);
    assert.equal(view.isAdditionalProductStructureInferred, false);
  });

  it('price/stock raw value flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isSalePriceRawValueIncluded, false);
    assert.equal(view.isStockQuantityRawValueIncluded, false);
    assert.equal(view.isRawProductApiResponseIncluded, false);
    assert.equal(view.isRawProductApiResponseDisplayed, false);
    assert.equal(view.isRawProductApiResponseStored, false);
  });

  it('Token-related flags are false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
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
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isProductUpdateApiCalled, false);
    assert.equal(view.isPriceOrStockChanged, false);
    assert.equal(view.isDbWriteExecuted, false);
    assert.equal(view.isDbUpsertExecuted, false);
    assert.equal(view.isDbUpdateExecuted, false);
  });

  it('auditItems contains all required status values', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    const statuses = view.auditItems.map((item) => item.status);
    for (const required of ALL_AUDIT_ITEM_STATUSES) {
      assert.ok(statuses.includes(required as any), `Missing status: ${required}`);
    }
  });

  it('JSON.stringify does not contain sensitive values', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
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

  it('task numbers are correct', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.currentTaskNumber, 302);
    assert.deepEqual(Array.from(view.referenceTaskNumbers), [
      301, 300, 299, 298, 297, 296, 295, 294, 293, 289, 276,
    ]);
  });

  it('isNextStepSeparateApprovalRequired === true, isGranted === false', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isNextStepSeparateApprovalRequired, true);
    assert.equal(view.isNextStepSeparateApprovalGranted, false);
  });

  it('no execution/approval/DB paths (final flag check)', () => {
    const view = buildNaverReadOnlyExecutionReadinessReviewSafetyAuditSealView(
      makeInput('EXECUTION_READINESS_REVIEW_READY_FOR_COMPLETE_EXECUTION_APPROVAL_REVIEW')
    );
    assert.equal(view.isActualApprovalSubmissionAllowed, false);
    assert.equal(view.isApprovalSubmitted, false);
    assert.equal(view.isExecutionAllowed, false);
    assert.equal(view.isPostApiConnected, false);
    assert.equal(view.isMutationConnected, false);
    assert.equal(view.isLiveExecutionEnabled, false);
  });
});
