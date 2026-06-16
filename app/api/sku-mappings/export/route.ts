import { NextResponse } from 'next/server';
import {
  buildSkuMappingWorkbook,
  getUnmappedSkuMappingRows,
} from '@/src/services/sku-mapping.service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const rows = await getUnmappedSkuMappingRows();
    const workbookBuffer = buildSkuMappingWorkbook(rows);
    const fileName = encodeURIComponent('sku-mappings.xlsx');

    return new NextResponse(new Uint8Array(workbookBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename*=UTF-8''${fileName}`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('SKU 매핑 엑셀 다운로드 실패:', error);
    return NextResponse.json(
      { error: 'SKU 매핑 엑셀 다운로드에 실패했습니다.' },
      { status: 500 }
    );
  }
}
