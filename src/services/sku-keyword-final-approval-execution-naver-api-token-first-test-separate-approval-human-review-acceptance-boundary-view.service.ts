export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundarySummaryItem {
  label: string;
  description: string;
  boundaryState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceIsNotApprovalItem {
  label: string;
  description: string;
  notApprovalReason: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionBoundaryItem {
  label: string;
  description: string;
  blockedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewRequiredBeforeReleaseItem {
  label: string;
  description: string;
  requiredEvidence: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewMisunderstandingItem {
  label: string;
  misunderstanding: string;
  correctInterpretation: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewNextDecisionItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousChecklistLabel: string;
  previousChecklistCommit: string;

  boundarySummaryItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundarySummaryItem[];
  acceptanceIsNotApprovalItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceIsNotApprovalItem[];
  nonExecutionBoundaryItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionBoundaryItem[];
  requiredBeforeReleaseItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewRequiredBeforeReleaseItem[];
  reviewerMisunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewMisunderstandingItem[];
  nextHumanDecisionItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNextDecisionItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView {
  const boundarySummaryItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundarySummaryItem[] =
    [
      {
        label: '검토 수락 경계의 의미',
        description:
          '사람이 검토를 수락(확인)한다는 것은 read-only 흐름의 내용을 인지했다는 의미이며, 실제 실행 허용을 의미하지 않음',
        boundaryState: '경계 명확 — 수락 ≠ 실행 허용',
        tone: 'warning',
      },
      {
        label: 'Task 41~74 흐름의 경계',
        description:
          'Task 41부터 Task 74까지 모든 read-only 흐름이 쌓였지만 어느 단계도 실제 실행, 제출, token 발급을 허용하지 않았음',
        boundaryState: '실행 미해제 — read-only 경계 유지',
        tone: 'neutral',
      },
      {
        label: '검토 체크리스트 완료와 실행 가능 상태의 경계',
        description:
          'Task 74 Human Review Acceptance Checklist 패널이 표시되었다고 해서 실행 가능 상태로 전환되지 않음',
        boundaryState: '체크리스트 표시 완료 ≠ 실행 가능',
        tone: 'warning',
      },
      {
        label: '화면 패널 표시와 실제 기능 실행의 경계',
        description:
          '이 화면에 패널이 표시되는 것은 정보 제공 목적이며, 자동으로 어떤 기능도 실행되지 않음',
        boundaryState: '화면 표시 = 정보 제공 전용',
        tone: 'neutral',
      },
      {
        label: '인수인계 완료와 실행 승인의 경계',
        description:
          'Task 73 Handoff Summary로 인수인계가 완료되었더라도 그것이 실행 승인을 의미하지 않음',
        boundaryState: '인수인계 완료 ≠ 실행 승인',
        tone: 'warning',
      },
    ];

  const acceptanceIsNotApprovalItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceIsNotApprovalItem[] =
    [
      {
        label: '검토 수락은 실행 승인 부여가 아님',
        description:
          '사람이 이 검토 흐름을 수락(확인)하더라도 실행 승인이 자동으로 부여되지 않음 — 별도 명시 승인 절차 필요',
        notApprovalReason:
          '수락은 인지를 의미하며, 승인은 별도 채널(슬랙·이메일·내부 결재)에서 명시적으로 이루어져야 함',
        tone: 'blocked',
      },
      {
        label: '체크리스트 확인은 token 발급 허용이 아님',
        description:
          'Task 74 체크리스트를 모두 확인(수락)하더라도 token 발급이 허용되지 않음 — 별도 승인 완료 후에만 가능',
        notApprovalReason:
          '체크리스트 확인 = token 발급 조건 미충족 — 별도 승인 필요',
        tone: 'blocked',
      },
      {
        label: '검토 흐름 종료는 외부 API 호출 허용이 아님',
        description:
          'read-only 검토 흐름(Task 41~74)이 종료되더라도 외부 API 호출이 허용되지 않음 — 명시적 결정 필요',
        notApprovalReason:
          '검토 흐름 종료 = 외부 API 호출 조건 미충족 — 명시적 결정 필요',
        tone: 'blocked',
      },
      {
        label: '검토자 수락 서명은 실행 권한 부여가 아님',
        description:
          '검토자가 이 화면을 확인하고 수락 의사를 표시하더라도 실행 권한이 자동으로 부여되지 않음',
        notApprovalReason:
          '검토자 수락 = 실행 권한 부여 아님 — 권한은 별도 승인 절차로만 부여됨',
        tone: 'warning',
      },
    ];

  const nonExecutionBoundaryItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionBoundaryItem[] =
    [
      {
        label: '외부 API 호출 비실행 경계',
        description:
          '이 흐름의 어느 단계에서도 외부 API 호출이 실행되지 않았으며, 검토 수락 후에도 실행되지 않음',
        blockedState: '외부 API 호출 비실행 — 경계 유지',
        tone: 'blocked',
      },
      {
        label: 'token 발급 비실행 경계',
        description:
          'access token 및 refresh token 발급이 이 흐름에서 실행되지 않았으며, 검토 수락 후에도 실행되지 않음',
        blockedState: 'token 발급 비실행 — 경계 유지',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 비실행 경계',
        description:
          '운영 DB write가 이 흐름에서 실행되지 않았으며, 검토 수락 후에도 실행되지 않음',
        blockedState: '운영 DB write 비실행 — 경계 유지',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 비실행 경계',
        description:
          '승인 요청 제출이 이 흐름에서 실행되지 않았으며, 검토 수락 후에도 실행되지 않음',
        blockedState: '승인 요청 제출 비실행 — 경계 유지',
        tone: 'blocked',
      },
      {
        label: 'Queue/Worker 실행 비실행 경계',
        description:
          'Queue 및 Worker 실행 연결이 이 흐름에서 실행되지 않았으며, 검토 수락 후에도 실행되지 않음',
        blockedState: 'Queue/Worker 실행 비실행 — 경계 유지',
        tone: 'blocked',
      },
    ];

  const requiredBeforeReleaseItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewRequiredBeforeReleaseItem[] =
    [
      {
        label: '별도 채널 명시 승인',
        description:
          '실행을 허용하기 위해서는 별도 채널(슬랙·이메일·내부 결재)에서 명시적 승인이 반드시 이루어져야 함',
        requiredEvidence: '별도 채널 명시 승인 기록',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 확정 문서',
        description:
          'token 발급을 위한 환경, 범위, 담당자, 실행 조건이 별도 문서로 확정되어야 함',
        requiredEvidence: 'token 발급 조건 확정 문서',
        tone: 'warning',
      },
      {
        label: '실행 범위 확정 문서',
        description:
          '실제 실행 범위(외부 API 호출 조건, 운영 DB write 조건)가 별도 문서로 확정되어야 함',
        requiredEvidence: '실행 범위 확정 문서',
        tone: 'warning',
      },
      {
        label: '검토자 명시 지정',
        description:
          '이 검토 흐름을 이어받아 실행 허용 여부를 최종 결정할 담당자가 명시적으로 지정되어야 함',
        requiredEvidence: '검토자 명시 지정 기록',
        tone: 'warning',
      },
      {
        label: '가격/재고 변경 별도 승인',
        description:
          '가격 및 재고 변경 API 호출을 위해서는 별도 승인이 반드시 이루어져야 함',
        requiredEvidence: '가격/재고 변경 별도 승인 기록',
        tone: 'blocked',
      },
    ];

  const reviewerMisunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewMisunderstandingItem[] =
    [
      {
        label: '"read-only 흐름 완료 = 실행 가능" 오해 방지',
        misunderstanding: 'Task 41~74 read-only 흐름이 완료되었으니 이제 실행할 수 있다',
        correctInterpretation:
          'read-only 흐름 완료는 검토 목적으로만 쌓인 것이며 실행 가능 상태가 아님 — 별도 명시 승인 필요',
        tone: 'blocked',
      },
      {
        label: '"체크리스트 확인 = 승인 완료" 오해 방지',
        misunderstanding: '체크리스트를 모두 확인했으니 승인이 완료된 것이다',
        correctInterpretation:
          '체크리스트 확인은 내용을 인지한 것이며 승인 완료가 아님 — 별도 채널 승인 절차 필요',
        tone: 'blocked',
      },
      {
        label: '"화면에 표시됨 = 실행 허용됨" 오해 방지',
        misunderstanding: '이 패널이 화면에 표시되었으니 실행이 허용된 것이다',
        correctInterpretation:
          '화면 표시는 정보 제공 목적이며 실행 허용이 아님 — 이 패널은 read-only 참고 자료',
        tone: 'warning',
      },
      {
        label: '"Handoff Summary 이후 = 바로 다음 단계 실행" 오해 방지',
        misunderstanding: 'Handoff Summary가 완료되었으니 바로 다음 단계(실행)로 넘어갈 수 있다',
        correctInterpretation:
          'Handoff Summary 이후에도 별도 명시 승인 없이는 실행 단계로 전환 불가',
        tone: 'blocked',
      },
    ];

  const nextHumanDecisionItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNextDecisionItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시',
        description:
          '실행 허용을 위한 별도 채널(슬랙·이메일·내부 결재) 승인 절차를 개시해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '검토자 최종 판단',
        description:
          '이 검토 흐름을 이어받은 검토자가 실행 허용 여부를 최종적으로 판단해야 함',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: 'token 발급 조건 최종 확정',
        description:
          'token 발급을 위한 모든 조건을 최종적으로 확정하고 문서화해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '실행 전환 준비',
        description:
          '별도 명시 승인 완료 후 다음 단계(실행 허용)로의 전환 준비 절차를 진행해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '검토 수락 경계 표시 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
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
      'Token First Test Separate Approval - Human Review Acceptance Boundary',
    statusLabel: 'READ-ONLY ACCEPTANCE BOUNDARY',
    statusTone: 'warning',
    summary:
      'Task 41~74 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 사람이 검토를 수락하더라도 그것이 실제 승인 또는 실행 허용으로 해석되지 않도록 경계를 표시합니다. ' +
      '현재 상태는 실행 가능이 아니라 사람 검토 수락 경계 표시 완료입니다.',
    taskRangeLabel: 'Task 41~74 read-only 흐름 완료 (실행 미해제)',
    previousChecklistLabel: 'Task 74 Human Review Acceptance Checklist',
    previousChecklistCommit: '1b17558',
    boundarySummaryItems,
    acceptanceIsNotApprovalItems,
    nonExecutionBoundaryItems,
    requiredBeforeReleaseItems,
    reviewerMisunderstandingPreventionItems,
    nextHumanDecisionItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 사람이 검토를 수락하더라도 별도 명시 승인 전까지 ' +
      'token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 경계 표시 패널은 검토 수락과 실제 실행 승인을 명확히 분리하기 위한 read-only 참고 자료이며, ' +
      '자동으로 실행 단계로 이어지지 않습니다.',
  };
}
