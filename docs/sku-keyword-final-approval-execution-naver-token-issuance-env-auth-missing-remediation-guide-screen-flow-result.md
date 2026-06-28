# Task 248: Naver Token Issuance Env Auth Missing Remediation Guide Screen Flow Result

## 목적
Task 247에서 확인된 `PRESENT 0 / MISSING 3` 결과를 기준으로, 누락된 Env/Auth 항목을 사용자가 안전하게 보정해야 함을 read-only 패널로 안내한다. 이번 Task에서는 `.env` 파일 직접 열람이나 자동 수정 없이 안내만 표시하며, Token 발급은 진행하지 않는다.

## 추가된 패널 위치
```text
Task 247 Env Auth Presence Check Result
Task 248 Env Auth Missing Remediation Guide
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-missing-remediation-guide-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-missing-remediation-guide-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-missing-remediation-guide-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- `status: ENV_AUTH_MISSING_REMEDIATION_GUIDE_READY`
- `isBatchJobResultDisplayOnly: true`
- `isEnvAuthMissingRemediationGuideReady: true`
- `isEnvAuthPresenceCheckResultReady: true`
- `presencePresentCount: 0`
- `presenceMissingCount: 3`
- `isMissingEnvAuthDetected: true`
- `isTokenIssuanceBlockedByMissingEnvAuth: true`
- `isUserActionRequiredForEnvAuth: true`
- `isEnvPresenceCheckExecuted: true`
- `isAuthKeyPresenceCheckExecuted: true`
- `isEnvFileDirectlyAccessed: false`
- `isEnvFileModified: false`
- `isEnvValueDisplayed: false`
- `isAuthKeyValueDisplayed: false`
- `isSecretLogged: false`
- `hasEnvFileAccess: false`
- `hasAuthKeyAccess: false`
- `isTokenIssuanceAllowed: false`
- `isTokenIssued: false`
- `isTokenStored: false`

## Guide Items (17개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Env/Auth Presence Check Result | PRESENCE_RESULT_CONFIRMED | Task 247 결과 확인 |
| 현재 확인 결과 | MISSING_DETECTED | PRESENT 0 / MISSING 3 |
| Token 발급 가능 여부 | BLOCKED_BY_MISSING_ENV_AUTH | 누락으로 발급 불가 |
| 사용자 보정 필요 | USER_ACTION_REQUIRED | 사용자가 환경변수/인증정보를 설정해야 함 |
| `.env` 직접 열람 | NOT_ACCESSED | 파일 직접 열람 없음 |
| `.env` 자동 수정 | NOT_MODIFIED | 자동 수정 없음 |
| 인증키 값 표시 | NOT_DISPLAYED | 값 출력 없음 |
| Secret 로그 출력 | NOT_LOGGED | 로그 노출 없음 |
| Token 발급 | LOCKED | 아직 발급 불가 |
| Token 저장 | LOCKED | 저장 없음 |
| Naver API 호출 | LOCKED | 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 248은 누락 보정 안내 표시 전용 |

## 사용자 보정 안내
- 현재 런타임 환경에서 Token 발급 필수 환경변수/인증정보가 확인되지 않았음
- 이 상태에서는 Token 발급 테스트를 진행할 수 없음
- 사용자가 로컬 실행 환경 또는 배포 환경에 필요한 값을 직접 설정한 뒤, 다음 Task에서 비노출 방식으로 재확인해야 함
- 키 이름은 표시 가능하지만 값, 일부 값, 마스킹 값, 해시값은 표시 금지

## 이 패널이 아닌 것들
- `.env` 직접 열람이 아님: `isEnvFileDirectlyAccessed: false`, `hasEnvFileAccess: false`
- `.env` 자동 수정이 아님: `isEnvFileModified: false`
- 인증키 값 표시가 아님: `isEnvValueDisplayed: false`, `isAuthKeyValueDisplayed: false`
- Secret 로그 출력이 아님: `isSecretLogged: false`
- Token 발급/저장이 아님: `isTokenIssuanceAllowed: false`, `isTokenIssued: false`, `isTokenStored: false`
- POST API / submit / 실행 버튼 연결이 아님: `isPostApiConnected: false`, `hasSubmitAction: false`, `hasExecutionButton: false`
- Worker / Queue / Adapter / DB write 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`, `isMutationConnected: false`
- Naver API / 상품 API / 가격·재고 변경이 아님: `isNaverApiCalled: false`, `isProductLookupApiCalled: false`, `isProductUpdateApiCalled: false`, `isPriceOrStockChanged: false`

## 다음 단계 진행 조건
Task 248은 누락 보정 안내까지만 담당한다. 사용자가 필요한 값을 직접 설정한 후에만 다음 Task에서 비노출 방식 재확인을 진행할 수 있다.
