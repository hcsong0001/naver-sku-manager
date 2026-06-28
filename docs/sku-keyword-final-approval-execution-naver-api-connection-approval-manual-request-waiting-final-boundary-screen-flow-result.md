# Task 241: Naver API Connection Approval Manual Request Waiting Final Boundary Screen Flow Result

## 목적
Task 240 비제출 봉인 이후 현재 상태를 수동 승인 요청 전 최종 경계 상태로 read-only 표시. 경계를 넘으려면 사용자의 명시 지시가 필요하며 승인 요청 버튼/실행 버튼/submit 없는 순수 표시 전용 패널.

## 추가된 패널 위치
```
Task 240 Manual Request Non-Submission Seal
Task 241 Manual Request Waiting Final Boundary   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-manual-request-waiting-final-boundary-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-manual-request-waiting-final-boundary-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-api-connection-approval-manual-request-waiting-final-boundary-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: MANUAL_REQUEST_WAITING_FINAL_BOUNDARY
- isBatchJobResultDisplayOnly: true
- isManualRequestWaitingFinalBoundaryReady: true
- isManualRequestNonSubmissionSealed: true
- isManualApprovalRequestWaiting: true
- isManualApprovalRequestSubmitted: false
- isUserApprovalStillRequired: true
- isActualApprovalGranted: false
- isActualApprovalSubmissionAllowed: false
- isApprovalSubmitted: false
- isExecutionAllowed: false

## Boundary Items (16개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Manual Request Non-Submission Seal (Task 240) | NON_SUBMISSION_SEALED | Task 240 비제출 봉인 확인 |
| 수동 승인 요청 | WAITING_MANUAL_REQUEST | 아직 요청 없음 |
| 실제 사용자 승인 | PENDING_USER_APPROVAL | 아직 승인되지 않음 |
| 실제 승인 제출 | NOT_SUBMITTED | 제출되지 않음 |
| 최종 경계 상태 | BOUNDARY_CONFIRMED | 승인 요청 전 경계 확인 |
| 승인 요청 버튼 | NOT_PRESENT | 버튼 없음 |
| 실행 버튼 | NOT_PRESENT | 버튼 없음 |
| Submit Action | NOT_PRESENT | submit 없음 |
| POST API 연결 | NOT_CONNECTED | 제출 경로 없음 |
| 실행 권한 | NOT_ALLOWED | 실행 권한 없음 |
| Token / Naver API | LOCKED | 발급/호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| 운영 DB write | LOCKED | 저장/변경 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 241은 최종 경계 표시 전용 |

## 이 패널이 아닌 것들
- 승인 요청 버튼이 아님: `hasApprovalRequestButton: false`, `hasExecutionButton: false`, `hasSubmitAction: false`
- 실제 승인 제출이 아님: `isApprovalSubmission: false`, `isApprovalSubmitted: false`, `isActualApprovalGranted: false`
- 실행 허용 아님: `isExecutionAllowed: false`, `isLiveExecutionEnabled: false`
- POST API 연결이 아님: `isPostApiConnected: false`
- Worker/Queue/Adapter 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`
- DB Write가 아님: `isMutationConnected: false`
- .env / 인증키 접근이 아님: `hasEnvFileAccess: false`, `hasAuthKeyAccess: false`

## 사용자 명시 지시 전까지 자동/수동 진행 완전 금지
최종 경계 표시는 경계를 넘은 것이 아닙니다. 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다.
