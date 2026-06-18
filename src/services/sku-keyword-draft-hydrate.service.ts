import prisma from '@/lib/prisma';
import type {
  SkuKeywordDraftSeedCandidate,
  SkuKeywordDraftSeedSku,
} from '@/src/types/sku-keyword-draft-seed.types';
import type {
  SkuKeywordHydrateAdditionalRecord,
  SkuKeywordHydrateContext,
  SkuKeywordHydrateInput,
  SkuKeywordHydrateIssue,
  SkuKeywordHydrateProductRecord,
  SkuKeywordHydrateResult,
  SkuKeywordHydrateSkuRecord,
  SkuKeywordHydrateOptionRecord,
  SkuKeywordHydratedCandidate,
  SkuKeywordHydratedLinkedSku,
} from '@/src/types/sku-keyword-draft-hydrate.types';

function uniqueStrings(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => value?.trim() ?? '').filter(Boolean)));
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildIssue(
  issue: Omit<SkuKeywordHydrateIssue, 'skuId' | 'skuCode'> & {
    sku?: Pick<SkuKeywordDraftSeedSku, 'skuId' | 'skuCode'> | null;
  },
): SkuKeywordHydrateIssue {
  return {
    code: issue.code,
    severity: issue.severity,
    message: issue.message,
    skuId: issue.sku?.skuId ?? null,
    skuCode: issue.sku?.skuCode ?? null,
  };
}

function firstOrNull<T>(values: T[]): T | null {
  return values.length > 0 ? values[0] : null;
}

function buildSkuRecordMap(records: SkuKeywordHydrateSkuRecord[]): {
  skuById: Map<string, SkuKeywordHydrateSkuRecord>;
  skuByCode: Map<string, SkuKeywordHydrateSkuRecord>;
  skuByBarcode: Map<string, SkuKeywordHydrateSkuRecord>;
} {
  const skuById = new Map<string, SkuKeywordHydrateSkuRecord>();
  const skuByCode = new Map<string, SkuKeywordHydrateSkuRecord>();
  const skuByBarcode = new Map<string, SkuKeywordHydrateSkuRecord>();

  for (const record of records) {
    skuById.set(record.id, record);
    skuByCode.set(record.skuCode, record);
    if (record.barcode) skuByBarcode.set(record.barcode, record);
    if (record.primaryBarcode) skuByBarcode.set(record.primaryBarcode, record);
  }

  return { skuById, skuByCode, skuByBarcode };
}

function optionDisplayName(option: {
  optionName: string;
  optionValue: string;
}): string {
  return uniqueStrings([option.optionName, option.optionValue]).join(' / ');
}

function additionalDisplayName(additional: {
  additionalName: string;
  additionalValue: string;
}): string {
  return uniqueStrings([additional.additionalName, additional.additionalValue]).join(' / ');
}

function getChannelIdUnavailableMessage(seed: SkuKeywordDraftSeedCandidate): string {
  return `${seed.mappingType} 대상 hydrate 문맥에는 channelId 전용 필드가 없습니다. Smartstore.sellerId/naverAccountId는 존재하지만 channelId와 동일하다고 단정할 수 없어 null로 유지합니다.`;
}

function getCurrentPriceUnavailableMessage(
  seed: SkuKeywordDraftSeedCandidate,
  contextAvailable: boolean,
): string {
  if (seed.mappingType === 'PRODUCT') {
    return contextAvailable
      ? 'NaverProduct 모델에는 현재 스마트스토어 판매가 컬럼이 없어 PRODUCT 현재가를 hydrate 단계에서 채울 수 없습니다.'
      : 'PRODUCT 대상 문맥이 없어 현재 스마트스토어 판매가를 확인할 수 없습니다.';
  }
  if (seed.mappingType === 'OPTION') {
    return contextAvailable
      ? 'NaverProductOption 모델에는 옵션 현재 판매가 컬럼이 없어 OPTION 현재가를 hydrate 단계에서 채울 수 없습니다.'
      : 'OPTION 대상 문맥이 없어 현재 스마트스토어 판매가를 확인할 수 없습니다.';
  }
  return contextAvailable
    ? 'NaverProductAdditional.price 값이 비어 있어 ADDITIONAL 현재가를 hydrate 단계에서 채울 수 없습니다.'
    : 'ADDITIONAL 대상 문맥이 없어 현재 스마트스토어 판매가를 확인할 수 없습니다.';
}

