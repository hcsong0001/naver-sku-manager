import {
  type TmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus,
  type TmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationView,
} from './tms-read-only-vps-deployment-candidate-final-closure-summary-safety-audit-seal-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentDesignReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentDesignReviewItemStatus =
  | 'READY'
  | 'PARTIAL_READY'
  | 'BLOCKED'
  | 'NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentDesignCategory =
  | 'VPS_OPERATING_TARGET'
  | 'DOMAIN_DNS_HTTPS'
  | 'OPERATING_DB'
  | 'BACKUP_ROLLBACK'
  | 'SECURITY_ACCESS'
  | 'APPROVAL_REQUIREMENT'
  | 'SAFETY_LOCK';

export const NEXT_TASK_343_APPROVAL_PHRASE =
  'Task 343에서 TMS read-only 도메인/DNS/HTTPS 연결 계획 검토 화면 구현을 승인합니다. 이 단계는 실제 도메인 연결이나 DNS 변경이 아니라, 운영 배포 설계 검토 결과를 바탕으로 도메인 연결 방식·DNS 레코드·HTTPS/SSL 적용 계획을 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyOperatingDeploymentDesignReviewItem {
  designItemId: string;
  category: TmsReadOnlyOperatingDeploymentDesignCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyOperatingDeploymentDesignReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: true;
  actualChangePerformed: false;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentDesignReviewCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyOperatingDeploymentDesignReviewView {
  status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_VIEW';
  taskId: 342;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 342;
  referenceTaskNumbers: readonly [341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322];
  isBatchJobResultDisplayOnly: true;
  sourceFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus;
  operatingDeploymentDesignReviewStatus: TmsReadOnlyOperatingDeploymentDesignReviewStatus;
  operatingDeploymentDesignReviewReady: boolean;
  operatingDeploymentDesignReviewPartialReady: boolean;
  operatingDeploymentDesignReviewBlocked: boolean;
  operatingDeploymentDesignReviewNotStarted: boolean;
  deploymentDesignReviewStarted: true;
  deploymentDesignStillReadOnly: true;
  vpsOperatingDesignItems: readonly TmsReadOnlyOperatingDeploymentDesignReviewItem[];
  domainDnsHttpsDesignItems: readonly TmsReadOnlyOperatingDeploymentDesignReviewItem[];
  operatingDbDesignItems: readonly TmsReadOnlyOperatingDeploymentDesignReviewItem[];
  backupRollbackDesignItems: readonly TmsReadOnlyOperatingDeploymentDesignReviewItem[];
  securityAccessDesignItems: readonly TmsReadOnlyOperatingDeploymentDesignReviewItem[];
  deploymentApprovalRequirementItems: readonly TmsReadOnlyOperatingDeploymentDesignReviewItem[];
  operatingDeploymentDesignSummaryCards: readonly TmsReadOnlyOperatingDeploymentDesignReviewCard[];
  recommendedDeploymentTarget: 'VPS';
  recommendedDeploymentTargetLabel: 'VPS 운영 배포 후보';
  recommendedDomainConnectionMode: 'DOMAIN_DNS_REVIEW_REQUIRED';
  recommendedHttpsMode: 'HTTPS_SSL_REVIEW_REQUIRED';
  recommendedOperatingDbMode: 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED';
  recommendedBackupMode: 'DB_AND_CODE_BACKUP_REQUIRED';
  recommendedRollbackMode: 'GIT_AND_DB_ROLLBACK_PLAN_REQUIRED';
  designReviewItemCount: number;
  vpsDesignItemCount: number;
  domainDnsHttpsDesignItemCount: number;
  operatingDbDesignItemCount: number;
  backupRollbackDesignItemCount: number;
  securityAccessDesignItemCount: number;
  approvalRequirementItemCount: number;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualProductionTransitionStarted: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
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
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyOperatingDeploymentDesignReview: true;
  requiresSeparateTask343Approval: true;
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

function mapOutcomeCertificationStatus(
  status: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus,
): TmsReadOnlyOperatingDeploymentDesignReviewStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_FINAL_CLOSURE_SUMMARY_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED':
      return 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown Task 341 Outcome Certification status: ${_exhaustiveCheck}`);
    }
  }
}

function mapReviewStatus(
  status: TmsReadOnlyOperatingDeploymentDesignReviewStatus,
): TmsReadOnlyOperatingDeploymentDesignReviewItemStatus {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown operating deployment design review status: ${_exhaustiveCheck}`);
    }
  }
}

