'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertTriangle, List, RefreshCw, Search } from 'lucide-react';

type DraftBatchStatusFilter = 'DRAFT' | 'APPROVED' | 'ALL';
type DraftBatchSortOption = 'default' | 'blocked' | 'risk';
type DraftBatchRiskFilter = 'all' | 'blocked' | 'risk' | 'clean';

type DraftBatchListItem = {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
  summary?: {
    receivedCount?: number;
    selectedCount?: number;
    executableCount?: number;
    riskCount?: number;
    blockedCount?: number;
    uploadContextCount?: number;
    dbContextCount?: number;
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

const SORT_OPTIONS: Array<{
  value: DraftBatchSortOption;
  label: string;
}> = [
  { value: 'default', label: '기본순' },
  { value: 'blocked', label: '차단 우선' },
  { value: 'risk', label: '위험 우선' },
];

const RISK_FILTER_OPTIONS: Array<{
  value: DraftBatchRiskFilter;
  label: string;
}> = [
  { value: 'all', label: '전체' },
  { value: 'blocked', label: '차단 있음' },
  { value: 'risk', label: '위험 있음' },
  { value: 'clean', label: '문제 없음' },
];

function parseStatusFilter(value: string | null): DraftBatchStatusFilter {
  if (value === 'APPROVED' || value === 'ALL' || value === 'DRAFT') {
    return value;
  }

  return 'DRAFT';
}

function parseSortOption(value: string | null): DraftBatchSortOption {
  if (value === 'blocked' || value === 'risk' || value === 'default') {
    return value;
  }

  return 'default';
}

function parseRiskFilter(value: string | null): DraftBatchRiskFilter {
  if (value === 'blocked' || value === 'risk' || value === 'clean' || value === 'all') {
    return value;
  }

  return 'all';
}

function getRiskFilterLabel(riskFilter: DraftBatchRiskFilter) {
  return RISK_FILTER_OPTIONS.find((option) => option.value === riskFilter)?.label ?? '전체';
}

function getFilterSummary(status: DraftBatchStatusFilter) {
  if (status === 'APPROVED') {
    return {
      badgeLabel: 'APPROVED 조회',
      badgeClassName: 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
      title: '승인 완료 Batch',
      description: '승인 완료되었지만 아직 실행 전인 Batch입니다.',
      helper: '승인 완료 상태이며, 아직 네이버 반영/실행 단계가 아닙니다.',
    };
  }

  if (status === 'ALL') {
    return {
      badgeLabel: '전체 조회',
      badgeClassName: 'border border-indigo-500/30 bg-indigo-500/15 text-indigo-300',
      title: '전체 Batch',
      description: 'DRAFT와 APPROVED Batch 전체를 함께 보여줍니다.',
      helper: '검토 중 Batch와 승인 완료 Batch를 함께 보여줍니다.',
    };
  }

  return {
    badgeLabel: 'DRAFT 조회',
    badgeClassName: 'border border-amber-500/30 bg-amber-500/15 text-amber-300',
    title: '검토 저장 Batch',
    description: '검토 저장 후 아직 승인되지 않은 Batch입니다.',
    helper: '검토 후 승인할 수 있는 저장된 Batch입니다.',
  };
}

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

function getRowSummaryBadges(job: DraftBatchListItem) {
  const blockedCount = job.summary?.blockedCount ?? 0;
  const riskCount = job.summary?.riskCount ?? 0;

  if (blockedCount <= 0 && riskCount <= 0) {
    return [
      {
        key: 'clean',
        label: '문제 없음',
        className: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
      },
    ];
  }

  return [
    ...(blockedCount > 0
      ? [{
        key: 'blocked',
        label: `차단 ${blockedCount}`,
        className: 'border border-red-500/30 bg-red-500/15 text-red-300',
      }]
      : []),
    ...(riskCount > 0
      ? [{
        key: 'risk',
        label: `위험 ${riskCount}`,
        className: 'border border-amber-500/30 bg-amber-500/15 text-amber-300',
      }]
      : []),
  ];
}

function DraftBatchesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<DraftBatchListItem[]>([]);
  const [refreshToken, setRefreshToken] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statusFilter = parseStatusFilter(searchParams.get('status'));
  const sortOption = parseSortOption(searchParams.get('sort'));
  const riskFilter = parseRiskFilter(searchParams.get('riskFilter'));
  const filterSummary = getFilterSummary(statusFilter);
  const filteredAndSortedJobs = jobs
    .map((job, index) => ({ job, index }))
    .filter(({ job }) => {
      const blockedCount = job.summary?.blockedCount ?? 0;
      const riskCount = job.summary?.riskCount ?? 0;

      if (riskFilter === 'blocked') return blockedCount > 0;
      if (riskFilter === 'risk') return riskCount > 0;
      if (riskFilter === 'clean') return blockedCount === 0 && riskCount === 0;
      return true;
    })
    .sort((left, right) => {
      if (sortOption === 'blocked') {
        const blockedDiff = (right.job.summary?.blockedCount ?? 0) - (left.job.summary?.blockedCount ?? 0);
        if (blockedDiff !== 0) return blockedDiff;
      }

      if (sortOption === 'risk') {
        const riskDiff = (right.job.summary?.riskCount ?? 0) - (left.job.summary?.riskCount ?? 0);
        if (riskDiff !== 0) return riskDiff;
      }

      return left.index - right.index;
    })
    .map(({ job }) => job);
  const jobCount = filteredAndSortedJobs.length;
  const totalItemCount = filteredAndSortedJobs.reduce((sum, job) => sum + job.itemCount, 0);
  const totalBlockedItemCount = filteredAndSortedJobs.reduce(
    (sum, job) => sum + (job.summary?.blockedCount ?? 0),
    0,
  );
  const totalRiskItemCount = filteredAndSortedJobs.reduce(
    (sum, job) => sum + (job.summary?.riskCount ?? 0),
    0,
  );

  const updateQuery = (
    nextStatus: DraftBatchStatusFilter,
    nextSort: DraftBatchSortOption,
    nextRiskFilter: DraftBatchRiskFilter,
  ) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('status', nextStatus);
    nextParams.set('sort', nextSort);
    nextParams.set('riskFilter', nextRiskFilter);
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const updateStatusFilter = (nextStatus: DraftBatchStatusFilter) => {
    updateQuery(nextStatus, sortOption, riskFilter);
  };

  const updateSortOption = (nextSort: DraftBatchSortOption) => {
    updateQuery(statusFilter, nextSort, riskFilter);
  };

  const updateRiskFilter = (nextRiskFilter: DraftBatchRiskFilter) => {
    updateQuery(statusFilter, sortOption, nextRiskFilter);
  };

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
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className={`rounded-full px-2.5 py-1 font-semibold ${filterSummary.badgeClassName}`}>
                {filterSummary.badgeLabel}
              </span>
              <span className="text-gray-300">{filterSummary.title}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">{filterSummary.description}</span>
            </div>
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
                onClick={() => updateStatusFilter(option.value)}
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
            기본 조회: 잘못된 status는 DRAFT / sort는 default / riskFilter는 all
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#262629] bg-[#121214] p-3">
          <span className="text-sm font-medium text-gray-300">위험 서브필터</span>
          {RISK_FILTER_OPTIONS.map((option) => {
            const selected = riskFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateRiskFilter(option.value)}
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
            현재 서브필터: {getRiskFilterLabel(riskFilter)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#262629] bg-[#121214] p-3">
          <span className="text-sm font-medium text-gray-300">정렬</span>
          {SORT_OPTIONS.map((option) => {
            const selected = sortOption === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateSortOption(option.value)}
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
            현재 정렬: {sortOption}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-lg border border-[#262629] bg-[#121214] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">현재 필터</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${filterSummary.badgeClassName}`}>
                {filterSummary.badgeLabel}
              </span>
              <span className="text-sm font-medium text-white">{filterSummary.title}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{filterSummary.helper}</p>
            <p className="mt-1 text-xs text-gray-500">
              위험 서브필터: {getRiskFilterLabel(riskFilter)}
            </p>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#121214] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Batch 수</p>
            <p className="mt-2 text-2xl font-bold text-white">{jobCount.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-400">현재 필터 기준으로 조회된 Batch 개수입니다.</p>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#121214] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">전체 Item 수</p>
            <p className="mt-2 text-2xl font-bold text-white">{totalItemCount.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-400">현재 목록에 포함된 item 수 합계입니다.</p>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#121214] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">차단 / 실행 불가 Item 수</p>
            <p className="mt-2 text-2xl font-bold text-red-300">{totalBlockedItemCount.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-400">
              저장된 `previewSummary.blockedCount` 합계 기준입니다.
            </p>
          </div>

          <div className="rounded-lg border border-[#262629] bg-[#121214] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">위험 / 확인 필요 Item 수</p>
            <p className="mt-2 text-2xl font-bold text-amber-300">{totalRiskItemCount.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-400">
              저장된 `previewSummary.riskCount` 합계 기준입니다.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[#262629] bg-[#121214] p-4 text-sm text-gray-400">
          <p className="font-medium text-gray-300">요약 기준</p>
          <ul className="mt-2 space-y-1">
            <li>- 차단 / 실행 불가 Item 수는 각 Batch의 `previewSummary.blockedCount`를 합산합니다.</li>
            <li>- 위험 / 확인 필요 Item 수는 각 Batch의 `previewSummary.riskCount`를 합산합니다.</li>
            <li>- APPROVED 상태에서도 이 값은 승인 전 dry-run 기준 참고용 요약이며, 실행 결과를 뜻하지 않습니다.</li>
          </ul>
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
              {loading && filteredAndSortedJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    목록을 불러오는 중입니다...
                  </td>
                </tr>
              ) : filteredAndSortedJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    {jobs.length > 0
                      ? `${getRiskFilterLabel(riskFilter)} 조건에 맞는 Batch가 없습니다.`
                      : statusFilter === 'APPROVED'
                        ? 'APPROVED 상태의 Batch가 없습니다.'
                        : statusFilter === 'ALL'
                          ? '조회 가능한 Batch가 없습니다.'
                          : 'DRAFT 상태의 Batch가 없습니다.'}
                  </td>
                </tr>
              ) : (
                filteredAndSortedJobs.map((job) => {
                  const badge = getStatusBadge(job.status);
                  const summaryBadges = getRowSummaryBadges(job);
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
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {summaryBadges.map((summaryBadge) => (
                                <span
                                  key={summaryBadge.key}
                                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${summaryBadge.className}`}
                                >
                                  {summaryBadge.label}
                                </span>
                              ))}
                            </div>
                            <p className="text-[11px] text-gray-500">
                              dry-run 기준 참고값
                            </p>
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

export default function DraftBatchesPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-6 text-gray-400">목록을 불러오는 중입니다...</div>}>
      <DraftBatchesContent />
    </Suspense>
  );
}
