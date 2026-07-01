import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-seal-outcome-certification-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-seal-review-view.service';

function createDummy372View(
  overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView> = {}
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewView {
  return {
    taskId: 372,
    taskName: 'Dummy 372',
    sourceOutcomeCertificationStatus: 'OUTCOME_CERTIFIED_READY',
    sourceRecommendedOutcomeCertificationDecision: 'OUTCOME_CERTIFICATION_ONLY',
    sourceRecommendedOutcomeCertificationDecisionLabel: 'Outcome Certification Only Label',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY' as TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus,
    approvalRequestPacketSealReviewStarted: true,
    approvalRequestPacketSealReviewStillReadOnly: true,
    approvalRequestPacketSealReviewStillLocked: true,
    approvalRequestPacketSealReviewed: true,
    recommendedSealReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_ONLY',
    recommendedSealReviewDecisionLabel: 'Seal Review Only Label',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC',
    recommendedDeploymentMode: 'DEP',
    recommendedSafetyMode: 'SAFE',
    sealReviewItems: [],
    approvalRequestPacketSealReviewReadinessItems: [],
    approvalRequestPacketReviewOutcomeCertificationSealReviewItems: [],
    finalReviewOutcomeCertificationReferenceSealReviewItems: [],
    finalApprovalSubmissionRequestScopeSealReviewItems: [],
    finalApprovalGrantRequestScopeSealReviewItems: [],
    deploymentApprovalRequestScopeSealReviewItems: [],
    deploymentExecutionRequestScopeSealReviewItems: [],
    operatingTransitionRequestScopeSealReviewItems: [],
    infrastructureRequestBoundarySealReviewItems: [],
    domainDnsHttpsRequestBoundarySealReviewItems: [],
    operatingDbRequestBoundarySealReviewItems: [],
    runtimeWorkerQueueAdapterRequestBoundarySealReviewItems: [],
    apiSecretRawResponseRequestBoundarySealReviewItems: [],
    uiActionPostSubmitRequestBoundarySealReviewItems: [],
    sealReviewSummaryCards: [],
    readySealReviewItems: [],
    partialReadySealReviewItems: [],
    blockedSealReviewItems: [],
    notStartedSealReviewItems: [],
    approvalRequestPacketSealReviewReadinessItemCount: 0,
    approvalRequestPacketReviewOutcomeCertificationSealReviewItemCount: 0,
    finalReviewOutcomeCertificationReferenceSealReviewItemCount: 0,
    finalApprovalSubmissionRequestScopeSealReviewItemCount: 0,
    finalApprovalGrantRequestScopeSealReviewItemCount: 0,
    deploymentApprovalRequestScopeSealReviewItemCount: 0,
    deploymentExecutionRequestScopeSealReviewItemCount: 0,
    operatingTransitionRequestScopeSealReviewItemCount: 0,
    infrastructureRequestBoundarySealReviewItemCount: 0,
    domainDnsHttpsRequestBoundarySealReviewItemCount: 0,
    operatingDbRequestBoundarySealReviewItemCount: 0,
    runtimeWorkerQueueAdapterRequestBoundarySealReviewItemCount: 0,
    apiSecretRawResponseRequestBoundarySealReviewItemCount: 0,
    uiActionPostSubmitRequestBoundarySealReviewItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketSealReviewItemCount: 0,
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
    approvalRequestSealReviewStillNotSubmitted: true,
    sealReviewNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReview: true,
    requiresSeparateTask373Approval: true,
    nextTaskApprovalPhrase: '',
    ...overrides,
  };
}

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView', () => {
  it('1. Task 372 SEAL_REVIEW_READY → Task 373 SEAL_OUTCOME_CERTIFIED_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY'
    );
  });

  it('2. Task 372 SEAL_REVIEW_PARTIAL_READY → Task 373 SEAL_OUTCOME_CERTIFIED_PARTIAL_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_PARTIAL_READY',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY'
    );
  });

  it('3. Task 372 SEAL_REVIEW_BLOCKED → Task 373 SEAL_OUTCOME_BLOCKED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_BLOCKED',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED'
    );
  });

  it('4. Task 372 SEAL_REVIEW_NOT_STARTED → Task 373 SEAL_OUTCOME_NOT_STARTED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_NOT_STARTED',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED'
    );
  });

  it('5. 14개 Seal Outcome Certification 그룹이 모두 생성된다', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.ok(Array.isArray(v.approvalRequestPacketSealOutcomeCertificationReadinessItems), '그룹 1');
    assert.ok(Array.isArray(v.approvalRequestPacketSealReviewOutcomeCertificationItems), '그룹 2');
    assert.ok(Array.isArray(v.approvalRequestPacketReviewOutcomeCertificationReferenceSealOutcomeCertificationItems), '그룹 3');
    assert.ok(Array.isArray(v.finalApprovalSubmissionRequestScopeSealOutcomeCertificationItems), '그룹 4');
    assert.ok(Array.isArray(v.finalApprovalGrantRequestScopeSealOutcomeCertificationItems), '그룹 5');
    assert.ok(Array.isArray(v.deploymentApprovalRequestScopeSealOutcomeCertificationItems), '그룹 6');
    assert.ok(Array.isArray(v.deploymentExecutionRequestScopeSealOutcomeCertificationItems), '그룹 7');
    assert.ok(Array.isArray(v.operatingTransitionRequestScopeSealOutcomeCertificationItems), '그룹 8');
    assert.ok(Array.isArray(v.infrastructureRequestBoundarySealOutcomeCertificationItems), '그룹 9');
    assert.ok(Array.isArray(v.domainDnsHttpsRequestBoundarySealOutcomeCertificationItems), '그룹 10');
    assert.ok(Array.isArray(v.operatingDbRequestBoundarySealOutcomeCertificationItems), '그룹 11');
    assert.ok(Array.isArray(v.runtimeWorkerQueueAdapterRequestBoundarySealOutcomeCertificationItems), '그룹 12');
    assert.ok(Array.isArray(v.apiSecretRawResponseRequestBoundarySealOutcomeCertificationItems), '그룹 13');
    assert.ok(Array.isArray(v.uiActionPostSubmitRequestBoundarySealOutcomeCertificationItems), '그룹 14');
  });

  it('6. recommendedOutcomeCertificationDecision 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(
      v.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY'
    );
  });

  it('7. recommendedNextStep 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(
      v.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_FINAL_REVIEW'
    );
  });

  it('8. recommendedApprovalMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('9. recommendedExecutionMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('10. recommendedDeploymentMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFICATION_ONLY');
  });

  it('11. recommendedSafetyMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('12. 실제 승인 요청 생성/제출 여부가 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.actualApprovalRequestCreated, false);
    assert.strictEqual(v.actualApprovalRequestReviewedAsSubmission, false);
    assert.strictEqual(v.actualApprovalRequestSubmitted, false);
    assert.strictEqual(v.actualFinalApprovalGrant, false);
    assert.strictEqual(v.actualFinalApprovalSubmission, false);
  });

  it('13. Seal 결과 인증이 실제 제출로 해석되지 않음', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.sealOutcomeCertificationNotInterpretedAsSubmission, true);
    assert.strictEqual(v.approvalRequestStillNotCreated, true);
    assert.strictEqual(v.sealOutcomeCertificationStillNotSubmitted, true);
  });

  it('14. 실제 배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그 모두 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
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

  it('15. 입력 ViewModel의 Task 372 결과를 변경하지 않음', () => {
    const input = createDummy372View();
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(input);
    assert.strictEqual(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus, originalStatus);
  });

  it('16. 상태 매핑이 exhaustive - 4개 입력 상태 모두 처리됨', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW_NOT_STARTED',
    ];
    const expected = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_OUTCOME_NOT_STARTED',
    ];
    for (let i = 0; i < statuses.length; i++) {
      const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
        createDummy372View({
          operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealReviewStatus: statuses[i],
        })
      );
      assert.strictEqual(
        v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationStatus,
        expected[i]
      );
    }
  });

  it('17. taskId가 373이고 read-only 플래그가 true', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertificationView(
      createDummy372View()
    );
    assert.strictEqual(v.taskId, 373);
    assert.strictEqual(v.isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketSealOutcomeCertification, true);
    assert.strictEqual(v.requiresSeparateTask374Approval, true);
  });
});
