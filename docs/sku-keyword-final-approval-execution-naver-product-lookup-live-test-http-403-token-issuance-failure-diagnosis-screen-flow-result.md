# Task 268 — Naver Product Lookup Live Test HTTP 403 Token Issuance Failure Diagnosis

## 목적

실제 Naver 상품 조회 Live 테스트가 Token 발급 단계의 HTTP 403으로 실패한 상태를 read-only로 진단합니다.
이번 Task에서는 Token 재발급, Naver API 재호출, DB Write, 상품 수정, 가격/재고 변경을 수행하지 않습니다.

## 실패 상태 요약

| 항목 | 값 |
|------|-----|
| liveTestStatus | FAILED |
| failureStage | TOKEN_ISSUANCE |
| tokenIssuanceHttpStatus | 403 |
| productLookupEndpointReached | false |
| productLookupApiCalled | false |

## 실패 단계 분리

이번 실패는 **상품 조회 API 실패가 아닌 Token 발급 단계 실패**입니다.
- 상품 상세 GET endpoint까지 진입하지 못함
- 상품 수정 API 호출 없음
- 가격/재고 변경 없음
- Token 원문/저장/DB 저장 없음
- 추가 호출 중단 (승인 범위 내)

## 다음 점검이 필요한 범위

1. client_id 키 이름/존재 여부 (값 비출력)
2. client_secret 키 이름/존재 여부 (값 비출력)
3. API base URL — 토큰 발급 endpoint URL 정확성
4. bcrypt + base64 전자서명 생성 방식 재검토
5. timestamp 밀리초 단위 여부 확인
6. 애플리케이션 승인/권한 상태 (Naver 개발자 센터)
7. 스마트스토어 통합 매니저 권한 부여 여부

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-product-lookup-live-test-http-403-token-issuance-failure-diagnosis-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-product-lookup-live-test-http-403-token-issuance-failure-diagnosis-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-product-lookup-live-test-http-403-token-issuance-failure-diagnosis-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 268 패널 추가)

## 화면 배치

```
Task 266: Naver Product Lookup API One-Time Test User Approval Request Packet
↓
Task 268: HTTP 403 Token Issuance Failure Diagnosis  ← 이번 추가
↓
BatchJob 실행 결과
```

## 상태

- READ-ONLY 진단 패널 전용
- 실행 권한: 닫혀 있음
- 기준 커밋: e686828 (Task 266)
