# Task 216: Naver API Connection Approval Request Packet Screen Flow Result

## 핵심 목적
Naver API 실제 연결을 시작하기 전, 사용자에게 별도 승인이 필요한 항목을 Read-Only 승인 요청 패킷으로 정리합니다.
이 패킷은 승인 요청서일 뿐 실제 승인이 아닙니다.

## 승인 요청 항목
| 항목 | 현재 상태 | 승인 필요 |
|------|----------|---------|
| .env / 인증키 / Secret 접근 | PENDING_APPROVAL | 필요 |
| Token 발급 테스트 | PENDING_APPROVAL | 필요 |
| Naver API 연결 테스트 | PENDING_APPROVAL | 필요 |
| 상품 조회 API 1건 테스트 | PENDING_APPROVAL | 필요 |
| 상품 수정 API | FORBIDDEN_UNTIL_APPROVAL | 필요 |
| 가격/재고 변경 | FORBIDDEN_UNTIL_APPROVAL | 필요 |

## 패킷 상태
- packetStatus: APPROVAL_REQUEST_PENDING
- isNaverApiConnectionApprovalRequestPacket: true
- 모든 실행/연결/Token/Live 승인 플래그: false

## 오해 방지
* 이 패킷은 승인 요청서이며 실제 승인이 아닙니다.
* 이 화면에서 Token 발급, .env 접근, Naver API 호출은 발생하지 않습니다.
* 버튼, form, submit, POST API가 존재하지 않습니다.
* 상품 수정 API 및 가격/재고 변경은 별도 승인 전까지 금지 상태입니다.

## 제한 사항
* hasEnvFileAccess / hasAuthKeyAccess / hasNaverApiCallPath / hasProductUpdateApiPath: false
* 실제 연결을 시작하려면 반드시 사용자의 명시적 승인 지시가 필요합니다.

## 연관 파일
* `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-request-packet-view.service.ts`
* `src/services/sku-keyword-final-approval-execution-naver-api-connection-approval-request-packet-view.test.ts`
* `app/api/sku-matching/draft-batch/[jobId]/route.ts`
* `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
