import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-lock-outcome-certification-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-lock-review-view.service';

function makeDummy378Item(overrides: Partial<{
  lockReviewItemId: string;
  lockReviewStatus: 'SUBMISSION_LOCK_REVIEW_PASSED' | 'SUBMISSION_LOCK_REVIEW_BLOCKED' | 'SUBMISSION_LOCK_REVIEW_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
}> = {}) {
  return {
    lockReviewItemId: overrides.lockReviewItemId ?? 'submission-lock-review-item-1',
    sourceOutcomeCertificationItemId: 'submission-readiness-outcome-cert-item-1',
    category: 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS' as const,
    label: 'Test Item',
    description: 'Test description',
    sourceTaskId: 378,
    sourceStatus: 'READY',
    sourceOutcomeCertificationStatus: 'SUBMISSION_READINESS_OUTCOME_CERTIFIED',
    lockReviewStatus: overrides.lockReviewStatus ?? 'SUBMISSION_LOCK_REVIEW_PASSED',
    isReady: overrides.isReady ?? true,
    isPartialReady: overrides.isPartialReady ?? false,
    isBlocked: overrides.isBlocked ?? false,
    isNotStarted: overrides.isNotStarted ?? false,
    isReadOnly: true,
    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenReissue: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualApprovalRequestCreated: false,
    actualApprovalRequestReviewedAsSubmission: false,
    actualApprovalRequestSubmitted: false,
    actualFinalApprovalGrant: false,
    actualFinalApprovalSubmission: false,
    actualDeploymentApproval: false,
    actualDeploymentExecution: false,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy378View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView {
  const item = makeDummy378Item();
  const emptyItems: ReturnType<typeof makeDummy378Item>[] = [];
  return {
    taskId: 378,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Lock Review',
    sourceSubmissionReadinessOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY',
    sourceRecommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY',
    sourceRecommendedOutcomeCertificationDecisionLabel: 'test label',
    sourcePacketStatus: 'PACKET_READY',
    sourceOutcomeCertifiedGoNoGoDecision: 'GO',
    sourceOutcomeCertifiedGoNoGoDecisionLabel: 'GO label',
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: 'CANDIDATE',
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: 'Candidate label',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: 'SUBMISSION',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: 'Submission label',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: 'PACKET',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: 'Packet label',
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: 'SEAL',
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: 'Seal label',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus: status,
    approvalRequestSubmissionLockReviewStarted: true,
    approvalRequestSubmissionLockReviewStillReadOnly: true,
    approvalRequestSubmissionLockReviewStillLocked: true,
    approvalRequestSubmissionLockReviewCompleted: true,
    recommendedSubmissionLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSubmissionLockReviewDecisionLabel: '최종 승인 제출 Approval Request Submission Lock Review - read-only 제출 Lock 검토 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    lockReviewItems: [item],
    approvalRequestSubmissionLockReviewReadinessItems: [item],
    approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems: [item],
    approvalRequestCreationLockReviewItems: [item],
    approvalRequestReviewSubmissionLockReviewItems: [item],
    approvalRequestSubmissionLockReviewItems: [item],
    finalApprovalSubmissionLockReviewItems: [item],
    finalApprovalGrantLockReviewItems: [item],
    deploymentApprovalLockReviewItems: [item],
    deploymentExecutionLockReviewItems: [item],
    operatingTransitionLockReviewItems: [item],
    infrastructureDomainDnsHttpsLockReviewItems: [item],
    operatingDbLockReviewItems: [item],
    runtimeWorkerQueueAdapterLockReviewItems: [item],
    apiSecretUiActionPostLockReviewItems: [item],
    lockReviewSummaryCards: [],
    readyLockReviewItems: [item],
    partialReadyLockReviewItems: emptyItems,
    blockedLockReviewItems: emptyItems,
    notStartedLockReviewItems: emptyItems,
    approvalRequestSubmissionLockReviewReadinessItemCount: 1,
    approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItemCount: 1,
    approvalRequestCreationLockReviewItemCount: 1,
    approvalRequestReviewSubmissionLockReviewItemCount: 1,
    approvalRequestSubmissionLockReviewItemCount: 1,
    finalApprovalSubmissionLockReviewItemCount: 1,
    finalApprovalGrantLockReviewItemCount: 1,
    deploymentApprovalLockReviewItemCount: 1,
    deploymentExecutionLockReviewItemCount: 1,
    operatingTransitionLockReviewItemCount: 1,
    infrastructureDomainDnsHttpsLockReviewItemCount: 1,
    operatingDbLockReviewItemCount: 1,
    runtimeWorkerQueueAdapterLockReviewItemCount: 1,
    apiSecretUiActionPostLockReviewItemCount: 1,
    readyItemCount: 1,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestSubmissionLockReviewItemCount: 1,
    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenReissue: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualOperatingDbConnectionChange: false,
    actualEnvReadOrWrite: false,
    actualSecretExposure: false,
    actualRawApiResponseExposure: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualAdapterConnection: false,
    actualRuntimeConfiguration: false,
    actualApprovalRequestCreated: false,
    actualApprovalRequestReviewedAsSubmission: false,
    actualApprovalRequestSubmitted: false,
    actualSubmissionReadinessReviewSubmitted: false,
    actualSubmissionReadinessOutcomeCertificationSubmitted: false,
    actualSubmissionLockReviewSubmitted: false,
    actualFinalApprovalGrant: false,
    actualFinalApprovalSubmission: false,
    actualDeploymentApproval: false,
    actualDeploymentExecution: false,
    actualOperatingTransition: false,
    actualVpsCreation: false,
    actualDomainConnection: false,
    actualDnsChange: false,
    actualSslCertificateIssue: false,
    actualExecutionButtonAdded: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
    finalApprovalSubmissionStillNotPerformed: true,
    approvalRequestStillNotCreated: true,
    submissionReadinessReviewStillNotSubmitted: true,
    submissionReadinessOutcomeCertificationStillNotSubmitted: true,
    submissionLockReviewStillNotSubmitted: true,
    submissionLockReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReview: true,
    requiresSeparateTask379Approval: true,
    nextTaskApprovalPhrase: 'phrase',
  };
}

describe('Task 379 - TMS Read-Only Approval Request Submission Lock Outcome Certification View', () => {
  it('Task378 SUBMISSION_LOCK_REVIEW_READY → Task379 SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY'
    );
  });

  it('Task378 SUBMISSION_LOCK_REVIEW_PARTIAL_READY → Task379 SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'
    );
  });

  it('Task378 SUBMISSION_LOCK_REVIEW_BLOCKED → Task379 SUBMISSION_LOCK_OUTCOME_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED'
    );
  });

  it('Task378 SUBMISSION_LOCK_REVIEW_NOT_STARTED → Task379 SUBMISSION_LOCK_OUTCOME_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED'
    );
  });

  it('14개 Submission Lock Outcome Certification 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.ok(view.approvalRequestSubmissionLockOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.approvalRequestSubmissionLockReviewOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems.length > 0, 'group 3');
    assert.ok(view.approvalRequestCreationLockOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestReviewSubmissionLockOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionLockOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionLockOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantLockOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalLockOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionLockOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionLockOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.infrastructureDomainDnsHttpsLockOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(view.operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostLockOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('recommendedOutcomeCertificationDecision 값이 FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.recommendedOutcomeCertificationDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY');
  });

  it('recommendedNextStep 값이 OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW');
  });

  it('recommendedApprovalMode 값이 SEPARATE_USER_APPROVAL_REQUIRED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('recommendedExecutionMode 값이 EXECUTION_STILL_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('recommendedDeploymentMode 값이 APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.recommendedDeploymentMode, 'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY');
  });

  it('recommendedSafetyMode 값이 SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualSubmissionReadinessReviewSubmitted, false);
    assert.equal(view.actualSubmissionReadinessOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualSubmissionLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.approvalRequestStillNotCreated, true);
    assert.equal(view.submissionLockOutcomeCertificationStillNotSubmitted, true);
  });

  it('Submission Lock 결과 인증이 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.submissionLockOutcomeCertificationNotInterpretedAsSubmission, true);
    assert.equal(view.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('모든 안전 플래그가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.actualNaverApiCall, false);
    assert.equal(view.actualProductLookupApiCall, false);
    assert.equal(view.actualProductUpdateApiCall, false);
    assert.equal(view.actualTokenReissue, false);
    assert.equal(view.actualPriceChange, false);
    assert.equal(view.actualStockChange, false);
    assert.equal(view.actualDbWrite, false);
    assert.equal(view.actualOperatingDbConnectionChange, false);
    assert.equal(view.actualEnvReadOrWrite, false);
    assert.equal(view.actualSecretExposure, false);
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualWorkerRun, false);
    assert.equal(view.actualQueueEnqueue, false);
    assert.equal(view.actualAdapterConnection, false);
    assert.equal(view.actualRuntimeConfiguration, false);
    assert.equal(view.actualDeploymentApproval, false);
    assert.equal(view.actualDeploymentExecution, false);
    assert.equal(view.actualOperatingTransition, false);
    assert.equal(view.actualVpsCreation, false);
    assert.equal(view.actualDomainConnection, false);
    assert.equal(view.actualDnsChange, false);
    assert.equal(view.actualSslCertificateIssue, false);
    assert.equal(view.actualExecutionButtonAdded, false);
    assert.equal(view.actualSubmitActionAdded, false);
    assert.equal(view.actualPostApiAdded, false);
  });

  it('입력 ViewModel(Task378)의 데이터를 변경하지 않는다', () => {
    const input = makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY');
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(input);
    assert.equal(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus, originalStatus);
    assert.equal(input.taskId, 378);
  });

  it('상태 매핑이 exhaustive하다 (4개 모두 다른 Task379 상태로 매핑)', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
    ];
    const expected379Statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
    ];
    statuses.forEach((s, idx) => {
      const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy378View(s)
      );
      assert.equal(view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus, expected379Statuses[idx]);
    });
  });

  it('taskId가 379이고 requiresSeparateTask380Approval이 true', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView(
      makeDummy378View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY')
    );
    assert.equal(view.taskId, 379);
    assert.equal(view.requiresSeparateTask380Approval, true);
  });
});
