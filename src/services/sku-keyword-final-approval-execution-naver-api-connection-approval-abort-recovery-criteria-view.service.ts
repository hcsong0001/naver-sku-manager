export type NaverApiConnectionApprovalAbortRecoveryCriteriaItem = {
  criteriaItem: string;
  status: 'CRITERIA_REQUIRED' | 'LOCKED' | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverApiConnectionApprovalAbortRecoveryCriteriaView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'ABORT_RECOVERY_CRITERIA_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isUserApprovalStillRequired: true;
  isAbortRecoveryCriteriaReady: true;
  isAbortRecoveryCriteriaAccepted: false;

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

  criteriaItems: NaverApiConnectionApprovalAbortRecoveryCriteriaItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalAbortRecoveryCriteriaView(
  job: any
): NaverApiConnectionApprovalAbortRecoveryCriteriaView {
  return {
    taskName: 'Task 224 - Naver API Connection Approval Abort Recovery Criteria Screen Flow',
    title: 'Naver API Connection Approval Abort Recovery Criteria',
    panelTitle: 'Naver API Connection Approval Abort Recovery Criteria',
    status: 'ABORT_RECOVERY_CRITERIA_READY',
    description: '실제 Naver API 연결 테스트 또는 실행 단계로 넘어가기 전에 반드시 정해야 할 중단 조건과 복구 기준을 read-only로 정리합니다. 이 화면은 표시 전용이며 기준 수락이 이루어진 것이 아닙니다.',

    isBatchJobResultDisplayOnly: true,
    isUserApprovalStillRequired: true,
    isAbortRecoveryCriteriaReady: true,
    isAbortRecoveryCriteriaAccepted: false,

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
    hasAuthKeyAccess: false,

    criteriaItems: [
      {
        criteriaItem: 'Token 발급 실패 시 중단',
        status: 'CRITERIA_REQUIRED',
        meaning: '실제 발급 실패 시 다음 단계 진행을 금지해야 합니다. 사용자 확인 후 재시도 여부를 결정해야 합니다.'
      },
      {
        criteriaItem: '인증 오류 발생 시 중단',
        status: 'CRITERIA_REQUIRED',
        meaning: '권한 오류 발생 시 즉시 중단이 필요합니다. 오류 원인 확인 없이 재시도하면 안 됩니다.'
      },
      {
        criteriaItem: '상품 조회 실패 시 중단',
        status: 'CRITERIA_REQUIRED',
        meaning: '조회 오류 발생 시 수정 단계 진입을 금지해야 합니다. 조회 결과 확인 후에만 다음 단계로 진행합니다.'
      },
      {
        criteriaItem: '상품 수정 실패 시 중단',
        status: 'LOCKED',
        meaning: '현재 수정 API는 연결되지 않습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        criteriaItem: '가격/재고 변경 실패 복구',
        status: 'LOCKED',
        meaning: '현재 가격/재고 변경은 금지 상태입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        criteriaItem: '운영 DB write 실패 복구',
        status: 'LOCKED',
        meaning: '현재 운영 DB write는 금지 상태입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        criteriaItem: 'Worker 실패 처리',
        status: 'LOCKED',
        meaning: '현재 Worker 실행이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        criteriaItem: 'Queue 실패 처리',
        status: 'LOCKED',
        meaning: '현재 Queue 연결이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        criteriaItem: 'Adapter 실패 처리',
        status: 'LOCKED',
        meaning: '현재 Adapter 연결이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        criteriaItem: 'Live 실행 중단 기준',
        status: 'LOCKED',
        meaning: '현재 Live 실행은 금지 상태입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        criteriaItem: '사용자 재승인 필요 기준',
        status: 'CRITERIA_REQUIRED',
        meaning: '실패 후 재시도 전 사용자 재승인이 필요합니다. 자동 재시도는 금지합니다.'
      },
      {
        criteriaItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 224는 표시 전용입니다. 이 기준을 봤다고 해서 수락된 것이 아닙니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 224는 실제 승인 제출 화면이 아닙니다.',
      '이 기준을 표시했다고 해서 중단/복구 기준이 수락된 것이 아닙니다.',
      '실제 기준 수락 및 승인은 사용자의 별도 명시적 지시로만 진행됩니다.',
      'Token, Naver API, 상품 조회/수정, 가격/재고 변경, Worker/Queue/Adapter는 이 화면에서 발생하지 않습니다.',
      '이 화면에는 버튼, form, submit, POST API, mutation, DB write가 없습니다.'
    ],

    finalNotice: '이 패널은 실제 Naver API 연결 테스트 또는 실행 단계로 넘어가기 전 반드시 정해야 할 중단 조건과 복구 기준을 read-only로 정리합니다. 표시 전용이며 실행 버튼, 승인 버튼, form submit이 없습니다.'
  };
}
