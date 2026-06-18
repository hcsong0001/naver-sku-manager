'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Loader2,
  RefreshCw,
  Save,
  Upload,
} from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import {
  STAGING_IMPORT_FILE_TYPES,
  type StagingImportApplyResponse,
  type StagingImportFileType,
  type StagingImportHistoryRow,
  type StagingImportPreviewResponse,
  type StagingImportPreviewRow,
  type StagingImportSummaryResponse,
} from '@/src/types/staging-import.types';
import {
  getPaginatedRows,
  getPaginationRange,
  getRowNumber,
  getSafeCurrentPage,
  getTotalPages,
} from '@/src/utils/pagination';
import { useConfiguredPageSize } from '@/src/hooks/useConfiguredPageSize';

type Message = { type: 'success' | 'error'; text: string };

const FILE_TYPE_LABELS: Record<StagingImportFileType, string> = {
  ERP_STOCK: 'ERP 재고 전체 파일',
  SMARTSTORE_PRODUCT: '스마트스토어 상품 전체 파일',
  SKU_MAPPING: '기존 SKU 매핑 전체 파일',
  PRODUCT_VARIANT_KEYWORD: 'ProductVariantKeyword 전체 파일',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: '대기',
  PREVIEWED: '미리보기 완료',
  APPLIED: '저장 완료',
  FAILED: '실패',
  CANCELLED: '취소',
};

