import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-packet-outcome-certification-view.service';
import { type TmsReadOnlyGoNoGoDecision } from './tms-read-only-operating-deployment-go-no-go-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_NOT_STARTED';

export type TmsReadOnlyFinalApprovalSealItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyFinalApprovalSealCategory =
  | 'FINAL_APPROVAL_SEAL_LOCK'
  | 'DEPLOYMENT_APPROVAL_SEAL_LOCK'
  | 'DEPLOYMENT_EXECUTION_SEAL_LOCK'
  | 'INFRASTRUCTURE_SEAL_LOCK'
  | 'DOMAIN_DNS_HTTPS_SEAL_LOCK'
  | 'OPERATING_DB_SEAL_LOCK'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK'
  | 'API_AND_SECRET_SEAL_LOCK'
  | 'UI_ACTION_SEAL_LOCK'
  | 'FINAL_SEAL_REQUIREMENT';

export const NEXT_TASK_358_APPROVAL_PHRASE =
  'Task 358에서 TMS read-only 운영 배포 최종 승인 Seal 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 357 운영 배포 최종 승인 Seal 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

interface TmsReadOnlyFinalApprovalSealItemDefinition {
  sealItemId: string;
  category: TmsReadOnlyFinalApprovalSealCategory;
  label: string;
  description: string;
}

export interface TmsReadOnlyFinalApprovalSealItem {
  sealItemId: string;
  category: TmsReadOnlyFinalApprovalSealCategory;
  label: string;
  description: string;
  sourceTaskId: 356;
  sourceStatus: TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationStatus;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationStatus;
  sourceCertifiedDecision: TmsReadOnlyGoNoGoDecision;
  sealReviewStatus: TmsReadOnlyFinalApprovalSealItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualApprovalGranted: false;
  actualSubmissionPerformed: false;
  actualChangePerformed: false;
  requiresSeparateApproval: true;
}

export interface TmsReadOnlyFinalApprovalSealSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_VIEW';
  taskId: 357;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 357;
  isBatchJobResultDisplayOnly: true;
  sourceFinalApprovalPacketOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationStatus;
  sourceOutcomeCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  sourceOutcomeCertifiedGoNoGoDecisionLabel: string;
  operatingDeploymentFinalApprovalSealReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewStatus;
  finalApprovalSealReviewReady: boolean;
  finalApprovalSealReviewPartialReady: boolean;
  finalApprovalSealReviewBlocked: boolean;
  finalApprovalSealReviewNotStarted: boolean;
  finalApprovalSealReviewStarted: true;
  finalApprovalSealStillReadOnly: true;
  sealCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  sealCertifiedGoNoGoDecisionLabel: string;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_APPROVAL_SEAL_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  finalApprovalSealItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  finalApprovalSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  deploymentApprovalSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  deploymentExecutionSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  infrastructureSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  domainDnsHttpsSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  operatingDbSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  runtimeWorkerQueueAdapterSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  apiAndSecretSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  uiActionSealLockItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  finalSealRequirementItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  sealSummaryCards: readonly TmsReadOnlyFinalApprovalSealSummaryCard[];
  readySealItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  partialReadySealItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  blockedSealItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  notStartedSealItems: readonly TmsReadOnlyFinalApprovalSealItem[];
  finalApprovalSealLockItemCount: number;
  deploymentApprovalSealLockItemCount: number;
  deploymentExecutionSealLockItemCount: number;
  infrastructureSealLockItemCount: number;
  domainDnsHttpsSealLockItemCount: number;
  operatingDbSealLockItemCount: number;
  runtimeWorkerQueueAdapterSealLockItemCount: number;
  apiAndSecretSealLockItemCount: number;
  uiActionSealLockItemCount: number;
  finalSealRequirementItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalApprovalSealItemCount: number;
  actualFinalApprovalGranted: false;
  actualFinalApprovalPacketSubmitted: false;
  actualDeploymentApprovalGranted: false;
  actualDeploymentStarted: false;
  actualProductionTransitionStarted: false;
  actualGoDecisionGranted: false;
  actualNoGoDecisionGranted: false;
  actualGoNoGoDecisionSaved: false;
  actualApprovalPacketSubmitted: false;
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
  finalApprovalSealStillDisplayOnly: true;
  finalApprovalSealStillLocked: true;
  finalApprovalSubmissionStillBlocked: true;
  finalApprovalStillReadOnly: true;
  finalApprovalStillBlocked: true;
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
  isReadOnlyOperatingDeploymentFinalApprovalSealReview: true;
  requiresSeparateTask358Approval: true;
  nextTaskApprovalPhrase: string;
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

