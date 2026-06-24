/**
 * Naver API Token First Test Safety Boundary 테스트
 *
 * 35개 테스트 케이스:
 * - 안전 불변 조건 (allowed=false, tokenRequestAllowed=false 등)
 * - 조건 판정 로직
 * - allowX 입력 무시
 * - 민감 정보 비노출
 * - 방어 처리
 * - maxAllowedState 고정
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  evaluateNaverApiTokenFirstTestSafetyBoundary,
  buildNaverApiTokenFirstTestSafetyChecklist,
  sanitizeNaverApiTokenFirstTestSafetyBoundaryResult,
  summarizeNaverApiTokenFirstTestSafetyReadiness,
  type NaverApiTokenFirstTestSafetyBoundaryInput,
} from './sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';

// ── 테스트 헬퍼 ──────────────────────────────────────────────────────────────

/** 모든 조건이 통과하는 최소 입력값 */
function makeFullyPassingInput(): NaverApiTokenFirstTestSafetyBoundaryInput {
  return {
    environmentSafetyResult: {
      allowed: true,
      environmentCode: 'LOCAL_DEV',
      environmentMessage: 'ok',
      databaseEnvironment: 'local',
      redisEnvironment: 'local',
      naverApiCallAllowed: false,
      operatingDbWriteAllowed: false,
      queueAllowed: false,
      workerAllowed: false,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      sanitized: true,
    },
    authConfigSafety: {
      ok: true,
      credentialConfigured: true,
      authConfigUsable: false,
      authConfigStatus: 'CONFIGURED_BUT_BLOCKED',
      clientIdStatus: 'configured',
      clientSecretStatus: 'configured',
      tokenStatus: 'disabled',
      naverApiCallAllowed: false,
      liveExecutionEnabled: false,
      accessTokenRequested: false,
      credentialsUsed: false,
      tokenIssued: false,
      authorizationHeaderCreated: false,
      endpointCalled: false,
      httpRequestCreated: false,
      operatingDbWriteAllowed: false,
      queueAllowed: false,
      workerAllowed: false,
      secretVisible: false,
      sanitized: true,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      maxAllowedState: 'NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED',
    },
    tokenProviderDisabledStatus: {
      ok: false,
      success: false,
      status: 'DISABLED',
      resultCode: 'NAVER_AUTH_TOKEN_REQUEST_DISABLED',
      resultMessage: 'disabled',
      tokenStatus: 'disabled',
      authConfigUsable: false,
      accessTokenRequested: false,
      refreshTokenRequested: false,
      credentialsUsed: false,
      tokenIssued: false,
      tokenStored: false,
      authorizationHeaderCreated: false,
      httpRequestCreated: false,
      endpointCalled: false,
      naverApiCallAllowed: false,
      liveExecutionEnabled: false,
      operatingDbWriteAllowed: false,
      queueAllowed: false,
      workerAllowed: false,
      secretVisible: false,
      tokenVisible: false,
      sanitized: true,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      maxAllowedState: 'NAVER_AUTH_TOKEN_PROVIDER_REGISTERED_BUT_DISABLED',
    },
    tokenDryPermissionGate: {
      ok: true,
      allowed: false,
      status: 'DISABLED',
      resultCode: 'NAVER_AUTH_TOKEN_DRY_CHECK_PASSED_BUT_REQUEST_DISABLED',
      resultMessage: 'disabled',
      dryCheckPassed: true,
      tokenRequestAllowed: false,
      tokenStatus: 'disabled',
      authConfigUsable: false,
      naverApiCallAllowed: false,
      liveExecutionEnabled: false,
      httpRequestCreated: false,
      endpointCalled: false,
      accessTokenRequested: false,
      refreshTokenRequested: false,
      credentialsUsed: false,
      tokenIssued: false,
      tokenStored: false,
      authorizationHeaderCreated: false,
      operatingDbWriteAllowed: false,
      queueAllowed: false,
      workerAllowed: false,
      secretVisible: false,
      tokenVisible: false,
      sanitized: true,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      needsReviewReasons: [],
      maxAllowedState: 'NAVER_AUTH_TOKEN_DRY_PERMISSION_GATE_READY_BUT_DISABLED',
    },
    tokenTestOnlySkeletonStatus: {
      ok: false,
      success: false,
      status: 'DISABLED',
      resultCode: 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED',
      resultMessage: 'disabled',
      testOnlyMode: true,
      tokenRequestPrepared: false,
      tokenRequestExecuted: false,
      tokenRequestAllowed: false,
      tokenStatus: 'disabled',
      authConfigUsable: false,
      dryPermissionPassed: true,
      accessTokenRequested: false,
      refreshTokenRequested: false,
      credentialsUsed: false,
      tokenIssued: false,
      tokenStored: false,
      authorizationHeaderCreated: false,
      endpointResolved: false,
      endpointCalled: false,
      httpRequestCreated: false,
      httpClientCreated: false,
      naverApiCallAllowed: false,
      liveExecutionEnabled: false,
      operatingDbWriteAllowed: false,
      queueAllowed: false,
      workerAllowed: false,
      secretVisible: false,
      tokenVisible: false,
      endpointVisible: false,
      sanitized: true,
      checklistItems: [],
      blockingReasons: [],
      warnings: [],
      needsReviewReasons: [],
      maxAllowedState: 'NAVER_AUTH_TOKEN_TEST_ONLY_PROVIDER_REGISTERED_BUT_DISABLED',
    },
    tokenTestApprovalAudit: {
      hasAudit: true,
      allAcknowledged: true,
      acknowledgedCount: 12,
      requiredCount: 12,
      auditCode: 'TOKEN_TEST_APPROVAL_abc_def_XYZ',
    },
    liveAdapterSkeletonStatus: 'disabled',
    finalApprovalStatus: 'ACTIVE',
    batchJobStatus: 'APPROVED',
    itemStatuses: ['READY'],
    itemCount: 1,
    requestedAction: 'test',
    actorId: 'TEST_ACTOR',
    finalApprovalId: 'fa-001',
    batchJobId: 'job-001',
  };
}

