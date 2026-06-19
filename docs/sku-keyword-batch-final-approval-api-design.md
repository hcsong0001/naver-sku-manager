# SKU Keyword Matching 최종 승인 artifact 생성 API 설계

## 문서 목적

이 문서는 SKU Keyword Matching Batch의 검토 승인이 끝난 뒤, 실제 실행 권한의 근거가 되는 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem`을 생성하는 API 계약을 정의한다.

현재 `APPROVED` Job과 `READY` Item은 검토 승인 완료를 뜻할 뿐 LIVE 실행 권한이 아니다. 이후 Worker는 유효한 최종 승인 artifact, 승인된 Item 범위, validation snapshot과 hash를 함께 검증해야 한다.

이번 작업은 설계 문서 작성만 수행한다. API, 서비스, 타입, 인증, 재검증 함수, Worker, 실행 API와 네이버 API 호출은 구현하지 않으며 DB를 변경하지 않는다.

## 관련 문서와 현재 전제

- [실행 직전 최종 승인 설계](./sku-keyword-batch-final-approval-design.md)
- [실행 전 재검증 설계](./sku-keyword-batch-pre-execution-validation-design.md)
- [payload 변환 설계](./sku-keyword-batch-payload-transform-design.md)
- [최종 승인 artifact schema 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)
- [Prisma schema 초안](./sku-keyword-batch-final-approval-prisma-schema-draft.md)
- [schema 변경 의사결정](./sku-keyword-batch-final-approval-schema-decision.md)

`20260619151522_add_final_approval_artifacts` migration은 적용되었다. DB에는 Job별 ACTIVE artifact를 최대 1개로 제한하는 다음 partial unique index가 존재한다.

```sql
CREATE UNIQUE INDEX "NaverApiBatchFinalApproval_one_active_per_job"
ON "NaverApiBatchFinalApproval"("jobId")
WHERE "status" = 'ACTIVE';
```

현재 `NaverApiBatchFinalApprovalItem`에는 `jobId` 복합 FK가 없다. 따라서 Approval의 Job과 `jobItemId`의 Job이 같은지 API transaction에서 반드시 검증해야 하며, 향후 Worker도 독립적으로 재검증해야 한다.

## API 목적과 책임 경계

이 API는 다음 작업만 담당한다.

1. 인증·권한 문맥에서 최종 승인자를 결정한다.
2. Job과 전체 Item을 최신 DB 상태로 다시 읽는다.
3. 실행 전 validation과 payload 구조 검증을 수행한다.
4. 승인 대상 payload, validation 결과와 Item 범위를 canonical hash로 고정한다.
5. 하나의 transaction에서 Approval 헤더와 전체 Approval Item manifest를 생성한다.

성공 응답은 네이버 반영 성공이나 실행 시작을 뜻하지 않는다. 이후 실행 계층이 검증할 수 있는 권한 artifact가 생성되었다는 의미만 갖는다.

이 API는 다음 작업을 하지 않는다.

- Job `status`, Item `status`, `dryRun`, `approvedAt`, `approvedBy` 변경
- Item payload, preview, candidate 또는 dry-run 근거 수정
- `EXECUTING` 전환
- 실행 Job 생성
- Worker 또는 Scheduler 시작
- 네이버 API 호출이나 가격·재고·키워드 반영

## 경로 후보와 권장안

| 후보 | 장점 | 한계 | 판단 |
| --- | --- | --- | --- |
| `POST /api/sku-matching/draft-batch/[jobId]/final-approval` | 사용자 제안과 의미가 직관적 | 재승인 version 이력을 단일 리소스처럼 보이게 함 | 대안 |
| `POST /api/sku-matching/draft-batch/[jobId]/final-approvals` | Job 하위 승인 컬렉션에 새 version을 생성한다는 의미가 명확함 | 현재 `draft-batch` 명칭을 유지함 | **권장** |
| `POST /api/naver-api-batch-jobs/[jobId]/final-approvals` | 공통 Batch 도메인으로 확장하기 쉬움 | 현재 SKU Matching 전용 검증 계약보다 범위가 넓음 | 공통화 이후 검토 |

권장 경로는 다음과 같다.

```text
POST /api/sku-matching/draft-batch/[jobId]/final-approvals
```

현재 검토 승인 경로인 `POST .../[jobId]/approve`와 같은 Job hierarchy를 유지하되, 최종 승인은 이력을 갖는 별도 리소스이므로 복수형을 사용한다. 조회·무효화 경로는 별도 설계 대상으로 둔다.

## v1 범위 정책

v1은 **Job의 전체 Item 승인만 허용**하는 것을 권장한다.

- Job에 속한 모든 Item을 Approval Item으로 정확히 한 번씩 기록한다.
- 모든 Approval Item은 `included=true`, `excludedReason=null`이다.
- READY가 아닌 Item, blocked Item 또는 불완전 Item이 하나라도 있으면 전체 생성을 거부한다.
- 서버가 실패 Item을 조용히 제외하지 않는다.
- 부분 승인은 제외 사유, 범위 재검증, UI 확인과 Worker 계약을 별도로 설계한 뒤 후속 version에서 허용한다.

DB 모델의 `included`와 `excludedReason`은 향후 부분 승인과 감사 범위를 수용하기 위해 사용하되, v1 API가 임의 부분 실행을 열어 주는 근거로 사용하지 않는다.

## 요청 body 후보

```json
{
  "confirmFinalApproval": true,
  "approvalMemo": "선택 입력",
  "acknowledgedWarnings": ["WARNING_CODE"],
  "scopeConfirmation": {
    "mode": "ALL_ITEMS",
    "expectedItemCount": 10,
    "expectedScopeHash": "선행 확인 화면이 제공한 64자리 lowercase SHA-256"
  }
}
```

### 필드 규칙

| 필드 | 필수 | 규칙 |
| --- | --- | --- |
| `confirmFinalApproval` | 예 | JSON boolean `true`만 허용한다. 문자열 `"true"`는 거부한다. |
| `approvalMemo` | 아니요 | trim 후 빈 문자열은 null, 길이 제한을 둔다. 제어문자와 과도한 길이를 거부한다. |
| `acknowledgedWarnings` | 조건부 | 문자열 warning code의 중복 없는 집합으로 정규화한다. 현재 재검증 결과에 없는 code는 거부한다. |
| `scopeConfirmation.mode` | 예 | v1은 `ALL_ITEMS`만 허용한다. |
| `expectedItemCount` | 권장 | 화면이 확인한 Item 수와 서버 재조회 결과가 다르면 stale 요청으로 거부한다. |
| `expectedScopeHash` | 선행 preview 도입 시 필수 | 서버가 같은 규격으로 재계산한 scope hash와 일치해야 한다. |

`approvedBy`를 body 후보로 받을 수는 있으나 **승인 권한의 원본으로 사용하지 않는다**. `finalApprovedBy`는 인증 session/token의 안정적인 사용자 ID에서 결정한다. 호환상 body에 `approvedBy`를 잠시 받는 경우에도 인증 주체와 정확히 일치하는 확인값으로만 사용하고, 불일치하면 `400` 또는 `403`으로 거부한다. 권장 v1 계약에서는 body에서 제외한다.

`approvalSource`와 승인 시각도 client 입력을 받지 않는다. 서버가 각각 고정된 versioned 값과 서버 시각으로 생성한다.

## 인증과 권한

- 인증되지 않은 요청은 `401`이다.
- 최종 승인 권한이 없는 인증 주체는 `403`이다.
- 표시명, 메모, 헤더의 임의 문자열을 승인자 ID로 사용하지 않는다.
- `finalApprovedBy`에는 변경 가능한 이름보다 내부 사용자 ID 또는 안정적인 subject를 저장한다.
- `approvalSource` 후보는 `TMS_FINAL_APPROVAL_API_V1`처럼 서버가 관리하는 상수다.
- 요청 payload와 hash 입력을 애플리케이션 로그에 원문으로 남기지 않는다.

실제 인증 체계와 권한명은 구현 전 별도 확인이 필요하다. 인증 문맥을 확정할 수 없으면 API 구현을 진행하지 않는다.

## 서버 검증 조건

검증은 fail-closed로 수행한다. 누락 필드를 추론하거나 자동 보정하지 않는다.

### 1. 요청 검증

- `jobId` 형식 유효
- JSON body 파싱 성공
- `confirmFinalApproval === true`
- 허용된 필드와 타입만 사용
- memo 길이와 warning code 형식 유효
- v1 scope가 `ALL_ITEMS`
- client가 보낸 승인자·시각·hash를 신뢰 원본으로 사용하지 않음

### 2. Job 검증

- Job 존재
- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- `status === APPROVED`
- 취소·실행 중·종결 상태가 아님
- Item이 1개 이상 존재
- `totalItems`, 실제 Item 수와 저장 summary가 구조적으로 일치
- 기존 ACTIVE FinalApproval이 없음

### 3. `dryRun`과 기존 승인 metadata

- 현재 Keyword Job의 `dryRun=true`는 저장 당시 preview 성격으로 보존한다.
- `dryRun=false`로 자동 변경하지 않는다.
- 기존 Job의 `approvedAt/approvedBy`는 최종 실행 권한의 원본으로 사용하지 않는다.
- 기존 값이 null인 사실만으로 최종 승인을 거부하지 않는다.
- 기존 값이 존재하더라도 FinalApproval artifact를 대체하지 못한다.
- 향후 Worker verifier는 별도 FinalApproval 계약을 명시적으로 사용해야 하며, 기존 verifier를 조용히 우회하지 않는다.

### 4. Item 소속과 상태

- transaction 안에서 `batchJobId=jobId` 조건으로 전체 Item을 다시 조회한다.
- 요청이 제공한 Item ID만으로 Item을 조회하지 않는다.
- 모든 Item의 `batchJobId`가 Job ID와 일치한다.
- 모든 Item status가 `READY`다.
- 전체 Item ID가 중복되지 않는다.
- `totalItems`, 조회 수, scope 확인 수가 모두 일치한다.
- Approval Item은 조회된 전체 Item에서만 생성한다.

이 검증은 현재 schema가 Approval과 Job Item의 같은 Job 관계를 복합 FK로 강제하지 않는 간극을 보완한다.

### 5. Item 구조와 payload

- `targetType`은 허용된 `SINGLE`, `OPTION`, `ADDITIONAL` 중 하나다.
- `targetId`, `storeId`, `operation`이 비어 있지 않고 원본 Item과 일치한다.
- `UNKNOWN` target 또는 operation이 없다.
- `requestPayload`가 object이며 `candidate`와 `dryRunItem`이 존재한다.
- `previewBefore`, `previewAfter`와 `dryRunItem.before/after`의 필수 변경값이 존재한다.
- `dryRunItem.executable === true`다.
- `dryRunItem.blockedReasons`가 비어 있다.
- `riskLevel === HIGH`가 아니다.
- candidate가 `NEEDS_CONTEXT`가 아니며 필수 현재값이 누락되지 않는다.
- option-value fallback 등 검토 승인에서 금지한 매칭이 남아 있지 않다.
- payload transformer/operation registry가 해당 operation과 version을 지원한다.
- 공식 요청으로 변환할 필수 값이 완전하다. memo, 상품명 또는 경고 문구에서 실행 키워드를 추론하지 않는다.

`candidate`와 `dryRunItem`은 승인 근거이므로 원문을 수정하지 않고 hash 입력으로 사용한다.

### 6. 실행 직전 재검증

- 최신 내부 상품·옵션·추가상품·SKU·세트 문맥을 다시 읽는다.
- 최신 문맥 출처와 조회 시각이 신뢰 가능하다.
- 저장 당시 before와 최신 현재값이 일치한다.
- 최신 계산 결과와 저장 당시 after가 일치한다.
- blocked, stale, HIGH risk Item이 없다.
- 결과의 `canExecute=true`다.
- 재검증 중 필수 문맥 조회가 실패하면 승인 생성도 실패한다.
- 외부 네이버 변경 API는 호출하지 않는다. 최신 문맥 확보에 외부 read가 필요하다면 별도 승인과 설계 전에는 fail-closed한다.

현재 검토 승인에서 정보성 warning이었던 항목도 최종 승인 시점의 freshness 요구를 충족하지 못하면 blocker로 승격할 수 있다. warning/blocker 정책 version을 snapshot에 기록한다.

### 7. warning 확인

- 서버가 재계산한 warning code 집합을 기준으로 한다.
- 모든 확인 필요 warning이 `acknowledgedWarnings`에 있어야 한다.
- 알 수 없는 code, 사라진 warning 또는 새로 생긴 미확인 warning이 있으면 승인하지 않는다.
- 정렬·중복 제거한 실제 확인 목록을 `validationSnapshot`에 저장한다.

### 8. validation 만료

- `validatedAt`과 `validationExpiresAt`은 서버 시각으로 생성한다.
- TTL은 client가 정하지 않으며 versioned 서버 설정으로 관리한다.
- 초기 후보는 짧은 운영 TTL(예: 10분)이지만 구현 전 확정해야 한다.
- insert 직전 `validationExpiresAt > now`를 다시 확인한다.
- Worker도 실행 선점 직전에 만료를 재검증해야 한다.

## Transaction 설계

### 원칙

- Approval 헤더와 모든 Approval Item은 하나의 transaction에서 생성한다.
- validation 또는 insert 하나라도 실패하면 전체 rollback한다.
- Job/Item 상태와 payload는 transaction에서 변경하지 않는다.
- 외부 네트워크 호출을 transaction 안에서 수행하지 않는다.

### 권장 순서

1. transaction 밖에서 변경을 일으키지 않는 최신 문맥과 validation 후보를 준비한다.
2. Prisma transaction을 `Serializable` isolation 후보로 시작한다.
3. Job과 `batchJobId=jobId`인 전체 Item을 다시 조회한다.
4. 상태, 수, `updatedAt`, 식별자와 hash 관련 필드가 validation 후보를 만들 때와 같은지 비교한다.
5. ACTIVE artifact 존재 여부를 조회한다. 존재하면 `409`로 rollback한다.
6. 최신 승인 version을 조회하고 `nextVersion = max(version) + 1`을 계산한다.
7. 검증 snapshot, scope manifest와 모든 hash를 현재 transaction 데이터로 최종 계산한다.
8. `NaverApiBatchFinalApproval`을 `ACTIVE`로 생성한다.
9. Job의 전체 Item을 `NaverApiBatchFinalApprovalItem`으로 생성한다.
10. 생성 행 수, scope 집계와 hash를 재확인한 뒤 commit한다.

긴 validation을 transaction 밖에서 수행하더라도, insert 전에 hash 관련 DB 상태를 transaction 안에서 다시 읽고 비교해야 한다. 달라졌으면 기존 validation 결과를 폐기하고 `409` 또는 `422`로 실패한다.

### ACTIVE 중복과 race condition

단순한 “ACTIVE 조회 후 insert”만으로는 충분하지 않다. 동시에 두 요청이 모두 ACTIVE 없음으로 읽을 수 있기 때문이다.

다음 방어를 함께 사용한다.

1. 애플리케이션의 transaction 내 ACTIVE 선행 검사
2. `Serializable` 충돌 처리 또는 같은 Job 승인 직렬화
3. DB partial unique index의 최종 강제
4. `(jobId, version)` unique의 version 충돌 방어

partial unique 또는 `(jobId, version)` 충돌은 예상 가능한 동시성 결과로 보고 `409 Conflict`로 변환한다. Prisma unique violation, serialization failure와 deadlock은 내부 메시지를 노출하지 않는다. 자동 재시도를 도입하더라도 짧고 제한된 횟수만 허용하며, 재시도 후 ACTIVE가 확인되면 기존 artifact ID 요약과 함께 `409`를 반환한다.

v1 생성 API는 ACTIVE artifact가 있으면 이를 수정하거나 덮어쓰지 않는다. 무효화와 재승인은 별도 권한·API 설계 후 수행한다. 재승인을 허용할 때는 새 version을 만들고 가장 최근 artifact를 `supersedesApprovalId`로 연결한다.

## 생성 데이터

### `NaverApiBatchFinalApproval`

| 필드 | 생성 기준 |
| --- | --- |
| `jobId` | route의 Job과 transaction 재조회 결과 |
| `version` | 같은 Job의 최대 version + 1 |
| `status` | `ACTIVE` |
| `finalApprovedAt` | 서버 시각 |
| `finalApprovedBy` | 인증된 주체 ID |
| `finalApprovalMemo` | 검증·정규화된 선택 입력 |
| `approvalSource` | 서버 상수 `TMS_FINAL_APPROVAL_API_V1` 후보 |
| `validationSnapshot` | versioned 재검증 결과와 확인 warning |
| `validationSnapshotHash` | snapshot domain hash |
| `validationExpiresAt` | 서버 TTL로 계산한 만료 시각 |
| `payloadHash` | 승인된 Item payload manifest hash |
| `executionScope` | 전체 Item 범위 집계와 scope hash |
| `hashSpec` | algorithm/canonicalization/domain version |
| `supersedesApprovalId` | 최초 승인은 null, 재승인 정책 도입 후 이전 artifact ID |
| `createdAt` | DB default |

무효화 필드는 최초 생성 시 모두 null이다.

### `NaverApiBatchFinalApprovalItem`

Job의 모든 Item마다 한 행을 생성한다.

- `finalApprovalId`: 방금 생성한 Approval ID
- `jobItemId`: transaction에서 조회한 원본 Item ID
- `targetType`, `targetId`, `storeId`, `operation`: 승인 시점 snapshot
- `included=true`
- `excludedReason=null`
- `itemPayloadHash`: Item 실행 입력 hash
- `itemValidationHash`: Item validation 결과 hash
- `createdAt`: DB default

생성 후 Approval 내용 필드와 Approval Item은 수정하지 않는다.

## Hash 계약

### 공통 규칙

- 알고리즘: SHA-256
- 출력: 정확히 64자리 lowercase hexadecimal
- 문자 인코딩: UTF-8
- key 정렬과 숫자·문자열·null 표현이 결정적인 canonical JSON 사용
- 배열 순서는 의미를 명시하고, Item manifest는 안정적인 key로 정렬
- `undefined`, 함수, 비정상 숫자와 locale 의존 값은 허용하지 않음
- Date는 UTC ISO-8601 형식으로 정규화
- Prisma Decimal/BigInt가 포함되면 versioned 문자열 표현 규칙을 명시
- raw `JSON.stringify` 결과를 별도 규격 없이 hash하지 않음

canonicalization은 RFC 8785 JCS를 그대로 채택하거나 이를 기반으로 한 `TMS_CANONICAL_JSON_V1`을 정의하고 test vector로 고정한다. 구현 전 적어도 key 순서, Unicode, 숫자, null, 배열 순서와 Date 사례의 입력/출력/digest fixture를 승인해야 한다.

각 hash는 다음과 같이 domain-separated input을 사용한다.

```text
UTF8(<domain> + "\n" + <canonical-json>)
```

`hashSpec`에는 최소한 다음을 저장한다.

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

### `itemPayloadHash`

다음 실행 입력을 포함한다.

- Job Item ID와 `batchJobId`
- `targetType`, `targetId`, `storeId`, `channelId`, `operation`
- 계산 방식과 SKU/세트 구성 근거
- `previewBefore`, `previewAfter`
- `requestPayload.candidate`, `requestPayload.dryRunItem`
- operation/transformer 계약 version

응답 payload, attempt count, 오류 메시지처럼 실행 후 바뀌는 값은 제외한다.

### `itemValidationHash`

Item ID, validator version, validatedAt 정책, blocker/risk/stale 결과, 최신 문맥 식별값과 확인 warning을 포함한다. 실제 시각을 포함하면 동일 상태에서도 digest가 달라지는 점을 의도하고 snapshot 전체와 함께 보존한다.

### `payloadHash`

Job ID, jobType/module, hashSpec version과 `jobItemId` 기준으로 정렬한 전체 `{jobItemId, itemPayloadHash}` manifest를 hash한다. Item 객체의 DB 조회 순서에 의존하지 않는다.

### `validationSnapshotHash`

저장할 `validationSnapshot` 전체를 validation domain으로 hash한다. JSON 저장 전 canonical object와 실제 저장 object가 의미상 같음을 보장해야 한다.

### scope hash

전체 Job Item을 `jobItemId` 기준으로 정렬한 `{jobItemId, included, excludedReason}` manifest를 scope domain으로 hash한다. `executionScope.scopeHash`, Item 수 집계와 관계 행을 서로 대조한다.

## `validationSnapshot`과 `executionScope` 후보

```json
{
  "schemaVersion": "1",
  "validatorVersion": "미정",
  "validatedAt": "ISO-8601 UTC",
  "expiresAt": "ISO-8601 UTC",
  "jobId": "UUID",
  "jobUpdatedAt": "ISO-8601 UTC",
  "summary": {
    "canExecute": true,
    "totalItemCount": 10,
    "blockedCount": 0,
    "staleCount": 0,
    "highRiskCount": 0
  },
  "acknowledgedWarnings": [],
  "itemResults": []
}
```

```json
{
  "schemaVersion": "1",
  "mode": "ALL_ITEMS",
  "totalItemCount": 10,
  "includedItemCount": 10,
  "excludedItemCount": 0,
  "scopeHash": "64자리 lowercase SHA-256"
}
```

scalar `validationExpiresAt`과 snapshot의 `expiresAt`은 정확히 같아야 한다. source of truth인 Item scope는 Approval Item relation이며 `executionScope`는 versioned 집계다.

## 성공 응답

생성 성공은 `201 Created`를 권장한다.

```json
{
  "ok": true,
  "jobId": "UUID",
  "finalApproval": {
    "id": "UUID",
    "version": 1,
    "status": "ACTIVE",
    "finalApprovedAt": "ISO-8601 UTC",
    "finalApprovedBy": "인증 주체 ID",
    "validationExpiresAt": "ISO-8601 UTC",
    "itemCount": 10,
    "includedItemCount": 10,
    "payloadHash": "64자리 lowercase SHA-256",
    "validationSnapshotHash": "64자리 lowercase SHA-256",
    "scopeHash": "64자리 lowercase SHA-256"
  },
  "executionStarted": false
}
```

응답에는 승인 확인에 필요한 요약만 제공하고, 전체 validation snapshot이나 payload 원문은 기본 응답에서 제외한다.

## 실패 응답

모든 실패 응답은 안정적인 `code`, 사용자용 `message`, 필요한 최소 상세를 사용한다. 내부 SQL, Prisma 오류, stack과 민감 payload를 노출하지 않는다.

| HTTP | 후보 code | 조건 |
| --- | --- | --- |
| `400` | `FINAL_APPROVAL_CONFIRMATION_REQUIRED` | confirm 누락 또는 true가 아님 |
| `400` | `INVALID_FINAL_APPROVAL_REQUEST` | body 타입, warning/scope 형식 오류 |
| `401` | `AUTHENTICATION_REQUIRED` | 인증 없음 |
| `403` | `FINAL_APPROVAL_FORBIDDEN` | 승인 권한 없음 또는 승인자 확인값 불일치 |
| `404` | `BATCH_JOB_NOT_FOUND` | Job 없음 |
| `409` | `ACTIVE_FINAL_APPROVAL_EXISTS` | 이미 ACTIVE artifact 존재 또는 partial unique 충돌 |
| `409` | `BATCH_STATE_CONFLICT` | Job/Item 상태, 수, updatedAt 또는 scope가 확인 이후 변경됨 |
| `409` | `FINAL_APPROVAL_VERSION_CONFLICT` | 동시 version 생성 충돌 |
| `422` | `FINAL_APPROVAL_VALIDATION_FAILED` | blocked/stale/HIGH risk/미확인 warning |
| `422` | `INCOMPLETE_BATCH_PAYLOAD` | requestPayload, candidate, dryRunItem 또는 preview 불완전 |
| `422` | `UNSUPPORTED_BATCH_OPERATION` | transformer/operation 계약 없음 |
| `500` | `FINAL_APPROVAL_CREATE_FAILED` | 예상하지 못한 서버 오류 |
| `503` | `VALIDATION_CONTEXT_UNAVAILABLE` | 필수 최신 read 문맥을 안전하게 확보할 수 없음 |

DB unique 충돌을 무조건 `500`으로 처리하지 않는다. 어떤 제약이 충돌했는지 서버 내부에서 구분해 예상 가능한 경쟁은 `409`로 변환한다.

## Idempotency와 재요청

별도 idempotency 계약이 없는 v1에서 성공 요청을 그대로 반복하면 이미 ACTIVE가 있으므로 `409`가 된다. 기존 ACTIVE를 새 성공처럼 반환하거나 덮어쓰지 않는다.

네트워크 재시도 UX가 필요하면 후속 설계에서 `Idempotency-Key`와 request fingerprint를 도입한다. 같은 key와 같은 fingerprint만 기존 결과를 반환하고, 같은 key의 다른 body는 `409`로 거부해야 한다.

## Job/Item status 정책

FinalApproval 생성 transaction은 다음 값을 변경하지 않는다.

- Job `status`: `APPROVED` 유지
- Item `status`: `READY` 유지
- Job `dryRun`: 기존 값 유지
- Job `approvedAt`, `approvedBy`: 기존 값 유지
- Job/Item `updatedAt`: FinalApproval 생성 때문에 변경하지 않음

승인 생성과 실행 상태 전이는 책임이 다르다. `EXECUTING` 전환, 선점, 성공·실패·SKIPPED 정책은 Worker/실행 API 설계와 별도 승인을 거쳐야 한다.

## 테스트 계획

### 요청과 권한

- confirm 누락, false, 문자열 true
- 인증 없음과 승인 권한 없음
- body의 `approvedBy` spoof 시도
- memo 길이 초과와 잘못된 warning code
- `ALL_ITEMS` 외 scope 요청

### Job/Item 상태

- 존재하지 않는 Job
- 승인 전 `DRAFT` Job
- 정상 `APPROVED` Job과 전체 `READY` Item
- READY Item 없음
- 일부 Item이 DRAFT/EXECUTING/종결 상태
- Item 수와 `totalItems` 불일치
- 타 Job Item 혼입 시도

### validation과 payload

- blocked Item 존재
- stale 또는 HIGH risk Item 존재
- 새 미확인 warning 존재
- malformed `requestPayload`
- candidate 또는 dryRunItem 누락
- before/after 불완전
- 지원하지 않는 operation/transformer version
- validation 만료 직전과 만료 후
- scope 확인 hash 불일치

### transaction과 동시성

- 헤더 생성 후 Item 생성 실패 시 전체 rollback
- Item 중간 실패 시 헤더와 일부 Item이 남지 않음
- 동시에 두 승인 요청을 보내 partial unique 충돌 확인
- 동시에 version을 계산해 `(jobId, version)` 충돌 확인
- serialization conflict가 내부 오류를 노출하지 않고 `409`로 변환됨
- 이미 ACTIVE artifact가 있는 Job
- historical INVALIDATED/SUPERSEDED만 있는 Job의 다음 version 계산

### Hash

- key 순서가 다른 의미상 동일 JSON의 hash 동일
- Item 조회 순서가 달라도 manifest hash 동일
- payload 필드 하나가 바뀌면 item/payload hash 변경
- validation 결과 하나가 바뀌면 validation hash 변경
- Unicode, null, 숫자와 Date canonical test vector
- 64자리 lowercase hex 형식 검증
- 저장한 scope relation으로 scope hash 재계산 일치

### 비실행 보장

- 성공 후에도 Job이 `APPROVED`, Item이 `READY`인지 확인
- `dryRun`, 기존 approval metadata와 payload가 바뀌지 않는지 확인
- 네이버 API client/adapter가 호출되지 않는지 확인
- Worker, Scheduler와 실행 API가 시작되지 않는지 확인
- `EXECUTING` 전환이 없는지 확인

통합 테스트는 실제 운영 DB가 아닌 격리된 테스트 PostgreSQL에서 수행한다. partial unique, Serializable 경쟁과 rollback은 PostgreSQL 동작이 필요하므로 단순 mock 테스트만으로 완료 판정하지 않는다.

## 구현 전 결정이 필요한 항목

1. 실제 인증 주체 ID와 최종 승인 권한명
2. validation 함수와 최신 read 문맥의 source of truth
3. `TMS_CANONICAL_JSON_V1` 또는 RFC 8785 채택과 hash test vector
4. validator/operation/transformer version 식별 방식
5. validation TTL
6. 선행 scope/validation preview API와 `expectedScopeHash` 제공 방식
7. Prisma transaction isolation, 충돌 오류 mapping과 제한적 retry 정책
8. 부분 승인 지원 여부와 별도 API/UX
9. 재승인 전 무효화·SUPERSEDED 전이 권한과 절차
10. 감사 로그와 민감 payload 보존 정책

이 항목이 확정되기 전에는 API를 구현하지 않는다.

## 절대 금지 사항

- 최종 승인 생성 중 네이버 API 호출
- payload를 네이버 요청으로 전송
- Worker 또는 Scheduler 실행
- 실행 API 호출 또는 구현
- Job/Item `EXECUTING` 전환
- 가격·재고·키워드 실제 반영
- 기존 Job/Item payload 자동 보정
- ACTIVE artifact 덮어쓰기
- validation 실패 Item 자동 제외
- 인증되지 않은 `approvedBy` 저장
- hash 불일치 또는 만료를 경고만 남기고 승인

## 결론

최종 승인 생성 API는 `POST /api/sku-matching/draft-batch/[jobId]/final-approvals`를 권장한다. v1은 전체 Job Item만 승인하고, 인증 주체·서버 재검증·canonical hash·하나의 DB transaction을 사용해 별도 Approval 헤더와 전체 Item manifest를 생성한다.

ACTIVE 최대 1개는 애플리케이션 선행 검사만 믿지 않고 적용된 PostgreSQL partial unique index를 최종 안전장치로 사용한다. 성공해도 Job `APPROVED`, Item `READY`와 `dryRun`을 그대로 유지하며 실행이나 외부 호출로 이어지지 않는다.

**이 문서는 API 구현 승인이 아니다. 실제 API·재검증·hash 유틸리티와 인증 연결은 별도 명시 승인 후에만 구현한다.**
