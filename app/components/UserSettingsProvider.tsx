'use client';

import React from 'react';
import {
  TMS_USER_SETTINGS_STORAGE_KEY,
  type TmsBackgroundTheme,
  type TmsDefaultPageSize,
  type TmsScreenDensity,
  type TmsTableTextSize,
  type TmsUserSettings,
} from '@/src/types/tms-user-settings.types';
import {
  DEFAULT_TMS_USER_SETTINGS,
  getBackgroundThemeOption,
  parseTmsUserSettings,
  serializeTmsUserSettings,
} from '@/src/utils/tms-user-settings';

type UserSettingsContextValue = {
  settings: TmsUserSettings;
  setBackgroundTheme: (theme: TmsBackgroundTheme) => void;
  setTableTextSize: (size: TmsTableTextSize) => void;
  setScreenDensity: (density: TmsScreenDensity) => void;
  setDefaultPageSize: (size: TmsDefaultPageSize) => void;
};

const UserSettingsContext = React.createContext<UserSettingsContextValue | null>(null);
const SETTINGS_EVENT_NAME = 'tms-user-settings-change';
const SERVER_SETTINGS_SNAPSHOT = DEFAULT_TMS_USER_SETTINGS;

let lastSettingsRaw: string | null = null;
let lastSettingsSnapshot: TmsUserSettings = DEFAULT_TMS_USER_SETTINGS;

function readSettingsSnapshot(): TmsUserSettings {
  if (typeof window === 'undefined') {
    return SERVER_SETTINGS_SNAPSHOT;
  }

  const raw = window.localStorage.getItem(TMS_USER_SETTINGS_STORAGE_KEY);
  if (raw === lastSettingsRaw) {
    return lastSettingsSnapshot;
  }

  lastSettingsRaw = raw;
  lastSettingsSnapshot = parseTmsUserSettings(raw);
  return lastSettingsSnapshot;
}

function getServerSettingsSnapshot(): TmsUserSettings {
  return SERVER_SETTINGS_SNAPSHOT;
}

function writeSettingsSnapshot(nextSettings: TmsUserSettings): void {
  const serialized = serializeTmsUserSettings(nextSettings);
  window.localStorage.setItem(TMS_USER_SETTINGS_STORAGE_KEY, serialized);
  lastSettingsRaw = serialized;
  lastSettingsSnapshot = parseTmsUserSettings(serialized);
}

function dispatchSettingsChange(): void {
  window.dispatchEvent(new Event(SETTINGS_EVENT_NAME));
}

export function UserSettingsProvider({ children }: { children: React.ReactNode }) {
  const subscribe = React.useCallback((callback: () => void) => {
    if (typeof window === 'undefined') {
      return () => undefined;
    }

    const handleChange = () => callback();
    window.addEventListener('storage', handleChange);
    window.addEventListener(SETTINGS_EVENT_NAME, handleChange);
    return () => {
      window.removeEventListener('storage', handleChange);
      window.removeEventListener(SETTINGS_EVENT_NAME, handleChange);
    };
  }, []);

  const settings = React.useSyncExternalStore(
    subscribe,
    readSettingsSnapshot,
    getServerSettingsSnapshot,
  );

  React.useEffect(() => {
    const theme = getBackgroundThemeOption(settings.backgroundTheme);
    document.body.style.backgroundColor = theme.colors.appBackground;
    document.documentElement.style.setProperty('--tms-app-background', theme.colors.appBackground);
  }, [settings]);

  const updateSettings = React.useCallback((updater: (current: TmsUserSettings) => TmsUserSettings) => {
    const nextSettings = {
      ...updater(settings),
      schemaVersion: DEFAULT_TMS_USER_SETTINGS.schemaVersion,
    };
    writeSettingsSnapshot(nextSettings);
    dispatchSettingsChange();
  }, [settings]);

  const value = React.useMemo<UserSettingsContextValue>(() => ({
    settings,
    setBackgroundTheme: (theme) => {
      updateSettings((current) => ({
        ...current,
        backgroundTheme: theme,
      }));
    },
    setTableTextSize: (size) => {
      updateSettings((current) => ({
        ...current,
        tableTextSize: size,
      }));
    },
    setScreenDensity: (density) => {
      updateSettings((current) => ({
        ...current,
        screenDensity: density,
      }));
    },
    setDefaultPageSize: (size) => {
      updateSettings((current) => ({
        ...current,
        defaultPageSize: size,
      }));
    },
  }), [settings, updateSettings]);

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings(): UserSettingsContextValue {
  const context = React.useContext(UserSettingsContext);
  if (!context) {
    throw new Error('UserSettingsProvider 내부에서만 useUserSettings를 사용할 수 있습니다.');
  }
  return context;
}
