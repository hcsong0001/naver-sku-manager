'use client';

import { useState } from 'react';
import type { DisabledAdapterResult } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-disabled-adapter.service';

interface GoTicketSaveDisabledAdapterPanelProps {
  gateStatus: string;
}

type AdapterRouteResponse = {
  ok: false;
  rejected: true;
  saved: false;
  writeDisabled: true;
  requiresExplicitUserApproval: true;
  testDbWriteExecuted: false;
  operatingDbWriteExecuted: false;
  dbWriteExecuted: false;
  prismaMutationExecuted: false;
  goTicketIssued: false;
  tokenIssued: false;
  naverApiCallExecuted: false;
  adapterStatus?: string;
  statusMessage?: string;
};

const disabledFlagRows: [string, string][] = [
  ['ok', 'false'],
  ['rejected', 'true'],
  ['saved', 'false'],
  ['writeDisabled', 'true'],
  ['requiresExplicitUserApproval', 'true'],
  ['testDbWriteExecuted', 'false'],
  ['dbWriteExecuted', 'false'],
  ['prismaMutationExecuted', 'false'],
  ['goTicketIssued', 'false'],
  ['tokenIssued', 'false'],
  ['naverApiCallExecuted', 'false'],
];

export function GoTicketSaveDisabledAdapterPanel({
  gateStatus,
}: GoTicketSaveDisabledAdapterPanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdapterRouteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckDisabledStatus() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(
        '/api/sku-keyword-final-approvals/naver-auth-token-first-test/save-disabled',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gateStatus }),
        },
      );
      const data = (await response.json()) as AdapterRouteResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }

  const isReady = gateStatus === 'READY_FOR_NEXT_TASK_TEST_DB_SAVE_ONLY';

  return (
    <div className="mb-6 rounded-lg border border-amber-800/20 bg-[#080806] p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-amber-500">⊘</span>
        <h2 className="text-base font-semibold text-white">
          Test DB Save Disabled Adapter
        </h2>
        <span className="ml-1 rounded-full border border-amber-700 bg-amber-900/20 px-2 py-0.5 text-[10px] text-amber-400">
          Explicit Approval Required
        </span>
      </div>

      {/* 상태 배너 */}
      <div className="mb-3 rounded-md border border-amber-600/20 bg-amber-950/10 px-3 py-2 text-xs text-amber-300">
        {isReady
          ? 'Gate PASS 상태이지만 저장 어댑터는 여전히 비활성화 상태입니다. 명시적 사용자 승인 후 별도 Task에서만 Test DB 저장 가능.'
          : 'Gate가 아직 READY 상태가 아닙니다. 저장 어댑터는 비활성화 상태입니다.'}
      </div>

      {/* 현재 Gate 상태 표시 */}
      <div className="mb-3 rounded-md border border-slate-700/30 bg-slate-900/20 px-3 py-2">
        <p className="mb-1 text-[11px] font-semibold text-slate-400">현재 Gate 상태</p>
        <code className={`text-xs font-mono font-bold ${isReady ? 'text-emerald-400' : 'text-slate-400'}`}>
          {gateStatus}
        </code>
        {isReady && (
          <p className="mt-1 text-[10px] text-amber-500">
            ↳ Gate PASS여도 저장 어댑터는 여전히 비활성화 — writeDisabled=true 유지
          </p>
        )}
      </div>

      {/* 저장 불가 상태 확인 버튼 */}
      <div className="mb-3">
        <button
          type="button"
          onClick={handleCheckDisabledStatus}
          disabled={loading}
          className="rounded-md border border-amber-700/50 bg-amber-900/20 px-4 py-2 text-sm text-amber-300 transition-colors hover:bg-amber-900/40 hover:border-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? '확인 중...' : '저장 불가 상태 확인'}
        </button>
        <p className="mt-1 text-[10px] text-slate-600">
          ※ 이 버튼은 저장 버튼이 아닙니다 — 저장 불가 상태를 서버에서 확인합니다
        </p>
      </div>

      {/* 오류 표시 */}
      {error && (
        <div className="mb-3 rounded-md border border-rose-800/20 bg-rose-950/10 px-3 py-2">
          <p className="text-xs text-rose-400">오류: {error}</p>
        </div>
      )}

      {/* 서버 응답 결과 */}
      {result && (
        <div className="mb-3 rounded-md border border-amber-700/20 bg-amber-950/10 p-3">
          <p className="mb-2 text-[11px] font-semibold text-amber-400">
            서버 응답 — 저장 불가 확인
          </p>

          {/* 핵심 플래그 */}
          <div className="mb-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {disabledFlagRows.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-sm border border-slate-800/40 bg-slate-900/50 px-2 py-1"
              >
                <span className="truncate text-[11px] text-slate-500 mr-2">{key}</span>
                <span className={`flex-shrink-0 text-[11px] font-mono font-semibold ${key === 'ok' || key === 'saved' || key === 'rejected' || key === 'writeDisabled' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* adapterStatus */}
          {result.adapterStatus && (
            <div className="mb-2 rounded-md border border-slate-700/30 bg-slate-900/20 px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-slate-400">adapterStatus</p>
              <code className="text-xs font-mono text-amber-300">{result.adapterStatus}</code>
            </div>
          )}

          {/* statusMessage */}
          {result.statusMessage && (
            <div className="rounded-md border border-slate-700/30 bg-slate-900/20 px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-slate-400">statusMessage</p>
              <p className="text-xs text-slate-300">{result.statusMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* 안전 안내 */}
      <div className="rounded-md border border-slate-700/40 bg-slate-800/20 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-400">
          이 Adapter가 항상 차단하는 것
        </p>
        <ul className="space-y-0.5 text-[11px] text-slate-500">
          <li>• Test DB 저장 — 명시적 사용자 승인 없이 불가</li>
          <li>• 운영 DB write — 항상 금지</li>
          <li>• 실제 Naver API 호출 — 항상 금지</li>
          <li>• 실제 token 발급 — 항상 금지</li>
          <li>• Go Ticket 발급 — 아직 구현되지 않음</li>
          <li>• Execution Lease 발급 — 아직 구현되지 않음</li>
          <li>• 저장 버튼 — 이번 Task에서 존재하지 않음</li>
        </ul>
      </div>

      <p className="mt-3 text-[10px] text-slate-700">
        Test DB Save Disabled Adapter · writeDisabled=true · requiresExplicitUserApproval=true · 다음 Task에서만 저장 구현 가능
      </p>
    </div>
  );
}
