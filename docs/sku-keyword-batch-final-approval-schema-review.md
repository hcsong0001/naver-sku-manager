# SKU Keyword Matching 최종 승인 artifact 스키마 필요성 검토

> 별도 모델 권장 후보의 필드·관계·제약·불변성·무효화·migration 상세안은 [최종 승인 artifact schema 변경안 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)를 참고한다. 실제 변경 착수 전 승인 조건은 [schema 변경 전 체크리스트](./sku-keyword-batch-final-approval-schema-change-checklist.md)에서 확인한다.

## 문서 목적

이 문서는 SKU Keyword Matching Batch의 실행 직전 최종 승인 artifact를 안전하게 보존하기 위해 현재 Prisma 모델만으로 충분한지, schema 변경이 필요한지를 검토한다.

이번 단계에서는 후보 모델과 필드를 문서로만 제안한다. `prisma/schema.prisma` 수정, migration 생성, DB write, 승인 API, Worker 또는 네이버 API 호출을 구현하지 않는다.

## 검토 결론 요약

- 현재 모델의 `metadata Json?` 또는 기존 Item payload에 최종 승인 정보를 기술적으로 넣을 수는 있다.
- 그러나 실행 권한의 근거로 필요한 불변성, 승인 이력, Item 범위, 참조 무결성, 중복 승인 방지를 충분히 보장하기 어렵다.
- `NaverApiBatchJob`에 필드를 직접 추가하면 단일 최신 승인에는 단순하지만 재승인과 부분 실행 이력이 Job의 mutable 상태에 섞인다.
- **별도 최종 승인 헤더 모델과 Item 범위 모델**이 현재 가장 강한 schema 후보안이다.
- 다만 `dryRun` A/B/C안, 최종 승인 lifecycle, 승인 만료·무효화 정책을 먼저 확정해야 실제 schema를 결정할 수 있다.
- 현재 결론은 **구현 보류, schema 변경안 별도 승인 필요**이다.

## 확인한 현재 Prisma 모델

### `NaverApiBatchJob`

관련 필드:

- `id`
- `jobType`, `module`
- `status`
- `dryRun`
- `previewSummary Json?`
- `metadata Json?`
- `approvedBy String?`
- `approvedAt DateTime?`
- `executedAt DateTime?`
- `createdAt`, `updatedAt`
- Item relation

현재 `approvedAt`, `approvedBy`는 한 번의 승인 문맥만 표현한다. 최종 승인 범위, 재검증 snapshot, payload hash, 제외 Item, 승인 source, memo, 만료와 재승인 이력을 구조적으로 표현하지 못한다.

### `NaverApiBatchJobItem`

관련 필드:

- `id`, `batchJobId`
- `storeId`, `channelId`, `channelProductNo`
- `targetType`, `targetId`, `operation`
- `previewBefore`, `previewAfter`
- `requestPayload`, `responsePayload`
- `status`, `attemptCount`
- 오류 정보와 call log relation

Item에는 최종 승인 포함/제외 여부, 제외 사유, 승인 당시 Item payload hash, 승인 artifact relation이 없다.

### `NaverApiCallLog`

API 호출의 요청/응답, 상태, 오류, 시각, 시도 횟수, `idempotencyKey`를 기록한다. 이는 실행 감사 로그이며 실행 전 권한을 부여하는 승인 artifact와 책임이 다르다.

## 필요한 정보의 현재 저장 가능성

| 정보 | 기존 컬럼 | JSON 저장 가능성 | 실행 권한 근거로서의 한계 |
| --- | --- | --- | --- |
| `finalApprovedAt` | `approvedAt` 재사용 가능 | 가능 | 검토 승인과 최종 승인의 의미 충돌, 재승인 이력 없음 |
| `finalApprovedBy` | `approvedBy` 재사용 가능 | 가능 | 승인 종류와 버전 구분 없음 |
| `finalApprovalMemo` | 없음 | `metadata` 가능 | 타입·길이·검색 제약 없음 |
| `validationSnapshot` | 없음 | `metadata` 가능 | snapshot 버전·불변성·참조가 약함 |
| `payloadHash` | 없음 | `metadata` 가능 | unique/index/형식 제약 없음 |
| `executionScope` | 없음 | `metadata` 가능 | Item FK와 범위 무결성 없음 |
| `excludedItemIds` | 없음 | JSON 배열 가능 | Item 존재·소속·중복을 DB가 보장하지 못함 |
| `approvalSource` | 없음 | `metadata` 가능 | 허용값·검색·감사 제약 없음 |
| immutable artifact | 없음 | JSON만으로 불충분 | Job/payload update 시 과거 승인 근거가 변할 수 있음 |

