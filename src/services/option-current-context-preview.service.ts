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
  originalRowNumber: number;
  sourceSheet: string;
  parserType: OptionCurrentContextPreviewRow['parserType'];
  smartstoreId: string;
  storeName: string;
  channelProductNo: string;
  originProductNo: string;
  optionId: string;
  identifierSource: OptionCurrentContextPreviewRow['identifierSource'];
  sellerManagerCode: string;
  optionName: string;
  optionValue: string;
  baseSalePriceRaw: string;
  sellerDiscountRaw: string;
  sellerDiscountUnitRaw: string;
  optionPriceRaw: string;
  currentEffectiveOptionPriceRaw: string;
  currentOptionStockQuantityRaw: string;
  additionalPriceRaw: string;
  additionalStockQuantityRaw: string;
  memo: string;
  hasSellerDiscountColumn: boolean;
  channelProductNoDerivedFromFileName: boolean;
  optionArrayLengthMismatch: boolean;
};

type ParsedIntegerResult = {
  value: number | null;
  invalid: boolean;
};

const HEADER_CANDIDATES = {
  smartstoreId: ['smartstoreid', '스토어id', '스토어아이디'],
  storeName: ['storename', '스토어명', '스토어이름'],
  channelProductNo: ['channelproductno', '채널상품번호', '판매처상품코드'],
  channelProductNoAlt: ['상품번호'],
  originProductNo: ['originproductno', '원상품번호', '네이버상품번호', 'naverproductid'],
  optionId: ['optionid', '옵션id', '옵션번호'],
  sellerManagerCode: [
    'sellermanagementcode',
    'sellermanagercode',
    '판매자관리코드',
    '판매자상품코드',
    '판매자 상품코드',
    '옵션코드',
    '관리코드',
  ],
  optionName: ['optionname', '옵션명'],
  optionValue: ['optionvalue', '옵션값', '옵션내용'],
  baseSalePrice: ['basesaleprice', '판매가', '기본판매가', '정상품판매가', '기준상품판매가'],
  sellerDiscount: [
    'sellerdiscount',
    '판매자할인',
    '판매자할인금액',
    '기본할인값',
    '즉시할인값기본할인',
    '즉시할인 값(기본할인)',
  ],
  sellerDiscountUnit: ['sellerdiscountunit', '기본할인단위', '즉시할인단위기본할인', '즉시할인 단위(기본할인)'],
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
    '옵션재고수량',
    '옵션 재고수량',
  ],
  additionalPrice: ['additionalprice', '추가상품가격', '추가상품단일가격', '추가상품가'],
  additionalStockQuantity: ['additionalstockquantity', '추가상품재고', '추가상품재고수량', '추가상품 재고수량'],
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

function splitMultilineValues(rawValue: string): string[] {
  const normalized = rawValue.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!normalized) return [];
  return normalized
    .split('\n')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

function splitDelimitedValues(rawValue: string): string[] {
  const trimmed = rawValue.trim();
  if (!trimmed) return [];

  const multilineValues = splitMultilineValues(trimmed);
  if (multilineValues.length > 1) {
    return multilineValues;
  }

  if (trimmed.includes(',')) {
    return trimmed
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
  }

  return trimmed ? [trimmed] : [];
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
    row.sellerDiscountUnitRaw,
    row.optionPriceRaw,
    row.currentEffectiveOptionPriceRaw,
    row.currentOptionStockQuantityRaw,
    row.additionalPriceRaw,
    row.additionalStockQuantityRaw,
    row.memo,
  ].some((value) => value.trim().length > 0);
}

function extractChannelProductNoFromFileName(fileName: string): string {
  const normalizedFileName = fileName.replace(/\.[^.]+$/, '');
  const match =
    normalizedFileName.match(/상품[_-]?(\d{8,})[_-]?추가상품목록/i) ??
    normalizedFileName.match(/channel[_-]?product[_-]?(\d{8,})/i);

  return match?.[1] ?? '';
}

function isRequirementGuideRow(row: Record<string, unknown>): boolean {
  const values = Object.values(row)
    .map((value) => normalizeCell(value))
    .filter((value) => value.length > 0);

  if (values.length === 0) return false;

  const guideFlags = new Set(['필수', '비필수', '조건부필수', '조건부 필수']);
  return values.every((value) => guideFlags.has(value));
}

