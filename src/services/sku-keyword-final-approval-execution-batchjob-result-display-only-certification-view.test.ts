import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyCertificationView } from './sku-keyword-final-approval-execution-batchjob-result-display-only-certification-view.service';

test('sku-keyword-final-approval-execution-batchjob-result-display-only-certification-view.service', async (t) => {
  await t.test('should build batchjob execution result display only certification view correctly', () => {
    const view = buildNaverApiTokenFirstTestSeparateApprovalFinalHoldNonReleaseHandoffClosureFinalStatusSealConfirmationFinalReviewClosureStatusFinalClosureFinalStatusExecutionBatchJobResultDisplayOnlyCertificationView(null);

    assert.equal(view.taskName, 'Task 169 - BatchJob Execution Result Display-Only Certification Screen Flow');
    assert.equal(view.panelTitle, 'BatchJob Execution Result Display-Only Certification');
    assert.equal(view.certificationStatus, 'BATCHJOB_RESULT_DISPLAY_ONLY_CERTIFIED');

    assert.equal(view.isReadOnly, true);
    assert.equal(view.isDisplayOnlyCertification, true);
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

    assert.equal(view.previousExecutionBatchJobResultNonActionFinalBoundaryCommit, '0471353');

    assert.equal(view.displayOnlyCertificationItems.length, 1);
    assert.equal(view.blockedActionPaths.length, 1);
    assert.equal(view.misunderstandingPreventionItems.length, 1);
    assert.equal(view.stillForbiddenActions.length, 1);

    assert.ok(view.finalNotice.includes('상태 표시 영역'));
    assert.ok(view.finalNotice.includes('실행 승인, 연결 승인, Token 테스트 승인, Live 준비 완료를 의미하지 않습니다'));
  });
});
