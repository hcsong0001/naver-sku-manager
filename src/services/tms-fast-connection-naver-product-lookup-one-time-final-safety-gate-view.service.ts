import {
  type TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus,
  type TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView,
} from './tms-fast-connection-naver-product-lookup-one-time-live-test-approval-packet-view.service';

export type TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_PARTIAL_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateGroup =
  | 'FINAL_SAFETY_GATE_READINESS'
  | 'TASK_407_LIVE_TEST_APPROVAL_PACKET_REFERENCE'
  | 'ONE_TIME_LOOKUP_EXECUTION_SCOPE_GATE'
  | 'ENV_SECRET_TOKEN_ACCESS_STILL_LOCKED_GATE'
  | 'API_CALL_STILL_LOCKED_GATE'
  | 'RESPONSE_HANDLING_AND_STORAGE_GATE'
  | 'PRODUCT_UPDATE_PRICE_STOCK_DB_WRITE_BLOCK_GATE'
  | 'TASK_409_EXPLICIT_APPROVAL_REQUIRED_GATE';

export interface TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem {
  finalSafetyGateItemId: string;
  group: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView {
  taskId: 408;
  taskName: string;
  sourceFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus;
  fastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus;

  recommendedFinalSafetyGateDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_READY';
  recommendedFinalSafetyGateDecisionLabel: 'Naver API 상품 조회 1회 실행 전 Final Safety Gate - read-only 최종 점검';
  recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  recommendedMaxLookupCallCount: 1;
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL';
  recommendedTask409RequiredApprovalPhrase: 'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.';
  recommendedApprovalMode: 'EXPLICIT_SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ACTUAL_CALL';
  recommendedExecutionMode: 'READ_ONLY_FINAL_GATE_NO_ENV_READ_NO_API_CALL';
  recommendedDeploymentMode: 'FINAL_SAFETY_GATE_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_TASK_409_EXPLICIT_APPROVAL';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;

  liveTestType: 'NAVER_PRODUCT_LOOKUP_ONE_TIME';
  targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  targetProductNo: '6597910207';
  targetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  maxLookupCallCount: 1;
  finalGatePassedForReadOnlyPlanning: true;
  actualExecutionUnlocked: false;
  actualApprovalAccepted: false;
  actualEnvAccessUnlocked: false;
  actualSecretAccessUnlocked: false;
  actualTokenUseUnlocked: false;
  actualApiCallUnlocked: false;
  productUpdateAllowed: false;
  priceChangeAllowed: false;
  stockChangeAllowed: false;
  dbWriteAllowed: false;
  rawResponseDisplayAllowed: false;
  rawResponseStorageAllowed: false;
  maskedSummaryOnlyAfterExecution: true;

  finalSafetyGateGuidance: string;
  finalSafetyGateScopeNotice: string;
  userApprovalPhraseGuidance: string;
  userApprovalPhraseExample: string;

  finalSafetyGateReadinessItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  task407LiveTestApprovalPacketReferenceItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  oneTimeLookupExecutionScopeGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  envSecretTokenAccessStillLockedGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  apiCallStillLockedGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  responseHandlingAndStorageGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  productUpdatePriceStockDbWriteBlockGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  task409ExplicitApprovalRequiredGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];

  finalSafetyGateItems: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem[];
  finalSafetyGateSummaryCards: { label: string; value: number }[];
  finalSafetyGateGroupCount: number;
  totalFinalSafetyGateItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateRoadmapItem[];

  finalSafetyGatePrepared: true;
  actualFinalSafetyGateSubmitted: false;
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
  actualProductLookupExecuted: false;
  actualProductUpdateExecuted: false;
  actualOperatingTransition: false;
}

