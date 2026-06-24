import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  evaluateNaverApiTokenDryPermissionGate,
  buildNaverApiTokenDryPermissionChecklist,
  sanitizeNaverApiTokenDryPermissionGateResult,
  summarizeNaverApiTokenDryPermissionReadiness,
} from './sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';
import type {
  NaverApiTokenDryPermissionGateInput,
} from './sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';

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

const FULL_PASSING_INPUT: NaverApiTokenDryPermissionGateInput = {
  authConfigSafety: AUTH_CONFIG_CONFIGURED,
  tokenProviderStatus: TOKEN_PROVIDER_DISABLED,
  environmentSafetyResult: ENV_SAFETY_OK,
  liveAdapterSkeletonStatus: 'disabled',
  liveSafetyGateResult: { allowed: false, code: 'BLOCKED' },
  livePreflightResult: { ready: true, blockingReasons: [] },
  liveSingleTestApproval: { approvalReady: true, blockingReasons: [] },
  liveSingleTestApprovalAudit: { auditCode: 'AUDIT_OK' },
  liveSingleTestAuditHistory: { exists: true },
  finalApprovalStatus: 'ACTIVE',
  batchJobStatus: 'APPROVED',
  itemStatuses: ['READY'],
  itemCount: 1,
  requestedAction: 'test',
  allowTokenRequest: false,
  allowCredentialUse: false,
  allowEndpointCall: false,
  actorId: 'actor-1',
  finalApprovalId: 'fa-1',
  batchJobId: 'job-1',
};

// ── 1. 기본 결과 불변 조건 ─────────────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — 불변 조건', () => {
  it('1. 결과 객체가 반환되어야 함', () => {
    const result = evaluateNaverApiTokenDryPermissionGate();
    assert.ok(result !== undefined && typeof result === 'object');
  });

  it('2. allowed는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.allowed, false);
  });

  it('3. tokenRequestAllowed는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.tokenRequestAllowed, false);
  });

  it('4. tokenStatus는 항상 disabled', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.tokenStatus, 'disabled');
  });

  it('5. accessTokenRequested는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('6. credentialsUsed는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.credentialsUsed, false);
  });

  it('7. tokenIssued는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.tokenIssued, false);
  });

  it('8. tokenStored는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.tokenStored, false);
  });

  it('9. authorizationHeaderCreated는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  it('10. secretVisible는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.secretVisible, false);
  });

  it('11. tokenVisible는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.tokenVisible, false);
  });

  it('12. sanitized는 항상 true', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.sanitized, true);
  });

  it('13. maxAllowedState는 항상 NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.maxAllowedState, 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED');
  });

  it('14. authConfigUsable는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.authConfigUsable, false);
  });

  it('15. naverApiCallAllowed는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  it('16. liveExecutionEnabled는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.liveExecutionEnabled, false);
  });

  it('17. endpointCalled는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.endpointCalled, false);
  });

  it('18. httpRequestCreated는 항상 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.httpRequestCreated, false);
  });
});

// ── 2. 모든 조건 충족 시 DISABLED 상태 ────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — 전체 통과 (dryCheckPassed)', () => {
  it('19. 모든 입력이 충족되면 dryCheckPassed=true', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.dryCheckPassed, true);
  });

  it('20. 모든 조건 통과 시 status=DISABLED', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.status, 'DISABLED');
  });

  it('21. 모든 조건 통과 시 resultCode=NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.resultCode, 'NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED');
  });

  it('22. 통과 시 ok=true', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.ok, true);
  });

  it('23. 통과 시 blockingReasons는 빈 배열', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    assert.strictEqual(result.blockingReasons.length, 0);
  });
});

