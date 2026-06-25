export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewHoldSummaryItem {
  label: string;
  description: string;
  holdState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldReasonItem {
  label: string;
  description: string;
  reason: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewStillPendingItem {
  label: string;
  description: string;
  pendingState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewReleaseBlockedItem {
  label: string;
  description: string;
  blockedState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewNotExecutionReadyItem {
  label: string;
  description: string;
  notReadyState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewNextSafeHandoffItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousSealLabel: string;
  previousSealCommit: string;

  holdSummaryItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewHoldSummaryItem[];
  finalHoldReasons: NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldReasonItem[];
  humanReviewStillPendingItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewStillPendingItem[];
  releaseBlockedItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewReleaseBlockedItem[];
  notExecutionReadyItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNotExecutionReadyItem[];
  nextSafeHandoffItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNextSafeHandoffItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView {
  const holdSummaryItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewHoldSummaryItem[] = [
    {
      label: '최종 보류 상태의 의미',
      description:
        'Task 41~76 read-only 흐름 전체가 완료되었으나 실제 실행·제출·token 발급이 허용되지 않은 상태로 최종 보류 중',
      holdState: '최종 보류 — 실행 미해제',
      tone: 'warning',
    },
    {
      label: '사람 검토 완료와 보류 상태의 관계',
      description:
        '사람이 검토를 수락하고 비실행 봉인까지 확인하더라도 현재 상태는 최종 보류이며 실행 가능 상태가 아님',
      holdState: '검토 완료 + 봉인 확인 — 여전히 보류 중',
      tone: 'warning',
    },
    {
      label: '비실행 봉인 이후 보류 지속',
      description:
        'Task 76 Human Review Non-Execution Seal 패널이 표시된 이후에도 보류 상태는 자동 해제되지 않음',
      holdState: '봉인 패널 표시 완료 — 보류 지속',
      tone: 'warning',
    },
    {
      label: '화면 패널 표시와 실행 허용의 구분',
      description:
        '이 패널이 화면에 표시된다는 것은 최종 보류 상태를 요약하는 것이며, 실행 허용 신호가 아님',
      holdState: '화면 표시 = 보류 요약 전용',
      tone: 'neutral',
    },
    {
      label: 'Task 41~76 전체 흐름 보류',
      description:
        'Task 41부터 Task 76까지 모든 단계가 read-only로 쌓였으며, 이 모든 단계가 현재 보류 상태에 해당',
      holdState: 'Task 41~76 전체 — 보류 상태',
      tone: 'neutral',
    },
  ];

  const finalHoldReasons: NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldReasonItem[] =
    [
      {
        label: '별도 채널 명시 승인 미완료',
        description:
          '실행 허용을 위한 별도 채널(슬랙·이메일·내부 결재)에서의 명시적 승인이 아직 이루어지지 않음',
        reason: '별도 채널 명시 승인 미완료 — 보류 유지',
        tone: 'blocked',
      },
      {
        label: 'token 발급 조건 미확정',
        description:
          'token 발급을 위한 환경·범위·담당자·실행 조건이 별도 문서로 아직 확정되지 않음',
        reason: 'token 발급 조건 미확정 — 보류 유지',
        tone: 'blocked',
      },
      {
        label: '실행 전환 결정 미수행',
        description:
          '실행 단계로의 전환을 결정할 사람의 최종 판단이 아직 이루어지지 않음',
        reason: '실행 전환 결정 미수행 — 보류 유지',
        tone: 'blocked',
      },
      {
        label: '검토자 명시 지정 미완료',
        description:
          '이 보류 상태를 인수받아 실행 허용 여부를 최종 결정할 담당자가 아직 명시적으로 지정되지 않음',
        reason: '검토자 명시 지정 미완료 — 보류 유지',
        tone: 'warning',
      },
    ];

  const humanReviewStillPendingItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewStillPendingItem[] =
    [
      {
        label: '사람 검토 수락 ≠ 승인 완료',
        description:
          '사람이 read-only 흐름(Task 41~76)을 검토하고 수락하더라도 그것은 내용을 인지한 것이며 승인 완료가 아님',
        pendingState: '검토 수락 완료 — 승인 미완료 (보류 중)',
        tone: 'blocked',
      },
      {
        label: '비실행 봉인 확인 ≠ 실행 전환 허용',
        description:
          '사람이 Task 76 비실행 봉인 패널을 확인하더라도 그것이 실행 전환을 허용하는 것이 아님',
        pendingState: '봉인 확인 완료 — 실행 전환 미허용 (보류 중)',
        tone: 'blocked',
      },
      {
        label: '사람 검토 이후에도 별도 승인 단계 필요',
        description:
          '사람이 모든 read-only 패널을 검토하고 확인하더라도 별도 채널 승인 단계가 여전히 필요함',
        pendingState: '모든 패널 검토 완료 — 별도 승인 단계 미진행 (보류 중)',
        tone: 'warning',
      },
      {
        label: '체크리스트·경계·봉인 확인 이후에도 보류 유지',
        description:
          'Task 74 체크리스트, Task 75 경계, Task 76 봉인을 모두 확인하더라도 보류 상태는 유지됨',
        pendingState: '체크리스트·경계·봉인 확인 완료 — 보류 유지',
        tone: 'warning',
      },
    ];

  const releaseBlockedItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewReleaseBlockedItem[] =
    [
      {
        label: '외부 API 호출 허용 차단',
        description:
          '외부 API 호출 허용이 차단 상태이며, 별도 명시 승인 전까지 해제되지 않음',
        blockedState: '외부 API 호출 허용 — 차단',
        tone: 'blocked',
      },
      {
        label: 'token 발급 허용 차단',
        description:
          'token 발급 허용이 차단 상태이며, 별도 명시 승인 전까지 해제되지 않음',
        blockedState: 'token 발급 허용 — 차단',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 허용 차단',
        description:
          '승인 요청 제출 허용이 차단 상태이며, 별도 명시 승인 전까지 해제되지 않음',
        blockedState: '승인 요청 제출 허용 — 차단',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 허용 차단',
        description:
          '운영 DB write 허용이 차단 상태이며, 별도 명시 승인 전까지 해제되지 않음',
        blockedState: '운영 DB write 허용 — 차단',
        tone: 'blocked',
      },
      {
        label: 'Queue/Worker 실행 허용 차단',
        description:
          'Queue 및 Worker 실행 허용이 차단 상태이며, 별도 명시 승인 전까지 해제되지 않음',
        blockedState: 'Queue/Worker 실행 허용 — 차단',
        tone: 'blocked',
      },
    ];

  const notExecutionReadyItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNotExecutionReadyItem[] =
    [
      {
        label: '실행 준비 완료가 아님',
        description:
          'Task 41~76 read-only 흐름이 모두 표시되었더라도 현재 상태는 실행 준비 완료가 아니라 최종 보류 중',
        notReadyState: '실행 준비 완료 아님 — 최종 보류 중',
        tone: 'blocked',
      },
      {
        label: '실행 대기 상태가 아님',
        description:
          '현재 상태는 실행 대기가 아니라 별도 승인 절차가 필요한 최종 보류 상태',
        notReadyState: '실행 대기 아님 — 별도 승인 절차 필요',
        tone: 'blocked',
      },
      {
        label: 'token 발급 준비 완료가 아님',
        description:
          'token 발급을 위한 모든 조건이 확정되지 않았으며 발급 준비가 완료된 것이 아님',
        notReadyState: 'token 발급 준비 완료 아님 — 조건 미확정',
        tone: 'blocked',
      },
      {
        label: '자동 실행 전환 없음',
        description:
          '이 패널이 표시된 후 자동으로 실행 단계로 전환되지 않으며, 사람의 별도 결정이 필요',
        notReadyState: '자동 실행 전환 없음 — 사람 결정 필요',
        tone: 'blocked',
      },
    ];

  const nextSafeHandoffItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewNextSafeHandoffItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시',
        description:
          '최종 보류 해제를 위해 별도 채널(슬랙·이메일·내부 결재) 승인 절차를 개시해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '보류 해제 조건 문서화',
        description:
          '보류 해제를 위한 모든 조건을 문서화하고 관련자에게 공유해야 함',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '검토자 최종 판단',
        description:
          '이 보류 상태를 인수받은 검토자가 실행 허용 여부를 최종적으로 판단해야 함',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: '실행 전환 준비',
        description:
          '별도 명시 승인 완료 후 실행 전환 준비 절차를 사람이 직접 진행해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '최종 보류 요약 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
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
      'Token First Test Separate Approval - Human Review Final Hold Summary',
    statusLabel: 'READ-ONLY FINAL HOLD SUMMARY',
    statusTone: 'warning',
    summary:
      'Task 41~76 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 사람 검토와 비실행 봉인 이후에도 현재 상태가 최종 보류 중임을 요약합니다. ' +
      '현재 상태는 실행 대기가 아니라 별도 명시 승인 전 최종 보류 상태입니다.',
    taskRangeLabel: 'Task 41~76 read-only 흐름 완료 (실행 미해제)',
    previousSealLabel: 'Task 76 Human Review Non-Execution Seal',
    previousSealCommit: 'e519e13',
    holdSummaryItems,
    finalHoldReasons,
    humanReviewStillPendingItems,
    releaseBlockedItems,
    notExecutionReadyItems,
    nextSafeHandoffItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 사람이 검토를 수락하고 비실행 봉인을 확인하더라도 별도 명시 승인 전까지 ' +
      'token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 최종 보류 요약 패널은 Task 41~76 read-only 흐름 전체가 실제 실행 없이 보류 상태임을 확인하는 참고 자료이며, ' +
      '자동으로 실행 단계로 이어지지 않습니다.',
  };
}
