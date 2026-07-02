import {
  type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
  type TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView,
} from './tms-fast-connection-naver-product-lookup-one-time-result-evidence-view.service';

export type TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED';

export type TmsFastConnectionNaverProductUpdateApiEntryDecisionGroup =
  | 'PRODUCT_UPDATE_API_ENTRY_DECISION_READINESS'
  | 'TASK_410_LOOKUP_RESULT_EVIDENCE_REFERENCE'
  | 'LOOKUP_SUCCESS_BUT_PRODUCT_IDENTITY_PENDING_DECISION'
  | 'PRODUCT_NO_MATCHED_NULL_INTERPRETATION'
  | 'PRODUCT_UPDATE_API_ENTRY_DEFERRED_GUARD'
  | 'PRICE_STOCK_DB_WRITE_STILL_BLOCKED_GUARD'
  | 'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_EVIDENCE'
  | 'NEXT_PRODUCT_IDENTITY_FIELD_MAPPING_ROADMAP';

export interface TmsFastConnectionNaverProductUpdateApiEntryDecisionItem {
  entryDecisionItemId: string;
  group: TmsFastConnectionNaverProductUpdateApiEntryDecisionGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductUpdateApiEntryDecisionRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductUpdateApiEntryDecisionView {
  taskId: 411;
  taskName: string;
  sourceFastConnectionNaverProductLookupOneTimeResultEvidenceStatus: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus;
  fastConnectionNaverProductUpdateApiEntryDecisionStatus: TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus;

  recommendedEntryDecision: 'NAVER_PRODUCT_UPDATE_API_ENTRY_DEFERRED_PENDING_PRODUCT_IDENTITY';
  recommendedEntryDecisionLabel: '상품 수정 API 진입 보류 - 상품 식별 필드 확정 필요';
  recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품';
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW';
  recommendedNextStepLabel: 'Naver 상품 조회 응답 상품 식별 필드 매핑 검토';
  recommendedExecutionMode: 'READ_ONLY_ENTRY_DECISION_NO_API_RECALL';
  recommendedDeploymentMode: 'UPDATE_API_ENTRY_DEFERRED_NO_UPDATE_NO_DB_WRITE';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_CONFIRMED';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;
  primaryGoalAchieved: true;

  actualLiveTestExecutedInTask409: true;
  actualLookupCallCountInTask409: 1;
  actualNaverApiCallInTask411: false;
  actualProductLookupApiCallInTask411: false;
  actualProductLookupApiRecall: false;

  lookupOneTimeSucceeded: boolean;
  lookupHttpStatusCode: number | null;
  lookupActualCallCount: number;
  lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  lookupTargetProductNo: '6597910207';
  lookupResponseShapeKeys: string[];
  lookupProductNoMatched: boolean | null;

  productUpdateApiEntryDecisionMade: true;
  productUpdateApiEntryAllowedNow: false;
  productUpdateApiEntryDeferred: boolean;
  productUpdateApiEntryDeferredReason: string | null;
  productIdentityFieldMappingRequired: boolean;
  maskedResponseShapeReviewRequired: boolean;
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

  actualEnvReadInTask411: false;
  actualEnvFileOpenInTask411: false;
  actualProcessEnvReadInTask411: false;
  actualSecretAccessInTask411: false;
  actualTokenUseInTask411: false;

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

  entryDecisionGuidance: string;
  productNoMatchedNullInterpretationGuidance: string;

  productUpdateApiEntryDecisionReadinessItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  task410LookupResultEvidenceReferenceItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  lookupSuccessButProductIdentityPendingDecisionItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  productNoMatchedNullInterpretationItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  productUpdateApiEntryDeferredGuardItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  priceStockDbWriteStillBlockedGuardItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  rawResponseSecretTokenNonExposureEvidenceItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  nextProductIdentityFieldMappingRoadmapItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];

  entryDecisionItems: TmsFastConnectionNaverProductUpdateApiEntryDecisionItem[];
  entryDecisionSummaryCards: { label: string; value: number }[];
  entryDecisionGroupCount: number;
  totalEntryDecisionItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductUpdateApiEntryDecisionRoadmapItem[];
}

