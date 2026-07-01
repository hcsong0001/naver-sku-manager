import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView,
  type TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
} from './tms-fast-connection-naver-product-lookup-one-time-transition-recovery-view.service';
import {
  buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-actual-input-separate-approval-boundary-view.service';
import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-final-pre-input-lock-outcome-certification-view.service';

function makeDummy402Item(outcomeCertificationItemId: string) {
  return {
    outcomeCertificationItemId,
    sourceFinalPreInputLockReviewItemId: `source-${outcomeCertificationItemId}`,
    category: 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_READINESS' as const,
    label: `Task 402 ${outcomeCertificationItemId}`,
    description: `Task 402 description ${outcomeCertificationItemId}`,
    sourceFinalPreInputLockReviewStatus:
      'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY' as const,
    outcomeCertificationStatus:
      'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY' as const,
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function makeDummy402View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView {
  const item = makeDummy402Item('task402-item-1');
  const outcomeCertificationItems = Array.from({ length: 14 }, (_, idx) =>
    makeDummy402Item(`task402-item-${idx + 1}`)
  );

  return {
    taskId: 402,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Final Pre-Input Lock Outcome Certification',
    sourceUserApprovalPhraseFinalPreInputLockReviewStatus:
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_REVIEW_READY',
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus:
      status,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 User Approval Phrase Final Pre-Input Lock 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Final Pre-Input Lock 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    outcomeCertificationItems,
    userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems: [item],
    userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems: [item],
    userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems: [item],
    userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems: [item],
    userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems: [item],
    userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems: [item],
    userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems: [item],
    userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems: [item],
    explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems: [item],
    explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems: [item],
    finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems: [item],
    deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems: [item],
    operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems: [item],
    apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems: [item],
    outcomeCertificationSummaryCards: [],
    readyOutcomeCertificationItems: outcomeCertificationItems,
    partialReadyOutcomeCertificationItems: [],
    blockedOutcomeCertificationItems: [],
    notStartedOutcomeCertificationItems: [],
    userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItemCount: 1,
    userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItemCount: 1,
    userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItemCount: 1,
    userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: 1,
    userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItemCount: 1,
    explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItemCount: 1,
    explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: 1,
    finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: 1,
    deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItemCount: 1,
    operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItemCount: 1,
    apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItemCount: 1,
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
    actualUserApprovalPhraseExplicitInputBoundarySubmitted: false,
    actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseFinalPreInputLockReviewSubmitted: false,
    actualUserApprovalPhraseFinalPreInputLockOutcomeCertificationSubmitted: false,
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

function buildTask403View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus
) {
  return buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView(
    makeDummy402View(status)
  );
}

describe('Task 404 - Fast Connection Naver Product Lookup One-Time Transition Recovery', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus;
    expected: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_NOT_STARTED',
    },
  ];

  it('Task 403 READY 계열 → Task 404 READY', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
      cases[0].expected
    );
  });

  it('Task 403 PARTIAL_READY 계열 → Task 404 PARTIAL_READY', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[1].input)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
      cases[1].expected
    );
  });

  it('Task 403 BLOCKED 계열 → Task 404 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[2].input)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
      cases[2].expected
    );
  });

  it('Task 403 NOT_STARTED 계열 → Task 404 NOT_STARTED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[3].input)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
      cases[3].expected
    );
  });

  it('상태 매핑이 exhaustive하다 (4개 상태 모두 커버)', () => {
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
        buildTask403View(c.input)
      );
      assert.equal(view.fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus, c.expected);
    }
    assert.equal(cases.length, 4);
  });

  it('Fast Connection Mode enabled가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.fastConnectionModeEnabled, true);
  });

  it('fastConnectionModeRecoveredFromLegacyTask403가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.fastConnectionModeRecoveredFromLegacyTask403, true);
  });

  it('legacyApprovalPhraseBoundaryFlowStoppedAfterTask403가 true다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.legacyApprovalPhraseBoundaryFlowStoppedAfterTask403, true);
  });

  it('primary goal이 NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.recommendedPrimaryGoal, 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS');
    assert.equal(view.primaryGoalChangedToNaverProductLookupOneTimeSuccess, true);
  });

  it('target API가 NAVER_COMMERCE_PRODUCT_LOOKUP_API다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.recommendedTargetApi, 'NAVER_COMMERCE_PRODUCT_LOOKUP_API');
  });

  it('target product 후보가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.recommendedTargetProductNo, '6597910207');
    assert.ok(view.representativeProductLookupCandidateItems.length > 0);
    assert.ok(
      view.representativeProductLookupCandidateItems.some((item) => item.description.includes('6597910207'))
    );
  });

  it('8개 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.ok(view.fastConnectionTransitionRecoveryReadinessItems.length > 0, 'group 1');
    assert.ok(view.task403LegacyBoundaryReferenceSummaryItems.length > 0, 'group 2');
    assert.ok(view.fastConnectionModeEnabledFromTask404Items.length > 0, 'group 3');
    assert.ok(view.naverProductLookupOneTimePrimaryGoalItems.length > 0, 'group 4');
    assert.ok(view.secretEnvAccessRequiresSeparateApprovalItems.length > 0, 'group 5');
    assert.ok(view.actualApiCallRequiresSeparateApprovalItems.length > 0, 'group 6');
    assert.ok(view.representativeProductLookupCandidateItems.length > 0, 'group 7');
    assert.ok(view.compressedFastConnectionRoadmapItems.length > 0, 'group 8');
    assert.equal(view.fastConnectionTransitionRecoveryGroupCount, 8);
  });

  it('압축 로드맵에 Task 405~411 방향이 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    const taskIds = view.compressedFastConnectionRoadmap.map((r) => r.taskId);
    for (const expectedTaskId of [404, 405, 406, 407, 408, 409, 410, 411]) {
      assert.ok(taskIds.includes(expectedTaskId), `Task ${expectedTaskId} missing`);
    }
  });

  it('secret/env 접근은 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualEnvRead, false);
    assert.equal(view.actualEnvWrite, false);
    assert.equal(view.actualSecretAccess, false);
    assert.equal(view.actualSecretExposure, false);
  });

  it('token 발급/재발급/사용은 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualTokenIssue, false);
    assert.equal(view.actualTokenReissue, false);
    assert.equal(view.actualTokenUse, false);
  });

  it('실제 Naver API 호출은 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualNaverApiCall, false);
  });

  it('실제 상품 조회 API 호출은 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualProductLookupApiCall, false);
    assert.equal(view.actualProductLookupExecuted, false);
  });

  it('실제 상품 수정 API 호출은 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualProductUpdateApiCall, false);
    assert.equal(view.actualProductUpdateExecuted, false);
  });

  it('DB write가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualDbWrite, false);
    assert.equal(view.actualPriceChange, false);
    assert.equal(view.actualStockChange, false);
  });

  it('POST API 추가가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualPostApiAdded, false);
    assert.equal(view.actualSubmitActionAdded, false);
  });

  it('실행/승인 버튼 추가가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(view.actualExecutionButtonAdded, false);
    assert.equal(view.actualApprovalButtonAdded, false);
  });

  it('추천 다음 단계가 NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
      buildTask403View(cases[0].input)
    );
    assert.equal(
      view.recommendedNextStep,
      'NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET'
    );
  });
});
