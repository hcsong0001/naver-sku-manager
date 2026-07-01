import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-boundary-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-boundary-view.service';

function makeDummy391Item(submissionBoundaryItemId: string) {
  return {
    submissionBoundaryItemId,
    sourceOutcomeCertificationItemId: `source-${submissionBoundaryItemId}`,
    category: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READINESS' as const,
    label: `Task 391 ${submissionBoundaryItemId}`,
    description: `Task 391 description ${submissionBoundaryItemId}`,
    sourceOutcomeCertificationStatus:
      'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY' as const,
    submissionBoundaryStatus: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy391View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView {
  const item = makeDummy391Item('task391-item-1');
  const submissionBoundaryItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy391Item(`task391-item-${idx + 1}`)
  );

  return {
    taskId: 391,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Boundary',
    sourceExplicitApprovalRequestPacketReviewOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus:
      status,
    recommendedSubmissionBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_ONLY',
    recommendedSubmissionBoundaryDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Boundary - read-only 명시 승인 요청 제출 경계 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance:
      '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.',
    explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    submissionBoundaryItems,
    explicitApprovalRequestSubmissionBoundaryReadinessItems: [item],
    packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems: [item],
    explicitApprovalPhraseNonInputBoundaryItems: [item],
    explicitApprovalPhraseNonSubmissionBoundaryItems: [item],
    explicitApprovalAcceptanceNonGrantBoundaryItems: [item],
    explicitApprovalRequestCreationBoundaryItems: [item],
    explicitApprovalRequestSubmissionBoundaryItems: [item],
    approvalRequestCreationNonExecutionBoundaryItems: [item],
    approvalRequestSubmissionNonExecutionBoundaryItems: [item],
    finalApprovalSubmissionNonExecutionBoundaryItems: [item],
    finalApprovalGrantNonExecutionBoundaryItems: [item],
    deploymentOperatingTransitionNonExecutionBoundaryItems: [item],
    operatingDbRuntimeWorkerQueueAdapterBoundaryItems: [item],
    apiSecretUiActionPostBoundaryItems: [item],
    submissionBoundarySummaryCards: [],
    readySubmissionBoundaryItems: submissionBoundaryItems,
    partialReadySubmissionBoundaryItems: [],
    blockedSubmissionBoundaryItems: [],
    notStartedSubmissionBoundaryItems: [],
    explicitApprovalRequestSubmissionBoundaryReadinessItemCount: 1,
    packetReviewOutcomeCertificationReferenceSubmissionBoundaryItemCount: 1,
    explicitApprovalPhraseNonInputBoundaryItemCount: 1,
    explicitApprovalPhraseNonSubmissionBoundaryItemCount: 1,
    explicitApprovalAcceptanceNonGrantBoundaryItemCount: 1,
    explicitApprovalRequestCreationBoundaryItemCount: 1,
    explicitApprovalRequestSubmissionBoundaryItemCount: 1,
    approvalRequestCreationNonExecutionBoundaryItemCount: 1,
    approvalRequestSubmissionNonExecutionBoundaryItemCount: 1,
    finalApprovalSubmissionNonExecutionBoundaryItemCount: 1,
    finalApprovalGrantNonExecutionBoundaryItemCount: 1,
    deploymentOperatingTransitionNonExecutionBoundaryItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterBoundaryItemCount: 1,
    apiSecretUiActionPostBoundaryItemCount: 1,
    readyItemCount: submissionBoundaryItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalSubmissionBoundaryItemCount: submissionBoundaryItems.length,
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
    actualExplicitApprovalRequestCreated: false,
    actualExplicitApprovalRequestSubmitted: false,
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
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
    actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationGranted: false,
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
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}

describe('Task 392 - Explicit Approval Request Submission Boundary Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 391 READY → Task 392 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 391 PARTIAL_READY → Task 392 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 391 BLOCKED → Task 392 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 391 NOT_STARTED → Task 392 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Explicit Approval Request Submission Boundary Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[0].input)
      );
    assert.ok(
      view.explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems.length > 0,
      'group 1'
    );
    assert.ok(
      view.explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems.length > 0,
      'group 2'
    );
    assert.ok(view.explicitApprovalPhraseNonInputOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(
      view.explicitApprovalPhraseNonSubmissionOutcomeCertificationItems.length > 0,
      'group 4'
    );
    assert.ok(
      view.explicitApprovalAcceptanceNonGrantOutcomeCertificationItems.length > 0,
      'group 5'
    );
    assert.ok(
      view.explicitApprovalRequestCreationBoundaryOutcomeCertificationItems.length > 0,
      'group 6'
    );
    assert.ok(
      view.explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems.length > 0,
      'group 7'
    );
    assert.ok(view.approvalRequestCreationNonExecutionOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.approvalRequestSubmissionNonExecutionOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.finalApprovalSubmissionNonExecutionOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.finalApprovalGrantNonExecutionOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(
      view.deploymentOperatingTransitionNonExecutionOutcomeCertificationItems.length > 0,
      'group 12'
    );
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('명시 승인 요청 제출 경계 결과 인증 플래그가 고정값으로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[0].input)
      );
    assert.equal(view.explicitApprovalPhraseRequired, true);
    assert.equal(view.explicitApprovalPhraseAccepted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
    assert.equal(view.actualExplicitApprovalRequestCreated, false);
    assert.equal(view.actualExplicitApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionBoundarySubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
        makeDummy391View(cases[0].input)
      );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestCreated, false);
    assert.equal(view.actualExplicitApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
    assert.equal(view.actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionBoundarySubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualDeploymentApproval, false);
    assert.equal(view.actualDeploymentExecution, false);
    assert.equal(view.actualOperatingTransition, false);
    assert.equal(view.actualNaverApiCall, false);
    assert.equal(view.actualDbWrite, false);
    assert.equal(view.actualOperatingDbConnectionChange, false);
    assert.equal(view.actualEnvReadOrWrite, false);
    assert.equal(view.actualWorkerRun, false);
    assert.equal(view.actualQueueEnqueue, false);
    assert.equal(view.actualAdapterConnection, false);
    assert.equal(view.actualRuntimeConfiguration, false);
    assert.equal(view.actualExecutionButtonAdded, false);
    assert.equal(view.actualApprovalButtonAdded, false);
    assert.equal(view.actualSubmitActionAdded, false);
    assert.equal(view.actualPostApiAdded, false);
  });

  it('입력 ViewModel의 Task 391 결과를 변경하지 않는다', () => {
    const input = makeDummy391View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
      ]
    );
  });
});
