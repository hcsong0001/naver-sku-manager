import bcrypt from 'bcryptjs';
import { getNaverApiBaseUrl } from './naver-product.service';

export const TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_REQUIRED_APPROVAL_PHRASE =
  'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.';
export const TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_FIXED_TARGET_PRODUCT_NO = '6597910207';

export interface TmsNaverProductLookupOneTimeLiveCallInput {
  targetProductNo: string;
  maxLookupCallCount: number;
  explicitApprovalPhrase: string;
}

export interface TmsNaverProductLookupOneTimeLiveCallMaskedSummary {
  liveCallAttempted: boolean;
  actualLookupCallCount: number;
  targetProductNo: string;
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  success: boolean;
  httpStatusCode: number | null;
  productNoMatched: boolean | null;
  responseShapeKeys: string[];
  rawResponseStored: false;
  rawResponseDisplayed: false;
  secretExposed: false;
  tokenExposed: false;
  authorizationHeaderExposed: false;
  productUpdateCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritten: false;
  sanitizedErrorMessage: string | null;
}

interface TokenCallResult {
  ok: boolean;
  httpStatusCode: number | null;
  accessToken: string | null;
  errorCategory: string | null;
}

interface ProductLookupCallResult {
  ok: boolean;
  httpStatusCode: number | null;
  responseShapeKeys: string[];
  productNoMatched: boolean | null;
  errorCategory: string | null;
}

export interface TmsNaverProductLookupOneTimeLiveCallDependencies {
  issueToken?: (clientId: string, clientSecret: string) => Promise<TokenCallResult>;
  lookupProduct?: (accessToken: string, channelProductNo: string) => Promise<ProductLookupCallResult>;
  getClientCredentials?: () => { clientId: string | undefined; clientSecret: string | undefined };
}

async function defaultIssueToken(clientId: string, clientSecret: string): Promise<TokenCallResult> {
  try {
    const timestamp = Date.now();
    const password = `${clientId}_${timestamp}`;
    const hashed = bcrypt.hashSync(password, clientSecret);
    const signature = Buffer.from(hashed, 'utf-8').toString('base64');

    const body = new URLSearchParams({
      client_id: clientId,
      timestamp: timestamp.toString(),
      client_secret_sign: signature,
      grant_type: 'client_credentials',
      type: 'SELF',
    });

    const res = await fetch(`${getNaverApiBaseUrl()}/external/v1/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!res.ok) {
      return { ok: false, httpStatusCode: res.status, accessToken: null, errorCategory: 'TOKEN_REQUEST_FAILED' };
    }

    const json = (await res.json()) as { access_token?: string };
    if (!json.access_token) {
      return {
        ok: false,
        httpStatusCode: res.status,
        accessToken: null,
        errorCategory: 'TOKEN_RESPONSE_MISSING_ACCESS_TOKEN',
      };
    }

    return { ok: true, httpStatusCode: res.status, accessToken: json.access_token, errorCategory: null };
  } catch {
    return { ok: false, httpStatusCode: null, accessToken: null, errorCategory: 'TOKEN_REQUEST_EXCEPTION' };
  }
}

async function defaultLookupProduct(
  accessToken: string,
  channelProductNo: string
): Promise<ProductLookupCallResult> {
  try {
    const res = await fetch(
      `${getNaverApiBaseUrl()}/external/v2/products/channel-products/${channelProductNo}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      return {
        ok: false,
        httpStatusCode: res.status,
        responseShapeKeys: [],
        productNoMatched: null,
        errorCategory: 'PRODUCT_LOOKUP_FAILED',
      };
    }

    const json = (await res.json()) as Record<string, unknown>;
    const responseShapeKeys = Object.keys(json);
    const smartstoreChannelProduct = json.smartstoreChannelProduct as
      | { channelProductNo?: number }
      | undefined;
    const productNoMatched =
      smartstoreChannelProduct?.channelProductNo != null
        ? String(smartstoreChannelProduct.channelProductNo) === channelProductNo
        : null;

    return { ok: true, httpStatusCode: res.status, responseShapeKeys, productNoMatched, errorCategory: null };
  } catch {
    return {
      ok: false,
      httpStatusCode: null,
      responseShapeKeys: [],
      productNoMatched: null,
      errorCategory: 'PRODUCT_LOOKUP_EXCEPTION',
    };
  }
}

