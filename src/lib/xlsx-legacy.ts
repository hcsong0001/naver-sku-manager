import * as XLSX from 'xlsx/xlsx.mjs';
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';

const LEGACY_KOREAN_CODEPAGE = 949;
const TEXT_WORKBOOK_PREFIX_BYTES = 512;

XLSX.set_cptable(cpexcel);

export { XLSX };

function countKoreanChars(text: string): number {
  return text.match(/[가-힣]/g)?.length ?? 0;
}

function decodeLegacyKoreanText(buffer: Buffer): string {
  const utf8Text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  const eucKrText = new TextDecoder('euc-kr').decode(buffer);

  return countKoreanChars(eucKrText) > countKoreanChars(utf8Text) ? eucKrText : utf8Text;
}

function isTextWorkbook(buffer: Buffer): boolean {
  const prefix = buffer
    .subarray(0, Math.min(buffer.length, TEXT_WORKBOOK_PREFIX_BYTES))
    .toString('latin1')
    .trimStart()
    .toLowerCase();

  return (
    prefix.startsWith('<table') ||
    prefix.startsWith('<html') ||
    prefix.startsWith('<?xml') ||
    prefix.startsWith('<!doctype html')
  );
}

export function readLegacyKoreanWorkbook(buffer: Buffer): XLSX.WorkBook {
  if (isTextWorkbook(buffer)) {
    return XLSX.read(decodeLegacyKoreanText(buffer), {
      type: 'string',
      raw: false,
      codepage: LEGACY_KOREAN_CODEPAGE,
    });
  }

  return XLSX.read(buffer, {
    type: 'buffer',
    raw: false,
    codepage: LEGACY_KOREAN_CODEPAGE,
  });
}
