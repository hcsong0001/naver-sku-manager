import type {
  RequiredNaverTokenEnvKey,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';
import {
  REQUIRED_NAVER_TOKEN_ENV_KEYS,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';

export type NaverTokenIssuanceEnvAuthUserSetupCompletionWaitingGateItem = {
  gateItem: string;
  status:
    | 'SETUP_CHECKLIST_CONFIRMED'
    | 'MISSING_DETECTED'
    | 'WAITING_USER_SETUP_COMPLETION'
    | 'RECHECK_BLOCKED_UNTIL_USER_SETUP'
    | 'BLOCKED_BY_MISSING_ENV_AUTH'
    | 'FORBIDDEN'
    | 'KEY_NAMES_ONLY'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthUserSetupCompletionWaitingKeyItem = {
  keyName: RequiredNaverTokenEnvKey;
  setupStatus: '설정 필요';
};

export type NaverTokenIssuanceEnvAuthUserSetupCompletionWaitingGateView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_USER_SETUP_COMPLETION_WAITING_GATE_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthUserSetupCompletionWaitingGateReady: true;
  isEnvAuthUserSetupChecklistReady: true;
  isEnvAuthMissingRemediationGuideReady: true;

  presencePresentCount: 0;
  presenceMissingCount: 3;
  isMissingEnvAuthDetected: true;
  isUserSetupRequiredForEnvAuth: true;
  isUserSetupCompletionReported: false;
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

  setupKeyItems: NaverTokenIssuanceEnvAuthUserSetupCompletionWaitingKeyItem[];
  gateItems: NaverTokenIssuanceEnvAuthUserSetupCompletionWaitingGateItem[];
  waitingMessages: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthUserSetupCompletionWaitingGateView(
  _job: any
): NaverTokenIssuanceEnvAuthUserSetupCompletionWaitingGateView {
  const presencePresentCount = 0;
  const presenceMissingCount = 3;

  return {
    taskName: 'Task 250 - Naver Token Issuance Env Auth User Setup Completion Waiting Gate Screen Flow',
    title: 'Naver Token Issuance Env Auth User Setup Completion Waiting Gate',
    panelTitle: 'Naver Token Issuance Env Auth User Setup Completion Waiting Gate',
    status: 'ENV_AUTH_USER_SETUP_COMPLETION_WAITING_GATE_READY',
    description:
      'Task 250은 사용자가 Env/Auth 설정 완료를 보고하기 전에는 Token 발급 단계와 재확인 단계로 넘어갈 수 없음을 read-only Gate로 표시합니다. 이번 Task에서는 ".env" 파일을 열람하거나 수정하지 않으며 Env/Auth 재확인도 실행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthUserSetupCompletionWaitingGateReady: true,
    isEnvAuthUserSetupChecklistReady: true,
    isEnvAuthMissingRemediationGuideReady: true,

    presencePresentCount,
    presenceMissingCount,
    isMissingEnvAuthDetected: true,
    isUserSetupRequiredForEnvAuth: true,
    isUserSetupCompletionReported: false,
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
      setupStatus: '설정 필요',
    })),
    gateItems: [
      {
        gateItem: 'User Setup Checklist',
        status: 'SETUP_CHECKLIST_CONFIRMED',
        meaning: 'Task 249 사용자 설정 체크리스트가 확인되었습니다.',
      },
      {
        gateItem: '현재 확인 결과',
        status: 'MISSING_DETECTED',
        meaning: `현재 확인 결과는 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      },
      {
        gateItem: '사용자 설정 완료 여부',
        status: 'WAITING_USER_SETUP_COMPLETION',
        meaning: '사용자가 아직 Env/Auth 설정 완료를 보고하기 전입니다.',
      },
      {
        gateItem: '다음 재확인 가능 여부',
        status: 'RECHECK_BLOCKED_UNTIL_USER_SETUP',
        meaning: '사용자 설정 완료 보고 전에는 Env/Auth 재확인을 진행하지 않습니다.',
      },
      {
        gateItem: 'Token 발급 가능 여부',
        status: 'BLOCKED_BY_MISSING_ENV_AUTH',
        meaning: '필수 Env/Auth 누락으로 Token 발급은 차단됩니다.',
      },
      {
        gateItem: '개발 에이전트 .env 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 직접 열람은 금지됩니다.',
      },
      {
        gateItem: '개발 에이전트 .env 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 직접 수정은 금지됩니다.',
      },
      {
        gateItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '실제 값, 일부 값, 마스킹 값, 해시값 모두 출력하지 않습니다.',
      },
      {
        gateItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: 'Secret 값은 로그에 기록하지 않습니다.',
      },
      {
        gateItem: '필수 키 안내',
        status: 'KEY_NAMES_ONLY',
        meaning: '표시 가능한 것은 키 이름과 설정 필요 여부뿐입니다.',
      },
      {
        gateItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다.',
      },
      {
        gateItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없음입니다.',
      },
      {
        gateItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        gateItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        gateItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없음입니다.',
      },
      {
        gateItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없음입니다.',
      },
      {
        gateItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없음입니다.',
      },
      {
        gateItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없음입니다.',
      },
      {
        gateItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 250은 설정 완료 대기 Gate 표시 전용입니다.',
      },
    ],
    waitingMessages: [
      '현재 Token 발급 필수 Env/Auth는 아직 누락 상태입니다.',
      `현재 확인 결과는 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      '사용자가 직접 설정 완료를 보고하기 전에는 재확인도 진행하지 않습니다.',
      '개발 에이전트는 ".env" 파일을 직접 열람하거나 수정하지 않습니다.',
      '표시 가능한 것은 키 이름과 설정 필요 여부뿐이며 실제 값은 표시하지 않습니다.',
    ],
    misunderstandingPreventionItems: [
      '이 Gate는 사용자 설정 완료 대기 화면이며 Env/Auth 재확인 실행 화면이 아닙니다.',
      'Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 LOCKED 상태입니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
      '값, 일부 값, 마스킹 값, 해시값, process.env 전체 출력, ".env" 파일 내용은 표시하지 않습니다.',
    ],
    finalNotice:
      '이 패널은 설정 완료 대기 Gate이며 표시 전용입니다. 사용자가 설정 완료를 별도로 보고하기 전에는 재확인, Token 발급, 저장, Naver API 호출, 모든 실행 연결이 차단됩니다.',
  };
}
