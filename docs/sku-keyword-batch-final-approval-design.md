# SKU Keyword Matching Batch 실행 직전 최종 승인 설계

## 문서 목적

이 문서는 SKU Keyword Matching Batch가 실제 실행 자격을 얻기 전에 거쳐야 하는 최종 승인 단계의 목적, 전제 조건, 승인 범위, 메타데이터와 `dryRun` 처리 선택지를 정의한다.

현재 Job `APPROVED`와 Item `READY`는 **검토 승인 완료**를 뜻할 뿐 실제 실행 권한을 뜻하지 않는다. 최종 승인은 사전 재검증 결과와 정확한 실행 대상 범위를 사용자가 다시 확인하고, 그 범위에 한해 실행 권한을 부여하는 별도 안전 게이트이다.

이번 단계에서는 문서만 작성한다. 최종 승인 API, 상태 전환, DB write, payload 변환, 실행 API, Worker, Scheduler, LIVE adapter와 네이버 API 호출을 구현하지 않는다.

적용된 artifact schema를 기준으로 한 생성 API의 요청·검증·transaction·hash 계약은 [최종 승인 artifact 생성 API 설계](./sku-keyword-batch-final-approval-api-design.md)를 따른다.

## 현재 상태와 안전상 간극

현재 Keyword 승인 직후 상태는 다음과 같다.

- Job status: `APPROVED`
- Item status: `READY`
- Job `dryRun`: `true`
- Job `approvedAt`: `null`
- Job `approvedBy`: `null`
- Job `executedAt`: `null`

반면 공통 `assertNaverApiBatchExecutionReady`와 `PrismaNaverApiApprovalVerifier`는 Job `APPROVED`, Item `READY` 외에도 `dryRun=false`, `approvedAt`, `approvedBy`를 요구한다. 따라서 현재 Keyword Batch는 검토 완료 후보일 뿐 공통 실행 자격을 충족하지 않는다.

최종 승인 단계는 이 간극을 임의 우회하지 않는다. 어떤 필드와 상태가 최종 실행 승인을 표현할지 먼저 확정하고, 공통 verifier와 동등하거나 더 엄격한 조건을 갖춰야 한다.

## 최종 승인 단계의 목적

- `APPROVED + READY`를 즉시 실행 대상으로 오인하지 않도록 차단
- 실행 직전 최신 상품·옵션·추가상품·SKU·세트 문맥 확인
- 사전 재검증 결과와 payload 변환 가능성 확인
- 실제 실행 Item 범위를 고정
- 제외 Item과 제외 사유를 명시
- 승인자, 승인시각, 확인 문구와 경고 확인 이력 기록
- 승인 대상의 validation snapshot과 payload/범위 hash 고정
- Worker가 임의로 Item을 추가·제외하거나 목표값을 바꾸지 못하도록 경계 설정

## 책임 분리

| 단계 | 책임 | 외부 호출 |
| --- | --- | --- |
| 검토 승인 | DRAFT 후보 검토 완료, Job `APPROVED`, Item `READY` | 없음 |
| 사전 재검증 | 상태·payload·최신 문맥·risk/blocked 재계산 | 최신 문맥 출처는 후속 설계, 변경 호출 없음 |
| payload 변환 검증 | 공식 operation으로 변환 가능한지 확인 | 없음 |
| 최종 승인 | 검증 snapshot과 실행 범위에 실행 권한 부여 | 없음 |
| Worker | 승인된 범위만 선점·실행·결과 기록 | 별도 구현과 승인 이후에만 가능 |

최종 승인 자체는 네이버 API를 호출하지 않는다. 최종 승인은 실행 권한을 기록하는 단계이지 실행 단계가 아니다.

## 최종 승인 전제 조건

### Job 조건

- Job ID 존재
- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- Job status가 `APPROVED`
- 취소·실행 중·종결 상태가 아님
- Item이 1개 이상 존재
- Job/Item 수와 저장 summary가 구조적으로 일치
- 동일 Job에 유효한 최종 승인이 중복 생성되지 않음

### Item 조건

- 승인 범위에 포함된 모든 Item status가 `READY`
- `requestPayload.candidate`, `requestPayload.dryRunItem` 존재
- `previewBefore`, `previewAfter` 존재
- `targetType`, `targetId`, `operation`, `storeId` 유효
- `UNKNOWN` target/operation 없음
- 저장 payload와 Item 컬럼의 식별자·변경값 일치

### 사전 재검증 조건

- 재검증 결과 `canExecute=true`
- blocked Item 없음
- stale Item 없음
- HIGH 위험 없음
- 최신값과 저장 당시 before 일치
- 최신 계산 결과와 저장 당시 after 일치
- 재검증 snapshot의 유효시간이 지나지 않음
- 재검증 이후 Job/Item/payload가 변경되지 않음
- 사용자가 확인하지 않은 새 경고 없음

