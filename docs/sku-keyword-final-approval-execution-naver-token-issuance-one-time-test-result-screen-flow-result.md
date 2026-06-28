# Task 263: Naver Token Issuance One-Time Test Result Screen Flow Result

## 목적
사용자 명시 승인("Task 263에서 실제 Naver Token 발급 1회 테스트를 승인합니다. Token 값은 출력하지 말고, 발급 성공/실패 여부만 비노출 방식으로 보고하세요.") 수신 후, 실제 Naver Token 발급 1회 테스트를 실행하고 결과를 read-only 패널로 표시. Token 값은 반환/저장/출력하지 않음.

## 추가된 패널 위치
```
Task 262 Token Issuance One-Time Test Final Approval Pending Seal
Task 263 Token Issuance One-Time Test Result   ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-result-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-result-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-result-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정 — async await 추가)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: NAVER_TOKEN_ISSUANCE_ONE_TIME_TEST_EXECUTED
- isNaverTokenIssuanceTestExecuted: true (테스트 실행됨)
- isUserFinalApprovalGrantedForTokenIssuance: true
- isUserFinalApprovalPhraseReceived: true
- isTokenIssuanceOneTimeTestFinalApprovalPendingSealed: true
- isTokenValueDisplayed: false (항상)
- isTokenStoredInDb: false (항상)
- isTokenReturnedToClient: false (항상)
- isTokenLoggedToConsole: false (항상)

## 발급 테스트 구현 방식
- `getNaverToken(clientId, clientSecret)` 호출 (기존 `naver-product.service.ts` 재사용)
- bcrypt + base64 서명 방식으로 Naver Commerce API 인증
- 성공 시: `issuanceTestStatus: 'SUCCESS'`, `tokenTypePresent`, `expiresInPresent` 만 기록
- 실패 시: `issuanceTestStatus: 'FAILURE'`, `errorReason` (Redacted 처리)
- ENV 미존재 시: `issuanceTestStatus: 'ENV_MISSING'`, 테스트 미실행
- access_token 값: 어떤 형태로도 반환/저장/출력하지 않음

## Test Items (19개 항목)
| 항목 | 상태(SUCCESS 기준) | 의미 |
|------|------|------|
| Final Approval Pending Seal (Task 262) | FINAL_APPROVAL_PENDING_SEAL_CONFIRMED | Task 262 봉인 확인 |
| 사용자 명시 승인 수신 | USER_APPROVAL_RECEIVED | 승인 문구 수신 확인 |
| Token 발급 1회 테스트 실행 | TEST_EXECUTED | 실제 테스트 실행 완료 |
| 발급 테스트 결과 | SUCCESS | 발급 성공 여부 (동적) |
| Token 타입 확인 (token_type) | PRESENT | 타입 존재 여부만 (값 불표시) |
| 만료 시간 확인 (expires_in) | PRESENT | 만료 시간 존재 여부만 (값 불표시) |
| Token 실제 값 (access_token) | FORBIDDEN | 값 절대 표시 안 함 |
| Token 저장 (DB) | NOT_STORED | DB 저장 없음 |
| Token 클라이언트 전달 | DISCARDED | 클라이언트 반환 없음 |
| Token 로그 출력 | NOT_DISPLAYED | 로그 출력 없음 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| ".env" 직접 열람 | FORBIDDEN | 직접 열람 없음 |
| Token 이후 상품 API 호출 | LOCKED | 이번 Task는 Token 발급 테스트만 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 263은 발급 테스트 결과 표시 전용 |

## 보안 제약 준수 사항
- Token 값 출력 금지: access_token 필드 자체를 뷰 객체에 포함하지 않음
- errorReason Redact: client_id=, client_secret=, Bearer 토큰 패턴 제거
- .env 직접 접근 없음: process.env['KEY'] 방식만 사용
- isTokenValueDisplayed: false 항상 유지
- isTokenStoredInDb: false 항상 유지

## 다음 단계 진행 조건
사용자가 별도 지시로 Task 264를 지정해야 다음 단계가 진행됩니다. 자동 진행 금지.
