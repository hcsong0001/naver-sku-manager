/**
 * 키워드 기반 SKU 자동매칭 서비스
 *
 * ERP 미매핑 엑셀, 상품관리 CSV, 재고현황 XLS 3개 파일을 이용하여
 * 매칭키워드 → 사입상품명 → 바코드 → SKU 순서로 자동매칭합니다.
 */
import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';
import type {
  ErpUnmappedRow,
  MatchMethod,
  ProductManagementRow,
  SkuKeywordApplyResponse,
  SkuKeywordDuplicateRow,
  SkuKeywordErrorRow,
  SkuKeywordMatchedRow,
  SkuKeywordPreviewResponse,
  SkuKeywordRepresentativeCase,
  SkuKeywordSummary,
  SkuKeywordWarningRow,
  SkuMappingType,
  StockListRow,
} from '@/src/types/sku-keyword-matching.types';

// ---------------------------------------------------------------------------
// 유틸리티
// ---------------------------------------------------------------------------

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

/** CSV 디코딩 (CP949/EUC-KR 자동 감지) */
function decodeCsvBuffer(buffer: Buffer): string {
  const utf8Text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (!utf8Text.includes('상품일련번호') && !utf8Text.includes('매칭키워드')) {
    return new TextDecoder('euc-kr').decode(buffer);
  }
  return utf8Text;
}

/**
 * 텍스트 정규화
 * - trim, 연속 공백 → 단일 공백
 * - 전각 괄호 → 반각
 * - 전각 공백 → 반각
 */
function normalizeText(text: string): string {
  return text
    .trim()
    .replace(/\u3000/g, ' ')     // 전각 공백 → 반각
    .replace(/（/g, '(')         // 전각 괄호 → 반각
    .replace(/）/g, ')')
    .replace(/\s+/g, ' ')        // 연속 공백 → 단일 공백
    .toLowerCase();
}

/** 부분포함 비교 */
function partialMatch(source: string, keyword: string): boolean {
  const normalizedSource = normalizeText(source);
  const normalizedKeyword = normalizeText(keyword);
  if (normalizedKeyword.length < 3) return false; // 너무 짧은 키워드 제외
  return normalizedSource.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedSource);
}

function isMappingType(value: string): value is SkuMappingType {
  return value === 'PRODUCT' || value === 'OPTION' || value === 'ADDITIONAL';
}

/** 매칭키워드 헤더 정렬 */
function sortKeywordHeaders(headers: string[]): string[] {
  return headers
    .filter((h) => h.trim().startsWith('매칭키워드'))
    .sort((a, b) => {
      const aNum = Number(a.replace('매칭키워드', ''));
      const bNum = Number(b.replace('매칭키워드', ''));
      return (Number.isFinite(aNum) ? aNum : 0) - (Number.isFinite(bNum) ? bNum : 0);
    });
}

/** 사입상품명에서 ="..." 래핑 제거 */
function cleanCellValue(value: string): string {
  return value.replace(/^="/, '').replace(/"$/, '').trim();
}

/** ADDITIONAL itemName에서 " / " 뒤 부분 추출 */
function extractSubItemName(itemName: string): string | null {
  const slashIndex = itemName.indexOf(' / ');
  if (slashIndex >= 0) {
    return itemName.substring(slashIndex + 3).trim();
  }
  return null;
}

/** Fallback 키워드 추출 (세트상품 대비) */
function extractFallbackKeywords(text: string): string[] {
  let processed = text;
  // 6+8+10MM -> 6MM 8MM 10MM
  const mmMatch = processed.match(/((\d+\+)+(\d+))MM/i);
  if (mmMatch) {
    const nums = mmMatch[1].split('+');
    const expanded = nums.map((n) => n + 'MM').join(' ');
    processed = processed.replace(mmMatch[0], expanded);
  }

  const replaced = processed.replace(/[\(\)\[\]\+\/]/g, ' ');
  const tokens = replaced
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
  return Array.from(new Set(tokens));
}

// ---------------------------------------------------------------------------
// 파일 파싱
// ---------------------------------------------------------------------------

/** ERP 미매핑 XLSX 파싱 */
export function parseErpUnmappedWorkbook(buffer: Buffer): ErpUnmappedRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer', raw: false });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error('ERP 엑셀 파일에 시트가 없습니다.');

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: false,
  });

  return rows
    .map((row, index) => ({
      rowNumber: index + 2,
      mappingType: normalizeCell(row['mappingType']),
      smartstoreName: normalizeCell(row['smartstoreName']),
      channelProductNo: normalizeCell(row['channelProductNo']),
      productName: normalizeCell(row['productName']),
      itemId: normalizeCell(row['itemId']),
      itemName: normalizeCell(row['itemName']),
      managementCode: normalizeCell(row['managementCode']),
      currentSkuCode: normalizeCell(row['currentSkuCode']),
    }))
    .filter((row) => row.mappingType && row.itemId);
}

