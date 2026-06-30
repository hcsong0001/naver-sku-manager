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
import {
  type TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus,
  type TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView,
} from './tms-read-only-operating-deployment-pre-execution-final-readiness-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus,
  type TmsReadOnlyOperatingDeploymentApprovalPacketReviewView,
} from './tms-read-only-operating-deployment-approval-packet-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView,
} from './tms-read-only-operating-deployment-approval-packet-outcome-certification-view.service';
import {
  type TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus,
  type TmsReadOnlyOperatingDeploymentSafetyLockReviewView,
} from './tms-read-only-operating-deployment-safety-lock-review-view.service';
import {
  type TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-safety-lock-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentGoNoGoReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED';

export type TmsReadOnlyGoNoGoItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyGoNoGoCategory =
  | 'OPERATING_DEPLOYMENT_DESIGN_GO_NO_GO'
  | 'DOMAIN_DNS_HTTPS_GO_NO_GO'
  | 'OPERATING_DB_BACKUP_ROLLBACK_GO_NO_GO'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_GO_NO_GO'
  | 'FINAL_READINESS_GO_NO_GO'
  | 'APPROVAL_PACKET_GO_NO_GO'
  | 'SAFETY_LOCK_GO_NO_GO'
  | 'FINAL_DECISION_REQUIREMENT';

export type TmsReadOnlyGoNoGoDecision =
  | 'GO_CANDIDATE_REVIEW_ONLY'
  | 'HOLD_CANDIDATE_REVIEW_ONLY'
  | 'NO_GO_CANDIDATE_REVIEW_ONLY'
  | 'NOT_READY_CANDIDATE_REVIEW_ONLY';

export const NEXT_TASK_352_APPROVAL_PHRASE =
  'Task 352에서 TMS read-only 운영 배포 Go/No-Go 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 Go 결정이나 실제 배포 실행이 아니라, Task 351 운영 배포 Go/No-Go 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyGoNoGoItem {
  goNoGoItemId: string;
  category: TmsReadOnlyGoNoGoCategory;
  label: string;
  description: string;
  sourceTaskId: 342 | 343 | 344 | 345 | 346 | 347 | 348 | 349 | 350 | 351;
  sourceStatus: string;
  goNoGoReviewStatus: TmsReadOnlyGoNoGoItemStatus;
  recommendedDecision: TmsReadOnlyGoNoGoDecision;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualDecisionSaved: false;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyGoNoGoSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentGoNoGoReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_VIEW';
  taskId: 351;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 351;
  referenceTaskNumbers: readonly [350, 349, 348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentDesignReviewStatus: TmsReadOnlyOperatingDeploymentDesignReviewStatus;
  sourceDomainDnsHttpsConnectionPlanReviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus;
  sourceOperatingDbBackupRollbackPlanReviewStatus: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus;
  sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus;
  sourcePreExecutionFinalReadinessReviewStatus: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus;
  sourceApprovalPacketReviewStatus: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus;
  sourceApprovalPacketOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus;
  sourceSafetyLockReviewStatus: TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus;
  sourceSafetyLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationStatus;
  operatingDeploymentGoNoGoReviewStatus: TmsReadOnlyOperatingDeploymentGoNoGoReviewStatus;
  goNoGoReviewReady: boolean;
  goNoGoReviewPartialReady: boolean;
  goNoGoReviewBlocked: boolean;
  goNoGoReviewNotStarted: boolean;
  goNoGoReviewStarted: true;
  goNoGoReviewStillReadOnly: true;
  recommendedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  recommendedGoNoGoDecisionLabel: string;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'GO_NO_GO_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  goNoGoReviewItems: readonly TmsReadOnlyGoNoGoItem[];
  operatingDesignGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  domainDnsHttpsGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  operatingDbBackupRollbackGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  runtimeWorkerQueueAdapterGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  readinessGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  approvalPacketGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  safetyLockGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  finalDecisionRequirementItems: readonly TmsReadOnlyGoNoGoItem[];
  goNoGoSummaryCards: readonly TmsReadOnlyGoNoGoSummaryCard[];
  readyGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  partialReadyGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  blockedGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  notStartedGoNoGoItems: readonly TmsReadOnlyGoNoGoItem[];
  operatingDesignGoNoGoItemCount: number;
  domainDnsHttpsGoNoGoItemCount: number;
  operatingDbBackupRollbackGoNoGoItemCount: number;
  runtimeWorkerQueueAdapterGoNoGoItemCount: number;
  readinessGoNoGoItemCount: number;
  approvalPacketGoNoGoItemCount: number;
  safetyLockGoNoGoItemCount: number;
  finalDecisionRequirementItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalGoNoGoItemCount: number;
  actualGoDecisionGranted: false;
  actualNoGoDecisionGranted: false;
  actualGoNoGoDecisionSaved: false;
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
  goNoGoDecisionStillReadOnly: true;
  goDecisionStillBlocked: true;
  noGoDecisionStillBlocked: true;
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
  isReadOnlyOperatingDeploymentGoNoGoReview: true;
  requiresSeparateTask352Approval: true;
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

type SimplifiedStatus = 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED';

function toSimplified342(s: TmsReadOnlyOperatingDeploymentDesignReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified343(s: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified344(s: TmsReadOnlyOperatingDbBackupRollbackPlanReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified345(s: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified346(s: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified347(s: TmsReadOnlyOperatingDeploymentApprovalPacketReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified348(s: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified349(s: TmsReadOnlyOperatingDeploymentSafetyLockReviewStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toSimplified350(s: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationStatus): SimplifiedStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function computeOverallStatus(simplified: readonly SimplifiedStatus[]): TmsReadOnlyOperatingDeploymentGoNoGoReviewStatus {
  if (simplified.some((s) => s === 'BLOCKED')) {
    return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED';
  }
  if (simplified.some((s) => s === 'NOT_STARTED')) {
    return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED';
  }
  if (simplified.some((s) => s === 'PARTIAL_READY')) {
    return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY';
  }
  return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY';
}

function toItemStatus(overall: TmsReadOnlyOperatingDeploymentGoNoGoReviewStatus): TmsReadOnlyGoNoGoItemStatus {
  switch (overall) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = overall; throw new Error(`Unknown status: ${_}`); }
  }
}

function toRecommendedDecision(overall: TmsReadOnlyOperatingDeploymentGoNoGoReviewStatus): TmsReadOnlyGoNoGoDecision {
  switch (overall) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY': return 'GO_CANDIDATE_REVIEW_ONLY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY': return 'HOLD_CANDIDATE_REVIEW_ONLY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED': return 'NO_GO_CANDIDATE_REVIEW_ONLY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED': return 'NOT_READY_CANDIDATE_REVIEW_ONLY';
    default: { const _: never = overall; throw new Error(`Unknown status: ${_}`); }
  }
}

function toDecisionLabel(decision: TmsReadOnlyGoNoGoDecision): string {
  switch (decision) {
    case 'GO_CANDIDATE_REVIEW_ONLY': return 'Go 후보 - read-only 검토 전용';
    case 'HOLD_CANDIDATE_REVIEW_ONLY': return 'Hold 후보 - read-only 검토 전용';
    case 'NO_GO_CANDIDATE_REVIEW_ONLY': return 'No-Go 후보 - read-only 검토 전용';
    case 'NOT_READY_CANDIDATE_REVIEW_ONLY': return '준비 미완료 후보 - read-only 검토 전용';
    default: { const _: never = decision; throw new Error(`Unknown decision: ${_}`); }
  }
}

function makeGoNoGoItem(input: {
  goNoGoItemId: string;
  category: TmsReadOnlyGoNoGoCategory;
  label: string;
  description: string;
  sourceTaskId: 342 | 343 | 344 | 345 | 346 | 347 | 348 | 349 | 350 | 351;
  sourceStatus: string;
  goNoGoReviewStatus: TmsReadOnlyGoNoGoItemStatus;
  recommendedDecision: TmsReadOnlyGoNoGoDecision;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyGoNoGoItem {
  return {
    goNoGoItemId: input.goNoGoItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    sourceTaskId: input.sourceTaskId,
    sourceStatus: input.sourceStatus,
    goNoGoReviewStatus: input.goNoGoReviewStatus,
    recommendedDecision: input.recommendedDecision,
    isReady: input.goNoGoReviewStatus === 'READY',
    isPartialReady: input.goNoGoReviewStatus === 'PARTIAL_READY',
    isBlocked: input.goNoGoReviewStatus === 'BLOCKED',
    isNotStarted: input.goNoGoReviewStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualDecisionSaved: false,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

export function buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView(input: {
  operatingDeploymentDesignReview: TmsReadOnlyOperatingDeploymentDesignReviewView;
  domainDnsHttpsConnectionPlanReview: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView;
  operatingDbBackupRollbackPlanReview: TmsReadOnlyOperatingDbBackupRollbackPlanReviewView;
  runtimeWorkerQueueAdapterOperatingConnectionPlanReview: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView;
  operatingDeploymentPreExecutionFinalReadinessReview: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView;
  operatingDeploymentApprovalPacketReview: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
  operatingDeploymentApprovalPacketOutcomeCertification: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
  operatingDeploymentSafetyLockReview: TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
  operatingDeploymentSafetyLockOutcomeCertification: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentGoNoGoReviewView {
  const s342 = input.operatingDeploymentDesignReview.operatingDeploymentDesignReviewStatus;
  const s343 = input.domainDnsHttpsConnectionPlanReview.domainDnsHttpsConnectionPlanReviewStatus;
  const s344 = input.operatingDbBackupRollbackPlanReview.operatingDbBackupRollbackPlanReviewStatus;
  const s345 = input.runtimeWorkerQueueAdapterOperatingConnectionPlanReview.runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus;
  const s346 = input.operatingDeploymentPreExecutionFinalReadinessReview.operatingDeploymentPreExecutionFinalReadinessReviewStatus;
  const s347 = input.operatingDeploymentApprovalPacketReview.operatingDeploymentApprovalPacketReviewStatus;
  const s348 = input.operatingDeploymentApprovalPacketOutcomeCertification.operatingDeploymentApprovalPacketOutcomeCertificationStatus;
  const s349 = input.operatingDeploymentSafetyLockReview.operatingDeploymentSafetyLockReviewStatus;
  const s350 = input.operatingDeploymentSafetyLockOutcomeCertification.operatingDeploymentSafetyLockOutcomeCertificationStatus;

  const simplified = [
    toSimplified342(s342),
    toSimplified343(s343),
    toSimplified344(s344),
    toSimplified345(s345),
    toSimplified346(s346),
    toSimplified347(s347),
    toSimplified348(s348),
    toSimplified349(s349),
    toSimplified350(s350),
  ] as const;

  const overallStatus = computeOverallStatus(simplified);
  const itemStatus = toItemStatus(overallStatus);
  const decision = toRecommendedDecision(overallStatus);
  const decisionLabel = toDecisionLabel(decision);

  const operatingDesignGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-design-vps-candidate',
      category: 'OPERATING_DEPLOYMENT_DESIGN_GO_NO_GO',
      label: 'VPS 운영 배포 후보 검토 결과 반영',
      description: 'Task 342 운영 배포 설계에서 VPS를 운영 배포 후보로 확인한 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 342,
      sourceStatus: s342,
      goNoGoReviewStatus: toSimplified342(s342) === 'READY' ? 'READY' : toSimplified342(s342) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified342(s342) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-design-nas-backup',
      category: 'OPERATING_DEPLOYMENT_DESIGN_GO_NO_GO',
      label: 'NAS는 백업/보조 인프라 후보로 유지',
      description: 'NAS는 운영 배포 대상이 아니라 백업 및 보조 인프라 후보로 유지되고 있음을 확인합니다.',
      sourceTaskId: 342,
      sourceStatus: s342,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-design-office-home-pc-not-target',
      category: 'OPERATING_DEPLOYMENT_DESIGN_GO_NO_GO',
      label: '사무실 PC/집 PC는 운영 배포 대상이 아님',
      description: '사무실 PC 및 집 PC는 운영 배포 대상에 포함되지 않음을 확인합니다.',
      sourceTaskId: 342,
      sourceStatus: s342,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-design-vps-not-created',
      category: 'OPERATING_DEPLOYMENT_DESIGN_GO_NO_GO',
      label: '실제 VPS 생성은 아직 없음',
      description: 'Task 342~350까지 실제 VPS 서버 생성이 수행되지 않았음을 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const domainDnsHttpsGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-domain-connection-plan',
      category: 'DOMAIN_DNS_HTTPS_GO_NO_GO',
      label: '도메인 연결 계획 검토 결과 반영',
      description: 'Task 343 도메인/DNS/HTTPS 연결 계획 검토 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 343,
      sourceStatus: s343,
      goNoGoReviewStatus: toSimplified343(s343) === 'READY' ? 'READY' : toSimplified343(s343) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified343(s343) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-dns-record-plan',
      category: 'DOMAIN_DNS_HTTPS_GO_NO_GO',
      label: 'DNS 레코드 계획 검토 결과 반영',
      description: 'DNS A레코드, CNAME 등 레코드 계획 검토 결과를 반영합니다.',
      sourceTaskId: 343,
      sourceStatus: s343,
      goNoGoReviewStatus: toSimplified343(s343) === 'READY' ? 'READY' : toSimplified343(s343) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified343(s343) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-https-ssl-plan',
      category: 'DOMAIN_DNS_HTTPS_GO_NO_GO',
      label: 'HTTPS/SSL 계획 검토 결과 반영',
      description: 'SSL 인증서 발급 및 HTTPS 적용 계획 검토 결과를 반영합니다.',
      sourceTaskId: 343,
      sourceStatus: s343,
      goNoGoReviewStatus: toSimplified343(s343) === 'READY' ? 'READY' : toSimplified343(s343) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified343(s343) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-domain-dns-ssl-not-executed',
      category: 'DOMAIN_DNS_HTTPS_GO_NO_GO',
      label: '실제 도메인 연결 / DNS 변경 / SSL 발급은 아직 없음',
      description: 'Task 342~350까지 실제 도메인 연결, DNS 변경, SSL 발급이 수행되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const operatingDbBackupRollbackGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-db-separation-plan',
      category: 'OPERATING_DB_BACKUP_ROLLBACK_GO_NO_GO',
      label: '운영 DB 분리 계획 검토 결과 반영',
      description: 'Task 344 운영 DB 분리 계획 검토 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 344,
      sourceStatus: s344,
      goNoGoReviewStatus: toSimplified344(s344) === 'READY' ? 'READY' : toSimplified344(s344) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified344(s344) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-database-url-separate-approval',
      category: 'OPERATING_DB_BACKUP_ROLLBACK_GO_NO_GO',
      label: 'DATABASE_URL 변경은 별도 승인 필요',
      description: 'DATABASE_URL 변경은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 344,
      sourceStatus: s344,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-backup-restore-rollback-plan',
      category: 'OPERATING_DB_BACKUP_ROLLBACK_GO_NO_GO',
      label: '백업 / 복구 / 롤백 계획 검토 결과 반영',
      description: 'Task 344 DB 백업, 복구, 롤백 계획 검토 결과를 반영합니다.',
      sourceTaskId: 344,
      sourceStatus: s344,
      goNoGoReviewStatus: toSimplified344(s344) === 'READY' ? 'READY' : toSimplified344(s344) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified344(s344) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-db-not-executed',
      category: 'OPERATING_DB_BACKUP_ROLLBACK_GO_NO_GO',
      label: '실제 운영 DB 연결 변경 / DB write / 백업 / 복구 / 롤백은 아직 없음',
      description: 'Task 342~350까지 실제 DB 관련 작업이 수행되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const runtimeWorkerQueueAdapterGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-runtime-plan',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_GO_NO_GO',
      label: 'Runtime 운영 구성 계획 검토 결과 반영',
      description: 'Task 345 Runtime 운영 구성 계획 검토 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 345,
      sourceStatus: s345,
      goNoGoReviewStatus: toSimplified345(s345) === 'READY' ? 'READY' : toSimplified345(s345) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified345(s345) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-worker-plan',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_GO_NO_GO',
      label: 'Worker 운영 실행 계획 검토 결과 반영',
      description: 'Task 345 Worker 운영 실행 계획 검토 결과를 반영합니다.',
      sourceTaskId: 345,
      sourceStatus: s345,
      goNoGoReviewStatus: toSimplified345(s345) === 'READY' ? 'READY' : toSimplified345(s345) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified345(s345) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-queue-redis-plan',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_GO_NO_GO',
      label: 'Queue / Redis 운영 연결 계획 검토 결과 반영',
      description: 'Task 345 Queue/Redis 운영 연결 계획 검토 결과를 반영합니다.',
      sourceTaskId: 345,
      sourceStatus: s345,
      goNoGoReviewStatus: toSimplified345(s345) === 'READY' ? 'READY' : toSimplified345(s345) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified345(s345) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-adapter-naver-api-plan',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_GO_NO_GO',
      label: 'Adapter / Naver API 운영 호출 계획 검토 결과 반영',
      description: 'Task 345 Adapter 및 Naver API 운영 호출 계획 검토 결과를 반영합니다.',
      sourceTaskId: 345,
      sourceStatus: s345,
      goNoGoReviewStatus: toSimplified345(s345) === 'READY' ? 'READY' : toSimplified345(s345) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified345(s345) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-runtime-worker-queue-not-executed',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_GO_NO_GO',
      label: '실제 Runtime 구성 / Worker 실행 / Queue enqueue / Adapter 연결 / API 호출은 아직 없음',
      description: 'Task 342~350까지 실제 Runtime/Worker/Queue/Adapter/API 관련 작업이 수행되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const readinessGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-final-readiness-result',
      category: 'FINAL_READINESS_GO_NO_GO',
      label: '운영 배포 실행 전 최종 Readiness 결과 반영',
      description: 'Task 346 운영 배포 실행 전 최종 Readiness 검토 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 346,
      sourceStatus: s346,
      goNoGoReviewStatus: toSimplified346(s346) === 'READY' ? 'READY' : toSimplified346(s346) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified346(s346) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-pre-execution-approval-required',
      category: 'FINAL_READINESS_GO_NO_GO',
      label: '실제 실행 전 승인 필요 항목 반영',
      description: 'Task 346에서 확인된 실제 실행 전 별도 승인 필요 항목을 반영합니다.',
      sourceTaskId: 346,
      sourceStatus: s346,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-pre-execution-safety-lock-result',
      category: 'FINAL_READINESS_GO_NO_GO',
      label: 'Pre-Execution Safety Lock 결과 반영',
      description: 'Task 346 Pre-Execution Safety Lock 검토 결과를 반영합니다.',
      sourceTaskId: 346,
      sourceStatus: s346,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-deployment-not-executed',
      category: 'FINAL_READINESS_GO_NO_GO',
      label: '실제 배포 실행은 아직 없음',
      description: 'Task 342~350까지 실제 배포 실행이 수행되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const approvalPacketGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-approval-packet-review-result',
      category: 'APPROVAL_PACKET_GO_NO_GO',
      label: '운영 배포 승인 패킷 검토 결과 반영',
      description: 'Task 347 운영 배포 승인 패킷 검토 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 347,
      sourceStatus: s347,
      goNoGoReviewStatus: toSimplified347(s347) === 'READY' ? 'READY' : toSimplified347(s347) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified347(s347) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-approval-packet-outcome-certification',
      category: 'APPROVAL_PACKET_GO_NO_GO',
      label: '승인 패킷 결과 인증 반영',
      description: 'Task 348 운영 배포 승인 패킷 결과 인증 결과를 반영합니다.',
      sourceTaskId: 348,
      sourceStatus: s348,
      goNoGoReviewStatus: toSimplified348(s348) === 'READY' ? 'READY' : toSimplified348(s348) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified348(s348) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-approval-not-submitted',
      category: 'APPROVAL_PACKET_GO_NO_GO',
      label: '실제 승인 제출 없음',
      description: 'Task 342~350까지 실제 승인 제출이 수행되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-deployment-approval-not-granted',
      category: 'APPROVAL_PACKET_GO_NO_GO',
      label: '실제 배포 승인 없음',
      description: 'Task 342~350까지 실제 배포 승인이 제출되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const safetyLockGoNoGoItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-safety-lock-review-result',
      category: 'SAFETY_LOCK_GO_NO_GO',
      label: '운영 배포 Safety Lock 검토 결과 반영',
      description: 'Task 349 운영 배포 Safety Lock 검토 결과를 Go/No-Go 검토에 반영합니다.',
      sourceTaskId: 349,
      sourceStatus: s349,
      goNoGoReviewStatus: toSimplified349(s349) === 'READY' ? 'READY' : toSimplified349(s349) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified349(s349) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-safety-lock-outcome-certification',
      category: 'SAFETY_LOCK_GO_NO_GO',
      label: 'Safety Lock 결과 인증 반영',
      description: 'Task 350 운영 배포 Safety Lock 결과 인증 결과를 반영합니다.',
      sourceTaskId: 350,
      sourceStatus: s350,
      goNoGoReviewStatus: toSimplified350(s350) === 'READY' ? 'READY' : toSimplified350(s350) === 'PARTIAL_READY' ? 'PARTIAL_READY' : toSimplified350(s350) === 'BLOCKED' ? 'BLOCKED' : 'NOT_STARTED',
      recommendedDecision: decision,
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-no-execution-button-submit-post',
      category: 'SAFETY_LOCK_GO_NO_GO',
      label: '실행 버튼 / submit / POST API 미추가 확인',
      description: 'Task 342~351까지 실행 버튼, submit action, POST API가 추가되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-token-auth-not-exposed',
      category: 'SAFETY_LOCK_GO_NO_GO',
      label: 'Token/Auth/Signature/Authorization 비노출 유지 확인',
      description: 'Token, Auth, Signature, Authorization 값이 화면에 출력되지 않았음을 확인합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const finalDecisionRequirementItems: TmsReadOnlyGoNoGoItem[] = [
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-final-go-decision-requires-approval',
      category: 'FINAL_DECISION_REQUIREMENT',
      label: '실제 Go 결정은 별도 승인 필요',
      description: '실제 Go 결정은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-final-no-go-decision-requires-approval',
      category: 'FINAL_DECISION_REQUIREMENT',
      label: '실제 No-Go 결정 저장도 별도 승인 필요',
      description: '실제 No-Go 결정 저장도 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-deployment-approval-requires-separate-task',
      category: 'FINAL_DECISION_REQUIREMENT',
      label: '실제 배포 승인 단계는 별도 Task 필요',
      description: '실제 배포 승인 단계는 Task 352 이후 별도 Task에서 처리됩니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-deployment-execution-requires-separate-task',
      category: 'FINAL_DECISION_REQUIREMENT',
      label: '실제 배포 실행 단계는 별도 Task 필요',
      description: '실제 배포 실행 단계는 별도 Task에서 처리됩니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: true,
    }),
    makeGoNoGoItem({
      goNoGoItemId: 'task-351-this-screen-is-review-only',
      category: 'FINAL_DECISION_REQUIREMENT',
      label: '이번 화면은 Go/No-Go 판단 후보를 read-only로 검토하는 단계',
      description: '이 화면은 실제 Go 결정, No-Go 결정, 배포 승인, 배포 실행이 아닌 read-only 검토 단계입니다.',
      sourceTaskId: 351,
      sourceStatus: overallStatus,
      goNoGoReviewStatus: 'READY',
      recommendedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      requiresSeparateApproval: false,
    }),
  ];

  const allItems = [
    ...operatingDesignGoNoGoItems,
    ...domainDnsHttpsGoNoGoItems,
    ...operatingDbBackupRollbackGoNoGoItems,
    ...runtimeWorkerQueueAdapterGoNoGoItems,
    ...readinessGoNoGoItems,
    ...approvalPacketGoNoGoItems,
    ...safetyLockGoNoGoItems,
    ...finalDecisionRequirementItems,
  ];

  const readyGoNoGoItems = allItems.filter((i) => i.isReady);
  const partialReadyGoNoGoItems = allItems.filter((i) => i.isPartialReady);
  const blockedGoNoGoItems = allItems.filter((i) => i.isBlocked);
  const notStartedGoNoGoItems = allItems.filter((i) => i.isNotStarted);

  const goNoGoSummaryCards: TmsReadOnlyGoNoGoSummaryCard[] = [
    {
      label: 'Go/No-Go 검토 상태',
      value: itemStatus,
      tone: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY'
        ? 'positive'
        : overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED'
          ? 'warning'
          : 'neutral',
    },
    {
      label: '추천 결정 후보',
      value: decisionLabel,
      tone: decision === 'GO_CANDIDATE_REVIEW_ONLY' ? 'positive' : decision === 'NO_GO_CANDIDATE_REVIEW_ONLY' ? 'warning' : 'neutral',
    },
    {
      label: '총 검토 항목',
      value: `${allItems.length}개`,
      tone: 'neutral',
    },
    {
      label: '별도 승인 필요',
      value: `${allItems.filter((i) => i.requiresSeparateApproval).length}개`,
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_VIEW',
    taskId: 351,
    taskName: 'TMS Read-Only Operating Deployment Go No-Go Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 Go/No-Go 검토',
    description:
      '이 패널은 운영 배포 Go/No-Go 후보를 read-only로 검토하는 화면입니다. 이 화면은 실제 Go 결정, 실제 No-Go 결정, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 352는 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 351,
    referenceTaskNumbers: [350, 349, 348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentDesignReviewStatus: s342,
    sourceDomainDnsHttpsConnectionPlanReviewStatus: s343,
    sourceOperatingDbBackupRollbackPlanReviewStatus: s344,
    sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: s345,
    sourcePreExecutionFinalReadinessReviewStatus: s346,
    sourceApprovalPacketReviewStatus: s347,
    sourceApprovalPacketOutcomeCertificationStatus: s348,
    sourceSafetyLockReviewStatus: s349,
    sourceSafetyLockOutcomeCertificationStatus: s350,
    operatingDeploymentGoNoGoReviewStatus: overallStatus,
    goNoGoReviewReady: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY',
    goNoGoReviewPartialReady: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY',
    goNoGoReviewBlocked: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED',
    goNoGoReviewNotStarted: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED',
    goNoGoReviewStarted: true,
    goNoGoReviewStillReadOnly: true,
    recommendedGoNoGoDecision: decision,
    recommendedGoNoGoDecisionLabel: decisionLabel,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'GO_NO_GO_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    goNoGoReviewItems: allItems,
    operatingDesignGoNoGoItems,
    domainDnsHttpsGoNoGoItems,
    operatingDbBackupRollbackGoNoGoItems,
    runtimeWorkerQueueAdapterGoNoGoItems,
    readinessGoNoGoItems,
    approvalPacketGoNoGoItems,
    safetyLockGoNoGoItems,
    finalDecisionRequirementItems,
    goNoGoSummaryCards,
    readyGoNoGoItems,
    partialReadyGoNoGoItems,
    blockedGoNoGoItems,
    notStartedGoNoGoItems,
    operatingDesignGoNoGoItemCount: operatingDesignGoNoGoItems.length,
    domainDnsHttpsGoNoGoItemCount: domainDnsHttpsGoNoGoItems.length,
    operatingDbBackupRollbackGoNoGoItemCount: operatingDbBackupRollbackGoNoGoItems.length,
    runtimeWorkerQueueAdapterGoNoGoItemCount: runtimeWorkerQueueAdapterGoNoGoItems.length,
    readinessGoNoGoItemCount: readinessGoNoGoItems.length,
    approvalPacketGoNoGoItemCount: approvalPacketGoNoGoItems.length,
    safetyLockGoNoGoItemCount: safetyLockGoNoGoItems.length,
    finalDecisionRequirementItemCount: finalDecisionRequirementItems.length,
    readyItemCount: readyGoNoGoItems.length,
    partialReadyItemCount: partialReadyGoNoGoItems.length,
    blockedItemCount: blockedGoNoGoItems.length,
    notStartedItemCount: notStartedGoNoGoItems.length,
    totalGoNoGoItemCount: allItems.length,
    actualGoDecisionGranted: false,
    actualNoGoDecisionGranted: false,
    actualGoNoGoDecisionSaved: false,
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
    goNoGoDecisionStillReadOnly: true,
    goDecisionStillBlocked: true,
    noGoDecisionStillBlocked: true,
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
    isReadOnlyOperatingDeploymentGoNoGoReview: true,
    requiresSeparateTask352Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_352_APPROVAL_PHRASE,
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
