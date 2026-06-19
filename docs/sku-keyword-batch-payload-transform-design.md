# SKU Keyword Matching Batch payload 변환 설계

## 문서 목적

이 문서는 SKU Keyword Matching에서 저장된 Batch Item의 검토 근거를 실제 실행 요청으로 변환하기 전에 필요한 책임 경계, 입력값, 재검증, 실패 처리 원칙을 정의한다.

이번 단계에서는 네이버 API endpoint와 요청 스펙을 확정하지 않으며, payload 변환 함수, 실행 API, Worker, Scheduler, LIVE adapter 또는 네이버 API 호출을 구현하지 않는다.

## 핵심 원칙

> 저장 payload는 검토·승인 당시의 근거 자료이고, 실행 payload는 실행 직전 최신 문맥을 재검증한 뒤 별도로 생성하는 요청 자료이다.

- 저장된 `requestPayload`, `previewBefore`, `previewAfter`는 수정하거나 덮어쓰지 않는다.
- 저장 payload 전체를 네이버 API 요청 body로 전달하지 않는다.
- 실행 payload는 최종 실행 자격과 최신값 검증을 모두 통과한 Item에 대해서만 생성한다.
- 변환 결과는 저장 근거와 추적 가능해야 하지만, 저장 근거 자체를 실행 요청 필드로 오인하지 않는다.
- SKU Keyword Matching의 키워드·memo·검토 메시지는 매핑 근거이며 네이버 가격/재고 요청에 직접 전달하지 않는다.
- 네이버 공식 요청 스펙과 operation registry가 확정되지 않은 상태에서는 LIVE 요청을 생성하지 않는다.

## 현재 저장 구조

### Batch Job

현재 Keyword Batch는 다음 문맥으로 저장된다.

- `jobType`: `PRICE_STOCK_UPDATE`
- `module`: `SKU_KEYWORD_MATCHING`
- `status`: 최초 `DRAFT`, 검토 승인 후 `APPROVED`
- `dryRun`: 현재 `true` 유지
- `previewSummary`: dry-run 수량과 위험 요약
- `approvedAt`, `approvedBy`: 현재 Keyword 승인 흐름에서는 기록하지 않음

### Batch Item의 별도 컬럼

- `batchJobId`, `id`: Job/Item 추적 식별자
- `storeId`: 내부 Smartstore 식별자
- `channelProductNo`: 채널 상품번호
- `targetType`: `SINGLE`, `OPTION`, `ADDITIONAL`, 또는 비정상 `UNKNOWN`
- `targetId`: 상품번호 또는 옵션/추가상품 item 식별자
- `operation`: `UPDATE_PRICE`, `UPDATE_STOCK`, `UPDATE_PRICE_AND_STOCK`, 또는 비정상 `UNKNOWN`
- `previewBefore`: 저장 당시 스마트스토어 현재 가격/재고
- `previewAfter`: 저장 당시 목표 가격/재고
- `calculationType`: 단품은 `SINGLE`, 세트상품은 `BUNDLE`
- `status`: 최초 `DRAFT`, 검토 승인 후 `READY`

Item 컬럼과 `requestPayload` 안의 값이 다르면 자동 보정하지 않는다. 불일치 자체를 변환 실패로 처리하고 재검토해야 한다.

## `requestPayload.candidate` 필드

현재 저장되는 `candidate`는 `SkuKeywordBulkLikeCandidate` 전체이다.

### 식별·대상 문맥

- `id`, `sourceCandidateId`, `sourceSeedKey`
- `storeId`, `storeName`, `channelId`
- `channelProductNo`, `itemId`
- `candidateType`, `sourceMappingType`
- `productName`, `itemName`, `serialNo`

### SKU·세트 문맥

- `isSetProduct`
- `linkedSkus`, `bundleSkus`
- 각 SKU의 `skuId`, `skuCode`, 내부/legacy 코드, barcode, 상품명, 수량
- 각 SKU의 판매가, 원가, 재고와 해석 출처

### 가격·재고 계산 문맥

- `currentSmartstorePrice`, `currentSmartstoreStock`
- `calculatedTargetPrice`, `calculatedTargetStock`
- `hasPriceChange`, `hasStockChange`
- `costPrice`, `expectedMargin`, `marginRate`

### 품질·검토 근거

