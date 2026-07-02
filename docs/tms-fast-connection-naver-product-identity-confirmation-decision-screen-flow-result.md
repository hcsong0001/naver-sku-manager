# Task 417 - Naver 상품 식별 확정 판단 화면

## 목적

Task 416 실제 마스킹 응답 shape 보강 수집 결과를 바탕으로, 상품번호 `6597910207`에 대해
상품 식별을 확정할 수 있는지 read-only로 판단하고 상품 수정 API 진입 가능 여부를 다시 결정한다.

## Task 416 입력 요약

- source task: `Task 416`
- 실제 재조회 수: `1`
- HTTP status: `200`
- 성공 여부: `true`
- responseShapeKeys:
  - `originProduct`
  - `smartstoreChannelProduct`
- candidate path 7개:
  - `smartstoreChannelProduct.channelProductNo` → `exists false`
  - `smartstoreChannelProduct.id` → `exists false`
  - `smartstoreChannelProduct.productNo` → `exists false`
  - `smartstoreChannelProduct.originProductNo` → `exists false`
  - `originProduct.originProductNo` → `exists false`
  - `originProduct.id` → `exists false`
  - `originProduct.productNo` → `exists false`

## 상품 식별 확정 판단 기준

아래 조건을 모두 만족해야 상품 식별을 확정한다.

- `productIdentityMatchConfirmed === true`
- `productIdentityConfidenceScore === 100`
- `candidatePathResults` 중 `equalsTargetProductNo === true` 항목이 1개 이상 존재

위 조건을 모두 만족하면:

- `decisionStatus: PRODUCT_IDENTITY_CONFIRMED`
- `productUpdateApiEntryDecision: REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL`

조건을 만족하지 못하면:

- `decisionStatus: PRODUCT_IDENTITY_NOT_CONFIRMED`
- `productUpdateApiEntryDecision: BLOCKED`
- `blockedReason: PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_SHAPE_AUGMENTATION`

## 실제 판단 결과

- `productIdentityConfidenceScore: 30`
- `productIdentityMatchConfirmed: false`
- `confirmedCandidatePathCount: 0`
- `decisionStatus: PRODUCT_IDENTITY_NOT_CONFIRMED`
- `productUpdateApiEntryDecision: BLOCKED`
- `blockedReason: PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_SHAPE_AUGMENTATION`
- `decisionReason: 상품 조회 API 호출은 성공했지만 상품번호 6597910207과 일치하는 식별 필드가 확인되지 않아 상품 식별을 확정하지 못했습니다. 따라서 상품 수정 API 진입은 계속 보류합니다.`

## 상품 수정 API 진입 보류 사유

Task 416에서 top-level response shape는 확인되었지만 candidate path 7개 모두에서
식별 일치 증거를 확보하지 못했다. 따라서 상품 수정 API로 넘어가기 위한 상품 식별 확정 조건을 만족하지 못한다.

## 안전 금지선 유지 확인

- Naver API 재호출 없음
- 상품 수정 API 호출 없음
- 가격 변경 없음
- 재고 변경 없음
- DB write 없음
- raw response 전체 표시 없음
- raw response 저장 없음
- secret/token/header/signature 노출 없음
- full product name 노출 없음
- full option name 노출 없음
- full seller management code 노출 없음
- Worker 실행 없음
- Queue enqueue 없음
- Runtime 운영 전환 없음
- POST API / 실행 버튼 / 승인 버튼 / submit action 추가 없음

## 다음 Task 제안

- `Task 418 - Naver 상품 식별 필드 추가 탐색 설계 화면`
