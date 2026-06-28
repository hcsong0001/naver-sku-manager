# Task 252 - Naver Token Issuance Env Auth User Setup Completion Report Waiting Screen Flow

## 목적

Task 251에서 사용자가 직접 Env/Auth 값을 설정하는 절차를 안내했으므로, Task 252에서는 사용자가 "설정 완료"를 보고하기 전까지 Env/Auth 재확인과 Token 발급으로 진행할 수 없다는 완료 보고 대기 패널을 read-only로 추가했다.

이번 Task는 설정 완료 처리, 재확인, 토큰 발급이 아니다.

## 패널 위치

- Task 251 Env Auth User Setup Procedure Guide
- Task 252 Env Auth User Setup Completion Report Waiting
- BatchJob 실행 결과

## 상태

- `status`: `ENV_AUTH_USER_SETUP_COMPLETION_REPORT_WAITING`
- `presencePresentCount`: `0`
- `presenceMissingCount`: `3`
- `isUserSetupCompletionReported`: `false`
- `isWaitingUserSetupCompletionReport`: `true`
- `isRecheckBlockedUntilUserSetup`: `true`
- `isEnvPresenceRecheckExecuted`: `false`
- `isAuthKeyPresenceRecheckExecuted`: `false`

## 표시 항목

| 항목 | 상태 | 의미 |
| --- | --- | --- |
| User Setup Procedure Guide | `PROCEDURE_GUIDE_CONFIRMED` | Task 251 절차 안내 확인 |
| 현재 확인 결과 | `MISSING_DETECTED` | PRESENT 0 / MISSING 3 |
| 사용자 설정 완료 보고 | `WAITING_USER_COMPLETION_REPORT` | 사용자 완료 보고 대기 |
| Env/Auth 재확인 | `RECHECK_NOT_ALLOWED_YET` | 완료 보고 전 재확인 금지 |
| 실제 값 입력 | `USER_ONLY_ACTION` | 사용자가 직접 입력해야 함 |
| 필수 키 이름 안내 | `KEY_NAMES_ONLY` | 키 이름만 표시 가능 |
| 개발 에이전트 .env 열람 | `FORBIDDEN` | 에이전트 직접 열람 금지 |
| 개발 에이전트 .env 수정 | `FORBIDDEN` | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | `FORBIDDEN` | 값 출력 금지 |
| Secret 로그 출력 | `FORBIDDEN` | 로그 노출 금지 |
| Token 발급 가능 여부 | `BLOCKED_BY_MISSING_ENV_AUTH` | 현재 발급 불가 |
| Token 발급 | `LOCKED` | 아직 발급 불가 |
| Token 저장 | `LOCKED` | 저장 없음 |
| Naver API 호출 | `LOCKED` | 호출 없음 |
| 상품 조회/수정 API | `LOCKED` | 호출 없음 |
| 가격·재고 변경 | `LOCKED` | 변경 없음 |
| Worker / Queue / Adapter | `LOCKED` | 실행 경로 없음 |
| POST API 연결 | `NOT_CONNECTED` | 제출/실행 경로 없음 |
| 승인/실행 버튼 | `NOT_PRESENT` | 버튼 없음 |
| 현재 Task 상태 | `READ_ONLY_INFO` | Task 252는 완료 보고 대기 표시 전용 |

## 표시 가능한 키 이름

기존 프로젝트 상수 기준 키 이름만 표시한다. 값은 표시하지 않는다.

- `NAVER_API_CLIENT_ID`: 사용자 설정 완료 보고 대기
- `NAVER_API_CLIENT_SECRET`: 사용자 설정 완료 보고 대기
- `NAVER_COMMERCE_API_BASE_URL`: 사용자 설정 완료 보고 대기

## UI 안내

- 사용자가 Env/Auth 값을 직접 설정한 뒤 "설정 완료"를 보고하기 전까지 재확인은 진행하지 않는다.
- 현재 상태에서는 Token 발급 테스트를 진행할 수 없다.
- 개발 에이전트는 .env 파일을 열람하거나 수정하지 않으며, 값은 표시하지 않는다.

## 금지 확인

- ".env" 파일 직접 열람 없음
- ".env" 파일 생성 또는 수정 없음
- 인증키/토큰 값 입력 없음
- Env/Auth 재확인 실행 없음
- Token 발급 없음
- Token 저장 없음
- Naver API 호출 없음
- POST API 추가 없음
- 버튼/submit 추가 없음
- 상품 조회/수정 API 호출 없음
- 가격·재고 변경 없음
- Worker / Queue / Adapter 연결 없음
- DB write 없음

## 결론

Task 252는 사용자 설정 완료 보고 대기 표시 전용 read-only 화면이다. 현재 Env/Auth 상태는 `PRESENT 0 / MISSING 3`이며, 사용자가 설정 완료를 보고하기 전까지 Env/Auth 재확인, Token 발급, 저장, Naver API 호출, 모든 실행 연결은 차단된다.
