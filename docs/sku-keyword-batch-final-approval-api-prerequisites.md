# SKU Keyword Matching 최종 승인 artifact API 구현 선결 조건 확정

## 문서 목적

이 문서는 최종 승인 artifact 생성 API 구현 계획에서 `NO-GO`로 남겨 둔 인증 주체, 서버 재검증, canonical hash와 격리 PostgreSQL 테스트 환경의 MVP 결정을 고정한다.

관련 문서는 다음과 같다.

- [최종 승인 artifact 생성 API 설계](./sku-keyword-batch-final-approval-api-design.md)
- [최종 승인 artifact 생성 API 구현 계획](./sku-keyword-batch-final-approval-api-implementation-plan.md)
- [실행 전 재검증 설계](./sku-keyword-batch-pre-execution-validation-design.md)

이 문서가 앞선 문서의 미정 후보와 충돌하면 이 문서의 MVP 확정값을 우선한다. 정책 변경은 상수만 조용히 바꾸지 않고 새 schema/policy version과 재승인 영향 분석을 거친다.

이번 작업은 문서 작성만 수행한다. API, 인증, validation, hash, test container와 DB write를 구현하거나 실행하지 않는다.

## 결정 요약

| 항목 | MVP 확정값 | 상태 |
| --- | --- | --- |
| 승인 주체 | server-only 고정 system principal | 확정 |
| 재검증 source | DB에 저장된 `NAVER_PRODUCT_COLLECTION` 문맥, 24시간 이내 | 확정 |
| validation TTL | 생성 시각부터 10분 | 확정 |
| canonical hash | SHA-256 + `TMS_CANONICAL_JSON_V1` | 확정 |
| hashSpec version | `1` | 확정 |
| 통합 테스트 DB | 로컬 일회성 PostgreSQL 18 Docker container | 확정 |
| 운영 DB 통합 테스트 | 금지 | 확정 |

이 결정으로 **코드 구현은 별도 명시 승인을 전제로 GO 후보**가 된다. 운영 환경에서 endpoint 활성화, 실제 FinalApproval 생성 호출과 이후 실행 기능은 여전히 별도 승인 대상이다.

## 1. 인증 주체 결정

### 현재 제약

현재 저장소에는 로그인 session에서 안정적인 사용자 ID와 최종 승인 권한을 제공하는 공통 인증 계층이 확인되지 않았다. 기존 `approvedBy` 문자열 입력 방식을 최종 실행 권한에 재사용하면 호출자가 승인자를 임의로 위조할 수 있다.

### MVP 결정

MVP는 **server-only 고정 system principal**을 사용한다.

- 설정 이름 후보: `FINAL_APPROVAL_ACTOR_ID`
- 값 형식: `system:<stable-id>`
- 초기 운영값 예시: `system:tms-mvp-final-approval`
- 저장 위치: 서버 전용 환경 설정
- 기본 동작: 설정 누락 또는 형식 오류 시 endpoint fail-closed
- `finalApprovedBy`: 검증된 서버 설정값만 저장
- `approvalSource`: `TMS_FINAL_APPROVAL_API_V1` 고정
- `finalApprovedAt`: 서버 UTC 시각

실제 환경 설정값은 문서, 응답과 로그에 출력하지 않는다.

### body의 `approvedBy` 정책

- 권장 request body에서 `approvedBy`를 제외한다.
- client가 `approvedBy`, `finalApprovedAt`, `approvalSource`를 보내면 알 수 없는/금지 필드로 `400` 처리한다.
- memo, header, query parameter 또는 표시명을 승인자 source로 사용하지 않는다.
- body의 값과 서버 주체가 같더라도 body 값을 저장하지 않는다.

### endpoint 활성화 정책

고정 system principal은 실제 인간 사용자를 식별하지 못한다. 따라서 MVP endpoint는 다음 조건이 없으면 활성화하지 않는다.

- server-only feature flag 후보 `FINAL_APPROVAL_API_ENABLED=true`
- 운영자가 관리하는 내부 TMS 배포 경계에서만 접근 가능
- 설정 누락 시 `503 FINAL_APPROVAL_NOT_CONFIGURED` 또는 동등한 fail-closed 응답
- 외부 공개 endpoint로 노출하지 않음
- 실제 호출 전 별도 운영 승인