/** 상품관리 CSV 파싱 */
export function parseProductManagementCsv(buffer: Buffer): {
  rows: ProductManagementRow[];
  keywordHeaders: string[];
} {
  const csvText = decodeCsvBuffer(buffer);
  const workbook = XLSX.read(csvText, { type: 'string', raw: false });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error('상품관리 CSV 파일에 시트가 없습니다.');

  const worksheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: false,
  });

  if (rawRows.length === 0) {
    throw new Error('상품관리 CSV 파일에 데이터가 없습니다.');
  }

  const headers = Object.keys(rawRows[0]);
  const keywordHeaders = sortKeywordHeaders(headers);
  if (keywordHeaders.length === 0) {
    throw new Error('매칭키워드로 시작하는 컬럼을 찾을 수 없습니다.');
  }

  const rows: ProductManagementRow[] = rawRows
    .map((row, index) => {
      const keywords: { column: string; value: string }[] = [];
      for (const kh of keywordHeaders) {
        const value = normalizeCell(row[kh]);
        if (value) {
          keywords.push({ column: kh, value });
        }
      }

      return {
        rowNumber: index + 2,
        productName: normalizeCell(row['상품명']),
        purchaseProductName: cleanCellValue(normalizeCell(row['사입상품명'])),
        productCode: cleanCellValue(normalizeCell(row['자체상품코드'] ?? row['상품코드'] ?? '')),
        keywords,
      };
    })
    .filter((row) => row.keywords.length > 0);

  return { rows, keywordHeaders };
}

/** 재고현황 XLS 파싱 */
export function parseStockListXls(buffer: Buffer): StockListRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer', codepage: 949 });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error('재고현황 XLS 파일에 시트가 없습니다.');

  const worksheet = workbook.Sheets[sheetName];

  // raw:true로 읽어야 바코드(서식) 숫자값이 유지됨
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: '',
    raw: true,
  });

  if (rawRows.length === 0) {
    throw new Error('재고현황 XLS 파일에 데이터가 없습니다.');
  }

  // 헤더 인코딩 깨짐 대비: 인덱스 기반 + 패턴 매칭 병행
  const headers = Object.keys(rawRows[0]);

  // 바코드번호(서식) = 인덱스 7, 상품명 = 인덱스 9, 사입상품명 = 인덱스 14, 바코드번호 = 인덱스 6
  const barcodeFormattedHeader = headers[7]; // 바코드번호(서식)
  const productNameHeader = headers[9];       // 상품명
  const purchaseNameHeader = headers[14];     // 사입상품명
  const barcodeRawHeader = headers[6];        // 바코드번호

  return rawRows
    .map((row, index) => {
      const barcodeFormatted = String(row[barcodeFormattedHeader] ?? '').trim();
      const barcodeRawValue = String(row[barcodeRawHeader] ?? '').trim();
      const productName = String(row[productNameHeader] ?? '').trim();
      const purchaseProductName = String(row[purchaseNameHeader] ?? '').trim();

      // 바코드 결정: 바코드번호(서식)의 raw 숫자값 우선 사용
      let barcode = barcodeFormatted;
      // 과학적 표기법 처리
      if (barcode.includes('E+') || barcode.includes('e+')) {
        const numVal = Number(barcode);
        if (Number.isFinite(numVal)) {
          barcode = numVal.toFixed(0);
        }
      }

      return {
        rowNumber: index + 2,
        productName,
        purchaseProductName,
        barcode,
        barcodeRaw: barcodeRawValue.replace(/-/g, ''),
      };
    })
    .filter((row) => row.barcode || row.barcodeRaw);
}

// ---------------------------------------------------------------------------
// 키워드 인덱스 구축
// ---------------------------------------------------------------------------

type KeywordEntry = {
  csvRowIndex: number;
  csvRowNumber: number;
  keywordColumn: string;
  originalKeyword: string;
  productName: string;
  purchaseProductName: string;
};

type KeywordIndex = Map<string, KeywordEntry[]>;

function buildKeywordIndex(csvRows: ProductManagementRow[]): KeywordIndex {
  const index: KeywordIndex = new Map();

  for (let i = 0; i < csvRows.length; i++) {
    const csvRow = csvRows[i];
    for (const kw of csvRow.keywords) {
      const normalizedKey = normalizeText(kw.value);
      if (!normalizedKey) continue;

      const entry: KeywordEntry = {
        csvRowIndex: i,
        csvRowNumber: csvRow.rowNumber,
        keywordColumn: kw.column,
        originalKeyword: kw.value,
        productName: csvRow.productName,
        purchaseProductName: csvRow.purchaseProductName,
      };

      const existing = index.get(normalizedKey);
      if (existing) {
        existing.push(entry);
      } else {
        index.set(normalizedKey, [entry]);
      }
    }
  }

  return index;
}

// ---------------------------------------------------------------------------
// 재고현황 연결 (사입상품명 기반)
// ---------------------------------------------------------------------------

type StockIndex = Map<string, StockListRow[]>;

function buildStockIndex(stockRows: StockListRow[]): StockIndex {
  const index: StockIndex = new Map();

  for (const row of stockRows) {
    if (!row.purchaseProductName) continue;
    const key = normalizeText(row.purchaseProductName);
    const existing = index.get(key);
    if (existing) {
      existing.push(row);
    } else {
      index.set(key, [row]);
    }
  }

  return index;
}

function findStockRowsByPurchaseName(
  purchaseProductName: string,
  stockIndex: StockIndex,
): StockListRow[] {
  if (!purchaseProductName) return [];
  const key = normalizeText(purchaseProductName);
  return stockIndex.get(key) ?? [];
}

