# FinalApproval Execution Implementation Sequence Plan

이 문서는 `FinalApproval` dry-run 검증 완료 이후, 실제 라이브 반영(Live Execution)까지 도달하기 위한 단계별 구현 순서와 승인 게이트를 명세합니다. 모든 구현은 본 시퀀스 플랜을 순차적으로 따르며, 승인 없이 임의로 다음 단계로 넘어갈 수 없습니다.

## 1. 현재 완료된 단계
- `FinalApprovalExecutionPlan` 변환 순수 함수 구현 완료
- `DRY_RUN` 오케스트레이션 및 어댑터 로직 구현 완료
- 로컬 Docker PostgreSQL을 활용한 Integration Test 작성 완료 (Fail 0건)
- 라이브 실행을 위한 각종 안전장치(Worker, Live Adapter, API Contract) 문서화 완료

## 2. 아직 구현하지 않은 단계
- Execution 처리용 Mock Service 및 API Skeleton
- 백그라운드 Worker 아키텍처 및 Enqueue 메커니즘
- 데이터베이스 상태 전이(`EXECUTING`, `SUCCESS`, `FAILED`) 로직
- Execution Log 및 Audit Log 구축
- 외부 망 통신을 담당하는 Guarded LIVE Adapter
- 프론트엔드 UI의 실행(Execute) 버튼 및 상태 모니터링 기능

## 3. 구현 단계별 추천 순서
라이브 반영이라는 민감한 액션의 안정성을 확보하기 위해 다음 8단계로 점진적 구현을 진행합니다.

---

### 4. 1단계: Mock execution command/service 설계
- **목표**: 상태 전이 로직 없이, 기존 `dry-run` 오케스트레이터를 래핑하는 단순 서비스 구축.
- **허용 작업**: Mock 클래스 생성 및 단위 테스트 작성.
- **금지 범위**: 상태 변경(UPDATE), 네이버 API 호출, API Route 연동 불가.

### 5. 2단계: execution API skeleton 설계
- **목표**: 프론트엔드로부터 요청을 접수할 `Next.js API Route`의 인터페이스(Skeleton) 구현.
- **허용 작업**: 파라미터 유효성 검사, DB Hash 비교 로직, HTTP 202 응답 체계 구현.
- **금지 범위**: 트랜잭션 커밋, 외부 망 호출 불가. API 핸들러에서 직접 비즈니스 로직 수행 금지.

### 6. 3단계: Worker enqueue 설계
- **목표**: API에서 접수한 요청을 큐(Queue) 시스템(DB Table, Redis 등)에 삽입하는 로직 구현.
- **허용 작업**: 큐 테이블 마이그레이션(필요 시), Enqueue 서비스 함수 및 테스트.
- **금지 범위**: Worker Daemon 구동 금지, Dequeue 로직 금지.

### 7. 4단계: Worker dry-run execution 연결
- **목표**: 큐에서 꺼낸(Dequeue) 후, `dry-run adapter`를 태워 `SUCCESS` 상태로 전이하는 흐름을 통합.
- **허용 작업**: 상태 전이 로직(`READY` -> `EXECUTING` -> `SUCCESS`), DB 트랜잭션, 동시성/락(Lock) 처리.
- **금지 범위**: LIVE Adapter 연결 불가, 네이버 API 호출 금지.

### 8. 5단계: execution log/audit log 설계
- **목표**: 실행 결과와 트리거 이벤트의 상세 이력을 데이터베이스에 영구 보존.
- **허용 작업**: Log Schema 정의 및 기록 로직 구현.
- **금지 범위**: 기존 JobItem의 로직 수정, Live 통신 시도 금지.

### 9. 6단계: LIVE adapter 구현 전 최종 승인 gate
- **목표**: 지금까지 구현된 모든 Dry-run 기반 워크플로우에 대한 리뷰어/사용자의 명시적 승인(Sign-off).
- **허용 작업**: 승인 대기, 문서 검토, 단위 테스트 커버리지 확인.
- **금지 범위**: 승인이 떨어지기 전까지 `Guarded LIVE adapter` 코드 작성 금지.

### 10. 7단계: guarded LIVE adapter 구현 조건
- **목표**: 실제 네트워크 호출을 담당하는 객체 구현. 철저한 Safety Guard 적용.
- **허용 작업**: 외부 HTTP 클라이언트(Axios/Fetch), 타임아웃, Retry, Rate Limit 로직 구현.
- **금지 범위**: 환경 변수 제어 없는 무조건적 호출, 운영 DB 임의 수정.

### 11. 8단계: 실행 버튼 UI 구현 조건
- **목표**: 프론트엔드 관리자 대시보드에서 `실행` 모달과 동의(Confirm) 체크박스 제공.
- **허용 작업**: React 컴포넌트, 상태관리, 비동기 API 연동.
- **금지 범위**: Confirm 로직 우회 버튼 구현 금지.

---

## 12. 각 단계별 금지 범위 (공통)
- 운영 DB(`production` 데이터베이스)에 대한 접근 및 쓰기.
- `DATABASE_URL` 원문 출력 및 DB 비밀번호, API 토큰(Secret)의 출력 또는 하드코딩.
- 지시되지 않은 `schema.prisma` 무단 수정 및 마이그레이션 파일 추가.

## 13. 각 단계별 검증 명령
각 단계 구현 후 커밋 전 다음 명령어를 통해 정적 분석을 반드시 수행합니다:
```bash
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd tsc --noEmit
npx.cmd eslint . --ext .ts,.tsx
git diff --check
```

## 14. 각 단계별 커밋 메시지 예시
- 1단계: `feat(tms): implement mock execution service for final approval`
- 2단계: `feat(tms): create final approval execution API skeleton`
- 3단계: `feat(tms): implement worker enqueue logic for final approval`
- 4단계: `feat(tms): connect worker with dry-run adapter and status transitions`
- 7단계: `feat(tms): implement guarded live adapter for naver API`

## 15. 실제 네이버 API 호출이 허용되기 전 필요한 승인 조건
- 6단계(LIVE adapter 구현 전 최종 승인 gate)를 통과하여 문서상 사용자(User) 또는 팀 리더의 명시적인 `Approve`를 득해야 함.
- 로컬 통합 테스트에서 상태 전이(`EXECUTING`) 도중 동시성 제어가 완벽히 작동함이 입증되어야 함.

## 16. 운영 DB 보호 조건
- 모든 실행 단위는 `NODE_ENV === 'production'` 일 때의 분기 처리를 갖추어야 함.
- 로컬 및 테스트 환경은 `DATABASE_URL`이 반드시 `localhost:55432` 혹은 허가된 테스트 서버를 가리키는지 확인하는 Assert 가드를 모든 테스트 및 Worker Entrypoint에 유지해야 함.

## 17. 다음 작업 추천
문서화가 완료되었으므로, **"1단계: Mock execution command/service 설계 및 구현"**에 돌입할 것을 추천합니다. (이때에도 상태 변이나 라이브 호출은 차단됩니다.)
