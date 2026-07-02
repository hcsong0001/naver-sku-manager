import {
  type TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus,
  type TmsFastConnectionNaverProductUpdateApiEntryDecisionView,
} from './tms-fast-connection-naver-product-update-api-entry-decision-view.service';

export type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewGroup =
  | 'PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READINESS'
  | 'TASK_411_ENTRY_DECISION_REFERENCE'
  | 'MASKED_RESPONSE_SHAPE_REFERENCE'
  | 'PRODUCT_IDENTITY_FIELD_CANDIDATE_PATHS'
  | 'CURRENT_MATCHING_GAP_ANALYSIS'
  | 'UPDATE_API_ENTRY_STILL_DEFERRED_GUARD'
  | 'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_GUARD'
  | 'NEXT_MASKED_SHAPE_AUGMENTATION_ROADMAP';

export interface TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem {
  fieldMappingReviewItemId: string;
  group: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupResponseProductIdentityFieldCandidate {
  path: string;
  candidatePathOnly: true;
  actualValueRead: false;
  actualValueDisplayed: false;
  actualRawResponseAccessed: false;
  matchConfirmed: false;
  requiresMaskedShapeAugmentation: true;
}

export interface TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView {
  taskId: 412;
  taskName: string;
  sourceFastConnectionNaverProductUpdateApiEntryDecisionStatus: TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus;
  fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus;
  recommendedCurrentReviewStatus: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus;

  recommendedMappingReviewDecision: 'NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED';
  recommendedMappingReviewDecisionLabel: 'Naver 상품 조회 응답 상품 식별 필드 매핑 검토 필요';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW';
  recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 검토';
  recommendedExecutionMode: 'READ_ONLY_FIELD_MAPPING_REVIEW_NO_API_RECALL';
  recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_FIELD_MAPPING_CONFIRMED';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  actualLiveTestExecutedInTask409: true;
  actualLookupCallCountInTask409: 1;
  actualNaverApiCallInTask412: false;
  actualProductLookupApiCallInTask412: false;
  actualProductLookupApiRecall: false;

  lookupOneTimeSucceeded: boolean;
  lookupHttpStatusCode: number | null;
  lookupActualCallCount: number;
  lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  lookupTargetProductNo: '6597910207';
  lookupResponseShapeKeys: string[];
  lookupProductNoMatched: boolean | null;

  productIdentityFieldMappingReviewPerformed: true;
  productIdentityFieldMappingRequired: true;
  productIdentityMatchConfirmed: false;
  maskedResponseShapeAugmentationRequired: true;

  productUpdateApiEntryDecisionMade: true;
  productUpdateApiEntryAllowedNow: false;
  productUpdateApiEntryDeferred: boolean;
  productUpdateApiEntryDeferredReason: string | null;
  rawResponseReviewAllowed: false;

  productUpdateApiCallAllowed: false;
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  dbWriteAllowed: false;

  actualProductUpdateApiCall: false;
  actualProductUpdateExecuted: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualRuntimeConfiguration: false;
  actualOperatingTransition: false;

  actualEnvReadInTask412: false;
  actualEnvFileOpenInTask412: false;
  actualProcessEnvReadInTask412: false;
  actualSecretAccessInTask412: false;
  actualTokenUseInTask412: false;

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

  fieldMappingReviewGuidance: string;

  productIdentityFieldCandidates: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldCandidate[];

  productIdentityFieldMappingReviewReadinessItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  task411EntryDecisionReferenceItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  maskedResponseShapeReferenceItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  productIdentityFieldCandidatePathsItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  currentMatchingGapAnalysisItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  updateApiEntryStillDeferredGuardItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  rawResponseSecretTokenNonExposureGuardItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  nextMaskedShapeAugmentationRoadmapItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];

  fieldMappingReviewItems: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem[];
  fieldMappingReviewSummaryCards: { label: string; value: number }[];
  fieldMappingReviewGroupCount: number;
  totalFieldMappingReviewItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewRoadmapItem[];
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus,
  TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED',
};

