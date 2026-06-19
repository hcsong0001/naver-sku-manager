# SKU Keyword Matching 최종 승인 artifact 생성 API 구현 계획

## 문서 목적

이 문서는 [최종 승인 artifact 생성 API 설계](./sku-keyword-batch-final-approval-api-design.md)를 실제 코드로 옮기기 전에 구현 파일, 책임 경계, 작업 순서, transaction·hash·오류 처리와 검증 게이트를 정의한다.

인증 주체, 재검증 기준, canonical hash와 격리 테스트 DB의 MVP 확정값은 [API 구현 선결 조건 확정](./sku-keyword-batch-final-approval-api-prerequisites.md)을 따른다.

구현 대상은 최종 승인 artifact 생성까지다. 성공하더라도 Job은 `APPROVED`, Item은 `READY`로 유지하며 네이버 API 호출, Worker 실행과 `EXECUTING` 전환으로 이어지지 않는다.

이번 작업에서는 계획 문서만 작성한다. route, service, type, test, Prisma schema와 migration을 생성하거나 수정하지 않으며 DB write를 수행하지 않는다.

## 현재 기반과 확인된 간극

### 준비된 기반

- `NaverApiBatchFinalApprovalStatus`, `NaverApiBatchFinalApproval`, `NaverApiBatchFinalApprovalItem` schema 적용 완료
- `20260619151522_add_final_approval_artifacts` migration 적용 완료
- Job별 ACTIVE 최대 1개 PostgreSQL partial unique index 적용 완료
- 현재 검토 승인 route/service 패턴 존재
  - `app/api/sku-matching/draft-batch/[jobId]/approve/route.ts`
  - `src/services/sku-keyword-draft-batch-approve.service.ts`
- Prisma Client 7.8.0과 PostgreSQL adapter 사용

### 구현 착수 전 간극

1. API에서 신뢰할 인증 주체와 최종 승인 권한을 제공하는 공통 인증 계층이 확인되지 않았다.
2. 문서로 설계한 실행 전 재검증 서비스는 아직 구현되지 않았다.
3. canonical JSON 규격과 승인된 hash test vector가 없다.
4. payload operation/transformer의 확정된 version 계약이 없다.
5. `package.json`에 test script와 test runner가 없고 현재 테스트 파일도 없다.
6. 격리된 PostgreSQL 통합 테스트 DB 운용 방식이 정해지지 않았다.

이 간극을 임시 문자열, 기존 검토 승인 결과 또는 운영 DB 수동 확인으로 대체하지 않는다.

## 구현 착수 게이트

다음 조건이 모두 충족되기 전에는 DB write route를 구현하지 않는다.

- 인증된 사용자 ID를 route에서 안전하게 얻는 방식 확정
- 최종 승인 권한명과 `401/403` 정책 확정
- validation source of truth와 freshness 기준 확정
- validation TTL 확정
- canonical JSON 규격과 SHA-256 test vector 승인
- validator/operation/transformer version 확정
- v1 scope가 `ALL_ITEMS`임을 재확인
- 격리 테스트 DB와 rollback/cleanup 정책 확정
- test runner 도입 또는 기존 검증 대안에 대한 별도 승인
- API 구현 및 DB write에 대한 사용자 명시 승인

선결 조건 문서에서 네 정책을 확정했으므로 현재 판정은 **별도 사용자 승인을 전제로 한 구현 GO 후보**다. 구현 착수 시 실제 server config, Docker test 환경과 test runner 승인 여부를 다시 확인한다.

## 구현 대상 파일 후보

### 필수 후보

| 파일 | 책임 |
| --- | --- |
| `app/api/sku-matching/draft-batch/[jobId]/final-approvals/route.ts` | 인증 문맥 획득, JSON parsing, service 호출, HTTP status/DTO 변환 |
| `src/services/sku-keyword-final-approval.service.ts` | Job/Item 재조회, validation 조정, hash manifest 생성, transaction과 artifact 생성 |
| `src/types/sku-keyword-final-approval.types.ts` | request, response, validation snapshot, scope, error code의 명시적 타입 |

### 분리 권장 후보

