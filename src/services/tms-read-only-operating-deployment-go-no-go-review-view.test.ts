import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView,
  NEXT_TASK_352_APPROVAL_PHRASE,
  type TmsReadOnlyOperatingDeploymentGoNoGoReviewView,
} from './tms-read-only-operating-deployment-go-no-go-review-view.service';
import type { TmsReadOnlyOperatingDeploymentDesignReviewView } from './tms-read-only-operating-deployment-design-review-view.service';
import type { TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView } from './tms-read-only-domain-dns-https-connection-plan-review-view.service';
import type { TmsReadOnlyOperatingDbBackupRollbackPlanReviewView } from './tms-read-only-operating-db-backup-rollback-plan-review-view.service';
import type { TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView } from './tms-read-only-runtime-worker-queue-adapter-operating-connection-plan-review-view.service';
import type { TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView } from './tms-read-only-operating-deployment-pre-execution-final-readiness-review-view.service';
import type { TmsReadOnlyOperatingDeploymentApprovalPacketReviewView } from './tms-read-only-operating-deployment-approval-packet-review-view.service';
import type { TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView } from './tms-read-only-operating-deployment-approval-packet-outcome-certification-view.service';
import type { TmsReadOnlyOperatingDeploymentSafetyLockReviewView } from './tms-read-only-operating-deployment-safety-lock-review-view.service';
import type { TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView } from './tms-read-only-operating-deployment-safety-lock-outcome-certification-view.service';

function make342View(s: TmsReadOnlyOperatingDeploymentDesignReviewView['operatingDeploymentDesignReviewStatus']): TmsReadOnlyOperatingDeploymentDesignReviewView {
  return { operatingDeploymentDesignReviewStatus: s } as unknown as TmsReadOnlyOperatingDeploymentDesignReviewView;
}
function make343View(s: TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView['domainDnsHttpsConnectionPlanReviewStatus']): TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView {
  return { domainDnsHttpsConnectionPlanReviewStatus: s } as unknown as TmsReadOnlyDomainDnsHttpsConnectionPlanReviewView;
}
function make344View(s: TmsReadOnlyOperatingDbBackupRollbackPlanReviewView['operatingDbBackupRollbackPlanReviewStatus']): TmsReadOnlyOperatingDbBackupRollbackPlanReviewView {
  return { operatingDbBackupRollbackPlanReviewStatus: s } as unknown as TmsReadOnlyOperatingDbBackupRollbackPlanReviewView;
}
function make345View(s: TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView['runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus']): TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView {
  return { runtimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus: s } as unknown as TmsReadOnlyRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewView;
}
function make346View(s: TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView['operatingDeploymentPreExecutionFinalReadinessReviewStatus']): TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView {
  return { operatingDeploymentPreExecutionFinalReadinessReviewStatus: s } as unknown as TmsReadOnlyOperatingDeploymentPreExecutionFinalReadinessReviewView;
}
function make347View(s: TmsReadOnlyOperatingDeploymentApprovalPacketReviewView['operatingDeploymentApprovalPacketReviewStatus']): TmsReadOnlyOperatingDeploymentApprovalPacketReviewView {
  return { operatingDeploymentApprovalPacketReviewStatus: s } as unknown as TmsReadOnlyOperatingDeploymentApprovalPacketReviewView;
}
function make348View(s: TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView['operatingDeploymentApprovalPacketOutcomeCertificationStatus']): TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView {
  return { operatingDeploymentApprovalPacketOutcomeCertificationStatus: s } as unknown as TmsReadOnlyOperatingDeploymentApprovalPacketOutcomeCertificationView;
}
function make349View(s: TmsReadOnlyOperatingDeploymentSafetyLockReviewView['operatingDeploymentSafetyLockReviewStatus']): TmsReadOnlyOperatingDeploymentSafetyLockReviewView {
  return { operatingDeploymentSafetyLockReviewStatus: s } as unknown as TmsReadOnlyOperatingDeploymentSafetyLockReviewView;
}
function make350View(s: TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView['operatingDeploymentSafetyLockOutcomeCertificationStatus']): TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView {
  return { operatingDeploymentSafetyLockOutcomeCertificationStatus: s } as unknown as TmsReadOnlyOperatingDeploymentSafetyLockOutcomeCertificationView;
}

