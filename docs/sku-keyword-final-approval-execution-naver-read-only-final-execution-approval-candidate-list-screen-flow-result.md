# Task 310: Naver Read-Only Final Execution Approval Candidate List Screen Flow

## 개요

Task 309 Summary Dashboard ViewModel과 기존 BatchJob item 데이터를 바탕으로,
SKU/상품별 최종 실행 승인 후보 목록을 read-only로 표시합니다.

## 상태 유형

### `NaverReadOnlyFinalExecutionApprovalCandidateListStatus`
- `CANDIDATE_LIST_READY`: 대시보드 READY + 후보 1개 이상
- `CANDIDATE_LIST_PARTIAL_READY`: 대시보드 PARTIAL_READY + 후보 1개 이상
- `CANDIDATE_LIST_BLOCKED`: 대시보드 BLOCKED
- `CANDIDATE_LIST_EMPTY`: 후보 0개

### `CandidateItemStatus` (per item)
- `READY` / `PARTIAL_READY` / `BLOCKED` / `LOCKED`

## Builder

```typescript
buildNaverReadOnlyFinalExecutionApprovalCandidateListView({
  summaryDashboard: { summaryDashboardStatus: NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus },
  items: BatchJobItemForCandidateList[]
}): NaverReadOnlyFinalExecutionApprovalCandidateListView
```

## 표시 허용 필드

- item id, status, candidateSummary.sku, candidateSummary.productName
- calculationType, targetType (스토어/채널 표시용)
- dryRunSummary.riskLevel, warnings 개수, blockedReasons 개수

## 표시 금지 필드

- requestPayload (실행 payload)
- dryRunSummary.before / after (가격/재고 raw 값)
- Token/Auth/Authorization 값
- raw API response

## 안전 플래그

`isReadOnlyCandidateList: true`, `requiresSeparateTask311Approval: true`
모든 실행/API/DB 플래그: `false`

## 다음 Task

Task 311은 사용자 별도 명시 승인 후에만 진행합니다.