### operation과 변환 조건

- 각 Item의 공식 operation이 registry에 등록됨
- operation version과 요청 validation 계약이 확정됨
- 각 Item이 실제 요청 자료로 변환 가능함
- 변환 검증 결과에 blocker 없음
- 공식 네이버 API 요청 스펙이 검토·승인됨
- 변환 검증 대상 hash가 최종 승인 대상 hash와 일치

하나라도 충족하지 못하면 최종 승인을 생성하지 않는다. 필드를 자동 보정하거나 Item을 조용히 제외하지 않는다.

## 최종 승인 메타데이터 초안

현재 Prisma 모델의 수용 가능성과 JSON 저장 한계는 [SKU Keyword Matching 최종 승인 artifact 스키마 필요성 검토](./sku-keyword-batch-final-approval-schema-review.md)를 따르고, 별도 승인/Item 범위 모델의 필드·관계·제약 상세안은 [최종 승인 artifact schema 변경안 상세 설계](./sku-keyword-batch-final-approval-schema-design.md)를 따른다.

최종 승인은 최소한 다음 정보를 하나의 불변 승인 artifact로 묶어야 한다.

### 승인자와 승인 행위

- `finalApprovedAt`: 최종 실행 승인 시각
- `finalApprovedBy`: 인증된 승인자 식별자
- `finalApprovalMemo`: 승인자가 남긴 사유 또는 운영 메모
- `approvalSource`: TMS UI, 내부 승인 API 등 승인 경로
- 확인한 안전 문구와 warning code 목록

`finalApprovedBy`에는 화면 입력 문자열을 그대로 신뢰하지 않고 인증 문맥에서 얻은 안정적인 사용자 식별자를 사용해야 한다. 구체 인증 방식은 후속 설계 대상이다.

### 재검증 근거

- `validationSnapshotId` 또는 `validationResult` 참조
- 재검증 완료 시각과 유효기한
- `evidenceHash`: 저장 payload와 최신 문맥의 검증 hash
- 저장 summary와 재검증 summary
- 최신 문맥 출처와 조회 시각
- blocked/risk/stale 결과

### 실행 범위

- `executionScope`: 전체 또는 명시적 부분 범위
- 포함 Item ID 목록
- `excludedItemIds`
- Item별 제외 사유
- 포함 Item 수와 예상 operation 수
- 실행 범위 hash
- Item별 target/operation/변경 전후 요약

### payload 변환 근거

- operation registry key와 version
- payload transformer version
- 변환 검증 결과 참조
- 변환 대상 hash 또는 manifest hash
- idempotency key 생성에 필요한 승인 버전

위 이름은 문서상 개념 초안이다. 실제 컬럼, JSON metadata, 별도 승인 모델 중 어디에 저장할지는 확정하지 않으며 이번 단계에서 Prisma schema를 변경하지 않는다.

## 승인 artifact의 불변성

최종 승인 후 다음 값이 바뀌면 기존 승인은 무효로 보고 재검증과 재승인을 요구한다.

- 포함/제외 Item ID
- targetType, targetId, operation, storeId
- `previewBefore`, `previewAfter`
- `requestPayload.candidate`, `requestPayload.dryRunItem`
- 최신 스마트스토어 현재값
- SKU 또는 세트 구성·수량·목표 계산 결과
- operation registry/transformer version
- 경고·차단 판정

승인 artifact를 수정하여 변경을 흡수하지 않는다. 변경된 범위와 새 snapshot으로 새 승인을 만든다.

## `dryRun` 처리 선택지

### 선택지 A: 최종 승인 시 기존 Job의 `dryRun=false` 전환

최종 승인 transaction에서 기존 Job의 `dryRun`을 `false`로 바꾸고 `approvedAt`, `approvedBy` 또는 최종 승인 메타데이터를 기록한다. Job status는 `APPROVED`, Item status는 `READY`를 유지한다.

장점:

- 공통 `assertNaverApiBatchExecutionReady`와 가장 직접적으로 정합성을 맞출 수 있음
- Job/Item을 복제하지 않아 식별과 목록 흐름이 단순함
- 승인 후 Worker가 기존 Batch를 그대로 참조 가능

단점과 위험:

- 하나의 Job이 검토용 snapshot과 LIVE 실행 단위를 동시에 표현함
- `dryRun`이 “생성 당시 성격”인지 “현재 실행 모드”인지 의미가 바뀜
- 기존 `approvedAt/approvedBy`가 검토 승인인지 최종 실행 승인인지 혼동될 수 있음
- 부분 범위 승인이나 재승인 이력 보존이 어려울 수 있음
- transaction 도중 범위/hash 정합성을 강하게 보장해야 함

