# Task 239: Naver API Connection Approval Manual Approval Request Waiting Notice Screen Flow Result

## 목적
Task 238 비실행 인증 이후 실제 다음 단계는 사용자의 별도 수동 승인 요청이 있어야만 가능하다는 안내를 read-only 패널로 표시. 승인 요청 버튼이나 실행 기능이 없는 순수 대기 상태 안내 패널.

## 추가된 패널 위치
```
Task 238 Pre-Approval Non-Execution Certification
Task 239 Manual Approval Request Waiting Notice   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-manual-approval-request-waiting-notice-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-manual-approval-request-waiting-notice-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-api-connection-approval-manual-approval-request-waiting-notice-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: MANUAL_APPROVAL_REQUEST_WAITING
- isBatchJobResultDisplayOnly: true
- isManualApprovalRequestWaiting: true
- isPreApprovalNonExecutionCertified: true
- isUserApprovalStillRequired: true
- isManualApprovalRequestSubmitted: false
- isActualApprovalGranted: false
- isActualApprovalSubmissionAllowed: false
- isApprovalSubmitted: false
- isExecutionAllowed: false

## Notice Items (14개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| 비실행 인증 (Task 238) | NON_EXECUTION_CERTIFIED | Task 238 인증 완료 |
| 사용자 수동 승인 요청 | WAITING_MANUAL_REQUEST | 아직 요청 없음 |
| 실제 사용자 승인 | PENDING_USER_APPROVAL | 아직 승인되지 않음 |
| 실제 승인 제출 | NOT_SUBMITTED | 제출되지 않음 |
| 실행 권한 | NOT_ALLOWED | 실행 권한 없음 |
| 실행 버튼 | NOT_PRESENT | 버튼 없음 |
| Submit Action | NOT_PRESENT | submit 동작 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| Token / Naver API | LOCKED | 발급/호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| 운영 DB write | LOCKED | 저장/변경 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 239는 대기 안내 표시 전용 |

## 이 패널이 아닌 것들
- 승인 요청 버튼이 아님: `hasExecutionButton: false`, `hasSubmitAction: false`
- 실제 승인 제출이 아님: `isApprovalSubmission: false`, `isApprovalSubmitted: false`, `isActualApprovalGranted: false`
- 실행 허용 아님: `isExecutionAllowed: false`, `isLiveExecutionEnabled: false`
- POST API 연결이 아님: `isPostApiConnected: false`
- Worker/Queue/Adapter 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`
- DB Write가 아님: `isMutationConnected: false`
- .env / 인증키 접근이 아님: `hasEnvFileAccess: false`, `hasAuthKeyAccess: false`

## 사용자 명시 지시 전까지 자동/수동 진행 완전 금지
이 대기 안내 패널을 표시한다고 해서 수동 승인 요청이 이루어진 것이 아닙니다. 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다.
