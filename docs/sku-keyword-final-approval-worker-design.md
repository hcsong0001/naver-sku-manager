# FinalApproval 실행/Worker 설계 문서

## 1. Worker의 목적
- FinalApproval artifact를 기반으로 실제 네이버 API 반영을 수행하는 별도 실행 계층입니다.
- FinalApproval 생성 API와 Worker는 명확히 분리됩니다.
- FinalApproval 생성 단계에서는 네이버 API를 절대 호출하지 않습니다.
- Worker만이 향후 네이버 API 호출을 수행하는 주체가 될 수 있습니다.
- Worker의 실제 로직을 구현하기 전에, 반드시 dry-run 재검증과 payload 변환 규칙의 선행 구현 및 테스트가 필요합니다.

## 2. 실행 전 필수 조건
Worker가 실제로 작업을 수행(API 반영 등)하기 전에, 아래 조건들을 모두 엄격하게 만족해야만 실행이 허가됩니다.

- Job 상태가 `APPROVED`여야 합니다.
- JobItem 상태가 `READY`여야 합니다.
- `ACTIVE` 상태의 FinalApproval artifact가 반드시 존재해야 합니다.
- FinalApproval의 `validationExpiresAt`이 현재 시각 기준으로 미래여야 합니다. (만료되지 않음)
- FinalApproval의 `payloadHash`와 실행 직전에 현재 문맥 기반으로 재계산한 hash 값이 일치해야 합니다.
- `validationSnapshotHash` 역시 재검증이 가능해야 합니다.
- FinalApprovalItem과 JobItem 간의 매핑이 모두 유효해야 합니다.
- 해당 Job에 속하지 않은 Item이 섞여 있지 않아야 합니다.
- 중복 실행 중이 아니어야 합니다. (Job 단위 실행 lock 획득 성공 필수)
- 운영 환경의 gate가 명시적으로 활성화되어 있어야 합니다.
- 네이버 API adapter의 모드가 `LIVE`인지 `DRY_RUN`인지 명확하게 구분/설정되어 있어야 합니다.

## 3. 상태 전이 정책
상태 전이는 철저하게 설계된 사이클을 따릅니다. 임의의 상태 건너뛰기는 허용되지 않습니다.

**현재까지의 상태 전이 (구현 완료):**
- Job: `DRAFT` → `APPROVED`
- Item: `DRAFT` → `READY`
- FinalApproval: `ACTIVE` 생성

**향후 실행 후보 상태 전이 (Worker 적용 시):**
- Job: `APPROVED` → `EXECUTING` → `COMPLETED` / `FAILED` / `PARTIAL_FAILED`
- Item: `READY` → `EXECUTING` → `COMPLETED` / `FAILED` / `SKIPPED`

**주의 사항:**
- Worker가 단순히 `APPROVED` 상태의 Job만을 보고 실행해서는 안 됩니다.
- Worker가 단순히 `READY` 상태의 Item만을 보고 실행해서는 안 됩니다.
- `ACTIVE` FinalApproval이 없으면 무조건 실행이 금지됩니다.
- `validationExpiresAt`이 만료되었다면 무조건 실행이 금지됩니다.
- FinalApproval artifact 검증을 통과하지 않고서는 상태를 `EXECUTING`으로 전환하는 것이 절대 금지됩니다.

## 4. payload 변환 설계
FinalApproval artifact에서 추출한 데이터를 실제 네이버 API 요청 payload 구조로 변환하는 단계입니다.

- `FinalApprovalItem` 단위를 기준으로 실제 실행에 쓰일 payload를 생성합니다.
- `requestPayload.candidate` 데이터를 기반으로 변환 작업을 수행합니다.
- 변환 중 `requestPayload.dryRunItem`을 기반으로 한 재검증을 병행합니다.
- Keyword update 등 세부 payload 변환 규칙을 적용합니다.
- 실행 직전, 현재 상태를 기반으로 canonical hash를 재계산합니다.
- 재계산된 hash와 기존 `payloadHash` 간의 불일치가 발견되면 즉시 실행을 중단합니다.
- 변환 결과는 우선 실행 전 dry-run summary 형태로 남겨 기록 및 검토할 수 있어야 합니다.

*(주의: 본 문서에서는 실제 네이버 API request body 스키마를 추측하여 정의하지 않으며, 실제 adapter 구현 단계에서 별도 설계로 확정합니다.)*

## 5. 실행 전 dry-run 재검증
Worker는 네이버 API를 호출하기 전에, 현재 DB/Context 상태를 바탕으로 dry-run 검증 절차를 다시 수행해야 합니다.

**검증 항목:**
- Job / Item 상태의 재확인 (`APPROVED` / `READY`)
- `ACTIVE` FinalApproval 존재 여부 확인
- `validationExpiresAt` 만료 여부 재확인
- `payloadHash` 재계산 및 대조
- `validationSnapshotHash` 재계산 또는 snapshot의 현재 시점 유효성 대조
- candidate 및 dryRunItem 데이터 무결성 재확인
- `NAVER_PRODUCT_COLLECTION` 등의 외부 수집 문맥의 유효성 재확인 (시간 초과 등)
- API 반영 대상 item count의 일치 여부 확인
- 최종 예상 변경 payload에 대한 summary 생성 확인

## 6. 중복 실행 방지
실제 API 호출의 멱등성과 안전을 보장하기 위한 중복 실행 방지 정책입니다.

