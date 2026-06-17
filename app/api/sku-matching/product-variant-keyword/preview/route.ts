import { NextResponse } from 'next/server';
import { previewProductVariantKeywordMatching } from '@/src/services/product-variant-keyword.service';

export const runtime = 'nodejs';

function readText(value: FormDataEntryValue | null, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const text = value.trim();
  return text.length > 0 ? text : fallback;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const variantFile = formData.get('variantFile');
    const channelProductNo = readText(formData.get('channelProductNo'), '6597910207');

    if (!(variantFile instanceof File)) {
      return NextResponse.json(
        { error: 'ProductVariantKeyword 엑셀 파일을 업로드해 주세요.' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await variantFile.arrayBuffer());
    const result = await previewProductVariantKeywordMatching(buffer, channelProductNo);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'ProductVariantKeyword preview에 실패했습니다.';
    console.error('ProductVariantKeyword preview 실패:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
