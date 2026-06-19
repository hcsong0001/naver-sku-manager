# SKU Keyword Matching 최종 승인 artifact schema 변경 승인 요청서

## 문서 목적

이 문서는 SKU Keyword Matching의 실제 실행 권한을 안전하게 기록하기 위한 데이터 구조 변경을 진행해도 되는지 사용자에게 승인을 요청하는 문서다.

이 요청서의 승인 대상은 다음 단계의 **Prisma schema 수정과 검토용 migration SQL 생성**까지다. NAS PostgreSQL 적용, 최종 승인 API, Worker, Scheduler, 실행 버튼과 네이버 API 호출은 승인 범위에 포함되지 않는다.

현재 실제 schema와 DB는 변경되지 않았다. 현재 판정은 **NO-GO — 사용자 명시 승인 전**이다.

## 한눈에 보는 승인 요청

| 항목 | 내용 |
| --- | --- |
| 승인받으려는 것 | 최종 승인 기록용 enum 1개와 모델 2개를 Prisma schema에 추가하고, 검토용 migration SQL을 생성하는 별도 작업 |
| 지금까지 실제 변경 여부 | 없음. 문서 설계와 검증만 완료 |
| 승인 후 첫 결과물 | `schema.prisma` 변경 diff와 아직 DB에 적용하지 않은 migration SQL |
| 이번 승인에 포함되지 않는 것 | NAS DB 적용, DB 데이터 입력, API·Worker·Scheduler 구현, 실행 버튼, 네이버 API 호출 |
| DB 적용 시점 | 생성된 migration SQL, 백업·복구 계획과 영향도를 다시 보고하고 별도 승인받은 뒤 |
| 현재 판정 | `NO-GO` |

근거 문서는 다음과 같다.

- [schema 변경 의사결정 요약](./sku-keyword-batch-final-approval-schema-decision.md)
- [Prisma schema 비실행 초안](./sku-keyword-batch-final-approval-prisma-schema-draft.md)
- [migration 생성·검토·적용 절차](./sku-keyword-batch-final-approval-migration-plan.md)
- [schema 변경 전 체크리스트](./sku-keyword-batch-final-approval-schema-change-checklist.md)

## A. 승인 요청 요약

### 무엇을 승인받으려는가

다음 별도 작업을 진행해도 되는지 승인받고자 한다.

1. 합의된 후보안을 기준으로 `prisma/schema.prisma`를 수정한다.
2. schema validation과 TypeScript 검증을 수행한다.
3. 격리된 개발 환경에서 migration을 **SQL 생성 전용 방식**으로 만든다.
4. 생성된 migration SQL과 전체 diff를 사용자에게 다시 보고한다.

이 단계에서는 migration을 NAS PostgreSQL에 적용하지 않는다.

### 아직 하지 않은 것

- Prisma schema를 수정하지 않았다.
- migration 파일을 생성하지 않았다.
- DB에 연결하거나 write하지 않았다.
- 기존 Batch, status와 payload를 변경하지 않았다.
- 실행 기능이나 네이버 API 호출 코드를 구현하지 않았다.

### 승인 후에도 바로 실행 기능으로 가지 않는 이유

schema는 실행 권한을 안전하게 담을 그릇일 뿐 실제 실행 기능이 아니다. schema와 migration이 검토·적용된 뒤에도 다음은 각각 별도 설계와 명시 승인이 필요하다.

- 최종 승인 API의 인증과 권한
- 승인 생성·무효화 transaction
- Worker의 권한 검사와 중복 실행 방지
- Scheduler와 실행 API
- LIVE adapter와 네이버 API 호출

따라서 이번 승인이 실제 가격·재고·키워드 반영으로 곧바로 이어지지 않는다.

## B. 변경 목적

### 현재 상태만으로 부족한 점

현재의 Job `APPROVED`와 Item `READY`는 사용자가 검토를 마쳤다는 workflow 상태다. 현재 설계상 Job은 여전히 `dryRun=true`이고 최종 실행 승인자·시각도 별도 근거로 고정되지 않는다.

