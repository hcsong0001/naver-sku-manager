import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildLiveSingleTestAuditDashboardItem,
  buildLiveSingleTestAuditDashboardSummary,
  sanitizeLiveSingleTestAuditDashboardItems,
  evaluateLiveSingleTestAuditDashboardReadiness,
} from './sku-keyword-final-approval-execution-live-single-test-audit-dashboard.service';
import type { LiveSingleTestAuditHistoryItem } from './sku-keyword-final-approval-execution-live-single-test-audit-history.service';

const BATCH_JOB_ID = 'test-batch-job-001';
const FINAL_APPROVAL_ID = 'test-fa-001';

function makeAuditItem(overrides: Partial<LiveSingleTestAuditHistoryItem> = {}): LiveSingleTestAuditHistoryItem {
  return {
    id: `audit-${BATCH_JOB_ID}-0`,
    batchJobId: BATCH_JOB_ID,
    finalApprovalId: FINAL_APPROVAL_ID,
    auditCode: 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
    status: 'RECORDED_BUT_NOT_EXECUTABLE',
    recordedAt: '2026-06-23T10:00:00.000Z',
    actorId: 'UI_USER',
    acknowledgedItems: [
      'CONFIRM_SINGLE_ITEM_ONLY',
      'CONFIRM_TARGET_PRODUCT_REVIEWED',
      'CONFIRM_PAYLOAD_REVIEWED',
      'CONFIRM_NAVER_API_STILL_DISABLED',
      'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER',
      'CONFIRM_NO_REPLAY_ALLOWED',
    ],
    missingAcknowledgements: [],
    targetProductSummary: {
      itemId: 'item-001',
      productName: '테스트 상품',
      changeType: 'PRICE_UPDATE',
    },
    safePayloadSummary: { changeType: 'PRICE_UPDATE', riskLevel: 'LOW' },
    naverApiCallAllowed: false,
    liveExecutionEnabled: false,
    queueAllowed: false,
    workerAllowed: false,
    sanitized: true,
    ...overrides,
  };
}

// ── evaluateLiveSingleTestAuditDashboardReadiness — items ─────────────────────

describe('evaluateLiveSingleTestAuditDashboardReadiness — items', () => {
  it('TC-01: auditHistoryItems가 있으면 dashboard items 생성됨', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.items.length, 1);
    assert.equal(result.summary.totalCount, 1);
  });

  it('TC-02: 빈 배열이면 totalCount=0', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [],
    });
    assert.equal(result.items.length, 0);
    assert.equal(result.summary.totalCount, 0);
    assert.ok(result.warnings.length > 0);
  });

  it('TC-03: limit이 적용됨 (limit=2이면 최대 2건)', () => {
    const items = Array.from({ length: 10 }, (_, i) =>
      makeAuditItem({ id: `audit-job-${i}`, batchJobId: `job-${i}` })
    );
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: items,
      limit: 2,
    });
    assert.equal(result.items.length, 2);
    assert.equal(result.summary.totalCount, 2);
  });

  it('TC-04: limit이 없으면 기본 50 적용 (항목이 50 미만이면 전부 반환)', () => {
    const items = Array.from({ length: 5 }, (_, i) =>
      makeAuditItem({ id: `audit-job-${i}`, batchJobId: `job-${i}` })
    );
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: items,
    });
    assert.equal(result.items.length, 5);
  });

  it('TC-05: limit=150이면 최대 100으로 clamp됨', () => {
    const items = Array.from({ length: 120 }, (_, i) =>
      makeAuditItem({ id: `audit-job-${i}`, batchJobId: `job-${i}` })
    );
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: items,
      limit: 150,
    });
    assert.equal(result.items.length, 100);
  });
});

// ── evaluateLiveSingleTestAuditDashboardReadiness — safety invariants ─────────

describe('evaluateLiveSingleTestAuditDashboardReadiness — safety invariants', () => {
  it('TC-06: naverApiCallAllowed는 항상 false', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.naverApiCallAllowed, false);
    assert.equal(result.summary.naverApiCallAllowed, false);
  });

  it('TC-07: liveExecutionEnabled는 항상 false', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.liveExecutionEnabled, false);
    assert.equal(result.summary.liveExecutionEnabled, false);
  });

  it('TC-08: operatingDbWriteAllowed는 항상 false', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.operatingDbWriteAllowed, false);
    assert.equal(result.summary.operatingDbWriteAllowed, false);
  });

  it('TC-09: queueAllowed는 항상 false', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.queueAllowed, false);
    assert.equal(result.summary.queueAllowed, false);
  });

  it('TC-10: workerAllowed는 항상 false', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.workerAllowed, false);
    assert.equal(result.summary.workerAllowed, false);
  });

  it('TC-11: sanitized는 항상 true', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.sanitized, true);
    assert.equal(result.summary.sanitized, true);
  });

  it('TC-12: maxAllowedState는 READ_ONLY 계열만 반환됨', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    assert.equal(result.maxAllowedState, 'LIVE_APPROVAL_AUDIT_DASHBOARD_READ_ONLY_READY');
  });
});

// ── evaluateLiveSingleTestAuditDashboardReadiness — secret/URL 미포함 ─────────

