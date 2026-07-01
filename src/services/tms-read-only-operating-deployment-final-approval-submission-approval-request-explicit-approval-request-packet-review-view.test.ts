import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-view.service';

function makeDummy388Item(packetItemId: string) {
  return {
    packetItemId,
    sourceOutcomeCertificationItemId: `source-${packetItemId}`,
    category: 'EXPLICIT_APPROVAL_REQUEST_PACKET_READINESS' as const,
    label: `Task 388 ${packetItemId}`,
    description: `Task 388 description ${packetItemId}`,
    sourceOutcomeCertificationStatus: 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY' as const,
    packetStatus: 'EXPLICIT_APPROVAL_REQUEST_PACKET_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy388View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView {
  const item = makeDummy388Item('task388-item-1');
  const packetItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy388Item(`task388-item-${idx + 1}`)
  );

  return {
    taskId: 388,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Packet',
    sourceSubmissionPreApprovalLockOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus:
      status,
    recommendedExplicitApprovalRequestPacketDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY',
    recommendedExplicitApprovalRequestPacketDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Packet - read-only 명시 승인 요청 패킷 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance:
      '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.',
    explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    packetItems,
    explicitApprovalRequestPacketReadinessItems: [item],
    preApprovalLockOutcomeCertificationReferencePacketItems: [item],
    approvalRequestScopePacketItems: [item],
    explicitUserApprovalPhrasePacketItems: [item],
    approvalRequestCreationNonExecutionPacketItems: [item],
    approvalRequestSubmissionNonExecutionPacketItems: [item],
    finalApprovalSubmissionNonExecutionPacketItems: [item],
    finalApprovalGrantNonExecutionPacketItems: [item],
    deploymentApprovalNonExecutionPacketItems: [item],
    deploymentExecutionNonExecutionPacketItems: [item],
    operatingTransitionNonExecutionPacketItems: [item],
    infrastructureDomainDnsHttpsNonExecutionPacketItems: [item],
    operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems: [item],
    apiSecretUiActionPostNonExecutionPacketItems: [item],
    packetSummaryCards: [],
    readyPacketItems: packetItems,
    partialReadyPacketItems: [],
    blockedPacketItems: [],
    notStartedPacketItems: [],
    explicitApprovalRequestPacketReadinessItemCount: 1,
    preApprovalLockOutcomeCertificationReferencePacketItemCount: 1,
    approvalRequestScopePacketItemCount: 1,
    explicitUserApprovalPhrasePacketItemCount: 1,
    approvalRequestCreationNonExecutionPacketItemCount: 1,
    approvalRequestSubmissionNonExecutionPacketItemCount: 1,
    finalApprovalSubmissionNonExecutionPacketItemCount: 1,
    finalApprovalGrantNonExecutionPacketItemCount: 1,
    deploymentApprovalNonExecutionPacketItemCount: 1,
    deploymentExecutionNonExecutionPacketItemCount: 1,
    operatingTransitionNonExecutionPacketItemCount: 1,
    infrastructureDomainDnsHttpsNonExecutionPacketItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItemCount: 1,
    apiSecretUiActionPostNonExecutionPacketItemCount: 1,
    readyItemCount: packetItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalPacketItemCount: packetItems.length,
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
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}

describe('Task 389 - Explicit Approval Request Packet Review', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
    },
  ];

  it('Task 388 READY → Task 389 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
      cases[0].expected
    );
  });

  it('Task 388 PARTIAL_READY → Task 389 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
      cases[1].expected
    );
  });

  it('Task 388 BLOCKED → Task 389 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
      cases[2].expected
    );
  });

  it('Task 388 NOT_STARTED → Task 389 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
      cases[3].expected
    );
  });

  it('14개 Explicit Approval Request Packet Review 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[0].input)
      );
    assert.ok(view.explicitApprovalRequestPacketReviewReadinessItems.length > 0, 'group 1');
    assert.ok(view.explicitApprovalRequestPacketReferenceReviewItems.length > 0, 'group 2');
    assert.ok(view.explicitApprovalPhraseGuidanceReviewItems.length > 0, 'group 3');
    assert.ok(view.explicitApprovalPhraseNonAcceptanceReviewItems.length > 0, 'group 4');
    assert.ok(view.approvalRequestCreationNonExecutionReviewItems.length > 0, 'group 5');
    assert.ok(view.approvalRequestSubmissionNonExecutionReviewItems.length > 0, 'group 6');
    assert.ok(view.finalApprovalSubmissionNonExecutionReviewItems.length > 0, 'group 7');
    assert.ok(view.finalApprovalGrantNonExecutionReviewItems.length > 0, 'group 8');
    assert.ok(view.deploymentApprovalNonExecutionReviewItems.length > 0, 'group 9');
    assert.ok(view.deploymentExecutionNonExecutionReviewItems.length > 0, 'group 10');
    assert.ok(view.operatingTransitionNonExecutionReviewItems.length > 0, 'group 11');
    assert.ok(view.infrastructureDomainDnsHttpsNonExecutionReviewItems.length > 0, 'group 12');
    assert.ok(
      view.operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems.length > 0,
      'group 13'
    );
    assert.ok(view.apiSecretUiActionPostNonExecutionReviewItems.length > 0, 'group 14');
  });

  it('명시 승인 문구 검토 플래그가 고정값으로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[0].input)
      );
    assert.equal(view.explicitApprovalPhraseRequired, true);
    assert.equal(view.explicitApprovalPhraseAccepted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[0].input)
      );
    assert.equal(
      view.recommendedExplicitApprovalRequestPacketReviewDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(view.recommendedDeploymentMode, 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY');
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
        makeDummy388View(cases[0].input)
      );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestCreated, false);
    assert.equal(view.actualExplicitApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
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
    assert.equal(view.actualApprovalButtonAdded, false);
    assert.equal(view.actualSubmitActionAdded, false);
    assert.equal(view.actualPostApiAdded, false);
  });

  it('입력 ViewModel의 Task 388 결과를 변경하지 않는다', () => {
    const input = makeDummy388View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
      ]
    );
  });
});
