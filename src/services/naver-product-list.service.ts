import prisma from '@/lib/prisma';
import { collectNaverProductByChannelProductNo, getNaverApiBaseUrl, getNaverToken } from '@/src/services/naver-product.service';
import type {
  NaverProductListItem,
  NaverProductListRequestBody,
  NaverProductListResult,
  NaverProductListSearchCondition,
} from '@/src/types/naver-product.types';

const DEFAULT_PAGE_SIZE = 500;
const PRODUCT_LIST_SEARCH_ENDPOINT = `${getNaverApiBaseUrl()}/external/v1/products/search`;

type ProductCollectionJobStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
type ProductCollectionJobItemStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type ProductCollectionSearchCondition = NaverProductListSearchCondition;

export type RunProductCollectionJobOptions = {
  maxPages?: number;
  collectDetails?: boolean;
  retryFailedOnly?: boolean;
};

type RawProductListResponse = {
  contents?: unknown;
  content?: unknown;
  totalElements?: unknown;
  totalCount?: unknown;
  totalPages?: unknown;
  page?: unknown;
  size?: unknown;
};

type RawProductListItem = {
  channelProductNo?: unknown;
  originProductNo?: unknown;
  productName?: unknown;
  channelProductName?: unknown;
  name?: unknown;
  statusType?: unknown;
};

type ProductListItemContext = {
  originProductNo?: string;
  productName?: string;
  statusType?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toPositiveInt(value: unknown, fallback: number): number {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 1) return fallback;
  return Math.floor(numberValue);
}

function toOptionalString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  const text = String(value).trim();
  return text.length > 0 ? text : undefined;
}

function toStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const values = value
    .map((item) => toOptionalString(item))
    .filter((item): item is string => Boolean(item));
  return values.length > 0 ? values : undefined;
}

function toNumberArray(values: string[] | undefined): number[] | undefined {
  if (!values || values.length === 0) return undefined;
  const numbers = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0)
    .map((value) => Math.trunc(value));
  return numbers.length > 0 ? numbers : undefined;
}

function removeUndefinedValues<T extends Record<string, unknown>>(value: T): Partial<T> {
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined);
  return Object.fromEntries(entries) as Partial<T>;
}

export function normalizeProductListSearchCondition(
  value: unknown,
): ProductCollectionSearchCondition {
  if (!isRecord(value)) {
    throw new Error('검색조건이 올바르지 않습니다.');
  }

  const storeId = toOptionalString(value.storeId);
  if (!storeId) {
    throw new Error('스토어를 선택하세요.');
  }

  const page = toPositiveInt(value.page, 1);
  const size = Math.min(toPositiveInt(value.size, DEFAULT_PAGE_SIZE), DEFAULT_PAGE_SIZE);

  return {
    storeId,
    productStatusTypes: toStringArray(value.productStatusTypes),
    searchKeywordType: toOptionalString(value.searchKeywordType),
    keyword: toOptionalString(value.keyword),
    channelProductNos: toStringArray(value.channelProductNos),
    originProductNos: toStringArray(value.originProductNos),
    sellerManagementCode: toOptionalString(value.sellerManagementCode),
    periodType: toOptionalString(value.periodType),
    fromDate: toOptionalString(value.fromDate),
    toDate: toOptionalString(value.toDate),
    orderType: toOptionalString(value.orderType),
    page,
    size,
  };
}

export function buildProductListRequestBody(
  condition: ProductCollectionSearchCondition,
  page = condition.page ?? 1,
  size = condition.size ?? DEFAULT_PAGE_SIZE,
): NaverProductListRequestBody {
  return removeUndefinedValues({
    productStatusTypes: condition.productStatusTypes,
    searchKeywordType: condition.searchKeywordType,
    keyword: condition.keyword,
    channelProductNos: toNumberArray(condition.channelProductNos),
    originProductNos: toNumberArray(condition.originProductNos),
    sellerManagementCode: condition.sellerManagementCode,
    periodType: condition.periodType,
    fromDate: condition.fromDate,
    toDate: condition.toDate,
    orderType: condition.orderType,
    page,
    size,
  }) as NaverProductListRequestBody;
}

async function getAccessTokenForStore(storeId: string): Promise<string> {
  const store = await prisma.smartstore.findUnique({ where: { id: storeId } });

  if (!store) {
    throw new Error('Smartstore를 찾을 수 없습니다.');
  }

  if (!store.clientId || !store.clientSecret) {
    throw new Error('해당 스토어에 API 키(clientId/clientSecret)가 설정되어 있지 않습니다.');
  }

  const tokenData = await getNaverToken(store.clientId, store.clientSecret);
  return tokenData.access_token;
}

