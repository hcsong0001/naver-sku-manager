'use client';

import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import { UserSettingsProvider, useUserSettings } from '@/app/components/UserSettingsProvider';
import {
  getBackgroundThemeOption,
  getScreenDensityTokens,
  getTableTextSizeTokens,
} from '@/src/utils/tms-user-settings';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { settings } = useUserSettings();
  const theme = getBackgroundThemeOption(settings.backgroundTheme);
  const tableTextSize = getTableTextSizeTokens(settings.tableTextSize);
  const screenDensity = getScreenDensityTokens(settings.screenDensity);
  const shellStyle = {
    '--tms-bg': theme.colors.appBackground,
    '--tms-sidebar-bg': theme.colors.sidebarBackground,
    '--tms-sidebar-text': theme.colors.sidebarText,
    '--tms-card-bg': theme.colors.cardBackground,
    '--tms-card-muted-bg': theme.colors.cardMutedBackground,
    '--tms-text': theme.colors.text,
    '--tms-muted-text': theme.colors.mutedText,
    '--tms-border': theme.colors.border,
    '--tms-input-bg': theme.colors.inputBackground,
    '--tms-selected-bg': theme.colors.selectedBackground,
    '--tms-selected-text': theme.colors.selectedText,
    '--tms-table-font-size': tableTextSize.tableFontSize,
    '--tms-table-line-height': tableTextSize.tableLineHeight,
    '--tms-row-padding-y': screenDensity.rowPaddingY,
    '--tms-card-padding': screenDensity.cardPadding,
    '--tms-filter-gap': screenDensity.filterGap,
    '--tms-control-height': screenDensity.controlHeight,
    '--tms-control-padding-x': screenDensity.controlPaddingX,
  } as React.CSSProperties;

  return (
    <div
      className="tms-theme-shell flex h-full overflow-hidden"
      style={shellStyle}
    >
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserSettingsProvider>
      <ShellContent>{children}</ShellContent>
    </UserSettingsProvider>
  );
}
