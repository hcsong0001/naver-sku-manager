import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-final-gate-view.service';
import {
  type TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult,
  type TmsNaverProductLookupMaskedResponseShapeAugmentationSummary,
} from './tms-naver-product-lookup-masked-response-shape-augmentation.harness';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTED_SUCCESS'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTED_FAILED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_PENDING_EXPLICIT_APPROVAL'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionGroup =
  | 'ACTUAL_MASKED_SHAPE_COLLECTION_APPROVAL_CONFIRMATION'
  | 'TASK_415_FINAL_GATE_REFERENCE'
  | 'ONE_TIME_RECALL_SCOPE_AND_TARGET_LOCK'
  | 'MASKED_SHAPE_COLLECTION_RESULT_SUMMARY'
  | 'CANDIDATE_PATH_MATCHING_EVIDENCE'
  | 'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_GUARD'
  | 'UPDATE_PRICE_STOCK_DB_WRITE_BLOCK_GUARD'
  | 'NEXT_PRODUCT_IDENTITY_CONFIRMATION_ROADMAP';

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem {
  actualCollectionItemId: string;
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView {
  taskId: 416;
  taskName: string;
  sourceFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus;
  fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus;
  recommendedCurrentActualCollectionStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus;

  recommendedActualCollectionDecision:
    'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTE_ONCE_ONLY';
  recommendedActualCollectionDecisionLabel:
    'Naver 상품 조회 마스킹 응답 shape 보강 실제 수집 - 승인된 1회 재조회';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedMaxRecallCount: 1;
  recommendedNextStep: 'NAVER_PRODUCT_IDENTITY_CONFIRMATION_DECISION';
  recommendedNextStepLabel: 'Naver 상품 식별 확정 판단';
  recommendedApprovalMode: 'EXPLICIT_SEPARATE_USER_APPROVAL_CONFIRMED';
  recommendedExecutionMode: 'ACTUAL_ONE_TIME_MASKED_SHAPE_COLLECTION_ALLOWED';
  recommendedDeploymentMode: 'MASKED_SHAPE_COLLECTION_ONLY_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_SCOPED_TO_ONE_MASKED_SHAPE_COLLECTION';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  explicitSeparateUserApprovalConfirmed: true;
  requiredApprovalPhrase: 'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';

  lookupOneTimeSucceeded: boolean;
  lookupHttpStatusCode: number | null;
  lookupActualCallCount: number;
  lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  lookupTargetProductNo: '6597910207';
  lookupProductNoMatched: boolean | null;

  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  targetProductNo: '6597910207';
  targetProductLabel: '공구이야기직영 대표 검증 상품';
  maxRecallCount: 1;
  candidatePathScope: string[];

  actualMaskedShapeAugmentationExecuted: boolean;
  actualRecallCount: number;
  actualNaverApiCall: boolean;
  actualProductLookupApiCall: boolean;
  success: boolean;
  httpStatusCode: number | null;
  responseShapeKeys: string[];
  candidatePathResults: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult[];
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
  productIdentityMatchReason: string;
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
  actualFullProductNameExposure: false;
  actualFullOptionNameExposure: false;
  actualFullSellerManagementCodeExposure: false;

  actualCollectionGuidance: string;

  actualMaskedShapeCollectionApprovalConfirmationItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  task415FinalGateReferenceItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  oneTimeRecallScopeAndTargetLockItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  maskedShapeCollectionResultSummaryItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  candidatePathMatchingEvidenceItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  rawResponseSecretTokenNonExposureGuardItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  updatePriceStockDbWriteBlockGuardItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  nextProductIdentityConfirmationRoadmapItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];

  actualCollectionItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem[];
  actualCollectionSummaryCards: { label: string; value: number }[];
  actualCollectionGroupCount: number;
  totalActualCollectionItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionRoadmapItem[];
}

const CANDIDATE_PATH_SCOPE = [
  'smartstoreChannelProduct.channelProductNo',
  'smartstoreChannelProduct.id',
  'smartstoreChannelProduct.productNo',
  'smartstoreChannelProduct.originProductNo',
  'originProduct.originProductNo',
  'originProduct.id',
  'originProduct.productNo',
];

const REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';

const BASE_STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_OPTIONAL:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_NOT_STARTED',
};

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionRoadmapItem[] =
  [
    { taskId: 416, label: 'Task 416 - Naver 상품 조회 마스킹 응답 shape 보강 실제 수집' },
    { taskId: 417, label: 'Task 417 - Naver 상품 식별 확정 판단 화면' },
  ];

