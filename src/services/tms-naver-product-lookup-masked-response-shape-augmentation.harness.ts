import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pathToFileURL } from 'node:url';

export const TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 조회 마스킹 응답 shape 보강 수집을 별도로 승인합니다.';
export const TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_PRODUCT_NO =
  '6597910207';
export const TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_API =
  'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
export const TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_CANDIDATE_PATHS = [
  'smartstoreChannelProduct.channelProductNo',
  'smartstoreChannelProduct.id',
  'smartstoreChannelProduct.productNo',
  'smartstoreChannelProduct.originProductNo',
  'originProduct.originProductNo',
  'originProduct.id',
  'originProduct.productNo',
] as const;

const NAVER_API_BASE_URL = 'https://api.commerce.naver.com';

export type TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePath =
  (typeof TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_CANDIDATE_PATHS)[number];

export type TmsNaverProductLookupMaskedResponseShapeAugmentationValueType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | 'undefined';

export interface TmsNaverProductLookupMaskedResponseShapeAugmentationInput {
  targetProductNo: string;
  maxRecallCount: number;
  explicitApprovalPhrase: string;
}

export interface TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult {
  candidatePath: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePath;
  exists: boolean;
  valueType: TmsNaverProductLookupMaskedResponseShapeAugmentationValueType;
  maskedPreviewLast4: string | null;
  equalsTargetProductNo: boolean | null;
  rawValueDisplayed: false;
  rawValueStored: false;
  rawResponseAccessedForDisplay: false;
}

export interface TmsNaverProductLookupMaskedResponseShapeAugmentationSummary {
  augmentationAttempted: boolean;
  actualRecallCount: number;
  targetProductNo: string;
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  success: boolean;
  httpStatusCode: number | null;
  responseShapeKeys: string[];
  candidatePathResults: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult[];
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
  productIdentityMatchReason: string;
  rawResponseStored: false;
  rawResponseDisplayed: false;
  secretExposed: false;
  tokenExposed: false;
  authorizationHeaderExposed: false;
  signatureExposed: false;
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
  responseBody: Record<string, unknown> | null;
  errorCategory: string | null;
}

export interface TmsNaverProductLookupMaskedResponseShapeAugmentationDependencies {
  issueToken?: (clientId: string, clientSecret: string) => Promise<TokenCallResult>;
  lookupProduct?: (accessToken: string, targetProductNo: string) => Promise<ProductLookupCallResult>;
  getClientCredentials?: () => { clientId: string | undefined; clientSecret: string | undefined };
}

function getValueType(value: unknown): TmsNaverProductLookupMaskedResponseShapeAugmentationValueType {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'object';
}

function maskPreviewLast4(value: unknown): string | null {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return null;
  }

  const text = String(value);
  const last4 = text.slice(-4);
  return `****${last4}`;
}

function resolveCandidatePath(
  responseBody: Record<string, unknown>,
  candidatePath: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePath
): { exists: boolean; value: unknown } {
  const segments = candidatePath.split('.');
  let current: unknown = responseBody;

  for (const segment of segments) {
    if (current == null || typeof current !== 'object' || Array.isArray(current)) {
      return { exists: false, value: undefined };
    }

    const currentRecord = current as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(currentRecord, segment)) {
      return { exists: false, value: undefined };
    }

    current = currentRecord[segment];
  }

  return { exists: true, value: current };
}

function buildCandidatePathResults(
  responseBody: Record<string, unknown>,
  targetProductNo: string
): TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult[] {
  return TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_CANDIDATE_PATHS.map(
    (candidatePath) => {
      const resolved = resolveCandidatePath(responseBody, candidatePath);
      const valueType = getValueType(resolved.value);
      const equalsTargetProductNo =
        resolved.exists && (valueType === 'string' || valueType === 'number' || valueType === 'boolean')
          ? String(resolved.value) === targetProductNo
          : null;

      return {
        candidatePath,
        exists: resolved.exists,
        valueType,
        maskedPreviewLast4: resolved.exists ? maskPreviewLast4(resolved.value) : null,
        equalsTargetProductNo,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      };
    }
  );
}

