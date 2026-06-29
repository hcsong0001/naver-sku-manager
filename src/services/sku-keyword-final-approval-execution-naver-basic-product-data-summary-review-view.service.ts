export interface NaverBasicProductDataSummary {
  channelProductNo: string | null;
  productName: string | null;
  productStatus: string | null;
  leafCategoryId: string | null;
  salePricePresent: boolean;
  stockQuantityPresent: boolean;
  representativeImageUrlPresent: boolean;
}

export interface NaverBasicProductDataSummaryReviewItem {
  reviewItem: string;
  status: string;
  meaning: string;
}

export interface NaverBasicProductDataSummaryReviewView {
  status: 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverBasicProductDataSummaryReviewApprovalPacketReady: true;
  isNaverReadOnlyProductDataCompletenessCertificationReady: true;
  isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true;
  isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  basicProductDataSummaryReviewStatus: string;
  isSummaryReviewComplete: boolean;
  isSummaryReviewWithMissingFieldNotice: boolean;
  isSummaryReviewBlockedByGwIpNotAllowed: boolean;
  isSummaryReviewBlockedByTokenRetryFailure: boolean;
  isSummaryReviewBlockedByEnvMissing: boolean;
  isSummaryReviewBlockedByMissingChannelProductNo: boolean;
  isSummaryReviewBlockedByProductLookupFailure: boolean;
  isBasicProductDataSummaryAvailable: boolean;
  basicProductDataSummary: NaverBasicProductDataSummary | null;
  isCapturedDataUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  reviewItems: NaverBasicProductDataSummaryReviewItem[];
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

const PACKET_TO_SUMMARY: Record<string, string> = {
  APPROVAL_PACKET_READY_FOR_COMPLETE_DATA: 'SUMMARY_REVIEW_COMPLETE',
  APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE: 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE',
  APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED: 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE: 'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING: 'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
  APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO: 'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE: 'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

export function buildNaverBasicProductDataSummaryReviewView(input: {
  approvalPacketView: any;
  captureResult: any;
}): NaverBasicProductDataSummaryReviewView {
  const packetView = input?.approvalPacketView ?? null;
  const rawPacketStatus = packetView?.basicProductDataSummaryReviewApprovalPacketStatus ?? '';
  const packetStatus: string =
    rawPacketStatus in PACKET_TO_SUMMARY
      ? rawPacketStatus
      : 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const basicProductDataSummaryReviewStatus =
    PACKET_TO_SUMMARY[packetStatus] ?? 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const isAvailable =
    basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_COMPLETE' ||
    basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE';

  const captureResult = input?.captureResult ?? null;
  const pd = captureResult?.capturedProductData ?? null;

  let basicProductDataSummary: NaverBasicProductDataSummary | null = null;
  if (isAvailable && pd !== null) {
    basicProductDataSummary = {
      channelProductNo: pd.channelProductNo ?? null,
      productName: pd.productName ?? null,
      productStatus: pd.productStatus ?? null,
      leafCategoryId: pd.leafCategoryId ?? null,
      salePricePresent: pd.salePricePresent === true,
      stockQuantityPresent: pd.stockQuantityPresent === true,
      representativeImageUrlPresent: pd.representativeImageUrlPresent === true,
    };
  }

  const reviewItems: NaverBasicProductDataSummaryReviewItem[] = [
    { reviewItem: 'Task 280 Approval Packet', status: 'APPROVAL_PACKET_CONFIRMED', meaning: 'Task 280 승인 패킷 확인' },
    { reviewItem: 'Task 279 Completeness Certification', status: 'COMPLETENESS_CERTIFICATION_CONFIRMED', meaning: 'Task 279 인증 확인' },
    { reviewItem: 'Task 278 Completeness Review', status: 'COMPLETENESS_REVIEW_CONFIRMED', meaning: 'Task 278 리뷰 확인' },
    { reviewItem: 'Task 277 Safety Audit Seal', status: 'SAFETY_AUDIT_SEAL_CONFIRMED', meaning: '안전 감사 봉인 확인' },
    { reviewItem: 'Task 276 Capture Result', status: 'CAPTURE_RESULT_CONFIRMED', meaning: '캡처 결과 확인' },
    { reviewItem: '요약 검토 상태', status: 'SUMMARY_REVIEW_STATUS_RECORDED', meaning: '요약 검토 상태 기록' },
    { reviewItem: '기존 캡처 데이터만 사용', status: 'CAPTURED_DATA_ONLY', meaning: '신규 API 호출 없음' },
    { reviewItem: 'channelProductNo', status: 'SUMMARY_FIELD_REVIEWED', meaning: '상품번호 요약 포함' },
    { reviewItem: 'productName', status: 'SUMMARY_FIELD_REVIEWED', meaning: '상품명 요약 포함' },
    { reviewItem: 'productStatus', status: 'SUMMARY_FIELD_REVIEWED', meaning: '상품 상태 요약 포함' },
    { reviewItem: 'leafCategoryId', status: 'SUMMARY_FIELD_REVIEWED', meaning: '카테고리 ID 요약 포함' },
    { reviewItem: '대표 이미지 존재 여부', status: 'PRESENCE_FLAG_ONLY', meaning: '원본 URL 없이 존재 여부만 표시' },
    { reviewItem: '판매가 존재 여부', status: 'PRESENCE_FLAG_ONLY', meaning: '원본 값 없이 존재 여부만 표시' },
    { reviewItem: '재고 존재 여부', status: 'PRESENCE_FLAG_ONLY', meaning: '원본 값 없이 존재 여부만 표시' },
    { reviewItem: '가격 원본 값', status: 'NOT_INCLUDED', meaning: '가격 원값 없음' },
    { reviewItem: '재고 원본 값', status: 'NOT_INCLUDED', meaning: '재고 원값 없음' },
    { reviewItem: 'raw API response', status: 'NOT_INCLUDED', meaning: '원본 응답 전체 없음' },
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
    { reviewItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 281은 기본 상품 데이터 요약 검토 표시 전용' },
  ];

  return {
    status: 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_READY',
    panelTitle: 'Naver Basic Product Data Summary Review (Task 281)',
    description:
      'Task 281은 Task 276에서 캡처한 read-only 기본 상품 데이터를 요약 검토하는 단계입니다. 기존 캡처 데이터만 사용하며 신규 API 호출은 수행하지 않습니다. 가격/재고 원본 값, raw API response, Token/Auth/Signature/Authorization 값은 포함하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverBasicProductDataSummaryReviewApprovalPacketReady: true,
    isNaverReadOnlyProductDataCompletenessCertificationReady: true,
    isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true,
    isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    basicProductDataSummaryReviewStatus,
    isSummaryReviewComplete: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_COMPLETE',
    isSummaryReviewWithMissingFieldNotice: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE',
    isSummaryReviewBlockedByGwIpNotAllowed: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    isSummaryReviewBlockedByTokenRetryFailure: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    isSummaryReviewBlockedByEnvMissing: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
    isSummaryReviewBlockedByMissingChannelProductNo: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    isSummaryReviewBlockedByProductLookupFailure: basicProductDataSummaryReviewStatus === 'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    isBasicProductDataSummaryAvailable: isAvailable,
    basicProductDataSummary,
    isCapturedDataUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
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
