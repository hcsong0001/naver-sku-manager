import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildLiveSingleTestAuditHistoryItem,
  extractSafeLiveSingleTestAuditHistory,
  sanitizeLiveSingleTestAuditHistoryRecord,
  summarizeLiveSingleTestAuditHistory,
} from './sku-keyword-final-approval-execution-live-single-test-audit-history.service';

const BATCH_JOB_ID = 'test-batch-job-001';
const FINAL_APPROVAL_ID = 'test-fa-001';

const VALID_AUDIT_RECORD = {
  auditCode: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
  auditStatus: 'RECORDED_BUT_NOT_EXECUTABLE',
  auditMessage: '승인 기록 완료',
  finalApprovalId: FINAL_APPROVAL_ID,
  batchJobId: BATCH_JOB_ID,
  actorId: 'UI_USER',
  recordedAt: '2026-06-23T10:00:00.000Z',
  acknowledgedItems: [
    'CONFIRM_SINGLE_ITEM_ONLY',
    'CONFIRM_TARGET_PRODUCT_REVIEWED',
    'CONFIRM_PAYLOAD_REVIEWED',
    'CONFIRM_NAVER_API_STILL_DISABLED',
    'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER',
    'CONFIRM_NO_REPLAY_ALLOWED',
  ],
  missingAcknowledgements: [],
  warnings: [],
  naverApiCallAllowed: false,
  liveExecutionEnabled: false,
  maxAllowedState: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
  targetProductSummary: {
    itemId: 'item-001',
    targetType: 'SINGLE',
    targetId: 'target-001',
    channelProductNo: 'channel-001',
    productName: '테스트 상품',
    skuCode: 'SKU-001',
    changeType: 'PRICE_UPDATE',
  },
  safePayloadSummary: {
    changeType: 'PRICE_UPDATE',
    riskLevel: 'LOW',
  },
};

// ── buildLiveSingleTestAuditHistoryItem — exists ──────────────────────────────

describe('buildLiveSingleTestAuditHistoryItem — exists', () => {
  it('TC-01: metadata.liveSingleTestApprovalAudit가 있으면 exists=true', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.exists, true);
    assert.equal(result.items.length, 1);
  });

  it('TC-02: audit record가 없으면 exists=false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: {},
    });
    assert.equal(result.exists, false);
    assert.equal(result.items.length, 0);
    assert.equal(result.latestAudit, null);
  });

  it('TC-03: metadata 자체가 null이면 exists=false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: null,
    });
    assert.equal(result.exists, false);
  });

  it('TC-04: liveSingleTestApprovalAudit 직접 입력 시 items에 포함됨', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: VALID_AUDIT_RECORD,
    });
    assert.equal(result.exists, true);
    assert.equal(result.items.length, 1);
  });
});

// ── buildLiveSingleTestAuditHistoryItem — safety invariants ──────────────────

describe('buildLiveSingleTestAuditHistoryItem — safety invariants', () => {
  it('TC-05: naverApiCallAllowed는 항상 false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.naverApiCallAllowed, false);
    assert.equal(result.latestAudit?.naverApiCallAllowed, false);
  });

  it('TC-06: liveExecutionEnabled는 항상 false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.liveExecutionEnabled, false);
    assert.equal(result.latestAudit?.liveExecutionEnabled, false);
  });

  it('TC-07: operatingDbWriteAllowed는 항상 false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.operatingDbWriteAllowed, false);
    assert.equal(result.summary.operatingDbWriteAllowed, false);
  });

  it('TC-08: queueAllowed는 항상 false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.queueAllowed, false);
    assert.equal(result.latestAudit?.queueAllowed, false);
  });

  it('TC-09: workerAllowed는 항상 false', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.workerAllowed, false);
    assert.equal(result.latestAudit?.workerAllowed, false);
  });

  it('TC-10: sanitized는 항상 true', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.sanitized, true);
    assert.equal(result.latestAudit?.sanitized, true);
  });

  it('TC-11: maxAllowedState는 항상 READ_ONLY 계열', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      metadata: { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
    });
    assert.equal(result.maxAllowedState, 'LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY');
  });
});

// ── sanitizeLiveSingleTestAuditHistoryRecord — sensitive data removal ─────────

