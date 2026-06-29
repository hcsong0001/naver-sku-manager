# Task 311: Naver Read-Only Final Execution Approval Candidate Detail Review Screen Flow

## 개요

Task 310 Candidate List ViewModel을 받아 후보별 상세 검토 정보를 read-only로 표시합니다.

## 상태 유형

### `NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewStatus`
- `CANDIDATE_DETAIL_REVIEW_READY` / `PARTIAL_READY` / `BLOCKED` / `EMPTY`

1:1 Record 매핑: Task 310 CandidateListStatus → Task 311 DetailReviewStatus

## Builder

```typescript
buildNaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView({
  candidateList: { candidateListStatus, candidateItems, ... }
}): NaverReadOnlyFinalExecutionApprovalCandidateDetailReviewView
```

## 안전 표시 필드 (safeDisplayFields)

sku, productName, calculationType, targetType, riskLevel, warningCount, errorCount

## 제외 필드 (excludedFields)

priceStockRawValues, executionPayload, requestPayload, rawApiResponse,
token, auth, signature, authorization, envValues

## 안전 플래그

`isReadOnlyCandidateDetailReview: true`, `requiresSeparateTask312Approval: true`
모든 실행/API/DB 플래그: `false`

## 다음 Task

Task 312는 사용자 별도 명시 승인 후에만 진행합니다.
