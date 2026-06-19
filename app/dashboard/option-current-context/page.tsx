'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSpreadsheet,
  Loader2,
  Search,
  XCircle,
} from 'lucide-react';
import PageSizeSelect from '@/app/components/PageSizeSelect';
import PaginationControls from '@/app/components/PaginationControls';
import { useConfiguredPageSize } from '@/src/hooks/useConfiguredPageSize';
import type {
  OptionCurrentContextPreviewResponse,
  OptionCurrentContextPreviewRow,
} from '@/src/types/option-current-context.types';
import {
  getPaginatedRows,
  getPaginationRange,
  getSafeCurrentPage,
  getRowNumber,
  getTotalPages,
} from '@/src/utils/pagination';

type Message = { type: 'success' | 'error'; text: string };

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  return value.toLocaleString('ko-KR');
}

function getStatusBadgeClass(status: OptionCurrentContextPreviewRow['status']): string {
  if (status === 'VALID') return 'tms-status-success';
  if (status === 'WARNING') return 'tms-status-warning';
  return 'tms-status-danger';
}

function getStatusLabel(status: OptionCurrentContextPreviewRow['status']): string {
  if (status === 'VALID') return '정상';
  if (status === 'WARNING') return '경고';
  return '오류';
}

function getRowTypeLabel(rowType: OptionCurrentContextPreviewRow['rowType']): string {
  return rowType === 'OPTION' ? 'OPTION' : 'ADDITIONAL';
}

function getPriceSourceLabel(row: OptionCurrentContextPreviewRow): string {
  if (row.priceSource === 'DIRECT_FINAL_PRICE') {
    return 'DIRECT_FINAL_PRICE';
  }
  if (row.priceSource === 'CALCULATED_FROM_BASE_DISCOUNT_OPTION') {
    return 'CALCULATED_FROM_BASE_DISCOUNT_OPTION';
  }
  if (row.priceSource === 'ADDITIONAL_SINGLE_PRICE') {
    return '추가상품 단일가격';
  }
  return 'MISSING';
}

function SummaryCard({
  label,
  value,
  accentClassName,
}: {
  label: string;
  value: number;
  accentClassName?: string;
}) {
  return (
    <div className={`tms-card-muted rounded-lg border p-4 ${accentClassName ?? ''}`}>
      <p className="tms-text-muted text-xs font-medium">{label}</p>
      <p className="tms-text-primary mt-1 text-2xl font-semibold">{value.toLocaleString('ko-KR')}</p>
    </div>
  );
}

