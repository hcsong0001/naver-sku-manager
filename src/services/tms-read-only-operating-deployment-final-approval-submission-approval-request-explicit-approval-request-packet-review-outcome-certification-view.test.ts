import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-review-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-review-view.service';

function makeDummy389Item(packetReviewItemId: string) {
  return {
    packetReviewItemId,
    sourcePacketItemId: `source-${packetReviewItemId}`,
    category: 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READINESS' as const,
    label: `Task 389 ${packetReviewItemId}`,
    description: `Task 389 description ${packetReviewItemId}`,
    sourcePacketStatus: 'EXPLICIT_APPROVAL_REQUEST_PACKET_READY' as const,
    packetReviewStatus: 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy389View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView {
  const item = makeDummy389Item('task389-item-1');
  const packetReviewItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy389Item(`task389-item-${idx + 1}`)
  );

  return {
    taskId: 389,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Packet Review',
    sourceExplicitApprovalRequestPacketStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus:
      status,
    recommendedExplicitApprovalRequestPacketReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY',
    recommendedExplicitApprovalRequestPacketReviewDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Packet Review - read-only 명시 승인 요청 패킷 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance:
      '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.',
    explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    packetReviewItems,
    explicitApprovalRequestPacketReviewReadinessItems: [item],
    explicitApprovalRequestPacketReferenceReviewItems: [item],
    explicitApprovalPhraseGuidanceReviewItems: [item],
    explicitApprovalPhraseNonAcceptanceReviewItems: [item],
    approvalRequestCreationNonExecutionReviewItems: [item],
    approvalRequestSubmissionNonExecutionReviewItems: [item],
    finalApprovalSubmissionNonExecutionReviewItems: [item],
    finalApprovalGrantNonExecutionReviewItems: [item],
    deploymentApprovalNonExecutionReviewItems: [item],
    deploymentExecutionNonExecutionReviewItems: [item],
    operatingTransitionNonExecutionReviewItems: [item],
    infrastructureDomainDnsHttpsNonExecutionReviewItems: [item],
    operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems: [item],
    apiSecretUiActionPostNonExecutionReviewItems: [item],
    packetReviewSummaryCards: [],
    readyPacketReviewItems: packetReviewItems,
    partialReadyPacketReviewItems: [],
    blockedPacketReviewItems: [],
    notStartedPacketReviewItems: [],
    explicitApprovalRequestPacketReviewReadinessItemCount: 1,
    explicitApprovalRequestPacketReferenceReviewItemCount: 1,
    explicitApprovalPhraseGuidanceReviewItemCount: 1,
    explicitApprovalPhraseNonAcceptanceReviewItemCount: 1,
    approvalRequestCreationNonExecutionReviewItemCount: 1,
    approvalRequestSubmissionNonExecutionReviewItemCount: 1,
    finalApprovalSubmissionNonExecutionReviewItemCount: 1,
    finalApprovalGrantNonExecutionReviewItemCount: 1,
    deploymentApprovalNonExecutionReviewItemCount: 1,
    deploymentExecutionNonExecutionReviewItemCount: 1,
    operatingTransitionNonExecutionReviewItemCount: 1,
    infrastructureDomainDnsHttpsNonExecutionReviewItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItemCount: 1,
    apiSecretUiActionPostNonExecutionReviewItemCount: 1,
    readyItemCount: packetReviewItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalPacketReviewItemCount: packetReviewItems.length,
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

describe('Task 390 - Explicit Approval Request Packet Review Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 389 READY → Task 390 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 389 PARTIAL_READY → Task 390 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 389 BLOCKED → Task 390 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 389 NOT_STARTED → Task 390 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 Explicit Approval Request Packet Review Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[0].input)
      );
    assert.ok(
      view.explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems.length > 0,
      'group 1'
    );
    assert.ok(
      view.explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems.length > 0,
      'group 2'
    );
    assert.ok(view.explicitApprovalPhraseGuidanceOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(
      view.explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems.length > 0,
      'group 4'
    );
    assert.ok(view.approvalRequestCreationNonExecutionOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionNonExecutionOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionNonExecutionOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantNonExecutionOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalNonExecutionOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionNonExecutionOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionNonExecutionOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(
      view.infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems.length > 0,
      'group 12'
    );
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostNonExecutionOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('명시 승인 문구 결과 인증 플래그가 고정값으로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[0].input)
      );
    assert.equal(view.explicitApprovalPhraseRequired, true);
    assert.equal(view.explicitApprovalPhraseAccepted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
        makeDummy389View(cases[0].input)
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

  it('입력 ViewModel의 Task 389 결과를 변경하지 않는다', () => {
    const input = makeDummy389View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
      ]
    );
  });
});
