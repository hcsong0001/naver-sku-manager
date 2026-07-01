import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-lock-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-boundary-outcome-certification-view.service';

function makeDummy385Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceBoundaryItemId: `source-${outcomeCertificationItemId}`,
    category: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 385 ${outcomeCertificationItemId}`,
    description: `Task 385 description ${outcomeCertificationItemId}`,
    sourceBoundaryStatus: 'PRE_APPROVAL_BOUNDARY_READY' as const,
    outcomeCertificationStatus: 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy385View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView {
  const item = makeDummy385Item('task385-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy385Item(`task385-item-${idx + 1}`)
  );

  return {
    taskId: 385,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Boundary Outcome Certification',
    sourceSubmissionPreApprovalBoundaryStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    submissionPreApprovalBoundaryOutcomeCertificationReadinessItems: [item],
    submissionPreApprovalBoundaryReferenceOutcomeCertificationItems: [item],
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems: [item],
    approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems: [item],
    approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems: [item],
    approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems: [item],
    finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems: [item],
    finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems: [item],
    deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems: [item],
    deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems: [item],
    operatingTransitionPreApprovalBoundaryOutcomeCertificationItems: [item],
    infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems: [item],
    apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    submissionPreApprovalBoundaryOutcomeCertificationReadinessItemCount: 1,
    submissionPreApprovalBoundaryReferenceOutcomeCertificationItemCount: 1,
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItemCount:
      1,
    approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    deploymentApprovalPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    deploymentExecutionPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    operatingTransitionPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItemCount: 1,
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
    actualFinalSubmissionLockReviewSubmitted: false,
    actualFinalSubmissionLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundarySubmitted: false,
    actualSubmissionPreApprovalGranted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false,
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

describe('Task 386 - Approval Request Submission Pre-Approval Lock Review', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED',
    },
  ];

  it('Task 385 READY → Task 386 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
      cases[0].expected
    );
  });

  it('Task 385 PARTIAL_READY → Task 386 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
      cases[1].expected
    );
  });

  it('Task 385 BLOCKED → Task 386 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
      cases[2].expected
    );
  });

  it('Task 385 NOT_STARTED → Task 386 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus,
      cases[3].expected
    );
  });

  it('14개 Submission Pre-Approval Lock Review 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[0].input)
      );
    assert.ok(view.submissionPreApprovalLockReviewReadinessItems.length > 0, 'group 1');
    assert.ok(
      view.submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems.length > 0,
      'group 2'
    );
    assert.ok(view.approvalRequestCreationPreApprovalLockReviewItems.length > 0, 'group 3');
    assert.ok(view.approvalRequestReviewSubmissionPreApprovalLockReviewItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestSubmissionPreApprovalLockReviewItems.length > 0, 'group 5');
    assert.ok(view.preApprovalGrantLockReviewItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionPreApprovalLockReviewItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantPreApprovalLockReviewItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalPreApprovalLockReviewItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionPreApprovalLockReviewItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionPreApprovalLockReviewItems.length > 0, 'group 11');
    assert.ok(view.infrastructureDomainDnsHttpsPreApprovalLockReviewItems.length > 0, 'group 12');
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostPreApprovalLockReviewItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[0].input)
      );
    assert.equal(
      view.recommendedPreApprovalLockReviewDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[0].input)
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
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Pre-Approval Lock Review가 실제 승인 또는 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[0].input)
      );
    assert.equal(view.actualSubmissionPreApprovalLockReviewSubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalLockReviewGranted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(cases[0].input)
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

  it('입력 ViewModel의 Task 385 결과를 변경하지 않는다', () => {
    const input = makeDummy385View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
      originalStatus
    );
    assert.equal(input.taskId, 385);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
        makeDummy385View(input)
      ).operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