function makeDesignItem(input: {
  designItemId: string;
  category: TmsReadOnlyOperatingDeploymentDesignCategory;
  label: string;
  description: string;
  reviewStatus: TmsReadOnlyOperatingDeploymentDesignReviewItemStatus;
  requiresSeparateApproval: boolean;
}): TmsReadOnlyOperatingDeploymentDesignReviewItem {
  return {
    designItemId: input.designItemId,
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

function toStatusLabel(status: TmsReadOnlyOperatingDeploymentDesignReviewStatus): string {
  switch (status) {
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY':
      return 'READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY':
      return 'PARTIAL_READY';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED':
      return 'BLOCKED';
    case 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED':
      return 'NOT_STARTED';
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Unknown operating deployment design review label status: ${_exhaustiveCheck}`);
    }
  }
}

export function buildTmsReadOnlyOperatingDeploymentDesignReviewView(input: {
  finalClosureSummarySafetyAuditSealOutcomeCertification: TmsReadOnlyVpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationView;
}): TmsReadOnlyOperatingDeploymentDesignReviewView {
  const src = input.finalClosureSummarySafetyAuditSealOutcomeCertification;
  const operatingDeploymentDesignReviewStatus = mapOutcomeCertificationStatus(
    src.vpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus,
  );
  const reviewStatus = mapReviewStatus(operatingDeploymentDesignReviewStatus);

  const vpsOperatingDesignItems = [
    makeDesignItem({
      designItemId: 'task-342-vps-primary-target',
      category: 'VPS_OPERATING_TARGET',
      label: '운영 배포 대상은 VPS 우선 검토',
      description: 'Task 341까지 종료된 VPS 후보 Closure 흐름을 바탕으로 운영 배포 대상은 VPS를 우선 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makeDesignItem({
      designItemId: 'task-342-nas-backup-candidate',
      category: 'VPS_OPERATING_TARGET',
      label: 'NAS는 백업/보조 인프라 후보',
      description: 'NAS는 운영 애플리케이션 직접 배포 대상이 아니라 백업 및 보조 인프라 후보로 유지합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makeDesignItem({
      designItemId: 'task-342-office-home-dev-only',
      category: 'VPS_OPERATING_TARGET',
      label: '사무실 PC/집 PC는 개발·임시 테스트 후보',
      description: '사무실 PC와 집 PC는 운영 배포 대상이 아니라 개발 및 임시 테스트 후보로만 유지합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makeDesignItem({
      designItemId: 'task-342-no-actual-vps-created',
      category: 'VPS_OPERATING_TARGET',
      label: '실제 VPS 생성은 아직 하지 않음',
      description: '이번 단계는 read-only 설계 검토 단계이며 실제 VPS 생성은 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-no-actual-server-config-change',
      category: 'VPS_OPERATING_TARGET',
      label: '실제 서버 설정 변경은 아직 하지 않음',
      description: '운영 서버 설정, 포트, 방화벽, 프로세스 설정 변경은 아직 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const domainDnsHttpsDesignItems = [
    makeDesignItem({
      designItemId: 'task-342-domain-connection-review',
      category: 'DOMAIN_DNS_HTTPS',
      label: '도메인 연결 방식 read-only 검토 필요',
      description: '다음 단계에서 어떤 도메인을 어떤 방식으로 연결할지 read-only로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-dns-record-review',
      category: 'DOMAIN_DNS_HTTPS',
      label: 'DNS 레코드 검토 필요',
      description: 'A/CNAME 등 DNS 레코드 구성을 실제 변경 없이 설계 관점에서만 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-https-ssl-review',
      category: 'DOMAIN_DNS_HTTPS',
      label: 'HTTPS / SSL 적용 방식 검토 필요',
      description: '인증서 발급 주체, 적용 위치, 갱신 방식은 실제 발급 없이 read-only로 검토합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-no-domain-dns-change',
      category: 'DOMAIN_DNS_HTTPS',
      label: '실제 도메인 연결 / DNS 변경 / SSL 발급 없음',
      description: '이번 단계에서는 실제 도메인 연결, DNS 변경, HTTPS/SSL 인증서 발급을 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const operatingDbDesignItems = [
    makeDesignItem({
      designItemId: 'task-342-operating-db-separated',
      category: 'OPERATING_DB',
      label: '운영 DB는 개발/테스트 DB와 분리 필요',
      description: '운영 DB 연결은 기존 개발·테스트 DB와 분리된 별도 구성안으로 검토해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-operating-db-change-not-started',
      category: 'OPERATING_DB',
      label: '운영 DB 연결 변경은 아직 하지 않음',
      description: '이번 단계에서는 운영 DB 연결 변경이나 실제 접속 전환을 수행하지 않습니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-db-backup-recovery-access-review',
      category: 'OPERATING_DB',
      label: '백업 / 복구 / 권한 검토 선행 필요',
      description: '운영 DB 연결 전에는 백업 전략, 복구 절차, 접근 권한 구조를 먼저 검토해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-env-files-untouched',
      category: 'OPERATING_DB',
      label: '.env / .env.local 열람 또는 수정 없음',
      description: '운영 DB 연결 설계 검토 단계에서도 .env / .env.local 열람 또는 수정 없이 진행합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
  ];

  const backupRollbackDesignItems = [
    makeDesignItem({
      designItemId: 'task-342-pre-deploy-backup-required',
      category: 'BACKUP_ROLLBACK',
      label: '배포 전 백업 계획 필요',
      description: '실제 운영 배포 전에는 백업 시점, 대상, 보관 정책을 정의해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-db-backup-required',
      category: 'BACKUP_ROLLBACK',
      label: 'DB 백업 필요',
      description: '운영 DB 연결 또는 데이터 전환 전에는 DB 백업 계획을 별도로 확정해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-git-rollback-commit-required',
      category: 'BACKUP_ROLLBACK',
      label: '코드 롤백 기준 커밋 필요',
      description: '배포 실패 시 되돌릴 기준 커밋과 복구 절차를 사전에 정리해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-db-rollback-procedure-required',
      category: 'BACKUP_ROLLBACK',
      label: 'DB 롤백 절차 필요',
      description: '배포 실패 시 데이터 상태를 이전으로 되돌리는 DB 롤백 절차를 준비해야 합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const securityAccessDesignItems = [
    makeDesignItem({
      designItemId: 'task-342-token-auth-hidden',
      category: 'SECURITY_ACCESS',
      label: 'Token/Auth/Signature/Authorization 값 비노출 유지',
      description: '설계 검토 단계에서도 Token/Auth/Signature/Authorization 값은 계속 비노출 상태를 유지합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makeDesignItem({
      designItemId: 'task-342-raw-api-response-hidden',
      category: 'SECURITY_ACCESS',
      label: 'raw API response 비표시·비저장 유지',
      description: 'raw API response는 계속 표시하지 않고 저장하지 않는 정책을 유지합니다.',
      reviewStatus,
      requiresSeparateApproval: false,
    }),
    makeDesignItem({
      designItemId: 'task-342-minimum-server-access',
      category: 'SECURITY_ACCESS',
      label: '운영 서버 접근 권한 최소화 필요',
      description: '운영 서버 접근 권한은 최소 권한 원칙으로 설계 검토가 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-naver-api-live-approval-required',
      category: 'SECURITY_ACCESS',
      label: 'Naver API 운영 호출 전 별도 승인 필요',
      description: '운영 환경에서 Naver API를 실제 호출하기 전에는 별도 승인과 경계 검토가 필요합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const deploymentApprovalRequirementItems = [
    makeDesignItem({
      designItemId: 'task-342-approval-vps-create',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 VPS 생성 승인 필요',
      description: '실제 VPS 생성은 별도 명시 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-approval-runtime-config',
      category: 'APPROVAL_REQUIREMENT',
      label: '서버 Runtime 구성 승인 필요',
      description: '운영 Runtime 구성과 서버 설정 변경은 별도 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-approval-operating-db',
      category: 'APPROVAL_REQUIREMENT',
      label: '운영 DB 연결 승인 필요',
      description: '운영 DB 연결 변경은 별도 승인 및 백업 계획 확정 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-approval-domain-dns-https',
      category: 'APPROVAL_REQUIREMENT',
      label: '도메인/DNS/HTTPS 연결 승인 필요',
      description: '도메인 연결, DNS 변경, HTTPS/SSL 적용은 별도 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-approval-worker-queue-adapter',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Worker / Queue / Adapter 운영 연결 승인 필요',
      description: 'Worker, Queue, Adapter의 운영 연결은 별도 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-approval-naver-api-live',
      category: 'APPROVAL_REQUIREMENT',
      label: 'Naver API 운영 호출 승인 필요',
      description: 'Naver API 운영 호출은 별도 승인과 사전 검토 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
    makeDesignItem({
      designItemId: 'task-342-approval-actual-deploy',
      category: 'APPROVAL_REQUIREMENT',
      label: '실제 배포 실행 승인 필요',
      description: '실제 운영 배포 실행은 별도 승인 이후에만 가능합니다.',
      reviewStatus,
      requiresSeparateApproval: true,
    }),
  ];

  const designReviewItemCount =
    vpsOperatingDesignItems.length +
    domainDnsHttpsDesignItems.length +
    operatingDbDesignItems.length +
    backupRollbackDesignItems.length +
    securityAccessDesignItems.length +
    deploymentApprovalRequirementItems.length;

  const operatingDeploymentDesignSummaryCards: TmsReadOnlyOperatingDeploymentDesignReviewCard[] = [
    {
      label: '설계 검토 상태',
      value: toStatusLabel(operatingDeploymentDesignReviewStatus),
      tone:
        operatingDeploymentDesignReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'
          ? 'positive'
          : operatingDeploymentDesignReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED'
            ? 'warning'
            : 'neutral',
    },
    {
      label: '권장 배포 대상',
      value: 'VPS',
      tone: 'neutral',
    },
    {
      label: '설계 검토 항목 수',
      value: `${designReviewItemCount}개`,
      tone: 'neutral',
    },
    {
      label: '별도 승인 항목 수',
      value: `${deploymentApprovalRequirementItems.length}개`,
      tone: 'warning',
    },
  ];

  return {
    status: 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_VIEW',
    taskId: 342,
    taskName: 'TMS Read-Only Operating Deployment Design Review Screen Flow',
    panelTitle: 'TMS Read-Only 운영 배포 설계 검토',
    description:
      '이 패널은 Task 341까지 종료된 VPS 후보 Closure 흐름 이후, TMS 운영 배포 설계를 read-only로 검토하는 화면입니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다. Runtime, Worker, Queue, Adapter, 운영 DB, DNS, SSL, 포트포워딩, 서버/VPS 설정을 변경하지 않습니다. Task 343은 사용자 별도 명시 승인 없이는 진행하지 않습니다.',
    currentTaskNumber: 342,
    referenceTaskNumbers: [341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322],
    isBatchJobResultDisplayOnly: true,
    sourceFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus:
      src.vpsDeploymentCandidateFinalClosureSummarySafetyAuditSealOutcomeCertificationStatus,
    operatingDeploymentDesignReviewStatus,
    operatingDeploymentDesignReviewReady:
      operatingDeploymentDesignReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY',
    operatingDeploymentDesignReviewPartialReady:
      operatingDeploymentDesignReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY',
    operatingDeploymentDesignReviewBlocked:
      operatingDeploymentDesignReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED',
    operatingDeploymentDesignReviewNotStarted:
      operatingDeploymentDesignReviewStatus === 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED',
    deploymentDesignReviewStarted: true,
    deploymentDesignStillReadOnly: true,
    vpsOperatingDesignItems,
    domainDnsHttpsDesignItems,
    operatingDbDesignItems,
    backupRollbackDesignItems,
    securityAccessDesignItems,
    deploymentApprovalRequirementItems,
    operatingDeploymentDesignSummaryCards,
    recommendedDeploymentTarget: 'VPS',
    recommendedDeploymentTargetLabel: 'VPS 운영 배포 후보',
    recommendedDomainConnectionMode: 'DOMAIN_DNS_REVIEW_REQUIRED',
    recommendedHttpsMode: 'HTTPS_SSL_REVIEW_REQUIRED',
    recommendedOperatingDbMode: 'OPERATING_DB_SEPARATE_REVIEW_REQUIRED',
    recommendedBackupMode: 'DB_AND_CODE_BACKUP_REQUIRED',
    recommendedRollbackMode: 'GIT_AND_DB_ROLLBACK_PLAN_REQUIRED',
    designReviewItemCount,
    vpsDesignItemCount: vpsOperatingDesignItems.length,
    domainDnsHttpsDesignItemCount: domainDnsHttpsDesignItems.length,
    operatingDbDesignItemCount: operatingDbDesignItems.length,
    backupRollbackDesignItemCount: backupRollbackDesignItems.length,
    securityAccessDesignItemCount: securityAccessDesignItems.length,
    approvalRequirementItemCount: deploymentApprovalRequirementItems.length,
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualProductionTransitionStarted: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
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
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyOperatingDeploymentDesignReview: true,
    requiresSeparateTask343Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_343_APPROVAL_PHRASE,
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
