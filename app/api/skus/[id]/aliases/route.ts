import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { SKU_ALIAS_TYPES, type SkuAliasType } from '@/src/types/sku.types';

type AliasRequest = {
  aliasType: SkuAliasType;
  value: string;
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

function isAliasType(value: string): value is SkuAliasType {
  return SKU_ALIAS_TYPES.includes(value as SkuAliasType);
}

function parseAliasRequest(body: unknown): AliasRequest {
  if (!isRecord(body)) {
    throw new Error('요청 본문이 올바르지 않습니다.');
  }

  const aliasType = readText(body.aliasType);
  const value = readText(body.value);

  if (!aliasType || !isAliasType(aliasType)) {
    throw new Error('별칭 타입이 올바르지 않습니다.');
  }

  if (!value) {
    throw new Error('별칭 값을 입력하세요.');
  }

  return {
    aliasType,
    value,
    source: readText(body.source),
    memo: readText(body.memo),
  };
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = parseAliasRequest(await request.json());
    const sku = await prisma.sku.findUnique({ where: { id }, select: { id: true } });

    if (!sku) {
      return NextResponse.json({ error: 'SKU를 찾을 수 없습니다.' }, { status: 404 });
    }

    const alias = await prisma.skuAlias.upsert({
      where: { skuId_aliasType_value: { skuId: id, aliasType: data.aliasType, value: data.value } },
      create: { skuId: id, ...data },
      update: { source: data.source, memo: data.memo },
    });

    return NextResponse.json(alias, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : '별칭 등록에 실패했습니다.';
    console.error('SKU 별칭 등록 실패:', error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
