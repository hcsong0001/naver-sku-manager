import { NextResponse } from 'next/server';
import { buildSkuAliasTemplateWorkbook } from '@/src/services/sku-alias-import.service';

export const runtime = 'nodejs';

export async function GET() {
  const workbookBuffer = buildSkuAliasTemplateWorkbook();
  const fileName = encodeURIComponent('sku-aliases-template.xlsx');

  return new NextResponse(new Uint8Array(workbookBuffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename*=UTF-8''${fileName}`,
      'Cache-Control': 'no-store',
    },
  });
}
