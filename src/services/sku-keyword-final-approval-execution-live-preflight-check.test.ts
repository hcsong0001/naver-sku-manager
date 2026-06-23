import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  evaluateFinalApprovalLivePreflightCheck,
  buildLivePreflightChecklist,
  summarizeLivePreflightReadiness,
  type LivePreflightCheckInput,
} from './sku-keyword-final-approval-execution-live-preflight-check.service';

function baseInput(overrides: Partial<LivePreflightCheckInput> = {}): LivePreflightCheckInput {
  return {
    finalApprovalStatus: 'ACTIVE',
    batchJobStatus: 'APPROVED',
    itemStatuses: ['READY'],
    totalItems: 1,
    successItems: 0,
    failedItems: 0,
    skippedItems: 0,
    executedAt: null,
    executionMetadata: { executionMode: 'mock', actorId: 'test-actor' },
    adapterMode: 'mock',
    naverApiCalled: false,
    ...overrides,
  };
}

describe('evaluateFinalApprovalLivePreflightCheck', () => {
  it('APPROVED + READY + 1건 + replay pass + live gate blocked → preflight summary 생성', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(baseInput());

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_CHECK_READY_BUT_LIVE_CALL_DISABLED');
    assert.equal(result.naverApiCallAllowed, false);
    assert.equal(result.naverApiCalled, false);
    assert.equal(result.blockingReasons.length, 0);
    assert.ok(result.checklistItems.length > 0);
    assert.ok(result.readinessMessage.includes('허용되지 않습니다'));

    const gateItem = result.checklistItems.find(i => i.key === 'live_safety_gate');
    assert.ok(gateItem, 'live_safety_gate 항목이 있어야 합니다');
    assert.equal(gateItem.status, 'NEEDS_REVIEW');
  });

  it('ready가 true여도 naverApiCallAllowed는 항상 false 유지', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(baseInput());
    assert.equal(result.ready, true);
    assert.equal(result.naverApiCallAllowed, false);
  });

  it('item이 2건 이상이면 단일 테스트 조건 실패', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ totalItems: 2, itemStatuses: ['READY', 'READY'] })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const singleItem = result.checklistItems.find(i => i.key === 'single_item_only');
    assert.ok(singleItem);
    assert.equal(singleItem.status, 'BLOCKED');
    assert.ok(result.blockingReasons.some(r => r.includes('2건')));
  });

  it('EXECUTED 상태면 재실행 차단으로 preflight blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ batchJobStatus: 'EXECUTED', successItems: 1 })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const terminalItem = result.checklistItems.find(i => i.key === 'batch_job_not_terminal');
    assert.ok(terminalItem);
    assert.equal(terminalItem.status, 'BLOCKED');
    assert.ok(terminalItem.message.includes('EXECUTED'));
  });

  it('PARTIAL_SUCCESS 상태면 재실행 차단', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ batchJobStatus: 'PARTIAL_SUCCESS' })
    );
    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const terminalItem = result.checklistItems.find(i => i.key === 'batch_job_not_terminal');
    assert.ok(terminalItem);
    assert.equal(terminalItem.status, 'BLOCKED');
  });

  it('FAILED 상태면 재실행 차단', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ batchJobStatus: 'FAILED' })
    );
    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
  });

  it('EXECUTING 상태면 동시 실행 차단', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ batchJobStatus: 'EXECUTING' })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const executingItem = result.checklistItems.find(i => i.key === 'batch_job_not_executing');
    assert.ok(executingItem);
    assert.equal(executingItem.status, 'BLOCKED');
  });

  it('READY가 아닌 item이 있으면 blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ itemStatuses: ['DRAFT'] })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const readyItem = result.checklistItems.find(i => i.key === 'all_items_ready');
    assert.ok(readyItem);
    assert.equal(readyItem.status, 'BLOCKED');
  });

  it('successItems > 0이면 Replay Guard blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ successItems: 1 })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const replayItem = result.checklistItems.find(i => i.key === 'replay_guard');
    assert.ok(replayItem);
    assert.equal(replayItem.status, 'BLOCKED');
    assert.ok(replayItem.message.includes('성공: 1건'));
  });

  it('failedItems > 0이면 Replay Guard blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ failedItems: 1 })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const replayItem = result.checklistItems.find(i => i.key === 'replay_guard');
    assert.ok(replayItem);
    assert.equal(replayItem.status, 'BLOCKED');
  });

  it('naverApiCalled=true이면 WARN (차단은 아님)', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ naverApiCalled: true })
    );

    const naverItem = result.checklistItems.find(i => i.key === 'naver_api_not_called');
    assert.ok(naverItem);
    assert.equal(naverItem.status, 'WARN');
    assert.ok(result.warnings.length > 0);
    assert.equal(result.naverApiCalled, true);
  });

  it('adapterMode가 live이면 adapter_mode_safe blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ adapterMode: 'live' })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(adapterItem);
    assert.equal(adapterItem.status, 'BLOCKED');
  });

  it('adapterMode가 prod이면 blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ adapterMode: 'prod' })
    );
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(adapterItem);
    assert.equal(adapterItem.status, 'BLOCKED');
  });

  it('adapterMode가 production이면 blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ adapterMode: 'production' })
    );
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(adapterItem);
    assert.equal(adapterItem.status, 'BLOCKED');
  });

  it('adapterMode가 operating이면 blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ adapterMode: 'operating' })
    );
    const adapterItem = result.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(adapterItem);
    assert.equal(adapterItem.status, 'BLOCKED');
  });

  it('민감 정보가 checklist/result에 포함되지 않음', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(baseInput());
    const resultStr = JSON.stringify(result);

    // 실제 민감 값 패턴이 없는지 확인 (키 이름이 아닌 실제 값)
    assert.ok(!resultStr.includes('sk-'), 'API 키 패턴 없어야 함');
    assert.ok(!resultStr.includes('postgresql://'), 'DB URL 없어야 함');
    assert.ok(!resultStr.includes('redis://'), 'Redis URL 없어야 함');

    const sensitiveItem = result.checklistItems.find(i => i.key === 'no_sensitive_info');
    assert.ok(sensitiveItem);
    assert.equal(sensitiveItem.status, 'PASS');
    // 메시지가 존재하고 비어있지 않음
    assert.ok(sensitiveItem.message.length > 0);
  });

  it('finalApprovalStatus가 null이면 Final Approval 없음으로 blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ finalApprovalStatus: null })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const faItem = result.checklistItems.find(i => i.key === 'final_approval_exists');
    assert.ok(faItem);
    assert.equal(faItem.status, 'BLOCKED');
  });

  it('finalApprovalStatus가 INVALIDATED이면 blocked', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ finalApprovalStatus: 'INVALIDATED' })
    );

    assert.equal(result.readinessCode, 'LIVE_PREFLIGHT_BLOCKED');
    const faItem = result.checklistItems.find(i => i.key === 'final_approval_exists');
    assert.ok(faItem);
    assert.equal(faItem.status, 'BLOCKED');
  });

  it('adapterMode 대소문자 구분 없이 blocked 처리', () => {
    const resultUpper = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ adapterMode: 'LIVE' })
    );
    const adapterItem = resultUpper.checklistItems.find(i => i.key === 'adapter_mode_safe');
    assert.ok(adapterItem);
    assert.equal(adapterItem.status, 'BLOCKED');
  });
});

