# Task 271 — Naver Token 발급 재시도 1회 테스트 및 상품 조회 GET 결과

## 목적

GW.IP_NOT_ALLOWED 해소 여부 확인을 위해 사용자 승인 하에 Naver Token 발급 재시도 1회 테스트를 진행합니다.
Token 발급이 성공한 경우에만 상품 조회 GET 1회를 추가로 실행합니다.

## 보안 원칙

| 항목 | 방식 |
|------|------|
| Token 값 (access_token) | 절대 출력/저장 금지 |
| 발급 결과 보고 | 성공/실패 여부 + 오류 코드만 비노출 방식으로 보고 |
| 상품 정보 | read-only 조회 전용 (수정/가격/재고 변경 없음) |
| DB write | 없음 (DB 저장 없음) |
| 인증키/Secret | 어떤 형태로도 표시하지 않음 |

## 실행 흐름

```
사용자 승인 (Task 271)
↓
Env 키 존재 확인 (NAVER_COMMERCE_CLIENT_ID, NAVER_COMMERCE_CLIENT_SECRET)
↓
Token 발급 재시도 1회 (getNaverToken)
↓ (성공 시)
channelProductNo 확인 (job.items[0].channelProductNo)
↓ (존재 시)
상품 조회 GET 1회 (fetchNaverProduct) — read-only
↓
결과 View 반환 (Token 값 미포함, 상품 정보 read-only)
```

## 화면 배치

```
Task 269: HTTP 403 Credential Auth Read-Only Checklist
↓
Task 271: Token 발급 재시도 & 상품 조회 GET 결과  ← 이번 추가
↓
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-token-issuance-retry-one-time-test-product-lookup-result-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-token-issuance-retry-one-time-test-product-lookup-result-view.test.ts` (신규) — 12 pass
3. `docs/sku-keyword-final-approval-execution-naver-token-issuance-retry-one-time-test-product-lookup-result-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (import 추가, response 필드 추가)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (type 선언 추가, Task 271 패널 삽입)

## issuanceRetryStatus 분기

| 상태 | 의미 |
|------|------|
| `SUCCESS` | Token 발급 성공. GW.IP_NOT_ALLOWED 해소. |
| `FAILURE` | Token 발급 실패. sanitizedErrorCode 확인. |
| `ENV_MISSING` | Env 키 미존재. 재시도 불가. |

## productLookupStatus 분기

| 상태 | 의미 |
|------|------|
| `SUCCESS` | 상품 조회 GET 성공. read-only 정보 표시. |
| `FAILURE` | 상품 조회 실패. sanitizedErrorCode 확인. |
| `SKIPPED` | Token 발급 실패 또는 ENV_MISSING으로 건너뜀. |
| `NO_CHANNEL_PRODUCT_NO` | channelProductNo 없어 건너뜀. |

## 상태

- 사용자 승인: Task 271 — GW.IP_NOT_ALLOWED 해소 여부 확인
- 기준 커밋: 9fa26d8 (Task 269)
