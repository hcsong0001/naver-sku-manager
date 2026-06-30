import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-seal-outcome-certification-view.service';
import { type TmsReadOnlyGoNoGoDecision } from './tms-read-only-operating-deployment-go-no-go-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED';

export type TmsReadOnlyFinalApprovalCandidateItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyFinalApprovalCandidateItemCategory =
  | 'FINAL_APPROVAL_CANDIDATE_READINESS'
  | 'FINAL_APPROVAL_CANDIDATE_BOUNDARY'
  | 'FINAL_APPROVAL_CANDIDATE_SEAL'
  | 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE'
  | 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK'
  | 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT';

export type TmsReadOnlyFinalApprovalCandidateDecision =
  'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY';

export const NEXT_TASK_360_APPROVAL_PHRASE =
  'Task 360에서 TMS read-only 운영 배포 최종 승인 후보 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 359 운영 배포 최종 승인 후보 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

interface TmsReadOnlyFinalApprovalCandidateItemDefinition {
  candidateItemId: string;
  category: TmsReadOnlyFinalApprovalCandidateItemCategory;
  label: string;
  description: string;
}

export interface TmsReadOnlyFinalApprovalCandidateItem {
  candidateItemId: string;
  category: TmsReadOnlyFinalApprovalCandidateItemCategory;
  label: string;
  description: string;
  sourceTaskId: 358;
  sourceStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationStatus;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationStatus;
  sourceCertifiedDecision: TmsReadOnlyGoNoGoDecision;
  candidateReviewStatus: TmsReadOnlyFinalApprovalCandidateItemStatus;
  recommendedCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualCandidateSaved: false;
  actualApprovalGranted: false;
  actualSubmissionPerformed: false;
  actualChangePerformed: false;
  requiresSeparateApproval: true;
}

export interface TmsReadOnlyFinalApprovalCandidateSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_VIEW';
  taskId: 359;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 359;
  isBatchJobResultDisplayOnly: true;
  sourceFinalApprovalSealOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationStatus;
  sourceOutcomeCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  sourceOutcomeCertifiedGoNoGoDecisionLabel: string;
  operatingDeploymentFinalApprovalCandidateReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus;
  finalApprovalCandidateReviewReady: boolean;
  finalApprovalCandidateReviewPartialReady: boolean;
  finalApprovalCandidateReviewBlocked: boolean;
  finalApprovalCandidateReviewNotStarted: boolean;
  finalApprovalCandidateReviewStarted: true;
  finalApprovalCandidateStillReadOnly: true;
  candidateCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  candidateCertifiedGoNoGoDecisionLabel: string;
  recommendedFinalApprovalCandidateDecision: TmsReadOnlyFinalApprovalCandidateDecision;
  recommendedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  finalApprovalCandidateItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateReadinessItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateBoundaryItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateSealItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateApprovalPrerequisiteItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateExecutionBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateInfrastructureBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateDomainDnsHttpsBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateOperatingDbBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateRuntimeWorkerQueueAdapterBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateApiAndSecretBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateUiActionBlockItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateFinalRequirementItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateSummaryCards: readonly TmsReadOnlyFinalApprovalCandidateSummaryCard[];
  readyCandidateItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  partialReadyCandidateItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  blockedCandidateItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  notStartedCandidateItems: readonly TmsReadOnlyFinalApprovalCandidateItem[];
  candidateReadinessItemCount: number;
  candidateBoundaryItemCount: number;
  candidateSealItemCount: number;
  candidateApprovalPrerequisiteItemCount: number;
  candidateExecutionBlockItemCount: number;
  candidateInfrastructureBlockItemCount: number;
  candidateDomainDnsHttpsBlockItemCount: number;
  candidateOperatingDbBlockItemCount: number;
  candidateRuntimeWorkerQueueAdapterBlockItemCount: number;
  candidateApiAndSecretBlockItemCount: number;
  candidateUiActionBlockItemCount: number;
  candidateFinalRequirementItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalApprovalCandidateItemCount: number;
  actualFinalApprovalGranted: false;
  actualFinalApprovalCandidateSaved: false;
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
  finalApprovalCandidateStillDisplayOnly: true;
  finalApprovalCandidateStillNotApproved: true;
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
  isReadOnlyOperatingDeploymentFinalApprovalCandidateReview: true;
  requiresSeparateTask360Approval: true;
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

