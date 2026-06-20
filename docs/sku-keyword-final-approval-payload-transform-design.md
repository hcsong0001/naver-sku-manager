# FinalApproval Payload 변환 규칙 설계 문서

## 1. 문서 목적
- FinalApproval artifact에서 실제 실행 후보(payload)를 생성하는 규칙을 정의합니다.
- Worker 로직을 구현하기에 앞서 payload 변환 기준을 사전에 고정합니다.
- 실제 네이버 API 호출용 body 스키마를 당장 확정하는 것이 아니라, 내부 시스템의 변환 규칙 설계를 목적으로 합니다.
- 향후 `LIVE` adapter 구현 전에 `DRY_RUN` adapter에서 먼저 검증해야 할 기준을 제공합니다.

## 2. 입력 데이터
변환 프로세스에서 활용할 입력 데이터는 다음과 같습니다.

- `NaverApiBatchFinalApproval`
- `NaverApiBatchFinalApprovalItem`
- 연결된 `NaverApiBatchJob`
- 연결된 `NaverApiBatchJobItem`
- `JobItem.requestPayload.candidate`
- `JobItem.requestPayload.dryRunItem`
- `FinalApproval.payloadHash`
- `FinalApproval.validationSnapshotHash`
- `FinalApproval.validationExpiresAt`

> **주의:**
> - FinalApproval에 저장된 `payloadHash`를 맹목적으로 신뢰해서는 안 되며, 변환 실행 직전 현재 상태를 기준으로 반드시 재계산하여 대조해야 합니다.
> - `requestPayload`가 없거나 내부의 `candidate`, `dryRunItem`이 누락되어 있다면 즉각 변환 실패로 간주합니다.

## 3. 변환 전 필수 검증
안전한 변환을 보장하기 위해 아래 조건들을 모두 통과해야 합니다.

- Job status가 `APPROVED`인지 확인
- JobItem status가 `READY`인지 확인
- 대상 FinalApproval의 상태가 `ACTIVE`인지 확인
- `validationExpiresAt`이 현재 시각보다 미래인지 확인
- FinalApprovalItem과 JobItem 간의 연결 관계가 유효한지 확인
- 해당 Job에 속하지 않은 타 Job의 JobItem이 섞여 있지 않은지 확인
- `requestPayload.candidate` 존재 여부 확인
- `requestPayload.dryRunItem` 존재 여부 확인
- 현재 컨텍스트 기반으로 `payloadHash`를 재계산한 뒤, 기존 `FinalApproval.payloadHash`와의 일치 여부 확인
- `validationSnapshotHash`의 재검증 가능 여부 확인

## 4. Canonical hash 재계산 규칙
`payloadHash` 재계산은 다음과 같은 엄격한 룰을 따릅니다.

- Canonical JSON hash는 기존 `src/utils/canonical-json-hash.ts` 구현 규칙을 준수합니다.
- 도메인 분리(domain separation) 문자열을 변경 없이 그대로 유지합니다.
- 객체의 key 선언 순서에 영향받지 않도록 정렬(sorting)을 보장합니다.
- `Date`, `Decimal`, `BigInt` 등의 특수 타입에 대한 projection 기준을 기존 구현과 정확히 맞춥니다.
- `undefined`, 비정상적인 숫자(NaN, Infinity 등), sparse array(희소 배열)가 검출되면 해시 생성을 거부(거절)합니다.
- 재계산된 해시가 기존과 불일치할 경우, 어떠한 실행 payload 생성도 금지합니다.

## 5. 변환 단위
변환의 처리 단위는 다음과 같은 원칙을 따릅니다.

- 변환 작업은 `FinalApprovalItem` 단위로 개별 수행됩니다.
- 각 `FinalApprovalItem`은 정확히 하나의 `JobItem`과 연결됩니다.
- 각 `JobItem`은 네이버 API 반영을 위한 하나의 독립적 후보 작업 단위가 됩니다.
- 변환 수행 후, 전체 Job 단위의 summary 데이터와 개별 Item 단위의 payload가 모두 생성되어야 합니다.

## 6. 내부 실행 payload 구조 제안
*(본 구조는 설계 목적의 예시이며, 실제 TypeScript 파일 생성이나 네이버 API 스펙의 확정을 의미하지 않습니다.)*

```ts
type FinalApprovalExecutionPlan = {
  jobId: string;
  finalApprovalId: string;
  finalApprovalVersion: number;
  payloadHash: string;
  validationSnapshotHash: string;
  adapterMode: "DRY_RUN" | "LIVE";
  itemCount: number;
  items: FinalApprovalExecutionPlanItem[];
};

type FinalApprovalExecutionPlanItem = {
  jobItemId: string;
  finalApprovalItemId: string;
  productId: string | null;
  storeId: string | null;
  skuId: string | null;
  candidateSummary: unknown;
  dryRunSummary: unknown;
  proposedAction: "UPDATE_KEYWORDS";
  naverApiPayloadCandidate: unknown;
};
```

