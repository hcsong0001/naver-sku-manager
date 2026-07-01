import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-boundary-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-lock-outcome-certification-view.service';

function makeDummy383Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceLockReviewItemId: `source-${outcomeCertificationItemId}`,
    category: 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 383 ${outcomeCertificationItemId}`,
    description: `Task 383 description ${outcomeCertificationItemId}`,
    sourceLockReviewStatus: 'FINAL_LOCK_REVIEW_READY' as const,
    outcomeCertificationStatus: 'FINAL_LOCK_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy383View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView {
  const item = makeDummy383Item('task383-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy383Item(`task383-item-${idx + 1}`)
  );

  return {
    taskId: 383,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Final Submission Lock Outcome Certification',
    sourceFinalSubmissionLockReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Final Submission Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    finalSubmissionLockOutcomeCertificationReadinessItems: [item],
    finalSubmissionLockReviewOutcomeCertificationItems: [item],
    finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems: [item],
    approvalRequestCreationFinalLockOutcomeCertificationItems: [item],
    approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems: [item],
    approvalRequestSubmissionFinalLockOutcomeCertificationItems: [item],
    finalApprovalSubmissionFinalLockOutcomeCertificationItems: [item],
    finalApprovalGrantFinalLockOutcomeCertificationItems: [item],
    deploymentApprovalFinalLockOutcomeCertificationItems: [item],
    deploymentExecutionFinalLockOutcomeCertificationItems: [item],
    operatingTransitionFinalLockOutcomeCertificationItems: [item],
    infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems: [item],
    apiSecretUiActionPostFinalLockOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    finalSubmissionLockOutcomeCertificationReadinessItemCount: 1,
    finalSubmissionLockReviewOutcomeCertificationItemCount: 1,
    finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItemCount: 1,
    approvalRequestCreationFinalLockOutcomeCertificationItemCount: 1,
    approvalRequestReviewSubmissionFinalLockOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionFinalLockOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionFinalLockOutcomeCertificationItemCount: 1,
    finalApprovalGrantFinalLockOutcomeCertificationItemCount: 1,
    deploymentApprovalFinalLockOutcomeCertificationItemCount: 1,
    deploymentExecutionFinalLockOutcomeCertificationItemCount: 1,
    operatingTransitionFinalLockOutcomeCertificationItemCount: 1,
    infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostFinalLockOutcomeCertificationItemCount: 1,
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

describe('Task 384 - Approval Request Submission Pre-Approval Boundary', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_NOT_STARTED',
    },
  ];

  it('Task 383 READY → Task 384 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
      cases[0].expected
    );
  });

  it('Task 383 PARTIAL_READY → Task 384 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
      cases[1].expected
    );
  });

  it('Task 383 BLOCKED → Task 384 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
      cases[2].expected
    );
  });

  it('Task 383 NOT_STARTED → Task 384 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
      cases[3].expected
    );
  });

  it('14개 Submission Pre-Approval Boundary 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[0].input)
      );
    assert.ok(view.submissionPreApprovalBoundaryReadinessItems.length > 0, 'group 1');
    assert.ok(
      view.finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems.length > 0,
      'group 2'
    );
    assert.ok(view.approvalRequestCreationPreApprovalBoundaryItems.length > 0, 'group 3');
    assert.ok(view.approvalRequestReviewSubmissionPreApprovalBoundaryItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestSubmissionPreApprovalBoundaryItems.length > 0, 'group 5');
    assert.ok(view.finalApprovalSubmissionPreApprovalBoundaryItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalGrantPreApprovalBoundaryItems.length > 0, 'group 7');
    assert.ok(view.deploymentApprovalPreApprovalBoundaryItems.length > 0, 'group 8');
    assert.ok(view.deploymentExecutionPreApprovalBoundaryItems.length > 0, 'group 9');
    assert.ok(view.operatingTransitionPreApprovalBoundaryItems.length > 0, 'group 10');
    assert.ok(view.infrastructureDomainDnsHttpsPreApprovalBoundaryItems.length > 0, 'group 11');
    assert.ok(view.operatingDbPreApprovalBoundaryItems.length > 0, 'group 12');
    assert.ok(view.runtimeWorkerQueueAdapterPreApprovalBoundaryItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostPreApprovalBoundaryItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[0].input)
      );
    assert.equal(
      view.recommendedPreApprovalBoundaryDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'SUBMISSION_PRE_APPROVAL_BOUNDARY_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[0].input)
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
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Submission Pre-Approval Boundary가 실제 승인 또는 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[0].input)
      );
    assert.equal(view.actualSubmissionPreApprovalBoundarySubmitted, false);
    assert.equal(view.actualSubmissionPreApprovalGranted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(cases[0].input)
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

  it('입력 ViewModel의 Task 383 결과를 변경하지 않는다', () => {
    const input = makeDummy383View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
      originalStatus
    );
    assert.equal(input.taskId, 383);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView(
        makeDummy383View(input)
      ).operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
