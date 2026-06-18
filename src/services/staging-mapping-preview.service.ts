import prisma from '@/lib/prisma';
import type { StagingImportFileType } from '@/src/types/staging-import.types';
import type {
  StagingMappingCandidate,
  StagingMappingCandidatesResponse,
  StagingMappingCandidateType,
  StagingMappingFilter,
  StagingMappingPreviewSummary,
  StagingMappingRiskType,
  StagingMappingSetComponent,
  StagingMappingSku,
  StagingMappingSourceJob,
  StagingMappingStatus,
  StagingMappingSummaryResponse,
} from '@/src/types/staging-mapping-preview.types';
import {
  getPaginatedRows,
  getSafeCurrentPage,
  getTotalPages,
  type CommonPageSize,
} from '@/src/utils/pagination';

type SnapshotJob = {
  id: string;
  fileType: StagingImportFileType;
  fileName: string;
  storeId: string | null;
  channelId: string | null;
  appliedAt: Date | null;
  createdAt: Date;
  store: { name: string } | null;
};

type StockRow = {
  id: string;
  barcode: string;
  productName: string;
  purchaseProductName: string;
  internalProductCode: string;
  modelName: string;
  supplierItemCode: string;
  optionCode: string;
  sellingPrice: unknown;
  costPrice: unknown;
  stockQuantity: number | null;
  skuCodeCandidate: string;
};

type MappingRow = {
  id: string;
  mappingType: string;
  smartstoreName: string;
  channelProductNo: string;
  productName: string;
  itemId: string;
  itemName: string;
  managementCode: string;
  currentSkuCode: string;
  skuCode: string;
  quantity: number;
};

type MappingTarget = {
  id: string;
  candidateType: Exclude<StagingMappingCandidateType, 'BUNDLE'>;
  storeId: string | null;
  storeName: string;
  channelId: string;
  channelProductNo: string;
  itemId: string;
  productName: string;
  itemName: string;
  managementCode: string;
  strongSearchValues: string[];
  nameSearchValues: string[];
};

type ProductVariantRow = {
  id: string;
  channelProductNo: string | null;
  mappingType: string | null;
  itemId: string | null;
  itemName: string | null;
  serialNo: string;
  productMatchName: string;
  productOptionText: string;
  stockMatchedProductName: string;
  stockMatchedOptionText: string;
  quantityText: string;
  resolvedSkuCode: string | null;
  resolvedModelCodes: string | null;
  barcode: string | null;
  quantity: number | null;
  isSetProduct: boolean;
  job: {
    storeId: string | null;
    channelId: string | null;
    store: { name: string } | null;
  };
};

type StockIndex = {
  rows: StockRow[];
  exact: Map<string, StockRow[]>;
  searchable: Map<string, string[]>;
};

type MappingIndex = {
  exact: Map<string, MappingRow[]>;
  byChannelName: Map<string, MappingRow[]>;
  byManagementCode: Map<string, MappingRow[]>;
  productByChannel: Map<string, MappingRow[]>;
  rows: MappingRow[];
};

type Snapshot = {
  rows: StagingMappingCandidate[];
  summary: StagingMappingPreviewSummary;
  sourceJobs: StagingMappingSourceJob[];
};

