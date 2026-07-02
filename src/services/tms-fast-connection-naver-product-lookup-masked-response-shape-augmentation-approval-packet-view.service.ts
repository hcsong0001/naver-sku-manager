import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-review-view.service';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketGroup =
  | 'MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READINESS'
  | 'TASK_413_AUGMENTATION_REVIEW_REFERENCE'
  | 'APPROVAL_SCOPE_FOR_MASKED_SHAPE_COLLECTION'
  | 'ALLOWED_MASKED_SHAPE_DATA_SCOPE'
  | 'FORBIDDEN_DATA_AND_ACTION_SCOPE'
  | 'ONE_TIME_RECALL_LIMIT_AND_TARGET_SCOPE'
  | 'USER_APPROVAL_PHRASE_GUIDANCE'
  | 'NEXT_MASKED_SHAPE_COLLECTION_FINAL_GATE_ROADMAP';

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem {
  approvalPacketItemId: string;
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView {
  taskId: 414;
  taskName: string;
  sourceFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus;
  fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus;
  recommendedCurrentApprovalPacketStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus;

  recommendedApprovalPacketDecision: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED';
  recommendedApprovalPacketDecisionLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet 필요';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedRequiredApprovalPhrase: 'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE';
  recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate';
  recommendedExecutionMode: 'READ_ONLY_APPROVAL_PACKET_NO_COLLECTION';
  recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  actualLiveTestExecutedInTask409: true;
  actualLookupCallCountInTask409: 1;
  actualNaverApiCallInTask414: false;
  actualProductLookupApiCallInTask414: false;
  actualProductLookupApiRecall: false;

  lookupOneTimeSucceeded: boolean;
  lookupHttpStatusCode: number | null;
  lookupActualCallCount: number;
  lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  lookupTargetProductNo: '6597910207';
  lookupResponseShapeKeys: string[];
  lookupProductNoMatched: boolean | null;

  maskedResponseShapeAugmentationRequired: true;
  maskedResponseShapeAugmentationReviewPerformed: true;
  maskedShapeAugmentationReviewed: true;
  maskedResponseShapeAugmentationApprovalPacketPrepared: true;
  maskedShapeAugmentationApprovalPacketPrepared: true;
  maskedShapeAugmentationCollectionPerformed: false;
  actualApprovalAccepted: false;
  actualMaskedShapeAugmentationApprovalAccepted: false;

  maxAllowedRecallCountAfterApproval: 1;
  targetProductNoLocked: '6597910207';
  productIdentityFieldMappingRequired: true;
  productIdentityMatchConfirmed: false;
  productUpdateApiEntryAllowedNow: false;
  productUpdateApiEntryDeferred: boolean;

  productUpdateApiCallAllowed: false;
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  dbWriteAllowed: false;
  rawResponseDisplayAllowed: false;
  rawResponseStorageAllowed: false;

  actualProductUpdateApiCall: false;
  actualProductUpdateExecuted: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualRuntimeConfiguration: false;
  actualOperatingTransition: false;

  actualEnvReadInTask414: false;
  actualEnvFileOpenInTask414: false;
  actualProcessEnvReadInTask414: false;
  actualSecretAccessInTask414: false;
  actualTokenUseInTask414: false;

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

  approvalPacketGuidance: string;
  approvalScope: string[];
  outOfScope: string[];
  allowedMaskedShapeData: string[];
  forbiddenData: string[];
  approvalPhraseGuidance: string;

  maskedResponseShapeAugmentationApprovalPacketReadinessItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  task413AugmentationReviewReferenceItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  approvalScopeForMaskedShapeCollectionItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  allowedMaskedShapeDataScopeItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  forbiddenDataAndActionScopeItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  oneTimeRecallLimitAndTargetScopeItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  userApprovalPhraseGuidanceItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  nextMaskedShapeCollectionFinalGateRoadmapItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];

  approvalPacketItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem[];
  approvalPacketSummaryCards: { label: string; value: number }[];
  approvalPacketGroupCount: number;
  totalApprovalPacketItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketRoadmapItem[];
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus,
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_REQUIRED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_OPTIONAL:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REVIEW_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED',
};

