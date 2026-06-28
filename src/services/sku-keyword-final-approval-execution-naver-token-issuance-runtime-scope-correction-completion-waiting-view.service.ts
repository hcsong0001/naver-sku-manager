export type NaverTokenIssuanceRuntimeScopeCorrectionCompletionWaitingItem = {
  waitingItem: string;
  status:
    | 'CORRECTION_CHECKLIST_CONFIRMED'
    | 'MISSING_STILL_DETECTED'
    | 'TARGET_NOT_MET'
    | 'WAITING_USER_CORRECTION_COMPLETION'
    | 'WAITING_USER_ACTION'
    | 'RECHECK_NOT_ALLOWED_YET'
    | 'FORBIDDEN'
    | 'BLOCKED_BY_MISSING_ENV_AUTH'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceRuntimeScopeCorrectionCompletionWaitingView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'RUNTIME_SCOPE_CORRECTION_COMPLETION_WAITING';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isRuntimeScopeCorrectionCompletionWaitingReady: true;
  isEnvAuthRuntimeScopeUserCorrectionChecklistReady: true;
  isEnvAuthRuntimeScopeDiagnosisReady: true;

  presencePresentCount: 0;
  presenceMissingCount: 3;
  targetPresentCount: 3;
  targetMissingCount: 0;
  isTargetPresenceResultMet: false;
  isMissingEnvAuthDetected: true;
  isMissingEnvAuthStillDetected: true;

  isUserRuntimeScopeCorrectionRequired: true;
  isUserRuntimeScopeCorrectionCompletionReported: false;
  isWaitingUserRuntimeScopeCorrectionCompletion: true;

  isPowerShellSessionCheckRequired: true;
  isNextJsProcessScopeCheckRequired: true;
  isProjectRootCheckRequired: true;
  isServerRestartRequiredAfterCorrection: true;

  isEnvPresenceRecheckExecuted: false;
  isAuthKeyPresenceRecheckExecuted: false;
  isRecheckBlockedUntilRuntimeScopeCorrection: true;

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

  waitingItems: NaverTokenIssuanceRuntimeScopeCorrectionCompletionWaitingItem[];
  completionReportGuide: string[];
  userWaitingNotice: string;
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceRuntimeScopeCorrectionCompletionWaitingView(
  job: any
): NaverTokenIssuanceRuntimeScopeCorrectionCompletionWaitingView {
  return {
    taskName: 'Task 257 - Naver Token Issuance Runtime Scope Correction Completion Waiting Screen Flow',
    title: 'Naver Token Issuance Runtime Scope Correction Completion Waiting',
    panelTitle: 'Runtime Scope 보정 완료 대기',
    status: 'RUNTIME_SCOPE_CORRECTION_COMPLETION_WAITING',
    description: 'Task 256 Runtime Scope 보정 체크리스트가 표시된 상태입니다. 사용자가 PowerShell 세션, Next.js 실행 프로세스, 프로젝트 루트, 서버 재시작 여부를 직접 보정 완료했다고 보고하기 전까지 Env/Auth 재확인과 Token 발급으로 진행할 수 없습니다.',

    isBatchJobResultDisplayOnly: true,
    isRuntimeScopeCorrectionCompletionWaitingReady: true,
    isEnvAuthRuntimeScopeUserCorrectionChecklistReady: true,
    isEnvAuthRuntimeScopeDiagnosisReady: true,

    presencePresentCount: 0,
    presenceMissingCount: 3,
    targetPresentCount: 3,
    targetMissingCount: 0,
    isTargetPresenceResultMet: false,
    isMissingEnvAuthDetected: true,
    isMissingEnvAuthStillDetected: true,

    isUserRuntimeScopeCorrectionRequired: true,
    isUserRuntimeScopeCorrectionCompletionReported: false,
    isWaitingUserRuntimeScopeCorrectionCompletion: true,

    isPowerShellSessionCheckRequired: true,
    isNextJsProcessScopeCheckRequired: true,
    isProjectRootCheckRequired: true,
    isServerRestartRequiredAfterCorrection: true,

    isEnvPresenceRecheckExecuted: false,
    isAuthKeyPresenceRecheckExecuted: false,
    isRecheckBlockedUntilRuntimeScopeCorrection: true,

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

    waitingItems: [
      {
        waitingItem: 'Runtime Scope User Correction Checklist (Task 256)',
        status: 'CORRECTION_CHECKLIST_CONFIRMED',
        meaning: 'Task 256 보정 체크리스트가 확인되었습니다. 사용자 보정 완료 보고를 기다리는 상태입니다.'
      },
      {
        waitingItem: '현재 재확인 결과',
        status: 'MISSING_STILL_DETECTED',
        meaning: 'PRESENT 0 / MISSING 3. 사용자 Runtime Scope 보정 완료 전까지 이 상태가 유지됩니다.'
      },
      {
        waitingItem: '목표 결과',
        status: 'TARGET_NOT_MET',
        meaning: 'PRESENT 3 / MISSING 0 미달성. 사용자 보정 완료 보고 후 다음 Task에서 재확인이 이루어집니다.'
      },
      {
        waitingItem: '사용자 Runtime Scope 보정',
        status: 'WAITING_USER_CORRECTION_COMPLETION',
        meaning: '사용자가 Runtime Scope 보정을 완료했다고 보고하기 전까지 다음 단계로 진행하지 않습니다.'
      },
      {
        waitingItem: 'PowerShell 세션 보정',
        status: 'WAITING_USER_ACTION',
        meaning: '사용자 확인/보정 대기 중입니다. 값을 설정한 세션과 npm/Next.js 실행 세션이 같은지 확인해야 합니다.'
      },
      {
        waitingItem: 'Next.js 실행 프로세스 보정',
        status: 'WAITING_USER_ACTION',
        meaning: '사용자 확인/보정 대기 중입니다. dev/build/test 실행 프로세스에 값이 전달되고 있는지 확인해야 합니다.'
      },
      {
        waitingItem: '프로젝트 루트 확인',
        status: 'WAITING_USER_ACTION',
        meaning: '사용자 확인/보정 대기 중입니다. 실행 위치가 프로젝트 루트(package.json이 있는 디렉토리)인지 확인해야 합니다.'
      },
      {
        waitingItem: '서버 재시작',
        status: 'WAITING_USER_ACTION',
        meaning: '사용자 확인/보정 대기 중입니다. 보정 후 dev/build/test를 재시작해야 합니다.'
      },
      {
        waitingItem: 'Env/Auth 재확인',
        status: 'RECHECK_NOT_ALLOWED_YET',
        meaning: '보정 완료 보고 전 재확인이 금지됩니다. 사용자가 보정 완료를 보고한 후 다음 Task에서만 재확인이 이루어집니다.'
      },
      {
        waitingItem: '".env" 직접 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 .env / .env.local 직접 열람이 금지됩니다. 파일 내용을 화면에 표시하지 않습니다.'
      },
      {
        waitingItem: '".env" 자동 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 .env / .env.local 자동 생성 및 수정이 금지됩니다. 사용자가 직접 설정해야 합니다.'
      },
      {
        waitingItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '값 출력이 금지됩니다. 인증키 값은 어떤 경우에도 화면에 표시되지 않습니다. 마스킹이나 해시 출력도 금지됩니다.'
      },
      {
        waitingItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: '로그 노출이 금지됩니다. 민감 정보는 로그에도 기록되지 않습니다.'
      },
      {
        waitingItem: 'Token 발급 가능 여부',
        status: 'BLOCKED_BY_MISSING_ENV_AUTH',
        meaning: '현재 PRESENT 0 / MISSING 3 상태로 Token 발급이 불가합니다. 사용자 보정 완료 및 재확인 통과 후에만 가능합니다.'
      },
      {
        waitingItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다. Env/Auth 보정 완료, 재확인 통과, 사용자 승인 후에만 가능합니다.'
      },
      {
        waitingItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없습니다. Token 값이 DB에 저장되지 않습니다.'
      },
      {
        waitingItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없습니다. 이 패널에서 Naver API를 호출하지 않습니다.'
      },
      {
        waitingItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없습니다. 상품 조회 API와 상품 수정 API 모두 호출되지 않습니다.'
      },
      {
        waitingItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
      },
      {
        waitingItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.'
      },
      {
        waitingItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없습니다. 어떤 POST 요청도 연결되지 않습니다.'
      },
      {
        waitingItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없습니다. 이 패널에 승인 버튼이나 실행 버튼이 존재하지 않습니다.'
      },
      {
        waitingItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 257은 Runtime Scope 보정 완료 대기 표시 전용입니다. 이 패널 표시가 재확인 실행이나 승인을 의미하지 않습니다.'
      }
    ],

    completionReportGuide: [
      'Runtime Scope 보정 완료 보고',
      '',
      '1. PowerShell 세션 확인 완료',
      '2. Next.js 실행 프로세스 확인 완료',
      '3. 프로젝트 루트 확인 완료',
      '4. 서버/dev/build/test 프로세스 재시작 또는 재실행 완료',
      '5. 실제 값은 공유하지 않음',
      '6. 다음 Task에서 비노출 방식으로 PRESENT/MISSING 재확인 요청'
    ],

    userWaitingNotice: '사용자가 PowerShell 세션, Next.js 실행 프로세스, 프로젝트 루트, 서버 재시작 여부를 직접 확인/보정한 뒤 완료를 보고하기 전까지 Env/Auth 재확인을 진행하지 않습니다. 현재 상태에서는 Token 발급 테스트를 진행할 수 없습니다. 보정 완료 후 다음 Task에서 값 노출 없이 PRESENT/MISSING 여부만 재확인합니다.',

    misunderstandingPreventionItems: [
      'Task 257은 Env/Auth 재확인 실행이 아닙니다. Runtime Scope 보정 완료 대기 표시 전용 패널입니다.',
      '개발 에이전트는 .env / .env.local 파일을 열람하거나 수정하지 않습니다.',
      '인증키 값은 이 화면 어디에도 표시되지 않습니다. 마스킹이나 해시 출력도 금지됩니다.',
      'isRecheckBlockedUntilRuntimeScopeCorrection === true이므로, 사용자 보정 완료 보고 전까지 재확인을 실행하지 않습니다.',
      'presencePresentCount === 0, presenceMissingCount === 3은 현재 상태이며 이번 Task에서 변경되지 않습니다.',
      'completionReportGuide는 사용자 보고 형식 안내이며, 실제 값을 포함하지 않습니다.',
      'Token 발급, Token 저장, Naver API 호출은 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 Runtime Scope 보정 완료 대기 표시 전용입니다. 승인 버튼, 실행 버튼, submit 동작이 없으며 인증키 값과 Secret 로그는 표시되지 않습니다. 사용자가 보정 완료를 보고한 후 다음 Task에서만 재확인이 진행됩니다.'
  };
}
