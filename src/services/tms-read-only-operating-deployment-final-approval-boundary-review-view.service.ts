import {
  type TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationView,
} from './tms-read-only-operating-deployment-go-no-go-outcome-certification-view.service';
import {
  type TmsReadOnlyGoNoGoDecision,
} from './tms-read-only-operating-deployment-go-no-go-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_NOT_STARTED';

export type TmsReadOnlyFinalApprovalBoundaryItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyFinalApprovalBoundaryCategory =
  | 'GO_NO_GO_BOUNDARY'
  | 'DEPLOYMENT_APPROVAL_BOUNDARY'
  | 'DEPLOYMENT_EXECUTION_BOUNDARY'
  | 'INFRASTRUCTURE_BOUNDARY'
  | 'DOMAIN_DNS_HTTPS_BOUNDARY'
  | 'OPERATING_DB_BOUNDARY'
  | 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY'
  | 'API_AND_SECRET_BOUNDARY'
  | 'UI_ACTION_BOUNDARY'
  | 'FINAL_BOUNDARY_REQUIREMENT';

export const NEXT_TASK_354_APPROVAL_PHRASE =
  'Task 354에서 TMS read-only 운영 배포 최종 승인 경계 결과 인증 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 353 운영 배포 최종 승인 경계 검토 결과를 read-only로 인증하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyFinalApprovalBoundaryItem {
  boundaryItemId: string;
  category: TmsReadOnlyFinalApprovalBoundaryCategory;
  label: string;
  description: string;
  sourceTaskId: 352 | 353;
  sourceStatus: string;
  sourceCertifiedDecision: string;
  boundaryReviewStatus: TmsReadOnlyFinalApprovalBoundaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualApprovalGranted: false;
  actualDecisionSaved: false;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyFinalApprovalBoundarySummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_VIEW';
  taskId: 353;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 353;
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentGoNoGoOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus;
  sourceCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  sourceCertifiedGoNoGoDecisionLabel: string;
  operatingDeploymentFinalApprovalBoundaryReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewStatus;
  finalApprovalBoundaryReviewReady: boolean;
  finalApprovalBoundaryReviewPartialReady: boolean;
  finalApprovalBoundaryReviewBlocked: boolean;
  finalApprovalBoundaryReviewNotStarted: boolean;
  finalApprovalBoundaryReviewStarted: true;
  finalApprovalBoundaryStillReadOnly: true;
  boundaryCertifiedGoNoGoDecision: TmsReadOnlyGoNoGoDecision;
  boundaryCertifiedGoNoGoDecisionLabel: string;
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'FINAL_APPROVAL_BOUNDARY_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  finalApprovalBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  goNoGoBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  deploymentApprovalBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  deploymentExecutionBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  infrastructureBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  domainDnsHttpsBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  operatingDbBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  runtimeWorkerQueueAdapterBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  apiAndSecretBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  uiActionBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  finalBoundaryRequirementItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  boundarySummaryCards: readonly TmsReadOnlyFinalApprovalBoundarySummaryCard[];
  readyBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  partialReadyBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  blockedBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  notStartedBoundaryItems: readonly TmsReadOnlyFinalApprovalBoundaryItem[];
  goNoGoBoundaryItemCount: number;
  deploymentApprovalBoundaryItemCount: number;
  deploymentExecutionBoundaryItemCount: number;
  infrastructureBoundaryItemCount: number;
  domainDnsHttpsBoundaryItemCount: number;
  operatingDbBoundaryItemCount: number;
  runtimeWorkerQueueAdapterBoundaryItemCount: number;
  apiAndSecretBoundaryItemCount: number;
  uiActionBoundaryItemCount: number;
  finalBoundaryRequirementItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalFinalApprovalBoundaryItemCount: number;
  actualFinalApprovalGranted: false;
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
  isReadOnlyOperatingDeploymentFinalApprovalBoundaryReview: true;
  requiresSeparateTask354Approval: true;
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

function mapOutcomeCertToFinalApprovalBoundaryStatus(
  s: TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationStatus,
): TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewStatus {
  switch (s) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_NOT_STARTED';
    default: { const _: never = s; throw new Error(`Unknown status: ${_}`); }
  }
}

function toItemStatus(overall: TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewStatus): TmsReadOnlyFinalApprovalBoundaryItemStatus {
  switch (overall) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_READY': return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_PARTIAL_READY': return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_BLOCKED': return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_NOT_STARTED': return 'NOT_STARTED';
    default: { const _: never = overall; throw new Error(`Unknown status: ${_}`); }
  }
}

