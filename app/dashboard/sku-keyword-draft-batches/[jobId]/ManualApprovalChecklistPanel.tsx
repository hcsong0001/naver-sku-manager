'use client';

import { useState } from 'react';
import { buildManualApprovalChecklistView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-manual-approval-checklist-view.service';

const CHECKLIST_VIEW = buildManualApprovalChecklistView();

const SAFETY_INVARIANTS = [
  { label: 'Actual Naver API call', value: 'false' },
  { label: 'Token issued', value: 'false' },
  { label: 'DB write executed', value: 'false' },
  { label: 'Go Ticket issued', value: 'false' },
  { label: 'Execution Lease issued', value: 'false' },
  { label: 'Live execution enabled', value: 'false' },
] as const;

export function ManualApprovalChecklistPanel() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const total = CHECKLIST_VIEW.checklistItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const allChecked = checkedCount === total;

  function toggle(key: string) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function resetAll() {
    setChecked({});
  }

  return (
    <div className="mb-6 rounded-lg border border-[#262629] bg-[#121214] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <span className="text-slate-400">☑</span>
          Manual Approval Checklist
          <span className="ml-1 rounded-full border border-slate-600 bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
            Local-only review
          </span>
        </h2>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-sm border border-slate-600 bg-slate-700/40 px-2 py-1 text-xs text-slate-400 hover:bg-slate-700 hover:text-slate-300 transition-colors"
        >
          로컬 체크 초기화
        </button>
      </div>

      {/* 안내 */}
      <p className="mb-3 text-xs text-slate-500">
        Read-only · Local-only checklist — 체크 상태는 이 브라우저 탭에서만 유지되며 저장되지 않습니다.
        실제 승인, 저장, 실행 버튼은 없습니다.
      </p>

      {/* 진행 상태 배너 */}
      {allChecked ? (
        <div className="mb-3 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          검토 완료 — 하지만 실행 권한은 아직 열리지 않았습니다
        </div>
      ) : (
        <div className="mb-3 rounded-md border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-300">
          검토 진행 중 — 모든 항목 확인 필요 ({checkedCount}/{total})
        </div>
      )}

      {/* 14개 체크박스 항목 */}
      <ul className="mb-4 space-y-2">
        {CHECKLIST_VIEW.checklistItems.map((item, idx) => (
          <li key={item.key}>
            <label className="flex cursor-pointer items-start gap-2 rounded-sm px-2 py-1.5 hover:bg-slate-800/40 transition-colors">
              <input
                type="checkbox"
                checked={!!checked[item.key]}
                onChange={() => toggle(item.key)}
                className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-emerald-400"
              />
              <span className={`text-xs leading-relaxed ${checked[item.key] ? 'text-emerald-400 line-through decoration-emerald-700' : 'text-gray-300'}`}>
                <span className="mr-1 text-slate-600">{idx + 1}.</span>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* 안전 상태 불변 조건 */}
      <div className="rounded-md border border-slate-700/40 bg-slate-800/20 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-400">안전 상태 불변 조건 (항상 false)</p>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {SAFETY_INVARIANTS.map(inv => (
            <div
              key={inv.label}
              className="flex items-center justify-between rounded-sm border border-slate-700/30 bg-slate-900/40 px-2 py-1"
            >
              <span className="truncate text-[10px] text-slate-500" title={inv.label}>{inv.label}</span>
              <span className="ml-1 flex-shrink-0 text-[10px] font-semibold text-emerald-400">{inv.value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[10px] text-slate-600">
        다음 단계는 별도 사용자 승인 후 Test DB 또는 명시된 안전 환경에서만 진행 가능합니다.
        실제 token 발급 요청은 아직 구현되어 있지 않습니다.
      </p>
    </div>
  );
}