기존 모델은 정보를 담는 그릇으로는 사용할 수 있지만, 외부 변경 권한을 부여하는 불변 artifact로는 제약이 부족하다.

## 저장 방식 1: `NaverApiBatchJob` 필드 확장

Job에 `finalApprovedAt`, `finalApprovedBy`, `finalApprovalMemo`, `payloadHash`, `executionScope`, `validationSnapshot` 등을 직접 추가하는 방식이다.

### 장점

- 조회와 Worker 실행 자격 확인이 단순함
- 기존 Job relation과 status 흐름을 그대로 사용 가능
- 공통 verifier에서 한 모델만 확인하면 됨
- 선택지 A처럼 기존 Job을 `dryRun=false`로 전환할 때 구현 범위가 비교적 작음

### 단점과 위험

- Job aggregate가 preview, 검토 승인, 최종 승인, 실행 결과를 모두 담당함
- 재승인 시 이전 승인값을 덮어쓸 위험이 큼
- 승인 version과 과거 snapshot을 보존하기 어려움
- 부분 승인 범위를 JSON 배열로 넣으면 Item FK 무결성이 없음
- 승인 만료·무효화·재승인 이력이 mutable Job 상태에 섞임
- Job update 권한을 가진 코드가 승인 artifact까지 변경할 수 있음
- `approvedAt/approvedBy`와 `finalApprovedAt/finalApprovedBy`가 중복 진실이 될 수 있음

### 적합한 경우

- 승인 artifact를 1회성 최신 상태로만 사용
- 부분 실행과 재승인을 지원하지 않음
- 감사 이력을 별도 시스템에서 보장

현재 요구사항에는 부분 범위, 재검증 snapshot, 재승인과 불변성이 포함되므로 단독 후보로는 부족하다.

## 저장 방식 2: 기존 JSON에 저장

### Job `metadata` 사용

`metadata`에 최종 승인 object를 저장하는 방식이다.

장점:

- schema 변경 없이 빠르게 확장 가능
- 필드 추가가 유연함
- 초기 preview 또는 화면 표시용 실험에 유리함

단점과 위험:

- Prisma/DB 수준 타입, 필수값, enum, FK, unique 제약이 없음
- 승인자·hash·scope 조건을 효율적으로 조회하거나 index하기 어려움
- JSON 일부 update로 과거 승인 근거가 바뀔 수 있음
- 여러 승인 version과 active approval을 일관되게 관리하기 어려움
- Worker가 잘못된 JSON 구조를 권한 근거로 해석할 가능성이 있음
- excluded Item이 실제 같은 Job 소속인지 DB가 보장하지 못함

판단:

조회용 보조 metadata 또는 설계 prototype에는 사용할 수 있지만, LIVE 실행 권한의 단독 근거로 권장하지 않는다.

### Item `requestPayload` 사용

각 Item의 `requestPayload`에 final approval 정보를 추가하는 방식이다.

장점:

- Item별 승인·제외 문맥을 함께 볼 수 있음
- 추가 schema 없이 저장 가능

단점과 위험:

- `requestPayload`는 검토 승인 당시의 불변 근거여야 하므로 수정하면 감사 원본이 훼손됨
- Job 수준 승인자·시각·scope hash가 Item마다 중복됨
- Item 간 승인 범위 정합성과 단일 승인 transaction을 표현하기 어려움
- 승인 정보와 실행 후보 데이터의 책임이 섞임
- payload 재저장 금지 원칙과 충돌

