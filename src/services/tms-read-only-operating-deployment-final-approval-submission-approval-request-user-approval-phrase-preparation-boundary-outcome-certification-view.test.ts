import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-preparation-boundary-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-preparation-boundary-view.service';

function makeDummy395Item(preparationBoundaryItemId: string) {
  return {
    preparationBoundaryItemId,
    sourceOutcomeCertificationItemId: `source-${preparationBoundaryItemId}`,
    category: 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READINESS' as const,
    label: `Task 395 ${preparationBoundaryItemId}`,
    description: `Task 395 description ${preparationBoundaryItemId}`,
    sourceOutcomeCertificationStatus:
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY' as const,
    preparationBoundaryStatus: 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy395View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView {
  const item = makeDummy395Item('task395-item-1');
  const preparationBoundaryItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy395Item(`task395-item-${idx + 1}`)
  );

  return {
    taskId: 395,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Preparation Boundary',
    sourceExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus:
      status,
    recommendedUserApprovalPhrasePreparationBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_ONLY',
    recommendedUserApprovalPhrasePreparationBoundaryDecisionLabel:
      '최종 승인 제출 User Approval Phrase Preparation Boundary - read-only 사용자 승인 문구 준비 경계 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 준비 경계 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 표시만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    userApprovalPhrasePreparationBoundaryItems: preparationBoundaryItems,
    userApprovalPhrasePreparationBoundaryReadinessItems: [item],
    submissionLockOutcomeCertificationReferencePreparationBoundaryItems: [item],
    userApprovalPhraseRequiredPreparationBoundaryItems: [item],
    userApprovalPhraseExampleDisplayPreparationBoundaryItems: [item],
    userApprovalPhraseNonInputPreparationBoundaryItems: [item],
    userApprovalPhraseNonSubmissionPreparationBoundaryItems: [item],
    userApprovalAcceptanceNonGrantPreparationBoundaryItems: [item],
    explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems: [item],
    explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems: [item],
    finalApprovalSubmissionNonExecutionPreparationBoundaryItems: [item],
    finalApprovalGrantNonExecutionPreparationBoundaryItems: [item],
    deploymentOperatingTransitionNonExecutionPreparationBoundaryItems: [item],
    operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems: [item],
    apiSecretUiActionPostPreparationBoundaryItems: [item],
    userApprovalPhrasePreparationBoundarySummaryCards: [],
    readyUserApprovalPhrasePreparationBoundaryItems: preparationBoundaryItems,
    partialReadyUserApprovalPhrasePreparationBoundaryItems: [],
    blockedUserApprovalPhrasePreparationBoundaryItems: [],
    notStartedUserApprovalPhrasePreparationBoundaryItems: [],
    userApprovalPhrasePreparationBoundaryReadinessItemCount: 1,
    submissionLockOutcomeCertificationReferencePreparationBoundaryItemCount: 1,
    userApprovalPhraseRequiredPreparationBoundaryItemCount: 1,
    userApprovalPhraseExampleDisplayPreparationBoundaryItemCount: 1,
    userApprovalPhraseNonInputPreparationBoundaryItemCount: 1,
    userApprovalPhraseNonSubmissionPreparationBoundaryItemCount: 1,
    userApprovalAcceptanceNonGrantPreparationBoundaryItemCount: 1,
    explicitApprovalRequestCreationNonExecutionPreparationBoundaryItemCount: 1,
    explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItemCount: 1,
    finalApprovalSubmissionNonExecutionPreparationBoundaryItemCount: 1,
    finalApprovalGrantNonExecutionPreparationBoundaryItemCount: 1,
    deploymentOperatingTransitionNonExecutionPreparationBoundaryItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItemCount: 1,
    apiSecretUiActionPostPreparationBoundaryItemCount: 1,
    readyItemCount: preparationBoundaryItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalUserApprovalPhrasePreparationBoundaryItemCount: preparationBoundaryItems.length,
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
    actualUserApprovalPhraseInputAdded: false,
    actualUserApprovalPhraseSubmitted: false,
    actualUserApprovalPhraseAccepted: false,
    actualUserApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhrasePreparationBoundarySubmitted: false,
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
    actualUserApprovalPhraseInputAddedToUi: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}

describe('Task 396 - User Approval Phrase Preparation Boundary Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 395 READY → Task 396 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 395 PARTIAL_READY → Task 396 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 395 BLOCKED → Task 396 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 395 NOT_STARTED → Task 396 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 User Approval Phrase Preparation Boundary Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[0].input)
      );
    assert.ok(view.userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(view.userApprovalPhraseRequiredOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(view.userApprovalPhraseExampleDisplayOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.userApprovalPhraseNonInputOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.userApprovalPhraseNonSubmissionOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.userApprovalAcceptanceNonGrantOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.finalApprovalSubmissionNonExecutionOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.finalApprovalGrantNonExecutionOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.deploymentOperatingTransitionNonExecutionOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(view.operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('승인 문구 준비 결과 인증 플래그와 예시가 read-only로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[0].input)
      );
    assert.equal(view.explicitApprovalPhraseRequired, true);
    assert.equal(view.explicitApprovalPhraseAccepted, false);
    assert.match(view.userApprovalPhraseGuidance, /read-only/);
    assert.match(view.userApprovalPhraseGuidance, /결과 인증/);
    assert.equal(view.userApprovalPhraseExample, 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.');
    assert.equal(view.actualUserApprovalPhraseInputAdded, false);
    assert.equal(view.actualUserApprovalPhraseSubmitted, false);
    assert.equal(view.actualUserApprovalPhraseAccepted, false);
    assert.equal(view.actualUserApprovalGranted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
    assert.equal(view.actualExplicitApprovalRequestCreated, false);
    assert.equal(view.actualExplicitApprovalRequestSubmitted, false);
    assert.equal(view.actualUserApprovalPhrasePreparationBoundarySubmitted, false);
    assert.equal(view.actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
        makeDummy395View(cases[0].input)
      );
    assert.equal(view.actualApprovalRequestCreated, false);
    assert.equal(view.actualApprovalRequestReviewedAsSubmission, false);
    assert.equal(view.actualApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestCreated, false);
    assert.equal(view.actualExplicitApprovalRequestSubmitted, false);
    assert.equal(view.actualExplicitApprovalPhraseInputAdded, false);
    assert.equal(view.actualExplicitApprovalPhraseSubmitted, false);
    assert.equal(view.actualExplicitApprovalGranted, false);
    assert.equal(view.actualUserApprovalPhraseInputAdded, false);
    assert.equal(view.actualUserApprovalPhraseSubmitted, false);
    assert.equal(view.actualUserApprovalPhraseAccepted, false);
    assert.equal(view.actualUserApprovalGranted, false);
    assert.equal(view.actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionBoundarySubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionLockReviewSubmitted, false);
    assert.equal(view.actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualUserApprovalPhrasePreparationBoundarySubmitted, false);
    assert.equal(view.actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted, false);
    assert.equal(view.actualFinalApprovalSubmission, false);
    assert.equal(view.actualFinalApprovalGrant, false);
    assert.equal(view.actualDeploymentApproval, false);
    assert.equal(view.actualDeploymentExecution, false);
    assert.equal(view.actualOperatingTransition, false);
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
    assert.equal(view.actualVpsCreation, false);
    assert.equal(view.actualDomainConnection, false);
    assert.equal(view.actualDnsChange, false);
    assert.equal(view.actualSslCertificateIssue, false);
    assert.equal(view.actualExecutionButtonAdded, false);
    assert.equal(view.actualApprovalButtonAdded, false);
    assert.equal(view.actualUserApprovalPhraseInputAddedToUi, false);
    assert.equal(view.actualSubmitActionAdded, false);
    assert.equal(view.actualPostApiAdded, false);
    assert.equal(view.actualSubmissionPreApprovalLockGranted, false);
  });

  it('입력 ViewModel의 Task 395 결과를 변경하지 않는다', () => {
    const input = makeDummy395View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED',
      ]
    );
  });
});
