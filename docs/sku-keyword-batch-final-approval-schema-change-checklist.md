# SKU Keyword Matching 최종 승인 artifact schema 변경 전 체크리스트

## 문서 목적

이 문서는 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem` 후보 모델을 실제 Prisma schema와 운영 DB에 반영하기 전에 반드시 확인하고 명시적으로 승인해야 할 항목을 정의한다.

이 체크리스트는 [최종 승인 artifact schema 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)의 구현 전 승인 게이트다. 변경 필요성, 권장안과 현재 NO-GO 판정은 [schema 변경 의사결정 요약](./sku-keyword-batch-final-approval-schema-decision.md)을 따른다. 체크 표시만 남기는 문서가 아니라 각 결정의 근거, 검증 결과, 승인 주체를 추적하기 위한 문서로 사용한다.

이번 작업은 문서 작성만 수행한다. Prisma schema, migration, DB, 코드, Job/Item status, payload와 네이버 API에는 어떠한 변경도 하지 않는다.

## 사용 방법과 완료 기준

각 항목은 다음 상태 중 하나로 기록한다.

- `[ ]`: 미확인 또는 미승인. 하나라도 남아 있으면 schema 변경 진행 불가
- `[x]`: 근거를 확인하고 필요한 승인을 완료함
- `해당 없음`: 사유와 승인자를 함께 기록한 경우에만 완료로 인정

실제 변경 승인 시 아래 정보를 별도 PR 설명 또는 승인 기록에 남긴다.

| 기록 항목 | 값 |
| --- | --- |
| 검토 대상 schema 설계 version/commit | 미정 |
| 대상 환경 | 미정 |
| 운영 DB 포함 여부 | 미정 |
| 검토 일시 | 미정 |
| schema 변경 승인자 | 미정 |
| migration 생성 승인자 | 미정 |
| 운영 배포 승인자 | 미정 |
| rollback 책임자 | 미정 |
| 관련 PR/변경 요청 | 미정 |

## A. 변경 승인 조건

### 명시적 승인

- [ ] 사용자가 `NaverApiBatchFinalApproval` 및 `NaverApiBatchFinalApprovalItem`의 **실제 Prisma schema 변경**을 명시적으로 승인했다.
- [ ] 승인 범위에 신규 enum, 신규 테이블, 기존 Job/Item 역관계, 복합 unique/index가 각각 포함되는지 확인했다.
- [ ] schema 변경 승인과 별개로 **migration 파일 생성**을 명시적으로 승인받았다.
- [ ] migration 생성 승인과 운영 DB 적용 승인을 서로 다른 단계로 구분했다.
- [ ] 최종 승인 API, Worker, Scheduler, 실행 API 구현은 이번 schema 승인에 포함되지 않음을 확인했다.
- [ ] 설계 문서의 미확정 항목이 남아 있다면 각 항목을 확정하거나 이번 변경에서 제외한다는 승인을 기록했다.

### 운영 영향과 rollback

- [ ] 적용 대상 DB 환경과 PostgreSQL version을 확인했다.
- [ ] 운영 데이터 건수, 테이블 크기, 활성 연결, 트래픽 시간대를 확인했다.
- [ ] 새 테이블·index·제약 생성의 예상 실행 시간과 lock 수준을 검토했다.
- [ ] 배포 중 구버전과 신버전 애플리케이션이 공존해도 안전한지 확인했다.
- [ ] migration 실패 시 transaction rollback 가능 범위와 수동 복구 절차를 작성했다.
- [ ] migration 성공 후 애플리케이션 rollback이 필요한 경우 새 artifact를 보존하는 계획을 작성했다.
- [ ] DB 백업 또는 복구 지점, 복구 담당자와 복구 확인 절차를 준비했다.
- [ ] go/no-go 판단자와 중단 기준을 명시했다.

**승인 게이트 A:** 위 항목이 모두 완료되기 전에는 schema 편집이나 migration 생성을 시작하지 않는다.

## B. 기존 데이터 호환성

### 기존 Job과 Item의 기본 해석

- [ ] 기존 `APPROVED` Job에 final approval artifact가 없다는 사실을 정상적인 과거 데이터 상태로 인정한다.
- [ ] artifact가 없는 기존 `APPROVED` Job은 **검토 승인 상태일 뿐 LIVE 실행 권한이 없음**으로 판정한다.
- [ ] 기존 `READY` Item에 Approval Item scope가 없으면 승인된 실행 범위에 포함되지 않은 것으로 판정한다.
- [ ] `APPROVED + READY`, 기존 `approvedAt/approvedBy`, `dryRun`, `metadata`를 final approval artifact의 대체 근거로 사용하지 않는다.
- [ ] schema 추가만으로 기존 Job/Item status, `dryRun`, payload 또는 집계 필드를 변경하지 않는다.
- [ ] artifact가 없는 기존 Batch를 Worker가 실행 불가로 차단하는 계약을 후속 구현 요구사항에 포함한다.
- [ ] 기존 Batch의 조회와 검토 기능은 유지되는지 확인한다.

### backfill 정책

- [ ] 기본 정책을 **기존 데이터 backfill 없음**으로 확정했다.
- [ ] 가짜 승인자, migration 실행 시각, 빈 validation snapshot 또는 임의 hash로 artifact를 합성하지 않는다.
- [ ] 기존 Batch를 실제 실행해야 한다면 최신 규칙으로 재검증하고 사용자가 새 artifact를 승인하도록 한다.
- [ ] backfill이 반드시 필요하다는 요구가 생기면 대상 선정, 근거 데이터, 승인자, 재현 가능성, rollback을 별도 설계하고 별도 승인을 받는다.
- [ ] backfill 승인은 schema/migration 승인에 암묵적으로 포함되지 않음을 확인한다.
- [ ] backfill 도구나 SQL은 별도 승인 전에 작성하거나 실행하지 않는다.

### 호환성 확인 자료

- [ ] 기존 Job의 status별 건수와 `APPROVED` 건수를 read-only query로 확인할 계획이 있다.
- [ ] 기존 `APPROVED` Job의 Item status 분포를 read-only로 확인할 계획이 있다.
- [ ] 기존 데이터에 새 복합 unique를 위반할 가능성이 없는지 read-only 점검 계획이 있다.
- [ ] 실제 query 결과에 비밀값, payload 원문 또는 개인정보를 불필요하게 출력하지 않는 계획이 있다.

**승인 게이트 B:** 기존 Batch를 자동 승인하거나 합성 backfill하는 전환안은 채택하지 않는다. 예외는 별도 설계와 명시적 승인 없이는 허용하지 않는다.

## C. 모델과 관계 확인

### `NaverApiBatchFinalApproval`

- [ ] `jobId`가 `NaverApiBatchJob.id`를 참조하는 1:N 관계임을 확정했다.
- [ ] Job 역관계 `finalApprovals`의 이름과 타입을 확정했다.
- [ ] 핵심 내용 필드의 타입, 길이, null 허용 여부를 확정했다.
- [ ] `version`이 Job별 1부터 단조 증가하고 재사용되지 않는 정책을 확정했다.
- [ ] `status`, `executionScope`, `approvalSource`를 enum으로 둘지 문자열로 둘지 확정했다.
- [ ] `validationSnapshot` JSON schema와 version 규칙을 확정했다.
- [ ] `validationExpiresAt`, hash 알고리즘과 canonicalization version 저장 여부를 확정했다.
- [ ] `supersedesApprovalId` self relation의 null 허용과 삭제 정책을 확정했다.

### `NaverApiBatchFinalApprovalItem`

- [ ] `finalApprovalId`가 Approval을 참조하는 N:1 관계임을 확정했다.
- [ ] `jobItemId`가 `NaverApiBatchJobItem.id`를 참조하는 N:1 관계임을 확정했다.
- [ ] 다른 Job의 Item 혼입을 DB에서 차단하기 위해 Approval Item에 `jobId`를 중복 저장하고 복합 FK를 사용할지 확정했다.
- [ ] 복합 FK를 사용하면 Approval의 `@@unique([id, jobId])`와 Job Item의 `@@unique([id, batchJobId])`가 필요한지 실제 Prisma version으로 검증할 계획이 있다.
- [ ] Job Item 역관계 `finalApprovalItems`의 이름과 타입을 확정했다.
- [ ] `(finalApprovalId, jobItemId)` unique를 확정했다.
- [ ] Job의 모든 Item을 snapshot하고 `included`로 포함·제외를 구분하는 정책을 확정했다.
- [ ] `included=false`이면 `excludedReason` 필수, `included=true`이면 null이라는 조건을 어디서 강제할지 확정했다.

### 삭제 정책

- [ ] Approval → Job 관계의 `onDelete: Restrict`를 확정했다.
- [ ] Approval Item → Approval 관계의 `onDelete: Restrict`를 확정했다.
- [ ] Approval Item → Job Item 관계의 `onDelete: Restrict`를 확정했다.
- [ ] 기존 Job → Job Item의 `onDelete: Cascade`가 승인 artifact 도입 후 야기할 충돌과 삭제 실패 동작을 검토했다.
- [ ] hard delete 금지와 보존 기간 만료 후 예외 절차를 확정했다.
- [ ] `Cascade`로 승인 이력이나 scope가 함께 삭제되는 관계가 없는지 확인했다.

### unique와 index

- [ ] `@@unique([jobId, version])`을 확정했다.
- [ ] Job당 `ACTIVE` 최대 1개를 DB partial unique index로 강제할지 확정했다.
- [ ] Prisma schema가 partial unique를 완전히 표현하지 못할 경우 SQL migration 관리 방식을 확정했다.
- [ ] DB 제약을 사용하지 않는다면 transaction 격리, row/advisory lock 등 동시 승인 race 방지 방식을 확정했다.
- [ ] `@@index([jobId, status])`, 만료 조회 index, Item 조회 index의 실제 query 근거를 확인했다.
- [ ] hash index가 실제 조회에 필요한지 확인하고 불필요한 index는 제외했다.
- [ ] index 이름, PostgreSQL 식별자 길이와 기존 index 이름 충돌을 확인했다.

**승인 게이트 C:** 관계, `onDelete`, unique 및 ACTIVE 단일성 보장 방식이 확정되지 않으면 schema 초안을 구현하지 않는다.

## D. 불변성 및 무효화 정책

### append-only 내용

- [ ] 승인자, 승인 시각, source, memo를 생성 후 수정 금지 대상으로 확정했다.
- [ ] validation snapshot/hash, payload hash, execution scope를 생성 후 수정 금지 대상으로 확정했다.
- [ ] 모든 Approval Item의 포함 여부, 제외 사유, 대상 snapshot과 Item별 hash를 생성 후 수정 금지 대상으로 확정했다.
- [ ] Approval과 Approval Item에서 일반 `updatedAt @updatedAt`을 제외하는 결정을 확정했다.
- [ ] ORM 타입의 `readonly`만으로 불변성을 보장하지 않고 repository, DB 권한 또는 trigger 중 강제 수준을 결정했다.

### 제한적 lifecycle 변경

- [ ] 같은 Approval 행에서 변경 가능한 필드를 `status`, `invalidatedAt`, `invalidatedBy`, `invalidationReason`으로 제한할지 확정했다.
- [ ] `ACTIVE`에는 무효화 필드가 없고 `INVALIDATED`에는 시각·주체·사유가 있다는 불변식을 확정했다.
- [ ] 시간 만료는 `validationExpiresAt`으로 계산하고 status 갱신 DB write 없이도 Worker가 차단하는 정책을 확정했다.
- [ ] `CONSUMED` 의미와 실행 선점·완료 중 어느 시점에 전환하는지 후속 설계 대상으로 기록했다.
- [ ] 무효화된 artifact를 다시 `ACTIVE`로 되돌리지 않는 정책을 확정했다.
- [ ] 감사 요구가 더 엄격하면 별도 무효화 이벤트 모델로 분리할지 결정했다.

### 재승인

- [ ] 변경된 내용은 기존 artifact 수정이 아니라 새 Approval과 새 Approval Item 집합으로 생성한다.
- [ ] 새 version은 이전 최대 version보다 정확히 1 증가시키는지, 결번을 허용하는지 확정했다.
- [ ] 새 승인과 기존 ACTIVE 무효화를 하나의 transaction으로 처리하는 정책을 확정했다.
- [ ] `supersedesApprovalId`가 같은 Job의 이전 approval만 가리키도록 강제하는 방식을 확정했다.
- [ ] 동시에 유효한 ACTIVE artifact는 Job당 최대 1개임을 확정했다.
- [ ] latest version과 ACTIVE artifact를 같은 개념으로 오인하지 않도록 조회 계약을 확정했다.

**승인 게이트 D:** 불변 내용과 변경 가능한 lifecycle 필드의 경계가 코드·DB 수준에서 설명 가능해야 한다.

## E. migration 위험과 실행 전 확인

### 신규 테이블과 컬럼

- [ ] 신규 테이블 2개 및 필요한 enum의 생성 순서와 의존 관계를 검토했다.
- [ ] 모든 핵심 필드는 신규 row 기준 non-null을 원칙으로 검토했다.
- [ ] nullable 필드는 실제 lifecycle상 값이 존재하지 않는 상태가 있는 경우에만 허용했다.
- [ ] `createdAt`, UUID 등 기술 default만 사용하고 승인자, 승인 시각, hash, snapshot에는 의미를 숨기는 default를 두지 않는다.
- [ ] enum default `ACTIVE`가 안전한지, 명시적 값 입력을 강제할지 검토했다.
- [ ] 큰 JSON과 Item snapshot 증가량을 기준으로 저장 용량을 산정했다.

### index, 제약과 lock

- [ ] 기존 Job Item 복합 unique 생성 전에 실제 중복 가능성을 read-only로 확인한다.
- [ ] index 생성 시 테이블 lock, 쓰기 차단, 소요 시간과 disk 여유 공간을 확인한다.
- [ ] 운영에서 concurrent index가 필요하면 Prisma 자동 migration과의 조합 및 transaction 제약을 검토한다.
- [ ] partial unique, CHECK, trigger 등 수동 SQL이 있다면 Prisma schema와 drift가 생기지 않는 관리 방식을 정한다.
- [ ] FK 생성과 검증이 기존 Job/Item 삭제 및 동시 쓰기에 미치는 영향을 검토한다.
- [ ] migration 전후 `EXPLAIN` 또는 query 성능 확인이 필요한 조회를 정한다.

### `migrate dev` 전 확인

- [ ] `prisma migrate dev`는 사용자 명시 승인 전 실행하지 않는다.
- [ ] `prisma migrate dev`는 개발용 disposable DB에만 사용하며 운영 DB 또는 운영 DB를 가리킬 가능성이 있는 환경에서는 실행하지 않는다.
- [ ] 실행 전 대상 DB 식별 정보를 원문 노출 없이 확인하고 운영 DB가 아님을 재확인한다.
- [ ] 현재 migration history, drift, pending migration과 작업 트리 상태를 read-only로 확인한다.
- [ ] 생성될 migration 이름과 포함 범위를 사전에 합의한다.
- [ ] 생성 직후 SQL을 리뷰하고 예상 밖 drop, alter, data rewrite, cascade가 없는지 확인한다.
- [ ] migration 생성과 적용을 분리할 수 있는 안전한 절차를 선택한다.
- [ ] 운영 적용은 승인된 배포 절차와 `prisma migrate deploy` 등 운영용 방식으로 수행하며 별도 승인을 받는다.
- [ ] `prisma db push`, reset 또는 shadow DB 오설정으로 운영 DB를 변경하지 않도록 확인한다.

### rollback과 검증

- [ ] 적용 전 backup/restore 검증 또는 동등한 복구 수단을 확인한다.
- [ ] migration 중간 실패 시 남을 수 있는 enum, table, index를 확인한다.
- [ ] 적용 후 schema introspection, Prisma validate/generate, 타입 검사 계획이 있다.
- [ ] 새 artifact가 생성된 후에는 rollback 목적으로 테이블을 즉시 drop하지 않는 정책을 확정했다.
- [ ] 구버전 애플리케이션으로 rollback해도 artifact 없는 Batch가 LIVE 실행되지 않음을 확인한다.

**승인 게이트 E:** migration SQL, lock 영향, 대상 환경, rollback과 검증 계획이 리뷰되기 전에는 어떤 DB에도 migration을 적용하지 않는다.

## F. 구현 순서 초안

각 단계는 앞 단계 완료를 확인하고 별도 범위와 승인을 받아 진행한다.

1. [ ] **schema 변경 PR/커밋:** 모델, enum, relation, unique/index와 migration 전략만 리뷰한다. 실제 변경 시작 전에 명시적 승인을 받는다.
2. [ ] **Prisma generate/type 확인:** 승인된 schema 기준 `prisma validate`, `prisma generate`, `tsc --noEmit`을 실행하고 생성 diff를 검토한다.
3. [ ] **read-only 조회 타입 반영:** artifact 존재 여부와 이력을 조회하는 최소 타입/서비스를 별도 코드 리뷰로 추가한다. DB write는 포함하지 않는다.
4. [ ] **최종 승인 API 설계:** 인증, transaction, hash, validation, 동시성, idempotency와 오류 계약을 문서로 먼저 확정한다.
5. [ ] **최종 승인 API 구현:** 별도 사용자 승인 후에만 Approval 생성·무효화 write를 구현한다. 네이버 API 호출은 포함하지 않는다.
6. [ ] **Worker 구현:** 실행 권한 검증, 선점, 중복 실행 방지, 실패 복구가 별도 승인된 뒤 더 나중에 구현한다.
7. [ ] **실행 API/Scheduler/LIVE adapter:** 각각 별도 설계와 사용자 승인 후 진행하며 Worker 구현 승인에 자동 포함하지 않는다.

단계 간 승인 없이 schema 변경에서 실행 기능까지 한 PR 또는 한 배포로 확장하지 않는다.

## G. 이번 문서 작업의 절대 금지 확인

- [x] Prisma schema를 수정하지 않는다.
- [x] migration을 생성하거나 실행하지 않는다.
- [x] `prisma migrate dev`, `prisma db push`, reset을 실행하지 않는다.
- [x] DB write, backfill 또는 운영 데이터 변경을 하지 않는다.
- [x] 최종 승인 API나 실행 API를 구현하지 않는다.
- [x] Worker, Scheduler 또는 LIVE adapter를 구현하지 않는다.
- [x] Batch 실행 버튼을 생성하지 않는다.
- [x] Job/Item status, `dryRun` 또는 payload를 변경하지 않는다.
- [x] `EXECUTING`으로 전환하지 않는다.
- [x] 네이버 API 요청 코드를 작성하거나 실제 호출하지 않는다.
- [x] manual-apply, keyword-apply, staging-import/apply를 실행하지 않는다.
- [x] 운영 매핑 테이블을 변경하지 않는다.
- [x] `.env` 또는 `DATABASE_URL` 원문을 출력하지 않는다.

이 절은 이번 문서 작업의 범위 준수를 확인한다. 미래 schema 변경 승인을 의미하지 않는다.

## 최종 go/no-go 확인

- [ ] A~F의 모든 필수 항목이 완료되었다.
- [ ] `해당 없음` 항목마다 사유와 승인자가 기록되었다.
- [ ] schema 설계의 미확정 결정이 모두 해소되었다.
- [ ] schema 변경과 migration 생성에 대한 사용자 명시 승인이 각각 기록되었다.
- [ ] 운영 영향, migration SQL과 rollback 계획의 담당 리뷰가 완료되었다.
- [ ] 기존 Batch 실행 차단과 backfill 없음 정책이 확정되었다.
- [ ] schema 변경 PR의 정확한 범위와 제외 범위가 합의되었다.

최종 판정: **NO-GO — 별도 명시 승인 전**

## 결론

이 체크리스트는 모델 모양만 확인하는 목록이 아니라 기존 데이터의 실행 권한 해석, DB 무결성, 동시 승인, append-only 감사, migration과 rollback을 함께 승인하기 위한 안전 게이트다.

**이 체크리스트가 완료되기 전에는 schema 변경을 진행하지 않는다.** 체크리스트 완료 후에도 schema 변경, migration 생성, 운영 적용, API와 Worker 구현은 각각 합의된 범위와 별도 승인에 따라 진행한다.
