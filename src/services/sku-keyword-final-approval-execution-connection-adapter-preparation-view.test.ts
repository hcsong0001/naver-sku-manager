import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionAdapterPreparationView } from './sku-keyword-final-approval-execution-connection-adapter-preparation-view.service';

test('ExecutionConnectionAdapterPreparationView Service (Task 154)', async (t) => {
  await t.test('should build ExecutionConnectionAdapterPreparation view successfully', () => {
    const result =
      buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionConnectionAdapterPreparationView();

    assert.ok(result.title.includes('Execution Connection Adapter Preparation'));
    assert.ok(result.statusLabel.includes('READ-ONLY FINAL CLOSURE FINAL STATUS'));
    assert.strictEqual(result.statusTone, 'blocked');
    assert.ok(result.summary.includes('Adapter 연결 준비'));
    assert.ok(result.taskRangeLabel.includes('Task 41~153 read-only 흐름'));
    assert.ok(result.previousExecutionConnectionQueuePreparationLabel.includes('Task 153'));
    assert.strictEqual(result.previousExecutionConnectionQueuePreparationCommit, '0463a5b');

    assert.strictEqual(result.adapterConnectionPreparationItems.length, 3);
    assert.ok(result.adapterConnectionPreparationItems.some((item) => item.adapterPreparationState === 'ADAPTER_CONNECTION_EXTERNAL_CALL_BLOCKED'));

    assert.strictEqual(result.liveAdapterDisconnectedItems.length, 3);
    assert.ok(result.liveAdapterDisconnectedItems.every((item) => item.adapterPreparationState.startsWith('LIVE_ADAPTER_DISCONNECTED_')));
    assert.ok(result.liveAdapterDisconnectedItems.some((item) => item.label.includes('Live Adapter 경로')));

    assert.strictEqual(result.mockDryRunAndLiveSeparationItems.length, 3);
    assert.ok(result.mockDryRunAndLiveSeparationItems.some((item) => item.adapterPreparationState === 'MOCK_DRY_RUN_ADAPTER_REFERENCE_ONLY'));
    assert.ok(result.mockDryRunAndLiveSeparationItems.some((item) => item.adapterPreparationState === 'LIVE_ADAPTER_SEPARATED_FROM_DRY_RUN'));

    assert.strictEqual(result.tokenAndNaverApiBlockedItems.length, 3);
    assert.ok(result.tokenAndNaverApiBlockedItems.some((item) => item.adapterPreparationState === 'BLOCKED_UNTIL_APPROVAL_ADAPTER_AND_API'));
    assert.ok(result.tokenAndNaverApiBlockedItems.some((item) => item.adapterPreparationState.startsWith('TOKEN_CONNECTION_BLOCKED_')));
    assert.ok(result.tokenAndNaverApiBlockedItems.some((item) => item.adapterPreparationState.startsWith('NAVER_API_CONNECTION_BLOCKED_')));

    assert.strictEqual(result.preConnectionWorkerQueueAdapterRelationItems.length, 3);
    assert.ok(result.preConnectionWorkerQueueAdapterRelationItems.some((item) => item.adapterPreparationState.startsWith('PRE_CONNECTION_WORKER_ADAPTER_')));
    assert.ok(result.preConnectionWorkerQueueAdapterRelationItems.some((item) => item.adapterPreparationState.startsWith('PRE_CONNECTION_QUEUE_ADAPTER_')));
    assert.ok(result.preConnectionWorkerQueueAdapterRelationItems.some((item) => item.adapterPreparationState === 'PRE_CONNECTION_WORKER_QUEUE_ADAPTER_SEPARATED'));

    assert.strictEqual(result.actualExternalIntegrationBlockedReasonItems.length, 5);
    assert.ok(result.actualExternalIntegrationBlockedReasonItems.some((item) => item.adapterPreparationState === 'EXTERNAL_INTEGRATION_BLOCKED_UNTIL_APPROVAL'));
    assert.ok(result.actualExternalIntegrationBlockedReasonItems.some((item) => item.adapterPreparationState === 'EXTERNAL_INTEGRATION_BLOCKED_BY_LIVE_ADAPTER_DISCONNECTED'));

    assert.strictEqual(result.disconnectedSystemItems.length, 6);
    assert.ok(result.disconnectedSystemItems.every((item) => item.adapterPreparationState.startsWith('DISCONNECTED_')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('Live Adapter 경로')));
    assert.ok(result.disconnectedSystemItems.some((item) => item.label.includes('운영 DB write 경로')));

    assert.ok(result.finalNotice.includes('adapter connection preparation View Contract'));
    assert.ok(result.finalNotice.includes('Task 41~154'));
  });
});
