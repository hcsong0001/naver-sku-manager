# Task 254 - Naver Token Issuance Env/Auth Presence Recheck Result Screen Flow

## 목적

Task 253 사용자 직접 설정 완료 보고 이후, Naver Token 발급 전에 필요한 Env/Auth 존재 여부를 값 노출 없이 다시 확인하는 read-only 결과 패널을 추가했다.

이번 Task는 Token 발급이 아니며, Token 저장 또는 Naver API 호출도 수행하지 않는다.

## 재확인 방식

`.env`, `.env.local`, 인증키 파일을 직접 열람하지 않고 런타임 환경변수 존재 여부만 확인한다.

허용된 판정 기준은 다음과 같다.

```ts
const value = process.env[KEY];
const present = typeof value === 'string' && value.trim().length > 0;
```

값, 일부 값, 마스킹 값, 해시값, `process.env` 전체 내용은 표시하지 않는다.

## 재확인 대상 키

Task 253 사용자 직접 설정 보고 기준 키 이름을 사용한다.

- `NAVER_COMMERCE_CLIENT_ID`
- `NAVER_COMMERCE_CLIENT_SECRET`
- `NAVER_COMMERCE_API_BASE_URL`

## 패널 위치

- Task 252 Env Auth User Setup Completion Report Waiting
- Task 254 Env/Auth Presence Recheck Result
- BatchJob 실행 결과

## 상태

- `status`: `ENV_AUTH_PRESENCE_RECHECK_RESULT_READY`
- `isEnvAuthPresenceRecheckResultReady`: `true`
- `isEnvPresenceRecheckExecuted`: `true`
- `isAuthKeyPresenceRecheckExecuted`: `true`
- `isEnvFileDirectlyAccessed`: `false`
- `isEnvFileModified`: `false`
- `isEnvValueDisplayed`: `false`
- `isAuthKeyValueDisplayed`: `false`
- `isSecretLogged`: `false`
- `isTokenIssuanceAllowed`: `false`
- `isTokenIssued`: `false`
- `isTokenStored`: `false`

## 표시 항목

| 항목 | 상태 | 의미 |
| --- | --- | --- |
| User Setup Completion Report | `COMPLETION_REPORT_CONFIRMED` | Task 253 사용자 직접 설정 완료 보고 확인 |
| Env/Auth Presence Recheck | `RECHECK_EXECUTED_NON_EXPOSURE` | 값 노출 없이 런타임 환경변수 존재 여부만 재확인 |
| 현재 재확인 결과 | `TARGET_REACHED` 또는 `MISSING_STILL_DETECTED` | PRESENT/MISSING 개수만 표시 |
| 필수 Env 존재 결과 | `PRESENT_OR_MISSING_ONLY` | PRESENT 또는 MISSING만 표시 |
| ".env" 파일 직접 열람 | `NOT_ACCESSED` | 파일 직접 열람 없음 |
| 환경변수 값 표시 | `NOT_DISPLAYED` | 값 출력 없음 |
| 인증키 값 표시 | `NOT_DISPLAYED` | 값 출력 없음 |
| Secret 로그 출력 | `NOT_LOGGED` | 로그 노출 없음 |
| Token 발급 Gate | `TOKEN_GATE_NOT_RELEASED` | Task 254에서는 발급 Gate 해제 없음 |
| Token 발급 | `LOCKED` | 아직 발급 불가 |
| Token 저장 | `LOCKED` | 저장 없음 |
| Naver API 호출 | `LOCKED` | 호출 없음 |
| 상품 조회/수정 API | `LOCKED` | 호출 없음 |
| 가격·재고 변경 | `LOCKED` | 변경 없음 |
| Worker / Queue / Adapter | `LOCKED` | 실행 경로 없음 |
| POST API 연결 | `NOT_CONNECTED` | 제출/실행 경로 없음 |
| 승인/실행 버튼 | `NOT_PRESENT` | 버튼 없음 |
| 현재 Task 상태 | `READ_ONLY_INFO` | Task 254는 재확인 결과 표시 전용 |

## 현재 실행 프로세스 기준 결과

현재 작업 프로세스에서 값 노출 없이 확인한 결과는 다음과 같다.

- `PRESENT 0 / MISSING 3`

사용자가 다른 PowerShell 세션에 임시 설정한 값은 현재 작업 프로세스에 전달되지 않을 수 있다.

## 금지 확인

- ".env" 파일 직접 열람 없음
- ".env.local" 파일 직접 열람 없음
- 인증키 파일 열람 없음
- 인증키/토큰 값 출력 없음
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

Task 254는 Env/Auth 존재 여부 재확인 결과를 read-only로 표시하는 화면이다. 목표 결과는 `PRESENT 3 / MISSING 0`이지만, 현재 작업 프로세스 기준 결과는 `PRESENT 0 / MISSING 3`이다. 이 결과에서는 Token 발급 단계로 넘어갈 수 없다.
