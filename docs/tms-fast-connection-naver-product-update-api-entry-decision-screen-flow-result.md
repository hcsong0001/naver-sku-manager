# Task 411 - 상품 수정 API 진입 여부 판단 화면

## 목적

Task 409/410의 상품 조회 1회 성공 증적을 바탕으로, 상품 수정 API로 바로 진입해도 되는지
판단한다. 현재는 productNoMatched가 null이므로 상품 수정 API 진입을 보류해야 한다는
read-only 판단 화면을 추가한다.

이번 Task에서는 상품 수정 API를 호출하지 않는다.

## 사무실 PC 작업 기준

- 작업 경로: `C:\Users\CORSAIR\Documents\naver-sku-manager`
- 시작 기준: `HEAD = origin/main = 60a5a3dbe8d6d87c07914bede91084feca4e3c6e` (Task 410 커밋)
- 워킹 트리: clean

## Task 410 결과 증적 기준 상태

- Task 409 실제 호출 실행 여부: 예 / 실제 호출 수: 1
- 대상 API: `NAVER_COMMERCE_PRODUCT_LOOKUP_API` / 대상 상품번호: `6597910207` (공구이야기직영)
- HTTP status: 200 / 성공 여부: true
- responseShapeKeys: `["originProduct", "smartstoreChannelProduct"]`
- productNoMatched: null
- Task 410 API 재호출/env/secret/token 접근: 없음
- raw response 표시/저장: 없음 / 상품 수정/가격/재고/DB write: 없음

## 입력 ViewModel

- `TmsFastConnectionNaverProductLookupOneTimeResultEvidenceView` (Task 410)

## 출력 ViewModel

- `TmsFastConnectionNaverProductUpdateApiEntryDecisionView`

## Task 410 → Task 411 상태 매핑

- `..._RESULT_EVIDENCE_SUCCESS_CONFIRMED` + `productNoMatched === true` → `..._ALLOWED_FOR_FUTURE_REVIEW`
- `..._RESULT_EVIDENCE_SUCCESS_CONFIRMED` + `productNoMatched` null/false → `..._DEFERRED_PENDING_PRODUCT_IDENTITY`
- `..._RESULT_EVIDENCE_FAILED_CONFIRMED` → `..._BLOCKED`
- `..._RESULT_EVIDENCE_READY` → `..._READY`
- `..._RESULT_EVIDENCE_BLOCKED` → `..._BLOCKED`
- `..._RESULT_EVIDENCE_NOT_STARTED` → `..._NOT_STARTED`

상태 매핑은 `switch + never` 방식으로 exhaustive하게 구현했으며, `productNoMatched` 값에
따른 분기를 포함한다.

현재 Task 409/410의 실제 증적(HTTP 200 성공, productNoMatched null) 기준으로는 다음이 된다.

```text
TMS_FAST_CONNECTION_NAVER_PRODUCT_UPDATE_API_ENTRY_DECISION_DEFERRED_PENDING_PRODUCT_IDENTITY
```

## 8개 Entry Decision 그룹

1. `PRODUCT_UPDATE_API_ENTRY_DECISION_READINESS` - 상품 수정 API 진입 판단 화면이 준비되었는지 표시
2. `TASK_410_LOOKUP_RESULT_EVIDENCE_REFERENCE` - Task 410 결과 증적을 참조
3. `LOOKUP_SUCCESS_BUT_PRODUCT_IDENTITY_PENDING_DECISION` - 조회는 성공했지만 상품 식별 확정이 아직 pending임을 표시
4. `PRODUCT_NO_MATCHED_NULL_INTERPRETATION` - productNoMatched null의 의미와 위험성 표시
5. `PRODUCT_UPDATE_API_ENTRY_DEFERRED_GUARD` - 상품 수정 API 진입을 현 단계에서 보류함을 표시
6. `PRICE_STOCK_DB_WRITE_STILL_BLOCKED_GUARD` - 가격/재고/DB write가 계속 금지됨을 표시
7. `RAW_RESPONSE_SECRET_TOKEN_NON_EXPOSURE_EVIDENCE` - raw response, secret, token, header, signature 미노출 증적 표시
8. `NEXT_PRODUCT_IDENTITY_FIELD_MAPPING_ROADMAP` - 다음 단계로 상품 식별 필드 매핑/마스킹 shape 보정 검토 제안

## productNoMatched null 해석

productNoMatched null은 조회 실패를 의미하지 않는다. Task 409에서 HTTP 200 성공과
originProduct/smartstoreChannelProduct 구조는 확인되었다. 그러나 현재 masked evidence만으로는
API 응답 안의 어떤 필드가 대상 상품번호 6597910207과 안전하게 대응되는지 확정하지 못했다.
상품 수정 API는 상품 식별이 정확해야 하므로, 현 단계에서 update API 진입은 보류한다.