function normalizeProductListItem(
  value: unknown,
  context: ProductListItemContext,
): NaverProductListItem | null {
  if (!isRecord(value)) return null;
  const item = value as RawProductListItem;
  const channelProductNo = toOptionalString(item.channelProductNo);
  if (!channelProductNo) return null;

  return {
    channelProductNo,
    originProductNo: toOptionalString(item.originProductNo) || context.originProductNo,
    productName:
      toOptionalString(item.productName) ||
      toOptionalString(item.channelProductName) ||
      toOptionalString(item.name) ||
      context.productName,
    statusType: toOptionalString(item.statusType) || context.statusType,
  };
}

function extractProductListItems(
  value: unknown,
  context: ProductListItemContext = {},
): NaverProductListItem[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => extractProductListItems(item, context));
  }

  if (!isRecord(value)) return [];

  const record = value as RawProductListItem;
  const nextContext: ProductListItemContext = {
    originProductNo: toOptionalString(record.originProductNo) || context.originProductNo,
    productName:
      toOptionalString(record.productName) ||
      toOptionalString(record.channelProductName) ||
      toOptionalString(record.name) ||
      context.productName,
    statusType: toOptionalString(record.statusType) || context.statusType,
  };
  const directItem = normalizeProductListItem(value, nextContext);
  if (directItem) return [directItem];

  return Object.values(value).flatMap((entry) => {
    if (!isRecord(entry) && !Array.isArray(entry)) return [];
    return extractProductListItems(entry, nextContext);
  });
}

function dedupeProductListItems(items: NaverProductListItem[]): NaverProductListItem[] {
  const itemMap = new Map<string, NaverProductListItem>();

  for (const item of items) {
    if (!itemMap.has(item.channelProductNo)) {
      itemMap.set(item.channelProductNo, item);
    }
  }

  return Array.from(itemMap.values());
}

function normalizeProductListResponse(
  value: unknown,
  requestedPage: number,
  requestedSize: number,
): NaverProductListResult {
  if (!isRecord(value)) {
    throw new Error('네이버 상품 목록 응답 형식이 올바르지 않습니다.');
  }

  const response = value as RawProductListResponse;
  const rawItems = Array.isArray(response.contents)
    ? response.contents
    : Array.isArray(response.content)
      ? response.content
      : [];
  const items = dedupeProductListItems(extractProductListItems(rawItems));
  const totalCount = toPositiveInt(response.totalElements ?? response.totalCount, items.length);
  const totalPages = toPositiveInt(
    response.totalPages,
    Math.max(1, Math.ceil(totalCount / requestedSize)),
  );

  return {
    items,
    totalCount,
    totalPages,
    page: toPositiveInt(response.page, requestedPage),
    size: toPositiveInt(response.size, requestedSize),
  };
}

export async function fetchNaverProductList(
  condition: ProductCollectionSearchCondition,
  page = condition.page ?? 1,
  size = condition.size ?? DEFAULT_PAGE_SIZE,
): Promise<NaverProductListResult> {
  const accessToken = await getAccessTokenForStore(condition.storeId);
  const body = buildProductListRequestBody(condition, page, size);

  const response = await fetch(PRODUCT_LIST_SEARCH_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`네이버 상품 목록 조회 실패 (${response.status}): ${errorText}`);
  }

  const responseBody = (await response.json()) as unknown;
  return normalizeProductListResponse(responseBody, page, size);
}

export async function createProductCollectionJob(
  condition: ProductCollectionSearchCondition,
) {
  const pageSize = condition.size ?? DEFAULT_PAGE_SIZE;

  return prisma.productCollectionJob.create({
    data: {
      storeId: condition.storeId,
      status: 'PENDING',
      searchCondition: condition,
      currentPage: condition.page ?? 1,
      pageSize,
    },
    include: {
      store: { select: { id: true, name: true } },
    },
  });
}

export async function listProductCollectionJobs() {
  return prisma.productCollectionJob.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      store: { select: { id: true, name: true } },
      _count: { select: { items: true } },
    },
    take: 50,
  });
}

export async function getProductCollectionJob(jobId: string) {
  return prisma.productCollectionJob.findUnique({
    where: { id: jobId },
    include: {
      store: { select: { id: true, name: true } },
      items: {
        where: { status: 'FAILED' },
        orderBy: { updatedAt: 'desc' },
        take: 100,
      },
      _count: { select: { items: true } },
    },
  });
}

async function updateJobStatus(
  jobId: string,
  status: ProductCollectionJobStatus,
  errorMessage?: string,
) {
  return prisma.productCollectionJob.update({
    where: { id: jobId },
    data: {
      status,
      errorMessage,
      startedAt: status === 'RUNNING' ? new Date() : undefined,
      finishedAt: status === 'COMPLETED' || status === 'FAILED' || status === 'CANCELLED'
        ? new Date()
        : undefined,
    },
  });
}

