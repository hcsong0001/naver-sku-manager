# Task 25 — 최초 Naver API Token 발급 테스트 전 사용자 승인 기록 구조

## 1. 작업 목표

Naver API의 실제 token 발급 테스트가 시작되기 전, 사용자가 12개의 필수 안전 확인 항목(acknowledgement)에 동의했다는 사실을 기록(Audit Record)으로 저장하는 구조를 구현합니다.

- 이 단계는 실제 token 발급이 아닌, **승인 기록만 저장**합니다.
- 모든 safety 불변 조건(tokenIssued=false 등)이 코드 수준에서 강제됩니다.
- Live 실행 활성화 또는 Naver API 호출과 **완전히 분리**되어 있습니다.

---

## 2. 구현 파일

| 파일 | 역할 |
|---|---|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.service.ts` | 승인 기록 생성/검증/sanitize 서비스 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.test.ts` | 서비스 테스트 (70/70 pass) |
| `app/api/sku-keyword-final-approvals/naver-auth-token-test-approval/route.ts` | POST API route (기록 저장 전용) |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | GET route에 `naverAuthTokenTestApprovalAudit` read-only 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | UI 섹션 추가 (안내 배너, 체크박스 12개, 저장 버튼, 기록 표시, 안전 배지) |

---

## 3. 승인 기록 저장 방식

1. UI에서 사용자가 12개 acknowledgement 체크박스를 모두 체크합니다.
2. `POST /api/sku-keyword-final-approvals/naver-auth-token-test-approval` 호출:
   - `confirmApprovalRecordOnly: true` 필수
   - `finalApprovalId`, `batchJobId`, `acknowledgedItems` 필수
3. 서비스에서 `buildNaverApiTokenTestApprovalAuditRecord()` 호출 → 순수 함수, 부작용 없음
4. `NaverApiBatchJob.metadata.naverAuthTokenTestApprovalAudit` 에 저장
5. GET API에서 `sanitizeStoredAuditRecord()` 를 통해 read-only로 응답에 포함

---

## 4. 필수 Acknowledgement 목록 (12개)

| 코드 | 설명 |
|---|---|
| `CONFIRM_TOKEN_TEST_ONLY` | 이 작업은 token 발급 테스트 기록만을 목적으로 합니다. |
| `CONFIRM_NO_PRODUCT_UPDATE` | 이 작업은 상품 수정 API와 연결되지 않습니다. |
| `CONFIRM_NO_ENDPOINT_CALL_IN_THIS_STEP` | 이 단계에서 Naver API endpoint 호출이 발생하지 않습니다. |
| `CONFIRM_NO_TOKEN_ISSUANCE_IN_THIS_STEP` | 이 단계에서 access token 또는 refresh token이 발급되지 않습니다. |
| `CONFIRM_TOKEN_WILL_NOT_BE_STORED` | 발급된 token은 저장되지 않습니다. |
| `CONFIRM_TOKEN_WILL_NOT_BE_DISPLAYED` | access token, refresh token, client secret은 UI/로그에 표시되지 않습니다. |
| `CONFIRM_NO_AUTHORIZATION_HEADER_CREATED` | Authorization header가 생성되지 않습니다. |
| `CONFIRM_NO_QUEUE_OR_WORKER` | Queue enqueue 또는 Worker 호출이 없습니다. |
| `CONFIRM_NO_AUTOMATIC_RETRY` | 실패 시 자동 재시도가 없습니다. |
| `CONFIRM_SUCCESS_DOES_NOT_ENABLE_LIVE_EXECUTION` | 이 승인 기록 저장 성공이 Live 실행을 활성화하지 않습니다. |
| `CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_REAL_TOKEN_TEST` | 실제 token 발급 테스트를 실행하려면 별도의 추가 사용자 승인이 필요합니다. |
| `CONFIRM_SEPARATE_APPROVAL_REQUIRED_FOR_PRODUCT_UPDATE` | 상품 수정 API 호출을 위해서는 별도의 추가 사용자 승인이 필요합니다. |

---

## 5. API / UI 표시 내용

### GET `/api/sku-matching/draft-batch/[jobId]` 응답

`naverAuthTokenTestApprovalAudit` 필드:
- `hasAudit`: 기록 존재 여부
- `auditCode`: 감사 코드 (ex: `TOKEN_TEST_APPROVAL_abc12345_def67890_XYZK`)
- `recordedAt`: 기록 시각 (ISO 8601)
- `recordedBy`: 기록자 (actorId)
- `approvalPurpose`: `FIRST_TOKEN_TEST_APPROVAL_RECORD_ONLY`
- `acknowledgedItems`: 확인된 항목 목록
- `maxAllowedState`: `NAVER_AUTH_TOKEN_TEST_APPROVAL_RECORDED_BUT_NOT_EXECUTABLE`
- 안전 플래그 전체 (모두 false)

