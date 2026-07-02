# Task 409 - Naver API 상품 조회 1회 실제 호출

## 목적

Naver Commerce API 인증 정보를 사용하여 대표 검증 상품 후보 6597910207에 대해 상품 조회
API를 실제로 1회 호출하고, 성공/실패 여부를 raw response 없이 마스킹/요약 증적으로 남긴다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 339a265e4c5f549cee70104b343770453a7d72ed` (Task 408 커밋)
- 워킹 트리: clean

## 사용자의 별도 승인 문구 확인

사용자가 아래 문구를 명시적으로 승인했습니다.

> `Naver API 상품 조회 1회 Live Test 실행을 별도로 승인합니다.`

이 문구는 harness(`runTmsNaverProductLookupOneTimeLiveCall`) 내부에서 정확히 일치하는 경우에만
실제 호출을 진행하도록 강제됩니다. 문구가 다르면 API를 호출하지 않고 blocked 결과를 반환합니다.

## Task 408 Final Safety Gate 기준 상태

- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- 대표 상품 후보: `6597910207`
- 최대 조회 호출 수: `1`
- 상품 수정/가격 변경/재고 변경/DB write 허용 여부: 모두 `false`
- raw response 표시/저장 허용 여부: 모두 `false`

## 입력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeFinalSafetyGateView` (Task 408)

## 출력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeActualLiveCallView`

## Task 408 → Task 409 상태 매핑

- `..._FINAL_SAFETY_GATE_READY` → `..._ACTUAL_LIVE_CALL_READY`
- `..._FINAL_SAFETY_GATE_PARTIAL_READY` → `..._ACTUAL_LIVE_CALL_BLOCKED`
- `..._FINAL_SAFETY_GATE_BLOCKED` → `..._ACTUAL_LIVE_CALL_BLOCKED`
- `..._FINAL_SAFETY_GATE_NOT_STARTED` → `..._ACTUAL_LIVE_CALL_NOT_STARTED`

harness 실행 결과가 존재하면 상태가 다음으로 재정의됩니다.

- 조회 성공 → `TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_SUCCESS`
- 조회 실패 → `TMS_FAST_CONNECTION_NAVER_PRODUCT_LOOKUP_ONE_TIME_ACTUAL_LIVE_CALL_EXECUTED_FAILED`

## 8개 Actual Live Call 그룹

1. `ACTUAL_LIVE_CALL_APPROVAL_CONFIRMATION` - 사용자의 별도 승인 문구가 확인되었음을 표시
2. `TASK_408_FINAL_SAFETY_GATE_REFERENCE` - Task 408 Final Safety Gate 결과를 참조
3. `ONE_TIME_LOOKUP_EXECUTION_SCOPE` - 상품번호 6597910207에 대한 상품 조회 1회만 허용
4. `ENV_SECRET_TOKEN_USE_BOUNDARY` - env/secret/token은 호출 목적에만 사용하고 출력하지 않음
5. `LIVE_CALL_EXECUTION_RESULT_SUMMARY` - 실제 호출 성공/실패 요약
6. `RAW_RESPONSE_MASKING_AND_NON_STORAGE_GUARD` - raw response 전체 표시/저장 금지, 마스킹/요약만 허용
7. `PRODUCT_UPDATE_PRICE_STOCK_DB_WRITE_BLOCK` - 상품 수정/가격/재고/DB write 금지
8. `NEXT_EVIDENCE_SCREEN_ROADMAP` - Task 410 결과 증적 화면으로 이동

## one-time live call harness

- 파일: `src/services/tms-naver-product-lookup-one-time-live-call.harness.ts`
- 함수: `runTmsNaverProductLookupOneTimeLiveCall`
- 승인 문구 정확 일치 확인 (불일치 시 blocked, API 미호출)
- `targetProductNo`는 `6597910207`로 고정 확인 (불일치 시 blocked, API 미호출)
- `maxLookupCallCount`는 정확히 `1`이어야 함 (초과 시 blocked, API 미호출)
- 인증은 프로젝트 기존 Naver Commerce API 방식(client_id + timestamp를 clientSecret으로 bcrypt 해시 후 base64 서명)을 재사용
- 환경 변수를 통해 `공구이야기직영` 스토어의 클라이언트 자격 증명을 로딩 (DB/Prisma 접근 없음)
- raw response는 절대 반환하지 않고, 최상위 key 이름(`responseShapeKeys`)과 상품번호 일치 여부만 반환
- secret/token/Authorization header/signature 값은 절대 반환하지 않음
- 상품 수정 API, DB write 함수는 harness 내에 존재하지 않음

## masked summary 형식

```text
{
  liveCallAttempted: boolean,
  actualLookupCallCount: number,
  targetProductNo: string,
  targetApi: "NAVER_COMMERCE_PRODUCT_LOOKUP_API",
  success: boolean,
  httpStatusCode: number | null,
  productNoMatched: boolean | null,
  responseShapeKeys: string[],
  rawResponseStored: false,
  rawResponseDisplayed: false,
  secretExposed: false,
  tokenExposed: false,
  authorizationHeaderExposed: false,
  productUpdateCalled: false,
  priceChanged: false,
  stockChanged: false,
  dbWritten: false,
  sanitizedErrorMessage: string | null
}
```

## 실제 호출 실행 기록

- 실행 시각: 2026-07-02 (사무실 PC 로컬 시각 기준)
- 대상 상품번호: 6597910207
- 최대 호출 수: 1
- 실제 호출 수: 1
- HTTP status: 200
- 성공 여부: true
- productNoMatched: null (응답의 `smartstoreChannelProduct.channelProductNo` 필드가 예상 위치에 없어 매칭 로직이 판정하지 못함 — 조회 자체는 200 OK로 성공)
- responseShapeKeys: `["originProduct", "smartstoreChannelProduct"]`
- raw response displayed: false
- raw response stored: false
- secret/token/header exposed: false
- product update called: false
- price changed: false
- stock changed: false
- db written: false
- sanitizedErrorMessage: null

## 안전 금지선 확인

- 상품 조회 API 호출은 최대 1회만 수행됨
- 상품 수정 API 호출 없음
- 가격 변경 없음
- 재고 변경 없음
- DB write 없음
- raw API response 전체 표시 없음
- raw API response 전체 저장 없음
- secret/token/header/signature 노출 없음
- Worker 실행 없음
- Queue enqueue 없음
- Runtime 운영 전환 없음
- POST API 추가 없음
- 실행 버튼/승인 버튼/submit action 추가 없음

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 408 ViewModel을 입력으로 Task 409 Actual Live Call ViewModel 생성 (GET 요청 처리 중 실제 API 호출 없음)
  - GET 응답에 `tmsFastConnectionNaverProductLookupOneTimeActualLiveCallView` 추가
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 409 타입 필드 추가
  - Task 408 바로 아래, Task 332 바로 위에 Task 409 패널 추가
  - 상태, 승인 문구 확인, 실행 결과(성공/실패/미실행), httpStatusCode, productNoMatched, responseShapeKeys, 8개 그룹 요약, Task 410~411 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음
  - page.tsx는 ViewModel 표시만 담당하며 실제 API를 호출하지 않음

## 검증 결과

- Task 409 ViewModel 테스트 17건 통과
- Task 409 harness 테스트 11건 통과 (mock client 사용, 실제 API 호출 없음)
- 인접 Task 408 / 407 / 406 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`
- 실제 1회 호출은 위 mock 검증 및 build 통과 후 harness 명령으로 1회만 실행

## 다음 Task 410 방향

- `Task 410 - Naver API 상품 조회 1회 결과 증적 화면`
