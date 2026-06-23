'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileJson,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type AuditItemStatus = 'RECORDED_BUT_NOT_EXECUTABLE' | 'UNKNOWN';

type AuditDashboardItem = {
  id: string;
  batchJobId: string;
  finalApprovalId: string | null;
  auditCode: string;
  status: AuditItemStatus;
  recordedAt: string | null;
  actorId: string | null;
  acknowledgedItems: string[];
  missingAcknowledgements: string[];
  targetProductSummary: Record<string, unknown> | null;
  safePayloadSummary: Record<string, unknown> | null;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
  // extra fields added by API
  _batchJobStatus?: string;
  _updatedAt?: string;
};

type AuditDashboardSummary = {
  totalCount: number;
  latestRecordedAt: string | null;
  acknowledgedCompleteCount: number;
  missingAcknowledgementCount: number;
  recordedButNotExecutableCount: number;
  unknownStatusCount: number;
  naverApiCallAllowed: false;
  liveExecutionEnabled: false;
  operatingDbWriteAllowed: false;
  queueAllowed: false;
  workerAllowed: false;
  sanitized: true;
};

type AuditDashboardResponse =
  | {
      ok: true;
      mode: string;
      maxAllowedState: string;
      naverApiCallAllowed: false;
      liveExecutionEnabled: false;
      operatingDbWriteAllowed: false;
      queueAllowed: false;
      workerAllowed: false;
      items: AuditDashboardItem[];
      summary: AuditDashboardSummary;
      blockingReasons: string[];
      warnings: string[];
      sanitized: true;
    }
  | { ok: false; error?: string };

// ── Helper ────────────────────────────────────────────────────────────────────

