import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  evaluateNaverApiTokenTestApprovalReadiness,
  buildNaverApiTokenTestApprovalAuditRecord,
  validateNaverApiTokenTestApprovalAcknowledgements,
  sanitizeNaverApiTokenTestApprovalAuditRecord,
  summarizeNaverApiTokenTestApprovalAudit,
  sanitizeStoredAuditRecord,
  REQUIRED_ACKNOWLEDGEMENTS,
  ACKNOWLEDGEMENT_LABELS,
} from './sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.service';

// ── 공통 픽스처 ───────────────────────────────────────────────────────────────

const ALL_ACKNOWLEDGEMENTS = [...REQUIRED_ACKNOWLEDGEMENTS];

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

const FULL_INPUT = {
  batchJobId: 'job-test-001',
  finalApprovalId: 'fa-test-001',
  actorId: 'actor-test-001',
  acknowledgedItems: ALL_ACKNOWLEDGEMENTS,
  confirmApprovalRecordOnly: true,
  environmentSafetyResult: ENV_SAFETY_OK,
  requestedAction: 'token-test-approval-audit',
  allowTokenRequest: false,
  allowCredentialUse: false,
  allowEndpointCall: false,
};

// ── 1. 모든 acknowledgement 제공 시 readyToRecord=true ────────────────────────

describe('TokenTestApprovalAudit — readyToRecord', () => {
  it('1. 모든 acknowledgement가 있으면 readyToRecord=true', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    assert.strictEqual(result.readyToRecord, true);
  });

  it('2. acknowledgement가 누락되면 readyToRecord=false', () => {
    const input = { ...FULL_INPUT, acknowledgedItems: ['CONFIRM_TOKEN_TEST_ONLY'] };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    assert.strictEqual(result.readyToRecord, false);
  });

  it('3. 빈 acknowledgement면 readyToRecord=false', () => {
    const input = { ...FULL_INPUT, acknowledgedItems: [] };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    assert.strictEqual(result.readyToRecord, false);
  });

  it('4. confirmApprovalRecordOnly=false면 readyToRecord=false', () => {
    const input = { ...FULL_INPUT, confirmApprovalRecordOnly: false };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    assert.strictEqual(result.readyToRecord, false);
    assert.ok(result.blockingReasons.length > 0);
  });

  it('5. confirmApprovalRecordOnly 미제공이면 readyToRecord=false', () => {
    const { confirmApprovalRecordOnly: _, ...rest } = FULL_INPUT;
    const result = evaluateNaverApiTokenTestApprovalReadiness(rest);
    assert.strictEqual(result.readyToRecord, false);
  });
});

// ── 2. approvalPurpose ────────────────────────────────────────────────────────

describe('TokenTestApprovalAudit — approvalPurpose', () => {
  it('6. approvalPurpose=FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    assert.strictEqual(result.approvalPurpose, 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY');
  });

  it('7. 빈 입력에서도 approvalPurpose=FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness({});
    assert.strictEqual(result.approvalPurpose, 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY');
  });
});

// ── 3. 필수 불변 boolean — token 관련 ─────────────────────────────────────────

describe('TokenTestApprovalAudit — token 불변 조건', () => {
  it('8. tokenRequestAllowed=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).tokenRequestAllowed, false);
  });

  it('9. tokenRequestPrepared=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).tokenRequestPrepared, false);
  });

  it('10. tokenRequestExecuted=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).tokenRequestExecuted, false);
  });

  it('11. accessTokenRequested=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).accessTokenRequested, false);
  });

  it('12. refreshTokenRequested=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).refreshTokenRequested, false);
  });

  it('13. credentialsUsed=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).credentialsUsed, false);
  });

  it('14. tokenIssued=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).tokenIssued, false);
  });

  it('15. tokenStored=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).tokenStored, false);
  });

  it('16. authorizationHeaderCreated=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).authorizationHeaderCreated, false);
  });
});

