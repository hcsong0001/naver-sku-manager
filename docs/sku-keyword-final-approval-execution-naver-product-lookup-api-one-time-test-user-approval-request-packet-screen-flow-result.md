# Task 266: Naver Product Lookup API One-Time Test User Approval Request Packet Screen Flow Result

## 목적
Task 265 상품 조회 API Readiness Gate 확인 후, 실제 Naver 상품 조회 API 1회 테스트를 위한 사용자 승인 요청 패킷을 read-only로 표시. 실제 상품 조회 API 호출은 사용자 별도 승인(Task 267 기준) 전까지 금지.

## 추가된 패널 위치
```
Task 265 Naver Product Lookup API Readiness Gate
Task 266 Naver Product Lookup API One-Time Test User Approval Request Packet   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-product-lookup-api-one-time-test-user-approval-request-packet-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-product-lookup-api-one-time-test-user-approval-request-packet-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-product-lookup-api-one-time-test-user-approval-request-packet-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: NAVER_PRODUCT_LOOKUP_API_ONE_TIME_TEST_USER_APPROVAL_REQUEST_PACKET_READY
- isNaverProductLookupApiOneTimeTestUserApprovalRequestPacketReady: true
- productLookupReadinessStatus: Task 265 참조 (동적)
- productLookupApprovalRequestPacketStatus: 동적 판정
- isProductLookupApiApprovalGranted: false (항상)
- isUserApprovalPhraseReceivedForProductLookupApiTest: false (항상)
- isProductLookupApiCalled: false (항상)
- isNaverApiCalledInThisTask: false (항상)

## productLookupApprovalRequestPacketStatus 판정 규칙
| productLookupReadinessStatus | productLookupApprovalRequestPacketStatus |
|---|---|
| READY_FOR_PRODUCT_LOOKUP_APPROVAL_GATE | APPROVAL_REQUEST_PACKET_READY |
| BLOCKED_BY_TOKEN_ISSUANCE_FAILURE | APPROVAL_REQUEST_PACKET_BLOCKED_BY_TOKEN_ISSUANCE_FAILURE |
| BLOCKED_BY_ENV_MISSING | APPROVAL_REQUEST_PACKET_BLOCKED_BY_ENV_MISSING |

## Packet Items (20개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Product Lookup Readiness Gate (Task 265) | READINESS_GATE_CONFIRMED | Task 265 Gate 확인 |
| Token Test Result (Task 263) | TOKEN_TEST_RESULT_CONFIRMED | Task 263 결과 확인 |
| Token Non-Retention Audit Seal (Task 264) | NON_RETENTION_AUDIT_CONFIRMED | Task 264 감사 봉인 확인 |
| 상품 조회 승인 요청 패킷 | READY_IF_READINESS_GATE_READY (동적) | Readiness가 준비이면 패킷 준비 |
| 상품 조회 승인 요청 차단 | BLOCKED_IF_READINESS_GATE_BLOCKED | Readiness가 차단이면 패킷 차단 |
| 사용자 별도 승인 | PENDING_USER_APPROVAL | 아직 승인 전 |
| 실제 상품 조회 API 호출 | LOCKED_UNTIL_USER_APPROVAL | 승인 전 호출 금지 |
| 상품 수정 API 호출 | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Token 재발급 | LOCKED | 이번 Task에서 재발급 없음 |
| Token 값 표시 | FORBIDDEN | 값 출력 금지 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| ".env" 직접 열람 | NOT_ACCESSED | 파일 직접 열람 없음 |
| ".env" 자동 수정 | NOT_MODIFIED | 파일 수정 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| 다음 단계 | PENDING_SEPARATE_APPROVAL | 실제 조회 테스트 별도 승인 필요 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 266은 승인 요청 패킷 표시 전용 |

## Task 267 사용자 승인 문구
```
Task 267에서 실제 Naver 상품 조회 API 1회 테스트를 승인합니다. 상품 정보는 read-only로 조회하고, 상품 수정·가격 변경·재고 변경은 절대 수행하지 마세요. Token 값은 출력하지 말고, 조회 성공/실패 여부와 안전 요약만 비노출 방식으로 보고하세요.
```
(이번 Task에서는 안내만 하며 실제 승인으로 처리하지 않음)

## 다음 단계 진행 조건
사용자가 Task 267 기준 명시 승인 문구를 별도 지시로 보내야만 상품 조회 API 1회 테스트 다음 Task가 진행됩니다.
