# Task 51 - Token First Test Separate Approval Request Draft Read-only Screen Flow Result

## 작업 목적

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면의 Token First Test 검토 영역 마지막에
"Separate Approval Request Draft" read-only 패널을 추가합니다.
사용자가 실제 token 발급 테스트 실행 전, 별도 승인 요청에 필요한 내용을
화면에서 최종 문서처럼 read-only로 확인할 수 있게 합니다.
실제 승인 요청 제출, 저장, 실행 기능은 존재하지 않습니다.

## 추가/수정 파일 목록

### 신규 파일

| 파일 경로 | 역할 |
|-----------|------|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-draft-view.service.ts` | Separate Approval Request Draft View Model 생성 순수 함수 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-draft-view.test.ts` | 위 서비스에 대한 76개 테스트 케이스 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-request-draft-screen-flow-result.md` | 이 결과 문서 |

### 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `buildNaverApiTokenFirstTestSeparateApprovalRequestDraftView` import 추가 + `naverAuthTokenFirstTestSeparateApprovalRequestDraftScreen` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | `DraftBatchJob` 타입에 `naverAuthTokenFirstTestSeparateApprovalRequestDraftScreen` 추가 + UI 패널 렌더링 추가 |

## View Model 구조

```typescript
NaverApiTokenFirstTestSeparateApprovalRequestDraftViewModel {
  // Required True flags (9개)
  approvalRequestDraftCreated: true
  displayOnly: true
  readOnly: true
  executionLocked: true
  draftIsReadOnly: true
  approvalNotYetRequested: true
  manualReviewRequired: true
  requiresSeparateLiveApproval: true
  tokenTestStillNotAllowed: true

  // View content
  title: 'Token First Test Separate Approval Request Draft'
  draftLabel: '별도 승인 요청 초안 (검토용 문서 — 제출 기능 없음)'
  draftPurpose: string
  currentStatusSummary: string
  whyNotAllowedYet: string
  approvalRequestSections: ApprovalRequestDraftSection[]  // 6개
  stillProhibitedItems: string[]  // 10개
  draftNote: string

  // Required False flags (51개 — approvalRequestSubmitButton 2개 추가 포함)
  executionButtonRendered: false
  approvalButtonRendered: false
  approvalRequestSubmitButtonRendered: false
  approvalRequestSubmitButtonEnabled: false
  formRendered: false
  ... (이하 동일)
}
```

## Approval Request Draft Sections (6개)

| id | sectionKey | sectionTitle |
|----|------------|--------------|
| 1 | CURRENT_STATUS | 현재 실행 상태 요약 |
| 2 | WHY_NOT_ALLOWED | 아직 실행 불가인 이유 |
| 3 | APPROVAL_PURPOSE | 별도 승인 요청 목적 |
| 4 | SAFETY_EVIDENCE | 승인자가 확인해야 할 안전 근거 |
| 5 | UNLOCK_CONDITIONS | 승인 이후에도 필요한 잠금 해제 조건 |
| 6 | PROHIBITED_ITEMS | 승인 이후에도 여전히 금지된 항목 |

모든 section: `isReadOnly: true`, `isSubmittable: false`

## Still Prohibited Items (10개)

1. token 원문 발급 및 화면 표시 금지
2. 인증 키 요청 금지
3. 인증 토큰 갱신 요청 금지
4. 운영 DB write 금지
5. 가격 변경 금지
6. 재고 변경 금지
7. 상품 조회 API 금지
8. 상품 수정 API 금지
9. Queue/Worker 실행 금지
10. 무단 재실행 금지

## 화면 흐름 연결 방식

```
렌더링 순서 (page.tsx):
[Task 49] Review Hub Navigation      — Token First Test 영역 상단 목차
[Task 50] Review Section Layout      — 검토 전용 영역 안내
[Task 41] Readiness Screen           — 준비 상태 확인
[Task 42] Final Confirmation Gate    — 최종 확인 게이트
[Task 43] Action Lock                — 실행 잠금 상태
[Task 44] Safety Review              — 안전 검토 항목
[Task 45] Safe Next Step Guide       — 다음 단계 가이드
[Task 46] Separate Approval Packet   — 별도 승인 패킷
[Task 47] Approval Evidence Timeline — 안전 검토 타임라인
[Task 48] Approval Console           — 전체 흐름 콘솔 요약
[Task 51] Separate Approval Request Draft ← 신규 추가 (Approval Console 다음, Manual Approval Checklist 직전)
Manual Approval Checklist Panel
BatchJob 실행 결과
```

## 화면 구성 요소

| 영역 | 내용 |
|------|------|
| 헤더 | 인디고(indigo) 아이콘 + "Token First Test Separate Approval Request Draft" |
| 초안 경고 배너 | AlertTriangle 아이콘 + draftLabel + draftPurpose |
| 현재 상태 요약 | mono 폰트 상태 요약 (실행 잠금 \| 네트워크 차단 \| DB write 차단 \| 별도 승인 대기) |
| 실행 불가 이유 | whyNotAllowedYet 텍스트 |
| 별도 승인 요청 초안 섹션 (6개) | sectionTitle + sectionContent + read-only 배지 |
| 여전히 금지된 항목 (10개) | 빨간 ✕ 아이콘 + 항목 설명 |
| 초안 안내 | Info 아이콘 + draftNote |

## 안전 규칙 준수 항목

| 항목 | 결과 |
|------|------|
| 실행 버튼 없음 | ✅ |
| 승인 요청 제출 버튼 없음 | ✅ |
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