function evaluateProductIdentityConfidence(input: {
  success: boolean;
  httpStatusCode: number | null;
  actualRecallCount: number;
  responseShapeKeys: string[];
  candidatePathResults: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult[];
}): {
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
  productIdentityMatchReason: string;
} {
  if (!input.success || input.httpStatusCode !== 200 || input.actualRecallCount !== 1) {
    return {
      productIdentityConfidenceScore: 0,
      productIdentityMatchConfirmed: false,
      productIdentityMatchReason:
        '상품 조회 API 재호출이 성공하지 않았거나 1회 제한을 만족하지 못해 상품 식별 confidence score를 0으로 유지했습니다.',
    };
  }

  const matchedPath = input.candidatePathResults.find((result) => result.equalsTargetProductNo === true);
  if (matchedPath) {
    return {
      productIdentityConfidenceScore: 100,
      productIdentityMatchConfirmed: true,
      productIdentityMatchReason: `${matchedPath.candidatePath} 경로가 targetProductNo 6597910207과 정확히 일치하여 상품 식별을 확정했습니다.`,
    };
  }

  const hasExistingCandidatePath = input.candidatePathResults.some((result) => result.exists);
  const hasNullableOrUndecidablePath = input.candidatePathResults.some(
    (result) => result.exists && result.equalsTargetProductNo === null
  );
  const hasExplicitMismatch = input.candidatePathResults.some((result) => result.equalsTargetProductNo === false);

  if (hasExistingCandidatePath && hasNullableOrUndecidablePath && !hasExplicitMismatch) {
    return {
      productIdentityConfidenceScore: 70,
      productIdentityMatchConfirmed: false,
      productIdentityMatchReason:
        'candidate path는 존재하지만 값 타입 또는 마스킹 제한으로 targetProductNo 일치 여부를 완전히 확정하지 못해 confidence score를 70으로 산정했습니다.',
    };
  }

  if (!hasExistingCandidatePath && input.responseShapeKeys.length > 0) {
    return {
      productIdentityConfidenceScore: 30,
      productIdentityMatchConfirmed: false,
      productIdentityMatchReason:
        'top-level response shape는 확인되었지만 candidate path 7개에서 식별 필드가 확인되지 않아 confidence score를 30으로 유지했습니다.',
    };
  }

  return {
    productIdentityConfidenceScore: 0,
    productIdentityMatchConfirmed: false,
    productIdentityMatchReason:
      'candidate path 값이 targetProductNo와 일치하지 않거나 식별 근거가 부족하여 상품 식별을 확정하지 않았습니다.',
  };
}

