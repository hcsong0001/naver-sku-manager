import {
  type TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus,
  type TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView,
} from './tms-fast-connection-naver-api-env-existence-no-secret-preflight-view.service';

export type TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_PARTIAL_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketGroup =
  | 'LIVE_TEST_APPROVAL_PACKET_READINESS'
  | 'TASK_406_NO_SECRET_PREFLIGHT_REFERENCE'
  | 'ONE_TIME_PRODUCT_LOOKUP_PURPOSE'
  | 'ONE_TIME_PRODUCT_LOOKUP_TARGET_SCOPE'
  | 'LIVE_TEST_APPROVAL_PHRASE_GUIDANCE'
  | 'LIVE_TEST_STILL_FORBIDDEN_ACTIONS'
  | 'NO_ENV_SECRET_TOKEN_API_CALL_GUARD'
  | 'NEXT_FINAL_SAFETY_GATE_ROADMAP';

export interface TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem {
  liveTestApprovalPacketItemId: string;
  group: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView {
  taskId: 407;
  taskName: string;
  sourceFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus;
  fastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus;

  recommendedLiveTestApprovalPacketDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_READY';
  recommendedLiveTestApprovalPacketDecisionLabel: 'Naver API 상품 조회 1회 Live Test 승인 Packet - read-only 승인 요청 전용';
  recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  recommendedMaxLookupCallCount: 1;
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_LIVE_TEST';
  recommendedExecutionMode: 'READ_ONLY_NO_ENV_READ_NO_API_CALL';
  recommendedDeploymentMode: 'LIVE_TEST_APPROVAL_PACKET_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL_AND_FINAL_GATE';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;

  liveTestType: 'NAVER_PRODUCT_LOOKUP_ONE_TIME';
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  targetProductNo: '6597910207';
  targetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  maxLookupCallCount: 1;
  productUpdateAllowed: false;
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  dbWriteAllowed: false;
  rawResponseStorageAllowed: false;

  liveTestApprovalPacketGuidance: string;
  liveTestScopeNotice: string;
  userApprovalPhraseGuidance: string;
  userApprovalPhraseExample: string;

  liveTestApprovalPacketReadinessItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  task406NoSecretPreflightReferenceItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  oneTimeProductLookupPurposeItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  oneTimeProductLookupTargetScopeItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  liveTestApprovalPhraseGuidanceItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  liveTestStillForbiddenActionsItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  noEnvSecretTokenApiCallGuardItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  nextFinalSafetyGateRoadmapItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];

  liveTestApprovalPacketItems: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem[];
  liveTestApprovalPacketSummaryCards: { label: string; value: number }[];
  liveTestApprovalPacketGroupCount: number;
  totalLiveTestApprovalPacketItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketRoadmapItem[];

  liveTestApprovalPacketPrepared: true;
  actualLiveTestApprovalAccepted: false;
  actualLiveTestExecuted: false;