판단:

최종 승인 artifact 저장 위치로 사용하지 않는다.

## 저장 방식 3: 별도 최종 승인 모델

승인 헤더를 독립 모델로 만들고 Job과 relation으로 연결하는 방식이다.

문서상 후보 모델명:

- `NaverApiBatchFinalApproval`
- 범용 명칭이 필요하면 `NaverApiBatchApprovalArtifact`

### 장점

- 원본 Job/payload를 수정하지 않고 append-only 승인 이력 생성 가능
- 여러 재검증·재승인 version을 보존 가능
- 승인자, 시각, source, memo를 명시적 컬럼으로 관리 가능
- validation snapshot과 payload/scope hash를 승인 version에 고정 가능
- Job과 승인 artifact의 FK 관계 보장
- active/expired/revoked/consumed 정책을 별도 lifecycle로 설계 가능
- Worker가 승인 artifact ID를 명시적으로 요구할 수 있음
- 선택지 A/B/C 어느 쪽에도 비교적 확장 가능

### 단점과 위험

- schema와 migration이 필요할 가능성이 높음
- 승인 lifecycle과 중복 승인 제약을 새로 설계해야 함
- 기존 공통 verifier와 relation을 연결하는 코드가 필요함
- 불변성을 애플리케이션 규칙만으로 보장하면 여전히 update 위험이 있음
- 부분 범위까지 정규화하면 모델과 조회가 복잡해짐

### 판단

최종 승인이 실제 외부 변경 권한의 근거라는 점을 고려하면 가장 적합한 후보이다. 단, 실제 모델 확정과 migration은 별도 승인 후 진행한다.

## audit log와 실행 권한 artifact 분리

두 역할은 분리해야 한다.

### 최종 승인 artifact

- 실행 전에 존재
- 누가 어떤 snapshot과 Item 범위에 실행 권한을 부여했는지 증명
- Worker의 실행 허용/차단 판단에 사용
- 승인 범위와 payload hash를 불변으로 보존

### `NaverApiCallLog`

- 실행 시도 시 생성
- 실제 endpoint, 요청/응답, 결과, 오류, 시간, retry를 기록
- 승인 이후 무슨 일이 발생했는지 감사
- 실행 권한을 새로 부여하지 않음

Call log가 있다는 이유만으로 승인되었다고 판단하면 안 되고, 승인 artifact가 있다는 이유만으로 실행 성공으로 판단해서도 안 된다.

## 불변 artifact가 필요한 이유

- 승인 후 payload 변경을 탐지하여 TOCTOU 위험 차단
- 사용자가 승인한 정확한 Item 범위와 Worker 실행 범위 비교
- 재검증 snapshot과 실제 요청 자료의 추적 관계 보장
- 재승인 시 과거 승인과 새 승인을 구분
- 부분 실행에서 포함/제외 Item 근거 보존
- 중복 실행·승인 재사용을 방지할 기준 제공
- 장애·분쟁 시 승인 당시 근거 재현

불변성은 “update하지 않기로 약속”하는 것만으로 충분하지 않을 수 있다. 후보 방식은 다음과 같다.

- 승인 artifact는 insert-only, 수정 대신 새 version 생성
- 애플리케이션에서 update API 미제공
- DB role/권한 또는 trigger 사용 여부 후속 검토
- hash 검증으로 원본 Job/Item 변경 탐지
- 승인 artifact가 참조하는 Job/Item 삭제 제한

Prisma만으로 완전한 append-only를 강제할 수 있는지 별도 검토가 필요하다.

## payload hash 필요성과 위험

### 필요성

- 승인 대상 payload와 실행 시점 payload가 같은지 확인
- 포함 Item 순서나 범위 변경 탐지
- validation snapshot과 transformer manifest 연결
- idempotency key의 안정적인 입력 제공
- 승인 version 구분

### canonical hash 원칙

