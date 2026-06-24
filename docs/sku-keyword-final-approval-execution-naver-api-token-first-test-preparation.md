# 최초 Naver API Token 발급 테스트 준비 문서

> **작성 기준 커밋**: a340cbf (feat: add naver api token dry permission gate, Task 22)
> **작성 목적**: 실제 access token 발급을 구현하거나 실행하기 전에, 최초 token 발급 테스트를 어떤 조건에서, 어떤 순서로, 어떤 금지사항을 지키며 진행할지 원칙을 확정한다.
> **이 문서는 계획/원칙 문서이며, 코드 구현 및 실제 token 발급을 수행하지 않는다.**

---

## 1. 현재까지 완료된 안전 구조

아래 구조가 모두 완료된 상태에서 이 문서를 작성한다.

| 완료 항목 | 상태 |
|-----------|------|
| Mock 실행 파이프라인 | 완료 |
| Live Safety Gate | 완료 |
| 실행 결과 기록/조회 | 완료 |
| 재실행 차단 | 완료 |
| Live 단일 테스트 전 점검표 | 완료 |
| Live 단일 테스트 승인 준비 UI | 완료 |
| Live 단일 테스트 승인 감사 기록 저장 | 완료 |
| 환경 / DB 안전 확인 Guard | 완료 |
| 승인 감사 기록 전용 대시보드 | 완료 |
| Live Adapter skeleton | 완료 |
| Naver API 인증 안전 분리 설계 | 완료 |
| Auth Config Safe Reader skeleton | 완료 |
| Token Provider disabled skeleton | 완료 |
| Token Dry Permission Gate | 완료 |
| 실제 Naver API 호출 | **0회** |
| token 발급 | **0회** |

현재 모든 불변 조건은 아래와 같이 유지 중이다.

```
accessTokenRequested=false
refreshTokenRequested=false
credentialsUsed=false
tokenIssued=false
tokenStored=false
authorizationHeaderCreated=false
endpointCalled=false
httpRequestCreated=false
naverApiCallAllowed=false
liveExecutionEnabled=false
operatingDbWriteAllowed=false
queueAllowed=false
workerAllowed=false
```

---

## 2. 최초 token 발급 테스트의 목적

최초 token 발급 테스트의 **유일한 목적**은 access token 발급 가능 여부를 확인하는 것이다.

아래 목적은 이번 테스트에 해당하지 않는다.

- 상품 수정 API 호출 목적이 아니다.
- 상품명 / 가격 / 재고 / 키워드 변경 목적이 아니다.
- Live 실행 흐름 검증 목적이 아니다.
- Queue / Worker 연결 목적이 아니다.

아래 원칙이 이 테스트의 핵심이다.

- token 발급 성공은 Live 실행 허용을 의미하지 않는다.
- token 발급 성공은 상품 수정 endpoint 호출 허용을 의미하지 않는다.
- token 발급 테스트와 상품 수정 테스트는 별도 Task, 별도 사용자 승인으로 분리된다.

허용되는 최대 결과 상태:

```
NAVER_AUTH_TOKEN_FIRST_TEST_PREPARATION_DOCUMENTED_ONLY
또는
NAVER_AUTH_TOKEN_TEST_PLAN_READY_BUT_NOT_EXECUTED
```

---

## 3. 최초 token 발급 테스트 전 필수 조건

아래 조건이 모두 충족된 것이 확인된 후에만 최초 token 발급 테스트를 진행할 수 있다.

### 3-1. Git / 코드 상태
- `git status --short` 결과가 clean이어야 한다.
- origin/main 최신 커밋 기준이어야 한다.
- Task 22 커밋(`a340cbf`)이 origin/main에 반영되어 있어야 한다.

### 3-2. 안전 구조 확인
- Environment Safety Guard가 `naverApiCallAllowed=false` 상태임을 확인한다.
- Auth Config Safe Reader가 `authConfigUsable=false` 상태임을 확인한다.
- Token Provider disabled skeleton이 `tokenIssued=false` 상태임을 확인한다.
- Token Dry Permission Gate가 `tokenRequestAllowed=false` 상태임을 확인한다.

### 3-3. 격리 확인
- token 발급 gate가 현재 disabled 상태임을 확인한다.
- endpoint 호출 gate가 현재 disabled 상태임을 확인한다.
- 실제 상품 수정 흐름과 코드 경로가 연결되지 않았음을 확인한다.
- Queue / Worker와 코드 경로가 연결되지 않았음을 확인한다.
- Live Adapter skeleton이 여전히 disabled 상태임을 확인한다.

---

## 4. token 발급 테스트 전 별도 사용자 승인 조건

