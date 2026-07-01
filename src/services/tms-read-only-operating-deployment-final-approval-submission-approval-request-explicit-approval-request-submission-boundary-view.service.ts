import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-packet-review-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READINESS'
  | 'PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_SUBMISSION_BOUNDARY'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_BOUNDARY'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_BOUNDARY'
  | 'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_BOUNDARY'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_BOUNDARY'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_BOUNDARY'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_BOUNDARY'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_BOUNDARY'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY'
  | 'API_SECRET_UI_ACTION_POST_BOUNDARY';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem {
  submissionBoundaryItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItemStatus;
  submissionBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView {
  taskId: 391;
  taskName: string;
  sourceExplicitApprovalRequestPacketReviewOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus;
  recommendedSubmissionBoundaryDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_ONLY';
  recommendedSubmissionBoundaryDecisionLabel: '최종 승인 제출 Explicit Approval Request Submission Boundary - read-only 명시 승인 요청 제출 경계 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  submissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalRequestSubmissionBoundaryReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalPhraseNonInputBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalPhraseNonSubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalAcceptanceNonGrantBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalRequestCreationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalRequestSubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  approvalRequestCreationNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  approvalRequestSubmissionNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  finalApprovalSubmissionNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  finalApprovalGrantNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  deploymentOperatingTransitionNonExecutionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  operatingDbRuntimeWorkerQueueAdapterBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  apiSecretUiActionPostBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  submissionBoundarySummaryCards: { label: string; value: number }[];
  readySubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  partialReadySubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  blockedSubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  notStartedSubmissionBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[];
  explicitApprovalRequestSubmissionBoundaryReadinessItemCount: number;
  packetReviewOutcomeCertificationReferenceSubmissionBoundaryItemCount: number;
  explicitApprovalPhraseNonInputBoundaryItemCount: number;
  explicitApprovalPhraseNonSubmissionBoundaryItemCount: number;
  explicitApprovalAcceptanceNonGrantBoundaryItemCount: number;
  explicitApprovalRequestCreationBoundaryItemCount: number;
  explicitApprovalRequestSubmissionBoundaryItemCount: number;
  approvalRequestCreationNonExecutionBoundaryItemCount: number;
  approvalRequestSubmissionNonExecutionBoundaryItemCount: number;
  finalApprovalSubmissionNonExecutionBoundaryItemCount: number;
  finalApprovalGrantNonExecutionBoundaryItemCount: number;
  deploymentOperatingTransitionNonExecutionBoundaryItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterBoundaryItemCount: number;
  apiSecretUiActionPostBoundaryItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalSubmissionBoundaryItemCount: number;
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
  actualExplicitApprovalPhraseInputAdded: false;
  actualExplicitApprovalPhraseSubmitted: false;
  actualExplicitApprovalGranted: false;
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundarySubmitted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_PACKET_REVIEW_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED',
};

function toSubmissionBoundaryItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY';
  if (item.isPartialReady) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY';
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[] {
  return items.map((item) => {
    const submissionBoundaryStatus = toSubmissionBoundaryItemStatus(item);
    return {
      submissionBoundaryItemId: `explicit-approval-request-submission-boundary-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      submissionBoundaryStatus,
      isReady: submissionBoundaryStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY',
      isPartialReady:
        submissionBoundaryStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY',
      isBlocked:
        submissionBoundaryStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED',
      isNotStarted:
        submissionBoundaryStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView {
  const submissionBoundaryStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus
    ];

  const explicitApprovalRequestSubmissionBoundaryReadinessItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestPacketReviewOutcomeCertificationReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READINESS',
    'Submission Boundary',
    '[명시 승인 요청 제출 경계 준비도] read-only 제출 경계 표시 가능 상태만 확인합니다.'
  );
  const packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestPacketReviewReferenceOutcomeCertificationItems,
    'PACKET_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_SUBMISSION_BOUNDARY',
    'Submission Boundary',
    '[Packet Review 결과 인증 참조 제출 경계] Task 390 결과를 read-only로 참조합니다.'
  );
  const explicitApprovalPhraseNonInputBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseGuidanceOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_BOUNDARY',
    'Submission Boundary',
    '[명시 승인 문구 비입력 경계] 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며 이번 화면에는 입력창이 없습니다.'
  );
  const explicitApprovalPhraseNonSubmissionBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_BOUNDARY',
    'Submission Boundary',
    '[명시 승인 문구 비제출 경계] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const explicitApprovalAcceptanceNonGrantBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonAcceptanceOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_BOUNDARY',
    'Submission Boundary',
    '[명시 승인 수락 비부여 경계] 이번 화면에서는 승인 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestCreationNonExecutionOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_BOUNDARY',
    'Submission Boundary',
    '[명시 승인 요청 생성 경계] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY',
    'Submission Boundary',
    '[명시 승인 요청 제출 경계] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const approvalRequestCreationNonExecutionBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestCreationNonExecutionOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_BOUNDARY',
    'Submission Boundary',
    '[승인 요청 생성 비실행 경계] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionNonExecutionBoundaryItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_BOUNDARY',
    'Submission Boundary',
    '[승인 요청 제출 비실행 경계] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionBoundaryItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_BOUNDARY',
    'Submission Boundary',
    '[최종 승인 제출 비실행 경계] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionBoundaryItems = mapItems(
    outcomeCertificationView.finalApprovalGrantNonExecutionOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_BOUNDARY',
    'Submission Boundary',
    '[최종 승인 부여 비실행 경계] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionBoundaryItems = [
    ...mapItems(
      outcomeCertificationView.deploymentApprovalNonExecutionOutcomeCertificationItems,
      'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_BOUNDARY',
      'Submission Boundary',
      '[배포/운영 전환 비실행 경계] 실제 배포 승인은 수행하지 않습니다.'
    ),
    ...mapItems(
      outcomeCertificationView.deploymentExecutionNonExecutionOutcomeCertificationItems,
      'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_BOUNDARY',
      'Submission Boundary',
      '[배포/운영 전환 비실행 경계] 실제 배포 실행은 수행하지 않습니다.'
    ),
    ...mapItems(
      outcomeCertificationView.operatingTransitionNonExecutionOutcomeCertificationItems,
      'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_BOUNDARY',
      'Submission Boundary',
      '[배포/운영 전환 비실행 경계] 실제 운영 전환은 수행하지 않습니다.'
    ),
  ];
  const operatingDbRuntimeWorkerQueueAdapterBoundaryItems = [
    ...mapItems(
      outcomeCertificationView.infrastructureDomainDnsHttpsNonExecutionOutcomeCertificationItems,
      'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      'Submission Boundary',
      '[운영 DB/Runtime/Worker/Queue/Adapter 경계] 실제 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
    ),
    ...mapItems(
      outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterNonExecutionOutcomeCertificationItems,
      'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_BOUNDARY',
      'Submission Boundary',
      '[운영 DB/Runtime/Worker/Queue/Adapter 경계] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
    ),
  ];
  const apiSecretUiActionPostBoundaryItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostNonExecutionOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_BOUNDARY',
    'Submission Boundary',
    '[API/Secret/UI Action/POST 경계] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const submissionBoundaryItems = [
    ...explicitApprovalRequestSubmissionBoundaryReadinessItems,
    ...packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems,
    ...explicitApprovalPhraseNonInputBoundaryItems,
    ...explicitApprovalPhraseNonSubmissionBoundaryItems,
    ...explicitApprovalAcceptanceNonGrantBoundaryItems,
    ...explicitApprovalRequestCreationBoundaryItems,
    ...explicitApprovalRequestSubmissionBoundaryItems,
    ...approvalRequestCreationNonExecutionBoundaryItems,
    ...approvalRequestSubmissionNonExecutionBoundaryItems,
    ...finalApprovalSubmissionNonExecutionBoundaryItems,
    ...finalApprovalGrantNonExecutionBoundaryItems,
    ...deploymentOperatingTransitionNonExecutionBoundaryItems,
    ...operatingDbRuntimeWorkerQueueAdapterBoundaryItems,
    ...apiSecretUiActionPostBoundaryItems,
  ];

  const readySubmissionBoundaryItems = submissionBoundaryItems.filter((item) => item.isReady);
  const partialReadySubmissionBoundaryItems = submissionBoundaryItems.filter(
    (item) => item.isPartialReady
  );
  const blockedSubmissionBoundaryItems = submissionBoundaryItems.filter(
    (item) => item.isBlocked
  );
  const notStartedSubmissionBoundaryItems = submissionBoundaryItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 391,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Boundary',
    sourceExplicitApprovalRequestPacketReviewOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestPacketReviewOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus:
      submissionBoundaryStatus,
    recommendedSubmissionBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_ONLY',
    recommendedSubmissionBoundaryDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Boundary - read-only 명시 승인 요청 제출 경계 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance: outcomeCertificationView.explicitApprovalPhraseGuidance,
    explicitApprovalPhraseExample: outcomeCertificationView.explicitApprovalPhraseExample,
    submissionBoundaryItems,
    explicitApprovalRequestSubmissionBoundaryReadinessItems,
    packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems,
    explicitApprovalPhraseNonInputBoundaryItems,
    explicitApprovalPhraseNonSubmissionBoundaryItems,
    explicitApprovalAcceptanceNonGrantBoundaryItems,
    explicitApprovalRequestCreationBoundaryItems,
    explicitApprovalRequestSubmissionBoundaryItems,
    approvalRequestCreationNonExecutionBoundaryItems,
    approvalRequestSubmissionNonExecutionBoundaryItems,
    finalApprovalSubmissionNonExecutionBoundaryItems,
    finalApprovalGrantNonExecutionBoundaryItems,
    deploymentOperatingTransitionNonExecutionBoundaryItems,
    operatingDbRuntimeWorkerQueueAdapterBoundaryItems,
    apiSecretUiActionPostBoundaryItems,
    submissionBoundarySummaryCards: [
      { label: 'Explicit Approval Request Submission Boundary 그룹', value: 14 },
      { label: 'Ready', value: readySubmissionBoundaryItems.length },
      { label: 'Blocked', value: blockedSubmissionBoundaryItems.length },
      { label: 'Total', value: submissionBoundaryItems.length },
    ],
    readySubmissionBoundaryItems,
    partialReadySubmissionBoundaryItems,
    blockedSubmissionBoundaryItems,
    notStartedSubmissionBoundaryItems,
    explicitApprovalRequestSubmissionBoundaryReadinessItemCount:
      explicitApprovalRequestSubmissionBoundaryReadinessItems.length,
    packetReviewOutcomeCertificationReferenceSubmissionBoundaryItemCount:
      packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems.length,
    explicitApprovalPhraseNonInputBoundaryItemCount:
      explicitApprovalPhraseNonInputBoundaryItems.length,
    explicitApprovalPhraseNonSubmissionBoundaryItemCount:
      explicitApprovalPhraseNonSubmissionBoundaryItems.length,
    explicitApprovalAcceptanceNonGrantBoundaryItemCount:
      explicitApprovalAcceptanceNonGrantBoundaryItems.length,
    explicitApprovalRequestCreationBoundaryItemCount:
      explicitApprovalRequestCreationBoundaryItems.length,
    explicitApprovalRequestSubmissionBoundaryItemCount:
      explicitApprovalRequestSubmissionBoundaryItems.length,
    approvalRequestCreationNonExecutionBoundaryItemCount:
      approvalRequestCreationNonExecutionBoundaryItems.length,
    approvalRequestSubmissionNonExecutionBoundaryItemCount:
      approvalRequestSubmissionNonExecutionBoundaryItems.length,
    finalApprovalSubmissionNonExecutionBoundaryItemCount:
      finalApprovalSubmissionNonExecutionBoundaryItems.length,
    finalApprovalGrantNonExecutionBoundaryItemCount:
      finalApprovalGrantNonExecutionBoundaryItems.length,
    deploymentOperatingTransitionNonExecutionBoundaryItemCount:
      deploymentOperatingTransitionNonExecutionBoundaryItems.length,
    operatingDbRuntimeWorkerQueueAdapterBoundaryItemCount:
      operatingDbRuntimeWorkerQueueAdapterBoundaryItems.length,
    apiSecretUiActionPostBoundaryItemCount: apiSecretUiActionPostBoundaryItems.length,
    readyItemCount: readySubmissionBoundaryItems.length,
    partialReadyItemCount: partialReadySubmissionBoundaryItems.length,
    blockedItemCount: blockedSubmissionBoundaryItems.length,
    notStartedItemCount: notStartedSubmissionBoundaryItems.length,
    totalSubmissionBoundaryItemCount: submissionBoundaryItems.length,
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
    actualExplicitApprovalPhraseInputAdded: false,
    actualExplicitApprovalPhraseSubmitted: false,
    actualExplicitApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
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
