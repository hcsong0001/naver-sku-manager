import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-lock-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryCategory =
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READINESS'
  | 'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PREPARATION_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_REQUIRED_PREPARATION_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_PREPARATION_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_NON_INPUT_PREPARATION_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_NON_SUBMISSION_PREPARATION_BOUNDARY'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_PREPARATION_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_PREPARATION_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_PREPARATION_BOUNDARY'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_PREPARATION_BOUNDARY'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_PREPARATION_BOUNDARY'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_PREPARATION_BOUNDARY'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PREPARATION_BOUNDARY'
  | 'API_SECRET_UI_ACTION_POST_PREPARATION_BOUNDARY';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItemStatus =
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem {
  preparationBoundaryItemId: string;
  sourceOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryCategory;
  label: string;
  description: string;
  sourceOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItemStatus;
  preparationBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView {
  taskId: 395;
  taskName: string;
  sourceExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus;
  recommendedUserApprovalPhrasePreparationBoundaryDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_ONLY';
  recommendedUserApprovalPhrasePreparationBoundaryDecisionLabel: '최종 승인 제출 User Approval Phrase Preparation Boundary - read-only 사용자 승인 문구 준비 경계 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 준비 경계 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 표시만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  userApprovalPhrasePreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhrasePreparationBoundaryReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  submissionLockOutcomeCertificationReferencePreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhraseRequiredPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhraseExampleDisplayPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhraseNonInputPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhraseNonSubmissionPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalAcceptanceNonGrantPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  finalApprovalSubmissionNonExecutionPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  finalApprovalGrantNonExecutionPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  deploymentOperatingTransitionNonExecutionPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  apiSecretUiActionPostPreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhrasePreparationBoundarySummaryCards: { label: string; value: number }[];
  readyUserApprovalPhrasePreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  partialReadyUserApprovalPhrasePreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  blockedUserApprovalPhrasePreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  notStartedUserApprovalPhrasePreparationBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[];
  userApprovalPhrasePreparationBoundaryReadinessItemCount: number;
  submissionLockOutcomeCertificationReferencePreparationBoundaryItemCount: number;
  userApprovalPhraseRequiredPreparationBoundaryItemCount: number;
  userApprovalPhraseExampleDisplayPreparationBoundaryItemCount: number;
  userApprovalPhraseNonInputPreparationBoundaryItemCount: number;
  userApprovalPhraseNonSubmissionPreparationBoundaryItemCount: number;
  userApprovalAcceptanceNonGrantPreparationBoundaryItemCount: number;
  explicitApprovalRequestCreationNonExecutionPreparationBoundaryItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItemCount: number;
  finalApprovalSubmissionNonExecutionPreparationBoundaryItemCount: number;
  finalApprovalGrantNonExecutionPreparationBoundaryItemCount: number;
  deploymentOperatingTransitionNonExecutionPreparationBoundaryItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItemCount: number;
  apiSecretUiActionPostPreparationBoundaryItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalUserApprovalPhrasePreparationBoundaryItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED',
};

function toPreparationBoundaryItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItemStatus {
  if (item.isReady) return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY';
  if (item.isPartialReady) return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY';
  if (item.isBlocked) return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED';
  return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[] {
  return items.map((item) => {
    const preparationBoundaryStatus = toPreparationBoundaryItemStatus(item);
    return {
      preparationBoundaryItemId: `user-approval-phrase-preparation-boundary-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceOutcomeCertificationStatus: item.outcomeCertificationStatus,
      preparationBoundaryStatus,
      isReady: preparationBoundaryStatus === 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY',
      isPartialReady:
        preparationBoundaryStatus === 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY',
      isBlocked:
        preparationBoundaryStatus === 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED',
      isNotStarted:
        preparationBoundaryStatus === 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView(
  outcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView {
  const preparationBoundaryStatus =
    STATUS_MAP[
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus
    ];

  const userApprovalPhrasePreparationBoundaryReadinessItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionLockOutcomeCertificationReadinessItems,
    'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READINESS',
    'Preparation Boundary',
    '[사용자 승인 문구 준비 경계 준비도] read-only 준비 경계 표시 상태만 확인합니다.'
  );
  const submissionLockOutcomeCertificationReferencePreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionLockReviewReferenceOutcomeCertificationItems,
    'SUBMISSION_LOCK_OUTCOME_CERTIFICATION_REFERENCE_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[Submission Lock 결과 인증 참조 준비 경계] Task 394 결과를 read-only로 참조합니다.'
  );
  const userApprovalPhraseRequiredPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_REQUIRED_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[사용자 승인 문구 필요 준비 경계] 승인 문구는 이후 별도 승인 단계에서만 필요하며, 이번 화면은 준비 안내만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[사용자 승인 문구 예시 표시 준비 경계] 승인 문구 예시는 read-only 안내로만 보여주며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseNonInputPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_NON_INPUT_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[사용자 승인 문구 비입력 준비 경계] 이번 화면에서는 사용자 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseNonSubmissionPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalPhraseNonSubmissionLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_NON_SUBMISSION_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[사용자 승인 문구 비제출 준비 경계] 이번 화면에서는 사용자 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalAcceptanceNonGrantLockOutcomeCertificationItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[사용자 승인 수락 비부여 준비 경계] 이번 화면에서는 사용자 승인 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestCreationLockOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[명시 승인 요청 생성 비실행 준비 경계] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems = mapItems(
    outcomeCertificationView.explicitApprovalRequestSubmissionLockOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[명시 승인 요청 제출 비실행 준비 경계] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionPreparationBoundaryItems = mapItems(
    outcomeCertificationView.finalApprovalSubmissionNonExecutionLockOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[최종 승인 제출 비실행 준비 경계] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionPreparationBoundaryItems = mapItems(
    outcomeCertificationView.finalApprovalGrantNonExecutionLockOutcomeCertificationItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[최종 승인 부여 비실행 준비 경계] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionPreparationBoundaryItems = mapItems(
    outcomeCertificationView.deploymentOperatingTransitionNonExecutionLockOutcomeCertificationItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[배포/운영 전환 비실행 준비 경계] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems = mapItems(
    outcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterLockOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[운영 DB/Runtime/Worker/Queue/Adapter 준비 경계] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostPreparationBoundaryItems = mapItems(
    outcomeCertificationView.apiSecretUiActionPostLockOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_PREPARATION_BOUNDARY',
    'Preparation Boundary',
    '[API/Secret/UI Action/POST 준비 경계] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const userApprovalPhrasePreparationBoundaryItems = [
    ...userApprovalPhrasePreparationBoundaryReadinessItems,
    ...submissionLockOutcomeCertificationReferencePreparationBoundaryItems,
    ...userApprovalPhraseRequiredPreparationBoundaryItems,
    ...userApprovalPhraseExampleDisplayPreparationBoundaryItems,
    ...userApprovalPhraseNonInputPreparationBoundaryItems,
    ...userApprovalPhraseNonSubmissionPreparationBoundaryItems,
    ...userApprovalAcceptanceNonGrantPreparationBoundaryItems,
    ...explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems,
    ...explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems,
    ...finalApprovalSubmissionNonExecutionPreparationBoundaryItems,
    ...finalApprovalGrantNonExecutionPreparationBoundaryItems,
    ...deploymentOperatingTransitionNonExecutionPreparationBoundaryItems,
    ...operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems,
    ...apiSecretUiActionPostPreparationBoundaryItems,
  ];

  const readyUserApprovalPhrasePreparationBoundaryItems =
    userApprovalPhrasePreparationBoundaryItems.filter((item) => item.isReady);
  const partialReadyUserApprovalPhrasePreparationBoundaryItems =
    userApprovalPhrasePreparationBoundaryItems.filter((item) => item.isPartialReady);
  const blockedUserApprovalPhrasePreparationBoundaryItems =
    userApprovalPhrasePreparationBoundaryItems.filter((item) => item.isBlocked);
  const notStartedUserApprovalPhrasePreparationBoundaryItems =
    userApprovalPhrasePreparationBoundaryItems.filter((item) => item.isNotStarted);

  return {
    taskId: 395,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Preparation Boundary',
    sourceExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus:
      outcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionLockOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus:
      preparationBoundaryStatus,
    recommendedUserApprovalPhrasePreparationBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_ONLY',
    recommendedUserApprovalPhrasePreparationBoundaryDecisionLabel:
      '최종 승인 제출 User Approval Phrase Preparation Boundary - read-only 사용자 승인 문구 준비 경계 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 준비 경계 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 표시만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: outcomeCertificationView.explicitApprovalPhraseExample,
    userApprovalPhrasePreparationBoundaryItems,
    userApprovalPhrasePreparationBoundaryReadinessItems,
    submissionLockOutcomeCertificationReferencePreparationBoundaryItems,
    userApprovalPhraseRequiredPreparationBoundaryItems,
    userApprovalPhraseExampleDisplayPreparationBoundaryItems,
    userApprovalPhraseNonInputPreparationBoundaryItems,
    userApprovalPhraseNonSubmissionPreparationBoundaryItems,
    userApprovalAcceptanceNonGrantPreparationBoundaryItems,
    explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems,
    explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems,
    finalApprovalSubmissionNonExecutionPreparationBoundaryItems,
    finalApprovalGrantNonExecutionPreparationBoundaryItems,
    deploymentOperatingTransitionNonExecutionPreparationBoundaryItems,
    operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems,
    apiSecretUiActionPostPreparationBoundaryItems,
    userApprovalPhrasePreparationBoundarySummaryCards: [
      { label: 'User Approval Phrase Preparation Boundary 그룹', value: 14 },
      { label: 'Ready', value: readyUserApprovalPhrasePreparationBoundaryItems.length },
      { label: 'Blocked', value: blockedUserApprovalPhrasePreparationBoundaryItems.length },
      { label: 'Total', value: userApprovalPhrasePreparationBoundaryItems.length },
    ],
    readyUserApprovalPhrasePreparationBoundaryItems,
    partialReadyUserApprovalPhrasePreparationBoundaryItems,
    blockedUserApprovalPhrasePreparationBoundaryItems,
    notStartedUserApprovalPhrasePreparationBoundaryItems,
    userApprovalPhrasePreparationBoundaryReadinessItemCount:
      userApprovalPhrasePreparationBoundaryReadinessItems.length,
    submissionLockOutcomeCertificationReferencePreparationBoundaryItemCount:
      submissionLockOutcomeCertificationReferencePreparationBoundaryItems.length,
    userApprovalPhraseRequiredPreparationBoundaryItemCount:
      userApprovalPhraseRequiredPreparationBoundaryItems.length,
    userApprovalPhraseExampleDisplayPreparationBoundaryItemCount:
      userApprovalPhraseExampleDisplayPreparationBoundaryItems.length,
    userApprovalPhraseNonInputPreparationBoundaryItemCount:
      userApprovalPhraseNonInputPreparationBoundaryItems.length,
    userApprovalPhraseNonSubmissionPreparationBoundaryItemCount:
      userApprovalPhraseNonSubmissionPreparationBoundaryItems.length,
    userApprovalAcceptanceNonGrantPreparationBoundaryItemCount:
      userApprovalAcceptanceNonGrantPreparationBoundaryItems.length,
    explicitApprovalRequestCreationNonExecutionPreparationBoundaryItemCount:
      explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems.length,
    explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItemCount:
      explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems.length,
    finalApprovalSubmissionNonExecutionPreparationBoundaryItemCount:
      finalApprovalSubmissionNonExecutionPreparationBoundaryItems.length,
    finalApprovalGrantNonExecutionPreparationBoundaryItemCount:
      finalApprovalGrantNonExecutionPreparationBoundaryItems.length,
    deploymentOperatingTransitionNonExecutionPreparationBoundaryItemCount:
      deploymentOperatingTransitionNonExecutionPreparationBoundaryItems.length,
    operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItemCount:
      operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems.length,
    apiSecretUiActionPostPreparationBoundaryItemCount:
      apiSecretUiActionPostPreparationBoundaryItems.length,
    readyItemCount: readyUserApprovalPhrasePreparationBoundaryItems.length,
    partialReadyItemCount: partialReadyUserApprovalPhrasePreparationBoundaryItems.length,
    blockedItemCount: blockedUserApprovalPhrasePreparationBoundaryItems.length,
    notStartedItemCount: notStartedUserApprovalPhrasePreparationBoundaryItems.length,
    totalUserApprovalPhrasePreparationBoundaryItemCount:
      userApprovalPhrasePreparationBoundaryItems.length,
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
