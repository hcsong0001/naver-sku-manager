import {
  TMS_BACKGROUND_THEMES,
  TMS_DEFAULT_PAGE_SIZES,
  TMS_SCREEN_DENSITIES,
  TMS_TABLE_TEXT_SIZES,
  TMS_USER_SETTINGS_SCHEMA_VERSION,
  type TmsBackgroundTheme,
  type TmsBackgroundThemeOption,
  type TmsDefaultPageSize,
  type TmsScreenDensity,
  type TmsScreenDensityOption,
  type TmsTableTextSize,
  type TmsTableTextSizeOption,
  type TmsUserSettings,
} from '@/src/types/tms-user-settings.types';

export const TMS_BACKGROUND_THEME_OPTIONS: TmsBackgroundThemeOption[] = [
  {
    value: 'default',
    label: '기본',
    description: '현재 TMS 기본 다크 테마',
    colors: {
      appBackground: '#09090b',
      sidebarBackground: '#121214',
      sidebarText: '#e4e4e7',
      cardBackground: '#121214',
      cardMutedBackground: '#0c0c0e',
      text: '#f4f4f5',
      mutedText: '#a1a1aa',
      border: '#262629',
      inputBackground: '#0c0c0e',
      selectedBackground: 'rgba(99, 102, 241, 0.14)',
      selectedText: '#a5b4fc',
    },
  },
  {
    value: 'white',
    label: '화이트',
    description: '전체를 밝은 흰색 계열로 표시',
    colors: {
      appBackground: '#ffffff',
      sidebarBackground: '#ffffff',
      sidebarText: '#18181b',
      cardBackground: '#ffffff',
      cardMutedBackground: '#f6f7f9',
      text: '#18181b',
      mutedText: '#52525b',
      border: '#d4d4d8',
      inputBackground: '#f8fafc',
      selectedBackground: '#e0e7ff',
      selectedText: '#3730a3',
    },
  },
  {
    value: 'light-gray',
    label: '밝은 회색',
    description: '차분한 라이트 그레이 테마',
    colors: {
      appBackground: '#eef1f5',
      sidebarBackground: '#f5f7fa',
      sidebarText: '#1f2937',
      cardBackground: '#ffffff',
      cardMutedBackground: '#f7f8fb',
      text: '#111827',
      mutedText: '#6b7280',
      border: '#d7dce3',
      inputBackground: '#f8fafc',
      selectedBackground: '#dbeafe',
      selectedText: '#1d4ed8',
    },
  },
  {
    value: 'ivory',
    label: '아이보리',
    description: '밝은 크림/아이보리 계열 테마',
    colors: {
      appBackground: '#f6efe3',
      sidebarBackground: '#f3eadc',
      sidebarText: '#3f2f1f',
      cardBackground: '#fffaf1',
      cardMutedBackground: '#fbf4e8',
      text: '#2f2419',
      mutedText: '#7c6751',
      border: '#dfd0bb',
      inputBackground: '#fffdf7',
      selectedBackground: '#f0dfc5',
      selectedText: '#7c4a16',
    },
  },
  {
    value: 'light-blue',
    label: '연한 블루',
    description: '사이드바와 카드까지 함께 바뀌는 블루 톤',
    colors: {
      appBackground: '#e8f1fb',
      sidebarBackground: '#deebfa',
      sidebarText: '#1e3a5f',
      cardBackground: '#f5f9ff',
      cardMutedBackground: '#edf4ff',
      text: '#1f2f46',
      mutedText: '#5d7493',
      border: '#c6d7ef',
      inputBackground: '#fcfdff',
      selectedBackground: '#cfe0ff',
      selectedText: '#1d4ed8',
    },
  },
  {
    value: 'light-green',
    label: '연한 그린',
    description: '은은한 민트/그린 계열 테마',
    colors: {
      appBackground: '#eaf5ef',
      sidebarBackground: '#e1f0e7',
      sidebarText: '#1f4d36',
      cardBackground: '#f7fcf8',
      cardMutedBackground: '#eef8f1',
      text: '#1f3428',
      mutedText: '#587164',
      border: '#c7dccf',
      inputBackground: '#fcfffd',
      selectedBackground: '#d4efdc',
      selectedText: '#166534',
    },
  },
  {
    value: 'dark',
    label: '다크',
    description: '보다 진한 어두운 톤 테마',
    colors: {
      appBackground: '#050507',
      sidebarBackground: '#0b0b0d',
      sidebarText: '#f4f4f5',
      cardBackground: '#111113',
      cardMutedBackground: '#0a0a0c',
      text: '#fafafa',
      mutedText: '#a1a1aa',
      border: '#202026',
      inputBackground: '#09090b',
      selectedBackground: 'rgba(99, 102, 241, 0.18)',
      selectedText: '#c7d2fe',
    },
  },
];

export const DEFAULT_TMS_USER_SETTINGS: TmsUserSettings = {
  schemaVersion: TMS_USER_SETTINGS_SCHEMA_VERSION,
  backgroundTheme: 'default',
  tableTextSize: 'normal',
  screenDensity: 'normal',
  defaultPageSize: 10,
};

export function isTmsBackgroundTheme(value: unknown): value is TmsBackgroundTheme {
  return typeof value === 'string' && TMS_BACKGROUND_THEMES.includes(value as TmsBackgroundTheme);
}

export function isTmsTableTextSize(value: unknown): value is TmsTableTextSize {
  return typeof value === 'string' && TMS_TABLE_TEXT_SIZES.includes(value as TmsTableTextSize);
}

export function isTmsScreenDensity(value: unknown): value is TmsScreenDensity {
  return typeof value === 'string' && TMS_SCREEN_DENSITIES.includes(value as TmsScreenDensity);
}

