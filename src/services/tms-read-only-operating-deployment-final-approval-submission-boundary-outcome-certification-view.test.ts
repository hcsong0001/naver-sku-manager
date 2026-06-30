import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView } from './tms-read-only-operating-deployment-final-approval-submission-boundary-outcome-certification-view.service';
import { type TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView } from './tms-read-only-operating-deployment-final-approval-submission-boundary-review-view.service';

describe('buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView', () => {
  const NEXT_TASK_363_APPROVAL_PHRASE =
    'Task 363에서 TMS read-only 운영 배포 최종 승인 제출 패킷 검토 화면 구현을 승인합니다. 이 단계는 실제 최종 승인이나 실제 배포 실행이 아니라, Task 362 운영 배포 최종 승인 제출 경계 결과 인증 이후 실제 최종 승인 제출 전에 필요한 제출 패킷을 read-only로 검토하는 화면 단계입니다. Token 재발급·Naver API 호출·상품 조회 API 재호출·상품 수정·가격 변경·재고 변경·DB write·Worker 실행·Queue enqueue·Adapter 연결·Runtime 구성·실제 배포 실행·도메인 연결 작업·DNS 변경·SSL 인증서 발급·운영 DB 연결 변경은 절대 수행하지 마세요. Token/Auth/Signature/Authorization 값과 raw API response는 출력하지 마세요.';

  const createMockInput = (
    status: TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView['operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus'],
  ): TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryReviewView =>
    ({
      operatingDeploymentFinalApprovalSubmissionBoundaryReviewStatus: status,
      submissionBoundaryCertifiedGoNoGoDecision: 'GO_CANDIDATE_REVIEW_ONLY',
      submissionBoundaryCertifiedGoNoGoDecisionLabel: 'Go 결정 후보 - read-only 검토 전용',
      submissionBoundaryCertifiedFinalApprovalCandidateDecision: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
      submissionBoundaryCertifiedFinalApprovalCandidateDecisionLabel: '최종 승인 후보 - read-only 검토 전용',
      recommendedFinalApprovalSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
      recommendedFinalApprovalSubmissionDecisionLabel: '최종 승인 제출 경계 - read-only 검토 전용',
      submissionReadinessBoundaryItems: [
        {
          submissionBoundaryItemId: 'item-1',
          category: 'FINAL_APPROVAL_SUBMISSION_READINESS_BOUNDARY',
          label: 'Test Label',
          description: 'Test Desc',
          sourceTaskId: 361,
          sourceStatus: 'STATUS',
          submissionBoundaryReviewStatus: 'READY',
          sourceCertifiedDecision: 'GO_CANDIDATE_REVIEW_ONLY',
          sourceCertifiedFinalApprovalCandidateDecision: 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY',
          sourceRecommendedFinalApprovalSubmissionDecision: 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
          requiresSeparateApproval: true,
        },
      ],
      candidateCertificationBoundaryItems: [],
      finalApprovalSubmissionLockItems: [],
      finalApprovalGrantBoundaryItems: [],
      approvalPacketSubmissionBoundaryItems: [],
      deploymentApprovalBoundaryItems: [],
      deploymentExecutionBoundaryItems: [],
      infrastructureSubmissionBoundaryItems: [],
      domainDnsHttpsSubmissionBoundaryItems: [],
      operatingDbSubmissionBoundaryItems: [],
      runtimeWorkerQueueAdapterSubmissionBoundaryItems: [],
      apiAndSecretSubmissionBoundaryItems: [],
      uiActionSubmissionBoundaryItems: [],
      finalSubmissionRequirementItems: [],
    }) as any;

  it('1. Task 361 READY → Task 362 CERTIFIED_READY', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView({
      operatingDeploymentFinalApprovalSubmissionBoundaryReview: input,
    });
    assert.strictEqual(
      result.operatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_READY',
    );
  });

  it('2. PARTIAL_READY → CERTIFIED_PARTIAL_READY', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_PARTIAL_READY');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView({
      operatingDeploymentFinalApprovalSubmissionBoundaryReview: input,
    });
    assert.strictEqual(
      result.operatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_CERTIFIED_PARTIAL_READY',
    );
  });

  it('3. BLOCKED → OUTCOME_BLOCKED', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_BLOCKED');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView({
      operatingDeploymentFinalApprovalSubmissionBoundaryReview: input,
    });
    assert.strictEqual(
      result.operatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_BLOCKED',
    );
  });

  it('4. NOT_STARTED → OUTCOME_NOT_STARTED', () => {
    const input = createMockInput('TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_NOT_STARTED');
    const result = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView({
      operatingDeploymentFinalApprovalSubmissionBoundaryReview: input,
    });
    assert.strictEqual(
      result.operatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationStatus,
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_OUTCOME_NOT_STARTED',
    );
  });

  const viewReady = buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionBoundaryOutcomeCertificationView({
    operatingDeploymentFinalApprovalSubmissionBoundaryReview: createMockInput(
      'TMS_READ_ONLY_OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_READY',
    ),
  });

  it('5. outcomeCertifiedGoNoGoDecision 전파 검증', () => {
    assert.strictEqual(viewReady.outcomeCertifiedGoNoGoDecision, 'GO_CANDIDATE_REVIEW_ONLY');
  });

  it('6. outcomeCertifiedGoNoGoDecisionLabel 전파 검증', () => {
    assert.strictEqual(viewReady.outcomeCertifiedGoNoGoDecisionLabel, 'Go 결정 후보 - read-only 검토 전용');
  });

  it('7. outcomeCertifiedFinalApprovalCandidateDecision 전파 검증', () => {
    assert.strictEqual(viewReady.outcomeCertifiedFinalApprovalCandidateDecision, 'FINAL_APPROVAL_CANDIDATE_REVIEW_ONLY');
  });

  it('8. outcomeCertifiedFinalApprovalCandidateDecisionLabel 전파 검증', () => {
    assert.strictEqual(
      viewReady.outcomeCertifiedFinalApprovalCandidateDecisionLabel,
      '최종 승인 후보 - read-only 검토 전용',
    );
  });

  it('9. outcomeCertifiedFinalApprovalSubmissionDecision 전파 검증', () => {
    assert.strictEqual(
      viewReady.outcomeCertifiedFinalApprovalSubmissionDecision,
      'FINAL_APPROVAL_SUBMISSION_BOUNDARY_REVIEW_ONLY',
    );
  });

  it('10. outcomeCertifiedFinalApprovalSubmissionDecisionLabel 전파 검증', () => {
    assert.strictEqual(
      viewReady.outcomeCertifiedFinalApprovalSubmissionDecisionLabel,
      '최종 승인 제출 경계 - read-only 검토 전용',
    );
  });

  it('11. 14개 outcome certification group 생성 검증', () => {
    assert.strictEqual(Array.isArray(viewReady.submissionReadinessBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.candidateCertificationBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.finalApprovalSubmissionLockOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.finalApprovalGrantBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.approvalPacketSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.deploymentApprovalBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.deploymentExecutionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.infrastructureSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.domainDnsHttpsSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.operatingDbSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.runtimeWorkerQueueAdapterSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.apiAndSecretSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.uiActionSubmissionBoundaryOutcomeCertificationItems), true);
    assert.strictEqual(Array.isArray(viewReady.finalSubmissionRequirementOutcomeCertificationItems), true);

    // Mock input has 1 item in submissionReadinessBoundaryItems
    assert.strictEqual(viewReady.submissionReadinessBoundaryOutcomeCertificationItems.length, 1);
  });

  it('12. recommendedNextStep = OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_REVIEW', () => {
    assert.strictEqual(viewReady.recommendedNextStep, 'OPERATING_DEPLOYMENT_FINAL_APPROVAL_SUBMISSION_PACKET_REVIEW');
  });

  it('13. recommendedApprovalMode = SEPARATE_USER_APPROVAL_REQUIRED', () => {
    assert.strictEqual(viewReady.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
  });

  it('14. recommendedExecutionMode = EXECUTION_STILL_BLOCKED', () => {
    assert.strictEqual(viewReady.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
  });

  it('15. recommendedDeploymentMode = FINAL_APPROVAL_SUBMISSION_BOUNDARY_CERTIFICATION_ONLY', () => {
    assert.strictEqual(viewReady.recommendedDeploymentMode, 'FINAL_APPROVAL_SUBMISSION_BOUNDARY_CERTIFICATION_ONLY');
  });

  it('16. recommendedSafetyMode = SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
    assert.strictEqual(viewReady.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
  });

  it('17. finalApprovalSubmissionBoundaryOutcomeCertified true', () => {
    assert.strictEqual(viewReady.finalApprovalSubmissionBoundaryOutcomeCertified, true);
  });

  it('18. finalApprovalSubmissionBoundaryItemsCertified true', () => {
    assert.strictEqual(viewReady.finalApprovalSubmissionBoundaryItemsCertified, true);
  });

  it('19. finalApprovalSubmissionBoundaryOutcomeCertificationStarted true', () => {
    assert.strictEqual(viewReady.finalApprovalSubmissionBoundaryOutcomeCertificationStarted, true);
  });

  it('20. finalApprovalSubmissionBoundaryOutcomeCertificationStillReadOnly true', () => {
    assert.strictEqual(viewReady.finalApprovalSubmissionBoundaryOutcomeCertificationStillReadOnly, true);
  });

  it('21. finalApprovalSubmissionStillNotPerformed true', () => {
    assert.strictEqual(viewReady.finalApprovalSubmissionStillNotPerformed, true);
  });

  it('22. actualFinalApprovalGranted false', () => {
    assert.strictEqual(viewReady.actualFinalApprovalGranted, false);
  });

  it('23. actualFinalApprovalCandidateSaved false', () => {
    assert.strictEqual(viewReady.actualFinalApprovalCandidateSaved, false);
  });

  it('24. actualFinalApprovalSubmissionPerformed false', () => {
    assert.strictEqual(viewReady.actualFinalApprovalSubmissionPerformed, false);
  });

  it('25. actualFinalApprovalPacketSubmitted false', () => {
    assert.strictEqual(viewReady.actualFinalApprovalPacketSubmitted, false);
  });

  it('26. actualDeploymentApprovalGranted false', () => {
    assert.strictEqual(viewReady.actualDeploymentApprovalGranted, false);
  });

  it('27. actualDeploymentStarted false', () => {
    assert.strictEqual(viewReady.actualDeploymentStarted, false);
  });

  it('28. actualGoDecisionGranted false', () => {
    assert.strictEqual(viewReady.actualGoDecisionGranted, false);
  });

  it('29. actualNoGoDecisionGranted false', () => {
    assert.strictEqual(viewReady.actualNoGoDecisionGranted, false);
  });

  it('30. actualGoNoGoDecisionSaved false', () => {
    assert.strictEqual(viewReady.actualGoNoGoDecisionSaved, false);
  });

  it('31. actualVpsServerCreated false', () => {
    assert.strictEqual(viewReady.actualVpsServerCreated, false);
  });

  it('32. actualDomainConnected false', () => {
    assert.strictEqual(viewReady.actualDomainConnected, false);
  });

  it('33. dnsChanged false', () => {
    assert.strictEqual(viewReady.dnsChanged, false);
  });

  it('34. sslCertificateIssued false', () => {
    assert.strictEqual(viewReady.sslCertificateIssued, false);
  });

  it('35. runtimeConfigured false', () => {
    assert.strictEqual(viewReady.runtimeConfigured, false);
  });

  it('36. workerStarted false', () => {
    assert.strictEqual(viewReady.workerStarted, false);
  });

  it('37. queueEnqueued false', () => {
    assert.strictEqual(viewReady.queueEnqueued, false);
  });

  it('38. adapterConnected false', () => {
    assert.strictEqual(viewReady.adapterConnected, false);
  });

  it('39. operatingDbConnectionChanged false', () => {
    assert.strictEqual(viewReady.operatingDbConnectionChanged, false);
  });

  it('40. databaseUrlChanged false', () => {
    assert.strictEqual(viewReady.databaseUrlChanged, false);
  });

  it('41. envFileReadOrModified false', () => {
    assert.strictEqual(viewReady.envFileReadOrModified, false);
  });

  it('42. dbWritePerformed false', () => {
    assert.strictEqual(viewReady.dbWritePerformed, false);
  });

  it('43. naverApiCalled false', () => {
    assert.strictEqual(viewReady.naverApiCalled, false);
  });

  it('44. productLookupApiRecalled false', () => {
    assert.strictEqual(viewReady.productLookupApiRecalled, false);
  });

  it('45. productUpdateApiCalled false', () => {
    assert.strictEqual(viewReady.productUpdateApiCalled, false);
  });

  it('46. executionButtonAdded false', () => {
    assert.strictEqual(viewReady.executionButtonAdded, false);
  });

  it('47. submitActionAdded false', () => {
    assert.strictEqual(viewReady.submitActionAdded, false);
  });

  it('48. postApiAdded false', () => {
    assert.strictEqual(viewReady.postApiAdded, false);
  });

  it('49. priceChanged false', () => {
    assert.strictEqual(viewReady.priceChanged, false);
  });

  it('50. stockChanged false', () => {
    assert.strictEqual(viewReady.stockChanged, false);
  });

  it('51. tokenOrAuthValueExposed false', () => {
    assert.strictEqual(viewReady.tokenOrAuthValueExposed, false);
  });

  it('52. rawApiResponseExposedOrStored false', () => {
    assert.strictEqual(viewReady.rawApiResponseExposedOrStored, false);
  });

  it('53. Task 363 승인 문구 포함', () => {
    assert.strictEqual(viewReady.nextTaskApprovalPhrase, NEXT_TASK_363_APPROVAL_PHRASE);
    assert.ok(viewReady.nextTaskApprovalPhrase.includes('Task 363'));
  });
});
