import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-explicit-input-boundary-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-lock-outcome-certification-view.service';

function makeDummy398Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceLockReviewItemId: `source-${outcomeCertificationItemId}`,
    category: 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 398 ${outcomeCertificationItemId}`,
    description: `Task 398 description ${outcomeCertificationItemId}`,
    sourceLockReviewStatus: 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READY' as const,
    outcomeCertificationStatus: 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy398View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView {
  const item = makeDummy398Item('task398-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy398Item(`task398-item-${idx + 1}`)
  );

  return {
    taskId: 398,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Lock Outcome Certification',
    sourceUserApprovalPhraseLockReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 User Approval Phrase Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Lock 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    outcomeCertificationItems,
    userApprovalPhraseLockOutcomeCertificationReadinessItems: [item],
    userApprovalPhraseLockReviewReferenceOutcomeCertificationItems: [item],
    userApprovalPhraseRequiredLockOutcomeCertificationItems: [item],
    userApprovalPhraseExampleDisplayLockOutcomeCertificationItems: [item],
    userApprovalPhraseNonInputLockOutcomeCertificationItems: [item],
    userApprovalPhraseNonSubmissionLockOutcomeCertificationItems: [item],
    userApprovalAcceptanceNonGrantLockOutcomeCertificationItems: [item],
    explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems: [item],
    explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems: [item],
    finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems: [item],
    finalApprovalGrantNonExecutionLockOutcomeCertificationItems: [item],
    deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems: [item],
    apiSecretUiActionPostLockOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    userApprovalPhraseLockOutcomeCertificationReadinessItemCount: 1,
    userApprovalPhraseLockReviewReferenceOutcomeCertificationItemCount: 1,
    userApprovalPhraseRequiredLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseExampleDisplayLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseNonInputLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseNonSubmissionLockOutcomeCertificationItemCount: 1,
    userApprovalAcceptanceNonGrantLockOutcomeCertificationItemCount: 1,
    explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItemCount: 1,
    explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionNonExecutionLockOutcomeCertificationItemCount: 1,
    finalApprovalGrantNonExecutionLockOutcomeCertificationItemCount: 1,
    deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostLockOutcomeCertificationItemCount: 1,
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
    actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseLockReviewSubmitted: false,
    actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false,
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
    actualSubmissionPreApprovalLockGranted: false,
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

describe('Task 399 - User Approval Phrase Explicit Input Boundary', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED',
    },
  ];

  it('Task 398 READY → Task 399 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
      cases[0].expected
    );
  });

  it('Task 398 PARTIAL_READY → Task 399 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
      cases[1].expected
    );
  });

  it('Task 398 BLOCKED → Task 399 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
      cases[2].expected
    );
  });

  it('Task 398 NOT_STARTED → Task 399 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryStatus,
      cases[3].expected
    );
  });

  it('14개 User Approval Phrase Explicit Input Boundary 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[0].input)
      );
    assert.ok(view.userApprovalPhraseExplicitInputBoundaryReadinessItems.length > 0, 'group 1');
    assert.ok(view.userApprovalPhraseLockOutcomeCertificationReferenceExplicitInputBoundaryItems.length > 0, 'group 2');
    assert.ok(view.userApprovalPhraseRequiredExplicitInputBoundaryItems.length > 0, 'group 3');
    assert.ok(view.userApprovalPhraseExampleDisplayExplicitInputBoundaryItems.length > 0, 'group 4');
    assert.ok(view.userApprovalPhraseInputUiNonAdditionBoundaryItems.length > 0, 'group 5');
    assert.ok(view.userApprovalPhraseInputNonExecutionBoundaryItems.length > 0, 'group 6');
    assert.ok(view.userApprovalPhraseSubmissionNonExecutionBoundaryItems.length > 0, 'group 7');
    assert.ok(view.userApprovalAcceptanceNonGrantExplicitInputBoundaryItems.length > 0, 'group 8');
    assert.ok(view.explicitApprovalRequestCreationNonExecutionExplicitInputBoundaryItems.length > 0, 'group 9');
    assert.ok(view.explicitApprovalRequestSubmissionNonExecutionExplicitInputBoundaryItems.length > 0, 'group 10');
    assert.ok(view.finalApprovalSubmissionNonExecutionExplicitInputBoundaryItems.length > 0, 'group 11');
    assert.ok(view.deploymentOperatingTransitionNonExecutionExplicitInputBoundaryItems.length > 0, 'group 12');
    assert.ok(view.operatingDbRuntimeWorkerQueueAdapterExplicitInputBoundaryItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostExplicitInputBoundaryItems.length > 0, 'group 14');
  });

  it('승인 문구 Explicit Input Boundary 플래그와 예시가 read-only로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[0].input)
      );
    assert.equal(view.explicitApprovalPhraseRequired, true);
    assert.equal(view.explicitApprovalPhraseAccepted, false);
    assert.match(view.userApprovalPhraseGuidance, /read-only/);
    assert.match(view.userApprovalPhraseGuidance, /Explicit Input Boundary/);
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
    assert.equal(view.actualUserApprovalPhraseLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualUserApprovalPhraseExplicitInputBoundarySubmitted, false);
    assert.equal(view.actualUserApprovalPhraseInputAddedToUi, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[0].input)
      );
    assert.equal(
      view.recommendedUserApprovalPhraseExplicitInputBoundaryDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_OUTCOME_CERTIFICATION'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
        makeDummy398View(cases[0].input)
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
    assert.equal(view.actualUserApprovalPhraseLockReviewSubmitted, false);
    assert.equal(view.actualUserApprovalPhraseLockOutcomeCertificationSubmitted, false);
    assert.equal(view.actualUserApprovalPhraseExplicitInputBoundarySubmitted, false);
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

  it('입력 ViewModel의 Task 398 결과를 변경하지 않는다', () => {
    const input = makeDummy398View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseExplicitInputBoundaryView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY_NOT_STARTED',
      ]
    );
  });
});
