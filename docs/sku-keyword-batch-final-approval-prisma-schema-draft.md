# SKU Keyword Matching 최종 승인 artifact Prisma schema 초안

## 문서 목적과 상태

이 문서는 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem`을 실제 `prisma/schema.prisma`에 추가하기 전에 enum, 필드, 관계, unique/index와 삭제 정책을 Prisma 형태로 검토하기 위한 **비실행 초안**이다.

현재 판정은 사용자 명시 승인 전 `NO-GO`다. 이 문서의 코드 블록은 복사·적용 지시가 아니며 migration SQL도 아니다. 이번 작업에서는 Prisma schema, migration, DB, 코드, status와 payload를 변경하지 않는다.

관련 문서는 다음과 같다.

- [schema 변경 의사결정 요약](./sku-keyword-batch-final-approval-schema-decision.md)
- [schema 변경안 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)
- [schema 변경 전 체크리스트](./sku-keyword-batch-final-approval-schema-change-checklist.md)
- [최종 승인 artifact 스키마 필요성 검토](./sku-keyword-batch-final-approval-schema-review.md)
- [실행 직전 최종 승인 설계](./sku-keyword-batch-final-approval-design.md)

## 현재 schema read-only 확인 결과

현재 프로젝트는 Prisma `7.8.0`과 PostgreSQL datasource를 사용한다. `prisma/schema.prisma`에서 확인한 관련 요소는 다음과 같다.

| 구분 | 현재 요소 | 확인 내용 |
| --- | --- | --- |
| Job status enum | `NaverApiBatchJobStatus` | `DRAFT`, `PREVIEW`, `APPROVAL_PENDING`, `APPROVED`, `EXECUTING`, 종결 상태 보유 |
| Item status enum | `NaverApiBatchItemStatus` | `DRAFT`, `PREVIEWED`, `READY`, `EXECUTING`, 결과·재시도 상태 보유 |
| 실행 로그 status enum | `NaverApiCallStatus` | 호출 결과와 재시도·취소 상태 보유 |
| Job | `NaverApiBatchJob` | `status`, `dryRun`, `metadata`, `approvedAt/By`, `executedAt`, `items` 보유 |
| Job Item | `NaverApiBatchJobItem` | `batchJobId`, 대상·operation, preview/payload, status와 call log 관계 보유 |
| 호출 감사 로그 | `NaverApiCallLog` | Job Item을 선택적으로 참조하고 요청·응답·결과를 기록 |

현재 `NaverApiBatchJob.items` 관계는 Job 삭제 시 Job Item을 `Cascade` 삭제한다. `NaverApiCallLog.batchJobItem`은 Item 삭제 시 `SetNull`, Item의 `store` 관계는 `Restrict`다. 최종 승인 artifact를 추가하면 기존 Job 삭제 cascade가 승인 이력의 FK와 충돌해 전체 삭제를 막을 수 있으므로 실제 migration 전에 삭제 경로를 반드시 검증해야 한다.

기존 Job/Item status enum에 최종 승인 lifecycle을 추가하지 않는다. workflow 상태와 LIVE 실행 권한 artifact 상태는 수명주기와 책임이 다르기 때문이다.

## 설계 선택 요약

| 항목 | 이번 초안의 기준 | 적용 전 남은 결정 |
| --- | --- | --- |
| 승인 모델 | 헤더와 Item scope 2모델 | 사용자 명시 승인 |
| 승인 status | 신규 enum | 값과 상태 전이 최종 승인 |
| scope 원본 | Approval Item 행 | JSON scope는 요약 snapshot |
| 재승인 | 새 version + `supersedesApprovalId` | 동시성·결번 정책 |
| 불변성 | 내용 필드 수정 금지 | DB/repository 강제 수준 |
| 무효화 | lifecycle 필드만 제한 변경 | 권한 주체·상태 전이 |
| 삭제 | 모든 신규 FK `Restrict` 우선 | 기존 Cascade 영향 확인 |
| ACTIVE 단일성 | PostgreSQL partial unique 우선 후보 | Prisma native 문법 검증 또는 raw SQL 승인 |

## 신규 enum 초안

```prisma
enum NaverApiBatchFinalApprovalStatus {
  ACTIVE
  INVALIDATED
  SUPERSEDED
}
```

### 값의 의미

- `ACTIVE`: Worker가 추가 유효성 검사 대상으로 선택할 수 있는 유일한 상태다. ACTIVE라는 사실만으로 실행 자격이 완성되지는 않는다.
- `INVALIDATED`: 사용자 또는 시스템 정책에 의해 명시적으로 무효화되었다. 다시 ACTIVE로 되돌리지 않는다.
- `SUPERSEDED`: 더 높은 version의 새 승인이 이 승인을 대체했다. `supersededBy` 관계로 후속 승인을 추적한다.

`EXPIRED`는 저장 status로 두지 않는 것을 이번 초안의 우선 후보로 한다. 만료는 `validationExpiresAt <= now()`로 계산할 수 있고 만료 시각 경과마다 DB write를 요구하지 않아야 한다. `CONSUMED`도 승인 lifecycle보다 실행 선점·결과 모델의 책임일 수 있으므로 Worker 계약이 정해질 때까지 enum에 넣지 않는다.

`INVALIDATED`와 `SUPERSEDED` 모두 ACTIVE 권한을 잃지만 이유가 다르다. 운영 취소와 재승인 대체를 감사에서 구분하기 위해 별도 값으로 둔다.

## 기존 모델에 필요한 관계 필드 초안

아래 블록은 기존 모델 전체가 아니라 **추가 후보 라인만** 보여 준다. 현재 schema에는 적용하지 않는다.

```prisma
model NaverApiBatchJob {
  // 기존 필드 유지
  finalApprovals NaverApiBatchFinalApproval[]
}

