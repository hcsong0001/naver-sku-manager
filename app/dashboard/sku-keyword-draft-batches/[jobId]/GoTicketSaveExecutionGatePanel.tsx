'use client';

import { buildExecutionGateView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-execution-gate-view.service';
import type { DryRunValidationResult } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-dry-run-validation.service';

interface GoTicketSaveExecutionGatePanelProps {
  dryRunResult: DryRunValidationResult | null;
  finalConfirmationAllChecked: boolean;
  finalConfirmationCheckedCount: number;
}

export function GoTicketSaveExecutionGatePanel({
  dryRunResult,
  finalConfirmationAllChecked,
  finalConfirmationCheckedCount,
}: GoTicketSaveExecutionGatePanelProps) {
  const viewModel = buildExecutionGateView(
    dryRunResult
      ? {
          dryRunOk: dryRunResult.ok,
          dryRunRejected: dryRunResult.rejected,
          dryRunSaved: dryRunResult.saved,
          dryRunDbWriteExecuted: dryRunResult.dbWriteExecuted,
          dryRunPrismaMutationExecuted: dryRunResult.prismaMutationExecuted,
          dryRunTokenIssued: dryRunResult.tokenIssued,
          dryRunNaverApiCallExecuted: dryRunResult.naverApiCallExecuted,
          finalConfirmationAllChecked,
          finalConfirmationCheckedCount,
        }
      : {},
  );

  const { gateStatus, gateStatusMessage, gateBlockedReasons } = viewModel;

  const isReady = gateStatus === 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY';
  const isBlocked = gateStatus === 'BLOCKED_BY_DRY_RUN_REJECTION' || gateStatus === 'BLOCKED_BY_SAFETY_FLAGS';
  const isWaiting = gateStatus === 'WAITING_FOR_DRY_RUN' || gateStatus === 'WAITING_FOR_FINAL_CONFIRMATION';

  const safetyFlagRows: [string, string][] = [
    ['saved', 'false'],
    ['testDbWriteExecuted', 'false'],
    ['operatingDbWriteExecuted', 'false'],
    ['dbWriteExecuted', 'false'],
    ['prismaMutationExecuted', 'false'],
    ['tokenIssued', 'false'],
    ['naverApiCallExecuted', 'false'],
  ];

  const borderColor = isReady
    ? 'border-emerald-700/20'
    : isBlocked
    ? 'border-rose-800/20'
    : 'border-slate-700/20';

  const statusBadgeStyle = isReady
    ? 'border-emerald-700 bg-emerald-900/30 text-emerald-400'
    : isBlocked
    ? 'border-rose-700 bg-rose-900/30 text-rose-400'
    : 'border-slate-700 bg-slate-800/30 text-slate-400';

  const statusBannerStyle = isReady
    ? 'border-emerald-500/20 bg-emerald-950/10 text-emerald-300'
    : isBlocked
    ? 'border-rose-500/20 bg-rose-950/10 text-rose-300'
    : 'border-slate-700/30 bg-slate-900/20 text-slate-400';

  return (
    <div className={`mb-6 rounded-lg border ${borderColor} bg-[#080809] p-4`}>
      <div className="mb-3 flex items-center gap-2">
        <span className={isReady ? 'text-emerald-400' : isBlocked ? 'text-rose-500' : 'text-slate-600'}>
          ◆
        </span>
        <h2 className="text-base font-semibold text-white">
          Test DB Save Execution Gate
        </h2>
        <span className={`ml-1 rounded-full border px-2 py-0.5 text-[10px] ${statusBadgeStyle}`}>
          Still No-Write
        </span>
      </div>

      {/* Gate 상태 배너 */}
      <div className={`mb-3 rounded-md border px-3 py-2 text-xs font-semibold ${statusBannerStyle}`}>
        {gateStatusMessage}
      </div>

      {/* Gate 상태 표시 */}
      <div className="mb-3 rounded-md border border-slate-700/30 bg-slate-900/20 px-3 py-2">
        <p className="mb-1 text-[11px] font-semibold text-slate-400">Gate 상태</p>
        <code className={`text-xs font-mono font-bold ${isReady ? 'text-emerald-400' : isBlocked ? 'text-rose-400' : 'text-slate-400'}`}>
          {gateStatus}
        </code>
      </div>

      {/* 차단 사유 */}
      {isBlocked && gateBlockedReasons.length > 0 && (
        <div className="mb-3 rounded-md border border-rose-800/20 bg-rose-950/10 px-3 py-2">
          <p className="mb-1 text-[11px] font-semibold text-rose-400">Gate 차단 사유</p>
          <ul className="space-y-0.5">
            {gateBlockedReasons.map((reason, i) => (
              <li key={i} className="text-[11px] text-rose-300">• {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* READY 상태 안내 */}
      {isReady && (
        <div className="mb-3 rounded-md border border-emerald-600/20 bg-emerald-950/10 px-3 py-3">
          <p className="text-sm font-semibold text-emerald-300">
            Gate PASS — 저장 버튼은 아직 없습니다
          </p>
          <p className="mt-1 text-xs text-emerald-400/70">
            다음 Task에서만 Test DB 저장 기능을 구현할 수 있습니다. 별도 사용자 승인 후 전용 Task 필요.
          </p>
        </div>
      )}

      {/* WAITING 상태 진행 현황 */}
      {isWaiting && (
        <div className="mb-3 rounded-md border border-slate-700/30 bg-slate-900/10 px-3 py-2">
          <p className="mb-1 text-[11px] font-semibold text-slate-400">Gate 통과를 위한 잔여 조건</p>
          <ul className="space-y-0.5 text-[11px] text-slate-500">
            {gateStatus === 'WAITING_FOR_DRY_RUN' && (
              <>
                <li className="text-slate-600">• Dry-run 검증 미실행</li>
                <li className="text-slate-600">• Final Confirmation 미완료</li>
              </>
            )}
            {gateStatus === 'WAITING_FOR_FINAL_CONFIRMATION' && (
              <li className="text-slate-600">
                • Final Confirmation {finalConfirmationCheckedCount}/10 완료
              </li>
            )}
          </ul>
        </div>
      )}

      {/* 안전 플래그 표시 */}
      <div className="mb-3 rounded-md border border-slate-700/30 bg-slate-900/20 p-3">
        <p className="mb-2 text-[11px] font-semibold text-slate-400">
          안전 불변 조건 — Gate 상태와 무관하게 항상 유지
        </p>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {safetyFlagRows.map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-sm border border-slate-800/40 bg-slate-900/50 px-2 py-1"
            >
              <span className="truncate text-[11px] text-slate-500 mr-2">{key}</span>
              <span className="flex-shrink-0 text-[11px] font-mono font-semibold text-emerald-400">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 안전 안내 */}
      <div className="rounded-md border border-slate-700/40 bg-slate-800/20 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-400">
          Gate PASS여도 실행되지 않는 것
        </p>
        <ul className="space-y-0.5 text-[11px] text-slate-500">
          <li>• 실제 Naver API 호출 없음</li>
          <li>• 실제 token 발급 없음 — 실제 token 발급은 아직 구현되지 않았습니다</li>
          <li>• Test DB write 없음 (다음 Task에서만 가능)</li>
          <li>• 운영 DB write 없음</li>
          <li>• Go Ticket 발급 없음</li>
          <li>• Execution Lease 발급 없음</li>
          <li>• 저장 버튼 없음</li>
        </ul>
      </div>

      <p className="mt-3 text-[10px] text-slate-700">
        Test DB Save Execution Gate · Still No-Write · 다음 Task에서만 Test DB 저장 구현 가능
      </p>
    </div>
  );
}
