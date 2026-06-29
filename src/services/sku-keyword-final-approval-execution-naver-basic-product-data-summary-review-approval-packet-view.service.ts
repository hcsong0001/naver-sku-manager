export interface NaverBasicProductDataSummaryReviewApprovalPacketItem {
  packetItem: string;
  status: string;
  meaning: string;
}

export interface NaverBasicProductDataSummaryReviewApprovalPacketView {
  status: 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_APPROVAL_PACKET_READY';
  panelTitle: string;
  description: string;
  userApprovalPhraseGuide: string;
  isBatchJobResultDisplayOnly: true;
  isNaverBasicProductDataSummaryReviewApprovalPacketReady: true;
  isNaverReadOnlyProductDataCompletenessCertificationReady: true;
  isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true;
  isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductDataCompletenessCertificationStatus: string;
  basicProductDataSummaryReviewApprovalPacketStatus: string;
  isBasicProductDataSummaryReviewApprovalPacketReadyForCompleteData: boolean;
  isBasicProductDataSummaryReviewApprovalPacketReadyWithMissingFieldNotice: boolean;
  isBasicProductDataSummaryReviewApprovalPacketBlockedByGwIpNotAllowed: boolean;
  isBasicProductDataSummaryReviewApprovalPacketBlockedByTokenRetryFailure: boolean;
  isBasicProductDataSummaryReviewApprovalPacketBlockedByEnvMissing: boolean;
  isBasicProductDataSummaryReviewApprovalPacketBlockedByMissingChannelProductNo: boolean;
  isBasicProductDataSummaryReviewApprovalPacketBlockedByProductLookupFailure: boolean;
  isBasicProductDataSummaryReviewApprovalRequired: true;
  isBasicProductDataSummaryReviewApprovalGranted: false;
  isUserApprovalPhraseReceivedForBasicProductDataSummaryReview: false;
  isBasicProductDataSummaryReviewExecutedInThisTask: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  packetItems: NaverBasicProductDataSummaryReviewApprovalPacketItem[];
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
}