| 파일 | 책임 | 도입 기준 |
| --- | --- | --- |
| `src/services/sku-keyword-final-approval-validation.service.ts` | read-only Job/Item 구조 검증과 실행 전 재검증 | validation이 주 service와 독립 테스트 가능한 크기일 때 권장 |
| `src/utils/canonical-json.ts` | versioned canonicalization | 규격과 test vector 승인 후 생성 |
| `src/utils/domain-separated-hash.ts` | domain-separated SHA-256와 lowercase hex 검증 | 다른 승인/Worker에서도 동일 규격을 재사용할 때 권장 |
| `src/services/sku-keyword-final-approval.errors.ts` | 안정적인 오류 code와 HTTP mapping용 domain error | 오류 종류가 늘어날 때 분리 |

처음부터 하나의 거대한 service 파일에 parsing, validation, canonicalization, DB write와 HTTP mapping을 모두 넣지 않는다. 반대로 규격이 확정되기 전에 빈 abstraction 파일을 대량 생성하지도 않는다.

### 테스트 파일 후보

test runner가 승인된 뒤 다음 구조를 권장한다.

- `src/utils/canonical-json.test.ts`
- `src/services/sku-keyword-final-approval-validation.service.test.ts`
- `src/services/sku-keyword-final-approval.service.integration.test.ts`
- `app/api/sku-matching/draft-batch/[jobId]/final-approvals/route.test.ts`

현재 저장소에는 test runner와 test script가 없다. Vitest 등 새 dependency가 필요하면 설치를 별도 승인받고, 운영 DB가 아닌 격리 DB만 사용한다.

## 계층별 책임

### Route

route는 얇게 유지한다.

1. `context.params`에서 `jobId` 획득
2. 인증 주체와 최종 승인 권한 확인
3. JSON parsing 실패를 `400`으로 변환
4. strict request parser 호출
5. service에 `jobId`, 정규화된 body와 인증 주체 ID 전달
6. domain result/error를 정해진 HTTP status와 DTO로 변환
7. 내부 Prisma 오류, stack, payload와 hash input을 응답·로그에 노출하지 않음

route에서 Prisma transaction, hash 계산 또는 Job/Item update를 수행하지 않는다.

### Service

service는 application transaction 경계다.

- 요청 의미 검증
- Job과 전체 Item의 read model 조회
- read-only validation 서비스 조정
- canonical manifest 구성과 hash 계산
- ACTIVE/version 경쟁 제어
- Approval 헤더와 전체 Item manifest 원자적 생성
- 생성 결과 DTO용 domain result 반환

service는 `NextResponse`나 HTTP status를 알지 않는다.

### Type

다음 타입을 명시적으로 둔다.

- `SkuKeywordFinalApprovalCreateRequest`
- `SkuKeywordFinalApprovalScopeConfirmation`
- `SkuKeywordFinalApprovalCreateResponse`
- `SkuKeywordFinalApprovalErrorCode`
- `SkuKeywordFinalApprovalValidationSnapshotV1`
- `SkuKeywordFinalApprovalExecutionScopeV1`
- `SkuKeywordFinalApprovalHashSpecV1`
- `SkuKeywordFinalApprovalItemValidationResultV1`

DB JSON 필드에 저장하는 object는 일반 `Record<string, unknown>`로 끝내지 않고 schema version이 포함된 타입과 runtime validation을 함께 사용한다.

## 구현 순서

### 0단계: 착수 조건 확정

- 인증/권한 source 확인
- validation TTL과 warning/blocker 정책 확정
- operation/transformer version 확인
- canonical 규격과 fixture 승인
- 테스트 도구와 격리 DB 승인

완료 기준: 구현자가 추정해야 하는 `미정` 값이 없다.

### 1단계: 타입과 오류 계약

- request/response DTO 정의
- JSON snapshot과 hashSpec v1 타입 정의
- domain error code와 HTTP mapping 표 정의
- client `approvedBy`, 승인 시각과 임의 hash를 입력 계약에서 제외

완료 기준: route/service가 `as true` 또는 광범위한 type assertion 없이 계약을 사용할 수 있다.

### 2단계: strict request parser

