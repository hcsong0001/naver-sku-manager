# Task 54 - Token First Test Separate Approval Boundary Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면의 Token First Test 검토 영역에
"Separate Approval Boundary" read-only 패널을 추가합니다.
Approval Decision Summary(Task 53) 다음, Manual Approval Checklist 직전에 위치하며,
사용자가 현재 허용된 작업(read-only 검토)과 별도 승인 전까지 금지된 작업(실행/API 호출)의
경계를 2개 영역으로 나누어 명확히 확인할 수 있게 합니다.
실제 경계 해제, 승인 제출, 실행 연결 기능은 존재하지 않습니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-boundary-view.service.ts` | Separate Approval Boundary View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-boundary-view.test.ts` | 위 서비스에 대한 81개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-boundary-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestSeparateApprovalBoundaryView` import 추가 + `naverAuthTokenFirstTestSeparateApprovalBoundaryScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestSeparateApprovalBoundaryScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestSeparateApprovalBoundaryViewModel {
  // Required True flags (9개)
  approvalBoundaryCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  boundaryIsReadOnly: true
  currentScreenIsReviewOnly: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Separate Approval Boundary'
  boundaryLabel: '허용/금지 경계 (read-only — 실행 불가 상태)'
  currentScreenNote: string  (이 화면은 승인 전 검토 화면, 실행 화면 아님)
  afterApprovalNote: string  (별도 승인 이후에도 즉시 실행 불가, 추가 단계 필요)
  allowedZoneTitle: string
  allowedItems: BoundaryZoneItem[]  // 5개
  prohibitedZoneTitle: string
  prohibitedItems: BoundaryZoneItem[]  // 6개
  boundaryNote: string

  // Required False flags (boundaryReleaseButton 2개 추가)
  executionButtonRendered: false
  approvalButtonRendered: false
  boundaryReleaseButtonRendered: false
  boundaryReleaseButtonEnabled: false
  ... (이하 동일)
}
```

## Allowed Items (5개 — 허용된 작업)

| id | itemKey | itemLabel |
|----|---------|-----------|
| 1 | READONLY_REVIEW | read-only 검토 |
| 2 | SAFETY_STATE_CONFIRM | 안전 상태 확인 |
| 3 | APPROVAL_CONDITION_UNDERSTAND | 승인 조건 이해 |
| 4 | DRAFT_CONFIRM | 초안 확인 |
| 5 | DECISION_SUMMARY_REVIEW | 결론 요약 검토 |

## Prohibited Items (6개 — 금지된 작업)

| id | itemKey | itemLabel |
|----|---------|-----------|
| 1 | TOKEN_REQUEST | 인증 키 요청 |
| 2 | EXTERNAL_API_CALL | 외부 서비스 API 호출 |
| 3 | DB_WRITE | 운영 DB write |
| 4 | PRICE_STOCK_CHANGE | 가격·재고 변경 |
| 5 | EXECUTION_FLOW | 실행 흐름 연결 |
| 6 | APPROVAL_SUBMIT | 승인 요청 제출·저장 |

모든 item: `isReadOnly: true`, `isActionable: false`

## 화면 흐름 연결 방식

```
렌더링 순서 (page.tsx):
[Task 49] Review Hub Navigation
[Task 50] Review Section Layout
[Task 41~48] Readiness → ... → Approval Console
[Task 51] Separate Approval Request Draft
[Task 52] Approval Readiness Checklist
[Task 53] Approval Decision Summary
[Task 54] Separate Approval Boundary     ← 신규 추가 (Decision Summary 다음, Manual Checklist 직전)
Manual Approval Checklist Panel
BatchJob 실행 결과
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 아연(zinc) ShieldAlert 아이콘 + "Token First Test Separate Approval Boundary" |
| 경계 안내 배너 | AlertTriangle + boundaryLabel + currentScreenNote |
| 승인 이후 안내 | Info 아이콘 + afterApprovalNote |
| 허용 영역 (좌/상) | 초록(green) 배경 + ✔ 허용된 작업 5개 |
| 금지 영역 (우/하) | 빨강(red) 배경 + ✕ 금지된 작업 6개 |
| 경계 안내 | Info 아이콘 + boundaryNote |

## 안전 규칙 준수 항목

| 항목 | 결과 |
|------|------|
| 실행 버튼 없음 | ✅ |
| 승인 요청 제출 버튼 없음 | ✅ |
| 승인 버튼 없음 | ✅ |
| 체크리스트 저장 버튼 없음 | ✅ |
| 승인 결정 저장 버튼 없음 | ✅ |
| Boundary 승인/해제 버튼 없음 | ✅ |
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