const CANDIDATE_ITEM_DEFINITIONS: readonly TmsReadOnlyFinalApprovalCandidateItemDefinition[] =
  [
    {
      candidateItemId: 'candidate-readiness-seal-status-reflected',
      category: 'FINAL_APPROVAL_CANDIDATE_READINESS',
      label: 'Task 358 Seal 결과 인증 상태 반영',
      description: 'Task 358 최종 승인 Seal 결과 인증 상태를 후보 검토 입력으로 반영합니다.',
    },
    {
      candidateItemId: 'candidate-readiness-review-started',
      category: 'FINAL_APPROVAL_CANDIDATE_READINESS',
      label: '최종 승인 후보 검토 시작 상태 표시',
      description: '최종 승인 후보 검토가 시작되었지만 read-only 상태임을 표시합니다.',
    },
    {
      candidateItemId: 'candidate-readiness-certified-go-no-go',
      category: 'FINAL_APPROVAL_CANDIDATE_READINESS',
      label: '인증된 Go/No-Go 후보 값 반영',
      description: '인증된 Go/No-Go 후보 값을 최종 승인 후보 검토 상태에 반영합니다.',
    },
    {
      candidateItemId: 'candidate-readiness-not-saved',
      category: 'FINAL_APPROVAL_CANDIDATE_READINESS',
      label: '실제 최종 승인 후보 저장은 아직 없음',
      description: '실제 최종 승인 후보 저장이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-boundary-not-final-approval',
      category: 'FINAL_APPROVAL_CANDIDATE_BOUNDARY',
      label: '후보 검토는 실제 최종 승인이 아님',
      description: '현재 단계는 실제 최종 승인이 아니라 후보 검토 단계임을 명확히 합니다.',
    },
    {
      candidateItemId: 'candidate-boundary-not-go-no-go-save',
      category: 'FINAL_APPROVAL_CANDIDATE_BOUNDARY',
      label: '후보 검토는 실제 Go/No-Go 결정 저장이 아님',
      description: '현재 단계는 실제 Go/No-Go 결정 저장이 아님을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-boundary-not-deployment-approval',
      category: 'FINAL_APPROVAL_CANDIDATE_BOUNDARY',
      label: '후보 검토는 실제 배포 승인이 아님',
      description: '현재 단계는 실제 배포 승인 단계가 아님을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-boundary-not-deployment-execution',
      category: 'FINAL_APPROVAL_CANDIDATE_BOUNDARY',
      label: '후보 검토는 실제 배포 실행이 아님',
      description: '현재 단계는 실제 배포 실행 단계가 아님을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-seal-outcome-reflected',
      category: 'FINAL_APPROVAL_CANDIDATE_SEAL',
      label: '최종 승인 Seal 결과 인증 상태 반영',
      description: 'Task 358 Seal 결과 인증 상태가 후보 검토에 그대로 반영됨을 확인합니다.',
    },
    {
      candidateItemId: 'candidate-seal-final-approval-locked',
      category: 'FINAL_APPROVAL_CANDIDATE_SEAL',
      label: '최종 승인은 아직 봉인 상태',
      description: '실제 최종 승인은 여전히 봉인 상태임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-seal-deployment-approval-locked',
      category: 'FINAL_APPROVAL_CANDIDATE_SEAL',
      label: '배포 승인은 아직 봉인 상태',
      description: '실제 배포 승인은 여전히 봉인 상태임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-seal-deployment-execution-locked',
      category: 'FINAL_APPROVAL_CANDIDATE_SEAL',
      label: '배포 실행은 아직 봉인 상태',
      description: '실제 배포 실행은 여전히 봉인 상태임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-approval-prerequisite-separate-approval',
      category: 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE',
      label: '실제 최종 승인 전 사용자 별도 승인 필요',
      description: '실제 최종 승인 전에는 사용자 별도 승인이 필요함을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-approval-prerequisite-no-submission',
      category: 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE',
      label: '실제 최종 승인 제출은 아직 없음',
      description: '실제 최종 승인 제출이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-approval-prerequisite-no-save',
      category: 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE',
      label: '실제 최종 승인 저장은 아직 없음',
      description: '실제 최종 승인 저장이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-approval-prerequisite-outcome-task-required',
      category: 'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE',
      label: '실제 승인 결과 인증은 별도 Task 필요',
      description: '실제 승인 결과 인증은 다음 별도 Task에서만 진행되어야 함을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-execution-block-no-deployment-start',
      category: 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK',
      label: '실제 배포 실행 없음',
      description: '실제 배포 실행이 시작되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-execution-block-no-production-transition',
      category: 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK',
      label: '실제 운영 전환 없음',
      description: '실제 운영 전환이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-execution-block-no-ui-submit-post',
      category: 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK',
      label: '실행 버튼 / submit / POST API 추가 없음',
      description: '실행 CTA, submit action, POST API가 추가되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-execution-block-still-blocked',
      category: 'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK',
      label: '배포 실행은 별도 승인 전까지 차단',
      description: '별도 승인 전까지 배포 실행이 차단 상태임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-infra-block-no-vps-create',
      category: 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK',
      label: '실제 VPS 생성 없음',
      description: '실제 VPS 생성이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-infra-block-no-vps-config',
      category: 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK',
      label: '실제 VPS 설정 변경 없음',
      description: '실제 VPS 설정 변경이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-infra-block-no-server-config',
      category: 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK',
      label: '실제 서버 설정 변경 없음',
      description: '실제 서버 설정 변경이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-infra-block-still-blocked',
      category: 'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK',
      label: '인프라 변경은 별도 승인 전까지 차단',
      description: '별도 승인 전까지 인프라 변경이 차단 상태임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-domain-block-no-domain-connect',
      category: 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK',
      label: '실제 도메인 연결 없음',
      description: '실제 도메인 연결이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-domain-block-no-dns-change',
      category: 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK',
      label: 'DNS 레코드 생성/수정 없음',
      description: 'DNS 레코드 생성이나 수정이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-domain-block-no-ssl-issue',
      category: 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK',
      label: 'HTTPS/SSL 인증서 발급 없음',
      description: 'HTTPS/SSL 인증서 발급이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-domain-block-still-blocked',
      category: 'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK',
      label: '도메인/DNS/HTTPS 작업은 별도 승인 전까지 차단',
      description: '별도 승인 전까지 도메인, DNS, HTTPS 작업이 차단 상태임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-db-block-no-connection-change',
      category: 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK',
      label: '실제 운영 DB 연결 변경 없음',
      description: '실제 운영 DB 연결 변경이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-db-block-no-database-url-change',
      category: 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK',
      label: 'DATABASE_URL 변경 없음',
      description: 'DATABASE_URL 변경이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-db-block-no-db-write',
      category: 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK',
      label: 'DB write 없음',
      description: 'DB write가 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-db-block-no-db-ops',
      category: 'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK',
      label: 'DB 백업/복구/롤백/migration 실행 없음',
      description: 'DB backup, restore, rollback, migration이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-runtime-block-no-runtime-config',
      category: 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK',
      label: '실제 Runtime 구성 없음',
      description: '실제 Runtime 구성이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-runtime-block-no-worker-start',
      category: 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK',
      label: 'Worker 실행 없음',
      description: 'Worker 실행이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-runtime-block-no-queue-enqueue',
      category: 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK',
      label: 'Queue enqueue 없음',
      description: 'Queue enqueue가 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-runtime-block-no-redis-change',
      category: 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK',
      label: 'Redis 운영 연결 변경 없음',
      description: 'Redis 운영 연결 변경이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-runtime-block-no-adapter-connect',
      category: 'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK',
      label: 'Adapter 연결 없음',
      description: 'Adapter 연결이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-api-block-no-naver-call',
      category: 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK',
      label: '실제 Naver API 호출 없음',
      description: '실제 Naver API 호출이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-api-block-no-product-lookup-recall',
      category: 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK',
      label: '상품 조회 API 재호출 없음',
      description: '상품 조회 API 재호출이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-api-block-no-product-update-call',
      category: 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK',
      label: '상품 수정 API 호출 없음',
      description: '상품 수정 API 호출이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-api-block-auth-hidden',
      category: 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK',
      label: 'Token/Auth/Signature/Authorization 값 비노출 유지',
      description: '민감한 인증 값이 계속 비노출 상태로 유지됨을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-api-block-raw-response-hidden',
      category: 'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK',
      label: 'raw API response 비표시/비저장 유지',
      description: 'raw API response가 표시되거나 저장되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-ui-block-no-execution-button',
      category: 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK',
      label: '실행 버튼 추가 없음',
      description: '실행 버튼이 추가되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-ui-block-no-submit-action',
      category: 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK',
      label: 'submit action 추가 없음',
      description: 'submit action이 추가되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-ui-block-no-post-api',
      category: 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK',
      label: 'POST API 추가 없음',
      description: 'POST API가 추가되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-ui-block-no-price-stock-change',
      category: 'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK',
      label: '가격/재고 변경 없음',
      description: '가격과 재고 변경이 수행되지 않았음을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-final-requirement-outcome-task-required',
      category: 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT',
      label: '실제 최종 승인 후보 결과 인증은 별도 Task 필요',
      description: '최종 승인 후보 결과 인증은 다음 별도 Task에서만 진행되어야 함을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-final-requirement-final-approval-task-required',
      category: 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT',
      label: '실제 최종 승인 단계는 별도 Task 필요',
      description: '실제 최종 승인 단계는 현재 화면 범위 밖의 별도 승인 단계임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-final-requirement-deployment-approval-task-required',
      category: 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT',
      label: '실제 배포 승인 단계는 별도 Task 필요',
      description: '실제 배포 승인 단계는 현재 화면 범위 밖의 별도 승인 단계임을 검토합니다.',
    },
    {
      candidateItemId: 'candidate-final-requirement-deployment-execution-task-required',
      category: 'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT',
      label: '실제 배포 실행 단계는 별도 Task 필요',
      description: '실제 배포 실행 단계는 현재 화면 범위 밖의 별도 승인 단계임을 검토합니다.',
    },
  ];