  actualNaverApiCall: false;
  actualProductLookupApiCall: false;
  actualProductUpdateApiCall: false;
  actualTokenIssue: false;
  actualTokenReissue: false;
  actualTokenUse: false;
  actualEnvRead: false;
  actualEnvWrite: false;
  actualEnvFileOpen: false;
  actualEnvExistenceChecked: false;
  actualProcessEnvRead: false;
  actualSecretAccess: false;
  actualSecretExposure: false;
  actualAuthorizationHeaderExposure: false;
  actualSignatureExposure: false;
  actualRawApiResponseExposure: false;
  actualRawApiResponseStored: false;
  actualDbWrite: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualAdapterConnection: false;
  actualRuntimeConfiguration: false;
  actualPostApiAdded: false;
  actualSubmitActionAdded: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualApprovalAccepted: false;
  actualProductLookupExecuted: false;
  actualProductUpdateExecuted: false;
  actualOperatingTransition: false;
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus,
  TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus
> = {
  TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_READY',
  TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_PARTIAL_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_PARTIAL_READY',
  TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_NOT_STARTED',
};

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketRoadmapItem[] =
  [
    { taskId: 407, label: 'Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet' },
    { taskId: 408, label: 'Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate' },
    { taskId: 409, label: 'Task 409 - Naver API 상품 조회 1회 실제 호출' },
    { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
    { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
  ];

function makeItem(
  group: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketItem {
  return {
    liveTestApprovalPacketItemId: `live-test-approval-packet-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView(
  envExistenceNoSecretPreflightView: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView
): TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView {
  const sourceStatus =
    envExistenceNoSecretPreflightView.fastConnectionNaverApiEnvExistenceNoSecretPreflightStatus;
  const fastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus = STATUS_MAP[sourceStatus];

  const liveTestApprovalPacketReadinessItems = [
    makeItem(
      'LIVE_TEST_APPROVAL_PACKET_READINESS',
      'Live Test 승인 Packet 준비도',
      'Live Test 승인 Packet이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task406NoSecretPreflightReferenceItems = [
    makeItem(
      'TASK_406_NO_SECRET_PREFLIGHT_REFERENCE',
      'Task 406 No-Secret Preflight 참조',
      'Task 406 No-Secret Preflight 결과를 read-only로 참조합니다.'
    ),
  ];
  const oneTimeProductLookupPurposeItems = [
    makeItem(
      'ONE_TIME_PRODUCT_LOOKUP_PURPOSE',
      '상품 조회 1회 테스트 목적',
      '상품 조회 API 1회 테스트 목적을 표시합니다.'
    ),
  ];
  const oneTimeProductLookupTargetScopeItems = [
    makeItem(
      'ONE_TIME_PRODUCT_LOOKUP_TARGET_SCOPE',
      '상품 조회 1회 대상 범위',
      '대상 상품 후보 6597910207, 조회 1회, 수정 없음, 가격/재고 변경 없음을 표시합니다.'
    ),
  ];
  const liveTestApprovalPhraseGuidanceItems = [
    makeItem(
      'LIVE_TEST_APPROVAL_PHRASE_GUIDANCE',
      'Live Test 승인 문구 안내',
      '다음 단계에서 필요한 별도 승인 문구를 read-only 안내로 표시합니다.'
    ),
  ];
  const liveTestStillForbiddenActionsItems = [
    makeItem(
      'LIVE_TEST_STILL_FORBIDDEN_ACTIONS',
      'Live Test 여전히 금지되는 작업',
      '이번 화면에서 여전히 금지되는 작업 목록을 표시합니다.'
    ),
  ];
  const noEnvSecretTokenApiCallGuardItems = [
    makeItem(
      'NO_ENV_SECRET_TOKEN_API_CALL_GUARD',
      'env/secret/token/API 호출 없음',
      'env/secret/token/API 호출이 아직 없다는 점을 표시합니다.'
    ),
  ];
  const nextFinalSafetyGateRoadmapItems = [
    makeItem(
      'NEXT_FINAL_SAFETY_GATE_ROADMAP',
      '다음 Final Safety Gate 로드맵',
      'Task 408 Final Safety Gate와 Task 409 실제 호출 방향을 표시합니다.'
    ),
  ];

  const liveTestApprovalPacketItems = [
    ...liveTestApprovalPacketReadinessItems,
    ...task406NoSecretPreflightReferenceItems,
    ...oneTimeProductLookupPurposeItems,
    ...oneTimeProductLookupTargetScopeItems,
    ...liveTestApprovalPhraseGuidanceItems,
    ...liveTestStillForbiddenActionsItems,
    ...noEnvSecretTokenApiCallGuardItems,
    ...nextFinalSafetyGateRoadmapItems,
  ];

  return {
    taskId: 407,
    taskName: 'TMS Fast Connection Naver Product Lookup One Time Live Test Approval Packet',
    sourceFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus: sourceStatus,
    fastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus,

    recommendedLiveTestApprovalPacketDecision:
      'NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_READY',
    recommendedLiveTestApprovalPacketDecisionLabel:
      'Naver API 상품 조회 1회 Live Test 승인 Packet - read-only 승인 요청 전용',
    recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    recommendedMaxLookupCallCount: 1,
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_LIVE_TEST',
    recommendedExecutionMode: 'READ_ONLY_NO_ENV_READ_NO_API_CALL',
    recommendedDeploymentMode: 'LIVE_TEST_APPROVAL_PACKET_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL_AND_FINAL_GATE',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,

    liveTestType: 'NAVER_PRODUCT_LOOKUP_ONE_TIME',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    targetProductNo: '6597910207',
    targetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    maxLookupCallCount: 1,
    productUpdateAllowed: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    dbWriteAllowed: false,
    rawResponseStorageAllowed: false,

    liveTestApprovalPacketGuidance:
      '이번 화면은 Naver API 상품 조회 1회 Live Test 승인 Packet입니다. Task 406 No-Secret Preflight를 참조하며, 아직 env/secret 접근은 하지 않았고, 아직 token 사용은 하지 않았고, 아직 실제 Naver API 호출은 하지 않았습니다. Live Test 목표는 상품 조회 API 1회 성공이며, 조회 대상 후보는 대표 검증 상품 6597910207입니다. 상품 수정 API, 가격 변경, 재고 변경은 범위 밖입니다. 실제 API 호출 전에는 별도 사용자 승인이 필요하며, 이번 화면은 승인 Packet일 뿐 실제 승인 수락이 아닙니다.',
    liveTestScopeNotice:
      '이번 Live Test 승인 Packet은 상품 조회 API 1회 후보를 정리하는 read-only 화면입니다. 실제 호출은 아직 수행하지 않습니다.',
    userApprovalPhraseGuidance:
      '이번 화면은 Live Test 승인 Packet입니다. 이번 화면은 실제 승인 수락이 아닙니다. 이번 화면에는 승인 입력창이 없고, 승인 버튼이 없고, submit action이 없고, POST API가 없습니다. 실제 env/secret 접근과 API 호출은 이후 별도 승인 및 Final Safety Gate 이후에만 가능합니다.',
    userApprovalPhraseExample: 'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.',

    liveTestApprovalPacketReadinessItems,
    task406NoSecretPreflightReferenceItems,
    oneTimeProductLookupPurposeItems,
    oneTimeProductLookupTargetScopeItems,
    liveTestApprovalPhraseGuidanceItems,
    liveTestStillForbiddenActionsItems,
    noEnvSecretTokenApiCallGuardItems,
    nextFinalSafetyGateRoadmapItems,

    liveTestApprovalPacketItems,
    liveTestApprovalPacketSummaryCards: [
      { label: 'Live Test Approval Packet 그룹', value: 8 },
      { label: '최대 조회 호출 수', value: 1 },
      { label: 'Total', value: liveTestApprovalPacketItems.length },
    ],
    liveTestApprovalPacketGroupCount: 8,
    totalLiveTestApprovalPacketItemCount: liveTestApprovalPacketItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,

    liveTestApprovalPacketPrepared: true,
    actualLiveTestApprovalAccepted: false,
    actualLiveTestExecuted: false,

    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenIssue: false,
    actualTokenReissue: false,
    actualTokenUse: false,
    actualEnvRead: false,
    actualEnvWrite: false,
    actualEnvFileOpen: false,
    actualEnvExistenceChecked: false,
    actualProcessEnvRead: false,
    actualSecretAccess: false,
    actualSecretExposure: false,
    actualAuthorizationHeaderExposure: false,
    actualSignatureExposure: false,
    actualRawApiResponseExposure: false,
    actualRawApiResponseStored: false,
    actualDbWrite: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualAdapterConnection: false,
    actualRuntimeConfiguration: false,
    actualPostApiAdded: false,
    actualSubmitActionAdded: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualApprovalAccepted: false,
    actualProductLookupExecuted: false,
    actualProductUpdateExecuted: false,
    actualOperatingTransition: false,
  };
}