describe('buildLivePreflightChecklist', () => {
  it('모든 조건 통과시 BLOCKED 항목이 없음', () => {
    const items = buildLivePreflightChecklist(baseInput());
    const blocked = items.filter(i => i.status === 'BLOCKED');
    assert.equal(blocked.length, 0);
  });

  it('Live Safety Gate는 항상 NEEDS_REVIEW', () => {
    const items = buildLivePreflightChecklist(baseInput());
    const gate = items.find(i => i.key === 'live_safety_gate');
    assert.ok(gate);
    assert.equal(gate.status, 'NEEDS_REVIEW');
  });

  it('no_sensitive_info는 항상 PASS (blocked 상태에서도)', () => {
    const items = buildLivePreflightChecklist(baseInput({ batchJobStatus: 'EXECUTED' }));
    const sensitive = items.find(i => i.key === 'no_sensitive_info');
    assert.ok(sensitive);
    assert.equal(sensitive.status, 'PASS');
  });

  it('EXECUTING 상태면 all_items_ready 항목이 생략됨', () => {
    const items = buildLivePreflightChecklist(baseInput({ batchJobStatus: 'EXECUTING' }));
    const readyItem = items.find(i => i.key === 'all_items_ready');
    assert.equal(readyItem, undefined);
  });

  it('EXECUTED 상태면 all_items_ready 항목이 생략됨', () => {
    const items = buildLivePreflightChecklist(baseInput({ batchJobStatus: 'EXECUTED' }));
    const readyItem = items.find(i => i.key === 'all_items_ready');
    assert.equal(readyItem, undefined);
  });

  it('executionMode가 live이면 execution_mode_safe가 WARN', () => {
    const items = buildLivePreflightChecklist(
      baseInput({ executionMetadata: { executionMode: 'live', actorId: 'actor' } })
    );
    const execItem = items.find(i => i.key === 'execution_mode_safe');
    assert.ok(execItem);
    assert.equal(execItem.status, 'WARN');
  });

  it('executionMetadata가 null이면 execution_mode_safe가 PASS', () => {
    const items = buildLivePreflightChecklist(baseInput({ executionMetadata: null }));
    const execItem = items.find(i => i.key === 'execution_mode_safe');
    assert.ok(execItem);
    assert.equal(execItem.status, 'PASS');
  });
});

describe('summarizeLivePreflightReadiness', () => {
  it('ready=true 상태의 요약을 올바르게 생성', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(baseInput());
    const summary = summarizeLivePreflightReadiness(result);

    assert.equal(summary.naverApiCallAllowed, false);
    assert.equal(summary.naverApiCalled, false);
    assert.ok(summary.statusLabel.includes('Live 호출은 차단됨'));
    assert.ok(summary.passCount > 0);
    assert.equal(summary.blockingCount, 0);
  });

  it('blocked 상태의 요약을 올바르게 생성', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(baseInput({ totalItems: 3 }));
    const summary = summarizeLivePreflightReadiness(result);

    assert.ok(summary.blockingCount > 0);
    assert.ok(summary.statusLabel.includes('차단 항목'));
    assert.equal(summary.naverApiCallAllowed, false);
  });

  it('naverApiCallAllowed는 항상 false', () => {
    const readyResult = evaluateFinalApprovalLivePreflightCheck(baseInput());
    const blockedResult = evaluateFinalApprovalLivePreflightCheck(
      baseInput({ batchJobStatus: 'EXECUTED' })
    );

    assert.equal(summarizeLivePreflightReadiness(readyResult).naverApiCallAllowed, false);
    assert.equal(summarizeLivePreflightReadiness(blockedResult).naverApiCallAllowed, false);
  });

  it('WARN/NEEDS_REVIEW 항목은 warningCount에 포함', () => {
    const result = evaluateFinalApprovalLivePreflightCheck(baseInput({ naverApiCalled: true }));
    const summary = summarizeLivePreflightReadiness(result);

    assert.ok(summary.warningCount > 0);
  });
});
