import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pathToFileURL } from 'node:url';

export const TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_REQUIRED_APPROVAL_PHRASE =
  'Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.';
export const TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_PRODUCT_NO = '6597910207';
export const TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_API =
  'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
export const TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_BASE_CANDIDATE_PATHS = [
  'smartstoreChannelProduct.channelProductNo',
  'smartstoreChannelProduct.id',
  'smartstoreChannelProduct.productNo',
  'smartstoreChannelProduct.originProductNo',
  'originProduct.originProductNo',
  'originProduct.id',
  'originProduct.productNo',
] as const;

const NAVER_API_BASE_URL = 'https://api.commerce.naver.com';

export type TmsNaverProductIdentityFieldExplorationValueType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | 'undefined';

export interface TmsNaverProductIdentityFieldExplorationInput {
  targetProductNo: string;
  maxRecallCount: number;
  explicitApprovalPhrase: string;
}

export interface TmsNaverProductIdentityFieldExplorationKeyNameGroup {
  groupId: string;
  matchedKeyNames: string[];
}

export interface TmsNaverProductIdentityFieldExplorationCandidateFieldResult {
  path: string;
  exists: boolean;
  valueType: TmsNaverProductIdentityFieldExplorationValueType | null;
  maskedPreviewLast4: string | null;
  equalsTargetProductNo: boolean | null;
  rawValueDisplayed: false;
  rawValueStored: false;
  rawResponseAccessedForDisplay: false;
}

