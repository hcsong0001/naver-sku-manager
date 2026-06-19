# SKU Keyword Matching 최종 승인 artifact schema 변경 의사결정 요약

## 문서 목적과 현재 판정

이 문서는 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem` schema 변경을 실제로 승인할지 판단하기 위해 기존 설계의 결론, 기대 효과, 위험과 NO-GO 조건을 압축한다.

현재 권고는 다음 두 문장으로 요약된다.

1. **설계 방향:** 별도 최종 승인 헤더와 Item 범위 모델을 추가하는 방향을 권장한다.
2. **실행 여부:** 사용자 명시 승인과 변경 전 체크리스트 완료 전까지 실제 schema 변경은 **NO-GO**다.

따라서 “모델 분리가 필요하다”는 기술적 권고와 “지금 schema를 수정해도 된다”는 실행 승인을 구분한다. 이 문서 자체는 후자를 부여하지 않는다.

근거 문서는 다음과 같다.

- [실행 직전 최종 승인 설계](./sku-keyword-batch-final-approval-design.md)
- [최종 승인 artifact 스키마 필요성 검토](./sku-keyword-batch-final-approval-schema-review.md)
- [최종 승인 artifact schema 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)
- [최종 승인 artifact Prisma schema 초안](./sku-keyword-batch-final-approval-prisma-schema-draft.md)
- [최종 승인 artifact migration 적용 절차](./sku-keyword-batch-final-approval-migration-plan.md)
- [schema 변경 전 체크리스트](./sku-keyword-batch-final-approval-schema-change-checklist.md)

이번 단계에서는 문서만 작성한다. Prisma schema, migration, DB, 코드, Job/Item status, payload와 외부 API를 변경하지 않는다.

## A. 의사결정 대상

| 의사결정 | 권장 방향 | 현재 상태 |
| --- | --- | --- |
| `NaverApiBatchFinalApproval` 추가 | 채택 권장 | 명시 승인 대기 |
| `NaverApiBatchFinalApprovalItem` 추가 | 채택 권장 | 명시 승인 대기 |
| Job당 `ACTIVE` artifact 최대 1개 | 채택 권장 | DB 강제 방식 미확정 |
| Job별 재승인 version | 채택 권장 | 증가·동시성 규칙 미확정 |
| `supersedesApprovalId` 연결 | 채택 권장 | self relation 세부 제약 미확정 |
| artifact 내용 필드 append-only | 채택 권장 | DB/서비스 강제 수준 미확정 |
| 일반 `updatedAt` 제외 | 채택 권장 | schema 승인 대기 |
| 제한적 무효화 lifecycle 변경 | 채택 권장 | 상태 전이·권한 정책 미확정 |

### 두 모델을 함께 판단해야 하는 이유

Approval 헤더만 추가하고 Item 모델을 생략하면 승인자, 시각과 aggregate hash는 남길 수 있어도 사용자가 승인한 정확한 포함·제외 범위를 FK로 고정하기 어렵다. 반대로 Item 모델만으로는 승인 행위, validation snapshot, aggregate payload hash, version과 무효화 lifecycle의 단일 기준점이 없다.

부분 실행을 당장 구현하지 않더라도 Job의 모든 Item을 Approval Item으로 snapshot하면 다음을 구분할 수 있다.

- 사용자가 승인한 Item
- 사용자가 명시적으로 제외한 Item
- artifact 생성 과정에서 누락된 Item
- 승인 후 원본과 식별자 또는 operation이 달라진 Item

따라서 권장 의사결정 단위는 두 모델의 동시 도입이다.

## B. 지금 schema 변경이 필요한 이유

### 상태와 실행 권한의 분리

현재 설계가 전제하는 Keyword Batch의 검토 승인 직후 상태는 Job `APPROVED`, Item `READY`, Job `dryRun=true`, `approvedAt/approvedBy=null`이다. 이는 후보 검토가 끝났다는 뜻이지 LIVE 실행 권한이 생성되었다는 뜻이 아니다.

`APPROVED + READY`만으로는 다음 질문에 답할 수 없다.

- 누가 어떤 validation 결과를 보고 최종 실행을 승인했는가
- 승인한 정확한 Item 집합과 제외 범위는 무엇인가
- 승인 당시 payload와 실행 직전 payload가 동일한가
- 승인이 아직 유효하고 미무효화·미소비 상태인가
- 재승인이라면 어느 승인을 대체하는가

Job/Item status에 이 의미를 모두 겹쳐 넣으면 검토 승인과 실행 승인의 경계가 흐려진다. 별도 artifact는 기존 workflow 상태를 대체하는 것이 아니라, LIVE 실행 권한에 필요한 추가 근거를 제공한다.

### Worker가 확인할 독립 근거

향후 Worker는 다음 세 범주를 분리해서 확인해야 한다.

1. **workflow 상태:** Job `APPROVED`, Item `READY` 등 실행 후보 상태
2. **실행 권한:** 유효한 ACTIVE 최종 승인 artifact와 포함 Item scope
3. **실행 금지 근거:** 만료, 무효화, hash 불일치, stale/blocker, 범위 밖 Item, 중복 선점·소비

workflow 상태만 맞는다고 권한과 금지 조건까지 통과한 것은 아니다. 이 분리는 외부 변경 호출 전에 fail-closed로 차단하기 위한 최소 경계다.

### 불변 승인 근거

최종 승인에는 최소한 다음을 한 version에 고정해야 한다.

- 승인자, 승인 시각, 승인 source와 memo
- validation snapshot과 canonical hash
- 포함·제외 Item scope와 제외 사유
- Item별 payload/validation hash
- 포함 Item manifest의 aggregate payload hash
- operation registry, transformer와 canonicalization version
- 만료, 무효화, 재승인 연결 정보

`metadata Json?`는 prototype이나 조회용 보조 정보에는 유용하지만 필수값, FK, Item별 unique, ACTIVE 단일성 및 lifecycle 제약을 충분히 강제하지 못한다. 따라서 LIVE 실행 권한의 원본으로는 권장하지 않는다.

## C. 변경하지 않을 경우의 위험

| 위험 | 가능한 결과 | 필요한 방어 |
| --- | --- | --- |
| Worker가 Job/Item status만 신뢰 | 검토 승인 Batch를 LIVE 실행 대상으로 오인 | 별도 유효 artifact 필수화 |
| 검토 승인과 실행 승인 혼합 | `approvedAt/approvedBy`, `dryRun` 의미 충돌 | 권한 source of truth 분리 |
| 최신 재검증 근거 미보존 | stale 결과 또는 변경된 현재값으로 실행 | versioned snapshot/hash |
| Item scope를 JSON/요청값으로만 전달 | 누락·추가·타 Job Item 혼입 | Approval Item FK와 scope 검증 |
| 부분 실행 제외 근거 부재 | 왜 특정 Item만 실행·제외됐는지 감사 불가 | 포함·제외 행과 사유 보존 |
| 재승인을 기존 값 update로 처리 | 과거 승인 근거 소실 | 새 version과 supersession |
| ACTIVE 단일성 미보장 | 동시 승인 두 개가 모두 유효해지는 race | DB unique 또는 승인된 잠금 계약 |
| artifact 없이 Worker부터 구현 | 임시 metadata나 status가 사실상 영구 권한 원본이 됨 | schema·권한 계약을 먼저 확정 |

변경하지 않는 선택도 가능하지만, 그 경우 LIVE 실행을 계속 금지해야 한다. 별도 artifact 없이 기존 상태만으로 실행을 허용하는 것은 안전한 대안이 아니다.

## D. 권장안

### 모델과 권한 원본

- 별도 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem`을 함께 추가한다.
- `NaverApiBatchFinalApproval`을 승인 행위, validation snapshot, aggregate hash, version과 lifecycle의 기준점으로 사용한다.
- `NaverApiBatchFinalApprovalItem`에 Job의 모든 Item을 snapshot하고 `included`와 `excludedReason`으로 범위를 명시한다.
- Job/Item status, 기존 승인 필드, `dryRun` 또는 JSON metadata를 LIVE 권한의 단독 원본으로 사용하지 않는다.
- Worker는 workflow 상태와 artifact 검증을 모두 통과해야만 실행 가능하다고 판정한다.