이 보정은 Task 411에서 raw response를 다시 열거나 표시하지 않는다. API를 다시 호출하지
않는다. 다음 판단 단계만 제안한다.

## 상품 수정 API 진입 보류 판단

- `productUpdateApiEntryAllowedNow: false`
- `productUpdateApiEntryDeferred: true`
- `productUpdateApiEntryDeferredReason: PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_EVIDENCE`
- `productIdentityFieldMappingRequired: true`
- `maskedResponseShapeReviewRequired: true`
- `rawResponseReviewAllowed: false`

> 상품 조회 API 1회는 HTTP 200으로 성공했지만, productNoMatched가 null이므로 상품 수정 API 진입은 아직 보류합니다. 다음 단계에서 마스킹된 응답 shape와 상품 식별 필드 매핑을 검토한 뒤 update API 진입 여부를 다시 판단해야 합니다.

## 추천값

- `recommendedEntryDecision: NAVER_PRODUCT_UPDATE_API_ENTRY_DEFERRED_PENDING_PRODUCT_IDENTITY`
- `recommendedPrimaryGoalAchieved: NAVER_PRODUCT_LOOKUP_ONE_TIME_SUCCESS`
- `recommendedLookupEvidenceStatus: LOOKUP_SUCCESS_HTTP_200_MASKED_EVIDENCE_CONFIRMED`
- `recommendedTargetApi: NAVER_COMMERCE_PRODUCT_LOOKUP_API`
- `recommendedTargetProductNo: 6597910207`
- `recommendedNextStep: NAVER_PRODUCT_LOOKUP_RESPONSE_PRODUCT_IDENTITY_FIELD_MAPPING_REVIEW`
- `recommendedExecutionMode: READ_ONLY_ENTRY_DECISION_NO_API_RECALL`
- `recommendedDeploymentMode: UPDATE_API_ENTRY_DEFERRED_NO_UPDATE_NO_DB_WRITE`
- `recommendedSafetyMode: SAFETY_LOCKED_UNTIL_PRODUCT_IDENTITY_CONFIRMED`

## raw response/secret/token 노출 금지 준수

- `rawResponseReviewAllowed: false`
- `actualSecretExposure: false`, `actualTokenExposure: false`, `actualAuthorizationHeaderExposure: false`, `actualSignatureExposure: false`
- `actualRawApiResponseExposure: false`, `actualRawApiResponseStored: false`

## 상품 수정/가격 변경/재고 변경/DB write 금지 준수

- `productUpdateApiCallAllowed: false`, `priceChangeAllowed: false`, `stockChangeAllowed: false`, `dbWriteAllowed: false`
- `actualProductUpdateApiCall: false`, `actualProductUpdateExecuted: false`
- `actualPriceChange: false`, `actualStockChange: false`, `actualDbWrite: false`

## Task 411에서 API 재호출 없음

- `actualNaverApiCallInTask411: false`
- `actualProductLookupApiCallInTask411: false`
- `actualProductLookupApiRecall: false`

## Task 411에서 env/process.env/secret/token 접근 없음

- `actualEnvReadInTask411: false`
- `actualEnvFileOpenInTask411: false`
- `actualProcessEnvReadInTask411: false`
- `actualSecretAccessInTask411: false`
- `actualTokenUseInTask411: false`

## route/page 연결 내용

- `app/api/sku-matching/draft-batch/[jobId]/route.ts`
  - Task 410 ViewModel을 입력으로 Task 411 Product Update API Entry Decision ViewModel 생성
  - GET 응답에 `tmsFastConnectionNaverProductUpdateApiEntryDecisionView` 추가
  - GET 처리 중 실제 Naver API 호출, env/process.env/secret/token 접근 없음
  - POST API는 추가하지 않음
- `app/dashboard/sku-keyword-draft-batches/[jobId]/page.tsx`
  - Task 411 타입 필드 추가
  - Task 410 바로 아래, Task 332 바로 위에 Task 411 패널 추가
  - 조회 1회 성공 증적, productNoMatched null 해석, 상품 수정 API 진입 보류, 8개 그룹 요약, Task 412 로드맵, 안전 금지선 표시
  - 실행 버튼/승인 버튼/승인 입력창/form submit/POST 호출 추가 없음
  - page.tsx는 ViewModel 표시만 담당하며 실제 API를 호출하지 않음

## 검증 결과

- Task 411 신규 테스트 27건 통과
- 인접 Task 410 / Task 409 ViewModel / Task 409 harness 테스트 재검증
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `git diff --check`

## 다음 Task 412 방향

- `Task 412 - Naver 상품 조회 응답 상품 식별 필드 매핑 검토 화면`