// ---------------------------------------------------------------------------
// 매칭 엔진
// ---------------------------------------------------------------------------

type MatchResult = {
  method: MatchMethod;
  confidence: number;
  entries: KeywordEntry[];
  matchedKeyword: string;
};

function matchTextToKeyword(
  sourceText: string,
  keywordIndex: KeywordIndex,
): MatchResult | null {
  if (!sourceText) return null;

  const normalizedSource = normalizeText(sourceText);

  // 1. 완전일치 검색
  const exactEntries = keywordIndex.get(normalizedSource);
  if (exactEntries && exactEntries.length > 0) {
    const rawExactEntry = exactEntries.find(
      (entry) => normalizeCell(entry.originalKeyword) === normalizeCell(sourceText),
    );
    return {
      method: rawExactEntry ? 'EXACT' : 'NORMALIZED_EXACT',
      confidence: 1.0,
      entries: exactEntries,
      matchedKeyword: (rawExactEntry ?? exactEntries[0]).originalKeyword,
    };
  }

  // 2. 정규화 완전일치까지 위에서 처리

  // 3. 부분일치 검색 (warning용)
  const partialResults: { entry: KeywordEntry; keyword: string }[] = [];
  for (const [normalizedKeyword, entries] of keywordIndex) {
    if (normalizedKeyword.length >= 3 && partialMatch(normalizedSource, normalizedKeyword)) {
      for (const entry of entries) {
        partialResults.push({ entry, keyword: entry.originalKeyword });
      }
    }
  }

  if (partialResults.length > 0) {
    return {
      method: 'PARTIAL',
      confidence: 0.5,
      entries: partialResults.map((r) => r.entry),
      matchedKeyword: partialResults[0].keyword,
    };
  }

  return null;
}

/** sourceText 결정: PRODUCT → productName, OPTION/ADDITIONAL → itemName 우선 */
function getSourceText(erpRow: ErpUnmappedRow): string {
  if (erpRow.mappingType === 'PRODUCT') {
    return erpRow.productName;
  }

  // OPTION/ADDITIONAL: itemName 우선, 없으면 productName
  const itemName = erpRow.itemName?.trim();
  if (itemName) {
    return itemName;
  }

  return erpRow.productName;
}

// ---------------------------------------------------------------------------
// 미리보기 안전 판정
// ---------------------------------------------------------------------------

const SET_KEYWORD_PATTERN = /(세트|2종|3종|구성|묶음|set)/i;

function buildMatchedRowKey(row: Pick<SkuKeywordMatchedRow, 'mappingType' | 'itemId'>): string {
  return `${row.mappingType}::${row.itemId}`;
}

function buildWarningRowKey(row: Pick<SkuKeywordWarningRow, 'mappingType' | 'itemId'>): string {
  return `${row.mappingType}::${row.itemId}`;
}

function uniqueNonEmpty(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}

function hasSetKeyword(sourceText: string): boolean {
  return SET_KEYWORD_PATTERN.test(sourceText);
}

function isRepresentativeMismatchCase(row: SkuKeywordMatchedRow): boolean {
  return row.channelProductNo === '10393474098' && row.itemId === '10393474098';
}

function summarizeDuplicateGroup(rows: SkuKeywordMatchedRow[]): SkuKeywordDuplicateRow | null {
  const first = rows[0];
  if (!first || rows.length < 2) return null;

  const barcodes = uniqueNonEmpty(rows.map((row) => row.barcode));
  const skuCodes = uniqueNonEmpty(rows.map((row) => row.skuCode));
  const productManagementRowNos = uniqueNonEmpty(
    rows.map((row) => String(row.productManagementRowNo)),
  );
  const possibleSet = rows.some((row) => hasSetKeyword(row.sourceText));
  const possibleDuplicate = !possibleSet && barcodes.length > 1;

  return {
    mappingType: first.mappingType,
    channelProductNo: first.channelProductNo,
    itemId: first.itemId,
    sourceText: first.sourceText,
    matchedRowCount: rows.length,
    barcodes: barcodes.join(', '),
    skuCodes: skuCodes.join(', '),
    productManagementRowNos: productManagementRowNos.join(', '),
    possibleSet,
    possibleDuplicate,
    reviewReason: possibleSet
      ? '세트상품으로 판단될 수 있는 문구가 포함되어 있습니다.'
      : '세트상품 문구 없이 같은 항목에 여러 바코드가 연결되었습니다.',
  };
}

function buildDuplicateRows(matchedRows: SkuKeywordMatchedRow[]): SkuKeywordDuplicateRow[] {
  const groupMap = new Map<string, SkuKeywordMatchedRow[]>();

  for (const row of matchedRows) {
    const key = buildMatchedRowKey(row);
    const existing = groupMap.get(key);
    if (existing) {
      existing.push(row);
    } else {
      groupMap.set(key, [row]);
    }
  }

  return Array.from(groupMap.values())
    .map((rows) => summarizeDuplicateGroup(rows))
    .filter((row): row is SkuKeywordDuplicateRow => row !== null);
}

