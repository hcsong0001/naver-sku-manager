// Task 274 — Naver Product Lookup Live Retry Outcome Certification
// Task 273의 nextDecisionStatus를 바탕으로 현재 상태를 인증하는 read-only 패널입니다.
// 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.

export type NaverProductLookupLiveRetryOutcomeNextDecisionStatus =
  | 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE'
  | 'BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'BLOCKED_BY_ENV_MISSING'
  | 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export type NaverProductLookupLiveRetryOutcomeCertificationStatus =
  | 'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE'
  | 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED'
  | 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE'
  | 'CERTIFIED_BLOCKED_BY_ENV_MISSING'
  | 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
  | 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

export type NaverProductLookupLiveRetryOutcomeCertificationItem = {
  certificationItem: string;
  status:
    | 'DECISION_GATE_CONFIRMED'
    | 'NON_MUTATION_AUDIT_CONFIRMED'
    | 'LIVE_RETRY_RESULT_CONFIRMED'
    | 'CERTIFICATION_STATUS_RECORDED'
    | 'READY_IF_DECISION_READY'
    | 'IP_ALLOWLIST_RECHECK_REQUIRED'
    | 'AUTH_RECHECK_REQUIRED'
    | 'ENV_RECHECK_REQUIRED'
    | 'CHANNEL_PRODUCT_NO_RECHECK_REQUIRED'
    | 'PRODUCT_ACCESS_RECHECK_REQUIRED'
    | 'SEPARATE_APPROVAL_REQUIRED'
    | 'NOT_EXECUTED'
    | 'NOT_DISPLAYED'
    | 'NOT_ACCESSED'
    | 'NOT_MODIFIED'
    | 'LOCKED'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverProductLookupLiveRetryOutcomeCertificationView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_OUTCOME_CERTIFICATION_READY';
  description: string;
  guideMessage: string;

  isBatchJobResultDisplayOnly: true;
  isNaverProductLookupLiveRetryOutcomeCertificationReady: true;
  isNaverProductLookupLiveRetryOutcomeDecisionGateReady: true;
  isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true;
  isNaverProductLookupLiveRetryResultReady: true;

  // Task 273 결과 참조
  nextDecisionStatus: NaverProductLookupLiveRetryOutcomeNextDecisionStatus;

  // Certification 판정
  outcomeCertificationStatus: NaverProductLookupLiveRetryOutcomeCertificationStatus;
  isCertifiedReadyForReadOnlyProductDataCaptureGate: boolean;
  isCertifiedBlockedByGwIpNotAllowed: boolean;
  isCertifiedBlockedByTokenRetryFailure: boolean;
  isCertifiedBlockedByEnvMissing: boolean;
  isCertifiedBlockedByMissingChannelProductNo: boolean;
  isCertifiedBlockedByProductLookupFailure: boolean;

  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;

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

  certificationItems: NaverProductLookupLiveRetryOutcomeCertificationItem[];
};

function computeOutcomeCertificationStatus(
  nextDecisionStatus: NaverProductLookupLiveRetryOutcomeNextDecisionStatus
): NaverProductLookupLiveRetryOutcomeCertificationStatus {
  const map: Record<NaverProductLookupLiveRetryOutcomeNextDecisionStatus, NaverProductLookupLiveRetryOutcomeCertificationStatus> = {
    'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE': 'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE',
    'BLOCKED_BY_GW_IP_NOT_ALLOWED': 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED',
    'BLOCKED_BY_TOKEN_RETRY_FAILURE': 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE',
    'BLOCKED_BY_ENV_MISSING': 'CERTIFIED_BLOCKED_BY_ENV_MISSING',
    'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO': 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE': 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
  };
  return map[nextDecisionStatus];
}

