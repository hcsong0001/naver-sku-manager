import {
  type TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
  type TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView,
} from './tms-read-only-operating-deployment-pre-execution-final-readiness-review-view.service';

export type TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED';

export type TmsReadOnlyApprovalPacketItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyApprovalPacketCategory =
  | 'VPS_CREATION_APPROVAL'
  | 'RUNTIME_CONFIGURATION_APPROVAL'
  | 'OPERATING_DB_APPROVAL'
  | 'DOMAIN_DNS_HTTPS_APPROVAL'
  | 'WORKER_QUEUE_ADAPTER_APPROVAL'
  | 'NAVER_API_APPROVAL'
  | 'DEPLOYMENT_EXECUTION_APPROVAL'
  | 'PRE_EXECUTION_SAFETY_LOCK';

export const NEXT_TASK_348_APPROVAL_PHRASE =
  'Task 348에서 TMS read-only 운영 배포 승인 패킷 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 배포 승인이나 실제 배포 실행이 아니라, Task 347 운영 배포 승인 패킷 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyApprovalPacketItem {
  approvalItemId: string;
  category: TmsReadOnlyApprovalPacketCategory;
  label: string;
  description: string;
  sourceTaskId: 346 | 347;
  sourceStatus: string;
  approvalReviewStatus: TmsReadOnlyApprovalPacketItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualApprovalGranted: false;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyApprovalPacketSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentApprovalPacketReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_VIEW';
  taskId: 347;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 347;
  referenceTaskNumbers: readonly [346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentPreExecutionFinalReadinessReviewStatus: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus;
  operatingDeploymentApprovalPacketReviewStatus: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus;
  approvalPacketReviewReady: boolean;
  approvalPacketReviewPartialReady: boolean;
  approvalPacketReviewBlocked: boolean;
  approvalPacketReviewNotStarted: boolean;
  approvalPacketReviewStarted: true;
  approvalPacketStillReadOnly: true;
  approvalPacketItems: readonly TmsReadOnlyApprovalPacketItem[];
  vpsCreationApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  runtimeConfigurationApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  operatingDbApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  domainDnsHttpsApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  workerQueueAdapterApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  naverApiApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  deploymentExecutionApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  preExecutionSafetyLockItems: readonly TmsReadOnlyApprovalPacketItem[];
  approvalPacketSummaryCards: readonly TmsReadOnlyApprovalPacketSummaryCard[];
  readyApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  partialReadyApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  blockedApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  notStartedApprovalItems: readonly TmsReadOnlyApprovalPacketItem[];
  vpsCreationApprovalItemCount: number;
  runtimeConfigurationApprovalItemCount: number;
  operatingDbApprovalItemCount: number;
  domainDnsHttpsApprovalItemCount: number;
  workerQueueAdapterApprovalItemCount: number;
  naverApiApprovalItemCount: number;
  deploymentExecutionApprovalItemCount: number;
  preExecutionSafetyLockItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalApprovalPacketItemCount: number;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'APPROVAL_PACKET_REVIEW_ONLY';
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
  isReadOnlyOperatingDeploymentApprovalPacketReview: true;
  requiresSeparateTask348Approval: true;
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

function mapFinalReadinessToApprovalPacketStatus(
  status: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
): TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 346 Final Readiness Review status: ${_exhaustiveCheck}`);
    }
  }
}

function toItemStatus(
  overallStatus: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus,
): TmsReadOnlyApprovalPacketItemStatus {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 347 Approval Packet Review status: ${_exhaustiveCheck}`);
    }
  }
}

