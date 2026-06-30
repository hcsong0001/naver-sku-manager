import {
  type TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus,
  type TmsReadOnlyOperatingDbBackupRollbackPlanReviewView,
} from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';

export type TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus =
  | 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'
  | 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED';

export type TmsReadOnlyRuntimeWorkerQueueAdapterPlanItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyRuntimeWorkerQueueAdapterPlanCategory =
  | 'RUNTIME_OPERATING'
  | 'WORKER_OPERATING'
  | 'QUEUE_REDIS_OPERATING'
  | 'ADAPTER_OPERATING'
  | 'NAVER_API_OPERATING_CALL'
  | 'FAILURE_RECOVERY'
  | 'APPROVAL_REQUIREMENT'
  | 'SAFETY_LOCK';

export const NEXT_TASK_346_APPROVAL_PHRASE =
  'Task 346에서 TMS read-only 운영 배포 실행 전 최종 Readiness 검토 화면 구현을 승인합니다. 이 단계는 실제 배포 실행이 아니라, Task 342~345 운영 배포 설계·도메인/DNS/HTTPS·운영 DB/백업/롤백·Runtime/Worker/Queue/Adapter 운영 연결 계획을 종합하여 실제 배포 전 준비 상태를 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem {
  planItemId: string;
  category: TmsReadOnlyRuntimeWorkerQueueAdapterPlanCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyRuntimeWorkerQueueAdapterPlanItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyRuntimeWorkerQueueAdapterPlanSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView {
  status: 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_VIEW';
  taskId: 345;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 345;
  referenceTaskNumbers: readonly [344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDbBackupRollbackPlanReviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus;
  runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus;
  runtimeWorkerQueueAdapterPlanReviewReady: boolean;
  runtimeWorkerQueueAdapterPlanReviewPartialReady: boolean;
  runtimeWorkerQueueAdapterPlanReviewBlocked: boolean;
  runtimeWorkerQueueAdapterPlanReviewNotStarted: boolean;
  runtimeWorkerQueueAdapterPlanReviewStarted: true;
  runtimeWorkerQueueAdapterPlanStillReadOnly: true;
  runtimeOperatingPlanItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  workerOperatingPlanItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  queueRedisOperatingPlanItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  adapterOperatingPlanItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  naverApiOperatingCallPlanItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  runtimeFailureRecoveryPlanItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  runtimeApprovalRequirementItems: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem[];
  runtimeWorkerQueueAdapterSummaryCards: readonly TmsReadOnlyRuntimeWorkerQueueAdapterPlanSummaryCard[];
  recommendedRuntimeMode: 'RUNTIME_OPERATING_REVIEW_REQUIRED';
  recommendedWorkerMode: 'WORKER_OPERATING_REVIEW_REQUIRED';
  recommendedQueueMode: 'QUEUE_OPERATING_REVIEW_REQUIRED';
  recommendedRedisMode: 'REDIS_OPERATING_CONNECTION_REVIEW_REQUIRED';
  recommendedAdapterMode: 'ADAPTER_OPERATING_REVIEW_REQUIRED';
  recommendedNaverApiOperatingMode: 'NAVER_API_OPERATING_CALL_PENDING_APPROVAL';
  recommendedFailureRecoveryMode: 'RUNTIME_WORKER_QUEUE_ADAPTER_FAILURE_RECOVERY_PLAN_REQUIRED';
  runtimeOperatingPlanItemCount: number;
  workerOperatingPlanItemCount: number;
  queueRedisOperatingPlanItemCount: number;
  adapterOperatingPlanItemCount: number;
  naverApiOperatingCallPlanItemCount: number;
  runtimeFailureRecoveryPlanItemCount: number;
  runtimeApprovalRequirementItemCount: number;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  redisOperatingConnectionChanged: false;
  adapterConnected: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  operatingDbConnectionChanged: false;
  databaseUrlChanged: false;
  envFileReadOrModified: false;
  dbWritePerformed: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  httpsEnabled: false;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualProductionTransitionStarted: false;
  actualDeploymentStarted: false;
  runtimeConfigurationStillReadOnly: true;
  workerExecutionStillBlocked: true;
  queueEnqueueStillBlocked: true;
  redisConnectionStillReadOnly: true;
  adapterConnectionStillBlocked: true;
  naverApiCallStillBlocked: true;
  operatingDbConnectionStillReadOnly: true;
  databaseUrlChangeStillBlocked: true;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReview: true;
  requiresSeparateTask346Approval: true;
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

function mapOperatingDbBackupRollbackStatus(
  status: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus,
): TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY':
      return 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 344 Operating DB Backup Rollback Plan Review status: ${_exhaustiveCheck}`);
    }
  }
}

function mapPlanItemStatus(
  status: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
): TmsReadOnlyRuntimeWorkerQueueAdapterPlanItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Runtime/Worker/Queue/Adapter Operating Connection Plan Review status: ${_exhaustiveCheck}`);
    }
  }
}

