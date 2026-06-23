import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  classifyDatabaseEnvironment,
  buildEnvironmentSafetyChecklist,
  evaluateExecutionEnvironmentSafetyGuard,
  sanitizeEnvironmentSafetySummary,
} from './sku-keyword-final-approval-execution-environment-safety-guard.service';
import type { EnvironmentSafetyGuardInput } from './sku-keyword-final-approval-execution-environment-safety-guard.service';

// ── classifyDatabaseEnvironment ───────────────────────────────────────────────

describe('classifyDatabaseEnvironment', () => {
  it('local_host hint → local', () => {
    assert.equal(classifyDatabaseEnvironment('local_host'), 'local');
  });

  it('test_or_dev hint → test', () => {
    assert.equal(classifyDatabaseEnvironment('test_or_dev'), 'test');
  });

  it('possible_prod hint → operating_blocked', () => {
    assert.equal(classifyDatabaseEnvironment('possible_prod'), 'operating_blocked');
  });

  it('unknown_host hint → unknown', () => {
    assert.equal(classifyDatabaseEnvironment('unknown_host'), 'unknown');
  });

  it('null hint → unknown', () => {
    assert.equal(classifyDatabaseEnvironment(null), 'unknown');
  });

  it('isOperating=true overrides hint to operating_blocked', () => {
    assert.equal(classifyDatabaseEnvironment('local_host', false, false, true), 'operating_blocked');
  });

  it('isLocal=true overrides hint to local', () => {
    assert.equal(classifyDatabaseEnvironment('test_or_dev', true, false, false), 'local');
  });

  it('isTest=true overrides hint to test', () => {
    assert.equal(classifyDatabaseEnvironment(null, false, true, false), 'test');
  });

  it('isOperating takes precedence over isLocal', () => {
    assert.equal(classifyDatabaseEnvironment(null, true, false, true), 'operating_blocked');
  });
});

// ── evaluateExecutionEnvironmentSafetyGuard — safety invariants ───────────────

describe('evaluateExecutionEnvironmentSafetyGuard — safety invariants', () => {
  const localInput: EnvironmentSafetyGuardInput = {
    nodeEnv: 'development',
    databaseUrlPresent: true,
    databaseUrlSafeHint: 'local_host',
    redisUrlPresent: true,
    redisUrlSafeHint: 'local_host',
    adapterMode: 'mock',
    requestedAction: 'approval-audit-record-only',
  };

  it('TC-01: local/test 환경에서도 naverApiCallAllowed는 항상 false', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard(localInput);
    assert.equal(result.naverApiCallAllowed, false);
  });

  it('TC-02: local/test 환경에서도 operatingDbWriteAllowed는 항상 false', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard(localInput);
    assert.equal(result.operatingDbWriteAllowed, false);
  });

  it('TC-03: queueAllowed는 항상 false', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard(localInput);
    assert.equal(result.queueAllowed, false);
  });

  it('TC-04: workerAllowed는 항상 false', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard(localInput);
    assert.equal(result.workerAllowed, false);
  });

  it('TC-05: sanitized는 항상 true', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard(localInput);
    assert.equal(result.sanitized, true);
  });

  it('TC-06: allowOperatingDbWrite=true를 입력해도 operatingDbWriteAllowed는 false (무시됨)', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      ...localInput,
      allowOperatingDbWrite: true,
    });
    assert.equal(result.operatingDbWriteAllowed, false);
  });

  it('TC-07: allowNaverApiCall=true를 입력해도 naverApiCallAllowed는 false (무시됨)', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      ...localInput,
      allowNaverApiCall: true,
    });
    assert.equal(result.naverApiCallAllowed, false);
  });
});

// ── evaluateExecutionEnvironmentSafetyGuard — adapter mode blocking ───────────

describe('evaluateExecutionEnvironmentSafetyGuard — adapter mode blocking', () => {
  it('TC-08: adapterMode=live이면 BLOCKED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'live',
    });
    assert.equal(result.allowed, false);
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.equal(adapterItem?.status, 'BLOCKED');
    assert.ok(result.blockingReasons.length > 0);
  });

  it('TC-09: adapterMode=prod이면 BLOCKED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'prod',
    });
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.equal(adapterItem?.status, 'BLOCKED');
  });

  it('TC-10: adapterMode=production이면 BLOCKED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'production',
    });
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.equal(adapterItem?.status, 'BLOCKED');
  });

  it('TC-11: adapterMode=operating이면 BLOCKED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'operating',
    });
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.equal(adapterItem?.status, 'BLOCKED');
  });

  it('TC-12: adapterMode=mock이면 PASS', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'mock',
    });
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.equal(adapterItem?.status, 'PASS');
  });

  it('TC-13: adapterMode 미설정이면 PASS', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
    });
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.equal(adapterItem?.status, 'PASS');
  });
});

