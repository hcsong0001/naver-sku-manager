import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { SkuKeywordManualSkuCandidate } from '@/src/types/sku-keyword-matching.types';

export const runtime = 'nodejs';

type SkuSearchRow = {
  id: string;
  skuCode: string;
  sellerProductCode: string | null;
  barcode: string | null;
  stockQuantity: number;
  aliases: {
    aliasType: string;
    value: string;
    source: string | null;
    memo: string | null;
  }[];
  barcodes: {
    barcode: string;
    unitName: string;
    quantity: number;
    isPrimary: boolean;
  }[];
};

function toPositiveLimit(value: string | null): number {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 1) return 20;
  return Math.min(Math.floor(numberValue), 50);
}

function uniqueText(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function toCandidate(sku: SkuSearchRow): SkuKeywordManualSkuCandidate {
  const aliases = sku.aliases.map((alias) => ({
    aliasType: alias.aliasType,
    value: alias.value,
    source: alias.source ?? '',
    memo: alias.memo ?? '',
  }));
  const barcodes = sku.barcodes.map((barcode) => ({
    barcode: barcode.barcode,
    unitName: barcode.unitName,
    quantity: barcode.quantity,
  }));
  const productNames = uniqueText(
    aliases
      .filter((alias) => alias.aliasType === 'PRODUCT_NAME')
      .map((alias) => alias.value),
  );
  const purchaseNames = uniqueText(
    aliases
      .filter((alias) => alias.aliasType === 'MATCH_KEYWORD')
      .map((alias) => alias.value),
  );
  const primaryBarcode = sku.barcodes.find((barcode) => barcode.isPrimary)?.barcode;
  const firstBarcode = sku.barcodes[0]?.barcode;
  const skuName =
    productNames[0] ??
    sku.sellerProductCode ??
    aliases.find((alias) => alias.value.length > 0)?.value ??
    sku.skuCode;

  return {
    id: sku.id,
    skuCode: sku.skuCode,
    skuName,
    sellerProductCode: sku.sellerProductCode ?? '',
    barcode: primaryBarcode ?? sku.barcode ?? firstBarcode ?? '',
    stockQuantity: sku.stockQuantity,
    aliases,
    barcodes,
    productNames,
    purchaseNames,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') ?? searchParams.get('search') ?? '').trim();
    const take = toPositiveLimit(searchParams.get('take'));

    if (!query) {
      return NextResponse.json({ error: '검색어를 입력해 주세요.' }, { status: 400 });
    }

    const skus = await prisma.sku.findMany({
      where: {
        OR: [
          { skuCode: { contains: query } },
          { sellerProductCode: { contains: query } },
          { barcode: { contains: query } },
          { supplierCode: { contains: query } },
          { aliases: { some: { value: { contains: query } } } },
          { aliases: { some: { source: { contains: query } } } },
          { aliases: { some: { memo: { contains: query } } } },
          { barcodes: { some: { barcode: { contains: query } } } },
          { barcodes: { some: { unitName: { contains: query } } } },
        ],
      },
      include: {
        aliases: { orderBy: [{ aliasType: 'asc' }, { value: 'asc' }] },
        barcodes: { orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }] },
      },
      orderBy: { updatedAt: 'desc' },
      take,
    });

    return NextResponse.json(skus.map(toCandidate));
  } catch (error) {
    console.error('수동 SKU 검색 실패:', error);
    return NextResponse.json({ error: 'SKU 검색에 실패했습니다.' }, { status: 500 });
  }
}
