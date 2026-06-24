# Task 43 - Token First Test Action Lock Read-only Screen Flow

## 목표 달성 요약
* Task 43은 실제 token 발급 단계가 아닙니다.
* `/dashboard/sku-keyword-draft-batches/[jobId]` 화면에 Token First Test 실행이 잠겨 있음을 시각적으로 보여주는 **Action Lock read-only 패널**을 추가했습니다.
* Action Lock은 display-only이며, 버튼이나 폼 제출 액션이 일절 포함되어 있지 않습니다.
* route 응답은 상태 데이터를 계산하여 반환할 뿐 어떠한 DB 상태도 변경하지 않는 순수 읽기 동작입니다.

## 검증된 안전 항목 (금지 조건 완벽 준수)
1. 화면에 실행 버튼 없음
2. 화면에 submit form 없음
3. 화면 action이 disabled임
4. persistence disabled 상태임
5. network disabled 상태임
6. token request disabled 상태임
7. DB write disabled 상태임
8. Prisma mutation 없음
9. fetch/axios/http client 없음
10. Authorization/Bearer 헤더 생성 없음
11. Naver endpoint URL 추가 없음
12. 실제 Naver API 호출 없음
13. 운영 DB write 없음
14. 가격/재고 변경 없음
15. 다음 단계는 별도 사용자 승인 필요함을 명시

## 화면에 노출되는 Lock Reasons
이 패널은 아래와 같은 잠금 사유를 명시적으로 표시합니다.
* 실제 Naver API 호출은 별도 승인 전까지 금지
* access token 요청은 별도 승인 전까지 금지
* refresh token 요청은 별도 승인 전까지 금지
* token 발급은 별도 승인 전까지 금지
* 인증 헤더(Auth/Token) 생성은 금지
* Naver endpoint URL 추가는 금지
* 운영 DB write는 금지
* Prisma mutation은 금지
* 가격 변경은 금지
* 재고 변경은 금지
* 상품 조회 API 호출은 금지
* 상품 수정 API 호출은 금지
* Live 실행 버튼은 없음
* Token 발급 테스트 실행 버튼은 없음
* Queue/Worker 자동 실행 흐름은 연결되지 않음
* 다음 단계는 별도 사용자 승인 필요