function defaultGetClientCredentials(): { clientId: string | undefined; clientSecret: string | undefined } {
  return {
    clientId: process.env.GONGGU_CLIENT_ID,
    clientSecret: process.env.GONGGU_CLIENT_SECRET,
  };
}

function blockedSummary(
  targetProductNo: string,
  sanitizedErrorMessage: string
): TmsNaverProductLookupOneTimeLiveCallMaskedSummary {
  return {
    liveCallAttempted: false,
    actualLookupCallCount: 0,
    targetProductNo,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    success: false,
    httpStatusCode: null,
    productNoMatched: null,
    responseShapeKeys: [],
    rawResponseStored: false,
    rawResponseDisplayed: false,
    secretExposed: false,
    tokenExposed: false,
    authorizationHeaderExposed: false,
    productUpdateCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritten: false,
    sanitizedErrorMessage,
  };
}

export async function runTmsNaverProductLookupOneTimeLiveCall(
  input: TmsNaverProductLookupOneTimeLiveCallInput,
  dependencies: TmsNaverProductLookupOneTimeLiveCallDependencies = {}
): Promise<TmsNaverProductLookupOneTimeLiveCallMaskedSummary> {
  const issueToken = dependencies.issueToken ?? defaultIssueToken;
  const lookupProduct = dependencies.lookupProduct ?? defaultLookupProduct;
  const getClientCredentials = dependencies.getClientCredentials ?? defaultGetClientCredentials;

  if (input.explicitApprovalPhrase !== TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_REQUIRED_APPROVAL_PHRASE) {
    return blockedSummary(input.targetProductNo, 'APPROVAL_PHRASE_MISMATCH');
  }
  if (input.targetProductNo !== TMS_NAVER_PRODUCT_LOOKUP_ONE_TIME_FIXED_TARGET_PRODUCT_NO) {
    return blockedSummary(input.targetProductNo, 'TARGET_PRODUCT_NO_MISMATCH');
  }
  if (input.maxLookupCallCount !== 1) {
    return blockedSummary(input.targetProductNo, 'MAX_LOOKUP_CALL_COUNT_EXCEEDS_LIMIT');
  }

  const { clientId, clientSecret } = getClientCredentials();
  if (!clientId || !clientSecret) {
    return blockedSummary(input.targetProductNo, 'MISSING_CLIENT_CREDENTIALS');
  }

  const tokenResult = await issueToken(clientId, clientSecret);
  if (!tokenResult.ok || !tokenResult.accessToken) {
    return {
      liveCallAttempted: true,
      actualLookupCallCount: 0,
      targetProductNo: input.targetProductNo,
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      success: false,
      httpStatusCode: tokenResult.httpStatusCode,
      productNoMatched: null,
      responseShapeKeys: [],
      rawResponseStored: false,
      rawResponseDisplayed: false,
      secretExposed: false,
      tokenExposed: false,
      authorizationHeaderExposed: false,
      productUpdateCalled: false,
      priceChanged: false,
      stockChanged: false,
      dbWritten: false,
      sanitizedErrorMessage: tokenResult.errorCategory ?? 'TOKEN_ISSUANCE_FAILED',
    };
  }

  const lookupResult = await lookupProduct(tokenResult.accessToken, input.targetProductNo);

  return {
    liveCallAttempted: true,
    actualLookupCallCount: 1,
    targetProductNo: input.targetProductNo,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    success: lookupResult.ok,
    httpStatusCode: lookupResult.httpStatusCode,
    productNoMatched: lookupResult.productNoMatched,
    responseShapeKeys: lookupResult.responseShapeKeys,
    rawResponseStored: false,
    rawResponseDisplayed: false,
    secretExposed: false,
    tokenExposed: false,
    authorizationHeaderExposed: false,
    productUpdateCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritten: false,
    sanitizedErrorMessage: lookupResult.ok ? null : lookupResult.errorCategory ?? 'PRODUCT_LOOKUP_FAILED',
  };
}
