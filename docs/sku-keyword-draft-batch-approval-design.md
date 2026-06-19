# SKU Keyword Matching DRAFT Batch 승인 설계

본 문서는 `docs/sku-keyword-draft-batch-design.md` 이후 단계인 **DRAFT Batch 승인** 설계를 다룬다.

핵심 상태 전환은 아래와 같다.

- Job: `DRAFT -> APPROVED`
- Items: `DRAFT -> READY`

## 현재 구현 상태

- APPROVED 승인 API 구현 완료
- Job 상태 전환 구현 완료: `DRAFT -> APPROVED`
- Item 상태 전환 구현 완료: `DRAFT -> READY`
- 목록 화면에서 `DRAFT / APPROVED / 전체` 조회 필터 지원
- 목록 화면 필터는 `?status=DRAFT | APPROVED | ALL` URL query와 동기화되며, 잘못된 값은 UI에서 `DRAFT`로 fallback
- 목록 화면 상단에는 현재 필터 상태 설명과 Batch 수 / Item 수 요약이 함께 표시된다
- 위험 / blocked 요약은 저장된 `previewSummary.riskCount`, `previewSummary.blockedCount`를 읽기 전용으로 합산해 표시한다
- 각 Batch row도 동일한 `previewSummary.riskCount`, `previewSummary.blockedCount` 기준으로 위험 / 차단 badge를 표시한다
- 목록 정렬은 `?sort=default | blocked | risk` URL query와 동기화되며, `blocked`는 `previewSummary.blockedCount`, `risk`는 `previewSummary.riskCount` 내림차순을 사용한다
- 네이버 API 호출 없음
- 스마트스토어 가격/재고 변경 없음
- 실행(`EXECUTING`) 전환 미구현
- 실행 Worker / Scheduler 미구현

## 상태 정의 보정

현재 Prisma schema 기준으로 상태 enum은 아래와 같이 해석한다.

- `NaverApiBatchJobStatus`에는 `READY`가 없다.
- 따라서 Job의 승인 완료는 `APPROVED` 상태로 표현한다.
- `NaverApiBatchItemStatus`에는 `READY`가 있다.
- 따라서 각 item은 승인 후 실행 대기 상태인 `READY`로 전환한다.
- `APPROVAL_PENDING`은 향후 다중 승인 흐름에서 별도로 검토한다.

## 목적

사용자가 검토용으로 저장한 DRAFT Batch를 실제 실행 전 단계까지 안전하게 끌어올리되,
이번 단계에서는 **승인 상태 전환만** 수행한다.

즉, 승인 성공 시에도 아래는 수행하지 않는다.

- 네이버 API 호출
- 스마트스토어 가격/재고 실제 반영
- `EXECUTING` 전환
- 실행 Worker 처리

## 승인 가능 조건

아래 조건을 모두 만족해야 승인 가능하다.

1. `job.status === DRAFT`
2. `items.length > 0`
3. 모든 `item.status === DRAFT`
4. 모든 `requestPayload.candidate` 존재
5. 모든 `requestPayload.dryRunItem` 존재
6. 모든 `dryRunItem.executable === true`
7. 모든 `dryRunItem.blockedReasons`가 비어 있음
8. `CURRENT_PRICE_UNAVAILABLE` 없음
9. `CURRENT_STOCK_UNAVAILABLE` 없음
10. `candidate.status === NEEDS_CONTEXT` 없음
11. `dryRunItem.riskLevel === HIGH` 없음
12. `targetType`이 `SINGLE | OPTION | ADDITIONAL`
13. `targetId` 존재
14. 가격 또는 재고의 `before / after` 비교값 확인 가능
15. `confirmApproveOnly === true`

## Hard Blocker

아래 중 하나라도 있으면 전체 승인을 차단한다.

1. `job.status !== DRAFT`
2. item 0건
3. item 중 하나라도 `status !== DRAFT`
4. `requestPayload.candidate` 누락
5. `requestPayload.dryRunItem` 누락
6. `dryRunItem.executable !== true`
7. `dryRunItem.blockedReasons` 존재
8. `CURRENT_PRICE_UNAVAILABLE` 존재
9. `CURRENT_STOCK_UNAVAILABLE` 존재
10. `candidate.status === NEEDS_CONTEXT`
11. `dryRunItem.riskLevel === HIGH`
12. `targetType` 누락 또는 허용 범위 밖
13. `targetId` 누락
14. `before / after` 변경값 누락
15. `confirmApproveOnly !== true`
16. `optionValue fallback`이 명확한 후보