const RISK_MESSAGES: Record<StagingMappingRiskType, string> = {
  SKU_UNRESOLVED: 'SKU 미확정',
  NO_CANDIDATE_SKU: '후보 SKU 없음',
  DIFFERENT_FROM_EXISTING: '기존 매핑과 후보 SKU 다름',
  SET_COMPONENT_MISSING: '세트상품 구성 누락',
  SET_COMPONENT_SKU_UNRESOLVED: '세트상품 구성 SKU 미확정',
  SET_COMPONENT_QUANTITY_INVALID: '세트상품 구성 수량 이상',
  STOCK_SKU_MISSING: '재고 SKU 없음',
  DUPLICATE_CANDIDATE: '중복 후보',
  SMARTSTORE_WITHOUT_ERP_CANDIDATE: '스마트스토어 상품은 있으나 ERP 재고 후보 없음',
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
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function addToMap<T>(map: Map<string, T[]>, key: string, value: T): void {
  if (!key) return;
  const rows = map.get(key) ?? [];
  rows.push(value);
  map.set(key, rows);
}

function uniqueById<T extends { id: string }>(rows: T[]): T[] {
  return Array.from(new Map(rows.map((row) => [row.id, row])).values());
}

function stockSkuCode(stock: StockRow): string {
  return stock.skuCodeCandidate || stock.internalProductCode || stock.optionCode || stock.barcode;
}

function stockLegacyCode(stock: StockRow): string {
  return stock.internalProductCode || stock.optionCode || stock.barcode;
}

function buildStockIndex(rows: StockRow[]): StockIndex {
  const exact = new Map<string, StockRow[]>();
  const searchable = new Map<string, string[]>();

  for (const row of rows) {
    const values = uniqueStrings([
      row.skuCodeCandidate,
      row.internalProductCode,
      row.optionCode,
      row.barcode,
      row.modelName,
      row.supplierItemCode,
      row.productName,
      row.purchaseProductName,
    ]);
    const normalizedValues = uniqueStrings(values.map(normalize));
    searchable.set(row.id, normalizedValues);
    for (const value of normalizedValues) addToMap(exact, value, row);
  }

  return { rows, exact, searchable };
}

function findStockMatches(index: StockIndex, strongValues: string[], nameValues: string[]): StockRow[] {
  const exactStrong = uniqueById(
    uniqueStrings(strongValues).flatMap((value) => index.exact.get(normalize(value)) ?? []),
  );
  if (exactStrong.length > 0) return exactStrong;

  const exactNames = uniqueById(
    uniqueStrings(nameValues).flatMap((value) => index.exact.get(normalize(value)) ?? []),
  );
  if (exactNames.length > 0) return exactNames;

  const comparableNames = uniqueStrings(nameValues.map(normalize)).filter((value) => value.length >= 8);
  if (comparableNames.length === 0) return [];

  return index.rows.filter((row) => {
    const stockValues = index.searchable.get(row.id) ?? [];
    return comparableNames.some((name) =>
      stockValues.some((stockValue) => stockValue.length >= 8 && (stockValue.includes(name) || name.includes(stockValue))),
    );
  }).slice(0, 20);
}

function stockToSku(stock: StockRow, quantity: number, matchSource: string): StagingMappingSku {
  return {
    skuCode: stockSkuCode(stock),
    internalSkuCode: null,
    legacyStockCode: stockLegacyCode(stock),
    barcode: stock.barcode,
    productName: stock.productName,
    purchaseProductName: stock.purchaseProductName,
    quantity,
    sellingPrice: numberOrNull(stock.sellingPrice),
    costPrice: numberOrNull(stock.costPrice),
    stockQuantity: stock.stockQuantity,
    matchSource,
  };
}

function buildMappingIndex(rows: MappingRow[]): MappingIndex {
  const exact = new Map<string, MappingRow[]>();
  const byChannelName = new Map<string, MappingRow[]>();
  const byManagementCode = new Map<string, MappingRow[]>();
  const productByChannel = new Map<string, MappingRow[]>();

  for (const row of rows) {
    const type = row.mappingType.toUpperCase();
    addToMap(exact, `${type}:${row.itemId}`, row);
    addToMap(byChannelName, `${type}:${row.channelProductNo}:${normalize(row.itemName)}`, row);
    addToMap(byManagementCode, `${type}:${row.channelProductNo}:${normalize(row.managementCode)}`, row);
    if (type === 'PRODUCT') addToMap(productByChannel, row.channelProductNo, row);
  }

  return { exact, byChannelName, byManagementCode, productByChannel, rows };
}

function findExistingMappings(index: MappingIndex, target: {
  mappingType: string | null;
  itemId: string;
  channelProductNo: string;
  itemName: string;
  managementCode?: string;
}): MappingRow[] {
  const type = target.mappingType?.toUpperCase() ?? '';
  const lookups = [
    type && target.itemId ? index.exact.get(`${type}:${target.itemId}`) : undefined,
    type && target.managementCode
      ? index.byManagementCode.get(`${type}:${target.channelProductNo}:${normalize(target.managementCode)}`)
      : undefined,
    type && target.itemName
      ? index.byChannelName.get(`${type}:${target.channelProductNo}:${normalize(target.itemName)}`)
      : undefined,
    type === 'PRODUCT' ? index.productByChannel.get(target.channelProductNo) : undefined,
  ];
  return uniqueById(lookups.find((rows) => rows && rows.length > 0) ?? []);
}

function mappingRowsToSkus(rows: MappingRow[], stockIndex: StockIndex): StagingMappingSku[] {
  return rows.map((row) => {
    const stockMatches = findStockMatches(stockIndex, [row.skuCode, row.currentSkuCode], []);
    const stock = stockMatches.length === 1 ? stockMatches[0] : null;
    if (stock) return stockToSku(stock, Math.max(row.quantity, 1), '기존 staging 매핑');
    return {
      skuCode: row.skuCode || row.currentSkuCode,
      internalSkuCode: null,
      legacyStockCode: '',
      barcode: '',
      productName: row.productName,
      purchaseProductName: '',
      quantity: Math.max(row.quantity, 1),
      sellingPrice: null,
      costPrice: null,
      stockQuantity: null,
      matchSource: '기존 staging 매핑',
    };
  });
}

function parseQuantity(value: string, fallback: number | null): number | null {
  if (fallback !== null) return Number.isInteger(fallback) && fallback > 0 ? fallback : null;
  const normalized = value.normalize('NFKC').trim();
  if (!normalized) return 1;
  const multiplied = normalized.match(/(?:x|\*)\s*(\d+)\s*개?/i);
  if (multiplied) return Number(multiplied[1]) > 0 ? Number(multiplied[1]) : null;
  const plain = normalized.match(/^(\d+)\s*개?$/);
  if (plain) return Number(plain[1]) > 0 ? Number(plain[1]) : null;
  return null;
}

function splitIdentifiers(value: string | null): string[] {
  return uniqueStrings((value ?? '').split(/[,/|]+/));
}

function componentFromVariantRow(row: ProductVariantRow, stockIndex: StockIndex): StagingMappingSetComponent {
  const quantity = parseQuantity(row.quantityText, row.quantity);
  const matches = findStockMatches(
    stockIndex,
    [
      ...splitIdentifiers(row.resolvedSkuCode),
      ...splitIdentifiers(row.resolvedModelCodes),
      ...splitIdentifiers(row.barcode),
    ],
    [row.stockMatchedProductName, row.stockMatchedOptionText],
  );
  const stock = matches.length === 1 ? matches[0] : null;

  return {
    sourceName: row.stockMatchedProductName || row.stockMatchedOptionText,
    quantity,
    resolved: Boolean(stock) && quantity !== null,
    skuCode: stock ? stockSkuCode(stock) : '',
    internalSkuCode: null,
    legacyStockCode: stock ? stockLegacyCode(stock) : '',
    barcode: stock?.barcode ?? '',
    productName: stock?.productName ?? '',
    sellingPrice: stock ? numberOrNull(stock.sellingPrice) : null,
    costPrice: stock ? numberOrNull(stock.costPrice) : null,
    stockQuantity: stock?.stockQuantity ?? null,
    candidateSkuCodes: uniqueStrings(matches.map(stockSkuCode)),
  };
}

function mergeResolvedComponents(components: StagingMappingSetComponent[]): StagingMappingSetComponent[] {
  const merged = new Map<string, StagingMappingSetComponent>();
  for (const component of components) {
    const key = component.resolved ? component.skuCode : `UNRESOLVED:${normalize(component.sourceName)}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, component);
      continue;
    }
    merged.set(key, {
      ...existing,
      quantity:
        existing.quantity === null || component.quantity === null
          ? null
          : existing.quantity + component.quantity,
      candidateSkuCodes: uniqueStrings([...existing.candidateSkuCodes, ...component.candidateSkuCodes]),
    });
  }
  return Array.from(merged.values());
}

function calculateSet(components: StagingMappingSetComponent[]): Pick<
  StagingMappingCandidate,
  'setTotalQuantity' | 'setCostCalculable' | 'setCostPrice' | 'setStockCalculable' | 'sellableSetStock'
> {
  const quantitiesValid = components.length > 0 && components.every(
    (component) => component.quantity !== null && component.quantity > 0,
  );
  const setTotalQuantity = quantitiesValid
    ? components.reduce((sum, component) => sum + (component.quantity ?? 0), 0)
    : null;
  const setCostCalculable = quantitiesValid && components.every(
    (component) => component.resolved && component.costPrice !== null,
  );
  const setStockCalculable = quantitiesValid && components.every(
    (component) => component.resolved && component.stockQuantity !== null,
  );
  const setCostPrice = setCostCalculable
    ? components.reduce((sum, component) => sum + (component.costPrice ?? 0) * (component.quantity ?? 0), 0)
    : null;
  const sellableSetStock = setStockCalculable
    ? Math.min(...components.map((component) => Math.floor((component.stockQuantity ?? 0) / (component.quantity ?? 1))))
    : null;

  return { setTotalQuantity, setCostCalculable, setCostPrice, setStockCalculable, sellableSetStock };
}

function componentsFromSkus(skus: StagingMappingSku[]): StagingMappingSetComponent[] {
  return skus.map((sku) => ({
    sourceName: sku.productName || sku.purchaseProductName || sku.skuCode,
    quantity: sku.quantity,
    resolved: Boolean(sku.skuCode && sku.barcode),
    skuCode: sku.skuCode,
    internalSkuCode: sku.internalSkuCode,
    legacyStockCode: sku.legacyStockCode,
    barcode: sku.barcode,
    productName: sku.productName,
    sellingPrice: sku.sellingPrice,
    costPrice: sku.costPrice,
    stockQuantity: sku.stockQuantity,
    candidateSkuCodes: sku.skuCode ? [sku.skuCode] : [],
  }));
}

function sameSkuComposition(left: StagingMappingSku[], right: StagingMappingSku[]): boolean {
  if (left.length !== right.length) return false;
  const leftKeys = new Set(left.map((sku) => `${normalize(sku.skuCode)}:${sku.quantity}`));
  return right.every((sku) => leftKeys.has(`${normalize(sku.skuCode)}:${sku.quantity}`));
}

function recommendedAction(status: StagingMappingStatus, risks: StagingMappingRiskType[]): string {
  if (risks.some((risk) => ['SET_COMPONENT_MISSING', 'SET_COMPONENT_SKU_UNRESOLVED', 'SET_COMPONENT_QUANTITY_INVALID'].includes(risk))) {
    return '세트 구성과 구성 수량을 수동 검토하세요.';
  }
  if (risks.includes('DIFFERENT_FROM_EXISTING')) return '기존 매핑과 후보 SKU 구성을 비교하세요.';
  if (risks.includes('STOCK_SKU_MISSING')) return 'ERP 재고 import와 SKU 식별코드를 확인하세요.';
  if (risks.includes('DUPLICATE_CANDIDATE')) return '중복 후보 중 올바른 SKU를 선택하세요.';
  if (risks.includes('NO_CANDIDATE_SKU') || risks.includes('SKU_UNRESOLVED')) return 'SKU 검색 후 수동확정이 필요합니다.';
  if (status === 'MAPPED') return '기존 매핑을 유지할 수 있습니다.';
  return '후보 SKU를 검토한 뒤 수동확정하세요.';
}

function finalizeCandidate(
  base: Omit<StagingMappingCandidate, 'mappingStatus' | 'riskTypes' | 'riskMessages' | 'recommendedAction'>,
  riskTypes: StagingMappingRiskType[],
): StagingMappingCandidate {
  const uniqueRisks = Array.from(new Set(riskTypes));
  const mappingStatus: StagingMappingStatus = uniqueRisks.length > 0
    ? 'RISK'
    : base.existingSkus.length > 0
      ? 'MAPPED'
      : 'UNMAPPED';
  return {
    ...base,
    mappingStatus,
    riskTypes: uniqueRisks,
    riskMessages: uniqueRisks.map((risk) => RISK_MESSAGES[risk]),
    recommendedAction: recommendedAction(mappingStatus, uniqueRisks),
  };
}

async function loadLatestSnapshotJobs(): Promise<SnapshotJob[]> {
  const jobs = await prisma.importJob.findMany({
    where: { status: 'APPLIED' },
    include: { store: { select: { name: true } } },
    orderBy: [{ appliedAt: 'desc' }, { createdAt: 'desc' }],
  });
  const selected = new Map<string, SnapshotJob>();
  for (const job of jobs) {
    const fileType = job.fileType as StagingImportFileType;
    const scope = fileType === 'SMARTSTORE_PRODUCT'
      ? job.storeId || job.channelId || 'GLOBAL'
      : 'GLOBAL';
    const key = `${fileType}:${scope}`;
    if (!selected.has(key)) selected.set(key, { ...job, fileType });
  }
  return Array.from(selected.values());
}

function jobIds(jobs: SnapshotJob[], fileType: StagingImportFileType): string[] {
  return jobs.filter((job) => job.fileType === fileType).map((job) => job.id);
}

function targetKey(target: Omit<MappingTarget, 'id'>): string {
  const identity = target.itemId || target.managementCode || normalize(target.itemName);
  return `${target.candidateType}:${target.channelProductNo}:${identity}`;
}

function buildTargetCandidate(
  target: MappingTarget,
  stockIndex: StockIndex,
  mappingIndex: MappingIndex,
): StagingMappingCandidate {
  const existingRows = findExistingMappings(mappingIndex, {
    mappingType: target.candidateType,
    itemId: target.itemId,
    channelProductNo: target.channelProductNo,
    itemName: target.itemName,
    managementCode: target.managementCode,
  });
  const existingSkus = mappingRowsToSkus(existingRows, stockIndex);
  const stockMatches = findStockMatches(stockIndex, target.strongSearchValues, target.nameSearchValues);
  const candidateSkus = stockMatches.map((stock) => stockToSku(stock, 1, 'staging ERP 재고 후보'));
  const isSetProduct = existingSkus.length > 1;
  const setComponents = isSetProduct ? componentsFromSkus(existingSkus) : [];
  const setCalculation = isSetProduct
    ? calculateSet(setComponents)
    : {
        setTotalQuantity: null,
        setCostCalculable: null,
        setCostPrice: null,
        setStockCalculable: null,
        sellableSetStock: null,
      };
  const risks: StagingMappingRiskType[] = [];

  if (candidateSkus.length > 1 && !isSetProduct) risks.push('DUPLICATE_CANDIDATE', 'SKU_UNRESOLVED');
  if (existingSkus.some((sku) => !sku.barcode)) risks.push('STOCK_SKU_MISSING');
  if (existingSkus.length === 0 && candidateSkus.length === 0) {
    risks.push('SKU_UNRESOLVED', 'NO_CANDIDATE_SKU', 'SMARTSTORE_WITHOUT_ERP_CANDIDATE');
  }
  if (existingSkus.length > 0 && candidateSkus.length > 0 && !sameSkuComposition(existingSkus, candidateSkus)) {
    risks.push('DIFFERENT_FROM_EXISTING');
  }

  return finalizeCandidate({
    id: target.id,
    storeId: target.storeId,
    storeName: target.storeName,
    channelId: target.channelId,
    channelProductNo: target.channelProductNo,
    itemId: target.itemId,
    candidateType: target.candidateType,
    sourceMappingType: target.candidateType,
    productName: target.productName,
    itemName: target.itemName,
    serialNo: '',
    isSetProduct,
    candidateSkus,
    existingSkus,
    setComponents,
    ...setCalculation,
  }, risks);
}

function buildVariantCandidate(
  group: ProductVariantRow[],
  stockIndex: StockIndex,
  mappingIndex: MappingIndex,
): StagingMappingCandidate {
  const first = group[0];
  const sourceMappingType = ['PRODUCT', 'OPTION', 'ADDITIONAL'].includes(first.mappingType ?? '')
    ? first.mappingType as 'PRODUCT' | 'OPTION' | 'ADDITIONAL'
    : null;
  const isSetProduct = group.some((row) => row.isSetProduct)
    || uniqueStrings(group.map((row) => row.stockMatchedProductName)).length > 1
    || group.length > 1;
  const components = mergeResolvedComponents(group.map((row) => componentFromVariantRow(row, stockIndex)));
  const itemName = first.itemName || first.productOptionText || first.productMatchName || `일련번호 ${first.serialNo}`;
  const channelProductNo = first.channelProductNo || first.job.channelId || '';
  let existingRows = findExistingMappings(mappingIndex, {
    mappingType: sourceMappingType,
    itemId: first.itemId ?? '',
    channelProductNo,
    itemName,
  });

  if (existingRows.length === 0) {
    const itemNorm = normalize(itemName);
    existingRows = mappingIndex.rows.filter((row) => {
      if (channelProductNo && row.channelProductNo && row.channelProductNo !== channelProductNo) return false;
      const mappingNorm = normalize(row.itemName);
      return itemNorm.length >= 6 && mappingNorm.length >= 6
        && (itemNorm.includes(mappingNorm) || mappingNorm.includes(itemNorm));
    });
  }

  const existingSkus = mappingRowsToSkus(uniqueById(existingRows), stockIndex);
  const candidateSkus = components
    .filter((component) => component.resolved)
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
      matchSource: 'ProductVariantKeyword 세트 구성',
    }));
  const setCalculation = isSetProduct
    ? calculateSet(components)
    : {
        setTotalQuantity: null,
        setCostCalculable: null,
        setCostPrice: null,
        setStockCalculable: null,
        sellableSetStock: null,
      };
  const risks: StagingMappingRiskType[] = [];

  if (isSetProduct && (components.length < 2 || group.length < 2)) risks.push('SET_COMPONENT_MISSING');
  if (components.some((component) => component.quantity === null)) risks.push('SET_COMPONENT_QUANTITY_INVALID');
  if (components.some((component) => !component.resolved)) {
    risks.push('SKU_UNRESOLVED');
    if (isSetProduct) risks.push('SET_COMPONENT_SKU_UNRESOLVED');
  }
  if (components.some((component) => component.candidateSkuCodes.length > 1)) risks.push('DUPLICATE_CANDIDATE');
  if (candidateSkus.length === 0) risks.push('NO_CANDIDATE_SKU', 'SKU_UNRESOLVED');
  if (existingSkus.some((sku) => !sku.barcode)) risks.push('STOCK_SKU_MISSING');
  if (existingSkus.length > 0 && candidateSkus.length > 0 && !sameSkuComposition(existingSkus, candidateSkus)) {
    risks.push('DIFFERENT_FROM_EXISTING');
  }

  return finalizeCandidate({
    id: `PVK:${channelProductNo}:${first.serialNo}:${normalize(itemName)}`,
    storeId: first.job.storeId,
    storeName: existingRows[0]?.smartstoreName || first.job.store?.name || '',
    channelId: first.job.channelId || '',
    channelProductNo,
    itemId: first.itemId || '',
    candidateType: isSetProduct ? 'BUNDLE' : sourceMappingType || 'OPTION',
    sourceMappingType,
    productName: first.productMatchName,
    itemName,
    serialNo: first.serialNo,
    isSetProduct,
    candidateSkus,
    existingSkus,
    setComponents: components,
    ...setCalculation,
  }, risks);
}

function applyFilter(rows: StagingMappingCandidate[], filter: StagingMappingFilter): StagingMappingCandidate[] {
  if (filter === 'ALL') return rows;
  if (filter === 'MAPPED') return rows.filter((row) => row.mappingStatus === 'MAPPED');
  if (filter === 'UNMAPPED') return rows.filter((row) => row.mappingStatus === 'UNMAPPED');
  if (filter === 'RISK') return rows.filter((row) => row.mappingStatus === 'RISK');
  if (filter === 'SKU_UNRESOLVED') {
    return rows.filter((row) => row.riskTypes.some((risk) =>
      ['SKU_UNRESOLVED', 'NO_CANDIDATE_SKU', 'SET_COMPONENT_SKU_UNRESOLVED'].includes(risk),
    ));
  }
  if (filter === 'SET') return rows.filter((row) => row.isSetProduct);
  if (filter === 'SINGLE') return rows.filter((row) => !row.isSetProduct);
  return rows.filter((row) => row.candidateType === filter);
}

export async function getStagingMappingSnapshot(): Promise<Snapshot> {
  const jobs = await loadLatestSnapshotJobs();
  const smartstoreJobIds = jobIds(jobs, 'SMARTSTORE_PRODUCT');
  const stockJobIds = jobIds(jobs, 'ERP_STOCK');
  const mappingJobIds = jobIds(jobs, 'SKU_MAPPING');
  const variantJobIds = jobIds(jobs, 'PRODUCT_VARIANT_KEYWORD');

  const [products, stocks, mappings, variants] = await Promise.all([
    prisma.stagingNaverProduct.findMany({
      where: { jobId: { in: smartstoreJobIds }, errorMessage: null },
      include: {
        job: { include: { store: { select: { name: true } } } },
        options: { where: { errorMessage: null } },
        additionals: { where: { errorMessage: null } },
      },
      orderBy: { rowNumber: 'asc' },
    }),
    prisma.stagingStockItem.findMany({
      where: { jobId: { in: stockJobIds }, errorMessage: null },
      orderBy: { rowNumber: 'asc' },
    }),
    prisma.stagingSkuMapping.findMany({
      where: { jobId: { in: mappingJobIds }, errorMessage: null },
      orderBy: { rowNumber: 'asc' },
    }),
    prisma.stagingProductVariantKeyword.findMany({
      where: { jobId: { in: variantJobIds }, errorMessage: null },
      include: { job: { include: { store: { select: { name: true } } } } },
      orderBy: { rowNumber: 'asc' },
    }),
  ]);

  const stockIndex = buildStockIndex(stocks);
  const mappingIndex = buildMappingIndex(mappings);
  const targets = new Map<string, MappingTarget>();

  for (const product of products) {
    const storeName = product.job.store?.name ?? '';
    const channelId = product.job.channelId ?? '';
    const channelProductNo = product.channelProductNo ?? product.originProductNo ?? product.externalProductId ?? '';
    const productTargetBase = {
      candidateType: 'PRODUCT' as const,
      storeId: product.storeId,
      storeName,
      channelId,
      channelProductNo,
      itemId: product.externalProductId ?? product.originProductNo ?? channelProductNo,
      productName: product.productName,
      itemName: product.productName,
      managementCode: product.sellerManagementCode ?? '',
      strongSearchValues: [product.sellerManagementCode ?? '', product.externalProductId ?? ''],
      nameSearchValues: [product.productName],
    };
    const productKey = targetKey(productTargetBase);
    if (!targets.has(productKey)) targets.set(productKey, { ...productTargetBase, id: productKey });

    for (const option of product.options) {
      const itemName = uniqueStrings([option.optionName, option.optionValue]).join(' / ');
      const optionTargetBase = {
        candidateType: 'OPTION' as const,
        storeId: product.storeId,
        storeName,
        channelId,
        channelProductNo: option.channelProductNo ?? channelProductNo,
        itemId: option.optionId ?? option.optionCode ?? `${channelProductNo}:${itemName}`,
        productName: product.productName,
        itemName,
        managementCode: option.optionCode ?? '',
        strongSearchValues: [option.optionCode ?? '', option.optionId ?? ''],
        nameSearchValues: [itemName, option.optionValue, `${product.productName} ${itemName}`],
      };
      const optionKey = targetKey(optionTargetBase);
      if (!targets.has(optionKey)) targets.set(optionKey, { ...optionTargetBase, id: optionKey });
    }

    for (const additional of product.additionals) {
      const itemName = uniqueStrings([additional.additionalName, additional.additionalValue]).join(' / ');
      const additionalTargetBase = {
        candidateType: 'ADDITIONAL' as const,
        storeId: product.storeId,
        storeName,
        channelId,
        channelProductNo: additional.channelProductNo ?? channelProductNo,
        itemId: additional.additionalId ?? additional.sellerManagementCode ?? `${channelProductNo}:${itemName}`,
        productName: product.productName,
        itemName,
        managementCode: additional.sellerManagementCode ?? '',
        strongSearchValues: [additional.sellerManagementCode ?? '', additional.additionalId ?? ''],
        nameSearchValues: [itemName, additional.additionalValue, `${product.productName} ${itemName}`],
      };
      const additionalKey = targetKey(additionalTargetBase);
      if (!targets.has(additionalKey)) targets.set(additionalKey, { ...additionalTargetBase, id: additionalKey });
    }
  }

  const targetRows = Array.from(targets.values()).map((target) =>
    buildTargetCandidate(target, stockIndex, mappingIndex),
  );
  const variantGroups = new Map<string, ProductVariantRow[]>();
  for (const variant of variants) {
    const key = `${variant.channelProductNo ?? variant.job.channelId ?? ''}:${variant.serialNo}:${normalize(variant.productOptionText)}`;
    const rows = variantGroups.get(key) ?? [];
    rows.push(variant);
    variantGroups.set(key, rows);
  }
  const variantRows = Array.from(variantGroups.values()).map((group) =>
    buildVariantCandidate(group, stockIndex, mappingIndex),
  );
  const rows = [...targetRows, ...variantRows].sort((left, right) => {
    const statusOrder = { RISK: 0, UNMAPPED: 1, MAPPED: 2 } as const;
    return statusOrder[left.mappingStatus] - statusOrder[right.mappingStatus]
      || left.channelProductNo.localeCompare(right.channelProductNo)
      || left.itemName.localeCompare(right.itemName, 'ko');
  });
  const unresolvedRisks: StagingMappingRiskType[] = [
    'SKU_UNRESOLVED',
    'NO_CANDIDATE_SKU',
    'SET_COMPONENT_SKU_UNRESOLVED',
  ];
  const summary: StagingMappingPreviewSummary = {
    stagingProductCount: targetRows.filter((row) => row.candidateType === 'PRODUCT').length,
    stagingOptionCount: targetRows.filter((row) => row.candidateType === 'OPTION').length,
    stagingAdditionalCount: targetRows.filter((row) => row.candidateType === 'ADDITIONAL').length,
    stagingStockSkuCount: new Set(stocks.map(stockSkuCode).filter(Boolean)).size,
    stagingExistingMappingCount: mappings.length,
    productVariantKeywordCandidateCount: variantGroups.size,
    mappedCandidateCount: rows.filter((row) => row.mappingStatus === 'MAPPED').length,
    unmappedCandidateCount: rows.filter((row) => row.mappingStatus === 'UNMAPPED').length,
    riskCandidateCount: rows.filter((row) => row.mappingStatus === 'RISK').length,
    setProductCandidateCount: rows.filter((row) => row.isSetProduct).length,
    singleProductCandidateCount: rows.filter((row) => !row.isSetProduct).length,
    unresolvedSkuCandidateCount: rows.filter((row) =>
      row.riskTypes.some((risk) => unresolvedRisks.includes(risk)),
    ).length,
  };
  const sourceJobs: StagingMappingSourceJob[] = jobs.map((job) => ({
    jobId: job.id,
    fileType: job.fileType,
    fileName: job.fileName,
    storeName: job.store?.name ?? '',
    channelId: job.channelId ?? '',
    appliedAt: job.appliedAt?.toISOString() ?? null,
  }));

  return { rows, summary, sourceJobs };
}

export async function getStagingMappingSummary(): Promise<StagingMappingSummaryResponse> {
  const snapshot = await getStagingMappingSnapshot();
  return {
    summary: snapshot.summary,
    sourceJobs: snapshot.sourceJobs,
    generatedAt: new Date().toISOString(),
  };
}

export async function getStagingMappingCandidates(input: {
  filter: StagingMappingFilter;
  page: number;
  pageSize: CommonPageSize;
}): Promise<StagingMappingCandidatesResponse> {
  const snapshot = await getStagingMappingSnapshot();
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
