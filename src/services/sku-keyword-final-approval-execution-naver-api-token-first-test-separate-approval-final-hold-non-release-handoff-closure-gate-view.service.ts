export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldClosureGateSummaryItem {
  label: string;
  description: string;
  gateState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffClosureItem {
  label: string;
  description: string;
  closureState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNotReleaseCompletionItem {
  label: string;
  description: string;
  notCompletionReason: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldRemainingBlockedPathItem {
  label: string;
  description: string;
  blockedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldRequiredBeforeFutureTransitionItem {
  label: string;
  description: string;
  requiredEvidence: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNextSafeReviewItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousSummaryLabel: string;
  previousSummaryCommit: string;

  closureGateSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldClosureGateSummaryItem[];
  handoffClosureItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffClosureItem[];
  notReleaseCompletionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNotReleaseCompletionItem[];
  remainingBlockedPathItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRemainingBlockedPathItem[];
  requiredBeforeFutureTransitionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRequiredBeforeFutureTransitionItem[];
  nextSafeReviewItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextSafeReviewItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView {
  const closureGateSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldClosureGateSummaryItem[] =
    [
      {
        label: '보류 미해제 인수인계 종료 관문의 의미',
        description:
          '이 패널은 Task 80~84 보류 미해제 인수인계 흐름을 read-only 종료 관문으로 닫되, ' +
          '그것이 보류 해제 승인이나 실행 허용으로 해석되지 않도록 명확히 표시',
        gateState: '종료 관문 표시 완료 — 보류 미해제',
        tone: 'warning',
      },
      {
        label: '현재 상태: 보류 미해제 인수인계 종료 관문 표시 상태',
        description:
          '이 종료 관문이 표시된다고 해서 보류가 해제된 것이 아님 — 사람의 별도 채널 명시 승인 전까지 보류 유지',
        gateState: '종료 관문 표시 상태 — 보류 해제 아님',
        tone: 'warning',
      },
      {
        label: 'Task 41~84 전체 read-only 흐름 완료',
        description:
          'Task 41부터 Task 84까지 모든 read-only 흐름이 완료되었으나 어느 단계도 실행 허용 또는 보류 해제 승인을 부여하지 않았음',
        gateState: 'Task 41~84 완료 — 실행 허용 미부여 — 보류 해제 미승인',
        tone: 'neutral',
      },
      {
        label: '종료 관문은 안전선 유지를 위한 것',
        description:
          '이 종료 관문은 Task 80~84 인수인계 흐름이 종료되었음을 표시하는 read-only 참고 자료이며, 자동으로 다음 단계를 허용하지 않음',
        gateState: '종료 관문 = 안전선 유지 전용',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정권은 사람에게만 있음',
        description:
          '종료 관문 표시 이후에도 보류 해제 결정은 사람이 별도 채널에서 명시적으로 내려야 함',
        gateState: '보류 해제 결정권 = 사람 전용',
        tone: 'warning',
      },
    ];

  const handoffClosureItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffClosureItem[] =
    [
      {
        label: 'Task 80~84 인수인계 흐름 종료 — 보류 해제 아님',
        description:
          'Task 80(Non-Release Seal) → Task 81(Checklist) → Task 82(Boundary) → Task 83(Non-Release Seal) → Task 84(Final Review Summary) 흐름이 종료되었으나 보류 해제는 아님',
        closureState: 'Task 80~84 인수인계 흐름 종료 — 보류 유지 중',
        tone: 'warning',
      },
      {
        label: '인수인계 흐름 종료 ≠ 보류 해제 승인',
        description:
          '인수인계 흐름이 종료 관문까지 완료되더라도 보류 해제 승인이 자동으로 이루어지지 않음',
        closureState: '인수인계 종료 = 인수인계만 닫힘 (보류 해제 승인 아님)',
        tone: 'blocked',
      },
      {
        label: '종료 관문 통과 후에도 보류 상태 유지',
        description:
          '종료 관문을 통과했다고 해서 보류 상태가 해제되지 않음 — 보류는 계속 유지 중',
        closureState: '종료 관문 통과 — 보류 유지 중',
        tone: 'blocked',
      },
      {
        label: '다음 검토자에게 보류 상태 그대로 인수됨',
        description:
          '종료 관문을 통해 다음 검토자에게 인수될 때도 보류 상태는 그대로 유지됨',
        closureState: '다음 검토자 인수 — 보류 상태 유지',
        tone: 'warning',
      },
    ];

  const notReleaseCompletionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNotReleaseCompletionItem[] =
    [
      {
        label: '"종료 관문 표시 = 보류 해제 완료" 오해 방지',
        description:
          '종료 관문이 표시되더라도 보류 해제가 완료된 것이 아님 — 별도 채널 명시 승인이 별도로 필요',
        notCompletionReason: '종료 관문 표시 = 정보 전달 전용 (보류 해제 완료 아님)',
        tone: 'blocked',
      },
      {
        label: '"Task 41~84 완료 = 실행 허용" 오해 방지',
        description:
          'Task 41~84 전체 흐름이 완료되더라도 실행 허용이 자동으로 부여되지 않음',
        notCompletionReason: 'Task 41~84 완료 = 검토 완료 (실행 허용 자동 부여 아님)',
        tone: 'blocked',
      },
      {
        label: '"인수인계 종료 관문 = 다음 단계 자동 진행" 오해 방지',
        description:
          '종료 관문이 닫혔다고 해서 다음 단계(token 발급, 제출, 실행)가 자동으로 허용되지 않음',
        notCompletionReason: '종료 관문 닫힘 = 인수인계 닫힘 (다음 단계 자동 허용 아님)',
        tone: 'blocked',
      },
      {
        label: '"최종 요약 후 종료 관문 = 해제 승인 완료" 오해 방지',
        description:
          'Task 84 최종 요약 이후 종료 관문이 표시되더라도 보류 해제 승인이 아님',
        notCompletionReason: '최종 요약 + 종료 관문 = 검토 정리 (해제 승인 완료 아님)',
        tone: 'warning',
      },
    ];

  const remainingBlockedPathItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRemainingBlockedPathItem[] =
    [
      {
        label: '보류 해제 경로 차단',
        description:
          '보류 해제로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '보류 해제 경로 — 차단',
        tone: 'blocked',
      },
      {
        label: '제출 경로 차단',
        description:
          '승인 요청 제출로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '제출 경로 — 차단',
        tone: 'blocked',
      },
      {
        label: 'token 발급 경로 차단',
        description:
          'token 발급으로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: 'token 발급 경로 — 차단',
        tone: 'blocked',
      },
      {
        label: '실행 전환 경로 차단',
        description:
          '실행 단계 전환으로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '실행 전환 경로 — 차단',
        tone: 'blocked',
      },
      {
        label: '외부 API 호출 경로 차단',
        description:
          '외부 API 호출로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '외부 API 호출 경로 — 차단',
        tone: 'blocked',
      },
    ];

  const requiredBeforeFutureTransitionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRequiredBeforeFutureTransitionItem[] =
    [
      {
        label: '별도 채널 명시 승인 완료 기록',
        description:
          '별도 채널(슬랙·이메일·내부 결재)에서 이루어진 명시 승인 기록이 제출되어야 향후 전환이 가능',
        requiredEvidence: '별도 채널 명시 승인 완료 기록',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 확정 문서',
        description:
          'token 발급 환경·범위·담당자·조건이 명시된 확정 문서가 준비되어야 함',
        requiredEvidence: 'token 발급 조건 확정 문서',
        tone: 'blocked',
      },
      {
        label: '실행 범위 확정 문서 및 책임자 승인',
        description:
          '실행 범위가 명시된 확정 문서와 책임자 승인이 필요함',
        requiredEvidence: '실행 범위 확정 문서 및 책임자 승인',
        tone: 'warning',
      },
      {
        label: '실행 담당자 명시 지정 기록',
        description:
          '향후 전환 후 실행 담당자가 명시적으로 지정된 기록이 필요함',
        requiredEvidence: '실행 담당자 명시 지정 기록',
        tone: 'warning',
      },
    ];

  const nextSafeReviewItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextSafeReviewItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시',
        description:
          '종료 관문 확인 후 별도 채널에서 보류 해제 승인 절차를 개시해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '보류 해제 전제조건 최종 점검',
        description:
          'Task 78에서 정리된 보류 해제 전제조건이 충족되었는지 책임자가 최종 점검해야 함',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: '인수인계 전체 흐름 증거 문서 보관',
        description:
          'Task 80~85 인수인계 및 종료 관문 흐름에서 생성된 모든 증거 문서를 보관해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정 공표',
        description:
          '전제조건 충족 및 증거 문서 준비 완료 후 책임자가 보류 해제 결정을 공표해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '종료 관문 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
        tone: 'blocked',
      },
      {
        label: 'token 발급 (access/refresh)',
        description:
          'access token 및 refresh token 요청·발급은 금지 유지 — 별도 승인 없이 발급 불가',
        tone: 'blocked',
      },
      {
        label: '인증 헤더 생성',
        description:
          '인증 헤더 생성은 금지 유지 — 외부 통신 인증키 없이 헤더 생성 불가',
        tone: 'blocked',
      },
      {
        label: '외부 통신 클라이언트 신규 추가',
        description:
          '외부 통신 라이브러리 신규 추가는 금지 유지 — 외부 통신 불가',
        tone: 'blocked',
      },
      {
        label: 'POST API 추가',
        description:
          'POST API 추가는 금지 유지 — 이 단계에서 서버 side effect 없음',
        tone: 'blocked',
      },
      {
        label: '실행 버튼 / 저장 버튼 추가',
        description:
          '실행 버튼, 승인 버튼, 저장 버튼, 제출 버튼 추가는 금지 유지',
        tone: 'blocked',
      },
      {
        label: 'Queue/Worker 실행 연결',
        description:
          'Queue 및 Worker 실행 연결은 금지 유지 — 비동기 실행 흐름 연결 불가',
        tone: 'blocked',
      },
      {
        label: '운영 DB write / Prisma mutation',
        description:
          '운영 DB write 및 Prisma mutation은 금지 유지 — 읽기 전용 흐름 유지',
        tone: 'blocked',
      },
      {
        label: '가격/재고 변경 API 호출',
        description:
          '가격 및 재고 변경 API 호출은 금지 유지 — 상품 데이터 변경 불가',
        tone: 'blocked',
      },
    ];

  return {
    title:
      'Token First Test Separate Approval - Final Hold Non-Release Handoff Closure Gate',
    statusLabel: 'READ-ONLY HANDOFF CLOSURE GATE',
    statusTone: 'warning',
    summary:
      'Task 41~84 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 보류 미해제 인수인계 흐름을 읽기 전용 종료 관문으로 정리하되, ' +
      '보류 해제 승인으로 해석되지 않도록 표시합니다. ' +
      '현재 상태는 보류 해제 가능이 아니라 보류 미해제 인수인계 종료 관문 표시 상태입니다.',
    taskRangeLabel: 'Task 41~84 read-only 흐름 완료 (보류 미해제 인수인계 종료 관문 — 해제 미승인)',
    previousSummaryLabel: 'Task 84 Final Hold Non-Release Handoff Final Review Summary',
    previousSummaryCommit: '4b54aae',
    closureGateSummaryItems,
    handoffClosureItems,
    notReleaseCompletionItems,
    remainingBlockedPathItems,
    requiredBeforeFutureTransitionItems,
    nextSafeReviewItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 종료 관문이 표시되더라도 별도 명시 승인 전까지 ' +
      'token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 종료 관문 패널은 보류 미해제 인수인계 흐름을 read-only로 닫아 주는 참고 자료이며, ' +
      '자동으로 보류 해제 또는 실행 단계로 이어지지 않습니다.',
  };
}
