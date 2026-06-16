import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { SkuDto } from '@/src/types/sku.types';

type SkuRequestData = {
  skuCode: string;
  sellerProductCode?: string | null;
  barcode?: string | null;
  supplierCode?: string | null;
  costPrice?: number;
  sellingPrice?: number;
  stockQuantity?: number;
  safetyStock?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function readNumber(value: unknown, fieldName: string, integer = false): number | undefined {
  if (value === null || value === undefined || String(value).trim() === '') return undefined;

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 0) {
    throw new Error(`${fieldName}은 0 이상의 숫자여야 합니다.`);
  }

  if (integer && !Number.isInteger(numberValue)) {
    throw new Error(`${fieldName}은 정수여야 합니다.`);
  }

  return numberValue;
}

export function toSkuDto(sku: {
  id: string;
  skuCode: string;
  sellerProductCode: string | null;
  barcode: string | null;
  supplierCode: string | null;
  costPrice: unknown;
  sellingPrice: unknown;
  stockQuantity: number;
  safetyStock: number;
  createdAt: Date;
  updatedAt: Date;
}): SkuDto {
  return {
    id: sku.id,
    skuCode: sku.skuCode,
    sellerProductCode: sku.sellerProductCode,
    barcode: sku.barcode,
    supplierCode: sku.supplierCode,
    costPrice: Number(sku.costPrice),
    sellingPrice: Number(sku.sellingPrice),
    stockQuantity: sku.stockQuantity,
    safetyStock: sku.safetyStock,
    createdAt: sku.createdAt.toISOString(),
    updatedAt: sku.updatedAt.toISOString(),
  };
}

function parseSkuRequest(body: unknown): SkuRequestData {
  if (!isRecord(body)) {
    throw new Error('요청 본문이 올바르지 않습니다.');
  }

  const skuCode = readText(body.skuCode);
  if (!skuCode) {
    throw new Error('SKU 코드를 입력하세요.');
  }

  return {
    skuCode,
    sellerProductCode: readText(body.sellerProductCode),
    barcode: readText(body.barcode),
    supplierCode: readText(body.supplierCode),
    costPrice: readNumber(body.costPrice, '원가'),
    sellingPrice: readNumber(body.sellingPrice, '판매가'),
    stockQuantity: readNumber(body.stockQuantity, '재고', true),
    safetyStock: readNumber(body.safetyStock, '안전재고', true),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') ?? searchParams.get('search') ?? '').trim();

    const skus = await prisma.sku.findMany({
      where: query
        ? {
            OR: [
              { skuCode: { contains: query } },
              { sellerProductCode: { contains: query } },
              { barcode: { contains: query } },
              { supplierCode: { contains: query } },
              { aliases: { some: { value: { contains: query } } } },
              { barcodes: { some: { barcode: { contains: query } } } },
              { barcodes: { some: { unitName: { contains: query } } } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(skus.map(toSkuDto));
  } catch (error) {
    console.error('SKU 목록 조회 실패:', error);
    return NextResponse.json({ error: 'SKU 목록 조회에 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = parseSkuRequest(await request.json());
    const existingSku = await prisma.sku.findUnique({
      where: { skuCode: data.skuCode },
      select: { id: true },
    });

    if (existingSku) {
      return NextResponse.json({ error: '이미 등록된 SKU 코드입니다.' }, { status: 409 });
    }

    const createdSku = await prisma.sku.create({ data });
    return NextResponse.json(toSkuDto(createdSku), { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SKU 등록에 실패했습니다.';
    console.error('SKU 등록 실패:', error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
