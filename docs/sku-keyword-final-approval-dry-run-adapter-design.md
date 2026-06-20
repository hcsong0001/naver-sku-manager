# FinalApproval DRY_RUN Adapter 설계 문서

## 1. 문서 목적
- `LIVE` 네이버 API 호출 구현에 앞서, 이를 시뮬레이션할 `DRY_RUN` adapter의 설계를 사전에 고정합니다.
- `DRY_RUN` adapter는 실제 네이버 API를 절대 호출하지 않습니다.
- 본 adapter는 payload 변환 결과의 무결성과 실행 가능성만을 중점적으로 검증합니다.
- Worker 로직을 본격적으로 구현하기 전에 테스트 가능하고 안전한 adapter의 경계를 명확히 정의합니다.
- 실제 동작을 수행하는 `LIVE` adapter는 본 설계와 `DRY_RUN` 검증이 완벽히 끝난 후 별도 승인을 거쳐 구현합니다.

## 2. DRY_RUN Adapter의 역할
본 adapter는 실행 파이프라인에서 다음의 역할을 수행합니다.

- 변환 모듈로부터 생성된 `FinalApprovalExecutionPlan` 입력을 수신합니다.
- 개별 item 단위로 생성된 실행 후보 payload의 정합성을 검증합니다.
- 실제 네이버 API 네트워크 호출 없이 성공 및 실패 시나리오를 시뮬레이션하여 반환합니다.
- 변환된 payload 내에 필수 식별자(productId, storeId 등)가 존재하는지 재차 확인합니다.
- 변경 전/후 데이터를 비교하는 summary를 생성합니다.
- 개별 item 단위의 dry-run result를 생성합니다.
- Job 단위의 전체 dry-run summary를 집계하여 생성합니다.
- 향후 로그 및 감사 기록 시스템에서 사용할 수 있는 일관된 결과 구조를 제공합니다.

## 3. 입력 데이터
Adapter가 실행되기 위해 입력받는 데이터(ExecutionPlan) 구성 항목입니다.

- `jobId`
- `finalApprovalId`
- `finalApprovalVersion`
- `payloadHash`
- `validationSnapshotHash`
- `adapterMode` = "DRY_RUN" (필수)
- `itemCount`
- `items[]`: 실행 대상 아이템 목록
  - 각 item의 `jobItemId`
  - 각 item의 `finalApprovalItemId`
  - 각 item의 `productId`, `storeId`, `skuId`
  - `candidateSummary`
  - `dryRunSummary`
  - `proposedAction`
  - `naverApiPayloadCandidate` (LIVE adapter 구현 전 구조를 유지하는 임시 후보 데이터)

*(주의: 본 문서에서는 실제 네이버 API request body를 스펙으로 확정하지 않으며, `naverApiPayloadCandidate`는 유효성을 검토할 후보 구조로만 다룹니다.)*

## 4. 출력 결과 구조 제안
*(본 구조는 설계 목적의 예시이며, 실제 TypeScript 코드 파일 생성을 의미하지 않습니다.)*

```ts
type DryRunAdapterResult = {
  adapterMode: "DRY_RUN";
  jobId: string;
  finalApprovalId: string;
  finalApprovalVersion: number;
  payloadHash: string;
  validationSnapshotHash: string;
  startedAt: string;
  finishedAt: string;
  itemCount: number;
  successCount: number;
  failureCount: number;
  skippedCount: number;
  items: DryRunAdapterItemResult[];
};

type DryRunAdapterItemResult = {
  jobItemId: string;
  finalApprovalItemId: string;
  productId: string | null;
  storeId: string | null;
  skuId: string | null;
  proposedAction: "UPDATE_KEYWORDS";
  result: "SUCCESS" | "FAILED" | "SKIPPED";
  reasonCode?: string;
  message?: string;
  beforeSummary?: unknown;
  afterSummary?: unknown;
  payloadCandidateSummary?: unknown;
};
```

