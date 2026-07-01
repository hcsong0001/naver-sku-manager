import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-actual-input-separate-approval-boundary-view.service';

export type TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus =
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_PARTIAL_READY'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_BLOCKED'
  | 'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_NOT_STARTED';

export type TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryGroup =
  | 'FAST_CONNECTION_TRANSITION_RECOVERY_READINESS'
  | 'TASK_403_LEGACY_BOUNDARY_REFERENCE_SUMMARY'
  | 'FAST_CONNECTION_MODE_ENABLED_FROM_TASK_404'
  | 'NAVER_PRODUCT_LOOKUP_ONE_TIME_PRIMARY_GOAL'
  | 'SECRET_ENV_ACCESS_REQUIRES_SEPARATE_APPROVAL'
  | 'ACTUAL_API_CALL_REQUIRES_SEPARATE_APPROVAL'
  | 'REPRESENTATIVE_PRODUCT_LOOKUP_CANDIDATE'
  | 'COMPRESSED_FAST_CONNECTION_ROADMAP';

export interface TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem {
  fastConnectionTransitionRecoveryItemId: string;
  group: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryGroup;
  label: string;
  description: string;
  isReadOnly: true;
  requiresSeparateApproval: boolean;
}

export interface TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryRoadmapItem {
  taskId: number;
  label: string;
}

export interface TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView {
  taskId: 404;
  taskName: string;
  sourceOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus;
  fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus;

  recommendedFastConnectionDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_FAST_CONNECTION_MODE_RECOVERED';
  recommendedFastConnectionDecisionLabel: 'Naver API 상품 조회 1회 성공 우선 Fast Connection Mode 전환 복구';
  recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS';
  recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API';
  recommendedTargetProductNo: '6597910207';
  recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보';
  recommendedNextStep: 'NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_SECRET_OR_API_CALL';
  recommendedExecutionMode: 'READ_ONLY_NO_API_CALL_YET';
  recommendedDeploymentMode: 'FAST_CONNECTION_TRANSITION_RECOVERY_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL';

  fastConnectionModeEnabled: true;
  fastConnectionModeRecoveredFromLegacyTask403: true;
  legacyApprovalPhraseBoundaryFlowStoppedAfterTask403: true;
  primaryGoalChangedToNaverProductLookupOneTimeSuccess: true;

  fastConnectionTransitionRecoveryGuidance: string;

  fastConnectionTransitionRecoveryReadinessItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  task403LegacyBoundaryReferenceSummaryItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  fastConnectionModeEnabledFromTask404Items: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  naverProductLookupOneTimePrimaryGoalItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  secretEnvAccessRequiresSeparateApprovalItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  actualApiCallRequiresSeparateApprovalItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  representativeProductLookupCandidateItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  compressedFastConnectionRoadmapItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];

  fastConnectionTransitionRecoveryItems: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem[];
  fastConnectionTransitionRecoverySummaryCards: { label: string; value: number }[];
  fastConnectionTransitionRecoveryGroupCount: number;
  totalFastConnectionTransitionRecoveryItemCount: number;

  compressedFastConnectionRoadmap: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryRoadmapItem[];

  actualNaverApiCall: false;
  actualProductLookupApiCall: false;
  actualProductUpdateApiCall: false;
  actualTokenIssue: false;
  actualTokenReissue: false;
  actualTokenUse: false;
  actualEnvRead: false;
  actualEnvWrite: false;
  actualSecretAccess: false;
  actualSecretExposure: false;
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
  actualProductLookupExecuted: false;
  actualProductUpdateExecuted: false;
  actualOperatingTransition: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus,
  TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED:
    'TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_TRANSITION_RECOVERY_NOT_STARTED',
};

function makeItem(
  group: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryGroup,
  label: string,
  description: string
): TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryItem {
  return {
    fastConnectionTransitionRecoveryItemId: `fast-connection-transition-recovery-${group.toLowerCase()}`,
    group,
    label,
    description,
    isReadOnly: true,
    requiresSeparateApproval: true,
  };
}

