# Task 249: Naver Token Issuance Env Auth User Setup Checklist Screen Flow Result

## 목적
Task 248에서 Env/Auth 누락으로 Token 발급이 차단됨을 안내했으므로, 사용자가 직접 설정해야 하는 Naver Token 발급용 Env/Auth User Setup Checklist를 read-only 패널로 추가한다. 이번 Task는 `.env` 수정 작업이 아니며, 개발 에이전트는 `.env`를 열람하거나 수정하지 않는다.

## 추가된 패널 위치
```text
Task 248 Env Auth Missing Remediation Guide
Task 249 Env Auth User Setup Checklist
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-user-setup-checklist-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-user-setup-checklist-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-user-setup-checklist-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- `status: ENV_AUTH_USER_SETUP_CHECKLIST_READY`
- `isBatchJobResultDisplayOnly: true`
- `isEnvAuthUserSetupChecklistReady: true`
- `isEnvAuthMissingRemediationGuideReady: true`
- `isEnvAuthPresenceCheckResultReady: true`
- `presencePresentCount: 0`
- `presenceMissingCount: 3`
- `isMissingEnvAuthDetected: true`
- `isUserSetupRequiredForEnvAuth: true`
- `isNextStepRecheckRequired: true`
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

## Checklist Items (18개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Missing Remediation Guide | REMEDIATION_GUIDE_CONFIRMED | Task 248 누락 안내 확인 |
| 현재 확인 결과 | MISSING_DETECTED | PRESENT 0 / MISSING 3 |
| 사용자 직접 설정 필요 | USER_SETUP_REQUIRED | 사용자가 직접 Env/Auth 설정 필요 |
| 개발 에이전트 .env 열람 | FORBIDDEN | 에이전트 직접 열람 금지 |
| 개발 에이전트 .env 수정 | FORBIDDEN | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| 필수 키 안내 | KEY_NAMES_ONLY | 키 이름만 표시 가능 |
| 설정 후 재확인 | NEXT_STEP_RECHECK_REQUIRED | 다음 Task에서 비노출 재확인 필요 |
| Token 발급 | LOCKED | 아직 발급 불가 |
| Token 저장 | LOCKED | 저장 없음 |
| Naver API 호출 | LOCKED | 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 249는 사용자 설정 체크리스트 표시 전용 |

## 표시 가능한 키 이름
- `NAVER_API_CLIENT_ID: 설정 필요`
- `NAVER_API_CLIENT_SECRET: 설정 필요`
- `NAVER_COMMERCE_API_BASE_URL: 설정 필요`

## 사용자 안내
- 현재 런타임 환경에서 Naver Token 발급 필수 환경변수/인증정보가 확인되지 않았음
- 개발 에이전트는 `.env` 파일을 열람하거나 수정하지 않음
- 사용자가 로컬 실행 환경 또는 배포 환경에 필요한 값을 직접 설정해야 함
- 설정 후 다음 Task에서 값 노출 없이 `PRESENT/MISSING` 여부만 다시 확인함

## 이 패널이 아닌 것들
- `.env` 직접 열람/수정이 아님: `isEnvFileDirectlyAccessed: false`, `isEnvFileModified: false`
- 실제 값/일부 값/마스킹 값/해시값 표시가 아님: `isEnvValueDisplayed: false`, `isAuthKeyValueDisplayed: false`, `isSecretLogged: false`
- Token 발급/저장이 아님: `isTokenIssuanceAllowed: false`, `isTokenIssued: false`, `isTokenStored: false`
- POST API / submit / 실행 버튼 연결이 아님: `isPostApiConnected: false`, `hasSubmitAction: false`, `hasExecutionButton: false`
- Worker / Queue / Adapter / DB write 연결이 아님: `hasWorkerTrigger: false`, `hasQueueTrigger: false`, `hasAdapterTrigger: false`, `isMutationConnected: false`
- Naver API / 상품 API / 가격·재고 변경이 아님: `isNaverApiCalled: false`, `isProductLookupApiCalled: false`, `isProductUpdateApiCalled: false`, `isPriceOrStockChanged: false`

## 다음 단계 진행 조건
Task 249는 사용자 설정 체크리스트 표시까지만 담당한다. 사용자가 필요한 키를 직접 설정한 뒤 다음 Task에서 비노출 방식으로 재확인해야 한다.
