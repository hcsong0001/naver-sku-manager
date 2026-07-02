# Task 423 - Naver 상품 조회 응답 구조 기반 식별 전략 재설계 화면

## 목적

Task 421/422에서 추가 탐색을 수행했으나 상품번호 "6597910207"과 일치하는 식별 필드를 응답 내부에서 확인하지 못했다.
Task 423은 무작위 추가 조회를 중단하고, 지금까지 확보한 응답 구조 정보를 기준으로 상품 식별 전략을 재설계하는 read-only 화면을 추가하는 Task다.

실제 API 호출은 없다.

---

## Task 421/422 결과 요약

| 항목 | 결과 |
|------|------|
| 조회 API 호출 | 성공 (HTTP 200) |
| top-level response keys | originProduct, smartstoreChannelProduct |
| 기존 7개 candidate path | 모두 exists false |
| 추가 5개 candidate path | exists true지만 equalsTargetProductNo false |
| 상품 식별 확정 여부 | 미확정 |
| 상품 수정 API 진입 | BLOCKED |

---

## 무작위 추가 탐색 중단 판단

응답 내부 값을 무작위로 더 찾는 방식은 비효율적이라고 판단했다.

- 기존 7개 candidate path는 모두 비어 있었다
- 추가 5개 candidate path는 값이 있었지만 상품번호와 불일치했다
- raw response를 직접 보지 않는 제약 하에서는 추가 무작위 탐색의 성공 가능성이 낮다
- 무작위 탐색을 계속하는 것보다 공식 구조 문서 기반으로 전략을 재설계하는 것이 합리적이다

---

## 상품 식별 전략 재설계 항목

### S1. API 요청 경로/파라미터에서 상품번호 의미 재검토

- 현재 발견: 조회 API 응답 내부에서 상품번호와 일치하는 필드를 찾지 못했다. 요청 경로에 사용한 식별자와 응답 내부 필드 간 매핑이 불명확하다.
- 재설계 방향: 공식 문서에서 요청 경로 파라미터의 의미(channelProductNo vs originProductNo)를 재확인하고, 응답의 어느 필드에 매핑되는지 명시적으로 정의한다.
- 생략 시 위험: 잘못된 상품을 대상으로 수정 API를 진입할 수 있다.

### S2. 조회 응답의 originProduct와 smartstoreChannelProduct 역할 분리

- 현재 발견: top-level key로 두 객체가 확인됐으나 각각의 식별자 체계가 불분명하다.
- 재설계 방향: 공식 문서를 기반으로 두 객체의 역할과 포함 식별자를 명시적으로 문서화한다.
- 생략 시 위험: 식별자를 잘못 선택하거나 수정 API에 잘못된 파라미터를 전달할 수 있다.

### S3. channelProductNo / originProductNo / productNo 관계 재정의

- 현재 발견: 이 계열 필드들이 모두 exists false였으나 원인이 불명확하다.
- 재설계 방향: 공식 문서를 통해 각 필드의 정의와 응답에 포함되는 조건을 파악한다.
- 생략 시 위험: 동일한 탐색 실패가 반복될 수 있다.

### S4. 수정 API 진입에 필요한 식별자가 상품번호와 동일한지 재검토

- 현재 발견: 수정 API가 어떤 식별자를 요구하는지 공식 확인이 이뤄지지 않았다.
- 재설계 방향: 공식 문서에서 수정 API의 요청 파라미터를 확인하고, 조회 API 식별자와 수정 API 식별자가 동일한지 규명한다.
- 생략 시 위험: 현재까지 탐색한 결과가 수정 API 진입에 직접 사용 불가능할 수 있다.

### S5. raw response 없이 안전하게 식별 근거를 얻는 다음 수집 방식 설계

- 현재 발견: 무작위 탐색은 비효율적이고 raw response 제약 하에서는 한계가 있다.
- 재설계 방향: 공식 API 스키마를 사전에 파악하고 문서 기반 식별자 후보를 도출하는 방식으로 전환한다.
- 생략 시 위험: 불필요한 API 재호출이 증가하고 식별자를 찾지 못할 가능성이 높다.

---

## 상품 수정 API 진입 BLOCKED 유지

Task 422에서 BLOCKED로 결정된 상품 수정 API 진입 판단은 Task 423에서도 유지된다.

상품 식별이 미확정인 상태에서 상품 수정 API를 진입하는 것은 허용되지 않는다.

---

## 실제 API 호출 없음

Task 423은 완전 read-only 화면이다.

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

Task 424 - Naver 상품 식별 전략 재설계 승인 Packet

Task 424도 실제 API 호출이 아니라 전략 재설계/공식 구조 검토를 승인하는 Packet으로 진행한다.