같은 환경을 여러 사람이 사용하면 system principal만으로 개인 감사가 불가능하다. 이 제한을 운영 문서에 명시하고 로그인 도입 전 다중 사용자 승인을 허용하지 않는다.

### 로그인 도입 이후 확장

`finalApprovedBy`는 String이므로 migration 없이 namespace를 확장한다.

- MVP: `system:<stable-id>`
- 로그인 사용자: `user:<immutable-user-id>`
- 서비스 계정: `service:<immutable-service-id>`

로그인 도입 후에는 system principal fallback을 자동 사용하지 않는다. 인증 주체와 `final_approval:create` 같은 명시 권한을 모두 요구하고, 기존 artifact는 당시 principal을 그대로 보존한다.

## 2. 서버 재검증 기준 결정

### 재검증 범위

MVP FinalApproval 생성은 네이버 API를 호출하지 않는다. persisted DB 문맥과 저장된 Batch snapshot을 read-only로 재검증한다.

허용 source는 다음 하나로 고정한다.

```text
NAVER_PRODUCT_COLLECTION
```

`UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW`, null, 빈 값과 알 수 없는 source는 최종 승인에서 hard blocker다. 검토 승인 단계의 warning 확인으로 이 제한을 우회할 수 없다.

### freshness

- 각 Item candidate의 `currentStateSyncedAt` 필수
- 유효한 UTC 시각이어야 함
- `validatedAt - currentStateSyncedAt <= 24시간`
- 미래 시각은 clock skew 허용치 확정 전까지 거부
- 24시간을 초과하면 `CURRENT_CONTEXT_STALE` blocker

24시간은 persisted collection freshness의 MVP 상한이다. validation artifact 자체의 TTL과 혼동하지 않는다.

### validation 시각과 만료

- `validatedAt`: 서버 UTC 시각 한 번을 전체 Job validation에 사용
- `validationExpiresAt`: `validatedAt + 10분`
- snapshot `expiresAt`과 scalar `validationExpiresAt`은 동일
- insert 직전 만료 여부 재확인
- 향후 Worker도 선점 직전에 만료 재확인

10분이 지난 artifact는 status가 ACTIVE여도 실행 권한으로 사용할 수 없다. 자동으로 status를 변경하는 Scheduler는 이번 범위가 아니다.

### Job 허용 조건

- Job 존재
- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- `status === APPROVED`
- Item 1개 이상
- `totalItems === 실제 조회 Item 수`
- 유효한 ACTIVE FinalApproval 없음
- v1 scope는 `ALL_ITEMS`

Job `dryRun=true`와 기존 `approvedAt/approvedBy=null`은 허용한다. FinalApproval artifact가 별도 실행 권한 source이므로 이 필드를 변경하거나 권한 근거로 사용하지 않는다.

### Item 허용 조건

- `batchJobId === job.id`
- 모든 Item `status === READY`
- targetType은 `SINGLE`, `OPTION`, `ADDITIONAL` 중 하나
- `targetId`, `storeId`, `operation` non-empty
- operation은 `UPDATE_PRICE`, `UPDATE_STOCK`, `UPDATE_PRICE_AND_STOCK` 중 하나
- `previewBefore`, `previewAfter` object 필수
- `requestPayload` object 필수
- `requestPayload.candidate` object 필수
- `requestPayload.dryRunItem` object 필수
- `dryRunItem.executable === true`
- `dryRunItem.blockedReasons` empty
- `dryRunItem.riskLevel !== HIGH`
- changeType에 필요한 before/after 값 존재
- candidate `status !== NEEDS_CONTEXT`
- current price/stock 누락 risk·issue 없음
- optionValue fallback 매칭 아님
- server가 재계산한 미확인 warning 없음

하나라도 실패하면 전체 Job의 FinalApproval을 생성하지 않는다. 실패 Item을 자동 제외하지 않는다.

### persisted current-state 비교

targetType에 따라 DB의 현재 상태 row를 다시 읽고 다음을 비교한다.

- Item target 식별자와 조회 대상 일치
- candidate의 current price/stock과 DB current value 일치
- `previewBefore`/`dryRunItem.before`와 DB current value 일치
- 저장된 계산 근거로 재계산한 after와 `previewAfter`/`dryRunItem.after` 일치
- SKU, bundle component와 quantity 근거 일치

필수 row가 없거나 어떤 값이 source of truth인지 결정할 수 없으면 `VALIDATION_CONTEXT_UNAVAILABLE`로 거부한다. 값을 자동 보정하거나 최신값으로 payload를 덮어쓰지 않는다.

