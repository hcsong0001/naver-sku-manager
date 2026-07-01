import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-lock-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-lock-review-view.service';

function makeDummy386Item(lockReviewItemId: string) {
  return {
    lockReviewItemId,
    sourceOutcomeCertificationItemId: `source-${lockReviewItemId}`,
    category: 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READINESS' as const,
    label: `Task 386 ${lockReviewItemId}`,
    description: `Task 386 description ${lockReviewItemId}`,
    sourceOutcomeCertificationStatus: 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    lockReviewStatus: 'PRE_APPROVAL_LOCK_REVIEW_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy386View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView {
  const item = makeDummy386Item('task386-item-1');
  const lockReviewItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy386Item(`task386-item-${idx + 1}`)
  );

  return {
    taskId: 386,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Lock Review',
    sourceSubmissionPreApprovalBoundaryOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus:
      status,
    recommendedPreApprovalLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY',
    recommendedPreApprovalLockReviewDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Lock Review - read-only 사전 승인 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    submissionPreApprovalLockReviewItems: lockReviewItems,
    submissionPreApprovalLockReviewReadinessItems: [item],
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems: [item],
    approvalRequestCreationPreApprovalLockReviewItems: [item],
    approvalRequestReviewSubmissionPreApprovalLockReviewItems: [item],
    approvalRequestSubmissionPreApprovalLockReviewItems: [item],
    preApprovalGrantLockReviewItems: [item],
    finalApprovalSubmissionPreApprovalLockReviewItems: [item],
    finalApprovalGrantPreApprovalLockReviewItems: [item],
    deploymentApprovalPreApprovalLockReviewItems: [item],
    deploymentExecutionPreApprovalLockReviewItems: [item],
    operatingTransitionPreApprovalLockReviewItems: [item],
    infrastructureDomainDnsHttpsPreApprovalLockReviewItems: [item],
    operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems: [item],
    apiSecretUiActionPostPreApprovalLockReviewItems: [item],
    submissionPreApprovalLockReviewSummaryCards: [],
    readySubmissionPreApprovalLockReviewItems: lockReviewItems,
    partialReadySubmissionPreApprovalLockReviewItems: [],
    blockedSubmissionPreApprovalLockReviewItems: [],
    notStartedSubmissionPreApprovalLockReviewItems: [],
    submissionPreApprovalLockReviewReadinessItemCount: 1,
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItemCount: 1,
    approvalRequestCreationPreApprovalLockReviewItemCount: 1,
    approvalRequestReviewSubmissionPreApprovalLockReviewItemCount: 1,
    approvalRequestSubmissionPreApprovalLockReviewItemCount: 1,
    preApprovalGrantLockReviewItemCount: 1,
    finalApprovalSubmissionPreApprovalLockReviewItemCount: 1,
    finalApprovalGrantPreApprovalLockReviewItemCount: 1,
    deploymentApprovalPreApprovalLockReviewItemCount: 1,
    deploymentExecutionPreApprovalLockReviewItemCount: 1,
    operatingTransitionPreApprovalLockReviewItemCount: 1,
    infrastructureDomainDnsHttpsPreApprovalLockReviewItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItemCount: 1,
    apiSecretUiActionPostPreApprovalLockReviewItemCount: 1,
    readyItemCount: lockReviewItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalSubmissionPreApprovalLockReviewItemCount: lockReviewItems.length,
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
    actualFinalSubmissionBoundaryReviewSubmitted: false,
    actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualFinalSubmissionLockReviewSubmitted: false,
    actualFinalSubmissionLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundarySubmitted: false,
    actualSubmissionPreApprovalGranted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false,
    actualSubmissionPreApprovalLockReviewSubmitted: false,
    actualSubmissionPreApprovalLockReviewGranted: false,
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
  };
}

describe('Task 387 - Approval Request Submission Pre-Approval Lock Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 386 READY → Task 387 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 386 PARTIAL_READY → Task 387 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 386 BLOCKED → Task 387 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 386 NOT_STARTED → Task 387 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Submission Pre-Approval Lock Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[0].input)
      );
    assert.ok(view.submissionPreApprovalLockOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.submissionPreApprovalLockReviewOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(
      view.submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems.length > 0,
      'group 3'
    );
    assert.ok(view.approvalRequestCreationPreApprovalLockOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.preApprovalGrantLockOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.finalApprovalGrantPreApprovalLockOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.deploymentApprovalPreApprovalLockOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.deploymentExecutionPreApprovalLockOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.operatingTransitionPreApprovalLockOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(
      view.infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[0].input)
      );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualSubmissionReadinessReviewSubmitted, false);
    assert.equal(view.actualSubmissionReadinessOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualSubmissionLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalSubmissionBoundaryReviewSubmitted, false);
    assert.equal(view.actualFinalSubmissionBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualFinalSubmissionLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalBoundarySubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalGranted, false);
    assert.equal(view.actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted, false);
    assert.equal(view.actualSubmissionPreApprovalLockReviewSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalLockReviewGranted, false);
    assert.equal(view.actualSubmissionPreApprovalLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalLockOutcomeCertificationGranted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Pre-Approval Lock 결과 인증이 실제 승인 또는 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[0].input)
      );
    assert.equal(view.actualSubmissionPreApprovalLockReviewSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalLockReviewGranted, false);
    assert.equal(view.actualSubmissionPreApprovalLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalLockOutcomeCertificationGranted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(cases[0].input)
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

  it('입력 ViewModel의 Task 386 결과를 변경하지 않는다', () => {
    const input = makeDummy386View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
      originalStatus
    );
    assert.equal(input.taskId, 386);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView(
        makeDummy386View(input)
      ).operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