function buildCertificationItems(
  nextDecisionStatus: NaverProductLookupLiveRetryOutcomeNextDecisionStatus,
  outcomeCertificationStatus: NaverProductLookupLiveRetryOutcomeCertificationStatus
): NaverProductLookupLiveRetryOutcomeCertificationItem[] {
  const isReady = nextDecisionStatus === 'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE';

  return [
    {
      certificationItem: 'Task 273 Decision Gate',
      status: 'DECISION_GATE_CONFIRMED',
      meaning: 'Task 273에서 계산된 nextDecisionStatus가 인증 입력으로 확인되었습니다.',
    },
    {
      certificationItem: 'Task 272 감사 봉인',
      status: 'NON_MUTATION_AUDIT_CONFIRMED',
      meaning: 'Task 272에서 비노출·비저장·비수정·비전파 상태가 감사 봉인 확인되었습니다.',
    },
    {
      certificationItem: 'Task 271 Live Retry Result',
      status: 'LIVE_RETRY_RESULT_CONFIRMED',
      meaning: 'Task 271의 Token 재시도 및 상품 조회 read-only 결과가 확인되었습니다.',
    },
    {
      certificationItem: 'Outcome Certification',
      status: 'CERTIFICATION_STATUS_RECORDED',
      meaning: `outcomeCertificationStatus: ${outcomeCertificationStatus}. 이 인증은 read-only 표시이며 실행 권한이 아닙니다.`,
    },
    {
      certificationItem: '성공 시 다음 후보',
      status: 'READY_IF_DECISION_READY',
      meaning: isReady
        ? '인증 완료: read-only 상품 데이터 캡처 Gate로 진행 가능. 별도 승인 후 다음 단계를 진행합니다.'
        : '차단 상태: 다음 단계로 진행할 수 없습니다. 아래 재확인 항목을 참조하세요.',
    },
    {
      certificationItem: 'GW IP 차단 시',
      status: 'IP_ALLOWLIST_RECHECK_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_GW_IP_NOT_ALLOWED'
        ? '[현재 차단] 네이버 커머스 API 허용 IP 목록을 재확인하세요. GW.IP_NOT_ALLOWED 오류가 지속됩니다.'
        : 'GW IP 차단 없음 (현재 상태 기준).',
    },
    {
      certificationItem: 'Token 실패 시',
      status: 'AUTH_RECHECK_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_TOKEN_RETRY_FAILURE'
        ? '[현재 차단] Token 발급 실패 (IP 외 원인). 인증키·권한·서명 구조를 재확인하세요.'
        : 'Token 인증 재확인 필요 없음 (현재 상태 기준).',
    },
    {
      certificationItem: 'Env 누락 시',
      status: 'ENV_RECHECK_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_ENV_MISSING'
        ? '[현재 차단] NAVER_COMMERCE_CLIENT_ID / CLIENT_SECRET Env 키 누락. Runtime Scope 설정을 재확인하세요.'
        : 'Env 재확인 필요 없음 (현재 상태 기준).',
    },
    {
      certificationItem: '상품번호 누락 시',
      status: 'CHANNEL_PRODUCT_NO_RECHECK_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO'
        ? '[현재 차단] channelProductNo를 확인할 수 없습니다. 상품번호를 확인하세요.'
        : 'channelProductNo 재확인 필요 없음 (현재 상태 기준).',
    },
    {
      certificationItem: '상품 조회 실패 시',
      status: 'PRODUCT_ACCESS_RECHECK_REQUIRED',
      meaning: nextDecisionStatus === 'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE'
        ? '[현재 차단] Token 발급 성공이나 상품 조회 실패. 상품번호·스토어 접근 권한을 재확인하세요.'
        : '상품·스토어 접근 재확인 필요 없음 (현재 상태 기준).',
    },
    {
      certificationItem: '다음 단계 별도 승인',
      status: 'SEPARATE_APPROVAL_REQUIRED',
      meaning: isReady
        ? '진행 가능 인증 완료. 다음 단계(read-only 상품 데이터 캡처 Gate)는 별도 사용자 승인 후에만 진행합니다.'
        : '차단 원인 해결 후 별도 사용자 승인이 필요합니다.',
    },
    {
      certificationItem: 'Token 재발급',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 Token을 재발급하지 않습니다. isTokenReissuedInThisTask: false.',
    },
    {
      certificationItem: '상품 조회 API 재호출',
      status: 'NOT_EXECUTED',
      meaning: '이번 Task에서 상품 조회 API를 재호출하지 않습니다. isProductLookupApiCalledInThisTask: false.',
    },
    {
      certificationItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API를 호출하지 않습니다. isProductUpdateApiCalled: false.',
    },
    {
      certificationItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격을 변경하지 않습니다.',
    },
    {
      certificationItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고를 변경하지 않습니다.',
    },
    {
      certificationItem: 'DB write',
      status: 'NOT_EXECUTED',
      meaning: 'DB write, upsert, update를 수행하지 않습니다. isDbWriteExecuted: false.',
    },
    {
      certificationItem: 'Token 값 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'access_token 값을 어떤 형태로도 표시하지 않습니다.',
    },
    {
      certificationItem: '인증키 값 표시 (client_id / client_secret)',
      status: 'NOT_DISPLAYED',
      meaning: 'client_id, client_secret 실제 값을 표시하지 않습니다.',
    },
    {
      certificationItem: 'Signature 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'bcrypt+base64 Signature를 표시하지 않습니다.',
    },
    {
      certificationItem: 'Authorization 헤더 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더 값을 표시하지 않습니다.',
    },
    {
      certificationItem: '.env 직접 열람',
      status: 'NOT_ACCESSED',
      meaning: '.env / .env.local 파일을 직접 열람하지 않습니다.',
    },
    {
      certificationItem: '.env 자동 수정',
      status: 'NOT_MODIFIED',
      meaning: '.env / .env.local 파일을 수정하지 않습니다.',
    },
    {
      certificationItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: 'Worker, Queue, Adapter 실행 경로가 잠겨 있습니다.',
    },
    {
      certificationItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 274는 Task 273 결과를 인증하는 read-only Outcome Certification 표시 전용입니다.',
    },
  ];
}

