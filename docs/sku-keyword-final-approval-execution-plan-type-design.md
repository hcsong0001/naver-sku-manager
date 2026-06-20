# FinalApproval ExecutionPlan 타입 설계 문서

## 1. 문서 목적
- `ExecutionPlan`은 FinalApproval artifact와 실제 API를 수행하는 Worker/adapter 간의 의사소통을 담당하는 내부 실행 계획 타입입니다.
- Worker를 본격적으로 구현하기에 앞서 타입 경계를 이 문서로 확정합니다.
- 실제 TypeScript 파일(.ts) 생성은 본 설계가 완료된 후 다음 단계에서 별도 승인을 거쳐 진행합니다.
- `ExecutionPlan`은 먼저 `DRY_RUN` adapter에서 설계 검증용 기준으로 사용됩니다.
- `LIVE` adapter는 별도 승인이 있기 전까지는 설계상으로만 고려하며 구현하지 않습니다.

## 2. 타입 계층 구조
본 모듈에서 사용할 주요 타입의 계층 구조는 다음과 같습니다.

- `FinalApprovalExecutionPlan`
- `FinalApprovalExecutionPlanItem`
- `FinalApprovalExecutionPlanSummary`
- `FinalApprovalExecutionPlanValidation`
- `FinalApprovalExecutionPlanFailure`
- `FinalApprovalExecutionAdapterMode`
- `FinalApprovalExecutionProposedAction`

*(주의: 위 타입들은 설계 목적의 예시이며, 이 단계에서 실제 TypeScript 파일을 생성하지는 않습니다.)*

## 3. adapterMode 설계

```ts
type FinalApprovalExecutionAdapterMode = "DRY_RUN" | "LIVE";
```

**설계 정책:**
- 최초 구현 시에는 오직 `"DRY_RUN"` 모드만 허용합니다.
- `"LIVE"` 모드는 타입 설계상 후보로만 존재하도록 둡니다.
- `LIVE` adapter 로직이 완전히 구현되고 철저한 검증을 통과하기 전까지, 런타임에서 `"LIVE"` 모드를 사용하는 것은 엄격히 금지됩니다.
- 향후 `"LIVE"` 모드로의 전환은 별도의 관리자 승인 및 운영 환경 gate 확인 절차가 필수적으로 요구됩니다.

## 4. proposedAction 설계

현재 SKU keyword matching 업무 흐름을 기준으로 제안하는 액션 타입입니다.

```ts
type FinalApprovalExecutionProposedAction = "UPDATE_KEYWORDS";
```

**설계 정책:**
- 초기 단계에서는 `"UPDATE_KEYWORDS"` 단일 액션만 허용합니다.
- 그 외의 액션은 별도 설계가 추가되기 전까지는 지원되지 않음(unsupported)으로 처리합니다.
- 만약 `proposedAction`이 알 수 없는 값(`unknown`)이거나 지원되지 않는 값일 경우 `ExecutionPlan` 생성을 즉시 실패 처리합니다.

## 5. FinalApprovalExecutionPlan 구조 제안

본 구조는 전체 실행 계획을 통제하는 마스터 구조체입니다.

```ts
type FinalApprovalExecutionPlan = {
  jobId: string;
  finalApprovalId: string;
  finalApprovalVersion: number;
  adapterMode: FinalApprovalExecutionAdapterMode;
  payloadHash: string;
  validationSnapshotHash: string;
  validationExpiresAt: string;
  generatedAt: string;
  itemCount: number;
  items: FinalApprovalExecutionPlanItem[];
  summary: FinalApprovalExecutionPlanSummary;
  validation: FinalApprovalExecutionPlanValidation;
};
```

**필드 설명:**
- `jobId`: 대상이 되는 `NaverApiBatchJob.id`
- `finalApprovalId`: 대상이 되는 `NaverApiBatchFinalApproval.id`
- `finalApprovalVersion`: 대상 FinalApproval의 버저닝 정보
- `adapterMode`: `"DRY_RUN"` 또는 `"LIVE"`
- `payloadHash`: 실행 직전, 현재 상태를 기반으로 재계산하여 기존 값과 일치함이 확인된 안전한 해시
- `validationSnapshotHash`: 실행 직전 재검증된 스냅샷의 해시
- `validationExpiresAt`: FinalApproval artifact가 유효한 만료 시각
- `generatedAt`: 이 `ExecutionPlan` 객체가 생성된 정확한 시각
- `itemCount`: 하위 `items` 배열의 길이(`items.length`)와 반드시 일치해야 하는 개수
- `items`: 각 item별 실행 후보 정보 배열
- `summary`: Job 단위의 통계 및 요약 정보
- `validation`: `ExecutionPlan` 생성 시점에서 수행된 검증 결과 정보

