'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, List, RefreshCw, Search } from 'lucide-react';

type DraftBatchStatusFilter = 'DRAFT' | 'APPROVED' | 'ALL';

type DraftBatchListItem = {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
  summary?: {
    riskCount?: number;
    blockedCount?: number;
  };
};

type DraftBatchListResponse =
  | {
    ok: true;
    status: DraftBatchStatusFilter;
    jobs: DraftBatchListItem[];
  }
  | {
    ok: false;
    error?: string;
  };

const STATUS_OPTIONS: Array<{
  value: DraftBatchStatusFilter;
  label: string;
}> = [
  { value: 'DRAFT', label: 'DRAFT' },
  { value: 'APPROVED', label: 'APPROVED' },
  { value: 'ALL', label: '전체' },
];

function getStatusBadge(jobStatus: string) {
  if (jobStatus === 'DRAFT') {
    return {
      label: '검토 전',
      className: 'border border-amber-500/30 bg-amber-500/15 text-amber-300',
    };
  }

  if (jobStatus === 'APPROVED') {
    return {
      label: '승인 완료',
      className: 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
    };
  }

  return {
    label: jobStatus,
    className: 'border border-slate-500/30 bg-slate-500/20 text-slate-300',
  };
}

export default function DraftBatchesPage() {
  const [jobs, setJobs] = useState<DraftBatchListItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<DraftBatchStatusFilter>('DRAFT');
  const [refreshToken, setRefreshToken] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/sku-matching/draft-batch?status=${statusFilter}`);
        const data = (await response.json()) as DraftBatchListResponse;

        if (!response.ok || !data.ok) {
          throw new Error(data.ok ? 'Batch 목록 조회에 실패했습니다.' : data.error || 'Batch 목록 조회에 실패했습니다.');
        }

        if (!cancelled) {
          setJobs(data.jobs);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchJobs();

    return () => {
      cancelled = true;
    };
  }, [statusFilter, refreshToken]);

  return (
    <div className="flex h-full flex-col p-6 text-gray-100">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
              <List className="h-6 w-6 text-indigo-400" />
              SKU Keyword Draft Batch 조회
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              이 화면은 Batch 조회 전용입니다.
              <br />
              네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRefreshToken((current) => current + 1)}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg border border-indigo-500/50 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            새로고침
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#262629] bg-[#121214] p-3">
          <span className="text-sm font-medium text-gray-300">상태 필터</span>
          {STATUS_OPTIONS.map((option) => {
            const selected = statusFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setStatusFilter(option.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  selected
                    ? 'border border-indigo-500/40 bg-indigo-500/20 text-indigo-200'
                    : 'border border-[#2b2b30] bg-[#18181b] text-gray-300 hover:border-indigo-500/30 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-gray-500">
            기본 조회: DRAFT
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>{error}</div>
        </div>
      )}

      <div className="flex-1 overflow-hidden rounded-lg border border-[#262629] bg-[#121214]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="border-b border-[#262629] bg-[#18181b] text-xs font-semibold uppercase text-gray-400">
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
                    목록을 불러오는 중입니다...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    {statusFilter === 'APPROVED'
                      ? 'APPROVED 상태의 Batch가 없습니다.'
                      : statusFilter === 'ALL'
                        ? '조회 가능한 Batch가 없습니다.'
                        : 'DRAFT 상태의 Batch가 없습니다.'}
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const badge = getStatusBadge(job.status);
                  return (
                    <tr key={job.id} className="transition-colors hover:bg-[#18181b]">
                      <td className="px-4 py-3 font-mono text-xs">{job.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
                            {badge.label}
                          </span>
                          <span className="font-mono text-[11px] text-gray-500">{job.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{job.itemCount}건</td>
                      <td className="px-4 py-3 text-xs">
                        {job.summary ? (
                          <div className="flex gap-2">
                            {(job.summary.riskCount ?? 0) > 0 && (
                              <span className="text-amber-400">Risk: {job.summary.riskCount}</span>
                            )}
                            {(job.summary.blockedCount ?? 0) > 0 && (
                              <span className="text-red-400">Blocked: {job.summary.blockedCount}</span>
                            )}
                            {(job.summary.riskCount ?? 0) === 0 && (job.summary.blockedCount ?? 0) === 0 && (
                              <span className="text-gray-500">-</span>
                            )}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">{new Date(job.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{new Date(job.updatedAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          href={`/dashboard/sku-keyword-draft-batches/${job.id}`}
                          className="inline-flex items-center text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                          <Search className="mr-1 h-4 w-4" />
                          상세 보기
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
