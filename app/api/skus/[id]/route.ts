import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { SkuAliasDto, SkuBarcodeDto, SkuDetailDto } from '@/src/types/sku.types';
import { toSkuDto } from '../route';

type SkuUpdateData = {
  skuCode: string;
  sellerProductCode: string | null;
  barcode: string | null;
  supplierCode: string | null;
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

function parseSkuUpdate(body: unknown): SkuUpdateData {
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

function toAliasDto(alias: {
  id: string;
  skuId: string;
  aliasType: string;
  value: string;
  source: string | null;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
}): SkuAliasDto {
  return {
    ...alias,
    createdAt: alias.createdAt.toISOString(),
    updatedAt: alias.updatedAt.toISOString(),
  };
}

function toBarcodeDto(barcode: {
  id: string;
  skuId: string;
  barcode: string;
  unitName: string;
  quantity: number;
  barcodeType: string | null;
  isPrimary: boolean;
  source: string | null;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
}): SkuBarcodeDto {
  return {
    ...barcode,
    createdAt: barcode.createdAt.toISOString(),
    updatedAt: barcode.updatedAt.toISOString(),
  };
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sku = await prisma.sku.findUnique({
      where: { id },
      include: {
        aliases: { orderBy: [{ aliasType: 'asc' }, { value: 'asc' }] },
        barcodes: { orderBy: [{ isPrimary: 'desc' }, { unitName: 'asc' }] },
      },
    });

    if (!sku) {
      return NextResponse.json({ error: 'SKU를 찾을 수 없습니다.' }, { status: 404 });
    }

    const response: SkuDetailDto = {
      ...toSkuDto(sku),
      aliases: sku.aliases.map(toAliasDto),
      barcodes: sku.barcodes.map(toBarcodeDto),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('SKU 상세 조회 실패:', error);
    return NextResponse.json({ error: 'SKU 상세 조회에 실패했습니다.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = parseSkuUpdate(await request.json());
    const existingSku = await prisma.sku.findUnique({
      where: { id },
      select: { id: true, skuCode: true },
    });

    if (!existingSku) {
      return NextResponse.json({ error: 'SKU를 찾을 수 없습니다.' }, { status: 404 });
    }

    if (data.skuCode !== existingSku.skuCode) {
      const duplicatedSku = await prisma.sku.findUnique({
        where: { skuCode: data.skuCode },
        select: { id: true },
      });

      if (duplicatedSku) {
        return NextResponse.json({ error: '이미 등록된 SKU 코드입니다.' }, { status: 409 });
      }
    }

    const updatedSku = await prisma.sku.update({
      where: { id },
      data,
    });

    return NextResponse.json(toSkuDto(updatedSku));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SKU 수정에 실패했습니다.';
    console.error('SKU 수정 실패:', error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