function getCurrentStockUnavailableMessage(
  seed: SkuKeywordDraftSeedCandidate,
  contextAvailable: boolean,
): string {
  if (seed.mappingType === 'PRODUCT') {
    return contextAvailable
      ? 'NaverProduct 모델에는 현재 스마트스토어 재고 컬럼이 없어 PRODUCT 현재재고를 hydrate 단계에서 채울 수 없습니다.'
      : 'PRODUCT 대상 문맥이 없어 현재 스마트스토어 재고를 확인할 수 없습니다.';
  }
  if (seed.mappingType === 'OPTION') {
    return contextAvailable
      ? 'NaverProductOption 모델에는 옵션 현재 재고 컬럼이 없어 OPTION 현재재고를 hydrate 단계에서 채울 수 없습니다.'
      : 'OPTION 대상 문맥이 없어 현재 스마트스토어 재고를 확인할 수 없습니다.';
  }
  return contextAvailable
    ? 'NaverProductAdditional.stockQuantity 값이 비어 있어 ADDITIONAL 현재재고를 hydrate 단계에서 채울 수 없습니다.'
    : 'ADDITIONAL 대상 문맥이 없어 현재 스마트스토어 재고를 확인할 수 없습니다.';
}

function resolveSkuRecord(
  seedSku: SkuKeywordDraftSeedSku,
  context: SkuKeywordHydrateContext,
): SkuKeywordHydrateSkuRecord | null {
  if (seedSku.skuId) {
    const byId = context.skuById.get(seedSku.skuId);
    if (byId) return byId;
  }

  if (seedSku.skuCode) {
    const byCode = context.skuByCode.get(seedSku.skuCode);
    if (byCode) return byCode;
  }

  if (seedSku.barcode) {
    const byBarcode = context.skuByBarcode.get(seedSku.barcode);
    if (byBarcode) return byBarcode;
  }

  return null;
}

