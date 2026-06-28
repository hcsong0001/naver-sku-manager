export type NaverTokenIssuanceEnvAuthPresenceCheckHarnessItem = {
  harnessItem: string;
  status:
    | 'PREFLIGHT_CONFIRMED'
    | 'HARNESS_READY'
    | 'NOT_EXECUTED'
    | 'FORBIDDEN'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthPresenceCheckHarnessView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_PRESENCE_CHECK_HARNESS_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthPresenceCheckHarnessReady: true;
  isEnvAuthPresencePreflightReady: true;
  isUserApprovalStillRequired: true;
  isNextStepRequiresUserApproval: true;

  isEnvPresenceCheckPlanned: true;
  isAuthKeyPresenceCheckPlanned: true;
  isEnvPresenceCheckExecuted: false;
  isAuthKeyPresenceCheckExecuted: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;

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
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  harnessItems: NaverTokenIssuanceEnvAuthPresenceCheckHarnessItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthPresenceCheckHarnessView(
  job: any
): NaverTokenIssuanceEnvAuthPresenceCheckHarnessView {
  return {
    taskName: 'Task 245 - Naver Token Issuance Env Auth Presence Check Harness Screen Flow',
    title: 'Naver Token Issuance Env Auth Presence Check Harness',
    panelTitle: 'Naver Token Issuance Env Auth Presence Check Harness',
    status: 'ENV_AUTH_PRESENCE_CHECK_HARNESS_READY',
    description: '실제 토큰 발급 전 환경변수/인증정보 존재 여부 확인에 사용할 Harness 준비 화면입니다. 이번 Task에서는 ".env" 확인 실행도 하지 않으며 인증키/토큰 값을 출력하지 않습니다. Secret 로그 출력도 금지됩니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthPresenceCheckHarnessReady: true,
    isEnvAuthPresencePreflightReady: true,
    isUserApprovalStillRequired: true,
    isNextStepRequiresUserApproval: true,

    isEnvPresenceCheckPlanned: true,
    isAuthKeyPresenceCheckPlanned: true,
    isEnvPresenceCheckExecuted: false,
    isAuthKeyPresenceCheckExecuted: false,
    isEnvValueDisplayed: false,
    isAuthKeyValueDisplayed: false,
    isSecretLogged: false,

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
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,

    harnessItems: [
      {
        harnessItem: 'Env/Auth Presence Preflight (Task 244)',
        status: 'PREFLIGHT_CONFIRMED',
        meaning: 'Task 244 비노출 방식 존재 여부 확인 Preflight가 완료되었습니다.'
      },
      {
        harnessItem: 'Presence Check Harness',
        status: 'HARNESS_READY',
        meaning: '비노출 확인 Harness가 준비되었습니다. 실행은 사용자 승인 후 다음 단계에서 이루어집니다.'
      },
      {
        harnessItem: '".env" 존재 여부 확인 실행',
        status: 'NOT_EXECUTED',
        meaning: '아직 실행하지 않았습니다. 이번 Task는 Harness 준비 화면 전용입니다.'
      },
      {
        harnessItem: '인증정보 존재 여부 확인 실행',
        status: 'NOT_EXECUTED',
        meaning: '아직 실행하지 않았습니다. 비노출 방식으로 존재 여부만 확인할 예정입니다.'
      },
      {
        harnessItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '값 출력이 금지됩니다. 인증키 값은 어떤 경우에도 화면에 표시되지 않습니다.'
      },
      {
        harnessItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: '로그 노출이 금지됩니다. 민감 정보는 로그에도 기록되지 않습니다.'
      },
      {
        harnessItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다. Presence Check 완료 및 사용자 승인 후에만 가능합니다.'
      },
      {
        harnessItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없습니다. Token 값이 DB에 저장되지 않습니다.'
      },
      {
        harnessItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없습니다. 이 패널에서 Naver API를 호출하지 않습니다.'
      },
      {
        harnessItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없습니다. 상품 조회 API와 상품 수정 API 모두 호출되지 않습니다.'
      },
      {
        harnessItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
      },
      {
        harnessItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.'
      },
      {
        harnessItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없습니다. 어떤 POST 요청도 연결되지 않습니다.'
      },
      {
        harnessItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없습니다. 이 패널에 승인 버튼이나 실행 버튼이 존재하지 않습니다.'
      },
      {
        harnessItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 245는 Env/Auth 존재 여부 확인 Harness 준비 화면 전용입니다. 이 패널 표시가 확인 실행이나 승인을 의미하지 않습니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 245는 ".env" 확인 실행이 아닙니다. Harness 준비 화면 표시 전용 패널입니다.',
      'ENV_AUTH_PRESENCE_CHECK_HARNESS_READY 상태는 실행 허용이 아닙니다. 아직 실행하지 않았습니다.',
      '인증키 값은 이 화면 어디에도 표시되지 않습니다. FORBIDDEN 상태입니다.',
      'Secret 로그 출력도 FORBIDDEN 상태입니다. 민감 정보는 로그에 기록되지 않습니다.',
      'isEnvPresenceCheckPlanned/isAuthKeyPresenceCheckPlanned이 true라는 것은 계획이 있다는 의미이며, 지금 실행 중이라는 뜻이 아닙니다.',
      'Token 발급, Token 저장, Naver API 호출은 이 화면에서 발생하지 않습니다.',
      'POST API, Worker/Queue/Adapter, 상품 API, 가격/재고 변경, DB write는 이 화면에서 발생하지 않습니다.',
      'Task 246에서 사용자가 승인하면 비노출 방식의 실제 presence check 단계로 넘어갈 수 있습니다.'
    ],

    finalNotice: '이 패널은 Env/Auth 존재 여부 확인 Harness 준비 화면입니다. 승인 버튼, 실행 버튼, submit 동작이 없으며 인증키 값과 Secret 로그는 표시되지 않습니다. 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다. 표시 전용입니다.'
  };
}
