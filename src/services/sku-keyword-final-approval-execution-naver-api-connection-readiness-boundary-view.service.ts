export interface NaverApiConnectionReadinessBoundaryItem {
  checkKey: string;
  label: string;
  description: string;
  isAllowed: boolean;
  requiresUserApproval: boolean;
  boundaryStatus: 'ALLOWED' | 'FORBIDDEN' | 'REQUIRES_APPROVAL';
}

export interface NaverApiConnectionReadinessBoundaryView {
  taskName: string;
  panelTitle: string;
  boundaryStatus: string;
  isReadOnly: boolean;
  isNaverApiConnectionReadyOnlyBoundary: boolean;
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
  boundaryItems: NaverApiConnectionReadinessBoundaryItem[];
  misunderstandingPreventionItems: string[];
  finalNotice: string;
}

export function buildNaverApiConnectionReadinessBoundaryView(
  job: any
): NaverApiConnectionReadinessBoundaryView {

  return {
    taskName: 'Task 215 - Naver API Connection Readiness Boundary Screen Flow',
    panelTitle: 'Naver API Connection Readiness Boundary',
    boundaryStatus: 'BOUNDARY_CONFIRMED',
    isReadOnly: true,
    isNaverApiConnectionReadyOnlyBoundary: true,
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

    boundaryItems: [
      {
        checkKey: 'readinessConfirmation',
        label: '준비 상태 확인',
        description: '현재 가능한 것은 Naver API 연결 준비 상태 확인뿐입니다.',
        isAllowed: true,
        requiresUserApproval: false,
        boundaryStatus: 'ALLOWED'
      },
      {
        checkKey: 'tokenIssuance',
        label: 'Token 발급',
        description: 'Token 발급은 아직 금지 상태입니다. 별도 사용자 승인이 필요합니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      },
      {
        checkKey: 'envFileAccess',
        label: '.env / 인증키 / Secret 접근',
        description: '.env 파일, 인증키, Secret 접근은 아직 금지 상태입니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      },
      {
        checkKey: 'productLookupApi',
        label: '상품 조회 API 호출',
        description: '상품 조회 API 호출은 아직 금지 상태입니다. 별도 사용자 승인이 필요합니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      },
      {
        checkKey: 'productUpdateApi',
        label: '상품 수정 API 호출',
        description: '상품 수정 API 호출은 아직 금지 상태입니다. 별도 사용자 승인이 필요합니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      },
      {
        checkKey: 'priceStockChange',
        label: '가격/재고 변경',
        description: '가격 및 재고 변경은 아직 금지 상태입니다. 별도 사용자 승인이 필요합니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      },
      {
        checkKey: 'naverApiCall',
        label: '실제 Naver API 호출',
        description: '실제 Naver API 호출은 아직 금지 상태입니다. 별도 사용자 승인이 필요합니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      },
      {
        checkKey: 'connectionApproval',
        label: '실제 연결 시작',
        description: '실제 연결을 시작하려면 별도 사용자 승인이 필요합니다.',
        isAllowed: false,
        requiresUserApproval: true,
        boundaryStatus: 'REQUIRES_APPROVAL'
      }
    ],

    misunderstandingPreventionItems: [
      '이 패널은 Naver API 실제 연결 작업이 아닙니다.',
      'Token 발급, .env 접근, Naver API 호출은 이 패널에서 발생하지 않습니다.',
      '준비 상태 확인은 연결 승인이 아닙니다.',
      '실제 연결을 시작하려면 반드시 별도의 사용자 승인 지시가 필요합니다.',
      '이 패널은 Read-Only 경계 상태를 표시할 뿐 새로운 실행 권한을 부여하지 않습니다.'
    ],

    finalNotice: '이 패널은 Naver API 실제 연결 단계로 넘어가기 전, 현재 금지선 안에서 준비 가능한 항목과 사용자 승인이 필요한 항목을 Read-Only로 정리합니다. 실제 연결은 별도 사용자 승인 후에만 시작됩니다.'
  };
}
