# Task 224: Naver API Connection Approval Abort Recovery Criteria Screen Flow Result

## 목적
Task 223 Risk Acceptance Ledger 이후, 실제 Naver API 연결 테스트 또는 실행 단계로 넘어가기 전 반드시 정해야 할 중단 조건과 복구 기준을 read-only 패널로 추가.

## 추가된 패널 위치
```
Task 223 Risk Acceptance Ledger
Task 224 Abort Recovery Criteria   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-abort-recovery-criteria-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-abort-recovery-criteria-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-api-connection-approval-abort-recovery-criteria-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: ABORT_RECOVERY_CRITERIA_READY
- isBatchJobResultDisplayOnly: true
- isUserApprovalStillRequired: true
- isAbortRecoveryCriteriaReady: true
- isAbortRecoveryCriteriaAccepted: false

## Abort Recovery Criteria Items (12개 항목)
| 기준 항목 | 상태 | 의미 |
|----------|------|------|
| Token 발급 실패 시 중단 | CRITERIA_REQUIRED | 실제 발급 실패 시 다음 단계 진행 금지 |
| 인증 오류 발생 시 중단 | CRITERIA_REQUIRED | 권한 오류 발생 시 즉시 중단 필요 |
| 상품 조회 실패 시 중단 | CRITERIA_REQUIRED | 조회 오류 시 수정 단계 진입 금지 |
| 상품 수정 실패 시 중단 | LOCKED | 현재 수정 API는 연결되지 않음 |
| 가격/재고 변경 실패 복구 | LOCKED | 현재 가격/재고 변경은 금지 |
| 운영 DB write 실패 복구 | LOCKED | 현재 운영 DB write 금지 |
| Worker 실패 처리 | LOCKED | 현재 Worker 실행 없음 |
| Queue 실패 처리 | LOCKED | 현재 Queue 연결 없음 |
| Adapter 실패 처리 | LOCKED | 현재 Adapter 연결 없음 |
| Live 실행 중단 기준 | LOCKED | 현재 Live 실행 금지 |
| 사용자 재승인 필요 기준 | CRITERIA_REQUIRED | 실패 후 재시도 전 사용자 재승인 필요 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 224는 표시 전용 |

## 이 패널이 아닌 것들

- 실제 승인 제출이 아님: `isApprovalSubmission: false`, `isAbortRecoveryCriteriaAccepted: false`
- 실제 Naver API 호출이 아님: `isNaverApiCalled: false`
- Token 발급이 아님: `isTokenIssued: false`
- Worker/Queue/Adapter 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`
- POST API 추가가 아님: `isPostApiConnected: false`
- DB Write가 아님: `isMutationConnected: false`
- 가격/재고 변경이 아님: `isPriceOrStockChanged: false`
- 상품 조회/수정 API 호출이 아님: `isProductLookupApiCalled: false`, `isProductUpdateApiCalled: false`
- .env / 인증키 접근이 아님: `hasEnvFileAccess: false`, `hasAuthKeyAccess: false`
- 실행/승인 버튼 없음: `hasExecutionButton: false`, `hasSubmitAction: false`

## 사용자 명시 승인 전까지 다음 단계 진행 불가
이 기준을 표시했다고 해서 중단/복구 기준이 수락된 것이 아닙니다. 실제 기준 수락 및 승인은 사용자의 별도 명시적 지시로만 진행됩니다.

## 검증 결과
- Task 224 테스트: (실행 후 기록)
- 전체 회귀 테스트 5288/5288: (실행 후 기록)
- tsc --noEmit: (실행 후 기록)
- npm run build: (실행 후 기록)
- prisma validate: (실행 후 기록)
