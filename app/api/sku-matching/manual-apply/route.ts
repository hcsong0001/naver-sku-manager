import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { Prisma } from '@/app/generated/prisma';
import type {
  SkuKeywordManualApplyRequest,
  SkuKeywordManualApplyResponse,
  SkuKeywordManualApplyRow,
  SkuKeywordManualApplyRowResult,
  SkuMappingType,
} from '@/src/types/sku-keyword-matching.types';

export const runtime = 'nodejs';

type ManualApplyState = Omit<SkuKeywordManualApplyResponse, 'appliedCount'> & {
  appliedCount: number;
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

function toPositiveQuantity(value: unknown): number {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 1) return 1;
  return Math.floor(numberValue);
}

function parseRequest(payload: unknown): SkuKeywordManualApplyRequest | null {
  if (!isRecord(payload) || !Array.isArray(payload.rows)) return null;

  const rows: SkuKeywordManualApplyRow[] = payload.rows
    .map((row): SkuKeywordManualApplyRow | null => {
      if (!isRecord(row)) return null;

      const mappingType = toStringCell(row.mappingType);
      const itemId = toStringCell(row.itemId);
      const skus = Array.isArray(row.skus)
        ? row.skus
            .filter(isRecord)
            .map((sku) => ({
              skuId: toStringCell(sku.skuId),
              quantity: toPositiveQuantity(sku.quantity),
            }))
            .filter((sku) => sku.skuId.length > 0)
        : [];

      if (!isMappingType(mappingType) || !itemId || skus.length === 0) return null;

      return {
        mappingType,
        channelProductNo: toStringCell(row.channelProductNo),
        itemId,
        sourceText: toStringCell(row.sourceText),
        matchedKeyword: toStringCell(row.matchedKeyword),
        warningType: toStringCell(row.warningType),
        warningMessage: toStringCell(row.warningMessage),
        memo: toStringCell(row.memo),
        skus,
      };
    })
    .filter((row): row is SkuKeywordManualApplyRow => row !== null);

  return rows.length > 0 ? { rows } : null;
}

function createEmptyState(): ManualApplyState {
  return {
    appliedCount: 0,
    createdCount: 0,
    updatedCount: 0,
    skippedCount: 0,
    productCount: 0,
    optionCount: 0,
    additionalCount: 0,
    aliasCount: 0,
    results: [],
  };
}

function addResult(state: ManualApplyState, result: SkuKeywordManualApplyRowResult): void {
  state.results.push(result);
  if (result.action === 'CREATED') {
    state.createdCount += 1;
    state.appliedCount += 1;
  } else if (result.action === 'UPDATED') {
    state.updatedCount += 1;
    state.appliedCount += 1;
  } else {
    state.skippedCount += 1;
  }

  if (result.action !== 'SKIPPED') {
    if (result.mappingType === 'PRODUCT') state.productCount += 1;
    if (result.mappingType === 'OPTION') state.optionCount += 1;
    if (result.mappingType === 'ADDITIONAL') state.additionalCount += 1;
  }
}

function buildManualMemo(row: SkuKeywordManualApplyRow): string {
  return [
    '키워드 매칭 화면에서 수동 확정',
    `mappingType=${row.mappingType}`,
    `channelProductNo=${row.channelProductNo || '-'}`,
    `itemId=${row.itemId}`,
    `warningType=${row.warningType || '-'}`,
    `matchedKeyword=${row.matchedKeyword || '-'}`,
    `sourceText=${row.sourceText || '-'}`,
    `warningMessage=${row.warningMessage || '-'}`,
    `memo=${row.memo || '-'}`,
  ].join(' / ');
}

function buildManualAliasValue(row: SkuKeywordManualApplyRow): string {
  return `${row.mappingType}:${row.itemId}`;
}

