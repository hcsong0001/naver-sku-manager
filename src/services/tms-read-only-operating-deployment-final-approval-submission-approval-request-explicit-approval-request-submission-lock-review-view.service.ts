import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-boundary-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS'
  | 'SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_REVIEW'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_REVIEW'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_REVIEW'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_REVIEW'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_LOCK_REVIEW';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem {
  lockReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemStatus;
  submissionLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView {
  taskId: 393;
  taskName: string;
  sourceExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus;
  recommendedSubmissionLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY';
  recommendedSubmissionLockReviewDecisionLabel: '최종 승인 제출 Explicit Approval Request Submission Lock Review - read-only 명시 승인 요청 제출 Lock 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  submissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalRequestSubmissionLockReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  submissionBoundaryOutcomeCertificationReferenceLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalPhraseNonInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalPhraseNonSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalAcceptanceNonGrantLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalRequestCreationLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalRequestSubmissionLockReviewDetailItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  approvalRequestCreationNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  approvalRequestSubmissionNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  finalApprovalSubmissionNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  finalApprovalGrantNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  deploymentOperatingTransitionNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  operatingDbRuntimeWorkerQueueAdapterLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  apiSecretUiActionPostLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  submissionLockReviewSummaryCards: { label: string; value: number }[];
  readySubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  partialReadySubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  blockedSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  notStartedSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[];
  explicitApprovalRequestSubmissionLockReviewReadinessItemCount: number;
  submissionBoundaryOutcomeCertificationReferenceLockReviewItemCount: number;
  explicitApprovalPhraseNonInputLockReviewItemCount: number;
  explicitApprovalPhraseNonSubmissionLockReviewItemCount: number;
  explicitApprovalAcceptanceNonGrantLockReviewItemCount: number;
  explicitApprovalRequestCreationLockReviewItemCount: number;
  explicitApprovalRequestSubmissionLockReviewDetailItemCount: number;
  approvalRequestCreationNonExecutionLockReviewItemCount: number;
  approvalRequestSubmissionNonExecutionLockReviewItemCount: number;
  finalApprovalSubmissionNonExecutionLockReviewItemCount: number;
  finalApprovalGrantNonExecutionLockReviewItemCount: number;
  deploymentOperatingTransitionNonExecutionLockReviewItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterLockReviewItemCount: number;
  apiSecretUiActionPostLockReviewItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalSubmissionLockReviewItemCount: number;
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
  actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
};

function toSubmissionLockReviewItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY';
  if (item.isPartialReady) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY';
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewItem[] {
  return items.map((item) => {
    const submissionLockReviewStatus = toSubmissionLockReviewItemStatus(item);
    return {
      lockReviewItemId: `explicit-approval-request-submission-lock-review-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      submissionLockReviewStatus,
      isReady: submissionLockReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READY',
      isPartialReady:
        submissionLockReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_PARTIAL_READY',
      isBlocked:
        submissionLockReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_BLOCKED',
      isNotStarted:
        submissionLockReviewStatus === 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewView {
  const submissionLockReviewStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus
    ];

  const explicitApprovalRequestSubmissionLockReviewReadinessItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_READINESS',
    'Lock Review',
    '[명시 승인 요청 제출 Lock 검토 준비도] read-only Lock 검토 가능 상태만 확인합니다.'
  );
  const submissionBoundaryOutcomeCertificationReferenceLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems,
    'SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW',
    'Lock Review',
    '[제출 경계 결과 인증 참조 Lock 검토] Task 392 결과를 read-only로 참조합니다.'
  );
  const explicitApprovalPhraseNonInputLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonInputOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 문구 비입력 Lock 검토] 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며 이번 화면에는 입력창이 없습니다.'
  );
  const explicitApprovalPhraseNonSubmissionLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonSubmissionOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 문구 비제출 Lock 검토] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const explicitApprovalAcceptanceNonGrantLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalAcceptanceNonGrantOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 수락 비부여 Lock 검토] 이번 화면에서는 승인 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestCreationBoundaryOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 요청 생성 Lock 검토] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionLockReviewDetailItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 요청 제출 Lock 검토] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const approvalRequestCreationNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestCreationNonExecutionOutcomeCertificationItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 생성 비실행 Lock 검토] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
    'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[승인 요청 제출 비실행 Lock 검토] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[최종 승인 제출 비실행 Lock 검토] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.finalApprovalGrantNonExecutionOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[최종 승인 부여 비실행 Lock 검토] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.deploymentOperatingTransitionNonExecutionOutcomeCertificationItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[배포/운영 전환 비실행 Lock 검토] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterLockReviewItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_REVIEW',
    'Lock Review',
    '[운영 DB/Runtime/Worker/Queue/Adapter Lock 검토] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostLockReviewItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_LOCK_REVIEW',
    'Lock Review',
    '[API/Secret/UI Action/POST Lock 검토] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const submissionLockReviewItems = [
    ...explicitApprovalRequestSubmissionLockReviewReadinessItems,
    ...submissionBoundaryOutcomeCertificationReferenceLockReviewItems,
    ...explicitApprovalPhraseNonInputLockReviewItems,
    ...explicitApprovalPhraseNonSubmissionLockReviewItems,
    ...explicitApprovalAcceptanceNonGrantLockReviewItems,
    ...explicitApprovalRequestCreationLockReviewItems,
    ...explicitApprovalRequestSubmissionLockReviewDetailItems,
    ...approvalRequestCreationNonExecutionLockReviewItems,
    ...approvalRequestSubmissionNonExecutionLockReviewItems,
    ...finalApprovalSubmissionNonExecutionLockReviewItems,
    ...finalApprovalGrantNonExecutionLockReviewItems,
    ...deploymentOperatingTransitionNonExecutionLockReviewItems,
    ...operatingDbRuntimeWorkerQueueAdapterLockReviewItems,
    ...apiSecretUiActionPostLockReviewItems,
  ];

  const readySubmissionLockReviewItems = submissionLockReviewItems.filter((item) => item.isReady);
  const partialReadySubmissionLockReviewItems = submissionLockReviewItems.filter(
    (item) => item.isPartialReady
  );
  const blockedSubmissionLockReviewItems = submissionLockReviewItems.filter(
    (item) => item.isBlocked
  );
  const notStartedSubmissionLockReviewItems = submissionLockReviewItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 393,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Lock Review',
    sourceExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockReviewStatus:
      submissionLockReviewStatus,
    recommendedSubmissionLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSubmissionLockReviewDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Lock Review - read-only 명시 승인 요청 제출 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance: outcomeCertificationView.explicitApprovalPhraseGuidance,
    explicitApprovalPhraseExample: outcomeCertificationView.explicitApprovalPhraseExample,
    submissionLockReviewItems,
    explicitApprovalRequestSubmissionLockReviewReadinessItems,
    submissionBoundaryOutcomeCertificationReferenceLockReviewItems,
    explicitApprovalPhraseNonInputLockReviewItems,
    explicitApprovalPhraseNonSubmissionLockReviewItems,
    explicitApprovalAcceptanceNonGrantLockReviewItems,
    explicitApprovalRequestCreationLockReviewItems,
    explicitApprovalRequestSubmissionLockReviewDetailItems,
    approvalRequestCreationNonExecutionLockReviewItems,
    approvalRequestSubmissionNonExecutionLockReviewItems,
    finalApprovalSubmissionNonExecutionLockReviewItems,
    finalApprovalGrantNonExecutionLockReviewItems,
    deploymentOperatingTransitionNonExecutionLockReviewItems,
    operatingDbRuntimeWorkerQueueAdapterLockReviewItems,
    apiSecretUiActionPostLockReviewItems,
    submissionLockReviewSummaryCards: [
      { label: 'Explicit Approval Request Submission Lock Review 그룹', value: 14 },
      { label: 'Ready', value: readySubmissionLockReviewItems.length },
      { label: 'Blocked', value: blockedSubmissionLockReviewItems.length },
      { label: 'Total', value: submissionLockReviewItems.length },
    ],
    readySubmissionLockReviewItems,
    partialReadySubmissionLockReviewItems,
    blockedSubmissionLockReviewItems,
    notStartedSubmissionLockReviewItems,
    explicitApprovalRequestSubmissionLockReviewReadinessItemCount:
      explicitApprovalRequestSubmissionLockReviewReadinessItems.length,
    submissionBoundaryOutcomeCertificationReferenceLockReviewItemCount:
      submissionBoundaryOutcomeCertificationReferenceLockReviewItems.length,
    explicitApprovalPhraseNonInputLockReviewItemCount:
      explicitApprovalPhraseNonInputLockReviewItems.length,
    explicitApprovalPhraseNonSubmissionLockReviewItemCount:
      explicitApprovalPhraseNonSubmissionLockReviewItems.length,
    explicitApprovalAcceptanceNonGrantLockReviewItemCount:
      explicitApprovalAcceptanceNonGrantLockReviewItems.length,
    explicitApprovalRequestCreationLockReviewItemCount:
      explicitApprovalRequestCreationLockReviewItems.length,
    explicitApprovalRequestSubmissionLockReviewDetailItemCount:
      explicitApprovalRequestSubmissionLockReviewDetailItems.length,
    approvalRequestCreationNonExecutionLockReviewItemCount:
      approvalRequestCreationNonExecutionLockReviewItems.length,
    approvalRequestSubmissionNonExecutionLockReviewItemCount:
      approvalRequestSubmissionNonExecutionLockReviewItems.length,
    finalApprovalSubmissionNonExecutionLockReviewItemCount:
      finalApprovalSubmissionNonExecutionLockReviewItems.length,
    finalApprovalGrantNonExecutionLockReviewItemCount:
      finalApprovalGrantNonExecutionLockReviewItems.length,
    deploymentOperatingTransitionNonExecutionLockReviewItemCount:
      deploymentOperatingTransitionNonExecutionLockReviewItems.length,
    operatingDbRuntimeWorkerQueueAdapterLockReviewItemCount:
      operatingDbRuntimeWorkerQueueAdapterLockReviewItems.length,
    apiSecretUiActionPostLockReviewItemCount: apiSecretUiActionPostLockReviewItems.length,
    readyItemCount: readySubmissionLockReviewItems.length,
    partialReadyItemCount: partialReadySubmissionLockReviewItems.length,
    blockedItemCount: blockedSubmissionLockReviewItems.length,
    notStartedItemCount: notStartedSubmissionLockReviewItems.length,
    totalSubmissionLockReviewItemCount: submissionLockReviewItems.length,
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
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
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