- Job 단위의 견고한 실행 lock 체계가 필요합니다.
- 동일 Job에 대하여 동시에 2개 이상의 Worker 프로세스가 접근/실행되는 것을 절대 금지합니다.
- 이미 `EXECUTING` 상태인 Job에 대한 재실행 호출을 무시 및 금지합니다.
- 이미 `COMPLETED` 상태로 끝난 Job의 경우, 별도의 재시도 허가 정책(수동 개입 등) 없이는 무조건 재실행을 금지합니다.
- `FAILED` / `PARTIAL_FAILED` Job의 경우에도, 자동 재실행을 금지하며 반드시 별도 retry artifact 생성 또는 엄격한 retry policy 검증 과정을 통과해야만 재시도를 허용합니다.

## 7. 실패 처리 정책
Worker 실행 과정에서 발생할 수 있는 여러 실패 유형과 이에 대한 처리 원칙을 정의합니다.

**실패 유형:**
- 사전 검증(Dry-run) 실패
- FinalApproval 만료 (`validationExpiresAt` 초과)
- `payloadHash` / 검증 데이터 불일치
- 네이버 API 인증 실패
- 네이버 API rate limit(호출 한도) 초과
- 네이버 API 개별 item 단위 로직 실패 (Validation error 등)
- 네트워크/타임아웃 실패
- 부분 성공 (일부 Item은 성공, 일부는 실패)
- 내부 DB 업데이트(결과 저장) 실패

**처리 원칙:**
- 실패 원인을 명확히 파악하여 Job 단위와 Item 단위에 각각 기록합니다.
- 부분 성공/실패 시 성공한 Item과 실패한 Item의 상태를 명확히 분리하여 저장합니다.
- 재시도 가능한 에러(예: 네트워크 일시 오류, Rate limit)와 재시도 불가능한 에러(예: 인증 실패, Payload 오류)를 명시적으로 구분합니다.
- *중요:* 실제 네이버 API 호출 전 단계(사전 검증 등)에서 발생한 실패의 경우, 가급적 Job/Item 상태를 `EXECUTING`으로 오염시키지 않고 이전 상태(`APPROVED`/`READY`)에서 중단 사유만 업데이트하는 방향으로 구현을 검토합니다.

## 8. 로그 및 감사(Audit) 기록
문제 추적과 보안, 감사를 위한 실행 이력 기록 원칙입니다.

**기록 대상:**
- Worker 실행 시작 시각
- 실행자 주체 (실제 사용자 ID 또는 system actor명)
- 참조 및 사용한 FinalApproval의 ID와 버저닝 정보
- `payloadHash` 및 `validationSnapshotHash` 정보
- 처리 대상 item count
- 사용된 API adapter의 모드 (`DRY_RUN` 또는 `LIVE`)
- Item별 세부 실행 결과 (성공, 실패, 건너뜀)
- 구체적인 실패 원인 및 분류
- 네이버 API response 요약 (성공 여부, 주요 코드 등)

**금지 사항 (보안 원칙):**
- System secret, 통신 token 기록 절대 금지
- 네이버 API access token, API key 로깅 절대 금지
- `DATABASE_URL` 또는 접속 권한 정보 기록 절대 금지
- 민감 정보를 포함할 가능성이 있는 네이버 API Request/Response의 전체 raw body 원문 저장 지양 (필요 최소한의 요약 및 에러 코드만 저장)

## 9. DRY_RUN adapter 우선 원칙
개발 및 초기 운영 단계에서 발생할 수 있는 대규모 장애를 방지하기 위해 다음 원칙을 강하게 준수합니다.

- **최초 Worker 및 실행 파이프라인 구현 시, 반드시 `DRY_RUN` adapter만을 장착하고 구현합니다.**
- 관리자나 시스템 소유자의 별도 명시적 승인 전까지 `LIVE` 네이버 API 호출 로직의 연동을 전면 금지합니다.
- `DRY_RUN` adapter는 실제 네이버 API 엔드포인트를 호출하지 않고, 성공 응답(또는 시뮬레이션 응답)을 mock으로 반환하도록 설계합니다.
- 이를 통해, 실제 운영 서비스에 영향을 주지 않으면서 payload 변환 로직, 상태 전이 파이프라인(`EXECUTING` → `COMPLETED`), 그리고 에러 핸들링 및 로깅 체계가 완벽히 작동하는지를 사전 검증합니다.

## 10. 단계별 구현 순서
본 문서의 설계를 실제 코드로 구현하기 위해, 다음의 순차적 접근법을 제안합니다.

1. **Worker 실행 설계 문서 작성 (현재 완료 단계)**
2. **payload 변환 규칙 문서 작성:** 구체적으로 Item 데이터를 어떻게 네이버 API 규격으로 바꿀지 문서화
3. **`DRY_RUN` adapter 설계:** 가짜 네이버 API 응답을 시뮬레이션할 인터페이스 및 Mock 객체 설계
4. **실행 lock / 상태 전이 설계:** `EXECUTING` 전환, Transaction 제어 등 내부 로직 설계
5. **Docker 테스트 DB 기반 Worker dry-run integration test 설계:** 실제 코드를 테스트 DB에서 검증할 계획 수립
6. **`DRY_RUN` Worker 구현:** 위 2~5단계를 묶어 실제 코드를 구현 (로깅, 트랜잭션 포함)
7. **UI에서 실행 버튼 연동 준비:** 실제 동작 확인을 위한 UI(단, 초기엔 disabled/read-only 형태로 가시성만 제공)
8. **`LIVE` 네이버 API adapter 구현 및 연동:** 모든 검증이 완벽하게 끝난 뒤 마지막 승인을 거쳐 구현
