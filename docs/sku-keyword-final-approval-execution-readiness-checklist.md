# FinalApproval Execution Readiness Checklist

이 문서는 `FinalApproval` dry-run 구현 이후, 실제 네이버 API 호출이 동반되는 `LIVE` 실행(Execution) 단계로 넘어가기 전 점검해야 할 안전장치 및 설계 요구사항을 정리한 Checklist입니다.

## 1. 현재 완료된 범위
- `FinalApproval` 관련 데이터베이스 스키마 및 타입 정의 (`FinalApproval`, `FinalApprovalItem`)
- `FinalApprovalExecutionPlan` 변환 순수 함수 구현
- `DRY_RUN` 오케스트레이션 어댑터 구현 (`runFinalApprovalExecutionDryRun`)
- Docker PostgreSQL 환경에서의 통합 테스트(Integration Test) 설계 및 구현 완료 (8/8 Pass)

## 2. 아직 구현하지 않은 범위
- 실제 네이버 쇼핑 파트너 API 호출 로직
- `LIVE` 모드 오케스트레이션 어댑터 구현
- 백그라운드 스케줄러 및 비동기 처리용 Worker 구현
- API Route (엔드포인트) 노출
- 프론트엔드 UI의 `실행(Execute)` 버튼 및 상태 연동 기능
- DB 트랜잭션을 수반하는 `Job` 및 `JobItem`의 `EXECUTING` 등 실제 상태 변경(Status Transition) 로직

## 3. dry-run orchestration과 live execution의 경계
- **Dry-Run**: 데이터베이스에서 조회한 객체 픽스처를 기반으로 순수 함수에 프로젝션 된 데이터만 전달합니다. DB 상태 전이 및 외부 API 호출이 전혀 발생하지 않으며 안전하게 변환 로직만 수행됩니다.
- **Live Execution**: 외부 부수 효과(Side-effect)가 동반됩니다. 백그라운드 Worker 등을 통해 네이버 API로 전송되며, 성공 여부에 따라 데이터베이스의 `status`, 로그 정보 등이 비가역적으로 업데이트됩니다.

## 4. 실제 실행 전 필수 조건
- Live Execution 어댑터 설계 및 격리된 Mock 테스트 완료
- 상태 전이(`EXECUTING` 등)에 대한 동시성 보장 체계 확보
- 부분 실패에 대응하는 롤백 또는 상태 원복(Revert) 로직 구축
- 테스트/스테이징/운영 DB 환경별 명확한 펜싱(Fencing) 전략 확립

## 5. 운영 DB 보호 조건
- 모든 통합 테스트 및 실험적 코드는 반드시 로컬 컨테이너 등 안전한 DB에서만 실행되도록 `DATABASE_URL` 기반 Safety Guard 적용 유지
- LIVE 실행 시 단일 트랜잭션의 범위를 좁히고 낙관적 락(Optimistic Lock) 또는 명시적인 Version 체크 로직 구현
- 실행 중 상태 충돌 방지를 위해 상태 업데이트 전 `Job` 및 `Item`의 원본 `status` 검증 필수화

## 6. 네이버 API 호출 보호 조건
- 개발 환경이나 테스트 환경에서는 절대로 실제 네이버 쇼핑 파트너 API 프로덕션 엔드포인트를 호출하지 않아야 함
- 망 분리 또는 화이트리스트 IP 기반 접근 통제로 잘못된 외부 호출 방지
- Rate Limit 회피 및 Throttle 처리를 위한 안전한 API 요청 간격 조절

## 7. FinalApproval artifact 유효성 조건
- 실행 시점에 `FinalApproval.status`가 반드시 `ACTIVE`여야 함
- `FinalApproval`이 취소(`INVALIDATED`)되거나 상위 버전으로 갱신(`SUPERSEDED`)되었을 경우 즉시 거부
- `Job`의 `status`가 반드시 `APPROVED`여야 하고, 속해있는 `JobItem`들은 `READY` 상태여야 함

## 8. payloadHash / validationSnapshotHash 검증 조건
- **payloadHash**: 실행하려는 Payload 객체의 무결성을 보장해야 합니다. `FinalApproval` 저장 시 생성된 Hash와 직전 런타임에 동적으로 산출된 Hash를 비교 검증해야 함
- **validationSnapshotHash**: Validation 당시의 제반 조건이 유지되고 있는지 비교하며, 불일치할 경우 API 호출 이전에 실행(Plan 빌드 단계)을 즉각 차단해야 함

## 9. Job status / Item status 전환 설계 필요 항목
- **진입**: `READY` -> `EXECUTING` (중복 실행 방지)
- **성공**: `EXECUTING` -> `SUCCESS`
- **실패**: `EXECUTING` -> `FAILED` 또는 `RETRY_PENDING` (원인 분류에 따른 상태 분리)
- 전체 아이템의 실행 결과에 따라 Job을 `EXECUTED` 또는 `PARTIAL_SUCCESS`, `FAILED`로 전이할 수 있는 트리거 구축

## 10. Worker 설계 전 검토 항목
- 폴링(Polling) 전략, 메시지 큐(Queue), 혹은 크론(Cron) 작업 등 인프라 아키텍처 결정
- 데드 레터 큐(Dead Letter Queue) 또는 에러 핸들링 파이프라인
- 타임아웃 처리 및 좀비(Zombie) 상태로 남은 `EXECUTING` Job의 복구 매커니즘

## 11. 실행 API 설계 전 검토 항목
- 사용자 권한 증명(Auth) 및 관리자 등급 확인
- 멱등성 보장 (동일한 API 요청이 동시에 인입되어도 단일 실행 보장)
- API 응답 속성을 동기식으로 응답할지, 비동기 실행 후 Job ID만 반환할지 여부 결정

## 12. 실행 버튼 UI 설계 전 검토 항목
- 버튼 클릭 전 경고(Confirmation) 모달 및 사용자 의도 재확인 절차 (예: "정말 라이브에 반영하시겠습니까?")
- 진행 상태를 시각적으로 보여주는 프로그레스 바(Progress bar) 또는 로딩 인디케이터 구성
- 실행 완료 시 자동 폴링(Auto-polling)을 통한 실시간 리포팅 체계 여부 확인

## 13. audit log / 실행 이력 / rollback / retry / idempotency 필요성
- **Audit Log**: 언제, 누가(어떤 관리자), 어떤 사유로 FinalApproval을 통과시켰고 LIVE 실행을 트리거했는지 남겨야 함 (책임 추적성)
- **Rollback / Retry**: API 연동 과정에서 5xx 오류 및 일시적 네트워크 장애 발생 시 Retry 횟수 제한과 롤백 기준 정책(단건 롤백 vs 전체 배치 취소 등) 확립
- **Idempotency (멱등성)**: 동일한 `FinalApproval`의 중복 실행 요청이 시스템 상태를 두 번 변경하지 않도록 설계

## 14. 다음 단계 추천 순서
1. **LIVE 어댑터 격리 설계**: 네이버 API 호출용 인터페이스 규격 및 라이브 어댑터 단위/통합 테스트 설계 및 구현
2. **Worker 아키텍처 구축**: 백그라운드 Worker 데몬 설계 및 상태 전이(`EXECUTING`, `SUCCESS` 등) 로직 설계
3. **API & UI 연동**: 프론트엔드 API 엔드포인트 연동 및 UI의 실행 버튼/진행 상태 모니터링 기능 개발
