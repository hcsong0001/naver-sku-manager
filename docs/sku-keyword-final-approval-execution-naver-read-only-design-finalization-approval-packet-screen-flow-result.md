# Task 292 — Naver Read-Only Design Finalization Approval Packet

## 목적

Task 291에서 인증된 설계안 블루프린트 결과를 바탕으로
다음 단계인 read-only 설계 확정으로 진입할 수 있는지 판단하고
승인 요청 패킷을 read-only 패널로 표시합니다.

이번 Task는 승인 요청 패킷 표시 전용이며,
실제 설계 확정, 실행 승인, API 호출, DB 변경을 수행하지 않습니다.

## 승인 패킷 기준

- 입력 기준: Task 291 `optionAdditionalStructureExpansionDesignBlueprintOutcomeCertificationStatus`
- COMPLETE: `APPROVAL_PACKET_READY_FOR_COMPLETE_BLUEPRINT`
- PARTIAL: `APPROVAL_PACKET_READY_WITH_MISSING_FIELD_NOTICE`
- BLOCKED: 동일 원인으로 `APPROVAL_PACKET_BLOCKED_BY_*`
- 사용자 승인 문구는 Task 293 기준으로 안내만 하며 승인으로 처리하지 않음
- 가격/재고 원본 값, raw API response, Token/Auth/Signature/Authorization 값은 포함하지 않음

## 화면 배치

```text
Task 291 Option/Additional Structure Expansion Design Blueprint Outcome Certification
Task 292 Read-Only Design Finalization Approval Packet
BatchJob 실행 결과
```

## 수정 파일

1. `src/services/sku-keyword-final-approval-execution-naver-read-only-design-finalization-approval-packet-view.service.ts` (신규)
2. `src/services/sku-keyword-final-approval-execution-naver-read-only-design-finalization-approval-packet-view.test.ts` (신규)
3. `docs/sku-keyword-final-approval-execution-naver-read-only-design-finalization-approval-packet-screen-flow-result.md` (신규)
4. `app/api/sku-matching/draft-batch/[jobId]/route.ts` (Task 292 view 연결)
5. `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx` (Task 292 패널 추가)
