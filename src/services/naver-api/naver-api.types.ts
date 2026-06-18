export const NAVER_API_MODULES = [
  'AUTH',
  'PRODUCT',
  'OPTION',
  'ADDITIONAL_PRODUCT',
  'PRICE',
  'INVENTORY',
  'ORDER',
  'DELIVERY',
  'CLAIM',
  'SETTLEMENT',
  'INQUIRY_REVIEW',
  'PROMOTION',
] as const;

export type NaverApiModule = (typeof NAVER_API_MODULES)[number];
export type NaverApiEffect = 'READ' | 'WRITE';
export type NaverApiExecutionMode = 'DRY_RUN' | 'LIVE';
export type NaverApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type NaverApiCallStatus =
  | 'PENDING'
  | 'DRY_RUN'
  | 'SUCCESS'
  | 'PARTIAL_SUCCESS'
  | 'FAILED'
  | 'RETRY_PENDING'
  | 'SKIPPED'
  | 'CANCELLED';

export type NaverApiErrorType =
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'APPROVAL_REQUIRED'
  | 'VALIDATION'
  | 'RATE_LIMIT'
  | 'TIMEOUT'
  | 'NETWORK'
  | 'NAVER_API'
  | 'RESPONSE_PARSE'
  | 'LOGGING'
  | 'UNKNOWN';

export type NaverApiOperation<TRequest = unknown, TResponse = unknown> = {
  module: NaverApiModule;
  name: string;
  method: NaverApiHttpMethod;
  endpoint: string;
  effect: NaverApiEffect;
  description: string;
  version?: string;
  timeoutMs?: number;
  maxAttempts?: number;
  validateRequest?: (payload: TRequest) => string[];
  responseType?: TResponse;
};

export type NaverApiApprovalContext = {
  batchJobId: string;
  batchJobItemId: string;
  approvedAt: string;
  approvedBy: string;
};

export type NaverApiCallContext = {
  storeId: string;
  channelId?: string;
  correlationId?: string;
  idempotencyKey?: string;
  approval?: NaverApiApprovalContext;
};

export type NaverApiAdapterRequest<TRequest> = {
  context: NaverApiCallContext;
  operation: NaverApiOperation<TRequest, unknown>;
  payload: TRequest;
  signal: AbortSignal;
  attempt: number;
};

export type NaverApiAdapterResponse<TResponse> = {
  statusCode: number;
  data: TResponse;
  headers?: Record<string, string>;
  errorCode?: string;
  errorMessage?: string;
};

export interface NaverApiAdapter {
  readonly mode: NaverApiExecutionMode;
  execute<TRequest, TResponse>(
    request: NaverApiAdapterRequest<TRequest>,
  ): Promise<NaverApiAdapterResponse<TResponse>>;
}

export type NaverApiCallResult<TResponse> = {
  ok: boolean;
  mode: NaverApiExecutionMode;
  module: NaverApiModule;
  operation: string;
  status: NaverApiCallStatus;
  statusCode: number | null;
  data: TResponse | null;
  errorType: NaverApiErrorType | null;
  errorCode: string | null;
  errorMessage: string | null;
  attempt: number;
  retryable: boolean;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
};

export type NaverApiLogInput = {
  context: NaverApiCallContext;
  operation: NaverApiOperation<unknown, unknown>;
  requestPayload: unknown;
  responsePayload: unknown;
  result: NaverApiCallResult<unknown>;
  maxAttempts: number;
  retryAfterMs?: number;
};

export interface NaverApiLogger {
  log(input: NaverApiLogInput): Promise<void>;
}

export interface NaverApiApprovalVerifier {
  verify(
    context: NaverApiCallContext,
    operation: NaverApiOperation<unknown, unknown>,
  ): Promise<boolean>;
}

export type NaverApiRetryPolicy = {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  retryableStatusCodes: number[];
};

export type NaverApiClientOptions = {
  defaultTimeoutMs: number;
  retryPolicy: NaverApiRetryPolicy;
  failOnLiveLogError: boolean;
};

export type NaverApiBundleComponent = {
  skuCode: string;
  internalSkuCode?: string | null;
  legacyStockCode?: string | null;
  barcode?: string | null;
  alias?: string | null;
  productName?: string | null;
  quantity: number;
  costPrice: number | null;
  stockQuantity: number | null;
};

export type NaverApiBatchPreviewItem = {
  storeId: string;
  channelId?: string;
  productNo?: string;
  channelProductNo?: string;
  targetType: 'PRODUCT' | 'OPTION' | 'ADDITIONAL' | 'BUNDLE' | string;
  targetId: string;
  operation: string;
  internalSkuCode?: string;
  legacyStockCode?: string;
  barcode?: string;
  skuLookupKeys?: Record<string, unknown>;
  bundleComponents?: NaverApiBundleComponent[];
  previewBefore?: unknown;
  previewAfter?: unknown;
  requestPayload?: unknown;
};

export type NaverApiBatchPreviewInput = {
  jobType: string;
  module: NaverApiModule;
  description?: string;
  previewSummary?: unknown;
  metadata?: unknown;
  items: NaverApiBatchPreviewItem[];
};

export type NaverApiBundleCalculation = {
  valid: boolean;
  totalCost: number | null;
  sellableStock: number | null;
  errors: string[];
};
