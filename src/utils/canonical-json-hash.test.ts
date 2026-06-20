import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import {
  canonicalizeJson,
  FINAL_APPROVAL_HASH_DOMAINS,
  sha256DomainHash,
} from './canonical-json-hash';

class Decimal {
  constructor(private readonly value: string) {}

  toFixed(): string {
    return this.value;
  }
}

test('객체 key 순서와 무관하게 같은 canonical JSON을 생성한다', () => {
  const left = { z: 3, nested: { b: 2, a: 1 }, a: '한글' };
  const right = { a: '한글', nested: { a: 1, b: 2 }, z: 3 };

  assert.equal(canonicalizeJson(left), canonicalizeJson(right));
  assert.equal(
    canonicalizeJson(left),
    '{"a":"한글","nested":{"a":1,"b":2},"z":3}',
  );
});

test('배열 순서, null, Date, BigInt와 Decimal projection을 보존한다', () => {
  const value = {
    array: [2, 1, null],
    bigint: BigInt('9007199254740993'),
    date: new Date('2026-06-20T00:00:00.000Z'),
    decimal: new Decimal('-001.2300e+2'),
  };

  assert.equal(
    canonicalizeJson(value),
    '{"array":[2,1,null],"bigint":"9007199254740993","date":"2026-06-20T00:00:00.000Z","decimal":"-123"}',
  );
});

test('domain-separated SHA-256 입력과 lowercase digest를 고정한다', () => {
  const value = { a: '한글', b: 1, nil: null };
  const canonical = canonicalizeJson(value);
  const expected = createHash('sha256')
    .update(`${FINAL_APPROVAL_HASH_DOMAINS.payload}\n${canonical}`, 'utf8')
    .digest('hex');

  const actual = sha256DomainHash(FINAL_APPROVAL_HASH_DOMAINS.payload, value);
  assert.equal(actual, expected);
  assert.match(actual, /^[a-f0-9]{64}$/);
  assert.notEqual(
    actual,
    sha256DomainHash(FINAL_APPROVAL_HASH_DOMAINS.validation, value),
  );
});

test('undefined, 비정상 숫자와 sparse array를 거부한다', () => {
  assert.throws(() => canonicalizeJson({ value: undefined }), /undefined/);
  assert.throws(() => canonicalizeJson({ value: Number.NaN }), /유한하지 않은 숫자/);
  assert.throws(() => canonicalizeJson(new Array(2)), /sparse array/);
});
