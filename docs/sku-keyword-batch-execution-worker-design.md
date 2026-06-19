# SKU Keyword Matching Batch 실행 Worker 설계

## 문서 목적

이 문서는 `SKU_KEYWORD_MATCHING` 모듈에서 승인된 Batch를 나중에 안전하게 실행하기 위한 실행 계층의 책임과 안전 조건을 정의한다.

현재 구현 범위에는 실행 API, Worker, Scheduler, LIVE adapter, 네이버 API 호출이 포함되지 않는다. 이 문서는 후속 구현을 위한 설계 기준이며, 문서 작성만으로 어떤 Batch도 실행 상태로 전환되지 않는다.

## 현재 단계와 책임 분리

현재 SKU Keyword Matching 흐름은 다음 단계까지만 구현되어 있다.

1. 서버 dry-run을 통과한 후보를 Job `DRAFT`, Item `DRAFT`로 저장
2. 승인 API에서 서버 재검증 수행
3. 승인 성공 시 Job `DRAFT -> APPROVED`, Item `DRAFT -> READY` 전환
4. 승인 단계에서는 네이버 API를 호출하지 않음

승인과 실행은 서로 다른 책임을 가진다.

| 구분 | 승인 단계 | 실행 단계(후속 설계) |
| --- | --- | --- |
| 목적 | 검토 완료와 실행 후보 확정 | 승인된 변경을 외부 시스템에 반영 |
| Job 상태 | `DRAFT -> APPROVED` | `APPROVED -> EXECUTING -> 종결 상태` |
| Item 상태 | `DRAFT -> READY` | `READY -> EXECUTING -> 종결 상태` |
| 네이버 API 호출 | 없음 | 별도 최종 승인과 재검증 이후에만 허용 |
| payload 변경 | 없음 | 저장 payload를 원본으로 삼아 실행 요청을 별도 변환 |

## 현행 Prisma enum 확인

현재 `prisma/schema.prisma`에 존재하는 상태는 다음과 같다.

### Job 상태

`DRAFT`, `PREVIEW`, `APPROVAL_PENDING`, `APPROVED`, `EXECUTING`, `PARTIAL_SUCCESS`, `EXECUTED`, `FAILED`, `CANCELLED`

### Item 상태

`DRAFT`, `PREVIEWED`, `READY`, `EXECUTING`, `SUCCESS`, `FAILED`, `SKIPPED`, `RETRY_PENDING`, `CANCELLED`

따라서 개념 초안의 상태는 현행 enum과 아래처럼 대응한다.

| 개념 상태 | 현행 enum 대응 | 판단 |
| --- | --- | --- |
| Job `COMPLETED` | `EXECUTED` | 현행 enum 사용 가능 |
| Job `PARTIAL_FAILED` | `PARTIAL_SUCCESS` | 명칭과 의미를 후속 단계에서 확정해야 함 |
| Job `FAILED` | `FAILED` | 현행 enum 사용 가능 |
| Item `SUCCESS` | `SUCCESS` | 현행 enum 사용 가능 |
| Item `FAILED` | `FAILED` | 현행 enum 사용 가능 |
| Item `SKIPPED` | `SKIPPED` | 현행 enum 사용 가능 |

Prisma enum 변경은 이번 단계에서 필요하지 않다. 다만 `PARTIAL_SUCCESS`가 “일부 성공”만 의미하는지, 실패와 건너뜀을 모두 포함하는지 실행 정책에서 명확히 정의해야 한다.

## 권장 상태 흐름

현행 enum을 유지하는 경우의 권장 초안은 다음과 같다.

### Job

```text
APPROVED -> EXECUTING -> EXECUTED
                      -> PARTIAL_SUCCESS
                      -> FAILED
```

- 모든 실행 대상 Item이 `SUCCESS`이면 `EXECUTED`
- `SUCCESS`와 `FAILED` 또는 `SKIPPED`가 함께 있으면 `PARTIAL_SUCCESS`
- 성공 Item 없이 실행 대상이 모두 실패하면 `FAILED`
- `READY`, `EXECUTING`, `RETRY_PENDING` Item이 남아 있으면 Job은 종결하지 않고 `EXECUTING` 유지
- `CANCELLED`의 진입 조건은 실행 취소 정책을 별도로 설계한 뒤 확정

### Item

