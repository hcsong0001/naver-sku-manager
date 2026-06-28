export type NaverApiConnectionApprovalRiskAcceptanceLedgerItem = {
  riskItem: string;
  status: 'PENDING_USER_ACCEPTANCE' | 'LOCKED' | 'READ_ONLY_INFO';
  meaning: string;
};

export type NaverApiConnectionApprovalRiskAcceptanceLedgerView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'RISK_ACCEPTANCE_LEDGER_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isUserApprovalStillRequired: true;
  isRiskAcceptanceLedgerReady: true;
  isRiskAcceptedByUser: false;

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

  ledgerItems: NaverApiConnectionApprovalRiskAcceptanceLedgerItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalRiskAcceptanceLedgerView(
  job: any
): NaverApiConnectionApprovalRiskAcceptanceLedgerView {
  return {
    taskName: 'Task 223 - Naver API Connection Approval Risk Acceptance Ledger Screen Flow',
    title: 'Naver API Connection Approval Risk Acceptance Ledger',
    panelTitle: 'Naver API Connection Approval Risk Acceptance Ledger',
    status: 'RISK_ACCEPTANCE_LEDGER_READY',
    description: '실제 Naver API 연결 승인 전 사용자가 인지하고 수락해야 할 위험 요소를 read-only Ledger로 정리합니다. 이 화면은 표시 전용이며 위험 수락이 이루어진 것이 아닙니다.',

    isBatchJobResultDisplayOnly: true,
    isUserApprovalStillRequired: true,
    isRiskAcceptanceLedgerReady: true,
    isRiskAcceptedByUser: false,

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

    ledgerItems: [
      {
        riskItem: 'Token 발급 위험',
        status: 'PENDING_USER_ACCEPTANCE',
        meaning: '발급 시 인증 권한이 열릴 수 있습니다. 사용자 명시 수락이 필요합니다.'
      },
      {
        riskItem: '상품 조회 API 위험',
        status: 'PENDING_USER_ACCEPTANCE',
        meaning: '실제 상품 데이터 조회 가능성이 있습니다. 사용자 명시 수락이 필요합니다.'
      },
      {
        riskItem: '상품 수정 API 위험',
        status: 'PENDING_USER_ACCEPTANCE',
        meaning: '잘못 연결되면 상품 정보 변경 위험이 있습니다. 사용자 명시 수락이 필요합니다.'
      },
      {
        riskItem: '가격 변경 위험',
        status: 'LOCKED',
        meaning: '현재는 변경 불가입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        riskItem: '재고 변경 위험',
        status: 'LOCKED',
        meaning: '현재는 변경 불가입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        riskItem: '운영 DB write 위험',
        status: 'LOCKED',
        meaning: '현재는 write가 금지되어 있습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        riskItem: 'Worker 실행 위험',
        status: 'LOCKED',
        meaning: '현재는 실행 경로가 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        riskItem: 'Queue enqueue 위험',
        status: 'LOCKED',
        meaning: '현재는 연결이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        riskItem: 'Adapter 연결 위험',
        status: 'LOCKED',
        meaning: '현재는 연결이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        riskItem: 'Live 실행 위험',
        status: 'LOCKED',
        meaning: '현재는 금지 상태입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        riskItem: '복구/중단 기준',
        status: 'PENDING_USER_ACCEPTANCE',
        meaning: '실제 승인 전 실패 시 중단 및 복구 기준을 사용자가 명시적으로 확인해야 합니다.'
      },
      {
        riskItem: '현재 Task 상태',
        status: 'READ_ONLY_INFO',
        meaning: 'Task 223은 표시 전용입니다. 이 Ledger를 봤다고 해서 위험이 수락된 것이 아닙니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 223은 실제 승인 제출 화면이 아닙니다.',
      '이 Ledger를 표시했다고 해서 위험이 수락된 것이 아닙니다.',
      '실제 위험 수락 및 승인은 사용자의 별도 명시적 지시로만 진행됩니다.',
      'Token, Naver API, 상품 조회/수정, 가격/재고 변경은 이 화면에서 발생하지 않습니다.',
      '이 화면에는 버튼, form, submit, POST API, mutation, DB write가 없습니다.'
    ],

    finalNotice: '이 패널은 실제 Naver API 연결 승인 전 사용자가 인지하고 수락해야 할 위험 요소를 read-only로 정리합니다. 표시 전용이며 실행 버튼, 승인 버튼, form submit이 없습니다.'
  };
}