// ── 테스트 스위트 ─────────────────────────────────────────────────────────────

describe('NaverApiTokenFirstTestSafetyBoundary — 안전 불변 조건', () => {
  it('1. 모든 조건이 충족되어도 allowed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.allowed, false);
  });

  it('2. 모든 조건이 충족되어도 tokenRequestAllowed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.tokenRequestAllowed, false);
  });

  it('3. 모든 조건이 충족되어도 accessTokenRequested=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('4. 모든 조건이 충족되어도 tokenIssued=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.tokenIssued, false);
  });

  it('5. 모든 조건이 충족되어도 endpointResolved=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.endpointResolved, false);
  });

  it('6. 모든 조건이 충족되어도 httpClientCreated=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.httpClientCreated, false);
  });

  it('6b. 모든 조건이 충족되어도 tokenRequestPrepared=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.tokenRequestPrepared, false);
  });

  it('6c. 모든 조건이 충족되어도 tokenRequestExecuted=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.tokenRequestExecuted, false);
  });

  it('6d. 모든 조건이 충족되어도 credentialsUsed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.credentialsUsed, false);
  });

  it('6e. 모든 조건이 충족되어도 tokenStored=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.tokenStored, false);
  });

  it('6f. 모든 조건이 충족되어도 authorizationHeaderCreated=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.authorizationHeaderCreated, false);
  });

  it('6g. 모든 조건이 충족되어도 naverApiCallAllowed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.naverApiCallAllowed, false);
  });

  it('6h. 모든 조건이 충족되어도 liveExecutionEnabled=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.liveExecutionEnabled, false);
  });

  it('6i. 모든 조건이 충족되어도 queueAllowed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.queueAllowed, false);
  });

  it('6j. 모든 조건이 충족되어도 workerAllowed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.workerAllowed, false);
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — 조건 판정', () => {
  it('7. approval audit이 없으면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.tokenTestApprovalAudit = { hasAudit: false };
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.length > 0);
  });

  it('8. acknowledgement가 불완전하면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.tokenTestApprovalAudit = {
      hasAudit: true,
      allAcknowledged: false,
      acknowledgedCount: 5,
      requiredCount: 12,
    };
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.strictEqual(result.tokenTestApprovalComplete, false);
  });

  it('9. itemCount가 2 이상이면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.itemCount = 2;
    input.itemStatuses = ['READY', 'READY'];
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('2건')));
  });

  it('10. BatchJob이 APPROVED가 아니면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.batchJobStatus = 'DRAFT';
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('11. FinalApproval이 ACTIVE가 아니면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.finalApprovalStatus = 'INVALIDATED';
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('12. item status가 READY가 아니면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.itemStatuses = ['DRAFT'];
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
  });

  it('13. BatchJob이 EXECUTED이면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.batchJobStatus = 'EXECUTED';
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('EXECUTED')));
  });

  it('14. BatchJob이 EXECUTING이면 BLOCKED', () => {
    const input = makeFullyPassingInput();
    input.batchJobStatus = 'EXECUTING';
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('EXECUTING')));
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — NEEDS_REVIEW 조건', () => {
  it('15. Environment Safety Guard가 없으면 NEEDS_REVIEW', () => {
    const input = makeFullyPassingInput();
    input.environmentSafetyResult = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    // blockingReasons 없으면 NEEDS_REVIEW 또는 모든 조건에서 판정
    assert.ok(
      result.status === 'NEEDS_REVIEW' || result.needsReviewReasons.length > 0,
      `status=${result.status}, needsReview=${result.needsReviewReasons.join(',')}`
    );
  });

  it('16. Auth Config Safe Reader가 없으면 NEEDS_REVIEW', () => {
    const input = makeFullyPassingInput();
    input.authConfigSafety = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.ok(result.needsReviewReasons.length > 0 || result.status === 'NEEDS_REVIEW');
  });

  it('17. Token Provider Disabled가 없으면 NEEDS_REVIEW', () => {
    const input = makeFullyPassingInput();
    input.tokenProviderDisabledStatus = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.ok(result.needsReviewReasons.length > 0 || result.status === 'NEEDS_REVIEW');
  });

  it('18. Token Dry Permission Gate가 없으면 NEEDS_REVIEW', () => {
    const input = makeFullyPassingInput();
    input.tokenDryPermissionGate = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.ok(result.needsReviewReasons.length > 0 || result.status === 'NEEDS_REVIEW');
  });

  it('19. Test-only Skeleton이 없으면 NEEDS_REVIEW', () => {
    const input = makeFullyPassingInput();
    input.tokenTestOnlySkeletonStatus = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.ok(result.needsReviewReasons.length > 0 || result.status === 'NEEDS_REVIEW');
  });

  it('20. Live Adapter Skeleton이 없으면 NEEDS_REVIEW', () => {
    const input = makeFullyPassingInput();
    input.liveAdapterSkeletonStatus = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.ok(result.needsReviewReasons.length > 0 || result.status === 'NEEDS_REVIEW');
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — allowX 입력 무시', () => {
  it('21. allowTokenRequest=true가 들어와도 accessTokenRequested=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({ allowTokenRequest: true });
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('22. allowCredentialUse=true가 들어와도 credentialsUsed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({ allowCredentialUse: true });
    assert.strictEqual(result.credentialsUsed, false);
  });

  it('23. allowEndpointResolve=true가 들어와도 endpointResolved=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({ allowEndpointResolve: true });
    assert.strictEqual(result.endpointResolved, false);
  });

  it('24. allowEndpointCall=true가 들어와도 endpointCalled=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({ allowEndpointCall: true });
    assert.strictEqual(result.endpointCalled, false);
  });

  it('25. allowHttpClient=true가 들어와도 httpClientCreated=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({ allowHttpClient: true });
    assert.strictEqual(result.httpClientCreated, false);
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — 민감 정보 비노출', () => {
  const ACCESS_TOKEN = 'test_access_token_value_abc';
  const REFRESH_TOKEN = 'test_refresh_token_value_xyz';
  const CLIENT_SECRET = 'test_client_secret_value_def';
  const ENDPOINT_URL = 'https://api.commerce.naver.com/external/token';

  function resultJsonWith(
    extraInput: Partial<NaverApiTokenFirstTestSafetyBoundaryInput> = {}
  ): string {
    const input: NaverApiTokenFirstTestSafetyBoundaryInput = {
      actorId: ACCESS_TOKEN,
      finalApprovalId: REFRESH_TOKEN,
      batchJobId: CLIENT_SECRET,
      requestedAction: ENDPOINT_URL,
      ...extraInput,
    };
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    return JSON.stringify(result);
  }

  it('26. 결과에 access token 문자열이 포함되지 않음', () => {
    const json = resultJsonWith();
    assert.ok(!json.includes(ACCESS_TOKEN));
  });

  it('27. 결과에 refresh token 문자열이 포함되지 않음', () => {
    const json = resultJsonWith();
    assert.ok(!json.includes(REFRESH_TOKEN));
  });

  it('28. 결과에 client secret/API key 문자열이 포함되지 않음', () => {
    const json = resultJsonWith();
    assert.ok(!json.includes(CLIENT_SECRET));
  });

  it('29. 결과에 authorization header가 포함되지 않음', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({});
    const json = JSON.stringify(result);
    assert.ok(!json.toLowerCase().includes('bearer '));
    assert.ok(!json.toLowerCase().includes('authorization:'));
  });

  it('30. 결과에 endpoint URL이 포함되지 않음', () => {
    const json = resultJsonWith();
    assert.ok(!json.includes(ENDPOINT_URL));
  });

  it('31. 결과에 DATABASE_URL / REDIS_URL 원문이 포함되지 않음', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({
      batchJobId: process.env.DATABASE_URL ?? 'postgres://test',
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('postgres://'));
    assert.ok(!json.includes('redis://'));
  });

  it('32. 마스킹된 secret도 반환하지 않음', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({});
    const json = JSON.stringify(result);
    assert.ok(!json.includes('****'));
    assert.ok(!json.includes('sk-***'));
    assert.strictEqual(result.secretVisible, false);
    assert.strictEqual(result.tokenVisible, false);
    assert.strictEqual(result.endpointVisible, false);
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — 방어 처리', () => {
  it('33. malformed input도 throw하지 않고 safe result 반환', () => {
    assert.doesNotThrow(() => {
      // 의도적으로 잘못된 타입 주입
      evaluateNaverApiTokenFirstTestSafetyBoundary({
        itemCount: 'not-a-number' as unknown as number,
        itemStatuses: 'not-an-array' as unknown as string[],
        batchJobStatus: 123 as unknown as string,
      });
    });
  });

  it('33b. null 입력도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenFirstTestSafetyBoundary(null));
  });

  it('33c. undefined 입력도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenFirstTestSafetyBoundary(undefined));
  });

  it('33d. 빈 객체 입력도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenFirstTestSafetyBoundary({}));
  });

  it('33e. 빈 객체 입력 시에도 checklistItems 배열 존재', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary({});
    assert.ok(Array.isArray(result.checklistItems));
    assert.ok(result.checklistItems.length > 0);
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — 체크리스트 및 maxAllowedState', () => {
  it('34. checklistItems가 safety boundary 상태를 명확히 표시', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    const keys = result.checklistItems.map(item => item.key);
    assert.ok(keys.includes('TOKEN_REQUEST_ALWAYS_DISABLED'));
    assert.ok(keys.includes('TOKEN_NOT_ISSUED'));
    assert.ok(keys.includes('HTTP_CLIENT_NOT_CREATED'));
    assert.ok(keys.includes('ENDPOINT_NOT_RESOLVED'));
  });

  it('35. maxAllowedState가 boundary ready but not executable 계열만 반환', () => {
    const resultPass = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(
      resultPass.maxAllowedState,
      'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE'
    );

    const resultBlock = evaluateNaverApiTokenFirstTestSafetyBoundary({
      batchJobStatus: 'DRAFT',
      finalApprovalStatus: 'ACTIVE',
      itemCount: 1,
    });
    assert.strictEqual(
      resultBlock.maxAllowedState,
      'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE'
    );
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — readyForExplicitTokenTestApproval', () => {
  it('전체 통과 시 readyForExplicitTokenTestApproval=true여도 allowed=false', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    assert.strictEqual(result.readyForExplicitTokenTestApproval, true);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.tokenRequestAllowed, false);
    assert.strictEqual(result.tokenIssued, false);
    assert.strictEqual(result.accessTokenRequested, false);
  });

  it('approval audit 미완료 시 readyForExplicitTokenTestApproval=false', () => {
    const input = makeFullyPassingInput();
    input.tokenTestApprovalAudit = { hasAudit: true, allAcknowledged: false, acknowledgedCount: 3, requiredCount: 12 };
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.readyForExplicitTokenTestApproval, false);
  });

  it('BLOCKED 상태에서 readyForExplicitTokenTestApproval=false', () => {
    const input = makeFullyPassingInput();
    input.batchJobStatus = 'DRAFT';
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.readyForExplicitTokenTestApproval, false);
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — 보조 함수', () => {
  it('buildNaverApiTokenFirstTestSafetyChecklist: 배열 반환', () => {
    const checklist = buildNaverApiTokenFirstTestSafetyChecklist(makeFullyPassingInput());
    assert.ok(Array.isArray(checklist));
    assert.ok(checklist.length > 0);
  });

  it('sanitize 후 allowed=false 유지', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    const sanitized = sanitizeNaverApiTokenFirstTestSafetyBoundaryResult(result);
    assert.strictEqual(sanitized.allowed, false);
    assert.strictEqual(sanitized.tokenIssued, false);
    assert.strictEqual(sanitized.endpointResolved, false);
    assert.strictEqual(sanitized.httpClientCreated, false);
    assert.strictEqual(sanitized.sanitized, true);
    assert.strictEqual(
      sanitized.maxAllowedState,
      'NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE'
    );
  });

  it('summarize: 통과 시 요약 문자열 반환', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    const summary = summarizeNaverApiTokenFirstTestSafetyReadiness(result);
    assert.strictEqual(typeof summary, 'string');
    assert.ok(summary.length > 0);
  });

  it('summarize: 통과 시 token 발급 미실행 언급', () => {
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(makeFullyPassingInput());
    const summary = summarizeNaverApiTokenFirstTestSafetyReadiness(result);
    assert.ok(
      summary.includes('token 발급') || summary.includes('Token') || summary.includes('token'),
      `요약에 token 관련 내용이 없음: ${summary}`
    );
  });

  it('summarize: 차단 시 미해결 항목 포함', () => {
    const input = makeFullyPassingInput();
    input.batchJobStatus = 'DRAFT';
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    const summary = summarizeNaverApiTokenFirstTestSafetyReadiness(result);
    assert.ok(summary.includes('차단') || summary.includes('BLOCKED') || summary.includes('항목'));
  });
});

