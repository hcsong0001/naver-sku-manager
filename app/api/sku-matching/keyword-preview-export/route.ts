import { NextResponse } from 'next/server';
import {
  createKeywordPreviewWorkbookBuffer,
  previewKeywordMatching,
} from '@/src/services/sku-keyword-matching.service';

export const runtime = 'nodejs';

async function fileToBuffer(file: File): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer());
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const erpFile = formData.get('erpFile');
    const csvFile = formData.get('csvFile');
    const stockFile = formData.get('stockFile');

    if (!(erpFile instanceof File)) {
      return NextResponse.json(
        { error: 'ERP 미매핑 엑셀 파일을 업로드하세요.' },
        { status: 400 },
      );
    }

    if (!(csvFile instanceof File)) {
      return NextResponse.json(
        { error: '상품관리 CSV 파일을 업로드하세요.' },
        { status: 400 },
      );
    }

    if (!(stockFile instanceof File)) {
      return NextResponse.json(
        { error: '재고현황 XLS 파일을 업로드하세요.' },
        { status: 400 },
      );
    }

    const [erpBuffer, csvBuffer, stockBuffer] = await Promise.all([
      fileToBuffer(erpFile),
      fileToBuffer(csvFile),
      fileToBuffer(stockFile),
    ]);

    const preview = await previewKeywordMatching(erpBuffer, csvBuffer, stockBuffer);
    const workbookBuffer = createKeywordPreviewWorkbookBuffer(preview);

    return new NextResponse(new Uint8Array(workbookBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="sku-keyword-preview.xlsx"',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '키워드 매칭 preview export에 실패했습니다.';
    console.error('키워드 매칭 preview export 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
