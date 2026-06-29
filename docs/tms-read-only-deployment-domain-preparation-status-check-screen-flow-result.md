# Task 320 - TMS Read-Only Deployment and Domain Preparation Status Check Screen Flow

## 구현 목적

Task 319 후보 흐름 Closure Summary 결과를 바탕으로, 배포와 도메인 연결 전 준비 상태를 read-only로 점검하는 패널을 추가했습니다.

이번 Task는 실제 배포 실행, 실제 도메인 연결, DNS/SSL/포트포워딩/서버 설정 변경이 아니라 현재 로컬 개발 상태에서 다음 준비 단계를 안전하게 화면에 정리하는 목적입니다.

## 상태 판정 규칙

- Task 319 Closure Summary 상태가 `READY`이고 `candidateFlowSafeForDeploymentPreparation === true`이면 `TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_READY`
- Task 319 Closure Summary 상태가 `PARTIAL_READY`이면 `TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_PARTIAL_READY`
- Task 319 Closure Summary 상태가 `BLOCKED`이면 `TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_BLOCKED`
- Task 319 Closure Summary 상태가 `EMPTY`이거나 배포 준비 안전 조건이 false이면 `TMS_READ_ONLY_DEPLOYMENT_DOMAIN_PREPARATION_STATUS_NOT_STARTED`

우선순위는 `BLOCKED -> NOT_STARTED -> PARTIAL_READY -> READY` 순서입니다.

## 화면 표시 요소

- Task 319 Closure Summary 원본 상태 표시
- 전체 배포/도메인 준비 상태 배지 표시
- 배포 준비 점검 항목 표시
- 도메인 준비 점검 항목 표시
- 보안 준비 점검 항목 표시
- read-only safety 점검 항목 표시
- 실제 배포 미시작 / 실제 도메인 연결 미시작 상태 표시
- 실행/API/DB write/Worker/Queue/Adapter 잠금 유지 상태 표시
- Task 321 별도 승인 문구 표시

## 안전 경계

- 실제 배포 실행 없음
- 실제 도메인 연결 없음
- DNS 설정 변경 없음
- HTTPS/SSL 인증서 발급 없음
- 포트포워딩 변경 없음
- NAS/VPS/서버 설정 변경 없음
- Naver API 호출 없음
- DB write 없음
- Token/Auth/Signature/Authorization 값 비노출 유지
- raw API response 비표시/비저장 유지
- `.env` / `.env.local` 열람 및 수정 없음

## 다음 단계

Task 321은 실제 배포가 아니라 배포 대상 환경(NAS/회사 PC/집 PC/VPS)을 read-only로 비교하는 단계이며, 사용자 별도 승인 없이 자동 진행하지 않습니다.