function exhaustiveGuard(value: never): never {
  throw new Error(`Unknown value: ${String(value)}`);
}

function mapOutcomeCertificationToCandidateReviewStatus(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationStatus,
): TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SEAL_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function mapCandidateReviewStatusToItemStatus(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus,
): TmsReadOnlyFinalApprovalCandidateItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default:
      return exhaustiveGuard(status);
  }
}

function toSummaryTone(
  status: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus,
): 'positive' | 'neutral' | 'warning' {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY':
      return 'positive';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED':
      return 'warning';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY':
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED':
      return 'neutral';
    default:
      return exhaustiveGuard(status);
  }
}

function buildCandidateItem(
  definition: TmsReadOnlyFinalApprovalCandidateItemDefinition,
  sourceView: TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView,
  candidateReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewStatus,
): TmsReadOnlyFinalApprovalCandidateItem {
  const itemStatus = mapCandidateReviewStatusToItemStatus(candidateReviewStatus);

  return {
    candidateItemId: definition.candidateItemId,
    category: definition.category,
    label: definition.label,
    description: definition.description,
    sourceTaskId: 358,
    sourceStatus:
      sourceView.operatingDeploymentFinalApprovalSealOutcomeCertificationStatus,
    sourceOutcomeCertificationStatus:
      sourceView.operatingDeploymentFinalApprovalSealOutcomeCertificationStatus,
    sourceCertifiedDecision: sourceView.outcomeCertifiedGoNoGoDecision,
    candidateReviewStatus: itemStatus,
    recommendedCandidateDecision: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
    isReady: itemStatus === 'READY',
    isPartialReady: itemStatus === 'PARTIAL_READY',
    isBlocked: itemStatus === 'BLOCKED',
    isNotStarted: itemStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualCandidateSaved: false,
    actualApprovalGranted: false,
    actualSubmissionPerformed: false,
    actualChangePerformed: false,
    requiresSeparateApproval: true,
  };
}

