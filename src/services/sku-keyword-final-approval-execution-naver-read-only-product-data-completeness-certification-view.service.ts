export interface NaverReadOnlyProductDataCompletenessCertificationItem {
  certificationItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductDataCompletenessCertificationView {
  status: 'NAVER_READ_ONLY_PRODUCT_DATA_COMPLETENESS_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductDataCompletenessCertificationReady: true;
  isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true;
  isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductDataCompletenessStatus: string;
  readOnlyProductDataCompletenessCertificationStatus: string;
  isCertifiedBasicProductDataCompleteForReview: boolean;
  isCertifiedBasicProductDataPartialForReview: boolean;
  isCertifiedBlockedByGwIpNotAllowed: boolean;
  isCertifiedBlockedByTokenRetryFailure: boolean;
  isCertifiedBlockedByEnvMissing: boolean;
  isCertifiedBlockedByMissingChannelProductNo: boolean;
  isCertifiedBlockedByProductLookupFailure: boolean;
  isReadyForBasicProductDataSummaryReview: boolean;
  isBasicProductDataSummaryReviewBlocked: boolean;
  isMissingFieldNoticeRequired: boolean;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  certificationItems: NaverReadOnlyProductDataCompletenessCertificationItem[];
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

const COMPLETENESS_TO_CERTIFICATION: Record<string, string> = {
  BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW: 'CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW',
  BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW: 'CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW',
  BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED: 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  BASIC_PRODUCT_DATA_BLOCKED_BY_TOKEN_RETRY_FAILURE: 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  BASIC_PRODUCT_DATA_BLOCKED_BY_ENV_MISSING: 'CERTIFIED_BLOCKED_BY_ENV_MISSING',
  BASIC_PRODUCT_DATA_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO: 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  BASIC_PRODUCT_DATA_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE: 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

export function buildNaverReadOnlyProductDataCompletenessCertificationView(input: {
  completenessReview: any;
  safetyAuditSeal: any;
  captureResult: any;
}): NaverReadOnlyProductDataCompletenessCertificationView {
  const completenessReview = input?.completenessReview ?? null;
  const rawCompletenessStatus = completenessReview?.readOnlyProductDataCompletenessStatus ?? '';
  const readOnlyProductDataCompletenessStatus: string =
    rawCompletenessStatus in COMPLETENESS_TO_CERTIFICATION
      ? rawCompletenessStatus
      : 'BASIC_PRODUCT_DATA_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const readOnlyProductDataCompletenessCertificationStatus =
    COMPLETENESS_TO_CERTIFICATION[readOnlyProductDataCompletenessStatus] ??
    'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const isComplete = readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW';
  const isPartial = readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW';

  const certificationItems: NaverReadOnlyProductDataCompletenessCertificationItem[] = [
    { certificationItem: 'Task 278 Completeness Review', status: 'COMPLETENESS_REVIEW_CONFIRMED', meaning: 'Task 278 리뷰 확인' },
    { certificationItem: 'Task 277 Safety Audit Seal', status: 'SAFETY_AUDIT_SEAL_CONFIRMED', meaning: '안전 감사 봉인 확인' },
    { certificationItem: 'Task 276 Capture Result', status: 'CAPTURE_RESULT_CONFIRMED', meaning: '캡처 결과 확인' },
    { certificationItem: 'Completeness Certification', status: 'CERTIFICATION_STATUS_RECORDED', meaning: '인증 상태 기록' },
    { certificationItem: 'COMPLETE 상태', status: 'READY_IF_COMPLETE', meaning: '기본 검토 진행 가능' },
    { certificationItem: 'PARTIAL 상태', status: 'REVIEW_ALLOWED_WITH_MISSING_FIELD_NOTICE', meaning: '누락 안내 포함 검토 가능' },
    { certificationItem: 'GW IP 차단', status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED', meaning: 'IP 허용 목록 재확인 필요' },
    { certificationItem: 'Token 실패 차단', status: 'BLOCKED_RECHECK_AUTH_REQUIRED', meaning: '인증/권한 재확인 필요' },
    { certificationItem: 'Env 누락 차단', status: 'BLOCKED_RECHECK_ENV_REQUIRED', meaning: 'Env/Auth 재확인 필요' },
    { certificationItem: '상품번호 누락 차단', status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED', meaning: 'channelProductNo 확인 필요' },
    { certificationItem: '상품 조회 실패 차단', status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED', meaning: '상품/스토어 접근 확인 필요' },
    { certificationItem: '가격 원본 값', status: 'NOT_INCLUDED', meaning: '가격 원값 없음' },
    { certificationItem: '재고 원본 값', status: 'NOT_INCLUDED', meaning: '재고 원값 없음' },
    { certificationItem: 'raw API response', status: 'NOT_INCLUDED', meaning: '원본 응답 전체 없음' },
    { certificationItem: 'Token 값', status: 'NOT_DISPLAYED', meaning: 'Token 표시 없음' },
    { certificationItem: 'Auth 값', status: 'NOT_DISPLAYED', meaning: 'Auth 표시 없음' },
    { certificationItem: 'Signature', status: 'NOT_DISPLAYED', meaning: 'Signature 표시 없음' },
    { certificationItem: 'Authorization 헤더', status: 'NOT_DISPLAYED', meaning: 'Authorization 표시 없음' },
    { certificationItem: 'Token 재발급', status: 'NOT_EXECUTED', meaning: '이번 Task 발급 없음' },
    { certificationItem: '상품 조회 API 재호출', status: 'NOT_EXECUTED', meaning: '이번 Task 조회 없음' },
    { certificationItem: '상품 수정 API 호출', status: 'NOT_EXECUTED', meaning: '수정 없음' },
    { certificationItem: '가격 변경', status: 'NOT_EXECUTED', meaning: '가격 변경 없음' },
    { certificationItem: '재고 변경', status: 'NOT_EXECUTED', meaning: '재고 변경 없음' },
    { certificationItem: 'DB write/upsert/update', status: 'NOT_EXECUTED', meaning: 'DB 변경 없음' },
    { certificationItem: 'Worker / Queue / Adapter', status: 'LOCKED', meaning: '실행 경로 없음' },
    { certificationItem: '다음 단계', status: 'PENDING_SEPARATE_APPROVAL', meaning: '다음 단계 별도 승인 필요' },
    { certificationItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 279는 완성도 인증 표시 전용' },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_DATA_COMPLETENESS_CERTIFICATION_READY',
    panelTitle: 'Naver Read-Only Product Data Completeness Certification (Task 279)',
    description:
      'Task 279는 Task 278의 read-only 상품 데이터 완성도 리뷰 결과를 인증하는 단계입니다. COMPLETE 또는 PARTIAL 상태에서는 기본 상품 데이터 요약 검토의 후보가 될 수 있지만, 다음 단계는 별도 승인 전까지 진행하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductDataCompletenessCertificationReady: true,
    isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true,
    isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductDataCompletenessStatus,
    readOnlyProductDataCompletenessCertificationStatus,
    isCertifiedBasicProductDataCompleteForReview: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW',
    isCertifiedBasicProductDataPartialForReview: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW',
    isCertifiedBlockedByGwIpNotAllowed: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    isCertifiedBlockedByTokenRetryFailure: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    isCertifiedBlockedByEnvMissing: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BLOCKED_BY_ENV_MISSING',
    isCertifiedBlockedByMissingChannelProductNo: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    isCertifiedBlockedByProductLookupFailure: readOnlyProductDataCompletenessCertificationStatus === 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    isReadyForBasicProductDataSummaryReview: isComplete || isPartial,
    isBasicProductDataSummaryReviewBlocked: !isComplete && !isPartial,
    isMissingFieldNoticeRequired: isPartial,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    certificationItems,
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