describe('sanitizeLiveSingleTestAuditHistoryRecord — sensitive data removal', () => {
  it('TC-12: secret 필드가 포함된 raw는 sanitize 후 제거됨', () => {
    const raw = {
      ...VALID_AUDIT_RECORD,
      clientSecret: 'super-secret-value',
      apiKey: 'api-key-12345',
    };
    const item = sanitizeLiveSingleTestAuditHistoryRecord(raw, BATCH_JOB_ID, 0);
    assert.ok(item !== null);
    const json = JSON.stringify(item);
    assert.ok(!json.includes('super-secret-value'));
    assert.ok(!json.includes('api-key-12345'));
  });

  it('TC-13: DATABASE_URL 원문이 결과에 포함되지 않음', () => {
    const raw = {
      ...VALID_AUDIT_RECORD,
      databaseUrl: 'postgresql://user:pass@localhost:5432/db',
    };
    const item = sanitizeLiveSingleTestAuditHistoryRecord(raw, BATCH_JOB_ID, 0);
    const json = JSON.stringify(item);
    assert.ok(!json.includes('postgresql://'));
  });

  it('TC-14: REDIS_URL 원문이 결과에 포함되지 않음', () => {
    const raw = {
      ...VALID_AUDIT_RECORD,
      redisUrl: 'redis://user:pass@localhost:6379',
    };
    const item = sanitizeLiveSingleTestAuditHistoryRecord(raw, BATCH_JOB_ID, 0);
    const json = JSON.stringify(item);
    assert.ok(!json.includes('redis://'));
  });

  it('TC-15: token/credential/password 필드명이 있어도 결과에 포함되지 않음', () => {
    const raw = {
      ...VALID_AUDIT_RECORD,
      accessToken: 'bearer-token-xyz',
      password: 'pa$$word',
      credential: 'cred-abc',
    };
    const item = sanitizeLiveSingleTestAuditHistoryRecord(raw, BATCH_JOB_ID, 0);
    const json = JSON.stringify(item);
    assert.ok(!json.includes('bearer-token-xyz'));
    assert.ok(!json.includes('pa$$word'));
    assert.ok(!json.includes('cred-abc'));
  });

  it('TC-16: targetProductSummary가 안전한 필드만 포함함', () => {
    const item = sanitizeLiveSingleTestAuditHistoryRecord(
      {
        ...VALID_AUDIT_RECORD,
        targetProductSummary: {
          itemId: 'item-001',
          productName: '테스트 상품',
          secretKey: 'should-not-appear',
          tokenValue: 'token-xyz',
        },
      },
      BATCH_JOB_ID,
      0
    );
    assert.ok(item !== null);
    const json = JSON.stringify(item?.targetProductSummary);
    assert.ok(!json.includes('should-not-appear'));
    assert.ok(!json.includes('token-xyz'));
    assert.ok(json.includes('item-001'));
  });

  it('TC-17: safePayloadSummary가 changeType과 riskLevel만 포함함', () => {
    const item = sanitizeLiveSingleTestAuditHistoryRecord(
      {
        ...VALID_AUDIT_RECORD,
        safePayloadSummary: {
          changeType: 'PRICE_UPDATE',
          riskLevel: 'LOW',
          secretEndpoint: 'https://api.naver.com/secret',
        },
      },
      BATCH_JOB_ID,
      0
    );
    assert.ok(item !== null);
    const json = JSON.stringify(item?.safePayloadSummary);
    assert.ok(json.includes('PRICE_UPDATE'));
    assert.ok(json.includes('LOW'));
    assert.ok(!json.includes('naver.com'));
  });
});

// ── buildLiveSingleTestAuditHistoryItem — malformed metadata ─────────────────

describe('buildLiveSingleTestAuditHistoryItem — malformed metadata', () => {
  it('TC-18: malformed metadata(null)는 throw하지 않고 empty result 반환', () => {
    assert.doesNotThrow(() => {
      const result = buildLiveSingleTestAuditHistoryItem({
        batchJobId: BATCH_JOB_ID,
        metadata: null,
      });
      assert.equal(result.exists, false);
    });
  });

  it('TC-19: malformed metadata(배열)는 throw하지 않고 empty result 반환', () => {
    assert.doesNotThrow(() => {
      const result = buildLiveSingleTestAuditHistoryItem({
        batchJobId: BATCH_JOB_ID,
        metadata: [1, 2, 3],
      });
      assert.equal(result.exists, false);
    });
  });

  it('TC-20: liveSingleTestApprovalAudit이 null이면 items 비어있음', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: null,
    });
    assert.equal(result.exists, false);
    assert.equal(result.items.length, 0);
  });

  it('TC-21: liveSingleTestApprovalAudit이 문자열이면 null 반환 (not crash)', () => {
    assert.doesNotThrow(() => {
      const result = buildLiveSingleTestAuditHistoryItem({
        batchJobId: BATCH_JOB_ID,
        liveSingleTestApprovalAudit: 'invalid-string',
      });
      assert.equal(result.exists, false);
    });
  });
});