최초 token 발급 테스트는 **사용자의 별도 명시 승인**이 있어야만 진행할 수 있다. 이 승인은 코드, API, UI를 통해 처리하는 것이 아니라, 사용자가 명시적으로 작업 지시문에 아래 문구를 포함하거나 이에 준하는 승인 의사를 명시해야 한다.

**승인 문구**:

> "최초 Naver API token 발급 테스트를 승인합니다. 이 테스트는 상품 수정 API 호출과 연결하지 않으며, access token 발급 가능성만 확인합니다."

이 승인이 확인되지 않은 상태에서는 token 발급 구현을 시작하지 않는다.

승인 UI, 승인 API, 승인 버튼은 이번 단계에서 구현하지 않는다. 필요한 경우 향후 Task 25에서 별도로 구현한다.

---

## 5. token 발급 테스트와 상품 수정 호출 분리 원칙

아래 원칙은 이번 테스트의 핵심 제약이며, 향후 구현 전 과정에서 유지되어야 한다.

| 원칙 | 설명 |
|------|------|
| 코드 경로 분리 | token 발급 테스트는 상품 수정 endpoint와 코드 경로가 연결되지 않는다. |
| Worker 전달 금지 | token 발급 결과를 Worker에 전달하지 않는다. |
| Queue 전달 금지 | token 발급 결과를 Queue에 전달하지 않는다. |
| Live Adapter 연결 금지 | token 발급 결과를 Live Adapter 실행에 연결하지 않는다. |
| 불변 조건 유지 | token 발급 성공 후에도 `naverApiCallAllowed=false`를 유지한다. |
| 불변 조건 유지 | token 발급 성공 후에도 `liveExecutionEnabled=false`를 유지한다. |
| 별도 승인 필요 | 상품 수정 호출은 token 발급 테스트와 별도 Task, 별도 사용자 승인이 필요하다. |

---

## 6. token 처리 원칙

아래 금지 사항은 token 발급 테스트 코드 구현 단계에서 반드시 준수해야 한다.

| 항목 | 처리 원칙 |
|------|----------|
| access token 원문 | 출력 금지 |
| refresh token 원문 | 출력 금지 |
| authorization header | 출력 금지 |
| token DB 저장 | 금지 |
| token metadata 저장 | 금지 |
| token 로그 출력 | 금지 |
| token UI 표시 | 금지 |
| token 마스킹 표시 | 금지 |
| raw response body | 저장 금지 |
| raw request body | 저장 금지 |
| token 생명주기 | 메모리 내 짧은 생명주기 원칙 |
| token 발급 여부 표현 | `issued` / `disabled` / `blocked` / `failed` 같은 safe status로만 표시 |

---

## 7. 환경 및 secret 처리 원칙

아래 금지 사항은 token 발급 테스트 구현 단계뿐 아니라 모든 단계에서 유지되어야 한다.

| 항목 | 처리 원칙 |
|------|----------|
| `.env` 원문 | 출력 금지 |
| `DATABASE_URL` | 출력 금지 |
| `REDIS_URL` | 출력 금지 |
| `client secret` | 출력 금지 |
| `client id` 원문 | 출력 금지 |
| API key | 출력 금지 |
| secret 값 일부 마스킹 | 출력 금지 |
| `console.log`로 secret 출력 | 금지 |
| 문서에 실제 값 예시 작성 | 금지 |
| 허용 표현 | `configured` / `missing` / `blocked` / `unknown` 같은 safe status만 표시 |

---

## 8. 최초 token 발급 테스트 허용 범위 (문서 정의)

아래는 실제 테스트를 진행할 때 허용 가능한 범위를 사전에 정의한 것이다. **현재 작업에서는 실제 요청을 수행하지 않는다.**

| 항목 | 허용/금지 |
|------|----------|
| token 발급 요청 횟수 | 1회 (단회) |
| 상품 수정 endpoint 호출 | 금지 |
| Queue / Worker 사용 | 금지 |
| DB write | 금지 |
| token 저장 | 금지 |
| token 출력 | 금지 |
| 결과 기록 | safe status만 기록 |
| 실패 시 처리 | 기록 후 중단 |
| 성공 시 처리 | 다음 작업으로 자동 진행 금지 |
| 재시도 | 사용자 확인 전 금지 |

---

## 9. 실패 처리 원칙

