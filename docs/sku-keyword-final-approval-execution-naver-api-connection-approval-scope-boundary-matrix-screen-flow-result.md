# Task 222: Naver API Connection Approval Scope Boundary Matrix Screen Flow Result

## 목적
Task 221 Explicit Consent Checklist 이후, 실제 Naver API 연결 승인 시 어떤 권한 범위가 열릴 수 있고 어떤 범위는 계속 금지되어야 하는지를 read-only Matrix 패널로 정리.

## 추가된 패널 위치
```
Task 221 Explicit Consent Checklist
Task 222 Scope Boundary Matrix   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-scope-boundary-matrix-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-scope-boundary-matrix-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-api-connection-approval-scope-boundary-matrix-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: SCOPE_BOUNDARY_MATRIX_READY
- isBatchJobResultDisplayOnly: true
- isUserApprovalStillRequired: true
- isScopeBoundaryMatrixReady: true
- isActualApprovalGranted: false

## Scope Boundary Matrix (12개 항목)
| 구분 | 상태 | 의미 |
|------|------|------|
| 승인 준비 화면 (Task 215~221) | READ_ONLY_CONFIRMED | 표시 전용, 실제 승인 권한 없음 |
| 사용자 명시 승인 | PENDING_USER_CONSENT | 아직 실제 승인 없음 |
| Token 발급 | LOCKED | 아직 허용되지 않음 |
| 상품 조회 API | LOCKED | 아직 호출 불가 |
| 상품 수정 API | LOCKED | 아직 호출 불가 |
| 가격 변경 | LOCKED | 아직 변경 불가 |
| 재고 변경 | LOCKED | 아직 변경 불가 |
| Worker 실행 | LOCKED | 아직 실행 경로 없음 |
| Queue enqueue | LOCKED | 아직 연결 없음 |
| Adapter 연결 | LOCKED | 아직 연결 없음 |
| 운영 DB write | LOCKED | 아직 금지 |
| 실제 Live 실행 | LOCKED | 아직 금지 |

## 이 패널이 아닌 것들

- 실제 승인 제출이 아님: `isApprovalSubmission: false`, `isActualApprovalGranted: false`
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
이 Matrix를 표시했다고 해서 실제 승인 권한이 열린 것이 아닙니다. 실제 승인은 사용자의 별도 명시적 지시로만 진행됩니다.

## 검증 결과
- Task 222 테스트: (실행 후 기록)
- 전체 회귀 테스트 5288/5288: (실행 후 기록)
- tsc --noEmit: (실행 후 기록)
- npm run build: (실행 후 기록)
- prisma validate: (실행 후 기록)