- hash algorithm과 canonicalization version을 함께 저장
- 예: `SHA-256`과 `canonical-json-v1`
- object key 정렬
- Item 목록 정렬 기준 고정
- 숫자, Decimal, Date, `null`, Unicode 정규화 규칙 고정
- 포함/제외 Item ID, target, operation, before/after와 관련 version 포함
- volatile 값과 비밀정보는 제외
- 원본 snapshot을 보존하여 hash 재계산 가능해야 함

### 위험

- JSON 직렬화 순서가 다르면 같은 의미도 다른 hash가 됨
- Decimal과 부동소수점 정규화 오류
- 배열 순서가 불안정하면 오탐 발생
- 필요한 필드를 hash에서 빠뜨리면 변경을 탐지하지 못함
- 너무 많은 mutable 문맥을 포함하면 승인 직후 쉽게 만료됨
- hash는 암호화가 아니므로 민감정보 보호 수단이 아님
- hash만 저장하고 원본 snapshot이 없으면 감사 재현이 어려움

payload hash는 실행 허용의 보조 근거이며 상태, 승인자, scope, 최신 문맥 재검증을 대체하지 않는다.

## Item 수준 artifact 필요성

전체 Job만 항상 승인하고 Item 제외가 없다면 승인 헤더의 Item ID 배열과 scope hash로 시작할 수 있다. 그러나 부분 실행과 제외 사유를 안전하게 지원하려면 Item 수준 artifact가 유리하다.

문서상 후보 모델명:

- `NaverApiBatchFinalApprovalItem`
- 범용 명칭이 필요하면 `NaverApiBatchApprovalArtifactItem`

필요 이유:

- 포함/제외 Item을 FK로 보장
- 같은 approval 안에서 Item 중복 방지
- Item별 `INCLUDED`/`EXCLUDED` 결정과 제외 사유 저장
- Item payload hash와 operation/target 요약 고정
- Worker가 승인 범위를 relation으로 조회
- 부분 승인 후 재검증 결과를 Item별로 추적

JSON 배열만으로는 Item이 삭제되거나 다른 Job Item이 섞이는 것을 DB가 직접 막기 어렵다.

## 권장 후보 모델 초안

다음은 실제 Prisma 코드가 아닌 설계 후보 필드이다.

### `NaverApiBatchFinalApproval`

- `id`
- `batchJobId` relation
- `version`
- `finalApprovedAt`
- `finalApprovedBy`
- `finalApprovalMemo`
- `approvalSource`
- `validationSnapshot` 또는 snapshot relation
- `validationSnapshotHash`
- `payloadHash`
- `scopeHash`
- `executionScope`
- `includedItemCount`
- `excludedItemCount`
- `warningAcknowledgements`
- `operationManifest`
- `hashAlgorithm`
- `canonicalizationVersion`
- `expiresAt`
- `createdAt`

후보 제약:

- Job과 version unique
- artifact/payload/scope hash index 검토
- 같은 활성 승인 범위의 중복 생성 방지
- Job 삭제 시 승인 artifact 보존을 위한 `Restrict` 검토
- update 대신 새 version 생성

active, expired, revoked, consumed 상태를 컬럼으로 둘지 별도 append-only event로 둘지는 후속 검토한다. mutable status를 artifact 본체에 둘 경우 불변성 의미를 명확히 해야 한다.

### `NaverApiBatchFinalApprovalItem`

- `id`
- `finalApprovalId` relation
- `batchJobItemId` relation
- `scopeDecision`: `INCLUDED` 또는 `EXCLUDED`
- `exclusionReason`
- `itemPayloadHash`
- `targetType`, `targetId`, `operation` 승인 당시 요약
- `validationResult` 또는 validation item 참조
- `createdAt`

후보 제약:

- final approval과 batch item 조합 unique
- 포함 Item에는 제외 사유 금지, 제외 Item에는 사유 필수
- approval의 Job과 Item의 `batchJobId`가 같은지 애플리케이션/DB에서 검증
- relation 삭제 정책은 감사 보존을 우선해 `Restrict` 검토

## 기존 Job 필드와의 정합성

별도 artifact를 사용해도 기존 `approvedAt`, `approvedBy`, `dryRun`과의 관계를 결정해야 한다.

