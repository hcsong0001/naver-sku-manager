import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-lock-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_READINESS'
  | 'PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PACKET'
  | 'APPROVAL_REQUEST_SCOPE_PACKET'
  | 'EXPLICIT_USER_APPROVAL_PHRASE_PACKET'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_PACKET'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_PACKET'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_PACKET'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_PACKET'
  | 'DEPLOYMENT_APPROVAL_NON_EXECUTION_PACKET'
  | 'DEPLOYMENT_EXECUTION_NON_EXECUTION_PACKET'
  | 'OPERATING_TRANSITION_NON_EXECUTION_PACKET'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_PACKET'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_PACKET'
  | 'API_SECRET_UI_ACTION_POST_NON_EXECUTION_PACKET';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem {
  packetItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItemStatus;
  packetStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView {
  taskId: 388;
  taskName: string;
  sourceSubmissionPreApprovalLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus;
  recommendedExplicitApprovalRequestPacketDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY';
  recommendedExplicitApprovalRequestPacketDecisionLabel: '최종 승인 제출 Explicit Approval Request Packet - read-only 명시 승인 요청 패킷 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  actualExplicitApprovalPhraseSubmitted: false;
  actualExplicitApprovalGranted: false;
  packetItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  explicitApprovalRequestPacketReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  preApprovalLockOutcomeCertificationReferencePacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  approvalRequestScopePacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  explicitUserApprovalPhrasePacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  approvalRequestCreationNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  approvalRequestSubmissionNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  finalApprovalSubmissionNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  finalApprovalGrantNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  deploymentApprovalNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  deploymentExecutionNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  operatingTransitionNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  infrastructureDomainDnsHttpsNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  apiSecretUiActionPostNonExecutionPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  packetSummaryCards: { label: string; value: number }[];
  readyPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  partialReadyPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  blockedPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  notStartedPacketItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[];
  explicitApprovalRequestPacketReadinessItemCount: number;
  preApprovalLockOutcomeCertificationReferencePacketItemCount: number;
  approvalRequestScopePacketItemCount: number;
  explicitUserApprovalPhrasePacketItemCount: number;
  approvalRequestCreationNonExecutionPacketItemCount: number;
  approvalRequestSubmissionNonExecutionPacketItemCount: number;
  finalApprovalSubmissionNonExecutionPacketItemCount: number;
  finalApprovalGrantNonExecutionPacketItemCount: number;
  deploymentApprovalNonExecutionPacketItemCount: number;
  deploymentExecutionNonExecutionPacketItemCount: number;
  operatingTransitionNonExecutionPacketItemCount: number;
  infrastructureDomainDnsHttpsNonExecutionPacketItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItemCount: number;
  apiSecretUiActionPostNonExecutionPacketItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalPacketItemCount: number;
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
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED',
};

function toPacketItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_READY';
  if (item.isPartialReady) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY';
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketItem[] {
  return items.map((item) => {
    const packetStatus = toPacketItemStatus(item);
    return {
      packetItemId: `explicit-approval-request-packet-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      packetStatus,
      isReady: packetStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_READY',
      isPartialReady: packetStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_PARTIAL_READY',
      isBlocked: packetStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_BLOCKED',
      isNotStarted: packetStatus === 'EXPLICIT_APPROVAL_REQUEST_PACKET_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketView {
  const packetStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus
    ];

  const explicitApprovalRequestPacketReadinessItems = mapItems(
    outcomeCertificationView.submissionPreApprovalLockOutcomeCertificationReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_PACKET_READINESS',
    'Packet',
    '[명시 승인 요청 Packet 준비도] read-only 명시 승인 요청 패킷 구성 준비 상태만 확인합니다.'
  );
  const preApprovalLockOutcomeCertificationReferencePacketItems = mapItems(
    outcomeCertificationView.submissionPreApprovalLockReviewOutcomeCertificationItems,
    'PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PACKET',
    'Packet',
    '[사전 승인 Lock 결과 인증 참조 Packet] Task 387 결과를 read-only로 참조합니다.'
  );
  const approvalRequestScopePacketItems = [
    ...mapItems(
      outcomeCertificationView.submissionPreApprovalBoundaryOutcomeCertificationReferenceLockOutcomeCertificationItems,
      'APPROVAL_REQUEST_SCOPE_PACKET',
      'Packet',
      '[승인 요청 범위 Packet] 실제 제출 없이 승인 요청 범위와 선행 경계를 read-only로 묶어서 확인합니다.'
    ),
    ...mapItems(
      outcomeCertificationView.approvalRequestReviewSubmissionPreApprovalLockOutcomeCertificationItems,
      'APPROVAL_REQUEST_SCOPE_PACKET',
      'Packet',
      '[승인 요청 범위 Packet] 실제 승인 요청 검토 제출 없이 검토 범위만 read-only로 표시합니다.'
    ),
  ];
  const explicitUserApprovalPhrasePacketItems = mapItems(
    outcomeCertificationView.preApprovalGrantLockOutcomeCertificationItems,
    'EXPLICIT_USER_APPROVAL_PHRASE_PACKET',
    'Packet',
    '[명시 승인 문구 Packet] 이후 별도 승인 단계에서만 사용할 문구 예시를 read-only로 안내합니다.'
  );
  const approvalRequestCreationNonExecutionPacketItems = mapItems(
    outcomeCertificationView.approvalRequestCreationPreApprovalLockOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_PACKET',
    'Packet',
    '[승인 요청 생성 비실행 Packet] 실제 승인 요청 생성 없이 표시 전용 패킷만 구성합니다.'
  );
  const approvalRequestSubmissionNonExecutionPacketItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionPreApprovalLockOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_PACKET',
    'Packet',
    '[승인 요청 제출 비실행 Packet] 실제 승인 요청 제출 없이 제출 전용 정보만 read-only로 정리합니다.'
  );
  const finalApprovalSubmissionNonExecutionPacketItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionPreApprovalLockOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_PACKET',
    'Packet',
    '[최종 승인 제출 비실행 Packet] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionPacketItems = mapItems(
    outcomeCertificationView.finalApprovalGrantPreApprovalLockOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_PACKET',
    'Packet',
    '[최종 승인 부여 비실행 Packet] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalNonExecutionPacketItems = mapItems(
    outcomeCertificationView.deploymentApprovalPreApprovalLockOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_NON_EXECUTION_PACKET',
    'Packet',
    '[배포 승인 비실행 Packet] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionNonExecutionPacketItems = mapItems(
    outcomeCertificationView.deploymentExecutionPreApprovalLockOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_NON_EXECUTION_PACKET',
    'Packet',
    '[배포 실행 비실행 Packet] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionNonExecutionPacketItems = mapItems(
    outcomeCertificationView.operatingTransitionPreApprovalLockOutcomeCertificationItems,
    'OPERATING_TRANSITION_NON_EXECUTION_PACKET',
    'Packet',
    '[운영 전환 비실행 Packet] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsNonExecutionPacketItems = mapItems(
    outcomeCertificationView.infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_NON_EXECUTION_PACKET',
    'Packet',
    '[인프라/도메인/DNS/HTTPS 비실행 Packet] 실제 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems = mapItems(
    outcomeCertificationView.infrastructureOperatingDbRuntimePreApprovalLockOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_NON_EXECUTION_PACKET',
    'Packet',
    '[운영 DB/Runtime/Worker/Queue/Adapter 비실행 Packet] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostNonExecutionPacketItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostPreApprovalLockOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_NON_EXECUTION_PACKET',
    'Packet',
    '[API/Secret/UI Action/POST 비실행 Packet] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const packetItems = [
    ...explicitApprovalRequestPacketReadinessItems,
    ...preApprovalLockOutcomeCertificationReferencePacketItems,
    ...approvalRequestScopePacketItems,
    ...explicitUserApprovalPhrasePacketItems,
    ...approvalRequestCreationNonExecutionPacketItems,
    ...approvalRequestSubmissionNonExecutionPacketItems,
    ...finalApprovalSubmissionNonExecutionPacketItems,
    ...finalApprovalGrantNonExecutionPacketItems,
    ...deploymentApprovalNonExecutionPacketItems,
    ...deploymentExecutionNonExecutionPacketItems,
    ...operatingTransitionNonExecutionPacketItems,
    ...infrastructureDomainDnsHttpsNonExecutionPacketItems,
    ...operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems,
    ...apiSecretUiActionPostNonExecutionPacketItems,
  ];

  const readyPacketItems = packetItems.filter((item) => item.isReady);
  const partialReadyPacketItems = packetItems.filter((item) => item.isPartialReady);
  const blockedPacketItems = packetItems.filter((item) => item.isBlocked);
  const notStartedPacketItems = packetItems.filter((item) => item.isNotStarted);

  return {
    taskId: 388,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Packet',
    sourceSubmissionPreApprovalLockOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketStatus:
      packetStatus,
    recommendedExplicitApprovalRequestPacketDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY',
    recommendedExplicitApprovalRequestPacketDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Packet - read-only 명시 승인 요청 패킷 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_PACKET_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance:
      '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.',
    explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.',
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    packetItems,
    explicitApprovalRequestPacketReadinessItems,
    preApprovalLockOutcomeCertificationReferencePacketItems,
    approvalRequestScopePacketItems,
    explicitUserApprovalPhrasePacketItems,
    approvalRequestCreationNonExecutionPacketItems,
    approvalRequestSubmissionNonExecutionPacketItems,
    finalApprovalSubmissionNonExecutionPacketItems,
    finalApprovalGrantNonExecutionPacketItems,
    deploymentApprovalNonExecutionPacketItems,
    deploymentExecutionNonExecutionPacketItems,
    operatingTransitionNonExecutionPacketItems,
    infrastructureDomainDnsHttpsNonExecutionPacketItems,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems,
    apiSecretUiActionPostNonExecutionPacketItems,
    packetSummaryCards: [
      { label: 'Explicit Approval Request Packet 그룹', value: 14 },
      { label: 'Ready', value: readyPacketItems.length },
      { label: 'Blocked', value: blockedPacketItems.length },
      { label: 'Total', value: packetItems.length },
    ],
    readyPacketItems,
    partialReadyPacketItems,
    blockedPacketItems,
    notStartedPacketItems,
    explicitApprovalRequestPacketReadinessItemCount:
      explicitApprovalRequestPacketReadinessItems.length,
    preApprovalLockOutcomeCertificationReferencePacketItemCount:
      preApprovalLockOutcomeCertificationReferencePacketItems.length,
    approvalRequestScopePacketItemCount: approvalRequestScopePacketItems.length,
    explicitUserApprovalPhrasePacketItemCount: explicitUserApprovalPhrasePacketItems.length,
    approvalRequestCreationNonExecutionPacketItemCount:
      approvalRequestCreationNonExecutionPacketItems.length,
    approvalRequestSubmissionNonExecutionPacketItemCount:
      approvalRequestSubmissionNonExecutionPacketItems.length,
    finalApprovalSubmissionNonExecutionPacketItemCount:
      finalApprovalSubmissionNonExecutionPacketItems.length,
    finalApprovalGrantNonExecutionPacketItemCount:
      finalApprovalGrantNonExecutionPacketItems.length,
    deploymentApprovalNonExecutionPacketItemCount:
      deploymentApprovalNonExecutionPacketItems.length,
    deploymentExecutionNonExecutionPacketItemCount:
      deploymentExecutionNonExecutionPacketItems.length,
    operatingTransitionNonExecutionPacketItemCount:
      operatingTransitionNonExecutionPacketItems.length,
    infrastructureDomainDnsHttpsNonExecutionPacketItemCount:
      infrastructureDomainDnsHttpsNonExecutionPacketItems.length,
    operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItemCount:
      operatingDbRuntimeWorkerQueueAdapterNonExecutionPacketItems.length,
    apiSecretUiActionPostNonExecutionPacketItemCount:
      apiSecretUiActionPostNonExecutionPacketItems.length,
    readyItemCount: readyPacketItems.length,
    partialReadyItemCount: partialReadyPacketItems.length,
    blockedItemCount: blockedPacketItems.length,
    notStartedItemCount: notStartedPacketItems.length,
    totalPacketItemCount: packetItems.length,
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
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}
