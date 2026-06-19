import { XLSX, readLegacyKoreanWorkbook } from '@/src/lib/xlsx-legacy';
import {
  OPTION_CURRENT_CONTEXT_TEMPLATE_HEADERS,
  type OptionCurrentContextPreviewResponse,
  type OptionCurrentContextPreviewRow,
  type OptionCurrentContextPreviewStatus,
  type OptionCurrentContextRowType,
} from '@/src/types/option-current-context.types';

type OptionCurrentContextParsedRow = {
  rowNumber: number;
  sourceSheet: string;
  smartstoreId: string;
  storeName: string;
  channelProductNo: string;
  originProductNo: string;
  optionId: string;
  sellerManagerCode: string;
  optionName: string;
  optionValue: string;
  baseSalePriceRaw: string;
  sellerDiscountRaw: string;
  optionPriceRaw: string;
  currentEffectiveOptionPriceRaw: string;
  currentOptionStockQuantityRaw: string;
  additionalPriceRaw: string;
  additionalStockQuantityRaw: string;
  memo: string;
  hasSellerDiscountColumn: boolean;
};

type ParsedIntegerResult = {
  value: number | null;
  invalid: boolean;
};

const HEADER_CANDIDATES = {
  smartstoreId: ['smartstoreid', '스토어id', '스토어아이디'],
  storeName: ['storename', '스토어명', '스토어이름'],
  channelProductNo: ['channelproductno', '채널상품번호', '판매처상품코드'],
  originProductNo: ['originproductno', '원상품번호', '네이버상품번호', 'naverproductid'],
  optionId: ['optionid', '옵션id', '옵션번호'],
  sellerManagerCode: [
    'sellermanagementcode',
    'sellermanagercode',
    '판매자관리코드',
    '판매자상품코드',
    '판매자 상품코드',
    '옵션코드',
  ],
  optionName: ['optionname', '옵션명'],
  optionValue: ['optionvalue', '옵션값', '옵션내용'],
  baseSalePrice: ['basesaleprice', '판매가', '기본판매가', '정상품판매가', '기준상품판매가'],
  sellerDiscount: ['sellerdiscount', '판매자할인', '판매자할인금액'],
  optionPrice: ['optionprice', 'optionpricedelta', '옵션가', '옵션가감액', '옵션추가금액', '옵션차액'],
  currentEffectiveOptionPrice: [
    'currenteffectiveoptionprice',
    'currentoptionsaleprice',
    '현재옵션최종가',
    '최종옵션판매가',
    '현재옵션판매가',
    '옵션현재판매가',
    '옵션판매가',
  ],
  currentOptionStockQuantity: [
    'currentoptionstockquantity',
    '현재판매재고',
    '현재옵션재고',
    '옵션재고',
    '옵션판매재고',
  ],
  additionalPrice: ['additionalprice', '추가상품가격', '추가상품단일가격'],
  additionalStockQuantity: ['additionalstockquantity', '추가상품재고'],
  memo: ['memo', '비고', '메모'],
} as const;

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '').replace(/[()]/g, '');
}

function decodeCsvBuffer(buffer: Buffer): string {
  const utf8Text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (utf8Text.includes('\uFFFD')) {
    return new TextDecoder('euc-kr').decode(buffer);
  }

  return utf8Text;
}

function readWorkbook(buffer: Buffer, fileName: string): XLSX.WorkBook {
  const lowerFileName = fileName.toLowerCase();
  if (lowerFileName.endsWith('.csv')) {
    return XLSX.read(decodeCsvBuffer(buffer), { type: 'string', raw: false });
  }

  return readLegacyKoreanWorkbook(buffer);
}