- `confirmFinalApproval === true` 확인
- memo trim, 빈 문자열 null 처리와 길이 제한
- warning code 배열의 타입·중복·길이 제한
- `scopeConfirmation.mode === ALL_ITEMS`
- `expectedItemCount` 정수/범위 검증
- `expectedScopeHash`가 필요한 흐름이면 64자리 lowercase hex 검증
- 알 수 없는 필드 허용 여부를 명시하고 권장안은 거부

완료 기준: malformed body가 service/DB에 도달하지 않고 안정적인 `400`을 반환한다.

### 3단계: canonical JSON과 hash 유틸리티

- Node `crypto`의 SHA-256 사용
- `TMS_CANONICAL_JSON_V1` 구현
- domain separator 상수 정의
- UTF-8 bytes와 lowercase hex 출력 고정
- Date, Unicode, null, 배열, 숫자 규칙 구현
- object key 정렬과 허용하지 않는 값 검출
- test vector를 먼저 작성한 뒤 구현

완료 기준: 동일 의미의 입력은 key 삽입 순서와 무관하게 같은 hash를 만들고, 규격 fixture가 전부 통과한다.

### 4단계: server-side validation

- Job/Item read-only 조회
- Job 종류, module, `APPROVED` 확인
- 전체 Item 수와 `totalItems` 일치 확인
- 모든 Item이 `READY`이며 같은 Job 소속인지 확인
- requestPayload/candidate/dryRunItem 구조 검증
- blocked, stale, HIGH risk와 미확인 warning 계산
- 최신 내부 문맥과 before/after 비교
- operation/transformer 지원 여부 확인
- `canExecute`, itemResults, warning 집합과 만료 시각 생성

기존 `sku-keyword-draft-batch-approve.service.ts`의 parsing helper와 blocker 규칙을 참고할 수 있지만 그대로 복사해 정책이 갈라지게 하지 않는다. 공통 순수 함수를 추출할 경우 기존 동작 회귀 테스트를 먼저 둔다.

완료 기준: validation은 DB write 없이 deterministic result를 반환하고 하나의 Item이라도 불완전하면 전체를 거부한다.

### 5단계: manifest와 hash 구성

각 Item을 `jobItemId` 기준으로 정렬하고 다음 값을 만든다.

- `itemPayloadHash`
- `itemValidationHash`
- 전체 `payloadHash`
- `validationSnapshotHash`
- scope hash
- `validationSnapshot`
- `executionScope`
- `hashSpec`

`responsePayload`, attempt/error처럼 실행 후 변경되는 필드는 payload hash에서 제외한다. hash 대상 필드 목록은 코드 상수 또는 명시적 builder로 고정하며 객체 전체 spread로 암묵적으로 포함하지 않는다.

완료 기준: Item DB 조회 순서가 바뀌어도 전체 hash와 scope hash가 같다.

### 6단계: Prisma transaction

- validation 후보를 transaction 밖에서 준비하되 외부 변경 호출은 하지 않음
- transaction 안에서 Job과 `batchJobId=jobId` Item 전체 재조회
- validation 후보 생성 시점의 fingerprint와 현재 상태 비교
- ACTIVE artifact 선행 조회
- 최대 version 조회와 다음 version 계산
- 현재 transaction 데이터로 최종 manifest/hash 확정
- Approval 헤더 생성
- 전체 Approval Item 생성
- 생성 Item 수와 scope 집계 확인
- 하나라도 실패하면 전체 rollback

완료 기준: 성공 시 헤더 1행과 Job Item 수만큼 scope 행이 함께 존재하고, 실패 시 둘 다 존재하지 않는다.

### 7단계: 충돌과 오류 mapping

- 기존 ACTIVE: `409 ACTIVE_FINAL_APPROVAL_EXISTS`
- Job/Item 상태 또는 fingerprint 변경: `409 BATCH_STATE_CONFLICT`
- `(jobId, version)` 또는 partial unique 충돌: `409`
- validation/payload 실패: `422`
- Job 없음: `404`
- 예상하지 못한 오류: 민감정보 없는 `500`

