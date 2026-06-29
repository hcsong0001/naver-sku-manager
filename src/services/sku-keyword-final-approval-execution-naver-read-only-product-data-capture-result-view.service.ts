export interface NaverReadOnlyProductDataCaptureResultItem {
  captureItem: string;
  status: string;
  meaning: string;
}

export interface CapturedProductData {
  channelProductNo?: string;
  productName?: string;
  productStatus?: string;
  salePricePresent?: boolean;
  stockQuantityPresent?: boolean;
  leafCategoryId?: string;
  representativeImageUrlPresent?: boolean;
}

export interface NaverReadOnlyProductDataCaptureResultView {
  status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_RESULT_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductDataCaptureResultReady: true;
  isNaverReadOnlyProductDataCaptureApprovalPacketReady: true;
  isNaverProductLookupLiveRetryOutcomeCertificationReady: true;
  isNaverProductLookupLiveRetryResultReady: true;
  readOnlyProductDataCaptureApprovalPacketStatus: string;
  readOnlyProductDataCaptureStatus: string;
  isReadOnlyProductDataCaptureExecuted: boolean;
  isReadOnlyProductDataCaptureBlockedByGwIpNotAllowed: boolean;
  isReadOnlyProductDataCaptureBlockedByTokenRetryFailure: boolean;
  isReadOnlyProductDataCaptureBlockedByEnvMissing: boolean;
  isReadOnlyProductDataCaptureBlockedByMissingChannelProductNo: boolean;
  isReadOnlyProductDataCaptureBlockedByProductLookupFailure: boolean;
  isCapturedFromExistingReadOnlyLookupResult: boolean;
  capturedProductData: CapturedProductData | null;
  captureItems: NaverReadOnlyProductDataCaptureResultItem[];
  isRawProductApiResponseDisplayed: false;
  isRawProductApiResponseStored: false;
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

const VALID_PACKET_STATUSES = [
  'APPROVAL_PACKET_READY',
  'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
  'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
] as const;

type PacketStatus = typeof VALID_PACKET_STATUSES[number];

const CAPTURE_STATUS_MAP: Record<PacketStatus, string> = {
  'APPROVAL_PACKET_READY': 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT',
  'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED': 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE': 'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING': 'CAPTURE_BLOCKED_BY_ENV_MISSING',
  'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO': 'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE': 'CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

export function buildNaverReadOnlyProductDataCaptureResultView(input: {
  approvalPacketStatus: string;
  liveRetryResult: any;
}): NaverReadOnlyProductDataCaptureResultView {
  const rawPacketStatus = input?.approvalPacketStatus ?? '';
  const packetStatus: PacketStatus =
    (VALID_PACKET_STATUSES as readonly string[]).includes(rawPacketStatus)
      ? (rawPacketStatus as PacketStatus)
      : 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const liveRetry = input?.liveRetryResult ?? null;
  const tokenRetryStatus: string = liveRetry?.issuanceRetryStatus ?? 'FAILURE';
  const productLookupStatus: string = liveRetry?.productLookupStatus ?? 'SKIPPED';

  // APPROVAL_PACKET_READY가 있어도 실제 조회 성공이어야 캡처 실행
  const isActualSuccess =
    packetStatus === 'APPROVAL_PACKET_READY' &&
    tokenRetryStatus === 'SUCCESS' &&
    productLookupStatus === 'SUCCESS';

  const readOnlyProductDataCaptureStatus = isActualSuccess
    ? 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT'
    : CAPTURE_STATUS_MAP[packetStatus];

  const isReadOnlyProductDataCaptureExecuted = readOnlyProductDataCaptureStatus === 'CAPTURED_FROM_READ_ONLY_LOOKUP_RESULT';
  const isBlockedByGwIpNotAllowed = readOnlyProductDataCaptureStatus === 'CAPTURE_BLOCKED_BY_GW_IP_NOT_ALLOWED';
  const isBlockedByTokenRetryFailure = readOnlyProductDataCaptureStatus === 'CAPTURE_BLOCKED_BY_TOKEN_RETRY_FAILURE';
  const isBlockedByEnvMissing = readOnlyProductDataCaptureStatus === 'CAPTURE_BLOCKED_BY_ENV_MISSING';
  const isBlockedByMissingChannelProductNo = readOnlyProductDataCaptureStatus === 'CAPTURE_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  const isBlockedByProductLookupFailure = readOnlyProductDataCaptureStatus === 'CAPTURE_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

  // 허용 필드만 추출 — 원본 응답 전체 포함 금지
  let capturedProductData: CapturedProductData | null = null;
  if (isReadOnlyProductDataCaptureExecuted) {
    const info = liveRetry?.productLookupReadOnlyInfo ?? null;
    if (info) {
      capturedProductData = {
        channelProductNo: info.channelProductNo ?? undefined,
        productName: info.productName ?? undefined,
        productStatus: info.statusType ?? undefined,
        salePricePresent: info.salePrice !== null && info.salePrice !== undefined,
        stockQuantityPresent: info.stockQuantity !== null && info.stockQuantity !== undefined,
        leafCategoryId: info.leafCategoryId ?? undefined,
        representativeImageUrlPresent: info.hasRepresentativeImage === true,
      };
    }
  }

  const captureItems: NaverReadOnlyProductDataCaptureResultItem[] = [
    { captureItem: 'Task 275 Approval Packet', status: 'APPROVAL_PACKET_CONFIRMED', meaning: 'Task 275 승인 패킷 확인' },
    { captureItem: 'Task 274 Outcome Certification', status: 'OUTCOME_CERTIFICATION_CONFIRMED', meaning: 'Task 274 인증 확인' },
    { captureItem: 'Task 271 Live Retry Result', status: 'LIVE_RETRY_RESULT_CONFIRMED', meaning: 'Task 271 결과 확인' },
    { captureItem: 'read-only 캡처 상태', status: 'CAPTURE_STATUS_RECORDED', meaning: '캡처 상태 기록' },
    { captureItem: '승인 READY 상태', status: 'CAPTURE_ALLOWED_IF_APPROVAL_PACKET_READY', meaning: '승인 패킷 READY일 때만 캡처' },
    { captureItem: '상품 조회 성공 상태', status: 'CAPTURE_ALLOWED_IF_LOOKUP_SUCCESS', meaning: '조회 성공일 때만 캡처' },
    { captureItem: '상품 데이터 캡처', status: 'READ_ONLY_DATA_CAPTURED', meaning: '성공 시 표시용 데이터 캡처' },
    { captureItem: 'GW IP 차단', status: 'CAPTURE_BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED', meaning: 'IP 문제 시 차단' },
    { captureItem: 'Token 실패 차단', status: 'CAPTURE_BLOCKED_RECHECK_AUTH_REQUIRED', meaning: '인증 문제 시 차단' },
    { captureItem: 'Env 누락 차단', status: 'CAPTURE_BLOCKED_RECHECK_ENV_REQUIRED', meaning: 'Env 문제 시 차단' },
    { captureItem: '상품번호 누락 차단', status: 'CAPTURE_BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED', meaning: '상품번호 문제 시 차단' },
    { captureItem: '상품 조회 실패 차단', status: 'CAPTURE_BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED', meaning: '조회 실패 시 차단' },
    { captureItem: 'Token 재발급', status: 'NOT_EXECUTED', meaning: '이번 Task 발급 없음' },
    { captureItem: '상품 조회 API 재호출', status: 'NOT_EXECUTED', meaning: '이번 Task 조회 없음' },
    { captureItem: '상품 수정 API 호출', status: 'NOT_EXECUTED', meaning: '수정 없음' },
    { captureItem: '가격 변경', status: 'NOT_EXECUTED', meaning: '가격 변경 없음' },
    { captureItem: '재고 변경', status: 'NOT_EXECUTED', meaning: '재고 변경 없음' },
    { captureItem: 'DB write', status: 'NOT_EXECUTED', meaning: 'DB write 없음' },
    { captureItem: 'DB upsert', status: 'NOT_EXECUTED', meaning: 'DB upsert 없음' },
    { captureItem: 'DB update', status: 'NOT_EXECUTED', meaning: 'DB update 없음' },
    { captureItem: 'Token 값 표시', status: 'NOT_DISPLAYED', meaning: 'Token 값 표시 없음' },
    { captureItem: '인증키 값 표시', status: 'NOT_DISPLAYED', meaning: 'Auth 값 표시 없음' },
    { captureItem: 'Signature 표시', status: 'NOT_DISPLAYED', meaning: 'Signature 표시 없음' },
    { captureItem: 'Authorization 헤더 표시', status: 'NOT_DISPLAYED', meaning: 'Authorization 표시 없음' },
    { captureItem: 'raw API response 표시', status: 'NOT_DISPLAYED', meaning: '원본 응답 전체 표시 없음' },
    { captureItem: '.env 직접 열람', status: 'NOT_ACCESSED', meaning: '파일 열람 없음' },
    { captureItem: '.env 자동 수정', status: 'NOT_MODIFIED', meaning: '파일 수정 없음' },
    { captureItem: 'Worker / Queue / Adapter', status: 'LOCKED', meaning: '실행 경로 없음' },
    { captureItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 276은 read-only 캡처 결과 표시 전용' },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_RESULT_READY',
    panelTitle: 'Naver Read-Only Product Data Capture Result (Task 276)',
    description:
      'Task 276은 Task 271에서 이미 확보된 read-only 상품 조회 결과를 화면 표시용 데이터로 정리하는 단계입니다. 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다. 캡처된 데이터는 DB 저장이 아니라 read-only View Model 표시용입니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductDataCaptureResultReady: true,
    isNaverReadOnlyProductDataCaptureApprovalPacketReady: true,
    isNaverProductLookupLiveRetryOutcomeCertificationReady: true,
    isNaverProductLookupLiveRetryResultReady: true,
    readOnlyProductDataCaptureApprovalPacketStatus: packetStatus,
    readOnlyProductDataCaptureStatus,
    isReadOnlyProductDataCaptureExecuted,
    isReadOnlyProductDataCaptureBlockedByGwIpNotAllowed: isBlockedByGwIpNotAllowed,
    isReadOnlyProductDataCaptureBlockedByTokenRetryFailure: isBlockedByTokenRetryFailure,
    isReadOnlyProductDataCaptureBlockedByEnvMissing: isBlockedByEnvMissing,
    isReadOnlyProductDataCaptureBlockedByMissingChannelProductNo: isBlockedByMissingChannelProductNo,
    isReadOnlyProductDataCaptureBlockedByProductLookupFailure: isBlockedByProductLookupFailure,
    isCapturedFromExistingReadOnlyLookupResult: isReadOnlyProductDataCaptureExecuted,
    capturedProductData,
    captureItems,
    isRawProductApiResponseDisplayed: false,
    isRawProductApiResponseStored: false,
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
