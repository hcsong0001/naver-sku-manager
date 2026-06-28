export type NaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistItem = {
  checklistItem: string;
  status:
    | 'RUNTIME_SCOPE_DIAGNOSIS_CONFIRMED'
    | 'MISSING_STILL_DETECTED'
    | 'TARGET_NOT_MET'
    | 'USER_CORRECTION_REQUIRED'
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

export type NaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_RUNTIME_SCOPE_USER_CORRECTION_CHECKLIST_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthRuntimeScopeUserCorrectionChecklistReady: true;
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
  isUserRuntimeScopeCorrectionRequired: true;

  isPowerShellSessionCheckRequired: true;
  isNextJsProcessScopeCheckRequired: true;
  isProjectRootCheckRequired: true;
  isServerRestartRequiredAfterCorrection: true;

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

  checklistItems: NaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistItem[];
  powershellPlaceholderGuide: string[];
  userActionSummary: string;
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistView(
  job: any
): NaverTokenIssuanceEnvAuthRuntimeScopeUserCorrectionChecklistView {
  return {
    taskName: 'Task 256 - Naver Token Issuance Env Auth Runtime Scope User Correction Checklist Screen Flow',
    title: 'Naver Token Issuance Env Auth Runtime Scope User Correction Checklist',
    panelTitle: 'Env/Auth Runtime Scope 사용자 보정 체크리스트',
    status: 'ENV_AUTH_RUNTIME_SCOPE_USER_CORRECTION_CHECKLIST_READY',
    description: 'Task 255 Runtime Scope 진단 결과, 현재 작업 프로세스 기준 PRESENT 0 / MISSING 3 상태입니다. 사용자가 직접 PowerShell 세션, Next.js 실행 프로세스, 프로젝트 루트, 서버 재시작 여부를 확인해야 합니다. 이번 Task에서는 재확인도 실행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthRuntimeScopeUserCorrectionChecklistReady: true,
    isEnvAuthRuntimeScopeDiagnosisReady: true,
    isEnvAuthPresenceRecheckResultReady: true,

    presencePresentCount: 0,
    presenceMissingCount: 3,
    targetPresentCount: 3,
    targetMissingCount: 0,
    isTargetPresenceResultMet: false,
    isMissingEnvAuthDetected: true,
    isMissingEnvAuthStillDetected: true,
    isRuntimeScopeDiagnosisRequired: true,
    isUserActionRequiredForRuntimeScope: true,
    isUserRuntimeScopeCorrectionRequired: true,

    isPowerShellSessionCheckRequired: true,
    isNextJsProcessScopeCheckRequired: true,
    isProjectRootCheckRequired: true,
    isServerRestartRequiredAfterCorrection: true,

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

    checklistItems: [
      {
        checklistItem: 'Runtime Scope Diagnosis (Task 255)',
        status: 'RUNTIME_SCOPE_DIAGNOSIS_CONFIRMED',
        meaning: 'Task 255 진단 결과가 확인되었습니다. 현재 작업 프로세스 기준 Env/Auth 값이 적용되지 않은 상태입니다.'
      },
      {
        checklistItem: '현재 재확인 결과',
        status: 'MISSING_STILL_DETECTED',
        meaning: 'PRESENT 0 / MISSING 3. 사용자가 설정한 값이 현재 Node/Next.js 실행 프로세스의 process.env에 적용되지 않은 상태입니다.'
      },
      {
        checklistItem: '목표 결과',
        status: 'TARGET_NOT_MET',
        meaning: 'PRESENT 3 / MISSING 0 미달성. NAVER_COMMERCE_CLIENT_ID, NAVER_COMMERCE_CLIENT_SECRET, NAVER_COMMERCE_API_BASE_URL 세 항목 모두 PRESENT여야 합니다.'
      },
      {
        checklistItem: '사용자 보정 필요',
        status: 'USER_CORRECTION_REQUIRED',
        meaning: '사용자가 직접 Runtime Scope 적용 범위를 보정해야 합니다. 개발 에이전트는 .env 파일을 열람하거나 수정하지 않습니다.'
      },
      {
        checklistItem: 'PowerShell 세션 확인',
        status: 'USER_ACTION_REQUIRED',
        meaning: '값을 설정한 세션과 npm/Next.js를 실행하는 세션이 같은지 확인하세요. 다른 세션에서 설정한 값은 process.env에 전달되지 않습니다.'
      },
      {
        checklistItem: 'Next.js 실행 프로세스 확인',
        status: 'USER_ACTION_REQUIRED',
        meaning: 'dev/build/test 실행 프로세스에 값이 전달되고 있는지 확인하세요. 같은 PowerShell 세션에서 $env:KEY 설정 후 npm.cmd run dev를 실행해야 합니다.'
      },
      {
        checklistItem: '프로젝트 루트 확인',
        status: 'USER_ACTION_REQUIRED',
        meaning: '실행 위치가 프로젝트 루트(package.json이 있는 디렉토리)인지 확인하세요. 잘못된 위치에서 실행하면 .env.local이 로드되지 않을 수 있습니다.'
      },
      {
        checklistItem: '서버 재시작 필요',
        status: 'USER_ACTION_REQUIRED',
        meaning: '값 설정 후 dev/build/test를 재시작해야 합니다. 기존 실행 중인 프로세스는 새로 설정한 값을 인식하지 못합니다.'
      },
      {
        checklistItem: '".env" 직접 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 .env / .env.local 직접 열람이 금지됩니다. 파일 내용을 화면에 표시하지 않습니다.'
      },
      {
        checklistItem: '".env" 자동 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 .env / .env.local 자동 생성 및 수정이 금지됩니다. 사용자가 직접 설정해야 합니다.'
      },
      {
        checklistItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '값 출력이 금지됩니다. 인증키 값은 어떤 경우에도 화면에 표시되지 않습니다. 마스킹이나 해시 출력도 금지됩니다.'
      },
      {
        checklistItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: '로그 노출이 금지됩니다. 민감 정보는 로그에도 기록되지 않습니다.'
      },
      {
        checklistItem: 'Env/Auth 재확인',
        status: 'NOT_EXECUTED',
        meaning: '이번 Task에서는 재확인 실행을 하지 않습니다. 사용자 보정 후 다음 Task에서 재확인이 진행됩니다.'
      },
      {
        checklistItem: 'Token 발급 가능 여부',
        status: 'BLOCKED_BY_MISSING_ENV_AUTH',
        meaning: '현재 PRESENT 0 / MISSING 3 상태로 Token 발급이 불가합니다. 목표 PRESENT 3 / MISSING 0 달성 후에만 다음 단계 진행 가능합니다.'
      },
      {
        checklistItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다. Env/Auth 보정 완료 및 사용자 승인 후에만 가능합니다.'
      },
      {
        checklistItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없습니다. Token 값이 DB에 저장되지 않습니다.'
      },
      {
        checklistItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없습니다. 이 패널에서 Naver API를 호출하지 않습니다.'
      },
      {
        checklistItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없습니다. 상품 조회 API와 상품 수정 API 모두 호출되지 않습니다.'
      },
      {
        checklistItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
      },
      {
        checklistItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.'
      },
      {
        checklistItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없습니다. 어떤 POST 요청도 연결되지 않습니다.'
      },
      {
        checklistItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없습니다. 이 패널에 승인 버튼이나 실행 버튼이 존재하지 않습니다.'
      },
      {
        checklistItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 256은 Runtime Scope 보정 체크리스트 표시 전용입니다. 이 패널 표시가 재확인 실행이나 승인을 의미하지 않습니다.'
      }
    ],

    powershellPlaceholderGuide: [
      '# 예시 형식입니다. 실제 값은 사용자가 직접 입력합니다.',
      '$env:NAVER_COMMERCE_CLIENT_ID = "<USER_INPUT_ONLY>"',
      '$env:NAVER_COMMERCE_CLIENT_SECRET = "<USER_INPUT_ONLY>"',
      '$env:NAVER_COMMERCE_API_BASE_URL = "<USER_INPUT_ONLY>"',
      '',
      '# 같은 PowerShell 세션에서 실행해야 process.env에 전달됩니다.',
      'npm.cmd run dev'
    ],

    userActionSummary: '현재 작업 프로세스 기준 Env/Auth 값은 PRESENT 0 / MISSING 3입니다. 사용자가 값을 설정했더라도, 설정한 PowerShell 세션과 실제 npm/Next.js 실행 세션이 다르면 process.env에 전달되지 않을 수 있습니다. 사용자는 같은 PowerShell 세션에서 값을 설정하고 dev/build/test 명령을 실행하거나, 프로젝트 루트의 로컬 환경 설정을 직접 확인해야 합니다. 개발 에이전트는 .env 또는 .env.local 파일을 열람하거나 수정하지 않습니다. 보정 후 다음 Task에서 값 노출 없이 PRESENT/MISSING 여부만 재확인합니다.',

    misunderstandingPreventionItems: [
      'Task 256은 Env/Auth 재확인 실행이 아닙니다. Runtime Scope 보정 체크리스트 표시 전용 패널입니다.',
      '개발 에이전트는 .env / .env.local 파일을 열람하거나 수정하지 않습니다.',
      '인증키 값은 이 화면 어디에도 표시되지 않습니다. 마스킹이나 해시 출력도 금지됩니다.',
      'powershellPlaceholderGuide의 <USER_INPUT_ONLY>는 예시 형식입니다. 실제 값이 포함되지 않습니다.',
      'presencePresentCount === 0, presenceMissingCount === 3은 현재 진단 결과이며 이번 Task에서 변경되지 않습니다.',
      'Token 발급, Token 저장, Naver API 호출은 이 화면에서 발생하지 않습니다.',
      'POST API, Worker/Queue/Adapter, 상품 API, 가격/재고 변경, DB write는 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 Runtime Scope 사용자 보정 체크리스트 표시 전용입니다. 승인 버튼, 실행 버튼, submit 동작이 없으며 인증키 값과 Secret 로그는 표시되지 않습니다. 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다.'
  };
}