function isInstructionGuideRow(row: Record<string, unknown>): boolean {
  const joined = Object.values(row)
    .map((value) => normalizeCell(value))
    .filter((value) => value.length > 0)
    .join(' ');

  if (!joined) return false;

  return (
    joined.includes('작성가이드는 삭제하시기 바랍니다') ||
    joined.includes('스마트스토어 상품번호를 기준으로 상품정보를 수정합니다') ||
    joined.includes('최대 30자까지 입력할 수 있습니다') ||
    joined.includes('옵션가 등록 시 주의사항')
  );
}

function shouldUseGenericAdditionalStockKey(
  row: Record<string, unknown>,
  explicitAdditionalStockKey: string,
): boolean {
  if (explicitAdditionalStockKey) return false;

  const hasAdditionalContext = ['추가상품명', '추가상품값', '추가상품가', '추가상품가격', '추가상품단일가격'].some(
    (label) =>
      Object.values(row).some((value) => normalizeHeader(String(value)) === normalizeHeader(label)),
  );

  if (!hasAdditionalContext) return false;

  return Object.values(row).some((value) => normalizeHeader(String(value)) === normalizeHeader('재고수량'));
}

function shouldUseGenericAdditionalStockHeaderKey(
  keys: string[],
  explicitAdditionalStockKey: string,
): boolean {
  if (explicitAdditionalStockKey) return false;

  const normalizedKeys = keys.map((key) => normalizeHeader(key));
  const hasAdditionalContext =
    normalizedKeys.includes(normalizeHeader('추가상품명')) &&
    (normalizedKeys.includes(normalizeHeader('추가상품값')) ||
      normalizedKeys.includes(normalizeHeader('추가상품가')) ||
      normalizedKeys.includes(normalizeHeader('추가상품가격')) ||
      normalizedKeys.includes(normalizeHeader('추가상품단일가격')));

  return hasAdditionalContext && normalizedKeys.includes(normalizeHeader('재고수량'));
}

function isSmartstoreBulkProductHeaderRow(headerRow: Record<string, unknown>): boolean {
  const requiredHeaders = [
    '상품번호',
    '판매가',
    '옵션번호',
    '옵션값',
    '옵션가',
    '옵션 재고수량',
    '즉시할인 값(기본할인)',
    '즉시할인 단위(기본할인)',
  ];

  return requiredHeaders.every((header) =>
    Object.values(headerRow).some((value) => normalizeHeader(String(value)) === normalizeHeader(header)),
  );
}

function buildStandardParsedRow(input: {
  row: Record<string, unknown>;
  rowNumber: number;
  sourceSheet: string;
  smartstoreIdKey: string;
  storeNameKey: string;
  channelProductNoKey: string;
  originProductNoKey: string;
  optionIdKey: string;
  sellerManagerCodeKey: string;
  optionNameKey: string;
  optionValueKey: string;
  baseSalePriceKey: string;
  sellerDiscountKey: string;
  sellerDiscountUnitKey: string;
  optionPriceKey: string;
  currentEffectiveOptionPriceKey: string;
  currentOptionStockQuantityKey: string;
  additionalPriceKey: string;
  additionalStockQuantityKey: string;
  memoKey: string;
  channelProductNoFromFileName: string;
}): OptionCurrentContextParsedRow {
  const {
    row,
    rowNumber,
    sourceSheet,
    smartstoreIdKey,
    storeNameKey,
    channelProductNoKey,
    originProductNoKey,
    optionIdKey,
    sellerManagerCodeKey,
    optionNameKey,
    optionValueKey,
    baseSalePriceKey,
    sellerDiscountKey,
    sellerDiscountUnitKey,
    optionPriceKey,
    currentEffectiveOptionPriceKey,
    currentOptionStockQuantityKey,
    additionalPriceKey,
    additionalStockQuantityKey,
    memoKey,
    channelProductNoFromFileName,
  } = input;

  const optionId = optionIdKey ? normalizeCell(row[optionIdKey]) : '';
  const sellerManagerCode = sellerManagerCodeKey ? normalizeCell(row[sellerManagerCodeKey]) : '';
  const optionValue = optionValueKey ? normalizeCell(row[optionValueKey]) : '';
  let identifierSource: OptionCurrentContextPreviewRow['identifierSource'] = 'MISSING';

  if (optionId) {
    identifierSource = 'OPTION_ID';
  } else if (sellerManagerCode) {
    identifierSource = 'SELLER_MANAGER_CODE';
  } else if (optionValue) {
    identifierSource = 'OPTION_VALUE';
  }

  return {
    rowNumber,
    originalRowNumber: rowNumber,
    sourceSheet,
    parserType: 'STANDARD',
    smartstoreId: smartstoreIdKey ? normalizeCell(row[smartstoreIdKey]) : '',
    storeName: storeNameKey ? normalizeCell(row[storeNameKey]) : '',
    channelProductNo: channelProductNoKey
      ? normalizeCell(row[channelProductNoKey])
      : channelProductNoFromFileName,
    originProductNo: originProductNoKey ? normalizeCell(row[originProductNoKey]) : '',
    optionId,
    identifierSource,
    sellerManagerCode,
    optionName: optionNameKey ? normalizeCell(row[optionNameKey]) : '',
    optionValue,
    baseSalePriceRaw: baseSalePriceKey ? normalizeCell(row[baseSalePriceKey]) : '',
    sellerDiscountRaw: sellerDiscountKey ? normalizeCell(row[sellerDiscountKey]) : '',
    sellerDiscountUnitRaw: sellerDiscountUnitKey ? normalizeCell(row[sellerDiscountUnitKey]) : '',
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
    channelProductNoDerivedFromFileName: !channelProductNoKey && Boolean(channelProductNoFromFileName),
    optionArrayLengthMismatch: false,
  };
}

