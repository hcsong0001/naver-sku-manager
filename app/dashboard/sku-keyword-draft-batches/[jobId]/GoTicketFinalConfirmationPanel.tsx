'use client';

import { useState } from 'react';
import { buildFinalConfirmationView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-final-confirmation-view.service';
import type { DryRunValidationResult } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-dry-run-validation.service';
import { GoTicketSaveExecutionGatePanel } from './GoTicketSaveExecutionGatePanel';

interface GoTicketFinalConfirmationPanelProps {
  dryRunResult: DryRunValidationResult | null;
}

export function GoTicketFinalConfirmationPanel({
  dryRunResult,
}: GoTicketFinalConfirmationPanelProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const viewModel = buildFinalConfirmationView(
    dryRunResult
      ? {
          dryRunOk: dryRunResult.ok,
          dryRunRejected: dryRunResult.rejected,
          dryRunSaved: dryRunResult.saved,
        }
      : {},
  );

  const { state, stateMessage, checklistItems } = viewModel;

  const total = checklistItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const allChecked = checkedCount === total;

  function toggle(key: string) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function resetAll() {
    setChecked({});
  }

  // pending 또는 blocked 상태
  if (state !== 'review') {
    const isPending = state === 'pending';
    return (
      <>
        <div className="mb-6 rounded-lg border border-[#262629] bg-[#0a0a0c] p-4">
          <div className="flex items-center gap-2">
            <span className={isPending ? 'text-slate-700' : 'text-rose-800'}>◉</span>
            <h2 className="text-base font-semibold text-slate-600">
              Final Confirmation
            </h2>
            <span className="ml-1 rounded-full border border-slate-800 bg-slate-900 px-2 py-0.5 text-xs text-slate-600">
              Still No-Write
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600">{stateMessage}</p>
          <p className="mt-1 text-[10px] text-slate-700">
            실제 Test DB 저장은 별도 Task와 별도 사용자 승인 후에만 가능합니다.
          </p>
        </div>
        <GoTicketSaveExecutionGatePanel
          dryRunResult={dryRunResult}
          finalConfirmationAllChecked={false}
          finalConfirmationCheckedCount={0}
        />
      </>
    );
  }

  // review 상태 (dry-run ok=true, saved=false)
  return (
    <>
    <div className="mb-6 rounded-lg border border-teal-700/20 bg-[#0a0a0c] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <span className="text-teal-400">◉</span>
          Final Confirmation
          <span className="ml-1 rounded-full border border-teal-700 bg-teal-900/30 px-2 py-0.5 text-xs text-teal-400">
            Still No-Write
          </span>
        </h2>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-sm border border-slate-700 bg-slate-800/40 px-2 py-1 text-xs text-slate-500 hover:bg-slate-800 hover:text-slate-400 transition-colors"
        >
          로컬 체크 초기화
        </button>
      </div>

      {/* 상태 배너 */}
      <div className="mb-3 rounded-md border border-teal-500/20 bg-teal-500/10 px-3 py-2 text-xs text-teal-300">
        {stateMessage}
      </div>

      {/* dry-run 결과 요약 */}
      <div className="mb-4 rounded-md border border-slate-700/30 bg-slate-900/20 px-3 py-2">
        <p className="mb-1 text-[11px] font-semibold text-slate-400">Dry-run 검증 결과 (서버 응답 확인)</p>
        <div className="flex flex-wrap gap-3 text-[11px] font-mono">
          <span className="text-emerald-400">saved=false</span>
          <span className="text-emerald-400">dbWriteExecuted=false</span>
          <span className="text-emerald-400">prismaMutationExecuted=false</span>
          <span className="text-sky-300">dryRunOnly=true</span>
        </div>
      </div>

      {/* 체크리스트 */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-400">
            최종 확인 체크리스트 ({checkedCount}/{total})
          </p>
          {allChecked ? (
            <span className="rounded-full border border-teal-600 bg-teal-900/30 px-2 py-0.5 text-[10px] text-teal-400">
              확인 완료
            </span>
          ) : (
            <span className="rounded-full border border-slate-700 bg-slate-800/30 px-2 py-0.5 text-[10px] text-slate-500">
              진행 중
            </span>
          )}
        </div>

        <ul className="space-y-1.5">
          {checklistItems.map(item => (
            <li key={item.key}>
              <label className="flex cursor-pointer items-start gap-2 rounded-sm border border-slate-800/50 bg-slate-900/30 px-3 py-2 hover:bg-slate-900/50 transition-colors">
                <input
                  type="checkbox"
                  checked={!!checked[item.key]}
                  onChange={() => toggle(item.key)}
                  className="mt-0.5 flex-shrink-0 accent-teal-500"
                />
                <span className={`text-[11px] leading-relaxed ${checked[item.key] ? 'text-teal-300 line-through decoration-teal-600/50' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* 모든 항목 체크 완료 메시지 */}
      {allChecked && (
        <div className="mb-4 rounded-md border border-teal-600/20 bg-teal-900/10 px-3 py-3">
          <p className="text-sm font-semibold text-teal-300">
            최종 확인 완료 — 하지만 저장 권한은 아직 열리지 않았습니다
          </p>
          <p className="mt-1 text-xs text-teal-400/70">
            실제 Test DB 저장은 별도 Task와 별도 사용자 승인 후에만 가능합니다.
          </p>
        </div>
      )}

      {/* 안전 불변 조건 */}
      <div className="rounded-md border border-slate-700/40 bg-slate-800/20 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-400">
          모든 항목 체크 후에도 실행되지 않는 것
        </p>
        <ul className="space-y-0.5 text-[11px] text-slate-500">
          <li>• 실제 Naver API 호출 없음</li>
          <li>• 실제 token 발급 없음 — 실제 token 발급은 아직 구현되지 않았습니다</li>
          <li>• Test DB write 없음 (미래 별도 Task에서만 가능)</li>
          <li>• 운영 DB write 없음</li>
          <li>• Go Ticket 발급 없음</li>
          <li>• Execution Lease 발급 없음</li>
          <li>• saved=false · dbWriteExecuted=false · prismaMutationExecuted=false</li>
        </ul>
      </div>

      <p className="mt-3 text-[10px] text-slate-700">
        Local-only final confirmation · 새로고침하면 초기화됩니다 · 저장 버튼은 이번 Task에 없습니다.
      </p>
    </div>
    <GoTicketSaveExecutionGatePanel
      dryRunResult={dryRunResult}
      finalConfirmationAllChecked={allChecked}
      finalConfirmationCheckedCount={checkedCount}
    />
    </>
  );
}