export interface TmsNaverProductIdentityFieldExplorationSummary {
  executed: boolean;
  lookupRecallCount: number;
  targetProductNo: string;
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  httpStatus: number | null;
  success: boolean;
  topLevelKeys: string[];
  exploredKeyNameGroups: TmsNaverProductIdentityFieldExplorationKeyNameGroup[];
  candidateFieldResults: TmsNaverProductIdentityFieldExplorationCandidateFieldResult[];
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
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

export interface TmsNaverProductIdentityFieldExplorationDependencies {
  issueToken?: (clientId: string, clientSecret: string) => Promise<TokenCallResult>;
  lookupProduct?: (accessToken: string, targetProductNo: string) => Promise<ProductLookupCallResult>;
  getClientCredentials?: () => { clientId: string | undefined; clientSecret: string | undefined };
}

function normalizeKeyName(input: string): string {
  return input.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function isProductChannelOriginKeyName(input: string): boolean {
  const normalized = normalizeKeyName(input);
  return (
    normalized.includes('product') || normalized.includes('channel') || normalized.includes('origin')
  );
}

function isIdentifierLikeKeyName(input: string): boolean {
  const normalized = normalizeKeyName(input);

  return (
    normalized === 'id' ||
    normalized.endsWith('id') ||
    normalized.includes('channelproductno') ||
    normalized.includes('originproductno') ||
    normalized.includes('productno') ||
    normalized.includes('productnumber') ||
    normalized.includes('channelproductnumber') ||
    normalized.includes('originproductnumber')
  );
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function getValueType(value: unknown): TmsNaverProductIdentityFieldExplorationValueType {
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
  return `****${text.slice(-4)}`;
}

function resolvePath(
  responseBody: Record<string, unknown>,
  path: string
): { exists: boolean; value: unknown } {
  const segments = path.split('.');
  let current: unknown = responseBody;

  for (const segment of segments) {
    if (!isObjectRecord(current)) {
      return { exists: false, value: undefined };
    }

    if (!Object.prototype.hasOwnProperty.call(current, segment)) {
      return { exists: false, value: undefined };
    }

    current = current[segment];
  }

  return { exists: true, value: current };
}

function collectPaths(
  value: unknown,
  basePath = ''
): string[] {
  if (Array.isArray(value)) {
    return [];
  }

  if (!isObjectRecord(value)) {
    return [];
  }

  const entries = Object.entries(value);
  const paths: string[] = [];

  for (const [key, nestedValue] of entries) {
    const nextPath = basePath ? `${basePath}.${key}` : key;
    paths.push(nextPath);
    paths.push(...collectPaths(nestedValue, nextPath));
  }

  return paths;
}

function uniqueSorted(values: Iterable<string>): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function buildExploredKeyNameGroups(
  responseBody: Record<string, unknown>
): TmsNaverProductIdentityFieldExplorationKeyNameGroup[] {
  const topLevelKeys = Object.keys(responseBody);
  const smartstoreChannelProductKeys = isObjectRecord(responseBody.smartstoreChannelProduct)
    ? Object.keys(responseBody.smartstoreChannelProduct)
    : [];
  const originProductKeys = isObjectRecord(responseBody.originProduct)
    ? Object.keys(responseBody.originProduct)
    : [];
  const nestedIdentifierLikeKeyNames = uniqueSorted(
    collectPaths(responseBody)
      .map((path) => path.split('.').at(-1) ?? '')
      .filter((keyName) => isIdentifierLikeKeyName(keyName) || isProductChannelOriginKeyName(keyName))
  );

  return [
    {
      groupId: 'top-level-key-names',
      matchedKeyNames: topLevelKeys,
    },
    {
      groupId: 'smartstore-channel-product-key-names',
      matchedKeyNames: smartstoreChannelProductKeys,
    },
    {
      groupId: 'origin-product-key-names',
      matchedKeyNames: originProductKeys,
    },
    {
      groupId: 'identifier-like-nested-key-names',
      matchedKeyNames: nestedIdentifierLikeKeyNames,
    },
  ];
}

function buildCandidateFieldPaths(responseBody: Record<string, unknown>): string[] {
  const discoveredPaths = collectPaths(responseBody).filter((path) => {
    const segments = path.split('.');
    const keyName = segments.at(-1) ?? '';
    return (
      isIdentifierLikeKeyName(keyName) &&
      segments.some((segment) => isProductChannelOriginKeyName(segment))
    );
  });

  return [
    ...TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_BASE_CANDIDATE_PATHS,
    ...uniqueSorted(discoveredPaths).filter(
      (path) =>
        !TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_BASE_CANDIDATE_PATHS.includes(
          path as (typeof TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_BASE_CANDIDATE_PATHS)[number]
        )
    ),
  ];
}

function buildCandidateFieldResults(
  responseBody: Record<string, unknown>,
  targetProductNo: string
): TmsNaverProductIdentityFieldExplorationCandidateFieldResult[] {
  return buildCandidateFieldPaths(responseBody).map((path) => {
    const resolved = resolvePath(responseBody, path);

    if (!resolved.exists) {
      return {
        path,
        exists: false,
        valueType: null,
        maskedPreviewLast4: null,
        equalsTargetProductNo: null,
        rawValueDisplayed: false,
        rawValueStored: false,
        rawResponseAccessedForDisplay: false,
      };
    }

    const valueType = getValueType(resolved.value);
    const equalsTargetProductNo =
      valueType === 'string' || valueType === 'number' || valueType === 'boolean'
        ? String(resolved.value) === targetProductNo
        : null;

    return {
      path,
      exists: true,
      valueType,
      maskedPreviewLast4: maskPreviewLast4(resolved.value),
      equalsTargetProductNo,
      rawValueDisplayed: false,
      rawValueStored: false,
      rawResponseAccessedForDisplay: false,
    };
  });
}

function evaluateProductIdentityConfidence(input: {
  success: boolean;
  httpStatus: number | null;
  lookupRecallCount: number;
  topLevelKeys: string[];
  candidateFieldResults: TmsNaverProductIdentityFieldExplorationCandidateFieldResult[];
}): {
  productIdentityConfidenceScore: 0 | 30 | 70 | 100;
  productIdentityMatchConfirmed: boolean;
} {
  if (!input.success || input.httpStatus !== 200 || input.lookupRecallCount !== 1) {
    return {
      productIdentityConfidenceScore: 0,
      productIdentityMatchConfirmed: false,
    };
  }

  if (input.candidateFieldResults.some((result) => result.equalsTargetProductNo === true)) {
    return {
      productIdentityConfidenceScore: 100,
      productIdentityMatchConfirmed: true,
    };
  }

  const hasExistingCandidate = input.candidateFieldResults.some((result) => result.exists);
  const hasUndecidableCandidate = input.candidateFieldResults.some(
    (result) => result.exists && result.equalsTargetProductNo === null
  );

  if (hasExistingCandidate && hasUndecidableCandidate) {
    return {
      productIdentityConfidenceScore: 70,
      productIdentityMatchConfirmed: false,
    };
  }

  if (input.topLevelKeys.length > 0) {
    return {
      productIdentityConfidenceScore: 30,
      productIdentityMatchConfirmed: false,
    };
  }

  return {
    productIdentityConfidenceScore: 0,
    productIdentityMatchConfirmed: false,
  };
}

function blockedSummary(
  targetProductNo: string,
  sanitizedErrorMessage: string
): TmsNaverProductIdentityFieldExplorationSummary {
  return {
    executed: false,
    lookupRecallCount: 0,
    targetProductNo,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    httpStatus: null,
    success: false,
    topLevelKeys: [],
    exploredKeyNameGroups: [],
    candidateFieldResults: [],
    productIdentityConfidenceScore: 0,
    productIdentityMatchConfirmed: false,
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
    if (!isObjectRecord(json)) {
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
      responseBody: json,
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

export async function runTmsNaverProductIdentityFieldExploration(
  input: TmsNaverProductIdentityFieldExplorationInput,
  dependencies: TmsNaverProductIdentityFieldExplorationDependencies = {}
): Promise<TmsNaverProductIdentityFieldExplorationSummary> {
  const issueToken = dependencies.issueToken ?? defaultIssueToken;
  const lookupProduct = dependencies.lookupProduct ?? defaultLookupProduct;
  const getClientCredentials = dependencies.getClientCredentials ?? defaultGetClientCredentials;

  if (
    input.explicitApprovalPhrase !==
    TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_REQUIRED_APPROVAL_PHRASE
  ) {
    return blockedSummary(input.targetProductNo, 'APPROVAL_PHRASE_MISMATCH');
  }

  if (input.targetProductNo !== TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_PRODUCT_NO) {
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
      executed: true,
      lookupRecallCount: 0,
      targetProductNo: input.targetProductNo,
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      httpStatus: tokenResult.httpStatusCode,
      success: false,
      topLevelKeys: [],
      exploredKeyNameGroups: [],
      candidateFieldResults: [],
      productIdentityConfidenceScore: 0,
      productIdentityMatchConfirmed: false,
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
      executed: true,
      lookupRecallCount: 1,
      targetProductNo: input.targetProductNo,
      targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
      httpStatus: lookupResult.httpStatusCode,
      success: false,
      topLevelKeys: [],
      exploredKeyNameGroups: [],
      candidateFieldResults: [],
      productIdentityConfidenceScore: 0,
      productIdentityMatchConfirmed: false,
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

  const topLevelKeys = Object.keys(lookupResult.responseBody);
  const exploredKeyNameGroups = buildExploredKeyNameGroups(lookupResult.responseBody);
  const candidateFieldResults = buildCandidateFieldResults(lookupResult.responseBody, input.targetProductNo);
  const confidence = evaluateProductIdentityConfidence({
    success: true,
    httpStatus: lookupResult.httpStatusCode,
    lookupRecallCount: 1,
    topLevelKeys,
    candidateFieldResults,
  });

  return {
    executed: true,
    lookupRecallCount: 1,
    targetProductNo: input.targetProductNo,
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    httpStatus: lookupResult.httpStatusCode,
    success: true,
    topLevelKeys,
    exploredKeyNameGroups,
    candidateFieldResults,
    productIdentityConfidenceScore: confidence.productIdentityConfidenceScore,
    productIdentityMatchConfirmed: confidence.productIdentityMatchConfirmed,
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
  const summary = await runTmsNaverProductIdentityFieldExploration({
    targetProductNo: TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_PRODUCT_NO,
    maxRecallCount: 1,
    explicitApprovalPhrase: TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_REQUIRED_APPROVAL_PHRASE,
  });

  console.log(JSON.stringify(summary, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error: unknown) => {
    const sanitizedErrorMessage = error instanceof Error ? error.message : 'UNEXPECTED_HARNESS_ERROR';
    console.error(
      JSON.stringify(
        {
          executed: false,
          lookupRecallCount: 0,
          targetProductNo: TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_PRODUCT_NO,
          targetApi: TMS_NAVER_PRODUCT_IDENTITY_FIELD_EXPLORATION_TARGET_API,
          httpStatus: null,
          success: false,
          topLevelKeys: [],
          exploredKeyNameGroups: [],
          candidateFieldResults: [],
          productIdentityConfidenceScore: 0,
          productIdentityMatchConfirmed: false,
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
