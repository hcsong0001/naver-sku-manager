import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READINESS'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW'
  | 'EXPLICIT_APPROVAL_PHRASE_GUIDANCE_REVIEW'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_ACCEPTANCE_REVIEW'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_REVIEW'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_REVIEW'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_REVIEW'
  | 'DEPLOYMENT_APPROVAL_NON_EXECUTION_REVIEW'
  | 'DEPLOYMENT_EXECUTION_NON_EXECUTION_REVIEW'
  | 'OPERATING_TRANSITION_NON_EXECUTION_REVIEW'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_REVIEW'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_NON_EXECUTION_REVIEW';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem {
  packetReviewItemId: string;
  sourcePacketItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewCategory;
  label: string;
  description: string;
  sourcePacketStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItemStatus;
  packetReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView {
  taskId: 389;
  taskName: string;
  sourceExplicitApprovalRequestPacketStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus;
  recommendedExplicitApprovalRequestPacketReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY';
  recommendedExplicitApprovalRequestPacketReviewDecisionLabel: '최종 승인 제출 Explicit Approval Request Packet Review - read-only 명시 승인 요청 패킷 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  actualExplicitApprovalPhraseInputAdded: false;
  actualExplicitApprovalPhraseSubmitted: false;
  actualExplicitApprovalGranted: false;
  packetReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  explicitApprovalRequestPacketReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  explicitApprovalRequestPacketReferenceReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  explicitApprovalPhraseGuidanceReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  explicitApprovalPhraseNonAcceptanceReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  approvalRequestCreationNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  approvalRequestSubmissionNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  finalApprovalSubmissionNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  finalApprovalGrantNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  deploymentApprovalNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  deploymentExecutionNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  operatingTransitionNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  infrastructureDomainDnsHttpsNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  apiSecretUiActionPostNonExecutionReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  packetReviewSummaryCards: { label: string; value: number }[];
  readyPacketReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  partialReadyPacketReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  blockedPacketReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  notStartedPacketReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[];
  explicitApprovalRequestPacketReviewReadinessItemCount: number;
  explicitApprovalRequestPacketReferenceReviewItemCount: number;
  explicitApprovalPhraseGuidanceReviewItemCount: number;
  explicitApprovalPhraseNonAcceptanceReviewItemCount: number;
  approvalRequestCreationNonExecutionReviewItemCount: number;
  approvalRequestSubmissionNonExecutionReviewItemCount: number;
  finalApprovalSubmissionNonExecutionReviewItemCount: number;
  finalApprovalGrantNonExecutionReviewItemCount: number;
  deploymentApprovalNonExecutionReviewItemCount: number;
  deploymentExecutionNonExecutionReviewItemCount: number;
  operatingTransitionNonExecutionReviewItemCount: number;
  infrastructureDomainDnsHttpsNonExecutionReviewItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItemCount: number;
  apiSecretUiActionPostNonExecutionReviewItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalPacketReviewItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
};

function toPacketReviewItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY';
  if (item.isPartialReady) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY';
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewItem[] {
  return items.map((item) => {
    const packetReviewStatus = toPacketReviewItemStatus(item);
    return {
      packetReviewItemId: `explicit-approval-request-packet-review-${item.packetItemId}-${category.toLowerCase()}`,
      sourcePacketItemId: item.packetItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourcePacketStatus: item.packetStatus,
      packetReviewStatus,
      isReady: packetReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READY',
      isPartialReady:
        packetReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY',
      isBlocked: packetReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED',
      isNotStarted: packetReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView(
  packetView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewView {
  const packetReviewStatus =
    STATUS_MAP[
      packetView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus
    ];

  const explicitApprovalRequestPacketReviewReadinessItems = mapItems(
    packetView.explicitApprovalRequestPacketReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_READINESS',
    'Review',
    '[명시 승인 요청 Packet 검토 준비도] read-only 검토 가능 상태만 확인합니다.'
  );
  const explicitApprovalRequestPacketReferenceReviewItems = mapItems(
    packetView.preApprovalLockOutcomeCertificationReferencePacketItems,
    'EXPLICIT_APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW',
    'Review',
    '[명시 승인 요청 Packet 참조 검토] Task 388 Packet을 read-only로 참조합니다.'
  );
  const explicitApprovalPhraseGuidanceReviewItems = mapItems(
    packetView.explicitUserApprovalPhrasePacketItems,
    'EXPLICIT_APPROVAL_PHRASE_GUIDANCE_REVIEW',
    'Review',
    '[명시 승인 문구 안내 검토] 승인 문구는 이후 별도 승인 단계에서만 사용되며 이번 화면에서는 표시만 합니다.'
  );
  const explicitApprovalPhraseNonAcceptanceReviewItems = [
    ...mapItems(
      packetView.explicitUserApprovalPhrasePacketItems,
      'EXPLICIT_APPROVAL_PHRASE_NON_ACCEPTANCE_REVIEW',
      'Review',
      '[명시 승인 문구 비수락 검토] 이번 화면에서는 승인 문구를 입력하지 않고 제출하지 않으며 수락 상태를 true로 만들지 않습니다.'
    ),
  ];
  const approvalRequestCreationNonExecutionReviewItems = mapItems(
    packetView.approvalRequestCreationNonExecutionPacketItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_REVIEW',
    'Review',
    '[승인 요청 생성 비실행 검토] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionNonExecutionReviewItems = [
    ...mapItems(
      packetView.approvalRequestScopePacketItems,
      'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_REVIEW',
      'Review',
      '[승인 요청 제출 비실행 검토] 실제 승인 요청 제출로 해석되지 않도록 범위와 제출 금지선을 검토합니다.'
    ),
    ...mapItems(
      packetView.approvalRequestSubmissionNonExecutionPacketItems,
      'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_REVIEW',
      'Review',
      '[승인 요청 제출 비실행 검토] 실제 승인 요청 제출은 수행하지 않습니다.'
    ),
  ];
  const finalApprovalSubmissionNonExecutionReviewItems = mapItems(
    packetView.finalApprovalSubmissionNonExecutionPacketItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_REVIEW',
    'Review',
    '[최종 승인 제출 비실행 검토] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionReviewItems = mapItems(
    packetView.finalApprovalGrantNonExecutionPacketItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_REVIEW',
    'Review',
    '[최종 승인 부여 비실행 검토] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalNonExecutionReviewItems = mapItems(
    packetView.deploymentApprovalNonExecutionPacketItems,
    'DEPLOYMENT_APPROVAL_NON_EXECUTION_REVIEW',
    'Review',
    '[배포 승인 비실행 검토] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionNonExecutionReviewItems = mapItems(
    packetView.deploymentExecutionNonExecutionPacketItems,
    'DEPLOYMENT_EXECUTION_NON_EXECUTION_REVIEW',
    'Review',
    '[배포 실행 비실행 검토] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionNonExecutionReviewItems = mapItems(
    packetView.operatingTransitionNonExecutionPacketItems,
    'OPERATING_TRANSITION_NON_EXECUTION_REVIEW',
    'Review',
    '[운영 전환 비실행 검토] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsNonExecutionReviewItems = mapItems(
    packetView.infrastructureDomainDnsHttpsNonExecutionPacketItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_REVIEW',
    'Review',
    '[인프라/도메인/DNS/HTTPS 비실행 검토] 실제 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems = mapItems(
    packetView.operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_REVIEW',
    'Review',
    '[운영 DB/Runtime/Worker/Queue/Adapter 비실행 검토] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostNonExecutionReviewItems = mapItems(
    packetView.apiSecretUiActionPostNonExecutionPacketItems,
    'API_SECRET_UI_ACTION_POST_NON_EXECUTION_REVIEW',
    'Review',
    '[API/Secret/UI Action/POST 비실행 검토] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const packetReviewItems = [
    ...explicitApprovalRequestPacketReviewReadinessItems,
    ...explicitApprovalRequestPacketReferenceReviewItems,
    ...explicitApprovalPhraseGuidanceReviewItems,
    ...explicitApprovalPhraseNonAcceptanceReviewItems,
    ...approvalRequestCreationNonExecutionReviewItems,
    ...approvalRequestSubmissionNonExecutionReviewItems,
    ...finalApprovalSubmissionNonExecutionReviewItems,
    ...finalApprovalGrantNonExecutionReviewItems,
    ...deploymentApprovalNonExecutionReviewItems,
    ...deploymentExecutionNonExecutionReviewItems,
    ...operatingTransitionNonExecutionReviewItems,
    ...infrastructureDomainDnsHttpsNonExecutionReviewItems,
    ...operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems,
    ...apiSecretUiActionPostNonExecutionReviewItems,
  ];

  const readyPacketReviewItems = packetReviewItems.filter((item) => item.isReady);
  const partialReadyPacketReviewItems = packetReviewItems.filter((item) => item.isPartialReady);
  const blockedPacketReviewItems = packetReviewItems.filter((item) => item.isBlocked);
  const notStartedPacketReviewItems = packetReviewItems.filter((item) => item.isNotStarted);

  return {
    taskId: 389,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Packet Review',
    sourceExplicitApprovalRequestPacketStatus:
      packetView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewStatus:
      packetReviewStatus,
    recommendedExplicitApprovalRequestPacketReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY',
    recommendedExplicitApprovalRequestPacketReviewDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Packet Review - read-only 명시 승인 요청 패킷 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance: packetView.explicitApprovalPhraseGuidance,
    explicitApprovalPhraseExample: packetView.explicitApprovalPhraseExample,
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    packetReviewItems,
    explicitApprovalRequestPacketReviewReadinessItems,
    explicitApprovalRequestPacketReferenceReviewItems,
    explicitApprovalPhraseGuidanceReviewItems,
    explicitApprovalPhraseNonAcceptanceReviewItems,
    approvalRequestCreationNonExecutionReviewItems,
    approvalRequestSubmissionNonExecutionReviewItems,
    finalApprovalSubmissionNonExecutionReviewItems,
    finalApprovalGrantNonExecutionReviewItems,
    deploymentApprovalNonExecutionReviewItems,
    deploymentExecutionNonExecutionReviewItems,
    operatingTransitionNonExecutionReviewItems,
    infrastructureDomainDnsHttpsNonExecutionReviewItems,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems,
    apiSecretUiActionPostNonExecutionReviewItems,
    packetReviewSummaryCards: [
      { label: 'Explicit Approval Request Packet Review 그룹', value: 14 },
      { label: 'Ready', value: readyPacketReviewItems.length },
      { label: 'Blocked', value: blockedPacketReviewItems.length },
      { label: 'Total', value: packetReviewItems.length },
    ],
    readyPacketReviewItems,
    partialReadyPacketReviewItems,
    blockedPacketReviewItems,
    notStartedPacketReviewItems,
    explicitApprovalRequestPacketReviewReadinessItemCount:
      explicitApprovalRequestPacketReviewReadinessItems.length,
    explicitApprovalRequestPacketReferenceReviewItemCount:
      explicitApprovalRequestPacketReferenceReviewItems.length,
    explicitApprovalPhraseGuidanceReviewItemCount:
      explicitApprovalPhraseGuidanceReviewItems.length,
    explicitApprovalPhraseNonAcceptanceReviewItemCount:
      explicitApprovalPhraseNonAcceptanceReviewItems.length,
    approvalRequestCreationNonExecutionReviewItemCount:
      approvalRequestCreationNonExecutionReviewItems.length,
    approvalRequestSubmissionNonExecutionReviewItemCount:
      approvalRequestSubmissionNonExecutionReviewItems.length,
    finalApprovalSubmissionNonExecutionReviewItemCount:
      finalApprovalSubmissionNonExecutionReviewItems.length,
    finalApprovalGrantNonExecutionReviewItemCount:
      finalApprovalGrantNonExecutionReviewItems.length,
    deploymentApprovalNonExecutionReviewItemCount:
      deploymentApprovalNonExecutionReviewItems.length,
    deploymentExecutionNonExecutionReviewItemCount:
      deploymentExecutionNonExecutionReviewItems.length,
    operatingTransitionNonExecutionReviewItemCount:
      operatingTransitionNonExecutionReviewItems.length,
    infrastructureDomainDnsHttpsNonExecutionReviewItemCount:
      infrastructureDomainDnsHttpsNonExecutionReviewItems.length,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItemCount:
      operatingDbRuntimeWorkerQueueAdapterNonExecutionReviewItems.length,
    apiSecretUiActionPostNonExecutionReviewItemCount:
      apiSecretUiActionPostNonExecutionReviewItems.length,
    readyItemCount: readyPacketReviewItems.length,
    partialReadyItemCount: partialReadyPacketReviewItems.length,
    blockedItemCount: blockedPacketReviewItems.length,
    notStartedItemCount: notStartedPacketReviewItems.length,
    totalPacketReviewItemCount: packetReviewItems.length,
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
