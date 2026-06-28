export type NaverApiConnectionApprovalScopeBoundaryMatrixItem = {
  scope: string;
  status: 'READ_ONLY_CONFIRMED' | 'PENDING_USER_CONSENT' | 'LOCKED';
  meaning: string;
};

export type NaverApiConnectionApprovalScopeBoundaryMatrixView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'SCOPE_BOUNDARY_MATRIX_READY';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isUserApprovalStillRequired: true;
  isScopeBoundaryMatrixReady: true;
  isActualApprovalGranted: false;

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

  matrixItems: NaverApiConnectionApprovalScopeBoundaryMatrixItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalScopeBoundaryMatrixView(
  job: any
): NaverApiConnectionApprovalScopeBoundaryMatrixView {
  return {
    taskName: 'Task 222 - Naver API Connection Approval Scope Boundary Matrix Screen Flow',
    title: 'Naver API Connection Approval Scope Boundary Matrix',
    panelTitle: 'Naver API Connection Approval Scope Boundary Matrix',
    status: 'SCOPE_BOUNDARY_MATRIX_READY',
    description: '실제 Naver API 연결 승인 시 어떤 권한 범위가 열릴 수 있고 어떤 범위는 계속 금지되어야 하는지를 read-only Matrix로 정리합니다. 이 화면은 표시 전용이며 승인 제출이 아닙니다.',

    isBatchJobResultDisplayOnly: true,
    isUserApprovalStillRequired: true,
    isScopeBoundaryMatrixReady: true,
    isActualApprovalGranted: false,

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

    matrixItems: [
      {
        scope: '승인 준비 화면 (Task 215~221)',
        status: 'READ_ONLY_CONFIRMED',
        meaning: '지금까지의 Task 215~221은 모두 표시 전용이었습니다. 실제 승인 권한이 열리지 않았습니다.'
      },
      {
        scope: '사용자 명시 승인',
        status: 'PENDING_USER_CONSENT',
        meaning: '아직 실제 승인이 이루어지지 않았습니다. 사용자 명시 승인이 필요합니다.'
      },
      {
        scope: 'Token 발급',
        status: 'LOCKED',
        meaning: '아직 허용되지 않습니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        scope: '상품 조회 API',
        status: 'LOCKED',
        meaning: '아직 호출 불가합니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        scope: '상품 수정 API',
        status: 'LOCKED',
        meaning: '아직 호출 불가합니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        scope: '가격 변경',
        status: 'LOCKED',
        meaning: '아직 변경 불가합니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        scope: '재고 변경',
        status: 'LOCKED',
        meaning: '아직 변경 불가합니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        scope: 'Worker 실행',
        status: 'LOCKED',
        meaning: '아직 실행 경로가 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        scope: 'Queue enqueue',
        status: 'LOCKED',
        meaning: '아직 연결이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        scope: 'Adapter 연결',
        status: 'LOCKED',
        meaning: '아직 연결이 없습니다. 사용자 명시 승인 없이는 연결 불가합니다.'
      },
      {
        scope: '운영 DB write',
        status: 'LOCKED',
        meaning: '아직 금지 상태입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      },
      {
        scope: '실제 Live 실행',
        status: 'LOCKED',
        meaning: '아직 금지 상태입니다. 사용자 명시 승인 없이는 진행 불가합니다.'
      }
    ],

    misunderstandingPreventionItems: [
      'Task 222는 실제 승인 제출 화면이 아닙니다.',
      '이 Matrix를 표시했다고 해서 실제 승인 권한이 열린 것이 아닙니다.',
      '실제 승인은 사용자의 별도 명시적 지시로만 진행됩니다.',
      'Task 215~221은 모두 read-only 표시 흐름이었으며 실제 실행 권한을 열지 않았습니다.',
      '이 화면에는 버튼, form, submit, POST API, mutation, DB write가 없습니다.'
    ],

    finalNotice: '이 패널은 실제 Naver API 연결 승인 시 어떤 범위가 열릴 수 있고 어떤 범위는 계속 금지되어야 하는지를 사용자가 오해하지 않도록 read-only로 정리합니다. 표시 전용이며 실행 버튼, 승인 버튼, form submit이 없습니다.'
  };
}