describe('evaluateLiveSingleTestAuditDashboardReadiness — secret/URL non-exposure', () => {
  it('TC-13: 결과 JSON에 secret/token/clientSecret이 포함되지 않음', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('clientSecret'));
    assert.ok(!json.includes('accessToken'));
    assert.ok(!json.includes('apiKey'));
  });

  it('TC-14: 결과 JSON에 DATABASE_URL/REDIS_URL 원문이 포함되지 않음', () => {
    const result = evaluateLiveSingleTestAuditDashboardReadiness({
      auditHistoryItems: [makeAuditItem()],
    });
    const json = JSON.stringify(result);
    assert.ok(!json.includes('postgresql://'));
    assert.ok(!json.includes('redis://'));
  });
});

// ── buildLiveSingleTestAuditDashboardSummary ──────────────────────────────────

describe('buildLiveSingleTestAuditDashboardSummary', () => {
  it('TC-15: latestRecordedAt이 최신 기록 기준으로 계산됨', () => {
    const items = [
      makeAuditItem({ recordedAt: '2026-06-01T00:00:00.000Z' }),
      makeAuditItem({ recordedAt: '2026-06-23T10:00:00.000Z', id: 'audit-2', batchJobId: 'job-2' }),
      makeAuditItem({ recordedAt: '2026-06-10T00:00:00.000Z', id: 'audit-3', batchJobId: 'job-3' }),
    ];
    const summary = buildLiveSingleTestAuditDashboardSummary(items);
    assert.equal(summary.latestRecordedAt, '2026-06-23T10:00:00.000Z');
    assert.equal(summary.totalCount, 3);
  });

  it('TC-16: acknowledgedCompleteCount 계산 — missingAcknowledgements가 비어있는 항목 수', () => {
    const items = [
      makeAuditItem({ missingAcknowledgements: [] }),
      makeAuditItem({ missingAcknowledgements: ['CONFIRM_SINGLE_ITEM_ONLY'], id: 'audit-2', batchJobId: 'job-2' }),
      makeAuditItem({ missingAcknowledgements: [], id: 'audit-3', batchJobId: 'job-3' }),
    ];
    const summary = buildLiveSingleTestAuditDashboardSummary(items);
    assert.equal(summary.acknowledgedCompleteCount, 2);
    assert.equal(summary.missingAcknowledgementCount, 1);
  });

  it('TC-17: missingAcknowledgementCount 계산', () => {
    const items = [
      makeAuditItem({ missingAcknowledgements: ['CONFIRM_SINGLE_ITEM_ONLY'] }),
      makeAuditItem({ missingAcknowledgements: ['CONFIRM_PAYLOAD_REVIEWED'], id: 'audit-2', batchJobId: 'job-2' }),
    ];
    const summary = buildLiveSingleTestAuditDashboardSummary(items);
    assert.equal(summary.missingAcknowledgementCount, 2);
    assert.equal(summary.acknowledgedCompleteCount, 0);
  });

  it('TC-18: 빈 items이면 전체 카운트 0', () => {
    const summary = buildLiveSingleTestAuditDashboardSummary([]);
    assert.equal(summary.totalCount, 0);
    assert.equal(summary.latestRecordedAt, null);
    assert.equal(summary.acknowledgedCompleteCount, 0);
    assert.equal(summary.missingAcknowledgementCount, 0);
  });

  it('TC-19: UNKNOWN status는 unknownStatusCount에 집계됨', () => {
    const items = [
      makeAuditItem({ status: 'UNKNOWN', id: 'audit-2', batchJobId: 'job-2' }),
      makeAuditItem(),
    ];
    const summary = buildLiveSingleTestAuditDashboardSummary(items);
    assert.equal(summary.unknownStatusCount, 1);
    assert.equal(summary.recordedButNotExecutableCount, 1);
  });
});

// ── sanitizeLiveSingleTestAuditDashboardItems ─────────────────────────────────

describe('sanitizeLiveSingleTestAuditDashboardItems', () => {
  it('TC-20: malformed item(빈 배열 입력)은 WARN 처리 — 크래시 없음', () => {
    assert.doesNotThrow(() => {
      const result = sanitizeLiveSingleTestAuditDashboardItems([], 10);
      assert.equal(result.length, 0);
    });
  });

  it('TC-21: limit=0이면 1로 clamp됨', () => {
    const items = [makeAuditItem()];
    const result = sanitizeLiveSingleTestAuditDashboardItems(items, 0);
    assert.equal(result.length, 1);
  });

  it('TC-22: limit=100 초과는 100으로 clamp됨', () => {
    const items = Array.from({ length: 200 }, (_, i) =>
      makeAuditItem({ id: `audit-${i}`, batchJobId: `job-${i}` })
    );
    const result = sanitizeLiveSingleTestAuditDashboardItems(items, 200);
    assert.equal(result.length, 100);
  });
});

// ── buildLiveSingleTestAuditDashboardItem (alias) ─────────────────────────────

describe('buildLiveSingleTestAuditDashboardItem', () => {
  it('TC-23: buildLiveSingleTestAuditDashboardItem은 evaluateLiveSingleTestAuditDashboardReadiness와 동일한 결과', () => {
    const input = { auditHistoryItems: [makeAuditItem()] };
    const r1 = buildLiveSingleTestAuditDashboardItem(input);
    const r2 = evaluateLiveSingleTestAuditDashboardReadiness(input);
    assert.deepEqual(r1, r2);
  });
});