### 재승인과 ACTIVE 단일성

- Job당 동시에 유효한 `ACTIVE` artifact는 최대 1개로 제한한다.
- Job별 `version`은 단조 증가시키고 재사용하지 않는다.
- 내용 변경이나 재검증 후 재승인이 필요하면 기존 artifact를 수정하지 않고 새 artifact와 Item 집합을 생성한다.
- 새 artifact의 `supersedesApprovalId`로 대체한 이전 승인을 연결한다.
- 기존 ACTIVE 무효화와 새 version 생성은 향후 하나의 transaction에서 수행한다.
- ACTIVE 최대 1개는 partial unique index가 우선 후보지만 실제 문법과 동시성 방식은 migration 승인 전에 확정한다.

### 불변성과 무효화

- 승인자·시각·source·memo, snapshot/hash, scope와 Approval Item 내용은 append-only로 취급한다.
- Approval과 Approval Item의 일반 `updatedAt @updatedAt`은 제외하는 방향을 권장한다.
- 같은 Approval 행에서 변경을 허용한다면 `status`, `invalidatedAt`, `invalidatedBy`, `invalidationReason`으로 제한한다.
- 무효화된 artifact를 다시 ACTIVE로 되돌리지 않는다.
- 더 엄격한 감사가 필요하면 무효화 이벤트를 별도 모델로 분리하는 안을 재검토한다.
- hard delete와 승인 관계의 cascade delete는 금지 방향으로 검토한다.

