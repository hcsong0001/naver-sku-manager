import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type BarcodeRequest = {
  barcode: string;
  unitName: string;
  quantity: number;
  barcodeType: string | null;
  isPrimary: boolean;
  source: string | null;
  memo: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function readBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  const text = readText(value)?.toLowerCase();
  return text === 'true' || text === 'y' || text === '1';
}

function parseBarcodeRequest(body: unknown): BarcodeRequest {
  if (!isRecord(body)) {
    throw new Error('요청 본문이 올바르지 않습니다.');
  }

  const barcode = readText(body.barcode);
  const unitName = readText(body.unitName);
  const quantity = Number(body.quantity ?? 1);

  if (!barcode) {
    throw new Error('바코드를 입력하세요.');
  }

  if (!unitName) {
    throw new Error('포장단위명을 입력하세요.');
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error('수량은 1 이상의 정수여야 합니다.');
  }

  return {
    barcode,
    unitName,
    quantity,
    barcodeType: readText(body.barcodeType),
    isPrimary: readBoolean(body.isPrimary),
    source: readText(body.source),
    memo: readText(body.memo),
  };
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = parseBarcodeRequest(await request.json());
    const sku = await prisma.sku.findUnique({ where: { id }, select: { id: true } });

    if (!sku) {
      return NextResponse.json({ error: 'SKU를 찾을 수 없습니다.' }, { status: 404 });
    }

    const barcode = await prisma.$transaction(async (tx) => {
      if (data.isPrimary) {
        await tx.skuBarcode.updateMany({
          where: { skuId: id },
          data: { isPrimary: false },
        });
      }

      return tx.skuBarcode.create({
        data: { skuId: id, ...data },
      });
    });

    return NextResponse.json(barcode, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : '바코드 등록에 실패했습니다.';
    console.error('SKU 바코드 등록 실패:', error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
