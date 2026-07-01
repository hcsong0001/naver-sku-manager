import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-lock-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-boundary-outcome-certification-view.service';

function makeDummy381Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceBoundaryReviewItemId: `source-${outcomeCertificationItemId}`,
    category: 'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 381 ${outcomeCertificationItemId}`,
    description: `Task 381 description ${outcomeCertificationItemId}`,
    sourceBoundaryReviewStatus: 'BOUNDARY_REVIEW_READY' as const,
    outcomeCertificationStatus: 'BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy381View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationView {
  const item = makeDummy381Item('task381-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy381Item(`task381-item-${idx + 1}`)
  );

  return {
    taskId: 381,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Final Submission Boundary Outcome Certification',
    sourceFinalSubmissionBoundaryReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_REVIEW_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Final Submission Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    finalSubmissionBoundaryOutcomeCertificationReadinessItems: [item],
    finalSubmissionBoundaryReviewOutcomeCertificationItems: [item],
    submissionLockOutcomeCertificationReferenceBoundaryOutcomeCertificationItems: [item],
    approvalRequestCreationBoundaryOutcomeCertificationItems: [item],
    approvalRequestReviewSubmissionBoundaryOutcomeCertificationItems: [item],
    approvalRequestSubmissionBoundaryOutcomeCertificationItems: [item],
    finalApprovalSubmissionBoundaryOutcomeCertificationItems: [item],
    finalApprovalGrantBoundaryOutcomeCertificationItems: [item],
    deploymentApprovalBoundaryOutcomeCertificationItems: [item],
    deploymentExecutionBoundaryOutcomeCertificationItems: [item],
    operatingTransitionBoundaryOutcomeCertificationItems: [item],
    infrastructureDomainDnsHttpsBoundaryOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterBoundaryOutcomeCertificationItems: [item],
    apiSecretUiActionPostBoundaryOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    finalSubmissionBoundaryOutcomeCertificationReadinessItemCount: 1,
    finalSubmissionBoundaryReviewOutcomeCertificationItemCount: 1,
    submissionLockOutcomeCertificationReferenceBoundaryOutcomeCertificationItemCount: 1,
    approvalRequestCreationBoundaryOutcomeCertificationItemCount: 1,
    approvalRequestReviewSubmissionBoundaryOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionBoundaryOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionBoundaryOutcomeCertificationItemCount: 1,
    finalApprovalGrantBoundaryOutcomeCertificationItemCount: 1,
    deploymentApprovalBoundaryOutcomeCertificationItemCount: 1,
    deploymentExecutionBoundaryOutcomeCertificationItemCount: 1,
    operatingTransitionBoundaryOutcomeCertificationItemCount: 1,
    infrastructureDomainDnsHttpsBoundaryOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterBoundaryOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostBoundaryOutcomeCertificationItemCount: 1,
    readyItemCount: outcomeCertificationItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalOutcomeCertificationItemCount: outcomeCertificationItems.length,
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

describe('Task 382 - Approval Request Final Submission Lock Review', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
    },
  ];

  it('Task 381 READY → Task 382 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
      cases[0].expected
    );
  });

  it('Task 381 PARTIAL_READY → Task 382 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
      cases[1].expected
    );
  });

  it('Task 381 BLOCKED → Task 382 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
      cases[2].expected
    );
  });

  it('Task 381 NOT_STARTED → Task 382 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
      cases[3].expected
    );
  });

  it('14개 Final Submission Lock Review 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[0].input)
      );
    assert.ok(view.finalSubmissionLockReviewReadinessItems.length > 0, 'group 1');
    assert.ok(
      view.finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems.length > 0,
      'group 2'
    );
    assert.ok(view.approvalRequestCreationFinalLockReviewItems.length > 0, 'group 3');
    assert.ok(view.approvalRequestReviewSubmissionFinalLockReviewItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestSubmissionFinalLockReviewItems.length > 0, 'group 5');
    assert.ok(view.finalApprovalSubmissionFinalLockReviewItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalGrantFinalLockReviewItems.length > 0, 'group 7');
    assert.ok(view.deploymentApprovalFinalLockReviewItems.length > 0, 'group 8');
    assert.ok(view.deploymentExecutionFinalLockReviewItems.length > 0, 'group 9');
    assert.ok(view.operatingTransitionFinalLockReviewItems.length > 0, 'group 10');
    assert.ok(view.infrastructureDomainDnsHttpsFinalLockReviewItems.length > 0, 'group 11');
    assert.ok(view.operatingDbFinalLockReviewItems.length > 0, 'group 12');
    assert.ok(view.runtimeWorkerQueueAdapterFinalLockReviewItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostFinalLockReviewItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[0].input)
      );
    assert.equal(
      view.recommendedFinalSubmissionLockReviewDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'FINAL_SUBMISSION_LOCK_REVIEW_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[0].input)
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
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Final Submission Lock Review가 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[0].input)
      );
    assert.equal(view.actualFinalSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(cases[0].input)
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

  it('입력 ViewModel의 Task 381 결과를 변경하지 않는다', () => {
    const input = makeDummy381View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionBoundaryOutcomeCertificationStatus,
      originalStatus
    );
    assert.equal(input.taskId, 381);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView(
        makeDummy381View(input)
      ).operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