function formatShortId(id: string | null | undefined): string {
  if (!id) return '-';
  return id.length > 16 ? `${id.substring(0, 16)}…` : id;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '-';
  try {
    return new Date(iso).toLocaleString('ko-KR');
  } catch {
    return iso;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LiveAuditDashboardPage() {
  const [data, setData] = useState<AuditDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        '/api/sku-keyword-final-approvals/live-single-test-approval-audits?limit=50'
      );
      const json = (await res.json()) as AuditDashboardResponse;
      if (!res.ok || !json.ok) {
        throw new Error(json.ok ? '조회에 실패했습니다.' : json.error || '조회에 실패했습니다.');
      }
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const items = data?.ok ? data.items : [];
  const summary = data?.ok ? data.summary : null;

  return (
    <div className="flex h-full flex-col p-6 text-gray-100">
      {/* ── Header ── */}
      <div className="mb-6">
        <Link
          href="/dashboard/sku-keyword-draft-batches"
          className="mb-4 inline-flex items-center text-sm text-gray-400 hover:text-gray-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Draft Batch 목록
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Live 단일 테스트 승인 감사 기록
            </h1>
            <p className="mt-1 text-sm text-gray-400">read-only 조회 전용 화면</p>
          </div>
          <button
            type="button"
            onClick={() => void fetchData()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            새로 고침
          </button>
        </div>

        {/* 안전 안내 배너 */}
        <div className="mt-4 rounded-md border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm text-indigo-200">
          <p className="flex items-start gap-2">
            <FileJson className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <span>
              Live 단일 테스트 승인 감사 기록 전용 조회 화면입니다. 이 화면은 실제 Naver API 호출, Live 실행, Queue, Worker와 연결되지 않습니다.
              환경 정보는 원문 URL이나 secret을 표시하지 않고 안전한 분류값만 표시합니다.
            </span>
          </p>
        </div>

        {/* 안전 상태 배지 */}
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
            <X className="mr-1 h-3 w-3" /> Naver API 호출 비활성화
          </div>
          <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
            <X className="mr-1 h-3 w-3" /> Live 실행 비활성화
          </div>
          <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
            <X className="mr-1 h-3 w-3" /> 운영 DB write 차단
          </div>
          <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
            <X className="mr-1 h-3 w-3" /> Queue 비활성화
          </div>
          <div className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-300">
            <X className="mr-1 h-3 w-3" /> Worker 비활성화
          </div>
          <div className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Secret 비노출
          </div>
        </div>
      </div>

      {/* ── 로딩 ── */}
      {loading && (
        <div className="flex items-center gap-2 py-8 text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>감사 기록을 불러오는 중입니다...</span>
        </div>
      )}

      {/* ── 오류 ── */}
      {!loading && error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {/* ── 요약 카드 ── */}
      {!loading && summary && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          <div className="rounded-lg border border-[#262629] bg-[#121214] p-3 text-center">
            <p className="text-xs text-gray-500">전체 감사 기록</p>
            <p className="mt-1 text-2xl font-bold text-white">{summary.totalCount}</p>
          </div>
          <div className="rounded-lg border border-[#262629] bg-[#121214] p-3 text-center">
            <p className="text-xs text-gray-500">ACK 완료</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">{summary.acknowledgedCompleteCount}</p>
          </div>
          <div className="rounded-lg border border-[#262629] bg-[#121214] p-3 text-center">
            <p className="text-xs text-gray-500">ACK 누락</p>
            <p className={`mt-1 text-2xl font-bold ${summary.missingAcknowledgementCount > 0 ? 'text-amber-400' : 'text-gray-500'}`}>
              {summary.missingAcknowledgementCount}
            </p>
          </div>
          <div className="rounded-lg border border-[#262629] bg-[#121214] p-3 text-center">
            <p className="text-xs text-gray-500">최근 기록 시각</p>
            <p className="mt-1 text-xs font-semibold text-gray-300">
              {summary.latestRecordedAt ? formatDate(summary.latestRecordedAt) : '-'}
            </p>
          </div>
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 text-center">
            <p className="text-[10px] text-gray-500">최대 허용 상태</p>
            <p className="mt-1 font-mono text-[9px] text-indigo-400">
              {data?.ok ? data.maxAllowedState : '-'}
            </p>
          </div>
        </div>
      )}

      {/* ── 빈 상태 ── */}
      {!loading && !error && items.length === 0 && (
        <div className="rounded-lg border border-[#262629] bg-[#121214] p-8 text-center">
          <FileJson className="mx-auto mb-3 h-10 w-10 text-gray-600" />
          <p className="font-semibold text-gray-300">아직 Live 단일 테스트 승인 감사 기록이 없습니다.</p>
          <p className="mt-1 text-sm text-gray-500">
            이 화면은 조회 전용이며, 실제 Live 실행과 연결되지 않습니다.
          </p>
          <Link
            href="/dashboard/sku-keyword-draft-batches"
            className="mt-4 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
          >
            Draft Batch 목록에서 승인 기록 저장 →
          </Link>
        </div>
      )}

      {/* ── 감사 기록 목록 ── */}
      {!loading && items.length > 0 && (
        <div className="rounded-lg border border-[#262629] bg-[#121214]">
          <div className="border-b border-[#262629] px-4 py-3">
            <p className="text-sm font-semibold text-white">
              감사 기록 목록
              <span className="ml-2 text-xs font-normal text-gray-500">({items.length}건, read-only)</span>
            </p>
          </div>

          <div className="divide-y divide-[#262629]">
            {items.map(item => {
              const isExpanded = expandedItem === item.id;
              return (
                <div key={item.id} className="p-4">
                  {/* 기본 정보 행 */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 space-y-1 text-xs">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* 상태 배지 */}
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                          item.status === 'RECORDED_BUT_NOT_EXECUTABLE'
                            ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                            : 'border-gray-600/30 bg-gray-600/10 text-gray-400'
                        }`}>
                          {item.status === 'RECORDED_BUT_NOT_EXECUTABLE' ? '기록 완료' : item.status}
                        </span>

                        {/* ACK 완료 여부 */}
                        {item.missingAcknowledgements.length === 0 ? (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" />
                            <span className="text-[10px]">ACK 완료 ({item.acknowledgedItems.length}건)</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-400">
                            <AlertTriangle className="h-3 w-3" />
                            <span className="text-[10px]">ACK 누락 ({item.missingAcknowledgements.length}건)</span>
                          </span>
                        )}

                        {/* 기록 시각 */}
                        <span className="text-gray-400">{formatDate(item.recordedAt)}</span>

                        {/* 승인자 */}
                        {item.actorId && (
                          <span className="font-mono text-gray-500">by {item.actorId}</span>
                        )}
                      </div>

                      {/* 식별자 */}
                      <div className="flex flex-wrap gap-4 text-[10px] text-gray-500">
                        <span>
                          <span className="text-gray-600">BatchJob: </span>
                          <span className="font-mono">{formatShortId(item.batchJobId)}</span>
                        </span>
                        <span>
                          <span className="text-gray-600">FinalApproval: </span>
                          <span className="font-mono">{formatShortId(item.finalApprovalId)}</span>
                        </span>
                        {item.auditCode && (
                          <span>
                            <span className="text-gray-600">코드: </span>
                            <span className="font-mono text-indigo-400/70">{item.auditCode}</span>
                          </span>
                        )}
                      </div>

                      {/* 대상 상품 요약 */}
                      {item.targetProductSummary && (
                        <div className="flex flex-wrap gap-3 text-[10px] text-gray-400">
                          {Object.entries(item.targetProductSummary).map(([k, v]) =>
                            v !== null && v !== undefined ? (
                              <span key={k}>
                                <span className="text-gray-600">{k}: </span>
                                <span className="text-gray-300">{String(v)}</span>
                              </span>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>

                    {/* 우측: 상세 / 링크 버튼 */}
                    <div className="flex shrink-0 flex-col gap-1.5">
                      <Link
                        href={`/dashboard/sku-keyword-draft-batches/${item.batchJobId}`}
                        className="inline-flex items-center rounded border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold text-indigo-300 hover:bg-indigo-500/20"
                      >
                        BatchJob 상세 →
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                        className="rounded border border-gray-600/30 bg-gray-700/10 px-2.5 py-1 text-[10px] text-gray-400 hover:bg-gray-700/20"
                      >
                        {isExpanded ? '접기' : '상세'}
                      </button>
                    </div>
                  </div>

                  {/* 확장 상세 */}
                  {isExpanded && (
                    <div className="mt-3 space-y-2 rounded-md border border-[#262629] bg-[#18181b] p-3 text-xs">
                      {/* acknowledgement 목록 */}
                      {item.acknowledgedItems.length > 0 && (
                        <div>
                          <p className="mb-1 text-[10px] font-semibold text-gray-400">확인 완료 항목</p>
                          <ul className="space-y-0.5">
                            {item.acknowledgedItems.map(ack => (
                              <li key={ack} className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 className="h-3 w-3 shrink-0" />
                                <span className="font-mono text-[10px]">{ack}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 누락 acknowledgement */}
                      {item.missingAcknowledgements.length > 0 && (
                        <div>
                          <p className="mb-1 text-[10px] font-semibold text-amber-400">누락 항목</p>
                          <ul className="space-y-0.5">
                            {item.missingAcknowledgements.map(ack => (
                              <li key={ack} className="flex items-center gap-1.5 text-amber-300">
                                <AlertTriangle className="h-3 w-3 shrink-0" />
                                <span className="font-mono text-[10px]">{ack}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* payload 요약 */}
                      {item.safePayloadSummary && (
                        <div className="flex gap-3 text-[10px]">
                          {Object.entries(item.safePayloadSummary).map(([k, v]) =>
                            v !== null && v !== undefined ? (
                              <span key={k}>
                                <span className="text-gray-500">{k}: </span>
                                <span className="text-gray-300">{String(v)}</span>
                              </span>
                            ) : null
                          )}
                        </div>
                      )}

                      {/* Safety flags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[9px] font-semibold text-red-300">
                          naverApiCallAllowed: false
                        </span>
                        <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[9px] font-semibold text-red-300">
                          liveExecutionEnabled: false
                        </span>
                        <span className="rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[9px] text-gray-500">
                          queueAllowed: false
                        </span>
                        <span className="rounded border border-gray-600/30 bg-gray-600/10 px-2 py-0.5 text-[9px] text-gray-500">
                          workerAllowed: false
                        </span>
                      </div>

                      <p className="text-[10px] text-gray-600">
                        이 감사 기록만으로 실제 Naver API 호출은 실행되지 않습니다.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 하단 안내 ── */}
      {!loading && (
        <div className="mt-6 rounded-md border border-gray-600/20 bg-gray-600/5 p-3 text-xs text-gray-500">
          <p className="font-semibold text-gray-400">안내</p>
          <ul className="mt-1 space-y-0.5">
            <li>• 이 화면은 read-only입니다. 승인 저장, Live 실행, 재실행 기능은 없습니다.</li>
            <li>• 감사 기록 저장은 BatchJob 상세 화면의 "Live 단일 테스트 승인 기록 저장" 섹션에서만 가능합니다.</li>
            <li>• DATABASE_URL / REDIS_URL / secret 원문은 이 화면에 표시되지 않습니다.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