async function targetExists(
  tx: Prisma.TransactionClient,
  mappingType: SkuMappingType,
  itemId: string,
): Promise<boolean> {
  if (mappingType === 'PRODUCT') {
    const product = await tx.naverProduct.findUnique({ where: { id: itemId }, select: { id: true } });
    return product !== null;
  }

  if (mappingType === 'OPTION') {
    const option = await tx.naverProductOption.findUnique({ where: { id: itemId }, select: { id: true } });
    return option !== null;
  }

  const additional = await tx.naverProductAdditional.findUnique({ where: { id: itemId }, select: { id: true } });
  return additional !== null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const parsed = parseRequest(payload);

    if (!parsed) {
      return NextResponse.json(
        { error: '수동 확정할 warning row와 SKU 선택값이 없습니다.' },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const state = createEmptyState();

      for (const row of parsed.rows) {
        const exists = await targetExists(tx, row.mappingType, row.itemId);
        const uniqueSkuSelections = Array.from(
          new Map(row.skus.map((sku) => [sku.skuId, sku])).values(),
        );

        for (const selectedSku of uniqueSkuSelections) {
          const sku = await tx.sku.findUnique({
            where: { id: selectedSku.skuId },
            select: { id: true, skuCode: true },
          });

          if (!sku) {
            addResult(state, {
              mappingType: row.mappingType,
              itemId: row.itemId,
              skuId: selectedSku.skuId,
              skuCode: '',
              quantity: selectedSku.quantity,
              action: 'SKIPPED',
              message: 'SKU를 찾을 수 없어 저장하지 않았습니다.',
            });
            continue;
          }

          if (!exists) {
            addResult(state, {
              mappingType: row.mappingType,
              itemId: row.itemId,
              skuId: sku.id,
              skuCode: sku.skuCode,
              quantity: selectedSku.quantity,
              action: 'SKIPPED',
              message: '매핑 대상 상품/옵션을 찾을 수 없어 저장하지 않았습니다.',
            });
            continue;
          }

          let action: SkuKeywordManualApplyRowResult['action'] = 'CREATED';

          if (row.mappingType === 'PRODUCT') {
            const existing = await tx.naverProductSku.findUnique({
              where: { naverProductId_skuId: { naverProductId: row.itemId, skuId: sku.id } },
              select: { quantity: true },
            });
            action = existing ? (existing.quantity === selectedSku.quantity ? 'SKIPPED' : 'UPDATED') : 'CREATED';
            if (action !== 'SKIPPED') {
              await tx.naverProductSku.upsert({
                where: { naverProductId_skuId: { naverProductId: row.itemId, skuId: sku.id } },
                create: { naverProductId: row.itemId, skuId: sku.id, quantity: selectedSku.quantity },
                update: { quantity: selectedSku.quantity },
              });
            }
          } else if (row.mappingType === 'OPTION') {
            const existing = await tx.naverProductOptionSku.findUnique({
              where: { optionId_skuId: { optionId: row.itemId, skuId: sku.id } },
              select: { quantity: true },
            });
            action = existing ? (existing.quantity === selectedSku.quantity ? 'SKIPPED' : 'UPDATED') : 'CREATED';
            if (action !== 'SKIPPED') {
              await tx.naverProductOptionSku.upsert({
                where: { optionId_skuId: { optionId: row.itemId, skuId: sku.id } },
                create: { optionId: row.itemId, skuId: sku.id, quantity: selectedSku.quantity },
                update: { quantity: selectedSku.quantity },
              });
            }
          } else {
            const existing = await tx.naverProductAdditionalSku.findUnique({
              where: { additionalId_skuId: { additionalId: row.itemId, skuId: sku.id } },
              select: { quantity: true },
            });
            action = existing ? (existing.quantity === selectedSku.quantity ? 'SKIPPED' : 'UPDATED') : 'CREATED';
            if (action !== 'SKIPPED') {
              await tx.naverProductAdditionalSku.upsert({
                where: { additionalId_skuId: { additionalId: row.itemId, skuId: sku.id } },
                create: { additionalId: row.itemId, skuId: sku.id, quantity: selectedSku.quantity },
                update: { quantity: selectedSku.quantity },
              });
            }
          }

          const manualAliasValue = buildManualAliasValue(row);

          await tx.skuAlias.upsert({
            where: {
              skuId_aliasType_value: {
                skuId: sku.id,
                aliasType: 'MATCH_KEYWORD',
                value: manualAliasValue,
              },
            },
            create: {
              skuId: sku.id,
              aliasType: 'MATCH_KEYWORD',
              value: manualAliasValue,
              source: '키워드 수동확정',
              memo: buildManualMemo(row),
            },
            update: {
              source: '키워드 수동확정',
              memo: buildManualMemo(row),
            },
          });
          state.aliasCount += 1;

          addResult(state, {
            mappingType: row.mappingType,
            itemId: row.itemId,
            skuId: sku.id,
            skuCode: sku.skuCode,
            quantity: selectedSku.quantity,
            action,
            message:
              action === 'CREATED'
                ? '수동 매핑을 저장했습니다.'
                : action === 'UPDATED'
                  ? '기존 수동 매핑 수량을 업데이트했습니다.'
                  : '이미 같은 SKU와 수량으로 매핑되어 있습니다.',
          });
        }
      }

      return state;
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '수동 확정 저장에 실패했습니다.';
    console.error('키워드 수동 확정 저장 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
