import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView } from './tms-read-only-operating-deployment-final-approval-submission-boundary-review-view.service';
import { type TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView } from './tms-read-only-operating-deployment-final-approval-candidate-outcome-certification-view.service';

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView', () => {
  const createMockInput = (
    status: TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView['operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus'],
  ): TmsReadOnlyOperatingDeploymentFinalApprovalCandidateOutcomeCertificationView =>
    ({
      operatingDeploymentFinalApprovalCandidateOutcomeCertificationStatus: status,
      outcomeCertifiedGoNoGoDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      outcomeCertifiedGoNoGoDecisionLabel: 'Go 결정 후보 - read-only 검토 전용',
      outcomeCertifiedFinalApprovalCandidateDecision: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
      outcomeCertifiedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용',
      sourceCandidateCertifiedGoNoGoDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      sourceRecommendedFinalApprovalCandidateDecision: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
      outcomeCertificationItems: [
        {
          certificationItemId: 'item-1',
          category: 'FINAL_APPROVAL_CANDIDATE_READINESS_OUTCOME',
          label: 'Test Label',
          description: 'Test Desc',
          sourceTaskId: 360,
          sourceStatus: 'STATUS',
          outcomeCertificationStatus: 'CERTIFIED_READY',
          sourceCertifiedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
          sourceRecommendedCandidateDecision: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
          requiresSeparateApproval: true,
        },
      ],
    }) as any;

  it('maps CERTIFIED_READY to READY', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_READY');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView({
      operatingDeploymentFinalApprovalCandidateOutcomeCertification: input,
    });
    assert.strictEqual(result.operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY');
  });

  it('maps CERTIFIED_PARTIAL_READY to PARTIAL_READY', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_PARTIAL_READY');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView({
      operatingDeploymentFinalApprovalCandidateOutcomeCertification: input,
    });
    assert.strictEqual(result.operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY');
  });

  it('maps OUTCOME_BLOCKED to BLOCKED', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_BLOCKED');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView({
      operatingDeploymentFinalApprovalCandidateOutcomeCertification: input,
    });
    assert.strictEqual(result.operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED');
  });

  it('maps OUTCOME_NOT_STARTED to NOT_STARTED', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_NOT_STARTED');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView({
      operatingDeploymentFinalApprovalCandidateOutcomeCertification: input,
    });
    assert.strictEqual(result.operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED');
  });

  it('propagates required values correctly', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_CANDIDATE_OUTCOME_CERTIFIED_READY');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView({
      operatingDeploymentFinalApprovalCandidateOutcomeCertification: input,
    });

    assert.strictEqual(result.submissionBoundaryCertifiedGoNoGoDecision, 'GO_CANDIDATE_REVIEW_ONLY');
    assert.strictEqual(result.submissionBoundaryCertifiedGoNoGoDecisionLabel, 'Go 결정 후보 - read-only 검토 전용');
    assert.strictEqual(result.submissionBoundaryCertifiedFinalApprovalCandidateDecision, 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY');
    assert.strictEqual(result.submissionBoundaryCertifiedFinalApprovalCandidateDecisionLabel, '최종 승인 후보 - read-only 검토 전용');
    
    assert.strictEqual(result.recommendedFinalApprovalSubmissionDecision, 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY');
    assert.strictEqual(result.recommendedFinalApprovalSubmissionDecisionLabel, '최종 승인 제출 경계 - read-only 검토 전용');
    assert.strictEqual(result.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFICATION');
    assert.strictEqual(result.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    assert.strictEqual(result.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    assert.strictEqual(result.recommendedDeploymentMode, 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY');
    assert.strictEqual(result.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');

    assert.strictEqual(result.finalApprovalSubmissionBoundaryReviewStarted, true);
    assert.strictEqual(result.finalApprovalSubmissionBoundaryStillReadOnly, true);
    assert.strictEqual(result.finalApprovalSubmissionStillNotPerformed, true);
    assert.strictEqual(result.actualFinalApprovalGranted, false);
    assert.strictEqual(result.actualFinalApprovalCandidateSaved, false);
    assert.strictEqual(result.actualFinalApprovalSubmissionPerformed, false);
    assert.strictEqual(result.actualFinalApprovalPacketSubmitted, false);
    assert.strictEqual(result.actualDeploymentApprovalGranted, false);
    assert.strictEqual(result.actualDeploymentStarted, false);
    assert.strictEqual(result.actualGoDecisionGranted, false);
    assert.strictEqual(result.actualNoGoDecisionGranted, false);
    assert.strictEqual(result.actualGoNoGoDecisionSaved, false);
    assert.strictEqual(result.actualVpsServerCreated, false);
    assert.strictEqual(result.actualDomainConnected, false);
    assert.strictEqual(result.dnsChanged, false);
    assert.strictEqual(result.sslCertificateIssued, false);
    assert.strictEqual(result.runtimeConfigured, false);
    assert.strictEqual(result.workerStarted, false);
    assert.strictEqual(result.queueEnqueued, false);
    assert.strictEqual(result.adapterConnected, false);
    assert.strictEqual(result.operatingDbConnectionChanged, false);
    assert.strictEqual(result.databaseUrlChanged, false);
    assert.strictEqual(result.envFileReadOrModified, false);
    assert.strictEqual(result.dbWritePerformed, false);
    assert.strictEqual(result.naverApiCalled, false);
    assert.strictEqual(result.productLookupApiRecalled, false);
    assert.strictEqual(result.productUpdateApiCalled, false);
    assert.strictEqual(result.executionButtonAdded, false);
    assert.strictEqual(result.submitActionAdded, false);
    assert.strictEqual(result.postApiAdded, false);
    assert.strictEqual(result.priceChanged, false);
    assert.strictEqual(result.stockChanged, false);
    assert.strictEqual(result.tokenOrAuthValueExposed, false);
    assert.strictEqual(result.rawApiResponseExposedOrStored, false);
    assert.ok(result.nextTaskApprovalPhrase.includes('Task 362에서 TMS read-only 운영 배포 최종 승인 제출 경계 결과 인증 화면 구현을 승인합니다'));

    assert.ok(result.finalApprovalSubmissionBoundaryItems.length > 0);
    
    assert.strictEqual(Array.isArray(result.submissionReadinessBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.candidateCertificationBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.finalApprovalSubmissionLockItems), true);
    assert.strictEqual(Array.isArray(result.finalApprovalGrantBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.approvalPacketSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.deploymentApprovalBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.deploymentExecutionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.infrastructureSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.domainDnsHttpsSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.operatingDbSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.runtimeWorkerQueueAdapterSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.apiAndSecretSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.uiActionSubmissionBoundaryItems), true);
    assert.strictEqual(Array.isArray(result.finalSubmissionRequirementItems), true);
  });
});
