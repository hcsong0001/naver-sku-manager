export type NaverApiConnectionApprovalFinalUserApprovalHoldSealItem = {
  holdItem: string;
  status: 'CLOSURE_CONFIRMED' | 'PENDING_USER_APPROVAL' | 'BLOCKED' | 'NOT_SUBMITTED' | 'NOT_ALLOWED' | 'LOCKED' | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverApiConnectionApprovalFinalUserApprovalHoldSealView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'FINAL_USER_APPROVAL_HOLD_SEALED';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isFinalUserApprovalHoldSealed: true;
  isUserApprovalStillRequired: true;
  isAutoProceedBlocked: true;
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

  holdItems: NaverApiConnectionApprovalFinalUserApprovalHoldSealItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalFinalUserApprovalHoldSealView(
  job: any
): NaverApiConnectionApprovalFinalUserApprovalHoldSealView {
  return {
    taskName: 'Task 231 - Naver API Connection Approval Final User Approval Hold Seal Screen Flow',
    title: 'Naver API Connection Approval Final User Approval Hold Seal',
    panelTitle: 'Naver API Connection Approval Final User Approval Hold Seal',
    status: 'FINAL_USER_APPROVAL_HOLD_SEALED',
    description: 'Task 215~230 승인 준비 흐름은 완료되었지만 실제 사용자 승인은 아직 없습니다. 사용자 명시 승인 전까지 자동 진행이 금지된 최종 Hold 상태를 read-only Seal로 표시합니다.',

    isBatchJobResultDisplayOnly: true,
    isFinalUserApprovalHoldSealed: true,
    isUserApprovalStillRequired: true,
    isAutoProceedBlocked: true,
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

    holdItems: [
      {
        holdItem: '승인 준비 Closure (Task 230)',
        status: 'CLOSURE_CONFIRMED',
        meaning: 'Task 230 마감 요약이 완료되었습니다. Task 215~230 준비 흐름은 read-only로 정리되었습니다.'
      },
      {
        holdItem: '최종 사용자 승인',
        status: 'PENDING_USER_APPROVAL',
        meaning: '아직 사용자 실제 승인이 이루어지지 않았습니다. 사용자 명시적 지시가 필요합니다.'
      },
      {
        holdItem: '자동 진행',
        status: 'BLOCKED',
        meaning: '사용자 승인 전 자동 진행이 금지됩니다. 다음 단계는 사용자 명시 지시로만 시작됩니다.'
      },
      {
        holdItem: '실제 승인 제출',
        status: 'NOT_SUBMITTED',
        meaning: '실제 승인 제출이 이루어지지 않았습니다. 이 Hold Seal은 제출이 아닙니다.'
      },
      {
        holdItem: '실행 허용 상태',
        status: 'NOT_ALLOWED',
        meaning: '실행 권한이 없습니다. 사용자 명시 승인 없이는 실행이 허용되지 않습니다.'
      },
      {
        holdItem: 'Token / Naver API',
        status: 'LOCKED',
        meaning: '발급 및 호출이 없습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        holdItem: '상품 조회/수정 API',
        status: 'LOCKED',
        meaning: '호출이 없습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        holdItem: '가격·재고 변경',
        status: 'LOCKED',
        meaning: '변경이 없습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        holdItem: 'Worker / Queue / Adapter',
        status: 'LOCKED',
        meaning: '실행 경로가 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        holdItem: '운영 DB write',
        status: 'LOCKED',
        meaning: '저장 또는 변경이 없습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        holdItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 231은 read-only 최종 Hold Seal 표시 전용입니다. 이 Hold Seal 자체가 승인을 의미하지 않습니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 231은 실제 승인 제출 화면이 아닙니다.',
      'Task 230 Closure Summary는 실제 승인이 아니었습니다.',
      '사용자 명시 승인 전까지는 자동 진행이 금지됩니다.',
      '실제 승인은 사용자의 별도 명시적 지시로만 진행됩니다.',
      'Token, Naver API, 상품 조회/수정, 가격/재고 변경, Worker/Queue/Adapter, POST API, DB write는 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 Task 215~230 승인 준비 흐름 완료 후 실제 사용자 승인 대기 Hold 상태를 read-only Seal로 봉인합니다. 사용자 명시 승인 전까지 다음 단계 자동 진행이 금지됩니다. 표시 전용이며 실행 버튼, 승인 버튼, form submit이 없습니다.'
  };
}
