# Task 223: Naver API Connection Approval Risk Acceptance Ledger Screen Flow Result

## 목적
Task 222 Scope Boundary Matrix 이후, 실제 Naver API 연결 승인 전 사용자가 인지하고 수락해야 할 위험 요소를 read-only Ledger 패널로 정리.

## 추가된 패널 위치
```
Task 222 Scope Boundary Matrix
Task 223 Risk Acceptance Ledger   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-risk-acceptance-ledger-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-risk-acceptance-ledger-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-api-connection-approval-risk-acceptance-ledger-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: RISK_ACCEPTANCE_LEDGER_READY
- isBatchJobResultDisplayOnly: true
- isUserApprovalStillRequired: true
- isRiskAcceptanceLedgerReady: true
- isRiskAcceptedByUser: false

## Risk Acceptance Ledger (12개 항목)
| 위험 항목 | 상태 | 의미 |
|----------|------|------|
| Token 발급 위험 | PENDING_USER_ACCEPTANCE | 발급 시 인증 권한이 열릴 수 있음 |
| 상품 조회 API 위험 | PENDING_USER_ACCEPTANCE | 실제 상품 데이터 조회 가능성 있음 |
| 상품 수정 API 위험 | PENDING_USER_ACCEPTANCE | 잘못 연결 시 상품 정보 변경 위험 |
| 가격 변경 위험 | LOCKED | 현재는 변경 불가 |
| 재고 변경 위험 | LOCKED | 현재는 변경 불가 |
| 운영 DB write 위험 | LOCKED | 현재는 write 금지 |
| Worker 실행 위험 | LOCKED | 현재는 실행 경로 없음 |
| Queue enqueue 위험 | LOCKED | 현재는 연결 없음 |
| Adapter 연결 위험 | LOCKED | 현재는 연결 없음 |
| Live 실행 위험 | LOCKED | 현재는 금지 |
| 복구/중단 기준 | PENDING_USER_ACCEPTANCE | 실제 승인 전 기준 확인 필요 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 223은 표시 전용 |

## 이 패널이 아닌 것들

- 실제 승인 제출이 아님: `isApprovalSubmission: false`, `isRiskAcceptedByUser: false`
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
이 Ledger를 표시했다고 해서 위험이 수락된 것이 아닙니다. 실제 위험 수락 및 승인은 사용자의 별도 명시적 지시로만 진행됩니다.

## 검증 결과
- Task 223 테스트: (실행 후 기록)
- 전체 회귀 테스트 5288/5288: (실행 후 기록)
- tsc --noEmit: (실행 후 기록)
- npm run build: (실행 후 기록)
- prisma validate: (실행 후 기록)