## 6. FinalApprovalExecutionPlanItem 구조 제안

```ts
type FinalApprovalExecutionPlanItem = {
  jobItemId: string;
  finalApprovalItemId: string;
  productId: string | null;
  storeId: string | null;
  skuId: string | null;
  proposedAction: FinalApprovalExecutionProposedAction;
  candidateSummary: unknown;
  dryRunSummary: unknown;
  beforeSummary: unknown;
  afterSummary: unknown;
  naverApiPayloadCandidate: unknown;
};
```

**설계 정책:**
- `jobItemId`와 `finalApprovalItemId`는 필수 데이터입니다.
- `productId`, `storeId`, `skuId` 중 실제 네이버 API 반영에 필요한 최소한의 식별자가 하나라도 누락되면 해당 item은 실패 처리됩니다.
- `candidateSummary`와 `dryRunSummary`는 Payload 변환 판단의 근거 자료로 반드시 보존되어야 합니다.
- `beforeSummary`와 `afterSummary`는 향후 건별 dry-run 결과 대조 및 UI 노출용으로 활용됩니다.
- `naverApiPayloadCandidate`는 실제 네이버 API request body 스펙이 완전히 확정되기 전, 내부 변환 후보를 임시로 담아두는 필드입니다. (공식 API 필드 매핑 및 스펙 확정은 LIVE adapter 설계 단계에서 이루어집니다.)

## 7. summary 구조 제안

```ts
type FinalApprovalExecutionPlanSummary = {
  totalItems: number;
  transformableItems: number;
  blockedItems: number;
  proposedActionCounts: Record<string, number>;
  affectedProductCount: number;
  hasBlockingFailure: boolean;
};
```

**설계 정책:**
- `totalItems` 값은 앞선 `items.length`와 정확히 일치해야 합니다.
- `transformableItems`는 실제 실행 가능한 payload로 문제없이 변환된 item의 개수를 뜻합니다.
- `blockedItems`는 필수 조건 누락, 해시 오류 등으로 변환이 차단된 item의 개수입니다.
- `hasBlockingFailure` 필드 값이 `true`일 경우, 어떠한 adapter(`DRY_RUN` 포함) 호출도 사전에 금지되어야 합니다.

## 8. validation 구조 제안

```ts
type FinalApprovalExecutionPlanValidation = {
  jobStatusValid: boolean;
  itemStatusesValid: boolean;
  activeFinalApprovalValid: boolean;
  validationNotExpired: boolean;
  payloadHashMatched: boolean;
  validationSnapshotHashMatched: boolean;
  itemOwnershipValid: boolean;
  itemCountMatched: boolean;
  generatedFromServerStateAt: string;
};
```

**설계 정책:**
- 위에서 정의된 모든 필수 검증 boolean 항목들이 전부 `true`가 아닐 경우, `ExecutionPlan` 객체의 생성을 실패(중단) 처리합니다.
- 특히 `validationNotExpired`가 `false`(만료됨)라면 즉각 실패로 간주합니다.
- `payloadHashMatched`가 `false`(불일치)라면 변조되거나 문맥이 어긋났으므로 실패로 간주합니다.
- `itemOwnershipValid`가 `false`(Job-Item 종속성 오류)이면 실패로 간주합니다.

## 9. failure 구조 제안

단위 검증 실패에 대한 상세 내역을 담는 구조체입니다.

```ts
type FinalApprovalExecutionPlanFailure = {
  scope: "JOB" | "ITEM";
  jobId?: string;
  jobItemId?: string;
  finalApprovalId?: string;
  finalApprovalItemId?: string;
  reasonCode: string;
  message: string;
  blocking: boolean;
};
```

