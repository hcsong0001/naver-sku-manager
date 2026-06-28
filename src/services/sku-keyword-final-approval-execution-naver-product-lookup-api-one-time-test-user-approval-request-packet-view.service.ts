export type NaverProductLookupApprovalRequestPacketItemStatus =
  | 'READINESS_GATE_CONFIRMED'
  | 'TOKEN_TEST_RESULT_CONFIRMED'
  | 'NON_RETENTION_AUDIT_CONFIRMED'
  | 'READY_IF_READINESS_GATE_READY'
  | 'BLOCKED_IF_READINESS_GATE_BLOCKED'
  | 'PENDING_USER_APPROVAL'
  | 'LOCKED_UNTIL_USER_APPROVAL'
  | 'LOCKED'
  | 'FORBIDDEN'
  | 'NOT_ACCESSED'
  | 'NOT_MODIFIED'
  | 'NOT_CONNECTED'
  | 'NOT_PRESENT'
  | 'PENDING_SEPARATE_APPROVAL'
  | 'READ_ONLY_INFO';

export type NaverProductLookupApprovalRequestPacketItem = {
  packetItem: string;
  status: NaverProductLookupApprovalRequestPacketItemStatus;
  meaning: string;
};

export type NaverTokenIssuanceTestStatus = 'SUCCESS' | 'FAILURE' | 'ENV_MISSING';

export type NaverProductLookupReadinessStatus =
  | 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
  | 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
  | 'BLOCKED_BY_ENV_MISSING';

export type NaverProductLookupApprovalRequestPacketStatus =
  | 'APPROVAL_REQUEST_PACKET_READY'
  | 'APPROVAL_REQUEST_PACKET_BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
  | 'APPROVAL_REQUEST_PACKET_BLOCKED_BY_ENV_MISSING';

export type NaverProductLookupApiOneTimeTestUserApprovalRequestPacketView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_PRODUCT_LOOKUP_API_ONE_TIME_TEST_USER_APPROVAL_REQUEST_PACKET_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;

  isNaverProductLookupApiOneTimeTestUserApprovalRequestPacketReady: true;
  isNaverProductLookupApiReadinessGateReady: true;
  isTokenIssuanceOneTimeTestResultReady: true;
  isTokenIssuanceOneTimeTestNonRetentionAuditSealed: true;

  issuanceTestStatus: NaverTokenIssuanceTestStatus;
  productLookupReadinessStatus: NaverProductLookupReadinessStatus;
  productLookupApprovalRequestPacketStatus: NaverProductLookupApprovalRequestPacketStatus;

  isProductLookupApprovalRequestPacketReady: boolean;
  isProductLookupApprovalRequestPacketBlockedByTokenFailure: boolean;
  isProductLookupApprovalRequestPacketBlockedByEnvMissing: boolean;

  isProductLookupApiApprovalRequired: true;
  isProductLookupApiApprovalGranted: false;
  isUserApprovalPhraseReceivedForProductLookupApiTest: false;

  isTokenIssuanceExecutedInThisTask: false;
  isTokenIssued: false;
  isTokenValueIncludedInView: false;
  isTokenValueDisplayed: false;
  isTokenReturnedToClient: false;
  isTokenLoggedToConsole: false;
  isTokenStored: false;
  isTokenStoredInDb: false;

  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  isNaverApiCalledInThisTask: false;
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;

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

  userApprovalScriptForNextTask: string;
  userApprovalNotice: string;

  packetItems: NaverProductLookupApprovalRequestPacketItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

