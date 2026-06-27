import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultReadOnlyBoundaryConfirmationView } from './sku-keyword-final-approval-execution-batchjob-result-read-only-boundary-confirmation-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-read-only-boundary-confirmation-view.service', async (t) => {
  await t.test('should build batchjob execution result read only boundary confirmation view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultReadOnlyBoundaryConfirmationView(null);

    assert.equal(view.taskName, 'Task 165 - BatchJob Execution Result Read-Only Boundary Confirmation Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Read-Only Boundary Confirmation');
    assert.equal(view.boundaryStatus, 'BATCHJOB_RESULT_BOUNDARY_CONFIRMED_READ_ONLY');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isBoundaryConfirmationOnly, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
    assert.equal(view.isBatchJobResultExecutionEntry, false);
    assert.equal(view.hasExecutionButton, false);
    assert.equal(view.hasSubmitAction, false);
    assert.equal(view.hasWorkerTrigger, false);
    assert.equal(view.hasQueueTrigger, false);
    assert.equal(view.hasAdapterTrigger, false);
    assert.equal(view.hasTokenRequestPath, false);
    assert.equal(view.hasNaverApiCallPath, false);
    assert.equal(view.hasOperatingDbWritePath, false);
    assert.equal(view.hasPriceChangePath, false);
    assert.equal(view.hasStockChangePath, false);

    assert.equal(view.previousExecutionConnectionNonExecutionFinalLockEvidenceHandoffCommit, '76cf346');

    assert.equal(view.boundaryConfirmationItems.length, 1);
    assert.equal(view.blockedExecutionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('상태 표시일 뿐 실행 허가 또는 실행 시작점이 아니며'));
    assert.ok(view.finalNotice.includes('read-only evidence'));
  });
});
