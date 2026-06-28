import type {
  NaverTokenIssuanceEnvAuthPresenceResultEntry,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';
import {
  buildNaverTokenIssuanceEnvAuthPresenceCheckResultView,
} from './sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service';

export type NaverTokenIssuanceEnvAuthMissingRemediationGuideItem = {
  guideItem: string;
  status:
    | 'PRESENCE_RESULT_CONFIRMED'
    | 'MISSING_DETECTED'
    | 'BLOCKED_BY_MISSING_ENV_AUTH'
    | 'USER_ACTION_REQUIRED'
    | 'NOT_ACCESSED'
    | 'NOT_MODIFIED'
    | 'NOT_DISPLAYED'
    | 'NOT_LOGGED'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceEnvAuthMissingRemediationGuideView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ENV_AUTH_MISSING_REMEDIATION_GUIDE_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isEnvAuthMissingRemediationGuideReady: true;
  isEnvAuthPresenceCheckResultReady: true;

  presencePresentCount: number;
  presenceMissingCount: number;
  isMissingEnvAuthDetected: boolean;
  isTokenIssuanceBlockedByMissingEnvAuth: boolean;
  isUserActionRequiredForEnvAuth: true;

  isEnvPresenceCheckExecuted: true;
  isAuthKeyPresenceCheckExecuted: true;
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

  presenceResults: NaverTokenIssuanceEnvAuthPresenceResultEntry[];
  guideItems: NaverTokenIssuanceEnvAuthMissingRemediationGuideItem[];
  remediationMessages: string[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverTokenIssuanceEnvAuthMissingRemediationGuideView(
  job: any,
  envSource: Record<string, string | undefined> = process.env
): NaverTokenIssuanceEnvAuthMissingRemediationGuideView {
  const resultView = buildNaverTokenIssuanceEnvAuthPresenceCheckResultView(job, envSource);
  const presencePresentCount = resultView.presentCount;
  const presenceMissingCount = resultView.missingCount;
  const isMissingEnvAuthDetected = presenceMissingCount > 0;

  return {
    taskName: 'Task 248 - Naver Token Issuance Env Auth Missing Remediation Guide Screen Flow',
    title: 'Naver Token Issuance Env Auth Missing Remediation Guide',
    panelTitle: 'Naver Token Issuance Env Auth Missing Remediation Guide',
    status: 'ENV_AUTH_MISSING_REMEDIATION_GUIDE_READY',
    description:
      'Task 248은 Task 247 결과에서 누락된 Env/Auth 항목을 사용자가 안전하게 보정해야 함을 안내하는 read-only 패널입니다. 이번 Task에서는 ".env" 파일을 직접 열거나 수정하지 않으며 Token 발급도 진행하지 않습니다.',

    isBatchJobResultDisplayOnly: true,
    isEnvAuthMissingRemediationGuideReady: true,
    isEnvAuthPresenceCheckResultReady: true,

    presencePresentCount,
    presenceMissingCount,
    isMissingEnvAuthDetected,
    isTokenIssuanceBlockedByMissingEnvAuth: isMissingEnvAuthDetected,
    isUserActionRequiredForEnvAuth: true,

    isEnvPresenceCheckExecuted: true,
    isAuthKeyPresenceCheckExecuted: true,
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

    presenceResults: resultView.presenceResults,
    guideItems: [
      {
        guideItem: 'Env/Auth Presence Check Result',
        status: 'PRESENCE_RESULT_CONFIRMED',
        meaning: 'Task 247 존재 여부 확인 결과가 반영되었습니다.'
      },
      {
        guideItem: '현재 확인 결과',
        status: 'MISSING_DETECTED',
        meaning: `현재 런타임 기준 PRESENT ${presencePresentCount} / MISSING ${presenceMissingCount}로 누락이 확인되었습니다.`
      },
      {
        guideItem: 'Token 발급 가능 여부',
        status: 'BLOCKED_BY_MISSING_ENV_AUTH',
        meaning: '필수 Env/Auth 누락으로 현재 상태에서는 Token 발급 테스트를 진행할 수 없습니다.'
      },
      {
        guideItem: '사용자 보정 필요',
        status: 'USER_ACTION_REQUIRED',
        meaning: '사용자가 로컬 실행 환경 또는 배포 환경에 필요한 환경변수/인증정보를 직접 설정해야 합니다.'
      },
      {
        guideItem: '".env" 직접 열람',
        status: 'NOT_ACCESSED',
        meaning: '".env" 파일을 직접 열람하지 않았습니다.'
      },
      {
        guideItem: '".env" 자동 수정',
        status: 'NOT_MODIFIED',
        meaning: '".env" 파일 자동 생성 또는 수정은 수행하지 않았습니다.'
      },
      {
        guideItem: '인증키 값 표시',
        status: 'NOT_DISPLAYED',
        meaning: '인증키 값, 일부 값, 마스킹 값, 해시값 모두 표시하지 않습니다.'
      },
      {
        guideItem: 'Secret 로그 출력',
        status: 'NOT_LOGGED',
        meaning: 'Secret 값은 로그에도 기록되지 않습니다.'
      },
      {
        guideItem: 'Token 발급',
        status: 'LOCKED',
        meaning: '누락 보정이 완료되기 전까지 Token 발급은 잠겨 있습니다.'
      },
      {
        guideItem: 'Token 저장',
        status: 'LOCKED',
        meaning: 'Token 저장은 발생하지 않습니다.'
      },
      {
        guideItem: 'Naver API 호출',
        status: 'LOCKED',
        meaning: 'Naver API 호출은 없습니다.'
      },
      {
        guideItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '상품 조회/수정 API 호출은 없습니다.'
      },
      {
        guideItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '가격 및 재고 변경은 없습니다.'
      },
      {
        guideItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: 'Worker, Queue, Adapter 실행 경로는 연결되지 않았습니다.'
      },
      {
        guideItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행용 POST API 연결은 없습니다.'
      },
      {
        guideItem: '승인/실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '승인 버튼, 실행 버튼, submit 액션이 존재하지 않습니다.'
      },
      {
        guideItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 248은 누락 보정 안내 표시 전용 화면입니다.'
      },
    ],
    remediationMessages: [
      '현재 런타임 환경에서 Token 발급 필수 환경변수/인증정보가 확인되지 않았습니다.',
      '이 상태에서는 Token 발급 테스트를 진행할 수 없습니다.',
      '사용자가 로컬 실행 환경 또는 배포 환경에 필요한 값을 직접 설정한 뒤, 다음 Task에서 비노출 방식으로 재확인해야 합니다.',
    ],
    misunderstandingPreventionItems: [
      'Task 248은 안내 표시 전용입니다. ".env" 파일을 직접 열거나 수정하지 않습니다.',
      '인증키/토큰/secret 값, 일부 값, 마스킹 값, 해시값은 어떤 형태로도 표시하지 않습니다.',
      '현재 패널은 누락 사실과 보정 필요 상태만 보여주며 Token 발급을 시도하지 않습니다.',
      'Token 발급, Token 저장, Naver API 호출, 상품 API 호출, 가격·재고 변경은 모두 LOCKED 상태입니다.',
      'POST API, submit, 승인/실행 버튼, Worker/Queue/Adapter 연결은 존재하지 않습니다.',
    ],
    finalNotice:
      '이 패널은 Env/Auth 누락 보정 안내 화면이며 표시 전용입니다. 사용자가 필요한 값을 직접 설정한 뒤 다음 단계에서 비노출 방식으로 재확인해야 하며, 현재 상태에서는 Token 발급/저장과 모든 실행 연결이 차단됩니다.',
  };
}
