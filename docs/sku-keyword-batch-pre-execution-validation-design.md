# SKU Keyword Matching Batch 실행 전 재검증 설계

## 문서 목적

이 문서는 SKU Keyword Matching Batch가 실제 실행 단계로 진입하기 전에 수행해야 하는 최종 재검증 기준을 정의한다.

재검증의 목적은 다음과 같다.

- 검토 승인 당시 저장된 payload와 실행 시점의 최신 상태 차이 확인
- Job과 Item의 실제 실행 자격 확인
- 누락되거나 변조된 payload, 오래된 현재값, 잘못된 대상 식별자로 인한 외부 반영 차단
- 최종 승인 범위와 실제 실행 대상이 같은지 확인
- 네이버 API 호출 전에 모든 hard blocker를 발견해 부분 실행 시작을 방지

이번 단계는 문서 설계만 수행한다. 재검증 함수, payload 변환 함수, 실행 API, Worker, Scheduler, LIVE adapter와 네이버 API 호출을 구현하지 않는다.

## 책임 경계

### 검토 승인

- Job `DRAFT -> APPROVED`
- Item `DRAFT -> READY`
- 현재 의미는 **검토 승인 완료**
- 네이버 API 호출과 실제 실행 자격 부여 없음

### 실행 전 재검증

- 저장된 Job, Item, payload를 읽어 실행 자격을 다시 판정
- 실행 시점 최신 문맥과 저장 당시 기준 비교
- 최종 승인 범위와 경고 확인 여부 검증
- 실행 가능한 Item 집합을 제안하되 외부 호출과 상태 전환은 수행하지 않음

재검증 결과를 실제 실행 권한에 묶는 승인 artifact와 `dryRun` 처리 선택지는 [SKU Keyword Matching Batch 실행 직전 최종 승인 설계](./sku-keyword-batch-final-approval-design.md)를 따른다.

### payload 변환

- 재검증을 통과한 Item만 공식 operation의 요청 자료로 변환
- 저장 payload 전체를 실제 요청 body로 사용하지 않음
- 공식 네이버 API 스펙이 확정되기 전에는 실제 요청 payload를 생성하지 않음

### Worker

- 재검증과 변환이 모두 성공하고 최종 승인 계약을 충족한 결과만 실행
- Job/Item 선점, API 호출, 결과 기록은 후속 구현 범위

## 현재 실행 자격 전제

현재 Keyword 승인 직후 값은 다음과 같다.

- Job status: `APPROVED`
- Item status: `READY`
- Job `dryRun`: `true`
- Job `approvedAt`: `null`
- Job `approvedBy`: `null`

따라서 현재 저장 상태 그대로는 실제 실행 자격을 충족하지 않는다. 이 문서의 실행 자격 검증은 별도 최종 승인 단계가 설계되어 `dryRun`, 승인자, 승인 시각의 의미가 확정되었다는 미래 조건을 전제로 한다.

## 검증 시점과 원자성 원칙

재검증은 외부 호출과 `EXECUTING` 전환 전에 전체 Job을 대상으로 수행한다.

1. Job과 모든 Item을 일관된 시점의 snapshot으로 읽음
2. Job 구조와 최종 승인 문맥 검증
3. 모든 Item의 저장 구조 검증
4. 최신 내부 매핑·SKU 문맥 재검증
5. 최신 스마트스토어 문맥과 저장 당시 값 비교
6. 위험·차단 사유 재계산
7. 전체 결과와 payload/승인 hash 일치 확인
8. 사용자에게 최종 결과 제시

재검증 중 Job 또는 Item의 `updatedAt`, 상태, payload hash가 바뀌면 결과를 폐기하고 처음부터 다시 검증해야 한다. 실제 원자적 snapshot, version 또는 lock 구현 방식은 후속 DB/Worker 설계에서 검토한다.

## Job 단위 재검증

### 식별과 상태

- Job ID 존재
- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- Job status가 최종 실행 계약에서 허용하는 상태
- 현재 권장안에서 단순 `APPROVED`는 검토 승인일 뿐이므로 최종 실행 승인 문맥을 추가 확인
- 취소·실행 중·종결 상태인 Job은 신규 실행 대상으로 선택하지 않음
- Item이 1개 이상 존재
- `totalItems`와 실제 Item 수가 일치

### 실행 모드와 승인 메타데이터

