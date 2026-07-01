import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-lock-outcome-certification-view.service';

function makeDummy387Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceLockReviewItemId: `source-${outcomeCertificationItemId}`,
    category: 'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 387 ${outcomeCertificationItemId}`,
    description: `Task 387 description ${outcomeCertificationItemId}`,
    sourceLockReviewStatus: 'PRE_APPROVAL_LOCK_REVIEW_READY' as const,
    outcomeCertificationStatus: 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy387View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView {
  const item = makeDummy387Item('task387-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy387Item(`task387-item-${idx + 1}`)
  );

  return {
    taskId: 387,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Lock Outcome Certification',
    sourceSubmissionPreApprovalLockReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    submissionPreApprovalLockOutcomeCertificationReadinessItems: [item],
    submissionPreApprovalLockReviewOutcomeCertificationItems: [item],
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems: [item],
    approvalRequestCreationPreApprovalLockOutcomeCertificationItems: [item],
    approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems: [item],
    approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems: [item],
    preApprovalGrantLockOutcomeCertificationItems: [item],
    finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems: [item],
    finalApprovalGrantPreApprovalLockOutcomeCertificationItems: [item],
    deploymentApprovalPreApprovalLockOutcomeCertificationItems: [item],
    deploymentExecutionPreApprovalLockOutcomeCertificationItems: [item],
    operatingTransitionPreApprovalLockOutcomeCertificationItems: [item],
    infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems: [item],
    apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    submissionPreApprovalLockOutcomeCertificationReadinessItemCount: 1,
    submissionPreApprovalLockReviewOutcomeCertificationItemCount: 1,
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItemCount: 1,
    approvalRequestCreationPreApprovalLockOutcomeCertificationItemCount: 1,
    approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItemCount: 1,
    approvalRequestSubmissionPreApprovalLockOutcomeCertificationItemCount: 1,
    preApprovalGrantLockOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionPreApprovalLockOutcomeCertificationItemCount: 1,
    finalApprovalGrantPreApprovalLockOutcomeCertificationItemCount: 1,
    deploymentApprovalPreApprovalLockOutcomeCertificationItemCount: 1,
    deploymentExecutionPreApprovalLockOutcomeCertificationItemCount: 1,
    operatingTransitionPreApprovalLockOutcomeCertificationItemCount: 1,
    infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostPreApprovalLockOutcomeCertificationItemCount: 1,
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
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}

describe('Task 388 - Explicit Approval Request Packet', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED',
    },
  ];

  it('Task 387 READY → Task 388 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
      cases[0].expected
    );
  });

  it('Task 387 PARTIAL_READY → Task 388 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
      cases[1].expected
    );
  });

  it('Task 387 BLOCKED → Task 388 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
      cases[2].expected
    );
  });

  it('Task 387 NOT_STARTED → Task 388 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
      cases[3].expected
    );
  });

  it('14개 Explicit Approval Request Packet 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[0].input)
      );
    assert.ok(view.explicitApprovalRequestPacketReadinessItems.length > 0, 'group 1');
    assert.ok(view.preApprovalLockOutcomeCertificationReferencePacketItems.length > 0, 'group 2');
    assert.ok(view.approvalRequestScopePacketItems.length > 0, 'group 3');
    assert.ok(view.explicitUserApprovalPhrasePacketItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestCreationNonExecutionPacketItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionNonExecutionPacketItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionNonExecutionPacketItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantNonExecutionPacketItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalNonExecutionPacketItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionNonExecutionPacketItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionNonExecutionPacketItems.length > 0, 'group 11');
    assert.ok(view.infrastructureDomainDnsHttpsNonExecutionPacketItems.length > 0, 'group 12');
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostNonExecutionPacketItems.length > 0, 'group 14');
  });

  it('명시 승인 문구 플래그가 고정값으로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[0].input)
      );
    assert.equal(view.explicitApprovalPhraseRequired, true);
    assert.equal(view.explicitApprovalPhraseAccepted, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
    assert.match(view.explicitApprovalPhraseGuidance, /read-only Packet/);
    assert.match(view.explicitApprovalPhraseExample, /TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다/);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[0].input)
      );
    assert.equal(
      view.recommendedExplicitApprovalRequestPacketDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
        makeDummy387View(cases[0].input)
      );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestCreated, false);
    assert.equal(view.actualExplicitApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
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
    assert.equal(view.actualSubmitActionAdded, false);
    assert.equal(view.actualPostApiAdded, false);
  });

  it('입력 ViewModel의 Task 387 결과를 변경하지 않는다', () => {
    const input = makeDummy387View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED',
      ]
    );
  });
});