```text
READY -> EXECUTING -> SUCCESS
                   -> FAILED -> RETRY_PENDING -> EXECUTING
                   -> SKIPPED
```

상태 전환은 조건부 update 또는 transaction으로 원자적으로 처리해야 한다. 여러 Worker가 같은 Item을 동시에 선점할 수 없어야 한다.

## 실행 대상 선정 기준

Worker가 실행 대상으로 선택할 수 있는 최소 조건은 다음과 같다.

- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- Job status가 `APPROVED`
- Item status가 `READY` 또는 명시적으로 재처리 승인된 `RETRY_PENDING`
- Job에 Item이 1개 이상 존재
- Item의 `requestPayload.candidate` 존재
- Item의 `requestPayload.dryRunItem` 존재
- `previewBefore`, `previewAfter` 존재
- `targetType`, `targetId`, `operation`, `storeId`가 유효
- `dryRunItem.executable === true`
- `dryRunItem.blockedReasons`가 비어 있음
- `CURRENT_PRICE_UNAVAILABLE`, `CURRENT_STOCK_UNAVAILABLE`, `NEEDS_CONTEXT`, `HIGH` 위험이 없음
- 승인 후 실행 시점 재검증을 통과

blocked Item이 하나라도 발견되면 기본 정책은 전체 Job 실행 차단이다. 일부 실행을 허용하려면 사용자가 실행 범위를 다시 확인하는 별도 승인 흐름이 먼저 필요하다.

## 현재 실행 자격의 간극

SKU Keyword 전용 승인 서비스는 현재 Job status와 Item status만 변경한다.

- Job: `APPROVED`
- Item: `READY`
- `dryRun`은 기존 `true` 유지
- `approvedAt`, `approvedBy`는 기록하지 않음

반면 공통 `assertNaverApiBatchExecutionReady`와 `PrismaNaverApiApprovalVerifier`는 `dryRun === false`, `approvedAt`, `approvedBy`를 요구한다. 따라서 현재 승인된 SKU Keyword Batch는 공통 실행 자격을 충족하지 않으며, 곧바로 실행 프레임워크에 연결해서는 안 된다.

후속 구현 전에 다음 중 하나를 명시적으로 결정해야 한다.

1. SKU Keyword 승인 계약을 공통 승인 계약과 통합
2. 최종 실행 승인 단계를 별도로 추가하여 `dryRun`, 승인자, 승인 시각을 기록
3. SKU Keyword 전용 실행 자격 모델을 정의하되 공통 보안 조건과 동등한 수준을 보장

이 결정은 DB write와 실행 권한에 영향을 주므로 별도 승인이 필요하다.

### 관련 Job 필드의 현재 의미

| 필드 | 현재 Keyword 승인 후 값 | 실행 자격에서의 의미 |
| --- | --- | --- |
| `status` | `APPROVED` | 검토 승인이 완료되었다는 1차 조건이며, 단독으로 실행을 허용하지 않음 |
| `dryRun` | `true` 유지 | 실제 실행 모드로 전환되지 않았음을 뜻하므로 현행 공통 실행 조건에서는 차단 |
| `approvedAt` | `null` 유지 | 실제 실행 권한이 언제 부여되었는지 감사할 수 없어 차단 |
| `approvedBy` | `null` 유지 | 실제 실행 권한을 누가 부여했는지 감사할 수 없어 차단 |
| `executedAt` | `null` 유지 | 아직 실행이 종결되지 않았음을 뜻함. 실행 시작 승인과는 별개 |

`updatedAt`은 일반 수정 시각이므로 승인 시각이나 실행 시각의 대체값으로 사용하지 않는다. 현재 모델에는 별도의 실행 시작 시각 필드가 없으며, 필요 여부는 Worker 상세 설계 단계에서 검토한다.

### 실행 자격 질문과 현재 답변

#### Job status가 `APPROVED`이면 실행 후보로 볼 수 있는가?

검토 대상으로는 볼 수 있지만 실제 실행 후보로 확정할 수는 없다. 현재 Keyword 흐름의 `APPROVED`는 경고 확인과 dry-run 검토가 완료되었다는 뜻이며, 실제 외부 호출 권한까지 포함하지 않는다.

#### Item status가 `READY`이면 실행 후보로 볼 수 있는가?

