# Task 49 - Token First Test Review Hub Navigation Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에 누적된 Token First Test 안전 검토 패널들을
사용자가 빠르게 탐색하고 이해할 수 있도록 "Token First Test Review Hub Navigation" read-only
목차 화면 흐름을 완성합니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-review-hub-navigation-view.service.ts` | Review Hub Navigation View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-review-hub-navigation-view.test.ts` | 위 서비스에 대한 69개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-review-hub-navigation-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestReviewHubNavigationView` import 추가 + `naverAuthTokenFirstTestReviewHubNavigationScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestReviewHubNavigationScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestReviewHubNavigationViewModel {
  // Required True flags
  reviewHubNavigationViewCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  allPanelsIndexed: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Review Hub Navigation'
  description: string
  totalPanelCount: 8
  navigationEntries: ReviewHubNavigationEntry[]  // 8개 (Task41~48 전체 패널)
  hubNote: string

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

## Navigation Entries (8개)

| id | stepNumber | stepKey | Task |
|----|-----------|---------|------|
| 1 | 1 | READINESS | Task 41 |
| 2 | 2 | FINAL_CONFIRMATION_GATE | Task 42 |
| 3 | 3 | ACTION_LOCK | Task 43 |
| 4 | 4 | SAFETY_REVIEW | Task 44 |
| 5 | 5 | SAFE_NEXT_STEP_GUIDE | Task 45 |
| 6 | 6 | SEPARATE_APPROVAL_PACKET | Task 46 |
| 7 | 7 | APPROVAL_EVIDENCE_TIMELINE | Task 47 |
| 8 | 8 | APPROVAL_CONSOLE | Task 48 |

각 entry: `executionAllowed: false` (항상 불가)

## 화면 흐름 연결 방식

```
[Task 49] Review Hub Navigation   ← 현재 (목차 허브, Token First Test 영역 최상단)
  ↓ 이하 패널들
[Task 41] Readiness Screen
[Task 42] Final Confirmation Gate
[Task 43] Action Lock
[Task 44] Safety Review
[Task 45] Safe Next Step Guide
[Task 46] Separate Approval Packet
[Task 47] Approval Evidence Timeline
[Task 48] Approval Console
```

### 렌더링 순서 (page.tsx)

```
... (기존 패널들)
Token First Test Review Hub Navigation  [Task 49] ← 신규 추가 (최상단)
Token First Test Readiness Screen       [Task 41]
Token First Test Final Confirmation...  [Task 42]
Token First Test Action Lock            [Task 43]
Token First Test Safety Review          [Task 44]
Token First Test Safe Next Step Guide   [Task 45]
Token First Test Separate Approval...   [Task 46]
Token First Test Approval Evidence...   [Task 47]
Token First Test Approval Console       [Task 48]
Manual Approval Checklist Panel
BatchJob 실행 결과
...
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 보라색(violet) 아이콘 + "Token First Test Review Hub Navigation" |
| 설명 | read-only 목차 안내 문구 |
| 패널 목차 (8개) | stepNumber 원형 배지 + stepName + currentStatus + panelDescription + 실행불가 배지 |
| 허브 안내 | 보라색 박스 (화면 탐색 도우미, 실행 기능 없음) |

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
