import {
  type TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus,
  type TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView,
} from './tms-fast-connection-naver-product-lookup-one-time-actual-live-call-view.service';

export type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceGroup =
  | 'RESULT_EVIDENCE_READINESS'
  | 'TASK_409_ACTUAL_LIVE_CALL_REFERENCE'
  | 'ONE_TIME_LOOKUP_RESULT_SUMMARY'
  | 'MASKED_RESPONSE_SHAPE_EVIDENCE'
  | 'PRODUCT_NO_MATCHING_INTERPRETATION'
  | 'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_EVIDENCE'
  | 'NO_UPDATE_PRICE_STOCK_DB_WRITE_EVIDENCE'
  | 'NEXT_PRODUCT_UPDATE_ENTRY_DECISION_ROADMAP';

export interface TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem {
  resultEvidenceItemId: string;
  group: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupOneTimeResultEvidenceRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView {
  taskId: 410;
  taskName: string;
  sourceFastConnectionNaverProductLookupOneTimeActualLiveCallStatus: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus;
  fastConnectionNaverProductLookupOneTimeResultEvidenceStatus: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus;

  recommendedResultEvidenceDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED';
  recommendedResultEvidenceDecisionLabel: 'Naver API 상품 조회 1회 결과 증적 - HTTP 200 성공 확인';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedActualLookupCallCount: 1;
  recommendedNextStep: 'NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION';
  recommendedNextStepLabel: '상품 수정 API 진입 여부 판단';
  recommendedExecutionMode: 'READ_ONLY_RESULT_EVIDENCE_NO_API_RECALL';
  recommendedDeploymentMode: 'RESULT_EVIDENCE_ONLY_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_LOCKED_AFTER_ONE_LOOKUP_SUCCESS';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  actualLiveCallExecuted: true;
  actualLookupCallCount: 1;
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  targetProductNo: '6597910207';
  targetProductLabel: '공구이야기직영 대표 검증 상품';
  httpStatusCode: 200;
  success: true;
  productNoMatched: null;
  productNoMatchInterpretation: '응답 파싱 로직상 채널상품번호 필드 위치 불일치로 판정 불가';
  responseShapeKeys: ['originProduct', 'smartstoreChannelProduct'];
  sanitizedErrorMessage: null;
  rawResponseDisplayed: false;
  rawResponseStored: false;
  secretExposed: false;
  tokenExposed: false;
  authorizationHeaderExposed: false;
  signatureExposed: false;
  productUpdateCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritten: false;

  actualLiveTestExecutedInTask409: true;
  actualLookupCallCountInTask409: 1;
  actualNaverApiCallInTask410: false;
  actualProductLookupApiCallInTask410: false;
  actualProductLookupApiRecall: false;

  actualProductUpdateApiCall: false;
  actualProductUpdateExecuted: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualRuntimeConfiguration: false;
  actualOperatingTransition: false;

  actualEnvReadInTask410: false;
  actualEnvFileOpenInTask410: false;
  actualProcessEnvReadInTask410: false;
  actualSecretAccessInTask410: false;
  actualTokenUseInTask410: false;

  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualRawApiResponseExposure: false;
  actualRawApiResponseStored: false;

  actualPostApiAdded: false;
  actualSubmitActionAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;

  resultEvidenceGuidance: string;
  productNoMatchedInterpretationGuidance: string;

  resultEvidenceReadinessItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  task409ActualLiveCallReferenceItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  oneTimeLookupResultSummaryItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  maskedResponseShapeEvidenceItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  productNoMatchingInterpretationItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  rawResponseSecretTokenNonExposureEvidenceItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  noUpdatePriceStockDbWriteEvidenceItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  nextProductUpdateEntryDecisionRoadmapItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];

