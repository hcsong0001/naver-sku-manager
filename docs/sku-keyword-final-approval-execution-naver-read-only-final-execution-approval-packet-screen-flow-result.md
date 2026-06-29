# Task 304 - Naver Read-Only Final Execution Approval Packet

## 목적

Task 303 인증 결과를 바탕으로, 다음 read-only 최종 실행 승인 검토 단계로
진입 가능한지 판단하는 승인 요청 패킷 패널을 추가했습니다.

## 표시 원칙

- COMPLETE면 read-only 최종 실행 승인 검토 패킷 READY 상태로 표시합니다.
- PARTIAL이면 missing field notice 포함 READY 상태로 표시합니다.
- BLOCKED면 원인별 보정 필요 상태만 표시합니다.
- Task 305 사용자 승인 문구는 안내만 하고 승인으로 처리하지 않습니다.
- 실제 최종 실행 승인, 실제 실행 승인, 실제 실행, 실행 버튼 추가를 수행하지 않습니다.
- Worker / Queue / Adapter 연결을 추가하지 않습니다.
- 기존 캡처 데이터와 기존 요약 검토 결과만 사용합니다.
- Token/Auth/Signature/Authorization 값과 raw API response는 표시하거나 저장하지 않습니다.

## 화면 배치

1. Task 303 Naver Read-Only Execution Readiness Review Outcome Certification
2. Task 304 Naver Read-Only Final Execution Approval Packet
3. BatchJob 실행 결과

## 구현 파일

- `src/services/sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-packet-view.service.ts`
- `src/services/sku-keyword-final-approval-execution-naver-read-only-final-execution-approval-packet-view.test.ts`
- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
