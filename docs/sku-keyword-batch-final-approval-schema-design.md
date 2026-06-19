# SKU Keyword Matching 최종 승인 artifact schema 변경안 상세 설계

## 문서 상태와 범위

이 문서는 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem`을 별도 모델로 두는 Prisma schema **후보안**을 실제 변경 전에 상세화한다. 최종 승인 artifact는 SKU Keyword Matching Batch의 LIVE 실행 권한 원본이므로 모델 관계, Item 범위, hash, 불변성, 감사, 이관 정책을 함께 검토한다.

이번 단계의 산출물은 문서뿐이다. 이 문서는 schema 변경 승인서나 migration 실행 지시가 아니며 Prisma schema, DB, Job/Item status, payload와 외부 시스템을 변경하지 않는다.

관련 문서는 다음과 같다.

- [최종 승인 단계 설계](./sku-keyword-batch-final-approval-design.md)
- [최종 승인 artifact 스키마 필요성 검토](./sku-keyword-batch-final-approval-schema-review.md)
- [실행 직전 사전 검증 설계](./sku-keyword-batch-pre-execution-validation-design.md)
- [payload 변환 설계](./sku-keyword-batch-payload-transform-design.md)

## 현재 Prisma 모델 확인 결과

현재 `prisma/schema.prisma`에는 다음 모델과 enum이 있다.

- `NaverApiBatchJob`: `jobType`, `module`, `status`, `dryRun`, `previewSummary`, `metadata`, `approvedBy`, `approvedAt`, `executedAt`과 집계 필드 보유
- `NaverApiBatchJobItem`: `batchJobId`, `storeId`, 대상 식별자, `targetType`, `targetId`, `operation`, preview/payload, 실행 결과와 status 보유
- `NaverApiCallLog`: 실행 후 개별 외부 호출의 요청·응답·결과 감사 로그이며 선택적으로 Batch Item을 참조
- `NaverApiBatchJobStatus`: `APPROVED`, `EXECUTING` 등 Job lifecycle 표현
- `NaverApiBatchItemStatus`: `READY`, `EXECUTING` 등 Item lifecycle 표현

현재 모델에는 최종 승인 자체, 승인된 Item 집합, 승인 당시 validation snapshot과 hash를 타입 있는 독립 artifact로 보존하는 구조가 없다. `NaverApiBatchJob.metadata`는 prototype 근거 보관에는 사용할 수 있지만 FK, 필수값, Item별 unique, lifecycle 제약이 없어 LIVE 실행 권한 원본으로 사용하지 않는다.

## 설계 결정 요약

1. Job의 검토 상태와 LIVE 실행 권한을 분리한다.
2. 하나의 Job에 재승인 이력을 허용하고 승인 artifact를 append-only로 보존한다.
3. 승인 범위는 Approval Item 행으로 정규화하고 포함·제외 Item을 모두 기록한다.
4. Worker는 유효한 artifact, 정확한 Item scope, validation snapshot과 hash가 모두 일치할 때만 실행 가능하다고 판정한다.
5. 승인 대상이 바뀌면 기존 artifact를 덮어쓰지 않고 무효화 후 새 version을 생성한다.
6. hard delete와 연쇄 삭제를 금지하고 원본 Job/Item과 승인 근거의 추적성을 보존한다.
7. `NaverApiCallLog`는 실행 감사 로그로 유지하며 최종 승인 artifact를 대신하지 않는다.

## 모델 관계

```text
NaverApiBatchJob 1 ── N NaverApiBatchFinalApproval
                              1
                              │
                              N
                    NaverApiBatchFinalApprovalItem N ── 1 NaverApiBatchJobItem
