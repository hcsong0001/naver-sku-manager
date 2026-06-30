import {
  type TmsReadOnlyOperatingDeploymentDesignReviewStatus,
  type TmsReadOnlyOperatingDeploymentDesignReviewView,
} from './tms-read-only-operating-deployment-design-review-view.service';
import {
  type TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus,
  type TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView,
} from './tms-read-only-domain-dns-https-connection-plan-review-view.service';
import {
  type TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus,
  type TmsReadOnlyOperatingDbBackupRollbackPlanReviewView,
} from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';
import {
  type TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
  type TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView,
} from './tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.service';

export type TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED';

export type TmsReadOnlyPreExecutionReadinessItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyPreExecutionReadinessCategory =
  | 'OPERATING_DEPLOYMENT_DESIGN'
  | 'DOMAIN_DNS_HTTPS'
  | 'OPERATING_DB_BACKUP_ROLLBACK'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER'
  | 'FINAL_APPROVAL_REQUIREMENT'
  | 'PRE_EXECUTION_SAFETY_LOCK';

export const NEXT_TASK_347_APPROVAL_PHRASE =
  'Task 347에서 TMS read-only 운영 배포 승인 패킷 검토 화면 구현을 승인합니다. 이 단계는 실제 배포 실행이 아니라, Task 346 운영 배포 실행 전 최종 Readiness 결과를 바탕으로 실제 운영 배포 전에 필요한 승인 항목을 read-only 패킷으로 정리하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyPreExecutionReadinessItem {
  readinessItemId: string;
  category: TmsReadOnlyPreExecutionReadinessCategory;
  label: string;
  description: string;
  sourceTaskId: 342 | 343 | 344 | 345 | 346;
  sourceStatus: string;
  readinessStatus: TmsReadOnlyPreExecutionReadinessItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyPreExecutionReadinessSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_VIEW';
  taskId: 346;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 346;
  referenceTaskNumbers: readonly [345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentDesignReviewStatus: TmsReadOnlyOperatingDeploymentDesignReviewStatus;
  sourceDomainDnsHttpsConnectionPlanReviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus;
  sourceOperatingDbBackupRollbackPlanReviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus;
  sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus;
  operatingDeploymentPreExecutionFinalReadinessReviewStatus: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus;
  finalReadinessReady: boolean;
  finalReadinessPartialReady: boolean;
  finalReadinessBlocked: boolean;
  finalReadinessNotStarted: boolean;
  preExecutionFinalReadinessReviewStarted: true;
  preExecutionFinalReadinessStillReadOnly: true;
  operatingDeploymentDesignReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  domainDnsHttpsReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  operatingDbBackupRollbackReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  runtimeWorkerQueueAdapterReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  finalApprovalRequirementItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  preExecutionSafetyLockItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  preExecutionReadinessSummaryCards: readonly TmsReadOnlyPreExecutionReadinessSummaryCard[];
  readyReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  partialReadyReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  blockedReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  notStartedReadinessItems: readonly TmsReadOnlyPreExecutionReadinessItem[];
  operatingDeploymentDesignReadinessItemCount: number;
  domainDnsHttpsReadinessItemCount: number;
  operatingDbBackupRollbackReadinessItemCount: number;
  runtimeWorkerQueueAdapterReadinessItemCount: number;
  finalApprovalRequirementItemCount: number;
  preExecutionSafetyLockItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalReadinessItemCount: number;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'READ_ONLY_PRE_EXECUTION_REVIEW';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
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
  preExecutionReviewStillReadOnly: true;
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
  isReadOnlyOperatingDeploymentPreExecutionFinalReadinessReview: true;
  requiresSeparateTask347Approval: true;
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

function resolveOverallStatus(input: {
  designStatus: TmsReadOnlyOperatingDeploymentDesignReviewStatus;
  domainStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus;
  dbStatus: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus;
  runtimeStatus: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus;
}): TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus {
  const isBlocked =
    input.designStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED' ||
    input.domainStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED' ||
    input.dbStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED' ||
    input.runtimeStatus === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED';

  if (isBlocked) {
    return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED';
  }

  const isNotStarted =
    input.designStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED' ||
    input.domainStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED' ||
    input.dbStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED' ||
    input.runtimeStatus === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED';

  if (isNotStarted) {
    return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED';
  }

  const isPartialReady =
    input.designStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY' ||
    input.domainStatus === 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY' ||
    input.dbStatus === 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY' ||
    input.runtimeStatus === 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY';

  if (isPartialReady) {
    return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY';
  }

  return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY';
}

function toItemStatus(
  overallStatus: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
): TmsReadOnlyPreExecutionReadinessItemStatus {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 346 Final Readiness Review status: ${_exhaustiveCheck}`);
    }
  }
}

function toStatusLabel(
  overallStatus: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
): string {
  switch (overallStatus) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = overallStatus;
      throw new Error(`Unknown Task 346 Final Readiness label status: ${_exhaustiveCheck}`);
    }
  }
}

function makeReadinessItem(input: {
  readinessItemId: string;
  category: TmsReadOnlyPreExecutionReadinessCategory;
  label: string;
  description: string;
  sourceTaskId: 342 | 343 | 344 | 345 | 346;
  sourceStatus: string;
  readinessStatus: TmsReadOnlyPreExecutionReadinessItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyPreExecutionReadinessItem {
  return {
    readinessItemId: input.readinessItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    sourceTaskId: input.sourceTaskId,
    sourceStatus: input.sourceStatus,
    readinessStatus: input.readinessStatus,
    isReady: input.readinessStatus === 'READY',
    isPartialReady: input.readinessStatus === 'PARTIAL_READY',
    isBlocked: input.readinessStatus === 'BLOCKED',
    isNotStarted: input.readinessStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

export function buildTmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView(input: {
  operatingDeploymentDesignReview: TmsReadOnlyOperatingDeploymentDesignReviewView;
  domainDnsHttpsConnectionPlanReview: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView;
  operatingDbBackupRollbackPlanReview: TmsReadOnlyOperatingDbBackupRollbackPlanReviewView;
  runtimeWorkerQueueAdapterOperatingConnectionPlanReview: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView;
}): TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView {
  const designStatus = input.operatingDeploymentDesignReview.operatingDeploymentDesignReviewStatus;
  const domainStatus = input.domainDnsHttpsConnectionPlanReview.domainDnsHttpsConnectionPlanReviewStatus;
  const dbStatus = input.operatingDbBackupRollbackPlanReview.operatingDbBackupRollbackPlanReviewStatus;
  const runtimeStatus =
    input.runtimeWorkerQueueAdapterOperatingConnectionPlanReview
      .runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus;

  const overallStatus = resolveOverallStatus({ designStatus, domainStatus, dbStatus, runtimeStatus });
  const itemStatus = toItemStatus(overallStatus);

  const operatingDeploymentDesignReadinessItems = [
    makeReadinessItem({
      readinessItemId: 'task-346-design-vps-candidate-review-done',
      category: 'OPERATING_DEPLOYMENT_DESIGN',
      label: 'VPS 운영 배포 후보 검토 완료',
      description: 'Task 342에서 VPS 운영 배포 후보를 검토하였습니다. 실제 VPS 생성은 아직 하지 않습니다.',
      sourceTaskId: 342,
      sourceStatus: designStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-design-nas-backup-role-confirmed',
      category: 'OPERATING_DEPLOYMENT_DESIGN',
      label: 'NAS는 백업/보조 인프라 후보로 유지',
      description: 'NAS는 운영 배포 대상이 아니라 백업·보조 인프라 후보로 유지하는 것으로 검토되었습니다.',
      sourceTaskId: 342,
      sourceStatus: designStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-design-office-home-pc-not-target',
      category: 'OPERATING_DEPLOYMENT_DESIGN',
      label: '사무실 PC/집 PC는 운영 배포 대상이 아님',
      description: '사무실 PC와 집 PC는 운영 배포 대상이 아닌 것으로 검토되었습니다.',
      sourceTaskId: 342,
      sourceStatus: designStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-design-vps-not-created-yet',
      category: 'OPERATING_DEPLOYMENT_DESIGN',
      label: '실제 VPS 생성은 아직 하지 않음',
      description: '이번 단계까지 실제 VPS 생성은 수행하지 않았습니다. 별도 승인 후 진행합니다.',
      sourceTaskId: 342,
      sourceStatus: designStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const domainDnsHttpsReadinessItems = [
    makeReadinessItem({
      readinessItemId: 'task-346-domain-connection-method-reviewed',
      category: 'DOMAIN_DNS_HTTPS',
      label: '도메인 연결 방식 검토 완료',
      description: 'Task 343에서 도메인 연결 방식을 검토하였습니다. 실제 도메인 연결은 아직 하지 않습니다.',
      sourceTaskId: 343,
      sourceStatus: domainStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-dns-record-plan-reviewed',
      category: 'DOMAIN_DNS_HTTPS',
      label: 'DNS 레코드 계획 검토 완료',
      description: 'Task 343에서 DNS 레코드 계획을 검토하였습니다. 실제 DNS 변경은 아직 하지 않습니다.',
      sourceTaskId: 343,
      sourceStatus: domainStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-https-ssl-plan-reviewed',
      category: 'DOMAIN_DNS_HTTPS',
      label: 'HTTPS/SSL 계획 검토 완료',
      description: 'Task 343에서 HTTPS/SSL 적용 계획을 검토하였습니다. 실제 SSL 발급은 아직 하지 않습니다.',
      sourceTaskId: 343,
      sourceStatus: domainStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-domain-dns-ssl-not-applied-yet',
      category: 'DOMAIN_DNS_HTTPS',
      label: '실제 도메인 연결 / DNS 변경 / SSL 발급은 아직 하지 않음',
      description: '이번 단계까지 실제 도메인 연결, DNS 변경, SSL 발급은 수행하지 않았습니다.',
      sourceTaskId: 343,
      sourceStatus: domainStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const operatingDbBackupRollbackReadinessItems = [
    makeReadinessItem({
      readinessItemId: 'task-346-db-separation-plan-reviewed',
      category: 'OPERATING_DB_BACKUP_ROLLBACK',
      label: '운영 DB 분리 계획 검토 완료',
      description: 'Task 344에서 운영 DB 분리 계획을 검토하였습니다. 실제 운영 DB 연결 변경은 아직 하지 않습니다.',
      sourceTaskId: 344,
      sourceStatus: dbStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-db-url-change-approval-required',
      category: 'OPERATING_DB_BACKUP_ROLLBACK',
      label: 'DATABASE_URL 변경은 별도 승인 필요',
      description: 'DATABASE_URL 변경은 별도 명시 승인 이후에만 가능합니다. 이번 단계에서는 변경하지 않습니다.',
      sourceTaskId: 344,
      sourceStatus: dbStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-backup-restore-rollback-plan-reviewed',
      category: 'OPERATING_DB_BACKUP_ROLLBACK',
      label: '백업 / 복구 / 롤백 계획 검토 완료',
      description: 'Task 344에서 DB 백업·복구·롤백 계획을 검토하였습니다. 실제 실행은 아직 하지 않습니다.',
      sourceTaskId: 344,
      sourceStatus: dbStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-db-write-backup-restore-rollback-not-done',
      category: 'OPERATING_DB_BACKUP_ROLLBACK',
      label: '실제 운영 DB 연결 변경 / DB write / 백업 / 복구 / 롤백은 아직 하지 않음',
      description: '이번 단계까지 실제 운영 DB 연결 변경, DB write, 백업, 복구, 롤백은 수행하지 않았습니다.',
      sourceTaskId: 344,
      sourceStatus: dbStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const runtimeWorkerQueueAdapterReadinessItems = [
    makeReadinessItem({
      readinessItemId: 'task-346-runtime-config-plan-reviewed',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER',
      label: 'Runtime 운영 구성 계획 검토 완료',
      description: 'Task 345에서 Next.js Runtime 운영 구성 계획을 검토하였습니다. 실제 Runtime 구성은 아직 하지 않습니다.',
      sourceTaskId: 345,
      sourceStatus: runtimeStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-worker-execution-plan-reviewed',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER',
      label: 'Worker 운영 실행 계획 검토 완료',
      description: 'Task 345에서 Worker 운영 실행 계획을 검토하였습니다. 실제 Worker 실행은 아직 하지 않습니다.',
      sourceTaskId: 345,
      sourceStatus: runtimeStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-queue-redis-plan-reviewed',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER',
      label: 'Queue / Redis 운영 연결 계획 검토 완료',
      description: 'Task 345에서 Queue / Redis 운영 연결 계획을 검토하였습니다. 실제 연결은 아직 하지 않습니다.',
      sourceTaskId: 345,
      sourceStatus: runtimeStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-adapter-naver-api-plan-reviewed',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER',
      label: 'Adapter / Naver API 운영 호출 계획 검토 완료',
      description: 'Task 345에서 Adapter 연결 및 Naver API 운영 호출 계획을 검토하였습니다. 실제 호출은 아직 하지 않습니다.',
      sourceTaskId: 345,
      sourceStatus: runtimeStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-runtime-worker-queue-adapter-not-executed',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER',
      label: '실제 Runtime 구성 / Worker 실행 / Queue enqueue / Adapter 연결 / API 호출은 아직 하지 않음',
      description: '이번 단계까지 실제 Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, Naver API 호출은 수행하지 않았습니다.',
      sourceTaskId: 345,
      sourceStatus: runtimeStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const finalApprovalRequirementItems = [
    makeReadinessItem({
      readinessItemId: 'task-346-approval-vps-creation',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 VPS 생성 승인 필요',
      description: '실제 VPS 서버 생성은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-approval-runtime-config',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 Runtime 구성 승인 필요',
      description: '실제 Next.js Runtime 운영 구성은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-approval-operating-db-connection',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 운영 DB 연결 변경 승인 필요',
      description: '실제 운영 DB 연결 변경 및 DATABASE_URL 수정은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-approval-domain-dns-https',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 도메인/DNS/HTTPS 연결 승인 필요',
      description: '실제 도메인 연결, DNS 레코드 변경, SSL 인증서 발급은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-approval-worker-queue-adapter',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 Worker/Queue/Adapter 운영 연결 승인 필요',
      description: '실제 Worker 실행, Queue enqueue, Redis 연결, Adapter 연결은 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-approval-naver-api-call',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 Naver API 운영 호출 승인 필요',
      description: '실제 Naver API 운영 호출은 별도 명시 승인 이후에만 가능합니다. 상품 조회 API 재호출, 상품 수정 API 호출도 금지됩니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-approval-actual-deployment',
      category: 'FINAL_APPROVAL_REQUIREMENT',
      label: '실제 운영 배포 실행 승인 필요',
      description: '실제 운영 배포 실행은 별도 명시 승인 이후에만 가능합니다. 이번 단계는 read-only 최종 Readiness 검토입니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const preExecutionSafetyLockItems = [
    makeReadinessItem({
      readinessItemId: 'task-346-safety-no-execution-button',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: '실행 버튼 추가 금지 유지',
      description: '이 화면에는 실행 버튼, submit form, 실행 CTA를 추가하지 않습니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-safety-no-submit-action',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'submit action 추가 금지 유지',
      description: '이 화면에는 submit action 또는 POST API를 추가하지 않습니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-safety-no-post-api',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'POST API 추가 금지 유지',
      description: '이 단계에서는 POST API를 추가하지 않습니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-safety-no-price-stock-change',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: '가격/재고 변경 금지 유지',
      description: '가격 변경, 재고 변경은 이번 단계에서도 금지됩니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-safety-token-auth-hidden',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'Token/Auth/Signature/Authorization 비노출 유지',
      description: 'Token, Auth, Signature, Authorization 값은 화면에 출력하지 않습니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeReadinessItem({
      readinessItemId: 'task-346-safety-raw-api-response-hidden',
      category: 'PRE_EXECUTION_SAFETY_LOCK',
      label: 'raw API response 비표시/비저장 유지',
      description: 'raw API response는 화면에 표시하거나 저장하지 않습니다.',
      sourceTaskId: 346,
      sourceStatus: overallStatus,
      readinessStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const allCategoryItems = [
    ...operatingDeploymentDesignReadinessItems,
    ...domainDnsHttpsReadinessItems,
    ...operatingDbBackupRollbackReadinessItems,
    ...runtimeWorkerQueueAdapterReadinessItems,
    ...finalApprovalRequirementItems,
    ...preExecutionSafetyLockItems,
  ];

  const readyReadinessItems = allCategoryItems.filter((i) => i.isReady);
  const partialReadyReadinessItems = allCategoryItems.filter((i) => i.isPartialReady);
  const blockedReadinessItems = allCategoryItems.filter((i) => i.isBlocked);
  const notStartedReadinessItems = allCategoryItems.filter((i) => i.isNotStarted);

  const preExecutionReadinessSummaryCards: TmsReadOnlyPreExecutionReadinessSummaryCard[] = [
    {
      label: '최종 Readiness 상태',
      value: toStatusLabel(overallStatus),
      tone:
        overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'
          ? 'positive'
          : overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '검토 Task 수',
      value: '4개 (342~345)',
      tone: 'neutral',
    },
    {
      label: '최종 승인 필요 항목',
      value: `${finalApprovalRequirementItems.length}개`,
      tone: 'warning',
    },
    {
      label: '안전 잠금 항목',
      value: `${preExecutionSafetyLockItems.length}개`,
      tone: 'positive',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_VIEW',
    taskId: 346,
    taskName: 'TMS Read-Only Operating Deployment Pre-Execution Final Readiness Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 실행 전 최종 Readiness 검토',
    description:
      '이 패널은 운영 배포 실행 전 최종 Readiness를 read-only로 검토하는 화면입니다. 이 화면은 실제 배포 실행, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 발급, 운영 DB 연결 변경 작업이 아닙니다. Task 347은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 346,
    referenceTaskNumbers: [345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentDesignReviewStatus: designStatus,
    sourceDomainDnsHttpsConnectionPlanReviewStatus: domainStatus,
    sourceOperatingDbBackupRollbackPlanReviewStatus: dbStatus,
    sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: runtimeStatus,
    operatingDeploymentPreExecutionFinalReadinessReviewStatus: overallStatus,
    finalReadinessReady:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY',
    finalReadinessPartialReady:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY',
    finalReadinessBlocked:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED',
    finalReadinessNotStarted:
      overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED',
    preExecutionFinalReadinessReviewStarted: true,
    preExecutionFinalReadinessStillReadOnly: true,
    operatingDeploymentDesignReadinessItems,
    domainDnsHttpsReadinessItems,
    operatingDbBackupRollbackReadinessItems,
    runtimeWorkerQueueAdapterReadinessItems,
    finalApprovalRequirementItems,
    preExecutionSafetyLockItems,
    preExecutionReadinessSummaryCards,
    readyReadinessItems,
    partialReadyReadinessItems,
    blockedReadinessItems,
    notStartedReadinessItems,
    operatingDeploymentDesignReadinessItemCount: operatingDeploymentDesignReadinessItems.length,
    domainDnsHttpsReadinessItemCount: domainDnsHttpsReadinessItems.length,
    operatingDbBackupRollbackReadinessItemCount: operatingDbBackupRollbackReadinessItems.length,
    runtimeWorkerQueueAdapterReadinessItemCount: runtimeWorkerQueueAdapterReadinessItems.length,
    finalApprovalRequirementItemCount: finalApprovalRequirementItems.length,
    preExecutionSafetyLockItemCount: preExecutionSafetyLockItems.length,
    readyItemCount: readyReadinessItems.length,
    partialReadyItemCount: partialReadyReadinessItems.length,
    blockedItemCount: blockedReadinessItems.length,
    notStartedItemCount: notStartedReadinessItems.length,
    totalReadinessItemCount: allCategoryItems.length,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'READ_ONLY_PRE_EXECUTION_REVIEW',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
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
    preExecutionReviewStillReadOnly: true,
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
    isReadOnlyOperatingDeploymentPreExecutionFinalReadinessReview: true,
    requiresSeparateTask347Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_347_APPROVAL_PHRASE,
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
