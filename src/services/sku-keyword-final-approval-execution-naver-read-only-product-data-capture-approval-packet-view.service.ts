export interface NaverReadOnlyProductDataCaptureApprovalPacketItem {
  packetItem: string;
  status: string;
  meaning: string;
}

export interface NaverReadOnlyProductDataCaptureApprovalPacketView {
  status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_APPROVAL_PACKET_READY';
  panelTitle: string;
  description: string;
  isBatchJobResultDisplayOnly: true;
  isNaverReadOnlyProductDataCaptureApprovalPacketReady: true;
  isNaverProductLookupLiveRetryOutcomeCertificationReady: true;
  isNaverProductLookupLiveRetryOutcomeDecisionGateReady: true;
  isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true;
  outcomeCertificationStatus: string;
  readOnlyProductDataCaptureApprovalPacketStatus: string;
  isReadOnlyProductDataCaptureApprovalPacketReady: boolean;
  isReadOnlyProductDataCaptureApprovalPacketBlockedByGwIpNotAllowed: boolean;
  isReadOnlyProductDataCaptureApprovalPacketBlockedByTokenRetryFailure: boolean;
  isReadOnlyProductDataCaptureApprovalPacketBlockedByEnvMissing: boolean;
  isReadOnlyProductDataCaptureApprovalPacketBlockedByMissingChannelProductNo: boolean;
  isReadOnlyProductDataCaptureApprovalPacketBlockedByProductLookupFailure: boolean;
  isReadOnlyProductDataCaptureApprovalRequired: true;
  isReadOnlyProductDataCaptureApprovalGranted: false;
  isUserApprovalPhraseReceivedForReadOnlyProductDataCapture: false;
  userApprovalPhraseGuide: string;
  packetItems: NaverReadOnlyProductDataCaptureApprovalPacketItem[];
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

const VALID_OUTCOME_STATUSES = [
  'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE',
  'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'CERTIFIED_BLOCKED_BY_ENV_MISSING',
  'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
] as const;

type OutcomeCertificationStatus = typeof VALID_OUTCOME_STATUSES[number];

const PACKET_STATUS_MAP: Record<OutcomeCertificationStatus, string> = {
  'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE': 'APPROVAL_PACKET_READY',
  'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED': 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED',
  'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE': 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE',
  'CERTIFIED_BLOCKED_BY_ENV_MISSING': 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING',
  'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO': 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
  'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE': 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
};

export function buildNaverReadOnlyProductDataCaptureApprovalPacketView(
  task274Result: any
): NaverReadOnlyProductDataCaptureApprovalPacketView {
  const rawStatus = task274Result?.outcomeCertificationStatus ?? '';
  const outcomeCertificationStatus: OutcomeCertificationStatus =
    (VALID_OUTCOME_STATUSES as readonly string[]).includes(rawStatus)
      ? (rawStatus as OutcomeCertificationStatus)
      : 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const readOnlyProductDataCaptureApprovalPacketStatus = PACKET_STATUS_MAP[outcomeCertificationStatus];

  const isReady = readOnlyProductDataCaptureApprovalPacketStatus === 'APPROVAL_PACKET_READY';
  const isBlockedByGwIpNotAllowed = readOnlyProductDataCaptureApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_GW_IP_NOT_ALLOWED';
  const isBlockedByTokenRetryFailure = readOnlyProductDataCaptureApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_TOKEN_RETRY_FAILURE';
  const isBlockedByEnvMissing = readOnlyProductDataCaptureApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_ENV_MISSING';
  const isBlockedByMissingChannelProductNo = readOnlyProductDataCaptureApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  const isBlockedByProductLookupFailure = readOnlyProductDataCaptureApprovalPacketStatus === 'APPROVAL_PACKET_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

  const packetItems: NaverReadOnlyProductDataCaptureApprovalPacketItem[] = [
    { packetItem: 'Task 274 Outcome Certification', status: 'OUTCOME_CERTIFICATION_CONFIRMED', meaning: 'Task 274 인증 확인' },
    { packetItem: 'Task 273 Decision Gate', status: 'DECISION_GATE_CONFIRMED', meaning: 'Task 273 판정 확인' },
    { packetItem: 'Task 272 감사 봉인', status: 'NON_MUTATION_AUDIT_CONFIRMED', meaning: '비수정 감사 봉인 확인' },
    { packetItem: 'Approval Packet 상태', status: 'APPROVAL_PACKET_STATUS_RECORDED', meaning: '승인 패킷 상태 기록' },
    { packetItem: '성공 시 승인 요청', status: 'READY_IF_CERTIFIED_READY', meaning: '인증 READY일 때만 승인 요청 가능' },
    { packetItem: 'GW IP 차단 시', status: 'BLOCKED_RECHECK_IP_ALLOWLIST_REQUIRED', meaning: '허용 IP 재확인 필요' },
    { packetItem: 'Token 실패 시', status: 'BLOCKED_RECHECK_AUTH_REQUIRED', meaning: '인증/권한 재확인 필요' },
    { packetItem: 'Env 누락 시', status: 'BLOCKED_RECHECK_ENV_REQUIRED', meaning: 'Env/Auth 재확인 필요' },
    { packetItem: '상품번호 누락 시', status: 'BLOCKED_RECHECK_CHANNEL_PRODUCT_NO_REQUIRED', meaning: 'channelProductNo 확인 필요' },
    { packetItem: '상품 조회 실패 시', status: 'BLOCKED_RECHECK_PRODUCT_ACCESS_REQUIRED', meaning: '상품/스토어 접근 확인 필요' },
    { packetItem: '사용자 별도 승인', status: 'PENDING_USER_APPROVAL', meaning: '아직 사용자 승인 전' },
    { packetItem: 'read-only 데이터 캡처', status: 'LOCKED_UNTIL_USER_APPROVAL', meaning: '승인 전 캡처 금지' },
    { packetItem: 'Token 재발급', status: 'NOT_EXECUTED', meaning: '이번 Task 발급 없음' },
    { packetItem: '상품 조회 API 재호출', status: 'NOT_EXECUTED', meaning: '이번 Task 조회 없음' },
    { packetItem: '상품 수정 API 호출', status: 'NOT_EXECUTED', meaning: '수정 없음' },
    { packetItem: '가격 변경', status: 'NOT_EXECUTED', meaning: '가격 변경 없음' },
    { packetItem: '재고 변경', status: 'NOT_EXECUTED', meaning: '재고 변경 없음' },
    { packetItem: 'DB write', status: 'NOT_EXECUTED', meaning: 'DB write 없음' },
    { packetItem: 'Token 값 표시', status: 'NOT_DISPLAYED', meaning: 'Token 값 표시 없음' },
    { packetItem: '인증키 값 표시', status: 'NOT_DISPLAYED', meaning: 'Auth 값 표시 없음' },
    { packetItem: 'Signature 표시', status: 'NOT_DISPLAYED', meaning: 'Signature 표시 없음' },
    { packetItem: 'Authorization 헤더 표시', status: 'NOT_DISPLAYED', meaning: 'Authorization 표시 없음' },
    { packetItem: '.env 직접 열람', status: 'NOT_ACCESSED', meaning: '파일 열람 없음' },
    { packetItem: '.env 자동 수정', status: 'NOT_MODIFIED', meaning: '파일 수정 없음' },
    { packetItem: 'Worker / Queue / Adapter', status: 'LOCKED', meaning: '실행 경로 없음' },
    { packetItem: '현재 Task 상태', status: 'READ_ONLY_INFO', meaning: 'Task 275는 승인 패킷 표시 전용' },
  ];

  return {
    status: 'NAVER_READ_ONLY_PRODUCT_DATA_CAPTURE_APPROVAL_PACKET_READY',
    panelTitle: 'Naver Read-Only Product Data Capture Approval Packet (Task 275)',
    description:
      'Task 274 Outcome Certification 결과를 확인하고, 다음 단계인 read-only 상품 데이터 캡처 진입 가능 여부를 승인 패킷으로 정리합니다. 이번 Task에서는 Token 재발급, Naver API 재호출, 상품 수정, 가격/재고 변경, DB write를 수행하지 않습니다.',
    isBatchJobResultDisplayOnly: true,
    isNaverReadOnlyProductDataCaptureApprovalPacketReady: true,
    isNaverProductLookupLiveRetryOutcomeCertificationReady: true,
    isNaverProductLookupLiveRetryOutcomeDecisionGateReady: true,
    isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true,
    outcomeCertificationStatus,
    readOnlyProductDataCaptureApprovalPacketStatus,
    isReadOnlyProductDataCaptureApprovalPacketReady: isReady,
    isReadOnlyProductDataCaptureApprovalPacketBlockedByGwIpNotAllowed: isBlockedByGwIpNotAllowed,
    isReadOnlyProductDataCaptureApprovalPacketBlockedByTokenRetryFailure: isBlockedByTokenRetryFailure,
    isReadOnlyProductDataCaptureApprovalPacketBlockedByEnvMissing: isBlockedByEnvMissing,
    isReadOnlyProductDataCaptureApprovalPacketBlockedByMissingChannelProductNo: isBlockedByMissingChannelProductNo,
    isReadOnlyProductDataCaptureApprovalPacketBlockedByProductLookupFailure: isBlockedByProductLookupFailure,
    isReadOnlyProductDataCaptureApprovalRequired: true,
    isReadOnlyProductDataCaptureApprovalGranted: false,
    isUserApprovalPhraseReceivedForReadOnlyProductDataCapture: false,
    userApprovalPhraseGuide:
      'Task 276에서 Naver 상품 조회 결과의 read-only 데이터 캡처를 승인합니다. 상품 수정·가격 변경·재고 변경·DB write는 절대 수행하지 말고, Token/Auth/Signature/Authorization 값은 출력하지 마세요.',
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
