# Naver API 인증 흐름 안전 분리 설계

## 1. 작업 목표

Naver API 인증 구현과 상품 수정 Live 호출 구현에 들어가기 전에, 인증정보 처리, token 발급, 상품 수정 API 호출, Live 단일 테스트 실행을 서로 분리하는 안전 설계를 문서로 확정한다.

이번 문서는 설계 전용이다. 코드 구현, endpoint 작성, token 발급, HTTP 요청 생성, Queue/Worker 호출, 운영 DB 접근/write는 포함하지 않는다.

이번 단계의 최대 허용 결과:

- `NAVER_API_AUTH_SAFETY_SEPARATION_DESIGN_ONLY`
- `NAVER_API_AUTH_FLOW_DESIGNED_BUT_NOT_IMPLEMENTED`

계속 유지해야 하는 안전 플래그:

| 플래그 | 값 |
|--------|----|
| `naverApiCallAllowed` | `false` |
| `liveExecutionEnabled` | `false` |
| `httpRequestCreated` | `false` |
| `endpointCalled` | `false` |
| `accessTokenRequested` | `false` |
| `credentialsUsed` | `false` |
| `operatingDbWriteAllowed` | `false` |
| `queueAllowed` | `false` |
| `workerAllowed` | `false` |

## 2. 현재 상태 요약

현재 TMS / Tooltalk Management System의 SKU keyword final approval 실행 흐름은 실제 Naver API 호출 없이 안전 구조를 단계적으로 쌓아 둔 상태다.

완료된 구조:

- Mock 실행 파이프라인 완료
- Live Safety Gate 완료
- 실행 결과 기록/조회 UI 완료
- 재실행 차단 완료
- Live 단일 테스트 전 점검표 완료
- Live 단일 테스트 승인 준비 UI 완료
- Live 단일 테스트 승인 감사 기록 저장 완료
- 환경 / DB 안전 확인 Guard 완료
- Live 단일 테스트 승인 감사 대시보드 완료
- Live Adapter skeleton 완료

현재 차단 상태:

- 실제 Naver API 호출 0회
- access token 발급 0회
- endpoint 호출 0회
- HTTP client 코드 없음
- fetch / axios 코드 없음
- 인증정보 사용 없음
- 상품 수정 endpoint URL 없음
- Live Adapter skeleton은 등록되어 있으나 실제 호출 비활성화
- `LIVE_ADAPTER_SKELETON_DISABLED` 결과만 반환

## 3. 인증 흐름을 분리해야 하는 이유

인증과 상품 수정 호출이 같은 흐름에 섞이면 다음 위험이 생긴다.

| 위험 | 설명 |
|------|------|
| 인증정보 노출 위험 | 설정값, token, header, raw request/response가 로그나 UI에 섞여 노출될 수 있다. |
| token 발급과 상품 수정 호출 결합 위험 | token 발급 테스트가 성공했다는 이유로 상품 수정 호출까지 이어질 수 있다. |
| Live Adapter 오호출 위험 | skeleton 또는 disabled 상태에서 실수로 실제 endpoint를 호출하는 경로가 생길 수 있다. |
| 운영 DB/테스트 DB 혼동 위험 | Live 준비 상태 확인 중 운영 DB write가 실행되거나 테스트 fixture와 운영 데이터가 섞일 수 있다. |
| Queue/Worker 무승인 실행 위험 | 승인 기록만 저장하려던 작업이 enqueue 또는 worker 처리로 이어질 수 있다. |
| 단일 테스트 1건 제한 우회 위험 | bulk payload나 여러 item이 Live Adapter까지 전달될 수 있다. |
| 재실행/replay 위험 | 이미 실행 또는 실패 처리된 item이 같은 BatchJob에서 다시 실행될 수 있다. |
| rollback 착각 위험 | 외부 API 호출 실패 후 내부 DB rollback만으로 외부 상태까지 되돌렸다고 오해할 수 있다. |

