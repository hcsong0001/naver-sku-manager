export type CommonPageSize = 10 | 20 | 50 | 100 | 'ALL';

export type PageSizeOption = {
  value: CommonPageSize;
  label: string;
};

export const DEFAULT_PAGE_SIZE: CommonPageSize = 10;

export const PAGE_SIZE_OPTIONS: PageSizeOption[] = [
  { value: 10, label: '10개' },
  { value: 20, label: '20개' },
  { value: 50, label: '50개' },
  { value: 100, label: '100개' },
  { value: 'ALL', label: '전체 보기' },
];

export function getTotalPages(totalCount: number, pageSize: CommonPageSize): number {
  if (totalCount <= 0) return 1;
  if (pageSize === 'ALL') return 1;
  return Math.max(1, Math.ceil(totalCount / pageSize));
}

export function getSafeCurrentPage(currentPage: number, totalPages: number): number {
  return Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
}

export function getPaginatedRows<T>(rows: T[], pageSize: CommonPageSize, currentPage: number): T[] {
  if (pageSize === 'ALL') return rows;
  const startIndex = (currentPage - 1) * pageSize;
  return rows.slice(startIndex, startIndex + pageSize);
}

export function getPaginationRange(totalCount: number, pageSize: CommonPageSize, currentPage: number): {
  start: number;
  end: number;
} {
  if (totalCount === 0) {
    return { start: 0, end: 0 };
  }

  if (pageSize === 'ALL') {
    return { start: 1, end: totalCount };
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(totalCount, currentPage * pageSize);

  return { start, end };
}

export function getRowNumber(index: number, currentPage: number, pageSize: CommonPageSize): number {
  if (pageSize === 'ALL') {
    return index + 1;
  }

  return (currentPage - 1) * pageSize + index + 1;
}