function buildExplodedBulkProductRows(input: {
  row: Record<string, unknown>;
  rowNumber: number;
  sourceSheet: string;
  smartstoreIdKey: string;
  storeNameKey: string;
  channelProductNoKey: string;
  originProductNoKey: string;
  optionIdKey: string;
  sellerManagerCodeKey: string;
  optionNameKey: string;
  optionValueKey: string;
  baseSalePriceKey: string;
  sellerDiscountKey: string;
  sellerDiscountUnitKey: string;
  optionPriceKey: string;
  currentOptionStockQuantityKey: string;
  memoKey: string;
  channelProductNoFromFileName: string;
}): OptionCurrentContextParsedRow[] {
  const {
    row,
    rowNumber,
    sourceSheet,
    smartstoreIdKey,
    storeNameKey,
    channelProductNoKey,
    originProductNoKey,
    optionIdKey,
    sellerManagerCodeKey,
    optionNameKey,
    optionValueKey,
    baseSalePriceKey,
    sellerDiscountKey,
    sellerDiscountUnitKey,
    optionPriceKey,
    currentOptionStockQuantityKey,
    memoKey,
    channelProductNoFromFileName,
  } = input;

  const optionIds = splitDelimitedValues(optionIdKey ? normalizeCell(row[optionIdKey]) : '');
  const optionValues = splitMultilineValues(optionValueKey ? normalizeCell(row[optionValueKey]) : '');
  const optionPrices = splitDelimitedValues(optionPriceKey ? normalizeCell(row[optionPriceKey]) : '');
  const optionStocks = splitDelimitedValues(
    currentOptionStockQuantityKey ? normalizeCell(row[currentOptionStockQuantityKey]) : '',
  );

  const optionCount = Math.max(optionIds.length, optionValues.length, optionPrices.length, optionStocks.length);
  if (optionCount === 0) {
    return [];
  }

  const populatedLengths = [optionIds.length, optionValues.length, optionPrices.length, optionStocks.length].filter(
    (length) => length > 0,
  );
  const optionArrayLengthMismatch =
    populatedLengths.length > 1 && new Set(populatedLengths).size > 1;

  const sharedSellerManagerCode = sellerManagerCodeKey ? normalizeCell(row[sellerManagerCodeKey]) : '';
  const sharedOptionName = optionNameKey ? normalizeCell(row[optionNameKey]) : '';

  return Array.from({ length: optionCount }, (_, index) => {
    const optionId = optionIds[index] ?? '';
    const optionValue = optionValues[index] ?? '';
    const sellerManagerCode = sharedSellerManagerCode;
    let identifierSource: OptionCurrentContextPreviewRow['identifierSource'] = 'MISSING';

    if (optionId) {
      identifierSource = 'OPTION_ID';
    } else if (sellerManagerCode) {
      identifierSource = 'SELLER_MANAGER_CODE';
    } else if (optionValue) {
      identifierSource = 'OPTION_VALUE';
    }

    return {
      rowNumber: rowNumber * 1000 + index + 1,
      originalRowNumber: rowNumber,
      sourceSheet,
      parserType: 'SMARTSTORE_BULK_PRODUCT_EXPLODE',
      smartstoreId: smartstoreIdKey ? normalizeCell(row[smartstoreIdKey]) : '',
      storeName: storeNameKey ? normalizeCell(row[storeNameKey]) : '',
      channelProductNo: channelProductNoKey
        ? normalizeCell(row[channelProductNoKey])
        : channelProductNoFromFileName,
      originProductNo: originProductNoKey ? normalizeCell(row[originProductNoKey]) : '',
      optionId,
      identifierSource,
      sellerManagerCode,
      optionName: sharedOptionName,
      optionValue,
      baseSalePriceRaw: baseSalePriceKey ? normalizeCell(row[baseSalePriceKey]) : '',
      sellerDiscountRaw: sellerDiscountKey ? normalizeCell(row[sellerDiscountKey]) : '',
      sellerDiscountUnitRaw: sellerDiscountUnitKey ? normalizeCell(row[sellerDiscountUnitKey]) : '',
      optionPriceRaw: optionPrices[index] ?? '',
      currentEffectiveOptionPriceRaw: '',
      currentOptionStockQuantityRaw: optionStocks[index] ?? '',
      additionalPriceRaw: '',
      additionalStockQuantityRaw: '',
      memo: memoKey ? normalizeCell(row[memoKey]) : '',
      hasSellerDiscountColumn: Boolean(sellerDiscountKey),
      channelProductNoDerivedFromFileName: !channelProductNoKey && Boolean(channelProductNoFromFileName),
      optionArrayLengthMismatch,
    };
  });
}

