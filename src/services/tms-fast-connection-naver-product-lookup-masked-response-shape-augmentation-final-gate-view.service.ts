import {
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
  type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView,
} from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-approval-packet-view.service';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_OPTIONAL'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateGroup =
  | 'MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READINESS'
  | 'TASK_414_APPROVAL_PACKET_REFERENCE'
  | 'EXPLICIT_APPROVAL_PHRASE_PENDING_GATE'
  | 'ONE_TIME_RECALL_TARGET_AND_COUNT_LOCK_GATE'
  | 'ALLOWED_MASKED_SHAPE_DATA_FINAL_GATE'
  | 'FORBIDDEN_DATA_AND_ACTION_FINAL_GATE'
  | 'NO_COLLECTION_NO_API_RECALL_CURRENT_TASK_GATE'
  | 'NEXT_ACTUAL_MASKED_SHAPE_COLLECTION_ROADMAP';

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem {
  finalGateItemId: string;
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView {
  taskId: 415;
  taskName: string;
  sourceFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus;
  fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus;
  recommendedCurrentFinalGateStatus: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus;

  recommendedFinalGateDecision: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL';
  recommendedFinalGateDecisionLabel:
    'Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate - 별도 승인 대기';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedRequiredApprovalPhrase: 'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION';
  recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 실제 수집';
  recommendedExecutionMode: 'READ_ONLY_FINAL_GATE_NO_COLLECTION';
  recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  actualLiveTestExecutedInTask409: true;
  actualLookupCallCountInTask409: 1;
  actualNaverApiCallInTask415: false;
  actualProductLookupApiCallInTask415: false;
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
  maskedResponseShapeAugmentationFinalGatePrepared: true;
  maskedShapeAugmentationFinalGatePrepared: true;
  maskedShapeAugmentationCollectionPerformed: false;

  requiredApprovalPhrase: 'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';
  explicitApprovalPhraseReceived: false;
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

  actualEnvReadInTask415: false;
  actualEnvFileOpenInTask415: false;
  actualProcessEnvReadInTask415: false;
  actualSecretAccessInTask415: false;
  actualTokenUseInTask415: false;

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

  finalGateGuidance: string;
  allowedAfterExplicitApproval: string[];
  stillForbiddenAfterApproval: string[];
  allowedMaskedShapeData: string[];
  forbiddenData: string[];

  maskedResponseShapeAugmentationFinalGateReadinessItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  task414ApprovalPacketReferenceItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  explicitApprovalPhrasePendingGateItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  oneTimeRecallTargetAndCountLockGateItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  allowedMaskedShapeDataFinalGateItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  forbiddenDataAndActionFinalGateItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  noCollectionNoApiRecallCurrentTaskGateItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  nextActualMaskedShapeCollectionRoadmapItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];

  finalGateItems: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem[];
  finalGateSummaryCards: { label: string; value: number }[];
  finalGateGroupCount: number;
  totalFinalGateItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateRoadmapItem[];
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus,
  TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_REQUIRED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_OPTIONAL:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_OPTIONAL',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_APPROVAL_PACKET_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_NOT_STARTED',
};

const REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';

