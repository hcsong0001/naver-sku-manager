import { NextResponse } from 'next/server';
import { previewKeywordMatching } from '@/src/services/sku-keyword-matching.service';

export const runtime = 'nodejs';

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
      erpFile.arrayBuffer().then((ab) => Buffer.from(ab)),
      csvFile.arrayBuffer().then((ab) => Buffer.from(ab)),
      stockFile.arrayBuffer().then((ab) => Buffer.from(ab)),
    ]);

    const result = await previewKeywordMatching(erpBuffer, csvBuffer, stockBuffer);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : '키워드 매칭 검증에 실패했습니다.';
    console.error('키워드 매칭 preview 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