const APPROVAL_SCOPE = [
  'Naver 상품 조회 API 재조회 최대 1회',
  '대상 상품번호 6597910207 고정',
  '마스킹 응답 shape 보강 수집',
  'candidate path exists 여부 수집',
  'candidate path value type 수집',
  'candidate path value masked preview last4 수집 가능',
  'candidate path equals targetProductNo boolean 수집',
  'nested key names only 수집',
  'product identity confidence score 산정',
];

const OUT_OF_SCOPE = [
  '상품 수정 API 호출',
  '가격 변경',
  '재고 변경',
  'DB write',
  'raw response 전체 표시',
  'raw response 전체 저장',
  'full product name 표시',
  'full option name 표시',
  'full seller management code 표시',
  'secret/token/header/signature 출력',
  '반복 조회',
  '다른 상품번호 조회',
];

const APPROVAL_PHRASE =
  'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketRoadmapItem[] =
  [
    { taskId: 414, label: 'Task 414 - Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet' },
    { taskId: 415, label: 'Task 415 - Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate' },
  ];

function makeItem(
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketItem {
  return {
    approvalPacketItemId: `masked-shape-approval-packet-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView(
  augmentationReviewView: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewView
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView {
  const sourceStatus =
    augmentationReviewView.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus;
  const fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus =
    STATUS_MAP[sourceStatus];

  const maskedResponseShapeAugmentationApprovalPacketReadinessItems = [
    makeItem(
      'MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READINESS',
      '별도 승인 Packet 준비도',
      '마스킹 응답 shape 보강 별도 승인 Packet이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task413AugmentationReviewReferenceItems = [
    makeItem(
      'TASK_413_AUGMENTATION_REVIEW_REFERENCE',
      'Task 413 보강 검토 결과 참조',
      'Task 413의 보강 필요 항목과 마스킹 규칙 검토 결과를 참조합니다.'
    ),
  ];
  const approvalScopeForMaskedShapeCollectionItems = [
    makeItem(
      'APPROVAL_SCOPE_FOR_MASKED_SHAPE_COLLECTION',
      '승인 요청 범위',
      '다음 단계에서 사용자 승인 대상으로 요청할 마스킹 shape 보강 수집 범위를 표시합니다.'
    ),
  ];
  const allowedMaskedShapeDataScopeItems = [
    makeItem(
      'ALLOWED_MASKED_SHAPE_DATA_SCOPE',
      '허용 가능한 마스킹 데이터 범위',
      '다음 단계에서 허용 가능한 마스킹 shape 데이터 범위를 표시합니다.'
    ),
  ];
  const forbiddenDataAndActionScopeItems = [
    makeItem(
      'FORBIDDEN_DATA_AND_ACTION_SCOPE',
      '계속 금지되는 데이터와 작업',
      '다음 단계에서도 계속 금지되는 데이터와 작업 범위를 표시합니다.'
    ),
  ];
  const oneTimeRecallLimitAndTargetScopeItems = [
    makeItem(
      'ONE_TIME_RECALL_LIMIT_AND_TARGET_SCOPE',
      '1회 재조회 제한과 대상 고정 범위',
      '재조회가 필요하더라도 대상 상품번호 6597910207에 대해 최대 1회로 제한됨을 표시합니다.'
    ),
  ];
  const userApprovalPhraseGuidanceItems = [
    makeItem(
      'USER_APPROVAL_PHRASE_GUIDANCE',
      '사용자 승인 문구 안내',
      '실제 수집 전 사용자가 별도로 보내야 할 승인 문구를 read-only로 안내합니다.'
    ),
  ];
  const nextMaskedShapeCollectionFinalGateRoadmapItems = [
    makeItem(
      'NEXT_MASKED_SHAPE_COLLECTION_FINAL_GATE_ROADMAP',
      '다음 Final Gate 로드맵',
      '다음 단계로 마스킹 응답 shape 보강 실행 전 Final Gate를 제안합니다.'
    ),
  ];

  const approvalPacketItems = [
    ...maskedResponseShapeAugmentationApprovalPacketReadinessItems,
    ...task413AugmentationReviewReferenceItems,
    ...approvalScopeForMaskedShapeCollectionItems,
    ...allowedMaskedShapeDataScopeItems,
    ...forbiddenDataAndActionScopeItems,
    ...oneTimeRecallLimitAndTargetScopeItems,
    ...userApprovalPhraseGuidanceItems,
    ...nextMaskedShapeCollectionFinalGateRoadmapItems,
  ];

  return {
    taskId: 414,
    taskName: 'TMS Fast Connection Naver Product Lookup Masked Response Shape Augmentation Approval Packet',
    sourceFastConnectionNaverProductLookupMaskedResponseShapeAugmentationReviewStatus: sourceStatus,
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
    recommendedCurrentApprovalPacketStatus:
      fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,

    recommendedApprovalPacketDecision:
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED',
    recommendedApprovalPacketDecisionLabel:
      'Naver 상품 조회 마스킹 응답 shape 보강 별도 승인 Packet 필요',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedRequiredApprovalPhrase: APPROVAL_PHRASE,
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE',
    recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate',
    recommendedExecutionMode: 'READ_ONLY_APPROVAL_PACKET_NO_COLLECTION',
    recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    actualLiveTestExecutedInTask409: true,
    actualLookupCallCountInTask409: 1,
    actualNaverApiCallInTask414: false,
    actualProductLookupApiCallInTask414: false,
    actualProductLookupApiRecall: false,

    lookupOneTimeSucceeded: augmentationReviewView.lookupOneTimeSucceeded,
    lookupHttpStatusCode: augmentationReviewView.lookupHttpStatusCode,
    lookupActualCallCount: augmentationReviewView.lookupActualCallCount,
    lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    lookupTargetProductNo: '6597910207',
    lookupResponseShapeKeys: augmentationReviewView.lookupResponseShapeKeys,
    lookupProductNoMatched: augmentationReviewView.lookupProductNoMatched,

    maskedResponseShapeAugmentationRequired: true,
    maskedResponseShapeAugmentationReviewPerformed: true,
    maskedShapeAugmentationReviewed: true,
    maskedResponseShapeAugmentationApprovalPacketPrepared: true,
    maskedShapeAugmentationApprovalPacketPrepared: true,
    maskedShapeAugmentationCollectionPerformed: false,
    actualApprovalAccepted: false,
    actualMaskedShapeAugmentationApprovalAccepted: false,

    maxAllowedRecallCountAfterApproval: 1,
    targetProductNoLocked: '6597910207',
    productIdentityFieldMappingRequired: true,
    productIdentityMatchConfirmed: false,
    productUpdateApiEntryAllowedNow: false,
    productUpdateApiEntryDeferred: augmentationReviewView.productUpdateApiEntryDeferred,

    productUpdateApiCallAllowed: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    dbWriteAllowed: false,
    rawResponseDisplayAllowed: false,
    rawResponseStorageAllowed: false,

    actualProductUpdateApiCall: false,
    actualProductUpdateExecuted: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualRuntimeConfiguration: false,
    actualOperatingTransition: false,

    actualEnvReadInTask414: false,
    actualEnvFileOpenInTask414: false,
    actualProcessEnvReadInTask414: false,
    actualSecretAccessInTask414: false,
    actualTokenUseInTask414: false,

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

    approvalPacketGuidance:
      '마스킹 응답 shape 보강은 상품 식별 확정을 위한 최소 정보 수집 단계입니다. 다만 Task 414는 승인 요청 Packet일 뿐이며, 실제 수집과 API 재호출은 수행하지 않습니다. 실제 수집 전에는 사용자의 별도 승인 문구가 필요합니다.',
    approvalScope: APPROVAL_SCOPE,
    outOfScope: OUT_OF_SCOPE,
    allowedMaskedShapeData: augmentationReviewView.allowedMaskedShapeData,
    forbiddenData: augmentationReviewView.forbiddenData,
    approvalPhraseGuidance: APPROVAL_PHRASE,

    maskedResponseShapeAugmentationApprovalPacketReadinessItems,
    task413AugmentationReviewReferenceItems,
    approvalScopeForMaskedShapeCollectionItems,
    allowedMaskedShapeDataScopeItems,
    forbiddenDataAndActionScopeItems,
    oneTimeRecallLimitAndTargetScopeItems,
    userApprovalPhraseGuidanceItems,
    nextMaskedShapeCollectionFinalGateRoadmapItems,

    approvalPacketItems,
    approvalPacketSummaryCards: [
      { label: 'Approval Packet 그룹', value: 8 },
      { label: '승인 요청 범위', value: APPROVAL_SCOPE.length },
      { label: 'Total', value: approvalPacketItems.length },
    ],
    approvalPacketGroupCount: 8,
    totalApprovalPacketItemCount: approvalPacketItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
