import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query) {
      return NextResponse.json([]);
    }

    const normalizedQuery = query.trim().toLowerCase();

    // stagingStockItem에서 검색 대상 필드 매칭
    const stockItems = await prisma.stagingStockItem.findMany({
      where: {
        errorMessage: null,
        OR: [
          { skuCodeCandidate: { contains: normalizedQuery, mode: 'insensitive' } },
          { internalProductCode: { contains: normalizedQuery, mode: 'insensitive' } },
          { optionCode: { contains: normalizedQuery, mode: 'insensitive' } },
          { barcode: { contains: normalizedQuery, mode: 'insensitive' } },
          { productName: { contains: normalizedQuery, mode: 'insensitive' } },
          { modelName: { contains: normalizedQuery, mode: 'insensitive' } },
        ],
      },
      take: 20,
      orderBy: { rowNumber: 'asc' },
    });

    // 결과를 요구하는 포맷으로 가공
    const results = stockItems.map((item) => {
      // skuCode 구성 logic (staging-mapping-preview.service.ts 의 stockSkuCode 와 동일)
      const skuCode = item.skuCodeCandidate || item.internalProductCode || item.optionCode || item.barcode;

      // 가격 파싱
      const parseNumber = (val: unknown): number | null => {
        if (val === null || val === undefined) return null;
        const parsed = Number(String(val).replace(/,/g, '').trim());
        return Number.isFinite(parsed) ? parsed : null;
      };

      return {
        skuCode,
        productName: item.productName,
        modelName: item.modelName,
        barcode: item.barcode,
        stockQty: item.stockQuantity ?? 0,
        cost: parseNumber(item.costPrice),
        salePrice: parseNumber(item.sellingPrice),
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Failed to search staging stock:', error);
    return NextResponse.json({ error: 'ERP SKU 검색에 실패했습니다.' }, { status: 500 });
  }
}