const ALLOWED_AFTER_EXPLICIT_APPROVAL = [
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

const STILL_FORBIDDEN_AFTER_APPROVAL = [
  '상품 수정 API 호출',
  '가격 변경',
  '재고 변경',
  'DB write',
  'raw response 전체 표시',
  'raw response 전체 저장',
  'full product name 표시',
  'full option name 표시',
  'full seller management code 표시',
  'clientSecret 표시',
  'accessToken 표시',
  'authorizationHeader 표시',
  'signature 표시',
  '반복 조회',
  '다른 상품번호 조회',
];

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateRoadmapItem[] =
  [
    { taskId: 415, label: 'Task 415 - Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate' },
    { taskId: 416, label: 'Task 416 - Naver 상품 조회 마스킹 응답 shape 보강 실제 수집' },
  ];

function makeItem(
  group: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateItem {
  return {
    finalGateItemId: `masked-shape-final-gate-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView(
  approvalPacketView: TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketView
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateView {
  const sourceStatus =
    approvalPacketView.fastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus;
  const fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus =
    STATUS_MAP[sourceStatus];

  const maskedResponseShapeAugmentationFinalGateReadinessItems = [
    makeItem(
      'MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_READINESS',
      'Final Gate 화면 준비도',
      '마스킹 응답 shape 보강 실행 전 Final Gate 화면이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task414ApprovalPacketReferenceItems = [
    makeItem(
      'TASK_414_APPROVAL_PACKET_REFERENCE',
      'Task 414 승인 Packet 참조',
      'Task 414의 승인 요청 범위와 승인 문구 안내를 참조합니다.'
    ),
  ];
  const explicitApprovalPhrasePendingGateItems = [
    makeItem(
      'EXPLICIT_APPROVAL_PHRASE_PENDING_GATE',
      '승인 문구 대기 게이트',
      '실제 수집 전 필요한 승인 문구가 아직 확인되지 않았음을 표시합니다.'
    ),
  ];
  const oneTimeRecallTargetAndCountLockGateItems = [
    makeItem(
      'ONE_TIME_RECALL_TARGET_AND_COUNT_LOCK_GATE',
      '상품번호 및 1회 재조회 잠금 게이트',
      '승인 이후에도 대상 상품번호 6597910207, 최대 1회 재조회만 허용됨을 표시합니다.'
    ),
  ];
  const allowedMaskedShapeDataFinalGateItems = [
    makeItem(
      'ALLOWED_MASKED_SHAPE_DATA_FINAL_GATE',
      '허용 데이터 최종 게이트',
      '허용 가능한 마스킹 shape 데이터 범위를 최종 확인합니다.'
    ),
  ];
  const forbiddenDataAndActionFinalGateItems = [
    makeItem(
      'FORBIDDEN_DATA_AND_ACTION_FINAL_GATE',
      '금지 데이터 및 작업 최종 게이트',
      '금지 데이터와 금지 작업을 최종 확인합니다.'
    ),
  ];
  const noCollectionNoApiRecallCurrentTaskGateItems = [
    makeItem(
      'NO_COLLECTION_NO_API_RECALL_CURRENT_TASK_GATE',
      '이번 Task 비실행 게이트',
      '이번 Task에서는 실제 수집과 API 재호출이 없음을 표시합니다.'
    ),
  ];
  const nextActualMaskedShapeCollectionRoadmapItems = [
    makeItem(
      'NEXT_ACTUAL_MASKED_SHAPE_COLLECTION_ROADMAP',
      '다음 실제 수집 로드맵',
      '다음 단계로 마스킹 응답 shape 보강 실제 수집 방향을 제안합니다.'
    ),
  ];

  const finalGateItems = [
    ...maskedResponseShapeAugmentationFinalGateReadinessItems,
    ...task414ApprovalPacketReferenceItems,
    ...explicitApprovalPhrasePendingGateItems,
    ...oneTimeRecallTargetAndCountLockGateItems,
    ...allowedMaskedShapeDataFinalGateItems,
    ...forbiddenDataAndActionFinalGateItems,
    ...noCollectionNoApiRecallCurrentTaskGateItems,
    ...nextActualMaskedShapeCollectionRoadmapItems,
  ];

  return {
    taskId: 415,
    taskName: 'TMS Fast Connection Naver Product Lookup Masked Response Shape Augmentation Final Gate',
    sourceFastConnectionNaverProductLookupMaskedResponseShapeAugmentationApprovalPacketStatus: sourceStatus,
    fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,
    recommendedCurrentFinalGateStatus:
      fastConnectionNaverProductLookupMaskedResponseShapeAugmentationFinalGateStatus,

    recommendedFinalGateDecision:
      'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_FINAL_GATE_PENDING_EXPLICIT_APPROVAL',
    recommendedFinalGateDecisionLabel:
      'Naver 상품 조회 마스킹 응답 shape 보강 실행 전 Final Gate - 별도 승인 대기',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedRequiredApprovalPhrase: REQUIRED_APPROVAL_PHRASE,
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_ACTUAL_COLLECTION',
    recommendedNextStepLabel: 'Naver 상품 조회 마스킹 응답 shape 보강 실제 수집',
    recommendedExecutionMode: 'READ_ONLY_FINAL_GATE_NO_COLLECTION',
    recommendedDeploymentMode: 'UPDATE_API_ENTRY_STILL_DEFERRED_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_MASKED_SHAPE_AUGMENTATION_APPROVAL',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    actualLiveTestExecutedInTask409: true,
    actualLookupCallCountInTask409: 1,
    actualNaverApiCallInTask415: false,
    actualProductLookupApiCallInTask415: false,
    actualProductLookupApiRecall: false,

    lookupOneTimeSucceeded: approvalPacketView.lookupOneTimeSucceeded,
    lookupHttpStatusCode: approvalPacketView.lookupHttpStatusCode,
    lookupActualCallCount: approvalPacketView.lookupActualCallCount,
    lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    lookupTargetProductNo: '6597910207',
    lookupResponseShapeKeys: approvalPacketView.lookupResponseShapeKeys,
    lookupProductNoMatched: approvalPacketView.lookupProductNoMatched,

    maskedResponseShapeAugmentationRequired: true,
    maskedResponseShapeAugmentationReviewPerformed: true,
    maskedShapeAugmentationReviewed: true,
    maskedResponseShapeAugmentationApprovalPacketPrepared: true,
    maskedShapeAugmentationApprovalPacketPrepared: true,
    maskedResponseShapeAugmentationFinalGatePrepared: true,
    maskedShapeAugmentationFinalGatePrepared: true,
    maskedShapeAugmentationCollectionPerformed: false,

    requiredApprovalPhrase: REQUIRED_APPROVAL_PHRASE,
    explicitApprovalPhraseReceived: false,
    actualApprovalAccepted: false,
    actualMaskedShapeAugmentationApprovalAccepted: false,

    maxAllowedRecallCountAfterApproval: 1,
    targetProductNoLocked: '6597910207',
    productIdentityFieldMappingRequired: true,
    productIdentityMatchConfirmed: false,
    productUpdateApiEntryAllowedNow: false,
    productUpdateApiEntryDeferred: approvalPacketView.productUpdateApiEntryDeferred,

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

    actualEnvReadInTask415: false,
    actualEnvFileOpenInTask415: false,
    actualProcessEnvReadInTask415: false,
    actualSecretAccessInTask415: false,
    actualTokenUseInTask415: false,

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

    finalGateGuidance:
      'Task 415는 마스킹 응답 shape 보강 수집 실행 전 Final Gate입니다. 사용자의 별도 승인 문구가 아직 확인되지 않았으므로 실제 수집과 API 재호출은 계속 잠겨 있습니다. 다음 단계에서 승인 문구가 확인되어도 허용 범위는 상품번호 6597910207 재조회 최대 1회와 마스킹 shape 수집으로만 제한됩니다.',
    allowedAfterExplicitApproval: ALLOWED_AFTER_EXPLICIT_APPROVAL,
    stillForbiddenAfterApproval: STILL_FORBIDDEN_AFTER_APPROVAL,
    allowedMaskedShapeData: approvalPacketView.allowedMaskedShapeData,
    forbiddenData: approvalPacketView.forbiddenData,

    maskedResponseShapeAugmentationFinalGateReadinessItems,
    task414ApprovalPacketReferenceItems,
    explicitApprovalPhrasePendingGateItems,
    oneTimeRecallTargetAndCountLockGateItems,
    allowedMaskedShapeDataFinalGateItems,
    forbiddenDataAndActionFinalGateItems,
    noCollectionNoApiRecallCurrentTaskGateItems,
    nextActualMaskedShapeCollectionRoadmapItems,

    finalGateItems,
    finalGateSummaryCards: [
      { label: 'Final Gate 그룹', value: 8 },
      { label: '승인 이후 허용 범위', value: ALLOWED_AFTER_EXPLICIT_APPROVAL.length },
      { label: 'Total', value: finalGateItems.length },
    ],
    finalGateGroupCount: 8,
    totalFinalGateItemCount: finalGateItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
