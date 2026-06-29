import { NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus } from './sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-candidate-flow-closure-summary-view.service';

export type TmsReadOnlyDeploymentDomainPreparationStatus =
  | 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY'
  | 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY'
  | 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED'
  | 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED';

export type TmsReadOnlyDeploymentDomainPreparationItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyDeploymentDomainPreparationCategory =
  | 'CANDIDATE_FLOW'
  | 'DEPLOYMENT'
  | 'DOMAIN'
  | 'SECURITY'
  | 'SERVER'
  | 'SAFETY_LOCK';

export const NEXT_TASK_321_APPROVAL_PHRASE =
  'Task 321에서 TMS read-only 배포 대상 환경 선택 비교 화면 구현을 승인합니다. 이 단계는 실제 배포 실행이나 실제 도메인 연결이 아니라, NAS/회사 PC/집 PC/VPS 중 어떤 환경으로 배포할지 read-only로 비교하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

type PreparationStatusFlags = {
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
};

export interface TmsReadOnlyDeploymentDomainPreparationCheckItem {
  checkId: string;
  category: TmsReadOnlyDeploymentDomainPreparationCategory;
  label: string;
  status: TmsReadOnlyDeploymentDomainPreparationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyDeploymentDomainPreparationSummaryCard {
  label: string;
  count: number;
  cardType: TmsReadOnlyDeploymentDomainPreparationItemStatus;
}

export interface TmsReadOnlyDeploymentDomainPreparationStatusCheckView {
  status: 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_CHECK_VIEW';
  taskId: 320;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 320;
  referenceTaskNumbers: readonly [319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceCandidateFlowClosureSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus;
  deploymentDomainPreparationStatus: TmsReadOnlyDeploymentDomainPreparationStatus;
  preparationCheckItems: readonly TmsReadOnlyDeploymentDomainPreparationCheckItem[];
  deploymentPreparationItems: readonly TmsReadOnlyDeploymentDomainPreparationCheckItem[];
  domainPreparationItems: readonly TmsReadOnlyDeploymentDomainPreparationCheckItem[];
  securityPreparationItems: readonly TmsReadOnlyDeploymentDomainPreparationCheckItem[];
  readOnlySafetyItems: readonly TmsReadOnlyDeploymentDomainPreparationCheckItem[];
  preparationSummaryCards: readonly TmsReadOnlyDeploymentDomainPreparationSummaryCard[];
  deploymentPreparationReady: boolean;
  deploymentPreparationPartialReady: boolean;
  deploymentPreparationBlocked: boolean;
  deploymentPreparationNotStarted: boolean;
  domainPreparationReady: boolean;
  domainPreparationPartialReady: boolean;
  domainPreparationBlocked: boolean;
  domainConnectionNotStarted: true;
  deploymentNotStarted: true;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  nasConfigChanged: false;
  vpsConfigChanged: false;
  candidateFlowReadOnlyClosed: true;
  candidateFlowSafeForDeploymentPreparation: boolean;
  executionStillLocked: true;
  mutationStillBlocked: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  isReadOnlyDeploymentDomainPreparationCheck: true;
  requiresSeparateTask321Approval: true;
  nextTaskApprovalPhrase: string;
  actualFinalExecutionApprovalGranted: false;
  actualExecutionApprovalGranted: false;
  actualExecutionStarted: false;
  executionButtonAdded: false;
  submitActionAdded: false;
  postApiAdded: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  priceChanged: false;
  stockChanged: false;
  dbWritePerformed: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  tokenOrAuthValueExposed: false;
  rawApiResponseExposedOrStored: false;
  envFileReadOrModified: false;
}

function createFlags(
  status: TmsReadOnlyDeploymentDomainPreparationItemStatus,
): PreparationStatusFlags {
  return {
    isReady: status === 'READY',
    isPartialReady: status === 'PARTIAL_READY',
    isBlocked: status === 'BLOCKED',
    isNotStarted: status === 'NOT_STARTED',
  };
}

function derivePreparationStatus(input: {
  sourceCandidateFlowClosureSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus;
  candidateFlowSafeForDeploymentPreparation: boolean;
}): TmsReadOnlyDeploymentDomainPreparationStatus {
  const { sourceCandidateFlowClosureSummaryStatus, candidateFlowSafeForDeploymentPreparation } = input;

  if (sourceCandidateFlowClosureSummaryStatus.endsWith('_BLOCKED')) {
    return 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED';
  }
  if (
    sourceCandidateFlowClosureSummaryStatus.endsWith('_EMPTY') ||
    !candidateFlowSafeForDeploymentPreparation
  ) {
    return 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED';
  }
  if (sourceCandidateFlowClosureSummaryStatus.endsWith('_PARTIAL_READY')) {
    return 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY';
  }
  return 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY';
}

function toBaseItemStatus(
  status: TmsReadOnlyDeploymentDomainPreparationStatus,
): TmsReadOnlyDeploymentDomainPreparationItemStatus {
  if (status.endsWith('_BLOCKED')) return 'BLOCKED';
  if (status.endsWith('_NOT_STARTED')) return 'NOT_STARTED';
  if (status.endsWith('_PARTIAL_READY')) return 'PARTIAL_READY';
  return 'READY';
}

function buildItem(input: {
  checkId: string;
  category: TmsReadOnlyDeploymentDomainPreparationCategory;
  label: string;
  status: TmsReadOnlyDeploymentDomainPreparationItemStatus;
  message: string;
}): TmsReadOnlyDeploymentDomainPreparationCheckItem {
  return {
    ...input,
    ...createFlags(input.status),
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyDeploymentDomainPreparationStatusCheckView(input: {
  candidateFlowClosureSummary: {
    candidateFlowClosureSummaryStatus: NaverReadOnlyFinalExecutionApprovalCandidateFlowClosureSummaryStatus;
    candidateFlowReadOnlyClosed: boolean;
    candidateFlowSafeForDeploymentPreparation: boolean;
    executionStillLocked: boolean;
    mutationStillBlocked: boolean;
    apiCallStillBlocked: boolean;
    dbWriteStillBlocked: boolean;
    workerQueueAdapterStillBlocked: boolean;
  };
}): TmsReadOnlyDeploymentDomainPreparationStatusCheckView {
  const sourceCandidateFlowClosureSummaryStatus =
    input.candidateFlowClosureSummary.candidateFlowClosureSummaryStatus;

  const deploymentDomainPreparationStatus = derivePreparationStatus({
    sourceCandidateFlowClosureSummaryStatus,
    candidateFlowSafeForDeploymentPreparation:
      input.candidateFlowClosureSummary.candidateFlowSafeForDeploymentPreparation,
  });

  const baseItemStatus = toBaseItemStatus(deploymentDomainPreparationStatus);

  const candidateFlowItems = [
    buildItem({
      checkId: 'candidate-flow-closure-confirmed',
      category: 'CANDIDATE_FLOW',
      label: 'Task 319 후보 흐름 Closure Summary 결과 확인',
      status: baseItemStatus,
      message: `Task 319 상태를 기준으로 후보 흐름 종료 상태를 read-only로 확인합니다: ${sourceCandidateFlowClosureSummaryStatus}`,
    }),
    buildItem({
      checkId: 'candidate-flow-read-only-closed',
      category: 'CANDIDATE_FLOW',
      label: '후보 흐름 read-only 종료 유지',
      status: input.candidateFlowClosureSummary.candidateFlowReadOnlyClosed ? 'READY' : 'BLOCKED',
      message: '후보 목록, 상세 검토, 인증, Safety Audit Seal 흐름은 여전히 read-only 종료 상태여야 합니다.',
    }),
  ];

  const deploymentPreparationItems = [
    buildItem({
      checkId: 'deployment-preparation-check',
      category: 'DEPLOYMENT',
      label: '배포 전 준비 상태 점검',
      status: baseItemStatus,
      message: '실제 배포 명령 실행 없이 현재 로컬 개발 상태에서 배포 준비 조건만 확인합니다.',
    }),
    buildItem({
      checkId: 'deployment-not-started',
      category: 'DEPLOYMENT',
      label: '실제 배포 실행 미시작',
      status: 'READY',
      message: '배포 준비 점검만 표시하며 실제 배포는 아직 시작하지 않습니다.',
    }),
    buildItem({
      checkId: 'server-selection-pending',
      category: 'SERVER',
      label: '배포 대상 서버 환경 선택 대기',
      status: deploymentDomainPreparationStatus.endsWith('_NOT_STARTED') ? 'NOT_STARTED' : baseItemStatus,
      message: 'NAS, 회사 PC, 집 PC, VPS 중 실제 배포 대상 선택은 다음 Task에서만 read-only로 비교합니다.',
    }),
  ];

  const domainPreparationItems = [
    buildItem({
      checkId: 'domain-preparation-check',
      category: 'DOMAIN',
      label: '도메인 연결 전 준비 상태 점검',
      status: baseItemStatus,
      message: '실제 DNS, HTTPS/SSL, 포트포워딩 변경 없이 도메인 연결 전 점검 항목만 확인합니다.',
    }),
    buildItem({
      checkId: 'domain-connection-not-started',
      category: 'DOMAIN',
      label: '실제 도메인 연결 미시작',
      status: 'READY',
      message: '실제 도메인 연결 작업은 수행하지 않으며 현재는 미시작 상태를 유지합니다.',
    }),
    buildItem({
      checkId: 'dns-ssl-portforwarding-unchanged',
      category: 'DOMAIN',
      label: 'DNS / SSL / 포트포워딩 변경 없음',
      status: 'READY',
      message: 'DNS, SSL 인증서, 포트포워딩 설정은 변경하지 않습니다.',
    }),
  ];

  const securityPreparationItems = [
    buildItem({
      checkId: 'security-token-response-hidden',
      category: 'SECURITY',
      label: 'Token/Auth 및 raw API response 비노출 유지',
      status: 'READY',
      message: 'Token/Auth/Signature/Authorization 값과 raw API response는 계속 표시하지 않습니다.',
    }),
    buildItem({
      checkId: 'security-env-unchanged',
      category: 'SECURITY',
      label: '.env / .env.local 비열람·비수정 유지',
      status: 'READY',
      message: '환경 파일을 열람하거나 수정하지 않고 준비 상태만 read-only로 점검합니다.',
    }),
  ];

  const readOnlySafetyItems = [
    buildItem({
      checkId: 'safety-execution-lock',
      category: 'SAFETY_LOCK',
      label: '실행 / 승인 잠금 유지',
      status: input.candidateFlowClosureSummary.executionStillLocked ? 'READY' : 'BLOCKED',
      message: '실제 승인과 실제 실행은 여전히 잠금 상태로 유지되어야 합니다.',
    }),
    buildItem({
      checkId: 'safety-api-db-lock',
      category: 'SAFETY_LOCK',
      label: 'API 호출 / DB write 차단 유지',
      status:
        input.candidateFlowClosureSummary.apiCallStillBlocked &&
        input.candidateFlowClosureSummary.dbWriteStillBlocked
          ? 'READY'
          : 'BLOCKED',
      message: 'Naver API 호출과 DB write는 계속 차단된 상태여야 합니다.',
    }),
    buildItem({
      checkId: 'safety-worker-lock',
      category: 'SAFETY_LOCK',
      label: 'Worker / Queue / Adapter 차단 유지',
      status: input.candidateFlowClosureSummary.workerQueueAdapterStillBlocked ? 'READY' : 'BLOCKED',
      message: 'Worker, Queue, Adapter 연결은 계속 차단된 상태여야 합니다.',
    }),
  ];

  const preparationCheckItems = [
    ...candidateFlowItems,
    ...deploymentPreparationItems,
    ...domainPreparationItems,
    ...securityPreparationItems,
    ...readOnlySafetyItems,
  ];

  const countByStatus = (status: TmsReadOnlyDeploymentDomainPreparationItemStatus) =>
    preparationCheckItems.filter((item) => item.status === status).length;

  const preparationSummaryCards: TmsReadOnlyDeploymentDomainPreparationSummaryCard[] = [
    { label: '준비 완료', count: countByStatus('READY'), cardType: 'READY' },
    { label: '부분 준비', count: countByStatus('PARTIAL_READY'), cardType: 'PARTIAL_READY' },
    { label: '차단됨', count: countByStatus('BLOCKED'), cardType: 'BLOCKED' },
    { label: '미시작', count: countByStatus('NOT_STARTED'), cardType: 'NOT_STARTED' },
  ];

  const deploymentPreparationReady =
    deploymentDomainPreparationStatus === 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY';
  const deploymentPreparationPartialReady =
    deploymentDomainPreparationStatus === 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY';
  const deploymentPreparationBlocked =
    deploymentDomainPreparationStatus === 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED';
  const deploymentPreparationNotStarted =
    deploymentDomainPreparationStatus === 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED';

  return {
    status: 'TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_CHECK_VIEW',
    taskId: 320,
    taskName: 'TMS Read-Only Deployment and Domain Preparation Status Check Screen Flow',
    panelTitle: 'TMS Read-Only 배포/도메인 준비 상태 점검',
    description:
      'Task 319 후보 흐름 Closure Summary 결과를 바탕으로 배포와 도메인 연결 전 준비 상태를 read-only로 점검합니다. 이 화면은 실제 배포 실행이나 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 320,
    referenceTaskNumbers: [319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceCandidateFlowClosureSummaryStatus,
    deploymentDomainPreparationStatus,
    preparationCheckItems,
    deploymentPreparationItems,
    domainPreparationItems,
    securityPreparationItems,
    readOnlySafetyItems,
    preparationSummaryCards,
    deploymentPreparationReady,
    deploymentPreparationPartialReady,
    deploymentPreparationBlocked,
    deploymentPreparationNotStarted,
    domainPreparationReady: deploymentPreparationReady,
    domainPreparationPartialReady: deploymentPreparationPartialReady,
    domainPreparationBlocked: deploymentPreparationBlocked,
    domainConnectionNotStarted: true,
    deploymentNotStarted: true,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    nasConfigChanged: false,
    vpsConfigChanged: false,
    candidateFlowReadOnlyClosed: true,
    candidateFlowSafeForDeploymentPreparation:
      input.candidateFlowClosureSummary.candidateFlowSafeForDeploymentPreparation,
    executionStillLocked: true,
    mutationStillBlocked: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    isReadOnlyDeploymentDomainPreparationCheck: true,
    requiresSeparateTask321Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_321_APPROVAL_PHRASE,
    actualFinalExecutionApprovalGranted: false,
    actualExecutionApprovalGranted: false,
    actualExecutionStarted: false,
    executionButtonAdded: false,
    submitActionAdded: false,
    postApiAdded: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    priceChanged: false,
    stockChanged: false,
    dbWritePerformed: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    tokenOrAuthValueExposed: false,
    rawApiResponseExposedOrStored: false,
    envFileReadOrModified: false,
  };
}
