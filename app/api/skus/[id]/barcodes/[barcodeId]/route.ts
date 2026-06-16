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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; barcodeId: string }> }
) {
  try {
    const { id, barcodeId } = await params;
    const data = parseBarcodeRequest(await request.json());
    const existing = await prisma.skuBarcode.findFirst({
      where: { id: barcodeId, skuId: id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: '바코드를 찾을 수 없습니다.' }, { status: 404 });
    }

    const duplicated = await prisma.skuBarcode.findFirst({
      where: { skuId: id, barcode: data.barcode, NOT: { id: barcodeId } },
      select: { id: true },
    });

    if (duplicated) {
      return NextResponse.json({ error: '같은 SKU에 이미 등록된 바코드입니다.' }, { status: 409 });
    }

    const barcode = await prisma.$transaction(async (tx) => {
      if (data.isPrimary) {
        await tx.skuBarcode.updateMany({
          where: { skuId: id, NOT: { id: barcodeId } },
          data: { isPrimary: false },
        });
      }

      return tx.skuBarcode.update({
        where: { id: barcodeId },
        data,
      });
    });

    return NextResponse.json(barcode);
  } catch (error) {
    const message = error instanceof Error ? error.message : '바코드 수정에 실패했습니다.';
    console.error('SKU 바코드 수정 실패:', error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; barcodeId: string }> }
) {
  try {
    const { id, barcodeId } = await params;
    const barcode = await prisma.skuBarcode.findFirst({
      where: { id: barcodeId, skuId: id },
      select: { id: true },
    });

    if (!barcode) {
      return NextResponse.json({ error: '바코드를 찾을 수 없습니다.' }, { status: 404 });
    }

    await prisma.skuBarcode.delete({ where: { id: barcodeId } });
    return NextResponse.json({ message: '바코드를 삭제했습니다.' });
  } catch (error) {
    console.error('SKU 바코드 삭제 실패:', error);
    return NextResponse.json({ error: '바코드 삭제에 실패했습니다.' }, { status: 500 });
  }
}
