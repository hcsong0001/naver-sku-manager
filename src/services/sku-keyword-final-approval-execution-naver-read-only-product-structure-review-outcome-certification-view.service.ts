export type NaverReadOnlyProductStructureReviewStatus =
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE'
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE'
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING'
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export type NaverReadOnlyProductStructureReviewOutcomeCertificationStatus =
  | 'CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY'
  | 'CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export interface NaverReadOnlyProductStructureReviewOutcomeCertificationItem {
  certificationItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductStructureReviewOutcomeCertificationView {
  status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_OUTCOME_CERTIFICATION_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true;
  isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true;
  isNaverReadOnlyProductStructureReviewResultReady: true;
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductStructureReviewStatus: NaverReadOnlyProductStructureReviewStatus;
  readOnlyProductStructureReviewOutcomeCertificationStatus: NaverReadOnlyProductStructureReviewOutcomeCertificationStatus;
  isCertifiedStructureReviewReadyForCompleteSummary: boolean;
  isCertifiedStructureReviewReadyWithMissingFieldNotice: boolean;
  isCertifiedStructureReviewBlockedByGwIpNotAllowed: boolean;
  isCertifiedStructureReviewBlockedByTokenRetryFailure: boolean;
  isCertifiedStructureReviewBlockedByEnvMissing: boolean;
  isCertifiedStructureReviewBlockedByMissingChannelProductNo: boolean;
  isCertifiedStructureReviewBlockedByProductLookupFailure: boolean;
  isReadyForNextReadOnlyOptionAdditionalStructureExpansionPlanning: boolean;
  isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked: boolean;
  isMissingFieldNoticeRequired: boolean;
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isReadOnlyProductStructureReviewReexecutedInThisTask: false;
  isProductStructureReviewBuiltFromCapturedData: boolean;
  isOptionStructureDetailAvailableInCapturedData: false;
  isAdditionalProductStructureDetailAvailableInCapturedData: false;
  isOptionStructureInferred: false;
  isAdditionalProductStructureInferred: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  certificationItems: NaverReadOnlyProductStructureReviewOutcomeCertificationItem[];
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

const STRUCTURE_REVIEW_TO_OUTCOME_CERTIFICATION: Record<
  NaverReadOnlyProductStructureReviewStatus,
  NaverReadOnlyProductStructureReviewOutcomeCertificationStatus
> = {
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE:
    'CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY',
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE:
    'CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE',
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED:
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE:
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING:
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO:
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE:
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

const ALLOWED_STRUCTURE_REVIEW_STATUSES = Object.keys(
  STRUCTURE_REVIEW_TO_OUTCOME_CERTIFICATION
) as NaverReadOnlyProductStructureReviewStatus[];

function buildCertificationItems(
  reviewStatus: NaverReadOnlyProductStructureReviewStatus,
  outcomeStatus: NaverReadOnlyProductStructureReviewOutcomeCertificationStatus
): NaverReadOnlyProductStructureReviewOutcomeCertificationItem[] {
  const isComplete =
    reviewStatus === 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE';
  const isPartial =
    reviewStatus ===
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE';

  return [
    {
      certificationItem: 'Task 286 Safety Audit Seal',
      status: 'STRUCTURE_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 286 안전 감사 봉인을 확인했습니다.',
    },
    {
      certificationItem: 'Task 285 Structure Review',
      status: 'STRUCTURE_REVIEW_CONFIRMED',
      meaning: 'Task 285 상품 구조 검토 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 284 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 284 승인 패킷을 확인했습니다.',
    },
    {
      certificationItem: 'Task 281 Summary Review',
      status: 'SUMMARY_REVIEW_CONFIRMED',
      meaning: '기존 요약 검토 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: '기존 캡처 결과를 확인했습니다.',
    },
    {
      certificationItem: 'Outcome Certification',
      status: 'OUTCOME_CERTIFICATION_STATUS_RECORDED',
      meaning: `readOnlyProductStructureReviewOutcomeCertificationStatus: ${outcomeStatus}`,
    },
    {
      certificationItem: 'COMPLETE 요약 기반 구조 검토',
      status: 'CERTIFIED_READY_IF_COMPLETE_SUMMARY',
      meaning: isComplete
        ? '현재 COMPLETE 요약 기반 구조 검토 결과로 인증되어 다음 read-only 옵션/추가상품 구조 확장 설계 후보 상태입니다.'
        : '현재 COMPLETE 요약 기반 구조 검토 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'PARTIAL 요약 기반 구조 검토',
      status: 'CERTIFIED_READY_WITH_MISSING_FIELD_NOTICE',
      meaning: isPartial
        ? '현재 PARTIAL 요약 기반 구조 검토 결과로 인증되어 누락 안내와 함께 다음 read-only 옵션/추가상품 구조 확장 설계 후보 상태입니다.'
        : '현재 PARTIAL 요약 기반 구조 검토 인증 상태는 아닙니다.',
    },
    {
      certificationItem: 'GW IP 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning:
        reviewStatus ===
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED'
          ? '현재 GW IP 허용 목록 재확인이 필요합니다.'
          : '현재 GW IP 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'Token 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning:
        reviewStatus ===
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE'
          ? '현재 인증/권한 재확인이 필요합니다.'
          : '현재 Token 실패 차단 상태는 아닙니다.',
    },
    {
      certificationItem: 'Env 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_ENV_REQUIRED',
      meaning:
        reviewStatus ===
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING'
          ? '현재 Env/Auth 재확인이 필요합니다.'
          : '현재 Env 누락 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '상품번호 누락 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning:
        reviewStatus ===
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
          ? '현재 channelProductNo 확인이 필요합니다.'
          : '현재 상품번호 누락 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '상품 조회 실패 차단',
      status: 'CERTIFIED_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning:
        reviewStatus ===
        'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'
          ? '현재 상품/스토어 접근 재확인이 필요합니다.'
          : '현재 상품 조회 실패 차단 상태는 아닙니다.',
    },
    {
      certificationItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '새 API 결과가 아니라 기존 캡처 데이터만 사용했습니다.',
    },
    {
      certificationItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_REVIEW_ONLY_CONFIRMED',
      meaning: '새 요약 검토를 수행하지 않고 기존 요약 결과만 사용했습니다.',
    },
    {
      certificationItem: '옵션 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '옵션 구조를 임의 추정하지 않았습니다.',
    },
    {
      certificationItem: '추가상품 구조 추정',
      status: 'NOT_INFERRED',
      meaning: '추가상품 구조를 임의 추정하지 않았습니다.',
    },
    {
      certificationItem: '옵션 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 옵션 상세 구조가 없습니다.',
    },
    {
      certificationItem: '추가상품 구조 데이터',
      status: 'NOT_AVAILABLE_IN_CAPTURED_DATA',
      meaning: '현재 캡처 데이터에 추가상품 상세 구조가 없습니다.',
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
      meaning: 'Authorization 값을 표시하지 않습니다.',
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
          ? '다음 read-only 옵션/추가상품 구조 확장 설계 후보 상태이지만 별도 승인 전까지 진행하지 않습니다.'
          : '차단 원인 보정 후 별도 승인이 필요합니다.',
    },
    {
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 287은 인증 표시 전용입니다.',
    },
  ];
}

export function buildNaverReadOnlyProductStructureReviewOutcomeCertificationView(
  input: {
    structureReview: any;
    safetyAuditSeal: any;
    approvalPacket: any;
    summaryReview: any;
    captureResult: any;
  }
): NaverReadOnlyProductStructureReviewOutcomeCertificationView {
  const structureReview = input?.structureReview ?? null;
  const rawReviewStatus = structureReview?.readOnlyProductStructureReviewStatus;
  const readOnlyProductStructureReviewStatus: NaverReadOnlyProductStructureReviewStatus =
    ALLOWED_STRUCTURE_REVIEW_STATUSES.includes(rawReviewStatus)
      ? rawReviewStatus
      : 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const readOnlyProductStructureReviewOutcomeCertificationStatus =
    STRUCTURE_REVIEW_TO_OUTCOME_CERTIFICATION[
      readOnlyProductStructureReviewStatus
    ];

  const isCertifiedStructureReviewReadyForCompleteSummary =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_READY_FOR_COMPLETE_SUMMARY';
  const isCertifiedStructureReviewReadyWithMissingFieldNotice =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_READY_WITH_MISSING_FIELD_NOTICE';
  const isCertifiedStructureReviewBlockedByGwIpNotAllowed =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';
  const isCertifiedStructureReviewBlockedByTokenRetryFailure =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE';
  const isCertifiedStructureReviewBlockedByEnvMissing =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING';
  const isCertifiedStructureReviewBlockedByMissingChannelProductNo =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  const isCertifiedStructureReviewBlockedByProductLookupFailure =
    readOnlyProductStructureReviewOutcomeCertificationStatus ===
    'CERTIFIED_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

  const isReadyForNextReadOnlyOptionAdditionalStructureExpansionPlanning =
    isCertifiedStructureReviewReadyForCompleteSummary ||
    isCertifiedStructureReviewReadyWithMissingFieldNotice;
  const isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked =
    !isReadyForNextReadOnlyOptionAdditionalStructureExpansionPlanning;
  const isMissingFieldNoticeRequired =
    isCertifiedStructureReviewReadyWithMissingFieldNotice;
  const isProductStructureReviewBuiltFromCapturedData =
    structureReview?.isCapturedDataUsedOnly === true &&
    structureReview?.isSummaryReviewResultUsedOnly === true;

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_OUTCOME_CERTIFICATION_READY',
    panelTitle:
      'Naver Read-Only Product Structure Review Outcome Certification (Task 287)',
    description:
      'Task 287은 Task 285 read-only 상품 구조 검토 결과와 Task 286 안전 감사 봉인을 바탕으로 다음 read-only 옵션/추가상품 구조 확장 설계 후보 여부를 인증하는 단계입니다. 현재 캡처 데이터에는 옵션 상세 구조와 추가상품 상세 구조가 포함되어 있지 않으므로 이를 추정하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductStructureReviewOutcomeCertificationReady: true,
    isNaverReadOnlyProductStructureReviewSafetyAuditSealed: true,
    isNaverReadOnlyProductStructureReviewResultReady: true,
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductStructureReviewStatus,
    readOnlyProductStructureReviewOutcomeCertificationStatus,
    isCertifiedStructureReviewReadyForCompleteSummary,
    isCertifiedStructureReviewReadyWithMissingFieldNotice,
    isCertifiedStructureReviewBlockedByGwIpNotAllowed,
    isCertifiedStructureReviewBlockedByTokenRetryFailure,
    isCertifiedStructureReviewBlockedByEnvMissing,
    isCertifiedStructureReviewBlockedByMissingChannelProductNo,
    isCertifiedStructureReviewBlockedByProductLookupFailure,
    isReadyForNextReadOnlyOptionAdditionalStructureExpansionPlanning,
    isNextReadOnlyOptionAdditionalStructureExpansionPlanningBlocked,
    isMissingFieldNoticeRequired,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
    isReadOnlyProductStructureReviewReexecutedInThisTask: false,
    isProductStructureReviewBuiltFromCapturedData,
    isOptionStructureDetailAvailableInCapturedData: false,
    isAdditionalProductStructureDetailAvailableInCapturedData: false,
    isOptionStructureInferred: false,
    isAdditionalProductStructureInferred: false,
    isSalePriceRawValueIncluded: false,
    isStockQuantityRawValueIncluded: false,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isRawProductApiResponseIncluded: false,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
    certificationItems: buildCertificationItems(
      readOnlyProductStructureReviewStatus,
      readOnlyProductStructureReviewOutcomeCertificationStatus
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
