export type PresenceStatus = 'PRESENT' | 'MISSING';

export const REQUIRED_NAVER_TOKEN_ENV_KEYS = [
  'NAVER_API_CLIENT_ID',
  'NAVER_API_CLIENT_SECRET',
  'NAVER_COMMERCE_API_BASE_URL',
] as const;

export type RequiredNaverTokenEnvKey = (typeof REQUIRED_NAVER_TOKEN_ENV_KEYS)[number];

export type NaverTokenIssuanceEnvAuthPresenceCheckResultItem = {
  resultItem: string;
  status:
    | 'EXECUTION_GATE_CONFIRMED'
    | 'CHECK_EXECUTED_NON_EXPOSURE'
    | 'NOT_ACCESSED'
    | 'NOT_DISPLAYED'
    | 'NOT_LOGGED'
    | 'PRESENT_OR_MISSING_ONLY'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthPresenceResultEntry = {
  key: RequiredNaverTokenEnvKey;
  status: PresenceStatus;
};

export type NaverTokenIssuanceEnvAuthPresenceCheckResultView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_PRESENCE_CHECK_RESULT_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthPresenceCheckResultReady: true;
  isEnvAuthPresenceCheckExecutionGateReady: true;
  isEnvAuthPresenceCheckHarnessReady: true;

  isEnvPresenceCheckReady: true;
  isAuthKeyPresenceCheckReady: true;
  isEnvPresenceCheckExecuted: true;
  isAuthKeyPresenceCheckExecuted: true;

  isEnvFileDirectlyAccessed: false;
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

  presentCount: number;
  missingCount: number;
  presenceResults: NaverTokenIssuanceEnvAuthPresenceResultEntry[];
  resultItems: NaverTokenIssuanceEnvAuthPresenceCheckResultItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

function resolvePresenceStatus(
  envSource: Record<string, string | undefined>,
  key: RequiredNaverTokenEnvKey
): PresenceStatus {
  const value = envSource[key];
  const present = typeof value === 'string' && value.trim().length > 0;
  return present ? 'PRESENT' : 'MISSING';
}

export function buildNaverTokenIssuanceEnvAuthPresenceResults(
  envSource: Record<string, string | undefined> = process.env
): NaverTokenIssuanceEnvAuthPresenceResultEntry[] {
  return REQUIRED_NAVER_TOKEN_ENV_KEYS.map((key) => ({
    key,
    status: resolvePresenceStatus(envSource, key),
  }));
}

export function buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(
  job: any,
  envSource: Record<string, string | undefined> = process.env
): NaverTokenIssuanceEnvAuthPresenceCheckResultView {
  const presenceResults = buildNaverTokenIssuanceEnvAuthPresenceResults(envSource);
  const presentCount = presenceResults.filter((item) => item.status === 'PRESENT').length;
  const missingCount = presenceResults.length - presentCount;

  return {
    taskName: 'Task 247 - Naver Token Issuance Env Auth Presence Check Result Screen Flow',
    title: 'Naver Token Issuance Env Auth Presence Check Result',
    panelTitle: 'Naver Token Issuance Env Auth Presence Check Result',
    status: 'ENV_AUTH_PRESENCE_CHECK_RESULT_READY',
    description:
      'Task 247은 실제 Token 발급 전에 필요한 Env/Auth 존재 여부 확인 결과 화면입니다. ".env" 파일을 직접 열지 않고 런타임 환경변수 존재 여부만 확인하며, 인증키/토큰/secret 값과 일부 값, 마스킹 값, 해시값은 표시하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthPresenceCheckResultReady: true,
    isEnvAuthPresenceCheckExecutionGateReady: true,
    isEnvAuthPresenceCheckHarnessReady: true,

    isEnvPresenceCheckReady: true,
    isAuthKeyPresenceCheckReady: true,
    isEnvPresenceCheckExecuted: true,
    isAuthKeyPresenceCheckExecuted: true,

    isEnvFileDirectlyAccessed: false,
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

    presentCount,
    missingCount,
    presenceResults,
    resultItems: [
      {
        resultItem: 'Presence Check Execution Gate',
        status: 'EXECUTION_GATE_CONFIRMED',
        meaning: 'Task 246 Execution Gate가 확인되었습니다.'
      },
      {
        resultItem: 'Env/Auth Presence Check',
        status: 'CHECK_EXECUTED_NON_EXPOSURE',
        meaning: '비노출 방식으로 Env/Auth 존재 여부 확인이 완료되었습니다.'
      },
      {
        resultItem: '".env" 파일 직접 열람',
        status: 'NOT_ACCESSED',
        meaning: '파일 직접 열람 없이 런타임 환경변수 존재 여부만 확인했습니다.'
      },
      {
        resultItem: '환경변수 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '환경변수 값 자체는 화면에 표시하지 않습니다.'
      },
      {
        resultItem: '인증키 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '인증키 값 자체는 화면에 표시하지 않습니다.'
      },
      {
        resultItem: 'Secret 로그 출력',
        status: 'NOT_LOGGED',
        meaning: 'Secret 값은 로그에 기록되지 않습니다.'
      },
      {
        resultItem: '필수 Env 존재 결과',
        status: 'PRESENT_OR_MISSING_ONLY',
        meaning: '필수 항목은 PRESENT 또는 MISSING만 표시하며 값, 일부 값, 마스킹 값, 해시값은 표시하지 않습니다.'
      },
      {
        resultItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다. Presence Check 결과 화면은 Token 발급 단계가 아닙니다.'
      },
      {
        resultItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 경로가 잠겨 있으며 Token 저장은 발생하지 않습니다.'
      },
      {
        resultItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: 'Naver API 호출은 없습니다.'
      },
      {
        resultItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '상품 조회/수정 API 호출은 없습니다.'
      },
      {
        resultItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '가격 및 재고 변경은 없습니다.'
      },
      {
        resultItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: 'Worker, Queue, Adapter 실행 경로는 연결되지 않았습니다.'
      },
      {
        resultItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행용 POST API 연결은 없습니다.'
      },
      {
        resultItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '승인 버튼, 실행 버튼, submit 액션이 존재하지 않습니다.'
      },
      {
        resultItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 247은 Env/Auth 존재 여부 결과 표시 전용 화면입니다.'
      },
    ],
    misunderstandingPreventionItems: [
      'Task 247은 Token 발급이 아닙니다. 존재 여부 결과를 읽기 전용으로 표시하는 화면입니다.',
      '".env" 파일을 직접 열지 않았으며 런타임 환경변수 존재 여부만 확인했습니다.',
      '인증키/토큰/secret 값, 일부 값, 마스킹 값, 해시값은 어떤 형태로도 표시하지 않습니다.',
      '필수 항목은 PRESENT 또는 MISSING만 표시합니다.',
      'Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 LOCKED 상태입니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      '이 패널은 Env/Auth 존재 여부 결과 화면이며 표시 전용입니다. 값 노출 없이 PRESENT/MISSING 상태만 표시하고, Token 발급/저장, Naver API 호출, DB write, 실행 연결은 모두 차단되어 있습니다.',
  };
}