function buildAllReady(): TmsReadOnlyOperatingDeploymentGoNoGoReviewView {
  return buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
    operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
    domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
    operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
    runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'),
    operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'),
    operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'),
    operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'),
    operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'),
    operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY'),
  });
}

function buildAllBlocked(): TmsReadOnlyOperatingDeploymentGoNoGoReviewView {
  return buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
    operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED'),
    domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_BLOCKED'),
    operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_BLOCKED'),
    runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_BLOCKED'),
    operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_BLOCKED'),
    operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_BLOCKED'),
    operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_BLOCKED'),
    operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_BLOCKED'),
    operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_BLOCKED'),
  });
}

function buildAllNotStarted(): TmsReadOnlyOperatingDeploymentGoNoGoReviewView {
  return buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
    operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_NOT_STARTED'),
    domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED'),
    operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_NOT_STARTED'),
    runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_NOT_STARTED'),
    operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_NOT_STARTED'),
    operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_NOT_STARTED'),
    operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_NOT_STARTED'),
    operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_NOT_STARTED'),
    operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_NOT_STARTED'),
  });
}

function buildAllPartialReady(): TmsReadOnlyOperatingDeploymentGoNoGoReviewView {
  return buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
    operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_PARTIAL_READY'),
    domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY'),
    operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_PARTIAL_READY'),
    runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_PARTIAL_READY'),
    operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_PARTIAL_READY'),
    operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_PARTIAL_READY'),
    operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_PARTIAL_READY'),
    operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_PARTIAL_READY'),
    operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_PARTIAL_READY'),
  });
}

let viewReady: TmsReadOnlyOperatingDeploymentGoNoGoReviewView;
let viewBlocked: TmsReadOnlyOperatingDeploymentGoNoGoReviewView;
let viewNotStarted: TmsReadOnlyOperatingDeploymentGoNoGoReviewView;
let viewPartialReady: TmsReadOnlyOperatingDeploymentGoNoGoReviewView;

