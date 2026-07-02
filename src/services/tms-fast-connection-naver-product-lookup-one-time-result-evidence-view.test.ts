import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView,
  type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
} from './tms-fast-connection-naver-product-lookup-one-time-result-evidence-view.service';
import {
  buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView,
  type TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView,
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

function buildTask409View(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus,
  executionResult?: TmsNaverProductLookupOneTimeLiveCallMaskedSummary
): TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView {
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
  const task408View = buildTmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView(task407View);
  return buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(task408View, executionResult);
}

const READY_INPUT_STATUS =
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY' as const;
const BLOCKED_INPUT_STATUS =
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED' as const;
const NOT_STARTED_INPUT_STATUS =
  'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED' as const;

const SUCCESS_EXECUTION_RESULT: TmsNaverProductLookupOneTimeLiveCallMaskedSummary = {
  liveCallAttempted: true,
  actualLookupCallCount: 1,
  targetProductNo: '6597910207',
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
  success: true,
  httpStatusCode: 200,
  productNoMatched: null,
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

const FAILED_EXECUTION_RESULT: TmsNaverProductLookupOneTimeLiveCallMaskedSummary = {
  ...SUCCESS_EXECUTION_RESULT,
  success: false,
  httpStatusCode: 404,
  sanitizedErrorMessage: 'PRODUCT_LOOKUP_FAILED',
};

describe('Task 410 - Fast Connection Naver Product Lookup One-Time Result Evidence', () => {
  it('Task 409 EXECUTED_SUCCESS → Task 410 SUCCESS_CONFIRMED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED'
    );
  });

  it('Task 409 EXECUTED_FAILED → Task 410 FAILED_CONFIRMED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, FAILED_EXECUTION_RESULT)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED'
    );
  });

  it('Task 409 READY → Task 410 READY', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY'
    );
  });

  it('Task 409 BLOCKED → Task 410 BLOCKED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(BLOCKED_INPUT_STATUS)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED'
    );
  });

  it('Task 409 NOT_STARTED → Task 410 NOT_STARTED', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(NOT_STARTED_INPUT_STATUS)
    );
    assert.equal(
      view.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
      'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED'
    );
  });

  it('상태 매핑이 exhaustive하다 (5개 상태 모두 커버)', () => {
    const cases: Array<{
      view: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView;
      expected: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus;
    }> = [
      {
        view: buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT),
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
      },
      {
        view: buildTask409View(READY_INPUT_STATUS, FAILED_EXECUTION_RESULT),
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED',
      },
      {
        view: buildTask409View(READY_INPUT_STATUS),
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY',
      },
      {
        view: buildTask409View(BLOCKED_INPUT_STATUS),
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED',
      },
      {
        view: buildTask409View(NOT_STARTED_INPUT_STATUS),
        expected: 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED',
      },
    ];
    for (const c of cases) {
      const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(c.view);
      assert.equal(view.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus, c.expected);
    }
    assert.equal(cases.length, 5);
  });

  it('8개 Result Evidence 그룹이 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.ok(view.resultEvidenceReadinessItems.length > 0, 'group 1');
    assert.ok(view.task409ActualLiveCallReferenceItems.length > 0, 'group 2');
    assert.ok(view.oneTimeLookupResultSummaryItems.length > 0, 'group 3');
    assert.ok(view.maskedResponseShapeEvidenceItems.length > 0, 'group 4');
    assert.ok(view.productNoMatchingInterpretationItems.length > 0, 'group 5');
    assert.ok(view.rawResponseSecretTokenNonExposureEvidenceItems.length > 0, 'group 6');
    assert.ok(view.noUpdatePriceStockDbWriteEvidenceItems.length > 0, 'group 7');
    assert.ok(view.nextProductUpdateEntryDecisionRoadmapItems.length > 0, 'group 8');
    assert.equal(view.resultEvidenceGroupCount, 8);
  });

  it('actualLiveCallExecuted가 true이고 actualLookupCallCount가 1이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.actualLiveCallExecuted, true);
    assert.equal(view.actualLookupCallCount, 1);
  });

  it('targetApi/targetProductNo/httpStatusCode/success가 고정값과 일치한다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.targetApi, 'NAVER_COMMERCE_PRODUCT_LOOKUP_API');
    assert.equal(view.targetProductNo, '6597910207');
    assert.equal(view.httpStatusCode, 200);
    assert.equal(view.success, true);
  });

  it('productNoMatched가 null이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.productNoMatched, null);
  });

  it('responseShapeKeys가 originProduct, smartstoreChannelProduct만 포함한다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.deepEqual(view.responseShapeKeys, ['originProduct', 'smartstoreChannelProduct']);
  });

  it('rawResponseDisplayed/rawResponseStored가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.rawResponseDisplayed, false);
    assert.equal(view.rawResponseStored, false);
  });

  it('secretExposed/tokenExposed/authorizationHeaderExposed/signatureExposed가 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.secretExposed, false);
    assert.equal(view.tokenExposed, false);
    assert.equal(view.authorizationHeaderExposed, false);
    assert.equal(view.signatureExposed, false);
  });

  it('productUpdateCalled/priceChanged/stockChanged/dbWritten이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.productUpdateCalled, false);
    assert.equal(view.priceChanged, false);
    assert.equal(view.stockChanged, false);
    assert.equal(view.dbWritten, false);
  });

  it('Task 410에서 actualNaverApiCallInTask410이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.actualNaverApiCallInTask410, false);
  });

  it('Task 410에서 actualProductLookupApiRecall이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.actualProductLookupApiRecall, false);
  });

  it('Task 410에서 actualEnvReadInTask410이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.actualEnvReadInTask410, false);
  });

  it('Task 410에서 actualProcessEnvReadInTask410이 false다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.actualProcessEnvReadInTask410, false);
  });

  it('recommendedPrimaryGoalAchieved가 NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.recommendedPrimaryGoalAchieved, 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS');
  });

  it('recommendedNextStep이 NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION이다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.recommendedNextStep, 'NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION');
  });

  it('recommendedSafetyMode가 SAFETY_LOCKED_AFTER_ONE_LOOKUP_SUCCESS다', () => {
    const view = buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
      buildTask409View(READY_INPUT_STATUS, SUCCESS_EXECUTION_RESULT)
    );
    assert.equal(view.recommendedSafetyMode, 'SAFETY_LOCKED_AFTER_ONE_LOOKUP_SUCCESS');
  });
});
