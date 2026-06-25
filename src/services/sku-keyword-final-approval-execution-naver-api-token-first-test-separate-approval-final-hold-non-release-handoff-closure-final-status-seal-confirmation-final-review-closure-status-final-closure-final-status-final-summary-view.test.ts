import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalSummaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-summary-view.service';

const SERVICE_FILE = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-summary-view.service.ts'
);

const FORBIDDEN_PATTERNS = [
  'fetch',
  'axios',
  'Authorization',
  'Bearer',
  'http://',
  'https://',
  '.create(',
  '.update(',
  '.delete(',
  'onSubmit',
  '<form',
  'execute(',
];

const buildView =
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalSummaryView;

describe('서비스 파일 금지 문자열 검사', () => {
  const source = readFileSync(SERVICE_FILE, 'utf8');

  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`금지 문자열 "${pattern}"이 없음`, () => {
      assert.ok(!source.includes(pattern), `금지 문자열 발견: ${pattern}`);
    });
  }
});

describe('Task 111 View Model 기본 필드', () => {
  const view = buildView();

  it('View Model이 생성됨', () => {
    assert.ok(view && typeof view === 'object');
  });

  for (const field of ['title', 'statusLabel', 'summary', 'finalNotice'] as const) {
    it(`${field}이 존재함`, () => {
      assert.ok(typeof view[field] === 'string' && view[field].length > 0);
    });
  }

  it('statusLabel이 FINAL CLOSURE FINAL STATUS FINAL SUMMARY를 포함함', () => {
    assert.ok(view.statusLabel.includes('FINAL CLOSURE FINAL STATUS FINAL SUMMARY'));
  });

  it('statusTone이 허용된 값임', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('finalNotice가 Task 111 이후에도 전환 불가를 표현함', () => {
    assert.ok(view.finalNotice.includes('Task 111'));
    assert.ok(view.finalNotice.includes('별도 승인 전까지'));
  });

  it('undefined 입력으로도 생성됨', () => {
    assert.ok(buildView());
  });

  it('null 입력으로도 생성됨', () => {
    assert.ok(buildView(null));
  });
});

describe('Task 범위와 이전 커밋 참조', () => {
  const view = buildView();

  it('taskRangeLabel이 Task 41~110 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41'));
    assert.ok(view.taskRangeLabel.includes('110'));
  });

  it('previousFinalStatusSealCommit이 Task 110 기준 커밋임', () => {
    assert.strictEqual(view.previousFinalStatusSealCommit, '0ba5db5');
  });

  it('previousFinalStatusSealLabel이 Task 110을 참조함', () => {
    assert.ok(view.previousFinalStatusSealLabel.includes('Task 110'));
  });
});

