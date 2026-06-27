import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultNonActionSealView } from './sku-keyword-final-approval-execution-batchjob-result-non-action-seal-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-non-action-seal-view.service', async (t) => {
  await t.test('should build batchjob execution result non action seal view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultNonActionSealView(null);

    assert.equal(view.taskName, 'Task 167 - BatchJob Execution Result Non-Action Seal Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Non-Action Seal');
    assert.equal(view.sealStatus, 'BATCHJOB_RESULT_NON_ACTION_SEAL_ACTIVE');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isNonActionSealOnly, true);
    assert.equal(view.isExecutionApproved, false);
    assert.equal(view.isConnectionApproved, false);
    assert.equal(view.isTokenTestApproved, false);
    assert.equal(view.isLiveReady, false);
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

    assert.equal(view.previousExecutionBatchJobResultNonActionEvidenceCommit, '4e586d7');

    assert.equal(view.nonActionSealItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('non-action evidence는 실행 허가가 아니며'));
    assert.ok(view.finalNotice.includes('가격/재고 변경으로 이어지지 않습니다'));
  });
});