export async function loadSkuKeywordDraftSeedContext(
  input: SkuKeywordHydrateInput,
): Promise<SkuKeywordHydrateContext> {
  const skuIds = uniqueStrings(
    input.seeds.flatMap((seed) => seed.skus.map((sku) => sku.skuId ?? '')),
  );
  const skuCodes = uniqueStrings(
    input.seeds.flatMap((seed) => seed.skus.map((sku) => sku.skuCode)),
  );
  const barcodes = uniqueStrings(
    input.seeds.flatMap((seed) => seed.skus.map((sku) => sku.barcode)),
  );
  const productIds = uniqueStrings(
    input.seeds
      .filter((seed) => seed.mappingType === 'PRODUCT')
      .map((seed) => seed.itemId),
  );
  const optionIds = uniqueStrings(
    input.seeds
      .filter((seed) => seed.mappingType === 'OPTION')
      .map((seed) => seed.itemId),
  );
  const additionalIds = uniqueStrings(
    input.seeds
      .filter((seed) => seed.mappingType === 'ADDITIONAL')
      .map((seed) => seed.itemId),
  );

  const [skus, products, options, additionals] = await Promise.all([
    prisma.sku.findMany({
      where: {
        OR: [
          ...(skuIds.length > 0 ? [{ id: { in: skuIds } }] : []),
          ...(skuCodes.length > 0 ? [{ skuCode: { in: skuCodes } }] : []),
          ...(barcodes.length > 0 ? [{ barcode: { in: barcodes } }] : []),
          ...(barcodes.length > 0 ? [{ barcodes: { some: { barcode: { in: barcodes } } } }] : []),
        ],
      },
      include: {
        aliases: true,
        barcodes: {
          orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
        },
      },
    }),
    prisma.naverProduct.findMany({
      where: { id: { in: productIds } },
      include: {
        smartstore: {
          select: { id: true, name: true },
        },
      },
    }),
    prisma.naverProductOption.findMany({
      where: { id: { in: optionIds } },
      include: {
        naverProduct: {
          include: {
            smartstore: {
              select: { id: true, name: true },
            },
          },
        },
      },
    }),
    prisma.naverProductAdditional.findMany({
      where: { id: { in: additionalIds } },
      include: {
        naverProduct: {
          include: {
            smartstore: {
              select: { id: true, name: true },
            },
          },
        },
      },
    }),
  ]);

  const skuRecords: SkuKeywordHydrateSkuRecord[] = skus.map((sku) => {
    const productName = firstOrNull(
      sku.aliases
        .filter((alias) => alias.aliasType === 'PRODUCT_NAME')
        .map((alias) => alias.value),
    );
    const purchaseProductName = firstOrNull(
      sku.aliases
        .filter((alias) => alias.aliasType === 'MATCH_KEYWORD')
        .map((alias) => alias.value),
    );
    const primaryBarcode = sku.barcodes.find((barcode) => barcode.isPrimary)?.barcode
      ?? sku.barcodes[0]?.barcode
      ?? null;

    return {
      id: sku.id,
      skuCode: sku.skuCode,
      sellerProductCode: sku.sellerProductCode ?? null,
      barcode: sku.barcode ?? null,
      sellingPrice: toNumberOrNull(sku.sellingPrice),
      costPrice: toNumberOrNull(sku.costPrice),
      stockQuantity: sku.stockQuantity,
      productName,
      purchaseProductName,
      primaryBarcode,
    };
  });

  const { skuById, skuByCode, skuByBarcode } = buildSkuRecordMap(skuRecords);

  const productById = new Map<string, SkuKeywordHydrateProductRecord>(
    products.map((product) => [
      product.id,
      {
        id: product.id,
        channelProductNo: product.channelProductNo ?? null,
        smartstoreId: product.smartstore.id,
        storeName: product.smartstore.name,
        productName: product.name,
      },
    ]),
  );

  const optionById = new Map<string, SkuKeywordHydrateOptionRecord>(
    options.map((option) => [
      option.id,
      {
        id: option.id,
        channelProductNo: option.naverProduct.channelProductNo ?? null,
        smartstoreId: option.naverProduct.smartstore.id,
        storeName: option.naverProduct.smartstore.name,
        productName: option.naverProduct.name,
        optionName: option.optionName,
        optionValue: option.optionValue,
        optionCode: option.optionCode ?? null,
      },
    ]),
  );

  const additionalById = new Map<string, SkuKeywordHydrateAdditionalRecord>(
    additionals.map((additional) => [
      additional.id,
      {
        id: additional.id,
        channelProductNo: additional.naverProduct.channelProductNo ?? null,
        smartstoreId: additional.naverProduct.smartstore.id,
        storeName: additional.naverProduct.smartstore.name,
        productName: additional.naverProduct.name,
        additionalName: additional.additionalName,
        additionalValue: additional.additionalValue,
        sellerManagementCode: additional.sellerManagementCode ?? null,
        price: additional.price ?? null,
        stockQuantity: additional.stockQuantity ?? null,
      },
    ]),
  );

  return {
    seeds: input.seeds,
    skuById,
    skuByCode,
    skuByBarcode,
    productById,
    optionById,
    additionalById,
  };
}