const COMPRESSED_FAST_CONNECTION_ROADMAP: TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryRoadmapItem[] = [
  { taskId: 404, label: 'Task 404 - Fast Connection Mode 전환 복구 / 1회 상품 조회 목표 정렬' },
  { taskId: 405, label: 'Task 405 - Naver API Secret/Env 접근 별도 승인 요청 Packet' },
  { taskId: 406, label: 'Task 406 - Naver API 환경 변수 존재 여부 No-Secret Preflight 화면' },
  { taskId: 407, label: 'Task 407 - Naver API 상품 조회 1회 Live Test 승인 Packet' },
  { taskId: 408, label: 'Task 408 - Naver API 상품 조회 1회 실행 전 Final Safety Gate' },
  { taskId: 409, label: 'Task 409 - Naver API 상품 조회 1회 실제 호출' },
  { taskId: 410, label: 'Task 410 - Naver API 상품 조회 1회 결과 증적 화면' },
  { taskId: 411, label: 'Task 411 - 상품 수정 API 진입 여부 판단 화면' },
];

export function buildTmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView(
  actualInputSeparateApprovalBoundaryView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView
): TmsFastConnectionNaverProductLookupOneTimeTransitionRecoveryView {
  const sourceStatus =
    actualInputSeparateApprovalBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus;
  const fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus = STATUS_MAP[sourceStatus];

  const fastConnectionTransitionRecoveryReadinessItems = [
    makeItem(
      'FAST_CONNECTION_TRANSITION_RECOVERY_READINESS',
      'Fast Connection Mode 전환 복구 준비도',
      'Task 404에서 빠른 연결 모드 전환을 복구했는지 read-only로 표시합니다.'
    ),
  ];
  const task403LegacyBoundaryReferenceSummaryItems = [
    makeItem(
      'TASK_403_LEGACY_BOUNDARY_REFERENCE_SUMMARY',
      'Task 403 Legacy Boundary 참조 요약',
      'Task 403이 기존 User Approval Phrase Actual Input Separate Approval Boundary 흐름으로 완료되었음을 참조합니다.'
    ),
  ];
  const fastConnectionModeEnabledFromTask404Items = [
    makeItem(
      'FAST_CONNECTION_MODE_ENABLED_FROM_TASK_404',
      'Fast Connection Mode 활성화',
      'Task 404부터 Fast Connection Mode가 활성화되었음을 표시합니다.'
    ),
  ];
  const naverProductLookupOneTimePrimaryGoalItems = [
    makeItem(
      'NAVER_PRODUCT_LOOKUP_ONE_TIME_PRIMARY_GOAL',
      'Naver 상품 조회 1회 성공 최우선 목표',
      '최우선 목표가 Naver 상품 조회 API 1회 성공임을 표시합니다.'
    ),
  ];
  const secretEnvAccessRequiresSeparateApprovalItems = [
    makeItem(
      'SECRET_ENV_ACCESS_REQUIRES_SEPARATE_APPROVAL',
      'Secret/Env 접근 별도 승인 필요',
      '.env / token / secret 접근 전 별도 승인이 필요함을 표시합니다.'
    ),
  ];
  const actualApiCallRequiresSeparateApprovalItems = [
    makeItem(
      'ACTUAL_API_CALL_REQUIRES_SEPARATE_APPROVAL',
      '실제 API 호출 별도 승인 필요',
      '실제 API 호출 전 별도 승인이 필요함을 표시합니다.'
    ),
  ];
  const representativeProductLookupCandidateItems = [
    makeItem(
      'REPRESENTATIVE_PRODUCT_LOOKUP_CANDIDATE',
      '대표 검증 상품 후보',
      '공구이야기직영 대표 검증 상품 후보 6597910207을 후보로 표시하되 실제 호출하지 않습니다.'
    ),
  ];
  const compressedFastConnectionRoadmapItems = [
    makeItem(
      'COMPRESSED_FAST_CONNECTION_ROADMAP',
      '압축 로드맵',
      'Task 405 이후 압축 로드맵을 표시합니다.'
    ),
  ];

  const fastConnectionTransitionRecoveryItems = [
    ...fastConnectionTransitionRecoveryReadinessItems,
    ...task403LegacyBoundaryReferenceSummaryItems,
    ...fastConnectionModeEnabledFromTask404Items,
    ...naverProductLookupOneTimePrimaryGoalItems,
    ...secretEnvAccessRequiresSeparateApprovalItems,
    ...actualApiCallRequiresSeparateApprovalItems,
    ...representativeProductLookupCandidateItems,
    ...compressedFastConnectionRoadmapItems,
  ];

  return {
    taskId: 404,
    taskName: 'TMS Fast Connection Naver Product Lookup One-Time Transition Recovery',
    sourceOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus:
      sourceStatus,
    fastConnectionNaverProductLookupOneTimeTransitionRecoveryStatus,

    recommendedFastConnectionDecision: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_FAST_CONNECTION_MODE_RECOVERED',
    recommendedFastConnectionDecisionLabel:
      'Naver API 상품 조회 1회 성공 우선 Fast Connection Mode 전환 복구',
    recommendedPrimaryGoal: 'NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS',
    recommendedTargetApi: 'NAVER_COMMERCE_PRODUCT_LOOKUP_API',
    recommendedTargetProductNo: '6597910207',
    recommendedTargetProductLabel: '공구이야기직영 대표 검증 상품 후보',
    recommendedNextStep: 'NAVER_API_SECRET_ENV_ACCESS_SEPARATE_APPROVAL_REQUEST_PACKET',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED_BEFORE_SECRET_OR_API_CALL',
    recommendedExecutionMode: 'READ_ONLY_NO_API_CALL_YET',
    recommendedDeploymentMode: 'FAST_CONNECTION_TRANSITION_RECOVERY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_SEPARATE_APPROVAL',

    fastConnectionModeEnabled: true,
    fastConnectionModeRecoveredFromLegacyTask403: true,
    legacyApprovalPhraseBoundaryFlowStoppedAfterTask403: true,
    primaryGoalChangedToNaverProductLookupOneTimeSuccess: true,

    fastConnectionTransitionRecoveryGuidance:
      'Task 403까지 기존 User Approval Phrase Actual Input Separate Approval Boundary 흐름이 완료되었습니다. Task 404부터는 불필요한 Lock/Review/Outcome Certification 반복을 중단하고 Fast Connection Mode로 전환하여 Naver API 상품 조회 1회 성공을 최우선 목표로 합니다. 이번 화면은 read-only이며 실제 API 호출, secret/env 접근, token 사용, DB write, POST API, 실행/승인 버튼을 추가하지 않습니다.',

    fastConnectionTransitionRecoveryReadinessItems,
    task403LegacyBoundaryReferenceSummaryItems,
    fastConnectionModeEnabledFromTask404Items,
    naverProductLookupOneTimePrimaryGoalItems,
    secretEnvAccessRequiresSeparateApprovalItems,
    actualApiCallRequiresSeparateApprovalItems,
    representativeProductLookupCandidateItems,
    compressedFastConnectionRoadmapItems,

    fastConnectionTransitionRecoveryItems,
    fastConnectionTransitionRecoverySummaryCards: [
      { label: 'Fast Connection Transition Recovery 그룹', value: 8 },
      { label: '압축 로드맵 Task 수', value: COMPRESSED_FAST_CONNECTION_ROADMAP.length },
      { label: 'Total', value: fastConnectionTransitionRecoveryItems.length },
    ],
    fastConnectionTransitionRecoveryGroupCount: 8,
    totalFastConnectionTransitionRecoveryItemCount: fastConnectionTransitionRecoveryItems.length,

    compressedFastConnectionRoadmap: COMPRESSED_FAST_CONNECTION_ROADMAP,

    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenIssue: false,
    actualTokenReissue: false,
    actualTokenUse: false,
    actualEnvRead: false,
    actualEnvWrite: false,
    actualSecretAccess: false,
    actualSecretExposure: false,
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
    actualProductLookupExecuted: false,
    actualProductUpdateExecuted: false,
    actualOperatingTransition: false,
  };
}