Job의 실행 자격이 별도로 충족된 경우에만 가능하다. Item `READY`는 Item 자체의 검토가 끝났다는 표시이지, Job 수준의 최종 승인과 최신 문맥 재검증을 대체하지 않는다.

#### `dryRun=true`인 Job을 실행 후보로 볼 수 있는가?

현행 공통 실행 계약에서는 볼 수 없다. `dryRun=true`를 유지한 채 LIVE 호출을 허용하면 preview와 실제 실행의 경계가 사라지므로 hard blocker로 취급한다.

#### `approvedAt/approvedBy=null`인 Job을 실행 후보로 볼 수 있는가?

현행 공통 실행 계약에서는 볼 수 없다. 승인 시각과 승인자 없이 외부 변경을 수행하면 감사 추적과 책임 경계가 불완전해진다.

#### Keyword 승인 흐름에서 `approvedAt/approvedBy`를 채워야 하는가?

현재 승인 버튼의 의미를 실제 실행 승인까지 확장한다면 기록해야 한다. 그러나 현재 UI와 API는 “승인 상태 전환만 수행하고 네이버 API 호출은 없다”는 계약이므로, 이 단계에서 필드를 채우는 것이 곧 실행 권한 부여로 해석되지 않도록 의미를 먼저 확정해야 한다.

#### Keyword Batch가 별도 실행 자격 조건을 가져야 하는가?

기술적으로 가능하지만 권장 기본안은 아니다. 공통 실행 자격보다 느슨한 별도 조건을 만들면 모듈별 예외가 누적될 수 있다. 별도 조건을 채택하더라도 `dryRun=false`, 승인자, 승인 시각, 최신값 재검증, idempotency 등 공통 조건과 동등한 안전 수준을 보장해야 한다.

## 승인 메타데이터 정합성 선택지

### 선택지 A: 현재 승인 API에서 승인 메타데이터까지 기록

승인 시 Job `APPROVED`, Item `READY` 전환과 함께 `approvedAt`, `approvedBy`를 기록하고, 실제 실행 승인으로 의미를 확장한다. `dryRun=false` 전환 시점도 같은 승인 단계에서 함께 검토해야 한다.

장점:

- 공통 `assertNaverApiBatchExecutionReady`와 정합성을 맞추기 쉬움
- 승인 행위와 승인자·승인 시각이 한 transaction에 기록됨
- 상태 흐름이 단순함

단점과 위험:

- 현재 “검토 승인일 뿐 실행 승인이 아님”이라는 UI 계약이 달라짐
- 사용자가 상태 승인만 의도했는데 실행 권한까지 부여되는 오해가 생길 수 있음
- dry-run 당시 문맥이 오래되었어도 곧바로 실행 자격을 얻게 될 위험이 있음

필요 조건:

- 승인 UI 문구와 확인 절차 재설계
- 승인자 식별 방식 확정
- `dryRun=false`의 정확한 전환 의미 확정
- 실행 직전 최신값 재검증은 별도로 유지

### 선택지 B: `APPROVED + READY`를 Keyword 전용 1차 실행 자격으로 사용

현재 상태 전환을 유지하고 `approvedAt`, `approvedBy`는 후속 보강 대상으로 둔다.

장점:

- 현재 승인 API와 UI 변경이 적음
- 빠르게 Keyword 전용 Worker 설계로 이어갈 수 있음

단점과 위험:

- `dryRun=true`인 Job을 LIVE 실행에 사용하는 모순이 생김
- 승인자와 승인 시각이 없어 감사 추적이 불완전함
- 공통 `NaverApiApprovalVerifier`를 우회하거나 느슨하게 만들어야 할 가능성이 큼
- 모듈별 실행 예외가 생겨 장기 유지보수와 보안 검토가 어려움

판단:

현재 상태 그대로는 안전한 실제 실행안으로 채택하지 않는다. 1차 조회·검토 후보를 식별하는 조건으로만 사용할 수 있다.

### 선택지 C: 실행 직전 별도 최종 승인 단계 추가

현재 `APPROVED + READY`는 검토 승인으로 유지한다. 실제 실행 직전에 최신 문맥 재검증과 사용자 최종 확인을 수행하고, 그 단계에서 `approvedAt`, `approvedBy`와 실제 실행 모드 전환 정보를 기록한다.

장점:

