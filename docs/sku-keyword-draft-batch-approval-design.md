# SKU Keyword Matching DRAFT Batch 승인 설계

본 문서는 `docs/sku-keyword-draft-batch-design.md` 이후 단계인 **DRAFT → READY 승인 설계**를 다룬다.

## 목적
DRAFT 상태의 Batch를 실제 실행 전 `READY` 상태로 승인하기 위한 안전 기준을 정의한다.
사용자가 검토용으로 저장된 DRAFT 데이터를 최종 확인하고, 네이버 API에 반영 가능한 대기 상태(READY)로 안전하게 전환하는 것이 목표이다.

## 현재 단계
조회 화면까지 완료.
이번 문서는 승인 설계만 다룬다.
실제 DB update(상태 변경), 네이버 API 호출, Batch 워커 구현은 아직 진행하지 않는다.

---

## 승인 가능 조건
DRAFT Batch를 READY로 승인하려면 아래 조건을 모두 만족해야 한다.

1. `job.status === DRAFT` 이어야 한다.
2. `job.items.length > 0` (항목이 1개 이상 존재해야 한다).
3. 모든 `item.status === DRAFT` 이어야 한다.
4. 모든 item의 `requestPayload.candidate` 가 존재해야 한다.
5. 모든 item의 `requestPayload.dryRunItem` 이 존재해야 한다.
6. 모든 `dryRunItem.executable === true` 이어야 한다.
7. 모든 `dryRunItem.blockedReasons` 가 비어 있어야 한다.
8. `CURRENT_PRICE_UNAVAILABLE` 경고가 없어야 한다.
9. `CURRENT_STOCK_UNAVAILABLE` 경고가 없어야 한다.
10. `needsContext` 인 후보가 없어야 한다.
11. `riskLevel` 이 `HIGH` 인 후보가 없어야 한다.
12. `targetType`이 `SINGLE`, `OPTION`, `ADDITIONAL` 중 하나로 확인 가능해야 한다.
13. `targetId` 가 존재해야 한다.
14. 가격 또는 재고의 `before`/`after` 변경값을 확실하게 비교/확인할 수 있어야 한다.
15. 사용자가 최종 확인 체크박스를 명시적으로 선택해야 한다.

---

## 승인 차단 조건 (Hard Blockers)
아래 조건 중 하나라도 해당되면 READY 상태로의 승인을 **강제 차단**한다.

1. `job.status` 가 `DRAFT`가 아님 (이미 승인되었거나 취소/실행 중인 상태).
2. item이 0건임 (처리할 데이터가 없음).
3. item 중 하나라도 `status`가 `DRAFT`가 아님.
4. `requestPayload.candidate` 누락.
5. `requestPayload.dryRunItem` 누락.
6. `dryRunItem.executable !== true`.
7. `blockedReasons` 배열에 값이 1개라도 존재.
8. `CURRENT_PRICE_UNAVAILABLE` (현재 가격 정보를 알 수 없음).
9. `CURRENT_STOCK_UNAVAILABLE` (현재 재고 정보를 알 수 없음).
10. `needsContext === true` (판단을 위한 문맥 정보 부족).
11. `riskLevel === HIGH` (재무적/운영적 고위험 후보).
12. `targetType` 누락.
13. `targetId` 누락.
14. `before`/`after` 값이 누락되어 변경 내역을 증명할 수 없음.
15. 이미 `READY` / `EXECUTING` / `SUCCESS` / `FAILED` 상태인 job에 대한 승인 시도.

---

## Warning 조건 (승인 가능하지만 경고 표시 필요)
차단 조건은 아니지만, 승인 전 사용자에게 명확히 고지해야 하는 상황이다.

1. **`CHANNEL_ID_UNAVAILABLE`**: 채널 정보가 누락되었으나, 스마트스토어 식별이 가능하면 진행 가능.
2. **`UPLOAD_OPTION_CURRENT_CONTEXT_PREVIEW` 사용**: 사용자가 업로드한 엑셀(문맥 파일) 기반으로 계산됨. 실제 스마트스토어 현재 값과 엑셀 값이 다를 가능성이 있으므로 **stale warning**을 반드시 표시해야 함.
3. **`CURRENT_CONTEXT_STALE`**: 조회한 시점과 엑셀/데이터 시점 간의 차이 발생 가능성.
4. **`optionValue fallback`**: 정확한 매칭이 아닌 Fallback 조건으로 매칭된 경우. 승인 불가로 처리하거나, 별도의 수동 확인 체크를 거치도록 분류해야 함.
5. **오래된 DRAFT job**: 생성된 지 일정 시간(예: 24시간)이 지나 스토어의 현재 상태와 달라졌을 위험이 있는 경우.
6. **item 수가 비정상적으로 많음**: 한 번의 Batch로 너무 많은 데이터가 변경되는 경우.

