import {
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItemStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus,
  type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView,
} from './tms-read-only-operating-deployment-final-approval-submission-approval-request-explicit-approval-request-submission-boundary-view.service';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus =
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED'
  | 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationCategory =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_READINESS'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_CREATION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_CREATION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'FINAL_APPROVAL_GRANT_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_OUTCOME_CERTIFICATION'
  | 'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_OUTCOME_CERTIFICATION'
  | 'API_SECRET_UI_ACTION_POST_OUTCOME_CERTIFICATION';

export type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemStatus =
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED'
  | 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED';

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem {
  outcomeCertificationItemId: string;
  sourceSubmissionBoundaryItemId: string;
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationCategory;
  label: string;
  description: string;
  sourceSubmissionBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItemStatus;
  outcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemStatus;
  isReady: boolean;
  isPartialReady: boolean;
  isBlocked: boolean;
  isNotStarted: boolean;
  isReadOnly: boolean;
  actualChangePerformed: boolean;
  requiresSeparateApproval: boolean;
}

export interface TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView {
  taskId: 392;
  taskName: string;
  sourceExplicitApprovalRequestSubmissionBoundaryStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus;
  operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus;
  recommendedOutcomeCertificationDecision: 'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedOutcomeCertificationDecisionLabel: '최종 승인 제출 Explicit Approval Request Submission Boundary 결과 인증 - read-only 인증 전용';
  recommendedNextStep: 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW';
  recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED';
  recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED';
  recommendedDeploymentMode: 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY';
  recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL';
  explicitApprovalPhraseRequired: true;
  explicitApprovalPhraseAccepted: false;
  explicitApprovalPhraseGuidance: '아래 문구는 이후 별도 승인 단계에서 사용자가 직접 입력해야 하는 예시 문구입니다. 이번 화면은 read-only Packet이며, 이 문구를 표시하는 것만으로 실제 승인 또는 제출이 발생하지 않습니다.';
  explicitApprovalPhraseExample: 'TMS 운영 배포 최종 승인 요청 제출을 별도로 승인합니다.';
  outcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalPhraseNonInputOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalPhraseNonSubmissionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalAcceptanceNonGrantOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestCreationBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  approvalRequestCreationNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  approvalRequestSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  finalApprovalSubmissionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  finalApprovalGrantNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  deploymentOperatingTransitionNonExecutionOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  apiSecretUiActionPostOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  outcomeCertificationSummaryCards: { label: string; value: number }[];
  readyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  partialReadyOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  blockedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  notStartedOutcomeCertificationItems: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[];
  explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItemCount: number;
  explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItemCount: number;
  explicitApprovalPhraseNonInputOutcomeCertificationItemCount: number;
  explicitApprovalPhraseNonSubmissionOutcomeCertificationItemCount: number;
  explicitApprovalAcceptanceNonGrantOutcomeCertificationItemCount: number;
  explicitApprovalRequestCreationBoundaryOutcomeCertificationItemCount: number;
  explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemCount: number;
  approvalRequestCreationNonExecutionOutcomeCertificationItemCount: number;
  approvalRequestSubmissionNonExecutionOutcomeCertificationItemCount: number;
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
  actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundarySubmitted: false;
  actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false;
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
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus,
  TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus
> = {
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_PARTIAL_READY:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_BLOCKED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
  TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_NOT_STARTED:
    'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
};

function toOutcomeCertificationItemStatus(
  item: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemStatus {
  if (item.isReady) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY';
  if (item.isPartialReady) {
    return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY';
  }
  if (item.isBlocked) return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED';
  return 'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED';
}

function mapItems(
  items: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryItem[],
  category: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationCategory,
  suffixLabel: string,
  descriptionPrefix: string
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationItem[] {
  return items.map((item) => {
    const outcomeCertificationStatus = toOutcomeCertificationItemStatus(item);

    return {
      outcomeCertificationItemId: `explicit-approval-request-submission-boundary-outcome-certification-${item.submissionBoundaryItemId}-${category.toLowerCase()}`,
      sourceSubmissionBoundaryItemId: item.submissionBoundaryItemId,
      category,
      label: `${item.label} ${suffixLabel}`,
      description: `${descriptionPrefix} ${item.description}`,
      sourceSubmissionBoundaryStatus: item.submissionBoundaryStatus,
      outcomeCertificationStatus,
      isReady:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
      isPartialReady:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
      isBlocked:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
      isNotStarted:
        outcomeCertificationStatus ===
        'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
      isReadOnly: true,
      actualChangePerformed: false,
      requiresSeparateApproval: true,
    };
  });
}

export function buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView(
  submissionBoundaryView: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryView
): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationView {
  const outcomeCertificationStatus =
    STATUS_MAP[
      submissionBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus
    ];

  const explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems = mapItems(
    submissionBoundaryView.explicitApprovalRequestSubmissionBoundaryReadinessItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_READINESS',
    'Outcome Certification',
    '[명시 승인 요청 제출 경계 결과 인증 준비도] read-only 결과 인증 준비 상태만 확인합니다.'
  );
  const explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems = mapItems(
    submissionBoundaryView.packetReviewOutcomeCertificationReferenceSubmissionBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_REFERENCE_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 경계 참조 결과 인증] Task 391 제출 경계 결과를 read-only로 인증합니다.'
  );
  const explicitApprovalPhraseNonInputOutcomeCertificationItems = mapItems(
    submissionBoundaryView.explicitApprovalPhraseNonInputBoundaryItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_INPUT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 문구 비입력 결과 인증] 승인 문구는 이후 별도 승인 단계에서만 입력 가능하며 이번 화면에는 입력창이 없습니다.'
  );
  const explicitApprovalPhraseNonSubmissionOutcomeCertificationItems = mapItems(
    submissionBoundaryView.explicitApprovalPhraseNonSubmissionBoundaryItems,
    'EXPLICIT_APPROVAL_PHRASE_NON_SUBMISSION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 문구 비제출 결과 인증] 이번 화면에서는 승인 문구를 제출하지 않으며 POST API도 없습니다.'
  );
  const explicitApprovalAcceptanceNonGrantOutcomeCertificationItems = mapItems(
    submissionBoundaryView.explicitApprovalAcceptanceNonGrantBoundaryItems,
    'EXPLICIT_APPROVAL_ACCEPTANCE_NON_GRANT_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 수락 비부여 결과 인증] 이번 화면에서는 승인 수락 상태를 true로 만들지 않습니다.'
  );
  const explicitApprovalRequestCreationBoundaryOutcomeCertificationItems = mapItems(
    submissionBoundaryView.explicitApprovalRequestCreationBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_CREATION_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 생성 경계 결과 인증] 이번 화면에서는 명시 승인 요청을 생성하지 않습니다.'
  );
  const explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems = mapItems(
    submissionBoundaryView.explicitApprovalRequestSubmissionBoundaryItems,
    'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[명시 승인 요청 제출 경계 결과 인증] 이번 화면에서는 명시 승인 요청을 제출하지 않습니다.'
  );
  const approvalRequestCreationNonExecutionOutcomeCertificationItems = mapItems(
    submissionBoundaryView.approvalRequestCreationNonExecutionBoundaryItems,
    'APPROVAL_REQUEST_CREATION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 생성 비실행 결과 인증] 실제 승인 요청 생성은 수행하지 않습니다.'
  );
  const approvalRequestSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    submissionBoundaryView.approvalRequestSubmissionNonExecutionBoundaryItems,
    'APPROVAL_REQUEST_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[승인 요청 제출 비실행 결과 인증] 실제 승인 요청 제출은 수행하지 않습니다.'
  );
  const finalApprovalSubmissionNonExecutionOutcomeCertificationItems = mapItems(
    submissionBoundaryView.finalApprovalSubmissionNonExecutionBoundaryItems,
    'FINAL_APPROVAL_SUBMISSION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 제출 비실행 결과 인증] 실제 최종 승인 제출은 수행하지 않습니다.'
  );
  const finalApprovalGrantNonExecutionOutcomeCertificationItems = mapItems(
    submissionBoundaryView.finalApprovalGrantNonExecutionBoundaryItems,
    'FINAL_APPROVAL_GRANT_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[최종 승인 부여 비실행 결과 인증] 실제 최종 승인 부여는 수행하지 않습니다.'
  );
  const deploymentOperatingTransitionNonExecutionOutcomeCertificationItems = mapItems(
    submissionBoundaryView.deploymentOperatingTransitionNonExecutionBoundaryItems,
    'DEPLOYMENT_OPERATING_TRANSITION_NON_EXECUTION_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[배포/운영 전환 비실행 결과 인증] 실제 배포 승인, 배포 실행, 운영 전환은 수행하지 않습니다.'
  );
  const operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems = mapItems(
    submissionBoundaryView.operatingDbRuntimeWorkerQueueAdapterBoundaryItems,
    'OPERATING_DB_RUNTIME_WORKER_QUEUE_ADAPTER_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[운영 DB/Runtime/Worker/Queue/Adapter 결과 인증] 실제 운영 DB 연결 변경, Runtime 구성, Worker 실행, Queue enqueue, Adapter 연결, 도메인 연결, DNS 변경, SSL 인증서 발급은 수행하지 않습니다.'
  );
  const apiSecretUiActionPostOutcomeCertificationItems = mapItems(
    submissionBoundaryView.apiSecretUiActionPostBoundaryItems,
    'API_SECRET_UI_ACTION_POST_OUTCOME_CERTIFICATION',
    'Outcome Certification',
    '[API/Secret/UI Action/POST 결과 인증] 실제 API 호출, Secret 노출, 버튼 추가, submit action, POST API는 수행하지 않습니다.'
  );

  const outcomeCertificationItems = [
    ...explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems,
    ...explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems,
    ...explicitApprovalPhraseNonInputOutcomeCertificationItems,
    ...explicitApprovalPhraseNonSubmissionOutcomeCertificationItems,
    ...explicitApprovalAcceptanceNonGrantOutcomeCertificationItems,
    ...explicitApprovalRequestCreationBoundaryOutcomeCertificationItems,
    ...explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems,
    ...approvalRequestCreationNonExecutionOutcomeCertificationItems,
    ...approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
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
    taskId: 392,
    taskName:
      'TMS Read-Only Operating Deployment Final Approval Submission Approval Request Explicit Approval Request Submission Boundary Outcome Certification',
    sourceExplicitApprovalRequestSubmissionBoundaryStatus:
      submissionBoundaryView.operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryStatus,
    operatingDeploymentFinalApprovalSubmissionApprovalRequestExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationStatus:
      outcomeCertificationStatus,
    recommendedOutcomeCertificationDecision:
      'FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedOutcomeCertificationDecisionLabel:
      '최종 승인 제출 Explicit Approval Request Submission Boundary 결과 인증 - read-only 인증 전용',
    recommendedNextStep:
      'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_APPROVAL_REQUEST_EXPLICIT_APPROVAL_REQUEST_SUBMISSION_LOCK_REVIEW',
    recommendedApprovalMode: 'SEPARATE_USER_APPROVAL_REQUIRED',
    recommendedExecutionMode: 'EXECUTION_STILL_BLOCKED',
    recommendedDeploymentMode:
      'EXPLICIT_APPROVAL_REQUEST_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION_ONLY',
    recommendedSafetyMode: 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL',
    explicitApprovalPhraseRequired: true,
    explicitApprovalPhraseAccepted: false,
    explicitApprovalPhraseGuidance: submissionBoundaryView.explicitApprovalPhraseGuidance,
    explicitApprovalPhraseExample: submissionBoundaryView.explicitApprovalPhraseExample,
    outcomeCertificationItems,
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems,
    explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems,
    explicitApprovalPhraseNonInputOutcomeCertificationItems,
    explicitApprovalPhraseNonSubmissionOutcomeCertificationItems,
    explicitApprovalAcceptanceNonGrantOutcomeCertificationItems,
    explicitApprovalRequestCreationBoundaryOutcomeCertificationItems,
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems,
    approvalRequestCreationNonExecutionOutcomeCertificationItems,
    approvalRequestSubmissionNonExecutionOutcomeCertificationItems,
    finalApprovalSubmissionNonExecutionOutcomeCertificationItems,
    finalApprovalGrantNonExecutionOutcomeCertificationItems,
    deploymentOperatingTransitionNonExecutionOutcomeCertificationItems,
    operatingDbRuntimeWorkerQueueAdapterOutcomeCertificationItems,
    apiSecretUiActionPostOutcomeCertificationItems,
    outcomeCertificationSummaryCards: [
      {
        label: 'Explicit Approval Request Submission Boundary Outcome Certification 그룹',
        value: 14,
      },
      { label: 'Ready', value: readyOutcomeCertificationItems.length },
      { label: 'Blocked', value: blockedOutcomeCertificationItems.length },
      { label: 'Total', value: outcomeCertificationItems.length },
    ],
    readyOutcomeCertificationItems,
    partialReadyOutcomeCertificationItems,
    blockedOutcomeCertificationItems,
    notStartedOutcomeCertificationItems,
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItemCount:
      explicitApprovalRequestSubmissionBoundaryOutcomeCertificationReadinessItems.length,
    explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionBoundaryReferenceOutcomeCertificationItems.length,
    explicitApprovalPhraseNonInputOutcomeCertificationItemCount:
      explicitApprovalPhraseNonInputOutcomeCertificationItems.length,
    explicitApprovalPhraseNonSubmissionOutcomeCertificationItemCount:
      explicitApprovalPhraseNonSubmissionOutcomeCertificationItems.length,
    explicitApprovalAcceptanceNonGrantOutcomeCertificationItemCount:
      explicitApprovalAcceptanceNonGrantOutcomeCertificationItems.length,
    explicitApprovalRequestCreationBoundaryOutcomeCertificationItemCount:
      explicitApprovalRequestCreationBoundaryOutcomeCertificationItems.length,
    explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItemCount:
      explicitApprovalRequestSubmissionBoundaryOutcomeCertificationItems.length,
    approvalRequestCreationNonExecutionOutcomeCertificationItemCount:
      approvalRequestCreationNonExecutionOutcomeCertificationItems.length,
    approvalRequestSubmissionNonExecutionOutcomeCertificationItemCount:
      approvalRequestSubmissionNonExecutionOutcomeCertificationItems.length,
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
    actualExplicitApprovalRequestPacketReviewOutcomeCertificationSubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundarySubmitted: false,
    actualExplicitApprovalRequestSubmissionBoundaryOutcomeCertificationSubmitted: false,
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
