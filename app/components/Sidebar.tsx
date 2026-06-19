"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Database,
  ShoppingBag,
  History,
  TrendingUp,
  Settings,
  Store,
  User,
  FileSpreadsheet,
  Search,
  Upload,
  PackageCheck,
  ShieldAlert,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "스토어 관리", href: "/dashboard/smartstores", icon: Store },
  { name: "SKU 관리", href: "/dashboard/skus", icon: Database },
  { name: "상품 수집", href: "/dashboard/products", icon: ShoppingBag },
  { name: "상품 대량 수집", href: "/dashboard/product-collection", icon: ShoppingBag },
  { name: "SKU 매핑", href: "/dashboard/sku-mappings", icon: FileSpreadsheet },
  { name: "SKU 코드/키워드", href: "/dashboard/sku-aliases", icon: FileSpreadsheet },
  { name: "SKU 바코드", href: "/dashboard/sku-barcodes", icon: FileSpreadsheet },
  { name: "키워드 자동매칭", href: "/dashboard/sku-keyword-matching", icon: Search },
  { name: "OPTION 현재 문맥", href: "/dashboard/option-current-context", icon: ScanSearch },
  { name: "전체 데이터 Import", href: "/dashboard/staging-import", icon: Upload },
  { name: "전체 매핑 Preview", href: "/dashboard/staging-mapping-preview", icon: Search },
  { name: "가격/재고 수정 Preview", href: "/dashboard/bulk-update-preview", icon: PackageCheck },
  { name: "위험 후보 정리", href: "/dashboard/mapping-risk-resolution", icon: ShieldAlert },
  { name: "재고 이력", href: "/inventory-log", icon: History },
  { name: "가격 이력", href: "/price-log", icon: TrendingUp },
  { name: "설정", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [logoError, setLogoError] = React.useState(false);

  return (
    <aside className="w-64 shrink-0 border-r tms-sidebar flex h-full flex-col">
      {/* 브랜드 헤더 */}
      <div className="flex h-16 items-center gap-3 border-b px-6 tms-border-color">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border tms-border-soft tms-selected-bg">
          {logoError ? (
            <div className="flex h-full w-full items-center justify-center text-xs font-bold tms-selected-text">
              TMS
            </div>
          ) : (
            <Image
              src="/tooltalk-logo.png"
              alt="Tooltalk 로고"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-semibold tracking-wide tms-text-primary">
            TMS
          </h1>
          <p className="truncate text-[10px] font-medium tms-text-muted">
            Tooltalk Management System
          </p>
        </div>
      </div>

      {/* 내비게이션 메뉴 */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`tms-sidebar-link group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "is-active tms-selected-bg tms-selected-text tms-border-soft shadow-[0_0_15px_rgba(99,102,241,0.05)]"
                  : "border-transparent tms-text-muted"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "tms-selected-text" : "tms-text-muted"
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 사용자 영역 */}
      <div className="border-t p-4 tms-border-color" style={{ backgroundColor: 'color-mix(in srgb, var(--tms-card-muted-bg) 80%, transparent)' }}>
        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
          <div className="rounded-full border p-2 tms-border-soft" style={{ backgroundColor: 'color-mix(in srgb, var(--tms-card-bg) 85%, black 15%)' }}>
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold tms-text-primary">
              hcsong0001
            </p>
            <p className="truncate text-[10px] tms-text-muted">
              스토어 관리자
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
