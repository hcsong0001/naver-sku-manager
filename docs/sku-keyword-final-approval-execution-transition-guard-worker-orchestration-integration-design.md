# FinalApproval Execution Transition Guard Worker Orchestration Integration Design

## 1. 작업 목적
이전에 구현 완료된 `evaluateFinalApprovalExecutionTransitionGuard` 순수 함수(Pure Service)를 실제 Worker Job Orchestration 흐름 내에 안전하게 연결(Integration)하기 위한 아키텍처 및 처리 규칙을 문서화합니다. 

## 2. 현재 완료 상태 요약
- Transition Guard의 Pure Service 함수 구현 및 14개의 단위 테스트가 100% 통과된 상태입니다.
- Worker와 별개의 독립된 상태에서 검증되었으므로 아직 운영 코스트나 부작용(Side-effect)은 없는 상태입니다.

## 3. Integration Design이 필요한 이유
- 순수 함수 그 자체로는 어떠한 실제 제어나 블로킹도 수행하지 못합니다.
- 복잡한 Worker의 흐름 중 어느 시점에 이 Guard를 호출하여 흐름을 끊고, Guard의 반환값을 바탕으로 Job의 상태를 어떻게 결정할지에 대한 명확한 규칙이 필요하기 때문입니다.

## 4. Pure Service 단독 구현과 Worker 연결의 차이
- **Pure Service**: 외부 상태를 모르며 주어진 인자(Input)에 대해서만 허용/차단을 판정.
- **Worker 연결(Integration)**: Queue Payload 및 DB Revalidation 로직에서 가져온 실제 데이터를 Pure Service의 인자 형태로 매핑(Mapping)해야 하며, 결과(`allowed`)에 따라 Worker 프로세스의 중단 혹은 진행을 결정하는 물리적 제어가 추가됩니다.

## 5. 현재 Worker Job Orchestration 흐름 요약
1. Queue에서 Job을 수신하여 Payload 추출
2. Payload Validation 수행
3. **DB Revalidation 수행 (기존 로직)**
4. (이후 로직 미구현 상태에서 No-Op 완료)

## 6. Transition Guard 호출 위치 후보
- **DB Revalidation 직후**: `sku-keyword-final-approval-execution-worker-job-orchestration.service.ts` 내부에서 DB Revalidation 서비스 호출 직후 통과된 Snapshot과 입력 Payload 데이터를 조합하여 즉각 Guard를 호출하는 것이 가장 이상적입니다.

## 7. DB Revalidation 결과에서 Guard 입력으로 매핑할 필드
- DB Revalidation을 통과하면서 반환받은 Snapshot 데이터 중 아래 항목 매핑:
  - `finalApproval` (id, status, validationExpiresAt, payloadHash, validationSnapshotHash)
  - `batchJob` (id, status)
  - `batchJobItems` (id, status 목록)

## 8. Job payload에서 Guard 입력으로 매핑할 필드
- Queue Payload에서 추출한 값 매핑:
  - `finalApprovalId`
  - `idempotencyKey`
  - `actorId`
  - `payloadHash`
  - `validationSnapshotHash`

## 9. now 입력값 주입 방식
- Orchestration 시작 시점 혹은 Guard 호출 직전에 `new Date().toISOString()`을 생성하여 `now` 인자로 주입함으로써 시간 결정성(Determinism)을 유지합니다.

## 10. mode 처리 기준
- Payload에 포함된 `mode` 값(`"dry-run"` 또는 `"live"`)을 Guard로 전달하여 모드 기반 차단 로직이 올바르게 실행되도록 합니다.

## 11. dry-run mode 허용 기준
- `mode === "dry-run"` 이면서 모든 해시, 유효기간, 상태값이 완벽히 일치할 때 통과(allowed: true)합니다.

## 12. live mode 차단 기준
- 현재 시스템 설계 및 검증 단계 상 `live` mode는 무조건 차단(allowed: false)되며 `LIVE_MODE_BLOCKED` 에러가 발생합니다.

## 13. Guard allowed=true일 때의 처리 원칙
- Guard를 통과하더라도 **아직 실제 EXECUTING 전환이나 Naver API 라이브 연동(live execution)으로 넘어가지 않으며**, 검증 목적의 Mock 처리 혹은 안전하게 다음 단계로의 진입 허가 로깅만 수행하고 `completed` 시킵니다.

## 14. Guard allowed=false일 때의 처리 원칙
- Guard 통과에 실패하면 즉각 Orchestration의 흐름을 중단하고 Job을 안전하게 차단(blocked) 상태나 `FAILED` 상태로 처리해야 합니다.

## 15. reasonCodes 기록 방식 후보
- Guard가 반환한 `reasonCodes` 배열을 Worker 로깅(Log)에 남기거나, Job 실패 사유(Failed Reason)에 포함하여 가시성을 높입니다.

## 16. 아직 DB write를 하지 않는 경계
- Integration 설계 단계는 물론 다음 구현 단계에서도, 실제 `EXECUTING` 상태로 DB를 `UPDATE` 하는 Write 로직은 절대 수행하지 않습니다.

## 17. 아직 EXECUTING 전환을 하지 않는 경계
- 코드 흐름상 다음 단계로 넘어갈 권한을 받았을 뿐이므로 EXECUTING 상태 전이는 철저히 배제됩니다.

## 18. 아직 Naver API 호출을 하지 않는 경계
- Guard의 보호를 뚫고 실제 API 연동 어댑터가 호출되지 않도록 방어선 안쪽에서 흐름을 차단합니다.

## 19. Worker 로그에 남겨야 할 정보
- Guard 호출 성공 여부 (`Transition Guard Checked: allowed=true/false`)
- 거부된 경우 `reasonCodes` 상세 내역

## 20. Worker 로그에 남기면 안 되는 민감정보
- 사용자 Payload 원문, 데이터베이스 및 캐시의 호스트/비밀번호 등.

## 21. 테스트 케이스 후보
- Orchestration Service 유닛 테스트 내에서 Transition Guard 순수 함수가 정상적으로 호출되는지 Spy/Mock 검증.
- Guard 반환이 `false`일 때 Orchestration이 중단되는지 검증.
- Guard 반환이 `true`일 때 다음 단계(현재는 No-Op Mock)로 진행되는지 검증.

## 22. Integration 구현 시 추가/수정 파일 후보
- **수정 대상 파일**: 
  - `src/services/sku-keyword-final-approval-execution-worker-job-orchestration.service.ts`
  - `src/services/sku-keyword-final-approval-execution-worker-job-orchestration.test.ts`
- **활용 파일**: `src/services/sku-keyword-final-approval-execution-transition-guard.service.ts`

## 23. 성공 기준
- Orchestration 코드 안에 Guard 서비스가 호출될 위치와 매핑 룰이 설계 문서상 논리적 모순 없이 명확히 정의된 경우.

## 24. 실패 기준
- Guard 검사 후 은연중에 EXECUTING 상태 변경이나 DB Write를 기획하는 내용이 문서에 포함되는 경우.

## 25. 다음 단계 제안
- 본 설계 문서를 기반으로 `sku-keyword-final-approval-execution-worker-job-orchestration.service.ts` 내부를 수정하여 Guard 서비스를 통합(Integration)하고, Worker 터미널을 열어 테스트 DB/Queue를 통한 End-to-End 동작을 검증합니다.
