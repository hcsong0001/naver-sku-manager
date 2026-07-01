import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-preparation-boundary-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewCategory =
  | 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READINESS'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_REQUIRED_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_NON_INPUT_LOCK_REVIEW'
  | 'USER_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_REVIEW'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_REVIEW'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_REVIEW'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_LOCK_REVIEW'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_LOCK_REVIEW'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_LOCK_REVIEW'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_LOCK_REVIEW'
  | 'API_SECRET_UI_ACTION_POST_LOCK_REVIEW';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItemStatus =
  | 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READY'
  | 'USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED'
  | 'USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem {
  lockReviewItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItemStatus;
  userApprovalPhraseLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView {
  taskId: 397;
  taskName: string;
  sourceUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus;
  recommendedUserApprovalPhraseLockReviewDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_ONLY';
  recommendedUserApprovalPhraseLockReviewDecisionLabel: '최종 승인 제출 User Approval Phrase Lock Review - read-only 사용자 승인 문구 Lock 검토 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_LOCK_REVIEW_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 Lock Review 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 검토만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  userApprovalPhraseLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseLockReviewReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseRequiredLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseExampleDisplayLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseNonInputLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseNonSubmissionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalAcceptanceNonGrantLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  explicitApprovalRequestCreationNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  explicitApprovalRequestSubmissionNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  finalApprovalSubmissionNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  finalApprovalGrantNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  deploymentOperatingTransitionNonExecutionLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  operatingDbRuntimeWorkerQueueAdapterLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  apiSecretUiActionPostLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseLockReviewSummaryCards: { label: string; value: number }[];
  readyUserApprovalPhraseLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  partialReadyUserApprovalPhraseLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  blockedUserApprovalPhraseLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  notStartedUserApprovalPhraseLockReviewItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[];
  userApprovalPhraseLockReviewReadinessItemCount: number;
  userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItemCount: number;
  userApprovalPhraseRequiredLockReviewItemCount: number;
  userApprovalPhraseExampleDisplayLockReviewItemCount: number;
  userApprovalPhraseNonInputLockReviewItemCount: number;
  userApprovalPhraseNonSubmissionLockReviewItemCount: number;
  userApprovalAcceptanceNonGrantLockReviewItemCount: number;
  explicitApprovalRequestCreationNonExecutionLockReviewItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionLockReviewItemCount: number;
  finalApprovalSubmissionNonExecutionLockReviewItemCount: number;
  finalApprovalGrantNonExecutionLockReviewItemCount: number;
  deploymentOperatingTransitionNonExecutionLockReviewItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterLockReviewItemCount: number;
  apiSecretUiActionPostLockReviewItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalUserApprovalPhraseLockReviewItemCount: number;
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
  actualUserApprovalPhraseInputAdded: false;
  actualUserApprovalPhraseSubmitted: false;
  actualUserApprovalPhraseAccepted: false;
  actualUserApprovalGranted: false;
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundarySubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false;
  actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false;
  actualUserApprovalPhrasePreparationBoundarySubmitted: false;
  actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseLockReviewSubmitted: false;
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
  actualSubmissionPreApprovalLockGranted: false;
  actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false;
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
  actualUserApprovalPhraseInputAddedToUi: false;
  actualSubmitActionAdded: false;
  actualPostApiAdded: false;
}

const STATUS_MAP: Record<
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED',
};

function toLockReviewItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItemStatus {
  if (item.isReady) return 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READY';
  if (item.isPartialReady) return 'USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY';
  if (item.isBlocked) return 'USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED';
  return 'USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewItem[] {
  return items.map((item) => {
    const userApprovalPhraseLockReviewStatus = toLockReviewItemStatus(item);
    return {
      lockReviewItemId: `user-approval-phrase-lock-review-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      userApprovalPhraseLockReviewStatus,
      isReady: userApprovalPhraseLockReviewStatus === 'USER_APPROVAL_PHRASE_LOCK_REVIEW_READY',
      isPartialReady:
        userApprovalPhraseLockReviewStatus === 'USER_APPROVAL_PHRASE_LOCK_REVIEW_PARTIAL_READY',
      isBlocked:
        userApprovalPhraseLockReviewStatus === 'USER_APPROVAL_PHRASE_LOCK_REVIEW_BLOCKED',
      isNotStarted:
        userApprovalPhraseLockReviewStatus === 'USER_APPROVAL_PHRASE_LOCK_REVIEW_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewView {
  const userApprovalPhraseLockReviewStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus
    ];

  const userApprovalPhraseLockReviewReadinessItems = mapItems(
    outcomeCertificationView.userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems,
    'USER_APPROVAL_PHRASE_LOCK_REVIEW_READINESS',
    'Lock Review',
    '[사용자 승인 문구 Lock 검토 준비도] read-only Lock 검토 표시 상태만 확인합니다.'
  );
  const userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_REFERENCE_LOCK_REVIEW',
    'Lock Review',
    '[사용자 승인 문구 준비 경계 결과 인증 참조 Lock 검토] Task 396 결과를 read-only로 참조합니다.'
  );
  const userApprovalPhraseRequiredLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseRequiredOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_REQUIRED_LOCK_REVIEW',
    'Lock Review',
    '[사용자 승인 문구 필요 Lock 검토] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 검토만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseExampleDisplayOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_LOCK_REVIEW',
    'Lock Review',
    '[사용자 승인 문구 예시 표시 Lock 검토] 승인 문구 예시는 read-only 검토만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseNonInputLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseNonInputOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_NON_INPUT_LOCK_REVIEW',
    'Lock Review',
    '[사용자 승인 문구 비입력 Lock 검토] 이번 화면에서는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseNonSubmissionLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalPhraseNonSubmissionOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_NON_SUBMISSION_LOCK_REVIEW',
    'Lock Review',
    '[사용자 승인 문구 비제출 Lock 검토] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantLockReviewItems = mapItems(
    outcomeCertificationView.userApprovalAcceptanceNonGrantOutcomeCertificationItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_LOCK_REVIEW',
    'Lock Review',
    '[사용자 승인 수락 비부여 Lock 검토] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 요청 생성 비실행 Lock 검토] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionLockReviewItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_LOCK_REVIEW',
    'Lock Review',
    '[명시 승인 요청 제출 비실행 Lock 검토] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
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

  const userApprovalPhraseLockReviewItems = [
    ...userApprovalPhraseLockReviewReadinessItems,
    ...userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems,
    ...userApprovalPhraseRequiredLockReviewItems,
    ...userApprovalPhraseExampleDisplayLockReviewItems,
    ...userApprovalPhraseNonInputLockReviewItems,
    ...userApprovalPhraseNonSubmissionLockReviewItems,
    ...userApprovalAcceptanceNonGrantLockReviewItems,
    ...explicitApprovalRequestCreationNonExecutionLockReviewItems,
    ...explicitApprovalRequestSubmissionNonExecutionLockReviewItems,
    ...finalApprovalSubmissionNonExecutionLockReviewItems,
    ...finalApprovalGrantNonExecutionLockReviewItems,
    ...deploymentOperatingTransitionNonExecutionLockReviewItems,
    ...operatingDbRuntimeWorkerQueueAdapterLockReviewItems,
    ...apiSecretUiActionPostLockReviewItems,
  ];

  const readyUserApprovalPhraseLockReviewItems = userApprovalPhraseLockReviewItems.filter(
    (item) => item.isReady
  );
  const partialReadyUserApprovalPhraseLockReviewItems = userApprovalPhraseLockReviewItems.filter(
    (item) => item.isPartialReady
  );
  const blockedUserApprovalPhraseLockReviewItems = userApprovalPhraseLockReviewItems.filter(
    (item) => item.isBlocked
  );
  const notStartedUserApprovalPhraseLockReviewItems = userApprovalPhraseLockReviewItems.filter(
    (item) => item.isNotStarted
  );

  return {
    taskId: 397,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Lock Review',
    sourceUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseLockReviewStatus:
      userApprovalPhraseLockReviewStatus,
    recommendedUserApprovalPhraseLockReviewDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW_ONLY',
    recommendedUserApprovalPhraseLockReviewDecisionLabel:
      '최종 승인 제출 User Approval Phrase Lock Review - read-only 사용자 승인 문구 Lock 검토 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_LOCK_REVIEW_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 Lock Review 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 검토만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: outcomeCertificationView.userApprovalPhraseExample,
    userApprovalPhraseLockReviewItems,
    userApprovalPhraseLockReviewReadinessItems,
    userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems,
    userApprovalPhraseRequiredLockReviewItems,
    userApprovalPhraseExampleDisplayLockReviewItems,
    userApprovalPhraseNonInputLockReviewItems,
    userApprovalPhraseNonSubmissionLockReviewItems,
    userApprovalAcceptanceNonGrantLockReviewItems,
    explicitApprovalRequestCreationNonExecutionLockReviewItems,
    explicitApprovalRequestSubmissionNonExecutionLockReviewItems,
    finalApprovalSubmissionNonExecutionLockReviewItems,
    finalApprovalGrantNonExecutionLockReviewItems,
    deploymentOperatingTransitionNonExecutionLockReviewItems,
    operatingDbRuntimeWorkerQueueAdapterLockReviewItems,
    apiSecretUiActionPostLockReviewItems,
    userApprovalPhraseLockReviewSummaryCards: [
      { label: 'User Approval Phrase Lock Review 그룹', value: 14 },
      { label: 'Ready', value: readyUserApprovalPhraseLockReviewItems.length },
      { label: 'Blocked', value: blockedUserApprovalPhraseLockReviewItems.length },
      { label: 'Total', value: userApprovalPhraseLockReviewItems.length },
    ],
    readyUserApprovalPhraseLockReviewItems,
    partialReadyUserApprovalPhraseLockReviewItems,
    blockedUserApprovalPhraseLockReviewItems,
    notStartedUserApprovalPhraseLockReviewItems,
    userApprovalPhraseLockReviewReadinessItemCount:
      userApprovalPhraseLockReviewReadinessItems.length,
    userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItemCount:
      userApprovalPhrasePreparationBoundaryOutcomeCertificationReferenceLockReviewItems.length,
    userApprovalPhraseRequiredLockReviewItemCount:
      userApprovalPhraseRequiredLockReviewItems.length,
    userApprovalPhraseExampleDisplayLockReviewItemCount:
      userApprovalPhraseExampleDisplayLockReviewItems.length,
    userApprovalPhraseNonInputLockReviewItemCount:
      userApprovalPhraseNonInputLockReviewItems.length,
    userApprovalPhraseNonSubmissionLockReviewItemCount:
      userApprovalPhraseNonSubmissionLockReviewItems.length,
    userApprovalAcceptanceNonGrantLockReviewItemCount:
      userApprovalAcceptanceNonGrantLockReviewItems.length,
    explicitApprovalRequestCreationNonExecutionLockReviewItemCount:
      explicitApprovalRequestCreationNonExecutionLockReviewItems.length,
    explicitApprovalRequestSubmissionNonExecutionLockReviewItemCount:
      explicitApprovalRequestSubmissionNonExecutionLockReviewItems.length,
    finalApprovalSubmissionNonExecutionLockReviewItemCount:
      finalApprovalSubmissionNonExecutionLockReviewItems.length,
    finalApprovalGrantNonExecutionLockReviewItemCount:
      finalApprovalGrantNonExecutionLockReviewItems.length,
    deploymentOperatingTransitionNonExecutionLockReviewItemCount:
      deploymentOperatingTransitionNonExecutionLockReviewItems.length,
    operatingDbRuntimeWorkerQueueAdapterLockReviewItemCount:
      operatingDbRuntimeWorkerQueueAdapterLockReviewItems.length,
    apiSecretUiActionPostLockReviewItemCount: apiSecretUiActionPostLockReviewItems.length,
    readyItemCount: readyUserApprovalPhraseLockReviewItems.length,
    partialReadyItemCount: partialReadyUserApprovalPhraseLockReviewItems.length,
    blockedItemCount: blockedUserApprovalPhraseLockReviewItems.length,
    notStartedItemCount: notStartedUserApprovalPhraseLockReviewItems.length,
    totalUserApprovalPhraseLockReviewItemCount: userApprovalPhraseLockReviewItems.length,
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
    actualUserApprovalPhraseInputAdded: false,
    actualUserApprovalPhraseSubmitted: false,
    actualUserApprovalPhraseAccepted: false,
    actualUserApprovalGranted: false,
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockReviewSubmitted: false,
    actualExplicitApprovalRequestSubmissionLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhrasePreparationBoundarySubmitted: false,
    actualUserApprovalPhrasePreparationBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseLockReviewSubmitted: false,
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
    actualSubmissionPreApprovalLockGranted: false,
    actualSubmissionPreApprovalLockOutcomeCertificationSubmitted: false,
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
    actualUserApprovalPhraseInputAddedToUi: false,
    actualSubmitActionAdded: false,
    actualPostApiAdded: false,
  };
}
