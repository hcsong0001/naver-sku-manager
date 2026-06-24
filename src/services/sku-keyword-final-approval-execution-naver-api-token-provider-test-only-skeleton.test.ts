import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  createNaverApiTokenProviderTestOnlySkeleton,
  prepareNaverApiTokenTestOnlyRequestSkeleton,
  buildNaverApiTokenTestOnlyNotExecutedResult,
  sanitizeNaverApiTokenTestOnlySkeletonResult,
  summarizeNaverApiTokenTestOnlyReadiness,
} from './sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service';
import type {
  NaverApiTokenProviderTestOnlySkeletonInput,
} from './sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service';

// ── 공통 픽스처 ───────────────────────────────────────────────────────────────

const ENV_SAFETY_OK = {
  allowed: true,
  environmentCode: 'LOCAL_SAFE',
  environmentMessage: 'local env',
  databaseEnvironment: 'local' as const,
  redisEnvironment: 'local' as const,
  naverApiCallAllowed: false as const,
  operatingDbWriteAllowed: false as const,
  queueAllowed: false as const,
  workerAllowed: false as const,
  checklistItems: [],
  blockingReasons: [],
  warnings: [],
  sanitized: true as const,
};

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

const TOKEN_PROVIDER_DISABLED = {
  ok: false as const,
  success: false as const,
  status: 'DISABLED' as const,
  resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED' as const,
  resultMessage: 'token provider disabled',
  tokenStatus: 'disabled' as const,
  authConfigUsable: false as const,
  naverApiCallAllowed: false as const,
  liveExecutionEnabled: false as const,
  httpRequestCreated: false as const,
  endpointCalled: false as const,
  accessTokenRequested: false as const,
  refreshTokenRequested: false as const,
  credentialsUsed: false as const,
  tokenIssued: false as const,
  tokenStored: false as const,
  authorizationHeaderCreated: false as const,
  operatingDbWriteAllowed: false as const,
  queueAllowed: false as const,
  workerAllowed: false as const,
  secretVisible: false as const,
  tokenVisible: false as const,
  sanitized: true as const,
  checklistItems: [],
  blockingReasons: [],
  warnings: [],
  maxAllowedState: 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED' as const,
};

const DRY_GATE_PASSED = {
  ok: true,
  allowed: false as const,
  status: 'DISABLED' as const,
  resultCode: 'NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED' as const,
  resultMessage: 'dry check passed',
  dryCheckPassed: true,
  tokenRequestAllowed: false as const,
  tokenStatus: 'disabled' as const,
  authConfigUsable: false as const,
  naverApiCallAllowed: false as const,
  liveExecutionEnabled: false as const,
  httpRequestCreated: false as const,
  endpointCalled: false as const,
  accessTokenRequested: false as const,
  refreshTokenRequested: false as const,
  credentialsUsed: false as const,
  tokenIssued: false as const,
  tokenStored: false as const,
  authorizationHeaderCreated: false as const,
  operatingDbWriteAllowed: false as const,
  queueAllowed: false as const,
  workerAllowed: false as const,
  secretVisible: false as const,
  tokenVisible: false as const,
  sanitized: true as const,
  checklistItems: [],
  blockingReasons: [],
  warnings: [],
  needsReviewReasons: [],
  maxAllowedState: 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED' as const,
};

const DRY_GATE_BLOCKED = {
  ...DRY_GATE_PASSED,
  ok: false,
  status: 'BLOCKED' as const,
  resultCode: 'NAVER_AUTH_TOKEN_REQUEST_BLOCKED_BY_DRY_PERMISSION_GATE' as const,
  dryCheckPassed: false,
  resultMessage: 'dry gate blocked',
  blockingReasons: ['FinalApproval이 ACTIVE 상태가 아닙니다.'],
};