- 선택지 A: 최종 승인과 함께 기존 Job 필드를 mirror하고 artifact를 권한 원본으로 사용
- 선택지 B: Job은 dry-run 상태를 유지하고 artifact만 권한 원본으로 사용. 공통 verifier 변경 필요
- 선택지 C: 원본 Job과 별도 실행 Job 사이를 artifact가 연결. 실행 Job의 기존 승인 필드 사용

중복 진실을 피하려면 “권한 원본(source of truth)”을 하나로 정해야 한다. Job 필드를 mirror할 경우 한 transaction에서 일치시키고 불일치 시 실행을 차단해야 한다.

## 방식 비교

| 기준 | Job 필드 추가 | Job metadata JSON | Item requestPayload JSON | 별도 승인 모델 | 승인 + Item 범위 모델 |
| --- | --- | --- | --- | --- | --- |
| schema 변경 없음 | 아니오 | 예 | 예 | 아니오 | 아니오 |
| 타입/필수값 제약 | 중간 | 낮음 | 낮음 | 높음 | 높음 |
| 불변 이력 | 낮음~중간 | 낮음 | 매우 낮음 | 높음 | 높음 |
| 재승인 version | 제한적 | 가능하나 취약 | 부적합 | 적합 | 적합 |
| 부분 범위 FK | 낮음 | 없음 | 없음 | JSON 필요 | 높음 |
| Worker 조회 단순성 | 높음 | 중간 | 낮음 | 높음 | 높음 |
| 감사 추적 | 중간 | 중간 | 낮음 | 높음 | 가장 높음 |
| 구현 복잡도 | 낮음~중간 | 낮음 | 낮음 | 중간~높음 | 높음 |

## 권장 후보안

현재 요구사항을 모두 유지한다면 다음을 우선 후보로 검토한다.

1. `NaverApiBatchFinalApproval`에 승인자, 시각, snapshot, hash, scope, source를 append-only version으로 저장
2. 부분 실행을 지원한다면 `NaverApiBatchFinalApprovalItem`으로 포함/제외 Item과 사유를 정규화
3. 기존 Job/payload는 검토 당시 근거로 유지하고 수정하지 않음
4. Worker는 Job status만이 아니라 유효한 approval artifact와 정확한 Item scope를 요구
5. `NaverApiCallLog`는 실행 감사 로그로 별도 유지

schema 변경을 피하기 위해 `metadata`만 사용하는 방안은 preview/prototype에는 가능하지만 LIVE 실행 권한의 최종 구조로 권장하지 않는다.

이 후보안도 아직 확정하지 않는다. `dryRun` A/B/C안, 승인 lifecycle, validation snapshot 저장 방식, 부분 실행 지원 범위를 결정한 뒤 schema 변경안을 별도 승인받아야 한다.

## 후속 결정 순서

1. `dryRun` A/B/C안 선택
2. 승인 artifact의 source of truth 결정
3. 부분 실행 지원 여부 결정
4. validation snapshot을 JSON으로 보존할지 별도 모델로 정규화할지 결정
5. payload canonicalization/hash specification 확정
6. 승인 만료·무효화·재승인·소비 lifecycle 결정
7. 삭제 정책과 append-only 강제 방식 결정
8. Prisma 모델/enum/index 초안 별도 리뷰
9. 별도 사용자 승인 이후에만 schema와 migration 구현

## 절대 금지 사항

이번 검토 단계에서는 다음을 수행하지 않는다.

- `prisma/schema.prisma` 수정
- migration 생성 또는 실행
- `prisma migrate dev`, `prisma db push`, reset 수행
- DB write 또는 기존 데이터 변경
- 최종 승인 API/타입 구현
- Worker, Scheduler, 실행 API 구현
- Job/Item status 또는 `dryRun` 변경
- 기존 payload 수정
- 네이버 API 요청 코드 작성 또는 실제 호출
- LIVE adapter 구현

현재 결론은 **구현 보류, schema 변경안 별도 승인 필요**이다.
