export interface NaverApiConnectionApprovalSubmissionLockSealItem {
  lockKey: string;
  label: string;
  description: string;
  lockStatus: 'LOCKED' | 'PENDING_USER_APPROVAL';
}

export interface NaverApiConnectionApprovalSubmissionLockSealView {
  taskName: string;
  panelTitle: string;
  sealStatus: string;
  isReadOnly: boolean;
  isNaverApiConnectionApprovalSubmissionLockSeal: boolean;
  isApprovalSubmission: boolean;
  isApprovalSubmitted: boolean;
  isPostApiConnected: boolean;
  isTokenIssued: boolean;
  isNaverApiCalled: boolean;
  isProductLookupApiCalled: boolean;
  isProductUpdateApiCalled: boolean;
  isPriceOrStockChanged: boolean;
  isLiveExecutionEnabled: boolean;
  isBatchJobResultDisplayOnly: boolean;
  hasExecutionButton: boolean;
  hasSubmitAction: boolean;
  hasWorkerTrigger: boolean;
  hasQueueTrigger: boolean;
  hasAdapterTrigger: boolean;
  hasTokenRequestPath: boolean;
  hasNaverApiCallPath: boolean;
  hasOperatingDbWritePath: boolean;
  hasPriceChangePath: boolean;
  hasStockChangePath: boolean;
  hasEnvFileAccess: boolean;
  hasAuthKeyAccess: boolean;
  hasProductLookupApiPath: boolean;
  hasProductUpdateApiPath: boolean;
  task216PacketStatus: string;
  task217ReviewStatus: string;
  lockSealItems: NaverApiConnectionApprovalSubmissionLockSealItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
}

export function buildNaverApiConnectionApprovalSubmissionLockSealView(
  job: any
): NaverApiConnectionApprovalSubmissionLockSealView {

  return {
    taskName: 'Task 218 - Naver API Connection Approval Submission Lock Seal Screen Flow',
    panelTitle: 'Naver API Connection Approval Submission Lock Seal',
    sealStatus: 'SUBMISSION_LOCKED',
    isReadOnly: true,
    isNaverApiConnectionApprovalSubmissionLockSeal: true,
    isApprovalSubmission: false,
    isApprovalSubmitted: false,
    isPostApiConnected: false,
    isTokenIssued: false,
    isNaverApiCalled: false,
    isProductLookupApiCalled: false,
    isProductUpdateApiCalled: false,
    isPriceOrStockChanged: false,
    isLiveExecutionEnabled: false,
    isBatchJobResultDisplayOnly: true,
    hasExecutionButton: false,
    hasSubmitAction: false,
    hasWorkerTrigger: false,
    hasQueueTrigger: false,
    hasAdapterTrigger: false,
    hasTokenRequestPath: false,
    hasNaverApiCallPath: false,
    hasOperatingDbWritePath: false,
    hasPriceChangePath: false,
    hasStockChangePath: false,
    hasEnvFileAccess: false,
    hasAuthKeyAccess: false,
    hasProductLookupApiPath: false,
    hasProductUpdateApiPath: false,

    task216PacketStatus: 'PENDING_APPROVAL — Task 216 승인 요청 패킷은 아직 실제 승인 제출이 이루어지지 않은 상태입니다.',
    task217ReviewStatus: 'PRE_SUBMISSION_REVIEW — Task 217 Pre-Submission Review는 검토 전용이며 승인 제출이 아닙니다.',

    lockSealItems: [
      {
        lockKey: 'approvalSubmission',
        label: '실제 승인 제출',
        description: '이 화면은 실제 승인 제출 화면이 아닙니다. 승인 제출은 별도 사용자 명시 승인 없이는 불가능합니다.',
        lockStatus: 'PENDING_USER_APPROVAL'
      },
      {
        lockKey: 'envAuthKeyAccess',
        label: '.env / 인증키 / Token 접근',
        description: '.env 파일, 인증키, Token 접근은 여전히 금지 상태입니다.',
        lockStatus: 'LOCKED'
      },
      {
        lockKey: 'naverApiCall',
        label: 'Naver API 호출',
        description: '실제 Naver API 호출은 여전히 금지 상태입니다.',
        lockStatus: 'LOCKED'
      },
      {
        lockKey: 'productLookupApi',
        label: '상품 조회 API 호출',
        description: '상품 조회 API 호출은 여전히 금지 상태입니다.',
        lockStatus: 'LOCKED'
      },
      {
        lockKey: 'productUpdateApi',
        label: '상품 수정 API 호출',
        description: '상품 수정 API 호출은 여전히 금지 상태입니다.',
        lockStatus: 'LOCKED'
      },
      {
        lockKey: 'priceStockChange',
        label: '가격/재고 변경',
        description: '가격 및 재고 변경은 여전히 금지 상태입니다.',
        lockStatus: 'LOCKED'
      },
      {
        lockKey: 'liveExecution',
        label: 'Live 실행',
        description: 'Live 실행 버튼 또는 자동 실행 흐름 연결은 여전히 금지 상태입니다.',
        lockStatus: 'LOCKED'
      }
    ],

    misunderstandingPreventionItems: [
      '이 화면은 실제 승인 제출 화면이 아닙니다.',
      '이 화면은 Task 216~217 흐름이 승인 제출이 아님을 고정하는 안전 잠금 단계입니다.',
      'Task 216 승인 요청 패킷은 아직 PENDING_APPROVAL 상태이며 제출되지 않았습니다.',
      'Task 217 Pre-Submission Review는 검토 전용이며 승인 제출이 아닙니다.',
      '실제 승인 제출은 별도 사용자 명시 승인과 별도 구현 없이는 불가능합니다.',
      '.env, 인증키, Token, Naver API, 상품 조회/수정 API, 가격/재고 변경은 여전히 금지 상태입니다.'
    ],

    finalNotice: '이 패널은 Task 216 승인 요청 패킷과 Task 217 Pre-Submission Review가 아직 실제 승인 제출이 아님을 Read-Only로 고정(Submission Lock Seal)합니다. 실제 승인은 반드시 사용자의 별도 명시적 지시로만 이루어집니다.'
  };
}