### UI (page.tsx)

1. **안전 안내 배너** — 이 섹션이 승인 기록 전용임을 명시
2. **체크박스 12개** — 각 항목마다 코드명(font-mono)과 설명 표시
3. **저장 버튼** — `승인 기록 저장 (Token 발급 미실행)`
4. **저장된 기록 표시** — auditCode, recordedAt, recordedBy, acknowledgedItems, maxAllowedState, 안전 플래그
5. **안전 배지** — Token 발급 미실행, Endpoint 호출 없음, HTTP client 없음, Authorization header 없음, Token 저장 없음, Live 실행 비활성화, Queue/Worker 없음

---

## 6. Token 발급 미실행 보장 방식

- `buildNaverApiTokenTestApprovalAuditRecord()` 는 순수 함수로 네트워크/DB write를 수행하지 않습니다.
- 서비스 반환값 타입에서 `tokenRequestAllowed: false`, `tokenIssued: false` 등을 TypeScript 리터럴 타입으로 강제합니다.
- `sanitizeNaverApiTokenTestApprovalAuditRecord()` 함수가 결과의 모든 safety 플래그를 강제로 덮어씁니다.
- `sanitizeStoredAuditRecord()` 함수가 DB에서 읽은 값을 항상 safe 값으로 재구성합니다.
- `POST route.ts` 는 DB에 metadata만 업데이트합니다. 어떠한 token 발급 코드도 없습니다.

---

## 7. 상품 수정 Endpoint와 분리된 방식

- 이 API는 `/api/sku-keyword-final-approvals/naver-auth-token-test-approval` 경로입니다.
- 상품 수정 endpoint와 완전히 별도 경로입니다.
- `endpointCalled=false`, `endpointResolved=false`가 항상 강제됩니다.
- HTTP fetch/axios/client 코드가 서비스나 route에 없습니다.

---

## 8. Safety Flag 보장 현황

| 플래그 | 값 | 보장 방식 |
|---|---|---|
| `tokenRequestAllowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `accessTokenRequested` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `refreshTokenRequested` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `credentialsUsed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenIssued` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenStored` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `authorizationHeaderCreated` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `endpointResolved` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `endpointCalled` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `httpClientCreated` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `naverApiCallAllowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `liveExecutionEnabled` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |

---

## 9. 실제 Naver API 호출 여부

- **실제 Naver API 호출 없음** — fetch/axios/HTTP client 코드가 없습니다.

## 10. Token 발급 여부

- **Token 발급 없음** — access token, refresh token이 발급되지 않습니다.

## 11. Naver API Endpoint/Token/HTTP 코드 작성 여부

- **없음** — endpoint URL, HTTP client, authorization header 코드가 없습니다.

## 12. 운영 DB 접근/Write 여부

- **metadata 필드만 업데이트** — `NaverApiBatchJob.metadata` JSON 필드에만 기록합니다.
- 운영 DB에 새 row 생성 없음, schema 변경 없음.

## 13. Schema/Migration 변경 여부

- **없음** — 기존 `metadata: Json` 필드를 재사용합니다.

## 14. Queue/Worker 호출 여부

- **없음** — `queueAllowed=false`, `workerAllowed=false`가 항상 강제됩니다.

---

## 15. 검증 결과

### 신규 테스트

```
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-token-test-approval-audit.test.ts
→ 70/70 pass
```

### 관련 테스트 (전체)

```
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-token-provider-test-only-skeleton.test.ts
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-token-dry-permission-gate.test.ts
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-token-provider-disabled.test.ts
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-auth-config-safe-reader.test.ts
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-environment-safety-guard.test.ts
→ 243/243 pass
```

### 정적 검증

```
npx.cmd prisma validate → The schema at prisma/schema.prisma is valid ✓
npx.cmd prisma generate → Generated Prisma Client (v7.8.0) ✓
npx.cmd tsc --noEmit    → clean (오류 없음) ✓
git diff --check        → 공백 오류 없음 ✓
```

---

## 16. 다음 작업 제안 (Task 26+)

- Task 26: 실제 Naver API token 발급 테스트 (별도 추가 사용자 승인 필요)
  - 이 단계에서만 `tokenRequestAllowed`를 true로 바꾸는 별도 API 구현
  - HTTP client 코드는 이 단계에서만 허용
- Task 27: 상품 수정 Endpoint 호출 (Live 실행 — 가장 위험)
  - 별도의 완전한 사용자 승인 흐름 필요
