import type { NaverBasicProductDataSummaryReviewOutcomeCertificationStatus } from './sku-keyword-final-approval-execution-naver-basic-product-data-summary-review-outcome-certification-view.service';

export type NaverReadOnlyProductStructureReviewApprovalPacketStatus =
  | 'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY'
  | 'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
  | 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING'
  | 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export interface NaverReadOnlyProductStructureReviewApprovalPacketItem {
  packetItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductStructureReviewApprovalPacketView {
  status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_APPROVAL_PACKET_READY';
  panelTitle: string;
  description: string;
  userApprovalPhraseGuide: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductStructureReviewApprovalPacketReady: true;
  isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true;
  isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true;
  isNaverBasicProductDataSummaryReviewReady: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  basicProductDataSummaryReviewOutcomeCertificationStatus: NaverBasicProductDataSummaryReviewOutcomeCertificationStatus;
  readOnlyProductStructureReviewApprovalPacketStatus: NaverReadOnlyProductStructureReviewApprovalPacketStatus;
  isReadOnlyProductStructureReviewApprovalPacketReadyForCompleteSummary: boolean;
  isReadOnlyProductStructureReviewApprovalPacketReadyWithMissingFieldNotice: boolean;
  isReadOnlyProductStructureReviewApprovalPacketBlockedByGwIpNotAllowed: boolean;
  isReadOnlyProductStructureReviewApprovalPacketBlockedByTokenRetryFailure: boolean;
  isReadOnlyProductStructureReviewApprovalPacketBlockedByEnvMissing: boolean;
  isReadOnlyProductStructureReviewApprovalPacketBlockedByMissingChannelProductNo: boolean;
  isReadOnlyProductStructureReviewApprovalPacketBlockedByProductLookupFailure: boolean;
  isReadOnlyProductStructureReviewApprovalRequired: true;
  isReadOnlyProductStructureReviewApprovalGranted: false;
  isUserApprovalPhraseReceivedForReadOnlyProductStructureReview: false;
  isReadOnlyProductStructureReviewExecutedInThisTask: false;
  isCapturedDataUsedOnly: true;
  isNewApiCallExecutedInThisTask: false;
  isSalePriceRawValueIncluded: false;
  isStockQuantityRawValueIncluded: false;
  isRawProductApiResponseIncluded: false;
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
  packetItems: NaverReadOnlyProductStructureReviewApprovalPacketItem[];
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

const OUTCOME_TO_PACKET: Record<
  NaverBasicProductDataSummaryReviewOutcomeCertificationStatus,
  NaverReadOnlyProductStructureReviewApprovalPacketStatus
> = {
  CERTIFIED_SUMMARY_REVIEW_COMPLETE: 'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY',
  CERTIFIED_SUMMARY_REVIEW_WITH_MISSING_FIELD_NOTICE:
    'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
  CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED:
    'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_TOKEN_RETRY_FAILURE:
    'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_ENV_MISSING:
    'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
  CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO:
    'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE:
    'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

const ALLOWED_OUTCOME_STATUSES = Object.keys(
  OUTCOME_TO_PACKET
) as NaverBasicProductDataSummaryReviewOutcomeCertificationStatus[];

export function buildNaverReadOnlyProductStructureReviewApprovalPacketView(input: {
  outcomeCertification: any;
  summaryReview: any;
  safetyAuditSeal: any;
  captureResult: any;
}): NaverReadOnlyProductStructureReviewApprovalPacketView {
  const outcomeCertification = input?.outcomeCertification ?? null;
  const rawOutcomeStatus =
    outcomeCertification?.basicProductDataSummaryReviewOutcomeCertificationStatus;
  const basicProductDataSummaryReviewOutcomeCertificationStatus: NaverBasicProductDataSummaryReviewOutcomeCertificationStatus =
    ALLOWED_OUTCOME_STATUSES.includes(rawOutcomeStatus)
      ? rawOutcomeStatus
      : 'CERTIFIED_SUMMARY_REVIEW_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const readOnlyProductStructureReviewApprovalPacketStatus =
    OUTCOME_TO_PACKET[basicProductDataSummaryReviewOutcomeCertificationStatus];

  const packetItems: NaverReadOnlyProductStructureReviewApprovalPacketItem[] = [
    {
      packetItem: 'Task 283 Outcome Certification',
      status: 'SUMMARY_OUTCOME_CERTIFICATION_CONFIRMED',
      meaning: 'Task 283 인증 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 282 Safety Audit Seal',
      status: 'SUMMARY_SAFETY_AUDIT_SEAL_CONFIRMED',
      meaning: 'Task 282 안전 감사 봉인을 확인했습니다.',
    },
    {
      packetItem: 'Task 281 Summary Review',
      status: 'SUMMARY_REVIEW_CONFIRMED',
      meaning: 'Task 281 요약 검토 결과를 확인했습니다.',
    },
    {
      packetItem: 'Task 276 Capture Result',
      status: 'CAPTURE_RESULT_CONFIRMED',
      meaning: 'Task 276 캡처 결과를 확인했습니다.',
    },
    {
      packetItem: 'Approval Packet 상태',
      status: 'APPROVAL_PACKET_STATUS_RECORDED',
      meaning: `readOnlyProductStructureReviewApprovalPacketStatus: ${readOnlyProductStructureReviewApprovalPacketStatus}`,
    },
    {
      packetItem: 'COMPLETE 요약',
      status: 'READY_FOR_STRUCTURE_REVIEW_IF_COMPLETE',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY'
          ? 'COMPLETE면 구조 검토 승인 요청이 가능합니다.'
          : '현재 COMPLETE 기준 READY 상태는 아닙니다.',
    },
    {
      packetItem: 'PARTIAL 요약',
      status: 'READY_WITH_MISSING_FIELD_NOTICE',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE'
          ? 'PARTIAL이면 누락 안내 포함 구조 검토 승인 요청이 가능합니다.'
          : '현재 PARTIAL 기준 READY 상태는 아닙니다.',
    },
    {
      packetItem: 'GW IP 차단',
      status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED'
          ? 'IP 허용 목록 재확인이 필요합니다.'
          : '현재 GW IP 차단 상태는 아닙니다.',
    },
    {
      packetItem: 'Token 실패 차단',
      status: 'BLOCKED_RECHECK_AUTH_REQUIRED',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE'
          ? '인증/권한 재확인이 필요합니다.'
          : '현재 Token 실패 차단 상태는 아닙니다.',
    },
    {
      packetItem: 'Env 누락 차단',
      status: 'BLOCKED_RECHECK_ENV_REQUIRED',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING'
          ? 'Env/Auth 재확인이 필요합니다.'
          : '현재 Env 누락 차단 상태는 아닙니다.',
    },
    {
      packetItem: '상품번호 누락 차단',
      status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
          ? 'channelProductNo 확인이 필요합니다.'
          : '현재 상품번호 누락 차단 상태는 아닙니다.',
    },
    {
      packetItem: '상품 조회 실패 차단',
      status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning:
        readOnlyProductStructureReviewApprovalPacketStatus ===
        'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'
          ? '상품/스토어 접근 확인이 필요합니다.'
          : '현재 상품 조회 실패 차단 상태는 아닙니다.',
    },
    {
      packetItem: '사용자 별도 승인',
      status: 'PENDING_USER_APPROVAL',
      meaning: '아직 사용자 승인 전입니다.',
    },
    {
      packetItem: '실제 상품 구조 검토',
      status: 'LOCKED_UNTIL_USER_APPROVAL',
      meaning: '사용자 승인 전까지 실제 상품 구조 검토를 수행하지 않습니다.',
    },
    {
      packetItem: '기존 캡처 데이터만 사용',
      status: 'CAPTURED_DATA_ONLY_CONFIRMED',
      meaning: '기존 캡처 데이터와 기존 요약 검토 결과만 사용합니다.',
    },
    {
      packetItem: '가격 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '가격 원본 값은 포함하지 않습니다.',
    },
    {
      packetItem: '재고 원본 값',
      status: 'NOT_INCLUDED',
      meaning: '재고 원본 값은 포함하지 않습니다.',
    },
    {
      packetItem: 'raw API response',
      status: 'NOT_INCLUDED',
      meaning: '원본 응답 전체는 포함하지 않습니다.',
    },
    {
      packetItem: 'Token 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Token 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Auth 값',
      status: 'NOT_DISPLAYED',
      meaning: 'Auth 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Signature',
      status: 'NOT_DISPLAYED',
      meaning: 'Signature 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Authorization 헤더',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 값을 표시하지 않습니다.',
    },
    {
      packetItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token 재발급은 수행하지 않습니다.',
    },
    {
      packetItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API 재호출은 수행하지 않습니다.',
    },
    {
      packetItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API 호출은 수행하지 않습니다.',
    },
    {
      packetItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 변경은 수행하지 않습니다.',
    },
    {
      packetItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고 변경은 수행하지 않습니다.',
    },
    {
      packetItem: 'DB write/upsert/update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write/upsert/update는 수행하지 않습니다.',
    },
    {
      packetItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로가 없습니다.',
    },
    {
      packetItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 284는 승인 요청 패킷 표시 전용입니다.',
    },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_STRUCTURE_REVIEW_APPROVAL_PACKET_READY',
    panelTitle:
      'Naver Read-Only Product Structure Review Approval Packet (Task 284)',
    description:
      'Task 284는 read-only 상품 구조 검토로 진입하기 위한 승인 요청 패킷입니다. COMPLETE 또는 PARTIAL 상태에서는 다음 단계 승인 요청이 가능하지만, 사용자 별도 승인 전까지 상품 구조 검토를 수행하지 않습니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',
    userApprovalPhraseGuide:
      '실제 read-only 상품 구조 검토 단계를 진행하려면 사용자가 아래 문구로 별도 승인해야 합니다.\n\n"Task 285에서 Naver read-only 상품 구조 검토를 승인합니다. 기존 캡처 데이터와 기존 요약 검토 결과만 사용하고, Token 재발급·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요."',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductStructureReviewApprovalPacketReady: true,
    isNaverBasicProductDataSummaryReviewOutcomeCertificationReady: true,
    isNaverBasicProductDataSummaryReviewSafetyAuditSealed: true,
    isNaverBasicProductDataSummaryReviewReady: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    basicProductDataSummaryReviewOutcomeCertificationStatus,
    readOnlyProductStructureReviewApprovalPacketStatus,
    isReadOnlyProductStructureReviewApprovalPacketReadyForCompleteSummary:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_READY_FOR_COMPLETE_SUMMARY',
    isReadOnlyProductStructureReviewApprovalPacketReadyWithMissingFieldNotice:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE',
    isReadOnlyProductStructureReviewApprovalPacketBlockedByGwIpNotAllowed:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    isReadOnlyProductStructureReviewApprovalPacketBlockedByTokenRetryFailure:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    isReadOnlyProductStructureReviewApprovalPacketBlockedByEnvMissing:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
    isReadOnlyProductStructureReviewApprovalPacketBlockedByMissingChannelProductNo:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    isReadOnlyProductStructureReviewApprovalPacketBlockedByProductLookupFailure:
      readOnlyProductStructureReviewApprovalPacketStatus ===
      'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
    isReadOnlyProductStructureReviewApprovalRequired: true,
    isReadOnlyProductStructureReviewApprovalGranted: false,
    isUserApprovalPhraseReceivedForReadOnlyProductStructureReview: false,
    isReadOnlyProductStructureReviewExecutedInThisTask: false,
    isCapturedDataUsedOnly: true,
    isNewApiCallExecutedInThisTask: false,
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