- 현재 승인 API의 의미를 유지하면서 실행 권한을 명확히 분리함
- dry-run과 실제 외부 변경 사이의 시간 차이를 다시 검증할 수 있음
- 승인자, 승인 시각, 최종 대상과 최신값을 함께 감사할 수 있음
- 실제 실행 직전 사용자의 의사를 다시 확인함

단점과 위험:

- 승인 단계가 하나 늘어나 UI와 상태 계약이 복잡해짐
- 현행 enum에는 “최종 실행 승인 대기/완료”를 별도로 표현하는 상태가 충분한지 검토가 필요함
- 같은 `approvedAt/approvedBy`를 검토 승인과 실행 승인 중 어느 의미로 사용할지 확정해야 함

필요 조건:

- 최종 승인 요청/응답 계약 설계
- 최신값 변경 시 재승인 또는 DRAFT 재생성 정책 설계
- 중복 최종 승인 방지와 승인 버전 또는 payload 해시 검토
- enum/필드 추가 필요 여부는 설계 확정 후 별도 검토

### 현재 권장안

안전성 기준으로는 선택지 C를 우선 검토한다. 현재 `APPROVED + READY`는 **검토 승인 완료**로만 해석하고, `dryRun=true`이거나 `approvedAt/approvedBy`가 비어 있는 동안에는 실제 실행 자격을 부여하지 않는다.

다만 이번 단계에서는 선택지 C도 구현하지 않는다. 최종 승인 메타데이터의 의미, `dryRun` 전환 시점, 최신값 재검증 계약, 필요한 enum/필드를 문서로 확정한 뒤 별도 사용자 승인을 받아 구현한다.

## payload 변환 책임

저장된 payload는 감사 가능한 원본 문맥이며 직접 수정하지 않는다.

- `requestPayload.candidate`: 매핑, 상품, SKU, 현재 문맥과 계산 결과
- `requestPayload.dryRunItem`: 실행 가능 여부, 위험 수준, 경고, 차단 사유, 변경 전후 값
- `previewBefore`: 저장 당시 스마트스토어 현재 가격/재고
- `previewAfter`: 저장 당시 목표 가격/재고

실행 Worker는 이 원본을 네이버 API 요청 payload로 바로 전달하지 않는다. 후속 `payload transformer`가 아래 책임을 가져야 한다.

- `targetType`별 PRODUCT / OPTION / ADDITIONAL 요청 타입 선택
- `operation`별 가격, 재고, 가격+재고 요청 구성
- `channelProductNo`, `targetId`, `channelId` 등 네이버 식별자 검증
- 숫자 범위, 통화 단위, 재고 정수 여부 검증
- API operation registry의 요청 타입과 일치 여부 검증
- 로그 저장 전에 민감 정보 마스킹
- 변환 결과와 원본 payload의 추적 관계 유지

변환 함수는 순수 함수로 우선 설계하고, DB 조회와 네이버 호출은 별도 계층으로 분리하는 것이 바람직하다.

## 실행 전 재검증

dry-run과 실제 실행 사이에는 시간 차이가 있으므로 승인 당시 값만 신뢰할 수 없다. 실제 호출 직전에 최소한 다음을 다시 확인해야 한다.

1. Job/Item 상태와 승인 정보가 여전히 유효한지 확인
2. 스마트스토어 현재 가격과 재고를 신뢰 가능한 최신 출처에서 다시 조회
3. 최신 값이 `previewBefore`와 같은지 비교
4. 목표값 `previewAfter`가 여전히 유효한지 계산 정책 재적용
5. OPTION 식별자가 optionValue fallback이 아닌지 확인
6. 세트상품이면 구성 SKU, 수량, 구성 재고와 판매가능 재고를 다시 계산
7. 현재값 차이가 허용 범위를 벗어나면 Item을 실행하지 않고 재검토 대상으로 분류

현재값이 달라졌을 때 자동으로 새로운 기준값을 덮어쓰거나 실행해서는 안 된다. 새 preview와 사용자 재승인이 기본 정책이어야 한다.

## 안전장치

### 중복 실행 방지와 idempotency

- Item 단위의 안정적인 idempotency key를 사용
- 권장 구성 요소: `batchJobId`, `itemId`, `operation`, 승인 버전 또는 payload 해시
- 같은 key의 성공 이력이 있으면 재호출하지 않음
- 네이버 API가 idempotency를 공식 지원하지 않으면 호출 전후 조회와 감사 로그를 조합
- Job과 Item 선점은 조건부 상태 전환으로 한 Worker만 성공하도록 처리