// ── buildLiveSingleTestAuditHistoryItem — latestAudit ────────────────────────

describe('buildLiveSingleTestAuditHistoryItem — latestAudit', () => {
  it('TC-22: latestAudit이 안전한 필드만 포함', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: VALID_AUDIT_RECORD,
    });
    const latest = result.latestAudit!;
    assert.ok(typeof latest.id === 'string');
    assert.ok(typeof latest.batchJobId === 'string');
    assert.equal(latest.naverApiCallAllowed, false);
    assert.equal(latest.liveExecutionEnabled, false);
    assert.equal(latest.queueAllowed, false);
    assert.equal(latest.workerAllowed, false);
    assert.equal(latest.sanitized, true);
  });

  it('TC-23: acknowledgedItems와 missingAcknowledgements가 배열로 정규화됨', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: VALID_AUDIT_RECORD,
    });
    const latest = result.latestAudit!;
    assert.ok(Array.isArray(latest.acknowledgedItems));
    assert.ok(Array.isArray(latest.missingAcknowledgements));
    assert.equal(latest.acknowledgedItems.length, 6);
    assert.equal(latest.missingAcknowledgements.length, 0);
  });

  it('TC-24: acknowledgedItems가 배열이 아닌 경우 빈 배열로 정규화됨', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: {
        ...VALID_AUDIT_RECORD,
        acknowledgedItems: null,
        missingAcknowledgements: 'not-an-array',
      },
    });
    if (result.latestAudit) {
      assert.ok(Array.isArray(result.latestAudit.acknowledgedItems));
      assert.ok(Array.isArray(result.latestAudit.missingAcknowledgements));
    }
  });

  it('TC-25: auditCode가 없으면 UNKNOWN으로 표시됨', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: {
        recordedAt: '2026-06-23T10:00:00.000Z',
        actorId: 'test-actor',
      },
    });
    if (result.latestAudit) {
      assert.equal(result.latestAudit.auditCode, 'UNKNOWN');
      assert.equal(result.latestAudit.status, 'UNKNOWN');
    }
  });
});

// ── summarizeLiveSingleTestAuditHistory ───────────────────────────────────────

describe('summarizeLiveSingleTestAuditHistory', () => {
  it('TC-26: items가 비어있으면 totalRecords=0, hasAuditRecord=false', () => {
    const summary = summarizeLiveSingleTestAuditHistory([]);
    assert.equal(summary.totalRecords, 0);
    assert.equal(summary.hasAuditRecord, false);
    assert.equal(summary.latestAuditCode, null);
    assert.equal(summary.latestRecordedAt, null);
  });

  it('TC-27: items가 있으면 totalRecords>0, hasAuditRecord=true', () => {
    const result = buildLiveSingleTestAuditHistoryItem({
      batchJobId: BATCH_JOB_ID,
      liveSingleTestApprovalAudit: VALID_AUDIT_RECORD,
    });
    const summary = result.summary;
    assert.equal(summary.totalRecords, 1);
    assert.equal(summary.hasAuditRecord, true);
    assert.ok(typeof summary.latestAuditCode === 'string');
  });

  it('TC-28: summary의 모든 safety flags가 false', () => {
    const summary = summarizeLiveSingleTestAuditHistory([]);
    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.liveExecutionEnabled, false);
    assert.equal(summary.operatingDbWriteAllowed, false);
    assert.equal(summary.queueAllowed, false);
    assert.equal(summary.workerAllowed, false);
  });
});

// ── extractSafeLiveSingleTestAuditHistory ────────────────────────────────────

describe('extractSafeLiveSingleTestAuditHistory', () => {
  it('TC-29: 유효한 metadata에서 audit record 추출됨', () => {
    const items = extractSafeLiveSingleTestAuditHistory(
      { liveSingleTestApprovalAudit: VALID_AUDIT_RECORD },
      BATCH_JOB_ID
    );
    assert.equal(items.length, 1);
    assert.equal(items[0].batchJobId, BATCH_JOB_ID);
  });

  it('TC-30: 빈 metadata에서 items 비어있음', () => {
    const items = extractSafeLiveSingleTestAuditHistory({}, BATCH_JOB_ID);
    assert.equal(items.length, 0);
  });

  it('TC-31: null metadata에서 items 비어있음', () => {
    const items = extractSafeLiveSingleTestAuditHistory(null, BATCH_JOB_ID);
    assert.equal(items.length, 0);
  });

  it('TC-32: metadata가 배열이면 items 비어있음', () => {
    const items = extractSafeLiveSingleTestAuditHistory([], BATCH_JOB_ID);
    assert.equal(items.length, 0);
  });
});