```

- `NaverApiBatchFinalApproval.jobId` → `NaverApiBatchJob.id`
- `NaverApiBatchFinalApprovalItem.finalApprovalId` → `NaverApiBatchFinalApproval.id`
- `NaverApiBatchFinalApprovalItem.jobItemId` → `NaverApiBatchJobItem.id`
- 세 관계의 삭제 동작은 `Restrict`를 우선 후보로 한다. `Cascade`는 LIVE 권한과 감사 근거 보존에 부적합하다.
- Job에는 `finalApprovals`, Job Item에는 `finalApprovalItems` 역관계가 필요하다.

### 같은 Job 소속 보장

단순 FK 세 개만으로는 `Approval.jobId`와 `ApprovalItem.jobItemId`가 가리키는 Item의 `batchJobId`가 같다는 것을 DB가 보장하지 못한다. 다른 Job의 Item을 승인 범위에 섞는 것은 중대한 무결성 오류다.

권장 후보는 Approval Item에 중복된 `jobId`를 추가하고 복합 FK로 같은 Job 소속을 강제하는 방식이다.

- Approval: `@@unique([id, jobId])`
- 기존 Job Item: `@@unique([id, batchJobId])`
- Approval Item → Approval: `[finalApprovalId, jobId]` → `[id, jobId]`
- Approval Item → Job Item: `[jobItemId, jobId]` → `[id, batchJobId]`

이는 기존 모델에도 복합 unique를 추가해야 하므로 migration 설계 시 별도 검증이 필요하다. 채택하지 않는다면 승인 생성 transaction과 Worker에서 소속을 각각 검사해야 하지만, 애플리케이션 검사만 사용하는 안은 차선책이다.

## `NaverApiBatchFinalApproval` 후보

### 핵심 필드

| 필드 | 후보 타입 | null | 역할과 제약 후보 |
| --- | --- | --- | --- |
| `id` | `String @id @default(uuid())` | 불가 | 승인 artifact 식별자 |
| `jobId` | `String` | 불가 | 원본 Job FK |
| `finalApprovedAt` | `DateTime` | 불가 | 인증된 승인 행위 완료 시각 |
| `finalApprovedBy` | `String` | 불가 | 인증 문맥의 안정적인 사용자 ID. 자유 입력 표시명 금지 |
| `finalApprovalMemo` | `String?` | 가능 | 운영 사유. 권한 판정이나 hash의 대체물로 사용하지 않음 |
| `validationSnapshot` | `Json` | 불가 | 승인자가 확인한 재검증 결과의 불변 snapshot |
| `validationSnapshotHash` | `String` | 불가 | canonical validation snapshot hash |
| `payloadHash` | `String` | 불가 | 포함 Item 전체의 승인 payload manifest hash |
| `executionScope` | enum 후보 | 불가 | `ALL_ITEMS` 또는 `PARTIAL_ITEMS` |
| `approvalSource` | enum 후보 | 불가 | `TMS_UI`, `INTERNAL_API` 등 인증된 승인 경로 |
| `createdAt` | `DateTime @default(now())` | 불가 | DB artifact 생성 시각 |
| `updatedAt` | 아래 정책 참고 | 해당 | 불변 artifact에는 제외 권장 |

`finalApprovedAt`은 승인 도메인 시각이고 `createdAt`은 DB 영속화 시각이다. 동일 transaction에서 생성하되 감사와 정렬에서 혼용하지 않는다.

### lifecycle과 재승인을 위한 추가 후보

| 필드 | 후보 타입 | 목적 |
| --- | --- | --- |
| `version` | `Int` | Job별 1부터 증가하는 승인 version |
| `status` | enum 후보 | `ACTIVE`, `INVALIDATED`, `CONSUMED`, `EXPIRED` 구분 |
| `validationExpiresAt` | `DateTime` | JSON 해석 없이 snapshot 만료 차단 |
| `invalidatedAt` | `DateTime?` | 명시적 무효화 시각 |
| `invalidatedBy` | `String?` | 인증된 무효화 주체 |
| `invalidationReason` | `String?` | 무효화 사유 또는 코드 |
| `supersedesApprovalId` | `String?` | 대체하는 직전 승인 self relation |
| `hashAlgorithm` | `String` | 예: `SHA-256` |
| `canonicalizationVersion` | `String` | canonical JSON/manifest 규격 version |

`ACTIVE`에는 무효화 필드가 없어야 하고 `INVALIDATED`에는 시각, 주체, 사유가 있어야 한다. Prisma만으로 조건부 제약을 표현하기 어렵다면 승인된 CHECK 제약 또는 repository의 단일 transaction 규칙이 필요하다.

### `validationSnapshot` 최소 계약

- `schemaVersion`, validator와 canonicalization version
- 검증 대상 Job ID와 승인 후보 Item ID 집합
- 검증 시작·완료·만료 시각과 최신 문맥 조회 시각
- `canExecute`, blocked/stale/risk/warning 요약과 Item별 결과
- 현재값 출처, operation registry와 transformer version
- 검증 당시 Job/Item 및 payload 근거 hash
- 승인자가 확인한 warning code 집합

snapshot은 실행 시 재계산 결과로 덮어쓰지 않는다. Worker는 저장 snapshot의 hash를 다시 계산하고 만료, version, 현재 근거의 유효성을 별도로 확인한다.

## `NaverApiBatchFinalApprovalItem` 후보

| 필드 | 후보 타입 | null | 역할과 제약 후보 |
| --- | --- | --- | --- |
| `id` | `String @id @default(uuid())` | 불가 | 승인 범위 행 식별자 |
| `finalApprovalId` | `String` | 불가 | 최종 승인 artifact FK |
| `jobItemId` | `String` | 불가 | 원본 Job Item FK |
| `targetType` | `String` 또는 enum | 불가 | 승인 당시 대상 종류 snapshot |
| `targetId` | `String` | 불가 | 승인 당시 대상 식별자 snapshot |
| `storeId` | `String` | 불가 | 승인 당시 스토어 식별자 snapshot |
| `operation` | `String` 또는 enum | 불가 | 승인 당시 registry operation key |
| `included` | `Boolean` | 불가 | 실제 실행 승인 범위 포함 여부 |
| `excludedReason` | `String?` | 조건부 | `included=false`일 때 필수, `true`일 때 null |
| `itemPayloadHash` | `String` | 불가 | 해당 Item 승인 payload hash |
| `itemValidationHash` | `String` | 불가 | 해당 Item validation 결과 hash |
| `createdAt` | `DateTime @default(now())` | 불가 | 범위 행 생성 시각 |

복합 FK를 채택하면 `jobId String`을 추가한다. 이 필드는 조회 편의가 아니라 같은 Job 소속을 보장하는 무결성 필드다. Item 모델에는 `updatedAt`을 두지 않는다.

### 포함·제외 범위 불변식

- Job의 모든 Item을 Approval Item으로 snapshot하고 `included`로 구분한다. 포함 Item만 저장하면 명시적 제외와 저장 누락을 구분할 수 없다.
- `ALL_ITEMS`이면 모든 행이 `included=true`여야 한다.
- `PARTIAL_ITEMS`이면 포함 Item과 제외 Item이 각각 1개 이상이어야 한다.
- 포함 Item은 승인 시점에 `READY`이고 blocker/stale/HIGH risk가 없어야 한다.
- 제외 Item의 `excludedReason`은 필수이며 제외를 이유로 원본 status나 payload를 바꾸지 않는다.
- `(finalApprovalId, jobItemId)`는 unique여야 한다.
- 대상 식별자와 operation은 승인 당시 비교용 snapshot이다. Worker는 원본 Item과 다르면 차단한다.

## 후보 Prisma 표현

아래는 관계 검토를 위한 **비실행 초안**이며 현재 schema에 적용하지 않는다. enum, 복합 relation과 DB 제약 지원 여부는 구현 승인 후 설치된 Prisma version으로 다시 검증한다.

```prisma
enum NaverApiBatchFinalApprovalStatus {
  ACTIVE
  INVALIDATED
  CONSUMED
  EXPIRED
}