const SEAL_ITEM_DEFINITIONS: readonly TmsReadOnlyFinalApprovalSealItemDefinition[] =
  [
    {
      sealItemId: 'final-approval-not-granted-seal',
      category: 'FINAL_APPROVAL_SEAL_LOCK',
      label: '실제 최종 승인 부여 없음',
      description: 'Task 356까지 실제 최종 승인 부여가 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'final-approval-not-saved-seal',
      category: 'FINAL_APPROVAL_SEAL_LOCK',
      label: '실제 최종 승인 저장 없음',
      description: '실제 최종 승인 저장 코드나 저장 결과가 없음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'final-approval-not-submitted-seal',
      category: 'FINAL_APPROVAL_SEAL_LOCK',
      label: '실제 최종 승인 제출 없음',
      description: '실제 최종 승인 제출이 아직 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'final-approval-locked-until-separate-approval',
      category: 'FINAL_APPROVAL_SEAL_LOCK',
      label: '최종 승인은 별도 승인 전까지 봉인',
      description: '사용자 별도 승인 전에는 최종 승인 단계가 계속 봉인 상태임을 검토합니다.',
    },
    {
      sealItemId: 'deployment-approval-not-granted-seal',
      category: 'DEPLOYMENT_APPROVAL_SEAL_LOCK',
      label: '실제 배포 승인 없음',
      description: '실제 배포 승인이 아직 부여되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'deployment-approval-not-submitted-seal',
      category: 'DEPLOYMENT_APPROVAL_SEAL_LOCK',
      label: '실제 승인 제출 없음',
      description: '배포 승인 제출이나 저장이 실제로 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'deployment-approval-locked-until-separate-approval',
      category: 'DEPLOYMENT_APPROVAL_SEAL_LOCK',
      label: '배포 승인은 별도 승인 전까지 봉인',
      description: '사용자 별도 승인 전에는 배포 승인 단계가 봉인 상태로 유지됨을 검토합니다.',
    },
    {
      sealItemId: 'deployment-approval-packet-outcome-read-only-certified',
      category: 'DEPLOYMENT_APPROVAL_SEAL_LOCK',
      label: '최종 승인 패킷 결과는 read-only 인증 상태',
      description: 'Task 356 패킷 결과 인증만 완료된 상태이며 실제 배포 승인이 아님을 검토합니다.',
    },
    {
      sealItemId: 'deployment-execution-not-started-seal',
      category: 'DEPLOYMENT_EXECUTION_SEAL_LOCK',
      label: '실제 배포 실행 없음',
      description: '실제 배포 실행이 시작되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'production-transition-not-started-seal',
      category: 'DEPLOYMENT_EXECUTION_SEAL_LOCK',
      label: '실제 운영 전환 없음',
      description: '실제 운영 전환이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'no-execution-button-submit-post-api-seal',
      category: 'DEPLOYMENT_EXECUTION_SEAL_LOCK',
      label: '실행 버튼 / submit / POST API 추가 없음',
      description: '실행 CTA, submit action, POST API가 추가되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'deployment-execution-locked-until-separate-approval',
      category: 'DEPLOYMENT_EXECUTION_SEAL_LOCK',
      label: '배포 실행은 별도 승인 전까지 봉인',
      description: '사용자 별도 승인 전까지 배포 실행 단계가 봉인 상태임을 검토합니다.',
    },
    {
      sealItemId: 'vps-not-created-seal',
      category: 'INFRASTRUCTURE_SEAL_LOCK',
      label: '실제 VPS 생성 없음',
      description: '실제 VPS 생성 작업이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'vps-config-not-changed-seal',
      category: 'INFRASTRUCTURE_SEAL_LOCK',
      label: '실제 VPS 설정 변경 없음',
      description: '실제 VPS 설정 변경이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'server-config-not-changed-seal',
      category: 'INFRASTRUCTURE_SEAL_LOCK',
      label: '실제 서버 설정 변경 없음',
      description: '실제 서버 설정 변경이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'infrastructure-locked-until-separate-approval',
      category: 'INFRASTRUCTURE_SEAL_LOCK',
      label: '인프라 변경은 별도 승인 전까지 봉인',
      description: '사용자 별도 승인 전까지 인프라 변경이 봉인 상태임을 검토합니다.',
    },
    {
      sealItemId: 'domain-not-connected-seal',
      category: 'DOMAIN_DNS_HTTPS_SEAL_LOCK',
      label: '실제 도메인 연결 없음',
      description: '실제 도메인 연결 작업이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'dns-record-not-changed-seal',
      category: 'DOMAIN_DNS_HTTPS_SEAL_LOCK',
      label: 'DNS 레코드 생성/수정 없음',
      description: 'DNS 레코드 생성이나 수정이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'ssl-not-issued-seal',
      category: 'DOMAIN_DNS_HTTPS_SEAL_LOCK',
      label: 'HTTPS/SSL 인증서 발급 없음',
      description: 'HTTPS/SSL 인증서 발급이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'domain-dns-https-locked-until-separate-approval',
      category: 'DOMAIN_DNS_HTTPS_SEAL_LOCK',
      label: '도메인/DNS/HTTPS 작업은 별도 승인 전까지 봉인',
      description: '사용자 별도 승인 전까지 도메인, DNS, HTTPS 작업이 봉인 상태임을 검토합니다.',
    },
    {
      sealItemId: 'operating-db-connection-unchanged-seal',
      category: 'OPERATING_DB_SEAL_LOCK',
      label: '실제 운영 DB 연결 변경 없음',
      description: '실제 운영 DB 연결 변경이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'database-url-unchanged-seal',
      category: 'OPERATING_DB_SEAL_LOCK',
      label: 'DATABASE_URL 변경 없음',
      description: 'DATABASE_URL 변경이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'db-write-not-performed-seal',
      category: 'OPERATING_DB_SEAL_LOCK',
      label: 'DB write 없음',
      description: 'DB write가 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'db-ops-not-executed-seal',
      category: 'OPERATING_DB_SEAL_LOCK',
      label: 'DB 백업/복구/롤백/migration 실행 없음',
      description: 'DB backup, restore, rollback, migration이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'runtime-not-configured-seal',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK',
      label: '실제 Runtime 구성 없음',
      description: '실제 Runtime 구성이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'worker-not-started-seal',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK',
      label: 'Worker 실행 없음',
      description: 'Worker 실행이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'queue-not-enqueued-seal',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK',
      label: 'Queue enqueue 없음',
      description: 'Queue enqueue가 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'redis-connection-not-changed-seal',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK',
      label: 'Redis 운영 연결 변경 없음',
      description: 'Redis 운영 연결 변경이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'adapter-not-connected-seal',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK',
      label: 'Adapter 연결 없음',
      description: 'Adapter 연결이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'naver-api-not-called-seal',
      category: 'API_AND_SECRET_SEAL_LOCK',
      label: '실제 Naver API 호출 없음',
      description: '실제 Naver API 호출이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'product-lookup-not-recalled-seal',
      category: 'API_AND_SECRET_SEAL_LOCK',
      label: '상품 조회 API 재호출 없음',
      description: '상품 조회 API 재호출이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'product-update-not-called-seal',
      category: 'API_AND_SECRET_SEAL_LOCK',
      label: '상품 수정 API 호출 없음',
      description: '상품 수정 API 호출이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'token-auth-hidden-seal',
      category: 'API_AND_SECRET_SEAL_LOCK',
      label: 'Token/Auth/Signature/Authorization 값 비노출 유지',
      description: '민감한 인증 값이 계속 비노출 상태로 유지됨을 봉인 검토합니다.',
    },
    {
      sealItemId: 'raw-api-response-hidden-seal',
      category: 'API_AND_SECRET_SEAL_LOCK',
      label: 'raw API response 비표시/비저장 유지',
      description: 'raw API response가 표시되거나 저장되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'execution-button-not-added-seal',
      category: 'UI_ACTION_SEAL_LOCK',
      label: '실행 버튼 추가 없음',
      description: '실행 버튼이 추가되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'submit-action-not-added-seal',
      category: 'UI_ACTION_SEAL_LOCK',
      label: 'submit action 추가 없음',
      description: 'submit action이 추가되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'post-api-not-added-seal',
      category: 'UI_ACTION_SEAL_LOCK',
      label: 'POST API 추가 없음',
      description: 'POST API가 추가되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'price-stock-not-changed-seal',
      category: 'UI_ACTION_SEAL_LOCK',
      label: '가격/재고 변경 없음',
      description: '가격 변경과 재고 변경이 수행되지 않았음을 봉인 검토합니다.',
    },
    {
      sealItemId: 'seal-outcome-certification-requires-separate-task',
      category: 'FINAL_SEAL_REQUIREMENT',
      label: '실제 최종 승인 Seal 결과 인증은 별도 Task 필요',
      description: 'Seal 결과 인증은 다음 별도 Task에서만 진행되어야 함을 검토합니다.',
    },
    {
      sealItemId: 'final-approval-step-requires-separate-task',
      category: 'FINAL_SEAL_REQUIREMENT',
      label: '실제 최종 승인 단계는 별도 Task 필요',
      description: '실제 최종 승인 단계는 현재 화면 범위 밖의 별도 승인 단계임을 검토합니다.',
    },
    {
      sealItemId: 'deployment-execution-step-requires-separate-task',
      category: 'FINAL_SEAL_REQUIREMENT',
      label: '실제 배포 실행 단계는 별도 Task 필요',
      description: '실제 배포 실행 단계는 현재 화면 범위 밖의 별도 승인 단계임을 검토합니다.',
    },
    {
      sealItemId: 'current-screen-is-read-only-seal-review',
      category: 'FINAL_SEAL_REQUIREMENT',
      label: '이번 화면은 최종 승인 전 Seal 상태를 read-only로 검토하는 단계',
      description: '현재 화면은 실제 실행이 아니라 최종 승인 전 Seal 상태 검토만 수행함을 확인합니다.',
    },
  ];

