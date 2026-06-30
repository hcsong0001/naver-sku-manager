import {
  type TmsReadOnlyOperatingDeploymentDesignReviewStatus,
  type TmsReadOnlyOperatingDeploymentDesignReviewView,
} from './tms-read-only-operating-deployment-design-review-view.service';

export type TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus =
  | 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'
  | 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED';

export type TmsReadOnlyDomainDnsHttpsConnectionPlanItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyDomainDnsHttpsConnectionPlanCategory =
  | 'DOMAIN_CONNECTION'
  | 'DNS_RECORD'
  | 'HTTPS_SSL'
  | 'PRECONDITION'
  | 'RISK_REVIEW'
  | 'APPROVAL_REQUIREMENT'
  | 'SAFETY_LOCK';

export const NEXT_TASK_344_APPROVAL_PHRASE =
  'Task 344에서 TMS read-only 운영 DB / 백업 / 롤백 계획 검토 화면 구현을 승인합니다. 이 단계는 실제 운영 DB 연결 변경이나 DB write가 아니라, 운영 배포 전 운영 DB 분리·백업·복구·롤백 절차를 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem {
  planItemId: string;
  category: TmsReadOnlyDomainDnsHttpsConnectionPlanCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyDomainDnsHttpsConnectionPlanSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView {
  status: 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_VIEW';
  taskId: 343;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 343;
  referenceTaskNumbers: readonly [342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceOperatingDeploymentDesignReviewStatus: TmsReadOnlyOperatingDeploymentDesignReviewStatus;
  domainDnsHttpsConnectionPlanReviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus;
  domainDnsHttpsConnectionPlanReviewReady: boolean;
  domainDnsHttpsConnectionPlanReviewPartialReady: boolean;
  domainDnsHttpsConnectionPlanReviewBlocked: boolean;
  domainDnsHttpsConnectionPlanReviewNotStarted: boolean;
  domainDnsHttpsPlanReviewStarted: true;
  domainDnsHttpsPlanStillReadOnly: true;
  domainConnectionPlanItems: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem[];
  dnsRecordPlanItems: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem[];
  httpsSslPlanItems: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem[];
  domainPreconditionItems: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem[];
  domainRiskReviewItems: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem[];
  domainApprovalRequirementItems: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem[];
  domainDnsHttpsPlanSummaryCards: readonly TmsReadOnlyDomainDnsHttpsConnectionPlanSummaryCard[];
  recommendedDomainConnectionMode: 'DOMAIN_CONNECTION_REVIEW_REQUIRED';
  recommendedDnsRecordMode: 'DNS_RECORD_REVIEW_REQUIRED';
  recommendedHttpsMode: 'HTTPS_SSL_REVIEW_REQUIRED';
  recommendedSslCertificateMode: 'SSL_CERTIFICATE_ISSUE_PENDING_APPROVAL';
  recommendedDomainProviderActionMode: 'DOMAIN_PROVIDER_ACTION_PENDING_APPROVAL';
  recommendedVpsIngressMode: 'VPS_INGRESS_REVIEW_REQUIRED';
  recommendedConnectionValidationMode: 'CONNECTION_VALIDATION_PLAN_REQUIRED';
  domainConnectionPlanItemCount: number;
  dnsRecordPlanItemCount: number;
  httpsSslPlanItemCount: number;
  domainPreconditionItemCount: number;
  domainRiskReviewItemCount: number;
  domainApprovalRequirementItemCount: number;
  actualDomainConnected: false;
  dnsChanged: false;
  dnsRecordCreatedOrModified: false;
  sslCertificateIssued: false;
  httpsEnabled: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualProductionTransitionStarted: false;
  actualDeploymentStarted: false;
  operatingDbConnectionChanged: false;
  runtimeConfigured: false;
  workerStarted: false;
  queueEnqueued: false;
  adapterConnected: false;
  naverApiCalled: false;
  productLookupApiRecalled: false;
  productUpdateApiCalled: false;
  dbWritePerformed: false;
  envFileReadOrModified: false;
  domainConnectionStillReadOnly: true;
  dnsChangeStillBlocked: true;
  sslIssueStillBlocked: true;
  deploymentPreparationStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyDomainDnsHttpsConnectionPlanReview: true;
  requiresSeparateTask344Approval: true;
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

function mapOperatingDeploymentDesignReviewStatus(
  status: TmsReadOnlyOperatingDeploymentDesignReviewStatus,
): TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY':
      return 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY':
      return 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED':
      return 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED':
      return 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 342 Operating Deployment Design Review status: ${_exhaustiveCheck}`);
    }
  }
}

function mapPlanItemStatus(
  status: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus,
): TmsReadOnlyDomainDnsHttpsConnectionPlanItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Domain/DNS/HTTPS Connection Plan Review status: ${_exhaustiveCheck}`);
    }
  }
}