const FULL_INPUT: NaverApiTokenProviderTestOnlySkeletonInput = {
  authConfigSafety: AUTH_CONFIG_CONFIGURED,
  tokenProviderDisabledStatus: TOKEN_PROVIDER_DISABLED,
  tokenDryPermissionGate: DRY_GATE_PASSED,
  environmentSafetyResult: ENV_SAFETY_OK,
  requestedAction: 'test',
  allowTokenRequest: false,
  allowCredentialUse: false,
  allowEndpointResolve: false,
  allowEndpointCall: false,
  actorId: 'actor-1',
  finalApprovalId: 'fa-1',
  batchJobId: 'job-1',
};

// ── 1. 기본 반환값 ─────────────────────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — 기본 반환값', () => {
  it('1. test-only skeleton 생성 가능', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.ok(result !== undefined && typeof result === 'object');
  });

  it('2. prepareNaverApiTokenTestOnlyRequestSkeleton도 동일 결과 반환', () => {
    const r1 = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const r2 = prepareNaverApiTokenTestOnlyRequestSkeleton(FULL_INPUT);
    assert.strictEqual(r1.resultCode, r2.resultCode);
    assert.strictEqual(r1.testOnlyMode, r2.testOnlyMode);
  });

  it('3. ok=false', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.strictEqual(result.ok, false);
  });

  it('4. success=false', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.strictEqual(result.success, false);
  });

  it('5. status는 DISABLED 또는 NOT_EXECUTED', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.ok(result.status === 'DISABLED' || result.status === 'NOT_EXECUTED');
  });
});

// ── 2. 불변 조건 — testOnlyMode ───────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — testOnlyMode 불변 조건', () => {
  it('6. testOnlyMode=true', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.strictEqual(result.testOnlyMode, true);
  });

  it('7. testOnlyMode는 null/undefined 입력에도 true', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton();
    assert.strictEqual(result.testOnlyMode, true);
  });
});

// ── 3. 불변 조건 — token 발급 관련 ────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — token 발급 불변 조건', () => {
  it('8. tokenRequestPrepared=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).tokenRequestPrepared, false);
  });

  it('9. tokenRequestExecuted=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).tokenRequestExecuted, false);
  });

  it('10. tokenRequestAllowed=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).tokenRequestAllowed, false);
  });

  it('11. accessTokenRequested=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).accessTokenRequested, false);
  });

  it('12. refreshTokenRequested=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).refreshTokenRequested, false);
  });

  it('13. tokenIssued=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).tokenIssued, false);
  });

  it('14. tokenStored=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).tokenStored, false);
  });

  it('15. credentialsUsed=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).credentialsUsed, false);
  });

  it('16. authorizationHeaderCreated=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).authorizationHeaderCreated, false);
  });
});

// ── 4. 불변 조건 — endpoint/HTTP 관련 ────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — endpoint/HTTP 불변 조건', () => {
  it('17. endpointResolved=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).endpointResolved, false);
  });

  it('18. endpointCalled=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).endpointCalled, false);
  });

  it('19. httpRequestCreated=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).httpRequestCreated, false);
  });

  it('20. httpClientCreated=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).httpClientCreated, false);
  });

  it('21. naverApiCallAllowed=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).naverApiCallAllowed, false);
  });

  it('22. liveExecutionEnabled=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).liveExecutionEnabled, false);
  });
});

// ── 5. dryPermissionPassed 동작 ───────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — dryPermissionPassed', () => {
  it('23. dryPermissionPassed=true여도 tokenIssued=false', () => {
    const input = { ...FULL_INPUT, tokenDryPermissionGate: DRY_GATE_PASSED };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.dryPermissionPassed, true);
    assert.strictEqual(result.tokenIssued, false);
  });

  it('24. dryPermissionPassed=true여도 tokenRequestExecuted=false', () => {
    const input = { ...FULL_INPUT, tokenDryPermissionGate: DRY_GATE_PASSED };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.dryPermissionPassed, true);
    assert.strictEqual(result.tokenRequestExecuted, false);
  });

  it('25. dryPermissionPassed=true여도 tokenRequestAllowed=false', () => {
    const input = { ...FULL_INPUT, tokenDryPermissionGate: DRY_GATE_PASSED };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.dryPermissionPassed, true);
    assert.strictEqual(result.tokenRequestAllowed, false);
  });

  it('26. dryPermissionPassed=true여도 accessTokenRequested=false', () => {
    const input = { ...FULL_INPUT, tokenDryPermissionGate: DRY_GATE_PASSED };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.dryPermissionPassed, true);
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('27. Dry Gate blocked 시 dryPermissionPassed=false', () => {
    const input = { ...FULL_INPUT, tokenDryPermissionGate: DRY_GATE_BLOCKED };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.dryPermissionPassed, false);
  });

  it('28. Dry Gate 미제공 시 dryPermissionPassed=false', () => {
    const input = { ...FULL_INPUT, tokenDryPermissionGate: null };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.dryPermissionPassed, false);
  });
});