function filterByCategory(
  items: readonly TmsReadOnlyFinalApprovalCandidateItem[],
  category: TmsReadOnlyFinalApprovalCandidateItemCategory,
) {
  return items.filter((item) => item.category === category);
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView(input: {
  operatingDeploymentFinalApprovalSealOutcomeCertification: TmsReadOnlyOperatingDeploymentFinalApprovalSealOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentFinalApprovalCandidateReviewView {
  const outcomeCertification =
    input.operatingDeploymentFinalApprovalSealOutcomeCertification;
  const operatingDeploymentFinalApprovalCandidateReviewStatus =
    mapOutcomeCertificationToCandidateReviewStatus(
      outcomeCertification.operatingDeploymentFinalApprovalSealOutcomeCertificationStatus,
    );
  const finalApprovalCandidateItems = CANDIDATE_ITEM_DEFINITIONS.map(
    (definition) =>
      buildCandidateItem(
        definition,
        outcomeCertification,
        operatingDeploymentFinalApprovalCandidateReviewStatus,
      ),
  );

  const candidateReadinessItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_READINESS',
  );
  const candidateBoundaryItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_BOUNDARY',
  );
  const candidateSealItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_SEAL',
  );
  const candidateApprovalPrerequisiteItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_APPROVAL_PREREQUISITE',
  );
  const candidateExecutionBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_EXECUTION_BLOCK',
  );
  const candidateInfrastructureBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_INFRASTRUCTURE_BLOCK',
  );
  const candidateDomainDnsHttpsBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_DOMAIN_DNS_HTTPS_BLOCK',
  );
  const candidateOperatingDbBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_OPERATING_DB_BLOCK',
  );
  const candidateRuntimeWorkerQueueAdapterBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_RUNTIME_WORKER_QUEUE_ADAPTER_BLOCK',
  );
  const candidateApiAndSecretBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_API_AND_SECRET_BLOCK',
  );
  const candidateUiActionBlockItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_UI_ACTION_BLOCK',
  );
  const candidateFinalRequirementItems = filterByCategory(
    finalApprovalCandidateItems,
    'FINAL_APPROVAL_CANDIDATE_FINAL_REQUIREMENT',
  );

  const readyCandidateItems = finalApprovalCandidateItems.filter(
    (item) => item.isReady,
  );
  const partialReadyCandidateItems = finalApprovalCandidateItems.filter(
    (item) => item.isPartialReady,
  );
  const blockedCandidateItems = finalApprovalCandidateItems.filter(
    (item) => item.isBlocked,
  );
  const notStartedCandidateItems = finalApprovalCandidateItems.filter(
    (item) => item.isNotStarted,
  );

  const candidateSummaryCards: TmsReadOnlyFinalApprovalCandidateSummaryCard[] = [
    {
      label: '최종 승인 후보 검토 상태',
      value: operatingDeploymentFinalApprovalCandidateReviewStatus.replace(
        'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_',
        '',
      ),
      tone: toSummaryTone(operatingDeploymentFinalApprovalCandidateReviewStatus),
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
      label: '추천 최종 승인 후보 결정',
      value: '최종 승인 후보 - read-only 검토 전용',
      tone: 'neutral',
    },
    {
      label: '총 후보 검토 항목',
      value: `${finalApprovalCandidateItems.length}개`,
      tone: 'warning',
    },
  ];

  const finalApprovalCandidateReviewReady =
    operatingDeploymentFinalApprovalCandidateReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_READY';
  const finalApprovalCandidateReviewPartialReady =
    operatingDeploymentFinalApprovalCandidateReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_PARTIAL_READY';
  const finalApprovalCandidateReviewBlocked =
    operatingDeploymentFinalApprovalCandidateReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_BLOCKED';
  const finalApprovalCandidateReviewNotStarted =
    operatingDeploymentFinalApprovalCandidateReviewStatus ===
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_NOT_STARTED';

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_REVIEW_VIEW',
    taskId: 359,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Candidate Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 최종 승인 후보 검토',
    description:
      '이 패널은 운영 배포 최종 승인 후보 상태를 read-only로 검토하는 화면입니다. 이 화면은 실제 최종 승인, 실제 승인 제출, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 360은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 359,
    isBatchJobResultDisplayOnly: true,
    sourceFinalApprovalSealOutcomeCertificationStatus:
      outcomeCertification.operatingDeploymentFinalApprovalSealOutcomeCertificationStatus,
    sourceOutcomeCertifiedGoNoGoDecision:
      outcomeCertification.outcomeCertifiedGoNoGoDecision,
    sourceOutcomeCertifiedGoNoGoDecisionLabel:
      outcomeCertification.outcomeCertifiedGoNoGoDecisionLabel,
    operatingDeploymentFinalApprovalCandidateReviewStatus,
    finalApprovalCandidateReviewReady,
    finalApprovalCandidateReviewPartialReady,
    finalApprovalCandidateReviewBlocked,
    finalApprovalCandidateReviewNotStarted,
    finalApprovalCandidateReviewStarted: true,
    finalApprovalCandidateStillReadOnly: true,
    candidateCertifiedGoNoGoDecision:
      outcomeCertification.outcomeCertifiedGoNoGoDecision,
    candidateCertifiedGoNoGoDecisionLabel:
      outcomeCertification.outcomeCertifiedGoNoGoDecisionLabel,
    recommendedFinalApprovalCandidateDecision:
      'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
    recommendedFinalApprovalCandidateDecisionLabel:
      '최종 승인 후보 - read-only 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalApprovalCandidateItems,
    candidateReadinessItems,
    candidateBoundaryItems,
    candidateSealItems,
    candidateApprovalPrerequisiteItems,
    candidateExecutionBlockItems,
    candidateInfrastructureBlockItems,
    candidateDomainDnsHttpsBlockItems,
    candidateOperatingDbBlockItems,
    candidateRuntimeWorkerQueueAdapterBlockItems,
    candidateApiAndSecretBlockItems,
    candidateUiActionBlockItems,
    candidateFinalRequirementItems,
    candidateSummaryCards,
    readyCandidateItems,
    partialReadyCandidateItems,
    blockedCandidateItems,
    notStartedCandidateItems,
    candidateReadinessItemCount: candidateReadinessItems.length,
    candidateBoundaryItemCount: candidateBoundaryItems.length,
    candidateSealItemCount: candidateSealItems.length,
    candidateApprovalPrerequisiteItemCount:
      candidateApprovalPrerequisiteItems.length,
    candidateExecutionBlockItemCount: candidateExecutionBlockItems.length,
    candidateInfrastructureBlockItemCount:
      candidateInfrastructureBlockItems.length,
    candidateDomainDnsHttpsBlockItemCount:
      candidateDomainDnsHttpsBlockItems.length,
    candidateOperatingDbBlockItemCount:
      candidateOperatingDbBlockItems.length,
    candidateRuntimeWorkerQueueAdapterBlockItemCount:
      candidateRuntimeWorkerQueueAdapterBlockItems.length,
    candidateApiAndSecretBlockItemCount:
      candidateApiAndSecretBlockItems.length,
    candidateUiActionBlockItemCount: candidateUiActionBlockItems.length,
    candidateFinalRequirementItemCount:
      candidateFinalRequirementItems.length,
    readyItemCount: readyCandidateItems.length,
    partialReadyItemCount: partialReadyCandidateItems.length,
    blockedItemCount: blockedCandidateItems.length,
    notStartedItemCount: notStartedCandidateItems.length,
    totalFinalApprovalCandidateItemCount: finalApprovalCandidateItems.length,
    actualFinalApprovalGranted: false,
    actualFinalApprovalCandidateSaved: false,
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
    finalApprovalCandidateStillDisplayOnly: true,
    finalApprovalCandidateStillNotApproved: true,
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
    isReadOnlyOperatingDeploymentFinalApprovalCandidateReview: true,
    requiresSeparateTask360Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_360_APPROVAL_PHRASE,
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