// ── 3. 차단 시나리오 ──────────────────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — 차단 시나리오', () => {
  it('24. authConfigSafety 미제공 시 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, authConfigSafety: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.length > 0);
  });

  it('25. tokenProviderStatus 미제공 시 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, tokenProviderStatus: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.length > 0);
  });

  it('26. liveSingleTestApprovalAudit 미제공 시 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, liveSingleTestApprovalAudit: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('Approval Audit')));
  });

  it('27. finalApprovalStatus가 ACTIVE가 아닐 때 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, finalApprovalStatus: 'SUPERSEDED' };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('FinalApproval')));
  });

  it('28. finalApprovalStatus 미제공 시 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, finalApprovalStatus: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('29. batchJobStatus가 EXECUTING일 때 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, batchJobStatus: 'EXECUTING' };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('EXECUTING')));
  });

  it('30. batchJobStatus가 EXECUTED일 때 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, batchJobStatus: 'EXECUTED' };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('31. batchJobStatus 미제공 시 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, batchJobStatus: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('32. itemCount=0일 때 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, itemCount: 0 };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('itemCount=0')));
  });

  it('33. itemCount>1일 때 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, itemCount: 3, itemStatuses: ['READY', 'READY', 'READY'] };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('34. READY가 아닌 item 존재 시 BLOCKED', () => {
    const input = { ...FULL_PASSING_INPUT, itemStatuses: ['FAILED'], itemCount: 1 };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('READY')));
  });

  it('35. environmentSafetyResult에서 naverApiCallAllowed가 false가 아닐 때 BLOCKED', () => {
    const badEnv = { ...ENV_SAFETY_OK, naverApiCallAllowed: true as unknown as false };
    const input = { ...FULL_PASSING_INPUT, environmentSafetyResult: badEnv };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });
});

// ── 4. NEEDS_REVIEW 시나리오 ──────────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — NEEDS_REVIEW 시나리오', () => {
  it('36. environmentSafetyResult 미제공 시 NEEDS_REVIEW', () => {
    const input = { ...FULL_PASSING_INPUT, environmentSafetyResult: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.status, 'NEEDS_REVIEW');
    assert.ok(result.needsReviewReasons.length > 0);
  });

  it('37. liveSafetyGateResult 미제공 시 needsReviewReasons에 포함', () => {
    const input = { ...FULL_PASSING_INPUT, liveSafetyGateResult: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.ok(result.needsReviewReasons.some(r => r.includes('Live Safety Gate')));
  });

  it('38. livePreflightResult 미제공 시 needsReviewReasons에 포함', () => {
    const input = { ...FULL_PASSING_INPUT, livePreflightResult: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.ok(result.needsReviewReasons.some(r => r.includes('Preflight')));
  });

  it('39. liveSingleTestApproval 미제공 시 needsReviewReasons에 포함', () => {
    const input = { ...FULL_PASSING_INPUT, liveSingleTestApproval: null };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.ok(result.needsReviewReasons.some(r => r.includes('Approval Guard')));
  });

  it('40. itemCount 미제공 시 needsReviewReasons에 포함', () => {
    const input: NaverApiTokenDryPermissionGateInput = { ...FULL_PASSING_INPUT, itemCount: undefined };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.ok(result.needsReviewReasons.some(r => r.includes('단일 상품')));
  });
});

// ── 5. allowX 입력 무시 ───────────────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — allowX 입력 무시', () => {
  it('41. allowTokenRequest=true여도 accessTokenRequested=false 강제', () => {
    const input = { ...FULL_PASSING_INPUT, allowTokenRequest: true };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.ok(result.warnings.some(w => w.includes('allowTokenRequest')));
  });

  it('42. allowCredentialUse=true여도 credentialsUsed=false 강제', () => {
    const input = { ...FULL_PASSING_INPUT, allowCredentialUse: true };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.credentialsUsed, false);
    assert.ok(result.warnings.some(w => w.includes('allowCredentialUse')));
  });

  it('43. allowEndpointCall=true여도 endpointCalled=false 강제', () => {
    const input = { ...FULL_PASSING_INPUT, allowEndpointCall: true };
    const result = evaluateNaverApiTokenDryPermissionGate(input);
    assert.strictEqual(result.endpointCalled, false);
    assert.ok(result.warnings.some(w => w.includes('allowEndpointCall')));
  });
});

