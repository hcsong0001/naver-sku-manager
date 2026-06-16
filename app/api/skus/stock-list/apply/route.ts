import { NextResponse } from 'next/server';
import { applyStockList, type StockListImportRow } from '@/src/services/sku-stock-list.service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { rows: StockListImportRow[] };
    
    if (!payload.rows || !Array.isArray(payload.rows) || payload.rows.length === 0) {
      return NextResponse.json(
        { error: '적용할 데이터가 없습니다.' },
        { status: 400 },
      );
    }

    const result = await applyStockList(payload.rows);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '재고현황 적용에 실패했습니다.';
    console.error('Stock list apply error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
