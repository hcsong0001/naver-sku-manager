export type PresenceRecheckStatus = 'PRESENT' | 'MISSING';

export const REQUIRED_NAVER_TOKEN_ENV_RECHECK_KEYS = [
  'NAVER_COMMERCE_CLIENT_ID',
  'NAVER_COMMERCE_CLIENT_SECRET',
  'NAVER_COMMERCE_API_BASE_URL',
] as const;

export type RequiredNaverTokenEnvRecheckKey = (typeof REQUIRED_NAVER_TOKEN_ENV_RECHECK_KEYS)[number];

export type NaverTokenIssuanceEnvAuthPresenceRecheckResultEntry = {
  key: RequiredNaverTokenEnvRecheckKey;
  status: PresenceRecheckStatus;
};

export type NaverTokenIssuanceEnvAuthPresenceRecheckResultItem = {
  recheckItem: string;
  status:
    | 'COMPLETION_REPORT_CONFIRMED'
    | 'RECHECK_EXECUTED_NON_EXPOSURE'
    | 'PRESENT_OR_MISSING_ONLY'
    | 'TARGET_REACHED'
    | 'MISSING_STILL_DETECTED'
    | 'NOT_ACCESSED'
    | 'NOT_DISPLAYED'
    | 'NOT_LOGGED'
    | 'TOKEN_GATE_NOT_RELEASED'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthPresenceRecheckResultView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_PRESENCE_RECHECK_RESULT_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthPresenceRecheckResultReady: true;
  isEnvAuthUserSetupCompletionReportWaitingReady: true;
  isEnvAuthUserSetupProcedureGuideReady: true;

  presencePresentCount: number;
  presenceMissingCount: number;
  isMissingEnvAuthDetected: boolean;
  isPresenceRecheckTargetReached: boolean;
  isTokenIssuanceGateReleaseCandidate: boolean;

  isEnvPresenceRecheckExecuted: true;
  isAuthKeyPresenceRecheckExecuted: true;

  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  isTokenIssuanceAllowed: false;
  isTokenIssued: false;
  isTokenStored: false;

  isActualApprovalGranted: false;
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmitted: false;
  isExecutionAllowed: false;
  isApprovalSubmission: false;
  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;

  hasApprovalRequestButton: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;

  isNaverApiCalled: false;
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;

  presenceResults: NaverTokenIssuanceEnvAuthPresenceRecheckResultEntry[];
  recheckItems: NaverTokenIssuanceEnvAuthPresenceRecheckResultItem[];
  recheckMessages: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

function resolvePresenceRecheckStatus(
  envSource: Record<string, string | undefined>,
  key: RequiredNaverTokenEnvRecheckKey
): PresenceRecheckStatus {
  const value = envSource[key];
  const present = typeof value === 'string' && value.trim().length > 0;
  return present ? 'PRESENT' : 'MISSING';
}

export function buildNaverTokenIssuanceEnvAuthPresenceRecheckResults(
  envSource: Record<string, string | undefined> = process.env
): NaverTokenIssuanceEnvAuthPresenceRecheckResultEntry[] {
  return REQUIRED_NAVER_TOKEN_ENV_RECHECK_KEYS.map((key) => ({
    key,
    status: resolvePresenceRecheckStatus(envSource, key),
  }));
}

export function buildNaverTokenIssuanceEnvAuthPresenceRecheckResultView(
  _job: any,
  envSource: Record<string, string | undefined> = process.env
): NaverTokenIssuanceEnvAuthPresenceRecheckResultView {
  const presenceResults = buildNaverTokenIssuanceEnvAuthPresenceRecheckResults(envSource);
  const presencePresentCount = presenceResults.filter((item) => item.status === 'PRESENT').length;
  const presenceMissingCount = presenceResults.length - presencePresentCount;
  const isMissingEnvAuthDetected = presenceMissingCount > 0;
  const isPresenceRecheckTargetReached = presencePresentCount === 3 && presenceMissingCount === 0;

  return {
    taskName: 'Task 254 - Naver Token Issuance Env/Auth Presence Recheck Result Screen Flow',
    title: 'Naver Token Issuance Env/Auth Presence Recheck Result',
    panelTitle: 'Naver Token Issuance Env/Auth Presence Recheck Result',
    status: 'ENV_AUTH_PRESENCE_RECHECK_RESULT_READY',
    description:
      'Task 254는 사용자가 직접 설정 완료를 보고한 Env/Auth 값을 노출하지 않고 PRESENT/MISSING 여부만 재확인하는 read-only 결과 화면입니다. 이번 Task는 Token 발급, Token 저장, Naver API 호출 단계가 아닙니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthPresenceRecheckResultReady: true,
    isEnvAuthUserSetupCompletionReportWaitingReady: true,
    isEnvAuthUserSetupProcedureGuideReady: true,

    presencePresentCount,
    presenceMissingCount,
    isMissingEnvAuthDetected,
    isPresenceRecheckTargetReached,
    isTokenIssuanceGateReleaseCandidate: isPresenceRecheckTargetReached,

    isEnvPresenceRecheckExecuted: true,
    isAuthKeyPresenceRecheckExecuted: true,

    isEnvFileDirectlyAccessed: false,
    isEnvFileModified: false,
    isEnvValueDisplayed: false,
    isAuthKeyValueDisplayed: false,
    isSecretLogged: false,
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,

    isTokenIssuanceAllowed: false,
    isTokenIssued: false,
    isTokenStored: false,

    isActualApprovalGranted: false,
    isActualApprovalSubmissionAllowed: false,
    isApprovalSubmitted: false,
    isExecutionAllowed: false,
    isApprovalSubmission: false,
    isPostApiConnected: false,
    isMutationConnected: false,
    isLiveExecutionEnabled: false,

    hasApprovalRequestButton: false,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,

    isNaverApiCalled: false,
    isProductLookupApiCalled: false,
    isProductUpdateApiCalled: false,
    isPriceOrStockChanged: false,

    presenceResults,
    recheckItems: [
      {
        recheckItem: 'User Setup Completion Report',
        status: 'COMPLETION_REPORT_CONFIRMED',
        meaning: 'Task 253 사용자 직접 설정 완료 보고가 확인되었습니다.',
      },
      {
        recheckItem: 'Env/Auth Presence Recheck',
        status: 'RECHECK_EXECUTED_NON_EXPOSURE',
        meaning: '값 노출 없이 런타임 환경변수 존재 여부만 재확인했습니다.',
      },
      {
        recheckItem: '현재 재확인 결과',
        status: isPresenceRecheckTargetReached ? 'TARGET_REACHED' : 'MISSING_STILL_DETECTED',
        meaning: `현재 재확인 결과는 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      },
      {
        recheckItem: '필수 Env 존재 결과',
        status: 'PRESENT_OR_MISSING_ONLY',
        meaning: '필수 항목은 PRESENT 또는 MISSING만 표시하며 값, 일부 값, 마스킹 값, 해시값은 표시하지 않습니다.',
      },
      {
        recheckItem: '".env" 파일 직접 열람',
        status: 'NOT_ACCESSED',
        meaning: '".env" 또는 ".env.local" 파일을 직접 열람하지 않았습니다.',
      },
      {
        recheckItem: '환경변수 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '환경변수 값 자체는 화면에 표시하지 않습니다.',
      },
      {
        recheckItem: '인증키 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '인증키 값 자체는 화면에 표시하지 않습니다.',
      },
      {
        recheckItem: 'Secret 로그 출력',
        status: 'NOT_LOGGED',
        meaning: 'Secret 값은 로그에 기록하지 않습니다.',
      },
      {
        recheckItem: 'Token 발급 Gate',
        status: 'TOKEN_GATE_NOT_RELEASED',
        meaning: 'Task 254는 재확인 결과 표시 전용이며 Token 발급 Gate를 해제하지 않습니다.',
      },
      {
        recheckItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다.',
      },
      {
        recheckItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없음입니다.',
      },
      {
        recheckItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        recheckItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        recheckItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없음입니다.',
      },
      {
        recheckItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없음입니다.',
      },
      {
        recheckItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없음입니다.',
      },
      {
        recheckItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없음입니다.',
      },
      {
        recheckItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 254는 Env/Auth 존재 여부 재확인 결과 표시 전용입니다.',
      },
    ],
    recheckMessages: [
      `현재 Env/Auth 재확인 결과는 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      isPresenceRecheckTargetReached
        ? '목표 결과 PRESENT 3 / MISSING 0이 확인되었습니다. 다음 Task에서 별도 Gate를 통해서만 Token 발급 1회 테스트 검토가 가능합니다.'
        : '목표 결과 PRESENT 3 / MISSING 0이 아직 확인되지 않았으므로 Token 발급 단계로 넘어갈 수 없습니다.',
      '값, 일부 값, 마스킹 값, 해시값, process.env 전체 내용은 표시하지 않습니다.',
    ],
    misunderstandingPreventionItems: [
      '이 패널은 Env/Auth 존재 여부 재확인 결과 화면이며 Token 발급 화면이 아닙니다.',
      '표시 가능한 것은 키 이름과 PRESENT/MISSING 상태뿐이며 실제 값은 어떤 형태로도 표시하지 않습니다.',
      'Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 LOCKED 상태입니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      'Task 254는 비노출 Env/Auth 재확인 결과 표시 전용입니다. PRESENT 3 / MISSING 0이 확인되더라도 이 Task에서는 Token 발급, 저장, Naver API 호출, 모든 실행 연결을 수행하지 않습니다.',
  };
}
