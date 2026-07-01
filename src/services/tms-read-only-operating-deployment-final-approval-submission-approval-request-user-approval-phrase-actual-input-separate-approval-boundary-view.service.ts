import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-final-pre-input-lock-outcome-certification-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryCategory =
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READINESS'
  | 'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_REFERENCE_SEPARATE_APPROVAL_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_REQUIRES_SEPARATE_APPROVAL_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_SEPARATE_APPROVAL_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_SEPARATE_APPROVAL_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY'
  | 'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_SEPARATE_APPROVAL_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_SEPARATE_APPROVAL_BOUNDARY'
  | 'API_SECRET_UI_ACTION_POST_SEPARATE_APPROVAL_BOUNDARY';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItemStatus =
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY'
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED'
  | 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem {
  actualInputSeparateApprovalBoundaryItemId: string;
  sourceFinalPreInputLockOutcomeCertificationItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryCategory;
  label: string;
  description: string;
  sourceFinalPreInputLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItemStatus;
  actualInputSeparateApprovalBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView {
  taskId: 403;
  taskName: string;
  sourceUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus;
  recommendedActualInputSeparateApprovalBoundaryDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_ONLY';
  recommendedActualInputSeparateApprovalBoundaryDecisionLabel: '최종 승인 제출 User Approval Phrase Actual Input Separate Approval Boundary - read-only 실제 입력 별도 승인 경계 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 User Approval Phrase Actual Input Separate Approval Boundary 화면입니다. 실제 승인 문구 입력은 이후 별도 승인 단계에서만 가능하며, 이번 화면은 read-only 별도 승인 경계 안내만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  actualInputSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  apiSecretUiActionPostSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  actualInputSeparateApprovalBoundarySummaryCards: { label: string; value: number }[];
  readyActualInputSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  partialReadyActualInputSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  blockedActualInputSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  notStartedActualInputSeparateApprovalBoundaryItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[];
  userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItemCount: number;
  userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItemCount: number;
  userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItemCount: number;
  userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItemCount: number;
  userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItemCount: number;
  userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItemCount: number;
  userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItemCount: number;
  userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItemCount: number;
  explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItemCount: number;
  finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItemCount: number;
  deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItemCount: number;
  apiSecretUiActionPostSeparateApprovalBoundaryItemCount: number;
  readyItemCount: number;
  partialReadyItemCount: number;
  blockedItemCount: number;
  notStartedItemCount: number;
  totalActualInputSeparateApprovalBoundaryItemCount: number;
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
  actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseExplicitInputBoundarySubmitted: false;
  actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseFinalPreInputLockReviewSubmitted: false;
  actualUserApprovalPhraseFinalPreInputLockOutcomeCertificationSubmitted: false;
  actualUserApprovalPhraseActualInputSeparateApprovalBoundarySubmitted: false;
  actualUserApprovalPhraseActualInputSeparateApprovalGranted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED',
};

function toActualInputSeparateApprovalBoundaryItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItemStatus {
  if (item.isReady) {
    return 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY';
  }
  if (item.isPartialReady) {
    return 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY';
  }
  if (item.isBlocked) {
    return 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED';
  }
  return 'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryItem[] {
  return items.map((item) => {
    const actualInputSeparateApprovalBoundaryStatus =
      toActualInputSeparateApprovalBoundaryItemStatus(item);

    return {
      actualInputSeparateApprovalBoundaryItemId: `user-approval-phrase-actual-input-separate-approval-boundary-${item.outcomeCertificationItemId}-${category.toLowerCase()}`,
      sourceFinalPreInputLockOutcomeCertificationItemId: item.outcomeCertificationItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceFinalPreInputLockOutcomeCertificationStatus: item.outcomeCertificationStatus,
      actualInputSeparateApprovalBoundaryStatus,
      isReady:
        actualInputSeparateApprovalBoundaryStatus ===
        'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READY',
      isPartialReady:
        actualInputSeparateApprovalBoundaryStatus ===
        'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_PARTIAL_READY',
      isBlocked:
        actualInputSeparateApprovalBoundaryStatus ===
        'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_BLOCKED',
      isNotStarted:
        actualInputSeparateApprovalBoundaryStatus ===
        'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView(
  finalPreInputLockOutcomeCertificationView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryView {
  const actualInputSeparateApprovalBoundaryStatus =
    STATUS_MAP[
      finalPreInputLockOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus
    ];

  const userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalPhraseFinalPreInputLockOutcomeCertificationReadinessItems,
    'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_READINESS',
    'Separate Approval Boundary',
    '[사용자 승인 문구 실제 입력 별도 승인 경계 준비도] 실제 입력은 별도 승인 후에만 가능하며 이번 화면은 read-only 경계 상태만 표시합니다.'
  );
  const userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItems =
    mapItems(
      finalPreInputLockOutcomeCertificationView.userApprovalPhraseFinalPreInputLockReviewReferenceOutcomeCertificationItems,
      'USER_APPROVAL_PHRASE_FINAL_PRE_INPUT_LOCK_OUTCOME_CERTIFICATION_REFERENCE_SEPARATE_APPROVAL_BOUNDARY',
      'Separate Approval Boundary',
      '[사용자 승인 문구 Final Pre-Input Lock 결과 인증 참조 별도 승인 경계] Task 402 결과를 read-only로 참조합니다.'
    );
  const userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalPhraseRequiredFinalPreInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_ACTUAL_INPUT_REQUIRES_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[사용자 승인 문구 실제 입력 별도 승인 필요 경계] 실제 승인 문구 입력은 이후 별도 승인 단계에서만 가능합니다.'
  );
  const userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalPhraseExampleDisplayFinalPreInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[사용자 승인 문구 예시 표시 별도 승인 경계] 승인 문구 예시는 read-only 경계 안내만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalPhraseInputUiNonAdditionFinalPreInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_INPUT_UI_NON_ADDITION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[사용자 승인 문구 입력 UI 미추가 별도 승인 경계] 이번 화면에는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalPhraseInputNonExecutionFinalPreInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_ACTUAL_INPUT_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[사용자 승인 문구 실제 입력 비실행 별도 승인 경계] 이번 화면에서는 승인 문구를 실제 입력하지 않습니다.'
  );
  const userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalPhraseSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    'USER_APPROVAL_PHRASE_SUBMISSION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[사용자 승인 문구 제출 비실행 별도 승인 경계] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.userApprovalAcceptanceNonGrantFinalPreInputLockOutcomeCertificationItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[사용자 승인 수락 비부여 별도 승인 경계] 이번 화면에서는 승인 문구 수락 상태나 별도 승인 부여 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.explicitApprovalRequestCreationNonExecutionFinalPreInputLockOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[명시 승인 요청 생성 비실행 별도 승인 경계] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.explicitApprovalRequestSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[명시 승인 요청 제출 비실행 별도 승인 경계] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.finalApprovalSubmissionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[최종 승인 제출 비실행 별도 승인 경계] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.deploymentOperatingTransitionNonExecutionFinalPreInputLockOutcomeCertificationItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[배포/운영 전환 비실행 별도 승인 경계] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.operatingDbRuntimeWorkerQueueAdapterFinalPreInputLockOutcomeCertificationItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[운영 DB/Runtime/Worker/Queue/Adapter 별도 승인 경계] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostSeparateApprovalBoundaryItems = mapItems(
    finalPreInputLockOutcomeCertificationView.apiSecretUiActionPostFinalPreInputLockOutcomeCertificationItems,
    'API_SECRET_UI_ACTION_POST_SEPARATE_APPROVAL_BOUNDARY',
    'Separate Approval Boundary',
    '[API/Secret/UI Action/POST 별도 승인 경계] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const actualInputSeparateApprovalBoundaryItems = [
    ...userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItems,
    ...userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItems,
    ...userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItems,
    ...userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItems,
    ...userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItems,
    ...userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItems,
    ...userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItems,
    ...userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItems,
    ...explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItems,
    ...explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItems,
    ...finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItems,
    ...deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItems,
    ...operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItems,
    ...apiSecretUiActionPostSeparateApprovalBoundaryItems,
  ];

  const readyActualInputSeparateApprovalBoundaryItems =
    actualInputSeparateApprovalBoundaryItems.filter((item) => item.isReady);
  const partialReadyActualInputSeparateApprovalBoundaryItems =
    actualInputSeparateApprovalBoundaryItems.filter((item) => item.isPartialReady);
  const blockedActualInputSeparateApprovalBoundaryItems =
    actualInputSeparateApprovalBoundaryItems.filter((item) => item.isBlocked);
  const notStartedActualInputSeparateApprovalBoundaryItems =
    actualInputSeparateApprovalBoundaryItems.filter((item) => item.isNotStarted);

  return {
    taskId: 403,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Actual Input Separate Approval Boundary',
    sourceUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus:
      finalPreInputLockOutcomeCertificationView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseFinalPreInputLockOutcomeCertificationStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhraseActualInputSeparateApprovalBoundaryStatus:
      actualInputSeparateApprovalBoundaryStatus,
    recommendedActualInputSeparateApprovalBoundaryDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_ONLY',
    recommendedActualInputSeparateApprovalBoundaryDecisionLabel:
      '최종 승인 제출 User Approval Phrase Actual Input Separate Approval Boundary - read-only 실제 입력 별도 승인 경계 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_OUTCOME_CERTIFICATION',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'USER_APPROVAL_PHRASE_ACTUAL_INPUT_SEPARATE_APPROVAL_BOUNDARY_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 User Approval Phrase Actual Input Separate Approval Boundary 화면입니다. 실제 승인 문구 입력은 이후 별도 승인 단계에서만 가능하며, 이번 화면은 read-only 별도 승인 경계 안내만 제공하고 실제 승인 문구 입력창 추가/입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: finalPreInputLockOutcomeCertificationView.userApprovalPhraseExample,
    actualInputSeparateApprovalBoundaryItems,
    userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItems,
    userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItems,
    userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItems,
    userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItems,
    userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItems,
    userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItems,
    userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItems,
    userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItems,
    explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItems,
    explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItems,
    finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItems,
    deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItems,
    operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItems,
    apiSecretUiActionPostSeparateApprovalBoundaryItems,
    actualInputSeparateApprovalBoundarySummaryCards: [
      { label: 'User Approval Phrase Actual Input Separate Approval Boundary 그룹', value: 14 },
      { label: 'Ready', value: readyActualInputSeparateApprovalBoundaryItems.length },
      { label: 'Blocked', value: blockedActualInputSeparateApprovalBoundaryItems.length },
      { label: 'Total', value: actualInputSeparateApprovalBoundaryItems.length },
    ],
    readyActualInputSeparateApprovalBoundaryItems,
    partialReadyActualInputSeparateApprovalBoundaryItems,
    blockedActualInputSeparateApprovalBoundaryItems,
    notStartedActualInputSeparateApprovalBoundaryItems,
    userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItemCount:
      userApprovalPhraseActualInputSeparateApprovalBoundaryReadinessItems.length,
    userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItemCount:
      userApprovalPhraseFinalPreInputLockOutcomeCertificationReferenceSeparateApprovalBoundaryItems.length,
    userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItemCount:
      userApprovalPhraseActualInputRequiresSeparateApprovalBoundaryItems.length,
    userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItemCount:
      userApprovalPhraseExampleDisplaySeparateApprovalBoundaryItems.length,
    userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItemCount:
      userApprovalPhraseInputUiNonAdditionSeparateApprovalBoundaryItems.length,
    userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItemCount:
      userApprovalPhraseActualInputNonExecutionSeparateApprovalBoundaryItems.length,
    userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItemCount:
      userApprovalPhraseSubmissionNonExecutionSeparateApprovalBoundaryItems.length,
    userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItemCount:
      userApprovalAcceptanceNonGrantSeparateApprovalBoundaryItems.length,
    explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItemCount:
      explicitApprovalRequestCreationNonExecutionSeparateApprovalBoundaryItems.length,
    explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItemCount:
      explicitApprovalRequestSubmissionNonExecutionSeparateApprovalBoundaryItems.length,
    finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItemCount:
      finalApprovalSubmissionNonExecutionSeparateApprovalBoundaryItems.length,
    deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItemCount:
      deploymentOperatingTransitionNonExecutionSeparateApprovalBoundaryItems.length,
    operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItemCount:
      operatingDbRuntimeWorkerQueueAdapterSeparateApprovalBoundaryItems.length,
    apiSecretUiActionPostSeparateApprovalBoundaryItemCount:
      apiSecretUiActionPostSeparateApprovalBoundaryItems.length,
    readyItemCount: readyActualInputSeparateApprovalBoundaryItems.length,
    partialReadyItemCount: partialReadyActualInputSeparateApprovalBoundaryItems.length,
    blockedItemCount: blockedActualInputSeparateApprovalBoundaryItems.length,
    notStartedItemCount: notStartedActualInputSeparateApprovalBoundaryItems.length,
    totalActualInputSeparateApprovalBoundaryItemCount:
      actualInputSeparateApprovalBoundaryItems.length,
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
    actualUserApprovalPhraseLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseExplicitInputBoundarySubmitted: false,
    actualUserApprovalPhraseExplicitInputBoundaryOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseFinalPreInputLockReviewSubmitted: false,
    actualUserApprovalPhraseFinalPreInputLockOutcomeCertificationSubmitted: false,
    actualUserApprovalPhraseActualInputSeparateApprovalBoundarySubmitted: false,
    actualUserApprovalPhraseActualInputSeparateApprovalGranted: false,
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