### validation snapshot version

- `schemaVersion`: `1`
- `validatorVersion`: `SKU_KEYWORD_FINAL_APPROVAL_VALIDATOR_V1`
- `payloadContractVersion`: `SKU_KEYWORD_FINAL_APPROVAL_PAYLOAD_V1`
- `warningPolicyVersion`: `SKU_KEYWORD_FINAL_APPROVAL_WARNING_V1`
- `canExecute`: 위 정책 아래 artifact 생성 가능 여부

`canExecute=true`는 네이버 API 요청 변환과 외부 실행 성공을 보장하지 않는다. Worker/transformer는 별도 승인 후 이 payload contract를 지원하는지 다시 확인해야 한다.

### 기존 APPROVED Batch

- migration 적용 전에 존재한 APPROVED Batch에 artifact를 자동 생성하지 않는다.
- backfill하지 않는다.
- 동일한 API 검증을 현재 데이터로 통과하고 사용자가 새 최종 승인을 명시한 경우에만 version 1을 생성할 수 있다.
- 현재 persisted context가 24시간을 초과했거나 payload가 구버전이면 승인하지 않고 새 preview/수집 흐름을 요구한다.

## 3. Canonical hash 규격 결정

### 기본 규격

- algorithm: SHA-256
- digest encoding: lowercase hexadecimal
- digest length: 정확히 64 ASCII 문자
- text encoding: UTF-8
- canonicalization: `TMS_CANONICAL_JSON_V1`
- `hashSpec.schemaVersion`: `1`

`TMS_CANONICAL_JSON_V1`은 RFC 8785 JSON Canonicalization Scheme의 object key 정렬과 JSON primitive 직렬화 원칙을 기반으로 한다. Prisma/JavaScript 전용 값은 먼저 아래 projection 규칙으로 JSON value로 변환한다.

### 허용 타입과 projection

| 입력 | canonical projection |
| --- | --- |
| null | null 보존 |
| boolean | JSON boolean |
| string | 문자열 보존, 임의 trim/NFC 정규화 없음 |
| safe integer Number | JSON number |
| Date | `toISOString()`의 UTC millisecond 문자열 |
| Prisma Decimal | exponent 없는 정규화 decimal 문자열 |
| BigInt | 부호가 포함된 base-10 문자열 |
| plain object | key별 재귀 projection 후 정렬 |
| array | 입력 순서 보존 후 element 재귀 projection |

다음 값은 거부한다.

- `undefined`
- NaN, Infinity, -Infinity
- safe integer 범위를 벗어난 Number
- function, symbol
- plain object가 아닌 임의 class instance
- sparse array와 지원하지 않는 binary 값

optional 필드는 builder 단계에서 명시적으로 null을 넣거나 manifest에서 규격상 제외한다. `undefined`를 조용히 누락하지 않는다.

### Decimal과 BigInt 문자열

- Decimal: `+` 기호 없음, 불필요한 선행 0 없음, 소수부 후행 0 제거, `-0`은 `0`, exponent 금지
- BigInt: base-10, `+` 기호와 불필요한 선행 0 없음, `-0` 없음
- manifest schema가 필드 타입을 고정하므로 일반 문자열과 의미가 혼동되지 않는다.

### object key와 문자열

- object key는 RFC 8785 방식의 UTF-16 code unit lexicographic order
- raw JSON text를 직접 hash하지 않고 server manifest builder가 허용 필드로 만든 plain object만 canonicalize
- 문자열은 Unicode normalization을 수행하지 않고 원래 code point sequence를 UTF-8로 인코딩
- JSON escape는 RFC 8785/ECMAScript JSON serialization 규칙 사용

### 배열 순서

일반 배열은 의미 있는 입력 순서를 보존한다. 집합이나 DB 조회 결과는 manifest builder가 canonicalization 전에 정렬한다.

- Job Item manifest: `jobItemId` 오름차순
- validation itemResults: `jobItemId` 오름차순
- scope rows: `jobItemId` 오름차순
- warning code: 중복 제거 후 code 오름차순
- blocker reason: stable code 오름차순, 사용자 message는 hash 원본에서 제외하거나 code에 종속

DB의 기본 row 순서나 `createdAt` 동률 순서에 의존하지 않는다.

### domain separation

hash byte input은 다음 형식으로 고정한다.

