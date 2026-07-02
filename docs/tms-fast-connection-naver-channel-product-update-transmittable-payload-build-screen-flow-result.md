# Task 437 - Naver 채널 상품 수정 Transmittable Payload 생성

## Task 437 목적

사용자가 아래 승인 문구를 제공한 상태에서, `channelProductNo = 6597910207` 기준으로 실제 수정 API 호출 없이 전송 가능한 payload 후보를 안전하게 만들 수 있는지 판단한다.

- 승인 문구: `Naver 채널 상품 수정 Transmittable Payload 생성을 별도로 승인합니다.`
- 허용 범위: payload 생성 가능 여부 판단과 후보 생성
- 금지 범위: 수정 API 호출, 가격 변경, 재고 변경, DB write

## Task 434~436 결과 요약

- Task 434: Payload Safety Review 완료
- Task 435: Transmittable Payload 승인 Packet 대기 상태
- Task 436: Final Gate에서 별도 승인 문구 대기 상태
- 가격 변경 허용 여부: `false`
- 재고 변경 허용 여부: `false`
- 수정 API 호출 가능 여부: `false`

## payload 생성 가능 여부

- source data가 충분하면 `TRANSMITTABLE_PAYLOAD_BUILD_COMPLETED`
- source data가 부족하면 `TRANSMITTABLE_PAYLOAD_BUILD_BLOCKED_BY_SOURCE_DATA_GAP`
- placeholder, 임의 값, 추정 값이 섞이면 payload 후보를 생성하지 않음

## source data gap 여부

기본 read-only 흐름에서는 실제 전송 가능한 payload 생성을 위한 source data snapshot이 제공되지 않으므로 기본 응답은 차단 상태로 유지된다.

- `sourceDataGapDetected = true`
- `transmittablePayloadGenerated = false`
- placeholder payload 생성 없음

## 생성된 경우 payload summary

성공 조건이 충족된 fixture 또는 이후 안전한 source data가 제공된 경우에만 아래 요약을 표시한다.

- `path.channelProductNo`
- `method`
- `endpoint`
- `body` 최상위 key 목록
- `priceChangeIncluded: false`
- `stockChangeIncluded: false`
- `updateApiCalled: false`
- `requiresFinalExecutionApproval: true`

## 생성 차단된 경우 차단 사유

다음과 같은 조건이 하나라도 충족되지 않으면 payload 생성은 차단된다.

- 실제 source data snapshot 부재
- 기존 상품 구조 보존 가능 여부 미확인
- `originProduct` 필수 source data 부족
- `smartstoreChannelProduct` 필수 source data 부족
- placeholder 또는 임의/추정 값 감지
- secret/token/header/signature 제거 미확인

## 수정 API 호출 없음

- `canCallUpdateApi: false`
- `updateApiCalled: false`
- `actualProductUpdateApiCall: false`

## 가격/재고 변경 없음

- `priceChangeAllowed: false`
- `stockChangeAllowed: false`
- `actualPriceChange: false`
- `actualStockChange: false`

## 다음 Task 제안

- `Task 438 - Naver 채널 상품 수정 Transmittable Payload 결과 판단 화면`
