import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView } from './tms-read-only-operating-deployment-final-approval-submission-final-review-view.service';
import { TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView } from './tms-read-only-operating-deployment-final-approval-submission-seal-outcome-certification-view.service';

function createDummyOutcomeCertificationView(overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView> = {}): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView {
  return {
    taskId: 366,
    taskName: 'Dummy 366 Task',
    sourceFinalApprovalSubmissionSealReviewStatus: 'READY',
    sourceOutcomeCertifiedGoNoGoDecision: 'GO',
    sourceOutcomeCertifiedGoNoGoDecisionLabel: 'GO Label',
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: 'CANDIDATE',
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: 'Candidate Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: 'SUBMISSION',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: 'Submission Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: 'PACKET',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: 'Packet Label',
    sourceRecommendedFinalApprovalSubmissionSealDecision: 'SEAL_REC',
    sourceRecommendedFinalApprovalSubmissionSealDecisionLabel: 'Seal Rec Label',
    operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_CERTIFIED_READY',
    finalApprovalSubmissionSealOutcomeCertified: true,
    finalApprovalSubmissionSealItemsCertified: true,
    finalApprovalSubmissionSealOutcomeCertificationStarted: true,
    finalApprovalSubmissionSealOutcomeCertificationStillReadOnly: true,
    finalApprovalSubmissionSealOutcomeStillReadOnly: true,
    finalApprovalSubmissionSealStillLocked: true,
    outcomeCertifiedFinalApprovalSubmissionSealDecision: 'FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_ONLY',
    outcomeCertifiedFinalApprovalSubmissionSealDecisionLabel: '최종 승인 제출 Seal - read-only 검토 전용',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC_MODE',
    recommendedDeploymentMode: 'DEP_MODE',
    recommendedSafetyMode: 'SAFE_MODE',
    outcomeCertificationItems: [],
    submissionSealReadinessOutcomeCertificationItems: [],
    submissionPacketCertificationSealOutcomeCertificationItems: [],
    finalApprovalSubmissionSealLockOutcomeCertificationItems: [],
    finalApprovalGrantSealOutcomeCertificationItems: [],
    approvalPacketSubmissionSealOutcomeCertificationItems: [],
    deploymentApprovalSealOutcomeCertificationItems: [],
    deploymentExecutionSealOutcomeCertificationItems: [],
    infrastructureSubmissionSealOutcomeCertificationItems: [],
    domainDnsHttpsSubmissionSealOutcomeCertificationItems: [],
    operatingDbSubmissionSealOutcomeCertificationItems: [],
    runtimeWorkerQueueAdapterSubmissionSealOutcomeCertificationItems: [],
    apiAndSecretSubmissionSealOutcomeCertificationItems: [],
    uiActionSubmissionSealOutcomeCertificationItems: [],
    finalSubmissionSealRequirementOutcomeCertificationItems: [],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [],
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    submissionSealReadinessOutcomeCertificationItemCount: 0,
    submissionPacketCertificationSealOutcomeCertificationItemCount: 0,
    finalApprovalSubmissionSealLockOutcomeCertificationItemCount: 0,
    finalApprovalGrantSealOutcomeCertificationItemCount: 0,
    approvalPacketSubmissionSealOutcomeCertificationItemCount: 0,
    deploymentApprovalSealOutcomeCertificationItemCount: 0,
    deploymentExecutionSealOutcomeCertificationItemCount: 0,
    infrastructureSubmissionSealOutcomeCertificationItemCount: 0,
    domainDnsHttpsSubmissionSealOutcomeCertificationItemCount: 0,
    operatingDbSubmissionSealOutcomeCertificationItemCount: 0,
    runtimeWorkerQueueAdapterSubmissionSealOutcomeCertificationItemCount: 0,
    apiAndSecretSubmissionSealOutcomeCertificationItemCount: 0,
    uiActionSubmissionSealOutcomeCertificationItemCount: 0,
    finalSubmissionSealRequirementOutcomeCertificationItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalFinalApprovalSubmissionSealOutcomeCertificationItemCount: 0,
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
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertification: true,
    requiresSeparateTask367Approval: true,
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

describe('TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView Service', () => {
  it('maps 4 task 366 statuses to task 367 statuses', () => {
    const ready = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView({ operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_CERTIFIED_READY' })
    );
    assert.strictEqual(ready.operatingDeploymentFinalApprovalSubmissionFinalReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_READY');

    const partial = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView({ operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY' })
    );
    assert.strictEqual(partial.operatingDeploymentFinalApprovalSubmissionFinalReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_PARTIAL_READY');

    const blocked = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView({ operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_BLOCKED' })
    );
    assert.strictEqual(blocked.operatingDeploymentFinalApprovalSubmissionFinalReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_BLOCKED');

    const notStarted = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView({ operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_NOT_STARTED' })
    );
    assert.strictEqual(notStarted.operatingDeploymentFinalApprovalSubmissionFinalReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_NOT_STARTED');
  });

  it('passes down certified decisions', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView()
    );
    assert.strictEqual(view.sourceOutcomeCertifiedGoNoGoDecision, 'GO');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalCandidateDecision, 'CANDIDATE');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionDecision, 'SUBMISSION');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision, 'PACKET');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionSealDecision, 'FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_ONLY');
  });

  it('validates recommended decision, next step and modes', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView()
    );
    assert.strictEqual(view.recommendedFinalReviewDecision, 'FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_ONLY');
    assert.strictEqual(view.recommendedFinalReviewDecisionLabel, '최종 승인 제출 Final Review - read-only 검토 전용');
    assert.strictEqual(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_OUTCOME_CERTIFICATION');
    assert.strictEqual(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.strictEqual(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.strictEqual(view.recommendedDeploymentMode, 'FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW_ONLY');
    assert.strictEqual(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('validates 12 final review groups generation', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView()
    );
    assert.ok(view.finalReviewReadinessItems !== undefined);
    assert.ok(view.sealOutcomeCertificationReviewItems !== undefined);
    assert.ok(view.finalApprovalSubmissionReviewItems !== undefined);
    assert.ok(view.finalApprovalGrantReviewItems !== undefined);
    assert.ok(view.deploymentApprovalReviewItems !== undefined);
    assert.ok(view.deploymentExecutionReviewItems !== undefined);
    assert.ok(view.infrastructureReviewItems !== undefined);
    assert.ok(view.domainDnsHttpsReviewItems !== undefined);
    assert.ok(view.operatingDbReviewItems !== undefined);
    assert.ok(view.runtimeWorkerQueueAdapterReviewItems !== undefined);
    assert.ok(view.apiSecretUiActionReviewItems !== undefined);
    assert.ok(view.finalReviewRequirementItems !== undefined);
  });

  it('validates read-only and true flags', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView()
    );
    assert.strictEqual(view.isReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReview, true);
    assert.strictEqual(view.requiresSeparateTask368Approval, true);
    assert.strictEqual(view.finalApprovalSubmissionFinalReviewStarted, true);
    assert.strictEqual(view.finalApprovalSubmissionFinalReviewStillReadOnly, true);
    assert.strictEqual(view.finalApprovalSubmissionFinalReviewStillLocked, true);
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

  it('validates actual execution and false flags', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView()
    );
    assert.strictEqual(view.actualFinalApprovalGranted, false);
    assert.strictEqual(view.actualFinalApprovalCandidateSaved, false);
    assert.strictEqual(view.actualFinalApprovalSubmissionPerformed, false);
    assert.strictEqual(view.actualFinalApprovalPacketSubmitted, false);
    assert.strictEqual(view.actualDeploymentApprovalGranted, false);
    assert.strictEqual(view.actualDeploymentStarted, false);
    assert.strictEqual(view.actualProductionTransitionStarted, false);
    assert.strictEqual(view.actualGoDecisionGranted, false);
    assert.strictEqual(view.actualNoGoDecisionGranted, false);
    assert.strictEqual(view.actualGoNoGoDecisionSaved, false);
    assert.strictEqual(view.actualApprovalPacketSubmitted, false);
    assert.strictEqual(view.actualVpsServerCreated, false);
    assert.strictEqual(view.actualDomainConnected, false);
    assert.strictEqual(view.dnsChanged, false);
    assert.strictEqual(view.sslCertificateIssued, false);
    assert.strictEqual(view.runtimeConfigured, false);
    assert.strictEqual(view.workerStarted, false);
    assert.strictEqual(view.queueEnqueued, false);
    assert.strictEqual(view.adapterConnected, false);
    assert.strictEqual(view.operatingDbConnectionChanged, false);
    assert.strictEqual(view.databaseUrlChanged, false);
    assert.strictEqual(view.envFileReadOrModified, false);
    assert.strictEqual(view.dbWritePerformed, false);
    assert.strictEqual(view.naverApiCalled, false);
    assert.strictEqual(view.productLookupApiRecalled, false);
    assert.strictEqual(view.productUpdateApiCalled, false);
    assert.strictEqual(view.executionButtonAdded, false);
    assert.strictEqual(view.submitActionAdded, false);
    assert.strictEqual(view.postApiAdded, false);
    assert.strictEqual(view.priceChanged, false);
    assert.strictEqual(view.stockChanged, false);
    assert.strictEqual(view.tokenOrAuthValueExposed, false);
    assert.strictEqual(view.rawApiResponseExposedOrStored, false);
  });

  it('validates nextTaskApprovalPhrase', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView(
      createDummyOutcomeCertificationView()
    );
    assert.ok(view.nextTaskApprovalPhrase.includes('Task 368에서 TMS read-only 운영 배포 최종 승인 제출 Final Review 결과 인증 화면 구현을 승인합니다.'));
    assert.ok(view.nextTaskApprovalPhrase.includes('실제 최종 승인이나 실제 배포 실행이 아니라'));
    assert.ok(view.nextTaskApprovalPhrase.includes('Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.'));
  });
});
