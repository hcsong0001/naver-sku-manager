export type NaverBasicProductDataSummaryReviewStatus =
  | 'SUMMARY_REVIEW_COMPLETE'
  | 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE'
  | 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING'
  | 'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export type NaverBasicProductDataSummaryReviewOutcomeCertificationStatus =
  | 'CERTIFIED_SUMMARY_REVIEW_COMPLETE'
  | 'CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING'
  | 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export interface NaverBasicProductDataSummaryReviewOutcomeCertificationItem {
  certificationItem: string;
  status: string;
  meaning: string;
}

export interface NaverBasicProductDataSummaryReviewOutcomeCertificationView {
  status: 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_OUTCOME_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true;
  isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverBasicProductDataSummaryReviewApprovalPacketReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  basicProductDataSummaryReviewStatus: NaverBasicProductDataSummaryReviewStatus;
  basicProductDataSummaryReviewOutcomeCertificationStatus: NaverBasicProductDataSummaryReviewOutcomeCertificationStatus;
  isCertifiedSummaryReadyForCompleteData: boolean;
  isCertifiedSummaryReadyWithMissingFieldNotice: boolean;
  isCertifiedSummaryBlockedByGwIpNotAllowed: boolean;
  isCertifiedSummaryBlockedByTokenRetryFailure: boolean;
  isCertifiedSummaryBlockedByEnvMissing: boolean;
  isCertifiedSummaryBlockedByMissingChannelProductNo: boolean;
  isCertifiedSummaryBlockedByProductLookupFailure: boolean;
  isReadyForNextReadOnlyProductStructureReview: boolean;
  isNextReadOnlyProductStructureReviewBlocked: boolean;
  isMissingFieldNoticeRequired: boolean;
  isCapturedDataUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isBasicProductDataSummaryViewOnly: true;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  certificationItems: NaverBasicProductDataSummaryReviewOutcomeCertificationItem[];
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

const SUMMARY_REVIEW_TO_OUTCOME_CERTIFICATION: Record<
  NaverBasicProductDataSummaryReviewStatus,
  NaverBasicProductDataSummaryReviewOutcomeCertificationStatus
> = {
  SUMMARY_REVIEW_COMPLETE: 'CERTIFIED_SUMMARY_REVIEW_COMPLETE',
  SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE:
    'CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE',
  SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED:
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE:
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING:
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING',
  SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO:
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE:
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

const ALLOWED_SUMMARY_REVIEW_STATUSES = Object.keys(
  SUMMARY_REVIEW_TO_OUTCOME_CERTIFICATION
) as NaverBasicProductDataSummaryReviewStatus[];

function buildCertificationItems(
  summaryStatus: NaverBasicProductDataSummaryReviewStatus,
  outcomeStatus: NaverBasicProductDataSummaryReviewOutcomeCertificationStatus
): NaverBasicProductDataSummaryReviewOutcomeCertificationItem[] {
  const isComplete = summaryStatus === 'SUMMARY_REVIEW_COMPLETE';
  const isPartial = summaryStatus === 'SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE';

  return [
    {
      certificationItem: 'Task 282 Safety Audit Seal',
      status: 'SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 282 안전 감사 봉인을 확인했습니다.',
    },
    {
      certificationItem: 'Task 281 Summary Review',
      status: 'SUMMARY_REVIEW_CONFIRMED',
      meaning: 'Task 281 기본 상품 데이터 요약 검토 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 280 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 280 승인 패킷 상태를 확인했습니다.',
    },
    {
      certificationItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 캡처 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Outcome Certification',
      status: 'OUTCOME_CERTIFICATION_STATUS_RECORDED',
      meaning: `basicProductDataSummaryReviewOutcomeCertificationStatus: ${outcomeStatus}`,
    },
    {
      certificationItem: 'COMPLETE 요약',
      status: 'CERTIFIED_READY_IF_COMPLETE',
      meaning: isComplete
        ? '현재 COMPLETE 요약으로 인증되어 다음 read-only 상품 구조 검토 후보 상태입니다.'
        : '현재 COMPLETE 요약 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'PARTIAL 요약',
      status: 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: isPartial
        ? '현재 PARTIAL 요약으로 인증되어 누락 필드 안내와 함께 다음 read-only 상품 구조 검토 후보 상태입니다.'
        : '현재 PARTIAL 요약 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'GW IP 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning:
        summaryStatus === 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
          ? '현재 GW IP 허용 목록 재확인이 필요합니다.'
          : '현재 GW IP 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'Token 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning:
        summaryStatus === 'SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
          ? '현재 인증/권한 재확인이 필요합니다.'
          : '현재 Token 실패 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'Env 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning:
        summaryStatus === 'SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING'
          ? '현재 Env/Auth 재확인이 필요합니다.'
          : '현재 Env 누락 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '상품번호 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning:
        summaryStatus === 'SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
          ? '현재 channelProductNo 확인이 필요합니다.'
          : '현재 상품번호 누락 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '상품 조회 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning:
        summaryStatus === 'SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'
          ? '현재 상품/스토어 접근 재확인이 필요합니다.'
          : '현재 상품 조회 실패 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      certificationItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      certificationItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      certificationItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 API 응답 전체를 포함하지 않습니다.',
    },
    {
      certificationItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급은 수행하지 않습니다.',
    },
    {
      certificationItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출은 수행하지 않습니다.',
    },
    {
      certificationItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출은 수행하지 않습니다.',
    },
    {
      certificationItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경은 수행하지 않습니다.',
    },
    {
      certificationItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경은 수행하지 않습니다.',
    },
    {
      certificationItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update는 수행하지 않습니다.',
    },
    {
      certificationItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로가 잠금 상태입니다.',
    },
    {
      certificationItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning:
        isComplete || isPartial
          ? '다음 read-only 상품 구조 검토 후보 상태이지만 별도 승인 전까지 진행하지 않습니다.'
          : '차단 원인 보정 후 별도 승인이 필요합니다.',
    },
    {
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 283은 결과 인증 표시 전용입니다.',
    },
  ];
}

export function buildNaverBasicProductDataSummaryReviewOutcomeCertificationView(input: {
  summaryReview: any;
  safetyAuditSeal: any;
  approvalPacket: any;
  captureResult: any;
}): NaverBasicProductDataSummaryReviewOutcomeCertificationView {
  const summaryReview = input?.summaryReview ?? null;
  const rawSummaryStatus = summaryReview?.basicProductDataSummaryReviewStatus;
  const basicProductDataSummaryReviewStatus: NaverBasicProductDataSummaryReviewStatus =
    ALLOWED_SUMMARY_REVIEW_STATUSES.includes(rawSummaryStatus)
      ? rawSummaryStatus
      : 'SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const basicProductDataSummaryReviewOutcomeCertificationStatus =
    SUMMARY_REVIEW_TO_OUTCOME_CERTIFICATION[basicProductDataSummaryReviewStatus];

  const isCertifiedSummaryReadyForCompleteData =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_COMPLETE';
  const isCertifiedSummaryReadyWithMissingFieldNotice =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE';
  const isCertifiedSummaryBlockedByGwIpNotAllowed =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';
  const isCertifiedSummaryBlockedByTokenRetryFailure =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE';
  const isCertifiedSummaryBlockedByEnvMissing =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING';
  const isCertifiedSummaryBlockedByMissingChannelProductNo =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  const isCertifiedSummaryBlockedByProductLookupFailure =
    basicProductDataSummaryReviewOutcomeCertificationStatus ===
    'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

  const isReadyForNextReadOnlyProductStructureReview =
    isCertifiedSummaryReadyForCompleteData ||
    isCertifiedSummaryReadyWithMissingFieldNotice;
  const isNextReadOnlyProductStructureReviewBlocked =
    !isReadyForNextReadOnlyProductStructureReview;
  const isMissingFieldNoticeRequired =
    isCertifiedSummaryReadyWithMissingFieldNotice;

  return {
    status: 'NAVER_BASIC_PRODUCT_DATA_SUMMARY_REVIEW_OUTCOME_CERTIFICATION_READY',
    panelTitle:
      'Naver Basic Product Data Summary Review Outcome Certification (Task 283)',
    description:
      'Task 283은 Task 281 기본 상품 데이터 요약 검토 결과와 Task 282 안전 감사 봉인을 바탕으로, 다음 read-only 상품 구조 검토 후보 여부를 인증하는 단계입니다. COMPLETE 또는 PARTIAL 상태라도 다음 단계는 별도 승인 전까지 진행하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true,
    isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverBasicProductDataSummaryReviewApprovalPacketReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    basicProductDataSummaryReviewStatus,
    basicProductDataSummaryReviewOutcomeCertificationStatus,
    isCertifiedSummaryReadyForCompleteData,
    isCertifiedSummaryReadyWithMissingFieldNotice,
    isCertifiedSummaryBlockedByGwIpNotAllowed,
    isCertifiedSummaryBlockedByTokenRetryFailure,
    isCertifiedSummaryBlockedByEnvMissing,
    isCertifiedSummaryBlockedByMissingChannelProductNo,
    isCertifiedSummaryBlockedByProductLookupFailure,
    isReadyForNextReadOnlyProductStructureReview,
    isNextReadOnlyProductStructureReviewBlocked,
    isMissingFieldNoticeRequired,
    isCapturedDataUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isBasicProductDataSummaryViewOnly: true,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    certificationItems: buildCertificationItems(
      basicProductDataSummaryReviewStatus,
      basicProductDataSummaryReviewOutcomeCertificationStatus
    ),
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