따라서 인증정보 확인, token 발급, 상품 수정 endpoint 호출, 실행 Orchestration은 서로 다른 책임과 Gate를 가져야 한다.

## 4. 인증정보 처리 원칙

인증정보는 존재 여부와 안전 상태만 다룬다. 원문 값은 문서, 로그, metadata, UI, API 응답, 테스트 fixture에 저장하거나 출력하지 않는다.

절대 금지:

- `.env` 원문 출력 금지
- `DATABASE_URL` / `REDIS_URL` 원문 출력 금지
- Naver client secret 출력 금지
- access token / refresh token 출력 금지
- authorization header 생성/출력 금지
- token을 로그, metadata, UI, API 응답에 저장 금지
- token을 DB에 저장 금지
- raw request body 또는 raw response body에 인증정보 포함 가능성이 있으면 저장 금지

기본 원칙:

- token은 DB에 저장하지 않는 것을 기본값으로 한다.
- 향후 token 발급이 허용되더라도 짧은 생명주기의 메모리 내 사용만 별도 승인 후 검토한다.
- 인증정보 존재 여부는 boolean 또는 safe status로만 표시한다.
- secret 값이 아닌 `configured`, `missing`, `blocked`, `disabled`, `unknown` 같은 안전 상태만 사용한다.
- UI/API에는 `sanitized=true`와 차단 플래그만 노출한다.
- client id 원문도 가능한 한 노출하지 않고, 필요한 경우에도 safe status로 대체한다.

허용 표시:

- `configured`
- `missing`
- `blocked`
- `disabled`
- `unknown`
- `safe environment hint`
- `naverApiCallAllowed=false`
- `accessTokenRequested=false`
- `endpointCalled=false`
- `credentialsUsed=false`
- `sanitized=true`

## 5. 인증 Provider와 상품 수정 Adapter 분리 설계

이번 단계에서는 아래 계층을 코드로 만들지 않는다. 문서상 책임 경계만 확정한다.

### 5-1. `NaverApiCredentialConfigReader`

책임:

- 인증정보 존재 여부만 안전하게 확인한다.
- 설정값의 원문을 반환하지 않는다.
- UI/API/metadata에 safe status만 제공한다.
- token 발급 또는 HTTP 요청을 수행하지 않는다.

반환 가능한 정보 수준:

- `credentialStatus=configured | missing | blocked | unknown`
- `sanitized=true`
- `credentialsUsed=false`
- `accessTokenRequested=false`

금지:

- secret 원문 반환
- 환경변수 원문 반환
- header 생성
- token 발급
- endpoint 호출

### 5-2. `NaverApiAuthTokenProvider`

책임:

- 향후 token 발급 책임만 가진다.
- 상품 수정 endpoint 호출 책임을 갖지 않는다.
- 최초 구현 전까지는 항상 disabled skeleton이어야 한다.

현재 설계 상태:

- 구현 금지
- token 발급 금지
- 호출 시에도 향후 skeleton 단계에서는 `NAVER_AUTH_TOKEN_REQUEST_DISABLED` 같은 차단 상태만 반환
- token 발급 성공 여부가 상품 수정 호출 허용으로 전파되지 않도록 별도 Gate를 둔다.

금지:

- 상품 수정 payload 접근
- 상품 수정 endpoint 호출
- token DB 저장
- token 로그 출력
- authorization header 출력

### 5-3. `NaverApiLiveProductUpdateAdapter`

책임:

- 향후 상품 수정 endpoint 호출만 담당한다.
- token은 직접 만들지 않고 token provider를 통해 받는 구조만 허용한다.
- token provider 성공과 endpoint 호출 허용을 분리한다.

현재 설계 상태:

- 구현 금지
- endpoint URL 작성 금지
- HTTP client 사용 금지
- 상품 수정 호출 금지
- Live Adapter skeleton은 계속 disabled 상태 유지

금지:

