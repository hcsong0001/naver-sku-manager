'use client';

import { useState } from 'react';
import { buildGoTicketSavePreviewView } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-preview-view.service';

interface GoTicketSavePreviewPanelProps {
  allChecklistChecked: boolean;
  checkedCount: number;
  jobId?: string;
  readinessStatus?: string;
}

export function GoTicketSavePreviewPanel({
  allChecklistChecked,
  checkedCount,
  jobId,
  readinessStatus,
}: GoTicketSavePreviewPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  const viewModel = buildGoTicketSavePreviewView({
    jobId,
    checklistCheckedCount: checkedCount,
    readinessStatus,
  });

  const { preview } = viewModel;

  const previewRows: [string, string][] = [
    ['jobId', preview.jobId],
    ['previewMode', String(preview.previewMode)],
    ['localOnly', String(preview.localOnly)],
    ['readOnly', String(preview.readOnly)],
    ['checklistTotalCount', String(preview.checklistTotalCount)],
    ['checklistCheckedCount', String(preview.checklistCheckedCount)],
    ['allChecklistChecked', String(preview.allChecklistChecked)],
    ['readinessStatus', preview.readinessStatus],
    ['saveTarget', preview.saveTarget],
    ['dbWriteExecuted', String(preview.dbWriteExecuted)],
    ['prismaMutationExecuted', String(preview.prismaMutationExecuted)],
    ['goTicketIssued', String(preview.goTicketIssued)],
    ['executionLeaseIssued', String(preview.executionLeaseIssued)],
    ['tokenIssued', String(preview.tokenIssued)],
    ['naverApiCallAllowed', String(preview.naverApiCallAllowed)],
    ['liveExecutionEnabled', String(preview.liveExecutionEnabled)],
  ];

  if (!allChecklistChecked) {
    return (
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#0f0f11] p-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">▣</span>
          <h2 className="text-base font-semibold text-slate-500">Test DB Save Preview</h2>
          <span className="ml-1 rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
            No-write preview
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-600">
          체크리스트 완료 후 preview 확인 가능 — 모든 14개 항목을 체크하면 저장 전 미리보기가 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg border border-slate-600/30 bg-[#0f0f11] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <span className="text-slate-400">▣</span>
          Test DB Save Preview
          <span className="ml-1 rounded-full border border-slate-600 bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
            No-write preview
          </span>
        </h2>
        <button
          type="button"
          onClick={() => setCollapsed(prev => !prev)}
          className="rounded-sm border border-slate-600 bg-slate-700/40 px-2 py-1 text-xs text-slate-400 hover:bg-slate-700 hover:text-slate-300 transition-colors"
        >
          {collapsed ? 'preview 펼치기' : 'preview 접기'}
        </button>
      </div>

      {/* 안내 배너 */}
      <div className="mb-3 rounded-md border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs text-sky-300">
        저장 전 미리보기 — 현재 화면에서는 저장하지 않습니다. 실제 저장은 별도 Task 필요.
      </div>

      {!collapsed && (
        <>
          {/* Preview 메타데이터 */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold text-slate-400">저장될 수 있는 승인 이벤트 Preview</p>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {previewRows.map(([key, value]) => {
                const isFalse = value === 'false';
                const isTrue = value === 'true';
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-sm border border-slate-700/30 bg-slate-900/60 px-2 py-1"
                  >
                    <span className="truncate text-[11px] text-slate-500 mr-2" title={key}>{key}</span>
                    <span
                      className={`flex-shrink-0 text-[11px] font-mono font-semibold ${isFalse ? 'text-emerald-400' : isTrue ? 'text-sky-300' : 'text-slate-300'}`}
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* nextRequiredAction */}
          <div className="mb-3 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3">
            <p className="mb-1 text-xs font-semibold text-indigo-300">nextRequiredAction</p>
            <p className="text-xs text-indigo-200">{preview.nextRequiredAction}</p>
          </div>

          {/* 안전 불변 조건 요약 */}
          <div className="rounded-md border border-slate-700/40 bg-slate-800/20 p-3">
            <p className="mb-2 text-xs font-semibold text-slate-400">이 preview에서 실행되지 않은 것</p>
            <ul className="space-y-0.5 text-[11px] text-slate-500">
              <li>• 실제 Naver API 호출 없음</li>
              <li>• 실제 token 발급 없음</li>
              <li>• Test DB write 없음 (미래 Task에서만 가능)</li>
              <li>• 운영 DB write 없음</li>
              <li>• Go Ticket 발급 없음</li>
              <li>• Execution Lease 발급 없음</li>
              <li>• 실제 token 발급 요청은 아직 구현되지 않았습니다</li>
            </ul>
          </div>
        </>
      )}

      <p className="mt-3 text-[10px] text-slate-600">
        Local-only preview · 새로고침하면 초기화됩니다 · 실제 저장은 별도 사용자 승인 후 전용 Task에서 진행합니다.
      </p>
    </div>
  );
}
