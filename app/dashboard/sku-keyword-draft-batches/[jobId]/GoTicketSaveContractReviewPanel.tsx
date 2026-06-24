'use client';

import { useState } from 'react';
import { buildGoTicketSaveContractReview } from '@/src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-save-contract-review.service';

interface GoTicketSaveContractReviewPanelProps {
  allChecklistChecked: boolean;
  checkedCount: number;
  jobId?: string;
  readinessStatus?: string;
}

export function GoTicketSaveContractReviewPanel({
  allChecklistChecked,
  checkedCount,
  jobId,
  readinessStatus,
}: GoTicketSaveContractReviewPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'request' | 'response' | 'rejection'>('request');

  const viewModel = buildGoTicketSaveContractReview({
    jobId,
    checklistCheckedCount: checkedCount,
    readinessStatus,
  });

  const { requestShape, responseShape, rejectionRules } = viewModel;

  if (!allChecklistChecked) {
    return (
      <div className="mb-6 rounded-lg border border-[#262629] bg-[#0c0c0e] p-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-700">◈</span>
          <h2 className="text-base font-semibold text-slate-600">Test DB Save Contract Review</h2>
          <span className="ml-1 rounded-full border border-slate-800 bg-slate-900 px-2 py-0.5 text-xs text-slate-600">
            No-route · No-write
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-700">
          체크리스트 완료 후 계약 리뷰 확인 가능 — 모든 14개 항목을 체크하면 저장 API 계약 검토가 표시됩니다.
        </p>
      </div>
    );
  }

  const requestRows: [string, string][] = [
    ['jobId', requestShape.jobId],
    ['readinessStatus', requestShape.readinessStatus],
    ['checklistTotalCount', String(requestShape.checklistTotalCount)],
    ['checklistCheckedCount', String(requestShape.checklistCheckedCount)],
    ['allChecklistChecked', String(requestShape.allChecklistChecked)],
    ['previewMode', String(requestShape.previewMode)],
    ['saveTarget', requestShape.saveTarget],
    ['requestedByUserAction', String(requestShape.requestedByUserAction)],
    ['dryRunOnly', String(requestShape.dryRunOnly)],
    ['requestedAt', requestShape.requestedAt],
  ];

  const responseRows: [string, string][] = [
    ['ok', String(responseShape.ok)],
    ['rejected', String(responseShape.rejected)],
    ['saved', String(responseShape.saved)],
    ['dbWriteExecuted', String(responseShape.dbWriteExecuted)],
    ['prismaMutationExecuted', String(responseShape.prismaMutationExecuted)],
    ['goTicketIssued', String(responseShape.goTicketIssued)],
    ['executionLeaseIssued', String(responseShape.executionLeaseIssued)],
    ['tokenIssued', String(responseShape.tokenIssued)],
    ['nextRequiredAction', responseShape.nextRequiredAction],
  ];

  return (
    <div className="mb-6 rounded-lg border border-slate-700/20 bg-[#0c0c0e] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <span className="text-slate-400">◈</span>
          Test DB Save Contract Review
          <span className="ml-1 rounded-full border border-slate-600 bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
            No-route · No-write
          </span>
        </h2>
        <button
          type="button"
          onClick={() => setCollapsed(prev => !prev)}
          className="rounded-sm border border-slate-600 bg-slate-700/40 px-2 py-1 text-xs text-slate-400 hover:bg-slate-700 hover:text-slate-300 transition-colors"
        >
          {collapsed ? '계약 펼치기' : '계약 접기'}
        </button>
      </div>

      {/* 상태 배너 */}
      <div className="mb-3 rounded-md border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-xs text-purple-300">
        저장 API 계약 검토 — 현재 route/POST/DB write 없음. 실제 저장은 별도 Task 필요.
      </div>

      {!collapsed && (
        <>
          {/* 탭 */}
          <div className="mb-3 flex gap-1 border-b border-slate-800">
            {(['request', 'response', 'rejection'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-purple-400 text-purple-300'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                {tab === 'request' ? '요청 후보 필드' : tab === 'response' ? '응답 후보 필드' : '거부 조건'}
              </button>
            ))}
          </div>

          {/* Request 탭 */}
          {activeTab === 'request' && (
            <div className="mb-3">
              <p className="mb-2 text-xs text-slate-500">향후 Test DB 저장 API 요청 후보 필드</p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {requestRows.map(([key, value]) => {
                  const isFalse = value === 'false';
                  const isTrue = value === 'true';
                  return (
                    <div
                      key={key}
                      className="flex items-start justify-between rounded-sm border border-slate-800/60 bg-slate-900/40 px-2 py-1"
                    >
                      <span className="truncate text-[11px] text-slate-500 mr-2" title={key}>{key}</span>
                      <span className={`flex-shrink-0 text-right text-[11px] font-mono ${isFalse ? 'text-emerald-400' : isTrue ? 'text-sky-300' : 'text-slate-300'}`}>
                        {value.length > 30 ? value.substring(0, 30) + '…' : value}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-slate-600">
                acknowledgementKeys: {requestShape.acknowledgementKeys.length}개 항목 포함 (token/secret 없음)
              </p>
            </div>
          )}

          {/* Response 탭 */}
          {activeTab === 'response' && (
            <div className="mb-3">
              <p className="mb-2 text-xs text-slate-500">향후 Test DB 저장 API 응답 후보 필드</p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {responseRows.map(([key, value]) => {
                  const isFalse = value === 'false';
                  const isTrue = value === 'true';
                  return (
                    <div
                      key={key}
                      className="flex items-start justify-between rounded-sm border border-slate-800/60 bg-slate-900/40 px-2 py-1"
                    >
                      <span className="truncate text-[11px] text-slate-500 mr-2" title={key}>{key}</span>
                      <span className={`flex-shrink-0 text-right text-[11px] font-mono ${isFalse ? 'text-emerald-400' : isTrue ? 'text-sky-300' : 'text-slate-300'}`}>
                        {value.length > 30 ? value.substring(0, 30) + '…' : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rejection 탭 */}
          {activeTab === 'rejection' && (
            <div className="mb-3">
              <p className="mb-2 text-xs text-slate-500">향후 저장 거부 조건 ({rejectionRules.length}개)</p>
              <ul className="space-y-1.5">
                {rejectionRules.map((rule, idx) => (
                  <li
                    key={rule.key}
                    className="rounded-sm border border-rose-900/20 bg-rose-950/20 px-3 py-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-[10px] text-slate-600">{idx + 1}.</span>
                      <div>
                        <p className="text-[11px] font-semibold text-rose-300">{rule.condition}</p>
                        <p className="mt-0.5 text-[10px] text-slate-500">{rule.reason}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 안전 불변 조건 */}
          <div className="rounded-md border border-slate-700/40 bg-slate-800/20 p-3">
            <p className="mb-2 text-xs font-semibold text-slate-400">현재 route/POST/DB write 없음</p>
            <ul className="space-y-0.5 text-[11px] text-slate-500">
              <li>• routeCreated: false — API route가 생성되지 않았습니다</li>
              <li>• postHandlerCreated: false — POST 핸들러가 없습니다</li>
              <li>• saveButtonEnabled: false — 저장 버튼이 없습니다</li>
              <li>• testDbWriteExecuted: false — Test DB write가 실행되지 않았습니다</li>
              <li>• operatingDbWriteExecuted: false — 운영 DB write가 실행되지 않았습니다</li>
              <li>• 실제 token 발급 요청은 아직 구현되지 않았습니다</li>
            </ul>
          </div>
        </>
      )}

      <p className="mt-3 text-[10px] text-slate-700">
        No-route contract review · 실제 저장은 별도 사용자 승인 후 전용 Task에서 진행합니다.
      </p>
    </div>
  );
}
