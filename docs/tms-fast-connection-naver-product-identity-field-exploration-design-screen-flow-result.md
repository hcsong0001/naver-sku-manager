# Task 418 - Naver 상품 식별 필드 추가 탐색 설계 화면

## 목적

Task 416/417 결과를 바탕으로, 추가 API 호출 없이 다음 단계에서 어떤 상품 식별 필드를
안전하게 탐색해야 하는지 read-only 설계 화면으로 정리한다.

## Task 416/417 결과 요약

- Task 416 실제 재조회 성공: `true`
- HTTP status: `200`
- responseShapeKeys: `originProduct`, `smartstoreChannelProduct`
- 기존 candidate path 수: `7`
- 확인된 candidate path 수: `0`
- Task 417 판단 결과: `PRODUCT_IDENTITY_NOT_CONFIRMED`
- 상품 수정 API 진입 판단: `BLOCKED`

## 기존 candidate path 실패 요약

기존 candidate path 7개에서는 상품번호 `6597910207`과 일치하는 식별 필드를 확인하지 못했다.
따라서 상품 수정 API 진입은 계속 차단 상태를 유지한다.

## 추가 탐색 후보 그룹

1. top-level key 하위의 product/channel/origin 계열 key name 재탐색
2. smartstoreChannelProduct 내부의 식별자 후보 key name 재탐색
3. originProduct 내부의 식별자 후보 key name 재탐색
4. channelProductNo / originProductNo / productNo / id와 유사한 이름의 nested key 탐색
5. 값 비교가 필요한 후보는 다음 별도 승인 Task에서 masked last4 + equalsTargetProductNo boolean만 수집

모든 후보 그룹은 이번 Task에서 아래 조건을 유지한다.

- `requiresApiRecall: false`
- `requiresSeparateApproval: true`

## 이번 Task에서 실제 API 호출이 없었음을 명시

- Naver API 재호출 없음
- 상품 수정 API 호출 없음
- DB write 없음
- raw response 전체 표시/저장 없음
- secret/token/header/signature 노출 없음

## 상품 수정 API 진입 BLOCKED 유지

- `designStatus: FIELD_EXPLORATION_DESIGN_READY`
- `explorationNeeded: true`
- `explorationMode: DESIGN_ONLY`
- `currentProductUpdateApiEntryDecision: BLOCKED`
- `nextCollectionRequiresSeparateApproval: true`

## 다음 Task 제안

- `Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet`
