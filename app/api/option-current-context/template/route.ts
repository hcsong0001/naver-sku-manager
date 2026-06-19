import { NextResponse } from 'next/server';
import { buildOptionCurrentContextTemplateWorkbook } from '@/src/services/option-current-context-preview.service';

export const runtime = 'nodejs';

export async function GET() {
  const workbookBuffer = buildOptionCurrentContextTemplateWorkbook();
  const fileName = encodeURIComponent('option-current-context-template.xlsx');

  return new NextResponse(new Uint8Array(workbookBuffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename*=UTF-8''${fileName}`,
      'Cache-Control': 'no-store',
    },
  });
}
