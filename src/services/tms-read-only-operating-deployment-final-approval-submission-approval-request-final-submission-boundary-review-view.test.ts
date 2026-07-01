import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-boundary-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-lock-outcome-certification-view.service';

function makeDummy379Item() {
  return {
    outcomeCertificationItemId: 'task379-item-1',
    sourceLockReviewItemId: 'task378-item-1',
    category: 'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS' as const,
    label: 'Task 379 Test Item',
    description: 'Task 379 test description',
    sourceTaskId: 379,
    sourceStatus: 'READY',
    sourceLockReviewStatus: 'SUBMISSION_LOCK_REVIEW_PASSED',
    outcomeCertificationStatus: 'SUBMISSION_LOCK_OUTCOME_CERTIFIED' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
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

function makeDummy379View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationView {
  const item = makeDummy379Item();
  return {
    taskId: 379,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Lock Outcome Certification',
    sourceSubmissionLockReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
    sourceRecommendedSubmissionLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    sourceRecommendedSubmissionLockReviewDecisionLabel: 'source review label',
    sourceSubmissionReadinessOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_READINESS_OUTCOME_CERTIFIED_READY',
    sourceRecommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    sourceRecommendedOutcomeCertificationDecisionLabel: 'source cert label',
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
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus:
      status,
    approvalRequestSubmissionLockOutcomeCertificationStarted: true,
    approvalRequestSubmissionLockOutcomeCertificationStillReadOnly: true,
    approvalRequestSubmissionLockOutcomeCertificationStillLocked: true,
    approvalRequestSubmissionLockOutcomeCertificationCompleted: true,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Submission Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems: Array.from({ length: 14 }, (_, idx) => ({
      ...item,
      outcomeCertificationItemId: `task379-item-${idx + 1}`,
      sourceLockReviewItemId: `task378-item-${idx + 1}`,
    })),
    approvalRequestSubmissionLockOutcomeCertificationReadinessItems: [item],
    approvalRequestSubmissionLockReviewOutcomeCertificationItems: [item],
    approvalRequestSubmissionReadinessOutcomeCertificationReferenceItems: [item],
    approvalRequestCreationLockOutcomeCertificationItems: [item],
    approvalRequestReviewSubmissionLockOutcomeCertificationItems: [item],
    approvalRequestSubmissionLockOutcomeCertificationItems: [item],
    finalApprovalSubmissionLockOutcomeCertificationItems: [item],
    finalApprovalGrantLockOutcomeCertificationItems: [item],
    deploymentApprovalLockOutcomeCertificationItems: [item],
    deploymentExecutionLockOutcomeCertificationItems: [item],
    operatingTransitionLockOutcomeCertificationItems: [item],
    infrastructureDomainDnsHttpsLockOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems: [item],
    apiSecretUiActionPostLockOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    certifiedOutcomeCertificationItems: [item],
    failedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    approvalRequestSubmissionLockOutcomeCertificationReadinessItemCount: 1,
    approvalRequestSubmissionLockReviewOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionReadinessOutcomeCertificationReferenceItemCount: 1,
    approvalRequestCreationLockOutcomeCertificationItemCount: 1,
    approvalRequestReviewSubmissionLockOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionLockOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionLockOutcomeCertificationItemCount: 1,
    finalApprovalGrantLockOutcomeCertificationItemCount: 1,
    deploymentApprovalLockOutcomeCertificationItemCount: 1,
    deploymentExecutionLockOutcomeCertificationItemCount: 1,
    operatingTransitionLockOutcomeCertificationItemCount: 1,
    infrastructureDomainDnsHttpsLockOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostLockOutcomeCertificationItemCount: 1,
    certifiedItemCount: 1,
    failedItemCount: 0,
    notStartedItemCount: 0,
    totalApprovalRequestSubmissionLockOutcomeCertificationItemCount: 14,
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
    actualSubmissionReadinessReviewSubmitted: false,
    actualSubmissionReadinessOutcomeCertificationSubmitted: false,
    actualSubmissionLockReviewSubmitted: false,
    actualSubmissionLockOutcomeCertificationSubmitted: false,
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
    submissionReadinessReviewStillNotSubmitted: true,
    submissionReadinessOutcomeCertificationStillNotSubmitted: true,
    submissionLockReviewStillNotSubmitted: true,
    submissionLockOutcomeCertificationStillNotSubmitted: true,
    submissionLockOutcomeCertificationNotInterpretedAsSubmission: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertification:
      true,
    requiresSeparateTask380Approval: true,
    nextTaskApprovalPhrase: 'Task 380 approval phrase',
  };
}

describe('Task 380 - Approval Request Final Submission Boundary Review', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED',
    },
  ];

  it('Task 379 READY → Task 380 READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[0].input)
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
      cases[0].expected
    );
  });

  it('Task 379 PARTIAL_READY → Task 380 PARTIAL_READY', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[1].input)
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
      cases[1].expected
    );
  });

  it('Task 379 BLOCKED → Task 380 BLOCKED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[2].input)
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
      cases[2].expected
    );
  });

  it('Task 379 NOT_STARTED → Task 380 NOT_STARTED', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[3].input)
    );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
      cases[3].expected
    );
  });

  it('14개 Final Submission Boundary Review 그룹이 모두 생성된다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[0].input)
    );
    assert.ok(view.finalSubmissionBoundaryReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.submissionLockOutcomeCertificationReferenceBoundaryReviewItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestCreationBoundaryReviewItems.length > 0, 'group 3');
    assert.ok(view.approvalRequestReviewSubmissionBoundaryReviewItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestSubmissionBoundaryReviewItems.length > 0, 'group 5');
    assert.ok(view.finalApprovalSubmissionBoundaryReviewItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalGrantBoundaryReviewItems.length > 0, 'group 7');
    assert.ok(view.deploymentApprovalBoundaryReviewItems.length > 0, 'group 8');
    assert.ok(view.deploymentExecutionBoundaryReviewItems.length > 0, 'group 9');
    assert.ok(view.operatingTransitionBoundaryReviewItems.length > 0, 'group 10');
    assert.ok(view.infrastructureDomainDnsHttpsBoundaryReviewItems.length > 0, 'group 11');
    assert.ok(view.operatingDbBoundaryReviewItems.length > 0, 'group 12');
    assert.ok(view.runtimeWorkerQueueAdapterBoundaryReviewItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostBoundaryReviewItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[0].input)
    );
    assert.equal(
      view.recommendedBoundaryReviewDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'FINAL_SUBMISSION_BOUNDARY_REVIEW_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 및 Final Submission Boundary Review 제출이 모두 false다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[0].input)
    );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualSubmissionReadinessReviewSubmitted, false);
    assert.equal(view.actualSubmissionReadinessOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualSubmissionLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalSubmissionBoundaryReviewSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Final Submission Boundary Review가 실제 제출로 해석되지 않는다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[0].input)
    );
    assert.equal(view.actualFinalSubmissionBoundaryReviewSubmitted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      makeDummy379View(cases[0].input)
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

  it('입력 ViewModel의 Task 379 결과를 변경하지 않는다', () => {
    const input = makeDummy379View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionLockOutcomeCertificationStatus,
      originalStatus
    );
    assert.equal(input.taskId, 379);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView(
        makeDummy379View(input)
      ).operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