function toBoundaryDecisionLabel(decision: TmsReadOnlyGoNoGoDecision): string {
  switch (decision) {
    case 'GO_CANDIDATE_REVIEW_ONLY': return 'Go 후보 - 최종 승인 경계 검토 전용';
    case 'HOLD_CANDIDATE_REVIEW_ONLY': return 'Hold 후보 - 최종 승인 경계 검토 전용';
    case 'NO_GO_CANDIDATE_REVIEW_ONLY': return 'No-Go 후보 - 최종 승인 경계 검토 전용';
    case 'NOT_READY_CANDIDATE_REVIEW_ONLY': return '준비 미완료 후보 - 최종 승인 경계 검토 전용';
    default: { const _: never = decision; throw new Error(`Unknown decision: ${_}`); }
  }
}

function makeBoundaryItem(input: {
  boundaryItemId: string;
  category: TmsReadOnlyFinalApprovalBoundaryCategory;
  label: string;
  description: string;
  sourceTaskId: 352 | 353;
  sourceStatus: string;
  sourceCertifiedDecision: string;
  boundaryReviewStatus: TmsReadOnlyFinalApprovalBoundaryItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyFinalApprovalBoundaryItem {
  return {
    boundaryItemId: input.boundaryItemId,
    category: input.category,
    label: input.label,
    description: input.description,
    sourceTaskId: input.sourceTaskId,
    sourceStatus: input.sourceStatus,
    sourceCertifiedDecision: input.sourceCertifiedDecision,
    boundaryReviewStatus: input.boundaryReviewStatus,
    isReady: input.boundaryReviewStatus === 'READY',
    isPartialReady: input.boundaryReviewStatus === 'PARTIAL_READY',
    isBlocked: input.boundaryReviewStatus === 'BLOCKED',
    isNotStarted: input.boundaryReviewStatus === 'NOT_STARTED',
    isReadOnly: true,
    actualApprovalGranted: false,
    actualDecisionSaved: false,
    actualChangePerformed: false,
    requiresSeparateApproval: input.requiresSeparateApproval,
  };
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView(input: {
  operatingDeploymentGoNoGoOutcomeCertification: TmsReadOnlyOperatingDeploymentGoNoGoOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentFinalApprovalBoundaryReviewView {
  const cert = input.operatingDeploymentGoNoGoOutcomeCertification;
  const sourceStatus = cert.operatingDeploymentGoNoGoOutcomeCertificationStatus;
  const overallStatus = mapOutcomeCertToFinalApprovalBoundaryStatus(sourceStatus);
  const itemStatus = toItemStatus(overallStatus);
  const certDecision = cert.certifiedGoNoGoDecision;
  const decisionLabel = toBoundaryDecisionLabel(certDecision);
  const sourceStatusStr = sourceStatus;
  const certDecisionStr = String(certDecision);

  const goNoGoBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-go-no-go-outcome-certification-status',
      category: 'GO_NO_GO_BOUNDARY',
      label: 'Task 352 Go/No-Go 결과 인증 상태 반영',
      description: 'Task 352에서 인증된 Go/No-Go 결과 인증 상태를 최종 승인 경계 검토에 반영합니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: itemStatus,
      requiresSeparateApproval: true,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-go-no-go-candidate-not-actual',
      category: 'GO_NO_GO_BOUNDARY',
      label: '인증된 Go/No-Go 후보는 실제 결정 저장이 아님',
      description: 'Task 342~352에 걸쳐 검토·인증된 Go/No-Go 후보는 실제 결정 저장이 아닌 read-only 검토 결과입니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-go-decision-requires-approval',
      category: 'GO_NO_GO_BOUNDARY',
      label: '실제 Go 결정은 별도 승인 필요',
      description: '실제 Go 결정은 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-no-go-decision-requires-approval',
      category: 'GO_NO_GO_BOUNDARY',
      label: '실제 No-Go 결정 저장도 별도 승인 필요',
      description: '실제 No-Go 결정 저장도 사용자 별도 명시 승인 이후에만 가능합니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
  ];

  const deploymentApprovalBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-deployment-approval-not-granted',
      category: 'DEPLOYMENT_APPROVAL_BOUNDARY',
      label: '실제 배포 승인은 아직 부여하지 않음',
      description: 'Task 342~352 전 단계에서 실제 배포 승인이 부여되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-final-approval-not-granted',
      category: 'DEPLOYMENT_APPROVAL_BOUNDARY',
      label: '실제 최종 승인은 아직 부여하지 않음',
      description: '실제 최종 승인은 아직 부여되지 않았으며, 별도 Task에서 처리됩니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-approval-packet-was-read-only',
      category: 'DEPLOYMENT_APPROVAL_BOUNDARY',
      label: '승인 패킷은 read-only 검토/인증 단계였음',
      description: 'Task 347~348 승인 패킷은 read-only 검토 및 인증 단계였으며, 실제 승인 제출이 아닙니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-final-approval-requires-separate-task',
      category: 'DEPLOYMENT_APPROVAL_BOUNDARY',
      label: '최종 승인 단계는 별도 Task 필요',
      description: '실제 최종 승인 단계는 Task 354 이후 별도 Task에서 처리됩니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
  ];

  const deploymentExecutionBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-deployment-not-executed',
      category: 'DEPLOYMENT_EXECUTION_BOUNDARY',
      label: '실제 배포 실행은 아직 하지 않음',
      description: 'Task 342~352 전 단계에서 실제 배포 실행이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-production-transition-not-started',
      category: 'DEPLOYMENT_EXECUTION_BOUNDARY',
      label: '실제 운영 전환은 아직 하지 않음',
      description: '실제 운영 전환(production transition)은 아직 시작되지 않았습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-deployment-blocked-until-final-approval',
      category: 'DEPLOYMENT_EXECUTION_BOUNDARY',
      label: '배포 실행은 최종 승인 전까지 차단',
      description: '실제 배포 실행은 최종 승인이 부여되기 전까지 차단 상태입니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-no-execution-button-submit-post',
      category: 'DEPLOYMENT_EXECUTION_BOUNDARY',
      label: '실행 버튼 / submit / POST API 미추가',
      description: 'Task 342~353까지 실행 버튼, submit action, POST API가 추가되지 않았습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const infrastructureBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-vps-not-created',
      category: 'INFRASTRUCTURE_BOUNDARY',
      label: '실제 VPS 생성 없음',
      description: '실제 VPS 서버 생성이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-actual-vps-config-not-changed',
      category: 'INFRASTRUCTURE_BOUNDARY',
      label: '실제 VPS 설정 변경 없음',
      description: '실제 VPS 설정 변경이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-server-config-not-changed',
      category: 'INFRASTRUCTURE_BOUNDARY',
      label: '실제 서버 설정 변경 없음',
      description: '서버 설정(포트포워딩, nginx 설정 등)이 변경되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-infrastructure-blocked-until-approval',
      category: 'INFRASTRUCTURE_BOUNDARY',
      label: '인프라 변경은 별도 승인 전까지 차단',
      description: '모든 인프라 변경 작업은 별도 승인이 부여될 때까지 차단 상태입니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
  ];

  const domainDnsHttpsBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-domain-not-connected',
      category: 'DOMAIN_DNS_HTTPS_BOUNDARY',
      label: '실제 도메인 연결 없음',
      description: '실제 도메인 연결이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-dns-record-not-created-or-modified',
      category: 'DOMAIN_DNS_HTTPS_BOUNDARY',
      label: 'DNS 레코드 생성/수정 없음',
      description: 'DNS A레코드, CNAME 등 레코드 생성·수정이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-ssl-not-issued',
      category: 'DOMAIN_DNS_HTTPS_BOUNDARY',
      label: 'HTTPS/SSL 인증서 발급 없음',
      description: 'SSL 인증서 발급 및 HTTPS 적용이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-domain-dns-https-blocked-until-approval',
      category: 'DOMAIN_DNS_HTTPS_BOUNDARY',
      label: '도메인/DNS/HTTPS 작업은 별도 승인 전까지 차단',
      description: '도메인 연결, DNS 변경, SSL 발급 작업은 별도 승인이 부여될 때까지 차단 상태입니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
  ];

  const operatingDbBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-operating-db-connection-not-changed',
      category: 'OPERATING_DB_BOUNDARY',
      label: '실제 운영 DB 연결 변경 없음',
      description: '운영 DB 연결 변경(DATABASE_URL 변경 포함)이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-database-url-not-changed',
      category: 'OPERATING_DB_BOUNDARY',
      label: 'DATABASE_URL 변경 없음',
      description: '.env/.env.local의 DATABASE_URL 값이 변경되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-db-write-not-performed',
      category: 'OPERATING_DB_BOUNDARY',
      label: 'DB write 없음',
      description: 'DB write, upsert, update 작업이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-db-backup-restore-rollback-migration-not-executed',
      category: 'OPERATING_DB_BOUNDARY',
      label: 'DB 백업/복구/롤백/migration 실행 없음',
      description: 'DB 백업, 복구, 롤백, migration 실행이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const runtimeWorkerQueueAdapterBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-runtime-not-configured',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      label: '실제 Runtime 구성 없음',
      description: '실제 Runtime 구성(PM2, systemd 등)이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-worker-not-started',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      label: 'Worker 실행 없음',
      description: 'Worker 프로세스 실행이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-queue-not-enqueued',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      label: 'Queue enqueue 없음',
      description: 'Queue enqueue 작업이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-redis-not-connected',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      label: 'Redis 운영 연결 변경 없음',
      description: 'Redis 운영 연결 설정 변경이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-adapter-not-connected',
      category: 'RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      label: 'Adapter 연결 없음',
      description: 'Adapter 연결 설정 변경이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const apiAndSecretBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-naver-api-not-called',
      category: 'API_AND_SECRET_BOUNDARY',
      label: '실제 Naver API 호출 없음',
      description: 'Naver 상품 조회 API 재호출 및 상품 수정 API 호출이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-token-auth-not-exposed',
      category: 'API_AND_SECRET_BOUNDARY',
      label: 'Token/Auth/Signature/Authorization 값 비노출 유지',
      description: 'Token, Auth, Signature, Authorization 값이 화면에 출력되지 않습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-raw-api-response-not-exposed',
      category: 'API_AND_SECRET_BOUNDARY',
      label: 'raw API response 비표시/비저장 유지',
      description: 'raw API response가 화면에 출력되거나 저장되지 않습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-env-file-not-read-or-modified',
      category: 'API_AND_SECRET_BOUNDARY',
      label: '.env/.env.local 열람 또는 수정 없음',
      description: '.env/.env.local 파일이 열람되거나 수정되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const uiActionBoundaryItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-execution-button-not-added',
      category: 'UI_ACTION_BOUNDARY',
      label: '실행 버튼 추가 없음',
      description: 'Task 342~353까지 실행 버튼이 추가되지 않았습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-submit-action-not-added',
      category: 'UI_ACTION_BOUNDARY',
      label: 'submit action 추가 없음',
      description: 'submit action 및 form 제출 기능이 추가되지 않았습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-post-api-not-added',
      category: 'UI_ACTION_BOUNDARY',
      label: 'POST API 추가 없음',
      description: 'POST API endpoint가 추가되지 않았습니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-price-stock-not-changed',
      category: 'UI_ACTION_BOUNDARY',
      label: '가격/재고 변경 없음',
      description: '상품 가격 변경 및 재고 변경이 수행되지 않았습니다.',
      sourceTaskId: 352,
      sourceStatus: sourceStatusStr,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const finalBoundaryRequirementItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    makeBoundaryItem({
      boundaryItemId: 'task-353-final-approval-screen-requires-separate-task',
      category: 'FINAL_BOUNDARY_REQUIREMENT',
      label: '실제 최종 승인 화면은 별도 Task 필요',
      description: '실제 최종 승인 화면은 별도 Task에서 처리됩니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-deployment-approval-screen-requires-separate-task',
      category: 'FINAL_BOUNDARY_REQUIREMENT',
      label: '실제 배포 승인 화면은 별도 Task 필요',
      description: '실제 배포 승인 화면은 별도 Task에서 처리됩니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-deployment-execution-requires-separate-task',
      category: 'FINAL_BOUNDARY_REQUIREMENT',
      label: '실제 배포 실행 화면 또는 실행 절차는 별도 Task 필요',
      description: '실제 배포 실행 화면 및 실행 절차는 별도 Task에서 처리됩니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: true,
    }),
    makeBoundaryItem({
      boundaryItemId: 'task-353-this-screen-is-boundary-review-only',
      category: 'FINAL_BOUNDARY_REQUIREMENT',
      label: '이번 화면은 최종 승인 전 경계를 read-only로 검토하는 단계',
      description: '이 화면은 실제 최종 승인, 배포 승인, 배포 실행이 아닌 read-only 경계 검토 단계입니다.',
      sourceTaskId: 353,
      sourceStatus: overallStatus,
      sourceCertifiedDecision: certDecisionStr,
      boundaryReviewStatus: 'READY',
      requiresSeparateApproval: false,
    }),
  ];

  const allItems: TmsReadOnlyFinalApprovalBoundaryItem[] = [
    ...goNoGoBoundaryItems,
    ...deploymentApprovalBoundaryItems,
    ...deploymentExecutionBoundaryItems,
    ...infrastructureBoundaryItems,
    ...domainDnsHttpsBoundaryItems,
    ...operatingDbBoundaryItems,
    ...runtimeWorkerQueueAdapterBoundaryItems,
    ...apiAndSecretBoundaryItems,
    ...uiActionBoundaryItems,
    ...finalBoundaryRequirementItems,
  ];

  const readyBoundaryItems = allItems.filter((i) => i.isReady);
  const partialReadyBoundaryItems = allItems.filter((i) => i.isPartialReady);
  const blockedBoundaryItems = allItems.filter((i) => i.isBlocked);
  const notStartedBoundaryItems = allItems.filter((i) => i.isNotStarted);

  const boundarySummaryCards: TmsReadOnlyFinalApprovalBoundarySummaryCard[] = [
    {
      label: '최종 승인 경계 검토 상태',
      value: overallStatus.replace('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_', ''),
      tone:
        overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_READY'
          ? 'positive'
          : overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '인증된 Go/No-Go 후보',
      value: decisionLabel,
      tone: certDecision === 'GO_CANDIDATE_REVIEW_ONLY' ? 'positive' : certDecision === 'NO_GO_CANDIDATE_REVIEW_ONLY' ? 'warning' : 'neutral',
    },
    {
      label: '총 경계 검토 항목',
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
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_VIEW',
    taskId: 353,
    taskName: 'TMS Read-Only Operating Deployment Final Approval Boundary Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 최종 승인 경계 검토',
    description:
      '이 패널은 운영 배포 최종 승인으로 넘어가기 전 승인 경계를 read-only로 검토하는 화면입니다. 이 화면은 실제 최종 승인, 실제 Go/No-Go 결정, 실제 배포 승인, 실제 배포 실행 작업이 아닙니다. Task 354는 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 353,
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentGoNoGoOutcomeCertificationStatus: sourceStatus,
    sourceCertifiedGoNoGoDecision: certDecision,
    sourceCertifiedGoNoGoDecisionLabel: cert.certifiedGoNoGoDecisionLabel,
    operatingDeploymentFinalApprovalBoundaryReviewStatus: overallStatus,
    finalApprovalBoundaryReviewReady: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_READY',
    finalApprovalBoundaryReviewPartialReady: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_PARTIAL_READY',
    finalApprovalBoundaryReviewBlocked: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_BLOCKED',
    finalApprovalBoundaryReviewNotStarted: overallStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_REVIEW_NOT_STARTED',
    finalApprovalBoundaryReviewStarted: true,
    finalApprovalBoundaryStillReadOnly: true,
    boundaryCertifiedGoNoGoDecision: certDecision,
    boundaryCertifiedGoNoGoDecisionLabel: decisionLabel,
    recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'FINAL_APPROVAL_BOUNDARY_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    finalApprovalBoundaryItems: allItems,
    goNoGoBoundaryItems,
    deploymentApprovalBoundaryItems,
    deploymentExecutionBoundaryItems,
    infrastructureBoundaryItems,
    domainDnsHttpsBoundaryItems,
    operatingDbBoundaryItems,
    runtimeWorkerQueueAdapterBoundaryItems,
    apiAndSecretBoundaryItems,
    uiActionBoundaryItems,
    finalBoundaryRequirementItems,
    boundarySummaryCards,
    readyBoundaryItems,
    partialReadyBoundaryItems,
    blockedBoundaryItems,
    notStartedBoundaryItems,
    goNoGoBoundaryItemCount: goNoGoBoundaryItems.length,
    deploymentApprovalBoundaryItemCount: deploymentApprovalBoundaryItems.length,
    deploymentExecutionBoundaryItemCount: deploymentExecutionBoundaryItems.length,
    infrastructureBoundaryItemCount: infrastructureBoundaryItems.length,
    domainDnsHttpsBoundaryItemCount: domainDnsHttpsBoundaryItems.length,
    operatingDbBoundaryItemCount: operatingDbBoundaryItems.length,
    runtimeWorkerQueueAdapterBoundaryItemCount: runtimeWorkerQueueAdapterBoundaryItems.length,
    apiAndSecretBoundaryItemCount: apiAndSecretBoundaryItems.length,
    uiActionBoundaryItemCount: uiActionBoundaryItems.length,
    finalBoundaryRequirementItemCount: finalBoundaryRequirementItems.length,
    readyItemCount: readyBoundaryItems.length,
    partialReadyItemCount: partialReadyBoundaryItems.length,
    blockedItemCount: blockedBoundaryItems.length,
    notStartedItemCount: notStartedBoundaryItems.length,
    totalFinalApprovalBoundaryItemCount: allItems.length,
    actualFinalApprovalGranted: false,
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
    isReadOnlyOperatingDeploymentFinalApprovalBoundaryReview: true,
    requiresSeparateTask354Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_354_APPROVAL_PHRASE,
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