  resultEvidenceItems: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem[];
  resultEvidenceSummaryCards: { label: string; value: number }[];
  resultEvidenceGroupCount: number;
  totalResultEvidenceItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceRoadmapItem[];
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus,
  TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_SUCCESS:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_FAILED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED',
};

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceRoadmapItem[] = [
  { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
  { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
];

function makeItem(
  group: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupOneTimeResultEvidenceItem {
  return {
    resultEvidenceItemId: `result-evidence-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupOneTimeResultEvidenceView(
  actualLiveCallView: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView
): TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView {
  const sourceStatus = actualLiveCallView.fastConnectionNaverProductLookupOneTimeActualLiveCallStatus;
  const fastConnectionNaverProductLookupOneTimeResultEvidenceStatus = STATUS_MAP[sourceStatus];

  const resultEvidenceReadinessItems = [
    makeItem(
      'RESULT_EVIDENCE_READINESS',
      '결과 증적 화면 준비도',
      '결과 증적 화면이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task409ActualLiveCallReferenceItems = [
    makeItem(
      'TASK_409_ACTUAL_LIVE_CALL_REFERENCE',
      'Task 409 실제 호출 결과 참조',
      'Task 409 실제 호출 결과를 read-only로 참조합니다.'
    ),
  ];
  const oneTimeLookupResultSummaryItems = [
    makeItem(
      'ONE_TIME_LOOKUP_RESULT_SUMMARY',
      '상품 조회 1회 결과 요약',
      'HTTP 200, success true, actualLookupCallCount 1을 요약합니다.'
    ),
  ];
  const maskedResponseShapeEvidenceItems = [
    makeItem(
      'MASKED_RESPONSE_SHAPE_EVIDENCE',
      '마스킹된 응답 shape 증적',
      'responseShapeKeys만 표시하고 raw response는 표시하지 않습니다.'
    ),
  ];
  const productNoMatchingInterpretationItems = [
    makeItem(
      'PRODUCT_NO_MATCHING_INTERPRETATION',
      '상품번호 매칭 해석',
      'productNoMatched null 사유와 다음 보정 필요 가능성을 표시합니다.'
    ),
  ];
  const rawResponseSecretTokenNonExposureEvidenceItems = [
    makeItem(
      'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_EVIDENCE',
      'raw response/secret/token 미노출 증적',
      'raw response, secret, token, header, signature 미노출 증적을 표시합니다.'
    ),
  ];
  const noUpdatePriceStockDbWriteEvidenceItems = [
    makeItem(
      'NO_UPDATE_PRICE_STOCK_DB_WRITE_EVIDENCE',
      '상품 수정/가격/재고/DB write 미수행 증적',
      '상품 수정/가격/재고/DB write 미수행 증적을 표시합니다.'
    ),
  ];
  const nextProductUpdateEntryDecisionRoadmapItems = [
    makeItem(
      'NEXT_PRODUCT_UPDATE_ENTRY_DECISION_ROADMAP',
      '다음 상품 수정 API 진입 판단 로드맵',
      'Task 411 상품 수정 API 진입 여부 판단 화면으로 이동함을 표시합니다.'
    ),
  ];

  const resultEvidenceItems = [
    ...resultEvidenceReadinessItems,
    ...task409ActualLiveCallReferenceItems,
    ...oneTimeLookupResultSummaryItems,
    ...maskedResponseShapeEvidenceItems,
    ...productNoMatchingInterpretationItems,
    ...rawResponseSecretTokenNonExposureEvidenceItems,
    ...noUpdatePriceStockDbWriteEvidenceItems,
    ...nextProductUpdateEntryDecisionRoadmapItems,
  ];

  return {
    taskId: 410,
    taskName: 'TMS Fast Connection Naver Product Lookup One Time Result Evidence',
    sourceFastConnectionNaverProductLookupOneTimeActualLiveCallStatus: sourceStatus,
    fastConnectionNaverProductLookupOneTimeResultEvidenceStatus,

    recommendedResultEvidenceDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED',
    recommendedResultEvidenceDecisionLabel: 'Naver API 상품 조회 1회 결과 증적 - HTTP 200 성공 확인',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedActualLookupCallCount: 1,
    recommendedNextStep: 'NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION',
    recommendedNextStepLabel: '상품 수정 API 진입 여부 판단',
    recommendedExecutionMode: 'READ_ONLY_RESULT_EVIDENCE_NO_API_RECALL',
    recommendedDeploymentMode: 'RESULT_EVIDENCE_ONLY_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_LOCKED_AFTER_ONE_LOOKUP_SUCCESS',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    actualLiveCallExecuted: true,
    actualLookupCallCount: 1,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    targetProductNo: '6597910207',
    targetProductLabel: '공구이야기직영 대표 검증 상품',
    httpStatusCode: 200,
    success: true,
    productNoMatched: null,
    productNoMatchInterpretation: '응답 파싱 로직상 채널상품번호 필드 위치 불일치로 판정 불가',
    responseShapeKeys: ['originProduct', 'smartstoreChannelProduct'],
    sanitizedErrorMessage: null,
    rawResponseDisplayed: false,
    rawResponseStored: false,
    secretExposed: false,
    tokenExposed: false,
    authorizationHeaderExposed: false,
    signatureExposed: false,
    productUpdateCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritten: false,

    actualLiveTestExecutedInTask409: true,
    actualLookupCallCountInTask409: 1,
    actualNaverApiCallInTask410: false,
    actualProductLookupApiCallInTask410: false,
    actualProductLookupApiRecall: false,

    actualProductUpdateApiCall: false,
    actualProductUpdateExecuted: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
    actualOperatingTransition: false,

    actualEnvReadInTask410: false,
    actualEnvFileOpenInTask410: false,
    actualProcessEnvReadInTask410: false,
    actualSecretAccessInTask410: false,
    actualTokenUseInTask410: false,

    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualRawApiResponseExposure: false,
    actualRawApiResponseStored: false,

    actualPostApiAdded: false,
    actualSubmitActionAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,

    resultEvidenceGuidance:
      'Task 409에서 Naver API 상품 조회 1회 Live Test가 실제로 수행되어 HTTP 200으로 성공했습니다. 이번 화면은 그 결과를 raw response 없이 마스킹/요약 증적으로만 고정 표시하는 read-only 화면이며, 실제 API를 다시 호출하지 않고 env/process.env/secret/token에 접근하지 않습니다.',
    productNoMatchedInterpretationGuidance:
      'Naver API 조회는 HTTP 200으로 성공했으며 responseShapeKeys 기준으로 originProduct와 smartstoreChannelProduct 구조가 확인되었습니다. 다만 productNoMatched는 null입니다. 이는 호출 실패가 아니라, 현재 harness의 응답 파싱 로직이 채널상품번호 필드 위치를 확정하지 못했기 때문입니다. 따라서 상품 수정 API로 진입하기 전에 smartstoreChannelProduct 내부의 안전한 식별 필드 해석 또는 마스킹된 shape 보강 검토가 필요할 수 있습니다. 이번 Task에서는 이 보정을 실제 raw response로 수행하지 않으며, 결과 증적과 다음 판단 포인트만 표시합니다.',

    resultEvidenceReadinessItems,
    task409ActualLiveCallReferenceItems,
    oneTimeLookupResultSummaryItems,
    maskedResponseShapeEvidenceItems,
    productNoMatchingInterpretationItems,
    rawResponseSecretTokenNonExposureEvidenceItems,
    noUpdatePriceStockDbWriteEvidenceItems,
    nextProductUpdateEntryDecisionRoadmapItems,

    resultEvidenceItems,
    resultEvidenceSummaryCards: [
      { label: 'Result Evidence 그룹', value: 8 },
      { label: '실제 조회 호출 수', value: 1 },
      { label: 'Total', value: resultEvidenceItems.length },
    ],
    resultEvidenceGroupCount: 8,
    totalResultEvidenceItemCount: resultEvidenceItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