// ── evaluateExecutionEnvironmentSafetyGuard — db environment ─────────────────

describe('evaluateExecutionEnvironmentSafetyGuard — db environment', () => {
  it('TC-14: possible_prod 힌트면 BLOCKED (databaseEnvironment=operating_blocked)', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'possible_prod',
      adapterMode: 'mock',
    });
    assert.equal(result.databaseEnvironment, 'operating_blocked');
    const dbItem = result.checklistItems.find(i => i.key === 'database_environment');
    assert.equal(dbItem?.status, 'BLOCKED');
    assert.equal(result.allowed, false);
  });

  it('TC-15: unknown 힌트면 NEEDS_REVIEW', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'unknown_host',
      adapterMode: 'mock',
    });
    assert.equal(result.databaseEnvironment, 'unknown');
    const dbItem = result.checklistItems.find(i => i.key === 'database_environment');
    assert.equal(dbItem?.status, 'NEEDS_REVIEW');
    // NEEDS_REVIEW is not BLOCKED, so allowed can still be true
    assert.equal(result.allowed, true);
    assert.ok(result.warnings.length > 0);
  });

  it('TC-16: local_host이면 PASS', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'mock',
    });
    assert.equal(result.databaseEnvironment, 'local');
    const dbItem = result.checklistItems.find(i => i.key === 'database_environment');
    assert.equal(dbItem?.status, 'PASS');
  });

  it('TC-17: isOperatingDatabase=true이면 BLOCKED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      isOperatingDatabase: true,
      adapterMode: 'mock',
    });
    assert.equal(result.databaseEnvironment, 'operating_blocked');
    assert.equal(result.allowed, false);
  });
});

// ── evaluateExecutionEnvironmentSafetyGuard — secret/URL 미노출 ──────────────

describe('evaluateExecutionEnvironmentSafetyGuard — secret/URL non-exposure', () => {
  const sensitiveStrings = [
    'postgresql://user:pass@localhost:5432/db',
    'redis://user:pass@redis:6379',
    'sk-secret-token-12345',
    'clientSecret_abc123',
    'Bearer eyJhbGciOiJIUzI1NiJ9',
    'api-key-xyz',
  ];

  it('TC-18: 결과 JSON에 DATABASE_URL 원문이 포함되지 않음', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('postgresql://'));
    assert.ok(!json.includes('@localhost'));
  });

  it('TC-19: 결과 JSON에 REDIS_URL 원문이 포함되지 않음', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      redisUrlSafeHint: 'local_host',
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('redis://'));
  });

  it('TC-20: 결과 JSON에 secret/token/clientSecret 문자열이 포함되지 않음', () => {
    for (const s of sensitiveStrings) {
      const result = evaluateExecutionEnvironmentSafetyGuard({
        databaseUrlSafeHint: 'local_host',
        nodeEnv: 'development',
      });
      const json = JSON.stringify(result);
      // Guard output should not contain any of these sensitive values
      assert.ok(!json.includes(s), `Expected result to not contain: ${s}`);
    }
  });

  it('TC-21: 서비스 함수 결과에 원문 URL 반영 없음 — safe hint만 사용', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      redisUrlSafeHint: 'test_or_dev',
    });
    // databaseEnvironment should be a classification, not a URL
    assert.ok(['local', 'test', 'unknown', 'operating_blocked'].includes(result.databaseEnvironment));
    assert.ok(['local', 'test', 'unknown', 'operating_blocked'].includes(result.redisEnvironment));
  });
});

// ── evaluateExecutionEnvironmentSafetyGuard — requestedAction ────────────────

