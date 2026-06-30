import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-final-review-outcome-certification-view.service';
import {
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-final-review-view.service';

function createDummyFinalReviewView(
  overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView> = {}
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView {
  return {
    taskId: 367,
    taskName: 'Dummy 367 Task',
    sourceFinalApprovalSubmissionSealOutcomeCertificationStatus: 'CERTIFIED_READY',
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
    operatingDeploymentFinalApprovalSubmissionFinalReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_READY' as TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewStatus,
    finalApprovalSubmissionFinalReviewStarted: true,
    finalApprovalSubmissionFinalReviewStillReadOnly: true,
    finalApprovalSubmissionFinalReviewStillLocked: true,
    recommendedFinalReviewDecision: 'FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_ONLY',
    recommendedFinalReviewDecisionLabel: '최종 승인 제출 Final Review - read-only 검토 전용',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC',
    recommendedDeploymentMode: 'DEP',
    recommendedSafetyMode: 'SAFE',
    finalReviewItems: [],
    finalReviewReadinessItems: [],
    sealOutcomeCertificationReviewItems: [],
    finalApprovalSubmissionReviewItems: [],
    finalApprovalGrantReviewItems: [],
    deploymentApprovalReviewItems: [],
    deploymentExecutionReviewItems: [],
    infrastructureReviewItems: [],
    domainDnsHttpsReviewItems: [],
    operatingDbReviewItems: [],
    runtimeWorkerQueueAdapterReviewItems: [],
    apiSecretUiActionReviewItems: [],
    finalReviewRequirementItems: [],
    finalReviewSummaryCards: [],
    readyFinalReviewItems: [],
    partialReadyFinalReviewItems: [],
    blockedFinalReviewItems: [],
    notStartedFinalReviewItems: [],
    finalReviewReadinessItemCount: 0,
    sealOutcomeCertificationReviewItemCount: 0,
    finalApprovalSubmissionReviewItemCount: 0,
    finalApprovalGrantReviewItemCount: 0,
    deploymentApprovalReviewItemCount: 0,
    deploymentExecutionReviewItemCount: 0,
    infrastructureReviewItemCount: 0,
    domainDnsHttpsReviewItemCount: 0,
    operatingDbReviewItemCount: 0,
    runtimeWorkerQueueAdapterReviewItemCount: 0,
    apiSecretUiActionReviewItemCount: 0,
    finalReviewRequirementItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalFinalApprovalSubmissionFinalReviewItemCount: 0,
    actualFinalApprovalGranted: false,
    actualFinalApprovalCandidateSaved: false,
    actualFinalApprovalSubmissionPerformed: false,
    actualFinalApprovalPacketSubmitted: false,
    actualDeploymentApprovalGranted: false,
    actualDeploymentStarted: false,
    actualProductionTransitionStarted: false,
    actualGoDecisionGranted: false,
    actualNoGoDecisionGranted: false,
    actualGoNoGoDecisionSaved: false,
    actualApprovalPacketSubmitted: false,
    actualVpsServerCreated: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
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
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReview: true,
    requiresSeparateTask368Approval: true,
    nextTaskApprovalPhrase: '',
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    priceChanged: false,
    stockChanged: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    ...overrides,
  };
}

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView', () => {
  it('1. Task 367 READY → Task 368 CERTIFIED_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView({
        operatingDeploymentFinalApprovalSubmissionFinalReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_READY',
      })
    );
    assert.strictEqual(
      view.operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFIED_READY'
    );
  });

  it('2. Task 367 PARTIAL_READY → Task 368 CERTIFIED_PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView({
        operatingDeploymentFinalApprovalSubmissionFinalReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_PARTIAL_READY',
      })
    );
    assert.strictEqual(
      view.operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
    );
  });

  it('3. Task 367 BLOCKED → Task 368 OUTCOME_BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView({
        operatingDeploymentFinalApprovalSubmissionFinalReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_BLOCKED',
      })
    );
    assert.strictEqual(
      view.operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_BLOCKED'
    );
  });

  it('4. Task 367 NOT_STARTED → Task 368 OUTCOME_NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView({
        operatingDeploymentFinalApprovalSubmissionFinalReviewStatus:
          'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_NOT_STARTED',
      })
    );
    assert.strictEqual(
      view.operatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_NOT_STARTED'
    );
  });

  it('5. Go/No-Go 후보 값 전파', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.sourceOutcomeCertifiedGoNoGoDecision, 'GO');
    assert.strictEqual(view.sourceOutcomeCertifiedGoNoGoDecisionLabel, 'GO Label');
  });

  it('6. 최종 승인 후보 / 제출 경계 / 패킷 / Seal 결정 값 전파', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalCandidateDecision, 'CANDIDATE');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionDecision, 'SUBMISSION');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision, 'PACKET');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision, 'SEAL');
  });

  it('7. recommendedOutcomeCertificationDecision 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.recommendedOutcomeCertificationDecision, 'FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY');
    assert.strictEqual(view.recommendedOutcomeCertificationDecisionLabel, '최종 승인 제출 Final Review 결과 인증 - read-only 인증 전용');
  });

  it('8. recommendedNextStep 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_PACKET');
  });

  it('9. recommendedApprovalMode 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('10. recommendedExecutionMode 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('11. recommendedDeploymentMode 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.recommendedDeploymentMode, 'FINAL_REVIEW_OUTCOME_CERTIFICATION_ONLY');
  });

  it('12. recommendedSafetyMode 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('13. 12개 Outcome Certification 그룹 존재 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.ok(view.finalReviewOutcomeCertificationReadinessItems !== undefined);
    assert.ok(view.finalReviewReadinessOutcomeCertificationItems !== undefined);
    assert.ok(view.sealOutcomeCertificationReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.finalApprovalSubmissionReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.finalApprovalGrantReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.deploymentApprovalReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.deploymentExecutionReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.infrastructureReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.domainDnsHttpsReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.operatingDbReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.runtimeWorkerQueueAdapterReviewOutcomeCertificationItems !== undefined);
    assert.ok(view.apiSecretUiActionReviewOutcomeCertificationItems !== undefined);
  });

  it('14. read-only true 플래그 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.isReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertification, true);
    assert.strictEqual(view.requiresSeparateTask369Approval, true);
    assert.strictEqual(view.finalReviewOutcomeCertificationStarted, true);
    assert.strictEqual(view.finalReviewOutcomeCertificationStillReadOnly, true);
    assert.strictEqual(view.finalReviewOutcomeCertificationStillLocked, true);
    assert.strictEqual(view.finalReviewOutcomeCertified, true);
    assert.strictEqual(view.finalApprovalSubmissionStillNotPerformed, true);
    assert.strictEqual(view.finalApprovalSubmissionPacketStillNotSubmitted, true);
    assert.strictEqual(view.finalApprovalStillReadOnly, true);
    assert.strictEqual(view.finalApprovalStillBlocked, true);
    assert.strictEqual(view.deploymentApprovalStillBlocked, true);
    assert.strictEqual(view.deploymentExecutionStillBlocked, true);
    assert.strictEqual(view.apiCallStillBlocked, true);
    assert.strictEqual(view.dbWriteStillBlocked, true);
    assert.strictEqual(view.tokenOrAuthStillHidden, true);
    assert.strictEqual(view.rawApiResponseStillHidden, true);
  });

  it('15. actual* 안전 플래그 모두 false', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.actualNaverApiCall, false);
    assert.strictEqual(view.actualProductLookupApiCall, false);
    assert.strictEqual(view.actualProductUpdateApiCall, false);
    assert.strictEqual(view.actualTokenReissue, false);
    assert.strictEqual(view.actualPriceChange, false);
    assert.strictEqual(view.actualStockChange, false);
    assert.strictEqual(view.actualDbWrite, false);
    assert.strictEqual(view.actualOperatingDbConnectionChange, false);
    assert.strictEqual(view.actualEnvReadOrWrite, false);
    assert.strictEqual(view.actualSecretExposure, false);
    assert.strictEqual(view.actualRawApiResponseExposure, false);
    assert.strictEqual(view.actualWorkerRun, false);
    assert.strictEqual(view.actualQueueEnqueue, false);
    assert.strictEqual(view.actualAdapterConnection, false);
    assert.strictEqual(view.actualRuntimeConfiguration, false);
    assert.strictEqual(view.actualFinalApprovalGrant, false);
    assert.strictEqual(view.actualFinalApprovalSubmission, false);
    assert.strictEqual(view.actualDeploymentApproval, false);
    assert.strictEqual(view.actualDeploymentExecution, false);
    assert.strictEqual(view.actualOperatingTransition, false);
    assert.strictEqual(view.actualVpsCreation, false);
    assert.strictEqual(view.actualDomainConnection, false);
    assert.strictEqual(view.actualDnsChange, false);
    assert.strictEqual(view.actualSslCertificateIssue, false);
    assert.strictEqual(view.actualExecutionButtonAdded, false);
    assert.strictEqual(view.actualSubmitActionAdded, false);
    assert.strictEqual(view.actualPostApiAdded, false);
  });

  it('16. Task 369 승인 문구 포함', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.ok(view.nextTaskApprovalPhrase.includes('Task 369에서'));
    assert.ok(view.nextTaskApprovalPhrase.includes('Approval Request Packet'));
    assert.ok(view.nextTaskApprovalPhrase.includes('Token/Auth/Signature/Authorization'));
  });

  it('17. sourceRecommendedFinalReviewDecision 전파 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.sourceRecommendedFinalReviewDecision, 'FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_ONLY');
    assert.strictEqual(view.sourceRecommendedFinalReviewDecisionLabel, '최종 승인 제출 Final Review - read-only 검토 전용');
  });

  it('18. taskId 검증', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView(
      createDummyFinalReviewView()
    );
    assert.strictEqual(view.taskId, 368);
  });
});
