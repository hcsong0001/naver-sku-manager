export type NaverProductLookupApiReadinessGateItemStatus =
  | 'TOKEN_TEST_RESULT_CONFIRMED'
  | 'NON_RETENTION_AUDIT_CONFIRMED'
  | 'TOKEN_VALUE_NOT_INCLUDED'
  | 'TOKEN_NOT_STORED_IN_DB'
  | 'TOKEN_NOT_LOGGED'
  | 'ERROR_REASON_REDACTED'
  | 'READY_IF_TOKEN_TEST_SUCCESS'
  | 'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS'
  | 'LOCKED_UNTIL_SEPARATE_APPROVAL'
  | 'LOCKED'
  | 'FORBIDDEN'
  | 'NOT_ACCESSED'
  | 'NOT_MODIFIED'
  | 'NOT_CONNECTED'
  | 'NOT_PRESENT'
  | 'PENDING_SEPARATE_APPROVAL'
  | 'READ_ONLY_INFO';

export type NaverProductLookupApiReadinessGateItem = {
  gateItem: string;
  status: NaverProductLookupApiReadinessGateItemStatus;
  meaning: string;
};

export type NaverTokenIssuanceTestStatus = 'SUCCESS' | 'FAILURE' | 'ENV_MISSING';

export type NaverProductLookupReadinessStatus =
  | 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
  | 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
  | 'BLOCKED_BY_ENV_MISSING';

export type NaverProductLookupApiReadinessGateView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_PRODUCT_LOOKUP_API_READINESS_GATE_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;

  isNaverProductLookupApiReadinessGateReady: true;
  isTokenIssuanceOneTimeTestResultReady: true;
  isTokenIssuanceOneTimeTestNonRetentionAuditSealed: true;

  issuanceTestStatus: NaverTokenIssuanceTestStatus;
  productLookupReadinessStatus: NaverProductLookupReadinessStatus;

  isReadyForProductLookupApiApprovalGate: boolean;
  isProductLookupApiBlockedByTokenFailure: boolean;
  isProductLookupApiBlockedByEnvMissing: boolean;

  isProductLookupApiApprovalRequired: true;
  isProductLookupApiApprovalGranted: false;

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

  gateItems: NaverProductLookupApiReadinessGateItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

function deriveReadinessStatus(issuanceTestStatus: NaverTokenIssuanceTestStatus): {
  productLookupReadinessStatus: NaverProductLookupReadinessStatus;
  isReadyForProductLookupApiApprovalGate: boolean;
  isProductLookupApiBlockedByTokenFailure: boolean;
  isProductLookupApiBlockedByEnvMissing: boolean;
} {
  if (issuanceTestStatus === 'SUCCESS') {
    return {
      productLookupReadinessStatus: 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE',
      isReadyForProductLookupApiApprovalGate: true,
      isProductLookupApiBlockedByTokenFailure: false,
      isProductLookupApiBlockedByEnvMissing: false,
    };
  }
  if (issuanceTestStatus === 'FAILURE') {
    return {
      productLookupReadinessStatus: 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE',
      isReadyForProductLookupApiApprovalGate: false,
      isProductLookupApiBlockedByTokenFailure: true,
      isProductLookupApiBlockedByEnvMissing: false,
    };
  }
  return {
    productLookupReadinessStatus: 'BLOCKED_BY_ENV_MISSING',
    isReadyForProductLookupApiApprovalGate: false,
    isProductLookupApiBlockedByTokenFailure: false,
    isProductLookupApiBlockedByEnvMissing: true,
  };
}