---

## READY 승인 전 서버 재검증
READY 전환 API 요청 시, 클라이언트에서 보내는 값을 그대로 신뢰하지 않고 서버에서 저장된 데이터를 기준으로 다시 한 번 검증한다.

1. `jobId`로 `DRAFT` job을 조회한다.
2. 연관된 `items`를 포함하여 전체 항목을 가져온다.
3. 저장된 `requestPayload.candidate` / `dryRunItem` 구조가 온전한지 파싱하여 확인한다.
4. 각 item의 `executable`, `blockedReasons`, `riskLevel`을 재확인한다.
5. `targetType` / `targetId`를 확인한다.
6. `before`/`after` 값이 유효한지 확인한다.
7. **Hard Blocker가 1개라도 있으면 READY 전환을 즉시 금지**하고 예외 응답을 반환한다.
8. Warning이 있는 경우 승인 화면 UI에 표시하여 사용자가 미리 인지하도록 한다.
9. 클라이언트 요청 Payload에 `confirmReadyOnly === true` 플래그가 필수로 포함되어야 한다.
10. 모든 검증을 통과한 경우에만 Job과 Items의 `status`를 `READY`로 안전하게 업데이트한다.

---

## 향후 API 설계 초안

`POST /api/sku-matching/draft-batch/[jobId]/approve-ready`

**요청 (Request):**
```ts
type ApproveReadyRequest = {
  confirmReadyOnly: true;
  acknowledgedWarnings: string[];
};
```

**정상 응답 (Response):**
```ts
type ApproveReadyResponse = {
  ok: boolean;
  jobId: string;
  previousStatus: "DRAFT";
  nextStatus: "READY";
  itemCount: number;
  warnings: string[];
  blockedReasons: string[];
};
```

**차단 응답 (Blocked Response):**
```ts
type ApproveReadyBlockedResponse = {
  ok: false;
  jobId: string;
  status: "DRAFT";
  itemCount: number;
  blockedReasons: string[];
  blockedItems: Array<{
    itemId: string;
    targetType?: string;
    targetId?: string;
    reasons: string[];
  }>;
};
```

---

## 향후 UI 설계 초안

- **위치:** `/dashboard/sku-keyword-draft-batches/[jobId]` (현재 DRAFT 상세 화면의 하단 또는 우측 패널)

- **버튼명 후보:**
  - `READY 승인 준비`
  - `READY 상태로 승인`
  - `검토 완료 후 READY 승인`

- **피해야 할 버튼명 (사용 금지):**
  - `실행`, `적용`, `네이버 반영`, `가격 변경`, `재고 변경`, `Batch 실행` 등 실제 처리가 즉각 발생할 것으로 오인되는 단어.

- **승인 전 확인 모달 문구:**
  > "이 작업은 Batch를 READY 상태로만 변경합니다. 아직 네이버 API 호출이나 스마트스토어 가격/재고 변경은 수행하지 않습니다. 실제 실행은 별도 단계에서만 가능합니다."

- **승인 모달 표시 항목:**
  - Job ID
  - 현재 Status (DRAFT)
  - 전환 예정 Status (READY)
  - 전체 Item Count
  - `targetType`별 수량 (SINGLE / OPTION / ADDITIONAL)
  - 가격 변경 수량 / 재고 변경 수량 요약
  - Warning 목록 전체
  - Stale warning (엑셀 업로드 문맥 기반인 경우)
  - Upload context 사용 여부
  - `HIGH` risk 항목 없음 최종 확인 알림
  - 네이버 API 호출 및 가격/재고 즉시 변경이 없다는 재안내

- **필수 체크박스:**
  - [ ] 이 작업은 READY 상태 전환만 수행하며, 네이버 API 호출이 없음을 확인했습니다.

---

## 상태 흐름
이후 구현될 전체 Batch 작업의 생명주기는 다음과 같다.

```text
DRAFT
  ↓ 사용자가 검토 후 승인
READY
  ↓ 별도 실행 워커(Worker)가 처리 대상 선택
EXECUTING
  ↓ 성공
SUCCESS

EXECUTING
  ↓ 실패
FAILED

READY
  ↓ 사용자가 취소
CANCELLED (또는 DRAFT로 되돌림)
```

---

## 절대 금지
- 네이버 API 호출, `LIVE adapter` 사용, 실제 가격/재고 변경은 이 READY 승인 단계에서 절대 수행하지 않는다.
- 본 문서는 오직 "실행 대기(READY) 큐로 안전하게 이동" 시키기 위한 방어벽 설계이다.