필요한 후속 검토:

- 기존 승인 필드를 최종 승인 전용으로 사용할지
- 별도 final approval metadata 저장 방식
- 승인 만료·취소·재승인 표현 방식

### 선택지 B: `dryRun=true` 유지, 별도 최종 승인 상태/메타데이터 사용

기존 Job의 `dryRun`은 저장 당시 preview 성격으로 유지하고, 별도 상태나 승인 artifact로 실제 실행 자격을 판정한다.

장점:

- 원본 Batch가 dry-run 근거라는 의미를 보존함
- 최종 승인 이력과 범위를 별도로 풍부하게 기록 가능
- 여러 번의 재검증·재승인 이력을 표현하기 쉬움

단점과 위험:

- 공통 verifier가 `dryRun=false`를 요구하므로 그대로 사용할 수 없음
- 공통 안전장치를 우회하거나 의미를 변경할 위험이 있음
- 최종 승인 상태를 표현할 enum/필드/모델이 추가로 필요할 가능성이 큼
- Worker가 어떤 승인 artifact를 신뢰해야 하는지 복잡해짐

필요한 후속 검토:

- `dryRun=true`인 Job의 LIVE 실행을 허용할지에 대한 공통 보안 계약
- 공통 verifier 수정 여부
- 별도 승인 모델과 unique/expiry 제약

### 선택지 C: 별도 실행 Job을 생성하여 `dryRun=false`로 관리

검토 승인된 원본 Job은 `dryRun=true`로 보존하고, 최종 승인 범위와 snapshot을 기반으로 별도의 실행 Job/Item을 생성한다. 실행 Job은 `dryRun=false`와 최종 승인 메타데이터를 가진다.

장점:

- 검토 snapshot과 LIVE 실행 단위가 명확히 분리됨
- 부분 범위 승인 시 포함 Item만 실행 Job에 고정 가능
- 원본 payload와 실행 payload/결과의 불변 이력을 분리하기 쉬움
- 공통 실행 verifier의 의미를 유지하기 쉬움

단점과 위험:

- Job/Item 복제로 데이터와 화면 흐름이 복잡해짐
- 원본 Job과 실행 Job의 강한 연결·추적 필드가 필요할 수 있음
- 중복 실행 Job 생성 방지와 idempotency가 중요함
- 복제 시 원본 payload를 변형하거나 누락할 위험이 있음
- schema 또는 metadata 계약 추가 가능성이 큼

필요한 후속 검토:

- source Job/Item 참조 방식
- 실행 manifest와 payload hash 보존 방식
- 같은 최종 승인으로 실행 Job을 한 번만 만드는 제약
- 목록·상세 화면에서 원본/실행 Job 구분

## 선택지 비교 기준

| 기준 | 선택지 A | 선택지 B | 선택지 C |
| --- | --- | --- | --- |
| 공통 verifier 정합성 | 높음 | 낮음 또는 변경 필요 | 높음 |
| 원본 dry-run 불변성 | 중간 | 높음 | 높음 |
| 구현 복잡도 | 낮음~중간 | 중간~높음 | 높음 |
| 부분 범위 승인 추적 | 제한적 | 높음 | 높음 |
| 승인/실행 이력 분리 | 제한적 | 높음 | 높음 |
| schema 검토 가능성 | 중간 | 높음 | 높음 |
| 중복 실행 방지 난이도 | 중간 | 높음 | 높음 |

현재 단계에서는 어느 선택지도 확정하지 않는다. 특히 기존 공통 verifier를 우회하는 방향은 채택하지 않는다. 승인 artifact, 범위 hash, 만료·재승인 정책과 schema 필요성을 먼저 검토한 뒤 별도 사용자 승인으로 결정한다.

## 부분 실행 최종 승인

기본 정책은 전체 Job 단위 승인이다. blocked/stale Item을 자동 제외하고 나머지만 승인하지 않는다.

부분 실행을 허용하려면 다음 절차가 모두 필요하다.

1. 제외 Item ID와 제외 사유 확정
2. 포함 Item 집합으로 사전 재검증 다시 수행
3. 포함 Item만 대상으로 payload 변환 가능성 다시 확인
4. 새 `executionScope`와 범위 hash 생성
5. 제외 전후 Item 수, 가격/재고 변경 수, 경고 요약 표시
6. 사용자가 변경된 범위를 명시적으로 재승인
7. 승인 artifact에 포함/제외 Item과 사유 기록
8. Worker가 승인 범위 밖 Item을 조회·실행하지 못하도록 검증

