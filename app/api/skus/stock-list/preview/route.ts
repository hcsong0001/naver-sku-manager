import { NextResponse } from 'next/server';
import { parseStockListWorkbook, previewStockList } from '@/src/services/sku-stock-list.service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const stockFile = formData.get('stockFile');

    if (!(stockFile instanceof File)) {
      return NextResponse.json(
        { error: '재고현황 XLS 파일을 업로드하세요.' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await stockFile.arrayBuffer());
    const parsedRows = await parseStockListWorkbook(buffer);
    const result = await previewStockList(parsedRows);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '재고현황 미리보기에 실패했습니다.';
    console.error('Stock list preview error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
