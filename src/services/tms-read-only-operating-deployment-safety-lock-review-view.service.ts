import {
  type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView,
} from './tms-read-only-operating-deployment-approval-packet-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlySafetyLockItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlySafetyLockCategory =
  | 'DEPLOYMENT_EXECUTION_LOCK'
  | 'VPS_SERVER_LOCK'
  | 'DOMAIN_DNS_HTTPS_LOCK'
  | 'OPERATING_DB_LOCK'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK'
  | 'NAVER_API_LOCK'
  | 'UI_ACTION_LOCK'
  | 'SECRET_EXPOSURE_LOCK';

export const NEXT_TASK_350_APPROVAL_PHRASE =
  'Task 350에서 TMS read-only 운영 배포 Safety Lock 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 배포 승인이나 실제 배포 실행이 아니라, Task 349 운영 배포 Safety Lock 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlySafetyLockItem {
  lockItemId: string;
  category: TmsReadOnlySafetyLockCategory;
  label: string;
  description: string;
  sourceTaskId: 348 | 349;
  sourceStatus: string;
  lockStatus: TmsReadOnlySafetyLockItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlySafetyLockSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentSafetyLockReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_VIEW';
  taskId: 349;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 349;
  referenceTaskNumbers: readonly [348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentApprovalPacketOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus;
  operatingDeploymentSafetyLockReviewStatus: TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus;
  safetyLockReviewReady: boolean;
  safetyLockReviewPartialReady: boolean;
  safetyLockReviewBlocked: boolean;
  safetyLockReviewNotStarted: boolean;
  safetyLockReviewStarted: true;
  safetyLockStillReadOnly: true;
  safetyLockItems: readonly TmsReadOnlySafetyLockItem[];
  deploymentExecutionLockItems: readonly TmsReadOnlySafetyLockItem[];
  vpsServerLockItems: readonly TmsReadOnlySafetyLockItem[];
  domainDnsHttpsLockItems: readonly TmsReadOnlySafetyLockItem[];
  operatingDbLockItems: readonly TmsReadOnlySafetyLockItem[];
  runtimeWorkerQueueAdapterLockItems: readonly TmsReadOnlySafetyLockItem[];
  naverApiLockItems: readonly TmsReadOnlySafetyLockItem[];
  uiActionLockItems: readonly TmsReadOnlySafetyLockItem[];
  secretExposureLockItems: readonly TmsReadOnlySafetyLockItem[];
  safetyLockSummaryCards: readonly TmsReadOnlySafetyLockSummaryCard[];
  readySafetyLockItems: readonly TmsReadOnlySafetyLockItem[];
  partialReadySafetyLockItems: readonly TmsReadOnlySafetyLockItem[];
  blockedSafetyLockItems: readonly TmsReadOnlySafetyLockItem[];
  notStartedSafetyLockItems: readonly TmsReadOnlySafetyLockItem[];
  deploymentExecutionLockItemCount: number;
  vpsServerLockItemCount: number;
  domainDnsHttpsLockItemCount: number;
  operatingDbLockItemCount: number;
  runtimeWorkerQueueAdapterLockItemCount: number;
  naverApiLockItemCount: number;
  uiActionLockItemCount: number;
  secretExposureLockItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalSafetyLockItemCount: number;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'SAFETY_LOCK_REVIEW_ONLY';
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
  approvalSubmissionStillBlocked: true;
  deploymentApprovalStillBlocked: true;
  deploymentExecutionStillBlocked: true;
  productionTransitionStillBlocked: true;
  vpsServerCreationStillBlocked: true;
  vpsConfigChangeStillBlocked: true;
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
  uiExecutionActionStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyOperatingDeploymentSafetyLockReview: true;
  requiresSeparateTask350Approval: true;
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

function mapOutcomeCertificationToSafetyLockStatus(
  status: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus,
): TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 348 Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function toItemStatus(
  overallStatus: TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus,
): TmsReadOnlySafetyLockItemStatus {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 349 Safety Lock Review status: ${_exhaustiveCheck}`);
    }
  }
}

function toStatusLabel(
  overallStatus: TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus,
): string {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 349 label status: ${_exhaustiveCheck}`);
    }
  }
}

