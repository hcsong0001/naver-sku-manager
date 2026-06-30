import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-seal-review-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-review-outcome-certification-view.service';

function createDummy371View(
  overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView> = {}
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView {
  return {
    taskId: 371,
    taskName: 'Dummy 371',
    sourceReviewStatus: 'REVIEW_READY',
    sourceRecommendedApprovalRequestPacketReviewDecision: 'REVIEW_ONLY',
    sourceRecommendedApprovalRequestPacketReviewDecisionLabel: 'Review Only Label',
    sourcePacketStatus: 'PACKET_READY',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY' as TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
    approvalRequestPacketReviewOutcomeCertificationStarted: true,
    approvalRequestPacketReviewOutcomeCertificationStillReadOnly: true,
    approvalRequestPacketReviewOutcomeCertificationStillLocked: true,
    approvalRequestPacketReviewOutcomeCertified: true,
    recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel: 'Outcome Certification Only Label',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC',
    recommendedDeploymentMode: 'DEP',
    recommendedSafetyMode: 'SAFE',
    outcomeCertificationItems: [],
    approvalRequestPacketReviewOutcomeCertificationReadinessItems: [],
    approvalRequestPacketReferenceReviewOutcomeCertificationItems: [],
    finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems: [],
    finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems: [],
    finalApprovalGrantRequestScopeReviewOutcomeCertificationItems: [],
    deploymentApprovalRequestScopeReviewOutcomeCertificationItems: [],
    deploymentExecutionRequestScopeReviewOutcomeCertificationItems: [],
    operatingTransitionRequestScopeReviewOutcomeCertificationItems: [],
    infrastructureRequestBoundaryReviewOutcomeCertificationItems: [],
    domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems: [],
    operatingDbRequestBoundaryReviewOutcomeCertificationItems: [],
    runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems: [],
    apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems: [],
    uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems: [],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [],
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    approvalRequestPacketReviewOutcomeCertificationReadinessItemCount: 0,
    approvalRequestPacketReferenceReviewOutcomeCertificationItemCount: 0,
    finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItemCount: 0,
    finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItemCount: 0,
    finalApprovalGrantRequestScopeReviewOutcomeCertificationItemCount: 0,
    deploymentApprovalRequestScopeReviewOutcomeCertificationItemCount: 0,
    deploymentExecutionRequestScopeReviewOutcomeCertificationItemCount: 0,
    operatingTransitionRequestScopeReviewOutcomeCertificationItemCount: 0,
    infrastructureRequestBoundaryReviewOutcomeCertificationItemCount: 0,
    domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItemCount: 0,
    operatingDbRequestBoundaryReviewOutcomeCertificationItemCount: 0,
    runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItemCount: 0,
    apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItemCount: 0,
    uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketReviewOutcomeCertificationItemCount: 0,
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
    approvalRequestReviewOutcomeCertificationStillNotSubmitted: true,
    reviewOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertification: true,
    requiresSeparateTask372Approval: true,
    nextTaskApprovalPhrase: '',
    ...overrides,
  };
}

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView', () => {
  it('1. Task 371 OUTCOME_CERTIFIED_READY → Task 372 SEAL_REVIEW_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY'
    );
  });

  it('2. Task 371 OUTCOME_CERTIFIED_PARTIAL_READY → Task 372 SEAL_REVIEW_PARTIAL_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_PARTIAL_READY'
    );
  });

  it('3. Task 371 OUTCOME_BLOCKED → Task 372 SEAL_REVIEW_BLOCKED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_BLOCKED'
    );
  });

  it('4. Task 371 OUTCOME_NOT_STARTED → Task 372 SEAL_REVIEW_NOT_STARTED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_NOT_STARTED'
    );
  });

  it('5. 14개 Seal Review 그룹이 모두 생성된다', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.ok(Array.isArray(v.approvalRequestPacketSealReviewReadinessItems), '그룹 1');
    assert.ok(Array.isArray(v.approvalRequestPacketReviewOutcomeCertificationSealReviewItems), '그룹 2');
    assert.ok(Array.isArray(v.finalReviewOutcomeCertificationReferenceSealReviewItems), '그룹 3');
    assert.ok(Array.isArray(v.finalApprovalSubmissionRequestScopeSealReviewItems), '그룹 4');
    assert.ok(Array.isArray(v.finalApprovalGrantRequestScopeSealReviewItems), '그룹 5');
    assert.ok(Array.isArray(v.deploymentApprovalRequestScopeSealReviewItems), '그룹 6');
    assert.ok(Array.isArray(v.deploymentExecutionRequestScopeSealReviewItems), '그룹 7');
    assert.ok(Array.isArray(v.operatingTransitionRequestScopeSealReviewItems), '그룹 8');
    assert.ok(Array.isArray(v.infrastructureRequestBoundarySealReviewItems), '그룹 9');
    assert.ok(Array.isArray(v.domainDnsHttpsRequestBoundarySealReviewItems), '그룹 10');
    assert.ok(Array.isArray(v.operatingDbRequestBoundarySealReviewItems), '그룹 11');
    assert.ok(Array.isArray(v.runtimeWorkerQueueAdapterRequestBoundarySealReviewItems), '그룹 12');
    assert.ok(Array.isArray(v.apiSecretRawResponseRequestBoundarySealReviewItems), '그룹 13');
    assert.ok(Array.isArray(v.uiActionPostSubmitRequestBoundarySealReviewItems), '그룹 14');
  });

  it('6. recommendedSealReviewDecision 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(
      v.recommendedSealReviewDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_ONLY'
    );
  });

  it('7. recommendedNextStep 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(
      v.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION'
    );
  });

  it('8. recommendedApprovalMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('9. recommendedExecutionMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('10. recommendedDeploymentMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_SEAL_REVIEW_ONLY');
  });

  it('11. recommendedSafetyMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('12. 실제 승인 요청 생성/제출 여부가 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.actualApprovalRequestCreated, false);
    assert.strictEqual(v.actualApprovalRequestReviewedAsSubmission, false);
    assert.strictEqual(v.actualApprovalRequestSubmitted, false);
    assert.strictEqual(v.actualFinalApprovalGrant, false);
    assert.strictEqual(v.actualFinalApprovalSubmission, false);
  });

  it('13. Seal Review가 실제 제출로 해석되지 않음', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.sealReviewNotInterpretedAsSubmission, true);
    assert.strictEqual(v.approvalRequestStillNotCreated, true);
    assert.strictEqual(v.approvalRequestSealReviewStillNotSubmitted, true);
  });

  it('14. 실제 배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그 모두 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
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

  it('15. 입력 ViewModel의 Task 371 결과를 변경하지 않음', () => {
    const input = createDummy371View();
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(input);
    assert.strictEqual(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus, originalStatus);
  });

  it('16. 상태 매핑이 exhaustive - 4개 입력 상태 모두 처리됨', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
    ];
    const expected = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_NOT_STARTED',
    ];
    for (let i = 0; i < statuses.length; i++) {
      const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
        createDummy371View({
          operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus: statuses[i],
        })
      );
      assert.strictEqual(
        v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
        expected[i]
      );
    }
  });

  it('17. taskId가 372이고 read-only 플래그가 true', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView(
      createDummy371View()
    );
    assert.strictEqual(v.taskId, 372);
    assert.strictEqual(v.isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReview, true);
    assert.strictEqual(v.requiresSeparateTask373Approval, true);
  });
});
