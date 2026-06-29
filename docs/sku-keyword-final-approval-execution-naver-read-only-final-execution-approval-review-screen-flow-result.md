# Task 305 - Naver Read-Only Final Execution Approval Review Screen Flow

## 구현 범위

- Task 304의 `readOnlyFinalExecutionApprovalPacketStatus`를 재사용해 Task 305의 `finalExecutionApprovalReviewStatus`를 1:1 Record 매핑으로 계산했습니다.
- `/dashboard/sku-keyword-draft-batches/[jobId]` 상세 화면에 Task 305 read-only 검토 패널을 추가했습니다.
- Task 306 별도 승인 문구를 안내만 표시하고, 승인 처리나 실행 경로 연결은 하지 않았습니다.

## 안전 제약 유지

- Token 재발급 없음
- Naver API 호출 없음
- 상품 조회 API 재호출 없음
- 상품 수정 API 호출 없음
- 가격/재고 변경 없음
- DB write / upsert / update 없음
- Worker / Queue / Adapter 연결 없음
- raw API response 비표시 / 비저장
- Token/Auth/Signature/Authorization 값 비노출

## 상태 해석

- COMPLETE 계열 패킷 상태는 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_READY`로 매핑됩니다.
- PARTIAL 계열 패킷 상태는 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_PARTIAL_READY`로 매핑됩니다.
- BLOCKED 계열 패킷 상태는 원인별 `NAVER_READ_ONLY_FINAL_EXECUTION_APPROVAL_REVIEW_BLOCKED_*` 상태로 매핑됩니다.

## UI 요약

- Task 305는 최종 실행 승인 가능 여부를 검토하는 read-only 단계임을 명확히 표시합니다.
- 실제 최종 실행 승인, 실제 실행 승인, 실제 실행, 상품 변경 승인, 실행 버튼 추가가 아니라는 안내를 표시합니다.
- Task 306은 사용자 별도 명시 승인 없이는 진행하지 않는다는 문구를 표시합니다.
