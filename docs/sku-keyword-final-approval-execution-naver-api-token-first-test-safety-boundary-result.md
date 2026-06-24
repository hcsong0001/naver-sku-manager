# Task 26 — 최초 Naver API Token 발급 테스트 Safety Boundary 구현

## 1. 작업 목표

실제 token 발급 코드를 넣기 전, "정말 token 발급 테스트 1회가 가능한 상태인지"를 최종적으로 판정하는
Safety Boundary를 구현합니다.

**이번 작업의 허용 최대 결과:**
- `NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE`
- `NAVER_AUTH_TOKEN_FIRST_TEST_BLOCKED_BY_SAFETY_BOUNDARY`
- `NAVER_AUTH_TOKEN_FIRST_TEST_APPROVAL_CONFIRMED_BUT_TOKEN_REQUEST_DISABLED`

이번 작업에서도 실제 token 발급은 없습니다.

---

## 2. 구현 파일

| 파일 | 역할 |
|---|---|
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.service.ts` | Safety Boundary 핵심 서비스 |
| `src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.test.ts` | 테스트 (59/59 pass) |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `naverAuthTokenFirstTestSafetyBoundary` 필드 추가 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | Safety Boundary UI 섹션 추가 |
| `docs/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary-result.md` | 결과 문서 |

---

## 3. Safety Boundary 동작 방식

1. 입력: 기존 Guard/Skeleton/Audit 결과들을 취합
2. 처리: 30개 이상의 체크리스트 항목을 평가 (순수 함수, 부작용 없음)
3. 출력: `NaverApiTokenFirstTestSafetyBoundaryResult` — 모든 안전 플래그를 포함한 read-only 결과

체크리스트 섹션:
1. 고정 불변 조건 (항상 PASS)
2. allowX 입력 무시 확인
3. Environment Safety Guard 확인
4. Auth Config Safe Reader 확인
5. Token Provider Disabled 확인
6. Token Dry Permission Gate 확인
7. Token Provider Test-Only Skeleton 확인
8. Token Test Approval Audit 확인
9. Live Adapter Skeleton 상태 확인
10. FinalApproval 상태 확인
11. BatchJob 상태 확인
12. Item 수 확인 (정확히 1건)
13. Item 상태 확인
14. 추가 안전 체크
15. maxAllowedState 확인

---

## 4. 기존 Guard들과의 관계

| Guard | 역할 | Safety Boundary와의 관계 |
|---|---|---|
| Environment Safety Guard | 환경 안전 확인 | 결과를 입력으로 받아 참조 |
| Auth Config Safe Reader | 인증정보 존재 확인 | 결과를 입력으로 받아 참조 |
| Token Provider Disabled | Token 발급 비활성화 | 결과를 입력으로 받아 참조 |
| Token Dry Permission Gate | Dry-run 조건 판정 | 결과를 입력으로 받아 참조 |
| Token Test-Only Skeleton | Test-only 구조 준비 | 결과를 입력으로 받아 참조 |
| Token Test Approval Audit | 사용자 승인 기록 | 결과를 입력으로 받아 참조 |

Safety Boundary는 기존 Guard들을 **대체하지 않습니다.** 기존 Guard들의 결과를 모아 최종 판정만 합니다.

---

## 5. Token Test Approval Audit과의 관계

- Token Test Approval Audit 기록이 존재(`hasAudit=true`)하고 12개 acknowledgement가 모두 완료된 경우에만 `tokenTestApprovalComplete=true`
- `tokenTestApprovalComplete=true`여야 `readyForExplicitTokenTestApproval=true`가 될 수 있음
- `readyForExplicitTokenTestApproval=true`여도 `tokenRequestAllowed=false`, `tokenIssued=false` 유지

---

## 6. readyForExplicitTokenTestApproval 의미

- token 발급을 실행해도 된다는 뜻이 아닙니다.
- "다음 Task에서 사용자가 별도로 명시 승인하면 token 발급 테스트 Task로 넘어갈 수 있다"는 뜻입니다.
- `readyForExplicitTokenTestApproval=true`여도 `tokenRequestAllowed=false`여야 합니다.
- `readyForExplicitTokenTestApproval=true`여도 `accessTokenRequested=false`여야 합니다.
- `readyForExplicitTokenTestApproval=true`여도 `tokenIssued=false`여야 합니다.

---

## 7. allPreconditionsPassed 의미

- blockingReasons와 needsReviewReasons가 모두 비어 있으면 `allPreconditionsPassed=true`
- `allPreconditionsPassed=true`여도 token 발급은 비활성화됩니다.
- `allPreconditionsPassed=true`여도 `tokenRequestAllowed=false`입니다.

---

## 8. 안전 불변 조건 보장

| 필드 | 값 | 보장 방식 |
|---|---|---|
| `allowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenRequestAllowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenRequestPrepared` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenRequestExecuted` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `accessTokenRequested` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `refreshTokenRequested` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `credentialsUsed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenIssued` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenStored` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `authorizationHeaderCreated` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `endpointResolved` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `endpointCalled` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `httpRequestCreated` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `httpClientCreated` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `naverApiCallAllowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `liveExecutionEnabled` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `queueAllowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `workerAllowed` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `secretVisible` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `tokenVisible` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `endpointVisible` | `false` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |
| `sanitized` | `true` | TypeScript 리터럴 타입 + sanitize 덮어쓰기 |

---

## 9. API/UI 표시 내용

### GET `/api/sku-matching/draft-batch/[jobId]` — `naverAuthTokenFirstTestSafetyBoundary`

- `ok`, `readyForExplicitTokenTestApproval`, `allowed=false`, `status`, `resultCode`, `resultMessage`
- `tokenTestApprovalPresent`, `tokenTestApprovalComplete`, `allPreconditionsPassed`
- 안전 플래그 전체 (모두 false)
- `checklistItems`, `blockingReasons`, `warnings`, `needsReviewReasons`
- `maxAllowedState=NAVER_AUTH_TOKEN_FIRST_TEST_SAFETY_BOUNDARY_READY_BUT_NOT_EXECUTABLE`

### UI (page.tsx)

1. **안전 안내 배너** — "이 Boundary는 실제 token 발급을 실행하지 않습니다."
2. **상태 요약 카드** — status, resultCode, readyForExplicitTokenTestApproval, allPreconditionsPassed, allowed=false 등
3. **안전 배지** — Token 요청 비활성화, Access Token 요청 없음, Endpoint 미해결, HTTP client 없음, Authorization header 없음, Token 저장 없음, Live 실행 비활성화, Queue/Worker 없음
4. **코어 체크리스트** — PASS/WARN/BLOCKED/NEEDS_REVIEW 상태로 항목별 표시
5. **차단/경고/확인 필요 사유 목록**
6. **안내 문구** — "이 섹션은 최초 token 발급 테스트 직전 조건을 최종 점검합니다. 모든 조건이 통과되어도 이 단계에서는 token을 발급하지 않으며, 실제 token 발급 테스트는 다음 Task에서 별도 명시 승인 후에만 진행됩니다."

---

## 10. Secret/Token/Endpoint 비노출 방식

- 서비스 함수가 순수 함수(pure function)로 외부 호출 없음
- `secretVisible=false`, `tokenVisible=false`, `endpointVisible=false` 항상 강제
- `sanitizeNaverApiTokenFirstTestSafetyBoundaryResult()` 함수로 최종 덮어쓰기
- route.ts에서 process.env 값을 직접 전달하지 않음 (safe hint만 사용)
- JSON 직렬화 결과에 token/secret/endpoint URL 포함 불가

---

## 11. 실제 Naver API 호출 여부

**없음** — fetch/axios/HTTP client 코드가 없습니다.

## 12. Token 발급 여부

**없음** — access token, refresh token이 발급되지 않습니다.

## 13. Naver API endpoint/token/HTTP 코드 작성 여부

**없음** — endpoint URL, HTTP client, authorization header 코드가 없습니다.

## 14. 운영 DB 접근/write 여부

**없음** — Safety Boundary는 순수 함수로 DB 접근 없음. route.ts는 기존 필드들을 읽기만 합니다.

## 15. Schema/Migration 변경 여부

**없음** — 기존 schema 그대로 사용합니다.

## 16. Queue/Worker 호출 여부

**없음** — `queueAllowed=false`, `workerAllowed=false`가 항상 강제됩니다.

---

## 17. 검증 결과

### 신규 테스트

```
npx.cmd tsx --test src/services/sku-keyword-final-approval-execution-naver-api-token-first-test-safety-boundary.test.ts
→ 59/59 pass
```

### 관련 테스트 (전체)

```
npx.cmd tsx --test (관련 6개 서비스 파일)
→ 313/313 pass
```

### 정적 검증

```
npx.cmd tsc --noEmit    → clean ✓
npx.cmd prisma validate → valid ✓
git diff --check        → 공백 오류 없음 ✓
```

---

## 18. 다음 작업 제안 (Task 27)

- **Task 27**: 실제 Naver API token 발급 테스트 실행
  - 이 Safety Boundary에서 `readyForExplicitTokenTestApproval=true`인 경우에만 허용
  - 사용자의 별도 명시 승인 필요
  - 이 단계에서 최초로 HTTP client 코드 허용
  - `tokenRequestAllowed=true`로 변경하는 별도 승인 API 구현
