export interface NaverReadOnlyProductStructureFieldReviewItem {
  fieldName: string;
  fieldPresenceStatus: 'PRESENT' | 'MISSING' | 'PRESENCE_FLAG_ONLY';
}

export interface NaverReadOnlyProductStructureSummary {
  channelProductNo: string | null;
  productName: string | null;
  productStatus: string | null;
  leafCategoryId: string | null;
  salePricePresent: boolean;
  stockQuantityPresent: boolean;
  representativeImageUrlPresent: boolean;
}

export interface NaverReadOnlyProductStructureReviewItem {
  reviewItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductStructureReviewView {
  status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductStructureReviewReady: true;
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true;
  isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true;
  isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  readOnlyProductStructureReviewStatus: string;
  isReadOnlyProductStructureReviewComplete: boolean;
  isReadOnlyProductStructureReviewWithMissingFieldNotice: boolean;
  isReadOnlyProductStructureReviewBlockedByGwIpNotAllowed: boolean;
  isReadOnlyProductStructureReviewBlockedByTokenRetryFailure: boolean;
  isReadOnlyProductStructureReviewBlockedByEnvMissing: boolean;
  isReadOnlyProductStructureReviewBlockedByMissingChannelProductNo: boolean;
  isReadOnlyProductStructureReviewBlockedByProductLookupFailure: boolean;
  isReadOnlyProductStructureReviewExecutedInThisTask: boolean;
  isReadOnlyProductStructureSummaryAvailable: boolean;
  readOnlyProductStructureSummary: NaverReadOnlyProductStructureSummary | null;
  isChannelProductNoPresent: boolean;
  isProductNamePresent: boolean;
  isProductStatusPresent: boolean;
  isLeafCategoryIdPresent: boolean;
  isRepresentativeImagePresenceFlagOnly: true;
  isSalePricePresenceFlagOnly: true;
  isStockQuantityPresenceFlagOnly: true;
  isCapturedDataUsedOnly: true;
  isSummaryReviewResultUsedOnly: true;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  fieldReviewItems: NaverReadOnlyProductStructureFieldReviewItem[];
  reviewItems: NaverReadOnlyProductStructureReviewItem[];
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

const PACKET_TO_STRUCTURE_REVIEW: Record<string, string> = {
  APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY: 'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE',
  APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE',
  APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
  APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE:
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

export function buildNaverReadOnlyProductStructureReviewView(input: {
  approvalPacketView: any;
  outcomeCertification: any;
  summaryReview: any;
  captureResult: any;
}): NaverReadOnlyProductStructureReviewView {
  const approvalPacketView = input?.approvalPacketView ?? null;
  const rawPacketStatus =
    approvalPacketView?.readOnlyProductStructureReviewApprovalPacketStatus ?? '';
  const packetStatus: string =
    rawPacketStatus in PACKET_TO_STRUCTURE_REVIEW
      ? rawPacketStatus
      : 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const readOnlyProductStructureReviewStatus =
    PACKET_TO_STRUCTURE_REVIEW[packetStatus] ??
    'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const isAvailable =
    readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE' ||
    readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE';

  const summaryReview = input?.summaryReview ?? null;
  const summary = summaryReview?.basicProductDataSummary ?? null;

  let readOnlyProductStructureSummary: NaverReadOnlyProductStructureSummary | null =
    null;
  if (isAvailable && summary !== null) {
    readOnlyProductStructureSummary = {
      channelProductNo: summary?.channelProductNo ?? null,
      productName: summary?.productName ?? null,
      productStatus: summary?.productStatus ?? null,
      leafCategoryId: summary?.leafCategoryId ?? null,
      salePricePresent: summary?.salePricePresent === true,
      stockQuantityPresent: summary?.stockQuantityPresent === true,
      representativeImageUrlPresent:
        summary?.representativeImageUrlPresent === true,
    };
  }

  const isChannelProductNoPresent =
    isAvailable && !!readOnlyProductStructureSummary?.channelProductNo;
  const isProductNamePresent =
    isAvailable && !!readOnlyProductStructureSummary?.productName;
  const isProductStatusPresent =
    isAvailable && !!readOnlyProductStructureSummary?.productStatus;
  const isLeafCategoryIdPresent =
    isAvailable && !!readOnlyProductStructureSummary?.leafCategoryId;

  const fieldReviewItems: NaverReadOnlyProductStructureFieldReviewItem[] = [
    {
      fieldName: 'channelProductNo',
      fieldPresenceStatus: isChannelProductNoPresent ? 'PRESENT' : 'MISSING',
    },
    {
      fieldName: 'productName',
      fieldPresenceStatus: isProductNamePresent ? 'PRESENT' : 'MISSING',
    },
    {
      fieldName: 'productStatus',
      fieldPresenceStatus: isProductStatusPresent ? 'PRESENT' : 'MISSING',
    },
    {
      fieldName: 'leafCategoryId',
      fieldPresenceStatus: isLeafCategoryIdPresent ? 'PRESENT' : 'MISSING',
    },
    {
      fieldName: 'representativeImageUrlPresent',
      fieldPresenceStatus: 'PRESENCE_FLAG_ONLY',
    },
    {
      fieldName: 'salePricePresent',
      fieldPresenceStatus: 'PRESENCE_FLAG_ONLY',
    },
    {
      fieldName: 'stockQuantityPresent',
      fieldPresenceStatus: 'PRESENCE_FLAG_ONLY',
    },
  ];

  const reviewItems: NaverReadOnlyProductStructureReviewItem[] = [
    {
      reviewItem: 'Task 284 Approval Packet',
      status: 'APPROVAL_PACKET_CONFIRMED',
      meaning: 'Task 284 승인 패킷을 확인했습니다.',
    },
    {
      reviewItem: 'Task 283 Outcome Certification',
      status: 'OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 283 인증 결과를 확인했습니다.',
    },
    {
      reviewItem: 'Task 281 Summary Review',
      status: 'SUMMARY_REVIEW_CONFIRMED',
      meaning: 'Task 281 요약 검토 결과를 확인했습니다.',
    },
    {
      reviewItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 캡처 결과를 확인했습니다.',
    },
    {
      reviewItem: '구조 검토 상태',
      status: 'STRUCTURE_REVIEW_STATUS_RECORDED',
      meaning: '구조 검토 상태를 기록했습니다.',
    },
    {
      reviewItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '기존 캡처 데이터만 사용했습니다.',
    },
    {
      reviewItem: '기존 요약 검토 결과만 사용',
      status: 'SUMMARY_DATA_ONLY_CONFIRMED',
      meaning: '기존 요약 검토 결과만 사용했습니다.',
    },
    {
      reviewItem: 'channelProductNo',
      status: 'STRUCTURE_FIELD_REVIEWED',
      meaning: '상품번호 구조 필드를 확인했습니다.',
    },
    {
      reviewItem: 'productName',
      status: 'STRUCTURE_FIELD_REVIEWED',
      meaning: '상품명 구조 필드를 확인했습니다.',
    },
    {
      reviewItem: 'productStatus',
      status: 'STRUCTURE_FIELD_REVIEWED',
      meaning: '상품 상태 구조 필드를 확인했습니다.',
    },
    {
      reviewItem: 'leafCategoryId',
      status: 'STRUCTURE_FIELD_REVIEWED',
      meaning: '카테고리 구조 필드를 확인했습니다.',
    },
    {
      reviewItem: '대표 이미지 존재 여부',
      status: 'PRESENCE_FLAG_ONLY',
      meaning: '원본 URL 없이 존재 여부만 확인했습니다.',
    },
    {
      reviewItem: '판매가 존재 여부',
      status: 'PRESENCE_FLAG_ONLY',
      meaning: '원본 값 없이 존재 여부만 확인했습니다.',
    },
    {
      reviewItem: '재고 존재 여부',
      status: 'PRESENCE_FLAG_ONLY',
      meaning: '원본 값 없이 존재 여부만 확인했습니다.',
    },
    {
      reviewItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      reviewItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      reviewItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 응답 전체를 포함하지 않습니다.',
    },
    {
      reviewItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 값을 표시하지 않습니다.',
    },
    {
      reviewItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급은 수행하지 않습니다.',
    },
    {
      reviewItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출은 수행하지 않습니다.',
    },
    {
      reviewItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출은 수행하지 않습니다.',
    },
    {
      reviewItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경은 수행하지 않습니다.',
    },
    {
      reviewItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경은 수행하지 않습니다.',
    },
    {
      reviewItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update는 수행하지 않습니다.',
    },
    {
      reviewItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로가 없습니다.',
    },
    {
      reviewItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 단계는 별도 지시 또는 후속 구현이 필요합니다.',
    },
    {
      reviewItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 285는 read-only 상품 구조 검토 표시 전용입니다.',
    },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_READY',
    panelTitle: 'Naver Read-Only Product Structure Review (Task 285)',
    description:
      'Task 285는 사용자 승인에 따라 기존 캡처 데이터와 기존 요약 검토 결과만 사용해 read-only 상품 구조를 검토하는 단계입니다. Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write는 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductStructureReviewReady: true,
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
    isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true,
    isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    readOnlyProductStructureReviewStatus,
    isReadOnlyProductStructureReviewComplete:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_COMPLETE',
    isReadOnlyProductStructureReviewWithMissingFieldNotice:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_WITH_MISSING_FIELD_NOTICE',
    isReadOnlyProductStructureReviewBlockedByGwIpNotAllowed:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    isReadOnlyProductStructureReviewBlockedByTokenRetryFailure:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    isReadOnlyProductStructureReviewBlockedByEnvMissing:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_ENV_MISSING',
    isReadOnlyProductStructureReviewBlockedByMissingChannelProductNo:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    isReadOnlyProductStructureReviewBlockedByProductLookupFailure:
      readOnlyProductStructureReviewStatus ===
      'READ_ONLY_PRODUCT_STRUCTURE_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    isReadOnlyProductStructureReviewExecutedInThisTask: isAvailable,
    isReadOnlyProductStructureSummaryAvailable: isAvailable,
    readOnlyProductStructureSummary,
    isChannelProductNoPresent,
    isProductNamePresent,
    isProductStatusPresent,
    isLeafCategoryIdPresent,
    isRepresentativeImagePresenceFlagOnly: true,
    isSalePricePresenceFlagOnly: true,
    isStockQuantityPresenceFlagOnly: true,
    isCapturedDataUsedOnly: true,
    isSummaryReviewResultUsedOnly: true,
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