**발생 가능한 `reasonCode` 후보들:**
- `FINAL_APPROVAL_NOT_ACTIVE`
- `FINAL_APPROVAL_EXPIRED`
- `JOB_STATUS_NOT_APPROVED`
- `ITEM_STATUS_NOT_READY`
- `PAYLOAD_HASH_MISMATCH`
- `VALIDATION_SNAPSHOT_HASH_MISMATCH`
- `ITEM_OWNERSHIP_INVALID`
- `REQUEST_PAYLOAD_MISSING`
- `CANDIDATE_MISSING`
- `DRY_RUN_ITEM_MISSING`
- `REQUIRED_IDENTIFIER_MISSING`
- `UNSUPPORTED_ACTION`
- `NO_TRANSFORMABLE_CHANGE`

## 10. 생성 실패 정책

- `blocking` 플래그가 `true`로 설정된 실패 내역(`FinalApprovalExecutionPlanFailure`)이 단 하나라도 발생하면, `ExecutionPlan`의 생성을 전면 중단합니다.
- 초기 구현 단계에서는 특정 item 일부만의 실패를 허용하는 부분 실행을 배제하고, 안전성을 위해 "전체 중단(All-or-Nothing)"을 기본 원칙으로 합니다.
- 발생한 실패 내용은 Job 단위 또는 개별 Item 단위로 세밀하게 구조화하여 반환합니다.
- 반환되는 실패 메시지 내부에는 어떠한 시스템 secret, token, `DATABASE_URL` 같은 민감 정보도 포함되지 않도록 마스킹 처리해야 합니다.

## 11. DRY_RUN adapter와의 연결

본 설계된 `ExecutionPlan` 객체는 `DRY_RUN` adapter와 다음의 원칙으로 연동됩니다.

- `DRY_RUN` adapter의 유일한 입력(Input)은 이 문서에 정의된 `FinalApprovalExecutionPlan`입니다.
- 입력받은 plan의 `adapterMode`가 `"DRY_RUN"`이 아닐 경우, adapter는 실행을 즉각 거부해야 합니다.
- `summary.hasBlockingFailure` 플래그가 `true`일 경우, Worker는 adapter를 아예 호출하지 않고 자체 차단해야 합니다.
- `DRY_RUN` adapter는 전달받은 plan을 기반으로 시뮬레이션만 수행할 뿐, DB 내의 상태 전이를 일으키지 않습니다.
- `DRY_RUN` adapter는 실제 네이버 API 네트워크 호출을 절대 발생시키지 않습니다.

## 12. 보안/로그 정책

ExecutionPlan 생성 및 활용 과정에서 준수해야 할 로그/보안 지침입니다.

- `DATABASE_URL` 출력 및 로깅 절대 금지
- 네이버 API 연동 access token 출력 및 로깅 절대 금지
- 시스템 client secret / signature 출력 및 로깅 절대 금지
- `requestPayload`의 전체 원문(raw JSON)을 그대로 로그에 남기는 것을 지양
- `payloadHash` 및 `validationSnapshotHash`는 감사 로그에 기록 가능
- `candidateSummary` 및 `dryRunSummary`는 불필요한 민감정보를 사전에 제거(Filtering)한 후에만 기록
- `naverApiPayloadCandidate` 전체 원문 저장은 향후 안전성이 검증되는 `LIVE` adapter 도입 전까지 금지

## 13. 다음 구현 순서

본 `ExecutionPlan` 타입 설계가 확정된 이후, 다음의 구체적 순서대로 실제 코딩을 진행할 것을 제안합니다.

1. ExecutionPlan 타입 설계 문서(본 문서) 확정 및 리뷰
2. 실제 기능 구현을 위한 TypeScript 타입 파일(`.ts`) 추가
3. DB 데이터를 ExecutionPlan으로 바꾸는 payload transform 순수 함수(pure function) 구현
4. ExecutionPlan 생성에 대한 단위 테스트(unit test) 작성
5. `DRY_RUN` adapter 순수 함수(pure function) 구현
6. `DRY_RUN` adapter 단위 테스트 작성
7. Docker test DB를 활용한 통합 테스트(integration test) 환경 구성 및 작성
8. Worker 파이프라인의 `DRY_RUN` Worker 아키텍처 설계
9. `DRY_RUN` Worker 실제 구현
10. `LIVE` adapter는 앞선 모든 과정의 검증과 별도 승인 이후 제일 마지막 단계에서 설계 및 구현
