import {
  type TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus,
  type TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView,
} from './tms-fast-connection-naver-product-lookup-one-time-final-safety-gate-view.service';
import { type TmsNaverProductLookupOneTimeLiveCallMaskedSummary } from './tms-naver-product-lookup-one-time-live-call.harness';

export type TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_SUCCESS'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_FAILED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupOneTimeActualLiveCallGroup =
  | 'ACTUAL_LIVE_CALL_APPROVAL_CONFIRMATION'
  | 'TASK_408_FINAL_SAFETY_GATE_REFERENCE'
  | 'ONE_TIME_LOOKUP_EXECUTION_SCOPE'
  | 'ENV_SECRET_TOKEN_USE_BOUNDARY'
  | 'LIVE_CALL_EXECUTION_RESULT_SUMMARY'
  | 'RAW_RESPONSE_MASKING_AND_NON_STORAGE_GUARD'
  | 'PRODUCT_UPDATE_PRICE_STOCK_DB_WRITE_BLOCK'
  | 'NEXT_EVIDENCE_SCREEN_ROADMAP';

export interface TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem {
  actualLiveCallItemId: string;
  group: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupOneTimeActualLiveCallRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView {
  taskId: 409;
  taskName: string;
  sourceFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus;
  fastConnectionNaverProductLookupOneTimeActualLiveCallStatus: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus;

  recommendedActualLiveCallDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTE_ONCE_ONLY';
  recommendedActualLiveCallDecisionLabel: 'Naver API 상품 조회 1회 실제 호출 - 승인된 1회 Live Test';
  recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  recommendedMaxLookupCallCount: 1;
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SCREEN';
  recommendedApprovalMode: 'EXPLICIT_SEPARATE_USER_APPROVAL_CONFIRMED';
  recommendedExecutionMode: 'ACTUAL_ONE_TIME_LOOKUP_CALL_ALLOWED';
  recommendedDeploymentMode: 'ONE_TIME_LOOKUP_ONLY_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_SCOPED_TO_ONE_LOOKUP_CALL';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;

  explicitSeparateUserApprovalConfirmed: true;
  requiredApprovalPhrase: 'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.';

  liveTestType: 'NAVER_PRODUCT_LOOKUP_ONE_TIME';
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  targetProductNo: '6597910207';
  targetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  maxLookupCallCount: 1;
  productUpdateAllowed: false;
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  dbWriteAllowed: false;
  rawResponseDisplayAllowed: false;
  rawResponseStorageAllowed: false;
  maskedSummaryAllowed: true;

  actualLiveTestExecuted: boolean;
  actualLookupCallCount: number;
  actualNaverApiCall: boolean;
  actualProductLookupApiCall: boolean;
  httpStatusCode: number | null;
  productNoMatched: boolean | null;
  responseShapeKeys: string[];
  sanitizedErrorMessage: string | null;

  actualProductUpdateApiCall: false;
  actualProductUpdateExecuted: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualRuntimeConfiguration: false;
  actualOperatingTransition: false;

  actualSecretExposure: false;
  actualTokenExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualRawApiResponseExposure: false;
  actualRawApiResponseStored: false;

  actualLiveCallGuidance: string;

  actualLiveCallApprovalConfirmationItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  task408FinalSafetyGateReferenceItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  oneTimeLookupExecutionScopeItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  envSecretTokenUseBoundaryItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  liveCallExecutionResultSummaryItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  rawResponseMaskingAndNonStorageGuardItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  productUpdatePriceStockDbWriteBlockItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  nextEvidenceScreenRoadmapItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];

  actualLiveCallItems: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem[];
  actualLiveCallSummaryCards: { label: string; value: number }[];
  actualLiveCallGroupCount: number;
  totalActualLiveCallItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallRoadmapItem[];
}

