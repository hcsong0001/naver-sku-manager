# Task 250 - Naver Token Issuance Env Auth User Setup Completion Waiting Gate Screen Flow

## 목적

Task 249에서 사용자가 직접 Env/Auth 값을 설정해야 함을 안내했으므로, Task 250에서는 사용자 설정 완료 전에는 Token 발급 단계와 Env/Auth 재확인 단계로 넘어갈 수 없다는 Waiting Gate를 read-only 패널로 추가했다.

이번 Task는 ".env" 설정 작업이 아니며, 개발 에이전트는 ".env" 파일을 열람하거나 수정하지 않는다. 실제 Env/Auth 재확인도 실행하지 않는다.

## 패널 위치

- Task 249 Env Auth User Setup Checklist
- Task 250 Env Auth User Setup Completion Waiting Gate
- BatchJob 실행 결과

## 상태

- `status`: `ENV_AUTH_USER_SETUP_COMPLETION_WAITING_GATE_READY`
- `presencePresentCount`: `0`
- `presenceMissingCount`: `3`
- `isUserSetupCompletionReported`: `false`
- `isRecheckBlockedUntilUserSetup`: `true`
- `isEnvPresenceRecheckExecuted`: `false`
- `isAuthKeyPresenceRecheckExecuted`: `false`

## 표시 항목

| 항목 | 상태 | 의미 |
| --- | --- | --- |
| User Setup Checklist | `SETUP_CHECKLIST_CONFIRMED` | Task 249 체크리스트 확인 |
| 현재 확인 결과 | `MISSING_DETECTED` | PRESENT 0 / MISSING 3 |
| 사용자 설정 완료 여부 | `WAITING_USER_SETUP_COMPLETION` | 사용자가 아직 완료 보고 전 |
| 다음 재확인 가능 여부 | `RECHECK_BLOCKED_UNTIL_USER_SETUP` | 설정 완료 전 재확인 금지 |
| Token 발급 가능 여부 | `BLOCKED_BY_MISSING_ENV_AUTH` | 누락으로 발급 불가 |
| 개발 에이전트 .env 열람 | `FORBIDDEN` | 에이전트 직접 열람 금지 |
| 개발 에이전트 .env 수정 | `FORBIDDEN` | 에이전트 직접 수정 금지 |
| 인증키 값 표시 | `FORBIDDEN` | 값 출력 금지 |
| Secret 로그 출력 | `FORBIDDEN` | 로그 노출 금지 |
| 필수 키 안내 | `KEY_NAMES_ONLY` | 키 이름만 표시 가능 |
| Token 발급 | `LOCKED` | 아직 발급 불가 |
| Token 저장 | `LOCKED` | 저장 없음 |
| Naver API 호출 | `LOCKED` | 호출 없음 |
| 상품 조회/수정 API | `LOCKED` | 호출 없음 |
| 가격·재고 변경 | `LOCKED` | 변경 없음 |
| Worker / Queue / Adapter | `LOCKED` | 실행 경로 없음 |
| POST API 연결 | `NOT_CONNECTED` | 제출/실행 경로 없음 |
| 승인/실행 버튼 | `NOT_PRESENT` | 버튼 없음 |
| 현재 Task 상태 | `READ_ONLY_INFO` | Task 250은 설정 완료 대기 Gate 표시 전용 |

## 표시 가능한 키 이름

값은 표시하지 않고 키 이름과 설정 필요 여부만 표시한다.

- `NAVER_API_CLIENT_ID`: 설정 필요
- `NAVER_API_CLIENT_SECRET`: 설정 필요
- `NAVER_COMMERCE_API_BASE_URL`: 설정 필요

## 금지 확인

- ".env" 파일 직접 열람 없음
- ".env" 파일 수정 없음
- Env/Auth 재확인 실행 없음
- 인증키/토큰/secret 값 출력 없음
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

Task 250은 사용자 설정 완료 전 대기 Gate를 표시하는 read-only 화면이다. 현재 상태는 `PRESENT 0 / MISSING 3`이며, 사용자가 설정 완료를 별도로 보고하기 전까지 재확인, Token 발급, Token 저장, Naver API 호출, 모든 실행 연결은 차단된다.
