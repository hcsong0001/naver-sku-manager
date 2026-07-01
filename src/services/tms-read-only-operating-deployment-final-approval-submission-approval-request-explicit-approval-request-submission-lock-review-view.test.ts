import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-lock-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-boundary-outcome-certification-view.service';

function makeDummy392Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceSubmissionBoundaryItemId: `source-${outcomeCertificationItemId}`,
    category: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 392 ${outcomeCertificationItemId}`,
    description: `Task 392 description ${outcomeCertificationItemId}`,
    sourceSubmissionBoundaryStatus: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY' as const,
    outcomeCertificationStatus:
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy392View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView {
  const item = makeDummy392Item('task392-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy392Item(`task392-item-${idx + 1}`)
  );

  return {
    taskId: 392,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Boundary Outcome Certification',
    sourceExplicitApprovalRequestSubmissionBoundaryStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance:
      '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.',
    explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    outcomeCertificationItems,
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems: [item],
    explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems: [item],
    explicitApprovalPhraseNonInputOutcomeCertificationItems: [item],
    explicitApprovalPhraseNonSubmissionOutcomeCertificationItems: [item],
    explicitApprovalAcceptanceNonGrantOutcomeCertificationItems: [item],
    explicitApprovalRequestCreationBoundaryOutcomeCertificationItems: [item],
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems: [item],
    approvalRequestCreationNonExecutionOutcomeCertificationItems: [item],
    approvalRequestSubmissionNonExecutionOutcomeCertificationItems: [item],
    finalApprovalSubmissionNonExecutionOutcomeCertificationItems: [item],
    finalApprovalGrantNonExecutionOutcomeCertificationItems: [item],
    deploymentOperatingTransitionNonExecutionOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems: [item],
    apiSecretUiActionPostOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItemCount: 1,
    explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItemCount: 1,
    explicitApprovalPhraseNonInputOutcomeCertificationItemCount: 1,
    explicitApprovalPhraseNonSubmissionOutcomeCertificationItemCount: 1,
    explicitApprovalAcceptanceNonGrantOutcomeCertificationItemCount: 1,
    explicitApprovalRequestCreationBoundaryOutcomeCertificationItemCount: 1,
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemCount: 1,
    approvalRequestCreationNonExecutionOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionNonExecutionOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionNonExecutionOutcomeCertificationItemCount: 1,
    finalApprovalGrantNonExecutionOutcomeCertificationItemCount: 1,
    deploymentOperatingTransitionNonExecutionOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostOutcomeCertificationItemCount: 1,
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
    actualExplicitApprovalRequestCreated: false,
    actualExplicitApprovalRequestSubmitted: false,
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
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

describe('Task 393 - Explicit Approval Request Submission Lock Review', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
    },
  ];

  it('Task 392 READY → Task 393 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
      cases[0].expected
    );
  });

  it('Task 392 PARTIAL_READY → Task 393 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
      cases[1].expected
    );
  });

  it('Task 392 BLOCKED → Task 393 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
      cases[2].expected
    );
  });

  it('Task 392 NOT_STARTED → Task 393 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus,
      cases[3].expected
    );
  });

  it('14개 Explicit Approval Request Submission Lock Review 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[0].input)
      );
    assert.ok(view.explicitApprovalRequestSubmissionLockReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.submissionBoundaryOutcomeCertificationReferenceLockReviewItems.length > 0, 'group 2');
    assert.ok(view.explicitApprovalPhraseNonInputLockReviewItems.length > 0, 'group 3');
    assert.ok(view.explicitApprovalPhraseNonSubmissionLockReviewItems.length > 0, 'group 4');
    assert.ok(view.explicitApprovalAcceptanceNonGrantLockReviewItems.length > 0, 'group 5');
    assert.ok(view.explicitApprovalRequestCreationLockReviewItems.length > 0, 'group 6');
    assert.ok(view.explicitApprovalRequestSubmissionLockReviewDetailItems.length > 0, 'group 7');
    assert.ok(view.approvalRequestCreationNonExecutionLockReviewItems.length > 0, 'group 8');
    assert.ok(view.approvalRequestSubmissionNonExecutionLockReviewItems.length > 0, 'group 9');
    assert.ok(view.finalApprovalSubmissionNonExecutionLockReviewItems.length > 0, 'group 10');
    assert.ok(view.finalApprovalGrantNonExecutionLockReviewItems.length > 0, 'group 11');
    assert.ok(view.deploymentOperatingTransitionNonExecutionLockReviewItems.length > 0, 'group 12');
    assert.ok(view.operatingDbRuntimeWorkerQueueAdapterLockReviewItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostLockReviewItems.length > 0, 'group 14');
  });

  it('명시 승인 요청 제출 Lock 검토 플래그가 고정값으로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[0].input)
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
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[0].input)
      );
    assert.equal(
      view.recommendedSubmissionLockReviewDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
        makeDummy392View(cases[0].input)
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

  it('입력 ViewModel의 Task 392 결과를 변경하지 않는다', () => {
    const input = makeDummy392View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
      ]
    );
  });
});
