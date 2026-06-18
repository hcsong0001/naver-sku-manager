import type { StagingSnapshotInfo } from '@/src/types/staging-import.types';
import type {
  BulkUpdateLinkedSku,
  BulkUpdatePreviewCandidate,
  BulkUpdatePreviewSummary,
  BulkUpdateRiskType,
} from '@/src/types/bulk-update-preview.types';
import type {
  StagingMappingCandidate,
  StagingMappingPreviewSummary,
  StagingMappingRiskType,
  StagingMappingSetComponent,
  StagingMappingSku,
} from '@/src/types/staging-mapping-preview.types';
import {
  MAPPING_RESOLUTION_DRAFT_SCHEMA_VERSION,
  MAPPING_RESOLUTION_DRAFT_STORAGE_PREFIX,
  type DraftAppliedBulkUpdateCandidate,
  type DraftAppliedStagingMappingCandidate,
  type MappingDraftPreviewSummary,
  type MappingResolutionDraft,
  type MappingResolutionDraftEntry,
  type MappingResolutionDraftLoadResult,
  type MappingResolutionDraftSelectedComponent,
  type MappingResolutionDraftSelectedSku,
  type MappingResolutionDraftSnapshotMetadata,
} from '@/src/types/mapping-resolution-draft.types';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'key' | 'length'>;

const RESOLVABLE_RISK_TYPES: StagingMappingRiskType[] = [
  'SKU_UNRESOLVED',
  'NO_CANDIDATE_SKU',
  'STOCK_SKU_MISSING',
  'SET_COMPONENT_SKU_UNRESOLVED',
  'SET_COMPONENT_QUANTITY_INVALID',
];

