import type {
  SkuKeywordHydrateIssue,
  SkuKeywordHydratedCandidate,
  SkuKeywordHydratedLinkedSku,
} from '@/src/types/sku-keyword-draft-hydrate.types';
import type {
  SkuKeywordBulkLikeCandidate,
  SkuKeywordBulkLikeLinkedSku,
  SkuKeywordBulkLikeRiskType,
  SkuKeywordBulkLikeTransformInput,
  SkuKeywordBulkLikeTransformResult,
} from '@/src/types/sku-keyword-bulk-like-candidate.types';

const RISK_MESSAGES: Record<SkuKeywordBulkLikeRiskType, string> = {
  SKU_NOT_FOUND: '연결된 SKU 문맥을 찾을 수 없습니다.',
  TARGET_NOT_FOUND: '운영 상품/옵션/추가상품 문맥을 찾을 수 없습니다.',
  TARGET_CHANNEL_PRODUCT_MISMATCH: '상품번호 기준이 운영 상품 문맥과 다릅니다.',
  STORE_CONTEXT_UNAVAILABLE: '스토어 문맥이 없어 후속 draft 검토가 어렵습니다.',
  CHANNEL_ID_UNAVAILABLE: 'naverChannelId의 공식 출처가 확인되지 않아 보조 채널 문맥이 비어 있습니다. Draft 후보 판정은 차단하지 않습니다.',
  CURRENT_PRICE_UNAVAILABLE: '현재 스마트스토어 판매가를 확인할 수 없습니다.',
  CURRENT_STOCK_UNAVAILABLE: '현재 스마트스토어 재고를 확인할 수 없습니다.',
  TARGET_PRICE_UNAVAILABLE: '계산 기준 판매가가 없어 가격 변경 후보를 만들 수 없습니다.',
  TARGET_STOCK_UNAVAILABLE: '계산 기준 재고가 없어 재고 변경 후보를 만들 수 없습니다.',
  LINKED_SKU_PRICE_UNAVAILABLE: '연결 SKU 판매가가 없어 기준 판매가 계산이 불완전합니다.',
  LINKED_SKU_STOCK_UNAVAILABLE: '연결 SKU 재고가 없어 기준 재고 계산이 불완전합니다.',
  LINKED_SKU_COST_UNAVAILABLE: '연결 SKU 원가가 없어 마진 계산이 불완전합니다.',
  NO_LINKED_SKUS: '연결된 SKU가 없어 후속 Draft Batch 후보를 만들 수 없습니다.',
  SET_PRODUCT_RULE_NOT_IMPLEMENTED: '세트상품/복수 SKU 계산 규칙은 아직 구현 전입니다.',
  NO_CHANGE_DETECTED: '현재값과 계산값이 같아 변경 후보가 아닙니다.',
};

function uniqueRiskTypes(values: SkuKeywordBulkLikeRiskType[]): SkuKeywordBulkLikeRiskType[] {
  return Array.from(new Set(values));
}

function isBlockingRiskForChanges(
  riskType: SkuKeywordBulkLikeRiskType,
  input: {
    hasPriceChange: boolean;
    hasStockChange: boolean;
  },
): boolean {
  if (riskType === 'CHANNEL_ID_UNAVAILABLE' || riskType === 'NO_CHANGE_DETECTED') {
    return false;
  }

  if (
    riskType === 'CURRENT_PRICE_UNAVAILABLE'
    || riskType === 'TARGET_PRICE_UNAVAILABLE'
    || riskType === 'LINKED_SKU_PRICE_UNAVAILABLE'
    || riskType === 'LINKED_SKU_COST_UNAVAILABLE'
  ) {
    return input.hasPriceChange;
  }

  if (
    riskType === 'CURRENT_STOCK_UNAVAILABLE'
    || riskType === 'TARGET_STOCK_UNAVAILABLE'
    || riskType === 'LINKED_SKU_STOCK_UNAVAILABLE'
  ) {
    return input.hasStockChange;
  }

  return true;
}

function toBulkLikeLinkedSku(linkedSku: SkuKeywordHydratedLinkedSku): SkuKeywordBulkLikeLinkedSku {
  return {
    skuId: linkedSku.skuId,
    skuCode: linkedSku.skuCode,
    internalSkuCode: null,
    legacyStockCode: linkedSku.legacyStockCode,
    barcode: linkedSku.barcode,
    primaryBarcode: linkedSku.primaryBarcode,
    productName: linkedSku.productName,
    purchaseProductName: linkedSku.purchaseProductName,
    quantity: linkedSku.quantity,
    sellingPrice: linkedSku.sellingPrice,
    costPrice: linkedSku.costPrice,
    stockQuantity: linkedSku.stockQuantity,
    resolutionSource: linkedSku.resolutionSource,
  };
}

