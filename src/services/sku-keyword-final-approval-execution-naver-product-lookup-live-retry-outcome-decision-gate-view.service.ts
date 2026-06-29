// Task 273 — Naver Product Lookup Live Retry Outcome Decision Gate
// Task 271/272 결과를 바탕으로 다음 단계 가능 여부를 판정하는 read-only Decision Gate입니다.
// 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.

export type NaverProductLookupLiveRetryOutcomeTokenRetryStatus =
  | 'SUCCESS'
  | 'FAILURE'
  | 'ENV_MISSING';

export type NaverProductLookupLiveRetryOutcomeProductLookupRetryStatus =
  | 'SUCCESS'
  | 'FAILURE'
  | 'SKIPPED_BY_TOKEN_FAILURE'
  | 'SKIPPED_BY_ENV_MISSING'
  | 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO';

export type NaverProductLookupLiveRetryOutcomeNextDecisionStatus =
  | 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE'
  | 'BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'BLOCKED_BY_ENV_MISSING'
  | 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export type NaverProductLookupLiveRetryOutcomeDecisionItem = {
  decisionItem: string;
  status:
    | 'LIVE_RETRY_RESULT_CONFIRMED'
    | 'NON_MUTATION_AUDIT_CONFIRMED'
    | 'TOKEN_RETRY_STATUS_RECORDED'
    | 'GW_IP_RESOLUTION_STATUS_RECORDED'
    | 'PRODUCT_LOOKUP_RETRY_STATUS_RECORDED'
    | 'DECISION_STATUS_RECORDED'
    | 'READY_IF_LOOKUP_SUCCESS'
    | 'RECHECK_IP_ALLOWLIST_REQUIRED'
    | 'RECHECK_AUTH_REQUIRED'
    | 'RECHECK_ENV_REQUIRED'
    | 'RECHECK_CHANNEL_PRODUCT_NO_REQUIRED'
    | 'RECHECK_PRODUCT_ACCESS_REQUIRED'
    | 'NOT_DISPLAYED'
    | 'NOT_STORED'
    | 'NOT_EXECUTED'
    | 'LOCKED'
    | 'PENDING_SEPARATE_APPROVAL'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverProductLookupLiveRetryOutcomeDecisionGateView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_OUTCOME_DECISION_GATE_READY';
  description: string;
  guideMessage: string;

  isBatchJobResultDisplayOnly: true;
  isNaverProductLookupLiveRetryOutcomeDecisionGateReady: true;
  isNaverProductLookupLiveRetryResultReady: true;
  isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true;

  // Task 271/272 결과 참조
  tokenRetryStatus: NaverProductLookupLiveRetryOutcomeTokenRetryStatus;
  productLookupRetryStatus: NaverProductLookupLiveRetryOutcomeProductLookupRetryStatus;
  isGwIpNotAllowedResolved: boolean;

  // Decision 판정
  nextDecisionStatus: NaverProductLookupLiveRetryOutcomeNextDecisionStatus;
  isReadyForReadOnlyProductDataCaptureGate: boolean;
  isBlockedByGwIpNotAllowed: boolean;
  isBlockedByTokenRetryFailure: boolean;
  isBlockedByEnvMissing: boolean;
  isBlockedByMissingChannelProductNo: boolean;
  isBlockedByProductLookupFailure: boolean;

  // 이번 Task 미실행
  isTokenReissuedInThisTask: false;
  isTokenIssuanceExecutedInThisTask: false;
  isProductLookupApiCalledInThisTask: false;
  isNaverApiCalledInThisTask: false;

  // 비노출
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

  // 비수정/비실행
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;
  isReadOnlyProductLookupOnly: true;
  isDbWriteExecuted: false;
  isDbUpsertExecuted: false;
  isDbUpdateExecuted: false;

  // 실행 잠금
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

  decisionItems: NaverProductLookupLiveRetryOutcomeDecisionItem[];
};