// ── 6. allowX 입력 무시 ───────────────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — allowX 입력 무시', () => {
  it('29. allowTokenRequest=true가 들어와도 accessTokenRequested=false', () => {
    const input = { ...FULL_INPUT, allowTokenRequest: true };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.ok(result.warnings.some(w => w.includes('allowTokenRequest')));
  });

  it('30. allowCredentialUse=true가 들어와도 credentialsUsed=false', () => {
    const input = { ...FULL_INPUT, allowCredentialUse: true };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.credentialsUsed, false);
    assert.ok(result.warnings.some(w => w.includes('allowCredentialUse')));
  });

  it('31. allowEndpointResolve=true가 들어와도 endpointResolved=false', () => {
    const input = { ...FULL_INPUT, allowEndpointResolve: true };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.endpointResolved, false);
    assert.ok(result.warnings.some(w => w.includes('allowEndpointResolve')));
  });

  it('32. allowEndpointCall=true가 들어와도 endpointCalled=false', () => {
    const input = { ...FULL_INPUT, allowEndpointCall: true };
    const result = createNaverApiTokenProviderTestOnlySkeleton(input);
    assert.strictEqual(result.endpointCalled, false);
    assert.ok(result.warnings.some(w => w.includes('allowEndpointCall')));
  });
});

// ── 7. 결과에 secret/token/endpoint 미포함 ───────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — secret/token/endpoint 비노출', () => {
  it('33. 결과 JSON 문자열에 access token 원문 값이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    // snake_case token 값이 포함되지 않아야 함 (필드명 accessTokenRequested는 허용)
    assert.ok(!json.includes('access_token'));
  });

  it('34. 결과에 refresh token 원문 값이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    // snake_case token 값이 포함되지 않아야 함 (필드명 refreshTokenRequested는 허용)
    assert.ok(!json.includes('refresh_token'));
  });

  it('35. 결과에 client secret/API key 원문이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('client_secret'));
    assert.ok(!json.includes('clientSecret'));
    assert.ok(!json.includes('apiKey'));
    assert.ok(!json.includes('api_key'));
  });

  it('36. 결과에 authorization header가 포함되지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('Authorization'));
    assert.ok(!json.includes('Bearer '));
  });

  it('37. secretVisible=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).secretVisible, false);
  });

  it('38. tokenVisible=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).tokenVisible, false);
  });

  it('39. endpointVisible=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).endpointVisible, false);
  });

  it('40. 결과에 DATABASE_URL 원문이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('DATABASE_URL'));
    assert.ok(!json.includes('postgresql://'));
    assert.ok(!json.includes('postgres://'));
  });

  it('41. 결과에 endpoint URL이 포함되지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('https://api'));
    assert.ok(!json.includes('http://api'));
    assert.ok(!json.includes('oauth'));
    assert.ok(!json.includes('/token'));
  });

  it('42. 마스킹된 secret도 반환하지 않음', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('****'));
    assert.ok(!json.includes('...'));
  });
});

