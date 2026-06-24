# Task 46 - Token First Test Separate Approval Packet Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에서 실제 token 발급 테스트로 넘어가기 전, 별도 승인 검토자가 확인해야 할 패킷 정보를 read-only로 제공하는 화면 흐름을 완성합니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-packet-view.service.ts` | Separate Approval Packet View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-packet-view.test.ts` | 위 서비스에 대한 65개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-packet-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestSeparateApprovalPacketView` import 추가 + `naverAuthTokenFirstTestSeparateApprovalPacketScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestSeparateApprovalPacketScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestSeparateApprovalPacketViewModel {
  // Required True flags
  approvalPacketViewCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  riskScopeItemsCreated: true
  approverChecklistCreated: true
  prohibitedItemsCreated: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true

  // View content
  title: 'Token First Test Separate Approval Packet'
  description: string
  currentLockStatus: '실행 잠금 상태 (executionLocked=true, 별도 승인 전까지 해제 불가)'
  tokenTestNotAllowedReason: string
  riskScopeItems: ApprovalPacketRiskScopeItem[]   // 5개 (위험 범위)
  approverChecklist: ApprovalPacketChecklistItem[] // 6개 (승인자 체크리스트)
  prohibitedItems: ApprovalPacketProhibitedItem[]  // 10개 (금지 항목)
  approvalNote: string

  // Required False flags (모두 false)
  executionButtonRendered: false
  approvalButtonRendered: false
  formRendered: false
  postApiEnabled: false
  tokenRequestAllowed: false
  tokenIssued: false
  naverApiCallAllowed: false
  ... (이하 동일)
}
```

## 화면 흐름 연결 방식

```
[Task 41] Readiness Screen              → completedSteps[0]
[Task 42] Final Confirmation Gate       → completedSteps[1]
[Task 43] Action Lock                   → completedSteps[2]
[Task 44] Safety Review                 → completedSteps[3]
[Task 45] Safe Next Step Guide          → 별도 승인 절차 안내
[Task 46] Separate Approval Packet      ← 현재 (별도 승인 검토 패킷)
```

### 렌더링 순서 (page.tsx)

```
... (기존 패널들)
Token First Test Safety Review Screen       [Task 44]
Token First Test Safe Next Step Guide       [Task 45]
Token First Test Separate Approval Packet   [Task 46] ← 신규 추가
Manual Approval Checklist Panel
BatchJob 실행 결과
...
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 장미색(rose) 아이콘 + "Token First Test Separate Approval Packet" |
| 설명 | read-only 안내 문구 |
| 현재 실행 잠금 상태 | 빨간 경고 박스 (executionLocked=true 명시) |
| 실제 token 발급 불가 이유 | 앰버 박스 (네트워크 어댑터 오프라인 등) |
| 위험 범위 (5개) | TOKEN_ISSUANCE_SCOPE, CREDENTIAL_EXPOSURE_RISK, OPERATING_DB_WRITE_RISK, PRODUCT_API_CALL_RISK, PRICE_STOCK_CHANGE_RISK |
| 승인자 체크리스트 (6개) | 실행 잠금 상태 확인, API 호출 없음 확인, token 미발급 확인 등 |
| 금지 항목 (10개) | 배지 형태로 요약 표시 (NO_TOKEN_REQUEST, NO_AUTH_HEADER 등) |
| 승인 안내 | 회색 박스 (이 패킷은 화면 검토용, 실제 승인은 별도 프로세스) |

## 안전 규칙 준수 항목

| 항목 | 결과 |
|------|------|
| 실행 버튼 없음 | ✅ |
| 승인 버튼 없음 | ✅ |
| form submit 없음 | ✅ |
| POST API 없음 | ✅ |
| 실제 Naver API 호출 없음 | ✅ |
| access/refresh token 요청 없음 | ✅ |
| token 발급 없음 | ✅ |
| Authorization/Bearer 헤더 없음 | ✅ |
| endpoint URL/path 원문 없음 | ✅ |
| fetch/axios/http client 신규 없음 | ✅ |
| 운영 DB write 없음 | ✅ |
| Prisma mutation 없음 | ✅ |
| 가격/재고 변경 없음 | ✅ |
| 상품 조회/수정 API 호출 없음 | ✅ |
| Queue/Worker 실행 없음 | ✅ |
| package.json/lock 변경 없음 | ✅ |
| Prisma schema/migration 변경 없음 | ✅ |
| Task 40 목록 페이지 수정 없음 | ✅ |
| stash pop/apply 없음 | ✅ |
