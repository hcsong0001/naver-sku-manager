import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView,
  type TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus,
} from './tms-fast-connection-naver-product-lookup-one-time-actual-live-call-view.service';
import {
  buildTmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView,
} from './tms-fast-connection-naver-product-lookup-one-time-final-safety-gate-view.service';
import {
  buildTmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView,
} from './tms-fast-connection-naver-product-lookup-one-time-live-test-approval-packet-view.service';
import {
  buildTmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView,
} from './tms-fast-connection-naver-api-env-existence-no-secret-preflight-view.service';
import {
  buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView,
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
import { type TmsNaverProductLookupOneTimeLiveCallMaskedSummary } from './tms-naver-product-lookup-one-time-live-call.harness';

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

function buildTask408View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus
) {
  const task403View =
    buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView(
      makeDummy402View(status)
    );
  const task404View = buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(task403View);
  const task405View = buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
    task404View
  );
  const task406View = buildTmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView(task405View);
  const task407View = buildTmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView(
    task406View
  );
  return buildTmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView(task407View);
}

describe('Task 409 - Fast Connection Naver Product Lookup One-Time Actual Live Call', () => {
  const cases: Array<{
    input: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus;
    expected: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus;
  }> = [
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_READY',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_BLOCKED',
    },
    {
      input:
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED',
      expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_NOT_STARTED',
    },
  ];

  it('Task 408 READY 계열 → Task 409 READY', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus, cases[0].expected);
  });

  it('Task 408 PARTIAL_READY 계열 → Task 409 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[1].input)
    );
    assert.equal(view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus, cases[1].expected);
  });

  it('Task 408 BLOCKED 계열 → Task 409 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[2].input)
    );
    assert.equal(view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus, cases[2].expected);
  });

  it('Task 408 NOT_STARTED 계열 → Task 409 NOT_STARTED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[3].input)
    );
    assert.equal(view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus, cases[3].expected);
  });

  it('상태 매핑이 exhaustive하다 (4개 상태 모두 커버)', () => {
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
        buildTask408View(c.input)
      );
      assert.equal(view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus, c.expected);
    }
    assert.equal(cases.length, 4);
  });

  it('8개 Actual Live Call 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.ok(view.actualLiveCallApprovalConfirmationItems.length > 0, 'group 1');
    assert.ok(view.task408FinalSafetyGateReferenceItems.length > 0, 'group 2');
    assert.ok(view.oneTimeLookupExecutionScopeItems.length > 0, 'group 3');
    assert.ok(view.envSecretTokenUseBoundaryItems.length > 0, 'group 4');
    assert.ok(view.liveCallExecutionResultSummaryItems.length > 0, 'group 5');
    assert.ok(view.rawResponseMaskingAndNonStorageGuardItems.length > 0, 'group 6');
    assert.ok(view.productUpdatePriceStockDbWriteBlockItems.length > 0, 'group 7');
    assert.ok(view.nextEvidenceScreenRoadmapItems.length > 0, 'group 8');
    assert.equal(view.actualLiveCallGroupCount, 8);
  });

  it('targetApi가 NAVER_COMMERCE_PRODUCT_LOOKUP_API이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.targetApi, 'NAVER_COMMERCE_PRODUCT_LOOKUP_API');
  });

  it('targetProductNo가 6597910207이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.targetProductNo, '6597910207');
  });

  it('maxLookupCallCount가 1이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.maxLookupCallCount, 1);
  });

  it('상품 수정/가격/재고/DB write가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.productUpdateAllowed, false);
    assert.equal(view.priceChangeAllowed, false);
    assert.equal(view.stockChangeAllowed, false);
    assert.equal(view.dbWriteAllowed, false);
    assert.equal(view.actualProductUpdateApiCall, false);
    assert.equal(view.actualPriceChange, false);
    assert.equal(view.actualStockChange, false);
    assert.equal(view.actualDbWrite, false);
  });

  it('rawResponseDisplayAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.rawResponseDisplayAllowed, false);
  });

  it('rawResponseStorageAllowed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.rawResponseStorageAllowed, false);
  });

  it('recommendedNextStep이 NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SCREEN이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.recommendedNextStep, 'NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SCREEN');
  });

  it('recommendedSafetyMode가 SAFETY_SCOPED_TO_ONE_LOOKUP_CALL이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_SCOPED_TO_ONE_LOOKUP_CALL');
  });

  it('executionResult 성공 시 상태가 EXECUTED_SUCCESS로 전환된다', () => {
    const successResult: TmsNaverProductLookupOneTimeLiveCallMaskedSummary = {
      liveCallAttempted: true,
      actualLookupCallCount: 1,
      targetProductNo: '6597910207',
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      success: true,
      httpStatusCode: 200,
      productNoMatched: true,
      responseShapeKeys: ['originProduct', 'smartstoreChannelProduct'],
      rawResponseStored: false,
      rawResponseDisplayed: false,
      secretExposed: false,
      tokenExposed: false,
      authorizationHeaderExposed: false,
      productUpdateCalled: false,
      priceChanged: false,
      stockChanged: false,
      dbWritten: false,
      sanitizedErrorMessage: null,
    };
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input),
      successResult
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_SUCCESS'
    );
    assert.equal(view.actualLiveTestExecuted, true);
    assert.equal(view.actualLookupCallCount, 1);
    assert.equal(view.actualNaverApiCall, true);
    assert.equal(view.actualProductLookupApiCall, true);
    assert.equal(view.httpStatusCode, 200);
    assert.equal(view.productNoMatched, true);
  });

  it('executionResult 실패 시 상태가 EXECUTED_FAILED로 전환된다', () => {
    const failedResult: TmsNaverProductLookupOneTimeLiveCallMaskedSummary = {
      liveCallAttempted: true,
      actualLookupCallCount: 1,
      targetProductNo: '6597910207',
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      success: false,
      httpStatusCode: 404,
      productNoMatched: null,
      responseShapeKeys: [],
      rawResponseStored: false,
      rawResponseDisplayed: false,
      secretExposed: false,
      tokenExposed: false,
      authorizationHeaderExposed: false,
      productUpdateCalled: false,
      priceChanged: false,
      stockChanged: false,
      dbWritten: false,
      sanitizedErrorMessage: 'PRODUCT_LOOKUP_FAILED',
    };
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input),
      failedResult
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_FAILED'
    );
    assert.equal(view.sanitizedErrorMessage, 'PRODUCT_LOOKUP_FAILED');
  });

  it('실행 버튼/승인 버튼/secret/token 노출이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
      buildTask408View(cases[0].input)
    );
    assert.equal(view.actualSecretExposure, false);
    assert.equal(view.actualTokenExposure, false);
    assert.equal(view.actualAuthorizationHeaderExposure, false);
    assert.equal(view.actualSignatureExposure, false);
    assert.equal(view.actualRawApiResponseExposure, false);
    assert.equal(view.actualRawApiResponseStored, false);
  });
});
