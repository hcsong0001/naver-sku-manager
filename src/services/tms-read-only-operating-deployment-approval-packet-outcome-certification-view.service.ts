import {
  type TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus,
  type TmsReadOnlyOperatingDeploymentApprovalPacketReviewView,
} from './tms-read-only-operating-deployment-approval-packet-review-view.service';

export type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOutcomeCertificationItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyOutcomeCertificationCategory =
  | 'VPS_CREATION_APPROVAL_OUTCOME'
  | 'RUNTIME_CONFIGURATION_APPROVAL_OUTCOME'
  | 'OPERATING_DB_APPROVAL_OUTCOME'
  | 'DOMAIN_DNS_HTTPS_APPROVAL_OUTCOME'
  | 'WORKER_QUEUE_ADAPTER_APPROVAL_OUTCOME'
  | 'NAVER_API_APPROVAL_OUTCOME'
  | 'DEPLOYMENT_EXECUTION_APPROVAL_OUTCOME'
  | 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME';

export const NEXT_TASK_349_APPROVAL_PHRASE =
  'Task 349에서 TMS read-only 운영 배포 Safety Lock 검토 화면 구현을 승인합니다. 이 단계는 실제 배포 승인이나 실제 배포 실행이 아니라, Task 348 운영 배포 승인 패킷 결과 인증 이후에도 실제 배포 실행·도메인 연결·DNS 변경·SSL 발급·운영 DB 연결 변경·Runtime 구성·Worker 실행·Queue enqueue·Adapter 연결·Naver API 호출이 차단 상태인지 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyOutcomeCertificationItem {
  certificationItemId: string;
  sourceApprovalItemId: string;
  category: TmsReadOnlyOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: 347 | 348;
  sourceStatus: string;
  sourceApprovalReviewStatus: string;
  outcomeCertificationStatus: TmsReadOnlyOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualApprovalGranted: false;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOutcomeCertificationSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION_VIEW';
  taskId: 348;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 348;
  referenceTaskNumbers: readonly [347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentApprovalPacketReviewStatus: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus;
  operatingDeploymentApprovalPacketOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus;
  approvalPacketOutcomeCertified: true;
  approvalPacketItemsCertified: true;
  approvalPacketOutcomeCertificationStarted: true;
  approvalPacketOutcomeCertificationStillReadOnly: true;
  outcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  vpsCreationOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  runtimeConfigurationOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  operatingDbOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  domainDnsHttpsOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  workerQueueAdapterOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  naverApiOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  deploymentExecutionOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  preExecutionSafetyLockOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyOutcomeCertificationSummaryCard[];
  readyOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: readonly TmsReadOnlyOutcomeCertificationItem[];
  vpsCreationCertificationItemCount: number;
  runtimeConfigurationCertificationItemCount: number;
  operatingDbCertificationItemCount: number;
  domainDnsHttpsCertificationItemCount: number;
  workerQueueAdapterCertificationItemCount: number;
  naverApiCertificationItemCount: number;
  deploymentExecutionCertificationItemCount: number;
  preExecutionSafetyLockCertificationItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalOutcomeCertificationItemCount: number;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'APPROVAL_PACKET_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  actualApprovalPacketSubmitted: false;
  actualDeploymentApprovalGranted: false;
  actualDeploymentStarted: false;
  actualProductionTransitionStarted: false;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualDomainConnected: false;
  dnsChanged: false;
  dnsRecordCreatedOrModified: false;
  sslCertificateIssued: false;
  httpsEnabled: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  redisOperatingConnectionChanged: false;
  adapterConnected: false;
  operatingDbConnectionChanged: false;
  databaseUrlChanged: false;
  envFileReadOrModified: false;
  dbWritePerformed: false;
  dbBackupExecuted: false;
  dbRestoreExecuted: false;
  rollbackExecuted: false;
  migrationExecuted: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  approvalPacketStillDisplayOnly: true;
  approvalSubmissionStillBlocked: true;
  deploymentApprovalStillBlocked: true;
  deploymentExecutionStillBlocked: true;
  productionTransitionStillBlocked: true;
  runtimeConfigurationStillReadOnly: true;
  workerExecutionStillBlocked: true;
  queueEnqueueStillBlocked: true;
  adapterConnectionStillBlocked: true;
  domainConnectionStillReadOnly: true;
  dnsChangeStillBlocked: true;
  sslIssueStillBlocked: true;
  operatingDbConnectionStillReadOnly: true;
  databaseUrlChangeStillBlocked: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyOperatingDeploymentApprovalPacketOutcomeCertification: true;
  requiresSeparateTask349Approval: true;
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

function mapApprovalPacketToOutcomeCertificationStatus(
  status: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus,
): TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 347 Approval Packet Review status: ${_exhaustiveCheck}`);
    }
  }
}

function toItemStatus(
  overallStatus: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus,
): TmsReadOnlyOutcomeCertificationItemStatus {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 348 Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function toStatusLabel(
  overallStatus: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus,
): string {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY':
      return 'CERTIFIED_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED':
      return 'OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED':
      return 'OUTCOME_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 348 label status: ${_exhaustiveCheck}`);
    }
  }
}

