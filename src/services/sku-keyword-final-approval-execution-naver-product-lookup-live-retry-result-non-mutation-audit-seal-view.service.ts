// Task 272 — Naver Product Lookup Live Retry Result Non-Mutation Audit Seal
// Task 271 결과를 바탕으로 비노출·비저장·비수정·비전파 상태를 감사 봉인하는 read-only 단계입니다.
// 이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.

export type NaverProductLookupLiveRetryTokenRetryStatus =
  | 'SUCCESS'
  | 'FAILURE'
  | 'ENV_MISSING';

export type NaverProductLookupLiveRetryProductLookupRetryStatus =
  | 'SUCCESS'
  | 'FAILURE'
  | 'SKIPPED_BY_TOKEN_FAILURE'
  | 'SKIPPED_BY_ENV_MISSING'
  | 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO';

export type NaverProductLookupLiveRetryNonMutationAuditItem = {
  auditItem: string;
  status:
    | 'LIVE_RETRY_RESULT_CONFIRMED'
    | 'TOKEN_RETRY_STATUS_RECORDED'
    | 'GW_IP_RESOLUTION_STATUS_RECORDED'
    | 'PRODUCT_LOOKUP_RETRY_STATUS_RECORDED'
    | 'READ_ONLY_LOOKUP_ONLY'
    | 'NOT_DISPLAYED'
    | 'NOT_RETURNED_TO_CLIENT'
    | 'NOT_STORED_IN_DB'
    | 'NOT_STORED_IN_FILE'
    | 'NOT_LOGGED'
    | 'NOT_ACCESSED'
    | 'NOT_MODIFIED'
    | 'NOT_EXECUTED'
    | 'LOCKED'
    | 'STOPPED_WITHIN_APPROVAL_SCOPE'
    | 'PENDING_SEPARATE_APPROVAL'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverProductLookupLiveRetryResultNonMutationAuditSealView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_RESULT_NON_MUTATION_AUDIT_SEALED';
  description: string;
  guideMessage: string;

  // Task 272 감사 봉인 플래그
  isBatchJobResultDisplayOnly: true;
  isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true;
  isNaverProductLookupLiveRetryResultReady: true;

  // Task 271 결과 참조
  tokenRetryStatus: NaverProductLookupLiveRetryTokenRetryStatus;
  productLookupRetryStatus: NaverProductLookupLiveRetryProductLookupRetryStatus;
  isGwIpNotAllowedResolved: boolean;
  isGwIpResolutionStatusRecorded: true;
  isTokenRetryStatusRecorded: true;
  isProductLookupRetryStatusRecorded: true;

  // 이번 Task에서 미실행 플래그
  isTokenReissuedInThisTask: false;
  isTokenIssuanceExecutedInThisTask: false;
  isProductLookupApiCalledInThisTask: false;
  isNaverApiCalledInThisTask: false;

  // 비노출 플래그
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
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  // 비수정/비실행 플래그
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;
  isReadOnlyProductLookupOnly: true;
  isDbWriteExecuted: false;
  isDbUpsertExecuted: false;
  isDbUpdateExecuted: false;

  // 실행 잠금 플래그
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

  // 승인 범위 준수
  isAdditionalCallStoppedWithinApprovalScope: true;
  isNextStepSeparateApprovalRequired: true;
  isNextStepSeparateApprovalGranted: false;

  auditItems: NaverProductLookupLiveRetryNonMutationAuditItem[];
};

function deriveTokenRetryStatus(task271Result: any): NaverProductLookupLiveRetryTokenRetryStatus {
  const s = task271Result?.issuanceRetryStatus;
  if (s === 'SUCCESS') return 'SUCCESS';
  if (s === 'ENV_MISSING') return 'ENV_MISSING';
  return 'FAILURE';
}

function deriveProductLookupRetryStatus(task271Result: any): NaverProductLookupLiveRetryProductLookupRetryStatus {
  const s = task271Result?.productLookupStatus;
  if (s === 'SUCCESS') return 'SUCCESS';
  if (s === 'FAILURE') return 'FAILURE';
  if (s === 'NO_CHANNEL_PRODUCT_NO') return 'SKIPPED_BY_MISSING_CHANNEL_PRODUCT_NO';
  // SKIPPED means token failed or env missing
  const tokenStatus = task271Result?.issuanceRetryStatus;
  if (tokenStatus === 'ENV_MISSING') return 'SKIPPED_BY_ENV_MISSING';
  return 'SKIPPED_BY_TOKEN_FAILURE';
}