function makeItem(
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionItem {
  return {
    actualCollectionItemId: `actual-masked-shape-collection-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

function resolveStatus(
  sourceStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
  executionResult?: TmsNaverProductLookupMaskedResponseShapeAugmentationSummary
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus {
  if (!executionResult) {
    return BASE_STATUS_MAP[sourceStatus];
  }

  if (executionResult.augmentationAttempted) {
    return executionResult.success
      ? 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTED_SUCCESS'
      : 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTED_FAILED';
  }

  if (executionResult.sanitizedErrorMessage === 'APPROVAL_PHRASE_MISMATCH') {
    return 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_PENDING_EXPLICIT_APPROVAL';
  }

  return BASE_STATUS_MAP[sourceStatus] ===
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_NOT_STARTED'
    ? 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_NOT_STARTED'
    : 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_BLOCKED';
}

export function buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView(
  finalGateView: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView,
  executionResult?: TmsNaverProductLookupMaskedResponseShapeAugmentationSummary
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView {
  const sourceStatus =
    finalGateView.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus;
  const fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus =
    resolveStatus(sourceStatus, executionResult);

  const actualMaskedShapeCollectionApprovalConfirmationItems = [
    makeItem(
      'ACTUAL_MASKED_SHAPE_COLLECTION_APPROVAL_CONFIRMATION',
      '사용자 별도 승인 문구 확인',
      '사용자의 별도 승인 문구가 확인되어 Task 416 실제 수집 범위가 열렸음을 표시합니다.'
    ),
  ];
  const task415FinalGateReferenceItems = [
    makeItem(
      'TASK_415_FINAL_GATE_REFERENCE',
      'Task 415 Final Gate 참조',
      'Task 415 Final Gate의 잠금 범위와 안전 조건을 그대로 참조합니다.'
    ),
  ];
  const oneTimeRecallScopeAndTargetLockItems = [
    makeItem(
      'ONE_TIME_RECALL_SCOPE_AND_TARGET_LOCK',
      '1회 재조회 범위 및 대상 잠금',
      '상품번호 6597910207에 대해 최대 1회 재조회만 허용됨을 표시합니다.'
    ),
  ];
  const maskedShapeCollectionResultSummaryItems = [
    makeItem(
      'MASKED_SHAPE_COLLECTION_RESULT_SUMMARY',
      '마스킹 shape 수집 결과 요약',
      '실제 수집 성공/실패 여부와 HTTP status를 요약합니다.'
    ),
  ];
  const candidatePathMatchingEvidenceItems = [
    makeItem(
      'CANDIDATE_PATH_MATCHING_EVIDENCE',
      'candidate path 매칭 증적',
      'candidate path 7개에 대해 exists/type/maskedPreviewLast4/equalsTargetProductNo만 수집합니다.'
    ),
  ];
  const rawResponseSecretTokenNonExposureGuardItems = [
    makeItem(
      'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_GUARD',
      'raw response/secret/token 미노출 가드',
      'raw response, secret, token, header, signature가 노출되지 않았음을 표시합니다.'
    ),
  ];
  const updatePriceStockDbWriteBlockGuardItems = [
    makeItem(
      'UPDATE_PRICE_STOCK_DB_WRITE_BLOCK_GUARD',
      '상품 수정/가격/재고/DB write 차단 가드',
      '상품 수정 API, 가격 변경, 재고 변경, DB write가 여전히 금지 상태임을 표시합니다.'
    ),
  ];
  const nextProductIdentityConfirmationRoadmapItems = [
    makeItem(
      'NEXT_PRODUCT_IDENTITY_CONFIRMATION_ROADMAP',
      '다음 상품 식별 확정 판단 로드맵',
      '다음 단계로 Task 417 상품 식별 확정 판단 화면을 제안합니다.'
    ),
  ];

  const actualCollectionItems = [
    ...actualMaskedShapeCollectionApprovalConfirmationItems,
    ...task415FinalGateReferenceItems,
    ...oneTimeRecallScopeAndTargetLockItems,
    ...maskedShapeCollectionResultSummaryItems,
    ...candidatePathMatchingEvidenceItems,
    ...rawResponseSecretTokenNonExposureGuardItems,
    ...updatePriceStockDbWriteBlockGuardItems,
    ...nextProductIdentityConfirmationRoadmapItems,
  ];

  return {
    taskId: 416,
    taskName: 'TMS Fast Connection Naver Product Lookup Masked Response Shape Augmentation Actual Collection',
    sourceFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus: sourceStatus,
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,
    recommendedCurrentActualCollectionStatus:
      fastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionStatus,

    recommendedActualCollectionDecision:
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION_EXECUTE_ONCE_ONLY',
    recommendedActualCollectionDecisionLabel:
      'Naver 상품 조회 마스킹 응답 shape 보강 실제 수집 - 승인된 1회 재조회',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedMaxRecallCount: 1,
    recommendedNextStep: 'NAVER_PRODUCT_IDENTITY_CONFIRMATION_DECISION',
    recommendedNextStepLabel: 'Naver 상품 식별 확정 판단',
    recommendedApprovalMode: 'EXPLICIT_SEPARATE_USER_APPROVAL_CONFIRMED',
    recommendedExecutionMode: 'ACTUAL_ONE_TIME_MASKED_SHAPE_COLLECTION_ALLOWED',
    recommendedDeploymentMode: 'MASKED_SHAPE_COLLECTION_ONLY_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_SCOPED_TO_ONE_MASKED_SHAPE_COLLECTION',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    explicitSeparateUserApprovalConfirmed: true,
    requiredApprovalPhrase: REQUIRED_APPROVAL_PHRASE,

    lookupOneTimeSucceeded: finalGateView.lookupOneTimeSucceeded,
    lookupHttpStatusCode: finalGateView.lookupHttpStatusCode,
    lookupActualCallCount: finalGateView.lookupActualCallCount,
    lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    lookupTargetProductNo: '6597910207',
    lookupProductNoMatched: finalGateView.lookupProductNoMatched,

    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    targetProductNo: '6597910207',
    targetProductLabel: '공구이야기직영 대표 검증 상품',
    maxRecallCount: 1,
    candidatePathScope: CANDIDATE_PATH_SCOPE,

    actualMaskedShapeAugmentationExecuted: executionResult?.augmentationAttempted ?? false,
    actualRecallCount: executionResult?.actualRecallCount ?? 0,
    actualNaverApiCall: executionResult?.augmentationAttempted ?? false,
    actualProductLookupApiCall: (executionResult?.actualRecallCount ?? 0) > 0,
    success: executionResult?.success ?? false,
    httpStatusCode: executionResult?.httpStatusCode ?? null,
    responseShapeKeys: executionResult?.responseShapeKeys ?? [],
    candidatePathResults: executionResult?.candidatePathResults ?? [],
    productIdentityConfidenceScore: executionResult?.productIdentityConfidenceScore ?? 0,
    productIdentityMatchConfirmed: executionResult?.productIdentityMatchConfirmed ?? false,
    productIdentityMatchReason:
      executionResult?.productIdentityMatchReason ??
      '아직 실제 마스킹 응답 shape 보강 수집을 실행하지 않아 상품 식별 확정 판단을 시작하지 않았습니다.',
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
    actualFullProductNameExposure: false,
    actualFullOptionNameExposure: false,
    actualFullSellerManagementCodeExposure: false,

    actualCollectionGuidance:
      'Task 416은 사용자의 별도 승인 문구 확인 후 상품번호 6597910207에 대해 상품 조회 API를 최대 1회만 재호출하여 마스킹 응답 shape 보강 수집을 수행하는 단계입니다. raw response 전체, secret/token/header/signature, full product name/option name/seller management code는 계속 노출하지 않고 candidate path 기반 마스킹 summary만 사용합니다.',

    actualMaskedShapeCollectionApprovalConfirmationItems,
    task415FinalGateReferenceItems,
    oneTimeRecallScopeAndTargetLockItems,
    maskedShapeCollectionResultSummaryItems,
    candidatePathMatchingEvidenceItems,
    rawResponseSecretTokenNonExposureGuardItems,
    updatePriceStockDbWriteBlockGuardItems,
    nextProductIdentityConfirmationRoadmapItems,

    actualCollectionItems,
    actualCollectionSummaryCards: [
      { label: 'Actual Collection 그룹', value: 8 },
      { label: 'candidate path 범위', value: CANDIDATE_PATH_SCOPE.length },
      { label: 'Total', value: actualCollectionItems.length },
    ],
    actualCollectionGroupCount: 8,
    totalActualCollectionItemCount: actualCollectionItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
