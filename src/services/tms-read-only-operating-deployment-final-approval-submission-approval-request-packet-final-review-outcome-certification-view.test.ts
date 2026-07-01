import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-final-review-outcome-certification-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-final-review-view.service';

function makeDummy374Item(overrides: Partial<{
  finalReviewItemId: string;
  finalReviewStatus: 'FINAL_REVIEW_PASSED' | 'FINAL_REVIEW_BLOCKED' | 'FINAL_REVIEW_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
}> = {}) {
  return {
    finalReviewItemId: overrides.finalReviewItemId ?? 'final-review-item-1',
    sourceSealOutcomeCertificationItemId: 'cert-item-1',
    category: 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READINESS' as const,
    label: 'Test Item',
    description: 'Test description',
    sourceTaskId: 374,
    sourceStatus: 'READY',
    sourceSealOutcomeCertificationStatus: 'SEAL_OUTCOME_CERTIFIED',
    finalReviewStatus: overrides.finalReviewStatus ?? 'FINAL_REVIEW_PASSED',
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

function makeDummy374View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView {
  const item = makeDummy374Item();
  const emptyItems: ReturnType<typeof makeDummy374Item>[] = [];
  return {
    taskId: 374,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Final Review',
    sourceSealOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY',
    sourceRecommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus: status,
    approvalRequestPacketFinalReviewStarted: true,
    approvalRequestPacketFinalReviewStillReadOnly: true,
    approvalRequestPacketFinalReviewStillLocked: true,
    approvalRequestPacketFinalReviewCompleted: true,
    recommendedFinalReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY',
    recommendedFinalReviewDecisionLabel: '최종 승인 제출 Approval Request Packet Final Review - read-only 최종 검토 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalReviewItems: [item],
    approvalRequestPacketFinalReviewReadinessItems: [item],
    approvalRequestPacketSealOutcomeCertificationFinalReviewItems: [item],
    approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems: [item],
    finalApprovalSubmissionRequestScopeFinalReviewItems: [item],
    finalApprovalGrantRequestScopeFinalReviewItems: [item],
    deploymentApprovalRequestScopeFinalReviewItems: [item],
    deploymentExecutionRequestScopeFinalReviewItems: [item],
    operatingTransitionRequestScopeFinalReviewItems: [item],
    infrastructureRequestBoundaryFinalReviewItems: [item],
    domainDnsHttpsRequestBoundaryFinalReviewItems: [item],
    operatingDbRequestBoundaryFinalReviewItems: [item],
    runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems: [item],
    apiSecretRawResponseRequestBoundaryFinalReviewItems: [item],
    uiActionPostSubmitRequestBoundaryFinalReviewItems: [item],
    finalReviewSummaryCards: [],
    readyFinalReviewItems: [item],
    partialReadyFinalReviewItems: emptyItems,
    blockedFinalReviewItems: emptyItems,
    notStartedFinalReviewItems: emptyItems,
    approvalRequestPacketFinalReviewReadinessItemCount: 1,
    approvalRequestPacketSealOutcomeCertificationFinalReviewItemCount: 1,
    approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItemCount: 1,
    finalApprovalSubmissionRequestScopeFinalReviewItemCount: 1,
    finalApprovalGrantRequestScopeFinalReviewItemCount: 1,
    deploymentApprovalRequestScopeFinalReviewItemCount: 1,
    deploymentExecutionRequestScopeFinalReviewItemCount: 1,
    operatingTransitionRequestScopeFinalReviewItemCount: 1,
    infrastructureRequestBoundaryFinalReviewItemCount: 1,
    domainDnsHttpsRequestBoundaryFinalReviewItemCount: 1,
    operatingDbRequestBoundaryFinalReviewItemCount: 1,
    runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItemCount: 1,
    apiSecretRawResponseRequestBoundaryFinalReviewItemCount: 1,
    uiActionPostSubmitRequestBoundaryFinalReviewItemCount: 1,
    readyItemCount: 1,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketFinalReviewItemCount: 1,
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
    finalReviewStillNotSubmitted: true,
    finalReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReview: true,
    requiresSeparateTask375Approval: true,
    nextTaskApprovalPhrase: 'phrase',
  };
}

describe('Task 375 - TMS Read-Only Approval Request Packet Final Review Outcome Certification View', () => {
  it('Task374 FINAL_REVIEW_READY → Task375 FINAL_REVIEW_OUTCOME_CERTIFIED_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY'
    );
  });

  it('Task374 FINAL_REVIEW_PARTIAL_READY → Task375 FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
    );
  });

  it('Task374 FINAL_REVIEW_BLOCKED → Task375 FINAL_REVIEW_OUTCOME_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED'
    );
  });

  it('Task374 FINAL_REVIEW_NOT_STARTED → Task375 FINAL_REVIEW_OUTCOME_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED'
    );
  });

  it('14개 Final Review Outcome Certification 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.ok(view.approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.approvalRequestPacketFinalReviewOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(view.finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.finalApprovalGrantRequestScopeFinalOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.deploymentApprovalRequestScopeFinalOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.deploymentExecutionRequestScopeFinalOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.operatingTransitionRequestScopeFinalOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.infrastructureRequestBoundaryFinalOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingDbRequestBoundaryFinalOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(view.apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems.length > 0, 'group 13');
    assert.ok(view.uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('recommendedOutcomeCertificationDecision 값이 FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.recommendedOutcomeCertificationDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY');
  });

  it('recommendedNextStep 값이 OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW');
  });

  it('recommendedApprovalMode 값이 SEPARATE_USER_APPROVAL_REQUIRED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('recommendedExecutionMode 값이 EXECUTION_STILL_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('recommendedDeploymentMode 값이 APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY');
  });

  it('recommendedSafetyMode 값이 SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.approvalRequestStillNotCreated, true);
    assert.equal(view.finalReviewOutcomeCertificationStillNotSubmitted, true);
  });

  it('Final Review 결과 인증이 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.finalReviewOutcomeCertificationNotInterpretedAsSubmission, true);
    assert.equal(view.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('모든 안전 플래그가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
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

  it('입력 ViewModel(Task374)의 데이터를 변경하지 않는다', () => {
    const input = makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY');
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(input);
    assert.equal(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus, originalStatus);
    assert.equal(input.taskId, 374);
  });

  it('상태 매핑이 exhaustive하다 (4개 모두 다른 Task375 상태로 매핑)', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED',
    ];
    const expected375Statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED',
    ];
    statuses.forEach((s, idx) => {
      const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
        makeDummy374View(s)
      );
      assert.equal(view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus, expected375Statuses[idx]);
    });
  });

  it('taskId가 375이고 requiresSeparateTask376Approval이 true', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView(
      makeDummy374View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY')
    );
    assert.equal(view.taskId, 375);
    assert.equal(view.requiresSeparateTask376Approval, true);
  });
});