function buildAuditItems(
  tokenRetryStatus: NaverProductLookupLiveRetryTokenRetryStatus,
  productLookupRetryStatus: NaverProductLookupLiveRetryProductLookupRetryStatus,
  isGwIpNotAllowedResolved: boolean
): NaverProductLookupLiveRetryNonMutationAuditItem[] {
  return [
    {
      auditItem: 'Task 271 결과',
      status: 'LIVE_RETRY_RESULT_CONFIRMED',
      meaning: 'Task 271에서 Token 발급 재시도 및 read-only 상품 조회 결과가 확인 및 기록되었습니다.',
    },
    {
      auditItem: 'Token 재시도 결과',
      status: 'TOKEN_RETRY_STATUS_RECORDED',
      meaning: `Task 271 Token 발급 재시도 결과: ${tokenRetryStatus}. 이번 Task에서 Token 재발급을 하지 않습니다.`,
    },
    {
      auditItem: 'GW IP 제한 해소 여부',
      status: 'GW_IP_RESOLUTION_STATUS_RECORDED',
      meaning: isGwIpNotAllowedResolved
        ? 'GW.IP_NOT_ALLOWED 해소됨. Task 271에서 Token 발급에 성공하여 IP 제한이 해소된 것으로 기록되었습니다.'
        : `GW.IP_NOT_ALLOWED 해소 미확인. Token 재시도 결과: ${tokenRetryStatus}. IP 제한이 지속될 수 있습니다.`,
    },
    {
      auditItem: '상품 조회 재시도 결과',
      status: 'PRODUCT_LOOKUP_RETRY_STATUS_RECORDED',
      meaning: `Task 271 상품 조회 결과: ${productLookupRetryStatus}. 이번 Task에서 상품 조회 API를 재호출하지 않습니다.`,
    },
    {
      auditItem: '상품 조회 범위',
      status: 'READ_ONLY_LOOKUP_ONLY',
      meaning: 'Task 271의 상품 조회는 read-only GET 1회였습니다. 상품 수정, 가격 변경, 재고 변경은 없었습니다.',
    },
    {
      auditItem: 'Token 값 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'access_token 값을 어떤 형태로도 표시하지 않습니다. 마스킹, 해시, 일부 출력 모두 금지됩니다.',
    },
    {
      auditItem: 'Token 클라이언트 반환',
      status: 'NOT_RETURNED_TO_CLIENT',
      meaning: '발급된 Token 값을 클라이언트에 반환하지 않습니다. isTokenReturnedToClient: false.',
    },
    {
      auditItem: 'Token DB 저장',
      status: 'NOT_STORED_IN_DB',
      meaning: '발급된 Token을 DB에 저장하지 않습니다. isTokenStoredInDb: false.',
    },
    {
      auditItem: 'Token 파일 저장',
      status: 'NOT_STORED_IN_FILE',
      meaning: '발급된 Token을 파일에 저장하지 않습니다. isTokenStoredInFile: false.',
    },
    {
      auditItem: 'Token 로그 출력',
      status: 'NOT_LOGGED',
      meaning: '발급된 Token을 콘솔 또는 로그에 출력하지 않습니다. isTokenLoggedToConsole: false.',
    },
    {
      auditItem: '인증키 값 표시 (client_id / client_secret)',
      status: 'NOT_DISPLAYED',
      meaning: 'client_id, client_secret 실제 값을 어떤 형태로도 표시하지 않습니다. isAuthKeyValueDisplayed: false.',
    },
    {
      auditItem: 'Signature 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'bcrypt+base64 Signature를 출력하지 않습니다. isSignatureDisplayed: false.',
    },
    {
      auditItem: 'Authorization 헤더 표시',
      status: 'NOT_DISPLAYED',
      meaning: 'Authorization 헤더 값을 출력하지 않습니다. isAuthorizationHeaderDisplayed: false.',
    },
    {
      auditItem: '.env 직접 열람',
      status: 'NOT_ACCESSED',
      meaning: '.env / .env.local 파일을 직접 열람하지 않습니다. isEnvFileDirectlyAccessed: false.',
    },
    {
      auditItem: '.env 자동 수정',
      status: 'NOT_MODIFIED',
      meaning: '.env / .env.local 파일을 수정하지 않습니다. isEnvFileModified: false.',
    },
    {
      auditItem: 'DB write / upsert / update',
      status: 'NOT_EXECUTED',
      meaning: 'DB write, upsert, update를 수행하지 않습니다. isDbWriteExecuted: false.',
    },
    {
      auditItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API를 호출하지 않습니다. isProductUpdateApiCalled: false.',
    },
    {
      auditItem: '가격 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격을 변경하지 않습니다. isPriceOrStockChanged: false.',
    },
    {
      auditItem: '재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '재고를 변경하지 않습니다. isPriceOrStockChanged: false.',
    },
    {
      auditItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: 'Worker, Queue, Adapter 실행 경로가 잠겨 있습니다. hasWorkerTrigger / hasQueueTrigger / hasAdapterTrigger: false.',
    },
    {
      auditItem: '추가 호출',
      status: 'STOPPED_WITHIN_APPROVAL_SCOPE',
      meaning: '추가 API 호출은 승인 범위 안에서 중단됩니다. isAdditionalCallStoppedWithinApprovalScope: true.',
    },
    {
      auditItem: '다음 단계',
      status: 'PENDING_SEPARATE_APPROVAL',
      meaning: '다음 API 단계는 별도 사용자 승인이 필요합니다. isNextStepSeparateApprovalGranted: false.',
    },
    {
      auditItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 272는 Task 271 결과의 비노출·비저장·비수정·비전파 상태를 감사 봉인하는 read-only 단계입니다.',
    },
  ];
}

