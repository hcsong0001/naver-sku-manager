# Task 245: Naver Token Issuance Env Auth Presence Check Harness Screen Flow Result

## 목적
실제 토큰 발급 전 환경변수/인증정보 존재 여부 확인에 사용할 Harness를 read-only 화면으로 준비. 이번 Task에서는 ".env" 확인 실행도 하지 않으며 인증키/토큰 값을 출력하지 않음. Secret 로그 출력도 금지됨.

## 추가된 패널 위치
```
Task 244 Env Auth Presence Preflight
Task 245 Env Auth Presence Check Harness   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-harness-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-harness-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-harness-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: ENV_AUTH_PRESENCE_CHECK_HARNESS_READY
- isBatchJobResultDisplayOnly: true
- isEnvAuthPresenceCheckHarnessReady: true
- isEnvAuthPresencePreflightReady: true
- isUserApprovalStillRequired: true
- isNextStepRequiresUserApproval: true
- isEnvPresenceCheckPlanned: true
- isAuthKeyPresenceCheckPlanned: true
- isEnvPresenceCheckExecuted: false
- isAuthKeyPresenceCheckExecuted: false
- isEnvValueDisplayed: false
- isAuthKeyValueDisplayed: false
- isSecretLogged: false
- isTokenIssuanceAllowed: false
- isTokenIssued: false
- isTokenStored: false
- isActualApprovalGranted: false
- isApprovalSubmitted: false
- isExecutionAllowed: false

## Harness Items (15개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Env/Auth Presence Preflight (Task 244) | PREFLIGHT_CONFIRMED | Task 244 준비 완료 |
| Presence Check Harness | HARNESS_READY | 비노출 확인 Harness 준비 |
| ".env" 존재 여부 확인 실행 | NOT_EXECUTED | 아직 실행하지 않음 |
| 인증정보 존재 여부 확인 실행 | NOT_EXECUTED | 아직 실행하지 않음 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| Token 발급 | LOCKED | 아직 발급 불가 |
| Token 저장 | LOCKED | 저장 없음 |
| Naver API 호출 | LOCKED | 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 245는 Harness 표시 전용 |

## 이 패널이 아닌 것들
- ".env" 열람이 아님: `hasEnvFileAccess: false`, `isEnvPresenceCheckExecuted: false`
- 인증키 접근이 아님: `hasAuthKeyAccess: false`, `isAuthKeyPresenceCheckExecuted: false`
- 인증키 값/Secret 표시 아님: `isEnvValueDisplayed: false`, `isAuthKeyValueDisplayed: false`, `isSecretLogged: false`
- Token 발급이 아님: `isTokenIssuanceAllowed: false`, `isTokenIssued: false`, `isTokenStored: false`
- 실제 승인 제출이 아님: `isApprovalSubmission: false`, `isApprovalSubmitted: false`, `isActualApprovalGranted: false`
- 실행 허용 아님: `isExecutionAllowed: false`, `isLiveExecutionEnabled: false`
- POST API 연결이 아님: `isPostApiConnected: false`
- Worker/Queue/Adapter 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`
- DB Write가 아님: `isMutationConnected: false`
- 승인/실행 버튼 없음: `hasApprovalRequestButton: false`, `hasExecutionButton: false`, `hasSubmitAction: false`

## 다음 단계 진행 조건
Task 246에서 사용자가 승인하면 비노출 방식의 실제 presence check 단계로 넘어갈 수 있습니다. 사용자의 별도 명시 지시가 있을 때만 다음 단계가 진행됩니다.
