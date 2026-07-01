import {
  type TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
  type TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView,
} from './tms-fast-connection-naver-api-secret-env-access-separate-approval-request-packet-view.service';

export type TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus =
  | 'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_READY'
  | 'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_PARTIAL_READY'
  | 'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_NOT_STARTED';

export type TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightGroup =
  | 'NO_SECRET_PREFLIGHT_READINESS'
  | 'TASK_405_APPROVAL_REQUEST_PACKET_REFERENCE'
  | 'ENV_NAME_CANDIDATE_CHECKLIST'
  | 'NO_ENV_FILE_OPEN_GUARD'
  | 'NO_PROCESS_ENV_READ_GUARD'
  | 'NO_SECRET_VALUE_EXPOSURE_GUARD'
  | 'ONE_TIME_PRODUCT_LOOKUP_PREPARED_TARGET'
  | 'NEXT_LIVE_TEST_APPROVAL_ROADMAP';

export interface TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem {
  noSecretPreflightItemId: string;
  group: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightEnvCandidate {
  name: string;
  candidateOnly: true;
  actualExistenceChecked: false;
  actualValueRead: false;
  actualValueDisplayed: false;
  actualSecretAccessed: false;
}

export interface TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView {
  taskId: 406;
  taskName: string;
  sourceFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus;
  fastConnectionNaverApiEnvExistenceNoSecretPreflightStatus: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus;

  recommendedNoSecretPreflightDecision: 'NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_READY';
  recommendedNoSecretPreflightDecisionLabel: 'Naver API 환경 변수 존재 여부 No-Secret Preflight - read-only 후보 점검 전용';
  recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ENV_CHECK_OR_API_CALL';
  recommendedExecutionMode: 'READ_ONLY_NO_ENV_READ_NO_API_CALL';
  recommendedDeploymentMode: 'ENV_EXISTENCE_NO_SECRET_PREFLIGHT_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;

  noSecretPreflightGuidance: string;
  userApprovalPhraseGuidance: string;
  userApprovalPhraseExample: string;
  environmentVariableNameCandidates: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightEnvCandidate[];
  environmentVariableDisclosureNotice: string;

  noSecretPreflightReadinessItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  task405ApprovalRequestPacketReferenceItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  envNameCandidateChecklistItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  noEnvFileOpenGuardItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  noProcessEnvReadGuardItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  noSecretValueExposureGuardItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  oneTimeProductLookupPreparedTargetItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  nextLiveTestApprovalRoadmapItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];

