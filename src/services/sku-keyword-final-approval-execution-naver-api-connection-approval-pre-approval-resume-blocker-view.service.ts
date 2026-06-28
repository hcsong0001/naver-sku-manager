export type NaverApiConnectionApprovalPreApprovalResumeBlockerItem = {
  blockerItem: string;
  status: 'EVIDENCE_CONFIRMED' | 'PENDING_USER_APPROVAL' | 'BLOCKED' | 'NOT_SUBMITTED' | 'NOT_ALLOWED' | 'LOCKED' | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverApiConnectionApprovalPreApprovalResumeBlockerView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'PRE_APPROVAL_RESUME_BLOCKED';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isPreApprovalResumeBlocked: true;
  isFrozenStateEvidenceSnapshotReady: true;
  isUserApprovalStillRequired: true;
  isAutoProceedBlocked: true;
  isManualResumeBlocked: true;
  isActualApprovalGranted: false;
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmitted: false;
  isExecutionAllowed: false;

  isApprovalSubmission: false;
  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;
  hasExecutionButton: false;
  hasSubmitAction: false;
  hasWorkerTrigger: false;
  hasQueueTrigger: false;
  hasAdapterTrigger: false;
  isNaverApiCalled: false;
  isTokenIssued: false;
  isProductLookupApiCalled: false;
  isProductUpdateApiCalled: false;
  isPriceOrStockChanged: false;
  hasEnvFileAccess: false;
  hasAuthKeyAccess: false;

  blockerItems: NaverApiConnectionApprovalPreApprovalResumeBlockerItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalPreApprovalResumeBlockerView(
  job: any
): NaverApiConnectionApprovalPreApprovalResumeBlockerView {
  return {
    taskName: 'Task 236 - Naver API Connection Approval Pre-Approval Resume Blocker Screen Flow',
    title: 'Naver API Connection Approval Pre-Approval Resume Blocker',
    panelTitle: 'Naver API Connection Approval Pre-Approval Resume Blocker',
    status: 'PRE_APPROVAL_RESUME_BLOCKED',
    description: '사용자 명시 승인 전까지 다음 단계 재개가 불가능함을 read-only Resume Blocker 패널로 표시합니다. Task 235 동결 증거 Snapshot은 확보되었으나 실제 사용자 승인은 아직 없으므로 수동 재개와 자동 진행이 모두 차단됩니다.',

    isBatchJobResultDisplayOnly: true,
    isPreApprovalResumeBlocked: true,
    isFrozenStateEvidenceSnapshotReady: true,
    isUserApprovalStillRequired: true,
    isAutoProceedBlocked: true,
    isManualResumeBlocked: true,
    isActualApprovalGranted: false,
    isActualApprovalSubmissionAllowed: false,
    isApprovalSubmitted: false,
    isExecutionAllowed: false,

    isApprovalSubmission: false,
    isPostApiConnected: false,
    isMutationConnected: false,
    isLiveExecutionEnabled: false,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,
    isNaverApiCalled: false,
    isTokenIssued: false,
    isProductLookupApiCalled: false,
    isProductUpdateApiCalled: false,
    isPriceOrStockChanged: false,
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,

    blockerItems: [
      {
        blockerItem: 'Frozen State Evidence Snapshot (Task 235)',
        status: 'EVIDENCE_CONFIRMED',
        meaning: 'Task 235 동결 증거 Snapshot이 확인되었습니다. 단, 이는 실제 승인이 아닙니다.'
      },
      {
        blockerItem: '사용자 명시 승인',
        status: 'PENDING_USER_APPROVAL',
        meaning: '아직 사용자 실제 승인이 이루어지지 않았습니다. 사용자 명시적 지시가 필요합니다.'
      },
      {
        blockerItem: '다음 단계 재개',
        status: 'BLOCKED',
        meaning: '사용자 승인 전 다음 단계 재개가 금지됩니다. 수동 재개도 허용되지 않습니다.'
      },
      {
        blockerItem: '자동 진행',
        status: 'BLOCKED',
        meaning: '사용자 승인 전 자동 진행이 금지됩니다. 어떤 경로로도 자동 재개가 불가합니다.'
      },
      {
        blockerItem: '실제 승인 제출',
        status: 'NOT_SUBMITTED',
        meaning: '실제 승인 제출이 이루어지지 않았습니다. 이 Resume Blocker는 제출이 아닙니다.'
      },
      {
        blockerItem: '실행 허용 상태',
        status: 'NOT_ALLOWED',
        meaning: '실행 권한이 없습니다. Resume Blocker 상태에서 실행 권한이 열리지 않습니다.'
      },
      {
        blockerItem: 'Token / Naver API',
        status: 'LOCKED',
        meaning: '발급 및 호출이 없습니다. Resume Blocker 상태에서 잠금이 유지됩니다.'
      },
      {
        blockerItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출이 없습니다. Resume Blocker 상태에서 잠금이 유지됩니다.'
      },
      {
        blockerItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경이 없습니다. Resume Blocker 상태에서 잠금이 유지됩니다.'
      },
      {
        blockerItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로가 없습니다. Resume Blocker 상태에서 잠금이 유지됩니다.'
      },
      {
        blockerItem: '운영 DB write',
        status: 'LOCKED',
        meaning: '저장 또는 변경이 없습니다. Resume Blocker 상태에서 잠금이 유지됩니다.'
      },
      {
        blockerItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 236은 read-only Resume Blocker 표시 전용입니다. 이 패널 자체가 승인이나 재개를 의미하지 않습니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 236은 실제 재개 차단 로직 실행이 아닙니다. Resume Blocker 상태를 read-only로 표시하는 전용 패널입니다.',
      'PRE_APPROVAL_RESUME_BLOCKED 상태는 실행 허용이 아닙니다.',
      'Task 235 동결 증거 Snapshot은 실제 승인이 아닙니다.',
      '사용자 명시 승인 전까지 수동 재개와 자동 진행이 모두 금지됩니다.',
      '실제 승인은 사용자의 별도 명시적 지시로만 진행됩니다.',
      'Token, Naver API, 상품 조회/수정, 가격/재고 변경, Worker/Queue/Adapter, POST API, DB write는 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 사용자 명시 승인 전까지 다음 단계 재개가 불가능함을 표시합니다. Task 235 동결 증거가 확보되었으나 실제 사용자 승인이 없으므로 수동 재개와 자동 진행이 모두 차단됩니다. 표시 전용이며 실행 버튼, 승인 버튼, form submit이 없습니다.'
  };
}
