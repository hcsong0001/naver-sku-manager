export type NaverApiConnectionApprovalExplicitConsentChecklistItem = {
  label: string;
  status: 'PENDING_EXPLICIT_CONSENT' | 'LOCKED' | 'READ_ONLY_INFO';
  description: string;
};

export type NaverApiConnectionApprovalExplicitConsentChecklistView = {
  taskName: string;
  title: string;
  panelTitle: string;
  status: 'EXPLICIT_CONSENT_REQUIRED';
  description: string;

  isBatchJobResultDisplayOnly: true;
  isUserApprovalStillRequired: true;
  isExplicitConsentRequired: true;
  isConsentSubmitted: false;

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

  checklistItems: NaverApiConnectionApprovalExplicitConsentChecklistItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
};

export function buildNaverApiConnectionApprovalExplicitConsentChecklistView(
  job: any
): NaverApiConnectionApprovalExplicitConsentChecklistView {
  return {
    taskName: 'Task 221 - Naver API Connection Approval Explicit Consent Checklist Screen Flow',
    title: 'Naver API Connection Approval Explicit Consent Checklist',
    panelTitle: 'Naver API Connection Approval Explicit Consent Checklist',
    status: 'EXPLICIT_CONSENT_REQUIRED',
    description: '실제 Naver API 연결 승인 전 사용자가 명시적으로 확인해야 할 조건 체크리스트입니다. 이 화면은 표시 전용이며 승인 제출이 아닙니다.',

    isBatchJobResultDisplayOnly: true,
    isUserApprovalStillRequired: true,
    isExplicitConsentRequired: true,
    isConsentSubmitted: false,

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

    checklistItems: [
      {
        label: 'Naver API 연결 승인 조건',
        status: 'PENDING_EXPLICIT_CONSENT',
        description: '실제 Naver API 연결 승인은 별도 사용자 명시 승인 후에만 가능합니다.'
      },
      {
        label: 'Token 발급 권한 확인',
        status: 'PENDING_EXPLICIT_CONSENT',
        description: 'Token 발급 권한 범위를 사용자가 명시적으로 확인해야 합니다.'
      },
      {
        label: '상품 조회 API 호출 범위 확인',
        status: 'PENDING_EXPLICIT_CONSENT',
        description: '상품 조회 API 호출 범위를 사용자가 명시적으로 확인해야 합니다.'
      },
      {
        label: '상품 수정 API 호출 범위 확인',
        status: 'LOCKED',
        description: '상품 수정 API 호출 범위는 별도 사용자 명시 승인 전까지 잠겨 있습니다.'
      },
      {
        label: '가격 변경 가능 범위 확인',
        status: 'LOCKED',
        description: '가격 변경 가능 범위는 별도 사용자 명시 승인 전까지 잠겨 있습니다.'
      },
      {
        label: '재고 변경 가능 범위 확인',
        status: 'LOCKED',
        description: '재고 변경 가능 범위는 별도 사용자 명시 승인 전까지 잠겨 있습니다.'
      },
      {
        label: '실패 시 중단/복구 기준 확인',
        status: 'PENDING_EXPLICIT_CONSENT',
        description: '실패 시 중단 및 복구 기준을 사용자가 명시적으로 확인해야 합니다.'
      },
      {
        label: 'Worker / Queue / Adapter 실행 연결 여부 확인',
        status: 'LOCKED',
        description: 'Worker, Queue, Adapter 실행 연결 여부는 별도 사용자 명시 승인 전까지 잠겨 있습니다.'
      },
      {
        label: '운영 DB write 허용 여부 확인',
        status: 'LOCKED',
        description: '운영 DB write 허용 여부는 별도 사용자 명시 승인 전까지 잠겨 있습니다.'
      },
      {
        label: '현재 화면 성격',
        status: 'READ_ONLY_INFO',
        description: '현재 화면은 승인 제출이 아닌 체크리스트 표시 전용입니다.'
      }
    ],

    misunderstandingPreventionItems: [
      '이 화면은 승인 제출 화면이 아닙니다.',
      '이 체크리스트를 확인했다고 해서 실제 승인이 이루어진 것이 아닙니다.',
      '실제 승인은 사용자의 별도 명시적 지시로만 진행됩니다.',
      'POST API, mutation, DB write, Live 실행 경로가 존재하지 않습니다.',
      'Token 발급, Naver API 호출, 상품 조회/수정, 가격/재고 변경은 이 화면에서 발생하지 않습니다.'
    ],

    finalNotice: '이 패널은 Task 220 User Decision Gate 이후 실제 Naver API 연결 승인을 하기 전에 사용자가 명시적으로 확인해야 할 조건 체크리스트를 read-only로 표시합니다. 실행 버튼, 승인 버튼, form submit이 없으며 표시 전용입니다.'
  };
}
