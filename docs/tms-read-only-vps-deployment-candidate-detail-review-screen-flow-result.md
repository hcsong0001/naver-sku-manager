# Task 322 - TMS Read-Only VPS 배포 후보 상세 검토 화면

## 구현 목적

Task 321 배포 대상 환경 선택 비교 결과를 바탕으로, 권장 후보인 VPS 환경의 운영 조건을 read-only로 상세 검토하는 패널을 추가합니다.

이번 단계는 실제 VPS 생성, 실제 배포 실행, 실제 도메인 연결 작업이 아닙니다.

## 상태 매핑 규칙

- Task 321이 `READY`이고 추천 환경이 `VPS`이면 Task 322는 `READY`
- Task 321이 `PARTIAL_READY`이면 Task 322는 `PARTIAL_READY`
- Task 321이 `BLOCKED`이면 Task 322는 `BLOCKED`
- Task 321이 `NOT_STARTED`이면 Task 322는 `NOT_STARTED`

## 상세 검토 범주

- VPS 요구사항 검토
- 비용 검토
- 보안 및 접근 제한 검토
- 백업 검토
- 도메인 / HTTPS 적합성 검토
- 운영 리스크 검토
- read-only safety 잠금 유지 검토

## 화면 표시 요소

- VPS 추천 후보 여부
- 전체 상세 검토 상태 배지
- 검토 항목 요약 카드
- 범주별 검토 항목 목록
- 실제 VPS 생성 / 실제 배포 / 실제 도메인 연결 미시작 상태
- Task 323 별도 승인 필요 안내 문구

## 안전 경계

- 실제 VPS 생성 없음
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

Task 323은 Task 322 VPS 후보 상세 검토 결과를 read-only로 인증하는 단계이며, 사용자 별도 승인 전에는 자동 진행하지 않습니다.
