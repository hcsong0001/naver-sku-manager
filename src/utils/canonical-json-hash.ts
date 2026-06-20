import { createHash } from 'node:crypto';

export const TMS_CANONICAL_JSON_VERSION = 'TMS_CANONICAL_JSON_V1' as const;

export const FINAL_APPROVAL_HASH_DOMAINS = {
  payload: 'NAVER_API_BATCH_FINAL_APPROVAL_PAYLOAD_V1',
  validation: 'NAVER_API_BATCH_FINAL_APPROVAL_VALIDATION_V1',
  itemPayload: 'NAVER_API_BATCH_FINAL_APPROVAL_ITEM_PAYLOAD_V1',
  itemValidation: 'NAVER_API_BATCH_FINAL_APPROVAL_ITEM_VALIDATION_V1',
  scope: 'NAVER_API_BATCH_FINAL_APPROVAL_SCOPE_V1',
} as const;

type CanonicalJsonPrimitive = null | boolean | number | string;
export type CanonicalJsonValue =
  | CanonicalJsonPrimitive
  | CanonicalJsonValue[]
  | { [key: string]: CanonicalJsonValue };

function isPlainObject(value: object): value is Record<string, unknown> {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isDecimalLike(value: object): value is { toFixed: () => string } {
  return value.constructor?.name === 'Decimal'
    && typeof (value as { toFixed?: unknown }).toFixed === 'function';
}

function normalizeDecimalString(value: string): string {
  const trimmed = value.trim();
  if (!/^[+-]?(?:\d+)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(trimmed)) {
    throw new TypeError('Decimal 값을 정규화할 수 없습니다.');
  }

  const negative = trimmed.startsWith('-');
  const unsigned = trimmed.replace(/^[+-]/, '');
  const [coefficient, exponentText] = unsigned.toLowerCase().split('e');
  const exponent = exponentText ? Number(exponentText) : 0;
  if (!Number.isSafeInteger(exponent)) {
    throw new TypeError('Decimal exponent가 허용 범위를 벗어났습니다.');
  }

  const [integerPart, fractionPart = ''] = coefficient.split('.');
  const digits = `${integerPart}${fractionPart}`;
  const decimalIndex = integerPart.length + exponent;
  const expanded = decimalIndex <= 0
    ? `0.${'0'.repeat(-decimalIndex)}${digits}`
    : decimalIndex >= digits.length
      ? `${digits}${'0'.repeat(decimalIndex - digits.length)}`
      : `${digits.slice(0, decimalIndex)}.${digits.slice(decimalIndex)}`;

  const [expandedInteger, expandedFraction = ''] = expanded.split('.');
  const normalizedInteger = expandedInteger.replace(/^0+(?=\d)/, '') || '0';
  const normalizedFraction = expandedFraction.replace(/0+$/, '');
  const normalized = normalizedFraction
    ? `${normalizedInteger}.${normalizedFraction}`
    : normalizedInteger;

  if (/^0(?:\.0+)?$/.test(normalized)) return '0';
  return negative ? `-${normalized}` : normalized;
}

function projectCanonicalJson(value: unknown, path: string): CanonicalJsonValue {
  if (value === null) return null;
  if (typeof value === 'boolean' || typeof value === 'string') return value;

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new TypeError(`${path}에 유한하지 않은 숫자가 있습니다.`);
    }
    if (Number.isInteger(value) && !Number.isSafeInteger(value)) {
      throw new TypeError(`${path}에 안전 범위를 벗어난 정수가 있습니다.`);
    }
    return Object.is(value, -0) ? 0 : value;
  }

  if (typeof value === 'bigint') return value.toString(10);
  if (value === undefined) {
    throw new TypeError(`${path}에 undefined가 있습니다.`);
  }
  if (typeof value === 'function' || typeof value === 'symbol') {
    throw new TypeError(`${path}에 JSON으로 직렬화할 수 없는 값이 있습니다.`);
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new TypeError(`${path}에 유효하지 않은 Date가 있습니다.`);
    }
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      if (!(index in value)) {
        throw new TypeError(`${path}에 sparse array가 있습니다.`);
      }
    }
    return value.map((entry, index) => projectCanonicalJson(entry, `${path}[${index}]`));
  }

  if (typeof value === 'object') {
    if (isDecimalLike(value)) {
      return normalizeDecimalString(value.toFixed());
    }
    if (!isPlainObject(value)) {
      throw new TypeError(`${path}에 지원하지 않는 class instance가 있습니다.`);
    }

    const projected: Record<string, CanonicalJsonValue> = {};
    for (const key of Object.keys(value).sort()) {
      projected[key] = projectCanonicalJson(value[key], `${path}.${key}`);
    }
    return projected;
  }

  throw new TypeError(`${path}에 지원하지 않는 값이 있습니다.`);
}

export function canonicalizeJson(value: unknown): string {
  return JSON.stringify(projectCanonicalJson(value, '$'));
}

export function sha256DomainHash(domain: string, value: unknown): string {
  if (!/^[A-Z0-9_]+$/.test(domain)) {
    throw new TypeError('hash domain 형식이 올바르지 않습니다.');
  }

  const canonicalJson = canonicalizeJson(value);
  return createHash('sha256')
    .update(`${domain}\n${canonicalJson}`, 'utf8')
    .digest('hex');
}
