import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-submission-pre-approval-boundary-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationCategory =
  | 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_READINESS'
  | 'SUBMISSION_PRE_APPROVAL_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION'
  | 'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_APPROVAL_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_EXECUTION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'OPERATING_TRANSITION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemStatus =
  | 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED'
  | 'PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceBoundaryItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView {
  taskId: 385;
  taskName: string;
  sourceSubmissionPreApprovalBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Approval Request Submission Pre-Approval Boundary 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  submissionPreApprovalBoundaryOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  submissionPreApprovalBoundaryReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  operatingTransitionPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[];
  submissionPreApprovalBoundaryOutcomeCertificationReadinessItemCount: number;
  submissionPreApprovalBoundaryReferenceOutcomeCertificationItemCount: number;
  finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItemCount: number;
  approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItemCount: number;
  approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItemCount: number;
  approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemCount: number;
  finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItemCount: number;
  finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItemCount: number;
  deploymentApprovalPreApprovalBoundaryOutcomeCertificationItemCount: number;
  deploymentExecutionPreApprovalBoundaryOutcomeCertificationItemCount: number;
  operatingTransitionPreApprovalBoundaryOutcomeCertificationItemCount: number;
  infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItemCount: number;
  apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemStatus {
  if (item.isReady) return 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) return 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY';
  if (item.isBlocked) return 'PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED';
  return 'PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `submission-pre-approval-boundary-outcome-certification-${item.boundaryItemId}-${category.toLowerCase()}`,
      sourceBoundaryItemId: item.boundaryItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceBoundaryStatus: item.boundaryStatus,
      outcomeCertificationStatus,
      isReady: outcomeCertificationStatus === 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus === 'PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked: outcomeCertificationStatus === 'PRE_APPROVAL_BOUNDARY_OUTCOME_BLOCKED',
      isNotStarted: outcomeCertificationStatus === 'PRE_APPROVAL_BOUNDARY_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView(
  boundaryView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      boundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus
    ];

  const submissionPreApprovalBoundaryOutcomeCertificationReadinessItems = mapItems(
    boundaryView.submissionPreApprovalBoundaryReadinessItems,
    'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[사전 승인 경계 결과 인증 준비도]'
  );
  const submissionPreApprovalBoundaryReferenceOutcomeCertificationItems = mapItems(
    boundaryView.submissionPreApprovalBoundaryItems,
    'SUBMISSION_PRE_APPROVAL_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사전 승인 경계 결과 인증 참조] 실제 사전 승인 또는 실제 제출 승인은 수행하지 않습니다.'
  );
  const finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems =
    mapItems(
      boundaryView.finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryItems,
      'FINAL_SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[최종 제출 Lock 결과 인증 참조 사전 승인 경계 결과 인증]'
    );
  const approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.approvalRequestCreationPreApprovalBoundaryItems,
    'APPROVAL_REQUEST_CREATION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 생성 사전 승인 경계 결과 인증] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.approvalRequestReviewSubmissionPreApprovalBoundaryItems,
    'APPROVAL_REQUEST_REVIEW_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 검토 제출 사전 승인 경계 결과 인증] 실제 승인 요청 검토 제출은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.approvalRequestSubmissionPreApprovalBoundaryItems,
    'APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 제출 사전 승인 경계 결과 인증] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.finalApprovalSubmissionPreApprovalBoundaryItems,
    'FINAL_APPROVAL_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 사전 승인 경계 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.finalApprovalGrantPreApprovalBoundaryItems,
    'FINAL_APPROVAL_GRANT_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 사전 승인 경계 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.deploymentApprovalPreApprovalBoundaryItems,
    'DEPLOYMENT_APPROVAL_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 승인 사전 승인 경계 결과 인증] 실제 배포 승인은 수행하지 않습니다.'
  );
  const deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.deploymentExecutionPreApprovalBoundaryItems,
    'DEPLOYMENT_EXECUTION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포 실행 사전 승인 경계 결과 인증] 실제 배포 실행은 수행하지 않습니다.'
  );
  const operatingTransitionPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.operatingTransitionPreApprovalBoundaryItems,
    'OPERATING_TRANSITION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 전환 사전 승인 경계 결과 인증] 실제 운영 전환은 수행하지 않습니다.'
  );
  const infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.infrastructureDomainDnsHttpsPreApprovalBoundaryItems,
    'INFRASTRUCTURE_DOMAIN_DNS_HTTPS_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[인프라/도메인/DNS/HTTPS 사전 승인 경계 결과 인증] 실제 도메인 연결, DNS 변경, SSL 발급은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems = [
    ...mapItems(
      boundaryView.operatingDbPreApprovalBoundaryItems,
      'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[운영 DB/Runtime/Worker/Queue/Adapter 사전 승인 경계 결과 인증] 실제 운영 DB 연결 변경과 DB write는 수행하지 않습니다.'
    ),
    ...mapItems(
      boundaryView.runtimeWorkerQueueAdapterPreApprovalBoundaryItems,
      'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
      'Outcome Certification',
      '[운영 DB/Runtime/Worker/Queue/Adapter 사전 승인 경계 결과 인증] 실제 Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결은 수행하지 않습니다.'
    ),
  ];
  const apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems = mapItems(
    boundaryView.apiSecretUiActionPostPreApprovalBoundaryItems,
    'API_SECRET_UI_ACTION_POST_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST 사전 승인 경계 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...submissionPreApprovalBoundaryOutcomeCertificationReadinessItems,
    ...submissionPreApprovalBoundaryReferenceOutcomeCertificationItems,
    ...finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems,
    ...approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems,
    ...approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    ...approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    ...finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    ...finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems,
    ...deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems,
    ...deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems,
    ...operatingTransitionPreApprovalBoundaryOutcomeCertificationItems,
    ...infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems,
    ...apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems,
  ];

  const readyOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isReady);
  const partialReadyOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isPartialReady
  );
  const blockedOutcomeCertificationItems = outcomeCertificationItems.filter((item) => item.isBlocked);
  const notStartedOutcomeCertificationItems = outcomeCertificationItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 385,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Submission Pre-Approval Boundary Outcome Certification',
    sourceSubmissionPreApprovalBoundaryStatus:
      boundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestSubmissionPreApprovalBoundaryOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Approval Request Submission Pre-Approval Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_SUBMISSION_PRE_APPROVAL_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'SUBMISSION_PRE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    outcomeCertificationItems,
    submissionPreApprovalBoundaryOutcomeCertificationReadinessItems,
    submissionPreApprovalBoundaryReferenceOutcomeCertificationItems,
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems,
    approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems,
    approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems,
    finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems,
    deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems,
    deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems,
    operatingTransitionPreApprovalBoundaryOutcomeCertificationItems,
    infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems,
    apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'Submission Pre-Approval Boundary Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    submissionPreApprovalBoundaryOutcomeCertificationReadinessItemCount:
      submissionPreApprovalBoundaryOutcomeCertificationReadinessItems.length,
    submissionPreApprovalBoundaryReferenceOutcomeCertificationItemCount:
      submissionPreApprovalBoundaryReferenceOutcomeCertificationItems.length,
    finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItemCount:
      finalSubmissionLockOutcomeCertificationReferencePreApprovalBoundaryOutcomeCertificationItems.length,
    approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItemCount:
      approvalRequestCreationPreApprovalBoundaryOutcomeCertificationItems.length,
    approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItemCount:
      approvalRequestReviewSubmissionPreApprovalBoundaryOutcomeCertificationItems.length,
    approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItemCount:
      approvalRequestSubmissionPreApprovalBoundaryOutcomeCertificationItems.length,
    finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItemCount:
      finalApprovalSubmissionPreApprovalBoundaryOutcomeCertificationItems.length,
    finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItemCount:
      finalApprovalGrantPreApprovalBoundaryOutcomeCertificationItems.length,
    deploymentApprovalPreApprovalBoundaryOutcomeCertificationItemCount:
      deploymentApprovalPreApprovalBoundaryOutcomeCertificationItems.length,
    deploymentExecutionPreApprovalBoundaryOutcomeCertificationItemCount:
      deploymentExecutionPreApprovalBoundaryOutcomeCertificationItems.length,
    operatingTransitionPreApprovalBoundaryOutcomeCertificationItemCount:
      operatingTransitionPreApprovalBoundaryOutcomeCertificationItems.length,
    infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItemCount:
      infrastructureDomainDnsHttpsPreApprovalBoundaryOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterPreApprovalBoundaryOutcomeCertificationItems.length,
    apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItemCount:
      apiSecretUiActionPostPreApprovalBoundaryOutcomeCertificationItems.length,
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