- token 발급 로직 포함
- 인증정보 읽기 직접 수행
- 단일 테스트 1건 제한 우회
- Queue/Worker에서 직접 호출

### 5-4. `NaverApiLiveExecutionOrchestrator`

책임:

- FinalApproval / BatchJob / BatchJobItem 상태를 확인한다.
- Environment Guard, Replay Guard, Audit Guard 결과를 확인한다.
- 단일 1건 조건을 최종 확인한다.
- token 발급과 상품 수정 호출은 최종 단계에서만 연결한다.
- token 발급 Gate와 endpoint 호출 Gate를 별도로 확인한다.

현재 설계 상태:

- 구현 금지
- Queue enqueue 금지
- Worker 호출 금지
- 운영 DB write 금지
- token 발급과 상품 수정 호출 연결 금지

## 6. 계층 간 연결 정책

안전한 연결 방향:

1. Orchestrator가 모든 Guard와 승인 상태를 read-only로 확인한다.
2. CredentialConfigReader는 인증정보 존재 여부만 safe status로 반환한다.
3. TokenProvider는 별도 승인 Gate가 열릴 때만 token 발급을 시도할 수 있다.
4. ProductUpdateAdapter는 endpoint 호출 Gate가 열릴 때만 token을 전달받아 사용할 수 있다.

현재 단계에서는 3번과 4번이 모두 disabled다.

안전한 pseudocode 수준의 흐름:

```text
guardResult = 모든 안전 Gate를 평가한다
if guardResult가 통과가 아니면 중단한다

credentialStatus = 인증정보 존재 여부만 safe check 한다
if credentialStatus가 안전하지 않으면 중단한다

if tokenRequestGate가 disabled이면 중단한다
if endpointCallGate가 disabled이면 중단한다

현재 문서 단계에서는 여기서 항상 중단된다
```

이 pseudocode는 실제 호출 가능한 절차가 아니다. endpoint, token 발급 방식, header, request body는 의도적으로 포함하지 않는다.

## 7. Safety Gate 순서 설계

실제 Live 호출 전에 반드시 다음 순서를 통과해야 한다.

| 순서 | Gate | 현재 상태 |
|------|------|-----------|
| 1 | Environment Safety Guard | 필수 |
| 2 | Replay Guard | 필수 |
| 3 | DB Read Guard | 필수 |
| 4 | Live Preflight Check | 필수 |
| 5 | Live Single Test Approval Guard | 필수 |
| 6 | Live Single Test Approval Audit 존재 확인 | 필수 |
| 7 | Audit History read-only 확인 | 필수 |
| 8 | Live Adapter Skeleton disabled 상태 확인 | 필수 |
| 9 | 사용자 별도 명시 승인 | 필수 |
| 10 | 단일 상품 1건 최종 확인 | 필수 |
| 11 | 인증정보 존재 여부 safe check | 설계만 허용 |
| 12 | token 발급 허용 여부 별도 Gate | 항상 disabled |
| 13 | 실제 상품 수정 endpoint 호출 허용 여부 별도 Gate | 항상 disabled |

현재 단계에서 12번과 13번은 반드시 disabled 상태로 유지한다.

Gate 원칙:

- 앞 단계 실패 시 뒤 단계는 평가하지 않는다.
- token 발급 Gate가 열려도 endpoint 호출 Gate는 별도로 닫혀 있을 수 있어야 한다.
- endpoint 호출 Gate는 사용자 별도 명시 승인과 단일 item 조건을 다시 확인해야 한다.
- Queue/Worker 경로는 별도 승인 전까지 Gate에 포함하지 않는다.

## 8. 상태 코드 설계

아래 상태 코드는 문서 설계용이다. 이번 작업에서 type, enum, code로 구현하지 않는다.

