import { Prisma } from '@/app/generated/prisma';
import prisma from '@/lib/prisma';
import type {
  NaverApiLogInput,
  NaverApiLogger,
} from '@/src/services/naver-api/naver-api.types';

const SENSITIVE_KEYS = [
  'authorization',
  'accesstoken',
  'refreshtoken',
  'clientsecret',
  'secret',
  'password',
  'signature',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function shouldRedact(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, '');
  return SENSITIVE_KEYS.some((sensitiveKey) => normalized.includes(sensitiveKey));
}

export function sanitizeNaverApiPayload(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) return value;
  if (depth > 12) return '[깊이 제한]';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map((item) => sanitizeNaverApiPayload(item, depth + 1));
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        shouldRedact(key) ? '[보안정보 제거]' : sanitizeNaverApiPayload(item, depth + 1),
      ]),
    );
  }
  return String(value);
}

function toJsonValue(value: unknown): Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.JsonNull;
  return sanitizeNaverApiPayload(value) as Prisma.InputJsonValue;
}

export class PrismaNaverApiLogger implements NaverApiLogger {
  async log(input: NaverApiLogInput): Promise<void> {
    await prisma.naverApiCallLog.create({
      data: {
        smartstoreId: input.context.storeId,
        channelId: input.context.channelId ?? null,
        batchJobItemId: input.context.approval?.batchJobItemId ?? null,
        module: input.operation.module,
        operation: input.operation.name,
        method: input.operation.method,
        endpoint: input.operation.endpoint,
        requestPayload: toJsonValue(input.requestPayload),
        responsePayload: toJsonValue(input.responsePayload),
        statusCode: input.result.statusCode,
        status: input.result.status,
        errorType: input.result.errorType,
        errorCode: input.result.errorCode,
        errorMessage: input.result.errorMessage,
        attempt: input.result.attempt,
        maxAttempts: input.maxAttempts,
        retryAfterMs: input.retryAfterMs ?? null,
        idempotencyKey: input.context.idempotencyKey ?? null,
        startedAt: new Date(input.result.startedAt),
        finishedAt: new Date(input.result.finishedAt),
        durationMs: input.result.durationMs,
      },
    });
  }
}

export class NoopNaverApiLogger implements NaverApiLogger {
  async log(): Promise<void> {
    return;
  }
}
