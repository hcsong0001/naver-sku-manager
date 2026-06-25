export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistEntry {
  label: string;
  description: string;
  requiredState: string;
  currentState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewReviewerAwarenessItem {
  label: string;
  description: string;
  reviewerMustUnderstand: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBlockedItem {
  label: string;
  reason: string;
  unresolvedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewEvidenceItem {
  label: string;
  description: string;
  evidenceState: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewNotApprovalItem {
  label: string;
  description: string;
  notGrantedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewNextPreparationItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousHandoffLabel: string;
  previousHandoffCommit: string;

  acceptanceChecklistItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistEntry[];
  reviewerAwarenessItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewReviewerAwarenessItem[];
  acceptanceBlockedItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBlockedItem[];
  evidenceReviewItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewEvidenceItem[];
  notApprovalItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNotApprovalItem[];
  nextReviewPreparationItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNextPreparationItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView {
  const acceptanceChecklistItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistEntry[] =
    [
      {
        label: 'Task 41~73 read-only 흐름 완료 확인',
        description:
          'Task 41(Safety Boundary)부터 Task 73(Final Closure Handoff Summary)까지 모든 read-only 흐름이 쌓였음을 확인',
        requiredState: '완료 확인됨',
        currentState: '완료 (실행 미해제)',
        tone: 'neutral',
      },
      {
        label: '실제 제출/실행 미해제 상태 확인',
        description:
          '이 흐름에서 승인 요청 제출, token 발급, 외부 API 호출, 운영 DB write가 발생하지 않았음을 확인',
        requiredState: '미해제 상태 확인됨',
        currentState: '미해제 유지',
        tone: 'neutral',
      },
      {
        label: 'Inbound Handoff Summary 검토 완료 여부',
        description:
          'Task 73 Final Closure Handoff Summary 패널의 인수인계 요약 내용을 사람이 인지했는지 확인',
        requiredState: '검토 인지 필요',
        currentState: '화면 표시 완료 — 사람 인지 필요',
        tone: 'warning',
      },
      {
        label: '이전 게이트(Task 72) 근거 검토 여부',
        description:
          'Task 72 Final Closure Gate 패널에서 제시된 실행 금지 근거를 검토자가 인지했는지 확인',
        requiredState: '근거 검토 필요',
        currentState: '화면 표시 완료 — 사람 검토 필요',
        tone: 'warning',
      },
      {
        label: '실행 허용 별도 채널 확인 여부',
        description:
          '실행을 허용하기 위한 별도 채널(슬랙·이메일·내부 결재)을 통한 승인이 아직 없음을 확인',
        requiredState: '별도 채널 확인 필요',
        currentState: '별도 채널 승인 없음',
        tone: 'blocked',
      },
      {
        label: '검토자 명시 확인',
        description:
          '이 검토 수락을 담당하는 사람(담당자, 승인 권한자)이 누구인지 확인',
        requiredState: '검토자 명시 필요',
        currentState: '검토자 미명시 — 사람이 지정 필요',
        tone: 'warning',
      },
    ];

  const reviewerAwarenessItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewReviewerAwarenessItem[] =
    [
      {
        label: '이 화면은 실행 허용을 의미하지 않음',
        description:
          '이 체크리스트 화면이 표시된다고 해서 실행, 제출, token 발급이 허용된 것이 아님을 검토자가 이해해야 함',
        reviewerMustUnderstand:
          '화면 표시 = 실행 허용이 아님 — 별도 명시 승인 필요',
        tone: 'blocked',
      },
      {
        label: 'Task 41~73 흐름은 read-only로만 쌓인 것임',
        description:
          'Task 41~73 전체 흐름이 read-only 검토 목적으로만 쌓였으며 실행을 위한 준비 완료 신호가 아님을 이해해야 함',
        reviewerMustUnderstand:
          'Task 41~73 완료 = 실행 준비 완료가 아님 — 검토 흐름 완료일 뿐',
        tone: 'warning',
      },
      {
        label: 'Final Closure Handoff Summary는 인수인계 문서임',
        description:
          'Task 73 Handoff Summary는 다음 단계 담당자에게 현황을 전달하는 read-only 요약이며 실행 승인이 아님을 이해해야 함',
        reviewerMustUnderstand:
          'Handoff Summary = 실행 승인이 아님 — 인수인계 참고 자료',
        tone: 'warning',
      },
      {
        label: '별도 명시 승인 없이 다음 단계로 이동 불가',
        description:
          '별도 채널(슬랙·이메일·내부 결재)에서 명시적 승인 없이는 실행, 제출, token 발급으로 이동할 수 없음을 이해해야 함',
        reviewerMustUnderstand:
          '명시적 승인 없이 다음 단계 이동 불가 — 별도 채널 승인 필수',
        tone: 'blocked',
      },
    ];

  const acceptanceBlockedItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBlockedItem[] =
    [
      {
        label: '실행 허용 명시 승인 없음',
        reason:
          '실행을 허용하기 위한 별도 명시 승인이 아직 없으므로 검토 수락이 실행 허용을 의미하지 않음',
        unresolvedState: '명시 승인 없음 — 실행 수락 불가',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 미확정',
        reason:
          'token 발급을 위한 환경, 범위, 담당자, 실행 조건이 아직 확정되지 않았으므로 수락해도 token 발급이 허용되지 않음',
        unresolvedState: 'token 발급 조건 미확정',
        tone: 'blocked',
      },
      {
        label: '외부 API 호출 허용 미결정',
        reason:
          '외부 API 호출을 허용하기 위한 명시적 결정이 없으므로 검토 수락 후에도 외부 API 호출은 불가능함',
        unresolvedState: '외부 API 호출 미결정',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 허용 미결정',
        reason:
          '운영 DB write를 허용하기 위한 별도 결정이 없으므로 검토 수락 후에도 운영 DB write는 불가능함',
        unresolvedState: '운영 DB write 미결정',
        tone: 'blocked',
      },
      {
        label: '검토자 수락 = 실행 권한 부여 아님',
        reason:
          '검토자가 이 체크리스트를 확인해도 실행 권한이 자동으로 부여되지 않음 — 별도 승인 절차 필요',
        unresolvedState: '검토자 수락 ≠ 실행 권한 부여',
        tone: 'blocked',
      },
    ];

  const evidenceReviewItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewEvidenceItem[] =
    [
      {
        label: 'Task 41~73 커밋 이력',
        description:
          'Task 41~73 모든 단계가 커밋 이력으로 확인 가능하며 실행 코드가 추가되지 않았음',
        evidenceState: 'git log 확인 가능',
        tone: 'neutral',
      },
      {
        label: 'service 파일 순수 함수 여부',
        description:
          '각 Task service 파일이 순수 함수로 작성되었으며 외부 통신, 운영 DB write, 실행 코드가 없음',
        evidenceState: '각 service 파일 검토 가능',
        tone: 'neutral',
      },
      {
        label: 'test 파일 금지 문자열 부재 검증',
        description:
          '각 Task test 파일이 금지 문자열 부재를 검증하며 56개 이상의 test case가 통과됨',
        evidenceState: 'test 파일 검토 가능',
        tone: 'neutral',
      },
      {
        label: 'page.tsx 실행 버튼 없음 근거',
        description:
          'Task 41~73 어느 단계에서도 실행 버튼, 승인 버튼, 저장 버튼, 제출 버튼이 추가되지 않았음',
        evidenceState: 'page.tsx 코드 검토 가능',
        tone: 'neutral',
      },
      {
        label: 'Prisma schema/migration 변경 없음 근거',
        description:
          'Task 41~73 어느 단계에서도 Prisma schema 또는 migration이 변경되지 않았음',
        evidenceState: 'prisma/ 디렉터리 검토 가능',
        tone: 'neutral',
      },
    ];

  const notApprovalItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNotApprovalItem[] =
    [
      {
        label: '이 화면은 실행 승인이 아님',
        description:
          '이 Human Review Acceptance Checklist 패널은 사람이 확인해야 할 항목을 나열하는 read-only 화면이며 승인 부여가 아님',
        notGrantedState: '승인 부여 없음',
        tone: 'blocked',
      },
      {
        label: 'token 발급 승인이 아님',
        description:
          '이 화면을 확인해도 token 발급 허용이 자동으로 부여되지 않음 — 별도 명시 승인 필요',
        notGrantedState: 'token 발급 승인 없음',
        tone: 'blocked',
      },
      {
        label: '외부 API 호출 승인이 아님',
        description:
          '이 화면을 확인해도 외부 API 호출 허용이 자동으로 부여되지 않음 — 명시적 결정 필요',
        notGrantedState: '외부 API 호출 승인 없음',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 승인이 아님',
        description:
          '이 화면을 확인해도 운영 DB write 허용이 자동으로 부여되지 않음 — 별도 승인 필요',
        notGrantedState: '운영 DB write 승인 없음',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 승인이 아님',
        description:
          '이 화면을 확인해도 승인 요청 제출이 허용되지 않음 — 사람의 별도 채널 제출 필요',
        notGrantedState: '승인 요청 제출 승인 없음',
        tone: 'blocked',
      },
    ];

  const nextReviewPreparationItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNextPreparationItem[] =
    [
      {
        label: '별도 채널 명시 승인 준비',
        description:
          '실행 허용을 위한 별도 채널(슬랙·이메일·내부 결재) 승인 절차를 준비해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: 'token 발급 조건 확정 준비',
        description:
          'token 발급을 위한 환경, 범위, 담당자, 실행 조건을 별도 문서로 확정해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '검토자 지정 준비',
        description:
          '이 검토 흐름을 이어받아 수락/거절을 결정할 담당자를 지정해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '실행 범위 문서화 준비',
        description:
          '실제 실행 범위(token 발급 조건, 외부 API 호출 조건, 운영 DB write 조건)를 별도 문서로 확정해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          'Human Review Checklist 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
        tone: 'blocked',
      },
      {
        label: 'token 발급 (access/refresh)',
        description:
          'access token 및 refresh token 요청/발급은 금지 유지 — 별도 승인 없이 발급 불가',
        tone: 'blocked',
      },
      {
        label: '인증 헤더 생성',
        description:
          '인증 헤더 생성은 금지 유지 — 인증키 없이 헤더 생성 불가',
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
      'Token First Test Separate Approval - Human Review Acceptance Checklist',
    statusLabel: 'READ-ONLY HUMAN REVIEW CHECKLIST',
    statusTone: 'warning',
    summary:
      'Task 41~73 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 사람이 다음 검토를 수락하기 전에 확인해야 할 항목을 읽기 전용으로 정리합니다. ' +
      '현재 상태는 실행 준비 완료가 아니라 사람 검토 수락 전 체크리스트 표시 완료입니다.',
    taskRangeLabel: 'Task 41~73 read-only 흐름 완료 (실행 미해제)',
    previousHandoffLabel: 'Task 73 Final Closure Handoff Summary',
    previousHandoffCommit: 'a633bca',
    acceptanceChecklistItems,
    reviewerAwarenessItems,
    acceptanceBlockedItems,
    evidenceReviewItems,
    notApprovalItems,
    nextReviewPreparationItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 사람의 별도 명시 승인 전까지 token 발급, 승인 요청 제출, ' +
      '외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 체크리스트는 사람이 검토를 수락하기 전에 확인해야 할 항목을 정리한 read-only 참고 자료이며, ' +
      '자동으로 실행 단계로 이어지지 않습니다.',
  };
}