Prisma `P2002`는 충돌한 target을 확인해 예상 가능한 unique만 `409`로 변환한다. `P2034` 또는 serialization/deadlock 계열은 제한적 retry 정책이 승인되기 전에는 retryable `409`로 반환한다. 모든 `P2002`를 ACTIVE 중복으로 오인하지 않는다.

완료 기준: route 응답에 constraint 이름, SQL, stack과 payload 원문이 포함되지 않는다.

### 8단계: Route 연결과 응답 DTO

- 권장 경로에 POST route 생성
- 인증 주체 확인 후 service 호출
- 성공 시 `201 Created`
- 실패 code별 HTTP status 매핑
- `executionStarted: false` 명시
- 전체 snapshot/payload가 아닌 hash와 Item 수 요약만 반환

완료 기준: route 성공만으로 Worker, adapter 또는 실행 API가 호출되지 않는다.

### 9단계: 검증과 리뷰

- unit/integration/route test
- 대상 파일 ESLint
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `npx.cmd tsc --noEmit`
- `git diff --check`
- 실제 변경 파일과 금지 범위 리뷰

운영 DB를 테스트 데이터 생성에 사용하지 않는다. 구현 적용과 실제 FinalApproval 생성 호출도 별도 승인으로 분리한다.

## Request validation 계획

권장 v1 body는 다음 형태다.

```json
{
  "confirmFinalApproval": true,
  "approvalMemo": "선택 입력",
  "acknowledgedWarnings": [],
  "scopeConfirmation": {
    "mode": "ALL_ITEMS",
    "expectedItemCount": 10,
    "expectedScopeHash": "선행 preview가 제공한 값"
  }
}
```

### parser 정책

- body가 object가 아니면 거부
- `confirmFinalApproval`이 literal true가 아니면 거부
- `approvedBy`, `finalApprovedAt`, `approvalSource`, `version`, `status` 입력은 거부
- memo 후보 최대 길이는 구현 전 확정
- warning code는 trim한 non-empty 문자열만 허용하고 정렬·중복 제거
- 알 수 없는 warning은 server validation 결과와 대조해 `422`
- v1에서 Item ID 선택 배열이나 `PARTIAL_ITEMS`는 거부
- expected count/hash가 다르면 stale confirmation으로 `409`

runtime schema library를 새로 도입하지 않는다면 작은 수동 parser를 작성하고 exhaustive test를 둔다. Zod 등 dependency를 도입하려면 별도 승인받는다.

## Server-side validation 계획

### Job

- 존재 여부
- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- `status === APPROVED`
- Item 1개 이상
- `totalItems === items.length`
- 유효한 ACTIVE 승인 없음

### Item

- `batchJobId === job.id`
- 모두 `READY`
- 허용된 targetType과 non-empty targetId/storeId/operation
- requestPayload가 object
- candidate와 dryRunItem 존재
- dryRunItem executable true, blockedReasons empty, HIGH risk 아님
- before/after 필수 변경값 완전
- candidate NEEDS_CONTEXT와 금지 fallback 없음
- 지원되는 operation/transformer version

### Snapshot

- 서버가 `validatedAt`과 `expiresAt` 생성
- validator와 policy version 기록
- 전체 Item 결과 포함
- blocked/stale/highRisk count 0
- warning 확인 집합 기록
- `canExecute=true`
- scalar `validationExpiresAt`과 JSON `expiresAt` 동일

validation 실패 시 어떤 artifact 행도 만들지 않는다.

## Transaction 계획

### isolation 후보

권장 후보는 Prisma interactive transaction의 `Serializable`이다. 실제 Prisma 7.8.0과 adapter-pg 조합에서 option 지원과 오류 code를 격리 DB로 검증한 뒤 확정한다.

대안은 같은 Job 승인 요청을 직렬화하는 명시적 DB lock이지만 raw SQL이 필요할 수 있으므로 별도 승인 없이 도입하지 않는다. DB partial unique는 어떤 선택에서도 최종 불변식으로 유지한다.

### transaction 내부 불변식

- Job/Item은 read-only
- ACTIVE 없음
- Job별 version 유일
- 모든 scope Item이 같은 Job 소속
- Approval Item 수가 Job Item 수와 동일
- v1의 모든 scope Item이 included
- validation이 만료되지 않음
- 저장 JSON과 hash가 같은 builder 결과