- `status`, `riskTypes`, `riskMessages`
- `recommendedAction`, `executable`, `draftCreatable`, `issues`
- `source`, `warningType`, `warningMessage`
- `memo`, `reviewMessage`
- `currentStateSyncedAt`, `currentStateSource`

현재 candidate에는 네이버 API에 전송할 canonical `keyword` 필드가 별도로 정의되어 있지 않다. `memo`, `reviewMessage`, 상품명 또는 경고 문구에서 키워드를 추출해 실행 요청에 넣어서는 안 된다. 이 정보는 SKU 매핑과 후보 생성의 감사 근거로만 사용한다.

## `requestPayload.dryRunItem` 필드

현재 저장되는 `dryRunItem`은 서버 dry-run 결과이다.

- `candidateId`: candidate 연결 식별자
- `targetType`: `SINGLE`, `OPTION`, `ADDITIONAL`, `UNKNOWN`
- `changeType`: `PRICE`, `STOCK`, `PRICE_AND_STOCK`, `UNKNOWN`
- `executable`: 저장 당시 실행 가능성 판정
- `blockedReasons`: 저장 당시 hard blocker
- `warnings`: 업로드 문맥, 채널 ID 등 확인 필요 정보
- `riskLevel`: `LOW`, `MEDIUM`, `HIGH`
- `sourceSummary`: 현재값의 출처
- `before.price`, `before.stock`: 저장 당시 현재값
- `after.price`, `after.stock`: 저장 당시 목표값

`dryRunItem.executable=true`는 저장 당시 판정일 뿐 실제 실행 허가가 아니다. 실행 직전 동일 조건과 최신 외부 문맥을 다시 검증해야 한다.

## 저장 payload와 실행 payload의 책임 분리

| 저장 정보 | 역할 | 실제 요청 사용 방식 |
| --- | --- | --- |
| `candidate` 식별자와 SKU 문맥 | 매핑·계산 근거 | 대상 식별과 재계산 입력으로만 사용 |
| `memo`, `reviewMessage`, 경고 | 검토·감사 근거 | 네이버 요청 body에 전달하지 않음 |
| `dryRunItem.before` | 저장 당시 현재값 | 실행 시 최신값과 비교하는 기준 |
| `dryRunItem.after` | 저장 당시 목표값 | 정책 재계산 결과와 일치할 때만 요청 후보로 사용 |
| `previewBefore/After` | Item 수준 변경 근거 | dryRunItem과 교차 검증 |
| `operation` | 내부 변경 의도 | operation registry의 공식 operation으로 변환 필요 |
| `targetType`, `targetId` | 내부 대상 구분 | 네이버 공식 식별자와 매핑·검증 필요 |
| `linkedSkus`, `bundleSkus` | 단품/세트 계산 근거 | 네이버 요청에 직접 전달하지 않고 목표 재고 계산에 사용 |
| `riskTypes`, `issues` | 품질 판정 근거 | 차단·경고 판정에 사용, 요청 body에는 미포함 |

## 변환 단계 입력값

payload transformer가 받는 논리 입력은 다음 범주로 분리한다.

### 저장 식별자

- Batch Job ID
- Batch Item ID
- 저장된 Item의 `operation`, `targetType`, `targetId`
- 저장된 `requestPayload.candidate`, `requestPayload.dryRunItem`
- 저장된 `previewBefore`, `previewAfter`

### 스토어·판매자 문맥

- 내부 `storeId`
- 네이버 channel/seller 식별자
- 채널 상품번호와 원상품번호 등 공식 API가 요구하는 상품 식별자
- 인증 문맥은 transformer에 비밀값으로 전달하지 않고 호출 계층에서 별도로 주입

### 키워드·매핑 근거

- candidate source와 seed key
- 확정 SKU 및 세트 구성
- 매칭 메모, 경고, 검토 메시지

키워드·매핑 근거는 추적·설명에 사용하며 가격/재고 요청 필드로 직접 변환하지 않는다.

### 실행 시점 최신 문맥

- 최신 상품/옵션/추가상품 상태
- 최신 스마트스토어 가격과 판매재고
- 최신 SKU 가격·원가·재고
- 세트상품 구성별 최신 재고와 수량
- 최신 문맥의 출처와 조회 시각

### 최종 승인 문맥

- 최종 실행 승인자
- 최종 실행 승인 시각
- 승인 대상 payload 또는 변경안의 해시/버전
- 사용자 확인 범위와 확인된 경고

