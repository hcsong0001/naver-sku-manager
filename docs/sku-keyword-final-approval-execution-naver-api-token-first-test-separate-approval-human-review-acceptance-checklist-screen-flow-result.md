# Task 74 - Token First Test Separate Approval Human Review Acceptance Checklist Read-only Screen Flow Result

## 작업명

Token First Test Separate Approval Human Review Acceptance Checklist Read-only Screen Flow

## 기준 커밋

a633bca (Task 73: Final Closure Handoff Summary 완료 시점)

## 구현 요약

Task 73 Final Closure Handoff Summary 패널 직후에 "Human Review Acceptance Checklist" read-only 패널을 추가합니다.

이번 Task 74의 목적:
1. Task 41~73 read-only 흐름이 실제 제출/실행으로 이어지지 않았음을 유지
2. Task 73 Handoff Summary 이후, 사람이 검토를 수락하기 전에 확인해야 할 체크리스트를 화면에 표시
3. 현재 상태가 "실행 준비 완료"가 아니라 "사람 검토 수락 전 체크리스트 표시 완료"임을 명확히 표시
4. token 발급, 승인 요청 제출, 실행 버튼, POST API, Worker/Queue 연결 없이 화면 표시만 추가

## 배치 위치

`/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에서:

- Task 73 Final Closure Handoff Summary 패널 바로 다음
- BatchJob 실행 결과 패널 이전

## 화면 흐름

Task 73 (Final Closure Handoff Summary) → **Task 74 (Human Review Acceptance Checklist)** → BatchJob 실행 결과

## 구현 파일

### 신규 파일

- `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-acceptance-checklist-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-acceptance-checklist-view.test.ts`
- `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-human-review-acceptance-checklist-screen-flow-result.md`

### 수정 파일

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`

## View Model 구성

### NaverApiTokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView

| 필드 | 설명 |
|------|------|
| title | "Token First Test Separate Approval - Human Review Acceptance Checklist" |
| statusLabel | "READ-ONLY HUMAN REVIEW CHECKLIST" |
| statusTone | "warning" |
| summary | Task 41~73 흐름이 실행을 허용하지 않음, 사람 검토 수락 전 체크리스트 |
| taskRangeLabel | "Task 41~73 read-only 흐름 완료 (실행 미해제)" |
| previousHandoffLabel | "Task 73 Final Closure Handoff Summary" |
| previousHandoffCommit | "a633bca" (Task 73 기준 커밋) |
| acceptanceChecklistItems | 검토 수락 전 확인 항목 (최소 5개) |
| reviewerAwarenessItems | 검토자 인지 필요 항목 (최소 3개, tone=warning/blocked) |
| acceptanceBlockedItems | 수락 차단 사유 (최소 4개, 모두 tone=blocked) |
| evidenceReviewItems | 근거 검토 항목 (최소 4개, tone=neutral/warning) |
| notApprovalItems | 이 화면이 승인 부여가 아님을 표시 (최소 4개, 모두 tone=blocked) |
| nextReviewPreparationItems | 다음 검토 준비 항목 (최소 3개) |
| stillForbiddenItems | 여전히 금지 유지 항목 (최소 8개, 모두 tone=blocked) |
| finalNotice | 사람의 별도 명시 승인 전까지 실행으로 전환되지 않는다는 최종 안내 |

## UI 색상 테마

- cyan 색상 (Task 71=violet, Task 72=rose, Task 73=amber, Task 74=cyan)
- 화면 구성: 8개 섹션
  1. Acceptance Checklist
  2. Reviewer Awareness (2-column 왼쪽)
  3. Acceptance Blocked (2-column 오른쪽)
  4. Evidence Review
  5. Not Approval
  6. Next Review Preparation
  7. Still Forbidden
  8. Final Notice

## route/page 수정 요약

- `route.ts`: GET 응답에 `tokenFirstTestSeparateApprovalHumanReviewAcceptanceChecklistView` 필드 추가
- `page.tsx`: DraftBatchJob 타입에 Task 74 필드 추가, Task 73 패널 다음에 UI 패널 추가

## 안전 금지선 유지 내역

### 실제 Naver API 호출 없음

이 서비스 파일에 외부 통신 코드, Naver endpoint URL, 인증 헤더 생성 코드가 없습니다.

### token 요청/발급 없음

access token, refresh token 요청 및 발급이 이 흐름에서 발생하지 않습니다.

### 승인 요청 제출 없음

승인 요청 제출이 이 흐름에서 발생하지 않습니다.

### POST API 없음

route.ts에 POST handler가 추가되지 않았습니다.

### 실행 버튼 없음

page.tsx UI 패널에 실행 버튼, 승인 버튼, 저장 버튼, 제출 버튼이 없습니다.

### 운영 DB write 없음

Prisma mutation, DB write가 이 흐름에서 발생하지 않습니다.

### Prisma schema/migration 변경 없음

prisma/schema.prisma 및 migrations 디렉터리 변경 없음.

### package.json/package-lock.json 변경 없음

의존성 변경 없음.

## 검증 결과

- Task 74 신규 테스트: (기록 후 기입)
- 전체 token-first-test 테스트: (기록 후 기입)
- TypeScript (tsc --noEmit): (기록 후 기입)
- Build (npm run build): (기록 후 기입)
- Prisma validate: (기록 후 기입)
- Prisma generate: (기록 후 기입)
- git diff --check: (기록 후 기입)
- git status --short: (기록 후 기입)
