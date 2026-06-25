export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldPreconditionSummaryItem {
  label: string;
  description: string;
  currentState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionItem {
  label: string;
  description: string;
  requiredBeforeRelease: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldUnresolvedHoldItem {
  label: string;
  description: string;
  unresolvedState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldApprovalEvidenceItem {
  label: string;
  description: string;
  evidenceRequired: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldMisunderstandingItem {
  label: string;
  misunderstanding: string;
  correctInterpretation: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNextReviewGateItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousHoldLabel: string;
  previousHoldCommit: string;

  preconditionSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldPreconditionSummaryItem[];
  releasePreconditionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionItem[];
  unresolvedHoldItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldUnresolvedHoldItem[];
  approvalEvidenceRequiredItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldApprovalEvidenceItem[];
  releaseMisunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldMisunderstandingItem[];
  nextReviewGateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextReviewGateItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView {
  const preconditionSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldPreconditionSummaryItem[] =
    [
      {
        label: '보류 해제 전제조건 검토의 의미',
        description:
          '이 패널은 Task 41~77 read-only 흐름이 완료된 뒤 최종 보류 상태가 해제되려면 어떤 조건이 충족되어야 하는지 읽기 전용으로 정리',
        currentState: '전제조건 검토 중 — 보류 해제 아님',
        tone: 'warning',
      },
      {
        label: '현재 상태는 "보류 해제 전제조건 검토"',
        description:
          '이 패널이 표시된다고 해서 보류가 해제된 것이 아님 — 전제조건 목록을 사람이 읽고 별도 채널에서 승인 절차를 진행해야 함',
        currentState: '전제조건 검토 표시 완료 — 보류 미해제',
        tone: 'warning',
      },
      {
        label: 'Task 41~77 전체 흐름 완료 이후 상태',
        description:
          'Task 41부터 Task 77까지 모든 read-only 흐름이 완료되었으나 어느 단계도 실행 허용을 부여하지 않았음',
        currentState: 'Task 41~77 완료 — 실행 허용 미부여',
        tone: 'neutral',
      },
      {
        label: '전제조건 목록은 참고 자료',
        description:
          '아래 전제조건 항목들은 사람이 별도 채널에서 확인하고 승인하기 위한 참고 자료이며 자동으로 처리되지 않음',
        currentState: '전제조건 목록 = 참고 자료 전용',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정권은 사람에게 있음',
        description:
          '전제조건 검토가 완료되더라도 최종 보류 해제 결정은 사람이 별도 채널에서 명시적으로 내려야 함',
        currentState: '전제조건 검토 완료 — 해제 결정은 사람',
        tone: 'warning',
      },
    ];

  const releasePreconditionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionItem[] =
    [
      {
        label: '별도 채널 명시 승인 완료',
        description:
          '별도 채널(슬랙·이메일·내부 결재)에서 명시적 승인이 완료되어야 보류를 해제할 수 있음',
        requiredBeforeRelease: '별도 채널 명시 승인 기록 제출',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 문서 확정',
        description:
          'token 발급 환경·범위·담당자·실행 조건이 별도 문서로 확정되고 승인되어야 함',
        requiredBeforeRelease: 'token 발급 조건 확정 문서',
        tone: 'blocked',
      },
      {
        label: '실행 범위 확정 문서 승인',
        description:
          '외부 API 호출 조건·운영 DB write 조건이 별도 문서로 확정되고 책임자가 승인해야 함',
        requiredBeforeRelease: '실행 범위 확정 문서 및 책임자 승인',
        tone: 'blocked',
      },
      {
        label: '실행 담당자 명시 지정',
        description:
          '보류 해제 후 실행을 담당할 책임자가 명시적으로 지정되고 기록되어야 함',
        requiredBeforeRelease: '실행 담당자 명시 지정 기록',
        tone: 'warning',
      },
      {
        label: '가격·재고 변경 별도 승인',
        description:
          '가격 및 재고 변경 API 호출을 위한 별도 승인이 이루어져야 함',
        requiredBeforeRelease: '가격·재고 변경 별도 승인 기록',
        tone: 'blocked',
      },
    ];

  const unresolvedHoldItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldUnresolvedHoldItem[] =
    [
      {
        label: '별도 채널 승인 미진행',
        description:
          '별도 채널 승인 절차가 아직 개시되지 않았거나 완료되지 않았음',
        unresolvedState: '별도 채널 승인 — 미진행',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 미확정',
        description:
          'token 발급을 위한 모든 조건이 아직 확정되지 않았음',
        unresolvedState: 'token 발급 조건 — 미확정',
        tone: 'blocked',
      },
      {
        label: '실행 전환 결정 미수행',
        description:
          '실행 단계로 전환할지 최종 결정이 아직 이루어지지 않았음',
        unresolvedState: '실행 전환 결정 — 미수행',
        tone: 'blocked',
      },
      {
        label: '실행 담당자 미지정',
        description:
          '보류 해제 후 실행을 담당할 책임자가 아직 지정되지 않았음',
        unresolvedState: '실행 담당자 — 미지정',
        tone: 'warning',
      },
    ];

  const approvalEvidenceRequiredItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldApprovalEvidenceItem[] =
    [
      {
        label: '별도 채널 승인 기록',
        description:
          '별도 채널에서 이루어진 승인의 기록(슬랙 메시지·이메일·결재 문서)이 별도로 보관되어야 함',
        evidenceRequired: '별도 채널 승인 기록 (슬랙/이메일/결재)',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 확정 문서',
        description:
          'token 발급 환경·범위·담당자·조건이 명시된 확정 문서가 필요함',
        evidenceRequired: 'token 발급 조건 확정 문서',
        tone: 'blocked',
      },
      {
        label: '실행 범위 확정 문서',
        description:
          '외부 API 호출 범위·운영 DB write 범위가 명시된 확정 문서가 필요함',
        evidenceRequired: '실행 범위 확정 문서',
        tone: 'warning',
      },
      {
        label: '책임자 서명 또는 동의 기록',
        description:
          '보류 해제 및 실행 허용을 결정한 책임자의 서명 또는 동의 기록이 필요함',
        evidenceRequired: '책임자 서명 또는 동의 기록',
        tone: 'blocked',
      },
    ];

  const releaseMisunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldMisunderstandingItem[] =
    [
      {
        label: '"전제조건 목록 표시 = 보류 해제" 오해 방지',
        misunderstanding: '이 패널에 전제조건이 표시되었으니 보류가 해제된 것이다',
        correctInterpretation:
          '전제조건 목록 표시는 사람이 확인해야 할 사항을 정리한 것이며, 보류 해제가 아님 — 별도 채널 승인 필요',
        tone: 'blocked',
      },
      {
        label: '"read-only 흐름 완료 = 실행 가능" 오해 방지',
        misunderstanding: 'Task 41~77 read-only 흐름이 완료되었으니 이제 실행할 수 있다',
        correctInterpretation:
          'read-only 흐름 완료는 검토 목적으로만 쌓인 것이며 실행 가능 상태가 아님 — 별도 승인 완료 후에만 전환 가능',
        tone: 'blocked',
      },
      {
        label: '"전제조건 검토 완료 = 보류 해제 승인" 오해 방지',
        misunderstanding: '전제조건을 모두 검토했으니 보류가 자동으로 해제된다',
        correctInterpretation:
          '전제조건 검토 완료는 내용을 인지한 것이며 보류 해제 승인이 아님 — 별도 채널 승인 절차가 별도로 필요',
        tone: 'blocked',
      },
      {
        label: '"화면에 표시됨 = 실행 허용됨" 오해 방지',
        misunderstanding: '이 패널이 화면에 표시되었으니 실행이 허용된 것이다',
        correctInterpretation:
          '화면 표시는 정보 제공 목적이며 실행 허용이 아님 — 이 패널은 read-only 참고 자료',
        tone: 'warning',
      },
    ];

  const nextReviewGateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextReviewGateItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시',
        description:
          '전제조건 목록을 확인한 후 별도 채널(슬랙·이메일·내부 결재)에서 승인 절차를 개시해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '전제조건 충족 여부 최종 확인',
        description:
          '위 전제조건 항목이 모두 충족되었는지 책임자가 최종 확인해야 함',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: '승인 증거 문서 보관',
        description:
          '승인 과정에서 생성된 모든 증거 문서를 별도로 보관하고 관리해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정',
        description:
          '전제조건이 모두 충족되었음을 확인한 후 책임자가 보류 해제를 결정해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '전제조건 검토 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
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
      'Token First Test Separate Approval - Final Hold Release Preconditions Review',
    statusLabel: 'READ-ONLY RELEASE PRECONDITIONS REVIEW',
    statusTone: 'warning',
    summary:
      'Task 41~77 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 최종 보류 상태가 해제되기 전에 사람이 별도로 확인해야 할 전제조건을 읽기 전용으로 정리합니다. ' +
      '현재 상태는 보류 해제가 아니라 보류 해제 전제조건 검토 중입니다.',
    taskRangeLabel: 'Task 41~77 read-only 흐름 완료 (실행 미해제)',
    previousHoldLabel: 'Task 77 Human Review Final Hold Summary',
    previousHoldCommit: '03c3332',
    preconditionSummaryItems,
    releasePreconditionItems,
    unresolvedHoldItems,
    approvalEvidenceRequiredItems,
    releaseMisunderstandingPreventionItems,
    nextReviewGateItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 전제조건 목록을 검토하더라도 별도 명시 승인 전까지 ' +
      'token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 전제조건 검토 패널은 보류 해제 전 사람이 확인해야 할 사항을 read-only로 정리한 참고 자료이며, ' +
      '자동으로 실행 단계로 이어지지 않습니다.',
  };
}
