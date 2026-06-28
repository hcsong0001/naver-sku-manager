export interface NaverApiConnectionApprovalRequestItem {
  requestKey: string;
  label: string;
  description: string;
  approvalRequired: boolean;
  currentStatus: 'PENDING_APPROVAL' | 'FORBIDDEN_UNTIL_APPROVAL';
}

export interface NaverApiConnectionApprovalRequestPacketView {
  taskName: string;
  panelTitle: string;
  packetStatus: string;
  isReadOnly: boolean;
  isNaverApiConnectionApprovalRequestPacket: boolean;
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
  approvalRequestItems: NaverApiConnectionApprovalRequestItem[];
  packetNotice: string;
  misunderstandingPreventionItems: string[];
  finalNotice: string;
}

export function buildNaverApiConnectionApprovalRequestPacketView(
  job: any
): NaverApiConnectionApprovalRequestPacketView {

  return {
    taskName: 'Task 216 - Naver API Connection Approval Request Packet Screen Flow',
    panelTitle: 'Naver API Connection Approval Request Packet',
    packetStatus: 'APPROVAL_REQUEST_PENDING',
    isReadOnly: true,
    isNaverApiConnectionApprovalRequestPacket: true,
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

    approvalRequestItems: [
      {
        requestKey: 'envAuthKeyAccess',
        label: '.env / 인증키 / Secret 접근',
        description: 'Naver API 연결을 위해 .env 파일, 인증키, Secret 접근에 대한 별도 사용자 승인이 필요합니다.',
        approvalRequired: true,
        currentStatus: 'PENDING_APPROVAL'
      },
      {
        requestKey: 'tokenIssuanceTest',
        label: 'Token 발급 테스트',
        description: 'Naver API Token 발급 테스트를 위한 별도 사용자 승인이 필요합니다.',
        approvalRequired: true,
        currentStatus: 'PENDING_APPROVAL'
      },
      {
        requestKey: 'naverApiConnectionTest',
        label: 'Naver API 연결 테스트',
        description: 'Naver API 실제 연결 테스트를 위한 별도 사용자 승인이 필요합니다.',
        approvalRequired: true,
        currentStatus: 'PENDING_APPROVAL'
      },
      {
        requestKey: 'productLookupTest',
        label: '상품 조회 API 1건 테스트',
        description: '상품 조회 API 1건 테스트를 위한 별도 사용자 승인이 필요합니다.',
        approvalRequired: true,
        currentStatus: 'PENDING_APPROVAL'
      },
      {
        requestKey: 'productUpdateApi',
        label: '상품 수정 API',
        description: '상품 수정 API는 별도 승인 전까지 금지 상태입니다.',
        approvalRequired: true,
        currentStatus: 'FORBIDDEN_UNTIL_APPROVAL'
      },
      {
        requestKey: 'priceStockChange',
        label: '가격/재고 변경',
        description: '가격 및 재고 변경은 별도 승인 전까지 금지 상태입니다.',
        approvalRequired: true,
        currentStatus: 'FORBIDDEN_UNTIL_APPROVAL'
      }
    ],

    packetNotice: '이 패킷은 승인 요청서일 뿐 실제 승인이 아닙니다. 위 항목들을 실제로 진행하려면 사용자의 별도 승인 지시가 필요합니다.',

    misunderstandingPreventionItems: [
      '이 패킷은 승인 요청서이며 실제 승인이 아닙니다.',
      '이 화면에서 Token 발급, .env 접근, Naver API 호출은 발생하지 않습니다.',
      '버튼, form, submit, POST API가 존재하지 않습니다.',
      '상품 수정 API 및 가격/재고 변경은 별도 승인 전까지 금지 상태입니다.',
      '실제 연결을 시작하려면 반드시 사용자의 명시적 승인 지시가 필요합니다.'
    ],

    finalNotice: '이 패널은 Naver API 실제 연결을 시작하기 전, 사용자에게 별도 승인이 필요한 항목을 Read-Only 승인 요청 패킷으로 정리합니다. 실제 승인 없이는 어떠한 연결도 발생하지 않습니다.'
  };
}
