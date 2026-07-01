import {
  type TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
  type TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView,
} from './tms-fast-connection-naver-product-lookup-one-time-transition-recovery-view.service';

export type TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus =
  | 'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY'
  | 'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_PARTIAL_READY'
  | 'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_NOT_STARTED';

export type TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketGroup =
  | 'SECRET_ENV_ACCESS_APPROVAL_REQUEST_PACKET_READINESS'
  | 'FAST_CONNECTION_TRANSITION_RECOVERY_REFERENCE'
  | 'SECRET_ENV_ACCESS_PURPOSE'
  | 'SECRET_ENV_ACCESS_SCOPE_CANDIDATES'
  | 'NO_SECRET_VALUE_EXPOSURE_GUARD'
  | 'NO_ACTUAL_ACCESS_OR_API_CALL_GUARD'
  | 'REQUIRED_USER_APPROVAL_PHRASE_GUIDANCE'
  | 'NEXT_PREFLIGHT_ROADMAP';

export interface TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem {
  secretEnvAccessApprovalRequestPacketItemId: string;
  group: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView {
  taskId: 405;
  taskName: string;
  sourceFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus;
  fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus;

  recommendedApprovalRequestPacketDecision: 'NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY';
  recommendedApprovalRequestPacketDecisionLabel: 'Naver API Secret/Env 접근 별도 승인 요청 Packet - read-only 요청 전용';
  recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  recommendedNextStep: 'NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ENV_OR_SECRET_ACCESS';
  recommendedExecutionMode: 'READ_ONLY_NO_ENV_ACCESS_NO_API_CALL';
  recommendedDeploymentMode: 'SECRET_ENV_ACCESS_APPROVAL_REQUEST_PACKET_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL';

  fastConnectionModeEnabled: true;
  primaryGoalNaverProductLookupOneTimeSuccess: true;

  secretEnvAccessApprovalRequestPacketGuidance: string;
  userApprovalPhraseGuidance: string;
  userApprovalPhraseExample: string;
  environmentVariableNameCandidates: string[];
  environmentVariableDisclosureNotice: string;

  secretEnvAccessApprovalRequestPacketReadinessItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  fastConnectionTransitionRecoveryReferenceItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  secretEnvAccessPurposeItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  secretEnvAccessScopeCandidatesItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  noSecretValueExposureGuardItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  noActualAccessOrApiCallGuardItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  requiredUserApprovalPhraseGuidanceItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  nextPreflightRoadmapItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];

  secretEnvAccessApprovalRequestPacketItems: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem[];
  secretEnvAccessApprovalRequestPacketSummaryCards: { label: string; value: number }[];
  secretEnvAccessApprovalRequestPacketGroupCount: number;
  totalSecretEnvAccessApprovalRequestPacketItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketRoadmapItem[];

