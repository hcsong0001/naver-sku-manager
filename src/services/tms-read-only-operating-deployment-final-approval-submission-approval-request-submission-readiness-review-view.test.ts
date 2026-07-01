import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-readiness-review-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-final-review-outcome-certification-view.service';

function makeDummy375Item(overrides: Partial<{
  outcomeCertificationItemId: string;
  outcomeCertificationStatus: 'FINAL_REVIEW_OUTCOME_CERTIFIED' | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_FAILED' | 'FINAL_REVIEW_OUTCOME_CERTIFICATION_NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
}> = {}) {
  return {
    outcomeCertificationItemId: overrides.outcomeCertificationItemId ?? 'final-review-outcome-cert-item-1',
    sourceFinalReviewItemId: 'final-review-item-1',
    category: 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_READINESS' as const,
    label: 'Test Item',
    description: 'Test description',
    sourceTaskId: 375,
    sourceStatus: 'READY',
    sourceFinalReviewStatus: 'FINAL_REVIEW_PASSED',
    outcomeCertificationStatus: overrides.outcomeCertificationStatus ?? 'FINAL_REVIEW_OUTCOME_CERTIFIED',
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

function makeDummy375View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationView {
  const item = makeDummy375Item();
  const emptyItems: ReturnType<typeof makeDummy375Item>[] = [];
  return {
    taskId: 375,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Final Review Outcome Certification',
    sourceFinalReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_READY',
    sourceRecommendedFinalReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_ONLY',
    sourceRecommendedFinalReviewDecisionLabel: 'test label',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus: status,
    approvalRequestPacketFinalReviewOutcomeCertificationStarted: true,
    approvalRequestPacketFinalReviewOutcomeCertificationStillReadOnly: true,
    approvalRequestPacketFinalReviewOutcomeCertificationStillLocked: true,
    approvalRequestPacketFinalReviewOutcomeCertified: true,
    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Packet Final Review 결과 인증 - read-only 인증 전용',
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems: [item],
    approvalRequestPacketFinalReviewOutcomeCertificationReadinessItems: [item],
    approvalRequestPacketFinalReviewOutcomeCertificationItems: [item],
    approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItems: [item],
    finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItems: [item],
    finalApprovalGrantRequestScopeFinalOutcomeCertificationItems: [item],
    deploymentApprovalRequestScopeFinalOutcomeCertificationItems: [item],
    deploymentExecutionRequestScopeFinalOutcomeCertificationItems: [item],
    operatingTransitionRequestScopeFinalOutcomeCertificationItems: [item],
    infrastructureRequestBoundaryFinalOutcomeCertificationItems: [item],
    domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItems: [item],
    operatingDbRequestBoundaryFinalOutcomeCertificationItems: [item],
    runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItems: [item],
    apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItems: [item],
    uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [item],
    partialReadyOutcomeCertificationItems: emptyItems,
    blockedOutcomeCertificationItems: emptyItems,
    notStartedOutcomeCertificationItems: emptyItems,
    approvalRequestPacketFinalReviewOutcomeCertificationReadinessItemCount: 1,
    approvalRequestPacketFinalReviewOutcomeCertificationItemCount: 1,
    approvalRequestPacketSealOutcomeCertificationReferenceFinalOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionRequestScopeFinalOutcomeCertificationItemCount: 1,
    finalApprovalGrantRequestScopeFinalOutcomeCertificationItemCount: 1,
    deploymentApprovalRequestScopeFinalOutcomeCertificationItemCount: 1,
    deploymentExecutionRequestScopeFinalOutcomeCertificationItemCount: 1,
    operatingTransitionRequestScopeFinalOutcomeCertificationItemCount: 1,
    infrastructureRequestBoundaryFinalOutcomeCertificationItemCount: 1,
    domainDnsHttpsRequestBoundaryFinalOutcomeCertificationItemCount: 1,
    operatingDbRequestBoundaryFinalOutcomeCertificationItemCount: 1,
    runtimeWorkerQueueAdapterRequestBoundaryFinalOutcomeCertificationItemCount: 1,
    apiSecretRawResponseRequestBoundaryFinalOutcomeCertificationItemCount: 1,
    uiActionPostSubmitRequestBoundaryFinalOutcomeCertificationItemCount: 1,
    readyItemCount: 1,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketFinalReviewOutcomeCertificationItemCount: 1,
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
    finalReviewOutcomeCertificationStillNotSubmitted: true,
    finalReviewOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertification: true,
    requiresSeparateTask376Approval: true,
    nextTaskApprovalPhrase: 'phrase',
  };
}

describe('Task 376 - TMS Read-Only Approval Request Submission Readiness Review View', () => {
  it('Task375 FINAL_REVIEW_OUTCOME_CERTIFIED_READY → Task376 SUBMISSION_READINESS_REVIEW_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY'
    );
  });

  it('Task375 FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY → Task376 SUBMISSION_READINESS_REVIEW_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY'
    );
  });

  it('Task375 FINAL_REVIEW_OUTCOME_BLOCKED → Task376 SUBMISSION_READINESS_REVIEW_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED'
    );
  });

  it('Task375 FINAL_REVIEW_OUTCOME_NOT_STARTED → Task376 SUBMISSION_READINESS_REVIEW_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED')
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED'
    );
  });

  it('14개 Submission Readiness Review 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.ok(view.approvalRequestSubmissionReadinessReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.approvalRequestPacketFinalReviewOutcomeCertificationReferenceItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestSubmissionScopeReadinessReviewItems.length > 0, 'group 3');
    assert.ok(view.finalApprovalSubmissionScopeReadinessReviewItems.length > 0, 'group 4');
    assert.ok(view.finalApprovalGrantScopeReadinessReviewItems.length > 0, 'group 5');
    assert.ok(view.deploymentApprovalScopeReadinessReviewItems.length > 0, 'group 6');
    assert.ok(view.deploymentExecutionScopeReadinessReviewItems.length > 0, 'group 7');
    assert.ok(view.operatingTransitionScopeReadinessReviewItems.length > 0, 'group 8');
    assert.ok(view.infrastructureSubmissionBoundaryReviewItems.length > 0, 'group 9');
    assert.ok(view.domainDnsHttpsSubmissionBoundaryReviewItems.length > 0, 'group 10');
    assert.ok(view.operatingDbSubmissionBoundaryReviewItems.length > 0, 'group 11');
    assert.ok(view.runtimeWorkerQueueAdapterSubmissionBoundaryReviewItems.length > 0, 'group 12');
    assert.ok(view.apiSecretRawResponseSubmissionBoundaryReviewItems.length > 0, 'group 13');
    assert.ok(view.uiActionPostSubmitSubmissionBoundaryReviewItems.length > 0, 'group 14');
  });

  it('recommendedSubmissionReadinessReviewDecision 값이 FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedSubmissionReadinessReviewDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY');
  });

  it('recommendedNextStep 값이 OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFICATION');
  });

  it('recommendedApprovalMode 값이 SEPARATE_USER_APPROVAL_REQUIRED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('recommendedExecutionMode 값이 EXECUTION_STILL_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('recommendedDeploymentMode 값이 APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedDeploymentMode, 'APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_ONLY');
  });

  it('recommendedSafetyMode 값이 SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualSubmissionReadinessReviewSubmitted, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.approvalRequestStillNotCreated, true);
    assert.equal(view.submissionReadinessReviewStillNotSubmitted, true);
  });

  it('Submission Readiness Review가 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.submissionReadinessReviewNotInterpretedAsSubmission, true);
    assert.equal(view.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('모든 안전 플래그가 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
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

  it('입력 ViewModel(Task375)의 데이터를 변경하지 않는다', () => {
    const input = makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY');
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(input);
    assert.equal(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus, originalStatus);
    assert.equal(input.taskId, 375);
  });

  it('상태 매핑이 exhaustive하다 (4개 모두 다른 Task376 상태로 매핑)', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketFinalReviewOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_NOT_STARTED',
    ];
    const expected376Statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_REVIEW_NOT_STARTED',
    ];
    statuses.forEach((s, idx) => {
      const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
        makeDummy375View(s)
      );
      assert.equal(view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewStatus, expected376Statuses[idx]);
    });
  });

  it('taskId가 376이고 requiresSeparateTask377Approval이 true', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionReadinessReviewView(
      makeDummy375View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW_OUTCOME_CERTIFIED_READY')
    );
    assert.equal(view.taskId, 376);
    assert.equal(view.requiresSeparateTask377Approval, true);
  });
});