const STAGING_RISK_MESSAGES: Record<StagingMappingRiskType, string> = {
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

const BULK_RISK_MESSAGES: Record<BulkUpdateRiskType, string> = {
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

function toRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : null;
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizeNullableString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function normalizeNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function toPositiveQuantity(value: number | null | undefined, fallback = 1): number {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.trunc(value);
  }
  return fallback;
}

function uniqueRiskTypes<T extends string>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function toDraftSelectedSku(value: StagingMappingSku, quantity?: number | null): MappingResolutionDraftSelectedSku {
  return {
    skuCode: value.skuCode,
    internalSkuCode: value.internalSkuCode,
    legacyStockCode: value.legacyStockCode,
    barcode: value.barcode,
    productName: value.productName,
    purchaseProductName: value.purchaseProductName,
    quantity: toPositiveQuantity(quantity ?? value.quantity, value.quantity || 1),
    sellingPrice: value.sellingPrice,
    costPrice: value.costPrice,
    stockQuantity: value.stockQuantity,
    matchSource: value.matchSource || '해결 draft',
  };
}

function toDraftSelectedComponent(value: StagingMappingSetComponent): MappingResolutionDraftSelectedComponent {
  return {
    sourceName: value.sourceName,
    quantity: value.quantity,
    resolved: value.resolved,
    skuCode: value.skuCode,
    internalSkuCode: value.internalSkuCode,
    legacyStockCode: value.legacyStockCode,
    barcode: value.barcode,
    productName: value.productName,
    purchaseProductName: '',
    sellingPrice: value.sellingPrice,
    costPrice: value.costPrice,
    stockQuantity: value.stockQuantity,
    matchSource: '해결 draft',
  };
}

function fromDraftSelectedSku(value: MappingResolutionDraftSelectedSku): StagingMappingSku {
  return {
    skuCode: value.skuCode,
    internalSkuCode: value.internalSkuCode,
    legacyStockCode: value.legacyStockCode,
    barcode: value.barcode,
    productName: value.productName,
    purchaseProductName: value.purchaseProductName,
    quantity: toPositiveQuantity(value.quantity, 1),
    sellingPrice: value.sellingPrice,
    costPrice: value.costPrice,
    stockQuantity: value.stockQuantity,
    matchSource: value.matchSource || '해결 draft',
  };
}

function fromDraftSelectedComponent(value: MappingResolutionDraftSelectedComponent): StagingMappingSetComponent {
  return {
    sourceName: value.sourceName,
    quantity: value.quantity,
    resolved: value.resolved && value.skuCode.trim().length > 0,
    skuCode: value.skuCode,
    internalSkuCode: value.internalSkuCode,
    legacyStockCode: value.legacyStockCode,
    barcode: value.barcode,
    productName: value.productName,
    sellingPrice: value.sellingPrice,
    costPrice: value.costPrice,
    stockQuantity: value.stockQuantity,
    candidateSkuCodes: value.skuCode ? [value.skuCode] : [],
  };
}

function findSkuByCode(row: StagingMappingCandidate, skuCode: string): StagingMappingSku | null {
  const found = [...row.candidateSkus, ...row.existingSkus].find((sku) => sku.skuCode === skuCode);
  return found ?? null;
}

function readLegacyDraftEntry(candidateKey: string, value: Record<string, unknown>, row?: StagingMappingCandidate): MappingResolutionDraftEntry {
  const resolvedSkuCode = normalizeString(value.resolvedSkuCode).trim();
  const legacyComponents = Array.isArray(value.setComponents)
    ? value.setComponents
      .map((component) => toRecord(component))
      .filter((component): component is Record<string, unknown> => component !== null)
      .map((component) => ({
        sourceName: normalizeString(component.sourceName),
        quantity: normalizeNumber(component.quantity),
        resolved: Boolean(component.resolved),
        skuCode: normalizeString(component.skuCode),
        internalSkuCode: normalizeNullableString(component.internalSkuCode),
        legacyStockCode: normalizeString(component.legacyStockCode),
        barcode: normalizeString(component.barcode),
        productName: normalizeString(component.productName),
        purchaseProductName: normalizeString(component.purchaseProductName),
        sellingPrice: normalizeNumber(component.sellingPrice),
        costPrice: normalizeNumber(component.costPrice),
        stockQuantity: normalizeNumber(component.stockQuantity),
        matchSource: '해결 draft',
      }))
    : [];

  const matchedSku = resolvedSkuCode && row ? findSkuByCode(row, resolvedSkuCode) : null;

  return {
    candidateKey,
    targetType: row?.candidateType === 'BUNDLE' ? 'BUNDLE' : (row?.candidateType ?? 'OPTION'),
    originalRiskTypes: row?.riskTypes ?? [],
    selectedSkuCode: resolvedSkuCode || undefined,
    selectedSku: matchedSku ? toDraftSelectedSku(matchedSku) : resolvedSkuCode
      ? {
        skuCode: resolvedSkuCode,
        internalSkuCode: null,
        legacyStockCode: '',
        barcode: '',
        productName: '',
        purchaseProductName: '',
        quantity: 1,
        sellingPrice: null,
        costPrice: null,
        stockQuantity: null,
        matchSource: '해결 draft',
      }
      : null,
    selectedComponents: legacyComponents.length > 0 ? legacyComponents : row?.setComponents.map(toDraftSelectedComponent),
    quantity: normalizeNumber(value.quantity) ?? 1,
    memo: normalizeNullableString(value.memo) ?? undefined,
    resolvedAt: new Date().toISOString(),
    status: normalizeString(value.status) === 'UNRESOLVED' ? 'UNRESOLVED' : 'RESOLVED',
    adoptedCandidateId: normalizeNullableString(value.adoptedCandidateId) ?? undefined,
  };
}

function toSnapshotMetadataObject(value: unknown): MappingResolutionDraftSnapshotMetadata | null {
  const record = toRecord(value);
  if (!record) return null;
  const latestAppliedAt = normalizeNullableString(record.latestAppliedAt);
  const snapshotKey = normalizeString(record.snapshotKey).trim();
  const rawJobIds = toRecord(record.jobIds);
  const jobIds: Partial<Record<string, string>> = {};
  if (rawJobIds) {
    for (const [key, jobId] of Object.entries(rawJobIds)) {
      const normalized = normalizeNullableString(jobId);
      if (normalized) jobIds[key] = normalized;
    }
  }
  const resolvedSnapshotKey = snapshotKey || buildMappingResolutionSnapshotKey({
    latestAppliedAt,
    jobIds,
  });

  return {
    snapshotKey: resolvedSnapshotKey,
    latestAppliedAt,
    jobIds,
  };
}

export function buildMappingResolutionSnapshotKey(
  metadata: Pick<MappingResolutionDraftSnapshotMetadata, 'latestAppliedAt' | 'jobIds'>,
): string {
  const sortedEntries = Object.entries(metadata.jobIds)
    .filter(([, value]) => Boolean(value))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}:${value}`);
  return `${metadata.latestAppliedAt || 'default'}::${sortedEntries.join('|')}`;
}

export function buildMappingResolutionSnapshotMetadata(
  snapshot: Pick<StagingSnapshotInfo, 'latestAppliedAt' | 'latestAppliedJobs'>,
): MappingResolutionDraftSnapshotMetadata {
  const jobIds = Object.fromEntries(
    Object.entries(snapshot.latestAppliedJobs)
      .map(([key, job]) => [key, job?.jobId])
      .filter(([, value]) => Boolean(value)),
  );

  return {
    snapshotKey: buildMappingResolutionSnapshotKey({
      latestAppliedAt: snapshot.latestAppliedAt,
      jobIds,
    }),
    latestAppliedAt: snapshot.latestAppliedAt,
    jobIds,
  };
}

export function buildMappingResolutionStorageKey(metadata: MappingResolutionDraftSnapshotMetadata): string {
  return `${MAPPING_RESOLUTION_DRAFT_STORAGE_PREFIX}_${metadata.snapshotKey}`;
}

export function isMatchingDraftSnapshot(
  current: MappingResolutionDraftSnapshotMetadata | null,
  draft: MappingResolutionDraftSnapshotMetadata | null,
): boolean {
  if (!current || !draft) return false;
  return current.snapshotKey === draft.snapshotKey;
}

export function parseMappingResolutionDraft(
  raw: string,
  rowsById?: Map<string, StagingMappingCandidate>,
): MappingResolutionDraft | null {
  const parsed = JSON.parse(raw) as unknown;
  const record = toRecord(parsed);
  if (!record) return null;

  const snapshotMetadata = toSnapshotMetadataObject(record.snapshotMetadata);
  if (!snapshotMetadata) return null;

  const rawResolutions = toRecord(record.resolutions);
  const resolutions: Record<string, MappingResolutionDraftEntry> = {};

  for (const [candidateKey, rawEntry] of Object.entries(rawResolutions ?? {})) {
    const entryRecord = toRecord(rawEntry);
    if (!entryRecord) continue;

    const hasNewSchema = typeof entryRecord.candidateKey === 'string' || entryRecord.selectedSku !== undefined;
    if (!hasNewSchema) {
      resolutions[candidateKey] = readLegacyDraftEntry(candidateKey, entryRecord, rowsById?.get(candidateKey));
      continue;
    }

    const selectedSkuRecord = toRecord(entryRecord.selectedSku);
    const selectedSku = selectedSkuRecord
      ? {
        skuCode: normalizeString(selectedSkuRecord.skuCode),
        internalSkuCode: normalizeNullableString(selectedSkuRecord.internalSkuCode),
        legacyStockCode: normalizeString(selectedSkuRecord.legacyStockCode),
        barcode: normalizeString(selectedSkuRecord.barcode),
        productName: normalizeString(selectedSkuRecord.productName),
        purchaseProductName: normalizeString(selectedSkuRecord.purchaseProductName),
        quantity: toPositiveQuantity(normalizeNumber(selectedSkuRecord.quantity), 1),
        sellingPrice: normalizeNumber(selectedSkuRecord.sellingPrice),
        costPrice: normalizeNumber(selectedSkuRecord.costPrice),
        stockQuantity: normalizeNumber(selectedSkuRecord.stockQuantity),
        matchSource: normalizeString(selectedSkuRecord.matchSource) || '해결 draft',
      }
      : null;

    const selectedComponents = Array.isArray(entryRecord.selectedComponents)
      ? entryRecord.selectedComponents
        .map((component) => toRecord(component))
        .filter((component): component is Record<string, unknown> => component !== null)
        .map((component) => ({
          sourceName: normalizeString(component.sourceName),
          quantity: normalizeNumber(component.quantity),
          resolved: Boolean(component.resolved),
          skuCode: normalizeString(component.skuCode),
          internalSkuCode: normalizeNullableString(component.internalSkuCode),
          legacyStockCode: normalizeString(component.legacyStockCode),
          barcode: normalizeString(component.barcode),
          productName: normalizeString(component.productName),
          purchaseProductName: normalizeString(component.purchaseProductName),
          sellingPrice: normalizeNumber(component.sellingPrice),
          costPrice: normalizeNumber(component.costPrice),
          stockQuantity: normalizeNumber(component.stockQuantity),
          matchSource: normalizeString(component.matchSource) || '해결 draft',
        }))
      : undefined;

    resolutions[candidateKey] = {
      candidateKey,
      targetType: (normalizeString(entryRecord.targetType) || 'OPTION') as MappingResolutionDraftEntry['targetType'],
      originalRiskTypes: Array.isArray(entryRecord.originalRiskTypes)
        ? entryRecord.originalRiskTypes.filter((value): value is StagingMappingRiskType => typeof value === 'string')
        : [],
      selectedSkuCode: normalizeNullableString(entryRecord.selectedSkuCode) ?? undefined,
      selectedSku,
      selectedComponents,
      quantity: normalizeNumber(entryRecord.quantity),
      memo: normalizeNullableString(entryRecord.memo) ?? undefined,
      resolvedAt: normalizeString(entryRecord.resolvedAt) || new Date().toISOString(),
      status: normalizeString(entryRecord.status) === 'UNRESOLVED' ? 'UNRESOLVED' : 'RESOLVED',
      adoptedCandidateId: normalizeNullableString(entryRecord.adoptedCandidateId) ?? undefined,
    };
  }

  return {
    schemaVersion: normalizeString(record.schemaVersion) || MAPPING_RESOLUTION_DRAFT_SCHEMA_VERSION,
    createdAt: normalizeString(record.createdAt) || new Date().toISOString(),
    snapshotMetadata,
    resolutions,
  };
}

export function serializeMappingResolutionDraft(draft: MappingResolutionDraft): string {
  return JSON.stringify(draft, null, 2);
}

export function readMappingResolutionDraftFromStorage(input: {
  storage: StorageLike;
  currentSnapshot: MappingResolutionDraftSnapshotMetadata;
  rowsById?: Map<string, StagingMappingCandidate>;
}): MappingResolutionDraftLoadResult {
  const exactStorageKey = buildMappingResolutionStorageKey(input.currentSnapshot);
  const exactRaw = input.storage.getItem(exactStorageKey);
  if (exactRaw) {
    const parsed = parseMappingResolutionDraft(exactRaw, input.rowsById);
    if (parsed) {
      return {
        draft: parsed,
        exactMatch: true,
        snapshotMismatch: false,
        matchedStorageKey: exactStorageKey,
      };
    }
  }

  let latestDraft: MappingResolutionDraft | null = null;
  let latestStorageKey: string | null = null;

  for (let index = 0; index < input.storage.length; index += 1) {
    const key = input.storage.key(index);
    if (!key || !key.startsWith(`${MAPPING_RESOLUTION_DRAFT_STORAGE_PREFIX}_`)) continue;
    const raw = input.storage.getItem(key);
    if (!raw) continue;
    const parsed = parseMappingResolutionDraft(raw, input.rowsById);
    if (!parsed) continue;
    if (!latestDraft || parsed.createdAt > latestDraft.createdAt) {
      latestDraft = parsed;
      latestStorageKey = key;
    }
  }

  return {
    draft: latestDraft,
    exactMatch: false,
    snapshotMismatch: Boolean(latestDraft),
    matchedStorageKey: latestStorageKey,
  };
}

export function writeMappingResolutionDraftToStorage(input: {
  storage: StorageLike;
  draft: MappingResolutionDraft;
}): string {
  const storageKey = buildMappingResolutionStorageKey(input.draft.snapshotMetadata);
  input.storage.setItem(storageKey, serializeMappingResolutionDraft(input.draft));
  return storageKey;
}

export function createMappingResolutionDraft(input: {
  snapshotMetadata: MappingResolutionDraftSnapshotMetadata;
  resolutions: Record<string, MappingResolutionDraftEntry>;
}): MappingResolutionDraft {
  return {
    schemaVersion: MAPPING_RESOLUTION_DRAFT_SCHEMA_VERSION,
    createdAt: new Date().toISOString(),
    snapshotMetadata: input.snapshotMetadata,
    resolutions: input.resolutions,
  };
}

export function createResolutionEntryFromCandidate(input: {
  row: StagingMappingCandidate;
  selectedSkuCode?: string;
  selectedSku?: MappingResolutionDraftSelectedSku | null;
  selectedComponents?: MappingResolutionDraftSelectedComponent[];
  quantity?: number | null;
  memo?: string;
  status?: MappingResolutionDraftEntry['status'];
  adoptedCandidateId?: string;
}): MappingResolutionDraftEntry {
  return {
    candidateKey: input.row.id,
    targetType: input.row.candidateType === 'BUNDLE' ? 'BUNDLE' : input.row.candidateType,
    originalRiskTypes: input.row.riskTypes,
    selectedSkuCode: input.selectedSkuCode,
    selectedSku: input.selectedSku ?? null,
    selectedComponents: input.selectedComponents,
    quantity: input.quantity ?? 1,
    memo: input.memo,
    resolvedAt: new Date().toISOString(),
    status: input.status ?? 'RESOLVED',
    adoptedCandidateId: input.adoptedCandidateId,
  };
}

function toDraftSkuFallback(input: {
  skuCode: string;
  quantity?: number | null;
}): MappingResolutionDraftSelectedSku {
  return {
    skuCode: input.skuCode,
    internalSkuCode: null,
    legacyStockCode: '',
    barcode: '',
    productName: '',
    purchaseProductName: '',
    quantity: toPositiveQuantity(input.quantity, 1),
    sellingPrice: null,
    costPrice: null,
    stockQuantity: null,
    matchSource: '해결 draft',
  };
}

function resolveSingleDraftSku(row: StagingMappingCandidate, entry: MappingResolutionDraftEntry): StagingMappingSku[] {
  const skuCode = entry.selectedSku?.skuCode || entry.selectedSkuCode || '';
  if (!skuCode) return [];
  if (entry.selectedSku) {
    return [fromDraftSelectedSku({
      ...entry.selectedSku,
      quantity: toPositiveQuantity(entry.quantity ?? entry.selectedSku.quantity, entry.selectedSku.quantity),
    })];
  }
  const matchedSku = findSkuByCode(row, skuCode);
  if (matchedSku) {
    return [toDraftSelectedSku(matchedSku, entry.quantity)];
  }
  return [fromDraftSelectedSku(toDraftSkuFallback({ skuCode, quantity: entry.quantity }))];
}

function resolveSetDraftComponents(row: StagingMappingCandidate, entry: MappingResolutionDraftEntry): StagingMappingSetComponent[] {
  if (entry.selectedComponents && entry.selectedComponents.length > 0) {
    return entry.selectedComponents.map(fromDraftSelectedComponent);
  }
  return row.setComponents.map((component) => ({
    ...component,
    resolved: Boolean(component.skuCode),
  }));
}

function recalculateSetMetrics(components: StagingMappingSetComponent[]) {
  const totalQuantity = components.length > 0
    ? components.reduce((sum, component) => sum + (component.quantity ?? 0), 0)
    : null;
  const hasInvalidQuantity = components.some((component) => component.quantity === null || component.quantity <= 0);
  const hasUnresolved = components.some((component) => !component.skuCode.trim());
  const hasMissingStock = components.some((component) => component.stockQuantity === null);
  const hasMissingCost = components.some((component) => component.costPrice === null);
  const setCostCalculable = components.length > 0 && !hasInvalidQuantity && !hasUnresolved && !hasMissingCost;
  const setCostPrice = setCostCalculable
    ? components.reduce((sum, component) => sum + (component.costPrice ?? 0) * (component.quantity ?? 0), 0)
    : null;
  const setStockCalculable = components.length > 0 && !hasInvalidQuantity && !hasUnresolved && !hasMissingStock;
  const sellableSetStock = setStockCalculable
    ? Math.min(...components.map((component) =>
      Math.floor((component.stockQuantity ?? 0) / Math.max(component.quantity ?? 1, 1)),
    ))
    : null;

  return {
    totalQuantity,
    hasInvalidQuantity,
    hasUnresolved,
    hasMissingStock,
    setCostCalculable,
    setCostPrice,
    setStockCalculable,
    sellableSetStock,
  };
}

function computeMappingRiskTypes(input: {
  row: StagingMappingCandidate;
  candidateSkus: StagingMappingSku[];
  setComponents: StagingMappingSetComponent[];
}): StagingMappingRiskType[] {
  const preserved = input.row.riskTypes.filter((riskType) => !RESOLVABLE_RISK_TYPES.includes(riskType));
  const recalculated: StagingMappingRiskType[] = [];

  if (input.row.isSetProduct || input.row.candidateType === 'BUNDLE') {
    if (input.setComponents.length === 0 && input.row.riskTypes.includes('SET_COMPONENT_MISSING')) {
      recalculated.push('SET_COMPONENT_MISSING');
    }
    if (input.setComponents.length === 0 || input.setComponents.every((component) => !component.skuCode.trim())) {
      recalculated.push('NO_CANDIDATE_SKU');
    }
    if (input.setComponents.some((component) => !component.skuCode.trim())) {
      recalculated.push('SKU_UNRESOLVED', 'SET_COMPONENT_SKU_UNRESOLVED');
    }
    if (input.setComponents.some((component) => component.quantity === null || component.quantity <= 0)) {
      recalculated.push('SET_COMPONENT_QUANTITY_INVALID');
    }
    if (input.setComponents.some((component) => component.stockQuantity === null)) {
      recalculated.push('STOCK_SKU_MISSING');
    }
  } else {
    if (input.candidateSkus.length === 0) {
      recalculated.push('SKU_UNRESOLVED', 'NO_CANDIDATE_SKU');
    }
    if (input.candidateSkus.some((sku) => sku.stockQuantity === null)) {
      recalculated.push('STOCK_SKU_MISSING');
    }
  }

  return uniqueRiskTypes([...preserved, ...recalculated]);
}

export function applyDraftToStagingMappingCandidates(input: {
  rows: StagingMappingCandidate[];
  draft: MappingResolutionDraft | null;
  snapshotMatches: boolean;
}): DraftAppliedStagingMappingCandidate[] {
  if (!input.draft) {
    return input.rows.map((row) => ({
      ...row,
      draftApplied: false,
      draftStatus: 'NONE',
    }));
  }

  return input.rows.map((row) => {
    const entry = input.draft?.resolutions[row.id];
    if (!entry || entry.status !== 'RESOLVED') {
      return {
        ...row,
        draftApplied: false,
        draftStatus: 'NONE',
      };
    }

    const candidateSkus = row.isSetProduct || row.candidateType === 'BUNDLE'
      ? resolveSetDraftComponents(row, entry)
        .filter((component) => component.skuCode.trim())
        .map((component) => ({
          skuCode: component.skuCode,
          internalSkuCode: component.internalSkuCode,
          legacyStockCode: component.legacyStockCode,
          barcode: component.barcode,
          productName: component.productName,
          purchaseProductName: '',
          quantity: toPositiveQuantity(component.quantity, 1),
          sellingPrice: component.sellingPrice,
          costPrice: component.costPrice,
          stockQuantity: component.stockQuantity,
          matchSource: '해결 draft',
        }))
      : resolveSingleDraftSku(row, entry);
    const setComponents = row.isSetProduct || row.candidateType === 'BUNDLE'
      ? resolveSetDraftComponents(row, entry)
      : row.setComponents;

    const metrics = recalculateSetMetrics(setComponents);
    const riskTypes = computeMappingRiskTypes({
      row,
      candidateSkus,
      setComponents,
    });
    const mappingStatus = riskTypes.length === 0
      ? 'MAPPED'
      : candidateSkus.length > 0 || setComponents.length > 0
        ? 'RISK'
        : 'UNMAPPED';

    return {
      ...row,
      draftApplied: true,
      draftStatus: input.snapshotMatches ? 'EXACT' : 'MISMATCH',
      draftEntry: entry,
      draftChange: {
        sku: {
          before: row.candidateSkus,
          after: candidateSkus,
        },
        setComponents: {
          before: row.setComponents,
          after: setComponents,
        },
      },
      candidateSkus,
      setComponents,
      setTotalQuantity: row.isSetProduct || row.candidateType === 'BUNDLE' ? metrics.totalQuantity : row.setTotalQuantity,
      setCostCalculable: row.isSetProduct || row.candidateType === 'BUNDLE' ? metrics.setCostCalculable : row.setCostCalculable,
      setCostPrice: row.isSetProduct || row.candidateType === 'BUNDLE' ? metrics.setCostPrice : row.setCostPrice,
      setStockCalculable: row.isSetProduct || row.candidateType === 'BUNDLE' ? metrics.setStockCalculable : row.setStockCalculable,
      sellableSetStock: row.isSetProduct || row.candidateType === 'BUNDLE' ? metrics.sellableSetStock : row.sellableSetStock,
      riskTypes,
      riskMessages: riskTypes.map((riskType) => STAGING_RISK_MESSAGES[riskType]),
      mappingStatus,
      recommendedAction: riskTypes.length === 0
        ? '해결 draft가 적용된 preview입니다. 운영 매핑에는 아직 반영되지 않았습니다.'
        : `${row.recommendedAction} (해결 draft 반영 preview)`,
    };
  });
}

export function buildDraftAppliedStagingMappingSummary(
  rows: DraftAppliedStagingMappingCandidate[],
  baseSummary: StagingMappingPreviewSummary,
): StagingMappingPreviewSummary {
  const uniqueRows = rows.filter((row) => !row.isDuplicate);
  const riskRows = uniqueRows.filter((row) => row.riskTypes.length > 0);

  return {
    ...baseSummary,
    mappedCandidateCount: uniqueRows.filter((row) => row.mappingStatus === 'MAPPED').length,
    unmappedCandidateCount: uniqueRows.filter((row) => row.mappingStatus === 'UNMAPPED').length,
    riskCandidateCount: riskRows.length,
    setProductCandidateCount: uniqueRows.filter((row) => row.isSetProduct).length,
    singleProductCandidateCount: uniqueRows.filter((row) => !row.isSetProduct).length,
    unresolvedSkuCandidateCount: uniqueRows.filter((row) => row.riskTypes.includes('SKU_UNRESOLVED')).length,
    originalCandidateCount: rows.length,
    uniqueCandidateCount: uniqueRows.length,
    duplicateCandidateCount: rows.filter((row) => row.isDuplicate).length,
    totalRiskCount: rows.filter((row) => row.riskTypes.length > 0).length,
    riskUniqueCandidateCount: riskRows.length,
    riskSetComponentQuantityInvalidCount: uniqueRows.filter((row) => row.riskTypes.includes('SET_COMPONENT_QUANTITY_INVALID')).length,
    riskSkuUnresolvedCount: uniqueRows.filter((row) => row.riskTypes.includes('SKU_UNRESOLVED')).length,
    riskSetComponentSkuUnresolvedCount: uniqueRows.filter((row) => row.riskTypes.includes('SET_COMPONENT_SKU_UNRESOLVED')).length,
    riskDuplicateCandidateCount: uniqueRows.filter((row) => row.riskTypes.includes('DUPLICATE_CANDIDATE')).length,
    riskNoCandidateSkuCount: uniqueRows.filter((row) => row.riskTypes.includes('NO_CANDIDATE_SKU')).length,
    riskStockSkuMissingCount: uniqueRows.filter((row) => row.riskTypes.includes('STOCK_SKU_MISSING')).length,
    riskDifferentFromExistingCount: uniqueRows.filter((row) => row.riskTypes.includes('DIFFERENT_FROM_EXISTING')).length,
    riskPriceBaselineMissingCount: baseSummary.riskPriceBaselineMissingCount,
  };
}

function sumLinkedSellingPrice(rows: BulkUpdateLinkedSku[]): number | null {
  if (rows.length === 0 || rows.some((row) => row.sellingPrice === null)) return null;
  return rows.reduce((sum, row) => sum + (row.sellingPrice ?? 0) * row.quantity, 0);
}

function sumLinkedCostPrice(rows: BulkUpdateLinkedSku[]): number | null {
  if (rows.length === 0 || rows.some((row) => row.costPrice === null)) return null;
  return rows.reduce((sum, row) => sum + (row.costPrice ?? 0) * row.quantity, 0);
}

function calculateMargin(price: number | null, cost: number | null): { expectedMargin: number | null; marginRate: number | null } {
  if (price === null || cost === null || price <= 0) {
    return { expectedMargin: null, marginRate: null };
  }
  const expectedMargin = price - cost;
  return {
    expectedMargin,
    marginRate: Number(((expectedMargin / price) * 100).toFixed(2)),
  };
}

export function applyDraftToBulkUpdateCandidates(input: {
  rows: BulkUpdatePreviewCandidate[];
  mappingRows: DraftAppliedStagingMappingCandidate[];
  draft: MappingResolutionDraft | null;
  snapshotMatches: boolean;
}): DraftAppliedBulkUpdateCandidate[] {
  const mappingRowsById = new Map(input.mappingRows.map((row) => [row.id, row]));

  return input.rows.map((row) => {
    const mappingRow = mappingRowsById.get(row.sourceCandidateId);
    if (!input.draft || !mappingRow?.draftApplied) {
      return {
        ...row,
        draftApplied: false,
        draftStatus: 'NONE',
      };
    }

    const linkedSkus: BulkUpdateLinkedSku[] = mappingRow.isSetProduct || mappingRow.candidateType === 'BUNDLE'
      ? mappingRow.setComponents
        .filter((component) => component.skuCode.trim())
        .map((component) => ({
          skuCode: component.skuCode,
          internalSkuCode: component.internalSkuCode,
          legacyStockCode: component.legacyStockCode,
          barcode: component.barcode,
          productName: component.productName,
          purchaseProductName: '',
          quantity: toPositiveQuantity(component.quantity, 1),
          sellingPrice: component.sellingPrice,
          costPrice: component.costPrice,
          stockQuantity: component.stockQuantity,
          matchSource: '해결 draft',
        }))
      : mappingRow.candidateSkus.map((sku) => ({
        skuCode: sku.skuCode,
        internalSkuCode: sku.internalSkuCode,
        legacyStockCode: sku.legacyStockCode,
        barcode: sku.barcode,
        productName: sku.productName,
        purchaseProductName: sku.purchaseProductName,
        quantity: sku.quantity,
        sellingPrice: sku.sellingPrice,
        costPrice: sku.costPrice,
        stockQuantity: sku.stockQuantity,
        matchSource: sku.matchSource,
      }));
    const bundleSkus = mappingRow.isSetProduct || mappingRow.candidateType === 'BUNDLE' ? linkedSkus : [];

    const calculatedTargetPrice = mappingRow.isSetProduct || mappingRow.candidateType === 'BUNDLE'
      ? sumLinkedSellingPrice(bundleSkus)
      : linkedSkus.length === 1
        ? linkedSkus[0].sellingPrice
        : null;
    const calculatedTargetStock = mappingRow.isSetProduct || mappingRow.candidateType === 'BUNDLE'
      ? mappingRow.sellableSetStock
      : linkedSkus.length === 1
        ? linkedSkus[0].stockQuantity
        : null;
    const costPrice = mappingRow.isSetProduct || mappingRow.candidateType === 'BUNDLE'
      ? sumLinkedCostPrice(bundleSkus)
      : linkedSkus.length === 1
        ? linkedSkus[0].costPrice
        : null;
    const hasPriceChange = row.currentSmartstorePrice !== null
      && calculatedTargetPrice !== null
      && row.currentSmartstorePrice !== calculatedTargetPrice;
    const hasStockChange = row.currentSmartstoreStock !== null
      && calculatedTargetStock !== null
      && row.currentSmartstoreStock !== calculatedTargetStock;

    const riskTypes = new Set<BulkUpdateRiskType>(mappingRow.riskTypes);
    if ((mappingRow.isSetProduct || mappingRow.candidateType === 'BUNDLE') && calculatedTargetStock === 0) {
      riskTypes.add('BUNDLE_STOCK_ZERO');
    }

    const blockingRisks: BulkUpdateRiskType[] = [
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
    const hasBlockingRisk = Array.from(riskTypes).some((riskType) => blockingRisks.includes(riskType));
    const priceExecutable = !hasBlockingRisk && hasPriceChange;
    const stockExecutable = !hasBlockingRisk && hasStockChange;

    if (!priceExecutable && !stockExecutable) {
      if (calculatedTargetPrice === null) {
        riskTypes.add('PRICE_BASELINE_MISSING');
      } else if (row.currentSmartstorePrice === null) {
        riskTypes.add('CURRENT_PRICE_UNAVAILABLE');
      }

      if (calculatedTargetStock === null || row.currentSmartstoreStock === null) {
        riskTypes.add('CURRENT_STOCK_UNAVAILABLE');
      }

      if (!hasPriceChange && !hasStockChange) {
        riskTypes.add('NO_CHANGE_DETECTED');
      }
    } else {
      riskTypes.delete('NO_CHANGE_DETECTED');
    }

    const normalizedRiskTypes = Array.from(riskTypes);
    const executable = priceExecutable || stockExecutable;
    const status: BulkUpdatePreviewCandidate['status'] = executable
      ? 'SAFE'
      : normalizedRiskTypes.some((riskType) => riskType !== 'NO_CHANGE_DETECTED')
        ? 'RISK'
        : 'EXCLUDED';
    const { expectedMargin, marginRate } = calculateMargin(calculatedTargetPrice, costPrice);

    return {
      ...row,
      draftApplied: true,
      draftStatus: input.snapshotMatches ? 'EXACT' : 'MISMATCH',
      draftEntry: mappingRow.draftEntry,
      draftChange: {
        linkedSkus: {
          before: row.linkedSkus,
          after: linkedSkus,
        },
        bundleSkus: {
          before: row.bundleSkus,
          after: bundleSkus,
        },
      },
      linkedSkus,
      bundleSkus,
      calculatedTargetPrice,
      calculatedTargetStock,
      costPrice,
      expectedMargin,
      marginRate,
      hasPriceChange,
      hasStockChange,
      executable,
      draftCreatable: executable,
      status,
      riskTypes: normalizedRiskTypes,
      riskMessages: normalizedRiskTypes.map((riskType) => BULK_RISK_MESSAGES[riskType]),
      recommendedAction: executable
        ? '해결 draft가 반영된 preview입니다. 실제 실행 전 운영 반영 여부를 별도로 검토하세요.'
        : '해결 draft를 반영했지만 아직 실행 가능한 조건을 충족하지 못했습니다.',
    };
  });
}

export function buildDraftAppliedBulkUpdateSummary(rows: DraftAppliedBulkUpdateCandidate[]): BulkUpdatePreviewSummary {
  return {
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
    mappingSafeCandidateCount: rows.filter((row) => row.riskTypes.length === 0).length,
    updateTargetCandidateCount: rows.filter((row) => row.hasPriceChange || row.hasStockChange).length,
  };
}

export function buildDraftPreviewSummary(input: {
  baseRiskCount: number;
  draftRiskCount: number;
  rows: Array<{ draftApplied: boolean; executable?: boolean }>;
}): MappingDraftPreviewSummary {
  const draftAppliedCount = input.rows.filter((row) => row.draftApplied).length;
  const draftExecutableCount = input.rows.filter((row) => row.executable).length;
  return {
    baseRiskCount: input.baseRiskCount,
    draftRiskCount: input.draftRiskCount,
    reducedRiskCount: Math.max(0, input.baseRiskCount - input.draftRiskCount),
    draftAppliedCount,
    draftExecutableCount,
  };
}
