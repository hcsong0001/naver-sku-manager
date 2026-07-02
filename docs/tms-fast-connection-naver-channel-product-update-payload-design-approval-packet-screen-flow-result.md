# Task 430 - Naver 채널 상품 수정 Payload 설계 승인 Packet

## 목적

Task 429에서 공식 구조 기준으로 channelProductNo가 수정 API path parameter로 사용 가능하다는 판단이 완료되었다. Task 430은 실제 채널 상품 수정 API 호출 전에 수정 Payload 구조를 read-only로 설계하기 위한 별도 승인 Packet 화면이다.

이번 Task에서는 실제 payload 생성, 수정 API 호출, 가격/재고 변경을 하지 않는다.

---

## Task 429 공식 검토 결과 요약

| 항목 | 결과 |
|------|------|
| reviewStatus | CHANNEL_PRODUCT_NO_IDENTIFIER_REVIEW_COMPLETED |
| targetProductNo | 6597910207 |
| officialReadEndpoint | GET /v2/products/channel-products/:channelProductNo |
| officialUpdateEndpoint | PUT /v2/products/channel-products/:channelProductNo |
| channelProductNoCanBeUsedAsUpdatePathParameter | true |
| identifierReviewDecision | CHANNEL_PRODUCT_NO_CAN_BE_USED_AS_UPDATE_PATH_PARAMETER |
| productUpdateApiEntryDecision | STILL_BLOCKED_UNTIL_PAYLOAD_DESIGN |
| canBuildUpdatePayload | false |
| canCallUpdateApi | false |

---

## 필요한 승인 문구

```
Naver 채널 상품 수정 Payload Read-Only 설계를 별도로 승인합니다.
```

---

## 승인 범위

- 실제 수정 API 호출 없이 read-only payload 구조 설계
- channelProductNo 6597910207 기준 path parameter 설계
- 가격/재고 변경 없이 기존 상품 구조 보존 원칙 정리
- 수정 API payload 필수/선택 필드 구분
- 추후 가격/재고 수정 전 안전 비교 기준 설계
- payload 초안은 실제 전송 불가 상태로만 표시

---

## 계속 금지 항목

- Naver API 재호출
- 상품 수정 API 호출
- 실제 전송 가능한 payload 생성
- 가격/재고 변경
- DB write
- raw response 표시/저장
- secret/token/header/signature 노출
- POST API 추가
- 버튼/form/submit action 추가
- Worker/Queue/Runtime 실행
- Prisma schema/migration/package 변경

---

## 실제 payload 생성 없음

Task 430은 완전 read-only 승인 Packet 화면이다.

- 실제 전송 가능한 payload 생성 없음
- 수정 API 호출 없음
- 가격/재고 변경 없음
- DB write 없음

---

## 실제 수정 API 호출 없음

- Naver API 재호출 없음
- 상품 수정 API 호출 없음
- raw response 표시/저장 없음
- secret/token/header/signature 노출 없음
- POST API 추가 없음
- 버튼/form/submit action 없음

---

## 다음 Task 제안

Task 431 - Naver 채널 상품 수정 Payload Read-Only 설계
