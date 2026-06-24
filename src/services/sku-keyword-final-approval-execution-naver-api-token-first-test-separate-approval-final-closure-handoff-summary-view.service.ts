export interface NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryClosureEvidence {
  label: string;
  description: string;
  evidence: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryHumanReview {
  label: string;
  reason: string;
  requiredBefore: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryNotReleased {
  label: string;
  description: string;
  releaseState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryNextHandoff {
  label: string;
  description: string;
  owner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousGateLabel: string;
  previousGateCommit: string;

  handoffSummaryItems: Array<{
    label: string;
    value: string;
    description: string;
    tone: 'neutral' | 'warning' | 'blocked';
  }>;

  closureEvidenceItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryClosureEvidence[];
  humanReviewRequiredItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryHumanReview[];
  notReleasedItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryNotReleased[];
  nextHandoffItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryNextHandoff[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView {
  const handoffSummaryItems = [
    {
      label: 'Task 41~72 read-only 흐름 상태',
      value: '완료 (실행 미해제)',
      description:
        'Task 41부터 Task 72까지 모든 read-only 검토 흐름이 쌓였으나 실제 실행으로 이어지지 않았음',
      tone: 'neutral' as const,
    },
    {
      label: '승인 요청 제출 여부',
      value: '미제출',
      description:
        '이 흐름에서 승인 요청 제출이 발생하지 않았음 — 사람의 별도 채널을 통한 제출 필요',
      tone: 'warning' as const,
    },
    {
      label: 'Token 발급 여부',
      value: '미발급',
      description:
        'Token 발급이 이 흐름에서 실행되지 않았음 — 별도 승인 없이 token 발급 불가',
      tone: 'warning' as const,
    },
    {
      label: '운영 DB write 여부',
      value: '없음',
      description:
        '이 흐름에서 운영 DB write가 발생하지 않았음 — Prisma mutation 없음',
      tone: 'neutral' as const,
    },
    {
      label: 'Final Closure Gate 완료 여부',
      value: '완료 (Task 72)',
      description:
        'Task 72 Final Closure Gate가 완료되었음 — 이 패널은 그 직후 인수인계 요약 단계',
      tone: 'neutral' as const,
    },
    {
      label: '실행 버튼 / POST API / Queue 연결 여부',
      value: '없음',
      description:
        '이 흐름에 실행 버튼, POST API, Queue/Worker 연결이 추가되지 않았음',
      tone: 'neutral' as const,
    },
  ];

  const closureEvidenceItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryClosureEvidence[] =
    [
      {
        label: 'Task 41~72 read-only 흐름 완료 근거',
        description:
          'Task 41(Safety Boundary)부터 Task 72(Final Closure Gate)까지 32개 단계의 read-only 검토 흐름이 쌓였음',
        evidence: 'Task 41~72 커밋 이력으로 확인 가능',
        tone: 'neutral',
      },
      {
        label: '실행 금지 유지 근거',
        description:
          '모든 Task에서 실행 버튼, POST API, Queue/Worker 연결, 운영 DB write가 추가되지 않았음',
        evidence: 'git log 및 각 service/test 파일로 확인 가능',
        tone: 'neutral',
      },
      {
        label: '금지 문자열 부재 근거',
        description:
          '각 service 파일에 fetch/axios/http client, Naver endpoint URL, 인증 헤더 생성 코드가 없음',
        evidence: '각 task의 test 파일 금지 문자열 검증으로 확인 가능',
        tone: 'neutral',
      },
      {
        label: '인수인계 준비 근거',
        description:
          'Task 72 Final Closure Gate 패널에서 다음 단계를 사람 검토로 명시했음',
        evidence: 'Task 72 service/docs/page.tsx 패널로 확인 가능',
        tone: 'neutral',
      },
      {
        label: 'Prisma schema/migration 변경 없음 근거',
        description:
          'Task 41~72 어느 Task에서도 Prisma schema 또는 migration이 변경되지 않았음',
        evidence: 'prisma/schema.prisma 및 migrations 디렉터리 이력으로 확인 가능',
        tone: 'neutral',
      },
    ];

  const humanReviewRequiredItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryHumanReview[] =
    [
      {
        label: '실행 허용 여부 결정 (사람)',
        reason:
          '별도 명시 승인 없이는 실행 해제가 불가능하므로 사람이 검토하여 결정해야 함',
        requiredBefore: 'token 발급 테스트 실행 전',
        tone: 'warning',
      },
      {
        label: 'Token 발급 조건 확정 (사람)',
        reason:
          'Token 발급을 위한 환경, 범위, 담당자, 실행 조건이 확정되지 않았음',
        requiredBefore: 'token 발급 테스트 실행 전',
        tone: 'warning',
      },
      {
        label: 'Naver endpoint 호출 승인 (사람)',
        reason:
          'Naver API endpoint 호출을 위한 명시적 승인이 없으므로 사람의 승인이 필요함',
        requiredBefore: '외부 API 호출 전',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 허용 결정 (사람)',
        reason:
          '운영 DB write 허용을 위한 별도 승인이 없으므로 사람이 결정해야 함',
        requiredBefore: '운영 DB write 실행 전',
        tone: 'blocked',
      },
      {
        label: 'Queue/Worker 실행 연결 결정 (사람)',
        reason:
          'Queue 및 Worker 실행 연결을 위한 승인이 없으므로 사람이 결정해야 함',
        requiredBefore: '비동기 실행 흐름 연결 전',
        tone: 'blocked',
      },
    ];

  const notReleasedItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryNotReleased[] =
    [
      {
        label: '승인 요청 제출',
        description:
          '승인 요청 제출이 이 흐름에서 해제되지 않았음 — 사람의 별도 채널 제출 필요',
        releaseState: '미해제',
        tone: 'blocked',
      },
      {
        label: 'Token 발급 실행',
        description:
          'Token 발급 실행이 이 흐름에서 해제되지 않았음 — 별도 승인 완료 후 해제 가능',
        releaseState: '미해제',
        tone: 'blocked',
      },
      {
        label: 'Naver API 호출',
        description:
          'Naver API 호출이 이 흐름에서 해제되지 않았음 — 명시적 승인 없이 호출 불가',
        releaseState: '미해제',
        tone: 'blocked',
      },
      {
        label: '운영 DB write',
        description:
          '운영 DB write가 이 흐름에서 해제되지 않았음 — Prisma mutation 금지 유지',
        releaseState: '미해제',
        tone: 'blocked',
      },
      {
        label: 'Queue/Worker 실행 연결',
        description:
          'Queue 및 Worker 실행 연결이 이 흐름에서 해제되지 않았음 — 실행 흐름 연결 금지 유지',
        releaseState: '미해제',
        tone: 'blocked',
      },
      {
        label: '가격/재고 변경 API 호출',
        description:
          '가격 및 재고 변경 API 호출이 이 흐름에서 해제되지 않았음 — 상품 데이터 변경 금지 유지',
        releaseState: '미해제',
        tone: 'blocked',
      },
    ];

  const nextHandoffItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryNextHandoff[] =
    [
      {
        label: '별도 채널 승인 검토',
        description:
          '슬랙·이메일·내부 결재 등 별도 채널에서 실행 허용 여부 검토를 이어받아야 함',
        owner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '실행 범위 문서화',
        description:
          '실제 실행 범위(token 발급 조건, endpoint 호출 조건, DB write 허용 조건)를 별도 문서로 확정해야 함',
        owner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: 'Token 테스트 조건 확정',
        description:
          'Token 최초 발급 테스트의 정확한 실행 조건(환경, 범위, 담당자)을 확정해야 함',
        owner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '승인 전환 준비',
        description:
          '사람 검토 완료 후 별도 명시 승인을 통해 다음 단계(실행 허용)로 전환 준비를 확인해야 함',
        owner: '사람 (승인 권한자)',
        tone: 'warning',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryItem[] =
    [
      {
        label: '실제 Naver API 호출',
        description:
          'Handoff Summary 이후에도 Naver API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
        tone: 'blocked',
      },
      {
        label: 'Token 발급 (access/refresh)',
        description:
          'access token 및 refresh token 요청/발급은 금지 유지 — 별도 승인 없이 token 발급 불가',
        tone: 'blocked',
      },
      {
        label: '인증 헤더 생성',
        description:
          '인증 헤더 생성은 금지 유지 — 인증키 없이 헤더 생성 불가',
        tone: 'blocked',
      },
      {
        label: 'fetch/axios/http client 신규 추가',
        description:
          'fetch, axios, http client 신규 추가는 금지 유지 — 외부 통신 불가',
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
      'Token First Test Separate Approval - Final Closure Handoff Summary',
    statusLabel: 'READ-ONLY HANDOFF SUMMARY',
    statusTone: 'warning',
    summary:
      'Task 41~72 read-only 검토 흐름은 실제 제출 또는 실행을 해제하지 않습니다. ' +
      '이 패널은 사람이 다음 승인 검토를 이어받기 위한 인수인계 요약만 제공합니다. ' +
      '현재 상태는 실행 준비 완료가 아니라 사람 검토용 인수인계 요약 완료입니다.',
    taskRangeLabel: 'Task 41~72 read-only 흐름 완료 (실행 미해제)',
    previousGateLabel: 'Task 72 Final Closure Gate',
    previousGateCommit: '99b59a5',
    handoffSummaryItems,
    closureEvidenceItems,
    humanReviewRequiredItems,
    notReleasedItems,
    nextHandoffItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 사람의 별도 명시 승인 전까지 token 발급, 승인 요청 제출, ' +
      'Naver API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '인수인계 요약은 사람 검토를 위한 참고 자료이며, 자동으로 실행 단계로 이어지지 않습니다.',
  };
}
