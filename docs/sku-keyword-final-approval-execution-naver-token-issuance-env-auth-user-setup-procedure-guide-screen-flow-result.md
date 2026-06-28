# Task 251 - Naver Token Issuance Env Auth User Setup Procedure Guide Screen Flow

## 목적

Task 250에서 사용자 설정 완료 전 재확인과 Token 발급이 차단됨을 표시했으므로, Task 251에서는 사용자가 직접 Env/Auth 값을 설정할 수 있도록 User Setup Procedure Guide를 read-only 패널로 추가했다.

이번 Task는 설정 절차 안내 표시 전용이다. 개발 에이전트는 ".env" 파일을 직접 열람하거나 생성/수정하지 않고, 인증키/토큰 값을 입력하지 않으며, Env/Auth 재확인과 Token 발급도 실행하지 않는다.

## 패널 위치

- Task 250 Env Auth User Setup Completion Waiting Gate
- Task 251 Env Auth User Setup Procedure Guide
- BatchJob 실행 결과

## 상태

- `status`: `ENV_AUTH_USER_SETUP_PROCEDURE_GUIDE_READY`
- `presencePresentCount`: `0`
- `presenceMissingCount`: `3`
- `isUserSetupProcedureReady`: `true`
- `isUserSetupCompletionReported`: `false`
- `isRecheckBlockedUntilUserSetup`: `true`
- `isEnvPresenceRecheckExecuted`: `false`
- `isAuthKeyPresenceRecheckExecuted`: `false`

## 표시 항목

| 항목 | 상태 | 의미 |
| --- | --- | --- |
| User Setup Waiting Gate | `WAITING_GATE_CONFIRMED` | Task 250 대기 Gate 확인 |
| 현재 확인 결과 | `MISSING_DETECTED` | PRESENT 0 / MISSING 3 |
| 사용자 직접 설정 절차 | `USER_SETUP_PROCEDURE_READY` | 사용자가 직접 설정해야 함 |
| 필수 키 이름 안내 | `KEY_NAMES_ONLY` | 키 이름만 표시 가능 |
| 실제 값 입력 | `USER_ONLY_ACTION` | 사용자가 직접 입력해야 함 |
| 개발 에이전트 .env 열람 | `FORBIDDEN` | 에이전트 직접 열람 금지 |
| 개발 에이전트 .env 수정 | `FORBIDDEN` | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | `FORBIDDEN` | 값 출력 금지 |
| Secret 로그 출력 | `FORBIDDEN` | 로그 노출 금지 |
| 설정 완료 보고 | `WAITING_USER_SETUP_COMPLETION` | 사용자 완료 보고 대기 |
| 다음 재확인 | `RECHECK_AFTER_USER_SETUP_ONLY` | 완료 보고 후에만 가능 |
| Token 발급 | `LOCKED` | 아직 발급 불가 |
| Token 저장 | `LOCKED` | 저장 없음 |
| Naver API 호출 | `LOCKED` | 호출 없음 |
| 상품 조회/수정 API | `LOCKED` | 호출 없음 |
| 가격·재고 변경 | `LOCKED` | 변경 없음 |
| Worker / Queue / Adapter | `LOCKED` | 실행 경로 없음 |
| POST API 연결 | `NOT_CONNECTED` | 제출/실행 경로 없음 |
| 승인/실행 버튼 | `NOT_PRESENT` | 버튼 없음 |
| 현재 Task 상태 | `READ_ONLY_INFO` | Task 251은 설정 절차 안내 표시 전용 |

## 표시 가능한 키 이름

기존 프로젝트 상수 기준 키 이름만 표시한다. 값은 표시하지 않는다.

- `NAVER_API_CLIENT_ID`: 사용자가 직접 설정 필요
- `NAVER_API_CLIENT_SECRET`: 사용자가 직접 설정 필요
- `NAVER_COMMERCE_API_BASE_URL`: 사용자가 직접 설정 필요

## PowerShell placeholder 예시

아래는 예시 형식만 표시한다. 실제 값은 사용자가 직접 입력해야 하며, placeholder 외의 값은 포함하지 않는다.

```powershell
# 예시 형식만 표시합니다. 실제 값은 사용자가 직접 입력합니다.
$env:NAVER_API_CLIENT_ID = "<USER_INPUT_ONLY>"
$env:NAVER_API_CLIENT_SECRET = "<USER_INPUT_ONLY>"
$env:NAVER_COMMERCE_API_BASE_URL = "<USER_INPUT_ONLY>"
```

## 금지 확인

- ".env" 파일 직접 열람 없음
- ".env" 파일 생성 또는 수정 없음
- Env/Auth 재확인 실행 없음
- 인증키/토큰/secret 값 입력 또는 출력 없음
- 일부 값, 마스킹 값, 해시값 출력 없음
- `process.env` 전체 출력 없음
- Token 발급 없음
- Token 저장 없음
- Naver API 호출 없음
- 상품 조회/수정 API 호출 없음
- 가격·재고 변경 없음
- Worker / Queue / Adapter 연결 없음
- POST API 연결 없음
- 승인/실행 버튼 없음
- DB write 없음

## 결론

Task 251은 사용자 설정 절차를 안내하는 read-only 화면이다. 현재 상태는 `PRESENT 0 / MISSING 3`이며, 사용자가 직접 값을 설정하고 완료를 보고하기 전까지 Env/Auth 재확인, Token 발급, 저장, Naver API 호출, 모든 실행 연결은 차단된다.
