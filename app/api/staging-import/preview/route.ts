import { NextResponse } from 'next/server';
import { previewStagingImport } from '@/src/services/staging-import.service';
import { STAGING_IMPORT_FILE_TYPES, type StagingImportFileType } from '@/src/types/staging-import.types';

export const runtime = 'nodejs';

function isImportFileType(value: string): value is StagingImportFileType {
  return STAGING_IMPORT_FILE_TYPES.includes(value as StagingImportFileType);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileTypeValue = String(formData.get('fileType') ?? '').trim();
    const file = formData.get('file');

    if (!isImportFileType(fileTypeValue)) {
      return NextResponse.json({ error: '지원하지 않는 import 파일 유형입니다.' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: '업로드할 파일을 선택하세요.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await previewStagingImport({
      fileType: fileTypeValue,
      fileName: file.name,
      buffer,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'staging import 미리보기에 실패했습니다.';
    console.error('Staging import preview error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
