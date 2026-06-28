# Task 247: Naver Token Issuance Env Auth Presence Check Result Screen Flow Result

## 목적
Task 246 Execution Gate 다음 단계로, 실제 Token 발급 전에 필요한 Env/Auth 존재 여부만 비노출 방식으로 확인하고 그 결과를 read-only 패널로 표시한다. `.env` 파일은 직접 열지 않으며, 인증키/토큰/secret 값, 일부 값, 마스킹 값, 해시값도 표시하지 않는다.

## 추가된 패널 위치
```text
Task 246 Env Auth Presence Check Execution Gate
Task 247 Env Auth Presence Check Result
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-presence-check-result-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- `status: ENV_AUTH_PRESENCE_CHECK_RESULT_READY`
- `isBatchJobResultDisplayOnly: true`
- `isEnvAuthPresenceCheckResultReady: true`
- `isEnvAuthPresenceCheckExecutionGateReady: true`
- `isEnvAuthPresenceCheckHarnessReady: true`
- `isEnvPresenceCheckReady: true`
- `isAuthKeyPresenceCheckReady: true`
- `isEnvPresenceCheckExecuted: true`
- `isAuthKeyPresenceCheckExecuted: true`
- `isEnvFileDirectlyAccessed: false`
- `isEnvValueDisplayed: false`
- `isAuthKeyValueDisplayed: false`
- `isSecretLogged: false`
- `hasEnvFileAccess: false`
- `hasAuthKeyAccess: false`
- `isTokenIssuanceAllowed: false`
- `isTokenIssued: false`
- `isTokenStored: false`
- `isActualApprovalGranted: false`
- `isActualApprovalSubmissionAllowed: false`
- `isApprovalSubmitted: false`
- `isExecutionAllowed: false`

## Presence 결과 표시 원칙
- `.env` 파일 직접 열람 없음
- 런타임 `process.env[KEY]` 기반 존재 여부만 확인
- 각 필수 항목은 `PRESENT` 또는 `MISSING`만 표시
- 값 자체, 일부 값, 마스킹 값, 해시값은 모두 미표시
- 기존 인증 키 이름 `NAVER_API_CLIENT_ID`, `NAVER_API_CLIENT_SECRET`를 재사용
- Base URL 키는 `NAVER_COMMERCE_API_BASE_URL`로 존재 여부만 확인

## Result Items (16개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Presence Check Execution Gate | EXECUTION_GATE_CONFIRMED | Task 246 Gate 확인 |
| Env/Auth Presence Check | CHECK_EXECUTED_NON_EXPOSURE | 비노출 방식 확인 완료 |
| `.env` 파일 직접 열람 | NOT_ACCESSED | 파일 직접 열람 없음 |
| 환경변수 값 표시 | NOT_DISPLAYED | 값 출력 없음 |
| 인증키 값 표시 | NOT_DISPLAYED | 값 출력 없음 |
| Secret 로그 출력 | NOT_LOGGED | 로그 노출 없음 |
| 필수 Env 존재 결과 | PRESENT_OR_MISSING_ONLY | 존재/누락 여부만 표시 |
| Token 발급 | LOCKED | 아직 발급 불가 |
| Token 저장 | LOCKED | 저장 없음 |
| Naver API 호출 | LOCKED | 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 247은 결과 표시 전용 |

## 이 패널이 아닌 것들
- Token 발급이 아님: `isTokenIssuanceAllowed: false`, `isTokenIssued: false`, `isTokenStored: false`
- `.env` 직접 열람이 아님: `isEnvFileDirectlyAccessed: false`, `hasEnvFileAccess: false`
- 인증키 값 표시가 아님: `isEnvValueDisplayed: false`, `isAuthKeyValueDisplayed: false`
- Secret 로그 출력이 아님: `isSecretLogged: false`
- POST API / submit / 승인 버튼 연결이 아님: `isPostApiConnected: false`, `hasSubmitAction: false`, `hasApprovalRequestButton: false`, `hasExecutionButton: false`
- Worker / Queue / Adapter / DB write 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`, `isMutationConnected: false`
- Naver API / 상품 API / 가격·재고 변경이 아님: `isNaverApiCalled: false`, `isProductLookupApiCalled: false`, `isProductUpdateApiCalled: false`, `isPriceOrStockChanged: false`

## 다음 단계 진행 조건
Task 247은 존재 여부 확인 결과 표시까지만 담당한다. Token 발급이나 실제 API 호출은 포함되지 않으며, 다음 Task는 별도 지시가 있을 때만 진행한다.