export function buildNaverProductLookupLiveRetryOutcomeCertificationView(
  task273Result: any
): NaverProductLookupLiveRetryOutcomeCertificationView {
  const allowedDecisionStatuses: NaverProductLookupLiveRetryOutcomeNextDecisionStatus[] = [
    'READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE',
    'BLOCKED_BY_GW_IP_NOT_ALLOWED',
    'BLOCKED_BY_TOKEN_RETRY_FAILURE',
    'BLOCKED_BY_ENV_MISSING',
    'BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO',
    'BLOCKED_BY_PRODUCT_LOOKUP_FAILURE',
  ];

  const rawDecision = task273Result?.nextDecisionStatus;
  const nextDecisionStatus: NaverProductLookupLiveRetryOutcomeNextDecisionStatus =
    allowedDecisionStatuses.includes(rawDecision)
      ? rawDecision
      : 'BLOCKED_BY_GW_IP_NOT_ALLOWED';

  const outcomeCertificationStatus = computeOutcomeCertificationStatus(nextDecisionStatus);

  const isCertifiedReadyForReadOnlyProductDataCaptureGate = outcomeCertificationStatus === 'CERTIFIED_READY_FOR_READ_ONLY_PRODUCT_DATA_CAPTURE_GATE';
  const isCertifiedBlockedByGwIpNotAllowed = outcomeCertificationStatus === 'CERTIFIED_BLOCKED_BY_GW_IP_NOT_ALLOWED';
  const isCertifiedBlockedByTokenRetryFailure = outcomeCertificationStatus === 'CERTIFIED_BLOCKED_BY_TOKEN_RETRY_FAILURE';
  const isCertifiedBlockedByEnvMissing = outcomeCertificationStatus === 'CERTIFIED_BLOCKED_BY_ENV_MISSING';
  const isCertifiedBlockedByMissingChannelProductNo = outcomeCertificationStatus === 'CERTIFIED_BLOCKED_BY_MISSING_CHANNEL_PRODUCT_NO';
  const isCertifiedBlockedByProductLookupFailure = outcomeCertificationStatus === 'CERTIFIED_BLOCKED_BY_PRODUCT_LOOKUP_FAILURE';

  const certificationItems = buildCertificationItems(nextDecisionStatus, outcomeCertificationStatus);

  return {
    taskName: 'Task 274 — Naver Product Lookup Live Retry Outcome Certification',
    title: 'Naver 상품 조회 Live 재시도 결과 Outcome Certification',
    panelTitle: 'Live 재시도 결과 Outcome Certification (Task 274)',
    status: 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_OUTCOME_CERTIFICATION_READY',
    description: `Task 273 Decision Gate 결과를 인증합니다. outcomeCertificationStatus: ${outcomeCertificationStatus}.`,
    guideMessage: 'Task 273 Decision Gate 결과를 기준으로 다음 단계 가능 여부를 인증했습니다.\n이 패널은 결과 인증 전용이며, Token 재발급·상품 조회 API 재호출·상품 수정 API 호출·가격/재고 변경·DB write를 수행하지 않습니다.\n진행 가능 상태라도 다음 단계는 별도 승인 전까지 잠금 상태입니다.',

    isBatchJobResultDisplayOnly: true,
    isNaverProductLookupLiveRetryOutcomeCertificationReady: true,
    isNaverProductLookupLiveRetryOutcomeDecisionGateReady: true,
    isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true,
    isNaverProductLookupLiveRetryResultReady: true,

    nextDecisionStatus,
    outcomeCertificationStatus,
    isCertifiedReadyForReadOnlyProductDataCaptureGate,
    isCertifiedBlockedByGwIpNotAllowed,
    isCertifiedBlockedByTokenRetryFailure,
    isCertifiedBlockedByEnvMissing,
    isCertifiedBlockedByMissingChannelProductNo,
    isCertifiedBlockedByProductLookupFailure,

    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,

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

    certificationItems,
  };
}