## 5. 검증 규칙
`DRY_RUN` adapter 내부에서 수행되어야 할 주요 검증 로직입니다.

- `adapterMode` 값이 정확히 `"DRY_RUN"`인지 확인합니다.
- `jobId` 및 `finalApprovalId`가 누락되지 않았는지 확인합니다.
- 헤더 레벨의 `itemCount`와 실제 전달된 `items.length`가 일치하는지 확인합니다.
- 개별 item마다 `jobItemId`와 `finalApprovalItemId`가 올바르게 존재하는지 확인합니다.
- API 호출에 필수적인 `product`, `store` 식별자가 모두 존재하는지 확인합니다.
- `proposedAction` 값이 사전 정의되고 허용된 액션인지 확인합니다.
- `naverApiPayloadCandidate` 필드가 비어있지 않고 유효한 객체를 담고 있는지 확인합니다.
- 실제 변경될 데이터(변경 후보)가 비어있지 않은지 검사합니다.
- 변환 판단의 근거가 된 `candidateSummary` 및 `dryRunSummary`가 존재하는지 확인합니다.

## 6. 실패 처리 정책
검증 규칙 위반 시 적용되는 실패 정책과 사유들입니다.

**실패 유형:**
- execution plan 데이터 자체 누락
- `adapterMode` 불일치 (예: LIVE 모드가 잘못 들어온 경우)
- `itemCount` 속성과 실제 항목 수 불일치
- 필수 식별자 누락 (storeId, productId 누락 시 API 호출 불가)
- `proposedAction` 미지원 액션 요청
- API payload 후보 누락
- 변경할 속성이 없는 상태
- `candidate` / `dryRun` summary 누락
- Item 단위 개별 검증 실패

**실패 원칙:**
- `DRY_RUN` adapter는 실제 네트워크를 경유한 네이버 API 호출을 하지 않으므로, 외부 API 응답 지연이나 타임아웃 같은 외부 실패는 발생하지 않아야 합니다.
- 시스템 및 설계 초기 단계에서는, **item 중 단 하나라도 치명적 실패를 겪을 경우 해당 job의 dry-run 전체를 실패(중단)**로 간주하는 매우 보수적인 정책을 기본값으로 채택합니다.
- 전체 실패 처리 여부와 상관없이, 개별 item이 실패한 구체적 원인(failure result)은 반드시 생성 및 기록해야 합니다.

## 7. Worker와의 관계
`DRY_RUN` adapter는 상위 모듈인 Worker 프로세스와 다음과 같은 관계로 동작합니다.

- Worker는 실행 전 단계로 Payload Transform 모듈을 호출하여 `ExecutionPlan`을 생성합니다.
- 최초 Worker 구현 시에는 오직 `DRY_RUN` adapter만을 장착하고 호출하도록 강제합니다.
- `DRY_RUN` adapter 호출이 성공적으로 완료되었다 하더라도, 이어지는 `LIVE` 호출 로직을 절대 실행하지 않습니다.
- `DRY_RUN`의 결과는 오로지 실행 파이프라인 로직 검증, 실행 가능성 검토, UI 노출 및 로그 기록 용도로만 사용됩니다.
- 즉, `DRY_RUN`이 성공했다고 하여 그것이 운영 데이터베이스나 실제 시스템 상의 네이버 운영 환경 반영 승인으로 직결되는 것은 아닙니다.

## 8. 상태 전이 정책
본 어댑터 설계 단계에서는 상태 변경 코드를 직접 작성하지 않으나, 향후 Worker 설계 시 준수해야 할 원칙을 정의합니다.