- `dryRun === false`
- `approvedAt` 존재
- `approvedBy` 존재하고 유효한 사용자 식별자임
- 승인 시각이 최신 재검증 또는 최종 확인 정책과 모순되지 않음
- 최종 승인 대상의 Job ID, Item ID 집합, 변경안 hash가 현재 값과 일치
- 동일 승인으로 이미 실행된 이력이 없는지 확인

현재 Keyword 승인 흐름은 이 조건을 충족하지 않는다. 필드를 임의로 보정하거나 `APPROVED`만 보고 통과시키지 않는다.

### 저장 구조

- `previewSummary`가 JSON object로 존재
- `previewSummary.selectedCount`, `executableCount`, `blockedCount`, `riskCount` 등 저장 당시 집계의 타입이 유효
- Job 집계와 실제 Item 재검증 집계가 일치
- `successItems`, `failedItems`, `skippedItems`가 신규 실행 전 상태와 모순되지 않음
- `executedAt`이 비어 있음

`previewSummary`는 dry-run 당시 참고 집계이며 실행 허가의 단독 근거가 아니다. 값이 없거나 실제 Item과 다르면 Job 전체를 차단한다.

## Item 단위 재검증

### 상태와 소속

- Item ID 존재
- `batchJobId`가 검증 대상 Job과 일치
- Item status가 `READY`
- 재처리의 경우에만 별도 승인된 `RETRY_PENDING` 허용 여부를 후속 정책으로 검토
- 동일 Item의 성공 호출 이력 또는 동일 idempotency key가 없는지 확인

### 필수 Item 컬럼

- `storeId` 존재하며 실제 Smartstore 문맥과 연결됨
- `channelProductNo`가 대상 유형에 필요한 경우 존재
- `targetType`이 `SINGLE`, `OPTION`, `ADDITIONAL` 중 하나
- `targetId` 존재
- `operation`이 `UPDATE_PRICE`, `UPDATE_STOCK`, `UPDATE_PRICE_AND_STOCK` 중 하나
- `UNKNOWN` 값 없음
- `previewBefore`, `previewAfter`가 JSON object로 존재
- operation에 필요한 가격·재고 값이 before/after 양쪽에 존재

### requestPayload 구조

- `requestPayload`가 JSON object로 존재
- `requestPayload.candidate`가 존재하고 예상 구조와 일치
- `requestPayload.dryRunItem`이 존재하고 예상 구조와 일치
- candidate ID와 `dryRunItem.candidateId`가 일치
- Item `targetType`, `targetId`, `operation`과 candidate/dryRunItem의 의미가 일치
- `previewBefore`와 `dryRunItem.before`가 일치
- `previewAfter`와 `dryRunItem.after`가 일치
- 저장 payload 또는 핵심 변경값의 hash가 최종 승인 대상 hash와 일치

불일치를 자동 보정하거나 어느 한쪽 값을 우선하지 않는다. Item을 hard blocker로 분류한다.

### candidate 품질

- candidate status가 `NEEDS_CONTEXT`가 아님
- `draftCreatable === true`
- `executable === true`
- `CURRENT_PRICE_UNAVAILABLE` 없음
- `CURRENT_STOCK_UNAVAILABLE` 없음
- target/SKU/store 문맥 부족 issue 없음
- optionValue fallback 등 약한 대상 식별 없음
- 단품·세트 구분과 linked SKU 구성이 유효
- 세트상품이면 모든 구성 SKU와 수량이 확정되고 수량이 양의 정수

### dryRunItem 품질

- `dryRunItem.executable === true`
- `blockedReasons`가 비어 있음
- `riskLevel !== HIGH`
- `changeType`이 Item operation과 일치
- `before`, `after`가 changeType에 필요한 필드를 포함
- 숫자 값이 유한하고 가격·재고 도메인 범위에 맞음
- 재고는 0 이상의 정수
- price/stock 모두 변경되지 않는 Item의 처리 정책은 후속 확정

## risk/blocked 재검증

### 저장 요약의 의미

- `previewSummary.blockedCount`: 저장 당시 실행 불가 Item 수
- `previewSummary.riskCount`: 저장 당시 HIGH 또는 MEDIUM 위험 Item 수
- 두 값은 승인 전 dry-run 참고값이며 실행 시점의 사실을 보장하지 않음

