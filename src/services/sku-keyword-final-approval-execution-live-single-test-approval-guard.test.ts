import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  evaluateLiveSingleTestApprovalGuard,
  buildLiveSingleTestApprovalChecklist,
  summarizeLiveSingleTestApprovalReadiness,
  REQUIRED_ACKNOWLEDGEMENTS,
  type LiveSingleTestApprovalGuardInput,
} from './sku-keyword-final-approval-execution-live-single-test-approval-guard.service';

const ALL_ACKNOWLEDGEMENTS = [...REQUIRED_ACKNOWLEDGEMENTS];

function baseInput(
  overrides: Partial<LiveSingleTestApprovalGuardInput> = {}
): LiveSingleTestApprovalGuardInput {
  return {
    finalApprovalId: 'fa-test-001',
    finalApprovalStatus: 'ACTIVE',
    batchJobId: 'job-test-001',
    batchJobStatus: 'APPROVED',
    itemStatuses: ['READY'],
    totalItems: 1,
    successItems: 0,
    failedItems: 0,
    executedAt: null,
    executionMetadata: { executionMode: 'mock', actorId: 'test-actor' },
    adapterMode: 'mock',
    naverApiCalled: false,
    livePreflightResult: { ready: true, blockingReasons: [] },
    acknowledgedItems: ALL_ACKNOWLEDGEMENTS,
    ...overrides,
  };
}

describe('evaluateLiveSingleTestApprovalGuard', () => {
  it('APPROVED + ACTIVE + READY 1건 + preflight 존재 + 전체 acknowledgement → approvalReady true but liveExecutionEnabled false', () => {
    const result = evaluateLiveSingleTestApprovalGuard(baseInput());

    assert.equal(result.approvalReady, true);
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE');
    assert.equal(result.naverApiCallAllowed, false);
    assert.equal(result.liveExecutionEnabled, false);
    assert.equal(result.maxAllowedState, 'LIVE_SINGLE_TEST_APPROVAL_READY_BUT_NOT_EXECUTABLE');
    assert.equal(result.blockingReasons.length, 0);
    assert.equal(result.missingAcknowledgements.length, 0);
  });

  it('item 2건 이상이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ totalItems: 2, itemStatuses: ['READY', 'READY'] })
    );

    assert.equal(result.approvalReady, false);
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'single_item_count');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
    assert.ok(item.message.includes('2건'));
  });

  it('item 0건이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ totalItems: 0, itemStatuses: [] })
    );
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
  });

  it('BatchJob EXECUTED → BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ batchJobStatus: 'EXECUTED', successItems: 1 })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'batch_job_status');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
    assert.ok(item.message.includes('EXECUTED'));
  });

  it('BatchJob PARTIAL_SUCCESS → BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ batchJobStatus: 'PARTIAL_SUCCESS' })
    );
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
  });

  it('BatchJob FAILED → BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ batchJobStatus: 'FAILED' })
    );
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
  });

  it('BatchJob EXECUTING → BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ batchJobStatus: 'EXECUTING' })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'batch_job_status');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('FinalApproval ACTIVE 아님 → BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ finalApprovalStatus: 'INVALIDATED' })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'final_approval_exists');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('FinalApproval ID 없음 → BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ finalApprovalId: null })
    );
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'final_approval_exists');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('READY가 아닌 item이 있으면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ itemStatuses: ['DRAFT'] })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'all_items_ready');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('successItems > 0 → Replay Guard BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ successItems: 1 })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'replay_guard');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('naverApiCalled=true → WARN (차단이 아님)', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ naverApiCalled: true })
    );

    const item = result.checklistItems.find(i => i.key === 'naver_api_not_called');
    assert.ok(item);
    assert.equal(item.status, 'WARN');
    assert.ok(result.warnings.length > 0);
    assert.equal(result.naverApiCallAllowed, false);
  });

  it('adapterMode가 live이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ adapterMode: 'live' })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('adapterMode가 prod이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(baseInput({ adapterMode: 'prod' }));
    const item = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('adapterMode가 production이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ adapterMode: 'production' })
    );
    const item = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('adapterMode가 operating이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ adapterMode: 'operating' })
    );
    const item = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('livePreflightResult가 null이면 NEEDS_REVIEW', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ livePreflightResult: null })
    );

    const item = result.checklistItems.find(i => i.key === 'live_preflight_exists');
    assert.ok(item);
    assert.equal(item.status, 'NEEDS_REVIEW');
    assert.ok(result.warnings.length > 0);
  });

  it('livePreflightResult.ready=false이면 BLOCKED', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({
        livePreflightResult: { ready: false, blockingReasons: ['item 1건 초과'] },
      })
    );

    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_BLOCKED');
    const item = result.checklistItems.find(i => i.key === 'live_preflight_exists');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });

  it('acknowledgement 일부 누락 → approvalReady false, PENDING_ACKNOWLEDGEMENT', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({
        acknowledgedItems: ['CONFIRM_SINGLE_ITEM_ONLY', 'CONFIRM_TARGET_PRODUCT_REVIEWED'],
      })
    );

    assert.equal(result.approvalReady, false);
    assert.equal(result.approvalCode, 'LIVE_SINGLE_TEST_APPROVAL_PENDING_ACKNOWLEDGEMENT');
    assert.ok(result.missingAcknowledgements.length > 0);
    assert.equal(result.acknowledgedCount, 2);
  });

  it('acknowledgedItems가 빈 배열이면 모든 acknowledgement 누락', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ acknowledgedItems: [] })
    );

    assert.equal(result.approvalReady, false);
    assert.equal(result.missingAcknowledgements.length, REQUIRED_ACKNOWLEDGEMENTS.length);
    assert.equal(result.acknowledgedCount, 0);
  });

  it('모든 acknowledgement가 있어도 naverApiCallAllowed=false', () => {
    const result = evaluateLiveSingleTestApprovalGuard(baseInput());
    assert.equal(result.approvalReady, true);
    assert.equal(result.naverApiCallAllowed, false);
    assert.equal(result.liveExecutionEnabled, false);
  });

  it('결과에 민감 문자열이 포함되지 않음', () => {
    const result = evaluateLiveSingleTestApprovalGuard(baseInput());
    const resultStr = JSON.stringify(result);

    assert.ok(!resultStr.includes('sk-'));
    assert.ok(!resultStr.includes('postgresql://'));
    assert.ok(!resultStr.includes('redis://'));

    const sensitiveItem = result.checklistItems.find(i => i.key === 'no_sensitive_info');
    assert.ok(sensitiveItem);
    assert.equal(sensitiveItem.status, 'PASS');
  });

  it('adapterMode 대소문자 무시하여 blocked 처리', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ adapterMode: 'PRODUCTION' })
    );
    const item = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(item);
    assert.equal(item.status, 'BLOCKED');
  });
});