export function buildSkuKeywordHydratedLinkedSkus(
  seed: SkuKeywordDraftSeedCandidate,
  context: SkuKeywordHydrateContext,
): {
  linkedSkus: SkuKeywordHydratedLinkedSku[];
  issues: SkuKeywordHydrateIssue[];
} {
  const linkedSkus: SkuKeywordHydratedLinkedSku[] = [];
  const issues: SkuKeywordHydrateIssue[] = [];

  for (const seedSku of seed.skus) {
    const skuRecord = resolveSkuRecord(seedSku, context);

    if (!skuRecord) {
      linkedSkus.push({
        skuId: seedSku.skuId,
        skuCode: seedSku.skuCode,
        skuName: null,
        sellerProductCode: seedSku.sellerProductCode,
        barcode: seedSku.barcode,
        primaryBarcode: null,
        quantity: seedSku.quantity,
        resolutionSource: seedSku.resolutionSource,
        sellingPrice: null,
        costPrice: null,
        stockQuantity: null,
        productName: null,
        purchaseProductName: null,
        legacyStockCode: null,
      });
      issues.push(buildIssue({
        code: 'SKU_NOT_FOUND',
        severity: 'error',
        message: `SKU ${seedSku.skuCode || seedSku.skuId || seedSku.barcode} 문맥을 찾을 수 없습니다.`,
        sku: seedSku,
      }));
      continue;
    }

    linkedSkus.push({
      skuId: skuRecord.id,
      skuCode: skuRecord.skuCode,
      skuName: skuRecord.productName,
      sellerProductCode: skuRecord.sellerProductCode,
      barcode: skuRecord.barcode ?? seedSku.barcode,
      primaryBarcode: skuRecord.primaryBarcode,
      quantity: seedSku.quantity,
      resolutionSource: seedSku.resolutionSource,
      sellingPrice: skuRecord.sellingPrice,
      costPrice: skuRecord.costPrice,
      stockQuantity: skuRecord.stockQuantity,
      productName: skuRecord.productName,
      purchaseProductName: skuRecord.purchaseProductName,
      legacyStockCode: null,
    });
  }

  return { linkedSkus, issues };
}