### 재계산 원칙

- Job summary만 보지 않고 모든 Item을 다시 판정
- 재검증 결과의 blocked/risk 수를 새로 계산
- 저장 summary와 재계산 결과가 다르면 원인을 확인할 때까지 Job 차단
- 기존 payload나 `previewSummary`를 수정하여 맞추지 않음

### blocked Item 정책

기본 정책은 **한 Item이라도 hard blocker가 있으면 Job 전체 실행 차단**이다.

blocked Item을 조용히 제외하고 나머지만 실행하면 최종 승인 범위가 달라진다. Item 제외 실행을 지원하려면 다음이 먼저 필요하다.

- 제외 Item과 실행 Item을 명시한 새 실행 범위
- 변경된 Item 집합과 payload hash
- 사용자 재확인과 새 최종 승인
- 제외 사유와 감사 기록

이 절차 없이 `itemsToSkip`으로 옮겨 부분 실행하지 않는다.

### risk Item 정책

- HIGH 위험은 hard blocker
- MEDIUM/정보성 경고는 자동 실행 허가가 아님
- 최종 승인에서 정확한 warning code와 Item 범위를 사용자가 확인했는지 검증
- 승인 후 새로운 경고가 생기면 재승인 필요
- `CHANNEL_ID_UNAVAILABLE`처럼 기존에는 정보성인 경고도 실제 operation이 channel ID를 요구하면 실행 시점에는 hard blocker로 승격 가능
- stale 현재값은 단순 warning이 아니라 hard blocker

## 최신 문맥 재검증

### 내부 매핑·SKU 문맥

- candidate가 가리키는 상품/옵션/추가상품이 여전히 존재
- 운영 매핑이 승인 당시 SKU 또는 세트 구성과 같은지 확인
- linked SKU가 삭제·비활성·변경되지 않았는지 확인
- SKU 가격·원가·재고가 목표 계산 기준과 일치하는지 확인
- 세트상품은 구성 SKU별 최신 재고와 수량으로 판매가능 재고 재계산
- 세트상품을 단품 재고처럼 계산하지 않음

### 스마트스토어 최신 문맥

- 실행 시점의 상품/옵션/추가상품 현재 가격과 판매재고 확인
- 최신 문맥의 출처와 조회 시각 확인
- 최신 현재값과 `previewBefore`, `dryRunItem.before` 비교
- 저장 이후 대상 상태, 옵션 식별자 또는 판매 상태가 바뀌지 않았는지 확인
- 최신값 조회 실패 또는 신뢰할 수 없는 출처이면 차단

최신 네이버 상태를 어떤 공식 API나 파일로 확인할지는 별도 설계 후 확정한다. 이번 문서에서는 네이버 API 스펙을 확정하거나 호출하지 않는다.

### 차이 판정

- 최신 현재값이 저장 당시 before와 정확히 같으면 다음 검증 진행
- 최신값이 다르면 stale hard blocker
- 최신 목표값 재계산 결과가 저장 당시 after와 다르면 hard blocker
- 이미 최신값이 목표값과 같은 경우 호출 없이 `SKIPPED`로 볼지, 완료로 볼지 후속 정책 필요
- 차이를 자동 흡수하거나 after를 덮어쓰지 않음
- stale 또는 계산 차이가 있으면 새 dry-run과 사용자 재승인 요구

## 재검증 결과 초안

구현 시 결과는 다음 개념을 표현해야 한다. 이 문서에서는 TypeScript 타입이나 함수를 만들지 않는다.

- `canExecute`: Job 전체가 실행 단계로 넘어갈 수 있는지
- `jobId`: 검증 대상 Job
- `validatedAt`: 재검증 완료 시각
- `approvalContextValid`: 최종 승인 문맥 유효 여부
- `snapshotMatched`: 저장 snapshot과 최신 문맥 일치 여부
- `blockedReasons`: Job 수준 차단 사유
- `riskWarnings`: 최종 확인이 필요한 경고
- `itemsToExecute`: 모든 검증을 통과한 Item 요약
- `itemsToSkip`: 사용자 재승인 없이 자동 제외하지 않는 참고 목록
- `blockedItems`: Item ID와 차단 사유
- `staleItems`: 최신 상태가 달라진 Item
- `requiresReapproval`: 새 dry-run 또는 최종 재승인 필요 여부
- `storedSummary`: 저장 당시 blocked/risk 집계
- `revalidatedSummary`: 재검증한 blocked/risk/실행 가능 집계
- `evidenceHash`: 재검증 대상 payload와 최신 문맥의 추적값