function findKeyByRowValue(headerRow: Record<string, unknown>, candidates: readonly string[]): string {
  const normalizedCandidates = candidates.map((candidate) => normalizeHeader(candidate));

  for (const [key, value] of Object.entries(headerRow)) {
    const normalizedValue = normalizeHeader(String(value));
    if (normalizedCandidates.some((candidate) => normalizedValue === candidate)) {
      return key;
    }
  }

  for (const [key, value] of Object.entries(headerRow)) {
    const normalizedValue = normalizeHeader(String(value));
    if (normalizedCandidates.some((candidate) => normalizedValue.includes(candidate))) {
      return key;
    }
  }

  return '';
}

function findKeyByHeaderKeys(keys: string[], candidates: readonly string[]): string {
  const normalizedCandidates = candidates.map((candidate) => normalizeHeader(candidate));
  const exactMatch = keys.find((key) => normalizedCandidates.includes(normalizeHeader(key)));
  if (exactMatch) return exactMatch;

  return (
    keys.find((key) =>
      normalizedCandidates.some((candidate) => normalizeHeader(key).includes(candidate)),
    ) ?? ''
  );
}

function parseOptionalInteger(rawValue: string): ParsedIntegerResult {
  const cleaned = rawValue
    .replace(/^="/, '')
    .replace(/"$/, '')
    .replace(/,/g, '')
    .trim();

  if (!cleaned) {
    return { value: null, invalid: false };
  }

  if (!/^-?\d+$/.test(cleaned)) {
    return { value: null, invalid: true };
  }

  return { value: Number(cleaned), invalid: false };
}

function hasMeaningfulValue(row: OptionCurrentContextParsedRow): boolean {
  return [
    row.smartstoreId,
    row.storeName,
    row.channelProductNo,
    row.originProductNo,
    row.optionId,
    row.sellerManagerCode,
    row.optionName,
    row.optionValue,
    row.baseSalePriceRaw,
    row.sellerDiscountRaw,
    row.optionPriceRaw,
    row.currentEffectiveOptionPriceRaw,
    row.currentOptionStockQuantityRaw,
    row.additionalPriceRaw,
    row.additionalStockQuantityRaw,
    row.memo,
  ].some((value) => value.trim().length > 0);
}

function parseWorkbookRows(buffer: Buffer, fileName: string): OptionCurrentContextParsedRow[] {
  const workbook = readWorkbook(buffer, fileName);
  const parsedRows: OptionCurrentContextParsedRow[] = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const sheetRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
      defval: '',
      raw: false,
    });

    if (sheetRows.length === 0) continue;

    const keys = Object.keys(sheetRows[0]);
    const isDoubleHeader = keys.some((key) =>
      key.includes('기본정보') ||
      key.includes('상품 기본정보') ||
      key.includes('할인/혜택정보') ||
      key.includes('수정불가'),
    );

    let smartstoreIdKey = '';
    let storeNameKey = '';
    let channelProductNoKey = '';
    let originProductNoKey = '';
    let optionIdKey = '';
    let sellerManagerCodeKey = '';
    let optionNameKey = '';
    let optionValueKey = '';
    let baseSalePriceKey = '';
    let sellerDiscountKey = '';
    let optionPriceKey = '';
    let currentEffectiveOptionPriceKey = '';
    let currentOptionStockQuantityKey = '';
    let additionalPriceKey = '';
    let additionalStockQuantityKey = '';
    let memoKey = '';

    let dataRows: Record<string, unknown>[] = [];
    let startRowNumber = 2;

    if (isDoubleHeader && sheetRows.length > 1) {
      const headerRow = sheetRows[0];
      smartstoreIdKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.smartstoreId);
      storeNameKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.storeName);
      channelProductNoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.channelProductNo);
      originProductNoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.originProductNo);
      optionIdKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionId);
      sellerManagerCodeKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.sellerManagerCode);
      optionNameKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionName);
      optionValueKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionValue);
      baseSalePriceKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.baseSalePrice);
      sellerDiscountKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.sellerDiscount);
      optionPriceKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionPrice);
      currentEffectiveOptionPriceKey = findKeyByRowValue(
        headerRow,
        HEADER_CANDIDATES.currentEffectiveOptionPrice,
      );
      currentOptionStockQuantityKey = findKeyByRowValue(
        headerRow,
        HEADER_CANDIDATES.currentOptionStockQuantity,
      );
      additionalPriceKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.additionalPrice);
      additionalStockQuantityKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.additionalStockQuantity);
      memoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.memo);
      dataRows = sheetRows.slice(1);
      startRowNumber = 3;
    } else {
      smartstoreIdKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.smartstoreId);
      storeNameKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.storeName);
      channelProductNoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.channelProductNo);
      originProductNoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.originProductNo);
      optionIdKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionId);
      sellerManagerCodeKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.sellerManagerCode);
      optionNameKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionName);
      optionValueKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionValue);
      baseSalePriceKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.baseSalePrice);
      sellerDiscountKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.sellerDiscount);
      optionPriceKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionPrice);
      currentEffectiveOptionPriceKey = findKeyByHeaderKeys(
        keys,
        HEADER_CANDIDATES.currentEffectiveOptionPrice,
      );
      currentOptionStockQuantityKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.currentOptionStockQuantity);
      additionalPriceKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.additionalPrice);
      additionalStockQuantityKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.additionalStockQuantity);
      memoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.memo);
      dataRows = sheetRows;
      startRowNumber = 2;
    }

    dataRows.forEach((row, index) => {
      const parsedRow: OptionCurrentContextParsedRow = {
        rowNumber: index + startRowNumber,
        sourceSheet: sheetName,
        smartstoreId: smartstoreIdKey ? normalizeCell(row[smartstoreIdKey]) : '',
        storeName: storeNameKey ? normalizeCell(row[storeNameKey]) : '',
        channelProductNo: channelProductNoKey ? normalizeCell(row[channelProductNoKey]) : '',
        originProductNo: originProductNoKey ? normalizeCell(row[originProductNoKey]) : '',
        optionId: optionIdKey ? normalizeCell(row[optionIdKey]) : '',
        sellerManagerCode: sellerManagerCodeKey ? normalizeCell(row[sellerManagerCodeKey]) : '',
        optionName: optionNameKey ? normalizeCell(row[optionNameKey]) : '',
        optionValue: optionValueKey ? normalizeCell(row[optionValueKey]) : '',
        baseSalePriceRaw: baseSalePriceKey ? normalizeCell(row[baseSalePriceKey]) : '',
        sellerDiscountRaw: sellerDiscountKey ? normalizeCell(row[sellerDiscountKey]) : '',
        optionPriceRaw: optionPriceKey ? normalizeCell(row[optionPriceKey]) : '',
        currentEffectiveOptionPriceRaw: currentEffectiveOptionPriceKey
          ? normalizeCell(row[currentEffectiveOptionPriceKey])
          : '',
        currentOptionStockQuantityRaw: currentOptionStockQuantityKey
          ? normalizeCell(row[currentOptionStockQuantityKey])
          : '',
        additionalPriceRaw: additionalPriceKey ? normalizeCell(row[additionalPriceKey]) : '',
        additionalStockQuantityRaw: additionalStockQuantityKey
          ? normalizeCell(row[additionalStockQuantityKey])
          : '',
        memo: memoKey ? normalizeCell(row[memoKey]) : '',
        hasSellerDiscountColumn: Boolean(sellerDiscountKey),
      };

      if (hasMeaningfulValue(parsedRow)) {
        parsedRows.push(parsedRow);
      }
    });
  }

  return parsedRows;
}

