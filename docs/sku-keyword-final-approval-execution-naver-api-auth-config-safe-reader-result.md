# Naver API Auth Config Safe Reader — 작업 결과

## 작업 목표

Naver API 인증정보를 실제로 사용하거나 출력하지 않고, 인증정보가 "설정되어 있는지 여부"만 안전한 상태값으로 확인하는 skeleton 구조 구현.

token 발급 구현이 아니며, Naver API 인증 구현도 아닙니다. 인증정보 safe reader skeleton입니다.

---

## 구현 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/services/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.service.ts` | 신규 — Auth Config Safe Reader 서비스 |
| `src/services/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.test.ts` | 신규 — 45개 테스트 케이스 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | 수정 — `naverAuthConfigSafety` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 수정 — Naver Auth Config Safe Reader UI 섹션 추가 |
| `docs/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader-result.md` | 신규 — 이 문서 |

---

## Auth Config Safe Reader 동작 방식

`evaluateNaverApiAuthConfigSafeReader(input)` 함수가 진입점입니다.

1. `input.envLike`를 받아 `input.requiredConfigKeys`에 지정된 키들의 **존재 여부만** boolean으로 확인
2. 값 자체는 읽지 않음 — `key in envLike && envLike[key].length > 0` 수준의 체크만 수행
3. 결과에 `authConfigStatus`, `clientIdStatus`, `clientSecretStatus` 등 safe status만 반환
4. 모든 실행 관련 플래그(`authConfigUsable`, `accessTokenRequested`, `credentialsUsed`, `tokenIssued`, `naverApiCallAllowed` 등)는 항상 `false`
5. 마지막에 `sanitizeNaverApiAuthConfigStatus()`를 통해 invariant 필드를 강제 재설정

---

## safe status 기준

| 상태 | 조건 |
|------|------|
| `CONFIGURED_BUT_BLOCKED` | clientId + clientSecret 모두 존재 |
| `PARTIAL` | 둘 중 하나만 존재 |
| `MISSING` | 둘 다 없음 |
| `UNKNOWN` | 입력 오류 등 불명확한 상태 |

`configured` 상태의 의미: "값이 존재하는 것처럼 보인다"까지만 의미. "사용 가능하다", "token 발급 가능하다", "Naver API 호출 가능하다"를 **절대 의미하지 않음**.

---

## secret 원문 비노출 방식

- `envLike`에서 키의 존재 여부만 `typeof val === 'string' && val.length > 0`으로 판단
- 값 자체(`val`)는 반환 객체에 포함하지 않음
- 마스킹 문자열(예: `abcd****1234`)도 생성하지 않음
- `clientIdStatus`, `clientSecretStatus`는 `'configured' | 'missing' | 'blocked' | 'unknown'`만 반환

---

## API/UI 표시 내용

### API (`GET /api/sku-matching/draft-batch/[jobId]`)

`responseJob.naverAuthConfigSafety`에 아래 read-only 필드만 포함:

```
credentialConfigured       boolean
authConfigUsable           false (항상)
authConfigStatus           CONFIGURED_BUT_BLOCKED | MISSING | PARTIAL | BLOCKED | UNKNOWN
clientIdStatus             configured | missing | blocked | unknown
clientSecretStatus         configured | missing | blocked | unknown
tokenStatus                disabled (항상)
naverApiCallAllowed        false (항상)
liveExecutionEnabled       false (항상)
accessTokenRequested       false (항상)
credentialsUsed            false (항상)
tokenIssued                false (항상)
authorizationHeaderCreated false (항상)
secretVisible              false (항상)
sanitized                  true (항상)
checklistItems             []
blockingReasons            []
warnings                   []
maxAllowedState            NAVER_AUTH_CONFIG_SAFE_READER_REGISTERED_BUT_SECRET_BLOCKED
```

client id 원문, client secret 원문, token, authorization header, endpoint URL은 **포함하지 않음**.

### UI (`/dashboard/sku-keyword-draft-batches/[jobId]`)

- "Naver API 인증정보 안전 확인" 섹션 신규 추가
- 인증정보 상태 요약 배지 (CONFIGURED_BUT_BLOCKED / MISSING / PARTIAL)
- 안전 배지 6종 (Secret 원문 비노출, Token 발급 비활성화, 인증정보 사용 안 함, Authorization header 없음, Endpoint 호출 없음, Naver API 호출 비활성화)
- 상태 카드 8개 (credentialConfigured, authConfigUsable, clientIdStatus, clientSecretStatus, tokenStatus, accessTokenRequested, credentialsUsed, tokenIssued)
- 차단 사유 목록 / 경고 목록
- maxAllowedState 표시
- Token 발급 버튼, 인증 테스트 버튼, Live 실행 버튼 **없음**

---

## 항상 false 유지 여부

| 필드 | 상태 |
|------|------|
| `authConfigUsable` | 항상 `false` — sanitize 단계에서 강제 재설정 |
| `accessTokenRequested` | 항상 `false` |
| `credentialsUsed` | 항상 `false` |
| `tokenIssued` | 항상 `false` |
| `endpointCalled` | 항상 `false` |
| `naverApiCallAllowed` | 항상 `false` |
| `liveExecutionEnabled` | 항상 `false` |
| `httpRequestCreated` | 항상 `false` |
| `authorizationHeaderCreated` | 항상 `false` |
| `operatingDbWriteAllowed` | 항상 `false` |
| `queueAllowed` | 항상 `false` |
| `workerAllowed` | 항상 `false` |
| `secretVisible` | 항상 `false` |

`allowCredentialUse=true`, `allowTokenRequest=true`, `allowEndpointCall=true`를 입력으로 넘겨도 모두 무시됩니다.

---

## 실제 Naver API 호출 여부

**없음.** 이 작업에서 Naver API를 실제로 호출한 코드 경로는 없습니다.

---

## Naver API endpoint/token/HTTP 코드 작성 여부

**없음.** fetch, axios, HTTP client, authorization header, endpoint URL, access token 발급 코드를 작성하지 않았습니다.

---

## 운영 DB 접근/write 여부

**없음.** 기존 Prisma 조회(`naverApiBatchJob.findUnique`)만 사용하며 write 없음.

---

## schema/migration 변경 여부

**없음.** Prisma schema 및 migration 파일 변경 없음.

---

## Queue / Worker 호출 여부

**없음.** Queue enqueue, Worker 호출 없음.

---

## 검증 결과

```
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.test.ts
→ 45개 테스트 PASS

npx.cmd prisma validate
→ valid

npx.cmd tsc --noEmit
→ clean (오류 없음)

git diff --check
→ clean

git status --short
→ 신규/수정 파일만 표시, 불필요한 변경 없음
```

---

## 다음 작업 제안

- Task 21: Naver API token 발급 Gate (별도 Gate — token 발급 구현이 아닌 Gate 조건 설계)
- Task 22: Naver API endpoint 호출 Gate (별도 Gate — endpoint 호출 구현이 아닌 Gate 조건 설계)
- 위 두 Gate는 항상 disabled 상태로 시작하며, 별도 Task에서 명시적 활성화 결정 필요