function computeNextDecisionStatus(
  tokenRetryStatus: NaverProductLookupLiveRetryOutcomeTokenRetryStatus,
  productLookupRetryStatus: NaverProductLookupLiveRetryOutcomeProductLookupRetryStatus,
  isGwIpNotAllowedResolved: boolean
): NaverProductLookupLiveRetryOutcomeNextDecisionStatus {
  if (tokenRetryStatus === 'ENV_MISSING') {
    return 'BLOCKED_BY_ENV_MISSING';
  }
  if (productLookupRetryStatus === 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO') {
    return 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  }
  if (tokenRetryStatus === 'FAILURE' && !isGwIpNotAllowedResolved) {
    return 'BLOCKED_BY_GW_IP_NOT_ALLOWED';
  }
  if (tokenRetryStatus === 'FAILURE' && isGwIpNotAllowedResolved) {
    return 'BLOCKED_BY_TOKEN_RETRY_FAILURE';
  }
  if (tokenRetryStatus === 'SUCCESS' && productLookupRetryStatus === 'SUCCESS') {
    return 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE';
  }
  if (tokenRetryStatus === 'SUCCESS' && productLookupRetryStatus === 'FAILURE') {
    return 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';
  }
  // 나머지 SKIPPED 케이스는 token failure로 처리
  return 'BLOCKED_BY_TOKEN_RETRY_FAILURE';
}

