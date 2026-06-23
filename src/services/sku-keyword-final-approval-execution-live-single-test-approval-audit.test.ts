import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  validateLiveSingleTestApprovalAcknowledgements,
  sanitizeLiveSingleTestApprovalAuditPayload,
  buildLiveSingleTestApprovalAuditRecord,
  summarizeLiveSingleTestApprovalAudit,
  type LiveSingleTestApprovalAuditInput,
} from './sku-keyword-final-approval-execution-live-single-test-approval-audit.service';

const REQUIRED = [
  'CONFIRM_SINGLE_ITEM_ONLY',
  'CONFIRM_TARGET_PRODUCT_REVIEWED',
  'CONFIRM_PAYLOAD_REVIEWED',
  'CONFIRM_NAVER_API_STILL_DISABLED',
  'CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER',
  'CONFIRM_NO_REPLAY_ALLOWED',
];

function baseInput(overrides: Partial<LiveSingleTestApprovalAuditInput> = {}): LiveSingleTestApprovalAuditInput {
  return {
    finalApprovalId: 'fa-audit-001',
    batchJobId: 'job-audit-001',
    actorId: 'test-actor',
    acknowledgedItems: [...REQUIRED],
    requiredAcknowledgements: REQUIRED,
    targetProductSummary: {
      itemId: 'item-001',
      targetType: 'OPTION',
      targetId: 'opt-001',
      channelProductNo: '1234567890',
      productName: '테스트 상품',
      skuCode: 'SKU-001',
      changeType: 'PRICE',
    },
    payloadSummary: {
      changeType: 'PRICE',
      riskLevel: 'LOW',
      before: { price: 10000 },
      after: { price: 11000 },
    },
    adapterMode: 'mock',
    naverApiCalled: false,
    recordedAt: '2026-06-23T00:00:00.000Z',
    ...overrides,
  };
}

describe('validateLiveSingleTestApprovalAcknowledgements', () => {
  it('모든 필수 항목이 있으면 valid=true, missing=[]', () => {
    const result = validateLiveSingleTestApprovalAcknowledgements([...REQUIRED], REQUIRED);
    assert.equal(result.valid, true);
    assert.equal(result.missingAcknowledgements.length, 0);
  });

  it('일부 항목 누락이면 valid=false, 누락 항목 반환', () => {
    const partial = ['CONFIRM_SINGLE_ITEM_ONLY', 'CONFIRM_PAYLOAD_REVIEWED'];
    const result = validateLiveSingleTestApprovalAcknowledgements(partial, REQUIRED);
    assert.equal(result.valid, false);
    assert.ok(result.missingAcknowledgements.includes('CONFIRM_TARGET_PRODUCT_REVIEWED'));
    assert.ok(result.missingAcknowledgements.includes('CONFIRM_NAVER_API_STILL_DISABLED'));
    assert.ok(result.missingAcknowledgements.includes('CONFIRM_LIVE_CAN_CHANGE_PRODUCT_LATER'));
    assert.ok(result.missingAcknowledgements.includes('CONFIRM_NO_REPLAY_ALLOWED'));
  });

  it('빈 배열이면 모든 항목이 누락', () => {
    const result = validateLiveSingleTestApprovalAcknowledgements([], REQUIRED);
    assert.equal(result.valid, false);
    assert.equal(result.missingAcknowledgements.length, REQUIRED.length);
  });
});

describe('sanitizeLiveSingleTestApprovalAuditPayload', () => {
  it('안전한 필드는 그대로 유지', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      productName: '테스트 상품',
      skuCode: 'SKU-001',
      price: 10000,
    });
    assert.ok(result);
    assert.equal(result.productName, '테스트 상품');
    assert.equal(result.skuCode, 'SKU-001');
    assert.equal(result.price, 10000);
  });

  it('clientSecret 필드 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      productName: '상품',
      clientSecret: 'super-secret-value',
    });
    assert.ok(result);
    assert.equal('clientSecret' in (result ?? {}), false);
    assert.equal(result?.productName, '상품');
  });

  it('token 필드 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      accessToken: 'Bearer xyz',
      changeType: 'PRICE',
    });
    assert.ok(result);
    assert.equal('accessToken' in (result ?? {}), false);
    assert.equal(result?.changeType, 'PRICE');
  });

  it('password 필드 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({ password: 'secret', name: '테스트' });
    assert.ok(result);
    assert.equal('password' in (result ?? {}), false);
    assert.equal(result?.name, '테스트');
  });

  it('postgresql:// 값 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      dbUrl: 'postgresql://user:pass@localhost/db',
      safeField: 'ok',
    });
    assert.ok(result);
    assert.equal('dbUrl' in (result ?? {}), false);
    assert.equal(result?.safeField, 'ok');
  });

  it('redis:// 값 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      cacheUrl: 'redis://localhost:6379',
      name: '이름',
    });
    assert.ok(result);
    assert.equal('cacheUrl' in (result ?? {}), false);
    assert.equal(result?.name, '이름');
  });

  it('credential-bearing URL(user:pass@host) 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      url: 'https://user:secret@api.example.com/v1',
      productName: '상품',
    });
    assert.ok(result);
    assert.equal('url' in (result ?? {}), false);
    assert.equal(result?.productName, '상품');
  });

  it('null/undefined 입력 → null 반환', () => {
    assert.equal(sanitizeLiveSingleTestApprovalAuditPayload(null), null);
    assert.equal(sanitizeLiveSingleTestApprovalAuditPayload(undefined), null);
    assert.equal(sanitizeLiveSingleTestApprovalAuditPayload([]), null);
    assert.equal(sanitizeLiveSingleTestApprovalAuditPayload('string'), null);
  });

  it('중첩 객체에서도 민감 필드 제거', () => {
    const result = sanitizeLiveSingleTestApprovalAuditPayload({
      meta: {
        clientSecret: 'x',
        productName: '상품',
      },
    });
    assert.ok(result);
    const meta = result.meta as Record<string, unknown>;
    assert.equal('clientSecret' in meta, false);
    assert.equal(meta.productName, '상품');
  });
});

