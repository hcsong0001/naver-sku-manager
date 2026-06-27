import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyClosureSealView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-closure-seal-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-closure-seal-view.service', async (t) => {
  await t.test('should build batchjob execution result display only closure seal view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyClosureSealView(null);

    assert.equal(view.taskName, 'Task 174 - BatchJob Execution Result Display-Only Closure Seal Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Closure Seal');
    assert.equal(view.sealStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_CLOSURE_SEAL_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyClosureSeal, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
    assert.equal(view.isBatchJobResultDisplayOnly, true);
    assert.equal(view.isBatchJobResultActionArea, false);
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

    assert.equal(view.previousExecutionBatchJobResultDisplayOnlyClosureBoundaryCommit, '7250959');

    assert.equal(view.closureSealItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('closure boundary는 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('closure seal 안의 상태 표시 영역일 뿐 action 영역이 아닙니다'));
  });
});
