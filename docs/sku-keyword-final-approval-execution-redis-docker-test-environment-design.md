# FinalApproval Execution Redis Docker Test Environment Design

## 1. 작업 목적
실제 BullMQ/Redis 기반 비동기 큐 프로세싱 구현에 앞서, FinalApproval Execution Queue 통합 테스트를 수행할 독립된 로컬 Docker Redis 환경을 설계하고 관련 정책을 문서화합니다. 이를 통해 운영 데이터와의 충돌을 원천 차단하고 안전한 테스트 환경을 확보합니다.

## 2. 현재 완료 상태 요약
- **Worker Job Payload Validation 순수 서비스** 구현 완료
- **Worker Job DB Revalidation 순수 서비스** 구현 완료
- **Worker Job Orchestration 순수 서비스** 구현 완료
- **BullMQ Dependency Change Design** 문서 추가 완료
*(현재 시점에서는 아직 패키지 설치, DB 접속, Redis 실행 및 Worker 구현이 이루어지지 않았습니다.)*

## 3. 왜 Redis Docker test environment가 필요한지
FinalApproval 비동기 처리를 담당할 BullMQ는 데이터 저장 및 Job 관리 백엔드로 Redis를 필수적으로 요구합니다. 로컬 테스트 및 CI 통합 테스트 과정에서 실제 서비스가 사용할 운영 캐시와 분리된 완전한 샌드박스 환경이 필요하며, Docker를 활용하면 이식성 높고 격리된 Redis 환경을 신속하게 구축할 수 있습니다.

## 4. 테스트 Redis와 운영 Redis 분리 원칙
운영 Redis와 테스트 Redis는 완벽히 분리되어야 합니다. 로컬에서 실행하는 테스트가 실수로 운영 캐시나 큐를 오염시키는 것을 방지하기 위해 테스트용 컨테이너와 포트를 명시적으로 할당하여 물리적으로 분리합니다.

## 5. Docker Redis 컨테이너 이름 제안
`tms-final-approval-test-redis`

## 6. Docker Redis 포트 제안
`localhost:56379` (기본 포트 6379와의 충돌 방지)

## 7. 테스트용 REDIS_URL 정책
로컬 테스트 환경에서 사용할 환경 변수 예시는 다음과 같습니다:
`REDIS_URL="redis://localhost:56379"`

## 8. 운영용 REDIS_URL 정책
운영 서버의 `REDIS_URL` 원문은 문서, 소스 코드, 커밋 메시지, 채팅 등 어떠한 곳에도 절대 기록하거나 노출해서는 안 됩니다. 시스템 환경 변수 및 보안 비밀 관리 시스템(Secret Manager 등)을 통해서만 안전하게 주입받아야 합니다.

## 9. Docker Redis 실행 전 체크리스트
- 현재 Docker 데몬이 실행 중인지 확인
- 로컬의 `56379` 포트가 사용 중이지 않은지 확인
- 이번 작업 단계가 아닌, 별도의 승인이 완료된 이후에만 실행할 것

## 10. Docker Redis 실행 명령 후보
```bash
docker run --name tms-final-approval-test-redis -p 56379:6379 -d redis:7-alpine
```

## 11. Docker Redis 상태 확인 명령 후보
```bash
docker ps --filter "name=tms-final-approval-test-redis"
docker logs tms-final-approval-test-redis
docker exec tms-final-approval-test-redis redis-cli ping
```

## 12. Docker Redis 정지/삭제 명령 후보
```bash
docker stop tms-final-approval-test-redis
docker rm tms-final-approval-test-redis
```

## 13. 테스트 데이터 초기화 정책
**Redis 데이터 초기화 명령 후보:**
```bash
docker exec tms-final-approval-test-redis redis-cli FLUSHDB
```
- **주의사항 1**: 이번 문서 추가 작업 중에는 위 명령들을 절대 실행하지 않습니다.
- **주의사항 2**: Docker Redis 실행은 별도 승인 후 진행합니다.
- **주의사항 3**: `FLUSHDB` 명령어는 오직 테스트 Redis(`tms-final-approval-test-redis`) 컨테이너 내부에서만 허용됩니다.
- **주의사항 4**: 어떠한 경우에도 운영 Redis에서 `FLUSHDB` 명령어 사용은 엄격히 금지됩니다.

## 14. 보안 정책
- `REDIS_URL` 원문 출력 절대 금지
- 운영 `REDIS_URL` 문서 기록 절대 금지
- `DATABASE_URL` 원문 출력 절대 금지
- DB 비밀번호, 토큰, secret 출력 절대 금지
- 운영 Redis와 테스트 Redis 완벽 분리
- 운영 DB와 테스트 DB 완벽 분리
- Queue payload 내 민감정보(비밀번호, 개인정보 등) 저장 절대 금지
- Redis key 자체에 secret 저장 절대 금지

## 15. Git 관리 정책
- Docker Redis 실행 상태(볼륨 데이터 등)는 Git에 기록하지 않습니다.
- `.env` 파일은 절대로 커밋하지 않으며 `.gitignore`의 대상이어야 합니다.
- 테스트용 env 예시는 오직 문서에만 기록합니다.
- 본 단계에서 `package.json` 및 `package-lock.json`은 수정하지 않습니다.
- 본 단계에서 `docker-compose.yml` 파일은 생성하지 않습니다.
- 실제 Docker 구성 파일 추가는 추후 별도 승인 후 진행합니다.

## 16. 다음 구현 순서 제안
1. Redis Docker Test Environment Design 문서 커밋
2. 별도 승인 후 Docker Redis 컨테이너 실행
3. Redis ping 명령으로 정상 구동 확인
4. `BullMQ`/`ioredis` package install
5. BullMQ Queue Adapter 순수 격리 구현
6. Docker Redis 기반 Queue Adapter integration test 수행
7. Worker process 구현 및 실행 (별도 승인 후 진행)
