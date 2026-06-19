'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Search, List, AlertTriangle } from 'lucide-react';

export default function DraftBatchesPage() {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/sku-matching/draft-batch');
      if (!res.ok) {
        throw new Error('Failed to fetch draft batches');
      }
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.error || 'Unknown error');
      }
      setJobs(data.jobs);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchJobs();
  }, []);

  return (
    <div className="flex h-full flex-col p-6 text-gray-100">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <List className="h-6 w-6 text-indigo-400" />
            SKU Keyword DRAFT Batch 검토
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            이 화면은 DRAFT 상태의 Batch를 조회하는 화면입니다.<br/>
            네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다.
          </p>
        </div>
        <button
          onClick={() => void fetchJobs()}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg border border-indigo-500/50 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20 disabled:opacity-50"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      <div className="flex-1 rounded-lg border border-[#262629] bg-[#121214] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#18181b] text-xs font-semibold uppercase text-gray-400 border-b border-[#262629]">
              <tr>
                <th className="px-4 py-3">Batch ID</th>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">항목 수</th>
                <th className="px-4 py-3">위험/경고 (Summary)</th>
                <th className="px-4 py-3">생성일시</th>
                <th className="px-4 py-3">수정일시</th>
                <th className="px-4 py-3 text-center">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262629]">
              {loading && jobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    DRAFT 상태의 Batch가 없습니다.
                  </td>
                </tr>
              ) : (
                jobs.map(job => (
                  <tr key={job.id} className="hover:bg-[#18181b] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{job.id}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-500/20 px-2.5 py-0.5 text-xs font-semibold text-slate-300 border border-slate-500/30">
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{job.itemCount}건</td>
                    <td className="px-4 py-3 text-xs">
                      {job.summary ? (
                        <div className="flex gap-2">
                          {job.summary.riskCount > 0 && <span className="text-amber-400">Risk: {job.summary.riskCount}</span>}
                          {job.summary.blockedCount > 0 && <span className="text-red-400">Blocked: {job.summary.blockedCount}</span>}
                          {job.summary.riskCount === 0 && job.summary.blockedCount === 0 && <span className="text-gray-500">-</span>}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{new Date(job.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{new Date(job.updatedAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/dashboard/sku-keyword-draft-batches/${job.id}`}
                        className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <Search className="mr-1 h-4 w-4" />
                        상세 보기
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