function buildRowStatus(warnings: string[], errors: string[]): OptionCurrentContextPreviewStatus {
  if (errors.length > 0) return 'ERROR';
  if (warnings.length > 0) return 'WARNING';
  return 'VALID';
}

function determineRowType(row: OptionCurrentContextParsedRow): OptionCurrentContextRowType {
  if (row.additionalPriceRaw.trim().length > 0 || row.additionalStockQuantityRaw.trim().length > 0) {
    return 'ADDITIONAL';
  }
  return 'OPTION';
}

function hasCurrentPriceContext(row: OptionCurrentContextPreviewRow): boolean {
  if (row.rowType === 'ADDITIONAL') {
    return row.additionalPrice !== null && row.additionalPrice !== undefined;
  }
  return row.currentEffectiveOptionPrice !== null && row.currentEffectiveOptionPrice !== undefined;
}

function hasCurrentStockContext(row: OptionCurrentContextPreviewRow): boolean {
  if (row.rowType === 'ADDITIONAL') {
    return row.additionalStockQuantity !== null && row.additionalStockQuantity !== undefined;
  }
  return row.currentOptionStockQuantity !== null && row.currentOptionStockQuantity !== undefined;
}

export function previewOptionCurrentContextFile(input: {
  fileName: string;
  buffer: Buffer;
}): OptionCurrentContextPreviewResponse {
  const parsedRows = parseWorkbookRows(input.buffer, input.fileName);

  const rows: OptionCurrentContextPreviewRow[] = parsedRows.map((row) => {
    const warnings: string[] = [];
    const errors: string[] = [];

    const rowType = determineRowType(row);
    const baseSalePrice = parseOptionalInteger(row.baseSalePriceRaw);
    const sellerDiscount = parseOptionalInteger(row.sellerDiscountRaw);
    const optionPrice = parseOptionalInteger(row.optionPriceRaw);
    const currentEffectiveOptionPrice = parseOptionalInteger(row.currentEffectiveOptionPriceRaw);
    const currentOptionStockQuantity = parseOptionalInteger(row.currentOptionStockQuantityRaw);
    const additionalPrice = parseOptionalInteger(row.additionalPriceRaw);
    const additionalStockQuantity = parseOptionalInteger(row.additionalStockQuantityRaw);

    if (!row.channelProductNo) {
      errors.push('channelProductNo가 없습니다.');
    }

    if (rowType === 'OPTION' && !row.optionId && !row.sellerManagerCode) {
      errors.push('OPTION 행은 optionId와 sellerManagerCode 중 하나 이상이 필요합니다.');
    }

    if (baseSalePrice.invalid) {
      errors.push('baseSalePrice는 숫자로 파싱할 수 있어야 합니다.');
    }

    if (sellerDiscount.invalid) {
      errors.push('sellerDiscount는 숫자로 파싱할 수 있어야 합니다.');
    }

    if (optionPrice.invalid) {
      errors.push('optionPrice는 숫자로 파싱할 수 있어야 합니다.');
    }

    if (currentEffectiveOptionPrice.invalid) {
      errors.push('currentEffectiveOptionPrice는 숫자로 파싱할 수 있어야 합니다.');
    }

    if (currentOptionStockQuantity.invalid) {
      errors.push('currentOptionStockQuantity는 숫자로 파싱할 수 있어야 합니다.');
    }

    if (additionalPrice.invalid) {
      errors.push('additionalPrice는 숫자로 파싱할 수 있어야 합니다.');
    }

    if (additionalStockQuantity.invalid) {
      errors.push('additionalStockQuantity는 숫자로 파싱할 수 있어야 합니다.');
    }

    if ((currentOptionStockQuantity.value ?? 0) < 0) {
      errors.push('currentOptionStockQuantity는 음수일 수 없습니다.');
    }

    if ((additionalStockQuantity.value ?? 0) < 0) {
      errors.push('additionalStockQuantity는 음수일 수 없습니다.');
    }

    let resolvedSellerDiscount = sellerDiscount.value;
    if (rowType === 'OPTION' && row.hasSellerDiscountColumn && resolvedSellerDiscount === null) {
      resolvedSellerDiscount = 0;
    }

    let calculatedEffectiveOptionPrice: number | null = null;
    let priceSource: OptionCurrentContextPreviewRow['priceSource'] = 'MISSING';
    let resolvedCurrentEffectiveOptionPrice: number | null = null;

    if (rowType === 'OPTION') {
      if (
        baseSalePrice.value !== null &&
        resolvedSellerDiscount !== null &&
        optionPrice.value !== null
      ) {
        calculatedEffectiveOptionPrice =
          baseSalePrice.value - resolvedSellerDiscount + optionPrice.value;
      }

      if (currentEffectiveOptionPrice.value !== null) {
        resolvedCurrentEffectiveOptionPrice = currentEffectiveOptionPrice.value;
        priceSource = 'DIRECT_FINAL_PRICE';
      } else if (calculatedEffectiveOptionPrice !== null) {
        resolvedCurrentEffectiveOptionPrice = calculatedEffectiveOptionPrice;
        priceSource = 'CALCULATED_FROM_BASE_DISCOUNT_OPTION';
        warnings.push('최종 옵션 판매가가 없어 판매가 - 판매자할인 + 옵션가 계산값을 사용했습니다.');
      } else {
        priceSource = 'MISSING';
        warnings.push('최종 옵션 판매가 문맥이 없습니다.');
      }

      if (!row.hasSellerDiscountColumn && currentEffectiveOptionPrice.value === null) {
        warnings.push('판매자할인 확인 불가: sellerDiscount 컬럼이 없어서 최종 옵션 판매가 계산 근거가 부족합니다.');
      }

      if (
        currentEffectiveOptionPrice.value !== null &&
        calculatedEffectiveOptionPrice !== null &&
        currentEffectiveOptionPrice.value !== calculatedEffectiveOptionPrice
      ) {
        warnings.push('직접 입력된 최종 옵션 판매가와 판매가 - 판매자할인 + 옵션가 계산값이 일치하지 않습니다.');
      }

      if (resolvedCurrentEffectiveOptionPrice !== null && resolvedCurrentEffectiveOptionPrice < 0) {
        errors.push('currentEffectiveOptionPrice는 음수일 수 없습니다.');
      }

      if (currentOptionStockQuantity.value === null) {
        warnings.push('현재 옵션 판매재고 문맥이 없습니다.');
      }
    } else {
      priceSource = 'ADDITIONAL_SINGLE_PRICE';
      warnings.push('추가상품은 판매가 - 판매자할인 + 옵션가 계산식을 적용하지 않고 단일가격으로 검증합니다.');

      if (additionalPrice.value === null) {
        warnings.push('추가상품 단일가격 문맥이 없습니다.');
      }

      if (additionalStockQuantity.value === null) {
        warnings.push('추가상품 현재재고 문맥이 없습니다.');
      }
    }

    const status = buildRowStatus(warnings, errors);

    return {
      rowNumber: row.rowNumber,
      sourceSheet: row.sourceSheet,
      rowType,
      smartstoreId: row.smartstoreId || null,
      storeName: row.storeName || null,
      channelProductNo: row.channelProductNo || null,
      originProductNo: row.originProductNo || null,
      optionId: row.optionId || null,
      sellerManagerCode: row.sellerManagerCode || null,
      optionName: row.optionName || null,
      optionValue: row.optionValue || null,
      baseSalePrice: baseSalePrice.value,
      sellerDiscount: resolvedSellerDiscount,
      optionPrice: optionPrice.value,
      calculatedEffectiveOptionPrice,
      currentEffectiveOptionPrice: resolvedCurrentEffectiveOptionPrice,
      currentOptionStockQuantity: currentOptionStockQuantity.value,
      additionalPrice: additionalPrice.value,
      additionalStockQuantity: additionalStockQuantity.value,
      priceSource,
      memo: row.memo || null,
      warnings,
      errors,
      status,
    };
  });

  const summary = {
    totalRows: rows.length,
    validRows: rows.filter((row) => row.status === 'VALID').length,
    warningRows: rows.filter((row) => row.status === 'WARNING').length,
    errorRows: rows.filter((row) => row.status === 'ERROR').length,
    rowsWithCurrentPrice: rows.filter((row) => hasCurrentPriceContext(row)).length,
    rowsWithCurrentStock: rows.filter((row) => hasCurrentStockContext(row)).length,
    rowsWithBothCurrentContext: rows.filter(
      (row) => hasCurrentPriceContext(row) && hasCurrentStockContext(row),
    ).length,
    rowsWithDirectEffectivePrice: rows.filter((row) => row.priceSource === 'DIRECT_FINAL_PRICE').length,
    rowsWithCalculatedEffectivePrice: rows.filter(
      (row) => row.priceSource === 'CALCULATED_FROM_BASE_DISCOUNT_OPTION',
    ).length,
    rowsMissingSellerDiscount: rows.filter(
      (row) =>
        row.rowType === 'OPTION' &&
        row.priceSource !== 'DIRECT_FINAL_PRICE' &&
        row.warnings.some((warning) => warning.includes('판매자할인 확인 불가')),
    ).length,
    rowsWithPriceMismatch: rows.filter((row) =>
      row.warnings.some((warning) => warning.includes('계산값이 일치하지 않습니다')),
    ).length,
    missingChannelProductNo: rows.filter((row) => !row.channelProductNo).length,
    missingOptionIdentifier: rows.filter(
      (row) => row.rowType === 'OPTION' && !row.optionId && !row.sellerManagerCode,
    ).length,
  };

  return {
    fileName: input.fileName,
    summary,
    rows,
  };
}

