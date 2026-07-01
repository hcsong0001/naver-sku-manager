import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-boundary-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-boundary-review-view.service';

function makeDummy380Item(boundaryReviewItemId: string) {
  return {
    boundaryReviewItemId,
    sourceOutcomeCertificationItemId: `source-${boundaryReviewItemId}`,
    category: 'FINAL_SUBMISSION_BOUNDARY_REVIEW_READINESS' as const,
    label: `Task 380 ${boundaryReviewItemId}`,
    description: `Task 380 description ${boundaryReviewItemId}`,
    reviewStatus: 'BOUNDARY_REVIEW_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy380View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewView {
  const item = makeDummy380Item('task380-item-1');
  const boundaryReviewItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy380Item(`task380-item-${idx + 1}`)
  );

  return {
    taskId: 380,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Final Submission Boundary Review',
    sourceSubmissionLockOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus:
      status,
    recommendedBoundaryReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
    recommendedBoundaryReviewDecisionLabel:
      '최종 승인 제출 Approval Request Final Submission Boundary Review - read-only 최종 제출 경계 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    boundaryReviewItems,
    finalSubmissionBoundaryReviewReadinessItems: [item],
    submissionLockOutcomeCertificationReferenceBoundaryReviewItems: [item],
    approvalRequestCreationBoundaryReviewItems: [item],
    approvalRequestReviewSubmissionBoundaryReviewItems: [item],
    approvalRequestSubmissionBoundaryReviewItems: [item],
    finalApprovalSubmissionBoundaryReviewItems: [item],
    finalApprovalGrantBoundaryReviewItems: [item],
    deploymentApprovalBoundaryReviewItems: [item],
    deploymentExecutionBoundaryReviewItems: [item],
    operatingTransitionBoundaryReviewItems: [item],
    infrastructureDomainDnsHttpsBoundaryReviewItems: [item],
    operatingDbBoundaryReviewItems: [item],
    runtimeWorkerQueueAdapterBoundaryReviewItems: [item],
    apiSecretUiActionPostBoundaryReviewItems: [item],
    boundaryReviewSummaryCards: [],
    readyBoundaryReviewItems: boundaryReviewItems,
    partialReadyBoundaryReviewItems: [],
    blockedBoundaryReviewItems: [],
    notStartedBoundaryReviewItems: [],
    finalSubmissionBoundaryReviewReadinessItemCount: 1,
    submissionLockOutcomeCertificationReferenceBoundaryReviewItemCount: 1,
    approvalRequestCreationBoundaryReviewItemCount: 1,
    approvalRequestReviewSubmissionBoundaryReviewItemCount: 1,
    approvalRequestSubmissionBoundaryReviewItemCount: 1,
    finalApprovalSubmissionBoundaryReviewItemCount: 1,
    finalApprovalGrantBoundaryReviewItemCount: 1,
    deploymentApprovalBoundaryReviewItemCount: 1,
    deploymentExecutionBoundaryReviewItemCount: 1,
    operatingTransitionBoundaryReviewItemCount: 1,
    infrastructureDomainDnsHttpsBoundaryReviewItemCount: 1,
    operatingDbBoundaryReviewItemCount: 1,
    runtimeWorkerQueueAdapterBoundaryReviewItemCount: 1,
    apiSecretUiActionPostBoundaryReviewItemCount: 1,
    readyItemCount: boundaryReviewItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalBoundaryReviewItemCount: boundaryReviewItems.length,
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

describe('Task 381 - Approval Request Final Submission Boundary Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 380 READY → Task 381 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 380 PARTIAL_READY → Task 381 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 380 BLOCKED → Task 381 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 380 NOT_STARTED → Task 381 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Final Submission Boundary Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[0].input)
      );
    assert.ok(view.finalSubmissionBoundaryOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.finalSubmissionBoundaryReviewOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(
      view.submissionLockOutcomeCertificationReferenceBoundaryOutcomeCertificationItems.length > 0,
      'group 3'
    );
    assert.ok(view.approvalRequestCreationBoundaryOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestReviewSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionBoundaryOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantBoundaryOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalBoundaryOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionBoundaryOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionBoundaryOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.infrastructureDomainDnsHttpsBoundaryOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterBoundaryOutcomeCertificationItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostBoundaryOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[0].input)
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
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Final Submission Boundary 결과 인증이 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[0].input)
      );
    assert.equal(view.actualFinalSubmissionBoundaryReviewSubmitted, false);
    assert.equal(view.actualFinalSubmissionBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(cases[0].input)
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

  it('입력 ViewModel의 Task 380 결과를 변경하지 않는다', () => {
    const input = makeDummy380View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryReviewStatus,
      originalStatus
    );
    assert.equal(input.taskId, 380);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView(
        makeDummy380View(input)
      )
        .operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