describe('NaverApiTokenFirstTestSafetyBoundary — tokenTestApprovalAudit 세부', () => {
  it('tokenTestApprovalAudit=null이면 tokenTestApprovalPresent=false', () => {
    const input = makeFullyPassingInput();
    input.tokenTestApprovalAudit = null;
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.tokenTestApprovalPresent, false);
    assert.strictEqual(result.tokenTestApprovalComplete, false);
  });

  it('tokenTestApprovalAudit.hasAudit=true, acknowledgedCount=12, requiredCount=12이면 complete', () => {
    const input = makeFullyPassingInput();
    input.tokenTestApprovalAudit = {
      hasAudit: true,
      acknowledgedCount: 12,
      requiredCount: 12,
    };
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.tokenTestApprovalPresent, true);
    assert.strictEqual(result.tokenTestApprovalComplete, true);
  });

  it('tokenTestApprovalAudit.hasAudit=true, allAcknowledged=true이면 complete', () => {
    const input = makeFullyPassingInput();
    input.tokenTestApprovalAudit = {
      hasAudit: true,
      allAcknowledged: true,
      acknowledgedCount: 12,
      requiredCount: 12,
    };
    const result = evaluateNaverApiTokenFirstTestSafetyBoundary(input);
    assert.strictEqual(result.tokenTestApprovalComplete, true);
  });
});
