import {
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem,
  type TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
} from './tms-read-only-vps-deployment-candidate-detail-review-outcome-certification-view.service';

export type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_NOT_STARTED';

export type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealCategory =
  | 'DEPLOYMENT'
  | 'DOMAIN'
  | 'SERVER'
  | 'OPERATING_DB'
  | 'API_DB_WORKER'
  | 'SECRET_EXPOSURE'
  | 'SAFETY_LOCK';

export const NEXT_TASK_325_APPROVAL_PHRASE =
  'Task 325에서 TMS read-only VPS 배포 후보 Safety Audit Seal 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 324 VPS 후보 Safety Audit Seal 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem {
  sealId: string;
  sourceCertificationId: string;
  category: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealCategory;
  label: string;
  sourceStatus: string;
  sealStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_VIEW';
  taskId: 324;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 324;
  referenceTaskNumbers: readonly [323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
  vpsDeploymentCandidateSafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus;
  recommendedEnvironmentKey: string;
  recommendedEnvironmentLabel: string;
  vpsCandidateSafetySealed: true;
  safetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  deploymentSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  domainSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  serverSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  operatingDbSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  apiDbWorkerSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  secretExposureSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  safetySealSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealSummaryCard[];
  safetyAuditSealReady: boolean;
  safetyAuditSealPartialReady: boolean;
  safetyAuditSealBlocked: boolean;
  safetyAuditSealNotStarted: boolean;
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
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyVpsDeploymentCandidateSafetyAuditSeal: true;
  requiresSeparateTask325Approval: true;
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

function mapOutcomeCertificationStatusToSafetySealStatus(
  status: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
): TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_DETAIL_REVIEW_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_NOT_STARTED';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function makeSealItem(input: {
  sealId: string;
  sourceItem: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem;
  category: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealCategory;
  label: string;
  message: string;
}): TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem {
  return {
    sealId: input.sealId,
    sourceCertificationId: input.sourceItem.certificationId,
    category: input.category,
    label: input.label,
    sourceStatus: input.sourceItem.certificationStatus,
    sealStatus: input.sourceItem.certificationStatus,
    isReady: input.sourceItem.isReady,
    isPartialReady: input.sourceItem.isPartialReady,
    isBlocked: input.sourceItem.isBlocked,
    isNotStarted: input.sourceItem.isNotStarted,
    message: input.message,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView(input: {
  vpsDeploymentCandidateDetailReviewOutcomeCertification: {
    vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
    recommendedEnvironmentKey: string;
    recommendedEnvironmentLabel: string;
    vpsCandidateCertifiedForReview: boolean;
    requirementOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
    costOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
    securityOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
    backupOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
    domainHttpsOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
    operationRiskOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateDetailReviewOutcomeCertificationItem[];
  };
}): TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealView {
  const sourceVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification.vpsDeploymentCandidateDetailReviewOutcomeCertificationStatus;
  const vpsDeploymentCandidateSafetyAuditSealStatus =
    mapOutcomeCertificationStatusToSafetySealStatus(
      sourceVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    );

  const [requirementPrimary, requirementSecondary] =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification.requirementOutcomeCertificationItems;
  const [securityPrimary, securitySecondary] =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification.securityOutcomeCertificationItems;
  const [backupPrimary, backupSecondary] =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification.backupOutcomeCertificationItems;
  const [domainPrimary, domainSecondary] =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification.domainHttpsOutcomeCertificationItems;
  const [operationPrimary, operationSecondary] =
    input.vpsDeploymentCandidateDetailReviewOutcomeCertification.operationRiskOutcomeCertificationItems;

  const deploymentSafetySealItems = [
    makeSealItem({
      sealId: 'seal-deployment-not-started',
      sourceItem: operationSecondary,
      category: 'DEPLOYMENT',
      label: '실제 VPS 배포 미시작 봉인',
      message: 'Task 323 인증 이후에도 실제 VPS 배포는 시작되지 않았음을 read-only로 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-vps-not-converted-live',
      sourceItem: operationPrimary,
      category: 'DEPLOYMENT',
      label: 'VPS 후보의 실제 운영 전환 미수행 봉인',
      message: 'VPS 후보는 검토 단계에 머물며 실제 운영 배포 대상으로 전환되지 않았음을 봉인합니다.',
    }),
  ] as const;

  const domainSafetySealItems = [
    makeSealItem({
      sealId: 'seal-domain-https-unchanged',
      sourceItem: domainPrimary,
      category: 'DOMAIN',
      label: '도메인 / HTTPS 실제 연결 미수행 봉인',
      message: '도메인 연결 및 HTTPS 적용은 검토만 유지되고 실제 실행은 수행되지 않았음을 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-dns-ssl-portforwarding-unchanged',
      sourceItem: domainSecondary,
      category: 'DOMAIN',
      label: 'DNS / SSL / 포트포워딩 변경 없음 봉인',
      message: 'DNS, SSL 인증서, 포트포워딩 설정 변경이 없었음을 read-only로 봉인합니다.',
    }),
  ] as const;

  const serverSafetySealItems = [
    makeSealItem({
      sealId: 'seal-vps-server-not-created',
      sourceItem: requirementPrimary,
      category: 'SERVER',
      label: '실제 VPS 서버 생성 미수행 봉인',
      message: 'VPS 기본 사양 검토만 수행됐고 실제 서버 생성은 없었음을 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-vps-server-config-unchanged',
      sourceItem: requirementSecondary,
      category: 'SERVER',
      label: '실제 서버 / VPS 설정 변경 없음 봉인',
      message: '접근 경로와 운영 권한은 검토만 됐고 실제 서버/VPS 설정 변경은 없었음을 봉인합니다.',
    }),
  ] as const;

  const operatingDbSafetySealItems = [
    makeSealItem({
      sealId: 'seal-operating-db-unchanged',
      sourceItem: backupPrimary,
      category: 'OPERATING_DB',
      label: '운영 DB 연결 변경 없음 봉인',
      message: '운영 DB 백업 계획은 검토만 했고 실제 운영 DB 연결 변경은 없었음을 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-backup-rollback-readonly',
      sourceItem: backupSecondary,
      category: 'OPERATING_DB',
      label: '백업 / 롤백 검토 read-only 유지 봉인',
      message: '백업 및 롤백 경로 검토는 read-only 상태로 유지됐고 실제 복구 작업은 없었음을 봉인합니다.',
    }),
  ] as const;

  const apiDbWorkerSafetySealItems = [
    makeSealItem({
      sealId: 'seal-api-db-blocked',
      sourceItem: operationPrimary,
      category: 'API_DB_WORKER',
      label: 'Naver API 호출 / DB write 차단 유지 봉인',
      message: 'Naver API 호출과 DB write가 계속 차단된 상태였음을 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-worker-queue-adapter-blocked',
      sourceItem: operationSecondary,
      category: 'API_DB_WORKER',
      label: 'Worker / Queue / Adapter 차단 유지 봉인',
      message: 'Worker, Queue, Adapter 연결이 수행되지 않았고 계속 차단됐음을 봉인합니다.',
    }),
  ] as const;

  const secretExposureSafetySealItems = [
    makeSealItem({
      sealId: 'seal-secret-non-exposure',
      sourceItem: securitySecondary,
      category: 'SECRET_EXPOSURE',
      label: 'Token/Auth/Signature/Authorization 비노출 유지 봉인',
      message: 'Token/Auth/Signature/Authorization 값이 계속 비노출 상태였음을 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-raw-response-hidden',
      sourceItem: securityPrimary,
      category: 'SECRET_EXPOSURE',
      label: 'raw API response 비표시 / 비저장 유지 봉인',
      message: 'raw API response가 표시되거나 저장되지 않았음을 read-only로 봉인합니다.',
    }),
  ] as const;

  const safetyLockItems = [
    makeSealItem({
      sealId: 'seal-readonly-deployment-preparation',
      sourceItem: operationSecondary,
      category: 'SAFETY_LOCK',
      label: '배포 준비 read-only 유지 봉인',
      message: '배포 준비 상태는 여전히 read-only이며 실제 배포 작업으로 전환되지 않았음을 봉인합니다.',
    }),
    makeSealItem({
      sealId: 'seal-readonly-domain-preparation',
      sourceItem: domainSecondary,
      category: 'SAFETY_LOCK',
      label: '도메인 연결 read-only 유지 봉인',
      message: '도메인 연결 준비 상태는 여전히 read-only이며 실제 연결 작업이 없었음을 봉인합니다.',
    }),
  ] as const;

  const safetySealItems = [
    ...deploymentSafetySealItems,
    ...domainSafetySealItems,
    ...serverSafetySealItems,
    ...operatingDbSafetySealItems,
    ...apiDbWorkerSafetySealItems,
    ...secretExposureSafetySealItems,
    ...safetyLockItems,
  ] as const;

  const safetySealSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealSummaryCard[] = [
    {
      label: '안전 봉인 후보',
      value: input.vpsDeploymentCandidateDetailReviewOutcomeCertification.recommendedEnvironmentLabel,
      tone: input.vpsDeploymentCandidateDetailReviewOutcomeCertification.vpsCandidateCertifiedForReview
        ? 'positive'
        : 'warning',
    },
    {
      label: '봉인 항목',
      value: `${safetySealItems.length}개`,
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
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_VIEW',
    taskId: 324,
    taskName: 'TMS Read-Only VPS Deployment Candidate Safety Audit Seal Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Safety Audit Seal',
    description:
      'Task 323 VPS 배포 후보 상세 검토 결과 인증 이후의 안전 조건을 read-only로 봉인합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 324,
    referenceTaskNumbers: [323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateDetailReviewOutcomeCertificationStatus,
    vpsDeploymentCandidateSafetyAuditSealStatus,
    recommendedEnvironmentKey:
      input.vpsDeploymentCandidateDetailReviewOutcomeCertification.recommendedEnvironmentKey,
    recommendedEnvironmentLabel:
      input.vpsDeploymentCandidateDetailReviewOutcomeCertification.recommendedEnvironmentLabel,
    vpsCandidateSafetySealed: true,
    safetySealItems,
    deploymentSafetySealItems,
    domainSafetySealItems,
    serverSafetySealItems,
    operatingDbSafetySealItems,
    apiDbWorkerSafetySealItems,
    secretExposureSafetySealItems,
    safetySealSummaryCards,
    safetyAuditSealReady:
      vpsDeploymentCandidateSafetyAuditSealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_READY',
    safetyAuditSealPartialReady:
      vpsDeploymentCandidateSafetyAuditSealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_PARTIAL_READY',
    safetyAuditSealBlocked:
      vpsDeploymentCandidateSafetyAuditSealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_BLOCKED',
    safetyAuditSealNotStarted:
      vpsDeploymentCandidateSafetyAuditSealStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_NOT_STARTED',
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
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyVpsDeploymentCandidateSafetyAuditSeal: true,
    requiresSeparateTask325Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_325_APPROVAL_PHRASE,
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