  noSecretPreflightItems: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem[];
  noSecretPreflightSummaryCards: { label: string; value: number }[];
  noSecretPreflightGroupCount: number;
  totalNoSecretPreflightItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightRoadmapItem[];

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
  TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,
  TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightStatus
> = {
  TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY:
    'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_READY',
  TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_PARTIAL_READY:
    'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_PARTIAL_READY',
  TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_NOT_STARTED',
};

const ENVIRONMENT_VARIABLE_NAMES = [
  'NAVER_COMMERCE_CLIENT_ID',
  'NAVER_COMMERCE_CLIENT_SECRET',
  'NAVER_COMMERCE_API_BASE_URL',
  'NAVER_COMMERCE_TOKEN_URL',
  'NAVER_COMMERCE_CHANNEL_ID',
  'NAVER_COMMERCE_SELLER_ID',
];

const ENVIRONMENT_VARIABLE_NAME_CANDIDATES: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightEnvCandidate[] =
  ENVIRONMENT_VARIABLE_NAMES.map((name) => ({
    name,
    candidateOnly: true,
    actualExistenceChecked: false,
    actualValueRead: false,
    actualValueDisplayed: false,
    actualSecretAccessed: false,
  }));

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightRoadmapItem[] = [
  { taskId: 406, label: 'Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면' },
  { taskId: 407, label: 'Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet' },
  { taskId: 408, label: 'Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate' },
  { taskId: 409, label: 'Task 409 - Naver API 상품 조회 1회 실제 호출' },
  { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
  { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
];

function makeItem(
  group: TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightGroup,
  label: string,
  description: string
): TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightItem {
  return {
    noSecretPreflightItemId: `no-secret-preflight-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView(
  secretEnvAccessApprovalRequestPacketView: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView
): TmsFastConnectionNaverApiEnvExistenceNoSecretPreflightView {
  const sourceStatus =
    secretEnvAccessApprovalRequestPacketView.fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus;
  const fastConnectionNaverApiEnvExistenceNoSecretPreflightStatus = STATUS_MAP[sourceStatus];

  const noSecretPreflightReadinessItems = [
    makeItem(
      'NO_SECRET_PREFLIGHT_READINESS',
      'No-Secret Preflight 준비도',
      'No-Secret Preflight 화면이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const task405ApprovalRequestPacketReferenceItems = [
    makeItem(
      'TASK_405_APPROVAL_REQUEST_PACKET_REFERENCE',
      'Task 405 승인 요청 Packet 참조',
      'Task 405 Secret/Env 접근 승인 요청 Packet을 read-only로 참조합니다.'
    ),
  ];
  const envNameCandidateChecklistItems = [
    makeItem(
      'ENV_NAME_CANDIDATE_CHECKLIST',
      '환경 변수 이름 후보 체크리스트',
      `필요한 환경 변수 이름 후보 체크리스트를 표시합니다: ${ENVIRONMENT_VARIABLE_NAMES.join(', ')}`
    ),
  ];
  const noEnvFileOpenGuardItems = [
    makeItem(
      'NO_ENV_FILE_OPEN_GUARD',
      '.env 파일 미열람',
      '.env / .env.local 파일을 열지 않았다는 점을 표시합니다.'
    ),
  ];
  const noProcessEnvReadGuardItems = [
    makeItem(
      'NO_PROCESS_ENV_READ_GUARD',
      'process.env 미조회',
      'process.env 실제 조회를 하지 않았다는 점을 표시합니다.'
    ),
  ];
  const noSecretValueExposureGuardItems = [
    makeItem(
      'NO_SECRET_VALUE_EXPOSURE_GUARD',
      'Secret 값 노출 금지',
      'secret/token/header/signature/raw response 값 노출을 금지함을 표시합니다.'
    ),
  ];
  const oneTimeProductLookupPreparedTargetItems = [
    makeItem(
      'ONE_TIME_PRODUCT_LOOKUP_PREPARED_TARGET',
      '상품 조회 1회 준비 대상',
      '대표 상품 후보 6597910207과 상품 조회 1회 목표를 표시합니다.'
    ),
  ];
  const nextLiveTestApprovalRoadmapItems = [
    makeItem(
      'NEXT_LIVE_TEST_APPROVAL_ROADMAP',
      '다음 Live Test 승인 로드맵',
      'Task 407 이후 Live Test 승인 흐름을 표시합니다.'
    ),
  ];

  const noSecretPreflightItems = [
    ...noSecretPreflightReadinessItems,
    ...task405ApprovalRequestPacketReferenceItems,
    ...envNameCandidateChecklistItems,
    ...noEnvFileOpenGuardItems,
    ...noProcessEnvReadGuardItems,
    ...noSecretValueExposureGuardItems,
    ...oneTimeProductLookupPreparedTargetItems,
    ...nextLiveTestApprovalRoadmapItems,
  ];

  return {
    taskId: 406,
    taskName: 'TMS Fast Connection Naver Api Env Existence No Secret Preflight',
    sourceFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus: sourceStatus,
    fastConnectionNaverApiEnvExistenceNoSecretPreflightStatus,

    recommendedNoSecretPreflightDecision: 'NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT_READY',
    recommendedNoSecretPreflightDecisionLabel:
      'Naver API 환경 변수 존재 여부 No-Secret Preflight - read-only 후보 점검 전용',
    recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    recommendedNextStep: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_LIVE_TEST_APPROVAL_PACKET',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ENV_CHECK_OR_API_CALL',
    recommendedExecutionMode: 'READ_ONLY_NO_ENV_READ_NO_API_CALL',
    recommendedDeploymentMode: 'ENV_EXISTENCE_NO_SECRET_PREFLIGHT_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,

    noSecretPreflightGuidance:
      '이번 화면은 No-Secret Preflight입니다. Task 405 승인 요청 Packet을 참조하며, 아직 사용자가 실제 env/secret 접근을 승인하지 않았습니다. 이번 화면은 실제 env 파일을 열지 않고, 실제 환경 변수 값을 읽지 않으며, 환경 변수 이름 후보만 표시합니다. 값/secret/token/header/signature/raw response는 표시하지 않고 실제 API 호출도 하지 않습니다. 다음 단계에서 실제 env 존재 확인을 위한 별도 승인 또는 안전 게이트로 이동합니다.',
    userApprovalPhraseGuidance:
      '이번 화면은 No-Secret Preflight입니다. 이번 화면은 실제 env 존재 확인이 아니고, 실제 secret 접근이 아닙니다. 이번 화면에는 승인 입력창이 없고, 승인 버튼이 없고, submit action이 없고, POST API가 없습니다. 실제 env 존재 확인은 이후 별도 승인 이후에만 가능합니다.',
    userApprovalPhraseExample:
      'Naver API 상품 조회 1회 테스트를 위한 환경 변수 존재 여부 확인을 별도로 승인합니다.',
    environmentVariableNameCandidates: ENVIRONMENT_VARIABLE_NAME_CANDIDATES,
    environmentVariableDisclosureNotice:
      '환경 변수 이름 후보만 표시됩니다. 이번 화면에서는 실제 존재 여부와 값을 확인하지 않았습니다.',

    noSecretPreflightReadinessItems,
    task405ApprovalRequestPacketReferenceItems,
    envNameCandidateChecklistItems,
    noEnvFileOpenGuardItems,
    noProcessEnvReadGuardItems,
    noSecretValueExposureGuardItems,
    oneTimeProductLookupPreparedTargetItems,
    nextLiveTestApprovalRoadmapItems,

    noSecretPreflightItems,
    noSecretPreflightSummaryCards: [
      { label: 'No-Secret Preflight 그룹', value: 8 },
      { label: '환경 변수 이름 후보', value: ENVIRONMENT_VARIABLE_NAME_CANDIDATES.length },
      { label: 'Total', value: noSecretPreflightItems.length },
    ],
    noSecretPreflightGroupCount: 8,
    totalNoSecretPreflightItemCount: noSecretPreflightItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,

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