// ── 4. 필수 불변 boolean — endpoint/HTTP 관련 ──────────────────────────────────

describe('TokenTestApprovalAudit — endpoint/HTTP 불변 조건', () => {
  it('17. endpointResolved=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).endpointResolved, false);
  });

  it('18. endpointCalled=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).endpointCalled, false);
  });

  it('19. httpRequestCreated=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).httpRequestCreated, false);
  });

  it('20. httpClientCreated=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).httpClientCreated, false);
  });

  it('21. naverApiCallAllowed=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).naverApiCallAllowed, false);
  });

  it('22. liveExecutionEnabled=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).liveExecutionEnabled, false);
  });

  it('23. queueAllowed=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).queueAllowed, false);
  });

  it('24. workerAllowed=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).workerAllowed, false);
  });
});

// ── 5. secret/token/endpoint 비노출 ───────────────────────────────────────────

describe('TokenTestApprovalAudit — secret/token/endpoint 비노출', () => {
  it('25. 결과에 access_token 원문 포함되지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('access_token'));
  });

  it('26. 결과에 refresh_token 원문 포함되지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('refresh_token'));
  });

  it('27. 결과에 client_secret/api_key 원문 포함되지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('client_secret'));
    assert.ok(!json.includes('api_key'));
  });

  it('28. 결과에 Authorization header 포함되지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('Bearer '));
  });

  it('29. 결과에 endpoint URL 포함되지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('https://api'));
    assert.ok(!json.includes('/token'));
    assert.ok(!json.includes('oauth'));
  });

  it('30. 결과에 DATABASE_URL / REDIS_URL 포함되지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('DATABASE_URL'));
    assert.ok(!json.includes('REDIS_URL'));
    assert.ok(!json.includes('postgresql://'));
    assert.ok(!json.includes('redis://'));
  });

  it('31. 마스킹된 secret도 반환하지 않음', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const json = JSON.stringify(result);
    assert.ok(!json.includes('****'));
  });

  it('32. secretVisible=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).secretVisible, false);
  });

  it('33. tokenVisible=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).tokenVisible, false);
  });

  it('34. endpointVisible=false', () => {
    assert.strictEqual(evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).endpointVisible, false);
  });
});

// ── 6. sanitize 함수 ──────────────────────────────────────────────────────────

describe('TokenTestApprovalAudit — sanitize 함수', () => {
  it('35. sanitize 후 tokenIssued=false 유지', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestApprovalAuditRecord(result);
    assert.strictEqual(sanitized.tokenIssued, false);
  });

  it('36. sanitize 후 endpointResolved=false 유지', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestApprovalAuditRecord(result);
    assert.strictEqual(sanitized.endpointResolved, false);
  });

  it('37. sanitize 후 maxAllowedState 유지', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestApprovalAuditRecord(result);
    assert.strictEqual(sanitized.maxAllowedState, 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
  });

  it('38. sanitize 후 sanitized=true 유지', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const sanitized = sanitizeNaverApiTokenTestApprovalAuditRecord(result);
    assert.strictEqual(sanitized.sanitized, true);
  });
});

// ── 7. maxAllowedState ────────────────────────────────────────────────────────

describe('TokenTestApprovalAudit — maxAllowedState', () => {
  it('39. maxAllowedState=NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE', () => {
    assert.strictEqual(
      evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT).maxAllowedState,
      'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE'
    );
  });

  it('40. 빈 입력에서도 maxAllowedState 고정', () => {
    assert.strictEqual(
      evaluateNaverApiTokenTestApprovalReadiness({}).maxAllowedState,
      'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE'
    );
  });

  it('41. 차단 상태에서도 maxAllowedState 고정', () => {
    const input = { ...FULL_INPUT, confirmApprovalRecordOnly: false };
    assert.strictEqual(
      evaluateNaverApiTokenTestApprovalReadiness(input).maxAllowedState,
      'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE'
    );
  });
});

