import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView,
  type TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
} from './tms-fast-connection-naver-api-secret-env-access-separate-approval-request-packet-view.service';
import {
  buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView,
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

function buildTask404View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus
) {
  const task403View =
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView(
      makeDummy402View(status)
    );
  return buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(task403View);
}

describe('Task 405 - Fast Connection Naver Api Secret Env Access Separate Approval Request Packet', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus;
    expected: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY',
      expected: 'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected:
        'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED',
      expected: 'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED',
      expected:
        'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_NOT_STARTED',
    },
  ];

  it('Task 404 READY 계열 → Task 405 READY', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(
      view.fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
      cases[0].expected
    );
  });

  it('Task 404 PARTIAL_READY 계열 → Task 405 PARTIAL_READY', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[1].input)
    );
    assert.equal(
      view.fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
      cases[1].expected
    );
  });

  it('Task 404 BLOCKED 계열 → Task 405 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[2].input)
    );
    assert.equal(
      view.fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
      cases[2].expected
    );
  });

  it('Task 404 NOT_STARTED 계열 → Task 405 NOT_STARTED', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[3].input)
    );
    assert.equal(
      view.fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
      cases[3].expected
    );
  });

  it('상태 매핑이 exhaustive하다 (4개 상태 모두 커버)', () => {
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
        buildTask404View(c.input)
      );
      assert.equal(view.fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus, c.expected);
    }
    assert.equal(cases.length, 4);
  });

  it('8개 승인 요청 Packet 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.ok(view.secretEnvAccessApprovalRequestPacketReadinessItems.length > 0, 'group 1');
    assert.ok(view.fastConnectionTransitionRecoveryReferenceItems.length > 0, 'group 2');
    assert.ok(view.secretEnvAccessPurposeItems.length > 0, 'group 3');
    assert.ok(view.secretEnvAccessScopeCandidatesItems.length > 0, 'group 4');
    assert.ok(view.noSecretValueExposureGuardItems.length > 0, 'group 5');
    assert.ok(view.noActualAccessOrApiCallGuardItems.length > 0, 'group 6');
    assert.ok(view.requiredUserApprovalPhraseGuidanceItems.length > 0, 'group 7');
    assert.ok(view.nextPreflightRoadmapItems.length > 0, 'group 8');
    assert.equal(view.secretEnvAccessApprovalRequestPacketGroupCount, 8);
  });

  it('환경 변수 이름 후보가 포함된다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.deepEqual(view.environmentVariableNameCandidates, [
      'NAVER_COMMERCE_CLIENT_ID',
      'NAVER_COMMERCE_CLIENT_SECRET',
      'NAVER_COMMERCE_API_BASE_URL',
      'NAVER_COMMERCE_TOKEN_URL',
      'NAVER_COMMERCE_CHANNEL_ID',
      'NAVER_COMMERCE_SELLER_ID',
    ]);
  });

  it('환경 변수 값은 포함되지 않는다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    const serialized = JSON.stringify(view);
    for (const name of view.environmentVariableNameCandidates) {
      assert.equal(serialized.includes(`${name}=`), false);
    }
    assert.ok(view.environmentVariableDisclosureNotice.includes('실제 값은 읽지 않았고 표시하지 않습니다'));
  });

  it('secret 값은 포함되지 않는다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualSecretAccess, false);
    assert.equal(view.actualSecretExposure, false);
  });

  it('승인 문구 예시는 read-only 안내로만 포함된다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(
      view.userApprovalPhraseExample,
      'Naver API 상품 조회 1회 테스트를 위한 환경 변수 존재 여부 확인을 별도로 승인합니다.'
    );
    assert.equal(view.actualApprovalAccepted, false);
  });

  it('승인 입력창/승인 버튼/submit/POST가 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualExecutionButtonAdded, false);
    assert.equal(view.actualApprovalButtonAdded, false);
    assert.equal(view.actualSubmitActionAdded, false);
    assert.equal(view.actualPostApiAdded, false);
  });

  it('actualEnvRead가 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualEnvRead, false);
  });

  it('actualEnvFileOpen이 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualEnvFileOpen, false);
  });

  it('actualSecretAccess가 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualSecretAccess, false);
  });

  it('actualTokenUse가 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualTokenUse, false);
  });

  it('actualNaverApiCall이 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualNaverApiCall, false);
  });

  it('actualProductLookupApiCall이 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualProductLookupApiCall, false);
  });

  it('actualDbWrite가 false다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.actualDbWrite, false);
  });

  it('recommendedNextStep이 NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.recommendedNextStep, 'NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT');
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL다', () => {
    const view = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
      buildTask404View(cases[0].input)
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL');
  });
});
