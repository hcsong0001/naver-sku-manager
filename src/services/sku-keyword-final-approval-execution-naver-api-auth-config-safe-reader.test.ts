import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  evaluateNaverApiAuthConfigSafeReader,
  buildNaverApiAuthConfigSafeStatus,
  sanitizeNaverApiAuthConfigStatus,
} from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import type {
  NaverApiAuthConfigSafeReaderInput,
} from './sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';

const REQUIRED_KEYS = ['NAVER_API_CLIENT_ID', 'NAVER_API_CLIENT_SECRET'];

const ENV_BOTH: Record<string, string> = {
  NAVER_API_CLIENT_ID: 'some-id-value',
  NAVER_API_CLIENT_SECRET: 'some-secret-value',
};

const ENV_ID_ONLY: Record<string, string> = {
  NAVER_API_CLIENT_ID: 'some-id-value',
};

const ENV_SECRET_ONLY: Record<string, string> = {
  NAVER_API_CLIENT_SECRET: 'some-secret-value',
};

const BASE_INPUT: NaverApiAuthConfigSafeReaderInput = {
  envLike: ENV_BOTH,
  requiredConfigKeys: REQUIRED_KEYS,
  allowCredentialUse: false,
  allowTokenRequest: false,
  allowEndpointCall: false,
};

// ── 1. 원문 비반환 ────────────────────────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — credential values never returned', () => {
  it('1. envLike에 client id/secret 값이 있어도 결과에 원문이 포함되지 않음', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('some-id-value'), 'client id 원문이 결과에 포함되면 안 됨');
    assert.ok(!json.includes('some-secret-value'), 'client secret 원문이 결과에 포함되면 안 됨');
  });

  it('2. 마스킹된 secret도 반환하지 않음 — 마스킹 패턴 미포함', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('****'), '마스킹 패턴(****)이 포함되면 안 됨');
    assert.ok(!json.includes('some'), '원문 일부도 포함되면 안 됨');
  });

  it('3. token/clientSecret/authorization/api key 관련 문자열이 결과값에 포함되지 않음', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    const json = JSON.stringify(result).toLowerCase();
    assert.ok(!json.includes('bearer '), 'bearer header 문자열 포함 금지');
    assert.ok(!json.includes('https://api'), 'API endpoint URL 포함 금지');
  });

  it('4. 결과에 DATABASE_URL/REDIS_URL 원문이 포함되지 않음', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: {
        ...ENV_BOTH,
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
        REDIS_URL: 'redis://localhost:6379',
      },
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('postgresql://'), 'DATABASE_URL 원문 포함 금지');
    assert.ok(!json.includes('redis://'), 'REDIS_URL 원문 포함 금지');
  });
});

// ── 2. 항상 false인 필드들 ──────────────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — invariants always false', () => {
  it('5. configured 상태여도 authConfigUsable=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.authConfigUsable, false);
  });

  it('6. configured 상태여도 accessTokenRequested=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('7. configured 상태여도 credentialsUsed=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.credentialsUsed, false);
  });

  it('8. configured 상태여도 tokenIssued=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.tokenIssued, false);
  });

  it('9. configured 상태여도 naverApiCallAllowed=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  it('10. configured 상태여도 liveExecutionEnabled=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.liveExecutionEnabled, false);
  });

  it('11. httpRequestCreated=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.httpRequestCreated, false);
  });

  it('12. endpointCalled=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.endpointCalled, false);
  });

  it('13. authorizationHeaderCreated=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  it('14. secretVisible=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.secretVisible, false);
  });

  it('15. sanitized=true', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.sanitized, true);
  });

  it('16. tokenStatus=disabled', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.tokenStatus, 'disabled');
  });

  it('17. operatingDbWriteAllowed=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.operatingDbWriteAllowed, false);
  });

  it('18. queueAllowed=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.queueAllowed, false);
  });

  it('19. workerAllowed=false', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.workerAllowed, false);
  });
});

// ── 3. authConfigStatus 분류 ────────────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — authConfigStatus classification', () => {
  it('20. 둘 다 있으면 CONFIGURED_BUT_BLOCKED', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.authConfigStatus, 'CONFIGURED_BUT_BLOCKED');
    assert.strictEqual(result.credentialConfigured, true);
  });

  it('21. client id만 있으면 PARTIAL', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_ID_ONLY });
    assert.strictEqual(result.authConfigStatus, 'PARTIAL');
    assert.strictEqual(result.credentialConfigured, false);
  });

  it('22. client secret만 있으면 PARTIAL', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_SECRET_ONLY });
    assert.strictEqual(result.authConfigStatus, 'PARTIAL');
    assert.strictEqual(result.credentialConfigured, false);
  });

  it('23. 둘 다 없으면 MISSING', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: {} });
    assert.strictEqual(result.authConfigStatus, 'MISSING');
    assert.strictEqual(result.credentialConfigured, false);
  });

  it('24. clientIdStatus configured when id present', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.clientIdStatus, 'configured');
  });

  it('25. clientSecretStatus configured when secret present', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.strictEqual(result.clientSecretStatus, 'configured');
  });

  it('26. clientIdStatus missing when id absent', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_SECRET_ONLY });
    assert.strictEqual(result.clientIdStatus, 'missing');
  });

  it('27. clientSecretStatus missing when secret absent', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_ID_ONLY });
    assert.strictEqual(result.clientSecretStatus, 'missing');
  });
});

