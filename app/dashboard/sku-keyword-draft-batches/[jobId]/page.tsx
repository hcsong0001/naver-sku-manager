'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, FileJson } from 'lucide-react';

export default function DraftBatchDetailPage(props: { params: Promise<{ jobId: string }> }) {
  const params = use(props.params);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/sku-matching/draft-batch/${params.jobId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch draft batch detail');
        }
        const data = await res.json();
        if (!data.ok) {
          throw new Error(data.error || 'Unknown error');
        }
        setJob(data.job);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params.jobId]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return <div className="p-6 text-gray-400">로딩 중...</div>;
  }

  if (error || !job) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>{error || 'Job not found'}</div>
        </div>
        <Link href="/dashboard/sku-keyword-draft-batches" className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300">
          <ArrowLeft className="mr-1 h-4 w-4" /> 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-6 text-gray-100">
      <div className="mb-6">
        <Link href="/dashboard/sku-keyword-draft-batches" className="mb-4 inline-flex items-center text-gray-400 hover:text-gray-300 text-sm">
          <ArrowLeft className="mr-1 h-4 w-4" /> DRAFT Batch 목록
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white">Batch 상세 검토</h1>
        <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
          <AlertTriangle className="mr-2 inline-block h-4 w-4" />
          이 Batch는 아직 DRAFT 상태입니다. 이 화면에서는 조회만 가능하며, 실행/승인/네이버 반영은 제공하지 않습니다.
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-[#121214] p-4 rounded-lg border border-[#262629]">
        <div>
          <p className="text-xs text-gray-500 mb-1">Batch ID</p>
          <p className="font-mono text-sm text-gray-300">{job.id}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">상태</p>
          <span className="rounded-full bg-slate-500/20 px-2 py-0.5 text-xs font-semibold text-slate-300 border border-slate-500/30">
            {job.status}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">항목 수</p>
          <p className="text-sm font-semibold">{job.itemCount}건</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">생성일시</p>
          <p className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">항목 목록 ({job.items?.length || 0}건)</h2>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {job.items?.map((item: any, index: number) => (
          <div key={item.id} className="rounded-lg border border-[#262629] bg-[#121214] overflow-hidden">
            <div className="p-4 border-b border-[#262629] bg-[#18181b]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
                  <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
                    {item.targetType}
                  </span>
                  <span className="text-sm font-mono text-gray-300">{item.targetId}</span>
                  {item.calculationType && (
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-300">
                      {item.calculationType}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <FileJson className="h-3.5 w-3.5" />
                  {expandedItems.has(item.id) ? 'JSON 닫기' : 'JSON 보기'}
                </button>
              </div>
            </div>

            <div className="p-4 grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300 border-b border-[#262629] pb-1">상품 정보 (Candidate)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">상품명</span>
                  <span className="col-span-2 text-gray-200">{item.candidateSummary?.productName || '-'}</span>
                  <span className="text-gray-500">매칭 키워드</span>
                  <span className="col-span-2 text-indigo-300 font-semibold">{item.candidateSummary?.keyword || '-'}</span>
                  <span className="text-gray-500">SKU/식별자</span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.sku || '-'}</span>
                  <span className="text-gray-500">바코드</span>
                  <span className="col-span-2 font-mono text-xs text-gray-400">{item.candidateSummary?.barcode || '-'}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300 border-b border-[#262629] pb-1">변경 예정 (Dry-run)</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">변경 항목</span>
                  <span className="col-span-2 font-semibold text-emerald-400">{item.candidateSummary?.changeType || '-'}</span>
                  
                  <span className="text-gray-500">가격 변경</span>
                  <span className="col-span-2 text-gray-200">
                    <span className="line-through text-gray-500">{item.dryRunSummary?.before?.price?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.price?.toLocaleString() || '-'}</span>
                  </span>
                  
                  <span className="text-gray-500">재고 변경</span>
                  <span className="col-span-2 text-gray-200">
                    <span className="line-through text-gray-500">{item.dryRunSummary?.before?.stock?.toLocaleString() || '-'}</span>
                    {' -> '}
                    <span className="font-semibold text-white">{item.dryRunSummary?.after?.stock?.toLocaleString() || '-'}</span>
                  </span>
                </div>
              </div>
            </div>

            {(item.dryRunSummary?.warnings?.length > 0 || item.dryRunSummary?.riskLevel || item.dryRunSummary?.blockedReasons?.length > 0) && (
              <div className="px-4 pb-4">
                <div className="rounded-md bg-[#1e1e24] p-3 text-sm">
                  <div className="flex gap-2">
                    <span className="font-semibold text-amber-400">Risk Level: {item.dryRunSummary?.riskLevel || 'NONE'}</span>
                  </div>
                  {item.dryRunSummary?.warnings?.map((w: string, i: number) => (
                    <div key={i} className="mt-1 text-xs text-amber-200/80">• {w}</div>
                  ))}
                  {item.dryRunSummary?.blockedReasons?.map((b: string, i: number) => (
                    <div key={i} className="mt-1 text-xs text-red-400">• BLOCKED: {b}</div>
                  ))}
                </div>
              </div>
            )}

            {expandedItems.has(item.id) && (
              <div className="border-t border-[#262629] p-4 bg-black/50 overflow-x-auto">
                <p className="text-xs text-gray-500 mb-2">requestPayload (Raw JSON)</p>
                <pre className="text-[10px] sm:text-xs text-green-400 font-mono">
                  {JSON.stringify(item.requestPayload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
