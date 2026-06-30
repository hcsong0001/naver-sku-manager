import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-review-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-view.service';

function createDummy369View(
  overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView> = {}
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView {
  return {
    taskId: 369,
    taskName: 'Dummy 369',
    sourceOutcomeCertificationStatus: 'READY',
    sourceRecommendedOutcomeCertificationDecision: 'CERTIFICATION_ONLY',
    sourceRecommendedOutcomeCertificationDecisionLabel: 'Certification Only Label',
    sourceOutcomeCertifiedGoNoGoDecision: 'GO',
    sourceOutcomeCertifiedGoNoGoDecisionLabel: 'GO Label',
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: 'CANDIDATE',
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: 'Candidate Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: 'SUBMISSION',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: 'Submission Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: 'PACKET',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: 'Packet Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision: 'SEAL',
    sourceOutcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: 'Seal Label',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_READY' as TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus,
    approvalRequestPacketStarted: true,
    approvalRequestPacketStillReadOnly: true,
    approvalRequestPacketStillLocked: true,
    approvalRequestPacketComposed: true,
    recommendedApprovalRequestPacketDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_ONLY',
    recommendedApprovalRequestPacketDecisionLabel: '최종 승인 제출 Approval Request Packet - read-only 요청 패킷 전용',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC',
    recommendedDeploymentMode: 'DEP',
    recommendedSafetyMode: 'SAFE',
    packetItems: [],
    approvalRequestPacketReadinessItems: [],
    finalReviewOutcomeCertificationReferenceItems: [],
    finalApprovalSubmissionRequestScopeItems: [],
    finalApprovalGrantRequestScopeItems: [],
    deploymentApprovalRequestScopeItems: [],
    deploymentExecutionRequestScopeItems: [],
    operatingTransitionRequestScopeItems: [],
    infrastructureRequestBoundaryItems: [],
    domainDnsHttpsRequestBoundaryItems: [],
    operatingDbRequestBoundaryItems: [],
    runtimeWorkerQueueAdapterRequestBoundaryItems: [],
    apiSecretRawResponseRequestBoundaryItems: [],
    uiActionPostSubmitRequestBoundaryItems: [],
    separateUserApprovalRequirementItems: [],
    packetSummaryCards: [],
    readyPacketItems: [],
    partialReadyPacketItems: [],
    blockedPacketItems: [],
    notStartedPacketItems: [],
    approvalRequestPacketReadinessItemCount: 0,
    finalReviewOutcomeCertificationReferenceItemCount: 0,
    finalApprovalSubmissionRequestScopeItemCount: 0,
    finalApprovalGrantRequestScopeItemCount: 0,
    deploymentApprovalRequestScopeItemCount: 0,
    deploymentExecutionRequestScopeItemCount: 0,
    operatingTransitionRequestScopeItemCount: 0,
    infrastructureRequestBoundaryItemCount: 0,
    domainDnsHttpsRequestBoundaryItemCount: 0,
    operatingDbRequestBoundaryItemCount: 0,
    runtimeWorkerQueueAdapterRequestBoundaryItemCount: 0,
    apiSecretRawResponseRequestBoundaryItemCount: 0,
    uiActionPostSubmitRequestBoundaryItemCount: 0,
    separateUserApprovalRequirementItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketItemCount: 0,
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
    finalApprovalSubmissionPacketStillNotSubmitted: true,
    approvalRequestStillNotCreated: true,
    approvalRequestStillNotSubmitted: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacket: true,
    requiresSeparateTask370Approval: true,
    nextTaskApprovalPhrase: '',
    ...overrides,
  };
}

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView', () => {
  it('1. Task 369 PACKET_READY → Task 370 REVIEW_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(
      createDummy369View({ operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_READY' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_READY');
  });

  it('2. Task 369 PACKET_PARTIAL_READY → Task 370 REVIEW_PARTIAL_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(
      createDummy369View({ operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_PARTIAL_READY' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY');
  });

  it('3. Task 369 PACKET_BLOCKED → Task 370 REVIEW_BLOCKED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(
      createDummy369View({ operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_BLOCKED' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED');
  });

  it('4. Task 369 PACKET_NOT_STARTED → Task 370 REVIEW_NOT_STARTED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(
      createDummy369View({ operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_NOT_STARTED' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED');
  });

  it('5. 14개 Approval Request Packet Review 그룹 존재 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.ok(v.approvalRequestPacketReviewReadinessItems !== undefined);
    assert.ok(v.approvalRequestPacketReferenceReviewItems !== undefined);
    assert.ok(v.finalReviewOutcomeCertificationReferenceReviewItems !== undefined);
    assert.ok(v.finalApprovalSubmissionRequestScopeReviewItems !== undefined);
    assert.ok(v.finalApprovalGrantRequestScopeReviewItems !== undefined);
    assert.ok(v.deploymentApprovalRequestScopeReviewItems !== undefined);
    assert.ok(v.deploymentExecutionRequestScopeReviewItems !== undefined);
    assert.ok(v.operatingTransitionRequestScopeReviewItems !== undefined);
    assert.ok(v.infrastructureRequestBoundaryReviewItems !== undefined);
    assert.ok(v.domainDnsHttpsRequestBoundaryReviewItems !== undefined);
    assert.ok(v.operatingDbRequestBoundaryReviewItems !== undefined);
    assert.ok(v.runtimeWorkerQueueAdapterRequestBoundaryReviewItems !== undefined);
    assert.ok(v.apiSecretRawResponseRequestBoundaryReviewItems !== undefined);
    assert.ok(v.uiActionPostSubmitRequestBoundaryReviewItems !== undefined);
  });

  it('6. recommendedApprovalRequestPacketReviewDecision 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.recommendedApprovalRequestPacketReviewDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_ONLY');
    assert.strictEqual(v.recommendedApprovalRequestPacketReviewDecisionLabel, '최종 승인 제출 Approval Request Packet Review - read-only 검토 전용');
  });

  it('7. recommendedNextStep 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION');
  });

  it('8. recommendedApprovalMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('9. recommendedExecutionMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('10. recommendedDeploymentMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_REVIEW_ONLY');
  });

  it('11. recommendedSafetyMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('12. 실제 승인 요청 생성/제출 false 검증, 검토가 제출로 해석되지 않음', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.actualApprovalRequestCreated, false);
    assert.strictEqual(v.actualApprovalRequestSubmitted, false);
    assert.strictEqual(v.actualApprovalRequestReviewedAsSubmission, false);
    assert.strictEqual(v.approvalRequestStillNotCreated, true);
    assert.strictEqual(v.approvalRequestReviewStillNotSubmitted, true);
  });

  it('13. actual* 안전 플래그 모두 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.actualNaverApiCall, false);
    assert.strictEqual(v.actualProductLookupApiCall, false);
    assert.strictEqual(v.actualProductUpdateApiCall, false);
    assert.strictEqual(v.actualTokenReissue, false);
    assert.strictEqual(v.actualPriceChange, false);
    assert.strictEqual(v.actualStockChange, false);
    assert.strictEqual(v.actualDbWrite, false);
    assert.strictEqual(v.actualOperatingDbConnectionChange, false);
    assert.strictEqual(v.actualEnvReadOrWrite, false);
    assert.strictEqual(v.actualSecretExposure, false);
    assert.strictEqual(v.actualRawApiResponseExposure, false);
    assert.strictEqual(v.actualWorkerRun, false);
    assert.strictEqual(v.actualQueueEnqueue, false);
    assert.strictEqual(v.actualAdapterConnection, false);
    assert.strictEqual(v.actualRuntimeConfiguration, false);
    assert.strictEqual(v.actualFinalApprovalGrant, false);
    assert.strictEqual(v.actualFinalApprovalSubmission, false);
    assert.strictEqual(v.actualDeploymentApproval, false);
    assert.strictEqual(v.actualDeploymentExecution, false);
    assert.strictEqual(v.actualOperatingTransition, false);
    assert.strictEqual(v.actualVpsCreation, false);
    assert.strictEqual(v.actualDomainConnection, false);
    assert.strictEqual(v.actualDnsChange, false);
    assert.strictEqual(v.actualSslCertificateIssue, false);
    assert.strictEqual(v.actualExecutionButtonAdded, false);
    assert.strictEqual(v.actualSubmitActionAdded, false);
    assert.strictEqual(v.actualPostApiAdded, false);
  });

  it('14. read-only true 플래그 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReview, true);
    assert.strictEqual(v.requiresSeparateTask371Approval, true);
    assert.strictEqual(v.approvalRequestPacketReviewStarted, true);
    assert.strictEqual(v.approvalRequestPacketReviewStillReadOnly, true);
    assert.strictEqual(v.approvalRequestPacketReviewStillLocked, true);
    assert.strictEqual(v.finalApprovalStillReadOnly, true);
    assert.strictEqual(v.finalApprovalStillBlocked, true);
    assert.strictEqual(v.deploymentApprovalStillBlocked, true);
    assert.strictEqual(v.deploymentExecutionStillBlocked, true);
    assert.strictEqual(v.apiCallStillBlocked, true);
    assert.strictEqual(v.dbWriteStillBlocked, true);
    assert.strictEqual(v.tokenOrAuthStillHidden, true);
    assert.strictEqual(v.rawApiResponseStillHidden, true);
  });

  it('15. Task 371 승인 문구 포함', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.ok(v.nextTaskApprovalPhrase.includes('Task 371에서'));
    assert.ok(v.nextTaskApprovalPhrase.includes('Approval Request Packet Review 결과 인증'));
    assert.ok(v.nextTaskApprovalPhrase.includes('Token/Auth/Signature/Authorization'));
  });

  it('16. source decisions 전파 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.sourceOutcomeCertifiedGoNoGoDecision, 'GO');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalCandidateDecision, 'CANDIDATE');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalSubmissionDecision, 'SUBMISSION');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision, 'PACKET');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision, 'SEAL');
    assert.strictEqual(v.sourceRecommendedApprovalRequestPacketDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_ONLY');
  });

  it('17. taskId 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView(createDummy369View());
    assert.strictEqual(v.taskId, 370);
  });
});