| 원칙 | 설명 |
|------|------|
| 자동 재시도 금지 | 실패 시 자동으로 retry하지 않는다. |
| replay 금지 | 실패한 요청을 자동으로 재실행하지 않는다. |
| 에러 기록 | safe error code만 기록한다. |
| raw error response 저장 금지 | 인증정보가 포함될 수 있는 응답 본문은 저장하지 않는다. |
| 사용자 확인 선행 | 사용자 확인 전 재시도를 허용하지 않는다. |
| 상품 수정 흐름 차단 | 실패하더라도 상품 수정 흐름으로 자동 전환하지 않는다. |

---

## 10. 성공 처리 원칙

| 원칙 | 설명 |
|------|------|
| safe status 기록 | token 발급 성공 여부는 safe status(`issued`)로만 기록한다. |
| token 원문 저장/출력 금지 | 발급된 token 원문은 저장하거나 출력하지 않는다. |
| 상품 수정 호출 금지 | token 발급 성공 후에도 상품 수정 endpoint 호출을 하지 않는다. |
| Live 실행 금지 | token 발급 성공 후에도 Live 실행을 진행하지 않는다. |
| Queue / Worker 연결 금지 | token 발급 성공 후에도 Queue / Worker 연결을 하지 않는다. |
| 자동 진행 금지 | token 발급 성공 후 다음 단계는 별도 Task와 별도 사용자 승인이 필요하다. |

---

## 11. 최초 token 발급 테스트 전 체크리스트

아래 체크리스트를 실제 token 발급 테스트 진행 직전에 확인한다.

### Git / 코드 상태
- [ ] `git status --short` 결과가 clean임을 확인한다.
- [ ] origin/main 최신 상태 및 Task 22 커밋(`a340cbf`) 반영을 확인한다.

### 코드 경로 격리
- [ ] 실제 Naver API 호출 코드가 상품 수정 endpoint와 연결되지 않았음을 확인한다.
- [ ] token 발급 테스트가 Queue / Worker와 연결되지 않았음을 확인한다.
- [ ] token 저장 코드가 없음을 확인한다.
- [ ] token 출력 코드가 없음을 확인한다.
- [ ] authorization header 출력 코드가 없음을 확인한다.
- [ ] `DATABASE_URL` / `REDIS_URL` 출력 코드가 없음을 확인한다.
- [ ] token 발급 테스트가 단독으로만 실행됨을 확인한다.

### 승인 및 안전
- [ ] 사용자의 별도 명시 승인 문구를 확인한다.
- [ ] 실패 시 자동 재시도 코드가 없음을 확인한다.
- [ ] 성공 시 자동 Live 실행 코드가 없음을 확인한다.
- [ ] TypeScript(`tsc --noEmit`)가 clean임을 확인한다.
- [ ] `git diff --check`가 clean임을 확인한다.

---

## 12. 향후 Task 분리 제안

### Task 24: Naver API Token Provider test-only implementation skeleton
- 실제 token 발급 전 마지막 skeleton 구현
- token 발급 코드 경로를 구현하되 실제 발급은 없음
- 상품 수정 endpoint와 연결하지 않음
- Queue / Worker 연결 없음

### Task 25: 최초 Token 발급 테스트 전 승인 UI 또는 승인 문서
- 사용자의 명시 승인 기록 구조 마련
- 승인 문구 확인 체계 구현
- token 발급은 이 단계에서도 없음

### Task 26: 최초 Token 발급 테스트
- 별도 명시 승인 확인 후 진행
- 상품 수정 endpoint 호출 없음
- token 저장 / 출력 없음
- 결과는 safe status만 기록
- 실패 시 사용자 확인 후 종료
- 성공 시에도 다음 단계 자동 진행 없음

### Task 27: Token 발급 결과 safe status 조회
- 발급 결과를 safe status로 조회하는 서비스 구현
- token 원문 없음
- 상품 수정 endpoint 없음

### Task 28 이후: 상품 수정 endpoint 호출 준비 설계
- token 발급 검증과 별도 Task로 분리
- 상품 수정 호출은 별도 사용자 승인 필요
- 상품 수정 호출 대상은 반드시 단일 상품 1건으로 제한

---

## 13. 이 문서 작성 단계에서의 상태 확인

이 문서를 작성하는 현재 시점의 안전 상태를 기록한다.

| 항목 | 값 |
|------|----|
| 실제 Naver API 호출 | 없음 |
| token 발급 | 없음 |
| endpoint URL 코드 | 없음 |
| fetch / axios / HTTP client 코드 | 없음 |
| authorization header 생성 | 없음 |
| 운영 DB 접근/write | 없음 |
| schema / migration 변경 | 없음 |
| Queue / Worker 호출 | 없음 |
| secret 출력 | 없음 |
| 이번 작업 허용 최대 상태 | `NAVER_AUTH_TOKEN_TEST_PLAN_READY_BUT_NOT_EXECUTED` |
