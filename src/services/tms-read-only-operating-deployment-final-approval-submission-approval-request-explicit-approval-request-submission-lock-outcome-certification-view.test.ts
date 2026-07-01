import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-lock-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-lock-review-view.service';

function makeDummy393Item(lockReviewItemId: string) {
  return {
    lockReviewItemId,
    sourceOutcomeCertificationItemId: `source-${lockReviewItemId}`,
    category: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS' as const,
    label: `Task 393 ${lockReviewItemId}`,
    description: `Task 393 description ${lockReviewItemId}`,
    sourceOutcomeCertificationStatus:
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    submissionLockReviewStatus: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy393View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView {
  const item = makeDummy393Item('task393-item-1');
  const submissionLockReviewItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy393Item(`task393-item-${idx + 1}`)
  );

  return {
    taskId: 393,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Lock Review',
    sourceExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus:
      status,
    recommendedSubmissionLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSubmissionLockReviewDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Lock Review - read-only 명시 승인 요청 제출 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance:
      '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.',
    explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    submissionLockReviewItems,
    explicitApprovalRequestSubmissionLockReviewReadinessItems: [item],
    submissionBoundaryOutcomeCertificationReferenceLockReviewItems: [item],
    explicitApprovalPhraseNonInputLockReviewItems: [item],
    explicitApprovalPhraseNonSubmissionLockReviewItems: [item],
    explicitApprovalAcceptanceNonGrantLockReviewItems: [item],
    explicitApprovalRequestCreationLockReviewItems: [item],
    explicitApprovalRequestSubmissionLockReviewDetailItems: [item],
    approvalRequestCreationNonExecutionLockReviewItems: [item],
    approvalRequestSubmissionNonExecutionLockReviewItems: [item],
    finalApprovalSubmissionNonExecutionLockReviewItems: [item],
    finalApprovalGrantNonExecutionLockReviewItems: [item],
    deploymentOperatingTransitionNonExecutionLockReviewItems: [item],
    operatingDbRuntimeWorkerQueueAdapterLockReviewItems: [item],
    apiSecretUiActionPostLockReviewItems: [item],
    submissionLockReviewSummaryCards: [],
    readySubmissionLockReviewItems: submissionLockReviewItems,
    partialReadySubmissionLockReviewItems: [],
    blockedSubmissionLockReviewItems: [],
    notStartedSubmissionLockReviewItems: [],
    explicitApprovalRequestSubmissionLockReviewReadinessItemCount: 1,
    submissionBoundaryOutcomeCertificationReferenceLockReviewItemCount: 1,
    explicitApprovalPhraseNonInputLockReviewItemCount: 1,
    explicitApprovalPhraseNonSubmissionLockReviewItemCount: 1,
    explicitApprovalAcceptanceNonGrantLockReviewItemCount: 1,
    explicitApprovalRequestCreationLockReviewItemCount: 1,
    explicitApprovalRequestSubmissionLockReviewDetailItemCount: 1,
    approvalRequestCreationNonExecutionLockReviewItemCount: 1,
    approvalRequestSubmissionNonExecutionLockReviewItemCount: 1,
    finalApprovalSubmissionNonExecutionLockReviewItemCount: 1,
    finalApprovalGrantNonExecutionLockReviewItemCount: 1,
    deploymentOperatingTransitionNonExecutionLockReviewItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterLockReviewItemCount: 1,
    apiSecretUiActionPostLockReviewItemCount: 1,
    readyItemCount: submissionLockReviewItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalSubmissionLockReviewItemCount: submissionLockReviewItems.length,
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
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
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

describe('Task 394 - Explicit Approval Request Submission Lock Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 393 READY → Task 394 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 393 PARTIAL_READY → Task 394 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 393 BLOCKED → Task 394 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 393 NOT_STARTED → Task 394 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Explicit Approval Request Submission Lock Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[0].input)
      );
    assert.ok(view.explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(view.explicitApprovalPhraseNonInputLockOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(view.explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.explicitApprovalRequestCreationLockOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.explicitApprovalRequestSubmissionLockOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.approvalRequestCreationNonExecutionLockOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.approvalRequestSubmissionNonExecutionLockOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.finalApprovalGrantNonExecutionLockOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(view.operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostLockOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('명시 승인 요청 제출 Lock 결과 인증 플래그가 고정값으로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[0].input)
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
    assert.equal(view.actualExplicitApprovalRequestSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
        makeDummy393View(cases[0].input)
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
    assert.equal(view.actualExplicitApprovalRequestSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted, false);
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

  it('입력 ViewModel의 Task 393 결과를 변경하지 않는다', () => {
    const input = makeDummy393View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED',
      ]
    );
  });
});