## 7. Keyword Update 변환 규칙
SKU keyword matching 흐름에 맞추어 키워드/상품 정보를 업데이트하는 변환 규칙입니다.

- `candidate`에서 최종적으로 반영할 키워드 및 변경 후보 데이터를 읽어옵니다.
- `dryRunItem`에서 서버 로직을 통해 사전 검증된 결과(안전성 검토 내용)를 읽어옵니다.
- 기존의 상품명, 키워드, 태그, 검색어 관련 필드를 대조하여 어떤 항목을 변경 대상으로 삼을지 구체적으로 구분합니다.
- 변경 전(Before) 값과 변경 후(After) 후보 값을 비교 가능한 summary 형태로 남깁니다.
- 실제 API payload 후보(`naverApiPayloadCandidate`)에는 최소한 대상 `product` 및 `store` 식별자와 변경 대상 필드가 반드시 포함되어야 합니다.
- 위 필수 식별자가 하나라도 누락될 경우 즉각 변환 실패 처리합니다.

*(주의: 네이버 공식 API 스펙(필드명 등)은 별도의 adapter 설계 단계에서 확정되므로, 여기서는 추측하여 매핑하지 않습니다.)*

## 8. dry-run summary 출력 규칙
실행 파이프라인의 `DRY_RUN` adapter 단계에서 남겨야 할 summary 구조입니다.

- 전체 item count
- 변환 성공 item count
- 변환 실패 item count
- 변경 예정 상품 수
- 변경 예정 필드 요약 (어떤 필드가 바뀌는지)
- `payloadHash` 대조 결과
- `validationSnapshotHash` 대조 결과
- `validationExpiresAt` 검증 결과
- 현재 `adapterMode` (DRY_RUN)
- 실패한 item이 있다면, item별 구체적 사유 명시

## 9. 변환 실패 처리
변환 중 아래와 같은 치명적 오류가 발견될 경우에 대한 처리 정책입니다.

**실패 유형:**
- FinalApproval 만료 (시간 초과)
- 상태가 `ACTIVE`가 아님
- Job/Item 상태 불일치 (APPROVED/READY 아님)
- `requestPayload`, `candidate`, `dryRunItem` 중 하나라도 누락
- `payloadHash` 불일치
- `validationSnapshotHash` 불일치 또는 재검증 불가
- 필수 식별자 누락 (storeId, productId 등)
- 변환 가능한 유효 변경 후보가 전혀 존재하지 않음

**원칙:**
- 위와 같은 치명적 검증 실패가 하나라도 발생하면 해당 Job의 전체 실행 계획 생성을 전면 금지합니다.
- (Item 일부 실패를 허용할지에 대한 여부는 추후 별도의 Worker 정책 설계 시 결정하지만) 최소한 최초 `DRY_RUN` 단계에서는 **보수적으로 전체 중단을 기본값(Default)**으로 설정합니다.

## 10. 로그 및 보안 규칙
변환 및 실행 로그 저장에 있어 반드시 준수해야 할 보안 원칙입니다.

- `DATABASE_URL` 기록 및 노출을 절대 금지합니다.
- 네이버 access token 기록 및 노출을 절대 금지합니다.
- 시스템 secret, client secret, signature 값 등의 기록을 절대 금지합니다.
- API response의 전체 원문(raw data) 저장은 금지하며, 디버깅이 필요한 경우 철저한 마스킹 처리가 별도로 요구됩니다.
- `payloadHash`와 `validationSnapshotHash` 값은 검증 목적의 로그로 기록이 허용됩니다.
- `candidate` 및 `dryRunItem` 전체 원문 저장은 용량 및 민감도 문제가 있을 수 있으므로 매우 신중히 검토 후 제한적으로 수행해야 합니다.

## 11. 다음 단계 구현 순서
본 규칙이 확정된 후, 아래의 순서에 따라 단계적으로 개발을 진행할 것을 제안합니다.

1. payload 변환 규칙 문서 확정 (현재 단계)
2. `DRY_RUN` adapter 설계 문서 작성
3. `execution plan` 타입 초안 작성
4. payload 변환 pure function 구현 (부작용 없는 순수 함수)
5. Docker test DB 기반 변환 로직 unit/integration test 작성
6. `DRY_RUN` Worker 구현
7. UI 실행 버튼은 disabled/read-only 상태로 먼저 표시 (기능 연동 확인용)
8. `LIVE` 네이버 API adapter는 별도 승인 후 마지막 단계에서 최종 구현
