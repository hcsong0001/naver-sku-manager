import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-lock-review-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-readiness-outcome-certification-view.service';

function makeDummy377Item(overrides: Partial<{
  outcomeCertificationItemId: string;
  outcomeCertificationStatus: 'SUBMISSION_READINESS_OUTCOME_CERTIFIED' | 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_FAILED' | 'SUBMISSION_READINESS_OUTCOME_CERTIFICATION_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
}> = {}) {
  return {
    outcomeCertificationItemId: overrides.outcomeCertificationItemId ?? 'submission-readiness-outcome-cert-item-1',
    sourceReadinessReviewItemId: 'readiness-review-item-1',
    category: 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_READINESS' as const,
    label: 'Test Item',
    description: 'Test description',
    sourceTaskId: 377,
    sourceStatus: 'READY',
    sourceReadinessReviewStatus: 'SUBMISSION_READINESS_REVIEW_PASSED',
    outcomeCertificationStatus: overrides.outcomeCertificationStatus ?? 'SUBMISSION_READINESS_OUTCOME_CERTIFIED',
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

function makeDummy377View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView {
  const item = makeDummy377Item();
  const emptyItems: ReturnType<typeof makeDummy377Item>[] = [];
  return {
    taskId: 377,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Readiness Outcome Certification',
    sourceSubmissionReadinessReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY',
    sourceRecommendedSubmissionReadinessReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY',
    sourceRecommendedSubmissionReadinessReviewDecisionLabel: 'test label',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus: status,
    approvalRequestSubmissionReadinessOutcomeCertificationStarted: true,
    approvalRequestSubmissionReadinessOutcomeCertificationStillReadOnly: true,
    approvalRequestSubmissionReadinessOutcomeCertificationStillLocked: true,
    approvalRequestSubmissionReadinessOutcomeCertified: true,
    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Submission Readiness 결과 인증 - read-only 인증 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems: [item],
    approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems: [item],
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems: [item],
    approvalRequestSubmissionScopeOutcomeCertificationItems: [item],
    finalApprovalSubmissionScopeOutcomeCertificationItems: [item],
    finalApprovalGrantScopeOutcomeCertificationItems: [item],
    deploymentApprovalScopeOutcomeCertificationItems: [item],
    deploymentExecutionScopeOutcomeCertificationItems: [item],
    operatingTransitionScopeOutcomeCertificationItems: [item],
    infrastructureSubmissionBoundaryOutcomeCertificationItems: [item],
    domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems: [item],
    operatingDbSubmissionBoundaryOutcomeCertificationItems: [item],
    runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems: [item],
    apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems: [item],
    uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [item],
    partialReadyOutcomeCertificationItems: emptyItems,
    blockedOutcomeCertificationItems: emptyItems,
    notStartedOutcomeCertificationItems: emptyItems,
    approvalRequestSubmissionReadinessOutcomeCertificationReadinessItemCount: 1,
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItemCount: 1,
    approvalRequestSubmissionScopeOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionScopeOutcomeCertificationItemCount: 1,
    finalApprovalGrantScopeOutcomeCertificationItemCount: 1,
    deploymentApprovalScopeOutcomeCertificationItemCount: 1,
    deploymentExecutionScopeOutcomeCertificationItemCount: 1,
    operatingTransitionScopeOutcomeCertificationItemCount: 1,
    infrastructureSubmissionBoundaryOutcomeCertificationItemCount: 1,
    domainDnsHttpsSubmissionBoundaryOutcomeCertificationItemCount: 1,
    operatingDbSubmissionBoundaryOutcomeCertificationItemCount: 1,
    runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItemCount: 1,
    apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItemCount: 1,
    uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItemCount: 1,
    readyItemCount: 1,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestSubmissionReadinessOutcomeCertificationItemCount: 1,
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
    submissionReadinessOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertification: true,
    requiresSeparateTask378Approval: true,
    nextTaskApprovalPhrase: 'phrase',
  };
}

describe('Task 378 - TMS Read-Only Approval Request Submission Lock Review View', () => {
  it('Task377 SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY → Task378 SUBMISSION_LOCK_REVIEW_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY'
    );
  });

  it('Task377 SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY → Task378 SUBMISSION_LOCK_REVIEW_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY'
    );
  });

  it('Task377 SUBMISSION_READINESS_OUTCOME_BLOCKED → Task378 SUBMISSION_LOCK_REVIEW_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED'
    );
  });

  it('Task377 SUBMISSION_READINESS_OUTCOME_NOT_STARTED → Task378 SUBMISSION_LOCK_REVIEW_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED'
    );
  });

  it('14개 Submission Lock Review 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.ok(view.approvalRequestSubmissionLockReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.approvalRequestSubmissionReadinessOutcomeCertificationLockReviewItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestCreationLockReviewItems.length > 0, 'group 3');
    assert.ok(view.approvalRequestReviewSubmissionLockReviewItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestSubmissionLockReviewItems.length > 0, 'group 5');
    assert.ok(view.finalApprovalSubmissionLockReviewItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalGrantLockReviewItems.length > 0, 'group 7');
    assert.ok(view.deploymentApprovalLockReviewItems.length > 0, 'group 8');
    assert.ok(view.deploymentExecutionLockReviewItems.length > 0, 'group 9');
    assert.ok(view.operatingTransitionLockReviewItems.length > 0, 'group 10');
    assert.ok(view.infrastructureDomainDnsHttpsLockReviewItems.length > 0, 'group 11');
    assert.ok(view.operatingDbLockReviewItems.length > 0, 'group 12');
    assert.ok(view.runtimeWorkerQueueAdapterLockReviewItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostLockReviewItems.length > 0, 'group 14');
  });

  it('recommendedSubmissionLockReviewDecision 값이 FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedSubmissionLockReviewDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY');
  });

  it('recommendedNextStep 값이 OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION');
  });

  it('recommendedApprovalMode 값이 SEPARATE_USER_APPROVAL_REQUIRED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('recommendedExecutionMode 값이 EXECUTION_STILL_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('recommendedDeploymentMode 값이 APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedDeploymentMode, 'APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY');
  });

  it('recommendedSafetyMode 값이 SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualSubmissionReadinessReviewSubmitted, false);
    assert.equal(view.actualSubmissionReadinessOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.approvalRequestStillNotCreated, true);
    assert.equal(view.submissionLockReviewStillNotSubmitted, true);
  });

  it('Submission Lock Review가 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.submissionLockReviewNotInterpretedAsSubmission, true);
    assert.equal(view.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('모든 안전 플래그가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
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

  it('입력 ViewModel(Task377)의 데이터를 변경하지 않는다', () => {
    const input = makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY');
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(input);
    assert.equal(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus, originalStatus);
    assert.equal(input.taskId, 377);
  });

  it('상태 매핑이 exhaustive하다 (4개 모두 다른 Task378 상태로 매핑)', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED',
    ];
    const expected378Statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
    ];
    statuses.forEach((s, idx) => {
      const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
        makeDummy377View(s)
      );
      assert.equal(view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewStatus, expected378Statuses[idx]);
    });
  });

  it('taskId가 378이고 requiresSeparateTask379Approval이 true', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockReviewView(
      makeDummy377View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.taskId, 378);
    assert.equal(view.requiresSeparateTask379Approval, true);
  });
});
