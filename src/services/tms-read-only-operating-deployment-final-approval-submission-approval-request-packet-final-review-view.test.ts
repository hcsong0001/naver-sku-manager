import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-final-review-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-seal-outcome-certification-view.service';

function makeDummy373Item(overrides: Partial<{
  outcomeCertificationItemId: string;
  outcomeCertificationStatus: 'SEAL_OUTCOME_CERTIFIED' | 'SEAL_OUTCOME_CERTIFICATION_FAILED' | 'SEAL_OUTCOME_CERTIFICATION_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
}> = {}) {
  return {
    outcomeCertificationItemId: overrides.outcomeCertificationItemId ?? 'cert-item-1',
    sourceSealReviewItemId: 'seal-item-1',
    category: 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_READINESS' as const,
    label: 'Test Item',
    description: 'Test description',
    sourceTaskId: 373,
    sourceStatus: 'READY',
    sourceSealReviewStatus: 'SEAL_REVIEW_PASSED',
    outcomeCertificationStatus: overrides.outcomeCertificationStatus ?? 'SEAL_OUTCOME_CERTIFIED',
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

function makeDummy373View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView {
  const item = makeDummy373Item();
  const emptyItems: ReturnType<typeof makeDummy373Item>[] = [];
  return {
    taskId: 373,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Seal Outcome Certification',
    sourceSealReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY',
    sourceRecommendedSealReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_ONLY',
    sourceRecommendedSealReviewDecisionLabel: 'test label',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus: status,
    approvalRequestPacketSealOutcomeCertificationStarted: true,
    approvalRequestPacketSealOutcomeCertificationStillReadOnly: true,
    approvalRequestPacketSealOutcomeCertificationStillLocked: true,
    approvalRequestPacketSealOutcomeCertified: true,
    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Packet Seal 결과 인증 - read-only 인증 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems: [item],
    approvalRequestPacketSealOutcomeCertificationReadinessItems: [item],
    approvalRequestPacketSealReviewOutcomeCertificationItems: [item],
    approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems: [item],
    finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems: [item],
    finalApprovalGrantRequestScopeSealOutcomeCertificationItems: [item],
    deploymentApprovalRequestScopeSealOutcomeCertificationItems: [item],
    deploymentExecutionRequestScopeSealOutcomeCertificationItems: [item],
    operatingTransitionRequestScopeSealOutcomeCertificationItems: [item],
    infrastructureRequestBoundarySealOutcomeCertificationItems: [item],
    domainDnsHttpsRequestBoundarySealOutcomeCertificationItems: [item],
    operatingDbRequestBoundarySealOutcomeCertificationItems: [item],
    runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems: [item],
    apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems: [item],
    uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [item],
    partialReadyOutcomeCertificationItems: emptyItems,
    blockedOutcomeCertificationItems: emptyItems,
    notStartedOutcomeCertificationItems: emptyItems,
    approvalRequestPacketSealOutcomeCertificationReadinessItemCount: 1,
    approvalRequestPacketSealReviewOutcomeCertificationItemCount: 1,
    approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionRequestScopeSealOutcomeCertificationItemCount: 1,
    finalApprovalGrantRequestScopeSealOutcomeCertificationItemCount: 1,
    deploymentApprovalRequestScopeSealOutcomeCertificationItemCount: 1,
    deploymentExecutionRequestScopeSealOutcomeCertificationItemCount: 1,
    operatingTransitionRequestScopeSealOutcomeCertificationItemCount: 1,
    infrastructureRequestBoundarySealOutcomeCertificationItemCount: 1,
    domainDnsHttpsRequestBoundarySealOutcomeCertificationItemCount: 1,
    operatingDbRequestBoundarySealOutcomeCertificationItemCount: 1,
    runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItemCount: 1,
    apiSecretRawResponseRequestBoundarySealOutcomeCertificationItemCount: 1,
    uiActionPostSubmitRequestBoundarySealOutcomeCertificationItemCount: 1,
    readyItemCount: 1,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketSealOutcomeCertificationItemCount: 1,
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
    sealOutcomeCertificationStillNotSubmitted: true,
    sealOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertification: true,
    requiresSeparateTask374Approval: true,
    nextTaskApprovalPhrase: 'phrase',
  };
}

describe('Task 374 - TMS Read-Only Approval Request Packet Final Review View', () => {
  it('Task373 SEAL_OUTCOME_CERTIFIED_READY → Task374 FINAL_REVIEW_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY'
    );
  });

  it('Task373 SEAL_OUTCOME_CERTIFIED_PARTIAL_READY → Task374 FINAL_REVIEW_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY'
    );
  });

  it('Task373 SEAL_OUTCOME_BLOCKED → Task374 FINAL_REVIEW_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED'
    );
  });

  it('Task373 SEAL_OUTCOME_NOT_STARTED → Task374 FINAL_REVIEW_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED'
    );
  });

  it('14개 Final Review 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.ok(view.approvalRequestPacketFinalReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.approvalRequestPacketSealOutcomeCertificationFinalReviewItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestPacketReviewOutcomeCertificationReferenceFinalReviewItems.length > 0, 'group 3');
    assert.ok(view.finalApprovalSubmissionRequestScopeFinalReviewItems.length > 0, 'group 4');
    assert.ok(view.finalApprovalGrantRequestScopeFinalReviewItems.length > 0, 'group 5');
    assert.ok(view.deploymentApprovalRequestScopeFinalReviewItems.length > 0, 'group 6');
    assert.ok(view.deploymentExecutionRequestScopeFinalReviewItems.length > 0, 'group 7');
    assert.ok(view.operatingTransitionRequestScopeFinalReviewItems.length > 0, 'group 8');
    assert.ok(view.infrastructureRequestBoundaryFinalReviewItems.length > 0, 'group 9');
    assert.ok(view.domainDnsHttpsRequestBoundaryFinalReviewItems.length > 0, 'group 10');
    assert.ok(view.operatingDbRequestBoundaryFinalReviewItems.length > 0, 'group 11');
    assert.ok(view.runtimeWorkerQueueAdapterRequestBoundaryFinalReviewItems.length > 0, 'group 12');
    assert.ok(view.apiSecretRawResponseRequestBoundaryFinalReviewItems.length > 0, 'group 13');
    assert.ok(view.uiActionPostSubmitRequestBoundaryFinalReviewItems.length > 0, 'group 14');
  });

  it('recommendedFinalReviewDecision 값이 FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedFinalReviewDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY');
  });

  it('recommendedNextStep 값이 OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION');
  });

  it('recommendedApprovalMode 값이 SEPARATE_USER_APPROVAL_REQUIRED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('recommendedExecutionMode 값이 EXECUTION_STILL_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('recommendedDeploymentMode 값이 APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY');
  });

  it('recommendedSafetyMode 값이 SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.approvalRequestStillNotCreated, true);
    assert.equal(view.finalReviewStillNotSubmitted, true);
  });

  it('Final Review가 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.finalReviewNotInterpretedAsSubmission, true);
    assert.equal(view.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('모든 안전 플래그가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
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

  it('입력 ViewModel(Task373)의 데이터를 변경하지 않는다', () => {
    const input = makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY');
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(input);
    assert.equal(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus, originalStatus);
    assert.equal(input.taskId, 373);
  });

  it('상태 매핑이 exhaustive하다 (4개 모두 다른 Task374 상태로 매핑)', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED',
    ];
    const expected374Statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_NOT_STARTED',
    ];
    statuses.forEach((s, idx) => {
      const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
        makeDummy373View(s)
      );
      assert.equal(view.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewStatus, expected374Statuses[idx]);
    });
  });

  it('taskId가 374이고 requiresSeparateTask375Approval이 true', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewView(
      makeDummy373View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.taskId, 374);
    assert.equal(view.requiresSeparateTask375Approval, true);
  });
});
