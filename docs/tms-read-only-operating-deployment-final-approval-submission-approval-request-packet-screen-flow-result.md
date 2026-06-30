# Task 369: TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Screen Flow

## 1. 목적
Task 368의 Final Review 결과 인증 이후, 실제 최종 승인 제출을 요청하기 전 필요한 Approval Request Packet을 read-only로 구성하고 상세 화면에 표시합니다.
실제 승인 요청 생성, 승인 요청 제출, 최종 승인 제출, 배포 승인, 배포 실행이 발생하지 않습니다.

## 2. 입력/출력 ViewModel
- 입력: `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView` (Task 368)
- 출력: `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView` (Task 369)
- 빌더: `buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView`

## 3. Task 368 → Task 369 상태 매핑
| Task 368 | Task 369 |
|---|---|
| FINAL_REVIEW_OUTCOME_CERTIFIED_READY | APPROVAL_REQUEST_PACKET_READY |
| FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY | APPROVAL_REQUEST_PACKET_PARTIAL_READY |
| FINAL_REVIEW_OUTCOME_BLOCKED | APPROVAL_REQUEST_PACKET_BLOCKED |
| FINAL_REVIEW_OUTCOME_NOT_STARTED | APPROVAL_REQUEST_PACKET_NOT_STARTED |

`switch + never` exhaustive mapping으로 구현되어 누락이 불가능합니다.

## 4. 14개 Approval Request Packet 그룹
1. APPROVAL_REQUEST_PACKET_READINESS
2. FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE
3. FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE
4. FINAL_APPROVAL_GRANT_REQUEST_SCOPE
5. DEPLOYMENT_APPROVAL_REQUEST_SCOPE
6. DEPLOYMENT_EXECUTION_REQUEST_SCOPE
7. OPERATING_TRANSITION_REQUEST_SCOPE
8. INFRASTRUCTURE_REQUEST_BOUNDARY
9. DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY
10. OPERATING_DB_REQUEST_BOUNDARY
11. RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY
12. API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY
13. UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY
14. SEPARATE_USER_APPROVAL_REQUIREMENT

## 5. route/page 연결
- `app/api/sku-matching/draft-batch/[jobId]/route.ts`: Task 369 ViewModel을 GET 응답에 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`: Task 368 아래, Task 332 위에 Task 369 패널 추가

## 6. 안전 금지선 준수
- 실제 승인 요청 생성/제출 없음
- 실제 Naver API/상품 조회/수정 API/Token/가격/재고/DB write/운영 DB/env/raw API response/Worker/Queue/Adapter/Runtime/최종 승인/제출/배포 승인/실행/VPS/도메인/DNS/SSL/실행 버튼/submit action/POST API 일체 없음

## 7. 검증 결과
- Task 369 테스트 17개 통과
- Task 368/367/366 인접 테스트 모두 통과
- `tsc --noEmit` 성공, `npm run build` 성공, `prisma validate/generate` 성공

## 8. 다음 Task 방향
- Task 370 - 운영 배포 최종 승인 제출 Approval Request Packet Review 화면