### rollback 기준

- Job/Item 상태 또는 updatedAt/fingerprint 변경
- Item 수 변경
- validation 만료
- ACTIVE/version unique 충돌
- Approval Item insert 일부 실패
- 생성 수 또는 scope/hash 재검증 불일치
- serialization/deadlock 오류

rollback 후 Job/Item 상태를 보정하거나 재저장하지 않는다.

## Hash 구현 계획

### 고정 상수

- algorithm: `SHA-256`
- encoding: `lowercase-hex`
- canonicalization: `TMS_CANONICAL_JSON_V1`
- payload domain: `NAVER_API_BATCH_FINAL_APPROVAL_PAYLOAD_V1`
- validation domain: `NAVER_API_BATCH_FINAL_APPROVAL_VALIDATION_V1`
- item payload domain: `NAVER_API_BATCH_FINAL_APPROVAL_ITEM_PAYLOAD_V1`
- item validation domain: `NAVER_API_BATCH_FINAL_APPROVAL_ITEM_VALIDATION_V1`
- scope domain: `NAVER_API_BATCH_FINAL_APPROVAL_SCOPE_V1`

### 구현 API 후보

```text
canonicalizeJson(value) -> string
sha256DomainHash(domain, value) -> 64자리 lowercase hex
buildItemPayloadManifest(item, versions) -> canonical object
buildItemValidationManifest(result) -> canonical object
buildApprovalPayloadManifest(job, itemHashes) -> canonical object
buildScopeManifest(items) -> canonical object
```

구현 시 입력 object를 mutation하지 않고, hash 직전과 DB JSON 저장에 같은 immutable builder 결과를 사용한다.

### 필수 test vector

- object key 순서 차이
- 중첩 object와 배열
- Unicode 한글과 조합 문자 정책
- null/boolean/string/정수
- 음수, 소수와 허용하지 않는 비정상 숫자
- UTC Date 직렬화
- `undefined`와 지원하지 않는 타입 거부
- domain이 다르면 같은 JSON도 hash가 다름
- digest 길이와 문자 집합

## Response DTO 계획

### 성공 `201`

- `ok: true`
- `jobId`
- `finalApproval.id`
- `version`, `status`
- `finalApprovedAt`, `finalApprovedBy`
- `validationExpiresAt`
- `itemCount`, `includedItemCount`
- `payloadHash`, `validationSnapshotHash`, `scopeHash`
- `executionStarted: false`

### 실패

| HTTP | code | 대표 조건 |
| --- | --- | --- |
| `400` | `FINAL_APPROVAL_CONFIRMATION_REQUIRED` | confirm 누락/false |
| `400` | `INVALID_FINAL_APPROVAL_REQUEST` | malformed body |
| `401` | `AUTHENTICATION_REQUIRED` | 인증 없음 |
| `403` | `FINAL_APPROVAL_FORBIDDEN` | 권한 없음 |
| `404` | `BATCH_JOB_NOT_FOUND` | Job 없음 |
| `409` | `ACTIVE_FINAL_APPROVAL_EXISTS` | 기존 ACTIVE/partial unique 충돌 |
| `409` | `BATCH_STATE_CONFLICT` | Job/Item 상태 또는 fingerprint 변경 |
| `409` | `FINAL_APPROVAL_VERSION_CONFLICT` | version 경쟁 |
| `422` | `FINAL_APPROVAL_VALIDATION_FAILED` | blocker/stale/risk/warning |
| `422` | `INCOMPLETE_BATCH_PAYLOAD` | payload 불완전 |
| `500` | `FINAL_APPROVAL_CREATE_FAILED` | 예상 밖 오류 |

실패 DTO에는 `code`, 안전한 `message`, 필요한 최소 `details`만 둔다.

## 테스트 계획

### Unit

- strict request parser
- canonical JSON fixture
- domain-separated hash fixture
- item/payload/scope manifest 정렬
- validation helper의 blocker와 warning 계산
- Prisma 오류에서 domain error mapping

### Service integration

