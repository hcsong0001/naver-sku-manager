# Task 421 - Naver 상품 식별 필드 추가 탐색 실제 수집

## 목적

사용자의 별도 승인 문구가 확인된 상태에서, 상품번호 `6597910207`에 한해 Naver 상품 조회 API를
최대 1회만 재조회하고 raw response 전체를 저장하거나 표시하지 않은 상태로 상품 식별에 필요한
추가 key name 및 masked comparison 정보만 수집한다.

## 사용자 승인 문구

```text
Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.
```

## 실제 재조회 수행 결과

- 실제 재조회 수행 여부: `true`
- 실제 재조회 횟수: `1`
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대상 상품번호: `6597910207`
- 실행 시작 시각: `2026-07-02T13:36:57.0216000+09:00`
- 실행 완료 시각: `2026-07-02T13:36:59.4630855+09:00`
- HTTP status: `200`
- success: `true`

## masked key exploration 결과

- topLevelKeys:
  - `originProduct`
  - `smartstoreChannelProduct`
- exploredKeyNameGroups:
  - `top-level-key-names` -> `originProduct`, `smartstoreChannelProduct`
  - `smartstore-channel-product-key-names` -> `storeKeepExclusiveProduct`, `naverShoppingRegistration`, `channelProductDisplayStatusType`
  - `origin-product-key-names` -> `statusType`, `saleType`, `leafCategoryId`, `name`, `detailContent`, `images`, `salePrice`, `stockQuantity`, `deliveryInfo`, `detailAttribute`, `customerBenefit`
  - `identifier-like-nested-key-names` -> `brandId`, `channelProductDisplayStatusType`, `customProductYn`, `deliveryBundleGroupId`, `id`, `itselfProductionProductYn`, `kcCertifiedProductExclusionYn`, `leafCategoryId`, `originAreaCode`, `originAreaInfo`, `originProduct`, `productAttributes`, `productInfoProvidedNotice`, `productInfoProvidedNoticeType`, `returnAddressId`, `shippingAddressId`, `smartstoreChannelProduct`, `storeKeepExclusiveProduct`, `supplementProductInfo`, `supplementProducts`
- candidateFieldResults:
  - `smartstoreChannelProduct.channelProductNo` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `smartstoreChannelProduct.id` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `smartstoreChannelProduct.productNo` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `smartstoreChannelProduct.originProductNo` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.originProductNo` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.id` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.productNo` -> `exists: false`, `valueType: null`, `maskedPreviewLast4: null`, `equalsTargetProductNo: null`
  - `originProduct.deliveryInfo.claimDeliveryInfo.returnAddressId` -> `exists: true`, `valueType: number`, `maskedPreviewLast4: ****1499`, `equalsTargetProductNo: false`
  - `originProduct.deliveryInfo.claimDeliveryInfo.shippingAddressId` -> `exists: true`, `valueType: number`, `maskedPreviewLast4: ****5497`, `equalsTargetProductNo: false`
  - `originProduct.deliveryInfo.deliveryBundleGroupId` -> `exists: true`, `valueType: number`, `maskedPreviewLast4: ****9127`, `equalsTargetProductNo: false`
  - `originProduct.detailAttribute.naverShoppingSearchInfo.brandId` -> `exists: true`, `valueType: number`, `maskedPreviewLast4: ****0560`, `equalsTargetProductNo: false`
  - `originProduct.leafCategoryId` -> `exists: true`, `valueType: string`, `maskedPreviewLast4: ****3397`, `equalsTargetProductNo: false`
- productIdentityConfidenceScore: `30`
- productIdentityMatchConfirmed: `false`
- productUpdateApiEntryDecision: `BLOCKED`
- sanitizedErrorMessage: `null`

## 안전 금지선 확인

- 상품 수정 API 호출 없음
- 가격 변경 없음
- 재고 변경 없음
- DB write 없음
- raw response 전체 표시/저장 없음
- full product name/full option name/full seller management code 노출 없음
- secret/token/header/signature 노출 없음
- 반복 조회/다른 상품 조회 없음
- Worker/Queue/Runtime 실행 없음
- POST API / 버튼 / form / submit action 추가 없음

## 다음 Task 제안

- `Task 422 - Naver 상품 식별 추가 탐색 결과 판단 화면`
