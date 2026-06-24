# Task 45 - Token First Test Safe Next Step Guide Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에서 사용자가 Token First Test 관련 현재 상태를 확인한 뒤, 다음에 무엇을 해야 하는지를 이해할 수 있도록 "Token First Test Safe Next Step Guide" read-only 흐름을 완성합니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safe-next-step-guide-view.service.ts` | Safe Next Step Guide View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safe-next-step-guide-view.test.ts` | 위 서비스에 대한 60개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-safe-next-step-guide-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestSafeNextStepGuideView` import 추가 + `naverAuthTokenFirstTestSafeNextStepGuideScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestSafeNextStepGuideScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestSafeNextStepGuideViewModel {
  // Required True flags
  safeNextStepGuideViewCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  completedStepsCreated: true
  pendingApprovalItemsCreated: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true

  // View content
  title: 'Token First Test Safe Next Step Guide'
  description: string
  currentPhaseLabel: 'Safety Review 완료 단계 (read-only 안전 검토 완료)'
  tokenTestExecutionAllowedYet: false
  blockedReason: string
  completedSteps: SafeNextStepCompletedItem[]    // 4개 (Readiness ~ Safety Review)
  pendingApprovalItems: SafeNextStepApprovalItem[] // 5개 (별도 승인 항목)
  nextPhaseLabel: '다음 단계: 별도 승인 전 안전 검토'
  nextPhaseGuide: string

  // Required False flags (모두 false)
  executionButtonRendered: false
  formRendered: false
  postApiEnabled: false
  tokenRequestAllowed: false
  accessTokenRequested: false
  tokenIssued: false
  naverApiCallAllowed: false
  ... (이하 동일)
}
```

## 화면 흐름 연결 방식

### 기존 4단계와의 연결

```
[Task 41] Readiness Screen     → completedSteps[0]
[Task 42] Final Confirmation Gate → completedSteps[1]
[Task 43] Action Lock          → completedSteps[2]
[Task 44] Safety Review        → completedSteps[3]
[Task 45] Safe Next Step Guide ← 현재 (상위 4단계 완료 후 표시)
```

### 렌더링 순서 (page.tsx)

```
... (기존 패널들)
Token First Test Safety Review Screen   [Task 44]
Token First Test Safe Next Step Guide   [Task 45] ← 신규 추가
Manual Approval Checklist Panel
BatchJob 실행 결과
...
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 보라색(violet) 아이콘 + "Token First Test Safe Next Step Guide" |
| 설명 | read-only 안내 문구 |
| 현재 단계 배지 | "현재 단계: Safety Review 완료 단계" + "Token 발급 테스트 실행: 아직 불가" |
| 실행 불가 이유 | 빨간 경고 박스 (실행 버튼 없음) |
| 완료된 안전 단계 | 1~4단계 목록 (Readiness → Final Confirmation Gate → Action Lock → Safety Review) |
| 별도 승인 필요 항목 | 5개 승인 항목 (approvalKey + description) |
| 다음 단계 안내 | 별도 승인 전 안전 검토 안내 (실행 버튼 없음) |

## 안전 규칙 준수 항목

| 항목 | 결과 |
|------|------|
| 실행 버튼 없음 | ✅ |
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
