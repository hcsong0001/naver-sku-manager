import { NaverApiDryRunAdapter } from '@/src/services/naver-api/naver-api.adapter';
import { PrismaNaverApiLogger } from '@/src/services/naver-api/naver-api.logger';
import type {
  NaverApiAdapter,
  NaverApiApprovalVerifier,
  NaverApiCallContext,
  NaverApiCallResult,
  NaverApiCallStatus,
  NaverApiClientOptions,
  NaverApiErrorType,
  NaverApiLogger,
  NaverApiOperation,
} from '@/src/services/naver-api/naver-api.types';

const DEFAULT_OPTIONS: NaverApiClientOptions = {
  defaultTimeoutMs: 15_000,
  retryPolicy: {
    maxAttempts: 3,
    baseDelayMs: 500,
    maxDelayMs: 5_000,
    retryableStatusCodes: [408, 425, 429, 500, 502, 503, 504],
  },
  failOnLiveLogError: true,
};

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function retryDelay(attempt: number, options: NaverApiClientOptions): number {
  return Math.min(
    options.retryPolicy.baseDelayMs * (2 ** Math.max(attempt - 1, 0)),
    options.retryPolicy.maxDelayMs,
  );
}

function classifyStatus(statusCode: number): NaverApiErrorType {
  if (statusCode === 401) return 'AUTHENTICATION';
  if (statusCode === 403) return 'AUTHORIZATION';
  if (statusCode === 429) return 'RATE_LIMIT';
  if (statusCode >= 400 && statusCode < 500) return 'VALIDATION';
  return 'NAVER_API';
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

function resultStatus(statusCode: number, mode: NaverApiAdapter['mode']): NaverApiCallStatus {
  if (mode === 'DRY_RUN') return 'DRY_RUN';
  if (statusCode === 207) return 'PARTIAL_SUCCESS';
  if (statusCode >= 200 && statusCode < 300) return 'SUCCESS';
  return 'FAILED';
}

export class NaverApiClient {
  constructor(
    private readonly adapter: NaverApiAdapter,
    private readonly logger: NaverApiLogger,
    private readonly options: NaverApiClientOptions = DEFAULT_OPTIONS,
    private readonly approvalVerifier?: NaverApiApprovalVerifier,
  ) {}

  private async writeLog(
    context: NaverApiCallContext,
    operation: NaverApiOperation<unknown, unknown>,
    payload: unknown,
    responsePayload: unknown,
    result: NaverApiCallResult<unknown>,
    maxAttempts: number,
    retryAfterMs?: number,
  ): Promise<void> {
    try {
      await this.logger.log({
        context,
        operation,
        requestPayload: payload,
        responsePayload,
        result,
        maxAttempts,
        retryAfterMs,
      });
    } catch (error) {
      console.error('네이버 API 호출 로그 저장에 실패했습니다:', error);
      if (this.adapter.mode === 'LIVE' && this.options.failOnLiveLogError) throw error;
    }
  }

  async call<TRequest, TResponse>(input: {
    context: NaverApiCallContext;
    operation: NaverApiOperation<TRequest, TResponse>;
    payload: TRequest;
  }): Promise<NaverApiCallResult<TResponse>> {
    const { context, operation, payload } = input;
    const validationErrors = operation.validateRequest?.(payload) ?? [];
    const operationForLog = operation as NaverApiOperation<unknown, unknown>;
    const maxAttempts = Math.max(
      1,
      operation.maxAttempts ?? this.options.retryPolicy.maxAttempts,
    );

    if (validationErrors.length > 0) {
      return this.failBeforeExecution(
        context,
        operationForLog,
        payload,
        'VALIDATION',
        validationErrors.join(' / '),
        maxAttempts,
      ) as Promise<NaverApiCallResult<TResponse>>;
    }

    if (this.adapter.mode === 'LIVE' && operation.effect === 'WRITE') {
      const approved = Boolean(
        context.approval
        && this.approvalVerifier
        && await this.approvalVerifier.verify(context, operationForLog),
      );
      if (!approved) {
        return this.failBeforeExecution(
          context,
          operationForLog,
          payload,
          'APPROVAL_REQUIRED',
          '운영 변경 API는 DB에서 승인 상태가 확인된 batch job 문맥에서만 실행할 수 있습니다.',
          maxAttempts,
        ) as Promise<NaverApiCallResult<TResponse>>;
      }
    }

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const startedAt = new Date();
      const controller = new AbortController();
      const timeoutMs = operation.timeoutMs ?? this.options.defaultTimeoutMs;
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await this.adapter.execute<TRequest, TResponse>({
          context,
          operation: operation as NaverApiOperation<TRequest, unknown>,
          payload,
          signal: controller.signal,
          attempt,
        });
        const finishedAt = new Date();
        const status = resultStatus(response.statusCode, this.adapter.mode);
        const ok = status === 'DRY_RUN' || status === 'SUCCESS' || status === 'PARTIAL_SUCCESS';
        const errorType = ok ? null : classifyStatus(response.statusCode);
        const retryable = !ok
          && attempt < maxAttempts
          && this.options.retryPolicy.retryableStatusCodes.includes(response.statusCode);
        const delayMs = retryable ? retryDelay(attempt, this.options) : undefined;
        const result: NaverApiCallResult<TResponse> = {
          ok,
          mode: this.adapter.mode,
          module: operation.module,
          operation: operation.name,
          status: retryable ? 'RETRY_PENDING' : status,
          statusCode: response.statusCode,
          data: ok ? response.data : null,
          errorType,
          errorCode: response.errorCode ?? null,
          errorMessage: ok ? null : response.errorMessage ?? '네이버 API 요청에 실패했습니다.',
          attempt,
          retryable,
          startedAt: startedAt.toISOString(),
          finishedAt: finishedAt.toISOString(),
          durationMs: finishedAt.getTime() - startedAt.getTime(),
        };

        await this.writeLog(context, operationForLog, payload, response.data, result, maxAttempts, delayMs);
        if (!retryable) return result;
        await wait(delayMs ?? 0);
      } catch (error) {
        const finishedAt = new Date();
        const errorType: NaverApiErrorType = isAbortError(error) ? 'TIMEOUT' : 'NETWORK';
        const retryable = attempt < maxAttempts;
        const delayMs = retryable ? retryDelay(attempt, this.options) : undefined;
        const result: NaverApiCallResult<TResponse> = {
          ok: false,
          mode: this.adapter.mode,
          module: operation.module,
          operation: operation.name,
          status: retryable ? 'RETRY_PENDING' : 'FAILED',
          statusCode: null,
          data: null,
          errorType,
          errorCode: null,
          errorMessage: error instanceof Error ? error.message : '네이버 API 요청 중 알 수 없는 오류가 발생했습니다.',
          attempt,
          retryable,
          startedAt: startedAt.toISOString(),
          finishedAt: finishedAt.toISOString(),
          durationMs: finishedAt.getTime() - startedAt.getTime(),
        };
        await this.writeLog(context, operationForLog, payload, null, result, maxAttempts, delayMs);
        if (!retryable) return result;
        await wait(delayMs ?? 0);
      } finally {
        clearTimeout(timeout);
      }
    }

    throw new Error('네이버 API retry 루프가 예기치 않게 종료되었습니다.');
  }

  private async failBeforeExecution(
    context: NaverApiCallContext,
    operation: NaverApiOperation<unknown, unknown>,
    payload: unknown,
    errorType: NaverApiErrorType,
    errorMessage: string,
    maxAttempts: number,
  ): Promise<NaverApiCallResult<unknown>> {
    const now = new Date().toISOString();
    const result: NaverApiCallResult<unknown> = {
      ok: false,
      mode: this.adapter.mode,
      module: operation.module,
      operation: operation.name,
      status: 'SKIPPED',
      statusCode: null,
      data: null,
      errorType,
      errorCode: null,
      errorMessage,
      attempt: 0,
      retryable: false,
      startedAt: now,
      finishedAt: now,
      durationMs: 0,
    };
    await this.writeLog(context, operation, payload, null, result, maxAttempts);
    return result;
  }
}

export function createNaverApiDryRunClient(): NaverApiClient {
  return new NaverApiClient(
    new NaverApiDryRunAdapter(),
    new PrismaNaverApiLogger(),
    DEFAULT_OPTIONS,
  );
}
