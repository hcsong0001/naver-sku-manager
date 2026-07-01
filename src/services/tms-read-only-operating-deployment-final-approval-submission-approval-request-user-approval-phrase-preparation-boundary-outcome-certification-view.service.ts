import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-user-approval-phrase-preparation-boundary-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationCategory =
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_READINESS'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_REQUIRED_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_NON_INPUT_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_PHRASE_NON_SUBMISSION_OUTCOME_CERTIFICATION'
  | 'USER_APPROVAL_ACCEPTANCE_NON_GRANT_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItemStatus =
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED'
  | 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourcePreparationBoundaryItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationCategory;
  label: string;
  description: string;
  sourcePreparationBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView {
  taskId: 396;
  taskName: string;
  sourceUserApprovalPhrasePreparationBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 User Approval Phrase Preparation Boundary 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  userApprovalPhraseGuidance: '이번 화면은 사용자 승인 문구 준비 경계 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.';
  userApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhraseRequiredOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhraseExampleDisplayOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhraseNonInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhraseNonSubmissionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalAcceptanceNonGrantOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  finalApprovalGrantNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  deploymentOperatingTransitionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  apiSecretUiActionPostOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[];
  userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItemCount: number;
  userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItemCount: number;
  userApprovalPhraseRequiredOutcomeCertificationItemCount: number;
  userApprovalPhraseExampleDisplayOutcomeCertificationItemCount: number;
  userApprovalPhraseNonInputOutcomeCertificationItemCount: number;
  userApprovalPhraseNonSubmissionOutcomeCertificationItemCount: number;
  userApprovalAcceptanceNonGrantOutcomeCertificationItemCount: number;
  explicitApprovalRequestCreationNonExecutionOutcomeCertificationItemCount: number;
  explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItemCount: number;
  finalApprovalSubmissionNonExecutionOutcomeCertificationItemCount: number;
  finalApprovalGrantNonExecutionOutcomeCertificationItemCount: number;
  deploymentOperatingTransitionNonExecutionOutcomeCertificationItemCount: number;
  operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItemCount: number;
  apiSecretUiActionPostOutcomeCertificationItemCount: number;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItemStatus {
  if (item.isReady) return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) {
    return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY';
  }
  if (item.isBlocked) return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED';
  return 'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);
    return {
      outcomeCertificationItemId: `user-approval-phrase-preparation-boundary-outcome-certification-${item.preparationBoundaryItemId}-${category.toLowerCase()}`,
      sourcePreparationBoundaryItemId: item.preparationBoundaryItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourcePreparationBoundaryStatus: item.preparationBoundaryStatus,
      outcomeCertificationStatus,
      isReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus ===
        'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView(
  preparationBoundaryView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      preparationBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus
    ];

  const userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems = mapItems(
    preparationBoundaryView.userApprovalPhrasePreparationBoundaryReadinessItems,
    'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[사용자 승인 문구 준비 경계 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems = mapItems(
    preparationBoundaryView.submissionLockOutcomeCertificationReferencePreparationBoundaryItems,
    'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 준비 경계 참조 결과 인증] Task 395 준비 경계 결과를 read-only로 인증합니다.'
  );
  const userApprovalPhraseRequiredOutcomeCertificationItems = mapItems(
    preparationBoundaryView.userApprovalPhraseRequiredPreparationBoundaryItems,
    'USER_APPROVAL_PHRASE_REQUIRED_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 필요 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 필요하며 이번 화면은 결과 인증만 제공합니다.'
  );
  const userApprovalPhraseExampleDisplayOutcomeCertificationItems = mapItems(
    preparationBoundaryView.userApprovalPhraseExampleDisplayPreparationBoundaryItems,
    'USER_APPROVAL_PHRASE_EXAMPLE_DISPLAY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 예시 표시 결과 인증] 승인 문구 예시는 read-only 안내와 결과 인증만 제공하며 입력창을 만들지 않습니다.'
  );
  const userApprovalPhraseNonInputOutcomeCertificationItems = mapItems(
    preparationBoundaryView.userApprovalPhraseNonInputPreparationBoundaryItems,
    'USER_APPROVAL_PHRASE_NON_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 비입력 결과 인증] 이번 화면에서는 승인 문구 입력창이 없습니다.'
  );
  const userApprovalPhraseNonSubmissionOutcomeCertificationItems = mapItems(
    preparationBoundaryView.userApprovalPhraseNonSubmissionPreparationBoundaryItems,
    'USER_APPROVAL_PHRASE_NON_SUBMISSION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 문구 비제출 결과 인증] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const userApprovalAcceptanceNonGrantOutcomeCertificationItems = mapItems(
    preparationBoundaryView.userApprovalAcceptanceNonGrantPreparationBoundaryItems,
    'USER_APPROVAL_ACCEPTANCE_NON_GRANT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[사용자 승인 수락 비부여 결과 인증] 이번 화면에서는 승인 문구 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems = mapItems(
    preparationBoundaryView.explicitApprovalRequestCreationNonExecutionPreparationBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 생성 비실행 결과 인증] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    preparationBoundaryView.explicitApprovalRequestSubmissionNonExecutionPreparationBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 비실행 결과 인증] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    preparationBoundaryView.finalApprovalSubmissionNonExecutionPreparationBoundaryItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 비실행 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionOutcomeCertificationItems = mapItems(
    preparationBoundaryView.finalApprovalGrantNonExecutionPreparationBoundaryItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 비실행 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionOutcomeCertificationItems = mapItems(
    preparationBoundaryView.deploymentOperatingTransitionNonExecutionPreparationBoundaryItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포/운영 전환 비실행 결과 인증] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems = mapItems(
    preparationBoundaryView.operatingDbRuntimeWorkerQueueAdapterPreparationBoundaryItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 DB/Runtime/Worker/Queue/Adapter 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostOutcomeCertificationItems = mapItems(
    preparationBoundaryView.apiSecretUiActionPostPreparationBoundaryItems,
    'API_SECRET_UI_ACTION_POST_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems,
    ...userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems,
    ...userApprovalPhraseRequiredOutcomeCertificationItems,
    ...userApprovalPhraseExampleDisplayOutcomeCertificationItems,
    ...userApprovalPhraseNonInputOutcomeCertificationItems,
    ...userApprovalPhraseNonSubmissionOutcomeCertificationItems,
    ...userApprovalAcceptanceNonGrantOutcomeCertificationItems,
    ...explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems,
    ...explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems,
    ...finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    ...finalApprovalGrantNonExecutionOutcomeCertificationItems,
    ...deploymentOperatingTransitionNonExecutionOutcomeCertificationItems,
    ...operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems,
    ...apiSecretUiActionPostOutcomeCertificationItems,
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
    taskId: 396,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request User Approval Phrase Preparation Boundary Outcome Certification',
    sourceUserApprovalPhrasePreparationBoundaryStatus:
      preparationBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestUserApprovalPhrasePreparationBoundaryOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 User Approval Phrase Preparation Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_USER_APPROVAL_PHRASE_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'USER_APPROVAL_PHRASE_PREPARATION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    userApprovalPhraseGuidance:
      '이번 화면은 사용자 승인 문구 준비 경계 결과 인증 화면입니다. 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며, 이번 화면은 read-only 결과 인증만 제공하고 실제 승인 문구 입력/제출/수락 또는 승인 요청 생성/제출을 수행하지 않습니다.',
    userApprovalPhraseExample: preparationBoundaryView.userApprovalPhraseExample,
    outcomeCertificationItems,
    userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems,
    userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems,
    userApprovalPhraseRequiredOutcomeCertificationItems,
    userApprovalPhraseExampleDisplayOutcomeCertificationItems,
    userApprovalPhraseNonInputOutcomeCertificationItems,
    userApprovalPhraseNonSubmissionOutcomeCertificationItems,
    userApprovalAcceptanceNonGrantOutcomeCertificationItems,
    explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems,
    explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    finalApprovalGrantNonExecutionOutcomeCertificationItems,
    deploymentOperatingTransitionNonExecutionOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems,
    apiSecretUiActionPostOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      { label: 'User Approval Phrase Preparation Boundary Outcome Certification 그룹', value: 14 },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItemCount:
      userApprovalPhrasePreparationBoundaryOutcomeCertificationReadinessItems.length,
    userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItemCount:
      userApprovalPhrasePreparationBoundaryReferenceOutcomeCertificationItems.length,
    userApprovalPhraseRequiredOutcomeCertificationItemCount:
      userApprovalPhraseRequiredOutcomeCertificationItems.length,
    userApprovalPhraseExampleDisplayOutcomeCertificationItemCount:
      userApprovalPhraseExampleDisplayOutcomeCertificationItems.length,
    userApprovalPhraseNonInputOutcomeCertificationItemCount:
      userApprovalPhraseNonInputOutcomeCertificationItems.length,
    userApprovalPhraseNonSubmissionOutcomeCertificationItemCount:
      userApprovalPhraseNonSubmissionOutcomeCertificationItems.length,
    userApprovalAcceptanceNonGrantOutcomeCertificationItemCount:
      userApprovalAcceptanceNonGrantOutcomeCertificationItems.length,
    explicitApprovalRequestCreationNonExecutionOutcomeCertificationItemCount:
      explicitApprovalRequestCreationNonExecutionOutcomeCertificationItems.length,
    explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionNonExecutionOutcomeCertificationItems.length,
    finalApprovalSubmissionNonExecutionOutcomeCertificationItemCount:
      finalApprovalSubmissionNonExecutionOutcomeCertificationItems.length,
    finalApprovalGrantNonExecutionOutcomeCertificationItemCount:
      finalApprovalGrantNonExecutionOutcomeCertificationItems.length,
    deploymentOperatingTransitionNonExecutionOutcomeCertificationItemCount:
      deploymentOperatingTransitionNonExecutionOutcomeCertificationItems.length,
    operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItemCount:
      operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems.length,
    apiSecretUiActionPostOutcomeCertificationItemCount:
      apiSecretUiActionPostOutcomeCertificationItems.length,
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
