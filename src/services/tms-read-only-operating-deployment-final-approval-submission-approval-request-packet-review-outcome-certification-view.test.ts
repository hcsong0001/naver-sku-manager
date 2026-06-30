import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-review-outcome-certification-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-packet-review-view.service';

function createDummy370ReviewView(
  overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView> = {}
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView {
  return {
    taskId: 370,
    taskName: 'Dummy 370',
    sourcePacketStatus: 'PACKET_READY',
    sourceRecommendedApprovalRequestPacketDecision: 'PACKET_ONLY',
    sourceRecommendedApprovalRequestPacketDecisionLabel: 'Packet Only Label',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_READY' as TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus,
    approvalRequestPacketReviewStarted: true,
    approvalRequestPacketReviewStillReadOnly: true,
    approvalRequestPacketReviewStillLocked: true,
    approvalRequestPacketReviewed: true,
    recommendedApprovalRequestPacketReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_ONLY',
    recommendedApprovalRequestPacketReviewDecisionLabel: 'Review Only Label',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC',
    recommendedDeploymentMode: 'DEP',
    recommendedSafetyMode: 'SAFE',
    reviewItems: [],
    approvalRequestPacketReviewReadinessItems: [],
    approvalRequestPacketReferenceReviewItems: [],
    finalReviewOutcomeCertificationReferenceReviewItems: [],
    finalApprovalSubmissionRequestScopeReviewItems: [],
    finalApprovalGrantRequestScopeReviewItems: [],
    deploymentApprovalRequestScopeReviewItems: [],
    deploymentExecutionRequestScopeReviewItems: [],
    operatingTransitionRequestScopeReviewItems: [],
    infrastructureRequestBoundaryReviewItems: [],
    domainDnsHttpsRequestBoundaryReviewItems: [],
    operatingDbRequestBoundaryReviewItems: [],
    runtimeWorkerQueueAdapterRequestBoundaryReviewItems: [],
    apiSecretRawResponseRequestBoundaryReviewItems: [],
    uiActionPostSubmitRequestBoundaryReviewItems: [],
    reviewSummaryCards: [],
    readyReviewItems: [],
    partialReadyReviewItems: [],
    blockedReviewItems: [],
    notStartedReviewItems: [],
    approvalRequestPacketReviewReadinessItemCount: 0,
    approvalRequestPacketReferenceReviewItemCount: 0,
    finalReviewOutcomeCertificationReferenceReviewItemCount: 0,
    finalApprovalSubmissionRequestScopeReviewItemCount: 0,
    finalApprovalGrantRequestScopeReviewItemCount: 0,
    deploymentApprovalRequestScopeReviewItemCount: 0,
    deploymentExecutionRequestScopeReviewItemCount: 0,
    operatingTransitionRequestScopeReviewItemCount: 0,
    infrastructureRequestBoundaryReviewItemCount: 0,
    domainDnsHttpsRequestBoundaryReviewItemCount: 0,
    operatingDbRequestBoundaryReviewItemCount: 0,
    runtimeWorkerQueueAdapterRequestBoundaryReviewItemCount: 0,
    apiSecretRawResponseRequestBoundaryReviewItemCount: 0,
    uiActionPostSubmitRequestBoundaryReviewItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestPacketReviewItemCount: 0,
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
    finalApprovalSubmissionPacketStillNotSubmitted: true,
    approvalRequestStillNotCreated: true,
    approvalRequestReviewStillNotSubmitted: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReview: true,
    requiresSeparateTask371Approval: true,
    nextTaskApprovalPhrase: '',
    ...overrides,
  };
}

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView', () => {
  it('1. Task 370 REVIEW_READY → Task 371 OUTCOME_CERTIFIED_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_READY',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY'
    );
  });

  it('2. Task 370 REVIEW_PARTIAL_READY → Task 371 OUTCOME_CERTIFIED_PARTIAL_READY', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
    );
  });

  it('3. Task 370 REVIEW_BLOCKED → Task 371 OUTCOME_BLOCKED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED'
    );
  });

  it('4. Task 370 REVIEW_NOT_STARTED → Task 371 OUTCOME_NOT_STARTED', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView({
        operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
      })
    );
    assert.strictEqual(
      v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED'
    );
  });

  it('5. 14개 Outcome Certification 그룹이 모두 생성된다', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.ok(Array.isArray(v.approvalRequestPacketReviewOutcomeCertificationReadinessItems), '그룹 1');
    assert.ok(Array.isArray(v.approvalRequestPacketReferenceReviewOutcomeCertificationItems), '그룹 2');
    assert.ok(Array.isArray(v.finalReviewOutcomeCertificationReferenceReviewOutcomeCertificationItems), '그룹 3');
    assert.ok(Array.isArray(v.finalApprovalSubmissionRequestScopeReviewOutcomeCertificationItems), '그룹 4');
    assert.ok(Array.isArray(v.finalApprovalGrantRequestScopeReviewOutcomeCertificationItems), '그룹 5');
    assert.ok(Array.isArray(v.deploymentApprovalRequestScopeReviewOutcomeCertificationItems), '그룹 6');
    assert.ok(Array.isArray(v.deploymentExecutionRequestScopeReviewOutcomeCertificationItems), '그룹 7');
    assert.ok(Array.isArray(v.operatingTransitionRequestScopeReviewOutcomeCertificationItems), '그룹 8');
    assert.ok(Array.isArray(v.infrastructureRequestBoundaryReviewOutcomeCertificationItems), '그룹 9');
    assert.ok(Array.isArray(v.domainDnsHttpsRequestBoundaryReviewOutcomeCertificationItems), '그룹 10');
    assert.ok(Array.isArray(v.operatingDbRequestBoundaryReviewOutcomeCertificationItems), '그룹 11');
    assert.ok(Array.isArray(v.runtimeWorkerQueueAdapterRequestBoundaryReviewOutcomeCertificationItems), '그룹 12');
    assert.ok(Array.isArray(v.apiSecretRawResponseRequestBoundaryReviewOutcomeCertificationItems), '그룹 13');
    assert.ok(Array.isArray(v.uiActionPostSubmitRequestBoundaryReviewOutcomeCertificationItems), '그룹 14');
  });

  it('6. recommendedOutcomeCertificationDecision 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(
      v.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY'
    );
  });

  it('7. recommendedNextStep 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(
      v.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_SEAL_REVIEW'
    );
  });

  it('8. recommendedApprovalMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('9. recommendedExecutionMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('10. recommendedDeploymentMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.recommendedDeploymentMode, 'APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY');
  });

  it('11. recommendedSafetyMode 값 검증', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('12. 실제 승인 요청 생성/제출 여부가 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.actualApprovalRequestCreated, false);
    assert.strictEqual(v.actualApprovalRequestReviewedAsSubmission, false);
    assert.strictEqual(v.actualApprovalRequestSubmitted, false);
    assert.strictEqual(v.actualFinalApprovalGrant, false);
    assert.strictEqual(v.actualFinalApprovalSubmission, false);
  });

  it('13. Review 결과 인증이 실제 제출로 해석되지 않음', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.reviewOutcomeCertificationNotInterpretedAsSubmission, true);
    assert.strictEqual(v.approvalRequestStillNotCreated, true);
    assert.strictEqual(v.approvalRequestReviewOutcomeCertificationStillNotSubmitted, true);
  });

  it('14. 실제 배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그 모두 false', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
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

  it('15. 입력 ViewModel의 Task 370 결과를 변경하지 않음', () => {
    const input = createDummy370ReviewView();
    const originalStatus = input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(input);
    assert.strictEqual(input.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus, originalStatus);
  });

  it('16. 상태 매핑이 exhaustive - 4개 입력 상태 모두 처리됨', () => {
    const statuses: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus[] = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
    ];
    const expected = [
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
    ];
    for (let i = 0; i < statuses.length; i++) {
      const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
        createDummy370ReviewView({ operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewStatus: statuses[i] })
      );
      assert.strictEqual(
        v.operatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationStatus,
        expected[i]
      );
    }
  });

  it('17. taskId가 371이고 read-only 플래그가 true', () => {
    const v = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertificationView(
      createDummy370ReviewView()
    );
    assert.strictEqual(v.taskId, 371);
    assert.strictEqual(v.isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewOutcomeCertification, true);
    assert.strictEqual(v.requiresSeparateTask372Approval, true);
  });
});