### 기존 데이터

- artifact가 없는 기존 `APPROVED` Job과 `READY` Item은 LIVE 실행 불가로 유지한다.
- 기존 status, `dryRun`, payload를 schema 추가만으로 변경하지 않는다.
- 가짜 승인자, 현재 시각, 빈 snapshot 또는 임의 hash로 합성 backfill하지 않는 것을 권장한다.
- 기존 Batch 실행이 필요하면 최신 검증과 사용자 최종 승인을 통해 새 artifact를 생성한다.

## E. 아직 확정하면 안 되는 부분

다음은 권장 방향을 설명하기 위한 후보이며 이 문서에서 최종 확정하지 않는다.

- 실제 `prisma/schema.prisma` 코드와 필드 배열 순서
- enum 이름, enum 값과 default의 최종 구성
- migration 이름, migration SQL과 생성·적용 방식
- partial unique, 복합 FK, CHECK 제약과 index의 최종 Prisma/SQL 문법
- `onDelete`의 최종 정책과 기존 Job → Item `Cascade`의 조정 여부
- 같은 Job 소속을 강제하는 중복 `jobId` 및 복합 relation 채택 여부
- 기존 `APPROVED` Batch의 운영 처리와 backfill 최종 승인
- validation snapshot JSON schema와 hash canonicalization 상세 규격
- 무효화 상태 전이, 만료 계산, `CONSUMED` 의미와 변경 권한
- `dryRun` A/B/C안과 공통 실행 verifier의 최종 계약
- 최종 승인 API의 인증, transaction, idempotency와 오류 방식
- Worker의 선점, 중복 방지, 재시도와 실패 복구 방식
- Scheduler, 실행 API, LIVE adapter와 네이버 API 호출 방식

특히 상세 설계 문서의 Prisma 블록은 검토용 비실행 초안이다. 이를 그대로 복사해 schema 변경 승인이 완료된 것으로 간주하지 않는다.

## F. schema 변경 전 NO-GO 조건

다음 중 하나라도 해당하면 schema 변경 착수 또는 migration 생성을 승인하지 않는다.