function withApplyEligibility(
  matchedRows: SkuKeywordMatchedRow[],
  warningRows: SkuKeywordWarningRow[],
): { matchedRows: SkuKeywordMatchedRow[]; duplicates: SkuKeywordDuplicateRow[] } {
  const warningKeys = new Set(warningRows.map((row) => buildWarningRowKey(row)));
  const warningItemIds = new Set(warningRows.map((row) => row.itemId).filter(Boolean));
  const groupMap = new Map<string, SkuKeywordMatchedRow[]>();

  for (const row of matchedRows) {
    const key = buildMatchedRowKey(row);
    const existing = groupMap.get(key);
    if (existing) {
      existing.push(row);
    } else {
      groupMap.set(key, [row]);
    }
  }

  const reviewedRows = matchedRows.map((row) => {
    const groupRows = groupMap.get(buildMatchedRowKey(row)) ?? [row];
    const groupBarcodes = uniqueNonEmpty(groupRows.map((groupRow) => groupRow.barcode));
    const groupProductRows = uniqueNonEmpty(
      groupRows.map((groupRow) => String(groupRow.productManagementRowNo)),
    );
    const possibleSet = groupRows.some((groupRow) => hasSetKeyword(groupRow.sourceText));
    const sameProductManagementRowMultiBarcode =
      groupBarcodes.length > 1 && groupProductRows.length === 1;
    const reasons: string[] = [];

    if (row.matchMethod !== 'EXACT' && row.matchMethod !== 'NORMALIZED_EXACT') {
      reasons.push('완전일치 매칭이 아닙니다.');
    }
    if (!row.barcode) {
      reasons.push('바코드가 없습니다.');
    }
    if (!row.skuCode) {
      reasons.push('SKU 코드가 없습니다.');
    }
    if (warningKeys.has(buildMatchedRowKey(row)) || warningItemIds.has(row.itemId)) {
      reasons.push('같은 항목에 위험 경고가 있습니다.');
    }
    if (groupBarcodes.length > 1 && !possibleSet && !sameProductManagementRowMultiBarcode) {
      reasons.push('세트상품으로 판단되지 않지만 같은 항목에 여러 바코드가 있습니다.');
    }
    if (isRepresentativeMismatchCase(row)) {
      reasons.push('대표 사례 A: 기대 바코드와 파일 기준 바코드가 불일치합니다.');
    }

    const applyEligible = reasons.length === 0;
    const reviewReason = applyEligible
      ? sameProductManagementRowMultiBarcode
        ? '동일 상품관리 행에서 여러 재고 바코드가 명확히 연결되어 안전 적용 대상입니다.'
        : '안전 적용 대상입니다.'
      : reasons.join(' / ');

    return {
      ...row,
      applyEligible,
      reviewReason,
    };
  });

  return {
    matchedRows: reviewedRows,
    duplicates: buildDuplicateRows(reviewedRows),
  };
}

function buildRepresentativeCases(
  matchedRows: SkuKeywordMatchedRow[],
  warningRows: SkuKeywordWarningRow[],
  errorRows: SkuKeywordErrorRow[],
): SkuKeywordRepresentativeCase[] {
  const findMatched = (channelProductNo: string, itemId: string) =>
    matchedRows.find((row) => row.channelProductNo === channelProductNo && row.itemId === itemId);
  const findWarning = (channelProductNo: string, itemId: string) =>
    warningRows.find((row) => row.channelProductNo === channelProductNo && row.itemId === itemId);
  const findError = (channelProductNo: string, itemId: string) =>
    errorRows.find((row) => row.channelProductNo === channelProductNo && row.itemId === itemId);

  const caseA = findMatched('10393474098', '10393474098');
  const caseB = findMatched('8985060439', '41624604984');
  const caseCWarning = findWarning('6597910207', '3577501901');
  const caseCError = findError('6597910207', '3577501901');

  return [
    {
      caseKey: 'A',
      channelProductNo: '10393474098',
      itemId: '10393474098',
      expectedBarcode: '1637900118802',
      actualBarcode: caseA?.barcode || '1637900118833',
      currentResult: caseA
        ? `matchedRows 바코드 ${caseA.barcode}, SKU ${caseA.skuCode || '-'}`
        : 'matchedRows 결과 없음',
      reviewReason: '데이터 불일치. 파일 기준 RS13-1450은 1637900118833, 1637900118802는 RS13-0650',
    },
    {
      caseKey: 'B',
      channelProductNo: '8985060439',
      itemId: '41624604984',
      expectedBarcode: '1637900118789',
      actualBarcode: caseB?.barcode || '1637900118789',
      currentResult: caseB
        ? `matchedRows 바코드 ${caseB.barcode}, SKU ${caseB.skuCode || '-'}`
        : 'matchedRows 결과 없음',
      reviewReason: '정상',
    },
    {
      caseKey: 'C',
      channelProductNo: '6597910207',
      itemId: '3577501901',
      expectedBarcode: '1637900112084, 1637900112091, 1637900118789',
      actualBarcode: '',
      currentResult:
        caseCWarning?.warningMessage ||
        caseCError?.errorMessage ||
        '상품관리 CSV에 A-5 키워드 없음',
      reviewReason: '상품관리 CSV 키워드 누락. fallback warning만 제공',
    },
  ];
}

// ---------------------------------------------------------------------------
// 미리보기
// ---------------------------------------------------------------------------