  actualNaverApiCall: false;
  actualProductLookupApiCall: false;
  actualProductUpdateApiCall: false;
  actualTokenIssue: false;
  actualTokenReissue: false;
  actualTokenUse: false;
  actualEnvRead: false;
  actualEnvWrite: false;
  actualEnvFileOpen: false;
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
  TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,
  TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus
> = {
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_READY:
    'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_PARTIAL_READY:
    'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_BLOCKED',
  TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_NOT_STARTED',
};

const ENVIRONMENT_VARIABLE_NAME_CANDIDATES = [
  'NAVER_COMMERCE_CLIENT_ID',
  'NAVER_COMMERCE_CLIENT_SECRET',
  'NAVER_COMMERCE_API_BASE_URL',
  'NAVER_COMMERCE_TOKEN_URL',
  'NAVER_COMMERCE_CHANNEL_ID',
  'NAVER_COMMERCE_SELLER_ID',
];

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketRoadmapItem[] =
  [
    { taskId: 405, label: 'Task 405 - Naver API Secret/Env 접근 별도 승인 요청 Packet' },
    { taskId: 406, label: 'Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면' },
    { taskId: 407, label: 'Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet' },
    { taskId: 408, label: 'Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate' },
    { taskId: 409, label: 'Task 409 - Naver API 상품 조회 1회 실제 호출' },
    { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
    { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
  ];

function makeItem(
  group: TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketGroup,
  label: string,
  description: string
): TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketItem {
  return {
    secretEnvAccessApprovalRequestPacketItemId: `secret-env-access-separate-approval-request-packet-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

export function buildTmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView(
  fastConnectionTransitionRecoveryView: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView
): TmsFastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketView {
  const sourceStatus =
    fastConnectionTransitionRecoveryView.fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus;
  const fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus = STATUS_MAP[sourceStatus];

  const secretEnvAccessApprovalRequestPacketReadinessItems = [
    makeItem(
      'SECRET_ENV_ACCESS_APPROVAL_REQUEST_PACKET_READINESS',
      'Secret/Env 접근 승인 요청 Packet 준비도',
      'Secret/Env 접근 승인 요청 Packet이 준비되었는지 read-only로 표시합니다.'
    ),
  ];
  const fastConnectionTransitionRecoveryReferenceItems = [
    makeItem(
      'FAST_CONNECTION_TRANSITION_RECOVERY_REFERENCE',
      'Task 404 Fast Connection Transition Recovery 참조',
      'Task 404 Fast Connection Mode 전환 복구 결과를 read-only로 참조합니다.'
    ),
  ];
  const secretEnvAccessPurposeItems = [
    makeItem(
      'SECRET_ENV_ACCESS_PURPOSE',
      'Secret/Env 접근 목적',
      'Naver 상품 조회 1회 테스트를 위해 환경 변수/secret 확인이 필요한 이유를 표시합니다.'
    ),
  ];
  const secretEnvAccessScopeCandidatesItems = [
    makeItem(
      'SECRET_ENV_ACCESS_SCOPE_CANDIDATES',
      'Secret/Env 접근 범위 후보',
      `필요한 환경 변수 이름 후보만 표시하고 값은 표시하지 않습니다: ${ENVIRONMENT_VARIABLE_NAME_CANDIDATES.join(', ')}`
    ),
  ];
  const noSecretValueExposureGuardItems = [
    makeItem(
      'NO_SECRET_VALUE_EXPOSURE_GUARD',
      'Secret 값 노출 금지',
      'secret 값, token 값, authorization/header/signature 값 노출을 금지함을 표시합니다.'
    ),
  ];
  const noActualAccessOrApiCallGuardItems = [
    makeItem(
      'NO_ACTUAL_ACCESS_OR_API_CALL_GUARD',
      '실제 접근/API 호출 없음',
      '이번 화면에서는 실제 env/secret 접근이나 API 호출이 없다는 점을 표시합니다.'
    ),
  ];
  const requiredUserApprovalPhraseGuidanceItems = [
    makeItem(
      'REQUIRED_USER_APPROVAL_PHRASE_GUIDANCE',
      '별도 승인 문구 안내',
      '다음 단계에서 사용자가 별도로 승인해야 함을 read-only로 안내합니다.'
    ),
  ];
  const nextPreflightRoadmapItems = [
    makeItem(
      'NEXT_PREFLIGHT_ROADMAP',
      '다음 Preflight 로드맵',
      'Task 406 이후 No-Secret Preflight와 Live Test 승인 흐름을 표시합니다.'
    ),
  ];

  const secretEnvAccessApprovalRequestPacketItems = [
    ...secretEnvAccessApprovalRequestPacketReadinessItems,
    ...fastConnectionTransitionRecoveryReferenceItems,
    ...secretEnvAccessPurposeItems,
    ...secretEnvAccessScopeCandidatesItems,
    ...noSecretValueExposureGuardItems,
    ...noActualAccessOrApiCallGuardItems,
    ...requiredUserApprovalPhraseGuidanceItems,
    ...nextPreflightRoadmapItems,
  ];

  return {
    taskId: 405,
    taskName: 'TMS Fast Connection Naver Api Secret Env Access Separate Approval Request Packet',
    sourceFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus: sourceStatus,
    fastConnectionNaverApiSecretEnvAccessSeparateApprovalRequestPacketStatus,

    recommendedApprovalRequestPacketDecision:
      'NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET_READY',
    recommendedApprovalRequestPacketDecisionLabel:
      'Naver API Secret/Env 접근 별도 승인 요청 Packet - read-only 요청 전용',
    recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    recommendedNextStep: 'NAVER_API_ENV_EXISTENCE_NO_SECRET_PREFLIGHT',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_ENV_OR_SECRET_ACCESS',
    recommendedExecutionMode: 'READ_ONLY_NO_ENV_ACCESS_NO_API_CALL',
    recommendedDeploymentMode: 'SECRET_ENV_ACCESS_APPROVAL_REQUEST_PACKET_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL',

    fastConnectionModeEnabled: true,
    primaryGoalNaverProductLookupOneTimeSuccess: true,

    secretEnvAccessApprovalRequestPacketGuidance:
      '이번 화면은 Naver API Secret/Env 접근 별도 승인 요청 Packet입니다. 승인 요청 Packet은 실제 승인 제출이 아니고, 실제 승인 수락이 아니며, .env 접근이 아니고, secret 접근이 아니고, token 사용이 아니고, 실제 Naver API 호출이 아닙니다. 실제 .env / secret 접근은 이후 별도 승인 이후에만 가능합니다.',
    userApprovalPhraseGuidance:
      '이번 화면은 승인 요청 Packet입니다. 이번 화면에는 승인 입력창이 없고, 승인 버튼이 없고, submit action이 없고, POST API가 없습니다.',
    userApprovalPhraseExample:
      'Naver API 상품 조회 1회 테스트를 위한 환경 변수 존재 여부 확인을 별도로 승인합니다.',
    environmentVariableNameCandidates: ENVIRONMENT_VARIABLE_NAME_CANDIDATES,
    environmentVariableDisclosureNotice:
      '환경 변수 이름 후보만 표시됩니다. 실제 값은 읽지 않았고 표시하지 않습니다.',

    secretEnvAccessApprovalRequestPacketReadinessItems,
    fastConnectionTransitionRecoveryReferenceItems,
    secretEnvAccessPurposeItems,
    secretEnvAccessScopeCandidatesItems,
    noSecretValueExposureGuardItems,
    noActualAccessOrApiCallGuardItems,
    requiredUserApprovalPhraseGuidanceItems,
    nextPreflightRoadmapItems,

    secretEnvAccessApprovalRequestPacketItems,
    secretEnvAccessApprovalRequestPacketSummaryCards: [
      { label: 'Secret/Env Access Approval Request Packet 그룹', value: 8 },
      { label: '환경 변수 이름 후보', value: ENVIRONMENT_VARIABLE_NAME_CANDIDATES.length },
      { label: 'Total', value: secretEnvAccessApprovalRequestPacketItems.length },
    ],
    secretEnvAccessApprovalRequestPacketGroupCount: 8,
    totalSecretEnvAccessApprovalRequestPacketItemCount: secretEnvAccessApprovalRequestPacketItems.length,

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
