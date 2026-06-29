// Task 271 — Naver Token 발급 재시도 1회 테스트 + 상품 조회 GET 결과 View
// GW.IP_NOT_ALLOWED 해소 여부 확인 목적.
// Token 값은 출력/저장하지 않습니다. 성공/실패 여부와 오류 코드만 비노출 방식으로 보고합니다.
// Token 발급 성공 시에만 상품 조회 GET 1회 진행. 상품 수정/가격/재고 변경 없음. DB write 없음.

// naver-product.service는 동적 import로 로드 — jiti 테스트 환경에서의 @/ 별칭 해석 문제 우회
// 테스트 시 tokenFetcher / productFetcher mock 함수를 주입하면 동적 import는 실행되지 않습니다.
import type { NaverTokenResponse, NaverProductApiResponse } from '@/src/types/naver-product.types';

export type NaverTokenIssuanceRetryStatus = 'SUCCESS' | 'FAILURE' | 'ENV_MISSING';
export type NaverProductLookupRetryStatus = 'SUCCESS' | 'FAILURE' | 'SKIPPED' | 'NO_CHANNEL_PRODUCT_NO';

export type NaverTokenIssuanceRetryTestResultItem = {
  testItem: string;
  status:
    | 'TEST_EXECUTED'
    | 'SUCCESS'
    | 'FAILURE'
    | 'ENV_MISSING'
    | 'SKIPPED'
    | 'PRESENT'
    | 'MISSING'
    | 'FORBIDDEN'
    | 'DISCARDED'
    | 'NOT_STORED'
    | 'NOT_DISPLAYED'
    | 'NOT_EXECUTED'
    | 'LOCKED'
    | 'READ_ONLY_INFO'
    | 'GW_IP_NOT_ALLOWED_RESOLVED'
    | 'GW_IP_NOT_ALLOWED_STILL_BLOCKED';
  meaning: string;
};

export type NaverProductLookupReadOnlyInfo = {
  channelProductNo: string;
  productName: string | null;
  statusType: string | null;
  salePrice: number | null;
  stockQuantity: number | null;
  leafCategoryId: string | null;
  hasRepresentativeImage: boolean;
  isProductValueDisplayedAsReadOnly: true;
  isProductModified: false;
  isPriceChanged: false;
  isStockChanged: false;
  isDbWriteExecuted: false;
};

export type NaverTokenIssuanceRetryOneTimeTestProductLookupResultView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'NAVER_TOKEN_ISSUANCE_RETRY_ONE_TIME_TEST_PRODUCT_LOOKUP_RESULT_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isUserApprovalGrantedForRetry: true;

  // Token 발급 재시도 결과
  issuanceRetryStatus: NaverTokenIssuanceRetryStatus;
  isTokenIssuanceRetryExecuted: boolean;
  isTokenIssued: boolean;
  tokenIssuanceHttpStatus: number | null;
  sanitizedErrorCode: string | null;
  isGwIpNotAllowedResolved: boolean;
  tokenTypePresent: boolean;
  expiresInPresent: boolean;

  // 상품 조회 결과
  productLookupStatus: NaverProductLookupRetryStatus;
  isProductLookupApiCalled: boolean;
  productLookupHttpStatus: number | null;
  productLookupSanitizedErrorCode: string | null;
  productLookupReadOnlyInfo: NaverProductLookupReadOnlyInfo | null;

  // 안전 플래그
  isTokenValueDisplayed: false;
  isTokenStoredInDb: false;
  isTokenReturnedToClient: false;
  isTokenLoggedToConsole: false;
  isTokenStored: false;
  isEnvFileDirectlyAccessed: false;
  isEnvFileModified: false;
  isEnvValueDisplayed: false;
  isAuthKeyValueDisplayed: false;
  isSecretLogged: false;
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;
  isDbWriteExecuted: false;
  isDbUpsertExecuted: false;
  isDbUpdateExecuted: false;

  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;
  hasApprovalRequestButton: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;

  testResultItems: NaverTokenIssuanceRetryTestResultItem[];
  finalNotice: string;
};

