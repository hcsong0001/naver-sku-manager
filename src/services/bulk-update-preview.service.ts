import prisma from '@/lib/prisma';
import { getStagingImportSummary } from '@/src/services/staging-import.service';
import {
  createNaverApiDraftBatch,
  type NaverApiBatchPreviewItem,
  type NaverApiBundleComponent,
} from '@/src/services/naver-api';
import { getStagingMappingSnapshot } from '@/src/services/staging-mapping-preview.service';
import type { StagingImportFileType } from '@/src/types/staging-import.types';
import type { StagingMappingCandidate, StagingMappingSku } from '@/src/types/staging-mapping-preview.types';
import type {
  BulkUpdateCandidateStatus,
  BulkUpdateDraftBatchResponse,
  BulkUpdateLinkedSku,
  BulkUpdatePreviewCandidate,
  BulkUpdatePreviewCandidatesResponse,
  BulkUpdatePreviewFilter,
  BulkUpdatePreviewSummary,
  BulkUpdatePreviewSummaryResponse,
  BulkUpdateRiskType,
} from '@/src/types/bulk-update-preview.types';
import {
  getPaginatedRows,
  getSafeCurrentPage,
  getTotalPages,
  type CommonPageSize,
} from '@/src/utils/pagination';

type SnapshotJob = {
  id: string;
  fileType: StagingImportFileType;
  storeId: string | null;
  channelId: string | null;
  appliedAt: Date | null;
  createdAt: Date;
};

type CurrentValueSource = {
  storeId: string | null;
  storeName: string;
  channelId: string;
  price: number | null;
  stock: number | null;
};

const RISK_MESSAGES: Record<BulkUpdateRiskType, string> = {
  SKU_UNRESOLVED: 'SKU 미확정',
  NO_CANDIDATE_SKU: '후보 SKU 없음',
  DIFFERENT_FROM_EXISTING: '기존 매핑과 후보 SKU 다름',
  SET_COMPONENT_MISSING: '세트상품 구성 누락',
  SET_COMPONENT_SKU_UNRESOLVED: '세트상품 구성 SKU 미확정',
  SET_COMPONENT_QUANTITY_INVALID: '세트상품 구성 수량 이상',
  STOCK_SKU_MISSING: '재고 SKU 없음',
  DUPLICATE_CANDIDATE: '중복 후보',
  SMARTSTORE_WITHOUT_ERP_CANDIDATE: '스마트스토어 상품은 있으나 ERP 재고 후보 없음',
  PRICE_BASELINE_MISSING: '가격 기준 없음',
  CURRENT_PRICE_UNAVAILABLE: '현재 스마트스토어 판매가 확인 불가',
  CURRENT_STOCK_UNAVAILABLE: '현재 스마트스토어 재고 확인 불가',
  BUNDLE_STOCK_ZERO: '세트 구성품 재고 부족으로 판매가능 수량 0',
  NO_CHANGE_DETECTED: '변경 사항 없음',
};

