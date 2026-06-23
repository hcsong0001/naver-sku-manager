# Live 실행 전 환경 안전 확인 Guard 구현 결과

## 작업 목표

실제 Naver API 호출이나 Live Adapter 구현으로 넘어가기 전, 현재 DB/실행 환경이 운영인지 테스트/로컬인지 명확히 구분하고, 승인 기록이 어디에 저장되는지 화면과 서버 응답에서 안전하게 확인할 수 있도록 만드는 것.

이번 작업은 Live 실행 구현이 아닙니다.

## Task 14 "운영 DB write" 표현 확인 결과

**정정 내용:**
Task 14 결과 문서에 "운영 DB write 1건(metadata 승인 기록)"이라는 표현이 사용되었습니다.
이 표현은 **부정확했습니다.**

실제 내용:
- Task 14에서 발생한 DB write는 `NaverApiBatchJob.metadata` 필드에 승인 감사 기록을 저장하는 1건입니다.
- 이 write는 `DATABASE_URL` 환경변수로 연결된 Prisma ORM을 통해 이루어집니다.
- 개발 환경에서 `DATABASE_URL`은 로컬/테스트 DB를 가리키며, 실제 운영(production) DB가 아닙니다.
- 본 보고서 작성 시점까지 **실제 운영 DB에 접근하거나 write를 시도한 적 없습니다.**
- 운영 DB URL을 출력하거나 노출한 적도 없습니다.
- "운영 DB write"라는 표현은 "개발/테스트 환경의 로컬 DB metadata write"로 정정합니다.

**재발 방지 조치:**
- 이번 Task 15에서 구현한 `evaluateExecutionEnvironmentSafetyGuard()`가 DB URL safe hint를 기반으로
  `databaseEnvironment`를 `local | test | unknown | operating_blocked`으로 분류합니다.
- `possible_prod` 힌트(URL에 prod/production/operating/live 포함)가 감지되면 `operating_blocked`로 분류하고
  체크리스트 항목을 `BLOCKED`로 표시합니다.
- `operatingDbWriteAllowed`는 어떤 입력값이 들어와도 항상 `false`로 강제됩니다.
- UI에서 DB 환경 분류값이 명확히 표시됩니다.

## 구현 파일

| 파일 | 역할 | 신규/수정 |
|------|------|----------|
| `src/services/sku-keyword-final-approval-execution-environment-safety-guard.service.ts` | 환경 안전 Guard 순수 함수 4개 | 신규 |
| `src/services/sku-keyword-final-approval-execution-environment-safety-guard.test.ts` | 39개 테스트 케이스 | 신규 |
| `app/api/sku-matching/draft-batch/[jobId]/route.ts` | `environmentSafety` 필드 추가, safe hint 계산 헬퍼 추가 | 수정 |
| `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` | 타입 추가, "환경 / DB 안전 확인" UI 섹션 추가, 감사 기록 UI 강화 | 수정 |
| `docs/sku-keyword-final-approval-execution-environment-safety-guard-result.md` | 결과 문서 | 신규 |

## Environment Safety Guard 기준

### 순수 함수 4개

| 함수 | 역할 |
|------|------|
| `classifyDatabaseEnvironment(hint, isLocal?, isTest?, isOperating?)` | URL safe hint를 `local\|test\|unknown\|operating_blocked`로 분류 |
| `buildEnvironmentSafetyChecklist(input, dbEnv, redisEnv)` | 12개 항목 체크리스트 생성 |
| `evaluateExecutionEnvironmentSafetyGuard(input)` | 전체 환경 안전 평가 (주 함수) |
| `sanitizeEnvironmentSafetySummary(result)` | 결과 요약 sanitize |

### 12개 체크리스트 항목

| Key | 항상 | 조건부 |
|-----|------|--------|
| `no_database_url_exposed` | 항상 PASS | — |
| `no_redis_url_exposed` | 항상 PASS | — |
| `no_secret_exposed` | 항상 PASS | — |
| `naver_api_not_allowed` | 항상 PASS | — |
| `operating_db_write_blocked` | 항상 PASS | — |
| `queue_not_allowed` | 항상 PASS | — |
| `worker_not_allowed` | 항상 PASS | — |
| `live_execution_disabled` | 항상 PASS | — |
| `adapter_mode_safe` | — | live/prod/production/operating → BLOCKED |
| `database_environment` | — | operating_blocked → BLOCKED, unknown → NEEDS_REVIEW |
| `redis_environment` | — | operating_blocked → WARN, unknown → WARN |
| `approval_record_only` | — | audit/approval/record 포함 → PASS, 그 외 → WARN |

### URL Safe Hint 계산 (서버 전용)

```typescript
// DATABASE_URL 원문 미노출. 안전한 분류 키만 반환.
'localhost' | '127.0.0.1' | '::1' → 'local_host'
'test' | 'dev' | 'staging'        → 'test_or_dev'
'prod' | 'production' | 'operating' | 'live' → 'possible_prod'
그 외                             → 'unknown_host'
```

## API 응답 필드

`GET /api/sku-matching/draft-batch/[jobId]`의 `responseJob`에 `environmentSafety` 추가:

