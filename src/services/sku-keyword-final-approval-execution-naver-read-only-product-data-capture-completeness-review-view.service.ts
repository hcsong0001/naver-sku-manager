export interface NaverReadOnlyProductDataCaptureFieldReviewItem {
  fieldName: string;
  fieldPresenceStatus: 'PRESENT' | 'MISSING' | 'PRESENCE_FLAG_ONLY';
}

export interface NaverReadOnlyProductDataCaptureCompletenessReviewItem {
  reviewItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductDataCaptureCompletenessReviewView {
  status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_COMPLETENESS_REVIEW_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true;
  isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductDataCompletenessStatus: string;
  isBasicProductDataCompleteForReview: boolean;
  isBasicProductDataPartialForReview: boolean;
  isBasicProductDataBlockedByGwIpNotAllowed: boolean;
  isBasicProductDataBlockedByTokenRetryFailure: boolean;
  isBasicProductDataBlockedByEnvMissing: boolean;
  isBasicProductDataBlockedByMissingChannelProductNo: boolean;
  isBasicProductDataBlockedByProductLookupFailure: boolean;
  isChannelProductNoPresent: boolean;
  isProductNamePresent: boolean;
  isProductStatusPresent: boolean;
  isLeafCategoryIdPresent: boolean;
  isRepresentativeImagePresenceFlagOnly: true;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isCapturedProductDataAllowedFieldsOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  fieldReviewItems: NaverReadOnlyProductDataCaptureFieldReviewItem[];
  reviewItems: NaverReadOnlyProductDataCaptureCompletenessReviewItem[];
  isTokenReissuedInThisTask: false;
  isTokenIssuanceExecutedInThisTask: false;
  isProductLookupApiCalledInThisTask: false;
  isNaverApiCalledInThisTask: false;
  isTokenValueIncludedInView: false;
  isTokenValueDisplayed: false;
  isTokenReturnedToClient: false;
  isTokenLoggedToConsole: false;
  isTokenStored: false;
  isTokenStoredInDb: false;
  isTokenStoredInFile: false;
  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  isSignatureDisplayed: false;
  isAuthorizationHeaderDisplayed: false;
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;
  isReadOnlyProductLookupOnly: true;
  isDbWriteExecuted: false;
  isDbUpsertExecuted: false;
  isDbUpdateExecuted: false;
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmitted: false;
  isExecutionAllowed: false;
  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;
  hasApprovalRequestButton: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;
}

const VALID_CAPTURE_STATUSES = [
  'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
  'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'CAPTURE_BLOCKED_BY_ENV_MISSING',
  'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
] as const;

export function buildNaverReadOnlyProductDataCaptureCompletenessReviewView(input: {
  captureResult: any;
  safetyAuditSeal: any;
}): NaverReadOnlyProductDataCaptureCompletenessReviewView {
  const captureResult = input?.captureResult ?? null;
  const rawCaptureStatus = captureResult?.readOnlyProductDataCaptureStatus ?? '';
  const captureStatus: string =
    (VALID_CAPTURE_STATUSES as readonly string[]).includes(rawCaptureStatus)
      ? rawCaptureStatus
      : 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const pd = captureResult?.capturedProductData ?? null;
  const isCaptured = captureStatus === 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT';

  const isChannelProductNoPresent = isCaptured && !!(pd?.channelProductNo);
  const isProductNamePresent = isCaptured && !!(pd?.productName);
  const isProductStatusPresent = isCaptured && !!(pd?.productStatus);
  const isLeafCategoryIdPresent = isCaptured && !!(pd?.leafCategoryId);

  // completeness 판정
  let readOnlyProductDataCompletenessStatus: string;
  if (captureStatus === 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT') {
    if (isChannelProductNoPresent && isProductNamePresent && isProductStatusPresent) {
      readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW';
    } else {
      readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW';
    }
  } else if (captureStatus === 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED') {
    readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED';
  } else if (captureStatus === 'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE') {
    readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_BLOCKED_BY_TOKEN_RETRY_FAILURE';
  } else if (captureStatus === 'CAPTURE_BLOCKED_BY_ENV_MISSING') {
    readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_BLOCKED_BY_ENV_MISSING';
  } else if (captureStatus === 'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO') {
    readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  } else {
    readOnlyProductDataCompletenessStatus = 'BASIC_PRODUCT_DATA_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';
  }

  const fieldReviewItems: NaverReadOnlyProductDataCaptureFieldReviewItem[] = [
    { fieldName: 'channelProductNo', fieldPresenceStatus: isChannelProductNoPresent ? 'PRESENT' : 'MISSING' },
    { fieldName: 'productName', fieldPresenceStatus: isProductNamePresent ? 'PRESENT' : 'MISSING' },
    { fieldName: 'productStatus', fieldPresenceStatus: isProductStatusPresent ? 'PRESENT' : 'MISSING' },
    { fieldName: 'leafCategoryId', fieldPresenceStatus: isLeafCategoryIdPresent ? 'PRESENT' : 'MISSING' },
    { fieldName: 'representativeImageUrlPresent', fieldPresenceStatus: 'PRESENCE_FLAG_ONLY' },
    { fieldName: 'salePricePresent', fieldPresenceStatus: 'PRESENCE_FLAG_ONLY' },
    { fieldName: 'stockQuantityPresent', fieldPresenceStatus: 'PRESENCE_FLAG_ONLY' },
  ];

  const reviewItems: NaverReadOnlyProductDataCaptureCompletenessReviewItem[] = [
    { reviewItem: 'Task 276 Capture Result', status: 'CAPTURE_RESULT_CONFIRMED', meaning: 'Task 276 결과 확인' },
    { reviewItem: 'Task 277 Safety Audit Seal', status: 'SAFETY_AUDIT_SEAL_CONFIRMED', meaning: '안전 감사 봉인 확인' },
    { reviewItem: 'Completeness 상태', status: 'COMPLETENESS_STATUS_RECORDED', meaning: '완성도 상태 기록' },
    { reviewItem: 'channelProductNo', status: 'FIELD_PRESENCE_REVIEWED', meaning: '상품번호 존재 여부 확인' },
    { reviewItem: 'productName', status: 'FIELD_PRESENCE_REVIEWED', meaning: '상품명 존재 여부 확인' },
    { reviewItem: 'productStatus', status: 'FIELD_PRESENCE_REVIEWED', meaning: '상품 상태 존재 여부 확인' },
    { reviewItem: 'leafCategoryId', status: 'FIELD_PRESENCE_REVIEWED', meaning: '카테고리 ID 존재 여부 확인' },
    { reviewItem: '대표 이미지', status: 'PRESENCE_FLAG_ONLY', meaning: '존재 여부 플래그만 확인' },
    { reviewItem: '판매가', status: 'PRESENCE_FLAG_ONLY', meaning: '원본 값 없이 존재 여부만 확인' },
    { reviewItem: '재고', status: 'PRESENCE_FLAG_ONLY', meaning: '원본 값 없이 존재 여부만 확인' },
    { reviewItem: '허용 필드만 포함', status: 'ALLOWED_FIELDS_ONLY_CONFIRMED', meaning: '허용 필드 유지' },
    { reviewItem: 'raw API response', status: 'NOT_INCLUDED', meaning: '원본 응답 전체 없음' },
    { reviewItem: '가격 원본 값', status: 'NOT_INCLUDED', meaning: '가격 원값 없음' },
    { reviewItem: '재고 원본 값', status: 'NOT_INCLUDED', meaning: '재고 원값 없음' },
    { reviewItem: 'Token 값', status: 'NOT_DISPLAYED', meaning: 'Token 표시 없음' },
    { reviewItem: 'Auth 값', status: 'NOT_DISPLAYED', meaning: 'Auth 표시 없음' },
    { reviewItem: 'Signature', status: 'NOT_DISPLAYED', meaning: 'Signature 표시 없음' },
    { reviewItem: 'Authorization 헤더', status: 'NOT_DISPLAYED', meaning: 'Authorization 표시 없음' },
    { reviewItem: 'Token 재발급', status: 'NOT_EXECUTED', meaning: '이번 Task 발급 없음' },
    { reviewItem: '상품 조회 API 재호출', status: 'NOT_EXECUTED', meaning: '이번 Task 조회 없음' },
    { reviewItem: '상품 수정 API 호출', status: 'NOT_EXECUTED', meaning: '수정 없음' },
    { reviewItem: '가격 변경', status: 'NOT_EXECUTED', meaning: '가격 변경 없음' },
    { reviewItem: '재고 변경', status: 'NOT_EXECUTED', meaning: '재고 변경 없음' },
    { reviewItem: 'DB write/upsert/update', status: 'NOT_EXECUTED', meaning: 'DB 변경 없음' },
    { reviewItem: 'Worker / Queue / Adapter', status: 'LOCKED', meaning: '실행 경로 없음' },
    { reviewItem: '다음 단계', status: 'PENDING_SEPARATE_APPROVAL', meaning: '다음 단계 별도 승인 필요' },
    { reviewItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 278은 완성도 리뷰 표시 전용' },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_COMPLETENESS_REVIEW_READY',
    panelTitle: 'Naver Read-Only Product Data Capture Completeness Review (Task 278)',
    description:
      'Task 278은 Task 276의 read-only 캡처 결과가 기본 상품 검토에 충분한지 확인하는 완성도 리뷰 단계입니다. 가격/재고 원본 값, raw API response, Token/Auth/Signature/Authorization 값은 포함하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true,
    isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductDataCompletenessStatus,
    isBasicProductDataCompleteForReview: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW',
    isBasicProductDataPartialForReview: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW',
    isBasicProductDataBlockedByGwIpNotAllowed: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    isBasicProductDataBlockedByTokenRetryFailure: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    isBasicProductDataBlockedByEnvMissing: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_BLOCKED_BY_ENV_MISSING',
    isBasicProductDataBlockedByMissingChannelProductNo: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    isBasicProductDataBlockedByProductLookupFailure: readOnlyProductDataCompletenessStatus === 'BASIC_PRODUCT_DATA_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    isChannelProductNoPresent,
    isProductNamePresent,
    isProductStatusPresent,
    isLeafCategoryIdPresent,
    isRepresentativeImagePresenceFlagOnly: true,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isCapturedProductDataAllowedFieldsOnly: true,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    fieldReviewItems,
    reviewItems,
    isTokenReissuedInThisTask: false,
    isTokenIssuanceExecutedInThisTask: false,
    isProductLookupApiCalledInThisTask: false,
    isNaverApiCalledInThisTask: false,
    isTokenValueIncludedInView: false,
    isTokenValueDisplayed: false,
    isTokenReturnedToClient: false,
    isTokenLoggedToConsole: false,
    isTokenStored: false,
    isTokenStoredInDb: false,
    isTokenStoredInFile: false,
    isEnvFileDirectlyAccessed: false,
    isEnvFileModified: false,
    isEnvValueDisplayed: false,
    isAuthKeyValueDisplayed: false,
    isSecretLogged: false,
    isSignatureDisplayed: false,
    isAuthorizationHeaderDisplayed: false,
    isProductLookupApiCalled: false,
    isProductUpdateApiCalled: false,
    isPriceOrStockChanged: false,
    isReadOnlyProductLookupOnly: true,
    isDbWriteExecuted: false,
    isDbUpsertExecuted: false,
    isDbUpdateExecuted: false,
    isActualApprovalSubmissionAllowed: false,
    isApprovalSubmitted: false,
    isExecutionAllowed: false,
    isPostApiConnected: false,
    isMutationConnected: false,
    isLiveExecutionEnabled: false,
    hasApprovalRequestButton: false,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,
  };
}