// ── 6. null/undefined 입력 처리 ───────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — 입력값 방어 처리', () => {
  it('44. 입력 없이 호출해도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenDryPermissionGate());
  });

  it('45. null 입력해도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenDryPermissionGate(null));
  });

  it('46. 빈 객체 입력해도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenDryPermissionGate({}));
  });

  it('47. 빈 객체 입력 시 결과에 checklistItems 배열 존재', () => {
    const result = evaluateNaverApiTokenDryPermissionGate({});
    assert.ok(Array.isArray(result.checklistItems));
  });
});

// ── 7. sanitize 함수 ──────────────────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — sanitize 함수', () => {
  it('48. sanitize 후 allowed 여전히 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    const sanitized = sanitizeNaverApiTokenDryPermissionGateResult(result);
    assert.strictEqual(sanitized.allowed, false);
  });

  it('49. sanitize 후 maxAllowedState 유지', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    const sanitized = sanitizeNaverApiTokenDryPermissionGateResult(result);
    assert.strictEqual(sanitized.maxAllowedState, 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED');
  });

  it('50. sanitize 후 tokenIssued 여전히 false', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    const sanitized = sanitizeNaverApiTokenDryPermissionGateResult(result);
    assert.strictEqual(sanitized.tokenIssued, false);
  });
});

// ── 8. buildNaverApiTokenDryPermissionChecklist ───────────────────────────────

describe('NaverApiTokenDryPermissionGate — buildChecklist', () => {
  it('51. 체크리스트 배열 반환', () => {
    const items = buildNaverApiTokenDryPermissionChecklist(FULL_PASSING_INPUT);
    assert.ok(Array.isArray(items));
    assert.ok(items.length > 0);
  });

  it('52. 각 항목에 key, label, status, message 존재', () => {
    const items = buildNaverApiTokenDryPermissionChecklist(FULL_PASSING_INPUT);
    for (const item of items) {
      assert.ok(typeof item.key === 'string');
      assert.ok(typeof item.label === 'string');
      assert.ok(typeof item.status === 'string');
      assert.ok(typeof item.message === 'string');
    }
  });

  it('53. TOKEN_REQUEST_ALWAYS_DISABLED 키 존재', () => {
    const items = buildNaverApiTokenDryPermissionChecklist(FULL_PASSING_INPUT);
    assert.ok(items.some(i => i.key === 'TOKEN_REQUEST_ALWAYS_DISABLED'));
  });
});

// ── 9. summarize 함수 ─────────────────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — summarize 함수', () => {
  it('54. 통과 시 요약 문자열에 dry-run 통과 언급', () => {
    const result = evaluateNaverApiTokenDryPermissionGate(FULL_PASSING_INPUT);
    const summary = summarizeNaverApiTokenDryPermissionReadiness(result);
    assert.ok(typeof summary === 'string' && summary.length > 0);
    assert.ok(summary.includes('통과') || summary.includes('DISABLED'));
  });

  it('55. 차단 시 요약에 미해결 항목 수 언급', () => {
    const result = evaluateNaverApiTokenDryPermissionGate({ ...FULL_PASSING_INPUT, finalApprovalStatus: 'INVALIDATED' });
    const summary = summarizeNaverApiTokenDryPermissionReadiness(result);
    assert.ok(summary.includes('미해결') || summary.includes('항목'));
  });
});

// ── 10. 배치 터미널 상태 모두 차단 ────────────────────────────────────────────

describe('NaverApiTokenDryPermissionGate — BatchJob 터미널 상태 차단', () => {
  for (const status of ['EXECUTED', 'PARTIAL_SUCCESS', 'FAILED', 'CANCELLED'] as const) {
    it(`56-${status}. batchJobStatus=${status}일 때 BLOCKED`, () => {
      const input = { ...FULL_PASSING_INPUT, batchJobStatus: status };
      const result = evaluateNaverApiTokenDryPermissionGate(input);
      assert.strictEqual(result.status, 'BLOCKED');
    });
  }
});