export function buildNaverProductLookupLiveRetryResultNonMutationAuditSealView(
  task271Result: any
): NaverProductLookupLiveRetryResultNonMutationAuditSealView {
  const tokenRetryStatus = deriveTokenRetryStatus(task271Result);
  const productLookupRetryStatus = deriveProductLookupRetryStatus(task271Result);
  const isGwIpNotAllowedResolved = task271Result?.isGwIpNotAllowedResolved === true;

  const auditItems = buildAuditItems(tokenRetryStatus, productLookupRetryStatus, isGwIpNotAllowedResolved);

  return {
    taskName: 'Task 272 — Naver Product Lookup Live Retry Result Non-Mutation Audit Seal',
    title: 'Naver 상품 조회 Live 재시도 결과 비수정 감사 봉인',
    panelTitle: 'Live 재시도 결과 비수정 감사 봉인 (Task 272)',
    status: 'NAVER_PRODUCT_LOOKUP_LIVE_RETRY_RESULT_NON_MUTATION_AUDIT_SEALED',
    description: 'Task 271에서 IP 등록 후 Token 발급 재시도와 상품 조회 read-only 테스트 결과가 기록되었습니다. Task 272는 해당 결과의 비노출·비저장·비수정·비전파 상태를 감사 봉인하는 read-only 단계입니다.',
    guideMessage: 'Task 271에서 IP 등록 후 Token 발급 재시도와 상품 조회 read-only 테스트 결과가 기록되었습니다.\nTask 272는 해당 결과의 비노출·비저장·비수정·비전파 상태를 감사 봉인하는 read-only 단계입니다.\n이번 Task에서는 Token 재발급, 상품 조회 API 재호출, 상품 수정 API 호출, 가격/재고 변경, DB write를 수행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isNaverProductLookupLiveRetryResultNonMutationAuditSealed: true,
    isNaverProductLookupLiveRetryResultReady: true,

    tokenRetryStatus,
    productLookupRetryStatus,
    isGwIpNotAllowedResolved,
    isGwIpResolutionStatusRecorded: true,
    isTokenRetryStatusRecorded: true,
    isProductLookupRetryStatusRecorded: true,

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
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,

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

    isAdditionalCallStoppedWithinApprovalScope: true,
    isNextStepSeparateApprovalRequired: true,
    isNextStepSeparateApprovalGranted: false,

    auditItems,
  };
}
