# Task 52 - Token First Test Approval Readiness Checklist Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면의 Token First Test 검토 영역에
"Approval Readiness Checklist" read-only 패널을 추가합니다.
별도 승인 요청 초안(Task 51)까지 확인한 사용자가 "아직 무엇이 충족되어야 실제 승인 검토로 넘어갈 수 있는지"를
read-only 체크리스트로 확인할 수 있게 합니다.
실제 체크 저장, 승인 저장, 실행 연결 기능은 존재하지 않습니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-readiness-checklist-view.service.ts` | Approval Readiness Checklist View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-readiness-checklist-view.test.ts` | 위 서비스에 대한 81개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-approval-readiness-checklist-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestApprovalReadinessChecklistView` import 추가 + `naverAuthTokenFirstTestApprovalReadinessChecklistScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestApprovalReadinessChecklistScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestApprovalReadinessChecklistViewModel {
  // Required True flags (9개)
  approvalReadinessChecklistCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  checklistIsReadOnly: true
  allItemsReadOnly: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Approval Readiness Checklist'
  checklistLabel: '승인 준비 상태 체크리스트 (read-only — 저장/제출 기능 없음)'
  checklistDescription: string
  checklistItems: ApprovalReadinessChecklistItem[]  // 8개
  checklistNote: string

  // Required False flags (추가: checklistSaveButton 2개)
  executionButtonRendered: false
  approvalButtonRendered: false
  checklistSaveButtonRendered: false
  checklistSaveButtonEnabled: false
  formRendered: false
  ... (이하 동일)
}
```

## Checklist Items (8개)

| id | checkKey | checkStatus |
|----|----------|-------------|
| 1 | REVIEW_PANELS_DISPLAYED | CONFIRMED |
| 2 | EXECUTION_LOCKED | LOCKED |
| 3 | TOKEN_TEST_NOT_ALLOWED | LOCKED |
| 4 | APPROVAL_REQUEST_DRAFT_READY | CONFIRMED |
| 5 | RISK_SCOPE_DOCUMENTED | CONFIRMED |
| 6 | NETWORK_TOKEN_BLOCKED | LOCKED |
| 7 | DB_WRITE_BLOCKED | LOCKED |
| 8 | NO_EXECUTION_UI | CONFIRMED |

모든 item: `isReadOnly: true`, `isCheckable: false`

## 화면 흐름 연결 방식

```
렌더링 순서 (page.tsx):
[Task 49] Review Hub Navigation          — Token First Test 영역 상단 목차
[Task 50] Review Section Layout          — 검토 전용 영역 안내
[Task 41] Readiness Screen               — 준비 상태 확인
[Task 42] Final Confirmation Gate        — 최종 확인 게이트
[Task 43] Action Lock                    — 실행 잠금 상태
[Task 44] Safety Review                  — 안전 검토 항목
[Task 45] Safe Next Step Guide           — 다음 단계 가이드
[Task 46] Separate Approval Packet       — 별도 승인 패킷
[Task 47] Approval Evidence Timeline     — 안전 검토 타임라인
[Task 48] Approval Console               — 전체 흐름 콘솔 요약
[Task 51] Separate Approval Request Draft — 별도 승인 요청 초안
[Task 52] Approval Readiness Checklist   ← 신규 추가 (Draft 다음, Manual Checklist 직전)
Manual Approval Checklist Panel
BatchJob 실행 결과
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 청록(teal) CheckCircle2 아이콘 + "Token First Test Approval Readiness Checklist" |
| 체크리스트 안내 배너 | AlertTriangle + checklistLabel + checklistDescription |
| 체크리스트 항목 (8개) | checkStatus별 색상(green=CONFIRMED, red=LOCKED, gray=PENDING) + read-only 배지 |
| 체크리스트 안내 | Info 아이콘 + checklistNote |

## 안전 규칙 준수 항목

| 항목 | 결과 |
|------|------|
| 실행 버튼 없음 | ✅ |
| 승인 요청 제출 버튼 없음 | ✅ |
| 승인 버튼 없음 | ✅ |
| 체크리스트 저장 버튼 없음 | ✅ |
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