describe('evaluateExecutionEnvironmentSafetyGuard — requestedAction', () => {
  it('TC-22: requestedAction=approval-audit-record-only이면 실행 아닌 감사 기록으로 분류됨 (PASS)', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      requestedAction: 'approval-audit-record-only',
    });
    const item = result.checklistItems.find(i => i.key === 'approval_record_only');
    assert.equal(item?.status, 'PASS');
  });

  it('TC-23: requestedAction 미설정이면 PASS (기본값은 audit 전용으로 간주)', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
    });
    const item = result.checklistItems.find(i => i.key === 'approval_record_only');
    assert.equal(item?.status, 'PASS');
  });

  it('TC-24: requestedAction=live-execution이면 WARN (실행 흐름과 분리 여부 확인 필요)', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      requestedAction: 'live-execution',
    });
    const item = result.checklistItems.find(i => i.key === 'approval_record_only');
    assert.equal(item?.status, 'WARN');
  });
});

// ── evaluateExecutionEnvironmentSafetyGuard — environmentCode ────────────────

describe('evaluateExecutionEnvironmentSafetyGuard — environmentCode', () => {
  it('TC-25: allowed=false이면 environmentCode=OPERATING_WRITE_BLOCKED_AND_LIVE_CALL_DISABLED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      adapterMode: 'live',
    });
    assert.equal(result.environmentCode, 'OPERATING_WRITE_BLOCKED_AND_LIVE_CALL_DISABLED');
    assert.equal(result.allowed, false);
  });

  it('TC-26: allowed=true이면 environmentCode=ENVIRONMENT_SAFETY_CHECK_READY_BUT_LIVE_DISABLED', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'mock',
    });
    assert.equal(result.environmentCode, 'ENVIRONMENT_SAFETY_CHECK_READY_BUT_LIVE_DISABLED');
    assert.equal(result.allowed, true);
  });
});

// ── sanitizeEnvironmentSafetySummary ─────────────────────────────────────────

describe('sanitizeEnvironmentSafetySummary', () => {
  it('TC-27: sanitize 결과에 naverApiCallAllowed=false 강제', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
    });
    const summary = sanitizeEnvironmentSafetySummary(result);
    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.operatingDbWriteAllowed, false);
    assert.equal(summary.queueAllowed, false);
    assert.equal(summary.workerAllowed, false);
    assert.equal(summary.sanitized, true);
  });

  it('TC-28: sanitize 결과에 blockingCount/warningCount/passCount 포함', () => {
    const result = evaluateExecutionEnvironmentSafetyGuard({
      databaseUrlSafeHint: 'local_host',
      adapterMode: 'mock',
    });
    const summary = sanitizeEnvironmentSafetySummary(result);
    assert.ok(typeof summary.blockingCount === 'number');
    assert.ok(typeof summary.warningCount === 'number');
    assert.ok(typeof summary.passCount === 'number');
    assert.ok((summary.passCount as number) > 0);
  });
});

// ── buildEnvironmentSafetyChecklist — 12개 필수 항목 ─────────────────────────

describe('buildEnvironmentSafetyChecklist — all required items present', () => {
  it('TC-29: 체크리스트에 모든 필수 key가 존재함', () => {
    const dbEnv = classifyDatabaseEnvironment('local_host');
    const redisEnv = classifyDatabaseEnvironment('local_host');
    const items = buildEnvironmentSafetyChecklist(
      { adapterMode: 'mock', requestedAction: 'approval-audit-record-only' },
      dbEnv,
      redisEnv
    );
    const requiredKeys = [
      'no_database_url_exposed',
      'no_redis_url_exposed',
      'no_secret_exposed',
      'naver_api_not_allowed',
      'operating_db_write_blocked',
      'queue_not_allowed',
      'worker_not_allowed',
      'adapter_mode_safe',
      'database_environment',
      'redis_environment',
      'approval_record_only',
      'live_execution_disabled',
    ];
    const existingKeys = items.map(i => i.key);
    for (const key of requiredKeys) {
      assert.ok(existingKeys.includes(key), `Missing checklist key: ${key}`);
    }
  });

  it('TC-30: 구조적 비노출/비활성화 항목들은 항상 PASS', () => {
    const dbEnv = classifyDatabaseEnvironment('local_host');
    const redisEnv = classifyDatabaseEnvironment('local_host');
    const items = buildEnvironmentSafetyChecklist({}, dbEnv, redisEnv);

    const alwaysPassKeys = [
      'no_database_url_exposed',
      'no_redis_url_exposed',
      'no_secret_exposed',
      'naver_api_not_allowed',
      'operating_db_write_blocked',
      'queue_not_allowed',
      'worker_not_allowed',
      'live_execution_disabled',
    ];
    for (const key of alwaysPassKeys) {
      const item = items.find(i => i.key === key);
      assert.equal(item?.status, 'PASS', `Expected ${key} to be PASS`);
    }
  });
});