function makeCertificationItem(input: {
  certificationItemId: string;
  sourceApprovalItemId: string;
  category: TmsReadOnlyOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceTaskId: 347 | 348;
  sourceStatus: string;
  sourceApprovalReviewStatus: string;
  outcomeCertificationStatus: TmsReadOnlyOutcomeCertificationItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyOutcomeCertificationItem {
  return {
    certificationItemId: input.certificationItemId,
    sourceApprovalItemId: input.sourceApprovalItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    sourceTaskId: input.sourceTaskId,
    sourceStatus: input.sourceStatus,
    sourceApprovalReviewStatus: input.sourceApprovalReviewStatus,
    outcomeCertificationStatus: input.outcomeCertificationStatus,
    isReady: input.outcomeCertificationStatus === 'READY',
    isPartialReady: input.outcomeCertificationStatus === 'PARTIAL_READY',
    isBlocked: input.outcomeCertificationStatus === 'BLOCKED',
    isNotStarted: input.outcomeCertificationStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualApprovalGranted: false,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

export function buildTmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView(input: {
  operatingDeploymentApprovalPacketReview: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
}): TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView {
  const src = input.operatingDeploymentApprovalPacketReview;
  const srcStatus = src.operatingDeploymentApprovalPacketReviewStatus;

  const overallStatus = mapApprovalPacketToOutcomeCertificationStatus(srcStatus);
  const itemStatus = toItemStatus(overallStatus);

  const vpsCreationOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-vps-approval-submission-none',
      sourceApprovalItemId: 'task-347-vps-not-created-yet',
      category: 'VPS_CREATION_APPROVAL_OUTCOME',
      label: '실제 VPS 생성 승인 제출 없음 인증',
      description: 'Task 347까지 실제 VPS 생성 승인을 제출하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-vps-not-created-certified',
      sourceApprovalItemId: 'task-347-vps-creation-separate-approval-needed',
      category: 'VPS_CREATION_APPROVAL_OUTCOME',
      label: '실제 VPS 생성 없음 인증',
      description: 'Task 347까지 실제 VPS 서버를 생성하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-vps-read-only-review-certified',
      sourceApprovalItemId: 'task-347-vps-cost-spec-review-needed',
      category: 'VPS_CREATION_APPROVAL_OUTCOME',
      label: 'VPS 생성 승인 항목은 read-only 검토 결과로만 인증',
      description: 'VPS 생성 승인 항목은 read-only 검토 결과만 인증됩니다. 실제 VPS 생성은 Task 349 이후 별도 승인 필요합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-vps-task349-approval-needed',
      sourceApprovalItemId: 'task-347-vps-approval-packet-read-only',
      category: 'VPS_CREATION_APPROVAL_OUTCOME',
      label: 'Task 349 전 별도 승인 필요 인증',
      description: '실제 VPS 생성은 Task 349 이후 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const runtimeConfigurationOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-runtime-approval-submission-none',
      sourceApprovalItemId: 'task-347-runtime-not-configured-yet',
      category: 'RUNTIME_CONFIGURATION_APPROVAL_OUTCOME',
      label: '실제 Runtime 구성 승인 제출 없음 인증',
      description: 'Task 347까지 실제 Runtime 구성 승인을 제출하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-runtime-not-configured-certified',
      sourceApprovalItemId: 'task-347-runtime-execution-method-approval',
      category: 'RUNTIME_CONFIGURATION_APPROVAL_OUTCOME',
      label: '실제 Runtime 구성 없음 인증',
      description: 'Task 347까지 실제 Runtime 구성을 수행하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-env-var-not-applied-certified',
      sourceApprovalItemId: 'task-347-env-var-application-approval',
      category: 'RUNTIME_CONFIGURATION_APPROVAL_OUTCOME',
      label: '환경변수 적용 없음 인증',
      description: '.env/.env.local 수정 없이 환경변수 적용이 이루어지지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-runtime-still-blocked-certified',
      sourceApprovalItemId: 'task-347-runtime-rollback-plan-check',
      category: 'RUNTIME_CONFIGURATION_APPROVAL_OUTCOME',
      label: 'Runtime 구성은 계속 차단 인증',
      description: 'Runtime 구성이 계속 차단 상태임을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const operatingDbOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-db-connection-not-changed-certified',
      sourceApprovalItemId: 'task-347-operating-db-connection-not-changed',
      category: 'OPERATING_DB_APPROVAL_OUTCOME',
      label: '실제 운영 DB 연결 변경 없음 인증',
      description: 'Task 347까지 실제 운영 DB 연결을 변경하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-database-url-not-changed-certified',
      sourceApprovalItemId: 'task-347-database-url-change-approval',
      category: 'OPERATING_DB_APPROVAL_OUTCOME',
      label: 'DATABASE_URL 변경 없음 인증',
      description: '.env/.env.local 수정 없이 DATABASE_URL 변경이 이루어지지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-db-write-not-performed-certified',
      sourceApprovalItemId: 'task-347-db-backup-restore-plan-check',
      category: 'OPERATING_DB_APPROVAL_OUTCOME',
      label: 'DB write 없음 인증',
      description: 'DB write, upsert, update, delete가 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-db-backup-restore-rollback-not-executed-certified',
      sourceApprovalItemId: 'task-347-db-write-still-blocked',
      category: 'OPERATING_DB_APPROVAL_OUTCOME',
      label: 'DB 백업/복구/롤백 실행 없음 인증',
      description: 'DB 백업, 복구, 롤백, migration이 실행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const domainDnsHttpsOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-domain-not-connected-certified',
      sourceApprovalItemId: 'task-347-domain-not-connected-yet',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL_OUTCOME',
      label: '실제 도메인 연결 없음 인증',
      description: 'Task 347까지 실제 도메인 연결을 수행하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-dns-record-not-changed-certified',
      sourceApprovalItemId: 'task-347-dns-record-change-approval',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL_OUTCOME',
      label: 'DNS 레코드 생성/수정 없음 인증',
      description: 'DNS A레코드, CNAME 등 레코드 생성 및 수정이 이루어지지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-ssl-not-issued-certified',
      sourceApprovalItemId: 'task-347-ssl-certificate-approval',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL_OUTCOME',
      label: 'HTTPS/SSL 인증서 발급 없음 인증',
      description: 'SSL 인증서 발급 및 HTTPS 적용이 이루어지지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-domain-validation-not-performed-certified',
      sourceApprovalItemId: 'task-347-domain-connection-validation-needed',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL_OUTCOME',
      label: '실제 연결 검증 없음 인증',
      description: '도메인 연결 후 검증 절차가 실제로 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const workerQueueAdapterOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-worker-not-started-certified',
      sourceApprovalItemId: 'task-347-worker-not-started-yet',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL_OUTCOME',
      label: '실제 Worker 실행 없음 인증',
      description: 'Task 347까지 실제 Worker를 실행하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-queue-not-enqueued-certified',
      sourceApprovalItemId: 'task-347-queue-enqueue-approval',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL_OUTCOME',
      label: 'Queue enqueue 없음 인증',
      description: '실제 Queue enqueue가 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-redis-not-connected-certified',
      sourceApprovalItemId: 'task-347-redis-operating-connection-approval',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL_OUTCOME',
      label: 'Redis 운영 연결 변경 없음 인증',
      description: '실제 Redis 운영 연결 변경이 이루어지지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-adapter-not-connected-certified',
      sourceApprovalItemId: 'task-347-adapter-connection-approval',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL_OUTCOME',
      label: 'Adapter 연결 없음 인증',
      description: '실제 Adapter 운영 연결이 이루어지지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const naverApiOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-naver-api-not-called-certified',
      sourceApprovalItemId: 'task-347-naver-api-not-called-yet',
      category: 'NAVER_API_APPROVAL_OUTCOME',
      label: '실제 Naver API 운영 호출 없음 인증',
      description: 'Task 347까지 실제 Naver API 운영 호출을 수행하지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-product-lookup-not-recalled-certified',
      sourceApprovalItemId: 'task-347-product-lookup-api-blocked',
      category: 'NAVER_API_APPROVAL_OUTCOME',
      label: '상품 조회 API 재호출 없음 인증',
      description: '상품 조회 API 재호출이 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-product-update-not-called-certified',
      sourceApprovalItemId: 'task-347-product-update-api-blocked',
      category: 'NAVER_API_APPROVAL_OUTCOME',
      label: '상품 수정 API 호출 없음 인증',
      description: '상품 수정 API 호출, 가격 변경, 재고 변경이 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-token-auth-not-exposed-certified',
      sourceApprovalItemId: 'task-347-naver-api-call-approval-required',
      category: 'NAVER_API_APPROVAL_OUTCOME',
      label: 'Token/Auth/Signature/Authorization 비노출 유지 인증',
      description: 'Token, Auth, Signature, Authorization 값이 화면에 출력되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const deploymentExecutionOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-deployment-approval-not-submitted-certified',
      sourceApprovalItemId: 'task-347-deployment-not-started-yet',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL_OUTCOME',
      label: '실제 배포 승인 없음 인증',
      description: 'Task 347까지 실제 배포 승인이 제출되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-deployment-not-started-certified',
      sourceApprovalItemId: 'task-347-production-transition-not-started',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL_OUTCOME',
      label: '실제 배포 실행 없음 인증',
      description: 'Task 347까지 실제 배포 실행이 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 347,
      sourceStatus: srcStatus,
      sourceApprovalReviewStatus: itemStatus,
      outcomeCertificationStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-production-transition-not-started-certified',
      sourceApprovalItemId: 'task-347-no-execution-button-added',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL_OUTCOME',
      label: '실제 운영 전환 없음 인증',
      description: '실제 운영 전환(production transition)이 수행되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-no-execution-button-certified',
      sourceApprovalItemId: 'task-347-deployment-execution-separate-approval',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL_OUTCOME',
      label: '실행 버튼 / submit / POST API 추가 없음 인증',
      description: '실행 버튼, submit action, POST API가 추가되지 않았음을 read-only로 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const preExecutionSafetyLockOutcomeCertificationItems = [
    makeCertificationItem({
      certificationItemId: 'task-348-safety-no-execution-button-certified',
      sourceApprovalItemId: 'task-347-safety-no-execution-button',
      category: 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME',
      label: '실행 버튼 추가 금지 유지 인증',
      description: '실행 버튼이 추가되지 않았음을 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-safety-no-submit-action-certified',
      sourceApprovalItemId: 'task-347-safety-no-submit-action',
      category: 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME',
      label: 'submit action 추가 금지 유지 인증',
      description: 'submit action 또는 POST API가 추가되지 않았음을 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-safety-no-post-api-certified',
      sourceApprovalItemId: 'task-347-safety-no-post-api',
      category: 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME',
      label: 'POST API 추가 금지 유지 인증',
      description: 'POST API가 추가되지 않았음을 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-safety-no-price-stock-change-certified',
      sourceApprovalItemId: 'task-347-safety-no-price-stock-change',
      category: 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME',
      label: '가격/재고 변경 금지 유지 인증',
      description: '가격 변경, 재고 변경이 수행되지 않았음을 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-safety-token-auth-hidden-certified',
      sourceApprovalItemId: 'task-347-safety-token-auth-hidden',
      category: 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME',
      label: 'Token/Auth/Signature/Authorization 비노출 유지 인증',
      description: 'Token, Auth, Signature, Authorization 값이 화면에 출력되지 않았음을 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeCertificationItem({
      certificationItemId: 'task-348-safety-raw-api-response-hidden-certified',
      sourceApprovalItemId: 'task-347-safety-raw-api-response-hidden',
      category: 'PRE_EXECUTION_SAFETY_LOCK_OUTCOME',
      label: 'raw API response 비표시/비저장 유지 인증',
      description: 'raw API response가 화면에 표시되거나 저장되지 않았음을 인증합니다.',
      sourceTaskId: 348,
      sourceStatus: overallStatus,
      sourceApprovalReviewStatus: 'READY',
      outcomeCertificationStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const allCategoryItems = [
    ...vpsCreationOutcomeCertificationItems,
    ...runtimeConfigurationOutcomeCertificationItems,
    ...operatingDbOutcomeCertificationItems,
    ...domainDnsHttpsOutcomeCertificationItems,
    ...workerQueueAdapterOutcomeCertificationItems,
    ...naverApiOutcomeCertificationItems,
    ...deploymentExecutionOutcomeCertificationItems,
    ...preExecutionSafetyLockOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = allCategoryItems.filter((i) => i.isReady);
  const partialReadyOutcomeCertificationItems = allCategoryItems.filter((i) => i.isPartialReady);
  const blockedOutcomeCertificationItems = allCategoryItems.filter((i) => i.isBlocked);
  const notStartedOutcomeCertificationItems = allCategoryItems.filter((i) => i.isNotStarted);

  const outcomeCertificationSummaryCards: TmsReadOnlyOutcomeCertificationSummaryCard[] = [
    {
      label: '결과 인증 상태',
      value: toStatusLabel(overallStatus),
      tone:
        overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'
          ? 'positive'
          : overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '총 인증 항목',
      value: `${allCategoryItems.length}개`,
      tone: 'neutral',
    },
    {
      label: '별도 승인 필요',
      value: `${allCategoryItems.filter((i) => i.requiresSeparateApproval).length}개`,
      tone: 'warning',
    },
    {
      label: 'Safety Lock 인증',
      value: `${preExecutionSafetyLockOutcomeCertificationItems.length}개`,
      tone: 'positive',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION_VIEW',
    taskId: 348,
    taskName: 'TMS Read-Only Operating Deployment Approval Packet Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 승인 패킷 결과 인증',
    description:
      '이 패널은 운영 배포 승인 패킷 검토 결과를 read-only로 인증하는 화면입니다. 이 화면은 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 349는 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 348,
    referenceTaskNumbers: [347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentApprovalPacketReviewStatus: srcStatus,
    operatingDeploymentApprovalPacketOutcomeCertificationStatus: overallStatus,
    approvalPacketOutcomeCertified: true,
    approvalPacketItemsCertified: true,
    approvalPacketOutcomeCertificationStarted: true,
    approvalPacketOutcomeCertificationStillReadOnly: true,
    outcomeCertificationItems: allCategoryItems,
    vpsCreationOutcomeCertificationItems,
    runtimeConfigurationOutcomeCertificationItems,
    operatingDbOutcomeCertificationItems,
    domainDnsHttpsOutcomeCertificationItems,
    workerQueueAdapterOutcomeCertificationItems,
    naverApiOutcomeCertificationItems,
    deploymentExecutionOutcomeCertificationItems,
    preExecutionSafetyLockOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    vpsCreationCertificationItemCount: vpsCreationOutcomeCertificationItems.length,
    runtimeConfigurationCertificationItemCount: runtimeConfigurationOutcomeCertificationItems.length,
    operatingDbCertificationItemCount: operatingDbOutcomeCertificationItems.length,
    domainDnsHttpsCertificationItemCount: domainDnsHttpsOutcomeCertificationItems.length,
    workerQueueAdapterCertificationItemCount: workerQueueAdapterOutcomeCertificationItems.length,
    naverApiCertificationItemCount: naverApiOutcomeCertificationItems.length,
    deploymentExecutionCertificationItemCount: deploymentExecutionOutcomeCertificationItems.length,
    preExecutionSafetyLockCertificationItemCount: preExecutionSafetyLockOutcomeCertificationItems.length,
    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalOutcomeCertificationItemCount: allCategoryItems.length,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_PACKET_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    actualApprovalPacketSubmitted: false,
    actualDeploymentApprovalGranted: false,
    actualDeploymentStarted: false,
    actualProductionTransitionStarted: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    redisOperatingConnectionChanged: false,
    adapterConnected: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    dbBackupExecuted: false,
    dbRestoreExecuted: false,
    rollbackExecuted: false,
    migrationExecuted: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    approvalPacketStillDisplayOnly: true,
    approvalSubmissionStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    adapterConnectionStillBlocked: true,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentApprovalPacketOutcomeCertification: true,
    requiresSeparateTask349Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_349_APPROVAL_PHRASE,
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