function buildDecisionItems(
  tokenRetryStatus: NaverProductLookupLiveRetryOutcomeTokenRetryStatus,
  productLookupRetryStatus: NaverProductLookupLiveRetryOutcomeProductLookupRetryStatus,
  isGwIpNotAllowedResolved: boolean,
  nextDecisionStatus: NaverProductLookupLiveRetryOutcomeNextDecisionStatus
): NaverProductLookupLiveRetryOutcomeDecisionItem[] {
  const isReady = nextDecisionStatus === 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE';

  return [
    {
      decisionItem: 'Task 271 결과',
      status: 'LIVE_RETRY_RESULT_CONFIRMED',
      meaning: 'Task 271에서 Token 발급 재시도 및 상품 조회 read-only 결과가 기록되었습니다.',
    },
    {
      decisionItem: 'Task 272 감사 봉인',
      status: 'NON_MUTATION_AUDIT_CONFIRMED',
      meaning: 'Task 272에서 비노출·비저장·비수정·비전파 상태가 감사 봉인 확인되었습니다.',
    },
    {
      decisionItem: 'Token 재시도 결과',
      status: 'TOKEN_RETRY_STATUS_RECORDED',
      meaning: `Task 271 Token 발급 재시도 결과: ${tokenRetryStatus}.`,
    },
    {
      decisionItem: 'GW IP 제한 해소 여부',
      status: 'GW_IP_RESOLUTION_STATUS_RECORDED',
      meaning: isGwIpNotAllowedResolved
        ? 'GW.IP_NOT_ALLOWED 해소됨. Token 발급 성공으로 IP 제한이 해소된 것으로 기록됩니다.'
        : 'GW.IP_NOT_ALLOWED 해소 미확인. IP 허용 목록 재확인이 필요할 수 있습니다.',
    },
    {
      decisionItem: '상품 조회 결과',
      status: 'PRODUCT_LOOKUP_RETRY_STATUS_RECORDED',
      meaning: `Task 271 상품 조회 결과: ${productLookupRetryStatus}.`,
    },
    {
      decisionItem: '다음 단계 판정',
      status: 'DECISION_STATUS_RECORDED',
      meaning: `nextDecisionStatus: ${nextDecisionStatus}. 이 판정은 read-only 표시이며 실행 권한이 아닙니다.`,
    },
    {
      decisionItem: '성공 시 다음 후보',
      status: 'READY_IF_LOOKUP_SUCCESS',
      meaning: isReady
        ? 'Token 발급 및 상품 조회 성공. 별도 승인 후 read-only 상품 데이터 캡처 Gate로 진행 가능합니다.'
        : 'Token 발급 또는 상품 조회가 성공하지 않아 다음 단계로 진행할 수 없습니다.',
    },
    {
      decisionItem: 'GW IP 실패 시',
      status: 'RECHECK_IP_ALLOWLIST_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_GW_IP_NOT_ALLOWED'
        ? 'GW.IP_NOT_ALLOWED 차단 지속. 네이버 커머스 API 허용 IP 목록을 재확인하세요.'
        : 'GW IP 제한 없음 (현재 차단 상태가 아닙니다).',
    },
    {
      decisionItem: 'Token 실패 시',
      status: 'RECHECK_AUTH_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_TOKEN_RETRY_FAILURE'
        ? 'Token 발급 실패 (IP 외 원인). 인증키 / 권한 / 서명 구조를 재확인하세요.'
        : 'Token 발급 실패 외 인증 재확인 필요 없음 (현재 상태).',
    },
    {
      decisionItem: 'Env 누락 시',
      status: 'RECHECK_ENV_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_ENV_MISSING'
        ? 'NAVER_COMMERCE_CLIENT_ID / CLIENT_SECRET Env 키가 없습니다. Runtime Scope 설정을 재확인하세요.'
        : 'Env 키 재확인 필요 없음 (현재 상태).',
    },
    {
      decisionItem: '상품번호 누락 시',
      status: 'RECHECK_CHANNEL_PRODUCT_NO_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
        ? 'channelProductNo를 확인할 수 없어 상품 조회를 건너뛰었습니다. 상품번호를 확인하세요.'
        : 'channelProductNo 재확인 필요 없음 (현재 상태).',
    },
    {
      decisionItem: '상품 조회 실패 시',
      status: 'RECHECK_PRODUCT_ACCESS_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'
        ? 'Token 발급 성공이나 상품 조회 실패. 상품번호 / 스토어 접근 권한을 재확인하세요.'
        : '상품/스토어 접근권한 재확인 필요 없음 (현재 상태).',
    },
    {
      decisionItem: 'Token 값 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'access_token 값을 어떤 형태로도 표시하지 않습니다.',
    },
    {
      decisionItem: 'Token 저장',
      status: 'NOT_STORED',
      meaning: 'Token을 DB, 파일, 메모리에 저장하지 않습니다.',
    },
    {
      decisionItem: '인증키 값 표시 (client_id / client_secret)',
      status: 'NOT_DISPLAYED',
      meaning: 'client_id, client_secret 실제 값을 표시하지 않습니다.',
    },
    {
      decisionItem: 'Signature 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'bcrypt+base64 Signature를 표시하지 않습니다.',
    },
    {
      decisionItem: 'Authorization 헤더 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더 값을 표시하지 않습니다.',
    },
    {
      decisionItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API를 재호출하지 않습니다. isProductLookupApiCalledInThisTask: false.',
    },
    {
      decisionItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API를 호출하지 않습니다. isProductUpdateApiCalled: false.',
    },
    {
      decisionItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격을 변경하지 않습니다.',
    },
    {
      decisionItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고를 변경하지 않습니다.',
    },
    {
      decisionItem: 'DB write',
      status: 'NOT_EXECUTED',
      meaning: 'DB write, upsert, update를 수행하지 않습니다.',
    },
    {
      decisionItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: 'Worker, Queue, Adapter 실행 경로가 잠겨 있습니다.',
    },
    {
      decisionItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: isReady
        ? '다음 단계(read-only 상품 데이터 캡처 Gate)는 별도 사용자 승인 후에만 진행합니다.'
        : '실패 원인 해결 후 별도 사용자 승인이 필요합니다.',
    },
    {
      decisionItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 273은 다음 단계 가능 여부를 판정하는 read-only Decision Gate 표시 전용입니다.',
    },
  ];
}