## Warning

아래는 hard blocker는 아니지만 승인 전에 확인해야 한다.

1. `CHANNEL_ID_UNAVAILABLE`
2. `UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW`
3. `CURRENT_CONTEXT_STALE`

`CHANNEL_ID_UNAVAILABLE`은 정보성 warning이며, 이 값만으로 승인을 차단하지 않는다.

## 서버 재검증

승인 API는 클라이언트 표시값을 그대로 신뢰하지 않고, 저장된 Job/Items를 다시 조회해 검증한다.

검증 순서:

1. `jobId`로 Job + Items 재조회
2. 각 item의 `requestPayload.candidate`, `requestPayload.dryRunItem` 확인
3. `executable`, `blockedReasons`, `riskLevel`, `targetType`, `targetId` 확인
4. `before / after` 비교값 확인
5. hard blocker 1개라도 있으면 전체 승인 차단
6. warning은 응답에 포함하여 UI가 사용자에게 재고지
7. 모든 검증 통과 시에만 상태 전환 수행

## 승인 API

- 경로: `POST /api/sku-matching/draft-batch/[jobId]/approve`

요청 예시:

```ts
type ApproveRequest = {
  confirmApproveOnly: true;
  acknowledgedWarnings?: string[];
};
```

성공 응답 예시:

```ts
type ApproveResponse = {
  ok: true;
  jobId: string;
  previousJobStatus: 'DRAFT';
  nextJobStatus: 'APPROVED';
  nextItemStatus: 'READY';
  itemCount: number;
  warnings: string[];
  blockedReasons: [];
  blockedItems: [];
};
```

차단 응답 예시:

```ts
type ApproveBlockedResponse = {
  ok: false;
  jobId: string;
  previousJobStatus: string | null;
  nextJobStatus: null;
  nextItemStatus: null;
  itemCount: number;
  warnings: string[];
  blockedReasons: string[];
  blockedItems: Array<{
    itemId: string;
    targetType?: string;
    targetId?: string;
    reasons: string[];
  }>;
};
```

## 상태 변경 범위

검증 통과 시 Prisma transaction 안에서 아래만 변경한다.

- `NaverApiBatchJob.status = APPROVED`
- `NaverApiBatchJobItem.status = READY`

주의:

- 일부 item만 `READY`로 바꾸지 않는다.
- 하나라도 blocker가 있으면 전체 승인 차단
- `requestPayload`, `previewBefore`, `previewAfter` 수정 없음
- `targetType`, `targetId` 보정 없음
- `approvedAt`, `executedAt` 등 다른 필드 갱신 없음

이 문서에서 `APPROVED`와 Item `READY`는 **검토 승인 완료**를 뜻한다. 현재 승인 API는 `dryRun=true`, `approvedAt=null`, `approvedBy=null`을 유지하므로 이것만으로 실제 실행 자격이 생기지 않는다. 승인 메타데이터와 최종 실행 자격 선택지는 [SKU Keyword Matching Batch 실행 Worker 설계](./sku-keyword-batch-execution-worker-design.md)의 관련 섹션에서 비교한다.

## 후속 단계

실행 단계의 상태 흐름, 실행 자격, payload 변환, 재검증, idempotency, 실패 및 재시도 정책은 [SKU Keyword Matching Batch 실행 Worker 설계](./sku-keyword-batch-execution-worker-design.md)를 따른다.

이번 단계 이후에도 아직 미구현인 항목:

- `APPROVED`는 승인 완료 상태이지만 실행 완료 상태가 아님
- `APPROVED` 상태에서도 네이버 API 호출은 없음
- 목록의 `riskFilter=all | blocked | risk | clean` URL query로 저장된 `previewSummary.blockedCount`, `previewSummary.riskCount` 기준 서브필터를 지원한다.
- 서브필터는 목록 API 결과에 클라이언트에서 적용하며, 적용 후 `sort=default | blocked | risk` 기준으로 정렬한다.
- `APPROVED -> EXECUTING` 실행 API
- 실행 Worker / Scheduler
- 네이버 API dry-run 이후 실제 LIVE 실행
- 부분 성공/재시도/실패 복구 흐름

즉, 이번 단계의 승인 기능은 **검토 승인 완료 상태를 명시하는 절차**일 뿐이며,
실제 외부 반영 단계는 별도 Worker / Execution 설계 이후에만 진행한다.
