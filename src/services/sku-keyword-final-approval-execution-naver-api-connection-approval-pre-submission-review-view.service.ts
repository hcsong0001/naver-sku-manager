export interface NaverApiConnectionApprovalPreSubmissionReviewItem {
  reviewKey: string;
  label: string;
  description: string;
  reviewStatus: 'NEEDS_APPROVAL' | 'FORBIDDEN_UNTIL_APPROVAL';
  sourcePacketKey: string;
}

export interface NaverApiConnectionApprovalPreSubmissionReviewView {
  taskName: string;
  panelTitle: string;
  reviewStatus: string;
  isReadOnly: boolean;
  isNaverApiConnectionApprovalPreSubmissionReview: boolean;
  isExecutionApproved: boolean;
  isReExecutionApproved: boolean;
  isConnectionApproved: boolean;
  isTokenTestApproved: boolean;
  isLiveReady: boolean;
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
  sourcePacketTask: string;
  reviewItems: NaverApiConnectionApprovalPreSubmissionReviewItem[];
  preSubmissionNotice: string;
  misunderstandingPreventionItems: string[];
  finalNotice: string;
}

export function buildNaverApiConnectionApprovalPreSubmissionReviewView(
  job: any
): NaverApiConnectionApprovalPreSubmissionReviewView {

  return {
    taskName: 'Task 217 - Naver API Connection Approval Pre-Submission Review Screen Flow',
    panelTitle: 'Naver API Connection Approval Pre-Submission Review',
    reviewStatus: 'PRE_SUBMISSION_REVIEW',
    isReadOnly: true,
    isNaverApiConnectionApprovalPreSubmissionReview: true,
    isExecutionApproved: false,
    isReExecutionApproved: false,
    isConnectionApproved: false,
    isTokenTestApproved: false,
    isLiveReady: false,
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

    sourcePacketTask: 'Task 216 - Naver API Connection Approval Request Packet',

    reviewItems: [
      {
        reviewKey: 'envAuthKeyAccess',
        label: '.env / 인증키 / Secret 접근',
        description: '.env 파일, 인증키, Secret 접근 — 별도 사용자 승인이 아직 이루어지지 않았습니다.',
        reviewStatus: 'NEEDS_APPROVAL',
        sourcePacketKey: 'envAuthKeyAccess'
      },
      {
        reviewKey: 'tokenIssuanceTest',
        label: 'Token 발급 테스트',
        description: 'Naver API Token 발급 테스트 — 별도 사용자 승인이 아직 이루어지지 않았습니다.',
        reviewStatus: 'NEEDS_APPROVAL',
        sourcePacketKey: 'tokenIssuanceTest'
      },
      {
        reviewKey: 'naverApiConnectionTest',
        label: 'Naver API 연결 테스트',
        description: 'Naver API 실제 연결 테스트 — 별도 사용자 승인이 아직 이루어지지 않았습니다.',
        reviewStatus: 'NEEDS_APPROVAL',
        sourcePacketKey: 'naverApiConnectionTest'
      },
      {
        reviewKey: 'productLookupTest',
        label: '상품 조회 API 1건 테스트',
        description: '상품 조회 API 1건 테스트 — 별도 사용자 승인이 아직 이루어지지 않았습니다.',
        reviewStatus: 'NEEDS_APPROVAL',
        sourcePacketKey: 'productLookupTest'
      },
      {
        reviewKey: 'productUpdateApi',
        label: '상품 수정 API',
        description: '상품 수정 API — 별도 승인 전까지 금지 상태이며 이 검토에서도 변경되지 않습니다.',
        reviewStatus: 'FORBIDDEN_UNTIL_APPROVAL',
        sourcePacketKey: 'productUpdateApi'
      },
      {
        reviewKey: 'priceStockChange',
        label: '가격/재고 변경',
        description: '가격 및 재고 변경 — 별도 승인 전까지 금지 상태이며 이 검토에서도 변경되지 않습니다.',
        reviewStatus: 'FORBIDDEN_UNTIL_APPROVAL',
        sourcePacketKey: 'priceStockChange'
      }
    ],

    preSubmissionNotice: '이 화면은 승인 제출 화면이 아닙니다. Task 216 승인 요청 패킷의 6개 항목을 실제 사용자 승인 전에 Read-Only로 검토합니다.',

    misunderstandingPreventionItems: [
      '이 화면은 승인 제출 화면이 아닙니다.',
      '이 화면은 실제 승인이 아닙니다.',
      '이 화면에서 Token 발급, .env 접근, Naver API 호출은 발생하지 않습니다.',
      '버튼, form, submit, POST API가 존재하지 않습니다.',
      '상품 수정 API 및 가격/재고 변경은 이 검토에서도 여전히 금지 상태입니다.',
      '실제 승인은 반드시 사용자의 별도 명시적 지시로만 이루어집니다.'
    ],

    finalNotice: '이 패널은 Task 216 승인 요청 패킷을 실제 사용자 승인 전에 한 번 더 Read-Only로 검토합니다. 이 검토 자체가 승인을 의미하지 않습니다.'
  };
}