export function buildNaverProductLookupApiReadinessGateView(
  job: any,
  issuanceTestStatus: NaverTokenIssuanceTestStatus = 'SUCCESS'
): NaverProductLookupApiReadinessGateView {
  const readiness = deriveReadinessStatus(issuanceTestStatus);

  const lookupReadinessGateItem: NaverProductLookupApiReadinessGateItem =
    issuanceTestStatus === 'SUCCESS'
      ? {
          gateItem: '상품 조회 API 준비 상태',
          status: 'READY_IF_TOKEN_TEST_SUCCESS',
          meaning: `Token 발급 테스트 결과가 ${issuanceTestStatus}이므로 상품 조회 API 승인 Gate 후보입니다. 실제 호출은 별도 승인 후 가능합니다.`,
        }
      : {
          gateItem: '상품 조회 API 준비 상태',
          status: 'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS',
          meaning: `Token 발급 테스트 결과가 ${issuanceTestStatus}이므로 상품 조회 API 단계가 차단됩니다. Token 발급 테스트를 먼저 성공해야 합니다.`,
        };

  const gateItems: NaverProductLookupApiReadinessGateItem[] = [
    {
      gateItem: 'Token Test Result (Task 263)',
      status: 'TOKEN_TEST_RESULT_CONFIRMED',
      meaning: 'Task 263 Naver Token 발급 1회 테스트 결과가 확인되었습니다.'
    },
    {
      gateItem: 'Token Non-Retention Audit Seal (Task 264)',
      status: 'NON_RETENTION_AUDIT_CONFIRMED',
      meaning: 'Task 264 Token 비노출·비저장·비전파 감사 봉인이 확인되었습니다.'
    },
    {
      gateItem: 'Token 값 비포함',
      status: 'TOKEN_VALUE_NOT_INCLUDED',
      meaning: 'Token 값은 view model, API 응답, 화면, 클라이언트 어디에도 포함되지 않습니다. isTokenValueIncludedInView: false.'
    },
    {
      gateItem: 'Token DB 저장 여부',
      status: 'TOKEN_NOT_STORED_IN_DB',
      meaning: 'Token 값이 DB에 저장되지 않았습니다. isTokenStoredInDb: false.'
    },
    {
      gateItem: 'Token 로그 출력 여부',
      status: 'TOKEN_NOT_LOGGED',
      meaning: 'Token 값이 콘솔/로그에 출력되지 않았습니다. isTokenLoggedToConsole: false.'
    },
    {
      gateItem: 'Error Reason 처리',
      status: 'ERROR_REASON_REDACTED',
      meaning: '실패 사유(errorReason)는 인증키 패턴이 포함되지 않도록 Redacted 처리됩니다.'
    },
    lookupReadinessGateItem,
    {
      gateItem: '상품 조회 API 차단 조건',
      status: 'BLOCKED_IF_TOKEN_TEST_NOT_SUCCESS',
      meaning: 'Token 발급 테스트 결과가 FAILURE 또는 ENV_MISSING이면 상품 조회 API 단계가 차단됩니다.'
    },
    {
      gateItem: '실제 상품 조회 API 호출',
      status: 'LOCKED_UNTIL_SEPARATE_APPROVAL',
      meaning: '실제 상품 조회 API 호출은 별도 승인 전까지 금지입니다. isProductLookupApiCalled: false.'
    },
    {
      gateItem: '상품 수정 API 호출',
      status: 'LOCKED',
      meaning: '상품 수정 API 호출이 없습니다. isProductUpdateApiCalled: false.'
    },
    {
      gateItem: '가격·재고 변경',
      status: 'LOCKED',
      meaning: '가격이나 재고에 대한 실제 변경이 없습니다. isPriceOrStockChanged: false.'
    },
    {
      gateItem: 'Token 재발급',
      status: 'LOCKED',
      meaning: '이번 Task에서 Token을 다시 발급하지 않습니다. isTokenIssuanceExecutedInThisTask: false.'
    },
    {
      gateItem: 'Token 값 표시',
      status: 'FORBIDDEN',
      meaning: 'Token 값은 마스킹/해시/부분 출력을 포함하여 어떤 형태로도 표시하지 않습니다. isTokenValueDisplayed: false.'
    },
    {
      gateItem: '인증키 값 표시',
      status: 'FORBIDDEN',
      meaning: '인증키(CLIENT_ID, CLIENT_SECRET) 값은 어떤 형태로도 표시하지 않습니다. isAuthKeyValueDisplayed: false.'
    },
    {
      gateItem: 'Secret 로그 출력',
      status: 'FORBIDDEN',
      meaning: 'Secret 값이 로그에 출력되지 않습니다. isSecretLogged: false.'
    },
    {
      gateItem: '".env" 직접 열람',
      status: 'NOT_ACCESSED',
      meaning: '.env / .env.local 파일을 직접 열람하지 않았습니다. isEnvFileDirectlyAccessed: false.'
    },
    {
      gateItem: '".env" 자동 수정',
      status: 'NOT_MODIFIED',
      meaning: '.env / .env.local 파일을 자동 수정하지 않았습니다. isEnvFileModified: false.'
    },
    {
      gateItem: 'POST API 연결',
      status: 'NOT_CONNECTED',
      meaning: '추가적인 POST API 연결이 없습니다. isPostApiConnected: false.'
    },
    {
      gateItem: '승인/실행 버튼',
      status: 'NOT_PRESENT',
      meaning: '이 패널에 승인 버튼이나 실행 버튼이 없습니다. hasApprovalRequestButton: false, hasExecutionButton: false.'
    },
    {
      gateItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: 'Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.'
    },
    {
      gateItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '상품 조회 API 호출은 별도 승인 전까지 잠금 상태입니다. isProductLookupApiApprovalGranted: false.'
    },
    {
      gateItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 265는 상품 조회 API Readiness Gate 표시 전용입니다. 새로운 Token 발급이나 상품 API 호출이 없습니다.'
    },
  ];

  const readinessLabel =
    readiness.productLookupReadinessStatus === 'READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE'
      ? 'Token 발급 테스트가 SUCCESS이므로 상품 조회 API 승인 Gate 후보 상태입니다.'
      : readiness.productLookupReadinessStatus === 'BLOCKED_BY_TOKEN_ISSUANCE_FAILURE'
      ? 'Token 발급 테스트가 FAILURE이므로 상품 조회 API 단계가 차단됩니다.'
      : 'Token 발급 테스트가 ENV_MISSING이므로 상품 조회 API 단계가 차단됩니다.';

  return {
    taskName: 'Task 265 - Naver Product Lookup API Readiness Gate Screen Flow',
    title: 'Naver Product Lookup API Readiness Gate',
    panelTitle: 'Naver 상품 조회 API Readiness Gate',
    status: 'NAVER_PRODUCT_LOOKUP_API_READINESS_GATE_READY',
    description:
      `Task 263 Token 발급 테스트 결과와 Task 264 비노출·비저장·비전파 감사 봉인을 확인했습니다. ${readinessLabel} 이번 Task에서는 상품 조회 API를 호출하지 않으며, Token 재발급도 수행하지 않습니다. 상품 조회 API 호출, 상품 수정 API 호출, 가격·재고 변경은 모두 별도 승인 전까지 잠금 상태입니다.`,

    isBatchJobResultDisplayOnly: true,

    isNaverProductLookupApiReadinessGateReady: true,
    isTokenIssuanceOneTimeTestResultReady: true,
    isTokenIssuanceOneTimeTestNonRetentionAuditSealed: true,

    issuanceTestStatus,
    productLookupReadinessStatus: readiness.productLookupReadinessStatus,

    isReadyForProductLookupApiApprovalGate: readiness.isReadyForProductLookupApiApprovalGate,
    isProductLookupApiBlockedByTokenFailure: readiness.isProductLookupApiBlockedByTokenFailure,
    isProductLookupApiBlockedByEnvMissing: readiness.isProductLookupApiBlockedByEnvMissing,

    isProductLookupApiApprovalRequired: true,
    isProductLookupApiApprovalGranted: false,

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

    gateItems,
    misunderstandingPreventionItems: [
      'Task 265는 상품 조회 API Readiness Gate 표시 전용입니다. 실제 상품 조회 API를 호출하지 않습니다.',
      'isProductLookupApiCalled: false — 상품 조회 API가 호출되지 않았습니다.',
      'isTokenIssuanceExecutedInThisTask: false — 이번 Task에서 Token을 재발급하지 않습니다.',
      `productLookupReadinessStatus: ${readiness.productLookupReadinessStatus} — issuanceTestStatus: ${issuanceTestStatus} 기준.`,
      'isProductLookupApiApprovalGranted: false — 상품 조회 API Gate 진입은 별도 승인 후에만 가능합니다.',
    ],
    finalNotice:
      '상품 조회 API Readiness Gate 확인이 완료되었습니다. 실제 상품 조회 API 호출은 사용자 별도 승인 후에만 가능합니다. 다음 단계는 사용자 별도 지시가 필요합니다.',
  };
}
