export type EnvKeyPresenceItem = {
  key: string;
  presence: 'PRESENT' | 'MISSING';
};

export type NaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultItem = {
  recheckItem: string;
  status:
    | 'CORRECTION_WAITING_CONFIRMED'
    | 'USER_CORRECTION_REPORTED'
    | 'RECHECK_EXECUTED_NON_EXPOSURE'
    | 'TARGET_MET'
    | 'NOT_DISPLAYED'
    | 'NOT_LOGGED'
    | 'NOT_ACCESSED'
    | 'NOT_MODIFIED'
    | 'READY_FOR_TOKEN_ISSUANCE_GATE'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_RUNTIME_SCOPE_RECHECK_RESULT_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthRuntimeScopeRecheckResultReady: true;
  isRuntimeScopeCorrectionCompletionWaitingReady: true;

  presencePresentCount: number;
  presenceMissingCount: number;
  targetPresentCount: number;
  targetMissingCount: number;
  isTargetPresenceResultMet: boolean;

  isUserRuntimeScopeCorrectionCompletionReported: true;
  isEnvPresenceRecheckExecuted: true;
  isAuthKeyPresenceRecheckExecuted: true;

  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  isReadyForTokenIssuanceGate: boolean;
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

  envKeyPresenceItems: EnvKeyPresenceItem[];
  recheckItems: NaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export const REQUIRED_NAVER_TOKEN_ENV_KEYS = [
  'NAVER_COMMERCE_CLIENT_ID',
  'NAVER_COMMERCE_CLIENT_SECRET',
  'NAVER_COMMERCE_API_BASE_URL',
] as const;

export function checkEnvKeyPresence(
  keys: readonly string[],
  env: Record<string, string | undefined>
): EnvKeyPresenceItem[] {
  return keys.map(key => {
    const value = env[key];
    const present = typeof value === 'string' && value.trim().length > 0;
    return { key, presence: present ? 'PRESENT' : 'MISSING' } as EnvKeyPresenceItem;
  });
}

export function buildNaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView(
  job: any,
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>
): NaverTokenIssuanceEnvAuthRuntimeScopeRecheckResultView {
  const envKeyPresenceItems = checkEnvKeyPresence(REQUIRED_NAVER_TOKEN_ENV_KEYS, env);

  const presencePresentCount = envKeyPresenceItems.filter(i => i.presence === 'PRESENT').length;
  const presenceMissingCount = envKeyPresenceItems.filter(i => i.presence === 'MISSING').length;
  const targetPresentCount = REQUIRED_NAVER_TOKEN_ENV_KEYS.length;
  const targetMissingCount = 0;
  const isTargetPresenceResultMet = presencePresentCount === targetPresentCount && presenceMissingCount === targetMissingCount;
  const isReadyForTokenIssuanceGate = isTargetPresenceResultMet;

  const currentRecheckResultStatus = isTargetPresenceResultMet ? 'TARGET_MET' as const : 'READ_ONLY_INFO' as const;
  const tokenGateStatus = isReadyForTokenIssuanceGate ? 'READY_FOR_TOKEN_ISSUANCE_GATE' as const : 'LOCKED' as const;

  const presenceSummary = `PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}`;

  return {
    taskName: 'Task 259 - Naver Token Issuance Env Auth Runtime Scope Recheck Result Screen Flow',
    title: 'Naver Token Issuance Env Auth Runtime Scope Recheck Result',
    panelTitle: 'Env/Auth Runtime Scope 재확인 결과',
    status: 'ENV_AUTH_RUNTIME_SCOPE_RECHECK_RESULT_READY',
    description: `Runtime Scope 보정 후 Env/Auth 값이 현재 실행 프로세스의 process.env에 정상 적용되었는지 값 노출 없이 PRESENT/MISSING만 재확인한 결과입니다. 현재 결과: ${presenceSummary}. 이번 Task는 Token 발급이 아닙니다.`,

    isBatchJobResultDisplayOnly: true,
    isEnvAuthRuntimeScopeRecheckResultReady: true,
    isRuntimeScopeCorrectionCompletionWaitingReady: true,

    presencePresentCount,
    presenceMissingCount,
    targetPresentCount,
    targetMissingCount,
    isTargetPresenceResultMet,

    isUserRuntimeScopeCorrectionCompletionReported: true,
    isEnvPresenceRecheckExecuted: true,
    isAuthKeyPresenceRecheckExecuted: true,

    isEnvFileDirectlyAccessed: false,
    isEnvFileModified: false,
    isEnvValueDisplayed: false,
    isAuthKeyValueDisplayed: false,
    isSecretLogged: false,
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,

    isReadyForTokenIssuanceGate,
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

    envKeyPresenceItems,

    recheckItems: [
      {
        recheckItem: 'Runtime Scope Correction Waiting (Task 257)',
        status: 'CORRECTION_WAITING_CONFIRMED',
        meaning: 'Task 257 대기 상태가 확인되었습니다. 사용자 보정 완료 보고를 받았습니다.'
      },
      {
        recheckItem: '사용자 Runtime Scope 보정',
        status: 'USER_CORRECTION_REPORTED',
        meaning: '사용자가 PowerShell 세션, Next.js 실행 프로세스, 프로젝트 루트, 서버 재시작 여부 보정 완료를 보고하였습니다.'
      },
      {
        recheckItem: 'Env/Auth 재확인',
        status: 'RECHECK_EXECUTED_NON_EXPOSURE',
        meaning: `값 노출 없이 PRESENT/MISSING 여부만 재확인을 완료하였습니다. 결과: ${presenceSummary}.`
      },
      {
        recheckItem: '현재 재확인 결과',
        status: currentRecheckResultStatus,
        meaning: `${presenceSummary}. ${isTargetPresenceResultMet ? '목표 결과(PRESENT 3 / MISSING 0)가 충족되었습니다.' : '목표 결과가 아직 충족되지 않았습니다.'}`
      },
      {
        recheckItem: '환경변수 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '환경변수 실제 값은 표시되지 않습니다. PRESENT/MISSING 여부만 확인합니다.'
      },
      {
        recheckItem: '인증키 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '인증키 실제 값은 표시되지 않습니다. 마스킹이나 해시 출력도 하지 않습니다.'
      },
      {
        recheckItem: 'Secret 로그 출력',
        status: 'NOT_LOGGED',
        meaning: '민감 정보는 로그에 기록되지 않습니다. console.log(process.env)를 실행하지 않습니다.'
      },
      {
        recheckItem: '".env" 직접 열람',
        status: 'NOT_ACCESSED',
        meaning: '개발 에이전트가 .env / .env.local 파일을 직접 열람하지 않습니다.'
      },
      {
        recheckItem: '".env" 자동 수정',
        status: 'NOT_MODIFIED',
        meaning: '개발 에이전트가 .env / .env.local 파일을 자동으로 생성하거나 수정하지 않습니다.'
      },
      {
        recheckItem: 'Token 발급 가능성',
        status: tokenGateStatus,
        meaning: isReadyForTokenIssuanceGate
          ? 'Env/Auth 재확인 통과로 다음 Token 발급 Gate 진입이 가능합니다. 이번 Task에서는 발급하지 않습니다.'
          : 'Env/Auth가 아직 모두 PRESENT가 아니므로 Token 발급 Gate에 진입할 수 없습니다.'
      },
      {
        recheckItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '이번 Task에서는 Token을 발급하지 않습니다. Token 발급 Gate 승인 후에만 가능합니다.'
      },
      {
        recheckItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없습니다. Token 값이 DB에 저장되지 않습니다.'
      },
      {
        recheckItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없습니다. 이 패널에서 Naver API를 호출하지 않습니다.'
      },
      {
        recheckItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없습니다. 상품 조회 API와 상품 수정 API 모두 호출되지 않습니다.'
      },
      {
        recheckItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
      },
      {
        recheckItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.'
      },
      {
        recheckItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없습니다. 어떤 POST 요청도 연결되지 않습니다.'
      },
      {
        recheckItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없습니다. 이 패널에 승인 버튼이나 실행 버튼이 존재하지 않습니다.'
      },
      {
        recheckItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 259는 Runtime Scope 보정 후 Env/Auth 재확인 결과 표시 전용입니다. 이 패널 표시가 Token 발급 실행이나 승인을 의미하지 않습니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 259는 Token 발급이 아닙니다. Env/Auth 재확인 결과 표시 전용 패널입니다.',
      'RECHECK_EXECUTED_NON_EXPOSURE는 값 노출 없이 PRESENT/MISSING 여부만 확인했다는 의미입니다.',
      '개발 에이전트는 .env / .env.local 파일을 열람하거나 수정하지 않았습니다.',
      '인증키/토큰 값은 이 화면 어디에도 표시되지 않습니다. envKeyPresenceItems에는 key와 PRESENT/MISSING 여부만 포함됩니다.',
      'READY_FOR_TOKEN_ISSUANCE_GATE는 다음 단계 Gate 진입 가능 상태이지 Token 발급 허용이 아닙니다.',
      'isTokenIssuanceAllowed는 false입니다. Token 발급은 별도 Gate 승인 후에만 가능합니다.',
      'Token 발급, Token 저장, Naver API 호출은 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 Runtime Scope 보정 후 Env/Auth 재확인 결과 표시 전용입니다. 승인 버튼, 실행 버튼, submit 동작이 없으며 인증키 값과 Secret 로그는 표시되지 않습니다. 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다.'
  };
}