function makePlanItem(input: {
  planItemId: string;
  category: TmsReadOnlyRuntimeWorkerQueueAdapterPlanCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyRuntimeWorkerQueueAdapterPlanItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyRuntimeWorkerQueueAdapterPlanReviewItem {
  return {
    planItemId: input.planItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    reviewStatus: input.reviewStatus,
    isReady: input.reviewStatus === 'READY',
    isPartialReady: input.reviewStatus === 'PARTIAL_READY',
    isBlocked: input.reviewStatus === 'BLOCKED',
    isNotStarted: input.reviewStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

function toStatusLabel(
  status: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
): string {
  switch (status) {
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Runtime/Worker/Queue/Adapter review label status: ${_exhaustiveCheck}`);
    }
  }
}

export function buildTmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView(input: {
  operatingDbBackupRollbackPlanReview: TmsReadOnlyOperatingDbBackupRollbackPlanReviewView;
}): TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView {
  const src = input.operatingDbBackupRollbackPlanReview;
  const runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus =
    mapOperatingDbBackupRollbackStatus(src.operatingDbBackupRollbackPlanReviewStatus);
  const reviewStatus = mapPlanItemStatus(
    runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
  );

  const runtimeOperatingPlanItems = [
    makePlanItem({
      planItemId: 'task-345-runtime-nextjs-mode-review',
      category: 'RUNTIME_OPERATING',
      label: 'Next.js 운영 Runtime 구성 방식 검토 필요',
      description: 'Next.js 운영 환경에서 standalone, server, edge 중 어떤 Runtime 방식으로 실행할지 계획이 필요합니다. 실제 구성은 별도 승인 후 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-runtime-app-execution-review',
      category: 'RUNTIME_OPERATING',
      label: '운영 서버에서 앱 실행 방식 검토 필요',
      description: 'PM2, systemd, Docker 등 어떤 방식으로 운영 서버에서 앱을 실행하고 유지할지 계획이 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-runtime-env-approval-required',
      category: 'RUNTIME_OPERATING',
      label: '환경변수 적용 전 별도 승인 필요',
      description: '운영 환경변수(NODE_ENV=production 포함) 적용 전 별도 명시 승인이 필요합니다. .env / .env.local 수정은 이번 단계에서 금지됩니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-runtime-not-configured-yet',
      category: 'RUNTIME_OPERATING',
      label: '실제 Runtime 구성은 아직 하지 않음',
      description: '이번 단계는 read-only 계획 검토이며 실제 Next.js Runtime 구성은 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const workerOperatingPlanItems = [
    makePlanItem({
      planItemId: 'task-345-worker-execution-review',
      category: 'WORKER_OPERATING',
      label: 'Worker 운영 실행 여부 검토 필요',
      description: '운영 환경에서 Worker를 상시 실행할지, 필요 시에만 실행할지 계획이 필요합니다. 실제 Worker 실행은 별도 승인 후 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-worker-start-condition-review',
      category: 'WORKER_OPERATING',
      label: 'Worker 시작 조건 검토 필요',
      description: 'Worker 시작 시 필요한 환경 조건, 의존성, 초기화 순서를 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-worker-failure-restart-procedure',
      category: 'WORKER_OPERATING',
      label: 'Worker 장애 시 중지/재시작 절차 필요',
      description: 'Worker 장애 발생 시 안전하게 중지하고 재시작하는 절차를 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-worker-not-started-yet',
      category: 'WORKER_OPERATING',
      label: '실제 Worker 실행은 아직 하지 않음',
      description: '이번 단계에서는 실제 Worker를 실행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const queueRedisOperatingPlanItems = [
    makePlanItem({
      planItemId: 'task-345-queue-config-review',
      category: 'QUEUE_REDIS_OPERATING',
      label: '운영 Queue 구성 검토 필요',
      description: '운영 환경에서 사용할 Queue 라이브러리와 구성 방식을 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-redis-connection-review',
      category: 'QUEUE_REDIS_OPERATING',
      label: '운영 Redis 연결 정보 검토 필요',
      description: '운영 Redis 연결 URL, 포트, 인증 정보를 안전하게 관리하는 방식을 계획해야 합니다. 실제 연결 변경은 별도 승인 후 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-queue-enqueue-condition-review',
      category: 'QUEUE_REDIS_OPERATING',
      label: 'Queue enqueue 조건 검토 필요',
      description: 'Queue에 작업을 enqueue하는 조건과 시점을 계획해야 합니다. 실제 enqueue는 별도 승인 후 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-queue-redis-not-connected-yet',
      category: 'QUEUE_REDIS_OPERATING',
      label: '실제 Queue enqueue 또는 Redis 운영 연결은 아직 하지 않음',
      description: '이번 단계에서는 실제 Queue enqueue나 Redis 운영 연결을 수행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const adapterOperatingPlanItems = [
    makePlanItem({
      planItemId: 'task-345-adapter-naver-api-connection-review',
      category: 'ADAPTER_OPERATING',
      label: 'Naver API Adapter 운영 연결 조건 검토 필요',
      description: 'Naver API Adapter를 운영 환경에서 연결하기 위한 사전 조건과 인증 방식을 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-adapter-mock-dry-live-boundary',
      category: 'ADAPTER_OPERATING',
      label: 'Mock / Dry-run / Live Adapter 경계 검토 필요',
      description: 'Mock Adapter에서 Dry-run, 최종적으로 Live Adapter로 전환하는 경계 조건을 명확히 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-adapter-live-approval-required',
      category: 'ADAPTER_OPERATING',
      label: 'Live Adapter 연결 전 별도 승인 필요',
      description: 'Live Adapter 연결은 별도 명시 승인 이후에만 가능합니다. 이번 단계에서는 연결하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-adapter-not-connected-yet',
      category: 'ADAPTER_OPERATING',
      label: '실제 Adapter 연결은 아직 하지 않음',
      description: '이번 단계에서는 실제 Adapter 연결을 수행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const naverApiOperatingCallPlanItems = [
    makePlanItem({
      planItemId: 'task-345-naver-api-call-approval-required',
      category: 'NAVER_API_OPERATING_CALL',
      label: 'Naver API 운영 호출은 별도 승인 필요',
      description: '운영 환경에서 Naver API를 실제 호출하려면 별도 명시 승인이 필요합니다. 이번 단계에서는 호출하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-product-lookup-api-blocked',
      category: 'NAVER_API_OPERATING_CALL',
      label: '상품 조회 API 재호출 금지 유지',
      description: '상품 조회 API 재호출은 이번 단계에서도 금지됩니다. 별도 승인 전까지 유지합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-product-update-api-blocked',
      category: 'NAVER_API_OPERATING_CALL',
      label: '상품 수정 API 호출 금지 유지',
      description: '상품 수정 API 호출은 이번 단계에서도 금지됩니다. 가격 변경, 재고 변경, 상품 정보 수정은 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-naver-api-not-called-yet',
      category: 'NAVER_API_OPERATING_CALL',
      label: '실제 Naver API 호출은 아직 하지 않음',
      description: '이번 단계에서는 실제 Naver API를 호출하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const runtimeFailureRecoveryPlanItems = [
    makePlanItem({
      planItemId: 'task-345-runtime-failure-recovery',
      category: 'FAILURE_RECOVERY',
      label: 'Runtime 장애 대응 계획 필요',
      description: '운영 Next.js Runtime 장애 발생 시 감지, 재시작, 알림 절차를 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-worker-failure-recovery',
      category: 'FAILURE_RECOVERY',
      label: 'Worker 장애 대응 계획 필요',
      description: 'Worker 프로세스 장애 발생 시 Queue 메시지 보존, 재처리, 알림 절차를 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-queue-redis-failure-recovery',
      category: 'FAILURE_RECOVERY',
      label: 'Queue / Redis 장애 대응 계획 필요',
      description: 'Queue 또는 Redis 장애 시 서비스 영향 최소화 방안과 복구 절차를 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-adapter-api-failure-recovery',
      category: 'FAILURE_RECOVERY',
      label: 'Adapter / API 장애 대응 계획 필요',
      description: 'Naver API Adapter 장애 또는 API 응답 오류 시 처리 방안과 복구 절차를 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-failure-recovery-not-executed-yet',
      category: 'FAILURE_RECOVERY',
      label: '실제 복구 실행은 아직 하지 않음',
      description: '이번 단계에서는 실제 복구 실행을 수행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const runtimeApprovalRequirementItems = [
    makePlanItem({
      planItemId: 'task-345-approval-runtime-config',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Runtime 운영 구성 승인 필요',
      description: '실제 Next.js Runtime 운영 구성은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-approval-worker-execution',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Worker 운영 실행 승인 필요',
      description: '실제 Worker 운영 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-approval-queue-redis-connection',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Queue / Redis 운영 연결 승인 필요',
      description: '실제 Queue 또는 Redis 운영 연결은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-approval-adapter-connection',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Adapter 운영 연결 승인 필요',
      description: '실제 Adapter 운영 연결은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-approval-naver-api-call',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Naver API 운영 호출 승인 필요',
      description: '실제 Naver API 운영 호출은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-approval-queue-enqueue',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Queue enqueue 승인 필요',
      description: '실제 Queue enqueue는 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-345-approval-failure-recovery',
      category: 'APPROVAL_REQUIREMENT',
      label: '장애 복구 절차 승인 필요',
      description: '실제 장애 복구 절차 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const runtimeWorkerQueueAdapterSummaryCards: TmsReadOnlyRuntimeWorkerQueueAdapterPlanSummaryCard[] = [
    {
      label: '계획 검토 상태',
      value: toStatusLabel(runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus),
      tone:
        runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus ===
        'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'
          ? 'positive'
          : runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus ===
              'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: 'Runtime / Worker 계획',
      value: 'REVIEW_REQUIRED',
      tone: 'warning',
    },
    {
      label: 'Queue / Adapter 계획',
      value: 'REVIEW_REQUIRED',
      tone: 'warning',
    },
    {
      label: '승인 항목 수',
      value: `${runtimeApprovalRequirementItems.length}개`,
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_VIEW',
    taskId: 345,
    taskName: 'TMS Read-Only Runtime Worker Queue Adapter Operating Connection Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only Runtime / Worker / Queue / Adapter 운영 연결 계획 검토',
    description:
      '이 패널은 Runtime / Worker / Queue / Adapter 운영 연결 계획을 read-only로 검토하는 화면입니다. 이 화면은 실제 Runtime 구성, Worker 실행, Queue enqueue, Redis 운영 연결, Adapter 연결, Naver API 호출 작업이 아닙니다. Task 346은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 345,
    referenceTaskNumbers: [344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDbBackupRollbackPlanReviewStatus: src.operatingDbBackupRollbackPlanReviewStatus,
    runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus,
    runtimeWorkerQueueAdapterPlanReviewReady:
      runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY',
    runtimeWorkerQueueAdapterPlanReviewPartialReady:
      runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
    runtimeWorkerQueueAdapterPlanReviewBlocked:
      runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED',
    runtimeWorkerQueueAdapterPlanReviewNotStarted:
      runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED',
    runtimeWorkerQueueAdapterPlanReviewStarted: true,
    runtimeWorkerQueueAdapterPlanStillReadOnly: true,
    runtimeOperatingPlanItems,
    workerOperatingPlanItems,
    queueRedisOperatingPlanItems,
    adapterOperatingPlanItems,
    naverApiOperatingCallPlanItems,
    runtimeFailureRecoveryPlanItems,
    runtimeApprovalRequirementItems,
    runtimeWorkerQueueAdapterSummaryCards,
    recommendedRuntimeMode: 'RUNTIME_OPERATING_REVIEW_REQUIRED',
    recommendedWorkerMode: 'WORKER_OPERATING_REVIEW_REQUIRED',
    recommendedQueueMode: 'QUEUE_OPERATING_REVIEW_REQUIRED',
    recommendedRedisMode: 'REDIS_OPERATING_CONNECTION_REVIEW_REQUIRED',
    recommendedAdapterMode: 'ADAPTER_OPERATING_REVIEW_REQUIRED',
    recommendedNaverApiOperatingMode: 'NAVER_API_OPERATING_CALL_PENDING_APPROVAL',
    recommendedFailureRecoveryMode: 'RUNTIME_WORKER_QUEUE_ADAPTER_FAILURE_RECOVERY_PLAN_REQUIRED',
    runtimeOperatingPlanItemCount: runtimeOperatingPlanItems.length,
    workerOperatingPlanItemCount: workerOperatingPlanItems.length,
    queueRedisOperatingPlanItemCount: queueRedisOperatingPlanItems.length,
    adapterOperatingPlanItemCount: adapterOperatingPlanItems.length,
    naverApiOperatingCallPlanItemCount: naverApiOperatingCallPlanItems.length,
    runtimeFailureRecoveryPlanItemCount: runtimeFailureRecoveryPlanItems.length,
    runtimeApprovalRequirementItemCount: runtimeApprovalRequirementItems.length,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    redisOperatingConnectionChanged: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    runtimeConfigurationStillReadOnly: true,
    workerExecutionStillBlocked: true,
    queueEnqueueStillBlocked: true,
    redisConnectionStillReadOnly: true,
    adapterConnectionStillBlocked: true,
    naverApiCallStillBlocked: true,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReview: true,
    requiresSeparateTask346Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_346_APPROVAL_PHRASE,
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