현재 Keyword 승인 흐름에는 이 최종 실행 승인 문맥이 없으므로, 실제 transformer 실행 전 별도 설계가 필요하다.

## 실행 전 필수 재검증

상세 실행 자격, 최신 문맥 차이, risk/blocked 재계산과 전체 차단 정책은 [SKU Keyword Matching Batch 실행 전 재검증 설계](./sku-keyword-batch-pre-execution-validation-design.md)를 따른다.

### Job 수준

- `jobType === PRICE_STOCK_UPDATE`
- `module === SKU_KEYWORD_MATCHING`
- Job status가 최종 실행 계약에서 허용하는 상태인지 확인
- 현행 권장안에서는 `APPROVED`만으로 충분하지 않으며 최종 실행 승인 필요
- `dryRun === false`인지 확인
- `approvedAt`, `approvedBy`가 존재하고 최종 실행 승인을 뜻하는지 확인
- `totalItems`와 실제 Item 수가 일치하는지 확인
- `previewSummary.blockedCount`, `riskCount`의 저장값과 실제 Item 검증 결과 비교

`previewSummary.blockedCount`와 `riskCount`는 dry-run 당시 집계 참고값이다. 실행 가능 여부의 단독 근거로 사용하지 않고 각 Item을 다시 검증한다.

### Item 수준

- Item status가 `READY`인지 확인
- `requestPayload`가 JSON object인지 확인
- `candidate`, `dryRunItem` 구조와 필수 필드 확인
- Item `id`와 candidate/dryRunItem 연결 식별자 일치 확인
- Item 컬럼의 `targetType`, `targetId`, `operation`이 저장 payload와 모순되지 않는지 확인
- `dryRunItem.executable === true`
- `blockedReasons`가 비어 있음
- `riskLevel !== HIGH`
- `CURRENT_PRICE_UNAVAILABLE`, `CURRENT_STOCK_UNAVAILABLE`, `NEEDS_CONTEXT` 없음
- `before/after`에서 operation에 필요한 가격·재고가 모두 존재
- 숫자 범위, 재고 정수, 음수 금지 등 도메인 제약 확인
- `UNKNOWN` target/operation은 즉시 차단

### 최신 상태 차이

- 실행 시점 최신 현재값과 `previewBefore`, `dryRunItem.before` 비교
- 저장된 목표값과 최신 SKU/세트 계산 결과 비교
- 최신값이 달라지면 저장 payload를 덮어쓰지 않고 stale로 차단
- 목표값이 달라지면 새 preview와 재승인 요구
- 이미 목표값과 동일한 경우 호출 없이 `SKIPPED` 처리할지는 별도 정책 확정 필요

## 바로 사용할 수 없는 값과 변환 필요 값

### 바로 사용할 수 없는 값

- `candidate` 전체 object
- `dryRunItem` 전체 object
- `memo`, `reviewMessage`, `warningMessage`
- `riskTypes`, `issues`, `recommendedAction`
- `storeName`, 상품명, 옵션명
- `linkedSkus`, `bundleSkus`
- `sourceSummary`, `currentStateSource`
- 저장 당시 `before` 값

이 값들은 검증·감사·계산 근거이지 네이버 요청 body가 아니다.

### 변환이 필요한 값

- `targetType`: 공식 상품/옵션/추가상품 API operation 선택으로 변환
- `targetId`: 네이버가 요구하는 product/option/additional 식별자로 검증·변환
- `operation`: `UPDATE_PRICE`, `UPDATE_STOCK`, `UPDATE_PRICE_AND_STOCK`을 registry operation으로 해석
- `after.price`: 공식 요청의 가격 필드·단위·범위에 맞춰 변환
- `after.stock`: 공식 요청의 재고 필드·정수 범위에 맞춰 변환
- `storeId`, `channelId`: 호출 context와 인증 대상 스토어로 변환
- 세트 구성: 최신 구성 재고를 다시 계산한 목표 판매재고로 변환

현재 operation registry에는 Keyword Batch의 세 operation에 대응하는 공식 요청 타입과 endpoint가 확정되어 있지 않다. 이름이 같다는 이유로 임의 endpoint나 요청 body를 만들지 않는다.

## 변환 결과의 개념 구조

후속 구현에서 transformer 결과는 네이버 호출 자체가 아니라 다음 정보를 담는 불변의 중간 결과여야 한다.

