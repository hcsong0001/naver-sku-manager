'use client';

import { CheckCircle2, Palette, Rows3, Settings2, TableProperties } from 'lucide-react';
import { useUserSettings } from '@/app/components/UserSettingsProvider';
import { TMS_USER_SETTINGS_SCHEMA_VERSION } from '@/src/types/tms-user-settings.types';
import {
  TMS_BACKGROUND_THEME_OPTIONS,
  TMS_DEFAULT_PAGE_SIZE_OPTIONS,
  TMS_SCREEN_DENSITY_OPTIONS,
  TMS_TABLE_TEXT_SIZE_OPTIONS,
  getBackgroundThemeOption,
} from '@/src/utils/tms-user-settings';

export default function DashboardSettingsPage() {
  const {
    settings,
    setBackgroundTheme,
    setDefaultPageSize,
    setScreenDensity,
    setTableTextSize,
  } = useUserSettings();
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

        <section className="tms-panel rounded-lg border border-[#262629] bg-[#121214]">
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

        <section className="tms-panel rounded-lg border border-[#262629] bg-[#121214]">
          <div className="flex items-center gap-2">
            <TableProperties className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">테이블 글자 크기</h2>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            staging/import/preview/위험 후보 표의 기본 글자 크기를 즉시 반영합니다.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {TMS_TABLE_TEXT_SIZE_OPTIONS.map((option) => {
              const selected = settings.tableTextSize === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTableTextSize(option.value)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selected
                      ? 'border-indigo-500/40 bg-indigo-500/10'
                      : 'border-[#333] bg-[#0c0c0e] hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{option.label}</p>
                      <p className="mt-1 text-xs text-zinc-500">{option.description}</p>
                    </div>
                    {selected && <CheckCircle2 className="h-5 w-5 text-indigo-300" />}
                  </div>
                  <div className="mt-4 rounded-lg border border-[#333] bg-[#0c0c0e] px-3 py-3">
                    <div className={`grid gap-2 ${option.value === 'large' ? 'text-base' : option.value === 'small' ? 'text-xs' : 'text-sm'}`}>
                      <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3">
                        <span className="text-zinc-500">상품명</span>
                        <span className="text-zinc-200">A-5 1000pcs 3종세트</span>
                      </div>
                      <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3">
                        <span className="text-zinc-500">SKU</span>
                        <span className="font-mono text-zinc-200">RS13-0610 / RS13-0810 / RS13-1010</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="tms-panel rounded-lg border border-[#262629] bg-[#121214]">
          <div className="flex items-center gap-2">
            <Rows3 className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">화면 밀도</h2>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            카드 padding, 필터 간격, 표 row 높이, 버튼/입력 높이를 함께 조정합니다.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {TMS_SCREEN_DENSITY_OPTIONS.map((option) => {
              const selected = settings.screenDensity === option.value;
              const previewPadding = option.value === 'comfortable' ? 'p-4' : option.value === 'compact' ? 'p-2' : 'p-3';
              const previewGap = option.value === 'comfortable' ? 'gap-3' : option.value === 'compact' ? 'gap-1.5' : 'gap-2';
              const previewHeight = option.value === 'comfortable' ? 'h-11' : option.value === 'compact' ? 'h-8' : 'h-10';
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setScreenDensity(option.value)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selected
                      ? 'border-indigo-500/40 bg-indigo-500/10'
                      : 'border-[#333] bg-[#0c0c0e] hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{option.label}</p>
                      <p className="mt-1 text-xs text-zinc-500">{option.description}</p>
                    </div>
                    {selected && <CheckCircle2 className="h-5 w-5 text-indigo-300" />}
                  </div>
                  <div className={`mt-4 rounded-lg border border-[#333] bg-[#0c0c0e] ${previewPadding}`}>
                    <div className={`flex flex-col ${previewGap}`}>
                      <div className={`rounded-md border border-[#333] bg-[#121214] ${previewPadding}`}>
                        <div className={`flex items-center ${previewGap}`}>
                          <div className={`w-20 rounded-md bg-indigo-500/15 ${previewHeight}`} />
                          <div className={`flex-1 rounded-md bg-zinc-700/30 ${previewHeight}`} />
                        </div>
                      </div>
                      <div className={`rounded-md border border-[#333] bg-[#121214] ${previewPadding}`}>
                        <div className={`grid grid-cols-2 ${previewGap}`}>
                          <div className={`rounded-md bg-zinc-700/30 ${previewHeight}`} />
                          <div className={`rounded-md bg-zinc-700/30 ${previewHeight}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="tms-panel rounded-lg border border-[#262629] bg-[#121214]">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">기본 페이지 표시 개수</h2>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            각 화면이 처음 열릴 때 사용할 기본 pageSize입니다. 화면에서 직접 바꾼 값은 해당 화면에서 우선 적용됩니다.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {TMS_DEFAULT_PAGE_SIZE_OPTIONS.map((option) => {
              const selected = settings.defaultPageSize === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDefaultPageSize(option)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selected
                      ? 'border-indigo-500/40 bg-indigo-500/10'
                      : 'border-[#333] bg-[#0c0c0e] hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{option}개</p>
                      <p className="mt-1 text-xs text-zinc-500">초기 목록 표시 개수</p>
                    </div>
                    {selected && <CheckCircle2 className="h-5 w-5 text-indigo-300" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="tms-panel rounded-lg border border-[#262629] bg-[#121214]">
          <h2 className="text-lg font-semibold text-white">현재 저장 값</h2>
          <div className="mt-4 rounded-lg border border-[#333] bg-[#0c0c0e] p-4">
            <pre className="overflow-x-auto text-xs leading-6 text-zinc-300">{JSON.stringify({
              schemaVersion: TMS_USER_SETTINGS_SCHEMA_VERSION,
              backgroundTheme: settings.backgroundTheme,
              tableTextSize: settings.tableTextSize,
              screenDensity: settings.screenDensity,
              defaultPageSize: settings.defaultPageSize,
            }, null, 2)}</pre>
          </div>
          <div className="mt-4 rounded-lg border border-[#262629] bg-[#0c0c0e] p-4 text-sm text-zinc-400">
            <p>현재 적용 테마: <span className="font-semibold text-zinc-200">{currentTheme.label}</span></p>
            <p className="mt-2">
              테이블 글자 크기 <span className="font-semibold text-zinc-200">{settings.tableTextSize}</span> ·
              화면 밀도 <span className="font-semibold text-zinc-200">{settings.screenDensity}</span> ·
              기본 페이지 표시 개수 <span className="font-semibold text-zinc-200">{settings.defaultPageSize}개</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