export function buildOptionCurrentContextTemplateWorkbook(): Buffer {
  const workbook = XLSX.utils.book_new();
  const rows = [
    {
      smartstoreId: 'smartstore-001',
      storeName: '테스트 스토어',
      channelProductNo: '12345678901',
      originProductNo: '9876543210',
      optionId: '58963051311',
      sellerManagerCode: 'OPT-BLACK-M',
      optionName: '색상',
      optionValue: '블랙 / M',
      baseSalePrice: 19900,
      sellerDiscount: 1000,
      optionPrice: 0,
      currentEffectiveOptionPrice: 18900,
      currentOptionStockQuantity: 12,
      additionalPrice: '',
      additionalStockQuantity: '',
      memo: '직접 최종 옵션 판매가 입력 예시',
    },
    {
      smartstoreId: 'smartstore-001',
      storeName: '테스트 스토어',
      channelProductNo: '12345678901',
      originProductNo: '9876543210',
      optionId: '58963051312',
      sellerManagerCode: 'OPT-WHITE-L',
      optionName: '색상',
      optionValue: '화이트 / L',
      baseSalePrice: 19900,
      sellerDiscount: '',
      optionPrice: -2000,
      currentEffectiveOptionPrice: '',
      currentOptionStockQuantity: 8,
      additionalPrice: '',
      additionalStockQuantity: '',
      memo: '판매자할인 컬럼이 있으면 빈 값은 0으로 보고 계산 preview를 수행합니다.',
    },
    {
      smartstoreId: 'smartstore-001',
      storeName: '테스트 스토어',
      channelProductNo: '12345678901',
      originProductNo: '9876543210',
      optionId: '',
      sellerManagerCode: '',
      optionName: '',
      optionValue: '',
      baseSalePrice: '',
      sellerDiscount: '',
      optionPrice: '',
      currentEffectiveOptionPrice: '',
      currentOptionStockQuantity: '',
      additionalPrice: 3500,
      additionalStockQuantity: 15,
      memo: '추가상품은 옵션 계산식이 아니라 단일가격/단일재고 구조입니다.',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: [...OPTION_CURRENT_CONTEXT_TEMPLATE_HEADERS],
  });

  worksheet['!cols'] = [
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 16 },
    { wch: 20 },
    { wch: 18 },
    { wch: 24 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 14 },
    { wch: 16 },
    { wch: 46 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'OPTION현재문맥');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
}
