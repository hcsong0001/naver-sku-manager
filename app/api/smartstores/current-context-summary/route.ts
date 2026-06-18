import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type CurrentContextRow = {
  smartstoreId: string;
  name: string;
  sellerId: string;
  naverAccountId: string | null;
  naverChannelId: string | null;
  productTotal: number;
  productCurrentPriceReady: number;
  productCurrentStockReady: number;
  productCurrentBothReady: number;
  optionTotal: number;
  optionCurrentPriceReady: number;
  optionCurrentStockReady: number;
  optionCurrentBothReady: number;
  additionalTotal: number;
  additionalCurrentPriceReady: number;
  additionalCurrentStockReady: number;
  additionalCurrentBothReady: number;
  latestProductCurrentStateSyncedAt: Date | null;
  latestOptionCurrentStateSyncedAt: Date | null;
  latestAdditionalCurrentStateSyncedAt: Date | null;
};

function toIsoString(value: Date | null): string | null {
  return value?.toISOString() ?? null;
}

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<CurrentContextRow[]>`
      SELECT
        s."id" AS "smartstoreId",
        s."name",
        s."sellerId",
        s."naverAccountId",
        s."naverChannelId",
        COALESCE(product_state."total", 0)::integer AS "productTotal",
        COALESCE(product_state."priceReady", 0)::integer AS "productCurrentPriceReady",
        COALESCE(product_state."stockReady", 0)::integer AS "productCurrentStockReady",
        COALESCE(product_state."bothReady", 0)::integer AS "productCurrentBothReady",
        COALESCE(option_state."total", 0)::integer AS "optionTotal",
        COALESCE(option_state."priceReady", 0)::integer AS "optionCurrentPriceReady",
        COALESCE(option_state."stockReady", 0)::integer AS "optionCurrentStockReady",
        COALESCE(option_state."bothReady", 0)::integer AS "optionCurrentBothReady",
        COALESCE(additional_state."total", 0)::integer AS "additionalTotal",
        COALESCE(additional_state."priceReady", 0)::integer AS "additionalCurrentPriceReady",
        COALESCE(additional_state."stockReady", 0)::integer AS "additionalCurrentStockReady",
        COALESCE(additional_state."bothReady", 0)::integer AS "additionalCurrentBothReady",
        product_state."latestSyncedAt" AS "latestProductCurrentStateSyncedAt",
        option_state."latestSyncedAt" AS "latestOptionCurrentStateSyncedAt",
        additional_state."latestSyncedAt" AS "latestAdditionalCurrentStateSyncedAt"
      FROM "Smartstore" s
      LEFT JOIN (
        SELECT
          p."smartstoreId",
          COUNT(*) AS "total",
          COUNT(*) FILTER (WHERE p."currentSalePrice" IS NOT NULL) AS "priceReady",
          COUNT(*) FILTER (WHERE p."currentStockQuantity" IS NOT NULL) AS "stockReady",
          COUNT(*) FILTER (
            WHERE p."currentSalePrice" IS NOT NULL
              AND p."currentStockQuantity" IS NOT NULL
          ) AS "bothReady",
          MAX(p."currentStateSyncedAt") AS "latestSyncedAt"
        FROM "NaverProduct" p
        GROUP BY p."smartstoreId"
      ) product_state ON product_state."smartstoreId" = s."id"
      LEFT JOIN (
        SELECT
          p."smartstoreId",
          COUNT(*) AS "total",
          COUNT(*) FILTER (WHERE o."currentSalePrice" IS NOT NULL) AS "priceReady",
          COUNT(*) FILTER (WHERE o."currentStockQuantity" IS NOT NULL) AS "stockReady",
          COUNT(*) FILTER (
            WHERE o."currentSalePrice" IS NOT NULL
              AND o."currentStockQuantity" IS NOT NULL
          ) AS "bothReady",
          MAX(o."currentStateSyncedAt") AS "latestSyncedAt"
        FROM "NaverProductOption" o
        INNER JOIN "NaverProduct" p ON p."id" = o."naverProductId"
        GROUP BY p."smartstoreId"
      ) option_state ON option_state."smartstoreId" = s."id"
      LEFT JOIN (
        SELECT
          p."smartstoreId",
          COUNT(*) AS "total",
          COUNT(*) FILTER (WHERE a."price" IS NOT NULL) AS "priceReady",
          COUNT(*) FILTER (WHERE a."stockQuantity" IS NOT NULL) AS "stockReady",
          COUNT(*) FILTER (
            WHERE a."price" IS NOT NULL
              AND a."stockQuantity" IS NOT NULL
          ) AS "bothReady",
          MAX(a."currentStateSyncedAt") AS "latestSyncedAt"
        FROM "NaverProductAdditional" a
        INNER JOIN "NaverProduct" p ON p."id" = a."naverProductId"
        GROUP BY p."smartstoreId"
      ) additional_state ON additional_state."smartstoreId" = s."id"
      ORDER BY s."name" ASC
    `;

    const stores = rows.map((row) => ({
      ...row,
      hasNaverChannelId: Boolean(row.naverChannelId?.trim()),
      latestProductCurrentStateSyncedAt: toIsoString(row.latestProductCurrentStateSyncedAt),
      latestOptionCurrentStateSyncedAt: toIsoString(row.latestOptionCurrentStateSyncedAt),
      latestAdditionalCurrentStateSyncedAt: toIsoString(
        row.latestAdditionalCurrentStateSyncedAt,
      ),
    }));

    const summary = stores.reduce(
      (result, store) => ({
        storeTotal: result.storeTotal + 1,
        storesWithNaverChannelId:
          result.storesWithNaverChannelId + (store.hasNaverChannelId ? 1 : 0),
        storesMissingNaverChannelId:
          result.storesMissingNaverChannelId + (store.hasNaverChannelId ? 0 : 1),
        productTotal: result.productTotal + store.productTotal,
        productCurrentBothReady:
          result.productCurrentBothReady + store.productCurrentBothReady,
        optionTotal: result.optionTotal + store.optionTotal,
        optionCurrentBothReady:
          result.optionCurrentBothReady + store.optionCurrentBothReady,
        additionalTotal: result.additionalTotal + store.additionalTotal,
        additionalCurrentBothReady:
          result.additionalCurrentBothReady + store.additionalCurrentBothReady,
      }),
      {
        storeTotal: 0,
        storesWithNaverChannelId: 0,
        storesMissingNaverChannelId: 0,
        productTotal: 0,
        productCurrentBothReady: 0,
        optionTotal: 0,
        optionCurrentBothReady: 0,
        additionalTotal: 0,
        additionalCurrentBothReady: 0,
      },
    );

    return NextResponse.json({ summary, stores });
  } catch (error) {
    console.error('현재 스마트스토어 문맥 준비 상태 조회 실패:', error);
    return NextResponse.json(
      { error: '현재 스마트스토어 문맥 준비 상태를 조회하지 못했습니다.' },
      { status: 500 },
    );
  }
}
