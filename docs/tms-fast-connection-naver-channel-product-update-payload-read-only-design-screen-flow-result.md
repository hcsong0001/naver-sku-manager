# Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계

## 목적

사용자가 Task 430에서 발급된 승인 문구를 제공했다. Task 431은 실제 수정 API 호출 없이, channelProductNo = 6597910207 기준으로 채널 상품 수정 API에 필요한 payload 구조를 read-only로 설계하는 화면이다.

이번 Task에서는 실제 전송 가능한 payload를 만들지 않는다. 가격/재고 변경도 하지 않는다.

---

## 사용자 승인 문구

```
Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.
```

approvedPhraseAccepted: true

---

## Task 429/430 결과 요약

| 항목 | 결과 |
|------|------|
| officialUpdateEndpoint | PUT /v2/products/channel-products/:channelProductNo |
| channelProductNoCanBeUsedAsUpdatePathParameter | true |
| identifierReviewDecision | CHANNEL_PRODUCT_NO_CAN_BE_USED_AS_UPDATE_PATH_PARAMETER |
| approvalPacketStatus (Task 430) | WAITING_FOR_SEPARATE_USER_APPROVAL |
| 승인 문구 확인 | true |

---

## channelProductNo Path Parameter 설계

```
PUT /v2/products/channel-products/6597910207
pathParameterName: channelProductNo
pathParameterValue: 6597910207
transmittable: false
```

---

## Payload Top-Level 설계

body 최상위 구조는 Task 409 조회 응답 최상위 키와 동일하게 설계:

- originProduct
- smartstoreChannelProduct

---

## originProduct / smartstoreChannelProduct 분리 설계

originProduct:
- 설계 전용 (designOnly: true)
- 실제 값 미포함 (actualValuesIncluded: false)
- 상품명 미포함 (fullProductNameIncluded: false)
- 가격 변경 미포함 (priceChangeIncluded: false)
- 재고 변경 미포함 (stockChangeIncluded: false)

smartstoreChannelProduct:
- 설계 전용 (designOnly: true)
- 실제 값 미포함 (actualValuesIncluded: false)

---

## 기존 상품 구조 보존 원칙

- 변경 의도가 없는 필드는 payload에 포함하지 않음
- 가격/재고/상품명/옵션은 명시적 변경 승인 없이 payload 포함 금지
- 수정 API 호출 전 기존 값과 비교 기준 확인 필요

---

## 가격/재고 변경 없음

가격/재고 필드는 이번 Task에서 변경 대상이 아님. 가격/재고 수정을 위한 별도 Task와 안전 비교 기준이 확정된 이후에만 포함 가능.

---

## 실제 전송 가능한 Payload 생성 없음

Non-Transmittable Payload Draft:
```json
{
  "path": { "channelProductNo": "6597910207", "transmittable": false },
  "bodyDesign": {
    "originProduct": { "designOnly": true, "actualValuesIncluded": false, "priceChangeIncluded": false, "stockChangeIncluded": false },
    "smartstoreChannelProduct": { "designOnly": true, "actualValuesIncluded": false }
  },
  "safety": { "transmittablePayloadGenerated": false, "updateApiCallable": false, "requiresNextReview": true }
}
```

위 초안은 실제 API 요청 body로 사용할 수 없다.

---

## 수정 API 호출 없음

- designStatus: READ_ONLY_PAYLOAD_DESIGN_COMPLETED
- payloadDesignMode: READ_ONLY_NON_TRANSMITTABLE
- canBuildTransmittablePayload: false
- canCallUpdateApi: false
- productUpdateApiEntryDecision: BLOCKED_UNTIL_PAYLOAD_SAFETY_REVIEW

---

## 다음 Task 제안

Task 432 - Naver 채널 상품 수정 Payload 설계 결과 판단 화면
