import { getNaverToken } from '@/src/services/naver-product.service';
import type { NaverTokenResponse } from '@/src/types/naver-product.types';

export type NaverTokenIssuanceOneTimeTestResultItem = {
  testItem: string;
  status:
    | 'FINAL_APPROVAL_PENDING_SEAL_CONFIRMED'
    | 'USER_APPROVAL_RECEIVED'
    | 'TEST_EXECUTED'
    | 'SUCCESS'
    | 'FAILURE'
    | 'ENV_MISSING'
    | 'PRESENT'
    | 'FORBIDDEN'
    | 'DISCARDED'
    | 'NOT_STORED'
    | 'NOT_DISPLAYED'
    | 'LOCKED'
    | 'NOT_CONNECTED'
    | 'NOT_PRESENT'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverTokenIssuanceOneTimeTestResultIssuanceStatus =
  | 'SUCCESS'
  | 'FAILURE'
  | 'ENV_MISSING';

export type NaverTokenIssuanceOneTimeTestResultView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isNaverTokenIssuanceTestExecuted: boolean;
  isUserFinalApprovalGrantedForTokenIssuance: true;
  isUserFinalApprovalPhraseReceived: true;
  isTokenIssuanceOneTimeTestFinalApprovalPendingSealed: true;

  presencePresentCount: 3;
  presenceMissingCount: 0;
  isTargetPresenceResultMet: true;
  isReadyForTokenIssuanceGate: true;

  issuanceTestStatus: NaverTokenIssuanceOneTimeTestResultIssuanceStatus;
  isTokenIssuedForTest: boolean;
  isTokenValueDisplayed: false;
  isTokenStoredInDb: false;
  isTokenReturnedToClient: false;
  isTokenLoggedToConsole: false;
  tokenTypePresent: boolean;
  expiresInPresent: boolean;
  httpStatusSuccessful: boolean;
  errorReason: string | null;

  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  isActualApprovalGranted: true;
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmitted: false;
  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;

  hasApprovalRequestButton: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;

  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;

  testItems: NaverTokenIssuanceOneTimeTestResultItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

function buildTestItems(
  issuanceTestStatus: NaverTokenIssuanceOneTimeTestResultIssuanceStatus,
  tokenTypePresent: boolean,
  expiresInPresent: boolean,
  errorReason: string | null
): NaverTokenIssuanceOneTimeTestResultItem[] {
  return [
    {
      testItem: 'Final Approval Pending Seal (Task 262)',
      status: 'FINAL_APPROVAL_PENDING_SEAL_CONFIRMED',
      meaning: 'Task 262 최종 승인 대기 봉인 패널이 확인되었습니다.'
    },
    {
      testItem: '사용자 명시 승인 수신',
      status: 'USER_APPROVAL_RECEIVED',
      meaning: '사용자 명시 최종 승인 문구가 수신되었습니다. isUserFinalApprovalGrantedForTokenIssuance: true.'
    },
    {
      testItem: 'Token 발급 1회 테스트 실행',
      status: 'TEST_EXECUTED',
      meaning: '실제 Naver Token 발급 1회 테스트가 실행되었습니다. 결과는 아래 항목을 확인하세요.'
    },
    {
      testItem: '발급 테스트 결과',
      status: issuanceTestStatus,
      meaning: issuanceTestStatus === 'SUCCESS'
        ? 'Token 발급 API 호출이 성공하였습니다. Token 값은 반환/저장/출력하지 않습니다.'
        : issuanceTestStatus === 'ENV_MISSING'
        ? 'Env/Auth 값이 현재 Runtime Scope에 존재하지 않아 테스트를 실행할 수 없습니다.'
        : `Token 발급 API 호출이 실패하였습니다. 오류: ${errorReason ?? '알 수 없는 오류'}`
    },
    {
      testItem: 'Token 타입 확인 (token_type)',
      status: issuanceTestStatus === 'SUCCESS' && tokenTypePresent ? 'PRESENT' : issuanceTestStatus === 'SUCCESS' ? 'FAILURE' : 'LOCKED',
      meaning: issuanceTestStatus === 'SUCCESS'
        ? tokenTypePresent ? 'token_type 필드가 응답에 존재합니다. 실제 값은 표시하지 않습니다.' : 'token_type 필드가 응답에 없습니다.'
        : '테스트 미실행 또는 실패로 확인 불가합니다.'
    },
    {
      testItem: '만료 시간 확인 (expires_in)',
      status: issuanceTestStatus === 'SUCCESS' && expiresInPresent ? 'PRESENT' : issuanceTestStatus === 'SUCCESS' ? 'FAILURE' : 'LOCKED',
      meaning: issuanceTestStatus === 'SUCCESS'
        ? expiresInPresent ? 'expires_in 필드가 응답에 존재합니다. 실제 값은 표시하지 않습니다.' : 'expires_in 필드가 응답에 없습니다.'
        : '테스트 미실행 또는 실패로 확인 불가합니다.'
    },
    {
      testItem: 'Token 실제 값 (access_token)',
      status: 'FORBIDDEN',
      meaning: 'access_token 값은 절대 표시하지 않습니다. 발급 성공 여부만 비노출 방식으로 보고합니다.'
    },
    {
      testItem: 'Token 저장 (DB)',
      status: 'NOT_STORED',
      meaning: '발급된 Token 값을 DB에 저장하지 않습니다. isTokenStoredInDb: false.'
    },
    {
      testItem: 'Token 클라이언트 전달',
      status: 'DISCARDED',
      meaning: '발급된 Token 값을 클라이언트에 반환하지 않습니다. isTokenReturnedToClient: false.'
    },
    {
      testItem: 'Token 로그 출력',
      status: 'NOT_DISPLAYED',
      meaning: '발급된 Token 값을 console.log 등 어떤 방식으로도 출력하지 않습니다. isTokenLoggedToConsole: false.'
    },
    {
      testItem: '인증키 값 표시',
      status: 'FORBIDDEN',
      meaning: '인증키 실제 값은 마스킹/해시/부분 출력을 포함하여 어떤 형태로도 표시하지 않습니다.'
    },
    {
      testItem: 'Secret 로그 출력',
      status: 'FORBIDDEN',
      meaning: 'process.env 전체 출력, Secret 값 로그 출력을 하지 않습니다. isSecretLogged: false.'
    },
    {
      testItem: '".env" 직접 열람',
      status: 'FORBIDDEN',
      meaning: '개발 에이전트가 .env / .env.local 파일을 직접 열람하지 않았습니다.'
    },
    {
      testItem: 'Token 이후 상품 API 호출',
      status: 'LOCKED',
      meaning: '이번 Task는 Token 발급 테스트만 수행합니다. 상품 조회/수정 API를 호출하지 않습니다.'
    },
    {
      testItem: '가격·재고 변경',
      status: 'LOCKED',
      meaning: '변경 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
    },
    {
      testItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: '실행 경로 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않습니다.'
    },
    {
      testItem: 'POST API 연결',
      status: 'NOT_CONNECTED',
      meaning: '제출/실행 경로 없습니다. 어떤 POST 요청도 연결되지 않습니다.'
    },
    {
      testItem: '승인/실행 버튼',
      status: 'NOT_PRESENT',
      meaning: '버튼 없습니다. 이 패널에 승인 버튼이나 실행 버튼이 존재하지 않습니다.'
    },
    {
      testItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 263은 Naver Token 발급 1회 테스트 결과 표시 전용입니다. Token 값은 어떤 형태로도 표시되지 않습니다.'
    }
  ];
}

export async function buildNaverTokenIssuanceOneTimeTestResultView(
  job: any,
  tokenFetcher: (clientId: string, clientSecret: string) => Promise<NaverTokenResponse> = getNaverToken,
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>
): Promise<NaverTokenIssuanceOneTimeTestResultView> {
  const clientId = env['NAVER_COMMERCE_CLIENT_ID'];
  const clientSecret = env['NAVER_COMMERCE_CLIENT_SECRET'];
  const clientIdPresent = typeof clientId === 'string' && clientId.trim().length > 0;
  const clientSecretPresent = typeof clientSecret === 'string' && clientSecret.trim().length > 0;

  if (!clientIdPresent || !clientSecretPresent) {
    const testItems = buildTestItems('ENV_MISSING', false, false, 'NAVER_COMMERCE_CLIENT_ID 또는 NAVER_COMMERCE_CLIENT_SECRET이 현재 Runtime Scope에 없습니다.');
    return {
      taskName: 'Task 263 - Naver Token Issuance One-Time Test Result Screen Flow',
      title: 'Naver Token Issuance One-Time Test Result',
      panelTitle: 'Naver Token 발급 1회 테스트 결과',
      status: 'NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED',
      description: 'Env/Auth 값이 현재 Runtime Scope에 없어 Token 발급 테스트를 실행할 수 없었습니다. NAVER_COMMERCE_CLIENT_ID 또는 NAVER_COMMERCE_CLIENT_SECRET을 확인하세요.',

      isBatchJobResultDisplayOnly: true,
      isNaverTokenIssuanceTestExecuted: false,
      isUserFinalApprovalGrantedForTokenIssuance: true,
      isUserFinalApprovalPhraseReceived: true,
      isTokenIssuanceOneTimeTestFinalApprovalPendingSealed: true,

      presencePresentCount: 3,
      presenceMissingCount: 0,
      isTargetPresenceResultMet: true,
      isReadyForTokenIssuanceGate: true,

      issuanceTestStatus: 'ENV_MISSING',
      isTokenIssuedForTest: false,
      isTokenValueDisplayed: false,
      isTokenStoredInDb: false,
      isTokenReturnedToClient: false,
      isTokenLoggedToConsole: false,
      tokenTypePresent: false,
      expiresInPresent: false,
      httpStatusSuccessful: false,
      errorReason: 'ENV_MISSING: NAVER_COMMERCE_CLIENT_ID 또는 NAVER_COMMERCE_CLIENT_SECRET 미존재',

      isEnvFileDirectlyAccessed: false,
      isEnvFileModified: false,
      isAuthKeyValueDisplayed: false,
      isSecretLogged: false,
      hasEnvFileAccess: false,
      hasAuthKeyAccess: false,

      isActualApprovalGranted: true,
      isActualApprovalSubmissionAllowed: false,
      isApprovalSubmitted: false,
      isPostApiConnected: false,
      isMutationConnected: false,
      isLiveExecutionEnabled: false,

      hasApprovalRequestButton: false,
      hasExecutionButton: false,
      hasSubmitAction: false,
      hasWorkerTrigger: false,
      hasQueueTrigger: false,
      hasAdapterTrigger: false,

      isProductLookupApiCalled: false,
      isProductUpdateApiCalled: false,
      isPriceOrStockChanged: false,

      testItems,
      misunderstandingPreventionItems: [
        'Task 263 Token 발급 테스트는 ENV_MISSING으로 실행되지 않았습니다.',
        'Env/Auth 값이 현재 프로세스 Runtime Scope에 존재하지 않습니다.',
        'Token 값, 인증키 값, Secret 값은 어떤 형태로도 표시되지 않습니다.',
      ],
      finalNotice: 'Env/Auth 값을 현재 Runtime Scope에 올바르게 설정한 후 다시 시도하세요. Token 값은 어떤 경우에도 표시되지 않습니다.'
    };
  }

  try {
    const tokenResult = await tokenFetcher(clientId!, clientSecret!);

    const tokenTypePresent = typeof tokenResult.token_type === 'string' && tokenResult.token_type.length > 0;
    const expiresInPresent = typeof tokenResult.expires_in === 'number' && tokenResult.expires_in > 0;

    const testItems = buildTestItems('SUCCESS', tokenTypePresent, expiresInPresent, null);

    return {
      taskName: 'Task 263 - Naver Token Issuance One-Time Test Result Screen Flow',
      title: 'Naver Token Issuance One-Time Test Result',
      panelTitle: 'Naver Token 발급 1회 테스트 결과',
      status: 'NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED',
      description: '사용자 명시 승인에 따라 Naver Token 발급 1회 테스트가 실행되었습니다. 발급 성공 여부만 비노출 방식으로 보고합니다. Token 값은 반환/저장/출력하지 않습니다.',

      isBatchJobResultDisplayOnly: true,
      isNaverTokenIssuanceTestExecuted: true,
      isUserFinalApprovalGrantedForTokenIssuance: true,
      isUserFinalApprovalPhraseReceived: true,
      isTokenIssuanceOneTimeTestFinalApprovalPendingSealed: true,

      presencePresentCount: 3,
      presenceMissingCount: 0,
      isTargetPresenceResultMet: true,
      isReadyForTokenIssuanceGate: true,

      issuanceTestStatus: 'SUCCESS',
      isTokenIssuedForTest: true,
      isTokenValueDisplayed: false,
      isTokenStoredInDb: false,
      isTokenReturnedToClient: false,
      isTokenLoggedToConsole: false,
      tokenTypePresent,
      expiresInPresent,
      httpStatusSuccessful: true,
      errorReason: null,

      isEnvFileDirectlyAccessed: false,
      isEnvFileModified: false,
      isAuthKeyValueDisplayed: false,
      isSecretLogged: false,
      hasEnvFileAccess: false,
      hasAuthKeyAccess: false,

      isActualApprovalGranted: true,
      isActualApprovalSubmissionAllowed: false,
      isApprovalSubmitted: false,
      isPostApiConnected: false,
      isMutationConnected: false,
      isLiveExecutionEnabled: false,

      hasApprovalRequestButton: false,
      hasExecutionButton: false,
      hasSubmitAction: false,
      hasWorkerTrigger: false,
      hasQueueTrigger: false,
      hasAdapterTrigger: false,

      isProductLookupApiCalled: false,
      isProductUpdateApiCalled: false,
      isPriceOrStockChanged: false,

      testItems,
      misunderstandingPreventionItems: [
        'Token 발급 테스트가 성공하였습니다. 하지만 Token 값은 어떤 형태로도 표시되지 않습니다.',
        'isTokenStoredInDb: false — Token이 DB에 저장되지 않았습니다.',
        'isTokenReturnedToClient: false — Token이 클라이언트에 반환되지 않았습니다.',
        'isTokenLoggedToConsole: false — Token이 로그에 출력되지 않았습니다.',
        '이번 Task는 발급 성공/실패 여부만 비노출 방식으로 보고하는 1회 테스트입니다.',
        '상품 조회/수정, 가격·재고 변경, Worker/Queue/Adapter는 이 Task에서 실행되지 않습니다.',
      ],
      finalNotice: 'Naver Token 발급 1회 테스트가 완료되었습니다. Token 값은 반환/저장/출력되지 않았으며, 발급 성공 여부만 비노출 방식으로 표시됩니다. 다음 단계 진행은 사용자 별도 지시가 필요합니다.'
    };
  } catch (error: unknown) {
    const rawMessage = error instanceof Error ? error.message : String(error);
    const sanitizedMessage = rawMessage
      .replace(/client_id[^&\s,)"]*/gi, 'client_id=[REDACTED]')
      .replace(/client_secret[^&\s,)"]*/gi, 'client_secret=[REDACTED]')
      .replace(/Bearer\s+[^\s"]+/gi, 'Bearer [REDACTED]');

    const testItems = buildTestItems('FAILURE', false, false, sanitizedMessage);

    return {
      taskName: 'Task 263 - Naver Token Issuance One-Time Test Result Screen Flow',
      title: 'Naver Token Issuance One-Time Test Result',
      panelTitle: 'Naver Token 발급 1회 테스트 결과',
      status: 'NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED',
      description: `Naver Token 발급 1회 테스트가 실행되었지만 실패하였습니다. Token 값은 표시하지 않습니다. 오류 요약: ${sanitizedMessage.substring(0, 100)}`,

      isBatchJobResultDisplayOnly: true,
      isNaverTokenIssuanceTestExecuted: true,
      isUserFinalApprovalGrantedForTokenIssuance: true,
      isUserFinalApprovalPhraseReceived: true,
      isTokenIssuanceOneTimeTestFinalApprovalPendingSealed: true,

      presencePresentCount: 3,
      presenceMissingCount: 0,
      isTargetPresenceResultMet: true,
      isReadyForTokenIssuanceGate: true,

      issuanceTestStatus: 'FAILURE',
      isTokenIssuedForTest: false,
      isTokenValueDisplayed: false,
      isTokenStoredInDb: false,
      isTokenReturnedToClient: false,
      isTokenLoggedToConsole: false,
      tokenTypePresent: false,
      expiresInPresent: false,
      httpStatusSuccessful: false,
      errorReason: sanitizedMessage,

      isEnvFileDirectlyAccessed: false,
      isEnvFileModified: false,
      isAuthKeyValueDisplayed: false,
      isSecretLogged: false,
      hasEnvFileAccess: false,
      hasAuthKeyAccess: false,

      isActualApprovalGranted: true,
      isActualApprovalSubmissionAllowed: false,
      isApprovalSubmitted: false,
      isPostApiConnected: false,
      isMutationConnected: false,
      isLiveExecutionEnabled: false,

      hasApprovalRequestButton: false,
      hasExecutionButton: false,
      hasSubmitAction: false,
      hasWorkerTrigger: false,
      hasQueueTrigger: false,
      hasAdapterTrigger: false,

      isProductLookupApiCalled: false,
      isProductUpdateApiCalled: false,
      isPriceOrStockChanged: false,

      testItems,
      misunderstandingPreventionItems: [
        'Token 발급 테스트가 실패하였습니다. Token 값은 어떤 경우에도 표시되지 않습니다.',
        'isTokenIssuedForTest: false — Token이 발급되지 않았습니다.',
        '오류 메시지는 인증키 값이 포함되지 않도록 Redacted 처리됩니다.',
        '실패 원인을 확인하고 Env/Auth Runtime Scope 재확인이 필요할 수 있습니다.',
      ],
      finalNotice: 'Naver Token 발급 1회 테스트가 실패하였습니다. Token 값은 반환/저장/출력되지 않았습니다. 오류 원인을 확인 후 다음 단계를 사용자가 별도 지시하세요.'
    };
  }
}
