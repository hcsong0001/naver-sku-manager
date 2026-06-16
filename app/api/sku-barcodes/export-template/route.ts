import { NextResponse } from 'next/server';
import { buildSkuBarcodeTemplateWorkbook } from '@/src/services/sku-barcode-import.service';

export const runtime = 'nodejs';

export async function GET() {
  const workbookBuffer = buildSkuBarcodeTemplateWorkbook();
  const fileName = encodeURIComponent('sku-barcodes-template.xlsx');

  return new NextResponse(new Uint8Array(workbookBuffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename*=UTF-8''${fileName}`,
      'Cache-Control': 'no-store',
    },
  });
}