이 상태만으로는 다음을 확실하게 증명하기 어렵다.

- 누가 언제 실제 실행을 최종 승인했는가
- 사용자가 승인한 정확한 Item 범위는 무엇인가
- 제외된 Item과 제외 사유는 무엇인가
- 승인자가 확인한 최신 재검증 결과는 무엇인가
- 승인 당시 payload와 실행 대상 payload가 같은가
- 기존 승인이 무효화되거나 새 승인으로 대체되었는가

### 필요한 안전 경계

최종 승인 artifact를 별도로 두면 다음 정보를 하나의 변경 불가 근거로 보존할 수 있다.

- 최종 승인자와 승인 시각
- 승인한 Item 범위와 제외 범위
- 승인 직전 validation snapshot
- payload와 Item별 hash
- 승인 version과 이전 승인 대체 관계
- 유효·무효 상태와 무효화 사유

향후 Worker는 Job/Item status만 보지 않고 이 artifact까지 검증해야 한다. workflow 상태와 실제 실행 권한을 분리하는 것이 이번 변경의 핵심 목적이다.

## C. 추가 예정 후보

### enum 1개

`NaverApiBatchFinalApprovalStatus`

| 값 | 쉬운 의미 |
| --- | --- |
| `ACTIVE` | 현재 유효성 검사의 대상이 될 수 있는 승인 |
| `INVALIDATED` | 취소 또는 조건 변경으로 무효화된 승인 |
| `SUPERSEDED` | 더 최신 version의 승인으로 대체된 승인 |

`ACTIVE`만으로 즉시 실행되는 것은 아니다. 만료, Item 범위, hash와 validation 결과를 모두 확인해야 한다.

### 모델 2개

| 모델 | 역할 |
| --- | --- |
| `NaverApiBatchFinalApproval` | 승인자, 시각, version, validation snapshot, payload hash와 무효화 정보를 보관하는 승인 헤더 |
| `NaverApiBatchFinalApprovalItem` | 승인에 포함·제외된 각 Job Item과 사유, Item별 hash를 보관하는 범위 명세 |

### 함께 적용할 원칙

- Job당 동시에 유효한 `ACTIVE` 승인은 최대 1개다.
- 재승인은 기존 승인을 덮어쓰지 않고 새 version으로 만든다.
- 새 승인은 `supersedesApprovalId`로 대체한 이전 승인을 연결한다.
- 승인 내용과 Item 범위는 생성 후 수정하지 않는다.
- 일반 `updatedAt`은 두 모델에서 제외하는 방향이다.
- 무효화가 필요하면 `invalidatedAt`, `invalidatedBy`, `invalidationReason` 같은 lifecycle 필드만 제한적으로 변경한다.
- 승인 관계 삭제는 `Restrict` 방향으로 두고 승인 이력을 함께 지우는 `Cascade`는 사용하지 않는다.
- Job당 ACTIVE 최대 1개는 DB partial unique와 애플리케이션 transaction 검증을 함께 사용하는 방향을 권장한다.
- JSON `metadata`를 LIVE 실행 권한의 원본으로 사용하지 않는다.

실제 필드와 제약 문법은 schema diff와 migration SQL 리뷰에서 다시 확인한다.

## D. 변경 후에도 하지 않는 것

이번 schema 변경 및 migration SQL 생성 승인에는 다음 작업이 포함되지 않는다.

- [ ] NAS PostgreSQL에 migration 적용
- [ ] DB row 생성 또는 기존 데이터 변경
- [ ] 기존 `APPROVED` Batch에 승인 artifact 자동 생성
- [ ] 가격·재고·키워드 실제 반영
- [ ] 네이버 API 요청 또는 호출
- [ ] 최종 승인 API 구현
- [ ] Worker 구현 또는 실행
- [ ] Scheduler 구현 또는 실행
- [ ] 실행 API 생성
- [ ] Batch 실행 버튼 생성
- [ ] Job/Item status 변경
- [ ] `EXECUTING` 전환
- [ ] LIVE adapter 구현
- [ ] 기존 payload 또는 운영 mapping 변경