```text
UTF8(<domain> + "\n" + <canonical-json>)
```

domain 상수는 다음과 같다.

- `NAVER_API_BATCH_FINAL_APPROVAL_PAYLOAD_V1`
- `NAVER_API_BATCH_FINAL_APPROVAL_VALIDATION_V1`
- `NAVER_API_BATCH_FINAL_APPROVAL_ITEM_PAYLOAD_V1`
- `NAVER_API_BATCH_FINAL_APPROVAL_ITEM_VALIDATION_V1`
- `NAVER_API_BATCH_FINAL_APPROVAL_SCOPE_V1`

domain string에는 공백, null byte와 가변 suffix를 허용하지 않는다.

### hashSpec 확정값

```json
{
  "schemaVersion": "1",
  "algorithm": "SHA-256",
  "encoding": "lowercase-hex",
  "canonicalization": "TMS_CANONICAL_JSON_V1",
  "payloadDomain": "NAVER_API_BATCH_FINAL_APPROVAL_PAYLOAD_V1",
  "validationDomain": "NAVER_API_BATCH_FINAL_APPROVAL_VALIDATION_V1",
  "itemPayloadDomain": "NAVER_API_BATCH_FINAL_APPROVAL_ITEM_PAYLOAD_V1",
  "itemValidationDomain": "NAVER_API_BATCH_FINAL_APPROVAL_ITEM_VALIDATION_V1",
  "scopeDomain": "NAVER_API_BATCH_FINAL_APPROVAL_SCOPE_V1"
}
```

### hash 대상 필드

#### `itemPayloadHash`

- manifest schemaVersion/payloadContractVersion
- jobId, jobItemId, batchJobId
- storeId, channelId
- targetType, targetId, operation
- calculationType
- internalSkuCode, legacyStockCode, barcode
- skuLookupKeys, bundleComponents
- calculatedCost를 정규화한 Decimal string
- calculatedStock
- previewBefore, previewAfter
- requestPayload.candidate
- requestPayload.dryRunItem

`responsePayload`, status, attemptCount, errorCode/errorMessage, createdAt/updatedAt은 제외한다.

#### `itemValidationHash`

- schema/validator/warning policy version
- jobId, jobItemId
- validatedAt, expiresAt
- currentStateSource, currentStateSyncedAt
- normalized current-state 비교 근거
- blocker/stale/risk 결과 code
- warning code와 확인 여부
- `canExecute`

#### `payloadHash`

- schemaVersion/payloadContractVersion
- jobId, jobType, module
- `jobItemId`로 정렬한 `{jobItemId, itemPayloadHash}` 전체 manifest

#### `validationSnapshotHash`

- DB에 저장할 `validationSnapshot` 전체
- snapshot object를 만든 뒤 같은 object를 canonicalize하고 hash하며 별도 재구성하지 않음

#### scope hash

- schemaVersion/mode
- `jobItemId`로 정렬한 `{jobItemId, included, excludedReason}` 전체 manifest
- v1은 모든 `included=true`, `excludedReason=null`

### test vector 승인 기준

구현 PR에는 canonical string과 예상 digest가 고정된 fixture를 포함해야 한다.

- key 삽입 순서가 다른 동일 object
- 한글/Unicode 문자열
- null과 optional field
- Date UTC millisecond
- Decimal/BigInt projection
- array 순서 변경
- domain 변경
- undefined/비정상 number 거부

fixture가 승인되기 전 DB write service를 merge하지 않는다.

## 4. 격리 테스트 PostgreSQL DB 결정

### 환경

- PostgreSQL major: 18
- 실행 방식: 로컬 Docker container
- bind address: `127.0.0.1`만 허용
- DB 이름: `naver_sku_manager_final_approval_test`
- DB 사용자: test-only 계정
- storage: test run 전용 임시 volume
- connection variable: `TEST_DATABASE_URL`

운영 NAS host와 운영 DB `naver_sku_manager`는 integration test에 사용하지 않는다.

### 안전 guard

test bootstrap은 연결 전에 URL을 parse해 다음을 모두 확인한다.

- host가 `127.0.0.1` 또는 `localhost`
- database가 정확히 `naver_sku_manager_final_approval_test`
- 운영 NAS host가 아님
- `DATABASE_URL`과 문자열이 같지 않음
- production mode가 아님
- test-only 확인 flag가 있음

하나라도 실패하면 test를 시작하지 않는다. URL, password와 전체 connection string을 로그에 출력하지 않는다.