function blockedSummary(
  targetProductNo: string,
  sanitizedErrorMessage: string
): TmsNaverProductLookupMaskedResponseShapeAugmentationSummary {
  return {
    augmentationAttempted: false,
    actualRecallCount: 0,
    targetProductNo,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    success: false,
    httpStatusCode: null,
    responseShapeKeys: [],
    candidatePathResults: [],
    productIdentityConfidenceScore: 0,
    productIdentityMatchConfirmed: false,
    productIdentityMatchReason:
      '승인 범위 또는 실행 조건을 충족하지 못해 실제 마스킹 응답 shape 보강 수집을 시작하지 않았습니다.',
    rawResponseStored: false,
    rawResponseDisplayed: false,
    secretExposed: false,
    tokenExposed: false,
    authorizationHeaderExposed: false,
    signatureExposed: false,
    productUpdateCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritten: false,
    sanitizedErrorMessage,
  };
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

    const res = await fetch(`${NAVER_API_BASE_URL}/external/v1/oauth2/token`, {
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
  targetProductNo: string
): Promise<ProductLookupCallResult> {
  try {
    const res = await fetch(
      `${NAVER_API_BASE_URL}/external/v2/products/channel-products/${targetProductNo}`,
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
        responseBody: null,
        errorCategory: 'PRODUCT_LOOKUP_FAILED',
      };
    }

    const json = await res.json();
    if (!json || typeof json !== 'object' || Array.isArray(json)) {
      return {
        ok: false,
        httpStatusCode: res.status,
        responseBody: null,
        errorCategory: 'PRODUCT_LOOKUP_RESPONSE_NOT_OBJECT',
      };
    }

    return {
      ok: true,
      httpStatusCode: res.status,
      responseBody: json as Record<string, unknown>,
      errorCategory: null,
    };
  } catch {
    return {
      ok: false,
      httpStatusCode: null,
      responseBody: null,
      errorCategory: 'PRODUCT_LOOKUP_EXCEPTION',
    };
  }
}

function defaultGetClientCredentials(): { clientId: string | undefined; clientSecret: string | undefined } {
  return {
    clientId: process.env.GONGGU_CLIENT_ID ?? process.env.NAVER_API_CLIENT_ID,
    clientSecret: process.env.GONGGU_CLIENT_SECRET ?? process.env.NAVER_API_CLIENT_SECRET,
  };
}

export async function runTmsNaverProductLookupMaskedResponseShapeAugmentation(
  input: TmsNaverProductLookupMaskedResponseShapeAugmentationInput,
  dependencies: TmsNaverProductLookupMaskedResponseShapeAugmentationDependencies = {}
): Promise<TmsNaverProductLookupMaskedResponseShapeAugmentationSummary> {
  const issueToken = dependencies.issueToken ?? defaultIssueToken;
  const lookupProduct = dependencies.lookupProduct ?? defaultLookupProduct;
  const getClientCredentials = dependencies.getClientCredentials ?? defaultGetClientCredentials;

  if (
    input.explicitApprovalPhrase !==
    TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REQUIRED_APPROVAL_PHRASE
  ) {
    return blockedSummary(input.targetProductNo, 'APPROVAL_PHRASE_MISMATCH');
  }
  if (
    input.targetProductNo !==
    TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_PRODUCT_NO
  ) {
    return blockedSummary(input.targetProductNo, 'TARGET_PRODUCT_NO_MISMATCH');
  }
  if (input.maxRecallCount !== 1) {
    return blockedSummary(input.targetProductNo, 'MAX_RECALL_COUNT_EXCEEDS_LIMIT');
  }

  const { clientId, clientSecret } = getClientCredentials();
  if (!clientId || !clientSecret) {
    return blockedSummary(input.targetProductNo, 'MISSING_CLIENT_CREDENTIALS');
  }

  const tokenResult = await issueToken(clientId, clientSecret);
  if (!tokenResult.ok || !tokenResult.accessToken) {
    return {
      augmentationAttempted: true,
      actualRecallCount: 0,
      targetProductNo: input.targetProductNo,
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      success: false,
      httpStatusCode: tokenResult.httpStatusCode,
      responseShapeKeys: [],
      candidatePathResults: [],
      productIdentityConfidenceScore: 0,
      productIdentityMatchConfirmed: false,
      productIdentityMatchReason:
        '토큰 발급이 실패하여 상품 조회 API 재호출과 마스킹 응답 shape 보강 수집을 진행하지 못했습니다.',
      rawResponseStored: false,
      rawResponseDisplayed: false,
      secretExposed: false,
      tokenExposed: false,
      authorizationHeaderExposed: false,
      signatureExposed: false,
      productUpdateCalled: false,
      priceChanged: false,
      stockChanged: false,
      dbWritten: false,
      sanitizedErrorMessage: tokenResult.errorCategory ?? 'TOKEN_ISSUANCE_FAILED',
    };
  }

  const lookupResult = await lookupProduct(tokenResult.accessToken, input.targetProductNo);
  if (!lookupResult.ok || !lookupResult.responseBody) {
    return {
      augmentationAttempted: true,
      actualRecallCount: 1,
      targetProductNo: input.targetProductNo,
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      success: false,
      httpStatusCode: lookupResult.httpStatusCode,
      responseShapeKeys: [],
      candidatePathResults: [],
      productIdentityConfidenceScore: 0,
      productIdentityMatchConfirmed: false,
      productIdentityMatchReason:
        '상품 조회 API 재호출이 실패하여 마스킹 응답 shape 보강 수집 결과를 확보하지 못했습니다.',
      rawResponseStored: false,
      rawResponseDisplayed: false,
      secretExposed: false,
      tokenExposed: false,
      authorizationHeaderExposed: false,
      signatureExposed: false,
      productUpdateCalled: false,
      priceChanged: false,
      stockChanged: false,
      dbWritten: false,
      sanitizedErrorMessage: lookupResult.errorCategory ?? 'PRODUCT_LOOKUP_FAILED',
    };
  }

  const responseShapeKeys = Object.keys(lookupResult.responseBody);
  const candidatePathResults = buildCandidatePathResults(lookupResult.responseBody, input.targetProductNo);
  const confidence = evaluateProductIdentityConfidence({
    success: true,
    httpStatusCode: lookupResult.httpStatusCode,
    actualRecallCount: 1,
    responseShapeKeys,
    candidatePathResults,
  });

  return {
    augmentationAttempted: true,
    actualRecallCount: 1,
    targetProductNo: input.targetProductNo,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    success: true,
    httpStatusCode: lookupResult.httpStatusCode,
    responseShapeKeys,
    candidatePathResults,
    productIdentityConfidenceScore: confidence.productIdentityConfidenceScore,
    productIdentityMatchConfirmed: confidence.productIdentityMatchConfirmed,
    productIdentityMatchReason: confidence.productIdentityMatchReason,
    rawResponseStored: false,
    rawResponseDisplayed: false,
    secretExposed: false,
    tokenExposed: false,
    authorizationHeaderExposed: false,
    signatureExposed: false,
    productUpdateCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritten: false,
    sanitizedErrorMessage: null,
  };
}

async function runCli() {
  const summary = await runTmsNaverProductLookupMaskedResponseShapeAugmentation({
    targetProductNo: TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_PRODUCT_NO,
    maxRecallCount: 1,
    explicitApprovalPhrase:
      TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_REQUIRED_APPROVAL_PHRASE,
  });

  console.log(JSON.stringify(summary, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error: unknown) => {
    const sanitizedErrorMessage = error instanceof Error ? error.message : 'UNEXPECTED_HARNESS_ERROR';
    console.error(
      JSON.stringify(
        {
          augmentationAttempted: false,
          actualRecallCount: 0,
          targetProductNo: TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_PRODUCT_NO,
          targetApi: TMS_NAVER_PRODUCT_LOOKUP_MASKED_RESPONSE_SHAPE_AUGMENTATION_TARGET_API,
          success: false,
          httpStatusCode: null,
          responseShapeKeys: [],
          candidatePathResults: [],
          productIdentityConfidenceScore: 0,
          productIdentityMatchConfirmed: false,
          productIdentityMatchReason:
            '예상하지 못한 예외로 실제 마스킹 응답 shape 보강 수집을 완료하지 못했습니다.',
          rawResponseStored: false,
          rawResponseDisplayed: false,
          secretExposed: false,
          tokenExposed: false,
          authorizationHeaderExposed: false,
          signatureExposed: false,
          productUpdateCalled: false,
          priceChanged: false,
          stockChanged: false,
          dbWritten: false,
          sanitizedErrorMessage,
        },
        null,
        2
      )
    );
    process.exitCode = 1;
  });
}
