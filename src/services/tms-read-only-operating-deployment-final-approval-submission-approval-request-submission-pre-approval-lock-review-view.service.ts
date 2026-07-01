import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-boundary-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewCategory =
  | 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READINESS'
  | 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW'
  | 'PRE_APPROVAL_GRANT_LOCK_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW'
  | 'FINAL_APPROVAL_GRANT_PRE_APPROVAL_LOCK_REVIEW'
  | 'DEPLOYMENT_APPROVAL_PRE_APPROVAL_LOCK_REVIEW'
  | 'DEPLOYMENT_EXECUTION_PRE_APPROVAL_LOCK_REVIEW'
  | 'OPERATING_TRANSITION_PRE_APPROVAL_LOCK_REVIEW'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_PRE_APPROVAL_LOCK_REVIEW'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_LOCK_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_LOCK_REVIEW';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItemStatus =
  | 'PRE_APPROVAL_LOCK_REVIEW_READY'
  | 'PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY'
  | 'PRE_APPROVAL_LOCK_REVIEW_BLOCKED'
  | 'PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem {
  lockReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemStatus;
  lockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView {
  taskId: 386;
  taskName: string;
  sourceSubmissionPreApprovalBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus;
  recommendedPreApprovalLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY';
  recommendedPreApprovalLockReviewDecisionLabel: '최종 승인 제출 Approval Request Submission Pre-Approval Lock Review - read-only 사전 승인 Lock 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  submissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  submissionPreApprovalLockReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  approvalRequestCreationPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  approvalRequestReviewSubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  approvalRequestSubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  preApprovalGrantLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  finalApprovalSubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  finalApprovalGrantPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  deploymentApprovalPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  deploymentExecutionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  operatingTransitionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  infrastructureDomainDnsHttpsPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  apiSecretUiActionPostPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  submissionPreApprovalLockReviewSummaryCards: { label: string; value: number }[];
  readySubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  partialReadySubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  blockedSubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  notStartedSubmissionPreApprovalLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[];
  submissionPreApprovalLockReviewReadinessItemCount: number;
  submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItemCount: number;
  approvalRequestCreationPreApprovalLockReviewItemCount: number;
  approvalRequestReviewSubmissionPreApprovalLockReviewItemCount: number;
  approvalRequestSubmissionPreApprovalLockReviewItemCount: number;
  preApprovalGrantLockReviewItemCount: number;
  finalApprovalSubmissionPreApprovalLockReviewItemCount: number;
  finalApprovalGrantPreApprovalLockReviewItemCount: number;
  deploymentApprovalPreApprovalLockReviewItemCount: number;
  deploymentExecutionPreApprovalLockReviewItemCount: number;
  operatingTransitionPreApprovalLockReviewItemCount: number;
  infrastructureDomainDnsHttpsPreApprovalLockReviewItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItemCount: number;
  apiSecretUiActionPostPreApprovalLockReviewItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalSubmissionPreApprovalLockReviewItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED',
};

function toLockReviewItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItemStatus {
  if (item.isReady) return 'PRE_APPROVAL_LOCK_REVIEW_READY';
  if (item.isPartialReady) return 'PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY';
  if (item.isBlocked) return 'PRE_APPROVAL_LOCK_REVIEW_BLOCKED';
  return 'PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewItem[] {
  return items.map((item) => {
    const lockReviewStatus = toLockReviewItemStatus(item);
    return {
      lockReviewItemId: `submission-pre-approval-lock-review-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      lockReviewStatus,
      isReady: lockReviewStatus === 'PRE_APPROVAL_LOCK_REVIEW_READY',
      isPartialReady: lockReviewStatus === 'PRE_APPROVAL_LOCK_REVIEW_PARTIAL_READY',
      isBlocked: lockReviewStatus === 'PRE_APPROVAL_LOCK_REVIEW_BLOCKED',
      isNotStarted: lockReviewStatus === 'PRE_APPROVAL_LOCK_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewView {
  const lockReviewStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus
    ];

  const submissionPreApprovalLockReviewReadinessItems = mapItems(
    outcomeCertificationView.submissionPreApprovalBoundaryOutcomeCertificationReadinessItems,
    'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_READINESS',
    'Lock Review',
    '[사전 승인 Lock 준비도 검토]'
  );
  const submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems = [
    ...mapItems(
      outcomeCertificationView.submissionPreApprovalBoundaryReferenceOutcomeCertificationItems,
      'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW',
      'Lock Review',
      '[사전 승인 경계 결과 인증 참조 Lock 검토]'
    ),
    ...mapItems(
      outcomeCertificationView.finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems,
      'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW',
      'Lock Review',
      '[최종 제출 Lock 결과 인증 참조 사전 승인 Lock 검토]'
    ),
  ];
  const approvalRequestCreationPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 생성 사전 승인 Lock 검토] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestReviewSubmissionPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 검토 제출 사전 승인 Lock 검토] 실제 승인 요청 검토 제출은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 제출 사전 승인 Lock 검토] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const preApprovalGrantLockReviewItems = mapItems(
    outcomeCertificationView.submissionPreApprovalBoundaryReferenceOutcomeCertificationItems,
    'PRE_APPROVAL_GRANT_LOCK_REVIEW',
    'Lock Review',
    '[사전 승인 부여 Lock 검토] 실제 사전 승인 부여는 수행하지 않습니다.'
  );
  const finalApprovalSubmissionPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[최종 승인 제출 사전 승인 Lock 검토] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[최종 승인 부여 사전 승인 Lock 검토] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems,
    'DEPLOYMENT_APPROVAL_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[배포 승인 사전 승인 Lock 검토] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems,
    'DEPLOYMENT_EXECUTION_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[배포 실행 사전 승인 Lock 검토] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.operatingTransitionPreApprovalBoundaryOutcomeCertificationItems,
    'OPERATING_TRANSITION_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[운영 전환 사전 승인 Lock 검토] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[인프라/도메인/DNS/HTTPS 사전 승인 Lock 검토] 실제 도메인 연결, DNS 변경, SSL 발급은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[운영 DB/Runtime/Worker/Queue/Adapter 사전 승인 Lock 검토] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostPreApprovalLockReviewItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_LOCK_REVIEW',
    'Lock Review',
    '[API/Secret/UI Action/POST 사전 승인 Lock 검토] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const submissionPreApprovalLockReviewItems = [
    ...submissionPreApprovalLockReviewReadinessItems,
    ...submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems,
    ...approvalRequestCreationPreApprovalLockReviewItems,
    ...approvalRequestReviewSubmissionPreApprovalLockReviewItems,
    ...approvalRequestSubmissionPreApprovalLockReviewItems,
    ...preApprovalGrantLockReviewItems,
    ...finalApprovalSubmissionPreApprovalLockReviewItems,
    ...finalApprovalGrantPreApprovalLockReviewItems,
    ...deploymentApprovalPreApprovalLockReviewItems,
    ...deploymentExecutionPreApprovalLockReviewItems,
    ...operatingTransitionPreApprovalLockReviewItems,
    ...infrastructureDomainDnsHttpsPreApprovalLockReviewItems,
    ...operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems,
    ...apiSecretUiActionPostPreApprovalLockReviewItems,
  ];

  const readySubmissionPreApprovalLockReviewItems = submissionPreApprovalLockReviewItems.filter(
    (item) => item.isReady
  );
  const partialReadySubmissionPreApprovalLockReviewItems =
    submissionPreApprovalLockReviewItems.filter((item) => item.isPartialReady);
  const blockedSubmissionPreApprovalLockReviewItems = submissionPreApprovalLockReviewItems.filter(
    (item) => item.isBlocked
  );
  const notStartedSubmissionPreApprovalLockReviewItems =
    submissionPreApprovalLockReviewItems.filter((item) => item.isNotStarted);

  return {
    taskId: 386,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Lock Review',
    sourceSubmissionPreApprovalBoundaryOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalLockReviewStatus:
      lockReviewStatus,
    recommendedPreApprovalLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY',
    recommendedPreApprovalLockReviewDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Lock Review - read-only 사전 승인 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    submissionPreApprovalLockReviewItems,
    submissionPreApprovalLockReviewReadinessItems,
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems,
    approvalRequestCreationPreApprovalLockReviewItems,
    approvalRequestReviewSubmissionPreApprovalLockReviewItems,
    approvalRequestSubmissionPreApprovalLockReviewItems,
    preApprovalGrantLockReviewItems,
    finalApprovalSubmissionPreApprovalLockReviewItems,
    finalApprovalGrantPreApprovalLockReviewItems,
    deploymentApprovalPreApprovalLockReviewItems,
    deploymentExecutionPreApprovalLockReviewItems,
    operatingTransitionPreApprovalLockReviewItems,
    infrastructureDomainDnsHttpsPreApprovalLockReviewItems,
    operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems,
    apiSecretUiActionPostPreApprovalLockReviewItems,
    submissionPreApprovalLockReviewSummaryCards: [
      { label: 'Submission Pre-Approval Lock Review 그룹', value: 14 },
      { label: 'Ready', value: readySubmissionPreApprovalLockReviewItems.length },
      { label: 'Blocked', value: blockedSubmissionPreApprovalLockReviewItems.length },
      { label: 'Total', value: submissionPreApprovalLockReviewItems.length },
    ],
    readySubmissionPreApprovalLockReviewItems,
    partialReadySubmissionPreApprovalLockReviewItems,
    blockedSubmissionPreApprovalLockReviewItems,
    notStartedSubmissionPreApprovalLockReviewItems,
    submissionPreApprovalLockReviewReadinessItemCount:
      submissionPreApprovalLockReviewReadinessItems.length,
    submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItemCount:
      submissionPreApprovalBoundaryOutcomeCertificationReferenceLockReviewItems.length,
    approvalRequestCreationPreApprovalLockReviewItemCount:
      approvalRequestCreationPreApprovalLockReviewItems.length,
    approvalRequestReviewSubmissionPreApprovalLockReviewItemCount:
      approvalRequestReviewSubmissionPreApprovalLockReviewItems.length,
    approvalRequestSubmissionPreApprovalLockReviewItemCount:
      approvalRequestSubmissionPreApprovalLockReviewItems.length,
    preApprovalGrantLockReviewItemCount: preApprovalGrantLockReviewItems.length,
    finalApprovalSubmissionPreApprovalLockReviewItemCount:
      finalApprovalSubmissionPreApprovalLockReviewItems.length,
    finalApprovalGrantPreApprovalLockReviewItemCount:
      finalApprovalGrantPreApprovalLockReviewItems.length,
    deploymentApprovalPreApprovalLockReviewItemCount:
      deploymentApprovalPreApprovalLockReviewItems.length,
    deploymentExecutionPreApprovalLockReviewItemCount:
      deploymentExecutionPreApprovalLockReviewItems.length,
    operatingTransitionPreApprovalLockReviewItemCount:
      operatingTransitionPreApprovalLockReviewItems.length,
    infrastructureDomainDnsHttpsPreApprovalLockReviewItemCount:
      infrastructureDomainDnsHttpsPreApprovalLockReviewItems.length,
    operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItemCount:
      operatingDbRuntimeWorkerQueueAdapterPreApprovalLockReviewItems.length,
    apiSecretUiActionPostPreApprovalLockReviewItemCount:
      apiSecretUiActionPostPreApprovalLockReviewItems.length,
    readyItemCount: readySubmissionPreApprovalLockReviewItems.length,
    partialReadyItemCount: partialReadySubmissionPreApprovalLockReviewItems.length,
    blockedItemCount: blockedSubmissionPreApprovalLockReviewItems.length,
    notStartedItemCount: notStartedSubmissionPreApprovalLockReviewItems.length,
    totalSubmissionPreApprovalLockReviewItemCount: submissionPreApprovalLockReviewItems.length,
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
