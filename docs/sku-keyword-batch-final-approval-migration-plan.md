# SKU Keyword Matching 최종 승인 artifact migration 적용 절차

## 문서 목적과 범위

이 문서는 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem` schema 변경의 migration을 **향후 별도 승인 후** 생성·검토·적용·복구하기 위한 절차를 정의한다.

현재 판정은 사용자 명시 승인 전 `NO-GO`다. 이번 작업에서는 문서만 작성하며 다음을 수행하지 않는다.

- `prisma/schema.prisma` 수정
- migration 생성·편집·적용
- NAS PostgreSQL을 포함한 모든 DB 접속·write
- API, Worker, Scheduler 또는 실행 코드 구현
- Job/Item status, payload 또는 운영 데이터 변경

관련 기준 문서는 다음과 같다.

- [schema 변경 승인 요청서](./sku-keyword-batch-final-approval-schema-approval-request.md)
- [Prisma schema 비실행 초안](./sku-keyword-batch-final-approval-prisma-schema-draft.md)
- [schema 변경 의사결정 요약](./sku-keyword-batch-final-approval-schema-decision.md)
- [schema 변경 전 체크리스트](./sku-keyword-batch-final-approval-schema-change-checklist.md)
- [schema 변경안 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)

## 환경별 명령 사용 원칙

migration 생성과 DB 적용을 같은 행위로 취급하지 않는다.

| 환경 | 목적 | 허용 후보 명령 | 금지·주의 |
| --- | --- | --- | --- |
| 격리된 개발 DB | migration 생성과 반복 검증 | 승인 후 `prisma migrate dev --create-only` | 운영·공유 DB URL 사용 금지 |
| 격리된 개발 DB | 검토 완료 migration 시험 적용 | 승인 후 `prisma migrate dev` | SQL 리뷰 전에 적용 금지 |
| staging DB | 운영 전 리허설 | 승인 후 `prisma migrate deploy` | `migrate dev`, 임의 SQL 금지 |
| NAS 운영 PostgreSQL | 승인된 migration 적용 | 최종 승인 후 `prisma migrate deploy` 후보 | `migrate dev`, `db push`, `reset` 절대 금지 |

`prisma.config.ts`는 datasource URL을 `DATABASE_URL`에서 읽는다. 따라서 명령 실행 전에는 실제 문자열을 출력하지 않고 대상이 개발·staging·운영 중 어디인지 별도 안전 절차로 확인해야 한다. “NAS에 접속 가능함”은 migration 생성 또는 적용 승인이 아니다.

NAS PostgreSQL이 운영 또는 공유 DB라면 `npx.cmd prisma migrate dev --name ...`의 대상이 될 수 없다. `migrate dev`는 개발용 migration 생성·개발 DB 적용·drift 확인을 위한 명령으로만 취급한다.

## A. migration 전 승인 조건

### 사용자 승인과 범위

- [ ] 사용자가 실제 `prisma/schema.prisma` 변경을 명시적으로 승인했다.
- [ ] schema 변경 승인 범위에 신규 enum, 신규 모델 2개, 기존 역관계, 복합 unique/index 후보가 정확히 포함되었다.
- [ ] schema diff 리뷰가 끝난 뒤 migration **생성**을 별도로 명시 승인했다.
- [ ] migration 생성과 개발 DB 시험 적용을 구분해 승인했다.
- [ ] staging 적용과 NAS 운영 DB 적용을 각각 별도 승인 대상으로 기록했다.
- [ ] API/Worker 구현과 DB migration 승인을 분리했다.

### NAS PostgreSQL 접속 상태와 환경 식별

- [ ] NAS PostgreSQL이 운영, staging 또는 개발 중 어떤 역할인지 명시했다.
- [ ] host, database, 사용자 권한과 TLS 요구사항을 비밀값 원문 출력 없이 확인할 절차가 있다.
- [ ] 실행 프로세스의 `DATABASE_URL`이 의도한 환경을 가리키는지 이중 확인할 담당자가 정해졌다.
- [ ] 네트워크 연결, 인증, DB version과 migration metadata 조회가 가능한지 read-only로 확인할 계획이 있다.
- [ ] schema 변경 권한과 애플리케이션 DML 권한을 분리할 수 있는지 검토했다.
- [ ] 운영 DB에 shadow database 생성 권한이 필요해지는 `migrate dev`를 사용하지 않음을 확인했다.

### 백업과 복구

- [ ] 적용 직전 일관된 DB backup 또는 NAS snapshot 방식을 확정했다.
- [ ] backup 시각, 보관 위치, 암호화, 보존기간과 접근 권한을 기록한다.
- [ ] backup 파일 존재 확인이 아니라 실제 restore 가능성을 검증했다.
- [ ] 예상 RPO/RTO와 복구 책임자를 정했다.
- [ ] snapshot이 PostgreSQL crash-consistent/application-consistent인지 확인했다.
- [ ] 복구 시 migration 이후의 다른 운영 write가 유실될 수 있음을 승인자가 이해했다.

### 기존 데이터와 운영 영향

- [ ] 기존 `NaverApiBatchJob`, `NaverApiBatchJobItem` 건수와 status 분포를 read-only로 확인한다.
- [ ] 기존 `APPROVED` Job과 `READY` Item은 artifact가 없어 LIVE 실행 불가라는 정책을 확정했다.
- [ ] 합성 backfill을 하지 않는 정책을 확정했다.
- [ ] 기존 Job Item의 `@@unique([id, batchJobId])` 후보가 중복 데이터로 실패하지 않는지 확인한다.
- [ ] 기존 Job → Job Item `Cascade`와 신규 Approval Item → Job Item `Restrict`의 삭제 동작을 검토했다.
- [ ] index 생성 lock, disk 사용량, WAL 증가, replica 지연과 적용 시간대를 검토했다.
- [ ] 적용 중단 기준과 go/no-go 판단자를 정했다.

**승인 게이트 A:** 위 항목이 충족되기 전에는 schema 수정, migration 생성 또는 DB 적용을 시작하지 않는다.

## B. migration 생성 전 확인 명령

다음은 향후 승인된 schema 변경 작업에서 migration 생성 전에 실행할 검증 후보다.

```powershell
git status --short
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd tsc --noEmit
```

확인 기준은 다음과 같다.

- 작업 트리에 예상한 schema·문서 변경만 존재한다.
- 기존 사용자 변경이나 다른 migration 작업이 섞이지 않았다.
- Prisma schema validation이 통과한다.
- Prisma Client 생성 diff가 예상 범위다.
- TypeScript 오류가 새 schema 변경으로 발생하지 않는다.
- `.env`, `DATABASE_URL` 또는 credential을 출력하지 않는다.

추가 read-only 확인 후보는 다음과 같다.

```powershell
git diff -- prisma/schema.prisma
npx.cmd prisma migrate status
```

`prisma migrate status`는 DB에 연결하므로 대상 환경을 확인하고 read-only 조회 승인을 받은 뒤 사용한다. 이번 문서 작업에서는 DB 연결과 `migrate status`를 실행하지 않는다.

## C. 실제 schema 변경 시 후보 절차

각 단계는 앞 단계의 성공이 다음 단계의 자동 승인을 의미하지 않는다.

### 1단계: 승인된 범위로 schema 수정

- 별도 작업에서만 `prisma/schema.prisma`를 수정한다.
- [Prisma schema 초안](./sku-keyword-batch-final-approval-prisma-schema-draft.md)을 출발점으로 사용하되 그대로 복사하지 않는다.
- 신규 enum, 두 모델, 기존 역관계, unique/index와 relation을 승인된 결정에 맞춘다.
- `updatedAt` 제외, hash 길이, JSON 필드와 모든 `onDelete`를 다시 확인한다.

### 2단계: schema 정적 검증

```powershell
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd tsc --noEmit
```

schema 변경만 승인된 단계에서는 이 검증까지 수행할 수 있으나 migration을 생성하지 않는다.

### 3단계: migration 생성 전 diff 리뷰

```powershell
git diff -- prisma/schema.prisma
git diff --check
git status --short
```

리뷰어는 승인되지 않은 기존 모델 변경, default 추가, nullable 완화, relation action 변경과 enum 변경이 없는지 확인한다.

### 4단계: 명시 승인 후 migration 파일 생성

SQL 리뷰 전에 개발 DB에 적용하지 않도록 격리된 개발 환경에서 `--create-only`를 우선 사용한다.

```powershell
npx.cmd prisma migrate dev --name add_final_approval_artifacts --create-only
```

사용자가 요청한 기본 후보 명령은 다음과 같지만, 이는 migration 생성과 개발 DB 적용을 함께 수행할 수 있으므로 SQL 검토 전에는 권장하지 않는다.

```powershell
npx.cmd prisma migrate dev --name add_final_approval_artifacts
```

두 명령 모두 사용자 명시 승인 전에는 실행하지 않는다. NAS 운영·공유 DB를 가리키는 환경에서는 어떤 형태의 `migrate dev`도 실행하지 않는다.

### 5단계: 생성된 migration SQL 리뷰

- 생성된 migration 디렉터리와 `migration.sql`만 우선 검토한다.
- 자동 생성 SQL을 수정해야 한다면 수정 이유, 수동 SQL과 rollback 영향을 별도 리뷰한다.
- ACTIVE partial unique나 CHECK 제약을 raw SQL로 추가할 경우 별도 명시 승인을 받는다.
- 리뷰 완료 전 개발·staging·운영 어느 DB에도 적용하지 않는다.

### 6단계: 생성 결과와 Client 재검증

```powershell
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd tsc --noEmit
git diff --check
git status --short
```

schema, migration SQL과 생성 타입이 같은 결정을 표현하는지 확인한다.

### 7단계: 격리된 개발 DB 시험 적용

검토된 migration을 격리된 개발 DB에만 적용한다. 이 단계도 별도 승인 대상이다.

```powershell
npx.cmd prisma migrate dev
```

시험 적용 후 신규 객체, FK, index, migration history와 애플리케이션 기본 조회를 확인한다. 운영 데이터를 복제한 개발 DB라면 개인정보와 credential 처리 정책을 먼저 확인한다.

### 8단계: staging 리허설

staging은 운영 배포와 같은 방식으로 검증한다.

```powershell
npx.cmd prisma migrate deploy
```

staging에서 lock 시간, migration 소요 시간, 기본 목록 조회, 애플리케이션 구버전/신버전 호환성과 rollback 절차를 리허설한다.

### 9단계: NAS 운영 PostgreSQL 적용

운영 적용 직전에 backup/restore 준비, migration hash, 배포 commit, 대상 DB와 승인 기록을 재확인한다. 최종 사용자 승인 후 승인된 배포 창에서만 다음 운영용 명령을 후보로 사용한다.

```powershell
npx.cmd prisma migrate deploy
```

명령 실행자는 적용 출력과 시작·종료 시각을 보존하되 접속 문자열이나 비밀값을 로그에 남기지 않는다. 적용 중 예상 밖 DDL, 장기 lock 또는 오류가 발생하면 임의 수정을 하지 않고 중단 기준과 복구 계획을 따른다.

이번 문서 작업에서는 위 schema 수정 및 migration 명령을 하나도 실행하지 않는다.

## D. 금지 명령과 행위

### 모든 운영·공유 DB에서 금지

```powershell
npx.cmd prisma migrate reset
npx.cmd prisma db push
npx.cmd prisma migrate dev
```

- `migrate reset`으로 rollback하지 않는다. 전체 schema/data 재생성 위험이 있다.
- `db push`로 migration history를 우회하지 않는다.
- NAS 운영·공유 DB에서 `migrate dev`를 사용하지 않는다.
- 생성 SQL을 검토하지 않은 채 `migrate deploy`하지 않는다.
- `prisma db pull`을 검증 명령처럼 사용해 승인된 schema 파일을 덮어쓰지 않는다.

### 별도 승인 없이 금지

- 임의 SQL 또는 DB write
- 기존 `APPROVED` Batch에 artifact 합성
- 기존 Job/Item status, `dryRun`, payload 또는 mapping 변경
- migration 파일 수동 편집
- `_prisma_migrations` 직접 update/delete
- `prisma migrate resolve` 실행
- table/index/enum 수동 drop 또는 rename
- 운영 DB에서 test row insert
- API, Worker, Scheduler, LIVE adapter 활성화

## E. migration SQL 검토 기준

### 예상되는 신규 객체

- [ ] `NaverApiBatchFinalApprovalStatus` PostgreSQL enum이 `ACTIVE`, `INVALIDATED`, `SUPERSEDED`로 생성된다.
- [ ] `NaverApiBatchFinalApproval` table이 승인된 non-null/nullable/default 규칙으로 생성된다.
- [ ] `NaverApiBatchFinalApprovalItem` table이 승인된 필드와 hash 길이로 생성된다.
- [ ] enum default를 사용한다면 `ACTIVE`가 의도대로 표현된다.
- [ ] `createdAt` 이외의 의미 필드에 임의 default가 추가되지 않는다.

### foreign key와 삭제 정책

- [ ] Approval → Job FK가 `ON DELETE RESTRICT` 또는 PostgreSQL의 동등한 제한 동작이다.
- [ ] Approval Item → Approval FK가 제한 동작이다.
- [ ] Approval Item → Job Item FK가 제한 동작이다.
- [ ] supersedes self relation FK가 제한 동작이다.
- [ ] 신규 FK에 `ON DELETE CASCADE`가 없다.
- [ ] 복합 FK의 column 순서와 referenced unique column 순서가 정확히 일치한다.
- [ ] 기존 Job → Job Item cascade가 승인 artifact 존재 시 전체 Job 삭제를 차단하는지 시험 계획이 있다.

### unique와 index

- [ ] `jobId + version` unique가 생성된다.
- [ ] `finalApprovalId + jobItemId` unique가 생성된다.
- [ ] 복합 FK를 위한 `id + jobId`, `id + batchJobId` unique의 필요성과 중복 index 비용을 승인했다.
- [ ] `jobId + status`, `status`, `supersedesApprovalId`, `finalApprovedAt` 등 승인된 index만 생성된다.
- [ ] index 이름이 충돌하지 않고 PostgreSQL 식별자 길이를 넘지 않는다.
- [ ] 기존 큰 테이블의 index 생성 lock과 소요 시간을 확인했다.

### ACTIVE 최대 1개 partial unique

일반 `UNIQUE(jobId, status)`는 과거 `INVALIDATED`와 `SUPERSEDED` 이력도 status별 한 행으로 제한하므로 사용하지 않는다.

Prisma가 설치 버전에서 조건부 unique를 정확히 생성하는지 확인한다. 생성하지 못하면 다음 의미의 PostgreSQL partial unique를 raw SQL로 추가하는 후보를 별도 승인한다.

```sql
-- 문서용 후보이며 실행하지 않는다.
CREATE UNIQUE INDEX "NaverApiBatchFinalApproval_one_active_per_job"
ON "NaverApiBatchFinalApproval" ("jobId")
WHERE "status" = 'ACTIVE';
```

- [ ] Prisma schema/parser와 migration 출력에서 native partial unique 지원 여부를 검증했다.
- [ ] raw SQL이 필요하면 migration 수동 편집을 별도 승인받았다.
- [ ] raw SQL index가 introspection 또는 drift 검사에서 어떻게 관리되는지 확인했다.
- [ ] 동시 ACTIVE insert가 실제로 unique violation으로 차단되는 시험 계획이 있다.
- [ ] 애플리케이션 transaction 검증과 DB 제약의 오류 처리를 후속 설계에 기록했다.

기존 `NaverApiBatchJobItem`이 크다면 `CREATE UNIQUE INDEX CONCURRENTLY` 필요성을 검토한다. PostgreSQL의 concurrent index는 transaction 제약과 실패 후 invalid index 정리 절차가 있으므로 Prisma 기본 migration transaction과 조합을 임의로 결정하지 않는다. 필요 시 별도 운영 migration 계획과 승인을 작성한다.

### 위험한 DDL과 데이터 변경 부재

- [ ] 기존 table/column/enum의 `DROP`, rename 또는 type rewrite가 없다.
- [ ] 기존 Job/Item column의 nullability 또는 default 변경이 없다.
- [ ] 기존 relation의 `onDelete`를 예상 밖으로 변경하지 않는다.
- [ ] 기존 data를 update/delete하는 SQL이 없다.
- [ ] backfill SQL이 없다.
- [ ] 신규 table 생성 외에 예상하지 않은 `ALTER TABLE`이 없다. 단, 승인된 FK target unique index는 예외로 명시한다.
- [ ] SQL 전체가 additive이며 구버전 애플리케이션이 신규 table을 몰라도 기존 조회를 계속 수행할 수 있다.

**승인 게이트 E:** 생성 SQL이 위 기준을 통과하고 raw SQL을 포함한 최종 diff가 승인되기 전에는 어떤 DB에도 적용하지 않는다.

## F. 적용 후 검증 기준

### Prisma와 migration 상태

```powershell
npx.cmd prisma migrate status
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd tsc --noEmit
```

- [ ] 대상 환경에 승인된 migration만 적용되었다.
- [ ] pending/failed/diverged migration이 없다.
- [ ] Prisma Client 생성과 TypeScript 검사가 통과한다.
- [ ] 관련 신규 타입 import가 예상대로 가능하고 기존 import 오류가 없다.
- [ ] schema 파일이나 migration이 적용 과정에서 예상 밖으로 변경되지 않았다.

### DB 구조 read-only 확인

- [ ] 신규 enum, table, column과 FK가 존재한다.
- [ ] FK delete action이 승인된 제한 동작이다.
- [ ] unique/index와 ACTIVE partial unique가 존재하고 유효하다.
- [ ] 기존 Job/Item row count와 status 분포가 적용 전과 일치한다.
- [ ] 신규 table은 backfill 없음 정책에 따라 비어 있다.
- [ ] 기존 payload와 mapping data가 변경되지 않았다.

구조 확인은 catalog read-only query로 수행하고 결과에 credential이나 payload 원문을 출력하지 않는다. 검증 목적으로 `db push`, 임의 insert 또는 운영 데이터 수정을 하지 않는다.

### 애플리케이션 smoke test

- [ ] 기존 SKU Keyword Matching 목록 화면이 HTTP 200이다.
- [ ] 기존 DRAFT 목록·상세 조회가 HTTP 200이고 내용이 유지된다.
- [ ] 기존 APPROVED 목록·상세 조회가 HTTP 200이고 내용이 유지된다.
- [ ] artifact 없는 기존 APPROVED Batch에 실행 권한이 새로 생기지 않는다.
- [ ] 기존 생성·preview·검토 흐름에 회귀가 없다.
- [ ] 최종 승인 API나 Worker가 아직 없으므로 신규 table에 write가 발생하지 않는다.
- [ ] 실행 버튼, `EXECUTING` 전환 또는 네이버 API 호출이 발생하지 않는다.

HTTP 200만으로 데이터 정합성이 보장되지는 않으므로 응답의 Job ID, status와 Item 수가 적용 전 기준과 일치하는지 함께 확인한다. 실제 URL과 인증 방법은 적용 환경별 runbook에서 확정한다.

이번 문서 작업에서는 migration 적용 후 검증이나 HTTP 요청을 수행하지 않는다.

## G. rollback 및 복구 고려

Prisma Migrate는 일반적인 자동 down migration을 제공하는 것으로 가정하지 않는다. rollback은 “명령 하나”가 아니라 실패 시점과 데이터 존재 여부에 따른 별도 계획이다.

### 적용 전

- 일관된 backup 또는 NAS snapshot과 restore 절차를 준비한다.
- migration 이전 application/schema commit을 기록한다.
- 구버전 애플리케이션이 additive 신규 table을 무시하고 안전하게 동작하는지 확인한다.
- 적용 중단 기준, DB 담당자와 사용자 승인 연락 경로를 확보한다.

### migration 적용 중 실패

- 오류 직후 `migrate reset`, `db push` 또는 임의 SQL을 실행하지 않는다.
- 실제 DB 객체와 `_prisma_migrations` 상태를 read-only로 확인한다.
- migration이 transaction 안에서 전부 rollback되었는지, 일부 객체가 남았는지 확인한다.
- 원인을 수정한 forward recovery 또는 backup restore 중 하나를 별도 승인한다.
- `prisma migrate resolve --rolled-back` 또는 `--applied`는 실제 DB 상태를 교정한 뒤 migration metadata를 맞추는 복구 도구로만 검토하며 별도 명시 승인 없이 실행하지 않는다.

### 적용 성공 후 애플리케이션 rollback

- 신규 table이 비어 있고 구버전이 이를 참조하지 않으면 우선 애플리케이션만 rollback하고 DB 객체는 보존하는 방안을 권장한다.
- migration table/enum/index를 즉시 drop하지 않는다.
- 신규 artifact가 하나라도 생성되었다면 DB schema rollback은 데이터 손실 위험이 있으므로 금지하고 forward fix를 우선 검토한다.
- 실제 제거가 필요하면 별도의 destructive migration, 데이터 보존/export와 사용자 승인을 요구한다.

### backup restore

- restore는 migration뿐 아니라 backup 이후의 다른 운영 write도 되돌릴 수 있다.
- 전체 DB restore, 특정 schema/table restore와 point-in-time recovery 중 지원 범위를 NAS 환경에서 별도 확인한다.
- PostgreSQL logical backup과 NAS volume snapshot의 일관성·복구 시간이 다르므로 하나를 임의로 선택하지 않는다.
- 복구 후 migration history, 기존 Batch row count, 애플리케이션 HTTP와 네이버 API 미호출 상태를 재검증한다.

`migrate reset`은 어떤 rollback 시나리오에서도 사용하지 않는다.

## H. 현재 판정

- 이 문서는 migration 실행 승인이 아니다.
- 사용자 명시 승인 전까지 `prisma/schema.prisma` 변경은 `NO-GO`다.
- schema diff 승인 전 migration 생성은 `NO-GO`다.
- migration SQL과 backup/복구 계획 승인 전 개발·staging·운영 적용은 `NO-GO`다.
- NAS PostgreSQL 적용은 대상 환경 재확인과 최종 사용자 승인 전 `NO-GO`다.
- 최종 승인 API, Worker, Scheduler와 LIVE 실행은 schema 적용 이후에도 별도 승인 대상이다.
- 실제 schema 변경과 migration 작업은 각각 별도 작업으로 분리한다.

## 결론

권장 절차는 승인된 schema 변경 → 정적 검증과 diff 리뷰 → 격리된 개발 DB에서 `migrate dev --create-only`로 SQL 생성 → migration SQL·partial unique·lock 영향 리뷰 → 개발/staging 리허설 → backup/복구 확인 → NAS 운영 DB에 `migrate deploy`로 적용 → read-only 구조·기존 화면 회귀 검증 순서다.

**이 문서는 migration 생성 또는 적용 승인이 아니다. 사용자 명시 승인 전까지 schema 변경과 migration 생성·적용은 모두 NO-GO다.**
