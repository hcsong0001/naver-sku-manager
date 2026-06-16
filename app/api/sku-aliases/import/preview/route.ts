import { NextResponse } from 'next/server';
import {
  parseSkuAliasWorkbook,
  validateSkuAliasRows,
} from '@/src/services/sku-alias-import.service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: '엑셀 파일을 업로드하세요.' }, { status: 400 });
    }

    const rows = parseSkuAliasWorkbook(Buffer.from(await file.arrayBuffer()));
    const preview = await validateSkuAliasRows(rows);

    return NextResponse.json(preview);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SKU 코드/키워드 검증에 실패했습니다.';
    console.error('SKU 코드/키워드 검증 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