describe('buildLiveSingleTestApprovalAuditRecord', () => {
  it('모든 조건 통과 → RECORDED_BUT_NOT_EXECUTABLE, naverApiCallAllowed=false, liveExecutionEnabled=false', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput());

    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
    assert.equal(record.auditStatus, 'RECORDED');
    assert.equal(record.naverApiCallAllowed, false);
    assert.equal(record.liveExecutionEnabled, false);
    assert.equal(record.maxAllowedState, 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
    assert.equal(record.missingAcknowledgements.length, 0);
  });

  it('acknowledgement 누락 → AUDIT_MISSING_ACKNOWLEDGEMENTS', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({ acknowledgedItems: ['CONFIRM_SINGLE_ITEM_ONLY'] })
    );

    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_MISSING_ACKNOWLEDGEMENTS');
    assert.equal(record.naverApiCallAllowed, false);
    assert.equal(record.liveExecutionEnabled, false);
    assert.ok(record.missingAcknowledgements.length > 0);
  });

  it('acknowledgedItems가 빈 배열이면 모든 항목 누락', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({ acknowledgedItems: [] })
    );

    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_MISSING_ACKNOWLEDGEMENTS');
    assert.equal(record.missingAcknowledgements.length, REQUIRED.length);
    assert.equal(record.acknowledgedItems.length, 0);
  });

  it('naverApiCallAllowed는 항상 false', () => {
    const allCases = [
      baseInput(),
      baseInput({ acknowledgedItems: [] }),
      baseInput({ adapterMode: 'live' }),
      baseInput({ naverApiCalled: true }),
    ];
    for (const input of allCases) {
      const record = buildLiveSingleTestApprovalAuditRecord(input);
      assert.equal(record.naverApiCallAllowed, false);
    }
  });

  it('liveExecutionEnabled는 항상 false', () => {
    const allCases = [
      baseInput(),
      baseInput({ acknowledgedItems: [] }),
      baseInput({ adapterMode: 'prod' }),
    ];
    for (const input of allCases) {
      const record = buildLiveSingleTestApprovalAuditRecord(input);
      assert.equal(record.liveExecutionEnabled, false);
    }
  });

  it('adapterMode=live → AUDIT_BLOCKED', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ adapterMode: 'live' }));
    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED');
    assert.equal(record.naverApiCallAllowed, false);
    assert.equal(record.liveExecutionEnabled, false);
  });

  it('adapterMode=prod → AUDIT_BLOCKED', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ adapterMode: 'prod' }));
    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED');
  });

  it('adapterMode=production → AUDIT_BLOCKED', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ adapterMode: 'production' }));
    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED');
  });

  it('adapterMode=operating → AUDIT_BLOCKED', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ adapterMode: 'operating' }));
    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED');
  });

  it('adapterMode 대소문자 무시하여 BLOCKED 처리', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ adapterMode: 'PRODUCTION' }));
    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED');
  });

  it('naverApiCalled=true → 차단이 아닌 warning (auditCode는 RECORDED)', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ naverApiCalled: true }));
    assert.equal(record.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
    assert.ok(record.warnings.length > 0);
    assert.equal(record.naverApiCallAllowed, false);
    assert.equal(record.liveExecutionEnabled, false);
  });

  it('targetProductSummary에서 민감 정보 제거', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({
        targetProductSummary: {
          productName: '상품명',
          clientSecret: 'should-be-removed',
          accessToken: 'should-be-removed',
        },
      })
    );

    assert.ok(record.targetProductSummary);
    assert.equal('clientSecret' in record.targetProductSummary, false);
    assert.equal('accessToken' in record.targetProductSummary, false);
    assert.equal(record.targetProductSummary.productName, '상품명');
  });

  it('payloadSummary에서 secret/token/URL 제거', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({
        payloadSummary: {
          changeType: 'PRICE',
          dbUrl: 'postgresql://user:pass@localhost/db',
          secretKey: 'my-secret-key',
          before: { price: 10000 },
        },
      })
    );

    assert.ok(record.safePayloadSummary);
    assert.equal(record.safePayloadSummary.changeType, 'PRICE');
    assert.equal('dbUrl' in record.safePayloadSummary, false);
    assert.equal('secretKey' in record.safePayloadSummary, false);
  });

  it('audit record에 endpoint/token/clientSecret/DATABASE_URL/REDIS_URL 미포함', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput());
    const recordStr = JSON.stringify(record);

    assert.ok(!recordStr.includes('postgresql://'));
    assert.ok(!recordStr.includes('redis://'));
    assert.ok(!recordStr.includes('DATABASE_URL'));
    assert.ok(!recordStr.includes('REDIS_URL'));
  });

  it('approvalCode는 RECORDED_BUT_NOT_EXECUTABLE 계열만 허용 (auditCode 확인)', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput());
    const validCodes = [
      'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE',
      'LIVE_SINGLE_TEST_APPROVAL_AUDIT_BLOCKED',
      'LIVE_SINGLE_TEST_APPROVAL_AUDIT_MISSING_ACKNOWLEDGEMENTS',
    ];
    assert.ok(validCodes.includes(record.auditCode));
  });

  it('승인 기록이 있어도 실행 가능 상태로 바뀌지 않음 (maxAllowedState 확인)', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput());
    assert.equal(record.maxAllowedState, 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
    assert.equal(record.naverApiCallAllowed, false);
    assert.equal(record.liveExecutionEnabled, false);
  });

  it('requiredAcknowledgements 외 항목은 acknowledgedItems에서 필터링됨', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({ acknowledgedItems: [...REQUIRED, 'EXTRA_UNKNOWN_ACK'] })
    );
    assert.ok(!record.acknowledgedItems.includes('EXTRA_UNKNOWN_ACK'));
    assert.equal(record.acknowledgedItems.length, REQUIRED.length);
  });

  it('recordedAt 입력값이 사용됨', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({ recordedAt: '2026-06-23T12:34:56.000Z' })
    );
    assert.equal(record.recordedAt, '2026-06-23T12:34:56.000Z');
  });

  it('recordedAt 미입력 시 현재 시각으로 자동 설정', () => {
    const before = Date.now();
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({ recordedAt: undefined })
    );
    const after = Date.now();
    const recordedTs = new Date(record.recordedAt).getTime();
    assert.ok(recordedTs >= before && recordedTs <= after + 100);
  });
});