const PRODUCT_IDENTITY_FIELD_CANDIDATE_PATHS = [
  'smartstoreChannelProduct.channelProductNo',
  'smartstoreChannelProduct.id',
  'smartstoreChannelProduct.productNo',
  'smartstoreChannelProduct.originProductNo',
  'originProduct.originProductNo',
  'originProduct.id',
  'originProduct.productNo',
];

const PRODUCT_IDENTITY_FIELD_CANDIDATES: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldCandidate[] =
  PRODUCT_IDENTITY_FIELD_CANDIDATE_PATHS.map((path) => ({
    path,
    candidatePathOnly: true,
    actualValueRead: false,
    actualValueDisplayed: false,
    actualRawResponseAccessed: false,
    matchConfirmed: false,
    requiresMaskedShapeAugmentation: true,
  }));

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewRoadmapItem[] =
  [
    { taskId: 412, label: 'Task 412 - Naver 상품 조회 응답 상품 식별 필드 매핑 검토 화면' },
    { taskId: 413, label: 'Task 413 - Naver 상품 조회 마스킹 응답 shape 보강 검토 화면' },
  ];

function makeItem(
  group: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewItem {
  return {
    fieldMappingReviewItemId: `field-mapping-review-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView(
  entryDecisionView: TmsFastConnectionNaverProductUpdateApiEntryDecisionView
): TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView {
  const sourceStatus = entryDecisionView.fastConnectionNaverProductUpdateApiEntryDecisionStatus;
  const fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus =
    STATUS_MAP[sourceStatus];

  const productIdentityFieldMappingReviewReadinessItems = [
    makeItem(
      'PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READINESS',
      '상품 식별 필드 매핑 검토 화면 준비도',
      '상품 식별 필드 매핑 검토 화면이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task411EntryDecisionReferenceItems = [
    makeItem(
      'TASK_411_ENTRY_DECISION_REFERENCE',
      'Task 411 진입 보류 판단 참조',
      'Task 411 상품 수정 API 진입 보류 판단을 참조합니다.'
    ),
  ];
  const maskedResponseShapeReferenceItems = [
    makeItem(
      'MASKED_RESPONSE_SHAPE_REFERENCE',
      '마스킹된 응답 shape 참조',
      'Task 410의 responseShapeKeys만 참조합니다.'
    ),
  ];
  const productIdentityFieldCandidatePathsItems = [
    makeItem(
      'PRODUCT_IDENTITY_FIELD_CANDIDATE_PATHS',
      '상품 식별 필드 후보 경로',
      '상품 식별 필드 후보 경로를 값 없이 이름/경로 후보로만 표시합니다.'
    ),
  ];
  const currentMatchingGapAnalysisItems = [
    makeItem(
      'CURRENT_MATCHING_GAP_ANALYSIS',
      '현재 매칭 공백 분석',
      '현재 productNoMatched null의 원인을 매핑 미확정으로 분석합니다.'
    ),
  ];
  const updateApiEntryStillDeferredGuardItems = [
    makeItem(
      'UPDATE_API_ENTRY_STILL_DEFERRED_GUARD',
      '상품 수정 API 진입 계속 보류 가드',
      '상품 수정 API 진입이 계속 보류됨을 표시합니다.'
    ),
  ];
  const rawResponseSecretTokenNonExposureGuardItems = [
    makeItem(
      'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_GUARD',
      'raw response/secret/token 미노출 가드',
      'raw response, secret, token, header, signature 미노출을 표시합니다.'
    ),
  ];
  const nextMaskedShapeAugmentationRoadmapItems = [
    makeItem(
      'NEXT_MASKED_SHAPE_AUGMENTATION_ROADMAP',
      '다음 마스킹 shape 보강 로드맵',
      '다음 단계로 마스킹 shape 보강 검토를 제안합니다.'
    ),
  ];

  const fieldMappingReviewItems = [
    ...productIdentityFieldMappingReviewReadinessItems,
    ...task411EntryDecisionReferenceItems,
    ...maskedResponseShapeReferenceItems,
    ...productIdentityFieldCandidatePathsItems,
    ...currentMatchingGapAnalysisItems,
    ...updateApiEntryStillDeferredGuardItems,
    ...rawResponseSecretTokenNonExposureGuardItems,
    ...nextMaskedShapeAugmentationRoadmapItems,
  ];

  return {
    taskId: 412,
    taskName: 'TMS Fast Connection Naver Product Lookup Response Product Identity Field Mapping Review',
    sourceFastConnectionNaverProductUpdateApiEntryDecisionStatus: sourceStatus,
    fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
    recommendedCurrentReviewStatus:
      fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,

    recommendedMappingReviewDecision:
      'NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED',
    recommendedMappingReviewDecisionLabel: 'Naver 상품 조회 응답 상품 식별 필드 매핑 검토 필요',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW',
    recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 검토',
    recommendedExecutionMode: 'READ_ONLY_FIELD_MAPPING_REVIEW_NO_API_RECALL',
    recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_FIELD_MAPPING_CONFIRMED',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    actualLiveTestExecutedInTask409: true,
    actualLookupCallCountInTask409: 1,
    actualNaverApiCallInTask412: false,
    actualProductLookupApiCallInTask412: false,
    actualProductLookupApiRecall: false,

    lookupOneTimeSucceeded: entryDecisionView.lookupOneTimeSucceeded,
    lookupHttpStatusCode: entryDecisionView.lookupHttpStatusCode,
    lookupActualCallCount: entryDecisionView.lookupActualCallCount,
    lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    lookupTargetProductNo: '6597910207',
    lookupResponseShapeKeys: entryDecisionView.lookupResponseShapeKeys,
    lookupProductNoMatched: entryDecisionView.lookupProductNoMatched,

    productIdentityFieldMappingReviewPerformed: true,
    productIdentityFieldMappingRequired: true,
    productIdentityMatchConfirmed: false,
    maskedResponseShapeAugmentationRequired: true,

    productUpdateApiEntryDecisionMade: true,
    productUpdateApiEntryAllowedNow: false,
    productUpdateApiEntryDeferred: entryDecisionView.productUpdateApiEntryDeferred,
    productUpdateApiEntryDeferredReason: entryDecisionView.productUpdateApiEntryDeferredReason,
    rawResponseReviewAllowed: false,

    productUpdateApiCallAllowed: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    dbWriteAllowed: false,

    actualProductUpdateApiCall: false,
    actualProductUpdateExecuted: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
    actualOperatingTransition: false,

    actualEnvReadInTask412: false,
    actualEnvFileOpenInTask412: false,
    actualProcessEnvReadInTask412: false,
    actualSecretAccessInTask412: false,
    actualTokenUseInTask412: false,

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

    fieldMappingReviewGuidance:
      '현재 마스킹 증적 기준으로는 상품 조회 성공은 확인되었지만, 대상 상품번호 6597910207과 응답 내부 식별 필드의 대응 관계는 아직 확정되지 않았습니다. 상품 수정 API 진입 전, raw response를 노출하지 않는 방식으로 식별 필드 매핑을 보강해야 합니다.',

    productIdentityFieldCandidates: PRODUCT_IDENTITY_FIELD_CANDIDATES,

    productIdentityFieldMappingReviewReadinessItems,
    task411EntryDecisionReferenceItems,
    maskedResponseShapeReferenceItems,
    productIdentityFieldCandidatePathsItems,
    currentMatchingGapAnalysisItems,
    updateApiEntryStillDeferredGuardItems,
    rawResponseSecretTokenNonExposureGuardItems,
    nextMaskedShapeAugmentationRoadmapItems,

    fieldMappingReviewItems,
    fieldMappingReviewSummaryCards: [
      { label: 'Field Mapping Review 그룹', value: 8 },
      { label: '상품 식별 필드 후보', value: PRODUCT_IDENTITY_FIELD_CANDIDATES.length },
      { label: 'Total', value: fieldMappingReviewItems.length },
    ],
    fieldMappingReviewGroupCount: 8,
    totalFieldMappingReviewItemCount: fieldMappingReviewItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
