import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-readiness-outcome-certification-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-readiness-review-view.service';

function makeDummy376Item(overrides: Partial<{
  readinessReviewItemId: string;
  readinessReviewStatus: 'SUBMISSION_READINESS_REVIEW_PASSED' | 'SUBMISSION_READINESS_REVIEW_BLOCKED' | 'SUBMISSION_READINESS_REVIEW_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
}> = {}) {
  return {
    readinessReviewItemId: overrides.readinessReviewItemId ?? 'submission-readiness-review-item-1',
    sourceOutcomeCertificationItemId: 'outcome-cert-item-1',
    category: 'APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READINESS' as const,
    label: 'Test Item',
    description: 'Test description',
    sourceTaskId: 376,
    sourceStatus: 'READY',
    sourceOutcomeCertificationStatus: 'FINAL_REVIEW_OUTCOME_CERTIFIED',
    readinessReviewStatus: overrides.readinessReviewStatus ?? 'SUBMISSION_READINESS_REVIEW_PASSED',
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

function makeDummy376View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView {
  const item = makeDummy376Item();
  const emptyItems: ReturnType<typeof makeDummy376Item>[] = [];
  return {
    taskId: 376,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Readiness Review',
    sourceFinalReviewOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY',
    sourceRecommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus: status,
    approvalRequestSubmissionReadinessReviewStarted: true,
    approvalRequestSubmissionReadinessReviewStillReadOnly: true,
    approvalRequestSubmissionReadinessReviewStillLocked: true,
    approvalRequestSubmissionReadinessReviewCompleted: true,
    recommendedSubmissionReadinessReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY',
    recommendedSubmissionReadinessReviewDecisionLabel: '최종 승인 제출 Approval Request Submission Readiness Review - read-only 제출 준비 검토 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    readinessReviewItems: [item],
    approvalRequestSubmissionReadinessReviewReadinessItems: [item],
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems: [item],
    approvalRequestSubmissionScopeReadinessReviewItems: [item],
    finalApprovalSubmissionScopeReadinessReviewItems: [item],
    finalApprovalGrantScopeReadinessReviewItems: [item],
    deploymentApprovalScopeReadinessReviewItems: [item],
    deploymentExecutionScopeReadinessReviewItems: [item],
    operatingTransitionScopeReadinessReviewItems: [item],
    infrastructureSubmissionBoundaryReviewItems: [item],
    domainDnsHttpsSubmissionBoundaryReviewItems: [item],
    operatingDbSubmissionBoundaryReviewItems: [item],
    runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems: [item],
    apiSecretRawResponseSubmissionBoundaryReviewItems: [item],
    uiActionPostSubmitSubmissionBoundaryReviewItems: [item],
    readinessReviewSummaryCards: [],
    readyReadinessReviewItems: [item],
    partialReadyReadinessReviewItems: emptyItems,
    blockedReadinessReviewItems: emptyItems,
    notStartedReadinessReviewItems: emptyItems,
    approvalRequestSubmissionReadinessReviewReadinessItemCount: 1,
    approvalRequestPacketFinalReviewOutcomeCertificationReferenceItemCount: 1,
    approvalRequestSubmissionScopeReadinessReviewItemCount: 1,
    finalApprovalSubmissionScopeReadinessReviewItemCount: 1,
    finalApprovalGrantScopeReadinessReviewItemCount: 1,
    deploymentApprovalScopeReadinessReviewItemCount: 1,
    deploymentExecutionScopeReadinessReviewItemCount: 1,
    operatingTransitionScopeReadinessReviewItemCount: 1,
    infrastructureSubmissionBoundaryReviewItemCount: 1,
    domainDnsHttpsSubmissionBoundaryReviewItemCount: 1,
    operatingDbSubmissionBoundaryReviewItemCount: 1,
    runtimeWorkerQueueAdapterSubmissionBoundaryReviewItemCount: 1,
    apiSecretRawResponseSubmissionBoundaryReviewItemCount: 1,
    uiActionPostSubmitSubmissionBoundaryReviewItemCount: 1,
    readyItemCount: 1,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestSubmissionReadinessReviewItemCount: 1,
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
    submissionReadinessReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReview: true,
    requiresSeparateTask377Approval: true,
    nextTaskApprovalPhrase: 'phrase',
  };
}

describe('Task 377 - TMS Read-Only Approval Request Submission Readiness Outcome Certification View', () => {
  it('Task376 SUBMISSION_READINESS_REVIEW_READY → Task377 SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY'
    );
  });

  it('Task376 SUBMISSION_READINESS_REVIEW_PARTIAL_READY → Task377 SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY'
    );
  });

  it('Task376 SUBMISSION_READINESS_REVIEW_BLOCKED → Task377 SUBMISSION_READINESS_OUTCOME_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED'
    );
  });

  it('Task376 SUBMISSION_READINESS_REVIEW_NOT_STARTED → Task377 SUBMISSION_READINESS_OUTCOME_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED'
    );
  });

  it('14개 Submission Readiness Outcome Certification 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.ok(view.approvalRequestSubmissionReadinessOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestSubmissionScopeOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(view.finalApprovalSubmissionScopeOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.finalApprovalGrantScopeOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.deploymentApprovalScopeOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.deploymentExecutionScopeOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.operatingTransitionScopeOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.infrastructureSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingDbSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(view.apiSecretRawResponseSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 13');
    assert.ok(view.uiActionPostSubmitSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('recommendedOutcomeCertificationDecision 값이 FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.recommendedOutcomeCertificationDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY');
  });

  it('recommendedNextStep 값이 OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW');
  });

  it('recommendedApprovalMode 값이 SEPARATE_USER_APPROVAL_REQUIRED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('recommendedExecutionMode 값이 EXECUTION_STILL_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('recommendedDeploymentMode 값이 APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.recommendedDeploymentMode, 'APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION_ONLY');
  });

  it('recommendedSafetyMode 값이 SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualSubmissionReadinessReviewSubmitted, false);
    assert.equal(view.actualSubmissionReadinessOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.approvalRequestStillNotCreated, true);
    assert.equal(view.submissionReadinessOutcomeCertificationStillNotSubmitted, true);
  });

  it('Submission Readiness 결과 인증이 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.submissionReadinessOutcomeCertificationNotInterpretedAsSubmission, true);
    assert.equal(view.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('모든 안전 플래그가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
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

  it('입력 ViewModel(Task376)의 데이터를 변경하지 않는다', () => {
    const input = makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY');
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(input);
    assert.equal(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus, originalStatus);
    assert.equal(input.taskId, 376);
  });

  it('상태 매핑이 exhaustive하다 (4개 모두 다른 Task377 상태로 매핑)', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED',
    ];
    const expected377Statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_NOT_STARTED',
    ];
    statuses.forEach((s, idx) => {
      const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
        makeDummy376View(s)
      );
      assert.equal(view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationStatus, expected377Statuses[idx]);
    });
  });

  it('taskId가 377이고 requiresSeparateTask378Approval이 true', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessOutcomeCertificationView(
      makeDummy376View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY')
    );
    assert.equal(view.taskId, 377);
    assert.equal(view.requiresSeparateTask378Approval, true);
  });
});