제외 Item의 기존 status와 payload를 임의 수정하지 않는다. 제외 Item을 `SKIPPED`로 바꿀지는 실제 실행 Job 모델과 결과 정책이 정해진 뒤 결정한다.

## 최종 승인 무효화 조건

다음 중 하나가 발생하면 Worker는 기존 최종 승인을 사용하지 않는다.

- 승인 snapshot 유효기한 만료
- Job/Item status 또는 `updatedAt` 변경
- payload/범위/evidence hash 불일치
- 최신 현재값 변경
- 목표값 재계산 결과 변경
- operation registry 또는 transformer version 변경
- 포함/제외 Item 변경
- 새 blocker 또는 미확인 경고 발생
- 동일 승인 범위의 실행 완료 또는 실행 중 상태 발견

무효화 시 자동 보정하지 않고 새 재검증과 재승인을 요구한다.

## Worker가 참조해야 할 정보

- 최종 승인 artifact ID와 유효 상태
- `finalApprovedAt`, `finalApprovedBy`
- 정확한 포함 Item ID 목록과 범위 hash
- 제외 Item과 제외 사유
- 유효한 validation snapshot/evidence hash
- 검증된 operation registry key/version
- payload transformer version과 변환 manifest hash
- 최종 확인된 warning code와 Item 범위
- idempotency key 생성 입력
- 승인 만료 시각과 실행 이력

## Worker가 권한 근거로 사용하면 안 되는 정보

- Job status `APPROVED` 단독
- Item status `READY` 단독
- `previewSummary.blockedCount/riskCount` 단독
- UI에서 전달된 Item ID 목록만 있는 요청
- 저장 당시 `dryRunItem.executable=true` 단독
- `memo`, `reviewMessage`, 상품명 또는 키워드 문자열
- 최신 문맥과 비교하지 않은 `previewBefore/After`
- hash 또는 version이 없는 mutable payload
- 승인 범위에 없는 Item
- 만료되거나 무효화된 validation 결과
- 인증 문맥에서 확인되지 않은 승인자 문자열

## 최종 승인 결과 초안

후속 설계에서 최종 승인 결과는 다음 개념을 표현해야 한다. 이번 문서에서는 타입이나 API를 구현하지 않는다.

- 승인 성공 여부
- source Job ID
- 최종 승인 artifact 또는 실행 Job ID
- 최종 승인자와 승인시각
- 선택한 `dryRun` 전략
- validation snapshot ID와 evidence hash
- 실행 범위와 포함/제외 Item 수
- 범위 hash
- 확인된 경고
- payload 변환 가능성 요약
- 승인 만료시각
- 실행 자격 충족 여부
- 차단 사유와 재승인 필요 여부

승인 성공은 네이버 반영 성공을 뜻하지 않는다. Worker가 후속 선점과 실행 절차를 시작할 수 있는 권한이 생성되었다는 의미로만 사용한다.

## 감사와 보안 원칙

- 최종 승인자는 인증된 사용자 문맥에서 결정
- 승인자, 승인시각, 승인 source, memo 기록
- validation snapshot과 승인 범위 hash 연결
- 저장 payload, 변환 manifest, 실제 요청 로그의 추적 관계 유지
- 승인 artifact와 원본 payload를 실행 과정에서 수정하지 않음
- 승인 만료·무효화·중복 승인 시도 기록
- Worker가 승인 범위 밖 Item을 실행하면 즉시 차단
- 권한 검사 실패를 LIVE 호출 전에 종료

감사 정보의 실제 저장 위치와 보존 기간은 후속 schema 설계에서 검토한다.

## 후속 검토 순서

1. A/B/C 중 `dryRun`과 실행 Job 모델 선택
2. 최종 승인 artifact의 저장 위치와 필드 확정
3. validation snapshot과 payload/범위 hash 계약 확정
4. 최종 승인 만료·무효화·재승인 정책 확정
5. 부분 범위 승인 UX와 감사 정책 확정
6. Prisma schema/enum/migration 필요 여부 검토
7. 최종 승인 API 요청/응답 설계
8. 보안·운영 검토와 별도 사용자 승인
9. 승인 이후에만 코드 구현

## 절대 금지 사항

이번 문서 단계에서는 다음을 수행하지 않는다.

- 최종 승인 API 또는 타입 구현
- DB write 또는 상태 변경
- `dryRun` 변경
- `approvedAt`, `approvedBy` 또는 metadata 기록
- `EXECUTING` 전환
- payload 변환 또는 재검증 함수 구현
- 실행 API, Worker, Scheduler 구현
- Batch 실행 버튼 추가
- 네이버 API 요청 코드 작성 또는 실제 호출
- LIVE adapter 구현
- Prisma schema 변경 또는 migration 생성
