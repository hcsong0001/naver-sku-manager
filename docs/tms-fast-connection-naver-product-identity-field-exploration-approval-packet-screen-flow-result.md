# Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet

## 목적

Task 418 설계 결과를 바탕으로, 다음 실제 추가 탐색 수집 전에 필요한 별도 승인 문구와
허용/금지 범위를 read-only 승인 Packet 화면으로 고정한다.

## Task 418 설계 결과 요약

- `designStatus: FIELD_EXPLORATION_DESIGN_READY`
- 대상 상품번호: `6597910207`
- 상품 수정 API 진입 상태: `BLOCKED`
- 추가 탐색 필요 여부: `true`
- 다음 수집은 별도 승인 필요: `true`

## 필요한 승인 문구

- `Naver 상품 식별 필드 추가 탐색 수집을 별도로 승인합니다.`

## 승인 허용 범위

- 대상 상품번호 `6597910207`
- Naver 상품 조회 API 재조회 최대 `1회`
- raw response 전체 표시/저장 없이 key name 탐색
- `product/channel/origin` 계열 nested key name 탐색
- `id/productNo/channelProductNo/originProductNo` 유사 key name 탐색
- 후보 값은 `masked last4`와 `equalsTargetProductNo boolean`만 허용

## 계속 금지 항목

- 상품 수정 API 호출
- 가격 변경
- 재고 변경
- DB write
- raw response 전체 표시/저장
- full product name 표시
- full option name 표시
- full seller management code 표시
- secret/token/header/signature 출력
- 반복 조회
- 다른 상품번호 조회
- Worker/Queue/Runtime 실행
- POST API 추가
- 실행 버튼/승인 버튼/submit action 추가

## 실제 API 호출 없음

이번 Task 419에서는 실제 Naver API 호출, 추가 수집, DB write, 실행 버튼 추가를 수행하지 않았다.

## 다음 Task 제안

- `Task 420 - Naver 상품 식별 필드 추가 탐색 실행 전 Final Gate`