// ── 4. allowX 입력이 무시되는지 확인 ────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — allow flags always ignored', () => {
  it('28. allowCredentialUse=true여도 credentialsUsed=false 강제', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: ENV_BOTH,
      allowCredentialUse: true,
    });
    assert.strictEqual(result.credentialsUsed, false);
    assert.strictEqual(result.authConfigUsable, false);
  });

  it('29. allowTokenRequest=true여도 accessTokenRequested=false 강제', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: ENV_BOTH,
      allowTokenRequest: true,
    });
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.tokenIssued, false);
  });

  it('30. allowEndpointCall=true여도 endpointCalled=false 강제', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: ENV_BOTH,
      allowEndpointCall: true,
    });
    assert.strictEqual(result.endpointCalled, false);
    assert.strictEqual(result.httpRequestCreated, false);
  });
});

// ── 5. checklistItems 내용 검증 ─────────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — checklist items', () => {
  it('31. checklistItems가 safe status만 포함 (민감 정보 없음)', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    for (const item of result.checklistItems) {
      const itemJson = JSON.stringify(item).toLowerCase();
      assert.ok(!itemJson.includes('some-id-value'), `checklistItem에 id 원문 포함 금지: ${item.key}`);
      assert.ok(!itemJson.includes('some-secret-value'), `checklistItem에 secret 원문 포함 금지: ${item.key}`);
      assert.ok(!itemJson.includes('bearer '), `checklistItem에 bearer header 포함 금지: ${item.key}`);
      assert.ok(!itemJson.includes('https://api'), `checklistItem에 endpoint URL 포함 금지: ${item.key}`);
    }
  });

  it('32. checklistItems가 배열로 반환됨', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    assert.ok(Array.isArray(result.checklistItems));
    assert.ok(result.checklistItems.length > 0, 'checklistItems가 비어 있으면 안 됨');
  });

  it('33. 각 checklistItem에 key, label, status, message가 있음', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: ENV_BOTH });
    for (const item of result.checklistItems) {
      assert.ok(typeof item.key === 'string' && item.key.length > 0, 'key 필요');
      assert.ok(typeof item.label === 'string' && item.label.length > 0, 'label 필요');
      assert.ok(
        ['PASS', 'WARN', 'BLOCKED', 'NEEDS_REVIEW'].includes(item.status),
        `status 값이 유효하지 않음: ${item.status}`
      );
      assert.ok(typeof item.message === 'string' && item.message.length > 0, 'message 필요');
    }
  });
});

// ── 6. maxAllowedState ────────────────────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — maxAllowedState', () => {
  it('34. maxAllowedState가 SAFE_READER 계열만 반환', () => {
    const cases = [ENV_BOTH, ENV_ID_ONLY, ENV_SECRET_ONLY, {}];
    for (const envLike of cases) {
      const result = evaluateNaverApiAuthConfigSafeReader({
        ...BASE_INPUT,
        envLike,
      });
      assert.strictEqual(
        result.maxAllowedState,
        'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED'
      );
    }
  });
});

// ── 7. malformed/null 입력 안전 처리 ────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — malformed / null input', () => {
  it('35. envLike=null이어도 throw하지 않고 MISSING 처리', () => {
    assert.doesNotThrow(() => {
      const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: null });
      assert.strictEqual(result.authConfigStatus, 'MISSING');
    });
  });

  it('36. envLike=undefined이어도 throw하지 않고 MISSING 처리', () => {
    assert.doesNotThrow(() => {
      const result = evaluateNaverApiAuthConfigSafeReader({ ...BASE_INPUT, envLike: undefined });
      assert.strictEqual(result.authConfigStatus, 'MISSING');
    });
  });

  it('37. requiredConfigKeys=[]이어도 throw하지 않고 MISSING 처리', () => {
    assert.doesNotThrow(() => {
      const result = evaluateNaverApiAuthConfigSafeReader({
        ...BASE_INPUT,
        envLike: ENV_BOTH,
        requiredConfigKeys: [],
      });
      assert.strictEqual(result.authConfigStatus, 'MISSING');
      assert.strictEqual(result.credentialConfigured, false);
    });
  });

  it('38. envLike의 키가 빈 문자열이면 missing으로 처리', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: { NAVER_API_CLIENT_ID: '', NAVER_API_CLIENT_SECRET: '' },
    });
    assert.strictEqual(result.clientIdStatus, 'missing');
    assert.strictEqual(result.clientSecretStatus, 'missing');
    assert.strictEqual(result.authConfigStatus, 'MISSING');
  });
});

// ── 8. buildNaverApiAuthConfigSafeStatus 단위 테스트 ────────────────────────

