# Task 256: Naver Token Issuance Env Auth Runtime Scope User Correction Checklist Screen Flow Result

## 목적
Task 255 Runtime Scope 진단 결과 PRESENT 0 / MISSING 3 상태가 유지되어 사용자가 직접 PowerShell 세션, Next.js 실행 프로세스, 프로젝트 루트, 서버 재시작 여부를 확인해야 할 보정 체크리스트를 read-only 패널로 표시. 이번 Task에서는 재확인도 실행하지 않음.

## 추가된 패널 위치
```
Task 255 Env Auth Runtime Scope Diagnosis
Task 256 Env Auth Runtime Scope User Correction Checklist   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-runtime-scope-user-correction-checklist-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-runtime-scope-user-correction-checklist-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-env-auth-runtime-scope-user-correction-checklist-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: ENV_AUTH_RUNTIME_SCOPE_USER_CORRECTION_CHECKLIST_READY
- presencePresentCount: 0 / presenceMissingCount: 3
- targetPresentCount: 3 / targetMissingCount: 0
- isTargetPresenceResultMet: false
- isMissingEnvAuthStillDetected: true
- isUserRuntimeScopeCorrectionRequired: true
- isPowerShellSessionCheckRequired: true
- isNextJsProcessScopeCheckRequired: true
- isProjectRootCheckRequired: true
- isServerRestartRequiredAfterCorrection: true
- isEnvPresenceRecheckExecuted: false
- isAuthKeyPresenceRecheckExecuted: false
- isEnvFileDirectlyAccessed: false / isEnvFileModified: false
- isTokenIssuanceAllowed: false / isTokenIssued: false / isTokenStored: false

## Checklist Items (23개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Runtime Scope Diagnosis (Task 255) | RUNTIME_SCOPE_DIAGNOSIS_CONFIRMED | Task 255 진단 확인 |
| 현재 재확인 결과 | MISSING_STILL_DETECTED | PRESENT 0 / MISSING 3 |
| 목표 결과 | TARGET_NOT_MET | PRESENT 3 / MISSING 0 미달성 |
| 사용자 보정 필요 | USER_CORRECTION_REQUIRED | 사용자가 직접 적용 범위 보정 필요 |
| PowerShell 세션 확인 | USER_ACTION_REQUIRED | 값을 설정한 세션과 실행 세션 확인 |
| Next.js 실행 프로세스 확인 | USER_ACTION_REQUIRED | dev/build 실행 프로세스에 값 전달 확인 |
| 프로젝트 루트 확인 | USER_ACTION_REQUIRED | 실행 위치가 프로젝트 루트인지 확인 |
| 서버 재시작 필요 | USER_ACTION_REQUIRED | 설정 후 dev/build/test 재시작 필요 |
| ".env" 직접 열람 | FORBIDDEN | 에이전트 직접 열람 금지 |
| ".env" 자동 수정 | FORBIDDEN | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| Env/Auth 재확인 | NOT_EXECUTED | 이번 Task에서는 재확인 실행 안 함 |
| Token 발급 가능 여부 | BLOCKED_BY_MISSING_ENV_AUTH | 현재 발급 불가 |
| Token 발급 | LOCKED | 아직 발급 불가 |
| Token 저장 | LOCKED | 저장 없음 |
| Naver API 호출 | LOCKED | 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 256은 Runtime Scope 보정 체크리스트 표시 전용 |

## PowerShell 가이드 (placeholder 형식만 허용)
```powershell
# 예시 형식입니다. 실제 값은 사용자가 직접 입력합니다.
$env:NAVER_COMMERCE_CLIENT_ID = "<USER_INPUT_ONLY>"
$env:NAVER_COMMERCE_CLIENT_SECRET = "<USER_INPUT_ONLY>"
$env:NAVER_COMMERCE_API_BASE_URL = "<USER_INPUT_ONLY>"

# 같은 PowerShell 세션에서 실행해야 process.env에 전달됩니다.
npm.cmd run dev
```

## 이 패널이 아닌 것들
- 재확인 실행이 아님: `isEnvPresenceRecheckExecuted: false`, `isAuthKeyPresenceRecheckExecuted: false`
- ".env" 접근이 아님: `isEnvFileDirectlyAccessed: false`, `isEnvFileModified: false`, `hasEnvFileAccess: false`
- 인증키 값 표시 아님: `isEnvValueDisplayed: false`, `isAuthKeyValueDisplayed: false`, `isSecretLogged: false`
- Token 발급이 아님: `isTokenIssuanceAllowed: false`, `isTokenIssued: false`, `isTokenStored: false`

## 다음 단계 진행 조건
사용자 보정 완료 후 사용자의 별도 명시 지시가 있을 때만 Env/Auth 재확인을 다시 진행합니다.