function computeEntryDecisionStatus(
  resultEvidenceStatus: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceStatus,
  productNoMatched: boolean | null
): TmsFastConnectionNaverProductUpdateApiEntryDecisionStatus {
  switch (resultEvidenceStatus) {
    case 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_SUCCESS_CONFIRMED':
      return productNoMatched === true
        ? 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_ALLOWED_FOR_FUTURE_REVIEW'
        : 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY';
    case 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_FAILED_CONFIRMED':
      return 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED';
    case 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_READY':
      return 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_READY';
    case 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_BLOCKED':
      return 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_BLOCKED';
    case 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_RESULT_EVIDENCE_NOT_STARTED':
      return 'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_NOT_STARTED';
    default: {
      const exhaustiveCheck: never = resultEvidenceStatus;
      throw new Error(`Unhandled result evidence status: ${String(exhaustiveCheck)}`);
    }
  }
}

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductUpdateApiEntryDecisionRoadmapItem[] = [
  { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
  { taskId: 412, label: 'Task 412 - Naver 상품 조회 응답 상품 식별 필드 매핑 검토 화면' },
];

function makeItem(
  group: TmsFastConnectionNaverProductUpdateApiEntryDecisionGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductUpdateApiEntryDecisionItem {
  return {
    entryDecisionItemId: `product-update-api-entry-decision-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductUpdateApiEntryDecisionView(
  resultEvidenceView: TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView
): TmsFastConnectionNaverProductUpdateApiEntryDecisionView {
  const sourceStatus = resultEvidenceView.fastConnectionNaverProductLookupOneTimeResultEvidenceStatus;
  const productNoMatched = resultEvidenceView.productNoMatched;
  const fastConnectionNaverProductUpdateApiEntryDecisionStatus = computeEntryDecisionStatus(
    sourceStatus,
    productNoMatched
  );

  const productUpdateApiEntryDeferred =
    fastConnectionNaverProductUpdateApiEntryDecisionStatus ===
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY';

  const productUpdateApiEntryDeferredReason = productUpdateApiEntryDeferred
    ? 'PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_EVIDENCE'
    : null;

  const productUpdateApiEntryDecisionReadinessItems = [
    makeItem(
      'PRODUCT_UPDATE_API_ENTRY_DECISION_READINESS',
      '상품 수정 API 진입 판단 화면 준비도',
      '상품 수정 API 진입 판단 화면이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task410LookupResultEvidenceReferenceItems = [
    makeItem(
      'TASK_410_LOOKUP_RESULT_EVIDENCE_REFERENCE',
      'Task 410 결과 증적 참조',
      'Task 410 결과 증적을 read-only로 참조합니다.'
    ),
  ];
  const lookupSuccessButProductIdentityPendingDecisionItems = [
    makeItem(
      'LOOKUP_SUCCESS_BUT_PRODUCT_IDENTITY_PENDING_DECISION',
      '조회 성공, 상품 식별 확정 보류',
      '조회는 성공했지만 상품 식별 확정이 아직 pending임을 표시합니다.'
    ),
  ];
  const productNoMatchedNullInterpretationItems = [
    makeItem(
      'PRODUCT_NO_MATCHED_NULL_INTERPRETATION',
      'productNoMatched null 해석',
      'productNoMatched null의 의미와 위험성을 표시합니다.'
    ),
  ];
  const productUpdateApiEntryDeferredGuardItems = [
    makeItem(
      'PRODUCT_UPDATE_API_ENTRY_DEFERRED_GUARD',
      '상품 수정 API 진입 보류 가드',
      '상품 수정 API 진입을 현 단계에서 보류함을 표시합니다.'
    ),
  ];
  const priceStockDbWriteStillBlockedGuardItems = [
    makeItem(
      'PRICE_STOCK_DB_WRITE_STILL_BLOCKED_GUARD',
      '가격/재고/DB write 계속 금지 가드',
      '가격/재고/DB write가 계속 금지됨을 표시합니다.'
    ),
  ];
  const rawResponseSecretTokenNonExposureEvidenceItems = [
    makeItem(
      'RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_EVIDENCE',
      'raw response/secret/token 미노출 증적',
      'raw response, secret, token, header, signature 미노출 증적을 표시합니다.'
    ),
  ];
  const nextProductIdentityFieldMappingRoadmapItems = [
    makeItem(
      'NEXT_PRODUCT_IDENTITY_FIELD_MAPPING_ROADMAP',
      '다음 상품 식별 필드 매핑 로드맵',
      '다음 단계로 상품 식별 필드 매핑/마스킹 shape 보정 검토를 제안합니다.'
    ),
  ];

  const entryDecisionItems = [
    ...productUpdateApiEntryDecisionReadinessItems,
    ...task410LookupResultEvidenceReferenceItems,
    ...lookupSuccessButProductIdentityPendingDecisionItems,
    ...productNoMatchedNullInterpretationItems,
    ...productUpdateApiEntryDeferredGuardItems,
    ...priceStockDbWriteStillBlockedGuardItems,
    ...rawResponseSecretTokenNonExposureEvidenceItems,
    ...nextProductIdentityFieldMappingRoadmapItems,
  ];

  return {
    taskId: 411,
    taskName: 'TMS Fast Connection Naver Product Update Api Entry Decision',
    sourceFastConnectionNaverProductLookupOneTimeResultEvidenceStatus: sourceStatus,
    fastConnectionNaverProductUpdateApiEntryDecisionStatus,

    recommendedEntryDecision: 'NAVER_PRODUCT_UPDATE_API_ENTRY_DEFERRED_PENDING_PRODUCT_IDENTITY',
    recommendedEntryDecisionLabel: '상품 수정 API 진입 보류 - 상품 식별 필드 확정 필요',
    recommendedPrimaryGoalAchieved: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedLookupEvidenceStatus: 'LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품',
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW',
    recommendedNextStepLabel: 'Naver 상품 조회 응답 상품 식별 필드 매핑 검토',
    recommendedExecutionMode: 'READ_ONLY_ENTRY_DECISION_NO_API_RECALL',
    recommendedDeploymentMode: 'UPDATE_API_ENTRY_DEFERRED_NO_UPDATE_NO_DB_WRITE',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_CONFIRMED',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,
    primaryGoalAchieved: true,

    actualLiveTestExecutedInTask409: true,
    actualLookupCallCountInTask409: 1,
    actualNaverApiCallInTask411: false,
    actualProductLookupApiCallInTask411: false,
    actualProductLookupApiRecall: false,

    lookupOneTimeSucceeded: resultEvidenceView.success,
    lookupHttpStatusCode: resultEvidenceView.httpStatusCode,
    lookupActualCallCount: resultEvidenceView.actualLookupCallCount,
    lookupTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    lookupTargetProductNo: '6597910207',
    lookupResponseShapeKeys: resultEvidenceView.responseShapeKeys,
    lookupProductNoMatched: productNoMatched,

    productUpdateApiEntryDecisionMade: true,
    productUpdateApiEntryAllowedNow: false,
    productUpdateApiEntryDeferred,
    productUpdateApiEntryDeferredReason,
    productIdentityFieldMappingRequired: productUpdateApiEntryDeferred,
    maskedResponseShapeReviewRequired: productUpdateApiEntryDeferred,
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

    actualEnvReadInTask411: false,
    actualEnvFileOpenInTask411: false,
    actualProcessEnvReadInTask411: false,
    actualSecretAccessInTask411: false,
    actualTokenUseInTask411: false,

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

    entryDecisionGuidance:
      '상품 조회 API 1회는 HTTP 200으로 성공했지만, productNoMatched가 null이므로 상품 수정 API 진입은 아직 보류합니다. 다음 단계에서 마스킹된 응답 shape와 상품 식별 필드 매핑을 검토한 뒤 update API 진입 여부를 다시 판단해야 합니다.',
    productNoMatchedNullInterpretationGuidance:
      'productNoMatched null은 조회 실패를 의미하지 않습니다. Task 409에서 HTTP 200 성공과 originProduct/smartstoreChannelProduct 구조는 확인되었습니다. 그러나 현재 masked evidence만으로는 API 응답 안의 어떤 필드가 대상 상품번호 6597910207과 안전하게 대응되는지 확정하지 못했습니다. 상품 수정 API는 상품 식별이 정확해야 하므로, 현 단계에서 update API 진입은 보류합니다.',

    productUpdateApiEntryDecisionReadinessItems,
    task410LookupResultEvidenceReferenceItems,
    lookupSuccessButProductIdentityPendingDecisionItems,
    productNoMatchedNullInterpretationItems,
    productUpdateApiEntryDeferredGuardItems,
    priceStockDbWriteStillBlockedGuardItems,
    rawResponseSecretTokenNonExposureEvidenceItems,
    nextProductIdentityFieldMappingRoadmapItems,

    entryDecisionItems,
    entryDecisionSummaryCards: [
      { label: 'Entry Decision 그룹', value: 8 },
      { label: '조회 성공 확인', value: resultEvidenceView.success ? 1 : 0 },
      { label: 'Total', value: entryDecisionItems.length },
    ],
    entryDecisionGroupCount: 8,
    totalEntryDecisionItemCount: entryDecisionItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,
  };
}
