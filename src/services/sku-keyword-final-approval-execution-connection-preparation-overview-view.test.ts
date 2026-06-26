import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionPreparationOverviewView } from './sku-keyword-final-approval-execution-connection-preparation-overview-view.service';

test('ExecutionConnectionPreparationOverviewView Service (Task 151)', async (t) => {
  await t.test('should build ExecutionConnectionPreparationOverview view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionPreparationOverviewView();

    assert.ok(result.title.includes('Execution Connection Preparation Overview'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL CLOSURE FINAL STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('Execution Connection Layer'));
    assert.ok(result.taskRangeLabel.includes('Task 41~150 read-only 흐름'));
    assert.ok(result.previousExecutionReadinessWorkerAuditClosureLabel.includes('Task 150'));
    assert.strictEqual(result.previousExecutionReadinessWorkerAuditClosureCommit, '41cb5cc');

    assert.strictEqual(result.executionConnectionLayerOverviewItems.length, 3);
    assert.ok(result.executionConnectionLayerOverviewItems.some((item) => item.connectionState === 'CONNECTION_LAYER_OVERVIEW_DEFINED'));

    assert.strictEqual(result.referenceSourceItems.length, 5);
    assert.ok(result.referenceSourceItems.some((item) => item.connectionState.startsWith('REFERENCE_DECISION_')));
    assert.ok(result.referenceSourceItems.some((item) => item.connectionState.startsWith('REFERENCE_RECORDING_')));
    assert.ok(result.referenceSourceItems.some((item) => item.connectionState.startsWith('REFERENCE_GUARD_')));
    assert.ok(result.referenceSourceItems.some((item) => item.connectionState.startsWith('REFERENCE_AUDIT_')));
    assert.ok(result.referenceSourceItems.some((item) => item.connectionState.startsWith('REFERENCE_EVIDENCE_')));

    assert.strictEqual(result.workerConnectionPreparationItems.length, 3);
    assert.ok(result.workerConnectionPreparationItems.some((item) => item.connectionState === 'WORKER_CONNECTION_EXECUTION_BLOCKED'));

    assert.strictEqual(result.queueConnectionPreparationItems.length, 3);
    assert.ok(result.queueConnectionPreparationItems.some((item) => item.connectionState === 'QUEUE_CONNECTION_ENQUEUE_BLOCKED'));

    assert.strictEqual(result.adapterConnectionPreparationItems.length, 3);
    assert.ok(result.adapterConnectionPreparationItems.some((item) => item.connectionState === 'ADAPTER_CONNECTION_EXTERNAL_CALL_BLOCKED'));

    assert.strictEqual(result.runtimeEnvironmentPreparationItems.length, 3);
    assert.ok(result.runtimeEnvironmentPreparationItems.some((item) => item.connectionState === 'RUNTIME_ENVIRONMENT_DB_CHANGE_BLOCKED'));

    assert.strictEqual(result.disconnectedComponentItems.length, 4);
    assert.ok(result.disconnectedComponentItems.some((item) => item.connectionState === 'DISCONNECTED_ADAPTER_COMPONENTS'));

    assert.strictEqual(result.blockedUntilSeparateApprovalItems.length, 4);
    assert.ok(result.blockedUntilSeparateApprovalItems.some((item) => item.connectionState === 'BLOCKED_UNTIL_APPROVAL_DB_CHANGE'));

    assert.strictEqual(result.misunderstandingPreventionItems.length, 4);
    assert.ok(result.misunderstandingPreventionItems.some((item) => item.connectionState === 'NO_POST_DBWRITE_OR_EXTERNAL_CALL'));

    assert.ok(result.finalNotice.includes('execution connection preparation overview View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~151'));
  });
});