- `DRY_RUN` adapter 프로세스 자체는 어떠한 경우에도 DB 내 Job 또는 Item의 `status` 값을 수정하지 않습니다.
- `DRY_RUN` Worker(상위 파이프라인) 단계에서 상태를 변경할지 여부는 향후 별도의 설계 과정에서 결정합니다.
- 실제 네이버 `LIVE` API 실행이 완료되기 전까지, Job 또는 Item의 상태를 `EXECUTING`으로 전환하는 행위는 엄격히 금지됩니다.
- `DRY_RUN` 실행 결과(이력)를 보관할 필요가 있다면, 기존 레코드의 상태 변경 대신 별도의 로그 테이블 또는 아티팩트 설계를 우선해야 합니다.

## 9. 로그 및 보안 규칙
감사 추적 및 보안 강화를 위한 핵심 지침입니다.

- `DATABASE_URL` 등 인프라 접속 정보의 기록 및 출력을 절대 금지합니다.
- 네이버 연동용 access token, client secret, signature 데이터 기록을 절대 금지합니다.
- 네트워크 요청이 발생하지 않으므로 실제 API response 원문은 존재하지 않으나, 시뮬레이션 된 mock 응답일지라도 전체 원문 저장은 지양합니다.
- 데이터 무결성 검증을 위한 `payloadHash` 및 `validationSnapshotHash` 값은 로깅 및 기록이 허용됩니다.
- `payloadCandidate` 데이터의 전체 원문을 저장하는 행위는 개인정보/민감정보 마스킹(Masking) 정책이 마련되기 전까지 전면 금지합니다.
- Item별 summary 데이터는 불필요한 민감정보를 사전에 제거한 후 안전하게 기록합니다.

## 10. 테스트 전략
안전한 모듈화를 보장하기 위해 Docker 환경의 테스트 DB 기반 테스트 전략을 제안합니다.

- 기존 FinalApproval 환경에서 구축해둔 Docker integration test 흐름을 재사용합니다.
- Seed 스크립트 기반 UUID job 데이터를 활용하여 유효한 FinalApproval artifact를 사전 생성해 둡니다.
- ExecutionPlan은 순수 함수(pure function)인 변환 모듈의 결과물로써 생성되어야 합니다.
- `DRY_RUN` adapter는 실제 네이버 API mock 서버가 없어도 내부 로직만으로 독립적 실행이 가능해야 합니다.
- **주요 테스트 케이스:**
  - 성공 케이스: 단일 item이 정상적으로 `SUCCESS`로 dry-run 처리됨을 확인.
  - 실패 케이스: 필수 식별자(`productId` 등) 고의 누락 시 `FAILED` 처리됨을 확인.
  - 실패 케이스: `itemCount` 속성과 실제 데이터 배열 길이가 다를 때의 예외 처리 확인.
  - 실패 케이스: 미지원 `proposedAction` 입력 시 거절됨을 확인.
  - 실패 케이스: payload 후보(`naverApiPayloadCandidate`) 누락 시 실패됨을 확인.

## 11. 구현 순서 제안
본 설계 문서가 확정된 후, 실제 구현을 위해 다음의 순차적 접근법을 제안합니다.

1. `DRY_RUN` adapter 설계 문서(본 문서) 확정 및 리뷰
2. `ExecutionPlan` 타입에 대한 초안 문서 정리 또는 실제 TypeScript 인터페이스 파일 설계
3. 부작용이 없는 Payload 변환 순수 함수(pure function) 구현
4. 부작용이 없는 `DRY_RUN` adapter 순수 함수 구현
5. 변환 함수 및 adapter 함수에 대한 단위 테스트(Unit Test) 작성
6. Docker test DB 환경 기반의 통합 테스트(Integration Test) 작성 및 수행
7. 실제 파이프라인 역할을 할 `DRY_RUN` Worker 설계
8. 설계된 `DRY_RUN` Worker 로직 구현
9. UI 내 실행 버튼을 disabled 또는 read-only 형태로 우선 표시하여 가시성 확보
10. 완벽한 `DRY_RUN` 검증 및 승인 이후, 마지막 단계로 `LIVE` 네이버 API adapter 설계 및 구현
