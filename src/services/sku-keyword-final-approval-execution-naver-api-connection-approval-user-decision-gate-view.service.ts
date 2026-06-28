export type NaverApiConnectionApprovalUserDecisionGateDecisionItem = {
  label: string;
  status: 'LOCKED' | 'PENDING_USER_DECISION' | 'READ_ONLY_CONFIRMED';
  description: string;
};

export type NaverApiConnectionApprovalUserDecisionGateExecutionLockFlags = {
  isActualApprovalSubmissionAllowed: false;
  isApprovalSubmission: false;
  isApprovalSubmitted: false;
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
};

export type NaverApiConnectionApprovalUserDecisionGateView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'WAITING_USER_DECISION';
  description: string;
  isBatchJobResultDisplayOnly: true;
  isUserApprovalStillRequired: true;
  isUserDecisionPending: true;
  decisionItems: NaverApiConnectionApprovalUserDecisionGateDecisionItem[];
  executionLockFlags: NaverApiConnectionApprovalUserDecisionGateExecutionLockFlags;
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalUserDecisionGateView(
  job: any
): NaverApiConnectionApprovalUserDecisionGateView {

  return {
    taskName: 'Task 220 - Naver API Connection Approval User Decision Gate Screen Flow',
    title: 'Naver API Connection Approval User Decision Gate',
    panelTitle: 'Naver API Connection Approval User Decision Gate',
    status: 'WAITING_USER_DECISION',
    description: 'Task 215~219는 승인 준비/검토/증거 인증일 뿐 실제 승인 제출이 아닙니다. 다음 단계 진행에는 사용자 명시 승인이 필요합니다.',
    isBatchJobResultDisplayOnly: true,
    isUserApprovalStillRequired: true,
    isUserDecisionPending: true,

    decisionItems: [
      {
        label: 'Evidence Certification 상태 (Task 219)',
        status: 'READ_ONLY_CONFIRMED',
        description: 'Task 219 Evidence Certification은 실제 승인 제출이 아니었습니다. read-only 인증만 수행되었습니다.'
      },
      {
        label: '실제 승인 제출',
        status: 'PENDING_USER_DECISION',
        description: '실제 승인 제출은 아직 허용되지 않습니다. 사용자 명시 승인이 필요합니다.'
      },
      {
        label: 'Token 발급',
        status: 'LOCKED',
        description: 'Token 발급은 아직 허용되지 않습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        label: 'Naver API 호출',
        status: 'LOCKED',
        description: 'Naver API 호출은 아직 허용되지 않습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        label: '상품 조회/수정 API 호출',
        status: 'LOCKED',
        description: '상품 조회 및 수정 API 호출은 아직 허용되지 않습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        label: '가격/재고 변경',
        status: 'LOCKED',
        description: '가격 및 재고 변경은 아직 허용되지 않습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        label: 'Worker/Queue/Adapter 실행 경로',
        status: 'LOCKED',
        description: 'Worker, Queue, Adapter 실행 경로는 아직 연결되지 않습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        label: '다음 단계 진행 가능 여부',
        status: 'PENDING_USER_DECISION',
        description: '다음 단계 진행에는 별도 사용자 명시 승인이 필요합니다. 이 화면은 표시 전용이며 실행 버튼이 없습니다.'
      }
    ],

    executionLockFlags: {
      isActualApprovalSubmissionAllowed: false,
      isApprovalSubmission: false,
      isApprovalSubmitted: false,
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
      hasAuthKeyAccess: false
    },

    misunderstandingPreventionItems: [
      '이 화면은 표시 전용이며 실행 버튼이 없습니다.',
      'Task 215~219는 승인 준비/검토/증거 인증이었으며 실제 승인 제출이 아니었습니다.',
      '사용자 명시 승인 전까지 다음 단계 진행은 불가능합니다.',
      '이 게이트 패널 자체가 승인을 의미하지 않습니다.',
      'POST API, mutation, DB write, Live 실행 경로가 존재하지 않습니다.'
    ],

    finalNotice: '이 패널은 Task 215~219 Naver API 연결 승인 준비 흐름이 완료된 이후에도 아직 사용자의 실제 승인 결정이 내려지지 않았음을 명확히 표시합니다. 실제 승인은 사용자의 별도 명시적 지시로만 진행됩니다.'
  };
}