function parseWorkbookRows(buffer: Buffer, fileName: string): OptionCurrentContextParsedRow[] {
  const workbook = readWorkbook(buffer, fileName);
  const parsedRows: OptionCurrentContextParsedRow[] = [];
  const channelProductNoFromFileName = extractChannelProductNoFromFileName(fileName);

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
    let sellerDiscountUnitKey = '';
    let optionPriceKey = '';
    let currentEffectiveOptionPriceKey = '';
    let currentOptionStockQuantityKey = '';
    let additionalPriceKey = '';
    let additionalStockQuantityKey = '';
    let memoKey = '';

    let dataRows: Record<string, unknown>[] = [];
    let startRowNumber = 2;
    let isSmartstoreBulkProductSheet = false;

    if (isDoubleHeader && sheetRows.length > 1) {
      const headerRow = sheetRows[0];
      isSmartstoreBulkProductSheet = isSmartstoreBulkProductHeaderRow(headerRow);
      smartstoreIdKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.smartstoreId);
      storeNameKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.storeName);
      channelProductNoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.channelProductNo);
      if (!channelProductNoKey) {
        channelProductNoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.channelProductNoAlt);
      }
      originProductNoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.originProductNo);
      optionIdKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionId);
      sellerManagerCodeKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.sellerManagerCode);
      optionNameKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionName);
      optionValueKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.optionValue);
      baseSalePriceKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.baseSalePrice);
      sellerDiscountKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.sellerDiscount);
      sellerDiscountUnitKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.sellerDiscountUnit);
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
      if (shouldUseGenericAdditionalStockKey(headerRow, additionalStockQuantityKey)) {
        additionalStockQuantityKey = findKeyByRowValue(headerRow, ['재고수량']);
      }
      memoKey = findKeyByRowValue(headerRow, HEADER_CANDIDATES.memo);
      dataRows = sheetRows.slice(1);
      startRowNumber = 3;
    } else {
      smartstoreIdKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.smartstoreId);
      storeNameKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.storeName);
      channelProductNoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.channelProductNo);
      if (!channelProductNoKey) {
        channelProductNoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.channelProductNoAlt);
      }
      originProductNoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.originProductNo);
      optionIdKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionId);
      sellerManagerCodeKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.sellerManagerCode);
      optionNameKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionName);
      optionValueKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionValue);
      baseSalePriceKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.baseSalePrice);
      sellerDiscountKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.sellerDiscount);
      sellerDiscountUnitKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.sellerDiscountUnit);
      optionPriceKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.optionPrice);
      currentEffectiveOptionPriceKey = findKeyByHeaderKeys(
        keys,
        HEADER_CANDIDATES.currentEffectiveOptionPrice,
      );
      currentOptionStockQuantityKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.currentOptionStockQuantity);
      additionalPriceKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.additionalPrice);
      additionalStockQuantityKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.additionalStockQuantity);
      if (shouldUseGenericAdditionalStockHeaderKey(keys, additionalStockQuantityKey)) {
        additionalStockQuantityKey = findKeyByHeaderKeys(keys, ['재고수량']);
      }
      memoKey = findKeyByHeaderKeys(keys, HEADER_CANDIDATES.memo);
      dataRows = sheetRows;
      startRowNumber = 2;
    }

    dataRows.forEach((row, index) => {
      if (isRequirementGuideRow(row) || isInstructionGuideRow(row)) {
        return;
      }
      const rowNumber = index + startRowNumber;

      if (isSmartstoreBulkProductSheet) {
        const explodedRows = buildExplodedBulkProductRows({
          row,
          rowNumber,
          sourceSheet: sheetName,
          smartstoreIdKey,
          storeNameKey,
          channelProductNoKey,
          originProductNoKey,
          optionIdKey,
          sellerManagerCodeKey,
          optionNameKey,
          optionValueKey,
          baseSalePriceKey,
          sellerDiscountKey,
          sellerDiscountUnitKey,
          optionPriceKey,
          currentOptionStockQuantityKey,
          memoKey,
          channelProductNoFromFileName,
        });

        if (explodedRows.length > 0) {
          parsedRows.push(...explodedRows.filter((parsedRow) => hasMeaningfulValue(parsedRow)));
          return;
        }
      }

      const parsedRow = buildStandardParsedRow({
        row,
        rowNumber,
        sourceSheet: sheetName,
        smartstoreIdKey,
        storeNameKey,
        channelProductNoKey,
        originProductNoKey,
        optionIdKey,
        sellerManagerCodeKey,
        optionNameKey,
        optionValueKey,
        baseSalePriceKey,
        sellerDiscountKey,
        sellerDiscountUnitKey,
        optionPriceKey,
        currentEffectiveOptionPriceKey,
        currentOptionStockQuantityKey,
        additionalPriceKey,
        additionalStockQuantityKey,
        memoKey,
        channelProductNoFromFileName,
      });

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
  if (row.parserType === 'SMARTSTORE_BULK_PRODUCT_EXPLODE') {
    return 'OPTION';
  }

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
    } else if (row.channelProductNoDerivedFromFileName) {
      warnings.push('channelProductNo를 파일명에서 추론했습니다. 업로드 전 상품번호를 다시 확인하세요.');
    }

    if (rowType === 'OPTION' && row.identifierSource === 'MISSING') {
      errors.push('OPTION 행은 optionId, sellerManagerCode, optionValue 중 하나 이상이 필요합니다.');
    }

    if (rowType === 'OPTION' && !row.optionId) {
      warnings.push('optionId 없음: 보조 식별자를 사용합니다.');
    }

    if (rowType === 'OPTION' && row.identifierSource === 'SELLER_MANAGER_CODE') {
      warnings.push('sellerManagerCode 보조 식별을 사용했습니다.');
    }

    if (rowType === 'OPTION' && row.identifierSource === 'OPTION_VALUE') {
      warnings.push('optionValue 보조 식별을 사용했습니다.');
    }

    if (row.optionArrayLengthMismatch) {
      warnings.push('옵션 배열 길이가 일치하지 않아 누락 값을 빈 값으로 보정했습니다.');
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
    const normalizedSellerDiscountUnit = normalizeHeader(row.sellerDiscountUnitRaw);
    const usesPercentSellerDiscount =
      normalizedSellerDiscountUnit === '%' ||
      normalizedSellerDiscountUnit === '퍼센트' ||
      normalizedSellerDiscountUnit === 'percent';

    if (usesPercentSellerDiscount) {
      warnings.push('판매자할인 단위가 %라서 판매가 - 판매자할인 + 옵션가 계산에 사용하지 않았습니다.');
      resolvedSellerDiscount = null;
    } else if (
      row.sellerDiscountUnitRaw &&
      normalizedSellerDiscountUnit !== '원' &&
      normalizedSellerDiscountUnit !== ''
    ) {
      warnings.push('판매자할인 단위를 해석할 수 없어 판매가 - 판매자할인 + 옵션가 계산에 사용하지 않았습니다.');
      resolvedSellerDiscount = null;
    }

    if (rowType === 'OPTION' && row.hasSellerDiscountColumn && resolvedSellerDiscount === null) {
      if (
        !usesPercentSellerDiscount &&
        (normalizedSellerDiscountUnit === '' || normalizedSellerDiscountUnit === '원')
      ) {
        resolvedSellerDiscount = 0;
      }
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
        priceSource =
          row.parserType === 'SMARTSTORE_BULK_PRODUCT_EXPLODE'
            ? 'CALCULATED_FROM_BULK_PRODUCT_ROW'
            : 'CALCULATED_FROM_BASE_DISCOUNT_OPTION';
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
      originalRowNumber: row.originalRowNumber,
      sourceSheet: row.sourceSheet,
      rowType,
      parserType: row.parserType,
      smartstoreId: row.smartstoreId || null,
      storeName: row.storeName || null,
      channelProductNo: row.channelProductNo || null,
      originProductNo: row.originProductNo || null,
      optionId: row.optionId || null,
      identifierSource: row.identifierSource,
      sellerManagerCode: row.sellerManagerCode || null,
      optionName: row.optionName || null,
      optionValue: row.optionValue || null,
      baseSalePrice: baseSalePrice.value,
      sellerDiscount: resolvedSellerDiscount,
      sellerDiscountUnit: row.sellerDiscountUnitRaw || null,
      optionPrice: optionPrice.value,
      calculatedEffectiveOptionPrice,
      currentEffectiveOptionPrice: resolvedCurrentEffectiveOptionPrice,
      currentOptionStockQuantity: currentOptionStockQuantity.value,
      additionalPrice: additionalPrice.value,
      additionalStockQuantity: additionalStockQuantity.value,
      optionArrayLengthMismatch: row.optionArrayLengthMismatch,
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
      (row) =>
        row.priceSource === 'CALCULATED_FROM_BASE_DISCOUNT_OPTION' ||
        row.priceSource === 'CALCULATED_FROM_BULK_PRODUCT_ROW',
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
    originalProductRows: new Set(
      rows
        .filter((row) => row.parserType === 'SMARTSTORE_BULK_PRODUCT_EXPLODE')
        .map((row) => `${row.sourceSheet ?? ''}:${row.originalRowNumber ?? row.rowNumber}`),
    ).size,
    explodedOptionRows: rows.filter((row) => row.parserType === 'SMARTSTORE_BULK_PRODUCT_EXPLODE').length,
    bulkProductExplodeAppliedRows: new Set(
      rows
        .filter((row) => row.parserType === 'SMARTSTORE_BULK_PRODUCT_EXPLODE')
        .map((row) => `${row.sourceSheet ?? ''}:${row.originalRowNumber ?? row.rowNumber}`),
    ).size,
    bulkProductExplodeApplied: rows.some((row) => row.parserType === 'SMARTSTORE_BULK_PRODUCT_EXPLODE'),
    rowsWithPercentDiscountWarning: rows.filter((row) =>
      row.warnings.some((warning) => warning.includes('판매자할인 단위가 %')),
    ).length,
    rowsWithOptionArrayLengthMismatch: rows.filter((row) => row.optionArrayLengthMismatch).length,
    rowsWithoutOptionId: rows.filter((row) => row.rowType === 'OPTION' && !row.optionId).length,
    rowsUsingSellerManagerCodeFallback: rows.filter(
      (row) => row.rowType === 'OPTION' && row.identifierSource === 'SELLER_MANAGER_CODE',
    ).length,
    missingChannelProductNo: rows.filter((row) => !row.channelProductNo).length,
    missingOptionIdentifier: rows.filter(
      (row) =>
        row.rowType === 'OPTION' &&
        row.identifierSource === 'MISSING',
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