```json
{
  "environmentSafety": {
    "allowed": true,
    "environmentCode": "ENVIRONMENT_SAFETY_CHECK_READY_BUT_LIVE_DISABLED",
    "environmentMessage": "환경 안전 점검이 통과되었습니다. 운영 DB write, Naver API 호출, Queue, Worker는 모두 비활성화되어 있습니다.",
    "databaseEnvironment": "local",
    "redisEnvironment": "local",
    "naverApiCallAllowed": false,
    "operatingDbWriteAllowed": false,
    "queueAllowed": false,
    "workerAllowed": false,
    "checklistItems": [ ... ],
    "blockingReasons": [],
    "warnings": [],
    "sanitized": true
  }
}
```

**비포함 필드**: DATABASE_URL 원문, REDIS_URL 원문, secret, token, API key, client secret

## UI에서 표시되는 내용

"Live 실행 전 환경 안전 점검" 섹션 (승인 기록 저장 섹션 아래, 실행 결과 섹션 위):

1. **안내 문구**: "현재 화면은 Live 실행 전 환경 안전 점검용입니다..." + 원문 URL/secret 비노출 안내
2. **환경 상태 요약 4개 카드**: DB 환경, Redis 환경, 차단 건수, 경고 건수
3. **항상 false 배지 5개**: Naver API 호출 비활성화, 운영 DB write 차단, Queue 비활성화, Worker 비활성화, Secret 비노출
4. **차단 사유 목록** (있을 때)
5. **경고 목록** (있을 때)
6. **12개 항목 체크리스트**: PASS/WARN/BLOCKED/NEEDS_REVIEW 각각 색상 구분
7. **환경 코드 표시**: environmentCode + environmentMessage

## 감사 기록 조회 강화 내용

기존 "Live 단일 테스트 승인 기록 저장" 섹션의 저장 완료 표시에 다음 항목 추가:

- "승인 기록 전용 — 실행 상태 미전환" 배지
- "이 기록은 Live 단일 테스트 전 확인 항목에 대한 감사 기록입니다. 이 기록만으로 실제 Naver API 호출은 실행되지 않습니다." 안내 문구

## Task 14 코드 안전 점검 결과

검토 파일:
- `app/api/sku-keyword-final-approvals/live-single-test-approval/route.ts`
- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
- `src/services/sku-keyword-final-approval-execution-live-single-test-approval-audit.service.ts`

| 항목 | 결과 |
|------|------|
| Queue 호출 없음 | 확인 — BullMQ/Queue import 없음 |
| Worker 호출 없음 | 확인 — Worker import 없음 |
| Naver API adapter 호출 없음 | 확인 — Naver HTTP client 없음 |
| 실행 API와 연결 없음 | 확인 — POST API는 metadata write 전용 |
| naverApiCallAllowed=false 유지 | 확인 — 모든 응답 경로에서 false |
| liveExecutionEnabled=false 유지 | 확인 — 모든 응답 경로에서 false |
| metadata에 secret/token/URL 저장 안 됨 | 확인 — `sanitizeLiveSingleTestApprovalAuditPayload()`로 제거 |
| 응답에 secret/token/URL 없음 | 확인 — `extractSafeAuditRecord()`가 명시적 필드만 추출 |
| BatchJob status 변경 없음 | 확인 — `metadata` 필드만 update, `status` 미변경 |
| Item status 변경 없음 | 확인 — item update 코드 없음 |

## naverApiCallAllowed=false 유지 여부

**항상 false.** 서비스 함수, POST API, GET 응답, UI 5개 배지 전 레이어에서 강제.

## operatingDbWriteAllowed=false 유지 여부

**항상 false.** `allowOperatingDbWrite: true` 입력값도 무시됨. 테스트 TC-06으로 검증.

## queueAllowed=false 유지 여부

**항상 false.** 구조적 강제. 체크리스트 항목 `queue_not_allowed`는 항상 PASS.

## workerAllowed=false 유지 여부

**항상 false.** 구조적 강제. 체크리스트 항목 `worker_not_allowed`는 항상 PASS.

## 실제 Naver API 호출 여부

**없음.** HTTP 클라이언트, Naver API endpoint, access token, Live adapter 없음.

## 운영 DB 접근/write 여부

**없음.** 운영 DB URL을 읽거나 접속하지 않았습니다.
- 이번 Task 15에서 추가된 코드는 `process.env.DATABASE_URL`의 **존재 여부**와 **분류 힌트**만 사용합니다.
- URL 원문은 서버 메모리에만 존재하며, 로그/응답/UI에 노출되지 않습니다.
- GET 라우트에서 `getDatabaseUrlSafeHint()`가 분류 키(`local_host` 등)만 반환합니다.

## schema/migration 변경 여부

**없음.** 기존 `NaverApiBatchJob.metadata Json?` 필드 활용 (Task 14와 동일).

## Queue / Worker 호출 여부

**없음.** BullMQ, Worker, enqueue 없음.

## 검증 결과

```
environment safety guard tests: 39/39 pass
audit service tests:            35/35 pass (기존)
approval guard tests:           31/31 pass (기존)
preflight check tests:          30/30 pass (기존)
replay guard tests:             22/22 pass (기존)
safety gate tests:              28/28 pass (기존)
adapter factory tests:          20/20 pass (기존)
총:                            205/205 pass

npx.cmd tsc --noEmit  → clean
npx.cmd prisma validate → valid
git diff --check        → clean
```

## 다음 작업 제안

- Task 16: Live Adapter 실제 구현 준비 (별도 Safety Gate 강화 후)
- 또는: 승인 감사 기록 전용 조회 API 구현
- 현재 단계: 환경 안전 점검 완료, Live 호출은 여전히 차단 상태
