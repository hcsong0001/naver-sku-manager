export const RUNTIME_SCOPE_USER_INPUT_PLACEHOLDER = '<USER_INPUT_ONLY>' as const;

export const RUNTIME_SCOPE_DIAGNOSIS_ENV_KEYS = [
  'NAVER_COMMERCE_CLIENT_ID',
  'NAVER_COMMERCE_CLIENT_SECRET',
  'NAVER_COMMERCE_API_BASE_URL',
] as const;

export type RuntimeScopeDiagnosisEnvKey = (typeof RUNTIME_SCOPE_DIAGNOSIS_ENV_KEYS)[number];

export type NaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisItem = {
  diagnosisItem: string;
  status:
    | 'RECHECK_RESULT_CONFIRMED'
    | 'MISSING_STILL_DETECTED'
    | 'TARGET_NOT_MET'
    | 'RUNTIME_SCOPE_DIAGNOSIS_REQUIRED'
    | 'USER_ACTION_REQUIRED'
    | 'FORBIDDEN'
    | 'NOT_EXECUTED'
    | 'BLOCKED_BY_MISSING_ENV_AUTH'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisKeyItem = {
  keyName: RuntimeScopeDiagnosisEnvKey;
  guidanceStatus: '런타임 적용 범위 확인 필요';
};

export type NaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_RUNTIME_SCOPE_DIAGNOSIS_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthRuntimeScopeDiagnosisReady: true;
  isEnvAuthPresenceRecheckResultReady: true;

  presencePresentCount: 0;
  presenceMissingCount: 3;
  targetPresentCount: 3;
  targetMissingCount: 0;
  isTargetPresenceResultMet: false;
  isMissingEnvAuthDetected: true;
  isMissingEnvAuthStillDetected: true;
  isRuntimeScopeDiagnosisRequired: true;
  isUserActionRequiredForRuntimeScope: true;

  isUserSetupCompletionReported: true;
  isEnvPresenceRecheckExecuted: false;
  isAuthKeyPresenceRecheckExecuted: false;

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

  setupKeyItems: NaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisKeyItem[];
  diagnosisItems: NaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisItem[];
  diagnosisMessages: string[];
  powerShellPlaceholderCommands: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisView(
  _job: any
): NaverTokenIssuanceEnvAuthRuntimeScopeDiagnosisView {
  const presencePresentCount = 0;
  const presenceMissingCount = 3;
  const targetPresentCount = 3;
  const targetMissingCount = 0;

  return {
    taskName: 'Task 255 - Naver Token Issuance Env Auth Runtime Scope Diagnosis Screen Flow',
    title: 'Naver Token Issuance Env Auth Runtime Scope Diagnosis',
    panelTitle: 'Naver Token Issuance Env Auth Runtime Scope Diagnosis',
    status: 'ENV_AUTH_RUNTIME_SCOPE_DIAGNOSIS_READY',
    description:
      'Task 255는 Task 254 재확인 결과가 PRESENT 0 / MISSING 3으로 남은 원인을 값 누락 단정이 아니라 런타임 환경변수 적용 범위 미확인 상태로 진단하는 read-only 패널입니다. 이번 Task에서는 Env/Auth 재확인, Token 발급, Naver API 호출을 실행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthRuntimeScopeDiagnosisReady: true,
    isEnvAuthPresenceRecheckResultReady: true,

    presencePresentCount,
    presenceMissingCount,
    targetPresentCount,
    targetMissingCount,
    isTargetPresenceResultMet: false,
    isMissingEnvAuthDetected: true,
    isMissingEnvAuthStillDetected: true,
    isRuntimeScopeDiagnosisRequired: true,
    isUserActionRequiredForRuntimeScope: true,

    isUserSetupCompletionReported: true,
    isEnvPresenceRecheckExecuted: false,
    isAuthKeyPresenceRecheckExecuted: false,

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

    setupKeyItems: RUNTIME_SCOPE_DIAGNOSIS_ENV_KEYS.map((keyName) => ({
      keyName,
      guidanceStatus: '런타임 적용 범위 확인 필요',
    })),
    diagnosisItems: [
      {
        diagnosisItem: 'Env/Auth Recheck Result',
        status: 'RECHECK_RESULT_CONFIRMED',
        meaning: 'Task 254 재확인 결과가 확인되었습니다.',
      },
      {
        diagnosisItem: '현재 재확인 결과',
        status: 'MISSING_STILL_DETECTED',
        meaning: `현재 작업 프로세스 기준 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      },
      {
        diagnosisItem: '목표 결과',
        status: 'TARGET_NOT_MET',
        meaning: `목표 결과 PRESENT ${targetPresentCount} / MISSING ${targetMissingCount}이 아직 충족되지 않았습니다.`,
      },
      {
        diagnosisItem: 'Runtime Scope 진단',
        status: 'RUNTIME_SCOPE_DIAGNOSIS_REQUIRED',
        meaning: '설정한 값이 현재 Node/Next.js 실행 프로세스에 전달되지 않았을 가능성을 확인해야 합니다.',
      },
      {
        diagnosisItem: '설정 위치 확인',
        status: 'USER_ACTION_REQUIRED',
        meaning: '사용자가 값을 설정한 위치와 현재 실행 환경을 확인해야 합니다.',
      },
      {
        diagnosisItem: 'PowerShell 세션 적용 여부',
        status: 'USER_ACTION_REQUIRED',
        meaning: '값을 설정한 PowerShell 세션과 실행 명령을 수행한 세션이 같은지 확인해야 합니다.',
      },
      {
        diagnosisItem: 'Next.js 실행 프로세스 적용 여부',
        status: 'USER_ACTION_REQUIRED',
        meaning: 'npm/Next.js dev/build/test 실행 프로세스에 환경변수가 전달됐는지 확인해야 합니다.',
      },
      {
        diagnosisItem: '".env" 직접 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 또는 ".env.local" 직접 열람은 금지됩니다.',
      },
      {
        diagnosisItem: '".env" 자동 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 또는 ".env.local" 생성/수정은 금지됩니다.',
      },
      {
        diagnosisItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '실제 값, 일부 값, 마스킹 값, 해시값 모두 출력하지 않습니다.',
      },
      {
        diagnosisItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: 'Secret 값은 로그에 기록하지 않습니다.',
      },
      {
        diagnosisItem: 'Env/Auth 재확인',
        status: 'NOT_EXECUTED',
        meaning: '이번 Task에서는 Env/Auth 재확인을 실행하지 않습니다.',
      },
      {
        diagnosisItem: 'Token 발급 가능 여부',
        status: 'BLOCKED_BY_MISSING_ENV_AUTH',
        meaning: '현재 PRESENT 0 / MISSING 3 상태이므로 Token 발급은 불가합니다.',
      },
      {
        diagnosisItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다.',
      },
      {
        diagnosisItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없음입니다.',
      },
      {
        diagnosisItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        diagnosisItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        diagnosisItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없음입니다.',
      },
      {
        diagnosisItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없음입니다.',
      },
      {
        diagnosisItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없음입니다.',
      },
      {
        diagnosisItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없음입니다.',
      },
      {
        diagnosisItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 255는 Runtime Scope 진단 표시 전용입니다.',
      },
    ],
    diagnosisMessages: [
      'Task 254 재확인 결과, 현재 작업 프로세스 기준 Env/Auth 값은 여전히 PRESENT 0 / MISSING 3입니다.',
      '이는 사용자가 값을 설정하지 않았거나, 설정한 값이 현재 Node/Next.js 실행 프로세스에 전달되지 않았다는 의미일 수 있습니다.',
      '개발 에이전트는 .env 또는 .env.local 파일을 열람하거나 수정하지 않습니다.',
      '사용자는 값을 설정한 터미널과 실제 npm/Next.js 실행 터미널이 같은지 확인해야 합니다.',
      '값을 다시 설정한 뒤 다음 Task에서 값 노출 없이 PRESENT/MISSING 여부만 재확인합니다.',
    ],
    powerShellPlaceholderCommands: [
      '# 예시 형식입니다. 실제 값은 사용자가 직접 입력합니다.',
      ...RUNTIME_SCOPE_DIAGNOSIS_ENV_KEYS.map((keyName) => `$env:${keyName} = "${RUNTIME_SCOPE_USER_INPUT_PLACEHOLDER}"`),
      '',
      '# 같은 PowerShell 세션에서 dev/build/test 명령을 실행해야 process.env에 전달됩니다.',
      'npm.cmd run dev',
    ],
    misunderstandingPreventionItems: [
      '이 패널은 Runtime Scope 진단 안내이며 Env/Auth 재확인 실행 화면이 아닙니다.',
      '표시 가능한 것은 키 이름, placeholder, 진단 상태뿐이며 실제 값은 어떤 형태로도 표시하지 않습니다.',
      'Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 LOCKED 상태입니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      'Task 255는 런타임 환경변수 적용 범위 진단 표시 전용입니다. 다음 Task에서 사용자 조치 후 값 노출 없이 PRESENT/MISSING 여부만 다시 확인해야 하며, 현재 상태에서는 Token 발급과 모든 실행 연결이 차단됩니다.',
  };
}
