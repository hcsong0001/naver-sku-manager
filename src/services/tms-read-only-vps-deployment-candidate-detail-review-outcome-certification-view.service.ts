import {
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewCategory,
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewItem,
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus,
} from './tms-read-only-vps-deployment-candidate-detail-review-view.service';

export type TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_NOT_STARTED';

export const NEXT_TASK_324_APPROVAL_PHRASE =
  'Task 324에서 TMS read-only VPS 배포 후보 Safety Audit Seal 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 323 VPS 후보 상세 검토 결과 인증 이후의 안전 조건을 read-only로 봉인하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem {
  certificationId: string;
  sourceReviewId: string;
  category: TmsReadOnlyVpsDeploymentCandidateDetailReviewCategory;
  label: string;
  sourceStatus: string;
  certificationStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFICATION_VIEW';
  taskId: 323;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 323;
  referenceTaskNumbers: readonly [322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateDetailReviewStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus;
  vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
  recommendedEnvironmentKey: string;
  recommendedEnvironmentLabel: string;
  vpsCandidateCertifiedForReview: true;
  outcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  requirementOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  costOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  securityOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  backupOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  domainHttpsOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  operationRiskOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationSummaryCard[];
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationNotStarted: boolean;
  vpsRequirementReviewCertified: true;
  vpsCostReviewCertified: true;
  vpsSecurityReviewCertified: true;
  vpsBackupReviewCertified: true;
  vpsDomainHttpsReviewCertified: true;
  vpsOperationRiskReviewCertified: true;
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
  isReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertification: true;
  requiresSeparateTask324Approval: true;
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

function mapSourceStatusToOutcomeStatus(
  status: TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus,
): TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_NOT_STARTED';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function toCertificationItem(
  item: TmsReadOnlyVpsDeploymentCandidateDetailReviewItem,
): TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem {
  return {
    certificationId: `cert-${item.reviewId}`,
    sourceReviewId: item.reviewId,
    category: item.category,
    label: item.label,
    sourceStatus: item.status,
    certificationStatus: item.status,
    isReady: item.isReady,
    isPartialReady: item.isPartialReady,
    isBlocked: item.isBlocked,
    isNotStarted: item.isNotStarted,
    message: `${item.message} / 결과 인증 완료`,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView(input: {
  vpsDeploymentCandidateDetailReview: {
    vpsDeploymentCandidateDetailReviewStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewStatus;
    recommendedEnvironmentKey: string;
    recommendedEnvironmentLabel: string;
    vpsCandidateSelectedForReview: boolean;
    vpsDetailReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
    vpsRequirementItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
    vpsCostReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
    vpsSecurityReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
    vpsBackupReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
    vpsDomainHttpsReviewItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
    vpsOperationRiskItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewItem[];
  };
}): TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationView {
  const sourceVpsDeploymentCandidateDetailReviewStatus =
    input.vpsDeploymentCandidateDetailReview.vpsDeploymentCandidateDetailReviewStatus;
  const vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus =
    mapSourceStatusToOutcomeStatus(sourceVpsDeploymentCandidateDetailReviewStatus);

  const outcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsDetailReviewItems.map(toCertificationItem);
  const requirementOutcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsRequirementItems.map(toCertificationItem);
  const costOutcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsCostReviewItems.map(toCertificationItem);
  const securityOutcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsSecurityReviewItems.map(toCertificationItem);
  const backupOutcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsBackupReviewItems.map(toCertificationItem);
  const domainHttpsOutcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsDomainHttpsReviewItems.map(toCertificationItem);
  const operationRiskOutcomeCertificationItems =
    input.vpsDeploymentCandidateDetailReview.vpsOperationRiskItems.map(toCertificationItem);

  const outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationSummaryCard[] =
    [
      {
        label: '추천 후보 인증',
        value: input.vpsDeploymentCandidateDetailReview.recommendedEnvironmentLabel,
        tone: input.vpsDeploymentCandidateDetailReview.vpsCandidateSelectedForReview
          ? 'positive'
          : 'warning',
      },
      {
        label: '인증 항목',
        value: `${outcomeCertificationItems.length}개`,
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
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFICATION_VIEW',
    taskId: 323,
    taskName: 'TMS Read-Only VPS Deployment Candidate Detail Review Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 상세 검토 결과 인증',
    description:
      'Task 322 VPS 배포 후보 상세 검토 결과를 read-only로 인증합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 323,
    referenceTaskNumbers: [322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateDetailReviewStatus,
    vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    recommendedEnvironmentKey: input.vpsDeploymentCandidateDetailReview.recommendedEnvironmentKey,
    recommendedEnvironmentLabel:
      input.vpsDeploymentCandidateDetailReview.recommendedEnvironmentLabel,
    vpsCandidateCertifiedForReview: true,
    outcomeCertificationItems,
    requirementOutcomeCertificationItems,
    costOutcomeCertificationItems,
    securityOutcomeCertificationItems,
    backupOutcomeCertificationItems,
    domainHttpsOutcomeCertificationItems,
    operationRiskOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    outcomeCertifiedReady:
      vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY',
    outcomeCertifiedPartialReady:
      vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
    outcomeCertificationBlocked:
      vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED',
    outcomeCertificationNotStarted:
      vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_NOT_STARTED',
    vpsRequirementReviewCertified: true,
    vpsCostReviewCertified: true,
    vpsSecurityReviewCertified: true,
    vpsBackupReviewCertified: true,
    vpsDomainHttpsReviewCertified: true,
    vpsOperationRiskReviewCertified: true,
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
    isReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertification: true,
    requiresSeparateTask324Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_324_APPROVAL_PHRASE,
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