export function isTmsDefaultPageSize(value: unknown): value is TmsDefaultPageSize {
  return typeof value === 'number' && TMS_DEFAULT_PAGE_SIZES.includes(value as TmsDefaultPageSize);
}

function normalizeLegacyTableTextSize(value: unknown): TmsTableTextSize | null {
  if (value === 'sm') return 'small';
  if (value === 'md') return 'normal';
  if (value === 'lg') return 'large';
  return null;
}

function normalizeLegacyScreenDensity(value: unknown): TmsScreenDensity | null {
  if (value === 'comfortable' || value === 'normal' || value === 'compact') {
    return value;
  }
  return null;
}

export function normalizeTmsUserSettings(value: unknown): TmsUserSettings {
  if (typeof value !== 'object' || value === null) {
    return DEFAULT_TMS_USER_SETTINGS;
  }

  const record = value as Record<string, unknown>;
  return {
    ...DEFAULT_TMS_USER_SETTINGS,
    schemaVersion: typeof record.schemaVersion === 'number'
      ? record.schemaVersion
      : TMS_USER_SETTINGS_SCHEMA_VERSION,
    backgroundTheme: isTmsBackgroundTheme(record.backgroundTheme)
      ? record.backgroundTheme
      : DEFAULT_TMS_USER_SETTINGS.backgroundTheme,
    tableTextSize: isTmsTableTextSize(record.tableTextSize)
      ? record.tableTextSize
      : normalizeLegacyTableTextSize(record.tableFontSize) ?? DEFAULT_TMS_USER_SETTINGS.tableTextSize,
    screenDensity: isTmsScreenDensity(record.screenDensity)
      ? record.screenDensity
      : normalizeLegacyScreenDensity(record.density) ?? DEFAULT_TMS_USER_SETTINGS.screenDensity,
    defaultPageSize: isTmsDefaultPageSize(Number(record.defaultPageSize))
      ? Number(record.defaultPageSize) as TmsDefaultPageSize
      : DEFAULT_TMS_USER_SETTINGS.defaultPageSize,
    darkMode: typeof record.darkMode === 'boolean' ? record.darkMode : undefined,
    sidebarCollapsed: typeof record.sidebarCollapsed === 'boolean' ? record.sidebarCollapsed : undefined,
    defaultStartPage: typeof record.defaultStartPage === 'string' ? record.defaultStartPage : undefined,
  };
}

export function parseTmsUserSettings(raw: string | null): TmsUserSettings {
  if (!raw) return DEFAULT_TMS_USER_SETTINGS;

  try {
    return normalizeTmsUserSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_TMS_USER_SETTINGS;
  }
}

export function serializeTmsUserSettings(settings: TmsUserSettings): string {
  return JSON.stringify({
    ...DEFAULT_TMS_USER_SETTINGS,
    ...settings,
    schemaVersion: TMS_USER_SETTINGS_SCHEMA_VERSION,
  });
}

export function getBackgroundThemeOption(theme: TmsBackgroundTheme): TmsBackgroundThemeOption {
  return TMS_BACKGROUND_THEME_OPTIONS.find((option) => option.value === theme)
    ?? TMS_BACKGROUND_THEME_OPTIONS[0];
}

export const TMS_TABLE_TEXT_SIZE_OPTIONS: TmsTableTextSizeOption[] = [
  { value: 'small', label: '작게', description: '표 목록을 더 촘촘하게 표시합니다.' },
  { value: 'normal', label: '기본', description: '기본 테이블 글자 크기입니다.' },
  { value: 'large', label: '크게', description: '행과 숫자를 조금 더 크게 표시합니다.' },
];

export const TMS_SCREEN_DENSITY_OPTIONS: TmsScreenDensityOption[] = [
  { value: 'comfortable', label: '여유', description: '카드와 행 간격을 넉넉하게 표시합니다.' },
  { value: 'normal', label: '기본', description: '현재 기본 밀도입니다.' },
  { value: 'compact', label: '촘촘', description: '더 많은 정보를 한 화면에 표시합니다.' },
];

export const TMS_DEFAULT_PAGE_SIZE_OPTIONS: TmsDefaultPageSize[] = [10, 20, 50, 100];

export function getTableTextSizeTokens(size: TmsTableTextSize): {
  tableFontSize: string;
  tableLineHeight: string;
} {
  switch (size) {
    case 'small':
      return {
        tableFontSize: '0.75rem',
        tableLineHeight: '1.25rem',
      };
    case 'large':
      return {
        tableFontSize: '0.95rem',
        tableLineHeight: '1.5rem',
      };
    case 'normal':
    default:
      return {
        tableFontSize: '0.875rem',
        tableLineHeight: '1.375rem',
      };
  }
}

export function getScreenDensityTokens(density: TmsScreenDensity): {
  rowPaddingY: string;
  cardPadding: string;
  filterGap: string;
  controlHeight: string;
  controlPaddingX: string;
} {
  switch (density) {
    case 'comfortable':
      return {
        rowPaddingY: '1rem',
        cardPadding: '1.5rem',
        filterGap: '1rem',
        controlHeight: '2.75rem',
        controlPaddingX: '1rem',
      };
    case 'compact':
      return {
        rowPaddingY: '0.5rem',
        cardPadding: '0.875rem',
        filterGap: '0.625rem',
        controlHeight: '2.125rem',
        controlPaddingX: '0.75rem',
      };
    case 'normal':
    default:
      return {
        rowPaddingY: '0.75rem',
        cardPadding: '1.25rem',
        filterGap: '0.875rem',
        controlHeight: '2.5rem',
        controlPaddingX: '0.875rem',
      };
  }
}