`canExecute=true`는 payload 변환과 외부 호출 성공을 의미하지 않는다. Worker가 payload transformer와 공식 operation validation을 이어서 수행할 수 있다는 사전 조건만 뜻한다.

## 실패 처리 원칙

### Job 전체 차단

다음은 Job 전체를 차단한다.

- Job 상태·실행 모드·최종 승인 메타데이터 부적합
- Item 없음 또는 Item 수/summary 불일치
- payload hash 또는 승인 범위 불일치
- blocked Item 존재
- stale Item 존재
- 미확정 공식 operation 존재
- 최신 문맥 조회를 완료하지 못함

차단 시 어떤 Item도 `EXECUTING`으로 전환하지 않고 외부 호출을 시작하지 않는다.

### Item 단위 차단

Item별 사유는 상세하게 계산하되, 기본 정책에서는 Item 단위 차단이 곧 Job 전체 차단으로 이어진다. 부분 실행을 원하면 Item 집합을 새로 확정하고 재승인해야 한다.

### partial execution

사전 재검증 단계에서는 partial execution을 허용하지 않는다. 모든 Item이 통과한 뒤 실제 실행을 시작했고, 그 이후 일부 외부 호출만 실패한 경우에만 `PARTIAL_SUCCESS` 가능성을 검토한다.

### 실패 사유 기록

- Job/Item ID와 validation 단계
- 안정적인 reason code와 한국어 설명
- 저장값과 최신값의 차이 요약
- 최신 문맥 출처와 조회 시각
- 재승인 필요 여부
- 재시도 가능 여부

재검증 실패 기록을 어디에 저장할지는 후속 schema/audit 설계에서 검토한다. 이번 단계에서는 DB schema를 변경하지 않는다.

## 재시도 기준

재검증 자체의 재시도 가능 후보:

- 최신 문맥 조회 timeout
- 일시적 network 오류
- rate limit
- 일시적인 외부 서비스 오류

자동 재시도 불가:

- 승인 메타데이터 누락
- 상태 또는 승인 범위 불일치
- payload 구조·hash 불일치
- stale 현재값
- blocked/HIGH 위험
- target 식별자 불일치
- 비즈니스 규칙 위반

자동 재시도 불가 사유는 새 preview, 사용자 검토 또는 최종 재승인을 통해 해소해야 한다.

## 감사와 보존

- 기존 `requestPayload`, `previewBefore`, `previewAfter`, `previewSummary`를 수정하지 않음
- 재검증 입력 snapshot과 결과를 연결할 수 있어야 함
- 최종 승인자·승인시각·승인 범위와 재검증 결과 연결
- 최신 문맥 출처·조회시각·비교 결과 기록
- 경고 확인과 hard blocker 판정을 Item 단위로 추적
- 실행 payload 변환 결과와 재검증 evidence hash 연결

감사 결과 저장 모델과 보존 기간은 후속 검토 항목이다.

## 후속 검토 항목

- 최종 실행 승인 상태와 `dryRun=false` 전환 시점
- 승인 범위/payload hash 저장 방식
- 재검증 snapshot의 transaction·version·lock 방식
- 최신 네이버 상태의 공식 조회 출처와 허용 freshness
- reason code 체계와 감사 로그 저장 위치
- Item 제외 후 재승인 UX
- 이미 목표값과 같은 Item의 `SKIPPED` 정책
- 재검증 결과 저장에 Prisma schema 변경이 필요한지 여부

schema 또는 migration 필요 여부는 설계 확정 후 별도 승인으로 검토한다. 이번 단계에서는 Prisma schema를 변경하지 않는다.

## 절대 금지 사항

이번 문서 단계에서는 다음을 수행하지 않는다.

- 재검증 함수 또는 타입 구현
- payload 변환 함수 구현
- 실행 API, Worker, Scheduler 구현
- Batch 실행 버튼 추가
- Job/Item 상태 변경
- `EXECUTING` 전환
- DB write 또는 기존 payload 수정
- 네이버 API 스펙 확정 또는 실제 호출
- LIVE adapter 구현
- Prisma schema 변경 또는 migration 생성