model NaverApiBatchJobItem {
  // 기존 필드 유지
  finalApprovalItems NaverApiBatchFinalApprovalItem[]

  // 엄격한 같은 Job 소속 복합 FK를 채택할 때 필요한 후보
  @@unique([id, batchJobId])
}
```

`NaverApiBatchJobItem.id`가 이미 PK이므로 `@@unique([id, batchJobId])`는 일반 조회 고유성만 보면 중복 index다. 그러나 Approval Item이 `[jobItemId, jobId]`로 `[id, batchJobId]`를 참조해 “승인 Job과 Item 소속 Job이 같음”을 DB에서 강제하려면 Prisma relation target 후보로 필요하다. index 중복 비용과 무결성 이득을 migration 검토에서 비교한다.

## `NaverApiBatchFinalApproval` 모델 초안

```prisma
model NaverApiBatchFinalApproval {
  id                     String                              @id @default(uuid())
  jobId                  String
  version                Int
  status                 NaverApiBatchFinalApprovalStatus   @default(ACTIVE)

  finalApprovedAt        DateTime
  finalApprovedBy        String
  finalApprovalMemo      String?
  approvalSource         String

  validationSnapshot     Json
  validationSnapshotHash String                              @db.VarChar(64)
  validationExpiresAt    DateTime
  payloadHash            String                              @db.VarChar(64)
  executionScope         Json
  hashSpec               Json

  invalidatedAt          DateTime?
  invalidatedBy          String?
  invalidationReason     String?
  supersedesApprovalId   String?

  createdAt              DateTime                            @default(now())

  job                    NaverApiBatchJob                    @relation(fields: [jobId], references: [id], onDelete: Restrict)
  items                  NaverApiBatchFinalApprovalItem[]
  supersedes             NaverApiBatchFinalApproval?         @relation("NaverApiBatchFinalApprovalSupersession", fields: [supersedesApprovalId], references: [id], onDelete: Restrict)
  supersededBy           NaverApiBatchFinalApproval[]        @relation("NaverApiBatchFinalApprovalSupersession")

  @@unique([jobId, version])
  @@unique([id, jobId])
  @@index([jobId, status])
  @@index([status])
  @@index([supersedesApprovalId])
  @@index([finalApprovedAt])
  @@index([validationExpiresAt])
}
```

### 필드 결정 근거

- `version`: Job별 승인 이력 순서다. 같은 Job에서 unique이며 재사용하지 않는다.
- `finalApprovedAt`: 인증된 최종 승인 행위 시각이다. DB insert 시각인 `createdAt`과 혼용하지 않는다.
- `finalApprovedBy`: 화면 입력 표시명이 아니라 인증 문맥의 안정적인 주체 ID다.
- `approvalSource`: `TMS_UI`, `INTERNAL_API` 같은 승인 경로다. enum 도입은 source 확장 정책이 정해질 때 별도 판단한다.
- `validationExpiresAt`: JSON 내부 값을 해석하지 않고 만료를 fail-closed로 검사하기 위한 scalar다.
- `supersedesApprovalId`: 새 version이 직접 대체하는 이전 artifact를 가리킨다. 첫 version만 null이다.
- `createdAt`: 영속화 시각이며 기술 default를 허용한다.

`@@unique([id, jobId])`는 Approval Item의 복합 FK가 같은 `jobId`를 공유하도록 만들기 위한 후보이며 PK 관점에서는 중복이다. 엄격한 복합 FK를 채택하지 않으면 제거할 수 있지만, 그 경우 같은 Job 소속 검증은 transaction과 Worker 양쪽에서 수행해야 한다.

## `NaverApiBatchFinalApprovalItem` 모델 초안

```prisma
model NaverApiBatchFinalApprovalItem {
  id                 String                       @id @default(uuid())
  finalApprovalId    String
  jobId              String
  jobItemId          String

  targetType         String
  targetId           String
  storeId            String
  operation          String
  included           Boolean
  excludedReason     String?

  itemPayloadHash    String                       @db.VarChar(64)
  itemValidationHash String                       @db.VarChar(64)
  createdAt          DateTime                     @default(now())

  finalApproval      NaverApiBatchFinalApproval   @relation(fields: [finalApprovalId, jobId], references: [id, jobId], onDelete: Restrict)
  jobItem            NaverApiBatchJobItem         @relation(fields: [jobItemId, jobId], references: [id, batchJobId], onDelete: Restrict)

  @@unique([finalApprovalId, jobItemId])
  @@index([finalApprovalId, included])
  @@index([jobItemId])
  @@index([jobId])
  @@index([storeId, targetType, targetId])
}
```

### Item scope 불변식

- Approval 생성 시 해당 Job의 모든 Job Item을 정확히 한 행씩 기록한다.
- `(finalApprovalId, jobItemId)` unique로 한 승인 안의 Item 중복을 금지한다.
- `included=true`면 `excludedReason`은 null, `included=false`면 비어 있지 않은 사유를 요구한다.
- `targetType`, `targetId`, `storeId`, `operation`은 승인 당시 snapshot이며 Worker가 원본 Item과 비교한다.
- `jobId`는 편의용 복제가 아니라 두 복합 FK를 통해 타 Job Item 혼입을 차단하는 무결성 필드다.
- Item 행과 내용은 생성 후 수정하지 않는다. 범위가 바뀌면 새 Approval version과 전체 Item 집합을 생성한다.

`included`와 `excludedReason`의 조건부 규칙은 일반 Prisma relation/unique만으로 완전하게 표현되지 않는다. 애플리케이션 validation만 둘지 PostgreSQL CHECK 제약을 migration에 추가할지는 별도 승인 대상이다.

## JSON 필드 계약 후보

JSON은 자유 형식 metadata가 아니라 versioned snapshot이다. 각 JSON은 저장 전에 schema validation을 통과하고 내용 hash 또는 상위 hash로 고정해야 한다.

### `validationSnapshot`

```json
{
  "schemaVersion": "1",
  "validatorVersion": "미정",
  "validatedAt": "ISO-8601 UTC",
  "expiresAt": "ISO-8601 UTC",
  "jobId": "UUID",
  "summary": {
    "canExecute": true,
    "blockedCount": 0,
    "staleCount": 0,
    "warningCodes": []
  },
  "itemResults": []
}
```

`validationSnapshot.expiresAt`과 scalar `validationExpiresAt`은 같은 값을 표현한다. scalar는 조회·차단용, JSON 값은 snapshot 자기완결성용이다. 생성 시 일치시키고 불일치하면 저장을 거부한다.

### `executionScope`

```json
{
  "schemaVersion": "1",
  "mode": "ALL_ITEMS 또는 PARTIAL_ITEMS",
  "totalItemCount": 0,
  "includedItemCount": 0,
  "excludedItemCount": 0,
  "scopeHash": "소문자 SHA-256 hex"
}
```

실제 Item 목록의 source of truth는 Approval Item relation이다. `executionScope`는 집계와 scope hash를 담는 불변 요약이며 Item ID 배열을 중복 원본으로 만들지 않는다. Worker는 관계 행에서 manifest를 재구성해 `scopeHash`와 개수를 비교한다.

### `hashSpec`

```json
{
  "schemaVersion": "1",
  "algorithm": "SHA-256",
  "encoding": "lowercase-hex",
  "canonicalizationVersion": "미정",
  "payloadDomain": "NAVER_API_BATCH_FINAL_APPROVAL_PAYLOAD",
  "validationDomain": "NAVER_API_BATCH_FINAL_APPROVAL_VALIDATION",
  "scopeDomain": "NAVER_API_BATCH_FINAL_APPROVAL_SCOPE"
}
```

`hashSpec`은 hash 필드가 어떤 byte input과 canonicalization 결과를 뜻하는지 재현하기 위한 규격 snapshot이다. 규격이 변경되면 기존 artifact를 재해석하거나 수정하지 않고 새 version에 새 규격을 사용한다.

## hash 저장 형식

- 알고리즘 후보는 SHA-256이다.
- 원시 digest는 32 bytes이며 lowercase hexadecimal 표현은 정확히 64 ASCII 문자다.
- `validationSnapshotHash`, `payloadHash`, `itemPayloadHash`, `itemValidationHash`는 `String @db.VarChar(64)` 후보로 둔다.
- 길이 64, 문자 집합 `[0-9a-f]`, null 불가를 요구한다.
- `VarChar(64)`는 최대 길이만 제한하므로 정확한 길이와 문자 집합은 애플리케이션 validation 또는 PostgreSQL CHECK가 필요하다.
- 서로 다른 목적의 hash에는 domain separator와 schema/canonicalization version을 input에 포함한다.
- DB collation 차이를 권한 비교에 개입시키지 않도록 애플리케이션에서 byte-safe한 lowercase ASCII 비교 규칙을 사용한다.

base64 또는 binary 저장도 가능하지만 운영 조회와 기존 문서의 표현 규격을 고려해 64자리 lowercase hex를 우선 후보로 한다. 실제 hash test vector가 승인되기 전에는 구현하지 않는다.

## unique 및 index 후보

### unique

| 제약 | 목적 | 비고 |
| --- | --- | --- |
| `@@unique([jobId, version])` | Job 안에서 version 중복 방지 | version 생성 race는 별도 잠금 필요 |
| `@@unique([id, jobId])` | Approval Item 복합 FK target | PK와 중복 비용 검토 |
| Job Item `@@unique([id, batchJobId])` | 같은 Job 소속 복합 FK target | PK와 중복 비용 검토 |
| `@@unique([finalApprovalId, jobItemId])` | 승인 안의 Item 중복 방지 | 필수 권장 |

`@@unique([jobId, status])`로 ACTIVE 최대 1개를 보장하려 해서는 안 된다. 이 제약은 ACTIVE뿐 아니라 같은 Job의 `INVALIDATED`와 `SUPERSEDED`도 각각 1개로 제한해 승인 이력 보존을 깨뜨린다.

### index

| index | 예상 query | 채택 판단 |
| --- | --- | --- |
| `[jobId, status]` | 특정 Job의 ACTIVE 후보 조회 | 권장 |
| `[status]` | 전체 ACTIVE/무효화 운영 조회 | 실제 query가 있으면 채택 |
| `[supersedesApprovalId]` | 재승인 chain 역추적 | 권장 후보 |
| `[finalApprovedAt]` | 승인 시간순 감사 조회 | 권장 후보 |
| `[validationExpiresAt]` | 만료 후보 조회 | Scheduler 도입 시 유용하나 조기 index 여부 검토 |
| `[finalApprovalId, included]` | 승인 범위 포함/제외 조회 | 권장 |
| `[jobItemId]` | 특정 원본 Item의 승인 이력 | 권장 후보 |

index는 쓰기·저장 비용을 증가시키므로 “있으면 편리함”이 아니라 실제 승인/API/감사 query와 실행계획을 근거로 최종 선택한다.

## Job당 ACTIVE 최대 1개 보장 방식

현재 schema와 설치 상태에서 조건부 unique가 검증된 형태로 사용되고 있지 않다. 이 초안은 특정 Prisma partial-index 문법이 작동한다고 가정하지 않는다. 실제 schema 변경 승인 후 설치된 Prisma `7.8.0` CLI로 별도 검증해야 한다.

### 선택지 1: Prisma native partial unique

Prisma `@@unique`에 status 조건을 선언할 수 있는지 해당 버전의 schema parser, migration 출력과 PostgreSQL 결과를 disposable 개발 환경에서 검증한다.

- 장점: schema에 의도가 드러나고 drift 관리가 단순할 수 있음
- 위험: 지원 상태나 preview/GA 조건을 잘못 가정하면 validate 또는 migration이 실패함
- 조건: 공식 지원 문법, 생성 SQL, introspection 왕복과 Client 생성까지 확인

검증 전에는 문서 코드 블록에 가상의 `where` 문법을 넣지 않는다.

### 선택지 2: PostgreSQL partial unique raw SQL

Prisma가 요구사항을 직접 표현하지 못하면 승인된 migration에 다음 의미의 index를 수동 SQL로 추가하는 방안을 우선 검토한다.

```sql
-- 문서용 후보이며 실행하지 않는다.
CREATE UNIQUE INDEX "NaverApiBatchFinalApproval_one_active_per_job"
ON "NaverApiBatchFinalApproval" ("jobId")
WHERE "status" = 'ACTIVE';
```

- 장점: 동시 transaction에서도 DB가 최종 불변식을 강제함
- 위험: Prisma schema만 읽으면 조건부 제약이 보이지 않을 수 있고 migration/introspection/drift 관리가 필요함
- 조건: 실제 enum SQL 표현, 이름 길이, 기존 데이터, lock과 rollback을 migration 리뷰에서 확인

### 선택지 3: 애플리케이션 검증과 잠금

승인 생성 transaction에서 ACTIVE를 조회하고 없을 때 insert한다.

- 단순한 “조회 후 insert”는 race condition 때문에 충분하지 않다.
- Serializable isolation, Job row lock 또는 transaction-scoped advisory lock처럼 같은 Job 승인을 직렬화해야 한다.
- DB partial unique가 없으면 버그나 다른 write 경로가 불변식을 우회할 수 있다.
- 애플리케이션 검증은 친절한 오류와 선행 확인을 위해 필요하지만 DB 제약의 대체물보다는 보완책으로 권장한다.

### 권장 결론

**DB partial unique + 애플리케이션 transaction 검증을 함께 사용하는 안**을 우선 권장한다. Prisma native 지원이 실제로 검증되면 native 선언을 사용하고, 그렇지 않으면 승인된 raw SQL migration으로 DB 제약을 둔다. 애플리케이션 단독 보장은 최후의 선택지다.

## relation과 `onDelete` 정책

| 관계 | 후보 | 근거 |
| --- | --- | --- |
| Approval → Job | `onDelete: Restrict` | 승인 원본 Job 삭제 방지 |
| Approval Item → Approval | `onDelete: Restrict` | scope의 독립 유실 방지 |
| Approval Item → Job Item | `onDelete: Restrict` | 승인 대상 원본 Item 삭제 방지 |
| Approval → supersedes Approval | `onDelete: Restrict` | 재승인 chain 단절 방지 |

신규 승인 관계에는 `Cascade`를 사용하지 않는 것을 권장한다. Job, Approval 또는 Job Item 삭제가 승인 권한·감사 근거까지 조용히 지우면 안 된다.

현재 Job → Job Item은 `Cascade`다. Approval Item이 Job Item을 `Restrict`로 참조하면 승인 이력이 있는 Job 삭제 시 cascade가 Item을 지우려다 FK에 의해 전체 delete가 실패하는 것이 기대되는 안전 동작이다. 다만 기존 삭제 API나 운영 정리 작업이 이 동작을 오류로 처리할 수 있으므로 schema 적용 전에 영향 분석이 필요하다.

hard delete가 법적 보존기간 만료 등으로 필요하면 일반 relation cascade가 아니라 별도 승인된 보존 정책과 삭제 순서를 사용한다.

## `updatedAt` 제외와 lifecycle 변경

### `updatedAt`을 제외하는 이유

- Approval의 승인 내용과 Approval Item scope는 생성 후 바뀌지 않아야 한다.
- `@updatedAt`은 일반 update가 정상이라는 인상을 주고, 무엇이 왜 바뀌었는지 설명하지 못한다.
- 감사에는 포괄적인 최종 수정시각보다 `invalidatedAt/By/Reason`과 supersession relation이 더 정확하다.
- Item 모델은 lifecycle mutation도 없으므로 `createdAt`만 둔다.

### append-only와 무효화의 관계

이 초안의 append-only는 **내용 불변성**을 뜻한다. 승인자, snapshot, hash, scope와 Item 행을 수정하지 않는다. 반면 무효화는 artifact 내용을 교정하는 일이 아니라 “이 권한을 더 이상 사용할 수 없음”을 기록하는 제한적 lifecycle 전이다.

허용 후보 변경은 다음으로 제한한다.

- `status`: `ACTIVE` → `INVALIDATED` 또는 `SUPERSEDED`
- `invalidatedAt`
- `invalidatedBy`
- `invalidationReason`

이 네 필드는 하나의 transaction에서 최초 한 번만 설정하고 되돌리거나 재수정하지 않는다. 재승인은 기존 내용을 update하지 않고 새 Approval과 전체 Item scope를 insert한다. 따라서 “내용 append-only + 단방향 lifecycle 전이”로 정의하면 충돌하지 않는다.

다만 DB row 전체가 물리적으로 insert-only인 엄격한 감사를 요구하면 lifecycle event를 제3 모델로 분리해야 한다. 이 초안은 2모델 범위의 현실적 절충안이며 강제 방식은 아직 승인되지 않았다.

## 적용 전 필수 검증 항목

- 신규 enum 값과 상태 전이 확정
- `executionScope`를 JSON 요약으로 둘지 enum+scalar로 분해할지 최종 결정
- `hashSpec` JSON schema와 hash test vector 확정
- 복합 FK의 무결성 이득과 중복 unique index 비용 비교
- Prisma native partial unique 지원을 설치 버전으로 검증
- raw SQL을 쓰면 migration, introspection와 drift 관리 방식 승인
- `included`/`excludedReason` CHECK 제약 여부 결정
- 모든 `onDelete: Restrict`와 기존 Job Item cascade 영향 확인
- 기존 `APPROVED` Batch backfill 없음 정책 승인
- rollback, DB lock, index 생성 시간과 저장 용량 검토
- schema 변경과 migration 생성에 대한 각각의 사용자 명시 승인

## 결론

이 초안은 별도 승인 헤더와 Item scope 모델, 신규 승인 status enum, Job별 version unique, 엄격한 같은 Job 복합 FK, 신규 관계의 `Restrict`, 64자리 SHA-256 hex와 versioned JSON 계약을 우선 후보로 제시한다. Job당 ACTIVE 최대 1개는 일반 복합 unique로 해결하지 않고, 검증된 Prisma native partial unique 또는 승인된 PostgreSQL raw SQL 제약과 애플리케이션 transaction 검증을 함께 사용하는 방향을 권장한다.

**이 문서는 schema 변경 초안일 뿐, 실제 schema 변경 승인이 아니다.** `prisma/schema.prisma` 수정, migration 생성과 DB 적용은 변경 전 체크리스트 완료 및 각각의 별도 명시 승인 후에만 진행한다.
