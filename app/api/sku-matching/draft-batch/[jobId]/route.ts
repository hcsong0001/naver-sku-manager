import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  evaluateFinalApprovalLivePreflightCheck,
  summarizeLivePreflightReadiness,
} from '@/src/services/sku-keyword-final-approval-execution-live-preflight-check.service';
import {
  evaluateLiveSingleTestApprovalGuard,
  summarizeLiveSingleTestApprovalReadiness,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-approval-guard.service';
import {
  evaluateExecutionEnvironmentSafetyGuard,
} from '@/src/services/sku-keyword-final-approval-execution-environment-safety-guard.service';
import {
  buildLiveSingleTestAuditHistoryItem,
} from '@/src/services/sku-keyword-final-approval-execution-live-single-test-audit-history.service';
import {
  buildLiveAdapterSkeletonDisabledResult,
} from '@/src/services/sku-keyword-final-approval-execution-naver-api-live-adapter-skeleton.service';
import { evaluateNaverApiAuthConfigSafeReader } from '@/src/services/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service';
import { createNaverApiTokenProviderDisabled } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-provider-disabled.service';
import { evaluateNaverApiTokenDryPermissionGate } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.service';
import { createNaverApiTokenProviderTestOnlySkeleton } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.service';
import { sanitizeStoredAuditRecord } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.service';
import { evaluateNaverApiTokenFirstTestSafetyBoundary } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service';
import { sanitizeStoredFinalApprovalAuditRecord } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-final-approval-audit.service';
import { evaluateNaverApiTokenFirstTestOneTimeGoTicket } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-one-time-go-ticket.service';
import { invokeNaverApiTokenFirstTestSandboxDisabled } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-sandbox-adapter-disabled.service';
import { evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-go-ticket-issue-audit-plan.service';
import { evaluateNaverApiTokenFirstTestGoTicketPersistenceDisabled } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-go-ticket-persistence-disabled.service';
import { buildNaverApiTokenFirstTestReadinessScreenView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-readiness-screen-view.service';
import { buildNaverApiTokenFirstTestFinalConfirmationGateView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-final-confirmation-gate-view.service';
import { buildNaverApiTokenFirstTestActionLockView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-action-lock-view.service';
import { buildNaverApiTokenFirstTestSafetyReviewView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-review-view.service';
import { buildNaverApiTokenFirstTestSafeNextStepGuideView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safe-next-step-guide-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalPacketView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-packet-view.service';
import { buildNaverApiTokenFirstTestApprovalEvidenceTimelineView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-evidence-timeline-view.service';
import { buildNaverApiTokenFirstTestApprovalConsoleView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-console-view.service';
import { buildNaverApiTokenFirstTestReviewHubNavigationView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-review-hub-navigation-view.service';
import { buildNaverApiTokenFirstTestReviewSectionLayoutView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-review-section-layout-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-draft-view.service';
import { buildNaverApiTokenFirstTestApprovalReadinessChecklistView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-readiness-checklist-view.service';
import { buildNaverApiTokenFirstTestApprovalDecisionSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-decision-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-boundary-view.service';
import { buildNaverApiTokenFirstTestApprovalHandoffSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-handoff-summary-view.service';
import { buildNaverApiTokenFirstTestApprovalHandoffVerificationView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-handoff-verification-view.service';
import { buildNaverApiTokenFirstTestManualApprovalChecklistAlignmentView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-checklist-alignment-view.service';
import { buildNaverApiTokenFirstTestManualApprovalFinalSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-final-seal-view.service';
import { buildNaverApiTokenFirstTestReadOnlyPhaseClosureSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-read-only-phase-closure-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-criteria-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-criteria-gap-analysis-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-matrix-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-risk-mitigation-plan-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalBlockerSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-blocker-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-packet-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-pre-submission-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-readiness-decision-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-decision-seal-view.service';
import { buildTokenFirstTestSeparateApprovalFinalClosureGateView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-closure-gate-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-closure-handoff-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-acceptance-checklist-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-acceptance-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-non-execution-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-final-hold-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-release-preconditions-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-release-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-checklist-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-final-review-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-gate-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalSummaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-summary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalBoundaryView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-boundary-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-lock-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-verification-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-audit-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseEvidenceView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-evidence-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseCertificationView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-final-hold-non-release-handoff-closure-final-status-seal-confirmation-final-review-closure-status-final-closure-final-status-final-non-release-certification-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseFinalConfirmationView } from '@/src/services/sku-keyword-final-approval-final-non-release-final-confirmation-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseReleaseGuardView } from '@/src/services/sku-keyword-final-approval-final-non-release-release-guard-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView } from '@/src/services/sku-keyword-final-approval-final-non-release-transition-readiness-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseReadinessReviewView } from '@/src/services/sku-keyword-final-approval-final-non-release-readiness-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionGateView } from '@/src/services/sku-keyword-final-approval-execution-gate-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionPreconditionsView } from '@/src/services/sku-keyword-final-approval-execution-preconditions-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView } from '@/src/services/sku-keyword-final-approval-execution-architecture-readiness-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView } from '@/src/services/sku-keyword-final-approval-execution-architecture-isolation-check-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView } from '@/src/services/sku-keyword-final-approval-execution-architecture-connection-blockers-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitecturePreConnectionChecklistView } from '@/src/services/sku-keyword-final-approval-execution-architecture-pre-connection-checklist-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalReadinessView } from '@/src/services/sku-keyword-final-approval-execution-architecture-approval-readiness-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalHoldView } from '@/src/services/sku-keyword-final-approval-execution-architecture-approval-hold-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView } from '@/src/services/sku-keyword-final-approval-execution-architecture-approval-submission-readiness-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView } from '@/src/services/sku-keyword-final-approval-execution-architecture-approval-submission-pre-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionHoldSealView } from '@/src/services/sku-keyword-final-approval-execution-architecture-approval-submission-hold-seal-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView } from '@/src/services/sku-keyword-final-approval-execution-readiness-snapshot-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-plan-preview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-risk-review-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessOverviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-overview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-contract-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueuePayloadPreviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-queue-payload-preview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView } from '@/src/services/sku-keyword-final-approval-execution-readiness-queue-enqueue-eligibility-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-queue-contract-overview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-payload-interpretation-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-input-validation-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-stop-conditions-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-decision-preview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultRecordingPreviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-result-recording-preview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultPersistenceGuardView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-result-persistence-guard-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditLogPreviewView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-audit-log-preview-view.service';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditEvidenceBundleView } from '@/src/services/sku-keyword-final-approval-execution-readiness-worker-audit-evidence-bundle-view.service';

// Compute safe DB environment hint from DATABASE_URL without exposing the original value.
// Returns a classification key, never the actual URL.
function getDatabaseUrlSafeHint(): string | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('localhost') || lower.includes('127.0.0.1') || lower.includes('::1')) return 'local_host';
  if (lower.includes('test') || lower.includes('dev') || lower.includes('staging')) return 'test_or_dev';
  if (lower.includes('prod') || lower.includes('production') || lower.includes('operating') || lower.includes('live')) return 'possible_prod';
  return 'unknown_host';
}

function getRedisUrlSafeHint(): string | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('localhost') || lower.includes('127.0.0.1')) return 'local_host';
  if (lower.includes('test') || lower.includes('dev') || lower.includes('staging')) return 'test_or_dev';
  if (lower.includes('prod') || lower.includes('production') || lower.includes('operating')) return 'possible_prod';
  return 'unknown_host';
}

function extractSafeMetadata(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  if (typeof m.executionMode === 'string') out.executionMode = m.executionMode;
  if (typeof m.actorId === 'string') out.actorId = m.actorId;
  if (typeof m.durationMs === 'number') out.durationMs = m.durationMs;
  if (typeof m.startedAt === 'string') out.startedAt = m.startedAt;
  if (typeof m.endedAt === 'string') out.endedAt = m.endedAt;
  if (typeof m.finalApprovalId === 'string') out.finalApprovalId = m.finalApprovalId;
  if (typeof m.recordedAt === 'string') out.recordedAt = m.recordedAt;
  if (m.resultSummary && typeof m.resultSummary === 'object' && !Array.isArray(m.resultSummary)) {
    const rs = m.resultSummary as Record<string, unknown>;
    out.resultSummary = {
      successCount: typeof rs.successCount === 'number' ? rs.successCount : 0,
      failedCount: typeof rs.failedCount === 'number' ? rs.failedCount : 0,
      skippedCount: typeof rs.skippedCount === 'number' ? rs.skippedCount : 0,
    };
  }
  return Object.keys(out).length > 0 ? out : null;
}

function extractSafeAuditRecord(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  if (typeof m.auditCode === 'string') out.auditCode = m.auditCode;
  if (typeof m.auditStatus === 'string') out.auditStatus = m.auditStatus;
  if (typeof m.auditMessage === 'string') out.auditMessage = m.auditMessage;
  if (typeof m.finalApprovalId === 'string') out.finalApprovalId = m.finalApprovalId;
  if (typeof m.batchJobId === 'string') out.batchJobId = m.batchJobId;
  if (typeof m.actorId === 'string') out.actorId = m.actorId;
  if (typeof m.recordedAt === 'string') out.recordedAt = m.recordedAt;
  if (typeof m.maxAllowedState === 'string') out.maxAllowedState = m.maxAllowedState;
  out.naverApiCallAllowed = false;
  out.liveExecutionEnabled = false;
  if (Array.isArray(m.acknowledgedItems)) {
    out.acknowledgedItems = m.acknowledgedItems.filter((x): x is string => typeof x === 'string');
  }
  if (Array.isArray(m.missingAcknowledgements)) {
    out.missingAcknowledgements = m.missingAcknowledgements.filter((x): x is string => typeof x === 'string');
  }
  if (Array.isArray(m.warnings)) {
    out.warnings = m.warnings.filter((x): x is string => typeof x === 'string');
  }

  // Safe target product summary (explicit safe fields only, no secrets)
  if (m.targetProductSummary && typeof m.targetProductSummary === 'object' && !Array.isArray(m.targetProductSummary)) {
    const tps = m.targetProductSummary as Record<string, unknown>;
    out.targetProductSummary = {
      itemId: typeof tps.itemId === 'string' ? tps.itemId : null,
      targetType: typeof tps.targetType === 'string' ? tps.targetType : null,
      targetId: typeof tps.targetId === 'string' ? tps.targetId : null,
      channelProductNo: typeof tps.channelProductNo === 'string' ? tps.channelProductNo : null,
      productName: typeof tps.productName === 'string' ? tps.productName : null,
      skuCode: typeof tps.skuCode === 'string' ? tps.skuCode : null,
      changeType: typeof tps.changeType === 'string' ? tps.changeType : null,
    };
  }

  // Safe payload summary (only changeType + riskLevel)
  if (m.safePayloadSummary && typeof m.safePayloadSummary === 'object' && !Array.isArray(m.safePayloadSummary)) {
    const sps = m.safePayloadSummary as Record<string, unknown>;
    out.safePayloadSummary = {
      changeType: typeof sps.changeType === 'string' ? sps.changeType : null,
      riskLevel: typeof sps.riskLevel === 'string' ? sps.riskLevel : null,
    };
  }

  return Object.keys(out).length > 0 ? out : null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;
    const job = await prisma.naverApiBatchJob.findUnique({
      where: { id: jobId },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
        finalApprovals: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!job) {
      return NextResponse.json({ ok: false, error: 'Job not found' }, { status: 404 });
    }

    const items = job.items.map(item => {
      const requestPayload = item.requestPayload as Record<string, unknown> | null;
      const candidate = requestPayload?.candidate as Record<string, unknown> | undefined;
      const dryRunItem = requestPayload?.dryRunItem as Record<string, unknown> | undefined;

      return {
        id: item.id,
        status: item.status,
        calculationType: item.calculationType ?? undefined,
        targetType: item.targetType ?? undefined,
        targetId: item.targetId ?? undefined,
        requestPayload: item.requestPayload,
        candidateSummary: candidate ? {
          sku: candidate.skuCode || candidate.channelProductNo,
          barcode: candidate.barcode,
          productName: candidate.productName,
          keyword: candidate.matchedKeyword,
          targetType: candidate.candidateType,
          changeType: dryRunItem?.changeType,
        } : undefined,
        dryRunSummary: dryRunItem ? {
          riskLevel: dryRunItem.riskLevel,
          warnings: dryRunItem.warnings,
          blockedReasons: dryRunItem.blockedReasons,
          before: dryRunItem.before,
          after: dryRunItem.after,
        } : undefined,
      };
    });

    const safeMetadata = extractSafeMetadata(job.metadata);
    const activeFinalApproval =
      (job.finalApprovals ?? []).find(a => String(a.status) === 'ACTIVE') ?? null;

    const adapterMode =
      typeof safeMetadata?.executionMode === 'string' ? safeMetadata.executionMode : null;
    const naverApiCalled = adapterMode === 'live';

    const preflightInput = {
      finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
      batchJobStatus: String(job.status),
      itemStatuses: job.items.map(item => String(item.status)),
      totalItems: job.totalItems,
      successItems: job.successItems,
      failedItems: job.failedItems,
      skippedItems: job.skippedItems,
      executedAt: job.executedAt?.toISOString() ?? null,
      executionMetadata: safeMetadata
        ? {
            executionMode:
              typeof safeMetadata.executionMode === 'string'
                ? safeMetadata.executionMode
                : null,
            actorId:
              typeof safeMetadata.actorId === 'string' ? safeMetadata.actorId : null,
          }
        : null,
      adapterMode,
      naverApiCalled,
    };

    const preflightResult = evaluateFinalApprovalLivePreflightCheck(preflightInput);
    const preflightSummary = summarizeLivePreflightReadiness(preflightResult);

    // Safe payload summary (no secrets, endpoints, or tokens)
    const firstItem = job.items[0] ?? null;
    const firstItemPayload = firstItem?.requestPayload as Record<string, unknown> | null;
    const firstCandidate = firstItemPayload?.candidate as Record<string, unknown> | undefined;
    const firstDryRunItem = firstItemPayload?.dryRunItem as Record<string, unknown> | undefined;
    const targetProductSummary = firstItem
      ? {
          itemId: firstItem.id,
          targetType: firstItem.targetType,
          targetId: firstItem.targetId,
          channelProductNo: firstItem.channelProductNo ?? null,
          productName: typeof firstCandidate?.productName === 'string'
            ? firstCandidate.productName
            : null,
          skuCode: typeof firstCandidate?.skuCode === 'string'
            ? firstCandidate.skuCode
            : null,
          changeType: typeof firstDryRunItem?.changeType === 'string'
            ? firstDryRunItem.changeType
            : null,
          priceChange: firstDryRunItem?.before && firstDryRunItem?.after
            ? {
                before: (firstDryRunItem.before as Record<string, unknown>).price ?? null,
                after: (firstDryRunItem.after as Record<string, unknown>).price ?? null,
              }
            : null,
          stockChange: firstDryRunItem?.before && firstDryRunItem?.after
            ? {
                before: (firstDryRunItem.before as Record<string, unknown>).stock ?? null,
                after: (firstDryRunItem.after as Record<string, unknown>).stock ?? null,
              }
            : null,
        }
      : null;

    const approvalGuardInput = {
      finalApprovalId: activeFinalApproval?.id ?? null,
      finalApprovalStatus: activeFinalApproval?.status
        ? String(activeFinalApproval.status)
        : null,
      batchJobId: job.id,
      batchJobStatus: String(job.status),
      itemStatuses: job.items.map(item => String(item.status)),
      totalItems: job.totalItems,
      successItems: job.successItems,
      failedItems: job.failedItems,
      executedAt: job.executedAt?.toISOString() ?? null,
      executionMetadata: safeMetadata
        ? {
            executionMode:
              typeof safeMetadata.executionMode === 'string'
                ? safeMetadata.executionMode
                : null,
            actorId:
              typeof safeMetadata.actorId === 'string' ? safeMetadata.actorId : null,
          }
        : null,
      adapterMode,
      naverApiCalled,
      livePreflightResult: {
        ready: preflightResult.ready,
        blockingReasons: preflightResult.blockingReasons,
      },
      acknowledgedItems: [], // No DB storage — acknowledgements are UI-only state
    };

    const approvalGuardResult = evaluateLiveSingleTestApprovalGuard(approvalGuardInput);
    const approvalGuardSummary = summarizeLiveSingleTestApprovalReadiness(approvalGuardResult);

    // Read audit record from metadata (written by POST /live-single-test-approval)
    const rawMetadata = job.metadata as Record<string, unknown> | null;
    const liveSingleTestApprovalAudit = extractSafeAuditRecord(
      rawMetadata?.liveSingleTestApprovalAudit
    );

    // Read token test approval audit from metadata (written by POST /naver-auth-token-test-approval)
    const naverAuthTokenTestApprovalAudit = sanitizeStoredAuditRecord(
      rawMetadata?.naverAuthTokenTestApprovalAudit
    );

    // Read final approval audit from metadata
    const naverAuthTokenFirstTestFinalApprovalAudit = sanitizeStoredFinalApprovalAuditRecord(
      rawMetadata?.naverAuthTokenFirstTestFinalApprovalAudit
    );

    // Build audit history (read-only summary from metadata)
    const auditHistory = buildLiveSingleTestAuditHistoryItem({
      batchJobId: job.id,
      metadata: job.metadata,
    });

    // Evaluate execution environment safety (safe hints only — no raw URLs or secrets exposed)
    const envSafetyResult = evaluateExecutionEnvironmentSafetyGuard({
      nodeEnv: process.env.NODE_ENV ?? null,
      appEnv: process.env.APP_ENV ?? null,
      executionMode: process.env.EXECUTION_MODE ?? null,
      adapterMode,
      databaseUrlPresent: !!process.env.DATABASE_URL,
      databaseUrlSafeHint: getDatabaseUrlSafeHint(),
      redisUrlPresent: !!process.env.REDIS_URL,
      redisUrlSafeHint: getRedisUrlSafeHint(),
      requestedAction: 'approval-audit-record-only',
    });

    // Evaluate Naver API auth config safety (existence check only — no credential values exposed)
    const naverAuthConfigSafety = evaluateNaverApiAuthConfigSafeReader({
      envLike: {
        NAVER_API_CLIENT_ID: process.env.NAVER_API_CLIENT_ID,
        NAVER_API_CLIENT_SECRET: process.env.NAVER_API_CLIENT_SECRET,
      },
      requiredConfigKeys: ['NAVER_API_CLIENT_ID', 'NAVER_API_CLIENT_SECRET'],
      allowCredentialUse: false,
      allowTokenRequest: false,
      allowEndpointCall: false,
      environmentSafetyResult: { ok: envSafetyResult.allowed },
      liveAdapterSkeletonStatus: 'disabled',
    });

    const responseJob = {
      id: job.id,
      status: job.status,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      itemCount: job.totalItems,
      successItems: job.successItems,
      failedItems: job.failedItems,
      skippedItems: job.skippedItems,
      executedAt: job.executedAt?.toISOString() ?? null,
      executionMetadata: safeMetadata,
      items,
      livePreflight: {
        ready: preflightResult.ready,
        readinessCode: preflightResult.readinessCode,
        readinessMessage: preflightResult.readinessMessage,
        checklistItems: preflightResult.checklistItems,
        blockingReasons: preflightResult.blockingReasons,
        warnings: preflightResult.warnings,
        naverApiCallAllowed: preflightResult.naverApiCallAllowed,
        naverApiCalled: preflightResult.naverApiCalled,
        summary: preflightSummary,
      },
      liveSingleTestApproval: {
        approvalReady: approvalGuardResult.approvalReady,
        approvalCode: approvalGuardResult.approvalCode,
        approvalMessage: approvalGuardResult.approvalMessage,
        checklistItems: approvalGuardResult.checklistItems,
        blockingReasons: approvalGuardResult.blockingReasons,
        warnings: approvalGuardResult.warnings,
        requiredAcknowledgements: approvalGuardResult.requiredAcknowledgements,
        acknowledgedCount: approvalGuardResult.acknowledgedCount,
        missingAcknowledgements: approvalGuardResult.missingAcknowledgements,
        naverApiCallAllowed: approvalGuardResult.naverApiCallAllowed,
        liveExecutionEnabled: approvalGuardResult.liveExecutionEnabled,
        maxAllowedState: approvalGuardResult.maxAllowedState,
        summary: approvalGuardSummary,
        targetProductSummary,
      },
      liveSingleTestApprovalAudit,
      liveSingleTestAuditHistory: {
        exists: auditHistory.exists,
        latestAudit: auditHistory.latestAudit,
        summary: auditHistory.summary,
        blockingReasons: auditHistory.blockingReasons,
        warnings: auditHistory.warnings,
        naverApiCallAllowed: false as const,
        liveExecutionEnabled: false as const,
        operatingDbWriteAllowed: false as const,
        queueAllowed: false as const,
        workerAllowed: false as const,
        sanitized: true as const,
        maxAllowedState: 'LIVE_SINGLE_TEST_AUDIT_HISTORY_READ_ONLY_READY' as const,
      },
      environmentSafety: {
        allowed: envSafetyResult.allowed,
        environmentCode: envSafetyResult.environmentCode,
        environmentMessage: envSafetyResult.environmentMessage,
        databaseEnvironment: envSafetyResult.databaseEnvironment,
        redisEnvironment: envSafetyResult.redisEnvironment,
        naverApiCallAllowed: false as const,
        operatingDbWriteAllowed: false as const,
        queueAllowed: false as const,
        workerAllowed: false as const,
        checklistItems: envSafetyResult.checklistItems,
        blockingReasons: envSafetyResult.blockingReasons,
        warnings: envSafetyResult.warnings,
        sanitized: true as const,
      },
      liveAdapterSkeletonStatus: buildLiveAdapterSkeletonDisabledResult({
        batchJobId: job.id,
        finalApprovalId: activeFinalApproval?.id ?? null,
        adapterMode,
      }),
      naverAuthConfigSafety: {
        credentialConfigured: naverAuthConfigSafety.credentialConfigured,
        authConfigUsable: naverAuthConfigSafety.authConfigUsable,
        authConfigStatus: naverAuthConfigSafety.authConfigStatus,
        clientIdStatus: naverAuthConfigSafety.clientIdStatus,
        clientSecretStatus: naverAuthConfigSafety.clientSecretStatus,
        tokenStatus: naverAuthConfigSafety.tokenStatus,
        naverApiCallAllowed: naverAuthConfigSafety.naverApiCallAllowed,
        liveExecutionEnabled: naverAuthConfigSafety.liveExecutionEnabled,
        accessTokenRequested: naverAuthConfigSafety.accessTokenRequested,
        credentialsUsed: naverAuthConfigSafety.credentialsUsed,
        tokenIssued: naverAuthConfigSafety.tokenIssued,
        authorizationHeaderCreated: naverAuthConfigSafety.authorizationHeaderCreated,
        endpointCalled: naverAuthConfigSafety.endpointCalled,
        secretVisible: naverAuthConfigSafety.secretVisible,
        sanitized: naverAuthConfigSafety.sanitized,
        checklistItems: naverAuthConfigSafety.checklistItems,
        blockingReasons: naverAuthConfigSafety.blockingReasons,
        warnings: naverAuthConfigSafety.warnings,
        maxAllowedState: naverAuthConfigSafety.maxAllowedState,
      },
      naverAuthTokenProviderStatus: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        return {
          status: tokenProvider.status,
          resultCode: tokenProvider.resultCode,
          resultMessage: tokenProvider.resultMessage,
          tokenStatus: tokenProvider.tokenStatus,
          authConfigUsable: tokenProvider.authConfigUsable,
          accessTokenRequested: tokenProvider.accessTokenRequested,
          refreshTokenRequested: tokenProvider.refreshTokenRequested,
          credentialsUsed: tokenProvider.credentialsUsed,
          tokenIssued: tokenProvider.tokenIssued,
          tokenStored: tokenProvider.tokenStored,
          authorizationHeaderCreated: tokenProvider.authorizationHeaderCreated,
          httpRequestCreated: tokenProvider.httpRequestCreated,
          endpointCalled: tokenProvider.endpointCalled,
          naverApiCallAllowed: tokenProvider.naverApiCallAllowed,
          liveExecutionEnabled: tokenProvider.liveExecutionEnabled,
          secretVisible: tokenProvider.secretVisible,
          tokenVisible: tokenProvider.tokenVisible,
          sanitized: tokenProvider.sanitized,
          checklistItems: tokenProvider.checklistItems,
          blockingReasons: tokenProvider.blockingReasons,
          warnings: tokenProvider.warnings,
          maxAllowedState: tokenProvider.maxAllowedState,
        };
      })(),
      naverAuthTokenDryPermissionGate: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const gate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        return {
          ok: gate.ok,
          allowed: gate.allowed,
          status: gate.status,
          resultCode: gate.resultCode,
          resultMessage: gate.resultMessage,
          dryCheckPassed: gate.dryCheckPassed,
          tokenRequestAllowed: gate.tokenRequestAllowed,
          tokenStatus: gate.tokenStatus,
          authConfigUsable: gate.authConfigUsable,
          naverApiCallAllowed: gate.naverApiCallAllowed,
          liveExecutionEnabled: gate.liveExecutionEnabled,
          httpRequestCreated: gate.httpRequestCreated,
          endpointCalled: gate.endpointCalled,
          accessTokenRequested: gate.accessTokenRequested,
          refreshTokenRequested: gate.refreshTokenRequested,
          credentialsUsed: gate.credentialsUsed,
          tokenIssued: gate.tokenIssued,
          tokenStored: gate.tokenStored,
          authorizationHeaderCreated: gate.authorizationHeaderCreated,
          operatingDbWriteAllowed: gate.operatingDbWriteAllowed,
          queueAllowed: gate.queueAllowed,
          workerAllowed: gate.workerAllowed,
          secretVisible: gate.secretVisible,
          tokenVisible: gate.tokenVisible,
          sanitized: gate.sanitized,
          checklistItems: gate.checklistItems,
          blockingReasons: gate.blockingReasons,
          warnings: gate.warnings,
          needsReviewReasons: gate.needsReviewReasons,
          maxAllowedState: gate.maxAllowedState,
        };
      })(),
      naverAuthTokenTestOnlySkeletonStatus: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const dryGate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const skeleton = createNaverApiTokenProviderTestOnlySkeleton({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          environmentSafetyResult: envSafetyResult,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        return {
          ok: skeleton.ok,
          success: skeleton.success,
          status: skeleton.status,
          resultCode: skeleton.resultCode,
          resultMessage: skeleton.resultMessage,
          testOnlyMode: skeleton.testOnlyMode,
          tokenRequestPrepared: skeleton.tokenRequestPrepared,
          tokenRequestExecuted: skeleton.tokenRequestExecuted,
          tokenRequestAllowed: skeleton.tokenRequestAllowed,
          tokenStatus: skeleton.tokenStatus,
          authConfigUsable: skeleton.authConfigUsable,
          dryPermissionPassed: skeleton.dryPermissionPassed,
          accessTokenRequested: skeleton.accessTokenRequested,
          refreshTokenRequested: skeleton.refreshTokenRequested,
          credentialsUsed: skeleton.credentialsUsed,
          tokenIssued: skeleton.tokenIssued,
          tokenStored: skeleton.tokenStored,
          authorizationHeaderCreated: skeleton.authorizationHeaderCreated,
          endpointResolved: skeleton.endpointResolved,
          endpointCalled: skeleton.endpointCalled,
          httpRequestCreated: skeleton.httpRequestCreated,
          httpClientCreated: skeleton.httpClientCreated,
          naverApiCallAllowed: skeleton.naverApiCallAllowed,
          liveExecutionEnabled: skeleton.liveExecutionEnabled,
          operatingDbWriteAllowed: skeleton.operatingDbWriteAllowed,
          queueAllowed: skeleton.queueAllowed,
          workerAllowed: skeleton.workerAllowed,
          secretVisible: skeleton.secretVisible,
          tokenVisible: skeleton.tokenVisible,
          endpointVisible: skeleton.endpointVisible,
          sanitized: skeleton.sanitized,
          checklistItems: skeleton.checklistItems,
          blockingReasons: skeleton.blockingReasons,
          warnings: skeleton.warnings,
          needsReviewReasons: skeleton.needsReviewReasons,
          maxAllowedState: skeleton.maxAllowedState,
        };
      })(),
      naverAuthTokenTestApprovalAudit: naverAuthTokenTestApprovalAudit
        ? {
            hasAudit: true,
            auditCode: naverAuthTokenTestApprovalAudit.auditCode,
            recordedAt: naverAuthTokenTestApprovalAudit.recordedAt,
            recordedBy: naverAuthTokenTestApprovalAudit.recordedBy,
            approvalPurpose: naverAuthTokenTestApprovalAudit.approvalPurpose,
            acknowledgedItems: naverAuthTokenTestApprovalAudit.acknowledgedItems,
            maxAllowedState: naverAuthTokenTestApprovalAudit.maxAllowedState,
            tokenRequestAllowed: naverAuthTokenTestApprovalAudit.tokenRequestAllowed,
            accessTokenRequested: naverAuthTokenTestApprovalAudit.accessTokenRequested,
            tokenIssued: naverAuthTokenTestApprovalAudit.tokenIssued,
            endpointCalled: naverAuthTokenTestApprovalAudit.endpointCalled,
            httpClientCreated: naverAuthTokenTestApprovalAudit.httpClientCreated,
            naverApiCallAllowed: naverAuthTokenTestApprovalAudit.naverApiCallAllowed,
            liveExecutionEnabled: naverAuthTokenTestApprovalAudit.liveExecutionEnabled,
            sanitized: naverAuthTokenTestApprovalAudit.sanitized,
          }
        : { hasAudit: false },
      naverAuthTokenFirstTestFinalApprovalAudit: naverAuthTokenFirstTestFinalApprovalAudit ?? null,
      // ── Token 최초 발급 테스트 Safety Boundary (read-only) ──────────────────────
      naverAuthTokenFirstTestSafetyBoundary: (() => {
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const dryGate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const skeleton = createNaverApiTokenProviderTestOnlySkeleton({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          environmentSafetyResult: envSafetyResult,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        // Token Test Approval Audit — 참조용 ref 구성 (민감 정보 없음)
        const auditRef = naverAuthTokenTestApprovalAudit
          ? {
              hasAudit: true as const,
              auditCode: naverAuthTokenTestApprovalAudit.auditCode,
              acknowledgedCount:
                Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems)
                  ? naverAuthTokenTestApprovalAudit.acknowledgedItems.length
                  : 0,
              requiredCount: 12,
              allAcknowledged:
                Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems) &&
                naverAuthTokenTestApprovalAudit.acknowledgedItems.length >= 12,
            }
          : { hasAudit: false as const };

        const boundary = evaluateNaverApiTokenFirstTestSafetyBoundary({
          environmentSafetyResult: envSafetyResult,
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          tokenTestOnlySkeletonStatus: skeleton,
          tokenTestApprovalAudit: auditRef,
          liveAdapterSkeletonStatus: 'disabled',
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          allowHttpClient: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        return {
          ok: boundary.ok,
          readyForExplicitTokenTestApproval: boundary.readyForExplicitTokenTestApproval,
          allowed: boundary.allowed,
          status: boundary.status,
          resultCode: boundary.resultCode,
          resultMessage: boundary.resultMessage,
          tokenTestApprovalPresent: boundary.tokenTestApprovalPresent,
          tokenTestApprovalComplete: boundary.tokenTestApprovalComplete,
          allPreconditionsPassed: boundary.allPreconditionsPassed,
          tokenRequestAllowed: boundary.tokenRequestAllowed,
          tokenRequestPrepared: boundary.tokenRequestPrepared,
          tokenRequestExecuted: boundary.tokenRequestExecuted,
          accessTokenRequested: boundary.accessTokenRequested,
          refreshTokenRequested: boundary.refreshTokenRequested,
          credentialsUsed: boundary.credentialsUsed,
          tokenIssued: boundary.tokenIssued,
          tokenStored: boundary.tokenStored,
          authorizationHeaderCreated: boundary.authorizationHeaderCreated,
          endpointResolved: boundary.endpointResolved,
          endpointCalled: boundary.endpointCalled,
          httpRequestCreated: boundary.httpRequestCreated,
          httpClientCreated: boundary.httpClientCreated,
          naverApiCallAllowed: boundary.naverApiCallAllowed,
          liveExecutionEnabled: boundary.liveExecutionEnabled,
          queueAllowed: boundary.queueAllowed,
          workerAllowed: boundary.workerAllowed,
          secretVisible: boundary.secretVisible,
          tokenVisible: boundary.tokenVisible,
          endpointVisible: boundary.endpointVisible,
          sanitized: boundary.sanitized,
          checklistItems: boundary.checklistItems,
          blockingReasons: boundary.blockingReasons,
          warnings: boundary.warnings,
          needsReviewReasons: boundary.needsReviewReasons,
          maxAllowedState: boundary.maxAllowedState,
        };
      })(),
      naverAuthTokenFirstTestReadinessScreen: (() => {
        // Here we recreate the boundary since it's evaluated inside the scope above
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const dryGate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const skeleton = createNaverApiTokenProviderTestOnlySkeleton({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          environmentSafetyResult: envSafetyResult,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const auditRef = naverAuthTokenTestApprovalAudit
          ? {
              hasAudit: true as const,
              auditCode: naverAuthTokenTestApprovalAudit.auditCode,
              acknowledgedCount: Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems)
                ? naverAuthTokenTestApprovalAudit.acknowledgedItems.length
                : 0,
              requiredCount: 12,
              allAcknowledged: Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems) &&
                naverAuthTokenTestApprovalAudit.acknowledgedItems.length >= 12,
            }
          : { hasAudit: false as const };

        const boundary = evaluateNaverApiTokenFirstTestSafetyBoundary({
          environmentSafetyResult: envSafetyResult,
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          tokenTestOnlySkeletonStatus: skeleton,
          tokenTestApprovalAudit: auditRef,
          liveAdapterSkeletonStatus: 'disabled',
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          allowHttpClient: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });

        const goTicketPlan = evaluateNaverApiTokenFirstTestOneTimeGoTicket({
          safetyBoundaryResult: boundary,
          liveReadinessResult: null, // Read-only dashboard does not evaluate live execution intent
          coordinatorResult: null,
        });

        const sandbox = invokeNaverApiTokenFirstTestSandboxDisabled({
          safetyBoundaryResult: boundary,
          goTicketResult: goTicketPlan,
        });

        const auditPlan = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan({
          goTicketPlanResult: goTicketPlan,
          sandboxResult: sandbox,
          acknowledgements: {
            notRealTokenIssue: false,
            oneTimeUseOnly: false,
            requiresSeparateExecutionTask: false,
            tokenRequestNotApprovedYet: false,
            productReadApiBlocked: false,
            productUpdateApiBlocked: false,
            queueExecutionBlocked: false,
            workerExecutionBlocked: false,
            tokenStorageBlocked: false,
            tokenLogBlocked: false,
            tokenUiDisplayBlocked: false,
            autoRetryBlocked: false,
            immediateTokenDiscard: false,
            requiresSeparateApprovalForNextStep: false,
          } // read-only UI doesn't have form state, so it will be blocked by default
        });

        const persistence = evaluateNaverApiTokenFirstTestGoTicketPersistenceDisabled({
          auditPlanResult: auditPlan,
          sandboxResult: sandbox,
          goTicketPlanResult: goTicketPlan,
          acknowledgements: {},
        });

        return buildNaverApiTokenFirstTestReadinessScreenView({
          safetyBoundaryResult: boundary,
          goTicketPlanResult: goTicketPlan,
          sandboxResult: sandbox,
          auditPlanResult: auditPlan,
          persistenceResult: persistence,
        });
      })(),
      naverAuthTokenFirstTestFinalConfirmationGateScreen: (() => {
        // Here we recreate the boundary since it's evaluated inside the scope above
        const tokenProvider = createNaverApiTokenProviderDisabled({
          authConfigSafety: naverAuthConfigSafety,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          environmentSafetyResult: { ok: envSafetyResult.allowed },
          liveAdapterSkeletonStatus: 'disabled',
        });
        const dryGate = evaluateNaverApiTokenDryPermissionGate({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderStatus: tokenProvider,
          environmentSafetyResult: envSafetyResult,
          liveAdapterSkeletonStatus: 'disabled',
          liveSafetyGateResult: null,
          livePreflightResult: preflightResult.ready !== undefined
            ? { ready: preflightResult.ready, blockingReasons: preflightResult.blockingReasons }
            : null,
          liveSingleTestApproval: approvalGuardResult.approvalReady !== undefined
            ? { approvalReady: approvalGuardResult.approvalReady, blockingReasons: approvalGuardResult.blockingReasons }
            : null,
          liveSingleTestApprovalAudit: liveSingleTestApprovalAudit
            ? { auditCode: typeof liveSingleTestApprovalAudit.auditCode === 'string' ? liveSingleTestApprovalAudit.auditCode : undefined }
            : null,
          liveSingleTestAuditHistory: auditHistory ? { exists: auditHistory.exists } : null,
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const skeleton = createNaverApiTokenProviderTestOnlySkeleton({
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          environmentSafetyResult: envSafetyResult,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });
        const auditRef = naverAuthTokenTestApprovalAudit
          ? {
              hasAudit: true as const,
              auditCode: naverAuthTokenTestApprovalAudit.auditCode,
              acknowledgedCount: Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems)
                ? naverAuthTokenTestApprovalAudit.acknowledgedItems.length
                : 0,
              requiredCount: 12,
              allAcknowledged: Array.isArray(naverAuthTokenTestApprovalAudit.acknowledgedItems) &&
                naverAuthTokenTestApprovalAudit.acknowledgedItems.length >= 12,
            }
          : { hasAudit: false as const };

        const boundary = evaluateNaverApiTokenFirstTestSafetyBoundary({
          environmentSafetyResult: envSafetyResult,
          authConfigSafety: naverAuthConfigSafety,
          tokenProviderDisabledStatus: tokenProvider,
          tokenDryPermissionGate: dryGate,
          tokenTestOnlySkeletonStatus: skeleton,
          tokenTestApprovalAudit: auditRef,
          liveAdapterSkeletonStatus: 'disabled',
          finalApprovalStatus: activeFinalApproval?.status ? String(activeFinalApproval.status) : null,
          batchJobStatus: String(job.status),
          itemStatuses: job.items.map(item => String(item.status)),
          itemCount: job.totalItems,
          requestedAction: 'draft-batch-detail-read',
          allowTokenRequest: false,
          allowCredentialUse: false,
          allowEndpointResolve: false,
          allowEndpointCall: false,
          allowHttpClient: false,
          actorId: typeof safeMetadata?.actorId === 'string' ? safeMetadata.actorId : null,
          finalApprovalId: activeFinalApproval?.id ?? null,
          batchJobId: job.id,
        });

        const goTicketPlan = evaluateNaverApiTokenFirstTestOneTimeGoTicket({
          safetyBoundaryResult: boundary,
          liveReadinessResult: null,
          coordinatorResult: null,
        });

        const sandbox = invokeNaverApiTokenFirstTestSandboxDisabled({
          safetyBoundaryResult: boundary,
          goTicketResult: goTicketPlan,
        });

        const auditPlan = evaluateNaverApiTokenFirstTestGoTicketIssueAuditPlan({
          goTicketPlanResult: goTicketPlan,
          sandboxResult: sandbox,
          acknowledgements: {
            notRealTokenIssue: false,
            oneTimeUseOnly: false,
            requiresSeparateExecutionTask: false,
            tokenRequestNotApprovedYet: false,
            productReadApiBlocked: false,
            productUpdateApiBlocked: false,
            queueExecutionBlocked: false,
            workerExecutionBlocked: false,
            tokenStorageBlocked: false,
            tokenLogBlocked: false,
            tokenUiDisplayBlocked: false,
            autoRetryBlocked: false,
            immediateTokenDiscard: false,
            requiresSeparateApprovalForNextStep: false,
          }
        });

        const persistence = evaluateNaverApiTokenFirstTestGoTicketPersistenceDisabled({
          auditPlanResult: auditPlan,
          sandboxResult: sandbox,
          goTicketPlanResult: goTicketPlan,
          acknowledgements: {},
        });

        const readinessView = buildNaverApiTokenFirstTestReadinessScreenView({
          safetyBoundaryResult: boundary,
          goTicketPlanResult: goTicketPlan,
          sandboxResult: sandbox,
          auditPlanResult: auditPlan,
          persistenceResult: persistence,
        });

        return buildNaverApiTokenFirstTestFinalConfirmationGateView(readinessView);
      })(),
      naverAuthTokenFirstTestActionLockScreen: (() => {
        // Evaluate everything up to FinalConfirmationGate again, but simply pass it to ActionLockView
        // In a real application, you might cache these or pass them down in a more structured way.
        // For this task, we can just call buildNaverApiTokenFirstTestActionLockView() directly with null
        // because ActionLockView currently doesn't strictly depend on FinalConfirmationGate to generate its static structure.
        return buildNaverApiTokenFirstTestActionLockView(null);
      })(),
      naverAuthTokenFirstTestSafetyReviewScreen: (() => {
        // Evaluate everything up to ActionLock again, but simply pass it to SafetyReviewView
        // In a real application, you might cache these or pass them down in a more structured way.
        // For this task, we can just call buildNaverApiTokenFirstTestSafetyReviewView() directly with null
        return buildNaverApiTokenFirstTestSafetyReviewView(null);
      })(),
      naverAuthTokenFirstTestSafeNextStepGuideScreen: (() => {
        return buildNaverApiTokenFirstTestSafeNextStepGuideView(null);
      })(),
      naverAuthTokenFirstTestSeparateApprovalPacketScreen: (() => {
        return buildNaverApiTokenFirstTestSeparateApprovalPacketView(null);
      })(),
      naverAuthTokenFirstTestApprovalEvidenceTimelineScreen: (() => {
        return buildNaverApiTokenFirstTestApprovalEvidenceTimelineView(null);
      })(),
      naverAuthTokenFirstTestApprovalConsoleScreen: (() => {
        return buildNaverApiTokenFirstTestApprovalConsoleView(null);
      })(),
      naverAuthTokenFirstTestReviewHubNavigationScreen: (() => {
        return buildNaverApiTokenFirstTestReviewHubNavigationView(null);
      })(),
      naverAuthTokenFirstTestReviewSectionLayoutScreen: (() => {
        return buildNaverApiTokenFirstTestReviewSectionLayoutView(null);
      })(),
      naverAuthTokenFirstTestSeparateApprovalRequestDraftScreen: (() => {
        return buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView(null);
      })(),
      naverAuthTokenFirstTestApprovalReadinessChecklistScreen: (() => {
        return buildNaverApiTokenFirstTestApprovalReadinessChecklistView(null);
      })(),
      naverAuthTokenFirstTestApprovalDecisionSummaryScreen: (() => {
        return buildNaverApiTokenFirstTestApprovalDecisionSummaryView(null);
      })(),
      naverAuthTokenFirstTestSeparateApprovalBoundaryScreen: (() => {
        return buildNaverApiTokenFirstTestSeparateApprovalBoundaryView(null);
      })(),
      naverAuthTokenFirstTestApprovalHandoffSummaryScreen: (() => {
        return buildNaverApiTokenFirstTestApprovalHandoffSummaryView(null);
      })(),
      naverAuthTokenFirstTestApprovalHandoffVerificationScreen: (() => {
        return buildNaverApiTokenFirstTestApprovalHandoffVerificationView(null);
      })(),
      naverAuthTokenFirstTestManualApprovalChecklistAlignmentScreen: buildNaverApiTokenFirstTestManualApprovalChecklistAlignmentView(),
      naverAuthTokenFirstTestManualApprovalFinalSealScreen: buildNaverApiTokenFirstTestManualApprovalFinalSealView(),
      naverAuthTokenFirstTestReadOnlyPhaseClosureSummaryScreen: buildNaverApiTokenFirstTestReadOnlyPhaseClosureSummaryView(),
      naverAuthTokenFirstTestSeparateApprovalCriteriaReviewScreen: buildNaverApiTokenFirstTestSeparateApprovalCriteriaReviewView(),
      naverAuthTokenFirstTestSeparateApprovalCriteriaGapAnalysisScreen: buildNaverApiTokenFirstTestSeparateApprovalCriteriaGapAnalysisView(null),
      naverAuthTokenFirstTestSeparateApprovalRiskMatrixScreen: buildNaverApiTokenFirstTestSeparateApprovalRiskMatrixView(null),
      naverAuthTokenFirstTestSeparateApprovalRiskMitigationPlanScreen: buildNaverApiTokenFirstTestSeparateApprovalRiskMitigationPlanView(null),
      naverAuthTokenFirstTestSeparateApprovalFinalBlockerSummaryScreen: buildNaverApiTokenFirstTestSeparateApprovalFinalBlockerSummaryView(null),
      naverAuthTokenFirstTestSeparateApprovalRequestPacketScreen: buildNaverApiTokenFirstTestSeparateApprovalRequestPacketView(null),
      naverAuthTokenFirstTestSeparateApprovalPreSubmissionReviewScreen: buildNaverApiTokenFirstTestSeparateApprovalPreSubmissionReviewView(null),
      naverAuthTokenFirstTestSeparateApprovalSubmissionReadinessDecisionScreen: buildNaverApiTokenFirstTestSeparateApprovalSubmissionReadinessDecisionView(null),
      naverAuthTokenFirstTestSeparateApprovalSubmissionDecisionSealScreen: buildNaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealView(null),
      tokenFirstTestSeparateApprovalFinalClosureGateView: buildTokenFirstTestSeparateApprovalFinalClosureGateView(null),
      tokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalClosureHandoffSummaryView(null),
      tokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView: buildNaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView(null),
      tokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceBoundaryView(null),
      tokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView: buildNaverApiTokenFirstTestSeparateApprovalHumanReviewNonExecutionSealView(null),
      tokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView: buildNaverApiTokenFirstTestSeparateApprovalHumanReviewFinalHoldSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleasePreconditionsReviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldReleaseBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffChecklistView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffFinalReviewSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureGateView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalSummaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalSummaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalBoundaryView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalBoundaryView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseLockView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseVerificationView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseAuditView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseEvidenceView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseEvidenceView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseCertificationView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseCertificationView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseFinalConfirmationView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseFinalConfirmationView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseReleaseGuardView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseReleaseGuardView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseTransitionReadinessView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseReadinessReviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusFinalNonReleaseReadinessReviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionGateView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionGateView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionPreconditionsView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionPreconditionsView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureReadinessReviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureIsolationCheckView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureConnectionBlockersView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitecturePreConnectionChecklistView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitecturePreConnectionChecklistView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalReadinessView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalReadinessView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalHoldView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalHoldView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionReadinessView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionPreReviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionHoldSealView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionArchitectureApprovalSubmissionHoldSealView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessSnapshotView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessPlanPreviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessRiskReviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessOverviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessOverviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerContractView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueuePayloadPreviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueuePayloadPreviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueEnqueueEligibilityView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessQueueContractOverviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerPayloadInterpretationView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerInputValidationView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerStopConditionsView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerDecisionPreviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultRecordingPreviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultRecordingPreviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultPersistenceGuardView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerResultPersistenceGuardView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditLogPreviewView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditLogPreviewView(null),
      tokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditEvidenceBundleView: buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionReadinessWorkerAuditEvidenceBundleView(null),
    };

    return NextResponse.json({ ok: true, job: responseJob });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