describe('buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView', () => {
  before(() => {
    viewReady = buildAllReady();
    viewBlocked = buildAllBlocked();
    viewNotStarted = buildAllNotStarted();
    viewPartialReady = buildAllPartialReady();
  });

  describe('status field', () => {
    it('status는 TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_VIEW 고정', () => {
      assert.equal(viewReady.status, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_VIEW');
    });
    it('taskId는 351', () => {
      assert.equal(viewReady.taskId, 351);
    });
    it('currentTaskNumber는 351', () => {
      assert.equal(viewReady.currentTaskNumber, 351);
    });
    it('isBatchJobResultDisplayOnly는 true', () => {
      assert.equal(viewReady.isBatchJobResultDisplayOnly, true);
    });
    it('taskName이 정의됨', () => {
      assert.ok(viewReady.taskName.length > 0);
    });
    it('panelTitle이 정의됨', () => {
      assert.ok(viewReady.panelTitle.length > 0);
    });
    it('description이 정의됨', () => {
      assert.ok(viewReady.description.length > 0);
    });
  });

  describe('우선순위 로직 - BLOCKED 최우선', () => {
    it('9개 소스 중 1개만 BLOCKED이면 전체 BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
        operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED'),
        domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
        operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
        runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'),
        operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'),
        operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'),
        operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'),
        operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'),
        operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(view.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED');
    });
    it('BLOCKED + NOT_STARTED 혼재 → BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
        operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_BLOCKED'),
        domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED'),
        operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
        runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'),
        operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'),
        operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'),
        operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'),
        operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'),
        operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(view.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED');
    });
    it('NOT_STARTED만 있으면 NOT_STARTED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
        operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
        domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_NOT_STARTED'),
        operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
        runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'),
        operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'),
        operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'),
        operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'),
        operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'),
        operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(view.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED');
    });
    it('PARTIAL_READY만 있으면 PARTIAL_READY', () => {
      const view = buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
        operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
        domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_PARTIAL_READY'),
        operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
        runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'),
        operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'),
        operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'),
        operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'),
        operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'),
        operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY'),
      });
      assert.equal(view.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY');
    });
    it('전체 READY면 READY', () => {
      assert.equal(viewReady.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_READY');
    });
    it('전체 BLOCKED면 BLOCKED', () => {
      assert.equal(viewBlocked.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED');
    });
    it('전체 NOT_STARTED면 NOT_STARTED', () => {
      assert.equal(viewNotStarted.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_NOT_STARTED');
    });
    it('전체 PARTIAL_READY면 PARTIAL_READY', () => {
      assert.equal(viewPartialReady.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_PARTIAL_READY');
    });
    it('Task 350 BLOCKED 하나만으로 전체 BLOCKED', () => {
      const view = buildTmsReadOnlyOperatingDeploymentGoNoGoReviewView({
        operatingDeploymentDesignReview: make342View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY'),
        domainDnsHttpsConnectionPlanReview: make343View('TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY'),
        operatingDbBackupRollbackPlanReview: make344View('TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY'),
        runtimeWorkerQueueAdapterOperatingConnectionPlanReview: make345View('TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY'),
        operatingDeploymentPreExecutionFinalReadinessReview: make346View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY'),
        operatingDeploymentApprovalPacketReview: make347View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY'),
        operatingDeploymentApprovalPacketOutcomeCertification: make348View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY'),
        operatingDeploymentSafetyLockReview: make349View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY'),
        operatingDeploymentSafetyLockOutcomeCertification: make350View('TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_BLOCKED'),
      });
      assert.equal(view.operatingDeploymentGoNoGoReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_GO_NO_GO_REVIEW_BLOCKED');
    });
  });

  describe('Boolean 상태 플래그', () => {
    it('READY: goNoGoReviewReady=true, 나머지 false', () => {
      assert.equal(viewReady.goNoGoReviewReady, true);
      assert.equal(viewReady.goNoGoReviewPartialReady, false);
      assert.equal(viewReady.goNoGoReviewBlocked, false);
      assert.equal(viewReady.goNoGoReviewNotStarted, false);
    });
    it('BLOCKED: goNoGoReviewBlocked=true, 나머지 false', () => {
      assert.equal(viewBlocked.goNoGoReviewBlocked, true);
      assert.equal(viewBlocked.goNoGoReviewReady, false);
      assert.equal(viewBlocked.goNoGoReviewPartialReady, false);
      assert.equal(viewBlocked.goNoGoReviewNotStarted, false);
    });
    it('NOT_STARTED: goNoGoReviewNotStarted=true, 나머지 false', () => {
      assert.equal(viewNotStarted.goNoGoReviewNotStarted, true);
      assert.equal(viewNotStarted.goNoGoReviewReady, false);
      assert.equal(viewNotStarted.goNoGoReviewPartialReady, false);
      assert.equal(viewNotStarted.goNoGoReviewBlocked, false);
    });
    it('PARTIAL_READY: goNoGoReviewPartialReady=true, 나머지 false', () => {
      assert.equal(viewPartialReady.goNoGoReviewPartialReady, true);
      assert.equal(viewPartialReady.goNoGoReviewReady, false);
      assert.equal(viewPartialReady.goNoGoReviewBlocked, false);
      assert.equal(viewPartialReady.goNoGoReviewNotStarted, false);
    });
  });

  describe('추천 결정 (recommendedGoNoGoDecision)', () => {
    it('READY → GO_CANDIDATE_REVIEW_ONLY', () => {
      assert.equal(viewReady.recommendedGoNoGoDecision, 'GO_CANDIDATE_REVIEW_ONLY');
    });
    it('PARTIAL_READY → HOLD_CANDIDATE_REVIEW_ONLY', () => {
      assert.equal(viewPartialReady.recommendedGoNoGoDecision, 'HOLD_CANDIDATE_REVIEW_ONLY');
    });
    it('BLOCKED → NO_GO_CANDIDATE_REVIEW_ONLY', () => {
      assert.equal(viewBlocked.recommendedGoNoGoDecision, 'NO_GO_CANDIDATE_REVIEW_ONLY');
    });
    it('NOT_STARTED → NOT_READY_CANDIDATE_REVIEW_ONLY', () => {
      assert.equal(viewNotStarted.recommendedGoNoGoDecision, 'NOT_READY_CANDIDATE_REVIEW_ONLY');
    });
    it('recommendedGoNoGoDecisionLabel이 빈 문자열이 아님', () => {
      assert.ok(viewReady.recommendedGoNoGoDecisionLabel.length > 0);
      assert.ok(viewBlocked.recommendedGoNoGoDecisionLabel.length > 0);
    });
  });

  describe('소스 상태 필드 보존', () => {
    it('sourceOperatingDeploymentDesignReviewStatus 보존', () => {
      assert.equal(viewReady.sourceOperatingDeploymentDesignReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_DESIGN_REVIEW_READY');
    });
    it('sourceDomainDnsHttpsConnectionPlanReviewStatus 보존', () => {
      assert.equal(viewReady.sourceDomainDnsHttpsConnectionPlanReviewStatus, 'TMS_READ_ONLY_DOMAIN_DNS_HTTPS_CONNECTION_PLAN_REVIEW_READY');
    });
    it('sourceOperatingDbBackupRollbackPlanReviewStatus 보존', () => {
      assert.equal(viewReady.sourceOperatingDbBackupRollbackPlanReviewStatus, 'TMS_READ_ONLY_OPERATING_DB_BACKUP_ROLLBACK_PLAN_REVIEW_READY');
    });
    it('sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus 보존', () => {
      assert.equal(viewReady.sourceRuntimeWorkerQueueAdapterOperatingConnectionPlanReviewStatus, 'TMS_READ_ONLY_RUNTIME_WORKER_QUEUE_ADAPTER_OPERATING_CONNECTION_PLAN_REVIEW_READY');
    });
    it('sourcePreExecutionFinalReadinessReviewStatus 보존', () => {
      assert.equal(viewReady.sourcePreExecutionFinalReadinessReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_PRE_EXECUTION_FINAL_READINESS_REVIEW_READY');
    });
    it('sourceApprovalPacketReviewStatus 보존', () => {
      assert.equal(viewReady.sourceApprovalPacketReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_REVIEW_READY');
    });
    it('sourceApprovalPacketOutcomeCertificationStatus 보존', () => {
      assert.equal(viewReady.sourceApprovalPacketOutcomeCertificationStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_APPROVAL_PACKET_OUTCOME_CERTIFIED_READY');
    });
    it('sourceSafetyLockReviewStatus 보존', () => {
      assert.equal(viewReady.sourceSafetyLockReviewStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_REVIEW_READY');
    });
    it('sourceSafetyLockOutcomeCertificationStatus 보존', () => {
      assert.equal(viewReady.sourceSafetyLockOutcomeCertificationStatus, 'TMS_READ_ONLY_OPERATING_DEPLOYMENT_SAFETY_LOCK_OUTCOME_CERTIFIED_READY');
    });
  });

  describe('아이템 그룹 카운트', () => {
    it('operatingDesignGoNoGoItems = 4개', () => {
      assert.equal(viewReady.operatingDesignGoNoGoItemCount, 4);
    });
    it('domainDnsHttpsGoNoGoItems = 4개', () => {
      assert.equal(viewReady.domainDnsHttpsGoNoGoItemCount, 4);
    });
    it('operatingDbBackupRollbackGoNoGoItems = 4개', () => {
      assert.equal(viewReady.operatingDbBackupRollbackGoNoGoItemCount, 4);
    });
    it('runtimeWorkerQueueAdapterGoNoGoItems = 5개', () => {
      assert.equal(viewReady.runtimeWorkerQueueAdapterGoNoGoItemCount, 5);
    });
    it('readinessGoNoGoItems = 4개', () => {
      assert.equal(viewReady.readinessGoNoGoItemCount, 4);
    });
    it('approvalPacketGoNoGoItems = 4개', () => {
      assert.equal(viewReady.approvalPacketGoNoGoItemCount, 4);
    });
    it('safetyLockGoNoGoItems = 4개', () => {
      assert.equal(viewReady.safetyLockGoNoGoItemCount, 4);
    });
    it('finalDecisionRequirementItems = 5개', () => {
      assert.equal(viewReady.finalDecisionRequirementItemCount, 5);
    });
    it('totalGoNoGoItemCount = 34개 (4+4+4+5+4+4+4+5)', () => {
      assert.equal(viewReady.totalGoNoGoItemCount, 34);
    });
    it('goNoGoReviewItems length = totalGoNoGoItemCount', () => {
      assert.equal(viewReady.goNoGoReviewItems.length, viewReady.totalGoNoGoItemCount);
    });
  });

  describe('readyItemCount / blockedItemCount 검증', () => {
    it('모두 READY일 때 readyItemCount가 양수', () => {
      assert.ok(viewReady.readyItemCount > 0);
    });
    it('일부 BLOCKED 소스가 있으면 blockedItemCount가 양수', () => {
      assert.ok(viewBlocked.blockedItemCount > 0);
    });
    it('readyItemCount + partialReadyItemCount + blockedItemCount + notStartedItemCount = totalGoNoGoItemCount', () => {
      const sum = viewReady.readyItemCount + viewReady.partialReadyItemCount + viewReady.blockedItemCount + viewReady.notStartedItemCount;
      assert.equal(sum, viewReady.totalGoNoGoItemCount);
    });
    it('BLOCKED 시 blockedItemCount + readyItemCount + partialReadyItemCount + notStartedItemCount = total', () => {
      const sum = viewBlocked.readyItemCount + viewBlocked.partialReadyItemCount + viewBlocked.blockedItemCount + viewBlocked.notStartedItemCount;
      assert.equal(sum, viewBlocked.totalGoNoGoItemCount);
    });
  });

  describe('아이템 isReadOnly / actualChangePerformed', () => {
    it('모든 아이템 isReadOnly = true', () => {
      assert.ok(viewReady.goNoGoReviewItems.every((i) => i.isReadOnly === true));
    });
    it('모든 아이템 actualChangePerformed = false', () => {
      assert.ok(viewReady.goNoGoReviewItems.every((i) => i.actualChangePerformed === false));
    });
    it('모든 아이템 actualDecisionSaved = false', () => {
      assert.ok(viewReady.goNoGoReviewItems.every((i) => i.actualDecisionSaved === false));
    });
  });

  describe('고정 true 플래그', () => {
    it('goNoGoReviewStarted = true', () => {
      assert.equal(viewReady.goNoGoReviewStarted, true);
    });
    it('goNoGoReviewStillReadOnly = true', () => {
      assert.equal(viewReady.goNoGoReviewStillReadOnly, true);
    });
    it('isReadOnlyOperatingDeploymentGoNoGoReview = true', () => {
      assert.equal(viewReady.isReadOnlyOperatingDeploymentGoNoGoReview, true);
    });
    it('requiresSeparateTask352Approval = true', () => {
      assert.equal(viewReady.requiresSeparateTask352Approval, true);
    });
  });

  describe('고정 false 플래그 (실제 실행 없음)', () => {
    it('actualGoDecisionGranted = false', () => {
      assert.equal(viewReady.actualGoDecisionGranted, false);
    });
    it('actualNoGoDecisionGranted = false', () => {
      assert.equal(viewReady.actualNoGoDecisionGranted, false);
    });
    it('actualGoNoGoDecisionSaved = false', () => {
      assert.equal(viewReady.actualGoNoGoDecisionSaved, false);
    });
    it('actualDeploymentStarted = false', () => {
      assert.equal(viewReady.actualDeploymentStarted, false);
    });
    it('actualVpsServerCreated = false', () => {
      assert.equal(viewReady.actualVpsServerCreated, false);
    });
    it('dnsChanged = false', () => {
      assert.equal(viewReady.dnsChanged, false);
    });
    it('sslCertificateIssued = false', () => {
      assert.equal(viewReady.sslCertificateIssued, false);
    });
    it('runtimeConfigured = false', () => {
      assert.equal(viewReady.runtimeConfigured, false);
    });
    it('workerStarted = false', () => {
      assert.equal(viewReady.workerStarted, false);
    });
    it('queueEnqueued = false', () => {
      assert.equal(viewReady.queueEnqueued, false);
    });
    it('naverApiCalled = false', () => {
      assert.equal(viewReady.naverApiCalled, false);
    });
    it('dbWritePerformed = false', () => {
      assert.equal(viewReady.dbWritePerformed, false);
    });
    it('envFileReadOrModified = false', () => {
      assert.equal(viewReady.envFileReadOrModified, false);
    });
    it('executionButtonAdded = false', () => {
      assert.equal(viewReady.executionButtonAdded, false);
    });
    it('submitActionAdded = false', () => {
      assert.equal(viewReady.submitActionAdded, false);
    });
    it('postApiAdded = false', () => {
      assert.equal(viewReady.postApiAdded, false);
    });
    it('tokenOrAuthValueExposed = false', () => {
      assert.equal(viewReady.tokenOrAuthValueExposed, false);
    });
    it('rawApiResponseExposedOrStored = false', () => {
      assert.equal(viewReady.rawApiResponseExposedOrStored, false);
    });
  });

  describe('고정 still-blocked true 플래그', () => {
    it('goNoGoDecisionStillReadOnly = true', () => {
      assert.equal(viewReady.goNoGoDecisionStillReadOnly, true);
    });
    it('goDecisionStillBlocked = true', () => {
      assert.equal(viewReady.goDecisionStillBlocked, true);
    });
    it('noGoDecisionStillBlocked = true', () => {
      assert.equal(viewReady.noGoDecisionStillBlocked, true);
    });
    it('deploymentExecutionStillBlocked = true', () => {
      assert.equal(viewReady.deploymentExecutionStillBlocked, true);
    });
    it('vpsServerCreationStillBlocked = true', () => {
      assert.equal(viewReady.vpsServerCreationStillBlocked, true);
    });
    it('dnsChangeStillBlocked = true', () => {
      assert.equal(viewReady.dnsChangeStillBlocked, true);
    });
    it('sslIssueStillBlocked = true', () => {
      assert.equal(viewReady.sslIssueStillBlocked, true);
    });
    it('workerExecutionStillBlocked = true', () => {
      assert.equal(viewReady.workerExecutionStillBlocked, true);
    });
    it('queueEnqueueStillBlocked = true', () => {
      assert.equal(viewReady.queueEnqueueStillBlocked, true);
    });
    it('apiCallStillBlocked = true', () => {
      assert.equal(viewReady.apiCallStillBlocked, true);
    });
    it('dbWriteStillBlocked = true', () => {
      assert.equal(viewReady.dbWriteStillBlocked, true);
    });
    it('uiExecutionActionStillBlocked = true', () => {
      assert.equal(viewReady.uiExecutionActionStillBlocked, true);
    });
    it('tokenOrAuthStillHidden = true', () => {
      assert.equal(viewReady.tokenOrAuthStillHidden, true);
    });
    it('rawApiResponseStillHidden = true', () => {
      assert.equal(viewReady.rawApiResponseStillHidden, true);
    });
  });

  describe('추천 모드 필드', () => {
    it('recommendedNextStep = OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFICATION', () => {
      assert.equal(viewReady.recommendedNextStep, 'OPERATING_DEPLOYMENT_GO_NO_GO_OUTCOME_CERTIFICATION');
    });
    it('recommendedApprovalMode = SEPARATE_USER_APPROVAL_REQUIRED', () => {
      assert.equal(viewReady.recommendedApprovalMode, 'SEPARATE_USER_APPROVAL_REQUIRED');
    });
    it('recommendedExecutionMode = EXECUTION_STILL_BLOCKED', () => {
      assert.equal(viewReady.recommendedExecutionMode, 'EXECUTION_STILL_BLOCKED');
    });
    it('recommendedDeploymentMode = GO_NO_GO_REVIEW_ONLY', () => {
      assert.equal(viewReady.recommendedDeploymentMode, 'GO_NO_GO_REVIEW_ONLY');
    });
    it('recommendedSafetyMode = SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL', () => {
      assert.equal(viewReady.recommendedSafetyMode, 'SAFETY_LOCKED_UNTIL_EXPLICIT_APPROVAL');
    });
  });

  describe('nextTaskApprovalPhrase / NEXT_TASK_352_APPROVAL_PHRASE', () => {
    it('nextTaskApprovalPhrase가 빈 문자열이 아님', () => {
      assert.ok(viewReady.nextTaskApprovalPhrase.length > 0);
    });
    it('nextTaskApprovalPhrase에 Task 352 포함', () => {
      assert.ok(viewReady.nextTaskApprovalPhrase.includes('352'));
    });
    it('NEXT_TASK_352_APPROVAL_PHRASE가 export됨', () => {
      assert.ok(NEXT_TASK_352_APPROVAL_PHRASE.length > 0);
    });
    it('nextTaskApprovalPhrase = NEXT_TASK_352_APPROVAL_PHRASE', () => {
      assert.equal(viewReady.nextTaskApprovalPhrase, NEXT_TASK_352_APPROVAL_PHRASE);
    });
  });

  describe('goNoGoSummaryCards', () => {
    it('summaryCards가 배열임', () => {
      assert.ok(Array.isArray(viewReady.goNoGoSummaryCards));
    });
    it('summaryCards 최소 1개 이상', () => {
      assert.ok(viewReady.goNoGoSummaryCards.length >= 1);
    });
    it('각 card에 label, value, tone 필드 있음', () => {
      for (const card of viewReady.goNoGoSummaryCards) {
        assert.ok(card.label.length > 0);
        assert.ok(card.value.length > 0);
        assert.ok(['positive', 'neutral', 'warning'].includes(card.tone));
      }
    });
  });

  describe('아이템 goNoGoItemId 유일성', () => {
    it('모든 goNoGoItemId가 유니크', () => {
      const ids = viewReady.goNoGoReviewItems.map((i) => i.goNoGoItemId);
      const unique = new Set(ids);
      assert.equal(unique.size, ids.length);
    });
  });

  describe('readyGoNoGoItems / blockedGoNoGoItems 배열 일관성', () => {
    it('readyGoNoGoItems length = readyItemCount', () => {
      assert.equal(viewReady.readyGoNoGoItems.length, viewReady.readyItemCount);
    });
    it('partialReadyGoNoGoItems length = partialReadyItemCount', () => {
      assert.equal(viewReady.partialReadyGoNoGoItems.length, viewReady.partialReadyItemCount);
    });
    it('blockedGoNoGoItems length = blockedItemCount', () => {
      assert.equal(viewBlocked.blockedGoNoGoItems.length, viewBlocked.blockedItemCount);
    });
    it('notStartedGoNoGoItems length = notStartedItemCount', () => {
      assert.equal(viewNotStarted.notStartedGoNoGoItems.length, viewNotStarted.notStartedItemCount);
    });
  });

  describe('BLOCKED 뷰의 추천 결정 일관성', () => {
    it('BLOCKED 뷰 recommendedGoNoGoDecision = NO_GO_CANDIDATE_REVIEW_ONLY', () => {
      assert.equal(viewBlocked.recommendedGoNoGoDecision, 'NO_GO_CANDIDATE_REVIEW_ONLY');
    });
  });

  describe('BLOCKED 상태에서도 고정 true/false 플래그 유지', () => {
    it('BLOCKED 시 goNoGoReviewStarted = true', () => {
      assert.equal(viewBlocked.goNoGoReviewStarted, true);
    });
    it('BLOCKED 시 actualGoDecisionGranted = false', () => {
      assert.equal(viewBlocked.actualGoDecisionGranted, false);
    });
    it('BLOCKED 시 actualDeploymentStarted = false', () => {
      assert.equal(viewBlocked.actualDeploymentStarted, false);
    });
    it('BLOCKED 시 isReadOnlyOperatingDeploymentGoNoGoReview = true', () => {
      assert.equal(viewBlocked.isReadOnlyOperatingDeploymentGoNoGoReview, true);
    });
  });
});