function makePlanItem(input: {
  planItemId: string;
  category: TmsReadOnlyDomainDnsHttpsConnectionPlanCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyDomainDnsHttpsConnectionPlanItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyDomainDnsHttpsConnectionPlanReviewItem {
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

function toStatusLabel(status: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewStatus): string {
  switch (status) {
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Domain/DNS/HTTPS review label status: ${_exhaustiveCheck}`);
    }
  }
}

export function buildTmsReadOnlyDomainDnsHttpsConnectionPlanReviewView(input: {
  operatingDeploymentDesignReview: TmsReadOnlyOperatingDeploymentDesignReviewView;
}): TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView {
  const src = input.operatingDeploymentDesignReview;
  const domainDnsHttpsConnectionPlanReviewStatus = mapOperatingDeploymentDesignReviewStatus(
    src.operatingDeploymentDesignReviewStatus,
  );
  const reviewStatus = mapPlanItemStatus(domainDnsHttpsConnectionPlanReviewStatus);

  const domainConnectionPlanItems = [
    makePlanItem({
      planItemId: 'task-343-domain-not-connected-yet',
      category: 'DOMAIN_CONNECTION',
      label: '운영 도메인은 아직 연결하지 않음',
      description: '이번 단계는 read-only 계획 검토 단계이며 운영 도메인 실제 연결은 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-domain-a-record-or-proxy-review',
      category: 'DOMAIN_CONNECTION',
      label: 'VPS public IP 기준 A 레코드 또는 reverse proxy 구조 검토 필요',
      description: '도메인 연결 방식은 VPS public IP 직접 연결 또는 reverse proxy 구조를 기준으로 read-only 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-domain-provider-no-change',
      category: 'DOMAIN_CONNECTION',
      label: '실제 도메인 제공업체 설정 변경은 아직 하지 않음',
      description: '도메인 제공업체 콘솔의 실제 설정 변경은 별도 승인 전까지 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-domain-separate-approval-required',
      category: 'DOMAIN_CONNECTION',
      label: '실제 도메인 연결은 별도 승인 후 진행',
      description: '실제 도메인 연결은 Task 344 이후 별도 명시 승인 경로에서만 진행할 수 있습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const dnsRecordPlanItems = [
    makePlanItem({
      planItemId: 'task-343-dns-a-or-cname-review',
      category: 'DNS_RECORD',
      label: 'A 레코드 또는 CNAME 레코드 적용 여부 검토 필요',
      description: '루트 도메인과 서브도메인의 DNS 레코드 구성을 실제 생성 없이 설계 관점에서만 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-dns-www-subdomain-review',
      category: 'DNS_RECORD',
      label: 'www 서브도메인 사용 여부 검토 필요',
      description: 'www 서브도메인을 사용할지, 루트 도메인만 사용할지 read-only로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-dns-txt-optional-review',
      category: 'DNS_RECORD',
      label: 'TXT 레코드는 인증 필요 시에만 검토',
      description: 'TXT 레코드는 별도 인증이나 소유권 확인이 필요한 경우에만 계획 항목으로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-dns-no-create-modify',
      category: 'DNS_RECORD',
      label: '실제 DNS 레코드 생성/수정은 아직 하지 않음',
      description: '실제 A/CNAME/TXT 레코드 생성 또는 수정은 이번 단계에서 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const httpsSslPlanItems = [
    makePlanItem({
      planItemId: 'task-343-https-required',
      category: 'HTTPS_SSL',
      label: 'HTTPS 적용 필요',
      description: '운영 도메인 연결 시 HTTPS 적용은 필수 계획 항목으로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makePlanItem({
      planItemId: 'task-343-ssl-mode-review',
      category: 'HTTPS_SSL',
      label: 'SSL 인증서 방식 검토 필요',
      description: 'Let’s Encrypt 또는 VPS / reverse proxy 기반 SSL 인증서 적용 방식을 read-only로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-proxy-based-ssl-review',
      category: 'HTTPS_SSL',
      label: 'Reverse proxy 또는 VPS 기반 SSL 적용 방식 검토',
      description: '어느 계층에서 SSL 종료를 담당할지, 운영 구조에 맞는 적용 방식을 계획으로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-no-ssl-issue-yet',
      category: 'HTTPS_SSL',
      label: '실제 SSL 인증서 발급은 아직 하지 않음',
      description: '실제 HTTPS/SSL 인증서 발급이나 적용은 별도 승인 전까지 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const domainPreconditionItems = [
    makePlanItem({
      planItemId: 'task-343-precondition-domain-provider-access',
      category: 'PRECONDITION',
      label: '도메인 연결 전 도메인 제공업체 접근 조건 확인 필요',
      description: '도메인 제공업체 계정 접근권, 대상 도메인 소유권, 변경 권한 확보 여부를 먼저 확인해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-precondition-vps-ingress-review',
      category: 'PRECONDITION',
      label: '운영 웹 요청 인입 방식 검토 필요',
      description: 'reverse proxy 또는 Next.js runtime 연결 구조 중 어떤 방식으로 운영 트래픽을 인입할지 계획이 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-precondition-port-80-443-review',
      category: 'PRECONDITION',
      label: '80/443 포트 사용 계획 검토 필요',
      description: '운영 도메인 연결 시 80/443 포트 사용 계획과 인입 경로를 read-only로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-precondition-no-port-firewall-change',
      category: 'PRECONDITION',
      label: '실제 포트포워딩 또는 방화벽 변경은 아직 하지 않음',
      description: '실제 포트포워딩, 보안그룹, 방화벽, reverse proxy 설정 변경은 별도 승인 전까지 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const domainRiskReviewItems = [
    makePlanItem({
      planItemId: 'task-343-risk-dns-propagation-validation',
      category: 'RISK_REVIEW',
      label: 'DNS 전파 확인 절차 필요',
      description: '실제 연결 이후 DNS 전파 상태를 어떤 방식으로 확인할지 검증 절차를 계획해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-risk-https-validation',
      category: 'RISK_REVIEW',
      label: 'HTTPS 인증서 적용 확인 절차 필요',
      description: '실제 SSL 적용 이후 인증서 유효성, 체인, 브라우저 경고 여부를 어떻게 확인할지 계획이 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-risk-domain-cutover-validation',
      category: 'RISK_REVIEW',
      label: '도메인 연결 후 검증 절차 필요',
      description: '실제 연결 이후 응답 경로, reverse proxy 연결, Next.js 도달 여부를 점검할 검증 절차가 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-risk-no-actual-validation-yet',
      category: 'RISK_REVIEW',
      label: '실제 연결 검증은 아직 하지 않음',
      description: '이번 단계에서는 실제 도메인 연결 검증, 실제 DNS 조회, 실제 HTTPS 검증을 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const domainApprovalRequirementItems = [
    makePlanItem({
      planItemId: 'task-343-approval-domain-connect',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 도메인 연결 승인 필요',
      description: '실제 운영 도메인 연결은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-approval-dns-record-change',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 DNS 레코드 생성/수정 승인 필요',
      description: '실제 DNS 레코드 생성이나 수정은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-approval-ssl-issue',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 HTTPS/SSL 인증서 발급 승인 필요',
      description: '실제 SSL 인증서 발급과 적용은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-approval-ports-proxy',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 80/443 포트 또는 reverse proxy 설정 승인 필요',
      description: '실제 80/443 포트 인입과 reverse proxy 설정 변경은 별도 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-approval-server-config',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 VPS 서버 설정 변경 승인 필요',
      description: '실제 VPS 서버 설정 변경은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makePlanItem({
      planItemId: 'task-343-approval-validation',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 운영 배포 연결 검증 승인 필요',
      description: '실제 도메인 연결 이후 검증 수행은 별도 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const domainDnsHttpsPlanSummaryCards: TmsReadOnlyDomainDnsHttpsConnectionPlanSummaryCard[] = [
    {
      label: '계획 검토 상태',
      value: toStatusLabel(domainDnsHttpsConnectionPlanReviewStatus),
      tone:
        domainDnsHttpsConnectionPlanReviewStatus ===
        'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'
          ? 'positive'
          : domainDnsHttpsConnectionPlanReviewStatus ===
              'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '도메인 연결 방식',
      value: 'DOMAIN',
      tone: 'neutral',
    },
    {
      label: 'DNS / HTTPS 핵심 모드',
      value: 'REVIEW_REQUIRED',
      tone: 'warning',
    },
    {
      label: '승인 항목 수',
      value: `${domainApprovalRequirementItems.length}개`,
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_VIEW',
    taskId: 343,
    taskName: 'TMS Read-Only Domain DNS HTTPS Connection Plan Review Screen Flow',
    panelTitle: 'TMS Read-Only 도메인 / DNS / HTTPS 연결 계획 검토',
    description:
      '이 패널은 도메인/DNS/HTTPS 연결 계획을 read-only로 검토하는 화면입니다. 이 화면은 실제 도메인 연결, DNS 변경, SSL 인증서 발급, 서버 설정 변경 작업이 아닙니다. Task 344는 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 343,
    referenceTaskNumbers: [342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceOperatingDeploymentDesignReviewStatus: src.operatingDeploymentDesignReviewStatus,
    domainDnsHttpsConnectionPlanReviewStatus,
    domainDnsHttpsConnectionPlanReviewReady:
      domainDnsHttpsConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY',
    domainDnsHttpsConnectionPlanReviewPartialReady:
      domainDnsHttpsConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY',
    domainDnsHttpsConnectionPlanReviewBlocked:
      domainDnsHttpsConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED',
    domainDnsHttpsConnectionPlanReviewNotStarted:
      domainDnsHttpsConnectionPlanReviewStatus ===
      'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED',
    domainDnsHttpsPlanReviewStarted: true,
    domainDnsHttpsPlanStillReadOnly: true,
    domainConnectionPlanItems,
    dnsRecordPlanItems,
    httpsSslPlanItems,
    domainPreconditionItems,
    domainRiskReviewItems,
    domainApprovalRequirementItems,
    domainDnsHttpsPlanSummaryCards,
    recommendedDomainConnectionMode: 'DOMAIN_CONNECTION_REVIEW_REQUIRED',
    recommendedDnsRecordMode: 'DNS_RECORD_REVIEW_REQUIRED',
    recommendedHttpsMode: 'HTTPS_SSL_REVIEW_REQUIRED',
    recommendedSslCertificateMode: 'SSL_CERTIFICATE_ISSUE_PENDING_APPROVAL',
    recommendedDomainProviderActionMode: 'DOMAIN_PROVIDER_ACTION_PENDING_APPROVAL',
    recommendedVpsIngressMode: 'VPS_INGRESS_REVIEW_REQUIRED',
    recommendedConnectionValidationMode: 'CONNECTION_VALIDATION_PLAN_REQUIRED',
    domainConnectionPlanItemCount: domainConnectionPlanItems.length,
    dnsRecordPlanItemCount: dnsRecordPlanItems.length,
    httpsSslPlanItemCount: httpsSslPlanItems.length,
    domainPreconditionItemCount: domainPreconditionItems.length,
    domainRiskReviewItemCount: domainRiskReviewItems.length,
    domainApprovalRequirementItemCount: domainApprovalRequirementItems.length,
    actualDomainConnected: false,
    dnsChanged: false,
    dnsRecordCreatedOrModified: false,
    sslCertificateIssued: false,
    httpsEnabled: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    operatingDbConnectionChanged: false,
    runtimeConfigured: false,
    workerStarted: false,
    queueEnqueued: false,
    adapterConnected: false,
    naverApiCalled: false,
    productLookupApiRecalled: false,
    productUpdateApiCalled: false,
    dbWritePerformed: false,
    envFileReadOrModified: false,
    domainConnectionStillReadOnly: true,
    dnsChangeStillBlocked: true,
    sslIssueStillBlocked: true,
    deploymentPreparationStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyDomainDnsHttpsConnectionPlanReview: true,
    requiresSeparateTask344Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_344_APPROVAL_PHRASE,
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