function mapHydrateIssueToRiskType(issue: SkuKeywordHydrateIssue): SkuKeywordBulkLikeRiskType {
  switch (issue.code) {
    case 'SKU_NOT_FOUND':
      return 'SKU_NOT_FOUND';
    case 'TARGET_NOT_FOUND':
      return 'TARGET_NOT_FOUND';
    case 'TARGET_CHANNEL_PRODUCT_MISMATCH':
      return 'TARGET_CHANNEL_PRODUCT_MISMATCH';
    case 'STORE_CONTEXT_UNAVAILABLE':
      return 'STORE_CONTEXT_UNAVAILABLE';
    case 'CHANNEL_ID_UNAVAILABLE':
      return 'CHANNEL_ID_UNAVAILABLE';
    case 'CURRENT_PRICE_UNAVAILABLE':
      return 'CURRENT_PRICE_UNAVAILABLE';
    case 'CURRENT_STOCK_UNAVAILABLE':
      return 'CURRENT_STOCK_UNAVAILABLE';
    default: {
      const exhaustive: never = issue.code;
      return exhaustive;
    }
  }
}

function calculateMargin(price: number | null, cost: number | null): {
  expectedMargin: number | null;
  marginRate: number | null;
} {
  if (price === null || cost === null || price <= 0) {
    return {
      expectedMargin: null,
      marginRate: null,
    };
  }

  const expectedMargin = price - cost;
  return {
    expectedMargin,
    marginRate: Number(((expectedMargin / price) * 100).toFixed(2)),
  };
}

export function calculateSkuKeywordTargetPrice(
  candidate: SkuKeywordHydratedCandidate,
): number | null {
  if (candidate.linkedSkus.length !== 1) return null;
  return candidate.linkedSkus[0]?.sellingPrice ?? null;
}

export function calculateSkuKeywordTargetStock(
  candidate: SkuKeywordHydratedCandidate,
): number | null {
  if (candidate.linkedSkus.length !== 1) return null;
  return candidate.linkedSkus[0]?.stockQuantity ?? null;
}

export function buildSkuKeywordBulkLikeIssues(
  candidate: SkuKeywordHydratedCandidate,
): SkuKeywordBulkLikeRiskType[] {
  const riskTypes: SkuKeywordBulkLikeRiskType[] = candidate.issues.map(mapHydrateIssueToRiskType);

  if (candidate.linkedSkus.length === 0) {
    riskTypes.push('NO_LINKED_SKUS');
  }

  if (candidate.linkedSkus.length > 1) {
    riskTypes.push('SET_PRODUCT_RULE_NOT_IMPLEMENTED');
  }

  if (candidate.linkedSkus.some((linkedSku) => linkedSku.sellingPrice === null)) {
    riskTypes.push('LINKED_SKU_PRICE_UNAVAILABLE');
  }

  if (candidate.linkedSkus.some((linkedSku) => linkedSku.stockQuantity === null)) {
    riskTypes.push('LINKED_SKU_STOCK_UNAVAILABLE');
  }

  if (candidate.linkedSkus.some((linkedSku) => linkedSku.costPrice === null)) {
    riskTypes.push('LINKED_SKU_COST_UNAVAILABLE');
  }

  const calculatedTargetPrice = calculateSkuKeywordTargetPrice(candidate);
  const calculatedTargetStock = calculateSkuKeywordTargetStock(candidate);

  if (calculatedTargetPrice === null) {
    riskTypes.push('TARGET_PRICE_UNAVAILABLE');
  }

  if (calculatedTargetStock === null) {
    riskTypes.push('TARGET_STOCK_UNAVAILABLE');
  }

  const hasComparablePrice = candidate.currentSmartstorePrice !== null && calculatedTargetPrice !== null;
  const hasComparableStock = candidate.currentSmartstoreStock !== null && calculatedTargetStock !== null;
  const hasPriceChange = hasComparablePrice && candidate.currentSmartstorePrice !== calculatedTargetPrice;
  const hasStockChange = hasComparableStock && candidate.currentSmartstoreStock !== calculatedTargetStock;

  if ((hasComparablePrice || hasComparableStock) && !hasPriceChange && !hasStockChange) {
    riskTypes.push('NO_CHANGE_DETECTED');
  }

  return uniqueRiskTypes(riskTypes);
}

