# Token First Test Separate Approval Submission Decision Seal Screen Flow Result

## Task

Task 71 - Token First Test Separate Approval Submission Decision Seal Read-only Screen Flow

## 목적

Task 70 Separate Approval Submission Readiness Decision 이후, 아직 제출/실행이 허용되지 않았음을
read-only로 봉인하는 "Separate Approval Submission Decision Seal" 패널을 추가합니다.

이 화면은 실제 승인 요청 제출이나 token 발급 테스트 실행과 무관합니다.
제출 판단 봉인 결과를 read-only로 표시하며 어떠한 실행 동작도 허용하지 않습니다.

## 구현 범위

### 신규 파일

- `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-decision-seal-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-decision-seal-view.test.ts`
- `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-separate-approval-submission-decision-seal-screen-flow-result.md`

### 수정 파일

- `app/api/sku-matching/draft-batch/[jobId]/route.ts` — import 및 `naverAuthTokenFirstTestSeparateApprovalSubmissionDecisionSealScreen` 필드 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` — 타입 정의 및 UI 패널 추가

## View Model

`NaverApiTokenFirstTestSeparateApprovalSubmissionDecisionSealViewModel`

### 핵심 플래그

| 필드 | 값 |
|------|-----|
| `submissionDecisionSealReviewOnly` | `true` |
| `separateApprovalStillRequired` | `true` |
| `executionStillForbidden` | `true` |
| `tokenRequestStillForbidden` | `true` |
| `naverApiCallStillForbidden` | `true` |
| `operatingDbWriteStillForbidden` | `true` |
| `priceStockChangeStillForbidden` | `true` |
| `queueWorkerStillDisconnected` | `true` |
| `postApiStillNotAdded` | `true` |
| `approvalRequestSubmitted` | `false` |
| `approvalRequestSubmissionAllowed` | `false` |
| `approvalRequestSubmitButtonRendered` | `false` |
| `submissionReadinessDecisionCommit` | `ddb2f60` |

### 배열 필드

| 배열 | 항목 수 | 설명 |
|------|---------|------|
| `decisionSealItems` | 5 | 봉인된 판단 내용 (SEALED/NOT_RELEASED/BLOCKED) |
| `submissionStillBlockedItems` | 4 | 제출이 여전히 차단된 사유 |
| `executionStillForbiddenItems` | 5 | 실행이 여전히 금지된 항목 |
| `nextStepItems` | 3 | 다음 단계 안내 |
| `stillForbiddenItems` | 5 | 봉인 이후에도 금지 유지 항목 요약 |

### decisionSealItems 키 목록

1. `SEAL_SUBMISSION_NOT_OCCURRED` — 승인 요청 제출 발생 안 됨
2. `SEAL_EXECUTION_NOT_RELEASED` — 실행 해제 안 됨
3. `SEAL_TOKEN_REQUEST_LOCKED` — 인증 키 요청 잠금 유지
4. `SEAL_APPROVAL_INCOMPLETE` — 별도 승인 미완료
5. `SEAL_READINESS_DECISION_ONLY` — 이 화면은 판단 봉인 전용

### submissionStillBlockedItems 키 목록

1. `SUBMIT_BLOCKED_NO_APPROVAL_AUTHORITY` — 승인 권한자 미확정
2. `SUBMIT_BLOCKED_NO_SUBMIT_FUNCTION` — 이 화면에 제출 기능 없음
3. `SUBMIT_BLOCKED_CHANNEL_NOT_READY` — 별도 제출 채널 연결 없음
4. `SUBMIT_BLOCKED_SEAL_PHASE_ONLY` — 제출 판단 봉인 단계만 완료

### executionStillForbiddenItems 키 목록

1. `EXEC_FORBIDDEN_TOKEN_REQUEST` — 인증 키 요청
2. `EXEC_FORBIDDEN_API_CALL` — 외부 서비스 API 호출
3. `EXEC_FORBIDDEN_DB_WRITE` — 운영 DB write
4. `EXEC_FORBIDDEN_QUEUE_WORKER` — Queue/Worker 실행
5. `EXEC_FORBIDDEN_PRICE_STOCK` — 가격·재고 변경

### nextStepItems 키 목록

1. `NEXT_SUBMIT_VIA_SEPARATE_CHANNEL` — 별도 채널을 통한 승인 요청 제출 검토
2. `NEXT_CRITERIA_CONFIRMATION` — 제출 전 승인 기준 확정 검토
3. `NEXT_EXECUTION_SAFETY_REVIEW` — 추가 실행 안전 해제 단계 검토

## 화면 배치

- Task 70 Separate Approval Submission Readiness Decision 패널 **직후** 배치
- Task 41~70 기존 read-only 흐름 유지
- Manual Approval Checklist 삭제/동작 변경 없음

## 안전 확인

### 금지 항목 (모두 false/미구현)

- 실제 Naver API 호출: 없음
- access/refresh token 요청: 없음
- token 발급: 없음
- Authorization/Bearer 헤더: 없음
- endpoint URL/path 원문: 없음
- fetch/axios/http client 신규 추가: 없음
- 운영 DB write: 없음
- Prisma mutation: 없음
- 가격/재고 변경: 없음
- POST API 추가: 없음
- Queue/Worker 실행 연결: 없음
- 실행 버튼: 없음
- 승인 요청 제출 버튼: 없음
- 승인 버튼: 없음
- form submit: 없음
- Submission Decision Seal 저장/제출/확정/해제 버튼: 없음
- stash pop/apply: 없음
- `git add .` 사용: 없음
- package.json/package-lock.json 변경: 없음
- Prisma schema/migration 변경: 없음

## 테스트 결과

- 신규 테스트: 89개 통과 (Task 71)
- 기존 token-first-test 전체 테스트: 유지

## 참조 커밋

- Task 70 Submission Readiness Decision 커밋: `ddb2f60`
- Task 71 Submission Decision Seal 구현 커밋: (이번 커밋)

## 다음 단계

이 화면은 "제출 판단 봉인"만 완료합니다.
실제 승인 요청 제출 기능 구현은 별도 작업입니다.
실행 허용은 추가 안전 해제 단계가 필요합니다.