function exhaustiveGuard(value: never): never {
  throw new Error(`Unknown value: ${String(value)}`);
}

function mapOutcomeCertificationToSealReviewStatus(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationStatus,
): TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_PACKET_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_PACKET_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function mapSealReviewStatusToItemStatus(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewStatus,
): TmsReadOnlyFinalApprovalSealItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function toSummaryTone(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewStatus,
): 'positive' | 'neutral' | 'warning' {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_READY':
      return 'positive';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_BLOCKED':
      return 'warning';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_PARTIAL_READY':
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_NOT_STARTED':
      return 'neutral';
    default:
      return exhaustiveGuard(status);
  }
}

function buildSealItem(
  definition: TmsReadOnlyFinalApprovalSealItemDefinition,
  sourceView: TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView,
  sealReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewStatus,
): TmsReadOnlyFinalApprovalSealItem {
  const itemStatus = mapSealReviewStatusToItemStatus(sealReviewStatus);

  return {
    sealItemId: definition.sealItemId,
    category: definition.category,
    label: definition.label,
    description: definition.description,
    sourceTaskId: 356,
    sourceStatus:
      sourceView.operatingDeploymentFinalApprovalPacketOutcomeCertificationStatus,
    sourceOutcomeCertificationStatus:
      sourceView.operatingDeploymentFinalApprovalPacketOutcomeCertificationStatus,
    sourceCertifiedDecision: sourceView.outcomeCertifiedGoNoGoDecision,
    sealReviewStatus: itemStatus,
    isReady: itemStatus === 'READY',
    isPartialReady: itemStatus === 'PARTIAL_READY',
    isBlocked: itemStatus === 'BLOCKED',
    isNotStarted: itemStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualApprovalGranted: false,
    actualSubmissionPerformed: false,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function filterByCategory(
  items: readonly TmsReadOnlyFinalApprovalSealItem[],
  category: TmsReadOnlyFinalApprovalSealCategory,
) {
  return items.filter((item) => item.category === category);
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView(input: {
  operatingDeploymentFinalApprovalPacketOutcomeCertification: TmsReadOnlyOperatingDeploymentFinalApprovalPacketOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentFinalApprovalSealReviewView {
  const outcomeCertification =
    input.operatingDeploymentFinalApprovalPacketOutcomeCertification;
  const operatingDeploymentFinalApprovalSealReviewStatus =
    mapOutcomeCertificationToSealReviewStatus(
      outcomeCertification.operatingDeploymentFinalApprovalPacketOutcomeCertificationStatus,
    );
  const finalApprovalSealItems = SEAL_ITEM_DEFINITIONS.map((definition) =>
    buildSealItem(
      definition,
      outcomeCertification,
      operatingDeploymentFinalApprovalSealReviewStatus,
    ),
  );

  const finalApprovalSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'FINAL_APPROVAL_SEAL_LOCK',
  );
  const deploymentApprovalSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'DEPLOYMENT_APPROVAL_SEAL_LOCK',
  );
  const deploymentExecutionSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'DEPLOYMENT_EXECUTION_SEAL_LOCK',
  );
  const infrastructureSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'INFRASTRUCTURE_SEAL_LOCK',
  );
  const domainDnsHttpsSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'DOMAIN_DNS_HTTPS_SEAL_LOCK',
  );
  const operatingDbSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'OPERATING_DB_SEAL_LOCK',
  );
  const runtimeWorkerQueueAdapterSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'RUNTIME_WORKER_QUEUE_ADAPTER_SEAL_LOCK',
  );
  const apiAndSecretSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'API_AND_SECRET_SEAL_LOCK',
  );
  const uiActionSealLockItems = filterByCategory(
    finalApprovalSealItems,
    'UI_ACTION_SEAL_LOCK',
  );
  const finalSealRequirementItems = filterByCategory(
    finalApprovalSealItems,
    'FINAL_SEAL_REQUIREMENT',
  );

  const readySealItems = finalApprovalSealItems.filter((item) => item.isReady);
  const partialReadySealItems = finalApprovalSealItems.filter(
    (item) => item.isPartialReady,
  );
  const blockedSealItems = finalApprovalSealItems.filter(
    (item) => item.isBlocked,
  );
  const notStartedSealItems = finalApprovalSealItems.filter(
    (item) => item.isNotStarted,
  );

  const sealSummaryCards: TmsReadOnlyFinalApprovalSealSummaryCard[] = [
    {
      label: '최종 승인 Seal 검토 상태',
      value: operatingDeploymentFinalApprovalSealReviewStatus.replace(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_',
        '',
      ),
      tone: toSummaryTone(operatingDeploymentFinalApprovalSealReviewStatus),
    },
    {
      label: '인증된 Go/No-Go 후보',
      value: outcomeCertification.outcomeCertifiedGoNoGoDecisionLabel,
      tone:
        outcomeCertification.outcomeCertifiedGoNoGoDecision ===
        'GO_CANDIDATE_REVIEW_ONLY'
          ? 'positive'
          : outcomeCertification.outcomeCertifiedGoNoGoDecision ===
                'NO_GO_CANDIDATE_REVIEW_ONLY'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '총 Seal 검토 항목',
      value: `${finalApprovalSealItems.length}개`,
      tone: 'neutral',
    },
    {
      label: '별도 승인 필요',
      value: `${finalApprovalSealItems.length}개`,
      tone: 'warning',
    },
  ];

  const finalApprovalSealReviewReady =
    operatingDeploymentFinalApprovalSealReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_READY';
  const finalApprovalSealReviewPartialReady =
    operatingDeploymentFinalApprovalSealReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_PARTIAL_READY';
  const finalApprovalSealReviewBlocked =
    operatingDeploymentFinalApprovalSealReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_BLOCKED';
  const finalApprovalSealReviewNotStarted =
    operatingDeploymentFinalApprovalSealReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_NOT_STARTED';

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_REVIEW_VIEW',
    taskId: 357,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Seal Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 최종 승인 Seal 검토',
    description:
      '이 패널은 운영 배포 최종 승인 전 Seal 상태를 read-only로 검토하는 화면입니다. 이 화면은 실제 최종 승인, 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 358은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 357,
    isBatchJobResultDisplayOnly: true,
    sourceFinalApprovalPacketOutcomeCertificationStatus:
      outcomeCertification.operatingDeploymentFinalApprovalPacketOutcomeCertificationStatus,
    sourceOutcomeCertifiedGoNoGoDecision:
      outcomeCertification.outcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel:
      outcomeCertification.outcomeCertifiedGoNoGoDecisionLabel,
    operatingDeploymentFinalApprovalSealReviewStatus,
    finalApprovalSealReviewReady,
    finalApprovalSealReviewPartialReady,
    finalApprovalSealReviewBlocked,
    finalApprovalSealReviewNotStarted,
    finalApprovalSealReviewStarted: true,
    finalApprovalSealStillReadOnly: true,
    sealCertifiedGoNoGoDecision:
      outcomeCertification.outcomeCertifiedGoNoGoDecision,
    sealCertifiedGoNoGoDecisionLabel:
      outcomeCertification.outcomeCertifiedGoNoGoDecisionLabel,
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_APPROVAL_SEAL_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalApprovalSealItems,
    finalApprovalSealLockItems,
    deploymentApprovalSealLockItems,
    deploymentExecutionSealLockItems,
    infrastructureSealLockItems,
    domainDnsHttpsSealLockItems,
    operatingDbSealLockItems,
    runtimeWorkerQueueAdapterSealLockItems,
    apiAndSecretSealLockItems,
    uiActionSealLockItems,
    finalSealRequirementItems,
    sealSummaryCards,
    readySealItems,
    partialReadySealItems,
    blockedSealItems,
    notStartedSealItems,
    finalApprovalSealLockItemCount: finalApprovalSealLockItems.length,
    deploymentApprovalSealLockItemCount:
      deploymentApprovalSealLockItems.length,
    deploymentExecutionSealLockItemCount:
      deploymentExecutionSealLockItems.length,
    infrastructureSealLockItemCount: infrastructureSealLockItems.length,
    domainDnsHttpsSealLockItemCount: domainDnsHttpsSealLockItems.length,
    operatingDbSealLockItemCount: operatingDbSealLockItems.length,
    runtimeWorkerQueueAdapterSealLockItemCount:
      runtimeWorkerQueueAdapterSealLockItems.length,
    apiAndSecretSealLockItemCount: apiAndSecretSealLockItems.length,
    uiActionSealLockItemCount: uiActionSealLockItems.length,
    finalSealRequirementItemCount: finalSealRequirementItems.length,
    readyItemCount: readySealItems.length,
    partialReadyItemCount: partialReadySealItems.length,
    blockedItemCount: blockedSealItems.length,
    notStartedItemCount: notStartedSealItems.length,
    totalFinalApprovalSealItemCount: finalApprovalSealItems.length,
    actualFinalApprovalGranted: false,
    actualFinalApprovalPacketSubmitted: false,
    actualDeploymentApprovalGranted: false,
    actualDeploymentStarted: false,
    actualProductionTransitionStarted: false,
    actualGoDecisionGranted: false,
    actualNoGoDecisionGranted: false,
    actualGoNoGoDecisionSaved: false,
    actualApprovalPacketSubmitted: false,
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
    finalApprovalSealStillDisplayOnly: true,
    finalApprovalSealStillLocked: true,
    finalApprovalSubmissionStillBlocked: true,
    finalApprovalStillReadOnly: true,
    finalApprovalStillBlocked: true,
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
    isReadOnlyOperatingDeploymentFinalApprovalSealReview: true,
    requiresSeparateTask358Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_358_APPROVAL_PHRASE,
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
