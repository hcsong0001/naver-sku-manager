import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  createNaverApiTokenProviderDisabled,
  requestNaverApiAccessTokenDisabled,
  buildNaverApiTokenRequestDisabledResult,
  sanitizeNaverApiTokenProviderResult,
  summarizeNaverApiTokenProviderReadiness,
} from './sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import type {
  NaverApiTokenProviderDisabledInput,
} from './sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';

// ── 공통 Auth Config Safe Reader 픽스처 ──────────────────────────────────────

const AUTH_CONFIG_CONFIGURED = {
  ok: true as const,
  credentialConfigured: true,
  authConfigUsable: false as const,
  authConfigStatus: 'CONFIGURED_BUT_BLOCKED' as const,
  clientIdStatus: 'configured' as const,
  clientSecretStatus: 'configured' as const,
  tokenStatus: 'disabled' as const,
  naverApiCallAllowed: false as const,
  liveExecutionEnabled: false as const,
  httpRequestCreated: false as const,
  endpointCalled: false as const,
  accessTokenRequested: false as const,
  credentialsUsed: false as const,
  tokenIssued: false as const,
  authorizationHeaderCreated: false as const,
  operatingDbWriteAllowed: false as const,
  queueAllowed: false as const,
  workerAllowed: false as const,
  secretVisible: false as const,
  sanitized: true as const,
  checklistItems: [],
  blockingReasons: [],
  warnings: [],
  maxAllowedState: 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED' as const,
};

const AUTH_CONFIG_MISSING = {
  ...AUTH_CONFIG_CONFIGURED,
  ok: false as const,
  credentialConfigured: false,
  authConfigStatus: 'MISSING' as const,
  clientIdStatus: 'missing' as const,
  clientSecretStatus: 'missing' as const,
};

const BASE_INPUT: NaverApiTokenProviderDisabledInput = {
  authConfigSafety: AUTH_CONFIG_CONFIGURED,
  requestedAction: 'test',
  allowTokenRequest: false,
  allowCredentialUse: false,
  allowEndpointCall: false,
};

// ── 1. 기본 disabled 결과 ─────────────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — basic disabled result', () => {
  it('1. disabled token provider 생성 가능', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.ok(result !== undefined, '결과가 반환되어야 함');
    assert.ok(typeof result === 'object', '객체여야 함');
  });

  it('2. request token 호출 결과는 ok=false', () => {
    const result = requestNaverApiAccessTokenDisabled(BASE_INPUT);
    assert.strictEqual(result.ok, false);
  });

  it('3. status=DISABLED', () => {
    const result = buildNaverApiTokenRequestDisabledResult(BASE_INPUT);
    assert.strictEqual(result.status, 'DISABLED');
  });

  it('4. resultCode=NAVER_AUTH_TOKEN_REQUEST_DISABLED', () => {
    const result = buildNaverApiTokenRequestDisabledResult(BASE_INPUT);
    assert.strictEqual(result.resultCode, 'NAVER_AUTH_TOKEN_REQUEST_DISABLED');
  });
});

// ── 2. 항상 false인 필드들 ────────────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — invariants always false', () => {
  it('5. accessTokenRequested=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('6. refreshTokenRequested=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.refreshTokenRequested, false);
  });

  it('7. tokenIssued=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.tokenIssued, false);
  });

  it('8. tokenStored=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.tokenStored, false);
  });

  it('9. credentialsUsed=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.credentialsUsed, false);
  });

  it('10. authorizationHeaderCreated=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  it('11. endpointCalled=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.endpointCalled, false);
  });

  it('12. httpRequestCreated=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.httpRequestCreated, false);
  });

  it('13. naverApiCallAllowed=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  it('14. liveExecutionEnabled=false', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result.liveExecutionEnabled, false);
  });
});

// ── 3. authConfigSafety configured 상태여도 차단 유지 ─────────────────────────

describe('NaverApiTokenProviderDisabled — auth config configured still blocked', () => {
  it('15. authConfigSafety.credentialConfigured=true여도 tokenIssued=false', () => {
    const result = createNaverApiTokenProviderDisabled({
      ...BASE_INPUT,
      authConfigSafety: AUTH_CONFIG_CONFIGURED,
    });
    assert.strictEqual(result.tokenIssued, false);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.credentialsUsed, false);
  });
});

// ── 4. allowX 입력이 무시되는지 확인 ─────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — allow flags always ignored', () => {
  it('16. allowTokenRequest=true가 들어와도 accessTokenRequested=false', () => {
    const result = createNaverApiTokenProviderDisabled({
      ...BASE_INPUT,
      allowTokenRequest: true,
    });
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.tokenIssued, false);
  });

  it('17. allowCredentialUse=true가 들어와도 credentialsUsed=false', () => {
    const result = createNaverApiTokenProviderDisabled({
      ...BASE_INPUT,
      allowCredentialUse: true,
    });
    assert.strictEqual(result.credentialsUsed, false);
    assert.strictEqual(result.authConfigUsable, false);
  });

  it('18. allowEndpointCall=true가 들어와도 endpointCalled=false', () => {
    const result = createNaverApiTokenProviderDisabled({
      ...BASE_INPUT,
      allowEndpointCall: true,
    });
    assert.strictEqual(result.endpointCalled, false);
    assert.strictEqual(result.httpRequestCreated, false);
  });
});

