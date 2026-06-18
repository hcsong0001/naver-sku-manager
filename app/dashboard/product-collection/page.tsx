'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Play,
  RefreshCw,
  Save,
} from 'lucide-react';

type Smartstore = {
  id: string;
  name: string;
};

type CollectionJobStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
type CollectionJobItemStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
type CollectionScope =
  | 'ALL'
  | 'SALE'
  | 'SUSPENSION'
  | 'OUTOFSTOCK'
  | 'REG_PERIOD'
  | 'MOD_PERIOD';

type CollectionJobItem = {
  id: string;
  channelProductNo: string;
  originProductNo: string | null;
  productName: string | null;
  status: CollectionJobItemStatus;
  errorMessage: string | null;
  collectedAt: string | null;
  updatedAt: string;
};

type CollectionJob = {
  id: string;
  storeId: string;
  status: CollectionJobStatus;
  searchCondition: Record<string, unknown>;
  totalCount: number | null;
  collectedCount: number;
  successCount: number;
  failCount: number;
  currentPage: number;
  pageSize: number;
  startedAt: string | null;
  finishedAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  store?: { id: string; name: string };
  items?: CollectionJobItem[];
  _count?: { items: number };
};

type Message = { type: 'success' | 'error'; text: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(value: unknown, fallback: string): string {
  if (!isRecord(value) || typeof value.error !== 'string') return fallback;
  return value.error;
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

function statusLabel(status: CollectionJobStatus): string {
  const labels: Record<CollectionJobStatus, string> = {
    PENDING: '대기',
    RUNNING: '실행 중',
    COMPLETED: '완료',
    FAILED: '실패',
    CANCELLED: '취소',
  };
  return labels[status];
}

function statusClass(status: CollectionJobStatus): string {
  if (status === 'COMPLETED') return 'tms-status-success ring-emerald-500/20';
  if (status === 'RUNNING') return 'tms-status-warning ring-sky-500/20';
  if (status === 'FAILED') return 'tms-status-danger ring-red-500/20';
  return 'tms-status-muted ring-zinc-500/20';
}

function formatDateTime(value: string | null): string {
  if (!value) return '-';
  return new Date(value).toLocaleString('ko-KR');
}

function SummaryCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="tms-panel rounded-xl border border-[#262629] bg-[#0c0c0e]">
      <p className="text-[11px] font-medium text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

export default function ProductCollectionPage() {
  const [stores, setStores] = useState<Smartstore[]>([]);
  const [jobs, setJobs] = useState<CollectionJob[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedJob, setSelectedJob] = useState<CollectionJob | null>(null);
  const [scope, setScope] = useState<CollectionScope>('ALL');
  const [searchKeywordType, setSearchKeywordType] = useState('CHANNEL_PRODUCT_NAME');
  const [keyword, setKeyword] = useState('');
  const [sellerManagementCode, setSellerManagementCode] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [pageSize, setPageSize] = useState(500);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [running, setRunning] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const progressPercent = useMemo(() => {
    if (!selectedJob?.totalCount || selectedJob.totalCount <= 0) return 0;
    return Math.min(100, Math.round((selectedJob.collectedCount / selectedJob.totalCount) * 100));
  }, [selectedJob]);

  const loadStores = useCallback(async () => {
    const response = await fetch('/api/smartstores');
    const data = await readJson<Smartstore[]>(response);
    setStores(Array.isArray(data) ? data : []);
    if (Array.isArray(data) && data.length > 0 && !selectedStoreId) {
      setSelectedStoreId(data[0].id);
    }
  }, [selectedStoreId]);

  const loadJobs = useCallback(async () => {
    const response = await fetch('/api/products/collection-jobs');
    const data = await readJson<CollectionJob[]>(response);
    setJobs(Array.isArray(data) ? data : []);
    if (Array.isArray(data) && data.length > 0 && !selectedJobId) {
      setSelectedJobId(data[0].id);
    }
  }, [selectedJobId]);

  const loadJobDetail = useCallback(async (jobId: string) => {
    const response = await fetch(`/api/products/collection-jobs/${jobId}`);
    const data = await readJson<CollectionJob | { error: string }>(response);
    if (!response.ok) {
      throw new Error(getErrorMessage(data, '수집 작업 상세 조회에 실패했습니다.'));
    }
    setSelectedJob(data as CollectionJob);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      Promise.all([loadStores(), loadJobs()])
        .catch((error: unknown) => {
          const text = error instanceof Error ? error.message : '초기 데이터 조회에 실패했습니다.';
          setMessage({ type: 'error', text });
        })
        .finally(() => setLoading(false));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadJobs, loadStores]);

  useEffect(() => {
    if (!selectedJobId) return;

    const timer = window.setTimeout(() => {
      loadJobDetail(selectedJobId).catch((error: unknown) => {
        const text = error instanceof Error ? error.message : '수집 작업 상세 조회에 실패했습니다.';
        setMessage({ type: 'error', text });
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadJobDetail, selectedJobId]);

  useEffect(() => {
    if (!selectedJobId || selectedJob?.status !== 'RUNNING') return;

    const timer = window.setInterval(() => {
      loadJobDetail(selectedJobId).catch(() => undefined);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [loadJobDetail, selectedJobId, selectedJob?.status]);

  const buildSearchCondition = (forceAll = false): Record<string, unknown> => {
    const condition: Record<string, unknown> = {
      storeId: selectedStoreId,
      page: 1,
      size: pageSize,
    };

    if (!forceAll) {
      if (scope === 'SALE') condition.productStatusTypes = ['SALE'];
      if (scope === 'SUSPENSION') condition.productStatusTypes = ['SUSPENSION'];
      if (scope === 'OUTOFSTOCK') condition.productStatusTypes = ['OUTOFSTOCK'];
      if (scope === 'REG_PERIOD') condition.periodType = 'REG_DATE';
      if (scope === 'MOD_PERIOD') condition.periodType = 'MOD_DATE';
      if (keyword.trim()) {
        condition.searchKeywordType = searchKeywordType;
        condition.keyword = keyword.trim();
      }
      if (sellerManagementCode.trim()) {
        condition.sellerManagementCode = sellerManagementCode.trim();
      }
      if (fromDate) condition.fromDate = fromDate;
      if (toDate) condition.toDate = toDate;
    }

    return condition;
  };

  const createJob = async (forceAll = false): Promise<CollectionJob> => {
    if (!selectedStoreId) {
      throw new Error('스마트스토어를 선택하세요.');
    }

    const response = await fetch('/api/products/collection-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildSearchCondition(forceAll)),
    });
    const data = await readJson<CollectionJob | { error: string }>(response);

    if (!response.ok) {
      throw new Error(getErrorMessage(data, '수집 작업 생성에 실패했습니다.'));
    }

    return data as CollectionJob;
  };

  const handleCreateJob = async () => {
    setCreating(true);
    setMessage(null);

    try {
      const job = await createJob(false);
      setSelectedJobId(job.id);
      setSelectedJob(job);
      await loadJobs();
      setMessage({ type: 'success', text: '수집 작업이 생성되었습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : '수집 작업 생성에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setCreating(false);
    }
  };

  const runJob = async (jobId: string) => {
    setRunning(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/products/collection-jobs/${jobId}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await readJson<CollectionJob | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '수집 작업 실행에 실패했습니다.'));
      }

      setSelectedJob(data as CollectionJob);
      await loadJobs();
      setMessage({ type: 'success', text: '수집 작업 실행이 완료되었습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : '수집 작업 실행에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setRunning(false);
    }
  };

  const handleRunSelectedJob = async () => {
    if (!selectedJobId) {
      setMessage({ type: 'error', text: '실행할 수집 작업을 선택하세요.' });
      return;
    }

    await runJob(selectedJobId);
  };

  const handleCollectAll = async () => {
    setCreating(true);
    setMessage(null);

    try {
      const job = await createJob(true);
      setSelectedJobId(job.id);
      setSelectedJob(job);
      await loadJobs();
      setCreating(false);
      await runJob(job.id);
    } catch (error) {
      const text = error instanceof Error ? error.message : '전상품 수집 시작에 실패했습니다.';
      setMessage({ type: 'error', text });
      setCreating(false);
    }
  };

  const handleRetryFailed = async () => {
    if (!selectedJobId) {
      setMessage({ type: 'error', text: '재시도할 수집 작업을 선택하세요.' });
      return;
    }

    setRetrying(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/products/collection-jobs/${selectedJobId}/retry-failed`, {
        method: 'POST',
      });
      const data = await readJson<CollectionJob | { error: string }>(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, '실패 상품 재시도에 실패했습니다.'));
      }

      setSelectedJob(data as CollectionJob);
      await loadJobs();
      setMessage({ type: 'success', text: '실패 상품 재시도가 완료되었습니다.' });
    } catch (error) {
      const text = error instanceof Error ? error.message : '실패 상품 재시도에 실패했습니다.';
      setMessage({ type: 'error', text });
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            스마트스토어 상품 대량 수집
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            상품 목록 조회 API로 수집 대상을 만들고 기존 상세 수집 로직으로 저장합니다.
          </p>
        </div>

        <div className="tms-panel mb-6 rounded-2xl border border-[#262629] bg-[#121214]">
          <div className="tms-toolbar grid gap-4 lg:grid-cols-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">스마트스토어</label>
              <select
                value={selectedStoreId}
                onChange={(event) => setSelectedStoreId(event.target.value)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">수집 범위</label>
              <select
                value={scope}
                onChange={(event) => setScope(event.target.value as CollectionScope)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              >
                <option value="ALL">전상품</option>
                <option value="SALE">판매중</option>
                <option value="SUSPENSION">판매중지</option>
                <option value="OUTOFSTOCK">품절</option>
                <option value="REG_PERIOD">기간별 등록상품</option>
                <option value="MOD_PERIOD">기간별 수정상품</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">검색어 기준</label>
              <select
                value={searchKeywordType}
                onChange={(event) => setSearchKeywordType(event.target.value)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              >
                <option value="CHANNEL_PRODUCT_NAME">상품명</option>
                <option value="CHANNEL_PRODUCT_NO">채널 상품번호</option>
                <option value="ORIGIN_PRODUCT_NO">원상품번호</option>
                <option value="SELLER_MANAGEMENT_CODE">판매자관리코드</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">pageSize</label>
              <select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              >
                <option value={10}>10</option>
                <option value={100}>100</option>
                <option value={500}>500</option>
              </select>
            </div>
          </div>

          <div className="tms-toolbar mt-4 grid gap-4 lg:grid-cols-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">검색어</label>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">판매자관리코드</label>
              <input
                value={sellerManagementCode}
                onChange={(event) => setSellerManagementCode(event.target.value)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">시작일</label>
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">종료일</label>
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="tms-control w-full rounded-xl border border-[#333] bg-[#1a1a1e] text-sm outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="tms-toolbar mt-6 flex flex-wrap justify-end gap-3">
            <button
              onClick={handleCreateJob}
              disabled={creating || loading || !selectedStoreId}
              className="tms-button tms-button-secondary inline-flex items-center gap-2 rounded-xl border border-[#333] text-sm font-semibold hover:border-indigo-500/60 disabled:opacity-60"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              수집 작업 생성
            </button>
            <button
              onClick={handleRunSelectedJob}
              disabled={running || !selectedJobId}
              className="tms-button tms-button-primary inline-flex items-center gap-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60"
            >
              {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              수집 시작
            </button>
            <button
              onClick={handleCollectAll}
              disabled={creating || running || !selectedStoreId}
              className="tms-button tms-button-primary inline-flex items-center gap-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {creating || running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              전상품 수집
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/20 bg-red-500/10 text-red-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              {message.text}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="tms-panel rounded-2xl border border-[#262629] bg-[#121214]">
            <div className="border-b border-[#262629] px-5 py-4">
              <h2 className="text-lg font-semibold text-white">수집 작업</h2>
            </div>
            <div className="max-h-[640px] divide-y divide-[#1e1e22] overflow-y-auto">
              {jobs.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-zinc-500">
                  수집 작업이 없습니다.
                </div>
              ) : (
                jobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setSelectedJobId(job.id)}
                    className={`w-full px-5 py-4 text-left transition hover:bg-[#16161a] ${
                      selectedJobId === job.id ? 'tms-selected-row' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`truncate text-sm font-semibold ${selectedJobId === job.id ? 'tms-selected-text' : 'tms-text-primary'}`}>
                        {job.store?.name || job.storeId}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusClass(job.status)}`}>
                        {statusLabel(job.status)}
                      </span>
                    </div>
                    <div className={`mt-2 text-xs ${selectedJobId === job.id ? 'tms-selected-text' : 'tms-text-muted'}`}>
                      {formatDateTime(job.createdAt)} · {job._count?.items ?? job.collectedCount}건
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="tms-panel rounded-2xl border border-[#262629] bg-[#121214]">
              <div className="tms-toolbar mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">진행률</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {selectedJob ? `${statusLabel(selectedJob.status)} · ${formatDateTime(selectedJob.updatedAt)}` : '-'}
                  </p>
                </div>
                <button
                  onClick={handleRetryFailed}
                  disabled={retrying || !selectedJobId || !selectedJob || selectedJob.failCount === 0}
                  className="tms-button tms-button-secondary inline-flex items-center gap-2 rounded-xl border border-[#333] text-sm font-semibold hover:border-indigo-500/60 disabled:opacity-60"
                >
                  {retrying ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  실패 상품 재시도
                </button>
              </div>

              <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#0c0c0e]">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryCard label="총 상품 수" value={selectedJob?.totalCount ?? 0} />
                <SummaryCard label="수집 완료 수" value={selectedJob?.collectedCount ?? 0} />
                <SummaryCard label="성공 수" value={selectedJob?.successCount ?? 0} />
                <SummaryCard label="실패 수" value={selectedJob?.failCount ?? 0} />
                <SummaryCard label="현재 page" value={selectedJob?.currentPage ?? '-'} />
              </div>

              {selectedJob?.errorMessage && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {selectedJob.errorMessage}
                </div>
              )}
            </div>

            <div className="tms-panel rounded-2xl border border-[#262629] bg-[#121214]">
              <div className="border-b border-[#262629] px-6 py-4">
                <h2 className="text-lg font-semibold text-white">실패 목록</h2>
              </div>

              {!selectedJob?.items || selectedJob.items.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-zinc-500">
                  실패 상품이 없습니다.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="tms-table w-full text-left text-sm">
                    <thead className="bg-[#0c0c0e]">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-zinc-500">채널 상품번호</th>
                        <th className="px-4 py-3 text-xs font-medium text-zinc-500">원상품번호</th>
                        <th className="px-4 py-3 text-xs font-medium text-zinc-500">상품명</th>
                        <th className="px-4 py-3 text-xs font-medium text-zinc-500">오류</th>
                        <th className="px-4 py-3 text-xs font-medium text-zinc-500">수집시각</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e1e22]">
                      {selectedJob.items.map((item) => (
                        <tr key={item.id} className="hover:bg-[#16161a]">
                          <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-300">
                            {item.channelProductNo}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-400">
                            {item.originProductNo || '-'}
                          </td>
                          <td className="min-w-52 px-4 py-3 text-zinc-300">
                            {item.productName || '-'}
                          </td>
                          <td className="min-w-72 px-4 py-3 text-red-300">
                            {item.errorMessage || '-'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
                            {formatDateTime(item.collectedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
