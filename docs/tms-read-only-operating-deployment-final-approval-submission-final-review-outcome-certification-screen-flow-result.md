# Task 368: TMS Read-Only Operating Deployment Final Approval Submission Final Review Outcome Certification Screen Flow

## 1. 목적
Task 367의 최종 승인 제출 Final Review 결과를 기반으로, 실제 최종 승인 제출 전 마지막 Final Review 결과가 인증 가능한 상태인지 read-only로 확정 표시하는 결과 인증 화면을 추가했습니다.
실제 최종 승인 제출, 배포 승인, 배포 실행이 발생하지 않습니다.

## 2. 입력/출력 ViewModel
- 입력: `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewView` (Task 367)
- 출력: `TmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView` (Task 368)
- 빌더: `buildTmsReadOnlyOperatingDeploymentFinalApprovalSubmissionFinalReviewOutcomeCertificationView`

## 3. Task 367 → Task 368 상태 매핑
| Task 367 | Task 368 |
|---|---|
| FINAL_REVIEW_READY | FINAL_REVIEW_OUTCOME_CERTIFIED_READY |
| FINAL_REVIEW_PARTIAL_READY | FINAL_REVIEW_OUTCOME_CERTIFIED_PARTIAL_READY |
| FINAL_REVIEW_BLOCKED | FINAL_REVIEW_OUTCOME_BLOCKED |
| FINAL_REVIEW_NOT_STARTED | FINAL_REVIEW_OUTCOME_NOT_STARTED |

`switch + never` exhaustive mapping으로 구현되어 누락이 불가능합니다.

## 4. 12개 Outcome Certification 그룹
1. FINAL_REVIEW_OUTCOME_CERTIFICATION_READINESS
2. FINAL_REVIEW_READINESS_OUTCOME_CERTIFICATION
3. SEAL_OUTCOME_CERTIFICATION_REVIEW_OUTCOME_CERTIFICATION
4. FINAL_APPROVAL_SUBMISSION_REVIEW_OUTCOME_CERTIFICATION
5. FINAL_APPROVAL_GRANT_REVIEW_OUTCOME_CERTIFICATION
6. DEPLOYMENT_APPROVAL_REVIEW_OUTCOME_CERTIFICATION
7. DEPLOYMENT_EXECUTION_REVIEW_OUTCOME_CERTIFICATION
8. INFRASTRUCTURE_REVIEW_OUTCOME_CERTIFICATION
9. DOMAIN_DNS_HTTPS_REVIEW_OUTCOME_CERTIFICATION
10. OPERATING_DB_REVIEW_OUTCOME_CERTIFICATION
11. RUNTIME_WORKER_QUEUE_ADAPTER_REVIEW_OUTCOME_CERTIFICATION
12. API_SECRET_UI_ACTION_REVIEW_OUTCOME_CERTIFICATION

## 5. route/page 연결
- `app/api/sku-matching/draft-batch/[jobId]/route.ts`: Task 368 ViewModel을 GET 응답에 추가
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`: Task 367 아래, Task 332 위에 Task 368 패널 추가

## 6. 안전 금지선 준수
- 실제 Naver API 호출, 상품 조회/수정 API 호출, Token 재발급, 가격/재고 변경, DB write, 운영 DB 연결 변경, .env/.env.local 열람/수정, raw API response 표시/저장, Worker/Queue/Adapter/Runtime 실제 구성, 실제 최종 승인/제출/배포 승인/배포 실행, VPS/도메인/DNS/SSL 작업, 실행 버튼/submit action/POST API 추가 일체 없음

## 7. 검증 결과
- Task 368 테스트 18개 통과
- Task 367/366/365 인접 테스트 모두 통과
- `tsc --noEmit` 성공
- `npm run build` 성공
- `prisma validate` / `prisma generate` 성공

## 8. 다음 Task 방향
- Task 369 - 운영 배포 최종 승인 제출 Approval Request Packet 화면
