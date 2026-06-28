export type NaverApiConnectionApprovalManualApprovalRequestWaitingNoticeItem = {
  noticeItem: string;
  status:
    | 'NON_EXECUTION_CERTIFIED'
    | 'WAITING_MANUAL_REQUEST'
    | 'PENDING_USER_APPROVAL'
    | 'NOT_SUBMITTED'
    | 'NOT_ALLOWED'
    | 'NOT_PRESENT'
    | 'NOT_CONNECTED'
    | 'LOCKED'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverApiConnectionApprovalManualApprovalRequestWaitingNoticeView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'MANUAL_APPROVAL_REQUEST_WAITING';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isManualApprovalRequestWaiting: true;
  isPreApprovalNonExecutionCertified: true;
  isUserApprovalStillRequired: true;
  isManualApprovalRequestSubmitted: false;
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

  noticeItems: NaverApiConnectionApprovalManualApprovalRequestWaitingNoticeItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalManualApprovalRequestWaitingNoticeView(
  job: any
): NaverApiConnectionApprovalManualApprovalRequestWaitingNoticeView {
  return {
    taskName: 'Task 239 - Naver API Connection Approval Manual Approval Request Waiting Notice Screen Flow',
    title: 'Naver API Connection Approval Manual Approval Request Waiting Notice',
    panelTitle: 'Naver API Connection Approval Manual Approval Request Waiting Notice',
    status: 'MANUAL_APPROVAL_REQUEST_WAITING',
    description: '현재 상태는 수동 승인 요청 대기 상태입니다. Task 238 비실행 인증 이후 사용자의 별도 수동 승인 요청이 있어야만 다음 단계로 진행할 수 있습니다. 이 패널은 대기 상태 안내 표시 전용이며 승인 요청 버튼이나 실행 기능이 없습니다.',

    isBatchJobResultDisplayOnly: true,
    isManualApprovalRequestWaiting: true,
    isPreApprovalNonExecutionCertified: true,
    isUserApprovalStillRequired: true,
    isManualApprovalRequestSubmitted: false,
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

    noticeItems: [
      {
        noticeItem: '비실행 인증 (Task 238)',
        status: 'NON_EXECUTION_CERTIFIED',
        meaning: 'Task 238 비실행 인증이 완료되었습니다. 실행 경로가 없음이 인증된 상태입니다.'
      },
      {
        noticeItem: '사용자 수동 승인 요청',
        status: 'WAITING_MANUAL_REQUEST',
        meaning: '아직 수동 승인 요청이 없습니다. 사용자의 별도 명시 지시가 있어야 다음 단계로 진행됩니다.'
      },
      {
        noticeItem: '실제 사용자 승인',
        status: 'PENDING_USER_APPROVAL',
        meaning: '아직 승인되지 않았습니다. 사용자 명시적 승인이 필요합니다.'
      },
      {
        noticeItem: '실제 승인 제출',
        status: 'NOT_SUBMITTED',
        meaning: '실제 승인 제출이 이루어지지 않았습니다. 이 안내 패널은 제출이 아닙니다.'
      },
      {
        noticeItem: '실행 권한',
        status: 'NOT_ALLOWED',
        meaning: '실행 권한이 없습니다. 수동 승인 요청과 실제 승인 없이는 실행이 허용되지 않습니다.'
      },
      {
        noticeItem: '실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '실행 버튼이 없습니다. 이 패널에 실행을 트리거하는 UI 요소가 존재하지 않습니다.'
      },
      {
        noticeItem: 'Submit Action',
        status: 'NOT_PRESENT',
        meaning: 'submit 동작이 없습니다. 이 패널에 form submit이나 승인 제출 동작이 존재하지 않습니다.'
      },
      {
        noticeItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출/실행 경로가 없습니다. 어떤 POST 요청도 연결되지 않았습니다.'
      },
      {
        noticeItem: 'Token / Naver API',
        status: 'LOCKED',
        meaning: '발급/호출이 없습니다. Token 발급도 Naver API 호출도 없습니다.'
      },
      {
        noticeItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출이 없습니다. 상품 조회 API와 상품 수정 API 모두 호출되지 않았습니다.'
      },
      {
        noticeItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경이 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
      },
      {
        noticeItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로가 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않았습니다.'
      },
      {
        noticeItem: '운영 DB write',
        status: 'LOCKED',
        meaning: '저장/변경이 없습니다. DB에 대한 write 작업이 없습니다.'
      },
      {
        noticeItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 239는 수동 승인 요청 대기 안내 표시 전용입니다. 이 안내 자체가 승인이나 실행을 의미하지 않습니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 239는 승인 요청 버튼이나 실행 기능이 아닙니다. 수동 승인 요청 대기 상태를 read-only로 안내하는 표시 전용 패널입니다.',
      'MANUAL_APPROVAL_REQUEST_WAITING 상태는 실행 허용이 아닙니다.',
      'Task 238 비실행 인증은 실제 승인이나 실행이 아닙니다.',
      '수동 승인 요청 대기 안내를 표시한다고 해서 승인이 이루어진 것이 아닙니다.',
      '사용자의 별도 명시 지시 전에는 다음 단계 진행이 불가합니다.',
      'Token, Naver API, 상품 조회/수정, 가격/재고 변경, Worker/Queue/Adapter, POST API, DB write는 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 수동 승인 요청 대기 상태 안내만 표시합니다. 승인 요청 버튼, 실행 버튼, submit 동작이 없으며 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다. 표시 전용입니다.'
  };
}