export default function OptionCurrentContextPage() {
  const { pageSize, setPageSize } = useConfiguredPageSize();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewResult, setPreviewResult] = useState<OptionCurrentContextPreviewResponse | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => getTotalPages(previewResult?.rows.length ?? 0, pageSize),
    [pageSize, previewResult?.rows.length],
  );
  const safeCurrentPage = getSafeCurrentPage(currentPage, totalPages);
  const paginatedRows = useMemo(
    () => getPaginatedRows(previewResult?.rows ?? [], pageSize, safeCurrentPage),
    [pageSize, previewResult?.rows, safeCurrentPage],
  );
  const paginationRange = useMemo(
    () => getPaginationRange(previewResult?.rows.length ?? 0, pageSize, safeCurrentPage),
    [pageSize, previewResult?.rows.length, safeCurrentPage],
  );

  async function handlePreview() {
    if (!selectedFile) {
      setMessage({ type: 'error', text: '미리보기할 파일을 먼저 선택해 주세요.' });
      return;
    }

    setPreviewLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/option-current-context/preview', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as OptionCurrentContextPreviewResponse | { error?: string };
      if (!response.ok) {
        setPreviewResult(null);
        setMessage({
          type: 'error',
          text:
            typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string'
              ? data.error
              : 'OPTION 현재 문맥 preview 생성에 실패했습니다.',
        });
        return;
      }

      setPreviewResult(data as OptionCurrentContextPreviewResponse);
      setCurrentPage(1);
      setMessage({ type: 'success', text: 'OPTION 현재 문맥 preview를 생성했습니다.' });
    } catch (error) {
      console.error('OPTION 현재 문맥 preview 요청 실패', error);
      setPreviewResult(null);
      setMessage({ type: 'error', text: 'OPTION 현재 문맥 preview 요청 중 오류가 발생했습니다.' });
    } finally {
      setPreviewLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border tms-border-soft tms-card-muted">
              <FileSpreadsheet className="h-5 w-5 tms-link" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tms-text-primary">OPTION 현재 문맥 Preview</h1>
              <p className="tms-text-muted mt-1 text-sm">
                스마트스토어 OPTION 현재 가격/재고 문맥을 업로드 파일 기준으로 읽기 전용 검증합니다.
              </p>
            </div>
          </div>
          <div className="tms-panel rounded-lg border">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="space-y-2 text-sm">
                <p className="tms-text-primary">
                  옵션 상품의 실제 비교 가격은 판매가 - 판매자할인 + 옵션가입니다.
                </p>
                <p className="tms-text-muted">
                  업로드 파일의 옵션가만으로는 최종 현재 판매가를 확정할 수 없습니다. 판매가/판매자할인/옵션가가 모두
                  있거나, 최종 옵션 판매가가 직접 제공되어야 합니다.
                </p>
                <p className="tms-text-muted">
                  추가상품은 옵션 계산식이 아니라 단일가격 기준입니다. ERP 대표판매가/ERP 현재재고를 스마트스토어 현재
                  옵션가/현재 판매재고로 사용하지 마세요.
                </p>
                <p className="tms-text-muted">
                  이 화면은 Preview 전용이며 DB에 저장하지 않고, 네이버 API도 호출하지 않습니다.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/api/option-current-context/template"
                  className="tms-button tms-button-secondary inline-flex items-center gap-2 rounded-lg border text-sm font-semibold"
                >
                  <Download className="h-4 w-4" />
                  템플릿 다운로드
                </a>
                <Link
                  href="/dashboard/sku-keyword-matching"
                  className="tms-button tms-button-primary inline-flex items-center gap-2 rounded-lg text-sm font-semibold"
                >
                  <ExternalLink className="h-4 w-4" />
                  키워드 매칭 화면으로 이동
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="tms-panel rounded-lg border">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold tms-text-primary">파일 업로드</h2>
              <p className="tms-text-muted text-sm">CSV / XLS / XLSX 파일을 업로드한 뒤 Preview 실행을 눌러 주세요.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label
                htmlFor="option-current-context-file"
                className="tms-button tms-file-button inline-flex cursor-pointer items-center gap-2 rounded-lg border text-sm font-semibold"
              >
                <FileSpreadsheet className="h-4 w-4" />
                파일 선택
              </label>
              <input
                id="option-current-context-file"
                type="file"
                accept=".csv,.xls,.xlsx"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setSelectedFile(file);
                  setMessage(null);
                }}
              />
              <button
                type="button"
                onClick={handlePreview}
                disabled={!selectedFile || previewLoading}
                className="tms-button tms-button-primary inline-flex items-center gap-2 rounded-lg text-sm font-semibold"
              >
                {previewLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Preview 실행
              </button>
            </div>
          </div>

          <div className="tms-control mt-4 flex min-h-14 items-center rounded-lg border px-4 py-3 text-sm">
            {selectedFile ? (
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="tms-text-primary font-medium">{selectedFile.name}</p>
                  <p className="tms-text-muted text-xs">
                    {(selectedFile.size / 1024).toLocaleString('ko-KR', { maximumFractionDigits: 1 })} KB
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs tms-badge">
                  업로드 대기
                </span>
              </div>
            ) : (
              <p className="tms-text-muted">선택된 파일이 없습니다.</p>
            )}
          </div>

          {message ? (
            <div
              className={`mt-4 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${
                message.type === 'success' ? 'tms-status-success' : 'tms-status-danger'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          ) : null}
        </section>

        {previewResult ? (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <SummaryCard label="전체 행 수" value={previewResult.summary.totalRows} />
              <SummaryCard label="정상 행 수" value={previewResult.summary.validRows} accentClassName="border-emerald-500/30" />
              <SummaryCard label="경고 행 수" value={previewResult.summary.warningRows} accentClassName="border-amber-500/30" />
              <SummaryCard label="오류 행 수" value={previewResult.summary.errorRows} accentClassName="border-red-500/30" />
              <SummaryCard label="가격 문맥 확보" value={previewResult.summary.rowsWithCurrentPrice} />
              <SummaryCard label="재고 문맥 확보" value={previewResult.summary.rowsWithCurrentStock} />
              <SummaryCard label="가격·재고 모두 확보" value={previewResult.summary.rowsWithBothCurrentContext} />
              <SummaryCard label="직접 최종가 행 수" value={previewResult.summary.rowsWithDirectEffectivePrice} />
              <SummaryCard label="계산 최종가 행 수" value={previewResult.summary.rowsWithCalculatedEffectivePrice} />
              <SummaryCard label="판매자할인 누락" value={previewResult.summary.rowsMissingSellerDiscount} />
              <SummaryCard label="가격 불일치" value={previewResult.summary.rowsWithPriceMismatch} />
              <SummaryCard label="채널상품번호 누락" value={previewResult.summary.missingChannelProductNo} />
              <SummaryCard label="옵션 식별자 누락" value={previewResult.summary.missingOptionIdentifier} />
            </section>

            <section className="tms-panel rounded-lg border">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tms-text-primary">행별 Preview 결과</h2>
                  <p className="tms-text-muted mt-1 text-sm">
                    파일명: <span className="font-medium tms-text-primary">{previewResult.fileName}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 tms-status-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      정상
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 tms-status-warning">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      경고
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 tms-status-danger">
                      <XCircle className="h-3.5 w-3.5" />
                      오류
                    </span>
                  </div>
                  <PageSizeSelect
                    value={pageSize}
                    onChange={(value) => {
                      setPageSize(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 overflow-auto rounded-lg border">
                <table className="tms-table min-w-[1900px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-3 py-2 text-left">No.</th>
                      <th className="px-3 py-2 text-left">상태</th>
                      <th className="px-3 py-2 text-left">유형</th>
                      <th className="px-3 py-2 text-left">channelProductNo</th>
                      <th className="px-3 py-2 text-left">optionId</th>
                      <th className="px-3 py-2 text-left">sellerManagerCode</th>
                      <th className="px-3 py-2 text-left">옵션명/옵션값</th>
                      <th className="px-3 py-2 text-left">판매가</th>
                      <th className="px-3 py-2 text-left">판매자할인</th>
                      <th className="px-3 py-2 text-left">옵션가</th>
                      <th className="px-3 py-2 text-left">최종 옵션 판매가</th>
                      <th className="px-3 py-2 text-left">현재 판매재고</th>
                      <th className="px-3 py-2 text-left">추가상품 단일가격/재고</th>
                      <th className="px-3 py-2 text-left">priceSource</th>
                      <th className="px-3 py-2 text-left">warnings / errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.map((row, index) => (
                      <tr
                        key={`${row.rowNumber}-${row.channelProductNo ?? 'none'}-${row.optionId ?? 'none'}-${index}`}
                        className="tms-table-row border-b align-top"
                      >
                        <td className="px-3 py-2 font-mono text-xs tms-row-text-muted">
                          {getRowNumber(index, safeCurrentPage, pageSize)}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(row.status)}`}
                          >
                            {getStatusLabel(row.status)}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="inline-flex rounded-md border px-2 py-1 text-xs tms-badge">
                            {getRowTypeLabel(row.rowType)}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-mono text-xs tms-row-text">{row.channelProductNo ?? '-'}</td>
                        <td className="px-3 py-2 font-mono text-xs tms-row-text">{row.optionId ?? '-'}</td>
                        <td className="px-3 py-2 font-mono text-xs tms-row-text">{row.sellerManagerCode ?? '-'}</td>
                        <td className="px-3 py-2">
                          <div className="space-y-1">
                            <p className="tms-row-text-strong">{row.optionName ?? '-'}</p>
                            <p className="text-xs tms-row-text-muted">{row.optionValue ?? '-'}</p>
                          </div>
                        </td>
                        <td className="px-3 py-2 tms-row-text">{formatNumber(row.baseSalePrice)}</td>
                        <td className="px-3 py-2 tms-row-text">{formatNumber(row.sellerDiscount)}</td>
                        <td className="px-3 py-2 tms-row-text">{formatNumber(row.optionPrice)}</td>
                        <td className="px-3 py-2">
                          <div className="space-y-1">
                            <p className="tms-row-text-strong">{formatNumber(row.currentEffectiveOptionPrice)}</p>
                            {row.calculatedEffectiveOptionPrice !== null ? (
                              <p className="text-[11px] tms-row-text-muted">
                                계산값 {formatNumber(row.calculatedEffectiveOptionPrice)}
                              </p>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-3 py-2 tms-row-text">{formatNumber(row.currentOptionStockQuantity)}</td>
                        <td className="px-3 py-2">
                          <div className="space-y-1">
                            <p className="tms-row-text">{formatNumber(row.additionalPrice)}</p>
                            <p className="text-[11px] tms-row-text-muted">{formatNumber(row.additionalStockQuantity)}</p>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <span className="inline-flex rounded-md border px-2 py-1 text-[11px] tms-badge">
                            {getPriceSourceLabel(row)}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="space-y-2">
                            {row.warnings.length > 0 ? (
                              <div className="rounded-md border px-2 py-2 tms-status-warning">
                                <p className="text-[11px] font-semibold">Warnings</p>
                                <ul className="mt-1 space-y-1 text-xs">
                                  {row.warnings.map((warning) => (
                                    <li key={warning}>{warning}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {row.errors.length > 0 ? (
                              <div className="rounded-md border px-2 py-2 tms-status-danger">
                                <p className="text-[11px] font-semibold">Errors</p>
                                <ul className="mt-1 space-y-1 text-xs">
                                  {row.errors.map((error) => (
                                    <li key={error}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {row.warnings.length === 0 && row.errors.length === 0 ? (
                              <span className="inline-flex rounded-md border px-2 py-1 text-xs tms-status-success">
                                검증 통과
                              </span>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {paginatedRows.length === 0 ? (
                      <tr>
                        <td colSpan={15} className="px-3 py-10 text-center text-sm tms-text-muted">
                          표시할 preview 결과가 없습니다.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              <PaginationControls
                className="mt-4"
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                start={paginationRange.start}
                end={paginationRange.end}
                totalCount={previewResult.rows.length}
                onChangePage={setCurrentPage}
              />
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
