export type NaverApiConnectionApprovalManualRequestNonSubmissionSealItem = {
  sealItem: string;
  status:
    | 'WAITING_NOTICE_CONFIRMED'
    | 'NOT_SUBMITTED'
    | 'PENDING_USER_APPROVAL'
    | 'NOT_PRESENT'
    | 'NOT_CONNECTED'
    | 'NOT_ALLOWED'
    | 'LOCKED'
    | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverApiConnectionApprovalManualRequestNonSubmissionSealView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'MANUAL_REQUEST_NON_SUBMISSION_SEALED';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isManualRequestNonSubmissionSealed: true;
  isManualApprovalRequestWaiting: true;
  isManualApprovalRequestSubmitted: false;
  isUserApprovalStillRequired: true;
  isActualApprovalGranted: false;
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmitted: false;
  isExecutionAllowed: false;

  isApprovalSubmission: false;
  isPostApiConnected: false;
  isMutationConnected: false;
  isLiveExecutionEnabled: false;
  hasApprovalRequestButton: false;
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

  sealItems: NaverApiConnectionApprovalManualRequestNonSubmissionSealItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalManualRequestNonSubmissionSealView(
  job: any
): NaverApiConnectionApprovalManualRequestNonSubmissionSealView {
  return {
    taskName: 'Task 240 - Naver API Connection Approval Manual Request Non-Submission Seal Screen Flow',
    title: 'Naver API Connection Approval Manual Request Non-Submission Seal',
    panelTitle: 'Naver API Connection Approval Manual Request Non-Submission Seal',
    status: 'MANUAL_REQUEST_NON_SUBMISSION_SEALED',
    description: 'Task 239 수동 승인 요청 대기 안내가 실제 승인 요청 제출이나 승인 처리로 이어지지 않았음을 read-only Seal 패널로 봉인합니다. 수동 승인 요청은 아직 제출되지 않았으며 실제 사용자 승인도 없습니다.',

    isBatchJobResultDisplayOnly: true,
    isManualRequestNonSubmissionSealed: true,
    isManualApprovalRequestWaiting: true,
    isManualApprovalRequestSubmitted: false,
    isUserApprovalStillRequired: true,
    isActualApprovalGranted: false,
    isActualApprovalSubmissionAllowed: false,
    isApprovalSubmitted: false,
    isExecutionAllowed: false,

    isApprovalSubmission: false,
    isPostApiConnected: false,
    isMutationConnected: false,
    isLiveExecutionEnabled: false,
    hasApprovalRequestButton: false,
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

    sealItems: [
      {
        sealItem: 'Manual Approval Request Waiting Notice (Task 239)',
        status: 'WAITING_NOTICE_CONFIRMED',
        meaning: 'Task 239 수동 승인 요청 대기 안내가 확인되었습니다. 대기 안내는 실제 제출이 아닙니다.'
      },
      {
        sealItem: '수동 승인 요청 제출',
        status: 'NOT_SUBMITTED',
        meaning: '아직 제출되지 않았습니다. 수동 승인 요청 제출이 이루어지지 않았습니다.'
      },
      {
        sealItem: '실제 사용자 승인',
        status: 'PENDING_USER_APPROVAL',
        meaning: '아직 승인되지 않았습니다. 사용자 명시적 승인이 필요합니다.'
      },
      {
        sealItem: '승인 요청 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼이 없습니다. 이 패널에 승인 요청을 제출하는 버튼이 존재하지 않습니다.'
      },
      {
        sealItem: '실행 버튼',
        status: 'NOT_PRESENT',
        meaning: '버튼이 없습니다. 이 패널에 실행을 트리거하는 버튼이 존재하지 않습니다.'
      },
      {
        sealItem: 'Submit Action',
        status: 'NOT_PRESENT',
        meaning: 'submit이 없습니다. 이 패널에 form submit이나 승인 제출 동작이 존재하지 않습니다.'
      },
      {
        sealItem: 'POST API 연결',
        status: 'NOT_CONNECTED',
        meaning: '제출 경로가 없습니다. 어떤 POST 요청도 연결되지 않았습니다.'
      },
      {
        sealItem: '실행 권한',
        status: 'NOT_ALLOWED',
        meaning: '실행 권한이 없습니다. 수동 승인 요청 제출과 실제 승인 없이는 실행이 허용되지 않습니다.'
      },
      {
        sealItem: 'Token / Naver API',
        status: 'LOCKED',
        meaning: '발급/호출이 없습니다. Token 발급도 Naver API 호출도 없습니다.'
      },
      {
        sealItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출이 없습니다. 상품 조회 API와 상품 수정 API 모두 호출되지 않았습니다.'
      },
      {
        sealItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경이 없습니다. 가격이나 재고에 대한 실제 변경이 없습니다.'
      },
      {
        sealItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로가 없습니다. Worker, Queue, Adapter 어떤 실행 경로도 연결되지 않았습니다.'
      },
      {
        sealItem: '운영 DB write',
        status: 'LOCKED',
        meaning: '저장/변경이 없습니다. DB에 대한 write 작업이 없습니다.'
      },
      {
        sealItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 240은 수동 요청 비제출 봉인 표시 전용입니다. 이 봉인 자체가 승인이나 실행을 의미하지 않습니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 240은 승인 요청 버튼이나 실행 기능이 아닙니다. 비제출 상태를 read-only로 봉인하는 표시 전용 패널입니다.',
      'MANUAL_REQUEST_NON_SUBMISSION_SEALED 상태는 실행 허용이 아닙니다.',
      'Task 239 수동 승인 요청 대기 안내는 실제 승인 요청 제출이 아닙니다.',
      '비제출 봉인 패널을 표시한다고 해서 승인이 이루어진 것이 아닙니다.',
      '사용자의 별도 명시 지시 전에는 다음 단계 진행이 불가합니다.',
      'Token, Naver API, 상품 조회/수정, 가격/재고 변경, Worker/Queue/Adapter, POST API, DB write는 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 수동 승인 요청 제출이 없었음을 봉인합니다. 승인 요청 버튼, 실행 버튼, submit 동작이 없으며 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다. 표시 전용입니다.'
  };
}
