"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Database,
  ShoppingBag,
  History,
  TrendingUp,
  Settings,
  Boxes,
  Store,
  User,
  FileSpreadsheet,
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
  { name: "SKU 관리", href: "/sku", icon: Database },
  { name: "상품 수집", href: "/dashboard/products", icon: ShoppingBag },
  { name: "SKU 매핑", href: "/dashboard/sku-mappings", icon: FileSpreadsheet },
  { name: "재고 이력", href: "/inventory-log", icon: History },
  { name: "가격 이력", href: "/price-log", icon: TrendingUp },
  { name: "설정", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#121214] border-r border-[#262629] flex flex-col h-full shrink-0">
        {/* 브랜드 헤더 */}
      <div className="h-16 flex items-center px-6 border-b border-[#262629] gap-3">
        <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30 text-indigo-400">
          <Boxes className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-zinc-100 tracking-wide">
            NAVER SKU
          </h1>
          <span className="text-[10px] text-zinc-500 font-medium">
            관리자
          </span>
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] border border-transparent"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-300"
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 사용자 영역 */}
      <div className="p-4 border-t border-[#262629] bg-[#0c0c0e]/50">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1e] transition-colors cursor-pointer">
          <div className="bg-zinc-800 p-2 rounded-full text-zinc-400 border border-zinc-700/50">
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-zinc-200 truncate">
              hcsong0001
            </p>
            <p className="text-[10px] text-zinc-500 truncate">
              스토어 관리자
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