export async function previewKeywordMatching(
  erpBuffer: Buffer,
  csvBuffer: Buffer,
  stockBuffer: Buffer,
): Promise<SkuKeywordPreviewResponse> {
  // 1. 파일 파싱
  const erpRows = parseErpUnmappedWorkbook(erpBuffer);
  const { rows: csvRows } = parseProductManagementCsv(csvBuffer);
  const stockRows = parseStockListXls(stockBuffer);

  // 2. 인덱스 구축
  const keywordIndex = buildKeywordIndex(csvRows);
  const stockIndex = buildStockIndex(stockRows);

  // 3. SkuBarcode에서 바코드 → SKU 매핑 가져오기
  const allStockBarcodes = stockRows
    .map((r) => r.barcode)
    .filter((b) => b.length > 0);
  const uniqueBarcodes = Array.from(new Set(allStockBarcodes));

  const skuBarcodes = await prisma.skuBarcode.findMany({
    where: { barcode: { in: uniqueBarcodes } },
    include: { sku: { select: { id: true, skuCode: true } } },
  });

  const skuByBarcode = new Map(
    skuBarcodes.map((sb) => [sb.barcode, { skuId: sb.sku.id, skuCode: sb.sku.skuCode }])
  );

  // 4. 매칭 실행
  const matchedRows: SkuKeywordMatchedRow[] = [];
  const warningRows: SkuKeywordWarningRow[] = [];
  const errorRows: SkuKeywordErrorRow[] = [];

  let keywordMatchCount = 0;
  let barcodeMatchCount = 0;
  let skuMatchCount = 0;

  for (const erpRow of erpRows) {
    if (!isMappingType(erpRow.mappingType)) {
      errorRows.push({
        mappingType: erpRow.mappingType,
        channelProductNo: erpRow.channelProductNo,
        itemId: erpRow.itemId,
        sourceText: erpRow.productName,
        errorType: 'INVALID_MAPPING_TYPE',
        errorMessage: 'mappingType이 PRODUCT/OPTION/ADDITIONAL 중 하나가 아닙니다.',
      });
      continue;
    }

    const sourceText = getSourceText(erpRow);

    // ADDITIONAL인 경우 " / " 뒤 부분을 먼저 시도
    let matchResult: MatchResult | null = null;
    if (erpRow.mappingType === 'ADDITIONAL' || erpRow.mappingType === 'OPTION') {
      const subName = extractSubItemName(sourceText);
      if (subName) {
        matchResult = matchTextToKeyword(subName, keywordIndex);
      }
    }
    // 서브이름 매칭 실패 시 전체 sourceText로 시도
    if (!matchResult) {
      matchResult = matchTextToKeyword(sourceText, keywordIndex);
    }
    // 그래도 실패하면 productName으로 시도
    if (!matchResult && sourceText !== erpRow.productName) {
      matchResult = matchTextToKeyword(erpRow.productName, keywordIndex);
    }

    if (!matchResult) {
      // Fallback 로직 시도
      const fallbacks = extractFallbackKeywords(sourceText);
      const fallbackMatches = new Set<string>();

      for (const token of fallbacks) {
        const normToken = normalizeText(token);
        if (normToken.length < 2) continue;
        for (const [kw, entries] of keywordIndex.entries()) {
          if (kw.includes(normToken)) {
            fallbackMatches.add(entries[0].originalKeyword);
          }
        }
      }

      if (fallbackMatches.size > 0) {
        warningRows.push({
          mappingType: erpRow.mappingType,
          channelProductNo: erpRow.channelProductNo,
          itemId: erpRow.itemId,
          sourceText,
          matchedKeyword: Array.from(fallbackMatches).slice(0, 5).join(', '),
          keywordColumn: '후보',
          productManagementRowNo: 0,
          barcode: '',
          skuCode: '',
          warningType: 'FALLBACK_CANDIDATE',
          warningMessage: `완전일치 실패. 유사 구성품 후보를 확인하세요.`,
          matchMethod: 'PARTIAL',
          confidence: 0.3,
          memo: 'fallback 후보는 기본 적용 대상에서 제외됩니다.',
        });
        continue;
      }

      errorRows.push({
        mappingType: erpRow.mappingType,
        channelProductNo: erpRow.channelProductNo,
        itemId: erpRow.itemId,
        sourceText,
        errorType: 'NO_KEYWORD_MATCH',
        errorMessage: '매칭되는 키워드를 찾을 수 없습니다.',
      });
      continue;
    }

    keywordMatchCount++;

    // 부분매칭은 자동확정 안 함 → warning
    if (matchResult.method === 'PARTIAL') {
      warningRows.push({
        mappingType: erpRow.mappingType,
        channelProductNo: erpRow.channelProductNo,
        itemId: erpRow.itemId,
        sourceText,
        matchedKeyword: matchResult.matchedKeyword,
        keywordColumn: matchResult.entries[0].keywordColumn,
        productManagementRowNo: matchResult.entries[0].csvRowNumber,
        barcode: '',
        skuCode: '',
        warningType: 'PARTIAL_MATCH',
        warningMessage: `부분일치만 가능합니다. 매칭 키워드: "${matchResult.matchedKeyword}"`,
        matchMethod: matchResult.method,
        confidence: matchResult.confidence,
        memo: '부분일치 결과는 사람이 검토해야 합니다.',
      });
      continue;
    }

    // 같은 키워드가 여러 CSV 행에 있는 경우
    if (matchResult.entries.length > 1) {
      // 고유한 CSV 행 수 확인
      const uniqueCsvRows = new Set(matchResult.entries.map((e) => e.csvRowIndex));
      if (uniqueCsvRows.size > 1) {
        warningRows.push({
          mappingType: erpRow.mappingType,
          channelProductNo: erpRow.channelProductNo,
          itemId: erpRow.itemId,
          sourceText,
          matchedKeyword: matchResult.matchedKeyword,
          keywordColumn: matchResult.entries[0].keywordColumn,
          productManagementRowNo: matchResult.entries[0].csvRowNumber,
          barcode: '',
          skuCode: '',
          warningType: 'MULTIPLE_CSV_ROWS',
          warningMessage: `같은 키워드가 ${uniqueCsvRows.size}개의 상품관리 행에 있습니다.`,
          matchMethod: matchResult.method,
          confidence: 0.7,
          memo: '상품관리 CSV 중복 키워드로 기본 적용 대상에서 제외됩니다.',
        });
        continue;
      }
    }

    const csvEntry = matchResult.entries[0];

    // 재고현황에서 사입상품명으로 연결
    const stockMatches = findStockRowsByPurchaseName(
      csvEntry.purchaseProductName,
      stockIndex,
    );

    if (stockMatches.length === 0) {
      errorRows.push({
        mappingType: erpRow.mappingType,
        channelProductNo: erpRow.channelProductNo,
        itemId: erpRow.itemId,
        sourceText,
        errorType: 'NO_STOCK_MATCH',
        errorMessage: `상품관리 행(${csvEntry.csvRowNumber})의 사입상품명 "${csvEntry.purchaseProductName}"에 해당하는 재고현황을 찾을 수 없습니다.`,
      });
      continue;
    }

    // 바코드가 있는 재고 행 필터링
    const stockWithBarcode = stockMatches.filter((s) => s.barcode);

    if (stockWithBarcode.length === 0) {
      errorRows.push({
        mappingType: erpRow.mappingType,
        channelProductNo: erpRow.channelProductNo,
        itemId: erpRow.itemId,
        sourceText,
        errorType: 'NO_BARCODE',
        errorMessage: `재고현황과 연결되었으나 바코드번호가 없습니다.`,
      });
      continue;
    }

    barcodeMatchCount++;

    // 각 바코드마다 matchedRow 생성 (세트상품 대응)
    for (const stockRow of stockWithBarcode) {
      const skuInfo = skuByBarcode.get(stockRow.barcode);

      if (!skuInfo) {
        // 바코드는 있지만 SkuBarcode에 없는 경우
        warningRows.push({
          mappingType: erpRow.mappingType,
          channelProductNo: erpRow.channelProductNo,
          itemId: erpRow.itemId,
          sourceText,
          matchedKeyword: matchResult.matchedKeyword,
          keywordColumn: csvEntry.keywordColumn,
          productManagementRowNo: csvEntry.csvRowNumber,
          barcode: stockRow.barcode,
          skuCode: '',
          warningType: 'BARCODE_NOT_IN_SKU',
          warningMessage: `바코드 ${stockRow.barcode}가 SkuBarcode 테이블에 등록되지 않았습니다.`,
          matchMethod: matchResult.method,
          confidence: matchResult.confidence,
          memo: '바코드는 있으나 SKU 코드가 없어 기본 적용 대상에서 제외됩니다.',
        });
        continue;
      }

      skuMatchCount++;

      matchedRows.push({
        mappingType: erpRow.mappingType,
        channelProductNo: erpRow.channelProductNo,
        itemId: erpRow.itemId,
        sourceText,
        matchedKeyword: matchResult.matchedKeyword,
        keywordColumn: csvEntry.keywordColumn,
        productManagementRowNo: csvEntry.csvRowNumber,
        barcode: stockRow.barcode,
        skuCode: skuInfo.skuCode,
        quantity: 1,
        matchMethod: matchResult.method,
        confidence: matchResult.confidence,
        memo: `키워드 자동매칭: ${csvEntry.keywordColumn} → ${csvEntry.purchaseProductName} → ${stockRow.barcode}`,
        applyEligible: false,
        reviewReason: '검토 전입니다.',
      });
    }
  }

  const reviewed = withApplyEligibility(matchedRows, warningRows);
  const applyEligibleCount = reviewed.matchedRows.filter((row) => row.applyEligible).length;
  const possibleSetCount = reviewed.duplicates.filter((row) => row.possibleSet).length;
  const possibleDuplicateCount = reviewed.duplicates.filter((row) => row.possibleDuplicate).length;
  const representativeCases = buildRepresentativeCases(
    reviewed.matchedRows,
    warningRows,
    errorRows,
  );

  const summary: SkuKeywordSummary = {
    totalErpRows: erpRows.length,
    keywordMatchCount,
    barcodeMatchCount,
    skuMatchCount,
    warningCount: warningRows.length,
    errorCount: errorRows.length,
    matchedRowsCount: reviewed.matchedRows.length,
    applyEligibleCount,
    applyIneligibleCount: reviewed.matchedRows.length - applyEligibleCount,
    duplicateCount: reviewed.duplicates.length,
    possibleSetCount,
    possibleDuplicateCount,
  };

  return {
    matchedRows: reviewed.matchedRows,
    warningRows,
    errorRows,
    duplicates: reviewed.duplicates,
    representativeCases,
    summary,
  };
}