### 생성과 초기화

1. PostgreSQL 18 container를 test 전용 임시 volume으로 시작
2. health check 통과 대기
3. 현재 저장소 migration을 `prisma migrate deploy`로 **test DB에만** 적용
4. `prisma migrate status`로 test schema 최신 상태 확인
5. test factory로 각 test가 필요한 최소 Job/Item만 생성

운영 `.env`의 `DATABASE_URL`을 수정하지 않는다. test process 안에서 guard를 통과한 `TEST_DATABASE_URL`만 Prisma test client에 전달한다.

### Seed

- SQL dump나 운영 데이터 복사 금지
- random UUID와 명시적 fixture builder 사용
- 정상 APPROVED/READY, malformed, blocked, ACTIVE 중복 fixture를 각각 독립 생성
- 비밀번호, 실제 판매자/상품/사용자 정보 사용 금지
- seed는 test code가 소유하고 반복 실행 가능해야 함

### Cleanup

- 각 test는 자신이 만든 ID만 사용
- unit test는 DB 미사용
- integration suite 종료 후 container와 임시 volume 제거
- 실패 시에도 `finally`/test teardown에서 제거 시도
- 운영 DB cleanup 명령 실행 금지
- `prisma migrate reset`에 의존하지 않음

동시성 test는 여러 connection이 필요하므로 하나의 outer transaction rollback만으로 격리하지 않는다. 각 case는 고유 Job ID를 사용하고 suite 종료 시 container 자체를 폐기한다.

### 도구 가용성

Docker가 설치되지 않았거나 PostgreSQL 18 image를 준비할 수 없으면 integration test는 NO-GO다. 설치·image download·container 생성은 코드 구현 작업과 분리해 별도 승인받는다.

## 5. 구현 GO / NO-GO 기준

### 문서상 판정

다음 네 정책은 이 문서에서 확정되었다.

- server-only MVP principal
- persisted authoritative context 기반 재검증
- versioned canonical SHA-256
- 운영과 분리된 일회성 PostgreSQL 18 test DB

따라서 **코드 구현은 별도 사용자 승인 후 GO 후보**다.

### 구현 착수 시 재확인

- Git 작업 트리 clean
- 이 문서와 구현 계획이 최신 커밋에 포함됨
- actor/feature flag 이름 최종 확인
- Docker/PostgreSQL 18 test 환경 준비 승인
- test runner dependency 승인
- validation fixture와 hash test vector 리뷰 계획
- API 구현·test DB write 범위에 대한 사용자 명시 승인

하나라도 충족하지 않으면 구현 NO-GO를 유지한다.

### 구현 완료 후에도 별도 승인인 항목

- 운영 환경 feature flag 활성화
- 운영 DB에 실제 FinalApproval artifact 생성 요청
- 무효화·재승인 API
- Worker, Scheduler와 실행 API
- `EXECUTING` 전환
- 네이버 API 호출과 실제 가격·재고·키워드 반영

## 금지 사항

- client body의 승인자를 권한 source로 사용
- source가 upload preview/unknown인 Item 최종 승인
- stale/malformed/blocked Item 자동 제외
- 기존 APPROVED Batch 자동 backfill
- hash 규격 미확정 상태의 DB write
- 운영 NAS DB에서 integration test
- test URL과 운영 URL guard 생략
- 네이버 API 호출
- Worker, Scheduler와 실행 API 구현
- Job/Item status 변경
- `EXECUTING` 전환
- 가격·재고·키워드 실제 반영
- 기존 payload 자동 보정

## 결론

MVP는 로그인 대신 server-only system principal을 사용하되 다중 사용자 환경에는 노출하지 않는다. FinalApproval은 최근 24시간 이내 `NAVER_PRODUCT_COLLECTION` persisted context와 완전한 APPROVED/READY payload만 허용하며, validation은 10분 동안만 유효하다.

모든 승인 근거는 `TMS_CANONICAL_JSON_V1`과 domain-separated SHA-256으로 고정하고, transaction·partial unique·rollback은 운영 NAS와 완전히 분리된 일회성 PostgreSQL 18 container에서 검증한다.

**이 문서로 네 가지 설계 선결 조건은 확정되었지만, 실제 코드 구현·test 환경 생성·DB write와 운영 endpoint 활성화는 각각 별도 명시 승인 후에만 진행한다.**
