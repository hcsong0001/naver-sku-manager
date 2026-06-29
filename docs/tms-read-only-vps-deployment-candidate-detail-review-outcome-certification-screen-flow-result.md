# Task 323 - TMS Read-Only VPS 배포 후보 상세 검토 결과 인증 화면

## 구현 목적

Task 322 VPS 배포 후보 상세 검토 결과를 바탕으로, 요구사항/비용/보안/백업/도메인 HTTPS/운영 리스크 검토 결과를 read-only로 인증하는 패널을 추가합니다.

이번 단계는 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.

## 상태 매핑 규칙

- Task 322 `READY` -> Task 323 `OUTCOME_CERTIFIED_READY`
- Task 322 `PARTIAL_READY` -> Task 323 `OUTCOME_CERTIFIED_PARTIAL_READY`
- Task 322 `BLOCKED` -> Task 323 `OUTCOME_BLOCKED`
- Task 322 `NOT_STARTED` -> Task 323 `OUTCOME_NOT_STARTED`

## 인증 대상

- VPS 추천 후보 확인
- VPS 요구사항 검토 결과
- VPS 비용 검토 결과
- VPS 보안 검토 결과
- VPS 백업 검토 결과
- VPS 도메인 / HTTPS 검토 결과
- VPS 운영 리스크 검토 결과

## 안전 경계

- 실제 VPS 생성 없음
- 실제 VPS 설정 변경 없음
- 실제 배포 실행 없음
- 실제 도메인 연결 없음
- DNS / SSL / 포트포워딩 / 서버 설정 변경 없음
- 운영 DB 연결 변경 없음
- Naver API 호출 없음
- DB write 없음
- Token/Auth/Signature/Authorization 값 비노출 유지
- raw API response 비표시 / 비저장 유지
- `.env` / `.env.local` 비열람 / 비수정 유지

## 다음 단계

Task 324는 Task 323 인증 이후의 안전 조건을 read-only로 봉인하는 단계이며, 사용자 별도 승인 전에는 자동 진행하지 않습니다.