export function buildNaverProductLookupLiveRetryOutcomeDecisionGateView(
  task271Result: any,
  task272Result: any
): NaverProductLookupLiveRetryOutcomeDecisionGateView {
  // Task 271/272 결과에서 상태 파생
  const tokenRetryStatus: NaverProductLookupLiveRetryOutcomeTokenRetryStatus =
    task271Result?.issuanceRetryStatus === 'SUCCESS' ? 'SUCCESS'
    : task271Result?.issuanceRetryStatus === 'ENV_MISSING' ? 'ENV_MISSING'
    : 'FAILURE';

  const rawLookup = task271Result?.productLookupStatus ?? task272Result?.productLookupRetryStatus;
  let productLookupRetryStatus: NaverProductLookupLiveRetryOutcomeProductLookupRetryStatus;
  if (rawLookup === 'SUCCESS') productLookupRetryStatus = 'SUCCESS';
  else if (rawLookup === 'FAILURE') productLookupRetryStatus = 'FAILURE';
  else if (rawLookup === 'NO_CHANNEL_PRODUCT_NO' || rawLookup === 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO') productLookupRetryStatus = 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO';
  else if (tokenRetryStatus === 'ENV_MISSING') productLookupRetryStatus = 'SKIPPED_BY_ENV_MISSING';
  else productLookupRetryStatus = 'SKIPPED_BY_TOKEN_FAILURE';

  const isGwIpNotAllowedResolved: boolean = task271Result?.isGwIpNotAllowedResolved === true;

  const nextDecisionStatus = computeNextDecisionStatus(tokenRetryStatus, productLookupRetryStatus, isGwIpNotAllowedResolved);

  const isReadyForReadOnlyProductDataCaptureGate = nextDecisionStatus === 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE';
  const isBlockedByGwIpNotAllowed = nextDecisionStatus === 'BLOCKED_BY_GW_IP_NOT_ALLOWED';
  const isBlockedByTokenRetryFailure = nextDecisionStatus === 'BLOCKED_BY_TOKEN_RETRY_FAILURE';
  const isBlockedByEnvMissing = nextDecisionStatus === 'BLOCKED_BY_ENV_MISSING';
  const isBlockedByMissingChannelProductNo = nextDecisionStatus === 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  const isBlockedByProductLookupFailure = nextDecisionStatus === 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

  const decisionItems = buildDecisionItems(tokenRetryStatus, productLookupRetryStatus, isGwIpNotAllowedResolved, nextDecisionStatus);

  return {
    taskName: 'Task 273 — Naver Product Lookup Live Retry Outcome Decision Gate',
    title: 'Naver 상품 조회 Live 재시도 결과 Decision Gate',
    panelTitle: 'Live 재시도 결과 Decision Gate (Task 273)',
    status: 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_OUTCOME_DECISION_GATE_READY',
    description: `Task 271/272 결과를 바탕으로 다음 단계를 판정합니다. nextDecisionStatus: ${nextDecisionStatus}.`,
    guideMessage: 'Task 271의 Token 재시도 및 상품 조회 read-only 결과와 Task 272의 비수정 감사 봉인을 확인했습니다.\n이번 Task는 다음 단계 가능 여부를 판정하는 read-only Decision Gate입니다.\nToken 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write는 수행하지 않습니다.\n성공 상태이더라도 다음 단계는 별도 승인 전까지 진행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isNaverProductLookupLiveRetryOutcomeDecisionGateReady: true,
    isNaverProductLookupLiveRetryResultReady: true,
    isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true,

    tokenRetryStatus,
    productLookupRetryStatus,
    isGwIpNotAllowedResolved,

    nextDecisionStatus,
    isReadyForReadOnlyProductDataCaptureGate,
    isBlockedByGwIpNotAllowed,
    isBlockedByTokenRetryFailure,
    isBlockedByEnvMissing,
    isBlockedByMissingChannelProductNo,
    isBlockedByProductLookupFailure,

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

    decisionItems,
  };
}