function buildRecommendedAction(
  riskTypes: SkuKeywordBulkLikeRiskType[],
  input: {
    hasPriceChange: boolean;
    hasStockChange: boolean;
    isSetProduct: boolean;
  },
): string {
  if (input.isSetProduct && riskTypes.includes('SET_PRODUCT_RULE_NOT_IMPLEMENTED')) {
    return '세트상품 규칙이 정리된 뒤 별도 hydrate 단계에서 다시 계산하세요.';
  }

  if (riskTypes.includes('NO_LINKED_SKUS') || riskTypes.includes('SKU_NOT_FOUND')) {
    return '먼저 SKU 연결 문맥을 보강한 뒤 다시 hydrate 하세요.';
  }

  if (riskTypes.includes('TARGET_NOT_FOUND')) {
    return '운영 상품/옵션/추가상품 대상을 다시 확인하세요.';
  }

  if (input.hasPriceChange && riskTypes.includes('CURRENT_PRICE_UNAVAILABLE')) {
    return '가격 변경에 필요한 현재 스마트스토어 가격 문맥을 보강하세요.';
  }

  if (input.hasStockChange && riskTypes.includes('CURRENT_STOCK_UNAVAILABLE')) {
    return '재고 변경에 필요한 현재 스마트스토어 재고 문맥을 보강하세요.';
  }

  if (input.hasPriceChange && riskTypes.includes('TARGET_PRICE_UNAVAILABLE')) {
    return '가격 변경에 필요한 SKU 기준 목표 판매가 문맥을 보강하세요.';
  }

  if (input.hasStockChange && riskTypes.includes('TARGET_STOCK_UNAVAILABLE')) {
    return '재고 변경에 필요한 SKU 기준 목표 재고 문맥을 보강하세요.';
  }

  if (riskTypes.includes('NO_CHANGE_DETECTED')) {
    return '현재값과 계산값이 같아 후속 Draft Batch 후보 생성 대상이 아닙니다.';
  }

  if (input.hasPriceChange && input.hasStockChange) {
    return '가격/재고 변경 후보로 후속 bulk preview 승격 검토가 가능합니다.';
  }

  if (input.hasPriceChange) {
    return '가격 변경 후보로 후속 bulk preview 승격 검토가 가능합니다.';
  }

  if (input.hasStockChange) {
    return '재고 변경 후보로 후속 bulk preview 승격 검토가 가능합니다.';
  }

  return '추가 문맥 점검 후 후속 Draft Batch 후보 변환을 검토하세요.';
}

export function buildSkuKeywordBulkLikeCandidate(
  candidate: SkuKeywordHydratedCandidate,
): SkuKeywordBulkLikeCandidate {
  const linkedSkus = candidate.linkedSkus.map(toBulkLikeLinkedSku);
  const isSetProduct = linkedSkus.length > 1;
  const bundleSkus = isSetProduct ? linkedSkus : [];
  const calculatedTargetPrice = calculateSkuKeywordTargetPrice(candidate);
  const calculatedTargetStock = calculateSkuKeywordTargetStock(candidate);
  const costPrice = linkedSkus.length === 1 ? linkedSkus[0]?.costPrice ?? null : null;
  const { expectedMargin, marginRate } = calculateMargin(calculatedTargetPrice, costPrice);
  const hasPriceChange = candidate.currentSmartstorePrice !== null
    && calculatedTargetPrice !== null
    && candidate.currentSmartstorePrice !== calculatedTargetPrice;
  const hasStockChange = candidate.currentSmartstoreStock !== null
    && calculatedTargetStock !== null
    && candidate.currentSmartstoreStock !== calculatedTargetStock;
  const riskTypes = buildSkuKeywordBulkLikeIssues(candidate);
  const draftCreatable = !isSetProduct
    && linkedSkus.length === 1
    && (hasPriceChange || hasStockChange)
    && !riskTypes.some((riskType) => isBlockingRiskForChanges(riskType, {
      hasPriceChange,
      hasStockChange,
    }));
  const executable = draftCreatable;

  return {
    id: `${candidate.seedKey}:${candidate.itemId}`,
    sourceCandidateId: candidate.itemId,
    sourceSeedKey: candidate.seedKey,
    storeId: candidate.storeId,
    storeName: candidate.storeName,
    channelId: candidate.channelId,
    channelProductNo: candidate.channelProductNo,
    itemId: candidate.itemId,
    candidateType: candidate.candidateType,
    sourceMappingType: candidate.sourceMappingType,
    productName: candidate.productName,
    itemName: candidate.itemName,
    serialNo: candidate.serialNo,
    isSetProduct,
    linkedSkus,
    bundleSkus,
    currentSmartstorePrice: candidate.currentSmartstorePrice,
    calculatedTargetPrice,
    currentSmartstoreStock: candidate.currentSmartstoreStock,
    calculatedTargetStock,
    hasPriceChange,
    hasStockChange,
    costPrice,
    expectedMargin,
    marginRate,
    status: draftCreatable ? 'READY_FOR_REVIEW' : 'NEEDS_CONTEXT',
    riskTypes,
    riskMessages: riskTypes.map((riskType) => RISK_MESSAGES[riskType]),
    recommendedAction: buildRecommendedAction(riskTypes, {
      hasPriceChange,
      hasStockChange,
      isSetProduct,
    }),
    executable,
    draftCreatable,
    issues: candidate.issues,
    source: candidate.source,
    warningType: candidate.warningType,
    warningMessage: candidate.warningMessage,
    memo: candidate.memo,
    reviewMessage: candidate.reviewMessage,
    currentStateSyncedAt: candidate.currentStateSyncedAt,
    currentStateSource: candidate.currentStateSource,
  };
}

export function buildSkuKeywordBulkLikeCandidates(
  input: SkuKeywordBulkLikeTransformInput,
): SkuKeywordBulkLikeTransformResult {
  return {
    candidates: input.candidates.map(buildSkuKeywordBulkLikeCandidate),
  };
}