schema 변경은 실행 기능을 활성화하지 않는다. 신규 table은 API가 별도 승인·구현되기 전까지 write되지 않아야 한다.

## E. 주요 위험과 대응

| 위험 | 의미 | 대응 방향 |
| --- | --- | --- |
| migration 생성 또는 적용 실패 | schema와 DB 상태가 기대와 달라질 수 있음 | 생성은 개발 환경에서 `--create-only`, SQL 리뷰 후 단계별 적용 |
| NAS PostgreSQL lock·용량 영향 | index/FK 생성 중 대기 또는 성능 영향 가능 | 데이터 규모·lock·WAL·적용 시간 검토와 배포 창 확보 |
| backup 복구 불가 | 실패 시 안전하게 되돌리지 못할 수 있음 | 적용 직전 일관된 backup과 restore 가능성 확인 |
| 기존 `APPROVED` Batch 오해 | 과거 Batch가 새 실행 권한을 얻은 것으로 오인 가능 | artifact가 없으면 LIVE 실행 불가, 합성 backfill 금지 |
| ACTIVE 승인 중복 | 동시 승인 두 개가 유효해질 수 있음 | DB partial unique와 application transaction 검증 병행 |
| 승인 이력 삭제 | Job/Item 삭제가 승인 근거까지 제거할 수 있음 | 신규 관계 `Restrict`, `Cascade` 금지 방향 |
| raw SQL 관리 | Prisma가 partial unique를 직접 표현하지 못할 수 있음 | raw SQL 필요 시 별도 승인과 drift 검토 |
| rollback 오해 | reset 한 번으로 안전하게 복구할 수 있다고 오인 | `migrate reset` 금지, backup restore 또는 forward recovery 계획 |

### 기존 데이터 호환성

- 기존 `APPROVED` Job과 `READY` Item은 그대로 유지한다.
- schema 변경만으로 기존 status, `dryRun`, payload를 바꾸지 않는다.
- 기존 Batch에는 artifact를 자동 backfill하지 않는다.
- 기존 목록과 상세 화면은 계속 조회 가능해야 한다.
- artifact가 없는 기존 Batch는 향후 Worker가 생겨도 LIVE 실행 불가가 기본이다.

### rollback 원칙

- `prisma migrate reset`으로 rollback하지 않는다.
- 적용 전 NAS PostgreSQL backup/restore 방식을 별도 확인한다.
- migration 적용 중 실패하면 DB 상태와 migration history를 먼저 확인하고 forward recovery 또는 backup restore를 별도 승인한다.
- 적용 후 신규 artifact가 생성되었다면 table을 drop하지 않고 forward fix를 우선한다.
- 애플리케이션만 되돌릴 수 있다면 신규 DB 객체는 우선 보존한다.

## F. 승인 전 필수 확인

다음이 확인되기 전에는 schema 변경 작업을 시작하지 않는다.

- [ ] 현재 문서 변경을 정리해 Git 작업 상태가 clean이다.
- [ ] 승인 대상 schema 범위와 제외 범위가 명확하다.
- [ ] 사용자에게 schema 수정과 migration SQL 생성 권한을 명시적으로 받았다.
- [ ] migration 생성은 격리된 개발 DB에서 `--create-only`로 수행한다.
- [ ] NAS PostgreSQL을 `migrate dev` 대상으로 사용하지 않는다.
- [ ] 생성된 migration SQL을 DB 적용 전에 사용자에게 다시 보고한다.
- [ ] NAS DB 역할, 접속 상태와 적용 권한을 비밀값 출력 없이 확인할 계획이 있다.
- [ ] NAS PostgreSQL backup과 restore 방법을 확인한다.
- [ ] 기존 데이터 영향과 backfill 없음 정책을 확인한다.
- [ ] ACTIVE partial unique, FK `Restrict`, index와 위험한 ALTER를 SQL에서 확인한다.
- [ ] DB 적용은 migration SQL·backup·rollback 계획 검토 후 별도 승인받는다.