enum NaverApiBatchExecutionScope {
  ALL_ITEMS
  PARTIAL_ITEMS
}

enum NaverApiBatchApprovalSource {
  TMS_UI
  INTERNAL_API
}

model NaverApiBatchFinalApproval {
  id                      String                            @id @default(uuid())
  jobId                   String
  version                 Int
  status                  NaverApiBatchFinalApprovalStatus @default(ACTIVE)
  finalApprovedAt         DateTime
  finalApprovedBy         String
  finalApprovalMemo       String?
  validationSnapshot      Json
  validationSnapshotHash  String
  validationExpiresAt     DateTime
  payloadHash             String
  executionScope          NaverApiBatchExecutionScope
  approvalSource          NaverApiBatchApprovalSource
  hashAlgorithm           String                            @default("SHA-256")
  canonicalizationVersion String
  invalidatedAt           DateTime?
  invalidatedBy           String?
  invalidationReason      String?
  supersedesApprovalId    String?
  createdAt               DateTime                          @default(now())

  job          NaverApiBatchJob             @relation(fields: [jobId], references: [id], onDelete: Restrict)
  items        NaverApiBatchFinalApprovalItem[]
  supersedes   NaverApiBatchFinalApproval?   @relation("FinalApprovalSupersession", fields: [supersedesApprovalId], references: [id], onDelete: Restrict)
  supersededBy NaverApiBatchFinalApproval[]  @relation("FinalApprovalSupersession")

  @@unique([jobId, version])
  @@unique([id, jobId])
  @@index([jobId, status])
  @@index([status, validationExpiresAt])
  @@index([payloadHash])
  @@index([createdAt])
}