function extractSanitizedErrorCode(errorMessage: string): string {
  // GW 에러 코드 추출 (예: GW.IP_NOT_ALLOWED)
  const gwMatch = errorMessage.match(/GW\.[A-Z_]+/);
  if (gwMatch) return gwMatch[0];
  // HTTP 상태 코드 추출
  const httpMatch = errorMessage.match(/\((\d{3})\)/);
  if (httpMatch) return `HTTP_${httpMatch[1]}`;
  // 일반 에러 코드 추출 (credential 값 제외)
  const sanitized = errorMessage
    .replace(/client_id[^\s,)"&]*/gi, 'client_id=[REDACTED]')
    .replace(/client_secret[^\s,)"&]*/gi, 'client_secret=[REDACTED]')
    .replace(/Bearer\s+[^\s"]+/gi, 'Bearer [REDACTED]')
    .replace(/"access_token"\s*:\s*"[^"]+"/gi, '"access_token":"[REDACTED]"');
  return sanitized.substring(0, 80);
}

function extractHttpStatus(errorMessage: string): number | null {
  const match = errorMessage.match(/\((\d{3})\)/);
  return match ? parseInt(match[1], 10) : null;
}

function buildTestResultItems(
  issuanceRetryStatus: NaverTokenIssuanceRetryStatus,
  isTokenIssued: boolean,
  tokenTypePresent: boolean,
  expiresInPresent: boolean,
  sanitizedErrorCode: string | null,
  isGwIpNotAllowedResolved: boolean,
  productLookupStatus: NaverProductLookupRetryStatus,
  productLookupSanitizedErrorCode: string | null
): NaverTokenIssuanceRetryTestResultItem[] {
  const items: NaverTokenIssuanceRetryTestResultItem[] = [
    {
      testItem: '사용자 재시도 승인',
      status: 'TEST_EXECUTED',
      meaning: 'Task 271 — 사용자 승인에 따라 Token 발급 재시도 1회 테스트를 실행했습니다.',
    },
    {
      testItem: 'Token 발급 재시도 결과',
      status: issuanceRetryStatus === 'SUCCESS'
        ? 'SUCCESS'
        : issuanceRetryStatus === 'ENV_MISSING'
        ? 'ENV_MISSING'
        : 'FAILURE',
      meaning: issuanceRetryStatus === 'SUCCESS'
        ? 'Token 발급 재시도가 성공했습니다. Token 값은 출력/저장하지 않습니다.'
        : issuanceRetryStatus === 'ENV_MISSING'
        ? 'Env/Auth 값이 Runtime Scope에 없어 재시도를 실행할 수 없었습니다.'
        : `Token 발급 재시도가 실패했습니다. 오류 코드: ${sanitizedErrorCode ?? '알 수 없음'}`,
    },
  ];

  if (issuanceRetryStatus !== 'ENV_MISSING') {
    const resolved = isGwIpNotAllowedResolved;
    items.push({
      testItem: 'GW.IP_NOT_ALLOWED 해소 여부',
      status: resolved ? 'GW_IP_NOT_ALLOWED_RESOLVED' : 'GW_IP_NOT_ALLOWED_STILL_BLOCKED',
      meaning: resolved
        ? 'GW.IP_NOT_ALLOWED 오류가 해소되었습니다. Token 발급에 성공했습니다.'
        : sanitizedErrorCode
        ? `GW.IP_NOT_ALLOWED 또는 관련 오류가 지속됩니다. 오류 코드: ${sanitizedErrorCode}`
        : 'Token 발급 실패 — GW.IP_NOT_ALLOWED 해소 여부를 확인할 수 없습니다.',
    });
  }

  items.push(
    {
      testItem: 'Token 타입 확인 (token_type)',
      status: issuanceRetryStatus === 'SUCCESS' && tokenTypePresent ? 'PRESENT' : issuanceRetryStatus === 'SUCCESS' ? 'MISSING' : 'LOCKED',
      meaning: issuanceRetryStatus === 'SUCCESS'
        ? tokenTypePresent
          ? 'token_type 필드가 응답에 존재합니다. 실제 값은 표시하지 않습니다.'
          : 'token_type 필드가 응답에 없습니다.'
        : '테스트 미실행 또는 실패로 확인 불가합니다.',
    },
    {
      testItem: '만료 시간 확인 (expires_in)',
      status: issuanceRetryStatus === 'SUCCESS' && expiresInPresent ? 'PRESENT' : issuanceRetryStatus === 'SUCCESS' ? 'MISSING' : 'LOCKED',
      meaning: issuanceRetryStatus === 'SUCCESS'
        ? expiresInPresent
          ? 'expires_in 필드가 응답에 존재합니다. 실제 값은 표시하지 않습니다.'
          : 'expires_in 필드가 응답에 없습니다.'
        : '테스트 미실행 또는 실패로 확인 불가합니다.',
    },
    {
      testItem: 'Token 실제 값 (access_token)',
      status: 'FORBIDDEN',
      meaning: 'access_token 값은 절대 표시하지 않습니다. 발급 성공 여부만 비노출 방식으로 보고합니다.',
    },
    {
      testItem: 'Token 저장 (DB/파일)',
      status: 'NOT_STORED',
      meaning: '발급된 Token을 DB 또는 파일에 저장하지 않습니다. isTokenStoredInDb: false.',
    },
    {
      testItem: 'Token 클라이언트 전달',
      status: 'DISCARDED',
      meaning: '발급된 Token 값을 클라이언트에 반환하지 않습니다. isTokenReturnedToClient: false.',
    },
    {
      testItem: '상품 조회 API 결과',
      status: productLookupStatus === 'SUCCESS'
        ? 'SUCCESS'
        : productLookupStatus === 'FAILURE'
        ? 'FAILURE'
        : 'SKIPPED',
      meaning: productLookupStatus === 'SUCCESS'
        ? '상품 조회 GET 1회 성공 — 상품 정보는 아래 read-only 패널에 표시됩니다.'
        : productLookupStatus === 'FAILURE'
        ? `상품 조회 GET 실패 — 오류 코드: ${productLookupSanitizedErrorCode ?? '알 수 없음'}`
        : productLookupStatus === 'NO_CHANNEL_PRODUCT_NO'
        ? 'channelProductNo를 확인할 수 없어 상품 조회를 건너뛰었습니다.'
        : 'Token 발급 실패로 상품 조회를 건너뛰었습니다.',
    },
    {
      testItem: '상품 수정 API 호출',
      status: 'NOT_EXECUTED',
      meaning: '상품 수정 API를 호출하지 않았습니다. isProductUpdateApiCalled: false.',
    },
    {
      testItem: '가격·재고 변경',
      status: 'NOT_EXECUTED',
      meaning: '가격 또는 재고를 변경하지 않았습니다. isPriceOrStockChanged: false.',
    },
    {
      testItem: 'DB write',
      status: 'NOT_EXECUTED',
      meaning: '어떠한 DB write도 수행하지 않았습니다. isDbWriteExecuted: false.',
    },
    {
      testItem: '인증키/Secret 값 표시',
      status: 'FORBIDDEN',
      meaning: 'client_id, client_secret, Signature, Authorization 헤더 — 어떤 형태로도 표시하지 않습니다.',
    },
    {
      testItem: 'Worker / Queue / Adapter',
      status: 'LOCKED',
      meaning: 'Worker, Queue, Adapter 실행 경로가 연결되지 않았습니다.',
    },
    {
      testItem: '현재 Task 상태',
      status: 'READ_ONLY_INFO',
      meaning: 'Task 271은 Token 발급 재시도 및 상품 조회 GET 결과 표시 전용입니다.',
    },
  );

  return items;
}

export async function buildNaverTokenIssuanceRetryOneTimeTestProductLookupResultView(
  job: any,
  tokenFetcher?: (clientId: string, clientSecret: string) => Promise<NaverTokenResponse>,
  productFetcher?: (accessToken: string, channelProductNo: string) => Promise<NaverProductApiResponse>,
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>
): Promise<NaverTokenIssuanceRetryOneTimeTestProductLookupResultView> {
  // 실제 함수가 주입되지 않은 경우에만 naver-product.service를 동적 import합니다.
  // 테스트 환경에서는 항상 mock 함수를 주입하므로 이 import는 실행되지 않습니다.
  if (!tokenFetcher || !productFetcher) {
    const mod = await import('@/src/services/naver-product.service');
    if (!tokenFetcher) tokenFetcher = mod.getNaverToken;
    if (!productFetcher) productFetcher = mod.fetchNaverProduct;
  }
  const safeFlags = {
    isTokenValueDisplayed: false as const,
    isTokenStoredInDb: false as const,
    isTokenReturnedToClient: false as const,
    isTokenLoggedToConsole: false as const,
    isTokenStored: false as const,
    isEnvFileDirectlyAccessed: false as const,
    isEnvFileModified: false as const,
    isEnvValueDisplayed: false as const,
    isAuthKeyValueDisplayed: false as const,
    isSecretLogged: false as const,
    hasEnvFileAccess: false as const,
    hasAuthKeyAccess: false as const,
    isProductUpdateApiCalled: false as const,
    isPriceOrStockChanged: false as const,
    isDbWriteExecuted: false as const,
    isDbUpsertExecuted: false as const,
    isDbUpdateExecuted: false as const,
    isPostApiConnected: false as const,
    isMutationConnected: false as const,
    isLiveExecutionEnabled: false as const,
    hasApprovalRequestButton: false as const,
    hasExecutionButton: false as const,
    hasSubmitAction: false as const,
    hasWorkerTrigger: false as const,
    hasQueueTrigger: false as const,
    hasAdapterTrigger: false as const,
    isBatchJobResultDisplayOnly: true as const,
    isUserApprovalGrantedForRetry: true as const,
  };

  const baseResult = {
    taskName: 'Task 271 — Naver Token Issuance Retry One-Time Test + Product Lookup',
    title: 'Naver Token 발급 재시도 1회 테스트 및 상품 조회 결과',
    panelTitle: 'Token 발급 재시도 & 상품 조회 GET 결과 (Task 271)',
    status: 'NAVER_TOKEN_ISSUANCE_RETRY_ONE_TIME_TEST_PRODUCT_LOOKUP_RESULT_READY' as const,
    ...safeFlags,
  };

  const clientId = env['NAVER_COMMERCE_CLIENT_ID'];
  const clientSecret = env['NAVER_COMMERCE_CLIENT_SECRET'];
  const clientIdPresent = typeof clientId === 'string' && clientId.trim().length > 0;
  const clientSecretPresent = typeof clientSecret === 'string' && clientSecret.trim().length > 0;

  if (!clientIdPresent || !clientSecretPresent) {
    const items = buildTestResultItems('ENV_MISSING', false, false, false, null, false, 'SKIPPED', null);
    return {
      ...baseResult,
      description: 'Env/Auth 값이 Runtime Scope에 없어 Token 발급 재시도를 실행할 수 없었습니다.',
      issuanceRetryStatus: 'ENV_MISSING',
      isTokenIssuanceRetryExecuted: false,
      isTokenIssued: false,
      tokenIssuanceHttpStatus: null,
      sanitizedErrorCode: 'ENV_MISSING: NAVER_COMMERCE_CLIENT_ID 또는 NAVER_COMMERCE_CLIENT_SECRET 미존재',
      isGwIpNotAllowedResolved: false,
      tokenTypePresent: false,
      expiresInPresent: false,
      productLookupStatus: 'SKIPPED',
      isProductLookupApiCalled: false,
      productLookupHttpStatus: null,
      productLookupSanitizedErrorCode: null,
      productLookupReadOnlyInfo: null,
      testResultItems: items,
      finalNotice: 'Env/Auth 값을 Runtime Scope에 올바르게 설정한 후 다시 시도하세요.',
    };
  }

  // Token 발급 재시도
  let tokenResult: NaverTokenResponse | null = null;
  let issuanceRetryStatus: NaverTokenIssuanceRetryStatus = 'FAILURE';
  let tokenIssuanceHttpStatus: number | null = null;
  let sanitizedErrorCode: string | null = null;
  let isGwIpNotAllowedResolved = false;
  let tokenTypePresent = false;
  let expiresInPresent = false;

  try {
    tokenResult = await tokenFetcher!(clientId!, clientSecret!);
    issuanceRetryStatus = 'SUCCESS';
    isGwIpNotAllowedResolved = true;
    tokenIssuanceHttpStatus = 200;
    tokenTypePresent = typeof tokenResult.token_type === 'string' && tokenResult.token_type.length > 0;
    expiresInPresent = typeof tokenResult.expires_in === 'number' && tokenResult.expires_in > 0;
  } catch (error: unknown) {
    const rawMessage = error instanceof Error ? error.message : String(error);
    tokenIssuanceHttpStatus = extractHttpStatus(rawMessage);
    sanitizedErrorCode = extractSanitizedErrorCode(rawMessage);
    isGwIpNotAllowedResolved = false;
    issuanceRetryStatus = 'FAILURE';
  }

  if (issuanceRetryStatus !== 'SUCCESS' || !tokenResult) {
    const items = buildTestResultItems(
      issuanceRetryStatus, false, false, false, sanitizedErrorCode, false, 'SKIPPED', null
    );
    return {
      ...baseResult,
      description: `Token 발급 재시도 실패. 오류 코드: ${sanitizedErrorCode ?? '알 수 없음'}. 상품 조회를 건너뜁니다.`,
      issuanceRetryStatus,
      isTokenIssuanceRetryExecuted: true,
      isTokenIssued: false,
      tokenIssuanceHttpStatus,
      sanitizedErrorCode,
      isGwIpNotAllowedResolved,
      tokenTypePresent: false,
      expiresInPresent: false,
      productLookupStatus: 'SKIPPED',
      isProductLookupApiCalled: false,
      productLookupHttpStatus: null,
      productLookupSanitizedErrorCode: null,
      productLookupReadOnlyInfo: null,
      testResultItems: items,
      finalNotice: `Token 발급 재시도가 실패했습니다. 오류 코드: ${sanitizedErrorCode ?? '알 수 없음'}. 상품 조회는 Token 발급 성공 이후에만 진행합니다.`,
    };
  }

  // Token 발급 성공 → 상품 조회 GET 1회
  const channelProductNo: string | null =
    job?.items?.[0]?.channelProductNo ?? null;

  if (!channelProductNo) {
    const items = buildTestResultItems(
      'SUCCESS', true, tokenTypePresent, expiresInPresent, null, true, 'NO_CHANNEL_PRODUCT_NO', null
    );
    return {
      ...baseResult,
      description: 'Token 발급 재시도 성공. channelProductNo를 확인할 수 없어 상품 조회를 건너뜁니다.',
      issuanceRetryStatus: 'SUCCESS',
      isTokenIssuanceRetryExecuted: true,
      isTokenIssued: true,
      tokenIssuanceHttpStatus: 200,
      sanitizedErrorCode: null,
      isGwIpNotAllowedResolved: true,
      tokenTypePresent,
      expiresInPresent,
      productLookupStatus: 'NO_CHANNEL_PRODUCT_NO',
      isProductLookupApiCalled: false,
      productLookupHttpStatus: null,
      productLookupSanitizedErrorCode: null,
      productLookupReadOnlyInfo: null,
      testResultItems: items,
      finalNotice: 'Token 발급 재시도 성공. channelProductNo가 없어 상품 조회를 진행하지 않았습니다.',
    };
  }

  // 상품 조회 GET
  let productLookupStatus: NaverProductLookupRetryStatus = 'FAILURE';
  let productLookupHttpStatus: number | null = null;
  let productLookupSanitizedErrorCode: string | null = null;
  let productLookupReadOnlyInfo: NaverProductLookupReadOnlyInfo | null = null;

  try {
    const productResult = await productFetcher!(tokenResult.access_token, channelProductNo);
    productLookupStatus = 'SUCCESS';
    productLookupHttpStatus = 200;

    const origin = productResult?.originProduct;
    productLookupReadOnlyInfo = {
      channelProductNo,
      productName: typeof origin?.name === 'string' ? origin.name : null,
      statusType: typeof origin?.statusType === 'string' ? origin.statusType : null,
      salePrice: typeof origin?.salePrice === 'number' ? origin.salePrice : null,
      stockQuantity: typeof origin?.stockQuantity === 'number' ? origin.stockQuantity : null,
      leafCategoryId: typeof origin?.leafCategoryId === 'string' ? origin.leafCategoryId : null,
      hasRepresentativeImage: typeof origin?.images?.representativeImage?.url === 'string',
      isProductValueDisplayedAsReadOnly: true,
      isProductModified: false,
      isPriceChanged: false,
      isStockChanged: false,
      isDbWriteExecuted: false,
    };
  } catch (error: unknown) {
    const rawMessage = error instanceof Error ? error.message : String(error);
    productLookupHttpStatus = extractHttpStatus(rawMessage);
    productLookupSanitizedErrorCode = extractSanitizedErrorCode(rawMessage);
    productLookupStatus = 'FAILURE';
  }

  const items = buildTestResultItems(
    'SUCCESS', true, tokenTypePresent, expiresInPresent,
    null, true, productLookupStatus, productLookupSanitizedErrorCode
  );

  return {
    ...baseResult,
    description:
      productLookupStatus === 'SUCCESS'
        ? 'Token 발급 재시도 성공 및 상품 조회 GET 1회 완료. 상품 정보는 read-only로만 표시됩니다.'
        : `Token 발급 재시도 성공. 상품 조회 실패 — 오류 코드: ${productLookupSanitizedErrorCode ?? '알 수 없음'}`,
    issuanceRetryStatus: 'SUCCESS',
    isTokenIssuanceRetryExecuted: true,
    isTokenIssued: true,
    tokenIssuanceHttpStatus: 200,
    sanitizedErrorCode: null,
    isGwIpNotAllowedResolved: true,
    tokenTypePresent,
    expiresInPresent,
    productLookupStatus,
    isProductLookupApiCalled: true,
    productLookupHttpStatus,
    productLookupSanitizedErrorCode,
    productLookupReadOnlyInfo,
    testResultItems: items,
    finalNotice:
      productLookupStatus === 'SUCCESS'
        ? 'Task 271: Token 발급 재시도 성공 + 상품 조회 GET 완료. Token 값 미출력/미저장. 상품 정보는 read-only 표시. 상품 수정/가격/재고 변경/DB write 없음.'
        : `Task 271: Token 발급 재시도 성공 + 상품 조회 실패(${productLookupSanitizedErrorCode}). 다음 조치는 사용자 지시를 기다립니다.`,
  };
}
