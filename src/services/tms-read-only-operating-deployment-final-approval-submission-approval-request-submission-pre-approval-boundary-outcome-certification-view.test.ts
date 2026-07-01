import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-boundary-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-boundary-view.service';

function makeDummy384Item(boundaryItemId: string) {
  return {
    boundaryItemId,
    sourceOutcomeCertificationItemId: `source-${boundaryItemId}`,
    category: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_READINESS' as const,
    label: `Task 384 ${boundaryItemId}`,
    description: `Task 384 description ${boundaryItemId}`,
    sourceOutcomeCertificationStatus: 'FINAL_LOCK_OUTCOME_CERTIFIED_READY' as const,
    boundaryStatus: 'PRE_APPROVAL_BOUNDARY_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy384View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView {
  const item = makeDummy384Item('task384-item-1');
  const boundaryItems = Array.from({ length: 14 }, (_, idx) => makeDummy384Item(`task384-item-${idx + 1}`));

  return {
    taskId: 384,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Boundary',
    sourceFinalSubmissionLockOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus: status,
    recommendedPreApprovalBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY',
    recommendedPreApprovalBoundaryDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Boundary - read-only 사전 승인 경계 표시 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    submissionPreApprovalBoundaryItems: boundaryItems,
    submissionPreApprovalBoundaryReadinessItems: [item],
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems: [item],
    approvalRequestCreationPreApprovalBoundaryItems: [item],
    approvalRequestReviewSubmissionPreApprovalBoundaryItems: [item],
    approvalRequestSubmissionPreApprovalBoundaryItems: [item],
    finalApprovalSubmissionPreApprovalBoundaryItems: [item],
    finalApprovalGrantPreApprovalBoundaryItems: [item],
    deploymentApprovalPreApprovalBoundaryItems: [item],
    deploymentExecutionPreApprovalBoundaryItems: [item],
    operatingTransitionPreApprovalBoundaryItems: [item],
    infrastructureDomainDnsHttpsPreApprovalBoundaryItems: [item],
    operatingDbPreApprovalBoundaryItems: [item],
    runtimeWorkerQueueAdapterPreApprovalBoundaryItems: [item],
    apiSecretUiActionPostPreApprovalBoundaryItems: [item],
    submissionPreApprovalBoundarySummaryCards: [],
    readyBoundaryItems: boundaryItems,
    partialReadyBoundaryItems: [],
    blockedBoundaryItems: [],
    notStartedBoundaryItems: [],
    submissionPreApprovalBoundaryReadinessItemCount: 1,
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItemCount: 1,
    approvalRequestCreationPreApprovalBoundaryItemCount: 1,
    approvalRequestReviewSubmissionPreApprovalBoundaryItemCount: 1,
    approvalRequestSubmissionPreApprovalBoundaryItemCount: 1,
    finalApprovalSubmissionPreApprovalBoundaryItemCount: 1,
    finalApprovalGrantPreApprovalBoundaryItemCount: 1,
    deploymentApprovalPreApprovalBoundaryItemCount: 1,
    deploymentExecutionPreApprovalBoundaryItemCount: 1,
    operatingTransitionPreApprovalBoundaryItemCount: 1,
    infrastructureDomainDnsHttpsPreApprovalBoundaryItemCount: 1,
    operatingDbPreApprovalBoundaryItemCount: 1,
    runtimeWorkerQueueAdapterPreApprovalBoundaryItemCount: 1,
    apiSecretUiActionPostPreApprovalBoundaryItemCount: 1,
    readyItemCount: boundaryItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalSubmissionPreApprovalBoundaryItemCount: boundaryItems.length,
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

describe('Task 385 - Approval Request Submission Pre-Approval Boundary Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 384 READY → Task 385 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 384 PARTIAL_READY → Task 385 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 384 BLOCKED → Task 385 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 384 NOT_STARTED → Task 385 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Submission Pre-Approval Boundary Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[0].input)
      );
    assert.ok(view.submissionPreApprovalBoundaryOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.submissionPreApprovalBoundaryReferenceOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(
      view.finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems.length > 0,
      'group 3'
    );
    assert.ok(view.approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(
      view.infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems.length > 0,
      'group 12'
    );
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[0].input)
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
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Pre-Approval Boundary 결과 인증이 실제 승인 또는 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[0].input)
      );
    assert.equal(view.actualSubmissionPreApprovalBoundarySubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalGranted, false);
    assert.equal(view.actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(cases[0].input)
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

  it('입력 ViewModel의 Task 384 결과를 변경하지 않는다', () => {
    const input = makeDummy384View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
      originalStatus
    );
    assert.equal(input.taskId, 384);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
        makeDummy384View(input)
      ).operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