async function upsertJobItems(
  jobId: string,
  storeId: string,
  items: NaverProductListItem[],
): Promise<number> {
  let createdOrUpdatedCount = 0;

  for (const item of items) {
    await prisma.productCollectionJobItem.upsert({
      where: {
        jobId_channelProductNo: {
          jobId,
          channelProductNo: item.channelProductNo,
        },
      },
      update: {
        storeId,
        originProductNo: item.originProductNo,
        productName: item.productName,
      },
      create: {
        jobId,
        storeId,
        channelProductNo: item.channelProductNo,
        originProductNo: item.originProductNo,
        productName: item.productName,
        status: 'PENDING',
      },
    });
    createdOrUpdatedCount++;
  }

  return createdOrUpdatedCount;
}

async function collectListPagesForJob(
  jobId: string,
  condition: ProductCollectionSearchCondition,
  maxPages?: number,
): Promise<void> {
  const pageSize = condition.size ?? DEFAULT_PAGE_SIZE;
  let page = condition.page ?? 1;
  let processedPages = 0;
  let totalPages = 1;

  do {
    const result = await fetchNaverProductList(condition, page, pageSize);
    totalPages = result.totalPages;
    processedPages++;

    await upsertJobItems(jobId, condition.storeId, result.items);

    const collectedCount = await prisma.productCollectionJobItem.count({
      where: { jobId },
    });

    await prisma.productCollectionJob.update({
      where: { id: jobId },
      data: {
        totalCount: result.totalCount,
        collectedCount,
        currentPage: page,
        pageSize,
      },
    });

    page++;
  } while (page <= totalPages && (!maxPages || processedPages < maxPages));
}

async function updateJobCounters(jobId: string): Promise<void> {
  const [successCount, failCount, itemCount] = await Promise.all([
    prisma.productCollectionJobItem.count({ where: { jobId, status: 'SUCCESS' } }),
    prisma.productCollectionJobItem.count({ where: { jobId, status: 'FAILED' } }),
    prisma.productCollectionJobItem.count({ where: { jobId } }),
  ]);

  await prisma.productCollectionJob.update({
    where: { id: jobId },
    data: {
      collectedCount: itemCount,
      successCount,
      failCount,
    },
  });
}

async function collectDetailItemsForJob(
  jobId: string,
  storeId: string,
  retryFailedOnly = false,
): Promise<void> {
  const targetStatus: ProductCollectionJobItemStatus[] = retryFailedOnly
    ? ['FAILED']
    : ['PENDING', 'FAILED'];
  const items = await prisma.productCollectionJobItem.findMany({
    where: {
      jobId,
      status: { in: targetStatus },
    },
    orderBy: { createdAt: 'asc' },
  });

  for (const item of items) {
    try {
      const result = await collectNaverProductByChannelProductNo(storeId, item.channelProductNo);
      await prisma.productCollectionJobItem.update({
        where: { id: item.id },
        data: {
          productName: item.productName ?? result.product.name,
          status: 'SUCCESS',
          errorMessage: null,
          collectedAt: new Date(),
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '상품 상세 수집에 실패했습니다.';
      await prisma.productCollectionJobItem.update({
        where: { id: item.id },
        data: {
          status: 'FAILED',
          errorMessage: message,
          collectedAt: new Date(),
        },
      });
    }

    await updateJobCounters(jobId);
  }
}

export async function runProductCollectionJob(
  jobId: string,
  options: RunProductCollectionJobOptions = {},
) {
  const job = await prisma.productCollectionJob.findUnique({ where: { id: jobId } });
  if (!job) {
    throw new Error('수집 작업을 찾을 수 없습니다.');
  }

  if (job.status === 'CANCELLED') {
    throw new Error('취소된 작업은 실행할 수 없습니다.');
  }

  await updateJobStatus(jobId, 'RUNNING');

  try {
    const condition = normalizeProductListSearchCondition(job.searchCondition);

    if (!options.retryFailedOnly) {
      await collectListPagesForJob(jobId, condition, options.maxPages);
    }

    if (options.collectDetails !== false) {
      await collectDetailItemsForJob(jobId, job.storeId, options.retryFailedOnly ?? false);
    }

    await updateJobCounters(jobId);
    await updateJobStatus(jobId, 'COMPLETED');
  } catch (error) {
    const message = error instanceof Error ? error.message : '수집 작업 실행에 실패했습니다.';
    await updateJobStatus(jobId, 'FAILED', message);
  }

  return getProductCollectionJob(jobId);
}

export async function retryFailedProductCollectionJob(jobId: string) {
  return runProductCollectionJob(jobId, {
    collectDetails: true,
    retryFailedOnly: true,
  });
}