function makeLockItem(input: {
  lockItemId: string;
  category: TmsReadOnlySafetyLockCategory;
  label: string;
  description: string;
  sourceTaskId: 348 | 349;
  sourceStatus: string;
  lockStatus: TmsReadOnlySafetyLockItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlySafetyLockItem {
  return {
    lockItemId: input.lockItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    sourceTaskId: input.sourceTaskId,
    sourceStatus: input.sourceStatus,
    lockStatus: input.lockStatus,
    isReady: input.lockStatus === 'READY',
    isPartialReady: input.lockStatus === 'PARTIAL_READY',
    isBlocked: input.lockStatus === 'BLOCKED',
    isNotStarted: input.lockStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

export function buildTmsReadOnlyOperatingDeploymentSafetyLockReviewView(input: {
  operatingDeploymentApprovalPacketOutcomeCertification: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentSafetyLockReviewView {
  const src = input.operatingDeploymentApprovalPacketOutcomeCertification;
  const srcStatus = src.operatingDeploymentApprovalPacketOutcomeCertificationStatus;

  const overallStatus = mapOutcomeCertificationToSafetyLockStatus(srcStatus);
  const itemStatus = toItemStatus(overallStatus);

  const deploymentExecutionLockItems = [
    makeLockItem({
      lockItemId: 'task-349-deployment-execution-not-started',
      category: 'DEPLOYMENT_EXECUTION_LOCK',
      label: '실제 배포 실행 없음',
      description: 'Task 348까지 실제 배포 실행이 수행되지 않았습니다. 배포 실행은 별도 승인 전까지 차단됩니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-production-transition-not-started',
      category: 'DEPLOYMENT_EXECUTION_LOCK',
      label: '실제 운영 전환 없음',
      description: 'Task 348까지 실제 운영 전환(production transition)이 수행되지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-deployment-approval-not-granted',
      category: 'DEPLOYMENT_EXECUTION_LOCK',
      label: '실제 배포 승인 없음',
      description: 'Task 348까지 실제 배포 승인이 제출되지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-deployment-blocked-until-approval',
      category: 'DEPLOYMENT_EXECUTION_LOCK',
      label: '배포 실행은 별도 승인 전까지 차단',
      description: '실제 배포 실행은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const vpsServerLockItems = [
    makeLockItem({
      lockItemId: 'task-349-vps-not-created',
      category: 'VPS_SERVER_LOCK',
      label: '실제 VPS 생성 없음',
      description: 'Task 348까지 실제 VPS 서버를 생성하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-vps-config-not-changed',
      category: 'VPS_SERVER_LOCK',
      label: '실제 VPS 설정 변경 없음',
      description: 'Task 348까지 실제 VPS 설정을 변경하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-server-config-not-changed',
      category: 'VPS_SERVER_LOCK',
      label: '실제 서버 설정 변경 없음',
      description: 'Task 348까지 실제 서버 설정(포트포워딩, nginx 등)을 변경하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-vps-blocked-until-approval',
      category: 'VPS_SERVER_LOCK',
      label: 'VPS 생성/설정은 별도 승인 전까지 차단',
      description: '실제 VPS 생성 및 설정 변경은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const domainDnsHttpsLockItems = [
    makeLockItem({
      lockItemId: 'task-349-domain-not-connected',
      category: 'DOMAIN_DNS_HTTPS_LOCK',
      label: '실제 도메인 연결 없음',
      description: 'Task 348까지 실제 도메인 연결을 수행하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-dns-record-not-changed',
      category: 'DOMAIN_DNS_HTTPS_LOCK',
      label: 'DNS 레코드 생성/수정 없음',
      description: 'DNS A레코드, CNAME 등 레코드 생성 및 수정이 이루어지지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-ssl-not-issued',
      category: 'DOMAIN_DNS_HTTPS_LOCK',
      label: 'HTTPS/SSL 인증서 발급 없음',
      description: 'SSL 인증서 발급 및 HTTPS 적용이 이루어지지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-domain-dns-https-blocked-until-approval',
      category: 'DOMAIN_DNS_HTTPS_LOCK',
      label: '도메인/DNS/HTTPS 작업은 별도 승인 전까지 차단',
      description: '도메인 연결, DNS 변경, SSL 발급은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const operatingDbLockItems = [
    makeLockItem({
      lockItemId: 'task-349-db-connection-not-changed',
      category: 'OPERATING_DB_LOCK',
      label: '실제 운영 DB 연결 변경 없음',
      description: 'Task 348까지 실제 운영 DB 연결을 변경하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-database-url-not-changed',
      category: 'OPERATING_DB_LOCK',
      label: 'DATABASE_URL 변경 없음',
      description: '.env/.env.local 수정 없이 DATABASE_URL이 변경되지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-db-write-not-performed',
      category: 'OPERATING_DB_LOCK',
      label: 'DB write 없음',
      description: 'DB write, upsert, update, delete가 수행되지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-db-backup-restore-rollback-migration-not-executed',
      category: 'OPERATING_DB_LOCK',
      label: 'DB 백업/복구/롤백/migration 실행 없음',
      description: 'DB 백업, 복구, 롤백, migration이 실행되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const runtimeWorkerQueueAdapterLockItems = [
    makeLockItem({
      lockItemId: 'task-349-runtime-not-configured',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK',
      label: '실제 Runtime 구성 없음',
      description: 'Task 348까지 실제 Runtime 구성을 수행하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-worker-not-started',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK',
      label: 'Worker 실행 없음',
      description: 'Task 348까지 실제 Worker를 실행하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-queue-not-enqueued',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK',
      label: 'Queue enqueue 없음',
      description: 'Task 348까지 실제 Queue enqueue를 수행하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-redis-not-connected',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK',
      label: 'Redis 운영 연결 변경 없음',
      description: '실제 Redis 운영 연결 변경이 이루어지지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-adapter-not-connected',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_LOCK',
      label: 'Adapter 연결 없음',
      description: '실제 Adapter 운영 연결이 이루어지지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const naverApiLockItems = [
    makeLockItem({
      lockItemId: 'task-349-naver-api-not-called',
      category: 'NAVER_API_LOCK',
      label: '실제 Naver API 호출 없음',
      description: 'Task 348까지 실제 Naver API 운영 호출을 수행하지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeLockItem({
      lockItemId: 'task-349-product-lookup-not-recalled',
      category: 'NAVER_API_LOCK',
      label: '상품 조회 API 재호출 없음',
      description: '상품 조회 API 재호출이 수행되지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-product-update-not-called',
      category: 'NAVER_API_LOCK',
      label: '상품 수정 API 호출 없음',
      description: '상품 수정 API 호출, 가격 변경, 재고 변경이 수행되지 않았습니다.',
      sourceTaskId: 348,
      sourceStatus: srcStatus,
      lockStatus: itemStatus,
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-api-blocked-until-approval',
      category: 'NAVER_API_LOCK',
      label: 'API 운영 호출은 별도 승인 전까지 차단',
      description: '실제 Naver API 운영 호출은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const uiActionLockItems = [
    makeLockItem({
      lockItemId: 'task-349-no-execution-button',
      category: 'UI_ACTION_LOCK',
      label: '실행 버튼 추가 없음',
      description: '실행 버튼, 실행 CTA가 이 화면에 추가되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-no-submit-action',
      category: 'UI_ACTION_LOCK',
      label: 'submit action 추가 없음',
      description: 'submit action 또는 submit form이 이 화면에 추가되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-no-post-api',
      category: 'UI_ACTION_LOCK',
      label: 'POST API 추가 없음',
      description: 'POST API가 이 화면에 추가되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-no-price-stock-change',
      category: 'UI_ACTION_LOCK',
      label: '가격/재고 변경 없음',
      description: '가격 변경, 재고 변경이 수행되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const secretExposureLockItems = [
    makeLockItem({
      lockItemId: 'task-349-token-auth-not-exposed',
      category: 'SECRET_EXPOSURE_LOCK',
      label: 'Token/Auth/Signature/Authorization 비노출 유지',
      description: 'Token, Auth, Signature, Authorization 값이 화면에 출력되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-raw-api-response-not-exposed',
      category: 'SECRET_EXPOSURE_LOCK',
      label: 'raw API response 비표시/비저장 유지',
      description: 'raw API response가 화면에 표시되거나 저장되지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-env-file-not-read-or-modified',
      category: 'SECRET_EXPOSURE_LOCK',
      label: '.env / .env.local 열람 또는 수정 없음',
      description: '.env, .env.local 파일을 열람하거나 수정하지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeLockItem({
      lockItemId: 'task-349-process-env-not-exposed',
      category: 'SECRET_EXPOSURE_LOCK',
      label: 'process.env 전체 출력 없음',
      description: 'process.env 전체 내용을 화면에 출력하지 않았습니다.',
      sourceTaskId: 349,
      sourceStatus: overallStatus,
      lockStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const allItems = [
    ...deploymentExecutionLockItems,
    ...vpsServerLockItems,
    ...domainDnsHttpsLockItems,
    ...operatingDbLockItems,
    ...runtimeWorkerQueueAdapterLockItems,
    ...naverApiLockItems,
    ...uiActionLockItems,
    ...secretExposureLockItems,
  ];

  const readySafetyLockItems = allItems.filter((i) => i.isReady);
  const partialReadySafetyLockItems = allItems.filter((i) => i.isPartialReady);
  const blockedSafetyLockItems = allItems.filter((i) => i.isBlocked);
  const notStartedSafetyLockItems = allItems.filter((i) => i.isNotStarted);

  const safetyLockSummaryCards: TmsReadOnlySafetyLockSummaryCard[] = [
    {
      label: 'Safety Lock 상태',
      value: toStatusLabel(overallStatus),
      tone:
        overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'
          ? 'positive'
          : overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '총 Lock 항목',
      value: `${allItems.length}개`,
      tone: 'neutral',
    },
    {
      label: '별도 승인 필요',
      value: `${allItems.filter((i) => i.requiresSeparateApproval).length}개`,
      tone: 'warning',
    },
    {
      label: 'READY 항목',
      value: `${readySafetyLockItems.length}개`,
      tone: 'positive',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_VIEW',
    taskId: 349,
    taskName: 'TMS Read-Only Operating Deployment Safety Lock Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 Safety Lock 검토',
    description:
      '이 패널은 운영 배포 승인 패킷 결과 인증 이후의 Safety Lock 상태를 read-only로 검토하는 화면입니다. 이 화면은 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 350은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 349,
    referenceTaskNumbers: [348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentApprovalPacketOutcomeCertificationStatus: srcStatus,
    operatingDeploymentSafetyLockReviewStatus: overallStatus,
    safetyLockReviewReady:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY',
    safetyLockReviewPartialReady:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY',
    safetyLockReviewBlocked:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED',
    safetyLockReviewNotStarted:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED',
    safetyLockReviewStarted: true,
    safetyLockStillReadOnly: true,
    safetyLockItems: allItems,
    deploymentExecutionLockItems,
    vpsServerLockItems,
    domainDnsHttpsLockItems,
    operatingDbLockItems,
    runtimeWorkerQueueAdapterLockItems,
    naverApiLockItems,
    uiActionLockItems,
    secretExposureLockItems,
    safetyLockSummaryCards,
    readySafetyLockItems,
    partialReadySafetyLockItems,
    blockedSafetyLockItems,
    notStartedSafetyLockItems,
    deploymentExecutionLockItemCount: deploymentExecutionLockItems.length,
    vpsServerLockItemCount: vpsServerLockItems.length,
    domainDnsHttpsLockItemCount: domainDnsHttpsLockItems.length,
    operatingDbLockItemCount: operatingDbLockItems.length,
    runtimeWorkerQueueAdapterLockItemCount: runtimeWorkerQueueAdapterLockItems.length,
    naverApiLockItemCount: naverApiLockItems.length,
    uiActionLockItemCount: uiActionLockItems.length,
    secretExposureLockItemCount: secretExposureLockItems.length,
    readyItemCount: readySafetyLockItems.length,
    partialReadyItemCount: partialReadySafetyLockItems.length,
    blockedItemCount: blockedSafetyLockItems.length,
    notStartedItemCount: notStartedSafetyLockItems.length,
    totalSafetyLockItemCount: allItems.length,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SAFETY_LOCK_REVIEW_ONLY',
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
    approvalSubmissionStillBlocked: true,
    deploymentApprovalStillBlocked: true,
    deploymentExecutionStillBlocked: true,
    productionTransitionStillBlocked: true,
    vpsServerCreationStillBlocked: true,
    vpsConfigChangeStillBlocked: true,
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
    uiExecutionActionStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentSafetyLockReview: true,
    requiresSeparateTask350Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_350_APPROVAL_PHRASE,
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