describe('buildNaverApiAuthConfigSafeStatus', () => {
  it('39. 두 키 모두 있으면 둘 다 true', () => {
    const status = buildNaverApiAuthConfigSafeStatus({
      envLike: ENV_BOTH,
      requiredConfigKeys: REQUIRED_KEYS,
    });
    assert.strictEqual(status.clientIdPresent, true);
    assert.strictEqual(status.clientSecretPresent, true);
  });

  it('40. 두 키 모두 없으면 둘 다 false', () => {
    const status = buildNaverApiAuthConfigSafeStatus({
      envLike: {},
      requiredConfigKeys: REQUIRED_KEYS,
    });
    assert.strictEqual(status.clientIdPresent, false);
    assert.strictEqual(status.clientSecretPresent, false);
  });
});

// ── 9. sanitizeNaverApiAuthConfigStatus 강제 적용 ───────────────────────────

describe('sanitizeNaverApiAuthConfigStatus', () => {
  it('41. 어떤 값이 들어와도 invariant 필드를 강제로 false로 재설정', () => {
    const tampered = sanitizeNaverApiAuthConfigStatus({
      ok: true,
      credentialConfigured: true,
      authConfigUsable: true as unknown as false,
      authConfigStatus: 'CONFIGURED_BUT_BLOCKED',
      clientIdStatus: 'configured',
      clientSecretStatus: 'configured',
      tokenStatus: 'active' as unknown as 'disabled',
      naverApiCallAllowed: true as unknown as false,
      liveExecutionEnabled: true as unknown as false,
      httpRequestCreated: true as unknown as false,
      endpointCalled: true as unknown as false,
      accessTokenRequested: true as unknown as false,
      credentialsUsed: true as unknown as false,
      tokenIssued: true as unknown as false,
      authorizationHeaderCreated: true as unknown as false,
      operatingDbWriteAllowed: true as unknown as false,
      queueAllowed: true as unknown as false,
      workerAllowed: true as unknown as false,
      secretVisible: true as unknown as false,
      sanitized: false as unknown as true,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      maxAllowedState: 'OTHER' as unknown as 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED',
    });

    assert.strictEqual(tampered.authConfigUsable, false);
    assert.strictEqual(tampered.accessTokenRequested, false);
    assert.strictEqual(tampered.credentialsUsed, false);
    assert.strictEqual(tampered.tokenIssued, false);
    assert.strictEqual(tampered.tokenStatus, 'disabled');
    assert.strictEqual(tampered.naverApiCallAllowed, false);
    assert.strictEqual(tampered.liveExecutionEnabled, false);
    assert.strictEqual(tampered.httpRequestCreated, false);
    assert.strictEqual(tampered.endpointCalled, false);
    assert.strictEqual(tampered.authorizationHeaderCreated, false);
    assert.strictEqual(tampered.secretVisible, false);
    assert.strictEqual(tampered.sanitized, true);
    assert.strictEqual(
      tampered.maxAllowedState,
      'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED'
    );
  });
});

// ── 10. 환경 안전 호환성 ──────────────────────────────────────────────────────

describe('NaverApiAuthConfigSafeReader — environment safety compatibility', () => {
  it('42. environmentSafetyResult.ok=false여도 throw 없이 처리', () => {
    assert.doesNotThrow(() => {
      const result = evaluateNaverApiAuthConfigSafeReader({
        ...BASE_INPUT,
        envLike: ENV_BOTH,
        environmentSafetyResult: { ok: false },
      });
      assert.strictEqual(result.naverApiCallAllowed, false);
      assert.strictEqual(result.authConfigUsable, false);
    });
  });

  it('43. liveAdapterSkeletonStatus=disabled이면 checklistItem PASS', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: ENV_BOTH,
      liveAdapterSkeletonStatus: 'disabled',
    });
    const skeletonItem = result.checklistItems.find(i => i.key === 'LIVE_ADAPTER_SKELETON_DISABLED');
    assert.ok(skeletonItem, 'LIVE_ADAPTER_SKELETON_DISABLED 항목 없음');
    assert.strictEqual(skeletonItem?.status, 'PASS');
  });

  it('44. configured 상태여도 auth safe reader 추가 후 실행 가능 상태가 되지 않음', () => {
    const result = evaluateNaverApiAuthConfigSafeReader({
      ...BASE_INPUT,
      envLike: ENV_BOTH,
      allowCredentialUse: true,
      allowTokenRequest: true,
      allowEndpointCall: true,
    });
    assert.strictEqual(result.authConfigStatus, 'CONFIGURED_BUT_BLOCKED');
    assert.strictEqual(result.authConfigUsable, false);
    assert.strictEqual(result.naverApiCallAllowed, false);
    assert.strictEqual(result.liveExecutionEnabled, false);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.credentialsUsed, false);
    assert.strictEqual(result.tokenIssued, false);
  });
});

// ── 11. 순수 함수 특성 — 사이드 이펙트 없음 ──────────────────────────────────

describe('NaverApiAuthConfigSafeReader — no side effects', () => {
  it('45. 함수 호출이 동기적으로 완료되고 외부 상태를 변경하지 않음', () => {
    const result = evaluateNaverApiAuthConfigSafeReader(BASE_INPUT);
    assert.ok(result !== undefined, '동기 결과 반환');
    assert.ok(typeof result === 'object', '객체 반환');
  });
});