- 정상 `APPROVED` Job + 전체 `READY` Item 생성 성공
- confirm 누락은 transaction 진입 전 실패
- Job 없음
- DRAFT Job 거부
- READY Item 없음 또는 일부 상태 불일치
- blocked Item 존재
- malformed requestPayload/candidate/dryRunItem
- ACTIVE artifact 중복
- 동시에 두 요청을 보내 partial unique 충돌
- 동시에 version 계산 충돌
- Item 생성 중 실패 시 전체 rollback
- 생성 전후 Job/Item status, dryRun, updatedAt과 payload 미변경
- 다른 Job Item이 Approval scope에 들어가지 않음
- validation 만료와 stale fingerprint 실패

### Route

- JSON parsing 오류
- `400/401/403/404/409/422/500` mapping
- 성공 `201` DTO
- 내부 Prisma 오류/stack 비노출
- 인증 주체가 service로 전달되고 body approvedBy가 사용되지 않음

### 비실행 회귀

- 네이버 API client/adapter mock 호출 0회
- Worker/Scheduler 호출 0회
- 실행 API 호출 0회
- Job/Item `EXECUTING` 전환 0건
- 가격·재고·키워드 운영 반영 0건

### 검증 환경

- unit test는 DB 없이 수행
- partial unique, Serializable, rollback test는 격리 PostgreSQL 사용
- 운영 NAS DB에는 test fixture를 쓰지 않음
- test DB migration 적용과 cleanup 절차를 별도 문서화

## 구현 PR 분할 권장

위험을 줄이기 위해 다음 순서를 권장한다.

1. 타입, canonical JSON/hash와 unit test
2. read-only validation service와 unit test
3. FinalApproval service transaction과 격리 DB integration test
4. 인증 연결과 POST route/route test
5. 문서·검증 결과와 운영 호출 금지 확인

각 단계는 독립 리뷰가 가능해야 한다. 실제 운영 DB에서 FinalApproval을 생성하는 호출은 코드 배포와도 분리해 별도 승인받는다.

## 구현 중 금지 범위

- 네이버 API client/adapter 호출 또는 요청 코드 추가
- Worker, Scheduler와 실행 API 구현
- Job/Item `EXECUTING` 전환
- Job `APPROVED` 또는 Item `READY` 상태 변경
- Job `dryRun`, 기존 `approvedAt/approvedBy` 변경
- 기존 requestPayload, candidate, dryRunItem, preview 수정
- blocked Item 자동 제외 또는 부분 승인
- ACTIVE artifact update/덮어쓰기
- Prisma schema 수정과 migration 생성·적용
- 운영 DB test fixture 또는 수동 SQL write
- manual-apply, keyword-apply, staging-import/apply 실행
- 가격·재고·키워드 실제 반영

## 구현 완료 판정

다음 조건을 모두 만족해야 구현 완료 후보로 본다.

- route/service/type 책임 분리
- 인증된 주체만 최종 승인 가능
- validation과 hash 규격 test 통과
- 전체 Item scope만 원자적으로 생성
- ACTIVE/version race test 통과
- rollback 후 orphan/부분 scope 없음
- Job/Item/payload 불변 확인
- 모든 HTTP 오류 mapping 확인
- Prisma validate/generate, TypeScript, ESLint 통과
- 격리 PostgreSQL integration test 통과
- 네이버 API/Worker/실행 상태 변경 없음 확인
- 코드 리뷰와 실제 운영 호출 전 별도 사용자 승인

## 결론

구현은 얇은 POST route, 명시적 type, read-only validation, versioned canonical hash와 하나의 Serializable 후보 transaction으로 분리한다. DB partial unique와 애플리케이션 검증을 함께 사용하고, 모든 실패는 전체 rollback하며 기존 Job/Item 상태를 바꾸지 않는다.

현재 가장 중요한 선결 조건은 인증 주체, 재검증 source, canonical 규격과 테스트 환경 확정이다. 이를 임시 값으로 우회하면 최종 승인 artifact가 실행 권한의 신뢰 원본 역할을 할 수 없다.

**이 문서는 구현 계획일 뿐 API 구현이나 DB write 승인이 아니다. 실제 route/service/type/test 생성은 별도 명시 승인 후에만 진행한다.**
