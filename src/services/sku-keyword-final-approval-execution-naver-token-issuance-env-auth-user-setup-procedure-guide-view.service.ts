import type {
  RequiredNaverTokenEnvKey,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';
import {
  REQUIRED_NAVER_TOKEN_ENV_KEYS,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';

export const USER_SETUP_PLACEHOLDER_VALUE = '<USER_INPUT_ONLY>' as const;

export type NaverTokenIssuanceEnvAuthUserSetupProcedureGuideItem = {
  procedureItem: string;
  status:
    | 'WAITING_GATE_CONFIRMED'
    | 'MISSING_DETECTED'
    | 'USER_SETUP_PROCEDURE_READY'
    | 'KEY_NAMES_ONLY'
    | 'USER_ONLY_ACTION'
    | 'FORBIDDEN'
    | 'WAITING_USER_SETUP_COMPLETION'
    | 'RECHECK_AFTER_USER_SETUP_ONLY'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthUserSetupProcedureKeyItem = {
  keyName: RequiredNaverTokenEnvKey;
  setupStatus: '사용자가 직접 설정 필요';
};

export type NaverTokenIssuanceEnvAuthUserSetupProcedureGuideView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_USER_SETUP_PROCEDURE_GUIDE_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthUserSetupProcedureGuideReady: true;
  isEnvAuthUserSetupCompletionWaitingGateReady: true;
  isEnvAuthUserSetupChecklistReady: true;

  presencePresentCount: 0;
  presenceMissingCount: 3;
  isMissingEnvAuthDetected: true;
  isUserSetupRequiredForEnvAuth: true;
  isUserSetupProcedureReady: true;
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

  setupKeyItems: NaverTokenIssuanceEnvAuthUserSetupProcedureKeyItem[];
  procedureItems: NaverTokenIssuanceEnvAuthUserSetupProcedureGuideItem[];
  guideMessages: string[];
  powerShellPlaceholderCommands: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthUserSetupProcedureGuideView(
  _job: any
): NaverTokenIssuanceEnvAuthUserSetupProcedureGuideView {
  const presencePresentCount = 0;
  const presenceMissingCount = 3;

  return {
    taskName: 'Task 251 - Naver Token Issuance Env Auth User Setup Procedure Guide Screen Flow',
    title: 'Naver Token Issuance Env Auth User Setup Procedure Guide',
    panelTitle: 'Naver Token Issuance Env Auth User Setup Procedure Guide',
    status: 'ENV_AUTH_USER_SETUP_PROCEDURE_GUIDE_READY',
    description:
      'Task 251은 사용자가 직접 Env/Auth 값을 설정할 수 있도록 절차만 안내하는 read-only 패널입니다. 개발 에이전트는 ".env" 파일을 열람하거나 수정하지 않고, Env/Auth 재확인과 Token 발급도 실행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthUserSetupProcedureGuideReady: true,
    isEnvAuthUserSetupCompletionWaitingGateReady: true,
    isEnvAuthUserSetupChecklistReady: true,

    presencePresentCount,
    presenceMissingCount,
    isMissingEnvAuthDetected: true,
    isUserSetupRequiredForEnvAuth: true,
    isUserSetupProcedureReady: true,
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
      setupStatus: '사용자가 직접 설정 필요',
    })),
    procedureItems: [
      {
        procedureItem: 'User Setup Waiting Gate',
        status: 'WAITING_GATE_CONFIRMED',
        meaning: 'Task 250 설정 완료 대기 Gate가 확인되었습니다.',
      },
      {
        procedureItem: '현재 확인 결과',
        status: 'MISSING_DETECTED',
        meaning: `현재 확인 결과는 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}입니다.`,
      },
      {
        procedureItem: '사용자 직접 설정 절차',
        status: 'USER_SETUP_PROCEDURE_READY',
        meaning: '사용자가 로컬 실행 환경 또는 배포 환경에 필요한 값을 직접 설정해야 합니다.',
      },
      {
        procedureItem: '필수 키 이름 안내',
        status: 'KEY_NAMES_ONLY',
        meaning: '표시 가능한 것은 키 이름뿐이며 값은 표시하지 않습니다.',
      },
      {
        procedureItem: '실제 값 입력',
        status: 'USER_ONLY_ACTION',
        meaning: '실제 값 입력은 사용자가 직접 수행해야 합니다.',
      },
      {
        procedureItem: '개발 에이전트 .env 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 직접 열람은 금지됩니다.',
      },
      {
        procedureItem: '개발 에이전트 .env 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 생성 또는 수정은 금지됩니다.',
      },
      {
        procedureItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '실제 값, 일부 값, 마스킹 값, 해시값 모두 출력하지 않습니다.',
      },
      {
        procedureItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: 'Secret 값은 로그에 기록하지 않습니다.',
      },
      {
        procedureItem: '설정 완료 보고',
        status: 'WAITING_USER_SETUP_COMPLETION',
        meaning: '사용자가 설정 완료를 별도로 보고할 때까지 대기합니다.',
      },
      {
        procedureItem: '다음 재확인',
        status: 'RECHECK_AFTER_USER_SETUP_ONLY',
        meaning: '사용자 완료 보고 후에만 값 노출 없이 PRESENT/MISSING 여부를 재확인할 수 있습니다.',
      },
      {
        procedureItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다.',
      },
      {
        procedureItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없음입니다.',
      },
      {
        procedureItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        procedureItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없음입니다.',
      },
      {
        procedureItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없음입니다.',
      },
      {
        procedureItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없음입니다.',
      },
      {
        procedureItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없음입니다.',
      },
      {
        procedureItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없음입니다.',
      },
      {
        procedureItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 251은 설정 절차 안내 표시 전용입니다.',
      },
    ],
    guideMessages: [
      '현재 Naver Token 발급 필수 Env/Auth가 누락되어 있습니다.',
      '개발 에이전트는 .env 파일을 열람하거나 수정하지 않습니다.',
      '사용자가 로컬 실행 환경 또는 배포 환경에 필요한 값을 직접 설정해야 합니다.',
      '설정 완료 후 사용자가 완료를 보고하면, 다음 Task에서 값 노출 없이 PRESENT/MISSING 여부만 재확인합니다.',
    ],
    powerShellPlaceholderCommands: [
      '# 예시 형식만 표시합니다. 실제 값은 사용자가 직접 입력합니다.',
      ...REQUIRED_NAVER_TOKEN_ENV_KEYS.map((keyName) => `$env:${keyName} = "${USER_SETUP_PLACEHOLDER_VALUE}"`),
    ],
    misunderstandingPreventionItems: [
      '이 패널은 설정 절차 안내 화면이며 개발 에이전트가 값을 입력하거나 파일을 수정하는 화면이 아닙니다.',
      'PowerShell 예시는 placeholder 형식만 표시하며 실제 값, 일부 값, 마스킹 값, 해시값은 포함하지 않습니다.',
      'Env/Auth 재확인, Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 차단됩니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      '이 패널은 사용자 설정 절차 안내 표시 전용입니다. 사용자가 직접 값을 설정하고 완료를 보고하기 전까지 재확인, Token 발급, 저장, Naver API 호출, 모든 실행 연결은 차단됩니다.',
  };
}
