export const TMS_USER_SETTINGS_SCHEMA_VERSION = 1;
export const TMS_USER_SETTINGS_STORAGE_KEY = 'tmsUserSettings';

export const TMS_BACKGROUND_THEMES = [
  'default',
  'white',
  'light-gray',
  'ivory',
  'light-blue',
  'light-green',
  'dark',
] as const;

export const TMS_TABLE_TEXT_SIZES = ['small', 'normal', 'large'] as const;
export const TMS_SCREEN_DENSITIES = ['comfortable', 'normal', 'compact'] as const;
export const TMS_DEFAULT_PAGE_SIZES = [10, 20, 50, 100] as const;

export type TmsBackgroundTheme = (typeof TMS_BACKGROUND_THEMES)[number];
export type TmsTableTextSize = (typeof TMS_TABLE_TEXT_SIZES)[number];
export type TmsScreenDensity = (typeof TMS_SCREEN_DENSITIES)[number];
export type TmsDefaultPageSize = (typeof TMS_DEFAULT_PAGE_SIZES)[number];

export type TmsUserSettings = {
  schemaVersion: number;
  backgroundTheme: TmsBackgroundTheme;
  tableTextSize: TmsTableTextSize;
  screenDensity: TmsScreenDensity;
  defaultPageSize: TmsDefaultPageSize;
  darkMode?: boolean;
  sidebarCollapsed?: boolean;
  defaultStartPage?: string;
};

export type TmsBackgroundThemeOption = {
  value: TmsBackgroundTheme;
  label: string;
  description: string;
  colors: {
    appBackground: string;
    sidebarBackground: string;
    sidebarText: string;
    cardBackground: string;
    cardMutedBackground: string;
    text: string;
    mutedText: string;
    border: string;
    inputBackground: string;
    selectedBackground: string;
    selectedText: string;
  };
};

export type TmsTableTextSizeOption = {
  value: TmsTableTextSize;
  label: string;
  description: string;
};

export type TmsScreenDensityOption = {
  value: TmsScreenDensity;
  label: string;
  description: string;
};