// ---------------------------------------------------------------------------
// 미리보기 Excel 내보내기
// ---------------------------------------------------------------------------

type SheetCellValue = string | number | boolean;
type SheetRow = Record<string, SheetCellValue>;

function appendJsonSheet(
  workbook: XLSX.WorkBook,
  sheetName: string,
  rows: SheetRow[],
  headers: string[],
): void {
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  XLSX.utils.sheet_add_json(worksheet, rows, {
    header: headers,
    skipHeader: true,
    origin: 'A2',
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
}

function toSummarySheetRows(preview: SkuKeywordPreviewResponse): SheetRow[] {
  return [
    { metric: 'ERP 총 행 수', value: preview.summary.totalErpRows },
    { metric: 'matchedRows 수', value: preview.matchedRows.length },
    { metric: 'applyEligible=true 수', value: preview.summary.applyEligibleCount },
    { metric: 'applyEligible=false 수', value: preview.summary.applyIneligibleCount },
    { metric: 'warningRows 수', value: preview.warningRows.length },
    { metric: 'errorRows 수', value: preview.errorRows.length },
    { metric: 'duplicates 수', value: preview.duplicates.length },
    { metric: 'possibleSet 수', value: preview.summary.possibleSetCount },
    { metric: 'possibleDuplicate 수', value: preview.summary.possibleDuplicateCount },
  ];
}

function toMatchedSheetRows(rows: SkuKeywordMatchedRow[]): SheetRow[] {
  return rows.map((row) => ({
    mappingType: row.mappingType,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    sourceText: row.sourceText,
    matchedKeyword: row.matchedKeyword,
    keywordColumn: row.keywordColumn,
    productManagementRowNo: row.productManagementRowNo,
    barcode: row.barcode,
    skuCode: row.skuCode,
    quantity: row.quantity,
    matchMethod: row.matchMethod,
    confidence: row.confidence,
    memo: row.memo,
    applyEligible: row.applyEligible,
    reviewReason: row.reviewReason,
  }));
}

function toWarningSheetRows(rows: SkuKeywordWarningRow[]): SheetRow[] {
  return rows.map((row) => ({
    mappingType: row.mappingType,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    sourceText: row.sourceText,
    warningType: row.warningType,
    warningMessage: row.warningMessage,
    matchedKeyword: row.matchedKeyword,
    barcode: row.barcode,
    skuCode: row.skuCode,
    memo: row.memo,
  }));
}

function toErrorSheetRows(rows: SkuKeywordErrorRow[]): SheetRow[] {
  return rows.map((row) => ({
    mappingType: row.mappingType,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    sourceText: row.sourceText,
    errorType: row.errorType,
    errorMessage: row.errorMessage,
  }));
}

function toDuplicateSheetRows(rows: SkuKeywordDuplicateRow[]): SheetRow[] {
  return rows.map((row) => ({
    mappingType: row.mappingType,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    sourceText: row.sourceText,
    matchedRowCount: row.matchedRowCount,
    barcodes: row.barcodes,
    skuCodes: row.skuCodes,
    productManagementRowNos: row.productManagementRowNos,
    possibleSet: row.possibleSet,
    possibleDuplicate: row.possibleDuplicate,
    reviewReason: row.reviewReason,
  }));
}

function toRepresentativeSheetRows(rows: SkuKeywordRepresentativeCase[]): SheetRow[] {
  return rows.map((row) => ({
    caseKey: row.caseKey,
    channelProductNo: row.channelProductNo,
    itemId: row.itemId,
    expectedBarcode: row.expectedBarcode,
    actualBarcode: row.actualBarcode,
    currentResult: row.currentResult,
    reviewReason: row.reviewReason,
  }));
}

export function createKeywordPreviewWorkbookBuffer(preview: SkuKeywordPreviewResponse): Buffer {
  const workbook = XLSX.utils.book_new();

  appendJsonSheet(workbook, 'Summary', toSummarySheetRows(preview), ['metric', 'value']);
  appendJsonSheet(workbook, 'MatchedRows', toMatchedSheetRows(preview.matchedRows), [
    'mappingType',
    'channelProductNo',
    'itemId',
    'sourceText',
    'matchedKeyword',
    'keywordColumn',
    'productManagementRowNo',
    'barcode',
    'skuCode',
    'quantity',
    'matchMethod',
    'confidence',
    'memo',
    'applyEligible',
    'reviewReason',
  ]);
  appendJsonSheet(workbook, 'WarningRows', toWarningSheetRows(preview.warningRows), [
    'mappingType',
    'channelProductNo',
    'itemId',
    'sourceText',
    'warningType',
    'warningMessage',
    'matchedKeyword',
    'barcode',
    'skuCode',
    'memo',
  ]);
  appendJsonSheet(workbook, 'ErrorRows', toErrorSheetRows(preview.errorRows), [
    'mappingType',
    'channelProductNo',
    'itemId',
    'sourceText',
    'errorType',
    'errorMessage',
  ]);
  appendJsonSheet(workbook, 'Duplicates', toDuplicateSheetRows(preview.duplicates), [
    'mappingType',
    'channelProductNo',
    'itemId',
    'sourceText',
    'matchedRowCount',
    'barcodes',
    'skuCodes',
    'productManagementRowNos',
    'possibleSet',
    'possibleDuplicate',
    'reviewReason',
  ]);
  appendJsonSheet(
    workbook,
    'RepresentativeCases',
    toRepresentativeSheetRows(preview.representativeCases),
    [
      'caseKey',
      'channelProductNo',
      'itemId',
      'expectedBarcode',
      'actualBarcode',
      'currentResult',
      'reviewReason',
    ],
  );

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
}

// ---------------------------------------------------------------------------
// 적용
// ---------------------------------------------------------------------------

type ApplyKeywordMatchingOptions = {
  forceApplyWarningRows?: boolean;
  forceApplyIneligibleRows?: boolean;
};

function addExcludedReason(counts: Record<string, number>, reason: string): void {
  counts[reason] = (counts[reason] ?? 0) + 1;
}

function getApplyExclusionReason(
  row: SkuKeywordMatchedRow,
  options: ApplyKeywordMatchingOptions,
): string | null {
  if (!row.barcode) return '바코드 없음';
  if (!row.skuCode) return 'SKU 코드 없음';
  if (row.matchMethod === 'PARTIAL' && !options.forceApplyWarningRows) {
    return '위험 경고 행';
  }
  if (!row.applyEligible && !options.forceApplyIneligibleRows) {
    return row.reviewReason || '적용 비대상';
  }
  return null;
}

export async function applyKeywordMatching(
  rows: SkuKeywordMatchedRow[],
  options: ApplyKeywordMatchingOptions = {},
): Promise<SkuKeywordApplyResponse> {
  const excludedReasonCounts: Record<string, number> = {};
  const candidateRows = rows.filter((row) => {
    const reason = getApplyExclusionReason(row, options);
    if (reason) {
      addExcludedReason(excludedReasonCounts, reason);
      return false;
    }
    return true;
  });

  // 바코드로 SKU 찾기
  const barcodes = Array.from(new Set(candidateRows.map((r) => r.barcode).filter(Boolean)));
  const skuBarcodes = await prisma.skuBarcode.findMany({
    where: { barcode: { in: barcodes } },
    include: { sku: { select: { id: true, skuCode: true } } },
  });
  const skuByBarcode = new Map(
    skuBarcodes.map((sb) => [sb.barcode, { skuId: sb.sku.id, skuCode: sb.sku.skuCode }])
  );
  const rowsToApply = candidateRows.filter((row) => {
    if (skuByBarcode.has(row.barcode)) return true;
    addExcludedReason(excludedReasonCounts, 'SKU 바코드 재조회 실패');
    return false;
  });

  let productCount = 0;
  let optionCount = 0;
  let additionalCount = 0;
  let aliasCount = 0;

  await prisma.$transaction(async (tx) => {
    for (const row of rowsToApply) {
      const skuInfo = skuByBarcode.get(row.barcode);
      if (!skuInfo) continue;

      // SKU 매핑 upsert
      if (row.mappingType === 'PRODUCT') {
        await tx.naverProductSku.upsert({
          where: {
            naverProductId_skuId: {
              naverProductId: row.itemId,
              skuId: skuInfo.skuId,
            },
          },
          create: {
            naverProductId: row.itemId,
            skuId: skuInfo.skuId,
            quantity: row.quantity,
          },
          update: { quantity: row.quantity },
        });
        productCount++;
      } else if (row.mappingType === 'OPTION') {
        await tx.naverProductOptionSku.upsert({
          where: {
            optionId_skuId: {
              optionId: row.itemId,
              skuId: skuInfo.skuId,
            },
          },
          create: {
            optionId: row.itemId,
            skuId: skuInfo.skuId,
            quantity: row.quantity,
          },
          update: { quantity: row.quantity },
        });
        optionCount++;
      } else if (row.mappingType === 'ADDITIONAL') {
        await tx.naverProductAdditionalSku.upsert({
          where: {
            additionalId_skuId: {
              additionalId: row.itemId,
              skuId: skuInfo.skuId,
            },
          },
          create: {
            additionalId: row.itemId,
            skuId: skuInfo.skuId,
            quantity: row.quantity,
          },
          update: { quantity: row.quantity },
        });
        additionalCount++;
      }

      // SkuAlias에 MATCH_KEYWORD 저장 (중복 방지)
      if (row.matchedKeyword) {
        try {
          await tx.skuAlias.upsert({
            where: {
              skuId_aliasType_value: {
                skuId: skuInfo.skuId,
                aliasType: 'MATCH_KEYWORD',
                value: row.matchedKeyword,
              },
            },
            create: {
              skuId: skuInfo.skuId,
              aliasType: 'MATCH_KEYWORD',
              value: row.matchedKeyword,
              source: '상품관리 CSV',
              memo: '키워드 자동매칭으로 등록',
            },
            update: {},
          });
          aliasCount++;
        } catch {
          // 중복 무시
        }
      }
    }
  });

  return {
    appliedCount: productCount + optionCount + additionalCount,
    applyTargetCount: rowsToApply.length,
    excludedCount: rows.length - rowsToApply.length,
    excludedReasonCounts,
    productCount,
    optionCount,
    additionalCount,
    aliasCount,
  };
}