function toStatusLabel(
  overallStatus: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus,
): string {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 347 Approval Packet label status: ${_exhaustiveCheck}`);
    }
  }
}

function makeApprovalItem(input: {
  approvalItemId: string;
  category: TmsReadOnlyApprovalPacketCategory;
  label: string;
  description: string;
  sourceTaskId: 346 | 347;
  sourceStatus: string;
  approvalReviewStatus: TmsReadOnlyApprovalPacketItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyApprovalPacketItem {
  return {
    approvalItemId: input.approvalItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    sourceTaskId: input.sourceTaskId,
    sourceStatus: input.sourceStatus,
    approvalReviewStatus: input.approvalReviewStatus,
    isReady: input.approvalReviewStatus === 'READY',
    isPartialReady: input.approvalReviewStatus === 'PARTIAL_READY',
    isBlocked: input.approvalReviewStatus === 'BLOCKED',
    isNotStarted: input.approvalReviewStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualApprovalGranted: false,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

export function buildTmsReadOnlyOperatingDeploymentApprovalPacketReviewView(input: {
  operatingDeploymentPreExecutionFinalReadinessReview: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView;
}): TmsReadOnlyOperatingDeploymentApprovalPacketReviewView {
  const src = input.operatingDeploymentPreExecutionFinalReadinessReview;
  const srcStatus = src.operatingDeploymentPreExecutionFinalReadinessReviewStatus;

  const overallStatus = mapFinalReadinessToApprovalPacketStatus(srcStatus);
  const itemStatus = toItemStatus(overallStatus);

  const vpsCreationApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-vps-not-created-yet',
      category: 'VPS_CREATION_APPROVAL',
      label: '실제 VPS 생성은 아직 하지 않음',
      description: '이번 단계까지 실제 VPS 서버를 생성하지 않았습니다. 승인 패킷은 read-only 검토입니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-vps-creation-separate-approval-needed',
      category: 'VPS_CREATION_APPROVAL',
      label: 'VPS 생성은 사용자 별도 승인 필요',
      description: '실제 VPS 서버 생성은 사용자의 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-vps-cost-spec-review-needed',
      category: 'VPS_CREATION_APPROVAL',
      label: 'VPS 생성 전 비용/사양/접근권한 검토 필요',
      description: 'VPS를 생성하기 전에 월 비용, 서버 사양, 접근 권한 설정을 사전에 검토해야 합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-vps-approval-packet-read-only',
      category: 'VPS_CREATION_APPROVAL',
      label: '승인 패킷은 제출이 아니라 read-only 검토임',
      description: '이 화면에서 VPS 생성 승인을 제출하지 않습니다. 승인 항목을 read-only로 검토하는 단계입니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const runtimeConfigurationApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-runtime-not-configured-yet',
      category: 'RUNTIME_CONFIGURATION_APPROVAL',
      label: '실제 Runtime 구성은 아직 하지 않음',
      description: '이번 단계까지 실제 Next.js Runtime 구성을 수행하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-runtime-execution-method-approval',
      category: 'RUNTIME_CONFIGURATION_APPROVAL',
      label: '운영 서버 실행 방식은 별도 승인 필요',
      description: 'PM2, systemd, Docker 등 운영 서버 실행 방식은 별도 명시 승인 이후에만 결정됩니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-env-var-application-approval',
      category: 'RUNTIME_CONFIGURATION_APPROVAL',
      label: '환경변수 적용은 별도 승인 필요',
      description: '운영 환경변수(NODE_ENV=production 포함) 적용은 별도 명시 승인 이후에만 가능합니다. .env/.env.local 수정은 금지됩니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-runtime-rollback-plan-check',
      category: 'RUNTIME_CONFIGURATION_APPROVAL',
      label: 'Runtime 구성 전 rollback 계획 확인 필요',
      description: 'Runtime 구성을 적용하기 전에 rollback 계획이 수립되어 있는지 확인해야 합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const operatingDbApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-operating-db-connection-not-changed',
      category: 'OPERATING_DB_APPROVAL',
      label: '실제 운영 DB 연결 변경은 아직 하지 않음',
      description: '이번 단계까지 실제 운영 DB 연결을 변경하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-database-url-change-approval',
      category: 'OPERATING_DB_APPROVAL',
      label: 'DATABASE_URL 변경은 별도 승인 필요',
      description: 'DATABASE_URL 변경은 별도 명시 승인 이후에만 가능합니다. .env/.env.local 수정은 금지됩니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-db-backup-restore-plan-check',
      category: 'OPERATING_DB_APPROVAL',
      label: 'DB 백업/복구 계획 확인 필요',
      description: '운영 DB 연결 변경 전에 DB 백업 및 복구 계획이 수립되어 있는지 확인해야 합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-db-write-still-blocked',
      category: 'OPERATING_DB_APPROVAL',
      label: 'DB write는 계속 차단',
      description: '이번 단계에서 DB write, upsert, update, delete는 수행하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const domainDnsHttpsApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-domain-not-connected-yet',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL',
      label: '실제 도메인 연결은 아직 하지 않음',
      description: '이번 단계까지 실제 도메인 연결을 수행하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-dns-record-change-approval',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL',
      label: 'DNS 레코드 생성/수정은 별도 승인 필요',
      description: 'DNS A레코드, CNAME 등 레코드 생성 및 수정은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-ssl-certificate-approval',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL',
      label: 'HTTPS/SSL 인증서 발급은 별도 승인 필요',
      description: 'SSL 인증서 발급 및 HTTPS 적용은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-domain-connection-validation-needed',
      category: 'DOMAIN_DNS_HTTPS_APPROVAL',
      label: '도메인 연결 후 검증 절차 필요',
      description: '도메인 연결 이후 DNS 전파 확인, HTTPS 접속 확인, 인증서 유효성 검증 절차가 필요합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const workerQueueAdapterApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-worker-not-started-yet',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL',
      label: '실제 Worker 실행은 아직 하지 않음',
      description: '이번 단계까지 실제 Worker를 실행하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-queue-enqueue-approval',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL',
      label: 'Queue enqueue는 별도 승인 필요',
      description: '실제 Queue enqueue는 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-redis-operating-connection-approval',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL',
      label: 'Redis 운영 연결은 별도 승인 필요',
      description: '실제 Redis 운영 연결 변경은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-adapter-connection-approval',
      category: 'WORKER_QUEUE_ADAPTER_APPROVAL',
      label: 'Adapter 운영 연결은 별도 승인 필요',
      description: '실제 Adapter 운영 연결은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const naverApiApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-naver-api-not-called-yet',
      category: 'NAVER_API_APPROVAL',
      label: '실제 Naver API 운영 호출은 아직 하지 않음',
      description: '이번 단계까지 실제 Naver API 운영 호출을 수행하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-product-lookup-api-blocked',
      category: 'NAVER_API_APPROVAL',
      label: '상품 조회 API 재호출 금지 유지',
      description: '상품 조회 API 재호출은 이번 단계에서도 금지됩니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-product-update-api-blocked',
      category: 'NAVER_API_APPROVAL',
      label: '상품 수정 API 호출 금지 유지',
      description: '상품 수정 API 호출, 가격 변경, 재고 변경은 이번 단계에서도 금지됩니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-naver-api-call-approval-required',
      category: 'NAVER_API_APPROVAL',
      label: 'API 호출 전 별도 승인 필요',
      description: '실제 Naver API 운영 호출은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const deploymentExecutionApprovalItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-deployment-not-started-yet',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL',
      label: '실제 배포 실행은 아직 하지 않음',
      description: '이번 단계까지 실제 운영 배포를 실행하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-production-transition-not-started',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL',
      label: '실제 운영 전환은 아직 하지 않음',
      description: '이번 단계까지 실제 운영 전환(production transition)을 수행하지 않았습니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-no-execution-button-added',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL',
      label: '실행 버튼은 추가하지 않음',
      description: '이 화면에는 실행 버튼, submit form, 실행 CTA를 추가하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-deployment-execution-separate-approval',
      category: 'DEPLOYMENT_EXECUTION_APPROVAL',
      label: '실제 배포 실행은 별도 승인 필요',
      description: '실제 운영 배포 실행은 사용자의 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: srcStatus,
      approvalReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const preExecutionSafetyLockItems = [
    makeApprovalItem({
      approvalItemId: 'task-347-safety-no-execution-button',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: '실행 버튼 추가 금지 유지',
      description: '이 화면에는 실행 버튼, submit form, 실행 CTA를 추가하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-safety-no-submit-action',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'submit action 추가 금지 유지',
      description: '이 화면에는 submit action 또는 POST API를 추가하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-safety-no-post-api',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'POST API 추가 금지 유지',
      description: '이 단계에서는 POST API를 추가하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-safety-no-price-stock-change',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: '가격/재고 변경 금지 유지',
      description: '가격 변경, 재고 변경은 이번 단계에서도 금지됩니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-safety-token-auth-hidden',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'Token/Auth/Signature/Authorization 비노출 유지',
      description: 'Token, Auth, Signature, Authorization 값은 화면에 출력하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeApprovalItem({
      approvalItemId: 'task-347-safety-raw-api-response-hidden',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'raw API response 비표시/비저장 유지',
      description: 'raw API response는 화면에 표시하거나 저장하지 않습니다.',
      sourceTaskId: 347,
      sourceStatus: overallStatus,
      approvalReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const allCategoryItems = [
    ...vpsCreationApprovalItems,
    ...runtimeConfigurationApprovalItems,
    ...operatingDbApprovalItems,
    ...domainDnsHttpsApprovalItems,
    ...workerQueueAdapterApprovalItems,
    ...naverApiApprovalItems,
    ...deploymentExecutionApprovalItems,
    ...preExecutionSafetyLockItems,
  ];

  const readyApprovalItems = allCategoryItems.filter((i) => i.isReady);
  const partialReadyApprovalItems = allCategoryItems.filter((i) => i.isPartialReady);
  const blockedApprovalItems = allCategoryItems.filter((i) => i.isBlocked);
  const notStartedApprovalItems = allCategoryItems.filter((i) => i.isNotStarted);

  const approvalPacketSummaryCards: TmsReadOnlyApprovalPacketSummaryCard[] = [
    {
      label: '승인 패킷 상태',
      value: toStatusLabel(overallStatus),
      tone:
        overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'
          ? 'positive'
          : overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '총 승인 항목',
      value: `${allCategoryItems.length}개`,
      tone: 'neutral',
    },
    {
      label: '별도 승인 필요',
      value: `${allCategoryItems.filter((i) => i.requiresSeparateApproval).length}개`,
      tone: 'warning',
    },
    {
      label: '안전 잠금 항목',
      value: `${preExecutionSafetyLockItems.length}개`,
      tone: 'positive',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_VIEW',
    taskId: 347,
    taskName: 'TMS Read-Only Operating Deployment Approval Packet Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 승인 패킷 검토',
    description:
      '이 패널은 운영 배포 승인 패킷을 read-only로 검토하는 화면입니다. 이 화면은 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 348은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 347,
    referenceTaskNumbers: [346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentPreExecutionFinalReadinessReviewStatus: srcStatus,
    operatingDeploymentApprovalPacketReviewStatus: overallStatus,
    approvalPacketReviewReady:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY',
    approvalPacketReviewPartialReady:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY',
    approvalPacketReviewBlocked:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED',
    approvalPacketReviewNotStarted:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED',
    approvalPacketReviewStarted: true,
    approvalPacketStillReadOnly: true,
    approvalPacketItems: allCategoryItems,
    vpsCreationApprovalItems,
    runtimeConfigurationApprovalItems,
    operatingDbApprovalItems,
    domainDnsHttpsApprovalItems,
    workerQueueAdapterApprovalItems,
    naverApiApprovalItems,
    deploymentExecutionApprovalItems,
    preExecutionSafetyLockItems,
    approvalPacketSummaryCards,
    readyApprovalItems,
    partialReadyApprovalItems,
    blockedApprovalItems,
    notStartedApprovalItems,
    vpsCreationApprovalItemCount: vpsCreationApprovalItems.length,
    runtimeConfigurationApprovalItemCount: runtimeConfigurationApprovalItems.length,
    operatingDbApprovalItemCount: operatingDbApprovalItems.length,
    domainDnsHttpsApprovalItemCount: domainDnsHttpsApprovalItems.length,
    workerQueueAdapterApprovalItemCount: workerQueueAdapterApprovalItems.length,
    naverApiApprovalItemCount: naverApiApprovalItems.length,
    deploymentExecutionApprovalItemCount: deploymentExecutionApprovalItems.length,
    preExecutionSafetyLockItemCount: preExecutionSafetyLockItems.length,
    readyItemCount: readyApprovalItems.length,
    partialReadyItemCount: partialReadyApprovalItems.length,
    blockedItemCount: blockedApprovalItems.length,
    notStartedItemCount: notStartedApprovalItems.length,
    totalApprovalPacketItemCount: allCategoryItems.length,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'APPROVAL_PACKET_REVIEW_ONLY',
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
    isReadOnlyOperatingDeploymentApprovalPacketReview: true,
    requiresSeparateTask348Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_348_APPROVAL_PHRASE,
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
