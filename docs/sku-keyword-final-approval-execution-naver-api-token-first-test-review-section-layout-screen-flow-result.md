# Task 50 - Token First Test Review Section Layout Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에 누적된 Token First Test 안전 검토 패널들이
"실행 영역이 아닌 검토 전용 영역"임을 명확히 표시하고, 각 섹션의 구분 정보를 read-only로 제공하는
"Token First Test Review Section Layout" 화면 흐름을 완성합니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-review-section-layout-view.service.ts` | Review Section Layout View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-review-section-layout-view.test.ts` | 위 서비스에 대한 73개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-review-section-layout-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestReviewSectionLayoutView` import 추가 + `naverAuthTokenFirstTestReviewSectionLayoutScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestReviewSectionLayoutScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestReviewSectionLayoutViewModel {
  // Required True flags
  reviewSectionLayoutCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  sectionIsReviewOnly: true
  allSectionsReadOnly: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Review Section Layout'
  sectionAreaLabel: '검토 전용 영역 (실행 영역 아님)'
  sectionAreaDescription: string
  notExecutionAreaWarning: string
  sectionEntries: ReviewSectionEntry[]  // 10개 (Hub+Layout+Task41~48)
  layoutNote: string

  // Required False flags (모두 false)
  executionButtonRendered: false
  approvalButtonRendered: false
  formRendered: false
  ... (이하 동일)
}
```

## Section Entries (10개)

| id | sectionOrder | sectionKey |
|----|-------------|------------|
| 1 | 1 | REVIEW_HUB_NAVIGATION |
| 2 | 2 | REVIEW_SECTION_LAYOUT |
| 3 | 3 | READINESS |
| 4 | 4 | FINAL_CONFIRMATION_GATE |
| 5 | 5 | ACTION_LOCK |
| 6 | 6 | SAFETY_REVIEW |
| 7 | 7 | SAFE_NEXT_STEP_GUIDE |
| 8 | 8 | SEPARATE_APPROVAL_PACKET |
| 9 | 9 | APPROVAL_EVIDENCE_TIMELINE |
| 10 | 10 | APPROVAL_CONSOLE |

모든 entry: `isReadOnly: true`, `isExecutionSection: false`

## 화면 흐름 연결 방식

```
[Task 49] Review Hub Navigation     → sectionEntries[0] (REVIEW_HUB_NAVIGATION)
[Task 50] Review Section Layout     → sectionEntries[1] (REVIEW_SECTION_LAYOUT) ← 현재 패널
[Task 41] Readiness Screen          → sectionEntries[2] (READINESS)
[Task 42] Final Confirmation Gate   → sectionEntries[3] (FINAL_CONFIRMATION_GATE)
[Task 43] Action Lock               → sectionEntries[4] (ACTION_LOCK)
[Task 44] Safety Review             → sectionEntries[5] (SAFETY_REVIEW)
[Task 45] Safe Next Step Guide      → sectionEntries[6] (SAFE_NEXT_STEP_GUIDE)
[Task 46] Separate Approval Packet  → sectionEntries[7] (SEPARATE_APPROVAL_PACKET)
[Task 47] Approval Evidence Timeline→ sectionEntries[8] (APPROVAL_EVIDENCE_TIMELINE)
[Task 48] Approval Console          → sectionEntries[9] (APPROVAL_CONSOLE)
```

### 렌더링 순서 (page.tsx)

```
Token First Test Review Hub Navigation  [Task 49]
Token First Test Review Section Layout  [Task 50] ← 신규 추가
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
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 주황색(orange) 아이콘 + "Token First Test Review Section Layout" |
| 검토 전용 영역 경고 배너 | AlertTriangle 아이콘 + "검토 전용 영역" + "이 화면은 실행 화면이 아님" |
| 영역 설명 | 이 영역의 모든 섹션이 read-only임을 설명 |
| 섹션 구조 맵 (10개) | sectionOrder 번호 + sectionLabel + sectionDescription + read-only/실행불가 배지 |
| 레이아웃 안내 | 주황색 박스 (화면 구조 안내 전용, 실행 기능 없음) |

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
