import {
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus,
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem,
  type TmsReadOnlyVpsDeploymentCandidateReadinessReviewItemCategory,
} from './tms-read-only-vps-deployment-candidate-readiness-review-view.service';

export type TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationCategory =
  | TmsReadOnlyVpsDeploymentCandidateReadinessReviewItemCategory
  | 'READINESS_READY'
  | 'READINESS_BLOCKED'
  | 'REQUIRED_APPROVAL'
  | 'DEPLOYMENT'
  | 'DOMAIN'
  | 'RUNTIME'
  | 'API_DB_WORKER'
  | 'ENV_SECRET'
  | 'SAFETY_LOCK';

export const NEXT_TASK_328_APPROVAL_PHRASE =
  'Task 328에서 TMS read-only VPS 배포 후보 Readiness Review Safety Audit Seal 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 327 Readiness Review 결과 인증 이후에도 실제 VPS 생성·Runtime 구성·운영 DB 연결·Worker/Queue/Adapter 연결·도메인 연결·Naver API 호출·DB write가 차단 상태인지 read-only로 봉인하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem {
  certificationId: string;
  sourceReadinessItemId: string;
  category: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationCategory;
  label: string;
  sourceStatus: string;
  outcomeCertificationStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFICATION_VIEW';
  taskId: 327;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 327;
  referenceTaskNumbers: readonly [326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateReadinessReviewStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus;
  vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus;
  recommendedEnvironmentKey: string;
  recommendedEnvironmentLabel: string;
  readinessReviewOutcomeCertified: true;
  readinessReadyItemsCertified: true;
  readinessBlockedItemsCertified: true;
  readinessRequiredApprovalItemsCertified: true;
  outcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[];
  readyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[];
  requiredApprovalOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[];
  safetyOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationSummaryCard[];
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationNotStarted: boolean;
  readyItemCount: number;
  blockedItemCount: number;
  requiredApprovalItemCount: number;
  totalCertificationItemCount: number;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualProductionTransitionStarted: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  operatingDbConnectionChanged: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  dbWritePerformed: false;
  envFileReadOrModified: false;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertification: true;
  requiresSeparateTask328Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  priceChanged: false;
  stockChanged: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
}