// ── 8. validateNaverApiTokenTestApprovalAcknowledgements ─────────────────────

describe('TokenTestApprovalAudit — validateAcknowledgements', () => {
  it('42. 모든 acknowledgement 제공 시 valid=true, missing=[]', () => {
    const { valid, missing } = validateNaverApiTokenTestApprovalAcknowledgements(ALL_ACKNOWLEDGEMENTS);
    assert.strictEqual(valid, true);
    assert.deepStrictEqual(missing, []);
  });

  it('43. 일부 누락 시 valid=false, missing에 누락 항목 포함', () => {
    const partial = ALL_ACKNOWLEDGEMENTS.slice(0, 5);
    const { valid, missing } = validateNaverApiTokenTestApprovalAcknowledgements(partial);
    assert.strictEqual(valid, false);
    assert.ok(missing.length > 0);
  });

  it('44. 빈 배열이면 모든 항목이 missing에 포함됨', () => {
    const { valid, missing } = validateNaverApiTokenTestApprovalAcknowledgements([]);
    assert.strictEqual(valid, false);
    assert.strictEqual(missing.length, REQUIRED_ACKNOWLEDGEMENTS.length);
  });
});

// ── 9. buildNaverApiTokenTestApprovalAuditRecord ─────────────────────────────

describe('TokenTestApprovalAudit — buildAuditRecord', () => {
  it('45. auditRecord 생성 가능', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.ok(record !== undefined && typeof record === 'object');
  });

  it('46. auditRecord.tokenRequestAllowed=false', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.strictEqual(record.tokenRequestAllowed, false);
  });

  it('47. auditRecord.tokenIssued=false', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.strictEqual(record.tokenIssued, false);
  });

  it('48. auditRecord.approvalPurpose=FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.strictEqual(record.approvalPurpose, 'FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY');
  });

  it('49. auditRecord.maxAllowedState 고정', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.strictEqual(record.maxAllowedState, 'NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
  });

  it('50. auditRecord.sanitized=true', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.strictEqual(record.sanitized, true);
  });

  it('51. auditRecord.acknowledgedItems에 입력값이 복사됨', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    assert.ok(Array.isArray(record.acknowledgedItems));
    assert.strictEqual(record.acknowledgedItems.length, ALL_ACKNOWLEDGEMENTS.length);
  });

  it('52. auditRecord JSON에 token/secret/endpoint 원문 없음', () => {
    const record = buildNaverApiTokenTestApprovalAuditRecord(FULL_INPUT);
    const json = JSON.stringify(record);
    assert.ok(!json.includes('access_token'));
    assert.ok(!json.includes('client_secret'));
    assert.ok(!json.includes('Bearer '));
    assert.ok(!json.includes('https://api'));
  });
});

// ── 10. summarize 함수 ────────────────────────────────────────────────────────

describe('TokenTestApprovalAudit — summarize 함수', () => {
  it('53. 준비 완료 시 요약 문자열 반환', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const summary = summarizeNaverApiTokenTestApprovalAudit(result);
    assert.ok(typeof summary === 'string' && summary.length > 0);
  });

  it('54. 준비 완료 시 요약에 token 미실행 언급', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness(FULL_INPUT);
    const summary = summarizeNaverApiTokenTestApprovalAudit(result);
    assert.ok(summary.includes('token') || summary.includes('승인'));
  });

  it('55. 차단 시 요약에 미해결 항목 포함', () => {
    const input = { ...FULL_INPUT, confirmApprovalRecordOnly: false };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    const summary = summarizeNaverApiTokenTestApprovalAudit(result);
    assert.ok(summary.includes('불가') || summary.includes('미해결') || summary.includes('항목'));
  });
});

// ── 11. 방어 처리 ─────────────────────────────────────────────────────────────