describe('buildLiveSingleTestApprovalChecklist', () => {
  it('모든 조건 통과시 BLOCKED 항목이 없음', () => {
    const items = buildLiveSingleTestApprovalChecklist(baseInput());
    const blocked = items.filter(i => i.status === 'BLOCKED');
    assert.equal(blocked.length, 0);
  });

  it('naver_api_call_disabled와 live_execution_disabled는 항상 PASS', () => {
    const itemsWithExec = buildLiveSingleTestApprovalChecklist(
      baseInput({ batchJobStatus: 'EXECUTED' })
    );
    const callDisabled = itemsWithExec.find(i => i.key === 'naver_api_call_disabled');
    const execDisabled = itemsWithExec.find(i => i.key === 'live_execution_disabled');
    assert.ok(callDisabled);
    assert.ok(execDisabled);
    assert.equal(callDisabled.status, 'PASS');
    assert.equal(execDisabled.status, 'PASS');
  });

  it('no_sensitive_info는 항상 PASS', () => {
    const items = buildLiveSingleTestApprovalChecklist(
      baseInput({ batchJobStatus: 'FAILED' })
    );
    const sensitive = items.find(i => i.key === 'no_sensitive_info');
    assert.ok(sensitive);
    assert.equal(sensitive.status, 'PASS');
  });

  it('EXECUTING 상태면 all_items_ready 항목이 생략됨', () => {
    const items = buildLiveSingleTestApprovalChecklist(
      baseInput({ batchJobStatus: 'EXECUTING' })
    );
    const readyItem = items.find(i => i.key === 'all_items_ready');
    assert.equal(readyItem, undefined);
  });
});

describe('summarizeLiveSingleTestApprovalReadiness', () => {
  it('approvalReady=true 상태의 요약을 올바르게 생성', () => {
    const result = evaluateLiveSingleTestApprovalGuard(baseInput());
    const summary = summarizeLiveSingleTestApprovalReadiness(result);

    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.liveExecutionEnabled, false);
    assert.ok(summary.statusLabel.includes('Live 실행은 차단됨'));
    assert.ok(summary.passCount > 0);
    assert.equal(summary.blockingCount, 0);
    assert.equal(summary.missingAcknowledgements.length, 0);
    assert.equal(summary.totalRequiredAcknowledgements, REQUIRED_ACKNOWLEDGEMENTS.length);
  });

  it('BLOCKED 상태의 요약을 올바르게 생성', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ totalItems: 5 })
    );
    const summary = summarizeLiveSingleTestApprovalReadiness(result);

    assert.ok(summary.blockingCount > 0);
    assert.ok(summary.statusLabel.includes('차단 항목'));
    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.liveExecutionEnabled, false);
  });

  it('acknowledgement 대기 상태 요약', () => {
    const result = evaluateLiveSingleTestApprovalGuard(
      baseInput({ acknowledgedItems: [] })
    );
    const summary = summarizeLiveSingleTestApprovalReadiness(result);

    assert.ok(summary.statusLabel.includes('미확인'));
    assert.equal(summary.acknowledgedCount, 0);
    assert.ok(summary.missingAcknowledgements.length > 0);
  });

  it('naverApiCallAllowed와 liveExecutionEnabled는 항상 false', () => {
    const readyResult = evaluateLiveSingleTestApprovalGuard(baseInput());
    const blockedResult = evaluateLiveSingleTestApprovalGuard(
      baseInput({ batchJobStatus: 'EXECUTED' })
    );

    assert.equal(summarizeLiveSingleTestApprovalReadiness(readyResult).naverApiCallAllowed, false);
    assert.equal(summarizeLiveSingleTestApprovalReadiness(blockedResult).naverApiCallAllowed, false);
    assert.equal(summarizeLiveSingleTestApprovalReadiness(readyResult).liveExecutionEnabled, false);
    assert.equal(summarizeLiveSingleTestApprovalReadiness(blockedResult).liveExecutionEnabled, false);
  });
});
