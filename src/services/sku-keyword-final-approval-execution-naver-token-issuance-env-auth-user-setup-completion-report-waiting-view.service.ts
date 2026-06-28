import type {
  RequiredNaverTokenEnvKey,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';
import {
  REQUIRED_NAVER_TOKEN_ENV_KEYS,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';

export type NaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingItem = {
  waitingItem: string;
  status:
    | 'PROCEDURE_GUIDE_CONFIRMED'
    | 'MISSING_DETECTED'
    | 'WAITING_USER_COMPLETION_REPORT'
    | 'RECHECK_NOT_ALLOWED_YET'
    | 'USER_ONLY_ACTION'
    | 'KEY_NAMES_ONLY'
    | 'FORBIDDEN'
    | 'BLOCKED_BY_MISSING_ENV_AUTH'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingKeyItem = {
  keyName: RequiredNaverTokenEnvKey;
  reportStatus: '사용자 설정 완료 보고 대기';
};

export type NaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_USER_SETUP_COMPLETION_REPORT_WAITING';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthUserSetupCompletionReportWaitingReady: true;
  isEnvAuthUserSetupProcedureGuideReady: true;
  isEnvAuthUserSetupCompletionWaitingGateReady: true;

  presencePresentCount: 0;
  presenceMissingCount: 3;
  isMissingEnvAuthDetected: true;
  isUserSetupRequiredForEnvAuth: true;
  isUserSetupProcedureReady: true;
  isUserSetupCompletionReported: false;
  isWaitingUserSetupCompletionReport: true;
  isRecheckBlockedUntilUserSetup: true;
  isNextStepRecheckRequired: true;

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

  setupKeyItems: NaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingKeyItem[];
  waitingItems: NaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingItem[];
  waitingMessages: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingView(
  _job: any
): NaverTokenIssuanceEnvAuthUserSetupCompletionReportWaitingView {
  const presencePresentCount = 0;
  const presenceMissingCount = 3;

  return {
    taskName: 'Task 252 - Naver Token Issuance Env Auth User Setup Completion Report Waiting Screen Flow',
    title: 'Naver Token Issuance Env Auth User Setup Completion Report Waiting',
    panelTitle: 'Naver Token Issuance Env Auth User Setup Completion Report Waiting',
    status: 'ENV_AUTH_USER_SETUP_COMPLETION_REPORT_WAITING',
    description:
      'Task 252는 사용자가 Env/Auth 설정 완료를 보고하기 전까지 재확인과 Token 발급으로 진행할 수 없음을 표시하는 read-only 패널입니다. 이번 Task에서는 설정 완료 처리, Env/Auth 재확인, Token 발급을 수행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthUserSetupCompletionReportWaitingReady: true,
    isEnvAuthUserSetupProcedureGuideReady: true,
    isEnvAuthUserSetupCompletionWaitingGateReady: true,

    presencePresentCount,
    presenceMissingCount,
    isMissingEnvAuthDetected: true,
    isUserSetupRequiredForEnvAuth: true,
    isUserSetupProcedureReady: true,
    isUserSetupCompletionReported: false,
    isWaitingUserSetupCompletionReport: true,
    isRecheckBlockedUntilUserSetup: true,
    isNextStepRecheckRequired: true,

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

    setupKeyItems: REQUIRED_NAVER_TOKEN_ENV_KEYS.map((keyName) => ({
      keyName,
      reportStatus: '사용자 설정 완료 보고 대기',
    })),
    waitingItems: [
      {
        waitingItem: 'User Setup Procedure Guide',
        status: 'PROCEDURE_GUIDE_CONFIRMED',
        meaning: 'Task 251 설정 절차 안내가 확인되었습니다.',
      },
      {
        waitingItem: '현재 확인 결과',
        status: 'MISSING_DETECTED',
        meaning: `현재 Env/Auth 상태는 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      },
      {
        waitingItem: '사용자 설정 완료 보고',
        status: 'WAITING_USER_COMPLETION_REPORT',
        meaning: '사용자가 Env/Auth 설정 완료를 별도로 보고할 때까지 대기합니다.',
      },
      {
        waitingItem: 'Env/Auth 재확인',
        status: 'RECHECK_NOT_ALLOWED_YET',
        meaning: '사용자 완료 보고 전에는 Env/Auth 재확인을 진행하지 않습니다.',
      },
      {
        waitingItem: '실제 값 입력',
        status: 'USER_ONLY_ACTION',
        meaning: '실제 값 입력은 사용자가 직접 수행해야 합니다.',
      },
      {
        waitingItem: '필수 키 이름 안내',
        status: 'KEY_NAMES_ONLY',
        meaning: '표시 가능한 것은 키 이름과 완료 보고 대기 상태뿐입니다.',
      },
      {
        waitingItem: '개발 에이전트 .env 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 직접 열람은 금지됩니다.',
      },
      {
        waitingItem: '개발 에이전트 .env 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 생성 또는 수정은 금지됩니다.',
      },
      {
        waitingItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '실제 값, 일부 값, 마스킹 값, 해시값 모두 출력하지 않습니다.',
      },
      {
        waitingItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: 'Secret 값은 로그에 기록하지 않습니다.',
      },
      {
        waitingItem: 'Token 발급 가능 여부',
        status: 'BLOCKED_BY_MISSING_ENV_AUTH',
        meaning: '현재 필수 Env/Auth 누락 상태이므로 Token 발급 테스트를 진행할 수 없습니다.',
      },
      {
        waitingItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다.',
      },
      {
        waitingItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없음입니다.',
      },
      {
        waitingItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        waitingItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        waitingItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없음입니다.',
      },
      {
        waitingItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없음입니다.',
      },
      {
        waitingItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없음입니다.',
      },
      {
        waitingItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없음입니다.',
      },
      {
        waitingItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 252는 완료 보고 대기 표시 전용입니다.',
      },
    ],
    waitingMessages: [
      '사용자가 Env/Auth 값을 직접 설정한 뒤 “설정 완료”를 보고하기 전까지 재확인은 진행하지 않습니다.',
      '현재 상태에서는 Token 발급 테스트를 진행할 수 없습니다.',
      '개발 에이전트는 .env 파일을 열람하거나 수정하지 않으며, 값은 표시하지 않습니다.',
    ],
    misunderstandingPreventionItems: [
      '이 패널은 완료 보고 대기 화면이며 설정 완료 처리 화면이 아닙니다.',
      '표시 가능한 것은 키 이름과 완료 보고 대기 상태뿐이며 실제 값은 어떤 형태로도 표시하지 않습니다.',
      'Env/Auth 재확인, Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 차단됩니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      '이 패널은 사용자 설정 완료 보고 대기 표시 전용입니다. 사용자가 완료를 보고하기 전까지 Env/Auth 재확인, Token 발급, 저장, Naver API 호출, 모든 실행 연결은 차단됩니다.',
  };
}
