'use client';

import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import { UserSettingsProvider, useUserSettings } from '@/app/components/UserSettingsProvider';
import {
  getBackgroundThemeOption,
  getTmsComponentTokens,
  getScreenDensityTokens,
  getTableTextSizeTokens,
} from '@/src/utils/tms-user-settings';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { settings } = useUserSettings();
  const theme = getBackgroundThemeOption(settings.backgroundTheme);
  const componentTokens = getTmsComponentTokens(theme);
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
    '--tms-button-primary-bg': componentTokens.buttonPrimaryBg,
    '--tms-button-primary-text': componentTokens.buttonPrimaryText,
    '--tms-button-secondary-bg': componentTokens.buttonSecondaryBg,
    '--tms-button-secondary-text': componentTokens.buttonSecondaryText,
    '--tms-button-accent-bg': componentTokens.buttonAccentBg,
    '--tms-button-accent-text': componentTokens.buttonAccentText,
    '--tms-button-accent-hover-bg': componentTokens.buttonAccentHoverBg,
    '--tms-button-muted-bg': componentTokens.buttonMutedBg,
    '--tms-button-muted-text': componentTokens.buttonMutedText,
    '--tms-button-disabled-bg': componentTokens.buttonDisabledBg,
    '--tms-button-disabled-text': componentTokens.buttonDisabledText,
    '--tms-button-disabled-border': componentTokens.buttonDisabledBorder,
    '--tms-table-row-hover-bg': componentTokens.tableRowHoverBg,
    '--tms-table-row-hover-text': componentTokens.tableRowHoverText,
    '--tms-table-row-selected-bg': componentTokens.tableRowSelectedBg,
    '--tms-table-row-selected-text': componentTokens.tableRowSelectedText,
    '--tms-table-cell-text': componentTokens.tableCellText,
    '--tms-table-muted-text': componentTokens.tableMutedText,
    '--tms-table-border': componentTokens.tableBorder,
    '--tms-link': componentTokens.link,
    '--tms-link-hover': componentTokens.linkHover,
    '--tms-badge-bg': componentTokens.badgeBg,
    '--tms-badge-text': componentTokens.badgeText,
    '--tms-status-success-bg': componentTokens.statusSuccessBg,
    '--tms-status-success-text': componentTokens.statusSuccessText,
    '--tms-status-warning-bg': componentTokens.statusWarningBg,
    '--tms-status-warning-text': componentTokens.statusWarningText,
    '--tms-status-danger-bg': componentTokens.statusDangerBg,
    '--tms-status-danger-text': componentTokens.statusDangerText,
    '--tms-status-muted-bg': componentTokens.statusMutedBg,
    '--tms-status-muted-text': componentTokens.statusMutedText,
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