### 단계별 승인 경계

| 단계 | 이번 요청서 승인으로 허용되는가 |
| --- | --- |
| Prisma schema 수정 | 명시 승인 문구가 있으면 허용 |
| 검토용 migration SQL 생성 | 명시 승인 문구가 있으면 허용 |
| 개발 DB 시험 적용 | 불가, 별도 승인 필요 |
| staging 적용 | 불가, 별도 승인 필요 |
| NAS 운영 DB 적용 | 불가, 별도 승인 필요 |
| API/Worker 구현 | 불가, 별도 승인 필요 |
| 네이버 API 호출 | 불가 |

## G. 승인 문구 예시

다음과 같은 명시적 승인 문구가 있어야 다음 별도 작업으로 넘어갈 수 있다.

> 최종 승인 artifact schema 변경을 진행해도 됩니다. 단, migration SQL 생성 후 적용 전 다시 보고해 주세요.

승인 범위를 더 명확히 하려면 다음 문구를 권장한다.

> `NaverApiBatchFinalApprovalStatus`, `NaverApiBatchFinalApproval`, `NaverApiBatchFinalApprovalItem`의 Prisma schema 수정과 검토용 migration SQL 생성까지 승인합니다. migration은 DB에 적용하지 말고, 생성된 schema diff와 migration SQL, 위험 검토 결과를 보고한 뒤 적용 승인을 다시 받아 주세요. API, Worker와 네이버 API 호출은 승인하지 않습니다.

### 승인 문구가 허용하는 것

- 합의된 범위의 `prisma/schema.prisma` 수정
- `prisma validate`, `prisma generate`, TypeScript 검증
- 격리된 개발 환경에서 `migrate dev --create-only` 방식의 migration SQL 생성
- 생성된 schema/migration diff 검토와 보고

### 승인 문구가 허용하지 않는 것

- 생성된 migration의 개발·staging·NAS DB 적용
- raw SQL 추가 또는 변경이 필요한 경우의 자동 승인
- DB row write나 backfill
- 최종 승인 API, Worker, Scheduler 또는 실행 API 구현
- 실행 버튼, `EXECUTING` 전환과 네이버 API 호출

사용자가 승인 대신 보류 또는 수정 요청을 하면 NO-GO를 유지하고 schema를 수정하지 않는다.

## H. 현재 판정

| 판단 | 현재 상태 |
| --- | --- |
| 기술적 권장 방향 | 별도 승인 헤더와 Item scope 모델 추가 권장 |
| schema 수정 승인 | 받지 않음 |
| migration 생성 승인 | 받지 않음 |
| DB 적용 승인 | 받지 않음 |
| API/Worker 승인 | 받지 않음 |
| 현재 go/no-go | **NO-GO** |

이 문서는 사용자가 승인 여부를 판단하기 위한 요청서다. 문서가 존재하거나 검토되었다는 사실만으로 승인된 것으로 간주하지 않는다.

## 결론

제안된 두 모델은 검토 완료 상태와 실제 실행 권한을 분리하고, 승인 범위·재검증 snapshot·payload hash와 재승인 이력을 안전하게 보존하기 위한 기반이다. 위험은 schema 변경 자체보다 검토 없이 migration을 적용하거나 기존 Batch를 자동 승인된 것으로 해석할 때 커진다. 따라서 schema 수정과 migration SQL 생성까지만 먼저 승인받고, 생성 결과와 NAS backup·복구 계획을 다시 검토한 뒤 DB 적용을 별도로 결정하는 절차를 권장한다.

**현재는 승인 전이므로 NO-GO다. 이 문서는 승인 요청서일 뿐 schema 변경, migration 생성 또는 DB 적용의 실행 승인이 아니다.**