function normalize(value: string | null | undefined): string {
  return (value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function uniqueStrings(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => value?.trim() ?? '').filter(Boolean)));
}

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(String(value).replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toLinkedSku(row: StagingMappingSku): BulkUpdateLinkedSku {
  return {
    skuCode: row.skuCode,
    internalSkuCode: row.internalSkuCode,
    legacyStockCode: row.legacyStockCode,
    barcode: row.barcode,
    productName: row.productName,
    purchaseProductName: row.purchaseProductName,
    quantity: row.quantity,
    sellingPrice: row.sellingPrice,
    costPrice: row.costPrice,
    stockQuantity: row.stockQuantity,
    matchSource: row.matchSource,
  };
}

function targetKey(input: {
  candidateType: 'PRODUCT' | 'OPTION' | 'ADDITIONAL';
  channelProductNo: string;
  itemId: string;
  managementCode: string;
  itemName: string;
}): string {
  const identity = input.itemId || input.managementCode || normalize(input.itemName);
  return `${input.candidateType}:${input.channelProductNo}:${identity}`;
}

function itemLookupKey(input: {
  mappingType: 'PRODUCT' | 'OPTION' | 'ADDITIONAL';
  channelProductNo: string;
  itemId: string;
}): string {
  return `${input.mappingType}:${input.channelProductNo}:${input.itemId}`;
}

function sourceRowValue(sourceRow: unknown, candidates: string[]): number | null {
  if (!isRecord(sourceRow)) return null;
  const keys = Object.keys(sourceRow);
  const normalizedCandidates = candidates.map((candidate) => normalize(candidate));

  for (const key of keys) {
    const normalizedKey = normalize(key);
    if (!normalizedKey) continue;
    if (normalizedCandidates.some((candidate) => normalizedKey === candidate || normalizedKey.includes(candidate))) {
      const parsed = numberOrNull(sourceRow[key]);
      if (parsed !== null) return parsed;
    }
  }

  return null;
}

function readCurrentProductPrice(sourceRow: unknown): number | null {
  return sourceRowValue(sourceRow, ['판매가', '판매가격', '상품가격', 'saleprice', 'sellingprice', 'price']);
}

function readCurrentProductStock(sourceRow: unknown): number | null {
  return sourceRowValue(sourceRow, ['재고', '재고수량', '현재재고', 'stockquantity', 'stock']);
}

function choosePrimarySkus(row: StagingMappingCandidate): BulkUpdateLinkedSku[] {
  if (row.isSetProduct || row.candidateType === 'BUNDLE') {
    return row.setComponents
      .filter((component) => component.quantity !== null)
      .map((component) => ({
        skuCode: component.skuCode,
        internalSkuCode: component.internalSkuCode,
        legacyStockCode: component.legacyStockCode,
        barcode: component.barcode,
        productName: component.productName,
        purchaseProductName: '',
        quantity: component.quantity ?? 1,
        sellingPrice: component.sellingPrice,
        costPrice: component.costPrice,
        stockQuantity: component.stockQuantity,
        matchSource: '세트 구성 SKU',
      }));
  }

  if (row.candidateSkus.length === 1) return row.candidateSkus.map(toLinkedSku);
  if (row.existingSkus.length === 1) return row.existingSkus.map(toLinkedSku);
  return row.candidateSkus.map(toLinkedSku);
}

function sumSellingPrice(rows: BulkUpdateLinkedSku[]): number | null {
  if (rows.length === 0 || rows.some((row) => row.sellingPrice === null)) return null;
  return rows.reduce((sum, row) => sum + (row.sellingPrice ?? 0) * row.quantity, 0);
}

function sumCostPrice(rows: BulkUpdateLinkedSku[]): number | null {
  if (rows.length === 0 || rows.some((row) => row.costPrice === null)) return null;
  return rows.reduce((sum, row) => sum + (row.costPrice ?? 0) * row.quantity, 0);
}

function calculateMargin(price: number | null, cost: number | null): { margin: number | null; marginRate: number | null } {
  if (price === null || cost === null || price <= 0) return { margin: null, marginRate: null };
  const margin = price - cost;
  return {
    margin,
    marginRate: Number(((margin / price) * 100).toFixed(2)),
  };
}

function recommendedAction(status: BulkUpdateCandidateStatus, riskTypes: BulkUpdateRiskType[], priceChange: boolean, stockChange: boolean): string {
  if (riskTypes.includes('SET_COMPONENT_MISSING') || riskTypes.includes('SET_COMPONENT_SKU_UNRESOLVED')) {
    return '세트 구성 SKU를 먼저 확정한 뒤 다시 preview 하세요.';
  }
  if (riskTypes.includes('PRICE_BASELINE_MISSING')) {
    return 'ERP 기준 판매가 또는 가격 정책 기준을 먼저 정리하세요.';
  }
  if (riskTypes.includes('CURRENT_PRICE_UNAVAILABLE') || riskTypes.includes('CURRENT_STOCK_UNAVAILABLE')) {
    return '스마트스토어 원본 파일에 현재 가격/재고 컬럼이 포함되어 있는지 확인하세요.';
  }
  if (riskTypes.includes('NO_CHANGE_DETECTED')) return '현재 값과 계산 값이 같아 실행 대상에서 제외됩니다.';
  if (status === 'SAFE') {
    if (priceChange && stockChange) return '가격과 재고를 함께 검토한 뒤 draft batch를 생성할 수 있습니다.';
    if (priceChange) return '가격 수정 preview 후보로 draft batch를 생성할 수 있습니다.';
    if (stockChange) return '재고 수정 preview 후보로 draft batch를 생성할 수 있습니다.';
  }
  return '실행 전 위험 사유를 확인하고 수동 검토가 필요합니다.';
}

async function loadLatestSnapshotJobs(): Promise<SnapshotJob[]> {
  const jobs = await prisma.importJob.findMany({
    where: { status: 'APPLIED' },
    orderBy: [{ appliedAt: 'desc' }, { createdAt: 'desc' }],
  });
  const selected = new Map<string, SnapshotJob>();
  for (const job of jobs) {
    const fileType = job.fileType as StagingImportFileType;
    const scope = fileType === 'SMARTSTORE_PRODUCT'
      ? job.storeId || job.channelId || 'GLOBAL'
      : 'GLOBAL';
    const key = `${fileType}:${scope}`;
    if (!selected.has(key)) {
      selected.set(key, {
        id: job.id,
        fileType,
        storeId: job.storeId,
        channelId: job.channelId,
        appliedAt: job.appliedAt,
        createdAt: job.createdAt,
      });
    }
  }
  return Array.from(selected.values());
}

async function loadCurrentValueSources() {
  const jobs = await loadLatestSnapshotJobs();
  const smartstoreJobIds = jobs
    .filter((job) => job.fileType === 'SMARTSTORE_PRODUCT')
    .map((job) => job.id);

  const products = await prisma.stagingNaverProduct.findMany({
    where: { jobId: { in: smartstoreJobIds }, errorMessage: null },
    include: {
      job: { include: { store: { select: { name: true } } } },
      options: { where: { errorMessage: null } },
      additionals: { where: { errorMessage: null } },
    },
    orderBy: { rowNumber: 'asc' },
  });

  const byCandidateId = new Map<string, CurrentValueSource>();
  const byItemLookup = new Map<string, CurrentValueSource>();

  for (const product of products) {
    const storeId = product.storeId;
    const storeName = product.job.store?.name ?? '';
    const channelId = product.job.channelId ?? '';
    const channelProductNo = product.channelProductNo ?? product.originProductNo ?? product.externalProductId ?? '';
    const productKey = targetKey({
      candidateType: 'PRODUCT',
      channelProductNo,
      itemId: product.externalProductId ?? product.originProductNo ?? channelProductNo,
      managementCode: product.sellerManagementCode ?? '',
      itemName: product.productName,
    });
    const productSource: CurrentValueSource = {
      storeId,
      storeName,
      channelId,
      price: readCurrentProductPrice(product.sourceRow),
      stock: readCurrentProductStock(product.sourceRow),
    };
    byCandidateId.set(productKey, productSource);
    byItemLookup.set(itemLookupKey({
      mappingType: 'PRODUCT',
      channelProductNo,
      itemId: product.externalProductId ?? product.originProductNo ?? channelProductNo,
    }), productSource);

    for (const option of product.options) {
      const itemName = uniqueStrings([option.optionName, option.optionValue]).join(' / ');
      const optionChannelProductNo = option.channelProductNo ?? channelProductNo;
      const optionKey = targetKey({
        candidateType: 'OPTION',
        channelProductNo: optionChannelProductNo,
        itemId: option.optionId ?? option.optionCode ?? `${optionChannelProductNo}:${itemName}`,
        managementCode: option.optionCode ?? '',
        itemName,
      });
      const optionSource: CurrentValueSource = {
        storeId,
        storeName,
        channelId,
        price: readCurrentProductPrice(option.sourceRow),
        stock: readCurrentProductStock(option.sourceRow),
      };
      byCandidateId.set(optionKey, optionSource);
      byItemLookup.set(itemLookupKey({
        mappingType: 'OPTION',
        channelProductNo: optionChannelProductNo,
        itemId: option.optionId ?? option.optionCode ?? `${optionChannelProductNo}:${itemName}`,
      }), optionSource);
    }

    for (const additional of product.additionals) {
      const itemName = uniqueStrings([additional.additionalName, additional.additionalValue]).join(' / ');
      const additionalChannelProductNo = additional.channelProductNo ?? channelProductNo;
      const additionalKey = targetKey({
        candidateType: 'ADDITIONAL',
        channelProductNo: additionalChannelProductNo,
        itemId: additional.additionalId ?? additional.sellerManagementCode ?? `${additionalChannelProductNo}:${itemName}`,
        managementCode: additional.sellerManagementCode ?? '',
        itemName,
      });
      const additionalSource: CurrentValueSource = {
        storeId,
        storeName,
        channelId,
        price: additional.price ?? readCurrentProductPrice(additional.sourceRow),
        stock: additional.stockQuantity ?? readCurrentProductStock(additional.sourceRow),
      };
      byCandidateId.set(additionalKey, additionalSource);
      byItemLookup.set(itemLookupKey({
        mappingType: 'ADDITIONAL',
        channelProductNo: additionalChannelProductNo,
        itemId: additional.additionalId ?? additional.sellerManagementCode ?? `${additionalChannelProductNo}:${itemName}`,
      }), additionalSource);
    }
  }

  return { byCandidateId, byItemLookup };
}

function buildBulkCandidate(
  row: StagingMappingCandidate,
  currentValueSource: CurrentValueSource | undefined,
): BulkUpdatePreviewCandidate {
  const linkedSkus = choosePrimarySkus(row);
  const bundleSkus = row.isSetProduct || row.candidateType === 'BUNDLE'
    ? linkedSkus
    : [];

  const currentSmartstorePrice = currentValueSource?.price ?? null;
  const currentSmartstoreStock = currentValueSource?.stock ?? null;
  const calculatedTargetPrice = row.isSetProduct || row.candidateType === 'BUNDLE'
    ? sumSellingPrice(bundleSkus)
    : linkedSkus.length === 1
      ? linkedSkus[0].sellingPrice
      : null;
  const calculatedTargetStock = row.isSetProduct || row.candidateType === 'BUNDLE'
    ? row.sellableSetStock
    : linkedSkus.length === 1
      ? linkedSkus[0].stockQuantity
      : null;
  const costPrice = row.isSetProduct || row.candidateType === 'BUNDLE'
    ? sumCostPrice(bundleSkus)
    : linkedSkus.length === 1
      ? linkedSkus[0].costPrice
      : null;
  const { margin, marginRate } = calculateMargin(calculatedTargetPrice, costPrice);

  const riskTypes = new Set<BulkUpdateRiskType>(row.riskTypes);
  const hasPriceChange = currentSmartstorePrice !== null
    && calculatedTargetPrice !== null
    && currentSmartstorePrice !== calculatedTargetPrice;
  const hasStockChange = currentSmartstoreStock !== null
    && calculatedTargetStock !== null
    && currentSmartstoreStock !== calculatedTargetStock;

  if ((row.isSetProduct || row.candidateType === 'BUNDLE') && calculatedTargetStock === 0) {
    riskTypes.add('BUNDLE_STOCK_ZERO');
  }

  const blockingStagingRisks: BulkUpdateRiskType[] = [
    'SKU_UNRESOLVED',
    'NO_CANDIDATE_SKU',
    'DIFFERENT_FROM_EXISTING',
    'SET_COMPONENT_MISSING',
    'SET_COMPONENT_SKU_UNRESOLVED',
    'SET_COMPONENT_QUANTITY_INVALID',
    'STOCK_SKU_MISSING',
    'DUPLICATE_CANDIDATE',
    'SMARTSTORE_WITHOUT_ERP_CANDIDATE',
    'BUNDLE_STOCK_ZERO',
  ];
  const hasBlockingRisk = Array.from(riskTypes).some((risk) => blockingStagingRisks.includes(risk));
  const priceExecutable = !hasBlockingRisk && hasPriceChange;
  const stockExecutable = !hasBlockingRisk && hasStockChange;

  if (!priceExecutable && !stockExecutable) {
    if (calculatedTargetPrice === null) riskTypes.add('PRICE_BASELINE_MISSING');
    else if (currentSmartstorePrice === null) riskTypes.add('CURRENT_PRICE_UNAVAILABLE');

    if (calculatedTargetStock === null) riskTypes.add('CURRENT_STOCK_UNAVAILABLE');
    else if (currentSmartstoreStock === null) riskTypes.add('CURRENT_STOCK_UNAVAILABLE');

    if (!hasPriceChange && !hasStockChange) riskTypes.add('NO_CHANGE_DETECTED');
  }

  const normalizedRiskTypes = Array.from(riskTypes);
  const executable = priceExecutable || stockExecutable;

  const status: BulkUpdateCandidateStatus = executable
    ? 'SAFE'
    : normalizedRiskTypes.some((risk) => risk !== 'NO_CHANGE_DETECTED')
      ? 'RISK'
      : 'EXCLUDED';

  return {
    id: `${row.id}:${currentValueSource?.storeId ?? row.storeId ?? 'GLOBAL'}`,
    sourceCandidateId: row.id,
    storeId: currentValueSource?.storeId ?? row.storeId,
    storeName: currentValueSource?.storeName ?? row.storeName,
    channelId: currentValueSource?.channelId ?? row.channelId,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    candidateType: row.candidateType,
    sourceMappingType: row.sourceMappingType,
    productName: row.productName,
    itemName: row.itemName,
    serialNo: row.serialNo,
    isSetProduct: row.isSetProduct,
    linkedSkus,
    bundleSkus,
    currentSmartstorePrice,
    calculatedTargetPrice,
    currentSmartstoreStock,
    calculatedTargetStock,
    hasPriceChange,
    hasStockChange,
    costPrice,
    expectedMargin: margin,
    marginRate,
    status,
    riskTypes: normalizedRiskTypes,
    riskMessages: normalizedRiskTypes.map((risk) => RISK_MESSAGES[risk]),
    recommendedAction: recommendedAction(status, normalizedRiskTypes, hasPriceChange, hasStockChange),
    executable,
    draftCreatable: executable,
  };
}

function applyFilter(rows: BulkUpdatePreviewCandidate[], filter: BulkUpdatePreviewFilter): BulkUpdatePreviewCandidate[] {
  if (filter === 'ALL') return rows;
  if (filter === 'SAFE') return rows.filter((row) => row.status === 'SAFE');
  if (filter === 'RISK') return rows.filter((row) => row.status === 'RISK');
  if (filter === 'EXCLUDED') return rows.filter((row) => row.status === 'EXCLUDED');
  if (filter === 'PRICE') return rows.filter((row) => row.hasPriceChange && !row.hasStockChange);
  if (filter === 'STOCK') return rows.filter((row) => !row.hasPriceChange && row.hasStockChange);
  if (filter === 'PRICE_AND_STOCK') return rows.filter((row) => row.hasPriceChange && row.hasStockChange);
  if (filter === 'SET') return rows.filter((row) => row.isSetProduct);
  if (filter === 'SINGLE') return rows.filter((row) => !row.isSetProduct);
  return rows.filter((row) => row.candidateType === filter);
}

async function buildBulkUpdateSnapshot() {
  const [snapshot, currentValueSources, importSummary] = await Promise.all([
    getStagingMappingSnapshot(),
    loadCurrentValueSources(),
    getStagingImportSummary(),
  ]);

  // 중복이 제외된 고유 후보군만 벌크 업데이트 후보로 빌드
  const uniqueRows = snapshot.rows.filter((row) => !row.isDuplicate);

  const rows = uniqueRows.map((row) => {
    const currentValueSource = currentValueSources.byCandidateId.get(row.id)
      ?? (row.sourceMappingType && row.itemId
        ? currentValueSources.byItemLookup.get(itemLookupKey({
          mappingType: row.sourceMappingType,
          channelProductNo: row.channelProductNo,
          itemId: row.itemId,
        }))
        : undefined);
    return buildBulkCandidate(row, currentValueSource);
  }).sort((left, right) => {
    const statusOrder = { RISK: 0, EXCLUDED: 1, SAFE: 2 } as const;
    return statusOrder[left.status] - statusOrder[right.status]
      || left.channelProductNo.localeCompare(right.channelProductNo)
      || left.itemName.localeCompare(right.itemName, 'ko');
  });

  const summary: BulkUpdatePreviewSummary = {
    totalCandidateCount: rows.length,
    priceUpdateCandidateCount: rows.filter((row) => row.hasPriceChange && !row.hasStockChange).length,
    stockUpdateCandidateCount: rows.filter((row) => !row.hasPriceChange && row.hasStockChange).length,
    priceAndStockUpdateCandidateCount: rows.filter((row) => row.hasPriceChange && row.hasStockChange).length,
    singleCandidateCount: rows.filter((row) => !row.isSetProduct).length,
    setCandidateCount: rows.filter((row) => row.isSetProduct).length,
    safeCandidateCount: rows.filter((row) => row.status === 'SAFE').length,
    riskCandidateCount: rows.filter((row) => row.status === 'RISK').length,
    excludedCandidateCount: rows.filter((row) => row.status === 'EXCLUDED').length,
    expectedApiCallCount: rows.reduce((sum, row) =>
      sum + (row.executable && row.hasPriceChange ? 1 : 0) + (row.executable && row.hasStockChange ? 1 : 0), 0),
    draftBatchCreatableCount: rows.filter((row) => row.draftCreatable).length,
    mappingSafeCandidateCount: uniqueRows.filter((row) => row.riskTypes.length === 0).length,
    updateTargetCandidateCount: rows.filter((row) => row.hasPriceChange || row.hasStockChange).length,
  };

  const missingBulkRequirements = [
    ...(importSummary.snapshot.latestAppliedJobs.ERP_STOCK ? [] : ['ERP_STOCK' as const]),
    ...(importSummary.snapshot.latestAppliedJobs.SMARTSTORE_PRODUCT ? [] : ['SMARTSTORE_PRODUCT' as const]),
    ...(importSummary.snapshot.latestAppliedJobs.PRODUCT_VARIANT_KEYWORD ? [] : ['PRODUCT_VARIANT_KEYWORD' as const]),
  ];

  return {
    rows,
    summary,
    snapshot: {
      ...importSummary.snapshot,
      hasRequiredBulkData: missingBulkRequirements.length === 0,
      missingBulkRequirements,
      hasCandidateRows: rows.length > 0,
    },
  };
}

function buildBatchItem(candidate: BulkUpdatePreviewCandidate): NaverApiBatchPreviewItem {
  const operation = candidate.hasPriceChange && candidate.hasStockChange
    ? 'bulkUpdatePriceAndInventory'
    : candidate.hasPriceChange
      ? 'bulkUpdatePrice'
      : 'bulkUpdateInventory';
  const bundleComponents: NaverApiBundleComponent[] | undefined = candidate.isSetProduct
    ? candidate.bundleSkus.map((sku) => ({
      skuCode: sku.skuCode,
      internalSkuCode: sku.internalSkuCode,
      legacyStockCode: sku.legacyStockCode,
      barcode: sku.barcode,
      productName: sku.productName || sku.purchaseProductName,
      quantity: sku.quantity,
      costPrice: sku.costPrice,
      stockQuantity: sku.stockQuantity,
    }))
    : undefined;
  const primarySku = candidate.linkedSkus[0];

  return {
    storeId: candidate.storeId ?? '',
    channelId: candidate.channelId || undefined,
    productNo: candidate.channelProductNo || undefined,
    channelProductNo: candidate.channelProductNo || undefined,
    targetType: candidate.candidateType,
    targetId: candidate.itemId || candidate.sourceCandidateId,
    operation,
    internalSkuCode: !candidate.isSetProduct ? primarySku?.internalSkuCode ?? undefined : undefined,
    legacyStockCode: !candidate.isSetProduct ? primarySku?.legacyStockCode ?? undefined : undefined,
    barcode: !candidate.isSetProduct ? primarySku?.barcode ?? undefined : undefined,
    skuLookupKeys: {
      sourceCandidateId: candidate.sourceCandidateId,
      skuCodes: candidate.linkedSkus.map((sku) => sku.skuCode).filter(Boolean),
      barcodes: candidate.linkedSkus.map((sku) => sku.barcode).filter(Boolean),
    },
    bundleComponents,
    previewBefore: {
      price: candidate.currentSmartstorePrice,
      stockQuantity: candidate.currentSmartstoreStock,
    },
    previewAfter: {
      price: candidate.hasPriceChange ? candidate.calculatedTargetPrice : candidate.currentSmartstorePrice,
      stockQuantity: candidate.hasStockChange ? candidate.calculatedTargetStock : candidate.currentSmartstoreStock,
      costPrice: candidate.costPrice,
      expectedMargin: candidate.expectedMargin,
      marginRate: candidate.marginRate,
    },
    requestPayload: {
      targetType: candidate.candidateType,
      itemName: candidate.itemName,
      productName: candidate.productName,
      applyPrice: candidate.hasPriceChange,
      applyStock: candidate.hasStockChange,
      linkedSkus: candidate.linkedSkus.map((sku) => ({
        skuCode: sku.skuCode,
        quantity: sku.quantity,
        sellingPrice: sku.sellingPrice,
        costPrice: sku.costPrice,
        stockQuantity: sku.stockQuantity,
      })),
    },
  };
}

export async function getBulkUpdatePreviewSummary(): Promise<BulkUpdatePreviewSummaryResponse> {
  const snapshot = await buildBulkUpdateSnapshot();
  return {
    summary: snapshot.summary,
    snapshot: snapshot.snapshot,
    generatedAt: new Date().toISOString(),
  };
}

export async function getBulkUpdatePreviewCandidates(input: {
  filter: BulkUpdatePreviewFilter;
  page: number;
  pageSize: CommonPageSize;
}): Promise<BulkUpdatePreviewCandidatesResponse> {
  const snapshot = await buildBulkUpdateSnapshot();
  const filteredRows = applyFilter(snapshot.rows, input.filter);
  const totalPages = getTotalPages(filteredRows.length, input.pageSize);
  const currentPage = getSafeCurrentPage(input.page, totalPages);
  return {
    rows: getPaginatedRows(filteredRows, input.pageSize, currentPage),
    totalCount: filteredRows.length,
    currentPage,
    totalPages,
    pageSize: input.pageSize,
    filter: input.filter,
  };
}

export async function createBulkUpdateDraftBatch(input: {
  candidateIds: string[];
}): Promise<BulkUpdateDraftBatchResponse> {
  const requestedIds = Array.from(new Set(input.candidateIds.map((id) => id.trim()).filter(Boolean)));
  if (requestedIds.length === 0) {
    throw new Error('draft batch로 생성할 후보를 선택하세요.');
  }

  const snapshot = await buildBulkUpdateSnapshot();
  const selected = snapshot.rows.filter((row) => requestedIds.includes(row.id));
  if (selected.length !== requestedIds.length) {
    throw new Error('선택한 후보 중 일부를 찾을 수 없습니다. 목록을 새로고침한 뒤 다시 시도하세요.');
  }
  if (selected.some((row) => !row.storeId)) {
    throw new Error('스토어 정보가 없는 후보는 draft batch를 생성할 수 없습니다.');
  }
  if (selected.some((row) => !row.draftCreatable)) {
    throw new Error('실행 제외 또는 위험 후보가 포함되어 draft batch를 생성할 수 없습니다.');
  }
  if (!snapshot.snapshot.hasRequiredBulkData) {
    throw new Error(`staging 데이터가 부족하여 draft batch를 생성할 수 없습니다: ${snapshot.snapshot.missingBulkRequirements.join(', ')}`);
  }

  const expectedApiCallCount = selected.reduce((sum, row) =>
    sum + (row.hasPriceChange ? 1 : 0) + (row.hasStockChange ? 1 : 0), 0);
  const batch = await createNaverApiDraftBatch({
    jobType: 'SMARTSTORE_BULK_UPDATE_PREVIEW',
    module: 'PRODUCT',
    description: '가격/재고 수정 Preview에서 생성한 draft batch',
    previewSummary: {
      candidateCount: selected.length,
      expectedApiCallCount,
    },
    metadata: {
      source: 'bulk-update-preview',
      candidateIds: selected.map((row) => row.id),
    },
    items: selected.map(buildBatchItem),
  });

  return {
    batchJobId: batch.id,
    status: batch.status === 'PREVIEW' ? 'PREVIEW' : 'DRAFT',
    candidateCount: selected.length,
    expectedApiCallCount,
    totalItems: batch.totalItems,
    successItems: batch.successItems,
    failedItems: batch.failedItems,
    skippedItems: batch.skippedItems,
    actualApiCalled: false,
    createdAt: batch.createdAt.toISOString(),
  };
}