const COLUMN_LABELS: Record<string, string> = {
  fileType: '파일 타입',
  fileName: '파일명',
  status: '상태',
  totalRows: '전체 행 수',
  successRows: '정상 행 수',
  errorRows: '오류 행 수',
  appliedAt: '저장 일시',
  createdAt: '생성일',
  completedAt: '적용일 / 완료일',
  jobId: 'Job ID',
  rowNumber: '원본 행',
  sourceSheet: '시트',
  barcode: '바코드',
  productName: '상품명',
  purchaseProductName: '사입상품명',
  internalProductCode: '상품코드',
  skuCodeCandidate: 'SKU 후보',
  channelProductNo: '채널상품번호',
  originProductNo: '원상품번호',
  optionName: '옵션명',
  optionValue: '옵션값',
  additionalName: '추가상품명',
  additionalValue: '추가상품값',
  mappingType: '매핑 타입',
  itemId: '항목 ID',
  itemName: '항목명',
  skuCode: 'SKU 코드',
  quantity: '수량',
  serialNo: '일련번호',
  productMatchName: '상품 매칭명',
  productOptionText: '상품 옵션 문구',
  stockMatchedProductName: '재고매칭 상품명',
  stockMatchedOptionText: '재고매칭 옵션 문구',
  quantityText: '수량 문구',
  errorMessage: '오류 내용',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(value: unknown, fallback: string): string {
  return isRecord(value) && typeof value.error === 'string' ? value.error : fallback;
}

async function readJson<T>(response: Response): Promise<T> {
  return await response.json() as T;
}

async function requestStagingSummary(): Promise<StagingImportSummaryResponse> {
  const response = await fetch('/api/staging-import/summary', { cache: 'no-store' });
  const data = await readJson<StagingImportSummaryResponse | { error: string }>(response);
  if (!response.ok) throw new Error(getErrorMessage(data, 'staging 현황 조회에 실패했습니다.'));
  return data as StagingImportSummaryResponse;
}

function formatCell(value: StagingImportPreviewRow[string]): string {
  if (value === null || value === '') return '-';
  if (typeof value === 'boolean') return value ? '예' : '아니오';
  return String(value);
}

function formatDate(value: string | null): string {
  if (!value) return '-';
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function PreviewRowsTable({
  title,
  rows,
  emptyText,
  tone = 'default',
}: {
  title: string;
  rows: StagingImportPreviewRow[];
  emptyText: string;
  tone?: 'default' | 'error';
}) {
  const { pageSize, setPageSize } = useConfiguredPageSize();
  const [currentPage, setCurrentPage] = useState(1);
  const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const totalPages = getTotalPages(rows.length, pageSize);
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedRows = getPaginatedRows(rows, pageSize, safeCurrentPage);
  const pagination = getPaginationRange(rows.length, pageSize, safeCurrentPage);

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-1 text-xs text-zinc-500">표시된 샘플 {rows.length.toLocaleString()}건</p>
        </div>
        {rows.length > 0 && <PageSizeSelect value={pageSize} onChange={(value) => { setPageSize(value); setCurrentPage(1); }} />}
      </div>

      {rows.length === 0 ? (
        <div className={`rounded-lg border px-4 py-8 text-center text-sm ${
          tone === 'error'
            ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'
            : 'border-[#262629] bg-[#0c0c0e] text-zinc-500'
        }`}>
          {emptyText}
        </div>
      ) : (
        <>
          <div className={`max-h-[52vh] overflow-auto rounded-lg border ${tone === 'error' ? 'border-red-500/20' : 'border-[#262629]'}`}>
            <table className="tms-table min-w-[980px] w-full text-left text-sm">
              <thead className={`sticky top-0 z-10 ${tone === 'error' ? 'bg-[#1a1012]' : 'bg-[#0c0c0e]'}`}>
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-medium text-zinc-500">No.</th>
                  {columns.map((column) => (
                    <th key={column} className={`whitespace-nowrap px-4 py-3 text-xs font-medium ${tone === 'error' ? 'text-red-300' : 'text-zinc-500'}`}>
                      {COLUMN_LABELS[column] ?? column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {paginatedRows.map((row, index) => (
                  <tr key={`${safeCurrentPage}-${index}-${String(row.rowNumber ?? '')}`} className={tone === 'error' ? 'hover:bg-red-500/5' : 'hover:bg-[#16161a]'}>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-500">
                      {getRowNumber(index, safeCurrentPage, pageSize)}
                    </td>
                    {columns.map((column) => (
                      <td key={column} className={`max-w-96 px-4 py-3 align-top text-xs ${column === 'errorMessage' ? 'text-red-300' : 'text-zinc-300'}`}>
                        <span className="block break-words">{formatCell(row[column])}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-[#262629] bg-[#0c0c0e] px-4 py-3">
            <PaginationControls
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              start={pagination.start}
              end={pagination.end}
              totalCount={rows.length}
              onChangePage={setCurrentPage}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default function StagingImportPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileType, setFileType] = useState<StagingImportFileType>('ERP_STOCK');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<StagingImportPreviewResponse | null>(null);
  const [applyResult, setApplyResult] = useState<StagingImportApplyResponse | null>(null);
  const [summary, setSummary] = useState<StagingImportSummaryResponse | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [applying, setApplying] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      setSummary(await requestStagingSummary());
    } catch (error) {
      setSummaryError(error instanceof Error ? error.message : 'staging 현황 조회에 실패했습니다.');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void requestStagingSummary()
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSummaryError(error instanceof Error ? error.message : 'staging 현황 조회에 실패했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setSummaryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const latestJobRows = useMemo<StagingImportPreviewRow[]>(() => {
    return STAGING_IMPORT_FILE_TYPES.flatMap((type) => {
      const job = summary?.latestJobs[type];
      if (!job) return [];
      return [{
        fileType: FILE_TYPE_LABELS[type],
        jobId: job.jobId,
        fileName: job.fileName,
        status: STATUS_LABELS[job.status] ?? job.status,
        totalRows: job.totalRows,
        successRows: job.successRows,
        errorRows: job.errorRows,
        createdAt: formatDate(job.createdAt ?? null),
        appliedAt: formatDate(job.appliedAt),
      }];
    });
  }, [summary]);

  const latestAppliedJobRows = useMemo<StagingImportPreviewRow[]>(() => {
    return STAGING_IMPORT_FILE_TYPES.flatMap((type) => {
      const job = summary?.latestAppliedJobs[type];
      if (!job) return [];
      return [{
        fileType: FILE_TYPE_LABELS[type],
        jobId: job.jobId,
        fileName: job.fileName,
        status: STATUS_LABELS[job.status] ?? job.status,
        totalRows: job.totalRows,
        successRows: job.successRows,
        errorRows: job.errorRows,
        createdAt: formatDate(job.createdAt ?? null),
        appliedAt: formatDate(job.appliedAt),
      }];
    });
  }, [summary]);

  const importJobHistoryRows = useMemo<StagingImportPreviewRow[]>(() => {
    return (summary?.jobHistory ?? []).map((job: StagingImportHistoryRow) => ({
      jobId: job.jobId,
      fileType: FILE_TYPE_LABELS[job.fileType],
      fileName: job.fileName,
      status: STATUS_LABELS[job.status] ?? job.status,
      totalRows: job.totalRows,
      successRows: job.successRows,
      errorRows: job.errorRows,
      createdAt: formatDate(job.createdAt),
      completedAt: formatDate(job.completedAt),
    }));
  }, [summary]);

  const previewReady = Boolean(preview && file && preview.errorRows === 0 && preview.successRows > 0);

  const resetSelection = (nextType?: StagingImportFileType) => {
    if (nextType) setFileType(nextType);
    setFile(null);
    setPreview(null);
    setApplyResult(null);
    setMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const runPreview = async () => {
    if (!file) {
      setMessage({ type: 'error', text: '미리보기할 파일을 선택하세요.' });
      return;
    }

    setPreviewing(true);
    setMessage(null);
    setApplyResult(null);
    try {
      const formData = new FormData();
      formData.append('fileType', fileType);
      formData.append('file', file);
      const response = await fetch('/api/staging-import/preview', { method: 'POST', body: formData });
      const data = await readJson<StagingImportPreviewResponse | { error: string }>(response);
      if (!response.ok) throw new Error(getErrorMessage(data, '파일 미리보기에 실패했습니다.'));
      const result = data as StagingImportPreviewResponse;
      setPreview(result);
      setMessage({
        type: result.errorRows === 0 ? 'success' : 'error',
        text: result.errorRows === 0
          ? '미리보기가 완료되었습니다. staging 저장 전 결과를 확인하세요.'
          : `오류 ${result.errorRows.toLocaleString()}건을 확인한 뒤 파일을 다시 업로드하세요.`,
      });
    } catch (error) {
      setPreview(null);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : '파일 미리보기에 실패했습니다.' });
    } finally {
      setPreviewing(false);
    }
  };

  const applyToStaging = async () => {
    if (!previewReady || !file) return;
    const confirmed = window.confirm('운영 테이블이 아닌 staging 테이블에 저장됩니다. 진행하시겠습니까?');
    if (!confirmed) return;

    setApplying(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('fileType', fileType);
      formData.append('file', file);
      const response = await fetch('/api/staging-import/apply', { method: 'POST', body: formData });
      const data = await readJson<StagingImportApplyResponse | { error: string }>(response);
      if (!response.ok) throw new Error(getErrorMessage(data, 'staging 저장에 실패했습니다.'));
      const result = data as StagingImportApplyResponse;
      setApplyResult(result);
      setMessage({ type: 'success', text: `staging 테이블에 ${result.successRows.toLocaleString()}건을 저장했습니다.` });
      await loadSummary();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'staging 저장에 실패했습니다.' });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">전체 데이터 Import</h1>
            <p className="mt-2 text-sm text-zinc-400">전체 파일을 검증한 뒤 staging 테이블에 저장합니다.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadSummary()}
            disabled={summaryLoading}
            className="tms-control inline-flex items-center justify-center gap-2 rounded-lg border border-[#333] bg-[#121214] text-sm font-semibold text-zinc-200 transition hover:border-indigo-500/60 disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${summaryLoading ? 'animate-spin' : ''}`} />
            현황 새로고침
          </button>
        </header>

        <section className="tms-panel rounded-lg border border-[#262629] bg-[#121214]">
          <div className="tms-toolbar grid gap-4 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,2fr)_auto] lg:items-end">
            <label className="space-y-2 text-sm font-medium text-zinc-300">
              <span>파일 타입</span>
              <select
                value={fileType}
                onChange={(event) => resetSelection(event.target.value as StagingImportFileType)}
                className="tms-control w-full rounded-lg border border-[#333] bg-[#0c0c0e] text-sm text-white outline-none transition focus:border-indigo-400"
              >
                {STAGING_IMPORT_FILE_TYPES.map((type) => (
                  <option key={type} value={type}>{FILE_TYPE_LABELS[type]}</option>
                ))}
              </select>
            </label>

            <div className="space-y-2">
              <span className="block text-sm font-medium text-zinc-300">업로드 파일</span>
              <div className="tms-control flex items-center gap-3 rounded-lg border border-[#333] bg-[#0c0c0e] px-4">
                <FileSpreadsheet className="h-4 w-4 shrink-0 text-zinc-500" />
                <span className="truncate text-sm text-zinc-300">{file?.name ?? '선택된 파일 없음'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="tms-control inline-flex items-center justify-center gap-2 rounded-lg border border-[#333] bg-[#1a1a1e] text-sm font-semibold text-zinc-200 transition hover:border-zinc-500"
              >
                <Upload className="h-4 w-4" />
                파일 선택
              </button>
              <button
                type="button"
                onClick={() => void runPreview()}
                disabled={!file || previewing || applying}
                className="tms-control inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
              >
                {previewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                미리보기 실행
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setPreview(null);
                setApplyResult(null);
                setMessage(null);
              }}
            />
          </div>

          {message && (
            <div className={`mt-4 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/20 bg-red-500/10 text-red-300'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}
        </section>

        {preview && (
          <section className="tms-panel space-y-5 rounded-lg border border-[#262629] bg-[#121214]">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">미리보기 결과</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {preview.fileName} · {FILE_TYPE_LABELS[preview.fileType]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void applyToStaging()}
                disabled={!previewReady || applying || previewing}
                className="tms-control inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                title={previewReady ? 'staging 테이블에 저장' : '오류가 없고 정상 행이 있어야 저장할 수 있습니다.'}
              >
                {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                staging 저장
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryCard label="전체 행 수" value={preview.totalRows} />
              <SummaryCard label="정상 행 수" value={preview.successRows} />
              <SummaryCard label="오류 행 수" value={preview.errorRows} />
            </div>

            {applyResult && (
              <div className="grid gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 md:grid-cols-2 xl:grid-cols-4">
                <div><p className="text-xs text-emerald-400/70">ImportJob ID</p><p className="mt-1 break-all font-mono text-xs text-emerald-200">{applyResult.jobId}</p></div>
                <div><p className="text-xs text-emerald-400/70">ImportFile ID</p><p className="mt-1 break-all font-mono text-xs text-emerald-200">{applyResult.fileId}</p></div>
                <div><p className="text-xs text-emerald-400/70">저장 상태</p><p className="mt-1 text-sm font-semibold text-emerald-200">{STATUS_LABELS[applyResult.status] ?? applyResult.status}</p></div>
                <div><p className="text-xs text-emerald-400/70">저장된 행 수</p><p className="mt-1 text-sm font-semibold text-emerald-200">{applyResult.successRows.toLocaleString()}건</p></div>
              </div>
            )}

            <PreviewRowsTable
              key={`${preview.fileType}-${preview.fileName}-valid`}
              title="샘플 정상 행"
              rows={preview.validRowsSample}
              emptyText="샘플 정상 행이 없습니다."
            />
            <PreviewRowsTable
              key={`${preview.fileType}-${preview.fileName}-error`}
              title="대표 오류 목록"
              rows={preview.errorRowsSample}
              emptyText="오류 행이 없습니다."
              tone="error"
            />
          </section>
        )}

        <section className="tms-panel space-y-5 rounded-lg border border-[#262629] bg-[#121214]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Staging 저장 현황</h2>
              <p className="mt-1 text-sm text-zinc-500">ImportJob과 staging 테이블의 현재 건수</p>
            </div>
            {summaryLoading && <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />}
          </div>

          {summaryError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{summaryError}</div>
          )}

          {summary && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                <SummaryCard label="ImportJob 수" value={summary.summary.importJobCount} />
                <SummaryCard label="Staging 재고 수" value={summary.summary.stagingStockCount} />
                <SummaryCard label="Staging 상품 수" value={summary.summary.stagingProductCount} />
                <SummaryCard label="Staging 옵션 수" value={summary.summary.stagingOptionCount} />
                <SummaryCard label="Staging 추가상품 수" value={summary.summary.stagingAdditionalCount} />
                <SummaryCard label="Staging 기존 매핑 수" value={summary.summary.stagingSkuMappingCount} />
                <SummaryCard label="Staging ProductVariantKeyword 수" value={summary.summary.stagingProductVariantKeywordCount} />
              </div>
              <PreviewRowsTable
                key={`latest-${latestJobRows.map((row) => row.fileName).join('-')}`}
                title="파일 타입별 최신 Import"
                rows={latestJobRows}
                emptyText="저장된 ImportJob이 없습니다."
              />
              <PreviewRowsTable
                key={`latest-applied-${latestAppliedJobRows.map((row) => row.jobId).join('-')}`}
                title="파일 타입별 최신 APPLIED Import"
                rows={latestAppliedJobRows}
                emptyText="APPLIED ImportJob이 없습니다."
              />
              <PreviewRowsTable
                key={`history-${importJobHistoryRows.length}`}
                title="ImportJob 이력 목록"
                rows={importJobHistoryRows}
                emptyText="ImportJob 이력이 없습니다."
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
