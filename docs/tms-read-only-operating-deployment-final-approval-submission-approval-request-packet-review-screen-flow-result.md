# Task 370: TMS Read-Only Operating Deployment Final Approval Submission Approval Request Packet Review Screen Flow

## 1. 목적
Task 369의 Approval Request Packet을 기반으로, 실제 최종 승인 요청 제출 전에 요청 패킷의 구성 상태와 차단 상태를 read-only로 검토하는 Review 화면을 추가합니다.
이 화면은 실제 승인 요청 검토 제출, 승인 요청 생성, 승인 요청 제출, 최종 승인 제출, 배포 승인, 배포 실행 작업이 아닙니다.

## 2. 입력/출력 ViewModel
- 입력: `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketView` (Task 369)
- 출력: `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView` (Task 370)
- 빌더: `buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionApprovalRequestPacketReviewView`

## 3. Task 369 → Task 370 상태 매핑
| Task 369 | Task 370 |
|---|---|
| APPROVAL_REQUEST_PACKET_READY | APPROVAL_REQUEST_PACKET_REVIEW_READY |
| APPROVAL_REQUEST_PACKET_PARTIAL_READY | APPROVAL_REQUEST_PACKET_REVIEW_PARTIAL_READY |
| APPROVAL_REQUEST_PACKET_BLOCKED | APPROVAL_REQUEST_PACKET_REVIEW_BLOCKED |
| APPROVAL_REQUEST_PACKET_NOT_STARTED | APPROVAL_REQUEST_PACKET_REVIEW_NOT_STARTED |

`switch + never` exhaustive mapping으로 구현되어 누락이 불가능합니다.

## 4. 14개 Approval Request Packet Review 그룹
1. APPROVAL_REQUEST_PACKET_REVIEW_READINESS
2. APPROVAL_REQUEST_PACKET_REFERENCE_REVIEW
3. FINAL_REVIEW_OUTCOME_CERTIFICATION_REFERENCE_REVIEW
4. FINAL_APPROVAL_SUBMISSION_REQUEST_SCOPE_REVIEW
5. FINAL_APPROVAL_GRANT_REQUEST_SCOPE_REVIEW
6. DEPLOYMENT_APPROVAL_REQUEST_SCOPE_REVIEW
7. DEPLOYMENT_EXECUTION_REQUEST_SCOPE_REVIEW
8. OPERATING_TRANSITION_REQUEST_SCOPE_REVIEW
9. INFRASTRUCTURE_REQUEST_BOUNDARY_REVIEW
10. DOMAIN_DNS_HTTPS_REQUEST_BOUNDARY_REVIEW
11. OPERATING_DB_REQUEST_BOUNDARY_REVIEW
12. RUNTIME_WORKER_QUEUE_ADAPTER_REQUEST_BOUNDARY_REVIEW
13. API_SECRET_RAW_RESPONSE_REQUEST_BOUNDARY_REVIEW
14. UI_ACTION_POST_SUBMIT_REQUEST_BOUNDARY_REVIEW

## 5. route/page 연결
- `app/api/sku-matching/draft-batch/[jobId]/route.ts`: Task 370 ViewModel을 GET 응답에 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`: Task 369 아래, Task 332 위에 Task 370 패널 추가

## 6. 안전 금지선 준수
- Review가 실제 제출로 해석되지 않음
- 실제 승인 요청 생성/제출 없음
- 실제 Naver API/상품 조회/수정 API/Token/가격/재고/DB write/운영 DB/env/raw API response/Worker/Queue/Adapter/Runtime/최종 승인/제출/배포 승인/실행/VPS/도메인/DNS/SSL/실행 버튼/submit action/POST API 일체 없음

## 7. 검증 결과
- Task 370 테스트 17개 통과
- Task 369/368/367 인접 테스트 모두 통과
- `tsc --noEmit` 성공, `npm run build` 성공, `prisma validate/generate` 성공

## 8. 다음 Task 방향
- Task 371 - 운영 배포 최종 승인 제출 Approval Request Packet Review 결과 인증 화면
