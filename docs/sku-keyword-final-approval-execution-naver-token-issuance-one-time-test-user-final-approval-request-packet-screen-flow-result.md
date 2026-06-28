# Task 261: Naver Token Issuance One-Time Test User Final Approval Request Packet Screen Flow Result

## 목적
Task 260 Final Safety Gate 확인 후, 실제 Token 발급 1회 테스트를 위한 사용자 최종 승인 요청 패킷을 read-only로 표시. 실제 Token 발급은 사용자 다음 Task 지시에서 명시적 승인 전까지 잠금.

## 추가된 패널 위치
```
Task 260 Token Issuance One-Time Test Final Safety Gate
Task 261 Token Issuance One-Time Test User Final Approval Request Packet  ← 신규 추가
BatchJob 실행 결과
```

## 수정/신규 파일 목록
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-user-final-approval-request-packet-view.service.ts` (신규)
- `src/services/sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-user-final-approval-request-packet-view.test.ts` (신규)
- `docs/sku-keyword-final-approval-execution-naver-token-issuance-one-time-test-user-final-approval-request-packet-screen-flow-result.md` (신규)
- `app/api/sku-matching/draft-batch/[jobId]/route.ts` (수정)
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (수정)

## 상태
- status: TOKEN_ISSUANCE_ONE_TIME_TEST_USER_FINAL_APPROVAL_REQUEST_PACKET_READY
- presencePresentCount: 3 / presenceMissingCount: 0
- isTargetPresenceResultMet: true / isReadyForTokenIssuanceGate: true
- isUserFinalApprovalRequestPacketReady: true
- isUserFinalApprovalGrantedForTokenIssuance: false (아직 승인 전)
- isTokenIssuanceAllowed: false / isOneTimeTokenIssuanceTestAllowed: false

## Packet Items (19개 항목)
| 항목 | 상태 | 의미 |
|------|------|------|
| Runtime Scope Recheck Result | RECHECK_RESULT_CONFIRMED | Task 259 결과 확인 |
| Env/Auth 목표 결과 | TARGET_MET | PRESENT 3 / MISSING 0 |
| Final Safety Gate | FINAL_SAFETY_GATE_CONFIRMED | Task 260 Gate 확인 |
| 사용자 최종 승인 요청 | FINAL_APPROVAL_REQUEST_READY | 승인 요청 패킷 준비 |
| 사용자 최종 승인 상태 | PENDING_USER_APPROVAL | 아직 승인 전 |
| 실제 Token 발급 | LOCKED_UNTIL_USER_APPROVAL | 승인 전 발급 금지 |
| Token 저장 | LOCKED | 저장 없음 |
| Token 값 표시 | FORBIDDEN | 값 출력 금지 |
| 인증키 값 표시 | FORBIDDEN | 값 출력 금지 |
| Secret 로그 출력 | FORBIDDEN | 로그 노출 금지 |
| ".env" 직접 열람 | NOT_ACCESSED | 파일 직접 열람 없음 |
| ".env" 자동 수정 | NOT_MODIFIED | 파일 수정 없음 |
| Naver API 호출 | LOCKED | 이번 Task에서는 호출 없음 |
| 상품 조회/수정 API | LOCKED | 호출 없음 |
| 가격·재고 변경 | LOCKED | 변경 없음 |
| Worker / Queue / Adapter | LOCKED | 실행 경로 없음 |
| POST API 연결 | NOT_CONNECTED | 제출/실행 경로 없음 |
| 승인/실행 버튼 | NOT_PRESENT | 버튼 없음 |
| 현재 Task 상태 | READ_ONLY_INFO | Task 261은 최종 승인 요청 패킷 표시 전용 |

## 사용자 승인 요청 문구 (다음 Task 지시에서 사용)
```
Task 262에서 실제 Naver Token 발급 1회 테스트를 승인합니다.
Token 값은 출력하지 말고, 발급 성공/실패 여부만 비노출 방식으로 보고하세요.
```

## 이 패널이 아닌 것들
- Token 발급이 아님: `isTokenIssuanceAllowed: false`, `isOneTimeTokenIssuanceTestAllowed: false`
- 실제 승인 처리 아님: `isUserFinalApprovalGrantedForTokenIssuance: false`, `isApprovalSubmitted: false`
- ".env" 접근이 아님: `isEnvFileDirectlyAccessed: false`, `isEnvFileModified: false`

## 다음 단계 진행 조건
사용자가 명시적으로 Task 262 승인 문구를 보내고, 별도 지시가 있을 때만 다음 단계가 진행됩니다.