const STATUS_MAP: Record<
  TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus,
  TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_PARTIAL_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_PARTIAL_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_NOT_STARTED',
};

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateRoadmapItem[] = [
  { taskId: 408, label: 'Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate' },
  { taskId: 409, label: 'Task 409 - Naver API 상품 조회 1회 실제 호출' },
  { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
  { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
];

function makeItem(
  group: TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateItem {
  return {
    finalSafetyGateItemId: `final-safety-gate-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView(
  liveTestApprovalPacketView: TmsFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketView
): TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView {
  const sourceStatus =
    liveTestApprovalPacketView.fastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus;
  const fastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus = STATUS_MAP[sourceStatus];

  const finalSafetyGateReadinessItems = [
    makeItem(
      'FINAL_SAFETY_GATE_READINESS',
      'Final Safety Gate 준비도',
      'Final Safety Gate가 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task407LiveTestApprovalPacketReferenceItems = [
    makeItem(
      'TASK_407_LIVE_TEST_APPROVAL_PACKET_REFERENCE',
      'Task 407 Live Test 승인 Packet 참조',
      'Task 407 Live Test 승인 Packet 결과를 read-only로 참조합니다.'
    ),
  ];
  const oneTimeLookupExecutionScopeGateItems = [
    makeItem(
      'ONE_TIME_LOOKUP_EXECUTION_SCOPE_GATE',
      '상품 조회 1회 실행 범위 게이트',
      '상품 조회 1회, 대상 상품 6597910207, 최대 호출 수 1회 조건을 표시합니다.'
    ),
  ];
  const envSecretTokenAccessStillLockedGateItems = [
    makeItem(
      'ENV_SECRET_TOKEN_ACCESS_STILL_LOCKED_GATE',
      'env/secret/token 접근 잠금 유지 게이트',
      'env/secret/token 접근이 아직 잠겨 있음을 표시합니다.'
    ),
  ];
  const apiCallStillLockedGateItems = [
    makeItem(
      'API_CALL_STILL_LOCKED_GATE',
      'API 호출 잠금 유지 게이트',
      '실제 API 호출이 아직 잠겨 있음을 표시합니다.'
    ),
  ];
  const responseHandlingAndStorageGateItems = [
    makeItem(
      'RESPONSE_HANDLING_AND_STORAGE_GATE',
      '응답 처리/저장 게이트',
      'raw response 표시/저장 금지, 결과 증적은 마스킹/요약 중심이어야 함을 표시합니다.'
    ),
  ];
  const productUpdatePriceStockDbWriteBlockGateItems = [
    makeItem(
      'PRODUCT_UPDATE_PRICE_STOCK_DB_WRITE_BLOCK_GATE',
      '상품 수정/가격/재고/DB write 차단 게이트',
      '상품 수정, 가격 변경, 재고 변경, DB write 금지를 표시합니다.'
    ),
  ];
  const task409ExplicitApprovalRequiredGateItems = [
    makeItem(
      'TASK_409_EXPLICIT_APPROVAL_REQUIRED_GATE',
      'Task 409 명시 승인 필요 게이트',
      'Task 409에서 실제 호출 전 별도 사용자 승인이 필요함을 표시합니다.'
    ),
  ];

  const finalSafetyGateItems = [
    ...finalSafetyGateReadinessItems,
    ...task407LiveTestApprovalPacketReferenceItems,
    ...oneTimeLookupExecutionScopeGateItems,
    ...envSecretTokenAccessStillLockedGateItems,
    ...apiCallStillLockedGateItems,
    ...responseHandlingAndStorageGateItems,
    ...productUpdatePriceStockDbWriteBlockGateItems,
    ...task409ExplicitApprovalRequiredGateItems,
  ];

  return {
    taskId: 408,
    taskName: 'TMS Fast Connection Naver Product Lookup One Time Final Safety Gate',
    sourceFastConnectionNaverProductLookupOneTimeLiveTestApprovalPacketStatus: sourceStatus,
    fastConnectionNaverProductLookupOneTimeFinalSafetyGateStatus,

    recommendedFinalSafetyGateDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_FINAL_SAFETY_GATE_READY',
    recommendedFinalSafetyGateDecisionLabel:
      'Naver API 상품 조회 1회 실행 전 Final Safety Gate - read-only 최종 점검',
    recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    recommendedMaxLookupCallCount: 1,
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL',
    recommendedTask409RequiredApprovalPhrase:
      'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.',
    recommendedApprovalMode: 'EXPLICIT_SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ACTUAL_CALL',
    recommendedExecutionMode: 'READ_ONLY_FINAL_GATE_NO_ENV_READ_NO_API_CALL',
    recommendedDeploymentMode: 'FINAL_SAFETY_GATE_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_TASK_409_EXPLICIT_APPROVAL',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,

    liveTestType: 'NAVER_PRODUCT_LOOKUP_ONE_TIME',
    targetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    targetProductNo: '6597910207',
    targetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    maxLookupCallCount: 1,
    finalGatePassedForReadOnlyPlanning: true,
    actualExecutionUnlocked: false,
    actualApprovalAccepted: false,
    actualEnvAccessUnlocked: false,
    actualSecretAccessUnlocked: false,
    actualTokenUseUnlocked: false,
    actualApiCallUnlocked: false,
    productUpdateAllowed: false,
    priceChangeAllowed: false,
    stockChangeAllowed: false,
    dbWriteAllowed: false,
    rawResponseDisplayAllowed: false,
    rawResponseStorageAllowed: false,
    maskedSummaryOnlyAfterExecution: true,

    finalSafetyGateGuidance:
      '이번 화면은 Naver API 상품 조회 1회 실행 전 Final Safety Gate입니다. Task 407 Live Test 승인 Packet을 참조하며, 아직 실제 승인 수락은 하지 않았고, 아직 env/secret 접근은 하지 않았고, 아직 token 사용은 하지 않았고, 아직 실제 Naver API 호출은 하지 않았습니다. Live Test 목표는 상품 조회 API 1회 성공이며, 조회 대상 후보는 대표 검증 상품 6597910207이고 최대 호출 수는 1회입니다. 상품 수정 API, 가격 변경, 재고 변경, raw API response 저장은 범위 밖입니다. 실제 API 호출 전에는 다음 Task 409에서 별도 사용자 승인이 필요하며, 이번 화면은 Final Safety Gate일 뿐 실제 호출이 아닙니다.',
    finalSafetyGateScopeNotice:
      '이번 Final Safety Gate는 상품 조회 API 1회 실제 호출 전 최종 read-only 점검입니다. 실제 호출, env 접근, token 사용은 아직 수행하지 않습니다.',
    userApprovalPhraseGuidance:
      '이번 화면은 Final Safety Gate입니다. 이번 화면은 실제 승인 수락이 아닙니다. 이번 화면에는 승인 입력창이 없고, 승인 버튼이 없고, submit action이 없고, POST API가 없습니다. Task 409에서 승인 문구가 별도로 확인되기 전까지 실제 env/secret 접근과 API 호출은 금지됩니다.',
    userApprovalPhraseExample: 'Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.',

    finalSafetyGateReadinessItems,
    task407LiveTestApprovalPacketReferenceItems,
    oneTimeLookupExecutionScopeGateItems,
    envSecretTokenAccessStillLockedGateItems,
    apiCallStillLockedGateItems,
    responseHandlingAndStorageGateItems,
    productUpdatePriceStockDbWriteBlockGateItems,
    task409ExplicitApprovalRequiredGateItems,

    finalSafetyGateItems,
    finalSafetyGateSummaryCards: [
      { label: 'Final Safety Gate 그룹', value: 8 },
      { label: '최대 조회 호출 수', value: 1 },
      { label: 'Total', value: finalSafetyGateItems.length },
    ],
    finalSafetyGateGroupCount: 8,
    totalFinalSafetyGateItemCount: finalSafetyGateItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,

    finalSafetyGatePrepared: true,
    actualFinalSafetyGateSubmitted: false,
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
    actualProductLookupExecuted: false,
    actualProductUpdateExecuted: false,
    actualOperatingTransition: false,
  };
}
