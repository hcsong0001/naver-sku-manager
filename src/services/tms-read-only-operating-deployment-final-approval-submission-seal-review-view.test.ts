import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView } from './tms-read-only-operating-deployment-final-approval-submission-seal-review-view.service';
import { TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationView } from './tms-read-only-operating-deployment-final-approval-submission-packet-outcome-certification-view.service';

function createDummyCertificationView(overrides: Partial<TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationView> = {}): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationView {
  return {
    taskId: 364,
    taskName: 'Dummy 364 Task',
    sourceFinalApprovalSubmissionPacketReviewStatus: 'READY',
    sourceSubmissionPacketCertifiedGoNoGoDecision: 'GO',
    sourceSubmissionPacketCertifiedGoNoGoDecisionLabel: 'GO Label',
    sourceSubmissionPacketCertifiedFinalApprovalCandidateDecision: 'CANDIDATE',
    sourceSubmissionPacketCertifiedFinalApprovalCandidateDecisionLabel: 'Candidate Label',
    sourceSubmissionPacketCertifiedFinalApprovalSubmissionDecision: 'SUBMISSION',
    sourceSubmissionPacketCertifiedFinalApprovalSubmissionDecisionLabel: 'Submission Label',
    sourceRecommendedFinalApprovalSubmissionPacketDecision: 'PACKET',
    sourceRecommendedFinalApprovalSubmissionPacketDecisionLabel: 'Packet Label',
    operatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_OUTCOME_CERTIFIED_READY',
    finalApprovalSubmissionPacketOutcomeCertified: true,
    finalApprovalSubmissionPacketItemsCertified: true,
    finalApprovalSubmissionPacketOutcomeCertificationStarted: true,
    finalApprovalSubmissionPacketOutcomeCertificationStillReadOnly: true,
    finalApprovalSubmissionPacketOutcomeStillReadOnly: true,
    outcomeCertifiedGoNoGoDecision: 'GO',
    outcomeCertifiedGoNoGoDecisionLabel: 'GO Label',
    outcomeCertifiedFinalApprovalCandidateDecision: 'CANDIDATE',
    outcomeCertifiedFinalApprovalCandidateDecisionLabel: 'Candidate Label',
    outcomeCertifiedFinalApprovalSubmissionDecision: 'SUBMISSION',
    outcomeCertifiedFinalApprovalSubmissionDecisionLabel: 'Submission Label',
    outcomeCertifiedFinalApprovalSubmissionPacketDecision: 'PACKET',
    outcomeCertifiedFinalApprovalSubmissionPacketDecisionLabel: 'Packet Label',
    recommendedNextStep: 'NEXT',
    recommendedApprovalMode: 'MODE',
    recommendedExecutionMode: 'EXEC_MODE',
    recommendedDeploymentMode: 'DEP_MODE',
    recommendedSafetyMode: 'SAFE_MODE',
    outcomeCertificationItems: [],
    submissionPacketReadinessOutcomeCertificationItems: [],
    submissionBoundaryCertificationPacketOutcomeCertificationItems: [],
    finalApprovalSubmissionPacketLockOutcomeCertificationItems: [],
    finalApprovalGrantPacketOutcomeCertificationItems: [],
    approvalPacketSubmissionPacketOutcomeCertificationItems: [],
    deploymentApprovalPacketOutcomeCertificationItems: [],
    deploymentExecutionPacketOutcomeCertificationItems: [],
    infrastructureSubmissionPacketOutcomeCertificationItems: [],
    domainDnsHttpsSubmissionPacketOutcomeCertificationItems: [],
    operatingDbSubmissionPacketOutcomeCertificationItems: [],
    runtimeWorkerQueueAdapterSubmissionPacketOutcomeCertificationItems: [],
    apiAndSecretSubmissionPacketOutcomeCertificationItems: [],
    uiActionSubmissionPacketOutcomeCertificationItems: [],
    finalSubmissionPacketRequirementOutcomeCertificationItems: [],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: [],
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    submissionPacketReadinessCertificationItemCount: 0,
    submissionBoundaryCertificationPacketCertificationItemCount: 0,
    finalApprovalSubmissionPacketLockCertificationItemCount: 0,
    finalApprovalGrantPacketCertificationItemCount: 0,
    approvalPacketSubmissionPacketCertificationItemCount: 0,
    deploymentApprovalPacketCertificationItemCount: 0,
    deploymentExecutionPacketCertificationItemCount: 0,
    infrastructureSubmissionPacketCertificationItemCount: 0,
    domainDnsHttpsSubmissionPacketCertificationItemCount: 0,
    operatingDbSubmissionPacketCertificationItemCount: 0,
    runtimeWorkerQueueAdapterSubmissionPacketCertificationItemCount: 0,
    apiAndSecretSubmissionPacketCertificationItemCount: 0,
    uiActionSubmissionPacketCertificationItemCount: 0,
    finalSubmissionPacketRequirementCertificationItemCount: 0,
    readyItemCount: 0,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalFinalApprovalSubmissionPacketOutcomeCertificationItemCount: 0,
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
    actualVpsConfigChanged: false,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    redisOperatingConnectionChanged: false,
    adapterConnected: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    dbBackupExecuted: false,
    dbRestoreExecuted: false,
    rollbackExecuted: false,
    migrationExecuted: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    finalApprovalSubmissionPacketStillDisplayOnly: true,
    finalApprovalSubmissionPacketOutcomeStillDisplayOnly: true,
    finalApprovalSubmissionPacketStillNotSubmitted: true,
    finalApprovalSubmissionStillNotPerformed: true,
    finalApprovalCandidateStillNotApproved: true,
    finalApprovalSubmissionStillBlocked: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    goNoGoDecisionStillReadOnly: true,
    goDecisionStillBlocked: true,
    noGoDecisionStillBlocked: true,
    approvalSubmissionStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
    vpsServerCreationStillBlocked: true,
    vpsConfigChangeStillBlocked: true,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    adapterConnectionStillBlocked: true,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    uiExecutionActionStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionPacketOutcomeCertification: true,
    requiresSeparateTask365Approval: true,
    nextTaskApprovalPhrase: '',
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
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

describe('TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView Service', () => {
  it('maps 4 task 364 statuses to task 365 statuses', () => {
    const ready = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView({ operatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_OUTCOME_CERTIFIED_READY' })
    );
    assert.strictEqual(ready.operatingDeploymentFinalApprovalSubmissionSealReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_READY');

    const partial = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView({ operatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY' })
    );
    assert.strictEqual(partial.operatingDeploymentFinalApprovalSubmissionSealReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_PARTIAL_READY');

    const blocked = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView({ operatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_OUTCOME_BLOCKED' })
    );
    assert.strictEqual(blocked.operatingDeploymentFinalApprovalSubmissionSealReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_BLOCKED');

    const notStarted = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView({ operatingDeploymentFinalApprovalSubmissionPacketOutcomeCertificationStatus: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_OUTCOME_NOT_STARTED' })
    );
    assert.strictEqual(notStarted.operatingDeploymentFinalApprovalSubmissionSealReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_NOT_STARTED');
  });

  it('passes down certified Go/NoGo, Candidate, Boundary, Packet decisions', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView()
    );
    assert.strictEqual(view.sourceOutcomeCertifiedGoNoGoDecision, 'GO');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalCandidateDecision, 'CANDIDATE');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionDecision, 'SUBMISSION');
    assert.strictEqual(view.sourceOutcomeCertifiedFinalApprovalSubmissionPacketDecision, 'PACKET');
  });

  it('validates recommended decision, next step and modes', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView()
    );
    assert.strictEqual(view.recommendedFinalApprovalSubmissionSealDecision, 'FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_ONLY');
    assert.strictEqual(view.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_SEAL_OUTCOME_CERTIFICATION');
    assert.strictEqual(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.strictEqual(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.strictEqual(view.recommendedDeploymentMode, 'FINAL_APPROVAL_SUBMISSION_SEAL_REVIEW_ONLY');
    assert.strictEqual(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('validates 14 seal groups generation', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView()
    );
    assert.ok(view.submissionSealReadinessReviewItems !== undefined);
    assert.ok(view.submissionPacketCertificationSealReviewItems !== undefined);
    assert.ok(view.finalApprovalSubmissionSealLockReviewItems !== undefined);
    assert.ok(view.finalApprovalGrantSealReviewItems !== undefined);
    assert.ok(view.approvalPacketSubmissionSealReviewItems !== undefined);
    assert.ok(view.deploymentApprovalSealReviewItems !== undefined);
    assert.ok(view.deploymentExecutionSealReviewItems !== undefined);
    assert.ok(view.infrastructureSubmissionSealReviewItems !== undefined);
    assert.ok(view.domainDnsHttpsSubmissionSealReviewItems !== undefined);
    assert.ok(view.operatingDbSubmissionSealReviewItems !== undefined);
    assert.ok(view.runtimeWorkerQueueAdapterSubmissionSealReviewItems !== undefined);
    assert.ok(view.apiAndSecretSubmissionSealReviewItems !== undefined);
    assert.ok(view.uiActionSubmissionSealReviewItems !== undefined);
    assert.ok(view.finalSubmissionSealRequirementReviewItems !== undefined);
  });

  it('validates read-only and true flags', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView()
    );
    assert.strictEqual(view.isReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReview, true);
    assert.strictEqual(view.requiresSeparateTask366Approval, true);
    assert.strictEqual(view.finalApprovalSubmissionSealReviewStarted, true);
    assert.strictEqual(view.finalApprovalSubmissionSealStillReadOnly, true);
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
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView()
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
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionSealReviewView(
      createDummyCertificationView()
    );
    assert.ok(view.nextTaskApprovalPhrase.includes('Task 366에서 TMS read-only 운영 배포 최종 승인 제출 Seal 결과 인증 화면 구현을 승인합니다.'));
    assert.ok(view.nextTaskApprovalPhrase.includes('실제 최종 승인이나 실제 배포 실행이 아니라'));
    assert.ok(view.nextTaskApprovalPhrase.includes('Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.'));
  });
});