function mapReadinessReviewStatusToOutcomeCertificationStatus(
  status: TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_NOT_STARTED';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function toOutcomeCertificationItem(
  item: TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem,
  categoryOverride?: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationCategory,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem {
  const isReady = item.reviewState === 'COMPLETED';
  const isBlocked = item.reviewState === 'BLOCKED';
  const isNotStarted = !isReady && !isBlocked;
  const outcomeCertificationStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED' = isReady
    ? 'READY'
    : isBlocked
      ? 'BLOCKED'
      : 'NOT_STARTED';

  return {
    certificationId: `outcome-cert-${item.reviewItemId}`,
    sourceReadinessItemId: item.reviewItemId,
    category: categoryOverride ?? item.category,
    label: item.label,
    sourceStatus: item.reviewState,
    outcomeCertificationStatus,
    isReady,
    isPartialReady: false,
    isBlocked,
    isNotStarted,
    message: `${item.message} / Readiness Review 결과 인증 완료`,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

function makeSafetyItem(
  id: string,
  label: string,
  message: string,
  category: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationCategory,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem {
  return {
    certificationId: id,
    sourceReadinessItemId: id,
    category,
    label,
    sourceStatus: 'COMPLETED',
    outcomeCertificationStatus: 'READY',
    isReady: true,
    isPartialReady: false,
    isBlocked: false,
    isNotStarted: false,
    message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView(input: {
  vpsDeploymentCandidateReadinessReview: {
    vpsDeploymentCandidateReadinessReviewStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus;
    recommendedEnvironmentKey: string;
    recommendedEnvironmentLabel: string;
    vpsCandidateReadinessReviewCompleted: boolean;
    completedItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
    blockedItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
    pendingApprovalItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
  };
}): TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationView {
  const sourceVpsDeploymentCandidateReadinessReviewStatus =
    input.vpsDeploymentCandidateReadinessReview.vpsDeploymentCandidateReadinessReviewStatus;
  const vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus =
    mapReadinessReviewStatusToOutcomeCertificationStatus(
      sourceVpsDeploymentCandidateReadinessReviewStatus,
    );

  const readyOutcomeCertificationItems =
    input.vpsDeploymentCandidateReadinessReview.completedItems.map((item) =>
      toOutcomeCertificationItem(item, 'READINESS_READY'),
    );

  const blockedOutcomeCertificationItems =
    input.vpsDeploymentCandidateReadinessReview.blockedItems.map((item) =>
      toOutcomeCertificationItem(item, 'READINESS_BLOCKED'),
    );

  const requiredApprovalOutcomeCertificationItems =
    input.vpsDeploymentCandidateReadinessReview.pendingApprovalItems.map((item) =>
      toOutcomeCertificationItem(item, 'REQUIRED_APPROVAL'),
    );

  const safetyOutcomeCertificationItems: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[] =
    [
      makeSafetyItem(
        'safety-cert-no-vps-created',
        '실제 VPS 생성 미수행 인증',
        '실제 VPS 서버 생성이 없었음을 Readiness Review 결과 인증으로 확인합니다.',
        'DEPLOYMENT',
      ),
      makeSafetyItem(
        'safety-cert-no-domain-connected',
        '실제 도메인 / HTTPS 연결 미수행 인증',
        '실제 도메인 연결 및 HTTPS 적용이 없었음을 확인합니다.',
        'DOMAIN',
      ),
      makeSafetyItem(
        'safety-cert-no-runtime-configured',
        '실제 Runtime 구성 미수행 인증',
        '실제 Runtime 구성이 없었음을 확인합니다.',
        'RUNTIME',
      ),
      makeSafetyItem(
        'safety-cert-no-api-db-worker',
        'Naver API 호출 / DB write / Worker·Queue·Adapter 차단 인증',
        'Naver API 호출, DB write, Worker·Queue·Adapter 연결이 없었음을 확인합니다.',
        'API_DB_WORKER',
      ),
      makeSafetyItem(
        'safety-cert-no-env-secret-exposed',
        'Token/Auth/Signature/Authorization 비노출 / .env 비수정 인증',
        'Token/Auth 값과 .env/.env.local 파일이 노출·수정되지 않았음을 확인합니다.',
        'ENV_SECRET',
      ),
      makeSafetyItem(
        'safety-cert-readonly-still-locked',
        '배포 준비 read-only 상태 유지 인증',
        '배포 준비 상태가 여전히 read-only이며 실제 전환 작업이 없었음을 확인합니다.',
        'SAFETY_LOCK',
      ),
    ];

  const outcomeCertificationItems: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationItem[] =
    [
      ...readyOutcomeCertificationItems,
      ...blockedOutcomeCertificationItems,
      ...requiredApprovalOutcomeCertificationItems,
      ...safetyOutcomeCertificationItems,
    ];

  const outcomeCertificationSummaryCards: TmsReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertificationSummaryCard[] =
    [
      {
        label: '인증 후보',
        value: input.vpsDeploymentCandidateReadinessReview.recommendedEnvironmentLabel,
        tone: input.vpsDeploymentCandidateReadinessReview.vpsCandidateReadinessReviewCompleted
          ? 'positive'
          : 'warning',
      },
      {
        label: '준비 완료 인증',
        value: `${readyOutcomeCertificationItems.length}개`,
        tone: 'positive',
      },
      {
        label: '차단 유지 인증',
        value: `${blockedOutcomeCertificationItems.length}개`,
        tone: 'warning',
      },
      {
        label: '필요 승인 인증',
        value: `${requiredApprovalOutcomeCertificationItems.length}개`,
        tone: 'neutral',
      },
    ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFICATION_VIEW',
    taskId: 327,
    taskName: 'TMS Read-Only VPS Deployment Candidate Readiness Review Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Readiness Review 결과 인증',
    description:
      'Task 326 VPS 배포 후보 Readiness Review 결과를 read-only로 인증합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, 운영 DB, DNS, SSL, 포트포워딩, 서버/VPS 설정을 변경하지 않습니다.',
    currentTaskNumber: 327,
    referenceTaskNumbers: [326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateReadinessReviewStatus,
    vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus,
    recommendedEnvironmentKey:
      input.vpsDeploymentCandidateReadinessReview.recommendedEnvironmentKey,
    recommendedEnvironmentLabel:
      input.vpsDeploymentCandidateReadinessReview.recommendedEnvironmentLabel,
    readinessReviewOutcomeCertified: true,
    readinessReadyItemsCertified: true,
    readinessBlockedItemsCertified: true,
    readinessRequiredApprovalItemsCertified: true,
    outcomeCertificationItems,
    readyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    requiredApprovalOutcomeCertificationItems,
    safetyOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    outcomeCertifiedReady:
      vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_READY',
    outcomeCertifiedPartialReady:
      vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
    outcomeCertificationBlocked:
      vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_BLOCKED',
    outcomeCertificationNotStarted:
      vpsDeploymentCandidateReadinessReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_OUTCOME_NOT_STARTED',
    readyItemCount: readyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    requiredApprovalItemCount: requiredApprovalOutcomeCertificationItems.length,
    totalCertificationItemCount: outcomeCertificationItems.length,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    operatingDbConnectionChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    dbWritePerformed: false,
    envFileReadOrModified: false,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyVpsDeploymentCandidateReadinessReviewOutcomeCertification: true,
    requiresSeparateTask328Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_328_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    priceChanged: false,
    stockChanged: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
  };
}