function derivePacketStatus(productLookupReadinessStatus: NaverProductLookupReadinessStatus): {
  productLookupApprovalRequestPacketStatus: NaverProductLookupApprovalRequestPacketStatus;
  isProductLookupApprovalRequestPacketReady: boolean;
  isProductLookupApprovalRequestPacketBlockedByTokenFailure: boolean;
  isProductLookupApprovalRequestPacketBlockedByEnvMissing: boolean;
} {
  if (productLookupReadinessStatus === 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE') {
    return {
      productLookupApprovalRequestPacketStatus: 'APPROVAL_REQUEST_PACKET_READY',
      isProductLookupApprovalRequestPacketReady: true,
      isProductLookupApprovalRequestPacketBlockedByTokenFailure: false,
      isProductLookupApprovalRequestPacketBlockedByEnvMissing: false,
    };
  }
  if (productLookupReadinessStatus === 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE') {
    return {
      productLookupApprovalRequestPacketStatus: 'APPROVAL_REQUEST_PACKET_BLOCKED_BY_TOKEN_ISSUANCE_FAILURE',
      isProductLookupApprovalRequestPacketReady: false,
      isProductLookupApprovalRequestPacketBlockedByTokenFailure: true,
      isProductLookupApprovalRequestPacketBlockedByEnvMissing: false,
    };
  }
  return {
    productLookupApprovalRequestPacketStatus: 'APPROVAL_REQUEST_PACKET_BLOCKED_BY_ENV_MISSING',
    isProductLookupApprovalRequestPacketReady: false,
    isProductLookupApprovalRequestPacketBlockedByTokenFailure: false,
    isProductLookupApprovalRequestPacketBlockedByEnvMissing: true,
  };
}

const USER_APPROVAL_SCRIPT_FOR_NEXT_TASK =
  'Task 267에서 실제 Naver 상품 조회 API 1회 테스트를 승인합니다. 상품 정보는 read-only로 조회하고, 상품 수정·가격 변경·재고 변경은 절대 수행하지 마세요. Token 값은 출력하지 말고, 조회 성공/실패 여부와 안전 요약만 비노출 방식으로 보고하세요.';

