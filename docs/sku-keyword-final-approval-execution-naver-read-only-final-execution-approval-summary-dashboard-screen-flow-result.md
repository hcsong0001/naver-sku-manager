# Task 309: Naver Read-Only Final Execution Approval Summary Dashboard Screen Flow

## 개요

Task 296~308의 read-only 검증 결과를 집계하여 하나의 요약 대시보드 패널로 표시합니다.
실행 승인, 실행 준비 검토, 최종 실행 승인 패킷/검토/봉인/인증 결과를 종합합니다.

## 상태 유형

### `NaverReadOnlyFinalExecutionApprovalSummaryDashboardStatus`
- `READY`: 모든 13개 Task 항목이 준비 완료
- `PARTIAL_READY`: 차단 항목 없이 1개 이상이 부분 준비
- `BLOCKED`: 1개 이상 차단 항목 존재

### `ReadOnlyChainItemResultStatus`
- `READY` / `PARTIAL_READY` / `BLOCKED` / `LOCKED`

## 집계 대상 (13개 Task)

| taskId | taskLabel |
|--------|-----------|
| 296 | 실행 승인 패킷 |
| 297 | 실행 승인 검토 |
| 298 | 실행 승인 검토 안전 감사 봉인 |
| 299 | 실행 승인 검토 결과 인증 |
| 300 | 실행 준비 승인 패킷 |
| 301 | 실행 준비 검토 |
| 302 | 실행 준비 검토 안전 감사 봉인 |
| 303 | 실행 준비 검토 결과 인증 |
| 304 | 최종 실행 승인 패킷 |
| 305 | 최종 실행 승인 검토 |
| 306 | 최종 실행 승인 검토 결과 인증 |
| 307 | 최종 실행 승인 안전 감사 봉인 |
| 308 | 최종 실행 승인 봉인 결과 인증 |

## Builder

```typescript
buildNaverReadOnlyFinalExecutionApprovalSummaryDashboardView({
  chainItems: ReadOnlyChainSummaryInput[]
}): NaverReadOnlyFinalExecutionApprovalSummaryDashboardView
```

## 안전 플래그 (모두 `false`)

`isReadOnlyExecutionApprovalGrantedInThisTask`, `isExecutionApprovalGranted`,
`isExecutionExecutedInThisTask`, `isProductChangeApprovalGranted`,
`isExecutionButtonAddedInThisTask`, `hasExecutionButton`, `hasSubmitAction`,
`hasWorkerTrigger`, `hasQueueTrigger`

## 다음 Task

`requiresSeparateTask310Approval: true`
Task 310은 사용자 별도 명시 승인 후에만 진행합니다.
