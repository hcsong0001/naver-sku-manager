import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-lock-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-lock-review-view.service';

function makeDummy397Item(lockReviewItemId: string) {
  return {
    lockReviewItemId,
    sourceOutcomeCertificationItemId: `source-${lockReviewItemId}`,
    category: 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READINESS' as const,
    label: `Task 397 ${lockReviewItemId}`,
    description: `Task 397 description ${lockReviewItemId}`,
    sourceOutcomeCertificationStatus:
      'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY' as const,
    userApprovalPhraseLockReviewStatus: 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy397View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView {
  const item = makeDummy397Item('task397-item-1');
  const lockReviewItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy397Item(`task397-item-${idx + 1}`)
  );

  return {
    taskId: 397,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Lock Review',
    sourceUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus:
      status,
    recommendedUserApprovalPhraseLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_ONLY',
    recommendedUserApprovalPhraseLockReviewDecisionLabel:
      '최종 승인 제출 User Approval Phrase Lock Review - read-only 사용자 승인 문구 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Lock Review 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 검토만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    userApprovalPhraseLockReviewItems: lockReviewItems,
    userApprovalPhraseLockReviewReadinessItems: [item],
    userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems: [item],
    userApprovalPhraseRequiredLockReviewItems: [item],
    userApprovalPhraseExampleDisplayLockReviewItems: [item],
    userApprovalPhraseNonInputLockReviewItems: [item],
    userApprovalPhraseNonSubmissionLockReviewItems: [item],
    userApprovalAcceptanceNonGrantLockReviewItems: [item],
    explicitApprovalRequestCreationNonExecutionLockReviewItems: [item],
    explicitApprovalRequestSubmissionNonExecutionLockReviewItems: [item],
    finalApprovalSubmissionNonExecutionLockReviewItems: [item],
    finalApprovalGrantNonExecutionLockReviewItems: [item],
    deploymentOperatingTransitionNonExecutionLockReviewItems: [item],
    operatingDbRuntimeWorkerQueueAdapterLockReviewItems: [item],
    apiSecretUiActionPostLockReviewItems: [item],
    userApprovalPhraseLockReviewSummaryCards: [],
    readyUserApprovalPhraseLockReviewItems: lockReviewItems,
    partialReadyUserApprovalPhraseLockReviewItems: [],
    blockedUserApprovalPhraseLockReviewItems: [],
    notStartedUserApprovalPhraseLockReviewItems: [],
    userApprovalPhraseLockReviewReadinessItemCount: 1,
    userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItemCount: 1,
    userApprovalPhraseRequiredLockReviewItemCount: 1,
    userApprovalPhraseExampleDisplayLockReviewItemCount: 1,
    userApprovalPhraseNonInputLockReviewItemCount: 1,
    userApprovalPhraseNonSubmissionLockReviewItemCount: 1,
    userApprovalAcceptanceNonGrantLockReviewItemCount: 1,
    explicitApprovalRequestCreationNonExecutionLockReviewItemCount: 1,
    explicitApprovalRequestSubmissionNonExecutionLockReviewItemCount: 1,
    finalApprovalSubmissionNonExecutionLockReviewItemCount: 1,
    finalApprovalGrantNonExecutionLockReviewItemCount: 1,
    deploymentOperatingTransitionNonExecutionLockReviewItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterLockReviewItemCount: 1,
    apiSecretUiActionPostLockReviewItemCount: 1,
    readyItemCount: lockReviewItems.length,
    partialReadyItemCount: 0,
    blockedItemCount: 0,
    notStartedItemCount: 0,
    totalUserApprovalPhraseLockReviewItemCount: lockReviewItems.length,
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

describe('Task 398 - User Approval Phrase Lock Outcome Certification', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus;
    expected: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED',
      expected:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED',
    },
  ];

  it('Task 397 READY → Task 398 READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[0].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
      cases[0].expected
    );
  });

  it('Task 397 PARTIAL_READY → Task 398 PARTIAL_READY', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[1].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
      cases[1].expected
    );
  });

  it('Task 397 BLOCKED → Task 398 BLOCKED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[2].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
      cases[2].expected
    );
  });

  it('Task 397 NOT_STARTED → Task 398 NOT_STARTED', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[3].input)
      );
    assert.equal(
      view.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationStatus,
      cases[3].expected
    );
  });

  it('14개 User Approval Phrase Lock Outcome Certification 그룹이 모두 생성된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[0].input)
      );
    assert.ok(view.userApprovalPhraseLockOutcomeCertificationReadinessItems.length > 0, 'group 1');
    assert.ok(view.userApprovalPhraseLockReviewReferenceOutcomeCertificationItems.length > 0, 'group 2');
    assert.ok(view.userApprovalPhraseRequiredLockOutcomeCertificationItems.length > 0, 'group 3');
    assert.ok(view.userApprovalPhraseExampleDisplayLockOutcomeCertificationItems.length > 0, 'group 4');
    assert.ok(view.userApprovalPhraseNonInputLockOutcomeCertificationItems.length > 0, 'group 5');
    assert.ok(view.userApprovalPhraseNonSubmissionLockOutcomeCertificationItems.length > 0, 'group 6');
    assert.ok(view.userApprovalAcceptanceNonGrantLockOutcomeCertificationItems.length > 0, 'group 7');
    assert.ok(view.explicitApprovalRequestCreationNonExecutionLockOutcomeCertificationItems.length > 0, 'group 8');
    assert.ok(view.explicitApprovalRequestSubmissionNonExecutionLockOutcomeCertificationItems.length > 0, 'group 9');
    assert.ok(view.finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems.length > 0, 'group 10');
    assert.ok(view.finalApprovalGrantNonExecutionLockOutcomeCertificationItems.length > 0, 'group 11');
    assert.ok(view.deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems.length > 0, 'group 12');
    assert.ok(view.operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems.length > 0, 'group 13');
    assert.ok(view.apiSecretUiActionPostLockOutcomeCertificationItems.length > 0, 'group 14');
  });

  it('승인 문구 Lock 결과 인증 플래그와 예시가 read-only로 유지된다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[0].input)
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
    assert.equal(view.actualUserApprovalPhraseLockReviewSubmitted, false);
    assert.equal(view.actualUserApprovalPhraseLockOutcomeCertificationSubmitted, false);
  });

  it('추천값들이 정확하다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[0].input)
      );
    assert.equal(
      view.recommendedOutcomeCertificationDecision,
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(
      view.recommendedNextStep,
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_EXPLICIT_INPUT_BOUNDARY'
    );
    assert.equal(view.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.equal(view.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.equal(
      view.recommendedDeploymentMode,
      'USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION_ONLY'
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('실제 승인/제출/배포/API/DB/env/worker/queue/adapter/runtime/button/POST 플래그가 모두 false다', () => {
    const view =
      buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
        makeDummy397View(cases[0].input)
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

  it('입력 ViewModel의 Task 397 결과를 변경하지 않는다', () => {
    const input = makeDummy397View(cases[0].input);
    const sourceStatusBefore =
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus;

    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockOutcomeCertificationView(
      input
    );

    assert.equal(
      input.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus,
      sourceStatusBefore
    );
  });

  it('상태 매핑 케이스가 4종 전체를 포함한다', () => {
    assert.equal(cases.length, 4);
    assert.deepEqual(
      cases.map((entry) => entry.expected),
      [
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_BLOCKED',
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_NOT_STARTED',
      ]
    );
  });
});
