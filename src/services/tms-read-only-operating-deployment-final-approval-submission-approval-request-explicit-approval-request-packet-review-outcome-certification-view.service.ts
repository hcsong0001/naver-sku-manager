import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-review-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_READINESS'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_REFERENCE_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_PHRASE_GUIDANCE_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_ACCEPTANCE_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_NON_EXECUTION_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourcePacketReviewItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationCategory;
  label: string;
  description: string;
  sourcePacketReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView {
  taskId: 390;
  taskName: string;
  sourceExplicitApprovalRequestPacketReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Explicit Approval Request Packet Review 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  actualExplicitApprovalPhraseInputAdded: false;
  actualExplicitApprovalPhraseSubmitted: false;
  actualExplicitApprovalGranted: false;
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  explicitApprovalPhraseGuidanceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  approvalRequestCreationNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  approvalRequestSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  finalApprovalGrantNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  deploymentApprovalNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  deploymentExecutionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  operatingTransitionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  apiSecretUiActionPostNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[];
  explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItemCount: number;
  explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItemCount: number;
  explicitApprovalPhraseGuidanceOutcomeCertificationItemCount: number;
  explicitApprovalPhraseNonAcceptanceOutcomeCertificationItemCount: number;
  approvalRequestCreationNonExecutionOutcomeCertificationItemCount: number;
  approvalRequestSubmissionNonExecutionOutcomeCertificationItemCount: number;
  finalApprovalSubmissionNonExecutionOutcomeCertificationItemCount: number;
  finalApprovalGrantNonExecutionOutcomeCertificationItemCount: number;
  deploymentApprovalNonExecutionOutcomeCertificationItemCount: number;
  deploymentExecutionNonExecutionOutcomeCertificationItemCount: number;
  operatingTransitionNonExecutionOutcomeCertificationItemCount: number;
  infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItemCount: number;
  apiSecretUiActionPostNonExecutionOutcomeCertificationItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalOutcomeCertificationItemCount: number;
  actualNaverApiCall: false;
  actualProductLookupApiCall: false;
  actualProductUpdateApiCall: false;
  actualTokenReissue: false;
  actualPriceChange: false;
  actualStockChange: false;
  actualDbWrite: false;
  actualOperatingDbConnectionChange: false;
  actualEnvReadOrWrite: false;
  actualSecretExposure: false;
  actualRawApiResponseExposure: false;
  actualWorkerRun: false;
  actualQueueEnqueue: false;
  actualAdapterConnection: false;
  actualRuntimeConfiguration: false;
  actualApprovalRequestCreated: false;
  actualApprovalRequestReviewedAsSubmission: false;
  actualApprovalRequestSubmitted: false;
  actualExplicitApprovalRequestCreated: false;
  actualExplicitApprovalRequestSubmitted: false;
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualSubmissionReadinessReviewSubmitted: false;
  actualSubmissionReadinessOutcomeCertificationSubmitted: false;
  actualSubmissionLockReviewSubmitted: false;
  actualSubmissionLockOutcomeCertificationSubmitted: false;
  actualFinalSubmissionBoundaryReviewSubmitted: false;
  actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualFinalSubmissionLockReviewSubmitted: false;
  actualFinalSubmissionLockOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalBoundarySubmitted: false;
  actualSubmissionPreApprovalGranted: false;
  actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false;
  actualSubmissionPreApprovalLockReviewSubmitted: false;
  actualSubmissionPreApprovalLockReviewGranted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationGranted: false;
  actualFinalApprovalGrant: false;
  actualFinalApprovalSubmission: false;
  actualDeploymentApproval: false;
  actualDeploymentExecution: false;
  actualOperatingTransition: false;
  actualVpsCreation: false;
  actualDomainConnection: false;
  actualDnsChange: false;
  actualSslCertificateIssue: false;
  actualExecutionButtonAdded: false;
  actualApprovalButtonAdded: false;
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY';
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `explicit-approval-request-packet-review-outcome-certification-${item.packetReviewItemId}-${category.toLowerCase()}`,
      sourcePacketReviewItemId: item.packetReviewItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourcePacketReviewStatus: item.packetReviewStatus,
      outcomeCertificationStatus,
      isReady:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView(
  packetReviewView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      packetReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus
    ];

  const explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems = mapItems(
    packetReviewView.explicitApprovalRequestPacketReviewReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[명시 승인 요청 Packet 검토 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems = mapItems(
    packetReviewView.explicitApprovalRequestPacketReferenceReviewItems,
    'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 Packet 검토 참조 결과 인증] Task 389 검토 결과를 read-only로 인증합니다.'
  );
  const explicitApprovalPhraseGuidanceOutcomeCertificationItems = mapItems(
    packetReviewView.explicitApprovalPhraseGuidanceReviewItems,
    'EXPLICIT_APPROVAL_PHRASE_GUIDANCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 문구 안내 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 사용되며 이번 화면에서는 표시/검토/인증만 수행합니다.'
  );
  const explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems = mapItems(
    packetReviewView.explicitApprovalPhraseNonAcceptanceReviewItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_ACCEPTANCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 문구 비수락 결과 인증] 이번 화면에서는 승인 문구를 입력하지 않고 제출하지 않으며 수락 상태를 true로 만들지 않습니다.'
  );
  const approvalRequestCreationNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.approvalRequestCreationNonExecutionReviewItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 생성 비실행 결과 인증] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.approvalRequestSubmissionNonExecutionReviewItems,
    'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 제출 비실행 결과 인증] 실제 승인 요청 제출로 해석되지 않으며 실제 제출도 수행하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.finalApprovalSubmissionNonExecutionReviewItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 비실행 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.finalApprovalGrantNonExecutionReviewItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 비실행 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.deploymentApprovalNonExecutionReviewItems,
    'DEPLOYMENT_APPROVAL_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 승인 비실행 결과 인증] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.deploymentExecutionNonExecutionReviewItems,
    'DEPLOYMENT_EXECUTION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 실행 비실행 결과 인증] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.operatingTransitionNonExecutionReviewItems,
    'OPERATING_TRANSITION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 전환 비실행 결과 인증] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.infrastructureDomainDnsHttpsNonExecutionReviewItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[인프라/도메인/DNS/HTTPS 비실행 결과 인증] 실제 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 DB/Runtime/Worker/Queue/Adapter 비실행 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostNonExecutionOutcomeCertificationItems = mapItems(
    packetReviewView.apiSecretUiActionPostNonExecutionReviewItems,
    'API_SECRET_UI_ACTION_POST_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST 비실행 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems,
    ...explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems,
    ...explicitApprovalPhraseGuidanceOutcomeCertificationItems,
    ...explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems,
    ...approvalRequestCreationNonExecutionOutcomeCertificationItems,
    ...approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
    ...finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    ...finalApprovalGrantNonExecutionOutcomeCertificationItems,
    ...deploymentApprovalNonExecutionOutcomeCertificationItems,
    ...deploymentExecutionNonExecutionOutcomeCertificationItems,
    ...operatingTransitionNonExecutionOutcomeCertificationItems,
    ...infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems,
    ...apiSecretUiActionPostNonExecutionOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isPartialReady
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isBlocked
  );
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 390,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Packet Review Outcome Certification',
    sourceExplicitApprovalRequestPacketReviewStatus:
      packetReviewView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Packet Review 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance: packetReviewView.explicitApprovalPhraseGuidance,
    explicitApprovalPhraseExample: packetReviewView.explicitApprovalPhraseExample,
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    outcomeCertificationItems,
    explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems,
    explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems,
    explicitApprovalPhraseGuidanceOutcomeCertificationItems,
    explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems,
    approvalRequestCreationNonExecutionOutcomeCertificationItems,
    approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    finalApprovalGrantNonExecutionOutcomeCertificationItems,
    deploymentApprovalNonExecutionOutcomeCertificationItems,
    deploymentExecutionNonExecutionOutcomeCertificationItems,
    operatingTransitionNonExecutionOutcomeCertificationItems,
    infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems,
    apiSecretUiActionPostNonExecutionOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'Explicit Approval Request Packet Review Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItemCount:
      explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems.length,
    explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItemCount:
      explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems.length,
    explicitApprovalPhraseGuidanceOutcomeCertificationItemCount:
      explicitApprovalPhraseGuidanceOutcomeCertificationItems.length,
    explicitApprovalPhraseNonAcceptanceOutcomeCertificationItemCount:
      explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems.length,
    approvalRequestCreationNonExecutionOutcomeCertificationItemCount:
      approvalRequestCreationNonExecutionOutcomeCertificationItems.length,
    approvalRequestSubmissionNonExecutionOutcomeCertificationItemCount:
      approvalRequestSubmissionNonExecutionOutcomeCertificationItems.length,
    finalApprovalSubmissionNonExecutionOutcomeCertificationItemCount:
      finalApprovalSubmissionNonExecutionOutcomeCertificationItems.length,
    finalApprovalGrantNonExecutionOutcomeCertificationItemCount:
      finalApprovalGrantNonExecutionOutcomeCertificationItems.length,
    deploymentApprovalNonExecutionOutcomeCertificationItemCount:
      deploymentApprovalNonExecutionOutcomeCertificationItems.length,
    deploymentExecutionNonExecutionOutcomeCertificationItemCount:
      deploymentExecutionNonExecutionOutcomeCertificationItems.length,
    operatingTransitionNonExecutionOutcomeCertificationItemCount:
      operatingTransitionNonExecutionOutcomeCertificationItems.length,
    infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItemCount:
      infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems.length,
    apiSecretUiActionPostNonExecutionOutcomeCertificationItemCount:
      apiSecretUiActionPostNonExecutionOutcomeCertificationItems.length,
    readyItemCount: readyOutcomeCertificationItems.length,
    partialReadyItemCount: partialReadyOutcomeCertificationItems.length,
    blockedItemCount: blockedOutcomeCertificationItems.length,
    notStartedItemCount: notStartedOutcomeCertificationItems.length,
    totalOutcomeCertificationItemCount: outcomeCertificationItems.length,
    actualNaverApiCall: false,
    actualProductLookupApiCall: false,
    actualProductUpdateApiCall: false,
    actualTokenReissue: false,
    actualPriceChange: false,
    actualStockChange: false,
    actualDbWrite: false,
    actualOperatingDbConnectionChange: false,
    actualEnvReadOrWrite: false,
    actualSecretExposure: false,
    actualRawApiResponseExposure: false,
    actualWorkerRun: false,
    actualQueueEnqueue: false,
    actualAdapterConnection: false,
    actualRuntimeConfiguration: false,
    actualApprovalRequestCreated: false,
    actualApprovalRequestReviewedAsSubmission: false,
    actualApprovalRequestSubmitted: false,
    actualExplicitApprovalRequestCreated: false,
    actualExplicitApprovalRequestSubmitted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualSubmissionReadinessReviewSubmitted: false,
    actualSubmissionReadinessOutcomeCertificationSubmitted: false,
    actualSubmissionLockReviewSubmitted: false,
    actualSubmissionLockOutcomeCertificationSubmitted: false,
    actualFinalSubmissionBoundaryReviewSubmitted: false,
    actualFinalSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualFinalSubmissionLockReviewSubmitted: false,
    actualFinalSubmissionLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundarySubmitted: false,
    actualSubmissionPreApprovalGranted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalBoundaryOutcomeCertificationGranted: false,
    actualSubmissionPreApprovalLockReviewSubmitted: false,
    actualSubmissionPreApprovalLockReviewGranted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationGranted: false,
    actualFinalApprovalGrant: false,
    actualFinalApprovalSubmission: false,
    actualDeploymentApproval: false,
    actualDeploymentExecution: false,
    actualOperatingTransition: false,
    actualVpsCreation: false,
    actualDomainConnection: false,
    actualDnsChange: false,
    actualSslCertificateIssue: false,
    actualExecutionButtonAdded: false,
    actualApprovalButtonAdded: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}
