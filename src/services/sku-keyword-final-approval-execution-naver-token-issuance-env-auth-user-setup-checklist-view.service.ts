import type {
  RequiredNaverTokenEnvKey,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';
import {
  REQUIRED_NAVER_TOKEN_ENV_KEYS,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';
import {
  buildNaverTokenIssuanceEnvAuthMissingRemediationGuideView,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-missing-remediation-guide-view.service';

export type NaverTokenIssuanceEnvAuthUserSetupChecklistItem = {
  checklistItem: string;
  status:
    | 'REMEDIATION_GUIDE_CONFIRMED'
    | 'MISSING_DETECTED'
    | 'USER_SETUP_REQUIRED'
    | 'FORBIDDEN'
    | 'KEY_NAMES_ONLY'
    | 'NEXT_STEP_RECHECK_REQUIRED'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthUserSetupKeyItem = {
  keyName: RequiredNaverTokenEnvKey;
  setupStatus: '설정 필요';
};

export type NaverTokenIssuanceEnvAuthUserSetupChecklistView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_USER_SETUP_CHECKLIST_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthUserSetupChecklistReady: true;
  isEnvAuthMissingRemediationGuideReady: true;
  isEnvAuthPresenceCheckResultReady: true;

  presencePresentCount: number;
  presenceMissingCount: number;
  isMissingEnvAuthDetected: true;
  isUserSetupRequiredForEnvAuth: true;
  isNextStepRecheckRequired: true;

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

  setupKeyItems: NaverTokenIssuanceEnvAuthUserSetupKeyItem[];
  checklistItems: NaverTokenIssuanceEnvAuthUserSetupChecklistItem[];
  guidanceMessages: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthUserSetupChecklistView(
  job: any,
  envSource: Record<string, string | undefined> = process.env
): NaverTokenIssuanceEnvAuthUserSetupChecklistView {
  const remediationGuide = buildNaverTokenIssuanceEnvAuthMissingRemediationGuideView(job, envSource);

  return {
    taskName: 'Task 249 - Naver Token Issuance Env Auth User Setup Checklist Screen Flow',
    title: 'Naver Token Issuance Env Auth User Setup Checklist',
    panelTitle: 'Naver Token Issuance Env Auth User Setup Checklist',
    status: 'ENV_AUTH_USER_SETUP_CHECKLIST_READY',
    description:
      'Task 249는 사용자가 직접 설정해야 하는 Naver Token 발급용 Env/Auth 체크리스트를 read-only로 표시합니다. 개발 에이전트는 ".env" 파일을 직접 열람하거나 수정하지 않으며, 키 이름과 설정 필요 여부만 안내합니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthUserSetupChecklistReady: true,
    isEnvAuthMissingRemediationGuideReady: true,
    isEnvAuthPresenceCheckResultReady: true,

    presencePresentCount: remediationGuide.presencePresentCount,
    presenceMissingCount: remediationGuide.presenceMissingCount,
    isMissingEnvAuthDetected: true,
    isUserSetupRequiredForEnvAuth: true,
    isNextStepRecheckRequired: true,

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
    checklistItems: [
      {
        checklistItem: 'Missing Remediation Guide',
        status: 'REMEDIATION_GUIDE_CONFIRMED',
        meaning: 'Task 248 누락 보정 안내가 확인되었습니다.'
      },
      {
        checklistItem: '현재 확인 결과',
        status: 'MISSING_DETECTED',
        meaning: `현재 확인 결과는 PRESENT ${remediationGuide.presencePresentCount} / MISSING ${remediationGuide.presenceMissingCount}입니다.`
      },
      {
        checklistItem: '사용자 직접 설정 필요',
        status: 'USER_SETUP_REQUIRED',
        meaning: '사용자가 로컬 실행 환경 또는 배포 환경에 필요한 Env/Auth 값을 직접 설정해야 합니다.'
      },
      {
        checklistItem: '개발 에이전트 .env 열람',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 직접 열람은 금지됩니다.'
      },
      {
        checklistItem: '개발 에이전트 .env 수정',
        status: 'FORBIDDEN',
        meaning: '개발 에이전트의 ".env" 직접 수정은 금지됩니다.'
      },
      {
        checklistItem: '인증키 값 표시',
        status: 'FORBIDDEN',
        meaning: '실제 값, 일부 값, 마스킹 값, 해시값 모두 출력하지 않습니다.'
      },
      {
        checklistItem: 'Secret 로그 출력',
        status: 'FORBIDDEN',
        meaning: 'Secret 값은 로그에도 기록하지 않습니다.'
      },
      {
        checklistItem: '필수 키 안내',
        status: 'KEY_NAMES_ONLY',
        meaning: '표시 가능한 것은 키 이름과 설정 필요 여부뿐입니다.'
      },
      {
        checklistItem: '설정 후 재확인',
        status: 'NEXT_STEP_RECHECK_REQUIRED',
        meaning: '다음 Task에서 값 노출 없이 PRESENT/MISSING만 다시 확인해야 합니다.'
      },
      {
        checklistItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 발급 불가합니다.'
      },
      {
        checklistItem: 'Token 저장',
        status: 'LOCKED',
        meaning: '저장 없음입니다.'
      },
      {
        checklistItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: '호출 없음입니다.'
      },
      {
        checklistItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출 없음입니다.'
      },
      {
        checklistItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경 없음입니다.'
      },
      {
        checklistItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로 없음입니다.'
      },
      {
        checklistItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로 없음입니다.'
      },
      {
        checklistItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼 없음입니다.'
      },
      {
        checklistItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 249는 사용자 설정 체크리스트 표시 전용입니다.'
      },
    ],
    guidanceMessages: [
      '현재 런타임 환경에서 Naver Token 발급 필수 환경변수/인증정보가 확인되지 않았습니다.',
      '개발 에이전트는 .env 파일을 열람하거나 수정하지 않습니다.',
      '사용자가 로컬 실행 환경 또는 배포 환경에 필요한 값을 직접 설정해야 합니다.',
      '설정 후 다음 Task에서 값 노출 없이 PRESENT/MISSING 여부만 다시 확인합니다.',
    ],
    misunderstandingPreventionItems: [
      '현재 Token 발급 필수 Env/Auth가 누락되어 있으며, 현 상태에서는 발급을 진행할 수 없습니다.',
      '표시 가능한 것은 키 이름과 설정 필요 여부뿐이며 실제 값은 어떤 형태로도 표시하지 않습니다.',
      '개발 에이전트는 ".env" 파일을 직접 열람하거나 수정하지 않습니다.',
      'Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 LOCKED 상태입니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      '이 패널은 사용자 설정 체크리스트 화면이며 표시 전용입니다. 사용자가 필요한 키를 직접 설정한 뒤 다음 단계에서 비노출 방식으로 재확인해야 하며, 현재 상태에서는 Token 발급과 모든 실행 연결이 차단됩니다.',
  };
}
