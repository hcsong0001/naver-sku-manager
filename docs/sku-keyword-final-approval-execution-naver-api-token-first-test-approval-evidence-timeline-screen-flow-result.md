# Task 47 - Token First Test Approval Evidence Timeline Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에서 실제 Token First Test로 넘어가기 전,
지금까지 누적된 안전 검토 단계를 승인자가 한눈에 추적할 수 있도록 "Token First Test Approval Evidence Timeline"
read-only 화면 흐름을 완성합니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-evidence-timeline-view.service.ts` | Approval Evidence Timeline View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-evidence-timeline-view.test.ts` | 위 서비스에 대한 69개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-evidence-timeline-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestApprovalEvidenceTimelineView` import 추가 + `naverAuthTokenFirstTestApprovalEvidenceTimelineScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestApprovalEvidenceTimelineScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestApprovalEvidenceTimelineViewModel {
  // Required True flags
  evidenceTimelineViewCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  allStepsTracked: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Approval Evidence Timeline'
  description: string
  overallLockStatus: '전체 실행 잠금 상태 (executionLocked=true, 실제 token 발급 테스트 미승인)'
  tokenTestBlockedReason: string
  timelineSteps: ApprovalEvidenceTimelineStep[]  // 6개 (단계별 evidence)
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

## Timeline Steps 구조 (6개)

| id | stepKey | stepName |
|----|---------|----------|
| 1 | READINESS | Token First Test Readiness Screen |
| 2 | FINAL_CONFIRMATION_GATE | Token First Test Final Confirmation Gate |
| 3 | ACTION_LOCK | Token First Test Action Lock |
| 4 | SAFETY_REVIEW | Token First Test Safety Review |
| 5 | SAFE_NEXT_STEP_GUIDE | Token First Test Safe Next Step Guide |
| 6 | SEPARATE_APPROVAL_PACKET | Token First Test Separate Approval Packet |

각 step별로:
- `currentStatus`: 완료 상태 문자열
- `confirmedSafetyConditions[]`: 확인된 안전 조건 목록
- `stillLockedConditions[]`: 여전히 잠긴 실행 조건 목록 (false flag)

## 화면 흐름 연결 방식

```
[Task 41] Readiness Screen              → timelineSteps[0]
[Task 42] Final Confirmation Gate       → timelineSteps[1]
[Task 43] Action Lock                   → timelineSteps[2]
[Task 44] Safety Review                 → timelineSteps[3]
[Task 45] Safe Next Step Guide          → timelineSteps[4]
[Task 46] Separate Approval Packet      → timelineSteps[5]
[Task 47] Approval Evidence Timeline    ← 현재 (누적 evidence 추적)
```

### 렌더링 순서 (page.tsx)

```
... (기존 패널들)
Token First Test Safety Review Screen       [Task 44]
Token First Test Safe Next Step Guide       [Task 45]
Token First Test Separate Approval Packet   [Task 46]
Token First Test Approval Evidence Timeline [Task 47] ← 신규 추가
Manual Approval Checklist Panel
BatchJob 실행 결과
...
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 청록색(cyan) 아이콘 + "Token First Test Approval Evidence Timeline" |
| 설명 | read-only evidence timeline 안내 문구 |
| 전체 실행 잠금 상태 | 빨간 경고 박스 (executionLocked=true 명시) |
| token 발급 테스트 차단 이유 | 앰버 박스 (별도 승인 미완료 상태 명시) |
| Evidence Timeline (6개 단계) | 단계별 카드: stepKey 배지 + stepName + currentStatus + 확인된 안전 조건 + 잠긴 실행 조건 |
| 승인 안내 | 회색 박스 (이 timeline은 화면 검토용, 실제 승인은 별도 프로세스) |

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
