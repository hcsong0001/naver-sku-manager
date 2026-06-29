import {
  type DeploymentTargetEnvironmentKey,
  type TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus,
} from './tms-read-only-deployment-target-environment-selection-comparison-view.service';

export type TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateDetailReviewItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateDetailReviewCategory =
  | 'VPS_REQUIREMENT'
  | 'COST'
  | 'SECURITY'
  | 'BACKUP'
  | 'DOMAIN_HTTPS'
  | 'OPERATION_RISK'
  | 'SAFETY_LOCK';

export const NEXT_TASK_323_APPROVAL_PHRASE =
  'Task 323에서 TMS read-only VPS 배포 후보 상세 검토 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 322 VPS 후보 상세 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

type DetailReviewStatusFlags = {
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
};

export interface TmsReadOnlyVpsDeploymentCandidateDetailReviewItem {
  reviewId: string;
  category: TmsReadOnlyVpsDeploymentCandidateDetailReviewCategory;
  label: string;
  status: TmsReadOnlyVpsDeploymentCandidateDetailReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateDetailReviewSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateDetailReviewView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_VIEW';
  taskId: 322;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 322;
  referenceTaskNumbers: readonly [321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceDeploymentTargetEnvironmentSelectionComparisonStatus: TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus;
  vpsDeploymentCandidateDetailReviewStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus;
  recommendedEnvironmentKey: DeploymentTargetEnvironmentKey;
  recommendedEnvironmentLabel: string;
  vpsCandidateSelectedForReview: boolean;
  vpsDetailReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsRequirementItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsCostReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsSecurityReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsBackupReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsDomainHttpsReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsOperationRiskItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  vpsDetailSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewSummaryCard[];
  vpsDetailReviewReady: boolean;
  vpsDetailReviewPartialReady: boolean;
  vpsDetailReviewBlocked: boolean;
  vpsDetailReviewNotStarted: boolean;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  operatingDbConnectionChanged: false;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  isReadOnlyVpsDeploymentCandidateDetailReview: true;
  requiresSeparateTask323Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritePerformed: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  envFileReadOrModified: false;
}

const SOURCE_TO_VPS_DETAIL_REVIEW_STATUS: Record<
  TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus,
  TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus
> = {
  TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY:
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_READY',
  TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY:
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED:
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_BLOCKED',
  TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED:
    'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_NOT_STARTED',
};

function createFlags(
  status: TmsReadOnlyVpsDeploymentCandidateDetailReviewItemStatus,
): DetailReviewStatusFlags {
  return {
    isReady: status === 'READY',
    isPartialReady: status === 'PARTIAL_READY',
    isBlocked: status === 'BLOCKED',
    isNotStarted: status === 'NOT_STARTED',
  };
}

function toItemStatus(
  status: TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus,
): TmsReadOnlyVpsDeploymentCandidateDetailReviewItemStatus {
  if (status.endsWith('_BLOCKED')) return 'BLOCKED';
  if (status.endsWith('_NOT_STARTED')) return 'NOT_STARTED';
  if (status.endsWith('_PARTIAL_READY')) return 'PARTIAL_READY';
  return 'READY';
}

function createReviewItem(input: {
  reviewId: string;
  category: TmsReadOnlyVpsDeploymentCandidateDetailReviewCategory;
  label: string;
  status: TmsReadOnlyVpsDeploymentCandidateDetailReviewItemStatus;
  message: string;
}): TmsReadOnlyVpsDeploymentCandidateDetailReviewItem {
  return {
    ...input,
    ...createFlags(input.status),
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateDetailReviewView(input: {
  deploymentTargetEnvironmentSelectionComparison: {
    deploymentTargetEnvironmentSelectionComparisonStatus: TmsReadOnlyDeploymentTargetEnvironmentSelectionComparisonStatus;
    recommendedEnvironmentKey: DeploymentTargetEnvironmentKey;
    recommendedEnvironmentLabel: string;
    candidateFlowReadOnlyClosed: boolean;
  };
}): TmsReadOnlyVpsDeploymentCandidateDetailReviewView {
  const sourceDeploymentTargetEnvironmentSelectionComparisonStatus =
    input.deploymentTargetEnvironmentSelectionComparison.deploymentTargetEnvironmentSelectionComparisonStatus;
  const vpsDeploymentCandidateDetailReviewStatus =
    SOURCE_TO_VPS_DETAIL_REVIEW_STATUS[sourceDeploymentTargetEnvironmentSelectionComparisonStatus];
  const baseItemStatus = toItemStatus(vpsDeploymentCandidateDetailReviewStatus);
  const vpsCandidateSelectedForReview =
    input.deploymentTargetEnvironmentSelectionComparison.recommendedEnvironmentKey === 'VPS';

  const vpsRequirementItems = [
    createReviewItem({
      reviewId: 'vps-instance-baseline',
      category: 'VPS_REQUIREMENT',
      label: 'VPS 기본 사양 요구사항',
      status: baseItemStatus,
      message: 'CPU, 메모리, 스토리지, 운영체제 기준을 read-only로 검토하며 실제 서버 생성은 수행하지 않습니다.',
    }),
    createReviewItem({
      reviewId: 'vps-access-baseline',
      category: 'VPS_REQUIREMENT',
      label: 'VPS 접근 경로 및 운영 권한 요구사항',
      status: baseItemStatus,
      message: 'SSH 접근, 관리자 계정 분리, 운영 권한 구조를 문서 수준에서만 확인합니다.',
    }),
  ] as const;

  const vpsCostReviewItems = [
    createReviewItem({
      reviewId: 'vps-monthly-cost',
      category: 'COST',
      label: '월 운영 비용 검토',
      status: baseItemStatus,
      message: '월 사용료, 트래픽, 스냅샷, 백업 비용을 read-only 비교 대상으로 유지합니다.',
    }),
    createReviewItem({
      reviewId: 'vps-scale-cost',
      category: 'COST',
      label: '확장 시 비용 증가 검토',
      status: baseItemStatus,
      message: '운영 중 리소스 확장 필요 시 비용 증가 폭을 사전 검토 항목으로만 정리합니다.',
    }),
  ] as const;

  const vpsSecurityReviewItems = [
    createReviewItem({
      reviewId: 'vps-access-restriction',
      category: 'SECURITY',
      label: '보안 그룹 및 접근 제한 검토',
      status: baseItemStatus,
      message: '허용 포트 최소화, 접근 제한, 관리자 접속 통제는 검토만 하고 실제 설정 변경은 하지 않습니다.',
    }),
    createReviewItem({
      reviewId: 'vps-secret-exposure-block',
      category: 'SECURITY',
      label: 'Token/Auth 및 비밀값 비노출 유지',
      status: 'READY',
      message: 'Token/Auth/Signature/Authorization 값과 raw API response는 계속 표시하지 않습니다.',
    }),
  ] as const;

  const vpsBackupReviewItems = [
    createReviewItem({
      reviewId: 'vps-db-backup-plan',
      category: 'BACKUP',
      label: '운영 DB 백업 계획 검토',
      status: baseItemStatus,
      message: '운영 DB 연결 변경 없이 백업 주기, 보관 위치, 복구 절차를 read-only로 검토합니다.',
    }),
    createReviewItem({
      reviewId: 'vps-rollback-path',
      category: 'BACKUP',
      label: '장애 복구 및 롤백 경로 검토',
      status: baseItemStatus,
      message: '배포 실패 시 복구 경로와 점검 순서를 검토 항목으로만 정리합니다.',
    }),
  ] as const;

  const vpsDomainHttpsReviewItems = [
    createReviewItem({
      reviewId: 'vps-domain-https-fit',
      category: 'DOMAIN_HTTPS',
      label: '도메인 및 HTTPS 적합성 검토',
      status: baseItemStatus,
      message: 'VPS는 도메인 연결과 HTTPS 운영에 유리한 후보인지 확인하되 실제 DNS/SSL 작업은 수행하지 않습니다.',
    }),
    createReviewItem({
      reviewId: 'vps-dns-ssl-not-started',
      category: 'DOMAIN_HTTPS',
      label: 'DNS / SSL / 포트포워딩 미시작 유지',
      status: 'READY',
      message: '실제 DNS 변경, SSL 인증서 발급, 포트포워딩 설정은 아직 시작하지 않습니다.',
    }),
  ] as const;

  const vpsOperationRiskItems = [
    createReviewItem({
      reviewId: 'vps-ops-responsibility',
      category: 'OPERATION_RISK',
      label: '운영 책임 및 접근 제한 리스크 검토',
      status: baseItemStatus,
      message: '서버 운영 책임, 계정 관리, 장애 대응 부담을 read-only로 검토합니다.',
    }),
    createReviewItem({
      reviewId: 'vps-deployment-not-started',
      category: 'OPERATION_RISK',
      label: '실제 VPS 배포 및 도메인 연결 미시작',
      status: 'READY',
      message: '이번 단계에서는 실제 VPS 생성, 실제 배포, 실제 도메인 연결을 수행하지 않습니다.',
    }),
  ] as const;

  const safetyLockItems = [
    createReviewItem({
      reviewId: 'vps-safety-lock-execution',
      category: 'SAFETY_LOCK',
      label: '실행 / 승인 잠금 유지',
      status: 'READY',
      message: '실제 최종 실행 승인, 실제 실행 승인, 실제 실행은 계속 잠금 상태여야 합니다.',
    }),
    createReviewItem({
      reviewId: 'vps-safety-lock-db-api',
      category: 'SAFETY_LOCK',
      label: 'API 호출 / DB write / Worker 차단 유지',
      status: 'READY',
      message: 'Naver API 호출, DB write, Worker / Queue / Adapter 연결은 계속 차단된 상태를 유지합니다.',
    }),
  ] as const;

  const vpsDetailReviewItems = [
    ...vpsRequirementItems,
    ...vpsCostReviewItems,
    ...vpsSecurityReviewItems,
    ...vpsBackupReviewItems,
    ...vpsDomainHttpsReviewItems,
    ...vpsOperationRiskItems,
    ...safetyLockItems,
  ] as const;

  const vpsDetailSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewSummaryCard[] = [
    {
      label: '추천 후보',
      value: `${input.deploymentTargetEnvironmentSelectionComparison.recommendedEnvironmentLabel}`,
      tone: vpsCandidateSelectedForReview ? 'positive' : 'warning',
    },
    {
      label: '검토 항목',
      value: `${vpsDetailReviewItems.length}개`,
      tone: 'neutral',
    },
    {
      label: '실제 VPS 생성',
      value: '미수행',
      tone: 'warning',
    },
    {
      label: '실제 배포/도메인 연결',
      value: '미시작',
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_VIEW',
    taskId: 322,
    taskName: 'TMS Read-Only VPS Deployment Candidate Detail Review Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 상세 검토',
    description:
      'Task 321 배포 대상 환경 선택 비교 결과를 바탕으로 VPS 후보의 요구사항, 비용, 보안, 백업, 도메인/HTTPS 적합성을 read-only로 상세 검토합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 322,
    referenceTaskNumbers: [321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceDeploymentTargetEnvironmentSelectionComparisonStatus,
    vpsDeploymentCandidateDetailReviewStatus,
    recommendedEnvironmentKey:
      input.deploymentTargetEnvironmentSelectionComparison.recommendedEnvironmentKey,
    recommendedEnvironmentLabel:
      input.deploymentTargetEnvironmentSelectionComparison.recommendedEnvironmentLabel,
    vpsCandidateSelectedForReview,
    vpsDetailReviewItems,
    vpsRequirementItems,
    vpsCostReviewItems,
    vpsSecurityReviewItems,
    vpsBackupReviewItems,
    vpsDomainHttpsReviewItems,
    vpsOperationRiskItems,
    vpsDetailSummaryCards,
    vpsDetailReviewReady:
      vpsDeploymentCandidateDetailReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_READY',
    vpsDetailReviewPartialReady:
      vpsDeploymentCandidateDetailReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY',
    vpsDetailReviewBlocked:
      vpsDeploymentCandidateDetailReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_BLOCKED',
    vpsDetailReviewNotStarted:
      vpsDeploymentCandidateDetailReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_NOT_STARTED',
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    operatingDbConnectionChanged: false,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    isReadOnlyVpsDeploymentCandidateDetailReview: true,
    requiresSeparateTask323Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_323_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritePerformed: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    envFileReadOrModified: false,
  };
}
