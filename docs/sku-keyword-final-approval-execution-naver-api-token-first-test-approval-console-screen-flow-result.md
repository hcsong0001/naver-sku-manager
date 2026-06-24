# Task 48 - Token First Test Approval Console Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에서 Task 41~47까지 누적된 Token First Test
안전 검토 흐름을 승인자가 한눈에 이해할 수 있도록 "Token First Test Approval Console" read-only
화면 흐름을 완성합니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-console-view.service.ts` | Approval Console View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-console-view.test.ts` | 위 서비스에 대한 73개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-console-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestApprovalConsoleView` import 추가 + `naverAuthTokenFirstTestApprovalConsoleScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestApprovalConsoleScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestApprovalConsoleViewModel {
  // Required True flags
  approvalConsoleViewCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  allPriorStepsCompletedAsReadOnly: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true
  consoleReadyForApproverReview: true

  // View content
  title: 'Token First Test Approval Console'
  description: string
  currentPhaseLabel: '별도 승인 전 read-only 검토 단계'
  overallStatus: '7개 안전 검토 단계 read-only 완료 · 실제 token 발급 테스트 미승인 · 실행 잠금 유지'
  summaryItems: ApprovalConsoleSummaryItem[]    // 6개 (현재 상태 요약)
  completedFlowSteps: ApprovalConsoleFlowStep[] // 7개 (Task41~47 완료 단계)
  nextRequiredAction: string
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

## Summary Items (6개)

| id | itemKey | label |
|----|---------|-------|
| 1 | CURRENT_PHASE | 현재 단계 |
| 2 | TOKEN_TEST_STATUS | 실제 token 발급 테스트 |
| 3 | EXECUTION_LOCK | 실행 잠금 |
| 4 | NETWORK_TOKEN_STATUS | 네트워크/token 요청 |
| 5 | DB_WRITE_STATUS | 운영 DB write |
| 6 | NEXT_ACTION | 다음 행동 |

## Completed Flow Steps (7개)

| id | stepKey | Task |
|----|---------|------|
| 1 | READINESS | Task 41 |
| 2 | FINAL_CONFIRMATION_GATE | Task 42 |
| 3 | ACTION_LOCK | Task 43 |
| 4 | SAFETY_REVIEW | Task 44 |
| 5 | SAFE_NEXT_STEP_GUIDE | Task 45 |
| 6 | SEPARATE_APPROVAL_PACKET | Task 46 |
| 7 | APPROVAL_EVIDENCE_TIMELINE | Task 47 |

## 화면 흐름 연결 방식

```
[Task 41] Readiness Screen              → completedFlowSteps[0] (READINESS)
[Task 42] Final Confirmation Gate       → completedFlowSteps[1] (FINAL_CONFIRMATION_GATE)
[Task 43] Action Lock                   → completedFlowSteps[2] (ACTION_LOCK)
[Task 44] Safety Review                 → completedFlowSteps[3] (SAFETY_REVIEW)
[Task 45] Safe Next Step Guide          → completedFlowSteps[4] (SAFE_NEXT_STEP_GUIDE)
[Task 46] Separate Approval Packet      → completedFlowSteps[5] (SEPARATE_APPROVAL_PACKET)
[Task 47] Approval Evidence Timeline    → completedFlowSteps[6] (APPROVAL_EVIDENCE_TIMELINE)
[Task 48] Approval Console              ← 현재 (전체 흐름 콘솔 요약, read-only)
```

### 렌더링 순서 (page.tsx)

```
... (기존 패널들)
Token First Test Safety Review Screen       [Task 44]
Token First Test Safe Next Step Guide       [Task 45]
Token First Test Separate Approval Packet   [Task 46]
Token First Test Approval Evidence Timeline [Task 47]
Token First Test Approval Console           [Task 48] ← 신규 추가
Manual Approval Checklist Panel
BatchJob 실행 결과
...
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 슬레이트(slate) 아이콘 + "Token First Test Approval Console" |
| 설명 | read-only console 요약 안내 문구 |
| 전체 상태 요약 배너 | 7개 단계 완료 · 미승인 · 잠금 유지 상태 |
| 현재 상태 요약 (6개) | itemKey + label + currentValue 테이블 형태 |
| 완료된 안전 검토 흐름 (7개) | 배지 형태로 stepKey 표시 + 초록 체크 |
| 다음 필요 행동 | 앰버 박스 (별도 승인 프로세스 안내) |
| 콘솔 안내 | 회색 박스 (화면 검토용, 실제 승인 미연결) |

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
