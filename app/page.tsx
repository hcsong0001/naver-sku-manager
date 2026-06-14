"use client";

import React, { useState } from "react";
import {
  Boxes,
  Store,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

// Mock Data
const initialStores = [
  {
    id: "store-1",
    name: "네이버 스마트스토어 공식몰",
    sellerId: "naver_sku_main",
    productCount: 85,
    status: "ACTIVE", // ACTIVE, PENDING, ERROR
    lastSync: "3분 전",
  },
  {
    id: "store-2",
    name: "네이버 스마트스토어 리빙관",
    sellerId: "naver_sku_living",
    productCount: 43,
    status: "PENDING",
    lastSync: "1시간 전",
  },
];

const initialProducts = [
  {
    id: "prod-1",
    name: "2026 S/S 와이드 데님 팬츠 (블랙/L)",
    skuCode: "PNT-DENM-01",
    storeName: "공식몰",
    price: 38000,
    stock: 142,
    status: "IN_STOCK", // IN_STOCK, LOW_STOCK, OUT_OF_STOCK
  },
  {
    id: "prod-2",
    name: "친환경 세라믹 리빙 머그컵 (아이보리)",
    skuCode: "MUG-CRM-09",
    storeName: "리빙관",
    price: 15500,
    stock: 4,
    status: "LOW_STOCK",
  },
  {
    id: "prod-3",
    name: "무선 3in1 고속 충전 패드 (맥세이프 호환)",
    skuCode: "CHG-3IN1-B",
    storeName: "공식몰",
    price: 49000,
    stock: 89,
    status: "IN_STOCK",
  },
  {
    id: "prod-4",
    name: "클래식 오버핏 리넨 셔츠 (화이트/M)",
    skuCode: "SHT-OVR-L2",
    storeName: "공식몰",
    price: 29900,
    stock: 0,
    status: "OUT_OF_STOCK",
  },
  {
    id: "prod-5",
    name: "스마트 모션 감지 쓰레기통 15L",
    skuCode: "BIN-SMT-15L",
    storeName: "리빙관",
    price: 32500,
    stock: 12,
    status: "IN_STOCK",
  },
  {
    id: "prod-6",
    name: "가죽 클래식 미니 카드 지갑 (브라운)",
    skuCode: "ACC-WLT-02",
    storeName: "공식몰",
    price: 19000,
    stock: 2,
    status: "LOW_STOCK",
  },
];

export default function DashboardPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTime, setSyncTime] = useState("방금 전");

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      setSyncTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} 동기화 완료`);
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* 1. Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#262629] pb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">
            Naver SKU Manager
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Smartstore Inventory & Price Management Dashboard
          </p>
        </div>
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-600/10 transition-all duration-200 border border-indigo-500/30 ${
            isSyncing ? "opacity-75" : ""
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "동기화 중..." : "실시간 수동 동기화"}
        </button>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total SKU */}
        <div className="bg-[#121214] border border-[#262629] p-6 rounded-xl hover:border-zinc-700/50 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full filter blur-xl group-hover:bg-indigo-600/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-medium text-zinc-400">전체 SKU 품목 수</span>
              <p className="text-3xl font-bold text-zinc-50">42</p>
            </div>
            <div className="bg-indigo-600/10 p-2.5 rounded-lg border border-indigo-500/20 text-indigo-400">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>지난주 대비 5% 증가</span>
          </div>
        </div>

        {/* Card 2: Smartstore Products */}
        <div className="bg-[#121214] border border-[#262629] p-6 rounded-xl hover:border-zinc-700/50 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full filter blur-xl group-hover:bg-emerald-600/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-medium text-zinc-400">스마트스토어 연동 상품</span>
              <p className="text-3xl font-bold text-zinc-50">128</p>
            </div>
            <div className="bg-emerald-600/10 p-2.5 rounded-lg border border-emerald-500/20 text-emerald-400">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>스토어 2개 채널 연결됨</span>
          </div>
        </div>

        {/* Card 3: Mapping Required */}
        <div className="bg-[#121214] border border-[#262629] p-6 rounded-xl hover:border-amber-700/30 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full filter blur-xl group-hover:bg-amber-600/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-medium text-zinc-400">매핑 대기 상품</span>
              <p className="text-3xl font-bold text-amber-400">12</p>
            </div>
            <div className="bg-amber-600/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-amber-500 font-medium">
            <span>재고 자동 연동을 위해 매핑 필요</span>
          </div>
        </div>

        {/* Card 4: Low Stock Items */}
        <div className="bg-[#121214] border border-[#262629] p-6 rounded-xl hover:border-red-700/30 transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:bg-red-600/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-medium text-zinc-400">안전재고 부족 품목</span>
              <p className="text-3xl font-bold text-red-500">3</p>
            </div>
            <div className="bg-red-600/10 p-2.5 rounded-lg border border-red-500/20 text-red-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-red-400 font-medium">
            <span>즉각적인 재고 보충 필요</span>
          </div>
        </div>
      </div>

      {/* 3. Main Content (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Smartstore List */}
        <div className="lg:col-span-1 bg-[#121214] border border-[#262629] rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#262629] flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">연동 스마트스토어</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">채널별 연동 현황 및 동기화</p>
            </div>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700 font-medium">
              총 2개
            </span>
          </div>
          <div className="divide-y divide-[#262629] flex-1">
            {initialStores.map((store) => (
              <div key={store.id} className="p-6 space-y-4 hover:bg-[#161619] transition-colors duration-150">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-zinc-200">
                      {store.name}
                    </span>
                    <div className="text-[10px] text-zinc-500 font-medium flex items-center gap-1">
                      <span>셀러 ID:</span>
                      <span className="text-zinc-400">{store.sellerId}</span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider ${
                      store.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        store.status === "ACTIVE" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {store.status === "ACTIVE" ? "정상 연동" : "대기"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#0c0c0e] p-3 rounded-lg border border-[#262629]">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-zinc-500 font-medium">연동 상품 수</span>
                    <p className="text-xs font-bold text-zinc-300">{store.productCount}개</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-zinc-500 font-medium">동기화 시간</span>
                    <p className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {store.id === "store-1" && isSyncing ? "방금 전" : store.id === "store-1" ? syncTime : store.lastSync}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Products Table */}
        <div className="lg:col-span-2 bg-[#121214] border border-[#262629] rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#262629] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">최근 모니터링 상품 현황</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">실시간 매핑 및 재고 상태 조회</p>
            </div>
            {/* Search Input Mock */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="상품명 또는 SKU 검색..."
                className="w-full pl-9 pr-4 py-1.5 bg-[#0c0c0e] border border-[#262629] focus:border-zinc-700 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none transition-colors"
                disabled
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262629] text-[10px] text-zinc-500 font-semibold uppercase tracking-wider bg-[#0c0c0e]/30">
                  <th className="px-6 py-4">상품 정보</th>
                  <th className="px-6 py-4">매핑 SKU</th>
                  <th className="px-6 py-4 text-right">판매가</th>
                  <th className="px-6 py-4 text-center">재고</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262629]">
                {initialProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#161619]/50 transition-colors duration-150">
                    <td className="px-6 py-4 space-y-1 max-w-[240px]">
                      <div className="text-xs font-semibold text-zinc-200 truncate" title={product.name}>
                        {product.name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-bold bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                          {product.storeName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-[10px] font-mono font-bold bg-[#1a1a1e] px-2 py-1 rounded text-indigo-400 border border-zinc-800/80">
                        {product.skuCode}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-semibold text-zinc-300">
                      {product.price.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            product.status === "IN_STOCK"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : product.status === "LOW_STOCK"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {product.status === "IN_STOCK" && `${product.stock}개 (정상)`}
                          {product.status === "LOW_STOCK" && `${product.stock}개 (위험)`}
                          {product.status === "OUT_OF_STOCK" && `품절`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-500 hover:text-zinc-300 p-1 hover:bg-zinc-800 rounded transition-colors" title="상품 보기">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