export function buildSkuKeywordHydratedCandidate(
  seed: SkuKeywordDraftSeedCandidate,
  context: SkuKeywordHydrateContext,
): SkuKeywordHydratedCandidate {
  const { linkedSkus, issues } = buildSkuKeywordHydratedLinkedSkus(seed, context);

  let productName: string | null = null;
  let itemName: string | null = null;
  let storeId: string | null = null;
  let storeName: string | null = null;
  const channelId: string | null = null;
  let currentSmartstorePrice: number | null = null;
  let currentSmartstoreStock: number | null = null;
  let targetContextAvailable = false;

  if (seed.mappingType === 'PRODUCT') {
    const product = context.productById.get(seed.itemId);
    if (!product) {
      issues.push(buildIssue({
        code: 'TARGET_NOT_FOUND',
        severity: 'error',
        message: `PRODUCT 대상 ${seed.itemId} 문맥을 찾을 수 없습니다.`,
      }));
    } else {
      targetContextAvailable = true;
      productName = product.productName;
      itemName = product.productName;
      storeId = product.smartstoreId;
      storeName = product.storeName;
      if (product.channelProductNo && product.channelProductNo !== seed.channelProductNo) {
        issues.push(buildIssue({
          code: 'TARGET_CHANNEL_PRODUCT_MISMATCH',
          severity: 'warning',
          message: `seed 상품번호 ${seed.channelProductNo}와 운영 상품번호 ${product.channelProductNo}가 다릅니다.`,
        }));
      }
    }
  } else if (seed.mappingType === 'OPTION') {
    const option = context.optionById.get(seed.itemId);
    if (!option) {
      issues.push(buildIssue({
        code: 'TARGET_NOT_FOUND',
        severity: 'error',
        message: `OPTION 대상 ${seed.itemId} 문맥을 찾을 수 없습니다.`,
      }));
    } else {
      targetContextAvailable = true;
      productName = option.productName;
      itemName = optionDisplayName(option);
      storeId = option.smartstoreId;
      storeName = option.storeName;
      if (option.channelProductNo && option.channelProductNo !== seed.channelProductNo) {
        issues.push(buildIssue({
          code: 'TARGET_CHANNEL_PRODUCT_MISMATCH',
          severity: 'warning',
          message: `seed 상품번호 ${seed.channelProductNo}와 운영 상품번호 ${option.channelProductNo}가 다릅니다.`,
        }));
      }
    }
  } else {
    const additional = context.additionalById.get(seed.itemId);
    if (!additional) {
      issues.push(buildIssue({
        code: 'TARGET_NOT_FOUND',
        severity: 'error',
        message: `ADDITIONAL 대상 ${seed.itemId} 문맥을 찾을 수 없습니다.`,
      }));
    } else {
      targetContextAvailable = true;
      productName = additional.productName;
      itemName = additionalDisplayName(additional);
      storeId = additional.smartstoreId;
      storeName = additional.storeName;
      currentSmartstorePrice = additional.price;
      currentSmartstoreStock = additional.stockQuantity;
      if (additional.channelProductNo && additional.channelProductNo !== seed.channelProductNo) {
        issues.push(buildIssue({
          code: 'TARGET_CHANNEL_PRODUCT_MISMATCH',
          severity: 'warning',
          message: `seed 상품번호 ${seed.channelProductNo}와 운영 상품번호 ${additional.channelProductNo}가 다릅니다.`,
        }));
      }
    }
  }

  if (!storeId || !storeName) {
    issues.push(buildIssue({
      code: 'STORE_CONTEXT_UNAVAILABLE',
      severity: 'warning',
      message: '운영 상품 문맥에서 스토어 정보를 확인할 수 없습니다.',
    }));
  }

  issues.push(buildIssue({
    code: 'CHANNEL_ID_UNAVAILABLE',
    severity: 'info',
    message: getChannelIdUnavailableMessage(seed),
  }));

  if (currentSmartstorePrice === null) {
    issues.push(buildIssue({
      code: 'CURRENT_PRICE_UNAVAILABLE',
      severity: 'info',
      message: getCurrentPriceUnavailableMessage(seed, targetContextAvailable),
    }));
  }

  if (currentSmartstoreStock === null) {
    issues.push(buildIssue({
      code: 'CURRENT_STOCK_UNAVAILABLE',
      severity: 'info',
      message: getCurrentStockUnavailableMessage(seed, targetContextAvailable),
    }));
  }

  return {
    seedKey: seed.seedKey,
    source: seed.source,
    mappingType: seed.mappingType,
    candidateType: seed.mappingType,
    sourceMappingType: seed.mappingType,
    channelProductNo: seed.channelProductNo,
    itemId: seed.itemId,
    productName,
    itemName,
    serialNo: null,
    storeId,
    storeName,
    channelId,
    sourceText: seed.sourceText,
    matchedKeyword: seed.matchedKeyword,
    keywordColumn: seed.keywordColumn,
    productManagementRowNo: seed.productManagementRowNo,
    confidence: seed.confidence,
    memo: seed.memo,
    reviewMessage: seed.reviewMessage,
    warningType: seed.warningType,
    warningMessage: seed.warningMessage,
    matchMethod: seed.matchMethod,
    matchedBarcode: seed.matchedBarcode,
    matchedSkuCode: seed.matchedSkuCode,
    linkedSkus,
    currentSmartstorePrice,
    currentSmartstoreStock,
    issues,
  };
}

export async function hydrateSkuKeywordDraftSeeds(
  input: SkuKeywordHydrateInput,
): Promise<SkuKeywordHydrateResult> {
  const context = await loadSkuKeywordDraftSeedContext(input);

  return {
    candidates: input.seeds.map((seed) => buildSkuKeywordHydratedCandidate(seed, context)),
    context,
  };
}
