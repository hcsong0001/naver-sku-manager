export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldBoundarySummaryItem {
  label: string;
  description: string;
  boundaryState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseIsNotGrantedItem {
  label: string;
  description: string;
  notGrantedReason: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldPreconditionReviewNotApprovalItem {
  label: string;
  description: string;
  correctInterpretation: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldBlockedReleasePathItem {
  label: string;
  description: string;
  blockedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldRequiredBeforeActualReleaseItem {
  label: string;
  description: string;
  requiredEvidence: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNextHumanGateItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousPreconditionsLabel: string;
  previousPreconditionsCommit: string;

  boundarySummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldBoundarySummaryItem[];
  releaseIsNotGrantedItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseIsNotGrantedItem[];
  preconditionReviewNotApprovalItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldPreconditionReviewNotApprovalItem[];
  blockedReleasePathItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldBlockedReleasePathItem[];
  requiredBeforeActualReleaseItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRequiredBeforeActualReleaseItem[];
  nextHumanGateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextHumanGateItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView {
  const boundarySummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldBoundarySummaryItem[] =
    [
      {
        label: '보류 해제 경계의 의미',
        description:
          '이 패널은 Task 41~78 read-only 흐름이 완료된 뒤 전제조건 검토가 이루어지더라도 ' +
          '그것이 실제 보류 해제, 승인, 제출, 실행 허용으로 해석되지 않도록 경계를 명확히 표시',
        boundaryState: '보류 해제 경계 표시 완료 — 보류 미해제',
        tone: 'warning',
      },
      {
        label: '현재 상태는 "보류 해제 경계 표시 완료"',
        description:
          '이 패널이 표시된다고 해서 보류가 해제된 것이 아님 — 사람이 별도 채널에서 명시적 승인을 완료해야만 해제 가능',
        boundaryState: '경계 표시 완료 — 해제 미완료',
        tone: 'warning',
      },
      {
        label: 'Task 41~78 전체 흐름 완료 이후 상태',
        description:
          'Task 41부터 Task 78까지 모든 read-only 흐름이 완료되었으나 어느 단계도 실행 허용 또는 해제 승인을 부여하지 않았음',
        boundaryState: 'Task 41~78 완료 — 실행 허용 미부여 — 해제 승인 미완료',
        tone: 'neutral',
      },
      {
        label: '경계 표시는 안전선 유지를 위한 것',
        description:
          '이 경계 패널은 전제조건 검토가 해제 승인으로 오해되지 않도록 안전선을 유지하기 위한 read-only 참고 자료',
        boundaryState: '경계 표시 = 안전선 유지 전용',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정권은 오직 사람에게 있음',
        description:
          '전제조건 검토 완료 및 경계 표시 이후에도 보류 해제 결정은 사람이 별도 채널에서 명시적으로 내려야 함',
        boundaryState: '보류 해제 결정권 = 사람 전용',
        tone: 'warning',
      },
    ];

  const releaseIsNotGrantedItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseIsNotGrantedItem[] =
    [
      {
        label: '별도 채널 승인 아직 미완료',
        description:
          '별도 채널(슬랙·이메일·내부 결재)에서의 명시적 승인이 완료되지 않았으므로 보류 해제가 부여되지 않음',
        notGrantedReason: '별도 채널 명시 승인 — 미완료',
        tone: 'blocked',
      },
      {
        label: 'token 발급 허용 미부여',
        description:
          'token 발급을 위한 별도 승인이 부여되지 않았으므로 token 발급이 허용되지 않음',
        notGrantedReason: 'token 발급 허용 — 미부여',
        tone: 'blocked',
      },
      {
        label: '실행 전환 허용 미부여',
        description:
          '실행 단계로 전환하는 허용이 아직 부여되지 않았음 — 전제조건 검토가 완료되어도 실행 허용이 자동 부여되지 않음',
        notGrantedReason: '실행 전환 허용 — 미부여',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 허용 미부여',
        description:
          '승인 요청 제출 허용이 아직 부여되지 않았음 — 별도 채널 명시 승인 완료 전까지 제출 불가',
        notGrantedReason: '승인 요청 제출 허용 — 미부여',
        tone: 'blocked',
      },
      {
        label: '가격·재고 변경 허용 미부여',
        description:
          '가격 및 재고 변경 API 호출 허용이 아직 부여되지 않았음',
        notGrantedReason: '가격·재고 변경 허용 — 미부여',
        tone: 'blocked',
      },
    ];

  const preconditionReviewNotApprovalItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldPreconditionReviewNotApprovalItem[] =
    [
      {
        label: '"전제조건 검토 완료 = 보류 해제 승인" 오해 방지',
        description:
          '전제조건 목록을 검토하고 모두 확인했더라도 그것은 해제 승인이 아님 — 별도 채널 명시 승인이 별도로 필요',
        correctInterpretation:
          '전제조건 검토 완료 = 사람이 확인해야 할 사항을 인지함 (해제 승인 아님)',
        tone: 'blocked',
      },
      {
        label: '"전제조건 경계 표시 = 보류 해제" 오해 방지',
        description:
          '이 경계 패널이 표시되었다고 해서 보류가 해제된 것이 아님 — 표시는 정보 전달 목적',
        correctInterpretation:
          '경계 표시 = 정보 전달 전용 (보류 해제 아님)',
        tone: 'blocked',
      },
      {
        label: '"read-only 흐름 전체 완료 = 실행 허용" 오해 방지',
        description:
          'Task 41~78 read-only 흐름이 모두 완료되더라도 실행 허용이 자동으로 부여되지 않음',
        correctInterpretation:
          'read-only 흐름 완료 = 검토 목적 완료 (실행 허용 자동 부여 아님)',
        tone: 'blocked',
      },
      {
        label: '"경계 패널 통과 = 다음 단계 실행 가능" 오해 방지',
        description:
          '경계 패널을 통과했다고 해서 다음 단계(token 발급, 승인 요청 제출, 실행)가 허용되지 않음',
        correctInterpretation:
          '경계 패널 통과 = 경계 확인 (다음 단계 자동 허용 아님)',
        tone: 'warning',
      },
    ];

  const blockedReleasePathItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldBlockedReleasePathItem[] =
    [
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
        label: '실행 경로 차단',
        description:
          '실행 전환으로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '실행 경로 — 차단',
        tone: 'blocked',
      },
      {
        label: '외부 API 호출 경로 차단',
        description:
          '외부 API 호출로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '외부 API 호출 경로 — 차단',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 경로 차단',
        description:
          '운영 DB write로 이어지는 경로는 별도 명시 승인 전까지 차단 유지',
        blockedState: '운영 DB write 경로 — 차단',
        tone: 'blocked',
      },
    ];

  const requiredBeforeActualReleaseItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRequiredBeforeActualReleaseItem[] =
    [
      {
        label: '별도 채널 명시 승인 기록',
        description:
          '별도 채널(슬랙·이메일·내부 결재)에서 이루어진 명시 승인 기록이 제출되어야 함',
        requiredEvidence: '별도 채널 명시 승인 기록',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 확정 문서',
        description:
          'token 발급 환경·범위·담당자·실행 조건이 명시된 확정 문서가 준비되어야 함',
        requiredEvidence: 'token 발급 조건 확정 문서',
        tone: 'blocked',
      },
      {
        label: '실행 범위 확정 문서 및 책임자 승인',
        description:
          '외부 API 호출 범위·운영 DB write 범위가 명시된 확정 문서와 책임자 승인이 필요함',
        requiredEvidence: '실행 범위 확정 문서 및 책임자 승인',
        tone: 'warning',
      },
      {
        label: '실행 담당자 명시 지정 기록',
        description:
          '보류 해제 후 실행 담당자가 명시적으로 지정된 기록이 필요함',
        requiredEvidence: '실행 담당자 명시 지정 기록',
        tone: 'warning',
      },
    ];

  const nextHumanGateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextHumanGateItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시',
        description:
          '경계 패널 확인 후 별도 채널에서 승인 절차를 개시해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '전제조건 충족 여부 최종 확인',
        description:
          'Task 78에서 정리된 전제조건 항목이 모두 충족되었는지 책임자가 최종 확인해야 함',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: '승인 증거 문서 보관',
        description:
          '승인 과정에서 생성된 모든 증거 문서를 별도 보관해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정 공표',
        description:
          '전제조건 충족 확인 및 증거 문서 준비 완료 후 책임자가 보류 해제 결정을 공표해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '경계 표시 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
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
      'Token First Test Separate Approval - Final Hold Release Boundary',
    statusLabel: 'READ-ONLY RELEASE BOUNDARY',
    statusTone: 'warning',
    summary:
      'Task 41~78 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 최종 보류 해제 전제조건을 검토하더라도 그것이 실제 해제 승인으로 해석되지 않도록 ' +
      '경계를 명확히 표시합니다. 현재 상태는 보류 해제 완료가 아니라 보류 해제 경계 표시 완료입니다.',
    taskRangeLabel: 'Task 41~78 read-only 흐름 완료 (실행 미해제 — 해제 승인 미완료)',
    previousPreconditionsLabel: 'Task 78 Final Hold Release Preconditions Review',
    previousPreconditionsCommit: '555d83e',
    boundarySummaryItems,
    releaseIsNotGrantedItems,
    preconditionReviewNotApprovalItems,
    blockedReleasePathItems,
    requiredBeforeActualReleaseItems,
    nextHumanGateItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 경계 표시가 완료되더라도 별도 명시 승인 전까지 ' +
      'token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 경계 패널은 전제조건 검토가 보류 해제 승인으로 오해되지 않도록 안전선을 표시하는 read-only 참고 자료이며, ' +
      '자동으로 실행 단계로 이어지지 않습니다.',
  };
}
