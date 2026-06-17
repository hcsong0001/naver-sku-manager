import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { Prisma } from '@/app/generated/prisma';
import type { SkuMappingType } from '@/src/types/sku-keyword-matching.types';

export const runtime = 'nodejs';

type ManualUnapplyRequest = {
  mappingType: SkuMappingType;
  itemId: string;
  skuIds?: string[];
};

type RemovedSku = {
  skuId: string;
  skuCode: string;
  quantity: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toStringCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function isMappingType(value: string): value is SkuMappingType {
  return value === 'PRODUCT' || value === 'OPTION' || value === 'ADDITIONAL';
}

function parseRequest(payload: unknown): ManualUnapplyRequest | null {
  if (!isRecord(payload)) return null;

  const mappingType = toStringCell(payload.mappingType);
  const itemId = toStringCell(payload.itemId);
  const skuIds = Array.isArray(payload.skuIds)
    ? Array.from(new Set(payload.skuIds.map(toStringCell).filter(Boolean)))
    : undefined;

  if (!isMappingType(mappingType) || !itemId) return null;
  return { mappingType, itemId, skuIds };
}

function shouldClearDirectSku(currentSkuId: string | null, skuIds?: string[]): boolean {
  if (!currentSkuId) return false;
  return !skuIds || skuIds.includes(currentSkuId);
}

function buildSkuFilter(skuIds?: string[]): { skuId?: { in: string[] } } {
  return skuIds && skuIds.length > 0 ? { skuId: { in: skuIds } } : {};
}

async function removeProductMappings(
  tx: Prisma.TransactionClient,
  itemId: string,
  skuIds?: string[],
): Promise<{ targetExists: boolean; directSkuId: string | null; removedSkus: RemovedSku[]; deletedCount: number }> {
  const product = await tx.naverProduct.findUnique({
    where: { id: itemId },
    select: { id: true, skuId: true, sku: { select: { skuCode: true } } },
  });
  if (!product) return { targetExists: false, directSkuId: null, removedSkus: [], deletedCount: 0 };

  const where = { naverProductId: itemId, ...buildSkuFilter(skuIds) };
  const mappings = await tx.naverProductSku.findMany({
    where,
    select: { skuId: true, quantity: true, sku: { select: { skuCode: true } } },
  });
  const removedSkus = mappings.map((mapping) => ({
    skuId: mapping.skuId,
    skuCode: mapping.sku.skuCode,
    quantity: mapping.quantity,
  }));
  const deleted = await tx.naverProductSku.deleteMany({ where });

  if (product.skuId && shouldClearDirectSku(product.skuId, skuIds)) {
    await tx.naverProduct.update({ where: { id: itemId }, data: { skuId: null } });
    removedSkus.push({
      skuId: product.skuId,
      skuCode: product.sku?.skuCode ?? '',
      quantity: 1,
    });
  }

  return { targetExists: true, directSkuId: product.skuId, removedSkus, deletedCount: deleted.count };
}

async function removeOptionMappings(
  tx: Prisma.TransactionClient,
  itemId: string,
  skuIds?: string[],
): Promise<{ targetExists: boolean; directSkuId: string | null; removedSkus: RemovedSku[]; deletedCount: number }> {
  const option = await tx.naverProductOption.findUnique({
    where: { id: itemId },
    select: { id: true, skuId: true, sku: { select: { skuCode: true } } },
  });
  if (!option) return { targetExists: false, directSkuId: null, removedSkus: [], deletedCount: 0 };

  const where = { optionId: itemId, ...buildSkuFilter(skuIds) };
  const mappings = await tx.naverProductOptionSku.findMany({
    where,
    select: { skuId: true, quantity: true, sku: { select: { skuCode: true } } },
  });
  const removedSkus = mappings.map((mapping) => ({
    skuId: mapping.skuId,
    skuCode: mapping.sku.skuCode,
    quantity: mapping.quantity,
  }));
  const deleted = await tx.naverProductOptionSku.deleteMany({ where });

  if (option.skuId && shouldClearDirectSku(option.skuId, skuIds)) {
    await tx.naverProductOption.update({ where: { id: itemId }, data: { skuId: null } });
    removedSkus.push({
      skuId: option.skuId,
      skuCode: option.sku?.skuCode ?? '',
      quantity: 1,
    });
  }

  return { targetExists: true, directSkuId: option.skuId, removedSkus, deletedCount: deleted.count };
}

async function removeAdditionalMappings(
  tx: Prisma.TransactionClient,
  itemId: string,
  skuIds?: string[],
): Promise<{ targetExists: boolean; directSkuId: string | null; removedSkus: RemovedSku[]; deletedCount: number }> {
  const additional = await tx.naverProductAdditional.findUnique({
    where: { id: itemId },
    select: { id: true, skuId: true, sku: { select: { skuCode: true } } },
  });
  if (!additional) return { targetExists: false, directSkuId: null, removedSkus: [], deletedCount: 0 };

  const where = { additionalId: itemId, ...buildSkuFilter(skuIds) };
  const mappings = await tx.naverProductAdditionalSku.findMany({
    where,
    select: { skuId: true, quantity: true, sku: { select: { skuCode: true } } },
  });
  const removedSkus = mappings.map((mapping) => ({
    skuId: mapping.skuId,
    skuCode: mapping.sku.skuCode,
    quantity: mapping.quantity,
  }));
  const deleted = await tx.naverProductAdditionalSku.deleteMany({ where });

  if (additional.skuId && shouldClearDirectSku(additional.skuId, skuIds)) {
    await tx.naverProductAdditional.update({ where: { id: itemId }, data: { skuId: null } });
    removedSkus.push({
      skuId: additional.skuId,
      skuCode: additional.sku?.skuCode ?? '',
      quantity: 1,
    });
  }

  return { targetExists: true, directSkuId: additional.skuId, removedSkus, deletedCount: deleted.count };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const parsed = parseRequest(payload);

    if (!parsed) {
      return NextResponse.json({ error: '매핑해제할 대상 정보가 없습니다.' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const removed =
        parsed.mappingType === 'PRODUCT'
          ? await removeProductMappings(tx, parsed.itemId, parsed.skuIds)
          : parsed.mappingType === 'OPTION'
            ? await removeOptionMappings(tx, parsed.itemId, parsed.skuIds)
            : await removeAdditionalMappings(tx, parsed.itemId, parsed.skuIds);

      if (!removed.targetExists) {
        return {
          targetExists: false,
          deletedCount: 0,
          aliasDeletedCount: 0,
          removedSkus: [],
        };
      }

      const removedSkuIds = Array.from(new Set(removed.removedSkus.map((sku) => sku.skuId).filter(Boolean)));
      const aliasDeleted =
        removedSkuIds.length > 0
          ? await tx.skuAlias.deleteMany({
              where: {
                skuId: { in: removedSkuIds },
                aliasType: 'MATCH_KEYWORD',
                value: `${parsed.mappingType}:${parsed.itemId}`,
                source: '키워드 수동확정',
              },
            })
          : { count: 0 };

      return {
        targetExists: true,
        deletedCount: removed.deletedCount,
        directCleared: shouldClearDirectSku(removed.directSkuId, parsed.skuIds),
        aliasDeletedCount: aliasDeleted.count,
        removedSkus: removed.removedSkus,
      };
    });

    if (!result.targetExists) {
      return NextResponse.json({ error: '매핑 대상 상품/옵션을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '수동 매핑해제에 실패했습니다.';
    console.error('키워드 수동 매핑해제 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