| 상태 코드 | 의미 |
|-----------|------|
| `NAVER_AUTH_CONFIG_MISSING` | 인증정보 존재 여부 safe check 결과 필수 설정이 없는 상태 |
| `NAVER_AUTH_CONFIG_PRESENT_BUT_BLOCKED` | 인증정보는 존재하나 현재 단계에서 사용 차단 |
| `NAVER_AUTH_TOKEN_REQUEST_DISABLED` | token 발급 요청 Gate가 닫힌 상태 |
| `NAVER_AUTH_TOKEN_READY_BUT_NOT_USED` | token이 준비되더라도 endpoint 호출에 사용하지 않는 상태 |
| `NAVER_LIVE_ENDPOINT_CALL_DISABLED` | 상품 수정 endpoint 호출 Gate가 닫힌 상태 |
| `NAVER_LIVE_SINGLE_TEST_READY_BUT_AUTH_DISABLED` | 단일 테스트 조건은 준비됐으나 token 발급이 비활성화된 상태 |
| `NAVER_LIVE_SINGLE_TEST_AUTH_READY_BUT_ENDPOINT_DISABLED` | 인증 단계는 준비됐으나 endpoint 호출이 비활성화된 상태 |
| `NAVER_LIVE_CALL_BLOCKED_BY_ENVIRONMENT_GUARD` | 환경 안전 조건으로 Live 호출 차단 |
| `NAVER_LIVE_CALL_BLOCKED_BY_REPLAY_GUARD` | replay 또는 재실행 위험으로 Live 호출 차단 |
| `NAVER_LIVE_CALL_BLOCKED_BY_AUDIT_GUARD` | 승인 감사 기록 조건 미충족으로 Live 호출 차단 |
| `NAVER_LIVE_CALL_BLOCKED_BY_USER_APPROVAL_REQUIRED` | 사용자 별도 명시 승인 필요 |

현재 문서 단계의 기본 상태:

- `NAVER_API_AUTH_SAFETY_SEPARATION_DESIGN_ONLY`
- `NAVER_API_AUTH_FLOW_DESIGNED_BUT_NOT_IMPLEMENTED`
- `NAVER_AUTH_TOKEN_REQUEST_DISABLED`
- `NAVER_LIVE_ENDPOINT_CALL_DISABLED`

## 9. 실제 Live 단일 테스트 전 최종 승인 조건

최초 상품 수정 Live 단일 테스트는 아래 조건을 모두 만족해야 한다.

- FinalApproval `ACTIVE`
- BatchJob `APPROVED`
- BatchJobItem `READY`
- item 정확히 1건
- 이미 `EXECUTED` / `FAILED` / `PARTIAL_SUCCESS` 상태가 아님
- `EXECUTING` 상태가 아님
- Replay Guard 통과
- Environment Safety Guard 통과
- Live Preflight 존재
- Live Single Test Approval Guard 통과
- 6개 acknowledgement 모두 체크
- Approval Audit 기록 존재
- Audit Dashboard에서 조회 가능
- Live Adapter skeleton은 disabled 상태
- 사용자 별도 명시 승인 필요
- token 발급 별도 승인 필요
- endpoint 호출 별도 승인 필요

중요한 제한:

- 승인 감사 기록 존재는 실행 허용을 의미하지 않는다.
- token 발급 승인도 상품 수정 endpoint 호출 승인을 의미하지 않는다.
- endpoint 호출 승인 전까지 `naverApiCallAllowed=false`를 유지한다.

## 10. token 발급과 상품 수정 호출 분리 정책

핵심 원칙:

- token 발급 성공은 상품 수정 호출 허용을 의미하지 않는다.
- 상품 수정 호출은 token 발급과 별도 Gate를 가져야 한다.
- token 발급이 가능하더라도 endpoint 호출은 여전히 disabled일 수 있어야 한다.
- token 발급 테스트와 상품 수정 테스트는 서로 다른 Task로 분리한다.
- 최초 token 발급 테스트도 상품 수정 endpoint와 연결하지 않는다.
- 최초 상품 수정 테스트는 token 발급 테스트 완료 후 별도 승인으로만 진행한다.

