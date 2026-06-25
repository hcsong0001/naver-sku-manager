import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusBoundaryView } from './sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-boundary-view.service';

const SERVICE_FILE = resolve(
  __dirname,
  'sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-boundary-view.service.ts'
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
  buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusBoundaryView;

describe('서비스 파일 금지 문자열 검사', () => {
  const source = readFileSync(SERVICE_FILE, 'utf8');

  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`금지 문자열 "${pattern}"이 없음`, () => {
      assert.ok(!source.includes(pattern), `금지 문자열 발견: ${pattern}`);
    });
  }
});

describe('Task 109 View Model 기본 필드', () => {
  const view = buildView();

  it('View Model이 생성됨', () => {
    assert.ok(view && typeof view === 'object');
  });

  for (const field of ['title', 'statusLabel', 'summary', 'finalNotice'] as const) {
    it(`${field}이 존재함`, () => {
      assert.ok(typeof view[field] === 'string' && view[field].length > 0);
    });
  }

  it('statusLabel이 FINAL CLOSURE FINAL STATUS BOUNDARY를 포함함', () => {
    assert.ok(view.statusLabel.includes('FINAL CLOSURE FINAL STATUS BOUNDARY'));
  });

  it('statusTone이 허용된 값임', () => {
    assert.ok(['neutral', 'warning', 'blocked'].includes(view.statusTone));
  });

  it('finalNotice가 Task 109 이후에도 전환 불가를 표현함', () => {
    assert.ok(view.finalNotice.includes('Task 109'));
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

  it('taskRangeLabel이 Task 41~108 흐름을 표현함', () => {
    assert.ok(view.taskRangeLabel.includes('Task 41'));
    assert.ok(view.taskRangeLabel.includes('108'));
  });

  it('previousFinalStatusSummaryCommit이 Task 108 기준 커밋임', () => {
    assert.strictEqual(view.previousFinalStatusSummaryCommit, '4ecbd92');
  });

  it('previousFinalStatusSummaryLabel이 Task 108을 참조함', () => {
    assert.ok(view.previousFinalStatusSummaryLabel.includes('Task 108'));
  });
});

describe('Final Status Boundary Summary', () => {
  const items = buildView().finalStatusBoundarySummaryItems;

  it('배열이며 4개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 4);
  });

  it('모든 항목이 필수 문자열을 가짐', () => {
    for (const item of items) {
      assert.ok(item.label.length > 0);
      assert.ok(item.description.length > 0);
      assert.ok(item.boundaryState.length > 0);
    }
  });

  it('모든 tone이 허용된 값임', () => {
    for (const item of items) {
      assert.ok(['neutral', 'warning', 'blocked'].includes(item.tone));
    }
  });

  it('경계 상태 표현을 포함함', () => {
    assert.ok(items.some((item) => item.boundaryState.includes('경계')));
  });
});

describe('Final Status Summary Is Not Release', () => {
  const items = buildView().finalStatusSummaryIsNotReleaseItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  it('최종 상태 요약이 보류 해제가 아님을 표현함', () => {
    assert.ok(items.some((item) => item.notReleaseReason.includes('보류 해제')));
  });

  it('token 허용 아님을 포함함', () => {
    assert.ok(items.some((item) => item.notReleaseReason.includes('token')));
  });

  it('모든 tone이 warning 또는 blocked임', () => {
    for (const item of items) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('Final Status Review Is Not Approval', () => {
  const items = buildView().finalStatusReviewNotApprovalItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  it('최종 상태 요약 확인과 승인 부여를 분리함', () => {
    assert.ok(items.some((item) => item.correctInterpretation.includes('승인 부여 아님')));
  });

  it('실행 준비 아님을 포함함', () => {
    assert.ok(items.some((item) => item.correctInterpretation.includes('실행 준비 아님')));
  });

  it('모든 tone이 warning 또는 blocked임', () => {
    for (const item of items) {
      assert.ok(['warning', 'blocked'].includes(item.tone));
    }
  });
});

describe('Blocked Transition', () => {
  const items = buildView().blockedTransitionItems;

  it('배열이며 4개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 4);
  });

  for (const keyword of ['보류 해제', '제출', '실행', 'token']) {
    it(`${keyword} 경로 차단을 포함함`, () => {
      assert.ok(items.some((item) => item.label.includes(keyword) || item.blockedState.includes(keyword)));
    });
  }

  it('모든 tone이 blocked임', () => {
    for (const item of items) {
      assert.strictEqual(item.tone, 'blocked');
    }
  });
});

describe('Remaining Non-Release', () => {
  const items = buildView().remainingNonReleaseItems;

  it('배열이며 3개 이상임', () => {
    assert.ok(Array.isArray(items));
    assert.ok(items.length >= 3);
  });

  it('보류 미해제 상태를 표현함', () => {
    assert.ok(items.some((item) => item.remainingState.includes('미해제')));
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

  it('Task 41~109 증거를 포함함', () => {
    assert.ok(items.some((item) => item.requiredEvidence.includes('Task 41~109')));
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
    assert.ok(items.some((item) => item.label.includes('확인') || item.description.includes('점검')));
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
    assert.strictEqual(first.previousFinalStatusSummaryCommit, second.previousFinalStatusSummaryCommit);
  });

  it('입력값과 무관하게 동일한 안전 상태를 반환함', () => {
    assert.strictEqual(buildView({ value: 1 }).statusLabel, buildView({ value: 2 }).statusLabel);
  });

  it('배열 참조가 호출마다 분리됨', () => {
    assert.notStrictEqual(buildView().finalStatusBoundarySummaryItems, buildView().finalStatusBoundarySummaryItems);
    assert.notStrictEqual(buildView().stillForbiddenItems, buildView().stillForbiddenItems);
  });

  it('DB/API/HTTP/Prisma 동작 코드가 없음', () => {
    const source = readFileSync(SERVICE_FILE, 'utf8');
    assert.ok(!source.includes('prisma.'));
    assert.ok(!source.includes('PrismaClient'));
    assert.deepStrictEqual(FORBIDDEN_PATTERNS.filter((pattern) => source.includes(pattern)), []);
  });
});