model NaverApiBatchFinalApprovalItem {
  id                 String   @id @default(uuid())
  finalApprovalId    String
  jobId              String
  jobItemId          String
  targetType         String
  targetId           String
  storeId            String
  operation          String
  included           Boolean
  excludedReason     String?
  itemPayloadHash    String
  itemValidationHash String
  createdAt          DateTime @default(now())

  finalApproval NaverApiBatchFinalApproval @relation(fields: [finalApprovalId, jobId], references: [id, jobId], onDelete: Restrict)
  jobItem       NaverApiBatchJobItem       @relation(fields: [jobItemId, jobId], references: [id, batchJobId], onDelete: Restrict)

  @@unique([finalApprovalId, jobItemId])
  @@index([jobId, included])
  @@index([jobItemId])
  @@index([storeId, targetType, targetId])
}
```

이 초안은 기존 Job Item의 `@@unique([id, batchJobId])` 및 양쪽 기존 모델의 역관계를 함께 요구한다. “Job당 ACTIVE 1개”와 `included`/`excludedReason` 조건은 이 Prisma 초안만으로 보장되지 않는다.

## unique와 재승인 정책

### `jobId` 단일 unique 안

`@@unique([jobId])`는 구현이 단순하지만 만료, 무효화, payload 변경 후 재승인 이력을 자연스럽게 남길 수 없다. 기존 행을 수정하게 되어 append-only 원칙도 약해지므로 권장하지 않는다.

### 이력 허용과 active/latest 구분 권장안

- `@@unique([jobId, version])`
- version은 Job별 단조 증가하며 재사용하지 않음
- 동시에 유효한 `ACTIVE` 승인은 Job당 최대 1개
- 새 승인 transaction에서 기존 ACTIVE 승인을 무효화하고 `supersedesApprovalId`로 연결
- latest는 `createdAt`이 아니라 가장 큰 version으로 판정
- 실행 권한은 latest만으로 판정하지 않고 `ACTIVE`, 미만료, 미소비와 hash 일치를 모두 요구

PostgreSQL partial unique index `UNIQUE(job_id) WHERE status = 'ACTIVE'`가 조건을 가장 강하게 보장한다. 설치된 Prisma가 선언을 완전히 표현하지 못하면 승인된 SQL migration과 일반 index를 조합하는 방안을 검토한다. DB 제약 없이 조회 후 insert만 하면 동시 승인 race가 있으므로 transaction 격리, 잠금 또는 advisory lock 계약이 필요하다.

`isActive`는 status와 중복 진실을 만들기 쉬워 권장하지 않는다. Job의 `latestFinalApprovalId` 포인터도 조회는 단순해지나 포인터와 status/version의 원자적 일치가 필요하므로 후속 선택지로 둔다.

## 불변성 및 `updatedAt` 정책

승인자·시각·source·memo, validation snapshot/hash, payload hash와 규격 version, execution scope, 모든 Approval Item 내용은 생성 후 update를 금지한다. 내용이 바뀌면 기존 승인을 무효화하고 재검증한 뒤 새 version과 Item 집합을 생성한다.

Approval과 Approval Item의 내용 필드에는 `updatedAt @updatedAt`을 두지 않는 것을 권장한다. 일반 update 가능성을 암시하고 누가 왜 lifecycle을 바꿨는지 설명하지 못하기 때문이다.

무효화를 같은 Approval 행의 lifecycle 변경으로 허용하면 `status`, `invalidatedAt`, `invalidatedBy`, `invalidationReason`만 제한적으로 변경한다. 일반 `updatedAt` 대신 이 명시적 필드를 감사 기준으로 사용한다. 완전한 append-only가 필요하면 무효화 이벤트를 제3 모델로 분리하는 안이 더 엄격하지만, 이번 2모델 후보에서는 제한된 lifecycle mutation을 절충안으로 둔다. DB 권한, repository API, update trigger 중 어느 수준에서 불변성을 강제할지는 구현 승인 전에 결정한다.

## 무효화 및 삭제 정책

### hard delete

- 승인 artifact와 Approval Item의 hard delete는 운영 보존 기간 동안 금지한다.
- Job/Item도 관련 승인 이력이 있으면 `Restrict`로 삭제를 차단한다.
- 보존 기간 만료 후 물리 삭제가 필요하면 일반 CRUD가 아닌 별도 승인된 보존 정책 작업으로 다룬다.

### 무효화

snapshot 만료, Job/Item/payload/hash 불일치, 현재값·계산 결과·registry/transformer version 변경, 새 blocker/stale/warning, 명시적 취소, 후속 승인 대체, 실행 선점·소비가 발생하면 ACTIVE 승인을 사용할 수 없다.

명시적 무효화에는 `invalidatedAt`, `invalidatedBy`, `invalidationReason`을 기록한다. 시간 경과 만료는 `validationExpiresAt`으로 계산할 수 있으므로 매번 status DB write 없이도 Worker가 차단해야 한다. 무효화된 artifact는 다시 ACTIVE로 되돌리지 않고 새 version을 만든다.

## hash와 canonicalization 계약

- 알고리즘 후보: SHA-256, 소문자 64자리 hexadecimal
- JSON key 정렬, 숫자·null·배열 순서·Unicode 규칙을 version으로 고정
- domain prefix와 schema version을 입력에 포함해 목적이 다른 hash 재사용 방지
- `itemPayloadHash`: target/store/operation, before/after, 요청 후보와 transformer/registry version 포함
- `itemValidationHash`: 해당 Item validation 결과와 근거 version 포함
- `payloadHash`: **포함 Item만** `jobItemId` 순서로 정렬한 manifest의 aggregate hash
- `validationSnapshotHash`: 전체 snapshot canonical form의 hash
- scope manifest: 모든 행의 `(jobItemId, included, excludedReason, itemPayloadHash, itemValidationHash)`를 포함

제외 Item payload는 실행 `payloadHash`에는 포함하지 않되 제외 사실과 사유는 scope manifest 또는 validation snapshot hash에 포함한다. hash 원문 규격, test vector와 version upgrade 정책은 구현 전에 별도 확정한다.

## 생성 transaction 불변식

향후 승인 생성은 하나의 transaction에서 다음을 만족해야 한다. 이번 작업에서는 구현하지 않는다.

1. 대상 Job의 type/module/status와 미종결 상태 확인
2. 모든 Job Item과 validation snapshot을 일관된 기준으로 조회
3. validation 만료와 transformer/registry version 확인
4. Job의 모든 Item에 Approval Item을 정확히 하나씩 구성
5. 같은 Job 소속, 포함/제외 조건과 hash 검증
6. DB unique나 잠금으로 동시 승인 race 차단
7. 기존 ACTIVE 무효화와 새 version 부여
8. Approval과 모든 Item을 원자적으로 생성
9. commit 전 aggregate hash와 저장 행 수 재확인

실패 시 일부 Item이나 기존 승인 lifecycle 변경만 남아서는 안 된다.

## Worker 실행 권한 판정 기준

Worker는 최소한 다음을 모두 확인한다.

- Job/Item status가 실행 계약상 허용됨
- 연결된 승인 중 정확히 하나의 `ACTIVE` artifact 선택
- 미만료, 미무효화, 미소비와 승인자/source 유효성
- Approval의 Job과 모든 Approval Item의 실제 `batchJobId` 일치
- Approval Item 집합이 Job 전체 Item 집합과 누락·중복 없이 일치
- `executionScope`와 `included`/`excludedReason` 불변식 일치
- 포함 Item만 실행하며 호출 직전에 원본 식별자·operation과 snapshot 비교
- validation snapshot, Item validation, payload와 scope hash 재계산 일치
- validator, registry, transformer version과 최신 문맥 정책 충족
- 동일 approval version 또는 Item의 중복 선점·실행이 없음

Job `APPROVED`, Item `READY`, 기존 `approvedAt/approvedBy/dryRun`, `metadata`, `previewSummary`, UI의 Item ID 목록은 단독 권한 근거가 아니다. 실패 시 네이버 API 호출 전에 종료하고 자동 보정·자동 제외 없이 재검증과 재승인을 요구한다.

## migration 및 배포 위험

### 운영 데이터 영향

- 새 테이블은 기존 값을 직접 바꾸지 않지만 복합 unique와 삭제 제한 추가 시 lock, index 생성 시간과 기존 삭제 흐름 영향을 검토해야 한다.
- partial unique, CHECK, trigger는 Prisma schema 밖 DB 제약까지 문서·테스트·migration에 관리해야 한다.
- 큰 snapshot JSON과 Job 전체 Item snapshot은 저장 용량·조회 비용을 늘린다.
- 대량 Item insert와 잠금의 동시성, timeout, 원자성 테스트가 필요하다.

### 기존 `APPROVED` Batch 호환성

- 기존 `APPROVED` Job에는 artifact가 없으며 암묵적으로 승인된 것으로 간주하지 않는다.
- `APPROVED + READY`, 기존 승인 필드나 `dryRun` 조합도 artifact를 대신하지 않는다.
- Worker 도입 시 기존 Batch는 기본적으로 LIVE 실행 불가이며 명시적 재검증·재승인을 요구한다.
- 기존 Batch 조회·검토는 유지하고 schema 추가만으로 status를 변경하지 않는다.

### nullable과 backfill

- 새 테이블 핵심 필드는 non-null이 원칙이다. 기존 테이블에 nullable 승인 필드를 임시 추가하는 안은 중복 진실을 만들기 쉬워 권장하지 않는다.
- 역관계는 DB column이 없어 기존 row backfill이 필요 없다.
- 실제 승인 이력이 없으므로 가짜 승인자·현재시각·빈 snapshot으로 합성 backfill하지 않는다.
- 기존 Job 실행이 필요하면 최신 규칙으로 재검증하고 사용자가 새 승인을 생성해야 한다.
- 복합 unique 추가 전 중복을 read-only 점검하고 index 생성과 lock 영향을 별도 승인받는다.

### 단계적 배포와 rollback

1. schema/migration 별도 리뷰와 백업·용량·lock 계획
2. additive table/index 배포
3. 승인 생성 경로 도입 전 호환성 확인
4. 승인 생성 기능을 실행 기능과 분리해 검증
5. Worker는 artifact 검증 완성과 별도 승인 뒤 활성화

artifact가 생성된 뒤에는 rollback 시 테이블을 즉시 drop하지 않는다. 구버전 코드가 새 권한을 무시해도 LIVE 실행을 허용하지 않도록 배포 순서를 설계한다.

## 후속 승인 전에 확정할 항목

- `dryRun` A/B/C안과 공통 verifier 계약
- 제한적 lifecycle mutation 또는 별도 무효화 이벤트 모델
- Job당 ACTIVE 1개를 보장할 partial unique/잠금 방식
- 같은 Job 소속 복합 FK 채택 여부
- scope/source/status enum 값
- validation snapshot JSON schema와 만료 정책
- hash 명세, test vector와 version upgrade 정책
- 소비·중복 실행 방지 및 실행 Job 연결 방식
- 보존 기간과 hard delete 예외 절차
- migration lock·용량·기존 Batch 재승인 절차

## 이번 단계 결론

`NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem` 별도 모델은 LIVE 실행 권한, 명시적 Item scope, 재승인 이력과 감사 추적을 표현하기 위한 권장 후보다. Job별 version, ACTIVE 1개 제약, 같은 Job 소속 복합 FK, append-only 내용 필드, 명시적 무효화와 versioned hash 계약을 함께 채택해야 모델 분리의 안전 효과가 생긴다.

현재 결론은 **문서 설계만 완료하며 실제 Prisma schema 변경과 migration 생성은 별도 사용자 승인 이후에만 진행**하는 것이다. 최종 승인 API, Worker, Scheduler, 실행 API, status 변경, DB write와 네이버 API 호출도 이번 범위에 포함되지 않는다.