const BASE_STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus,
  TmsFastConnectionNaverProductLookupOneTimeActualLiveCallStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_PARTIAL_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_NOT_STARTED',
};

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallRoadmapItem[] = [
  { taskId: 409, label: 'Task 409 - Naver API 상품 조회 1회 실제 호출' },
  { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
  { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
];

function makeItem(
  group: TmsFastConnectionNaverProductLookupOneTimeActualLiveCallGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupOneTimeActualLiveCallItem {
  return {
    actualLiveCallItemId: `actual-live-call-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupOneTimeActualLiveCallView(
  finalSafetyGateView: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView,
  executionResult?: TmsNaverProductLookupOneTimeLiveCallMaskedSummary
): TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView {
  const sourceStatus = finalSafetyGateView.fastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus;

  let fastConnectionNaverProductLookupOneTimeActualLiveCallStatus = BASE_STATUS_MAP[sourceStatus];
  if (executionResult && executionResult.liveCallAttempted) {
    fastConnectionNaverProductLookupOneTimeActualLiveCallStatus = executionResult.success
      ? 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_SUCCESS'
      : 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_FAILED';
  }

  const actualLiveCallApprovalConfirmationItems = [
    makeItem(
      'ACTUAL_LIVE_CALL_APPROVAL_CONFIRMATION',
      '사용자 별도 승인 문구 확인',
      '사용자의 별도 승인 문구가 확인되었음을 표시합니다.'
    ),
  ];
  const task408FinalSafetyGateReferenceItems = [
    makeItem(
      'TASK_408_FINAL_SAFETY_GATE_REFERENCE',
      'Task 408 Final Safety Gate 참조',
      'Task 408 Final Safety Gate 결과를 참조합니다.'
    ),
  ];
  const oneTimeLookupExecutionScopeItems = [
    makeItem(
      'ONE_TIME_LOOKUP_EXECUTION_SCOPE',
      '상품 조회 1회 실행 범위',
      '상품번호 6597910207에 대한 상품 조회 1회만 허용합니다.'
    ),
  ];
  const envSecretTokenUseBoundaryItems = [
    makeItem(
      'ENV_SECRET_TOKEN_USE_BOUNDARY',
      'env/secret/token 사용 경계',
      'env/secret/token은 호출 목적에만 사용하고 출력하지 않습니다.'
    ),
  ];
  const liveCallExecutionResultSummaryItems = [
    makeItem(
      'LIVE_CALL_EXECUTION_RESULT_SUMMARY',
      '실제 호출 실행 결과 요약',
      '실제 호출 성공/실패 요약을 표시합니다.'
    ),
  ];
  const rawResponseMaskingAndNonStorageGuardItems = [
    makeItem(
      'RAW_RESPONSE_MASKING_AND_NON_STORAGE_GUARD',
      'raw response 마스킹/비저장 가드',
      'raw response 전체 표시/저장 금지, 마스킹/요약만 허용함을 표시합니다.'
    ),
  ];
  const productUpdatePriceStockDbWriteBlockItems = [
    makeItem(
      'PRODUCT_UPDATE_PRICE_STOCK_DB_WRITE_BLOCK',
      '상품 수정/가격/재고/DB write 차단',
      '상품 수정, 가격 변경, 재고 변경, DB write 금지를 표시합니다.'
    ),
  ];
  const nextEvidenceScreenRoadmapItems = [
    makeItem(
      'NEXT_EVIDENCE_SCREEN_ROADMAP',
      '다음 결과 증적 화면 로드맵',
      'Task 410 결과 증적 화면으로 이동함을 표시합니다.'
    ),
  ];

  const actualLiveCallItems = [
    ...actualLiveCallApprovalConfirmationItems,
    ...task408FinalSafetyGateReferenceItems,
    ...oneTimeLookupExecutionScopeItems,
    ...envSecretTokenUseBoundaryItems,
    ...liveCallExecutionResultSummaryItems,
    ...rawResponseMaskingAndNonStorageGuardItems,
    ...productUpdatePriceStockDbWriteBlockItems,
    ...nextEvidenceScreenRoadmapItems,
  ];

  return {
    taskId: 409,
    taskName: 'TMS Fast Connection Naver Product Lookup One Time Actual Live Call',
    sourceFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus: sourceStatus,
    fastConnectionNaverProductLookupOneTimeActualLiveCallStatus,

    recommendedActualLiveCallDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTE_ONCE_ONLY',
    recommendedActualLiveCallDecisionLabel: 'Naver API 상품 조회 1회 실제 호출 - 승인된 1회 Live Test',
    recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    recommendedMaxLookupCallCount: 1,
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SCREEN',
    recommendedApprovalMode: 'EXPLICIT_SEPARATE_USER_APPROVAL_CONFIRMED',
    recommendedExecutionMode: 'ACTUAL_ONE_TIME_LOOKUP_CALL_ALLOWED',
    recommendedDeploymentMode: 'ONE_TIME_LOOKUP_ONLY_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_SCOPED_TO_ONE_LOOKUP_CALL',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,

    explicitSeparateUserApprovalConfirmed: true,
    requiredApprovalPhrase: 'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.',

    liveTestType: 'NAVER_PRODUCT_LOOKUP_ONE_TIME',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    targetProductNo: '6597910207',
    targetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    maxLookupCallCount: 1,
    productUpdateAllowed: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    dbWriteAllowed: false,
    rawResponseDisplayAllowed: false,
    rawResponseStorageAllowed: false,
    maskedSummaryAllowed: true,

    actualLiveTestExecuted: executionResult?.liveCallAttempted ?? false,
    actualLookupCallCount: executionResult?.actualLookupCallCount ?? 0,
    actualNaverApiCall: executionResult?.liveCallAttempted ?? false,
    actualProductLookupApiCall: (executionResult?.actualLookupCallCount ?? 0) > 0,
    httpStatusCode: executionResult?.httpStatusCode ?? null,
    productNoMatched: executionResult?.productNoMatched ?? null,
    responseShapeKeys: executionResult?.responseShapeKeys ?? [],
    sanitizedErrorMessage: executionResult?.sanitizedErrorMessage ?? null,

    actualProductUpdateApiCall: false,
    actualProductUpdateExecuted: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
    actualOperatingTransition: false,

    actualSecretExposure: false,
    actualTokenExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualRawApiResponseExposure: false,
    actualRawApiResponseStored: false,

    actualLiveCallGuidance:
      '이번 화면은 Naver API 상품 조회 1회 실제 호출 결과를 표시합니다. 사용자의 별도 승인 문구가 확인되어 상품 조회 1회 실행만 허용되었으며, 상품 수정, 가격 변경, 재고 변경, DB write는 여전히 금지됩니다. raw response는 표시하거나 저장하지 않고 마스킹/요약 증적만 제공합니다.',

    actualLiveCallApprovalConfirmationItems,
    task408FinalSafetyGateReferenceItems,
    oneTimeLookupExecutionScopeItems,
    envSecretTokenUseBoundaryItems,
    liveCallExecutionResultSummaryItems,
    rawResponseMaskingAndNonStorageGuardItems,
    productUpdatePriceStockDbWriteBlockItems,
    nextEvidenceScreenRoadmapItems,

    actualLiveCallItems,
    actualLiveCallSummaryCards: [
      { label: 'Actual Live Call 그룹', value: 8 },
      { label: '최대 조회 호출 수', value: 1 },
      { label: 'Total', value: actualLiveCallItems.length },
    ],
    actualLiveCallGroupCount: 8,
    totalActualLiveCallItemCount: actualLiveCallItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
