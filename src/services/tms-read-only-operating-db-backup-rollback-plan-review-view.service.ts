import {
  type TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus,
  type TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView,
} from './tms-read-only-domain-dns-https-connection-plan-review-view.service';

export type TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDbBackupRollbackPlanItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyOperatingDbBackupRollbackPlanCategory =
  | 'OPERATING_DB_SEPARATION'
  | 'OPERATING_DB_CONNECTION'
  | 'DB_BACKUP'
  | 'DB_RESTORE'
  | 'CODE_ROLLBACK'
  | 'DEPLOYMENT_FAILURE_RECOVERY'
  | 'APPROVAL_REQUIREMENT'
  | 'SAFETY_LOCK';

export const NEXT_TASK_345_APPROVAL_PHRASE =
  'Task 345에서 TMS read-only Runtime / Worker / Queue / Adapter 운영 연결 계획 검토 화면 구현을 승인합니다. 이 단계는 실제 Runtime 구성이나 Worker 실행이 아니라, 운영 배포 전 Next.js Runtime, Worker, Queue, Adapter 운영 연결 계획을 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem {
  planItemId: string;
  category: TmsReadOnlyOperatingDbBackupRollbackPlanCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDbBackupRollbackPlanSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDbBackupRollbackPlanReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_VIEW';
  taskId: 344;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 344;
  referenceTaskNumbers: readonly [343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceDomainDnsHttpsConnectionPlanReviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus;
  operatingDbBackupRollbackPlanReviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus;
  operatingDbBackupRollbackPlanReviewReady: boolean;
  operatingDbBackupRollbackPlanReviewPartialReady: boolean;
  operatingDbBackupRollbackPlanReviewBlocked: boolean;
  operatingDbBackupRollbackPlanReviewNotStarted: boolean;
  operatingDbBackupRollbackPlanReviewStarted: true;
  operatingDbBackupRollbackPlanStillReadOnly: true;
  operatingDbSeparationPlanItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  operatingDbConnectionPlanItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  dbBackupPlanItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  dbRestorePlanItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  codeRollbackPlanItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  deploymentFailureRecoveryPlanItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  dbApprovalRequirementItems: readonly TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem[];
  operatingDbBackupRollbackSummaryCards: readonly TmsReadOnlyOperatingDbBackupRollbackPlanSummaryCard[];
  recommendedOperatingDbMode: 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED';
  recommendedDatabaseUrlHandlingMode: 'DATABASE_URL_CHANGE_PENDING_APPROVAL';
  recommendedDbBackupMode: 'DB_BACKUP_PLAN_REQUIRED';
  recommendedDbRestoreMode: 'DB_RESTORE_PLAN_REQUIRED';
  recommendedCodeRollbackMode: 'GIT_ROLLBACK_PLAN_REQUIRED';
  recommendedDeploymentFailureRecoveryMode: 'DEPLOYMENT_FAILURE_RECOVERY_PLAN_REQUIRED';
  recommendedEnvSecretHandlingMode: 'ENV_SECRET_REVIEW_REQUIRED_WITHOUT_EXPOSURE';
  operatingDbSeparationPlanItemCount: number;
  operatingDbConnectionPlanItemCount: number;
  dbBackupPlanItemCount: number;
  dbRestorePlanItemCount: number;
  codeRollbackPlanItemCount: number;
  deploymentFailureRecoveryPlanItemCount: number;
  dbApprovalRequirementItemCount: number;
  operatingDbConnectionChanged: false;
  databaseUrlChanged: false;
  envFileReadOrModified: false;
  dbWritePerformed: false;
  dbBackupExecuted: false;
  dbRestoreExecuted: false;
  rollbackExecuted: false;
  migrationExecuted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  dnsRecordCreatedOrModified: false;
  sslCertificateIssued: false;
  httpsEnabled: false;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualProductionTransitionStarted: false;
  actualDeploymentStarted: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  operatingDbConnectionStillReadOnly: true;
  databaseUrlChangeStillBlocked: true;
  dbBackupStillReadOnly: true;
  dbRestoreStillReadOnly: true;
  rollbackStillReadOnly: true;
  migrationStillBlocked: true;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyOperatingDbBackupRollbackPlanReview: true;
  requiresSeparateTask345Approval: true;
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

function mapDomainDnsHttpsStatus(
  status: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus,
): TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY':
      return 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 343 Domain/DNS/HTTPS Connection Plan Review status: ${_exhaustiveCheck}`);
    }
  }
}

function mapPlanItemStatus(
  status: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus,
): TmsReadOnlyOperatingDbBackupRollbackPlanItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Operating DB Backup Rollback Plan Review status: ${_exhaustiveCheck}`);
    }
  }
}