- 변환 성공 여부
- Batch Job/Item ID
- 공식 registry operation 식별자와 버전
- 호출 대상 store/channel context
- 검증된 네이버 대상 식별자
- 변환된 요청 payload
- 최신값과 목표값 요약
- 최종 승인 문맥 참조
- 저장 근거 payload의 hash 또는 버전 참조
- 경고와 차단 사유
- idempotency key 생성 입력

구체 TypeScript 타입과 함수는 이번 단계에서 작성하지 않는다.

## 변환 실패 처리

### 실행 시작 전 실패

Worker가 외부 호출을 시작하기 전 전체 Item을 변환·검증하는 것을 기본으로 한다. 하나라도 다음 오류가 있으면 Job 전체 실행을 시작하지 않는다.

- payload 누락 또는 schema 불일치
- Item 컬럼과 payload 식별자 불일치
- 미지원 target/operation
- 승인 메타데이터 누락
- stale 현재값
- blocked/HIGH/문맥 부족
- 공식 API operation 미등록

이 단계의 실패는 외부 호출 전 검증 실패이며, 기존 Item payload를 수정하거나 일부 Item만 `EXECUTING`으로 전환하지 않는다.

### 실행 시작 후 실패

모든 사전 변환이 성공한 뒤 실행 중 일부 호출만 실패하면 partial failure가 가능하다.

- 성공 Item은 `SUCCESS` 결과 유지
- 실패 Item은 오류 유형과 응답을 기록
- 재시도 가능한 Item만 `RETRY_PENDING` 후보
- Job은 남은 Item 상태를 집계해 `EXECUTING`, `PARTIAL_SUCCESS`, `FAILED`, `EXECUTED` 중 현행 enum 정책으로 결정
- 성공 Item을 자동 롤백하지 않음

### 재시도 가능 기준

재시도 가능 후보:

- timeout, 일시적 network 오류
- `429` rate limit
- 공식 정책상 재시도 가능한 일시적 `5xx`
- 최신 문맥 조회의 일시적 실패

자동 재시도 불가:

- payload schema/타입 오류
- target 식별자 불일치 또는 미지원 target
- 인증·권한 오류
- 최종 승인 누락
- stale 현재값 또는 목표 재계산 불일치
- 비즈니스 validation 실패
- 공식 operation 미등록

자동 재시도 불가 항목은 새 preview, 사용자 검토 또는 설정 수정 후에만 다시 후보가 될 수 있다.

## 감사와 보존 원칙

- 저장된 `requestPayload`, `previewBefore`, `previewAfter`는 불변 근거로 보존
- 변환 결과와 실제 전송 payload는 별도 감사 로그에 마스킹해 기록
- 저장 payload hash, 최종 승인 hash, 실제 요청 hash를 연결할 수 있어야 함
- 최신 문맥 조회 시각과 출처 기록
- 변환 실패도 Item ID와 사유를 남기되 원본을 수정하지 않음
- 네이버 응답과 내부 해석 결과를 구분해 기록

## 네이버 API 스펙 확정 전 경계

이번 문서에서는 다음을 확정하지 않는다.

- 상품/옵션/추가상품별 실제 endpoint
- 가격/재고 요청 body의 공식 필드명
- 옵션가가 최종가인지 가감액인지에 대한 실행 API 규칙
- API별 최대 재고·가격 범위
- operation별 method, version, timeout, max retry
- 네이버 API의 idempotency 지원 여부

공식 문서와 샘플 응답을 별도 검토하고 operation registry의 타입·validation 계약을 승인한 뒤에만 상세 payload를 설계한다. 이번 단계에서는 실제 네이버 API를 호출하지 않는다.

## 후속 작업 순서

1. 네이버 공식 상품/옵션/추가상품 가격·재고 변경 API 스펙 확인
2. `UPDATE_PRICE`, `UPDATE_STOCK`, `UPDATE_PRICE_AND_STOCK` operation 계약 설계
3. targetType별 공식 식별자 매핑 규칙 설계
4. 실행 시점 최신값 조회와 stale 판정 계약 설계
5. 최종 실행 승인 메타데이터와 payload hash 계약 확정
6. transformer 입력/결과 타입과 순수 함수 설계
7. fixture 기반 변환 테스트 설계
8. 별도 보안·운영 승인
9. 승인 후에만 코드 구현

실행 API, Worker, Scheduler, LIVE adapter와 네이버 API 호출은 위 설계와 승인이 완료되기 전까지 구현하지 않는다.
