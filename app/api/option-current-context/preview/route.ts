import { NextResponse } from 'next/server';
import { previewOptionCurrentContextFile } from '@/src/services/option-current-context-preview.service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: '업로드할 파일을 선택하세요.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = previewOptionCurrentContextFile({
      fileName: file.name,
      buffer,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'OPTION 현재 문맥 preview 생성에 실패했습니다.';
    console.error('OPTION 현재 문맥 preview 오류:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
