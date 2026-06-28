# Task 255 - Naver Token Issuance Env Auth Runtime Scope Diagnosis Screen Flow

## 목적

Task 254 재확인 결과가 현재 작업 프로세스 기준 `PRESENT 0 / MISSING 3`으로 남아 있으므로, 이를 단순 값 누락으로 단정하지 않고 런타임 환경변수 적용 범위 미확인 상태로 진단하는 read-only 패널을 추가했다.

이번 Task는 진단 안내 표시 전용이다. Env/Auth 재확인, Token 발급, Token 저장, Naver API 호출은 수행하지 않는다.

## 패널 위치

- Task 254 Env Auth Presence Recheck Result
- Task 255 Env Auth Runtime Scope Diagnosis
- BatchJob 실행 결과

## 상태

- `status`: `ENV_AUTH_RUNTIME_SCOPE_DIAGNOSIS_READY`
- `presencePresentCount`: `0`
- `presenceMissingCount`: `3`
- `targetPresentCount`: `3`
- `targetMissingCount`: `0`
- `isTargetPresenceResultMet`: `false`
- `isRuntimeScopeDiagnosisRequired`: `true`
- `isUserActionRequiredForRuntimeScope`: `true`
- `isEnvPresenceRecheckExecuted`: `false`
- `isAuthKeyPresenceRecheckExecuted`: `false`

## 표시 항목

| 항목 | 상태 | 의미 |
| --- | --- | --- |
| Env/Auth Recheck Result | `RECHECK_RESULT_CONFIRMED` | Task 254 재확인 결과 확인 |
| 현재 재확인 결과 | `MISSING_STILL_DETECTED` | PRESENT 0 / MISSING 3 |
| 목표 결과 | `TARGET_NOT_MET` | PRESENT 3 / MISSING 0 미달성 |
| Runtime Scope 진단 | `RUNTIME_SCOPE_DIAGNOSIS_REQUIRED` | 현재 프로세스에 값 적용 안 됨 |
| 설정 위치 확인 | `USER_ACTION_REQUIRED` | 사용자가 설정 위치를 확인해야 함 |
| PowerShell 세션 적용 여부 | `USER_ACTION_REQUIRED` | 같은 터미널 세션 적용 여부 확인 필요 |
| Next.js 실행 프로세스 적용 여부 | `USER_ACTION_REQUIRED` | dev/build 실행 프로세스에 전달됐는지 확인 필요 |
| ".env" 직접 열람 | `FORBIDDEN` | 에이전트 직접 열람 금지 |
| ".env" 자동 수정 | `FORBIDDEN` | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | `FORBIDDEN` | 값 출력 금지 |
| Secret 로그 출력 | `FORBIDDEN` | 로그 노출 금지 |
| Env/Auth 재확인 | `NOT_EXECUTED` | 이번 Task에서는 재확인 실행 안 함 |
| Token 발급 가능 여부 | `BLOCKED_BY_MISSING_ENV_AUTH` | 현재 발급 불가 |
| Token 발급 | `LOCKED` | 아직 발급 불가 |
| Token 저장 | `LOCKED` | 저장 없음 |
| Naver API 호출 | `LOCKED` | 호출 없음 |
| 상품 조회/수정 API | `LOCKED` | 호출 없음 |
| 가격·재고 변경 | `LOCKED` | 변경 없음 |
| Worker / Queue / Adapter | `LOCKED` | 실행 경로 없음 |
| POST API 연결 | `NOT_CONNECTED` | 제출/실행 경로 없음 |
| 승인/실행 버튼 | `NOT_PRESENT` | 버튼 없음 |
| 현재 Task 상태 | `READ_ONLY_INFO` | Task 255는 Runtime Scope 진단 표시 전용 |

## 사용자 확인 안내

값 없이 아래 수준의 placeholder 안내만 표시한다.

```powershell
# 예시 형식입니다. 실제 값은 사용자가 직접 입력합니다.
$env:NAVER_COMMERCE_CLIENT_ID = "<USER_INPUT_ONLY>"
$env:NAVER_COMMERCE_CLIENT_SECRET = "<USER_INPUT_ONLY>"
$env:NAVER_COMMERCE_API_BASE_URL = "<USER_INPUT_ONLY>"

# 같은 PowerShell 세션에서 dev/build/test 명령을 실행해야 process.env에 전달됩니다.
npm.cmd run dev
```

## 금지 확인

- ".env" / ".env.local" 파일 직접 열람 없음
- ".env" / ".env.local" 자동 생성 또는 수정 없음
- Env/Auth 재확인 실행 없음
- 인증키/토큰 값 출력 없음
- 일부 값, 마스킹 값, 해시값 출력 없음
- `process.env` 전체 출력 없음
- 실제 Naver API 호출 없음
- Token 발급 없음
- Token 저장 없음
- Worker / Queue / Adapter 연결 없음
- POST API 추가 없음
- DB write 없음
- 승인 요청 버튼/실행 버튼/submit 추가 없음

## 결론

Task 255는 Runtime Scope 진단 안내 표시 전용이다. 현재 결과는 `PRESENT 0 / MISSING 3`이며 목표 결과 `PRESENT 3 / MISSING 0`이 충족되지 않았으므로 Token 발급 단계로 넘어갈 수 없다. 사용자는 값 설정 위치와 실제 Node/Next.js 실행 세션이 같은지 확인한 뒤, 다음 Task에서 값 노출 없이 PRESENT/MISSING 여부만 다시 확인해야 한다.
