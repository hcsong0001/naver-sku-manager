import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView } from './tms-read-only-operating-deployment-final-approval-submission-seal-outcome-certification-view.service';
import { TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView } from './tms-read-only-operating-deployment-final-approval-submission-seal-review-view.service';

function createDummySealReviewView(overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView> = {}): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView {
  return {
    taskId: 365,
    taskName: 'Dummy 365 Task',
    sourceFinalApprovalSubmissionPacketOutcomeCertificationStatus: 'READY',
    sourceOutcomeCertifiedGoNoGoDecision: 'GO',
    sourceOutcomeCertifiedGoNoGoDecisionLabel: 'GO Label',
    sourceOutcomeCertifiedFinalApprovalCandidateDecision: 'CANDIDATE',
    sourceOutcomeCertifiedFinalApprovalCandidateDecisionLabel: 'Candidate Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecision: 'SUBMISSION',
    sourceOutcomeCertifiedFinalApprovalSubmissionDecisionLabel: 'Submission Label',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision: 'PACKET',
    sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: 'Packet Label',
    operatingDeploymentFinalApprovalSubmissionSealReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_READY',
    finalApprovalSubmissionSealReviewStarted: true,
    finalApprovalSubmissionSealStillReadOnly: true,
    finalApprovalSubmissionSealStillLocked: true,
    recommendedFinalApprovalSubmissionSealDecision: 'SEAL_REVIEW_ONLY',
    recommendedFinalApprovalSubmissionSealDecisionLabel: 'Seal Review Label',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC_MODE',
    recommendedDeploymentMode: 'DEP_MODE',
    recommendedSafetyMode: 'SAFE_MODE',
    sealReviewItems: [],
    submissionSealReadinessReviewItems: [],
    submissionPacketCertificationSealReviewItems: [],
    finalApprovalSubmissionSealLockReviewItems: [],
    finalApprovalGrantSealReviewItems: [],
    approvalPacketSubmissionSealReviewItems: [],
    deploymentApprovalSealReviewItems: [],
    deploymentExecutionSealReviewItems: [],
    infrastructureSubmissionSealReviewItems: [],
    domainDnsHttpsSubmissionSealReviewItems: [],
    operatingDbSubmissionSealReviewItems: [],
    runtimeWorkerQueueAdapterSubmissionSealReviewItems: [],
    apiAndSecretSubmissionSealReviewItems: [],
    uiActionSubmissionSealReviewItems: [],
    finalSubmissionSealRequirementReviewItems: [],
    sealReviewSummaryCards: [],
    readySealReviewItems: [],
    partialReadySealReviewItems: [],
    blockedSealReviewItems: [],
    notStartedSealReviewItems: [],
    submissionSealReadinessReviewItemCount: 0,
    submissionPacketCertificationSealReviewItemCount: 0,
    finalApprovalSubmissionSealLockReviewItemCount: 0,
    finalApprovalGrantSealReviewItemCount: 0,
    approvalPacketSubmissionSealReviewItemCount: 0,
    deploymentApprovalSealReviewItemCount: 0,
    deploymentExecutionSealReviewItemCount: 0,
    infrastructureSubmissionSealReviewItemCount: 0,
    domainDnsHttpsSubmissionSealReviewItemCount: 0,
    operatingDbSubmissionSealReviewItemCount: 0,
    runtimeWorkerQueueAdapterSubmissionSealReviewItemCount: 0,
    apiAndSecretSubmissionSealReviewItemCount: 0,
    uiActionSubmissionSealReviewItemCount: 0,
    finalSubmissionSealRequirementReviewItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalFinalApprovalSubmissionSealReviewItemCount: 0,
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
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReview: true,
    requiresSeparateTask366Approval: true,
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

describe('TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView Service', () => {
  it('maps 4 task 365 statuses to task 366 statuses', () => {
    const ready = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView({ operatingDeploymentFinalApprovalSubmissionSealReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_READY' })
    );
    assert.strictEqual(ready.operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_CERTIFIED_READY');

    const partial = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView({ operatingDeploymentFinalApprovalSubmissionSealReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_PARTIAL_READY' })
    );
    assert.strictEqual(partial.operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY');

    const blocked = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView({ operatingDeploymentFinalApprovalSubmissionSealReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_BLOCKED' })
    );
    assert.strictEqual(blocked.operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_BLOCKED');

    const notStarted = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView({ operatingDeploymentFinalApprovalSubmissionSealReviewStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_NOT_STARTED' })
    );
    assert.strictEqual(notStarted.operatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_NOT_STARTED');
  });

  it('passes down certified decisions and boundary decisions', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView()
    );
    assert.strictEqual(view.sourceOutcomeCertifiedGoNoGoDecision, 'GO');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalCandidateDecision, 'CANDIDATE');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionDecision, 'SUBMISSION');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision, 'PACKET');
    assert.strictEqual(view.sourceRecommendedFinalApprovalSubmissionSealDecision, 'SEAL_REVIEW_ONLY');
  });

  it('validates recommended decision, next step and modes', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView()
    );
    assert.strictEqual(view.outcomeCertifiedFinalApprovalSubmissionSealDecision, 'FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_ONLY');
    assert.strictEqual(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_FINAL_REVIEW');
    assert.strictEqual(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.strictEqual(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.strictEqual(view.recommendedDeploymentMode, 'FINAL_APPROVAL_SUBMISSION_SEAL_CERTIFICATION_ONLY');
    assert.strictEqual(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('validates 14 seal outcome certification groups generation', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView()
    );
    assert.ok(view.submissionSealReadinessOutcomeCertificationItems !== undefined);
    assert.ok(view.submissionPacketCertificationSealOutcomeCertificationItems !== undefined);
    assert.ok(view.finalApprovalSubmissionSealLockOutcomeCertificationItems !== undefined);
    assert.ok(view.finalApprovalGrantSealOutcomeCertificationItems !== undefined);
    assert.ok(view.approvalPacketSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.deploymentApprovalSealOutcomeCertificationItems !== undefined);
    assert.ok(view.deploymentExecutionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.infrastructureSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.domainDnsHttpsSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.operatingDbSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.runtimeWorkerQueueAdapterSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.apiAndSecretSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.uiActionSubmissionSealOutcomeCertificationItems !== undefined);
    assert.ok(view.finalSubmissionSealRequirementOutcomeCertificationItems !== undefined);
  });

  it('validates read-only and true flags', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView()
    );
    assert.strictEqual(view.isReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertification, true);
    assert.strictEqual(view.requiresSeparateTask367Approval, true);
    assert.strictEqual(view.finalApprovalSubmissionSealOutcomeCertified, true);
    assert.strictEqual(view.finalApprovalSubmissionSealItemsCertified, true);
    assert.strictEqual(view.finalApprovalSubmissionSealOutcomeCertificationStarted, true);
    assert.strictEqual(view.finalApprovalSubmissionSealOutcomeCertificationStillReadOnly, true);
    assert.strictEqual(view.finalApprovalSubmissionSealOutcomeStillReadOnly, true);
    assert.strictEqual(view.finalApprovalSubmissionSealStillLocked, true);
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
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView()
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
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealOutcomeCertificationView(
      createDummySealReviewView()
    );
    assert.ok(view.nextTaskApprovalPhrase.includes('Task 367에서 TMS read-only 운영 배포 최종 승인 제출 Final Review 화면 구현을 승인합니다.'));
    assert.ok(view.nextTaskApprovalPhrase.includes('실제 최종 승인이나 실제 배포 실행이 아니라'));
    assert.ok(view.nextTaskApprovalPhrase.includes('Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.'));
  });
});