현재 `NaverApiCallLog.idempotencyKey`는 존재하지만 unique 제약은 없다. DB 차원의 중복 방지 방식은 후속 schema 검토 항목이며, 이번 문서 작업에서는 schema를 변경하지 않는다.

### 최종 사용자 확인

- `APPROVED`는 검토 승인이지 실제 실행 승인이 아님을 UI에서 계속 명시
- 실행 직전 대상 수, 변경 가격/재고, 스토어, 위험/경고, 최신 문맥 시각을 재표시
- 명시적인 최종 실행 확인과 승인자 식별이 없으면 Worker 큐에 넣지 않음

### 부분 실패

- Item 결과는 독립적으로 기록하되 Job 집계는 모든 Item 상태에서 계산
- 일부 실패가 발생해도 성공 Item을 자동 롤백하지 않음
- 실패 Item과 성공 Item을 명확히 분리해 사용자에게 표시
- 재시도는 실패 Item 중 재시도 가능한 오류만 대상으로 함
- payload 검증 실패, 권한 오류, 식별자 불일치는 자동 재시도하지 않음

### 재시도와 rate limit

- `408`, `425`, `429`, 일시적 `5xx`, 네트워크 timeout만 제한적으로 재시도
- 지수 backoff, 최대 횟수, 최대 지연, `Retry-After` 반영
- 스토어/채널 및 API operation 단위 rate limit 적용
- 재시도마다 `attemptCount`와 `NaverApiCallLog` 감사 이력 유지
- 최대 재시도 후 Item을 `FAILED`로 종결하고 자동 무한 재시도 금지

### 감사 로그

- 호출 시작/종료 시각, endpoint, operation, status code, 소요 시간 기록
- 마스킹된 요청/응답 payload 기록
- Batch Job/Item, 스토어, 승인자, idempotency key 연결
- 실제 네이버 응답과 내부 판정 결과를 구분
- 로그 실패가 실제 호출 결과를 숨기지 않도록 보조 오류 처리 필요

## Worker 실행 단위 초안

후속 Worker는 다음 순서로 동작하는 것이 안전하다.

1. 최종 실행 승인을 받은 Job만 조회
2. Job을 조건부로 선점하고 `EXECUTING` 전환
3. `READY` Item을 제한된 개수만 조회
4. Item을 조건부로 선점하고 `EXECUTING` 전환
5. 실행 전 최신 문맥 재검증
6. payload transformer로 네이버 요청 생성
7. 공통 Naver API client/adapter를 통해 호출
8. 호출 로그와 Item 결과 기록
9. 재시도 가능 여부 판정
10. 남은 Item 상태를 집계해 Job 종결 상태 결정

2번 이후의 모든 상태 변경과 외부 호출은 아직 구현하지 않는다.

## 절대 금지 사항

이번 설계 문서 단계에서는 다음을 수행하지 않는다.

- Worker 또는 Scheduler 구현
- Batch 실행 API 구현
- 실행 버튼 또는 네이버 반영 버튼 추가
- 네이버 API 호출
- LIVE adapter 구현
- Job/Item `EXECUTING` 전환 코드 추가
- DB write 코드 추가
- 기존 payload 수정 또는 재저장
- Prisma schema 변경 또는 migration 생성

## 후속 작업 순서

1. 실행 전 payload transformer 타입과 순수 함수 설계
2. 실행 시점 현재값 재조회 출처와 stale 판정 정책 설계
3. SKU Keyword 승인 계약과 공통 실행 자격 간극 해소안 검토
4. idempotency key와 Worker 선점/lease 전략 검토
5. 실행 API 요청/응답과 최종 사용자 확인 계약 설계
6. Worker의 동시성, rate limit, retry, 부분 실패 정책 상세화
7. Prisma 상태와 추가 필드 필요 여부 검토
8. 보안 검토와 별도 사용자 승인
9. 승인 이후에만 실제 코드 구현

가장 먼저 진행할 후속 작업은 외부 호출 없이 작성할 수 있는 `payload transformer` 설계와 실행 전 재검증 계약이다. 실제 API 호출이나 DB 상태 변경이 필요한 구현은 별도 승인을 받은 뒤 진행한다.
