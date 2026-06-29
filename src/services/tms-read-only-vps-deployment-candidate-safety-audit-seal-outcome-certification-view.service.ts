import {
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealCategory,
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem,
  type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus,
} from './tms-read-only-vps-deployment-candidate-safety-audit-seal-view.service';

export type TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED';

export const NEXT_TASK_326_APPROVAL_PHRASE =
  'Task 326에서 TMS read-only VPS 배포 후보 최종 요약 화면 구현을 승인합니다. 이 단계는 실제 VPS 배포나 실제 도메인 연결이 아니라, Task 322~325 VPS 후보 상세 검토·인증·안전 봉인·봉인 결과 인증 흐름을 한 화면에서 read-only로 요약하는 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·실제 배포 실행·도메인 연결 작업은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

export interface TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem {
  certificationId: string;
  sourceSealId: string;
  category: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealCategory;
  label: string;
  sourceSealStatus: string;
  outcomeCertificationStatus: 'READY' | 'PARTIAL_READY' | 'BLOCKED' | 'NOT_STARTED';
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  message: string;
  isReadOnly: true;
  actualChangePerformed: false;
}

export interface TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationSummaryCard {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView {
  status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_VIEW';
  taskId: 325;
  taskName: string;
  panelTitle: string;
  description: string;
  currentTaskNumber: 325;
  referenceTaskNumbers: readonly [324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301];
  isBatchJobResultDisplayOnly: true;
  sourceVpsDeploymentCandidateSafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus;
  vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus;
  recommendedEnvironmentKey: string;
  recommendedEnvironmentLabel: string;
  vpsCandidateSafetySealOutcomeCertified: true;
  outcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  deploymentOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  domainOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  serverOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  operatingDbOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  apiDbWorkerOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  secretExposureOutcomeCertificationItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationSummaryCard[];
  outcomeCertifiedReady: boolean;
  outcomeCertifiedPartialReady: boolean;
  outcomeCertificationBlocked: boolean;
  outcomeCertificationNotStarted: boolean;
  actualVpsServerCreated: false;
  actualVpsConfigChanged: false;
  actualDeploymentStarted: false;
  actualDomainConnected: false;
  dnsChanged: false;
  sslCertificateIssued: false;
  portForwardingChanged: false;
  serverConfigChanged: false;
  operatingDbConnectionChanged: false;
  deploymentPreparationStillReadOnly: true;
  domainConnectionStillReadOnly: true;
  apiCallStillBlocked: true;
  dbWriteStillBlocked: true;
  workerQueueAdapterStillBlocked: true;
  tokenOrAuthStillHidden: true;
  rawApiResponseStillHidden: true;
  isReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertification: true;
  requiresSeparateTask326Approval: true;
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

function mapSafetySealStatusToOutcomeCertificationStatus(
  status: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus,
): TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus {
  switch (status) {
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_PARTIAL_READY':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_BLOCKED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED';
    case 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_NOT_STARTED':
      return 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function toOutcomeCertificationItem(
  item: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem,
): TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationItem {
  return {
    certificationId: `outcome-${item.sealId}`,
    sourceSealId: item.sealId,
    category: item.category,
    label: item.label,
    sourceSealStatus: item.sealStatus,
    outcomeCertificationStatus: item.sealStatus,
    isReady: item.isReady,
    isPartialReady: item.isPartialReady,
    isBlocked: item.isBlocked,
    isNotStarted: item.isNotStarted,
    message: `${item.message} / Safety Audit Seal 결과 인증 완료`,
    isReadOnly: true,
    actualChangePerformed: false,
  };
}

export function buildTmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView(input: {
  vpsDeploymentCandidateSafetyAuditSeal: {
    vpsDeploymentCandidateSafetyAuditSealStatus: TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealStatus;
    recommendedEnvironmentKey: string;
    recommendedEnvironmentLabel: string;
    vpsCandidateSafetySealed: boolean;
    safetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
    deploymentSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
    domainSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
    serverSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
    operatingDbSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
    apiDbWorkerSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
    secretExposureSafetySealItems: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealItem[];
  };
}): TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationView {
  const sourceVpsDeploymentCandidateSafetyAuditSealStatus =
    input.vpsDeploymentCandidateSafetyAuditSeal.vpsDeploymentCandidateSafetyAuditSealStatus;
  const vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus =
    mapSafetySealStatusToOutcomeCertificationStatus(
      sourceVpsDeploymentCandidateSafetyAuditSealStatus,
    );

  const outcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.safetySealItems.map(toOutcomeCertificationItem);
  const deploymentOutcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.deploymentSafetySealItems.map(
      toOutcomeCertificationItem,
    );
  const domainOutcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.domainSafetySealItems.map(
      toOutcomeCertificationItem,
    );
  const serverOutcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.serverSafetySealItems.map(
      toOutcomeCertificationItem,
    );
  const operatingDbOutcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.operatingDbSafetySealItems.map(
      toOutcomeCertificationItem,
    );
  const apiDbWorkerOutcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.apiDbWorkerSafetySealItems.map(
      toOutcomeCertificationItem,
    );
  const secretExposureOutcomeCertificationItems =
    input.vpsDeploymentCandidateSafetyAuditSeal.secretExposureSafetySealItems.map(
      toOutcomeCertificationItem,
    );

  const outcomeCertificationSummaryCards: readonly TmsReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertificationSummaryCard[] =
    [
      {
        label: '안전 봉인 결과 인증',
        value: input.vpsDeploymentCandidateSafetyAuditSeal.recommendedEnvironmentLabel,
        tone: input.vpsDeploymentCandidateSafetyAuditSeal.vpsCandidateSafetySealed
          ? 'positive'
          : 'warning',
      },
      {
        label: '인증 항목',
        value: `${outcomeCertificationItems.length}개`,
        tone: 'neutral',
      },
      {
        label: '실제 VPS 생성',
        value: '미수행',
        tone: 'warning',
      },
      {
        label: '실제 배포/도메인 연결',
        value: '미시작',
        tone: 'warning',
      },
    ];

  return {
    status: 'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFICATION_VIEW',
    taskId: 325,
    taskName: 'TMS Read-Only VPS Deployment Candidate Safety Audit Seal Outcome Certification Screen Flow',
    panelTitle: 'TMS Read-Only VPS 배포 후보 Safety Audit Seal 결과 인증',
    description:
      'Task 324 VPS 배포 후보 Safety Audit Seal 결과를 read-only로 인증합니다. 이 화면은 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.',
    currentTaskNumber: 325,
    referenceTaskNumbers: [324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301],
    isBatchJobResultDisplayOnly: true,
    sourceVpsDeploymentCandidateSafetyAuditSealStatus,
    vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus,
    recommendedEnvironmentKey: input.vpsDeploymentCandidateSafetyAuditSeal.recommendedEnvironmentKey,
    recommendedEnvironmentLabel:
      input.vpsDeploymentCandidateSafetyAuditSeal.recommendedEnvironmentLabel,
    vpsCandidateSafetySealOutcomeCertified: true,
    outcomeCertificationItems,
    deploymentOutcomeCertificationItems,
    domainOutcomeCertificationItems,
    serverOutcomeCertificationItems,
    operatingDbOutcomeCertificationItems,
    apiDbWorkerOutcomeCertificationItems,
    secretExposureOutcomeCertificationItems,
    outcomeCertificationSummaryCards,
    outcomeCertifiedReady:
      vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_READY',
    outcomeCertifiedPartialReady:
      vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_CERTIFIED_PARTIAL_READY',
    outcomeCertificationBlocked:
      vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_BLOCKED',
    outcomeCertificationNotStarted:
      vpsDeploymentCandidateSafetyAuditSealOutcomeCertificationStatus ===
      'TMS_READ_ONLY_VPS_DEPLOYMENT_CANDIDATE_SAFETY_AUDIT_SEAL_OUTCOME_NOT_STARTED',
    actualVpsServerCreated: false,
    actualVpsConfigChanged: false,
    actualDeploymentStarted: false,
    actualDomainConnected: false,
    dnsChanged: false,
    sslCertificateIssued: false,
    portForwardingChanged: false,
    serverConfigChanged: false,
    operatingDbConnectionChanged: false,
    deploymentPreparationStillReadOnly: true,
    domainConnectionStillReadOnly: true,
    apiCallStillBlocked: true,
    dbWriteStillBlocked: true,
    workerQueueAdapterStillBlocked: true,
    tokenOrAuthStillHidden: true,
    rawApiResponseStillHidden: true,
    isReadOnlyVpsDeploymentCandidateSafetyAuditSealOutcomeCertification: true,
    requiresSeparateTask326Approval: true,
    nextTaskApprovalPhrase: NEXT_TASK_326_APPROVAL_PHRASE,
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