// ── 8. 방어 처리 ─────────────────────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — 방어 처리', () => {
  it('43. 입력 없이 호출해도 throw하지 않음', () => {
    assert.doesNotThrow(() => createNaverApiTokenProviderTestOnlySkeleton());
  });

  it('44. null 입력해도 throw하지 않음', () => {
    assert.doesNotThrow(() => createNaverApiTokenProviderTestOnlySkeleton(null));
  });

  it('45. 빈 객체 입력해도 throw하지 않음', () => {
    assert.doesNotThrow(() => createNaverApiTokenProviderTestOnlySkeleton({}));
  });

  it('46. 빈 객체 입력 시에도 testOnlyMode=true', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton({});
    assert.strictEqual(result.testOnlyMode, true);
  });

  it('47. 빈 객체 입력 시 checklistItems 배열 존재', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton({});
    assert.ok(Array.isArray(result.checklistItems));
    assert.ok(result.checklistItems.length > 0);
  });
});

// ── 9. sanitize 함수 ──────────────────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — sanitize 함수', () => {
  it('48. sanitize 후 testOnlyMode=true 유지', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestOnlySkeletonResult(result);
    assert.strictEqual(sanitized.testOnlyMode, true);
  });

  it('49. sanitize 후 tokenIssued=false 유지', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestOnlySkeletonResult(result);
    assert.strictEqual(sanitized.tokenIssued, false);
  });

  it('50. sanitize 후 maxAllowedState 유지', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestOnlySkeletonResult(result);
    assert.strictEqual(sanitized.maxAllowedState, 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED');
  });

  it('51. sanitize 후 endpointResolved=false 유지', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestOnlySkeletonResult(result);
    assert.strictEqual(sanitized.endpointResolved, false);
  });
});

// ── 10. checklistItems / maxAllowedState ─────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — checklist/maxAllowedState', () => {
  it('52. checklistItems에 TEST_ONLY_MODE_ACTIVE 키 존재', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.ok(result.checklistItems.some(i => i.key === 'TEST_ONLY_MODE_ACTIVE'));
  });

  it('53. checklistItems에 TOKEN_REQUEST_NOT_EXECUTED 키 존재', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.ok(result.checklistItems.some(i => i.key === 'TOKEN_REQUEST_NOT_EXECUTED'));
  });

  it('54. checklistItems에 ENDPOINT_NOT_RESOLVED 키 존재', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.ok(result.checklistItems.some(i => i.key === 'ENDPOINT_NOT_RESOLVED'));
  });

  it('55. maxAllowedState는 항상 NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    assert.strictEqual(result.maxAllowedState, 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED');
  });

  it('56. maxAllowedState는 빈 입력에서도 고정', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton({});
    assert.strictEqual(result.maxAllowedState, 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED');
  });
});

// ── 11. summarize 함수 ────────────────────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — summarize 함수', () => {
  it('57. 준비 완료 시 요약 문자열 반환', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const summary = summarizeNaverApiTokenTestOnlyReadiness(result);
    assert.ok(typeof summary === 'string' && summary.length > 0);
  });

  it('58. 준비 완료 시 요약에 "token 발급" 미실행 언급', () => {
    const result = createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT);
    const summary = summarizeNaverApiTokenTestOnlyReadiness(result);
    assert.ok(summary.includes('token') || summary.includes('skeleton'));
  });

  it('59. 미해결 항목 있을 때 요약에 개수 포함', () => {
    const result = buildNaverApiTokenTestOnlyNotExecutedResult({
      tokenDryPermissionGate: DRY_GATE_BLOCKED,
    });
    const summary = summarizeNaverApiTokenTestOnlyReadiness(result);
    assert.ok(summary.includes('미해결') || summary.includes('항목'));
  });
});

// ── 12. sanitized/불변 보호 관련 추가 ─────────────────────────────────────────

describe('NaverApiTokenTestOnlySkeleton — sanitized 보호', () => {
  it('60. sanitized=true', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).sanitized, true);
  });

  it('61. operatingDbWriteAllowed=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).operatingDbWriteAllowed, false);
  });

  it('62. queueAllowed=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).queueAllowed, false);
  });

  it('63. workerAllowed=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).workerAllowed, false);
  });

  it('64. authConfigUsable=false', () => {
    assert.strictEqual(createNaverApiTokenProviderTestOnlySkeleton(FULL_INPUT).authConfigUsable, false);
  });
});