분리된 Task 경계:

| 단계 | 허용 가능 범위 | 상품 수정 호출 |
|------|---------------|----------------|
| Auth Config Safe Reader | 인증정보 존재 여부 safe check | 금지 |
| Token Provider Disabled Skeleton | token 발급 함수 형태만 준비, 항상 disabled | 금지 |
| Token Dry Permission Gate | token 발급 전 조건 점검 | 금지 |
| 최초 Token 발급 테스트 준비 문서 | 최종 점검표 작성 | 금지 |
| 최초 Token 발급 테스트 | 별도 명시 승인 후 token 발급만 검증 | 금지 |
| 최초 상품 수정 테스트 | token 발급 테스트 이후 별도 Task와 별도 승인 필요 | 별도 승인 전 금지 |

## 11. 실패 처리 원칙

향후 실제 Live 단계에서 실패가 발생하면 다음 원칙을 적용한다.

- rollback 자동 실행 금지
- 재시도 자동 실행 금지
- retry/replay 자동 실행 금지
- 실패 결과를 기록하고 중단
- 실패 item / 성공 item 분리 기록
- 사용자 확인 전 추가 실행 금지
- 동일 BatchJob 재실행은 별도 승인 흐름 필요
- 외부 API 호출 실패 후 내부 DB rollback이 외부 상태 rollback을 의미한다고 표시하지 않음
- 실패 원문 응답에 인증정보 포함 가능성이 있으면 저장하지 않고 sanitize 결과만 기록

실패 상태 기록 원칙:

- 실행 시각, 대상 item 식별자, 안전한 상태 코드, sanitize 여부만 기록한다.
- raw request/response 저장은 기본 금지다.
- 실패 후 추가 실행은 새 승인 기록과 별도 Gate 통과가 필요하다.

## 12. 로그 / metadata / UI 노출 금지 항목

절대 노출 금지:

- access token
- refresh token
- client secret
- client id 원문도 가능한 한 제한
- authorization header
- endpoint full URL
- `DATABASE_URL`
- `REDIS_URL`
- cookie
- session secret
- API key
- raw request body 중 인증정보 포함 가능성이 있는 값
- raw response body 중 인증정보 포함 가능성이 있는 값

허용 표시:

- `configured`
- `missing`
- `blocked`
- `disabled`
- safe environment hint
- `naverApiCallAllowed=false`
- `accessTokenRequested=false`
- `endpointCalled=false`
- `credentialsUsed=false`
- `sanitized=true`

로그/metadata/UI/API 응답 공통 정책:

- 원문 secret 대신 safe status만 기록한다.
- endpoint 전체 주소 대신 `endpointCalled=false` 또는 `endpointCallGate=disabled`만 표시한다.
- token 관련 값은 존재 여부도 조심스럽게 다루며, 현재 단계에서는 `accessTokenRequested=false`만 표시한다.
- 인증정보가 포함될 수 있는 raw payload는 저장하지 않는다.

## 13. 운영 DB / Queue / Worker 분리 원칙

운영 DB:

- 이번 설계 문서 단계에서는 운영 DB 접근/write 없음.
- 향후에도 token 발급 테스트는 운영 DB write와 분리한다.
- 상품 수정 endpoint 호출 전 DB Read Guard와 Environment Safety Guard를 다시 확인한다.

Queue / Worker:

- 이번 설계 문서 단계에서는 Queue enqueue 없음.
- Worker 호출 없음.
- 향후 최초 token 발급 테스트는 Queue/Worker 경로와 분리한다.
- 최초 상품 수정 단일 테스트도 자동 enqueue 방식이 아니라 별도 승인된 단일 실행 경로만 검토한다.

schema/migration:

- 이번 설계 문서 단계에서는 schema 변경 없음.
- migration 변경 없음.
- token 저장용 컬럼 추가는 기본 금지다.

## 14. 향후 Task 분리 제안

