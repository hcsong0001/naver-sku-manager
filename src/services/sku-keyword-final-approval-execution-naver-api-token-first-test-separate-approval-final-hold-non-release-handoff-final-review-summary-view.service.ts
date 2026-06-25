export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldFinalReviewSummaryItem {
  label: string;
  description: string;
  reviewState: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffSummaryItem {
  label: string;
  description: string;
  currentState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReviewerFinalCheckItem {
  label: string;
  description: string;
  reviewerMustConfirm: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNotReleaseApprovalItem {
  label: string;
  description: string;
  notApprovalReason: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldRemainingHoldItem {
  label: string;
  description: string;
  holdState: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNextSafeHandoffItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousSealLabel: string;
  previousSealCommit: string;

  finalReviewSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldFinalReviewSummaryItem[];
  nonReleaseHandoffSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffSummaryItem[];
  reviewerFinalCheckItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReviewerFinalCheckItem[];
  notReleaseApprovalItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNotReleaseApprovalItem[];
  remainingHoldItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRemainingHoldItem[];
  nextSafeHandoffItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextSafeHandoffItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView {
  const finalReviewSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldFinalReviewSummaryItem[] =
    [
      {
        label: 'Task 80~83 보류 미해제 인수인계 흐름 최종 요약',
        description:
          'Task 80(Non-Release Seal) → Task 81(Non-Release Handoff Checklist) → Task 82(Non-Release Handoff Boundary) → Task 83(Non-Release Handoff Non-Release Seal) 흐름이 모두 완료됨',
        reviewState: 'Task 80~83 흐름 완료 — 보류 미해제 인수인계 완료',
        tone: 'neutral',
      },
      {
        label: 'Task 41~83 전체 read-only 흐름 완료',
        description:
          'Task 41부터 Task 83까지 모든 read-only 흐름이 완료되었으나 어느 단계도 실행 허용 또는 보류 해제 승인을 부여하지 않았음',
        reviewState: 'Task 41~83 완료 — 실행 허용 미부여',
        tone: 'neutral',
      },
      {
        label: '인수인계 완료 ≠ 보류 해제',
        description:
          '인수인계 흐름이 완료되었더라도 보류 상태는 해제되지 않았음 — 별도 채널 명시 승인 전까지 보류 유지',
        reviewState: '인수인계 완료 — 보류 유지 중',
        tone: 'warning',
      },
      {
        label: '최종 검토 요약은 read-only 참고 자료',
        description:
          '이 최종 검토 요약 패널은 사람이 인수인계 완료 후 상태를 확인하기 위한 read-only 참고 자료이며 자동으로 처리되지 않음',
        reviewState: '최종 검토 요약 = read-only 참고 자료 전용',
        tone: 'neutral',
      },
      {
        label: '모든 봉인 절차가 완료된 상태',
        description:
          'Task 80 Non-Release Seal 및 Task 83 Non-Release Handoff Non-Release Seal이 모두 완료되어 인수인계 흐름이 봉인되었음',
        reviewState: '봉인 절차 완료 — 해제 미승인',
        tone: 'warning',
      },
    ];

  const nonReleaseHandoffSummaryItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffSummaryItem[] =
    [
      {
        label: '인수인계 후에도 보류 상태 유지',
        description:
          '보류 미해제 인수인계 흐름이 완료된 이후에도 보류 상태는 계속 유지됨 — 해제되지 않음',
        currentState: '인수인계 완료 — 보류 상태 유지 중',
        tone: 'warning',
      },
      {
        label: '인수인계 받은 검토자에게도 해제 권한 없음',
        description:
          '인수인계를 받은 다음 검토자도 별도 채널 명시 승인 없이는 보류를 해제할 수 없음',
        currentState: '인수인계 검토자 — 단독 해제 권한 없음',
        tone: 'blocked',
      },
      {
        label: 'Non-Release Handoff Checklist 확인 완료',
        description:
          'Task 81에서 인수인계 전 확인 목록이 read-only로 검토 완료되었음 — 실행 허용 없음',
        currentState: '인수인계 체크리스트 검토 완료 — 실행 허용 없음',
        tone: 'warning',
      },
      {
        label: 'Non-Release Handoff Boundary 표시 완료',
        description:
          'Task 82에서 인수인계 경계가 read-only로 표시 완료되었음 — 보류 해제 아님',
        currentState: '인수인계 경계 표시 완료 — 보류 해제 아님',
        tone: 'warning',
      },
    ];

  const reviewerFinalCheckItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReviewerFinalCheckItem[] =
    [
      {
        label: '인수인계 전체 흐름 이해 확인',
        description:
          '다음 검토자는 Task 80~83 흐름을 검토하여 보류 미해제 상태가 유지됨을 이해해야 함',
        reviewerMustConfirm: 'Task 80~83 흐름 이해 완료 및 보류 미해제 상태 확인',
        tone: 'warning',
      },
      {
        label: '별도 채널 승인 없이 해제 불가 확인',
        description:
          '다음 검토자는 별도 채널 명시 승인 없이는 보류를 해제할 수 없음을 확인해야 함',
        reviewerMustConfirm: '별도 채널 명시 승인 없이 해제 불가 확인',
        tone: 'blocked',
      },
      {
        label: '인수인계 증거 문서 보관 확인',
        description:
          '인수인계 과정에서 생성된 증거 문서가 별도 보관되었는지 확인해야 함',
        reviewerMustConfirm: '인수인계 증거 문서 별도 보관 확인',
        tone: 'neutral',
      },
      {
        label: '보류 해제 전제조건 재확인',
        description:
          '다음 검토자는 Task 78에서 정리된 보류 해제 전제조건이 아직 충족되지 않았음을 재확인해야 함',
        reviewerMustConfirm: '보류 해제 전제조건 미충족 상태 재확인',
        tone: 'warning',
      },
    ];

  const notReleaseApprovalItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNotReleaseApprovalItem[] =
    [
      {
        label: '"최종 검토 요약 표시 = 보류 해제 승인" 오해 방지',
        description:
          '이 최종 검토 요약이 표시되더라도 보류 해제 승인이 아님 — 사람의 별도 채널 명시 승인 필요',
        notApprovalReason: '최종 검토 요약 = 정보 전달 전용 (보류 해제 승인 아님)',
        tone: 'blocked',
      },
      {
        label: '"인수인계 완료 = 실행 허용" 오해 방지',
        description:
          '인수인계가 완료되더라도 실행 허용이 자동으로 부여되지 않음',
        notApprovalReason: '인수인계 완료 = 인수인계만 완료 (실행 허용 자동 부여 아님)',
        tone: 'blocked',
      },
      {
        label: '"Task 41~83 전체 완료 = 보류 해제" 오해 방지',
        description:
          'Task 41~83 전체 흐름이 완료되더라도 보류 해제 승인이 자동으로 이루어지지 않음',
        notApprovalReason: 'Task 41~83 완료 = 검토 완료 (보류 해제 자동 승인 아님)',
        tone: 'blocked',
      },
      {
        label: '"최종 요약 확인 = 다음 단계 진행 가능" 오해 방지',
        description:
          '최종 요약을 확인했다고 해서 다음 단계(token 발급, 제출, 실행)가 허용되지 않음',
        notApprovalReason: '최종 요약 확인 = 내용 인지 (다음 단계 자동 허용 아님)',
        tone: 'warning',
      },
    ];

  const remainingHoldItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldRemainingHoldItem[] =
    [
      {
        label: '보류 상태 — 계속 유지 중',
        description:
          'Task 80~83 인수인계 흐름 완료 이후에도 보류 상태는 계속 유지되고 있음',
        holdState: '보류 상태 유지 중 — 해제 미승인',
        tone: 'blocked',
      },
      {
        label: 'token 발급 — 미허용',
        description:
          'token 발급 허용이 아직 부여되지 않았음 — 별도 채널 명시 승인 전까지 미허용',
        holdState: 'token 발급 — 미허용',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 — 미허용',
        description:
          '승인 요청 제출이 아직 허용되지 않았음 — 별도 채널 명시 승인 완료 전까지 미허용',
        holdState: '승인 요청 제출 — 미허용',
        tone: 'blocked',
      },
      {
        label: '실행 전환 — 미허용',
        description:
          '실행 단계 전환이 허용되지 않았음 — 별도 채널 명시 승인 완료 전까지 미허용',
        holdState: '실행 전환 — 미허용',
        tone: 'blocked',
      },
    ];

  const nextSafeHandoffItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextSafeHandoffItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시',
        description:
          '최종 검토 요약 확인 후 별도 채널에서 보류 해제 승인 절차를 개시해야 함',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '보류 해제 전제조건 재점검',
        description:
          'Task 78에서 정리된 보류 해제 전제조건이 충족되었는지 책임자가 재점검해야 함',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: '인수인계 증거 문서 최종 보관',
        description:
          'Task 80~83 인수인계 과정에서 생성된 모든 증거 문서를 최종 보관해야 함',
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

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '최종 검토 요약 이후에도 외부 API 호출은 금지 유지 — 별도 승인 없이 호출 불가',
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
      'Token First Test Separate Approval - Final Hold Non-Release Handoff Final Review Summary',
    statusLabel: 'READ-ONLY FINAL REVIEW SUMMARY',
    statusTone: 'warning',
    summary:
      'Task 41~83 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 보류 미해제 인수인계 흐름(Task 80~83)의 최종 검토 요약을 읽기 전용으로 정리합니다. ' +
      '현재 상태는 보류 해제 가능이 아니라 보류 미해제 인수인계 최종 검토 요약 완료 상태입니다.',
    taskRangeLabel: 'Task 41~83 read-only 흐름 완료 (보류 미해제 인수인계 완료 — 해제 미승인)',
    previousSealLabel: 'Task 83 Final Hold Non-Release Handoff Non-Release Seal',
    previousSealCommit: '74b1d3c',
    finalReviewSummaryItems,
    nonReleaseHandoffSummaryItems,
    reviewerFinalCheckItems,
    notReleaseApprovalItems,
    remainingHoldItems,
    nextSafeHandoffItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 실행 준비가 아닙니다. 최종 검토 요약이 완료되더라도 별도 명시 승인 전까지 ' +
      'token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 최종 검토 요약 패널은 보류 미해제 인수인계 흐름을 read-only로 정리한 참고 자료이며, ' +
      '자동으로 보류 해제 또는 실행 단계로 이어지지 않습니다.',
  };
}