describe('summarizeLiveSingleTestApprovalAudit', () => {
  it('RECORDED 상태의 요약을 올바르게 생성', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput());
    const summary = summarizeLiveSingleTestApprovalAudit(record, REQUIRED.length);

    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.liveExecutionEnabled, false);
    assert.equal(summary.auditCode, 'LIVE_SINGLE_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE');
    assert.ok(summary.statusLabel.includes('저장 완료'));
    assert.equal(summary.acknowledgedCount, REQUIRED.length);
    assert.equal(summary.missingCount, 0);
    assert.equal(summary.hasBlockers, false);
    assert.equal(summary.totalRequired, REQUIRED.length);
  });

  it('BLOCKED 상태의 요약을 올바르게 생성', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(baseInput({ adapterMode: 'live' }));
    const summary = summarizeLiveSingleTestApprovalAudit(record, REQUIRED.length);

    assert.equal(summary.hasBlockers, true);
    assert.ok(summary.statusLabel.includes('저장 불가'));
    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.liveExecutionEnabled, false);
  });

  it('MISSING_ACKNOWLEDGEMENTS 상태의 요약을 올바르게 생성', () => {
    const record = buildLiveSingleTestApprovalAuditRecord(
      baseInput({ acknowledgedItems: ['CONFIRM_SINGLE_ITEM_ONLY'] })
    );
    const summary = summarizeLiveSingleTestApprovalAudit(record, REQUIRED.length);

    assert.equal(summary.hasBlockers, false);
    assert.ok(summary.missingCount > 0);
    assert.ok(summary.statusLabel.includes('미확인'));
    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.liveExecutionEnabled, false);
  });

  it('naverApiCallAllowed와 liveExecutionEnabled는 항상 false', () => {
    const cases = [
      baseInput(),
      baseInput({ adapterMode: 'live' }),
      baseInput({ acknowledgedItems: [] }),
    ];
    for (const input of cases) {
      const record = buildLiveSingleTestApprovalAuditRecord(input);
      const summary = summarizeLiveSingleTestApprovalAudit(record, REQUIRED.length);
      assert.equal(summary.naverApiCallAllowed, false);
      assert.equal(summary.liveExecutionEnabled, false);
    }
  });
});
