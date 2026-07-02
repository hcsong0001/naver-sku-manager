# Task 426 - Naver 상품 식별 전략 재설계 및 공식 구조 검토

## 목적

사용자가 승인 문구를 제공했다.

```
Naver 상품 식별 전략 재설계 및 공식 구조 검토를 별도로 승인합니다.
```

Task 426은 실제 Naver API 재호출 없이, 지금까지 확보한 Task 409~425 결과와 Naver Commerce API 공식 구조를 기준으로 상품 식별 전략을 재설계하는 read-only Task다.

---

## Task 409~425 증거 요약

| Task | 주요 결과 |
|------|-----------|
| Task 409 | 상품 조회 API 1회 성공 (HTTP 200), top-level keys: originProduct / smartstoreChannelProduct |
| Task 416 | 기존 candidate path 7개 모두 exists false, confidenceScore: 30, matchConfirmed: false |
| Task 421 | 추가 탐색 재조회 1회 성공, 기존 7개 path exists false, 추가 5개 path exists true but equalsTargetProductNo false |
| Task 422 | matchedCandidatePathCount: 0, decisionStatus: PRODUCT_IDENTITY_STILL_NOT_CONFIRMED, 수정 API: BLOCKED |
| Task 423 | randomFieldExplorationRecommended: false, officialStructureReviewNeeded: true |
| Task 424 | 승인 Packet 생성, WAITING_FOR_SEPARATE_USER_APPROVAL |
| Task 425 | Final Gate, approvalAccepted: false (사용자 문구 대기) |

Task 421 추가 탐색 5개 path:
- originProduct.deliveryInfo.claimDeliveryInfo.returnAddressId
- originProduct.deliveryInfo.claimDeliveryInfo.shippingAddressId
- originProduct.deliveryInfo.deliveryBundleGroupId
- originProduct.detailAttribute.naverShoppingSearchInfo.brandId
- originProduct.leafCategoryId

---

## 공식 구조 검토 항목

### R1. 조회 API 요청에 사용한 상품번호 6597910207의 의미
- 현재 증거: HTTP 200 성공했으나 응답 내부에서 이 값과 일치하는 필드를 찾지 못함
- 공식 구조 해석: 통상 channelProductNo(스마트스토어 채널 상품번호)로 요청 경로에만 사용되며 응답 body에 그대로 반환되지 않는 구조일 수 있음
- 전략 결정: 수정 API 진입 시 동일 channelProductNo를 경로 파라미터로 사용 가능한지 별도 확인 필요

### R2. 응답 top-level key originProduct의 역할
- 현재 증거: originProduct 하위 필드들(originProductNo, id, productNo 등) 모두 exists false
- 공식 구조 해석: 단일 스마트스토어 상품의 경우 originProduct 일부 필드가 비어 있을 수 있음
- 전략 결정: smartstoreChannelProduct 기반 식별이 더 적합할 가능성이 높음

### R3. 응답 top-level key smartstoreChannelProduct의 역할
- 현재 증거: channelProductNo, id 등 하위 필드 모두 exists false
- 공식 구조 해석: channelProductNo가 응답 body에 없는 것은 요청 파라미터로만 사용되는 구조일 수 있음
- 전략 결정: 공식 문서 기반으로 수정 API에서 이 필드가 어떻게 제공되는지 재확인 필요

### R4. channelProductNo / originProductNo / productNo / id 후보 관계
- 현재 증거: 기존 7개 candidate path 모두 exists false
- 공식 구조 해석: API 버전 또는 상품 타입에 따라 이름이나 위치가 다를 수 있음
- 전략 결정: 공식 API 스키마나 예시 응답 문서를 통해 검증 필요

### R5. Task 421 추가 5개 값이 식별자로 부적합한 이유
- 현재 증거: returnAddressId, shippingAddressId, deliveryBundleGroupId, brandId, leafCategoryId는 exists true이지만 값이 6597910207과 다름
- 공식 구조 해석: 이 5개 필드는 배송/브랜드/카테고리 관련 ID로 상품 식별 목적의 필드가 아님
- 전략 결정: 이 5개 필드 및 무작위 nested field 탐색 전략 폐기

### R6. 수정 API 진입 전 필요한 최소 식별 근거
- 현재 증거: 수정 API에 필요한 식별자 미확정, productUpdateApiEntryDecision BLOCKED
- 공식 구조 해석: 수정 API는 통상 channelProductNo 또는 originProductNo를 요구
- 전략 결정: 공식 문서에서 수정 API 요구 파라미터 명확히 정의 후 진입 허용

### R7. 다음 안전 수집 또는 판단 방향
- 현재 증거: Task 423에서 officialStructureReviewNeeded: true로 판단됨
- 공식 구조 해석: 4가지 전략 후보 존재
- 전략 결정: Task 427에서 우선순위 판단

---

## 식별 전략 재설계 결론

무작위 nested field 탐색을 중단한다. 상품번호 6597910207은 조회 API에서 channelProductNo로 유효하게 사용됐지만 응답 내부에서 이 값과 일치하는 필드를 확인하지 못했다. 수정 API 진입 전 공식 구조 기준으로 필요한 식별자를 재정의해야 하며, 현재 증거만으로는 수정 API 진입이 불가하다. productUpdateApiEntryDecision은 BLOCKED를 유지한다.

다음 전략 후보:
- A(권장): 조회 경로 파라미터(channelProductNo)를 수정 API에도 동일하게 사용 가능한지 공식 검토
- B: smartstoreChannelProduct / originProduct 내 식별자 생략/마스킹 여부 검토
- C: 수정 API endpoint 요구 파라미터 별도 검토
- D: 수정 API 요청 payload 생성 전용 read-only 설계 화면 먼저 구성

---

## 상품 수정 API 진입 BLOCKED 유지

상품 식별 미확정 상태이므로 수정 API 진입은 계속 BLOCKED다.

---

## 실제 API 호출 없음

Task 426은 완전 read-only 화면이다.

- Naver API 재호출 없음
- 상품 수정 API 호출 없음
- 가격/재고 변경 없음
- DB write 없음
- raw response 표시/저장 없음
- secret/token/header/signature 노출 없음
- POST API 추가 없음
- 버튼/form/submit action 없음

---

## 다음 Task 제안

Task 427 - Naver 상품 식별 전략 재설계 결과 판단 화면
