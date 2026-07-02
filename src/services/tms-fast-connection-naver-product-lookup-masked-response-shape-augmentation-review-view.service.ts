import {
  type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
  type TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView,
} from './tms-fast-connection-naver-product-lookup-response-product-identity-field-mapping-review-view.service';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewGroup =
  | 'MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READINESS'
  | 'TASK_412_FIELD_MAPPING_REVIEW_REFERENCE'
  | 'CURRENT_MASKED_EVIDENCE_LIMITATION_SUMMARY'
  | 'REQUIRED_MASKED_SHAPE_AUGMENTATION_ITEMS'
  | 'SAFE_MASKING_RULES_FOR_NEXT_STEP'
  | 'PRODUCT_IDENTITY_CONFIRMATION_CRITERIA'
  | 'UPDATE_API_ENTRY_STILL_DEFERRED_GUARD'
  | 'NEXT_MASKED_SHAPE_AUGMENTATION_APPROVAL_PACKET_ROADMAP';

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem {
  maskedShapeAugmentationReviewItemId: string;
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationItem {
  itemKey: string;
  label: string;
  description: string;
  augmentationItemOnly: true;
  actualValueRead: false;
  actualValueDisplayed: false;
  actualRawResponseAccessed: false;
  actualApiRecalled: false;
  requiresSeparateApprovalBeforeCollection: true;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView {
  taskId: 413;
  taskName: string;
  sourceFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus;
  fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus;
  recommendedCurrentAugmentationReviewStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus;

  recommendedAugmentationReviewDecision: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED';
  recommendedAugmentationReviewDecisionLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 필요';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET';
  recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet';
  recommendedExecutionMode: 'READ_ONLY_MASKED_SHAPE_AUGMENTATION_REVIEW_NO_COLLECTION';
  recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_MASKED_SHAPE_AUGMENTATION_APPROVED';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  actualLiveTestExecutedInTask409: true;
  actualLookupCallCountInTask409: 1;
  actualNaverApiCallInTask413: false;
  actualProductLookupApiCallInTask413: false;
  actualProductLookupApiRecall: false;

  lookupOneTimeSucceeded: boolean;
  lookupHttpStatusCode: number | null;
  lookupActualCallCount: number;
  lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  lookupTargetProductNo: '6597910207';
  lookupResponseShapeKeys: string[];
  lookupProductNoMatched: boolean | null;

  maskedResponseShapeAugmentationReviewPerformed: true;
  maskedResponseShapeAugmentationRequired: true;
  maskedShapeAugmentationReviewed: true;
  maskedShapeAugmentationCollectionPerformed: false;
  productIdentityFieldMappingRequired: true;
  productIdentityMatchConfirmed: false;
  rawResponseReviewAllowed: false;

  productUpdateApiEntryAllowedNow: false;
  productUpdateApiEntryDeferred: boolean;
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

  actualEnvReadInTask413: false;
  actualEnvFileOpenInTask413: false;
  actualProcessEnvReadInTask413: false;
  actualSecretAccessInTask413: false;
  actualTokenUseInTask413: false;

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

  maskedShapeAugmentationReviewGuidance: string;
  referencedCandidatePaths: string[];
  allowedMaskedShapeData: string[];
  forbiddenData: string[];
  requiredMaskedShapeAugmentationItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationItem[];

  maskedResponseShapeAugmentationReviewReadinessItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  task412FieldMappingReviewReferenceItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  currentMaskedEvidenceLimitationSummaryItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  requiredMaskedShapeAugmentationItemsReviewItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  safeMaskingRulesForNextStepItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  productIdentityConfirmationCriteriaItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  updateApiEntryStillDeferredGuardItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  nextMaskedShapeAugmentationApprovalPacketRoadmapItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];

  maskedShapeAugmentationReviewItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem[];
  maskedShapeAugmentationReviewSummaryCards: { label: string; value: number }[];
  maskedShapeAugmentationReviewGroupCount: number;
  totalMaskedShapeAugmentationReviewItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewRoadmapItem[];
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus,
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_REQUIRED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_OPTIONAL:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED',
};

const REQUIRED_MASKED_SHAPE_AUGMENTATION_ITEMS: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationItem[] =
  [
    {
      itemKey: 'candidate-path-exists-boolean',
      label: 'candidate path exists 여부',
      description: '각 candidate path의 존재 여부만 boolean으로 확인합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
    {
      itemKey: 'candidate-path-value-type',
      label: 'candidate path value type',
      description: '각 candidate path 값의 타입만 확인합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
    {
      itemKey: 'candidate-path-masked-preview-possible',
      label: 'candidate path value masked preview 가능 여부',
      description: '값 전체 대신 마지막 4자리 수준의 마스킹 preview 가능 여부만 검토합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
    {
      itemKey: 'candidate-path-equals-target-product-no',
      label: 'candidate path value equals targetProductNo 여부',
      description: 'candidate path 값이 targetProductNo와 일치하는지 boolean만 확인합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
    {
      itemKey: 'smartstore-channel-product-nested-key-shape',
      label: 'smartstoreChannelProduct 내부 key 목록의 마스킹된 key-only shape',
      description: 'smartstoreChannelProduct 내부 구조를 key 이름만으로 확인합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
    {
      itemKey: 'origin-product-nested-key-shape',
      label: 'originProduct 내부 key 목록의 마스킹된 key-only shape',
      description: 'originProduct 내부 구조를 key 이름만으로 확인합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
    {
      itemKey: 'product-identity-confidence-score-criteria',
      label: 'product identity confidence score 산정 기준',
      description: '상품 식별 확정 판단에 사용할 confidence score 산정 기준만 정의합니다.',
      augmentationItemOnly: true,
      actualValueRead: false,
      actualValueDisplayed: false,
      actualRawResponseAccessed: false,
      actualApiRecalled: false,
      requiresSeparateApprovalBeforeCollection: true,
    },
  ];

const ALLOWED_MASKED_SHAPE_DATA = [
  'topLevelKeys',
  'nestedKeyNamesOnly',
  'candidatePathExistsBoolean',
  'candidatePathValueTypeOnly',
  'candidatePathValueMaskedPreviewLast4Only',
  'candidatePathEqualsTargetProductNoBoolean',
  'productIdentityConfidenceScore',
];

const FORBIDDEN_DATA = [
  'rawResponseBody',
  'fullProductName',
  'fullOptionName',
  'fullSellerManagementCode',
  'fullClientId',
  'clientSecret',
  'accessToken',
  'authorizationHeader',
  'signature',
  'fullRawRequest',
  'fullRawResponse',
];

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewRoadmapItem[] =
  [
    { taskId: 413, label: 'Task 413 - Naver 상품 조회 마스킹 응답 shape 보강 검토 화면' },
    { taskId: 414, label: 'Task 414 - Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet' },
  ];

function makeItem(
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewItem {
  return {
    maskedShapeAugmentationReviewItemId: `masked-shape-augmentation-review-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView(
  fieldMappingReviewView: TmsFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewView
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView {
  const sourceStatus =
    fieldMappingReviewView.fastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus;
  const fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus =
    STATUS_MAP[sourceStatus];

  const maskedResponseShapeAugmentationReviewReadinessItems = [
    makeItem(
      'MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READINESS',
      '마스킹 응답 shape 보강 검토 화면 준비도',
      '마스킹 응답 shape 보강 검토 화면이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task412FieldMappingReviewReferenceItems = [
    makeItem(
      'TASK_412_FIELD_MAPPING_REVIEW_REFERENCE',
      'Task 412 후보 필드 경로 검토 참조',
      'Task 412의 candidate path 7개 검토 결과를 참조합니다.'
    ),
  ];
  const currentMaskedEvidenceLimitationSummaryItems = [
    makeItem(
      'CURRENT_MASKED_EVIDENCE_LIMITATION_SUMMARY',
      '현재 masked evidence 한계 요약',
      '현재 증적은 top-level keys만 있고 식별 필드 값과 존재 여부는 아직 확정되지 않았음을 표시합니다.'
    ),
  ];
  const requiredMaskedShapeAugmentationItemsReviewItems = [
    makeItem(
      'REQUIRED_MASKED_SHAPE_AUGMENTATION_ITEMS',
      '보강 필요 shape 항목 정의',
      '다음 단계에서 수집해야 할 최소 마스킹 shape 항목만 값 없이 정의합니다.'
    ),
  ];
  const safeMaskingRulesForNextStepItems = [
    makeItem(
      'SAFE_MASKING_RULES_FOR_NEXT_STEP',
      '다음 단계 마스킹 허용/금지 규칙',
      '다음 단계에서 허용할 마스킹 데이터와 금지 데이터를 구분합니다.'
    ),
  ];
  const productIdentityConfirmationCriteriaItems = [
    makeItem(
      'PRODUCT_IDENTITY_CONFIRMATION_CRITERIA',
      '상품 식별 확정 기준',
      '어떤 조건이면 productNoMatched를 true로 볼 수 있는지 기준을 정의합니다.'
    ),
  ];
  const updateApiEntryStillDeferredGuardItems = [
    makeItem(
      'UPDATE_API_ENTRY_STILL_DEFERRED_GUARD',
      '상품 수정 API 진입 계속 보류 가드',
      '상품 수정 API 진입은 마스킹 shape 보강 승인 전까지 계속 보류됨을 표시합니다.'
    ),
  ];
  const nextMaskedShapeAugmentationApprovalPacketRoadmapItems = [
    makeItem(
      'NEXT_MASKED_SHAPE_AUGMENTATION_APPROVAL_PACKET_ROADMAP',
      '다음 승인 Packet 로드맵',
      '다음 단계로 마스킹 응답 shape 보강 별도 승인 Packet을 제안합니다.'
    ),
  ];

  const maskedShapeAugmentationReviewItems = [
    ...maskedResponseShapeAugmentationReviewReadinessItems,
    ...task412FieldMappingReviewReferenceItems,
    ...currentMaskedEvidenceLimitationSummaryItems,
    ...requiredMaskedShapeAugmentationItemsReviewItems,
    ...safeMaskingRulesForNextStepItems,
    ...productIdentityConfirmationCriteriaItems,
    ...updateApiEntryStillDeferredGuardItems,
    ...nextMaskedShapeAugmentationApprovalPacketRoadmapItems,
  ];

  return {
    taskId: 413,
    taskName: 'TMS Fast Connection Naver Product Lookup Masked Response Shape Augmentation Review',
    sourceFastConnectionNaverProductLookupResponseProductIdentityFieldMappingReviewStatus: sourceStatus,
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
    recommendedCurrentAugmentationReviewStatus:
      fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,

    recommendedAugmentationReviewDecision:
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED',
    recommendedAugmentationReviewDecisionLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 필요',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET',
    recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet',
    recommendedExecutionMode: 'READ_ONLY_MASKED_SHAPE_AUGMENTATION_REVIEW_NO_COLLECTION',
    recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_MASKED_SHAPE_AUGMENTATION_APPROVED',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    actualLiveTestExecutedInTask409: true,
    actualLookupCallCountInTask409: 1,
    actualNaverApiCallInTask413: false,
    actualProductLookupApiCallInTask413: false,
    actualProductLookupApiRecall: false,

    lookupOneTimeSucceeded: fieldMappingReviewView.lookupOneTimeSucceeded,
    lookupHttpStatusCode: fieldMappingReviewView.lookupHttpStatusCode,
    lookupActualCallCount: fieldMappingReviewView.lookupActualCallCount,
    lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    lookupTargetProductNo: '6597910207',
    lookupResponseShapeKeys: fieldMappingReviewView.lookupResponseShapeKeys,
    lookupProductNoMatched: fieldMappingReviewView.lookupProductNoMatched,

    maskedResponseShapeAugmentationReviewPerformed: true,
    maskedResponseShapeAugmentationRequired: true,
    maskedShapeAugmentationReviewed: true,
    maskedShapeAugmentationCollectionPerformed: false,
    productIdentityFieldMappingRequired: true,
    productIdentityMatchConfirmed: false,
    rawResponseReviewAllowed: false,

    productUpdateApiEntryAllowedNow: false,
    productUpdateApiEntryDeferred: fieldMappingReviewView.productUpdateApiEntryDeferred,
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

    actualEnvReadInTask413: false,
    actualEnvFileOpenInTask413: false,
    actualProcessEnvReadInTask413: false,
    actualSecretAccessInTask413: false,
    actualTokenUseInTask413: false,

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

    maskedShapeAugmentationReviewGuidance:
      '현재 증적은 상품 조회 성공과 응답 최상위 구조만 확인합니다. 상품 수정 API 진입을 위해서는 raw response를 노출하지 않는 방식으로 candidate path 존재 여부, 타입, 마스킹된 값 일부 또는 targetProductNo 일치 여부 같은 최소 shape 보강이 필요합니다. Task 413은 보강 수집을 실행하지 않고 보강 범위와 마스킹 규칙만 정의합니다.',
    referencedCandidatePaths: fieldMappingReviewView.productIdentityFieldCandidates.map(
      (candidate) => candidate.path
    ),
    allowedMaskedShapeData: ALLOWED_MASKED_SHAPE_DATA,
    forbiddenData: FORBIDDEN_DATA,
    requiredMaskedShapeAugmentationItems: REQUIRED_MASKED_SHAPE_AUGMENTATION_ITEMS,

    maskedResponseShapeAugmentationReviewReadinessItems,
    task412FieldMappingReviewReferenceItems,
    currentMaskedEvidenceLimitationSummaryItems,
    requiredMaskedShapeAugmentationItemsReviewItems,
    safeMaskingRulesForNextStepItems,
    productIdentityConfirmationCriteriaItems,
    updateApiEntryStillDeferredGuardItems,
    nextMaskedShapeAugmentationApprovalPacketRoadmapItems,

    maskedShapeAugmentationReviewItems,
    maskedShapeAugmentationReviewSummaryCards: [
      { label: 'Augmentation Review 그룹', value: 8 },
      { label: '보강 필요 항목', value: REQUIRED_MASKED_SHAPE_AUGMENTATION_ITEMS.length },
      { label: 'Total', value: maskedShapeAugmentationReviewItems.length },
    ],
    maskedShapeAugmentationReviewGroupCount: 8,
    totalMaskedShapeAugmentationReviewItemCount: maskedShapeAugmentationReviewItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
