import {
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-outcome-certification-view.service';

export type TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateReadinessReviewItemCategory =
  | 'COMPLETED'
  | 'BLOCKED'
  | 'PENDING_APPROVAL';

export const NEXT_TASK_327_APPROVAL_PHRASE =
  'Task 327에서 TMS read-only VPS 배포 후보 준비 완료 검토 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 326 VPS 후보 준비 완료 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem {
  reviewItemId: string;
  category: TmsReadOnlyVpsDeploymentCandidateReadinessReviewItemCategory;
  label: string;
  reviewState: 'COMPLETED' | 'BLOCKED' | 'PENDING_APPROVAL';
  isCompleted: boolean;
  isBlocked: boolean;
  isPendingApproval: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateReadinessReviewSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateReadinessReviewView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_VIEW';
  taskId: 326;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 326;
  referenceTaskNumbers: readonly [325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
  vpsDeploymentCandidateReadinessReviewStatus: TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus;
  recommendedEnvironmentKey: string;
  recommendedEnvironmentLabel: string;
  vpsCandidateReadinessReviewCompleted: true;
  allReadinessItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
  completedItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
  blockedItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
  pendingApprovalItems: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[];
  readinessReviewSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateReadinessReviewSummaryCard[];
  readinessReviewReady: boolean;
  readinessReviewPartialReady: boolean;
  readinessReviewBlocked: boolean;
  readinessReviewNotStarted: boolean;
  isCurrentlyDeploymentReadinessReview: true;
  isNotActualDeploymentStart: true;
  isNotActualProductionTransition: true;
  isNotActualExecutionGranted: true;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  operatingDbConnectionChanged: false;
  runtimeConfigured: false;
  workerConnected: false;
  queueConnected: false;
  adapterConnected: false;
  tokenIssued: false;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyVpsDeploymentCandidateReadinessReview: true;
  requiresSeparateTask327Approval: true;
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
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  envFileReadOrModified: false;
}

function mapOutcomeCertificationStatusToReadinessReviewStatus(
  status: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_NOT_STARTED';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function makeCompletedItem(
  reviewItemId: string,
  label: string,
  message: string,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem {
  return {
    reviewItemId,
    category: 'COMPLETED',
    label,
    reviewState: 'COMPLETED',
    isCompleted: true,
    isBlocked: false,
    isPendingApproval: false,
    message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

function makeBlockedItem(
  reviewItemId: string,
  label: string,
  message: string,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem {
  return {
    reviewItemId,
    category: 'BLOCKED',
    label,
    reviewState: 'BLOCKED',
    isCompleted: false,
    isBlocked: true,
    isPendingApproval: false,
    message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

function makePendingApprovalItem(
  reviewItemId: string,
  label: string,
  message: string,
): TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem {
  return {
    reviewItemId,
    category: 'PENDING_APPROVAL',
    label,
    reviewState: 'PENDING_APPROVAL',
    isCompleted: false,
    isBlocked: false,
    isPendingApproval: true,
    message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateReadinessReviewView(input: {
  vpsDeploymentCandidateSafetyAuditSealOutcomeCertification: {
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
    recommendedEnvironmentKey: string;
    recommendedEnvironmentLabel: string;
    vpsCandidateSafetySealOutcomeCertified: boolean;
    outcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  };
}): TmsReadOnlyVpsDeploymentCandidateReadinessReviewView {
  const sourceOutcomeCertificationStatus =
    input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification.vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
  const vpsDeploymentCandidateReadinessReviewStatus =
    mapOutcomeCertificationStatusToReadinessReviewStatus(sourceOutcomeCertificationStatus);

  const completedItems: TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[] = [
    makeCompletedItem(
      'review-completed-safety-audit',
      'Safety Audit 완료',
      'Task 324 VPS 배포 후보 Safety Audit Seal이 완료됐음을 확인합니다.',
    ),
    makeCompletedItem(
      'review-completed-outcome-certification',
      'Outcome Certification 완료',
      'Task 325 Safety Audit Seal 결과 인증이 완료됐음을 확인합니다.',
    ),
    makeCompletedItem(
      'review-completed-readonly-view',
      'Read-only View 생성 완료',
      'VPS 배포 후보 Read-only View가 생성됐음을 확인합니다.',
    ),
    makeCompletedItem(
      'review-completed-ui-connected',
      'UI 연결 완료',
      'VPS 배포 후보 Read-only UI가 연결됐음을 확인합니다.',
    ),
  ];

  const blockedItems: TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[] = [
    makeBlockedItem('review-blocked-vps-creation', 'VPS 생성', '실제 VPS 생성은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-vps-config', 'VPS 설정', '실제 VPS 설정 변경은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-runtime-config', 'Runtime 구성', '실제 Runtime 구성은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-domain-connection', 'Domain 연결', '실제 Domain 연결은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-https-connection', 'HTTPS 연결', '실제 HTTPS 연결은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-dns-change', 'DNS 변경', '실제 DNS 변경은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-ssl-issuance', 'SSL 발급', '실제 SSL 인증서 발급은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-port-forwarding', 'Port Forwarding', '실제 Port Forwarding 설정은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-worker-connection', 'Worker 연결', '실제 Worker 연결은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-queue-connection', 'Queue 연결', '실제 Queue 연결은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-adapter-connection', 'Adapter 연결', '실제 Adapter 연결은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-operating-db', '운영 DB 연결', '실제 운영 DB 연결은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-token-issuance', 'Token 발급', '실제 Token 발급은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-naver-api-call', 'Naver API 호출', '실제 Naver API 호출은 별도 승인 전까지 차단됩니다.'),
    makeBlockedItem('review-blocked-db-write', 'DB Write', '실제 DB Write는 별도 승인 전까지 차단됩니다.'),
  ];

  const pendingApprovalItems: TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[] = [
    makePendingApprovalItem('review-pending-vps-approval', 'VPS 승인', '실제 VPS 운영 전환 전에 VPS 승인이 필요합니다.'),
    makePendingApprovalItem('review-pending-runtime-approval', 'Runtime 승인', '실제 Runtime 구성 전에 Runtime 승인이 필요합니다.'),
    makePendingApprovalItem('review-pending-domain-approval', 'Domain 승인', '실제 Domain 연결 전에 Domain 승인이 필요합니다.'),
    makePendingApprovalItem('review-pending-operating-db-approval', '운영 DB 승인', '실제 운영 DB 연결 전에 운영 DB 승인이 필요합니다.'),
    makePendingApprovalItem('review-pending-api-approval', 'API 승인', '실제 API 호출 전에 API 승인이 필요합니다.'),
    makePendingApprovalItem('review-pending-deployment-approval', 'Deployment 승인', '실제 운영 전환 전에 Deployment 승인이 필요합니다.'),
  ];

  const allReadinessItems: TmsReadOnlyVpsDeploymentCandidateReadinessReviewItem[] = [
    ...completedItems,
    ...blockedItems,
    ...pendingApprovalItems,
  ];

  const readinessReviewSummaryCards: TmsReadOnlyVpsDeploymentCandidateReadinessReviewSummaryCard[] =
    [
      {
        label: '검토 후보',
        value: input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification.recommendedEnvironmentLabel,
        tone: input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification
          .vpsCandidateSafetySealOutcomeCertified
          ? 'positive'
          : 'warning',
      },
      {
        label: '준비 완료',
        value: `${completedItems.length}개`,
        tone: 'positive',
      },
      {
        label: '차단 항목',
        value: `${blockedItems.length}개`,
        tone: 'warning',
      },
      {
        label: '필요 승인',
        value: `${pendingApprovalItems.length}개`,
        tone: 'neutral',
      },
    ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_VIEW',
    taskId: 326,
    taskName: 'TMS Read-Only VPS Deployment Candidate Readiness Review Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Readiness Review',
    description:
      'Task 325 VPS 배포 후보 Safety Audit Seal 결과 인증 이후, 현재 VPS Deployment Candidate가 실제 운영 전환을 시작할 준비가 되었는가를 read-only로 검토합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 운영 전환 작업이 아닙니다.',
    currentTaskNumber: 326,
    referenceTaskNumbers: [325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceOutcomeCertificationStatus,
    vpsDeploymentCandidateReadinessReviewStatus,
    recommendedEnvironmentKey:
      input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification.recommendedEnvironmentKey,
    recommendedEnvironmentLabel:
      input.vpsDeploymentCandidateSafetyAuditSealOutcomeCertification.recommendedEnvironmentLabel,
    vpsCandidateReadinessReviewCompleted: true,
    allReadinessItems,
    completedItems,
    blockedItems,
    pendingApprovalItems,
    readinessReviewSummaryCards,
    readinessReviewReady:
      vpsDeploymentCandidateReadinessReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_READY',
    readinessReviewPartialReady:
      vpsDeploymentCandidateReadinessReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_PARTIAL_READY',
    readinessReviewBlocked:
      vpsDeploymentCandidateReadinessReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_BLOCKED',
    readinessReviewNotStarted:
      vpsDeploymentCandidateReadinessReviewStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_READINESS_REVIEW_NOT_STARTED',
    isCurrentlyDeploymentReadinessReview: true,
    isNotActualDeploymentStart: true,
    isNotActualProductionTransition: true,
    isNotActualExecutionGranted: true,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    operatingDbConnectionChanged: false,
    runtimeConfigured: false,
    workerConnected: false,
    queueConnected: false,
    adapterConnected: false,
    tokenIssued: false,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyVpsDeploymentCandidateReadinessReview: true,
    requiresSeparateTask327Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_327_APPROVAL_PHRASE,
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
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    envFileReadOrModified: false,
  };
}
