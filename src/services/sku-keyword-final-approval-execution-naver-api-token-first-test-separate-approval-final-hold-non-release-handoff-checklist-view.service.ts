export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistItem {
  label: string;
  description: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffChecklistEntryItem {
  label: string;
  description: string;
  requiredCheck: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseStateItem {
  label: string;
  description: string;
  currentState: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReviewerConfirmationItem {
  label: string;
  description: string;
  reviewerMustConfirm: string;
  tone: 'neutral' | 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseNotAllowedItem {
  label: string;
  description: string;
  notAllowedReason: string;
  tone: 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffMisunderstandingPreventionItem {
  label: string;
  misunderstanding: string;
  correctInterpretation: string;
  tone: 'warning' | 'blocked';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNextHumanReviewItem {
  label: string;
  description: string;
  nextOwner: string;
  tone: 'neutral' | 'warning';
}

export interface NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView {
  title: string;
  statusLabel: string;
  statusTone: 'neutral' | 'warning' | 'blocked';
  summary: string;

  taskRangeLabel: string;
  previousSealLabel: string;
  previousSealCommit: string;

  handoffChecklistItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffChecklistEntryItem[];
  nonReleaseStateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseStateItem[];
  reviewerConfirmationItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReviewerConfirmationItem[];
  releaseNotAllowedItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseNotAllowedItem[];
  handoffMisunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffMisunderstandingPreventionItem[];
  nextHumanReviewItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextHumanReviewItem[];
  stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistItem[];

  finalNotice: string;
}

export function buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView(
  _input?: unknown
): NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView {
  const handoffChecklistItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffChecklistEntryItem[] =
    [
      {
        label: 'Task 41~80 read-only 흐름 완료 확인',
        description:
          'Task 41부터 Task 80까지 모든 read-only 흐름이 정상적으로 완료되었는지 확인',
        requiredCheck: '모든 read-only 패널이 정상 표시됨',
        tone: 'neutral',
      },
      {
        label: '보류 미해제 봉인 상태 인지',
        description:
          '현재 상태가 보류 해제가 아니라 보류 미해제 봉인 상태임을 인지했는지 확인',
        requiredCheck: '보류 미해제 봉인 상태를 명시적으로 인지함',
        tone: 'warning',
      },
      {
        label: '별도 채널 승인 절차 미개시 확인',
        description:
          '별도 채널(슬랙·이메일·내부 결재)에서의 보류 해제 승인 절차가 아직 개시되지 않았음을 확인',
        requiredCheck: '별도 채널 승인 절차 미개시 상태 확인',
        tone: 'warning',
      },
      {
        label: '금지 항목 여전히 유효함 확인',
        description:
          '외부 API 호출, token 발급, 인증 헤더 생성, POST API, DB write 등 금지 항목이 여전히 유효함을 확인',
        requiredCheck: '모든 금지 항목이 여전히 유효함을 인지함',
        tone: 'blocked',
      },
      {
        label: '인수인계 체크리스트 ≠ 해제 승인 인지',
        description:
          '이 체크리스트가 보류 해제 승인이 아니라 다음 검토를 위한 인수인계 참고 자료임을 인지했는지 확인',
        requiredCheck: '체크리스트 = 인수인계 참고 (해제 승인 아님) 인지',
        tone: 'blocked',
      },
    ];

  const nonReleaseStateItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseStateItem[] =
    [
      {
        label: '보류 해제 미발생',
        description:
          'Task 41~80 전체 흐름에서 보류 해제가 단 한 번도 발생하지 않았음',
        currentState: '보류 해제 — 미발생',
        tone: 'blocked',
      },
      {
        label: 'token 발급 미발생',
        description:
          'access token 및 refresh token 발급이 단 한 번도 발생하지 않았음',
        currentState: 'token 발급 — 미발생',
        tone: 'blocked',
      },
      {
        label: '외부 API 호출 미발생',
        description:
          '외부 API 호출이 단 한 번도 발생하지 않았음',
        currentState: '외부 API 호출 — 미발생',
        tone: 'blocked',
      },
      {
        label: '운영 DB write 미발생',
        description:
          '운영 DB write가 단 한 번도 발생하지 않았음',
        currentState: '운영 DB write — 미발생',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 미발생',
        description:
          '승인 요청 제출이 단 한 번도 발생하지 않았음',
        currentState: '승인 요청 제출 — 미발생',
        tone: 'warning',
      },
    ];

  const reviewerConfirmationItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReviewerConfirmationItem[] =
    [
      {
        label: 'read-only 흐름 결과를 검토로만 수용',
        description:
          'read-only 흐름의 결과를 보류 해제 근거가 아닌 검토 참고 자료로만 수용해야 함',
        reviewerMustConfirm: 'read-only 결과 = 검토 참고 (해제 근거 아님)',
        tone: 'warning',
      },
      {
        label: '보류 미해제 상태 유지에 동의',
        description:
          '현재 보류 미해제 상태가 적절히 유지되고 있음을 확인해야 함',
        reviewerMustConfirm: '보류 미해제 상태 유지에 동의',
        tone: 'warning',
      },
      {
        label: '별도 채널 승인 없이는 진행 불가 인지',
        description:
          '별도 채널 명시 승인 없이는 보류 해제, token 발급, 실행 전환이 불가함을 인지해야 함',
        reviewerMustConfirm: '별도 승인 없이 진행 불가 인지',
        tone: 'blocked',
      },
      {
        label: '다음 검토자에게 안전선을 전달',
        description:
          '자신이 확인한 안전선 내용을 다음 검토자에게 정확히 전달해야 함',
        reviewerMustConfirm: '안전선 내용을 다음 검토자에게 전달 준비',
        tone: 'neutral',
      },
    ];

  const releaseNotAllowedItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseNotAllowedItem[] =
    [
      {
        label: '보류 해제 승인 미부여',
        description:
          '별도 채널 명시 승인이 완료되지 않았으므로 보류 해제가 허용되지 않음',
        notAllowedReason: '별도 채널 명시 승인 — 미완료',
        tone: 'blocked',
      },
      {
        label: 'token 발급 허용 미부여',
        description:
          'token 발급을 위한 별도 승인이 부여되지 않았으므로 token 발급이 허용되지 않음',
        notAllowedReason: 'token 발급 허용 — 미부여',
        tone: 'blocked',
      },
      {
        label: '실행 전환 허용 미부여',
        description:
          '실행 단계로의 전환 허용이 아직 부여되지 않았음',
        notAllowedReason: '실행 전환 허용 — 미부여',
        tone: 'blocked',
      },
      {
        label: '승인 요청 제출 허용 미부여',
        description:
          '승인 요청 제출 허용이 아직 부여되지 않았음',
        notAllowedReason: '승인 요청 제출 허용 — 미부여',
        tone: 'blocked',
      },
      {
        label: '가격·재고 변경 허용 미부여',
        description:
          '가격 및 재고 변경 API 호출 허용이 아직 부여되지 않았음',
        notAllowedReason: '가격·재고 변경 허용 — 미부여',
        tone: 'blocked',
      },
    ];

  const handoffMisunderstandingPreventionItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldHandoffMisunderstandingPreventionItem[] =
    [
      {
        label: '"체크리스트 확인 = 보류 해제 승인" 오해 방지',
        misunderstanding:
          '인수인계 체크리스트를 확인했다고 해서 보류 해제가 승인된 것으로 오해할 수 있음',
        correctInterpretation:
          '체크리스트 확인 = 다음 검토자가 참고할 사항을 인지함 (보류 해제 승인 아님)',
        tone: 'blocked',
      },
      {
        label: '"read-only 흐름 완료 = 실행 준비" 오해 방지',
        misunderstanding:
          'Task 41~80 read-only 흐름이 완료되었다고 해서 실행 준비가 완료된 것으로 오해할 수 있음',
        correctInterpretation:
          'read-only 흐름 완료 = 검토 목적 완료 (실행 준비 자동 부여 아님)',
        tone: 'blocked',
      },
      {
        label: '"다음 검토자 지정 = 권한 위임" 오해 방지',
        misunderstanding:
          '다음 검토자가 지정되었다고 해서 권한이 위임된 것으로 오해할 수 있음',
        correctInterpretation:
          '다음 검토자 지정 = 검토를 이어받을 사람 지정 (보류 해제 권한 위임 아님)',
        tone: 'warning',
      },
      {
        label: '"봉인 패널 확인 = 봉인 해제" 오해 방지',
        misunderstanding:
          '봉인 패널을 확인했다고 해서 봉인이 해제된 것으로 오해할 수 있음',
        correctInterpretation:
          '봉인 패널 확인 = 봉인 상태 인지 (봉인 해제 아님)',
        tone: 'warning',
      },
    ];

  const nextHumanReviewItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNextHumanReviewItem[] =
    [
      {
        label: '별도 채널 승인 절차 개시 준비',
        description:
          '인수인계 체크리스트 확인 후 별도 채널에서 보류 해제 승인 절차 개시 준비',
        nextOwner: '사람 (승인 권한자)',
        tone: 'warning',
      },
      {
        label: '보류 해제 전제조건 충족 여부 최종 검토',
        description:
          'Task 78에서 정리된 전제조건이 모두 충족되었는지 최종적으로 검토',
        nextOwner: '사람 (검토자)',
        tone: 'warning',
      },
      {
        label: '승인 증거 문서 보관',
        description:
          '승인 과정에서 생성될 모든 증거 문서의 보관 계획 수립',
        nextOwner: '사람 (담당자)',
        tone: 'neutral',
      },
      {
        label: '보류 해제 결정 공표 대기',
        description:
          '전제조건 충족 및 증거 문서 준비 완료 후 책임자의 보류 해제 결정 공표 대기',
        nextOwner: '사람 (승인 권한자)',
        tone: 'neutral',
      },
    ];

  const stillForbiddenItems: NaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistItem[] =
    [
      {
        label: '외부 API 호출',
        description:
          '인수인계 체크리스트 확인 이후에도 외부 API 호출은 금지 유지',
        tone: 'blocked',
      },
      {
        label: 'token 발급 (access/refresh)',
        description:
          'access token 및 refresh token 요청·발급은 금지 유지',
        tone: 'blocked',
      },
      {
        label: '인증 헤더 생성',
        description:
          '인증 헤더 생성은 금지 유지',
        tone: 'blocked',
      },
      {
        label: '외부 통신 클라이언트 신규 추가',
        description:
          '외부 통신 라이브러리 신규 추가는 금지 유지',
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
          '실행 버튼, 승인 버튼, 저장 버튼, 제출 버튼, 보류 해제 버튼 추가는 금지 유지',
        tone: 'blocked',
      },
      {
        label: 'Queue/Worker 실행 연결',
        description:
          'Queue 및 Worker 실행 연결은 금지 유지',
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
          '가격 및 재고 변경 API 호출은 금지 유지',
        tone: 'blocked',
      },
    ];

  return {
    title:
      'Token First Test Separate Approval - Final Hold Non-Release Handoff Checklist',
    statusLabel: 'READ-ONLY NON-RELEASE HANDOFF CHECKLIST',
    statusTone: 'warning',
    summary:
      'Task 41~80 read-only 흐름은 실제 제출 또는 실행을 허용하지 않습니다. ' +
      '이 패널은 보류 미해제 봉인 이후 다음 사람이 검토를 이어받기 전에 확인해야 할 체크리스트를 읽기 전용으로 정리합니다. ' +
      '현재 상태는 보류 해제 가능이 아니라 보류 미해제 상태의 다음 검토 체크리스트 표시입니다.',
    taskRangeLabel: 'Task 41~80 read-only 흐름 완료 (보류 미해제 — 인수인계 체크리스트 표시)',
    previousSealLabel: 'Task 80 Final Hold Non-Release Seal',
    previousSealCommit: 'efcaaf5',
    handoffChecklistItems,
    nonReleaseStateItems,
    reviewerConfirmationItems,
    releaseNotAllowedItems,
    handoffMisunderstandingPreventionItems,
    nextHumanReviewItems,
    stillForbiddenItems,
    finalNotice:
      '이 패널은 인수인계 체크리스트이며 보류 해제 승인이 아닙니다. ' +
      '체크리스트를 확인하더라도 별도 명시 승인 전까지 ' +
      '보류 해제, token 발급, 승인 요청 제출, 외부 API 호출, Queue/Worker 실행, 운영 DB write로 전환되지 않습니다. ' +
      '이 체크리스트는 보류 미해제 상태에서 다음 검토자가 참고할 안전선을 정리하는 read-only 자료이며, ' +
      '자동으로 권한을 위임하거나 다음 단계로 이어지지 않습니다.',
  };
}