function makePlanItem(input: {
  planItemId: string;
  category: TmsReadOnlyOperatingDbBackupRollbackPlanCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyOperatingDbBackupRollbackPlanReviewItem {
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

function toStatusLabel(status: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus): string {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Operating DB Backup Rollback review label status: ${_exhaustiveCheck}`);
    }
  }
}

export function buildTmsReadOnlyOperatingDbBackupRollbackPlanReviewView(input: {
  domainDnsHttpsConnectionPlanReview: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView;
}): TmsReadOnlyOperatingDbBackupRollbackPlanReviewView {
  const src = input.domainDnsHttpsConnectionPlanReview;
  const operatingDbBackupRollbackPlanReviewStatus = mapDomainDnsHttpsStatus(
    src.domainDnsHttpsConnectionPlanReviewStatus,
  );
  const reviewStatus = mapPlanItemStatus(operatingDbBackupRollbackPlanReviewStatus);

  const operatingDbSeparationPlanItems = [
    makePlanItem({
      planItemId: 'task-344-db-separation-dev-prod-separate',
      category: 'OPERATING_DB_SEPARATION',
      label: '운영 DB는 개발/테스트 DB와 분리 필요',
      description: '운영 DB와 개발/테스트 DB는 별도 인스턴스로 분리해야 합니다. 이번 단계는 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-db-separation-connection-separate-mgmt',
      category: 'OPERATING_DB_SEPARATION',
      label: '운영 DB 연결 정보는 별도 관리 필요',
      description: '운영 DB 연결 정보(DATABASE_URL 등)는 개발 환경과 분리하여 관리해야 합니다. 실제 연결 정보 변경은 별도 승인이 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-db-separation-access-minimization',
      category: 'OPERATING_DB_SEPARATION',
      label: '운영 DB 접근 권한은 최소화 필요',
      description: '운영 DB 접근 권한은 최소 권한 원칙을 적용하고, 불필요한 접근은 차단해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-db-separation-not-connected-yet',
      category: 'OPERATING_DB_SEPARATION',
      label: '실제 운영 DB 연결 변경은 아직 하지 않음',
      description: '이번 단계는 read-only 계획 검토이며 실제 운영 DB 연결 변경은 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const operatingDbConnectionPlanItems = [
    makePlanItem({
      planItemId: 'task-344-db-connection-url-pending-approval',
      category: 'OPERATING_DB_CONNECTION',
      label: 'DATABASE_URL 변경은 별도 승인 필요',
      description: '운영 DATABASE_URL 변경은 별도 명시 승인 이후에만 가능합니다. 이번 단계에서는 변경하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-db-connection-env-no-read-modify',
      category: 'OPERATING_DB_CONNECTION',
      label: '.env / .env.local 직접 열람 또는 수정 없음',
      description: '.env / .env.local 파일을 직접 열람하거나 수정하지 않습니다. 운영 Secret은 화면에 표시하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makePlanItem({
      planItemId: 'task-344-db-connection-secret-not-exposed',
      category: 'OPERATING_DB_CONNECTION',
      label: '운영 Secret은 화면에 표시하지 않음',
      description: '운영 DB 연결 정보, Secret, 인증 정보는 화면에 노출하지 않습니다. process.env 전체 출력도 금지합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makePlanItem({
      planItemId: 'task-344-db-connection-process-env-no-expose',
      category: 'OPERATING_DB_CONNECTION',
      label: 'process.env 전체 출력 금지 유지',
      description: 'process.env 전체 출력은 금지되며, 안전 힌트(분류 키)만 표시할 수 있습니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
  ];

  const dbBackupPlanItems = [
    makePlanItem({
      planItemId: 'task-344-backup-plan-required',
      category: 'DB_BACKUP',
      label: '배포 전 운영 DB 백업 계획 필요',
      description: '운영 배포 전 운영 DB 백업 절차를 사전에 계획해야 합니다. 실제 백업 실행은 별도 승인 후 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-backup-storage-location-review',
      category: 'DB_BACKUP',
      label: '백업 파일 보관 위치 검토 필요',
      description: '백업 파일을 어디에 보관할지, 보관 기간과 접근 권한을 어떻게 관리할지 계획이 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-backup-approval-required',
      category: 'DB_BACKUP',
      label: '백업 실행 전 별도 승인 필요',
      description: '실제 DB 백업 명령 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-backup-not-executed-yet',
      category: 'DB_BACKUP',
      label: '실제 백업 명령은 아직 실행하지 않음',
      description: '이번 단계에서는 실제 DB 백업 명령을 실행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const dbRestorePlanItems = [
    makePlanItem({
      planItemId: 'task-344-restore-procedure-required',
      category: 'DB_RESTORE',
      label: '장애 발생 시 DB 복구 절차 필요',
      description: '장애 발생 시 DB를 복구하는 절차를 사전에 수립해야 합니다. 복구 방법과 순서를 계획으로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-restore-test-review',
      category: 'DB_RESTORE',
      label: '복구 테스트 여부 검토 필요',
      description: '실제 운영 투입 전 복구 절차를 테스트 환경에서 검증할지 계획이 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-restore-point-in-time-review',
      category: 'DB_RESTORE',
      label: '복구 대상 시점 기준 필요',
      description: '복구 시 어느 시점의 백업을 기준으로 할지, 시점 기준을 사전에 정해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-restore-not-executed-yet',
      category: 'DB_RESTORE',
      label: '실제 복구 명령은 아직 실행하지 않음',
      description: '이번 단계에서는 실제 DB 복구 명령을 실행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const codeRollbackPlanItems = [
    makePlanItem({
      planItemId: 'task-344-rollback-base-commit-record',
      category: 'CODE_ROLLBACK',
      label: '운영 배포 전 기준 커밋 기록 필요',
      description: '운영 배포 전 현재 기준 커밋 해시를 기록해 두어야 롤백 시 기준점으로 사용할 수 있습니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makePlanItem({
      planItemId: 'task-344-rollback-previous-commit-procedure',
      category: 'CODE_ROLLBACK',
      label: '배포 실패 시 이전 커밋으로 되돌리는 절차 필요',
      description: '배포 실패 시 이전 안정 커밋으로 되돌리는 절차와 방법을 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-rollback-git-commands-blocked',
      category: 'CODE_ROLLBACK',
      label: 'git reset/rebase/merge는 이번 Task에서 금지',
      description: '이번 Task에서 git reset, rebase, merge, force-push는 금지됩니다. 실제 rollback은 별도 승인 후 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-rollback-not-executed-yet',
      category: 'CODE_ROLLBACK',
      label: '실제 rollback은 아직 실행하지 않음',
      description: '이번 단계에서는 실제 코드 롤백을 실행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const deploymentFailureRecoveryPlanItems = [
    makePlanItem({
      planItemId: 'task-344-failure-recovery-service-downtime',
      category: 'DEPLOYMENT_FAILURE_RECOVERY',
      label: '배포 실패 시 서비스 중단 대응 절차 필요',
      description: '배포 실패로 서비스가 중단될 경우 대응 절차와 역할 분담을 사전에 정해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-failure-recovery-order',
      category: 'DEPLOYMENT_FAILURE_RECOVERY',
      label: 'DB/코드/환경변수 복구 순서 필요',
      description: '배포 실패 시 DB 복구, 코드 롤백, 환경변수 복원 순서를 사전에 결정해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-failure-recovery-domain-dns-bypass',
      category: 'DEPLOYMENT_FAILURE_RECOVERY',
      label: '도메인/DNS/HTTPS 문제 발생 시 우회 절차 필요',
      description: '도메인 연결 또는 DNS/HTTPS 문제 발생 시 우회 접근 방법을 사전에 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-failure-recovery-not-executed-yet',
      category: 'DEPLOYMENT_FAILURE_RECOVERY',
      label: '실제 복구 실행은 아직 하지 않음',
      description: '이번 단계에서는 실제 복구 실행을 수행하지 않습니다. 계획 검토만 수행합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const dbApprovalRequirementItems = [
    makePlanItem({
      planItemId: 'task-344-approval-db-connection-change',
      category: 'APPROVAL_REQUIREMENT',
      label: '운영 DB 연결 변경 승인 필요',
      description: '실제 운영 DB 연결 변경은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-approval-database-url-change',
      category: 'APPROVAL_REQUIREMENT',
      label: 'DATABASE_URL 변경 승인 필요',
      description: '실제 DATABASE_URL 변경은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-approval-env-file-change',
      category: 'APPROVAL_REQUIREMENT',
      label: '.env / .env.local 변경 승인 필요',
      description: '실제 .env / .env.local 파일 변경은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-approval-db-backup-execution',
      category: 'APPROVAL_REQUIREMENT',
      label: 'DB 백업 실행 승인 필요',
      description: '실제 DB 백업 명령 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-approval-db-restore-execution',
      category: 'APPROVAL_REQUIREMENT',
      label: 'DB 복구 실행 승인 필요',
      description: '실제 DB 복구 명령 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-approval-migration-execution',
      category: 'APPROVAL_REQUIREMENT',
      label: 'migration 실행 승인 필요',
      description: '실제 DB migration 명령 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-344-approval-rollback-execution',
      category: 'APPROVAL_REQUIREMENT',
      label: '운영 배포 rollback 실행 승인 필요',
      description: '실제 운영 배포 rollback 실행은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const operatingDbBackupRollbackSummaryCards: TmsReadOnlyOperatingDbBackupRollbackPlanSummaryCard[] = [
    {
      label: '계획 검토 상태',
      value: toStatusLabel(operatingDbBackupRollbackPlanReviewStatus),
      tone:
        operatingDbBackupRollbackPlanReviewStatus ===
        'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'
          ? 'positive'
          : operatingDbBackupRollbackPlanReviewStatus ===
              'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '운영 DB 분리 계획',
      value: 'REVIEW_REQUIRED',
      tone: 'warning',
    },
    {
      label: 'DB 백업 / 복구 계획',
      value: 'PLAN_REQUIRED',
      tone: 'warning',
    },
    {
      label: '승인 항목 수',
      value: `${dbApprovalRequirementItems.length}개`,
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_VIEW',
    taskId: 344,
    taskName: 'TMS Read-Only Operating DB Backup Rollback Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 DB / 백업 / 롤백 계획 검토',
    description:
      '이 패널은 운영 DB / 백업 / 롤백 계획을 read-only로 검토하는 화면입니다. 이 화면은 실제 운영 DB 연결 변경, DB write, DB 백업, DB 복구, rollback 실행 작업이 아닙니다. .env / .env.local을 열람하거나 수정하지 않습니다. Task 345는 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 344,
    referenceTaskNumbers: [343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceDomainDnsHttpsConnectionPlanReviewStatus: src.domainDnsHttpsConnectionPlanReviewStatus,
    operatingDbBackupRollbackPlanReviewStatus,
    operatingDbBackupRollbackPlanReviewReady:
      operatingDbBackupRollbackPlanReviewStatus ===
      'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY',
    operatingDbBackupRollbackPlanReviewPartialReady:
      operatingDbBackupRollbackPlanReviewStatus ===
      'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY',
    operatingDbBackupRollbackPlanReviewBlocked:
      operatingDbBackupRollbackPlanReviewStatus ===
      'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED',
    operatingDbBackupRollbackPlanReviewNotStarted:
      operatingDbBackupRollbackPlanReviewStatus ===
      'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED',
    operatingDbBackupRollbackPlanReviewStarted: true,
    operatingDbBackupRollbackPlanStillReadOnly: true,
    operatingDbSeparationPlanItems,
    operatingDbConnectionPlanItems,
    dbBackupPlanItems,
    dbRestorePlanItems,
    codeRollbackPlanItems,
    deploymentFailureRecoveryPlanItems,
    dbApprovalRequirementItems,
    operatingDbBackupRollbackSummaryCards,
    recommendedOperatingDbMode: 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED',
    recommendedDatabaseUrlHandlingMode: 'DATABASE_URL_CHANGE_PENDING_APPROVAL',
    recommendedDbBackupMode: 'DB_BACKUP_PLAN_REQUIRED',
    recommendedDbRestoreMode: 'DB_RESTORE_PLAN_REQUIRED',
    recommendedCodeRollbackMode: 'GIT_ROLLBACK_PLAN_REQUIRED',
    recommendedDeploymentFailureRecoveryMode: 'DEPLOYMENT_FAILURE_RECOVERY_PLAN_REQUIRED',
    recommendedEnvSecretHandlingMode: 'ENV_SECRET_REVIEW_REQUIRED_WITHOUT_EXPOSURE',
    operatingDbSeparationPlanItemCount: operatingDbSeparationPlanItems.length,
    operatingDbConnectionPlanItemCount: operatingDbConnectionPlanItems.length,
    dbBackupPlanItemCount: dbBackupPlanItems.length,
    dbRestorePlanItemCount: dbRestorePlanItems.length,
    codeRollbackPlanItemCount: codeRollbackPlanItems.length,
    deploymentFailureRecoveryPlanItemCount: deploymentFailureRecoveryPlanItems.length,
    dbApprovalRequirementItemCount: dbApprovalRequirementItems.length,
    operatingDbConnectionChanged: false,
    databaseUrlChanged: false,
    envFileReadOrModified: false,
    dbWritePerformed: false,
    dbBackupExecuted: false,
    dbRestoreExecuted: false,
    rollbackExecuted: false,
    migrationExecuted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    operatingDbConnectionStillReadOnly: true,
    databaseUrlChangeStillBlocked: true,
    dbBackupStillReadOnly: true,
    dbRestoreStillReadOnly: true,
    rollbackStillReadOnly: true,
    migrationStillBlocked: true,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDbBackupRollbackPlanReview: true,
    requiresSeparateTask345Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_345_APPROVAL_PHRASE,
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
