'use client';

import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import { UserSettingsProvider, useUserSettings } from '@/app/components/UserSettingsProvider';
import { getBackgroundThemeOption } from '@/src/utils/tms-user-settings';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { settings } = useUserSettings();
  const theme = getBackgroundThemeOption(settings.backgroundTheme);
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