describe('Final Summary', () => {
  const items = buildView().finalSummaryItems;

  it('배열이며 4개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 4);
  });

  it('모든 항목이 필수 문자열을 가짐', () => {
    for (const item of items) {
      assert.ok(item.label.length > 0);
      assert.ok(item.description.length > 0);
      assert.ok(item.summaryState.length > 0);
    }
  });

  it('모든 tone이 허용된 값임', () => {
    for (const item of items) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('미해제 최종 요약 상태를 포함함', () => {
    assert.ok(items.some((item) => item.summaryState.includes('미해제')));
  });
});

describe('Final Status Flow', () => {
  const items = buildView().finalStatusFlowItems;

  it('배열이며 4개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 4);
  });

  for (const keyword of ['Task 108', 'Task 109', 'Task 110', 'Task 111']) {
    it(`${keyword} 흐름을 포함함`, () => {
      assert.ok(items.some((item) => item.label.includes(keyword) || item.flowState.includes(keyword)));
    });
  }

  it('모든 tone이 허용된 값임', () => {
    for (const item of items) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('Non-Release Final Summary', () => {
  const items = buildView().nonReleaseFinalSummaryItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  it('보류 미해제 최종 요약 상태를 표현함', () => {
    assert.ok(items.some((item) => item.nonReleaseState.includes('미해제')));
  });

  it('token 미허용 유지를 포함함', () => {
    assert.ok(items.some((item) => item.nonReleaseState.includes('token')));
  });

  it('모든 tone이 blocked임', () => {
    for (const item of items) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('Not Release Approval', () => {
  const items = buildView().notReleaseApprovalItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  for (const keyword of ['보류 해제', '제출', '실행', 'token']) {
    it(`${keyword} 승인 아님을 포함함`, () => {
      assert.ok(items.some((item) => item.label.includes(keyword) || item.notApprovalReason.includes(keyword)));
    });
  }

  it('모든 tone이 warning 또는 blocked임', () => {
    for (const item of items) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('Transition Still Blocked', () => {
  const items = buildView().transitionStillBlockedItems;

  it('배열이며 4개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 4);
  });

  for (const keyword of ['보류 해제', '제출', '실행', 'token']) {
    it(`${keyword} 전환 차단을 포함함`, () => {
      assert.ok(items.some((item) => item.label.includes(keyword) || item.blockedState.includes(keyword)));
    });
  }

  it('외부 호출 전환 차단을 포함함', () => {
    assert.ok(items.some((item) => item.blockedState.includes('외부 호출')));
  });

  it('모든 tone이 blocked임', () => {
    for (const item of items) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('Required Before Any Future Transition', () => {
  const items = buildView().requiredBeforeAnyFutureTransitionItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  it('별도 승인 증거를 포함함', () => {
    assert.ok(items.some((item) => item.requiredEvidence.includes('승인')));
  });

  it('Task 41~111 증거를 포함함', () => {
    assert.ok(items.some((item) => item.requiredEvidence.includes('Task 41~111')));
  });

  it('모든 항목이 필수 문자열과 허용 tone을 가짐', () => {
    for (const item of items) {
      assert.ok(item.label.length > 0);
      assert.ok(item.description.length > 0);
      assert.ok(item.requiredEvidence.length > 0);
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('Next Safe Review', () => {
  const items = buildView().nextSafeReviewItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  it('다음 안전 검토 단계를 표현함', () => {
    assert.ok(items.some((item) => item.label.includes('검토') || item.description.includes('확인')));
  });

  it('nextOwner가 사람 중심임', () => {
    for (const item of items) {
      assert.ok(item.nextOwner.includes('사람'));
    }
  });

  it('모든 tone이 neutral 또는 warning임', () => {
    for (const item of items) {
      assert.ok(['neutral', 'warning'].includes(item.tone));
    }
  });
});

describe('Still Forbidden', () => {
  const items = buildView().stillForbiddenItems;

  it('배열이며 7개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 7);
  });

  for (const keyword of ['API', 'token', 'DB', 'Queue/Worker']) {
    it(`${keyword} 금지 항목을 포함함`, () => {
      assert.ok(items.some((item) => item.label.includes(keyword) || item.description.includes(keyword)));
    });
  }

  it('모든 tone이 blocked임', () => {
    for (const item of items) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('순수 함수와 참조 격리', () => {
  it('여러 호출이 동일한 핵심 상태를 반환함', () => {
    const first = buildView();
    const second = buildView();
    assert.strictEqual(first.statusLabel, second.statusLabel);
    assert.strictEqual(first.previousFinalStatusSealCommit, second.previousFinalStatusSealCommit);
  });

  it('입력값과 무관하게 동일한 안전 상태를 반환함', () => {
    assert.strictEqual(buildView({ value: 1 }).statusLabel, buildView({ value: 2 }).statusLabel);
  });

  it('배열 참조가 호출마다 분리됨', () => {
    assert.notStrictEqual(buildView().finalSummaryItems, buildView().finalSummaryItems);
    assert.notStrictEqual(buildView().stillForbiddenItems, buildView().stillForbiddenItems);
  });

  it('DB/API/HTTP/Prisma 동작 코드가 없음', () => {
    const source = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!source.includes('prisma.'));
    assert.ok(!source.includes('PrismaClient'));
    assert.deepStrictEqual(FORBIDDEN_PATTERNS.filter((pattern) => source.includes(pattern)), []);
  });
});
