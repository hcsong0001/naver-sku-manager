import type { CommonPageSize } from '@/src/utils/pagination';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  pageSize: CommonPageSize;
  start: number;
  end: number;
  totalCount: number;
  onChangePage: (page: number) => void;
  className?: string;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  pageSize,
  start,
  end,
  totalCount,
  onChangePage,
  className,
}: PaginationControlsProps) {
  const disabled = pageSize === 'ALL' || totalCount === 0;

  return (
    <div className={className ?? 'tms-toolbar flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'}>
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
        <span>
          {start}-{end} / 총 {totalCount.toLocaleString()}개
        </span>
        <span>
          {currentPage} / {totalPages} 페이지
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onChangePage(1)}
          disabled={disabled || currentPage <= 1}
          className="tms-button tms-button-secondary rounded-lg border border-[#333] text-xs font-semibold transition hover:border-indigo-500/60 disabled:opacity-60"
        >
          처음
        </button>
        <button
          type="button"
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
          disabled={disabled || currentPage <= 1}
          className="tms-button tms-button-secondary rounded-lg border border-[#333] text-xs font-semibold transition hover:border-indigo-500/60 disabled:opacity-60"
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
          disabled={disabled || currentPage >= totalPages}
          className="tms-button tms-button-secondary rounded-lg border border-[#333] text-xs font-semibold transition hover:border-indigo-500/60 disabled:opacity-60"
        >
          다음
        </button>
        <button
          type="button"
          onClick={() => onChangePage(totalPages)}
          disabled={disabled || currentPage >= totalPages}
          className="tms-button tms-button-secondary rounded-lg border border-[#333] text-xs font-semibold transition hover:border-indigo-500/60 disabled:opacity-60"
        >
          마지막
        </button>
      </div>
    </div>
  );
}