// ── 5. 민감정보 비노출 확인 ────────────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — no sensitive values in result', () => {
  it('19. 결과에 access token 원문 값이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const json = JSON.stringify(result).toLowerCase();
    // access token 원문 값 형식(Bearer JWT, eyJ...) 금지 — field name(accessTokenRequested)은 허용
    assert.ok(!json.includes('bearer '), 'Bearer token 문자열 포함 금지');
    assert.ok(!json.includes('eyj'), 'JWT access token 형식(eyJ...) 포함 금지');
    // 실제 token 발급 여부 확인
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.tokenIssued, false);
  });

  it('20. 결과에 refresh token 원문 값이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const json = JSON.stringify(result).toLowerCase();
    // refresh token 원문 값(eyJ... 형식) 금지 — field name(refreshTokenRequested)은 허용
    assert.ok(!json.includes('eyj'), 'JWT refresh token 형식(eyJ...) 포함 금지');
    assert.strictEqual(result.refreshTokenRequested, false);
    assert.strictEqual(result.tokenStored, false);
  });

  it('21. 결과에 client secret/API key 문자열이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderDisabled({
      ...BASE_INPUT,
      authConfigSafety: {
        ...AUTH_CONFIG_CONFIGURED,
      },
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('some-secret-value'), 'client secret 원문 포함 금지');
    assert.ok(!json.includes('some-api-key'), 'API key 원문 포함 금지');
  });

  it('22. 결과에 authorization header가 포함되지 않음', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const json = JSON.stringify(result).toLowerCase();
    assert.ok(!json.includes('authorization: bearer'), 'authorization header 포함 금지');
    assert.ok(!json.includes('https://api'), 'endpoint URL 포함 금지');
  });

  it('23. 결과에 DATABASE_URL / REDIS_URL 원문이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('postgresql://'), 'DATABASE_URL 원문 포함 금지');
    assert.ok(!json.includes('redis://'), 'REDIS_URL 원문 포함 금지');
  });

  it('24. 마스킹된 secret도 반환하지 않음', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('****'), '마스킹 패턴(****) 포함 금지');
    assert.strictEqual(result.secretVisible, false);
    assert.strictEqual(result.tokenVisible, false);
  });
});

// ── 6. checklistItems 검증 ────────────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — checklist items', () => {
  it('25. checklistItems가 disabled 상태를 명확히 표시', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.ok(Array.isArray(result.checklistItems), 'checklistItems는 배열');
    assert.ok(result.checklistItems.length > 0, 'checklistItems가 비어 있으면 안 됨');

    const disabledItem = result.checklistItems.find(i => i.key === 'TOKEN_PROVIDER_DISABLED');
    assert.ok(disabledItem, 'TOKEN_PROVIDER_DISABLED 항목이 있어야 함');
    assert.strictEqual(disabledItem?.status, 'PASS');
  });

  it('checklistItems에 민감정보 포함 금지', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    for (const item of result.checklistItems) {
      const itemJson = JSON.stringify(item).toLowerCase();
      assert.ok(!itemJson.includes('bearer '), `checklistItem에 bearer header 포함 금지: ${item.key}`);
      assert.ok(!itemJson.includes('https://api'), `checklistItem에 endpoint URL 포함 금지: ${item.key}`);
      assert.ok(!itemJson.includes('****'), `checklistItem에 마스킹 패턴 포함 금지: ${item.key}`);
    }
  });
});

// ── 7. maxAllowedState 검증 ────────────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — maxAllowedState', () => {
  it('26. maxAllowedState가 disabled 계열만 반환', () => {
    const inputs: NaverApiTokenProviderDisabledInput[] = [
      BASE_INPUT,
      { authConfigSafety: AUTH_CONFIG_MISSING },
      {},
      { allowTokenRequest: true, allowCredentialUse: true, allowEndpointCall: true },
    ];
    for (const input of inputs) {
      const result = createNaverApiTokenProviderDisabled(input);
      assert.strictEqual(
        result.maxAllowedState,
        'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED'
      );
    }
  });
});

// ── 8. malformed input 안전 처리 ─────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — malformed / null input', () => {
  it('27. malformed input도 throw하지 않고 disabled result 반환', () => {
    assert.doesNotThrow(() => {
      const result = createNaverApiTokenProviderDisabled(null);
      assert.strictEqual(result.status, 'DISABLED');
      assert.strictEqual(result.accessTokenRequested, false);
    });
  });

  it('input 없이 호출해도 throw하지 않음', () => {
    assert.doesNotThrow(() => {
      const result = createNaverApiTokenProviderDisabled();
      assert.strictEqual(result.ok, false);
      assert.strictEqual(result.tokenIssued, false);
    });
  });

  it('authConfigSafety=null이어도 throw하지 않음', () => {
    assert.doesNotThrow(() => {
      const result = createNaverApiTokenProviderDisabled({ authConfigSafety: null });
      assert.strictEqual(result.status, 'DISABLED');
    });
  });

  it('authConfigSafety=undefined이어도 throw하지 않음', () => {
    assert.doesNotThrow(() => {
      const result = createNaverApiTokenProviderDisabled({ authConfigSafety: undefined });
      assert.strictEqual(result.status, 'DISABLED');
    });
  });
});

