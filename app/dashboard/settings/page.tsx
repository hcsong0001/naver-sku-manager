'use client';

import { CheckCircle2, Palette, Settings2 } from 'lucide-react';
import { useUserSettings } from '@/app/components/UserSettingsProvider';
import { TMS_USER_SETTINGS_SCHEMA_VERSION } from '@/src/types/tms-user-settings.types';
import {
  TMS_BACKGROUND_THEME_OPTIONS,
  getBackgroundThemeOption,
} from '@/src/utils/tms-user-settings';

export default function DashboardSettingsPage() {
  const { settings, setBackgroundTheme } = useUserSettings();
  const currentTheme = getBackgroundThemeOption(settings.backgroundTheme);

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-[1200px] space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2">
            <Settings2 className="h-6 w-6 text-indigo-300" />
            <h1 className="text-3xl font-bold text-white">설정</h1>
          </div>
          <p className="text-sm text-zinc-400">
            TMS 화면 표시 방식을 브라우저 기준으로 저장합니다. 현재 설정은 운영 DB에 저장되지 않습니다.
          </p>
        </header>

        <section className="rounded-lg border border-[#262629] bg-[#121214] p-5 lg:p-6">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">바탕화면 색상</h2>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            선택한 배경색은 `localStorage`의 `tmsUserSettings`에 저장되며, dashboard 전체 영역에 즉시 반영됩니다.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {TMS_BACKGROUND_THEME_OPTIONS.map((theme) => {
              const selected = settings.backgroundTheme === theme.value;
              return (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => setBackgroundTheme(theme.value)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selected
                      ? 'border-indigo-500/40 bg-indigo-500/10'
                      : 'border-[#333] bg-[#0c0c0e] hover:border-zinc-500'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-100">{theme.label}</p>
                        <p className="mt-1 text-xs text-zinc-500">{theme.description}</p>
                      </div>
                      {selected && <CheckCircle2 className="h-5 w-5 text-indigo-300" />}
                    </div>

                    <div
                      className="overflow-hidden rounded-lg border"
                      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.appBackground }}
                    >
                      <div
                        className="flex items-center justify-between border-b px-3 py-2"
                        style={{ backgroundColor: theme.colors.sidebarBackground, borderColor: theme.colors.border }}
                      >
                        <div>
                          <p className="text-xs font-semibold" style={{ color: theme.colors.sidebarText }}>TMS</p>
                          <p className="text-[10px]" style={{ color: theme.colors.mutedText }}>Tooltalk Management System</p>
                        </div>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ backgroundColor: theme.colors.selectedBackground, color: theme.colors.selectedText }}
                        >
                          메뉴
                        </span>
                      </div>
                      <div className="grid gap-2 p-3" style={{ backgroundColor: theme.colors.appBackground }}>
                        <div
                          className="rounded-md border p-3"
                          style={{ backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }}
                        >
                          <p className="text-xs font-semibold" style={{ color: theme.colors.text }}>카드/패널</p>
                          <p className="mt-1 text-[10px]" style={{ color: theme.colors.mutedText }}>본문과 보조 설명 색상</p>
                        </div>
                        <div
                          className="rounded-md border px-3 py-2 text-xs"
                          style={{ backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.border, color: theme.colors.text }}
                        >
                          입력/선택 박스 미리보기
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-[#262629] bg-[#121214] p-5 lg:p-6">
          <h2 className="text-lg font-semibold text-white">현재 저장 값</h2>
          <div className="mt-4 rounded-lg border border-[#333] bg-[#0c0c0e] p-4">
            <pre className="overflow-x-auto text-xs leading-6 text-zinc-300">{JSON.stringify({
              schemaVersion: TMS_USER_SETTINGS_SCHEMA_VERSION,
              backgroundTheme: settings.backgroundTheme,
            }, null, 2)}</pre>
          </div>
          <div className="mt-4 rounded-lg border border-[#262629] bg-[#0c0c0e] p-4 text-sm text-zinc-400">
            <p>현재 적용 테마: <span className="font-semibold text-zinc-200">{currentTheme.label}</span></p>
            <p className="mt-2">향후 이 구조에 화면 밀도, 기본 페이지 크기, 테이블 글자 크기, 다크모드, 사이드바 상태, 시작 페이지를 추가할 수 있습니다.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
