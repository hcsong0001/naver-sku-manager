# Task 321 - TMS Read-Only Deployment Target Environment Selection Comparison Screen Flow

## 구현 목적

Task 320 배포/도메인 준비 상태 점검 결과를 바탕으로, NAS / 회사 PC / 집 PC / VPS 네 가지 배포 대상 환경을 read-only로 비교하는 패널을 추가했습니다.

이번 Task는 실제 배포 대상 선택 저장이나 실제 배포 실행이 아니라, 운영 안정성·접근성·복구성·비용·도메인 연결 적합성 관점에서 어떤 환경이 더 적합한지 화면에서 정리하는 단계입니다.

## 상태 매핑 규칙

- Task 320 상태가 `READY`이면 `TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_READY`
- Task 320 상태가 `PARTIAL_READY`이면 `TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_PARTIAL_READY`
- Task 320 상태가 `BLOCKED`이면 `TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_BLOCKED`
- Task 320 상태가 `NOT_STARTED`이면 `TMS_READ_ONLY_DEPLOYMENT_TARGET_ENVIRONMENT_SELECTION_COMPARISON_NOT_STARTED`

매핑은 1:1 Record로 고정해 누락 상태가 있으면 TypeScript에서 바로 실패하도록 구성했습니다.

## 비교 대상 환경

- NAS
- 회사 PC
- 집 PC
- VPS

## 추천 방향

- VPS: 외부 접속, 도메인 연결, HTTPS, 운영 안정성 기준에서 가장 유리한 권장 후보
- NAS: 백업/내부 운영/보조 인프라에는 유리하지만 외부 공개 운영은 추가 검토 필요
- 회사 PC: 내부 운영/테스트에는 가능하나 업무용 장비 의존성이 큼
- 집 PC: 개발/임시 테스트에는 가능하나 운영 배포 대상으로는 부적합

## 화면 표시 요소

- Task 320 원본 준비 상태 표시
- 전체 환경 비교 상태 배지 표시
- NAS / 회사 PC / 집 PC / VPS 비교 카드 표시
- 추천 환경 및 추천 이유 표시
- 비교 기준 목록 표시
- 실제 배포 대상 선택 미수행 상태 표시
- 실제 배포 미시작 / 실제 도메인 연결 미시작 상태 표시
- Task 322 별도 승인 문구 표시

## 안전 경계

- 실제 배포 대상 선택 저장 없음
- 실제 배포 실행 없음
- 실제 도메인 연결 없음
- DNS / SSL / 포트포워딩 변경 없음
- NAS / 회사 PC / 집 PC / VPS 설정 변경 없음
- 운영 DB 연결 변경 없음
- Naver API 호출 없음
- DB write 없음
- Token/Auth/Signature/Authorization 비노출 유지
- raw API response 비표시/비저장 유지
- `.env` / `.env.local` 열람 및 수정 없음

## 다음 단계

Task 322는 실제 VPS 배포가 아니라, Task 321에서 권장 후보로 표시된 VPS 환경의 요구사항·비용·백업·보안 조건을 read-only로 상세 검토하는 단계이며 자동 진행하지 않습니다.