describe('TokenTestApprovalAudit — 방어 처리', () => {
  it('56. null 입력도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenTestApprovalReadiness(null));
  });

  it('57. undefined 입력도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenTestApprovalReadiness(undefined));
  });

  it('58. 빈 객체 입력도 throw하지 않음', () => {
    assert.doesNotThrow(() => evaluateNaverApiTokenTestApprovalReadiness({}));
  });

  it('59. 빈 객체 입력 시에도 checklistItems 배열 존재', () => {
    const result = evaluateNaverApiTokenTestApprovalReadiness({});
    assert.ok(Array.isArray(result.checklistItems) && result.checklistItems.length > 0);
  });

  it('60. sanitizeStoredAuditRecord: null 입력 시 null 반환', () => {
    assert.strictEqual(sanitizeStoredAuditRecord(null), null);
  });

  it('61. sanitizeStoredAuditRecord: string 입력 시 null 반환', () => {
    assert.strictEqual(sanitizeStoredAuditRecord('not-an-object'), null);
  });

  it('62. sanitizeStoredAuditRecord: 비어있는 객체도 안전하게 처리', () => {
    const result = sanitizeStoredAuditRecord({});
    assert.ok(result !== null);
    assert.strictEqual(result!.tokenIssued, false);
    assert.strictEqual(result!.sanitized, true);
  });
});

// ── 12. REQUIRED_ACKNOWLEDGEMENTS / LABELS ────────────────────────────────────

describe('TokenTestApprovalAudit — acknowledgement 목록', () => {
  it('63. REQUIRED_ACKNOWLEDGEMENTS에 12개 항목 정의', () => {
    assert.strictEqual(REQUIRED_ACKNOWLEDGEMENTS.length, 12);
  });

  it('64. CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP 항목 존재', () => {
    assert.ok(REQUIRED_ACKNOWLEDGEMENTS.includes('CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP'));
  });

  it('65. CONFIRM_NO_PRODUCT_UPDATE 항목 존재', () => {
    assert.ok(REQUIRED_ACKNOWLEDGEMENTS.includes('CONFIRM_NO_PRODUCT_UPDATE'));
  });

  it('66. CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST 항목 존재', () => {
    assert.ok(REQUIRED_ACKNOWLEDGEMENTS.includes('CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST'));
  });

  it('67. 모든 REQUIRED_ACKNOWLEDGEMENTS 항목에 ACKNOWLEDGEMENT_LABELS가 존재', () => {
    for (const key of REQUIRED_ACKNOWLEDGEMENTS) {
      assert.ok(
        typeof ACKNOWLEDGEMENT_LABELS[key] === 'string' && ACKNOWLEDGEMENT_LABELS[key].length > 0,
        `${key}에 label이 없습니다.`
      );
    }
  });
});

// ── 13. allowX 입력 무시 ─────────────────────────────────────────────────────

describe('TokenTestApprovalAudit — allowX 입력 무시', () => {
  it('68. allowTokenRequest=true가 들어와도 accessTokenRequested=false', () => {
    const input = { ...FULL_INPUT, allowTokenRequest: true };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    assert.strictEqual(result.accessTokenRequested, false);
    assert.ok(result.warnings.some(w => w.includes('allowTokenRequest')));
  });

  it('69. allowCredentialUse=true가 들어와도 credentialsUsed=false', () => {
    const input = { ...FULL_INPUT, allowCredentialUse: true };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    assert.strictEqual(result.credentialsUsed, false);
    assert.ok(result.warnings.some(w => w.includes('allowCredentialUse')));
  });

  it('70. allowEndpointCall=true가 들어와도 endpointCalled=false', () => {
    const input = { ...FULL_INPUT, allowEndpointCall: true };
    const result = evaluateNaverApiTokenTestApprovalReadiness(input);
    assert.strictEqual(result.endpointCalled, false);
    assert.ok(result.warnings.some(w => w.includes('allowEndpointCall')));
  });
});