### Task 20 후보: Naver API Auth Config Safe Reader skeleton

목표:

- 인증정보 존재 여부만 safe check
- secret 원문 반환 금지
- token 발급 없음
- endpoint 호출 없음

허용 결과:

- `NAVER_AUTH_CONFIG_MISSING`
- `NAVER_AUTH_CONFIG_PRESENT_BUT_BLOCKED`

### Task 21 후보: Naver API Token Provider disabled skeleton

목표:

- token 발급 함수 구조만 생성
- 호출 시 `TOKEN_REQUEST_DISABLED` 계열 상태 반환
- 실제 token 발급 없음
- token DB 저장 없음

허용 결과:

- `NAVER_AUTH_TOKEN_REQUEST_DISABLED`

### Task 22 후보: Naver API Token Dry Permission Gate

목표:

- token 발급 전 승인 조건 점검
- 실제 발급 없음
- 사용자 승인, 환경 Guard, audit 상태를 read-only로 평가

허용 결과:

- `NAVER_LIVE_SINGLE_TEST_READY_BUT_AUTH_DISABLED`

### Task 23 후보: 최초 Token 발급 테스트 준비 문서

목표:

- 실제 발급 전 최종 점검표 작성
- 구현 없음
- endpoint 호출 없음
- 상품 수정 payload 연결 없음

허용 결과:

- `NAVER_TOKEN_TEST_CHECKLIST_READY_BUT_NOT_EXECUTED`

### Task 24 이후 후보: 별도 명시 승인 후 token 발급 테스트

목표:

- 별도 명시 승인 후 token 발급만 테스트
- 상품 수정 endpoint 호출 없음
- token 원문 저장/출력 없음
- token 발급 성공이 Live 상품 수정 허용으로 이어지지 않음

허용 결과:

- `NAVER_AUTH_TOKEN_REQUESTED_BUT_PRODUCT_UPDATE_DISABLED`

### 상품 수정 endpoint 호출 Task

상품 수정 endpoint 호출은 token 발급 테스트와 반드시 다른 Task로 분리한다.

최초 상품 수정 Task 시작 조건:

- token 발급 테스트 완료
- token 원문 비노출 검증 완료
- endpoint 호출 Gate 별도 설계 완료
- 사용자 별도 명시 승인 완료
- item 정확히 1건
- replay 차단 확인
- 실패 처리 정책 재확인

## 15. 이번 문서에서 하지 않은 것

이번 문서는 아래 작업을 수행하지 않았다.

- 실제 Naver API 호출 없음
- Naver API endpoint URL 작성 없음
- endpoint 호출 코드 작성 없음
- fetch / axios / HTTP client 코드 작성 없음
- curl 예시 없음
- access token 발급 없음
- 인증정보 사용 없음
- authorization header 생성 없음
- Live Adapter 실제 호출 구현 없음
- Live 실행 버튼 생성 없음
- Queue enqueue 없음
- Worker 호출 없음
- 운영 DB 접근 없음
- 운영 DB write 없음
- 운영 Redis 접근 없음
- schema/migration 변경 없음
- package 파일 변경 없음

## 16. 완료 판정

이번 설계가 완료되어도 시스템의 최대 상태는 다음 수준을 넘지 않는다.

- `NAVER_API_AUTH_SAFETY_SEPARATION_DESIGN_ONLY`
- `NAVER_API_AUTH_FLOW_DESIGNED_BUT_NOT_IMPLEMENTED`

유지되어야 하는 최종 상태:

| 항목 | 상태 |
|------|------|
| 실제 Naver API 호출 | 없음 |
| access token 발급 | 없음 |
| endpoint 호출 | 없음 |
| HTTP request 생성 | 없음 |
| 인증정보 사용 | 없음 |
| 운영 DB write | 없음 |
| Queue enqueue | 없음 |
| Worker 호출 | 없음 |
| Live 실행 버튼 | 없음 |
| schema/migration 변경 | 없음 |