// ── 9. sanitizeNaverApiTokenProviderResult 강제 적용 ─────────────────────────

describe('sanitizeNaverApiTokenProviderResult', () => {
  it('어떤 값이 들어와도 invariant 필드를 강제로 false/disabled로 재설정', () => {
    const tampered = sanitizeNaverApiTokenProviderResult({
      ok: true as unknown as false,
      success: true as unknown as false,
      status: 'ENABLED' as unknown as 'DISABLED',
      resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED',
      resultMessage: 'test',
      tokenStatus: 'active' as unknown as 'disabled',
      authConfigUsable: true as unknown as false,
      naverApiCallAllowed: true as unknown as false,
      liveExecutionEnabled: true as unknown as false,
      httpRequestCreated: true as unknown as false,
      endpointCalled: true as unknown as false,
      accessTokenRequested: true as unknown as false,
      refreshTokenRequested: true as unknown as false,
      credentialsUsed: true as unknown as false,
      tokenIssued: true as unknown as false,
      tokenStored: true as unknown as false,
      authorizationHeaderCreated: true as unknown as false,
      operatingDbWriteAllowed: true as unknown as false,
      queueAllowed: true as unknown as false,
      workerAllowed: true as unknown as false,
      secretVisible: true as unknown as false,
      tokenVisible: true as unknown as false,
      sanitized: false as unknown as true,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      maxAllowedState: 'OTHER' as unknown as 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED',
    });

    assert.strictEqual(tampered.ok, false);
    assert.strictEqual(tampered.success, false);
    assert.strictEqual(tampered.status, 'DISABLED');
    assert.strictEqual(tampered.tokenStatus, 'disabled');
    assert.strictEqual(tampered.authConfigUsable, false);
    assert.strictEqual(tampered.accessTokenRequested, false);
    assert.strictEqual(tampered.refreshTokenRequested, false);
    assert.strictEqual(tampered.credentialsUsed, false);
    assert.strictEqual(tampered.tokenIssued, false);
    assert.strictEqual(tampered.tokenStored, false);
    assert.strictEqual(tampered.authorizationHeaderCreated, false);
    assert.strictEqual(tampered.endpointCalled, false);
    assert.strictEqual(tampered.httpRequestCreated, false);
    assert.strictEqual(tampered.naverApiCallAllowed, false);
    assert.strictEqual(tampered.liveExecutionEnabled, false);
    assert.strictEqual(tampered.secretVisible, false);
    assert.strictEqual(tampered.tokenVisible, false);
    assert.strictEqual(tampered.sanitized, true);
    assert.strictEqual(
      tampered.maxAllowedState,
      'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED'
    );
  });
});

// ── 10. summarizeNaverApiTokenProviderReadiness ───────────────────────────────

describe('summarizeNaverApiTokenProviderReadiness', () => {
  it('요약 메시지가 문자열로 반환됨', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const summary = summarizeNaverApiTokenProviderReadiness(result);
    assert.ok(typeof summary === 'string' && summary.length > 0, '요약 문자열이 반환되어야 함');
    assert.ok(summary.includes('NAVER_AUTH_TOKEN_REQUEST_DISABLED'), '결과 코드가 포함되어야 함');
  });
});

// ── 11. Auth Config missing 상태에서도 disabled 유지 ─────────────────────────

describe('NaverApiTokenProviderDisabled — auth config missing state', () => {
  it('authConfigSafety.credentialConfigured=false여도 token 차단 유지', () => {
    const result = createNaverApiTokenProviderDisabled({
      ...BASE_INPUT,
      authConfigSafety: AUTH_CONFIG_MISSING,
    });
    assert.strictEqual(result.tokenIssued, false);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.strictEqual(result.credentialsUsed, false);
    assert.strictEqual(result.status, 'DISABLED');
  });
});

// ── 12. 순수 함수 특성 ────────────────────────────────────────────────────────

describe('NaverApiTokenProviderDisabled — no side effects', () => {
  it('함수 호출이 동기적으로 완료되고 외부 상태를 변경하지 않음', () => {
    const result = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.ok(result !== undefined, '동기 결과 반환');
    assert.ok(typeof result === 'object', '객체 반환');
  });

  it('같은 입력으로 두 번 호출해도 동일한 결과', () => {
    const result1 = createNaverApiTokenProviderDisabled(BASE_INPUT);
    const result2 = createNaverApiTokenProviderDisabled(BASE_INPUT);
    assert.strictEqual(result1.status, result2.status);
    assert.strictEqual(result1.resultCode, result2.resultCode);
    assert.strictEqual(result1.tokenIssued, result2.tokenIssued);
  });
});
