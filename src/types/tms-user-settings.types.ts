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

export type TmsBackgroundTheme = (typeof TMS_BACKGROUND_THEMES)[number];

export type TmsUserSettings = {
  schemaVersion: number;
  backgroundTheme: TmsBackgroundTheme;
  density?: 'comfortable' | 'compact';
  defaultPageSize?: 10 | 20 | 50 | 100;
  tableFontSize?: 'sm' | 'md' | 'lg';
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
