import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-lock-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-final-submission-lock-review-view.service';

function makeDummy382Item(lockReviewItemId: string) {
  return {
    lockReviewItemId,
    sourceOutcomeCertificationItemId: `source-${lockReviewItemId}`,
    category: 'FINAL_SUBMISSION_LOCK_REVIEW_READINESS' as const,
    label: `Task 382 ${lockReviewItemId}`,
    description: `Task 382 description ${lockReviewItemId}`,
    sourceOutcomeCertificationStatus: 'BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    lockReviewStatus: 'FINAL_LOCK_REVIEW_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy382View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewView {
  const item = makeDummy382Item('task382-item-1');
  const finalSubmissionLockReviewItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy382Item(`task382-item-${idx + 1}`)
  );

  return {
    taskId: 382,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Final Submission Lock Review',
    sourceFinalSubmissionBoundaryOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus:
      status,
    recommendedFinalSubmissionLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedFinalSubmissionLockReviewDecisionLabel:
      '최종 승인 제출 Approval Request Final Submission Lock Review - read-only 최종 제출 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalSubmissionLockReviewItems,
    finalSubmissionLockReviewReadinessItems: [item],
    finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItems: [item],
    approvalRequestCreationFinalLockReviewItems: [item],
    approvalRequestReviewSubmissionFinalLockReviewItems: [item],
    approvalRequestSubmissionFinalLockReviewItems: [item],
    finalApprovalSubmissionFinalLockReviewItems: [item],
    finalApprovalGrantFinalLockReviewItems: [item],
    deploymentApprovalFinalLockReviewItems: [item],
    deploymentExecutionFinalLockReviewItems: [item],
    operatingTransitionFinalLockReviewItems: [item],
    infrastructureDomainDnsHttpsFinalLockReviewItems: [item],
    operatingDbFinalLockReviewItems: [item],
    runtimeWorkerQueueAdapterFinalLockReviewItems: [item],
    apiSecretUiActionPostFinalLockReviewItems: [item],
    finalSubmissionLockReviewSummaryCards: [],
    readyFinalSubmissionLockReviewItems: finalSubmissionLockReviewItems,
    partialReadyFinalSubmissionLockReviewItems: [],
    blockedFinalSubmissionLockReviewItems: [],
    notStartedFinalSubmissionLockReviewItems: [],
    finalSubmissionLockReviewReadinessItemCount: 1,
    finalSubmissionBoundaryOutcomeCertificationReferenceLockReviewItemCount: 1,
    approvalRequestCreationFinalLockReviewItemCount: 1,
    approvalRequestReviewSubmissionFinalLockReviewItemCount: 1,
    approvalRequestSubmissionFinalLockReviewItemCount: 1,
    finalApprovalSubmissionFinalLockReviewItemCount: 1,
    finalApprovalGrantFinalLockReviewItemCount: 1,
    deploymentApprovalFinalLockReviewItemCount: 1,
    deploymentExecutionFinalLockReviewItemCount: 1,
    operatingTransitionFinalLockReviewItemCount: 1,
    infrastructureDomainDnsHttpsFinalLockReviewItemCount: 1,
    operatingDbFinalLockReviewItemCount: 1,
    runtimeWorkerQueueAdapterFinalLockReviewItemCount: 1,
    apiSecretUiActionPostFinalLockReviewItemCount: 1,
    readyItemCount: finalSubmissionLockReviewItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalFinalSubmissionLockReviewItemCount: finalSubmissionLockReviewItems.length,
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

describe('Task 383 - Approval Request Final Submission Lock Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 382 READY → Task 383 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 382 PARTIAL_READY → Task 383 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 382 BLOCKED → Task 383 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 382 NOT_STARTED → Task 383 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Final Submission Lock Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[0].input)
      );
    assert.ok(view.finalSubmissionLockOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.finalSubmissionLockReviewOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(
      view.finalSubmissionBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems.length > 0,
      'group 3'
    );
    assert.ok(view.approvalRequestCreationFinalLockOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(
      view.approvalRequestReviewSubmissionFinalLockOutcomeCertificationItems.length > 0,
      'group 5'
    );
    assert.ok(view.approvalRequestSubmissionFinalLockOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionFinalLockOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantFinalLockOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalFinalLockOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionFinalLockOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionFinalLockOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(
      view.infrastructureDomainDnsHttpsFinalLockOutcomeCertificationItems.length > 0,
      'group 12'
    );
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterFinalLockOutcomeCertificationItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostFinalLockOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인 요청 생성/제출 여부가 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[0].input)
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
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
  });

  it('Final Submission Lock 결과 인증이 실제 제출로 해석되지 않는다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[0].input)
      );
    assert.equal(view.actualFinalSubmissionLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 관련 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(cases[0].input)
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

  it('입력 ViewModel의 Task 382 결과를 변경하지 않는다', () => {
    const input = makeDummy382View(cases[0].input);
    const originalStatus =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus;
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
      input
    );
    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockReviewStatus,
      originalStatus
    );
    assert.equal(input.taskId, 382);
  });

  it('상태 매핑이 exhaustive하다', () => {
    const results = cases.map(({ input }) =>
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationView(
        makeDummy382View(input)
      )
        .operatingDeploymentFinalApprovalSubmissionApprovalRequestFinalSubmissionLockOutcomeCertificationStatus
    );
    assert.deepEqual(results, cases.map(({ expected }) => expected));
  });
});