const CERT_TO_PACKET: Record<string, string> = {
  CERTIFIED_BASIC_PRODUCT_DATA_COMPLETE_FOR_REVIEW: 'APPROVAL_PACKET_READY_FOR_COMPLETE_DATA',
  CERTIFIED_BASIC_PRODUCT_DATA_PARTIAL_FOR_REVIEW: 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
  CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED: 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE: 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  CERTIFIED_BLOCKED_BY_ENV_MISSING: 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
  CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO: 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE: 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

export function buildNaverBasicProductDataSummaryReviewApprovalPacketView(input: {
  completenessCertification: any;
  completenessReview: any;
  safetyAuditSeal: any;
  captureResult: any;
}): NaverBasicProductDataSummaryReviewApprovalPacketView {
  const cert = input?.completenessCertification ?? null;
  const rawCertStatus = cert?.readOnlyProductDataCompletenessCertificationStatus ?? '';
  const readOnlyProductDataCompletenessCertificationStatus: string =
    rawCertStatus in CERT_TO_PACKET
      ? rawCertStatus
      : 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const basicProductDataSummaryReviewApprovalPacketStatus =
    CERT_TO_PACKET[readOnlyProductDataCompletenessCertificationStatus] ??
    'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const packetItems: NaverBasicProductDataSummaryReviewApprovalPacketItem[] = [
    { packetItem: 'Task 279 Completeness Certification', status: 'COMPLETENESS_CERTIFICATION_CONFIRMED', meaning: 'Task 279 인증 확인' },
    { packetItem: 'Task 278 Completeness Review', status: 'COMPLETENESS_REVIEW_CONFIRMED', meaning: 'Task 278 리뷰 확인' },
    { packetItem: 'Task 277 Safety Audit Seal', status: 'SAFETY_AUDIT_SEAL_CONFIRMED', meaning: '안전 감사 봉인 확인' },
    { packetItem: 'Task 276 Capture Result', status: 'CAPTURE_RESULT_CONFIRMED', meaning: '캡처 결과 확인' },
    { packetItem: 'Approval Packet 상태', status: 'APPROVAL_PACKET_STATUS_RECORDED', meaning: '승인 패킷 상태 기록' },
    { packetItem: 'COMPLETE 데이터', status: 'READY_FOR_SUMMARY_REVIEW_IF_COMPLETE', meaning: 'COMPLETE면 요약 검토 승인 요청 가능' },
    { packetItem: 'PARTIAL 데이터', status: 'READY_WITH_MISSING_FIELD_NOTICE', meaning: 'PARTIAL이면 누락 안내 포함 승인 요청 가능' },
    { packetItem: 'GW IP 차단', status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED', meaning: 'IP 허용 목록 재확인 필요' },
    { packetItem: 'Token 실패 차단', status: 'BLOCKED_RECHECK_AUTH_REQUIRED', meaning: '인증/권한 재확인 필요' },
    { packetItem: 'Env 누락 차단', status: 'BLOCKED_RECHECK_ENV_REQUIRED', meaning: 'Env/Auth 재확인 필요' },
    { packetItem: '상품번호 누락 차단', status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED', meaning: 'channelProductNo 확인 필요' },
    { packetItem: '상품 조회 실패 차단', status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED', meaning: '상품/스토어 접근 확인 필요' },
    { packetItem: '사용자 별도 승인', status: 'PENDING_USER_APPROVAL', meaning: '아직 사용자 승인 전' },
    { packetItem: '실제 요약 검토', status: 'LOCKED_UNTIL_USER_APPROVAL', meaning: '승인 전 요약 검토 금지' },
    { packetItem: '가격 원본 값', status: 'NOT_INCLUDED', meaning: '가격 원값 없음' },
    { packetItem: '재고 원본 값', status: 'NOT_INCLUDED', meaning: '재고 원값 없음' },
    { packetItem: 'raw API response', status: 'NOT_INCLUDED', meaning: '원본 응답 전체 없음' },
    { packetItem: 'Token 값', status: 'NOT_DISPLAYED', meaning: 'Token 표시 없음' },
    { packetItem: 'Auth 값', status: 'NOT_DISPLAYED', meaning: 'Auth 표시 없음' },
    { packetItem: 'Signature', status: 'NOT_DISPLAYED', meaning: 'Signature 표시 없음' },
    { packetItem: 'Authorization 헤더', status: 'NOT_DISPLAYED', meaning: 'Authorization 표시 없음' },
    { packetItem: 'Token 재발급', status: 'NOT_EXECUTED', meaning: '이번 Task 발급 없음' },
    { packetItem: '상품 조회 API 재호출', status: 'NOT_EXECUTED', meaning: '이번 Task 조회 없음' },
    { packetItem: '상품 수정 API 호출', status: 'NOT_EXECUTED', meaning: '수정 없음' },
    { packetItem: '가격 변경', status: 'NOT_EXECUTED', meaning: '가격 변경 없음' },
    { packetItem: '재고 변경', status: 'NOT_EXECUTED', meaning: '재고 변경 없음' },
    { packetItem: 'DB write/upsert/update', status: 'NOT_EXECUTED', meaning: 'DB 변경 없음' },
    { packetItem: 'Worker / Queue / Adapter', status: 'LOCKED', meaning: '실행 경로 없음' },
    { packetItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 280은 승인 패킷 표시 전용' },
  ];

  return {
    status: 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_APPROVAL_PACKET_READY',
    panelTitle: 'Naver Basic Product Data Summary Review Approval Packet (Task 280)',
    description:
      'Task 280은 기본 상품 데이터 요약 검토로 진입하기 위한 승인 요청 패킷입니다. COMPLETE 또는 PARTIAL 상태에서는 다음 단계 승인 요청이 가능하지만, 사용자 별도 승인 전까지 요약 검토를 수행하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    userApprovalPhraseGuide:
      'Task 281에서 Naver read-only 기본 상품 데이터 요약 검토를 승인합니다. 기존 캡처 데이터만 사용하고, Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.',
    isBatchJobResultDisplayOnly: true,
    isNaverBasicProductDataSummaryReviewApprovalPacketReady: true,
    isNaverReadOnlyProductDataCompletenessCertificationReady: true,
    isNaverReadOnlyProductDataCaptureCompletenessReviewReady: true,
    isNaverReadOnlyProductDataCaptureSafetyAuditSealed: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductDataCompletenessCertificationStatus,
    basicProductDataSummaryReviewApprovalPacketStatus,
    isBasicProductDataSummaryReviewApprovalPacketReadyForCompleteData: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_READY_FOR_COMPLETE_DATA',
    isBasicProductDataSummaryReviewApprovalPacketReadyWithMissingFieldNotice: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
    isBasicProductDataSummaryReviewApprovalPacketBlockedByGwIpNotAllowed: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    isBasicProductDataSummaryReviewApprovalPacketBlockedByTokenRetryFailure: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    isBasicProductDataSummaryReviewApprovalPacketBlockedByEnvMissing: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
    isBasicProductDataSummaryReviewApprovalPacketBlockedByMissingChannelProductNo: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    isBasicProductDataSummaryReviewApprovalPacketBlockedByProductLookupFailure: basicProductDataSummaryReviewApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    isBasicProductDataSummaryReviewApprovalRequired: true,
    isBasicProductDataSummaryReviewApprovalGranted: false,
    isUserApprovalPhraseReceivedForBasicProductDataSummaryReview: false,
    isBasicProductDataSummaryReviewExecutedInThisTask: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    packetItems,
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
  };
}