- [ ] 사용자의 명시적인 schema 변경 승인이 없다.
- [ ] migration 생성에 대한 별도 명시 승인이 없다.
- [ ] 적용 대상 환경과 운영 DB 영향이 확인되지 않았다.
- [ ] backup/복구 전략과 rollback 책임자가 없다.
- [ ] 신규 table, FK, unique/index 생성의 lock·용량·시간 영향 검토가 부족하다.
- [ ] 기존 `APPROVED` Job과 `READY` Item을 어떻게 해석할지 확정되지 않았다.
- [ ] artifact 없는 기존 Batch의 LIVE 실행 차단 정책이 확정되지 않았다.
- [ ] backfill 없음 또는 예외 backfill 절차가 승인되지 않았다.
- [ ] final approval artifact 생성·무효화 권한 주체가 확정되지 않았다.
- [ ] Job당 ACTIVE 최대 1개를 동시성 상황에서도 보장할 방식이 없다.
- [ ] append-only 내용과 변경 가능한 lifecycle 필드의 경계가 확정되지 않았다.
- [ ] 관계, `onDelete`, 복합 FK와 unique/index 최종안이 리뷰되지 않았다.
- [ ] migration 실패 및 애플리케이션 rollback 시 artifact 보존 계획이 없다.
- [ ] [schema 변경 전 체크리스트](./sku-keyword-batch-final-approval-schema-change-checklist.md)에 미완료 필수 항목이 남아 있다.

현재 판정은 **NO-GO — 별도 사용자 승인 및 체크리스트 완료 전**이다.

## G. 다음 단계 제안

각 단계는 앞 단계의 승인을 다음 단계 승인으로 간주하지 않는다.

1. 사용자에게 두 모델과 권장 정책의 schema 변경 방향 승인 여부를 확인한다.
2. 승인된 경우 별도 작업으로 Prisma schema만 수정하고 변경 diff를 검토한다.
3. migration 생성 전에 schema diff, 예상 SQL, index/lock 및 rollback 계획을 다시 검토한다.
4. migration 파일 생성을 별도 승인받고 개발용 환경에서 생성한다.
5. 생성된 migration SQL에 예상 밖 drop, data rewrite, cascade 또는 광범위 lock 위험이 없는지 검토한다.
6. 운영 DB 적용 전에 대상 환경, 백업/복구, 배포 순서와 go/no-go를 다시 사용자에게 승인받는다.
7. 적용 후 Prisma Client/type 및 read-only 조회 정합성을 검증한다.
8. 최종 승인 API는 schema 적용 이후 별도 설계와 승인으로 구현한다.
9. Worker, 실행 API, Scheduler와 LIVE adapter는 API 이후에도 각각 별도 승인으로 진행한다.

## 승인 요청 시 제시할 선택지

향후 사용자에게는 범위가 섞이지 않도록 다음처럼 구분해 확인한다.

| 선택 | 의미 | 포함하지 않는 것 |
| --- | --- | --- |
| 방향 승인 | 두 모델과 핵심 정책을 다음 schema 초안의 기준으로 채택 | 파일 수정, migration 생성 |
| schema 수정 승인 | 승인 범위대로 `schema.prisma`를 수정하고 diff 검토 | migration 생성·DB 적용 |
| migration 생성 승인 | 검토된 schema로 migration 파일 생성 | 운영 DB 적용 |
| DB 적용 승인 | 검토된 migration을 지정 환경에 적용 | API·Worker 구현 |
| API/Worker 승인 | 각 별도 설계 범위의 코드 구현 | 다른 실행 구성요소 자동 승인 |

권장 의사결정은 우선 **방향 승인 여부만 결정**하고, 실제 schema 수정은 다음 별도 작업에서 수행하는 것이다.

## 결론

별도 `NaverApiBatchFinalApproval`과 `NaverApiBatchFinalApprovalItem` 모델은 검토 상태와 LIVE 실행 권한을 분리하고, 최종 승인 scope·validation snapshot·payload hash·재승인 이력을 불변 근거로 남기기 위한 권장 구조다. 모델을 추가하지 않는다면 안전한 기본 동작은 기존 Batch의 LIVE 실행을 계속 금지하는 것이다.

그러나 관계, DB 제약, 기존 데이터 정책, 권한 주체, migration과 rollback이 아직 실행 수준으로 승인되지 않았다. 현재는 기술적 방향을 권장할 수 있지만 schema 변경을 실행할 단계는 아니다.

**이 문서는 schema 변경 실행 승인이 아니며, 실제 schema 변경은 별도 명시 승인 후에만 진행한다.**
