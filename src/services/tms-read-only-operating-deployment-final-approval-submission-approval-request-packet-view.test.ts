import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-final-review-outcome-certification-view.service';

function createDummy368View(
  overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView> = {}
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView {
  return {
    taskId: 368,
    taskName: 'Dummy 368',
    sourceFinalReviewStatus: 'READY',
    sourceRecommendedFinalReviewDecision: 'FINAL_REVIEW_ONLY',
    sourceRecommendedFinalReviewDecisionLabel: 'Final Review Only Label',
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
    operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFIED_READY' as TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus,
    finalReviewOutcomeCertificationStarted: true,
    finalReviewOutcomeCertificationStillReadOnly: true,
    finalReviewOutcomeCertificationStillLocked: true,
    finalReviewOutcomeCertified: true,
    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Final Review 결과 인증 - read-only 인증 전용',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC',
    recommendedDeploymentMode: 'DEP',
    recommendedSafetyMode: 'SAFE',
    outcomeCertificationItems: [],
    finalReviewOutcomeCertificationReadinessItems: [],
    finalReviewReadinessOutcomeCertificationItems: [],
    sealOutcomeCertificationReviewOutcomeCertificationItems: [],
    finalApprovalSubmissionReviewOutcomeCertificationItems: [],
    finalApprovalGrantReviewOutcomeCertificationItems: [],
    deploymentApprovalReviewOutcomeCertificationItems: [],
    deploymentExecutionReviewOutcomeCertificationItems: [],
    infrastructureReviewOutcomeCertificationItems: [],
    domainDnsHttpsReviewOutcomeCertificationItems: [],
    operatingDbReviewOutcomeCertificationItems: [],
    runtimeWorkerQueueAdapterReviewOutcomeCertificationItems: [],
    apiSecretUiActionReviewOutcomeCertificationItems: [],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [],
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    finalReviewOutcomeCertificationReadinessItemCount: 0,
    finalReviewReadinessOutcomeCertificationItemCount: 0,
    sealOutcomeCertificationReviewOutcomeCertificationItemCount: 0,
    finalApprovalSubmissionReviewOutcomeCertificationItemCount: 0,
    finalApprovalGrantReviewOutcomeCertificationItemCount: 0,
    deploymentApprovalReviewOutcomeCertificationItemCount: 0,
    deploymentExecutionReviewOutcomeCertificationItemCount: 0,
    infrastructureReviewOutcomeCertificationItemCount: 0,
    domainDnsHttpsReviewOutcomeCertificationItemCount: 0,
    operatingDbReviewOutcomeCertificationItemCount: 0,
    runtimeWorkerQueueAdapterReviewOutcomeCertificationItemCount: 0,
    apiSecretUiActionReviewOutcomeCertificationItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalOutcomeCertificationItemCount: 0,
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
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertification: true,
    requiresSeparateTask369Approval: true,
    nextTaskApprovalPhrase: '',
    ...overrides,
  };
}

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView', () => {
  it('1. Task 368 CERTIFIED_READY → Task 369 PACKET_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(
      createDummy368View({ operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFIED_READY' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_READY');
  });

  it('2. Task 368 CERTIFIED_PARTIAL_READY → Task 369 PACKET_PARTIAL_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(
      createDummy368View({ operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_PARTIAL_READY');
  });

  it('3. Task 368 OUTCOME_BLOCKED → Task 369 PACKET_BLOCKED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(
      createDummy368View({ operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_BLOCKED' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_BLOCKED');
  });

  it('4. Task 368 OUTCOME_NOT_STARTED → Task 369 PACKET_NOT_STARTED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(
      createDummy368View({ operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_NOT_STARTED' })
    );
    assert.strictEqual(v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_NOT_STARTED');
  });

  it('5. 14개 Approval Request Packet 그룹 존재 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.ok(v.approvalRequestPacketReadinessItems !== undefined);
    assert.ok(v.finalReviewOutcomeCertificationReferenceItems !== undefined);
    assert.ok(v.finalApprovalSubmissionRequestScopeItems !== undefined);
    assert.ok(v.finalApprovalGrantRequestScopeItems !== undefined);
    assert.ok(v.deploymentApprovalRequestScopeItems !== undefined);
    assert.ok(v.deploymentExecutionRequestScopeItems !== undefined);
    assert.ok(v.operatingTransitionRequestScopeItems !== undefined);
    assert.ok(v.infrastructureRequestBoundaryItems !== undefined);
    assert.ok(v.domainDnsHttpsRequestBoundaryItems !== undefined);
    assert.ok(v.operatingDbRequestBoundaryItems !== undefined);
    assert.ok(v.runtimeWorkerQueueAdapterRequestBoundaryItems !== undefined);
    assert.ok(v.apiSecretRawResponseRequestBoundaryItems !== undefined);
    assert.ok(v.uiActionPostSubmitRequestBoundaryItems !== undefined);
    assert.ok(v.separateUserApprovalRequirementItems !== undefined);
  });

  it('6. recommendedApprovalRequestPacketDecision 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.recommendedApprovalRequestPacketDecision, 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_ONLY');
    assert.strictEqual(v.recommendedApprovalRequestPacketDecisionLabel, '최종 승인 제출 Approval Request Packet - read-only 요청 패킷 전용');
  });

  it('7. recommendedNextStep 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW');
  });

  it('8. recommendedApprovalMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('9. recommendedExecutionMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('10. recommendedDeploymentMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_ONLY');
  });

  it('11. recommendedSafetyMode 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('12. 실제 승인 요청 생성/제출 false 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.actualApprovalRequestCreated, false);
    assert.strictEqual(v.actualApprovalRequestSubmitted, false);
    assert.strictEqual(v.approvalRequestStillNotCreated, true);
    assert.strictEqual(v.approvalRequestStillNotSubmitted, true);
  });

  it('13. actual* 안전 플래그 모두 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
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
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacket, true);
    assert.strictEqual(v.requiresSeparateTask370Approval, true);
    assert.strictEqual(v.approvalRequestPacketStarted, true);
    assert.strictEqual(v.approvalRequestPacketStillReadOnly, true);
    assert.strictEqual(v.approvalRequestPacketStillLocked, true);
    assert.strictEqual(v.finalApprovalStillReadOnly, true);
    assert.strictEqual(v.finalApprovalStillBlocked, true);
    assert.strictEqual(v.deploymentApprovalStillBlocked, true);
    assert.strictEqual(v.deploymentExecutionStillBlocked, true);
    assert.strictEqual(v.apiCallStillBlocked, true);
    assert.strictEqual(v.dbWriteStillBlocked, true);
    assert.strictEqual(v.tokenOrAuthStillHidden, true);
    assert.strictEqual(v.rawApiResponseStillHidden, true);
  });

  it('15. Task 370 승인 문구 포함', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.ok(v.nextTaskApprovalPhrase.includes('Task 370에서'));
    assert.ok(v.nextTaskApprovalPhrase.includes('Approval Request Packet Review'));
    assert.ok(v.nextTaskApprovalPhrase.includes('Token/Auth/Signature/Authorization'));
  });

  it('16. source decisions 전파 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.sourceOutcomeCertifiedGoNoGoDecision, 'GO');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalCandidateDecision, 'CANDIDATE');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalSubmissionDecision, 'SUBMISSION');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision, 'PACKET');
    assert.strictEqual(v.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision, 'SEAL');
  });

  it('17. taskId 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView(createDummy368View());
    assert.strictEqual(v.taskId, 369);
  });
});