export function buildNaverProductLookupApiOneTimeTestUserApprovalRequestPacketView(
  job: any,
  issuanceTestStatus: NaverTokenIssuanceTestStatus = 'SUCCESS',
  productLookupReadinessStatus: NaverProductLookupReadinessStatus = 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
): NaverProductLookupApiOneTimeTestUserApprovalRequestPacketView {
  const packet = derivePacketStatus(productLookupReadinessStatus);

  const approvalReadinessPacketItem: NaverProductLookupApprovalRequestPacketItem =
    packet.isProductLookupApprovalRequestPacketReady
      ? {
          packetItem: '상품 조회 승인 요청 패킷',
          status: 'READY_IF_READINESS_GATE_READY',
          meaning:
            'Task 265 Readiness Gate가 준비 상태이므로 승인 요청 패킷이 준비되었습니다. 실제 호출은 사용자 별도 승인 후 가능합니다.',
        }
      : {
          packetItem: '상품 조회 승인 요청 패킷',
          status: 'BLOCKED_IF_READINESS_GATE_BLOCKED',
          meaning: `Task 265 Readiness Gate가 차단 상태(${productLookupReadinessStatus})이므로 승인 요청 패킷도 차단됩니다.`,
        };

  const packetItems: NaverProductLookupApprovalRequestPacketItem[] = [
    {
      packetItem: 'Product Lookup Readiness Gate (Task 265)',
      status: 'READINESS_GATE_CONFIRMED',
      meaning: 'Task 265 상품 조회 API Readiness Gate가 확인되었습니다.',
    },
    {
      packetItem: 'Token Test Result (Task 263)',
      status: 'TOKEN_TEST_RESULT_CONFIRMED',
      meaning: 'Task 263 Naver Token 발급 1회 테스트 결과가 확인되었습니다.',
    },
    {
      packetItem: 'Token Non-Retention Audit Seal (Task 264)',
      status: 'NON_RETENTION_AUDIT_CONFIRMED',
      meaning: 'Task 264 Token 비노출·비저장·비전파 감사 봉인이 확인되었습니다.',
    },
    approvalReadinessPacketItem,
    {
      packetItem: '상품 조회 승인 요청 차단',
      status: 'BLOCKED_IF_READINESS_GATE_BLOCKED',
      meaning:
        'Readiness Gate가 BLOCKED_BY_TOKEN_ISSUANCE_FAILURE 또는 BLOCKED_BY_ENV_MISSING이면 승인 요청 패킷도 차단됩니다.',
    },
    {
      packetItem: '사용자 별도 승인',
      status: 'PENDING_USER_APPROVAL',
      meaning:
        '실제 Naver 상품 조회 API 1회 테스트는 사용자 별도 명시 승인 전까지 실행하지 않습니다. isUserApprovalPhraseReceivedForProductLookupApiTest: false.',
    },
    {
      packetItem: '실제 상품 조회 API 호출',
      status: 'LOCKED_UNTIL_USER_APPROVAL',
      meaning:
        '실제 Naver 상품 조회 API 호출은 별도 승인 전까지 금지입니다. isProductLookupApiCalled: false.',
    },
    {
      packetItem: '상품 수정 API 호출',
      status: 'LOCKED',
      meaning: '상품 수정 API 호출이 없습니다. isProductUpdateApiCalled: false.',
    },
    {
      packetItem: '가격·재고 변경',
      status: 'LOCKED',
      meaning: '가격이나 재고에 대한 실제 변경이 없습니다. isPriceOrStockChanged: false.',
    },
    {
      packetItem: 'Token 재발급',
      status: 'LOCKED',
      meaning: '이번 Task에서 Token을 다시 발급하지 않습니다. isTokenIssuanceExecutedInThisTask: false.',
    },
    {
      packetItem: 'Token 값 표시',
      status: 'FORBIDDEN',
      meaning: 'Token 값은 마스킹/해시/부분 출력을 포함하여 어떤 형태로도 표시하지 않습니다.',
    },
    {
      packetItem: '인증키 값 표시',
      status: 'FORBIDDEN',
      meaning: '인증키(CLIENT_ID, CLIENT_SECRET) 값은 어떤 형태로도 표시하지 않습니다. isAuthKeyValueDisplayed: false.',
    },
    {
      packetItem: 'Secret 로그 출력',
      status: 'FORBIDDEN',
      meaning: 'Secret 값이 로그에 출력되지 않습니다. isSecretLogged: false.',
    },
    {
      packetItem: '".env" 직접 열람',
      status: 'NOT_ACCESSED',
      meaning: '.env / .env.local 파일을 직접 열람하지 않았습니다. isEnvFileDirectlyAccessed: false.',
    },
    {
      packetItem: '".env" 자동 수정',
      status: 'NOT_MODIFIED',
      meaning: '.env / .env.local 파일을 자동 수정하지 않았습니다. isEnvFileModified: false.',
    },
    {
      packetItem: 'POST API 연결',
      status: 'NOT_CONNECTED',
      meaning: '추가적인 POST API 연결이 없습니다. isPostApiConnected: false.',
    },
    {
      packetItem: '승인/실행 버튼',
      status: 'NOT_PRESENT',
      meaning:
        '이 패널에 승인 버튼이나 실행 버튼이 없습니다. hasApprovalRequestButton: false, hasExecutionButton: false.',
    },
    {
      packetItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: 'Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.',
    },
    {
      packetItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning:
        '실제 Naver 상품 조회 API 1회 테스트는 사용자가 Task 267 기준 명시 승인 문구를 별도 지시로 보내야 진행됩니다.',
    },
    {
      packetItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning:
        'Task 266은 상품 조회 API 1회 테스트 사용자 승인 요청 패킷 표시 전용입니다. 새로운 Token 발급이나 상품 API 호출이 없습니다.',
    },
  ];

  const descriptionReadinessPart =
    packet.isProductLookupApprovalRequestPacketReady
      ? 'Task 265 Readiness Gate가 준비 상태이므로 승인 요청 패킷이 준비되었습니다.'
      : `Task 265 Readiness Gate가 차단 상태(${productLookupReadinessStatus})이므로 승인 요청 패킷도 차단됩니다.`;

  return {
    taskName: 'Task 266 - Naver Product Lookup API One-Time Test User Approval Request Packet Screen Flow',
    title: 'Naver Product Lookup API One-Time Test User Approval Request Packet',
    panelTitle: 'Naver 상품 조회 API 1회 테스트 사용자 승인 요청 패킷',
    status: 'NAVER_PRODUCT_LOOKUP_API_ONE_TIME_TEST_USER_APPROVAL_REQUEST_PACKET_READY',
    description:
      `Task 265 Product Lookup API Readiness Gate를 확인했습니다. ${descriptionReadinessPart} 상품 조회 API 1회 테스트는 사용자 별도 승인 전까지 실행하지 않습니다. 이번 Task는 승인 요청 패킷 표시 전용이며, 상품 조회 API 호출·상품 수정 API 호출·가격/재고 변경·Token 재발급을 수행하지 않습니다.`,

    isBatchJobResultDisplayOnly: true,

    isNaverProductLookupApiOneTimeTestUserApprovalRequestPacketReady: true,
    isNaverProductLookupApiReadinessGateReady: true,
    isTokenIssuanceOneTimeTestResultReady: true,
    isTokenIssuanceOneTimeTestNonRetentionAuditSealed: true,

    issuanceTestStatus,
    productLookupReadinessStatus,
    productLookupApprovalRequestPacketStatus: packet.productLookupApprovalRequestPacketStatus,

    isProductLookupApprovalRequestPacketReady: packet.isProductLookupApprovalRequestPacketReady,
    isProductLookupApprovalRequestPacketBlockedByTokenFailure:
      packet.isProductLookupApprovalRequestPacketBlockedByTokenFailure,
    isProductLookupApprovalRequestPacketBlockedByEnvMissing:
      packet.isProductLookupApprovalRequestPacketBlockedByEnvMissing,

    isProductLookupApiApprovalRequired: true,
    isProductLookupApiApprovalGranted: false,
    isUserApprovalPhraseReceivedForProductLookupApiTest: false,

    isTokenIssuanceExecutedInThisTask: false,
    isTokenIssued: false,
    isTokenValueIncludedInView: false,
    isTokenValueDisplayed: false,
    isTokenReturnedToClient: false,
    isTokenLoggedToConsole: false,
    isTokenStored: false,
    isTokenStoredInDb: false,

    isEnvFileDirectlyAccessed: false,
    isEnvFileModified: false,
    isEnvValueDisplayed: false,
    isAuthKeyValueDisplayed: false,
    isSecretLogged: false,
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,

    isNaverApiCalledInThisTask: false,
    isProductLookupApiCalled: false,
    isProductUpdateApiCalled: false,
    isPriceOrStockChanged: false,

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

    userApprovalScriptForNextTask: USER_APPROVAL_SCRIPT_FOR_NEXT_TASK,
    userApprovalNotice:
      '실제 Naver 상품 조회 API 1회 테스트를 진행하려면 사용자가 아래 문구로 별도 승인해야 합니다. 이번 Task에서는 안내만 하며 실제 승인으로 처리하지 않습니다.',

    packetItems,
    misunderstandingPreventionItems: [
      'Task 266은 승인 요청 패킷 표시 전용입니다. 실제 상품 조회 API를 호출하지 않습니다.',
      'isProductLookupApiCalled: false — 상품 조회 API가 호출되지 않았습니다.',
      'isUserApprovalPhraseReceivedForProductLookupApiTest: false — 아직 승인 문구를 수신하지 않았습니다.',
      'isTokenIssuanceExecutedInThisTask: false — 이번 Task에서 Token을 재발급하지 않습니다.',
      `productLookupApprovalRequestPacketStatus: ${packet.productLookupApprovalRequestPacketStatus}`,
      'isProductLookupApiApprovalGranted: false — 상품 조회 API 실행은 별도 승인 후에만 가능합니다.',
    ],
    finalNotice:
      '상품 조회 API 1회 테스트 사용자 승인 요청 패킷 준비가 완료되었습니다. 실제 상품 조회 API 호출은 사용자 별도 승인 문구(Task 267 기준) 수신 후에만 가능합니다. 다음 단계는 사용자 별도 지시가 필요합니다.',
  };
}
